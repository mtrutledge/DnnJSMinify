﻿// DotNetNuke® - http://www.dnnsoftware.com
//
// Copyright (c) 2002-2015, DNN Corp.
// All rights reserved.

if (typeof dnn === "undefined" || dnn === null) { dnn = {}; };
﻿if (typeof dnn.ContentEditorManager === "undefined" || dnn.ContentEditorManager === null) { dnn.ContentEditorManager = {}; };

(function ($) {
    $.fn.dnnModuleManager = function (options) {
        if (!this.data("dnnModuleManager")) {
            this.data("dnnModuleManager", new dnnModuleManager(this, options));
        }

        return this;
    };

    var dnnModuleDialogInstance;
    var getModuleDialog = dnn.ContentEditorManager.getModuleDialog = function () {
        if (!dnnModuleDialogInstance) {
            dnnModuleDialogInstance = new dnn.dnnModuleDialog();
        }

        return dnnModuleDialogInstance;
    }

    ///dnnModuleManager Plugin
    var dnnModuleManager = function (container, options) {
        this.options = options;
        this.container = container;
        this.init();
    };

    dnnModuleManager.prototype = {
        constructor: dnnModuleManager,

        init: function () {
            this.options = $.extend({}, $.fn.dnnModuleManager.defaultOptions, this.options);
            var $this = this.$pane = this.container;

            if ($this.parent().attr('id') && $this.parent().attr('id').indexOf('_SyncPanel') > -1) {
                $this.parent().parent().addClass($this.parent().attr('class'));
                $this.parent().attr('class', '');
            }

            $this.addClass('dnnModuleManager');
            $this.append(this._generateLayout());

            this._injectVisualEffects();

            this._handleEvents();
        },

        getHandler: function () {
            this._handler = this.getPane().find('> .addModuleHandler');

            return this._handler;
        },

        getPane: function () {
            return $('#' + this.$pane.attr('id'));
        },

        _generateLayout: function () {
            var handler = this._handler = $('<a href="#" class="addModuleHandler"><span></span></a>');

            return handler;
        },
        
        _injectVisualEffects: function () {
            var actionMenus = [];
            var handler = this;

            this.container.find('div.DnnModule').each(function() {
                var module = $(this);
                var moduleId = handler._findModuleId(module);
                actionMenus.push('#moduleActions-' + moduleId);

                if (module.data('effectsInjected')) {
                    return;
                }

                module.data('effectsInjected', true);
                module.mouseover(function () {
                    if (window['cem_dragging']) {
                        return; //do nothing when dragging module.
                    }

                    if (!module.hasClass('active-module') && !module.hasClass('floating')) {

                        module.parent().find('> div.DnnModule').removeClass('active-module');
                        module.addClass('active-module');
                        $(menusSelector).not('[class~="floating"]').stop(true, true).fadeTo('fast', 0.5, function () {
                            $('#moduleActions-' + moduleId).not('[class~="floating"]').stop(true, true).fadeTo(0).show().fadeTo('fast', 1);
                        });
                    }
                });
            });

            if (this.container.data('effectsInjected')) {
                return;
            }

            this.container.data('effectsInjected', true);
            var menusSelector = actionMenus.join(',');
            this.container.mouseover(function (e) {
                if (window['cem_dragging']) {
                    return false; //do nothing when dragging module.
                }

                if (!$(this).hasClass('active-pane')) {
                    $('.actionMenu').stop(true, true).hide();
                    $(menusSelector).not('[class~="floating"]').show();
                    $('div.dnnSortable').removeClass('active-pane');
                    $(this).addClass('active-pane');
                }
                return false;
            }).mouseout(function (e) {
                if (window['cem_dragging']) {
                    return false; //do nothing when dragging module.
                }

                var target = $(e.relatedTarget);
                if (target.parents('.active-pane').length > 0 || target.hasClass('actionMenu') || target.parents('.actionMenu').length > 0) {
                    if (target.hasClass('actionMenu') && !target.hasClass('floating')) {
                        $('.actionMenu:visible').stop(true, true).css({ opacity: 0.5 });
                        target.stop(true, true).css({ opacity: 1 });
                    } else if (target.parents('.actionMenu').length > 0 && !target.parents('.actionMenu').hasClass('floating')) {
                        $('.actionMenu:visible').stop(true, true).css({ opacity: 0.5 });
                        target.parents('.actionMenu').stop(true, true).css({ opacity: 1 });
                    }
                    return false;
                }

                $(menusSelector).stop(true, true).hide();
                $(this).removeClass('active-pane');
                return false;
            });

            $(document).mouseover(function (e) {
                if (window['cem_dragging']) {
                    return false; //do nothing when dragging module.
                }

                if ($(e.target).parents('.actionMenu').length > 0 || $('.actionMenu:visible').length == 0) {
                    return;
                }

                $('.actionMenu').stop(true, true).hide();
                $('div.dnnSortable').removeClass('active-pane');
                $('div.dnnSortable > div.DnnModule').removeClass('active-module');
            });

            $('.actionMenu').mouseover(function () {
                return false;
            });

            setTimeout(function () {
                $('div.dnnSortable').trigger('mouseout');

                $(menusSelector).find('li[id$="-Delete"] a').each(function () {
                    var $deleteButton = $(this);
                    $deleteButton.off('click').dnnConfirm({
                        text: dnn.ContentEditorManagerResources.deleteModuleConfirm,
                        yesText: dnn.ContentEditorManagerResources.confirmYes,
                        noText: dnn.ContentEditorManagerResources.confirmNo,
                        title: dnn.ContentEditorManagerResources.confirmTitle,
                        isButton: true,
                        callbackTrue: function () {
                            dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
                            location.href = $deleteButton.attr('href');
                        }
                    });
                });
            }, 1000);
        },

        _findModuleId: function (module) {
            return module.find("a").first().attr("name");
        },

        _handleEvents: function () {
            this._handler.click($.proxy(this._addModuleHandlerClick, this));
        },

        _addModuleHandlerClick: function (e) {
            var dialog = getModuleDialog();
            if (!this._handler.hasClass('active')) {
                dialog.apply(this).open();
                this._handler.addClass('active');
            } else {
                dialog.close();
                this._handler.removeClass('active');
            }
            return false;
        }
    };

    $.fn.dnnModuleManager.defaultOptions = {};
    ///dnnModuleManager Plugin END
}(jQuery));