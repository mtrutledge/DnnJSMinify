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
			'jquery-ui.min',
			'dnn.jquery',
			'dnn.extensions',
			'dnn.jquery.extensions',
			'jquery.tokeninput',
			'dnn.jScrollBar',
			'css!../css/pages-settings.css',
			'css!../css/pages-hierarchy.css',
			'css!../css/tags-input.css'], function ($, ko, koMapping) {
    'use strict';

    var viewModel, koBinded, isMobile, utility, container, resx;

    var init, initMobile, load, loadMobile, addEventListeners, onHidePanelClick, onAddPageClick,onAddPageMobileClick,
        changeView, initializeView, showPagesList, callPageSettings,
        pageAddComplete, templateAddComplete, pageEditComplete, pageSettingsCancel;

    var PERSONABAR_TEMPLATES_SUBMENU_ID = '#personabar #nav_Templates';

    viewModel = {};
    koBinded = false;
    isMobile = false;
    utility = null;
    container = null;
    resx = null;

    ko.mapping = koMapping;

    init = function (wrapper, util, params, callback) {
        utility = util;
        viewModel = {};

        container = wrapper;

        addEventListeners();

        if (typeof dnn === 'undefined' || typeof dnn.dnnPageHierarchy === 'undefined') {
            window.Sys = !window.Sys ? window.top.Sys : window.Sys;
            window.dnn = !window.dnn ? window.top.dnn : window.dnn;
        }

        changeView();

        if (typeof callback === 'function') callback();
        

        if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
            $('.header').css('width','80%')
     
}
    };

    initMobile = function (wrapper, util, params, callback) {
        isMobile = true;
        this.init(wrapper, util, params, callback);
    };

    load = function (params, callback) {
        changeView();

        if (dnn && dnn.dnnPageHierarchy) {
            dnn.dnnPageHierarchy.load();
        }
    };

    loadMobile = function (params, callback) {
        isMobile = true;
        this.load(params, callback);
    };

    onHidePanelClick = function (e) {
        if (typeof dnn.dnnPageSettings != "undefined" && dnn.dnnPageSettings.hasPendingChanges()) {
            dnn.dnnPageSettings.handlePendingChanges(e);
        } else if (typeof dnn.dnnPageHierarchy != "undefined" && dnn.dnnPageHierarchy.hasPendingChanges()) {
            dnn.dnnPageHierarchy.handlePendingChanges(e);
        }
    }

    addEventListeners = function () {
        container.find('a.btn-addpage').click(onAddPageClick);      

        $("#topLevelMenu .personabarnav li, #topLevelMenu .hovermenu ul li").click(onHidePanelClick).each(function () {
            var events = $._data(this, 'events')['click'];
            var first = events.pop();
            events.splice(0, 0, first);
        });
    };

    onAddPageClick = function () {
        if (typeof dnn.dnnPageHierarchy != "undefined" && dnn.dnnPageHierarchy.hasPendingChanges()) {
            return dnn.dnnPageHierarchy.handlePendingChanges();
        }

        changeView('addpage');
        return false;
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

        initializeView(action, function () {
            switch (action) {
                case "edit":
                    this._closePersonaBarOnUpdate = true;
                    callPageSettings('edit', params);
                    break;
                case "addpage":
                    callPageSettings('addpage', params);
                    break;
                
            }
        });
    };

    initializeView = function (action, callback) {
        setTimeout(function () {
            showPagesList(action, callback);
        }, 100); // Why 100?
    };

    showPagesList = function (action,callback) {
        if (typeof dnn.dnnPageHierarchy === 'undefined') {
            window.require(['../pages.pageHierarchy'], function () {
                dnn.dnnPageHierarchy = dnn.dnnPageHierarchy || {};
                dnn.dnnPageHierarchy.resx = utility.resx.ContentPB;
                dnn.dnnPageHierarchy.utility = utility;
                dnn.dnnPageHierarchy._viewModel = viewModel;
                dnn.dnnPageHierarchy.callPageSettings = callPageSettings;
                if (action === "edit" && typeof callback === "function") {
                    dnn.dnnPageHierarchy.hide();
                }
                dnn.dnnPageHierarchy.init(callback);

                $(window).trigger('resize');
            });
        } else {
            if (action === "edit" && typeof callback === "function") {
                dnn.dnnPageHierarchy.hide();
                callback.call(dnn.dnnPageHierarchy);
            } else if (action === "addpage") {
                callback.call(dnn.dnnPageHierarchy);
            }
            
            else {
                dnn.dnnPageHierarchy.show();
            }

            $(window).trigger('resize');
        }
    };

    callPageSettings = function (action, params) {
        if (typeof dnn === 'undefined' || typeof dnn.dnnPageSettings === 'undefined') {
            dnn.permissionGridManager = null;

            window.require(['../pages.pageSettings',
                            '../permissionGridManager',
                            '../permissionGrid'], function () {
                                dnn.dnnPageSettings.resx = utility.resx.ContentPB;
                                dnn.dnnPageSettings.serviceController = utility.sf;
                                dnn.dnnPageSettings.utility = utility;
                                dnn.dnnPageSettings.init();
                                dnn.dnnPageSettings.getElement().on('pageAdded', pageAddComplete);
                                dnn.dnnPageSettings.getElement().on('templateAdded', templateAddComplete);
                                dnn.dnnPageSettings.getElement().on('pageEdit', pageEditComplete);
                                dnn.dnnPageSettings.getElement().on('pageSettingsCancel', pageSettingsCancel);

                                dnn.dnnPageSettings[action].apply(dnn.dnnPageSettings, params);
                            });
        } else {
            dnn.dnnPageSettings[action].apply(dnn.dnnPageSettings, params);
        }
    };

    pageAddComplete = function (e, data) {
        if (dnn.dnnPageHierarchy) {
            dnn.dnnPageHierarchy.addPage(data);
        }
    };

    templateAddComplete = function(e, data) {
        $(PERSONABAR_TEMPLATES_SUBMENU_ID).click();
    };

    pageEditComplete = function (e, data) {
        if (dnn.dnnPageHierarchy) {
            dnn.dnnPageHierarchy.editPage(data);

            if (dnn.dnnPageHierarchy._closePersonaBarOnUpdate) {
                dnn.dnnPageHierarchy._closePersonaBarOnUpdate = false;
                $('.btn_showsite').click();
            }
        }
    };

    pageSettingsCancel = function () {
        if (dnn.dnnPageHierarchy) {
            if (dnn.dnnPageHierarchy._closePersonaBarOnUpdate) {
                dnn.dnnPageHierarchy._closePersonaBarOnUpdate = false;
                $('.btn_showsite').click();
            }
        }
    };

    return {
        init: init,
        load: load,
        initMobile: initMobile,
        loadMobile: loadMobile
    };
});
