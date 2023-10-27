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
  "customer-account.page.render",
  () => <FullPageExtension />
);

import blossom from './assets/blossom.png';

function FullPageExtension() {
  const { i18n } = useApi<"customer-account.page.render">();

  let wishList = [
    { id: "1", "title" : "The Garden Tour", "price" : 30, "image" : ""},
    { id: "2", "title" : "Pure Manuka Honey", "price" : 45, "image" : ""},
    { id: "3", "title" : "Roma Heirloom Candle", "price" : 50.99, "image" : ""},
    { id: "4", "title" : "Winter Harvested Olive Oil", "price" : 80, "image" : ""},
    { id: "5", "title" : "Summer Scent", "price" : 150, "image" : ""},
    { id: "6", "title" : "Saffrom Orange Blossom", "price" : 24.50, "image" : ""},
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
                <TextBlock appearance="subdued">{i18n.formatCurrency(item.price, {currency: 'USD'})}</TextBlock>
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
