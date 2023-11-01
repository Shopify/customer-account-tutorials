import {
  Button,
  CustomerAccountAction,
  reactExtension,
  useApi,
  Select
} from "@shopify/ui-extensions-react/customer-account";
import { useState } from "react";

export default reactExtension(
  "customer-account.order.action.render",
  ( ) => <MenuActionExtension />
);

function MenuActionExtension( ) {
  const api = useApi<"customer-account.order.action.render">()
  const translate = api.i18n.translate;
  const [currentProblem, setCurrentProblem] = useState("1");

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
      <Select label={translate("modalLabel")}
      options={[
          {value:"1" , label: translate("modalOptions.damaged_package")},
          {value:"2" , label: translate("modalOptions.missing_items")},
          {value:"3" , label: translate("modalOptions.wrong_items")},
          {value:"4" , label: translate("modalOptions.late_arrival")},
          {value:"5" , label: translate("modalOptions.never_arrived")}
          ]}
        value={currentProblem}
        onChange={(value) => setCurrentProblem(value)}
       />

    </CustomerAccountAction>
  );
}
