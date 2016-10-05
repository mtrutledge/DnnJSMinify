!function($){$.fn.mentionsInput=function(options){if(0==this.length)return this;options=$.extend({},$.fn.mentionsInput.defaultOptions,options);var serviceFramework=options.servicesFramework,getBaseServicePath=function(){return serviceFramework.getServiceRoot("Journal")+"Services/"};return this.each(function(){var $this=$(this);$this.data("mentions",[]);var getPosition=function(){var element=$this.get(0);if("selectionStart"in element)return element.selectionStart;if(document.selection){element.focus();var sel=document.selection.createRange(),selLen=document.selection.createRange().text.length;return sel.moveStart("character",-element.value.length),sel.text.length-selLen}return-1},getContentByCursor=function(){var position=getPosition();if(position>0){if($this.val().length>position)for(var i=position;i<$this.val().length;i++){if(/\s/.test($this.val()[i])){position=i;break}i==$this.val().length-1&&(position=i+1)}var content=$this.val().substr(0,position),result=new RegExp(options.identityChar+"([\\S]+?)$").exec(content);if(result)return result[1]}return null},addMention=function(item){var mentions=$this.data("mentions");itemExists(item)||mentions.push(item)},itemExists=function(item){for(var mentions=$this.data("mentions"),exists=!1,i=0;i<mentions.length;i++)if(mentions[i].displayName==item.displayName){exists=!0;break}return exists},rebuildMentions=function(){for(var mentions=$this.data("mentions"),content=$this.val(),i=mentions.length-1;i>=0;i--)content.toLowerCase().indexOf(options.identityChar+mentions[i].displayName.toLowerCase())==-1&&mentions.splice(i,1)},filter=function(data){for(var i=data.length-1;i>=0;i--)itemExists(data[i])&&data.splice(i,1);return data};$this.bind("click",function(){$this.autocomplete("search")}).bind("keydown",function(event){var keyCode=$.ui.keyCode;if(event.keyCode==keyCode.ENTER){var ac=$this.data("ui-autocomplete");if($this.attr("menuOpen")&&!ac.menu.active)return!1}}).bind("keyup",function(event){var keyCode=$.ui.keyCode;switch(event.keyCode){case keyCode.PAGE_UP:case keyCode.PAGE_DOWN:case keyCode.UP:case keyCode.DOWN:case keyCode.TAB:case keyCode.ENTER:return;default:$this.autocomplete("search")}}).bind("input change",function(e){rebuildMentions()}).autocomplete({autoFocus:!0,source:function(request,response){var content=getContentByCursor();content&&content.length>=options.minLength&&$.ajax({type:"GET",cache:!1,url:getBaseServicePath()+"GetSuggestions",beforeSend:serviceFramework.setModuleHeaders,data:{keyword:content}}).done(function(data){response(filter(data))}).fail(function(){response({})})},minLength:options.minLength,select:function(event,ui){var key=options.identityChar+ui.item.key;return $this.val($this.val().replace(new RegExp(key+" |"+key+"$","g"),options.identityChar+ui.item.displayName+" ")),addMention(ui.item),!1},search:function(event,ui){var content=getContentByCursor();if(!content||content.length<options.minLength)return $this.autocomplete("close"),!1},focus:function(event,ui){event.preventDefault()},close:function(event,ui){$this.attr("menuOpen",!1)}}),$this.data("ui-autocomplete")._renderItem=function(ul,item){return $("<li></li>").data("ui-autocomplete-item",item).append('<a><img src="'+item.avatar+'" /><span class="dn">'+item.displayName+"<span></a>").appendTo(ul)},$this.data("ui-autocomplete")._renderMenu=function(ul,items){var that=this;$.each(items,function(index,item){that._renderItemData(ul,item)}),$this.attr("menuOpen",!0)}})},$.fn.mentionsInput.defaultOptions={identityChar:"@",minLength:1}}(window.jQuery);