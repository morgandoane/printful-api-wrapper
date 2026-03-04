// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * The Orders API is the most important part of the Printful API - it allows you to create new orders and confirm them for
 * fulfillment.
 *
 * **Important**: Jewelry products are not supported via API.
 *
 * ### Order life cycle and statuses
 *
 * Each order will go through different states while being processed. The following order status types indicate those
 * states:
 *
 * <table>
 *     <tr>
 *         <td><strong>draft</strong></td>
 *         <td>The order is created but is not yet submitted for fulfillment. You still can edit it and confirm later.</td>
 *     </tr>
 *     <tr>
 *         <td><strong>inreview</strong></td>
 *         <td>The order is being reviewed. It's not possible to cancel the order at this point. It will be possible to cancel the order when the review process is finished.</td>
 *     </tr>
 *     <tr>
 *         <td><strong>pending</strong></td>
 *     <td>The order has been submitted for fulfillment, but is not yet accepted for fulfillment. You can still cancel the order if you need.</td>
 *     </tr>
 *     <tr>
 *         <td><strong>failed</strong></td>
 *         <td>Order was submitted for fulfillment but was returned for review because of an error (problem with address, missing printfiles, charging has failed, etc.).</td>
 *     </tr>
 *     <tr>
 *         <td><strong>canceled</strong></td>
 *         <td>The order has been canceled and can no longer be processed. If the order was charged then the amount has been returned to your credit card.</td>
 *     </tr>
 *     <tr>
 *         <td><strong>inprocess</strong></td>
 *         <td>The order is being fulfilled and can no longer be cancelled or modified. Contact customer support if there are any issues with the order at this point.</td>
 *     </tr>
 *     <tr>
 *         <td><strong>onhold</strong></td>
 *         <td>The order has encountered a problem during the fulfillment that needs to be resolved together with Printful customer service before fulfillment can continue.</td>
 *     </tr>
 *     <tr>
 *         <td><strong>partial</strong></td>
 *         <td>The order is partially fulfilled (some items are shipped already, the rest will follow)</td>
 *     </tr>
 *     <tr>
 *         <td><strong>fulfilled</strong></td>
 *         <td>All items have been shipped successfully</td>
 *     </tr>
 *     <tr>
 *         <td><strong>archived</strong></td>
 *         <td>The order has been archived and hidden from the UI</td>
 *     </tr>
 * </table>
 *
 * To sum up, the API allows you to create orders with status `draft` and then move them to state `pending` (both steps can
 * be done with a single action). You are only charged for orders that have been confirmed. If the order encounters a
 * problem after it has been submitted, then it is moved to the failed state so that the problem can be fixed and the order
 * can be resubmitted.
 *
 * ### Asynchronous order cost calculation
 *
 * Most of the times, when you submit an order, we'll perform the cost calculation and return it in the response.
 *
 * However, we might not be able to calculate all the costs immediately, for example if the order contains a new advanced
 * embroidery design. If that's the case, we'll automatically put your order on hold, calculate the order costs once it's
 * possible, and then remove the order from hold.
 *
 * Such an order will return to a draft status (even if it was created with the auto-confirm option) and will need to be
 * confirmed.
 *
 * You can subscribe to the `order_remove_hold` event (see [Webhook API](#tag/Webhook-API)) to be notified when the order is removed from hold.
 *
 * ### External ID
 *
 * External ID is an optional feature that allows you to link your Printful order with the Order ID from your system
 * without the need to store additional data on your side. External ID can be up to 32 characters long and contain digits,
 * Latin alphabet letters, dashes and underscores, however it is recommended to use integer numbers. Each order's External
 * ID must be unique within the store.
 *
 * To use the External ID feature, you just add the `external_id` attribute when creating the order. Later, when you need
 * to access the order through the API, you can reference it by both the Order ID and by External ID (if you prefix it with
 * the `@` symbol).
 *
 * ```
 * GET /orders/11001  - reference by Printful Order ID
 * GET /orders/@988123  - reference by External ID
 * GET /orders/@AA123123  - reference by External ID
 * ```
 *
 * You can assign the `external_id` attribute to line items as well. In this case they have to be unique per order.
 *
 * ### Specifying products
 *
 * There are three general ways to specify a product’s variant when creating, updating or estimating an order:
 *
 * (A) **Using an existing product variant (sync variant) in your Printful store or warehouse.** To specify the existing
 * product please use its `sync_variant_id` or `external_variant_id`, or `warehouse_product_variant_id`.
 *
 * [Example using Sync Variant ID](#tag/Examples/Orders-API-examples/Using-a-sync-variant)
 * [Example using External Variant ID](#tag/Examples/Orders-API-examples/Using-sync-variant-with-external-ID)
 *
 * (B) **Using a Catalog API variant without adding a product to the store.** This method can be used when a Printful store
 * has no products in it. To construct a variant on-the-fly retrieve a specific `variant_id` from the
 * [Catalog API](#tag/Catalog-API) together with print files and an additional options.
 *
 * [Example](#tag/Examples/Orders-API-examples/Using-a-catalog-variant)
 *
 * (C) **Using an existing template ID.** This method can be used when a Printful store has assigned templates without the
 * need to create products. To create an order please use the `product_template_id` and `variant_id` that will be added to
 * the order.
 *
 * [Example](#tag/Examples/Orders-API-examples/Using-a-product-template)
 *
 * ### Adding print files
 *
 * There are two ways to assign a print file to the item. One is to specify the File ID if the file already exists in the
 * file library of the authorized store:
 *
 * ```
 * ...
 * "files": [
 *     {
 *         "id": 12345
 *     },
 * ],
 * ...
 * ```
 *
 * The second and the most convenient method is to specify the file URL. If a file with the same URL already exists, it will be reused.
 *
 * ```
 * ...
 * "files": [
 *     {
 *         "url": "http://example.com/t-shirts/123/front.pdf"
 *     },
 * ],
 * ...
 * ```
 *
 * ### Specifying file position
 *
 * You can specify the image position inside the print area by providing a position object.
 *
 * <strong>Important</strong><br>
 * * Each print area has specific dimensions, by default Orders API will assume that your file has to stick to those limitations and not exceed them. In some cases you would want to position your file outside the print area - to be able to do so use the `limit_to_print_area` and set it to: `false`.
 * * `limit_to_print_area` determines if the image can cross the print area border. If `limit_to_print_area` is set to `true` then the request will result in `400 Bad Request` with "Invalid position" in `error.message` once the image crosses the print area borders. If `limit_to_print_area` is set to `false` then it will be possible to place image partially or fully outside the print area.
 * * The (0,0) point is always located in top left corner of the print area.
 *
 * <strong>Steps</strong><br>
 * 1.Retrieve printfile dimensions [Printfiles](#operation/getPrintfiles)
 * ```
 * ...
 * "printfiles":
 *     [
 *         {
 *             "printfile_id": 1,
 *             "width": 1800,
 *             "height": 2400,
 *             "dpi": 150,
 *             "fill_mode": "fit",
 *             "can_rotate": false
 *         }
 *     ],
 * ...
 * ```
 * 2.Specify file position for specific print placement while creating an order. Use `items` -> `files` -> `position` object as in the example:
 * ```
 * ...
 * "items": [
 *     {
 *         "variant_id":4011,
 *         "quantity":"1",
 *         "files": [
 *             {
 *                 "type": "front",
 *                 "url": "http://example.com/t-shirts/123/front.pdf",
 *                 "position": {
 *                     "area_width": 1800,
 *                     "area_height": 2400,
 *                     "width": 1800,
 *                     "height": 1800,
 *                     "top": 300,
 *                     "left": 0,
 *                     "limit_to_print_area": true
 *                 }
 *             }
 *         ]
 *     }
 * ]
 * ...
 * ```
 *
 * #### Example of positioning the 450x450 image on the front placement
 *
 * <table>
 *   <tr>
 *     <td> Position </td>
 *     <td> Mockup </td>
 *     <td> Payload </td>
 *   </tr>
 *   <tr>
 * <td> Top left </td>
 * <td> <img alt="Top left mockup" src="images/position/top_left.png" width="300"/> </td>
 * <td>
 *
 * ```
 *   "position": {
 *   "area_width": 1800,
 *   "area_height": 2400,
 *   "width": 450,
 *   "height": 450,
 *   "top": 0,
 *   "left": 0,
 *   "limit_to_print_area": true
 *   }
 * ```
 *
 * </td>
 * </tr>
 *
 * <tr>
 * <td> Top middle </td>
 * <td> <img alt="Top left mockup" src="images/position/top_middle.png" width="300"/> </td>
 * <td>
 *
 * ```
 * "position": {
 * "area_width": 1800,
 * "area_height": 2400,
 * "width": 450,
 * "height": 450,
 * "top": 0,
 * "left": 675,
 * "limit_to_print_area": true
 * }
 * ```
 *
 * </td>
 * </tr>
 *
 * <tr>
 * <td> Top right </td>
 * <td> <img alt="Top left mockup" src="images/position/top_right.png" width="300"/> </td>
 * <td>
 *
 * ```
 * "position": {
 * "area_width": 1800,
 * "area_height": 2400,
 * "width": 450,
 * "height": 450,
 * "top": 0,
 * "left": 1350,
 * "limit_to_print_area": true
 * }
 * ```
 *
 * </td>
 * </tr>
 *
 * <tr>
 * <td> Middle </td>
 * <td> <img alt="Top left mockup" src="images/position/middle.png" width="300"/> </td>
 * <td>
 *
 * ```
 * "position": {
 * "area_width": 1800,
 * "area_height": 2400,
 * "width": 450,
 * "height": 450,
 * "top": 975,
 * "left": 675,
 * "limit_to_print_area": true
 * }
 * ```
 *
 * </td>
 * </tr>
 *
 * <tr>
 * <td> Bottom left </td>
 * <td> <img alt="Top left mockup" src="images/position/bottom_left.png" width="300"/> </td>
 * <td>
 *
 * ```
 * "position": {
 * "area_width": 1800,
 * "area_height": 2400,
 * "width": 450,
 * "height": 450,
 * "top": 1950,
 * "left": 0,
 * "limit_to_print_area": true
 * }
 * ```
 *
 * </td>
 * </tr>
 *
 * <tr>
 * <td> Bottom middle </td>
 * <td> <img alt="Top left mockup" src="images/position/bottom_middle.png" width="300"/> </td>
 * <td>
 *
 * ```
 * "position": {
 * "area_width": 1800,
 * "area_height": 2400,
 * "width": 450,
 * "height": 450,
 * "top": 1950,
 * "left": 675,
 * "limit_to_print_area": true
 * }
 * ```
 *
 * </td>
 * </tr>
 *
 * <tr>
 * <td> Bottom right </td>
 * <td> <img alt="Top left mockup" src="images/position/bottom_right.png" width="300"/> </td>
 * <td>
 *
 * ```
 * "position": {
 * "area_width": 1800,
 * "area_height": 2400,
 * "width": 450,
 * "height": 450,
 * "top": 1950,
 * "left": 1350,
 * "limit_to_print_area": true
 * }
 * ```
 *
 * </td>
 * </tr>
 *
 * </table>
 *
 * ### Specifying multiple files per item
 *
 * Each item in the order has to be linked with one or multiple files. The available file types for each product are
 * available from the [Catalog API](#tag/Catalog-API).
 *
 * You can add one file for each type by specifying the `type` attribute. For the `default` type, this attribute can be
 * skipped.
 *
 * ```
 * ...
 * "files":[
 * 	{
 * 		"type": "default",
 * 		"url": "http://example.com/t-shirts/123/front.pdf"
 * 	},
 * 	{
 * 		"type": "back"
 * 		"url": "http://example.com/t-shirts/123/back.pdf"
 * 	},
 * 	{
 * 		"type": "preview"
 * 		"url": "http://example.com/t-shirts/123/preview.png"
 * 	}
 * ],
 * ...
 * ```
 *
 * Remember that using additional files can increase the price of the item.
 *
 * ### Creating orders from a template
 *
 * Orders API allows also creating orders based on the product template created in the Printful account without the need to
 * add the product to the Printful store.
 *
 * To retrieve available templates for your account please use the
 * [Products Templates API](#tag/Product-Templates-API).
 *
 * To create an order from a template you need to specify a variant or variants that will be added to the order. It is
 * possible to use multiple templates with different variants in one request. To achieve that please use the `items` object
 * below:
 *
 * ```
 *     ...
 *     "items": [
 *         {
 *             "variant_id": 4012,
 *             "quantity": 1,
 *             "product_template_id": 123456789
 *         },
 *         {
 *             "variant_id": 1,
 *             "quantity": 2,
 *             "product_template_id": 11235813
 *         },
 *     ]
 *     ...
 * ```
 *
 * **Important note**: you can only create orders from templates for variant IDs from the Catalog API.
 *
 * More examples are available [here](#tag/Examples/Orders-API-examples/Using-a-product-template).
 *
 * ### Retail costs
 *
 * Printful allows you to specify your retail costs for the order so that the packing slip for international orders can
 * contain your correct retail prices. To enable retail costs, each item in the order has to contain the `retail_price`
 * attribute. You can also specify a custom discount sum, shipping costs and taxes in the `retail_costs` object when
 * creating the order. If the retail costs are missing, the packing slip will contain the Printful prices instead.
 *
 * ### Native inside label
 *
 * Printful previously allowed customers to upload a fully customized inside label. Since these labels had to contain
 * specific information about fabric composition, manufacturing, etc. to meet the legal requirements, users usually
 * encountered issues to get their labels printed.
 *
 * Inside labels are printed on the inside of the garment and require the removal of the original manufacturer's tag.
 * They're only available for apparel with tear-away labels. An inside label must include the country of manufacturing
 * origin, original garment size, and material information. To use our native label template you only need to upload a
 * graphic (such as your brand's logo). The mandatory content will be generated and placed automatically.
 *
 * ```
 * ...
 * "files":[
 *         {
 *             "type": "label_inside",
 *             "url": "http://example.com/logo/123/image.jpg",
 *             "options": [{
 *                 "id": "template_type",
 *                 "value": "native"
 *             }]
 *         },
 * ],
 * ...
 * ```
 *
 * Printful previously supported fully customized inside labels. These have now been deprecated. The ability to create orders with fully customized inside labels has been limited to only users who were actively using them in their stores before April 2020. This feature is no longer accessible to new users.
 *
 * ### Ordering embroidery products
 *
 * Embroidery is a technique which uses colored threads, sewn into a product, to recreate provided design. In order to use embroidery technique you first need to check if selected product support embroidery technique.
 *
 * In order to do that you need to use [Catalog API](#tag/Catalog-API) to determine if the selected product or variant contains `EMBROIDERY` technique.
 * ```
 * "techniques": [
 *                 {
 *                     "key": "EMBROIDERY",
 *                     "display_name": "Embroidery",
 *                     "is_default": true
 *                 }
 *             ]
 * ```
 * After that you need to also get list of available embroidery placements. Those are listed under `file` property with `embroidery_` prefix. You can get list of all available placements in [Placements](#tag/Common/Placements).
 *
 * <details>
 *     <summary>Example of file property</summary>
 *
 * ```
 * "files": [
 *                 {
 *                     "id": "default",
 *                     "type": "embroidery_front",
 *                     "title": "Front",
 *                     "additional_price": null
 *                 },
 *                 {
 *                     "id": "back",
 *                     "type": "embroidery_back",
 *                     "title": "Back",
 *                     "additional_price": "3.75"
 *                 },
 *                 {
 *                     "id": "left",
 *                     "type": "embroidery_left",
 *                     "title": "Left side",
 *                     "additional_price": "3.75"
 *                 },
 *                 {
 *                     "id": "right",
 *                     "type": "embroidery_right",
 *                     "title": "Right side",
 *                     "additional_price": "3.75"
 *                 },
 *                 {
 *                     "id": "preview",
 *                     "type": "mockup",
 *                     "title": "Mockup",
 *                     "additional_price": null
 *                 }
 *             ]
 * ```
 *
 * </details>
 *
 * To create an order using embroidery technique you can:
 *
 * - Provide thread colors manually [See example](#tag/Common/Embroidery/Manually-defining-thread-colors)
 * - Use automatic thread color detection [See example](#tag/Common/Embroidery/Automatic-thread-color)
 *
 * Finally, you can make an order using embroidery
 * technique [See example](#tag/Examples/Orders-API-examples/Using-embroidery-products). Depending on the placement that you've
 * used you need to specify the correct [thread color option](#tag/Common/Options).
 *
 * ### Packing slip
 *
 * The packing slip fields can be configured at the store level and overridden for a specific order.
 *
 * The packing slip settings can be found in Dashboard at **Settings > Stores > Branding > Packing slip section**.
 *
 * To override the packing slip settings for the order, you can use `packing_slip` or `gift` fields.
 *
 * Below you can find an example or a packing slip for a shipment with explained fields.
 *
 * ![packing slip](images/sample_packing_slip.png)
 *
 * Field annotations:
 *
 * * **(1)** Barcode unique for the shipment.
 * * **(2)** Store logo defined in the store settings or overridden using `packing_slip.logo_url` field. The provided image is converted to a grayscale/1-bit monochrome image.
 * * **(3)** The date of the shipment.
 * * **(4)** Packing slip number consisting of order and shipment IDs in Printful database, divided with a hyphen.
 * * **(5)** The country from which the shipment is made. If the recipient is in the United States, this field will be
 *   absent.
 * * **(6)** Recipient address with phone, without email address.
 * * **(7)** Store name. This can be overridden using `packing_slip.store_name`.
 * * **(8)** The address to which the shipment should be returned. By default it will be a Printful’s return address, but
 *   you can set your own address in the store settings (**Settings > Stores > Returns > Return address section**).
 * * **(9)** The customer service phone number defined in the store settings or overridden using `packing_slip.phone`
 *   field.
 * * **(10)** The customer service email address defined in the store settings or overridden using `packing_slip.email`
 *   field.
 * * **(11)** Gift message. This is only present if the `gift` field was provided in the order request.
 * * **(12)** The order creation date.
 * * **(13)** Printful Order ID which can be overridden using `packing_slip.custom_order_id` field.
 * * **(14)** The list of order items with quantities. The items’ display names are localized, using the recipient’s
 *   country and include variant information such as color and size e.g. „Unisex Staple T-Shirt | Bella + Canvas 3001 (
 *   Lilac / M)”.
 * * **(15)** The packing slip message defined in the store settings or overridden using `packing_slip.message` field.
 *
 * ### More Orders API examples
 *
 * See the [examples section](#tag/Examples/Orders-API-examples) for more sample requests on how Orders API can be used in
 * different scenarios.
 *
 * ### Custom border color option
 *
 * Stickers can have a different border color which can be set by using the `thread_colors_outline` option.
 * This option is available in `options` for stickers. To showcase the usage we will use the order flow
 * which will create order with a sticker that will have a red border color:
 *
 * Endpoint `POST https://api.printful.com/orders`
 * <details>
 *     <summary>Request body</summary>
 *
 * ```
 * {
 *     "shipping": "STANDARD",
 *     "recipient": {
 *         "name": "John Smith",
 *         "address1": "19749 Dearborn St",
 *         "city": "Chatsworth",
 *         "country_code": "US",
 *         "state_code": "CA",
 *         "zip": "91311"
 *     },
 *     "items": [
 *         {
 *             "variant_id": 10163,
 *             "files": [
 *                 {
 *                     "type": "default",
 *                     "url": "https://www.printful.com/static/images/layout/printful-logo.png"
 *                 }
 *             ],
 *             "options": [
 *                 {
 *                     "id": "custom_border_color",
 *                     "value": "#FF0000"
 *                 }
 *             ]
 *         }
 *     ]
 * }
 * ```
 *
 * </details>
 */
export class Orders extends APIResource {
  /**
   * Creates a new order and optionally submits it for fulfillment
   * ([See examples](#tag/Examples/Orders-API-examples))
   *
   * @example
   * ```ts
   * const order = await client.orders.create({
   *   items: [{}],
   *   recipient: {},
   * });
   * ```
   */
  create(params: OrderCreateParams, options?: RequestOptions): APIPromise<OrderCreateResponse> {
    const { confirm, update_existing, 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.post('/orders', {
      query: { confirm, update_existing },
      body,
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Returns order data by ID or External ID.
   *
   * @example
   * ```ts
   * const order = await client.orders.retrieve('string');
   * ```
   */
  retrieve(
    id: string | number,
    params: OrderRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrderRetrieveResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.get(path`/orders/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Updates unsubmitted order and optionally submits it for the fulfillment.
   *
   * Note that you need to post only the fields that need to be changed, not all
   * required fields.
   *
   * If items array is given in the update data, the items will be:
   *
   * a) updated, if the update data contains the item id or external_id parameter
   * that alreay exists
   *
   * b) deleted, if the request doesn't contain the item with previously existing id
   *
   * c) created as new if the id is not given or does not already exist
   *
   * @example
   * ```ts
   * const order = await client.orders.update('string', {
   *   items: [{}],
   *   recipient: {},
   * });
   * ```
   */
  update(
    id: string | number,
    params: OrderUpdateParams,
    options?: RequestOptions,
  ): APIPromise<OrderUpdateResponse> {
    const { confirm, 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.put(path`/orders/${id}`, {
      query: { confirm },
      body,
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Returns list of order objects from your store
   *
   * @example
   * ```ts
   * const orders = await client.orders.list();
   * ```
   */
  list(
    query: OrderListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrderListResponse> {
    return this._client.get('/orders', { query, ...options, __security: {} });
  }

  /**
   * Cancels pending order or draft. Charged amount is returned to the store owner's
   * credit card.
   *
   * @example
   * ```ts
   * const response = await client.orders.cancel('string');
   * ```
   */
  cancel(
    id: string | number,
    params: OrderCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrderCancelResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.delete(path`/orders/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Approves for fulfillment an order that was saved as a draft. Store owner's
   * credit card is charged when the order is submitted for fulfillment.
   *
   * @example
   * ```ts
   * const response = await client.orders.confirm('string');
   * ```
   */
  confirm(
    id: string | number,
    params: OrderConfirmParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrderConfirmResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.post(path`/orders/${id}/confirm`, {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Calculates the estimated order costs including item costs, print costs (back
   * prints, inside labels etc.), shipping and taxes
   *
   * @example
   * ```ts
   * const response = await client.orders.estimateCosts({
   *   items: [{}],
   *   recipient: {},
   * });
   * ```
   */
  estimateCosts(
    params: OrderEstimateCostsParams,
    options?: RequestOptions,
  ): APIPromise<OrderEstimateCostsResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.post('/orders/estimate-costs', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }
}

/**
 * Information about the address
 */
export interface Address {
  /**
   * Address line 1
   */
  address1?: string;

  /**
   * Address line 2
   */
  address2?: string;

  /**
   * City
   */
  city?: string;

  /**
   * Company name
   */
  company?: string;

  /**
   * Country code
   */
  country_code?: string;

  /**
   * Country name
   */
  country_name?: string;

  /**
   * Email address
   */
  email?: string;

  /**
   * Full name
   */
  name?: string;

  /**
   * Phone number
   */
  phone?: string;

  /**
   * State code
   */
  state_code?: string;

  /**
   * State name
   */
  state_name?: string;

  /**
   * TAX number (`optional`, but in case of Brazil country this field becomes
   * `required` and will be used as CPF/CNPJ number) CPF format is 000.000.000-00 (14
   * characters); CNPJ format is 00.000.000/0000-00 (18 characters).
   */
  tax_number?: string;

  /**
   * ZIP/Postal code
   */
  zip?: string;
}

/**
 * Order costs (Printful prices)
 */
export interface Costs {
  /**
   * Additional fee for custom product
   */
  additional_fee?: string;

  /**
   * 3 letter currency code
   */
  currency?: string;

  /**
   * Digitization costs
   */
  digitization?: string;

  /**
   * Discount sum
   */
  discount?: string;

  /**
   * Custom product fulfillment fee
   */
  fulfillment_fee?: string;

  /**
   * Retail delivery fee
   */
  retail_delivery_fee?: string;

  /**
   * Shipping costs
   */
  shipping?: string;

  /**
   * Total cost of all items
   */
  subtotal?: string;

  /**
   * Sum of taxes (not included in the item price)
   */
  tax?: string;

  /**
   * Grand Total (subtotal-discount+tax+vat+shipping)
   */
  total?: string;

  /**
   * Sum of vat (not included in the item price)
   */
  vat?: string;
}

/**
 * Optional gift message for the packing slip
 */
export interface Gift {
  /**
   * Gift message text
   */
  message?: string;

  /**
   * Gift message title
   */
  subject?: string;
}

/**
 * Information about an incomplete item in the order
 */
export interface IncompleteItem {
  /**
   * External order line item id.
   */
  external_line_item_id?: string;

  /**
   * External variant ID of the incompleted item.
   */
  external_variant_id?: string;

  /**
   * Incomplete item name
   */
  name?: string;

  /**
   * Incompleted item quantity
   */
  quantity?: number;

  /**
   * Sync variant ID of the incompleted item.
   */
  sync_variant_id?: number;
}

/**
 * Information about an item in the order
 */
export interface Item {
  /**
   * Line item ID
   */
  id?: number;

  /**
   * Whether the item belongs to discontinued product i.e. it's permanently
   * unavailable
   */
  discontinued?: boolean;

  /**
   * Line item ID from the external system
   */
  external_id?: string;

  /**
   * External variant ID of the item ordered.
   * [Example](#tag/Examples/Orders-API-examples/Using-sync-variant-with-external-ID).
   */
  external_variant_id?: string;

  /**
   * Array of attached printfiles / preview images
   */
  files?: Array<Item.File>;

  /**
   * Display name of the item. If not given, a name from the Printful system will be
   * displayed on the packing slip
   */
  name?: string;

  /**
   * Array of additional options for this product [See examples](#tag/Common/Options)
   */
  options?: Array<Option>;

  /**
   * Whether the item is out of stock i.e. temporarily unavailable
   */
  out_of_stock?: boolean;

  /**
   * Printful price of the item
   */
  price?: string;

  /**
   * Short information about the Printful Product and Variant
   */
  product?: Shared.ProductVariant;

  /**
   * The ID of a Product Template to generate the printfiles from. The `variant_id`
   * field must be passed as well. Can't be combined with following fields:
   * `sync_variant_id`, `external_variant_id`, `warehouse_product_variant_id`,
   * `files`, `options`, `external_product_id`.
   * [Examples](#tag/Examples/Orders-API-examples/Using-a-product-template).
   */
  product_template_id?: number;

  /**
   * Number of items ordered (Limited to 1000 for one item)
   */
  quantity?: number;

  /**
   * Original retail price of the item to be displayed on the packing slip
   */
  retail_price?: string;

  /**
   * Product identifier (SKU) from the external system
   */
  sku?: string;

  /**
   * Sync variant ID of the item ordered.
   * [Example](#tag/Examples/Orders-API-examples/Using-a-sync-variant).
   */
  sync_variant_id?: number;

  /**
   * Variant ID of the item ordered. See [Catalog API](#tag/Catalog-API)
   */
  variant_id?: number;

  /**
   * Warehousing product variant ID of the item ordered. See Warehouse Products API
   */
  warehouse_product_variant_id?: number;
}

export namespace Item {
  /**
   * Information about the File
   */
  export interface File extends Shared.File {}
}

/**
 * Additional option for order item
 */
export interface Option {
  /**
   * Option ID
   */
  id?: string;

  /**
   * Option value
   */
  value?: string;
}

/**
 * Information about the Order
 */
export interface Order {
  /**
   * Array of items in the order
   */
  items: Array<Item>;

  /**
   * Information about the address
   */
  recipient: Address;

  /**
   * Order ID
   */
  id?: number;

  /**
   * Array of branding items in the order
   */
  branding_items?: Array<Item>;

  /**
   * Order costs (Printful prices)
   */
  costs?: Costs;

  /**
   * Time when the order was created
   */
  created?: number;

  /**
   * Order ID from the external system
   */
  external_id?: string | null;

  /**
   * Optional gift message for the packing slip
   */
  gift?: Gift;

  /**
   * Array of incomplete items in the order
   */
  incomplete_items?: Array<IncompleteItem>;

  /**
   * Custom packing slip for this order. Example of a packing slip with explained
   * fields can be found [here](#packing-slip).
   */
  packing_slip?: Shared.PackingSlip;

  /**
   * Difference between order price and retail costs. Will be shown only if order is
   * completed.
   */
  pricing_breakdown?: Array<PricingBreakdown>;

  /**
   * Retail costs that are to be displayed on the packing slip for international
   * shipments. Retail costs are used only if every item in order contains the
   * `retail_price` attribute.
   */
  retail_costs?: RetailCosts;

  /**
   * Array of shipments already shipped for this order
   */
  shipments?: Array<Shipment>;

  /**
   * Shipping method. Defaults to 'STANDARD'
   */
  shipping?: string;

  /**
   * Human readable shipping method name.
   */
  shipping_service_name?: string;

  /**
   * Order status:<br /> **draft** - order is not submitted for fulfillment<br />
   * **failed** - order was submitted for fulfillment but was not accepted because of
   * an error (problem with address, printfiles, charging, etc.)<br /> **inreview** -
   * order is being reviewed<br /> **pending** - order has been submitted for
   * fulfillment<br /> **canceled** - order is canceled<br /> **onhold** - order has
   * encountered a problem during the fulfillment that needs to be resolved together
   * with the Printful customer service **inprocess** - order is being fulfilled and
   * is no longer cancellable<br /> **partial** - order is partially fulfilled (some
   * items are shipped already, the rest will follow)<br /> **fulfilled** - all items
   * are shipped<br />
   */
  status?: string;

  /**
   * Store ID
   */
  store?: number;

  /**
   * Time when the order was updated
   */
  updated?: number;
}

/**
 * Information about item in an order shipment
 */
export interface OrderShipmentItem {
  /**
   * Line item ID
   */
  item_id?: number;

  /**
   * A boolean indicating that the pickup stage of this item's fulfillment has been
   * completed
   */
  picked?: 0 | 1;

  /**
   * A boolean indicting that the item has been printed, sublimated or sewed.
   */
  printed?: 0 | 1;

  /**
   * Quantity of items in this shipment
   */
  quantity?: number;
}

/**
 * Difference between order price and retail costs. Will be shown only if order is
 * completed.
 */
export interface PricingBreakdown {
  /**
   * Shipment tracking number
   */
  currency_symbol?: string;

  /**
   * Amount customer paid
   */
  customer_pays?: string;

  /**
   * Printful price
   */
  printful_price?: string;

  /**
   * Profit
   */
  profit?: string;
}

/**
 * Retail costs that are to be displayed on the packing slip for international
 * shipments. Retail costs are used only if every item in order contains the
 * `retail_price` attribute.
 */
export interface RetailCosts {
  /**
   * 3 letter currency code
   */
  currency?: string;

  /**
   * Discount sum
   */
  discount?: string | null;

  /**
   * Shipping costs
   */
  shipping?: string | null;

  /**
   * Total cost of all items
   */
  subtotal?: string | null;

  /**
   * Sum of taxes (not included in the item price)
   */
  tax?: string | null;

  /**
   * Grand Total (subtotal-discount+tax+vat+shipping)
   */
  total?: string | null;

  /**
   * Sum of VAT (not included in the item price)
   */
  vat?: string | null;
}

/**
 * Information about order shipment
 */
export interface Shipment {
  /**
   * Shipment ID
   */
  id?: number;

  /**
   * Carrier name
   */
  carrier?: string;

  /**
   * Shipping time
   */
  created?: number;

  /**
   * Array of items in this shipment
   */
  items?: Array<OrderShipmentItem>;

  /**
   * Whether this is a reshipment
   */
  reshipment?: boolean;

  /**
   * Delivery service name
   */
  service?: string;

  /**
   * Ship date
   */
  ship_date?: string;

  /**
   * Ship time in unix timestamp
   */
  shipped_at?: string;

  /**
   * Shipment tracking number
   */
  tracking_number?: string;

  /**
   * Shipment tracking URL
   */
  tracking_url?: string;
}

export interface OrderCreateResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the Order
   */
  result?: Order;
}

export interface OrderRetrieveResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the Order
   */
  result?: Order;
}

export interface OrderUpdateResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the Order
   */
  result?: Order;
}

export interface OrderListResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Paging information
   */
  paging?: Shared.Paging;

  result?: Array<Order>;
}

export interface OrderCancelResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the Order
   */
  result?: Order;
}

export interface OrderConfirmResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the Order
   */
  result?: Order;
}

export interface OrderEstimateCostsResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: OrderEstimateCostsResponse.Result;
}

export namespace OrderEstimateCostsResponse {
  export interface Result {
    /**
     * Order costs (Printful prices)
     */
    costs?: Result.Costs;

    /**
     * Retail costs that are to be displayed on the packing slip for international
     * shipments. Retail costs are used only if every item in order contains the
     * `retail_price` attribute.
     */
    retail_costs?: Result.RetailCosts;
  }

  export namespace Result {
    /**
     * Order costs (Printful prices)
     */
    export interface Costs {
      /**
       * Additional fee for custom product
       */
      additional_fee?: number;

      /**
       * 3 letter currency code
       */
      currency?: string;

      /**
       * Digitization costs
       */
      digitization?: string;

      /**
       * Discount sum
       */
      discount?: number;

      /**
       * Custom product fulfillment fee
       */
      fulfillment_fee?: number;

      /**
       * Shipping costs
       */
      shipping?: number;

      /**
       * Total cost of all items
       */
      subtotal?: number;

      /**
       * Sum of taxes (not included in the item price)
       */
      tax?: number;

      /**
       * Grand Total (subtotal-discount+tax+vat+shipping)
       */
      total?: number;

      /**
       * Sum of vat (not included in the item price)
       */
      vat?: number;
    }

    /**
     * Retail costs that are to be displayed on the packing slip for international
     * shipments. Retail costs are used only if every item in order contains the
     * `retail_price` attribute.
     */
    export interface RetailCosts {
      /**
       * 3 letter currency code
       */
      currency?: string;

      /**
       * Discount sum
       */
      discount?: number | null;

      /**
       * Shipping costs
       */
      shipping?: number | null;

      /**
       * Total cost of all items
       */
      subtotal?: number | null;

      /**
       * Sum of taxes (not included in the item price)
       */
      tax?: number | null;

      /**
       * Grand Total (subtotal-discount+tax+vat+shipping)
       */
      total?: number | null;

      /**
       * Sum of VAT (not included in the item price)
       */
      vat?: number | null;
    }
  }
}

export interface OrderCreateParams {
  /**
   * Body param: Array of items in the order
   */
  items: Array<Item>;

  /**
   * Body param: Information about the address
   */
  recipient: Address;

  /**
   * Query param: Automatically submit the newly created order for fulfillment (skip
   * the Draft phase)
   */
  confirm?: boolean;

  /**
   * Query param: Try to update existing order if an order with the specified
   * external_id already exists
   */
  update_existing?: boolean;

  /**
   * Body param: Order costs (Printful prices)
   */
  costs?: Costs;

  /**
   * Body param: Order ID from the external system
   */
  external_id?: string | null;

  /**
   * Body param: Optional gift message for the packing slip
   */
  gift?: Gift;

  /**
   * Body param: Custom packing slip for this order. Example of a packing slip with
   * explained fields can be found [here](#packing-slip).
   */
  packing_slip?: Shared.PackingSlip;

  /**
   * Body param: Retail costs that are to be displayed on the packing slip for
   * international shipments. Retail costs are used only if every item in order
   * contains the `retail_price` attribute.
   */
  retail_costs?: RetailCosts;

  /**
   * Body param: Shipping method. Defaults to 'STANDARD'
   */
  shipping?: string;

  /**
   * Header param: Use this to specify which store you want to use (required only for
   * account level token).
   *
   * The store IDs can be retrieved with the
   * [Get basic information about stores](#tag/Store-Information-API/operation/getStores)
   * endpoint.
   */
  'X-PF-Store-Id'?: string;
}

export interface OrderRetrieveParams {
  /**
   * Use this to specify which store you want to use (required only for account level
   * token).
   *
   * The store IDs can be retrieved with the
   * [Get basic information about stores](#tag/Store-Information-API/operation/getStores)
   * endpoint.
   */
  'X-PF-Store-Id'?: string;
}

export interface OrderUpdateParams {
  /**
   * Body param: Array of items in the order
   */
  items: Array<Item>;

  /**
   * Body param: Information about the address
   */
  recipient: Address;

  /**
   * Query param: Automatically submit the newly created order for fulfillment (skip
   * the Draft phase)
   */
  confirm?: boolean;

  /**
   * Body param: Order costs (Printful prices)
   */
  costs?: Costs;

  /**
   * Body param: Order ID from the external system
   */
  external_id?: string | null;

  /**
   * Body param: Optional gift message for the packing slip
   */
  gift?: Gift;

  /**
   * Body param: Custom packing slip for this order. Example of a packing slip with
   * explained fields can be found [here](#packing-slip).
   */
  packing_slip?: Shared.PackingSlip;

  /**
   * Body param: Retail costs that are to be displayed on the packing slip for
   * international shipments. Retail costs are used only if every item in order
   * contains the `retail_price` attribute.
   */
  retail_costs?: RetailCosts;

  /**
   * Body param: Shipping method. Defaults to 'STANDARD'
   */
  shipping?: string;

  /**
   * Header param: Use this to specify which store you want to use (required only for
   * account level token).
   *
   * The store IDs can be retrieved with the
   * [Get basic information about stores](#tag/Store-Information-API/operation/getStores)
   * endpoint.
   */
  'X-PF-Store-Id'?: string;
}

export interface OrderListParams {
  /**
   * Number of items per page (max 100)
   */
  limit?: number;

  /**
   * Result set offset
   */
  offset?: number;

  /**
   * Filter by order status
   */
  status?: string;
}

export interface OrderCancelParams {
  /**
   * Use this to specify which store you want to use (required only for account level
   * token).
   *
   * The store IDs can be retrieved with the
   * [Get basic information about stores](#tag/Store-Information-API/operation/getStores)
   * endpoint.
   */
  'X-PF-Store-Id'?: string;
}

export interface OrderConfirmParams {
  /**
   * Use this to specify which store you want to use (required only for account level
   * token).
   *
   * The store IDs can be retrieved with the
   * [Get basic information about stores](#tag/Store-Information-API/operation/getStores)
   * endpoint.
   */
  'X-PF-Store-Id'?: string;
}

export interface OrderEstimateCostsParams {
  /**
   * Body param: Array of items in the order
   */
  items: Array<Item>;

  /**
   * Body param: Information about the address
   */
  recipient: Address;

  /**
   * Body param: Order costs (Printful prices)
   */
  costs?: Costs;

  /**
   * Body param: Order ID from the external system
   */
  external_id?: string | null;

  /**
   * Body param: Optional gift message for the packing slip
   */
  gift?: Gift;

  /**
   * Body param: Custom packing slip for this order. Example of a packing slip with
   * explained fields can be found [here](#packing-slip).
   */
  packing_slip?: Shared.PackingSlip;

  /**
   * Body param: Retail costs that are to be displayed on the packing slip for
   * international shipments. Retail costs are used only if every item in order
   * contains the `retail_price` attribute.
   */
  retail_costs?: RetailCosts;

  /**
   * Body param: Shipping method. Defaults to 'STANDARD'
   */
  shipping?: string;

  /**
   * Header param: Use this to specify which store you want to use (required only for
   * account level token).
   *
   * The store IDs can be retrieved with the
   * [Get basic information about stores](#tag/Store-Information-API/operation/getStores)
   * endpoint.
   */
  'X-PF-Store-Id'?: string;
}

export declare namespace Orders {
  export {
    type Address as Address,
    type Costs as Costs,
    type Gift as Gift,
    type IncompleteItem as IncompleteItem,
    type Item as Item,
    type Option as Option,
    type Order as Order,
    type OrderShipmentItem as OrderShipmentItem,
    type PricingBreakdown as PricingBreakdown,
    type RetailCosts as RetailCosts,
    type Shipment as Shipment,
    type OrderCreateResponse as OrderCreateResponse,
    type OrderRetrieveResponse as OrderRetrieveResponse,
    type OrderUpdateResponse as OrderUpdateResponse,
    type OrderListResponse as OrderListResponse,
    type OrderCancelResponse as OrderCancelResponse,
    type OrderConfirmResponse as OrderConfirmResponse,
    type OrderEstimateCostsResponse as OrderEstimateCostsResponse,
    type OrderCreateParams as OrderCreateParams,
    type OrderRetrieveParams as OrderRetrieveParams,
    type OrderUpdateParams as OrderUpdateParams,
    type OrderListParams as OrderListParams,
    type OrderCancelParams as OrderCancelParams,
    type OrderConfirmParams as OrderConfirmParams,
    type OrderEstimateCostsParams as OrderEstimateCostsParams,
  };
}
