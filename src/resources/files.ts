// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Files extends APIResource {
  /**
   * Adds a new File to the library by providing URL of the file.
   *
   * If a file with identical URL already exists, then the original file is returned.
   * If a file does not exist, a new file is created.
   *
   * [See examples](#tag/Examples/File-Library-API-examples/Add-a-new-file)
   *
   * @example
   * ```ts
   * const file = await client.files.create({
   *   url: '​https://www.example.com/files/tshirts/example.png',
   * });
   * ```
   */
  create(params: FileCreateParams, options?: RequestOptions): APIPromise<FileCreateResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.post('/files', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Returns information about the given file.
   *
   * @example
   * ```ts
   * const file = await client.files.retrieve(0);
   * ```
   */
  retrieve(
    id: number,
    params: FileRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FileRetrieveResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.get(path`/files/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Returns colors in hexadecimal format.
   *
   * Returned thread colors are matched as closely as possible to provided image
   * colors.
   *
   * [See examples](#tag/Examples/File-Library-API-examples/Suggest-thread-colors)
   *
   * @example
   * ```ts
   * const response = await client.files.getThreadColors();
   * ```
   */
  getThreadColors(
    body: FileGetThreadColorsParams,
    options?: RequestOptions,
  ): APIPromise<FileGetThreadColorsResponse> {
    return this._client.post('/files/thread-colors', { body, ...options });
  }
}

export interface FileCreateResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the File
   */
  result?: Shared.File;
}

export interface FileRetrieveResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the File
   */
  result?: Shared.File;
}

export interface FileGetThreadColorsResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  thread_colors?: Array<string>;
}

export interface FileCreateParams {
  /**
   * Body param: Source URL where the file is downloaded from. The use of .ai .psd
   * and .tiff files have been depreciated, if your application uses these file types
   * or accepts these types from users you will need to add validation.
   */
  url: string;

  /**
   * Body param: File name
   */
  filename?: string;

  /**
   * Body param: Array of additional options for this file
   * [See examples](#tag/Common/Options)
   */
  options?: Array<Shared.FileOption>;

  /**
   * Body param: Role of the file
   */
  type?: string;

  /**
   * Body param: Show file in the Printfile Library (default true)
   */
  visible?: boolean;

  /**
   * Header param: Use this to specify which store you want to use (required only for
   * account level token).
   *
   * The store IDs can be retrieved with the
   * [Get basic information about stores](#tag/Store-Information-API/operation/getStores)
   * endpoint.
   */
  'X-PF-Store-Id'?: string;
}

export interface FileRetrieveParams {
  /**
   * Use this to specify which store you want to use (required only for account level
   * token).
   *
   * The store IDs can be retrieved with the
   * [Get basic information about stores](#tag/Store-Information-API/operation/getStores)
   * endpoint.
   */
  'X-PF-Store-Id'?: string;
}

export interface FileGetThreadColorsParams {
  /**
   * URL to file
   */
  file_url?: string;
}

export declare namespace Files {
  export {
    type FileCreateResponse as FileCreateResponse,
    type FileRetrieveResponse as FileRetrieveResponse,
    type FileGetThreadColorsResponse as FileGetThreadColorsResponse,
    type FileCreateParams as FileCreateParams,
    type FileRetrieveParams as FileRetrieveParams,
    type FileGetThreadColorsParams as FileGetThreadColorsParams,
  };
}
