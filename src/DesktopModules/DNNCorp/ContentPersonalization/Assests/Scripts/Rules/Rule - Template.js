﻿
﻿
window.dnn=dnn||{};window.dnn.personalizedTabs=dnn.personalizedTabs||{};window.dnn.personalizedTabs.rules=dnn.personalizedTabs.rules||{};(function IIFE(){var TemplateRuleClass;TemplateRuleClass=(function IIFE(){'use strict';var HTML_PATH="Assests/Html/Rules/TemplateRuleTemplate.html";var _templateLoader,_service,_resx;var getService,getServiceUrl,getViewModel,remove;TemplateRule.class='TemplateRule';TemplateRule.type='Class';TemplateRule.template;TemplateRule.allowMultipleInstances=false;function TemplateRule(onDeleteRuleCallback,resx){_resx=resx;this._id="";this._viewModel={};this._ruleElement=null;this.onDeleteRuleCallback=onDeleteRuleCallback;_templateLoader=window.dnn.personalizedTabs.TemplateLoader;if(!TemplateRule.template){_templateLoader.readHtmlTemplate(dnn.getVar('dnn_content_personalization_resourceroot')+HTML_PATH,function(template){TemplateRule.template=template;});}}
getService=function(){if(!_service){_service=$.dnnSF();}
return _service;};getServiceUrl=function(service,controller){return getService().getServiceRoot(service)+controller+'/';};getViewModel=function(self,data){self._viewModel={id:self._id,remove:remove,self:self,resx:_resx,};if(data){};self._viewModel.validationObservable=ko.validatedObservable({});};remove=function(){if(this.self.onDeleteRuleCallback&&typeof this.self.onDeleteRuleCallback==='function'){this.self.onDeleteRuleCallback(this.id);}};TemplateRule.getId=function(){return"TemplateRule";};TemplateRule.getName=function(resx){return resx.RulesLanguageName;};TemplateRule.loadTemplate=function(callback){if(!TemplateRule.template){_templateLoader.readHtmlTemplate(dnn.getVar('dnn_content_personalization_resourceroot')+HTML_PATH,function(template){TemplateRule.template=template;callback();});}else{callback();}}
TemplateRule.prototype.getId=function(){return this._id;};TemplateRule.prototype.injectRule=function(parentElement,afterInjectCallback,data){var self=this;TemplateRule.loadTemplate(function(){var dateNow=new Date().getTime();var html=TemplateRule.template.replace(/\{0\}/g,dateNow);parentElement.append(html);self._id=dateNow;self._ruleElement=$("#{0}".replace(/\{0\}/g,self._id));getViewModel(self,data);ko.applyBindings(self._viewModel,self._ruleElement[0],{decorateElement:true,insertMessages:true,deep:true});afterInjectCallback(self,parentElement,self._viewModel.validationObservable);});}
TemplateRule.prototype.getDataToBeSent=function(){if(!this._viewModel){return;}
return{type:"TemplateRule",PortalId:parseInt(dnn.getVar('dnn_content_personalization_portalId'))};}
TemplateRule.prototype.freeContext=function(){var element=$("#{0}".replace(/\{0\}/g,this._id));ko.cleanNode(element);}
TemplateRule.prototype.doesRuleAllowMultipleInstances=function(){return TemplateRule.allowMultipleInstances;};TemplateRule.prototype.getRuleClass=function(){return TemplateRule.class;};return TemplateRule;})();window.dnn.personalizedTabs.rules.TemplateRule=TemplateRuleClass;}).call(this);