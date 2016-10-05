Type.registerNamespace("dnn.controls"),dnn.extend(dnn.controls,{initLabelEdit:function(a){if(a){var b=new dnn.controls.DNNLabelEdit(a);return b.initialize(),b}}}),dnn.controls.DNNLabelEdit=function(o){dnn.controls.DNNLabelEdit.initializeBase(this,[o]),this.control=this.container,this.editWrapper=null,this.editContainer=null,this.editControl=null,this.prevText="",this.onblurSave="1"==this.getProp("blursave","1"),this.toolbarId=this.getProp("tbId",""),this.nsPrefix=this.getProp("nsPrefix",""),this.toolbarEventName=this.getProp("tbEvent","onmousemove"),this.toolbar=null,this.css=o.className,this.cssEdit=this.getProp("cssEdit",""),this.cssWork=this.getProp("cssWork",""),this.cssOver=this.getProp("cssOver",""),this.sysImgPath=this.getProp("sysimgpath",""),this.callBack=this.getProp("callback",""),this.callBackStatFunc=this.getProp("callbackSF",""),this.callBackStatFunc.length>0&&this.add_handler("callBackStatus",eval(this.callBackStatFunc)),this.beforeSaveFunc=this.getProp("beforeSaveF",""),this.beforeSaveFunc.length>0&&this.add_handler("beforeSave",eval(this.beforeSaveFunc)),this.eventName=this.getProp("eventName","onclick"),this.multiLineEnabled="1"==this.getProp("multiline","0"),this.saveOnEnter="1"==this.getProp("saveonenter","1"),this.richTextEnabled="1"==this.getProp("richtext","0"),this.supportsCE=null!=document.body.contentEditable,(dnn.dom.browser.isType(dnn.dom.browser.Safari)||dnn.dom.browser.isType(dnn.dom.browser.Opera))&&(this.supportsCE=!1),this.supportsRichText=this.supportsCE||dnn.dom.browser.isType(dnn.dom.browser.Mozilla)&&navigator.productSub>="20050111","none"!=this.eventName&&this.addHandlers(o,this.getDynamicEventObject(this._getEventName(this.eventName),this.performEdit),this),this.toolbarId.length>0&&this.addHandlers(o,this.getDynamicEventObject(this._getEventName(this.toolbarEventName),this.showToolBar),this),this.addHandlers(o,{mousemove:this.mouseMove,mouseout:this.mouseOut},this),this._toolbarActionDelegate=dnn.createDelegate(this,this.toolbarAction),this._initToolbarDelegate=dnn.createDelegate(this,this.initToolbar),this._performEditDelegate=dnn.createDelegate(this,this.performEdit)},dnn.controls.DNNLabelEdit.prototype={isEditMode:function(){return""!=this.container.style.display},initToolbar:function(){if(null==this.toolbar){var a=dnn.dom.scriptStatus("dnn.controls.dnntoolbar.js");"complete"==a?(this.toolbar=new dnn.controls.DNNToolBar(this.ns),this.toolbar.loadDefinition(this.toolbarId,this.nsPrefix,this.container,this.container.parentNode,this.container,this._toolbarActionDelegate),this.handleToolbarDisplay()):""==a&&dnn.dom.loadScript(dnn.dom.getScriptPath()+"dnn.controls.dnntoolbar.js","",this._initToolbarDelegate)}},toolbarAction:function(a,d){var c=a.clickAction;if("edit"==c)this.performEdit();else if("save"==c)this.persistEdit(),this.toolbar.hide();else if("cancel"==c)this.cancelEdit(),this.toolbar.hide();else if(this.isFormatButton(c)&&this.editWrapper){var b;"createlink"==c&&0==dnn.dom.browser.isType(dnn.dom.browser.InternetExplorer)&&(b=prompt(a.tooltip)),this.editWrapper.focus(),this.editWrapper.execCommand(c,null,b)}},performEdit:function(){if(this.toolbar&&this.toolbar.hide(),this.initEditWrapper(),null!=this.editContainer){this.editContainer.style.width="100%",this.editContainer.style.display="",this.editContainer.style.overflow="auto",this.editContainer.style.overflowX="hidden",this.prevText=this.container.innerHTML,dnn.dom.browser.isType(dnn.dom.browser.Safari)&&this.container.innerText&&(this.prevText=this.container.innerText),this.editWrapper.setText(this.prevText),this.initEditControl(),this.container.style.display="none",this.handleToolbarDisplay();var a=new Sys.CancelEventArgs;if(this.invoke_handler("beforeEdit",a),a.get_cancel())return void this.cancelEdit()}},showToolBar:function(){this.initToolbar(),this.toolbar&&this.toolbar.show(!0)},mouseMove:function(a){this.toolbarId.length>0&&"onmousemove"==this.toolbarEventName&&this.showToolBar(),this.container.className=this.css+" "+this.cssOver},mouseOut:function(){this.toolbar&&this.toolbar.beginHide(),this.container.className=this.css},initEditWrapper:function(){if(null==this.editWrapper){var e=this.richTextEnabled&&this.supportsRichText,c=e?"dnn.controls.dnnrichtext.js":"dnn.controls.dnninputtext.js",b=dnn.dom.scriptStatus(c);if("complete"==b){var a;if(this.richTextEnabled&&this.supportsRichText){var d=dnn.dom.getObjMethRef(this,"initEditControl");a=new dnn.controls.DNNRichText(d)}else a=new dnn.controls.DNNInputText(this.multiLineEnabled);this.editWrapper=a,this.editContainer=this.editWrapper.container,this.container.parentNode.insertBefore(this.editContainer,this.container),this.richTextEnabled&&this.supportsCE&&this.initEditControl()}else""==b&&dnn.dom.loadScript(dnn.dom.getScriptPath()+c,"",this._performEditDelegate)}},initEditControl:function(){if(this.editWrapper.initialized&&(this.editControl=this.editWrapper.control,this.editControl.className=this.container.className+" "+this.cssEdit,this.editWrapper.focus(),0==this.editWrapper.loaded)){var a={keypress:this.handleKeyPress,mousemove:this.mouseMove,mouseout:this.mouseOut};this.onblurSave&&(a.blur=this.persistEdit),this.editWrapper.supportsCE||0==this.editWrapper.isRichText?this.addHandlers(this.editControl,a,this):this.addHandlers(this.editContainer.contentWindow.document,a,this),this.editWrapper.loaded=!0}},persistEdit:function(){this.editWrapper.getText()!=this.prevText?this.invoke_compatHandler("beforeSave",null,this)&&(this.editControl.className=this.container.className+" "+this.cssWork,eval(this.callBack.replace("[TEXT]",dnn.escapeForEval(this.editWrapper.getText())))):this.showLabel()},cancelEdit:function(){this.editWrapper.setText(this.prevText),this.showLabel()},callBackStatus:function(a,b,c){var d=b;d.invoke_compatHandler("callBackStatus",a,b,c)},callBackSuccess:function(a,b,c){b.callBackStatus(a,b),b.invoke_handler("callBackSuccess",new dnn.controls.DNNCallbackEventArgs(a,b,c)),b.showLabel(),b.flashLabel()},raiseEvent:function(sFunc,evt,element){if(this[sFunc].length>0){var ptr=eval(this[sFunc]);return 0!=ptr(evt,element)}return!0},handleToolbarDisplay:function(){if(this.toolbar){var b,c=this.isEditMode();for(var a in this.toolbar.buttons)b=this.toolbar.buttons[a],"function"!=typeof b&&("edit"==a?(b.visible=!c,b.visible?this.toolbar.css=this.toolbar.css.replace(" editMode",""):this.toolbar.css=this.toolbar.css+" editMode"):this.isFormatButton(a)?b.visible=c&&this.editWrapper&&this.editWrapper.isRichText:b.visible=c);this.toolbar.refresh()}},isFormatButton:function(a){return"~bold~italic~underline~justifyleft~justifycenter~justifyright~insertorderedlist~insertunorderedlist~outdent~indent~createlink~".indexOf("~"+a+"~")>-1},showLabel:function(){this.container.innerHTML=this.editWrapper.getText(),this.container.style.display="",this.container.className=this.css,this.editContainer.style.display="none",this.handleToolbarDisplay()},flashLabel:function(){var a=this;this.container.style.backgroundColor="#fffacd",setTimeout(function(){a.container.style.backgroundColor="#fffff0",setTimeout(function(){a.container.style.backgroundColor="transparent"},300)},2500)},callBackFail:function(a,b,c){b.invoke_handler("callBackFail",new dnn.controls.DNNCallbackEventArgs(a,b,c)),b.cancelEdit()},handleKeyPress:function(a){a.charCode==KEY_RETURN&&0==this.editWrapper.supportsMultiLine?(this.saveOnEnter&&this.persistEdit(),a.preventDefault()):a.charCode==KEY_ESCAPE&&(this.cancelEdit(),a.preventDefault())},dispose:function(){this._toolbarActionDelegate=null,this._initToolbarDelegate=null,this._performEditDelegate=null,dnn.controls.DNNLabelEdit.callBaseMethod(this,"dispose")}},dnn.controls.DNNLabelEdit.registerClass("dnn.controls.DNNLabelEdit",dnn.controls.control);