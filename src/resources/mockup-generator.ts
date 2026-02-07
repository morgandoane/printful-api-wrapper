// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class MockupGenerator extends APIResource {
  /**
   * Creates an asynchronous mockup generation task. Generation result can be
   * retrieved using mockup generation task retrieval endpoint.
   *
   * **Rate limiting**: Up to 10 requests per 60 seconds for established stores; 2
   * requests per 60 seconds for new stores. Currently available rate is returned in
   * response headers. A 60 seconds lockout is applied if request count is exceeded.
   * We also limit the number of files that may be generated to 20,000 files per
   * account in a 24-hour period.
   *
   * @example
   * ```ts
   * const response = await client.mockupGenerator.createTask(0);
   * ```
   */
  createTask(
    id: number,
    params: MockupGeneratorCreateTaskParams,
    options?: RequestOptions,
  ): APIPromise<MockupGeneratorCreateTaskResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...body } = params;
    return this._client.post(path`/mockup-generator/create-task/${id}`, {
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
   * List of printfiles available for products variants. Printfile indicates what
   * file resolution should be used to create a mockup or submit an order.
   *
   * <div class="alert alert-info">
   * This endpoint uses DTG as a default printing technique for products
   * with more than one technique available. For products with DTG and more
   * techniques available please specify the correct technique in query by using
   * the `technique` parameter. For more information read the <a href="#tag/Examples/Mockup-Generator-API-examples">examples</a>.
   * </div>
   *
   * @example
   * ```ts
   * const response =
   *   await client.mockupGenerator.retrievePrintfiles(0);
   * ```
   */
  retrievePrintfiles(
    id: number,
    params: MockupGeneratorRetrievePrintfilesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MockupGeneratorRetrievePrintfilesResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...query } = params ?? {};
    return this._client.get(path`/mockup-generator/printfiles/${id}`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Returns asynchronous mockup generation task result. If generation task is
   * completed, it will contain a list of generated mockups.
   *
   * @example
   * ```ts
   * const response =
   *   await client.mockupGenerator.retrieveTaskResult({
   *     task_key: 'task_key',
   *   });
   * ```
   */
  retrieveTaskResult(
    params: MockupGeneratorRetrieveTaskResultParams,
    options?: RequestOptions,
  ): APIPromise<MockupGeneratorRetrieveTaskResultResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...query } = params;
    return this._client.get('/mockup-generator/task', {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Retrieve list of templates that can be used for client-side positioning.
   *
   * <div class="alert alert-info">
   * This endpoint uses DTG as a default printing technique for product layouts
   * with more than one technique available. For products with DTG and more
   * techniques available please specify the correct technique in query by using
   * the `technique` parameter. For more information read the <a href="#tag/Examples/Mockup-Generator-API-examples">examples</a>.
   * </div>
   *
   * @example
   * ```ts
   * const response =
   *   await client.mockupGenerator.retrieveTemplates(0);
   * ```
   */
  retrieveTemplates(
    id: number,
    params: MockupGeneratorRetrieveTemplatesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MockupGeneratorRetrieveTemplatesResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...query } = params ?? {};
    return this._client.get(path`/mockup-generator/templates/${id}`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xPfStoreID != null ? { 'X-PF-Store-Id': xPfStoreID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }
}

export interface MockupGeneratorCreateTaskResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * GenerationTask
   */
  result?: MockupGeneratorCreateTaskResponse.Result;
}

export namespace MockupGeneratorCreateTaskResponse {
  /**
   * GenerationTask
   */
  export interface Result {
    /**
     * If task has failed, reason will be provided here.
     */
    error?: string;

    /**
     * If task is completed, list of mockups will be provided here.
     */
    mockups?: Array<Result.Mockup>;

    /**
     * If task is completed, list of printfiles will be provided here.
     */
    printfiles?: Array<Result.Printfile>;

    /**
     * Status of the generation task.
     */
    status?: 'pending' | 'completed' | 'failed';

    /**
     * Task identifier you will use to retrieve generated mockups.
     */
    task_key?: string;
  }

  export namespace Result {
    /**
     * Generation task mockup.
     */
    export interface Mockup {
      /**
       * This is a name that can be displayed to end customers.
       */
      display_name?: string;

      /**
       * Optional extra mockups.
       */
      extra?: Array<Mockup.Extra>;

      /**
       * Placement identifier.
       */
      placement?: string;

      /**
       * List of variant ids this mockup is used for. One mockup can be used for multiple
       * variants.
       */
      variant_ids?: Array<number>;
    }

    export namespace Mockup {
      /**
       * Generation task extra mockup
       */
      export interface Extra {
        /**
         * Style option name
         */
        option?: string;

        /**
         * Style option group name
         */
        option_group?: string;

        /**
         * Display name of the extra mockup.
         */
        title?: string;

        /**
         * Temporary URL of the mockup.
         */
        url?: string;
      }
    }

    /**
     * Generated File placements and URLs.
     */
    export interface Printfile {
      /**
       * Placement identifier (front, back, etc.).
       */
      placement?: string;

      /**
       * Public URL where your file is stored.
       */
      url?: string;

      /**
       * List of variant IDs associated with printfiles.
       */
      variant_ids?: Array<number>;
    }
  }
}

export interface MockupGeneratorRetrievePrintfilesResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Printfile info
   */
  result?: MockupGeneratorRetrievePrintfilesResponse.Result;
}

export namespace MockupGeneratorRetrievePrintfilesResponse {
  /**
   * Printfile info
   */
  export interface Result {
    /**
     * List of available placements. Key is placement identifier, value is display
     * name. (e.g. {embroidery_front: Front, ..}).
     */
    available_placements?: unknown;

    option_groups?: Array<string>;

    options?: Array<string>;

    printfiles?: Array<Result.Printfile>;

    /**
     * Requested product id.
     */
    product_id?: number;

    variant_printfiles?: Array<Result.VariantPrintfile>;
  }

  export namespace Result {
    /**
     * Printfile
     */
    export interface Printfile {
      /**
       * Indicates if printfile can be rotated horizontally (e.g. for posters).
       */
      can_rotate?: boolean;

      /**
       * Resulting DPI for given width and height.
       */
      dpi?: number;

      /**
       * Indicates if printfile will be used in cover or fit mode. Cover mode can produce
       * cropping if side ratio does not match printfile.
       */
      fill_mode?: 'cover' | 'fit';

      /**
       * Height in pixels.
       */
      height?: number;

      /**
       * Unique printfile identifier.
       */
      printfile_id?: number;

      /**
       * Width in pixels.
       */
      width?: number;
    }

    export interface VariantPrintfile {
      /**
       * A key-value object mapping placement identifiers to printfile IDs.
       */
      placements?: unknown;

      variant_id?: number;
    }
  }
}

export interface MockupGeneratorRetrieveTaskResultResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * GenerationTask
   */
  result?: MockupGeneratorRetrieveTaskResultResponse.Result;
}

export namespace MockupGeneratorRetrieveTaskResultResponse {
  /**
   * GenerationTask
   */
  export interface Result {
    /**
     * If task has failed, reason will be provided here.
     */
    error?: string;

    /**
     * If task is completed, list of mockups will be provided here.
     */
    mockups?: Array<Result.Mockup>;

    /**
     * If task is completed, list of printfiles will be provided here.
     */
    printfiles?: Array<Result.Printfile>;

    /**
     * Status of the generation task.
     */
    status?: 'pending' | 'completed' | 'failed';

    /**
     * Task identifier you will use to retrieve generated mockups.
     */
    task_key?: string;
  }

  export namespace Result {
    /**
     * Generation task mockup.
     */
    export interface Mockup {
      /**
       * This is a name that can be displayed to end customers.
       */
      display_name?: string;

      /**
       * Optional extra mockups.
       */
      extra?: Array<Mockup.Extra>;

      /**
       * Placement identifier.
       */
      placement?: string;

      /**
       * List of variant ids this mockup is used for. One mockup can be used for multiple
       * variants.
       */
      variant_ids?: Array<number>;
    }

    export namespace Mockup {
      /**
       * Generation task extra mockup
       */
      export interface Extra {
        /**
         * Style option name
         */
        option?: string;

        /**
         * Style option group name
         */
        option_group?: string;

        /**
         * Display name of the extra mockup.
         */
        title?: string;

        /**
         * Temporary URL of the mockup.
         */
        url?: string;
      }
    }

    /**
     * Generated File placements and URLs.
     */
    export interface Printfile {
      /**
       * Placement identifier (front, back, etc.).
       */
      placement?: string;

      /**
       * Public URL where your file is stored.
       */
      url?: string;

      /**
       * List of variant IDs associated with printfiles.
       */
      variant_ids?: Array<number>;
    }
  }
}

export interface MockupGeneratorRetrieveTemplatesResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Product Template
   */
  result?: MockupGeneratorRetrieveTemplatesResponse.Result;
}

export namespace MockupGeneratorRetrieveTemplatesResponse {
  /**
   * Product Template
   */
  export interface Result {
    /**
     * List of conflicting placements. Used to determine which placements can be used
     * together.
     */
    conflicting_placements?: Array<Result.ConflictingPlacement>;

    /**
     * Recommended minimum DPI for given product.
     */
    min_dpi?: number;

    /**
     * List of templates. Use variant_mapping to determine which template corresponds
     * to which product variant.
     */
    templates?: Array<Result.Template>;

    /**
     * List of product variants mapped to templates. From this information you can
     * determine which template should be used for a variant.
     */
    variant_mapping?: Array<Result.VariantMapping>;

    /**
     * Resource version. If this changes, resources (positions, images, etc.) should be
     * re-cached.
     */
    version?: number;
  }

  export namespace Result {
    /**
     * Template placement conflict
     */
    export interface ConflictingPlacement {
      /**
       * List Placement IDs that are conflicting with given placement
       */
      conflicts?: Array<string>;

      /**
       * Placement ID
       */
      placement?: string;
    }

    /**
     * Template variant mapping
     */
    export interface Template {
      /**
       * HEX color code that should be used as a background color.
       */
      background_color?: number | null;

      /**
       * Background image URL (optional).
       */
      background_url?: string | null;

      /**
       * Main template image URL.
       */
      image_url?: string;

      /**
       * Should the main template image (image_url) be used as an overlay or as a
       * background.
       */
      is_template_on_front?: boolean;

      /**
       * Wall art product orientation. Possible values: horizontal, vertical, any
       */
      orientation?: 'horizontal' | 'vertical' | 'any';

      /**
       * Print area height (image is positioned in this area).
       */
      print_area_height?: number;

      /**
       * Print area left offset (offset in template).
       */
      print_area_left?: number;

      /**
       * Print area top offset (offset in template).
       */
      print_area_top?: number;

      /**
       * Print area width (image is positioned in this area).
       */
      print_area_width?: number;

      /**
       * Printfile ID that should be generated for this template. See
       * [printfile API endpoint](#operation/getPrintfiles) for list of Printfiles.
       */
      printfile_id?: number;

      /**
       * Height of the whole template in pixels.
       */
      template_height?: number;

      /**
       * Template ID.
       */
      template_id?: number;

      /**
       * Width of the whole template in pixels.
       */
      template_width?: number;
    }

    /**
     * Template variant mapping
     */
    export interface VariantMapping {
      /**
       * Array of Template Variant Mapping items
       */
      templates?: Array<VariantMapping.Template>;

      /**
       * Product variant ID.
       */
      variant_id?: number;
    }

    export namespace VariantMapping {
      /**
       * Template variant mapping item
       */
      export interface Template {
        /**
         * Placement ID.
         */
        placement?: string;

        /**
         * Corresponding template id which should be used for this variant and placement
         * combination.
         */
        template_id?: number;
      }
    }
  }
}

export interface MockupGeneratorCreateTaskParams {
  /**
   * Body param
   */
  files?: Array<MockupGeneratorCreateTaskParams.File>;

  /**
   * Body param: Generated file format. PNG will have a transparent background, JPG
   * will have a smaller file size.
   */
  format?: 'jpg' | 'png';

  /**
   * Body param: List of option group names you want to generate. Product's option
   * groups can be found in printfile API request.
   */
  option_groups?: Array<string>;

  /**
   * Body param: List of option names you want to generate. Product's options can be
   * found in printfile API request.
   */
  options?: Array<string>;

  /**
   * Body param: Key-value list of product options (embroidery thread, stitch
   * colors). Product options can be found in Catalog API endpoint.
   * [See examples](#tag/Common/Options)
   */
  product_options?: { [key: string]: unknown };

  /**
   * Body param: Product template ID. Use instead of files parameter.
   */
  product_template_id?: number;

  /**
   * Body param: List of variant ids you want to generate.
   */
  variant_ids?: Array<number>;

  /**
   * Body param: Width of the resulting mockup images (min 50, max 2000, default
   * is 1000)
   */
  width?: number;

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

export namespace MockupGeneratorCreateTaskParams {
  /**
   * Placement and file mapping to be generated.
   */
  export interface File {
    /**
     * Public URL where your file is stored.
     */
    image_url?: string;

    /**
     * Array of additional options for this file [See examples](#tag/Common/Options)
     */
    options?: Array<File.Option>;

    /**
     * Placement identifier (front, back, etc.).
     */
    placement?: string;

    /**
     * Position
     */
    position?: File.Position;
  }

  export namespace File {
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

    /**
     * Position
     */
    export interface Position {
      /**
       * Positioning area height on print area in pixels
       */
      area_height?: number | null;

      /**
       * Positioning area width on print area in pixels
       */
      area_width?: number | null;

      /**
       * Height of the image in given area in pixels
       */
      height?: number;

      /**
       * Image left offset in given area in pixels
       */
      left?: number;

      /**
       * Image top offset in given area in pixels
       */
      top?: number;

      /**
       * Width of the image in given area in pixels
       */
      width?: number;
    }
  }
}

export interface MockupGeneratorRetrievePrintfilesParams {
  /**
   * Query param: Optional orientation for wall art product printfiles. Allowed
   * values: horizontal, vertical
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Query param: Optional technique for product. This can be used in cases where
   * product supports multiple techniques like DTG and embroidery
   */
  technique?: string;

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

export interface MockupGeneratorRetrieveTaskResultParams {
  /**
   * Query param: Task key retrieved when creating the generation task.
   */
  task_key: string;

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

export interface MockupGeneratorRetrieveTemplatesParams {
  /**
   * Query param: Optional orientation for wall art product printfiles. Allowed
   * values: horizontal, vertical
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Query param: Optional technique for product. This can be used in cases where
   * product supports multiple techniques like DTG and embroidery
   */
  technique?: string;

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

export declare namespace MockupGenerator {
  export {
    type MockupGeneratorCreateTaskResponse as MockupGeneratorCreateTaskResponse,
    type MockupGeneratorRetrievePrintfilesResponse as MockupGeneratorRetrievePrintfilesResponse,
    type MockupGeneratorRetrieveTaskResultResponse as MockupGeneratorRetrieveTaskResultResponse,
    type MockupGeneratorRetrieveTemplatesResponse as MockupGeneratorRetrieveTemplatesResponse,
    type MockupGeneratorCreateTaskParams as MockupGeneratorCreateTaskParams,
    type MockupGeneratorRetrievePrintfilesParams as MockupGeneratorRetrievePrintfilesParams,
    type MockupGeneratorRetrieveTaskResultParams as MockupGeneratorRetrieveTaskResultParams,
    type MockupGeneratorRetrieveTemplatesParams as MockupGeneratorRetrieveTemplatesParams,
  };
}
