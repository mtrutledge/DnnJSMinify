$(function(){function addXYImageParams(elements,submitEl,event){var nameX="x",nameY="y",name=submitEl.attr("name");name&&(nameX=[name,".",nameX].join(""),nameY=[name,".",nameY].join(""));var valueX=event.offsetX,valueY=event.offsetY;valueX=void 0==valueX||""==valueX?0:valueX,valueY=void 0==valueY||""==valueY?0:valueY,elements.push({name:nameX,value:valueX}),elements.push({name:nameY,value:valueY})}hcc.config.dialogClass="dnnFormPopup hc-popup-dialog";var forms=$('div[data-type="form"]');forms.on("keydown","input:text",function(event){var form=$(this).closest('div[data-type="form"]');if(13==event.which){var inputElement=form.find("input:submit:not([data-nosubmit]), input:image:not([data-nosubmit])").first();inputElement&&inputElement.click(),event.preventDefault()}}),forms.on("click","input:submit:not([data-nosubmit]), input:image:not([data-nosubmit])",function(event){var form=$(this).closest('div[data-type="form"]'),submitEl=$(event.target),confirmMessage=submitEl.data("confirm");if(confirmMessage&&!confirm(confirmMessage))return event.stopPropagation(),void event.preventDefault();var validator=$.data(form[0],"validator");if(validator&&!validator.form())return event.stopPropagation(),void event.preventDefault();var action=form.data("action"),method=form.data("method"),moduleid=form.data("moduleid"),skipxy=form.data("skipxy"),elements=form.find("select, input, textarea").serializeArray();moduleid&&"get"!=method&&elements.push({name:"moduleid",value:moduleid}),submitEl.attr("name")&&elements.push({name:submitEl.attr("name"),value:submitEl.val()}),"image"!=submitEl.attr("type")||skipxy||addXYImageParams(elements,submitEl,event);var postdata=$.param(elements),hcMvcView=$(this).closest(".hcMvcView");hcMvcView.ajaxLoader("start"),"get"==method?setTimeout(function(){window.location=action+(action.indexOf("?")>-1?"&":"?")+postdata},0):$.ajax({type:method,url:action,data:postdata,beforeSend:function(jqXHR,settings){jqXHR.setRequestHeader("CustomRedirect","1")},success:function(data,textStatus,jqXHR){document.open(),document.write(data),document.close()},error:function(jqXHR,textStatus,errorThrown){333!=jqXHR.status&&console&&console.log&&console.log(errorThrown)},complete:function(jqXHR,textStatus){},statusCode:{333:function(jqXHR,textStatus,errorThrown){var location=jqXHR.getResponseHeader("CustomLocation");window.location=location}}}),event.preventDefault()}),$(".hc-dialog").click(function(){var myModal=$(this).attr("href");return $(myModal).hcDialog(),!1}),$(".hc-popup").click(function(){var myTitle=$(this).attr("title"),modalWidth=$(this).data("width"),modalHeight=$(this).data("height"),modalMinHeight=$(this).data("min-height"),modalMinWidth=$(this).data("min-width"),myModal=$(this).attr("href");return $(myModal).dialog({width:modalWidth,maxHeight:modalHeight,minHeight:modalMinHeight,minWidth:modalMinWidth,title:myTitle,modal:!0,closeOnEscape:!0,position:"center",dialogClass:"dnnFormPopup hc-popup-dialog"}),!1}),hcc.autoHeight(".hc-record-grid .hc-recimage"),$.validator&&$.validator.setDefaults({ignore:".ignore-val, :hidden"}),$.fn.hcFormMessage=function(status,message){var $this=$(this).html(message).addClass("dnnFormMessage");"OK"==status?$this.removeClass("dnnFormValidationSummary"):$this.addClass("dnnFormValidationSummary"),$("body").scrollTo($this)}});