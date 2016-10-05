"undefined"!=typeof window.dnn&&null!==window.dnn||(window.dnn={}),dnn.ColumnViewModel=function(name,key){var checked=ko.observable(!1),index=ko.observable(1);return{name:name,key:key,checked:checked,index:index}},dnn.ColumnsViewModel=function($,$find,ko,defaultSortOrderComboBoxId){var selectedColumns=ko.observableArray(),availableColumns=ko.observableArray(),selectedColumnsToString=ko.computed(function(){for(var columns=selectedColumns(),result=[],i=0,j=columns.length;i<j;i++)result.push(columns[i].key);return result.join(",")}),selectColumns=function(){moveitems(availableColumns,selectedColumns)},unselectColumns=function(){moveitems(selectedColumns,availableColumns)},isAtLeastOneColumnChecked=function(columns){var item=ko.utils.arrayFirst(columns(),function(column){return column.checked()});return null==item},isAtLeastOneColumnNotChecked=function(columns){var item=ko.utils.arrayFirst(columns(),function(column){return!column.checked()});return null==item},checkAllAvailableColumns=ko.computed({read:function(){return isAtLeastOneColumnNotChecked(availableColumns)&&0!=availableColumns().length},write:function(value){ko.utils.arrayForEach(availableColumns(),function(column){column.checked(value)})}}),isAtLeastOneAvailableColumnChecked=ko.computed(function(){return isAtLeastOneColumnChecked(availableColumns)}),checkAllSelectedColumns=ko.computed({read:function(){return isAtLeastOneColumnNotChecked(selectedColumns)&&0!=selectedColumns().length},write:function(value){ko.utils.arrayForEach(selectedColumns(),function(column){column.checked(value)})}}),isAtLeastOneSelectedColumnChecked=ko.computed(function(){return isAtLeastOneColumnChecked(selectedColumns)}),init=function(selectedItems,availableItems){selectedColumns(getColumnViewModelArray(selectedItems)),availableColumns(getColumnViewModelArray(availableItems))},getColumnViewModelArray=function(columns){for(var arr=[],i=0;i<columns.length;i++)arr.push(new dnn.ColumnViewModel(columns[i].name,columns[i].key));return arr},moveitems=function(from,to){for(var i=0;i<from().length;i++)from()[i].checked()&&(to.push(from()[i]),from.splice(i,1),i--)},validateColumns=function(sender,args){args.IsValid=""!=selectedColumnsToString()},refreshDefaultSortOrderComboBox=function(){var defaultSortOrderComboBox=$find(defaultSortOrderComboBoxId);if(defaultSortOrderComboBox){var tmpSelectedItem=defaultSortOrderComboBox.get_selectedItem(),tmpSelectedItemValue=tmpSelectedItem?tmpSelectedItem.get_value():"";defaultSortOrderComboBox.trackChanges(),defaultSortOrderComboBox.clearItems();for(var i=0;i<selectedColumns().length;i++){var comboItem=new Telerik.Web.UI.RadComboBoxItem,name=selectedColumns()[i].name,key=selectedColumns()[i].key;comboItem.set_text(name),comboItem.set_value(key),defaultSortOrderComboBox.get_items().add(comboItem)}var selectedItem=defaultSortOrderComboBox.findItemByValue(tmpSelectedItemValue);if(selectedItem)selectedItem.select();else{var firstItem=defaultSortOrderComboBox.get_items().getItem(0);firstItem&&firstItem.select()}defaultSortOrderComboBox.commitChanges()}};return selectedColumns.subscribe(function(){for(var columns=selectedColumns(),i=0,j=columns.length;i<j;i++)columns[i].index(i+1);setTimeout(refreshDefaultSortOrderComboBox,10)}),{selectedColumns:selectedColumns,availableColumns:availableColumns,selectedColumnsToString:selectedColumnsToString,selectColumns:selectColumns,unselectColumns:unselectColumns,checkAllAvailableColumns:checkAllAvailableColumns,isAtLeastOneAvailableColumnChecked:isAtLeastOneAvailableColumnChecked,checkAllSelectedColumns:checkAllSelectedColumns,isAtLeastOneSelectedColumnChecked:isAtLeastOneSelectedColumnChecked,validateColumns:validateColumns,init:init}},ko.bindingHandlers.dnnCheckbox={init:function(element){$(element).dnnCheckbox()}},ko.bindingHandlers.sortableList={init:function(element,valueAccessor,allBindingsAccessor,data,context){var options=ko.utils.unwrapObservable(valueAccessor());return $(element).data("sortList",options.list||valueAccessor()),$(element).sortable({cursor:"move",placeholder:"dnnDocumentViewerSettingsPlaceholder",dropOnEmpty:!0,update:function(event,ui){var item=ui.item.data("sortItem");if(item){var originalParent=ui.item.data("parentList"),newParent=ui.item.parent().data("sortList"),position=ko.utils.arrayIndexOf(ui.item.parent().children(),ui.item[0]);position>=0&&(originalParent.remove(item),newParent.splice(position,0,item)),ui.item.remove()}},helper:function(e,tr){var $originals=tr.children(),$helper=tr.clone();return $helper.children().each(function(index){$(this).width($originals.eq(index).width())}),$helper},connectWith:".dnnDocumentViewerSettingsGrid>tbody"}),ko.bindingHandlers.template.init.apply(this,arguments)},update:function(element,valueAccessor,allBindingsAccessor,data,context){var options=ko.utils.unwrapObservable(valueAccessor()),newOptions={};options.list?(newOptions.foreach=options.list,newOptions.name=options.tmpl,newOptions.includeDestroyed=options.includeDestroyed,newOptions.afterAdd=options.afterAdd,newOptions.beforeRemove=options.beforeRemove):newOptions.foreach=valueAccessor(),options.afterRender?newOptions.afterRender=function(element,data){ko.bindingHandlers.sortableList.afterRender.call(data,element,data),options.afterRender.call(data,element,data)}:newOptions.afterRender=ko.bindingHandlers.sortableList.afterRender,ko.bindingHandlers.template.update(element,function(){return newOptions},allBindingsAccessor,data,context)},afterRender:function(elements,data){ko.utils.arrayForEach(elements,function(element){1===element.nodeType&&($(element).data("sortItem",data),$(element).data("parentList",$(element).parent().data("sortList")))})}};