import * as path from 'path';
import * as fs from 'fs';
export function loadConfig() {
    const vaultPath = process.env.VAULT_PATH;
    if (!vaultPath) {
        throw new Error('VAULT_PATH environment variable is required');
    }
    const resolvedPath = path.resolve(vaultPath);
    if (!fs.existsSync(resolvedPath)) {
        throw new Error(`Vault path does not exist: ${resolvedPath}`);
    }
    const stats = fs.statSync(resolvedPath);
    if (!stats.isDirectory()) {
        throw new Error(`Vault path is not a directory: ${resolvedPath}`);
    }
    return {
        vaultPath: resolvedPath,
        logLevel: process.env.LOG_LEVEL || 'info',
        maxConcurrentOps: parseInt(process.env.MAX_CONCURRENT_OPS || '10', 10)
    };
}
//# sourceMappingURL=config.js.map