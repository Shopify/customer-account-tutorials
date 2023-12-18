
import {BlockStack, ResourceItem, extension, Image, Page, Grid, GridItem, TextBlock, Button} from '@shopify/ui-extensions/customer-account';
interface Product { 
  id: string;
  title: string;
  onlineStoreUrl: string;
  featuredImage: {
    url: string;
  }
  priceRange: {
    minVariantPrice: {
      amount: number;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: number;
      currencyCode: string;
    };
  };
}

export default extension(
  'customer-account.page.render',
  async (root, api) => {
    const {i18n} = api; 
    // [START full-page.fetch-wishlist]
    const fetchProducts = async () => {
      try {
        const data = await api.query<{ products: { nodes: Product[] }}>(
          `query ($first: Int!) {
            products(first: $first) {
              nodes {
                id
                title
                onlineStoreUrl
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
                featuredImage {
                  url
                }
              }
            }
          }`,
          {
            variables: {first: 10},
          },
        ); 
        return data;
      }catch(error) {
        console.log(error)
      }
    }
    // [END full-page.fetch-wishlist]

    let wishlists = (await fetchProducts()).data?.products?.nodes || []; 

    if(wishlists.length > 0){
      let app = root.createComponent(
        Grid,
        {
            columns: ['fill', 'fill', 'fill'],
            rows: 'auto',
            spacing: 'loose',
            blockAlignment: 'center'
        }
      );

      const deleteWishlistItem = (id: string) => {
        let filteredWishList = wishlists.filter((item => item.id !== id)); 
        wishlists = filteredWishList; 
      }

      const buildWishList = () => {
        wishlists.forEach((wishlist) => {
          const gridItem = root.createComponent(GridItem, {
            columnSpan: 1,
          });
          
          const viewButtonComponent = root.createComponent(
            Button,
            {
              to: `${wishlist.onlineStoreUrl}`
            },
            'View'
          );

          const removeButtonComponent = root.createComponent(
            Button,
            {
              onPress: () => {
                deleteWishlistItem(wishlist.id)
                pageComponent.removeChild(app);
                app = root.createComponent(
                  Grid,
                  {
                      columns: ['fill', 'fill', 'fill'],
                      rows: 'auto',
                      spacing: 'loose',
                      blockAlignment: 'center'
                  }
                );
                root.removeChild(pageComponent);
                buildWishList();
              },
              kind: 'secondary'
            },
            'Remove'
          );

          const fragmentActionButtons = root.createFragment(); 
          fragmentActionButtons.append(viewButtonComponent); 
          fragmentActionButtons.append(removeButtonComponent); 
          
          const wishlistItem = root.createComponent(
            ResourceItem, 
            {
              to: `/wishlist/${wishlist.id}`,
              action: fragmentActionButtons,
            }
          );

          const imageComponent = root.createComponent(
            Image, 
            {
            source: wishlist.featuredImage.url
            }
          );

          const titleTextComponent = root.createText(wishlist.title);

          const blockStackComponent = root.createComponent(BlockStack);

          const priceTextComponent = root.createComponent(
            TextBlock, 
            {
              appearance:'subdued'
            },
            i18n.formatCurrency(wishlist.priceRange.minVariantPrice.amount, {currency: wishlist.priceRange.minVariantPrice.currencyCode})
          );

          blockStackComponent.append(imageComponent);
          blockStackComponent.append(titleTextComponent);
          blockStackComponent.append(priceTextComponent);
          wishlistItem.append(blockStackComponent);

          gridItem.append(wishlistItem);
          
          app.append(gridItem);
        })

        const pageComponent = root.createComponent(
          Page, 
          {
            title: 'Wishlists',
          }
        );
    
        pageComponent.append(app);
        root.append(pageComponent);
      }
      buildWishList();
    }else{
      const app = root.createComponent(
        TextBlock,
        {}, 
        'No items in your wishlist'
      )
      root.append(app);
    }
  },
);
