import { VaultAccess } from '../../src/vault.js';
import * as notes from '../../src/tools/notes.js';
import * as fs from 'fs/promises';
import * as path from 'path';

describe('Note Management Tools', () => {
  let vault: VaultAccess;
  const testVaultPath = path.join(process.cwd(), 'Test Vault');
  const testNotePath = 'test-note.md';
  const testMovedPath = 'moved/test-note.md';
  const testNoteWithLinkPath = 'test-note-with-link.md';

  beforeAll(() => {
    vault = new VaultAccess(testVaultPath);
  });

  afterEach(async () => {
    const filesToCleanup = [
      testNotePath,
      testMovedPath,
      testNoteWithLinkPath,
    ];

    for (const file of filesToCleanup) {
      try {
        const exists = await vault.fileExists(file);
        if (exists) {
          await vault.deleteFile(file);
        }
      } catch (error) {
        // Ignore cleanup errors
      }
    }

    try {
      const movedDir = path.join(testVaultPath, 'moved');
      await fs.rmdir(movedDir);
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('createNote', () => {
    it('should create a note with content and frontmatter', async () => {
      const result = await notes.createNote(vault, {
        path: testNotePath,
        content: 'Test content',
        frontmatter: {
          title: 'Test Note',
          tags: ['test'],
          created: new Date().toISOString(),
        },
      });

      expect(result.created).toBe(true);
      expect(result.path).toBe(testNotePath);

      const content = await vault.readFile(testNotePath);
      expect(content).toContain('title: Test Note');
      expect(content).toContain('Test content');
    });

    it('should create a note in a new folder', async () => {
      const nestedPath = 'new-folder/test-note.md';
      const result = await notes.createNote(vault, {
        path: nestedPath,
        content: 'Nested note content',
      });

      expect(result.created).toBe(true);

      const content = await vault.readFile(nestedPath);
      expect(content).toBe('Nested note content');

      await vault.deleteFile(nestedPath);
      await fs.rmdir(path.join(testVaultPath, 'new-folder'));
    });

    it('should throw error if file already exists', async () => {
      await notes.createNote(vault, {
        path: testNotePath,
        content: 'Initial content',
      });

      await expect(
        notes.createNote(vault, {
          path: testNotePath,
          content: 'Duplicate content',
        })
      ).rejects.toThrow('already exists');
    });
  });

  describe('updateNote', () => {
    it('should update an existing note', async () => {
      await notes.createNote(vault, {
        path: testNotePath,
        content: 'Original content',
      });

      const result = await notes.updateNote(vault, {
        path: testNotePath,
        content: 'Updated content',
      });

      expect(result.updated).toBe(true);

      const content = await vault.readFile(testNotePath);
      expect(content).toBe('Updated content');
    });

    it('should throw error if file does not exist', async () => {
      await expect(
        notes.updateNote(vault, {
          path: 'non-existent.md',
          content: 'Content',
        })
      ).rejects.toThrow('not found');
    });
  });

  describe('moveNote', () => {
    it('should move a note to a new location', async () => {
      await notes.createNote(vault, {
        path: testNotePath,
        content: 'Content to move',
      });

      const result = await notes.moveNote(vault, {
        oldPath: testNotePath,
        newPath: testMovedPath,
        updateBacklinks: false,
      });

      expect(result.updated).toBe(true);
      expect(result.path).toBe(testMovedPath);

      const oldExists = await vault.fileExists(testNotePath);
      const newExists = await vault.fileExists(testMovedPath);

      expect(oldExists).toBe(false);
      expect(newExists).toBe(true);
    });

    it('should update backlinks when moving a note', async () => {
      await notes.createNote(vault, {
        path: testNotePath,
        content: '# Test Note\nThis is the target note.',
      });

      await notes.createNote(vault, {
        path: testNoteWithLinkPath,
        content: 'This note links to [[test-note]].',
      });

      const result = await notes.moveNote(vault, {
        oldPath: testNotePath,
        newPath: testMovedPath,
        updateBacklinks: true,
      });

      expect(result.updated).toBe(true);
      expect(result.patchesApplied).toBe(1);

      const linkContent = await vault.readFile(testNoteWithLinkPath);
      expect(linkContent).toContain('[[moved/test-note]]');
    });

    it('should throw error if target already exists', async () => {
      await notes.createNote(vault, {
        path: testNotePath,
        content: 'Content 1',
      });

      await notes.createNote(vault, {
        path: testMovedPath,
        content: 'Content 2',
      });

      await expect(
        notes.moveNote(vault, {
          oldPath: testNotePath,
          newPath: testMovedPath,
        })
      ).rejects.toThrow('already exists');
    });
  });

  describe('deleteNote', () => {
    it('should delete a note', async () => {
      await notes.createNote(vault, {
        path: testNotePath,
        content: 'Content to delete',
      });

      const result = await notes.deleteNote(vault, {
        path: testNotePath,
        cleanupReferences: false,
      });

      expect(result.deleted).toBe(true);
      expect(result.linksRemoved).toBe(0);

      const exists = await vault.fileExists(testNotePath);
      expect(exists).toBe(false);
    });

    it('should delete a note and clean up references', async () => {
      await notes.createNote(vault, {
        path: testNotePath,
        content: '# Test Note',
      });

      await notes.createNote(vault, {
        path: testNoteWithLinkPath,
        content: 'This links to [[test-note]] in the vault.',
      });

      const result = await notes.deleteNote(vault, {
        path: testNotePath,
        cleanupReferences: true,
      });

      expect(result.deleted).toBe(true);
      expect(result.linksRemoved).toBeGreaterThan(0);
      expect(result.affectedNotes).toContain(testNoteWithLinkPath);

      const linkContent = await vault.readFile(testNoteWithLinkPath);
      expect(linkContent).not.toContain('[[test-note]]');
    });

    it('should throw error if file does not exist', async () => {
      await expect(
        notes.deleteNote(vault, {
          path: 'non-existent.md',
        })
      ).rejects.toThrow('not found');
    });
  });
});
