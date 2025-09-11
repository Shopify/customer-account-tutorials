import '@shopify/ui-extensions';

declare module './src/MenuActionItemButtonExtension.jsx' {
  const shopify: import('@shopify/ui-extensions/customer-account.order.action.menu-item.render').Api;
  const globalThis: {shopify: typeof shopify};
}

declare module './src/MenuActionModalExtension.jsx' {
  const shopify: import('@shopify/ui-extensions/customer-account.order.action.render').Api;
  const globalThis: {shopify: typeof shopify};
}
