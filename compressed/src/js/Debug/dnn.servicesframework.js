!function($){$.dnnSF=function(moduleId){var base=this;return base.getServiceRoot=function(moduleName){var serviceRoot=dnn.getVar("sf_siteRoot","/");return serviceRoot+="DesktopModules/"+moduleName+"/API/"},base.getTabId=function(){return dnn.getVar("sf_tabId",-1)},base.getModuleId=function(){return moduleId},base.setModuleHeaders=function(xhr){var tabId=base.getTabId();tabId>-1&&(xhr.setRequestHeader("ModuleId",base.getModuleId()),xhr.setRequestHeader("TabId",tabId));var afValue=base.getAntiForgeryValue();afValue&&xhr.setRequestHeader("RequestVerificationToken",afValue)},base.getAntiForgeryKey=function(){return"__RequestVerificationToken"},base.getAntiForgeryValue=function(){return $('[name="__RequestVerificationToken"]').val()},base},$.ServicesFramework=function(moduleId){return new $.dnnSF(moduleId)}}(jQuery);