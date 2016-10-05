// DotNetNuke® - http://www.dnnsoftware.com
//
// Copyright (c) 2002-2015, DNN Corp.
// All rights reserved.

'use strict';
define(['jquery', 'knockout', 'd3'],
    function($, ko) {

        var utility = null;
        var viewModel = {
            pageName: ko.observable(''),
            moduleName: ko.observable(''),
            viewCount: ko.observable('0'),
            viewCountDetail: ko.observable('0'),
            timeCount: ko.observable(0.0),
            bounceRate: ko.observable('N/A'),
            bounceRateUnits: ko.observable(''),
            engageAnalyticsVisible: ko.observable(false),
            engagementPercentProgress: ko.observable(''),
            engagementPercent: ko.observable(0),
            period: ko.observable(''),
            comparativeTerm: ko.observable(''),
            startDate: ko.observable(''),
            endDate: ko.observable(''),
            loadPageAnalytics: function (d, e) {
                e.preventDefault();
                $('.incontext-analytics').hide();
                utility.loadPageAnalytics();
            },
            loadEngageModuleDashboard: function (d, e) {
                e.preventDefault();
                $('.incontext-analytics').hide();
                utility.loadModuleDashboard(viewModel.moduleName());
            }
        };

        var getContextData = function(cb) {
            var userSettings = utility.persistent.load();
            var defaultDate = utility.serializeCustomDate(new Date(new Date().toUTCString()));

            if (viewModel.period() !== userSettings.period || viewModel.comparativeTerm() !== userSettings.comparativeTerm) {
                viewModel.period(userSettings.period);
                viewModel.comparativeTerm(userSettings.comparativeTerm);
                viewModel.startDate(userSettings.startDate || defaultDate);
                viewModel.endDate(userSettings.endDate || defaultDate);

                utility.sf.moduleRoot = 'evoqcontentlibrary';
                utility.sf.controller = 'analyticsservice';
                utility.sf.getsilence('GetPageAnalyticsInContext', {
                        period: viewModel.period(),
                        comparativeTerm: viewModel.comparativeTerm(),
                        startDate: viewModel.startDate(),
                        endDate: viewModel.endDate()
                    },
                    function(data) {
                        if (data) {
                            updatePageAnalyticsModel(data, cb);
                        }
                        getContextDataEngage();
                    }, function() {
                        // failed...
                        getContextDataEngage(); 
                    });
            } else {
                if (typeof cb === 'function') cb();
            }
        };

        var getContextDataEngage = function() {
            if (viewModel.engageAnalyticsVisible()) {
                var userSettings = utility.persistent.load();
                var defaultDate = utility.serializeCustomDate(new Date(new Date().toUTCString()));

                viewModel.period(userSettings.period);
                viewModel.comparativeTerm(userSettings.comparativeTerm);
                viewModel.startDate(userSettings.startDate || defaultDate);
                viewModel.endDate(userSettings.endDate || defaultDate);

                utility.sf.moduleRoot = 'dnncorp/cmx';
                utility.sf.controller = 'analytics';
                utility.sf.getsilence('GetModuleContextData', {
                        period: viewModel.period(),
                        comparativeTerm: viewModel.comparativeTerm(),
                        moduleName: viewModel.moduleName(),
                        startDate: viewModel.startDate(),
                        endDate: viewModel.endDate()
                    },
                    function(data) {
                        if (data) {
                            updateEngageAnalyticsModel(data);
                        }
                    }, function() {
                        // failed...
                    });
            }
        };

        var updatePageAnalyticsModel = function(data, cb) {
            viewModel.pageName(data.data.pageName || '');
            viewModel.viewCount(utility.formatAbbreviateBigNumbers(data.data.totalPageViews || 0));
            viewModel.viewCountDetail(utility.formatCommaSeparate(data.data.totalPageViews || 0));
            viewModel.timeCount(data.data.averageTimeOnPageTotalMinutes || 0.0);

            var bounceRateData = (data.data.bounceRate || '').split(' ');

            if (bounceRateData.length > 0) {
                viewModel.bounceRate(bounceRateData[0]);
            } else {
                viewModel.bounceRate('N/A');
            }

            if (bounceRateData.length > 1) {
                viewModel.bounceRateUnits(bounceRateData[1]);
            } else {
                viewModel.bounceRateUnits('');
            }

            if (typeof cb === 'function') cb();
        };

        var updateEngageAnalyticsModel = function (data) {
            viewModel.engagementPercent(data.engagementPercent || 0);
            viewModel.engagementPercentProgress(data.percentProgress == 1 ? 'higher' : (data.percentProgress == -1 ? 'lower' : data.engagementPercent == 0 ? 'equal hidden' : 'equal'));
        };

        return {
            init: function(wrapper, util, params, callback) {
                utility = util;
                viewModel.resx = utility.resx.PersonaBar;
                viewModel.moduleName(params.moduleName);
                if (params.showEngageStats) {
                    viewModel.engageAnalyticsVisible(true);
                } else {
                    viewModel.engageAnalyticsVisible(false);
                }
                ko.applyBindings(viewModel, wrapper[0]);
                utility.asyncParallel([
                    function(cb1) {
                        getContextData(cb1);
                    }
                ], function() {
                    if (typeof callback === 'function') callback();
                });
            },

            load: function(params, callback) {
                getContextData(function() {
                    if (typeof callback === 'function') callback();
                });
            }
        };
    });