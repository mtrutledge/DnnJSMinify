Type.registerNamespace("dnn.controls"),dnn.extend(dnn.controls,{initMultiStateBox:function(ctl){if(ctl){var ts=new dnn.controls.DNNMultiStateBox(ctl);return ts.initialize(),ts}}}),dnn.controls.DNNMultiStateBox=function(o){dnn.controls.DNNMultiStateBox.initializeBase(this,[o]),this.css=this.getProp("css",""),this.enabled="1"==this.getProp("enabled","1"),this.imgPath=this.getProp("imgpath","images/"),this.states=this.getProp("states","[]"),this.states=Sys.Serialization.JavaScriptSerializer.deserialize(this.states),this.stateIndex=[];for(var i=0;i<this.states.length;i++)this.stateIndex[this.states[i].Key]=i;if(this.js=this.getProp("js",""),this._img=document.createElement("img"),this.container.parentNode.insertBefore(this._img,this.container),this.container.checked=!0,this.container.style.position="absolute",this.container.style.top="-999px",this._label=dnn.dom.getByTagName("label",this.container.parentNode),this._label){for(var i=0;i<this._label.length;i++)if(this._label[i].htmlFor==this.container.id){this._label=this._label[i];break}}else this._img.tabIndex=0;this.set_Value(this.get_Value()),this.addHandlers(this.container,{click:this.click},this),this.addHandlers(this._img,{click:this.click,keypress:this.keypress},this)},dnn.controls.DNNMultiStateBox.prototype={get_Value:function(){return this.container.value},set_Value:function(value){var index=this.stateIndex[value],state=this.states[index];this.enabled?this._img.src=this.imgPath+state.ImageUrl:this._img.src=this.imgPath+state.DisabledImageUrl,this._img.alt=state.ToolTip,this._label&&(this._label.innerHTML=state.Text),this.container.value=state.Key},click:function(sender,args){if(this.enabled){var index=this.stateIndex[this.get_Value()]+1;index>this.states.length-1&&(index=0),this.set_Value(this.states[index].Key)}this.container.checked=!0},keypress:function(sender,args){},dispose:function(){dnn.controls.DNNMultiStateBox.callBaseMethod(this,"dispose")}},dnn.controls.DNNMultiStateBox.registerClass("dnn.controls.DNNMultiStateBox",dnn.controls.control);