"use strict";!function(){var v=function(){var d=function(s){return decodeURIComponent(s.replace(/\+/g," "))},q=location.search.substring(1),k=q.split("&");for(var i in k){var l=k[i].split("=");if(l.length>1&&"cdv"===d(l[0]))return d(l[1])}return""}(),debugMode=window.top.dnn&&"true"===window.top.dnn.getVar("pb_debugMode");requirejs.config({baseUrl:"scripts/contrib/",paths:{templatePath:"../../",cssPath:"../../css/"},urlArgs:(v?"cdv="+v:"")+(debugMode?"&t="+Math.random():""),shim:{"jquery.hoverintent.min":["jquery"],"owl-carousel/owl.carousel":["jquery"],"jquery.qatooltip":["jquery.hoverintent.min"]},map:{"*":{"dnn.jquery":["../../../../Resources/Shared/Scripts/dnn.jquery"],"dnn.jquery.extensions":["../../../../Resources/Shared/Scripts/dnn.jquery.extensions"],"dnn.extensions":["../../../../Resources/Shared/scripts/dnn.extensions"],"jquery.tokeninput":["../../../../Resources/Shared/components/Tokeninput/jquery.tokeninput"],"dnn.jScrollBar":["../../../../Resources/Shared/scripts/jquery/dnn.jScrollBar"],"dnn.servicesframework":["../../../../js/dnn.servicesframework"],"dnn.DataStructures":["../../../../Resources/Shared/scripts/dnn.DataStructures"],"jquery.mousewheel":["../../../../Resources/Shared/scripts/jquery/jquery.mousewheel"],"dnn.TreeView":["../../../../Resources/Shared/scripts/TreeView/dnn.TreeView"],"dnn.DynamicTreeView":["../../../../Resources/Shared/scripts/TreeView/dnn.DynamicTreeView"],"dnn.DropDownList":["../../../../Resources/Shared/Components/DropDownList/dnn.DropDownList"],"css.DropDownList":["css!../../../../Resources/Shared/components/DropDownList/dnn.DropDownList.css"],"css.jScrollBar":["css!../../../../Resources/Shared/scripts/jquery/dnn.jScrollBar.css"]}}}),requirejs.onError=function(err){if("timeout"!==err.requireType)throw err;console.log(err),location.reload()}}(),require(["jquery","knockout","moment","../util","../sf","../config","../persistent","domReady!","owl-carousel/owl.carousel"],function($,ko,moment,ut,sf,cf,persistent){var iframe=window.parent.document.getElementById("personaBar-mobi-iframe");if(iframe){var $iframeContainer=$(iframe.parentNode),$parentWindow=$(window.parent),parentHtml=window.parent.document.documentElement,config=cf.init(),utility=ut.init(config),inAnimation=!1,rootPath=location.protocol+"//"+location.host+(location.port?":"+location.port:"");"/"==rootPath.substr(rootPath.length-1,1)&&(rootPath=rootPath.substr(0,rootPath.length-1)),window.requirejs.config({paths:{rootPath:rootPath}});var util={sf:sf.init(config.siteRoot,config.tabId,config.antiForgeryToken,"#personaBar-loadingbar"),persistent:persistent.init(config,sf),moment:moment,closePersonaBar:function(callback){viewSite(),"function"==typeof callback&&callback()},loadPanel:function(panelId,name,params){var wrapper=$(panelId);$("#toggle").parent().removeClass("expanded");var self=this;$("#nav-menu").slideUp(200,function(){$(".socialpanel").hide(),$(panelId).slideDown(200,function(){var template=wrapper.data("template");self.loadMobileTemplate(template,wrapper,params),$("#breadcrumb").html(name),inAnimation=!1,navMenuVisible=!1,panelVisible=!0})})},loadModuleDashboard:function(moduleName){var self=this;self.loadPanel("#social-dashboard-panel",moduleName,{moduleName:moduleName})}};util=$.extend(util,utility);var collapseIframe=function(){$iframeContainer.css("bottom","auto"),$iframeContainer.height("auto");var height=$("#header-mobi").outerHeight();iframe.style.height=height+"px",$(parentHtml).css("overflow-y","auto"),$(window.parent.document.body).css({"overflow-y":"auto","margin-top":height})},expandIframe=function(){$iframeContainer.css("bottom",0),$iframeContainer.height($parentWindow.height()),iframe.style.height="100%",$(parentHtml).css("overflow-y","hidden"),$(window.parent.document.body).css({"overflow-y":"hidden","margin-top":"0"})};$parentWindow.resize(function(){$iframeContainer.height($parentWindow[0].innerHeight)});var navMenuVisible=!1,panelVisible=!1;$("#toggle").click(function(e){e.preventDefault(),inAnimation||(inAnimation=!0,navMenuVisible?$("#nav-menu").slideUp(200,function(){panelVisible||collapseIframe(),inAnimation=!1,navMenuVisible=!1,$("#toggle").parent().removeClass("expanded")}):(expandIframe(),$("div.body")[0].scrollTop=0,$("#toggle").parent().addClass("expanded"),$("#nav-menu").slideDown(200,function(){inAnimation=!1,navMenuVisible=!0})))});for(var viewSite=function(){$(".socialpanel").slideUp(200,function(){$("#breadcrumb").html(""),$("#nav-menu").slideUp(200,function(){inAnimation=!1,navMenuVisible=!1,panelVisible=!1,$("#toggle").parent().removeClass("expanded"),collapseIframe()})})},selectMenu=function($li){$("#nav-menu > ul li.selected").removeClass("selected"),$li.addClass("selected")},javascriptMainModuleNames=config.javascriptMainModuleNames.split(","),i=0;i<javascriptMainModuleNames.length;i++)if(javascriptMainModuleNames[i]){var name=javascriptMainModuleNames[i]+".mobi",moduleName="../"+name,moduleCss="css!cssPath"+name+".css";require([moduleName,moduleCss],function(mainModule){if(mainModule)if("object"==typeof mainModule)mainModule.init(util);else if("function"==typeof mainModule)switch(mainModule.type){case"Class":new mainModule(util);break;case"Static Class":mainModule.init(util)}})}config.hasValidLicenseOrTrial?($("#nav-menu > ul > li > div.arrow").click(function(e){e.stopPropagation(),$(this).parent().toggleClass("expanded")}),$("#nav-menu > ul > li").click(function(e){if(e.preventDefault(),"btn-logout"==$(this).attr("id")){var onLogOffSuccess=function(){viewSite(),window.top.document.location.href=window.top.document.location.href};return void util.sf.rawCall("GET",config.logOff,null,onLogOffSuccess)}if(!inAnimation){if(inAnimation=!0,"btn-viewsite"==$(this).attr("id"))return void viewSite();var panelId=$(this).data("panel-id");if(panelId){selectMenu($(this));var name=$(panelId).data("name");util.loadPanel(panelId,name)}}}),$("#nav-menu > ul > li > ul.submenu > li").click(function(e){e.stopPropagation(),selectMenu($(this).parent().parent()),$(this).addClass("selected");var panelId=$(this).data("panel-id"),name=$(this).data("module-name"),params=name?{moduleName:name}:{};name=name?name:$(panelId).data("name"),util.loadPanel(panelId,name,params)}),$(window).on("total-tasks-changed",function(event,totalTasks){totalTasks>0?$("#nav-menu span.total-tasks").show().text(totalTasks):$("#nav-menu span.total-tasks").hide()}),util.loadTemplate("tasks",$("#tasks-panel"))):$("#nav-menu > ul > li > ul.submenu > li, #nav-menu > ul > li").addClass("disabled"),$iframeContainer.css({position:"fixed",top:0,bottom:0,left:0,right:0,"z-index":99999}),collapseIframe(),util.loadResx(function(){ko.applyBindings(util.resx.PersonaBar,document.getElementById("nav-menu"))})}});