// [START menu-action.setup-target]
import React from "react";
import {
  Button,
  reactExtension,
} from "@shopify/ui-extensions-react/customer-account";


export default reactExtension(
  "customer-account.order.action.menu-item.render",
  () => <MenuActionItemButtonExtension />
);
// [END menu-action.setup-target]

// [START menu-action.render-button]
function MenuActionItemButtonExtension() {
  return <Button>Add note</Button>;
}
// [END menu-action.render-button]
