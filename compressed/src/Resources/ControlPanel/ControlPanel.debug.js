!function($){$.fn.dnnControlPanel=function(options){var opts=$.extend({},$.fn.dnnControlPanel.defaultOptions,options),$wrap=this;return $wrap.each(function(){function EnableHide(){forceShow||(canHide=!0)}function megaHoverOver(){hideAll();var menuSelector=$(this).parent().find(opts.menuBorderSelector);if(!$.support.cssFloat&&0==menuSelector.prev("iframe").length){var mask=$('<iframe frameborder="0"></iframe>');menuSelector.before(mask),mask.css({position:"absolute",width:menuSelector.outerWidth()+"px",height:menuSelector.outerHeight()+"px",left:menuSelector.position().left+"px",top:menuSelector.position().top+"px",opacity:0})}menuSelector.stop().fadeTo("fast",1).show()}function hideAll(){$controlPanel.find(opts.menuBorderSelector).stop().fadeTo("fast",0,function(){$.support.cssFloat||$(this).prev("iframe").remove(),$(this).hide()})}var $controlPanel=$(this);$controlPanel.wrap(function(){return opts.wrappingHtml}),$('[id$="CommonTasksPanel"]').length>0?$('[id$="CommonTasksPanel"]').detach().appendTo("#dnnCommonTasks .megaborder"):$("#dnnCommonTasks").remove(),$('[id$="CurrentPagePanel"]').detach().appendTo("#dnnCurrentPage .megaborder"),$('[id$="AdminPanel"]').length>0?$('[id$="AdminPanel"]').detach().appendTo("#dnnOtherTools .megaborder"):$("#dnnOtherTools").remove();var $wrapper=$("#dnnCPWrap");$wrapper.hasClass("Pinned")?$wrapper.parent().css({paddingBottom:"0"}):$(document.body).css({marginTop:$wrapper.outerHeight()}),$.fn.dnnControlPanel.show=function(){$controlPanel.parents(opts.controlPanelWrapper).slideDown()},$.fn.dnnControlPanel.hide=function(){$controlPanel.parents(opts.controlPanelWrapper).slideUp()};var canHide=!1,forceShow=!1,$controlPanel=$(this),config={sensitivity:2,interval:200,over:megaHoverOver,timeout:100,out:function(){return null}},hideConfig={sensitivity:2,interval:1,over:function(){},timeout:300,out:function(){canHide&&hideAll()}};$controlPanel.find(opts.menuBorderSelector).css({opacity:"0"}),$controlPanel.find(opts.menuBorderSelector).find(opts.primaryActionSelector).css({opacity:1}),$controlPanel.find(opts.menuItemSelector).mouseenter(EnableHide),$(document).dblclick(function(){canHide||hideAll()}),$controlPanel.dblclick(function(e){e.stopPropagation()}),$(document).keyup(function(e){27==e.keyCode&&hideAll()}),$controlPanel.find(opts.menuItemActionSelector).hoverIntent(config),$controlPanel.find(opts.menuItemSelector).hoverIntent(hideConfig),$controlPanel.find(opts.enableAutohideOnFocusSelector).focus(function(){canHide=!0}),$controlPanel.on("mouseover",opts.persistOnMouseoverSelector,function(){canHide=!1}),$controlPanel.on("click",opts.persistOnWaitForChangeSelector,function(){forceShow=!0,canHide=!1,setTimeout(function(){$(document).one("click",function(){forceShow=!1,canHide=!0})},0)}),$controlPanel.on("focus",opts.persistOnFocusSelector,function(){canHide=!1})})},$.fn.dnnControlPanel.defaultOptions={wrappingHtml:'<div id="dnnCPWrap"><div id="dnnCPWrapLeft"><div id="dnnCPWrapRight"></div></div></div>',persistOnFocusSelector:"select, input",persistOnMouseoverSelector:".rcbSlide li",persistOnWaitForChangeSelector:".RadComboBox",enableAutohideOnFocusSelector:".dnnadminmega .megaborder",menuItemActionSelector:".dnnadminmega > li > a",menuItemSelector:".dnnadminmega > li",menuBorderSelector:".megaborder",primaryActionSelector:".dnnPrimaryAction",controlPanelWrapper:"#dnnCPWrap"},$(document).ready(function(){$(".dnnControlPanel").dnnControlPanel()})}(jQuery);