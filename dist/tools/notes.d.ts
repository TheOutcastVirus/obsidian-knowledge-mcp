import { VaultAccess } from '../vault.js';
import { CreateNoteResult, UpdateNoteResult, DeleteNoteResult } from '../types.js';
interface CreateNoteArgs {
    path: string;
    content?: string;
    frontmatter?: Record<string, unknown>;
}
interface UpdateNoteArgs {
    path: string;
    content: string;
}
interface MoveNoteArgs {
    oldPath: string;
    newPath: string;
    updateBacklinks?: boolean;
}
interface DeleteNoteArgs {
    path: string;
    cleanupReferences?: boolean;
}
export declare function createNote(vault: VaultAccess, args: CreateNoteArgs): Promise<CreateNoteResult>;
export declare function updateNote(vault: VaultAccess, args: UpdateNoteArgs): Promise<UpdateNoteResult>;
export declare function moveNote(vault: VaultAccess, args: MoveNoteArgs): Promise<UpdateNoteResult>;
export declare function deleteNote(vault: VaultAccess, args: DeleteNoteArgs): Promise<DeleteNoteResult>;
export {};
//# sourceMappingURL=notes.d.ts.map