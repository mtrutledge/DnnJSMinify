window.dnn=window.dnn||{},window.dnn.modules=window.dnn.modules||{},window.dnn.modules.workflows=window.dnn.modules.workflows||{},function(){var WorkflowStatesManagerClass;WorkflowStatesManagerClass=function($,ko){"use strict";function WorkflowStatesManager(util,isMobile,newOrEdit,workflow,state,afterBindCallback,onCloseCallback){var inObject;if(_self=this,!util)throw"WorkflowStatesManager: No util provided";if(_util=util,_resx=util.resx.ContentPB,isMobile||(isMobile=!1),_isMobile=isMobile,_isNew="new"===newOrEdit.toLowerCase(),!workflow)throw"WorkflowStatesManager: No workflow provided";if(_workflow=workflow,!state)throw"WorkflowStatesManager: No state provided";_state=state,_afterBindCallback=afterBindCallback,_onCloseCallback=onCloseCallback,configServiceFramework(),inObject=$("body"),setTimeout(function(){_personaBarDialog=new window.dnn.utils.KoBindedDialog({closeOnAccept:!1,inObject:inObject,width:800,title:_isNew?_resx.workflows_edit_states_title_new:_resx.workflows_edit_states_title_edit,innerTitle:_state.StateName?_resx.workflows_edit_states_inner_title.replace("{0}",_state.StateName):_resx.workflows_new_state_inner_title.replace("{0}",_workflow.WorkflowName),cancelBtn:_resx.workflows_common_cancel_btn,acceptBtn:_resx.workflows_common_accept_btn,onAcceptCallback:_isNew?acceptAddNewState:acceptEditState,onCloseCallback:onCloseDialogCallback},_html,returnViewModelCallback,afterBind)},0)}var _self,_util,_isMobile,_isNew,_html,_onCloseCallback,_resx,_workflow,_viewModel,_saved,_state,_permissionGrid,_personaBarDialog,_afterBindCallback,_gridContainer,loadWeb,loadMobile,configServiceFramework,returnViewModelCallback,enableAcceptForDialog,afterBind,afterBind200Callback,afterBindErrorCallback,onCloseDialogCallback,acceptAddNewState,addNewState200Callback,addNewStateErrorCallback,acceptEditState,editState200Callback,editStateErrorCallback,editAndAdderrosCallback;return WorkflowStatesManager.class="ContentWorkflowStates",WorkflowStatesManager.type="Class",_html='<div class="panel firstPanel workflowState">                    <label class="state" data-bind="text: stateNameLbl"></label><br><br>                    <input class="stateName" type="text" data-bind="value: stateName, , valueUpdate: \'afterkeydown\'">                    <ul class="errors" data-bind="foreach: nameErrors">                        <li>                            <span class="backError" data-bind="text: Description"></span>                        </li>                    </ul>                </div>                <div class="panel">                    <label class="state" data-bind="text: reviewers"></label><br><br>                    <span data-bind="text: reviewersDescription"></span><br><br><br>                    <div id="page-permissions"></div>                </div>                <div class="panel">                    <input type="checkbox" data-bind="checked: chboxNotifAuthorVal"> <span data-bind="text: chboxNotifAuthorTxt"></span><br><br>                    <input type="checkbox" data-bind="checked: chboxNotifAdminVal"> <span data-bind="text: chboxNotifAdminTxt"></span>                </div>',_util=null,_isMobile=!1,_resx=null,_workflow=null,_state=null,_afterBindCallback=null,loadWeb=function(params,callback){},loadMobile=function(params,callback){},configServiceFramework=function(){_util.sf.moduleRoot="EvoqContentLibrary",_util.sf.controller="WorkflowStates"},returnViewModelCallback=function(){return _viewModel={reviewers:ko.observable(_resx.workflows_states_reviewers),reviewersDescription:ko.observable(_resx.workflows_states_reviewers_description),stateNameLbl:ko.observable(_resx.workflows_edit_states_name_lbl),stateName:ko.observable(_state.StateName||"").extend({required:!0,minLength:3,maxLength:40}),nameErrors:ko.observableArray([]),chboxNotifAuthorTxt:ko.observable(_resx.workflows_edit_states_notify_author),chboxNotifAdminTxt:ko.observable(_resx.workflows_edit_states_notify_admin),WorkflowName:ko.observable(_workflow.workflowName),chboxNotifAuthorVal:ko.observable(!!_isNew||_state.SendNotification),chboxNotifAdminVal:ko.observable(_state.SendNotificationToAdministrators)},_viewModel.enableAcceptForDialog=enableAcceptForDialog,_viewModel},enableAcceptForDialog=function(){return 0===_viewModel.stateName().length&&(_viewModel.stateName(" "),_viewModel.stateName("")),_viewModel.stateName.isValid()},afterBind=function(){null!==_state.stateId&&(_gridContainer=$("#page-permissions"),configServiceFramework(),_util.sf.post("GetPermissionsData",{StateId:_state.StateId},afterBind200Callback,afterBindErrorCallback)),"function"==typeof afterBindCallback&&afterBindCallback()},afterBind200Callback=function(data){var layout;dnn.controls.PermissionGrid.resx=_resx,dnn.controls.PermissionGrid.resx=_resx,_permissionGrid=new dnn.controls.PermissionGrid(_self,data),layout=_permissionGrid.getLayout(),_gridContainer.prepend(layout),setTimeout(function(){_personaBarDialog.updateHeight(700)},500),_permissionGrid.getLayout().on("tableUpdated",function(){_personaBarDialog.updateHeight()})},afterBindErrorCallback=function(data){},acceptAddNewState=function(){configServiceFramework(),_util.sf.post("Create",{WorkflowId:_workflow.WorkflowID,State:{StateName:_viewModel.stateName(),SendNotificationToAdministrators:_viewModel.chboxNotifAdminVal()===!0,SendNotification:_viewModel.chboxNotifAuthorVal()===!0},Permissions:_permissionGrid.getPermissions()},addNewState200Callback,addNewStateErrorCallback)},addNewState200Callback=function(data){_saved=!0,_state=data.State,_personaBarDialog.close()},addNewStateErrorCallback=function(data){editAndAdderrosCallback(data)},acceptEditState=function(){_state={StateId:_state.StateId,StateName:_viewModel.stateName(),SendNotificationToAdministrators:_viewModel.chboxNotifAdminVal()===!0,SendNotification:_viewModel.chboxNotifAuthorVal()===!0},configServiceFramework(),_util.sf.post("Edit",{WorkflowId:_workflow.WorkflowID,State:_state,Permissions:_permissionGrid.getPermissions()},editState200Callback,editStateErrorCallback)},editState200Callback=function(data){_saved=!0,_personaBarDialog.close()},editStateErrorCallback=function(data){editAndAdderrosCallback(data)},editAndAdderrosCallback=function(data){var res,messages;_saved=!1,data||$.dnnNotif({text:_resx.workflows_unknown_error,height:70}),500===data.status&&$.dnnNotif({text:"Error "+data.status+": "+data.statusText,height:70}),data&&500!=data.status?(data.responseJSON&&data.responseJSON.Messages&&(messages=data.responseJSON.Messages),data.responseText&&(res=JSON.parse(data.responseText),res.Messages&&(messages=res.Messages))):$.dnnNotif({text:_resx.workflows_unknown_error,height:70}),_viewModel.nameErrors.removeAll();for(var messageIdx in messages)switch(messages[messageIdx].Field){case"":break;case"StateName":_viewModel.nameErrors.push({Description:messages[messageIdx].Description})}},onCloseDialogCallback=function(){"function"==typeof _onCloseCallback&&_onCloseCallback(_saved===!0?_state:null)},WorkflowStatesManager.prototype._getService=function(){return configServiceFramework(),_util.sf},WorkflowStatesManager.prototype.load=function(params,callback){return this.isMobile?loadMobile(params,callback):loadWeb(params,callback)},WorkflowStatesManager}(jQuery,ko),window.dnn.modules.workflows.WorkflowStatesManager=WorkflowStatesManagerClass}.call(this);