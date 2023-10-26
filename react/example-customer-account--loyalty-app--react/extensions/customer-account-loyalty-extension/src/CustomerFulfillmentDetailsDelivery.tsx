import {
Card,
BlockStack,
reactExtension,
Button,
useApi,
TextBlock
} from "@shopify/ui-extensions-react/customer-account";

export default reactExtension(
"customer-account.order-status.fulfillment-details.render-after",
( ) => <CustomerFulfillmentDetailsDelivery />
);

function CustomerFulfillmentDetailsDelivery( ) {
  const api = useApi<"customer-account.order-status.fulfillment-details.render-after">()
  return (
    <Card padding>
      <BlockStack>
        <TextBlock>
          Tell us how we did for a chance to win 1000 points
        </TextBlock>
        <BlockStack maxInlineSize={150}>
          <Button appearance="monochrome" kind="secondary" >
            Write a review
          </Button>
        </BlockStack>
     </BlockStack>
   </Card>
  );
}
