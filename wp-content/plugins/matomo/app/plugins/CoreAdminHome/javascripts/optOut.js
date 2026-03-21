function getDomain(url){return url.replace(/^http[s]?:\/\//,'').replace(/\/.*/,'');}
function addEventListener(element,eventType,eventHandler){if(element.addEventListener){element.addEventListener(eventType,eventHandler,false);return true;}
if(element.attachEvent){return element.attachEvent('on'+eventType,eventHandler);}
element['on'+eventType]=eventHandler;}
function getHostName(url){var e=new RegExp('^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)'),matches=e.exec(url);return matches?matches[1]:url;}
function isOptIn(){return document.getElementById('trackVisits').checked;}
function showWarningIfHttp(){var optOutUrl=window.location.href;var isHttp=optOutUrl&&optOutUrl.indexOf('http:')===0;if(isHttp){var errorPara=document.getElementById('textError_https');if(errorPara){errorPara.style.display='block';}}}
function getDataIfMessageIsForThisFrame(e){if(!e||!e.data){return false;}
try{var data=JSON.parse(e.data);}catch(e){return false;}
if(!data||!data.maq_url){return false;}
var originHost=getHostName(data.maq_url);if(originHost!==getHostName(window.location.href)){return false;}
return data;}
function submitForm(e,form){var optedIn=isOptIn();var hasOptOutChangeWorkedThroughPostMessage=null;if(typeof parent==='object'&&typeof parent.postMessage!=='undefined'){addEventListener(window,'message',function(e){var data=getDataIfMessageIsForThisFrame(e);if(!data||typeof data.maq_confirm_opted_in==='undefined'){return;}
var optedIn=isOptIn();hasOptOutChangeWorkedThroughPostMessage=optedIn==data.maq_confirm_opted_in;if(!hasOptOutChangeWorkedThroughPostMessage){showWarningIfHttp();}});var optOutStatus={maq_opted_in:optedIn};parent.postMessage(JSON.stringify(optOutStatus),"*");}
updateText(optedIn);var now=Date.now?Date.now():(+(new Date()));var openedWindow=window.open(form.action+'&time='+now);if(openedWindow){var checkWindowClosedInterval;checkWindowClosedInterval=setInterval(function(){if(openedWindow.closed){clearInterval(checkWindowClosedInterval);checkWindowClosedInterval=null;if(!hasOptOutChangeWorkedThroughPostMessage){showWarningIfHttp();}}},200);}else{var errorPara=document.getElementById('textError_popupBlocker');if(errorPara){errorPara.style.display='block';}}
return false;}
function updateText(optedIn){var optInPara=document.getElementById('textOptIn');var optOutPara=document.getElementById('textOptOut');var optInLabel=document.getElementById('labelOptIn');var optOutLabel=document.getElementById('labelOptOut');var checkbox=document.getElementById('trackVisits');if(optedIn){optInPara.style.display='none';optOutPara.style.display='block';optInLabel.style.display='none';optOutLabel.style.display='inline';checkbox.checked=true;}else{optOutPara.style.display='none';optInPara.style.display='block';optOutLabel.style.display='none';optInLabel.style.display='inline';checkbox.checked=false;}}
function showWarningIfCookiesDisabled(){if(navigator&&!navigator.cookieEnabled){var errorPara=document.getElementById('textError_cookies');if(errorPara){errorPara.style.display='block';}
var checkbox=document.getElementById('trackVisits');var optInPara=document.getElementById('textOptIn');var optOutPara=document.getElementById('textOptOut');var optInLabel=document.getElementById('labelOptIn');var optOutLabel=document.getElementById('labelOptOut');checkbox.style.display='none';optInPara.style.display='none';optOutPara.style.display='none';optInLabel.style.display='none';optOutLabel.style.display='none';}}
var initializationTimer=null;addEventListener(document,'DOMContentLoaded',function(){showWarningIfCookiesDisabled();var trackVisitsCheckbox=document.getElementById('trackVisits');if(trackVisitsCheckbox&&typeof parent==='object'){var initiallyChecked=trackVisitsCheckbox.checked;var numAttempts=0;function checkParentTrackerLoaded(){var message={maq_initial_value:initiallyChecked};parent.postMessage(JSON.stringify(message),'*');numAttempts++;if(numAttempts>1200){clearInterval(initializationTimer);initializationTimer=null;}}
initializationTimer=setInterval(checkParentTrackerLoaded,150);}});addEventListener(window,'message',function(e){var data=getDataIfMessageIsForThisFrame(e);if(!data){return;}
if(typeof data.maq_opted_in!=='undefined'&&typeof data.maq_url!=='undefined'&&typeof data.maq_optout_by_default!=='undefined'){if(initializationTimer){clearInterval(initializationTimer);}
updateText(data.maq_opted_in);}});