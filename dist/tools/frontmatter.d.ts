import { VaultAccess } from '../vault.js';
import { GetFrontmatterArgs, GetFrontmatterResult, UpdateFrontmatterArgs, UpdateFrontmatterResult, BulkUpdateFrontmatterArgs, BulkUpdateFrontmatterResult, AuditFrontmatterArgs, AuditFrontmatterResult } from '../types.js';
export declare function getFrontmatter(vault: VaultAccess, args: GetFrontmatterArgs): Promise<GetFrontmatterResult>;
export declare function updateFrontmatter(vault: VaultAccess, args: UpdateFrontmatterArgs): Promise<UpdateFrontmatterResult>;
export declare function bulkUpdateFrontmatter(vault: VaultAccess, args: BulkUpdateFrontmatterArgs): Promise<BulkUpdateFrontmatterResult>;
export declare function auditFrontmatter(vault: VaultAccess, args: AuditFrontmatterArgs): Promise<AuditFrontmatterResult>;
//# sourceMappingURL=frontmatter.d.ts.map