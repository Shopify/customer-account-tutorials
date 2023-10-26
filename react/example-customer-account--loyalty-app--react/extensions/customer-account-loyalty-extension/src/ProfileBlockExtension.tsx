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
  const api = useApi<"customer-account.profile.block.render">()
  return (
    <Card padding>
      <BlockStack spacing="loose">
        <Heading level={3}>Rewards</Heading>
        <InlineLayout>
          <BlockStack>
            <TextBlock appearance="subdued">Points</TextBlock>
            <TextBlock emphasis="bold" size="large">43,000</TextBlock>
          </BlockStack>
          <BlockStack>
            <TextBlock appearance="subdued">Store credit</TextBlock>
            <TextBlock emphasis="bold" size="large">$450</TextBlock>
          </BlockStack>
          <BlockStack>
            <TextBlock appearance="subdued">Referrals</TextBlock>
            <TextBlock emphasis="bold" size="large">3</TextBlock>
          </BlockStack>
          <BlockStack>
            <TextBlock appearance="subdued">Referrals bonus</TextBlock>
            <TextBlock emphasis="bold" size="large">600</TextBlock>
          </BlockStack>
        </InlineLayout>
        <BlockStack maxInlineSize={140}>
          <Button appearance="monochrome" kind="secondary">
            View rewards
          </Button>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}
