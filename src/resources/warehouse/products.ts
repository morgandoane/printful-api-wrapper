// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Products extends APIResource {
  /**
   * Returns warehouse product data by ID
   */
  retrieve(
    id: number | string,
    params: ProductRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductRetrieveResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.get(path`/warehouse/products/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Returns a list of warehouse products from your store
   *
   * <div class="alert alert-info">
   *   The response for this endpoint was documented as paginated, although it was not paginated. The behavior will be
   *   fixed and the paginated result will be set as the default. Currently to get paginated results please send
   *   <code>true</code>or <code>1</code> in <code>X-PF-Force-Pagination</code> header.
   * </div>
   */
  list(
    params: ProductListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductListResponse> {
    const {
      'X-PF-Force-Pagination': xPfForcePagination,
      'X-PF-Store-Id': xPfStoreID,
      ...query
    } = params ?? {};
    return this._client.get('/warehouse/products', {
      query,
      ...options,
      headers: buildHeaders([
        {
          ...(xPfForcePagination?.toString() != null ?
            { 'X-PF-Force-Pagination': xPfForcePagination?.toString() }
          : undefined),
          ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined),
        },
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

  /**
   * Warehouse product data
   */
  result?: ProductRetrieveResponse.Result;
}

export namespace ProductRetrieveResponse {
  /**
   * Warehouse product data
   */
  export interface Result {
    /**
     * Product ID
     */
    id?: number;

    /**
     * Currency
     */
    currency?: string;

    /**
     * Image URL of product
     */
    image_url?: string;

    /**
     * Product name
     */
    name?: string;

    /**
     * Retail price of product
     */
    retail_price?: number;

    /**
     * Product status:
     *
     * **created** - product request created,
     *
     * **active** - product request approved
     *
     * **suspended** - product suspended
     *
     * **declined** - product request declined
     *
     * **draft** - product created as a draft
     */
    status?: 'created' | 'active' | 'suspended' | 'declined' | 'draft';

    /**
     * Array of product variants
     */
    variants?: Array<Result.Variant>;
  }

  export namespace Result {
    /**
     * Warehouse product variant data
     */
    export interface Variant {
      /**
       * Product variant ID
       */
      id?: number;

      /**
       * Height of product variant
       */
      height?: number;

      /**
       * Image URL of product variant
       */
      image_url?: string;

      /**
       * Length of product variant
       */
      length?: number;

      /**
       * Name of product variant
       */
      name?: string;

      /**
       * Total available quantity of product variant in our stock
       */
      quantity?: number;

      /**
       * Retail price of product variant
       */
      retail_price?: number;

      /**
       * SKU of product variant
       */
      sku?: string;

      /**
       * Product variant quantities in the warehouse stock
       */
      stock_locations?: Array<Variant.StockLocation>;

      /**
       * Weight of product variant
       */
      weight?: number;

      /**
       * Width of product variant
       */
      width?: number;
    }

    export namespace Variant {
      export interface StockLocation {
        /**
         * Available quantity of product variant in our stock
         */
        available?: number;

        /**
         * Name of the warehouse facility
         */
        facility?: string;

        /**
         * Total quantity of product variant in our stock
         */
        stocked?: number;
      }
    }
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
  paging?: ProductListResponse.Paging;

  /**
   * Array of WarehouseProducts
   */
  result?: Array<ProductListResponse.Result>;
}

export namespace ProductListResponse {
  /**
   * Paging information
   */
  export interface Paging {
    /**
     * Max number of items per page
     */
    limit: number;

    /**
     * Current result set page offset
     */
    offset: number;

    /**
     * Total number of items available
     */
    total: number;
  }

  /**
   * Warehouse product data
   */
  export interface Result {
    /**
     * Product ID
     */
    id?: number;

    /**
     * Currency
     */
    currency?: string;

    /**
     * Image URL of product
     */
    image_url?: string;

    /**
     * Product name
     */
    name?: string;

    /**
     * Retail price of product
     */
    retail_price?: number;

    /**
     * Product status:
     *
     * **created** - product request created,
     *
     * **active** - product request approved
     *
     * **suspended** - product suspended
     *
     * **declined** - product request declined
     *
     * **draft** - product created as a draft
     */
    status?: 'created' | 'active' | 'suspended' | 'declined' | 'draft';

    /**
     * Array of product variants
     */
    variants?: Array<Result.Variant>;
  }

  export namespace Result {
    /**
     * Warehouse product variant data
     */
    export interface Variant {
      /**
       * Product variant ID
       */
      id?: number;

      /**
       * Height of product variant
       */
      height?: number;

      /**
       * Image URL of product variant
       */
      image_url?: string;

      /**
       * Length of product variant
       */
      length?: number;

      /**
       * Name of product variant
       */
      name?: string;

      /**
       * Total available quantity of product variant in our stock
       */
      quantity?: number;

      /**
       * Retail price of product variant
       */
      retail_price?: number;

      /**
       * SKU of product variant
       */
      sku?: string;

      /**
       * Product variant quantities in the warehouse stock
       */
      stock_locations?: Array<Variant.StockLocation>;

      /**
       * Weight of product variant
       */
      weight?: number;

      /**
       * Width of product variant
       */
      width?: number;
    }

    export namespace Variant {
      export interface StockLocation {
        /**
         * Available quantity of product variant in our stock
         */
        available?: number;

        /**
         * Name of the warehouse facility
         */
        facility?: string;

        /**
         * Total quantity of product variant in our stock
         */
        stocked?: number;
      }
    }
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
   * Query param: Filter by partial or full product name
   */
  query?: string;

  /**
   * Header param: Whether the pagination behavior should be forced. The response
   * will be paginated if the value is `true` or `1`.
   */
  'X-PF-Force-Pagination'?: boolean | number;

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

export declare namespace Products {
  export {
    type ProductRetrieveResponse as ProductRetrieveResponse,
    type ProductListResponse as ProductListResponse,
    type ProductRetrieveParams as ProductRetrieveParams,
    type ProductListParams as ProductListParams,
  };
}
