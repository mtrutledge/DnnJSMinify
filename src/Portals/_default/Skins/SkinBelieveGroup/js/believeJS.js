// JavaScript Document
$(document).ready(function(){
		function setHeight() {
			windowHeight = $(window).innerHeight();
			$('.fullHeightBox').css('height', windowHeight);
		  };
		  setHeight();
		  
		  $(window).resize(function() {
			setHeight();
		  });
	  
		$( window ).scroll(function() {
			if($(window).width() > 1024){
				if($(window).scrollTop() > 100){
				    $('.navbar-logo img').css({ 'width': '65%' });
				    $('.navbar-logo').css({ 'padding': '13px 0' });
					$('.head-top .navbar-nav>li>a, .hc-minicart .hc-iconbox a, .navbar-right .registerGroup a, .navbar-right .loginGroup a').css({ 'padding': '3px 10px' });
					$('.head-top .navbar-nav>li>a').css({ 'margin': '12px 0px' });
					$('.navbar-form').css({ 'margin': '8px 15px' });
					$('#hcMiniCartTooltip').css({ 'top': '20px' });
                    
				 }
				 else{
				    $('.navbar-logo img').css({ 'width': '95%' });
				    $('.navbar-logo').css({ 'padding': '15px 0' });
					$('.head-top .navbar-nav>li>a, .hc-minicart .hc-iconbox a, .navbar-right .registerGroup a, .navbar-right .loginGroup a').css({ 'padding': '10px 10px' });
					$('.head-top .navbar-nav>li>a').css({ 'margin': '15px 0px' });
					$('.navbar-form').css({ 'margin': '18px 15px' });
					$('#hcMiniCartTooltip').css({ 'top': '35px' });
				 }
			}
			if($(window).width() > 768 && $(window).width() <= 1024){
				if($(window).scrollTop() > 100){
					$('.navbar-logo img').css({'width': '65%'});
					$('.head-top .navbar-nav>li>a, .hc-minicart .hc-iconbox a, .navbar-right .registerGroup a, .navbar-right .loginGroup a').css({ 'padding': '2px 20px' });
					$('.navbar-form').css({ 'margin': '10px 20px' });
				 }
				 else{
					$('.navbar-logo img').css({'width': '100%'});
					$('.head-top .navbar-nav>li>a, .hc-minicart .hc-iconbox a, .navbar-right .registerGroup a, .navbar-right .loginGroup a').css({ 'padding': '8px 20px' });
					$('.navbar-form').css({ 'margin': '16px 20px' });
				 }
			}
		});
	
		$(".buttonMobile").click(function() {
				 $("#nav-mobNav").toggleClass("open");
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
			if ($('form').hasClass('showControlBar')) $('.navbar-fixed-top').addClass('admin');
		});

        
        $('.banner').unslider({
            speed: 500,               //  The speed to animate each slide (in milliseconds)
            delay: 3000,              //  The delay between slide animations (in milliseconds)
            complete: function() {},  //  A function that gets called after every slide animation
            keys: true,               //  Enable keyboard (left, right) arrow shortcuts
        });
        var unslider = $('.banner').unslider();
    
        $('.unslider-arrow').click(function() {
            var fn = this.className.split(' ')[1];
        
            //  Either do unslider.data('unslider').next() or .prev() depending on the className
            unslider.data('unslider')[fn]();
        });
		
	});
