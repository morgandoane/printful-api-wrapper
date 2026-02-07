// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
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
  result?: Shared.SyncVariant;
}

export interface VariantUpdateResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the SyncVariant
   */
  result?: Shared.SyncVariant;
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
   * Body param: Sync Variant ID. Please specify the IDs of all Sync Variants you
   * wish to keep.
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
  export interface File extends Shared.File {}
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
