// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
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
    sync_product?: Shared.SyncProduct;

    /**
     * Information about the SyncVariant
     */
    sync_variant?: Shared.SyncVariant;
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
    sync_product?: Shared.SyncProduct;

    /**
     * Information about the SyncVariant
     */
    sync_variant?: Shared.SyncVariant;
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
    sync_product?: Shared.SyncProduct;

    /**
     * Information about the SyncVariant
     */
    sync_variant?: Shared.SyncVariant;
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
  files?: Array<Shared.File>;

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
  options?: Array<Shared.ItemOption>;

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
