import { VaultAccess } from '../vault.js';
import { GetFrontmatterArgs, GetFrontmatterResult, UpdateFrontmatterArgs, UpdateFrontmatterResult, BulkUpdateFrontmatterArgs, BulkUpdateFrontmatterResult, AuditFrontmatterArgs, AuditFrontmatterResult } from '../types.js';
/**
 * Extract and parse YAML frontmatter from a single note.
 * Returns the parsed frontmatter data along with raw YAML and any parse errors.
 * Parse errors are returned in the result rather than thrown, allowing inspection
 * of malformed frontmatter.
 *
 * @param vault - VaultAccess instance for file operations
 * @param args - Arguments containing the note path
 * @returns Parsed frontmatter data, raw YAML, and any parse errors
 * @throws VaultError if path is invalid or file does not exist
 */
export declare function getFrontmatter(vault: VaultAccess, args: GetFrontmatterArgs): Promise<GetFrontmatterResult>;
/**
 * Update frontmatter fields in a single note without modifying the content body.
 * By default, merges updates with existing frontmatter. Set merge=false to replace
 * the entire frontmatter. Setting a field to null will delete it from the frontmatter.
 *
 * @param vault - VaultAccess instance for file operations
 * @param args - Arguments containing path, updates object, and optional merge flag
 * @returns Updated status and the resulting frontmatter after merge/replace
 * @throws VaultError if path is invalid, file does not exist, or updates is not an object
 *
 * @example
 * // Add or update fields (merge mode)
 * updateFrontmatter(vault, {
 *   path: 'note.md',
 *   updates: { author: 'John', tags: ['new'] },
 *   merge: true
 * });
 *
 * @example
 * // Delete a field by setting it to null
 * updateFrontmatter(vault, {
 *   path: 'note.md',
 *   updates: { status: null },
 *   merge: true
 * });
 */
export declare function updateFrontmatter(vault: VaultAccess, args: UpdateFrontmatterArgs): Promise<UpdateFrontmatterResult>;
/**
 * Update frontmatter across multiple notes in a single operation.
 * Processes all notes independently, continuing even if some updates fail.
 * Each note update is atomic and isolated from others.
 *
 * @param vault - VaultAccess instance for file operations
 * @param args - Arguments containing array of path/frontmatter pairs and optional merge flag
 * @returns Summary of total processed, successful, failed, and detailed results per note
 * @throws VaultError if updates array is empty or invalid
 *
 * @example
 * bulkUpdateFrontmatter(vault, {
 *   updates: [
 *     { path: 'note1.md', frontmatter: { status: 'reviewed' } },
 *     { path: 'note2.md', frontmatter: { status: 'reviewed' } }
 *   ],
 *   merge: true
 * });
 */
export declare function bulkUpdateFrontmatter(vault: VaultAccess, args: BulkUpdateFrontmatterArgs): Promise<BulkUpdateFrontmatterResult>;
/**
 * Validate frontmatter against a schema across one or more notes.
 * Checks for required fields and validates field types. Returns detailed
 * validation errors for each note that fails validation.
 *
 * @param vault - VaultAccess instance for file operations
 * @param args - Arguments containing optional paths array and required schema object
 * @returns Summary of valid/invalid notes and detailed validation errors
 * @throws VaultError if schema is missing or invalid
 *
 * @example
 * auditFrontmatter(vault, {
 *   paths: ['note1.md', 'note2.md'],
 *   schema: {
 *     required: ['title', 'created'],
 *     fields: {
 *       title: { type: 'string', required: true },
 *       created: { type: 'date', required: true },
 *       tags: { type: 'array' }
 *     }
 *   }
 * });
 */
export declare function auditFrontmatter(vault: VaultAccess, args: AuditFrontmatterArgs): Promise<AuditFrontmatterResult>;
//# sourceMappingURL=frontmatter.d.ts.map