dnn.controls.DNNInputText=function(multiLine){multiLine?this.control=document.createElement("textarea"):(this.control=document.createElement("input"),this.control.type="text"),this.container=this.control,this.initialized=!0,this.supportsMultiLine=multiLine,this.isRichText=!1,this.loaded=!1},dnn.controls.DNNInputText.prototype={focus:function(){this.control.focus();var len=this.getText().length;if(this.control.createTextRange){var range=this.control.createTextRange();range.moveStart("character",len),range.moveEnd("character",len),range.collapse(),range.select()}else this.control.selectionStart=len,this.control.selectionEnd=len},ltrim:function(s){return s.replace(/^\s*/,"")},rtrim:function(s){return s.replace(/\s*$/,"")},getText:function(){return this.control.value},setText:function(s){this.control.value=this.rtrim(this.ltrim(s))}},dnn.controls.DNNInputText.registerClass("dnn.controls.DNNInputText");