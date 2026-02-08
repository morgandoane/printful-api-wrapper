// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Printful from 'mdd-printful-client';

const client = new Printful({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource reports', () => {
  // Prism tests are disabled
  test.skip('retrieveStatistics: only required params', async () => {
    const responsePromise = client.reports.retrieveStatistics({
      date_from: '2022-08-01',
      date_to: '2022-08-31',
      report_types: 'sales_and_costs,profit',
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
  test.skip('retrieveStatistics: required and optional params', async () => {
    const response = await client.reports.retrieveStatistics({
      date_from: '2022-08-01',
      date_to: '2022-08-31',
      report_types: 'sales_and_costs,profit',
      currency: 'USD',
      'X-PF-Store-Id': 'X-PF-Store-Id',
    });
  });
});
