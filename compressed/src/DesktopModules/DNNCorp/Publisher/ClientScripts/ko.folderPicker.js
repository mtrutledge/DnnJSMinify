!function($,ko){"use strict";ko.bindingHandlers.folderPicker={init:function(element,valueAccessor){var folderPicker,koOptions=valueAccessor(),selectFolderCallback=koOptions.selectFolderCallback,koElement=koOptions.koElement,id="#{0}".replace(/\{0\}/g,element.id),selectFolderProxyCallback=function(){selectFolderCallback.call(koElement,this.selectedItem())},options={disabled:!1,initialState:{selectedItem:koOptions.selectedFolder},services:{moduleId:"",serviceRoot:"InternalServices",getTreeMethod:"ItemListService/GetFolders",sortTreeMethod:"ItemListService/SortFolders",getNodeDescendantsMethod:"ItemListService/GetFolderDescendants",searchTreeMethod:"ItemListService/SearchFolders",getTreeWithNodeMethod:"ItemListService/GetTreePathForFolder",rootId:"Root",parameters:{}},onSelectionChangedBackScript:selectFolderProxyCallback};$.extend(!0,options,koOptions.options),dnn.createDropDownList(id,options,{}),$(function(){folderPicker=dnn[element.id];var item={key:-1,value:koOptions.selectedItemText};folderPicker.selectedItem(item)}),koElement.subscribe(function(folder){folderPicker.selectedItem(folder),dnn.setVar(element.id+"_expandPath",folder.path)})}}}(jQuery||$,ko);