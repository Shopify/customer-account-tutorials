import { extension, Button} from '@shopify/ui-extensions/customer-account';

// [START menu-action.render-button]
export default extension(
  'customer-account.order.action.menu-item.render',
  (root) => {
    root.appendChild(
      root.createComponent(
        Button,
        undefined,
        "Report a problem"
      ),
    );
  },
);
// [END menu-action.render-button]
