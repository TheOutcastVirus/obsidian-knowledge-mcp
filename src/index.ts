#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { loadConfig } from './config.js';
import { VaultAccess } from './vault.js';
import { VaultError, getActionableSuggestion } from './utils/errors.js';
import * as navigation from './tools/navigation.js';
import * as notes from './tools/notes.js';
import * as frontmatter from './tools/frontmatter.js';

const config = loadConfig();
const vault = new VaultAccess(config.vaultPath);

const server = new Server(
  {
    name: 'obsidian-knowledge-mcp',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'list_notes',
      description:
        'List all notes in the vault with optional filtering by folder, tags, or date range. ' +
        'Returns paths and metadata (title, created date, tags, modified date, size). ' +
        'Use offset and limit for pagination.',
      inputSchema: {
        type: 'object',
        properties: {
          folder: {
            type: 'string',
            description: 'Filter by folder path (relative to vault root)',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description: 'Filter by tags (note must have all specified tags)',
          },
          dateRange: {
            type: 'object',
            properties: {
              start: { type: 'string', description: 'Start date (ISO format)' },
              end: { type: 'string', description: 'End date (ISO format)' },
            },
            description: 'Filter by creation date range',
          },
          offset: {
            type: 'number',
            description: 'Number of notes to skip (for pagination)',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of notes to return',
          },
        },
      },
    },
    {
      name: 'read_note',
      description:
        'Read a note with full metadata including parsed frontmatter, outgoing wikilinks, ' +
        'headings, and file statistics. Returns complete context about a single note. ' +
        'If frontmatter is malformed, frontmatterError will contain the parse error.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Vault-relative path to the note (e.g., "folder/note.md")',
          },
        },
        required: ['path'],
      },
    },
    {
      name: 'read_notes_batch',
      description:
        'Read multiple notes in a single call to reduce round trips. ' +
        'Returns an array of note results with full metadata for each.',
      inputSchema: {
        type: 'object',
        properties: {
          paths: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of vault-relative paths to read',
          },
        },
        required: ['paths'],
      },
    },
    {
      name: 'search_notes',
      description:
        'Full-text search across vault using literal string or regex pattern. ' +
        'Returns matching notes with context around each match. ' +
        'Use this to find potential link targets or analyze content patterns.',
      inputSchema: {
        type: 'object',
        properties: {
          pattern: {
            type: 'string',
            description: 'Search pattern (literal string or regex)',
          },
          isRegex: {
            type: 'boolean',
            description: 'Whether pattern is a regex (default: false)',
          },
          folder: {
            type: 'string',
            description: 'Limit search to specific folder',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of occurrences per note to return (default: 10)',
          },
        },
        required: ['pattern'],
      },
    },
    {
      name: 'get_vault_structure',
      description:
        'Get the complete folder hierarchy of the vault with note counts. ' +
        'Useful for understanding vault organization and structure.',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    {
      name: 'create_note',
      description:
        'Create a new note with optional content and frontmatter. ' +
        'The parent folder will be created if it does not exist. ' +
        'Throws an error if the file already exists.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Vault-relative path for the new note (must end with .md)',
          },
          content: {
            type: 'string',
            description: 'Initial content for the note (optional)',
          },
          frontmatter: {
            type: 'object',
            description: 'YAML frontmatter to add to the note (optional)',
          },
        },
        required: ['path'],
      },
    },
    {
      name: 'update_note',
      description:
        'Update an existing note with new content. Completely replaces the note content. ' +
        'Throws an error if the file does not exist.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Vault-relative path to the note to update',
          },
          content: {
            type: 'string',
            description: 'New content for the note',
          },
        },
        required: ['path', 'content'],
      },
    },
    {
      name: 'move_note',
      description:
        'Move a note to a new location and optionally update all backlinks. ' +
        'Atomically updates all references in other notes if updateBacklinks is true. ' +
        'Rolls back on failure. Creates parent folder if needed.',
      inputSchema: {
        type: 'object',
        properties: {
          oldPath: {
            type: 'string',
            description: 'Current vault-relative path of the note',
          },
          newPath: {
            type: 'string',
            description: 'New vault-relative path for the note',
          },
          updateBacklinks: {
            type: 'boolean',
            description: 'Whether to update all references to this note (default: true)',
          },
        },
        required: ['oldPath', 'newPath'],
      },
    },
    {
      name: 'delete_note',
      description:
        'Delete a note and optionally clean up all references to it in other notes. ' +
        'If cleanupReferences is true, removes all wikilinks pointing to this note. ' +
        'Returns information about affected notes.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Vault-relative path to the note to delete',
          },
          cleanupReferences: {
            type: 'boolean',
            description: 'Whether to remove all wikilinks to this note (default: false)',
          },
        },
        required: ['path'],
      },
    },
    {
      name: 'get_frontmatter',
      description:
        'Extract and parse YAML frontmatter from a single note. ' +
        'Returns the parsed frontmatter data, raw YAML, and any parse errors. ' +
        'Use this to inspect metadata before updating.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Vault-relative path to the note',
          },
        },
        required: ['path'],
      },
    },
    {
      name: 'update_frontmatter',
      description:
        'Update frontmatter fields in a single note without touching content. ' +
        'By default, merges with existing frontmatter (merge: true). ' +
        'Set a field to null to delete it. Set merge to false to replace entire frontmatter.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Vault-relative path to the note',
          },
          updates: {
            type: 'object',
            description: 'Frontmatter fields to add/update. Set field to null to delete it.',
          },
          merge: {
            type: 'boolean',
            description: 'Whether to merge with existing frontmatter (default: true)',
          },
        },
        required: ['path', 'updates'],
      },
    },
    {
      name: 'bulk_update_frontmatter',
      description:
        'Update frontmatter across multiple notes in a single operation. ' +
        'Continues on error and returns detailed results for each note. ' +
        'Each note update is independent and atomic.',
      inputSchema: {
        type: 'object',
        properties: {
          updates: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                path: { type: 'string' },
                frontmatter: { type: 'object' },
              },
              required: ['path', 'frontmatter'],
            },
            description: 'Array of path/frontmatter pairs to update',
          },
          merge: {
            type: 'boolean',
            description: 'Whether to merge with existing frontmatter (default: true)',
          },
        },
        required: ['updates'],
      },
    },
    {
      name: 'audit_frontmatter',
      description:
        'Validate frontmatter against a schema across one or more notes. ' +
        'Checks required fields and basic type validation. ' +
        'Returns detailed validation errors for each invalid note.',
      inputSchema: {
        type: 'object',
        properties: {
          paths: {
            type: 'array',
            items: { type: 'string' },
            description: 'Optional: specific notes to audit. If omitted, audits entire vault.',
          },
          schema: {
            type: 'object',
            properties: {
              required: {
                type: 'array',
                items: { type: 'string' },
                description: 'Array of required field names',
              },
              fields: {
                type: 'object',
                description: 'Field-specific validation rules',
                additionalProperties: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      enum: ['string', 'number', 'boolean', 'array', 'object', 'date'],
                    },
                    required: { type: 'boolean' },
                    allowNull: { type: 'boolean' },
                  },
                },
              },
            },
            description: 'Validation schema for frontmatter',
          },
        },
        required: ['schema'],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'list_notes': {
        const result = await navigation.listNotes(vault, args || {});
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'read_note': {
        if (!args || typeof args !== 'object' || !('path' in args)) {
          throw new Error('Missing required argument: path');
        }
        const result = await navigation.readNote(vault, args as { path: string });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'read_notes_batch': {
        if (!args || typeof args !== 'object' || !('paths' in args)) {
          throw new Error('Missing required argument: paths');
        }
        const result = await navigation.readNotesBatch(vault, args as { paths: string[] });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'search_notes': {
        if (!args || typeof args !== 'object' || !('pattern' in args)) {
          throw new Error('Missing required argument: pattern');
        }
        const result = await navigation.searchNotes(vault, args as { pattern: string; isRegex?: boolean; folder?: string; limit?: number });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'get_vault_structure': {
        const result = await navigation.getVaultStructure(vault);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'create_note': {
        if (!args || typeof args !== 'object' || !('path' in args)) {
          throw new Error('Missing required argument: path');
        }
        const result = await notes.createNote(
          vault,
          args as { path: string; content?: string; frontmatter?: Record<string, unknown> }
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'update_note': {
        if (!args || typeof args !== 'object' || !('path' in args) || !('content' in args)) {
          throw new Error('Missing required arguments: path, content');
        }
        const result = await notes.updateNote(
          vault,
          args as { path: string; content: string }
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'move_note': {
        if (!args || typeof args !== 'object' || !('oldPath' in args) || !('newPath' in args)) {
          throw new Error('Missing required arguments: oldPath, newPath');
        }
        const result = await notes.moveNote(
          vault,
          args as { oldPath: string; newPath: string; updateBacklinks?: boolean }
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'delete_note': {
        if (!args || typeof args !== 'object' || !('path' in args)) {
          throw new Error('Missing required argument: path');
        }
        const result = await notes.deleteNote(
          vault,
          args as { path: string; cleanupReferences?: boolean }
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'get_frontmatter': {
        if (!args || typeof args !== 'object' || !('path' in args)) {
          throw new Error('Missing required argument: path');
        }
        const result = await frontmatter.getFrontmatter(
          vault,
          args as { path: string }
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'update_frontmatter': {
        if (!args || typeof args !== 'object' || !('path' in args) || !('updates' in args)) {
          throw new Error('Missing required arguments: path, updates');
        }
        const result = await frontmatter.updateFrontmatter(
          vault,
          args as { path: string; updates: Record<string, unknown>; merge?: boolean }
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'bulk_update_frontmatter': {
        if (!args || typeof args !== 'object' || !('updates' in args)) {
          throw new Error('Missing required argument: updates');
        }
        const result = await frontmatter.bulkUpdateFrontmatter(
          vault,
          args as {
            updates: Array<{ path: string; frontmatter: Record<string, unknown> }>;
            merge?: boolean;
          }
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'audit_frontmatter': {
        if (!args || typeof args !== 'object' || !('schema' in args)) {
          throw new Error('Missing required argument: schema');
        }
        const result = await frontmatter.auditFrontmatter(
          vault,
          args as {
            paths?: string[];
            schema: {
              required?: string[];
              fields?: Record<
                string,
                {
                  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date';
                  required?: boolean;
                  allowNull?: boolean;
                }
              >;
            };
          }
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: unknown) {
    if (error instanceof VaultError) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: false,
                error: {
                  code: error.code,
                  message: error.message,
                  context: error.context,
                  actionable: getActionableSuggestion(error.code),
                },
              },
              null,
              2
            ),
          },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              success: false,
              error: {
                message: error instanceof Error ? error.message : String(error),
              },
            },
            null,
            2
          ),
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Obsidian Knowledge MCP Server running');
  console.error(`Vault path: ${config.vaultPath}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
