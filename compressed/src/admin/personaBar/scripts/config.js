"use strict";define(["jquery"],function($){return{init:function(){var inIframe=window!=window.top,v=inIframe?window.parent.document.getElementById("__dnnVariable").value:"";v=v.replace("`","");var m=new RegExp("`","g");v=v.replace(m,'"');var dnnVariable=v?$.parseJSON(v):null,tabId=dnnVariable?dnnVariable.sf_tabId:"",siteRoot=dnnVariable?dnnVariable.sf_siteRoot:"",antiForgeryToken=inIframe?window.parent.document.getElementsByName("__RequestVerificationToken")[0].value:"",currentUserId=inIframe?window.parent.document.getElementsByName("__personaBarUserId")[0].value:"",currentCulture=inIframe?window.parent.document.getElementsByName("__personaBarCulture")[0].value:"en-us",resxTimeStamp=inIframe?window.parent.document.getElementsByName("__personaBarResourceFileModifiedTime")[0].value:"",avatarUrl=currentUserId?siteRoot+"profilepic.ashx?userId="+currentUserId+"&h=64&w=64":"",logOff=inIframe?window.parent.document.getElementsByName("__personaBarLogOff")[0].value:"",socialModule=inIframe?window.parent.document.getElementsByName("__personaBarMainSocialModuleOnPage")[0].value:"",userSettings=inIframe?window.parent.__personaBarUserSettings:null,hasValidLicenseOrTrial=!inIframe||"True"==window.parent.document.getElementsByName("__personaBarHasValidLicenseOrTrial")[0].value,javascriptMainModuleNames=inIframe?window.parent.document.getElementsByName("__javascriptMainModuleNames")[0].value:"",userMode=inIframe?window.parent.document.getElementsByName("__userMode")[0].value:"View",debugMode=window.top.dnn&&"true"==window.top.dnn.getVar("pb_debugMode"),rootFolderId=inIframe?window.parent.document.getElementsByName("__rootFolderId")[0].value:"",defaultFolderMappingId=inIframe?window.parent.document.getElementsByName("__defaultFolderMappingId")[0].value:"",fileUploadClientId=inIframe?window.parent.document.getElementsByName("__fileUploadClientId")[0].value:"",sku=inIframe?window.parent.document.getElementsByName("__sku")[0].value:"",isCommunityManager=!!inIframe&&"true"==window.parent.document.getElementsByName("__isCommunityManager")[0].value;return{tabId:tabId,siteRoot:siteRoot,antiForgeryToken:antiForgeryToken,culture:currentCulture,resxTimeStamp:resxTimeStamp,avatarUrl:avatarUrl,logOff:logOff,socialModule:socialModule,userSettings:userSettings,hasValidLicenseOrTrial:hasValidLicenseOrTrial,javascriptMainModuleNames:javascriptMainModuleNames,userMode:userMode,debugMode:debugMode,rootFolderId:rootFolderId,defaultFolderMappingId:defaultFolderMappingId,fileUploadClientId:fileUploadClientId,sku:sku,isCommunityManager:isCommunityManager}}}});