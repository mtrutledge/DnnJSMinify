if(!RedactorPlugins)var RedactorPlugins={};RedactorPlugins.fullscreen={init:function(){this.fullscreen=!1,this.buttonAdd("fullscreen","Fullscreen",$.proxy(this.toggleFullscreen,this)),this.opts.fullscreen&&this.toggleFullscreen()},enableFullScreen:function(){var html;this.buttonChangeIcon("fullscreen","normalscreen"),this.buttonActive("fullscreen"),this.fullscreen=!0,this.opts.toolbarExternal&&(this.toolcss={},this.boxcss={},this.toolcss.width=this.$toolbar.css("width"),this.toolcss.top=this.$toolbar.css("top"),this.toolcss.position=this.$toolbar.css("position"),this.boxcss.top=this.$box.css("top")),this.fsheight=this.$editor.height(),this.opts.iframe&&(this.fsheight=this.$frame.height()),this.opts.maxHeight&&this.$editor.css("max-height",""),this.opts.iframe&&(html=this.get()),this.$fullscreenPlaceholder||(this.$fullscreenPlaceholder=$("<div/>")),this.$fullscreenPlaceholder.insertAfter(this.$box),this.$box.appendTo(document.body),this.$box.addClass("redactor_box_fullscreen"),$("body, html").css("overflow","hidden"),this.opts.iframe&&this.fullscreenIframe(html),this.fullScreenResize(),$(window).resize($.proxy(this.fullScreenResize,this)),$(document).scrollTop(0,0),this.focus(),this.observeStart()},disableFullScreen:function(){this.buttonRemoveIcon("fullscreen","normalscreen"),this.buttonInactive("fullscreen"),this.fullscreen=!1,$(window).off("resize",$.proxy(this.fullScreenResize,this)),$("body, html").css("overflow",""),this.$box.insertBefore(this.$fullscreenPlaceholder),this.$fullscreenPlaceholder.remove(),this.$box.removeClass("redactor_box_fullscreen").css({width:"auto",height:"auto"}),this.opts.iframe&&(html=this.$editor.html()),this.opts.iframe?this.fullscreenIframe(html):this.sync();var height=this.fsheight;this.opts.autoresize&&(height="auto"),this.opts.maxHeight&&this.$editor.css("max-height",this.opts.maxHeight),this.opts.toolbarExternal&&(this.$box.css("top",this.boxcss.top),this.$toolbar.css({width:this.toolcss.width,top:this.toolcss.top,position:this.toolcss.position})),this.opts.iframe?this.$frame.css("height",height):this.$editor.css("height",height),this.$editor.css("height",height),this.focus(),this.observeStart()},toggleFullscreen:function(){this.fullscreen?this.disableFullScreen():this.enableFullScreen()},fullscreenIframe:function(html){this.$editor=this.$frame.contents().find("body"),this.$editor.attr({contenteditable:!0,dir:this.opts.direction}),this.$editor[0]&&(this.document=this.$editor[0].ownerDocument,this.window=this.document.defaultView||window),this.iframeAddCss(),this.opts.fullpage?this.setFullpageOnInit(html):this.set(html),this.opts.wym&&this.$editor.addClass("redactor_editor_wym")},fullScreenResize:function(){var controlBar,controlBarHeight,redactorToolbar,redactorToolbarStyle,editBar,editBarHeight;if(redactorToolbar=$(".dnnEditState .redactor_box.redactor_box_fullscreen > ul.redactor_toolbar"),controlBar=$("#ControlBar"),controlBarHeight=0===controlBar.length?0:controlBar.height(),editBar=$("#edit-bar"),editBarHeight=0===editBar.length?0:editBar.height(),!this.fullscreen)return!1;var toolbarHeight=this.$toolbar.height(),pad=this.$editor.css("padding-top").replace("px",""),height=$(window).height()-toolbarHeight-editBarHeight,$personaBar=$("#personaBar-iframe");this.$box.width($(window).width()-$personaBar.width()-2).height(height+toolbarHeight),$personaBar.length?$("body").removeClass("personabar-wrapper"):$("body").addClass("personabar-disabled"),this.opts.toolbarExternal&&(this.$toolbar.css({top:"0px",position:"absolute",width:"100%"}),this.$box.css("top",toolbarHeight+"px")),this.opts.iframe?setTimeout($.proxy(function(){this.$frame.height(height)},this),1):this.$editor.height(height-2*pad),this.$editor.height(height),controlBarHeight>0&&(redactorToolbar.css("margin-top",0),redactorToolbarStyle=redactorToolbar.attr("style"),redactorToolbarStyle=redactorToolbarStyle.replace(/margin-top: 0px;/,"margin-top: "+controlBarHeight+"px !important;"),redactorToolbar.attr("style",redactorToolbarStyle))}};