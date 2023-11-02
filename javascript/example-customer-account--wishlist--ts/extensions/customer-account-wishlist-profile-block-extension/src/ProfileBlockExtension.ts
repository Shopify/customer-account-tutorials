
import { extension, Link, InlineStack, Card, Text } from '@shopify/ui-extensions/customer-account';

// [START profile.block.build-ui]
export default extension('customer-account.profile.block.render', (root, api) => {
  const { i18n, extension } = api;

  const app = root.createComponent(
    Card, 
    {
      padding: true
    }
  );

  const inlineComponent = root.createComponent(
    InlineStack, 
    {
      inlineAlignment: 'center', 
      spacing:'tight'
    }
  );

  const textComponent = root.createComponent(
    Text, 
    {}, 
    'Grow your garden with more plants from your wishlist.'
  );

  inlineComponent.append(textComponent); 

  const buttonComponent = root.createComponent(
    Link,
    {
      to: "extension:ca-wishlist-js-full-page/"
    },
    'View wishlist'
  );

  inlineComponent.append(buttonComponent);

  app.append(inlineComponent); 
  root.appendChild(app);
});
// [END profile.block.build-ui]