import { VaultError, ERROR_CODES } from '../utils/errors.js';
import { parseFrontmatter, updateFrontmatterInContent, } from '../parser.js';
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
export async function getFrontmatter(vault, args) {
    if (!args.path || !args.path.endsWith('.md')) {
        throw new VaultError('Path must be a markdown file ending with .md', ERROR_CODES.INVALID_PATH, { path: args.path });
    }
    const content = await vault.readFile(args.path);
    const parsed = parseFrontmatter(content);
    return {
        path: args.path,
        frontmatter: parsed.data,
        error: parsed.error,
        rawYaml: parsed.rawYaml,
    };
}
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
export async function updateFrontmatter(vault, args) {
    const { path: notePath, updates, merge = true } = args;
    if (!notePath || !notePath.endsWith('.md')) {
        throw new VaultError('Path must be a markdown file ending with .md', ERROR_CODES.INVALID_PATH, { path: notePath });
    }
    if (!updates || typeof updates !== 'object') {
        throw new VaultError('Updates must be an object', ERROR_CODES.INVALID_ARGS, { path: notePath });
    }
    const exists = await vault.fileExists(notePath);
    if (!exists) {
        throw new VaultError(`File not found: ${notePath}`, ERROR_CODES.FILE_NOT_FOUND, { path: notePath });
    }
    const content = await vault.readFile(notePath);
    const parsed = parseFrontmatter(content);
    let finalFrontmatter;
    if (merge && parsed.data) {
        finalFrontmatter = mergeFrontmatter(parsed.data, updates);
    }
    else {
        finalFrontmatter = { ...updates };
        Object.keys(finalFrontmatter).forEach((key) => {
            if (finalFrontmatter[key] === null) {
                delete finalFrontmatter[key];
            }
        });
    }
    const updatedContent = updateFrontmatterInContent(content, finalFrontmatter);
    await vault.writeFile(notePath, updatedContent);
    return {
        path: notePath,
        updated: true,
        frontmatter: finalFrontmatter,
    };
}
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
export async function bulkUpdateFrontmatter(vault, args) {
    const { updates, merge = true } = args;
    if (!Array.isArray(updates) || updates.length === 0) {
        throw new VaultError('Updates must be a non-empty array', ERROR_CODES.INVALID_ARGS, { updatesLength: updates?.length });
    }
    const results = {
        totalProcessed: updates.length,
        successful: 0,
        failed: 0,
        details: [],
    };
    for (const update of updates) {
        try {
            const result = await updateFrontmatter(vault, {
                path: update.path,
                updates: update.frontmatter,
                merge,
            });
            results.successful++;
            results.details.push({
                path: update.path,
                success: true,
                frontmatter: result.frontmatter,
            });
        }
        catch (error) {
            results.failed++;
            const errorMessage = error instanceof VaultError
                ? error.message
                : error instanceof Error
                    ? error.message
                    : String(error);
            results.details.push({
                path: update.path,
                success: false,
                error: errorMessage,
            });
        }
    }
    return results;
}
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
export async function auditFrontmatter(vault, args) {
    const { paths, schema } = args;
    if (!schema || typeof schema !== 'object') {
        throw new VaultError('Schema is required and must be an object', ERROR_CODES.INVALID_ARGS, { schema });
    }
    let notePaths;
    if (paths && paths.length > 0) {
        notePaths = paths;
    }
    else {
        const allFiles = await vault.listFiles();
        notePaths = allFiles.map((f) => f.path);
    }
    const results = {
        totalNotes: notePaths.length,
        validNotes: 0,
        invalidNotes: 0,
        details: [],
    };
    for (const notePath of notePaths) {
        try {
            const content = await vault.readFile(notePath);
            const parsed = parseFrontmatter(content);
            const errors = [];
            if (parsed.error) {
                errors.push({
                    field: '_frontmatter',
                    type: 'parse_error',
                    message: parsed.error,
                });
            }
            const schemaErrors = validateFrontmatterAgainstSchema(parsed.data, schema);
            errors.push(...schemaErrors);
            if (errors.length === 0) {
                results.validNotes++;
                results.details.push({
                    path: notePath,
                    valid: true,
                    errors: [],
                });
            }
            else {
                results.invalidNotes++;
                results.details.push({
                    path: notePath,
                    valid: false,
                    errors,
                });
            }
        }
        catch (error) {
            results.invalidNotes++;
            results.details.push({
                path: notePath,
                valid: false,
                errors: [
                    {
                        field: '_file',
                        type: 'parse_error',
                        message: error instanceof Error ? error.message : String(error),
                    },
                ],
            });
        }
    }
    return results;
}
/**
 * Merge existing frontmatter with updates, handling null deletions.
 * Creates a new object by copying existing frontmatter and applying updates.
 * Fields set to null in updates are deleted from the result.
 *
 * @param existing - Current frontmatter data
 * @param updates - Updates to apply (null values delete fields)
 * @returns Merged frontmatter with null fields removed
 */
function mergeFrontmatter(existing, updates) {
    const result = { ...existing };
    for (const [key, value] of Object.entries(updates)) {
        if (value === null) {
            delete result[key];
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
/**
 * Validate frontmatter data against a schema definition.
 * Checks both globally required fields and per-field validation rules.
 * Returns an array of validation errors, empty if all validations pass.
 *
 * @param frontmatter - Frontmatter data to validate (may be null)
 * @param schema - Schema definition with required fields and field rules
 * @returns Array of validation errors (empty if valid)
 */
function validateFrontmatterAgainstSchema(frontmatter, schema) {
    const errors = [];
    if (schema.required) {
        for (const requiredField of schema.required) {
            if (!frontmatter || !(requiredField in frontmatter)) {
                errors.push({
                    field: requiredField,
                    type: 'missing_required',
                    message: `Required field "${requiredField}" is missing`,
                });
            }
        }
    }
    if (schema.fields && frontmatter) {
        for (const [fieldName, fieldSchema] of Object.entries(schema.fields)) {
            if (fieldName in frontmatter) {
                const error = validateFieldType(frontmatter[fieldName], fieldName, fieldSchema);
                if (error) {
                    errors.push(error);
                }
            }
            else if (fieldSchema.required) {
                errors.push({
                    field: fieldName,
                    type: 'missing_required',
                    message: `Required field "${fieldName}" is missing`,
                });
            }
        }
    }
    return errors;
}
/**
 * Validate a single field value against its schema definition.
 * Checks type compatibility and null handling based on schema rules.
 * Supports string, number, boolean, array, object, and date types.
 *
 * @param value - The field value to validate
 * @param fieldName - Name of the field being validated (for error messages)
 * @param schema - Schema definition for this field
 * @returns ValidationError if invalid, null if valid
 */
function validateFieldType(value, fieldName, schema) {
    if (value === null) {
        if (schema.allowNull) {
            return null;
        }
        return {
            field: fieldName,
            type: 'invalid_type',
            message: `Field "${fieldName}" cannot be null`,
            expected: schema.type || 'any',
            actual: 'null',
        };
    }
    if (!schema.type) {
        return null;
    }
    const actualType = Array.isArray(value) ? 'array' : typeof value;
    let isValid = false;
    switch (schema.type) {
        case 'string':
            isValid = typeof value === 'string';
            break;
        case 'number':
            isValid = typeof value === 'number';
            break;
        case 'boolean':
            isValid = typeof value === 'boolean';
            break;
        case 'array':
            isValid = Array.isArray(value);
            break;
        case 'object':
            isValid = typeof value === 'object' && !Array.isArray(value);
            break;
        case 'date':
            isValid =
                value instanceof Date ||
                    (typeof value === 'string' && !isNaN(Date.parse(value)));
            break;
    }
    if (!isValid) {
        return {
            field: fieldName,
            type: 'invalid_type',
            message: `Field "${fieldName}" has invalid type`,
            expected: schema.type,
            actual: actualType,
        };
    }
    return null;
}
//# sourceMappingURL=frontmatter.js.map