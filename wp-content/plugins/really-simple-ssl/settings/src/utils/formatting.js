export const getRelativeTime=(relativeDate,date=new Date())=>{if(typeof relativeDate==='number'){if(relativeDate.toString().length<13){relativeDate=relativeDate*1000;}
relativeDate=new Date(relativeDate);}
if(!(relativeDate instanceof Date)){return'-';}
let units={year:24*60*60*1000*365,month:24*60*60*1000*365/12,day:24*60*60*1000,hour:60*60*1000,minute:60*1000,second:1000}
let rtf=new Intl.RelativeTimeFormat('en',{numeric:'auto'})
let elapsed=relativeDate-date
for(let u in units){if(Math.abs(elapsed)>units[u]||u==='second'){return rtf.format(Math.round(elapsed/units[u]),u)}}}