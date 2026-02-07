// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Products extends APIResource {
  /**
   * Creates a new Sync Product together with its Sync Variants
   * ([See examples](#tag/Products-API/operation/createSyncProduct)).
   *
   * @example
   * ```ts
   * const product = await client.store.products.create({
   *   sync_product: { name: 'T-shirt' },
   *   sync_variants: [
   *     {
   *       files: [
   *         {
   *           url: '​https://www.example.com/files/tshirts/example.png',
   *         },
   *       ],
   *       variant_id: 3001,
   *     },
   *   ],
   * });
   * ```
   */
  create(params: ProductCreateParams, options?: RequestOptions): APIPromise<ProductCreateResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.post('/store/products', {
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
   * Get information about a single Sync Product and its Sync Variants.
   *
   * @example
   * ```ts
   * const product = await client.store.products.retrieve(0);
   * ```
   */
  retrieve(
    id: number | string,
    params: ProductRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductRetrieveResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.get(path`/store/products/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Modifies an existing Sync Product with its Sync Variants.
   *
   * Please note that in the request body you only need to specify the fields that
   * need to be changed. Furthermore, if you want to update existing sync variants,
   * then in the sync variants array you must specify the IDs of all existing sync
   * variants. All omitted existing sync variants will be deleted. All new sync
   * variants without an ID will be created. See examples for more insights.
   *
   * **Rate limiting:** Up to 10 requests per 60 seconds. A 60 seconds lockout is
   * applied if request count is exceeded.
   *
   * [See examples](#tag/Examples/Products-API-examples/Modify-a-Sync-Product)
   *
   * @example
   * ```ts
   * const product = await client.store.products.update(0);
   * ```
   */
  update(
    id: number | string,
    params: ProductUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ProductUpdateResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.put(path`/store/products/${id}`, {
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
   * Returns a list of Sync Product objects from your custom Printful store.
   *
   * @example
   * ```ts
   * const products = await client.store.products.list();
   * ```
   */
  list(
    params: ProductListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductListResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...query } = params ?? {};
    return this._client.get('/store/products', {
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
   * const product = await client.store.products.delete(0);
   * ```
   */
  delete(
    id: number | string,
    params: ProductDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductDeleteResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.delete(path`/store/products/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Creates a new Sync Variant for an existing Sync Product
   * ([See examples](#tag/Examples/Products-API-examples/Create-a-new-Sync-Variant)).
   *
   * @example
   * ```ts
   * const response = await client.store.products.createVariant(
   *   0,
   *   {
   *     files: [
   *       {
   *         url: '​https://www.example.com/files/tshirts/example.png',
   *       },
   *     ],
   *     variant_id: 3001,
   *   },
   * );
   * ```
   */
  createVariant(
    id: number | string,
    params: ProductCreateVariantParams,
    options?: RequestOptions,
  ): APIPromise<ProductCreateVariantResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.post(path`/store/products/${id}/variants`, {
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

export interface ProductCreateResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the SyncProduct
   */
  result?: Shared.SyncProduct;
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

export interface ProductUpdateResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the SyncProduct
   */
  result?: Shared.SyncProduct;
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

export interface ProductCreateVariantResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the SyncVariant
   */
  result?: Shared.SyncVariant;
}

export interface ProductCreateParams {
  /**
   * Body param: Information about the SyncProduct
   */
  sync_product: Shared.SyncProduct;

  /**
   * Body param: Information about the Sync Variants
   */
  sync_variants: Array<Shared.SyncVariant>;

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

export interface ProductUpdateParams {
  /**
   * Body param: Information about the SyncProduct
   */
  sync_product?: Shared.SyncProduct;

  /**
   * Body param: Information about the Sync Variants
   */
  sync_variants?: Array<ProductUpdateParams.SyncVariant>;

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

export namespace ProductUpdateParams {
  /**
   * Information about the SyncVariant
   */
  export interface SyncVariant extends Shared.SyncVariant {
    /**
     * Sync Variant ID. Please specify the IDs of all Sync Variants you wish to keep.
     */
    id?: number;
  }
}

export interface ProductListParams {
  /**
   * Query param: A comma-separated list of Category IDs of the Products that are to
   * be returned
   */
  category_id?: string;

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

export interface ProductCreateVariantParams {
  /**
   * Body param: Array of attached printfiles / preview images
   */
  files: Array<ProductCreateVariantParams.File>;

  /**
   * Body param: Printful Variant ID that this Sync Variant is synced to
   */
  variant_id: number;

  /**
   * Body param: Indicates the status of the Sync Variant.
   */
  availability_status?: 'active' | 'discontinued' | 'out_of_stock' | 'temporary_out_of_stock';

  /**
   * Body param: Variant ID from the Ecommerce platform
   */
  external_id?: string;

  /**
   * Body param: Indicates if this Sync Variant is ignored
   */
  is_ignored?: boolean;

  /**
   * Body param: Array of additional options for the configured product/variant
   * [See examples](#tag/Common/Options)
   */
  options?: Array<Shared.ItemOption>;

  /**
   * Body param: Short information about the Printful Product and Variant
   */
  product?: Shared.ProductVariant;

  /**
   * Body param: Retail price that this item is sold for
   */
  retail_price?: string;

  /**
   * Body param: SKU of this Sync Variant
   */
  sku?: string | null;

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

export namespace ProductCreateVariantParams {
  /**
   * Information about the File
   */
  export interface File extends Shared.File {}
}

export declare namespace Products {
  export {
    type ProductCreateResponse as ProductCreateResponse,
    type ProductRetrieveResponse as ProductRetrieveResponse,
    type ProductUpdateResponse as ProductUpdateResponse,
    type ProductListResponse as ProductListResponse,
    type ProductDeleteResponse as ProductDeleteResponse,
    type ProductCreateVariantResponse as ProductCreateVariantResponse,
    type ProductCreateParams as ProductCreateParams,
    type ProductRetrieveParams as ProductRetrieveParams,
    type ProductUpdateParams as ProductUpdateParams,
    type ProductListParams as ProductListParams,
    type ProductDeleteParams as ProductDeleteParams,
    type ProductCreateVariantParams as ProductCreateVariantParams,
  };
}
