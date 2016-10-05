window.dnn=dnn||{},window.dnn.modules=dnn.modules||{},window.dnn.modules.publisher=dnn.modules.publisher||{},window.dnn.modules.publisher.PublishingManager=function($,ko){"use strict";var viewModel,resx,dialogViewModel,publishingDialog,requestService,editPostManager,viewPostUrlPattern,cardViewUrl,init,getEditPostManager,getPostFromManager,submitDialogViewModelCallback,rejectDialogViewModelCallback,publish,onPublishCallback200,saveDraft,onSaveDraftCallback200,submit,onSubmitCallback200,submitDialogCallback,approve,reject,onRejectCallback200,rejectDialogCallback,discard,onDiscardCallback200,discardDialogCallback,notifyAboutChange,freeLocks,onErrorCallback,onCancelConfirmDialogCallback,getViewModel,createViewModel,redirectToPostDetailView,PublishingState=function(data){var self=this;self.ContentItemId=data.ContentItemId,self.IsCompleteWorkflow=data.IsCompleteWorkflow,self.CurrentState=data.CurrentState,self.NextState=data.NextState,self.PreviousState=data.PreviousState,self.ReadyToBePublished=data.ReadyToBePublished,self.CanStayInDraft=data.CanStayInDraft,self.IsSaveDraftWorkflow=data.IsSaveDraftWorkflow,self.IsDirectPublishWorkflow=data.IsDirectPublishWorkflow,self.HasPendingChanges=ko.observable(data.HasPendingChanges),self.IsReviewer=data.IsReviewer,self.hasPendingChangesToBeSaved=!1,self.IsAnApprovalWorkflow=!self.IsSaveDraftWorkflow&&!self.IsDirectPublishWorkflow,self.IsApprovalAction=!self.ReadyToBePublished&&self.PreviousState,self.changesInVersionedFields=ko.observable(!self.IsCompleteWorkflow),self.changesInNonVersionedFields=ko.observable(data.HasPendingChanges),self.showSubmit=ko.computed(function(){var createCondition=!self.ContentItemId&&self.IsAnApprovalWorkflow,editCondition=self.ContentItemId&&self.changesInVersionedFields()&&self.IsAnApprovalWorkflow&&(!self.NextState||!self.PreviousState);return createCondition||editCondition}),self.showApprove=ko.computed(function(){var editCondition=self.ContentItemId&&self.IsReviewer&&self.changesInVersionedFields()&&self.IsAnApprovalWorkflow&&self.PreviousState&&!self.ReadyToBePublished;return editCondition}),self.showPublish=ko.computed(function(){return self.changesInVersionedFields()&&(self.IsSaveDraftWorkflow||self.ReadyToBePublished&&self.IsReviewer||!self.IsAnApprovalWorkflow&&!self.NextState)||(self.changesInVersionedFields()||self.changesInNonVersionedFields())&&self.IsDirectPublishWorkflow}),self.showReject=ko.computed(function(){var editCondition=self.ContentItemId&&self.IsReviewer&&self.PreviousState&&self.NextState;return editCondition}),self.showDiscard=ko.computed(function(){var createCondition=!self.ContentItemId,editCondition=self.ContentItemId&&(self.changesInVersionedFields()||self.changesInNonVersionedFields()&&self.IsDirectPublishWorkflow);return createCondition||editCondition}),self.showSave=ko.computed(function(){var createCondition=!self.ContentItemId&&!self.IsDirectPublishWorkflow,editCondition=self.ContentItemId&&self.HasPendingChanges()&&!self.IsDirectPublishWorkflow;return createCondition||editCondition}),self.showClose=ko.computed(function(){var editCondition=self.ContentItemId&&!self.IsDirectPublishWorkflow||self.IsDirectPublishWorkflow&&!self.HasPendingChanges();return editCondition}),self.changesOnlyInNonVersionableFields=ko.computed(function(){return self.HasPendingChanges()&&!self.changesInVersionedFields()})},HTML_DIALOG='<div class="PublisherDialog message"><textarea rows="8" data-bind="value: message, valueUpdate: \'afterkeydown\'"></textarea></div>';return init=function(state,rsx,listUrl,detailPostViewUrlPattern){requestService=dnn.modules.publisher.RequestUtils,resx=rsx,createViewModel(state),cardViewUrl=listUrl,viewPostUrlPattern=detailPostViewUrlPattern,window.onbeforeunload=function(){if(self.hasPendingChangesToBeSaved)return resx.hasPendingChangesToBeSaved}},getEditPostManager=function(){return editPostManager||(editPostManager=dnn.modules.publisher.EditPostManager),editPostManager},getPostFromManager=function(){var editPostManager=getEditPostManager();return editPostManager.getPostRequest()},createViewModel=function(state){viewModel={},viewModel.isSaving=ko.observable(!1),viewModel.isConfirmDialogOpen=ko.observable(!1),viewModel.loadReady=ko.observable(!1),viewModel.state=new PublishingState(state),viewModel.ContentItemId=state.ContentItemId,viewModel.submit=submit,viewModel.approve=approve,viewModel.save=saveDraft,viewModel.publish=publish,viewModel.reject=reject,viewModel.discard=discard,viewModel.loadReady(!0)},getViewModel=function(){return viewModel},freeLocks=function(){viewModel.isSaving(!1),viewModel.isConfirmDialogOpen(!1)},onErrorCallback=function(error){freeLocks(),dnn.modules.publisher.RequestUtils.showError(error)},onCancelConfirmDialogCallback=function(){freeLocks()},rejectDialogViewModelCallback=function(){return dialogViewModel={message:ko.observable("").extend({required:!0})},dialogViewModel.enableAcceptForDialog=function(){return 0===dialogViewModel.message().length&&(dialogViewModel.message(" "),dialogViewModel.message("")),dialogViewModel.message.isValid()},dialogViewModel},submitDialogViewModelCallback=function(){return dialogViewModel={message:ko.observable("")}},notifyAboutChange=function(changesState){changesState.changesInNonVersionedFields&&viewModel.state.changesInNonVersionedFields(!0),changesState.changesInVersionedFields&&(viewModel.state.changesInVersionedFields(!0),viewModel.state.changesInNonVersionedFields(!1)),viewModel.state.HasPendingChanges(!0),self.hasPendingChangesToBeSaved=!0},onSubmitCallback200=function(data){self.hasPendingChangesToBeSaved=!1,redirectToPostDetailView(data.ContentItemId)},redirectToPostDetailView=function(contentItemId){window.location.href=viewPostUrlPattern.replace("{cid}",contentItemId)},submitDialogCallback=function submitDialogCallbackHandler(){if(!viewModel.isSaving()){var post=getPostFromManager();if(null!=post){if(window.dnn.utils.PendingSavesManager.hasPendingSaves())return void window.dnn.utils.PendingSavesManager.addListenerWhenNoPendingSaves($.proxy(submitDialogCallbackHandler,this));var data={Post:post,CurrentStateId:viewModel.state.CurrentState.StateID,Message:dialogViewModel?dialogViewModel.message:null};viewModel.isSaving(!0),dnn.modules.publisher.RequestUtils.request("Publisher","PublishingPost","Submit","POST",data,onSubmitCallback200,onErrorCallback)}}},submit=function(){if(!viewModel.isConfirmDialogOpen()){if(!viewModel.ContentItemId||!viewModel.PreviousState)return void submitDialogCallback();viewModel.isConfirmDialogOpen(!0),publishingDialog=new window.dnn.editBar.EditBarDialog({width:419,title:resx.submit.title,innerTitle:resx.submit.innerTitle,cancelBtnLbl:resx.submit.cancelBtnLbl,acceptBtnLbl:resx.submit.acceptBtnLbl,showAcceptBtn:!0,onAcceptCallback:submitDialogCallback,onCancelCallback:onCancelConfirmDialogCallback,onCloseCallback:onCancelConfirmDialogCallback},HTML_DIALOG,submitDialogViewModelCallback,null)}},approve=function(){viewModel.isConfirmDialogOpen()||(viewModel.isConfirmDialogOpen(!0),publishingDialog=new window.dnn.editBar.EditBarDialog({width:419,title:resx.approve.title,innerTitle:resx.approve.innerTitle,cancelBtnLbl:resx.approve.cancelBtnLbl,acceptBtnLbl:resx.approve.acceptBtnLbl,showAcceptBtn:!0,onAcceptCallback:submitDialogCallback,onCancelCallback:onCancelConfirmDialogCallback,onCloseCallback:onCancelConfirmDialogCallback},HTML_DIALOG,submitDialogViewModelCallback,null))},onPublishCallback200=function(data){$.dnnNotif({dialogClass:"noTittle",height:50,styleBlue:!0,text:resx.toasts.publishedSuccessfully,onCloseCallback:function(){self.hasPendingChangesToBeSaved=!1,redirectToPostDetailView(data.ContentItemId)}})},publish=function publishHandler(){if(!viewModel.isSaving()&&!viewModel.isConfirmDialogOpen()){var post=getPostFromManager();if(null!=post){if(window.dnn.utils.PendingSavesManager.hasPendingSaves())return void window.dnn.utils.PendingSavesManager.addListenerWhenNoPendingSaves($.proxy(publishHandler,this));var data={Post:post,CurrentStateId:viewModel.state.CurrentState.StateID};viewModel.isSaving(!0),dnn.modules.publisher.RequestUtils.request("Publisher","PublishingPost","Publish","POST",data,onPublishCallback200,onErrorCallback)}}},onSaveDraftCallback200=function(data){$.dnnNotif({dialogClass:"noTittle",height:50,styleBlue:!0,text:resx.toasts.savedSuccessfully,onCloseCallback:function(){self.hasPendingChangesToBeSaved=!1,redirectToPostDetailView(data.ContentItemId)}})},saveDraft=function saveDraftHandler(){if(!viewModel.isSaving()&&!viewModel.isConfirmDialogOpen()){var post=getPostFromManager();if(null!=post){if(window.dnn.utils.PendingSavesManager.hasPendingSaves())return void window.dnn.utils.PendingSavesManager.addListenerWhenNoPendingSaves($.proxy(saveDraftHandler,this));if(viewModel.state.changesOnlyInNonVersionableFields()){var editPostManager=getEditPostManager();return void editPostManager.savePost(onSaveDraftCallback200,onErrorCallback)}var data={Post:post,CurrentStateId:viewModel.state.CurrentState.StateID};viewModel.isSaving(!0),dnn.modules.publisher.RequestUtils.request("Publisher","PublishingPost","SaveDraft","POST",data,onSaveDraftCallback200,onErrorCallback)}}},onRejectCallback200=function(data){self.hasPendingChangesToBeSaved=!1,redirectToPostDetailView(data.ContentItemId)},rejectDialogCallback=function rejectDialogCallbackHandler(){if(!viewModel.isSaving()){var post=getPostFromManager();if(null!=post){if(window.dnn.utils.PendingSavesManager.hasPendingSaves())return void window.dnn.utils.PendingSavesManager.addListenerWhenNoPendingSaves($.proxy(rejectDialogCallbackHandler,this));var data={Post:post,CurrentStateId:viewModel.state.CurrentState.StateID,Message:dialogViewModel.message};viewModel.isSaving(!0),dnn.modules.publisher.RequestUtils.request("Publisher","PublishingPost","Reject","POST",data,onRejectCallback200,onErrorCallback)}}},reject=function(){viewModel.isConfirmDialogOpen()||(viewModel.isConfirmDialogOpen(!0),publishingDialog=new window.dnn.editBar.EditBarDialog({width:419,title:resx.reject.title,innerTitle:resx.reject.innerTitle,cancelBtnLbl:resx.reject.cancelBtnLbl,acceptBtnLbl:resx.reject.acceptBtnLbl,showAcceptBtn:!0,onAcceptCallback:rejectDialogCallback,onCancelCallback:onCancelConfirmDialogCallback,onCloseCallback:onCancelConfirmDialogCallback},HTML_DIALOG,rejectDialogViewModelCallback,null))},onDiscardCallback200=function(data){$.dnnNotif({dialogClass:"noTittle",height:50,styleBlue:!0,text:resx.toasts.discardedSuccessfully,onCloseCallback:function(){self.hasPendingChangesToBeSaved=!1,redirectToPostDetailView(data.ContentItemId)}})},discardDialogCallback=function discardDialogCallbackHandler(){if(!viewModel.isSaving()){var post=getPostFromManager();if(null!=post){if(window.dnn.utils.PendingSavesManager.hasPendingSaves())return void window.dnn.utils.PendingSavesManager.addListenerWhenNoPendingSaves($.proxy(discardDialogCallbackHandler,this));var data={Post:post,CurrentStateId:viewModel.state.CurrentState.StateID,Message:dialogViewModel.message};viewModel.isSaving(!0),dnn.modules.publisher.RequestUtils.request("Publisher","PublishingPost","Discard","POST",data,onDiscardCallback200,onErrorCallback)}}},discard=function(){if(!viewModel.isConfirmDialogOpen()){if(viewModel.isConfirmDialogOpen(!0),!viewModel.ContentItemId||!viewModel.state.HasPendingChanges()||viewModel.state.changesOnlyInNonVersionableFields()||viewModel.state.IsCompleteWorkflow){var options={title:resx.discard.dialog.dialogTitle,text:resx.discard.dialog.dialogText,yesText:resx.discard.dialog.yesText,noText:resx.discard.dialog.noText,callbackTrue:function(){$.dnnNotif({dialogClass:"noTittle",height:50,styleBlue:!0,text:resx.toasts.discardedSuccessfully,onCloseCallback:function(){self.hasPendingChangesToBeSaved=!1,viewModel.ContentItemId?redirectToPostDetailView(viewModel.ContentItemId):window.location.href=cardViewUrl}})},callbackFalse:onCancelConfirmDialogCallback};return void $.dnnConfirm(options)}publishingDialog=new window.dnn.editBar.EditBarDialog({width:419,title:resx.discard.title,innerTitle:resx.discard.innerTitle,cancelBtnLbl:resx.discard.cancelBtnLbl,acceptBtnLbl:resx.discard.acceptBtnLbl,showAcceptBtn:!0,onAcceptCallback:discardDialogCallback,onCancelCallback:onCancelConfirmDialogCallback,onCloseCallback:onCancelConfirmDialogCallback},HTML_DIALOG,rejectDialogViewModelCallback,null)}},{init:init,getViewModel:getViewModel,notifyAboutChange:notifyAboutChange}}(jQuery||$,ko);