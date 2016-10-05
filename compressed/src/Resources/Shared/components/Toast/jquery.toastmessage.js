!function($){var settings={inEffect:{opacity:"show"},inEffectDuration:600,stayTime:3e3,text:"",sticky:!1,type:"notice",position:"top-right",closeText:"",close:null},htmlSubstring=function(s,n){for(var m,r=/<([^>\s]*)[^>]*>/g,stack=[],lasti=0,result="";(m=r.exec(s))&&n;){var temp=s.substring(lasti,m.index).substr(0,n);result+=temp,n-=temp.length,lasti=r.lastIndex,n&&(result+=m[0],0===m[1].indexOf("/")?stack.pop():m[1].lastIndexOf("/")!==m[1].length-1&&stack.push(m[1]))}for(result+=s.substr(lasti,n);stack.length;)result+="</"+stack.pop()+">";return result},methods={init:function(options){options&&$.extend(settings,options)},showAllToasts:function(msgOptions){var messages=msgOptions.messages,seeMoreText=msgOptions.seeMoreText,seeMoreLink=msgOptions.seeMoreLink;if(!messages||!messages.length)return null;$(".toast-container").length&&$(".toast-container").remove();var localSettings={};$.extend(localSettings,settings);for(var toastWrapAll,toastItemOuter,toastItemInner,toastItemClose,allToasts=$("<ul></ul>"),length=messages.length,i=0;i<length;i++){var singleMsg=messages[i],singleToast=$("<li></li>").addClass("toast-message"),subject=singleMsg.subject?singleMsg.subject:"",body=singleMsg.body?singleMsg.body:"",regex=/(<([^>]+)>)/gi,stripedBody=body.replace(regex,"");subject=subject.length>40?subject.substring(0,40)+"...":subject,body=stripedBody.length>75?htmlSubstring(body,75)+"...":body,singleToast.append('<a href="'+seeMoreLink+'" >'+subject+"</a>"),singleToast.append("<p>"+body+"</p>"),allToasts.append(singleToast)}var seeMoreContent=$("<li></li>").addClass("toast-lastChild");seeMoreContent.append('<a href="'+seeMoreLink+'" class="seeMoreLink" >'+seeMoreText+"</a>"),allToasts.append(seeMoreContent),toastWrapAll=$("<div></div>").addClass("toast-container").addClass("toast-position-"+localSettings.position).appendTo("body");var originalPos=null,top=20,right=80,cookieId="nebula-toast-position",cookieValue=dnn.dom.getCookie(cookieId);if(cookieValue){var splitCookieValue=cookieValue.split("|");top=parseInt(splitCookieValue[0],10),right=parseInt(splitCookieValue[1],10),toastWrapAll.css({top:top,right:right})}var mouseMove=function(e){if(null!==originalPos){var x=e.pageX,y=e.pageY,offsetX=originalPos.x-x,offsetY=originalPos.y-y;originalPos.x=x,originalPos.y=y,top-=offsetY,right+=offsetX,toastWrapAll.css({top:top,right:right})}};return toastWrapAll.bind("mousedown",function(e){var x=e.pageX,y=e.pageY;originalPos={x:x,y:y},$(document).bind("mousemove",mouseMove)}).bind("mouseup",function(e){originalPos=null,$(document).unbind("mousemove",mouseMove);var cValue=top+"|"+right;dnn.dom.setCookie(cookieId,cValue,7300)}),toastItemOuter=$("<div></div>").addClass("toast-item-wrapper"),toastItemInner=$("<div></div>").hide().addClass("toast-item toast-type-"+localSettings.type).appendTo(toastWrapAll).append(allToasts).animate(localSettings.inEffect,localSettings.inEffectDuration).wrap(toastItemOuter),toastItemClose=$("<div></div>").addClass("toast-item-close").prependTo(toastItemInner).html(localSettings.closeText).click(function(){$().dnnToastMessage("removeToast",toastItemInner,localSettings)}),navigator.userAgent.match(/MSIE 6/i)&&toastWrapAll.css({top:document.documentElement.scrollTop}),toastItemInner},removeToast:function(obj,options){obj.animate({opacity:"0"},600,function(){obj.parent().animate({height:"0px"},300,function(){obj.parent().remove()})}),options&&null!==options.close&&options.close()}};$.fn.dnnToastMessage=function(method){return methods[method]?methods[method].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof method&&method?void 0:methods.init.apply(this,arguments)}}(jQuery);