window.dnn=window.dnn||{},window.dnn.utils=window.dnn.utils||{},function(){var LocalizationClass;LocalizationClass=function(){"use strict";function Localization(options){if(this.options={},!options.service||"string"!=typeof options.service)throw"No service provided";if(this.options.service=options.service,!options.controller||"string"!=typeof options.controller)throw"No controller provided";if(this.options.controller=options.controller,!options.resxName)throw"No resxName provided";if(this.options.resxName=options.resxName,this.options.culture=options.culture||"",this.options.key=this.options.resxName+this.options.culture,this.options.keyTS=this.options.resxName+"TimeStamp"+this.options.culture,this.options.key=this.options.resxName,this.options.keyTS=this.options.resxName+"TimeStamp"+this.options.culture,""!==this.options.culture&&(this.options.key+="."+this.options.culture,this.options.keyTS+="."+this.options.culture),!options.resourceSettings||"object"!=typeof options.resourceSettings)throw"No resourceSettings provided";if(this.options.resourceSettings=options.resourceSettings,!options.resourceSettings.method||"string"!=typeof options.resourceSettings.method)throw"No method for get resource settings provided";if(this.options.resourceSettings.method=options.resourceSettings.method,this.options.resourceSettings.methodType=options.resourceSettings.methodType||"get",options.resourceSettings.paramNames&&"object"==typeof options.resourceSettings.paramNames||(options.resourceSettings.paramNames={}),options.resourceSettings.paramNames.culture=options.resourceSettings.paramNames.culture||"culture",options.resourceSettings.paramNames.resxTimeStamp=options.resourceSettings.paramNames.resxTimeStamp||"resxTimeStamp",this.options.resourceSettings.paramName=options.resourceSettings.paramNames,this.options.resourceSettings.params=this.options.resourceSettings.params||{},this.options.resourceSettings.callback200=options.resourceSettings.callback200||null,this.options.resourceSettings.callbackError=options.resourceSettings.callbackError||null,!options.resources||"object"!=typeof options.resources)throw"No resources provided";if(this.options.resources=options.resources,!options.resources.method||"string"!=typeof options.resources.method)throw"No method for get resource settings provided";this.options.resources.method=options.resources.method,this.options.resources.methodType=options.resources.methodType||"get",this.options.resources.paramName=options.resources.paramName||"localization",this.options.resources.params=this.options.resources.params||{},this.options.resources.callback200=options.resources.callback200||null,this.options.resources.callbackError=options.resources.callbackError||null,detectStorage.call(this),getResourcesSettings.call(this)}var detectStorage,getStoredData,setStoredData,compareTimeStamp,getServiceUrl,getResourcesSettings,getResourcesSettings200,getResources,getResources200,updateCulture;return Localization.class="Localization",Localization.type="Class",Localization.storageAllowed=!1,detectStorage=function(){var fail,uid;try{uid=new Date,(Localization.storageAllowed=window.localStorage).setItem(uid,uid),fail=Localization.storageAllowed.getItem(uid)!==uid+"",Localization.storageAllowed.removeItem(uid),Localization.storageAllowed=!fail}catch(ex){Localization.storageAllowed=!1}},getStoredData=function(){var stored;if(!Localization.storageAllowed)return!1;try{stored=JSON.parse(window.localStorage.getItem(this.options.key))}catch(err){stored={},window.localStorage.removeItem(this.options.key)}return{storedTS:window.localStorage.getItem(this.options.keyTS),stored:stored}},setStoredData=function(stored,storedTS){return!!Localization.storageAllowed&&(window.localStorage.setItem(this.options.key,JSON.stringify(stored)),void window.localStorage.setItem(this.options.keyTS,storedTS))},compareTimeStamp=function(storedTS){return!!Localization.storageAllowed&&getStoredData.call(this).storedTS+""==storedTS+""},getServiceUrl=function(method){return $.dnnSF().getServiceRoot(this.options.service)+this.options.controller+"/"+method},getResourcesSettings=function(){var self=this;$.ajax({url:getServiceUrl.call(self,this.options.resourceSettings.method),type:this.options.resourceSettings.methodType,data:this.options.resourceSettings.data,beforeSend:$.dnnSF().setModuleHeaders,complete:null,success:function(data){getResourcesSettings200.call(self,data)},error:this.options.resourceSettings.callbackError})},getResourcesSettings200=function(data){if(this.resourceSettings={culture:null,resxTimeStamp:null},!Localization.storageAllowed&&"function"!=typeof this.options.resourceSettings.callback200)return void getResources.call(this);if(!data[this.options.resourceSettings.paramNames.culture])throw"No culture from server";if(!data[this.options.resourceSettings.paramNames.resxTimeStamp])throw"No resxTimeStamp from server";return this.resourceSettings.culture=data[this.options.resourceSettings.paramNames.culture],updateCulture.call(this,this.resourceSettings.culture),this.resourceSettings.resxTimeStamp=data[this.options.resourceSettings.paramNames.resxTimeStamp],Localization.storageAllowed||"function"!=typeof this.options.resourceSettings.callback200?(this.resourceSettings.culture&&this.resourceSettings.resxTimeStamp&&compareTimeStamp.call(this,this.resourceSettings.resxTimeStamp)?"function"==typeof this.options.resources.callback200&&this.options.resources.callback200({localization:getStoredData.call(this).stored}):getResources.call(this),void("function"==typeof this.options.resourceSettings.callback200&&this.options.resourceSettings.callback200(this.resourceSettings))):(this.options.resourceSettings.callback200(this.resourceSettings),void getResources.call(this))},getResources=function(){var self=this;this.options.resources.data=this.options.resources.data||{},this.options.resources.data.culture=this.resourceSettings.culture,$.ajax({url:getServiceUrl.call(self,this.options.resources.method),type:this.options.resources.methodType,data:this.options.resources.data,beforeSend:$.dnnSF().setModuleHeaders,complete:null,success:function(data){getResources200.call(self,data)},error:this.options.resources.callbackError})},getResources200=function(data){var resData;if(resData={localization:null},!data[this.options.resources.paramName])throw"No localization from server";resData.localization=data[this.options.resources.paramName],resData.localization&&this.resourceSettings.resxTimeStamp&&setStoredData.call(this,resData.localization,this.resourceSettings.resxTimeStamp),"function"==typeof this.options.resources.callback200&&this.options.resources.callback200(resData)},updateCulture=function(culture){culture!=this.options.culture&&(this.options.culture=this.resourceSettings.culture),this.options.key=this.options.resxName+"."+this.options.culture,this.options.keyTS=this.options.resxName+"TimeStamp."+this.options.culture},Localization}(),window.dnn.utils.Localization=LocalizationClass}.call(this);