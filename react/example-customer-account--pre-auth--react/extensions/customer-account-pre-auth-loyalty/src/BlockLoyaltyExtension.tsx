// [START order-status-block.setup-target]
import React from "react";
import {
  Button,
  Card,
  InlineStack,
  reactExtension,
  useApi,
  useAuthenticationState,
} from "@shopify/ui-extensions-react/customer-account";

export default reactExtension(
  "customer-account.order-status.block.render",
  () => <BlockLoyaltyExtension />
);
// [END order-status-block.setup-target]

// [START order-status-block.render-card]
function BlockLoyaltyExtension() {

  // [START order-status-block.require-login]
  const { requireLogin } = useApi<"customer-account.order-status.block.render">();
  async function viewPoints() {
    await requireLogin();
  }
  // [END order-status-block.require-login]

  // [START order-status-block.check-authentication-state]
  const authenticationState = useAuthenticationState();
  // [END order-status-block.check-authentication-state]
  
  return (
    <Card padding>
      <InlineStack inlineAlignment={'center'}>
        Points earned from your purchase.
        { 
          authenticationState === 'pre_authenticated' ? 
            // [START order-status-block.pre-authenticated-content]
            <Button onPress={viewPoints} kind="plain">
              View rewards
            </Button>
            // [END order-status-block.pre-authenticated-content]
            : 
            // [START order-status-block.fully-authenticated-content]
            " 560 points"
            // [END order-status-block.fully-authenticated-content]
        }
      </InlineStack>
    </Card>
  );
}
// [END order-status-block.render-card]
