"undefined"!=typeof window.dnn&&null!==window.dnn||(window.dnn={}),function($,window,document,undefined){"use strict";var $element=function(element,props){var $e=$(document.createElement(element));return props&&$e.attr(props),$e},GettingStarted=this.GettingStarted=function(element,options){this.element=element,this._options=options,this.init()};GettingStarted.prototype={constructor:GettingStarted,init:function(){this._options=$.extend({},GettingStarted.defaults(),this._options),this._controller=new GettingStartedController,this.$this=$(this),this._options.showOnStartup&&this.show()},_isEmailValid:function(email){var re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return re.test(email)},_ensureDialog:function(){if(!this.$element){this.$element=this.element?$(this.element):this._createLayout(),this._$checkBox=this.$element.find("."+this._options.footerLeftCss).find("input"),this._$emailBox=this.$element.find("."+this._options.inputboxWrapperCss).find("input"),this._$content=this.$element.find("."+this._options.contentCss),this._$iframe=this.$element.find("iframe"),$.bindIframeLoadEvent(this._$iframe[0],$.proxy(this._onContentLoad,this));var $signUpButton=this.$element.find("."+this._options.headerLeftInputCss).find("a");$signUpButton.on("click",$.proxy(this._signUp,this))}},_onContentLoad:function(){this._$iframe.show(),this._$iframe.attr("src")!==GettingStarted._blankUrl&&this._$content.removeClass(this._options.loadingContentCss)},_getContentUrl:function(){this._$content.addClass(this._options.loadingContentCss),this._controller.getContentUrl($.proxy(this._onGetContentUrl,this))},_onGetContentUrl:function(url){var webResource=new dnn.WebResourceUrl(url);webResource.parameters().set("timestamp",(new Date).getTime()),this._$iframe.attr("src",webResource.toPathAndQuery())},_createLayout:function(){var checkBoxId=dnn.uid("gs_"),signUpBoxId=dnn.uid("gs_"),layout=$element("div",{class:this._options.containerCss}).append($element("div",{class:this._options.headerCss}).append($element("div",{class:this._options.headerLeftCss}).append($element("div").append($element("div",{class:this._options.headerLeftTextCss}).append($element("div").append($element("label",{for:signUpBoxId}).text(this._options.resources.signUpLabel),$element("span").text(this._options.resources.signUpText))),$element("div",{class:this._options.headerLeftInputCss}).append($element("div").append($element("div",{class:this._options.inputboxWrapperCss}).append($element("input",{type:"text",id:signUpBoxId,maxlength:"200",autocomplete:"off"}).val(this._options.resources.signUpLabel)),$element("a",{href:"javascript:void(0);",title:this._options.resources.signUpButton}).text(this._options.resources.signUpButton))))),$element("div",{class:this._options.headerRightCss}).append($element("div").append($element("a",{href:"javascript:void(0);",target:"manual",title:this._options.resources.downloadManualButton}).append($element("span").text(this._options.resources.downloadManualButton))))),$element("div",{class:this._options.contentCss}).append($element("div").append($element("iframe",{scrolling:"no",frameborder:"0"}))),$element("div",{class:this._options.footerCss}).append($element("div",{class:this._options.footerBorderCss}).append($element("div")),$element("div",{class:this._options.footerLeftCss}).append($element("input",{type:"checkbox",id:checkBoxId,value:"notshowagain",name:"ShowDialog"}),$element("label",{for:checkBoxId}).text(this._options.resources.dontShowDialogLabel)),$element("div",{class:this._options.footerRightCss}).append($element("a",{href:"//twitter.com/dnncorp",target:"dnn-twitter",class:this._options.twitterLinkCss,title:this._options.resources.twitterLinkTooltip}),$element("a",{href:"//facebook.com/dotnetnuke",target:"dnn-facebook",class:this._options.facebookLinkCss,title:this._options.resources.facebookLinkTooltip}))));return layout},_onCloseDialog:function(){var notShowAgain=this._$checkBox.prop("checked");this._settings&&(this._settings.IsHidden=notShowAgain),this._controller.closeDialog(notShowAgain),this._isShown=!1},_onGetSettings:function(settings){this._settings=settings,this._bindSettings(settings)},_bindSettings:function(settings){this._$checkBox.prop("checked",settings.IsHidden),this._$emailBox.val(settings.EmailAddress);var $downloadManual=this.$element.find("."+this._options.headerRightCss).find("a");$downloadManual.attr("href",settings.UserManualUrl)},_signUp:function(){var email=this._$emailBox.val().trim(),isValid=this._isEmailValid(email),self=this;return isValid?void this._controller.signUp(email,$.proxy(this._onSignUp,this)):void $.dnnAlert({title:this._options.resources.invalidEmailTitle,text:this._options.resources.invalidEmailMessage,callback:function(){self._$emailBox.focus()}})},_onSignUp:function(){$.dnnAlert({title:this._options.resources.signUpTitle,text:this._options.resources.signUpMessage})},show:function(){if(!this._isShown){this._isShown=!0,this._ensureDialog(),this._$iframe.hide().attr("src",GettingStarted._blankUrl),this._settings?this._bindSettings(this._settings):this._controller.getSettings($.proxy(this._onGetSettings,this)),this.$element.dialog({modal:!0,autoOpen:!0,dialogClass:"dnnFormPopup "+this._options.dialogCss,title:this._options.resources.title,resizable:!1,width:this._options.width,height:this._options.height,close:$.proxy(this._onCloseDialog,this)});var self=this;setTimeout(function(){self._getContentUrl()},0)}}},GettingStarted._blankUrl="about:blank",GettingStarted._defaults={dialogCss:"gs-dialog",containerCss:"gs-container",headerCss:"gs-header",headerLeftCss:"gs-header-left-side",headerLeftTextCss:"gs-header-left-side-text",headerLeftInputCss:"gs-header-left-side-input",inputboxWrapperCss:"gs-header-left-side-inputbox-wrapper",headerRightCss:"gs-header-right-side",contentCss:"gs-content",loadingContentCss:"gs-loading-content",footerCss:"gs-footer",footerBorderCss:"gs-footer-border",footerLeftCss:"gs-footer-left-side",footerRightCss:"gs-footer-right-side",twitterLinkCss:"gs-twitter-button",facebookLinkCss:"gs-facebook-button",width:950,height:640},GettingStarted.defaults=function(settings){return"undefined"!=typeof settings&&$.extend(GettingStarted._defaults,settings),GettingStarted._defaults};var GettingStartedController=this.GettingStartedController=function(options){this._options=options,this.init()};GettingStartedController.prototype={constructor:GettingStartedController,init:function(){this._options=$.extend({},GettingStartedController.defaults(),this._options),this._serviceUrl=$.dnnSF(this._options.moduleId).getServiceRoot(this._options.serviceRoot)},_callService:function(data,onLoadHandler,method,isGet){var serviceSettings={url:this._serviceUrl+method,beforeSend:$.dnnSF(this._options.moduleId).setModuleHeaders,dataType:"json",contentType:"application/json; charset=utf-8",data:isGet?data:JSON.stringify(data),type:isGet?"GET":"POST",async:!0,success:onLoadHandler,error:$.onAjaxError};$.ajax(serviceSettings)},closeDialog:function(notShowAgain,callback){var onCloseDialogHandler=$.proxy(this._onCloseDialog,this,callback);this._callService({IsHidden:notShowAgain},onCloseDialogHandler,this._options.closeDialogMethod)},_onCloseDialog:function(callback,data,textStatus,jqXhr){"function"==typeof callback&&callback.call(this,data)},getSettings:function(callback){var onGetSettingsHandler=$.proxy(this._onGetSettings,this,callback);this._callService({},onGetSettingsHandler,this._options.getSettingsMethod,!0)},_onGetSettings:function(callback,data,textStatus,jqXhr){"function"==typeof callback&&callback.call(this,data)},signUp:function(email,callback){var onSignUpHandler=$.proxy(this._onSignUp,this,callback);this._callService({Email:email},onSignUpHandler,this._options.signUpMethod)},_onSignUp:function(callback,data,textStatus,jqXhr){"function"==typeof callback&&callback.call(this,data)},getContentUrl:function(callback){var onGetContentUrlHandler=$.proxy(this._onGetContentUrl,this,callback);this._callService({},onGetContentUrlHandler,this._options.getContentUrlMethod,!0)},_onGetContentUrl:function(callback,data,textStatus,jqXhr){"function"==typeof callback&&callback.call(this,data.Url)}},GettingStartedController._defaults={serviceRoot:"InternalServices",closeDialogMethod:"GettingStarted/CloseGettingStartedPage",getSettingsMethod:"GettingStarted/GetGettingStartedPageSettings",signUpMethod:"GettingStarted/SubscribeToNewsletter",getContentUrlMethod:"GettingStarted/GetContentUrl"},GettingStartedController.defaults=function(settings){return"undefined"!=typeof settings&&$.extend(GettingStartedController._defaults,settings),GettingStartedController._defaults};this.GettingStartedDialog=dnn.singletonify(GettingStarted)}.apply(dnn,[jQuery,window,document]),dnn.createGettingStartedPage=function(options){$(document).ready(function(){dnn.GettingStartedDialog.getInstance(null,options)})};