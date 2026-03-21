jQuery(function($){var $toggleContainer=$('.wcs-auto-renew-toggle');var $toggle=$('.subscription-auto-renew-toggle',$toggleContainer);var $icon=$toggle.find('i');var txtColor=null;var $paymentMethod=$('.subscription-payment-method');var $early_renewal_modal_submit=$('#early_renewal_modal_submit');var $early_renewal_modal_content=$('.wcs-modal > .content-wrapper');function getTxtColor(){if(!txtColor&&$icon&&$icon.length){txtColor=getComputedStyle($icon[0]).color;}
return txtColor;}
function maybeApplyColor(){if($toggle.hasClass('subscription-auto-renew-toggle--on')&&$icon.length){$icon[0].style.backgroundColor=getTxtColor();$icon[0].style.borderColor=getTxtColor();}else if($icon.length){$icon[0].style.backgroundColor=null;$icon[0].style.borderColor=null;}}
function displayToggle(){$toggle.removeClass('subscription-auto-renew-toggle--hidden');}
function onToggle(e){e.preventDefault();$toggle.trigger('blur');if($toggle.hasClass('subscription-auto-renew-toggle--disabled')){return;}
var ajaxHandler=function(action){var data={subscription_id:WCSViewSubscription.subscription_id,action:action,security:WCSViewSubscription.auto_renew_nonce,};blockToggle();$.ajax({url:WCSViewSubscription.ajax_url,data:data,type:'POST',success:function(result){if(result.payment_method){$paymentMethod.fadeOut(function(){$paymentMethod.html(result.payment_method).fadeIn();});}
if(undefined!==result.is_manual){$paymentMethod.data('is_manual',result.is_manual);}},error:function(jqxhr,status,exception){alert('Exception:',exception);},complete:unblockToggle,});};if($toggle.hasClass('subscription-auto-renew-toggle--off')){if(WCSViewSubscription.has_payment_gateway){ajaxHandler('wcs_enable_auto_renew');displayToggleOn();}else if(window.confirm(WCSViewSubscription.add_payment_method_msg)){window.location.href=WCSViewSubscription.add_payment_method_url;}}else{ajaxHandler('wcs_disable_auto_renew');displayToggleOff();}
maybeApplyColor();}
function displayToggleOn(){$icon.removeClass('fa-toggle-off').addClass('fa-toggle-on');$toggle.removeClass('subscription-auto-renew-toggle--off').addClass('subscription-auto-renew-toggle--on');}
function displayToggleOff(){$icon.removeClass('fa-toggle-on').addClass('fa-toggle-off');$toggle.removeClass('subscription-auto-renew-toggle--on').addClass('subscription-auto-renew-toggle--off');}
function blockToggle(){$toggleContainer.block({message:null,overlayCSS:{opacity:0.0},});}
function unblockToggle(){$toggleContainer.unblock();}
function blockEarlyRenewalModal(){$early_renewal_modal_content.block({message:null,overlayCSS:{background:'#fff',opacity:0.6,},});}
function shouldShowEarlyRenewalModal(event){if('.subscription_renewal_early'!==$(event.modal).data('modal-trigger')){return;}
return $paymentMethod.data('is_manual')==='no';}
$toggle.on('click',onToggle);maybeApplyColor();displayToggle();$early_renewal_modal_submit.on('click',blockEarlyRenewalModal);$(document).on('wcs_show_modal',shouldShowEarlyRenewalModal);});