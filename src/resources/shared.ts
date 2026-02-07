// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';

/**
 * Information about the File
 */
export interface File {
  /**
   * Source URL where the file is downloaded from. The use of .ai .psd and .tiff
   * files have been depreciated, if your application uses these file types or
   * accepts these types from users you will need to add validation.
   */
  url: string;

  /**
   * File ID
   */
  id?: number;

  /**
   * File creation timestamp
   */
  created?: number;

  /**
   * Resolution DPI. **Note:** for vector files this may be indicated as only 72dpi,
   * but it doesn't affect print quality since the vector files are resolution
   * independent.
   */
  dpi?: number;

  /**
   * File name
   */
  filename?: string;

  /**
   * MD5 checksum of the file
   */
  hash?: string;

  /**
   * Height in pixels
   */
  height?: number;

  /**
   * Whether it is a temporary printfile.
   */
  is_temporary?: boolean;

  /**
   * MIME type of the file
   */
  mime_type?: string;

  /**
   * Array of additional options for this file [See examples](#tag/Common/Options)
   */
  options?: Array<FileOption>;

  /**
   * Medium preview image URL
   */
  preview_url?: string;

  /**
   * Size in bytes
   */
  size?: number;

  /**
   * File processing status: **ok** - file was processed successfuly **waiting** -
   * file is being processed **failed** - file failed to be processed
   */
  status?: string;

  /**
   * Small thumbnail URL
   */
  thumbnail_url?: string;

  /**
   * Role of the file
   */
  type?: string;

  /**
   * Show file in the Printfile Library (default true)
   */
  visible?: boolean;

  /**
   * Width in pixels
   */
  width?: number;
}

/**
 * File option
 */
export interface FileOption {
  /**
   * Option id
   */
  id: string;

  /**
   * Option value
   */
  value: string;
}

/**
 * Additional options for the configured product/variant
 */
export interface ItemOption {
  /**
   * Option id
   */
  id: string;

  /**
   * Option value
   */
  value: string;
}

/**
 * Custom packing slip for this order. Example of a packing slip with explained
 * fields can be found [here](#packing-slip).
 */
export interface PackingSlip {
  /**
   * Your own Order ID that will be printed instead of Printful's Order ID
   */
  custom_order_id?: string;

  /**
   * Customer service email
   */
  email?: string;

  /**
   * URL address to a sticker we will put on a package. The provided image is
   * converted to grayscale/1-bit monochrome image.
   */
  logo_url?: string;

  /**
   * Custom packing slip message
   */
  message?: string;

  /**
   * Customer service phone
   */
  phone?: string;

  /**
   * Store name override for the return address
   */
  store_name?: string;
}

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
 * Short information about the Printful Product and Variant
 */
export interface ProductVariant {
  /**
   * URL of a sample image for this variant
   */
  image?: string;

  /**
   * Display name of this variant
   */
  name?: string;

  /**
   * Product ID of this variant
   */
  product_id?: number;

  /**
   * Variant ID
   */
  variant_id?: number;
}

/**
 * Information about the SyncProduct
 */
export interface SyncProduct {
  /**
   * Product name
   */
  name: string;

  /**
   * SyncProduct ID
   */
  id?: number;

  /**
   * Product ID from the Ecommerce platform
   */
  external_id?: string;

  /**
   * Indicates if this Sync Product is ignored
   */
  is_ignored?: boolean;

  /**
   * Number of synced Sync Variants belonging to this product
   */
  synced?: number;

  /**
   * Thumbnail image for the product
   */
  thumbnail_url?: string;

  /**
   * Total number of Sync Variants belonging to this product
   */
  variants?: number;
}

/**
 * Information about the SyncVariant
 */
export interface SyncVariant {
  /**
   * Sync Variant ID
   */
  id?: number;

  /**
   * Indicates the status of the Sync Variant.
   */
  availability_status?: 'active' | 'discontinued' | 'out_of_stock' | 'temporary_out_of_stock';

  /**
   * The color of the associated Catalog Variant
   */
  color?: string | null;

  /**
   * Currency in which prices are returned
   */
  currency?: string;

  /**
   * Variant ID from the Ecommerce platform
   */
  external_id?: string;

  /**
   * Array of attached printfiles / preview images
   */
  files?: Array<SyncVariant.File>;

  /**
   * Indicates if this Sync Variant is ignored
   */
  is_ignored?: boolean;

  /**
   * Printful Variant catalog category ID
   */
  main_category_id?: number | null;

  /**
   * Sync Variant name
   */
  name?: string;

  /**
   * Array of additional options for the configured product/variant
   * [See examples](#tag/Common/Options)
   */
  options?: Array<ItemOption>;

  /**
   * Short information about the Printful Product and Variant
   */
  product?: ProductVariant;

  /**
   * Retail price that this item is sold for
   */
  retail_price?: string;

  /**
   * The size of the associated Catalog Variant
   */
  size?: string | null;

  /**
   * SKU of this Sync Variant
   */
  sku?: string | null;

  /**
   * Sync Product ID that this variant belongs to
   */
  sync_product_id?: number;

  /**
   * Indicates if this Sync Variant is properly linked with Printful product
   */
  synced?: boolean;

  /**
   * Printful Variant ID that this Sync Variant is synced to
   */
  variant_id?: number;

  /**
   * Warehousing product ID. If the sync variant is connected with a warehousing
   * item, this is the ID of corresponding warehouse product.
   */
  warehouse_product_id?: number | null;

  /**
   * Warehousing variant ID. If the sync variant is connected with a warehousing
   * item, this is its ID.
   */
  warehouse_product_variant_id?: number | null;
}

export namespace SyncVariant {
  /**
   * Information about the File
   */
  export interface File extends Shared.File {
    /**
     * Stitch count tier see
     * https://help.printful.com/hc/en-us/articles/4909652626204-What-s-the-new-large-embroidery-pricing-
     */
    stitch_count_tier?: string | null;
  }
}
