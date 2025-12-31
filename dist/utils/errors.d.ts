export declare class VaultError extends Error {
    code: string;
    context?: Record<string, unknown> | undefined;
    constructor(message: string, code: string, context?: Record<string, unknown> | undefined);
}
export declare const ERROR_CODES: {
    readonly PATH_OUTSIDE_VAULT: "PATH_OUTSIDE_VAULT";
    readonly FILE_NOT_FOUND: "FILE_NOT_FOUND";
    readonly FILE_LOCKED: "FILE_LOCKED";
    readonly INVALID_FRONTMATTER: "INVALID_FRONTMATTER";
    readonly INVALID_PATH: "INVALID_PATH";
    readonly FOLDER_NOT_EMPTY: "FOLDER_NOT_EMPTY";
    readonly CIRCULAR_LINK: "CIRCULAR_LINK";
    readonly FILE_EXISTS: "FILE_EXISTS";
    readonly WRITE_ERROR: "WRITE_ERROR";
    readonly MOVE_ERROR: "MOVE_ERROR";
    readonly DELETE_ERROR: "DELETE_ERROR";
    readonly INVALID_ARGS: "INVALID_ARGS";
};
export declare function getActionableSuggestion(errorCode: string): string;
//# sourceMappingURL=errors.d.ts.map