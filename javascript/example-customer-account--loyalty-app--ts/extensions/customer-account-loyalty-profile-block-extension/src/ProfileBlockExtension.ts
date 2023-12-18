import { extension,Card, BlockStack, TextBlock, Heading, InlineLayout, Button } from '@shopify/ui-extensions/customer-account';

// [START profile.build-ui]
export default extension('customer-account.profile.block.render', (root, api) => { 
  const { i18n , extension} = api;

  const app = root.createComponent(
    Card,
    {
      padding: true
    }
  )

  const contentWrapper = root.createComponent(
    BlockStack, 
    {
      spacing: "loose"
    }
  )

  const heading = root.createComponent(Heading)
    
  const headingText = root.createText("Rewards")

  heading.append(headingText); 

  contentWrapper.append(heading); 

  const sectionWrapper = root.createComponent(InlineLayout); 

  const rewardPointsWrapper = root.createComponent(BlockStack); 
    
  const rewardPointsLabelTextBlock = root.createComponent(
    TextBlock, 
    {
      appearance: 'subdued'
    }, 
    "Points"
  ); 

  const rewardPointsContentTextBlock = root.createComponent(
    TextBlock, 
    {
      emphasis: 'bold',
      size : 'large'
    }, 
    "43,000"
    ); 

    rewardPointsWrapper.append(rewardPointsLabelTextBlock); 
    rewardPointsWrapper.append(rewardPointsContentTextBlock); 
    sectionWrapper.append(rewardPointsWrapper); 

  const storeCreditWrapper = root.createComponent(BlockStack); 

  const storeCreditLabelTextBlock = root.createComponent(
    TextBlock, 
    {
      appearance: 'subdued'
    }, 
    "Store credit"
  ); 
  
  const storeCreditContentTextBlock = root.createComponent(
    TextBlock, 
    {
      emphasis: 'bold',
      size : 'large'
    }, 
    '$450'
  ); 
  
  storeCreditWrapper.append(storeCreditLabelTextBlock); 
  storeCreditWrapper.append(storeCreditContentTextBlock); 
  sectionWrapper.append(storeCreditWrapper); 

  const referralsWrapper = root.createComponent(BlockStack); 

  const referralsLabelTextBlock = root.createComponent(
    TextBlock, 
    {
      appearance: 'subdued'
    }, 
    "Referrals"
  ); 
  
  const referralsContentTextBlock = root.createComponent(
    TextBlock, 
    {
      emphasis: 'bold',
      size : 'large'
    }, 
    '3'
  ); 
  
  referralsWrapper.append(referralsLabelTextBlock); 
  referralsWrapper.append(referralsContentTextBlock); 
  sectionWrapper.append(referralsWrapper); 

  const referralBonusWrapper = root.createComponent(BlockStack); 
      
  const referralBonusLabelTextBlock = root.createComponent(
    TextBlock, 
    {
      appearance: 'subdued'
    }, 
    "Referral bonus"
  ); 
  
  const referralBonusContentTextBlock = root.createComponent(
    TextBlock, 
    {
      emphasis: 'bold',
      size : 'large'
    }, 
    '600'
  ); 
  
  referralBonusWrapper.append(referralBonusLabelTextBlock); 
  referralBonusWrapper.append(referralBonusContentTextBlock); 
  sectionWrapper.append(referralBonusWrapper); 
  
  const buttonWrapper = root.createComponent(
    BlockStack, 
    {
      maxInlineSize: 140,
    }
  );
      
  const button = root.createComponent(
    Button, 
    {
      appearance: "monochrome", 
      kind: "secondary"
    },
    'View rewards'
  );

  buttonWrapper.append(button);

  contentWrapper.append(sectionWrapper);
  contentWrapper.append(buttonWrapper);
  app.append(contentWrapper);
  root.appendChild(app);
});
// [END profile.build-ui]