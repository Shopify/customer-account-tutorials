import '@shopify/ui-extensions/preact';
import {render} from 'preact';
import {useState} from 'preact/hooks';

export default async () => {
  render(<MenuActionModalExtension />, document.body);
};

const dtcOptions = [
  {value: '1', label: 'Package item is damaged'},
  {value: '2', label: 'Missing items'},
  {value: '3', label: 'Wrong item was sent'},
  {value: '4', label: 'Item arrived too late'},
  {value: '5', label: 'Never received item'},
];

// [START menu-action-modal.b2b-check]
const b2bOptions = dtcOptions.concat([
  {value: '6', label: 'Package sent to the wrong company location'},
]);
// [END menu-action-modal.b2b-check]

function MenuActionModalExtension() {
  const [currentProblem, setCurrentProblem] = useState('1');
  const [isLoading, setIsLoading] = useState(false);

  // [START menu-action-modal.b2b-check]
  const isB2BCustomer =
    shopify.authenticatedAccount.purchasingCompany.value != null;
  // [END menu-action-modal.b2b-check]

  // [START menu-action-modal.on-submit]
  function onSubmit() {
    // Simulating a request to your server to store the reported problem
    setIsLoading(true);

    console.log('Problem reported: ', currentProblem);

    setTimeout(() => {
      setIsLoading(false);
      shopify.close();
    }, 750);
  }
  // [END menu-action-modal.on-submit]

  // [START menu-action-modal.b2b-check]
  const options = isB2BCustomer ? b2bOptions : dtcOptions;
  // [END menu-action-modal.b2b-check]

  // [START menu-action-modal.build-ui]
  return (
    <s-customer-account-action heading="Report a problem">
      <s-select
        label="Select a problem"
        value={currentProblem}
        onChange={(e) => setCurrentProblem(e.target.value)}
      >
        {options.map((option) => (
          <s-option key={option.value} value={option.value}>
            {option.label}
          </s-option>
        ))}
      </s-select>

      <s-button
        slot="primary-action"
        loading={isLoading}
        onClick={() => onSubmit()}
      >
        Report
      </s-button>
      <s-button slot="secondary-actions" onClick={() => shopify.close()}>
        Cancel
      </s-button>
    </s-customer-account-action>
  );
  // [END menu-action-modal.build-ui]
}
