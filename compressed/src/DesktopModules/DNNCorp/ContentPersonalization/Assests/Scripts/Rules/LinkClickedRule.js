window.dnn=dnn||{},window.dnn.personalizedTabs=dnn.personalizedTabs||{},window.dnn.personalizedTabs.rules=dnn.personalizedTabs.rules||{},function(){var LinkClickedRuleClass;LinkClickedRuleClass=function(){"use strict";function LinkClikedRule(onDeleteRuleCallback,resx){_resx=resx,this._id="",this._viewModel={},this._ruleElement=null,this.onDeleteRuleCallback=onDeleteRuleCallback,_templateLoader=window.dnn.personalizedTabs.TemplateLoader,LinkClikedRule.template||_templateLoader.readHtmlTemplate(dnn.getVar("dnn_content_personalization_resourceroot")+HTML_PATH,function(template){LinkClikedRule.template=template})}var _templateLoader,_service,_resx,getService,getServiceUrl,getViewModel,remove,HTML_PATH="Assests/Html/Rules/LinkClickedRuleTemplate.html";return LinkClikedRule.class="LinkClickedRule",LinkClikedRule.type="Class",LinkClikedRule.template,LinkClikedRule.allowMultipleInstances=!0,getService=function(){return _service||(_service=$.dnnSF()),_service},getServiceUrl=function(service,controller){return getService().getServiceRoot(service)+controller+"/"},getViewModel=function(self,data){self._viewModel={id:self._id,remove:remove,self:self,resx:_resx,url:getServiceUrl("ContentPersonalization","LinkClicked")+"SearchLink",link:ko.observable().extend({required:!0,pattern:{message:_resx.RulesLinkClickedRuleInvalidUrl,params:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/}})},data&&self._viewModel.link(data.Link),self._viewModel.validationObservable=ko.validatedObservable({link:self._viewModel.link})},remove=function(){this.self.onDeleteRuleCallback&&"function"==typeof this.self.onDeleteRuleCallback&&this.self.onDeleteRuleCallback(this.id)},LinkClikedRule.getId=function(){return"LinkClickedRule"},LinkClikedRule.getName=function(resx){return resx.RulesLinkClickedRuleName},LinkClikedRule.loadTemplate=function(callback){LinkClikedRule.template?callback():_templateLoader.readHtmlTemplate(dnn.getVar("dnn_content_personalization_resourceroot")+HTML_PATH,function(template){LinkClikedRule.template=template,callback()})},LinkClikedRule.prototype.getId=function(){return this._id},LinkClikedRule.prototype.injectRule=function(parentElement,afterInjectCallback,data){var self=this;LinkClikedRule.loadTemplate(function(){var dateNow=(new Date).getTime(),html=LinkClikedRule.template.replace(/\{0\}/g,dateNow);parentElement.append(html),self._id=dateNow,self._ruleElement=$("#{0}".replace(/\{0\}/g,self._id)),getViewModel(self,data),ko.applyBindings(self._viewModel,self._ruleElement[0]),afterInjectCallback(self,parentElement,self._viewModel.validationObservable)})},LinkClikedRule.prototype.getDataToBeSent=function(){if(this._viewModel)return{type:"LinkClickedRule",Link:this._viewModel.link()}},LinkClikedRule.prototype.freeContext=function(){var element=$("#{0}".replace(/\{0\}/g,this._id));ko.cleanNode(element)},LinkClikedRule.prototype.doesRuleAllowMultipleInstances=function(){return LinkClikedRule.allowMultipleInstances},LinkClikedRule.prototype.getRuleClass=function(){return LinkClikedRule.class},LinkClikedRule}(),window.dnn.personalizedTabs.rules.LinkClickedRule=LinkClickedRuleClass}.call(this);