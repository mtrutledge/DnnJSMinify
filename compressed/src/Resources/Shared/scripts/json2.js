this.JSON||(JSON=function(){function f(n){return n<10?"0"+n:n}function stringify(value,whitelist){var a,i,k,l,v,r=/["\\\x00-\x1f\x7f-\x9f]/g;switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];return c?c:(c=a.charCodeAt(),"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16))})+'"':'"'+value+'"';case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value)return"null";if("function"==typeof value.toJSON)return stringify(value.toJSON());if(a=[],"number"==typeof value.length&&!value.propertyIsEnumerable("length")){for(l=value.length,i=0;i<l;i+=1)a.push(stringify(value[i],whitelist)||"null");return"["+a.join(",")+"]"}if(whitelist)for(l=whitelist.length,i=0;i<l;i+=1)k=whitelist[i],"string"==typeof k&&(v=stringify(value[k],whitelist),v&&a.push(stringify(k)+":"+v));else for(k in value)"string"==typeof k&&(v=stringify(value[k],whitelist),v&&a.push(stringify(k)+":"+v));return"{"+a.join(",")+"}"}}Date.prototype.toJSON=function(){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"};var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return{stringify:stringify,parse:function(text,filter){function walk(k,v){var i,n;if(v&&"object"==typeof v)for(i in v)Object.prototype.hasOwnProperty.apply(v,[i])&&(n=walk(i,v[i]),void 0!==n&&(v[i]=n));return filter(k,v)}var j;if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof filter?walk("",j):j;throw new SyntaxError("parseJSON")}}}());