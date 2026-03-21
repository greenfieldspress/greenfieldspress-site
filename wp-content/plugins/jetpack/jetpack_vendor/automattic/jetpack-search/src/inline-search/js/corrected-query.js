document.addEventListener('DOMContentLoaded',()=>{if(!window.JetpackSearchCorrectedQuery?.html){return;}
const{selectors,html}=window.JetpackSearchCorrectedQuery;const titleElement=document.querySelector(selectors.join(', '));if(!titleElement){return;}
titleElement.insertAdjacentHTML('afterend',html);});