// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ProductsAPI from './products';
import {
  ProductListParams,
  ProductListResponse,
  ProductRetrieveParams,
  ProductRetrieveResponse,
  Products,
} from './products';

export class Warehouse extends APIResource {
  products: ProductsAPI.Products = new ProductsAPI.Products(this._client);
}

Warehouse.Products = Products;

export declare namespace Warehouse {
  export {
    Products as Products,
    type ProductRetrieveResponse as ProductRetrieveResponse,
    type ProductListResponse as ProductListResponse,
    type ProductRetrieveParams as ProductRetrieveParams,
    type ProductListParams as ProductListParams,
  };
}
