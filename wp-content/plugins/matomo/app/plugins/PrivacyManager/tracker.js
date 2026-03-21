(function(){function init(){if('object'===typeof window&&!window.Matomo){return;}
window.Matomo.on('TrackerSetup',function(tracker){tracker.setCookieConsentGiven=function(){};tracker.rememberCookieConsentGiven=function(){};tracker.disableCookies();});}
if('object'===typeof window.Matomo){init();}else{if('object'!==typeof window.matomoPluginAsyncInit){window.matomoPluginAsyncInit=[];}
window.matomoPluginAsyncInit.push(init);}})();