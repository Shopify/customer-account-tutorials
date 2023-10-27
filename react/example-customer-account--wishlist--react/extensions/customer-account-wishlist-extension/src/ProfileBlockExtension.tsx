import { Banner, reactExtension, useTranslate, useApi, Button } from '@shopify/ui-extensions-react/customer-account';

  export default reactExtension(
    'customer-account.profile.block.render',
     () => <BlockExtension />
  );

  function BlockExtension() {
    const translate = useTranslate();

    return (
      <Button to="/">
        {translate('wishlist.seeWishlistButton')}
      </Button>
    );
  }
