// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Printful } from '../client';

export abstract class APIResource {
  protected _client: Printful;

  constructor(client: Printful) {
    this._client = client;
  }
}
