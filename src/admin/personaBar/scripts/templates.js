/*
DotNetNuke® - http://www.dotnetnuke.com
Copyright (c) 2002-2015
by DotNetNuke Corporation
All Rights Reserved
*/

/*
* TODO: Document
*/
define(['jquery', 'knockout', 'knockout.mapping', 'knockout.validation.min',
    '../scripts/templatesCreateManager',
    'jquery-ui.min',
    '../scripts/koBindingHandlers/jScrollPane',
    '../scripts/koBindingHandlers/slideToggleVisible',
	'dnn.jquery',
	'dnn.extensions',
	'dnn.jquery.extensions',
	'jquery.tokeninput',
	'dnn.jScrollBar',
	'css!../css/pages-settings.css',
	'css!../css/pages-hierarchy.css',
	'css!../css/tags-input.css',
	'css.jScrollBar'], function ($, ko, koMapping, validation, templatesCreateManager) {
    'use strict';

    var koBinded, isMobile, utility, container, resx;

    var init, initMobile, load, loadMobile, addEventListeners, onHidePanelClick,
        changeView, initializeView, showPagesList, callPageSettings,
        getParentJs, getParentCss;

    koBinded = false;
    isMobile = false;
    utility = null;
    container = null;

    ko.mapping = koMapping;

    var creationManager = templatesCreateManager;


    init = function (wrapper, util, params, callback) {
        utility = util;
        

        container = wrapper;

        addEventListeners();

        if (typeof dnn === 'undefined' || typeof dnn.dnnTemplatesHierarchy === 'undefined') {
            window.Sys = !window.Sys ? window.top.Sys : window.Sys;
            window.dnn = !window.dnn ? window.top.dnn : window.dnn;
        } 
		creationManager.init(utility.sf, utility.resx.ContentPB);
        changeView();

        if (typeof callback === 'function') callback();
    };

    initMobile = function (wrapper, util, params, callback) {
        isMobile = true;
        this.init(wrapper, util, params, callback);
    };

    load = function (params, callback) {
        creationManager.refreshConfiguration();
        
        changeView();

        if (dnn && dnn.dnnTemplatesHierarchy) {
            dnn.dnnTemplatesHierarchy.load();
        }
    };

    loadMobile = function (params, callback) {
        isMobile = true;
        this.load(params, callback);
    };

    onHidePanelClick = function (e) {
        if (typeof dnn.dnnTemplatesHierarchy != "undefined" && dnn.dnnTemplatesHierarchy.hasPendingChanges()) {
            dnn.dnnTemplatesHierarchy.handlePendingChanges(e);
        }
    }

    addEventListeners = function () {
        $("#topLevelMenu .personabarnav li, #topLevelMenu .hovermenu ul li").click(onHidePanelClick).each(function () {
            var events = $._data(this, 'events')['click'];
            var first = events.pop();
            events.splice(0, 0, first);
        });
    };

    changeView = function (action) {
        var initView, params;

        if (typeof action === "undefined") {
            initView = container.data('init-view');
            if (!initView) {
                initializeView();
                return;
            }
            container.data('init-view', null);
            changeView(initView);
            return;
        }

        params = container.data('init-view-params');
        container.data('init-view-params', null);

        initializeView(function () {
            switch (action) {
                case "edit":
                    this._closePersonaBarOnUpdate = true;
                    callPageSettings('edit', params);
                    break;
            }
        });
    };

    initializeView = function (callback) {
        setTimeout(function () {
            showPagesList(callback);
        }, 100); // Why 100?
    };

    showPagesList = function (callback) {
        if (typeof dnn.dnnTemplatesHierarchy === 'undefined') {
            window.require(['../templatesHierarchy'], function () {
                dnn.dnnTemplatesHierarchy = dnn.dnnTemplatesHierarchy || {};
                dnn.dnnTemplatesHierarchy.resx = utility.resx.ContentPB;
                dnn.dnnTemplatesHierarchy.utility = utility;
                dnn.dnnTemplatesHierarchy._viewModel = creationManager.getViewModel();
                dnn.dnnTemplatesHierarchy.init(callback, creationManager.onDeleteCallback);

                $(window).trigger('resize');
            });
        } else {
            if (typeof callback === "function") {
                callback.call(dnn.dnnTemplatesHierarchy);
            }

            $(window).trigger('resize');
        }
    };

    return {
        init: init,
        load: load,
        initMobile: initMobile,
        loadMobile: loadMobile
    };
});
