import{__}from'@wordpress/i18n';import{Spinner}from'@woocommerce/components';import{recordEvent}from'@woocommerce/tracks';import{Button,CardBody,Flex,FlexItem,FlexBlock,__experimentalText as Text,}from'@wordpress/components';import'./style.scss';import{useSettingsSelect}from'../../helpers/effects';const Billing=()=>{const isBillingSetup=useSettingsSelect()?.account_data?.is_billing_setup;const getElement=()=>{if(isBillingSetup===undefined){return<Spinner className="pfw-billing-info__preloader"/>;}
if(isBillingSetup===true){return(<><FlexBlock className="pfw-billing-info--status-success"><Text variant="body">{__('Billing Setup Correctly','pinterest-for-woocommerce')}</Text></FlexBlock><FlexItem><Button
isLink
href={wcSettings.pinterest_for_woocommerce.billingSettingsUrl}
onClick={()=>recordEvent('pfw_go_to_billing_button_click')}>{__('Go to billing settings','pinterest-for-woocommerce')}</Button></FlexItem></>);}
return(<><FlexBlock className="pfw-billing-info--status-error"><Text variant="body">{__('No Valid Billing Setup Found','pinterest-for-woocommerce')}</Text></FlexBlock><FlexItem><Button
isLink
href={wcSettings.pinterest_for_woocommerce.billingSettingsUrl}
onClick={()=>recordEvent('pfw_billing_setup_button_click')}>{__('Setup Billing','pinterest-for-woocommerce')}</Button></FlexItem></>);};return(<CardBody size="large"><Flex direction="row"className="pfw-billing-info">{getElement()}</Flex></CardBody>);};export default Billing;