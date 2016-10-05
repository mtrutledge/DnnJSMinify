﻿
﻿
window.dnn=dnn||{};window.dnn.personalizedTabs=dnn.personalizedTabs||{};(function IIFE(){var PersonalizedTabManagerClass;PersonalizedTabManagerClass=(function IIFE(){'use strict';var HTML_PATH='Assests/Html/PersonalizedTabDialog.html';var SELECTED_RULES_EXTENSION_POINT_ID="#selectedRulesExtensionPoint";var _RULE_LIST_NODE_TEMPLATE='<li class="rule">'+'<div class="andRule" />'+'</li>';var SAVING_LAYER_TEMPLATE='<div class="dnnPersonalizedPageEditingSavingLayer">'+'<div class="loopBar">'+'<div class="progressA" style="width: 0;"></div>'+'</div>'+'<div class="optacityLayer">'+'<h1 style="">Saving changes...</h1>'+'</div>'+'</div>';var TIME_PROGRESS_BAR_SAVE_LAYER=4000;var _viewModel,_dialog,_savingLayer;var _masterTabId;var _templateLoader;var _availableRules=[];var _selectedRules={};var _validationObservableFunctions={};var _tab;var _saveCallback;var resx,resxSettings;var makeRequest,getService,getServiceUrl,service,onBeforeSend,confirmAction,createViewModel,getViewModel,savePersonalizedTab,saveProcessWorking,createSavingLayer,cancelPersonalizedTabEditing,addNewRule,afterInjectCallback,generateRuleContainerId,deleteRule,populateSeletedRules,getAvalableRule,updateDropZoneSelectedRulesStyle,updateHeight,afterShowDialogCallback,validateModel,resxCallback200;PersonalizedTabManager.class='PersonalizedTabManager';PersonalizedTabManager.type='Class';resxCallback200=function(response){resx=response.localization;_availableRules=[{name:dnn.personalizedTabs.rules.RolesRule.getName(resx),class:dnn.personalizedTabs.rules.RolesRule},{name:dnn.personalizedTabs.rules.GeographicLocationRule.getName(resx),class:dnn.personalizedTabs.rules.GeographicLocationRule},{name:dnn.personalizedTabs.rules.LanguageRule.getName(resx),class:dnn.personalizedTabs.rules.LanguageRule},{name:dnn.personalizedTabs.rules.DeviceTypeRule.getName(resx),class:dnn.personalizedTabs.rules.DeviceTypeRule},{name:dnn.personalizedTabs.rules.PageVisitedRule.getName(resx),class:dnn.personalizedTabs.rules.PageVisitedRule},{name:dnn.personalizedTabs.rules.LinkClickedRule.getName(resx),class:dnn.personalizedTabs.rules.LinkClickedRule},{name:dnn.personalizedTabs.rules.LastActivityDateRule.getName(resx),class:dnn.personalizedTabs.rules.LastActivityDateRule},{name:dnn.personalizedTabs.rules.UserProfileRule.getName(resx),class:dnn.personalizedTabs.rules.UserProfileRule}];_availableRules.forEach(function(rule,index){if(rule.class.initStaticElements&&typeof rule.class.initStaticElements==='function'){rule.class.initStaticElements();}});createViewModel();};function PersonalizedTabManager(masterTabId,saveCallback){_saveCallback=saveCallback;_masterTabId=masterTabId;_templateLoader=window.dnn.personalizedTabs.TemplateLoader;var localizationOptions={service:'ContentPersonalization',controller:'Localization',resxName:'PersonalizedTabResourcesSettingsResx',resourceSettings:{local:{culture:dnn.getVar('cem_PersonalizedTabResourcesSettings_resx_culture'),resxTimeStamp:dnn.getVar('cem_PersonalizedTabResourcesSettings_resx_timestamp')}},resources:{method:'GetPersonalizedTabTable',paramName:null,callback200:resxCallback200,callbackError:null}};new dnn.utils.Localization(localizationOptions);}
getService=function(){if(!service){service=$.dnnSF();}
return service;};getAvalableRule=function(id){var length=_availableRules.length;for(var i=0;i<length;i++){if(_availableRules[i].class.getId()===id){return _availableRules[i];}}};getServiceUrl=function(service,controller){return getService().getServiceRoot(service)+controller+'/';};onBeforeSend=function(xhr){getService().setModuleHeaders(xhr);};makeRequest=function(service,controller,method,type,params,data,callback,errorCallBack,sync){var d=data;if(params&&params.dataType==='json'){d=JSON.stringify(data);}
var request={url:getServiceUrl(service,controller)+method,type:type,data:d,async:!sync,beforeSend:$.proxy(onBeforeSend,this),success:function(data){if(typeof callback=="function"){callback(data);}},error:function(xhr){if(typeof errorCallBack=="function"){errorCallBack(xhr);}}}
$.extend(request,params);$.ajax(request);};confirmAction=function(options,yesAction,noAction){$("<div class='dnnDialog'></div>").html(options.dialogText).dialog({modal:true,autoOpen:true,dialogClass:"dnnFormPopup",width:400,height:215,resizable:false,title:options.dialogTitle,buttons:[{id:"delete_button",text:options.yesText,"class":"dnnPrimaryAction",click:function(){$(this).dialog("close");if(yesAction&&typeof yesAction=='function'){yesAction();}}},{id:"cancel_button",text:options.noText,click:function(){$(this).dialog("close");if(noAction&&typeof noAction=='function'){noAction();}},"class":"dnnSecondaryAction"}]});};validateModel=function(){var isValid=true;var validationObservableFunction;_viewModel.errors.removeAll();for(var key in _validationObservableFunctions){validationObservableFunction=_validationObservableFunctions[key];if(!validationObservableFunction.isValid()){validationObservableFunction.errors.showAllMessages(true);isValid=false;}}
return isValid;}
createViewModel=function(){_viewModel={availableRules:ko.observableArray(_availableRules),errors:ko.observableArray([]),dropZoneStyle:ko.observable("height:95%"),selectedRulesStyle:ko.observable("height:0%"),showSelectedRules:ko.observable(false),deleteRule:deleteRule,addNewRule:addNewRule,enableAcceptForDialog:validateModel,tab:{name:ko.observable("").extend({required:true,minLength:3,maxLength:40,pattern:{message:resx.NamePatternValidationMessage,params:/^([a-zA-z0-9\s\-])+$/}}),},resx:{titleCreation:resx.TitleCreation,titleEdit:resx.TitleEdition,versionName:resx.VersionName,inputVersionNameType:resx.TypeVersionName,rulesBox:{rules:resx.RulesBoxRules,},titles:{rules:resx.SubTitleRules,},labels:{dropZone:resx.LabelsDropZone,},buttons:{save:resx.ButtonsSave,cancel:resx.ButtonsCancel},},};_viewModel.validationObservable=ko.validatedObservable({name:_viewModel.tab.name});var dateNow=new Date().getTime();_validationObservableFunctions[dateNow]=_viewModel.validationObservable;};getViewModel=function(){if(!_viewModel){createViewModel();}
_selectedRules={};if(_tab){_viewModel.tab.name(_tab.name);}else{_viewModel.tab.name("");};_viewModel.validationObservable.errors.showAllMessages(false);updateDropZoneSelectedRulesStyle();return _viewModel;};populateSeletedRules=function(){if(!_tab){return;}
var rule;for(var i=0;i<_tab.rules.length;i++){rule=_tab.rules[i];var availableRule=getAvalableRule(rule.type);addNewRule(availableRule,rule);}}
cancelPersonalizedTabEditing=function(){$.each(_selectedRules,function(index,rule){rule.freeContext();});_tab=null;}
createSavingLayer=function(){var self,progress,dialogBox;self=this;_savingLayer=$(SAVING_LAYER_TEMPLATE);$('.editBarDialog').append(_savingLayer);_savingLayer=$('.dnnPersonalizedPageEditingSavingLayer');progress=_savingLayer.find('.progressA');dialogBox=$('.editBarDialog');_savingLayer.css({width:dialogBox.css('width'),height:dialogBox.css('height')});_savingLayer.offset(dialogBox.offset());progress.animate({width:'99%'},TIME_PROGRESS_BAR_SAVE_LAYER);};savePersonalizedTab=function(){if(saveProcessWorking){return false;}
var rules=[];var webMethod,tabId;if(!_viewModel.validationObservable().isValid()){_viewModel.validationObservable.valueHasMutated();var result=ko.validation.group(_viewModel.validationObservable(),{deep:true});result.showAllMessages(true);return false;}
if(_tab&&_tab.tabId){webMethod='UpdatePersonalizationTab';tabId=_tab.tabId;}else{webMethod='AddPersonalizationTab';}
$.each(_selectedRules,function(idx,rule){rules.push(rule.getDataToBeSent());});var requestData={OriginalTabId:_masterTabId,PortalId:parseInt(dnn.getVar('dnn_content_personalization_portalId')),Name:_viewModel.tab.name(),Rules:rules,TabId:tabId};if(makeRequest&&typeof makeRequest=='function'){createSavingLayer();var params={dataType:'json',contentType:"application/json"};saveProcessWorking=true;makeRequest('ContentPersonalization','ContentPersonalization',webMethod,'post',params,requestData,function(data){if(_savingLayer){_savingLayer.remove();}
saveProcessWorking=false;_saveCallback();_tab=null;_dialog.close();var message=tabId?resx.PersonalizedPageUpdateOk:resx.PersonalizedPageCreationOk;$.dnnNotif({dialogClass:'noTittle',height:50,styleBlue:true,text:message,});},function(e){if(_savingLayer){_savingLayer.remove();}
saveProcessWorking=false;var errors=$.parseJSON(e.responseText);if(!errors){$.dnnAlert(e.responseText);}
errors.forEach(function(error,index){_viewModel.errors.push({description:error.Error});});});}};updateDropZoneSelectedRulesStyle=function(){var length=Object.keys(_selectedRules).length;var dropZoneStyle="height:95%";if(!length){_viewModel.dropZoneStyle(dropZoneStyle);return;}
if(length>2){$(window).trigger("resize");return;}
dropZoneStyle=length==1?"height:45%":"height:24%";var selectedRulesStyle=length==1?"height:38%":"height:60%";_viewModel.dropZoneStyle(dropZoneStyle);_viewModel.selectedRulesStyle(selectedRulesStyle);$(window).trigger("resize");}
generateRuleContainerId=function(idRule){return"li-"+idRule;}
deleteRule=function(id){var rule=_selectedRules[id];rule.freeContext();delete _selectedRules[id];var containerId=generateRuleContainerId(id);$('#'+containerId).remove();delete _validationObservableFunctions[id];if(Object.keys(_selectedRules).length==0){_viewModel.showSelectedRules(false);}
updateDropZoneSelectedRulesStyle();}
afterInjectCallback=function(rule,parent,validationObservable){_selectedRules[rule.getId()]=rule;updateDropZoneSelectedRulesStyle();parent.attr("id",generateRuleContainerId(rule.getId()));_validationObservableFunctions[rule.getId()]=validationObservable;}
addNewRule=function(availableRule,data){var extensionElement=$(SELECTED_RULES_EXTENSION_POINT_ID);_viewModel.showSelectedRules(true);var rule=new availableRule.class(deleteRule,resx);if(!rule.doesRuleAllowMultipleInstances()){var ruleInstances=0;$.each(_selectedRules,function(index,selectedRule){if(selectedRule.getRuleClass()===rule.getRuleClass()){ruleInstances=ruleInstances+1;}});if(ruleInstances>0){$.dnnNotif({dialogClass:'noTittle',height:50,styleBlue:true,type:'warning',text:resx.PersonalizedPageConflictingRules});return;}}
extensionElement.prepend(_RULE_LIST_NODE_TEMPLATE);var liElement=extensionElement.children().first();rule.injectRule(liElement,afterInjectCallback,data);$(rule).on("validationUpdated",function(event,ruleId,validationObservable){_validationObservableFunctions[ruleId]=validationObservable;});};updateHeight=function(){_dialog.updateHeight();};afterShowDialogCallback=function(){$(window).trigger("resize");populateSeletedRules();}
PersonalizedTabManager.prototype.openDialog=function(tab){_templateLoader.readHtmlTemplate(dnn.getVar('dnn_content_personalization_resourceroot')+HTML_PATH,function(template){ko.cleanNode($(SELECTED_RULES_EXTENSION_POINT_ID));$(SELECTED_RULES_EXTENSION_POINT_ID).empty();_viewModel.errors.removeAll();_validationObservableFunctions={};var title=_viewModel.resx.titleCreation;_viewModel.showSelectedRules(false);if(tab){_tab=tab;title=_viewModel.resx.titleEdit;}
_dialog=new window.dnn.editBar.EditBarDialog({scrollPrevented:false,width:"65%",maxWidth:"830px",title:title,innerTitle:"",cancelBtnLbl:_viewModel.resx.buttons.cancel,acceptBtnLbl:_viewModel.resx.buttons.save,showAcceptBtn:true,onAcceptCallback:savePersonalizedTab,onCancelCallback:cancelPersonalizedTabEditing,onCloseCallback:cancelPersonalizedTabEditing,closeOnAccept:false,},template,getViewModel,updateHeight,afterShowDialogCallback);ko.validation.configure({decorateElement:true,insertMessages:true,observable:true});ko.validation.rules['hasElements']={validator:function(val,otherVal){return val.length>0;},message:'Must have rules'};});};return PersonalizedTabManager;})();window.dnn.personalizedTabs.PersonalizedTabManager=PersonalizedTabManagerClass;}).call(this);