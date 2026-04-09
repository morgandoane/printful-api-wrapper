// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * To create an order, you have to use country and state codes to specify the recipient address. Both country code and state code are mandatory for orders to the USA, Canada and Australia. For other countries only the country code is needed to create an order.
 *
 * Country codes are based on the ISO 3166-1 alpha-2 standard and are two letters long.
 *
 * State codes are based on the ISO 3166-2 standard by omitting the country code part of the code and are used only for the USA, Canada, Japan and Australia.
 *
 * All state/country codes that Printful accepts can be listed by this API.
 */
export class Countries extends APIResource {
  /**
   * Returns list of countries and states that are accepted by the Printful.
   */
  list(options?: RequestOptions): APIPromise<CountryListResponse> {
    return this._client.get('/countries', options);
  }
}

export interface CountryListResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: Array<CountryListResponse.Result>;
}

export namespace CountryListResponse {
  export interface Result {
    /**
     * Country code
     */
    code?: string;

    /**
     * Country name
     */
    name?: string;

    region?: string;

    states?: Array<Result.State> | null;
  }

  export namespace Result {
    export interface State {
      /**
       * State code
       */
      code?: string;

      /**
       * State name
       */
      name?: string;
    }
  }
}

export declare namespace Countries {
  export { type CountryListResponse as CountryListResponse };
}
