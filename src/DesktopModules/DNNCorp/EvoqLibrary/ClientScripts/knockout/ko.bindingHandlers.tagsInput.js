﻿
ko.bindingHandlers.tagsInput={init:function(element,valueAccessor,allBindingsAccessor){var settings=allBindingsAccessor().settings||{};$(element).dnnTagsInput({width:settings.width||'100%',minInputWidth:settings.minInputWidth||'100%',defaultText:settings.placeholder||'',onAddTag:function(){valueAccessor()($(element).val());},onRemoveTag:function(){valueAccessor()($(element).val());}});},update:function(element,valueAccessor){var value=ko.unwrap(valueAccessor());if($(element).val()!==value){$(element).dnnImportTags(!value?'':value);}}};