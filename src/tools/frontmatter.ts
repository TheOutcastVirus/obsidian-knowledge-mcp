import { VaultAccess } from '../vault.js';
import { VaultError, ERROR_CODES } from '../utils/errors.js';
import {
  GetFrontmatterArgs,
  GetFrontmatterResult,
  UpdateFrontmatterArgs,
  UpdateFrontmatterResult,
  BulkUpdateFrontmatterArgs,
  BulkUpdateFrontmatterResult,
  AuditFrontmatterArgs,
  AuditFrontmatterResult,
  FrontmatterSchema,
  FieldSchema,
  ValidationError,
} from '../types.js';
import {
  parseFrontmatter,
  updateFrontmatterInContent,
} from '../parser.js';

export async function getFrontmatter(
  vault: VaultAccess,
  args: GetFrontmatterArgs
): Promise<GetFrontmatterResult> {
  if (!args.path || !args.path.endsWith('.md')) {
    throw new VaultError(
      'Path must be a markdown file ending with .md',
      ERROR_CODES.INVALID_PATH,
      { path: args.path }
    );
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

export async function updateFrontmatter(
  vault: VaultAccess,
  args: UpdateFrontmatterArgs
): Promise<UpdateFrontmatterResult> {
  const { path: notePath, updates, merge = true } = args;

  if (!notePath || !notePath.endsWith('.md')) {
    throw new VaultError(
      'Path must be a markdown file ending with .md',
      ERROR_CODES.INVALID_PATH,
      { path: notePath }
    );
  }

  if (!updates || typeof updates !== 'object') {
    throw new VaultError(
      'Updates must be an object',
      ERROR_CODES.INVALID_ARGS,
      { path: notePath }
    );
  }

  const exists = await vault.fileExists(notePath);
  if (!exists) {
    throw new VaultError(
      `File not found: ${notePath}`,
      ERROR_CODES.FILE_NOT_FOUND,
      { path: notePath }
    );
  }

  const content = await vault.readFile(notePath);
  const parsed = parseFrontmatter(content);

  let finalFrontmatter: Record<string, unknown>;

  if (merge && parsed.data) {
    finalFrontmatter = mergeFrontmatter(parsed.data, updates);
  } else {
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

export async function bulkUpdateFrontmatter(
  vault: VaultAccess,
  args: BulkUpdateFrontmatterArgs
): Promise<BulkUpdateFrontmatterResult> {
  const { updates, merge = true } = args;

  if (!Array.isArray(updates) || updates.length === 0) {
    throw new VaultError(
      'Updates must be a non-empty array',
      ERROR_CODES.INVALID_ARGS,
      { updatesLength: updates?.length }
    );
  }

  const results: BulkUpdateFrontmatterResult = {
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
    } catch (error: unknown) {
      results.failed++;

      const errorMessage =
        error instanceof VaultError
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

export async function auditFrontmatter(
  vault: VaultAccess,
  args: AuditFrontmatterArgs
): Promise<AuditFrontmatterResult> {
  const { paths, schema } = args;

  if (!schema || typeof schema !== 'object') {
    throw new VaultError(
      'Schema is required and must be an object',
      ERROR_CODES.INVALID_ARGS,
      { schema }
    );
  }

  let notePaths: string[];
  if (paths && paths.length > 0) {
    notePaths = paths;
  } else {
    const allFiles = await vault.listFiles();
    notePaths = allFiles.map((f) => f.path);
  }

  const results: AuditFrontmatterResult = {
    totalNotes: notePaths.length,
    validNotes: 0,
    invalidNotes: 0,
    details: [],
  };

  for (const notePath of notePaths) {
    try {
      const content = await vault.readFile(notePath);
      const parsed = parseFrontmatter(content);

      const errors: ValidationError[] = [];
      if (parsed.error) {
        errors.push({
          field: '_frontmatter',
          type: 'parse_error',
          message: parsed.error,
        });
      }

      const schemaErrors = validateFrontmatterAgainstSchema(
        parsed.data,
        schema
      );
      errors.push(...schemaErrors);

      if (errors.length === 0) {
        results.validNotes++;
        results.details.push({
          path: notePath,
          valid: true,
          errors: [],
        });
      } else {
        results.invalidNotes++;
        results.details.push({
          path: notePath,
          valid: false,
          errors,
        });
      }
    } catch (error: unknown) {
      results.invalidNotes++;
      results.details.push({
        path: notePath,
        valid: false,
        errors: [
          {
            field: '_file',
            type: 'parse_error',
            message:
              error instanceof Error ? error.message : String(error),
          },
        ],
      });
    }
  }

  return results;
}

function mergeFrontmatter(
  existing: Record<string, unknown>,
  updates: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...existing };

  for (const [key, value] of Object.entries(updates)) {
    if (value === null) {
      delete result[key];
    } else {
      result[key] = value;
    }
  }

  return result;
}

function validateFrontmatterAgainstSchema(
  frontmatter: Record<string, unknown> | null,
  schema: FrontmatterSchema
): ValidationError[] {
  const errors: ValidationError[] = [];

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
        const error = validateFieldType(
          frontmatter[fieldName],
          fieldName,
          fieldSchema
        );
        if (error) {
          errors.push(error);
        }
      } else if (fieldSchema.required) {
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

function validateFieldType(
  value: unknown,
  fieldName: string,
  schema: FieldSchema
): ValidationError | null {
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
