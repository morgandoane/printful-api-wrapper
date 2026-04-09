// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * The ecommerce platform sync API allows you to automatically assign Printful
 * products and print files to the products in your online store (Shopify, Woocommerce, etc.)
 * that is linked to Printful.
 *
 * ### Sync Products & Sync Variants explained
 *
 * Each product in your store can contain one or multiple variants
 * (some ecommerce platforms would call these options) that the customer can purchase
 * (imagine multiple sizes or colors of the same t-shirt design). When you link your
 * ecommerce store to Printful, we create a copy of your product and variant lists
 * on our side - we call it Sync Products and Sync Variants.
 *
 * Similar to your store, products that are sold by Printful also consist of multiple variants.
 * Each t-shirt model is available in many sizes and colors.
 *
 * ![Image](images/variants.png?center)
 *
 * The purpose of Sync Variants is to let you link each variant from your store that
 * will be fulfilled by Printful with a design file(s) and specific variant from Printful
 * product catalogue. When synced products are ordered, we'll know which Printful product
 * needs to be printed, and the order is imported into Printful for fulfillment.
 *
 * You can configure each Sync Variant in the Printful Dashboard manually. However,
 * that can be quite a tedious and repetitive task if your store sells hundreds of products.
 * This API is designed to help you automate this process.
 *
 * <div class="alert alert-info">
 * <strong>Remember</strong><br>
 * Product data is not imported to Printful immediately after the product is
 * created/updated in your ecommerce platform. Depending on the platform, it can take from
 * a couple of seconds up to a few hours for the products to be available on Printful.
 * Before the products are imported, you will not be able to update product information
 * through this API.
 * </div>
 *
 * ### External ID
 *
 * External ID is a feature that allows you to reference Sync Products and Sync Variants
 * by using the ID from your store.
 *
 * When requesting Sync Products and Sync Variants, you can use both the Printful ID
 * and your External ID (if you prefix it with the `@` symbol).
 *
 * ```
 * GET /sync/products/11001  - reference by Printful Sync Product ID
 * GET /sync/products/@988123  - reference by Shopify (or other platform's) Product ID
 * GET /sync/variant/123456  - reference by Printful Sync Variant ID
 * GET /sync/variant/@123123  - reference by Shopify (or other platform's)  Variant ID
 * ```
 *
 * ### Specifying products
 *
 * To specify the exact variant of the product, you have to use the `variant_id` attribute of the order item. Each
 * available unique item (including size/color) has its own Variant ID that can be acquired through
 * the [Catalog API](#tag/Catalog-API).
 *
 * ### Adding print files
 *
 * There are two ways to assign a print file to the item.
 * One is to specify the File ID if the file already exists in the file library of the authorized store:
 *
 * ```json
 * ...
 * "files":
 *   [
 *     {
 *       "id": 12345
 *     },
 *   ],
 * ...
 * ```
 *
 * Second, and the most convenient method is to specify the file URL.
 * If a file with the same URL already exists, it will be reused:
 *
 * ```json
 * ...
 * "files":
 *   [
 *     {
 *       "url": "http://example.com/t-shirts/123/front.pdf"
 *     },
 *   ],
 * ...
 * ```
 *
 * ### Specifying multiple files per item
 *
 * Each item in the order has to be linked with one or multiple files. The available file types for each product are
 * available from the [Catalog API](#tag/Catalog-API).
 *
 * You can add one file for each type by specifying the `type` attribute. For the `default` type, this attribute can be
 * skipped.
 *
 * ```json
 * ...
 * "files":
 *   [
 *     {
 *       "type": "default",
 *       "url": "http://example.com/t-shirts/123/front.pdf"
 *     },
 *     {
 *       "type": "back",
 *       "url": "http://example.com/t-shirts/123/back.pdf"
 *     }
 *   ],
 * ...
 * ```
 *
 * Remember that using additional files can increase the price of the item.
 *
 * [See examples](#tag/Examples/Ecommerce-Platform-Sync-API-examples/Modify-a-Sync-Variant)
 */
export class Variant extends APIResource {
  /**
   * Get information about a single Sync Variant
   *
   * @example
   * ```ts
   * const variant = await client.sync.variant.retrieve(0);
   * ```
   */
  retrieve(
    id: number | string,
    params: VariantRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VariantRetrieveResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.get(path`/sync/variant/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Modifies an existing Sync Variant.
   *
   * Please note that in the request body you only need to specify the fields that
   * need to be changed. See examples for more insights.
   *
   * **Rate limiting:** Up to 10 requests per 60 seconds. A 60 seconds lockout is
   * applied if request count is exceeded.
   *
   * [See examples](#tag/Examples/Ecommerce-Platform-Sync-API-examples/Modify-a-Sync-Variant)
   *
   * @example
   * ```ts
   * const variant = await client.sync.variant.update(0);
   * ```
   */
  update(
    id: number | string,
    params: VariantUpdateParams,
    options?: RequestOptions,
  ): APIPromise<VariantUpdateResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.put(path`/sync/variant/${id}`, {
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
   * Deletes configuraton information (`variant_id`, print files and options) and
   * disables automatic order importing for this Sync Variant.
   *
   * @example
   * ```ts
   * const variant = await client.sync.variant.delete(0);
   * ```
   */
  delete(
    id: number | string,
    params: VariantDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VariantDeleteResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.delete(path`/sync/variant/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }
}

export interface VariantRetrieveResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: VariantRetrieveResponse.Result;
}

export namespace VariantRetrieveResponse {
  export interface Result {
    /**
     * Information about the SyncProduct
     */
    sync_product?: Shared.SyncProduct;

    /**
     * Information about the SyncVariant
     */
    sync_variant?: Shared.SyncVariant;
  }
}

export interface VariantUpdateResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: VariantUpdateResponse.Result;
}

export namespace VariantUpdateResponse {
  export interface Result {
    /**
     * Information about the SyncProduct
     */
    sync_product?: Shared.SyncProduct;

    /**
     * Information about the SyncVariant
     */
    sync_variant?: Shared.SyncVariant;
  }
}

export interface VariantDeleteResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: VariantDeleteResponse.Result;
}

export namespace VariantDeleteResponse {
  export interface Result {
    /**
     * Information about the SyncProduct
     */
    sync_product?: Shared.SyncProduct;

    /**
     * Information about the SyncVariant
     */
    sync_variant?: Shared.SyncVariant;
  }
}

export interface VariantRetrieveParams {
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

export interface VariantUpdateParams {
  /**
   * Body param: Array of attached printfiles/preview images
   */
  files?: Array<Shared.File>;

  /**
   * Body param: If is set to true, indicates the Sync Variant has been marked as
   * ignored by Printful for order imports. This also means that Printful will not
   * handle the stock for Shopify stores that have marked this Sync Variant as
   * ignored.
   */
  is_ignored?: boolean;

  /**
   * Body param: Array of additional options for the configured product/variant
   * [See examples](#tag/Common/Options)
   */
  options?: Array<Shared.ItemOption>;

  /**
   * Body param: Retail price that this item is sold for
   */
  retail_price?: string;

  /**
   * Body param: SKU of this Sync Variant
   */
  sku?: string | null;

  /**
   * Body param: Printful Variant ID that this Sync Variant is synced to
   */
  variant_id?: number;

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

export interface VariantDeleteParams {
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

export declare namespace Variant {
  export {
    type VariantRetrieveResponse as VariantRetrieveResponse,
    type VariantUpdateResponse as VariantUpdateResponse,
    type VariantDeleteResponse as VariantDeleteResponse,
    type VariantRetrieveParams as VariantRetrieveParams,
    type VariantUpdateParams as VariantUpdateParams,
    type VariantDeleteParams as VariantDeleteParams,
  };
}
