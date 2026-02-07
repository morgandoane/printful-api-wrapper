// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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
    sync_product?: Result.SyncProduct;

    /**
     * Array of Sync Variants available for the selected product
     */
    sync_variants?: Array<Result.SyncVariant>;
  }

  export namespace Result {
    /**
     * Information about the SyncProduct
     */
    export interface SyncProduct {
      /**
       * Product name
       */
      name: string;

      /**
       * SyncProduct ID
       */
      id?: number;

      /**
       * Product ID from the Ecommerce platform
       */
      external_id?: string;

      /**
       * Indicates if this Sync Product is ignored
       */
      is_ignored?: boolean;

      /**
       * Number of synced Sync Variants belonging to this product
       */
      synced?: number;

      /**
       * Thumbnail image for the product
       */
      thumbnail_url?: string;

      /**
       * Total number of Sync Variants belonging to this product
       */
      variants?: number;
    }

    /**
     * Information about the SyncVariant
     */
    export interface SyncVariant {
      /**
       * Sync Variant ID
       */
      id?: number;

      /**
       * Indicates the status of the Sync Variant.
       */
      availability_status?: 'active' | 'discontinued' | 'out_of_stock' | 'temporary_out_of_stock';

      /**
       * The color of the associated Catalog Variant
       */
      color?: string | null;

      /**
       * Currency in which prices are returned
       */
      currency?: string;

      /**
       * Variant ID from the Ecommerce platform
       */
      external_id?: string;

      /**
       * Array of attached printfiles / preview images
       */
      files?: Array<SyncVariant.File>;

      /**
       * Indicates if this Sync Variant is ignored
       */
      is_ignored?: boolean;

      /**
       * Printful Variant catalog category ID
       */
      main_category_id?: number | null;

      /**
       * Sync Variant name
       */
      name?: string;

      /**
       * Array of additional options for the configured product/variant
       * [See examples](#tag/Common/Options)
       */
      options?: Array<SyncVariant.Option>;

      /**
       * Short information about the Printful Product and Variant
       */
      product?: SyncVariant.Product;

      /**
       * Retail price that this item is sold for
       */
      retail_price?: string;

      /**
       * The size of the associated Catalog Variant
       */
      size?: string | null;

      /**
       * SKU of this Sync Variant
       */
      sku?: string | null;

      /**
       * Sync Product ID that this variant belongs to
       */
      sync_product_id?: number;

      /**
       * Indicates if this Sync Variant is properly linked with Printful product
       */
      synced?: boolean;

      /**
       * Printful Variant ID that this Sync Variant is synced to
       */
      variant_id?: number;

      /**
       * Warehousing product ID. If the sync variant is connected with a warehousing
       * item, this is the ID of corresponding warehouse product.
       */
      warehouse_product_id?: number | null;

      /**
       * Warehousing variant ID. If the sync variant is connected with a warehousing
       * item, this is its ID.
       */
      warehouse_product_variant_id?: number | null;
    }

    export namespace SyncVariant {
      export interface File {
        /**
         * Source URL where the file is downloaded from. The use of .ai .psd and .tiff
         * files have been depreciated, if your application uses these file types or
         * accepts these types from users you will need to add validation.
         */
        url: string;

        /**
         * File ID
         */
        id?: number;

        /**
         * File creation timestamp
         */
        created?: number;

        /**
         * Resolution DPI. **Note:** for vector files this may be indicated as only 72dpi,
         * but it doesn't affect print quality since the vector files are resolution
         * independent.
         */
        dpi?: number;

        /**
         * File name
         */
        filename?: string;

        /**
         * MD5 checksum of the file
         */
        hash?: string;

        /**
         * Height in pixels
         */
        height?: number;

        /**
         * Whether it is a temporary printfile.
         */
        is_temporary?: boolean;

        /**
         * MIME type of the file
         */
        mime_type?: string;

        /**
         * Array of additional options for this file [See examples](#tag/Common/Options)
         */
        options?: Array<File.Option>;

        /**
         * Medium preview image URL
         */
        preview_url?: string;

        /**
         * Size in bytes
         */
        size?: number;

        /**
         * File processing status: **ok** - file was processed successfuly **waiting** -
         * file is being processed **failed** - file failed to be processed
         */
        status?: string;

        /**
         * Stitch count tier see
         * https://help.printful.com/hc/en-us/articles/4909652626204-What-s-the-new-large-embroidery-pricing-
         */
        stitch_count_tier?: string | null;

        /**
         * Small thumbnail URL
         */
        thumbnail_url?: string;

        /**
         * Role of the file
         */
        type?: string;

        /**
         * Show file in the Printfile Library (default true)
         */
        visible?: boolean;

        /**
         * Width in pixels
         */
        width?: number;
      }

      export namespace File {
        /**
         * File option
         */
        export interface Option {
          /**
           * Option id
           */
          id: string;

          /**
           * Option value
           */
          value: string;
        }
      }

      /**
       * Additional options for the configured product/variant
       */
      export interface Option {
        /**
         * Option id
         */
        id: string;

        /**
         * Option value
         */
        value: string;
      }

      /**
       * Short information about the Printful Product and Variant
       */
      export interface Product {
        /**
         * URL of a sample image for this variant
         */
        image?: string;

        /**
         * Display name of this variant
         */
        name?: string;

        /**
         * Product ID of this variant
         */
        product_id?: number;

        /**
         * Variant ID
         */
        variant_id?: number;
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
   * Array of SyncProduct
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
   * Information about the SyncProduct
   */
  export interface Result {
    /**
     * Product name
     */
    name: string;

    /**
     * SyncProduct ID
     */
    id?: number;

    /**
     * Product ID from the Ecommerce platform
     */
    external_id?: string;

    /**
     * Indicates if this Sync Product is ignored
     */
    is_ignored?: boolean;

    /**
     * Number of synced Sync Variants belonging to this product
     */
    synced?: number;

    /**
     * Thumbnail image for the product
     */
    thumbnail_url?: string;

    /**
     * Total number of Sync Variants belonging to this product
     */
    variants?: number;
  }
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
    sync_product?: Result.SyncProduct;

    /**
     * Array of Sync Variants available for the selected product
     */
    sync_variants?: Array<Result.SyncVariant>;
  }

  export namespace Result {
    /**
     * Information about the SyncProduct
     */
    export interface SyncProduct {
      /**
       * Product name
       */
      name: string;

      /**
       * SyncProduct ID
       */
      id?: number;

      /**
       * Product ID from the Ecommerce platform
       */
      external_id?: string;

      /**
       * Indicates if this Sync Product is ignored
       */
      is_ignored?: boolean;

      /**
       * Number of synced Sync Variants belonging to this product
       */
      synced?: number;

      /**
       * Thumbnail image for the product
       */
      thumbnail_url?: string;

      /**
       * Total number of Sync Variants belonging to this product
       */
      variants?: number;
    }

    /**
     * Information about the SyncVariant
     */
    export interface SyncVariant {
      /**
       * Sync Variant ID
       */
      id?: number;

      /**
       * Indicates the status of the Sync Variant.
       */
      availability_status?: 'active' | 'discontinued' | 'out_of_stock' | 'temporary_out_of_stock';

      /**
       * The color of the associated Catalog Variant
       */
      color?: string | null;

      /**
       * Currency in which prices are returned
       */
      currency?: string;

      /**
       * Variant ID from the Ecommerce platform
       */
      external_id?: string;

      /**
       * Array of attached printfiles / preview images
       */
      files?: Array<SyncVariant.File>;

      /**
       * Indicates if this Sync Variant is ignored
       */
      is_ignored?: boolean;

      /**
       * Printful Variant catalog category ID
       */
      main_category_id?: number | null;

      /**
       * Sync Variant name
       */
      name?: string;

      /**
       * Array of additional options for the configured product/variant
       * [See examples](#tag/Common/Options)
       */
      options?: Array<SyncVariant.Option>;

      /**
       * Short information about the Printful Product and Variant
       */
      product?: SyncVariant.Product;

      /**
       * Retail price that this item is sold for
       */
      retail_price?: string;

      /**
       * The size of the associated Catalog Variant
       */
      size?: string | null;

      /**
       * SKU of this Sync Variant
       */
      sku?: string | null;

      /**
       * Sync Product ID that this variant belongs to
       */
      sync_product_id?: number;

      /**
       * Indicates if this Sync Variant is properly linked with Printful product
       */
      synced?: boolean;

      /**
       * Printful Variant ID that this Sync Variant is synced to
       */
      variant_id?: number;

      /**
       * Warehousing product ID. If the sync variant is connected with a warehousing
       * item, this is the ID of corresponding warehouse product.
       */
      warehouse_product_id?: number | null;

      /**
       * Warehousing variant ID. If the sync variant is connected with a warehousing
       * item, this is its ID.
       */
      warehouse_product_variant_id?: number | null;
    }

    export namespace SyncVariant {
      export interface File {
        /**
         * Source URL where the file is downloaded from. The use of .ai .psd and .tiff
         * files have been depreciated, if your application uses these file types or
         * accepts these types from users you will need to add validation.
         */
        url: string;

        /**
         * File ID
         */
        id?: number;

        /**
         * File creation timestamp
         */
        created?: number;

        /**
         * Resolution DPI. **Note:** for vector files this may be indicated as only 72dpi,
         * but it doesn't affect print quality since the vector files are resolution
         * independent.
         */
        dpi?: number;

        /**
         * File name
         */
        filename?: string;

        /**
         * MD5 checksum of the file
         */
        hash?: string;

        /**
         * Height in pixels
         */
        height?: number;

        /**
         * Whether it is a temporary printfile.
         */
        is_temporary?: boolean;

        /**
         * MIME type of the file
         */
        mime_type?: string;

        /**
         * Array of additional options for this file [See examples](#tag/Common/Options)
         */
        options?: Array<File.Option>;

        /**
         * Medium preview image URL
         */
        preview_url?: string;

        /**
         * Size in bytes
         */
        size?: number;

        /**
         * File processing status: **ok** - file was processed successfuly **waiting** -
         * file is being processed **failed** - file failed to be processed
         */
        status?: string;

        /**
         * Stitch count tier see
         * https://help.printful.com/hc/en-us/articles/4909652626204-What-s-the-new-large-embroidery-pricing-
         */
        stitch_count_tier?: string | null;

        /**
         * Small thumbnail URL
         */
        thumbnail_url?: string;

        /**
         * Role of the file
         */
        type?: string;

        /**
         * Show file in the Printfile Library (default true)
         */
        visible?: boolean;

        /**
         * Width in pixels
         */
        width?: number;
      }

      export namespace File {
        /**
         * File option
         */
        export interface Option {
          /**
           * Option id
           */
          id: string;

          /**
           * Option value
           */
          value: string;
        }
      }

      /**
       * Additional options for the configured product/variant
       */
      export interface Option {
        /**
         * Option id
         */
        id: string;

        /**
         * Option value
         */
        value: string;
      }

      /**
       * Short information about the Printful Product and Variant
       */
      export interface Product {
        /**
         * URL of a sample image for this variant
         */
        image?: string;

        /**
         * Display name of this variant
         */
        name?: string;

        /**
         * Product ID of this variant
         */
        product_id?: number;

        /**
         * Variant ID
         */
        variant_id?: number;
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
