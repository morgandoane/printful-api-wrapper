// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

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
    sync_product?: Result.SyncProduct;

    /**
     * Information about the SyncVariant
     */
    sync_variant?: Result.SyncVariant;
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
    sync_product?: Result.SyncProduct;

    /**
     * Information about the SyncVariant
     */
    sync_variant?: Result.SyncVariant;
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
    sync_product?: Result.SyncProduct;

    /**
     * Information about the SyncVariant
     */
    sync_variant?: Result.SyncVariant;
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
  files?: Array<VariantUpdateParams.File>;

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
  options?: Array<VariantUpdateParams.Option>;

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

export namespace VariantUpdateParams {
  /**
   * Information about the File
   */
  export interface File {
    /**
     * Source URL where the file is downloaded from. The use of .ai .psd and .tiff
     * files have been depreciated, if your application uses these file types or
     * accepts these types from users you will need to add validation.
     */
    url: string;

    /**
     * File name
     */
    filename?: string;

    /**
     * Array of additional options for this file [See examples](#tag/Common/Options)
     */
    options?: Array<File.Option>;

    /**
     * Role of the file
     */
    type?: string;

    /**
     * Show file in the Printfile Library (default true)
     */
    visible?: boolean;
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
