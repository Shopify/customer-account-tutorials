// [START menu-action.setup-target]
import { extension, Button} from '@shopify/ui-extensions/customer-account';

export default extension(
  'customer-account.order.action.menu-item.render',
// [END menu-action.setup-target]
// [START menu-action.render-button]
  (root, api) => {
    const { i18n, extension } = api;
    root.appendChild(
      root.createComponent(
        Button,
        undefined,
        "Add note"
      ),
    );
  },
);
// [END menu-action.render-button]
