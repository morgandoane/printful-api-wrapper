// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Webhooks extends APIResource {
  /**
   * Use this endpoint to enable a webhook URL for a store and select webhook event
   * types that will be sent to this URL.
   *
   * Note that only one webhook URL can be active for a store, so calling this method
   * disables all existing webhook configuration.
   *
   * Setting up the [Stock updated](#operation/stockUpdated) webhook requires passing
   * IDs for products that need to be monitored for changes. Stock update webhook
   * will only include information for specified products. These product IDs need to
   * be set up using the params property.
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.create({
   *   types: ['package_shipped', 'stock_updated'],
   *   url: '​https://www.example.com/printful/webhook',
   * });
   * ```
   */
  create(params: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.post('/webhooks', {
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
   * Returns configured webhook URL and list of webhook event types enabled for the
   * store
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.retrieve();
   * ```
   */
  retrieve(
    params: WebhookRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookRetrieveResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.get('/webhooks', {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Removes the webhook URL and all event types from the store.
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.delete();
   * ```
   */
  delete(
    params: WebhookDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookDeleteResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.delete('/webhooks', {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }
}

export interface WebhookInfo {
  params?: { [key: string]: unknown };

  /**
   * Array of enabled webhook event types
   */
  types?: Array<string>;

  /**
   * Webhook URL that will receive store's event notifications
   */
  url?: string;
}

export interface WebhookCreateResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: WebhookInfo;
}

export interface WebhookRetrieveResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: WebhookInfo;
}

export interface WebhookDeleteResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: WebhookInfo;
}

export interface WebhookCreateParams {
  /**
   * Body param: Array of enabled webhook event types
   */
  types: Array<string>;

  /**
   * Body param: Webhook URL that will receive store's event notifications
   */
  url: string;

  /**
   * Body param
   */
  params?: { [key: string]: unknown };

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

export interface WebhookRetrieveParams {
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

export interface WebhookDeleteParams {
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

export declare namespace Webhooks {
  export {
    type WebhookInfo as WebhookInfo,
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookRetrieveParams as WebhookRetrieveParams,
    type WebhookDeleteParams as WebhookDeleteParams,
  };
}
