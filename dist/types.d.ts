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
/** Arguments for get_frontmatter tool */
export interface GetFrontmatterArgs {
    /** Vault-relative path to the note */
    path: string;
}
/** Arguments for update_frontmatter tool */
export interface UpdateFrontmatterArgs {
    /** Vault-relative path to the note */
    path: string;
    /** Frontmatter fields to add/update (null values delete fields) */
    updates: Record<string, unknown>;
    /** Whether to merge with existing frontmatter (default: true) */
    merge?: boolean;
}
/** Arguments for bulk_update_frontmatter tool */
export interface BulkUpdateFrontmatterArgs {
    /** Array of path/frontmatter pairs to update */
    updates: Array<{
        path: string;
        frontmatter: Record<string, unknown>;
    }>;
    /** Whether to merge with existing frontmatter (default: true) */
    merge?: boolean;
}
/** Arguments for audit_frontmatter tool */
export interface AuditFrontmatterArgs {
    /** Optional: specific notes to audit (if omitted, audits entire vault) */
    paths?: string[];
    /** Schema definition for validation */
    schema: FrontmatterSchema;
}
/** Result from get_frontmatter tool */
export interface GetFrontmatterResult {
    /** Path to the note */
    path: string;
    /** Parsed frontmatter data (null if none or parse error) */
    frontmatter: Record<string, unknown> | null;
    /** Parse error message (null if successful) */
    error: string | null;
    /** Raw YAML string (null if no frontmatter) */
    rawYaml: string | null;
}
/** Result from update_frontmatter tool */
export interface UpdateFrontmatterResult {
    /** Path to the note */
    path: string;
    /** Whether the update was successful */
    updated: boolean;
    /** The resulting frontmatter after update */
    frontmatter: Record<string, unknown>;
}
/** Result from bulk_update_frontmatter tool */
export interface BulkUpdateFrontmatterResult {
    /** Total number of notes processed */
    totalProcessed: number;
    /** Number of successful updates */
    successful: number;
    /** Number of failed updates */
    failed: number;
    /** Detailed results for each note */
    details: Array<{
        path: string;
        success: boolean;
        frontmatter?: Record<string, unknown>;
        error?: string;
    }>;
}
/** Result from audit_frontmatter tool */
export interface AuditFrontmatterResult {
    /** Total number of notes audited */
    totalNotes: number;
    /** Number of notes passing validation */
    validNotes: number;
    /** Number of notes failing validation */
    invalidNotes: number;
    /** Detailed validation results for each note */
    details: Array<{
        path: string;
        valid: boolean;
        errors: ValidationError[];
    }>;
}
/** Schema definition for frontmatter validation */
export interface FrontmatterSchema {
    /** Array of required field names */
    required?: string[];
    /** Field-specific validation rules */
    fields?: Record<string, FieldSchema>;
}
/** Validation rules for a single frontmatter field */
export interface FieldSchema {
    /** Expected type of the field value */
    type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date';
    /** Whether this field is required */
    required?: boolean;
    /** Whether null values are allowed */
    allowNull?: boolean;
}
/** Validation error for a frontmatter field */
export interface ValidationError {
    /** Name of the field with the error */
    field: string;
    /** Type of validation error */
    type: 'missing_required' | 'invalid_type' | 'parse_error';
    /** Human-readable error message */
    message: string;
    /** Expected type or value (for type errors) */
    expected?: string;
    /** Actual type or value found (for type errors) */
    actual?: string;
}
//# sourceMappingURL=types.d.ts.map