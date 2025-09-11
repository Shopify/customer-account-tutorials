import '@shopify/ui-extensions/preact';
import {render} from 'preact';

export default async () => {
  render(<MenuActionItemButtonExtension />, document.body);
};

// [START menu-action.render-button]
function MenuActionItemButtonExtension() {
  return <s-button>Add note</s-button>;
}
// [END menu-action.render-button]