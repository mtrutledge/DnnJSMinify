var Module_SelectStudent =
   {
       firstNameID: "txtFirstName",
       lastNameID: "txtLastName",
       parentEmailID: "txtParentEmail",
       leaderNameID: "txtLeaderName",
       gradeID: "ddlGrade",
       continueRedirectUrl: "",
       IsFormValid: function (checkDuplicates) {
           var isValid = true;
           var msg = 'You must enter the following:<ul>';
           if ($("#" + Module_SelectStudent.firstNameID).val().length == 0) {
               isValid = false;
               msg += '<li>First Name</li>';
           }

           if ($("#" + Module_SelectStudent.lastNameID).val().length == 0) {
               isValid = false;
               msg += '<li>Last Name</li>';
           }

           if ($("#" + Module_SelectStudent.parentEmailID).val().length > 0) {
               // check for valid email
               var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

               if (reg.test($("#" + Module_SelectStudent.parentEmailID).val()) == false) {
                   isValid = false;
                   msg += '<li>Email must be in correct format: example@domain.com</li>';
               }
           }

           if (isValid && checkDuplicates)
            {
               var existingStudent = Module_CookieHelper.getStudentFromCookieArray($("#" + Module_SelectStudent.firstNameID).val(), $("#" + Module_SelectStudent.lastNameID).val(), $("#" + Module_SelectStudent.parentEmailID).val());
               if(existingStudent != undefined)
               {
                   isValid = false;
                   msg += '<li>You can not add the same student.</li>';
               }
           }

           msg += '</ul>';

           if (!isValid)
               Module_SiteMessage.show_Error(msg, 3000);

           return isValid;
       },
       clearFields: function () {
           $("#" + Module_SelectStudent.firstNameID).val('');
           $("#" + Module_SelectStudent.lastNameID).val('');
           $("#" + Module_SelectStudent.parentEmailID).val('');

           $("#" + Module_SelectStudent.leaderNameID).val('');
           $("#" + Module_SelectStudent.gradeID).val('');
       },
       cancelEdit: function() {
           Module_SelectStudent.clearFields();
       },
       addStudentToCookie: function () {
           if (Module_SelectStudent.IsFormValid(true)) {
               var addedStudent = Module_CookieHelper.addCookieStudentArray($("#" + Module_SelectStudent.firstNameID).val(), $("#" + Module_SelectStudent.lastNameID).val(), $("#" + Module_SelectStudent.parentEmailID).val(), 0, Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedOPID), Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSCHOOL), 0, Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSCHOOLIsTaxIncluded), Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSTATE), $("#" + Module_SelectStudent.leaderNameID).val(), $("#" + Module_SelectStudent.gradeID).val());

               if (Module_CookieHelper.getCookie(Module_CookieHelper.cookie_BelieveUserProfileType) == 'Parent') {
                   this._PostStudent(addedStudent);
               }

               Module_SelectStudent.splitCreditsEven();
               Module_SelectStudent.getHtmlGrid();
               Module_SelectStudent.clearFields();
               return true;
           }

           return false;
       },
       updateStudentToCookie: function () {
           if (Module_SelectStudent.IsFormValid(false)) {

               var divID = $("#btnUpdateSeller").data("editing");
               var student = Module_CookieHelper.getStudentFromCookieArray($("#" + divID + " .sellerFirstName").text(), $("#" + divID + " .sellerLastName").text(), $("#" + divID + " .sellerParentEmail").text());

               student.FirstName = $("#" + Module_SelectStudent.firstNameID).val();
               student.LastName = $("#" + Module_SelectStudent.lastNameID).val();
               student.ParentsEmailAddress = $("#" + Module_SelectStudent.parentEmailID).val();
               student.LeaderName = $("#" + Module_SelectStudent.leaderNameID).val();
               student.Grade = $("#" + Module_SelectStudent.gradeID).val();

               // Update Student To Cookie
               Module_CookieHelper.setCookie(Module_CookieHelper.cookie_School_SelectedSellerArray, Module_CookieHelper.students);

               Module_SelectStudent.getHtmlGrid();

               $("#btnCancelEdit").hide();
               $("#btnUpdateSeller").hide();
               $("#btnAddSeller").show();
               $("#btnSellerContinue").show();
               Module_SelectStudent.clearFields();
               return true;
           }

           return false;
       },
       _PostStudent: function (student) {
           student.ParentsDnnUserID = cuid;
           $.ajax({
               type: 'POST',
               url: '/DesktopModules/Believe.DotNetNuke.Modules.BelieveKids/API/Student/AddStudent',
               data: student,
               dataType: 'json',
               success: function (data) {
                   var updatedStudent = JSON.parse(data);
                   var existingStudent = Module_CookieHelper.getStudentFromCookieArray(student.FirstName, student.LastName, student.ParentsEmailAddress);

                   existingStudent.StudentID = updatedStudent.StudentID;
                   existingStudent.ParentsDnnUserID = updatedStudent.ParentsDnnUserID;

                   Module_CookieHelper.setCookie(Module_CookieHelper.cookie_School_SelectedSellerArray, Module_CookieHelper.students);
               }
           });
       },
       addCreditToStudent: function (fname, lname, pemail) {
           if (Module_SelectStudent.getUnAllocatedCreditCount() != 0) {
               Module_CookieHelper.updateStudentPoints(fname, lname, pemail, 1);
               $('#sellerGridAvailPoints .credits').text(Math.abs(Module_SelectStudent.getUnAllocatedCreditCount()));
               Module_SelectStudent.getHtmlGrid();
           }
       },
       removeCreditFromStudent: function (fname, lname, pemail, mainID) {
           if ($('#' + mainID + ' .sgCredits #sellerCredits').text() != 0) {
                Module_CookieHelper.updateStudentPoints(fname, lname, pemail, -1);
                $('#sellerGridAvailPoints .credits').text(Math.abs(Module_SelectStudent.getUnAllocatedCreditCount()));
                Module_SelectStudent.getHtmlGrid();
           }
                
       },
       getTotalStudentCredits: function () {
           var points = 0;
            $.each(Module_CookieHelper.getCookieStudentArray(), function (index, value) {
               var stud = value;

               if (!isNaN(parseInt(stud.TotalPrizeCredits)))
                   points = points + parseInt(stud.TotalPrizeCredits);
            });
           return points;
       },
       getUnAllocatedCreditCount: function () {

           var result = parseInt(Module_SelectStudent.getTotalStudentCredits()) - parseInt(Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart));
           if (isNaN(result))
               return 0;
           else
               return result;
       },
       canAddStudentCredits: function () {
           if (Module_SelectStudent.getUnAllocatedCreditCount() > Module_SelectStudent.getTotalStudentCredits())
               return true;
           else
               return false;
       },
       initStudentCreditsToZero: function(){
           var studentArray = Module_CookieHelper.getCookieStudentArray();
           $.each(studentArray, function (index, obj) {
               obj.TotalPrizeCredits = 0;
           });
           Module_CookieHelper.setCookie(Module_CookieHelper.cookie_School_SelectedSellerArray, studentArray);
       },
       splitCreditsEven: function (isReload) {
           var splitEven = true;
           if (Module_SelectStudent.getUnAllocatedCreditCount() == 0) {
               splitEven = false;
           }
           if (Module_SelectStudent.getTotalStudentCredits() != Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart)) {
               splitEven = true;
           }
           if (splitEven == true) {
               this.initStudentCreditsToZero();
               if ($.isNumeric(Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart)) == true && Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart) >= 1) {
                   var studentArray = Module_CookieHelper.getCookieStudentArray();
                   if (studentArray.length > 0) {
                       var studentAmount = studentArray.length;
                       var cartAmount = parseInt(Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart));
                       var studentIndex = 0;
                       for (var i = 0; i < cartAmount; i++) {
                           if (studentIndex >= studentAmount)
                               studentIndex = 0;

                           var items = studentArray[studentIndex];
                           var fname = items.FirstName;
                           var lname = items.LastName;
                           var pemail = items.ParentsEmailAddress;
                           Module_CookieHelper.updateStudentPoints(fname, lname, pemail, 1);
                           studentIndex++;

                       }

                   }
               }
           }
       },
       editStudent: function (divID) {
           var student = Module_CookieHelper.getStudentFromCookieArray($("#" + divID + " .sellerFirstName").text(), $("#" + divID + " .sellerLastName").text(), $("#" + divID + " .sellerParentEmail").text());

           $("#" + Module_SelectStudent.firstNameID).val(student.FirstName);
           $("#" + Module_SelectStudent.lastNameID).val(student.LastName);
           $("#" + Module_SelectStudent.parentEmailID).val(student.ParentsEmailAddress);

           $("#" + Module_SelectStudent.leaderNameID).val(student.LeaderName);
           $("#" + Module_SelectStudent.gradeID).val(student.Grade);

           $("#btnUpdateSeller").data("editing", divID);
           $("#btnCancelEdit").show();
           $("#btnUpdateSeller").show();
           $("#btnAddSeller").hide();
           $("#btnSellerContinue").hide();
       },
       removeStudent: function (divID) {
           Module_CookieHelper.removeStudentFromCookieArray($("#" + divID + " .sellerFirstName").text(), $("#" + divID + " .sellerLastName").text(), $("#" + divID + " .sellerParentEmail").text());
           Module_SelectStudent.splitCreditsEven();
           Module_SelectStudent.getHtmlGrid();

           if (Module_CookieHelper.getCookie(Module_CookieHelper.cookie_BelieveUserProfileType) == 'Parent') {
               this._PostRemoveStudent(student.studentID);
           }
       },
       _PostRemoveStudent: function (studentID) {
           $.ajax({
               type: 'POST',
               url: '/DesktopModules/Believe.DotNetNuke.Modules.BelieveKids/API/Student/RemoveStudent?studentID=' + studentID
           });
       },
       showNextButton: function () {
           if (Module_SelectStudent.continueRedirectUrl == '')
           { return false; }
           else
           { return true; }

       },
       nextButtonClick: function () {
           Module_SelectStudent.checkAndEnableNextButtonIfValid();
       },
       checkAndEnableNextButtonIfValid: function () {
           if (($("#" + Module_SelectStudent.firstNameID).val().length > 0) || ($("#" + Module_SelectStudent.lastNameID).val().length > 0)) {
               if (!Module_SelectStudent.addStudentToCookie())
                   return false;
           }

            if (Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSellerArray) != null && Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSellerArray).length >= 1) {
                if (Module_CookieHelper.get(Module_CookieHelper.cookie_BelieveUserProfileType) == "Parent") {
                    Module_AjaxHelper.set_AddStudents();
                    window.location.href = '/Dashboard';
                }
                else if (Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart) != null && Module_CookieHelper.get(Module_CookieHelper.cookie_Items_InCart) >= 1) {
                    window.location.href = '/Cart';
                }
                else {
                    window.location.href = Module_SelectStudent.continueRedirectUrl;
                }

            }
            else {
               Module_SiteMessage.show_Error("You must add a seller", 3000);
            }
       },
       emailsocialCheckAndEnableNextButtonIfValid: function () {
           if (($("#" + Module_SelectStudent.firstNameID).val().length > 0) || ($("#" + Module_SelectStudent.lastNameID).val().length > 0)) {
               if (!Module_SelectStudent.addStudentToCookie())
                   return false;
           }

           if (Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSellerArray) == null && Module_CookieHelper.get(Module_CookieHelper.cookie_School_SelectedSellerArray).length == 0) {
               Module_SiteMessage.show_Error("You must add a seller", 3000);
               return false;
           }
       },
       buildHtmlGrid: function (mainID, firstName, lastName, parentEmail, sellerCredits) {
           var html = "";
           html = html + "<div id='" + mainID + "'>";
           html = html + "<div class='row sgRow'>";
           if (editEnabled) {
               html = html + "<div class='sgName col-xs-8 col-sm-8'><span class='sellerFirstName'>" + firstName + "</span>&nbsp;<span class='sellerLastName'>" + lastName + "</span></div>";
               html = html + "<div class='sgEdit col-xs-2 col-sm-2' onclick=\"Module_SelectStudent.editStudent('" + mainID + "');\"><span style='font-size: 20px; cursor: pointer;'><i class='fa fa-pencil'></i></span></div>";
               html = html + "<div class='sgRemove col-xs-2 col-sm-2'><span id='sellerRemoveButton' class='sgRemoveFirst' style='cursor: pointer;'><i class='fa fa-trash-o'></i></span></div>";
           }
           else {
               html = html + "<div class='sgName col-xs-9 col-sm-10'><span class='sellerFirstName'>" + firstName + "</span>&nbsp;<span class='sellerLastName'>" + lastName + "</span></div>";
               html = html + "<div class='sgRemove col-xs-3 col-sm-2'><span id='sellerRemoveButton' class='sgRemoveFirst' ><i class='fa fa-trash-o'></i></span></div>";
           }
           if (parentEmail != undefined) {
               if (parentEmail != '') {
                   html = html + "<div class='sgEmail col-xs-12'><span class='sellerParentEmail'>" + parentEmail + "</span></div>";
               }
           }
           if (sellerCredits != undefined) {
               if ($.isNumeric(sellerCredits)) {
                   html = html + "<div class='sgCredits col-sm-12'><span id='sellerCredits'><i id='creditsDown' class='fa fa-minus' onclick=\"Module_SelectStudent.removeCreditFromStudent('" + firstName.replace("'", "\\'") + "','" + lastName.replace("'", "\\'") + "','" + parentEmail + "','" + mainID + "');\"></i>&nbsp;&nbsp;" + sellerCredits + "&nbsp;&nbsp;<i id='creditsUp' class='fa fa-plus' onclick=\"Module_SelectStudent.addCreditToStudent('" + firstName.replace("'", "\\'") + "','" + lastName.replace("'", "\\'") + "','" + parentEmail + "');\" ></i></span><h5>Prize Credits</h5></div>";
               }
               else {
                   sellerCredits = 0;
                   html = html + "<div class='sgCredits col-sm-12'><span id='sellerCredits'><i id='creditsDown' class='fa fa-minus' onclick=\"Module_SelectStudent.removeCreditFromStudent('" + firstName.replace("'", "\\'") + "','" + lastName.replace("'", "\\'") + "','" + parentEmail + "','" + mainID + "');\"></i>&nbsp;&nbsp;" + sellerCredits + "&nbsp;&nbsp;<i id='creditsUp' class='fa fa-plus' onclick=\"Module_SelectStudent.addCreditToStudent('" + firstName.replace("'", "\\'") + "','" + lastName.replace("'", "\\'") + "','" + parentEmail + "');\" ></i></span><h5>Prize Credits</h5></div>";
               }
           }

           html = html + "<div class='sgRemoveCover' onclick=\"Module_SelectStudent.removeStudent('" + mainID + "');\"><span><h3><i class='fa fa-trash-o'></i>&nbsp;Remove</h3></span></div>";

           html = html + "</div></div>"
           return html;
       },
       getHtmlGrid: function () {
           html = "";
           cnt = 0;
               $.each(Module_CookieHelper.getCookieStudentArray(), function (index, value) {


               firstName = value.FirstName;
               lastName = value.LastName;
               parentEmail = value.ParentsEmailAddress;
               sellerCredits = value.TotalPrizeCredits;
                   var mainID = "sellerInformation_" + cnt;
                   html = html + Module_SelectStudent.buildHtmlGrid(mainID, firstName, lastName, parentEmail, sellerCredits);
                   cnt++;
               });
           $("#sellerGrid").html(html);
           $('#sellerGridAvailPoints .credits').text(Math.abs(Module_SelectStudent.getUnAllocatedCreditCount()));
       }
   }
