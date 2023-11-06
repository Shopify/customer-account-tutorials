import { reactExtension, Button } from '@shopify/ui-extensions-react/customer-account';

// [START block.build-ui]
export default reactExtension(
  'customer-account.profile.block.render',
    () => <BlockExtension />
);

function BlockExtension() {
  return (
    <Button to="extension:/">
      See wishlist
    </Button>
  );
}
// [END block.build-ui]