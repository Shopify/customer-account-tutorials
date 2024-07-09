// [START menu-action-modal.render-modal]
import {useState} from "react";
import {
  Button,
  CustomerAccountAction,
  reactExtension,
  useApi,
  BlockStack,
  TextField,
  InlineStack,
  Form
} from "@shopify/ui-extensions-react/customer-account";

export default reactExtension(
  "customer-account.order.action.render",
  () => <MenuActionModalExtension />
);

function MenuActionModalExtension( ) {
  const api = useApi<"customer-account.order.action.render">();
  const [note, setNote] = useState("");

  return (
    <CustomerAccountAction
      title={"Add a note to the order"}
    >
      <Form onSubmit={() => {

        try {
          // [START menu-action-modal.make-request]
          // make a request to the server to add a note
          // [END menu-action-modal.make-request]
        } catch(error) {
          // toast api if possible
          console.log(error);
        } finally {
          // api.storage.write("orderNote", note);
          api.close();
        }

      }}>
        <BlockStack>
          <TextField value={note} onChange={(value) => setNote(value) } multiline={3} label="Note for the order"/>
          <InlineStack inlineAlignment="end">
            <Button onPress={() => api.close()} kind='secondary'>Cancel</Button>
            <Button kind="primary" accessibilityRole="submit">Add note</Button>
          </InlineStack>
        </BlockStack>
      </Form>
    </CustomerAccountAction>
  );
}
// [END menu-action-modal.render-modal]
