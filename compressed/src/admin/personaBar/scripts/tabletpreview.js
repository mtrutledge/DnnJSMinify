"use strict";define(["jquery","knockout"],function($,ko){var viewModel={iframeUrl:ko.observable(""),imgUrl:ko.observable("")};return{init:function(wrapper,util,params,callback){var bsize=$("div#tabletpreviewpanel"),prevIframe=$("iframe#prevTablet"),prevCont=$("div#prevTabletCont"),myUrl=null,myImg=null;"object"==typeof window.top&&(myUrl=window.top.location.href,myUrl+=myUrl.indexOf("?")>0?"&dnnprintmode=true":"?dnnprintmode=true");var index=window.location.href.indexOf("admin/");"string"==typeof params.preview?("portrait"==params.preview&&(index>0&&(myImg=window.location.href.substring(0,index)+"admin/personabar/images/tablet-portrait.png"),prevIframe.css("width","593px"),prevIframe.css("height","793px"),prevIframe.css("left","94px"),prevIframe.css("top","88px"),prevCont.css("left",(bsize.width()-782)/2+"px"),prevCont.css("top",(bsize.height()-969)/2+"px")),"landscape"==params.preview&&(index>0&&(myImg=window.location.href.substring(0,index)+"admin/personabar/images/tablet-landscape.png"),prevIframe.css("width","793px"),prevIframe.css("height","593px"),prevIframe.css("left","112px"),prevIframe.css("top","68px"),prevCont.css("left",(bsize.width()-1005)/2+"px"),prevCont.css("top",(bsize.height()-736)/2+"px"))):(index>0&&(myImg=window.location.href.substring(0,index)+"admin/personabar/images/tablet-portrait.png"),prevIframe.css("width","593px"),prevIframe.css("height","793px"),prevIframe.css("left","94px"),prevIframe.css("top","88px"),prevCont.css("left",(bsize.width()-782)/2+"px"),prevCont.css("top",(bsize.height()-969)/2+"px")),viewModel.iframeUrl(myUrl),viewModel.imgUrl(myImg),ko.applyBindings(viewModel,wrapper[0]),"function"==typeof callback&&callback()},load:function(params,callback){var bsize=$("div#tabletpreviewpanel"),prevIframe=$("iframe#prevTablet"),prevCont=$("div#prevTabletCont"),myImg=null,index=window.location.href.indexOf("admin/");"string"==typeof params.preview?("portrait"==params.preview&&(index>0&&(myImg=window.location.href.substring(0,index)+"admin/personabar/images/tablet-portrait.png"),prevIframe.css("width","593px"),prevIframe.css("height","793px"),prevIframe.css("left","94px"),prevIframe.css("top","88px"),prevCont.css("left",(bsize.width()-782)/2+"px"),prevCont.css("top",(bsize.height()-969)/2+"px")),"landscape"==params.preview&&(index>0&&(myImg=window.location.href.substring(0,index)+"admin/personabar/images/tablet-landscape.png"),prevIframe.css("width","793px"),prevIframe.css("height","593px"),prevIframe.css("left","112px"),prevIframe.css("top","68px"),prevCont.css("left",(bsize.width()-1005)/2+"px"),prevCont.css("top",(bsize.height()-736)/2+"px"))):(index>0&&(myImg=window.location.href.substring(0,index)+"admin/personabar/images/tablet-portrait.png"),prevIframe.css("width","593px"),prevIframe.css("height","793px"),prevIframe.css("left","94px"),prevIframe.css("top","88px"),prevCont.css("left",(bsize.width()-782)/2+"px"),prevCont.css("top",(bsize.height()-969)/2+"px")),viewModel.imgUrl(myImg),"function"==typeof callback&&callback()}}});