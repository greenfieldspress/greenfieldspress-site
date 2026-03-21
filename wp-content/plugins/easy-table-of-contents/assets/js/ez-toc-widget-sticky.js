if(window.ezTocWidgetStickyInitialized){}else{window.ezTocWidgetStickyInitialized=true;function ready(fn){if(document.readyState!=='loading'){fn();}else{document.addEventListener('DOMContentLoaded',fn);}}
ready(()=>{let lastActive=null;let observer;let stickyInitialized=false;let mobileToggleInitialized=false;let observerDisabled=false;const tocContainer=document.querySelector('.ez-toc-widget-sticky nav');const stickyContainer=document.querySelector('.ez-toc-widget-sticky-container');if(!tocContainer||!stickyContainer){return;}
function findArticleContainer(){const selectors=['article','.post-content','.entry-content','.content-area','.main-content','.post-body','.article-content','.single-post','.single-page','.post','.page','[role="main"]','main'];for(const selector of selectors){const container=document.querySelector(selector);if(container){const rect=container.getBoundingClientRect();if(rect.width>0&&rect.height>0){return container;}else{}}else{console.log('EZ TOC Widget Sticky: No element found for selector:',selector);}}
return document.body;}
function isMobileDevice(){const isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768;return isMobile;}
function initializeMobileToggle(){if(mobileToggleInitialized||!isMobileDevice()){return;}
const mobileToggleBtn=document.createElement('div');mobileToggleBtn.className='ez-toc-mobile-toggle-btn';mobileToggleBtn.innerHTML=`

            <span class="ez-toc-mobile-toggle-icon">☰</span>

            <span class="ez-toc-mobile-toggle-text">TOC</span>

        `;const mobileToggleStyles=document.createElement('style');mobileToggleStyles.textContent=`

            .ez-toc-mobile-toggle-btn {

                position: fixed;

                top: 50%;

                right: 0;

                transform: translateY(-50%);

                background: #007cba;

                color: white;

                padding: 12px 8px;

                border-radius: 8px 0 0 8px;

                cursor: pointer;

                z-index: 10000;

                box-shadow: -2px 2px 8px rgba(0,0,0,0.2);

                transition: all 0.3s ease;

                display: flex;

                flex-direction: column;

                align-items: center;

                gap: 4px;

                font-size: 12px;

                font-weight: bold;

            }

            

            .ez-toc-mobile-toggle-btn:hover {

                background: #005a87;

                transform: translateY(-50%) translateX(-2px);

            }

            

            .ez-toc-mobile-toggle-icon {

                font-size: 16px;

                line-height: 1;

            }

            

            .ez-toc-mobile-toggle-text {

                font-size: 10px;

                line-height: 1;

            }

            

            .ez-toc-widget-sticky-container.mobile-overlay {

                position: fixed !important;

                top: 0 !important;

                left: 0 !important;

                right: 0 !important;

                bottom: 0 !important;

                width: 100% !important;

                max-width: 100% !important;

                height: 100vh !important;

                z-index: 10001 !important;

                background: rgba(0,0,0,0.8) !important;

                display: flex !important;

                align-items: center !important;

                justify-content: center !important;

                padding: 20px !important;

                box-sizing: border-box !important;

                border: none !important;

                border-radius: 0 !important;

                box-shadow: none !important;

            }

            

            .ez-toc-widget-sticky-container.mobile-overlay .ez-toc-widget-sticky-content {

                background: white;

                border-radius: 12px;

                max-width: 90%;

                max-height: 80vh;

                width: 100%;

                overflow: hidden;

                display: flex;

                flex-direction: column;

                box-shadow: 0 10px 30px rgba(0,0,0,0.3);

            }

            

            .ez-toc-widget-sticky-container.mobile-overlay .ez-toc-widget-sticky-title {

                padding: 15px 20px !important;

                border-bottom: 1px solid #eee !important;

                margin: 0 !important;

                background: #f9f9f9 !important;

                border-radius: 12px 12px 0 0 !important;

                font-size: 18px !important;

                font-weight: bold !important;

            }

            

            .ez-toc-widget-sticky-container.mobile-overlay nav {

                padding: 20px !important;

                max-height: 60vh !important;

                overflow-y: auto !important;

                flex: 1;

            }

            

            .ez-toc-widget-sticky-container.mobile-overlay .ez-toc-mobile-close-btn {

                position: absolute;

                top: 15px;

                right: 15px;

                background: none;

                border: none;

                font-size: 24px;

                cursor: pointer;

                color: #666;

                padding: 0;

                width: 30px;

                height: 30px;

                display: flex;

                align-items: center;

                justify-content: center;

                border-radius: 50%;

                transition: background-color 0.2s ease;

            }

            

            .ez-toc-widget-sticky-container.mobile-overlay .ez-toc-mobile-close-btn:hover {

                background-color: #f0f0f0;

            }

            

            .ez-toc-widget-sticky-container.mobile-overlay {

                opacity: 0;

                visibility: hidden;

                transition: opacity 0.3s ease, visibility 0.3s ease;

            }

            

            .ez-toc-widget-sticky-container.mobile-overlay.show {

                opacity: 1;

                visibility: visible;

            }

            

            @media (max-width: 768px) {

                .ez-toc-widget-sticky-container:not(.mobile-overlay) {

                    display: none !important;

                }

            }

        `;document.head.appendChild(mobileToggleStyles);document.body.appendChild(mobileToggleBtn);const originalContent=stickyContainer.innerHTML;stickyContainer.innerHTML=`

            <div class="ez-toc-widget-sticky-content">

                <button class="ez-toc-mobile-close-btn" aria-label="Close Table of Contents">×</button>

                ${originalContent}

            </div>

        `;mobileToggleBtn.addEventListener('click',function(){stickyContainer.classList.add('mobile-overlay','show');document.body.style.overflow='hidden';});const closeBtn=stickyContainer.querySelector('.ez-toc-mobile-close-btn');if(closeBtn){closeBtn.addEventListener('click',function(){closeMobileOverlay();});}
stickyContainer.addEventListener('click',function(e){if(e.target===stickyContainer){closeMobileOverlay();}});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&stickyContainer.classList.contains('mobile-overlay')){closeMobileOverlay();}});stickyContainer.addEventListener('click',function(e){const link=e.target.closest('a');if(link&&isMobileDevice()){stickyContainer.classList.remove('show');stickyContainer.classList.remove('mobile-overlay');document.body.style.overflow='';}});function closeMobileOverlay(){stickyContainer.classList.remove('show');setTimeout(()=>{stickyContainer.classList.remove('mobile-overlay');document.body.style.overflow='';},200);}
mobileToggleInitialized=true;}
function initializeSticky(){if(stickyInitialized||!stickyContainer){return;}
if(isMobileDevice()){return;}
const articleContainer=findArticleContainer();if(typeof jQuery!=='undefined'&&jQuery.fn.stick_in_parent){const $=jQuery;try{const offsetTop=(typeof ezTocWidgetSticky!=='undefined'&&ezTocWidgetSticky.fixed_top_position)?parseInt(ezTocWidgetSticky.fixed_top_position):30;$(stickyContainer).stick_in_parent({inner_scrolling:false,offset_top:offsetTop,sticky_class:'is_stuck',parent:'body'});stickyInitialized=true;let isSticky=false;const originalTop=stickyContainer.offsetTop;const originalPosition=stickyContainer.style.position;function handleArticleBoundaries(){if(!isSticky)return;const scrollTop=window.pageYOffset||document.documentElement.scrollTop;const containerTop=articleContainer.offsetTop;const containerBottom=containerTop+articleContainer.offsetHeight;const stickyHeight=stickyContainer.offsetHeight;const stickyTop=stickyContainer.offsetTop;if(scrollTop+stickyHeight+offsetTop>containerBottom){const maxTop=containerBottom-stickyHeight-offsetTop;stickyContainer.style.top=Math.max(offsetTop,maxTop)+'px';}else{stickyContainer.style.top=offsetTop+'px';}}
$(window).on('resize',function(){if(isMobileDevice()){if($(stickyContainer).hasClass('is_stuck')){$(stickyContainer).trigger('sticky_kit:recalc');}
return;}
if($(stickyContainer).hasClass('is_stuck')){$(stickyContainer).trigger('sticky_kit:recalc');handleArticleBoundaries();}});$(window).on('scroll',function(){if($(stickyContainer).hasClass('is_stuck')){handleArticleBoundaries();}});}catch(error){console.error('EZ TOC Widget Sticky: Error initializing sticky functionality:',error);}}else{console.warn('EZ TOC Widget Sticky: jQuery or sticky-kit not available');}}
if(isMobileDevice()){initializeMobileToggle();}else{initializeSticky();}
let currentDeviceType=isMobileDevice();window.addEventListener('resize',function(){const newDeviceType=isMobileDevice();if(newDeviceType!==currentDeviceType){currentDeviceType=newDeviceType;if(newDeviceType){if(stickyInitialized){if(typeof jQuery!=='undefined'&&jQuery.fn.stick_in_parent){const $=jQuery;$(stickyContainer).trigger('sticky_kit:detach');}
stickyInitialized=false;}
initializeMobileToggle();}else{if(mobileToggleInitialized){const mobileToggleBtn=document.querySelector('.ez-toc-mobile-toggle-btn');if(mobileToggleBtn){mobileToggleBtn.remove();}
mobileToggleInitialized=false;}
initializeSticky();}}});if(!stickyInitialized&&!isMobileDevice()){setTimeout(()=>{initializeSticky();},1000);}
setTimeout(()=>{if(!stickyInitialized&&!isMobileDevice()){initializeSticky();}},3000);window.addEventListener('load',()=>{if(!stickyInitialized&&!isMobileDevice()){initializeSticky();}
if(!mobileToggleInitialized&&isMobileDevice()){initializeMobileToggle();}});function initializeFallbackSticky(){if(stickyInitialized||!stickyContainer){return;}
if(isMobileDevice()){return;}
try{const articleContainer=findArticleContainer();const offsetTop=(typeof ezTocWidgetSticky!=='undefined'&&ezTocWidgetSticky.fixed_top_position)?parseInt(ezTocWidgetSticky.fixed_top_position):30;let isSticky=false;const originalTop=stickyContainer.offsetTop;const originalPosition=stickyContainer.style.position;const containerRect=articleContainer.getBoundingClientRect();function handleScroll(){if(isMobileDevice()){return;}
const scrollTop=window.pageYOffset||document.documentElement.scrollTop;const containerTop=articleContainer.offsetTop;const containerBottom=containerTop+articleContainer.offsetHeight;const stickyHeight=stickyContainer.offsetHeight;if(scrollTop>originalTop-offsetTop&&!isSticky){stickyContainer.style.position='fixed';stickyContainer.style.top=offsetTop+'px';stickyContainer.style.zIndex='9999';stickyContainer.classList.add('is_stuck');isSticky=true;}
else if((scrollTop+stickyHeight+offsetTop>containerBottom)&&isSticky){stickyContainer.style.position='absolute';stickyContainer.style.top=(containerBottom-stickyHeight-offsetTop)+'px';stickyContainer.style.zIndex='9999';stickyContainer.classList.add('is_stuck');}
else if(scrollTop<=originalTop-offsetTop&&isSticky){stickyContainer.style.position=originalPosition;stickyContainer.style.top='';stickyContainer.style.zIndex='';stickyContainer.classList.remove('is_stuck');isSticky=false;}}
window.addEventListener('scroll',handleScroll);window.addEventListener('resize',handleScroll);stickyInitialized=true;}catch(error){console.error('EZ TOC Widget Sticky: Error initializing fallback sticky:',error);}}
setTimeout(()=>{if(!stickyInitialized&&!isMobileDevice()){initializeFallbackSticky();}},5000);function isElementFullyVisible(el,container){const containerRect=container.getBoundingClientRect();const elRect=el.getBoundingClientRect();return elRect.top>=containerRect.top&&elRect.bottom<=containerRect.bottom;}
function highlightHeading(headingId){const allTocLinks=document.querySelectorAll('.ez-toc-widget-sticky nav li a');const all_active_items=document.querySelectorAll('.ez-toc-widget-sticky nav li.active');if(all_active_items.length>0){all_active_items.forEach(item=>{item.classList.remove('active');});}
let targetLink=null;allTocLinks.forEach(link=>{const href=link.getAttribute('href');if(href&&href.startsWith('#')){const id=href.substring(1);if(id===headingId){targetLink=link;}}});if(targetLink){const listItem=targetLink.closest('li');if(listItem){listItem.classList.add('active');lastActive=listItem;if(!isElementFullyVisible(listItem,tocContainer)){listItem.scrollIntoView({behavior:'smooth',block:'center'});}}}}
let lastScrollTop=0;let scrollDirection='down';function updateScrollDirection(){const currentScrollTop=window.pageYOffset||document.documentElement.scrollTop;scrollDirection=currentScrollTop>lastScrollTop?'down':'up';lastScrollTop=currentScrollTop;}
function getHeadingAtTop(){const topOffset=50;const allTocLinks=document.querySelectorAll('.ez-toc-widget-sticky nav li a');const tocLinkMap=new Map();const headingPositions=[];allTocLinks.forEach(link=>{const href=link.getAttribute('href');if(href&&href.startsWith('#')){const id=href.substring(1);const element=document.getElementById(id);if(element){const rect=element.getBoundingClientRect();const top=rect.top+window.pageYOffset;const bottom=rect.bottom+window.pageYOffset;const center=top+(rect.height / 2);tocLinkMap.set(id,link);headingPositions.push({id:id,link:link,top:top,bottom:bottom,center:center,element:element});}}});headingPositions.sort((a,b)=>a.top-b.top);const viewportTop=window.pageYOffset+topOffset;let bestHeading=null;if(scrollDirection==='down'){const activeListItem=document.querySelector('.ez-toc-widget-sticky nav li.active');if(activeListItem){const activeLink=activeListItem.querySelector('a');if(activeLink){const activeHref=activeLink.getAttribute('href');if(activeHref&&activeHref.startsWith('#')){const activeId=activeHref.substring(1);const activeHeading=headingPositions.find(h=>h.id===activeId);if(activeHeading){const advanceThreshold=activeHeading.bottom+100;if(viewportTop>=advanceThreshold){const currentIndex=headingPositions.findIndex(h=>h.id===activeId);if(currentIndex<headingPositions.length-1){bestHeading=headingPositions[currentIndex+1];}else{bestHeading=activeHeading;}}else{bestHeading=activeHeading;}}}}}}
if(!bestHeading){for(let i=0;i<headingPositions.length;i++){const heading=headingPositions[i];if(heading.top>=viewportTop){bestHeading=heading;break;}}
if(!bestHeading&&headingPositions.length>0){bestHeading=headingPositions[headingPositions.length-1];}
if(scrollDirection==='up'&&bestHeading){const currentIndex=headingPositions.findIndex(h=>h.id===bestHeading.id);if(currentIndex>0){const currentHeading=headingPositions[currentIndex];const previousHeading=headingPositions[currentIndex-1];if(currentHeading.top>viewportTop){bestHeading=previousHeading;}}}}
return bestHeading;}
function createObserver(){observer=new IntersectionObserver(entries=>{if(observerDisabled){return;}
updateScrollDirection();const topHeading=getHeadingAtTop();if(!topHeading){return;}
const allTocLinks=document.querySelectorAll('.ez-toc-widget-sticky nav li a');const tocLinkMap=new Map();allTocLinks.forEach(link=>{const href=link.getAttribute('href');if(href&&href.startsWith('#')){const id=href.substring(1);tocLinkMap.set(id,link);}});let bestHeadingId=topHeading.id;let bestHeadingLink=tocLinkMap.get(topHeading.id);if(bestHeadingLink){const bestListItem=bestHeadingLink.closest('li');if(bestListItem){const childLinks=bestListItem.querySelectorAll('ul li a');const visibleChildIds=[];childLinks.forEach(childLink=>{const childHref=childLink.getAttribute('href');if(childHref&&childHref.startsWith('#')){const childId=childHref.substring(1);const childElement=document.getElementById(childId);if(childElement){const rect=childElement.getBoundingClientRect();const isVisible=rect.top<window.innerHeight&&rect.bottom>0;if(isVisible){visibleChildIds.push(childId);}}}});if(visibleChildIds.length>0){let topChildId=null;const viewportTop=window.pageYOffset+50;for(let i=0;i<visibleChildIds.length;i++){const childId=visibleChildIds[i];const childElement=document.getElementById(childId);if(childElement){const rect=childElement.getBoundingClientRect();const childTop=rect.top+window.pageYOffset;if(childTop>=viewportTop){topChildId=childId;break;}}}
if(topChildId&&topHeading.top<viewportTop){bestHeadingId=topChildId;bestHeadingLink=tocLinkMap.get(topChildId);}}}}
const all_active_items=document.querySelectorAll('.ez-toc-widget-sticky nav li.active');if(bestHeadingLink){if(all_active_items.length>0){all_active_items.forEach(item=>{item.classList.remove('active');});}
const listItem=bestHeadingLink.closest('li');if(listItem){listItem.classList.add('active');lastActive=listItem;if(!isElementFullyVisible(listItem,tocContainer)){listItem.scrollIntoView({behavior:'smooth',block:'center'});}}}},{threshold:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0],rootMargin:'0px 0px -80% 0px'});}
createObserver();const headingSelectors=['.ez-toc-section','[id] h1, [id] h2, [id] h3, [id] h4, [id] h5, [id] h6','h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]','.ez-toc-heading','[id]'];headingSelectors.push('[id] H1, [id] H2, [id] H3, [id] H4, [id] H5, [id] H6','H1[id], H2[id], H3[id], H4[id], H5[id], H6[id]');let sectionsFound=false;for(const selector of headingSelectors){const sections=document.querySelectorAll(selector);if(sections.length>0){sections.forEach(section=>{const id=section.getAttribute('id');if(id){observer.observe(section);}});sectionsFound=true;break;}}
if(!sectionsFound){console.warn('EZ TOC Widget Sticky: No heading sections found to observe');}
tocContainer.addEventListener('click',event=>{const link=event.target.closest('a');if(link){const href=link.getAttribute('href');if(href&&href.startsWith('#')){const headingId=href.substring(1);highlightHeading(headingId);}
if(isMobileDevice()&&stickyContainer.classList.contains('mobile-overlay')){stickyContainer.classList.remove('show');stickyContainer.classList.remove('mobile-overlay');document.body.style.overflow='';}
observerDisabled=true;observer.disconnect();setTimeout(()=>{observerDisabled=false;createObserver();const headingSelectors=['.ez-toc-section','[id] h1, [id] h2, [id] h3, [id] h4, [id] h5, [id] h6','h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]','.ez-toc-heading','[id]'];headingSelectors.push('[id] H1, [id] H2, [id] H3, [id] H4, [id] H5, [id] H6','H1[id], H2[id], H3[id], H4[id], H5[id], H6[id]');for(const selector of headingSelectors){const sections=document.querySelectorAll(selector);if(sections.length>0){sections.forEach(section=>{const id=section.getAttribute('id');if(id){observer.observe(section);}});break;}}},3000);}});document.addEventListener('click',event=>{const link=event.target.closest('a');if(link&&isMobileDevice()&&stickyContainer.classList.contains('mobile-overlay')){const tocContainer=link.closest('.ez-toc-widget-sticky-container');if(tocContainer){stickyContainer.classList.remove('show');stickyContainer.classList.remove('mobile-overlay');document.body.style.overflow='';}}});stickyContainer.addEventListener('click',event=>{const link=event.target.closest('a');if(link&&isMobileDevice()&&stickyContainer.classList.contains('mobile-overlay')){stickyContainer.classList.remove('show');stickyContainer.classList.remove('mobile-overlay');document.body.style.overflow='';}});});}
document.addEventListener("DOMContentLoaded",function(){const tocContainer=document.querySelector(".ez-toc-widget-sticky-container");let postContent=document.querySelector("article");if(document.querySelector("article")){postContent=document.querySelector("article");}else if(document.querySelector(".post-content")){postContent=document.querySelector(".post-content");}else if(document.querySelector(".entry-content")){postContent=document.querySelector(".entry-content");}else if(document.querySelector(".single-post-content")){postContent=document.querySelector(".single-post-content");}else if(document.querySelector(".content-area")){postContent=document.querySelector(".content-area");}
function checkTOCInsideContent(){if(!tocContainer||!postContent)return;const tocRect=tocContainer.getBoundingClientRect();const contentRect=postContent.getBoundingClientRect();const inside=tocRect.top>=contentRect.top&&tocRect.bottom<=contentRect.bottom;if(inside){tocContainer.style.opacity="1";tocContainer.style.pointerEvents="auto";}else{tocContainer.style.opacity="0";tocContainer.style.pointerEvents="none";}}
checkTOCInsideContent();document.addEventListener("scroll",checkTOCInsideContent);window.addEventListener("resize",checkTOCInsideContent);});