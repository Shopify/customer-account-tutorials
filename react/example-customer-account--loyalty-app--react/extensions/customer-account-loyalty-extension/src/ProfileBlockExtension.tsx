import {
  Card,
  BlockStack,
  reactExtension,
  useApi,
  TextBlock,
  Heading,
  InlineLayout,
  Link,
  Button,
} from "@shopify/ui-extensions-react/customer-account";

export default reactExtension(
  "customer-account.profile.block.render",
  ( ) => <ProfileBlockExtension />
);

function ProfileBlockExtension( ) {
  const {i18n} = useApi<"customer-account.profile.block.render">()
  return (
    <Card padding>
      <BlockStack spacing="loose">
        <Heading level={3}>{i18n.translate("rewards.heading")}</Heading>
        <InlineLayout>
          <BlockStack>
            <TextBlock appearance="subdued">{i18n.translate("rewards.points")}</TextBlock>
            <TextBlock emphasis="bold" size="large">43,000</TextBlock>
          </BlockStack>
          <BlockStack>
            <TextBlock appearance="subdued">{i18n.translate("rewards.storeCredit")}</TextBlock>
            <TextBlock emphasis="bold" size="large">$450</TextBlock>
          </BlockStack>
          <BlockStack>
            <TextBlock appearance="subdued">{i18n.translate("rewards.referrals")}</TextBlock>
            <TextBlock emphasis="bold" size="large">3</TextBlock>
          </BlockStack>
          <BlockStack>
            <TextBlock appearance="subdued">{i18n.translate("rewards.referralBonus")}</TextBlock>
            <TextBlock emphasis="bold" size="large">600</TextBlock>
          </BlockStack>
        </InlineLayout>
        <BlockStack maxInlineSize={140}>
          <Button appearance="monochrome" kind="secondary">
            {i18n.translate("points.viewRewards")}
          </Button>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}
