define(["jquery","knockout","knockout.mapping","knockout.validation.min","jquery-ui.min","../scripts/permissionGridManager","../scripts/permissionGrid"],function($,ko,koMapping){"use strict";var serviceController,selectedTemplate,defaultTemplate,permissionGrid,defaultWorkflow,isSaving,init,refreshConfiguration,initValidationConfiguration,getViewModel,getService,getDefaultWorkflow,getTemplates,convertTemplateViewModel,selectTemplate,getDefaultSelectedTemplate,addTemplate,cancelTemplate,onDeleteCallback,getPermissions,savePermissions,saveTemplate,onSaveTemplateSuccessCallback,updateStatus,isErrorField,viewModel={},Status=function(data){return data?null:{code:ko.observable(0),field:ko.observable(""),message:ko.observable("")}},Template=function(data){return data?null:{tabId:0,name:ko.observable(""),localizedName:"",title:"",description:ko.observable(""),tags:"",keywords:"",alias:"",url:"/",includeInMenu:!0,thumbnail:"",created:"",hierarchy:"",hasChild:!1,type:0,customUrlEnabled:!0,templateId:ko.observable(0),pageType:"template",workflowId:ko.observable(-1),isWorkflowCompleted:!1,applyWorkflowToChildren:!1,isWorkflowPropagationAvailable:!1,isCopy:!1,trackLinks:!1}};return initValidationConfiguration=function(){ko.validation.rules.pattern.message="Invalid.",ko.validation.configure({registerExtenders:!0,messagesOnModified:!0,insertMessages:!0,parseInputAttributes:!0,messageTemplate:null}),ko.validation.rules.needTemplate={validator:function(val,otherVal){return val>0},message:""},ko.validation.registerExtenders()},getService=function(){return serviceController.moduleRoot="EvoqContentLibrary",serviceController.controller="PageManagement",serviceController},convertTemplateViewModel=function(data){return data.selected=ko.observable(!1),data},getTemplates=function(){getService().get("GetPageTemplates",{},function(data){viewModel.pageTemplates.removeAll();for(var i=0;i<data.length;i++){var template=convertTemplateViewModel(data[i]);data[i].useDefaultSkin?(template.selected(!0),defaultTemplate=template,selectedTemplate=template):template.selected(!1),viewModel.pageTemplates.push(template)}})},getDefaultWorkflow=function(){getService().get("GetWorkflows",null,function(data){for(var i=0;i<data.length;i++)data[i].IsDefaultWorkflow===!0&&(defaultWorkflow=data[i])})},getDefaultSelectedTemplate=function(){var defaultSelected=defaultTemplate;return!defaultSelected&&viewModel.pageTemplates().length>0&&(defaultSelected=viewModel.pageTemplates()[0]),defaultSelected},addTemplate=function(){if(!viewModel.visibleAddTemplateForm()){var defaultSelected=getDefaultSelectedTemplate();defaultSelected&&(defaultSelected.selected(!0),viewModel.page.templateId(defaultSelected.id)),viewModel.validationObservable.errors.showAllMessages(!1),viewModel.visibleAddTemplateForm(!0)}},selectTemplate=function(template){var previousValue=template.selected();selectedTemplate=null,viewModel.pageTemplates().forEach(function(t){t.selected(!1)}),template.selected(!previousValue),template.selected()?(selectedTemplate=template,viewModel.page.templateId(selectedTemplate.id)):(selectedTemplate=null,viewModel.page.templateId(null))},updateStatus=function(data){viewModel.status.code(data.Status),viewModel.status.field(data.Field),viewModel.status.message(data.Message)},getPermissions=function(){getService().get("GetPermissionsData",{pageId:-1},function(data){permissionGrid&&(permissionGrid.getLayout().remove(),permissionGrid=null),dnn.controls.PermissionGrid.resx=viewModel.resx;var permissionGridParent={_getService:getService};permissionGrid=new dnn.controls.PermissionGrid(permissionGridParent,data)})},savePermissions=function(pageData,callback){var permissions=permissionGrid.getPermissions();permissions.tabId=pageData.id,getService().post("SavePagePermissions",permissions,function(data){return isSaving=!1,data.Status>0?void $.dnnAlert({text:data.Message}):void callback(pageData)})},onSaveTemplateSuccessCallback=function(data){return data.Status>0?(updateStatus(data),void(isSaving=!1)):void savePermissions(data.Page,function(pageData){dnn.dnnTemplatesHierarchy&&dnn.dnnTemplatesHierarchy.addTemplate(data),viewModel.pageTemplates.push(convertTemplateViewModel(pageData)),cancelTemplate()})},saveTemplate=function(){if(!isSaving){isSaving=!0;var pageModel=viewModel.page;if(pageModel.errors().length>0)return pageModel.errors.showAllMessages(),isSaving=!1,!1;viewModel.page.workflowId=defaultWorkflow.WorkflowId;var data=ko.mapping.toJS(viewModel.page);getService().post("SavePageDetails",data,onSaveTemplateSuccessCallback)}},cancelTemplate=function(){viewModel.pageTemplates().forEach(function(t){t.selected(!1)});var defaultSelected=getDefaultSelectedTemplate();defaultSelected&&(defaultSelected.selected(!0),viewModel.page.templateId(defaultSelected.id)),viewModel.page.name(null),viewModel.page.description(null),isSaving=!1,viewModel.visibleAddTemplateForm(!1)},isErrorField=function(fieldName){return viewModel.status.code>0&&viewModel.status.field==fieldName},onDeleteCallback=function(data){var deletedTemplate=null;viewModel.pageTemplates().forEach(function(t){t.id===data.id&&(deletedTemplate=t)}),deletedTemplate&&(viewModel.pageTemplates.remove(deletedTemplate),defaultTemplate&&defaultTemplate.id===deletedTemplate.id&&(defaultTemplate=null))},init=function(service,resx){serviceController=service,initValidationConfiguration(),viewModel={pageTemplates:ko.observableArray([]),visibleAddTemplateForm:ko.observable(!1),resx:resx,status:new Status,page:new Template,isErrorField:isErrorField,addTemplate:addTemplate,saveTemplate:saveTemplate,selectTemplate:selectTemplate,cancelTemplate:cancelTemplate};var templateModel=viewModel.page;templateModel.errors=ko.validation.group(templateModel),templateModel.name.extend({required:!0}),templateModel.templateId.extend({needTemplate:{message:viewModel.resx.pagesettings_Errors_templates_NoTemplate}}),viewModel.validationObservable=ko.validatedObservable({name:templateModel.name}),refreshConfiguration()},refreshConfiguration=function(){getTemplates(),getDefaultWorkflow(),getPermissions()},getViewModel=function(){return viewModel},{init:init,refreshConfiguration:refreshConfiguration,onDeleteCallback:onDeleteCallback,getViewModel:getViewModel}});