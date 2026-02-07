// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

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
