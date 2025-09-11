
import '@shopify/ui-extensions/preact';
import {render} from 'preact';

export default async () => {
  render(<BlockLoyaltyExtension />, document.body);
};

// [START order-status-block.render-card]
function BlockLoyaltyExtension() {
  
  // [START order-status-block.require-login]
  async function viewPoints() {
    await shopify.requireLogin();
  }
  // [END order-status-block.require-login]

  // [START order-status-block.check-authentication-state]
  const authenticationState = shopify.authenticationState.value;
  // [END order-status-block.check-authentication-state]
  
  return (
    <s-section>
      <s-stack direction="inline" inline-alignment="center" gap="small-500">
        <s-text>Points earned from your purchase: </s-text>
        { 
          authenticationState === 'pre_authenticated' ? 
            // [START order-status-block.pre-authenticated-content]
            <s-link onClick={viewPoints} tone="neutral">
              View rewards
            </s-link>
            // [END order-status-block.pre-authenticated-content]
            : 
            // [START order-status-block.fully-authenticated-content]
            <s-text>560</s-text>
            // [END order-status-block.fully-authenticated-content]
        }
      </s-stack>
    </s-section>
  );
}
// [END order-status-block.render-card] 