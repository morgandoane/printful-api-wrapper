// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Printful from 'printful';

const client = new Printful({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource products', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.sync.products.retrieve(0);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sync.products.retrieve(
        0,
        { 'X-PF-Store-Id': 'X-PF-Store-Id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Printful.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.sync.products.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sync.products.list(
        {
          limit: 0,
          offset: 0,
          search: 'search',
          status: 'all',
          'X-PF-Store-Id': 'X-PF-Store-Id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Printful.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.sync.products.delete(0);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sync.products.delete(
        0,
        { 'X-PF-Store-Id': 'X-PF-Store-Id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Printful.NotFoundError);
  });
});
