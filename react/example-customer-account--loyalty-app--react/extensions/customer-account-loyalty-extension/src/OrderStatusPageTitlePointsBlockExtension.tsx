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
  const {i18n} = useApi<"customer-account.order-status.block.render">()
  return (
    <Banner>
      <BlockStack inlineAlignment="center" >
      <TextBlock>
        {i18n.translate("points.content", {
          viewRewards: (
            <Link onPress={() => {}}>
              {i18n.translate("points.viewRewards")}
            </Link>
          )
        })}
      </TextBlock>
      </BlockStack>
    </Banner>
  );
}
