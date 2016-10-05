// DotNetNuke® - http://www.dnnsoftware.com
// Copyright (c) 2002-2015, DNN Corp.
// All rights reserved.

﻿'use strict';
if (typeof dnn === "undefined" || dnn === null) { dnn = {}; };

define(['jquery', 'knockout', '../scripts/config', 'pikaday', 'moment', '../scripts/pages.thumbnails', 'knockout.validation.min',
    '../scripts/koComponents/dateTimePicker'], function ($, ko, cf, pikaday, moment) {
    var config = cf.init();

    var pageSettingsManager = function (options) {
        this.options = options;
    };
    pageSettingsManager.prototype = {
        constructor: pageSettingsManager,

        init: function() {
            this._initValidationConfiguration();
            this.options = $.extend({}, pageSettingsDefaultOptions, this.options);
            this.container = $('<div class="pageSettingsContainer pageSettingsForm" />');
            this.panel = $('#pages-panel');
            this.panel.append(this.container);
            this.mobile = window.parent.document.getElementById('personaBar-mobi-iframe') !== null;

            var handler = this;
            $(window).resize(function() {
                handler._resizeContentContainer();
            });
        },

        getElement: function() {
            return this.container;
        },

        edit: function(pageId, activeViewIndex) { //edit page
            this._initForm('edit', function() {
                if (typeof pageId === "undefined" || pageId === null) {
                    pageId = config.tabId;
                }
                if (typeof activeViewIndex === "undefined") {
                    activeViewIndex = 0;
                }
                this._setCurrentPageId(pageId);
                this._setActiveViewIndex(activeViewIndex);
                this._editTab();
            });
        },

        addpage: function() { // add page
            this._initForm('addpage', function() {
                this._setCurrentPageId(-1);
                this._addTab();
            });
        },       

        addtpl: function() { // add template
            this._initForm('addtpl', function() {
                this._setCurrentPageId(-1);
                this._addTab('template');
            });
        },

        _initValidationConfiguration: function() {
            var handler = this;
            ko.validation.rules.pattern.message = 'Invalid.';
            ko.validation.configure({
                registerExtenders: true,
                messagesOnModified: true,
                insertMessages: true,
                parseInputAttributes: true,
                messageTemplate: null
            });

            ko.validation.rules['needTemplate'] = {
                validator: function(val, otherVal) {
                    return handler._getViewModel().page().tabId() > 0 || handler._getViewModel().page().templateId() > 0;
                },
                message: ''
            };

            ko.validation.registerExtenders();
        },

        _initForm: function(type, callback) {
            if (this._formLoaded !== type) {
                this._loadForm(type, function() {
                    this._initForm(type, callback);
                });

                return;
            }
            //create mask
            var handler = this;
            this._resizeContentContainer();

            var formContainer = this.container;
            var panel = this.panel;
            formContainer.css({
                top: 0,
                left: 0
            }).hide();
            panel.fadeOut('fast',
                function() {
                    formContainer.show();
                    panel.fadeIn('fast', function() {
                        handler._formOpened = true;
                        callback.call(handler);
                        $(window).trigger('resize');
                });
            });
        },

        _closeForm: function (callback) {
            var handler = this;
            var formContainer = this.container;
            var panel = this.panel;

            panel.fadeOut('fast', function() {
                handler._formOpened = false;
                formContainer.hide();

                var showMainPanel = true;
                if (typeof callback == "function") {
                    showMainPanel = callback.call(handler);
                }

                if (showMainPanel) {
                    panel.fadeIn('fast');
                }
            });
        },

        _getTemplate: function(type) {
            return 'pages-' + type + (this.mobile ? '.mobi' : '') + '.html';         
        },

        _loadForm: function(type, callback) {
            var handler = this;
            var template = this._getTemplate(type);

            window.require(['text!templatePath/' + template], function(content) {
                handler._createForm(type, content);
                callback.call(handler);
            });
        },

        _createForm: function(type, content) {
            if (typeof this._form == "undefined") {
                this._form = $('<div class="pageSettingsForm" />');
                this.container.append(this._form);
            } else {
                ko.cleanNode(this._form[0]);
            }

            var editForm = this._form;
            editForm.empty().append(content);

            this._addEventHandlers();
            this._initUI();

            this._viewModel = null; // reset view model
            var viewModel = this._getViewModel();
            ko.applyBindings(viewModel, editForm[0]);

            this._formLoaded = type;

            return editForm;
        },
     
        _initUI: function() {
            var handler = this;
            this._form.find('.page-settings div.body').tabs({
                activate: function(event, ui) {
                    setTimeout(function() {
                        handler._resizeContentContainer();
                    }, 0);
                }
            });

            this._form.find('.page-settings div.body .form-item input[type="checkbox"]').dnnCheckbox();
            this._form.find('.tags-input').dnnTagsInput({
                width: '100%',
                minInputWidth: '80px',
                defaultText: '',
                onAddTag: $.proxy(this._fieldsUpdateHandler, this),
                onRemoveTag: $.proxy(this._fieldsUpdateHandler, this)
            });
            this._form.find('.um-page-url-textbox input').prefixInput({ prefix: "/" }).on('blur', function() {
                var $this = $(this);
                if ($this.val() == "") {
                    $this.trigger('change');
                }
            });
            setTimeout(function() {
                var scoller = $('div.pagetemplate-list-scroller');
                scoller.jScrollPane();
            }, 100);
        },
  
        _resizeContentContainer: function() {
            if (!this._form) {
                return;
            }
            //resize content container
            var totalWidth = 0;
            var $templateScroller = this.container.find('div.pagetemplate-list-scroller');
            $templateScroller.find('div.pagetemplate-list-item').each(function() {
                totalWidth += $(this).outerWidth() + parseInt($(this).css('margin-left')) + parseInt($(this).css('margin-right'));
            });
            this.container.find('.pagetemplate-list-container').width(totalWidth);
            if ($templateScroller.data('jsp')) {
                $templateScroller.data('jsp').destroy();
                $templateScroller = this.container.find('div.pagetemplate-list-scroller');
            }
            $templateScroller.jScrollPane();
        },

        _addEventHandlers: function() {
            var saveButton = this._form.find('div.actions a.save');
            var createButton = this._form.find('div.actions a.create-page');
            var backButton = $('.pageSettingsForm a.go-back, .pageSettingsForm div.actions a.cancel');
            var showInPageMgmtButton = this._form.find('a.show-in-page-mgmt');
            var copyPermissionButton = this._form.find('a.btn-copypermission');
            var saveTemplateButton = $('.pageSettingsForm div.actions a.savetpl');
            var cancelTemplateButton = $('.pageSettingsForm div.actions a.cancel-tpl');
            saveButton.click($.proxy(this._saveDetails, this));
            createButton.click($.proxy(this._saveDetails, this));
            backButton.click($.proxy(this._back, this));
            showInPageMgmtButton.click($.proxy(this._showInPageMgmt, this));
            copyPermissionButton.click($.proxy(this._copyPermission, this));
            saveTemplateButton.click($.proxy(this._saveTemplateClickHandler, this));
            cancelTemplateButton.click($.proxy(this._cancelSaveAsTemplateClickHandler, this));
            //when ui content changed
            this._form.find('input, textarea, select')
            .change($.proxy(this._fieldsUpdateHandler, this))
            .keyup($.proxy(this._fieldsUpdateHandler, this));
        },

        _copyPageHandler: function() {
            var viewModel = this._getViewModel();
            var pageModel = viewModel.page();
            var sourceTabId = pageModel.tabId();
            this._setCurrentPageId(-1);
            pageModel.tabId(-1);
            pageModel.name('');
            pageModel.url('');
            pageModel.templateId(sourceTabId);
            pageModel.isCopy(true);
            viewModel.changed(true);
        },

        _saveAsTemplateClickHandler: function(e) {
            this._getViewModel().editType('template');

            var pageModel = this._getViewModel().page();
            var templateModel = this._getViewModel().template();
            templateModel.name(pageModel.name());
            templateModel.description(pageModel.description());
            templateModel.templateId(pageModel.tabId());
            this._showTemplateDialog();
        },

        _cancelSaveAsTemplateClickHandler: function(e) {
            $('.dialog-newtpl').dialog('close');
        },

        _showTemplateDialog: function(title) {
            $('.dialog-newtpl').dialog({
                autoOpen: true,
                dialogClass: 'dnnFormPopup',
                title: this.resx.pagesettings_SaveTemplate,
                modal: true
            });
        },

        _saveTemplateClickHandler: function(e) {
            var templateModel = this._getViewModel().template();
            templateModel.tabId(0);
            templateModel.pageType('template');
            templateModel.url('');
            this._saveTemplate();
        },

        _fieldsUpdateHandler: function(e) {
            this._getViewModel().changed(true);
        },

        hasPendingChanges: function() {
            return this._formOpened;
        },

        handlePendingChanges: function (e) {
            var handler = this;
            this._checkPendingChange(e, function () {
                this._closeForm(function() {
                    if (handler._pageContentChanged) {
                        $(e.target).data('need-refresh', true);
                    }

                    var events = $._data(e.target, 'events')['click'];
                    if (events && events.length > 1) {
                        for (var i = 1; i < events.length; i++) {
                            events[i].handler.call(e.target, e);
                        }
                    }
                    
                    if (dnn.dnnPageHierarchy && dnn.dnnPageHierarchy._closePersonaBarOnUpdate) {
                        dnn.dnnPageHierarchy._closePersonaBarOnUpdate = false;
                    }

                    var requestPanelId = $(e.target).data('panel-id');
                    return requestPanelId && this.panel.attr('id') === requestPanelId.replace('#', '') && !this.panel.is(':visible');
                });
            });

            e.stopImmediatePropagation();
            return false;
        },

        _setCurrentPageId: function (pageId) {
            this._currentPageId = pageId;
        },

        _getCurrentPageId: function () {
            return this._currentPageId;
        },

        _setActiveViewIndex: function (viewIndex) {
            this._activeViewIndex = viewIndex;
        },

        _getActiveViewIndex: function () {
            var index = this._activeViewIndex;
            this._activeViewIndex = 0; //reset to original as this is only use for once.
            return index;
        },

        _editTab: function () {
            var handler = this,
                pagePayload = { pageId: this._getCurrentPageId() };

            this._getViewModel().enableScheduling(false);

            var getWorkflowsPromise = this._getService().get('GetWorkflows');
            var getPageDetailsPromise = this._getService().get('GetPageDetails', pagePayload);
            var getPermissionGridDataPromise = this._getService().get('GetPermissionsData', pagePayload);
            
            $.when(getWorkflowsPromise, getPageDetailsPromise, getPermissionGridDataPromise).then(function (argsWorkflows, argsPageDetails, argsPermissions) {
                var workflows = argsWorkflows[0];
                var pageDetails = argsPageDetails[0];
                var permissions = argsPermissions[0];

                handler._viewModel.workflows.removeAll();
                ko.utils.arrayPushAll(handler._viewModel.workflows, workflows);

                handler._updateViewModel(pageDetails);
                handler._form.find('.tags-input').each(function () {
                    $(this).dnnImportTags(handler._getViewModel().page().tags());
                });
                handler._resizeContentContainer();
                handler._buildPermissionGrid(permissions);
            });

            this._form.find('.page-settings div.body').tabs("option", "active", this._getActiveViewIndex());
        },     

        _getTabUrlPreview: function getTabUrlPreview(url) {
            var handler = this;
            var deferred = $.Deferred();

            if (!url) {
                deferred.resolve('/');
            } else {
                handler._getService().getsilence('GetPageUrlPreview', { url: url }, function getPageUrlPreviewSuccess(data) {
                    deferred.resolve('/' + data.Url);
                });
            }
            return deferred.promise();
        },

        _addTab: function (type) {
            var handler = this;  

            this._getViewModel().enableScheduling(false);

            this._updateViewModel(this._getInitialViewModel());

            if (typeof type != "undefined") {
                this._getViewModel().page().pageType(type);
            }
            this._form.find('.tags-input').each(function () {
                $(this).dnnImportTags($(this).val());
            });       

            this._getService().get('GetAddNewPageInfo', {}, function (data) {
                //apply default fields
                var vm = handler._getViewModel();
                vm.page().description(data.defaults.description);
                vm.page().keywords(data.defaults.keywords);
           
                //apply workflows
                vm.page().isWorkflowCompleted(true);
                vm.workflows.removeAll();                

                for (var i = 0; i < data.workflows.length; i++) {
                    vm.workflows.push(data.workflows[i]);
                    if (data.workflows[i].IsDefaultWorkflow === true) {
                        vm.page().workflowId(data.workflows[i].WorkflowId);
                    }
                }
                //apply page templates
                vm.pageTemplates.removeAll();
                var defaultTemplateId = 0;
                for (var i = 0; i < data.templates.length; i++) {
                    vm.pageTemplates.push(data.templates[i]);

                    if (data.templates[i].useDefaultSkin) {
                        defaultTemplateId = data.templates[i].id;
                    }
                }
                vm.page().name
                    .extend({ rateLimit: 500 })
                    .subscribe(function onPageNameChanged(val) {
                        if (!vm.isTitleDirty) {
                            vm.page().title(val);
                            vm.isTitleDirty = false;
                        }
                        if (!vm.isUrlDirty) {
                            handler._getTabUrlPreview(val).done(function (urlPreview) {
                                vm.page().url(urlPreview);
                                vm.isUrlDirty = false;
                            });
                        }
                    });

                var descriptionSubscription = vm.page().description.subscribe(function () {
                    vm.isDescriptionDirty(true);
                    descriptionSubscription.dispose();
                });
                var keyWordsSubscription = vm.page().keywords.subscribe(function () {
                    vm.isKeyWordsDirty(true);
                    keyWordsSubscription.dispose();
                });
                vm.page().title.subscribe(function () {
                    vm.isTitleDirty = true;
                });
                vm.page().url.subscribe(function () {
                    vm.isUrlDirty = true;
                });

                vm.changed(false);

                setTimeout(function() {
                    if (defaultTemplateId > 0) {
                        $('div[data-template-id="' + defaultTemplateId + '"]').click();
                    }
                }, 20);

                handler._resizeContentContainer();
                dnn.dnnPageThumbnails.updateThumbnails();
            });

            this._getService().get('GetPermissionsData', { pageId: this._getCurrentPageId() }, function (data) {
                handler._buildPermissionGrid(data);
            });

            this._form.find('.page-settings div.body').tabs("option", "active", 0);
            this._form.find('.validationMessage').hide(); //doesn't show validation message as default.
            this._resizeContentContainer();
        },

        _updateViewModel: function (data) {
            var pageViewModel = this._viewModel.page();

            for (var a in data) {
                if (a !== '__ko_mapping__' && ko.isWriteableObservable(pageViewModel[a])) {
                    pageViewModel[a](typeof data[a] == "function" ? data[a]() : data[a]);
                }
            }

            pageViewModel.createdOnDate(pageViewModel.createdOnDate() !== null ? moment(data.createdOnDate).toDate() : new Date());
            pageViewModel.startDate(pageViewModel.startDate() !== null ? moment(data.startDate).toDate() : null);
            pageViewModel.endDate(pageViewModel.endDate() !== null ? moment(data.endDate).toDate() : null);
            this._viewModel.enableScheduling(pageViewModel.startDate() !== null || pageViewModel.endDate() !== null);

            this._viewModel.initialWorkflowId = this._viewModel.page().workflowId();
            this._viewModel.workflowHasBeenChanged(false);
            this._updateViewStatus({
                code: 0,
                field: '',
                message: ''
            });

            this._viewModel.editType('');
            this._viewModel.page().isCopy(false);
            this._viewModel.changed(false);
        },

        _updateViewStatus: function (data) {
            this._viewModel.status(data);
        },

        _getViewModel: function () {
            var handler = this;
            if (!this._viewModel) {
                this._viewModel = new (function () {
                    var self = this;

                    this.page = ko.observable(handler._getInitialViewModel());                                       
                    this.template = ko.observable(handler._getInitialViewModel());

                    this.changed = ko.observable(false);
                    this.isTitleDirty = false;
                    this.isUrlDirty = false;
                    this.isDescriptionDirty = ko.observable(false);
                    this.isKeyWordsDirty = ko.observable(false);

                    this.workflows = ko.observableArray();
                    this.workflowChanged = handler._workflowChanged;
                    this.workflowHasBeenChanged = ko.observable(false);
                    this.initialWorkflowId = this.page().workflowId();

                    this.workflowDisableTooltipShown = ko.observable(false);
                    this.showWorkflowDisableTooltip = function() {
                        this.workflowDisableTooltipShown(true);
                    };
                    this.hideWorkflowDisableTooltip = function() {
                        this.workflowDisableTooltipShown(false);
                    };

                    this.resx = handler.resx;
                    this.status = ko.observable({
                        code: 0,
                        field: '',
                        message: ''
                    });
                    this.pageTemplates = ko.observableArray([]);
                    this.editType = ko.observable('');

                    this.isErrorField = function (fieldName) {
                        return this.status().code > 0 && this.status().field === fieldName;
                    };           
                    this.selectTemplate = function (data, e) {
                        self.page().templateId(data.id);
                        $(e.currentTarget).parents('.pagetemplate-list-container').find('div.pagetemplate-list-item').removeClass('selected');
                        $(e.currentTarget).addClass('selected');
                    }
                    self.today = function () {
                        var today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return today;
                    };
                    self.tempStartDate = ko.observable();                    
                    self.tempEndDate = ko.observable();
                    self.startCalendarVisible = ko.observable(false);
                    self.endCalendarVisible = ko.observable(false);
                    self.showStartDatePicker = function () {                        
                        self.tempStartDate(self.page().startDate() || self.today());
                        self.startCalendarVisible(true);
                        self.endCalendarVisible(false);
                    };
                    self.showEndDatePicker = function () {                        
                        self.tempEndDate(self.page().endDate() || self.today());
                        self.startCalendarVisible(false);
                        self.endCalendarVisible(true);
                    };
                    self.cancelStartDate = function(){
                        self.startCalendarVisible(false);
                    };
                    self.cancelEndDate = function(){
                        self.endCalendarVisible(false);
                    };
                    self.applyStartDate = function () {
                        var page = self.page();
                        var date = new Date(self.tempStartDate().getTime());
                        page.startDate(date);
                        if (page.endDate() !== null && page.endDate().getTime() < page.startDate().getTime()) {
                            page.endDate(page.startDate());
                        }
                        self.startCalendarVisible(false);
                    };
                    self.applyEndDate = function () {
                        var page = self.page();                        
                        var date = new Date(self.tempEndDate().getTime());
                        page.endDate(date);
                        if (page.startDate() === null) {
                            var createdOnDay = page.createdOnDate();
                            createdOnDay.setHours(0, 0, 0, 0);
                            page.startDate(createdOnDay);
                        }
                        self.endCalendarVisible(false);
                    };
                    self.clearEndDate = function () {
                        self.endCalendarVisible(false);
                        self.page().endDate(null);
                    };
                    self.clearStartDate = function () {
                        self.startCalendarVisible(false);
                        self.page().startDate(null);
                    };
                    self.enableScheduling = ko.observable(false);
                    self.enableScheduling.subscribe(function (value) {
                        if (!value) {
                            self.startCalendarVisible(false);
                            self.endCalendarVisible(false);
                        }
                    });
          
                    this.saveAsTemplate = $.proxy(handler._saveAsTemplateClickHandler, handler);
                    this.duplicatePage = $.proxy(handler._copyPageHandler, handler);
                })();

                this._setModelValidation();
            }

            return this._viewModel;
        },

        _workflowChanged: function () {
            this.workflowHasBeenChanged(this.initialWorkflowId != this.page().workflowId());
        },

        _getInitialViewModel: function () {
            var pageModel = ko.mapping.fromJS({
                tabId: 0,
                name: '',
                localizedName: '',
                title: '',               
                description: '',
                tags: '',
                keywords: '',
                alias: '',
                url: '',
                includeInMenu: true,
                thumbnail: '',
                created: '',
                hierarchy: '',
                hasChild: false,
                type: 0,
                customUrlEnabled: true,
                templateId: 0,
                pageType: '', //if set to 'template' then means add template
                workflowId: ko.observable(-1),
                isWorkflowCompleted: false,
                applyWorkflowToChildren: false,
                isWorkflowPropagationAvailable: false,
                isCopy: false,
                trackLinks: false,
                startDate: null,
                endDate: null,
                createdOnDate: null,
                placeholderURL: '/'            
            });

            function formatDate(date) {
                if (date === null) return "";

                var format = "MM/DD/YYYY [" + dnn.dnnPageSettings.resx.pagesettings_DateTimeSeparator + "] hh:mma";

                return moment(date).format(format);
            }

            pageModel.formattedStartDate = ko.computed(function () {
                return formatDate(pageModel.startDate());             
            });

            pageModel.formattedEndDate = ko.computed(function() {
                return formatDate(pageModel.endDate());
            });

            return pageModel;
        },


        _setModelValidation: function () {
            var pageModel = this._getViewModel().page();
            pageModel.errors = ko.validation.group(pageModel);
            pageModel.name.extend({ required: true }).subscribe($.proxy(this._validationFieldChanged, this));
            pageModel.templateId.extend({ needTemplate: { message: $.proxy(this._needTemplateMessage, this) } }).subscribe($.proxy(this._validationFieldChanged, this));

            var templateModel = this._getViewModel().template();
            templateModel.errors = ko.validation.group(templateModel);
            templateModel.name.extend({ required: true }).subscribe($.proxy(this._validationFieldChanged, this));
        },

        _validationFieldChanged: function (newValue) {
            this._resizeContentContainer();
        },

        _needTemplateMessage: function() {
            return this._getViewModel().page().pageType() == 'template' ? this.resx.pagesettings_Errors_templates_NoTemplate : this.resx.pagesettings_Errors_NoTemplate;
        },

        _convertToObject: function (model) { //convert view model to simple js object.            
            var dateFormat = "YYYY-MM-DDTHH:mm[Z]";
            var o = ko.mapping.toJS(model);            
            o.startDate = model.startDate() !== null ? moment(model.startDate()).format(dateFormat) : null;
            o.endDate = model.endDate() !== null ? moment(model.endDate()).format(dateFormat) : null;
            return o;
        },

        _buildPermissionGrid: function (data) {
            var gridContainer = $('#page-permissions');
            var handler = this;

            //build roles permission
            if (this._permissionGrid) {
                this._permissionGrid.getLayout().remove();
                this._permissionGrid = null;
            }

            dnn.controls.PermissionGrid.resx = this.resx;
            this._permissionGrid = new dnn.controls.PermissionGrid(this, data, {
                onPermissionChanged: $.proxy(this._fieldsUpdateHandler, this)
            });
            gridContainer.prepend(this._permissionGrid.getLayout());

            this._permissionGrid.getLayout().on('tableUpdated', function () {
                handler._resizeContentContainer();
            });
        },

        _isAddPage: function isAddPage() {
            return this._getViewModel().page().tabId() <= 0;
        },

        _saveDetails: function (e, callback) {
            var handler = this;

            if (this._saving) {
                return false;
            }
            var viewModel = this._getViewModel();
            var pageModel = viewModel.page();
            if (pageModel.errors().length > 0) {
                pageModel.errors.showAllMessages();
                this._form.find('.validationMessage:not(:empty)').show();
                this._resizeContentContainer();
                return false;
            }
            
            pageModel.tags(this._form.find('.tags-input').val());

            var params = this._convertToObject(pageModel);

            if (!viewModel.isUrlDirty && this._isAddPage()) {
                params.url = '';
            }
            if (!viewModel.enableScheduling()) {
                params.startDate = null;
                params.endDate = null;
            }

            this._saving = true; //avoid multiple post
            this._getService().post('SavePageDetails', params, function (data) {
                if (data.Status > 0) {
                    handler._updateViewStatus({
                        code: data.Status,
                        field: data.Field,
                        message: data.Message
                    });
                    handler._saving = false;
                    return;
                }

                viewModel.changed(false);
                data.Page.isCopy = pageModel.isCopy();

                if (!pageModel.pageType || pageModel.pageType() !== 'template') {
                    handler._pageContentChanged = true;
                }
                
                handler._savePermissions(data.Page, callback);
            });

            return false;
        },

        _saveTemplate: function (e) {
            if (this._saving) {
                return false;
            }

            var templateModel = this._getViewModel().template();
            if (templateModel.errors().length > 0) {
                templateModel.errors.showAllMessages();
                this._form.find('.validationMessage:not(:empty)').show();
                this._resizeContentContainer();
                return false;
            }

            var handler = this;
            this._saving = true;//avoid multiple post
            this._getService().post('SavePageDetails', this._convertToObject(templateModel), function (data) {
                if (data.Status > 0) {
                    handler._updateViewStatus({
                        code: data.Status,
                        field: data.Field,
                        message: data.Message
                    });
                    handler._saving = false;
                    return;
                }

                handler._savePermissions(data.Page);
            });

            return false;
        },

        _savePermissions: function (pageData, callback) {
            var handler = this;
            var permissions = this._permissionGrid.getPermissions();
            permissions.tabId = pageData.id,
            this._getService().post('SavePagePermissions', permissions, function (data) {
                handler._saving = false;

                if (data.Status > 0) {
                    $.dnnAlert({ text: data.Message });
                    return;
                }

                handler._closeForm(function () {
                    var viewModel = handler._getViewModel();

                    if (viewModel.editType() == 'template') {
                        //hide template dialog
                        if ($('.dialog-newtpl').data('ui-dialog')) {
                            $('.dialog-newtpl').dialog('close');
                        }

                        handler.getElement().trigger('templateAdded', [pageData]);

                        return;
                    }

                    var detail = this._convertToObject(viewModel.page());

                    if (typeof detail.tabId == "undefined" || detail.tabId <= 0) {
                        handler.getElement().trigger(((detail.pageType && detail.pageType.length > 0) ? detail.pageType : 'page') + 'Added', [pageData]);
                    } else {
                        handler.getElement().trigger('pageEdit', [pageData]);
                    }

                    if (typeof callback == "function") {
                        callback.call(handler);
                    }

                    return true;
                });
            });
        },

        _copyPermission: function () {
            this._getService().post('CopyPagePermissions', { id: this._getCurrentPageId() }, function (data) {
                $.dnnAlert({ text: data.Message });
            });
        },

        _back: function (e, callback) {
            if (this._saving) {
                return false;
            }

            this._checkPendingChange(e, function() {
                this._closeForm(function() {
                    if (typeof callback == "function") {
                        callback.call(this);
                    }

                    this.getElement().trigger('pageSettingsCancel');
                    return true;
                });
            });
            return false;
        },

        _showInPageMgmt: function (e) {
            return this._back(e, function () {
                if (dnn.dnnPageHierarchy) {
                    dnn.dnnPageHierarchy.selectPage(this._getCurrentPageId());
                }
            });
        },

        _checkPendingChange: function (e, callback) {
            var handler = this;
            var viewModel = this._getViewModel();
            if (viewModel.changed()) {
                var confirmText = this.resx.pagesettings_ContentChanged;
                var saveText = this.resx.pagesettings_Save;
                var cancelText = this.resx.pages_Discard;

                this.utility.confirm(confirmText, saveText, cancelText, function() {
                    handler._saveDetails(e, callback);
                }, function() {
                    if (typeof callback == "function") {
                        callback.call(handler);
                    }
                    viewModel.changed(false);
                });

                return true;
            } else {
                if (typeof callback == "function") {
                    callback.call(this);
                }
            }

            return false;
        },

        _getPersonaBar: function () {
            return $('#personabar');
        },

        _getService: function () {
            this.serviceController.moduleRoot = "EvoqContentLibrary";
            this.serviceController.controller = "PageManagement";

            return this.serviceController;
        },

        _getVar: function (name) {
            var dnn = window != window.top ? window.top['dnn'] : window['dnn'];
            return dnn.getVar(name);
        }
    };

    var pageSettingsDefaultOptions = {
        requestDelayTime: 2000,
        defaultThumbnail: 'fallback-thumbnail.png'
    };

    if (!dnn.dnnPageSettings) {
        dnn.dnnPageSettings = new pageSettingsManager();
    }

    return dnn.dnnPageSettings;
});