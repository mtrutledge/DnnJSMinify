!function($){var dnnImagesUploader=function(options){this.options=options,this.container=null,this.init()};dnnImagesUploader.prototype={constructor:dnnImagesUploader,init:function(){this.options=$.extend({},dnn.ImagesUploaderResources,this.options),"undefined"!=typeof FileReader&&(this._uploadedFiles=[],this._attachEventListeners())},_attachEventListeners:function(){$(document.body).on("dragenter",$.proxy(this._onDragEnterHandler,this)).on("dragover",$.proxy(this._onDragOverHandler,this)).on("dragleave",$.proxy(this._onDragLeaveHandler,this)).on("drop",$.proxy(this._onDragDropHandler,this))},_findContainer:function(element){return $(element).closest(".redactor-editor").length>0?[]:$(element).closest(this.options.selector)},_onDragEnterHandler:function(e){return e.stopPropagation(),e.preventDefault(),0==this._findContainer(e.target).length?void(null!=this.container&&(this.container.removeClass("images-dragover"),this.container=null)):(null!=this.container&&this._findContainer(e.target)[0]!=this.container[0]&&this.container.removeClass("images-dragover"),this.container=this._findContainer(e.target),void this.container.addClass("images-dragover"))},_onDragOverHandler:function(e){e.stopPropagation(),e.preventDefault()},_onDragLeaveHandler:function(e){e.stopImmediatePropagation(),e.preventDefault()},_onDragDropHandler:function(e){e.stopPropagation(),e.preventDefault();var files="undefined"!=typeof e.originalEvent.dataTransfer?e.originalEvent.dataTransfer.files:null;if(0==this._findContainer(e.target).length||!files||0==files.length)return void(null!=this.container&&(this.container.removeClass("images-dragover"),this.container=null));if(this._processing)return void $.dnnAlert({title:this.options.imageProgressTitle,text:this.options.imageProgress});this.container=this._findContainer(e.target);var badFiles=this._isValidFiles(files),errMessage="";if(badFiles.hasOwnProperty("extensions")&&(errMessage=badFiles.extensions+" - "+this.options.invalidFileMessage+"\n"),badFiles.hasOwnProperty("bigsize")&&(errMessage=errMessage+badFiles.bigsize+" - "+this.options.fileTooLarge+"\n"),errMessage.length>0){if(!(this.goodFiles.length>0))return $.dnnAlert({title:this.options.fileAlertConfirmTitle.replace("{0}",files.length),text:errMessage}),this.container.removeClass("images-dragover"),void(this.container=null);var handler=this,confirmQ=this.options.confirmQuestion.replace("{0}",this.goodFiles.length),confirmT=this.options.fileAlertConfirmTitle.replace("{0}",files.length-this.goodFiles.length),_opts=new Object;_opts.title=confirmT,_opts.text=errMessage+"<br/><p/><b>"+confirmQ+"</b>",_opts.callbackTrue=function(data){handler._saveFiles(handler.goodFiles)},_opts.callbackFalse=function(data){handler.container.removeClass("images-dragover"),handler.container=null},$.dnnConfirm(_opts)}else this._saveFiles(this.goodFiles)},_isValidFiles:function(files){var badFiles=new Object;this.goodFiles=[];for(var loops=files.length-1,i=loops;i>=0;i--){var thisfile=!0,extension=files[i].name.split(".").pop().toLowerCase();this.options.imageExtensionsAllowed.indexOf(extension)==-1&&(badFiles.hasOwnProperty("extensions")?badFiles.extensions.push(files[i].name):badFiles.extensions=new Array(files[i].name),thisfile=!1),files[i].size>this.options.maxFileSize&&(badFiles.hasOwnProperty("bigsize")?badFiles.bigsize.push(files[i].name):badFiles.bigsize=new Array(files[i].name),thisfile=!1),thisfile&&this.goodFiles.push(files[i])}return badFiles},_saveFiles:function(files){this._fileQueue=[],this._processing=!0,this._uploadedFiles=[];for(var i=0;i<files.length;i++)this._fileQueue.push(files[i]);this._fileQueue.length>0&&this._postFile()},_postFile:function(){var handler=this,file=this._fileQueue[0],data=new FormData;data.append("file",file);var serviceUrl=this._getUploadServiceUrl();$.ajax({url:serviceUrl,data:data,cache:!1,contentType:!1,processData:!1,beforeSend:this._service.setModuleHeaders,type:"POST",success:function(returnData){setTimeout(function(){handler._saveFileComplete(eval(returnData)[0].filelink)},0)},error:function(xhr){setTimeout(function(){$.dnnAlert({title:handler.options.fileUploadFailed,text:file.name}),handler._saveFileComplete("")},0)}})},_saveFileComplete:function(filePath){if(""!=filePath&&this._uploadedFiles.push(filePath),this._fileQueue.splice(0,1),this._fileQueue.length>0)return void this._postFile();if(0==this._fileQueue.length){for(var imageContent="",i=0;i<this._uploadedFiles.length;i++)imageContent+='<p><img src="'+this._uploadedFiles[i]+'" style="max-width: 100%;" /></p>';this.container.removeClass("images-dragover"),this._appendContent(imageContent)}},_appendContent:function(content){if(this._isPane())this._addNewModule(content);else{var moduleId=this._findModuleId();this._updateModule(moduleId,content)}},_addNewModule:function(content){var handler=this,paneName=this._findPaneName(),serviceUrl=this._getHtmlServiceUrl("CreateNewModule"),data={PaneName:paneName,Content:content};$.ajax({url:serviceUrl,data:data,cache:!1,beforeSend:this._service.setModuleHeaders,type:"POST",success:function(returnData){handler._updateModuleComplete(paneName,returnData.ModuleId)}})},_updateModule:function(moduleId,content){var handler=this,paneName=this._findPaneName(),serviceUrl=this._getHtmlServiceUrl("UpdateModuleContent"),data={ModuleId:moduleId,Content:content};$.ajax({url:serviceUrl,data:data,cache:!1,beforeSend:this._service.setModuleHeaders,type:"POST",success:function(returnData){handler._updateModuleComplete(paneName,moduleId)}})},_updateModuleComplete:function(paneName,moduleId){"undefined"==typeof dnn.ContentEditorManager&&location.reload();var handler=this,dialog=dnn.ContentEditorManager.getModuleDialog();dialog.setModuleId(moduleId),dialog.refreshPane(paneName,"",function(){var module=$("div.DnnModule-"+moduleId);module.trigger("editmodule"),handler._processing=!1,handler.container=null,dialog.setModuleId(-1),dnn.ContentEditorManager.triggerChangeOnPageContentEvent()})},_isPane:function(){return this.container.hasClass("EvoqEmptyPane")},_findModuleId:function(){return this.container.children("a").eq(0).attr("name")},_findPaneName:function(){return this._isPane()?this.container.attr("id").replace("dnn_",""):this.container.parent().attr("id").replace("dnn_","")},_getServiceUrl:function(module,service,method){return"undefined"==typeof this._service&&(this._service=$.dnnSF().ServicesFramework()),this._service.getServiceRoot(module)+service+"/"+method},_getUploadServiceUrl:function(){return this._getServiceUrl("DNNCorp/EvoqLibrary","Redactor","PostImages")},_getHtmlServiceUrl:function(method){return this._getServiceUrl("HtmlPro","HtmlTextPro",method)}};var initImagesUploader=function(){new dnnImagesUploader({selector:".EvoqEmptyPane, .DnnModule-DNN_HTML"})};$(document).ready(function(){initImagesUploader()})}(jQuery);