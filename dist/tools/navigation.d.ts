import { VaultAccess } from '../vault.js';
import { NoteMetadata, ReadNoteResult, SearchResult, FolderNode } from '../types.js';
export declare function listNotes(vault: VaultAccess, args: {
    folder?: string;
    tags?: string[];
    dateRange?: {
        start: string;
        end: string;
    };
    limit?: number;
    offset?: number;
}): Promise<NoteMetadata[]>;
export declare function readNote(vault: VaultAccess, args: {
    path: string;
}): Promise<ReadNoteResult>;
export declare function readNotesBatch(vault: VaultAccess, args: {
    paths: string[];
}): Promise<ReadNoteResult[]>;
export declare function searchNotes(vault: VaultAccess, args: {
    pattern: string;
    isRegex?: boolean;
    folder?: string;
    limit?: number;
}): Promise<SearchResult[]>;
export declare function getVaultStructure(vault: VaultAccess): Promise<FolderNode>;
//# sourceMappingURL=navigation.d.ts.map