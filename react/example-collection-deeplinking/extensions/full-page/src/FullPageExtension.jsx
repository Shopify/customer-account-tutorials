import {
  reactExtension,
  Banner,
} from "@shopify/ui-extensions-react/customer-account";

export default reactExtension(
  "customer-account.page.render",
  () => <FullPageExtension />
);

function FullPageExtension() {
  return (
    <Banner>Welcome to full page loyalty extension</Banner>
  )
}
