﻿
﻿
window.dnn=dnn||{};window.dnn.personalizedTabs=dnn.personalizedTabs||{};window.dnn.personalizedTabs.rules=dnn.personalizedTabs.rules||{};window.dnn.personalizedTabs.rules.userProfile=dnn.personalizedTabs.rules.userProfile||{};(function IIFE(){var DateTimeTypeViewModelControllerClass;DateTimeTypeViewModelControllerClass=(function IIFE(){'use strict';DateTimeTypeViewModelController.class='DateTimeTypeViewModelController';DateTimeTypeViewModelController.type='Class';var formatDate;function DateTimeTypeViewModelController(){}
formatDate=function(date){if(date===null)return"";var format="MM/DD/YYYY";return moment(date).format(format);};DateTimeTypeViewModelController.getViewModel=function(propertyId,ruleId,_resx){var _viewModel=new(function(){var self=this;self.ruleId="li-"+ruleId;self.calendarId="calendar-"+ruleId;self.resx=_resx;self.selectedDate=ko.observable(null);self.tempDate=ko.observable();self.topPosition=ko.observable("40px");self.dateCalendarVisible=ko.observable(false);self.currentDate=ko.observable(false);self.tempCurrentDate=ko.observable(false);self.showDatePicker=function(){if(!self.currentDate()){self.tempDate(self.selectedDate());}
var $rulePopsition=$("#"+self.ruleId).position();var calendarHeight=309;var calendarTop=parseInt($rulePopsition.top)-calendarHeight;self.topPosition(calendarTop.toString()+"px");self.dateCalendarVisible(true);};self.currentDateDatePicker=function(){self.tempCurrentDate(!self.tempCurrentDate());var $calendarOption=$("#"+self.calendarId+" .calOption");$calendarOption.toggleClass("is-selected",self.tempCurrentDate());if(self.tempCurrentDate()){self.tempDate(null);}}
self.cancelDatePicker=function(){self.dateCalendarVisible(false);};self.applySelectedDate=function(){self.currentDate(self.tempCurrentDate());if(!self.tempCurrentDate()){var date=new Date(self.tempDate());self.selectedDate(date);}
self.dateCalendarVisible(false);};self.clearSelectedDate=function(){self.dateCalendarVisible(false);self.selectedDate(null);};self.formattedSelectedDate=ko.computed(function(){if(self.currentDate()){return"[CURRENTDAY]";}
return formatDate(self.selectedDate());});})();_viewModel.tempDate.subscribe(function onTempDateChanged(tempDateValue){if(tempDateValue!=null){_viewModel.tempCurrentDate(false);}});return _viewModel;};DateTimeTypeViewModelController.getViewModelValidation=function(viewModel){return{}};DateTimeTypeViewModelController.fillViewModel=function(propertyId,ruleId,_resx,matchData){var viewModel=DateTimeTypeViewModelController.getViewModel(propertyId,ruleId,_resx);if(matchData.PropertyInfo.MatchValue==='[CURRENTDAY]'){viewModel.tempCurrentDate(true);viewModel.currentDate(viewModel.tempCurrentDate());return viewModel;}
if(isNaN((new Date(matchData.PropertyInfo.MatchValue)).getTime())){return viewModel;}
viewModel.selectedDate(matchData.PropertyInfo.MatchValue);return viewModel;};DateTimeTypeViewModelController.fillData=function(matchValue){return matchValue.formattedSelectedDate();};return DateTimeTypeViewModelController;})();window.dnn.personalizedTabs.rules.userProfile.DateTimeTypeViewModelController=DateTimeTypeViewModelControllerClass;}).call(this);