function mobileMenu() {
    $("header .mainNavLinks ul li").eq(0).find("a").find("span").prepend('<i class="fa fa-book"></i>')
}
function boxHeights() 
{
    $('.tripleHeight').each(function(){
        if($(this).parent('.tiles').length > 0){
            var boxWidth = $(this).width() + 10;
            var boxHeight =	boxWidth * 3;
            $(this).height(boxHeight);
        }
        else{
            var boxWidth = $(this).width() + 30;
            var boxHeight =	boxWidth * 3;
            $(this).height(boxHeight);
        }
			
    });
    $('.doubleHeight').each(function(){
        if($(this).parent('.tiles').length > 0){
            var boxWidth = $(this).width() + 10;
            var boxHeight =	boxWidth * 2;
            $(this).height(boxHeight);
        }
        else{
            var boxWidth = $(this).width() + 30;
            var boxHeight =	boxWidth * 2;
            $(this).height(boxHeight);
        }
			
    });
    $('.fullHeight').each(function(){
        if($(this).parent('.tiles').length > 0){
            var boxWidth = $(this).width() + 10;
            var boxHeight =	boxWidth;
            $(this).height(boxHeight);
        }
        else{
            var boxWidth = $(this).width() + 30;
            var boxHeight =	boxWidth;
            $(this).height(boxHeight);
        }
			
    });
    $('.threeFourthsHeight').each(function(){
        if($(this).parent('.tiles').length > 0){
            var boxWidth = $(this).width() + 10;
            var boxHeight =	boxWidth * .75;
            $(this).height(boxHeight);
        }
        else{
            var boxWidth = $(this).width() + 30;
            var boxHeight =	boxWidth * .75;
            $(this).height(boxHeight);
        }
			
    });
    $('.halfHeight').each(function(){
        if($(this).parent('.tiles').length > 0){
            var boxWidth = $(this).width() + 10;
            var boxHeight =	boxWidth * .5;
            $(this).height(boxHeight);
        }
        else{
            var boxWidth = $(this).width() + 30;
            var boxHeight =	boxWidth * .5;
            $(this).height(boxHeight);
        }
    });
    $('.oneFourthHeight').each(function(){
        if($(this).parent('.tiles').length > 0){
            var boxWidth = $(this).width() + 10;
            var boxHeight =	boxWidth *.25;
            $(this).height(boxHeight);
        }
        else{
            var boxWidth = $(this).width() + 30;
            var boxHeight =	boxWidth *.25;
            $(this).height(boxHeight);
        }
			
    });
    $('.twoThirdsHeight').each(function(){
        if($(this).parent('.tiles').length > 0){
            var boxWidth = $(this).width() + 30;
            var boxHeight =	boxWidth * .666;
            $(this).height(boxHeight);
        }
        else{
            var boxWidth = $(this).width() + 30;
            var boxHeight =	boxWidth * .666;
            $(this).height(boxHeight);
        }
    });
    $('.oneThirdHeight').each(function(){
        if($(this).parent('.tiles').length > 0){
            var boxWidth = $(this).width() + 10;
            var boxHeight =	boxWidth * .333;
            $(this).height(boxHeight);
        }
        else{
            var boxWidth = $(this).width() + 30;
            var boxHeight =	boxWidth * .333;
            $(this).height(boxHeight);
        }
    });

    $('.rectTile').each(function () {
        if ($(window).width() > 767) {
            var imgLink = $(this).find('.tileContent').find('a').data('imgre');
            $(this).find('.tileContent').find('a').empty();
            var img = "<img src='" + imgLink + "'>";
            $(this).find('.tileContent').find('a').append(img);
        }
        else {
            var imgLink = $(this).find('.tileContent').find('a').data('imgsq');
            $(this).find('.tileContent').find('a').empty();
            var img = "<img src='" + imgLink + "'>";
            $(this).find('.tileContent').find('a').append(img);
        }
    });

    $('.hundredHeight').each(function(){
        if($(this).closest('.tiles').length > 0){
            var boxHeight =	$(this).parent().height() - 10;
            $(this).height(boxHeight);
        }
        else{
            var boxHeight =	$(this).parent().height() - 30;
            $(this).height(boxHeight);
        }
    });
    $('.heightHundred').each(function () {
        $('.heightHundred').height($('.heightHundred').parent().height())
    });
    $('.loading').height($(window).height());

    
}

function contentHeaderHeight() {
    var windowHeight = $(window).height();
    var navHeight = $('header').height() - 30;
    var height = windowHeight * .91;
    height = height - navHeight;
    if ($('form').hasClass('showControlBar')) {
        height = height - 53;
        $('.contentHeader').css('min-height',height);
    }
    else {
        $('.contentHeader').css('min-height', height);
    }
}

$(document).on('click', '.toDoItem', function () {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
    }
    else {
        $('.toDoItem').removeClass('active');
        $(this).addClass('active');
        var headerHeight = $('header').height();
        var contentPosition = $(this).find('.toDoContent').offset().top;
        var scrollPosition = contentPosition - headerHeight - 100;
        $(window).scrollTop(scrollPosition);
    }
});

$(document).on('click', '.mobileNavBtn', function () {
    $(".mobileNav").toggle("slow");
});

$(document).on('click', '.whyUsTab', function () {
    $('.whyUsTab').removeClass('active');
    $('.whyUsPanel').removeClass('active');
    var tab = $(this).data('tabname');
    $(this).addClass('active');
    $('.whyUsContent').load('/Why-Us/' + tab + ' .whyUsPanel');
    $(window).scrollTop(0);
});
$(document).on('click', '.whyUsNext', function () {
    $('.whyUsTab').removeClass('active');
    $('.whyUsPanel').removeClass('active');
    var tab = $(this).data('tabname');
    $('.whyUsNav').find(("[data-tabname='" + tab + "']")).addClass('active');
    $('.whyUsContent').load('/Why-Us/' + tab + ' .whyUsPanel');
    $(window).scrollTop(0);
});

$(window).scroll(function () {
    var whyUsHeaderHeight = $('.whyUsHeader').height();
    if ($(window).scrollTop() >= whyUsHeaderHeight)
        $('.whyUsNav').addClass('sticky');
    else
        $('.whyUsNav').removeClass('sticky');
});

$(document).ready(function () {
    
    $(function () {
        if ($('form').hasClass('showControlBar')) {
            $('header').addClass('admin');
            $('.mainContent').addClass('admin');
            $('.whyUsNav').addClass('admin');
        }
    });
    mobileMenu();

    boxHeights();
    contentHeaderHeight()

    $(window).resize(function () {
        boxHeights();
        contentHeaderHeight()
    });
});

$(document).ajaxStart(function () {
    $('.loading').css('display', 'block');
});

$(document).ajaxStop(function () {
    $('.loading').css('display', 'none');
});

