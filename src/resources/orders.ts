// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
