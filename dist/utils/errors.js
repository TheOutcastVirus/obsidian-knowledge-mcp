export class VaultError extends Error {
    code;
    context;
    constructor(message, code, context) {
        super(message);
        this.code = code;
        this.context = context;
        this.name = 'VaultError';
    }
}
export const ERROR_CODES = {
    PATH_OUTSIDE_VAULT: 'PATH_OUTSIDE_VAULT',
    FILE_NOT_FOUND: 'FILE_NOT_FOUND',
    FILE_LOCKED: 'FILE_LOCKED',
    INVALID_FRONTMATTER: 'INVALID_FRONTMATTER',
    INVALID_PATH: 'INVALID_PATH',
    FOLDER_NOT_EMPTY: 'FOLDER_NOT_EMPTY',
    CIRCULAR_LINK: 'CIRCULAR_LINK',
    FILE_EXISTS: 'FILE_EXISTS',
    WRITE_ERROR: 'WRITE_ERROR',
    MOVE_ERROR: 'MOVE_ERROR',
    DELETE_ERROR: 'DELETE_ERROR',
    INVALID_ARGS: 'INVALID_ARGS',
};
export function getActionableSuggestion(errorCode) {
    const suggestions = {
        [ERROR_CODES.FILE_NOT_FOUND]: 'Use list_notes or get_note_titles to find available notes',
        [ERROR_CODES.FILE_LOCKED]: 'Wait a moment and retry, or check if Obsidian has the file open',
        [ERROR_CODES.INVALID_FRONTMATTER]: 'Use get_frontmatter with parse_error flag to see raw YAML',
        [ERROR_CODES.PATH_OUTSIDE_VAULT]: 'Ensure path is relative to vault root without ../ segments',
        [ERROR_CODES.FILE_EXISTS]: 'File already exists. Use update_note to modify existing file or choose a different name',
        [ERROR_CODES.CIRCULAR_LINK]: 'The requested operation would create a circular link dependency',
        [ERROR_CODES.INVALID_PATH]: 'Path contains invalid characters or format',
    };
    return suggestions[errorCode] || 'Check error details and retry';
}
//# sourceMappingURL=errors.js.map