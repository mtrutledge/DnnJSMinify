var Module_SelectUserType=
    {
        set_UserType:function(type)
        {
            if (type != 'Sponsor') {
                Module_SelectUserType.hideSponsorPasswordModule();
            }
            Module_CookieHelper.set(Module_CookieHelper.cookie_BelieveUserProfileType, type);
            $.ajax({
                type: 'GET',
                url: Module_AjaxHelper.set_UserProfileType(type) + '&AddStudents=true',
                contentType: 'application/jsonp; charset=utf-8;',
                success: function (a, b, c) {
                    Module_CookieHelper.set(Module_CookieHelper.cookie_BelieveUserProfileType, type);

                    if (type == 'Supporter') {
                        window.location.href = '/Shop';
                    }
                    else {
                        window.location.href = '/Dashboard';
                    }
                }
            });
        },
        showSponsorPasswordModule:function()
        {
            $("#SponsorPasswordModule").attr('style', 'display:block;');
            $("#divmSelectSchool").attr('style', 'display:block;');

        },
        hideSponsorPasswordModule:function()
        {
            $("#SponsorPasswordModule").attr('style', 'display: none;');
            $("#divmSelectSchool").attr('style', 'display: none;');
        },
        loadSponsorBoxes:function()
        {
            if((Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSTATE)!='')&&(Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSCHOOL)!=''))
            {
              //  $("#ddlSchoolstate")
                //ddlSchoolstate
                //ddlselectaschool
            }
        },
        validateSponsorPassword:function(ctl)
        {
            var isValid = false;
            if ($(ctl).val().toLowerCase() == 'easy')
            {
                if (
                (Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSCHOOL) != '')
                && (Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSCHOOL) != undefined)
                && (Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSTATE) != '')
                && (Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSTATE) != undefined)
                ) {
                    isValid = true;
                    Module_SelectUserType.set_UserType('Sponsor');
                }
                else {
                    Module_SiteMessage.show_Error('Please select State and School');
                }
            }
            else
            {
                Module_SiteMessage.show_Error('Invalid Password');
            } 

            return isValid;
        }
    }