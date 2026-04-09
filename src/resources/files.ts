// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * To avoid the need to upload every file again when the same item is ordered,
 * your print files are stored in the File Library and can be reused.
 *
 * You can use this API to directly add files to the library, and later use
 * File IDs when creating orders. However, the more convenient way is to specify
 * the files by URL at the same time the order is created.
 *
 * <div class="alert alert-info">
 * Most probably you will never need to use this API - just specify the file URL
 * when creating orders and the files will be added automatically.
 * </div>
 *
 * File processing can be very time-consuming, so they are processed
 * asynchronously. After you add a file, it is saved with the status
 * `waiting` and downloaded and processed later. Afterward, the status
 * is changed to `ok` if the file was loaded successfully and was a valid
 * image file or `failed` if the process did not succeed. Some file
 * metadata fields like dimensions and resolution are only filled in
 * after the file has been processed.
 *
 * If an order with a file has been confirmed before the file was processed,
 * and the file turns out to be invalid, then the order is reverted to a failed
 * state and needs to be corrected and confirmed again.
 *
 * If you try to add a file that has an identical URL to an already
 * existing file, then no new file is created, and the system returns
 * the old one without refreshing its contents.
 *
 * <div class="alert alert-info">
 * <strong>Remember</strong><br>
 * If you have changed the original, make sure that the URL is changed as well
 * for future orders, otherwise the old version will be reused.
 * </div>
 *
 * You can add a “last modified” timestamp to the end of the URL to ensure
 * that the URL is different for changed files.
 *
 * Files that are added through the API can be set not to show up in the
 * File library on the web,
 * just set the visible attribute to false when creating them.
 *
 * **Caution: API endpoint "Get list of files" (/files) is removed and can no longer be used. Calling this endpoint will return a HTTP 410 (Gone) response.**
 */
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
