
const pactum = require('pactum');

describe('Test Bank Holidays API', () => {

  const baseUrl = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/';

  test('Get all currencies', async () => {
    const res = await pactum.spec().
    get(baseUrl + "currencies.json").expectStatus(200).
    returns("");

    expect(res.usd).toBe("US Dollar");
    expect(res.eur).toBe("Euro");
    expect(res.gbp).toBe("British Pound");
    expect(res.cad).toBe("Canadian Dollar");
    expect(res.aud).toBe("Australian Dollar");
    expect(res.jpy).toBe("Japanese Yen");
    expect(res.cny).toBe("Chinese Yuan Renminbi");
    expect(res.inr).toBe("Indian Rupee");
  });

  test('Euro currency', async () => {
    const res = await pactum.spec().
    get(baseUrl + "currencies/eur.json").expectStatus(200).
    returns("eur");

    expect(typeof res.usd).toBe("number");
    expect(typeof res.gbp).toBe("number");
    expect(typeof res.cad).toBe("number");
    expect(typeof res.aud).toBe("number");
    expect(typeof res.jpy).toBe("number");
    expect(typeof res.cny).toBe("number");
    expect(typeof res.inr).toBe("number");


  });

  test('Euro to USD currency', async () => {
    const res = await pactum.spec().
    get(baseUrl + "currencies/eur.json").expectStatus(200).
    returns("eur");

    expect(res.usd).toBeDefined();
  });

  test('Not existing currency', async () => {
    await pactum.spec().
      get(baseUrl + "currencies/invalid_currency.json").
      expectStatus(404);
  }
  );

});