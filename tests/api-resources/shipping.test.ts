// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Printful from 'printful-client';

const client = new Printful({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource shipping', () => {
  // Prism tests are disabled
  test.skip('calculateRates: only required params', async () => {
    const responsePromise = client.shipping.calculateRates({
      items: [{ quantity: 10 }],
      recipient: { country_code: 'US' },
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
  test.skip('calculateRates: required and optional params', async () => {
    const response = await client.shipping.calculateRates({
      items: [
        {
          quantity: 10,
          external_variant_id: '1001',
          value: '2.99',
          variant_id: '202',
          warehouse_product_variant_id: '2',
        },
      ],
      recipient: {
        country_code: 'US',
        address1: '19749 Dearborn St',
        address2: 'Apt 2B',
        city: 'Chatsworth',
        phone: '+1234567890',
        state_code: 'CA',
        zip: '91311',
      },
      currency: 'USD',
      locale: 'en_US',
      'X-PF-Store-Id': 'X-PF-Store-Id',
    });
  });
});
