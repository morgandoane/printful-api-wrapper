// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Tax extends APIResource {
  /**
   * Calculates sales tax rate for given address if required.
   *
   * <div class="alert alert-info">
   *   ⚠️ <strong>Important – <tt>/tax/rates</tt> endpoint sunset</strong>
   *   <p>Since May 2023, the POST <tt>/tax/rates</tt> endpoint is no longer maintained and may return inaccurate results.</p>
   *   <p>On <strong>July 29, 2025</strong>, we started the sunset process. The rate limit is being reduced by 10 RPM each week (starting with 60) until it reaches 0 on <strong>September 8, 2025</strong>, at which point the endpoint will be removed entirely.</p>
   *   <p>There is no replacement endpoint in the Printful API for retrieving standalone tax rates. For accurate tax information, please use official government sources or external tax calculation providers.</p>
   *   <p>If you require the total order cost including taxes, use the order creation or estimation endpoints.</p>
   * </div>
   *
   * @deprecated
   */
  calculateRate(
    body: TaxCalculateRateParams,
    options?: RequestOptions,
  ): APIPromise<TaxCalculateRateResponse> {
    return this._client.post('/tax/rates', { body, ...options });
  }

  /**
   * Retrieve state list that requires sales tax calculation
   */
  listCountries(options?: RequestOptions): APIPromise<TaxListCountriesResponse> {
    return this._client.get('/tax/countries', options);
  }
}

export interface TaxCalculateRateResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Tax address information
   */
  result?: TaxCalculateRateResponse.Result;
}

export namespace TaxCalculateRateResponse {
  /**
   * Tax address information
   */
  export interface Result {
    /**
     * Tax rate
     */
    rate?: number;

    /**
     * Whether sales tax is required for the given address
     */
    required?: boolean;

    /**
     * Whether shipping is taxable
     */
    shipping_taxable?: boolean;
  }
}

export interface TaxListCountriesResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: Array<TaxListCountriesResponse.Result>;
}

export namespace TaxListCountriesResponse {
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

      /**
       * Whether shipping is taxable in this state
       */
      shipping_taxable?: boolean;
    }
  }
}

export interface TaxCalculateRateParams {
  /**
   * Recipient address information
   */
  recipient: TaxCalculateRateParams.Recipient;
}

export namespace TaxCalculateRateParams {
  /**
   * Recipient address information
   */
  export interface Recipient {
    /**
     * City
     */
    city: string;

    /**
     * Country code
     */
    country_code: string;

    /**
     * State code
     */
    state_code: string;

    /**
     * ZIP or postal code
     */
    zip: string;
  }
}

export declare namespace Tax {
  export {
    type TaxCalculateRateResponse as TaxCalculateRateResponse,
    type TaxListCountriesResponse as TaxListCountriesResponse,
    type TaxCalculateRateParams as TaxCalculateRateParams,
  };
}
