// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import { stringifyQuery } from './internal/utils/query';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import { APIPromise } from './core/api-promise';
import {
  ApprovalSheetApproveParams,
  ApprovalSheetApproveResponse,
  ApprovalSheetListParams,
  ApprovalSheetListResponse,
  ApprovalSheetSubmitChangesParams,
  ApprovalSheetSubmitChangesResponse,
  ApprovalSheets,
} from './resources/approval-sheets';
import { Categories, CategoryListResponse, CategoryRetrieveResponse } from './resources/categories';
import { Countries, CountryListResponse } from './resources/countries';
import {
  FileCreateParams,
  FileCreateResponse,
  FileGetThreadColorsParams,
  FileGetThreadColorsResponse,
  FileRetrieveParams,
  FileRetrieveResponse,
  Files,
} from './resources/files';
import {
  MockupGenerator,
  MockupGeneratorCreateTaskParams,
  MockupGeneratorCreateTaskResponse,
  MockupGeneratorRetrievePrintfilesParams,
  MockupGeneratorRetrievePrintfilesResponse,
  MockupGeneratorRetrieveTaskResultParams,
  MockupGeneratorRetrieveTaskResultResponse,
  MockupGeneratorRetrieveTemplatesParams,
  MockupGeneratorRetrieveTemplatesResponse,
} from './resources/mockup-generator';
import { OAuth, OAuthListScopesResponse } from './resources/oauth';
import {
  Address,
  Costs,
  Gift,
  IncompleteItem,
  Item,
  Option,
  Order,
  OrderCancelParams,
  OrderCancelResponse,
  OrderConfirmParams,
  OrderConfirmResponse,
  OrderCreateParams,
  OrderCreateResponse,
  OrderEstimateCostsParams,
  OrderEstimateCostsResponse,
  OrderListParams,
  OrderListResponse,
  OrderRetrieveParams,
  OrderRetrieveResponse,
  OrderShipmentItem,
  OrderUpdateParams,
  OrderUpdateResponse,
  Orders,
  PricingBreakdown,
  RetailCosts,
  Shipment,
} from './resources/orders';
import {
  ProductTemplateDeleteResponse,
  ProductTemplateListParams,
  ProductTemplateListResponse,
  ProductTemplateRetrieveResponse,
  ProductTemplates,
} from './resources/product-templates';
import {
  AvailableTechnique,
  CatalogFileOption,
  FileType,
  OptionType,
  Product,
  ProductListParams,
  ProductListResponse,
  ProductRetrieveResponse,
  ProductRetrieveSizeGuideParams,
  ProductRetrieveSizeGuideResponse,
  ProductRetrieveVariantResponse,
  Products,
} from './resources/products';
import {
  ReportRetrieveStatisticsParams,
  ReportRetrieveStatisticsResponse,
  Reports,
} from './resources/reports';
import { Shipping, ShippingCalculateRatesParams, ShippingCalculateRatesResponse } from './resources/shipping';
import {
  Tax,
  TaxCalculateRateParams,
  TaxCalculateRateResponse,
  TaxListCountriesResponse,
} from './resources/tax';
import {
  WebhookCreateParams,
  WebhookCreateResponse,
  WebhookDeleteParams,
  WebhookDeleteResponse,
  WebhookInfo,
  WebhookRetrieveParams,
  WebhookRetrieveResponse,
  Webhooks,
} from './resources/webhooks';
import {
  Store,
  StoreListResponse,
  StoreRetrieveResponse,
  StoreUpdatePackingSlipParams,
  StoreUpdatePackingSlipResponse,
} from './resources/store/store';
import { Sync } from './resources/sync/sync';
import { Warehouse } from './resources/warehouse/warehouse';
import { type Fetch } from './internal/builtin-types';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

export interface ClientOptions {
  /**
   * Defaults to process.env['PRINTFUL_API_KEY'].
   */
  apiKey?: string | null | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['PRINTFUL_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;
  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['PRINTFUL_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Printful API.
 */
export class Printful {
  apiKey: string | null;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Printful API.
   *
   * @param {string | null | undefined} [opts.apiKey=process.env['PRINTFUL_API_KEY'] ?? null]
   * @param {string} [opts.baseURL=process.env['PRINTFUL_BASE_URL'] ?? https://api.printful.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('PRINTFUL_BASE_URL'),
    apiKey = readEnv('PRINTFUL_API_KEY') ?? null,
    ...opts
  }: ClientOptions = {}) {
    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.printful.com`,
    };

    this.baseURL = options.baseURL!;
    this.timeout = options.timeout ?? Printful.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('PRINTFUL_LOG'), "process.env['PRINTFUL_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    this._options = options;

    this.apiKey = apiKey;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    const client = new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      ...options,
    });
    return client;
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'https://api.printful.com';
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    if (this.apiKey && values.get('authorization')) {
      return;
    }
    if (nulls.has('authorization')) {
      return;
    }

    throw new Error(
      'Could not resolve authentication method. Expected the apiKey to be set. Or for the "Authorization" headers to be explicitly omitted',
    );
  }

  protected async authHeaders(
    opts: FinalRequestOptions,
    schemes: { bearerAuth?: boolean },
  ): Promise<NullableHeaders | undefined> {
    return buildHeaders([schemes.bearerAuth ? await this.bearerAuth(opts) : null]);
  }

  protected async bearerAuth(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    if (this.apiKey == null) {
      return undefined;
    }
    return buildHeaders([{ Authorization: `Bearer ${this.apiKey}` }]);
  }

  /**
   * Basic re-implementation of `qs.stringify` for primitive types.
   */
  protected stringifyQuery(query: object | Record<string, unknown>): string {
    return stringifyQuery(query);
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    const pathQuery = Object.fromEntries(url.searchParams);
    if (!isEmptyObj(defaultQuery) || !isEmptyObj(pathQuery)) {
      query = { ...pathQuery, ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText) as any;
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    const abort = this._makeAbort(controller);
    if (signal) signal.addEventListener('abort', abort, { once: true });

    const timeout = setTimeout(abort, ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async shouldRetry(response: Response): Promise<boolean> {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time, just do what it
    // says, but otherwise calculate a default
    if (timeoutMillis === undefined) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  async buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): Promise<{ req: FinalizedRequestInit; url: string; timeout: number }> {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private async buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Promise<Headers> {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
      },
      await this.authHeaders(options, options.__security ?? { bearerAuth: true }),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private _makeAbort(controller: AbortController) {
    // note: we can't just inline this method inside `fetchWithTimeout()` because then the closure
    //       would capture all request options, and cause a memory leak.
    return () => controller.abort();
  }

  private buildBody({ options: { body, headers: rawHeaders } }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    if (!body) {
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      ((globalThis as any).Blob && body instanceof (globalThis as any).Blob) ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else if (
      typeof body === 'object' &&
      headers.values.get('content-type') === 'application/x-www-form-urlencoded'
    ) {
      return {
        bodyHeaders: { 'content-type': 'application/x-www-form-urlencoded' },
        body: this.stringifyQuery(body),
      };
    } else {
      return this.#encoder({ body, headers });
    }
  }

  static Printful = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static PrintfulError = Errors.PrintfulError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;

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
  products: API.Products = new API.Products(this);
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
  categories: API.Categories = new API.Categories(this);
  /**
   * The Product Templates API resource lets you retrieve the product templates information.
   *
   * ### External Product ID
   *
   * In case of a single template retrieval it is possible to get it by the External Product ID. In order to do this, the ID needs to be prepended with the '@' character. Here are the examples of how to get the template data by the Template ID and by the External Product ID.
   *
   * ```
   * GET /product-templates/11001  - reference by Printful Template ID
   * GET /product-templates/@988123  - reference by External ID
   * ```
   *
   * [See examples](#tag/Product-Templates-API)
   *
   */
  productTemplates: API.ProductTemplates = new API.ProductTemplates(this);
  /**
   * The Orders API is the most important part of the Printful API - it allows you to create new orders and confirm them for
   * fulfillment.
   *
   * **Important**: Jewelry products are not supported via API.
   *
   * ### Order life cycle and statuses
   *
   * Each order will go through different states while being processed. The following order status types indicate those
   * states:
   *
   * <table>
   *     <tr>
   *         <td><strong>draft</strong></td>
   *         <td>The order is created but is not yet submitted for fulfillment. You still can edit it and confirm later.</td>
   *     </tr>
   *     <tr>
   *         <td><strong>inreview</strong></td>
   *         <td>The order is being reviewed. It's not possible to cancel the order at this point. It will be possible to cancel the order when the review process is finished.</td>
   *     </tr>
   *     <tr>
   *         <td><strong>pending</strong></td>
   *     <td>The order has been submitted for fulfillment, but is not yet accepted for fulfillment. You can still cancel the order if you need.</td>
   *     </tr>
   *     <tr>
   *         <td><strong>failed</strong></td>
   *         <td>Order was submitted for fulfillment but was returned for review because of an error (problem with address, missing printfiles, charging has failed, etc.).</td>
   *     </tr>
   *     <tr>
   *         <td><strong>canceled</strong></td>
   *         <td>The order has been canceled and can no longer be processed. If the order was charged then the amount has been returned to your credit card.</td>
   *     </tr>
   *     <tr>
   *         <td><strong>inprocess</strong></td>
   *         <td>The order is being fulfilled and can no longer be cancelled or modified. Contact customer support if there are any issues with the order at this point.</td>
   *     </tr>
   *     <tr>
   *         <td><strong>onhold</strong></td>
   *         <td>The order has encountered a problem during the fulfillment that needs to be resolved together with Printful customer service before fulfillment can continue.</td>
   *     </tr>
   *     <tr>
   *         <td><strong>partial</strong></td>
   *         <td>The order is partially fulfilled (some items are shipped already, the rest will follow)</td>
   *     </tr>
   *     <tr>
   *         <td><strong>fulfilled</strong></td>
   *         <td>All items have been shipped successfully</td>
   *     </tr>
   *     <tr>
   *         <td><strong>archived</strong></td>
   *         <td>The order has been archived and hidden from the UI</td>
   *     </tr>
   * </table>
   *
   * To sum up, the API allows you to create orders with status `draft` and then move them to state `pending` (both steps can
   * be done with a single action). You are only charged for orders that have been confirmed. If the order encounters a
   * problem after it has been submitted, then it is moved to the failed state so that the problem can be fixed and the order
   * can be resubmitted.
   *
   * ### Asynchronous order cost calculation
   *
   * Most of the times, when you submit an order, we'll perform the cost calculation and return it in the response.
   *
   * However, we might not be able to calculate all the costs immediately, for example if the order contains a new advanced
   * embroidery design. If that's the case, we'll automatically put your order on hold, calculate the order costs once it's
   * possible, and then remove the order from hold.
   *
   * Such an order will return to a draft status (even if it was created with the auto-confirm option) and will need to be
   * confirmed.
   *
   * You can subscribe to the `order_remove_hold` event (see [Webhook API](#tag/Webhook-API)) to be notified when the order is removed from hold.
   *
   * ### External ID
   *
   * External ID is an optional feature that allows you to link your Printful order with the Order ID from your system
   * without the need to store additional data on your side. External ID can be up to 32 characters long and contain digits,
   * Latin alphabet letters, dashes and underscores, however it is recommended to use integer numbers. Each order's External
   * ID must be unique within the store.
   *
   * To use the External ID feature, you just add the `external_id` attribute when creating the order. Later, when you need
   * to access the order through the API, you can reference it by both the Order ID and by External ID (if you prefix it with
   * the `@` symbol).
   *
   * ```
   * GET /orders/11001  - reference by Printful Order ID
   * GET /orders/@988123  - reference by External ID
   * GET /orders/@AA123123  - reference by External ID
   * ```
   *
   * You can assign the `external_id` attribute to line items as well. In this case they have to be unique per order.
   *
   * ### Specifying products
   *
   * There are three general ways to specify a product’s variant when creating, updating or estimating an order:
   *
   * (A) **Using an existing product variant (sync variant) in your Printful store or warehouse.** To specify the existing
   * product please use its `sync_variant_id` or `external_variant_id`, or `warehouse_product_variant_id`.
   *
   * [Example using Sync Variant ID](#tag/Examples/Orders-API-examples/Using-a-sync-variant)
   * [Example using External Variant ID](#tag/Examples/Orders-API-examples/Using-sync-variant-with-external-ID)
   *
   * (B) **Using a Catalog API variant without adding a product to the store.** This method can be used when a Printful store
   * has no products in it. To construct a variant on-the-fly retrieve a specific `variant_id` from the
   * [Catalog API](#tag/Catalog-API) together with print files and an additional options.
   *
   * [Example](#tag/Examples/Orders-API-examples/Using-a-catalog-variant)
   *
   * (C) **Using an existing template ID.** This method can be used when a Printful store has assigned templates without the
   * need to create products. To create an order please use the `product_template_id` and `variant_id` that will be added to
   * the order.
   *
   * [Example](#tag/Examples/Orders-API-examples/Using-a-product-template)
   *
   * ### Adding print files
   *
   * There are two ways to assign a print file to the item. One is to specify the File ID if the file already exists in the
   * file library of the authorized store:
   *
   * ```
   * ...
   * "files": [
   *     {
   *         "id": 12345
   *     },
   * ],
   * ...
   * ```
   *
   * The second and the most convenient method is to specify the file URL. If a file with the same URL already exists, it will be reused.
   *
   * ```
   * ...
   * "files": [
   *     {
   *         "url": "http://example.com/t-shirts/123/front.pdf"
   *     },
   * ],
   * ...
   * ```
   *
   * ### Specifying file position
   *
   * You can specify the image position inside the print area by providing a position object.
   *
   * <strong>Important</strong><br>
   * * Each print area has specific dimensions, by default Orders API will assume that your file has to stick to those limitations and not exceed them. In some cases you would want to position your file outside the print area - to be able to do so use the `limit_to_print_area` and set it to: `false`.
   * * `limit_to_print_area` determines if the image can cross the print area border. If `limit_to_print_area` is set to `true` then the request will result in `400 Bad Request` with "Invalid position" in `error.message` once the image crosses the print area borders. If `limit_to_print_area` is set to `false` then it will be possible to place image partially or fully outside the print area.
   * * The (0,0) point is always located in top left corner of the print area.
   *
   * <strong>Steps</strong><br>
   * 1.Retrieve printfile dimensions [Printfiles](#operation/getPrintfiles)
   * ```
   * ...
   * "printfiles":
   *     [
   *         {
   *             "printfile_id": 1,
   *             "width": 1800,
   *             "height": 2400,
   *             "dpi": 150,
   *             "fill_mode": "fit",
   *             "can_rotate": false
   *         }
   *     ],
   * ...
   * ```
   * 2.Specify file position for specific print placement while creating an order. Use `items` -> `files` -> `position` object as in the example:
   * ```
   * ...
   * "items": [
   *     {
   *         "variant_id":4011,
   *         "quantity":"1",
   *         "files": [
   *             {
   *                 "type": "front",
   *                 "url": "http://example.com/t-shirts/123/front.pdf",
   *                 "position": {
   *                     "area_width": 1800,
   *                     "area_height": 2400,
   *                     "width": 1800,
   *                     "height": 1800,
   *                     "top": 300,
   *                     "left": 0,
   *                     "limit_to_print_area": true
   *                 }
   *             }
   *         ]
   *     }
   * ]
   * ...
   * ```
   *
   * #### Example of positioning the 450x450 image on the front placement
   *
   * <table>
   *   <tr>
   *     <td> Position </td>
   *     <td> Mockup </td>
   *     <td> Payload </td>
   *   </tr>
   *   <tr>
   * <td> Top left </td>
   * <td> <img alt="Top left mockup" src="images/position/top_left.png" width="300"/> </td>
   * <td>
   *
   * ```
   *   "position": {
   *   "area_width": 1800,
   *   "area_height": 2400,
   *   "width": 450,
   *   "height": 450,
   *   "top": 0,
   *   "left": 0,
   *   "limit_to_print_area": true
   *   }
   * ```
   *
   * </td>
   * </tr>
   *
   * <tr>
   * <td> Top middle </td>
   * <td> <img alt="Top left mockup" src="images/position/top_middle.png" width="300"/> </td>
   * <td>
   *
   * ```
   * "position": {
   * "area_width": 1800,
   * "area_height": 2400,
   * "width": 450,
   * "height": 450,
   * "top": 0,
   * "left": 675,
   * "limit_to_print_area": true
   * }
   * ```
   *
   * </td>
   * </tr>
   *
   * <tr>
   * <td> Top right </td>
   * <td> <img alt="Top left mockup" src="images/position/top_right.png" width="300"/> </td>
   * <td>
   *
   * ```
   * "position": {
   * "area_width": 1800,
   * "area_height": 2400,
   * "width": 450,
   * "height": 450,
   * "top": 0,
   * "left": 1350,
   * "limit_to_print_area": true
   * }
   * ```
   *
   * </td>
   * </tr>
   *
   * <tr>
   * <td> Middle </td>
   * <td> <img alt="Top left mockup" src="images/position/middle.png" width="300"/> </td>
   * <td>
   *
   * ```
   * "position": {
   * "area_width": 1800,
   * "area_height": 2400,
   * "width": 450,
   * "height": 450,
   * "top": 975,
   * "left": 675,
   * "limit_to_print_area": true
   * }
   * ```
   *
   * </td>
   * </tr>
   *
   * <tr>
   * <td> Bottom left </td>
   * <td> <img alt="Top left mockup" src="images/position/bottom_left.png" width="300"/> </td>
   * <td>
   *
   * ```
   * "position": {
   * "area_width": 1800,
   * "area_height": 2400,
   * "width": 450,
   * "height": 450,
   * "top": 1950,
   * "left": 0,
   * "limit_to_print_area": true
   * }
   * ```
   *
   * </td>
   * </tr>
   *
   * <tr>
   * <td> Bottom middle </td>
   * <td> <img alt="Top left mockup" src="images/position/bottom_middle.png" width="300"/> </td>
   * <td>
   *
   * ```
   * "position": {
   * "area_width": 1800,
   * "area_height": 2400,
   * "width": 450,
   * "height": 450,
   * "top": 1950,
   * "left": 675,
   * "limit_to_print_area": true
   * }
   * ```
   *
   * </td>
   * </tr>
   *
   * <tr>
   * <td> Bottom right </td>
   * <td> <img alt="Top left mockup" src="images/position/bottom_right.png" width="300"/> </td>
   * <td>
   *
   * ```
   * "position": {
   * "area_width": 1800,
   * "area_height": 2400,
   * "width": 450,
   * "height": 450,
   * "top": 1950,
   * "left": 1350,
   * "limit_to_print_area": true
   * }
   * ```
   *
   * </td>
   * </tr>
   *
   * </table>
   *
   * ### Specifying multiple files per item
   *
   * Each item in the order has to be linked with one or multiple files. The available file types for each product are
   * available from the [Catalog API](#tag/Catalog-API).
   *
   * You can add one file for each type by specifying the `type` attribute. For the `default` type, this attribute can be
   * skipped.
   *
   * ```
   * ...
   * "files":[
   * 	{
   * 		"type": "default",
   * 		"url": "http://example.com/t-shirts/123/front.pdf"
   * 	},
   * 	{
   * 		"type": "back"
   * 		"url": "http://example.com/t-shirts/123/back.pdf"
   * 	},
   * 	{
   * 		"type": "preview"
   * 		"url": "http://example.com/t-shirts/123/preview.png"
   * 	}
   * ],
   * ...
   * ```
   *
   * Remember that using additional files can increase the price of the item.
   *
   * ### Creating orders from a template
   *
   * Orders API allows also creating orders based on the product template created in the Printful account without the need to
   * add the product to the Printful store.
   *
   * To retrieve available templates for your account please use the
   * [Products Templates API](#tag/Product-Templates-API).
   *
   * To create an order from a template you need to specify a variant or variants that will be added to the order. It is
   * possible to use multiple templates with different variants in one request. To achieve that please use the `items` object
   * below:
   *
   * ```
   *     ...
   *     "items": [
   *         {
   *             "variant_id": 4012,
   *             "quantity": 1,
   *             "product_template_id": 123456789
   *         },
   *         {
   *             "variant_id": 1,
   *             "quantity": 2,
   *             "product_template_id": 11235813
   *         },
   *     ]
   *     ...
   * ```
   *
   * **Important note**: you can only create orders from templates for variant IDs from the Catalog API.
   *
   * More examples are available [here](#tag/Examples/Orders-API-examples/Using-a-product-template).
   *
   * ### Retail costs
   *
   * Printful allows you to specify your retail costs for the order so that the packing slip for international orders can
   * contain your correct retail prices. To enable retail costs, each item in the order has to contain the `retail_price`
   * attribute. You can also specify a custom discount sum, shipping costs and taxes in the `retail_costs` object when
   * creating the order. If the retail costs are missing, the packing slip will contain the Printful prices instead.
   *
   * ### Native inside label
   *
   * Printful previously allowed customers to upload a fully customized inside label. Since these labels had to contain
   * specific information about fabric composition, manufacturing, etc. to meet the legal requirements, users usually
   * encountered issues to get their labels printed.
   *
   * Inside labels are printed on the inside of the garment and require the removal of the original manufacturer's tag.
   * They're only available for apparel with tear-away labels. An inside label must include the country of manufacturing
   * origin, original garment size, and material information. To use our native label template you only need to upload a
   * graphic (such as your brand's logo). The mandatory content will be generated and placed automatically.
   *
   * ```
   * ...
   * "files":[
   *         {
   *             "type": "label_inside",
   *             "url": "http://example.com/logo/123/image.jpg",
   *             "options": [{
   *                 "id": "template_type",
   *                 "value": "native"
   *             }]
   *         },
   * ],
   * ...
   * ```
   *
   * Printful previously supported fully customized inside labels. These have now been deprecated. The ability to create orders with fully customized inside labels has been limited to only users who were actively using them in their stores before April 2020. This feature is no longer accessible to new users.
   *
   * ### Ordering embroidery products
   *
   * Embroidery is a technique which uses colored threads, sewn into a product, to recreate provided design. In order to use embroidery technique you first need to check if selected product support embroidery technique.
   *
   * In order to do that you need to use [Catalog API](#tag/Catalog-API) to determine if the selected product or variant contains `EMBROIDERY` technique.
   * ```
   * "techniques": [
   *                 {
   *                     "key": "EMBROIDERY",
   *                     "display_name": "Embroidery",
   *                     "is_default": true
   *                 }
   *             ]
   * ```
   * After that you need to also get list of available embroidery placements. Those are listed under `file` property with `embroidery_` prefix. You can get list of all available placements in [Placements](#tag/Common/Placements).
   *
   * <details>
   *     <summary>Example of file property</summary>
   *
   * ```
   * "files": [
   *                 {
   *                     "id": "default",
   *                     "type": "embroidery_front",
   *                     "title": "Front",
   *                     "additional_price": null
   *                 },
   *                 {
   *                     "id": "back",
   *                     "type": "embroidery_back",
   *                     "title": "Back",
   *                     "additional_price": "3.75"
   *                 },
   *                 {
   *                     "id": "left",
   *                     "type": "embroidery_left",
   *                     "title": "Left side",
   *                     "additional_price": "3.75"
   *                 },
   *                 {
   *                     "id": "right",
   *                     "type": "embroidery_right",
   *                     "title": "Right side",
   *                     "additional_price": "3.75"
   *                 },
   *                 {
   *                     "id": "preview",
   *                     "type": "mockup",
   *                     "title": "Mockup",
   *                     "additional_price": null
   *                 }
   *             ]
   * ```
   *
   * </details>
   *
   * To create an order using embroidery technique you can:
   *
   * - Provide thread colors manually [See example](#tag/Common/Embroidery/Manually-defining-thread-colors)
   * - Use automatic thread color detection [See example](#tag/Common/Embroidery/Automatic-thread-color)
   *
   * Finally, you can make an order using embroidery
   * technique [See example](#tag/Examples/Orders-API-examples/Using-embroidery-products). Depending on the placement that you've
   * used you need to specify the correct [thread color option](#tag/Common/Options).
   *
   * ### Packing slip
   *
   * The packing slip fields can be configured at the store level and overridden for a specific order.
   *
   * The packing slip settings can be found in Dashboard at **Settings > Stores > Branding > Packing slip section**.
   *
   * To override the packing slip settings for the order, you can use `packing_slip` or `gift` fields.
   *
   * Below you can find an example or a packing slip for a shipment with explained fields.
   *
   * ![packing slip](images/sample_packing_slip.png)
   *
   * Field annotations:
   *
   * * **(1)** Barcode unique for the shipment.
   * * **(2)** Store logo defined in the store settings or overridden using `packing_slip.logo_url` field. The provided image is converted to a grayscale/1-bit monochrome image.
   * * **(3)** The date of the shipment.
   * * **(4)** Packing slip number consisting of order and shipment IDs in Printful database, divided with a hyphen.
   * * **(5)** The country from which the shipment is made. If the recipient is in the United States, this field will be
   *   absent.
   * * **(6)** Recipient address with phone, without email address.
   * * **(7)** Store name. This can be overridden using `packing_slip.store_name`.
   * * **(8)** The address to which the shipment should be returned. By default it will be a Printful’s return address, but
   *   you can set your own address in the store settings (**Settings > Stores > Returns > Return address section**).
   * * **(9)** The customer service phone number defined in the store settings or overridden using `packing_slip.phone`
   *   field.
   * * **(10)** The customer service email address defined in the store settings or overridden using `packing_slip.email`
   *   field.
   * * **(11)** Gift message. This is only present if the `gift` field was provided in the order request.
   * * **(12)** The order creation date.
   * * **(13)** Printful Order ID which can be overridden using `packing_slip.custom_order_id` field.
   * * **(14)** The list of order items with quantities. The items’ display names are localized, using the recipient’s
   *   country and include variant information such as color and size e.g. „Unisex Staple T-Shirt | Bella + Canvas 3001 (
   *   Lilac / M)”.
   * * **(15)** The packing slip message defined in the store settings or overridden using `packing_slip.message` field.
   *
   * ### More Orders API examples
   *
   * See the [examples section](#tag/Examples/Orders-API-examples) for more sample requests on how Orders API can be used in
   * different scenarios.
   *
   * ### Custom border color option
   *
   * Stickers can have a different border color which can be set by using the `thread_colors_outline` option.
   * This option is available in `options` for stickers. To showcase the usage we will use the order flow
   * which will create order with a sticker that will have a red border color:
   *
   * Endpoint `POST https://api.printful.com/orders`
   * <details>
   *     <summary>Request body</summary>
   *
   * ```
   * {
   *     "shipping": "STANDARD",
   *     "recipient": {
   *         "name": "John Smith",
   *         "address1": "19749 Dearborn St",
   *         "city": "Chatsworth",
   *         "country_code": "US",
   *         "state_code": "CA",
   *         "zip": "91311"
   *     },
   *     "items": [
   *         {
   *             "variant_id": 10163,
   *             "files": [
   *                 {
   *                     "type": "default",
   *                     "url": "https://www.printful.com/static/images/layout/printful-logo.png"
   *                 }
   *             ],
   *             "options": [
   *                 {
   *                     "id": "custom_border_color",
   *                     "value": "#FF0000"
   *                 }
   *             ]
   *         }
   *     ]
   * }
   * ```
   *
   * </details>
   */
  orders: API.Orders = new API.Orders(this);
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
   *
   */
  files: API.Files = new API.Files(this);
  sync: API.Sync = new API.Sync(this);
  /**
   * The Shipping rate API calculates the shipping rates for an order based on the recipient's location and the contents of
   * the order.
   *
   * The returned shipping rate ID can be used to specify the shipping method when creating an order.
   *
   * See [Country/State Code API](#tag/CountryState-Code-API) for information about the Country codes.
   *
   * See [Catalog API](#tag/Catalog-API) for information about the Variant IDs.
   *
   * <div class="alert alert-info">
   * <p><strong>Note:</strong> The shipping rates endpoints are meant to be called only right before placing an order to display
   * available shipping rates and methods.</p>
   *
   * Dynamic shipping rates can change even in the span of one hour because it takes live facility and carrier information
   * into account. Different rates may be calculated for different products, quantities and recipient data.
   *
   * Even daily downloads of this data, reused only for identical orders, can result in mismatches between the displayed
   * rates and the charged rates, potentially resulting in customer dissatisfaction.
   *
   * A CSV file containing flat rates data for different categories of products may be downloaded
   * from https://www.printful.com/shipping-rates-report/shipping-rates-report/download and hardcoded to reduce the shipping
   * rate volume massively if you use flat rate shipping.
   * </div>
   *
   * **Rate limiting:** The default rate limit is 120 requests per 60 seconds.
   *
   * <div class="alert alert-danger">
   *   <strong>Warning:</strong> If the summary item quantity count exceeds 100 then the rate limit
   * is changed to 5 requests per 60 seconds.
   * </div>
   *
   * A 60 seconds lockout is applied if request count is exceeded.
   */
  shipping: API.Shipping = new API.Shipping(this);
  /**
   * To create an order, you have to use country and state codes to specify the recipient address. Both country code and state code are mandatory for orders to the USA, Canada and Australia. For other countries only the country code is needed to create an order.
   *
   * Country codes are based on the ISO 3166-1 alpha-2 standard and are two letters long.
   *
   * State codes are based on the ISO 3166-2 standard by omitting the country code part of the code and are used only for the USA, Canada, Japan and Australia.
   *
   * All state/country codes that Printful accepts can be listed by this API.
   *
   */
  countries: API.Countries = new API.Countries(this);
  /**
   *
   */
  tax: API.Tax = new API.Tax(this);
  /**
   * To generate mockups, first, you need to decide on which products you want them. API methods on retrieving products and
   * variants can be found in the [Catalog API](#tag/Catalog-API).
   *
   * **Note**: Remember to distinguish the difference between a product id and a variant id. Some API endpoints require an id
   * from a variant and some from a product.
   *
   * **Important**: Jewelry products are not supported via API.
   *
   * ### Print files
   *
   * A print file defines resolution which should be used to create a mockup or to submit an actual order.
   *
   * Information about product variant print files can be retrieved from the [print file endpoint](#operation/getPrintfiles).
   *
   * For example, a 10×10 poster requires a 1500×1500 pixel print file to produce a 150 DPI print. You can use higher
   * resolution files to achieve a better result, but keep the side aspect ratio the same as the defined for the print file.
   * That means, if you use a 3000×3000 pixel file, it will produce a 300 DPI print. But if you use a 3000×1500 pixel file (
   * different aspect ratio) on a 10×10 poster, some cropping will occur. Print file's `fill_mode` parameter defines if
   * cropping will happen, or the file will be fitted on the resulting print area of the product.
   *
   * Some print files can be rotated. `can_rotate` field defines this feature. This mostly applies to wall art products and
   * should be used if you want to generate a horizontal or a vertical product mockup.
   *
   * Wall art print files are defined horizontally. If you wish to create a vertical mockup, you can rotate the file's print
   * file and the generated mockup will be in the given orientation. For example, 16×12 poster print file is 2400×1800 pixels
   * which generate it horizontally. If you wish to get a vertical mockup, you create the print file as 1800×2400 pixels. The
   * same strategy applies when you submit an order.
   *
   * Print files are often re-used for multiple variants and products. For example, a 14×14 poster uses the same print file
   * as a framed poster. Most of the t-shirt front prints use the same print file too.
   *
   * **Note**: When you generate mockups there is no need to provide a full-sized print file. Mockups are generated up to
   * 2000px wide, so you can downscale your print file to 2000px. This will reduce the processing time on your and Printful's
   * side. Print file image file size limit: 50MB.
   *
   * ### Mockup generation
   *
   * Mockup generation requires some time, that is why it cannot happen in real-time.
   *
   * When you request a mockup to be generated, a task is created and you receive the task key which can then be used to
   * retrieve the generated mockup list. We cannot guarantee that after a certain time the mockups will be generated, so you
   * will have to check frequently if the task is done. The first request for a result should not be sooner than 10 seconds.
   * So plan that the generation task will be done in two steps - creating a task and the checking with intervals if the task
   * is ready.
   *
   * <div class="alert alert-info">
   * <strong>Important</strong><br>
   * URLs to mockup images are temporary, they will expire after 72h, so you have to store them on your
   * server.
   * </div>
   *
   * ### Process flow
   *
   * 1. Decide which product variants you want to generate.
   *
   * 2. Retrieve the list of print files for chosen product and variants. Use the variant print file mappings to determine
   *    which print file you need to generate for specific placement on a specific product's variant.
   *
   * 3. Upload your file to a public URL that matches the print file size ratio (or provide positions for the generation
   *    request)
   *
   * 4. Create a mockup generation task and store the task key.
   *
   * 5. Use the task key to check if the task is completed. If still pending, repeat after an interval.
   *
   * 6. When the task is done, download and store mockups on your server. Mockup URLs are temporary and will be removed after
   *    a day.
   *
   * ### Available techniques
   *
   * The `/mockup-generator/printfiles/{id}` and `/mockup-generator/templates/{id}` endpoint accept `technique` parameter.
   *
   * The following table presents the available values of this parameter.
   *
   * | Value         | Description           |
   * |---------------|-----------------------|
   * | `DIGITAL`     | Digital printing      |
   * | `CUT-SEW`     | Cut & sew sublimation |
   * | `UV`          | UV printing           |
   * | `EMBROIDERY`  | Embroidery            |
   * | `SUBLIMATION` | Sublimation           |
   * | `ENGRAVING`   | Engraving             |
   * | `DTG`         | DTG printing          |
   *
   * ### Usage example
   *
   * Let's take an example. You want to offer users to design of their t-shirt.
   *
   * We'll pick this shirt as an example
   * [Bella + Canvas 3001 Unisex T-shirt](https://www.printful.com/custom/mens/t-shirts/unisex-staple-t-shirt-bella-canvas-3001)
   *
   * Its product id is `71`.
   *
   * Let's fetch some variants available for this shirt:
   * `https://api.printful.com/products/71`
   *
   * We'll choose a white and black shirt in M, L, XL sizes. Respective variant ids:
   * `4012`, `4013`, `4014`, `4017`, `4018` and `4019`.
   *
   * Next, we need to get the print file sizes for these variants:
   * `https://api.printful.com/mockup-generator/printfiles/71`
   *
   * We see that there are two placements available for this product - `front` and `back`. Posters, for example, will only
   * have one placement called `default`.
   *
   * By looking up our picked variant ids, we see that they all use the same print file for back and front prints:
   *
   * ```json
   * {
   *   "product_id": 71,
   *   "available_placements": {
   *     "front": "Front print",
   *     "back": "Back print",
   *     "label_outside": "Outside label"
   *   },
   *   "printfiles": [
   *     {
   *       "printfile_id": 1,
   *       "width": 1800,
   *       "height": 2400,
   *       "dpi": 150,
   *       "fill_mode": "fit",
   *       "can_rotate": false
   *     }
   *   ],
   *   "variant_printfiles": [
   *     {
   *       "variant_id": 4012,
   *       "placements": {
   *         "front": 1,
   *         "back": 1
   *       }
   *     }
   *   ]
   * }
   * ```
   *
   * - `dpi` For given width and height, this is the resulting DPI on the actual product.
   *
   * - `fill_mode` Possible values: "fit" or "cover". Indicates in what mode mockups will be generated.
   *
   * - `can_rotate` Posters, for example, allow rotation. If you pass the image in horizontal positions.
   *
   * - `placements.front` Printfile id.
   *
   * We can see that the full print file size is 1800×2400 for back and front prints for chosen variants.
   *
   * When we know the size of the print file, we need to calculate the positions. Position values are relative here, image
   * size does not have to match the width and height of positions. When mockup is generated we will fit the position area
   * inside the print area or will cover it, depending on the print file `fill_mode` value.
   *
   * Positions given below would result in a square image centered vertically within the print area.
   *
   * ```json
   * {
   *   "area_width": 1800,
   *   "area_height": 2400,
   *   "width": 1800,
   *   "height": 1800,
   *   "top": 300,
   *   "left": 0
   * }
   * ```
   *
   * - `area_width` Relative width of the print area.
   *
   * - `area_height` Relative height of the print area.
   *
   * - `width` Relative width of your image.
   *
   * - `height` Relative height of your image.
   *
   * - `top` Relative image top offset within the area.
   *
   * - `left` Relative image left offset within the area.
   *
   * <div class="alert alert-info">
   * <strong>Important</strong><br>
   * For posters, canvas, and other products which print files allow rotation (<code>can_rotate</code> value in <a href="#operation/getPrintfiles">print file response</a>) you
   * can flip width and height to create a product mockup that is horizontal or vertical.
   * </div>
   *
   * Once we have calculated the positions, we can perform the actual mockup generation using
   * the [mockup generator endpoint](#operation/createGeneratorTask):
   * `POST` to `https://api.printful.com/mockup-generator/create-task/71` with body parameters:
   *
   * ```json
   * {
   *   "variant_ids": [
   *     4012,
   *     4013,
   *     4014,
   *     4017,
   *     4018,
   *     4019
   *   ],
   *   "format": "jpg",
   *   "files": [
   *     {
   *       "placement": "front",
   *       "image_url": "http://your-site/path-to-front-printfile.jpg",
   *       "position": {
   *         "area_width": 1800,
   *         "area_height": 2400,
   *         "width": 1800,
   *         "height": 1800,
   *         "top": 300,
   *         "left": 0
   *       }
   *     },
   *     {
   *       "placement": "back",
   *       "image_url": "http://your-site/path-to-back-printfile.jpg",
   *       "position": {
   *         "area_width": 1800,
   *         "area_height": 2400,
   *         "width": 1800,
   *         "height": 1800,
   *         "top": 300,
   *         "left": 0
   *       }
   *     }
   *   ]
   * }
   * ```
   *
   * In response, you will receive the task key and current task status:
   *
   * ```json
   * {
   *   "task_key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
   *   "status": "pending"
   * }
   * ```
   *
   * After an interval of a few seconds, you can try to check for the result by calling a `GET` request
   * on `https://api.printful.com/mockup-generator/task?task_key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   * If the task is completed, the response will be like this:
   *
   * ```json
   * {
   *   "task_key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
   *   "status": "completed",
   *   "mockups": [
   *     {
   *       "variant_ids": [
   *         4011,
   *         4012,
   *         4013
   *       ],
   *       "placement": "front",
   *       "mockup_url": "https://url-to/front-mockup.png"
   *     },
   *     {
   *       "variant_ids": [
   *         4011,
   *         4012,
   *         4013
   *       ],
   *       "placement": "back",
   *       "mockup_url": "https://url-to/back-mockup.png"
   *     },
   *     {
   *       "variant_ids": [
   *         4016,
   *         4017,
   *         4018
   *       ],
   *       "placement": "front",
   *       "mockup_url": "https://url-to/front-mockup.png"
   *     },
   *     {
   *       "variant_ids": [
   *         4016,
   *         4017,
   *         4018
   *       ],
   *       "placement": "back",
   *       "mockup_url": "https://url-to/back-mockup.png"
   *     }
   *   ]
   * }
   * ```
   *
   * At this point, you just have to download the mockup URLs and store them on your server and you're good to go!
   *
   * ### Layout templates
   *
   * If you wish to build your mockup generator UI, this is the place to start. Using
   * the [layout template endpoint](#operation/getPrintfiles)
   * you can get template images and positions necessary to create a tool where your users can position their files on.
   *
   * If you want to create a mug generator, for example, you call the endpoint `/mockup-generator/templates/19` with mug
   * product ID. By looking at the variant mapping field, we can determine that for variant `1320` 11oz mug we have to use
   * the template with ID `919`. This is what template structure looks like:
   *
   * ```json
   * {
   *   "template_id": 919,
   *   "image_url": "https://www.printful.com/files/generator/40/11oz_template.png",
   *   "background_url": null,
   *   "background_color": null,
   *   "printfile_id": 43,
   *   "template_width": 560,
   *   "template_height": 295,
   *   "print_area_width": 520,
   *   "print_area_height": 202,
   *   "print_area_top": 18,
   *   "print_area_left": 20,
   *   "is_template_on_front": true
   * }
   * ```
   *
   * - `printfile_id` We can retrieve the actual printfile size from the printfiles endpoint.
   *
   * - `template_width` This is the main container width, pixels.
   *
   * - `template_height` Main container height.
   *
   * - `print_area_width` Inner area where positioning happens.
   *
   * - `print_area_height` Inner area.
   *
   * - `print_area_top` Offset from the main container.
   *
   * - `print_area_left` Offset from the main container.
   *
   * - `is_template_on_front` This indicates if we should show the user image below or above the template image.
   *
   * Given this information, we can create a simple HTML markup:
   *
   * ```html
   *
   * <div style="position: relative; width: 520px; height: 295px;">
   *     <div style="position: absolute; width: 520px; height: 202px; top:18px; left:20px; background:rgba(255,233,230,0.33)">
   *         <img alt="Printful logo" src="https://printful.com/static/images/layout/logo-printful.png"
   *              style="position: absolute; left: 43px; top: 77px; width: 140px; height: 63px;">
   *     </div>
   *     <div style="position: absolute; width: 560px; height: 295px; background:url(/files/generator/40/11oz_template.png) center center no-repeat"></div>
   * </div>
   * ```
   *
   * Which would look like this in the browser:
   *
   * <div style="position: relative; width: 520px; height: 295px;">
   *     <div style="position: absolute; width: 520px; height: 202px; top:18px; left:20px; background:rgba(255,233,230,0.33)">
   *         <img src="https://printful.com/static/images/layout/logo-printful.png" alt="Printful logo"
   *              style="position: absolute; left: 43px; top: 77px; width: 140px; height: 63px;">
   *     </div>
   *     <div style="position: absolute; width: 560px; height: 295px; background:url(/files/generator/40/11oz_template.png) center center no-repeat"></div>
   * </div>
   *
   * To generate mockups with positions above, we perform a `POST` request
   * to `https://api.printful.com/mockup-generator/create-task/19` with body parameters:
   *
   * ```json
   * {
   *   "variant_ids": [
   *     1320
   *   ],
   *   "format": "jpg",
   *   "files": [
   *     {
   *       "placement": "default",
   *       "image_url": "https://www.printful.test/static/images/layout/logo-printful.png",
   *       "position": {
   *         "area_width": 520,
   *         "area_height": 202,
   *         "width": 140,
   *         "height": 63,
   *         "top": 77,
   *         "left": 43
   *       }
   *     }
   *   ]
   * }
   * ```
   *
   * - `area_width` Value of print_area_width in the template.
   * - `area_height` Value of print_area_height in the template.
   * - `width` Image width.
   * - `height` Image height.
   * - `top` Image top offset in area.
   * - `left` Image left offset in area.
   *
   *
   * ### Choosing mockup styles
   *
   * To choose which mockup styles to generate, you have to specify `options` and `option_groups` parameters in the request. If these parameters are not present in the request, the system will generate the first available mockup. If you are not planning to utilize all available mockups, it is advised to limit the requested mockups. Not limiting requested mockups will cause bigger task processing times and overall resource waste.
   *
   * To find available `options` and `option_groups` for a given product, you have to use `/mockup-generator/printfiles/{id}` endpoint and search for `options` and `option_groups` fields in the response. See examples below.
   *
   * ```
   * {
   *     "variant_ids": [4021],
   *     "format": "png",
   *     "option_groups": ["Flat"],
   *     "options": ["Front"],
   *     "files": [
   *         {
   *             "placement": "front",
   *             "image_url": "https://www.printful.com/static/images/layout/logo-printful.png"
   *         }
   *     ]
   * }
   * ```
   *
   * ### Using lifelike effect
   *
   * Lifelike is a feature that simulates how dark designs will look over dark colour products and is only used in mockup generation. For that, an extra file with special effect is created for each placement.
   *
   * ```
   * {
   *     "variant_ids": [4018],
   *     "format": "png",
   *     "product_options": {
   *       "lifelike": true
   *     },
   *     "files": [
   *         {
   *             "placement": "front",
   *             "image_url": "https://www.printful.com/static/images/layout/logo-printful.png"
   *         }
   *     ]
   * }
   * ```
   *
   * | Mockup without lifelike                        | Mockup with lifelike                        |
   * |------------------------------------------------|---------------------------------------------|
   * | ![Image](images/lifelike/without_lifelike.png) | ![Image](images/lifelike/with_lifelike.png) |
   *
   */
  mockupGenerator: API.MockupGenerator = new API.MockupGenerator(this);
  warehouse: API.Warehouse = new API.Warehouse(this);
  /**
   * Approval Sheets API
   */
  approvalSheets: API.ApprovalSheets = new API.ApprovalSheets(this);
  /**
   * Webhooks are an API feature that allows your system to receive notifications about certain events.
   *
   * When an event occurs, the Printful server ([Webhook Simulator](https://www.printful.com/api/webhook-simulator))
   * will make a POST request to your defined
   * URL that will contain a JSON object in the request body.
   * Your server has to respond with HTTP status `2xx OK`,
   * otherwise, the request will be retried in increasing intervals
   * (after 1, 4, 16, 64, 256 and 1024 minutes).
   *
   * The JSON object will always contain these attributes:
   * <table>
   *     <tr>
   *         <td><strong>type</strong></td>
   *         <td>string</td>
   *         <td>Event type</td>
   *     </tr>
   *     <tr>
   *         <td><strong>created</strong></td>
   *         <td>timestamp</td>
   *         <td>Event time</td>
   *     </tr>
   *     <tr>
   *         <td><strong>retries</strong></td>
   *         <td>integer</td>
   *         <td>Number of previous attempts to deliver this webhook event</td>
   *     </tr>
   *     <tr>
   *         <td><strong>store</strong></td>
   *         <td>integer</td>
   *         <td>ID of the store that the event occured to</td>
   *     </tr>
   *     <tr>
   *         <td><strong>data</strong></td>
   *         <td>Object</td>
   *         <td>Additional data, depending on the event type</td>
   *     </tr>
   * </table>
   *
   * Please use [Webhook Simulator](https://www.printful.com/api/webhook-simulator) to test your webhook event receiver.
   *
   * To set up webhooks, use API requests described below:
   */
  webhooks: API.Webhooks = new API.Webhooks(this);
  /**
   * OAuth API allows receiving data for token
   */
  oauth: API.OAuth = new API.OAuth(this);
  /**
   * The Reports API lets you retrieve reports like the statistics related to the orders fulfilled for your stores.
   *
   */
  reports: API.Reports = new API.Reports(this);
  /**
   *
   */
  store: API.Store = new API.Store(this);
}

Printful.Products = Products;
Printful.Categories = Categories;
Printful.ProductTemplates = ProductTemplates;
Printful.Orders = Orders;
Printful.Files = Files;
Printful.Sync = Sync;
Printful.Shipping = Shipping;
Printful.Countries = Countries;
Printful.Tax = Tax;
Printful.MockupGenerator = MockupGenerator;
Printful.Warehouse = Warehouse;
Printful.ApprovalSheets = ApprovalSheets;
Printful.Webhooks = Webhooks;
Printful.OAuth = OAuth;
Printful.Reports = Reports;
Printful.Store = Store;

export declare namespace Printful {
  export type RequestOptions = Opts.RequestOptions;

  export {
    Products as Products,
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

  export {
    Categories as Categories,
    type CategoryRetrieveResponse as CategoryRetrieveResponse,
    type CategoryListResponse as CategoryListResponse,
  };

  export {
    ProductTemplates as ProductTemplates,
    type ProductTemplateRetrieveResponse as ProductTemplateRetrieveResponse,
    type ProductTemplateListResponse as ProductTemplateListResponse,
    type ProductTemplateDeleteResponse as ProductTemplateDeleteResponse,
    type ProductTemplateListParams as ProductTemplateListParams,
  };

  export {
    Orders as Orders,
    type Address as Address,
    type Costs as Costs,
    type Gift as Gift,
    type IncompleteItem as IncompleteItem,
    type Item as Item,
    type Option as Option,
    type Order as Order,
    type OrderShipmentItem as OrderShipmentItem,
    type PricingBreakdown as PricingBreakdown,
    type RetailCosts as RetailCosts,
    type Shipment as Shipment,
    type OrderCreateResponse as OrderCreateResponse,
    type OrderRetrieveResponse as OrderRetrieveResponse,
    type OrderUpdateResponse as OrderUpdateResponse,
    type OrderListResponse as OrderListResponse,
    type OrderCancelResponse as OrderCancelResponse,
    type OrderConfirmResponse as OrderConfirmResponse,
    type OrderEstimateCostsResponse as OrderEstimateCostsResponse,
    type OrderCreateParams as OrderCreateParams,
    type OrderRetrieveParams as OrderRetrieveParams,
    type OrderUpdateParams as OrderUpdateParams,
    type OrderListParams as OrderListParams,
    type OrderCancelParams as OrderCancelParams,
    type OrderConfirmParams as OrderConfirmParams,
    type OrderEstimateCostsParams as OrderEstimateCostsParams,
  };

  export {
    Files as Files,
    type FileCreateResponse as FileCreateResponse,
    type FileRetrieveResponse as FileRetrieveResponse,
    type FileGetThreadColorsResponse as FileGetThreadColorsResponse,
    type FileCreateParams as FileCreateParams,
    type FileRetrieveParams as FileRetrieveParams,
    type FileGetThreadColorsParams as FileGetThreadColorsParams,
  };

  export { Sync as Sync };

  export {
    Shipping as Shipping,
    type ShippingCalculateRatesResponse as ShippingCalculateRatesResponse,
    type ShippingCalculateRatesParams as ShippingCalculateRatesParams,
  };

  export { Countries as Countries, type CountryListResponse as CountryListResponse };

  export {
    Tax as Tax,
    type TaxCalculateRateResponse as TaxCalculateRateResponse,
    type TaxListCountriesResponse as TaxListCountriesResponse,
    type TaxCalculateRateParams as TaxCalculateRateParams,
  };

  export {
    MockupGenerator as MockupGenerator,
    type MockupGeneratorCreateTaskResponse as MockupGeneratorCreateTaskResponse,
    type MockupGeneratorRetrievePrintfilesResponse as MockupGeneratorRetrievePrintfilesResponse,
    type MockupGeneratorRetrieveTaskResultResponse as MockupGeneratorRetrieveTaskResultResponse,
    type MockupGeneratorRetrieveTemplatesResponse as MockupGeneratorRetrieveTemplatesResponse,
    type MockupGeneratorCreateTaskParams as MockupGeneratorCreateTaskParams,
    type MockupGeneratorRetrievePrintfilesParams as MockupGeneratorRetrievePrintfilesParams,
    type MockupGeneratorRetrieveTaskResultParams as MockupGeneratorRetrieveTaskResultParams,
    type MockupGeneratorRetrieveTemplatesParams as MockupGeneratorRetrieveTemplatesParams,
  };

  export { Warehouse as Warehouse };

  export {
    ApprovalSheets as ApprovalSheets,
    type ApprovalSheetListResponse as ApprovalSheetListResponse,
    type ApprovalSheetApproveResponse as ApprovalSheetApproveResponse,
    type ApprovalSheetSubmitChangesResponse as ApprovalSheetSubmitChangesResponse,
    type ApprovalSheetListParams as ApprovalSheetListParams,
    type ApprovalSheetApproveParams as ApprovalSheetApproveParams,
    type ApprovalSheetSubmitChangesParams as ApprovalSheetSubmitChangesParams,
  };

  export {
    Webhooks as Webhooks,
    type WebhookInfo as WebhookInfo,
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookRetrieveParams as WebhookRetrieveParams,
    type WebhookDeleteParams as WebhookDeleteParams,
  };

  export { OAuth as OAuth, type OAuthListScopesResponse as OAuthListScopesResponse };

  export {
    Reports as Reports,
    type ReportRetrieveStatisticsResponse as ReportRetrieveStatisticsResponse,
    type ReportRetrieveStatisticsParams as ReportRetrieveStatisticsParams,
  };

  export {
    Store as Store,
    type StoreRetrieveResponse as StoreRetrieveResponse,
    type StoreListResponse as StoreListResponse,
    type StoreUpdatePackingSlipResponse as StoreUpdatePackingSlipResponse,
    type StoreUpdatePackingSlipParams as StoreUpdatePackingSlipParams,
  };

  export type File = API.File;
  export type FileOption = API.FileOption;
  export type ItemOption = API.ItemOption;
  export type PackingSlip = API.PackingSlip;
  export type Paging = API.Paging;
  export type ProductVariant = API.ProductVariant;
  export type SyncProduct = API.SyncProduct;
  export type SyncVariant = API.SyncVariant;
}
