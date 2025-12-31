export interface Config {
    vaultPath: string;
    logLevel: string;
    maxConcurrentOps: number;
}
export interface WikiLink {
    raw: string;
    target: string;
    heading: string | null;
    alias: string | null;
    isEmbed: boolean;
    line: number;
    column: number;
}
export interface Heading {
    level: number;
    text: string;
    line: number;
    id: string;
}
export interface FrontmatterResult {
    data: Record<string, unknown> | null;
    error: string | null;
    rawYaml: string | null;
    contentStartLine: number;
}
export interface FileMetadata {
    path: string;
    size: number;
    modified: Date;
    created: Date;
}
export interface NoteMetadata {
    path: string;
    title: string;
    created: string | null;
    tags: string[];
    modified: Date;
    size: number;
}
export interface TextOccurrence {
    line: number;
    column: number;
    matchText: string;
    contextBefore: string;
    contextAfter: string;
}
export interface SearchResult {
    path: string;
    matchCount: number;
    occurrences: TextOccurrence[];
}
export interface Backlink {
    sourcePath: string;
    targetPath: string;
    linkText: string;
    line: number;
    context: string;
}
export interface LinkGraphEdge {
    source: string;
    target: string;
}
export interface LinkGraph {
    nodes: string[];
    edges: LinkGraphEdge[];
}
export interface FolderNode {
    path: string;
    name: string;
    noteCount: number;
    children: FolderNode[];
}
export interface NoteTitleInfo {
    path: string;
    title: string;
    aliases: string[];
    firstHeading: string | null;
}
export interface TagStat {
    tag: string;
    count: number;
}
export interface ReadNoteResult {
    path: string;
    content: string;
    frontmatter: Record<string, unknown> | null;
    frontmatterError: string | null;
    outgoingLinks: WikiLink[];
    headings: Heading[];
    stats: {
        lines: number;
        characters: number;
        modified: string;
    };
}
export interface CreateNoteResult {
    path: string;
    created: boolean;
}
export interface UpdateNoteResult {
    path: string;
    updated: boolean;
    patchesApplied?: number;
}
export interface DeleteNoteResult {
    path: string;
    deleted: boolean;
    linksRemoved: number;
    affectedNotes: string[];
}
export interface BulkUpdateResult {
    totalProcessed: number;
    successful: number;
    failed: number;
    details: Array<{
        path: string;
        success: boolean;
        error?: string;
    }>;
}
export interface Position {
    line: number;
    column: number;
}
//# sourceMappingURL=types.d.ts.map