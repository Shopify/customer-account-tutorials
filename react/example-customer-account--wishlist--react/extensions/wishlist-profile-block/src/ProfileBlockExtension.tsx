import { reactExtension, Link, Card, InlineStack, Text } from '@shopify/ui-extensions-react/customer-account';

// [START block.build-ui]
export default reactExtension(
  'customer-account.profile.block.render',
    () => <BlockExtension />
);

function BlockExtension() {
  return (
    <Card padding>
      <InlineStack inlineAlignment="center" spacing="tight">
        <Text>Grow your garden with more plants from your wishlist.</Text>
        <Link to="extension:wishlist-extension-react/">View wishlist</Link>
      </InlineStack>
    </Card>
  );
}
// [END block.build-ui]
