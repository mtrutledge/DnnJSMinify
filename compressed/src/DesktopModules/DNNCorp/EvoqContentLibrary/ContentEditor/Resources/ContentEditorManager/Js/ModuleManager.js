"undefined"!=typeof dnn&&null!==dnn||(dnn={}),"undefined"!=typeof dnn.ContentEditorManager&&null!==dnn.ContentEditorManager||(dnn.ContentEditorManager={}),function($){$.fn.dnnModuleManager=function(options){return this.data("dnnModuleManager")||this.data("dnnModuleManager",new dnnModuleManager(this,options)),this};var dnnModuleDialogInstance,getModuleDialog=dnn.ContentEditorManager.getModuleDialog=function(){return dnnModuleDialogInstance||(dnnModuleDialogInstance=new dnn.dnnModuleDialog),dnnModuleDialogInstance},dnnModuleManager=function(container,options){this.options=options,this.container=container,this.init()};dnnModuleManager.prototype={constructor:dnnModuleManager,init:function(){this.options=$.extend({},$.fn.dnnModuleManager.defaultOptions,this.options);var $this=this.$pane=this.container;$this.parent().attr("id")&&$this.parent().attr("id").indexOf("_SyncPanel")>-1&&($this.parent().parent().addClass($this.parent().attr("class")),$this.parent().attr("class","")),$this.addClass("dnnModuleManager"),$this.append(this._generateLayout()),this._injectVisualEffects(),this._handleEvents()},getHandler:function(){return this._handler=this.getPane().find("> .addModuleHandler"),this._handler},getPane:function(){return $("#"+this.$pane.attr("id"))},_generateLayout:function(){var handler=this._handler=$('<a href="#" class="addModuleHandler"><span></span></a>');return handler},_injectVisualEffects:function(){var actionMenus=[],handler=this;if(this.container.find("div.DnnModule").each(function(){var module=$(this),moduleId=handler._findModuleId(module);actionMenus.push("#moduleActions-"+moduleId),module.data("effectsInjected")||(module.data("effectsInjected",!0),module.mouseover(function(){window.cem_dragging||module.hasClass("active-module")||module.hasClass("floating")||(module.parent().find("> div.DnnModule").removeClass("active-module"),module.addClass("active-module"),$(menusSelector).not('[class~="floating"]').stop(!0,!0).fadeTo("fast",.5,function(){$("#moduleActions-"+moduleId).not('[class~="floating"]').stop(!0,!0).fadeTo(0).show().fadeTo("fast",1)}))}))}),!this.container.data("effectsInjected")){this.container.data("effectsInjected",!0);var menusSelector=actionMenus.join(",");this.container.mouseover(function(e){return!window.cem_dragging&&($(this).hasClass("active-pane")||($(".actionMenu").stop(!0,!0).hide(),$(menusSelector).not('[class~="floating"]').show(),$("div.dnnSortable").removeClass("active-pane"),$(this).addClass("active-pane")),!1)}).mouseout(function(e){if(window.cem_dragging)return!1;var target=$(e.relatedTarget);return target.parents(".active-pane").length>0||target.hasClass("actionMenu")||target.parents(".actionMenu").length>0?(target.hasClass("actionMenu")&&!target.hasClass("floating")?($(".actionMenu:visible").stop(!0,!0).css({opacity:.5}),target.stop(!0,!0).css({opacity:1})):target.parents(".actionMenu").length>0&&!target.parents(".actionMenu").hasClass("floating")&&($(".actionMenu:visible").stop(!0,!0).css({opacity:.5}),target.parents(".actionMenu").stop(!0,!0).css({opacity:1})),!1):($(menusSelector).stop(!0,!0).hide(),$(this).removeClass("active-pane"),!1)}),$(document).mouseover(function(e){return!window.cem_dragging&&void($(e.target).parents(".actionMenu").length>0||0==$(".actionMenu:visible").length||($(".actionMenu").stop(!0,!0).hide(),$("div.dnnSortable").removeClass("active-pane"),$("div.dnnSortable > div.DnnModule").removeClass("active-module")))}),$(".actionMenu").mouseover(function(){return!1}),setTimeout(function(){$("div.dnnSortable").trigger("mouseout"),$(menusSelector).find('li[id$="-Delete"] a').each(function(){var $deleteButton=$(this);$deleteButton.off("click").dnnConfirm({text:dnn.ContentEditorManagerResources.deleteModuleConfirm,yesText:dnn.ContentEditorManagerResources.confirmYes,noText:dnn.ContentEditorManagerResources.confirmNo,title:dnn.ContentEditorManagerResources.confirmTitle,isButton:!0,callbackTrue:function(){dnn.ContentEditorManager.triggerChangeOnPageContentEvent(),location.href=$deleteButton.attr("href")}})})},1e3)}},_findModuleId:function(module){return module.find("a").first().attr("name")},_handleEvents:function(){this._handler.click($.proxy(this._addModuleHandlerClick,this))},_addModuleHandlerClick:function(e){var dialog=getModuleDialog();return this._handler.hasClass("active")?(dialog.close(),this._handler.removeClass("active")):(dialog.apply(this).open(),this._handler.addClass("active")),!1}},$.fn.dnnModuleManager.defaultOptions={}}(jQuery);