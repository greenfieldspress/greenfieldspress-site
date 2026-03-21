export function getRating(value){if(value?.type==='rating'){return{rating:value.rating??0,maxRating:value.maxRating??5,iconStyle:value.iconStyle??'stars',};}
return null;}
export function isRatingValue(value){return value?.type==='rating';}
export function getRatingDisplayValue(value){if(isRatingValue(value)&&value?.displayValue){return value.displayValue;}
return null;}