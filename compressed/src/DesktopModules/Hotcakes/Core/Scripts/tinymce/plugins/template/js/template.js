tinyMCEPopup.requireLangPack();var TemplateDialog={preInit:function(){var url=tinyMCEPopup.getParam("template_external_list_url");null!=url&&document.write('<script language="javascript" type="text/javascript" src="'+tinyMCEPopup.editor.documentBaseURI.toAbsolute(url)+'"></script>')},init:function(){var tsrc,sel,x,ed=tinyMCEPopup.editor;if(tsrc=ed.getParam("template_templates",!1),sel=document.getElementById("tpath"),!tsrc&&"undefined"!=typeof tinyMCETemplateList)for(x=0,tsrc=[];x<tinyMCETemplateList.length;x++)tsrc.push({title:tinyMCETemplateList[x][0],src:tinyMCETemplateList[x][1],description:tinyMCETemplateList[x][2]});for(x=0;x<tsrc.length;x++)sel.options[sel.options.length]=new Option(tsrc[x].title,tinyMCEPopup.editor.documentBaseURI.toAbsolute(tsrc[x].src));this.resize(),this.tsrc=tsrc},resize:function(){var w,h,e;self.innerWidth?(w=self.innerWidth-50,h=self.innerHeight-170):(w=document.body.clientWidth-50,h=document.body.clientHeight-160),e=document.getElementById("templatesrc"),e&&(e.style.height=Math.abs(h)+"px",e.style.width=Math.abs(w-5)+"px")},loadCSSFiles:function(d){var ed=tinyMCEPopup.editor;tinymce.each(ed.getParam("content_css","").split(","),function(u){d.write('<link href="'+ed.documentBaseURI.toAbsolute(u)+'" rel="stylesheet" type="text/css" />')})},selectTemplate:function(u,ti){var x,d=window.frames.templatesrc.document,tsrc=this.tsrc;if(u)for(d.body.innerHTML=this.templateHTML=this.getFileContents(u),x=0;x<tsrc.length;x++)tsrc[x].title==ti&&(document.getElementById("tmpldesc").innerHTML=tsrc[x].description||"")},insert:function(){tinyMCEPopup.execCommand("mceInsertTemplate",!1,{content:this.templateHTML,selection:tinyMCEPopup.editor.selection.getContent()}),tinyMCEPopup.close()},getFileContents:function(u){function g(s){x=0;try{x=new ActiveXObject(s)}catch(s){}return x}var x,t="text/plain";return x=window.ActiveXObject?g("Msxml2.XMLHTTP")||g("Microsoft.XMLHTTP"):new XMLHttpRequest,x.overrideMimeType&&x.overrideMimeType(t),x.open("GET",u,!1),x.send(null),x.responseText}};TemplateDialog.preInit(),tinyMCEPopup.onInit.add(TemplateDialog.init,TemplateDialog);