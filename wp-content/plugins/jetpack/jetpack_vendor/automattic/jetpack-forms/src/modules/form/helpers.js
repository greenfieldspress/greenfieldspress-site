import{getRatingDisplayValue}from'../field-rating/helpers.js';export const maybeAddColonToLabel=label=>{const formattedLabel=label?label:null;if(!formattedLabel){return null;}
return formattedLabel.endsWith('?')?formattedLabel:formattedLabel.replace(/[.:]$/,'')+':';};export const maybeTransformValue=value=>{if(value?.type==='image-select'){return value.choices.map(choice=>{let transformedValue=choice.perceived;if(choice.showLabels&&choice.label!=null&&choice.label!==''){transformedValue+=' - '+choice.label;}
return transformedValue;}).join(', ');}
if(value?.type==='url'&&value?.url){return value.url;}
const ratingDisplayValue=getRatingDisplayValue(value);if(ratingDisplayValue){return ratingDisplayValue;}
if(value?.name&&value?.size){return value.name+' ('+value.size+')';}
return value;};export const getImages=value=>{if(value?.type==='image-select'){return value.choices.map(choice=>{const letterCode=choice.perceived??'';const label=choice.showLabels&&choice.label!=null&&choice.label!==''?choice.label:'';return{src:choice.image?.src??'',letterCode,label,};});}
return null;};export const getUrl=value=>{if(value?.type==='url'&&value?.url){let url=value.url;if(!/^https?:\/\//i.test(url)){url='https://'+url;}
return url;}
return null;};