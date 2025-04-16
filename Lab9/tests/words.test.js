
const pactum = require('pactum');

describe('Test Dictionary', () => {

  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';


  async function testWord(word) {
    const meanings = await pactum.spec()
      .get(url + word)
      .expectStatus(200)
      .returns('[0].meanings')
    
    for (const definitions of meanings) {
      for (const definition of definitions.definitions) {
        if (definition.example) {
          console.log(`Found example for ${word}: ${definition.example}`);
          return true;
        }
      }
    }
    
    console.log(`No example found for ${word}`);
    console.log(`Meanings for ${word}: ${JSON.stringify(meanings)}`);
    return false;
  }

  test('Check words example', async () => {
    await expect(await testWord("counsel")).toBe(true);
    await expect(await testWord("grief")).toBe(true);
    await expect(await testWord("hence")).toBe(true);
    await expect(await testWord("vigilant")).toBe(true);
    await expect(await testWord("arduous")).toBe(true);
  });

});
