// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Printful from 'printful';

const client = new Printful({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource products', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.store.products.create({
      sync_product: { name: 'T-shirt' },
      sync_variants: [
        { files: [{ url: '​https://www.example.com/files/tshirts/example.png' }], variant_id: 3001 },
      ],
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
  test.skip('create: required and optional params', async () => {
    const response = await client.store.products.create({
      sync_product: {
        name: 'T-shirt',
        external_id: '4235234213',
        is_ignored: true,
        thumbnail: '​http://your-domain.com/path/to/thumbnail.png',
      },
      sync_variants: [
        {
          files: [
            {
              url: '​https://www.example.com/files/tshirts/example.png',
              filename: 'shirt1.png',
              options: [{ id: 'template_type', value: 'native' }],
              type: 'default',
              visible: true,
            },
          ],
          variant_id: 3001,
          availability_status: 'active',
          external_id: '12312414',
          is_ignored: true,
          options: [{ id: 'embroidery_type', value: 'flat' }],
          retail_price: '29.99',
          sku: 'SKU1234',
        },
      ],
      'X-PF-Store-Id': 'X-PF-Store-Id',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.store.products.retrieve(0);
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
      client.store.products.retrieve(
        0,
        { 'X-PF-Store-Id': 'X-PF-Store-Id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Printful.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.store.products.update(0, {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.store.products.list();
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
      client.store.products.list(
        {
          category_id: 'category_id',
          status: 'all',
          'X-PF-Store-Id': 'X-PF-Store-Id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Printful.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.store.products.delete(0);
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
      client.store.products.delete(
        0,
        { 'X-PF-Store-Id': 'X-PF-Store-Id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Printful.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('createVariant: only required params', async () => {
    const responsePromise = client.store.products.createVariant(0, {
      files: [{ url: '​https://www.example.com/files/tshirts/example.png' }],
      variant_id: 3001,
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
  test.skip('createVariant: required and optional params', async () => {
    const response = await client.store.products.createVariant(0, {
      files: [
        {
          url: '​https://www.example.com/files/tshirts/example.png',
          filename: 'shirt1.png',
          options: [{ id: 'template_type', value: 'native' }],
          type: 'default',
          visible: true,
        },
      ],
      variant_id: 3001,
      availability_status: 'active',
      external_id: '12312414',
      is_ignored: true,
      options: [{ id: 'embroidery_type', value: 'flat' }],
      product: {
        image: 'https://files.cdn.printful.com/products/71/5309_1581412541.jpg',
        name: 'Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)',
        product_id: 301,
        variant_id: 3001,
      },
      retail_price: '29.99',
      sku: 'SKU1234',
      'X-PF-Store-Id': 'X-PF-Store-Id',
    });
  });
});
