import '@shopify/ui-extensions/preact';
import {render} from 'preact';

export default async () => {
  render(<ProfileBlockExtension />, document.body);
};

// [START profile.build-ui]
function ProfileBlockExtension() {
  const i18n = shopify.i18n;

  return (
    <s-section heading="Rewards">
      <s-stack direction="block" gap="base" paddingBlockStart="base">
        <s-grid gridTemplateColumns="1fr 1fr 1fr 1fr" gap="large">
          <s-stack direction="block" gap="small">
            <s-text color="subdued">Points</s-text>
            <s-text type="strong">43,000</s-text>
          </s-stack>
          <s-stack direction="block" gap="small">
            <s-text color="subdued">Store credit</s-text>
            <s-text type="strong">
              {i18n.formatCurrency(450, {currency: 'USD'})}
            </s-text>
          </s-stack>
          <s-stack direction="block" gap="small">
            <s-text color="subdued">Referrals</s-text>
            <s-text type="strong">3</s-text>
          </s-stack>
          <s-stack direction="block" gap="small">
            <s-text color="subdued">Referral bonus</s-text>
            <s-text type="strong">600</s-text>
          </s-stack>
        </s-grid>
        <s-stack direction="block" max-inline-size="140">
          <s-button tone="neutral" variant="secondary">
            View rewards
          </s-button>
        </s-stack>
      </s-stack>
    </s-section>
  );
}
// [END profile.build-ui]
