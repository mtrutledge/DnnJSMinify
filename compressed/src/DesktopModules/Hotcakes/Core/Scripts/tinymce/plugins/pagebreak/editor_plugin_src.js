!function(){tinymce.create("tinymce.plugins.PageBreakPlugin",{init:function(ed,url){var pbRE,pb='<img src="'+ed.theme.url+'/img/trans.gif" class="mcePageBreak mceItemNoResize" />',cls="mcePageBreak",sep=ed.getParam("pagebreak_separator","<!-- pagebreak -->");pbRE=new RegExp(sep.replace(/[\?\.\*\[\]\(\)\{\}\+\^\$\:]/g,function(a){return"\\"+a}),"g"),ed.addCommand("mcePageBreak",function(){ed.execCommand("mceInsertContent",0,pb)}),ed.addButton("pagebreak",{title:"pagebreak.desc",cmd:cls}),ed.onInit.add(function(){ed.theme.onResolveName&&ed.theme.onResolveName.add(function(th,o){"IMG"==o.node.nodeName&&ed.dom.hasClass(o.node,cls)&&(o.name="pagebreak")})}),ed.onClick.add(function(ed,e){e=e.target,"IMG"===e.nodeName&&ed.dom.hasClass(e,cls)&&ed.selection.select(e)}),ed.onNodeChange.add(function(ed,cm,n){cm.setActive("pagebreak","IMG"===n.nodeName&&ed.dom.hasClass(n,cls))}),ed.onBeforeSetContent.add(function(ed,o){o.content=o.content.replace(pbRE,pb)}),ed.onPostProcess.add(function(ed,o){o.get&&(o.content=o.content.replace(/<img[^>]+>/g,function(im){return im.indexOf('class="mcePageBreak')!==-1&&(im=sep),im}))})},getInfo:function(){return{longname:"PageBreak",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/pagebreak",version:tinymce.majorVersion+"."+tinymce.minorVersion}}}),tinymce.PluginManager.add("pagebreak",tinymce.plugins.PageBreakPlugin)}();