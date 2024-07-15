// [START menu-action-modal.render-modal]
import {
  Button,
  CustomerAccountAction,
  BlockStack,
  TextField,
  InlineStack,
  Form,
  extension,
} from "@shopify/ui-extensions/customer-account";

export default extension(
  'customer-account.order.action.render', 
  async(root, api) => {
    let note = "";

    const app = root.createComponent(
      CustomerAccountAction, 
      { 
        title: "Add a note to the order",
      },
      [ 
        root.createComponent(Form, { onSubmit: () => {
          try {
              // [START menu-action-modal.make-request]
              // make a request to the server to add a note
              // [END menu-action-modal.make-request]
          } catch(error) {
              console.log(error);
          } finally {
              api.close();
          }
          }}, [ 
            root.createComponent(BlockStack, {}, [
              root.createComponent(TextField, { value: note, onChange: (value) => { note =value; }, multiline: 3, label: "Note for the order" }),
              root.createComponent(InlineStack, { inlineAlignment: "end" }, [
                root.createComponent(Button, { onPress: () => api.close(), kind: 'secondary' }, "Cancel"),
                root.createComponent(Button, { kind: "primary", accessibilityRole: "submit" }, "Add note"),
              ]),
            ]),
          ]
        )
    ]);

    root.append(app);
  }
);
// [END menu-action-modal.render-modal]
