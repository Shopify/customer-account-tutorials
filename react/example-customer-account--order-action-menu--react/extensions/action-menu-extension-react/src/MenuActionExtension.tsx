import {
  Button,
  CustomerAccountAction,
  reactExtension,
  useApi,
  Select
} from "@shopify/ui-extensions-react/customer-account";

export default reactExtension(
  "customer-account.order.action.menu-item.render",
  ( ) => <MenuActionExtension />
);

function MenuActionExtension( ) {
  const api = useApi<"customer-account.order.action.menu-item.render">()
  const translate = api.i18n.translate;

  return (
    <Button>{translate("report")}</Button>
  );
}
