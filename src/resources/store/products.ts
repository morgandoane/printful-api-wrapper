// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * **The Products API resource lets you create, modify and delete products in a Printful store based on the Manual orders /
 * API platform** (you can create such store by going to the Stores section at your Printful dashboard.)
 *
 * **Important**: Jewelry products are not supported via API.
 *
 * <div class="alert alert-info" style="word-wrap: break-word; padding: 16px; border-radius: 0; cursor: default; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">
 * To configure products and variants at a Printful store based on Shopify, WooCommerce or another supported integration platform, please see <a href="#tag/Ecommerce-Platform-Sync-API">Ecommerce Platform Sync API</a>.
 * </div>
 *
 * To manage Warehouse products, please see <a href="#tag/Warehouse-Products-API">Warehouse Products API</a>.
 *
 * ### The basics
 *
 * Each product in your Printful store must contain one or multiple variants (imagine multiple sizes or colors of the same
 * t-shirt design). Furthermore, for each variant, you have to specify both a blank product variant from our Printful
 * Catalog and a print file. These two properties together with price and External ID (more on that later) will allow the
 * variant to be purchasable. Please, see the following sections for more details. Finally, please note that for technical
 * reasons a product in your Printful store is called a Sync Product and a variant of that product is called a Sync Variant. The maximum supported amount of Sync Variants a Sync Product can have is 100.
 *
 * ### Assigning a blank product variant
 * Printful has a substantial catalog of blank products and variants, where each variant (e.g. size and color combination
 * of a particular product) has a unique ID, which we call variant_id. You can browse through the catalog via Catalog API
 * to find a specific variant_id. Moreover, when creating a Sync Product at your Printful store, each of its Sync Variants
 * must be associated with a variant_id from the Printful Catalog. Furthermore, to assign a specific variant_id to a
 * specific Sync Variant, simply add it to the HTTP request body (see examples at the specific endpoint).
 *
 * ### Assigning a single print file
 * There are two ways to assign a print file to a Sync Variant. One is to specify the File ID if the file already exists in the File library of the authorized store;
 *
 * ### Limitations
 *
 * **Important**: The Products API is not intended and will never support creating and managing products in external platforms such as Shopify, WooCommerce and others. For managing your products from external platforms please refer to [Ecommerce Platform Sync API](#tag/Ecommerce-Platform-Sync-API)
 *
 * ```
 * {
 *     ...
 *     "files": [
 *         {
 *             "id": 12345
 *         }
 *     ],
 *     ...
 * }
 * ```
 * The second and most convenient method is to specify the file URL. If a file with the same URL already exists, it will be reused.
 *
 * ```
 * {
 *     ...
 *     "files": [
 *         {
 *             "url": "http://example.com/t-shirts/123/front.pdf"
 *         }
 *     ],
 *     ...
 * }
 * ```
 * Moreover, each Sync Variant has to be linked with one or multiple print files. The available file types for each product are available from the Printful Catalogue API. You can add one file for each type by specifying the type attribute. For the
 * default type, this attribute can be skipped.
 *
 * ```
 * ...
 * "files":[
 *     {
 *         "type": "default",
 *         "url": "http://example.com/t-shirts/123/front.pdf"
 *     },
 *     {
 *         "type": "back"
 *         "url": "http://example.com/t-shirts/123/back.pdf"
 *     }
 * ],
 * ...
 * ```
 * Remember that using additional files can increase the price of the item.
 *
 * ### External ID
 * When creating a Sync Product and/or Sync Variant you can specify an External ID, which you can then use as a reference when managing or even ordering the specific Sync Product or Sync Variant. In particular, when requesting a specific Sync Product
 * and Sync Variant, you can use either the internal Printful ID or your External ID (prefixed with an @ symbol) at the request URL.
 *
 * ### Native inside label
 * Printful previously allowed customers to upload a fully customized inside label. Since these labels had to contain specific information about fabric composition, manufacturing, etc. to meet the legal requirements, users usually encountered issues to
 * get their labels printed.
 *
 * Inside labels are printed on the inside of the garment and require the removal of the original manufacturer's tag. They're only available for apparel with tear-away labels. An inside label must include the country of manufacturing origin, original
 * garment size, and material information. To use our native label template you only need to upload a graphic (such as your brand's logo). The mandatory content will be generated and placed automatically.
 *
 * ```
 * ...
 * "files":[
 *         {
 *             "type": "label_inside",
 *             "url": "http://example.com/logo/123/image.jpg",
 *             "options": [{
 *                 "id": "template_type",
 *                 "value": "native"
 *             }]
 *         },
 * ],
 * ...
 * ```
 * Printful previously supported fully customized inside labels. These have now been deprecated. The ability to create orders with fully customized inside labels has been limited to only users who were actively using them in their stores before April
 * 2020. This feature is no longer accessible to new users.
 *
 * [See examples](#tag/Examples/Products-API-examples)
 */
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
