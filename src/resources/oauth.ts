// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class OAuth extends APIResource {
  /**
   * Returns a list of scopes associated with the token
   */
  listScopes(options?: RequestOptions): APIPromise<OAuthListScopesResponse> {
    return this._client.get('/oauth/scopes', { ...options, __security: {} });
  }
}

export interface OAuthListScopesResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: OAuthListScopesResponse.Result;
}

export namespace OAuthListScopesResponse {
  export interface Result {
    scopes?: Array<Result.Scope>;
  }

  export namespace Result {
    export interface Scope {
      display_name?: string;

      scope?: string;
    }
  }
}

export declare namespace OAuth {
  export { type OAuthListScopesResponse as OAuthListScopesResponse };
}
