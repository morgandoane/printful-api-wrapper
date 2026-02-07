// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Printful from 'printful';

const client = new Printful({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource orders', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.orders.create({
      items: [{}],
      recipient: {},
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
    const response = await client.orders.create({
      items: [
        {
          id: 1,
          discontinued: true,
          external_id: 'item-1',
          external_product_id: 'template-123',
          external_variant_id: 'variant-1',
          files: [
            {
              url: '​https://www.example.com/files/tshirts/example.png',
              filename: 'shirt1.png',
              options: [{ id: 'template_type', value: 'native' }],
              position: {
                area_height: 2400,
                area_width: 1800,
                height: 1800,
                left: 0,
                limit_to_print_area: true,
                top: 300,
                width: 1800,
              },
              type: 'default',
              visible: true,
            },
          ],
          name: 'Enhanced Matte Paper Poster 18×24',
          options: [{ id: 'OptionKey', value: 'OptionValue' }],
          out_of_stock: true,
          price: '13.00',
          product: {
            image: 'https://files.cdn.printful.com/products/71/5309_1581412541.jpg',
            name: 'Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)',
            product_id: 301,
            variant_id: 3001,
          },
          product_template_id: 1,
          quantity: 1,
          retail_price: '13.00',
          sku: 'sku',
          sync_variant_id: 1,
          variant_id: 1,
          warehouse_product_variant_id: 1,
        },
      ],
      recipient: {
        address1: '19749 Dearborn St',
        address2: 'address2',
        city: 'Chatsworth',
        company: 'John Smith Inc',
        country_code: 'US',
        country_name: 'United States',
        email: 'firstname.secondname@domain.com',
        name: 'John Smith',
        phone: '2312322334',
        state_code: 'CA',
        state_name: 'California',
        tax_number: '123.456.789-10',
        zip: '91311',
      },
      confirm: true,
      update_existing: true,
      costs: {
        additional_fee: '0.00',
        currency: 'USD',
        digitization: '0.00',
        discount: '0.00',
        fulfillment_fee: '0.00',
        retail_delivery_fee: '0.00',
        shipping: '5.00',
        subtotal: '10.00',
        tax: '0.00',
        total: '15.00',
        vat: '0.00',
      },
      external_id: '4235234213',
      gift: { message: 'Have a nice day', subject: 'To John' },
      packing_slip: {
        custom_order_id: 'kkk2344lm',
        email: 'your-name@your-domain.com',
        logo_url: '​http://www.your-domain.com/packing-logo.png',
        message: 'Message on packing slip',
        phone: '+371 28888888',
        store_name: 'Your store name',
      },
      retail_costs: {
        currency: 'USD',
        discount: '0.00',
        shipping: '5.00',
        subtotal: '10.00',
        tax: '0.00',
      },
      shipping: 'STANDARD',
      'X-PF-Store-Id': 'X-PF-Store-Id',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.orders.retrieve('string');
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
      client.orders.retrieve(
        'string',
        { 'X-PF-Store-Id': 'X-PF-Store-Id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Printful.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.orders.update('string', {
      items: [{}],
      recipient: {},
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
  test.skip('update: required and optional params', async () => {
    const response = await client.orders.update('string', {
      items: [
        {
          id: 1,
          discontinued: true,
          external_id: 'item-1',
          external_product_id: 'template-123',
          external_variant_id: 'variant-1',
          files: [
            {
              url: '​https://www.example.com/files/tshirts/example.png',
              filename: 'shirt1.png',
              options: [{ id: 'template_type', value: 'native' }],
              position: {
                area_height: 2400,
                area_width: 1800,
                height: 1800,
                left: 0,
                limit_to_print_area: true,
                top: 300,
                width: 1800,
              },
              type: 'default',
              visible: true,
            },
          ],
          name: 'Enhanced Matte Paper Poster 18×24',
          options: [{ id: 'OptionKey', value: 'OptionValue' }],
          out_of_stock: true,
          price: '13.00',
          product: {
            image: 'https://files.cdn.printful.com/products/71/5309_1581412541.jpg',
            name: 'Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)',
            product_id: 301,
            variant_id: 3001,
          },
          product_template_id: 1,
          quantity: 1,
          retail_price: '13.00',
          sku: 'sku',
          sync_variant_id: 1,
          variant_id: 1,
          warehouse_product_variant_id: 1,
        },
      ],
      recipient: {
        address1: '19749 Dearborn St',
        address2: 'address2',
        city: 'Chatsworth',
        company: 'John Smith Inc',
        country_code: 'US',
        country_name: 'United States',
        email: 'firstname.secondname@domain.com',
        name: 'John Smith',
        phone: '2312322334',
        state_code: 'CA',
        state_name: 'California',
        tax_number: '123.456.789-10',
        zip: '91311',
      },
      confirm: true,
      costs: {
        additional_fee: '0.00',
        currency: 'USD',
        digitization: '0.00',
        discount: '0.00',
        fulfillment_fee: '0.00',
        retail_delivery_fee: '0.00',
        shipping: '5.00',
        subtotal: '10.00',
        tax: '0.00',
        total: '15.00',
        vat: '0.00',
      },
      external_id: '4235234213',
      gift: { message: 'Have a nice day', subject: 'To John' },
      packing_slip: {
        custom_order_id: 'kkk2344lm',
        email: 'your-name@your-domain.com',
        logo_url: '​http://www.your-domain.com/packing-logo.png',
        message: 'Message on packing slip',
        phone: '+371 28888888',
        store_name: 'Your store name',
      },
      retail_costs: {
        currency: 'USD',
        discount: '0.00',
        shipping: '5.00',
        subtotal: '10.00',
        tax: '0.00',
      },
      shipping: 'STANDARD',
      'X-PF-Store-Id': 'X-PF-Store-Id',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.orders.list();
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
      client.orders.list(
        {
          limit: 0,
          offset: 0,
          status: 'status',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Printful.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('cancel', async () => {
    const responsePromise = client.orders.cancel('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('cancel: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.orders.cancel(
        'string',
        { 'X-PF-Store-Id': 'X-PF-Store-Id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Printful.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('confirm', async () => {
    const responsePromise = client.orders.confirm('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('confirm: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.orders.confirm(
        'string',
        { 'X-PF-Store-Id': 'X-PF-Store-Id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Printful.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('estimateCosts: only required params', async () => {
    const responsePromise = client.orders.estimateCosts({
      items: [{}],
      recipient: {},
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
  test.skip('estimateCosts: required and optional params', async () => {
    const response = await client.orders.estimateCosts({
      items: [
        {
          id: 1,
          discontinued: true,
          external_id: 'item-1',
          external_product_id: 'template-123',
          external_variant_id: 'variant-1',
          files: [
            {
              url: '​https://www.example.com/files/tshirts/example.png',
              filename: 'shirt1.png',
              options: [{ id: 'template_type', value: 'native' }],
              position: {
                area_height: 2400,
                area_width: 1800,
                height: 1800,
                left: 0,
                limit_to_print_area: true,
                top: 300,
                width: 1800,
              },
              type: 'default',
              visible: true,
            },
          ],
          name: 'Enhanced Matte Paper Poster 18×24',
          options: [{ id: 'OptionKey', value: 'OptionValue' }],
          out_of_stock: true,
          price: '13.00',
          product: {
            image: 'https://files.cdn.printful.com/products/71/5309_1581412541.jpg',
            name: 'Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)',
            product_id: 301,
            variant_id: 3001,
          },
          product_template_id: 1,
          quantity: 1,
          retail_price: '13.00',
          sku: 'sku',
          sync_variant_id: 1,
          variant_id: 1,
          warehouse_product_variant_id: 1,
        },
      ],
      recipient: {
        address1: '19749 Dearborn St',
        address2: 'address2',
        city: 'Chatsworth',
        company: 'John Smith Inc',
        country_code: 'US',
        country_name: 'United States',
        email: 'firstname.secondname@domain.com',
        name: 'John Smith',
        phone: '2312322334',
        state_code: 'CA',
        state_name: 'California',
        tax_number: '123.456.789-10',
        zip: '91311',
      },
      costs: {
        additional_fee: '0.00',
        currency: 'USD',
        digitization: '0.00',
        discount: '0.00',
        fulfillment_fee: '0.00',
        retail_delivery_fee: '0.00',
        shipping: '5.00',
        subtotal: '10.00',
        tax: '0.00',
        total: '15.00',
        vat: '0.00',
      },
      external_id: '4235234213',
      gift: { message: 'Have a nice day', subject: 'To John' },
      packing_slip: {
        custom_order_id: 'kkk2344lm',
        email: 'your-name@your-domain.com',
        logo_url: '​http://www.your-domain.com/packing-logo.png',
        message: 'Message on packing slip',
        phone: '+371 28888888',
        store_name: 'Your store name',
      },
      retail_costs: {
        currency: 'USD',
        discount: '0.00',
        shipping: '5.00',
        subtotal: '10.00',
        tax: '0.00',
      },
      shipping: 'STANDARD',
      'X-PF-Store-Id': 'X-PF-Store-Id',
    });
  });
});
