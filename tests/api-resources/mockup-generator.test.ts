// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Printful from 'printful';

const client = new Printful({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource mockupGenerator', () => {
  // Prism tests are disabled
  test.skip('createTask', async () => {
    const responsePromise = client.mockupGenerator.createTask(0, {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrievePrintfiles', async () => {
    const responsePromise = client.mockupGenerator.retrievePrintfiles(0);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrievePrintfiles: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.mockupGenerator.retrievePrintfiles(
        0,
        {
          orientation: 'horizontal',
          technique: 'technique',
          'X-PF-Store-Id': 'X-PF-Store-Id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Printful.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('retrieveTaskResult: only required params', async () => {
    const responsePromise = client.mockupGenerator.retrieveTaskResult({ task_key: 'task_key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieveTaskResult: required and optional params', async () => {
    const response = await client.mockupGenerator.retrieveTaskResult({
      task_key: 'task_key',
      'X-PF-Store-Id': 'X-PF-Store-Id',
    });
  });

  // Prism tests are disabled
  test.skip('retrieveTemplates', async () => {
    const responsePromise = client.mockupGenerator.retrieveTemplates(0);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieveTemplates: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.mockupGenerator.retrieveTemplates(
        0,
        {
          orientation: 'horizontal',
          technique: 'technique',
          'X-PF-Store-Id': 'X-PF-Store-Id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Printful.NotFoundError);
  });
});
