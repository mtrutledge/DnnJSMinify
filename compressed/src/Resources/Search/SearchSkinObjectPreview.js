!function($){"undefined"==typeof dnn&&(window.dnn={}),"undefined"==typeof dnn.searchSkinObject&&(dnn.searchSkinObject=function(options){var settings={delayTriggerAutoSearch:100,minCharRequiredTriggerAutoSearch:2,searchType:"S",enableWildSearch:!0,cultureCode:"en-US"};this.settings=$.extend({},settings,options)},dnn.searchSkinObject.prototype={_ignoreKeyCodes:[9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45],init:function(){var throttle=null,self=this,makeUrl=function(val,service){var url=service?service.getServiceRoot("internalservices")+"searchService/preview":null;if(!url)return null;var params={};params.keywords=val.replace(/^\s+|\s+$/g,""),self.settings.enableWildSearch||(params.forceWild="0"),params.culture=self.settings.cultureCode,self.settings.portalId>=0&&(params.portal=self.settings.portalId);var urlAppend=[];return $.each(params,function(index,value){urlAppend.push([index,encodeURIComponent(value)].join("="))}),urlAppend.length&&(url+=url.indexOf("?")===-1?"?":"&",url+=urlAppend.join("&")),url},generatePreviewTemplate=function(data){var $wrap=$(".searchInputContainer"),preview=$(".searchSkinObjectPreview",$wrap);preview.length&&preview.remove();var markup='<ul class="searchSkinObjectPreview">';if(data&&data.length){for(var i=0;i<data.length;i++){var group=data[i];if(group.Results&&group.Results.length){var groupTitle=group.DocumentTypeName;markup+='<li class="searchSkinObjectPreview_group">'+groupTitle+"</li>";for(var j=0;j<group.Results.length;j++){var item=group.Results[j],itemTitle=item.Title,itemUrl=item.DocumentUrl,itemSnippet=item.Snippet;markup+='<li data-url="'+itemUrl+'">',item.Attributes.Avatar&&(markup+='<span><img src="'+item.Attributes.Avatar+'" class="userpic" /></span>'),markup+="<span>"+itemTitle+"</span>",markup+=itemSnippet?"<p>"+itemSnippet+"</p></li>":"</li>"}}}var moreResults=$wrap.attr("data-moreresults");markup+='<li><a href="javascript:void(0)" class="searchSkinObjectPreview_more">'+moreResults+"</a></li>",markup+="</ul>"}else{var noResult=$wrap.attr("data-noresult");markup+="<li>"+noResult+"</li></ul>"}$wrap.append(markup),preview=$(".searchSkinObjectPreview",$wrap),$("li",preview).on("click",function(){var navigateUrl=$(this).attr("data-url");return navigateUrl&&(window.location.href=navigateUrl),!1}),$(".searchSkinObjectPreview_more",$wrap).on("click",function(){var $searchButton=$wrap.parents(".SearchContainer").length?$wrap.parent().next():$wrap.next(),href=$searchButton.attr("href"),code=href.replace("javascript:","");return eval(code),!1})};$(".searchInputContainer a.dnnSearchBoxClearText").on("click",function(){var $this=$(this),$wrap=$this.parent();return $(".searchInputContainer input").val("").focus(),$this.removeClass("dnnShow"),$(".searchSkinObjectPreview",$wrap).remove(),!1}),$(".searchInputContainer").next().on("click",function(){var $this=$(this),inputBox=$this.prev().find('input[type="text"]'),val=inputBox.val();return!!val.length}),$(".searchInputContainer input").on("keyup",function(e){var k=e.keyCode||e.witch;if(!($.inArray(k,self._ignoreKeyCodes)>-1)){var $this=$(this),$wrap=$this.parent(),val=$this.val();if(val){if($("a.dnnSearchBoxClearText",$wrap).addClass("dnnShow"),"S"!=self.settings.searchType||val.length<self.settings.minCharRequiredTriggerAutoSearch)return;throttle&&(clearTimeout(throttle),delete throttle),throttle=setTimeout(function(){var service=$.dnnSF?$.dnnSF(-1):null,url=makeUrl(val,service);url&&$.ajax({url:url,beforeSend:service?service.setModuleHeaders:null,success:function(result){result&&generatePreviewTemplate(result)},error:function(){},type:"GET",dataType:"json",contentType:"application/json"})},self.settings.delayTriggerAutoSearch)}else $("a.dnnSearchBoxClearText",$wrap).removeClass("dnnShow"),$(".searchSkinObjectPreview",$wrap).remove()}}).on("paste",function(){$(this).triggerHandler("keyup")}).on("keypress",function(e){var k=e.keyCode||e.which;if(13==k){var $this=$(this),$wrap=$this.parent(),val=$this.val();if(val.length){var href=$wrap.next().attr("href");href||(href=$wrap.parent().next().attr("href"));var code=href.replace("javascript:","");eval(code),e.preventDefault()}else e.preventDefault()}})}})}(jQuery);