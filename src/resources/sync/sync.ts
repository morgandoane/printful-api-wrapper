// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ProductsAPI from './products';
import {
  ProductDeleteParams,
  ProductDeleteResponse,
  ProductListParams,
  ProductListResponse,
  ProductRetrieveParams,
  ProductRetrieveResponse,
  Products,
} from './products';
import * as VariantAPI from './variant';
import {
  Variant,
  VariantDeleteParams,
  VariantDeleteResponse,
  VariantRetrieveParams,
  VariantRetrieveResponse,
  VariantUpdateParams,
  VariantUpdateResponse,
} from './variant';

export class Sync extends APIResource {
  products: ProductsAPI.Products = new ProductsAPI.Products(this._client);
  variant: VariantAPI.Variant = new VariantAPI.Variant(this._client);
}

Sync.Products = Products;
Sync.Variant = Variant;

export declare namespace Sync {
  export {
    Products as Products,
    type ProductRetrieveResponse as ProductRetrieveResponse,
    type ProductListResponse as ProductListResponse,
    type ProductDeleteResponse as ProductDeleteResponse,
    type ProductRetrieveParams as ProductRetrieveParams,
    type ProductListParams as ProductListParams,
    type ProductDeleteParams as ProductDeleteParams,
  };

  export {
    Variant as Variant,
    type VariantRetrieveResponse as VariantRetrieveResponse,
    type VariantUpdateResponse as VariantUpdateResponse,
    type VariantDeleteResponse as VariantDeleteResponse,
    type VariantRetrieveParams as VariantRetrieveParams,
    type VariantUpdateParams as VariantUpdateParams,
    type VariantDeleteParams as VariantDeleteParams,
  };
}
