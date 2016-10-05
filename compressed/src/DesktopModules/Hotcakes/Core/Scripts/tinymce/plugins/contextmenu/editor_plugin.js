!function(){var a=tinymce.dom.Event,b=(tinymce.each,tinymce.DOM);tinymce.create("tinymce.plugins.ContextMenu",{init:function(f){function h(k,l){return j=0,l&&2==l.button?void(j=l.ctrlKey):void(i._menu&&(i._menu.removeAll(),i._menu.destroy(),a.remove(k.getDoc(),"click",e),i._menu=null))}var g,d,j,e,i=this;i.editor=f,d=f.settings.contextmenu_never_use_native,i.onContextMenu=new tinymce.util.Dispatcher(this),e=function(k){h(f,k)},g=f.onContextMenu.add(function(k,l){(0!==j?j:l.ctrlKey)&&!d||(a.cancel(l),"IMG"==l.target.nodeName&&k.selection.select(l.target),i._getMenu(k).showMenu(l.clientX||l.pageX,l.clientY||l.pageY),a.add(k.getDoc(),"click",e),k.nodeChanged())}),f.onRemove.add(function(){i._menu&&i._menu.removeAll()}),f.onMouseDown.add(h),f.onKeyDown.add(h),f.onKeyDown.add(function(k,l){!l.shiftKey||l.ctrlKey||l.altKey||121!==l.keyCode||(a.cancel(l),g(k,l))})},getInfo:function(){return{longname:"Contextmenu",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/contextmenu",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_getMenu:function(e){var i,k,g=this,d=g._menu,j=e.selection,f=j.isCollapsed(),h=j.getNode()||e.getBody();return d&&(d.removeAll(),d.destroy()),k=b.getPos(e.getContentAreaContainer()),d=e.controlManager.createDropMenu("contextmenu",{offset_x:k.x+e.getParam("contextmenu_offset_x",0),offset_y:k.y+e.getParam("contextmenu_offset_y",0),constrain:1,keyboard_focus:!0}),g._menu=d,d.add({title:"advanced.cut_desc",icon:"cut",cmd:"Cut"}).setDisabled(f),d.add({title:"advanced.copy_desc",icon:"copy",cmd:"Copy"}).setDisabled(f),d.add({title:"advanced.paste_desc",icon:"paste",cmd:"Paste"}),("A"!=h.nodeName||e.dom.getAttrib(h,"name"))&&f||(d.addSeparator(),d.add({title:"advanced.link_desc",icon:"link",cmd:e.plugins.advlink?"mceAdvLink":"mceLink",ui:!0}),d.add({title:"advanced.unlink_desc",icon:"unlink",cmd:"UnLink"})),d.addSeparator(),d.add({title:"advanced.image_desc",icon:"image",cmd:e.plugins.advimage?"mceAdvImage":"mceImage",ui:!0}),d.addSeparator(),i=d.addMenu({title:"contextmenu.align"}),i.add({title:"contextmenu.left",icon:"justifyleft",cmd:"JustifyLeft"}),i.add({title:"contextmenu.center",icon:"justifycenter",cmd:"JustifyCenter"}),i.add({title:"contextmenu.right",icon:"justifyright",cmd:"JustifyRight"}),i.add({title:"contextmenu.full",icon:"justifyfull",cmd:"JustifyFull"}),g.onContextMenu.dispatch(g,d,h,f),d}}),tinymce.PluginManager.add("contextmenu",tinymce.plugins.ContextMenu)}();