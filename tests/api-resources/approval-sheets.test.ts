// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Printful from 'mdd-printful-client';

const client = new Printful({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource approvalSheets', () => {
  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.approvalSheets.list();
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
      client.approvalSheets.list({ 'X-PF-Store-Id': 'X-PF-Store-Id' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Printful.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('approve: only required params', async () => {
    const responsePromise = client.approvalSheets.approve({
      confirm_hash: 'confirm_hash',
      status: 'approved',
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
  test.skip('approve: required and optional params', async () => {
    const response = await client.approvalSheets.approve({
      confirm_hash: 'confirm_hash',
      status: 'approved',
      'X-PF-Store-Id': 'X-PF-Store-Id',
    });
  });

  // Prism tests are disabled
  test.skip('submitChanges: only required params', async () => {
    const responsePromise = client.approvalSheets.submitChanges({
      confirm_hash: 'confirm_hash',
      files: [{ url: 'example.com' }],
      message: 'The design needs to be aligned to the left',
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
  test.skip('submitChanges: required and optional params', async () => {
    const response = await client.approvalSheets.submitChanges({
      confirm_hash: 'confirm_hash',
      files: [{ url: 'example.com' }],
      message: 'The design needs to be aligned to the left',
      'X-PF-Store-Id': 'X-PF-Store-Id',
    });
  });
});
