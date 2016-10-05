/*
DotNetNuke® - http://www.dotnetnuke.com
Copyright (c) 2002-2015
by DotNetNuke Corporation
All Rights Reserved
*/

/*
* TODO: Document
*/
define(['jquery',
    'knockout',
    'knockout.mapping',
    '../scripts/recycleBin.ViewModel',
	'dnn.jquery',
	'dnn.extensions',
	'dnn.jquery.extensions',
	'jquery.tokeninput',
	'dnn.jScrollBar',
    'jquery-ui.min',
    'css!../css/pages.css',
    'css!../css/tags-input.css'],
    function ($, ko, koMapping, DnnPageRecycleBin) {
        'use strict';

        var isMobile, utility, container;

        var dnnPageRecycleBin;

        var init, initMobile, load, loadMobile,
            initRecycleBin, viewRecycleBin;

        utility = null;

        ko.mapping = koMapping;

        init = function (wrapper, util, params, callback) {
            utility = util;

            container = wrapper;

            dnnPageRecycleBin = new DnnPageRecycleBin(utility.resx.ContentPB, utility.sf, utility);


	        initRecycleBin();

            if (typeof callback === 'function') callback();
        };

        initMobile = function (wrapper, util, params, callback) {
            isMobile = true;
            this.init(wrapper, util, params, callback);
        };

        load = function (params, callback) {
            viewRecycleBin();

            if (dnn && dnn.dnnPageHierarchy) {
                dnn.dnnPageHierarchy.load();
            }
        };

        loadMobile = function (params, callback) {
            isMobile = true;
            this.load(params, callback);
        };

        initRecycleBin = function () {
            dnnPageRecycleBin.init();
            viewRecycleBin();
        };

        viewRecycleBin = function () {
            if (typeof dnn.dnnPageHierarchy != "undefined" && dnn.dnnPageHierarchy.hasPendingChanges()) {
                return dnn.dnnPageHierarchy.handlePendingChanges();
            }

            dnnPageRecycleBin.show();
        };

        return {
            init: init,
            load: load,
            initMobile: initMobile,
            loadMobile: loadMobile
        };
    });
