# Obsidian Knowledge MCP
## Initial project description
The goal of this project is to create an MCP server that will interface with Obsidian in order to help with knowledge management in order for me to navigate my life better. 

Currently, I am using Obsidian for a multitude of purposes, from taking connected notes for my college classes, recording my own thoughts and notes, documentation for my lab, journal entries, reflections, creating notes to different tasks I have to create, etc. Essentially, any kind of notes, thoughts, or documentation that I have to deal with, I use Obsidian in the form of .md notes. 

However, it takes a lot of effort to keep the vault (which is what the collection of notes is called) organized. This involves making sure the notes, which contain YAML frontmatter are tagged correctly, and I have to manually find connections between notes and add the internal wikilinks to connect them so that they show up as connected in graph view.

My hypothesis is that if I allow an LLM to control and edit my vault through and MCP, as well as a custom system prompt that tells the LLM how exactly to deal with my notes, I can essentially offload the grunt work it takes to manage my knowledge in the vault to the LLM system. This could include tasks like parsing through my vault and finding connections between notes that have not been linked.

The goal is to make an MC server program that lives locally on my computer, and ca be configured to interface with a certain vault specificied with a system path. The MCP server does not run as an obsidian plugin however. It is its own program. The MCP server offers functionality for the LLM to do the tasks described above, through directly reading and writing to the .md files that make up my vault. The server should be smart in what kinds of context it gives the LLM based on each tool call, to allow the LLM to not need to relearn how to use the MCP tools every single time it tries to complete a task.

## LLM-generated prompts
### ChatGPT
```markdown
You are Claude Code, acting as a senior software engineer and systems designer.

## Project Goal
Design and implement a **local MCP (Model Context Protocol) server** that interfaces with an **Obsidian vault** (a directory of Markdown `.md` files) to automate knowledge-management tasks.

This MCP server will allow an LLM to safely and intelligently **read, write, reorganize, and analyze** notes in an Obsidian vault to reduce the manual effort of keeping the vault organized and well-connected.

The MCP server:
- Runs **locally** as a standalone program
- Is **not** an Obsidian plugin
- Operates directly on `.md` files via the filesystem
- Is configured with a **system path to a specific Obsidian vault**

---

## Background & Motivation
The vault contains:
- College class notes
- Personal thoughts and reflections
- Lab documentation
- Journal entries
- Task notes and planning documents

Notes often contain:
- YAML frontmatter (tags, metadata, etc.)
- Obsidian-style wikilinks (`[[Note Name]]`)

Manual maintenance is costly:
- Tags must be curated by hand
- Links between related notes must be manually discovered and added
- Notes drift out of organizational consistency over time

The hypothesis is that an LLM, given **controlled MCP access**, can offload this grunt work:
- Discovering missing links between related notes
- Normalizing YAML frontmatter
- Suggesting or inserting tags
- Reorganizing notes into folders
- Refactoring note titles or content while preserving meaning

---

## High-Level Requirements

### MCP Server Responsibilities
1. **Expose MCP tools** that allow an LLM to:
   - Read individual notes
   - Read note metadata (YAML frontmatter)
   - Write/update notes
   - Create new notes
   - Delete notes
   - Move/rename notes
   - List notes and directory structure
   - Search notes by content, tags, or metadata

2. **Context-Aware Tool Design**
   - Tools should return only *necessary* context for a given operation
   - Avoid dumping the entire vault unless explicitly requested
   - Make it easy for the LLM to reason incrementally
   - Tools should be discoverable and self-describing

3. **State & Memory**
   - The MCP server should help avoid the LLM “relearning” the toolset every request
   - Use tool schemas, naming, and documentation to guide correct usage
   - If appropriate, maintain lightweight server-side state (e.g. cached indexes)

4. **Safety & Integrity**
   - Prevent accidental destructive actions
   - Require explicit intent for deletes or large refactors
   - Prefer idempotent or reversible operations where possible
   - Validate YAML frontmatter before writing
   - Preserve Markdown formatting and Obsidian conventions

---

## Functional Capabilities (Initial Scope)

### Read / Analyze
- Parse Markdown + YAML frontmatter
- Detect:
  - Missing or inconsistent tags
  - Unlinked but semantically related notes
  - Orphaned notes
  - Broken wikilinks

### Write / Modify
- Insert or update YAML frontmatter
- Add wikilinks where appropriate
- Normalize formatting
- Rename notes while updating backlinks
- Create summary or index notes when requested

### Organization
- Move notes into folders based on metadata
- Maintain consistent naming conventions
- Optionally generate or update “hub” notes

---

## Non-Goals (For Now)
- No GUI
- No Obsidian plugin APIs
- No cloud hosting
- No automatic background mutation without an explicit LLM instruction

---

## Technical Guidance
- Choose a language well-suited for filesystem work and MCP support
- Prioritize clarity, safety, and debuggability over cleverness
- Design for extensibility: new tools and heuristics should beYou're right. The MCP server is just a dumb interface layer - it parses files and manages I/O, but has no semantic understanding. Determining what content is "related" requires reasoning that only the LLM can do.

Here's the corrected prompt:

```markdown
# Project: Obsidian Knowledge Management MCP Server

## Overview
Build a local MCP (Model Context Protocol) server that interfaces with an Obsidian vault to automate knowledge management tasks. The server reads and writes .md files directly, providing the LLM with the raw data and tools it needs to organize notes, manage YAML frontmatter, discover connections, and maintain wikilinks.

**Key principle:** The MCP server is a stateless I/O layer. It does not perform semantic analysis, suggest connections, or make decisions about content relatedness. Those are the LLM's responsibilities. The server's job is to efficiently expose vault data and provide atomic operations for modification.

## Core Requirements

### Configuration
- Accept vault path via environment variable or config file
- Validate vault exists and is accessible before starting
- Support standard Obsidian vault structure (folders, attachments, .obsidian config)

### MCP Tools to Implement

**Vault Navigation**
- `list_notes` - List all notes with optional filtering by folder, tags, or date range. Returns paths and basic metadata (size, modified date, frontmatter summary).
- `read_note` - Read full note content with parsed frontmatter
- `read_notes_batch` - Read multiple notes in one call to reduce round trips when LLM needs to compare content
- `search_notes` - Full-text search across vault (literal/regex matching, not semantic)
- `get_vault_structure` - Return folder hierarchy and note counts

**Note Management**
- `create_note` - Create new note with content and frontmatter
- `update_note` - Replace note content entirely or patch specific sections
- `move_note` - Relocate note and update all backlinks pointing to it
- `delete_note` - Remove note with option to clean up dangling references

**Frontmatter Operations**
- `get_frontmatter` - Parse and return YAML frontmatter as structured data
- `update_frontmatter` - Modify specific frontmatter fields (tags, aliases, dates, custom fields)
- `bulk_update_frontmatter` - Update frontmatter across multiple notes matching criteria

**Link Operations**
- `get_links` - Return all outgoing wikilinks from a note (parsed into target, alias, heading if present)
- `get_backlinks` - Find all notes containing wikilinks to a specific note
- `get_all_links` - Return complete link graph as adjacency list
- `find_text_occurrences` - Find all occurrences of a string/pattern across vault (useful for LLM to find potential link targets)
- `insert_link` - Insert wikilink at specified position in note
- `get_orphan_notes` - Find notes with no incoming or outgoing links
- `get_headings` - Extract all headings from a note (for linking to subheadings)

**Vault Statistics**
- `get_tag_list` - Return all tags with usage counts
- `get_note_titles` - Return list of all note titles/filenames (for LLM to identify link targets)
- `audit_frontmatter` - Check notes for missing fields against a provided schema

### Technical Specifications

**Stack**
- TypeScript with Node.js
- MCP SDK (@modelcontextprotocol/sdk)
- gray-matter for YAML frontmatter parsing
- Standard filesystem operations (fs/promises)

**Architecture**
- Stateless tool handlers - each call is independent
- No caching of content (vault may change between calls)
- Batch operations to minimize LLM round trips
- File watching not required

**Tool Response Design**
- Return raw data, not interpretations
- Include structural metadata (line numbers, character positions) to enable precise edits
- Error details with actionable information

**Example read_note response:**
```json
{
  "path": "projects/mcp-server.md",
  "content": "# MCP Server\n\nThis project interfaces with [[Obsidian]]...",
  "frontmatter": { 
    "tags": ["project", "coding"], 
    "created": "2024-01-15",
    "aliases": ["obsidian-mcp"]
  },
  "outgoing_links": [
    { "target": "Obsidian", "alias": null, "heading": null, "line": 3 }
  ],
  "headings": [
    { "level": 1, "text": "MCP Server", "line": 1 },
    { "level": 2, "text": "Overview", "line": 5 }
  ],
  "stats": {
    "lines": 47,
    "characters": 2341,
    "modified": "2024-01-20T14:30:00Z"
  }
}
```

**Example workflow (LLM-driven):**
1. LLM calls `get_note_titles` to learn what notes exist
2. LLM calls `read_notes_batch` on a subset to analyze content
3. LLM identifies that note A mentions concepts from note B but has no link
4. LLM calls `insert_link` to add the connection

The server never decides what should be linked - it just provides the data and executes the edits.

**Error Handling**
- Graceful handling of malformed frontmatter (return raw content with parse error flag)
- Return clear errors if file is locked or inaccessible
- Validate file paths are within vault before any operation

### File Structure
```
obsidian-mcp/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── vault.ts              # Vault access and path validation
│   ├── parser.ts             # Frontmatter and link parsing
│   └── tools/
│       ├── navigation.ts     # list, read, search, structure
│       ├── notes.ts          # create, update, move, delete
│       ├── frontmatter.ts    # get, update, bulk, audit
│       ├── links.ts          # get links, backlinks, insert, orphans
│       └── stats.ts          # tags, titles, vault-wide queries
├── package.json
├── tsconfig.json
└── README.md
```

## Constraints
- Do not modify .obsidian folder contents
- Preserve file modification timestamps when only updating frontmatter (if possible)
- Handle unicode in filenames and content
- Support wikilink syntax variations: `[[note]]`, `[[note|alias]]`, `[[note#heading]]`, `[[note#heading|alias]]`
- All paths relative to vault root in API, resolved internally

## Testing
- Unit tests for frontmatter and link parsing edge cases
- Integration tests with sample vault containing various edge cases
- Test handling of malformed/unusual markdown

## Deliverables
1. Working MCP server installable via npm
2. README with setup instructions and tool documentation
3. Example configuration for Claude Desktop MCP client
``` easy to add
- Assume the LLM is powerful but fallible—guardrails matter

---

## Deliverables
1. MCP server architecture overview
2. Tool definitions (names, inputs, outputs, semantics)
3. File system safety strategy
4. Indexing / caching strategy (if any)
5. Clear implementation plan
6. Example MCP tool calls for common workflows

Begin by proposing a clean architecture and tool schema before writing code.
```
### Claude Opus

```markdown
# Project: Obsidian Knowledge Management MCP Server

## Overview
Build a local MCP (Model Context Protocol) server that interfaces with an Obsidian vault to automate knowledge management tasks. The server reads and writes .md files directly, providing the LLM with the raw data and tools it needs to organize notes, manage YAML frontmatter, discover connections, and maintain wikilinks.

**Key principle:** The MCP server is a stateless I/O layer. It does not perform semantic analysis, suggest connections, or make decisions about content relatedness. Those are the LLM's responsibilities. The server's job is to efficiently expose vault data and provide atomic operations for modification.

## Core Requirements

### Configuration
- Accept vault path via environment variable or config file
- Validate vault exists and is accessible before starting
- Support standard Obsidian vault structure (folders, attachments, .obsidian config)
- There is a Test Vault in a folder called "Test Vault" that emulates what the actual vault enviroment will look like. Explore it to understand how exactly the program should interface with the vault.

### MCP Tools to Implement

**Vault Navigation**
- `list_notes` - List all notes with optional filtering by folder, tags, or date range. Returns paths and basic metadata (size, modified date, frontmatter summary).
- `read_note` - Read full note content with parsed frontmatter
- `read_notes_batch` - Read multiple notes in one call to reduce round trips when LLM needs to compare content
- `search_notes` - Full-text search across vault (literal/regex matching, not semantic)
- `get_vault_structure` - Return folder hierarchy and note counts

**Note Management**
- `create_note` - Create new note with content and frontmatter
- `update_note` - Replace note content entirely or patch specific sections
- `move_note` - Relocate note and update all backlinks pointing to it
- `delete_note` - Remove note with option to clean up dangling references

**Frontmatter Operations**
- `get_frontmatter` - Parse and return YAML frontmatter as structured data
- `update_frontmatter` - Modify specific frontmatter fields (tags, aliases, dates, custom fields)
- `bulk_update_frontmatter` - Update frontmatter across multiple notes matching criteria

**Link Operations**
- `get_links` - Return all outgoing wikilinks from a note (parsed into target, alias, heading if present)
- `get_backlinks` - Find all notes containing wikilinks to a specific note
- `get_all_links` - Return complete link graph as adjacency list
- `find_text_occurrences` - Find all occurrences of a string/pattern across vault (useful for LLM to find potential link targets)
- `insert_link` - Insert wikilink at specified position in note
- `get_orphan_notes` - Find notes with no incoming or outgoing links
- `get_headings` - Extract all headings from a note (for linking to subheadings)

**Vault Statistics**
- `get_tag_list` - Return all tags with usage counts
- `get_note_titles` - Return list of all note titles/filenames (for LLM to identify link targets)
- `audit_frontmatter` - Check notes for missing fields against a provided schema

### Technical Specifications

**Stack**
- TypeScript with Node.js
- MCP SDK (@modelcontextprotocol/sdk)
- gray-matter for YAML frontmatter parsing
- Standard filesystem operations (fs/promises)

**Architecture**
- Stateless tool handlers - each call is independent
- No caching of content (vault may change between calls)
- Batch operations to minimize LLM round trips
- File watching not required

**Tool Response Design**
- Return raw data, not interpretations
- Include structural metadata (line numbers, character positions) to enable precise edits
- Error details with actionable information

**Example read_note response:**
```json
{
  "path": "projects/mcp-server.md",
  "content": "# MCP Server\n\nThis project interfaces with [[Obsidian]]...",
  "frontmatter": { 
    "tags": ["project", "coding"], 
    "created": "2024-01-15",
    "aliases": ["obsidian-mcp"]
  },
  "outgoing_links": [
    { "target": "Obsidian", "alias": null, "heading": null, "line": 3 }
  ],
  "headings": [
    { "level": 1, "text": "MCP Server", "line": 1 },
    { "level": 2, "text": "Overview", "line": 5 }
  ],
  "stats": {
    "lines": 47,
    "characters": 2341,
    "modified": "2024-01-20T14:30:00Z"
  }
}
```

**Example workflow (LLM-driven):**
1. LLM calls `get_note_titles` to learn what notes exist
2. LLM calls `read_notes_batch` on a subset to analyze content
3. LLM identifies that note A mentions concepts from note B but has no link
4. LLM calls `insert_link` to add the connection

The server never decides what should be linked - it just provides the data and executes the edits.

**Error Handling**
- Graceful handling of malformed frontmatter (return raw content with parse error flag)
- Return clear errors if file is locked or inaccessible
- Validate file paths are within vault before any operation

### File Structure
```
obsidian-mcp/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── vault.ts              # Vault access and path validation
│   ├── parser.ts             # Frontmatter and link parsing
│   └── tools/
│       ├── navigation.ts     # list, read, search, structure
│       ├── notes.ts          # create, update, move, delete
│       ├── frontmatter.ts    # get, update, bulk, audit
│       ├── links.ts          # get links, backlinks, insert, orphans
│       └── stats.ts          # tags, titles, vault-wide queries
├── package.json
├── tsconfig.json
└── README.md
```

## Constraints
- Do not modify .obsidian folder contents
- Preserve file modification timestamps when only updating frontmatter (if possible)
- Handle unicode in filenames and content
- Support wikilink syntax variations: `[[note]]`, `[[note|alias]]`, `[[note#heading]]`, `[[note#heading|alias]]`
- All paths relative to vault root in API, resolved internally

## Testing
- Unit tests for frontmatter and link parsing edge cases
- Integration tests with sample vault containing various edge cases
- Test handling of malformed/unusual markdown

## Deliverables
1. Working MCP server installable via npm
2. README with setup instructions and tool documentation
3. Example configuration for Claude Desktop MCP client
```