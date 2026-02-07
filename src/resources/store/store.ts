// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as ProductsAPI from './products';
import {
  ProductCreateParams,
  ProductCreateResponse,
  ProductCreateVariantParams,
  ProductCreateVariantResponse,
  ProductDeleteParams,
  ProductDeleteResponse,
  ProductListParams,
  ProductListResponse,
  ProductRetrieveParams,
  ProductRetrieveResponse,
  ProductUpdateParams,
  ProductUpdateResponse,
  Products,
} from './products';
import * as VariantsAPI from './variants';
import {
  VariantDeleteParams,
  VariantDeleteResponse,
  VariantRetrieveParams,
  VariantRetrieveResponse,
  VariantUpdateParams,
  VariantUpdateResponse,
  Variants,
} from './variants';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Store extends APIResource {
  products: ProductsAPI.Products = new ProductsAPI.Products(this._client);
  variants: VariantsAPI.Variants = new VariantsAPI.Variants(this._client);

  /**
   * Get basic information about a store based on provided ID
   *
   * @example
   * ```ts
   * const store = await client.store.retrieve(0);
   * ```
   */
  retrieve(id: number, options?: RequestOptions): APIPromise<StoreRetrieveResponse> {
    return this._client.get(path`/stores/${id}`, { ...options, __security: {} });
  }

  /**
   * Get basic information about stores depending on the token access level
   *
   * @example
   * ```ts
   * const stores = await client.store.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<StoreListResponse> {
    return this._client.get('/stores', { ...options, __security: {} });
  }

  /**
   * Modifies packing slip information of the currently authorized Printful store.
   *
   * @example
   * ```ts
   * const response = await client.store.updatePackingSlip();
   * ```
   */
  updatePackingSlip(
    params: StoreUpdatePackingSlipParams,
    options?: RequestOptions,
  ): APIPromise<StoreUpdatePackingSlipResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.post('/store/packing-slip', {
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

export interface StoreRetrieveResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: StoreRetrieveResponse.Result;
}

export namespace StoreRetrieveResponse {
  export interface Result {
    /**
     * Store ID
     */
    id?: number;

    /**
     * Store name
     */
    name?: string;

    /**
     * Store type
     */
    type?: string;
  }
}

export interface StoreListResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Paging information
   */
  paging?: Shared.Paging;

  result?: Array<StoreListResponse.Result>;
}

export namespace StoreListResponse {
  export interface Result {
    /**
     * Store ID
     */
    id?: number;

    /**
     * Store name
     */
    name?: string;

    /**
     * Store type
     */
    type?: string;
  }
}

export interface StoreUpdatePackingSlipResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: StoreUpdatePackingSlipResponse.Result;
}

export namespace StoreUpdatePackingSlipResponse {
  export interface Result {
    /**
     * Custom packing slip for this order. Example of a packing slip with explained
     * fields can be found [here](#packing-slip).
     */
    packing_slip?: Shared.PackingSlip;
  }
}

export interface StoreUpdatePackingSlipParams {
  /**
   * Body param: Your own Order ID that will be printed instead of Printful's Order
   * ID
   */
  custom_order_id?: string;

  /**
   * Body param: Customer service email
   */
  email?: string;

  /**
   * Body param: URL address to a sticker we will put on a package. The provided
   * image is converted to grayscale/1-bit monochrome image.
   */
  logo_url?: string;

  /**
   * Body param: Custom packing slip message
   */
  message?: string;

  /**
   * Body param: Customer service phone
   */
  phone?: string;

  /**
   * Body param: Store name override for the return address
   */
  store_name?: string;

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

Store.Products = Products;
Store.Variants = Variants;

export declare namespace Store {
  export {
    type StoreRetrieveResponse as StoreRetrieveResponse,
    type StoreListResponse as StoreListResponse,
    type StoreUpdatePackingSlipResponse as StoreUpdatePackingSlipResponse,
    type StoreUpdatePackingSlipParams as StoreUpdatePackingSlipParams,
  };

  export {
    Products as Products,
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

  export {
    Variants as Variants,
    type VariantRetrieveResponse as VariantRetrieveResponse,
    type VariantUpdateResponse as VariantUpdateResponse,
    type VariantDeleteResponse as VariantDeleteResponse,
    type VariantRetrieveParams as VariantRetrieveParams,
    type VariantUpdateParams as VariantUpdateParams,
    type VariantDeleteParams as VariantDeleteParams,
  };
}
