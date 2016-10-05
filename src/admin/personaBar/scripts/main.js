(function () {
    'use strict';
    var v = (function () {
        var d = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
        var q = location.search.substring(1);
        var k = q.split('&');
        for (var i in k) {
            var l = k[i].split('=');
            if (l.length > 1) {
                if ('cdv' === d(l[0]))
                    return d(l[1]);
            }
        }
        return '';
    })();

    var debugMode = window.top.dnn && (window.top.dnn.getVar('pb_debugMode') === "true");
    requirejs.config({
        baseUrl: 'scripts/contrib/',
        paths: {
            'templatePath': '../../',
            'cssPath': '../../css/'
        },
        urlArgs: (v ? 'cdv=' + v : '') + (debugMode ? '&t=' + Math.random() : ''),
        shim: {
            'jquery.hoverintent.min': ['jquery'],
            'jquery.qatooltip': ['jquery.hoverintent.min']
            
        },
        map: {
			'*': {
		        'dnn.jquery': ['../../../../Resources/Shared/Scripts/dnn.jquery'],
		        'dnn.jquery.extensions': ['../../../../Resources/Shared/Scripts/dnn.jquery.extensions'],
		        'dnn.extensions': ['../../../../Resources/Shared/scripts/dnn.extensions'],
		        'jquery.tokeninput': ['../../../../Resources/Shared/components/Tokeninput/jquery.tokeninput'],
		        'dnn.jScrollBar': ['../../../../Resources/Shared/scripts/jquery/dnn.jScrollBar'],
		        'dnn.servicesframework': ['../../../../js/dnn.servicesframework'],
		        'dnn.DataStructures': ['../../../../Resources/Shared/scripts/dnn.DataStructures'],
		        'jquery.mousewheel': ['../../../../Resources/Shared/scripts/jquery/jquery.mousewheel'],
				'dnn.TreeView': ['../../../../Resources/Shared/scripts/TreeView/dnn.TreeView'],
				'dnn.DynamicTreeView': ['../../../../Resources/Shared/scripts/TreeView/dnn.DynamicTreeView'],
				'dnn.DropDownList': ['../../../../Resources/Shared/Components/DropDownList/dnn.DropDownList'],

				'css.DropDownList': ['css!../../../../Resources/Shared/components/DropDownList/dnn.DropDownList.css'],
		        'css.jScrollBar': ['css!../../../../Resources/Shared/scripts/jquery/dnn.jScrollBar.css']
	        }
        }
    });
    requirejs.onError = function (err) {
        // If requireJs throws a timeout reload the page
        if (err.requireType === 'timeout') {
            console.error(err);
            location.reload();
        }
        else {
            console.error(err);
            throw err;
        }
    };
})();

require(['jquery', 'knockout', 'moment', '../util', '../sf', '../config', '../persistent',
        'domReady!'],
    function ($, ko, moment, ut, sf, cf, persistent) {
        var iframe = window.parent.document.getElementById("personaBar-iframe");
        if (!iframe) return;

        var activepanel = '';
        var activemodule = '';
        var parentBody = window.parent.document.body;
        var body = window.document.body;
        var config = cf.init();
        var utility = ut.init(config);
        var inAnimation = false;

        var rootPath = location.protocol + '//' + location.host + (location.port ? (':' + location.port) : '');

        if (rootPath.substr(rootPath.length - 1, 1) == '/') {
            rootPath = rootPath.substr(0, rootPath.length - 1);
        }
        window.requirejs.config({
            paths: {
                'rootPath': rootPath
            }
        });

        var onTouch = "ontouchstart" in document.documentElement;
        // Setting for 1024 resolution
        var width = parent.document.body.clientWidth;
        var socialTasksleft = 946;
        if (width <= 1024 && width > 768) {
            socialTasksleft = 786;
            $('.socialtasks').addClass("view-ipad landscape");
            $('.socialpanel-placeholder').css({ 'width': '700px' });
            $('.socialpanel').addClass("view-ipad landscape");
        } else if (width <= 768) {
            socialTasksleft = 586;
            $('.socialtasks').addClass("view-ipad portrait");
            $('.socialpanel-placeholder').css({ 'width': '500px' });
            $('.socialpanel').addClass("view-ipad portrait");
        }
        else {
            $('.socialpanel,.socialtasks').removeClass("view-ipad landscape portrait");
        }
        // Checking touch screen for second level menu - the above onTouch won't work on windows tablet - IE I didnt test but read about it.
        var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
        if (isTouch) {
            $('#topLevelMenu .personabarnav li').click(function () {
                var attribute = $(this).attr('data-hovermenu-id');
                $('#topLevelMenu > div').hide();
                if (attribute) {
                    var thisId = attribute.replace('#', '');
                    if ($('#topLevelMenu > div#' + thisId).length) {
                        $('#topLevelMenu > div#' + thisId).toggle();
                    }
                }
            });
            $(document).on('touchstart', function (event) {
                if (!$(event.target).closest('#topLevelMenu > div').length) {
                    $('#topLevelMenu > div').hide();
                }
            });
        }
        if (isTouch)
            $('body').addClass('touch');
        else
            $('body').addClass('non-touch');

        var isMac = navigator.appVersion.indexOf('Mac') > -1;
        if (isMac) $('body').addClass('mac');

        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        if (isSafari) $('body').addClass('safari');

        var isIe = (function () {
            if (navigator.appName == 'Microsoft Internet Explorer') return true;
            if (navigator.appName == 'Netscape') {
                var ua = navigator.userAgent;
                if (ua.indexOf('Trident') > -1) return true;
            }
            return false;
        })();
        if (isIe) $('body').addClass('ie');

        var mouseOnHovermenu = false;

        // define util -- very important
        var util = {
            sf: sf.init(config.siteRoot, config.tabId, config.antiForgeryToken, '#personaBar-loadingbar'),
            onTouch: onTouch,
            moment: moment,
            persistent: persistent.init(config, sf),
            inAnimation: inAnimation,
            closePersonaBar: function (cb) {
                var self = this;
                var buttons, persistentSaveCallback;

                if ($('.socialpanel-placeholder').is(":hidden")) return;

                buttons = $(".btn_panel");
                $('.btn_panel, .hovermenu > ul > li').removeClass('selected');

                parentBody.style.overflow = "auto";
                body.style.overflow = "hidden";

                persistentSaveCallback = function () {
                    inAnimation = true;
                    $('.socialpanel-placeholder').hide();
                    $(".socialtasks").animate({ left: -300 }, 189, 'linear', function () {
                        $(activepanel).animate({ left: -860 }, 189, 'linear', function () {
                            $('.socialpanel').css({ left: -860 }).hide();
                            $(".socialmask").animate({
                                opacity: 0.0
                            }, 200, function () {
                                iframe.style.width = "85px";
                                
                                // for mobile pad device...
                                if (onTouch) {
                                    iframe.style["min-width"] = "0";
                                    iframe.style.position = "fixed";
                                }

                                $(".socialmask").css("display", "none");
                                $(".btn_showsite").hide();
                                $(".btn_edit").show();
                                activepanel = null;
                                inAnimation = false;
                                $(document).unbind('keyup');
                                buttons.trigger('closingPersonaBar');

                                if (typeof cb === 'function') cb();
                            });
                        });
                    });
                };

                self.persistent.save({
                    expandPersonaBar: false
                }, persistentSaveCallback);
            },
            loadPanel: function (panelId, $btn, params) {
                var savePersistentCallback;

                if (inAnimation) return;
                var self = this;
                var moduleName = self.getModuleNameByParams(params);
                if (activepanel == panelId && activemodule == moduleName) return;

                $(".btn_panel, .hovermenu > ul > li").removeClass('selected');
                var wrapper = $(panelId);
                var template = wrapper.data('template');

                if ($(".socialmask").css("display") == 'none') {
                    iframe.style.width = "100%";
                    parentBody.style.overflow = "hidden";
                    body.style.overflow = 'auto';

                    // for mobile pad device...
                    if (onTouch) {
                        iframe.style["min-width"] = "1245px";
                        iframe.style.position = "fixed";
                    }

                    $btn.addClass('selected');

                    savePersistentCallback = function () {
                        activepanel = panelId;
                        activemodule = moduleName;
                        $(".btn_showsite").show();
                        $(".btn_edit").hide();

                        $(".socialmask").css("display", "block");
                        inAnimation = true;
                        $(".socialmask").animate({
                            opacity: 0.85
                        }, 200, function () {
                            $(activepanel).show().delay(100).animate({ left: 85 }, 189, 'linear', function () {
                                $(".socialtasks").delay(100).animate({ left: socialTasksleft }, 189, 'linear', function () {
                                    inAnimation = false;
                                    $('.socialpanel-placeholder').show();
                                    self.loadTemplate('tasks', $('div.socialtasks > div'));
                                    self.loadTemplate(template, wrapper, params);
                                    $(document).keyup(function (e) {
                                        if (e.keyCode == 27) {
                                            e.preventDefault();
                                            util.closePersonaBar();
                                        }
                                    });
                                });
                            });
                        });
                    };

                    self.persistent.save({
                        expandPersonaBar: true,
                        btnIndex: $('.btn_panel').index($btn),
                        activePanelId: panelId,
                    }, savePersistentCallback);

                } else {
                    if (activepanel !== panelId) {
                        inAnimation = true;
                        $(activepanel).fadeOut("fast", function () {
                            $(panelId).css({ left: 85 }).fadeIn("fast", function () {
                                $(".btn_panel, .hovermenu > ul > li").removeClass('selected');
                                $btn.addClass('selected');

                                savePersistentCallback = function () {
                                    activepanel = panelId;
                                    activemodule = moduleName;
                                    inAnimation = false;
                                    self.loadTemplate(template, wrapper, params);
                                };

                                var panelButton = $btn.hasClass("btn_panel") ? $btn
                                    : $("ul.personabarnav li[data-hovermenu-id='#" + $btn.parent().parent().attr('id') + "']");
                                self.persistent.save({
                                    expandPersonaBar: true,
                                    btnIndex: $('.btn_panel').index(panelButton),
                                    activePanelId: panelId
                                }, savePersistentCallback);
                            });
                        });
                    } else if (activemodule !== moduleName) {
                        activemodule = moduleName;
                        self.loadTemplate(template, wrapper, params);
                    }
                }
            },
            loadModuleDashboard: function (moduleName) {
                var self = this;
                self.loadPanel('#social-dashboard-panel', $('.btn_dashboard'), { moduleName: moduleName });
            },
            loadPageAnalytics: function () {
                var self = this;
                self.loadPanel('#pagetraffic-panel', $('.btn_analytics'));
            }
        };

        util = $.extend(util, utility);
        // end define util

        var setupHoverMenu = function () {
            if (onTouch) {
                return;
            }

	        var showMenuHandler = [];
            $('.btn_panel').each(function () {
                var mouseOnButton = false;
                mouseOnHovermenu = false;

                var $this = $(this);
                var hoverMenuId = $this.data('hovermenu-id');
                if (hoverMenuId === undefined) return;

                var $hoverMenu = $(hoverMenuId);
                $this.hover(function () {
                    mouseOnButton = true;
                    if ($hoverMenu.css('display') == 'none') {
                    	if (showMenuHandler.length > 0) {
                    		$.each(showMenuHandler, function (index, item) {
								clearTimeout(item);
		                    });
							showMenuHandler = [];
						}

                        showMenuHandler.push(setTimeout(function () {
                            if ($hoverMenu.css('display') == 'none' && mouseOnButton) {
                                if (!activepanel) iframe.style.width = "100%";

                                $hoverMenu.css({
                                    position:'absolute',
                                    left: '-1000px'
                                });

                                $('.btn_panel').each(function () {
                                	var menuId = $(this).data('hovermenu-id');
									if (menuId === undefined) return;

									$(menuId).hide();
	                            });

                                $hoverMenu.show();
                                // Fix ie personabar hover menús
                                showMenuHandler.push(setTimeout(function() {
                                    $('.hovermenu > ul').css('list-style-type', 'square');
                                    showMenuHandler.push(setTimeout(function() {
                                        $('.hovermenu > ul').css('list-style-type', 'none');
                                        showMenuHandler.push(setTimeout(function() {
                                            $hoverMenu.hide();
                                            $hoverMenu.removeAttr('style');
                                            showMenuHandler.push(setTimeout(function () {
                                                $hoverMenu.fadeIn('fast');
                                            }));

                                        }, 100));
                                    }));
                                }));

                            }
                        }, 50));
                    }
                }, function () {
                    mouseOnButton = false;
                    if ($hoverMenu.css('display') == 'block' && !mouseOnHovermenu) {
                        setTimeout(function () {
                            if ($hoverMenu.css('display') == 'block' && !mouseOnButton && !mouseOnHovermenu) {
                                if (!activepanel) iframe.style.width = "85px";
                                $hoverMenu.hide();
                            }
                        }, 50);
                    }
                });
            });

            $(".hovermenu").each(function () {
                var $this = $(this);
                var mouseOnButton = false;
                mouseOnHovermenu = false;

                $this.hover(function () {
                    mouseOnHovermenu = true;
                }, function () {
                    mouseOnHovermenu = false;
                    if ($this.css('display') == 'block' && !mouseOnButton) {
                        setTimeout(function () {
                            if ($this.css('display') == 'block' && !mouseOnButton && !mouseOnHovermenu) {
                                if (!activepanel) iframe.style.width = "85px";
                                $this.hide();
                            }
                        }, 800);
                    }
                });
            });

			 $('.btn_analytics').each(function () {
                var mouseOnButton = false;
                mouseOnHovermenu = false;

                var $this = $(this);
                var $hoverMenu = $('.incontext-analytics');
			     $hoverMenu.hover(function() {
			         mouseOnHovermenu = true;
			     }, function() {
			         mouseOnHovermenu = false;
			     });
                $this.hover(function () {
                    mouseOnButton = true;
                    if ($hoverMenu.css('display') == 'none') {
                        setTimeout(function () {
                            if ($hoverMenu.css('display') == 'none' && mouseOnButton) {
                                if (!activepanel) iframe.style.width = "100%";
                                $hoverMenu.fadeIn('fast', function () {
                                    util.loadInContextAnalytics('analytics-in-context', $('.incontext-analytics > div'), function () { });
								});
                            }
                        }, 50);
                    }
                }, function () {
                    mouseOnButton = false;
                    if ($hoverMenu.css('display') == 'block' && !mouseOnHovermenu) {
                        setTimeout(function () {
                            if ($hoverMenu.css('display') == 'block' && !mouseOnButton && !mouseOnHovermenu) {
                                if (!activepanel) iframe.style.width = "85px";
                                $hoverMenu.hide();
                            }
                        }, 50);
                    }
                });
            });
        };

        // Module Initialization
        var javascriptMainModuleNames = config.javascriptMainModuleNames.split(",");

        for (var i = 0; i < javascriptMainModuleNames.length; i++) {
			if(!javascriptMainModuleNames[i]) continue;
			var moduleName = "../" + javascriptMainModuleNames[i];
            var moduleCss = "css!cssPath" + javascriptMainModuleNames[i] + ".css";
            require([moduleName, moduleCss], function (mainModule) {
                if (!mainModule) return;

                if (typeof mainModule === 'object') {
                    mainModule.init(util);
                }
                else if (typeof mainModule === 'function') {
                    switch (mainModule.type) {
                        case 'Class':
                            new mainModule(util);
                            break;
                        case 'Static Class':
                            mainModule.init(util);
                            break;
                    }
                }
            });
        }

        if (config.hasValidLicenseOrTrial) {
            setupHoverMenu();

            if (!onTouch) {
                var mouseOnBtnAnalytics = false;
                var mouseOnInContextAnalytics = false;
                var $hoverMenu = $('.incontext-analytics');

                $('.btn_analytics').hover(function () {
                    mouseOnBtnAnalytics = true;
                    if ($hoverMenu.css('display') == 'none') {
                        setTimeout(function () {
                            if ($hoverMenu.css('display') == 'none' && mouseOnBtnAnalytics) {
                                if (!activepanel) iframe.style.width = "100%";
                                $hoverMenu.fadeIn('fast', function () {
                                    util.loadInContextAnalytics('analytics-in-context', $('.incontext-analytics > div'), function () { });
                                });
                            }
                        }, 800);
                    }

                }, function () {
                    mouseOnBtnAnalytics = false;
                    if ($hoverMenu.css('display') == 'block' && !mouseOnHovermenu) {
                        setTimeout(function () {
                            if ($hoverMenu.css('display') == 'block' && !mouseOnBtnAnalytics && !mouseOnInContextAnalytics) {
                                if (!activepanel) iframe.style.width = "85px";
                                $hoverMenu.hide();
                            }
                        }, 800);
                    }
                });

                $hoverMenu.hover(function () {
                    mouseOnInContextAnalytics = true;
                }, function () {
                    mouseOnInContextAnalytics = false;
                    if ($hoverMenu.css('display') == 'block' && !mouseOnHovermenu) {
                        setTimeout(function () {
                            if ($hoverMenu.css('display') == 'block' && !mouseOnBtnAnalytics && !mouseOnInContextAnalytics) {
                                if (!activepanel) iframe.style.width = "85px";
                                $hoverMenu.hide();
                            }
                        }, 800);
                    }
                });
            } 

            var setupMenu = function () {

                $(".btn_panel, .hovermenu > ul > li").click(function (evt) {
                    evt.preventDefault();
                    var $this = $(this);

					if($this.hasClass('selected')) {
						return;
					}

                    var panelId = $this.data('panel-id');

                    if (panelId === undefined) return;

                    var params = null;

                    var moduleName = $this.data('module-name');
                    if (moduleName !== undefined) {
                        params = { moduleName: moduleName };
                    };

                    util.loadPanel(panelId, $this, params);
                });

                $(".btn_showsite").click(function (e) {
                    e.preventDefault();
                    var needRefresh = $(this).data('need-refresh');
                    var needHomeRedirect = $(this).data('need-homeredirect');
                    util.closePersonaBar(function() {
                        if (needHomeRedirect) {
                            window.top.location.href = config.siteRoot;
                        }
                        else {
                            if (needRefresh) {
                                window.top.location.reload();
                            }
                        }

                    });
                });
            };
            setupMenu();

        } else {
            $(".personabarnav > li.btn_panel, .hovermenu > ul > li").addClass("disabled");
        }

        $('.socialmanageravatar img').attr('src', config.avatarUrl);
        
        iframe.style.width = "85px";

        var resizeWindows = function() {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent('resize', true, false);
            window.top.dispatchEvent(evt);

            (function ($) {
		        $(parent.document).trigger('personabaropened');
	        }(parent.$));
        };

        util.asyncParallel([
                function (cb1) {
                    util.loadResx(function () {
                        ko.applyBindings(util.resx.PersonaBar, document.getElementById('personabar'));
                        cb1();
                    });
                },
                function (cb2) {

                    if ($(parent.document).find("body").hasClass('dnnEditState')) {
                        $(".personabar").css({ left: 0, 'display': 'block' });
                        $(parentBody).animate({ marginLeft: 85 }, 1, 'linear', resizeWindows);
                    } else {
                        $(".personabar").show();
                        $(".personabar").css({ left: -100 });
                        $(parentBody).animate({ marginLeft: 85 }, 200, 'linear', resizeWindows);
                        $(".personabar").animate({ left: 0 }, 200, 'linear', cb2);
                    }
                }
        ],
        function () {
            var persistedSettings = util.persistent.load();

            if (persistedSettings.expandPersonaBar && persistedSettings.btnIndex >= 0) {
                var btn = $($('.btn_panel')[persistedSettings.btnIndex]);
                util.loadPanel(persistedSettings.activePanelId, btn);
            }
        });
    });
