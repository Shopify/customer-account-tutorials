# Building metafield writes into extensions

This tutorial code introduces a Customer Account UI extension that reads and writes a value from a metafield. The code is based on a template for building a [Shopify app](https://shopify.dev/docs/apps/getting-started) using the [Remix](https://remix.run) framework.

## Your new App and Extension

Some notable files:

- `shopify.app.toml`, the configuration file for your app. This file contains the access scopes that will be required for this example. This file will be automatically updated to include other properties when you run the Shopify CLI preview
- `shopify.extension.toml`, the configuration file for your extension. This file defines your extension’s name, the target(s), and where the code lives.
- `app/shopify.server.ts`, contains code that will be triggered upon app installation
- `src/*.js`, the source code for your extension.
- `locales/en.default.json` and `locales/fr.json`, which contain translations used to [localized your extension](https://shopify.dev/docs/apps/checkout/best-practices/localizing-ui-extensions).

## Quick start

### Prerequisites

Before you begin, you'll need the following:

1. **Node.js**: [Download and install](https://nodejs.org/en/download/) it if you haven't already.
2. **Shopify Partner Account**: [Create an account](https://partners.shopify.com/signup) if you don't have one.
3. **Test Store**: Set up a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) that's part of the [Checkout and Customer Account Extensibility Dev Preview](https://shopify.dev/docs/api/release-notes/developer-previews#checkout-and-customer-accounts-extensibility-developer-preview) in order to test your app.

### Setup

Using yarn:

```shell
yarn install
```

Using npm:

```shell
npm install
```

Using pnpm:

```shell
pnpm install
```

### Local Development

Using yarn:

```shell
yarn dev
```

Using npm:

```shell
npm run dev
```

Using pnpm:

```shell
pnpm run dev
```

Begin by following the install link to install the app on your development shop.

Press `P` to preview your app.

Local development is powered by [the Shopify CLI](https://shopify.dev/docs/apps/tools/cli). It logs into your partners account, connects to an app, provides environment variables, updates remote config, creates a tunnel and provides commands to generate extensions.


## Useful Links

- [Customer account UI extension documentation](https://shopify.dev/docs/api/customer-account-ui-extensions)
  - [Configuration](https://shopify.dev/docs/api/customer-account-ui-extensions/unstable/configuration)
  - [API Reference](https://shopify.dev/docs/api/customer-account-ui-extensions/unstable/apis)
  - [UI Components](https://shopify.dev/docs/api/customer-account-ui-extensions/unstable/components)
