define(["jquery","knockout"],function($,ko){"use strict";ko.bindingHandlers.slideToggleVisible={init:function(element,valueAccessor){var value=valueAccessor();ko.unwrap(value)?$(element).show():$(element).hide()},update:function(element,valueAccessor){var value=valueAccessor();ko.unwrap(value)?$(element).slideDown():$(element).slideUp()}}});