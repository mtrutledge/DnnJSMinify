window.dnn=dnn||{},window.dnn.modules=dnn.modules||{},window.dnn.modules.publisher=dnn.modules.publisher||{},window.dnn.modules.publisher.RequestUtils=function($){"use strict";var serviceFramework,moduleId,init,getServiceUrl,request,setHeaders,showError,getQueryParameters;return showError=function(xhr){var r=JSON.parse(xhr.responseText),message="";if(422===xhr.status)for(var i=0;i<r.length;i++)message+=r[i].Error+"<br />";else message=r.Message;$.dnnAlert({title:"An error has occurred",text:message})},init=function(moduleIdentifier){serviceFramework=$.dnnSF.call(this,moduleIdentifier),moduleId=moduleIdentifier},getServiceUrl=function(serviceName,controller){return serviceFramework.getServiceRoot(serviceName)+controller+"/"},request=function(serviceName,controller,method,type,params,callback,errorCallBack,completeCallback,sync){$.ajax({url:getServiceUrl(serviceName,controller)+method,type:type,data:params,async:!sync,beforeSend:serviceFramework.setModuleHeaders,success:function(data){"function"==typeof callback&&callback(data)},error:function(xhr){"function"==typeof errorCallBack?errorCallBack(xhr):showError(xhr)},complete:function(xhr,status){"function"==typeof completeCallback&&completeCallback(xhr,status)}})},setHeaders=function(xhr){serviceFramework.setModuleHeaders(xhr)},getQueryParameters=function(str){if(str=str||document.location.search,0===str.length)return{};var parts=str.replace(/(^\?)/,"").split("&");return $.map(parts,function(n){return n=n.split("="),this[n[0]]=decodeURIComponent(n[1]),this}.bind({}))[0]},{request:request,getServiceUrl:getServiceUrl,setHeaders:setHeaders,init:init,showError:showError,getQueryParameters:getQueryParameters}}(jQuery||$);