// Model
var HcAffiliate = function (data /* see AffiliateViewModel fields */) {
    var self = this;
    self.userid = ko.observable(data.UserId);
    self.username = ko.observable(data.Username);
    self.email = ko.observable(data.Email);
    self.password = ko.observable(data.Password);
    self.confirmPassword = ko.observable(data.ConfirmPassword);
    self.firstname = ko.observable(data.FirstName);
    self.lastname = ko.observable(data.LastName);

    self.myaffiliateid = ko.observable(data.MyAffiliateId);
    self.referralaffiliateid = ko.observable(data.ReferralAffiliateId);
    self.allowReferral = ko.observable(data.AllowReferral);
    self.confirmterms = ko.observable(false);
    self.countryid = ko.observable(data.CountryId);
    self.addressline = ko.observable(data.AddressLine);
    self.city = ko.observable(data.City);
    self.company = ko.observable(data.Company);
    self.state = ko.observable(data.State);
    self.postalcode = ko.observable(data.PostalCode);
    self.phone = ko.observable(data.Phone);
    self.regions = ko.observableArray(data.Regions);
};

// ViewModel
var HcAffiliateRegViewModel = function (model, $form, res) {
    var self = this;

    // Fields -------------
    self.model = model;
    self.message = {
        status: ko.observable("OK"),
        show: ko.observable(false),
        text: ko.observable('')
    };
    self.isRegistered = ko.observable(false);

    // Handlers -----------------
    self.register = function () {
        if (!hcc.formIsValid($form))
            return;

        if (!self.model.confirmterms()) {
            showMessage(res.ValMessage_ConfirmAffiliateTerms);
            return;
        }

        $form.ajaxLoader("start");
        $.ajax(hcc.getServiceUrl("AffiliateRegistration/Register"), {
            data: ko.toJSON(self.model),
            contentType: "application/json",
            type: "post"
        })
        .done(function (resp) {
            showMessage(resp.Message, resp.Status);
            if (resp.Status == 'OK')
                //self.isRegistered(true);
                window.location.replace(resp.RedirectUrl);
        })
        .fail(function () { })
        .always(function () { $form.ajaxLoader("stop"); });
    };

    self.changeCountry = function () {
        $form.ajaxLoader("start");
        $.post(hcc.getServiceUrl("AffiliateRegistration/GetRegions"),
                { countryId: self.model.countryid() }, null, "json"
            )
            .done(function (res) {
                self.model.regions.removeAll();
                $.each(res, function (i, el) { self.model.regions.push(el); });
            })
            .fail(function () { })
            .always(function () { $form.ajaxLoader("stop"); });

    };

    self.changeReferralAffiliateId = function (data, event) {
        $form.ajaxLoader("start");
        $.post(hcc.getServiceUrl("AffiliateRegistration/IsAffiliateValid"),
                { affiliateId: self.model.referralaffiliateid() }, null, "json"
            )
            .done(function (data) {
                if (!data) {
                    showMessage(res.ValMessage_ReferralAffiliateIDInvalid, "Failed");
                }
                else {
                    self.message.show(false);
                }
            })
            .fail(function () { })
            .always(function () { $form.ajaxLoader("stop"); });

    };
    // Methods -------------
    var showMessage = function (message, status) {
        self.message.status(status);
        self.message.text(message);
        self.message.show(true);
        $("body").scrollTo(".hcValidationSummary");
    };

    var init = function () {
        if (self.model.myaffiliateid()) {
            showMessage(res.Message_AffiliateAlreadyRegistered, "OK");
            self.isRegistered(true);
        }
        //$.each(model.regions, function (i, el) { self.model.regions.push(el); });
    };

    init();
};
