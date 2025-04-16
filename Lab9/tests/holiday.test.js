const pactum = require('pactum');

describe('Test Bank Holidays API', () => {

  const url = 'https://www.gov.uk/bank-holidays.json';

  test('Contain at least one holiday', async () => {
    const res = await pactum.spec().get(url).expectStatus(200).returns('england-and-wales');

    const events = res.events;
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  test('Contain Easter data', async () => {
    const res = await pactum.spec().get(url).expectStatus(200).returns('england-and-wales');

    const events = res.events;
    const easter = events.find(event => event.title.toLowerCase().includes('easter'));

    expect(easter.date).toBeDefined();
  });

});