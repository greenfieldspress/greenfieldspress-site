(function(){const permanentlyDisabledServices=[];const baseUrl='https://public-api.wordpress.com/wpcom/v2/woo/address-autocomplete';const searchUrl=`${ baseUrl }/search`;const selectUrl=`${ baseUrl }/select`;const MAX_SERVICE_ERROR_RETRIES=3;function generateSessionId(){return crypto&&crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).substring(2);}
function debounce(func,wait,options){var lastArgs,lastThis,maxWait,result,timerId,lastCallTime,lastInvokeTime=0,leading=false,maxing=false,trailing=true;if(typeof func!='function'){throw new TypeError('Expected a function');}
if(typeof options==='object'){leading=!!options.leading;maxing='maxWait'in options;maxWait=maxing?Math.max(options.maxWait||0,wait):maxWait;trailing='trailing'in options?!!options.trailing:trailing;}
function invokeFunc(time){var args=lastArgs,thisArg=lastThis,resolve=args._resolve;lastArgs=lastThis=undefined;lastInvokeTime=time;result=func.apply(thisArg,args);if(resolve){resolve(result);}
return result;}
function leadingEdge(time){lastInvokeTime=time;timerId=setTimeout(timerExpired,wait);return leading?invokeFunc(time):new Promise((resolve)=>{lastArgs._resolve=resolve;});}
function remainingWait(time){var timeSinceLastCall=time-lastCallTime,timeSinceLastInvoke=time-lastInvokeTime,timeWaiting=wait-timeSinceLastCall;return maxing?Math.min(timeWaiting,maxWait-timeSinceLastInvoke):timeWaiting;}
function shouldInvoke(time){var timeSinceLastCall=time-lastCallTime,timeSinceLastInvoke=time-lastInvokeTime;return(lastCallTime===undefined||timeSinceLastCall>=wait||timeSinceLastCall<0||(maxing&&timeSinceLastInvoke>=maxWait));}
function timerExpired(){var time=Date.now();if(shouldInvoke(time)){return trailingEdge(time);}
timerId=setTimeout(timerExpired,remainingWait(time));}
function trailingEdge(time){timerId=undefined;if(trailing&&lastArgs){return invokeFunc(time);}
lastArgs=lastThis=undefined;return result;}
function cancel(){if(timerId!==undefined){clearTimeout(timerId);}
if(lastArgs&&lastArgs._resolve){lastArgs._resolve([]);}
lastInvokeTime=0;lastArgs=lastCallTime=lastThis=timerId=undefined;}
function flush(){return timerId===undefined?result:trailingEdge(Date.now());}
function debounced(){var time=Date.now(),isInvoking=shouldInvoke(time);lastArgs=arguments;lastThis=this;lastCallTime=time;if(isInvoking){if(timerId===undefined){return leadingEdge(lastCallTime);}
if(maxing){clearTimeout(timerId);timerId=setTimeout(timerExpired,wait);return invokeFunc(lastCallTime);}}
if(timerId===undefined){timerId=setTimeout(timerExpired,wait);}
return new Promise((resolve)=>{lastArgs._resolve=resolve;});}
debounced.cancel=cancel;debounced.flush=flush;return debounced;}
Object.entries(a8cAddressAutocompleteServiceKeys).forEach(([key,value])=>{let sessionId=generateSessionId();let requestDurations=[];let serviceErrorRetries=0;class LRUCache{constructor(maxSize=100){this.maxSize=maxSize;this.cache=new Map();}
get(key){if(this.cache.has(key)){const value=this.cache.get(key);this.cache.delete(key);this.cache.set(key,value);return value;}
return null;}
set(key,value){if(this.cache.has(key)){this.cache.delete(key);}else if(this.cache.size>=this.maxSize){const firstKey=this.cache.keys().next().value;this.cache.delete(firstKey);}
this.cache.set(key,value);}
clear(){this.cache.clear();}
get size(){return this.cache.size;}}
const searchCache=new LRUCache(100);const getCachedResult=(inputValue,country)=>{const cacheKey=`${ inputValue }:${ country }`;return searchCache.get(cacheKey);};const cacheResult=(inputValue,country,data)=>{const cacheKey=`${ inputValue }:${ country }`;searchCache.set(cacheKey,data);};const handleApiError=(data,response)=>{if(!data.code&&!data.error){return;}
const errorCode=data.code||data.error;switch(errorCode){case'expired_jwt_token':case'malformed_jwt_token':case'invalid_jwt_token':case'invalid_issuer':case'invalid_service':case'missing_jwt_token':permanentlyDisabledServices.push(key);console.error(`Automattic Address Suggestion (${ key }) has been disabled due to invalid JWT token`);return;case'rate_limit_exceeded':permanentlyDisabledServices.push(key);setTimeout(()=>{const index=permanentlyDisabledServices.indexOf(key);if(index!==-1){permanentlyDisabledServices.splice(index,1);}},(Number(response.headers.get('RateLimit-Retry-After'))||60)*1000);console.error(`Automattic Address Suggestion (${ key }) has been disabled due to rate limit exceeded`);return;case'missing_query':return;case'no_suggestions':return;case'missing_address_id':console.error(`Automattic Address Suggestion (${ key }) has been disabled due to missing address ID`);return;case'no_place':console.error(`Automattic Address Suggestion (${ key }) has been disabled due to no place found`);return;case'missing_session_id':sessionId=generateSessionId();return;case'woo_address_suggestion_internal_error':case'woo_address_suggestion_service_error':case'woo_address_suggestion_server_error':serviceErrorRetries++;if(serviceErrorRetries>=MAX_SERVICE_ERROR_RETRIES){permanentlyDisabledServices.push(key);console.error(`Automattic Address Suggestion (${ key }) has been disabled due to internal service error`);}
return;default:return;}};const debouncedSearch=debounce(async(inputValue,country)=>{const params=new URLSearchParams({query:inputValue,country,lang:document.documentElement.lang||navigator.lang,session_id:sessionId,token:value.key,});try{const startTime=performance.now();const response=await fetch(`${ searchUrl }?${ params.toString() }`);const endTime=performance.now();requestDurations.push(endTime-startTime);let data=await response.json();handleApiError(data,response);if(Array.isArray(data)){data=data.map((item)=>({id:item.id,label:item.label,matchedSubstrings:item.matched_substrings,}));cacheResult(inputValue,country,data);return data;}}catch(e){if(e.name==='AbortError'){return[];}
console.error(`Error fetching address suggestions for ${ key }:`,e);return[];}},300,{leading:false,trailing:true});window.wc.addressAutocomplete.registerAddressAutocompleteProvider({id:key,canSearch:()=>{try{if(permanentlyDisabledServices.includes(key)){return false;}
const[,payload]=value.key.split('.');if(!payload){permanentlyDisabledServices.push(key);return false;}
const decodedPayload=JSON.parse(atob(payload));const currentTime=Math.floor(Date.now()/ 1000);if(!decodedPayload.exp||decodedPayload.exp<currentTime){permanentlyDisabledServices.push(key);return false;}
return true;}catch(e){permanentlyDisabledServices.push(key);return false;}},search:async(inputValue,country,type)=>{if(permanentlyDisabledServices.includes(key)){return[];}
inputValue=inputValue.trim();const cachedResult=getCachedResult(inputValue,country);if(cachedResult!==null){return cachedResult;}
return await debouncedSearch(inputValue,country);},async select(addressId){const params=new URLSearchParams({address_id:addressId,session_id:sessionId,lang:document.documentElement.lang,token:value.key,});const response=await fetch(`${ selectUrl }?${ params.toString() }`);let data=await response.json();sessionId=generateSessionId();try{dispatchEvent(new CustomEvent('wc-address-autocomplete-service-request-durations',{detail:{requestDurations,provider:key,},}));}catch(e){console.error(e);}
requestDurations=[];handleApiError(data,response);return data;},});window.addEventListener('wc-address-autocomplete-service-request-durations',(e)=>{if(!value.canTelemetry||e.detail.provider!==key){return;}
new Image().src=createStatsdURL('a8c-ac-service',{name:'request-durations',value:e.detail.requestDurations,type:'timing',});});});})();function createBeacon(section,{name,value,type}){const event=name.replace('-','_');if(type==='counting'){value=value===undefined?1:value;}
value=Array.isArray(value)?value:[value];return value.map((v)=>`a8c.${ section }.${ event }:${ v }|${
    type === 'timing' ? 'ms' : 'c'
   }`);}
function createStatsdURL(sectionName,events){if(!Array.isArray(events)){events=[events];}
const sanitizedSection=sectionName.replace(/[.:-]/g,'_');const json=JSON.stringify({beacons:events.map((event)=>createBeacon(sanitizedSection,event)).flat(),});const encodedJson=encodeURIComponent(json);return`https://pixel.wp.com/boom.gif?json=${ encodedJson }`;}