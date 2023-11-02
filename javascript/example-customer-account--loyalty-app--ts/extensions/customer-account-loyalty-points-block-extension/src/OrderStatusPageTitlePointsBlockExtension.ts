import { extension, Banner, BlockStack, TextBlock, Link } from '@shopify/ui-extensions/customer-account';

// [START order-status-block.build-ui]
export default extension('customer-account.order-status.block.render', (root, api) => {
  const { i18n, extension } = api;

  const app = root.createComponent(
    Banner
  ); 

  const contentWrapper = root.createComponent(BlockStack, {
    inlineAlignment: 'center'
  }); 

  const textWrapper = root.createComponent(
    TextBlock,
    {
      appearance: "info"
    },
    "🎉 You've earned 1,000 points from this order. You've been upgraded to Platinum tier."
  );

  const linkContentWrapper = root.createComponent(Link); 

  const linkText = root.createComponent( TextBlock,
    {
      appearance: "info"
    },
    "View rewards"
  ); 
  
  linkContentWrapper.append(linkText); 

  textWrapper.append(linkContentWrapper); 

  contentWrapper.append(textWrapper);

  app.append(contentWrapper);

  root.appendChild(
   app
  );
});
// [END order-status-block.build-ui]