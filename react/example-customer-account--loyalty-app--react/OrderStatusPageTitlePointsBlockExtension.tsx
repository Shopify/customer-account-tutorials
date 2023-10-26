import React from "react";
import {
  Card,
  BlockStack,
  reactExtension,
  useApi,
  TextBlock,
  InlineSpacer,
  Link,
  Banner
} from "@shopify/ui-extensions-react/customer-account";

export default reactExtension(
  "customer-account.order-status.block.render",
  ( ) => <PromotionBanner />
);

function PromotionBanner( ) {
  const api = useApi<"customer-account.order-status.block.render">()
  return (
    <Banner>
      <BlockStack inlineAlignment="center" >
      <TextBlock>
        You've earned $1,000 points from this order and is upgraded to Platinum tier
        <InlineSpacer spacing="small400"/>
        <Link onPress="">
        View rewards
        </Link>
      </TextBlock>
      </BlockStack>
    </Banner>
  );
}
