import '@shopify/ui-extensions';

//@ts-ignore
declare module './src/BlockLoyaltyExtension.jsx' {
  const shopify: import('@shopify/ui-extensions/customer-account.order-status.block.render').Api;
  const globalThis: { shopify: typeof shopify };
}
