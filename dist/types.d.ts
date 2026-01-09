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
export interface GetFrontmatterArgs {
    path: string;
}
export interface UpdateFrontmatterArgs {
    path: string;
    updates: Record<string, unknown>;
    merge?: boolean;
}
export interface BulkUpdateFrontmatterArgs {
    updates: Array<{
        path: string;
        frontmatter: Record<string, unknown>;
    }>;
    merge?: boolean;
}
export interface AuditFrontmatterArgs {
    paths?: string[];
    schema: FrontmatterSchema;
}
export interface GetFrontmatterResult {
    path: string;
    frontmatter: Record<string, unknown> | null;
    error: string | null;
    rawYaml: string | null;
}
export interface UpdateFrontmatterResult {
    path: string;
    updated: boolean;
    frontmatter: Record<string, unknown>;
}
export interface BulkUpdateFrontmatterResult {
    totalProcessed: number;
    successful: number;
    failed: number;
    details: Array<{
        path: string;
        success: boolean;
        frontmatter?: Record<string, unknown>;
        error?: string;
    }>;
}
export interface AuditFrontmatterResult {
    totalNotes: number;
    validNotes: number;
    invalidNotes: number;
    details: Array<{
        path: string;
        valid: boolean;
        errors: ValidationError[];
    }>;
}
export interface FrontmatterSchema {
    required?: string[];
    fields?: Record<string, FieldSchema>;
}
export interface FieldSchema {
    type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date';
    required?: boolean;
    allowNull?: boolean;
}
export interface ValidationError {
    field: string;
    type: 'missing_required' | 'invalid_type' | 'parse_error';
    message: string;
    expected?: string;
    actual?: string;
}
//# sourceMappingURL=types.d.ts.map