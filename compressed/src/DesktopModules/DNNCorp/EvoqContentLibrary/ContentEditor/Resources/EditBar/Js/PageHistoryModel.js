var PageHistoryVersionModel=function($,ko){"use strict";var PageHistoryVersion=function(versionNumber,date,user,state,published,current){var self=this;self.compare=ko.observable(!1),self.versionNumber=versionNumber,self.date=date,self.user=user,self.state=ko.observable(state),self.isPublished=published,self.isCurrentVersion=current},PageHistoryVersionModel=function(){var self=this;this.maxNumberOfVersions=dnn_maxNumberOfVersions,this.visible=ko.observable(!1),this.editBarVisible=ko.observable(!1),this.diff,this.previewModeManager,this.previewModeTypes,this.originalVersion=ko.observable(""),this.targetVersion=ko.observable(""),this.previewVersion=ko.observable(""),this.compareMode=ko.observable(!1),this.previewModeVisible=ko.observable(!1),this.compareViewConfigured=!1,this.versions=ko.observableArray(),this.tabVersionCompareCss='<style type="text/css">ins {background-color: rgba(76, 255, 0, 0.65); text-decoration: none;} ins > img { opacity: .5; filter: Alpha(Opacity=50);}del {background-color: rgba(255, 194, 200, 0.8); text-decoration: none;}del > img { opacity: .5; filter: Alpha(Opacity=50);} </style>',this._iniListeners=function(){$(document).on("dnnActionOnEditBar",function(event,data){"editBarHistoryButton"!=data.id&&self.visible()&&self.visible(!1)})},self._iniListeners(),self.addVersion=function(versionNumber,date,user,state,published,current){self.versions.push(new PageHistoryVersion(versionNumber,date,user,state,published,current))},self.modifyLastVersionState=function(newState){if(newState){var version=self.versions()[0];version&&version.state(newState)}},self.clearVersions=function(){self.versions.removeAll()},this.toggleView=function(){self.visible(!self.visible())},this.hide=function(){self.previewModeManager.hidePreview(),self._hideCompareContainer(),self.visible(!1)},this.hideComparationOrPreview=function(){self.visible(!0),self.previewModeVisible(!1),self._hideCompareContainer(),self.previewModeManager.hidePreview()},this.showVersion=function(version){self.request("EvoqContentLibrary","Versions","DoesVersionExist","post",{Version:version.versionNumber},function(data){if(!data.Exists)return void $.dnnAlert({title:"",text:data.Message});var previousVersion=self.previewModeManager.version;self.previewVersion(version.versionNumber),self.previewModeVisible(!0),self.previewModeManager.version=version.versionNumber,self.visible(!1),self.editBarVisible(!0),self.previewModeManager.showCustomPreview(self.previewModeTypes.Desktop,""),self.previewModeManager.version=previousVersion},function(e){$.dnnAlert({title:"",text:e.responseText})})},this._isRestoreOrDeleteVersionsAllowed=function(version,callback){if(self.request&&"function"==typeof self.request){var versionNumber=self.versions()[0].versionNumber;self.request("EvoqContentLibrary","Versions","IsRestoreOrDeleteVersionsAllowed","post",{Version:versionNumber},function(data){callback(version)},function(e){$.dnnAlert({title:"",text:$.parseJSON(e.responseText).Message})})}},this.restoreVersion=function(version){self._isRestoreOrDeleteVersionsAllowed(version,self._restoreVersion)},this._restoreVersion=function(version){var options={dialogText:String.format(self.resx.ConfirmRestore,version.versionNumber,self.currentVersion),dialogTitle:self.resx.ConfirmTitle,yesText:self.resx.ConfirmYesRestore,noText:self.resx.ConfirmCancel};self.confirmAction(options,function(){self.request&&"function"==typeof self.request&&self.request("EvoqContentLibrary","Versions","RollBackVersion","post",{Version:version.versionNumber},function(data){self.getPageVersions&&"function"==typeof self.getPageVersions&&self.getPageVersions(function(){window.location.reload()})},function(e){$.dnnAlert({title:"",text:e.responseText})})},function(){})},this.deleteVersion=function(version){self._isRestoreOrDeleteVersionsAllowed(version,self._deleteVersion)},this._deleteVersion=function(version){var options={dialogText:String.format(self.resx.ConfirmDelete,version.versionNumber),dialogTitle:self.resx.ConfirmTitle,yesText:self.resx.ConfirmYesDelete,noText:self.resx.ConfirmCancel};self.confirmAction(options,function(){self.request&&"function"==typeof self.request&&self.request("EvoqContentLibrary","Versions","DeleteVersion","post",{Version:version.versionNumber},function(data){self.getPageVersions&&"function"==typeof self.getPageVersions&&self.getPageVersions(function(){version.isCurrentVersion&&window.location.reload()})},function(e){$.dnnAlert({title:"",text:e.responseText})})},function(){})},this.confirmAction=function(options,yesAction,noAction){$("<div class='dnnDialog'></div>").html(options.dialogText).dialog({modal:!0,autoOpen:!0,dialogClass:"dnnFormPopup",width:400,height:215,resizable:!1,title:options.dialogTitle,buttons:[{id:"delete_button",text:options.yesText,class:"dnnPrimaryAction",click:function(){$(this).dialog("close"),yesAction&&"function"==typeof yesAction&&yesAction()}},{id:"cancel_button",text:options.noText,click:function(){$(this).dialog("close"),noAction&&"function"==typeof noAction&&noAction()},class:"dnnSecondaryAction"}]})},this._getSelectedVersions=function(){var results=$.grep(self.versions(),function(e){return e.compare()});return results},this.getNumberOfSelectedVersions=ko.computed(function(){return self._getSelectedVersions().length}),this.isComparing=ko.observable(!1),this._writeOnIframe=function($iframe,content){var iframe=$iframe[0],doc=iframe.document;iframe.contentDocument?doc=iframe.contentDocument:iframe.contentWindow&&(doc=iframe.contentWindow.document),doc.open(),doc.writeln(content),doc.close()},this._activateCompareView=function(container,iframeOriginalContent,iframeDiffContent){var ifr1=iframeOriginalContent,ifr2=iframeDiffContent;ifr1.unbind("scroll"),ifr1.scroll(function(){ifr2.scrollTop(ifr1.scrollTop()),ifr2.scrollLeft(ifr1.scrollLeft())}),ifr2.unbind("scroll"),ifr2.scroll(function(){ifr1.scrollTop(ifr2.scrollTop()),ifr1.scrollLeft(ifr2.scrollLeft())}),container.show(),self.isComparing(!1),self.editBarVisible(!0),self.compareMode(!0),self.visible(!1)},this._configureCompareViews=function(container,iframeOriginal,iframeDiff){var iframesLoaded=0;iframeOriginal.load(function(){if(self.previewModeManager.applyMaskToPreview(iframeOriginal.contents()),0===iframesLoaded)return void iframesLoaded++;var iframeOriginalContent=iframeOriginal.contents(),iframeDiffContent=iframeDiff.contents();self._activateCompareView(container,iframeOriginalContent,iframeDiffContent),iframesLoaded=0}),iframeDiff.load(function(){if(self.previewModeManager.applyMaskToPreview(iframeDiff.contents()),0===iframesLoaded)return void iframesLoaded++;var iframeOriginalContent=iframeOriginal.contents(),iframeDiffContent=iframeDiff.contents();self._activateCompareView(container,iframeOriginalContent,iframeDiffContent),iframesLoaded=0})},this._showCompareContainer=function(originalContent,newVersion,htmlDiff){self._hideCompareContainer();var container=$(".compareVersionsContainer");$("html, body").css({overflow:"hidden"});var paddingBottom="85px";container.css("padding-bottom",paddingBottom);var iframeOriginal=$(".compareOriginalVersion"),iframeDiff=$(".compareDiffVersion"),originalHead=originalContent.split("<head")[1].split(">").slice(1).join(">").split("</head>")[0],newVersionHead=newVersion.split("<head")[1].split(">").slice(1).join(">").split("</head>")[0];newVersionHead+=originalHead+self.tabVersionCompareCss;var toPutInDiff="<!doctype html><html><head>"+newVersionHead+"</head><body>"+htmlDiff+"</body></html>";self.compareViewConfigured||(self._configureCompareViews(container,iframeOriginal,iframeDiff),self.compareViewConfigured=!0),self._writeOnIframe(iframeOriginal,originalContent),self._writeOnIframe(iframeDiff,toPutInDiff)},this._hideCompareContainer=function(){var container=$(".compareVersionsContainer");$("html, body").css({overflow:""}),container.hide(),self.editBarVisible(!1),self.compareMode(!1)},this._getIFrameUrl=function(version){var url;return"object"==typeof window.top&&(url=window.top.location.href,url+=url.indexOf("?")>0?"&dnnprintmode=true":"?dnnprintmode=true",version!=-1&&(url+="&"+dnn_tabVersionQueryStringParameter+"="+version)),url},this._updateVersionsInfo=function(originalVersion,targetVersion){self.originalVersion(originalVersion),self.targetVersion(targetVersion)},this._addNonVersionableModule=function(module,map){var $module=$(module),children=$module.children(),id=$module.find("a").first().attr("name");map[id]=children},this._getAndDeleteNonVersionableModules=function($content,deletedModulesMap){var nonVersionableModules=$content.find(".DnnModule").not(".DnnVersionableControl");return nonVersionableModules.each(function(){self._addNonVersionableModule(this,deletedModulesMap)}),nonVersionableModules.empty(),nonVersionableModules.append("####"),deletedModulesMap},this._markChangeWithMask=function($element,wasDeleted,height){var $div=$("<div>"),children=$element.children(),styles=wasDeleted?"background-color: #ffc2c8; opacity: .5; filter: Alpha(Opacity=50);":"background-color: #c2f3ad; opacity: .5; filter: Alpha(Opacity=50);",$mask=$("<div>").attr("style",styles+"width: 100%;height: "+(height||"100")+"%;position: absolute;left: 0px;top: 0px;");$div=$("<div>").attr("style","position: relative"),$div.append(children),$div.append($mask),$element.empty(),$element.append($div)},this._restoreDeletedUnversionedModules=function($html,moduleSet){$.each(moduleSet,function(key,children){var $module=$html.find(".DnnModule-"+key),wasDeleted=!1,wasModified=!!$module.has("del").length;wasModified?wasDeleted=!0:wasModified=!!$module.has("ins").length,wasModified?($module.children().first().empty(),$module.children().first().append(children),self._markChangeWithMask($module,wasDeleted,113)):($module.empty(),$module.append(children))})},this._markImageChanges=function($html){var deletedImages=$html.find("del img");$.each(deletedImages,function(key,image){self._markChangeWithMask($(image.parentNode),!0)});var addedImages=$html.find("ins img");$.each(addedImages,function(key,image){self._markChangeWithMask($(image.parentNode),!1)})},this.ensureComparision=function(){var results=self._getSelectedVersions(),newVersionNumber=results[0].versionNumber,previousVersionNumber=results[1].versionNumber,doesVersionExist=!0,message="";$.when(self.request("EvoqContentLibrary","Versions","DoesVersionExist","post",{Version:newVersionNumber},function(data){data.Exists||(doesVersionExist=!1,message=data.Message)},function(e){doesVersionExist=!1,message=e.responseText},!0),self.request("EvoqContentLibrary","Versions","DoesVersionExist","post",{Version:previousVersionNumber},function(data){data.Exists||(doesVersionExist=!1,message=data.Message)},function(e){doesVersionExist=!1,message=e.responseText},!0)).then(function(){return doesVersionExist?void self.compareVersions(newVersionNumber,previousVersionNumber):void $.dnnAlert({title:"",text:message})})},this.compareVersions=function(newVersionNumber,previousVersionNumber){var content1,content2,previousVersion,newVersion,setCompareProcessAsFailed,hasCompareProcessFailed=!1,urlVersion=self._getIFrameUrl(newVersionNumber),urlPreviousVersion=self._getIFrameUrl(previousVersionNumber);self._updateVersionsInfo(newVersionNumber,previousVersionNumber),setCompareProcessAsFailed=function(){hasCompareProcessFailed=!0},self.isComparing(!0),$.when($.get(urlPreviousVersion,function(dataPreviousVersion){previousVersion=dataPreviousVersion,content2=dataPreviousVersion.split("<body")[1].split(">").slice(1).join(">").split("</body>")[0]}).fail(setCompareProcessAsFailed),$.get(urlVersion,function(dataVersion){newVersion=dataVersion,content1=dataVersion.split("<body")[1].split(">").slice(1).join(">").split("</body>")[0]}).fail(setCompareProcessAsFailed)).then(function(){if(hasCompareProcessFailed)return self.isComparing(!1),void $.dnnAlert({title:self.resx.TabCompareFailedTitle,text:self.resx.TabCompareFailedText});var $content1=$("<div>").append(content1),$content2=$("<div>").append(content2),deletedModulesMap={};self._getAndDeleteNonVersionableModules($content1,deletedModulesMap),self._getAndDeleteNonVersionableModules($content2,deletedModulesMap),self.request("EvoqContentLibrary","Versions","ComparePage","post",{content1:$content2.html(),content2:$content1.html()},function(data){var $htmlDiff=$("<div>").append(data.DiffContent);self._correctEmptyPaneStats($htmlDiff),self._restoreDeletedUnversionedModules($htmlDiff,deletedModulesMap),self._markImageChanges($htmlDiff),self._showCompareContainer(previousVersion,newVersion,$htmlDiff.html())},function(){self.isComparing(!1),$.dnnAlert({title:self.resx.TabCompareFailedTitle,text:self.resx.TabCompareFailedText})})})},this._correctEmptyPaneStats=function(container){container.find(".DNNEmptyPane").each(function(){var $pane=$(this);$pane.children("div.DnnModule").length&&$pane.removeClass("DNNEmptyPane")})},ko.bindingHandlers.inOutVisible={init:function(element,valueAccessor){var value=valueAccessor();$(element).toggle(ko.unwrap(value))},update:function(element,valueAccessor){var value=valueAccessor(),$element=$(element);ko.unwrap(value)?($element.css("bottom",-$element.outerHeight()),$element.show(),$element.animate({bottom:85},300,"linear")):$element.animate({bottom:-$element.outerHeight()},300,"linear",function(){$element.hide()})}}};return PageHistoryVersionModel}(jQuery||$,ko);