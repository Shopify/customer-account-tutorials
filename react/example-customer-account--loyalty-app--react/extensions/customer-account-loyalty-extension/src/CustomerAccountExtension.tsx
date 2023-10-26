import React from 'react';
  import { Banner, reactExtension, useTranslate, useApi } from '@shopify/ui-extensions-react/customer-account';

  export default reactExtension(
    'customer-account.dynamic.render',
     () => <CustomerAccountExtension />
  );

  function CustomerAccountExtension() {
    const translate = useTranslate();
    const { extension } = useApi();

    return (
      <Banner title='customer-account-loyalty-extension'>
        {translate('welcome', {target: extension.target})}
      </Banner>
    );
  }