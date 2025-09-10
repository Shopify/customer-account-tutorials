import '@shopify/ui-extensions/preact';
import {render} from 'preact';

// [START block.build-ui]
export default async () => {
  render(<BlockExtension />, document.body);
};

function BlockExtension() {
  return (
    <s-section>
      <s-stack direction="inline" inline-alignment="center" gap="small-400">
        <s-text>Grow your garden with more plants from your wishlist.</s-text>
        <s-link href="extension:wishlist-extension-preact/">
          View wishlist
        </s-link>
      </s-stack>
    </s-section>
  );
}
// [END block.build-ui]
