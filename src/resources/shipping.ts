// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Shipping extends APIResource {
  /**
   * Returns available shipping options and rates for the given list of products.
   *
   * **Recipient Address Requirements:**
   *
   * - Only `country_code` is required in the recipient object
   * - `state_code` is only required for United States (US), Australia (AU), and
   *   Canada (CA)
   * - All other recipient fields are optional
   *
   * **Note:** Providing more address information may produce more precise results
   * and more shipping options. While only the country code is required, including
   * additional details like city, postal code, and state/province can help return
   * more accurate shipping rates and additional delivery options.
   *
   * **Important:** Shipping rates returned by this endpoint may differ from those
   * returned by `/orders/estimate-costs` if your store has
   * [store shipping settings](https://www.printful.com/dashboard/settings/store-shipping)
   * configured.
   *
   * The `/orders/estimate-costs` endpoint automatically applies your store's
   * shipping settings (including shipping markup), while this endpoint applies them
   * **only if the store shipping settings are enabled**. To ensure consistent
   * results between both endpoints, make sure your store shipping settings are
   * enabled and properly configured in your Printful Dashboard.
   *
   * @example
   * ```ts
   * const response = await client.shipping.calculateRates({
   *   items: [{ quantity: 10 }],
   *   recipient: { country_code: 'US' },
   * });
   * ```
   */
  calculateRates(
    params: ShippingCalculateRatesParams,
    options?: RequestOptions,
  ): APIPromise<ShippingCalculateRatesResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.post('/shipping/rates', {
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

export interface ShippingCalculateRatesResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: Array<ShippingCalculateRatesResponse.Result>;
}

export namespace ShippingCalculateRatesResponse {
  /**
   * Shipping information
   */
  export interface Result {
    /**
     * Shipping method ID
     */
    id?: string;

    /**
     * Currency code in which the rate is returned
     */
    currency?: string;

    /**
     * Estimated maximum delivery date. <span style="color:orange">Warning! This value
     * may not be present in response.</span>
     */
    maxDeliveryDate?: number;

    /**
     * Estimated maximum delivery days. <span style="color:orange">Warning! This value
     * may not be present in response.</span>
     */
    maxDeliveryDays?: number;

    /**
     * Estimated minimum delivery date. <span style="color:orange">Warning! This value
     * may not be present in response.</span>
     */
    minDeliveryDate?: number;

    /**
     * Estimated minimum delivery days. <span style="color:orange">Warning! This value
     * may not be present in response.</span>
     */
    minDeliveryDays?: number;

    /**
     * Shipping method name
     */
    name?: string;

    /**
     * Shipping rate
     */
    rate?: string;
  }
}

export interface ShippingCalculateRatesParams {
  /**
   * Body param: Array of order items
   */
  items: Array<ShippingCalculateRatesParams.Item>;

  /**
   * Body param: Recipient address information for shipping rate calculation.
   *
   * **Required fields:**
   *
   * - `country_code`: Always required
   *
   * **Conditionally required fields:**
   *
   * - `state_code`: Required for United States (US), Australia (AU), and Canada (CA)
   *
   * **Optional fields:**
   *
   * - All other fields are optional but providing more information may produce more
   *   precise results and more shipping options.
   */
  recipient: ShippingCalculateRatesParams.Recipient;

  /**
   * Body param: 3 letter currency code (optional), required if the rates need to be
   * converted to another currency instead of store default currency
   */
  currency?: string;

  /**
   * Body param: Locale in which shipping rate names will be returned. Available
   * options: `en_US` (default), `es_ES`
   */
  locale?: string;

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

export namespace ShippingCalculateRatesParams {
  /**
   * Order item information
   */
  export interface Item {
    /**
     * Number of items ordered
     */
    quantity: number;

    /**
     * External Variant ID of the item ordered. See
     * [Ecommerce Platform Sync API](#tag/Ecommerce-Platform-Sync-API).
     * <span style="color:red">\*Required if no other IDs given</span>
     */
    external_variant_id?: string;

    /**
     * Item retail value - optional but can help to properly calculate
     */
    value?: string;

    /**
     * Catalog Variant ID of the item ordered. See [Catalog API](#tag/Catalog-API)
     * <span style="color:red">\*Required if no other IDs given</span>
     */
    variant_id?: string;

    /**
     * Warehouse product variant ID of the item ordered. See
     * [Warehouse Products API](#tag/Warehouse-Products-API).
     * <span style="color:red">\*Required if no other IDs given</span>
     */
    warehouse_product_variant_id?: string;
  }

  /**
   * Recipient address information for shipping rate calculation.
   *
   * **Required fields:**
   *
   * - `country_code`: Always required
   *
   * **Conditionally required fields:**
   *
   * - `state_code`: Required for United States (US), Australia (AU), and Canada (CA)
   *
   * **Optional fields:**
   *
   * - All other fields are optional but providing more information may produce more
   *   precise results and more shipping options.
   */
  export interface Recipient {
    /**
     * Two-letter country code (ISO 3166-1 alpha-2)
     */
    country_code: string;

    /**
     * Address line 1
     */
    address1?: string;

    /**
     * Address line 2
     */
    address2?: string | null;

    /**
     * City
     */
    city?: string;

    /**
     * Phone number
     */
    phone?: string | null;

    /**
     * State/province code. Required for United States (US), Australia (AU), and Canada
     * (CA). For other countries, this field is optional.
     */
    state_code?: string | null;

    /**
     * ZIP or postal code
     */
    zip?: string | null;
  }
}

export declare namespace Shipping {
  export {
    type ShippingCalculateRatesResponse as ShippingCalculateRatesResponse,
    type ShippingCalculateRatesParams as ShippingCalculateRatesParams,
  };
}
