// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
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
  result?: FileCreateResponse.Result;
}

export namespace FileCreateResponse {
  /**
   * Information about the File
   */
  export interface Result {
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
    options?: Array<Result.Option>;

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

  export namespace Result {
    /**
     * File option
     */
    export interface Option {
      /**
       * Option id
       */
      id: string;

      /**
       * Option value
       */
      value: string;
    }
  }
}

export interface FileRetrieveResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Information about the File
   */
  result?: FileRetrieveResponse.Result;
}

export namespace FileRetrieveResponse {
  /**
   * Information about the File
   */
  export interface Result {
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
    options?: Array<Result.Option>;

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

  export namespace Result {
    /**
     * File option
     */
    export interface Option {
      /**
       * Option id
       */
      id: string;

      /**
       * Option value
       */
      value: string;
    }
  }
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
  options?: Array<FileCreateParams.Option>;

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

export namespace FileCreateParams {
  /**
   * File option
   */
  export interface Option {
    /**
     * Option id
     */
    id: string;

    /**
     * Option value
     */
    value: string;
  }
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
