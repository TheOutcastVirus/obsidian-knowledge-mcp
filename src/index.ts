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
