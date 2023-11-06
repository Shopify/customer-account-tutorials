import {
  Button,
  CustomerAccountAction,
  reactExtension,
  useApi,
  Select,
  Form
} from "@shopify/ui-extensions-react/customer-account";
import { useState } from "react";

export default reactExtension(
  "customer-account.order.action.render",
  ( ) => <MenuActionModalExtension />
);

const dtcOptions = [
  {value:"1" , label: "Package item is damaged"},
  {value:"2" , label: "Missing items"},
  {value:"3" , label: "Wrong item was sent"},
  {value:"4" , label: "Item arrived too late"},
  {value:"5" , label: "Never received item"}
  ]

// [START menu-action-modal.b2b-check]
const b2bOptions = dtcOptions.concat([
  {value:"6" , label: "Package sent to the wrong company location"},
  ]);
// [END menu-action-modal.b2b-check]

function MenuActionModalExtension() {
  const {close, authenticatedAccount} = useApi<"customer-account.order.action.render">()
  const [currentProblem, setCurrentProblem] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  // [START menu-action-modal.b2b-check]
  const isB2BCustomer = authenticatedAccount.purchasingCompany.current != null;
  // [END menu-action-modal.b2b-check]

  // [START menu-action-modal.on-submit]
  function onSubmit() {
    // Simulating a request to your server to store the reported problem
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      close();
    }, 750);
  }
  // [END menu-action-modal.on-submit]

  // [START menu-action-modal.build-ui]
  return (
    <CustomerAccountAction
      title="Report a problem"
      primaryAction={
        <Button
          loading={isLoading}
          onPress={() => onSubmit()}
        >
          Report
        </Button>
      }
      secondaryAction={
        <Button
          onPress={() => {
            close();
          }}
        >
          Cancel
        </Button>
      }
    >
      <Form onSubmit={() => onSubmit()}>
        <Select label="Select a problem"
          // [START menu-action-modal.b2b-check]
          options={isB2BCustomer ? b2bOptions : dtcOptions}
          // [END menu-action-modal.b2b-check]
          value={currentProblem}
          onChange={(value) => setCurrentProblem(value)}
        />
      </Form>
    </CustomerAccountAction>
  );
  // [END menu-action-modal.build-ui]
}
