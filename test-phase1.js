import { VaultAccess } from './dist/vault.js';
import * as navigation from './dist/tools/navigation.js';

async function testPhase1() {
  console.log('Testing Phase 1 Implementation with Test Vault\n');
  console.log('='.repeat(60));

  try {
    const vault = new VaultAccess('./Test Vault');
    console.log('✓ Vault initialized successfully');

    console.log('\n1. Testing list_notes...');
    const allNotes = await navigation.listNotes(vault, {});
    console.log(`   ✓ Found ${allNotes.length} notes`);
    console.log(`   First note: ${allNotes[0]?.path}`);

    console.log('\n2. Testing list_notes with tag filter...');
    const mathNotes = await navigation.listNotes(vault, {
      tags: ['MATH31AH']
    });
    console.log(`   ✓ Found ${mathNotes.length} notes with tag MATH31AH`);

    console.log('\n3. Testing read_note...');
    const vectorsNote = await navigation.readNote(vault, {
      path: 'Studies/MATH 31AH/Vectors.md'
    });
    console.log(`   ✓ Read note: ${vectorsNote.path}`);
    console.log(`   - Title: ${vectorsNote.frontmatter?.Type || 'N/A'}`);
    console.log(`   - Lines: ${vectorsNote.stats.lines}`);
    console.log(`   - Outgoing links: ${vectorsNote.outgoingLinks.length}`);
    console.log(`   - Headings: ${vectorsNote.headings.length}`);

    console.log('\n4. Testing read_notes_batch...');
    const batchNotes = await navigation.readNotesBatch(vault, {
      paths: [
        'Studies/MATH 31AH/Vectors.md',
        'Studies/MATH 31AH/Index.md'
      ]
    });
    console.log(`   ✓ Read ${batchNotes.length} notes in batch`);

    console.log('\n5. Testing search_notes...');
    const searchResults = await navigation.searchNotes(vault, {
      pattern: 'LaTeX',
      isRegex: false
    });
    console.log(`   ✓ Found ${searchResults.length} notes matching "LaTeX"`);
    if (searchResults.length > 0) {
      console.log(`   First match: ${searchResults[0].path} (${searchResults[0].matchCount} occurrences)`);
    }

    console.log('\n6. Testing get_vault_structure...');
    const structure = await navigation.getVaultStructure(vault);
    console.log(`   ✓ Vault structure retrieved`);
    console.log(`   Root: ${structure.name} (${structure.noteCount} notes)`);
    console.log(`   Folders: ${structure.children.length}`);

    console.log('\n' + '='.repeat(60));
    console.log('✓ All Phase 1 tests passed!');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n✗ Test failed:', error);
    process.exit(1);
  }
}

testPhase1();
