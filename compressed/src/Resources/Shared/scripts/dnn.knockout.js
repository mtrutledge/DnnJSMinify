ko.bindingHandlers.dnnDatePicker={init:function(element,valueAccessor){Sys.Application.add_load(function(){var picker=$find(element.id.replace("_wrapper",""));if(picker){var value=ko.utils.unwrapObservable(valueAccessor());picker.set_selectedDate(value),picker.add_dateSelected(function(sender,e){var date=e.get_newDate(),observable=valueAccessor();0!==observable().compare(date)&&observable(date)})}})},update:function(element,valueAccessor){var picker=$find(element.id.replace("_wrapper","")),value=ko.utils.unwrapObservable(valueAccessor());picker&&picker.set_selectedDate(value)}};