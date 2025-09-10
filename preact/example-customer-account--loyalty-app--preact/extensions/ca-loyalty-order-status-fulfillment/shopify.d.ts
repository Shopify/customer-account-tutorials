import '@shopify/ui-extensions';

//@ts-ignore
declare module './src/FulfillmentDelivery.jsx' {
  const shopify: import('@shopify/ui-extensions/customer-account.order-status.fulfillment-details.render-after').Api;
  const globalThis: { shopify: typeof shopify };
}
