// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
 */
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
    options?: Array<Shared.FileOption>;

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
