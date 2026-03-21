(function($){'use strict';window.wc=window.wc||{};window.wc.customPlaceOrderButton=window.wc.customPlaceOrderButton||{};(function injectStyles(){var styleId='wc-custom-place-order-button-styles';if(document.getElementById(styleId)){return;}
var style=document.createElement('style');style.id=styleId;style.textContent='form.has-custom-place-order-button #place_order { display: none !important; }';document.head.appendChild(style);})();var customPlaceOrderButtons={};var activeCustomButtonGateway=null;var $customButtonContainer=null;function getForm(){if($('form.checkout').length){return $('form.checkout').first();}
if($('#order_review').length){return $('#order_review').first();}
if($('#add_payment_method').length){return $('#add_payment_method').first();}
return $([]);}
function getGatewaysWithCustomButton(){if(typeof wc_checkout_params!=='undefined'&&wc_checkout_params.gateways_with_custom_place_order_button){return wc_checkout_params.gateways_with_custom_place_order_button;}
if(typeof wc_add_payment_method_params!=='undefined'&&wc_add_payment_method_params.gateways_with_custom_place_order_button){return wc_add_payment_method_params.gateways_with_custom_place_order_button;}
return[];}
function gatewayHasCustomPlaceOrderButton(gatewayId){return getGatewaysWithCustomButton().indexOf(gatewayId)!==-1;}
function getOrCreateCustomButtonContainer(){if($customButtonContainer&&$customButtonContainer.length&&$.contains(document,$customButtonContainer[0])){return $customButtonContainer;}
var $placeOrderButton=getForm().find('#place_order');if(!$placeOrderButton.length){return $([]);}
$customButtonContainer=$('<div class="wc-custom-place-order-button"></div>');$placeOrderButton.after($customButtonContainer);return $customButtonContainer;}
function removeCustomButtonContainer(){if($customButtonContainer&&$customButtonContainer.length){$customButtonContainer.remove();$customButtonContainer=null;}}
function cleanupCurrentCustomButton(){if(activeCustomButtonGateway&&customPlaceOrderButtons[activeCustomButtonGateway]){try{customPlaceOrderButtons[activeCustomButtonGateway].cleanup();}catch(e){console.error('Error in custom place order button cleanup:',e);}}
removeCustomButtonContainer();activeCustomButtonGateway=null;}
function maybeShowCustomPlaceOrderButton(gatewayId,api){var $form=getForm();if(activeCustomButtonGateway&&customPlaceOrderButtons[activeCustomButtonGateway]){try{customPlaceOrderButtons[activeCustomButtonGateway].cleanup();}catch(e){console.error('Error in custom place order button cleanup:',e);}}
var isCustomButtonRegistered=Boolean(customPlaceOrderButtons[gatewayId]);if(isCustomButtonRegistered){$form.addClass('has-custom-place-order-button');activeCustomButtonGateway=gatewayId;var $container=getOrCreateCustomButtonContainer();$container.empty();try{customPlaceOrderButtons[gatewayId].render($container.get(0),api);}catch(e){console.error('Error rendering custom place order button:',e);}}else{if(!gatewayHasCustomPlaceOrderButton(gatewayId)){$form.removeClass('has-custom-place-order-button');}
activeCustomButtonGateway=null;removeCustomButtonContainer();}}
function maybeHideDefaultButtonOnInit(gatewayId){if(gatewayHasCustomPlaceOrderButton(gatewayId)){var $form=getForm();$form.addClass('has-custom-place-order-button');}}
function registerCustomPlaceOrderButton(gatewayId,config){if(customPlaceOrderButtons[gatewayId]){return;}
if(typeof gatewayId!=='string'||!gatewayId){console.error('wc.customPlaceOrderButton.register: gatewayId must be a non-empty string');return;}
if(typeof config!=='object'||config===null){console.error('wc.customPlaceOrderButton.register: config must be an object');return;}
if(typeof config.render!=='function'){console.error('wc.customPlaceOrderButton.register: render must be a function');return;}
if(typeof config.cleanup!=='function'){console.error('wc.customPlaceOrderButton.register: cleanup must be a function');return;}
customPlaceOrderButtons[gatewayId]=config;if(getForm().find('input[name="payment_method"]:checked').val()===gatewayId){$(document.body).trigger('wc_custom_place_order_button_registered',[gatewayId]);}}
window.wc.customPlaceOrderButton.register=registerCustomPlaceOrderButton;window.wc.customPlaceOrderButton.__maybeShow=maybeShowCustomPlaceOrderButton;window.wc.customPlaceOrderButton.__maybeHideDefaultButtonOnInit=maybeHideDefaultButtonOnInit;window.wc.customPlaceOrderButton.__cleanup=cleanupCurrentCustomButton;window.wc.customPlaceOrderButton.__getForm=getForm;})(jQuery);