var dnnJscriptVersion="6.0.0";"undefined"==typeof Sys.Browser.Chrome?(Sys.Browser.Chrome={},navigator.userAgent.indexOf(" Chrome/")>-1&&(Sys.Browser.agent=Sys.Browser.Chrome,Sys.Browser.version=parseFloat(navigator.userAgent.match(/Chrome\/(\d+\.\d+)/)[1]),Sys.Browser.name="Chrome",Sys.Browser.hasDebuggerStatement=!0)):Sys.Browser.agent===Sys.Browser.InternetExplorer&&Sys.Browser.version>10&&(HTMLAnchorElement.prototype.attachEvent=function(eventName,handler){"on"==eventName.substr(0,2)&&(eventName=eventName.substr(2)),this.addEventListener(eventName,handler,!1)},HTMLAnchorElement.prototype.detachEvent=function(eventName,handler){"on"==eventName.substr(0,2)&&(eventName=eventName.substr(2)),this.removeEventListener(eventName,handler,!1)}),$&&$.ui&&$.ui.dialog&&$.extend($.ui.dialog.prototype.options,{open:function(){var htmlElement=$(document).find("html");htmlElement.css("overflow","hidden");var cacheScrollTop=htmlElement.find("body").scrollTop();if(cacheScrollTop>0){htmlElement.scrollTop(0);var target=$(this);target.data("cacheScrollTop",cacheScrollTop)}var uiDialog=$(this).closest(".ui-dialog");if(!$("html").hasClass("mobileView")){var maxHeight=$(window).height(),dialogHeight=uiDialog.outerHeight();maxHeight-20>=dialogHeight?uiDialog.css({position:"fixed",left:"50%",top:"50%",marginLeft:"-"+uiDialog.outerWidth()/2+"px",marginTop:"-"+uiDialog.outerHeight()/2+"px",maxHeight:"inherit",overflow:"initial"}):uiDialog.css({position:"fixed",left:"50%",top:"0",marginLeft:"-"+uiDialog.outerWidth()/2+"px",marginTop:"0",maxHeight:maxHeight-20+"px",overflow:"auto"})}},beforeClose:function(){var htmlElement=$(document).find("html");htmlElement.css("overflow","");var cacheScrollTop=$(this).data("cacheScrollTop");cacheScrollTop&&(htmlElement.find("body").scrollTop(cacheScrollTop),$(this).data("cacheScrollTop",null));var uiDialog=$(this).closest(".ui-dialog");uiDialog.css({overflow:"initial"})}});var DNN_HIGHLIGHT_COLOR="#9999FF",COL_DELIMITER=String.fromCharCode(18),ROW_DELIMITER=String.fromCharCode(17),QUOTE_REPLACEMENT=String.fromCharCode(19),KEY_LEFT_ARROW=37,KEY_UP_ARROW=38,KEY_RIGHT_ARROW=39,KEY_DOWN_ARROW=40,KEY_RETURN=13,KEY_ESCAPE=27;Type.registerNamespace("dnn"),dnn.extend=function(dest,src){for(s in src)dest[s]=src[s];return dest},dnn.extend(dnn,{apiversion:new Number("04.02"),pns:"",ns:"dnn",diagnostics:null,vars:null,dependencies:new Array,isLoaded:!1,delay:[],_delayedSet:null,getVars:function(){if(null==this.vars){var ctl=dnn.dom.getById("__dnnVariable");null!=ctl&&(0==ctl.value.indexOf("`")&&(ctl.value=ctl.value.substring(1).replace(/`/g,'"')),ctl.value.indexOf("__scdoff")!=-1&&(COL_DELIMITER="~|~",ROW_DELIMITER="~`~",QUOTE_REPLACEMENT="~!~")),null!=ctl&&ctl.value.length>0?this.vars=Sys.Serialization.JavaScriptSerializer.deserialize(ctl.value):this.vars=[]}return this.vars},getVar:function(key,def){if(null!=this.getVars()[key]){var re=eval("/"+QUOTE_REPLACEMENT+"/g");return this.getVars()[key].replace(re,'"')}return def},setVar:function(key,val){null==this.vars&&this.getVars(),this.vars[key]=val;var ctl=dnn.dom.getById("__dnnVariable");return null==ctl&&(ctl=dnn.dom.createElement("INPUT"),ctl.type="hidden",ctl.id="__dnnVariable",dnn.dom.appendChild(dnn.dom.getByTagName("body")[0],ctl)),dnn.isLoaded?ctl.value=Sys.Serialization.JavaScriptSerializer.serialize(this.vars):dnn._delayedSet={key:key,val:val},!0},callPostBack:function(action){var postBack=dnn.getVar("__dnn_postBack"),data="";if(postBack.length>0){data+=action;for(var i=1;i<arguments.length;i++){var aryParam=arguments[i].split("=");data+=COL_DELIMITER+aryParam[0]+COL_DELIMITER+aryParam[1]}return eval(postBack.replace("[DATA]",data)),!0}return!1},createDelegate:function(oThis,ptr){return Function.createDelegate(oThis,ptr)},doDelay:function(key,time,ptr,ctx){null==this.delay[key]&&(this.delay[key]=new dnn.delayObject(ptr,ctx,key),this.delay[key].num=window.setTimeout(dnn.createDelegate(this.delay[key],this.delay[key].complete),time))},cancelDelay:function(key){null!=this.delay[key]&&(window.clearTimeout(this.delay[key].num),this.delay[key]=null)},decodeHTML:function(html){return html.toString().replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"')},encode:function(arg,doubleEncode){var ret=arg;return ret=encodeURIComponent?encodeURIComponent(ret):escape(ret),0==doubleEncode?ret:ret.replace(/%/g,"%25")},encodeHTML:function(html){return html.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/\"/g,"&quot;")},encodeJSON:function(json){return json.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"'").replace(/\"/g,"&quot;").replace(/\\/g,"\\\\")},evalJSON:function(data){return Sys.Serialization.JavaScriptSerializer.deserialize(data)},escapeForEval:function(s){return s.replace(/\\/g,"\\\\").replace(/\'/g,"\\'").replace(/\r/g,"").replace(/\n/g,"\\n").replace(/\./,"\\.")},getEnumByValue:function(enumType,val){for(var prop in enumType)if("number"==typeof enumType[prop]&&enumType[prop]==val)return prop},_onload:function(){dnn.isLoaded=!0,dnn._delayedSet&&dnn.setVar(dnn._delayedSet.key,dnn._delayedSet.val)},addIframeMask:function(ele){if(dnn.dom.browser.isType("ie")&&(null==ele.previousSibling||"iframe"!=ele.previousSibling.nodeName.toLowerCase())){var mask=document.createElement("iframe");ele.parentNode.insertBefore(mask,ele);var rect=ele.getBoundingClientRect();return mask.style.position="absolute",mask.style.left=ele.offsetLeft+"px",mask.style.top=ele.offsetTop+"px",mask.style.width=rect.right-rect.left+"px",mask.style.height=rect.bottom-rect.top+"px",mask.style.opacity="0",mask.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=0)",mask.style.zIndex="-1",mask}return null},removeIframeMask:function(ele){dnn.dom.browser.isType("ie")&&null!=ele.previousSibling&&"iframe"==ele.previousSibling.nodeName.toLowerCase()&&ele.parentNode.removeChild(ele.previousSibling)}}),dnn.delayObject=function(ptr,ctx,type){this.num=null,this.pfunc=ptr,this.context=ctx,this.type=type},dnn.delayObject.prototype={complete:function(){dnn.delay[this.type]=null,this.pfunc(this.context)}},dnn.delayObject.registerClass("dnn.delayObject"),dnn.ScriptRequest=function(src,text,fCallBack){if(this.ctl=null,this.xmlhttp=null,this.src=null,this.text=null,null!=src&&src.length>0){var file=dnn.dom.scriptFile(src),embedSrc=dnn.getVar(file+".resx","");embedSrc.length>0?this.src=embedSrc:this.src=src}null!=text&&text.length>0&&(this.text=text),this.callBack=fCallBack,this.status="init",this.timeOut=5e3,this._xmlhttpStatusChangeDelegate=dnn.createDelegate(this,this.xmlhttpStatusChange),this._statusChangeDelegate=dnn.createDelegate(this,this.statusChange),this._completeDelegate=dnn.createDelegate(this,this.complete),this._reloadDelegate=dnn.createDelegate(this,this.reload)},dnn.ScriptRequest.prototype={load:function(){if(this.status="loading",this.ctl=document.createElement("script"),this.ctl.type="text/javascript",null!=this.src){if(dnn.dom.browser.isType(dnn.dom.browser.Safari))return this.xmlhttp=new XMLHttpRequest,this.xmlhttp.open("GET",this.src,!0),this.xmlhttp.onreadystatechange=this._xmlhttpStatusChangeDelegate,void this.xmlhttp.send(null);dnn.dom.browser.isType(dnn.dom.browser.InternetExplorer)?this.ctl.onreadystatechange=this._statusChangeDelegate:0==dnn.dom.browser.isType(dnn.dom.browser.Opera)&&(this.ctl.onload=this._completeDelegate),this.ctl.src=this.src,dnn.dom.scriptElements[this.src]=this.ctl}else dnn.dom.browser.isType(dnn.dom.browser.Safari)?this.ctl.innerHTML=dnn.encodeHTML(this.text):this.ctl.text=this.text;var oHeads=dnn.dom.getByTagName("HEAD");oHeads?0!=dnn.dom.browser.isType(dnn.dom.browser.Opera)&&null==this.src||oHeads[0].appendChild(this.ctl):alert("Cannot load dynamic script, no HEAD tag present."),null==this.src||dnn.dom.browser.isType(dnn.dom.browser.Opera)?this.complete():this.timeOut&&dnn.doDelay("loadScript_"+this.src,this.timeOut,this._reloadDelegate,null)},xmlhttpStatusChange:function(){4==this.xmlhttp.readyState&&(this.src=null,this.text=this.xmlhttp.responseText,this.load())},statusChange:function(){"loaded"!=this.ctl.readyState&&"complete"!=this.ctl.readyState||"complete"==this.status||this.complete()},reload:function(){"complete"==dnn.dom.scriptStatus(this.src)?this.complete():this.load()},complete:function(){dnn.cancelDelay("loadScript_"+this.src),this.status="complete","undefined"!=typeof this.callBack&&this.callBack(this),this.dispose()},dispose:function(){this.callBack=null,this.ctl&&(this.ctl.onreadystatechange?this.ctl.onreadystatechange=new function(){}:this.ctl.onload&&(this.ctl.onload=null),this.ctl=null),this.xmlhttp=null,this._xmlhttpStatusChangeDelegate=null,this._statusChangeDelegate=null,this._completeDelegate=null,this._reloadDelegate=null}},dnn.ScriptRequest.registerClass("dnn.ScriptRequest"),Type.registerNamespace("dnn.dom"),dnn.extend(dnn.dom,{pns:"dnn",ns:"dom",browser:null,__leakEvts:[],scripts:[],scriptElements:[],tweens:[],attachEvent:function(ctl,type,fHandler){if(ctl.addEventListener){var name=type.substring(2);ctl.addEventListener(name,function(evt){return dnn.dom.event=new dnn.dom.eventObject(evt,evt.target),fHandler()},!1)}else ctl.attachEvent(type,function(){return dnn.dom.event=new dnn.dom.eventObject(window.event,window.event.srcElement),fHandler()});return!0},cursorPos:function(ctl){if(0==ctl.value.length)return 0;var pos=-1;if(ctl.selectionStart)pos=ctl.selectionStart;else if(ctl.createTextRange){var sel=window.document.selection.createRange(),range=ctl.createTextRange();if(null==range||null==sel||""!=sel.text&&0==range.inRange(sel))return-1;if(""==sel.text)if(range.boundingLeft==sel.boundingLeft)pos=0;else{var tagName=ctl.tagName.toLowerCase();if("input"==tagName)for(var text=range.text,i=1;i<text.length&&(range.findText(text.substring(i)),range.boundingLeft!=sel.boundingLeft);)i++;else if("textarea"==tagName){for(var i=ctl.value.length+1,oCaret=document.selection.createRange().duplicate();oCaret.parentElement()==ctl&&1==oCaret.move("character",1);)--i;i==ctl.value.length+1&&(i=-1)}pos=i}else pos=range.text.indexOf(sel.text)}return pos},cancelCollapseElement:function(ctl){dnn.cancelDelay(ctl.id+"col"),ctl.style.display="none"},collapseElement:function(ctl,num,pCallBack){null==num&&(num=10),ctl.style.overflow="hidden";var ctx=new Object;ctx.num=num,ctx.ctl=ctl,ctx.pfunc=pCallBack,ctl.origHeight=ctl.offsetHeight,dnn.dom.__collapseElement(ctx)},__collapseElement:function(ctx){var num=ctx.num,ctl=ctx.ctl,step=ctl.origHeight/num;ctl.offsetHeight-2*step>0?(ctl.style.height=(ctl.offsetHeight-step).toString()+"px",dnn.doDelay(ctl.id+"col",10,dnn.dom.__collapseElement,ctx)):(ctl.style.display="none",null!=ctx.pfunc&&ctx.pfunc())},cancelExpandElement:function(ctl){dnn.cancelDelay(ctl.id+"exp"),ctl.style.overflow="",ctl.style.height=""},disableTextSelect:function(ctl){"undefined"!=typeof ctl.onselectstart?ctl.onselectstart=function(){return!1}:"undefined"!=typeof ctl.style.MozUserSelect?ctl.style.MozUserSelect="none":ctl.onmousedown=function(){return!1}},expandElement:function(ctl,num,pCallBack){null==num&&(num=10),"none"==ctl.style.display&&null==ctl.origHeight&&(ctl.style.display="",ctl.style.overflow="",ctl.origHeight=ctl.offsetHeight,ctl.style.overflow="hidden",ctl.style.height="1px"),ctl.style.display="";var ctx=new Object;ctx.num=num,ctx.ctl=ctl,ctx.pfunc=pCallBack,dnn.dom.__expandElement(ctx)},__expandElement:function(ctx){var num=ctx.num,ctl=ctx.ctl,step=ctl.origHeight/num;ctl.offsetHeight+step<ctl.origHeight?(ctl.style.height=(ctl.offsetHeight+step).toString()+"px",dnn.doDelay(ctl.id+"exp",10,dnn.dom.__expandElement,ctx)):(ctl.style.overflow="",ctl.style.height="",null!=ctx.pfunc&&ctx.pfunc())},deleteCookie:function(name,path,domain){return!!this.getCookie(name)&&(this.setCookie(name,"",-1,path,domain),!0)},getAttr:function(node,attr,def){if(null==node.getAttribute)return def;var val=node.getAttribute(attr);return null==val||""==val?def:val},getById:function(id,ctl){return $get(id,ctl)},getByTagName:function(tag,ctl){return null==ctl&&(ctl=document),ctl.getElementsByTagName?ctl.getElementsByTagName(tag):ctl.all&&ctl.all.tags?ctl.all.tags(tag):null},getParentByTagName:function(ctl,tag){var parent=ctl.parentNode;for(tag=tag.toLowerCase();null!=parent;){if(parent.tagName&&parent.tagName.toLowerCase()==tag)return parent;parent=parent.parentNode}return null},getCookie:function(name){var cookie=" "+document.cookie,search=" "+name+"=",ret=null,offset=0,end=0;return cookie.length>0&&(offset=cookie.indexOf(search),offset!=-1&&(offset+=search.length,end=cookie.indexOf(";",offset),end==-1&&(end=cookie.length),ret=unescape(cookie.substring(offset,end)))),ret},getNonTextNode:function(node){if(this.isNonTextNode(node))return node;for(;null!=node&&this.isNonTextNode(node);)node=this.getSibling(node,1);return node},addSafeHandler:function(ctl,evt,obj,method){ctl[evt]=this.getObjMethRef(obj,method),dnn.dom.browser.isType(dnn.dom.browser.InternetExplorer)&&(0==this.__leakEvts.length&&dnn.dom.attachEvent(window,"onunload",dnn.dom.destroyHandlers),this.__leakEvts[this.__leakEvts.length]=new dnn.dom.leakEvt(evt,ctl,ctl[evt]))},destroyHandlers:function(){for(var iCount=dnn.dom.__leakEvts.length-1,i=iCount;i>=0;i--){var oEvt=dnn.dom.__leakEvts[i];oEvt.ctl.detachEvent(oEvt.name,oEvt.ptr),oEvt.ctl[oEvt.name]=null,dnn.dom.__leakEvts.length=dnn.dom.__leakEvts.length-1}},getObjMethRef:function(obj,methodName){return function(e){return e=e||window.event,obj[methodName](e,this)}},getSibling:function(ctl,offset){if(null!=ctl&&null!=ctl.parentNode)for(var i=0;i<ctl.parentNode.childNodes.length;i++)if(ctl.parentNode.childNodes[i].id==ctl.id&&null!=ctl.parentNode.childNodes[i+offset])return ctl.parentNode.childNodes[i+offset];return null},isNonTextNode:function(node){return 3!=node.nodeType&&8!=node.nodeType},getScript:function(src){if(this.scriptElements[src])return this.scriptElements[src];for(var oScripts=dnn.dom.getByTagName("SCRIPT"),s=0;s<oScripts.length;s++)if(null!=oScripts[s].src&&oScripts[s].src.indexOf(src)>-1)return this.scriptElements[src]=oScripts[s],oScripts[s]},getScriptSrc:function(src){var resx=dnn.getVar(src+".resx","");return resx.length>0?resx:src},getScriptPath:function(){var oThisScript=dnn.dom.getScript("dnn.js");if(oThisScript){var path=oThisScript.src;return path.indexOf("?")>-1&&(path=path.substr(0,path.indexOf("?"))),path.replace("dnn.js","")}var sSP=dnn.getVar("__sp");return sSP?sSP:""},scriptFile:function(src){var ary=src.split("/");return ary[ary.length-1]},loadScript:function(src,text,callBack){var sFile;if(!(null!=src&&src.length>0&&(sFile=this.scriptFile(src),null!=this.scripts[sFile]))){var oSR=new dnn.ScriptRequest(src,text,callBack);return sFile&&(this.scripts[sFile]=oSR),oSR.load(),oSR}},loadScripts:function(aSrc,aText,callBack){if(null==dnn.scripts){var oRef=function(aSrc,aText,callBack){return function(){dnn.dom.loadScripts(aSrc,aText,callBack)}};return void dnn.dom.loadScript(dnn.dom.getScriptPath()+"dnn.scripts.js",null,oRef(aSrc,aText,callBack))}var oBatch=new dnn.scripts.ScriptBatchRequest(aSrc,aText,callBack);oBatch.load()},scriptStatus:function(src){var sFile=this.scriptFile(src);if(this.scripts[sFile])return this.scripts[sFile].status;var oScript=this.getScript(src);return null!=oScript?"complete":""},setScriptLoaded:function(src){var sFile=this.scriptFile(src);this.scripts[sFile]&&"complete"!=dnn.dom.scripts[sFile].status&&dnn.dom.scripts[sFile].complete()},navigate:function(sURL,sTarget){return null!=sTarget&&sTarget.length>0?"_blank"==sTarget||"_new"==sTarget?window.open(sURL):document.frames[sTarget].location.href=sURL:Sys.Browser.agent===Sys.Browser.InternetExplorer?window.navigate(sURL):window.location.href=sURL,!1},setCookie:function(name,val,days,path,domain,isSecure,milliseconds){var sExpires;if(days&&(sExpires=new Date,sExpires.setTime(sExpires.getTime()+24*days*60*60*1e3)),milliseconds&&(sExpires=new Date,sExpires.setTime(sExpires.getTime()+milliseconds)),document.cookie=name+"="+escape(val)+(sExpires?"; expires="+sExpires.toGMTString():"")+(path?"; path="+path:"")+(domain?"; domain="+domain:"")+(isSecure?"; secure":""),document.cookie.length>0)return!0},getCurrentStyle:function(node,prop){var style=Sys.UI.DomElement._getCurrentStyle(node);return style?style[prop]:""},getFormPostString:function(ctl){var sRet="";if(null!=ctl)if(ctl.tagName&&"form"==ctl.tagName.toLowerCase())for(var i=0;i<ctl.elements.length;i++)sRet+=this.getElementPostString(ctl.elements[i]);else{sRet=this.getElementPostString(ctl);for(var i=0;i<ctl.childNodes.length;i++)sRet+=this.getFormPostString(ctl.childNodes[i])}return sRet},getElementPostString:function(ctl){var tagName;if(ctl.tagName&&(tagName=ctl.tagName.toLowerCase()),"input"==tagName){var type=ctl.type.toLowerCase();if("text"==type||"password"==type||"hidden"==type||("checkbox"==type||"radio"==type)&&ctl.checked)return ctl.name+"="+dnn.encode(ctl.value,!1)+"&"}else if("select"==tagName){for(var i=0;i<ctl.options.length;i++)if(ctl.options[i].selected)return ctl.name+"="+dnn.encode(ctl.options[i].value,!1)+"&"}else if("textarea"==tagName)return ctl.name+"="+dnn.encode(ctl.value,!1)+"&";return""},appendChild:function(oParent,oChild){return oParent.appendChild(oChild)},removeChild:function(oChild){return oChild.parentNode.removeChild(oChild)},createElement:function(tagName){return document.createElement(tagName.toLowerCase())}}),dnn.dom.leakEvt=function(name,ctl,oPtr){this.name=name,this.ctl=ctl,this.ptr=oPtr},dnn.dom.leakEvt.registerClass("dnn.dom.leakEvt"),dnn.dom.eventObject=function(e,srcElement){this.object=e,this.srcElement=srcElement},dnn.dom.eventObject.registerClass("dnn.dom.eventObject"),dnn.dom.browserObject=function(){this.InternetExplorer="ie",this.Netscape="ns",this.Mozilla="mo",this.Opera="op",this.Safari="safari",this.Konqueror="kq",this.MacIE="macie";var type,agt=navigator.userAgent.toLowerCase();type=agt.indexOf("konqueror")!=-1?this.Konqueror:agt.indexOf("msie")!=-1&&agt.indexOf("mac")!=-1?this.MacIE:Sys.Browser.agent===Sys.Browser.InternetExplorer?this.InternetExplorer:Sys.Browser.agent===Sys.Browser.FireFox?this.Mozilla:Sys.Browser.agent===Sys.Browser.Safari?this.Safari:Sys.Browser.agent===Sys.Browser.Opera?this.Opera:this.Mozilla,this.type=type,this.version=Sys.Browser.version;var sAgent=navigator.userAgent.toLowerCase();if(this.type==this.InternetExplorer){var temp=navigator.appVersion.split("MSIE");this.version=parseFloat(temp[1])}if(this.type==this.Netscape){var temp=sAgent.split("netscape");this.version=parseFloat(temp[1].split("/")[1])}},dnn.dom.browserObject.prototype={toString:function(){return this.type+" "+this.version},isType:function(){for(var i=0;i<arguments.length;i++)if(dnn.dom.browser.type==arguments[i])return!0;return!1}},dnn.dom.browserObject.registerClass("dnn.dom.browserObject"),dnn.dom.browser=new dnn.dom.browserObject,"undefined"==typeof $&&eval("function $() {var ary = new Array(); for (var i=0; i<arguments.length; i++) {var arg = arguments[i]; var ctl; if (typeof arg == 'string') ctl = dnn.dom.getById(arg); else ctl = arg; if (ctl != null && typeof(Element) != 'undefined' && typeof(Element.extend) != 'undefined') Element.extend(ctl); if (arguments.length == 1) return ctl; ary[ary.length] = ctl;} return ary;}");try{document.execCommand("BackgroundImageCache",!1,!0)}catch(err){}Sys.Application.add_load(dnn._onload);