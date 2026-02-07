// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Variants extends APIResource {
  /**
   * Get information about a single Sync Variant.
   *
   * @example
   * ```ts
   * const variant = await client.store.variants.retrieve(0);
   * ```
   */
  retrieve(
    id: number | string,
    params: VariantRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VariantRetrieveResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.get(path`/store/variants/${id}`, {
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
   * [See examples](#tag/Examples/Products-API-examples/Modify-a-Sync-Variant)
   *
   * @example
   * ```ts
   * const variant = await client.store.variants.update(0);
   * ```
   */
  update(
    pathID: number | string,
    params: VariantUpdateParams,
    options?: RequestOptions,
  ): APIPromise<VariantUpdateResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.put(path`/store/variants/${pathID}`, {
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
   * Deletes a single Sync Variant.
   *
   * @example
   * ```ts
   * const variant = await client.store.variants.delete(0);
   * ```
   */
  delete(
    id: number | string,
    params: VariantDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VariantDeleteResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.delete(path`/store/variants/${id}`, {
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

  /**
   * Information about the SyncVariant
   */
  result?: VariantRetrieveResponse.Result;
}

export namespace VariantRetrieveResponse {
  /**
   * Information about the SyncVariant
   */
  export interface Result {
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
    files?: Array<Result.File>;

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
    options?: Array<Result.Option>;

    /**
     * Short information about the Printful Product and Variant
     */
    product?: Result.Product;

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

  export namespace Result {
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

export interface VariantUpdateResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the SyncVariant
   */
  result?: VariantUpdateResponse.Result;
}

export namespace VariantUpdateResponse {
  /**
   * Information about the SyncVariant
   */
  export interface Result {
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
    files?: Array<Result.File>;

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
    options?: Array<Result.Option>;

    /**
     * Short information about the Printful Product and Variant
     */
    product?: Result.Product;

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

  export namespace Result {
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

export interface VariantDeleteResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: Array<unknown>;
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
   * Body param: Sync Variant ID
   */
  body_id?: number;

  /**
   * Body param: Indicates the status of the Sync Variant.
   */
  availability_status?: 'active' | 'discontinued' | 'out_of_stock' | 'temporary_out_of_stock';

  /**
   * Body param: Variant ID from the Ecommerce platform
   */
  external_id?: string;

  /**
   * Body param: Array of attached printfiles / preview images
   */
  files?: Array<VariantUpdateParams.File>;

  /**
   * Body param: Indicates if this Sync Variant is ignored
   */
  is_ignored?: boolean;

  /**
   * Body param: Array of additional options for the configured product/variant
   * [See examples](#tag/Common/Options)
   */
  options?: Array<VariantUpdateParams.Option>;

  /**
   * Body param: Short information about the Printful Product and Variant
   */
  product?: VariantUpdateParams.Product;

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

export declare namespace Variants {
  export {
    type VariantRetrieveResponse as VariantRetrieveResponse,
    type VariantUpdateResponse as VariantUpdateResponse,
    type VariantDeleteResponse as VariantDeleteResponse,
    type VariantRetrieveParams as VariantRetrieveParams,
    type VariantUpdateParams as VariantUpdateParams,
    type VariantDeleteParams as VariantDeleteParams,
  };
}
