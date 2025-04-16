const pactum = require('pactum');

describe('CatFact Ninja API', () => {

  const base = 'https://catfact.ninja';

  test('Breed array structure', async () => {
    const res = await pactum.spec()
      .get(`${base}/breeds`)
      .expectStatus(200)
      .returns("data");

    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);

    const first = res[0];
    expect(first).toHaveProperty('breed');
    expect(first).toHaveProperty('country');
    expect(first).toHaveProperty('origin');
    expect(first).toHaveProperty('coat');
    expect(first).toHaveProperty('pattern');
  });

  test('Single fact', async () => {
    const fact = await pactum.spec()
      .get(`${base}/fact`)
      .expectStatus(200)
      .returns("fact");

    const length = await pactum.spec()
      .get(`${base}/fact`)
      .expectStatus(200)
      .returns("length");

    expect(typeof fact).toBe('string');
    expect(typeof length).toBe('number');
  });

  test('Array of facts', async () => {
    const res = await pactum.spec()
      .get(`${base}/facts`)
      .expectStatus(200)
      .returns("data");

    expect(Array.isArray(res)).toBe(true);
    const first = res[0];
    expect(typeof first.fact).toBe('string');
    expect(typeof first.length).toBe('number');
  });

  test('Limit the amount of returned facts', async () => {
    const limit = 4;
    const res = await pactum.spec()
      .get(`${base}/facts`)
      .withQueryParams('limit', limit)
      .expectStatus(200)
      .returns('data');

    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeLessThanOrEqual(limit);
  });

  test('Limit returned fact character amount', async () => {
    const max = 40;
    const res = await pactum.spec()
      .get(`${base}/fact`)
      .withQueryParams('max_length', max)
      .expectStatus(200)
      .returns('length');

    expect(res).toBeLessThanOrEqual(max);
  });

  test('Check header for server, cache-control, date', async () => {
    await pactum.spec()
      .get(`${base}/fact`)
      .expectStatus(200)
      .expectHeader('server')
      .expectHeader('cache-control')
      .expectHeader('date');
  });

});
