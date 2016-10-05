var kendo={ui:{},mobile:{ui:{}},dataviz:{ui:{}},data:{}};kendo||(kendo={}),kendo.Class=function(){},kendo.Class.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoClass=function(){},$.fn.kendoClass=function(options){},kendo.Color=function(){},kendo.Color.prototype={diff:function(){},equals:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoColor=function(){},$.fn.kendoColor=function(options){},kendo.Layout=function(){},kendo.Layout.prototype={showIn:function(container,view,transitionClass){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoLayout=function(){},$.fn.kendoLayout=function(options){},kendo.Observable=function(){},kendo.Observable.prototype={bind:function(eventName,handler){},one:function(eventName,handler){},trigger:function(eventName,eventData){},unbind:function(eventName,handler){},self:null},$.fn.getKendoObservable=function(){},$.fn.kendoObservable=function(options){},kendo.Router=function(){},kendo.Router.prototype={start:function(){},route:function(route,callback){},navigate:function(route,silent){},replace:function(route,silent){},destroy:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoRouter=function(){},$.fn.kendoRouter=function(options){},kendo.View=function(){},kendo.View.prototype={destroy:function(){},render:function(container){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoView=function(){},$.fn.kendoView=function(options){},kendo.data.Binder=function(){},kendo.data.Binder.prototype={refresh:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoBinder=function(){},$.fn.kendoBinder=function(options){},kendo.data.DataSource=function(){},kendo.data.DataSource.prototype={add:function(model){},aggregate:function(value){},aggregates:function(){},at:function(index){},cancelChanges:function(model){},data:function(value){},fetch:function(callback){},filter:function(value){},get:function(id){},getByUid:function(uid){},group:function(value){},hasChanges:function(){},indexOf:function(dataItem){},insert:function(index,model){},online:function(value){},offlineData:function(data){},page:function(page){},pageSize:function(size){},pushCreate:function(items){},pushDestroy:function(items){},pushUpdate:function(items){},query:function(options){},read:function(data){},remove:function(model){},sort:function(value){},sync:function(){},total:function(){},totalPages:function(){},view:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoDataSource=function(){},$.fn.kendoDataSource=function(options){},kendo.data.GanttDataSource=function(){},kendo.data.GanttDataSource.prototype={taskAllChildren:function(task){},taskChildren:function(task){},taskLevel:function(task){},taskParent:function(task){},taskSiblings:function(task){},taskTree:function(task){},update:function(task,taskInfo){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoGanttDataSource=function(){},$.fn.kendoGanttDataSource=function(options){},kendo.data.GanttDependency=function(){},kendo.data.GanttDependency.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoGanttDependency=function(){},$.fn.kendoGanttDependency=function(options){},kendo.data.GanttDependencyDataSource=function(){},kendo.data.GanttDependencyDataSource.prototype={dependencies:function(id){},predecessors:function(id){},successors:function(id){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoGanttDependencyDataSource=function(){},$.fn.kendoGanttDependencyDataSource=function(options){},kendo.data.GanttTask=function(){},kendo.data.GanttTask.prototype={duration:function(){},isMilestone:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoGanttTask=function(){},$.fn.kendoGanttTask=function(options){},kendo.data.HierarchicalDataSource=function(){},kendo.data.HierarchicalDataSource.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoHierarchicalDataSource=function(){},$.fn.kendoHierarchicalDataSource=function(options){},kendo.data.Model=function(){},kendo.data.Model.prototype={bind:function(){},editable:function(field){},get:function(){},isNew:function(){},set:function(){},toJSON:function(){},unbind:function(event,callback){}},$.fn.getKendoModel=function(){},$.fn.kendoModel=function(options){},kendo.data.Node=function(){},kendo.data.Node.prototype={append:function(model){},level:function(){},load:function(){},loaded:function(){},parentNode:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoNode=function(){},$.fn.kendoNode=function(options){},kendo.data.ObservableArray=function(){},kendo.data.ObservableArray.prototype={bind:function(eventName,handler){},join:function(separator){},parent:function(){},pop:function(){},push:function(){},slice:function(begin,end){},splice:function(index,howMany){},shift:function(){},toJSON:function(){},unshift:function(){},unbind:function(event,callback){}},$.fn.getKendoObservableArray=function(){},$.fn.kendoObservableArray=function(options){},kendo.data.ObservableObject=function(){},kendo.data.ObservableObject.prototype={bind:function(){},get:function(name){},parent:function(){},set:function(name,value){},toJSON:function(){},unbind:function(event,callback){}},$.fn.getKendoObservableObject=function(){},$.fn.kendoObservableObject=function(options){},kendo.data.PivotDataSource=function(){},kendo.data.PivotDataSource.prototype={axes:function(){},catalog:function(name){},columns:function(val){},cube:function(name){},discover:function(options){},measures:function(val){},measuresAxis:function(){},rows:function(val){},schemaCatalogs:function(){},schemaCubes:function(){},schemaDimensions:function(){},schemaHierarchies:function(dimensionName){},schemaLevels:function(hierarchyName){},schemaMeasures:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoPivotDataSource=function(){},$.fn.kendoPivotDataSource=function(options){},kendo.data.SchedulerDataSource=function(){},kendo.data.SchedulerDataSource.prototype={expand:function(start,end){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSchedulerDataSource=function(){},$.fn.kendoSchedulerDataSource=function(options){},kendo.data.SchedulerEvent=function(){},kendo.data.SchedulerEvent.prototype={clone:function(options,updateUid){},duration:function(){},expand:function(start,end,timeZoneId){},update:function(eventInfo){},isMultiDay:function(){},isException:function(){},isOccurrence:function(){},isRecurring:function(){},isRecurrenceHead:function(){},toOccurrence:function(options){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSchedulerEvent=function(){},$.fn.kendoSchedulerEvent=function(options){},kendo.data.TreeListDataSource=function(){},kendo.data.TreeListDataSource.prototype={load:function(model){},childNodes:function(model){},rootNodes:function(){},parentNode:function(model){},level:function(model){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoTreeListDataSource=function(){},$.fn.kendoTreeListDataSource=function(options){},kendo.data.TreeListModel=function(){},kendo.data.TreeListModel.prototype={loaded:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoTreeListModel=function(){},$.fn.kendoTreeListModel=function(options){},drawing||(drawing={}),kendo.drawing.Arc=function(){},kendo.drawing.Arc.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},geometry:function(value){},fill:function(color,opacity){},opacity:function(opacity){},stroke:function(color,width,opacity){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoArc=function(){},$.fn.kendoArc=function(options){},kendo.drawing.Circle=function(){},kendo.drawing.Circle.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},geometry:function(value){},fill:function(color,opacity){},opacity:function(opacity){},stroke:function(color,width,opacity){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoCircle=function(){},$.fn.kendoCircle=function(options){},kendo.drawing.Element=function(){},kendo.drawing.Element.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},opacity:function(opacity){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoElement=function(){},$.fn.kendoElement=function(options){},kendo.drawing.FillOptions=function(){},kendo.drawing.FillOptions.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoFillOptions=function(){},$.fn.kendoFillOptions=function(options){},kendo.drawing.Group=function(){},kendo.drawing.Group.prototype={append:function(element){},clear:function(){},clip:function(clip){},clippedBBox:function(){},opacity:function(opacity){},remove:function(element){},removeAt:function(index){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoGroup=function(){},$.fn.kendoGroup=function(options){},kendo.drawing.Image=function(){},kendo.drawing.Image.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},opacity:function(opacity){},src:function(value){},rect:function(value){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoImage=function(){},$.fn.kendoImage=function(options){},kendo.drawing.Layout=function(){},kendo.drawing.Layout.prototype={rect:function(rect){},reflow:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoLayout=function(){},$.fn.kendoLayout=function(options){},kendo.drawing.MultiPath=function(){},kendo.drawing.MultiPath.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},close:function(){},curveTo:function(controlOut,controlIn){},fill:function(color,opacity){},lineTo:function(x,y){},moveTo:function(x,y){},opacity:function(opacity){},stroke:function(color,width,opacity){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMultiPath=function(){},$.fn.kendoMultiPath=function(options){},kendo.drawing.OptionsStore=function(){},kendo.drawing.OptionsStore.prototype={get:function(field){},set:function(field,value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoOptionsStore=function(){},$.fn.kendoOptionsStore=function(options){},kendo.drawing.PDFOptions=function(){},kendo.drawing.PDFOptions.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoPDFOptions=function(){},$.fn.kendoPDFOptions=function(options){},kendo.drawing.Path=function(){},kendo.drawing.Path.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},close:function(){},curveTo:function(controlOut,controlIn){},fill:function(color,opacity){},lineTo:function(x,y){},moveTo:function(x,y){},opacity:function(opacity){},stroke:function(color,width,opacity){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoPath=function(){},$.fn.kendoPath=function(options){},kendo.drawing.Segment=function(){},kendo.drawing.Segment.prototype={anchor:function(value){},controlIn:function(value){},controlOut:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSegment=function(){},$.fn.kendoSegment=function(options){},kendo.drawing.StrokeOptions=function(){},kendo.drawing.StrokeOptions.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoStrokeOptions=function(){},$.fn.kendoStrokeOptions=function(options){},kendo.drawing.Surface=function(){},kendo.drawing.Surface.prototype={clear:function(){},draw:function(element){},eventTarget:function(e){},resize:function(force){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSurface=function(){},$.fn.kendoSurface=function(options){},kendo.drawing.Text=function(){},kendo.drawing.Text.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},content:function(value){},fill:function(color,opacity){},opacity:function(opacity){},position:function(value){},stroke:function(color,width,opacity){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoText=function(){},$.fn.kendoText=function(options){},effects||(effects={}),kendo.geometry.Arc=function(){},kendo.geometry.Arc.prototype={bbox:function(matrix){},getAnticlockwise:function(){},getCenter:function(){},getEndAngle:function(){},getRadiusX:function(){},getRadiusY:function(){},getStartAngle:function(){},pointAt:function(angle){},setAnticlockwise:function(value){},setCenter:function(value){},setEndAngle:function(value){},setRadiusX:function(value){},setRadiusY:function(value){},setStartAngle:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoArc=function(){},$.fn.kendoArc=function(options){},kendo.geometry.Circle=function(){},kendo.geometry.Circle.prototype={bbox:function(matrix){},clone:function(){},equals:function(other){},getCenter:function(){},getRadius:function(){},pointAt:function(angle){},setCenter:function(value){},setRadius:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoCircle=function(){},$.fn.kendoCircle=function(options){},kendo.geometry.Matrix=function(){},kendo.geometry.Matrix.prototype={clone:function(){},equals:function(other){},round:function(digits){},multiplyCopy:function(matrix){},toArray:function(digits){},toString:function(digits,separator){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMatrix=function(){},$.fn.kendoMatrix=function(options){},kendo.geometry.Point=function(){},kendo.geometry.Point.prototype={clone:function(){},distanceTo:function(point){},equals:function(other){},getX:function(){},getY:function(){},move:function(x,y){},rotate:function(angle,center){},round:function(digits){},scale:function(scaleX,scaleY){},scaleCopy:function(scaleX,scaleY){},setX:function(value){},setY:function(value){},toArray:function(digits){},toString:function(digits,separator){},transform:function(tansformation){},transformCopy:function(tansformation){},translate:function(dx,dy){},translateWith:function(vector){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoPoint=function(){},$.fn.kendoPoint=function(options){},kendo.geometry.Rect=function(){},kendo.geometry.Rect.prototype={bbox:function(matrix){},bottomLeft:function(){},bottomRight:function(){},center:function(){},clone:function(){},equals:function(other){},getOrigin:function(){},getSize:function(){},height:function(){},setOrigin:function(value){},setSize:function(value){},topLeft:function(){},topRight:function(){},width:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoRect=function(){},$.fn.kendoRect=function(options){},kendo.geometry.Size=function(){},kendo.geometry.Size.prototype={clone:function(){},equals:function(other){},getWidth:function(){},getHeight:function(){},setWidth:function(value){},setHeight:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSize=function(){},$.fn.kendoSize=function(options){},kendo.geometry.Transformation=function(){},kendo.geometry.Transformation.prototype={clone:function(){},equals:function(other){},matrix:function(){},multiply:function(transformation){},rotate:function(angle,center){},scale:function(scaleX,scaleY){},translate:function(x,y){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoTransformation=function(){},$.fn.kendoTransformation=function(options){},kendo.ooxml.Workbook=function(){},kendo.ooxml.Workbook.prototype={toDataURL:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoWorkbook=function(){},$.fn.kendoWorkbook=function(options){},ui||(ui={}),kendo.ui.AutoComplete=function(){},kendo.ui.AutoComplete.prototype={close:function(){},dataItem:function(index){},destroy:function(){},enable:function(enable){},focus:function(){},readonly:function(readonly){},refresh:function(){},search:function(word){},select:function(item){},setDataSource:function(dataSource){},suggest:function(value){},value:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoAutoComplete=function(){},$.fn.kendoAutoComplete=function(options){},kendo.ui.Button=function(){},kendo.ui.Button.prototype={enable:function(toggle){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoButton=function(){},$.fn.kendoButton=function(options){},kendo.ui.Calendar=function(){},kendo.ui.Calendar.prototype={current:function(){},destroy:function(){},max:function(value){},min:function(value){},navigate:function(value,view){},navigateDown:function(value){},navigateToFuture:function(){},navigateToPast:function(){},navigateUp:function(){},value:function(value){},view:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoCalendar=function(){},$.fn.kendoCalendar=function(options){},kendo.ui.ColorPalette=function(){},kendo.ui.ColorPalette.prototype={value:function(color){},color:function(color){},enable:function(enable){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoColorPalette=function(){},$.fn.kendoColorPalette=function(options){};kendo.ui.ColorPicker=function(){};kendo.ui.ColorPicker.prototype={close:function(){},open:function(){},toggle:function(){},value:function(color){},color:function(color){},enable:function(enable){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoColorPicker=function(){},$.fn.kendoColorPicker=function(options){},kendo.ui.ComboBox=function(){},kendo.ui.ComboBox.prototype={close:function(){},dataItem:function(index){},destroy:function(){},enable:function(enable){},readonly:function(readonly){},focus:function(){},open:function(){},refresh:function(){},search:function(word){},select:function(li){},setDataSource:function(dataSource){},suggest:function(value){},text:function(text){},toggle:function(toggle){},value:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoComboBox=function(){},$.fn.kendoComboBox=function(options){},kendo.ui.ContextMenu=function(){},kendo.ui.ContextMenu.prototype={append:function(item,referenceItem){},close:function(element){},destroy:function(){},enable:function(element,enable){},insertAfter:function(item,referenceItem){},insertBefore:function(item,referenceItem){},open:function(x,y){},remove:function(element){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoContextMenu=function(){},$.fn.kendoContextMenu=function(options){},kendo.ui.DatePicker=function(){},kendo.ui.DatePicker.prototype={close:function(){},destroy:function(){},enable:function(enable){},readonly:function(readonly){},max:function(value){},min:function(value){},open:function(){},setOptions:function(options){},value:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoDatePicker=function(){},$.fn.kendoDatePicker=function(options){},kendo.ui.DateTimePicker=function(){},kendo.ui.DateTimePicker.prototype={close:function(view){},destroy:function(){},enable:function(enable){},readonly:function(readonly){},max:function(value){},min:function(value){},open:function(view){},setOptions:function(options){},toggle:function(view){},value:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoDateTimePicker=function(){},$.fn.kendoDateTimePicker=function(options){},kendo.ui.Draggable=function(){},kendo.ui.Draggable.prototype={cancelHold:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoDraggable=function(){},$.fn.kendoDraggable=function(options){},kendo.ui.DropDownList=function(){},kendo.ui.DropDownList.prototype={close:function(){},dataItem:function(index){},destroy:function(){},focus:function(){},open:function(){},enable:function(enable){},readonly:function(readonly){},refresh:function(){},search:function(word){},select:function(li){},setDataSource:function(dataSource){},text:function(text){},toggle:function(toggle){},value:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoDropDownList=function(){},$.fn.kendoDropDownList=function(options){},kendo.ui.DropTarget=function(){},kendo.ui.DropTarget.prototype={destroyGroup:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoDropTarget=function(){},$.fn.kendoDropTarget=function(options){},kendo.ui.DropTargetArea=function(){},kendo.ui.DropTargetArea.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoDropTargetArea=function(){},$.fn.kendoDropTargetArea=function(options){},kendo.ui.Editor=function(){},kendo.ui.Editor.prototype={createRange:function(document){},destroy:function(){},encodedValue:function(){},exec:function(name,params){},focus:function(){},getRange:function(){},getSelection:function(){},paste:function(html,options){},selectedHtml:function(){},refresh:function(){},saveAsPDF:function(){},selectRange:function(range){},update:function(){},state:function(toolName){},value:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoEditor=function(){},$.fn.kendoEditor=function(options){},kendo.ui.FlatColorPicker=function(){},kendo.ui.FlatColorPicker.prototype={focus:function(){},value:function(color){},color:function(color){},enable:function(enable){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoFlatColorPicker=function(){},$.fn.kendoFlatColorPicker=function(options){},kendo.ui.Gantt=function(){},kendo.ui.Gantt.prototype={clearSelection:function(){},dataItem:function(row){},destroy:function(){},refresh:function(){},refreshDependencies:function(){},removeDependency:function(dependency){},removeTask:function(task){},saveAsPDF:function(){},select:function(row){},setDataSource:function(dataSource){},setDependenciesDataSource:function(dataSource){},view:function(type){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoGantt=function(){},$.fn.kendoGantt=function(options){},kendo.ui.Grid=function(){},kendo.ui.Grid.prototype={addRow:function(){},autoFitColumn:function(column){},cancelChanges:function(){},cancelRow:function(){},cellIndex:function(cell){},clearSelection:function(){},closeCell:function(isCancel){},collapseGroup:function(row){},collapseRow:function(row){},current:function(cell){},dataItem:function(row){},destroy:function(){},editCell:function(cell){},editRow:function(row){},expandGroup:function(row){},expandRow:function(row){},getOptions:function(){},hideColumn:function(column){},lockColumn:function(column){},refresh:function(){},removeRow:function(row){},reorderColumn:function(destIndex,column){},saveAsExcel:function(){},saveAsPDF:function(){},saveChanges:function(){},saveRow:function(){},select:function(rows){},setDataSource:function(dataSource){},setOptions:function(options){},showColumn:function(column){},unlockColumn:function(column){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoGrid=function(){},$.fn.kendoGrid=function(options){},kendo.ui.ListView=function(){},kendo.ui.ListView.prototype={add:function(){},cancel:function(){},clearSelection:function(){},dataItem:function(row){},dataItems:function(){},destroy:function(){},edit:function(item){},refresh:function(){},remove:function(item){},save:function(){},select:function(items){},setDataSource:function(dataSource){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoListView=function(){},$.fn.kendoListView=function(options){},kendo.ui.MaskedTextBox=function(){},kendo.ui.MaskedTextBox.prototype={destroy:function(){},enable:function(enable){},readonly:function(readonly){},raw:function(){},value:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMaskedTextBox=function(){},$.fn.kendoMaskedTextBox=function(options){},kendo.ui.Menu=function(){},kendo.ui.Menu.prototype={append:function(item,referenceItem){},close:function(element){},destroy:function(){},enable:function(element,enable){},insertAfter:function(item,referenceItem){},insertBefore:function(item,referenceItem){},open:function(element){},remove:function(element){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMenu=function(){},$.fn.kendoMenu=function(options){},kendo.ui.MultiSelect=function(){},kendo.ui.MultiSelect.prototype={close:function(){},dataItems:function(){},destroy:function(){},enable:function(enable){},readonly:function(readonly){},focus:function(){},open:function(){},refresh:function(){},search:function(word){},setDataSource:function(dataSource){},toggle:function(toggle){},value:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMultiSelect=function(){},$.fn.kendoMultiSelect=function(options){},kendo.ui.Notification=function(){},kendo.ui.Notification.prototype={error:function(data){},getNotifications:function(){},hide:function(){},info:function(data){},show:function(data,type){},success:function(data){},warning:function(data){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoNotification=function(){},$.fn.kendoNotification=function(options){},kendo.ui.NumericTextBox=function(){},kendo.ui.NumericTextBox.prototype={destroy:function(){},enable:function(enable){},readonly:function(readonly){},focus:function(){},max:function(value){},min:function(value){},step:function(value){},value:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoNumericTextBox=function(){},$.fn.kendoNumericTextBox=function(options){},kendo.ui.Pager=function(){},kendo.ui.Pager.prototype={totalPages:function(){},pageSize:function(){},page:function(page){},refresh:function(){},destroy:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoPager=function(){},$.fn.kendoPager=function(options){},kendo.ui.PanelBar=function(){},kendo.ui.PanelBar.prototype={append:function(item,referenceItem){},clearSelection:function(){},collapse:function(element,useAnimation){},destroy:function(){},enable:function(element,enable){},expand:function(element,useAnimation){},insertAfter:function(item,referenceItem){},insertBefore:function(item,referenceItem){},reload:function(element){},remove:function(element){},select:function(element){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoPanelBar=function(){},$.fn.kendoPanelBar=function(options){},kendo.ui.PivotConfigurator=function(){},kendo.ui.PivotConfigurator.prototype={destroy:function(){},refresh:function(){},setDataSource:function(dataSource){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoPivotConfigurator=function(){},$.fn.kendoPivotConfigurator=function(options){},kendo.ui.PivotGrid=function(){},kendo.ui.PivotGrid.prototype={cellInfo:function(columnIndex,rowIndex){},cellInfoByElement:function(cell){},destroy:function(){},refresh:function(){},setDataSource:function(dataSource){},saveAsExcel:function(){},saveAsPDF:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoPivotGrid=function(){},$.fn.kendoPivotGrid=function(options){},kendo.ui.ProgressBar=function(){},kendo.ui.ProgressBar.prototype={enable:function(enable){},value:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoProgressBar=function(){},$.fn.kendoProgressBar=function(options){},kendo.ui.RangeSlider=function(){},kendo.ui.RangeSlider.prototype={destroy:function(){},enable:function(enable){},value:function(selectionStart,selectionEnd){},resize:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoRangeSlider=function(){},$.fn.kendoRangeSlider=function(options){},kendo.ui.ResponsivePanel=function(){},kendo.ui.ResponsivePanel.prototype={close:function(){},destroy:function(){},open:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoResponsivePanel=function(){},$.fn.kendoResponsivePanel=function(options){},kendo.ui.Scheduler=function(){},kendo.ui.Scheduler.prototype={addEvent:function(data){},cancelEvent:function(){},data:function(){},date:function(value){},destroy:function(){},editEvent:function(event){},occurrenceByUid:function(uid){},occurrencesInRange:function(start,end){},refresh:function(){},removeEvent:function(event){},resourcesBySlot:function(slot){},saveAsPDF:function(){},saveEvent:function(){},select:function(events,options){},setDataSource:function(dataSource){},slotByPosition:function(xPosition,yPosition){},slotByElement:function(element){},view:function(type){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoScheduler=function(){},$.fn.kendoScheduler=function(options){},kendo.ui.Slider=function(){},kendo.ui.Slider.prototype={destroy:function(){},enable:function(enable){},value:function(value){},resize:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSlider=function(){},$.fn.kendoSlider=function(options){},kendo.ui.Sortable=function(){},kendo.ui.Sortable.prototype={indexOf:function(element){},items:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSortable=function(){},$.fn.kendoSortable=function(options){},kendo.ui.Splitter=function(){},kendo.ui.Splitter.prototype={ajaxRequest:function(pane,url,data){},append:function(config){},collapse:function(pane){},destroy:function(){},expand:function(pane){},insertAfter:function(config,referencePane){},insertBefore:function(config,referencePane){},max:function(pane,value){},min:function(pane,value){},remove:function(pane){},size:function(pane,value){},toggle:function(pane,expand){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSplitter=function(){},$.fn.kendoSplitter=function(options){},kendo.ui.TabStrip=function(){},kendo.ui.TabStrip.prototype={activateTab:function(item){},append:function(tab){},contentElement:function(itemIndex){},contentHolder:function(itemIndex){},deactivateTab:function(item){},destroy:function(){},disable:function(element){},enable:function(element,enable){},insertAfter:function(item,referenceTab){},insertBefore:function(item,referenceTab){},items:function(){},reload:function(element){},remove:function(element){},select:function(element){},setDataSource:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoTabStrip=function(){},$.fn.kendoTabStrip=function(options){},kendo.ui.TimePicker=function(){},kendo.ui.TimePicker.prototype={close:function(){},destroy:function(){},enable:function(enable){},readonly:function(readonly){},max:function(value){},min:function(value){},open:function(){},setOptions:function(options){},value:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoTimePicker=function(){},$.fn.kendoTimePicker=function(options){},
kendo.ui.ToolBar=function(){},kendo.ui.ToolBar.prototype={add:function(command){},destroy:function(){},enable:function(command,enable){},getSelectedFromGroup:function(groupName){},remove:function(command){},toggle:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoToolBar=function(){},$.fn.kendoToolBar=function(options){},kendo.ui.Tooltip=function(){},kendo.ui.Tooltip.prototype={show:function(element){},hide:function(){},refresh:function(){},target:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoTooltip=function(){},$.fn.kendoTooltip=function(options){},kendo.ui.TreeList=function(){},kendo.ui.TreeList.prototype={addRow:function(parentRow){},cancelRow:function(){},clearSelection:function(){},collapse:function(){},dataItem:function(row){},destroy:function(){},editRow:function(row){},expand:function(){},refresh:function(){},removeRow:function(row){},saveAsExcel:function(){},saveAsPDF:function(){},saveRow:function(){},select:function(rows){},setDataSource:function(dataSource){},showColumn:function(column){},hideColumn:function(column){},lockColumn:function(column){},unlockColumn:function(column){},reorderColumn:function(destIndex,column){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoTreeList=function(){},$.fn.kendoTreeList=function(options){},kendo.ui.TreeView=function(){},kendo.ui.TreeView.prototype={append:function(nodeData,parentNode,success){},collapse:function(nodes){},dataItem:function(node){},destroy:function(){},detach:function(node){},enable:function(nodes,enable){},expand:function(nodes){},expandPath:function(path,complete){},expandTo:function(targetNode){},findByText:function(text){},findByUid:function(text){},insertAfter:function(nodeData,referenceNode){},insertBefore:function(nodeData,referenceNode){},parent:function(node){},remove:function(node){},select:function(node){},setDataSource:function(dataSource){},text:function(node,newText){},toggle:function(node){},updateIndeterminate:function(node){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoTreeView=function(){},$.fn.kendoTreeView=function(options){},kendo.ui.Upload=function(){},kendo.ui.Upload.prototype={destroy:function(){},disable:function(){},enable:function(enable){},toggle:function(enable){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoUpload=function(){},$.fn.kendoUpload=function(options){},kendo.ui.Validator=function(){},kendo.ui.Validator.prototype={errors:function(){},hideMessages:function(){},validate:function(){},validateInput:function(input){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoValidator=function(){},$.fn.kendoValidator=function(options){},kendo.ui.Widget=function(){},kendo.ui.Widget.prototype={bind:function(){},destroy:function(){},one:function(){},setOptions:function(newOptions){},trigger:function(){},unbind:function(){},self:null},$.fn.getKendoWidget=function(){},$.fn.kendoWidget=function(options){},kendo.ui.Window=function(){},kendo.ui.Window.prototype={center:function(){},close:function(){},content:function(content){},destroy:function(){},maximize:function(){},minimize:function(){},open:function(){},pin:function(){},refresh:function(options){},restore:function(){},setOptions:function(options){},title:function(text){},toFront:function(){},toggleMaximization:function(){},unpin:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoWindow=function(){},$.fn.kendoWindow=function(options){};