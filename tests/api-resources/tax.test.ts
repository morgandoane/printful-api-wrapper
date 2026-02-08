// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Printful from 'printful-api-client';

const client = new Printful({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tax', () => {
  // Prism tests are disabled
  test.skip('calculateRate: only required params', async () => {
    const responsePromise = client.tax.calculateRate({
      recipient: {
        city: 'Chatsworth',
        country_code: 'US',
        state_code: 'CA',
        zip: '91311',
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('calculateRate: required and optional params', async () => {
    const response = await client.tax.calculateRate({
      recipient: {
        city: 'Chatsworth',
        country_code: 'US',
        state_code: 'CA',
        zip: '91311',
      },
    });
  });

  // Prism tests are disabled
  test.skip('listCountries', async () => {
    const responsePromise = client.tax.listCountries();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
