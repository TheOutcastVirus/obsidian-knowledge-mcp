import * as yaml from 'yaml';
import {
  FrontmatterResult,
  WikiLink,
  Heading,
  TextOccurrence,
  Position,
} from './types.js';

export function parseFrontmatter(content: string): FrontmatterResult {
  const lines = content.split('\n');

  if (lines[0]?.trim() !== '---') {
    return {
      data: null,
      error: null,
      rawYaml: null,
      contentStartLine: 0,
    };
  }

  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    return {
      data: null,
      error: 'Frontmatter missing closing delimiter',
      rawYaml: lines.slice(1).join('\n'),
      contentStartLine: 0,
    };
  }

  const yamlContent = lines.slice(1, endIndex).join('\n');

  if (yamlContent.trim() === '') {
    return {
      data: {},
      error: null,
      rawYaml: '',
      contentStartLine: endIndex + 1,
    };
  }

  try {
    const parsed = yaml.parse(yamlContent);
    return {
      data: parsed as Record<string, unknown>,
      error: null,
      rawYaml: yamlContent,
      contentStartLine: endIndex + 1,
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      data: null,
      error: `YAML parse error: ${err.message}`,
      rawYaml: yamlContent,
      contentStartLine: endIndex + 1,
    };
  }
}

export function serializeFrontmatter(fm: Record<string, unknown>): string {
  return yaml.stringify(fm).trim();
}

export function updateFrontmatterInContent(
  content: string,
  updates: Record<string, unknown>
): string {
  const parsed = parseFrontmatter(content);
  const lines = content.split('\n');

  const newFrontmatter = serializeFrontmatter(updates);

  if (parsed.data === null && parsed.error === null) {
    return `---\n${newFrontmatter}\n---\n${content}`;
  }

  if (parsed.error) {
    const endIndex = lines.findIndex((line, idx) => idx > 0 && line.trim() === '---');
    if (endIndex > 0) {
      const contentAfterFrontmatter = lines.slice(endIndex + 1).join('\n');
      return `---\n${newFrontmatter}\n---\n${contentAfterFrontmatter}`;
    }
    return `---\n${newFrontmatter}\n---\n${content}`;
  }

  const contentAfterFrontmatter = lines.slice(parsed.contentStartLine).join('\n');
  return `---\n${newFrontmatter}\n---\n${contentAfterFrontmatter}`;
}

const WIKILINK_PATTERNS = {
  embed: /!\[\[([^\]#|]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g,
  link: /(?<!!)\[\[([^\]#|]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g,
};

export function extractWikilinks(content: string): WikiLink[] {
  const links: WikiLink[] = [];
  const lines = content.split('\n');

  lines.forEach((line, lineIndex) => {
    for (const match of line.matchAll(WIKILINK_PATTERNS.embed)) {
      links.push({
        raw: match[0],
        target: match[1].trim(),
        heading: match[2]?.trim() || null,
        alias: match[3]?.trim() || null,
        isEmbed: true,
        line: lineIndex + 1,
        column: match.index!,
      });
    }

    for (const match of line.matchAll(WIKILINK_PATTERNS.link)) {
      links.push({
        raw: match[0],
        target: match[1].trim(),
        heading: match[2]?.trim() || null,
        alias: match[3]?.trim() || null,
        isEmbed: false,
        line: lineIndex + 1,
        column: match.index!,
      });
    }
  });

  return links;
}

export function replaceWikilinkTarget(
  content: string,
  oldTarget: string,
  newTarget: string
): string {
  const links = extractWikilinks(content);
  let result = content;
  let offset = 0;

  for (const link of links) {
    if (link.target === oldTarget) {
      const newLink = link.raw.replace(
        `[[${oldTarget}`,
        `[[${newTarget}`
      );

      const lines = result.split('\n');
      const lineIndex = link.line - 1;
      const line = lines[lineIndex];
      const col = link.column + offset;

      lines[lineIndex] =
        line.substring(0, col) +
        newLink +
        line.substring(col + link.raw.length);

      result = lines.join('\n');
      offset += newLink.length - link.raw.length;
    }
  }

  return result;
}

export function insertWikilink(
  content: string,
  link: string,
  position: Position
): string {
  const lines = content.split('\n');
  const lineIndex = position.line - 1;

  if (lineIndex < 0 || lineIndex >= lines.length) {
    throw new Error(`Invalid line number: ${position.line}`);
  }

  const line = lines[lineIndex];
  const before = line.substring(0, position.column);
  const after = line.substring(position.column);

  lines[lineIndex] = `${before}[[${link}]]${after}`;

  return lines.join('\n');
}

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split('\n');

  const headingRegex = /^(#{1,6})\s+(.+)$/;

  lines.forEach((line, index) => {
    const match = line.match(headingRegex);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      headings.push({
        level,
        text,
        line: index + 1,
        id,
      });
    }
  });

  return headings;
}

export function findTextOccurrences(
  content: string,
  pattern: string,
  isRegex: boolean = false
): TextOccurrence[] {
  const occurrences: TextOccurrence[] = [];
  const lines = content.split('\n');

  const regex = isRegex
    ? new RegExp(pattern, 'gi')
    : new RegExp(escapeRegex(pattern), 'gi');

  lines.forEach((line, lineIndex) => {
    for (const match of line.matchAll(regex)) {
      const column = match.index!;
      const contextStart = Math.max(0, column - 50);
      const contextEnd = Math.min(line.length, column + match[0].length + 50);

      occurrences.push({
        line: lineIndex + 1,
        column,
        matchText: match[0],
        contextBefore: line.substring(contextStart, column),
        contextAfter: line.substring(column + match[0].length, contextEnd),
      });
    }
  });

  return occurrences;
}

export function removeWikilink(content: string, target: string): string {
  const links = extractWikilinks(content);
  const linesToRemove = links
    .filter((link) => link.target === target)
    .reverse();

  let result = content;

  for (const link of linesToRemove) {
    const lines = result.split('\n');
    const lineIndex = link.line - 1;
    const line = lines[lineIndex];

    lines[lineIndex] =
      line.substring(0, link.column) +
      line.substring(link.column + link.raw.length);

    result = lines.join('\n');
  }

  return result;
}

export function getLineContext(content: string, lineNumber: number): string {
  const lines = content.split('\n');
  const lineIndex = lineNumber - 1;

  if (lineIndex < 0 || lineIndex >= lines.length) {
    return '';
  }

  return lines[lineIndex];
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
