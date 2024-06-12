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
  reactExtension,
  Text,
  useApi,
} from "@shopify/ui-extensions-react/customer-account";
import { useState } from "react";

// [START setup-targets.extension]
export default reactExtension(
  "customer-account.profile.block.render",
  async () => {
    const { customerId, nickName }  = await getCustomerPreferences();

    return (
      <ProfilePreferenceExtension
        customerId={customerId}
        nickName={nickName}
      />
    );
  },
);
// [END setup-targets.extension]

interface Props {
  customerId: string;
  nickName?: string;
}

function ProfilePreferenceExtension(props: Props) {
  const { i18n, ui } = useApi();
  const [nickName, setNickName] = useState(props.nickName ?? "");

  const handleSubmit = async () => {
    await setCustomerPreferences(props.customerId, nickName);
    ui.overlay.close("edit-preferences-modal");
  };

  const handleCancel = () => {
    ui.overlay.close("edit-preferences-modal");
  };

  // [START build-extension.ui]
  return (
    <Card padding>
      <BlockStack spacing="loose">
        <Heading level={3}>
          <InlineStack>
            <Text>{i18n.translate("preferenceCard.heading")}</Text>
            <Button
              kind="plain"
              accessibilityLabel={i18n.translate("preferenceCard.edit")}
              overlay={
                <Modal
                  id="edit-preferences-modal"
                  padding
                  title={i18n.translate("preferenceCard.modalHeading")}
                >
                  <Form onSubmit={handleSubmit}>
                    <BlockStack>
                      <TextField
                        label={i18n.translate("preferenceCard.nickName.label")}
                        value={nickName}
                        onChange={(value) => setNickName(value)}
                      />
                      <InlineStack blockAlignment="center" inlineAlignment="end">
                        <Button kind="plain" onPress={() => handleCancel()}>
                          {i18n.translate("preferenceCard.cancel")}
                        </Button>
                        <Button accessibilityRole="submit">
                          {i18n.translate("preferenceCard.save")}
                        </Button>
                      </InlineStack>
                    </BlockStack>
                  </Form>
                </Modal>
              }
            >
              <Icon source="pen" size="small" appearance="monochrome" />
            </Button>
          </InlineStack>
        </Heading>
        <BlockStack spacing="none">
          <Text appearance="subdued">
            {i18n.translate("preferenceCard.nickName.label")}
          </Text>
          <Text>{nickName}</Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
  // [END build-extension.ui]
}

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
async function setCustomerPreferences(
  customerId: string,
  nickName?: string,
) {
  await fetch("shopify:customer-account/api/2024-07/graphql.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `mutation setPreferences($metafields: [MetafieldsSetInput!]!) {
          metafieldsSet(metafields: $metafields) {
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
            value: nickName ?? "",
          },
        ],
      },
    }),
  });
}
// [END write-metafield.mutation]
