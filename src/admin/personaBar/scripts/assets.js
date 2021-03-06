'use strict';
define(['jquery',
        'knockout',
        'knockout.mapping',
        '../scripts/validator',
        '../scripts/config',
        '../scripts/tabpanel',
        'jquery.tokeninput.min',
        '../scripts/permissionGrid',
        '../scripts/permissionGridManager',
        '../../../Resources/Shared/Scripts/dnn.jquery',
        '../scripts/koBindingHandlers/folderPicker',
        '../scripts/koBindingHandlers/tagsInput',
        'css!../../../Resources/Shared/components/DropDownList/dnn.DropDownList.css',
        'css!../../../Resources/Shared/Components/FileUpload/dnn.FileUpload.css',
        'css!../../../Resources/Shared/scripts/jquery/dnn.jScrollBar.css'],

function ($, ko, komapping, validator, cf, tabpanel) {
    ko.mapping = komapping;

    var config = cf.init();
    var utility = null;
    var wrapper = null;
    var isMobile = false;

    var permissionGrid;
    var fileUpload;

    var itemContainer = null;
    var containerTop = 0;
    var scrollItem = null;

    var itemsPerRow = 0;
    var itemsPerPage = 0;

    var animationDuration = 300;

    var viewModel = {
        currentFolder: ko.observable(),
        rootFolderId: config.rootFolderId,
        breadcrumb: ko.observableArray(),
        folderContent: ko.observableArray(),
        lastPage: ko.observable(),
        totalItemCount: ko.observable(),
        inputSearchText: ko.observable(''),
        searchText: ko.observable(''),
        selectedItem: ko.observable(),
        itemEditing: {
            itemId: ko.observable(null),
            isFolder: ko.observable(),
            itemName: ko.observable(),
            fileNameFocused: ko.observable(false),
            folderNameFocused: ko.observable(false),
            iconUrl: ko.observable(),
            createdOnDate: ko.observable(),
            createdBy: ko.observable(),
            lastModifiedOnDate: ko.observable(),
            lastModifiedBy: ko.observable(),
            size: ko.observable(),
            title: ko.observable(),
            subscribed: ko.observable(),
            url: ko.observable(),
            tags: ko.observable(),
            folderType: ko.observable(),
            workflows: ko.observableArray(),
            workflowId: ko.observable(),
            originalWorkflowId: ko.observable(),
            workflowAction: ko.observable(),
            versioning: ko.observable()
        },
        folderAdding: {
            folderName: ko.observable(''),
            folderNameFocused: ko.observable(false),
            folderTypes: ko.observableArray(),
            parentFolderType: ko.observable(),
            selectedFolderType: ko.observable(),
            mappedName: ko.observable()
        },
        uploading: {
            imageUrl: ko.observable(),
            fileName: ko.observable(),
            showConfirmation: ko.observable(false),
            pendingfiles: null,
            overwrite: false
        },
        itemToHighlight: ko.observable(),
        loading: ko.observable(true)
    };

    var mappingOptions = {
        create: function(options) {
            var item = ko.mapping.fromJS(options.data, {
                    observe: ["ItemName"]
                });
            item.selected = ko.observable(false);
            item.saved = ko.observable(false);
            item.highlight = ko.computed(function() {
                return item.saved()
                    || viewModel.itemToHighlight()
                        && item.IsFolder === viewModel.itemToHighlight().isFolder
                        && item.ItemName() === viewModel.itemToHighlight().itemName;
            });
            return item;
        }
    };

	var throttledSearchText = ko.computed(viewModel.inputSearchText)
                                .extend({ throttle: 400 });

	throttledSearchText.subscribe(function (text) {
	    if (text.length == 0 || text.length >= 3) {
	        viewModel.searchText(text);
        }
	}, viewModel);

    viewModel.doSearch = function (text) {
        if (text.length === 0) {
            refreshCurrentFolder();
        } else {
            search(viewModel.currentFolder().FolderID, text);
        }
    }

    viewModel.searchText.subscribe(viewModel.doSearch);

    viewModel.folderAdding.folderTypeDisabled = ko.computed(function() {
		return !viewModel.folderAdding.parentFolderType() || viewModel.folderAdding.parentFolderType().IsDefault === false;
	});

	viewModel.folderAdding.mappedNameHidden = ko.computed(function () {
		return !viewModel.folderAdding.selectedFolderType() || viewModel.folderAdding.selectedFolderType().IsDefault 
			|| !viewModel.folderAdding.parentFolderType() || !viewModel.folderAdding.parentFolderType().IsDefault;
	});

    var showTopPanel = function (panelClass, complete) {
        var panel = wrapper.find("div." + panelClass);
        if (panel.is(":visible")) {
            !complete || complete();
            return;
        }

        closeTopPanel(function () {
            $("div.body").animate({ scrollTop: 220 });
            var h = panel.outerHeight();
            panel.slideDown(animationDuration, complete);
            itemContainer.addClass("disabled").animate({ top: containerTop + h });
            viewModel.hideDetails();
        });
    };

    var closeTopPanel = function (complete) {
        itemContainer.removeClass("disabled");
        var panel = wrapper.find("div.top-panel:visible");
        if (panel.length == 1) {
            panel.slideUp(animationDuration, complete);
            itemContainer.animate({ top: containerTop });
        } else {
            !complete || complete();
        }
    };

    viewModel.addFolder = function () {
        var firstTab = wrapper.find('div.add-folder > ul.tabControl > li:first-child');
        firstTab.trigger('click');
        viewModel.folderAdding.folderName('');        

        loadTypes();
         
        showTopPanel("add-folder");
        viewModel.folderAdding.folderNameFocused(true);        

        viewModel.folderAdding.mappedName('');
    };

    var assetsService = function () {
        utility.sf.moduleRoot = 'dnncorp/personaBar';
        utility.sf.controller = 'assets';
        return utility.sf;
    };

    var getFolderType = function(d, id) {
        for (var i = 0; i < d.length; i++) {
            if (d[i].FolderMappingID == id) {
                return d[i];
            }
        }

        return null;
    };

    var loadTypes = function () {
        assetsService().get('GetFolderMappings', null, function (d) {
            viewModel.folderAdding.folderTypes.removeAll();
            ko.utils.arrayPushAll(viewModel.folderAdding.folderTypes, d);

            var defaultFolderTypeId = viewModel.currentFolder().FolderID == config.rootFolderId ?
                config.defaultFolderMappingId : viewModel.currentFolder().FolderMappingID;

            viewModel.folderAdding.parentFolderType(getFolderType(d, viewModel.currentFolder().FolderMappingID));            
            viewModel.folderAdding.selectedFolderType(getFolderType(d, defaultFolderTypeId));
        });
    };

    var loadWorkflows = function () {
        assetsService().get('GetWorkflows', null, function (d) {
            viewModel.itemEditing.workflows.removeAll();
            ko.utils.arrayPushAll(viewModel.itemEditing.workflows, d);
        });
    };

    viewModel.cancelFolder = function () {
        closeTopPanel();
    };

    viewModel.saveFolder = function () {
        if(!validator.validate(wrapper.find('div.top-panel.add-folder'))) return;

        var params = {
            FolderName: viewModel.folderAdding.folderName(),
            ParentFolderId: viewModel.currentFolder().FolderID,
            FolderMappingId: viewModel.folderAdding.selectedFolderType().FolderMappingID,
            MappedName: viewModel.folderAdding.mappedName()
        };

        assetsService().post('CreateNewFolder', params, function () {
            closeTopPanel();
            refreshCurrentFolder({ itemName: params.FolderName, isFolder: true });
        }, function (x) {
            failed(x);
            viewModel.folderAdding.folderNameFocused(true);
        });
    };

    var getCurrentFolderPath = function () {
        var path = '';
        for (var i = 1; i < viewModel.breadcrumb().length; i++) {
            path += viewModel.breadcrumb()[i].FolderName + '/';
        }

        return path;
    }

    viewModel.addAsset = function () {
        viewModel.uploading.showConfirmation(false);
        viewModel.uploading.imageUrl('');
        viewModel.uploading.overwrite = false;
        wrapper.find("#uploader").val("");

        fileUpload.setUploadPath(getCurrentFolderPath());
        showTopPanel("add-asset");        
    };

    viewModel.closeAddAsset = function() {
        closeTopPanel();
    };

    viewModel.itemClick = function (item, e) {
        if (itemContainer.is(".disabled")) {
            return;
        }

        if ($('body').is('.touch') && !item.selected()) {
        	viewModel.setSelectedItem(item);        	
            return;
        }

        if (item.IsFolder) {
            getFolderContent(item.ItemID);
        } else {
            assetsService().get('GetFileDetails', { fileId: item.ItemID }, function (data) {
                window.open(getFullUrl(data.Url));
            }, failed);
        }

        return;
    };

    viewModel.itemTap = function (item, e) {        
        if (itemContainer.is(".disabled")) {
            return;
        }

        if (item.IsFolder) {
			item.selected(true);

			var uiElement = $(e.currentTarget).closest('div.item');
			itemContainer.find("div.item:not(.selected)").fadeOut();
			scrollTopElement(uiElement, function () {
				getFolderContent(item.ItemID);	
			});
        } else {
            viewModel.showDetails(item, e);
        }

        return;        
    };

    var scrollTopElement = function (uiElement, callback) {
        var scrollPos = scrollItem[0].scrollTop + uiElement.position().top - 4;
        scrollItem.animate({ scrollTop: scrollPos }, uiElement.position().top != 0 ? animationDuration : 0, 'swing', callback);
    };

	viewModel.setSelectedItem = function (item) {
		!viewModel.selectedItem() || viewModel.selectedItem().selected(false);
        viewModel.selectedItem(item);
        item.selected(true);
	};

    var focusEditName = function() {
        if (viewModel.itemEditing.isFolder()) {
            viewModel.itemEditing.folderNameFocused(true);
        } else {
            viewModel.itemEditing.fileNameFocused(true);
        }

		 wrapper.find('div.dnnTagsInput input[id$="_tag"]').each(function() {
	        var $input = $('#' + $(this).attr('id').replace('_tag', ''));
			if ($input.data('dnnTagInput')) {
				$(this).dnnResetAutosize($input.data('dnnTagInput'));
			}
	    });
    };

    viewModel.showDetails = function (item, e) {
        if (viewModel.itemEditing.itemId() === item.ItemID) {
            return;
        }

        viewModel.setSelectedItem(item);        
        
        item.saved(false);

        viewModel.itemEditing.itemId(item.ItemID);

        var itemDetails = wrapper.find("div.item-details");
        itemDetails.slideUp(itemDetails.is(":visible") ? animationDuration : 0, function () {

            if (viewModel.itemEditing.itemId() == null) return;

            viewModel.itemEditing.isFolder(item.IsFolder);
            viewModel.itemEditing.itemName(item.ItemName());
            viewModel.itemEditing.iconUrl(viewModel.iconUrl(item, wrapper.find("div.details-icon")[0]));

            var uiElement = $(e.currentTarget).closest('div.item');
            scrollTopElement(uiElement, function () {

                if (viewModel.itemEditing.itemId() == null) return;

                var left = uiElement.position().left - parseInt(uiElement.parent().css('padding-left'));
                wrapper.find("div.details-selector > div").css({ left: left });

                if (item.IsFolder) {
                    assetsService().get('GetFolderDetails', { folderId: item.ItemID }, bindFolderDetails, failed);
                } else {
                    assetsService().get('GetFileDetails', { fileId: item.ItemID }, bindFileDetails, failed);
                }

                var i = viewModel.folderContent.indexOf(item);
                var pos = Math.floor(i / itemsPerRow) * itemsPerRow + itemsPerRow - 1;
                var rightmostItem = itemContainer.find("div.item").eq(pos);
                if (rightmostItem.length === 0) {
                    rightmostItem = itemContainer.find("div.item").last();
                }

                itemDetails.insertAfter(rightmostItem).slideDown(animationDuration, focusEditName);
                var firstTab = $(this).find('ul.tabControl > li:first-child');
                firstTab.trigger('click');
            });
        });        
    };

    viewModel.showMobileFolderDetails = function () {

		viewModel.itemEditing.itemId(viewModel.currentFolder().FolderID);
		viewModel.itemEditing.isFolder(true);
		viewModel.itemEditing.itemName(viewModel.currentFolder().FolderName);
        assetsService().get('GetFolderDetails', { folderId: viewModel.currentFolder().FolderID }, bindFolderDetails, failed);

        var folderDetails = wrapper.find("div.folder-details");
        folderDetails.slideDown(animationDuration);
    };

    viewModel.mobileFolderArrow = function() {
        if (wrapper.find("div.folder-details").is(':visible')) {
            viewModel.hideMobileFolderDetails();
        } else {
            viewModel.goToParentFolder();
        }
    };

    viewModel.hideMobileFolderDetails = function (notifySaved) {
        !viewModel.selectedItem() || viewModel.selectedItem().selected(false);
        viewModel.itemEditing.itemId(null);

        wrapper.find("div.folder-details").slideUp(animationDuration, function () {
            if (notifySaved === true) {
                var folder = viewModel.breadcrumb.pop();
                folder.FolderName = viewModel.itemEditing.itemName();
                viewModel.breadcrumb.push(folder);
                wrapper.find("div.parent > div.item").addClass('saved');
            }
        });
    };

    viewModel.delete = function (item, e) {
        viewModel.setSelectedItem(item);
        var msg = item.IsFolder ? utility.resx.PersonaBar.txt_ConfirmDeleteFolder : utility.resx.PersonaBar.txt_ConfirmDeleteAsset;        
        utility.confirm(msg.replace('[NAME]', item.ItemName()), utility.resx.PersonaBar.btn_Delete, utility.resx.PersonaBar.btn_Cancel, function () {
            if (item.IsFolder) {
                assetsService().post('DeleteFolder', {
                    folderId: item.ItemID,
                    UnlinkAllowedStatus: false
                }, refreshCurrentFolder, failed);
            } else {
                assetsService().post('DeleteFile', {
                        fileId: item.ItemID
                }, refreshCurrentFolder, failed);
            }
        }, function () {
            if (!isMobile) {
                item.selected(false);                
            }
        });
    };

    viewModel.deleteCurrentFolder = function () {
        var msg = utility.resx.PersonaBar.txt_ConfirmDeleteFolder.replace('[NAME]', viewModel.currentFolder().FolderName);
        utility.confirm(msg, utility.resx.PersonaBar.btn_Delete, utility.resx.PersonaBar.btn_Cancel, function () {
            assetsService().post('DeleteFolder', {
                folderId: viewModel.currentFolder().FolderID,
                UnlinkAllowedStatus: false
            }, viewModel.goToParentFolder(), failed);
        });
    };

    var changeSusbcription = function (value) {
        var method = value ? 'Subscribe' : 'Unsubscribe';
        var params = {
                    ItemId: viewModel.itemEditing.itemId(),
                    IsFolder: viewModel.itemEditing.isFolder()
                };
        assetsService().post(method, params, null, failed);
    };

    var getFullUrl = function (url) {
        if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
            return url;
        }

        return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + url;
    };

    var bindFileDetails = function (data) {
        viewModel.itemEditing.createdOnDate(data.CreatedOnDate);
        viewModel.itemEditing.createdBy(data.CreatedBy);
        viewModel.itemEditing.lastModifiedOnDate(data.LastModifiedOnDate);
        viewModel.itemEditing.lastModifiedBy(data.LastModifiedBy);
        viewModel.itemEditing.size(data.Size);
        viewModel.itemEditing.title(data.Title);
        viewModel.itemEditing.url(getFullUrl(data.Url));
        viewModel.itemEditing.tags(data.Tags);

        !viewModel.subscribedSubscription || viewModel.subscribedSubscription.dispose();
        viewModel.itemEditing.subscribed(data.IsUserSubscribed);
        viewModel.subscribedSubscription = viewModel.itemEditing.subscribed.subscribe(changeSusbcription);
    };

    var bindFolderDetails = function (data) {
        viewModel.itemEditing.createdOnDate(data.CreatedOnDate);
        viewModel.itemEditing.createdBy(data.CreatedBy);
        viewModel.itemEditing.lastModifiedOnDate(data.LastModifiedOnDate);
        viewModel.itemEditing.lastModifiedBy(data.LastModifiedBy);
        viewModel.itemEditing.folderType(data.Type);
        viewModel.itemEditing.versioning(data.IsVersioned);
        viewModel.itemEditing.workflowId(data.WorkflowId);
        viewModel.itemEditing.originalWorkflowId(data.WorkflowId);
        viewModel.itemEditing.workflowAction('publishAll');

        !viewModel.subscribedSubscription || viewModel.subscribedSubscription.dispose();
        viewModel.itemEditing.subscribed(data.IsUserSubscribed);
        viewModel.subscribedSubscription = viewModel.itemEditing.subscribed.subscribe(changeSusbcription);

        buildPermissionGrid(data.Permissions);
    };

    var failed = function (x) {
    	var message = x.responseJSON.Message || 'Failed...';
		utility.notifyError(message);        
    };

    var buildPermissionGrid = function (data) {
        var gridContainer = wrapper.find('#folderPermissionsPanel > .folderPermissionsContainer');

        if (permissionGrid) {
            permissionGrid.getLayout().remove();
            permissionGrid = null;
        }

        dnn.controls.PermissionGrid.resx = viewModel.resx;
        permissionGrid = new dnn.controls.PermissionGrid({ _getService: assetsService }, data);
        gridContainer.prepend(permissionGrid.getLayout());
    };

    viewModel.hideDetails = function (notifySaved) {
        !viewModel.selectedItem() || viewModel.selectedItem().selected(false);
        viewModel.itemEditing.itemId(null);

        wrapper.find("div.item-details").slideUp(animationDuration, function() {
            wrapper.find("div.item-details").appendTo("div.item-details-container");

            if (notifySaved === true) {
                viewModel.selectedItem().saved(true);
                viewModel.selectedItem().ItemName(viewModel.itemEditing.itemName());
            }
        });        
    };

    viewModel.breadcrumbNavigate = function (folder) {
        if (viewModel.searchText() != '') {
        	viewModel.breadcrumb.splice(viewModel.breadcrumb.indexOf(folder));
            viewModel.currentFolder(folder);
            viewModel.inputSearchText('');
            viewModel.searchText('');
        } else {
            if (viewModel.currentFolder().FolderID != folder.FolderID) {
            	viewModel.breadcrumb.splice(viewModel.breadcrumb.indexOf(folder));
                getFolderContent(folder.FolderID);                
            }
        }
    };

    viewModel.goToParentFolder = function() {
        var i = viewModel.breadcrumb().length - 2;
        viewModel.breadcrumbNavigate(viewModel.breadcrumb()[i]);
    }

    viewModel.saveFileDetails = function () {
        if (!validator.validate(wrapper.find('div.file-details'))) return;

        var params = {
            fileId: viewModel.itemEditing.itemId(),
            fileName: viewModel.itemEditing.itemName(),
            title: viewModel.itemEditing.title(),
            tags: viewModel.itemEditing.tags()            
        }
        assetsService().post('SaveFileDetails', params, function () {
            viewModel.hideDetails(true);
        }, function (x) {
        	failed(x);
        	viewModel.itemEditing.fileNameFocused(true);
        });
    };

    viewModel.saveFolderDetails = function () {
        if (!validator.validate(wrapper.find('div.folder-details'))) return;

        var params = {
            folderId: viewModel.itemEditing.itemId(),
            folderName: viewModel.itemEditing.itemName(),
            workflowId: viewModel.itemEditing.workflowId(),
            workflowAction: viewModel.itemEditing.workflowAction(),
            versioning: viewModel.itemEditing.versioning(),
            permissions: permissionGrid.getPermissions()
        }

        var hide = isMobile ? viewModel.hideMobileFolderDetails : viewModel.hideDetails;
        assetsService().post('SaveFolderDetails', params, function () {
            hide(true);	                     
        }, function (x) {
        	failed(x);
        	viewModel.itemEditing.folderNameFocused(true);
		});
    };

    var search = function (folderId, searchText, page) {

        if (!page) {
            page = 0;            
        }

        var params = {
            folderId: folderId,
            search: searchText,
            pageIndex: 1,
            pageSize: itemsPerPage,
            sorting: null,
            culture: config.culture
        };

        assetsService().get('Search', params, function(d) {
            $("div.item-details").appendTo("div.item-details-container");

            if (page == 0) {
                viewModel.folderContent.removeAll();
                scrollTop();
                viewModel.lastPage(page);
            }

            var items = ko.mapping.fromJS(d.Items, mappingOptions);

            ko.utils.arrayPushAll(viewModel.folderContent, items());
            viewModel.totalItemCount(d.TotalCount);
        });
    }

    var scrollTop = function () {    	    
    	scrollItem[0].scrollTop = 0;
    };

    var refreshCurrentFolder = function (itemToHighlight) {
        getFolderContent(viewModel.currentFolder().FolderID, 0, itemToHighlight);
    }

    var getFolderContent = function (folderId, page, itemToHighlight) {
        viewModel.itemToHighlight(itemToHighlight);
        viewModel.loading(true);

        if (!page) {
            page = 0;
        }

	    var params = {
	        folderId: folderId,
	        startIndex: page * itemsPerPage,
	        numItems: itemsPerPage
	    };

	    viewModel.itemEditing.itemId(null);

	    assetsService().get('GetFolderContent', params, function (d) {
            if (d.Folder.FolderID == config.rootFolderId) {
                d.Folder.FolderName = viewModel.resx.lbl_Root;
            }

	        if (page == 0) {
	            $("div.item-details").appendTo("div.item-details-container");
	            viewModel.folderContent.removeAll();
	            viewModel.currentFolder(d.Folder);	            
	            if (isMobile && folderId != config.rootFolderId) {
					scrollItem[0].scrollTop = 310;  // TODO: Use actual item position
	            } else {
	            	scrollTop();	
	            }
	            
	            viewModel.lastPage(page);
	        }

	        if (viewModel.breadcrumb().length == 0 || viewModel.breadcrumb()[viewModel.breadcrumb().length - 1].FolderID != d.Folder.FolderID) {
	            viewModel.breadcrumb.push({
	                FolderID: d.Folder.FolderID,
	                FolderName: d.Folder.FolderName
	            });
	        }

	        var items = ko.mapping.fromJS(d.Items, mappingOptions);
            
	        ko.utils.arrayPushAll(viewModel.folderContent, items());
	        viewModel.totalItemCount(d.TotalCount);
	        viewModel.loading(false);
	    }, failed);
	};

    var goToFolder = function (folderId) {

        assetsService().get('GetFolderPath', { folderId: folderId }, function(d) {
            viewModel.breadcrumb.removeAll();
            ko.utils.arrayPushAll(viewModel.breadcrumb, d);
        });

        getFolderContent(folderId);
    };

    viewModel.selectedFolderChanged = function (folder) {
        if (viewModel.currentFolder().FolderID !== folder.key) {
            goToFolder(folder.key);	            
        }
    };

    var initFileUpload = function () {
        var panel = wrapper.find("div.add-asset > div.file-upload-panel");
        fileUpload = parent.dnn[config.fileUploadClientId];
        if (panel.is(":empty")) {
            fileUpload.$element.appendTo(panel);
            fileUpload.$element.on("show-statuses-container", function () {
                var h = wrapper.find("div.add-asset").outerHeight();
                itemContainer.animate({ top: 150 + h });
            }).on("onfileuploadcomplete", function (e, d) {
                var data = JSON.parse(d);
                if (data.fileId && data.alreadyExists === false) {
                    closeTopPanel();
                    refreshCurrentFolder({ itemName: data.fileName, isFolder: false });
                }
            });
        }

        itemContainer.on("dragover", function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(e.delegateTarget).addClass("drop-target");
	        e.originalEvent.dataTransfer.dropEffect = 'copy';
        }).on("dragleave", function(e) {
            e.stopPropagation();
            e.preventDefault();
            if (e.target == e.delegateTarget) {
                $(e.delegateTarget).removeClass("drop-target");                
            }
        }).on("drop", function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(e.delegateTarget).removeClass("drop-target");

            var files = e.originalEvent.dataTransfer.files;

            fileUpload.setUploadPath(getCurrentFolderPath());
            showTopPanel("add-asset", function() {
                fileUpload.addFiles(files);                
            });
        });
    };

    var isImage = function(url) {
        var imageExtensions = ["JPG", "JPE", "BMP", "GIF", "PNG", "JPEG", "ICO"];
        var ext = url.split(".").reverse()[0].toUpperCase();
        for (var i = 0; i < imageExtensions.length; i++) {
            if (imageExtensions[i] == ext) return true;
        }
        return false;
    };
    
    viewModel.replaceFile = function () {
        viewModel.uploading.overwrite = true;
        wrapper.find("#uploader").fileupload('add', { files: viewModel.uploading.pendingFiles });
    };

    var initFileUploadMobile = function () {
        var uploadUrl = utility.sf.getSiteRoot() + "DesktopModules/InternalServices/API/FileUpload/UploadFromLocal";

        wrapper.find("#uploader").fileupload({
            url: uploadUrl,
            beforeSend: utility.sf.setHeaders,
            replaceFileInput: false,            
            submit: function (e, d) {
                if (!d.formData) {                    
                    d.formData = {
                        folder: getCurrentFolderPath(),
                        overwrite: viewModel.uploading.overwrite
                    }                
                }
                return true;
            },
            done: function (e, d) {
                var result = JSON.parse(d.result);
                if (result.alreadyExists === true) {
                    viewModel.uploading.pendingFiles = d.files;
                    viewModel.uploading.showConfirmation(true);
                    viewModel.uploading.fileName(result.fileName);
                    viewModel.uploading.imageUrl(isImage(result.path) ? result.path : result.fileIconUrl);
                    return;
                }

                if (result.message != null) {
                    utility.notify(result.message);
                    return;
                }
                
                refreshCurrentFolder();
                viewModel.closeAddAsset();
            },
            error: failed
        });
    };

    viewModel.highlightItemName = function (itemName) {
        var pattern = viewModel.searchText();
        if (!pattern || pattern == "" || pattern.indexOf("?") != -1) {
            return itemName;
        }

        var words = pattern.split(' ');
        for (var w = 0; w < words.length; w++) {
            var word = words[w];
            if (word.indexOf('[') == 0 || word.indexOf('after:') == 0) {
                continue;
            }

            if (word.indexOf('\"') == 0 && word.lastIndexOf('\"') == word.length - 1) {
                word = word.substring(1, word.length - 1);
            }

            word = word.replace('*', '');
            var matches = itemName.match(new RegExp(word, "i"));
            if (matches) {
                for (var i = 0; i < matches.length; i++) {
                    itemName = itemName.replace(matches[i], "<font class='highlight'>" + matches[i] + "</font>");
                }
            }
        }

        return itemName;
    };

    viewModel.iconUrl = function (item, element) {
        if (item.IsFolder) {
            return item.IconUrl;
        } else {
        	var $element = $(element);
            return !item.ThumbnailAvailable ? item.IconUrl
                : item.ThumbnailUrl
                	.replace(/(width=)[^\&]+/, '$1' + $element.width())
                	.replace(/(height=)[^\&]+/, '$1' + $element.height());
        }
    };

    viewModel.pendingPages = ko.computed(function () {
        var loadedItems = (viewModel.lastPage() + 1) * itemsPerPage;
        return loadedItems < viewModel.totalItemCount();
    });

    viewModel.getNextPage = function () {
        viewModel.lastPage(viewModel.lastPage() + 1);
        getFolderContent(viewModel.currentFolder().FolderID, viewModel.lastPage(), viewModel.itemToHighlight());
    };

    return {
	    init: function (wrap, util, params, callback) {
	        wrapper = wrap;
			utility = util;
			tabpanel.init(viewModel);

			var defaults = { numberOfRows: 6 };
	        var p = $.extend({}, defaults, params);

	        itemContainer = wrapper.find('div.item-container');
	        containerTop = parseInt(itemContainer.css("top"));
	        scrollItem = p.scrollItem || itemContainer;
			var itemElement = itemContainer.find('div.item');
	        var itemWidth = itemElement.outerWidth(true);
	        itemsPerRow = Math.floor(itemContainer.width() / itemWidth);                
			itemsPerPage = itemsPerRow * p.numberOfRows; 

			wrapper.find('div.item-details')
                .width(itemsPerRow * itemWidth - parseInt(itemElement.css('margin-right'))
                                               - parseInt(itemElement.css('margin-left')));

			itemContainer.on('scroll', function () {
			    wrapper.find("div.breadcrumbs-container").toggleClass("shadow", $(this).scrollTop() != 0);
				
		        var scrollHeight = $(this)[0].scrollHeight;
		        var scrollPosition = $(this).scrollTop() + $(this).outerHeight();

		        if (scrollPosition >= scrollHeight - 50 - parseInt($(this).css('padding-bottom'))
                    && viewModel.pendingPages()) {
		            viewModel.getNextPage();
		        }
		    });
			
	        loadWorkflows();

	        initFileUpload();

	        wrapper.find('input[type="checkbox"].switch').dnnCheckbox();

	        utility.localizeErrMessages(validator);
	        
			var container = wrapper[0];
			viewModel.resx = utility.resx.PersonaBar;
			ko.applyBindings(viewModel, container);


	        var folderId = params && params.folderId ? params.folderId : config.rootFolderId;
	        getFolderContent(folderId);

			if (typeof callback === 'function') callback();
		},

        initMobile: function (wrap, util, params, callback) {
			isMobile = true;

            var defaults = { numberOfRows: 10 };
            var p = $.extend({}, defaults, params);
            p.scrollItem = $("div.body");

            this.init(wrap, util, p, callback);

            window.require(['jquery.fileupload'], initFileUploadMobile);
        },

        load: function (params, callback) {
            var folderId = params && params.folderId ? params.folderId : config.rootFolderId;
            goToFolder(folderId);

            if (typeof callback === 'function') callback();
        },

        loadMobile: function(params, callback) {
            this.load(params, callback);
        }
	};
});