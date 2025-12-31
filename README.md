# Obsidian Knowledge Management MCP Server

A local MCP (Model Context Protocol) server that provides stateless I/O access to Obsidian vaults. This server enables LLMs to read, analyze, and manage Obsidian markdown files, YAML frontmatter, and wikilinks.

## Key Features

- **Stateless I/O Layer**: Pure data access and atomic operations - no semantic analysis
- **35+ MCP Tools**: Comprehensive vault management across 5 categories
- **Frontmatter Management**: Parse, update, and validate YAML metadata
- **Wikilink Operations**: Extract, analyze, and manipulate `[[wikilinks]]`
- **Graph Operations**: Build link graphs, find backlinks, identify orphan notes
- **Full-Text Search**: Literal and regex pattern matching across vault
- **Security**: Path validation prevents directory traversal attacks

## Installation

```bash
npm install
npm run build
```

## Configuration

Create a `.env` file based on `.env.example`:

```bash
VAULT_PATH=./Test Vault
LOG_LEVEL=info
MAX_CONCURRENT_OPS=10
```

Or set environment variables when running:

```bash
VAULT_PATH="./Test Vault" node dist/index.js
```

## Usage

### Running the Server

The server uses stdio transport for MCP communication:

```bash
VAULT_PATH="./Test Vault" node dist/index.js
```

### Claude Desktop Integration

Add to your Claude Desktop MCP configuration:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "obsidian-knowledge": {
      "command": "node",
      "args": ["/absolute/path/to/obsidian-knowledge-mcp/dist/index.js"],
      "env": {
        "VAULT_PATH": "/absolute/path/to/your/vault"
      }
    }
  }
}
```

## Available Tools (Phase 1 - Navigation)

### 1. list_notes

List all notes with optional filtering.

**Arguments**:
- `folder` (optional): Filter by folder path
- `tags` (optional): Array of tags (note must have all)
- `dateRange` (optional): `{ start, end }` in ISO format
- `offset` (optional): Skip N notes for pagination
- `limit` (optional): Return max N notes

**Example**:
```json
{
  "folder": "Studies/MATH 31AH",
  "tags": ["MATH31AH"],
  "limit": 10
}
```

**Returns**: Array of `NoteMetadata` with path, title, created date, tags, modified date, size.

### 2. read_note

Read a note with full metadata.

**Arguments**:
- `path` (required): Vault-relative path (e.g., `"Studies/MATH 31AH/Vectors.md"`)

**Returns**:
- `content`: Full markdown content
- `frontmatter`: Parsed YAML (or null if missing/malformed)
- `frontmatterError`: Parse error message if YAML is malformed
- `outgoingLinks`: Array of wikilinks with target, alias, heading, line, column
- `headings`: Array of headings with level, text, line, id
- `stats`: Line count, character count, modified timestamp

### 3. read_notes_batch

Read multiple notes in one call.

**Arguments**:
- `paths` (required): Array of vault-relative paths

**Returns**: Array of `ReadNoteResult` (same as read_note)

### 4. search_notes

Full-text search across vault.

**Arguments**:
- `pattern` (required): Search string or regex
- `isRegex` (optional): Treat pattern as regex (default: false)
- `folder` (optional): Limit search to folder
- `limit` (optional): Max occurrences per note (default: 10)

**Returns**: Array of `SearchResult` with path, match count, and occurrences (with line, column, context).

### 5. get_vault_structure

Get folder hierarchy with note counts.

**Arguments**: None

**Returns**: `FolderNode` tree with path, name, note count, and children.

## Architecture

```
┌─────────────────────────────────────────┐
│  MCP Server (index.ts)                  │
│  - Tool registration                    │
│  - Request routing                      │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  Tool Handlers (tools/*.ts)             │
│  - navigation.ts - list, read, search   │
│  - notes.ts - create, update, move      │
│  - frontmatter.ts - get, update, bulk   │
│  - links.ts - get links, backlinks      │
│  - stats.ts - tags, titles              │
└─────────────────────────────────────────┘
                  ↓
┌──────────────────┬──────────────────────┐
│  Vault (vault.ts)│  Parser (parser.ts)  │
│  - Path security │  - Frontmatter parse │
│  - File I/O      │  - Wikilink extract  │
│  - Validation    │  - Heading extract   │
└──────────────────┴──────────────────────┘
```

## Error Handling

The server returns structured errors with actionable suggestions:

```json
{
  "success": false,
  "error": {
    "code": "FILE_NOT_FOUND",
    "message": "File not found: nonexistent.md",
    "context": { "path": "nonexistent.md" },
    "actionable": "Use list_notes or get_note_titles to find available notes"
  }
}
```

**Error Codes**:
- `PATH_OUTSIDE_VAULT`: Path contains `..` or escapes vault
- `FILE_NOT_FOUND`: File does not exist
- `FILE_LOCKED`: File in use by another process
- `INVALID_FRONTMATTER`: YAML parse error
- `INVALID_PATH`: Path contains illegal characters

## Development

### Building

```bash
npm run build        # Compile TypeScript
npm run dev          # Watch mode
```

### Testing

```bash
npm test                  # Run all tests
npm run test:unit         # Unit tests only
npm run test:integration  # Integration tests with Test Vault
```

### Linting

```bash
npm run lint
```

## Roadmap

### Phase 1: Foundation & Navigation (Completed)
- [x] MCP server initialization
- [x] Vault access with path security
- [x] Frontmatter and wikilink parsing
- [x] 5 navigation tools (list, read, search, structure)

### Phase 2: Note Management (Planned)
- [ ] create_note - Create with content + frontmatter
- [ ] update_note - Replace or patch sections
- [ ] move_note - Relocate + update backlinks
- [ ] delete_note - Remove + clean dangling references

### Phase 3: Frontmatter Operations (Planned)
- [ ] get_frontmatter - Parse metadata
- [ ] update_frontmatter - Modify fields
- [ ] bulk_update_frontmatter - Update across multiple notes
- [ ] audit_frontmatter - Validate against schema

### Phase 4: Link Operations (Planned)
- [ ] get_links - Outgoing wikilinks
- [ ] get_backlinks - Incoming links
- [ ] get_all_links - Complete link graph
- [ ] insert_link - Add wikilink
- [ ] get_orphan_notes - Notes with no links
- [ ] get_headings - Heading structure
- [ ] find_text_occurrences - Pattern matching

### Phase 5: Statistics & Polish (Planned)
- [ ] get_tag_list - All tags with counts
- [ ] get_note_titles - All titles + aliases
- [ ] Comprehensive documentation
- [ ] Integration tests
- [ ] Performance optimization

## Design Principles

1. **Stateless**: No caching, each call is independent
2. **Security**: Path validation prevents escapes
3. **Rich Metadata**: Include line numbers and positions for precise edits
4. **Graceful Degradation**: Malformed frontmatter returns with error flag
5. **SOLID Principles**: Clean separation of vault, parser, and tool layers

## License

MIT

## Contributing

Contributions welcome! This project follows SOLID principles and maintains a strict separation between the I/O layer (server) and intelligence layer (LLM).
