import { FileMetadata } from './types.js';
export declare class VaultAccess {
    private vaultPath;
    constructor(vaultPath: string);
    private validateVaultPath;
    resolvePath(relativePath: string): string;
    readFile(relativePath: string): Promise<string>;
    writeFile(relativePath: string, content: string): Promise<void>;
    deleteFile(relativePath: string): Promise<void>;
    moveFile(oldPath: string, newPath: string): Promise<void>;
    fileExists(relativePath: string): Promise<boolean>;
    getFileStats(relativePath: string): Promise<FileMetadata>;
    listFiles(folder?: string, pattern?: string): Promise<FileMetadata[]>;
    createFolder(relativePath: string): Promise<void>;
    getVaultPath(): string;
}
//# sourceMappingURL=vault.d.ts.map