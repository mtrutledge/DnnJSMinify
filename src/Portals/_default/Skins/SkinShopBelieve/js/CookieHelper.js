Module_CookieHelper =
    {
        defaultCookieExpireDays: 30,
        cookie_School_SelectedOPID: "ssOPID",
        cookie_School_SelectedSTATE: "ssSTATE",
        cookie_School_SelectedSCHOOL: "ssSCHOOL",
        cookie_School_SelectedSCHOOLIsTaxIncluded: "ssSCHOOLTax",
        cookie_School_SelectedSellerArray: "SSSA",
        cookie_School_SelectedMagazineArray: "SSMA",
        cookie_School_SelectedMagazineItemArray: "SSMIA",
        cookie_School_Skipped: "ss",
        cookie_Items_InCart: "iic",
        cookie_LowestItemInCartTemp: "LICT",
        cookie_FB_AccessToken: "FBA",
        cookie_BelieveUserProfileType: "BUT",
        cookie_IsUserLoggedIn: "IUL",
        cookie_Parent_Sponsor_InitialLogin: "PSIL",
        cookie_DEEPLINK_LastProductViewed: "DSKU",
        clearAllBelieveCookies: function () {
            this.clearLoginCookies();
            this.clearShoppingCookiesUponCheckout();
        },
        clearShoppingCookiesUponCheckout: function () {
            this.clearCookie(this.cookie_School_SelectedOPID);
            this.clearCookie(this.cookie_School_SelectedSTATE);
            this.clearCookie(this.cookie_School_SelectedSCHOOL);
            this.clearCookie(this.cookie_School_SelectedSCHOOLIsTaxIncluded);
            this.clearCookie(this.cookie_School_SelectedSellerArray);
            this.clearCookie(this.cookie_School_SelectedMagazineItemArray);
            this.clearCookie(this.cookie_School_SelectedMagazineArray);
            this.clearCookie(this.cookie_School_Skipped);
            this.clearCookie(this.cookie_Items_InCart);
            this.clearCookie(this.cookie_FB_AccessToken);
            this.clearCookie(this.cookie_Parent_Sponsor_InitialLogin);
        },
        clearLoginCookies: function () {
            this.clearCookie(this.cookie_School_SelectedOPID);
            this.clearCookie(this.cookie_School_SelectedSTATE);
            this.clearCookie(this.cookie_School_SelectedSCHOOL);
            this.clearCookie(this.cookie_School_SelectedSCHOOLIsTaxIncluded);
            this.clearCookie(this.cookie_School_SelectedSellerArray);
            this.clearCookie(this.cookie_School_SelectedMagazineItemArray);
            this.clearCookie(this.cookie_School_SelectedMagazineArray);

            this.clearCookie(this.cookie_BelieveUserProfileType);
            this.clearCookie(this.cookie_IsUserLoggedIn);
            this.clearCookie(this.cookie_Parent_Sponsor_InitialLogin);
            this.clearCookie(this.cookie_FB_AccessToken);
            this.clearCookie('ClaimingPrize');
        },
        clearCookie: function (name) {
            $("#" + name).val('');

            $.ajax({
                async: true,
                type: 'POST',
                url: '/DesktopModules/Believe.DotNetNuke.Modules.BelieveKids/API/ShopBelieveSession/RemoveValue',
                data: { 'SessionGuid': Module_CookieHelper.get('BKSessionGuid'), 'Key': name, 'Value': '' },
                dataType: 'json'
            });
        },
        getCookie: function (name) {
            return Module_CookieHelper.get(name);
        },
        setCookie: function (name, value) {
            Module_CookieHelper.set(name, value);
        },
        get: function (name) {
            try {
                var cookie = $("#" + name).val();

                if (cookie == undefined)
                    return '';

                return JSON.parse(cookie);
            }
            catch (e) {
                return '';
            }

        },
        set: function (name, value) {
            if (name == undefined)
                return;

            if (value == undefined)
                value = '';

            $("#" + name).val(JSON.stringify(this.removeEmptyElements(value)));

            $.ajax({
                async: false,
                type: 'POST',
                url: '/DesktopModules/Believe.DotNetNuke.Modules.BelieveKids/API/ShopBelieveSession/SetValue',
                data: { 'SessionGuid': Module_CookieHelper.get('BKSessionGuid'), 'Key': name, 'Value': $("#" + name).val() },
                dataType: 'json'
            });
        },
        isStringJSON: function (jsonString) {
            try {
                var o = JSON.parse(jsonString);

                // Handle non-exception-throwing cases:
                // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
                // but... JSON.parse(null) returns 'null', and typeof null === "object", 
                // so we must check for that, too.
                if (o && typeof o === "object" && o !== null) {
                    return true;
                }
            }
            catch (e) { return false; }

            return false;
        },
        removeEmptyElements: function (arr) {
            if (arr && typeof arr === "object" && arr !== null) {
                var result = [];
                $.each(arr, function (index, value) {
                    if (value != undefined)
                        result.push(value);
                });
                return result;
            }
            else {
                return arr;
            }
        },
        students: [],
        getStudentFromCookieArrayByID: function (sid) { 
            this.students = this.getCookieStudentArray();
            var index = this.findIndexOfStudentByID(sid);
            if (index != -1)
                return this.students[index];
            else
                return undefined;
        },
        getStudentFromCookieArray: function (firstname, lastname, parentEmail) {
            this.students = this.getCookieStudentArray();
            var index = this.findIndexOfStudent(firstname, lastname, parentEmail);
            if (index != -1)
                return this.students[index];
            else
                return undefined;
        },
        findIndexOfStudentByID: function (sid) {
            this.students = this.getCookieStudentArray();
            var result = -1;
            $.each(this.students, function (index, v) {
                if (v.StudentID == sid) {
                    result = index;
                    return;
                }
            });

            return result;
        },
        findIndexOfStudent: function (firstname, lastname, parentEmail) {
            this.students = this.getCookieStudentArray();
            var result = -1;
            $.each(this.students, function (index, v) {
                // searching with parentEmail is optional.
                if (parentEmail != undefined && parentEmail.length > 0) {
                    if (v.FirstName == firstname && v.LastName == lastname && v.ParentsEmailAddress == parentEmail) {
                        result = index;
                        return;
                    }
                }
                else {
                    if (v.FirstName == firstname && v.LastName == lastname) {
                        result = index
                        return;
                    }
                }
            });

            return result;
        },
        addCookieStudentArray: function (firstname, lastname, parentEmail, points, opid, schoolName, studentid, isschooltaxed, schoolState, leaderName, grade) {
            this.students = this.getCookieStudentArray();

            if (leaderName == undefined)
                leaderName = '';

            if (grade == undefined)
                grade = '';

            if (isschooltaxed == undefined || isschooltaxed == '')
                isschooltaxed = 'False';

            this.students.push({
                "StudentID": -1,
                "OPID": opid,
                "ParentsDnnUserID": -1,
                "StudentID": studentid,
                "FirstName": firstname,
                "LastName": lastname,
                "ParentsEmailAddress": parentEmail,
                "TotalPrizeCredits": points,
                "LeaderName": leaderName,
                "Grade": grade,
                "FundraiserInfo": {
                    "AccountNumber": '',
                    "OPID": opid,
                    "School_Name": schoolName,
                    "StartDate": '1/1/0001',
                    "EndDate": '1/1/0001',
                    "IsTaxIncludedSchool": isschooltaxed,
                    "City": '',
                    "State": schoolState,
                    "ZipCode": ''
                }
            });

            this.setCookie(this.cookie_School_SelectedSellerArray, this.students);
            return this.students[this.students.length - 1];
        },
        updateStudentPoints: function (firstName, lastName, parentEmail, pointsToAdd) {
            var student = this.getStudentFromCookieArray(firstName, lastName, parentEmail);

            if (student != undefined && student !== '' && $.isNumeric(pointsToAdd)) {
                student.TotalPrizeCredits = parseInt(student.TotalPrizeCredits) + parseInt(pointsToAdd);
                this.setCookie(this.cookie_School_SelectedSellerArray, this.students); // getStudentFromCookieArray initializes a this.students member array when reading
            }
        },
        removeStudentFromCookieArray: function (firstname, lastname, parentEmail) {
            this.students = this.getCookieStudentArray();
            var result = this.findIndexOfStudent(firstname, lastname, parentEmail);
            if (result != -1) {
                delete this.students[result];
                this.setCookie(this.cookie_School_SelectedSellerArray, this.students);
            }
        },
        getCookieStudentArray: function () {
            this.students = this.getCookie(this.cookie_School_SelectedSellerArray);
            if (this.students == undefined || typeof this.students === "string")
                this.students = [];

            return this.students;
        },
        magazineAddresses: [],
        addCookieMagazineArray: function (itemcode, firstname, lastname, address1, address2, city, state, zip, opid) {
            this.magazineAddresses = this.getCookieMagazineAddressesArray();

            this.magazineAddresses.push({
                "ItemCode": itemcode,
                "FirstName": firstname,
                "LastName": lastname,
                "Address1": address1,
                "Address2": address2,
                "City": city,
                "State": state,
                "Zip": zip,
                "OPID": opid,
                "OrderBvin": '',
                "DNNUserID": -1
            });

            this.setCookie(Module_CookieHelper.cookie_School_SelectedMagazineArray, this.magazineAddresses);
        },
        findIndexOfMagazineAddress: function (itemcode, firstname, lastname) {
            this.magazineAddresses = this.getCookieMagazineAddressesArray();
            var result = -1;
            $.each(this.magazineAddresses, function (index, v) {
                if (v.ItemCode == itemcode && v.FirstName == firstname && v.LastName == lastname) {
                    result = index
                    return;
                }
            });

            return result;
        },
        removeMagazineFromCookieArray: function (itemcode, firstname, lastname) {
            this.magazineAddresses = this.getCookieMagazineAddressesArray();
            var index = this.findIndexOfMagazineAddress(itemcode, firstname, lastname);
            if (index != -1) {
                delete this.magazineAddresses[index];
                this.setCookie(Module_CookieHelper.cookie_School_SelectedMagazineArray, this.magazineAddresses);
                return true;
            }
            return false;
        },
        getCookieMagazineAddressesArray: function () {
            this.magazineAddresses = this.getCookie(this.cookie_School_SelectedMagazineArray);
            if (this.magazineAddresses == undefined || typeof this.magazineAddresses === "string")
                this.magazineAddresses = [];

            return this.magazineAddresses;
        },
        magazineItems: [],
        addCookieMagazineItemCodeArray: function (itemcode, qty) {
            this.magazineItems = this.getCookieMagazineItemCodeArray();

            this.magazineItems.push({
                "itemCode": itemcode,
                "qty": qty
            });

            this.setCookie(Module_CookieHelper.cookie_School_SelectedMagazineItemArray, this.magazineItems);
        },
        findIndexOfMagazineItem: function (itemcode, qty) {
            this.magazineItems = this.getCookieMagazineItemCodeArray();
            var result = -1;
            $.each(this.magazineItems, function (index, v) {
                if (v.itemCode == itemcode && v.qty == qty) {
                    result = index
                    return;
                }
            });

            return result;
        },
        removeMagazineItemCodeArray: function (itemcode, qty) {
            this.magazineItems = this.getCookieMagazineItemCodeArray();
            var index = this.findIndexOfMagazineItem(itemcode, qty);
            if (index != -1) {
                delete this.magazineItems[index];
                this.setCookie(Module_CookieHelper.cookie_School_SelectedMagazineItemArray, this.magazineItems);
                return true;
            }

            return false;
        },
        getCookieMagazineItemCodeArray: function () {
            this.magazineItems = this.getCookie(this.cookie_School_SelectedMagazineItemArray);
            if (this.magazineItems == undefined || typeof this.magazineItems === "string")
                this.magazineItems = [];

            return this.magazineItems
        },
        sortByName: function (a, b) {
            var aName = a.firstName.toLowerCase();
            var bName = b.firstName.toLowerCase();
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }
    }