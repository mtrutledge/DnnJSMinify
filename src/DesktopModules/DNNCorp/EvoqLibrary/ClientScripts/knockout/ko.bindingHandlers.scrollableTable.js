﻿
(function($,ko){var init=function(element,valueAccessor){var $table=$(element),$tbody,colWidth;$tbody=$table.find('tbody');$tbody.css('display','block')
$tbody.css('overflow-y','auto');$tbody.css('overflow-x','hidden');$table.find('thead').css('display','block');$(window).resize(function(){colWidth=$table.find('tbody tr:first').children().map(function(){return $(this).width();}).get();$table.find('thead tr').children().each(function(i,v){$(v).width(colWidth[i]);});}).resize();}
ko.bindingHandlers.scrollableTable={init:init,};}(jQuery||$,ko));