// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Printful has a substantial catalog of blank Products and Variants. A Product can describe a specific type, model and manufacturer of the item, while the Variant specifies the more detailed attributes of the product like the exact size/color of a
 * T-shirt or the dimensions of a poster. Moreover, each item in the Printful Catalog has a unique Variant ID. When managing Sync Products or orders, you will need to specify the Variant ID of the specific blank item, hence you can use this API resource
 * to find the needed Variant ID.
 *
 * <div class="alert alert-info">
 * It is critically important to always refer to the Variant IDs (<strong>NOT Product IDs</strong>) when creating products or orders. Mixing up and using the Product ID instead of the Variant ID can lead to an entirely different product created or item ordered.
 * The Product entity is only meant to allow of easier browsing of what Printful offers.
 * </div>
 *
 * You can also use this API resource to find out the types of print files a product can be configured for as well as the
 * additional price each print file would cost (e.g. the back print or inside label print for T-shirts). Moreover, some
 * product types allow for additional options (e.g. embroidery type and thread colors) - these options are listed in the
 * responses as well.
 *
 * <div class="alert alert-info">
 * Please note that the current Catalog API does not reflect the discounted pricing available in the Printful subscription plans.
 * </div>
 *
 * **Important**: Jewelry products are not supported via API.
 *
 * **Rate limiting**: For unauthenticated usages, up to 30 requests per 60 seconds. A 60 seconds lockout is applied if
 * request count is exceeded.
 *
 * ### Size guides
 *
 * The [Get Product Size Guide](#operation/getProductSizeGuideById) endpoint will return size guide data for the selected
 * product.
 *
 * There are three types of size tables available, as described by the following table:
 *
 * | Table type                    | API name           | Description                                                                                 |
 * |-------------------------------|--------------------|---------------------------------------------------------------------------------------------|
 * | Measure yourself              | `measure_yourself` | Measurements of the product to measure the body provided by the supplier.                   |
 * | Product measurements          | `product_measure`  | Measurements of the product provided by the supplier.                                       |
 * | International size conversion | `international`    | International size conversion – e.g. US, EU or UK sizes corresponding to the product sizes. |
 *
 * Not each table type might be available for the selected product.
 *
 * [See examples](#tag/Examples/Catalog-API-examples/Using-size-guides)
 */
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
