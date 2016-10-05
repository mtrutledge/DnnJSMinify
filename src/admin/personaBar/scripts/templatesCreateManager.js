/*
DotNetNuke® - http://www.dotnetnuke.com
Copyright (c) 2002-2015
by DotNetNuke Corporation
All Rights Reserved
*/

/*
* this module is responsible to the view model of the template creation
*/
define(['jquery', 'knockout', 'knockout.mapping', 'knockout.validation.min', 'jquery-ui.min',
        '../scripts/permissionGridManager',
        '../scripts/permissionGrid'],
function ($, ko, koMapping) {
    'use strict';

    var viewModel = {},
        serviceController,
        selectedTemplate, defaultTemplate,
        permissionGrid,
        defaultWorkflow,
        isSaving;

    var init, refreshConfiguration, initValidationConfiguration,
        getViewModel,
        getService,
        getDefaultWorkflow,
        getTemplates, convertTemplateViewModel,
        selectTemplate,
        getDefaultSelectedTemplate,
        addTemplate, cancelTemplate, onDeleteCallback,
        getPermissions, savePermissions,
        saveTemplate, onSaveTemplateSuccessCallback,
        updateStatus,
        isErrorField;

    var Status = function (data) {
        if (!data) {
            return {
                code: ko.observable(0),
                field: ko.observable(''),
                message: ko.observable('')
            };
        }
        return null;
    };

    var Template = function (data) {
        if (!data) {
            return {
                tabId: 0,
                name: ko.observable(''),
                localizedName: '',
                title: '',
                description: ko.observable(''),
                tags: '',
                keywords: '',
                alias: '',
                url: '/',
                includeInMenu: true,
                thumbnail: '',
                created: '',
                hierarchy: '',
                hasChild: false,
                type: 0,
                customUrlEnabled: true,
                templateId: ko.observable(0),
                pageType: 'template', //if set to 'template' then means add template
                workflowId: ko.observable(-1),
                isWorkflowCompleted: false,
                applyWorkflowToChildren: false,
                isWorkflowPropagationAvailable: false,
                isCopy: false,
                trackLinks: false
            };
        }
        return null;
    };

    initValidationConfiguration = function () {
        ko.validation.rules.pattern.message = 'Invalid.';
        ko.validation.configure({
            registerExtenders: true,
            messagesOnModified: true,
            insertMessages: true,
            parseInputAttributes: true,
            messageTemplate: null
        });

        ko.validation.rules['needTemplate'] = {
            validator: function (val, otherVal) {
                return val > 0;
            },
            message: ''
        };

        ko.validation.registerExtenders();
    };

    getService = function () {
        serviceController.moduleRoot = "EvoqContentLibrary";
        serviceController.controller = "PageManagement";

        return serviceController;
    };

    convertTemplateViewModel = function (data) {
        data.selected = ko.observable(false);
        return data;
    };

    getTemplates = function () {
        getService().get('GetPageTemplates', {}, function (data) {
            viewModel.pageTemplates.removeAll();
            for (var i = 0; i < data.length; i++) {
                var template = convertTemplateViewModel(data[i]);

                if (data[i].useDefaultSkin) {
                    template.selected(true);
                    defaultTemplate = template;
                    selectedTemplate = template;
                } else {
                    template.selected(false);
                }

                viewModel.pageTemplates.push(template);

            }
        });
    };

    getDefaultWorkflow = function () {
        getService().get('GetWorkflows', null, function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].IsDefaultWorkflow === true) {
                    defaultWorkflow = data[i];
                }
            }
        });
    };

    getDefaultSelectedTemplate = function() {
        var defaultSelected = defaultTemplate;
        if (!defaultSelected && viewModel.pageTemplates().length > 0) {
            defaultSelected = viewModel.pageTemplates()[0];
        }
        return defaultSelected;
    };

    addTemplate = function () {
        if (viewModel.visibleAddTemplateForm()) {
            return;
        }

        var defaultSelected = getDefaultSelectedTemplate();
        if (defaultSelected) {
            defaultSelected.selected(true);
            viewModel.page.templateId(defaultSelected.id);
        }
        viewModel.validationObservable.errors.showAllMessages(false);
        viewModel.visibleAddTemplateForm(true);
    };

    selectTemplate = function (template) {
        var previousValue = template.selected();
        selectedTemplate = null;

        viewModel.pageTemplates().forEach(function (t) { t.selected(false); });

        template.selected(!previousValue);

        if (template.selected()) {
            selectedTemplate = template;
            viewModel.page.templateId(selectedTemplate.id);
        } else {
            selectedTemplate = null;
            viewModel.page.templateId(null);
        }
    };

    updateStatus = function (data) {
        viewModel.status.code(data.Status);
        viewModel.status.field(data.Field);
        viewModel.status.message(data.Message);
    };

    getPermissions = function () {
        getService().get('GetPermissionsData', { pageId: -1 }, function (data) {
            //build roles permission
            if (permissionGrid) {
                permissionGrid.getLayout().remove();
                permissionGrid = null;
            }

            dnn.controls.PermissionGrid.resx = viewModel.resx;
            var permissionGridParent = {
                _getService: getService
            };
            permissionGrid = new dnn.controls.PermissionGrid(permissionGridParent, data);
        });
    };

    savePermissions = function (pageData, callback) {
        var permissions = permissionGrid.getPermissions();
        permissions.tabId = pageData.id;

        getService().post('SavePagePermissions', permissions, function (data) {
            isSaving = false;

            if (data.Status > 0) {
                $.dnnAlert({ text: data.Message });
                return;
            }

            callback(pageData);
        });
    }

    onSaveTemplateSuccessCallback = function (data) {
        if (data.Status > 0) {
            updateStatus(data);
            isSaving = false;
            return;
        }

        savePermissions(data.Page, function (pageData) {
            if (dnn.dnnTemplatesHierarchy) {
                dnn.dnnTemplatesHierarchy.addTemplate(data);
            }
            viewModel.pageTemplates.push(convertTemplateViewModel(pageData));

            cancelTemplate();
        });
    };

    saveTemplate = function () {
        if (isSaving) {
            return;
        }
        isSaving = true;


        var pageModel = viewModel.page;
        if (pageModel.errors().length > 0) {
            pageModel.errors.showAllMessages();
            isSaving = false;
            return false;
        }

        viewModel.page.workflowId = defaultWorkflow.WorkflowId;

        var data = ko.mapping.toJS(viewModel.page);
        getService().post('SavePageDetails', data, onSaveTemplateSuccessCallback);
    };

    cancelTemplate = function () {
        viewModel.pageTemplates().forEach(function (t) { t.selected(false); });

        var defaultSelected = getDefaultSelectedTemplate();
        if (defaultSelected) {
            defaultSelected.selected(true);
            viewModel.page.templateId(defaultSelected.id);
        }
        viewModel.page.name(null);
        viewModel.page.description(null);

        isSaving = false;
        viewModel.visibleAddTemplateForm(false);
    };

    isErrorField = function (fieldName) {
        return viewModel.status.code > 0 && viewModel.status.field == fieldName;
    };

    onDeleteCallback = function (data) {
        var deletedTemplate = null;

        viewModel.pageTemplates().forEach(function (t) {
            if (t.id === data.id) {
                deletedTemplate = t;
            }
        });

        if (deletedTemplate) {
            viewModel.pageTemplates.remove(deletedTemplate);
            if (defaultTemplate && defaultTemplate.id === deletedTemplate.id) {
                defaultTemplate = null;
            }
        }
    };

    init = function (service, resx) {
        serviceController = service;
        initValidationConfiguration();

        viewModel = {
            pageTemplates: ko.observableArray([]),

            visibleAddTemplateForm: ko.observable(false),
            resx: resx,
            status: new Status(),
            page: new Template(),

            isErrorField: isErrorField,
            addTemplate: addTemplate,
            saveTemplate: saveTemplate,
            selectTemplate: selectTemplate,
            cancelTemplate: cancelTemplate
        };

        var templateModel = viewModel.page;
        templateModel.errors = ko.validation.group(templateModel);
        templateModel.name.extend({ required: true });
        templateModel.templateId.extend({ needTemplate: { message: viewModel.resx.pagesettings_Errors_templates_NoTemplate } });
        viewModel.validationObservable = ko.validatedObservable({
            name: templateModel.name
        });

        refreshConfiguration();
    };

    refreshConfiguration = function () {
        getTemplates();
        getDefaultWorkflow();
        getPermissions();
    };

    getViewModel = function () {
        return viewModel;
    };

    return {
        init: init,
        refreshConfiguration: refreshConfiguration,
        onDeleteCallback: onDeleteCallback,
        getViewModel: getViewModel
    };
});