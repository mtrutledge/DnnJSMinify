var init = function (dnn, hcc) {
    'use strict';

    hcc.social = hcc.social || {};

    hcc.social.ActionView = function ActionView($, ko, settings, model) {
        var that = this;

        $.extend(this, dnn.social.komodel(model));

        this.social = new dnn.social.Module(settings);

        this.socialController = this.social.getSocialController(this.contentItemId(), this);

        this.like = function (data, event) {
            that.socialController.like(data, event);
        };

        this.unlike = function (data, event) {
            that.socialController.unlike(data, event);
        };

        this.bookmark = function (data, event) {
            that.socialController.bookmark(data, event);
        };

        this.unbookmark = function (data, event) {
            that.socialController.unbookmark(data, event);
        };

        this.subscribe = function (data, event) {
            that.socialController.subscribe(data, event);
        };

        this.unsubscribe = function (data, event) {
            that.socialController.unsubscribe(data, event);
        };
    };
};

var hcc = hcc || {};
init(window.dnn, hcc);