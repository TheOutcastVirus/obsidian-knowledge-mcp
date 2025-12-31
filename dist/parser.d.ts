import { FrontmatterResult, WikiLink, Heading, TextOccurrence, Position } from './types.js';
export declare function parseFrontmatter(content: string): FrontmatterResult;
export declare function serializeFrontmatter(fm: Record<string, unknown>): string;
export declare function updateFrontmatterInContent(content: string, updates: Record<string, unknown>): string;
export declare function extractWikilinks(content: string): WikiLink[];
export declare function replaceWikilinkTarget(content: string, oldTarget: string, newTarget: string): string;
export declare function insertWikilink(content: string, link: string, position: Position): string;
export declare function extractHeadings(content: string): Heading[];
export declare function findTextOccurrences(content: string, pattern: string, isRegex?: boolean): TextOccurrence[];
export declare function removeWikilink(content: string, target: string): string;
export declare function getLineContext(content: string, lineNumber: number): string;
//# sourceMappingURL=parser.d.ts.map