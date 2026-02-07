// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

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
