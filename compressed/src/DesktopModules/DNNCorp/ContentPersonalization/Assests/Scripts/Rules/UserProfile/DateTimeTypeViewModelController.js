window.dnn=dnn||{},window.dnn.personalizedTabs=dnn.personalizedTabs||{},window.dnn.personalizedTabs.rules=dnn.personalizedTabs.rules||{},window.dnn.personalizedTabs.rules.userProfile=dnn.personalizedTabs.rules.userProfile||{},function(){var DateTimeTypeViewModelControllerClass;DateTimeTypeViewModelControllerClass=function(){"use strict";function DateTimeTypeViewModelController(){}DateTimeTypeViewModelController.class="DateTimeTypeViewModelController",DateTimeTypeViewModelController.type="Class";var formatDate;return formatDate=function(date){if(null===date)return"";var format="MM/DD/YYYY";return moment(date).format(format)},DateTimeTypeViewModelController.getViewModel=function(propertyId,ruleId,_resx){var _viewModel=new function(){var self=this;self.ruleId="li-"+ruleId,self.calendarId="calendar-"+ruleId,self.resx=_resx,self.selectedDate=ko.observable(null),self.tempDate=ko.observable(),self.topPosition=ko.observable("40px"),self.dateCalendarVisible=ko.observable(!1),self.currentDate=ko.observable(!1),self.tempCurrentDate=ko.observable(!1),self.showDatePicker=function(){self.currentDate()||self.tempDate(self.selectedDate());var $rulePopsition=$("#"+self.ruleId).position(),calendarHeight=309,calendarTop=parseInt($rulePopsition.top)-calendarHeight;self.topPosition(calendarTop.toString()+"px"),self.dateCalendarVisible(!0)},self.currentDateDatePicker=function(){self.tempCurrentDate(!self.tempCurrentDate());var $calendarOption=$("#"+self.calendarId+" .calOption");$calendarOption.toggleClass("is-selected",self.tempCurrentDate()),self.tempCurrentDate()&&self.tempDate(null)},self.cancelDatePicker=function(){self.dateCalendarVisible(!1)},self.applySelectedDate=function(){if(self.currentDate(self.tempCurrentDate()),!self.tempCurrentDate()){var date=new Date(self.tempDate());self.selectedDate(date)}self.dateCalendarVisible(!1)},self.clearSelectedDate=function(){self.dateCalendarVisible(!1),self.selectedDate(null)},self.formattedSelectedDate=ko.computed(function(){return self.currentDate()?"[CURRENTDAY]":formatDate(self.selectedDate())})};return _viewModel.tempDate.subscribe(function(tempDateValue){null!=tempDateValue&&_viewModel.tempCurrentDate(!1)}),_viewModel},DateTimeTypeViewModelController.getViewModelValidation=function(viewModel){return{}},DateTimeTypeViewModelController.fillViewModel=function(propertyId,ruleId,_resx,matchData){var viewModel=DateTimeTypeViewModelController.getViewModel(propertyId,ruleId,_resx);return"[CURRENTDAY]"===matchData.PropertyInfo.MatchValue?(viewModel.tempCurrentDate(!0),viewModel.currentDate(viewModel.tempCurrentDate()),viewModel):isNaN(new Date(matchData.PropertyInfo.MatchValue).getTime())?viewModel:(viewModel.selectedDate(matchData.PropertyInfo.MatchValue),viewModel)},DateTimeTypeViewModelController.fillData=function(matchValue){return matchValue.formattedSelectedDate()},DateTimeTypeViewModelController}(),window.dnn.personalizedTabs.rules.userProfile.DateTimeTypeViewModelController=DateTimeTypeViewModelControllerClass}.call(this);