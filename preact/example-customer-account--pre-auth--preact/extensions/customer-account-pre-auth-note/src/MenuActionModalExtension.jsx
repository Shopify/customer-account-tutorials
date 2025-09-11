// [START menu-action-modal.render-modal]
import '@shopify/ui-extensions/preact';
import {render} from 'preact';
import {useState} from 'preact/hooks';

export default async () => {
  render(<MenuActionModalExtension />, document.body);
};

function MenuActionModalExtension() {
  const [note, setNote] = useState('');

  function saveNote() {
    try {
      // [START menu-action-modal.make-request]
      // make a request to the server to add a note
      // [END menu-action-modal.make-request]
      console.log(note);
    } catch (error) {
      console.log(error);
    } finally {
      shopify.close();
    }
  }

  return (
    <s-customer-account-action heading="Add a note to the order">
      <s-stack direction="block">
        <s-text-area
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          label="Note for the order"
        />
      </s-stack>

      <s-button slot="primary-action" type="submit" onClick={saveNote}>
        Add note
      </s-button>
      <s-button
        slot="secondary-actions"
        onClick={() => shopify.close()}
        variant="secondary"
      >
        Cancel
      </s-button>
    </s-customer-account-action>
  );
}
// [END menu-action-modal.render-modal]
