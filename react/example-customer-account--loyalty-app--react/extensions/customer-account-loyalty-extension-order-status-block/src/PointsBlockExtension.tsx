import {
  BlockStack,
  reactExtension,
  TextBlock,
  Link,
  Banner
} from "@shopify/ui-extensions-react/customer-account";

export default reactExtension(
  "customer-account.order-status.block.render",
  () => <PromotionBanner />
);

// [START order-status-block.build-ui]
function PromotionBanner() {
  return (
    <Banner>
      <BlockStack inlineAlignment="center" >
      <TextBlock>
      {`🎉 You've earned 1,000 points from this order. You've been upgraded to Platinum tier. `}
      <Link>
        View rewards
      </Link>
      </TextBlock>
      </BlockStack>
    </Banner>
  );
}
// [END order-status-block.build-ui]
