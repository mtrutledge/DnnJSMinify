var Module_SelectASchool =
   {
       ddlStateID: "ddlSchoolState",
       ddlSchoolID: "ddlselectaschool",
       skipRedirectUrl: "",
       continueRedirectUrl:"",
       isStateValueValid: function () {
           var stateValue = this.get_StateValue();
           if (stateValue != '' && stateValue != 'State') {
               setTimeout(function () {
                   Module_CookieHelper.setCookie(Module_CookieHelper.cookie_School_SelectedSTATE, stateValue);
               }, 500);
               return true;
           }
           return false;
       },
       get_StateValue: function () {
           return $("#" + this.ddlStateID + " option:selected").val();
       },
       isSchoolValueValid: function ()
       {
           if (($("#" + this.ddlSchoolID).val() != undefined) && ($("#" + this.ddlSchoolID).val().length > 0)) {
               if (Module_CookieHelper.get("ssOPID").length > 0) {
                   return true;
               }
               else {
                   return false
               }
           }
           else {
               return false;
           }
       },
       onChange_SelectAState_Input: function () {
           $("#" + this.ddlSchoolID).autocomplete("option", "disabled", !Module_SelectASchool.isStateValueValid());
       },
       skipSelectingSchool:function()
       {
           Module_CookieHelper.setCookie(Module_CookieHelper.cookie_School_Skipped, "true");
           return true;
       },
       nextButtonClick:function()
       {
           var msg = '<ul>';
           if (!this.isStateValueValid()) {
               msg += "<li>You must select a State</li>";
           }

           if (!this.isSchoolValueValid()) {
               msg += "<li>You must select a group</li>";
           }
           msg += '</ul>';
           if (msg != '<ul></ul>') {
               Module_SiteMessage.show_Error(msg, 5000);
               return false;
           }
           return true;
       }
   }
