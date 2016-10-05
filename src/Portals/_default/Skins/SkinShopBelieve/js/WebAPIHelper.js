﻿var Module_AjaxHelper =
   {
       ajaxRestHost: '//api.believebackoffice.com/api/ShopBelieve/ShopBelieveHelper/',
       ajaxRestUserHelperHost: '/DesktopModules/Believe.DotNetNuke.Modules.BelieveKids/mQueryHelper/UserHelper.aspx',
       ajaxRequestUserHelperGetUserType: '?GetUserProfile=True',
       ajaxRequestUserHelperGetIsLoggedIn: '?IsUserLoggedIn=true',
       ajaxRequestUserHelperSetUserType: '?SelectedUserType=',
       ajaxRequestUserAddStudents:'?AddStudents=true',
       ajaxMethod_GetSchoolThatAreRunningFunds_ParmSchool_ParmState: "GetSchoolThatAreRunningFunds",
       ajaxMethod_GetStartupCookies: "GetStartupCookies",
       ajaxMethod_GetTemp: "WeatherCheck",
       get_SchoolThatAreRunningFunds_Url: function (schoolname,state) {
           return "/DesktopModules/Believe.DotNetNuke.Modules.BelieveKids/API/Fundraiser/" + Module_AjaxHelper.ajaxMethod_GetSchoolThatAreRunningFunds_ParmSchool_ParmState + "?schoolName=" + schoolname.trim() + "&state=" + state.trim();
       },
       get_UserProfileType:function()
       {
           return Module_AjaxHelper.ajaxRestUserHelperHost + Module_AjaxHelper.ajaxRequestUserHelperGetUserType;
       },
       get_IsUserLoggedIn:function()
       {
           return Module_AjaxHelper.ajaxRestUserHelperHost + Module_AjaxHelper.ajaxRequestUserHelperGetIsLoggedIn;
       },
       get_AddStudentURL:function()
       {
           return window.location.origin + Module_AjaxHelper.ajaxRestUserHelperHost + Module_AjaxHelper.ajaxRequestUserAddStudents;
       },
       set_UserProfileType: function (userType) {
           return window.location.origin + Module_AjaxHelper.ajaxRestUserHelperHost + Module_AjaxHelper.ajaxRequestUserHelperSetUserType + userType;
       },
       get_StartupCookies:function()
       {
           return window.location.origin + Module_AjaxHelper.ajaxRestUserHelperHost + "/" + Module_AjaxHelper.ajaxMethod_GetStartupCookies;
       },
       get_Tempature_Url:function(zipCode)
       {
           return Module_AjaxHelper.ajaxRestHost + Module_AjaxHelper.ajaxMethod_GetTemp + "/" + zipCode;
       },
       get_AvgTempForZip:function(zipCode)
       {
           $.ajax({
               url: Module_AjaxHelper.get_Tempature_Url(zipCode),
               contentType: 'application/jsonp; charset=utf-8;',
               success: function (data, textstatus, XMLHttpRequest) {
                   return $.parseJSON(data).AvgMaxF;
               }
           });
          
       },
       set_AddStudents:function()
       {
           $.ajax({
               url: Module_AjaxHelper.get_AddStudentURL(),
               contentType: 'application/jsonp; charset=utf-8;',
               success: function (data, textstatus, XMLHttpRequest) {

               }
           });
       },
       get_Http_ForCookieSetOrGet:function (url)
       {
           $.ajax({
               url: url,
               contentType: 'application/jsonp; charset=utf-8;',
               success: function (data, textstatus, XMLHttpRequest) {
                   if (data.indexOf("DOCTYPE") == -1) {
                       if (data.indexOf(Module_CookieHelper.cookie_BelieveUserProfileType) != -1) {
                           $.each(data.split(','), function (index, data) {
                               var str = data + "";
                               if (str.indexOf(Module_CookieHelper.cookie_BelieveUserProfileType) != -1) {
                                   var so = str.split('~');
                                   Module_CookieHelper.set(Module_CookieHelper.cookie_BelieveUserProfileType, so[1]);
                               }
                               if (str.indexOf(Module_CookieHelper.cookie_IsUserLoggedIn) != -1) {
                                   var so = str.split('~');
                                   Module_CookieHelper.set(Module_CookieHelper.cookie_IsUserLoggedIn, so[1]);
                               }
                               if (str.indexOf(Module_CookieHelper.cookie_Parent_Sponsor_InitialLogin) != -1) {
                                   var so = str.split('~');
                                   Module_CookieHelper.set(Module_CookieHelper.cookie_Parent_Sponsor_InitialLogin, so[1]);
                               }
                           });
                       }
                   }
               }
           });

       }

   }