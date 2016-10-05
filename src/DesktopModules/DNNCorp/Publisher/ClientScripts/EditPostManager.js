﻿
window.dnn=dnn||{};window.dnn.modules=dnn.modules||{};window.dnn.modules.publisher=dnn.modules.publisher||{};window.dnn.modules.publisher.EditPostManager=(function($,ko){"use strict";var addSubscribersWhenPostChanges,onPostChangedCallback,setImageFromResponse,closeImageDialog,notifyBodyChange,getPostRequest;var isShowingError=false;var changeImageDialog;var imageContainer;var configuration;var publishingManager;var changesState={changesInVersionedFields:false,changesInNonVersionedFields:false,implyUrlChange:false};var viewModel={editingImage:ko.observable(false),highlightImage:ko.observable(false),previousImageBackground:ko.observable('none'),post:{title:ko.observable(''),mainImageUrl:ko.observable(null),mainImageFileId:ko.observable()}};viewModel.editMainImage=function(){viewModel.highlightImage(false);viewModel.editingImage(true);viewModel.previousImageBackground('url('+viewModel.post.mainImageUrl()+')');setTimeout(function(){changeImageDialog.dialog({modal:true,autoOpen:true,dialogClass:"dnnFormPopup",title:configuration.resx.changeImageText,resizable:false,width:700,height:'auto',close:function(){if(!viewModel.highlightImage()){viewModel.editingImage(false);}}});},500);};viewModel.animationEnd=function(x,e){console.log(e.originalEvent.animationName);switch(e.originalEvent.animationName){case"fade-animation":viewModel.previousImageBackground('none');break;case"highlight-animation":viewModel.editingImage(false);viewModel.highlightImage(false);break;}};viewModel.hidePanels=function(){configuration.hidePanels();return true;};closeImageDialog=function(){if(changeImageDialog.is(".ui-dialog-content")){changeImageDialog.dialog("close");}};viewModel.deleteMainImage=function(){if(changeImageDialog.is(".ui-dialog-content")){changeImageDialog.dialog('destroy');}
viewModel.editingImage(false);viewModel.highlightImage(false);viewModel.post.mainImageUrl(null);viewModel.post.mainImageFileId(null);};viewModel.updateTitle=function(d,e){viewModel.post.title($(e.target).text());};addSubscribersWhenPostChanges=function(){viewModel.post.title.subscribe(function(newValue){changesState.implyUrlChange=true;changesState.changesInNonVersionedFields=true;onPostChangedCallback();});viewModel.post.mainImageUrl.subscribe(function(newValue){changesState.changesInNonVersionedFields=true;onPostChangedCallback();});viewModel.post.mainImageFileId.subscribe(function(newValue){changesState.changesInNonVersionedFields=true;onPostChangedCallback();});};notifyBodyChange=function(){changesState.changesInVersionedFields=true;onPostChangedCallback();};onPostChangedCallback=function(){publishingManager.notifyAboutChange(changesState);dnn.modules.publisher.EditPostDetailsManager.syncTitleAndBody({title:viewModel.post.title(),body:getBodyHtml()});};function cssanimations(){return imageContainer[0].style.animationName!==undefined;}
setImageFromResponse=function(response){var r=JSON.parse(response);viewModel.post.mainImageUrl(r.path);viewModel.post.mainImageFileId(r.fileId);if(cssanimations()){viewModel.highlightImage(true);}else{viewModel.editingImage(false);}
closeImageDialog();};function getBodyHtml(){return $(configuration.contentSelector).html();}
function setBodyHtml(html){if(html!==''){$(configuration.contentSelector).html(html);}}
function init(config){publishingManager=dnn.modules.publisher.PublishingManager;configuration=config;if(config.post){viewModel.post.title(config.post.title);viewModel.post.mainImageFileId(config.post.mainImageFileId);viewModel.post.mainImageUrl(config.post.mainImageUrl);setBodyHtml(config.post.body);}
addSubscribersWhenPostChanges();var viewModelBinding=$(config.bindingElementSelector);var node=viewModelBinding[0];if(ko.dataFor(node)){ko.cleanNode(node);}
ko.applyBindings(viewModel,node);dnn.modules.publisher.UploadManager.setOnImageUploaded(setImageFromResponse);changeImageDialog=viewModelBinding.find("div.change-image-dialog");changeImageDialog.append($(config.uploadPanelSelector));imageContainer=viewModelBinding.find("div.image");}
function checkNotEmpty(text,message){if(text.trim()===''){if(!isShowingError){isShowingError=true;$.dnnNotif({dialogClass:'noTittle',height:50,styleBlue:true,text:message,type:'warning',onCloseCallback:function(){isShowingError=false;}});}
return false;}
return true;}
getPostRequest=function(){var isPostCreation=!configuration.post;var body=getBodyHtml();if(!checkNotEmpty(viewModel.post.title(),configuration.resx.titleIsRequired)||!checkNotEmpty(body,configuration.resx.bodyIsRequired)){return null;}
var postRequest={mainImageFileId:viewModel.post.mainImageFileId(),title:viewModel.post.title(),body:body,postId:!isPostCreation?configuration.post.postId:null,contentItemId:!isPostCreation?configuration.post.contentItemId:null};if(isPostCreation){var changeAuthorManager=dnn.modules.publisher.ChangeAuthorManager;if(changeAuthorManager){changeAuthorManager.hide();$.extend(postRequest,{authorUserId:changeAuthorManager.getAuthorUserId()});}
var editPostDetailsManager=dnn.modules.publisher.EditPostDetailsManager;if(editPostDetailsManager){editPostDetailsManager.hide();if(!editPostDetailsManager.isModelValid()){editPostDetailsManager.show();return null;}
$.extend(postRequest,editPostDetailsManager.getPostMetadata());}}
return postRequest;};function savePost(callback200,callbackError){var data=getPostRequest();if(data==null){return;}
dnn.modules.publisher.RequestUtils.request("Publisher","EditPost","UpdatePost","POST",data,callback200,callbackError);}
function deletePost(){$.dnnConfirm({text:configuration.resx.deleteConfirmText,yesText:configuration.resx.yesText,noText:configuration.resx.noText,title:configuration.resx.deleteConfirmTitleText,callbackTrue:function(){var data={contentItemId:configuration.contentItemId};dnn.modules.publisher.RequestUtils.request("Publisher","EditPost","DeletePost","POST",data,function(){window.location.href=configuration.listUrl;});}});}
return{init:init,savePost:savePost,deletePost:deletePost,notifyBodyChange:notifyBodyChange,getPostRequest:getPostRequest};})(jQuery||$,ko);