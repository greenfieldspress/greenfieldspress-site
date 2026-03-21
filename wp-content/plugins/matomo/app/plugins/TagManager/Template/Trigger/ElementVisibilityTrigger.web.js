(function(){return function(parameters,TagManager){var fireTriggerWhen=parameters.get('fireTriggerWhen','oncePage');var minPercentVisible=parameters.get('minPercentVisible',10);var self=this;var triggeredNodes=[];var documentAlias=parameters.document;var windowAlias=parameters.window;var utils=TagManager.utils;var blockTrigger=false;var onlyOncePerElement=fireTriggerWhen==='onceElement';var selectors=getSelectors();var observerIntersection;var isMutationObserverSupported=('MutationObserver'in windowAlias);var isIntersectionObserverSupported=('IntersectionObserver'in windowAlias);var observeDomChanges=parameters.get('observeDomChanges',false);var observerMutation;var dynamicObservedNodesForIntersection=[];var mutationObseverTimeout=false;var allMutationsList=[];function getPercentVisible(node){if(!node||!node.getBoundingClientRect){return 0;}
var nodeRect=node.getBoundingClientRect();var winRect={height:parameters.window.innerHeight,width:parameters.window.innerWidth};var visHeight=0;var visWidth=0;if(nodeRect.left>=0){visWidth=Math.min(nodeRect.width,winRect.width-nodeRect.left);}else if(nodeRect.right>0){visWidth=Math.min(winRect.width,nodeRect.right);}else{return 0;}
if(nodeRect.top>=0){visHeight=Math.min(nodeRect.height,winRect.height-nodeRect.top);}else if(nodeRect.bottom>0){visHeight=Math.min(winRect.height,nodeRect.bottom);}else{return 0;}
var vis=visHeight*visWidth;var ele=nodeRect.height*nodeRect.width;if(!ele){return 0;}
return(vis / ele)*100;}
function isVisible(node){if(!node){return false;}
function _getStyle(el,property){if(windowAlias.getComputedStyle){return documentAlias.defaultView.getComputedStyle(el,null)[property];}
if(el.currentStyle){return el.currentStyle[property];}}
function _elementInDocument(element){element=element.parentNode;while(element){if(element===documentAlias){return true;}
element=element.parentNode;}
return false;}
function _isVisible(el,t,r,b,l,w,h){var p=el.parentNode,VISIBLE_PADDING=1;if(!_elementInDocument(el)){return false;}
if(9===p.nodeType){return true;}
if('0'===_getStyle(el,'opacity')||'none'===_getStyle(el,'display')||'hidden'===_getStyle(el,'visibility')){return false;}
if(!utils.isDefined(t)||!utils.isDefined(r)||!utils.isDefined(b)||!utils.isDefined(l)||!utils.isDefined(w)||!utils.isDefined(h)){t=el.offsetTop;l=el.offsetLeft;b=t+el.offsetHeight;r=l+el.offsetWidth;w=el.offsetWidth;h=el.offsetHeight;}
if(node===el&&(0===h||0===w)&&'hidden'===_getStyle(el,'overflow')){return false;}
if(p){if(('hidden'===_getStyle(p,'overflow')||'scroll'===_getStyle(p,'overflow'))){if(l+VISIBLE_PADDING>p.offsetWidth+p.scrollLeft||l+w-VISIBLE_PADDING<p.scrollLeft||t+VISIBLE_PADDING>p.offsetHeight+p.scrollTop||t+h-VISIBLE_PADDING<p.scrollTop){return false;}}
if(el.offsetParent===p){l+=p.offsetLeft;t+=p.offsetTop;}
return _isVisible(p,t,r,b,l,w,h);}
return true;}
return _isVisible(node);}
function checkVisiblity(triggerEvent){return function(event){if(blockTrigger){return;}
var nodes=[];if(!selectors){return;}
nodes=TagManager.dom.bySelector(selectors);for(var i=0;i<nodes.length;i++){if(onlyOncePerElement){if(isNodeEventTriggered(nodes[i])){continue;}}
if(nodes[i]&&isVisible(nodes[i])&&!isDynamicNodeObservedForIntersection(nodes[i])){var percentVisible=getPercentVisible(nodes[i]);if(!minPercentVisible||minPercentVisible<=percentVisible){commonTrigger(triggerEvent,percentVisible,nodes[i]);commonTriggeredNodeCheck(nodes[i]);}else if(observerIntersection){observerIntersection.observe(nodes[i]);dynamicObservedNodesForIntersection.push(nodes[i]);}}}};}
function getSelectors(){var selectionMethod=parameters.get('selectionMethod');if(selectionMethod==='elementId'){return'#'+parameters.get('elementId');}else if(selectionMethod==='cssSelector'){return parameters.get('cssSelector');}
return;}
function setIntersectionObserver(triggerEvent){return function(){if(isIntersectionObserverSupported){var interSectionObserverOptions={root:null,rootMargin:'0px',threshold:(minPercentVisible / 100)};observerIntersection=new IntersectionObserver(function(entries){interSectionCallback(entries,triggerEvent);},interSectionObserverOptions);if(selectors){TagManager.dom.bySelector(selectors).forEach(function(element){observerIntersection.observe(element);});}}};}
function interSectionCallback(entries,triggerEvent){var dom=TagManager.dom;entries.forEach(function(entry){if(entry.intersectionRatio>0){if(blockTrigger||(onlyOncePerElement&&isNodeEventTriggered(entry.target))){return;}
var percentVisible=Math.max(getPercentVisible(entry.target),minPercentVisible);commonTrigger(triggerEvent,percentVisible,entry.target);commonTriggeredNodeCheck(entry.target);}});}
function isNodeEventTriggered(node){for(var j=0;j<triggeredNodes.length;j++){if(node===triggeredNodes[j]){return true;}}
return false;}
function setMutationObserver(triggerEvent){return function(){if(observeDomChanges&&isMutationObserverSupported){var config={attributes:true,childList:true,subtree:true};observerMutation=new MutationObserver(function(mutationsList){Array.prototype.push.apply(allMutationsList,mutationsList);if(mutationObseverTimeout){return;}
mutationObseverTimeout=true;setTimeout(function(){mutationObserverCallback(allMutationsList,triggerEvent);allMutationsList=[];mutationObseverTimeout=false;},120);});observerMutation.observe(documentAlias.body,config);}};}
function mutationObserverCallback(mutationsList,triggerEvent){var domElements=TagManager.dom.bySelector(selectors);for(var index in mutationsList){var mutation=mutationsList[index];var addedNodes=mutation.addedNodes;if(mutation.type==='attributes'){addedNodes=[mutation.target];}
if(addedNodes&&addedNodes.length){addedNodes.forEach(function(node){domElements.forEach(function(element){if(node.contains(element)){if(blockTrigger||(onlyOncePerElement&&isNodeEventTriggered(element))){return;}
if(!isNodeInViewport(element)&&observerIntersection&&!isDynamicNodeObservedForIntersection(element)){observerIntersection.observe(element);dynamicObservedNodesForIntersection.push(element);return;}
var percentVisible=Math.max(getPercentVisible(element),minPercentVisible);commonTrigger(triggerEvent,percentVisible,element);commonTriggeredNodeCheck(element);}});});}}}
function isNodeInViewport(node){var rect=node.getBoundingClientRect();return(rect.top>=0&&rect.left>=0&&rect.bottom<=(windowAlias.innerHeight||documentAlias.documentElement.clientHeight)&&rect.right<=(windowAlias.innerWidth||documentAlias.documentElement.clientWidth));}
function isDynamicNodeObservedForIntersection(node){for(var i=0;i<dynamicObservedNodesForIntersection.length;i++){if(node===dynamicObservedNodesForIntersection[i]){return true;}}
return false;}
function commonTrigger(triggerEvent,percentVisible,node){var dom=TagManager.dom;triggerEvent({event:'mtm.ElementVisibility','mtm.elementVisibilityElement':node,'mtm.elementVisibilityPercentage':Math.round(percentVisible*100)/ 100,'mtm.elementVisibilityId':dom.getElementAttribute(node,'id'),'mtm.elementVisibilityClasses':dom.getElementClassNames(node),'mtm.elementVisibilityText':TagManager.utils.trim(node.innerText),'mtm.elementVisibilityNodeName':node.nodeName,'mtm.elementVisibilityUrl':node.href||dom.getElementAttribute(node,'href')});}
function commonTriggeredNodeCheck(node){if(fireTriggerWhen==='oncePage'){blockTrigger=true;if(self.scrollIndex){TagManager.window.offScroll(self.scrollIndex);}
if(observerIntersection){observerIntersection.disconnect();}
if(observerMutation){observerMutation.disconnect();}}else if(onlyOncePerElement){triggeredNodes.push(node);if(observerIntersection){observerIntersection.unobserve(node);}}}
this.setUp=function(triggerEvent){var useMutationObserver=isMutationObserverSupported&&observeDomChanges&&isIntersectionObserverSupported;if(useMutationObserver){TagManager.dom.onLoad(setMutationObserver(triggerEvent));}else{this.scrollIndex=TagManager.window.onScroll(checkVisiblity(triggerEvent));TagManager.dom.onLoad(checkVisiblity(triggerEvent));}
TagManager.dom.onLoad(setIntersectionObserver(triggerEvent));};};})();