// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Reports extends APIResource {
  /**
   * Returns statistics for specified report types.
   *
   * You need to specify the report types you want to retrieve in the `report_types`
   * query parameter as a comma-separated list, e.g.
   * `report_types=sales_and_costs,profit`.
   *
   * **Note**: You cannot get statistics for a period longer than 6 months.
   *
   * #### Example
   *
   * To get statistics in the default currency of a store for `sales_and_costs` and
   * `profit` reports for August 2022, you can use the following URL:
   * https://api.printful.com/reports/statistics?report_types=sales_and_costs,profit&date_from=2022-08-01&date_to=2022-08-31.
   *
   * ### Report types
   *
   * Currently, the following report types are available:
   *
   * | Report type                | Description                                              |
   * | -------------------------- | -------------------------------------------------------- |
   * | `sales_and_costs`          | Detailed information on sales and costs grouped by date. |
   * | `sales_and_costs_summary`  | Short information on sales and costs grouped by date.    |
   * | `printful_costs`           | Amount paid to Printful for fulfillment and shipping.    |
   * | `profit`                   | Profit in the specified period.                          |
   * | `total_paid_orders`        | The number of paid orders in the specified period.       |
   * | `costs_by_amount`          | Information on costs by amount grouped by date.          |
   * | `costs_by_product`         | Information on costs grouped by product.                 |
   * | `costs_by_variant`         | Information on costs grouped by variant.                 |
   * | `average_fulfillment_time` | Average time it took Printful to fulfill your orders.    |
   *
   * The response structure for the specific reports is documented in the response
   * schema (`result.store_statistics.[reportName]`).
   */
  retrieveStatistics(
    params: ReportRetrieveStatisticsParams,
    options?: RequestOptions,
  ): APIPromise<ReportRetrieveStatisticsResponse> {
    const { 'X-PF-Store-Id': xPfStoreID, ...query } = params;
    return this._client.get('/reports/statistics', {
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

export interface ReportRetrieveStatisticsResponse {
  /**
   * Response status code `200`
   */
  code?: number;

  /**
   * Statistics
   */
  result?: ReportRetrieveStatisticsResponse.Result;
}

export namespace ReportRetrieveStatisticsResponse {
  /**
   * Statistics
   */
  export interface Result {
    /**
     * The statistics for each store (currently only a single store is supported).
     */
    store_statistics?: Array<Result.StoreStatistic>;
  }

  export namespace Result {
    /**
     * Statistics for a single store
     */
    export interface StoreStatistic {
      /**
       * Average fulfillment time report
       */
      average_fulfillment_time?: StoreStatistic.AverageFulfillmentTime;

      /**
       * Costs by amount report
       */
      costs_by_amount?: Array<StoreStatistic.CostsByAmount>;

      /**
       * Costs by product report
       */
      costs_by_product?: Array<StoreStatistic.CostsByProduct>;

      /**
       * Costs by variant report
       */
      costs_by_variant?: Array<StoreStatistic.CostsByVariant>;

      /**
       * The code of the currency in which the statistics are returned
       */
      currency?: string;

      /**
       * Printful costs report
       */
      printful_costs?: StoreStatistic.PrintfulCosts;

      /**
       * Profit report
       */
      profit?: StoreStatistic.Profit;

      /**
       * Sales and costs report
       */
      sales_and_costs?: Array<StoreStatistic.SalesAndCost>;

      /**
       * Sales and costs summary report
       */
      sales_and_costs_summary?: Array<StoreStatistic.SalesAndCostsSummary>;

      /**
       * The ID of the store for which the statistics are returned
       */
      store_id?: number;

      /**
       * Total paid orders report
       */
      total_paid_orders?: StoreStatistic.TotalPaidOrders;
    }

    export namespace StoreStatistic {
      /**
       * Average fulfillment time report
       */
      export interface AverageFulfillmentTime {
        /**
         * Relative difference from the value from the previous period. -1 means 100%
         * decrease, 1 means 100% increase. 0 is returned if there is no change or the
         * previous value was 0.
         */
        relative_difference?: number;

        /**
         * Average time it took Printful to fulfill your orders.
         */
        value?: number;
      }

      export interface CostsByAmount {
        /**
         * Pack-in costs
         */
        branding?: number;

        /**
         * The date of the value: day in `Y-m-d` format, month in `Y-m` format or "Total"
         * for the first element of the list which shows the total values for the whole
         * requested period
         */
        date?: string;

        /**
         * Embroidery digitization costs
         */
        digitization?: number;

        /**
         * Any fulfillment discounts (such as the monthly discount) set up on Printful's
         * side
         */
        discount?: number;

        /**
         * Product & fulfillment costs
         */
        product_amount?: number;

        /**
         * Tax amounts. If not applicable, it will be 0.
         */
        sales_tax?: number;

        /**
         * Shipping costs that were charged by Printful
         */
        shipping?: number;

        /**
         * Summary of all costs
         */
        total?: number;

        /**
         * Tax amounts. If not applicable, it will be 0.
         */
        vat?: number;
      }

      export interface CostsByProduct {
        /**
         * All fulfillment costs that are charged by Printful, excluding shipping.
         */
        fulfillment?: number;

        /**
         * Product ID. See [Catalog API](#tag/Catalog-API).
         */
        product_id?: number;

        /**
         * Product name.
         */
        product_name?: string;

        /**
         * Total quantity of items ordered from this product in the selected period.
         */
        quantity?: number;

        /**
         * Order retail price data. Available only if retail price fields are properly set
         * up on the integration's side.
         */
        sales?: number;
      }

      export interface CostsByVariant {
        /**
         * All fulfillment costs that are charged by Printful, excluding shipping.
         */
        fulfillment?: number;

        /**
         * Product ID. See [Catalog API](#tag/Catalog-API).
         */
        product_id?: number;

        /**
         * Total quantity of items ordered from this product in the selected period.
         */
        quantity?: number;

        /**
         * Order retail price data. Available only if retail price fields are properly set
         * up on the integration's side.
         */
        sales?: number;

        /**
         * Variant ID. See [Catalog API](#tag/Catalog-API).
         */
        variant_id?: number;

        /**
         * Variant name.
         */
        variant_name?: string;
      }

      /**
       * Printful costs report
       */
      export interface PrintfulCosts {
        /**
         * Relative difference from the value from the previous period. -1 means 100%
         * decrease, 1 means 100% increase. 0 is returned if there is no change or the
         * previous value was 0.
         */
        relative_difference?: number;

        /**
         * Amount paid to Printful for fulfillment and shipping.
         */
        value?: number;
      }

      /**
       * Profit report
       */
      export interface Profit {
        /**
         * Relative difference from the value from the previous period. -1 means 100%
         * decrease, 1 means 100% increase. 0 is returned if there is no change or the
         * previous value was 0.
         */
        relative_difference?: number;

        /**
         * The difference between Sales and Fulfillment. If retail price data is not
         * available, profit might be negative
         */
        value?: number;
      }

      export interface SalesAndCost {
        /**
         * The date of the value: day in `Y-m-d` format, month in `Y-m` format or "Total"
         * for the first element of the list which shows the total values for the whole
         * requested period
         */
        date?: string;

        /**
         * Product fulfillment, digitization, branding, shipping costs and taxes that are
         * charged by Printful
         */
        fulfillment?: number;

        /**
         * Any fulfillment discounts (such as the monthly discount) set up on Printful's
         * side
         */
        fulfillment_discount?: number;

        /**
         * Shipping costs that were charged by Printful
         */
        fulfillment_shipping?: number;

        /**
         * The difference between Sales and Fulfillment. If retail price data is not
         * available, profit might be negative
         */
        profit?: number;

        /**
         * Order retail price data. Available only if retail price fields are properly set
         * up on the integration's side
         */
        sales?: number;

        /**
         * Any retail price discounts set up on the integration's side
         */
        sales_discount?: number;

        /**
         * The retail shipping price that was paid by the buyer
         */
        sales_shipping?: number;
      }

      export interface SalesAndCostsSummary {
        /**
         * Product fulfillment, digitization, branding, shipping costs and taxes that are
         * charged by Printful
         */
        costs?: number;

        /**
         * The date of the value: day in `Y-m-d` format, month in `Y-m` format or "Total"
         * for the first element of the list which shows the total values for the whole
         * requested period
         */
        date?: string;

        /**
         * The order count in the aggregation period
         */
        order_count?: number;

        /**
         * The difference between Sales and Fulfillment. If retail price data is not
         * available, profit might be negative
         */
        profit?: number;
      }

      /**
       * Total paid orders report
       */
      export interface TotalPaidOrders {
        /**
         * Relative difference from the value from the previous period. -1 means 100%
         * decrease, 1 means 100% increase. 0 is returned if there is no change or the
         * previous value was 0.
         */
        relative_difference?: number;

        /**
         * Number of unique orders for period
         */
        value?: number;
      }
    }
  }
}

export interface ReportRetrieveStatisticsParams {
  /**
   * Query param: The beginning of the period to get the statistics from (date in
   * `Y-m-d` format).
   */
  date_from: string;

  /**
   * Query param: The end of the period to get the statistics from (date in `Y-m-d`
   * format).
   */
  date_to: string;

  /**
   * Query param: A comma-separated list of report types to be retrieved.
   */
  report_types: string;

  /**
   * Query param: The currency (3-letter code) to return the statistics in. You can
   * also specify `display_currency` as the value to get the statistics in the
   * account's display currency. The store currency will be used by default.
   */
  currency?: string;

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

export declare namespace Reports {
  export {
    type ReportRetrieveStatisticsResponse as ReportRetrieveStatisticsResponse,
    type ReportRetrieveStatisticsParams as ReportRetrieveStatisticsParams,
  };
}
