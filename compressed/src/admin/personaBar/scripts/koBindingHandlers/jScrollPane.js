define(["jquery","knockout"],function($,ko){"use strict";var init=function(element,valueAccessor){var o=valueAccessor()||{},options=o.jScrollPaneOptions||{},parentHeightOptions=o.parentHeightOptions,parentScrollSettings=o.parentScrollSettings,additionalStyles=o.additionalStyles;setTimeout(function(){$(element).jScrollPane(options),0===options.mouseWheelSpeed&&($(".jspPane",element).unmousewheel(),$(".jspPane",element).bind("mousewheel",function(event,delta){if(parentScrollSettings){var scrollOffset=15,parentScroll=$(parentScrollSettings.selector).data("jsp");delta<0?parentScroll.scrollByY(scrollOffset):parentScroll.scrollByY(-1*scrollOffset)}return!1}))},0);var reinit=function(){var parentHeight,height,correction;parentHeightOptions&&(parentHeight=$(element).parent().height(),correction=parentHeightOptions.heightCorrection?parentHeightOptions.heightCorrection:0,height=parentHeight+correction,$(element).height(height<=0?parentHeight:height));var scroll=$(element).data("jsp");scroll&&scroll.reinitialise(),setTimeout(function(){if(additionalStyles){var h=$(element).find(".jspDrag");h.length>0&&$(element).addClass(additionalStyles.whenScrollsClass)}},0)};reinit(),$(window).resize(reinit),o.observableElement&&o.observableElement.subscribe(function(value){value&&setTimeout(reinit,0)})};ko.bindingHandlers.jScrollPane={init:init}});