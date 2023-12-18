import {
  Button,
  CustomerAccountAction,
  Select,
  extension,
} from "@shopify/ui-extensions/customer-account";

export default extension(
  'customer-account.order.action.render',
  async(root, api) => {
    const dtcOptions =  [
      {value:"1" , label: "Package item is damaged"},
      {value:"2" , label: "Missing items"},
      {value:"3" , label: "Wrong item was sent"},
      {value:"4" , label: "Item arrived too late"},
      {value:"5" , label: "Never received item"}
    ]
    
    const b2bOptions = dtcOptions.concat([
      {value:"6" , label: "Package sent to the wrong company location"},
      ]);

    const {close, authenticatedAccount} = api;   
    
    const isB2BCustomer = authenticatedAccount.purchasingCompany.current != null;
    
    let currentProblem = "1";
    
    function setCurrentProblem(value){
      currentProblem = value; 
    } 

    let isLoading = "false"; 

    function setIsLoading(value){
      currentProblem = value; 
    }

    const buttonClose = root.createComponent(
      Button, 
      {
         onPress: () => close()
      },
      "Submit"
    );

    const buttonCancel = root.createComponent(
      Button, 
      {
        onPress: () => close()
      },
      "Cancel"
    ); 
    
    const buttonCloseFragment = root.createFragment();
    await buttonCloseFragment.appendChild(buttonClose);
    
    const buttonCancelFragment = root.createFragment();
    await buttonCancelFragment.appendChild(buttonCancel);
    
    const selectWrapper = root.createComponent(
      Select, 
      {
        label: 'Select a problem', 
        options: isB2BCustomer ? b2bOptions : dtcOptions, 
        value: currentProblem,
        onChange: (value) => setCurrentProblem(value)

      }, 
    ); 

    const app = root.createComponent(
      CustomerAccountAction, 
      { 
        title: "Report a problem",
        primaryAction: buttonCloseFragment, 
        secondaryAction: buttonCancelFragment, 
      },
      selectWrapper
    ); 

    root.append(app);
  },
);


