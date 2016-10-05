// DotNetNuke® - http://www.dnnsoftware.com
// Copyright (c) 2002-2015, DNN Corp.
// All rights reserved.

define(['jquery', 'knockout',
        'pikaday', 'd3', 'moment',
        '../scripts/d3charts',
        '../scripts/pager',
        '../scripts/scroller',
        '../scripts/tabpanel',
        '../scripts/koComponents/pageActivities'],
        function ($, ko, pikaday, d3, moment, d3Charts, pager, scroller, tabPanel) {
            'use strict';

            var analytics = function () {
                var koBinded = false;
                var isMobile = false;
                var analyticsMode;
                var pageId = -1;
                var legendSettings = [];
                var triggerComparativeTerm = true;
                var utility = null;
                var comparativeTerms = {
                    'Year': '1 y',
                    'Month': '1 m',
                    'Week': '1 w',
                    'Day': '1 d'
                };
                var PAGEACTIVITIES_PAGE_SIZE = 5;
                var WAIT_TIME_FOR_RETRIES = 5000;
                var resx;
                var contentResx;
                var graphColors = ["#004b7a", "#0996d8", "#b5958a", "#f26b5e", "#9d8edb", "#a13c57", "#799e61"];

                var dateFormat = "YYYY-MM-DD";

                var sequence = -1, lastCallStatus = null;
                var sequenceConversions = -1, sequenceTopReferrers = -1, sequenceTopPages = -1, sequenceTopOperatingSystems = -1;

                var periodLabel = ko.observable("");

                var pikerStart = null, pikerEnd = null, pikerContainer = null;

                var viewModel = {};

                var wrapper;

                var currentTabId = -2;
                var currentContentItemId = -2;
                var tabIdFromContext = function() {
                    //return the current tab if it's been set from nav summary links
                    if(currentTabId != -2)
                        return currentTabId;

                    //do we have personalized page
                    var perTabId = window.top.dnn.getVar('dnnContentPersonalization_PersonalizedTabId', '-1');
                    if (perTabId != -1)
                        return perTabId;

                    return window.top.dnn.getVar('evoq_TabId', '-1');
                }

                var contentItemIdFromContext = function() {
                    //return the current cid if it's been set from nav summary links
                    if(currentContentItemId != -2)
                        return currentContentItemId;

                    return window.top.dnn.getVar('evoq_ContentItemId', '-1');
                }

                var conversionsViewModel = {
                    results: ko.observableArray([]),
                    max: -1,
                    totalResults: ko.observable(0)
                };

                var operatingSystemsViewModel = {
                    results: ko.observableArray([]),
                    max: -1,
                    totalResults: ko.observable(0)
                };

                var pagesViewModel = {
                    results: ko.observableArray([]),
                    max: -1,
                    totalResults: ko.observable(0)
                };

                var referrersViewModel = {
                    totalResults: ko.observable(0),
                    max: -1,
                    results: ko.observableArray([])
                };

                var getToNewTabFromMobile = function (referrerModel) {
                    if (referrerModel.category === "Internal" || referrerModel.category === "ExitPages") {
                        currentTabId = referrerModel.referrerPageId;
                        currentContentItemId = referrerModel.referrerContentItemId;
                        refresh();
                    }
                };

                var navigationSummaryViewModel = ko.observable();
                var navigationSummaryCategoriesViewModel = ko.observableArray([]);

                var summaryViewModel = {
                    averageTimeOnPage: ko.observable(""),
                    bounceRate: ko.observable(""),
                    totalPageViews: ko.observable('0'),
                    totalPageViewsDetail: ko.observable('0'),
                    totalSessions: ko.observable('0'),
                    totalSessionsDetail: ko.observable('0'),
                    totalVisits: ko.observable('0'),
                    totalVisitsDetail: ko.observable('0'),

                    load: function (data) {
                        this.averageTimeOnPage(data.averageTimeOnPage);
                        this.bounceRate(data.bounceRate);
                        this.totalPageViews(utility.formatAbbreviateBigNumbers(data.totalPageViews));
                        this.totalPageViewsDetail(utility.formatCommaSeparate(data.totalPageViews));
                        this.totalSessions(utility.formatAbbreviateBigNumbers(data.totalSessions));
                        this.totalSessionsDetail(utility.formatCommaSeparate(data.totalSessions));
                        this.totalVisits(utility.formatAbbreviateBigNumbers(data.totalVisits));
                        this.totalVisitsDetail(utility.formatCommaSeparate(data.totalVisits));
                    }
                };              

                var applyCustomDates = function () {
                    if (wrapper.find('.pika-calendar-apply-btn').hasClass('disabled')) {
                        return; //IE 10 and below does not support pointer-events css rule
                    }

                    viewModel.period('Custom');
                    viewModel.startDate(utility.serializeCustomDate(pikerStart.getDate()));
                    viewModel.endDate(utility.serializeCustomDate(pikerEnd.getDate()));
                    getGraphDataStart(function () {
                        bindScrollbar();
                    });
                    utility.persistent.save({
                        period: viewModel.period(),
                        startDate: viewModel.startDate(),
                        endDate: viewModel.endDate(),
                        comparativeOptions: viewModel.comparativeOptions(),
                        comparativeTerm: viewModel.comparativeTerm()
                    });
                    restartPiker();

                    if (typeof viewModel.originModel !== "undefined") {
                        viewModel.originModel.applyCustomDates();
                    }
                };
                var bindScrollbar = function () {
                    setTimeout(function () {
                        var holder = wrapper.find('div.module-performance-card-holder');
                        var cards = wrapper.find('div.module-performance-card', holder);
                        var left = wrapper.find('a.module-performance-scroll-left');
                        var right = wrapper.find('a.module-performance-scroll-right');
                        var initialOffset = holder.css('left') || 0;
                        var scrollOffset = 243;
                        scroller.init(holder, cards, left, right, initialOffset, scrollOffset);
                     
                    }, 100);
                };
                var drawDonutChart = function(container, labels, values, colors, tooltipSelector, legendSelector, ratioSelector, animation, valuesLabels, valuesTooltips) {
                    var $legend = wrapper.find(legendSelector);
                    var $container = wrapper.find(container);
                    $legend.empty();
                    $container.find('svg').remove();
                    $container.append('<svg class="donut-chart"></svg>');

                    var data = [{ values: values, labels: labels, colors: colors, valuesLabels: valuesLabels, valuesTooltips: valuesTooltips }];

                    var chart = d3Charts.donutChart(animation, 150, 150, 30)
                        .tooltipSelector(tooltipSelector)
                        .legendSelector(legendSelector)
                        .ratioSelector(ratioSelector);
                    d3.select(container + " svg")
                        .datum(data)
                        .call(chart);

                    var containerWidth = $container.width();
                    var padding = (containerWidth - 150) / 2;
                    wrapper.find(container + " svg").css("padding-left", padding + "px");

                    var legendWidth = $legend.width();
                    if (isMobile) {
                        $legend.css("margin-left", (containerWidth - legendWidth) / 2 + "px");
                    }
                };

                var drawNavigationSummaryChart = function (width, height, margins, direction) {
                    var m = margins;                   
                    var NAVSUMLENGTH = 20;
                    var w = width - m[1] - m[3],
                        h = height - m[0] - m[2];
                    var tree,
                        root,
                        svg,
                        i = 0,
                        diagonal;

                    function my(selection) {
                        selection.each(function (data) {
                            if (!data) return;
                            tree = d3.layout.tree().size([h, w]);
                            diagonal = d3.svg.diagonal()
                                .projection(function (d) { return [d.y, d.x]; });

                            root = data;
                            root.x0 = h / 2;
                            root.y0 = 0;
                            root.y = w / 2;

                            // Initialize the display to show a few nodes.
                            root.children.forEach(toggleAll);

                            var y0 = (direction > 0) ? m[3] : width - m[1];
                            var x0 = m[0];
                            svg = d3.select(this)
                                .attr('width', width)
                                .attr('height', height)
                                .append("svg:g")
                                .attr("transform", "translate(" + y0 + "," + x0 + ")");

                            update(root);
                        });
                    }

                    // Toggle children.
                    var toggle = function (d) {
                        if (d.children) {
                            d._children = d.children;
                            d.children = null;
                        } else {
                            d.children = d._children;
                            d._children = null;
                        }
                    };

                    var toggleAll = function (d) {
                        if (d.children) {
                            d.children.forEach(toggleAll);
                            toggle(d);
                        }
                    };

                    var update = function (source) {
                        var COUNT_WIDTH = 50;
                        var COUNT_HEIGHT = 30;
                        var BORDER_RADIUS = 5;
                        var TEXT_VERTICAL_OFFSET = 5;
                        var LABEL_MARGIN = 10;
                        
                        var duration = d3.event && d3.event.altKey ? 5000 : 500;

                        // Compute the new tree layout.
                        var nodes = tree.nodes(root).reverse();

                        // Normalize for fixed-depth.
                        nodes.forEach(function (d) {
                            d.y = d.depth * 180 * direction;
                        });

                        // Update the nodes…
                        var node = svg.selectAll("g.node")
                            .data(nodes, function (d) {
                                return d.id || (d.id = ++i);
                            });

                        // Enter any new nodes at the parent's previous position.
                        var nodeEnter = node.enter().append("svg:g")
                            .attr("class", "node")
                            .attr("transform", function () {
                                return "translate(" + source.y0 + "," + source.x0 + ")";
                            });

                        function onClickInternalLinkItem(selection) {
                            selection
                                .on("click", function (d) {
                                    if (d.category === "Internal" || d.category === "ExitPages") {
                                        currentTabId = d.referrerPageId;
                                        currentContentItemId = d.referrerContentItemId;
                                         $(".navigation-tooltip").hide();
                                        refresh();
                                    }
                                });
                        }
                        
                        function rightRoundedRect(x, y, width, height, radius) {
                            return "M" + x + "," + y
                                + "h" + (width - radius)
                                + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
                                + "v" + (height - 2 * radius)
                                + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
                                + "h" + (radius - width)
                                + "z";
                        }
                        
                        function leftRoundedRect(x, y, width, height, radius) {
                            return "M" + (x + radius) + "," + y
                                + "h" + (width - radius)
                                + "v" + height
                                + "h" + (radius - width)
                                + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius
                                + "v" + (2 * radius - height )
                                + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius                                
                                + "z";
                        }
                        
                        //rectanlge for the visit count    
                        nodeEnter.append("svg:path")
                            .attr("d", direction > 0 ? leftRoundedRect(0, -COUNT_HEIGHT / 2, COUNT_WIDTH, COUNT_HEIGHT, BORDER_RADIUS)
                                                     : rightRoundedRect(-COUNT_WIDTH, -COUNT_HEIGHT / 2, COUNT_WIDTH, COUNT_HEIGHT, BORDER_RADIUS))
                            .attr("class", function (d) {
                                return "navigation-summary-count " + d.category.toLowerCase();
                            })
                            .call(onClickInternalLinkItem);
                        
                        //visit count
                        nodeEnter.append("svg:text")
                            .attr("class", function (d) {
                                return "navigation-summary-count " + d.category.toLowerCase();
                            })                           
                            // Condition Left and Right
                            .attr("x", direction * COUNT_WIDTH / 2)
                            .attr("dy", TEXT_VERTICAL_OFFSET)
                            .attr("text-anchor", "middle")                           
                            .call(onClickInternalLinkItem)
                            .text(function (d) {
                                return d.count;
                            }).append('svg:title')
                            .text(function(d) {
                                return d.count; 
                            });
                        
                        function navigationRectangleWidth(d) {
                            var text = nodeEnter.selectAll("#navigation-summary-label-" + d.id);
                            return text.node().getComputedTextLength() + LABEL_MARGIN * 2;                                                          
                        };
                        
                        function navigationRectanglePosition(d) {
                            if (direction > 0) {
                                return COUNT_WIDTH;                                
                            } else {
                                return -navigationRectangleWidth(d) - COUNT_WIDTH;
                            }                                                           
                        };
                                                         
                        function navigationSummaryRectangleText(d) {
                            if (direction > 0) {
                                return COUNT_WIDTH + LABEL_MARGIN;
                            } else {
                                return -COUNT_WIDTH - navigationRectangleWidth(d) + LABEL_MARGIN;
                            }                                            
                        };
                                    
                        //referrer name or exitpage name      
                        nodeEnter.append("svg:text")
                            .attr("id", function(d, i) {
                                return "navigation-summary-label-" + d.id;
                            })
                            .on("mouseover", mouseover).on("mouseout", mouseout)
                            .attr("class", function(d) {
                                return "navigation-summary-label " + d.category.toLowerCase();
                            })
                            .attr("x", navigationSummaryRectangleText)
                            .attr("dy", TEXT_VERTICAL_OFFSET)
                            .attr("text-anchor", function(d) {
                                return (d.children || d._children) ? (direction < 0) ? "start" : "end" : (direction < 0) ? "end" : "start";
                            })
                            .call(onClickInternalLinkItem)
                            .text(function(d) {
                                var text = d.label;
                                if (text.length > NAVSUMLENGTH) {
                                    text = text.substring(0, NAVSUMLENGTH) + "...";
                                }
                                return text;
                            }).attr('alt', function(d) {
                                var text = d.label;                               
                                return text;
                            });
                            
                        nodeEnter.insert("svg:path", "text.navigation-summary-label")
                            .attr("d", function (d) {                                
                                return direction < 0 ? leftRoundedRect(navigationRectanglePosition(d), -COUNT_HEIGHT / 2, navigationRectangleWidth(d), COUNT_HEIGHT, BORDER_RADIUS)
                                                     : rightRoundedRect(navigationRectanglePosition(d), -COUNT_HEIGHT / 2, navigationRectangleWidth(d), COUNT_HEIGHT, BORDER_RADIUS)
                            })
                            .attr("class", function (d) {
                                return "navigation-summary-label " + d.category.toLowerCase();
                            })                          
                            .call(onClickInternalLinkItem)

                       function mouseover(){
                            var altText = $(this);                          
                            var nav =  $(".navigation-tooltip");
                            var ttip = altText.attr('alt');  
                            var navCat = [contentResx.analytics_direct, contentResx.analytics_direct_referral,
                                          contentResx.analytics_external, contentResx.analytics_social,
                                          contentResx.analytics_search, contentResx.analytics_exitpages];

                            if (navCat.indexOf(ttip) >= 0 || ttip.length < NAVSUMLENGTH) {
                                return false;
                            }
                            nav.show();
                            if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) 
                            {
                              var t = d3.event.pageY - 1170;           
                            } else {
                                var t = d3.event.pageY - 1120;  
                            }
                            var l = d3.event.pageX + 160;                           
                            nav.text(ttip);
                            nav.css("left", l + "px");
                            nav.css("top", t + "px");                   
                        }

                        function mouseout(){
                            $(".navigation-tooltip").hide();
                        }
                        
                        // Transition nodes to their new position.
                        node.transition()
                            .duration(duration)
                            .attr("transform", function (d) {
                                return "translate(" + d.y + "," + d.x + ")";
                            });

                        // Transition exiting nodes to the parent's new position.
                        node.exit().transition()
                            .duration(duration)
                            .attr("transform", function () {
                                return "translate(" + source.y + "," + source.x + ")";
                            })
                            .remove();

                        // Update the links…
                        var link = svg.selectAll("path.link")
                            .data(tree.links(nodes), function (d) {
                                return d.target.id;
                            });

                        // Enter any new links at the parent's previous position.
                        link.enter().insert("svg:path", "g")
                            .attr("class", "link")
                            .attr("class", function (d) {
                                return "link " + d.target.category.toLowerCase();
                            })
                            .attr("d", function () {
                                var o = { x: source.x0, y: source.y0 };
                                return diagonal({ source: o, target: o });
                            })
                            .transition()
                            .duration(duration)
                            .attr("d", diagonal);

                        // Transition links to their new position.
                        link.transition()
                            .duration(duration)
                            .attr("d", diagonal);

                        // Transition exiting nodes to the parent's new position.
                        link.exit().transition()
                            .duration(duration)
                            .attr("d", function () {
                                var o = { x: source.x, y: source.y };
                                return diagonal({ source: o, target: o });
                            })
                            .remove();

                        // Stash the old positions for transition.
                        nodes.forEach(function (d) {
                            d.x0 = d.x;
                            d.y0 = d.y;
                        });
                    };

                    return my;
                };

                var getComparativeOptions = function (period) {
                    var options = [];
                    $.each(comparativeTerms, function (i, v) {
                        if (i === period) {
                            options.push(v);
                            return false;
                        }
                        options.push(v);
                    });

                    return options;
                };

                var getComparativeTerm = function (period) {
                    return comparativeTerms[period];
                };

                var getConversions = function () {
                    utility.sf.moduleRoot = 'evoqcontentlibrary';
                    utility.sf.controller = 'analyticsservice';
                    var method = (analyticsMode == "page") ? 'GetTopConversionsByPage' : 'GetTopConversions';
                    sequenceConversions++;

                    var comparativeTerm = viewModel.period() == 'Custom' ? 'c' : viewModel.comparativeTerm();

                    var params = {
                        period: viewModel.period(),
                        comparativeTerm: comparativeTerm,
                        startDate: viewModel.startDate(),
                        endDate: viewModel.endDate(),
                        pageIndex: viewModel.conversions.pageIndex(),
                        pageSize: viewModel.conversions.pageSize,
                        sequence: sequenceConversions
                    };
                    if (analyticsMode == "page") {
                        params.tabId = tabIdFromContext();
                        params.contentItemId = contentItemIdFromContext();
                    }
                    utility.sf.get(method, params,
                        function (data) {
                            if (!data) return;
                            if (!data.data) return;
                            if (data.sequence !== sequenceConversions) return;
                            if (data.data.isPending) {
                                setTimeout(function () {
                                    getConversions();
                                }, WAIT_TIME_FOR_RETRIES);
                                return;
                            }

                            updateConversions(data.data);
                        },
                        function () {
                            // failed...
                        });
                };

                var getGraphData = function (cb) {
                    utility.sf.moduleRoot = 'evoqcontentlibrary';
                    utility.sf.controller = 'analyticsservice';
                    var method;
                    var params;
                    sequence++;
                    var comparativeTerm = viewModel.period() == 'Custom' ? 'c' : viewModel.comparativeTerm();

                    if (analyticsMode === "page") {
                        method = 'GetPageAnalytics';
                        params = {
                            period: viewModel.period(),
                            comparativeTerm: comparativeTerm,
                            startDate: viewModel.startDate(),
                            endDate: viewModel.endDate(),
                            tabId: tabIdFromContext(),
                            contentItemId: contentItemIdFromContext(),
                            sequence: sequence
                        };
                    } else {
                        method = 'GetSiteAnalytics';
                        params = {
                            period: viewModel.period(),
                            comparativeTerm: comparativeTerm,
                            startDate: viewModel.startDate(),
                            endDate: viewModel.endDate(),
                            sequence: sequence
                        };
                    }

                    utility.sf.get(method, params,
                        function (data) {
                            if (!data) return;
                            if (!data.data) return;
                            if (data.sequence !== sequence) return;

                            viewModel.pageName(data.data.pageName);
                            viewModel.summary.load(data.data.summary);

                            updateGraphs(data.data, function () {
                                if (data.data.isPending) {
                                    // analytic data incomplete, we need to try it again...
                                    lastCallStatus = data.data;
                                    setTimeout(function () {
                                        getGraphData(cb);
                                    }, WAIT_TIME_FOR_RETRIES);
                                }

                                if (typeof cb === 'function') cb();
                            });
                        }, function () {
                            // failed...
                        });
                };

                var getGraphDataStart = function (cb) {
                    lastCallStatus = null;
                    getGraphData(cb);
                };

                var getTopOperatingSystems = function () {
                    utility.sf.moduleRoot = 'evoqcontentlibrary';
                    utility.sf.controller = 'analyticsservice';
                    var method = 'GetTopOperatingSystems';
                    sequenceTopOperatingSystems++;

                    var comparativeTerm = viewModel.period() == 'Custom' ? 'c' : viewModel.comparativeTerm();

                    var params = {
                        period: viewModel.period(),
                        comparativeTerm: comparativeTerm,
                        startDate: viewModel.startDate(),
                        endDate: viewModel.endDate(),
                        pageIndex: viewModel.topOperatingSystems.pageIndex(),
                        pageSize: viewModel.topOperatingSystems.pageSize,
                        tabId: tabIdFromContext(),
                        contentItemId: contentItemIdFromContext(),
                        sequence: sequenceTopOperatingSystems
                    };
                    utility.sf.get(method, params,
                        function (data) {
                            if (!data) return;
                            if (!data.data) return;
                            if (data.sequence !== sequenceTopOperatingSystems) return;
                            if (data.data.isPending) {
                                setTimeout(function () {
                                    getTopOperatingSystems();
                                }, WAIT_TIME_FOR_RETRIES);
                                return;
                            }

                            updateTopOperatingSystems(data.data);
                        },
                        function () {
                            // failed...
                        });
                };

                var getTopPages = function () {
                    utility.sf.moduleRoot = 'evoqcontentlibrary';
                    utility.sf.controller = 'analyticsservice';
                    var method = 'GetTopPages';
                    sequenceTopPages++;

                    var comparativeTerm = viewModel.period() == 'Custom' ? 'c' : viewModel.comparativeTerm();

                    var params = {
                        period: viewModel.period(),
                        comparativeTerm: comparativeTerm,
                        startDate: viewModel.startDate(),
                        endDate: viewModel.endDate(),
                        pageIndex: viewModel.topPages.pageIndex(),
                        pageSize: viewModel.topPages.pageSize,
                        sequence: sequenceTopPages
                    };
                    utility.sf.get(method, params,
                        function (data) {
                            if (!data) return;
                            if (!data.data) return;
                            if (data.sequence !== sequenceTopPages) return;
                            if (data.data.isPending) {
                                setTimeout(function () {
                                    getTopPages();
                                }, WAIT_TIME_FOR_RETRIES);
                                return;
                            }

                            updateTopPages(data.data);
                        },
                        function () {
                            // failed...
                        });
                };

                var getTopReferrers = function () {
                    utility.sf.moduleRoot = 'evoqcontentlibrary';
                    utility.sf.controller = 'analyticsservice';
                    var method = (analyticsMode == "page") ? 'GetTopReferrersByPage' : 'GetTopReferrers';
                    sequenceTopReferrers++;

                    var comparativeTerm = viewModel.period() == 'Custom' ? 'c' : viewModel.comparativeTerm();

                    var params = {
                        period: viewModel.period(),
                        comparativeTerm: comparativeTerm,
                        startDate: viewModel.startDate(),
                        endDate: viewModel.endDate(),
                        pageIndex: viewModel.topReferrers.pageIndex(),
                        pageSize: viewModel.topReferrers.pageSize,
                        sequence: sequenceTopReferrers
                    };
                    if (analyticsMode == "page") {
                        params.tabId = tabIdFromContext();
                        params.contentItemId = contentItemIdFromContext();
                    }
                    utility.sf.get(method, params,
                        function (data) {
                            if (!data) return;
                            if (!data.data) return;
                            if (data.sequence !== sequenceTopReferrers) return;
                            if (data.data.isPending) {
                                setTimeout(function () {
                                    getTopReferrers();
                                }, WAIT_TIME_FOR_RETRIES);
                                return;
                            }

                            updateTopReferrers(data.data);
                        },
                        function () {
                            // failed...
                        });
                };

                var init = function (wrap, util, params, callback, viewModelParam) {
                    wrapper = wrap;
                    pageId = params.pageId;
                    analyticsMode = params.mode;

                    utility = util;
                    resx = utility.resx.PersonaBar;
                    contentResx = utility.resx.ContentPB;                  
               

                    if (!isMobile) {
                        pager.init(pagesViewModel, PAGEACTIVITIES_PAGE_SIZE, getTopPages, resx);
                        pager.init(referrersViewModel, PAGEACTIVITIES_PAGE_SIZE, getTopReferrers, resx);
                        pager.init(operatingSystemsViewModel, PAGEACTIVITIES_PAGE_SIZE, getTopOperatingSystems, resx);
                        pager.init(conversionsViewModel, PAGEACTIVITIES_PAGE_SIZE, getConversions, resx);
                    }

                    var userSettings = utility.persistent.load();
                    legendSettings = userSettings['legends'] || [];

                    var userSettingsPeriod = isMobile && userSettings.period == 'Custom' ? 'Week' : userSettings.period;
                    var defaultDate = utility.serializeCustomDate(new Date(new Date().toUTCString()));

                    var periods = [
                        { value: 'Year', label: resx.opt_Year },
                        { value: 'Month', label: resx.opt_Month },
                        { value: 'Week', label: resx.opt_Week },
                        { value: 'Day', label: resx.opt_Day }
                    ];

                    if (typeof viewModelParam === "undefined") {
                        viewModel = {
                            resx: resx,
                            periods: periods,
                            periodLabel: periodLabel,
                            period: ko.observable(userSettingsPeriod),

                            startDate: ko.observable(userSettings.startDate || defaultDate),
                            endDate: ko.observable(userSettings.endDate || defaultDate),
                            startDateLabel: ko.observable(),
                            endDateLabel: ko.observable(),

                            applyCustomDates: applyCustomDates,
                            comparativeTerm: ko.observable(userSettings.comparativeTerm),
                            comparativeOptions: ko.observableArray(getComparativeOptions(userSettingsPeriod))
                        };
                    } else {
                        viewModel = {};
                        for (var prop in viewModelParam) {
                            viewModel[prop] = viewModelParam[prop];
                        }

                        viewModel.originalModel = viewModelParam;

                        viewModel.periodLabel = periodLabel;
                        viewModel.applyCustomDates = applyCustomDates;
                        viewModel.pikerStart = pikerStart;
                        viewModel.pikerEnd = pikerEnd;
                        viewModel.pikerContainer = pikerContainer;

                        viewModel.periodLabel.subscribe(function (newValue) {
                            if (typeof viewModel.originModel !== "undefined") {
                                viewModel.originalModel.periodLabel(newValue);
                            }
                        });
                        viewModel.periodLabel.extend({ notify: 'always' });
                    }
                    viewModel.contentResx = contentResx;
                    viewModel.pageName = ko.observable('');
                    viewModel.summary = summaryViewModel;
                    viewModel.topPages = pagesViewModel;
                    viewModel.topOperatingSystems = operatingSystemsViewModel;
                    viewModel.topReferrers = referrersViewModel;
                    viewModel.conversions = conversionsViewModel;
                    viewModel.navigationSummary = navigationSummaryViewModel;
                    viewModel.navigationSummaryCategories = navigationSummaryCategoriesViewModel;
                    viewModel.getToNewTabFromMobile = getToNewTabFromMobile;

                    viewModel.changePeriod = function (data, event) {
                        var newPeriod = $(event.target).data('value');
                        var oldPeriod = this.period();
                        var oldComparativeTerm = this.comparativeTerm();
                        this.period(newPeriod);
                        triggerComparativeTerm = false;
                        this.comparativeOptions(getComparativeOptions(newPeriod));
                        var newComparativeTerm = getComparativeTerm(newPeriod);
                        this.comparativeTerm(newComparativeTerm);
                        triggerComparativeTerm = true;

                        // we manually trigger it
                        if (newPeriod !== oldPeriod || newComparativeTerm !== oldComparativeTerm) {
                            refresh();
                        }
                    };

                    viewModel.showCustomCalendar = function () {
                        var period = this.period();

                        if (period == 'Custom' && viewModel.startDate() && viewModel.endDate()) {
                            viewModel.initialStartDate = new Date(viewModel.startDate());
                            viewModel.initialEndDate = new Date(viewModel.endDate());
                            viewModel.initialStartDate.setHours(0, 0, 0, 0);
                            viewModel.initialEndDate.setHours(0, 0, 0, 0);
                            pikerStart.setDate(utility.deserializeCustomDate(viewModel.startDate()));
                            pikerEnd.setDate(utility.deserializeCustomDate(viewModel.endDate()));
                        } else {
                            var now = new Date(new Date().toUTCString());
                            now.setDate(now.getDate() - 1);
                            viewModel.initialEndDate = new Date(now.getTime());
                            viewModel.initialEndDate.setHours(0, 0, 0, 0);
                            pikerEnd.setDate(now);
                            switch (period) {
                            case "Week":
                                now.setDate(now.getDate() - 6);
                                break;
                            case "Month":
                                now.setMonth(now.getMonth() - 1);
                                now.setDate(now.getDate() + 1);
                                break;
                            case "Year":
                                now.setYear(now.getFullYear() - 1);
                                now.setDate(now.getDate() + 1);
                                break;
                            }
                            viewModel.initialStartDate = new Date(now.getTime());
                            viewModel.initialStartDate.setHours(0, 0, 0, 0);
                            pikerStart.setDate(now);
                        }
                        wrapper.find('.pika-calendar-apply-btn').addClass('disabled');

                        pikerContainer.show();
                        var hidePikerHandler = function () {
                            pikerContainer.hide();
                        };
                        $(window).on('click', function () {
                            hidePikerHandler();
                            $(window).off('click', hidePikerHandler);
                        });
                    };

                    utility.asyncParallel([
                        function (cb1) {
                            getGraphDataStart(cb1);
                        }
                    ], function () {
                        viewModel.comparativeTerm.subscribe(refresh);

                        if (isMobile) {
                            viewModel.period.subscribe(function (value) {
                                this.comparativeOptions(getComparativeOptions(value));
                                this.comparativeTerm(getComparativeTerm(value));
                            }, viewModel);

                            if (analyticsMode === 'page') {
                                tabPanel.init(viewModel, null);
                            }

                        }
                        else{
                            if (analyticsMode === 'page') {
                                tabPanel.init(viewModel, null);
                            }
                        }

                        ko.applyBindings(viewModel, wrapper[0]);
                        koBinded = true;

                        if (!isMobile) {
                            bindScrollbar();
                            var pikerStartField = wrapper.find('#dashboard-period-custom-calendar-start-field');
                            var pikerEndField = wrapper.find('#dashboard-period-custom-calendar-end-field');
                            pikerContainer = wrapper.find('#dashboard-period-custom-calendar-container');
                            pikerStart = pikerStartField ? new pikaday({
                                format: dateFormat,
                                field: pikerStartField[0],
                                bound: false,
                                container: wrapper.find('#dashboard-period-custom-calendar-container-left')[0],
                                maxDate: new Date(new Date().toUTCString()),
                                onSelect: function (date) {
                                    var label = viewModel.contentResx.analytics_From + ':&nbsp;&nbsp;&nbsp;' + utility.serializeCustomDate(date);
                                    viewModel.startDateLabel(label);
                                    pikerEnd.setMinDate(date);
                                    pikerEnd.draw();
                                    if (!viewModel.initialStartDate || date.getTime() !== viewModel.initialStartDate.getTime()) {
                                        wrapper.find('.pika-calendar-apply-btn').removeClass('disabled');
                                    }
                                }
                            }) : null;
                            pikerEnd = pikerEndField ? new pikaday({
                                format: dateFormat,
                                field: pikerEndField[0],
                                bound: false,
                                container: wrapper.find('#dashboard-period-custom-calendar-container-right')[0],
                                maxDate: new Date(new Date().toUTCString()),
                                onSelect: function (date) {
                                    var label = viewModel.contentResx.analytics_To + ':&nbsp;&nbsp;&nbsp;' + utility.serializeCustomDate(date);
                                    viewModel.endDateLabel(label);
                                    pikerStart.setMaxDate(date);
                                    pikerStart.draw();
                                    if (!viewModel.initialEndDate || date.getTime() !== viewModel.initialEndDate.getTime()) {
                                        wrapper.find('.pika-calendar-apply-btn').removeClass('disabled');
                                    }
                                }
                            }) : null;
                            if (pikerContainer) {
                                pikerContainer.on('click', function (e) {
                                    if (e.stopPropation) e.stopPropation();
                                    else e.cancelBubble = true;
                                    return false;
                                });
                            }
                        } else {
                            refreshCarousel();
                            //rebindOnResize();
                        }

                        if (typeof callback === 'function') callback();
                    });

                    if (viewModel.moduleDashboard) {
                        viewModel.moduleDashboard.subscribe(function (val) {
                            if (!val) {
                                getGraphDataStart();
                            }
                        }, viewModel);
                    }
                };

                var initMobile = function (wrapper, util, params, callback) {
                    isMobile = true;
                    this.init(wrapper, util, params, callback);
                };

                var load = function (params, callback) {
                    pageId = params.pageId;
                    analyticsMode = params.mode;

                    var userSettings = utility.persistent.load();
                    legendSettings = userSettings['legends'] || [];

                    var userSettingsPeriod = isMobile && userSettings.period == 'Custom' ? 'Week' : userSettings.period;
                    var defaultDate = utility.serializeCustomDate(new Date(new Date().toUTCString()));

                    triggerComparativeTerm = false;
                    viewModel.periodLabel("");
                    viewModel.period(userSettingsPeriod);
                    viewModel.startDate(userSettings.startDate || defaultDate);
                    viewModel.endDate(userSettings.endDate || defaultDate);
                    viewModel.comparativeOptions(getComparativeOptions(userSettingsPeriod));
                    viewModel.comparativeTerm(userSettings.comparativeTerm);
                    triggerComparativeTerm = true;

                    if (userSettingsPeriod == 'Custom' && viewModel.startDate() && viewModel.endDate()) {
                        pikerStart.setDate(utility.deserializeCustomDate(viewModel.startDate()));
                        pikerEnd.setDate(utility.deserializeCustomDate(viewModel.endDate()));
                    }

                    getGraphDataStart(function () {
                        if (!isMobile) bindScrollbar();
                        else refreshCarousel();
                        if (typeof callback === 'function') callback();
                    });
                };

                var loadMobile = function (params, callback) {
                    isMobile = true;
                    this.load(params, callback);
                };

                var refresh = function () {
                    if (!triggerComparativeTerm) {
                        return;
                    }

                    getGraphDataStart(function () {
                        if (!isMobile) {
                            bindScrollbar();
                        } else {
                            refreshCarousel();
                        }
                    });
                    utility.persistent.save({
                        period: viewModel.period(),
                        startDate: viewModel.startDate(),
                        endDate: viewModel.endDate(),
                        comparativeOptions: viewModel.comparativeOptions(),
                        comparativeTerm: viewModel.comparativeTerm()
                    });
                    if (!isMobile) {
                        restartPiker();
                    }
                };

                var restartPiker = function() {
                    pikerContainer.hide();
                    pikerStart.setDate(null);
                    pikerEnd.setDate(null);
                    wrapper.find('.pika-calendar-apply-btn').removeClass('disabled').addClass('disabled');
                };

                var refreshCarousel = function () {
                    setTimeout(function () {
                        var holder = wrapper.find(".site-performance-card-holder");
                        if (holder.data('owlCarousel')) {
                            holder.data('owlCarousel').reinit();
                            return;
                        }

                        holder.owlCarousel({
                            itemsCustom: [[0, 1], [490, 2], [730, 3]],
                            navigation: false
                        });
                    }, 100);
                };

                var updateChannelsGraph = function (labels, channels, animation, channelsLabels, channelsTooltips) {
                    var root = (analyticsMode == "page") ? "#page-traffic-panel" : "#site-traffic-panel";
                    var container = root + " #channels-svg";
                    var legendSelector = root + " #channels-legend";
                    var tooltipSelector = root + " #channels .donut-chart-tooltip";
                    var colors = getColorsArray(channels.length);

                    drawDonutChart(container, labels, channels, colors, tooltipSelector,
                        legendSelector, null, animation, channelsLabels, channelsTooltips);
                };

                var getColorsArray = function (arraySize) {
                    var colors = new Array(arraySize);

                    for (var i = 0; i < arraySize; i++) {
                        colors[i] = graphColors[i % arraySize];
                    }

                    return colors;
                };

                var addEmptyEntriesToFitPage = function (results) {
                    var missedElementCountToFitPage = PAGEACTIVITIES_PAGE_SIZE - results.length;
                    if (missedElementCountToFitPage !== PAGEACTIVITIES_PAGE_SIZE) {
                        for (var i = 0; i < missedElementCountToFitPage; i++) {
                            results.push({ count: "-", label: "" , countTooltip: ''});
                        }
                    }
                }

                var updateConversions = function (data, setFirstPageSelected) {
                    var results = [];
                    var width = 195;
                    var totalResults = 0;
                    if (data) {
                        $.each(data.results || [], function (i, v) {
                            var title = v.title;
                            title = utility.trimContentToFit(title, width);
                            v.title = title;
                            v.countTooltip = utility.formatCommaSeparate(v.count);
                            v.count = utility.formatAbbreviateBigNumbers(v.count);
                            results.push(v);
                        });
                        totalResults = data.totalResults || 0;
                        if (!isMobile) {
                            addEmptyEntriesToFitPage(results);
                        }
                    }

                    viewModel.conversions.results(results);
                    viewModel.conversions.totalResults(totalResults);

                    if (setFirstPageSelected && viewModel.conversions.pageIndex) {
                        viewModel.conversions.pageIndex(0);
                    }
                };

                var updateDevicesGraph = function (labels, devices, animation, devicesLabels, devicesTooltips) {
                    var root = (analyticsMode == "page") ? "#page-traffic-panel" : "#site-traffic-panel";
                    var container = root + " #devices-svg";
                    var legendSelector = root + " #devices-legend";
                    var tooltipSelector = root + " #devices .donut-chart-tooltip";
                    var colors = getColorsArray(devices.length);

                    drawDonutChart(container, labels, devices, colors, tooltipSelector, legendSelector,
                        null, animation, devicesLabels, devicesTooltips);
                };

                var updateSeriesListCommaFormat = function (seriesList, propertyName) {
                    for (var i = 0; i < seriesList.length; i++) {
                        updateSeriesFormat(seriesList[i], function (value) {
                            return utility.formatCommaSeparate(value);
                        }, propertyName);
                    }
                };

                var updateSeriesFormat = function (series, formatter, propertyName) {
                    if (!series) {
                        return;
                    }
                    
                    for (var i = 0; i < series.length; i++) {
                        if (propertyName) {
                            series[i][propertyName] = formatter(series[i][propertyName]);
                        } else {
                            series[i] = formatter(series[i]);
                        }
                    }
                };

                var createNewSeriesCommaFormat = function (series, propertyName) {
                    return createNewSeriesFormat(series, function (value) {
                        return utility.formatCommaSeparate(value);
                    }, propertyName);
                };

                var createNewSeriesAbbreviateFormat = function (series, propertyName) {
                    return createNewSeriesFormat(series, function (value) {
                        return utility.formatAbbreviateBigNumbers(value);
                    }, propertyName);
                };

                var createNewSeriesFormat = function (series, formatter, propertyName) {
                    if (!series) {
                        return series;
                    }
                    
                    var newSeries = new Array(series.length);
                    for (var i = 0; i < series.length; i++) {
                        if (propertyName) {
                            newSeries[i][propertyName] = formatter(series[i][propertyName]);
                        } else {
                            newSeries[i] = formatter(series[i]);
                        }
                    }
                    return newSeries;
                };

                var updateGraphs = function (data, cb) {
                    // common parts -
                    periodLabel(data.periodLabel || '');

                    var labels = [];
                    if (!isMobile) {
                        labels = data.labels;
                    }

                    updatePageViewsGraph(labels || [], data.pageViews || [], data.visitors || [],
                    (lastCallStatus == null || lastCallStatus.isPendingPageViews) && (!data.isPendingPageViews));

                    var channelsLabels = createNewSeriesAbbreviateFormat(data.channels.values || []);
                    var channelsTooltips = createNewSeriesCommaFormat(data.channels.values || []);

                    updateChannelsGraph(data.channels.labels || [], data.channels.values || [],
                    (lastCallStatus == null || lastCallStatus.isPendingChannels) && (!data.isPendingChannels), channelsLabels, channelsTooltips);

                    var devicesLabels = createNewSeriesAbbreviateFormat(data.devices.values || []);
                    var devicesTooltips = createNewSeriesCommaFormat(data.devices.values || []);

                    updateDevicesGraph(data.devices.labels || [], data.devices.values || [],
                    (lastCallStatus == null || lastCallStatus.isPendingDevices) && (!data.isPendingDevices), devicesLabels, devicesTooltips);

                    updateTopReferrers(data.referrers, true);
                    updateConversions(data.conversions, true);

                    if (analyticsMode == "page") {
                        updateTimeOnPageGraph(labels || [], data.timeOnPage || [],
                        (lastCallStatus == null || lastCallStatus.isPendingPageViews) && (!data.isPendingPageViews));

                        updateTopOperatingSystems(data.operatingSystems, true);

                        updateNavigationSummary(data.navigationSummary || [],
                        (lastCallStatus == null || lastCallStatus.isPendingNavigationSummary) && (!data.isPendingNavigationSummary));
                    } else {
                        updateTopPages(data.pages, true);
                    }

                    updateSeriesListCommaFormat([data.pageViews || [], data.visitors || []], 'count');

                    if (typeof cb === 'function') cb();
                };

                var updateLegendSettings = function (update) {
                    utility.persistent.save({ legends: update });
                };

                var updateNavigationSummary = function (navigationSummary) {
                    var container = "#page-traffic-panel #navigation-summary .chart-container > div",
                        $container, referrersChart, exitPagesChart, data, categories;
                        
                    navigationSummary.referrers.forEach(function (d)  {
                        d.count = utility.formatAbbreviateBigNumbers(d.count);                        
                    });

                    navigationSummary.exitPages.forEach(function (d)  {
                        d.count = utility.formatAbbreviateBigNumbers(d.count);                        
                    });

                    // Reset svg
                    $container = wrapper.find(container);
                    $container.find('svg.referrers-svg').remove();
                    $container.append('<svg class="referrers-svg"></svg>');
                    $container.find('svg.exitPages-svg').remove();
                    $container.append('<svg class="exitPages-svg"></svg>');
                    $container.css("left", "-300px");

                    // Referrers
                    referrersChart = drawNavigationSummaryChart(700, 500, [20, 0, 20, 0], -1);
                    data = {
                        label: "",
                        category: "",
                        children: navigationSummary.referrers
                    };
                    d3.select(container + " svg.referrers-svg")
                        .datum(data)
                        .call(referrersChart);

                    // Exit pages
                    exitPagesChart = drawNavigationSummaryChart(400, 500, [20, 0, 20, 0], 1);
                    data = {
                        label: "",
                        category: "",
                        children: navigationSummary.exitPages
                    };
                    d3.select(container + " svg.exitPages-svg")
                        .datum(data)
                        .call(exitPagesChart);

                    // Update view models
                    categories = getNavigationSummaryCategories(navigationSummary);
                    viewModel.navigationSummaryCategories(categories);
                    viewModel.navigationSummary(navigationSummary);
                };

                var getNavigationSummaryCategories = function (navigationSummary) {
                    var categories = [], categoryLabel;
                    for (var i = 0; i < navigationSummary.referrers.length; i++) {
                        categoryLabel = getCategoryLabel(navigationSummary.referrers[i].category);
                        if (categories.indexOf(categoryLabel) < 0) {
                            categories.push(categoryLabel);
                        }
                    }
                    if (navigationSummary.exitPages.length > 0) {
                        categoryLabel = getCategoryLabel(navigationSummary.exitPages[0].category);
                        categories.push(categoryLabel);
                    }
                    return categories;
                }

                var getCategoryLabel = function (category) {
                    var label = '';
                    switch (category) {
                        case "Direct":
                            label = contentResx.analytics_direct;
                            break;
                        case "Direct Referral":
                            label = contentResx.analytics_direct_referral;
                            break;
                        case "Internal":
                            label = contentResx.analytics_internal;
                            break;
                        case "External":
                            label = contentResx.analytics_external;
                            break;
                        case "Social":
                            label = contentResx.analytics_social;
                            break;
                        case "Search":
                            label = contentResx.analytics_search;
                            break;
                        case "ExitPages":
                            label = contentResx.analytics_exitpages;
                            break;
                    }
                    return label.toUpperCase();
                }

                var updatePageViewsGraph = function (labels, pageViews, visitors, animation) {
                    var root = (analyticsMode == "page") ? "#page-traffic-panel" : "#site-traffic-panel";
                    var legend = wrapper.find(root + " #page-views-legend");
                    var container = root + " #page-views";
                    var $legend = wrapper.find(legend).empty();
                    var $container = wrapper.find(container);

                    if ($container.length === 0) {
                        return;
                    }

                    $container.find('svg').remove();
                    $container.append('<svg class="line-chart"></svg>');

                    var data = [
                        { values: visitors, key: viewModel.contentResx.analytics_Visitors.toUpperCase(), color: graphColors[0] },
                        { values: pageViews, key: viewModel.contentResx.analytics_PageViews.toUpperCase(), color: graphColors[1] }
                    ];
                    var width = $container[0].clientWidth - 10;
                    var height = width / 2.5;
                    var chart = d3Charts.lineChart(animation, width, height)
                        .margins({right: 20})
                        .labels(labels)
                        .legendSelector(legend)
                        .legendSettings(legendSettings)
                        .updateLegendSettings(updateLegendSettings)
                        .tooltipSelector(container + " > div.line-chart-tooltip")
                        .yAxisFormatter(function (value) { return utility.formatCommaSeparate(value); });
                    d3.select(container + " svg")
                        .datum(data)
                        .call(chart);

                    var containerWidth = $container.width();
                    var legendWidth = $legend.width();
                    $legend.css("margin-left", (containerWidth - legendWidth) / 2 + "px");
                };

                function getMaxTimeOnPage(timeOnPage) {
                    var max = 0;
                    for (var i = 0; i < timeOnPage.length; i++) {
                        var time = timeOnPage[i];
                        if (time.count > max) {
                            max = time.count;
                        }
                    }
                    return max;
                }

                var updateTimeOnPageGraph = function (labels, timeOnPage, animation) {
                    var oneMinute = 60, oneHour = 3600;
                    var root = "#page-traffic-panel";
                    var container = root + " #time-on-page";
                    var $container = wrapper.find(container);
                    $container.find('svg').remove();
                    $container.append('<svg class="line-chart"></svg>');

                    var data = [
                        { values: timeOnPage, key: viewModel.contentResx.analytics_TimeOnPage.toUpperCase(), color: graphColors[0] }
                    ];

                    var width = $container[0].clientWidth - 10;
                    var height = width / 2.5;
                    
                    var chart = d3Charts.lineChart(animation, width, height)
                        .margins({left: 40})
                        .margins({right:20})
                        .labels(labels)
                        .tooltipSelector(container + " > div.line-chart-tooltip")
                        .tooltipLabel("[COUNT]")
                        .tooltipFormatter(utility.secondsFormatter)
                        .yAxisLabel(viewModel.resx.seconds);

                    var maxTimeOnPage = getMaxTimeOnPage(timeOnPage);
                    if (maxTimeOnPage > oneMinute) {
                        chart
                            .margins({ left: 50 })
                            .yAxisFormatter(function secondsYAxisFormatter(seconds) {
                                var duration = moment().startOf('day').add(seconds, 'seconds');
                                return seconds >= oneHour ?
                                    duration.format("H:mm:ss") :
                                    duration.format("m:ss");
                            })
                            .yAxisLabel(viewModel.resx.minutes)
                            .yAxisCoefficient(oneMinute);
                    }

                    d3.select(container + " svg")
                        .datum(data)
                        .call(chart);
                };

                var updateTopOperatingSystems = function (data, setFirstPageSelected) {
                    var results = [];
                    var width = 195;
                    var totalResults = 0;
                    if (data) {
                        $.each(data.results || [], function (i, v) {
                            var title = v.title;
                            title = utility.trimContentToFit(title, width);
                            v.title = title;
                            v.countTooltip = utility.formatCommaSeparate(v.count);
                            v.count = utility.formatAbbreviateBigNumbers(v.count);
                            results.push(v);
                        });
                        totalResults = data.totalResults || 0;
                        if (!isMobile) {
                            addEmptyEntriesToFitPage(results);
                        }
                    }

                    viewModel.topOperatingSystems.results(results);
                    viewModel.topOperatingSystems.totalResults(totalResults);

                    if (setFirstPageSelected && viewModel.topOperatingSystems.pageIndex) {
                        viewModel.topOperatingSystems.pageIndex(0);
                    }
                };

                var updateTopPages = function (data, setFirstPageSelected) {
                    var results = [];
                    var width = 195;
                    var totalResults = 0;
                    if (data) {
                        $.each(data.results || [], function (i, v) {
                            var title = v.title;
                            title = utility.trimContentToFit(title, width);
                            v.title = title;
                            v.countTooltip = utility.formatCommaSeparate(v.count);
                            v.count = utility.formatAbbreviateBigNumbers(v.count);
                            results.push(v);
                        });
                        totalResults = data.totalResults || 0;
                        if (!isMobile) {
                            addEmptyEntriesToFitPage(results);
                        }
                    }

                    viewModel.topPages.results(results);
                    viewModel.topPages.totalResults(totalResults);

                    if (setFirstPageSelected && viewModel.topPages.pageIndex) {
                        viewModel.topPages.pageIndex(0);
                    }
                };

                var updateTopReferrers = function (data, setFirstPageSelected) {
                    var results = [];
                    var width = 195;
                    var totalResults = 0;
                    if (data) {
                        $.each(data.results || [], function (i, v) {
                            var title = v.title;
                            title = utility.trimContentToFit(title, width);
                            v.title = title;
                            v.countTooltip = utility.formatCommaSeparate(v.count);
                            v.count = utility.formatAbbreviateBigNumbers(v.count);
                            results.push(v);
                        });
                        totalResults = data.totalResults || 0;
                        if (!isMobile) {
                            addEmptyEntriesToFitPage(results);
                        }
                    }

                    viewModel.topReferrers.results(results);
                    viewModel.topReferrers.totalResults(totalResults);

                    if (setFirstPageSelected && viewModel.topReferrers.pageIndex) {
                        viewModel.topReferrers.pageIndex(0);
                    }
                };

                return {
                    init: init,
                    initMobile: initMobile,
                    load: load,
                    loadMobile: loadMobile
                };
            }
            return analytics;
        });
