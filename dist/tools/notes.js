import { VaultError, ERROR_CODES } from '../utils/errors.js';
import { updateFrontmatterInContent, extractWikilinks, replaceWikilinkTarget, removeWikilink, } from '../parser.js';
import * as path from 'path';
export async function createNote(vault, args) {
    const { path: notePath, content = '', frontmatter } = args;
    if (!notePath || !notePath.endsWith('.md')) {
        throw new VaultError('Path must be a markdown file ending with .md', ERROR_CODES.INVALID_PATH, { path: notePath });
    }
    const exists = await vault.fileExists(notePath);
    if (exists) {
        throw new VaultError(`File already exists: ${notePath}`, ERROR_CODES.FILE_EXISTS, { path: notePath });
    }
    const directory = path.dirname(notePath);
    if (directory && directory !== '.') {
        await vault.createFolder(directory);
    }
    let finalContent = content;
    if (frontmatter) {
        finalContent = updateFrontmatterInContent(content, frontmatter);
    }
    await vault.writeFile(notePath, finalContent);
    return {
        path: notePath,
        created: true,
    };
}
export async function updateNote(vault, args) {
    const { path: notePath, content } = args;
    if (!notePath || !notePath.endsWith('.md')) {
        throw new VaultError('Path must be a markdown file ending with .md', ERROR_CODES.INVALID_PATH, { path: notePath });
    }
    const exists = await vault.fileExists(notePath);
    if (!exists) {
        throw new VaultError(`File not found: ${notePath}`, ERROR_CODES.FILE_NOT_FOUND, { path: notePath });
    }
    await vault.writeFile(notePath, content);
    return {
        path: notePath,
        updated: true,
    };
}
export async function moveNote(vault, args) {
    const { oldPath, newPath, updateBacklinks = true } = args;
    if (!oldPath || !oldPath.endsWith('.md')) {
        throw new VaultError('Old path must be a markdown file ending with .md', ERROR_CODES.INVALID_PATH, { path: oldPath });
    }
    if (!newPath || !newPath.endsWith('.md')) {
        throw new VaultError('New path must be a markdown file ending with .md', ERROR_CODES.INVALID_PATH, { path: newPath });
    }
    const exists = await vault.fileExists(oldPath);
    if (!exists) {
        throw new VaultError(`File not found: ${oldPath}`, ERROR_CODES.FILE_NOT_FOUND, { path: oldPath });
    }
    const targetExists = await vault.fileExists(newPath);
    if (targetExists) {
        throw new VaultError(`Target file already exists: ${newPath}`, ERROR_CODES.FILE_EXISTS, { path: newPath });
    }
    const directory = path.dirname(newPath);
    if (directory && directory !== '.') {
        await vault.createFolder(directory);
    }
    if (!updateBacklinks) {
        await vault.moveFile(oldPath, newPath);
        return {
            path: newPath,
            updated: true,
        };
    }
    const oldTarget = path.basename(oldPath, '.md');
    const newTarget = newPath.replace(/\.md$/, '');
    const allFiles = await vault.listFiles();
    const updatedFiles = [];
    try {
        for (const file of allFiles) {
            if (file.path === oldPath)
                continue;
            const content = await vault.readFile(file.path);
            const links = extractWikilinks(content);
            const hasBacklink = links.some((link) => link.target === oldTarget);
            if (hasBacklink) {
                const updatedContent = replaceWikilinkTarget(content, oldTarget, newTarget);
                await vault.writeFile(file.path, updatedContent);
                updatedFiles.push(file.path);
            }
        }
        await vault.moveFile(oldPath, newPath);
        return {
            path: newPath,
            updated: true,
            patchesApplied: updatedFiles.length,
        };
    }
    catch (error) {
        for (const filePath of updatedFiles) {
            try {
                const content = await vault.readFile(filePath);
                const rollbackContent = replaceWikilinkTarget(content, newTarget, oldTarget);
                await vault.writeFile(filePath, rollbackContent);
            }
            catch (rollbackError) {
                console.error(`Failed to rollback ${filePath}:`, rollbackError);
            }
        }
        throw error;
    }
}
export async function deleteNote(vault, args) {
    const { path: notePath, cleanupReferences = false } = args;
    if (!notePath || !notePath.endsWith('.md')) {
        throw new VaultError('Path must be a markdown file ending with .md', ERROR_CODES.INVALID_PATH, { path: notePath });
    }
    const exists = await vault.fileExists(notePath);
    if (!exists) {
        throw new VaultError(`File not found: ${notePath}`, ERROR_CODES.FILE_NOT_FOUND, { path: notePath });
    }
    let linksRemoved = 0;
    const affectedNotes = [];
    if (cleanupReferences) {
        const target = path.basename(notePath, '.md');
        const allFiles = await vault.listFiles();
        for (const file of allFiles) {
            if (file.path === notePath)
                continue;
            const content = await vault.readFile(file.path);
            const links = extractWikilinks(content);
            const hasBacklink = links.some((link) => link.target === target);
            if (hasBacklink) {
                const updatedContent = removeWikilink(content, target);
                await vault.writeFile(file.path, updatedContent);
                affectedNotes.push(file.path);
                linksRemoved += links.filter((link) => link.target === target).length;
            }
        }
    }
    await vault.deleteFile(notePath);
    return {
        path: notePath,
        deleted: true,
        linksRemoved,
        affectedNotes,
    };
}
//# sourceMappingURL=notes.js.map