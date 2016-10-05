var HcAffiliate=function(data){var self=this;self.id=ko.observable(data.Id),self.userid=ko.observable(data.UserId),self.username=ko.observable(data.Username),self.email=ko.observable(data.Email),self.password=ko.observable(data.Password),self.confirmPassword=ko.observable(data.ConfirmPassword),self.firstname=ko.observable(data.FirstName),self.lastname=ko.observable(data.LastName),self.myaffiliateid=ko.observable(data.MyAffiliateId),self.referralaffiliateid=ko.observable(data.ReferralAffiliateId),self.allowReferral=ko.observable(data.AllowReferral),self.confirmterms=ko.observable(!1),self.countryid=ko.observable(data.CountryId),self.addressline=ko.observable(data.AddressLine),self.city=ko.observable(data.City),self.company=ko.observable(data.Company),self.state=ko.observable(data.State),self.postalcode=ko.observable(data.PostalCode),self.phone=ko.observable(data.Phone),self.regions=ko.observableArray(data.Regions),self.approved=ko.observable(data.Approved)},HcAffiliateProfileViewModel=function(model,$form,res){var self=this;self.model=model,self.message={status:ko.observable("OK"),show:ko.observable(!1),text:ko.observable("")},self.model.referralaffiliateid.subscribe(function(){void 0!=self.model.referralaffiliateid()&&self.model.referralaffiliateid().length>0?self.changeReferralAffiliateId():self.message.show(!1)}),self.update=function(){hcc.formIsValid($form)&&($form.ajaxLoader("start"),$.ajax(hcc.getServiceUrl("AffiliateDashboard/Update"),{data:ko.toJSON(self.model),contentType:"application/json",type:"post"}).done(function(res){self.showMessage(res.Message,res.Status)}).fail(function(){}).always(function(){$form.ajaxLoader("stop")}))},self.changeCountry=function(){$form.ajaxLoader("start"),$.post(hcc.getServiceUrl("AffiliateDashboard/GetRegions"),{countryId:self.model.countryid()},null,"json").done(function(res){self.model.regions.removeAll(),$.each(res,function(i,el){self.model.regions.push(el)})}).fail(function(){}).always(function(){$form.ajaxLoader("stop")})},self.changeReferralAffiliateId=function(){$form.ajaxLoader("start"),$.post(hcc.getServiceUrl("AffiliateRegistration/IsAffiliateValid"),{affiliateId:self.model.referralaffiliateid()},null,"json").done(function(data){data?self.message.show(!1):self.showMessage(res.ValMessage_ReferralAffiliateIDInvalid,"Failed")}).fail(function(){}).always(function(){$form.ajaxLoader("stop")})},self.showMessage=function(message,status){self.message.status(status),self.message.text(message),self.message.show(!0),$("body").scrollTo(".hcValidationSummary")};var init=function(){};init()},HcBaseAffiliateDashboardReport=function(data,$form,res){var self=this;self.totalCount=ko.observable(data.TotalCount),self.totalAmount=ko.observable(data.TotalAmount),self.loadPage=function(pageNumber,pageSize){$form.ajaxLoader("start"),$.post(hcc.getServiceUrl("AffiliateDashboard/"+self.getReportName()),self.getPageParameters(pageNumber,pageSize),null,"json").done(function(res){self.loadPageData(res)}).fail(function(){}).always(function(){$form.ajaxLoader("stop")})},self.pager=new HcPager({total:data.TotalCount,pageSize:5,pageNumber:1,pagerSize:5},self.loadPage),ko.bindingHandlers.dateText={update:function(element,valueAccessor,allBindingsAccessor,viewModel){var value=valueAccessor(),d=ko.utils.unwrapObservable(value);"string"==typeof d&&(d=new Date(Date.parse(d))),$(element).text(d.toLocaleDateString("en-us")+" "+d.toLocaleTimeString("en-us"))}}},HcBaseAffiliateDashboardDateReport=function(data,$form,res){var self=this;self.dateRangesList=ko.observable(res.timeRangesLocalized),self.dateRange=ko.observable(10),self._prevDateRange=ko.observable(10),self.dateRange.subscribe(function(val){self._prevDateRange()!=val&&(1!=self.pager.pageNumber()?self.pager.pageNumber(1):self.loadPage(1,5),self._prevDateRange(val))}),self.getPageParameters=function(pageNumber,pageSize){return{pageSize:pageSize,pageNumber:pageNumber,dateRange:self.dateRange()}},HcBaseAffiliateDashboardReport.call(self,data,$form,res)},HcAffiliateOrders=function(data,$form,res){var self=this;self.orders=ko.observableArray(data.Orders),self.loadPageData=function(resp){self.orders.removeAll(),$.each(resp.Orders,function(i,el){self.orders.push(el)}),self.pager.total(resp.TotalCount),self.totalCount(resp.TotalCount),self.totalAmount(resp.TotalAmount)},self.getReportName=function(){return"GetOrdersReport"},HcBaseAffiliateDashboardDateReport.call(self,data,$form,res)},HcAffiliatePayments=function(data,$form,res){var self=this;self.payments=ko.observableArray(data.Payments),self.loadPageData=function(resp){self.payments.removeAll(),$.each(resp.Payments,function(i,el){self.payments.push(el)}),self.pager.total(resp.TotalCount),self.totalCount(resp.TotalCount),self.totalAmount(resp.TotalAmount)},self.getReportName=function(){return"GetPaymentsReport"},HcBaseAffiliateDashboardDateReport.call(self,data,$form,res)},HcAffiliateReferrals=function(data,$form,res){var self=this;self._prevSearchText=ko.observable(),self._prevSearchBy=ko.observable(""),self.searchBy=ko.observable(),self.searchText=ko.observable(""),self.referrals=ko.observableArray(data.Referrals),self.loadPageData=function(resp){self.referrals.removeAll(),$.each(resp.Referrals,function(i,el){self.referrals.push(el)}),self.pager.total(resp.TotalCount),self.totalCount(resp.TotalCount),self.totalAmount(resp.TotalAmount)},self.getReportName=function(){return"GetReferralsReport"},self.search=function(){1!=self.pager.pageNumber()?self.pager.pageNumber(1):self.loadPage(1,5)},self.getPageParameters=function(pageNumber,pageSize){return{searchText:self.searchText(),searchBy:self.searchBy(),pageNumber:pageNumber,pageSize:pageSize}},HcBaseAffiliateDashboardReport.call(self,data,$form,res)},HcUrlBuilderViewModel=function(data,$form,res){var self=this;self.mode=ko.observable(),self.linkTo=ko.observable(),self.categories=ko.observableArray(data.Categories),self.products=ko.observableArray(),self.categoryId=ko.observable(),self.productId=ko.observable(),self.textUrl=ko.observable("http://"+document.domain+hcc.getSiteRoot()),self.generatedUrl=ko.observable(),self.changeMode=function(){"Product"==self.mode()?getProducts():"Category"==self.mode()||("Website"==self.mode()?self.textUrl("http://"+document.domain+hcc.getSiteRoot()):"Registration"==self.mode()&&self.textUrl(data.RegistrationUrl))},self.changeCategory=function(){"Product"==self.mode()&&getProducts()},self.generate=function(){var id="";id="Category"==self.mode()?self.categoryId():"Product"==self.mode()?self.productId():self.textUrl(),$form.ajaxLoader("start"),$.post(hcc.getServiceUrl("AffiliateDashboard/GenerateUrl"),{id:id,mode:self.mode()},null,"json").done(function(res){self.generatedUrl(res)}).fail(function(){}).always(function(){$form.ajaxLoader("stop")}),0==$(".zclip").length&&$("#hcCopyToClipboard").zclip({path:hcc.getResourceUrl("Scripts/ZeroClipboard.swf"),copy:function(){return $("#hcCopySource").val()}})};var getProducts=function(){$.post(hcc.getServiceUrl("AffiliateDashboard/GetProducts"),{categoryId:self.categoryId()},null,"json").done(function(res){self.products.removeAll(),$.each(res,function(i,el){self.products.push(el)})}).fail(function(){}).always(function(){$form.ajaxLoader("stop")})};ko.bindingHandlers.hasSelection={update:function(element,valueAccessor,allBindings){1==valueAccessor()&&$(element).select()}}};$(function(){$("#hcAffiliateTabs").dnnTabs()});