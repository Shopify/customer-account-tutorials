import { extension, Button} from '@shopify/ui-extensions/customer-account';


export default extension(
  'customer-account.order.action.menu-item.render',
  (root, api) => {
    const { i18n, extension } = api;
    root.appendChild(
      root.createComponent(
        Button,
        undefined,
        "Report a problem"
      ),
    );
  },
);

