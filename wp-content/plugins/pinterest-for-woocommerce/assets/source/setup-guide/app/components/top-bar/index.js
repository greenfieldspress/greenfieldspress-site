import{Link}from'@woocommerce/components';import{Icon,chevronLeft}from'@wordpress/icons';const TopBar=({title,backHref,helpButton,onBackButtonClick})=>{return(<div className="woocommerce-layout__header"><div className="woocommerce-layout__header-wrapper"><Link
className="woocommerce-layout__header-back-button"
href={backHref}
type="wc-admin"
onClick={onBackButtonClick}><Icon icon={chevronLeft}onClick={onBackButtonClick}/></Link><div className="woocommerce-layout__header-heading with-back-button"><span>{title}</span><div>{helpButton}</div></div></div></div>);};export default TopBar;