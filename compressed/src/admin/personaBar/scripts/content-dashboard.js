define(["jquery","../scripts/analytics"],function($,analytics){"use strict";var analyticsModuleInstance=new analytics,init=function(wrapper,util,params,callback){params=$.extend({},params,{mode:"site",pageId:-1}),analyticsModuleInstance.init(wrapper,util,params,callback)},initMobile=function(wrapper,util,params,callback){params=$.extend({},params,{mode:"site",pageId:-1}),analyticsModuleInstance.initMobile(wrapper,util,params,callback)},load=function(params,callback){params=$.extend({},params,{mode:"site",pageId:-1}),analyticsModuleInstance.load(params,callback)},loadMobile=function(params,callback){params=$.extend({},params,{mode:"site",pageId:-1}),analyticsModuleInstance.loadMobile(params,callback)};return{init:init,initMobile:initMobile,load:load,loadMobile:loadMobile}});