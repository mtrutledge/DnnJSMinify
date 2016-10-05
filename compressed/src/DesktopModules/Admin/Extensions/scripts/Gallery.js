function Gallery(params){var options={rowId:0,index:1,pageSize:10,orderBy:"",orderDir:"",thenBy:"",thenDir:"asc",animationSpeed:"slow",pageIdx:1,pageSze:10,smoothScrolling:!0,extensions:new Object,action:"filter",extensionFilter:"module",tagFilter:"",tagFilterName:"",ownerFilter:"",tags:new Object,loadTags:!0,pagedExtensions:new Object,protocol:"https:"==location.protocol?"https://":"http://",host:"catalog.dotnetnuke.com",ServiceRoot:"/AppGalleryService.svc",DataBaseVersion:"06.00.00",ExtensionServiceName:"/Extensions",TagsServiceName:"/Tags",TagCloudServiceName:"/GetTagCloudData",CatalogServiceName:"/Catalogs",ExtensionSearchName:"/SearchExtensions",extensionDetailDialog:$("#extensionDetail").dialog(this.DefaultDialogOptions),loading:$("#loading"),NameTextASC:"Name: A-Z",NameTextDESC:"Name: Z-A",PriceTextASC:"Price: High to Low",PriceTextDESC:"Price: Low to High",TagCount:50,CacheTimeoutMinutes:1440,searchFilters:$("#searchFilters"),tagLabel:"Tag",searchLabel:"Search",vendorLabel:"Vendor",typeLabel:"Type",noneLabel:"None",orderLabel:"Order:",errorLabel:"Error...",loadingLabel:"Loading...",BaseDownLoadUrl:"",searchText:""};params&&$.extend(options,params);for(var i in options)options.hasOwnProperty(i)&&(this[i]=options[i]);if(this.extensionList=$("#extensionList"),this.smoothScrolling){new Scroller(100,!1,function(scroller){_gallery.index++,_gallery.action="page",_gallery.Search()}).watch()}this.ExtensionsUrl=this.getServiceUrl(this.ExtensionServiceName),this.TagCloudUrl=this.getServiceUrl(this.TagCloudServiceName),this.TagsUrl=this.getServiceUrl(this.TagsServiceName),this.CatalogsUrl=this.getServiceUrl(this.CatalogServiceName),this.SearchUrl=this.getServiceUrl(this.ExtensionSearchName),this.Cache=new Cache("_Gallery_",this.CacheTimeoutMinutes),$("#tag-list").click(function(e){return e=e||window.event,_gallery.TagFilterGallery(e,this),!1}),$("#search-reset").click(function(e){return e=e||window.event,$("#searchText").val(""),_gallery.tagFilter="",_gallery.tagFilterName="",_gallery.ownerFilter="",_gallery.orderBy="Title",_gallery.orderDir="asc",_gallery.extensionFilter="module",$("#typeDDL").val("module"),_gallery.SearchGallery(""),_gallery.getTags(),!1}),$("#searchText").change(function(e){return e=e||window.event,_gallery.SearchGallery($("#searchText").val()),!1}),$(document).keydown(function(e){e=e||window.event,13==e.which&&(window.stop?window.stop():document.execCommand("stop"),e.stopPropagation(),e.preventDefault(),_gallery.SearchGallery($("#searchText").val()))}),$("#searchText").keyup(function(e){return e=e||window.event,27==e.which&&$("#search-reset").click(),!1}),$("#search-go").click(function(e){return e=e||window.event,_gallery.SearchGallery($("#searchText").val()),!1}),$("#NameSorter").click(function(e){return e=e||window.event,_gallery.SortExtensions("Title"),!1}),$("#PriceSorter").click(function(e){return e=e||window.event,_gallery.SortExtensions("Price"),!1})}Gallery.prototype.resolveImage=function(img){var path=img;return 0==img.indexOf("~")&&(path=this.siteRoot+img.substr(2)),path},Gallery.prototype.showLoading=function(a){this.reposition(),this.loading.css("background-color",""),this.loading.text(this.loadingLabel),this.loading.show()},Gallery.prototype.hideLoading=function(a){this.loading.hide()},Gallery.prototype.errorLoading=function(a){this.loading.css("background-color","red"),this.loading.text(this.errorText),this.loading.attr("title",a[0].statusText),this.loading.attr("alt",a[0].statusText)},Gallery.prototype.reposition=function(){var wnd=$(window);this.loading.css("top",wnd.scrollTop()),this.loading.css("left",wnd.width()/2-this.loading.width()/2)},Gallery.prototype.SortExtensions=function(fld,order){if(this.index=1,this.action="sort",order?(this.orderBy=fld,this.orderDir=order):this.ToggleSort(fld),this.orderBy&&this.orderDir){var NameSorter=$("#NameSorter"),PriceSorter=$("#PriceSorter");"Title"==this.orderBy?"asc"==this.orderDir?NameSorter.text(this.NameTextDESC):NameSorter.text(this.NameTextASC):"Price"==this.orderBy&&("asc"==this.orderDir?PriceSorter.text(this.PriceTextDESC):PriceSorter.text(this.PriceTextASC))}return this.Search()},Gallery.prototype.ToggleSort=function(field){this.orderBy!==field&&(this.thenBy=this.orderBy,this.thenDir=this.orderDir,this.orderBy=field,this.orderDir=""),this.orderDir&&""!==this.orderDir&&"desc"!=this.orderDir?this.orderDir="desc":this.orderDir="asc"},Gallery.prototype.SearchGallery=function(search){return this.action="search",search?this.searchText=search:this.searchText="",this.index=1,this.Search()},Gallery.prototype.OwnerFilterGallery=function(owner){return this.action="filter",owner&&(this.ownerFilter=owner),this.index=1,this.Search()},Gallery.prototype.TagFilterGallery=function(e,caller){e=e||window.event;var target=$(e.srcElement||e.target),filter=target.attr("tagId");return this.action="filter",filter&&(this.tagFilter=filter,this.tagFilterName=target.html()),this.index=1,this.Search()},Gallery.prototype.FilterGallery=function(e,ddl){var filter=$(e.srcElement||e.target).attr("value");return this.action="filter",filter&&(this.extensionFilter=filter),this.getTags(),this.index=1,this.Search()},Gallery.prototype.FilterGallery2=function(filter){return this.action="filter",filter&&(this.extensionFilter=filter),this.getTags(),this.index=1,this.Search()},Gallery.prototype.Search=function(){return this.getExtensions(),this},Gallery.prototype.getServiceUrl=function(ServiceName){return this.protocol+this.host+this.ServiceRoot+ServiceName},Gallery.prototype.getExtensions=function(callback){var filterDesc=this.tagLabel+" ",url="",prefix="",skip=(this.index-1)*this.pageSize,hasCriteria=skip>0;if(this.tagFilter&&""!==this.tagFilter?(url=this.TagsUrl+"("+this.tagFilter+")/ExtensionTags/?$expand=Extension",prefix="Extension/",filterDesc+=this.tagFilterName,hasCriteria=!0):(url=this.ExtensionsUrl+"?",filterDesc+=this.noneLabel),filterDesc=filterDesc+", "+this.searchLabel+" ",url+="&$inlinecount=allpages&$skip="+skip+"&$top="+this.pageSize,this.searchText&&""!==this.searchText?(url=url+"&$filter="+encodeURIComponent("(substringof('"+this.searchText+"', "+prefix+"ExtensionName) eq true or substringof('"+this.searchText+"', "+prefix+"Description) eq true or substringof('"+this.searchText+"', "+prefix+"Title) eq true)"),filterDesc+=this.searchText,hasCriteria=!0):filterDesc+=this.noneLabel,filterDesc=filterDesc+", "+this.typeLabel+" ",this.extensionFilter&&""!==this.extensionFilter&&"all"!==this.extensionFilter?("module"==this.extensionFilter?filterDesc+="Module":(hasCriteria=!0,filterDesc+="Skin"),url+=url.indexOf("$filter")<0?"&$filter=":"and ",url=url+""+prefix+"ExtensionType eq '"+this.extensionFilter+"'"):(hasCriteria=!0,filterDesc+="All"),filterDesc=filterDesc+", "+this.vendorLabel+" ",this.ownerFilter&&""!==this.ownerFilter?(filterDesc+=this.ownerFilter,url+=url.indexOf("$filter")<0?"&$filter=":"and ",url+=encodeURIComponent(""+prefix+"OwnerName eq '"+this.ownerFilter+"'"),hasCriteria=!0):filterDesc+=this.noneLabel,this.DataBaseVersion&&""!==this.DataBaseVersion?(url+=url.indexOf("$filter")<0?"&$filter=":"and ",url+=encodeURIComponent(""+prefix+"MinDnnVersion lt '"+this.DataBaseVersion+"'")):filterDesc+=this.noneLabel,filterDesc=filterDesc+", "+this.orderLabel+" ",""!==this.orderBy?(url=url+"&$orderby="+encodeURIComponent(prefix+""+this.orderBy+" "+this.orderDir),"Title"==this.orderBy?"asc"==this.orderDir?filterDesc+=this.NameTextASC:(hasCriteria=!0,filterDesc+=this.NameTextDESC):(hasCriteria=!0,filterDesc+="asc"==this.orderDir?this.PriceTextASC:this.PriceTextDESC)):filterDesc+=this.noneLabel,""!==this.thenBy&&(url=url+","+encodeURIComponent(prefix+""+this.thenBy+" "+this.thenDir),"Title"==this.thenBy?"asc"==this.thenDir?filterDesc=filterDesc+", "+this.NameTextASC:(hasCriteria=!0,filterDesc=filterDesc+", "+this.NameTextDESC):(hasCriteria=!0,filterDesc="asc"==this.thenDir?filterDesc+", "+this.PriceTextASC:filterDesc+", "+this.PriceTextDESC)),this.searchFilters.text(filterDesc),url+="&$format=json",!_gallery.extensions.d||!hasCriteria){var exts=this.Cache.getItem("__FIRSTLOAD");if(exts)return void Gallery.gotExtensions(exts)}this.showLoading(),this.eXHR=this.getXHR(url,"gotExtensions")},Gallery.gotExtensions=function(){var msg=arguments[0],g=_gallery;if(msg&&msg.d&&msg.d.results)for(var i in msg.d.results){var item=msg.d.results[i];"undefined"!=typeof item.Extension?item.Extension.Catalog=g.getCatalog(item.Extension.CatalogID):item.Catalog=g.getCatalog(item.CatalogID)}if(_gallery.Cache.hasItem("__FIRSTLOAD")||_gallery.Cache.setItem("__FIRSTLOAD",msg),msg.d.results.length>0&&"undefined"!=typeof msg.d.results[0].Extension)for(var j in msg.d.results)for(var i in msg.d.results[j].Extension)msg.d.results[j].Extension.hasOwnProperty(i)&&(msg.d.results[j][i]=msg.d.results[j].Extension[i]);_gallery.pagedExtensions=msg.d.results,_gallery.extensions&&_gallery.extensions.d&&_gallery.extensions.d.results&&"search"!=_gallery.action&&"filter"!=_gallery.action&&"sort"!=_gallery.action?_gallery.extensions.d.results=_gallery.extensions.d.results.concat(msg.d.results):_gallery.extensions=msg,_gallery.showExtensions(function(){}),_gallery.hideLoading()},Gallery.prototype.showExtensions=function(callback){if(this.pageCount=Math.ceil(this.extensions.d.__count/this.pageSize),this.smoothScrolling||this.extensionList.empty(),"search"!=this.action&&"filter"!=this.action&&"sort"!=this.action||this.extensionList.empty(),this.pagedExtensions.length>0){var extensions=$("#eTmpl").tmpl(this.pagedExtensions);extensions.appendTo(this.extensionList).hide(),this.extensionList.children().fadeIn(this.animationSpeed)}this.pagedExtensions=[],callback&&callback(this)},Gallery.prototype.getExtensionById=function(extensionID){if(this.extensions&&this.extensions.d)for(var list=this.extensions.d.results,x=list.length;x--;x>=0)if(list[x].ExtensionID==extensionID)return list[x]},Gallery.prototype.FormatCurrency=function(num){num=num.toString().replace(/\$|\,/g,""),isNaN(num)&&(num="0"),sign=num==(num=Math.abs(num)),num=Math.floor(100*num+.50000000001),cents=num%100,num=Math.floor(num/100).toString(),cents<10&&(cents="0"+cents);for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+","+num.substring(num.length-(4*i+3));return(sign?"":"-")+"$"+num+"."+cents},Gallery.prototype.DefaultDialogOptions={modal:!0,autoOpen:!1,width:800,height:600,resizable:!0,closeOnEscape:!0},Gallery.prototype.getDownloadUrl=function(extensionID){return this.BaseDownLoadUrl.replace(escape("{{ExtensionID}}"),extensionID).replace("{{ExtensionID}}",extensionID)},Gallery.prototype.ShowDetails=function(extensionID){var ext=this.getExtensionById(extensionID);if(ext){var extensionDetailInner=$("#extensionDetailInner");extensionDetailInner.empty(),$("#extDetailTmpl").tmpl(ext).appendTo(extensionDetailInner),$("#extensionDetail-tabs").tabs(),this.extensionDetailDialog.dialog({title:ext.ExtensionName}),this.extensionDetailDialog.dialog("open")}return!1},Gallery.prototype.getCatalog=function(id){for(var i in this.cats.d)if(this.cats.d[i].CatalogID==id)return this.cats.d[i];return null},Gallery.gotCatalogs=function(msg){var msg=arguments[0],g=_gallery;g.cats=msg,_gallery.Cache.hasItem("catalogs")||_gallery.Cache.setItem("catalogs",msg)},Gallery.prototype.getCatalogs=function(completeCallback){var url=this.CatalogsUrl;url+="?$format=json";var cats=this.Cache.getItem("catalogs");return cats?(Gallery.gotCatalogs(cats),void("undefined"!=typeof completeCallback&&$.isFunction(completeCallback)&&completeCallback())):(this.showLoading(),this.tagXHR=this.getXHR(url,"gotCatalogs"),void("undefined"!=typeof completeCallback&&$.isFunction(completeCallback)&&this.tagXHR.complete(function(){completeCallback()})))},Gallery.prototype.getTags=function(callback){var max=this.TagCount?this.TagCount:15,url=this.TagCloudUrl+"?Tagcount="+max;url=url+"&ExtensionType='"+this.extensionFilter+"'",url+="&MinDnnVersion=''",url+="&$format=json";var tags=this.Cache.getItem("tags_"+this.extensionFilter);return tags?(_gallery.tags=tags.sort(Gallery.tagSort),_gallery.loadTags=!1,void _gallery.showTags()):(this.showLoading(),void(this.tagXHR=this.getXHR(url,"gotTags")))},Gallery.gotTags=function(msg){_gallery.resolveTags(msg)},Gallery.prototype.resolveTags=function(msg){var item,fixed=new Array,max=msg.d.length-1,biggest=0,maxFont=250,minFont=75,x=0;for(x=max;x>=0;x--)item=msg.d[x],Gallery.validTag(item)&&(item.TagCount>biggest&&(biggest=item.TagCount),fixed.push(item));max=fixed.length;for(x in fixed)item=fixed[x],item.fontSize=(item.TagCount/biggest*maxFont).toFixed(2),item.fontSize<minFont&&(item.fontSize=minFont);this.loadTags=!1,this.tags=fixed.sort(Gallery.tagSort),this.Cache.setItem("tags_"+this.extensionFilter,_gallery.tags),this.showTags(),this.hideLoading()},Gallery.tagSort=function(a,b){var nameA=a.tagName.toLowerCase(),nameB=b.tagName.toLowerCase();return nameA<nameB?-1:nameA>nameB?1:0},Gallery.prototype.showTags=function(callback){var taglist=$("#tag-list"),tagTmpl=$("#tag-tmpl");taglist.empty(),this.tags?(tagTmpl.tmpl(this.tags).appendTo(taglist),taglist.fadeIn(this.animationSpeed)):taglist.fadeOut(this.animationSpeed),callback&&callback(this)},Gallery.validTag=function(tag){return tag&&tag.tagName&&tag.tagName.indexOf("DotNetNuke")<0&&tag.TagCount>0},Gallery.prototype.getXHR=function(url,callback){return $.getJSON(url+"&$callback=?",Gallery[callback]).error(function(){_gallery.errorLoading(arguments)})},Cache=function(Scope,TimeoutInMinutes,StorageType,ExpireCallback){return this.StorageType=StorageType||"localStorage","localStorage"==this.StorageType&&"sessionStorage"==this.StorageType&&"globalStorage"==this.StorageType||(this.StorageType="localStorage"),this.Scope=Scope||"",this.TimeoutInMinutes=TimeoutInMinutes,this.expireCallback=ExpireCallback,this.loadStore(),Cache.isEnabled="undefined"!=typeof this.store&&"undefined"!=typeof JSON&&("undefined"==typeof this.TimeoutInMinutes||"undefined"!=typeof this.TimeoutInMinutes&&this.TimeoutInMinutes>0),Cache.isEnabled&&"undefined"!=typeof this.TimeoutInMinutes&&($(document).ready(function(){Cache.ClearInterval()}),this.cacheExpire=window.setInterval(Cache.ClearInterval,6e4*TimeoutInMinutes,this)),this},Cache.isEnabled=!1,Cache.prototype.loadStore=function(){switch(this.StorageType){case"globalStorage":try{window.globalStorage&&(this.store=window.globalStorage[window.location.hostname])}catch(E4){}break;case"sessionStorage":try{window.sessionStorage&&(this.store=window.sessionStorage)}catch(E3){}break;default:try{window.localStorage&&(this.store=window.localStorage)}catch(E3){}}return this},Cache.ClearInterval=function(source){if("undefined"==typeof source&&(source=_gallery.Cache),"undefined"!=typeof source.TimeoutInMinutes)if(source.hasItem(source.Scope+"_expire")){var exp=source.getItem(source.Scope+"_expire"),mins=(new Date-Date.parse(exp))/6e4;mins>source.TimeoutInMinutes&&(source.EmptyCache(),"undefined"!=typeof source.expireCallback&&source.expireCallback(i))}else source.setItem(source.Scope+"_expire",new Date);return this},Cache.prototype.EmptyCache=function(){var max,i;try{for(i in this.store)this.store.hasOwnProperty(i)&&i.substr(0,this.Scope.length)==this.Scope&&this.store.removeItem(i)}catch(E){try{for(max=this.store.length-1,x=max;x>=0;x--)i=this.store[x],this.store.hasOwnProperty(i)&&i.substr(0,this.Scope.length)==this.Scope&&this.store.removeItem(i)}catch(EFF){this.store.clear()}}return this},Cache.prototype.hasItem=function(key){var d;return!!Cache.isEnabled&&(d=this.store.getItem(this.Scope+key),d&&null!==d&&!("undefined"==typeof d))},Cache.prototype.getItem=function(key){var d,x;if(Cache.isEnabled){d=this.store.getItem(this.Scope+key);try{x=$.parseJSON(d)}catch(e){this.store.removeItem(this.Scope+key)}}return x},Cache.prototype.setItem=function(key,value){return Cache.isEnabled&&this.store.setItem(this.Scope+key,JSON.stringify(value)),this},Scroller=function(maxPage,loadScroll,scrollcallback){this.page=1,this.maxPage=maxPage?maxPage:100,this.loadScroll="undefined"!=typeof loadScroll&&loadScroll,this.scrollcallback=scrollcallback,this.loadScroll&&this.loadScroller()},Scroller.prototype.handleScroll=function(){this.page++,this.scrollcallback&&this.scrollcallback(this),this.page>=this.maxPage&&this.unwatch()},Scroller.prototype.loadScroller=function(){for(var more=!0;more;)more=$(window).scrollTop()>=$(document).height()-$(window).height(),more&&this.handleScroll(),this.page>=this.maxPage&&(more=!1)},Scroller.prototype.watch=function(){window.Scroller=this;var root=$(window);root.scroll||(root=$(document)),root.scroll(function(){var s=window.Scroller;$(window).scrollTop()>=$(document).height()-$(window).height()&&s.handleScroll()})},Scroller.prototype.unwatch=function(){$(document).unbind("scroll")},Math.random.range=function(min,max,inclusive){return"undefined"==typeof inclusive&&inclusive||(min-=1),max+=1,Math.floor(max+(1+min-max)*Math.random())};