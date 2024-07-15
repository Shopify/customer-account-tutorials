// [START order-status-block.setup-target]
import {
  Button,
  Card,
  InlineStack,
  extension,
} from "@shopify/ui-extensions/customer-account";

export default extension(
  "customer-account.order-status.block.render",
  // [END order-status-block.setup-target]
  // [START order-status-block.render-card]
  async(root, api) => {
    // [START order-status-block.require-login]
    const { requireLogin } = api;
    async function viewPoints() {
      await requireLogin();
    }
    // [END order-status-block.require-login]

    // [START order-status-block.check-authentication-state]
    let authenticationState =  api.authenticationState.current;
    api.authenticationState.subscribe(value => authenticationState = value);
    // [END order-status-block.check-authentication-state]
    
    const app = root.createComponent(Card, {padding: true}, [
      root.createComponent(InlineStack, {inlineAlignment: "center"}, [
        "Points earned from your purchase.",
        authenticationState === 'pre_authenticated' ? 
          // [START order-status-block.pre-authenticated-content]
          root.createComponent(Button, {onPress: viewPoints, kind: 'plain'}, "View rewards") :
          // [END order-status-block.pre-authenticated-content]
          // [START order-status-block.fully-authenticated-content]
          " 560 points"
          // [END order-status-block.fully-authenticated-content]
      ]),
    ]);
    root.append(app);
  }
);
// [END order-status-block.render-card]
