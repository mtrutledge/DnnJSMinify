var kendo={ui:{},mobile:{ui:{}},dataviz:{ui:{}},data:{}};kendo||(kendo={}),kendo.Class=function(){},kendo.Class.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoClass=function(){},$.fn.kendoClass=function(options){},kendo.Color=function(){},kendo.Color.prototype={diff:function(){},equals:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoColor=function(){},$.fn.kendoColor=function(options){},kendo.Layout=function(){},kendo.Layout.prototype={showIn:function(container,view,transitionClass){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoLayout=function(){},$.fn.kendoLayout=function(options){},kendo.Observable=function(){},kendo.Observable.prototype={bind:function(eventName,handler){},one:function(eventName,handler){},trigger:function(eventName,eventData){},unbind:function(eventName,handler){},self:null},$.fn.getKendoObservable=function(){},$.fn.kendoObservable=function(options){},kendo.Router=function(){},kendo.Router.prototype={start:function(){},route:function(route,callback){},navigate:function(route,silent){},replace:function(route,silent){},destroy:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoRouter=function(){},$.fn.kendoRouter=function(options){},kendo.View=function(){},kendo.View.prototype={destroy:function(){},render:function(container){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoView=function(){},$.fn.kendoView=function(options){},kendo.data.Binder=function(){},kendo.data.Binder.prototype={refresh:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoBinder=function(){},$.fn.kendoBinder=function(options){},kendo.data.DataSource=function(){},kendo.data.DataSource.prototype={add:function(model){},aggregate:function(value){},aggregates:function(){},at:function(index){},cancelChanges:function(model){},data:function(value){},fetch:function(callback){},filter:function(value){},get:function(id){},getByUid:function(uid){},group:function(value){},hasChanges:function(){},indexOf:function(dataItem){},insert:function(index,model){},online:function(value){},offlineData:function(data){},page:function(page){},pageSize:function(size){},pushCreate:function(items){},pushDestroy:function(items){},pushUpdate:function(items){},query:function(options){},read:function(data){},remove:function(model){},sort:function(value){},sync:function(){},total:function(){},totalPages:function(){},view:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoDataSource=function(){},$.fn.kendoDataSource=function(options){},kendo.data.GanttDataSource=function(){},kendo.data.GanttDataSource.prototype={taskAllChildren:function(task){},taskChildren:function(task){},taskLevel:function(task){},taskParent:function(task){},taskSiblings:function(task){},taskTree:function(task){},update:function(task,taskInfo){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoGanttDataSource=function(){},$.fn.kendoGanttDataSource=function(options){},kendo.data.GanttDependency=function(){},kendo.data.GanttDependency.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoGanttDependency=function(){},$.fn.kendoGanttDependency=function(options){},kendo.data.GanttDependencyDataSource=function(){},kendo.data.GanttDependencyDataSource.prototype={dependencies:function(id){},predecessors:function(id){},successors:function(id){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoGanttDependencyDataSource=function(){},$.fn.kendoGanttDependencyDataSource=function(options){},kendo.data.GanttTask=function(){},kendo.data.GanttTask.prototype={duration:function(){},isMilestone:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoGanttTask=function(){},$.fn.kendoGanttTask=function(options){},kendo.data.HierarchicalDataSource=function(){},kendo.data.HierarchicalDataSource.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoHierarchicalDataSource=function(){},$.fn.kendoHierarchicalDataSource=function(options){},kendo.data.Model=function(){},kendo.data.Model.prototype={bind:function(){},editable:function(field){},get:function(){},isNew:function(){},set:function(){},toJSON:function(){},unbind:function(event,callback){}},$.fn.getKendoModel=function(){},$.fn.kendoModel=function(options){},kendo.data.Node=function(){},kendo.data.Node.prototype={append:function(model){},level:function(){},load:function(){},loaded:function(){},parentNode:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoNode=function(){},$.fn.kendoNode=function(options){},kendo.data.ObservableArray=function(){},kendo.data.ObservableArray.prototype={bind:function(eventName,handler){},join:function(separator){},parent:function(){},pop:function(){},push:function(){},slice:function(begin,end){},splice:function(index,howMany){},shift:function(){},toJSON:function(){},unshift:function(){},unbind:function(event,callback){}},$.fn.getKendoObservableArray=function(){},$.fn.kendoObservableArray=function(options){},kendo.data.ObservableObject=function(){},kendo.data.ObservableObject.prototype={bind:function(){},get:function(name){},parent:function(){},set:function(name,value){},toJSON:function(){},unbind:function(event,callback){}},$.fn.getKendoObservableObject=function(){},$.fn.kendoObservableObject=function(options){},kendo.data.PivotDataSource=function(){},kendo.data.PivotDataSource.prototype={axes:function(){},catalog:function(name){},columns:function(val){},cube:function(name){},discover:function(options){},measures:function(val){},measuresAxis:function(){},rows:function(val){},schemaCatalogs:function(){},schemaCubes:function(){},schemaDimensions:function(){},schemaHierarchies:function(dimensionName){},schemaLevels:function(hierarchyName){},schemaMeasures:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoPivotDataSource=function(){},$.fn.kendoPivotDataSource=function(options){},kendo.data.SchedulerDataSource=function(){},kendo.data.SchedulerDataSource.prototype={expand:function(start,end){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSchedulerDataSource=function(){},$.fn.kendoSchedulerDataSource=function(options){},kendo.data.SchedulerEvent=function(){},kendo.data.SchedulerEvent.prototype={clone:function(options,updateUid){},duration:function(){},expand:function(start,end,timeZoneId){},update:function(eventInfo){},isMultiDay:function(){},isException:function(){},isOccurrence:function(){},isRecurring:function(){},isRecurrenceHead:function(){},toOccurrence:function(options){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSchedulerEvent=function(){},$.fn.kendoSchedulerEvent=function(options){},kendo.data.TreeListDataSource=function(){},kendo.data.TreeListDataSource.prototype={load:function(model){},childNodes:function(model){},rootNodes:function(){},parentNode:function(model){},level:function(model){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoTreeListDataSource=function(){},$.fn.kendoTreeListDataSource=function(options){},kendo.data.TreeListModel=function(){},kendo.data.TreeListModel.prototype={loaded:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoTreeListModel=function(){},$.fn.kendoTreeListModel=function(options){},drawing||(drawing={}),kendo.drawing.Arc=function(){},kendo.drawing.Arc.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},geometry:function(value){},fill:function(color,opacity){},opacity:function(opacity){},stroke:function(color,width,opacity){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoArc=function(){},$.fn.kendoArc=function(options){},kendo.drawing.Circle=function(){},kendo.drawing.Circle.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},geometry:function(value){},fill:function(color,opacity){},opacity:function(opacity){},stroke:function(color,width,opacity){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoCircle=function(){},$.fn.kendoCircle=function(options){},kendo.drawing.Element=function(){},kendo.drawing.Element.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},opacity:function(opacity){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoElement=function(){},$.fn.kendoElement=function(options){},kendo.drawing.FillOptions=function(){},kendo.drawing.FillOptions.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoFillOptions=function(){},$.fn.kendoFillOptions=function(options){},kendo.drawing.Group=function(){},kendo.drawing.Group.prototype={append:function(element){},clear:function(){},clip:function(clip){},clippedBBox:function(){},opacity:function(opacity){},remove:function(element){},removeAt:function(index){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoGroup=function(){},$.fn.kendoGroup=function(options){},kendo.drawing.Image=function(){},kendo.drawing.Image.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},opacity:function(opacity){},src:function(value){},rect:function(value){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoImage=function(){},$.fn.kendoImage=function(options){},kendo.drawing.Layout=function(){},kendo.drawing.Layout.prototype={rect:function(rect){},reflow:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoLayout=function(){},$.fn.kendoLayout=function(options){},kendo.drawing.MultiPath=function(){},kendo.drawing.MultiPath.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},close:function(){},curveTo:function(controlOut,controlIn){},fill:function(color,opacity){},lineTo:function(x,y){},moveTo:function(x,y){},opacity:function(opacity){},stroke:function(color,width,opacity){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMultiPath=function(){},$.fn.kendoMultiPath=function(options){},kendo.drawing.OptionsStore=function(){},kendo.drawing.OptionsStore.prototype={get:function(field){},set:function(field,value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoOptionsStore=function(){},$.fn.kendoOptionsStore=function(options){},kendo.drawing.PDFOptions=function(){},kendo.drawing.PDFOptions.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoPDFOptions=function(){},$.fn.kendoPDFOptions=function(options){},kendo.drawing.Path=function(){},kendo.drawing.Path.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},close:function(){},curveTo:function(controlOut,controlIn){},fill:function(color,opacity){},lineTo:function(x,y){},moveTo:function(x,y){},opacity:function(opacity){},stroke:function(color,width,opacity){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoPath=function(){},$.fn.kendoPath=function(options){},kendo.drawing.Segment=function(){},kendo.drawing.Segment.prototype={anchor:function(value){},controlIn:function(value){},controlOut:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSegment=function(){},$.fn.kendoSegment=function(options){},kendo.drawing.StrokeOptions=function(){},kendo.drawing.StrokeOptions.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoStrokeOptions=function(){},$.fn.kendoStrokeOptions=function(options){},kendo.drawing.Surface=function(){},kendo.drawing.Surface.prototype={clear:function(){},draw:function(element){},eventTarget:function(e){},resize:function(force){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSurface=function(){},$.fn.kendoSurface=function(options){},kendo.drawing.Text=function(){},kendo.drawing.Text.prototype={bbox:function(){},clip:function(clip){},clippedBBox:function(){},content:function(value){},fill:function(color,opacity){},opacity:function(opacity){},position:function(value){},stroke:function(color,width,opacity){},transform:function(transform){},visible:function(visible){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoText=function(){},$.fn.kendoText=function(options){},effects||(effects={}),kendo.geometry.Arc=function(){},kendo.geometry.Arc.prototype={bbox:function(matrix){},getAnticlockwise:function(){},getCenter:function(){},getEndAngle:function(){},getRadiusX:function(){},getRadiusY:function(){},getStartAngle:function(){},pointAt:function(angle){},setAnticlockwise:function(value){},setCenter:function(value){},setEndAngle:function(value){},setRadiusX:function(value){},setRadiusY:function(value){},setStartAngle:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoArc=function(){},$.fn.kendoArc=function(options){},kendo.geometry.Circle=function(){},kendo.geometry.Circle.prototype={bbox:function(matrix){},clone:function(){},equals:function(other){},getCenter:function(){},getRadius:function(){},pointAt:function(angle){},setCenter:function(value){},setRadius:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoCircle=function(){},$.fn.kendoCircle=function(options){},kendo.geometry.Matrix=function(){},kendo.geometry.Matrix.prototype={clone:function(){},equals:function(other){},round:function(digits){},multiplyCopy:function(matrix){},toArray:function(digits){},toString:function(digits,separator){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMatrix=function(){},$.fn.kendoMatrix=function(options){},kendo.geometry.Point=function(){},kendo.geometry.Point.prototype={clone:function(){},distanceTo:function(point){},equals:function(other){},getX:function(){},getY:function(){},move:function(x,y){},rotate:function(angle,center){},round:function(digits){},scale:function(scaleX,scaleY){},scaleCopy:function(scaleX,scaleY){},setX:function(value){},setY:function(value){},toArray:function(digits){},toString:function(digits,separator){},transform:function(tansformation){},transformCopy:function(tansformation){},translate:function(dx,dy){},translateWith:function(vector){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoPoint=function(){},$.fn.kendoPoint=function(options){},kendo.geometry.Rect=function(){},kendo.geometry.Rect.prototype={bbox:function(matrix){},bottomLeft:function(){},bottomRight:function(){},center:function(){},clone:function(){},equals:function(other){},getOrigin:function(){},getSize:function(){},height:function(){},setOrigin:function(value){},setSize:function(value){},topLeft:function(){},topRight:function(){},width:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoRect=function(){},$.fn.kendoRect=function(options){},kendo.geometry.Size=function(){},kendo.geometry.Size.prototype={clone:function(){},equals:function(other){},getWidth:function(){},getHeight:function(){},setWidth:function(value){},setHeight:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoSize=function(){},$.fn.kendoSize=function(options){},kendo.geometry.Transformation=function(){},kendo.geometry.Transformation.prototype={clone:function(){},equals:function(other){},matrix:function(){},multiply:function(transformation){},rotate:function(angle,center){},scale:function(scaleX,scaleY){},translate:function(x,y){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoTransformation=function(){},$.fn.kendoTransformation=function(options){},kendo.mobile.Application=function(){},kendo.mobile.Application.prototype={changeLoadingMessage:function(text){},hideLoading:function(){},navigate:function(url,transition){},replace:function(url,transition){},scroller:function(){},showLoading:function(){},skin:function(skin){},view:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileApplication=function(){},$.fn.kendoMobileApplication=function(options){},kendo.mobile.ui.ActionSheet=function(){},kendo.mobile.ui.ActionSheet.prototype={close:function(){},destroy:function(){},open:function(target,context){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileActionSheet=function(){},$.fn.kendoMobileActionSheet=function(options){},kendo.mobile.ui.BackButton=function(){},kendo.mobile.ui.BackButton.prototype={destroy:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileBackButton=function(){},$.fn.kendoMobileBackButton=function(options){},kendo.mobile.ui.Button=function(){},kendo.mobile.ui.Button.prototype={badge:function(value){},destroy:function(){},enable:function(enable){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileButton=function(){},$.fn.kendoMobileButton=function(options){},kendo.mobile.ui.ButtonGroup=function(){},kendo.mobile.ui.ButtonGroup.prototype={badge:function(button,value){},current:function(){},destroy:function(){},enable:function(enable){},select:function(li){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileButtonGroup=function(){},$.fn.kendoMobileButtonGroup=function(options){},kendo.mobile.ui.Collapsible=function(){};kendo.mobile.ui.Collapsible.prototype={collapse:function(instant){},destroy:function(){},expand:function(instant){},toggle:function(instant){},bind:function(event,callback){},unbind:function(event,callback){}};$.fn.getKendoMobileCollapsible=function(){},$.fn.kendoMobileCollapsible=function(options){},kendo.mobile.ui.DetailButton=function(){},kendo.mobile.ui.DetailButton.prototype={destroy:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileDetailButton=function(){},$.fn.kendoMobileDetailButton=function(options){},kendo.mobile.ui.Drawer=function(){},kendo.mobile.ui.Drawer.prototype={destroy:function(){},hide:function(){},show:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileDrawer=function(){},$.fn.kendoMobileDrawer=function(options){},kendo.mobile.ui.Layout=function(){},kendo.mobile.ui.Layout.prototype={bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileLayout=function(){},$.fn.kendoMobileLayout=function(options){},kendo.mobile.ui.ListView=function(){},kendo.mobile.ui.ListView.prototype={append:function(dataItems){},prepend:function(dataItems){},replace:function(dataItems){},remove:function(dataItems){},setDataItem:function(item,dataItem){},destroy:function(){},items:function(){},refresh:function(){},setDataSource:function(dataSource){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileListView=function(){},$.fn.kendoMobileListView=function(options){},kendo.mobile.ui.Loader=function(){},kendo.mobile.ui.Loader.prototype={hide:function(){},show:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileLoader=function(){},$.fn.kendoMobileLoader=function(options){},kendo.mobile.ui.ModalView=function(){},kendo.mobile.ui.ModalView.prototype={close:function(){},destroy:function(){},open:function(target){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileModalView=function(){},$.fn.kendoMobileModalView=function(options){},kendo.mobile.ui.NavBar=function(){},kendo.mobile.ui.NavBar.prototype={destroy:function(){},title:function(value){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileNavBar=function(){},$.fn.kendoMobileNavBar=function(options){},kendo.mobile.ui.Pane=function(){},kendo.mobile.ui.Pane.prototype={destroy:function(){},hideLoading:function(){},navigate:function(url,transition){},replace:function(url,transition){},Example:function(){},showLoading:function(){},view:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobilePane=function(){},$.fn.kendoMobilePane=function(options){},kendo.mobile.ui.PopOver=function(){},kendo.mobile.ui.PopOver.prototype={close:function(){},destroy:function(){},open:function(target){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobilePopOver=function(){},$.fn.kendoMobilePopOver=function(options){},kendo.mobile.ui.ScrollView=function(){},kendo.mobile.ui.ScrollView.prototype={content:function(content){},destroy:function(){},next:function(){},prev:function(){},refresh:function(){},scrollTo:function(page,instant){},setDataSource:function(dataSource){},value:function(dataItem){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileScrollView=function(){},$.fn.kendoMobileScrollView=function(options){},kendo.mobile.ui.Scroller=function(){},kendo.mobile.ui.Scroller.prototype={animatedScrollTo:function(x,y){},destroy:function(){},disable:function(){},enable:function(){},height:function(){},pullHandled:function(){},reset:function(){},scrollHeight:function(){},scrollTo:function(x,y){},scrollWidth:function(){},zoomOut:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileScroller=function(){},$.fn.kendoMobileScroller=function(options){},kendo.mobile.ui.SplitView=function(){},kendo.mobile.ui.SplitView.prototype={destroy:function(){},expandPanes:function(){},collapsePanes:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileSplitView=function(){},$.fn.kendoMobileSplitView=function(options){},kendo.mobile.ui.Switch=function(){},kendo.mobile.ui.Switch.prototype={check:function(check){},destroy:function(){},enable:function(enable){},refresh:function(){},toggle:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileSwitch=function(){},$.fn.kendoMobileSwitch=function(options){},kendo.mobile.ui.TabStrip=function(){},kendo.mobile.ui.TabStrip.prototype={badge:function(tab,value){},currentItem:function(){},destroy:function(){},switchTo:function(url){},switchByFullUrl:function(url){},clear:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileTabStrip=function(){},$.fn.kendoMobileTabStrip=function(options){},kendo.mobile.ui.View=function(){},kendo.mobile.ui.View.prototype={contentElement:function(){},destroy:function(){},enable:function(enable){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileView=function(){},$.fn.kendoMobileView=function(options){},kendo.mobile.ui.Widget=function(){},kendo.mobile.ui.Widget.prototype={view:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoMobileWidget=function(){},$.fn.kendoMobileWidget=function(options){},kendo.ooxml.Workbook=function(){},kendo.ooxml.Workbook.prototype={toDataURL:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoWorkbook=function(){},$.fn.kendoWorkbook=function(options){},kendo.ui.Touch=function(){},kendo.ui.Touch.prototype={cancel:function(){},destroy:function(){},bind:function(event,callback){},unbind:function(event,callback){}},$.fn.getKendoTouch=function(){},$.fn.kendoTouch=function(options){};