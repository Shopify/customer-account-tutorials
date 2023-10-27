import {
  Card,
  reactExtension,
  useApi,
  Grid,
  GridItem,
  BlockStack,
  TextBlock,
  Button,
  InlineLayout,
  Image,
  Page
} from "@shopify/ui-extensions-react/customer-account";

export default reactExtension(
  "CustomerAccount::FullPage::RenderWithin",
  () => <FullPageExtension />
);

function FullPageExtension() {
  const { i18n } = useApi<"CustomerAccount::FullPage::RenderWithin">();

  let wishList = [
    { id: "1", "title" : "The Garden Tour", "price" : "$30.00", "image" : "https://cdn.shopify.tutorials.grace-rivas.us.spin.dev/s/files/1/0000/0008/files/alicealice8507_private_label_organic_natural_healthy_product_pa_acc91886-5b8b-4139-a8ff-f0f6852db2dd.png?v=1697556048&width=1206"},
    { id: "2", "title" : "Pure Manuka Honey", "price" : "$45.00", "image" : "https://cdn.shopify.tutorials.grace-rivas.us.spin.dev/s/files/1/0000/0008/files/private_label_organic_natural_healthy_product_pa_eae604d0-3345-44c1-a15b-a9d3b2c3bf49.png?v=1697556107&width=1206"},
    { id: "3", "title" : "Roma Heirloom Candle", "price" : "$50.99", "image" : "https://cdn.shopify.tutorials.grace-rivas.us.spin.dev/s/files/1/0000/0008/files/alicealice8507_private_label_organic_natural_healthy_product_pa_fdecf2d5-25d8-4654-8cac-193fbe640b0a.png?v=1697557723&width=1206"},
    { id: "4", "title" : "Winter Harvested Olive Oil", "price" : "$80.00", "image" : "https://cdn.shopify.tutorials.grace-rivas.us.spin.dev/s/files/1/0000/0008/files/alicealice8507_private_label_organic_natural_healthy_product_pa_321670b7-b2dd-44c1-ba9f-5775e514e986.png?v=1697557796&width=1206"},
    { id: "5", "title" : "Summer Scent", "price" : "$150.00", "image" : "https://cdn.shopify.tutorials.grace-rivas.us.spin.dev/s/files/1/0000/0008/files/alicealice8507_private_label_organic_natural_healthy_product_pa_a89fd913-2b15-4ca9-ab23-9ad97776270e.png?v=1697557856&width=1206"},
    { id: "6", "title" : "Saffrom Orange Blossom", "price" : "$24.50", "image" : "https://cdn.shopify.tutorials.grace-rivas.us.spin.dev/s/files/1/0000/0008/files/alicealice8507_private_label_organic_natural_healthy_product_pa_ab2e4522-2298-4ad0-8cd1-05f34038e85e.png?v=1697557897&width=1206"},
  ]

  return (
  <Page title={i18n.translate("wishlist.heading")}>
    <Grid columns={['fill', 'fill', 'fill']} rows="auto" spacing="loose">
      {wishList.map((item) => {
          return (
            <GridItem key="item">
              <Card padding>
                <BlockStack spacing="base">
                <Image source={item.image}></Image>
                <TextBlock emphasis="bold">{item.title}</TextBlock>
                <TextBlock appearance="subdued">{item.price}</TextBlock>
                <InlineLayout spacing="base">
                  <Button kind="primary">
                    {i18n.translate("wishlist.addToCart")}
                  </Button>
                  <Button kind="secondary">
                  {i18n.translate("wishlist.remove")}
                  </Button>
                </InlineLayout>
                </BlockStack>
              </Card>
            </GridItem>
          )
        })
      }
    </Grid>
  </Page>
  );
}
