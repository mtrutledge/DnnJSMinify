jQuery(function ($) {

    function CheckChanged() {
        var chk = $('#chksetpassword');
        if (chk.attr('checked')) {
            $('#hcFirstPasswordForm').slideDown();
        }
        else {
            $('#hcFirstPasswordForm').slideUp();
        }
    }

    function SetFirstPassword() {
        //$('#changing').show();
        $("#hcSetFirstPassword").ajaxLoader("start");
        $('#hcPasswordMessage').html('');

        var userid = $('#userid').val();
        var passwordfield = $('#password').val();
        var orderbvinfield = $('#orderbvin').val();

        $.post(hcc.getServiceUrl("account/setfirstpassword"),
                {
                    "userid": userid,
                    "password": passwordfield,
                    "orderbvin": orderbvinfield
                },
                function (data) {
                    //$('#changing').hide();
                    $("#hcSetFirstPassword").ajaxLoader("stop");
                    if (data.Success == "True" || data.Success == true) {
                        $('#hcPasswordMessage').html('<div class="dnnFormMessage dnnFormSuccess">Your password is now set. Thank You!</div>');
                        $("#hcFirstPasswordForm").hide();
                        $("#chksetpassword").parent().hide();
                    }
                    else {
                        $('#hcPasswordMessage').html('<div class="dnnFormMessage dnnFormWarning">' + data.Messages + '</div>');
                    }
                },
                "json")
                .error(function () {
                    //$('#changing').hide();
                    $("#hcSetFirstPassword").ajaxLoader("stop");
                    $('#hcPasswordMessage').html('<div class="dnnFormMessage dnnFormError">Ajax error. contact administrator</div>');
                })
                .complete(function () {
                    //$('#changing').hide();
                    $("#hcSetFirstPassword").ajaxLoader("stop");
                });
    }

    // Inititalization 

    $('#chksetpassword').click(function () { CheckChanged(); return true; });
    $('#setpasswordbutton').click(function () { SetFirstPassword(); return false; });
    CheckChanged();
});


