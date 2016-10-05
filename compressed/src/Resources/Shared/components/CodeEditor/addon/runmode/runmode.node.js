function splitLines(string){return string.split(/\r?\n|\r/)}function StringStream(string){this.pos=this.start=0,this.string=string,this.lineStart=0}StringStream.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return 0==this.pos},peek:function(){return this.string.charAt(this.pos)||null},next:function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},eat:function(match){var ch=this.string.charAt(this.pos);if("string"==typeof match)var ok=ch==match;else var ok=ch&&(match.test?match.test(ch):match(ch));if(ok)return++this.pos,ch},eatWhile:function(match){for(var start=this.pos;this.eat(match););return this.pos>start},eatSpace:function(){for(var start=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>start},skipToEnd:function(){this.pos=this.string.length},skipTo:function(ch){var found=this.string.indexOf(ch,this.pos);if(found>-1)return this.pos=found,!0},backUp:function(n){this.pos-=n},column:function(){return this.start-this.lineStart},indentation:function(){return 0},match:function(pattern,consume,caseInsensitive){if("string"!=typeof pattern){var match=this.string.slice(this.pos).match(pattern);return match&&match.index>0?null:(match&&consume!==!1&&(this.pos+=match[0].length),match)}var cased=function(str){return caseInsensitive?str.toLowerCase():str},substr=this.string.substr(this.pos,pattern.length);if(cased(substr)==cased(pattern))return consume!==!1&&(this.pos+=pattern.length),!0},current:function(){return this.string.slice(this.start,this.pos)},hideFirstChars:function(n,inner){this.lineStart+=n;try{return inner()}finally{this.lineStart-=n}}},exports.StringStream=StringStream,exports.startState=function(mode,a1,a2){return!mode.startState||mode.startState(a1,a2)};var modes=exports.modes={},mimeModes=exports.mimeModes={};exports.defineMode=function(name,mode){arguments.length>2&&(mode.dependencies=Array.prototype.slice.call(arguments,2)),modes[name]=mode},exports.defineMIME=function(mime,spec){mimeModes[mime]=spec},exports.defineMode("null",function(){return{token:function(stream){stream.skipToEnd()}}}),exports.defineMIME("text/plain","null"),exports.resolveMode=function(spec){return"string"==typeof spec&&mimeModes.hasOwnProperty(spec)?spec=mimeModes[spec]:spec&&"string"==typeof spec.name&&mimeModes.hasOwnProperty(spec.name)&&(spec=mimeModes[spec.name]),"string"==typeof spec?{name:spec}:spec||{name:"null"}},exports.getMode=function(options,spec){spec=exports.resolveMode(spec);var mfactory=modes[spec.name];if(!mfactory)throw new Error("Unknown mode: "+spec);return mfactory(options,spec)},exports.registerHelper=exports.registerGlobalHelper=Math.min,exports.runMode=function(string,modespec,callback,options){for(var mode=exports.getMode({indentUnit:2},modespec),lines=splitLines(string),state=options&&options.state||exports.startState(mode),i=0,e=lines.length;i<e;++i){i&&callback("\n");var stream=new exports.StringStream(lines[i]);for(!stream.string&&mode.blankLine&&mode.blankLine(state);!stream.eol();){var style=mode.token(stream,state);callback(stream.current(),style,i,stream.start,state),stream.start=stream.pos}}},require.cache[require.resolve("../../lib/codemirror")]=require.cache[require.resolve("./runmode.node")];