import * as fs from 'fs/promises';
import * as fsSync from 'fs';
import * as path from 'path';
import { VaultError, ERROR_CODES } from './utils/errors.js';
export class VaultAccess {
    vaultPath;
    constructor(vaultPath) {
        this.vaultPath = vaultPath;
        this.validateVaultPath();
    }
    validateVaultPath() {
        if (!fsSync.existsSync(this.vaultPath)) {
            throw new Error(`Vault path does not exist: ${this.vaultPath}`);
        }
        const stats = fsSync.statSync(this.vaultPath);
        if (!stats.isDirectory()) {
            throw new Error(`Vault path is not a directory: ${this.vaultPath}`);
        }
        const obsidianFolder = path.join(this.vaultPath, '.obsidian');
        if (!fsSync.existsSync(obsidianFolder)) {
            throw new Error(`Not a valid Obsidian vault (missing .obsidian folder): ${this.vaultPath}`);
        }
    }
    resolvePath(relativePath) {
        const normalized = relativePath.replace(/^\.?\//, '');
        if (normalized.includes('..')) {
            throw new VaultError('Path contains .. segments', ERROR_CODES.PATH_OUTSIDE_VAULT, { relativePath });
        }
        const absolutePath = path.join(this.vaultPath, normalized);
        const realVaultPath = fsSync.realpathSync(this.vaultPath);
        const realTargetPath = path.resolve(absolutePath);
        if (!realTargetPath.startsWith(realVaultPath)) {
            throw new VaultError('Path escapes vault boundary', ERROR_CODES.PATH_OUTSIDE_VAULT, { relativePath, resolvedPath: realTargetPath });
        }
        return realTargetPath;
    }
    async readFile(relativePath) {
        const absolutePath = this.resolvePath(relativePath);
        try {
            const content = await fs.readFile(absolutePath, 'utf-8');
            return content;
        }
        catch (error) {
            const err = error;
            if (err.code === 'ENOENT') {
                throw new VaultError(`File not found: ${relativePath}`, ERROR_CODES.FILE_NOT_FOUND, { path: relativePath });
            }
            throw new VaultError(`Failed to read file: ${err.message}`, 'READ_ERROR', { path: relativePath });
        }
    }
    async writeFile(relativePath, content) {
        const absolutePath = this.resolvePath(relativePath);
        const maxRetries = 3;
        const retryDelay = 100;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                const tempPath = `${absolutePath}.tmp`;
                await fs.writeFile(tempPath, content, 'utf-8');
                await fs.rename(tempPath, absolutePath);
                return;
            }
            catch (error) {
                const err = error;
                if ((err.code === 'EBUSY' || err.code === 'EPERM') &&
                    attempt < maxRetries - 1) {
                    await new Promise((resolve) => setTimeout(resolve, retryDelay));
                    continue;
                }
                if (err.code === 'EBUSY' || err.code === 'EPERM') {
                    throw new VaultError(`File is locked or in use: ${relativePath}`, ERROR_CODES.FILE_LOCKED, { path: relativePath, attempt });
                }
                throw new VaultError(`Failed to write file: ${err.message}`, ERROR_CODES.WRITE_ERROR, { path: relativePath });
            }
        }
    }
    async deleteFile(relativePath) {
        const absolutePath = this.resolvePath(relativePath);
        try {
            await fs.unlink(absolutePath);
        }
        catch (error) {
            const err = error;
            if (err.code === 'ENOENT') {
                throw new VaultError(`File not found: ${relativePath}`, ERROR_CODES.FILE_NOT_FOUND, { path: relativePath });
            }
            throw new VaultError(`Failed to delete file: ${err.message}`, ERROR_CODES.DELETE_ERROR, { path: relativePath });
        }
    }
    async moveFile(oldPath, newPath) {
        const oldAbsolute = this.resolvePath(oldPath);
        const newAbsolute = this.resolvePath(newPath);
        try {
            await fs.rename(oldAbsolute, newAbsolute);
        }
        catch (error) {
            const err = error;
            if (err.code === 'ENOENT') {
                throw new VaultError(`File not found: ${oldPath}`, ERROR_CODES.FILE_NOT_FOUND, { path: oldPath });
            }
            throw new VaultError(`Failed to move file: ${err.message}`, ERROR_CODES.MOVE_ERROR, { oldPath, newPath });
        }
    }
    async fileExists(relativePath) {
        try {
            const absolutePath = this.resolvePath(relativePath);
            await fs.access(absolutePath);
            return true;
        }
        catch {
            return false;
        }
    }
    async getFileStats(relativePath) {
        const absolutePath = this.resolvePath(relativePath);
        try {
            const stats = await fs.stat(absolutePath);
            return {
                path: relativePath,
                size: stats.size,
                modified: stats.mtime,
                created: stats.birthtime,
            };
        }
        catch (error) {
            const err = error;
            if (err.code === 'ENOENT') {
                throw new VaultError(`File not found: ${relativePath}`, ERROR_CODES.FILE_NOT_FOUND, { path: relativePath });
            }
            throw new VaultError(`Failed to get file stats: ${err.message}`, 'STAT_ERROR', { path: relativePath });
        }
    }
    async listFiles(folder, pattern) {
        const searchPath = folder
            ? this.resolvePath(folder)
            : this.vaultPath;
        const files = [];
        async function walkDir(dir, basePath) {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            for (const entry of entries) {
                if (entry.name === '.obsidian')
                    continue;
                const fullPath = path.join(dir, entry.name);
                const relativePath = path.relative(basePath, fullPath);
                if (entry.isDirectory()) {
                    await walkDir(fullPath, basePath);
                }
                else if (entry.isFile() && entry.name.endsWith('.md')) {
                    if (pattern && !entry.name.includes(pattern))
                        continue;
                    const stats = await fs.stat(fullPath);
                    files.push({
                        path: relativePath,
                        size: stats.size,
                        modified: stats.mtime,
                        created: stats.birthtime,
                    });
                }
            }
        }
        await walkDir(searchPath, this.vaultPath);
        return files;
    }
    async createFolder(relativePath) {
        const absolutePath = this.resolvePath(relativePath);
        try {
            await fs.mkdir(absolutePath, { recursive: true });
        }
        catch (error) {
            const err = error;
            throw new VaultError(`Failed to create folder: ${err.message}`, 'FOLDER_CREATE_ERROR', { path: relativePath });
        }
    }
    getVaultPath() {
        return this.vaultPath;
    }
}
//# sourceMappingURL=vault.js.map