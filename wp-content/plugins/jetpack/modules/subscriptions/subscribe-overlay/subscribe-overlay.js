const{domReady}=wp;domReady(function(){const overlay=document.querySelector('.jetpack-subscribe-overlay');const overlayDismissedCookie='jetpack_post_subscribe_overlay_dismissed';const skipUrlParam='jetpack_skip_subscription_popup';const hasOverlayDismissedCookie=document.cookie&&document.cookie.indexOf(overlayDismissedCookie)>-1;function skipOverlay(){const url=new URL(window.location.href);if(url.searchParams.has(skipUrlParam)){url.searchParams.delete(skipUrlParam);window.history.replaceState({},'',url);setOverlayDismissedCookie();return true;}
return false;}
if(!overlay||hasOverlayDismissedCookie||skipOverlay()){return;}
const close=overlay.querySelector('.jetpack-subscribe-overlay__close');close.onclick=function(event){event.preventDefault();closeOverlay();};const toContent=overlay.querySelector('.jetpack-subscribe-overlay__to-content');if(toContent){toContent.onclick=function(event){event.preventDefault();closeOverlay();};}
const form=overlay.querySelector('form');if(form){form.addEventListener('subscription-modal-loaded',closeOverlay);}
function closeOverlayOnEscapeKeydown(event){if(event.key==='Escape'){closeOverlay();}}
function openOverlay(){overlay.classList.add('open');document.body.classList.add('jetpack-subscribe-overlay-open');setOverlayDismissedCookie();window.addEventListener('keydown',closeOverlayOnEscapeKeydown);}
function closeOverlay(){overlay.classList.remove('open');document.body.classList.remove('jetpack-subscribe-overlay-open');window.removeEventListener('keydown',closeOverlayOnEscapeKeydown);}
function setOverlayDismissedCookie(){document.cookie=`${ overlayDismissedCookie }=true; path=/;`;}
openOverlay();});