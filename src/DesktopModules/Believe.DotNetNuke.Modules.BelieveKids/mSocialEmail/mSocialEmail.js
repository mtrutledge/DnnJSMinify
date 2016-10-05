var Module_SocialEmail =
    {
        googleLoginAttempt: 0,
        clientId: '535124171682-mlnt8vqd97vat2hbubeouqm46n2utk5a.apps.googleusercontent.com',
        GAT: "",
        GAT_Startindex: 0,
        scopes: 'https://www.googleapis.com/auth/contacts.readonly',
        lastLoadedGoogleContacts: [],
        kendoGridDataSource: [],
        contactsEmailsHaveBeenSentTo: [],
        contactsToSendEmailsTo: [],
        workingOnCheckboxes: false,
        selectedStudent: {},
        areStudentsSelected: function(sender, args){
            return ($("#selectedStudents").text().length > 0);
        },
        areEmailsSelected: function (sender, args) {
            return ($("#hdnSelectedEmails").val().length > 0);
        },
        showSelectedStudents: function () {
            $('.studentNames').text($("#selectedStudents").text());
        },
        addEmail: function (name, email, cellPhone, importedFrom) {
            $('.emailSocialLoading').css('display', 'block');
            $.ajax({
                async: true,
                type: 'POST',
                url: '/DesktopModules/Believe.DotNetNuke.Modules.BelieveKids/API/ShareFund/AddEmail',
                data: { 'EmailContactID': -1, 'ParentsDnnUserID': cuid, 'Email': email, 'CellPhone': cellPhone, 'DisplayName': name, 'ImportedFrom': importedFrom, 'OPID': Module_CookieHelper.getCookie(Module_CookieHelper.cookie_School_SelectedOPID) },
                dataType: 'json',
                beforeSend: function (jqXHR, settings) {
                    // TODO: Check if email exists already. if so return
                },
                success: function (data) {
                    $('.emailSocialLoading').css('display', 'none');
                    $("#txtEmailName").val('');
                    $("#txtEmail").val('');
                    $("#txtCellPhone").val('');
                    $("#dgEmails").bootgrid("reload");
                }
            });
        },
        addEmailList: function (collection) {
            $('.emailSocialLoading').css('display', 'block');
            $.ajax({
                async: true,
                type: 'POST',
                url: '/DesktopModules/Believe.DotNetNuke.Modules.BelieveKids/API/ShareFund/AddEmailList',
                data: { '': collection },
                dataType: 'json',
                beforeSend: function (jqXHR, settings) {
                    if(collection == undefined || collection.length == 0)
                        return false;
                },
                success: function (data) {
                    $("#dgEmails").bootgrid("reload");
                },
                complete: function(){
                    $('.emailSocialLoading').hide();
                    setTimeout(function () { $("#dgEmails").bootgrid('select', ''); }, 500);
                }
            });
        },
        helloNetwork: function (network, path) {
            var net = hello(network);
            // Set force to false, to avoid triggering the OAuth flow if there is an unexpired access_token available.
            net.login({force: false}).then(function() {
                net.api(path, function responseHandler(r) {
                    var contacts = [];
                    for(var i=0;i<r.data.length;i++){
                        var c = r.data[i];
                        var mobile = '';

                        $.each(c.fields, function (index, f) {
                            if ((f.type != undefined && f.type.toLowerCase() == "phone") && (f.flags != undefined && f.flags.toLowerCase() == "mobile"))
                            {
                                mobile = f.value;
                                return;
                            }
                        });

                        if ((c.email != "") && (c.name != "")) {
                            contacts.push({ 'EmailContactID': -1, 'ParentsDnnUserID': cuid, 'Email': c.email, 'CellPhone': mobile, 'DisplayName': c.name, 'ImportedFrom': network, 'OPID': Module_CookieHelper.getCookie(Module_CookieHelper.cookie_School_SelectedOPID) });
                        }

                    }

                    if (contacts.length > 0) {
                        Module_SocialEmail.addEmailList(contacts);
                    }
                });
            });
        },
        importYahooContacts: function () {
            Module_SocialEmail.helloNetwork('yahoo', 'me/friends');
        },
        importOutlookContacts: function () {
            Module_SocialEmail.helloNetwork('windows', 'me/contacts');
        },
        importGoogleContacts: function (attemptAutoLogin) {
            gapi.auth.authorize({ client_id: Module_SocialEmail.clientId, scope: Module_SocialEmail.scopes, immediate: attemptAutoLogin }, this.handleAuthResult);
        },
        handleClientLoad: function () {
            window.setTimeout(gapi.auth.init, 1);
        },
        googleSecondAuthBtnLoc: function () {
            buttonLoc = ($(window).height() / 2) + $(window).scrollTop();
            $('.googleSecondAuthContent').css('top',buttonLoc +'px')
        },
        handleAuthResult: function (authResult) {
            delete authResult['g-oauth-window'];
            if (authResult && !authResult.error) {
                $(".googleSecondAuth").hide();
                Module_SocialEmail.fetchGoogleContacts(authResult.access_Token);
            }
            else if (Module_SocialEmail.googleLoginAttempt == 0)
            {
                Module_SocialEmail.googleLoginAttempt = 1;
                
                $(".googleSecondAuth").show();
                Module_SocialEmail.googleSecondAuthBtnLoc();
            }
        },
        fetchGoogleContacts: function (accessToken) {
            $('.emailSocialLoading').css('display', 'block');
            var authParms = gapi.auth.getToken();
            if (authParms != undefined) {
                authParms.alt = 'json';
                $.ajax({
                    url: "//www.google.com/m8/feeds/contacts/default/full?max-results=7000",
                    contentType: 'application/jsonp; charset=utf-8;',
                    dataType: 'jsonp',
                    data: authParms,
                    async: false,
                    beforeSend: function () {
                        $('.emailSocialLoading').show();
                    },
                    success: function (data, textstatus, XMLHttpRequest) {
                        
                        Module_SocialEmail.loadGoogleContacts(data);
                    }
                });
            }
        },
        loadGoogleContacts: function (data) {
            Module_SocialEmail.lastLoadedGoogleContacts = [];
            cnt = 0;
            try {
                $.each(data.feed.entry, function (index, d) {
                    if ((d != undefined) && (d != "")) {
                        var c = {};
                        c.name = d.title.$t;
                        c.from = "Google";
                        try {
                            c.cellPhone = d.gd$phoneNumber[0].$t;
                        }
                        catch (phoneEx) {
                            c.cellPhone = '';
                        }

                        addedEmail = false;
                        try {
                            $.each(d.gd$email, function (index2, e) {
                                if (e.primary == "true") {
                                    c.email = e.address;
                                    addedEmail = true;
                                }
                            });
                        } catch (e) { }
                        if (addedEmail == false) {
                            try {
                                c.email = d.gd$email[0].address;

                            }
                            catch (e) {

                            }
                        }


                        if ((c.email != "") && (c.name != "")) {
                            Module_SocialEmail.lastLoadedGoogleContacts.push({ 'EmailContactID': -1, 'ParentsDnnUserID': cuid, 'Email': c.email, 'CellPhone': c.cellPhone, 'DisplayName': c.name, 'ImportedFrom': 'Google', 'OPID': Module_CookieHelper.getCookie(Module_CookieHelper.cookie_School_SelectedOPID) });
                        }
                    }
                });
            }
            catch (e) {

            }

            Module_SocialEmail.addEmailList(Module_SocialEmail.lastLoadedGoogleContacts);
        },
        removeEmail:function(emailContactID)
        {
            $('.emailSocialLoading').css('display', 'block');
            $.ajax({
                
                async: true,
                type: 'POST',
                url: '/DesktopModules/Believe.DotNetNuke.Modules.BelieveKids/API/ShareFund/RemoveEmail',
                data: { 'EmailContactID': emailContactID, 'ParentsDnnUserID': '', 'Email': '', 'CellPhone': '', 'DisplayName': '', 'ImportedFrom': '', 'OPID': '' },
                dataType: 'json',
                success: function (data) {
                    $('.emailSocialLoading').css('display', 'none');
                    $("#dgEmails").bootgrid("reload");
                }
            });
        },

        hideStep1: function (eventObject) {
            $('#divShare1stStep').css('display', 'none');
        },
        hideStep2: function (eventObject) {
            $("#hdnSelectedStudentID").val('');
            $("#selectedStudents").text('');
            Module_SocialEmail.showSelectedStudents();
            $('#divShareStep2').css('display', 'none');
        },
        hideStep3: function (eventObject) {
            $('#divShareStep3').css('display', 'none');
        },

        showStep1: function (eventObject) {
            $(document).scrollTop(0);
            $('#divShare1stStep').css('display', 'block');
        },
        showStep2: function (eventObject) {
            $(document).scrollTop(0);
            var sid = $(eventObject.currentTarget).data('sid');
            var deepLink = $(eventObject.currentTarget).find('input[type=hidden]:first').val();
            $(".deepLnk").text(deepLink);
            $("#hdnSelectedStudentID").val($(eventObject.currentTarget).data('sid'));
            $("#studentNameHeader").text($(eventObject.currentTarget).data('sname'));
            $("#selectedStudents").text($(eventObject.currentTarget).data('sname'));
            Module_SocialEmail.showSelectedStudents();
            $('#divShareStep2').css('display', 'block');
        },
        showStep3: function (eventObject) {
            $(document).scrollTop(0);
            $('#divShareStep3').css('display', 'block');
        }
    }




