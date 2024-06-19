import {
  BlockStack,
  Button,
  Card,
  Form,
  TextField,
  Heading,
  Icon,
  InlineStack,
  Modal,
  extension,
  Text,
} from "@shopify/ui-extensions/customer-account";

// [START setup-targets.extension]
export default extension(
  "customer-account.profile.block.render",
  async (root, api) => {
    const { customerId, nickName } = await getCustomerPreferences();

    renderProfilePreferenceExtension(root, api, customerId, nickName);
  },
);
// [END setup-targets.extension]

// [START build-extension.ui]
function renderProfilePreferenceExtension(root, api, customerId, nickName) {
  const { i18n, ui } = api;

  const setNickName = (value) => {
    nickName = value;
  };

  const handleSubmit = async () => {

    if (!nickName) {
      return;
    }

    await setCustomerPreferences(customerId, nickName);

    nickNameText.update(nickName);
    nickNameTextField.updateProps({ value: nickName });

    ui.overlay.close("edit-preferences-modal");
  };

  const handleCancel = () => {
    ui.overlay.close("edit-preferences-modal");
  };

  const nickNameTextField = root.createComponent(TextField, {
    label: i18n.translate("preferenceCard.nickName.label"),
    value: nickName,
    onChange: setNickName,
  });
  const modal = root.createComponent(Modal, {
    id: "edit-preferences-modal",
    padding: true,
    title: i18n.translate("preferenceCard.modalHeading"),
  }, [
    root.createComponent(Form, { onSubmit: handleSubmit }, [
      root.createComponent(BlockStack, undefined, [
        nickNameTextField,
        root.createComponent(InlineStack, { blockAlignment: "center", inlineAlignment: "end" }, [
          root.createComponent(Button, { kind: "plain", onPress: handleCancel }, i18n.translate("preferenceCard.cancel")),
          root.createComponent(Button, { accessibilityRole: "submit" }, i18n.translate("preferenceCard.save")),
        ])
      ]),
    ]),
  ]);

  const modalFragment = root.createFragment();
  modalFragment.appendChild(modal);

  const nickNameText = root.createText(nickName);
  const preferenceCard = root.createComponent(
    Card,
    { padding: true },
    [
      root.createComponent(BlockStack, { spacing: "loose" }, [
        root.createComponent(Heading, { level: 3 }, [
          root.createComponent(InlineStack, undefined, [
            root.createComponent(Text, undefined, i18n.translate("preferenceCard.heading")),
            root.createComponent(Button, {
              kind: "plain",
              accessibilityLabel: i18n.translate("preferenceCard.edit"),
              overlay: modalFragment,
            }, [
              root.createComponent(Icon, { source: "pen", size: "small", appearance: "monochrome"}),
            ]),
          ]),
        ]),
        root.createComponent(BlockStack, { spacing: "loose" }, [
          root.createComponent(Text, { appearance: "subdued" }, i18n.translate("preferenceCard.nickName.label")),
          nickNameText,
        ]),
      ]),
    ]
  );

  root.append(preferenceCard);
}
// [END build-extension.ui]

// [START build-extension.get-value]
async function getCustomerPreferences() {
  const response = await fetch(
    "shopify:customer-account/api/2024-07/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query preferences($key: String!, $namespace: String!) {
          customer {
          id
            metafield(namespace: $namespace, key: $key) {
              value
            }
          }
        }`,
        variables: {
          key: "nickname",
          namespace: "$app:preferences",
        },
      }),
    },
  );

  const { data } = await response.json();

  return {
    customerId: data.customer.id,
    nickName: data.customer.metafield?.value,
  };
}
// [END build-extension.get-value]

// [START write-metafield.mutation]
async function setCustomerPreferences(customerId, newNickName) {
  await fetch("shopify:customer-account/api/2024-07/graphql.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `mutation setPreferences($metafields: [MetafieldsSetInput!]!) {
          metafieldsSet(metafields: $metafields) {
            metafields {
              value
            }
            userErrors {
              field
              message
            }
          }
        }`,
      variables: {
        metafields: [
          {
            key: "nickname",
            namespace: "$app:preferences",
            ownerId: customerId,
            value: newNickName ?? "",
          },
        ],
      },
    }),
  });
}
// [END write-metafield.mutation]
