const sleeper=(ms)=>{return function(x){return new Promise(resolve=>setTimeout(()=>resolve(x),ms));};}
export default sleeper;