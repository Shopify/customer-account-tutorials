import React from "react";
import {
  Button,
  CustomerAccountAction,
  reactExtension,
  useApi,
  Select
} from "@shopify/ui-extensions-react/customer-account";

export default reactExtension(
  "customer-account.order.action.render",
  ( ) => <MenuActionExtension />
);

function MenuActionExtension( ) {
  const api = useApi<"customer-account.order.action.render">()
  const translate = api.i18n.translate;

  return (
    <CustomerAccountAction
      title={translate("menuAction.title")}
      primaryAction={
        <Button
          onPress={() => {
            api.close();
          }}
        >
          {translate("menuAction.submit")}
        </Button>
      }
      secondaryAction={
        <Button
          onPress={() => {
            api.close();
          }}
        >
          {translate("menuAction.cancel")}
        </Button>
      }
    >
      <Select label=""
      options={[
          {value:"1" , label: "Package item is damaged"},
          {value:"2" , label: "Missing items"},
          {value:"3" , label: "Wrong item was sent"},
          {value:"4" , label: "Item arrived too late"},
          {value:"5" , label: "Never received item"}
          ]}
       />

    </CustomerAccountAction>
  );
}
