﻿var Module_RedirectHelper =
   {
       redirectHost: window.location.protocol + "//" + window.location.host + "/",
       redirectPageChooseSeller: "ChooseSeller",
       redirect_To_Url: function (redirectPage) {
           if (redirectPage != '') {
                   window.location.replace(redirectPage);
           }
       }
   }