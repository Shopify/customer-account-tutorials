import '@shopify/ui-extensions/preact';
import {render} from "preact";

export default function() {
  render(<LocalizeExtension />, document.body)
}

// [START localization.build-ui]
// [START localization.format-balance]
function LocalizeExtension() {
  const balance = 49.99;
  const formattedBalance = shopify.i18n.formatCurrency(balance);
  // [END localization.format-balance]
  
  // [START localization.format-points]
  const points = 1250;
  const formattedPoints = shopify.i18n.formatNumber(points);
  // [END localization.format-points]

  return (
    <s-banner heading={shopify.i18n.translate("bannerHeading")}>
      <s-stack gap="base">
        {/* [START localization.translate-points] */}
        <s-text>
          {shopify.i18n.translate("loyaltyPoints", {
            count: points,
            formattedPoints
          })}
        </s-text>
        {/* [END localization.translate-points] */}
        
        {/* [START localization.translate-balance] */}
        <s-text>
          {shopify.i18n.translate("balanceRemaining", { formattedBalance })}
        </s-text>
        {/* [END localization.translate-balance] */}
      </s-stack>
    </s-banner>
  );
}
// [END localization.build-ui]