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
export class Products extends APIResource {
  /**
   * Get information about a single Sync Product and its Sync Variants
   *
   * @example
   * ```ts
   * const product = await client.sync.products.retrieve(0);
   * ```
   */
  retrieve(
    id: number | string,
    params: ProductRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductRetrieveResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.get(path`/sync/products/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Returns list of Sync Product objects from your store.
   *
   * @example
   * ```ts
   * const products = await client.sync.products.list();
   * ```
   */
  list(
    params: ProductListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductListResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...query } = params ?? {};
    return this._client.get('/sync/products', {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Deletes a Sync Product with all of its Sync Variants
   *
   * @example
   * ```ts
   * const product = await client.sync.products.delete(0);
   * ```
   */
  delete(
    id: number | string,
    params: ProductDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductDeleteResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.delete(path`/sync/products/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }
}

export interface ProductRetrieveResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: ProductRetrieveResponse.Result;
}

export namespace ProductRetrieveResponse {
  export interface Result {
    /**
     * Information about the SyncProduct
     */
    sync_product?: Shared.SyncProduct;

    /**
     * Array of Sync Variants available for the selected product
     */
    sync_variants?: Array<Shared.SyncVariant>;
  }
}

export interface ProductListResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Paging information
   */
  paging?: Shared.Paging;

  /**
   * Array of SyncProduct
   */
  result?: Array<Shared.SyncProduct>;
}

export interface ProductDeleteResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: ProductDeleteResponse.Result;
}

export namespace ProductDeleteResponse {
  export interface Result {
    /**
     * Information about the SyncProduct
     */
    sync_product?: Shared.SyncProduct;

    /**
     * Array of Sync Variants available for the selected product
     */
    sync_variants?: Array<Shared.SyncVariant>;
  }
}

export interface ProductRetrieveParams {
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

export interface ProductListParams {
  /**
   * Query param: Number of items per page (max 100)
   */
  limit?: number;

  /**
   * Query param: Result set offset
   */
  offset?: number;

  /**
   * Query param: Product search needle
   */
  search?: string;

  /**
   * Query param: Parameter used to filter results by status/group of Sync Products
   */
  status?: 'all' | 'synced' | 'unsynced' | 'ignored' | 'imported' | 'discontinued' | 'out_of_stock';

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

export interface ProductDeleteParams {
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

export declare namespace Products {
  export {
    type ProductRetrieveResponse as ProductRetrieveResponse,
    type ProductListResponse as ProductListResponse,
    type ProductDeleteResponse as ProductDeleteResponse,
    type ProductRetrieveParams as ProductRetrieveParams,
    type ProductListParams as ProductListParams,
    type ProductDeleteParams as ProductDeleteParams,
  };
}
