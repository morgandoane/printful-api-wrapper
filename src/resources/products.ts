// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ProductsAPI from './products';
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
export class Products extends APIResource {
  /**
   * Returns information about a specific product and a list of variants for this
   * product.
   */
  retrieve(id: number, options?: RequestOptions): APIPromise<ProductRetrieveResponse> {
    return this._client.get(path`/products/${id}`, options);
  }

  /**
   * Returns list of Products available in the Printful
   */
  list(
    query: ProductListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductListResponse> {
    return this._client.get('/products', { query, ...options });
  }

  /**
   * Returns information about the size guide for a specific product.
   */
  retrieveSizeGuide(
    id: number,
    query: ProductRetrieveSizeGuideParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductRetrieveSizeGuideResponse> {
    return this._client.get(path`/products/${id}/sizes`, { query, ...options });
  }

  /**
   * Returns information about a specific Variant and its Product
   */
  retrieveVariant(id: number, options?: RequestOptions): APIPromise<ProductRetrieveVariantResponse> {
    return this._client.get(path`/products/variant/${id}`, options);
  }
}

export interface AvailableTechnique {
  /**
   * The human-readable technique name
   */
  display_name?: string;

  /**
   * Whether the technique is the default one
   */
  is_default?: boolean;

  /**
   * The technique key to be used in the API
   */
  key?: string;
}

export interface CatalogFileOption {
  /**
   * File option identifier. Use this to specify which option you are adding to your
   * file in a request.
   */
  id?: string;

  /**
   * Additional cost this will add to the item.
   */
  additional_price?: number;

  title?: string;

  /**
   * The type of the value property when using this option in a request.
   */
  type?: string;
}

export interface FileType {
  /**
   * @deprecated Deprecated file type identifier. Please use type field instead!
   */
  id?: string;

  /**
   * Additional price when this print file type is used
   */
  additional_price?: string;

  /**
   * Additional options available to product files
   */
  options?: Array<CatalogFileOption>;

  /**
   * Display name
   */
  title?: string;

  /**
   * File type identifier - use this to specify a file's purpose when creating an
   * order
   */
  type?: string;
}

export interface OptionType {
  /**
   * Option identifier - use this to specify the option when creating an order
   */
  id?: string;

  /**
   * Additional price when this option is used
   */
  additional_price?: string;

  /**
   * Additional price breakdown by type - [key, value] map
   */
  additional_price_breakdown?: { [key: string]: unknown };

  /**
   * Display name
   */
  title?: string;

  /**
   * Data type of this option (currently only 'bool' is supported)
   */
  type?: string;

  /**
   * Possible option values - [key, value] map
   */
  values?: { [key: string]: unknown };
}

/**
 * Information about the Product that the Variant belongs to
 */
export interface Product {
  /**
   * Product ID
   */
  id?: number;

  /**
   * Average number of days for order to be fulfilled
   */
  avg_fulfillment_time?: number;

  /**
   * Brand name
   */
  brand?: string;

  /**
   * Currency in which prices are returned
   */
  currency?: string;

  /**
   * Product description
   */
  description?: string;

  /**
   * Definitions of Print/Mockup file categories that can be attached to this product
   */
  files?: Array<FileType>;

  /**
   * URL of a sample image for this product
   */
  image?: string;

  /**
   * If product is disabled in push
   */
  is_discontinued?: boolean;

  /**
   * Main category of product
   */
  main_category_id?: number;

  /**
   * Model name
   */
  model?: string;

  /**
   * Definitions of additional options that are available for this product
   * [See examples](#tag/Common/Options)
   */
  options?: Array<OptionType>;

  /**
   * The origin country for inside label
   */
  origin_country?: string | null;

  /**
   * Available techniques
   */
  techniques?: Array<AvailableTechnique>;

  /**
   * Product title
   */
  title?: string;

  /**
   * Product type identifier
   */
  type?: string;

  /**
   * Product type name
   */
  type_name?: string;

  /**
   * Number of available variants for this product
   */
  variant_count?: number;
}

export interface ProductRetrieveResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: ProductRetrieveResponse.Result;
}

export namespace ProductRetrieveResponse {
  export interface Result {
    /**
     * Information about the Product that the Variant belongs to
     */
    product?: ProductsAPI.Product;

    variants?: Array<Result.Variant>;
  }

  export namespace Result {
    export interface Variant {
      /**
       * Variant ID, use this to specify the product when creating orders
       */
      id?: number;

      /**
       * Map of [region code, region name] of regions where the variant is available for
       * fulfillment
       */
      availability_regions?: { [key: string]: unknown };

      /**
       * Detailed stock status per region
       */
      availability_status?: Array<Variant.AvailabilityStatus>;

      /**
       * Item color
       */
      color?: string;

      /**
       * Hexadecimal RGB color code. May not exactly reflect the real-world color
       */
      color_code?: string;

      /**
       * Secondary hexadecimal RGB color code. May not exactly reflect the real-world
       * color
       */
      color_code2?: string;

      /**
       * URL of a preview image for this variant
       */
      image?: string;

      /**
       * Stock availability of this variant
       */
      in_stock?: boolean;

      /**
       * A list of materials this Variant is composed of
       */
      material?: Array<Variant.Material>;

      /**
       * Display name
       */
      name?: string;

      /**
       * Variant's price (can change depending on print files and optional settings)
       */
      price?: string;

      /**
       * ID of the product that this variant belongs to
       */
      product_id?: number;

      /**
       * Item size
       */
      size?: string;
    }

    export namespace Variant {
      export interface AvailabilityStatus {
        /**
         * Region code
         */
        region?: string;

        /**
         * Stock status. Possible values include: 'in_stock' - available for fulfillment,
         * 'stocked_on_demand' - available for fulfillment, 'discontinued' - permanently
         * unavailable, 'out_of_stock' - temporarily unavailable
         */
        status?: string;
      }

      export interface Material {
        /**
         * Material name
         */
        name?: string;

        /**
         * Percentage of the material in the product
         */
        percentage?: number;
      }
    }
  }
}

export interface ProductListResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: Array<Product>;
}

export interface ProductRetrieveSizeGuideResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Size Guide information for the Product
   */
  result?: ProductRetrieveSizeGuideResponse.Result;
}

export namespace ProductRetrieveSizeGuideResponse {
  /**
   * Size Guide information for the Product
   */
  export interface Result {
    /**
     * The sizes available for the Product
     */
    available_sizes: Array<string>;

    /**
     * Product ID
     */
    product_id: number;

    /**
     * Size tables for the product
     */
    size_tables: Array<Result.SizeTable>;
  }

  export namespace Result {
    /**
     * Size table for the Product
     */
    export interface SizeTable {
      /**
       * The size table measurements
       */
      measurements: Array<SizeTable.Measurement>;

      /**
       * Size table type
       */
      type: 'measure_yourself' | 'product_measure' | 'international';

      /**
       * The size table description (HTML)
       */
      description?: string;

      /**
       * The description of the measurement image (HTML)
       */
      image_description?: string;

      /**
       * The URL of an image showing the measurements
       */
      image_url?: string;

      /**
       * The unit the size table values are in
       */
      unit?: 'inches' | 'cm';
    }

    export namespace SizeTable {
      /**
       * The information about a single size table measurement
       */
      export interface Measurement {
        /**
         * The measurement values for each size
         */
        values: Array<Measurement.Value>;

        /**
         * Measurement type
         */
        type_label?: string;

        /**
         * The measurement unit if it's not defined on the size table level or is different
         */
        unit?: string;
      }

      export namespace Measurement {
        /**
         * The measurement value for a specific size
         */
        export interface Value {
          /**
           * The size with which the value is associated
           */
          size: string;

          /**
           * The upper boundary of the value range (whether this and `min_value` or `value`
           * will be present)
           */
          max_value?: string;

          /**
           * The lower boundary of the value range (whether this and `max_value` or `value`
           * will be present)
           */
          min_value?: string;

          /**
           * The single value associated with a size (whether this or `min_value` and
           * `max_value` will be present)
           */
          value?: string;
        }
      }
    }
  }
}

export interface ProductRetrieveVariantResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: ProductRetrieveVariantResponse.Result;
}

export namespace ProductRetrieveVariantResponse {
  export interface Result {
    /**
     * Information about the Product that the Variant belongs to
     */
    product?: ProductsAPI.Product;

    variant?: Result.Variant;
  }

  export namespace Result {
    export interface Variant {
      /**
       * Variant ID, use this to specify the product when creating orders
       */
      id?: number;

      /**
       * Map of [region code, region name] of regions where the variant is available for
       * fulfillment
       */
      availability_regions?: { [key: string]: unknown };

      /**
       * Detailed stock status per region
       */
      availability_status?: Array<Variant.AvailabilityStatus>;

      /**
       * Item color
       */
      color?: string;

      /**
       * Hexadecimal RGB color code. May not exactly reflect the real-world color
       */
      color_code?: string;

      /**
       * Secondary hexadecimal RGB color code. May not exactly reflect the real-world
       * color
       */
      color_code2?: string;

      /**
       * URL of a preview image for this variant
       */
      image?: string;

      /**
       * Stock availability of this variant
       */
      in_stock?: boolean;

      /**
       * A list of materials this Variant is composed of
       */
      material?: Array<Variant.Material>;

      /**
       * Display name
       */
      name?: string;

      /**
       * Variant's price (can change depending on print files and optional settings)
       */
      price?: string;

      /**
       * ID of the product that this variant belongs to
       */
      product_id?: number;

      /**
       * Item size
       */
      size?: string;
    }

    export namespace Variant {
      export interface AvailabilityStatus {
        /**
         * Region code
         */
        region?: string;

        /**
         * Stock status. Possible values include: 'in_stock' - available for fulfillment,
         * 'stocked_on_demand' - available for fulfillment, 'discontinued' - permanently
         * unavailable, 'out_of_stock' - temporarily unavailable
         */
        status?: string;
      }

      export interface Material {
        /**
         * Material name
         */
        name?: string;

        /**
         * Percentage of the material in the product
         */
        percentage?: number;
      }
    }
  }
}

export interface ProductListParams {
  /**
   * A comma-separated list of Category IDs of the Products that are to be returned
   */
  category_id?: string;
}

export interface ProductRetrieveSizeGuideParams {
  /**
   * A comma-separated list of measurement unit in which size tables are to be
   * returned (`inches` or `cm`). The default value is determined based on the locale
   * country. The inches are used for United States, Liberia and Myanmar, for other
   * countries the unit defaults to centimeters.
   */
  unit?: string;
}

export declare namespace Products {
  export {
    type AvailableTechnique as AvailableTechnique,
    type CatalogFileOption as CatalogFileOption,
    type FileType as FileType,
    type OptionType as OptionType,
    type Product as Product,
    type ProductRetrieveResponse as ProductRetrieveResponse,
    type ProductListResponse as ProductListResponse,
    type ProductRetrieveSizeGuideResponse as ProductRetrieveSizeGuideResponse,
    type ProductRetrieveVariantResponse as ProductRetrieveVariantResponse,
    type ProductListParams as ProductListParams,
    type ProductRetrieveSizeGuideParams as ProductRetrieveSizeGuideParams,
  };
}
