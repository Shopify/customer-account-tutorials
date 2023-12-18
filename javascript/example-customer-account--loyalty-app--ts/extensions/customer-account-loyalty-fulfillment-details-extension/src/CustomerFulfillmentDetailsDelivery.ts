import { extension, BlockStack, Divider, Button } from '@shopify/ui-extensions/customer-account';

// [START order-status-static.build-ui]
export default extension('customer-account.order-status.fulfillment-details.render-after', (root, api) => {
  const { i18n, extension } = api;

  const app = root.createComponent(
    BlockStack
  ); 

  const divider = root.createComponent(Divider); 

  const textContent= root.createText("Tell us how we did for a chance to win 1000 points");

  const buttonWrapper = root.createComponent(
    BlockStack,
    {
      maxInlineSize: 140,
    }
  ); 

  const button = root.createComponent(Button, {
    appearance: 'monochrome', 
    kind: 'secondary'
  }); 

  const buttonContent = root.createText("Write a review");

  button.append(buttonContent); 

  buttonWrapper.append(button); 

  app.append(divider); 

  app.append(textContent); 

  app.append(buttonWrapper);

  root.appendChild(app);
});
// [END order-status-static.build-ui]