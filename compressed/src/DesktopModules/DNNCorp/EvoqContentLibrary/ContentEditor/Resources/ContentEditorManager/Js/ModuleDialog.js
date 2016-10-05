"undefined"!=typeof dnn&&null!==dnn||(dnn={}),"undefined"!=typeof dnn.ContentEditorManager&&null!==dnn.ContentEditorManager||(dnn.ContentEditorManager={}),function($){var contentLayoutModule="Content Layout",htmlModule="HTML Pro",dnnModuleDialog=dnn.dnnModuleDialog=function(options){this.options=options,this.init()};dnnModuleDialog.prototype={constructor:dnnModuleDialog,init:function(){this.options=$.extend({},dnnModuleDialog.defaultOptions,this.options);var layout=this._generateLayout();$(document.body).append(layout),layout.hide(),this._addCloseButton(),this._addSearchBox(),this._loadMore=!0,this._startIndex=0,this._pageSize=10,this._bookmarkedModuleList=[],this._minInputLength=2,this._inputDelay=400,this._lastVal="",this._syncCompleteHandler=$.proxy(this._syncComplete,this),this._refreshCompleteHandler=$.proxy(this._refreshComplete,this),this._attachEvents()},apply:function(moduleManager){return this._moduleManager=moduleManager,this.options=$.extend({},this.options,{paneName:moduleManager.options.pane}),this},open:function(){return this._showDialog(),this._isOpen=!0,this._noFloat=!1,this},close:function(callback){return this._isOpen=!1,this._hideDialog(callback),this},getElement:function(){return this._dialogLayout},getModuleManager:function(){return this._moduleManager||(this._moduleManager=this.getDefaultPane().data("dnnModuleManager")),this._moduleManager},getDefaultPane:function(){return this.getPaneById()},getPaneById:function(paneName){var defaultPane=null;return paneName=paneName?paneName.toLowerCase():"contentpane",$("div.dnnSortable[id]").each(function(){var paneId=$(this).attr("id").toLowerCase();return!(paneId.length>=paneName.length&&paneId.indexOf(paneName)==paneId.length-paneName.length)||(defaultPane=$(this),!1)}),defaultPane},isOpen:function(){return this._isOpen},addPage:function(id,content){if(!$("#"+id).length){var pageContainer=this._dialogLayout.find(".dnnPageContainer"),newPage=$('<div class="dnnPage '+id+'" id="'+id+'"></div>');newPage.append(content),pageContainer.append(newPage)}},showPage:function(id,immediate){var page,pageContainer=this._dialogLayout.find(".dnnPageContainer");page="number"==typeof id?pageContainer.find(".dnnPage").eq(id):pageContainer.find(".dnnPage."+id);var left=page.position().left;if(immediate)pageContainer.css({marginLeft:0-left});else{var handler=this;pageContainer.animate({marginLeft:0-left},"fast",function(){handler._dialogLayout.trigger("pageChanged",[page])})}},refreshPane:function(paneName,args,callback,callOnReload){var paneId;paneId=paneName?this.getPaneById(paneName).attr("id"):this.getModuleManager().getPane().attr("id");var pane=$("#"+paneId),parentPane=pane.data("parentpane");if(parentPane)return void this.refreshPane(parentPane,args,callback);this._moduleManager=pane.data("dnnModuleManager");var ajaxPanel=$find(paneId+"_SyncPanel");if(ajaxPanel){var handler=this;pane.find("div.DnnModule").each(function(){var moduleId=handler._moduleManager._findModuleId($(this));$("#moduleActions-"+moduleId).remove()}),Sys.WebForms.PageRequestManager.getInstance().add_endRequest(this._refreshCompleteHandler),this._refreshPaneId=paneId,this._refreshCallback=callback,ajaxPanel.ajaxRequest(args)}else args&&!this._noFloat&&this._setCookie("CEM_CallbackData",args),callOnReload&&"function"==typeof callback&&callback.call($("#"+paneId),[!0]),location.reload()},noFloat:function(){this._noFloat=!0},addModule:function(moduleId,callback,callbackBeforeRefresh){if(this._working)return!1;this._working=!0;var params={Visibility:0,Position:-1,Module:moduleId,Pane:this.options.paneName,AddExistingModule:!1,CopyModule:!1,Sort:-1};this._addingDesktopModuleId=moduleId;var handler=this;return this.showProgressBar(),this._getService().request("AddModule","POST",params,function(data){callbackBeforeRefresh&&"function"==typeof callback&&(callback.call(handler.getModuleManager().getPane(),[data.TabModuleID]),callback=null),handler._addModuleComplete(data,callback)}),!1},setModuleId:function(moduleId){moduleId<=0?this._removeCookie("CEM_NewModuleId"):this._setCookie("CEM_NewModuleId",moduleId)},getModuleId:function(){return this._getCookie("CEM_NewModuleId")},getSiteRoot:function(){return dnn.getVar("sf_siteRoot","/").replace(/\/$/,"")},showProgressBar:function(){var $progressBar=this._dialogLayout.find(".dnnProgressBar"),$bar=$progressBar.find("> span");$bar.width(0),$progressBar.show(),$bar.animate({width:.8*$progressBar.width()},5e3)},hideProgressBar:function(){var $progressBar=this._dialogLayout.find(".dnnProgressBar"),$bar=$progressBar.find("> span");$bar.stop().width($progressBar.width()),$progressBar.hide()},_refreshComplete:function(sender,args){this.hideProgressBar(),Sys.WebForms.PageRequestManager.getInstance().remove_endRequest(this._refreshCompleteHandler),void 0!=args.get_error()&&(args.set_errorHandled(!0),location.reload());var handler=this;this.getModuleManager();setTimeout(function(){"undefined"==typeof window.dnnLoadScriptsInAjaxMode||0==window.dnnLoadScriptsInAjaxMode.length?handler._executeModuleScripts():$(window).one("dnnScriptLoadComplete",function(){handler._executeModuleScripts()})},50);var callback=this._refreshCallback,paneId=this._refreshPaneId,$pane=$("#"+paneId);this._refreshPaneId=this._refreshCallback=null,"function"==typeof callback&&callback.call($pane)},_executeModuleScripts:function(){$(window).off("load");var handler=this,moduleManager=this.getModuleManager();moduleManager.getPane().find("div.DnnModule").not('[class~="floating"]').find("script").each(function(){var script=$(this).html();script&&handler._executeScript(script)}),$(window).trigger("load").trigger("resize")},_executeScript:function(script){try{return window.execScript?window.execScript(script):function(){return window.eval.call(window,script)}()}catch(ex){return null}},_calcPosition:function(handler){var left,top,dialogWidth=this._dialogLayout.outerWidth(),dialogHeight=this._dialogLayout.outerHeight();left=$(document).scrollLeft()+$("#personaBar-iframe").outerWidth()/2+($(window).width()-dialogWidth)/2,top=$(document).scrollTop()+($(window).height()-dialogHeight)/2,this._dialogLayout.css({left:left,top:top})},_generateLayout:function(){var layout=this._dialogLayout=$('<div class="dnnModuleDialog"><div class="dnnPageContainer"><div class="dnnPage"><div class="dnnDialogTitle"><span class="title">'+dnn.ContentEditorManagerResources.title+'</span></div><div class="dnnDialogBody dnnModuleList"><div class="listContainer"><ul></ul></div></div></div></div><div class="dnnProgressBar"><span /></div></div>');return layout},_addCloseButton:function(){var closeButton=this._closeButton=$('<span class="btn-close" />');return $(".dnnModuleDialog .dnnDialogTitle .title").after(closeButton),closeButton},_addSearchBox:function(){var searchBox=$('<div class="search-container"><div class="search-input-container"><input type="text" id="AddModule_SearchModulesInput" class="search-input"/></div><a href="javascript:void(0);" title="Search" class="search-button"></a><a href="javascript:void(0);" title="Clear" class="clear-button"></a></div></div>');return $(".dnnModuleDialog .dnnDialogTitle .title").after(searchBox),searchBox},_showDialog:function(){this._createMask(),this.showPage(0,!0),this._dialogLayout.show("fast",$.proxy(this._dialogOpened,this)),$(document).on("keyup",$.proxy(this._handleKeyEvent,this)),$(window).resize()},_hideDialog:function(callback){this._destroyMask(),this._dialogLayout.hide("fast",function(){"function"==typeof callback&&callback.call(this)}),$(document).off("keyup",$.proxy(this._handleKeyEvent,this)),$(window).resize()},_createMask:function(){var mask=$('<div class="dnnDialogMask"></div>');mask.css({left:0,top:0,width:"100%",height:$(document).outerHeight()}),$(document.body).append(mask).css("overflow","hidden"),this._calcPosition(this._moduleManager.getHandler())},_destroyMask:function(){$(document.body).css("overflow","").find(".dnnDialogMask").remove()},_dialogOpened:function(){this._calcPosition(this._moduleManager.getHandler()),this._initialized||(this._dialogLayout.trigger("dialoginit"),this._initialized=!0),this._dialogLayout.trigger("dialogopen"),this._loadModuleList("",!1)},_loadModuleList:function(val,isSearch){!this._loadMore&&!isSearch||this._getService().isLoading()||(isSearch&&0==this._startIndex&&($(".listContainer ul li.dnnModuleItem").remove(),$(".listContainer div.dnnModuleDialog_ModuleListMessage").remove()),this._loadMore&&this._getService().request("GetPortalDesktopModules","GET",{category:"All",loadingStartIndex:this._startIndex,loadingPageSize:this._pageSize,searchTerm:val,excludeCategories:"Admin,Professional",sortBookmarks:!0,topModule:"None"},$.proxy(this._renderModuleList,this)))},_renderModuleList:function(data){var container=this._dialogLayout.find(".dnnModuleList .listContainer ul");if(data.length>0){for(var htmlModuleIndex=-1,contentLayoutModuleIndex=-1,i=0;i<data.length;i++)data[i].ModuleName===htmlModule?htmlModuleIndex=i:data[i].ModuleName===contentLayoutModule&&(contentLayoutModuleIndex=i);htmlModuleIndex>-1&&(data.splice(0,0,data.splice(htmlModuleIndex,1)[0]),contentLayoutModuleIndex++),contentLayoutModuleIndex>-1&&data.splice(0,0,data.splice(contentLayoutModuleIndex,1)[0]);for(var i=0;i<data.length;i++){var itemData=data[i],$item=$(this._renderItem(itemData));container.append($item),this._injectModuleScript($item,itemData)}data.length<this._pageSize?this._loadMore=!1:this._startIndex+=data.length,this._dialogLayout.trigger("moduleloaded"),this._initScrollView()}else 1==container.has("li").length&&0==this._startIndex&&($(".jspVerticalBar").hide(),$(".jspDrag").css("top","0px"),$(".jspPane").css("top","0px"),this._loadMore=!1,container.after(this._getNoResultTemplate()));$("#AddModule_SearchModulesInput").focus()},_getItemTemplate:function(){return'<li class="dnnModuleItem" data-moduleid="[$ModuleID$]"><span class="bookmarkholder"><a href="#" class="button bookmarkModule" data-moduleid="[$ModuleID$]"></a></span><span class="icon [$ModuleName|css]"><img src="[$ModuleImage$]" /></span><span class="title {0}">[$ModuleName$]</span><span class="actions"><a href="#" class="button bookmarkModule" data-moduleid="[$ModuleID$]"></a><a href="#" class="button addModule" data-moduleid="[$ModuleID$]"></a></span></li>'},_getNoResultTemplate:function(){return'<div class="dnnModuleDialog_ModuleListMessage"><span>'+dnn.ContentEditorManagerResources.nomodules+"</span></div>"},_renderItem:function(item){var extraclass,template=this._getItemTemplate();for(var a in item){for(var shortMatchRegex=new RegExp("\\[\\$"+a+"\\|(\\d+)\\$\\]","g"),shortMatch=shortMatchRegex.exec(template);shortMatch;){var val=item[a].toString(),length=parseInt(shortMatch[1],10);val.length>length&&(val=val.substr(0,length)+"..."),template=template.replace(shortMatch[0],val),shortMatch=shortMatchRegex.exec(template)}template=this._replaceAll(template,"[$"+a+"|css]",this._replaceAll(item[a].toString().toLowerCase()," ","-")),template=this._replaceAll(template,"[$"+a+"$]",item[a]),"ModuleName"===a&&(extraclass=item[a].length>20?"longTitle":"",template=template.replace("{0}",extraclass)),item.ModuleName===htmlModule||item.ModuleName===contentLayoutModule?template=this._replaceAll(template,"bookmarkModule","topModule"):item.Bookmarked&&(template=this._replaceAll(template,"bookmarkModule","bookmarkedModule"))}return template},_injectModuleScript:function(item,data){var handler=this;this._getEditorService().request("LoadModuleScript","GET",{desktopModuleId:data.ModuleID},function(returnData){if(returnData.Script){var model=handler._executeScript(returnData.Script);model&&model.addModuleHandler&&"function"==typeof model.addModuleHandler&&model.addModuleHandler.call(window,data.ModuleID,data.ModuleName)}returnData.StyleFile&&$(document.body).append('<link href="'+returnData.StyleFile+'" type="text/css" rel="stylesheet" />'),item.data("modulejs",!0)},function(){item.data("modulejs",!0)})},_initScrollView:function(){var container=this._dialogLayout.find(".dnnModuleList .listContainer");if(container.data("jsp"))container.data("jsp").reinitialise();else{container.jScrollPane();var $this=this;container.bind("jsp-scroll-y",function(e,y,atTop,atBottom){atBottom&&($("#AddModule_SearchModulesInput").val()?$this._loadModuleList($("#AddModule_SearchModulesInput").val(),!0):$this._loadModuleList("",!1))})}},_getSearchModules:function(){var $searchInput=$("#AddModule_SearchModulesInput");this._startIndex=0,this._loadMore=!0,this._loadModuleList($searchInput.val(),!0)},_resetModuleSearch:function(){var $searchInput=$("#AddModule_SearchModulesInput");$searchInput.val("").focus(),$('.listContainer ul li.dnnModuleItem:not([class~="dnnLayoutItem"])').remove(),$(".listContainer div.dnnModuleDialog_ModuleListMessage").remove(),this._loadMore=!0,this._getService()._loading=!1,this._startIndex=0,this._loadModuleList("",!0)},_searchKeyPress:function(e){if(13==e.keyCode){var val=$("#AddModule_SearchModulesInput").val();return clearTimeout(this._searchTimeout),this._startIndex=0,this._loadMore=!0,this._loadModuleList(val,!0),!1}},_searchKeyUp:function(){var val=$("#AddModule_SearchModulesInput").val();this._lastVal.length!=val.length&&(0==val.length||val.length>=this._minInputLength)&&(this._startIndex=0,this._loadMore=!0,this._loadModuleList(val,!0)),this._lastVal=val},_attachEvents:function(){this._dialogLayout.on("click",".dnnModuleItem",$.proxy(this._doAddModule,this)),$(window).on("resize","",$.proxy(this._layoutResized,this)),this._dialogLayout.on("click","span.actions .button.bookmarkModule",$.proxy(this._addBookmarkModule,this)),this._dialogLayout.on("click","span.bookmarkholder .button.bookmarkedModule",$.proxy(this._removeBookmarkModule,this)),this._dialogLayout.on("click","span.btn-close",$.proxy(this._closeButtonHandler,this));var $searchButton=$(".dnnModuleDialog .search-container .search-button");$searchButton.on("click",$.proxy(this._getSearchModules,this));var $clearButton=$(".dnnModuleDialog .search-container .clear-button");$clearButton.on("click",$.proxy(this._resetModuleSearch,this));var $searchInput=$(".dnnModuleDialog .search-container .search-input");$searchInput.on("mouseup",function(){return!1}),$searchInput.on("keypress",$.proxy(this._searchKeyPress,this)),$searchInput.on("keyup",$.proxy(this._searchKeyUp,this)),$(window).on("beforeunload",$.proxy(this._windowBeforeUnload,this))},_closeButtonHandler:function(){this.getModuleManager().getHandler().click()},_handleKeyEvent:function(e){27==e.keyCode&&this._moduleManager.getHandler().click()},_doAddModule:function(e){var $item=$(e.target);$item=$item.hasClass("dnnModuleItem")?$item:$item.parents(".dnnModuleItem");var handler=this;if(!$item.data("modulejs"))return setTimeout(function(){handler._doAddModule(e)},500),!1;var moduleId=$item.data("moduleid");return!!moduleId&&(this.addModule(moduleId),!1)},_addModuleComplete:function(data,callback){Sys.WebForms.PageRequestManager.getInstance().add_endRequest(this._syncCompleteHandler),this._noFloat&&(this._setCookie("noFloat","true"),dnn.ContentEditorManager.triggerChangeOnPageContentEvent()),this.setModuleId(data.TabModuleID),this.refreshPane("","module-"+data.TabModuleID,callback,!0)},_bookmarkUpdated:function(data){},_saveBookmark:function(item,removeBookmark){var params={Title:"module",Bookmark:this._bookmarkedModuleList.join(",")};return this._getService().request("SaveBookmark","POST",params,$.proxy(this._bookmarkUpdated,this)),removeBookmark?($(item.parent()).parent().find("span.bookmarkholder a.button.bookmarkedModule").removeClass("bookmarkedModule").addClass("bookmarkModule").unbind("click"),$(item.parent()).parent().find("span.actions a.button.bookmarkedModule").removeClass("bookmarkedModule").addClass("bookmarkModule").bind("click")):($(item.parent()).parent().find("span.bookmarkholder a.button.bookmarkModule").removeClass("bookmarkModule").addClass("bookmarkedModule").bind("click"),$(item.parent()).parent().find("span.actions a.button.bookmarkModule").removeClass("bookmarkModule").addClass("bookmarkedModule").unbind("click")),!1},_addBookmarkModule:function(e){var moduleId=$(e.target).data("moduleid");return this._bookmarkedModuleList.indexOf(moduleId)<0&&this._bookmarkedModuleList.push(moduleId),this._saveBookmark($(e.target),!1),e.stopImmediatePropagation(),!1},_removeBookmarkModule:function(e){var moduleId=$(e.target).data("moduleid");if(84!=moduleId){var index=this._bookmarkedModuleList.indexOf(moduleId);index>=0&&this._bookmarkedModuleList.splice(index,1),this._saveBookmark($(e.target),!0),e.stopImmediatePropagation()}},_cancelAddModule:function(e){var target=$(e.target),moduleId=target.data("moduleid"),handler=this,opts={callbackTrue:function(){handler._getEditorService().request("DeleteModule","GET",{moduleId:moduleId},function(data){0!=data.Status&&$.dnnAlert({text:data.Message}),handler._resetPending(),handler.refreshPane("")})},text:dnn.ContentEditorManagerResources.cancelConfirm,yesText:dnn.ContentEditorManagerResources.confirmYes,noText:dnn.ContentEditorManagerResources.confirmNo,title:dnn.ContentEditorManagerResources.confirmTitle};return $.dnnConfirm(opts),!1},_processModuleForDrag:function(module){var handler=this,moduleId=this.getModuleManager()._findModuleId(module),relatedModules=[];$("div.DnnModule").each(function(){var id=handler.getModuleManager()._findModuleId($(this));id>moduleId&&($(this).hide(),$("#moduleActions-"+id).hide(),relatedModules.push(id))}),module.data("relatedModules",relatedModules),module.addClass("floating");var left,top,moduleWidth=module.outerWidth(),moduleHeight=module.outerHeight();left=$("#personaBar-iframe").outerWidth()/2+($(window).width()-moduleWidth)/2,top=$(window).height()/2-moduleHeight,module.css({left:left,top:top}),$("div.dnnDragHint").off("mouseenter").addClass("dnnDragDisabled");var $dragHint=module.find("> div.dnnDragHint").removeClass("dnnDragDisabled"),$dragContent=$("<div />");$dragHint.append($dragContent);var moduleItem=this.getElement().find('li[data-moduleid="'+this._addingDesktopModuleId+'"]');if(moduleItem.length>0){var $icon=moduleItem.find("span.icon"),$cloneIcon=$icon.clone();if($icon.css("background-image")&&"none"!=$icon.css("background-image")){var backImg=$icon.css("background-image").match(/^(url\()?(['"]?)(.+?)\2\)?$/)[3];$cloneIcon.find("img").attr("src",backImg)}$dragContent.append($cloneIcon),$dragContent.append(moduleItem.find("span.title").clone())}else{$dragHint.append($dragContent);var title=module.data("module-title");$('<span class="title" />').appendTo($dragContent).html(title)}if($('<a name="'+moduleId+'" href="#" class="cancel-module" data-moduleid="'+moduleId+'" />').appendTo($dragContent).click($.proxy(this._cancelAddModule,this)),module.hasClass("dragtip")){var dragTip=$('<div class="module-drag-tip"></div>');module.before(dragTip.css({opacity:0})),dragTip.html(dnn.ContentEditorManagerResources.dragtip).css({top:module.offset().top-$(document).scrollTop()-dragTip.outerHeight()-28,left:module.offset().left-$(document).scrollLeft()+25,width:module.outerWidth()-50}),dragTip.animate({top:"+=10",opacity:1},200)}module.addClass("drift").mouseover(function(){module.removeClass("drift")}).mouseout(function(){module.addClass("drift")}),this._setPending("module-"+moduleId)},_syncComplete:function(sender,args){if(null!=args.get_error())return args.set_errorHandled(!0),void location.reload();Sys.WebForms.PageRequestManager.getInstance().remove_endRequest(this._syncCompleteHandler);var handler=this;setTimeout(function(){handler._syncCompleteFunc()},25)},_syncCompleteFunc:function(){var moduleId=this.getModuleId(),handler=this,newModule=$("div.DnnModule-"+moduleId);if(this._noFloat){newModule.addClass("highlight"),setTimeout(function(){newModule.addClass("animate")},500),setTimeout(function(){newModule.removeClass("highlight animate")},1e3);var moduleTop=newModule.offset().top-80;moduleTop>0&&$("html, body").animate({scrollTop:moduleTop},500),setTimeout(function(){"undefined"==typeof window.dnnLoadScriptsInAjaxMode||0==window.dnnLoadScriptsInAjaxMode.length?newModule.trigger("editmodule"):$(window).one("dnnScriptLoadComplete",function(){newModule.trigger("editmodule")})},300),this.setModuleId(-1)}else setTimeout(function(){handler._processModuleForDrag(newModule)},150);this.getElement().trigger("addmodulecomplete",[newModule]),this._motionToNewModule(moduleId),setTimeout(function(){handler._noFloat||$("#moduleActions-"+moduleId).addClass("floating"),handler._noFloat=!1,handler._removeCookie("noFloat"),dnn&&dnn.ContentEditorManager&&"function"==typeof dnn.ContentEditorManager.catchSortEvents&&dnn.ContentEditorManager.catchSortEvents()},250),this._working=!1},_motionToNewModule:function(moduleId){var $listItem=this.getElement().find('li[data-moduleid="'+this._addingDesktopModuleId+'"]');0==$listItem.length&&($listItem=this.getModuleManager().getHandler());var $newModule=$("div.DnnModule-"+moduleId),$motion=$('<div class="module-motion" />').hide().css({width:$listItem.width(),height:$listItem.height(),left:$listItem.offset().left,top:$listItem.offset().top}).appendTo($(document.body));this.close(function(){$motion.show().animate({width:$newModule.width(),height:$newModule.height(),left:$newModule.offset().left,top:$newModule.offset().top},"fast",function(){$motion.remove()})})},_layoutResized:function(e){this.isOpen()&&this._calcPosition(this._moduleManager.getHandler())},_replaceAll:function(input,find,replace){var str=input;str+="";for(var indexOfMatch=str.indexOf(find);indexOfMatch!=-1;)str=str.replace(find,replace),indexOfMatch=str.indexOf(find);return str},_getService:function(){return this._serviceController||(this._serviceController=new dnn.dnnModuleService({service:"internalservices",controller:"controlbar"})),this._serviceController},_getEditorService:function(){return this._editorServiceController||(this._editorServiceController=new dnn.dnnModuleService({service:"EvoqContentLibrary",controller:"ContentEditor"})),this._editorServiceController},_setPending:function(data){this._pending=!0,$(".actionMenu").addClass("floating"),this._setCookie("cem_pending",data)},_resetPending:function(){this._pending=!1,$(".actionMenu").removeClass("floating"),this._removeCookie("cem_pending")},_windowBeforeUnload:function(){if(this._pending)return dnn.ContentEditorManagerResources.pendingsave},_getCookie:function(name){return dnn.dom?dnn.dom.getCookie(name):""},_setCookie:function(name,value){dnn.dom&&dnn.dom.setCookie(name,value,0,this.getSiteRoot())},_removeCookie:function(name){dnn.dom.setCookie(name,"",-1,this.getSiteRoot())}},dnnModuleDialog.defaultOptions={}}(jQuery);