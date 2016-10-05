// JavaScript Document
function trackLink(url) {

    if (typeof ga !== 'undefined') { ga('send', 'link', 'click', url); } else if (typeof _gaq !== 'undefined') { _gaq.push(['_trackEvent', 'link', 'click', url, 1, false]); }
   
    setTimeout(function () { document.location = url; }, 500);
}

function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.fullHeightBox').css('height', windowHeight);
};
function MoveSearch() {
    if ($(window).width() < 768) {
        $(".mobSearch").prepend($(".navSearch"));
        $(".mobFreeShip").append($(".navFreeShipCopy"));
        $(".mobSupportWrap").append($(".SupportWrap .schoolH4"));
    }
    else {
        $(".navSearchWrap").prepend($(".navSearch"));
        $(".navFreeShip").append($(".navFreeShipCopy"));
        $(".SupportWrap").append($(".mobSupportWrap .schoolH4"));
    }
};
function MobNavHeight() {
    if ($(window).width() < 769) {
        $("#nav-mobNav").addClass("mobNavActive");
    }
    else {
        $("#nav-mobNav").removeClass("mobNavActive");
    }
    var menuHeight = $(window).height() - 41;
    $('.mobNavActive').css('height', menuHeight);

};
function navHeight() {
    var menuHeight = $(document).height();
    $('.head-bottom').css('min-height', menuHeight);
};
function footerHeight() {


    var windowHeight = $(window).height();
    var skinWrapHeight = $('.skinWrapper').height();
    var footerTopHeight = $('.navbarFooterTop').height();
    var footerMiddleHeight = $('.navbarFooterMiddle').height();
    var footerBottomHeight = $('.navbarFooterBottom').height();
    var pageHeight = skinWrapHeight + footerTopHeight + footerMiddleHeight + footerBottomHeight;
    var checkHeight = windowHeight - pageHeight;

    if (checkHeight > 0) {
        var menuHeight = $(window).height();
        var footHeight = footerBottomHeight + checkHeight;
        $('.head-bottom').css('min-height', menuHeight);
        $('.navbarFooterBottom').css('min-height', footHeight);
    }
    else {
        var menuHeight = pageHeight;
        $('.head-bottom').css('min-height', menuHeight);
    }



};

function getGroup() {
    if (Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSCHOOL).length > 0) {
        var html = "<h1 class='group'>" + Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSCHOOL) + "<h1>";
        $('.groupName').html(html);
        $('.supportingGroup').css('display', 'block');
        $('.groupStats').css('display', 'block');
    }
}
function getSellers() {
    if (Module_CookieHelper.getCookieStudentArray().length > 0) {
        var html = "<h4>(";
        $.each(Module_CookieHelper.getCookieStudentArray(), function (index, value) {
            firstName = value.FirstName;
            html = html + firstName + ", ";
        });
        html = html + "<a href='/chooseSeller'>Add More</a>)</h4>";
        $('.studentList').html(html);
    }
    else {
        var html = "<h4>(<a href='/chooseSeller'>Add Seller</a>)</h4>";
        $('.studentList').html(html);
    }
}

$(document).ready(function(){
		
		setHeight();
		MoveSearch();
		navHeight();
		footerHeight();

		if ($('.supportingGroup').length > 0) {
		    getGroup();
		    getSellers();
		}

		$(window).resize(function() {
		    setHeight();
		    MoveSearch();
		    navHeight();
		    footerHeight();
		});
	  
		$( window ).scroll(function() {
			if($(window).width() > 769){
				if($(window).scrollTop() > 100){
				    $('.navbar-logo img').css({ 'width': '150px' });
				    $('.navbar-logo').css({ 'padding': '5px 0' });
				    $('header .head-top .navbar-nav>li>a, .hc-minicart .hc-iconbox a, .navbar-right .registerGroup a, .navbar-right .loginGroup a').css('margin', '5px 0');
				    $('.buttonMobile').css('margin', '5px 0' );
					$('.head-top .navbar-nav>li>a').css({ 'margin': '5px 0px' });
					$('.navbar-form').css({ 'margin': '5px 15px' });
					$('.searchBtn i').css('margin', '5px 0');
					$('.navFreeShip').css('display', 'none');
				 }
				 else{
				    $('.navbar-logo img').css({ 'width': '158px' });
				    $('.navbar-logo').css({ 'padding': '15px 0' });
				    $('header .head-top .navbar-nav>li>a, .hc-minicart .hc-iconbox a, .navbar-right .registerGroup a, .navbar-right .loginGroup a').css('margin', '16px 0');
                    $('.buttonMobile').css({ 'margin': '16px 0' });
					$('.head-top .navbar-nav>li>a').css({ 'margin': '16px 0px' });
					$('.navbar-form').css({ 'margin': '16px 15px' });
					$('.searchBtn i').css('margin', '16px 0');
					$('.navFreeShip').css('display', 'block');
				 }
			}
		});
	    
		var winLoc = 0;

		$(".buttonMobile").click(function () {
		    if (!$(".navbar-fixed-top").hasClass('open')) {
		        winLoc = $(window).scrollTop();
		        $(window).scrollTop(0);
		    }
		    else {
		        $(window).scrollTop(winLoc);
		    }
		    $(".navbar-fixed-top").toggleClass("open");
		    $(".skinWrapper").toggleClass("open");
		    $(".navbar-default").toggleClass("open");
		    if ($("#nav-mobUser").hasClass("open")) {
		        $("#nav-mobUser").toggleClass("open");
		    }
		});
		$(".closeNav").click(function () {
		    $(".navbar-fixed-top").toggleClass("open");
		    $(".skinWrapper").toggleClass("open");
		    $(".navbar-default").toggleClass("open");
		});

		$(".searchBtn").click(function () {
		    if ($(window).width() > 1025) {
		        $(".searchBtn").toggleClass("close");
		        $(".navSearch").toggleClass("open");
		        $(".hc-search-bar").focus();
		        $('header .head-top .navFreeShip .navFreeShipCopy').css('padding-right', '60px');
		    }
		    else if ($(window).width() > 769) {
		        $(".searchBtn").toggleClass("close");
		        $(".navSearch").toggleClass("open");
		        $(".hc-search-bar").focus();
		        $('header .head-top .navFreeShip .navFreeShipCopy').css('padding-right', '60px');
		    }
		    else if ($(window).width() > 701) {
		        $(".searchBtn").toggleClass("close");
		        $(".navSearch").toggleClass("open");
		        $(".hc-search-bar").focus();
		        $('header .head-top .navFreeShip .navFreeShipCopy').css('display', 'none');
		    }
		});
        
		
		$(document).mouseup(function (e) {
		    if ($('.navSearch').hasClass('open')){
		        var searchContainer = $('.navSearchWrap');

		        if (!searchContainer.is(e.target) // if the target of the click isn't the container...
                    && searchContainer.has(e.target).length === 0) // ... nor a descendant of the container
		        {
		            $(".searchBtn").toggleClass("close");
		            $(".navSearch").toggleClass("open");
		            if ($(window).width() > 1025) {
		                $('header .head-top .navFreeShip .navFreeShipCopy').css('padding-right', '266px');
		            }
		            else if ($(window).width() > 769) {
		                $('header .head-top .navFreeShip .navFreeShipCopy').css('padding-right', '166px');
		            }
		            else if ($(window).width() > 701) {
		                $('header .head-top .navFreeShip .navFreeShipCopy').css('display', 'block');
		            }
		        }
		    }
		});
		

		$(".userMenuExpand").click(function () {
		    $("#nav-mobUser").toggleClass("open");
		    if($("#nav-mobNav").hasClass("open")){
		        $("#nav-mobNav").toggleClass("open");
		    }

		});
		$("#footer-ps").click(function() {
				$("#footer-ps").toggleClass("open");
				$("#footer-ps-cont").toggleClass("open");
		});
		$("#footer-sg").click(function() {
				$("#footer-sg").toggleClass("open");
				$("#footer-sg-cont").toggleClass("open");
		});
		$("#footer-shop").click(function() {
				$("#footer-shop").toggleClass("open");
				$("#footer-shop-cont").toggleClass("open");
		});
		$("#footer-add").click(function () {
		    $("#footer-add").toggleClass("open");
		    $("#footer-add-cont").toggleClass("open");
		});
		
		$(function () {
		    if ($('form').hasClass('showControlBar')) {
		        $('.navbar-fixed-top').addClass('admin');
		        $('.head-bottom').addClass('admin');
		    }
		        
		});

		if (Module_CookieHelper.getCookie(Module_CookieHelper.cookie_School_SelectedSCHOOL) != "") {
		    $(".schoolH4").css("display", "block");
		    if ($(".schoolH4").length > 0 && $(".schoolName").length == 0)
		        $(".schoolH4").append('<span class="schoolName" />');

		    $(".schoolName").text(Module_CookieHelper.getCookie(Module_CookieHelper.cookie_School_SelectedSCHOOL));
		}
		else {
		    $(".schoolH4").css("display", "none");
		}
		Module_ViewSet.bindToLoginButton();
		Module_ViewSet.bindToLogoutButton();
		$('#shopNow').click(function () {
		    if (Module_CookieHelper.getCookie(Module_CookieHelper.cookie_School_SelectedSCHOOL) !== undefined && Module_CookieHelper.getCookie(Module_CookieHelper.cookie_School_SelectedSCHOOL).length > 0) {
		        window.location.replace("/Shop");
		    }
		    else {
		        window.location.replace("/chooseGroup");
		    }
		});
        
		$('.smDashHead').click(function () {
		    $('#nav-mobNav .console').toggleClass('open');
		    $('.smDashHead').toggleClass('open');
		    if ($(".categoryMenu").hasClass("open")) {
		        $(".categoryMenu").toggleClass("open");
		        $('.smShopHead').toggleClass('open');
		    }
		});
		$('.smShopHead').click(function () {
		    $('.categoryMenu').toggleClass('open');
		    $('.smShopHead').toggleClass('open');
		    if ($("#nav-mobNav .console").hasClass("open")) {
		        $("#nav-mobNav .console").toggleClass("open");
		        $('.smDashHead').toggleClass('open');
		    }
		});

		$('.dnnPasswordReset').append('<h1>Change Password</h1>');
		$('#dnn_centerPane2').append($('.dnnPasswordResetContent'));

		setTimeout(function () {
		    if ($('.pb-scroll-wrapper').length > 0 && $(window).width() < 768) {
		        $('.navbar-fixed-top').css('top', '66px');
		        var skinPadding = parseInt($('.skinWrapper').css('padding-top').slice(0, -2));
		        skinPadding = skinPadding + 47;
		        $('.skinWrapper').css('padding-top', skinPadding);
		    }
		}, 1000);


		$(document).keyup(function (e) {
		    if (e.keyCode == 27) { // escape key maps to keycode `27`
		        window.location.replace("/login");
		    }
		});
		
});

Module_ViewSet = {
    isUserLoggedIn: false,
    addRemoveCartCookieItem: function (isAdd, qty, rmQty) {

        if (rmQty != undefined && rmQty != 0 && $.isNumeric(rmQty)) {
            Module_CookieHelper.set(Module_CookieHelper.cookie_Items_InCart, parseInt(Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart)) - parseInt(rmQty));
        }
        if (isAdd) {
            if ($.isNumeric(Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart))) {
                Module_CookieHelper.set(Module_CookieHelper.cookie_Items_InCart, parseInt(Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart)) + parseInt(qty));
            }
            else {
                Module_CookieHelper.set(Module_CookieHelper.cookie_Items_InCart, parseInt(qty));
            }

        }
        else {
            if (parseInt(Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart)) > 0) {
                Module_CookieHelper.set(Module_CookieHelper.cookie_Items_InCart, parseInt(Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart)) - parseInt(qty));
            }
        }
        if (parseInt(Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart)) < 0) {
            Module_CookieHelper.set(Module_CookieHelper.cookie_Items_InCart, 0);
        }
    },
    bindToLoginButton:function()
    {
        if($("#dnn_ctr558_Login_Login_DNN_cmdLogin").val()!=undefined)
        {
            $("#dnn_ctr558_Login_Login_DNN_cmdLogin").click(function () {
                Module_AjaxHelper.get_Http_ForCookieSetOrGet(Module_AjaxHelper.get_UserProfileType());
                return true;
            });
        }
    },
    bindToLogoutButton:function()
    {
        ($(".LoginLink").attr('title') == 'Logout' ? $(".LoginLink").click(
            function () {
                Module_CookieHelper.clearLoginCookies();
                return true;
            }) : '');
        ($("#dnn_dnnLogin_enhancedLoginLink").attr('title') == 'Logout' ? $("#dnn_dnnLogin_enhancedLoginLink").click(
            function () {
                Module_CookieHelper.clearLoginCookies();
                return true;
            }) : '');
        
    },
    getQueryStringParameterValue:function(parameterName)
    {
        parameterName = parameterName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + parameterName + "=([^&#]*)"),
            result = regex.exec(location.search);
        return result === null ? "" : decodeURIComponent(result[1].replace(/\+/g, " "));
    }
}
