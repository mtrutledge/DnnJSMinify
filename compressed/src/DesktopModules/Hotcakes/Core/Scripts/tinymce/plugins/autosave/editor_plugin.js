!function(e){var f,d,c="autosave",g="restoredraft",b=!0,a=e.util.Dispatcher;e.create("tinymce.plugins.AutoSave",{init:function(i,j){function k(n){var m={s:1e3,m:6e4};return n=/^(\d+)([ms]?)$/.exec(""+n),(n[2]?m[n[2]]:1)*parseInt(n)}var h=this,l=i.settings;h.editor=i,e.each({ask_before_unload:b,interval:"30s",retention:"20m",minlength:50},function(n,m){m=c+"_"+m,l[m]===f&&(l[m]=n)}),l.autosave_interval=k(l.autosave_interval),l.autosave_retention=k(l.autosave_retention),i.addButton(g,{title:c+".restore_content",onclick:function(){i.getContent({draft:!0}).replace(/\s|&nbsp;|<\/?p[^>]*>|<br[^>]*>/gi,"").length>0?i.windowManager.confirm(c+".warning_message",function(m){m&&h.restoreDraft()}):h.restoreDraft()}}),i.onNodeChange.add(function(){var m=i.controlManager;m.get(g)&&m.setDisabled(g,!h.hasDraft())}),i.onInit.add(function(){i.controlManager.get(g)&&(h.setupStorage(i),setInterval(function(){i.removed||(h.storeDraft(),i.nodeChanged())},l.autosave_interval))}),h.onStoreDraft=new a(h),h.onRestoreDraft=new a(h),h.onRemoveDraft=new a(h),d||(window.onbeforeunload=e.plugins.AutoSave._beforeUnloadHandler,d=b)},getInfo:function(){return{longname:"Auto save",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/autosave",version:e.majorVersion+"."+e.minorVersion}},getExpDate:function(){return new Date((new Date).getTime()+this.editor.settings.autosave_retention).toUTCString()},setupStorage:function(i){var h=this,k=c+"_test",j="OK";h.key=c+i.id,e.each([function(){if(localStorage&&(localStorage.setItem(k,j),localStorage.getItem(k)===j))return localStorage.removeItem(k),localStorage},function(){if(sessionStorage&&(sessionStorage.setItem(k,j),sessionStorage.getItem(k)===j))return sessionStorage.removeItem(k),sessionStorage},function(){if(e.isIE)return i.getElement().style.behavior="url('#default#userData')",{autoExpires:b,setItem:function(l,n){var m=i.getElement();m.setAttribute(l,n),m.expires=h.getExpDate();try{m.save("TinyMCE")}catch(o){}},getItem:function(l){var m=i.getElement();try{return m.load("TinyMCE"),m.getAttribute(l)}catch(n){return null}},removeItem:function(l){i.getElement().removeAttribute(l)}}}],function(l){try{if(h.storage=l(),h.storage)return!1}catch(m){}})},storeDraft:function(){var h,k,i=this,l=i.storage,j=i.editor;if(l){if(!l.getItem(i.key)&&!j.isDirty())return;k=j.getContent({draft:!0}),k.length>j.settings.autosave_minlength&&(h=i.getExpDate(),i.storage.autoExpires||i.storage.setItem(i.key+"_expires",h),i.storage.setItem(i.key,k),i.onStoreDraft.dispatch(i,{expires:h,content:k}))}},restoreDraft:function(){var i,h=this,j=h.storage;j&&(i=j.getItem(h.key),i&&(h.editor.setContent(i),h.onRestoreDraft.dispatch(h,{content:i})))},hasDraft:function(){var i,j,h=this,k=h.storage;if(k&&(j=!!k.getItem(h.key))){if(h.storage.autoExpires)return b;if(i=new Date(k.getItem(h.key+"_expires")),(new Date).getTime()<i.getTime())return b;h.removeDraft()}return!1},removeDraft:function(){var j,h=this,k=h.storage,i=h.key;k&&(j=k.getItem(i),k.removeItem(i),k.removeItem(i+"_expires"),j&&h.onRemoveDraft.dispatch(h,{content:j}))},static:{_beforeUnloadHandler:function(h){var i;return e.each(tinyMCE.editors,function(j){j.plugins.autosave&&j.plugins.autosave.storeDraft(),j.getParam("fullscreen_is_enabled")||!i&&j.isDirty()&&j.getParam("autosave_ask_before_unload")&&(i=j.getLang("autosave.unload_msg"))}),i}}}),e.PluginManager.add("autosave",e.plugins.AutoSave)}(tinymce);