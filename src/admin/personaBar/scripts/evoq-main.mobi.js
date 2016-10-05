'use strict';
define(['jquery', '../scripts/config'], function ($, cf) {

    if (window.top.dnn.getVar('evoq_DisableAnalytics', '-1') === "True") {
        $(".btn-analytics").hide();
    }

    return {
        init: function (util) {
            
        }
    };
});