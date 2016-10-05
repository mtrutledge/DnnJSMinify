!function($){window.SubscriptionsViewModel=function(ko,settings,root){var self=this;this.isLoading=ko.observable(!1),this.results=ko.observableArray([]),this.localizer=function(){return root.localizationController},this.search=function(){var startSearch=function(){self.isLoading(!0)},finishSearch=function(){self.isLoading(!1)},success=function(model){self.results(model.Results),self.totalCount(model.TotalResults||0),finishSearch()},failure=function(xhr,status){(status||new String).length>0&&$.dnnAlert({title:localizer.getString("SearchErrorTitle"),text:localizer.getString("SearchError")+": "+(status||"Unknown error")}),self.results([]),self.totalResults(0),finishSearch()};startSearch();var searchParameters={pageIndex:self.currentPage(),pageSize:self.pageSize(),sortExpression:self.sortedByColumnName()+" "+self.sortedByOrder()};root.requestService("Subscriptions/GetSubscriptions","get",searchParameters,success,failure,self.loading)},this.sortedByColumnName=ko.observable(""),this.sortedByOrder=ko.observable(""),this.currentPage=ko.observable(10),this.sortColumn=function(columnName){var sort="";self.sortedByColumnName()==columnName?("asc"==self.sortedByOrder()&&(sort="desc"),""==self.sortedByOrder()&&(sort="asc")):(sort="asc",self.sortedByColumnName(columnName)),self.sortedByOrder(sort),self.currentPage(0),self.search()},this.sortByDescription=function(){self.sortColumn("Description")},this.sortBySubscriptionType=function(){self.sortColumn("SubscriptionType")},this.sortCss=function(columnName){if(self.sortedByColumnName()==columnName){if("asc"==self.sortedByOrder())return"sortAsc";if("desc"==self.sortedByOrder())return"sortDesc"}return""},this.sortCssDescription=ko.computed(function(){return self.sortCss("Description")}),this.sortCssSubscriptionType=ko.computed(function(){return self.sortCss("SubscriptionType")}),self.totalCount=ko.observable(0),self.pageSize=ko.observable("10"),self.currentPage=ko.observable(0),self.pageSlide=ko.observable(2),self.lastPage=ko.computed(function(){return Math.ceil(self.totalCount()/self.pageSize())}),this.pages=ko.computed(function(){var pageCount=self.lastPage(),pageFrom=Math.max(1,self.currentPage()-self.pageSlide()),pageTo=Math.min(pageCount,self.currentPage()+self.pageSlide());pageFrom=Math.max(1,Math.min(pageTo-2*self.pageSlide(),pageFrom)),pageTo=Math.min(pageCount,Math.max(pageFrom+2*self.pageSlide(),pageTo));for(var result=[],i=pageFrom;i<=pageTo;i++)result.push(i);return result}),self.changePage=function(page){self.currentPage(page),self.search()},self.totalItemsText=ko.computed(function(){return 1==self.totalCount()?self.localizer().getString("OneItem"):self.totalCount()<self.pageSize()?self.localizer().getString("Items").replace("[ITEMS]",self.totalCount()):self.localizer().getString("ItemsOnPage").replace("[ITEMS]",self.totalCount()).replace("[PAGES]",Math.ceil(self.totalCount()/self.pageSize()))}),$(document).ready(function(){null!=root.pageControl&&root.pageControl.page.subscribe(function(){self.search()}),self.search()})}}(window.jQuery);