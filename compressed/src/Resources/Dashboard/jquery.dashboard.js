!function($){$.fn.zebratable=function(options){var defaults={tblClass:"dashboardGrid",altClass:"dashboardTableAlt"},options=$.extend(defaults,options);return this.each(function(){$(this).addClass("dashboardGrid"),$(this).find(":has(th)").find("tr:odd").addClass("dashboardTableAlt"),$(this).find(":not(:has(th))").find("tr:even").addClass("dashboardTableAlt")})},$.delegate=function(rules){return function(e){var target=jQuery(e.target);for(var selector in rules)if(target.is(selector))return rules[selector].apply(this,jQuery.makeArray(arguments))}};var _cache={};$.template=function template(str,data){var fn=/\W/.test(str)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+str.replace(/[\r\t\n]/g," ").split("<#").join("\t").replace(/((^|#>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)#>/g,"',$1,'").split("\t").join("');").split("#>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):_cache[str]=cache[str]||template(document.getElementById(str).innerHTML);return data?fn(data):fn}}(jQuery),jQuery(document).ready(function($){$.template('<div id="<#=id#>" title="<#=title#> - <#=name#>" >Empty Dialog</div>');$('#dashboardTabs div[id$="-tab"]').hide(),$('#dashboardTabs div[id$="-tab"]:first').show(),$("#tablist li:first a").addClass("active"),$("#tablist li:first a").addClass("SubHead"),$("#dashboardTabs").click($.delegate({".dashboardTab":function(e){$("#tablist li a").removeClass("active"),$("#tablist li a").removeClass("SubHead"),$(e.target).addClass("active"),$(e.target).addClass("SubHead");var currentTab=$(e.target).attr("href");return $('#dashboardTabs div[id$="-tab"]').hide(),$(currentTab).show(),!1}})),$('#dashboardTabs div[id$="-tab"] table').zebratable(),$(window).bind("unload",function(){$("#dashboardTabs").unbind("click")})});