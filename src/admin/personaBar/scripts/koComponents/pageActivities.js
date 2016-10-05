﻿// DotNetNuke® - http://www.dnnsoftware.com
//
// Copyright (c) 2002-2015, DNN Corp.
// All rights reserved.

define(['knockout'], function (ko) {

    'use strict';

    ko.components.register('page-activities', {
    	viewModel: function(params) {
		    var viewModel = this;
            this.title = params.title;
            this.value = params.value;
            this.value.title = this.title;
            this.isMobile = params.isMobile || false;
            this.sideCss = params.side || '';
            this.titleLength = params.titleLength || 25;
	        this.value.getLabel = function(label) {
		        if (!label || label.length < viewModel.titleLength) {
			        return label;
		        }

		        return '<label title="' + label + '">' + label.substr(0, viewModel.titleLength) + '...</label>';
	        };
        },
        template:'<table class="cmxtbl" data-bind="css: sideCss, with: value"> \
                    <colgroup> \
                        <col class="col-label"/> \
                        <col class="col-count"/> \
                    </colgroup> \
                    <thead> \
                        <tr> \
                            <th class="label-col"><a data-bind="html: $parent.title"></a></th> \
                            <th class="value-col"> \
                                <!-- ko if: !$parent.isMobile --> \
                                <ul class="right pager" data-bind="visible: pagerVisible"> \
                                    <li><a data-bind="click: prev, attr: { \'class\': pagerPrevClass }"></a></li> \
                                    <li><a data-bind="click: next, attr: { \'class\': pagerNextClass }"></a></li> \
                                </ul> \
                                <!-- /ko --> \
                            </th> \
                        </tr> \
                        </thead> \
                        <!-- ko if: results().length > 0 --> \
                        <tbody data-bind="foreach: results"> \
                        <tr data-bind="css: {last: $index() == $parent.results().length - 1}"> \
                            <td><span data-bind="html: $parent.getLabel(label)"></span></td> \
                            <td class ="count"><span data-bind="html: count, attr: { title: $parent.title + \' \' + countTooltip} "></span></td> \
                        </tr> \
                        </tbody> \
                        <!-- /ko --> \
                        <!-- ko if: results().length === 0 --> \
                        <tbody> \
                            <tr style="height:35px;"> \
                                <td class="no-data-available " style="width:16px;" colspan="2" data-bind="text:  $root.contentResx.analytics_NoDataAvailable"></td> \
                            </tr> \
                             <tr class="nodatarow" > \
                                <td class="nodatarow" style="background-color: white;"><img src="/admin/personaBar/images/empty-state-bar_graphic_1.png" class="nodatarow"></td> \
                            </tr> \
                            <tr class="nodatarow"> \
                                <td class="nodatarow" style="background-color: white;"><img src="/admin/personaBar/images/empty-state-bar_graphic_2.png" class="nodatarow"></td> \
                            </tr> \
                             <tr class="nodatarow"> \
                                <td class="nodatarow" style="background-color: white;"><img src="/admin/personaBar/images/empty-state-bar_graphic_3.png" class="nodatarow"></td> \
                            </tr> \
                             <tr class="nodatarow"> \
                                <td class="nodatarow" style="background-color: white;"><img src="/admin/personaBar/images/empty-state-bar_graphic_4.png" class="nodatarow"></td> \
                            </tr> \
                        </tbody> \
                        <!-- /ko --> \
                </table>'
    });
});