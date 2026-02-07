# Shared

Types:

- <code><a href="./src/resources/shared.ts">File</a></code>
- <code><a href="./src/resources/shared.ts">FileOption</a></code>
- <code><a href="./src/resources/shared.ts">ItemOption</a></code>
- <code><a href="./src/resources/shared.ts">PackingSlip</a></code>
- <code><a href="./src/resources/shared.ts">Paging</a></code>
- <code><a href="./src/resources/shared.ts">ProductVariant</a></code>
- <code><a href="./src/resources/shared.ts">SyncProduct</a></code>
- <code><a href="./src/resources/shared.ts">SyncVariant</a></code>

# Products

Types:

- <code><a href="./src/resources/products.ts">AvailableTechnique</a></code>
- <code><a href="./src/resources/products.ts">CatalogFileOption</a></code>
- <code><a href="./src/resources/products.ts">FileType</a></code>
- <code><a href="./src/resources/products.ts">OptionType</a></code>
- <code><a href="./src/resources/products.ts">Product</a></code>
- <code><a href="./src/resources/products.ts">ProductRetrieveResponse</a></code>
- <code><a href="./src/resources/products.ts">ProductListResponse</a></code>
- <code><a href="./src/resources/products.ts">ProductRetrieveSizeGuideResponse</a></code>
- <code><a href="./src/resources/products.ts">ProductRetrieveVariantResponse</a></code>

Methods:

- <code title="get /products/{id}">client.products.<a href="./src/resources/products.ts">retrieve</a>(id) -> ProductRetrieveResponse</code>
- <code title="get /products">client.products.<a href="./src/resources/products.ts">list</a>({ ...params }) -> ProductListResponse</code>
- <code title="get /products/{id}/sizes">client.products.<a href="./src/resources/products.ts">retrieveSizeGuide</a>(id, { ...params }) -> ProductRetrieveSizeGuideResponse</code>
- <code title="get /products/variant/{id}">client.products.<a href="./src/resources/products.ts">retrieveVariant</a>(id) -> ProductRetrieveVariantResponse</code>

# Categories

Types:

- <code><a href="./src/resources/categories.ts">CategoryRetrieveResponse</a></code>
- <code><a href="./src/resources/categories.ts">CategoryListResponse</a></code>

Methods:

- <code title="get /categories/{id}">client.categories.<a href="./src/resources/categories.ts">retrieve</a>(id) -> CategoryRetrieveResponse</code>
- <code title="get /categories">client.categories.<a href="./src/resources/categories.ts">list</a>() -> CategoryListResponse</code>

# ProductTemplates

Types:

- <code><a href="./src/resources/product-templates.ts">ProductTemplateRetrieveResponse</a></code>
- <code><a href="./src/resources/product-templates.ts">ProductTemplateListResponse</a></code>
- <code><a href="./src/resources/product-templates.ts">ProductTemplateDeleteResponse</a></code>

Methods:

- <code title="get /product-templates/{id}">client.productTemplates.<a href="./src/resources/product-templates.ts">retrieve</a>(id) -> ProductTemplateRetrieveResponse</code>
- <code title="get /product-templates">client.productTemplates.<a href="./src/resources/product-templates.ts">list</a>({ ...params }) -> ProductTemplateListResponse</code>
- <code title="delete /product-templates/{id}">client.productTemplates.<a href="./src/resources/product-templates.ts">delete</a>(id) -> ProductTemplateDeleteResponse</code>

# Orders

Types:

- <code><a href="./src/resources/orders.ts">Address</a></code>
- <code><a href="./src/resources/orders.ts">Costs</a></code>
- <code><a href="./src/resources/orders.ts">Gift</a></code>
- <code><a href="./src/resources/orders.ts">IncompleteItem</a></code>
- <code><a href="./src/resources/orders.ts">Item</a></code>
- <code><a href="./src/resources/orders.ts">Option</a></code>
- <code><a href="./src/resources/orders.ts">Order</a></code>
- <code><a href="./src/resources/orders.ts">OrderShipmentItem</a></code>
- <code><a href="./src/resources/orders.ts">PricingBreakdown</a></code>
- <code><a href="./src/resources/orders.ts">RetailCosts</a></code>
- <code><a href="./src/resources/orders.ts">Shipment</a></code>
- <code><a href="./src/resources/orders.ts">OrderCreateResponse</a></code>
- <code><a href="./src/resources/orders.ts">OrderRetrieveResponse</a></code>
- <code><a href="./src/resources/orders.ts">OrderUpdateResponse</a></code>
- <code><a href="./src/resources/orders.ts">OrderListResponse</a></code>
- <code><a href="./src/resources/orders.ts">OrderCancelResponse</a></code>
- <code><a href="./src/resources/orders.ts">OrderConfirmResponse</a></code>
- <code><a href="./src/resources/orders.ts">OrderEstimateCostsResponse</a></code>

Methods:

- <code title="post /orders">client.orders.<a href="./src/resources/orders.ts">create</a>({ ...params }) -> OrderCreateResponse</code>
- <code title="get /orders/{id}">client.orders.<a href="./src/resources/orders.ts">retrieve</a>(id, { ...params }) -> OrderRetrieveResponse</code>
- <code title="put /orders/{id}">client.orders.<a href="./src/resources/orders.ts">update</a>(id, { ...params }) -> OrderUpdateResponse</code>
- <code title="get /orders">client.orders.<a href="./src/resources/orders.ts">list</a>({ ...params }) -> OrderListResponse</code>
- <code title="delete /orders/{id}">client.orders.<a href="./src/resources/orders.ts">cancel</a>(id, { ...params }) -> OrderCancelResponse</code>
- <code title="post /orders/{id}/confirm">client.orders.<a href="./src/resources/orders.ts">confirm</a>(id, { ...params }) -> OrderConfirmResponse</code>
- <code title="post /orders/estimate-costs">client.orders.<a href="./src/resources/orders.ts">estimateCosts</a>({ ...params }) -> OrderEstimateCostsResponse</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">FileCreateResponse</a></code>
- <code><a href="./src/resources/files.ts">FileRetrieveResponse</a></code>
- <code><a href="./src/resources/files.ts">FileGetThreadColorsResponse</a></code>

Methods:

- <code title="post /files">client.files.<a href="./src/resources/files.ts">create</a>({ ...params }) -> FileCreateResponse</code>
- <code title="get /files/{id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(id, { ...params }) -> FileRetrieveResponse</code>
- <code title="post /files/thread-colors">client.files.<a href="./src/resources/files.ts">getThreadColors</a>({ ...params }) -> FileGetThreadColorsResponse</code>

# Sync

## Products

Types:

- <code><a href="./src/resources/sync/products.ts">ProductRetrieveResponse</a></code>
- <code><a href="./src/resources/sync/products.ts">ProductListResponse</a></code>
- <code><a href="./src/resources/sync/products.ts">ProductDeleteResponse</a></code>

Methods:

- <code title="get /sync/products/{id}">client.sync.products.<a href="./src/resources/sync/products.ts">retrieve</a>(id, { ...params }) -> ProductRetrieveResponse</code>
- <code title="get /sync/products">client.sync.products.<a href="./src/resources/sync/products.ts">list</a>({ ...params }) -> ProductListResponse</code>
- <code title="delete /sync/products/{id}">client.sync.products.<a href="./src/resources/sync/products.ts">delete</a>(id, { ...params }) -> ProductDeleteResponse</code>

## Variant

Types:

- <code><a href="./src/resources/sync/variant.ts">VariantRetrieveResponse</a></code>
- <code><a href="./src/resources/sync/variant.ts">VariantUpdateResponse</a></code>
- <code><a href="./src/resources/sync/variant.ts">VariantDeleteResponse</a></code>

Methods:

- <code title="get /sync/variant/{id}">client.sync.variant.<a href="./src/resources/sync/variant.ts">retrieve</a>(id, { ...params }) -> VariantRetrieveResponse</code>
- <code title="put /sync/variant/{id}">client.sync.variant.<a href="./src/resources/sync/variant.ts">update</a>(id, { ...params }) -> VariantUpdateResponse</code>
- <code title="delete /sync/variant/{id}">client.sync.variant.<a href="./src/resources/sync/variant.ts">delete</a>(id, { ...params }) -> VariantDeleteResponse</code>

# Shipping

Types:

- <code><a href="./src/resources/shipping.ts">ShippingCalculateRatesResponse</a></code>

Methods:

- <code title="post /shipping/rates">client.shipping.<a href="./src/resources/shipping.ts">calculateRates</a>({ ...params }) -> ShippingCalculateRatesResponse</code>

# Countries

Types:

- <code><a href="./src/resources/countries.ts">CountryListResponse</a></code>

Methods:

- <code title="get /countries">client.countries.<a href="./src/resources/countries.ts">list</a>() -> CountryListResponse</code>

# Tax

Types:

- <code><a href="./src/resources/tax.ts">TaxCalculateRateResponse</a></code>
- <code><a href="./src/resources/tax.ts">TaxListCountriesResponse</a></code>

Methods:

- <code title="post /tax/rates">client.tax.<a href="./src/resources/tax.ts">calculateRate</a>({ ...params }) -> TaxCalculateRateResponse</code>
- <code title="get /tax/countries">client.tax.<a href="./src/resources/tax.ts">listCountries</a>() -> TaxListCountriesResponse</code>

# MockupGenerator

Types:

- <code><a href="./src/resources/mockup-generator.ts">MockupGeneratorCreateTaskResponse</a></code>
- <code><a href="./src/resources/mockup-generator.ts">MockupGeneratorRetrievePrintfilesResponse</a></code>
- <code><a href="./src/resources/mockup-generator.ts">MockupGeneratorRetrieveTaskResultResponse</a></code>
- <code><a href="./src/resources/mockup-generator.ts">MockupGeneratorRetrieveTemplatesResponse</a></code>

Methods:

- <code title="post /mockup-generator/create-task/{id}">client.mockupGenerator.<a href="./src/resources/mockup-generator.ts">createTask</a>(id, { ...params }) -> MockupGeneratorCreateTaskResponse</code>
- <code title="get /mockup-generator/printfiles/{id}">client.mockupGenerator.<a href="./src/resources/mockup-generator.ts">retrievePrintfiles</a>(id, { ...params }) -> MockupGeneratorRetrievePrintfilesResponse</code>
- <code title="get /mockup-generator/task">client.mockupGenerator.<a href="./src/resources/mockup-generator.ts">retrieveTaskResult</a>({ ...params }) -> MockupGeneratorRetrieveTaskResultResponse</code>
- <code title="get /mockup-generator/templates/{id}">client.mockupGenerator.<a href="./src/resources/mockup-generator.ts">retrieveTemplates</a>(id, { ...params }) -> MockupGeneratorRetrieveTemplatesResponse</code>

# Warehouse

## Products

Types:

- <code><a href="./src/resources/warehouse/products.ts">ProductRetrieveResponse</a></code>
- <code><a href="./src/resources/warehouse/products.ts">ProductListResponse</a></code>

Methods:

- <code title="get /warehouse/products/{id}">client.warehouse.products.<a href="./src/resources/warehouse/products.ts">retrieve</a>(id, { ...params }) -> ProductRetrieveResponse</code>
- <code title="get /warehouse/products">client.warehouse.products.<a href="./src/resources/warehouse/products.ts">list</a>({ ...params }) -> ProductListResponse</code>

# ApprovalSheets

Types:

- <code><a href="./src/resources/approval-sheets.ts">ApprovalSheetListResponse</a></code>
- <code><a href="./src/resources/approval-sheets.ts">ApprovalSheetApproveResponse</a></code>
- <code><a href="./src/resources/approval-sheets.ts">ApprovalSheetSubmitChangesResponse</a></code>

Methods:

- <code title="get /approval-sheets">client.approvalSheets.<a href="./src/resources/approval-sheets.ts">list</a>({ ...params }) -> ApprovalSheetListResponse</code>
- <code title="post /approval-sheets">client.approvalSheets.<a href="./src/resources/approval-sheets.ts">approve</a>({ ...params }) -> ApprovalSheetApproveResponse</code>
- <code title="post /approval-sheets/changes">client.approvalSheets.<a href="./src/resources/approval-sheets.ts">submitChanges</a>({ ...params }) -> ApprovalSheetSubmitChangesResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">WebhookInfo</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookCreateResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookRetrieveResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookDeleteResponse</a></code>

Methods:

- <code title="post /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> WebhookCreateResponse</code>
- <code title="get /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">retrieve</a>({ ...params }) -> WebhookRetrieveResponse</code>
- <code title="delete /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>({ ...params }) -> WebhookDeleteResponse</code>

# OAuth

Types:

- <code><a href="./src/resources/oauth.ts">OAuthListScopesResponse</a></code>

Methods:

- <code title="get /oauth/scopes">client.oauth.<a href="./src/resources/oauth.ts">listScopes</a>() -> OAuthListScopesResponse</code>

# Reports

Types:

- <code><a href="./src/resources/reports.ts">ReportRetrieveStatisticsResponse</a></code>

Methods:

- <code title="get /reports/statistics">client.reports.<a href="./src/resources/reports.ts">retrieveStatistics</a>({ ...params }) -> ReportRetrieveStatisticsResponse</code>

# Store

Types:

- <code><a href="./src/resources/store/store.ts">StoreRetrieveResponse</a></code>
- <code><a href="./src/resources/store/store.ts">StoreListResponse</a></code>
- <code><a href="./src/resources/store/store.ts">StoreUpdatePackingSlipResponse</a></code>

Methods:

- <code title="get /stores/{id}">client.store.<a href="./src/resources/store/store.ts">retrieve</a>(id) -> StoreRetrieveResponse</code>
- <code title="get /stores">client.store.<a href="./src/resources/store/store.ts">list</a>() -> StoreListResponse</code>
- <code title="post /store/packing-slip">client.store.<a href="./src/resources/store/store.ts">updatePackingSlip</a>({ ...params }) -> StoreUpdatePackingSlipResponse</code>

## Products

Types:

- <code><a href="./src/resources/store/products.ts">ProductCreateResponse</a></code>
- <code><a href="./src/resources/store/products.ts">ProductRetrieveResponse</a></code>
- <code><a href="./src/resources/store/products.ts">ProductUpdateResponse</a></code>
- <code><a href="./src/resources/store/products.ts">ProductListResponse</a></code>
- <code><a href="./src/resources/store/products.ts">ProductDeleteResponse</a></code>
- <code><a href="./src/resources/store/products.ts">ProductCreateVariantResponse</a></code>

Methods:

- <code title="post /store/products">client.store.products.<a href="./src/resources/store/products.ts">create</a>({ ...params }) -> ProductCreateResponse</code>
- <code title="get /store/products/{id}">client.store.products.<a href="./src/resources/store/products.ts">retrieve</a>(id, { ...params }) -> ProductRetrieveResponse</code>
- <code title="put /store/products/{id}">client.store.products.<a href="./src/resources/store/products.ts">update</a>(id, { ...params }) -> ProductUpdateResponse</code>
- <code title="get /store/products">client.store.products.<a href="./src/resources/store/products.ts">list</a>({ ...params }) -> ProductListResponse</code>
- <code title="delete /store/products/{id}">client.store.products.<a href="./src/resources/store/products.ts">delete</a>(id, { ...params }) -> ProductDeleteResponse</code>
- <code title="post /store/products/{id}/variants">client.store.products.<a href="./src/resources/store/products.ts">createVariant</a>(id, { ...params }) -> ProductCreateVariantResponse</code>

## Variants

Types:

- <code><a href="./src/resources/store/variants.ts">VariantRetrieveResponse</a></code>
- <code><a href="./src/resources/store/variants.ts">VariantUpdateResponse</a></code>
- <code><a href="./src/resources/store/variants.ts">VariantDeleteResponse</a></code>

Methods:

- <code title="get /store/variants/{id}">client.store.variants.<a href="./src/resources/store/variants.ts">retrieve</a>(id, { ...params }) -> VariantRetrieveResponse</code>
- <code title="put /store/variants/{id}">client.store.variants.<a href="./src/resources/store/variants.ts">update</a>(pathID, { ...params }) -> VariantUpdateResponse</code>
- <code title="delete /store/variants/{id}">client.store.variants.<a href="./src/resources/store/variants.ts">delete</a>(id, { ...params }) -> VariantDeleteResponse</code>
