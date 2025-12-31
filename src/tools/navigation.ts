import * as path from 'path';
import { VaultAccess } from '../vault.js';
import {
  NoteMetadata,
  ReadNoteResult,
  SearchResult,
  FolderNode,
} from '../types.js';
import {
  parseFrontmatter,
  extractWikilinks,
  extractHeadings,
  findTextOccurrences,
} from '../parser.js';

export async function listNotes(
  vault: VaultAccess,
  args: {
    folder?: string;
    tags?: string[];
    dateRange?: { start: string; end: string };
    limit?: number;
    offset?: number;
  }
): Promise<NoteMetadata[]> {
  const allFiles = await vault.listFiles(args.folder);
  const notes: NoteMetadata[] = [];

  for (const file of allFiles) {
    const content = await vault.readFile(file.path);
    const fm = parseFrontmatter(content);

    if (args.tags && args.tags.length > 0) {
      const noteTags = fm.data?.tags;
      const noteTagArray = Array.isArray(noteTags)
        ? noteTags
        : noteTags
        ? [noteTags]
        : [];

      const hasAllTags = args.tags.every((tag) =>
        noteTagArray.some((noteTag) => String(noteTag) === tag)
      );

      if (!hasAllTags) continue;
    }

    if (args.dateRange) {
      const created = fm.data?.Created as string | undefined;
      if (!created) continue;

      const createdDate = new Date(created);
      const startDate = new Date(args.dateRange.start);
      const endDate = new Date(args.dateRange.end);

      if (createdDate < startDate || createdDate > endDate) continue;
    }

    const title = extractTitle(file.path, content);
    const tags = fm.data?.tags;
    const tagArray = Array.isArray(tags) ? tags.map(String) : tags ? [String(tags)] : [];

    notes.push({
      path: file.path,
      title,
      created: fm.data?.Created as string | null,
      tags: tagArray,
      modified: file.modified,
      size: file.size,
    });
  }

  const start = args.offset || 0;
  const end = args.limit ? start + args.limit : notes.length;

  return notes.slice(start, end);
}

export async function readNote(
  vault: VaultAccess,
  args: { path: string }
): Promise<ReadNoteResult> {
  const content = await vault.readFile(args.path);
  const fm = parseFrontmatter(content);
  const links = extractWikilinks(content);
  const headings = extractHeadings(content);
  const stats = await vault.getFileStats(args.path);

  const lines = content.split('\n').length;
  const characters = content.length;

  return {
    path: args.path,
    content,
    frontmatter: fm.data,
    frontmatterError: fm.error,
    outgoingLinks: links,
    headings,
    stats: {
      lines,
      characters,
      modified: stats.modified.toISOString(),
    },
  };
}

export async function readNotesBatch(
  vault: VaultAccess,
  args: { paths: string[] }
): Promise<ReadNoteResult[]> {
  const results = await Promise.all(
    args.paths.map((path) => readNote(vault, { path }))
  );

  return results;
}

export async function searchNotes(
  vault: VaultAccess,
  args: { pattern: string; isRegex?: boolean; folder?: string; limit?: number }
): Promise<SearchResult[]> {
  const allFiles = await vault.listFiles(args.folder);
  const results: SearchResult[] = [];

  for (const file of allFiles) {
    const content = await vault.readFile(file.path);
    const occurrences = findTextOccurrences(
      content,
      args.pattern,
      args.isRegex || false
    );

    if (occurrences.length > 0) {
      results.push({
        path: file.path,
        matchCount: occurrences.length,
        occurrences: occurrences.slice(0, args.limit || 10),
      });
    }
  }

  return results;
}

export async function getVaultStructure(
  vault: VaultAccess
): Promise<FolderNode> {
  const allFiles = await vault.listFiles();
  const root: FolderNode = {
    path: '',
    name: path.basename(vault.getVaultPath()),
    noteCount: 0,
    children: [],
  };

  const folderMap = new Map<string, FolderNode>();
  folderMap.set('', root);

  for (const file of allFiles) {
    const parts = file.path.split(path.sep);
    let currentPath = '';

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      const previousPath = currentPath;
      currentPath = currentPath ? path.join(currentPath, part) : part;

      if (!folderMap.has(currentPath)) {
        const newFolder: FolderNode = {
          path: currentPath,
          name: part,
          noteCount: 0,
          children: [],
        };

        folderMap.set(currentPath, newFolder);

        const parent = folderMap.get(previousPath);
        if (parent) {
          parent.children.push(newFolder);
        }
      }
    }

    let currentPathForCount = '';
    for (let i = 0; i < parts.length - 1; i++) {
      currentPathForCount = currentPathForCount
        ? path.join(currentPathForCount, parts[i])
        : parts[i];
      const folder = folderMap.get(currentPathForCount);
      if (folder) {
        folder.noteCount++;
      }
    }

    root.noteCount++;
  }

  return root;
}

function extractTitle(filePath: string, content: string): string {
  const basename = path.basename(filePath, '.md');

  const headings = extractHeadings(content);
  if (headings.length > 0 && headings[0].level === 1) {
    return headings[0].text;
  }

  return basename;
}
