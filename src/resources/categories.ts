// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Categories extends APIResource {
  /**
   * Returns information about a specific category.
   */
  retrieve(id: number, options?: RequestOptions): APIPromise<CategoryRetrieveResponse> {
    return this._client.get(path`/categories/${id}`, options);
  }

  /**
   * Returns list of Catalog Categories available in the Printful
   */
  list(options?: RequestOptions): APIPromise<CategoryListResponse> {
    return this._client.get('/categories', options);
  }
}

export interface CategoryRetrieveResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the Category
   */
  result?: CategoryRetrieveResponse.Result;
}

export namespace CategoryRetrieveResponse {
  /**
   * Information about the Category
   */
  export interface Result {
    /**
     * Category ID
     */
    id?: number;

    /**
     * The URL of the Category image
     */
    image_url?: string;

    /**
     * ID of the parent Category. If there is no parent Category, 0 is returned.
     */
    parent_id?: number;

    /**
     * The size of the category image
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * Category title
     */
    title?: string;
  }
}

export interface CategoryListResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: Array<CategoryListResponse.Result>;
}

export namespace CategoryListResponse {
  /**
   * Information about the Category
   */
  export interface Result {
    /**
     * Category ID
     */
    id?: number;

    /**
     * The URL of the Category image
     */
    image_url?: string;

    /**
     * ID of the parent Category. If there is no parent Category, 0 is returned.
     */
    parent_id?: number;

    /**
     * The size of the category image
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * Category title
     */
    title?: string;
  }
}

export declare namespace Categories {
  export {
    type CategoryRetrieveResponse as CategoryRetrieveResponse,
    type CategoryListResponse as CategoryListResponse,
  };
}
