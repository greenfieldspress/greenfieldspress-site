var Piwik_Overlay_UrlNormalizer=(function(){var baseHref=false;var currentFolder;var currentDomain;var excludedParamsRegEx=[];function normalizeDomain(url){if(url===null){return'';}
var absolute=false;if(url.substring(0,7)=='http://'){absolute=true;url=url.substring(7,url.length);}else if(url.substring(0,8)=='https://'){absolute=true;url=url.substring(8,url.length);}
if(absolute){url=removeWww(url);if(url.indexOf('/')==-1){url+='/';}}
return[url,absolute];}
function removeWww(domain){if(domain.substring(0,4)=='www.'){return domain.substring(4,domain.length);}
return domain;}
return{initialize:function(){this.setCurrentDomain(document.location.host);this.setCurrentUrl(window.location.href);var head=document.getElementsByTagName('head');if(head.length){var base=head[0].getElementsByTagName('base');if(base.length&&base[0].href){this.setBaseHref(base[0].href);}}},setCurrentDomain:function(pCurrentDomain){currentDomain=removeWww(pCurrentDomain);},setCurrentUrl:function(url){var index=url.lastIndexOf('/');if(index!=url.length-1){currentFolder=url.substring(0,index+1);}else{currentFolder=url;}
currentFolder=normalizeDomain(currentFolder)[0];},setBaseHref:function(pBaseHref){if(!pBaseHref){baseHref=false;}else{baseHref=normalizeDomain(pBaseHref)[0];}},setExcludedParameters:function(pExcludedParams){excludedParamsRegEx=[];for(var i=0;i<pExcludedParams.length;i++){var paramString=pExcludedParams[i];excludedParamsRegEx.push(new RegExp('&'+paramString+'=([^&#]*)','ig'));}},removeUrlPrefix:function(url){return normalizeDomain(url)[0];},normalize:function(url){if(!url){return'';}
if(url.substring(0,1)=='#'){return'';}
var normalized=normalizeDomain(url);url=normalized[0];var absolute=normalized[1];if(!absolute){if(url.substring(0,1)=='/'){url=currentDomain+url;}else if(baseHref){url=baseHref+url;}else{url=currentFolder+url;}}
url=url.replace(/\/\/+/g,'/');var parts=url.split('/');var urlArr=[];for(var i=0;i<parts.length;i++){if(parts[i]=='.'){}
else if(parts[i]=='..'){urlArr.pop();}
else{urlArr.push(parts[i]);}}
url=urlArr.join('/');url=url.replace(/\?/,'?&');for(i=0;i<excludedParamsRegEx.length;i++){var regEx=excludedParamsRegEx[i];url=url.replace(regEx,'');}
url=url.replace(/\?&/,'?');url=url.replace(/\?#/,'#');url=url.replace(/\?$/,'');url=url.replace(/%5B/gi,'[');url=url.replace(/%5D/gi,']');return url;}};})();