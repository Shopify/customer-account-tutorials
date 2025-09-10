import '@shopify/ui-extensions';

//@ts-ignore
declare module './src/FullPageExtension.jsx' {
  const shopify: import('@shopify/ui-extensions/customer-account.page.render').Api;
  const globalThis: { shopify: typeof shopify };
}
