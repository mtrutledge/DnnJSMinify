var TinyMCE_EditableSelects={editSelectElm:null,init:function(){var i,o,nl=document.getElementsByTagName("select");document;for(i=0;i<nl.length;i++)nl[i].className.indexOf("mceEditableSelect")!=-1&&(o=new Option(tinyMCEPopup.editor.translate("value"),"__mce_add_custom__"),o.className="mceAddSelectValue",nl[i].options[nl[i].options.length]=o,nl[i].onchange=TinyMCE_EditableSelects.onChangeEditableSelect)},onChangeEditableSelect:function(e){var ne,d=document,se=window.event?window.event.srcElement:e.target;"__mce_add_custom__"==se.options[se.selectedIndex].value&&(ne=d.createElement("input"),ne.id=se.id+"_custom",ne.name=se.name+"_custom",ne.type="text",ne.style.width=se.offsetWidth+"px",se.parentNode.insertBefore(ne,se),se.style.display="none",ne.focus(),ne.onblur=TinyMCE_EditableSelects.onBlurEditableSelectInput,ne.onkeydown=TinyMCE_EditableSelects.onKeyDown,TinyMCE_EditableSelects.editSelectElm=se)},onBlurEditableSelectInput:function(){var se=TinyMCE_EditableSelects.editSelectElm;se&&(""!=se.previousSibling.value?(addSelectValue(document.forms[0],se.id,se.previousSibling.value,se.previousSibling.value),selectByValue(document.forms[0],se.id,se.previousSibling.value)):selectByValue(document.forms[0],se.id,""),se.style.display="inline",se.parentNode.removeChild(se.previousSibling),TinyMCE_EditableSelects.editSelectElm=null)},onKeyDown:function(e){e=e||window.event,13==e.keyCode&&TinyMCE_EditableSelects.onBlurEditableSelectInput()}};