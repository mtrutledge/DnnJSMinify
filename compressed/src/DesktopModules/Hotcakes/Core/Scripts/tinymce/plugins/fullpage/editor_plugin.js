!function(){var b=tinymce.each,a=tinymce.html.Node;tinymce.create("tinymce.plugins.FullPagePlugin",{init:function(c,d){var e=this;e.editor=c,c.addCommand("mceFullPageProperties",function(){c.windowManager.open({file:d+"/fullpage.htm",width:430+parseInt(c.getLang("fullpage.delta_width",0)),height:495+parseInt(c.getLang("fullpage.delta_height",0)),inline:1},{plugin_url:d,data:e._htmlToData()})}),c.addButton("fullpage",{title:"fullpage.desc",cmd:"mceFullPageProperties"}),c.onBeforeSetContent.add(e._setContent,e),c.onGetContent.add(e._getContent,e)},getInfo:function(){return{longname:"Fullpage",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/fullpage",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_htmlToData:function(){function d(l,j){var k=l.attr(j);return k||""}var i,g,f=this._parseHeader(),h={},e=this.editor;return h.fontface=e.getParam("fullpage_default_fontface",""),h.fontsize=e.getParam("fullpage_default_fontsize",""),i=f.firstChild,7==i.type&&(h.xml_pi=!0,g=/encoding="([^"]+)"/.exec(i.value),g&&(h.docencoding=g[1])),i=f.getAll("#doctype")[0],i&&(h.doctype="<!DOCTYPE"+i.value+">"),i=f.getAll("title")[0],i&&i.firstChild&&(h.metatitle=i.firstChild.value),b(f.getAll("meta"),function(m){var l,k=m.attr("name"),j=m.attr("http-equiv");k?h["meta"+k.toLowerCase()]=m.attr("content"):"Content-Type"==j&&(l=/charset\s*=\s*(.*)\s*/gi.exec(m.attr("content")),l&&(h.docencoding=l[1]))}),i=f.getAll("html")[0],i&&(h.langcode=d(i,"lang")||d(i,"xml:lang")),i=f.getAll("link")[0],i&&"stylesheet"==i.attr("rel")&&(h.stylesheet=i.attr("href")),i=f.getAll("body")[0],i&&(h.langdir=d(i,"dir"),h.style=d(i,"style"),h.visited_color=d(i,"vlink"),h.link_color=d(i,"link"),h.active_color=d(i,"alink")),h},_dataToHtml:function(g){function c(n,l,m){n.attr(l,m?m:void 0)}function i(l){d.firstChild?d.insert(l,d.firstChild):d.append(l)}var f,d,h,j,k,e=this.editor.dom;f=this._parseHeader(),d=f.getAll("head")[0],d||(j=f.getAll("html")[0],d=new a("head",1),j.firstChild?j.insert(d,j.firstChild,!0):j.append(d)),j=f.firstChild,g.xml_pi?(k='version="1.0"',g.docencoding&&(k+=' encoding="'+g.docencoding+'"'),7!=j.type&&(j=new a("xml",7),f.insert(j,f.firstChild,!0)),j.value=k):j&&7==j.type&&j.remove(),j=f.getAll("#doctype")[0],g.doctype?(j||(j=new a("#doctype",10),g.xml_pi?f.insert(j,f.firstChild):i(j)),j.value=g.doctype.substring(9,g.doctype.length-1)):j&&j.remove(),j=f.getAll("title")[0],g.metatitle&&(j||(j=new a("title",1),j.append(new a("#text",3)).value=g.metatitle,i(j))),g.docencoding&&(j=null,b(f.getAll("meta"),function(l){"Content-Type"==l.attr("http-equiv")&&(j=l)}),j||(j=new a("meta",1),j.attr("http-equiv","Content-Type"),j.shortEnded=!0,i(j)),j.attr("content","text/html; charset="+g.docencoding)),b("keywords,description,author,copyright,robots".split(","),function(m){var n,p,l=f.getAll("meta"),o=g["meta"+m];for(n=0;n<l.length;n++)if(p=l[n],p.attr("name")==m)return void(o?p.attr("content",o):p.remove());o&&(j=new a("meta",1),j.attr("name",m),j.attr("content",o),j.shortEnded=!0,i(j))}),j=f.getAll("link")[0],j&&"stylesheet"==j.attr("rel")?g.stylesheet?j.attr("href",g.stylesheet):j.remove():g.stylesheet&&(j=new a("link",1),j.attr({rel:"stylesheet",text:"text/css",href:g.stylesheet}),j.shortEnded=!0,i(j)),j=f.getAll("body")[0],j&&(c(j,"dir",g.langdir),c(j,"style",g.style),c(j,"vlink",g.visited_color),c(j,"link",g.link_color),c(j,"alink",g.active_color),e.setAttribs(this.editor.getBody(),{style:g.style,dir:g.dir,vLink:g.visited_color,link:g.link_color,aLink:g.active_color})),j=f.getAll("html")[0],j&&(c(j,"lang",g.langcode),c(j,"xml:lang",g.langcode)),h=new tinymce.html.Serializer({validate:!1,indent:!0,apply_source_formatting:!0,indent_before:"head,html,body,meta,title,script,link,style",indent_after:"head,html,body,meta,title,script,link,style"}).serialize(f),this.head=h.substring(0,h.indexOf("</body>"))},_parseHeader:function(){return new tinymce.html.DomParser({validate:!1,root_name:"#document"}).parse(this.head)},_setContent:function(g,d){function k(n){return n.replace(/<\/?[A-Z]+/g,function(o){return o.toLowerCase()})}var i,c,f,j,m=this,h=d.content,l="",e=m.editor.dom;"raw"==d.format&&m.head||d.source_view&&g.getParam("fullpage_hide_in_source_view")||(h=h.replace(/<(\/?)BODY/gi,"<$1body"),i=h.indexOf("<body"),i!=-1?(i=h.indexOf(">",i),m.head=k(h.substring(0,i+1)),c=h.indexOf("</body",i),c==-1&&(c=h.length),d.content=h.substring(i+1,c),m.foot=k(h.substring(c))):(m.head=this._getDefaultHeader(),m.foot="\n</body>\n</html>"),f=m._parseHeader(),b(f.getAll("style"),function(n){n.firstChild&&(l+=n.firstChild.value)}),j=f.getAll("body")[0],j&&e.setAttribs(m.editor.getBody(),{style:j.attr("style")||"",dir:j.attr("dir")||"",vLink:j.attr("vlink")||"",link:j.attr("link")||"",aLink:j.attr("alink")||""}),e.remove("fullpage_styles"),l&&(e.add(m.editor.getDoc().getElementsByTagName("head")[0],"style",{id:"fullpage_styles"},l),j=e.get("fullpage_styles"),j.styleSheet&&(j.styleSheet.cssText=l)))},_getDefaultHeader:function(){var e,f="",c=this.editor,d="";return c.getParam("fullpage_default_xml_pi")&&(f+='<?xml version="1.0" encoding="'+c.getParam("fullpage_default_encoding","ISO-8859-1")+'" ?>\n'),f+=c.getParam("fullpage_default_doctype",'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'),f+="\n<html>\n<head>\n",(e=c.getParam("fullpage_default_title"))&&(f+="<title>"+e+"</title>\n"),(e=c.getParam("fullpage_default_encoding"))&&(f+='<meta http-equiv="Content-Type" content="text/html; charset='+e+'" />\n'),(e=c.getParam("fullpage_default_font_family"))&&(d+="font-family: "+e+";"),(e=c.getParam("fullpage_default_font_size"))&&(d+="font-size: "+e+";"),(e=c.getParam("fullpage_default_text_color"))&&(d+="color: "+e+";"),f+="</head>\n<body"+(d?' style="'+d+'"':"")+">\n"},_getContent:function(d,e){var c=this;e.source_view&&d.getParam("fullpage_hide_in_source_view")||(e.content=tinymce.trim(c.head)+"\n"+tinymce.trim(e.content)+"\n"+tinymce.trim(c.foot))}}),tinymce.PluginManager.add("fullpage",tinymce.plugins.FullPagePlugin)}();