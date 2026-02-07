// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class ApprovalSheets extends APIResource {
  /**
   * Retrieve a list of approval sheets confirming suggested changes to files of on
   * hold orders.
   *
   * @example
   * ```ts
   * const approvalSheets = await client.approvalSheets.list();
   * ```
   */
  list(
    params: ApprovalSheetListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ApprovalSheetListResponse> {
    const { 'X-PF-Store-Id': xPfStoreID } = params ?? {};
    return this._client.get('/approval-sheets', {
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Uses the confirm hash of an approval sheet to approve a design and remove the
   * hold on an order
   *
   * @example
   * ```ts
   * const response = await client.approvalSheets.approve({
   *   confirm_hash: 'confirm_hash',
   *   status: 'approved',
   * });
   * ```
   */
  approve(
    params: ApprovalSheetApproveParams,
    options?: RequestOptions,
  ): APIPromise<ApprovalSheetApproveResponse> {
    const { confirm_hash, 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.post('/approval-sheets', {
      query: { confirm_hash },
      body,
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Use this to submit alternative changes to a design that has an approval sheet
   *
   * @example
   * ```ts
   * const response = await client.approvalSheets.submitChanges({
   *   confirm_hash: 'confirm_hash',
   *   files: [{ url: 'example.com' }],
   *   message: 'The design needs to be aligned to the left',
   * });
   * ```
   */
  submitChanges(
    params: ApprovalSheetSubmitChangesParams,
    options?: RequestOptions,
  ): APIPromise<ApprovalSheetSubmitChangesResponse> {
    const { confirm_hash, 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.post('/approval-sheets/changes', {
      query: { confirm_hash },
      body,
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface ApprovalSheetListResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: Array<ApprovalSheetListResponse.Result>;
}

export namespace ApprovalSheetListResponse {
  /**
   * Approval sheet
   */
  export interface Result {
    id?: number;

    approval_sheet?: string;

    confirm_hash?: string;

    recommended_design?: string;

    status?: 'waiting_for_action' | 'approved';

    submitted_design?: string;
  }
}

export interface ApprovalSheetApproveResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  result?: ApprovalSheetApproveResponse.Result;
}

export namespace ApprovalSheetApproveResponse {
  export interface Result {
    message?: string;
  }
}

export interface ApprovalSheetSubmitChangesResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Approval sheet
   */
  result?: ApprovalSheetSubmitChangesResponse.Result;
}

export namespace ApprovalSheetSubmitChangesResponse {
  /**
   * Approval sheet
   */
  export interface Result {
    id?: number;

    approval_sheet?: string;

    confirm_hash?: string;

    recommended_design?: string;

    status?: 'waiting_for_action' | 'approved';

    submitted_design?: string;
  }
}

export interface ApprovalSheetListParams {
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

export interface ApprovalSheetApproveParams {
  /**
   * Query param: The confirm hash for the approval sheet you would like to approve.
   */
  confirm_hash: string;

  /**
   * Body param
   */
  status: 'approved';

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

export interface ApprovalSheetSubmitChangesParams {
  /**
   * Query param: The confirm hash for the approval sheet you would like to approve.
   */
  confirm_hash: string;

  /**
   * Body param: An array of images to help describe the requested changes. Consider
   * using the mockup generator to generate these images. The array is required but
   * can be empty if you do not want to email any images.
   */
  files: Array<ApprovalSheetSubmitChangesParams.File>;

  /**
   * Body param: A message to send to Printful designers. Customers should use this
   * to describe the changes they want.
   */
  message: string;

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

export namespace ApprovalSheetSubmitChangesParams {
  export interface File {
    /**
     * A url to an image, consider using the mockup generator to generate this image.
     */
    url: string;
  }
}

export declare namespace ApprovalSheets {
  export {
    type ApprovalSheetListResponse as ApprovalSheetListResponse,
    type ApprovalSheetApproveResponse as ApprovalSheetApproveResponse,
    type ApprovalSheetSubmitChangesResponse as ApprovalSheetSubmitChangesResponse,
    type ApprovalSheetListParams as ApprovalSheetListParams,
    type ApprovalSheetApproveParams as ApprovalSheetApproveParams,
    type ApprovalSheetSubmitChangesParams as ApprovalSheetSubmitChangesParams,
  };
}
