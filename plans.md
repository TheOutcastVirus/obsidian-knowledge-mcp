# Plans

## Plan 1
Obsidian Knowledge Management MCP Server - Implementation Plan

 Project Overview

 Build a local MCP server that provides stateless I/O access to an Obsidian vault. The server exposes 35+ tools for reading/writing notes, managing YAML frontmatter, discovering/creating wikilinks, and
 generating vault statistics.

 Key Design Principle: The MCP server is a "dumb" I/O layer - it provides raw data and atomic operations but performs NO semantic analysis. The LLM determines what content is related and what should be linked;
 the server just executes the operations.

 Current State

 - Greenfield project - no source code exists yet
 - Project has comprehensive requirements in project.md
 - Test Vault with 92 markdown files demonstrating real-world usage patterns
 - Test Vault insights:
   - Consistent frontmatter: Created, Type, aliases, References, Links, tags
   - 247 wikilinks across 58 files with all syntax variants
   - Academic notes with LaTeX, journal entries, Zettelkasten notes
   - Hierarchical folder structure (Studies/MATH 31AH, Intellectual, Journal, etc.)

 Technical Stack

 - TypeScript + Node.js (ES2022 modules)
 - MCP SDK: @modelcontextprotocol/sdk
 - YAML parsing: gray-matter
 - Filesystem: fs/promises (native Node.js)

 Architecture Design

 Core Layers (SOLID Principles)

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

 Key Design Decisions

 1. Wikilink Parsing: Multi-pass regex (not AST parser)
   - Obsidian wikilinks have well-defined syntax
   - Regex efficiently handles all variants: [[note]], [[note|alias]], [[note#heading|alias]], ![[image.png|size]]
   - First pass: embeds (![[...]]), second pass: regular links
 2. Error Handling: Typed errors with actionable context
   - Malformed frontmatter returns {data: null, error: "...", rawYaml: "..."} - LLM can fix YAML and retry
   - File locked errors suggest retry after delay
   - Path validation prevents directory traversal attacks
 3. Concurrency: Optimistic writes with rollback
   - No file watching (stateless principle)
   - Atomic operations using temp files + rename
   - Move operations update all backlinks, rollback on failure
 4. Response Design: Rich metadata for precise edits
   - Include line numbers and character positions
   - Return heading structure for [[note#heading]] links
   - Provide context around search matches

 Implementation Phases

 Phase 1: Foundation & Setup

 Goal: MCP server boots and core utilities work

 Tasks:
 - Initialize Node.js project with TypeScript
 - Configure MCP SDK with stdio transport
 - Implement vault.ts: path validation, file I/O, security boundary
 - Implement parser.ts: frontmatter parsing, wikilink extraction, heading extraction
 - Create shared types in types.ts

 Critical Files:
 - package.json - Dependencies and scripts
 - tsconfig.json - ES2022 modules, strict mode
 - src/types.ts - Shared interfaces (WikiLink, Frontmatter, NoteMetadata, etc.)
 - src/config.ts - Load VAULT_PATH from env
 - src/vault.ts - VaultAccess class with security validation
 - src/parser.ts - Pure parsing functions (stateless)

 Tests: Path traversal prevention, frontmatter edge cases, wikilink regex patterns

 Phase 2: Navigation Tools (Read-Only)

 Goal: LLM can explore vault structure and read notes

 Tools (5):
 1. list_notes - Filter by folder/tags/date, return paths + metadata
 2. read_note - Full content + parsed frontmatter + links + headings + stats
 3. read_notes_batch - Read multiple notes in one call (reduce round trips)
 4. search_notes - Full-text literal/regex search
 5. get_vault_structure - Folder hierarchy with note counts

 Critical Files:
 - src/index.ts - MCP server initialization, tool registration
 - src/tools/navigation.ts - All navigation tool handlers

 Tests: List all 92 notes in Test Vault, filter by MATH31AH tag, search for LaTeX patterns

 Phase 3: Note Management Tools

 Goal: Create, update, move, delete operations

 Tools (4):
 1. create_note - Create with content + frontmatter template
 2. update_note - Full replacement or section patch
 3. move_note - Relocate + update all backlinks atomically
 4. delete_note - Remove + optionally clean dangling references

 Critical Files:
 - src/tools/notes.ts - Note management handlers

 Tests: Create note with frontmatter, move note and verify backlinks updated, delete with cleanup

 Phase 4: Frontmatter & Link Tools

 Goal: Metadata manipulation and graph operations

 Frontmatter Tools (4):
 1. get_frontmatter - Parse and return structured data
 2. update_frontmatter - Modify specific fields
 3. bulk_update_frontmatter - Update across multiple notes
 4. audit_frontmatter - Check against schema

 Link Tools (7):
 1. get_links - Outgoing links with metadata (target, alias, heading, line)
 2. get_backlinks - Incoming links (resolve aliases)
 3. get_all_links - Complete link graph (adjacency list)
 4. insert_link - Add wikilink at position
 5. get_orphan_notes - Notes with no incoming/outgoing links
 6. get_headings - Heading structure (for [[note#heading]] links)
 7. find_text_occurrences - Pattern matching (for LLM to find link targets)

 Critical Files:
 - src/tools/frontmatter.ts - Frontmatter operation handlers
 - src/tools/links.ts - Link graph and manipulation handlers

 Tests: Extract all 247 wikilinks from Test Vault, resolve aliases, build complete graph, identify orphans

 Phase 5: Statistics & Production Polish

 Goal: Vault-wide analytics and deployment readiness

 Statistics Tools (2):
 1. get_tag_list - All tags with usage counts
 2. get_note_titles - All titles + aliases (for LLM to identify link targets)

 Polish:
 - Comprehensive error messages with actionable suggestions
 - Performance optimization (parallel batch operations)
 - README with setup instructions and tool documentation
 - Example Claude Desktop MCP configuration
 - Integration tests with full Test Vault

 Critical Files:
 - src/tools/stats.ts - Statistics handlers
 - src/utils/errors.ts - Custom error classes
 - README.md - Documentation
 - .env.example - Configuration template

 Critical Edge Cases

 1. Malformed Frontmatter

 ---
 tags: [unclosed array
 ---
 Handling: Return {data: null, error: "YAML parse error: ...", rawYaml: "..."}

 2. Wikilink Variations

 All patterns from Test Vault:
 - Basic: [[Linear subspaces]]
 - Alias: [[Functions|Injective, surjective, bijective functions]]
 - Heading: [[Linear transformations#Compositions|Composition]]
 - Embed: ![[image-18.webp|591x363]]

 Handling: Multi-pass regex extracts all variants with line/column positions

 3. Unicode Filenames

 Example: 数学笔记.md or Café Notes.md

 Handling: Normalize to NFC form, validate against OS-illegal chars only

 4. File Locking

 Obsidian has file open when MCP tries to write

 Handling: Retry with exponential backoff (3 attempts), clear error message if fails

 5. Circular Dependencies

 Moving note A to B when B links to A

 Handling: Detect and prevent with clear error message

 File Structure

 obsidian-knowledge-mcp/
 ├── src/
 │   ├── index.ts              # MCP server entry point
 │   ├── config.ts             # Configuration loading
 │   ├── types.ts              # Shared TypeScript interfaces
 │   ├── vault.ts              # Vault access & path validation
 │   ├── parser.ts             # Frontmatter & link parsing
 │   ├── tools/
 │   │   ├── navigation.ts     # 5 tools: list, read, search, structure
 │   │   ├── notes.ts          # 4 tools: create, update, move, delete
 │   │   ├── frontmatter.ts    # 4 tools: get, update, bulk, audit
 │   │   ├── links.ts          # 7 tools: get links, backlinks, graph operations
 │   │   └── stats.ts          # 2 tools: tags, titles
 │   └── utils/
 │       ├── errors.ts         # Custom error classes
 │       ├── validation.ts     # Input validation helpers
 │       └── formatting.ts     # Response formatting utilities
 ├── tests/
 │   ├── unit/
 │   │   ├── parser.test.ts
 │   │   ├── vault.test.ts
 │   │   └── tools/
 │   └── integration/
 │       └── vault.test.ts     # Tests against Test Vault
 ├── package.json
 ├── tsconfig.json
 ├── .env.example
 └── README.md

 Dependencies

 {
   "dependencies": {
     "@modelcontextprotocol/sdk": "^0.5.0",
     "gray-matter": "^4.0.3",
     "yaml": "^2.3.4"
   },
   "devDependencies": {
     "@types/node": "^20.10.0",
     "@typescript-eslint/eslint-plugin": "^6.13.0",
     "@typescript-eslint/parser": "^6.13.0",
     "eslint": "^8.55.0",
     "jest": "^29.7.0",
     "ts-jest": "^29.1.1",
     "typescript": "^5.3.0"
   }
 }

 Configuration

 Environment Variables (.env.example):
 VAULT_PATH=/path/to/vault
 LOG_LEVEL=info
 MAX_CONCURRENT_OPS=10

 Claude Desktop Integration (claude_desktop_config.json):
 {
   "mcpServers": {
     "obsidian-knowledge": {
       "command": "node",
       "args": ["/path/to/obsidian-knowledge-mcp/dist/index.js"],
       "env": {
         "VAULT_PATH": "/path/to/your/vault"
       }
     }
   }
 }

 Testing Strategy

 Unit Tests

 - Parser: Frontmatter edge cases, all wikilink variants, heading extraction
 - Vault: Path traversal prevention, Unicode filenames, file locking
 - Tools: Individual tool logic with mocked vault/parser

 Integration Tests

 - List all 92 notes from Test Vault
 - Find all MATH31AH tagged notes (40+ files)
 - Extract all 247 wikilinks across vault
 - Build complete link graph
 - Identify orphan notes
 - Parse LaTeX content correctly
 - Resolve wikilink targets with aliases

 Success Criteria

 - All 35+ MCP tools implemented and tested
 - 100% coverage of wikilink syntax variants from Test Vault
 - Handles all frontmatter edge cases gracefully
 - Path validation prevents directory traversal
 - Zero data loss in move/update operations
 - Successfully processes all 92 Test Vault notes
 - Extracts all 247 wikilinks correctly
 - Working Claude Desktop integration

 Tool Summary (35 Total)

 Navigation (5)

 - list_notes, read_note, read_notes_batch, search_notes, get_vault_structure

 Note Management (4)

 - create_note, update_note, move_note, delete_note

 Frontmatter (4)

 - get_frontmatter, update_frontmatter, bulk_update_frontmatter, audit_frontmatter

 Links (7)

 - get_links, get_backlinks, get_all_links, insert_link, get_orphan_notes, get_headings, find_text_occurrences

 Statistics (2)

 - get_tag_list, get_note_titles

 Total: 22 core tools (can expand with additional utilities as needed)

 Next Steps After Plan Approval

 1. Initialize Node.js project structure
 2. Set up TypeScript configuration
 3. Implement Phase 1 (Foundation)
 4. Validate with Test Vault integration tests
 5. Iterate through Phases 2-5
 6. Deploy and test with Claude Desktop