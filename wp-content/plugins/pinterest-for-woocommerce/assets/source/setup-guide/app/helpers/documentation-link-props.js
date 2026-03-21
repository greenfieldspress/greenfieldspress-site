import{recordEvent}from'@woocommerce/tracks';function documentationLinkProps({href,linkId,context,target='_blank',rel='noopener',onClick,eventName='pfw_documentation_link_click',...props}){return{href,target,rel,...props,onClick:(event)=>{if(onClick){onClick(event);}
if(!event.defaultPrevented){recordEvent(eventName,{link_id:linkId,context,href,});}},};}
export default documentationLinkProps;