!function(){tinymce.create("tinymce.plugins.AutolinkPlugin",{init:function(a,b){var c=this;a.onKeyDown.addToTop(function(d,f){if(13==f.keyCode)return c.handleEnter(d)}),tinyMCE.isIE||(a.onKeyPress.add(function(d,f){if(41==f.which)return c.handleEclipse(d)}),a.onKeyUp.add(function(d,f){if(32==f.keyCode)return c.handleSpacebar(d)}))},handleEclipse:function(a){this.parseCurrentLine(a,-1,"(",!0)},handleSpacebar:function(a){this.parseCurrentLine(a,0,"",!0)},handleEnter:function(a){this.parseCurrentLine(a,-1,"",!1)},parseCurrentLine:function(i,d,b,g){var a,f,c,n,k,m,h,e,j;if(a=i.selection.getRng(!0).cloneRange(),a.startOffset<5){if(e=a.endContainer.previousSibling,null==e){if(null==a.endContainer.firstChild||null==a.endContainer.firstChild.nextSibling)return;e=a.endContainer.firstChild.nextSibling}if(j=e.length,a.setStart(e,j),a.setEnd(e,j),a.endOffset<5)return;f=a.endOffset,n=e}else{if(n=a.endContainer,3!=n.nodeType&&n.firstChild){for(;3!=n.nodeType&&n.firstChild;)n=n.firstChild;3==n.nodeType&&(a.setStart(n,0),a.setEnd(n,n.nodeValue.length))}f=1==a.endOffset?2:a.endOffset-1-d}c=f;do a.setStart(n,f>=2?f-2:0),a.setEnd(n,f>=1?f-1:0),f-=1;while(" "!=a.toString()&&""!=a.toString()&&160!=a.toString().charCodeAt(0)&&f-2>=0&&a.toString()!=b);a.toString()==b||160==a.toString().charCodeAt(0)?(a.setStart(n,f),a.setEnd(n,c),f+=1):0==a.startOffset?(a.setStart(n,0),a.setEnd(n,c)):(a.setStart(n,f),a.setEnd(n,c));var m=a.toString();if("."==m.charAt(m.length-1)&&a.setEnd(n,c-1),m=a.toString(),h=m.match(/^(https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.|(?:mailto:)?[A-Z0-9._%+-]+@)(.+)$/i),h&&("www."==h[1]?h[1]="http://www.":/@$/.test(h[1])&&!/^mailto:/.test(h[1])&&(h[1]="mailto:"+h[1]),k=i.selection.getBookmark(),i.selection.setRng(a),tinyMCE.execCommand("createlink",!1,h[1]+h[2]),i.selection.moveToBookmark(k),i.nodeChanged(),tinyMCE.isWebKit)){i.selection.collapse(!1);var l=Math.min(n.length,c+1);a.setStart(n,l),a.setEnd(n,l),i.selection.setRng(a)}},getInfo:function(){return{longname:"Autolink",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/autolink",version:tinymce.majorVersion+"."+tinymce.minorVersion}}}),tinymce.PluginManager.add("autolink",tinymce.plugins.AutolinkPlugin)}();