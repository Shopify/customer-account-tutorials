import '@shopify/ui-extensions/preact';
import {render} from 'preact';

export default async () => {
  render(<PromotionBanner />, document.body);
};

// [START order-status-block.build-ui]
function PromotionBanner() {
  return (
    <s-banner tone="success">
      <s-stack direction="block" inline-alignment="center">
        <s-text>
          🎉 You've earned 1,000 points from this order. You've been upgraded to
          Platinum tier. <s-link>View rewards</s-link>
        </s-text>
      </s-stack>
    </s-banner>
  );
}
// [END order-status-block.build-ui]
