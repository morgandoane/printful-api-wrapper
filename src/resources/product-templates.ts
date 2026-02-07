// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ProductTemplates extends APIResource {
  /**
   * Get information about a single product template
   */
  retrieve(id: number | string, options?: RequestOptions): APIPromise<ProductTemplateRetrieveResponse> {
    return this._client.get(path`/product-templates/${id}`, { ...options, __security: {} });
  }

  /**
   * Returns a list of templates.
   */
  list(
    query: ProductTemplateListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductTemplateListResponse> {
    return this._client.get('/product-templates', { query, ...options, __security: {} });
  }

  /**
   * Delete product template by ID or External Product ID
   */
  delete(id: number | string, options?: RequestOptions): APIPromise<ProductTemplateDeleteResponse> {
    return this._client.delete(path`/product-templates/${id}`, { ...options, __security: {} });
  }
}

export interface ProductTemplateRetrieveResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the template
   */
  result?: ProductTemplateRetrieveResponse.Result;
}

export namespace ProductTemplateRetrieveResponse {
  /**
   * Information about the template
   */
  export interface Result {
    id?: number;

    available_variant_ids?: Array<number>;

    colors?: Array<Result.Color>;

    created_at?: number;

    external_product_id?: string;

    mockup_file_url?: string;

    option_data?: Array<Result.OptionData>;

    placement_option_data?: Array<Result.PlacementOptionData>;

    placements?: Array<Result.Placement>;

    product_id?: number;

    sizes?: Array<string>;

    title?: string;

    updated_at?: number;
  }

  export namespace Result {
    export interface Color {
      color_codes?: Array<unknown>;

      color_name?: string;
    }

    export interface OptionData {
      id?: string;

      value?: Array<string>;
    }

    export interface PlacementOptionData {
      id?: string;

      options?: Array<PlacementOptionData.Option>;
    }

    export namespace PlacementOptionData {
      export interface Option {
        id?: string;

        value?: unknown;
      }
    }

    export interface Placement {
      display_name?: string;

      placement?: string;

      technique_display_name?: string;

      technique_key?: string;
    }
  }
}

export interface ProductTemplateListResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Paging information
   */
  paging?: ProductTemplateListResponse.Paging;

  /**
   * Information about the template
   */
  result?: ProductTemplateListResponse.Result;
}

export namespace ProductTemplateListResponse {
  /**
   * Paging information
   */
  export interface Paging {
    /**
     * Max number of items per page
     */
    limit: number;

    /**
     * Current result set page offset
     */
    offset: number;

    /**
     * Total number of items available
     */
    total: number;
  }

  /**
   * Information about the template
   */
  export interface Result {
    items?: Array<Result.Item>;
  }

  export namespace Result {
    /**
     * Information about the template
     */
    export interface Item {
      id?: number;

      available_variant_ids?: Array<number>;

      colors?: Array<Item.Color>;

      created_at?: number;

      external_product_id?: string;

      mockup_file_url?: string;

      option_data?: Array<Item.OptionData>;

      placement_option_data?: Array<Item.PlacementOptionData>;

      placements?: Array<Item.Placement>;

      product_id?: number;

      sizes?: Array<string>;

      title?: string;

      updated_at?: number;
    }

    export namespace Item {
      export interface Color {
        color_codes?: Array<unknown>;

        color_name?: string;
      }

      export interface OptionData {
        id?: string;

        value?: Array<string>;
      }

      export interface PlacementOptionData {
        id?: string;

        options?: Array<PlacementOptionData.Option>;
      }

      export namespace PlacementOptionData {
        export interface Option {
          id?: string;

          value?: unknown;
        }
      }

      export interface Placement {
        display_name?: string;

        placement?: string;

        technique_display_name?: string;

        technique_key?: string;
      }
    }
  }
}

export interface ProductTemplateDeleteResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: ProductTemplateDeleteResponse.Result;
}

export namespace ProductTemplateDeleteResponse {
  export interface Result {
    /**
     * Whether the deletion was successful
     */
    success?: boolean;
  }
}

export interface ProductTemplateListParams {
  /**
   * Number of items per page (max 100)
   */
  limit?: number;

  /**
   * Result set offset
   */
  offset?: number;
}

export declare namespace ProductTemplates {
  export {
    type ProductTemplateRetrieveResponse as ProductTemplateRetrieveResponse,
    type ProductTemplateListResponse as ProductTemplateListResponse,
    type ProductTemplateDeleteResponse as ProductTemplateDeleteResponse,
    type ProductTemplateListParams as ProductTemplateListParams,
  };
}
