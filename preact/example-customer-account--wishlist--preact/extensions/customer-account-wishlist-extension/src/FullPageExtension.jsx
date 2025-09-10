import '@shopify/ui-extensions/preact';
import {render} from 'preact';
import {useEffect, useState} from 'preact/hooks';

// [START full-page.setup-target]
export default async () => {
  render(<FullPageExtension />, document.body);
};
// [END full-page.setup-target]

function FullPageExtension() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState({
    id: null,
    loading: false,
  });

  // [START full-page.fetch-wishlist]
  async function fetchWishlist() {
    setLoading(true);

    try {
      // Implement a server request to retrieve the wishlist for this customer
      // Then call the Storefront API to retrieve the details of the wishlisted products
      const data = await shopify.query(
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
              }
              featuredImage {
                url
              }
            }
          }
        }`,
        {
          variables: {first: 10},
        }
      );
      setLoading(false);
      setWishlist(data.data?.products?.nodes || []);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  // [END full-page.fetch-wishlist]

  // [START full-page.delete-item]
  async function deleteWishlistItem(id) {
    // Simulate a server request
    setRemoveLoading({loading: true, id});
    return new Promise((resolve) => {
      setTimeout(() => {
        // Send a request to your server to delete the wishlist item
        setWishlist(wishlist.filter((item) => item.id !== id));

        setRemoveLoading({loading: false, id: null});
        resolve();
      }, 750);
    });
  }
  // [END full-page.delete-item]

  // [START full-page.fetch-wishlist]
  useEffect(() => {
    fetchWishlist();
  }, []);
  // [END full-page.fetch-wishlist]

  // [START full-page.build-ui]
  return (
    <s-page heading="Wishlist">
      <s-grid gridTemplateColumns="1fr 1fr 1fr" gap="base">
        {!loading &&
          wishlist.length > 0 &&
          wishlist.map((product) => {
            return (
              <s-section key={product.id}>
                <s-stack direction="block" gap="base" paddingBlockEnd="large">
                  <s-image src={product.featuredImage.url} />
                  <s-stack direction="block" gap="small-500">
                    <s-text color="subdued">{product.title}</s-text>
                    <s-text type="strong">
                      {shopify.i18n.formatCurrency(
                        product.priceRange.minVariantPrice.amount,
                        {
                          currency:
                            product.priceRange.minVariantPrice.currencyCode,
                        }
                      )}
                    </s-text>
                  </s-stack>
                </s-stack>
                <s-button slot="primary-action" href={product.onlineStoreUrl}>
                  View product
                </s-button>
                <s-button
                  slot="secondary-actions"
                  loading={
                    removeLoading.loading && product.id === removeLoading.id
                  }
                  onClick={() => {
                    deleteWishlistItem(product.id);
                  }}
                >
                  Remove
                </s-button>
              </s-section>
            );
          })}
        {!loading && wishlist.length === 0 && (
          <s-text>No items in your wishlist.</s-text>
        )}
      </s-grid>
    </s-page>
  );
  // [END full-page.build-ui]
}
