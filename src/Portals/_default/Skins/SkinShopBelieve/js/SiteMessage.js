﻿var Module_SiteMessage=
    {
        divErrorID:"bgAlertDanger",
        divSuccessID:"bgAlertSuccess",
        divWarningID:"bgAlertWarning",

        show_Error:function (message,timeout)
        {
            $("#" + Module_SiteMessage.divErrorID).html(message);
            $("#" + Module_SiteMessage.divErrorID).fadeIn('fast');
            $('html, body').animate({
                scrollTop: $("#bgAlertDanger").offset().top - 300
            }, 2000);
            if (timeout !== undefined)
                $("#" + Module_SiteMessage.divErrorID).delay(timeout).fadeOut('slow');
        },
        show_Warning:function (message,timeout)
        {
            $("#" + Module_SiteMessage.divWarningID).html(message);
            $("#" + Module_SiteMessage.divWarningID).fadeIn('fast');
            $('html, body').animate({
                scrollTop: $("#bgAlertWarning").offset().top - 300
            }, 2000);
            if (timeout !== undefined)
                $("#" + Module_SiteMessage.divWarningID).delay(timeout).fadeOut('slow');
        },
        show_Success:function(message,timeout)
        {
            $("#" + Module_SiteMessage.divSuccessID).html(message);
            $("#" + Module_SiteMessage.divSuccessID).fadeIn('fast');
            $('html, body').animate({
                scrollTop: $("#bgAlertSuccess").offset().top - 300
            }, 2000);
            if (timeout !== undefined)
                $("#" + Module_SiteMessage.divSuccessID).delay(timeout).fadeOut('slow');
        },
        clear:function()
        {
            $("#" + Module_SiteMessage.divErrorID).hide();
            $("#" + Module_SiteMessage.divSuccessID).hide();
            $("#" + Module_SiteMessage.divWarningID).hide();
        }
    }