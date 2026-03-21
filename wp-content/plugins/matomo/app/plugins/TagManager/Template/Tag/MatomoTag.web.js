(function(){var libLoaded=false;var libAvailable=false;var callbacks={callbacks:[],push:function(callback){if(libAvailable){callback();}else{this.callbacks.push(callback);}}};window._paq=window._paq||[];if('object'!==typeof window.matomoPluginAsyncInit){window.matomoPluginAsyncInit=[];}
function executeCallbacks(){var i;for(i=0;i<callbacks.callbacks.length;i++){callbacks.callbacks[i]();}
callbacks.callbacks=[];}
window.matomoPluginAsyncInit.push(function(){libAvailable=true;executeCallbacks();});function checkLoadedAlready(){if(libAvailable||typeof window.Piwik==='object'){libAvailable=true;libLoaded=true;executeCallbacks();return true;}
return false;}
function loadMatomo(){if(checkLoadedAlready()){return;}
var replaceMeWithTracker='';libAvailable=typeof window.Piwik!=='undefined'||typeof window.Matomo!=='undefined';libLoaded=libAvailable;}
function loadTracker(url,jsEndpoint){if(checkLoadedAlready()){return;}
if(!libLoaded){libLoaded=true;var d=document,g=d.createElement('script'),s=d.getElementsByTagName('script')[0];g.async=true;g.src=url+jsEndpoint;s.parentNode.insertBefore(g,s);}}
var configuredTrackers={};return function(parameters,TagManager){var lastUserId;var lastIdSite;var lastMatomoUrl;function getMatomoUrlFromConfig(matomoConfig){var matomoUrl=matomoConfig.matomoUrl;if(matomoUrl&&String(matomoUrl).substr(-1,1)!=='/'){matomoUrl+='/';}
return matomoUrl;}
function setCustomDimensions(tracker,customDimensions,isBuildObject=false){if(!tracker){return;}
if(!customDimensions||!TagManager.utils.isArray(customDimensions)||customDimensions.length===0){return;}
const dimensionsObject={};var dimIndex;for(dimIndex=0;dimIndex<customDimensions.length;dimIndex++){const dimension=customDimensions[dimIndex];if(!dimension||!TagManager.utils.isObject(dimension)||!dimension.index){continue;}
if(!(dimension.value||dimension.value===null)){continue;}
if(isBuildObject){const dimensionIndex='dimension'+dimension.index;dimensionsObject[dimensionIndex]=dimension.value;continue;}
tracker.setCustomDimension(dimension.index,dimension.value);}
return dimensionsObject;}
this.fire=function(){callbacks.push(function(){if(!parameters.matomoConfig||!parameters.matomoConfig.name){return;}
var variableName=parameters.matomoConfig.name;var matomoConfig=parameters.get('matomoConfig',{});var trackingEndpoint=matomoConfig.trackingEndpoint=='custom'?matomoConfig.trackingEndpointCustom:matomoConfig.trackingEndpoint;var tracker;if(variableName in configuredTrackers){tracker=configuredTrackers[variableName];}else{lastIdSite=matomoConfig.idSite;lastMatomoUrl=getMatomoUrlFromConfig(matomoConfig);var trackerUrl=lastMatomoUrl+trackingEndpoint;if(matomoConfig.registerAsDefaultTracker){tracker=Piwik.addTracker(trackerUrl,matomoConfig.idSite);}else{tracker=Piwik.getTracker(trackerUrl,matomoConfig.idSite);}
configuredTrackers[variableName]=tracker;if(matomoConfig.requireCookieConsent){tracker.requireCookieConsent();}
if(matomoConfig.disableBrowserFeatureDetection&&typeof tracker.disableBrowserFeatureDetection==='function'){tracker.disableBrowserFeatureDetection();}
if(matomoConfig.disableCampaignParameters){tracker.disableCampaignParameters();}
if(matomoConfig.disableCookies){tracker.disableCookies();}
if(matomoConfig.enableCrossDomainLinking){tracker.enableCrossDomainLinking();tracker.setCrossDomainLinkingTimeout(matomoConfig.crossDomainLinkingTimeout);}
if(matomoConfig.cookieSameSite){tracker.setCookieSameSite(matomoConfig.cookieSameSite);}
if(matomoConfig.customCookieTimeOutEnable){tracker.setVisitorCookieTimeout(matomoConfig.customCookieTimeOut*86400);tracker.setReferralCookieTimeout(matomoConfig.referralCookieTimeOut*86400);tracker.setSessionCookieTimeout(matomoConfig.sessionCookieTimeOut*60);}
if(matomoConfig.setSecureCookie){tracker.setSecureCookie(true);}
if(matomoConfig.cookiePath){tracker.setCookiePath(matomoConfig.cookiePath);}
if(matomoConfig.cookieNamePrefix){tracker.setCookieNamePrefix(matomoConfig.cookieNamePrefix);}
if(matomoConfig.cookieDomain){tracker.setCookieDomain(matomoConfig.cookieDomain);}
if(matomoConfig.domains&&TagManager.utils.isArray(matomoConfig.domains)&&matomoConfig.domains.length){var domains=[];var k,domainType;for(k=0;k<matomoConfig.domains.length;k++){var domainType=typeof matomoConfig.domains[k];if(domainType==='string'){domains.push(matomoConfig.domains[k]);}else if(domainType==='object'&&matomoConfig.domains[k].domain){domains.push(matomoConfig.domains[k].domain);}}
tracker.setDomains(domains);}
if(matomoConfig.alwaysUseSendBeacon){tracker.alwaysUseSendBeacon();}
if(matomoConfig.disableAlwaysUseSendBeacon){tracker.disableAlwaysUseSendBeacon();}
if(matomoConfig.forceRequestMethod){tracker.setRequestMethod(matomoConfig.requestMethod);if(matomoConfig.requestMethod.toUpperCase()==='POST'){tracker.setRequestContentType(matomoConfig.requestContentType);}}
if(matomoConfig.enableLinkTracking){tracker.enableLinkTracking();}
if(matomoConfig.enableFileTracking){tracker.enableFileTracking();}
if(matomoConfig.requireConsent){tracker.requireConsent();}
if(matomoConfig.enableDoNotTrack){tracker.setDoNotTrack(1);}
if(matomoConfig.disablePerformanceTracking){tracker.disablePerformanceTracking();}
if(typeof matomoConfig.appendToTrackingUrl==='string'&&matomoConfig.appendToTrackingUrl.length>0){tracker.appendToTrackingUrl(matomoConfig.appendToTrackingUrl);}
if(typeof matomoConfig.customRequestProcessing==='function'&&matomoConfig.customRequestProcessing.length>=1){tracker.setCustomRequestProcessing(matomoConfig.customRequestProcessing);}
if(matomoConfig.enableJSErrorTracking){tracker.enableJSErrorTracking();}
if(matomoConfig.enableHeartBeatTimer){tracker.enableHeartBeatTimer(matomoConfig.heartBeatTime);}
if(matomoConfig.trackAllContentImpressions){tracker.trackAllContentImpressions();}
if(matomoConfig.trackVisibleContentImpressions){tracker.trackVisibleContentImpressions();}
if(matomoConfig.trackBots){tracker.appendToTrackingUrl('bots=1');}
if(matomoConfig.hasOwnProperty('enableFormAnalytics')&&!matomoConfig.enableFormAnalytics&&window.Matomo&&window.Matomo.FormAnalytics&&typeof window.Matomo.FormAnalytics.disableFormAnalytics==='function'){window.Matomo.FormAnalytics.disableFormAnalytics();}
if(matomoConfig.hasOwnProperty('enableMediaAnalytics')&&!matomoConfig.enableMediaAnalytics&&window.Matomo&&window.Matomo.MediaAnalytics&&typeof window.Matomo.MediaAnalytics.disableMediaAnalytics==='function'){window.Matomo.MediaAnalytics.disableMediaAnalytics();}}
if((matomoConfig.userId||tracker.getUserId())&&lastUserId!==matomoConfig.userId){tracker.setUserId(matomoConfig.userId);lastUserId=matomoConfig.userId;}
if(matomoConfig.idSite&&lastIdSite!==matomoConfig.idSite){tracker.setSiteId(matomoConfig.idSite);lastIdSite=matomoConfig.idSite;}
var possiblyUpdatedMatomoUrl=getMatomoUrlFromConfig(matomoConfig);if(possiblyUpdatedMatomoUrl&&lastMatomoUrl!==possiblyUpdatedMatomoUrl){tracker.setTrackerUrl(possiblyUpdatedMatomoUrl+trackingEndpoint);lastIdSite=possiblyUpdatedMatomoUrl;}
const tagCustomDimensions=parameters.get('customDimensions');setCustomDimensions(tracker,matomoConfig.customDimensions);const areCustomDimensionsSticky=parameters.get('areCustomDimensionsSticky');const dimensionsObject=setCustomDimensions(tracker,tagCustomDimensions,!areCustomDimensionsSticky);if(tracker){var trackingType=parameters.get('trackingType');if(trackingType==='pageview'){var customTitle=parameters.get('documentTitle');if(customTitle){tracker.setDocumentTitle(customTitle);}
var customUrl=parameters.get('customUrl');if(customUrl){tracker.setCustomUrl(customUrl);}
if(parameters.get('isEcommerceView')){tracker.setEcommerceView(parameters.get('productSKU'),parameters.get('productName'),parameters.get('categoryName'),parameters.get('price'));}
tracker.trackPageView(customTitle,dimensionsObject);}else if(trackingType==='event'){tracker.trackEvent(parameters.get('eventCategory'),parameters.get('eventAction'),parameters.get('eventName'),parameters.get('eventValue'),dimensionsObject);}else if(trackingType==='goal'){tracker.trackGoal(parameters.get('idGoal'),parameters.get('goalCustomRevenue'),dimensionsObject);}
if(matomoConfig.customData&&matomoConfig.customData.length&&matomoConfig.customData[0].name&&matomoConfig.customData[0].value){tracker.setCustomData(matomoConfig.customData[0].name,matomoConfig.customData[0].value);}
if(matomoConfig.setDownloadExtensions){tracker.setDownloadExtensions(matomoConfig.setDownloadExtensions.split(','));}
if(matomoConfig.addDownloadExtensions){tracker.addDownloadExtensions(matomoConfig.addDownloadExtensions.split(','));}
if(matomoConfig.removeDownloadExtensions){tracker.removeDownloadExtensions(matomoConfig.removeDownloadExtensions.split(','));}
if(matomoConfig.setIgnoreClasses){tracker.setIgnoreClasses(matomoConfig.setIgnoreClasses.split(','));}
if(matomoConfig.setReferrerUrl){tracker.setReferrerUrl(matomoConfig.setReferrerUrl);}
if(matomoConfig.setAPIUrl){tracker.setAPIUrl(matomoConfig.setAPIUrl);}
if(matomoConfig.setPageViewId){tracker.setPageViewId(matomoConfig.setPageViewId);}
if(matomoConfig.setExcludedReferrers){tracker.setExcludedReferrers(matomoConfig.setExcludedReferrers.split(','));}
if(matomoConfig.setDownloadClasses){tracker.setDownloadClasses(matomoConfig.setDownloadClasses.split(','));}
if(matomoConfig.setLinkClasses){tracker.setLinkClasses(matomoConfig.setLinkClasses.split(','));}
if(matomoConfig.setCampaignNameKey){tracker.setCampaignNameKey(matomoConfig.setCampaignNameKey);}
if(matomoConfig.setCampaignKeywordKey){tracker.setCampaignKeywordKey(matomoConfig.setCampaignKeywordKey);}
if(matomoConfig.setConsentGiven){tracker.setConsentGiven();}
if(matomoConfig.rememberConsentGiven){if(matomoConfig.rememberConsentGivenForHours){tracker.rememberConsentGiven(matomoConfig.rememberConsentGivenForHours);}else{tracker.rememberConsentGiven();}}
if(matomoConfig.forgetConsentGiven){tracker.forgetConsentGiven();}
if(matomoConfig.discardHashTag){tracker.discardHashTag(true);}
if(matomoConfig.setExcludedQueryParams){tracker.setExcludedQueryParams(matomoConfig.setExcludedQueryParams.split(','));}
if(matomoConfig.setConversionAttributionFirstReferrer){tracker.setConversionAttributionFirstReferrer(true);}
if(matomoConfig.setDoNotTrack){tracker.setDoNotTrack(true);}
if(matomoConfig.setLinkTrackingTimer){tracker.setLinkTrackingTimer(matomoConfig.setLinkTrackingTimer);}
if(matomoConfig.killFrame){tracker.killFrame();}
if(matomoConfig.setCountPreRendered){tracker.setCountPreRendered(true);}
if(matomoConfig.setRequestQueueInterval){tracker.setRequestQueueInterval(matomoConfig.setRequestQueueInterval);}}});var matomoConfig=parameters.get('matomoConfig',{});if(matomoConfig.bundleTracker){loadMatomo();}
if(!matomoConfig.matomoUrl||!matomoConfig.idSite){return;}
var matomoUrl=getMatomoUrlFromConfig(matomoConfig);var jsEndpoint=matomoConfig.jsEndpoint=='custom'?matomoConfig.jsEndpointCustom:matomoConfig.jsEndpoint;loadTracker(matomoUrl,jsEndpoint);};};})();