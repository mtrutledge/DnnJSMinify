﻿
window.dnn=dnn||{};window.dnn.modules=dnn.modules||{};window.dnn.modules.publisher=dnn.modules.publisher||{};window.dnn.modules.publisher.EditBarManager=(function($,ko){"use strict";var config,publishingManager;var togglePanel,hidePanels;var viewModel={toggleSettingsPanel:function(){togglePanel("settings",dnn.modules.publisher.SettingsManager.show);},toggleUnpublishedPostsPanel:function(){togglePanel("unpublished-posts",dnn.modules.publisher.UnpublishedPostsManager.show);},deletePost:function(){dnn.modules.publisher.EditPostManager.deletePost();},toggleEditPostDetailPanel:function(){togglePanel("edit-post-details",dnn.modules.publisher.EditPostDetailsManager.show);},toggleChangeAuthorPanel:function(){togglePanel("change-author",dnn.modules.publisher.ChangeAuthorManager.show);}};hidePanels=function(){var $wrapper=$(config.bindingElementSelector);$wrapper.find("div.edit-bar-panel.expanded").removeClass("expanded");};togglePanel=function(panel,show){var $wrapper=$(config.bindingElementSelector);var expanded=$wrapper.find("div.edit-bar-panel.expanded");if(expanded.length===0){$wrapper.find("div.edit-bar-panel."+panel).addClass("expanded");show();}else{if(expanded.is("."+panel)){expanded.removeClass("expanded");}else{expanded.removeClass("expanded").on("transitionend",function(){$(this).off("transitionend");$wrapper.find("div.edit-bar-panel."+panel).addClass("expanded");show();});}}};function init(configuration){config=configuration;publishingManager=dnn.modules.publisher.PublishingManager;viewModel.publishingModel=publishingManager.getViewModel();var viewModelBinding=$(config.bindingElementSelector+' div#edit-bar');ko.applyBindings(viewModel,viewModelBinding[0]);}
return{init:init,hidePanels:hidePanels};})(jQuery||$,ko);