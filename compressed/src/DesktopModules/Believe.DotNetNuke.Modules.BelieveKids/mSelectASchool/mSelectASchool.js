var Module_SelectASchool={ddlStateID:"",ddlSchoolID:"",xPos:0,yPos:0,set_CurrentScreenPosition:function(){xPos=window.scrollX,yPos=window.scrollY},set_ScreenPosition:function(){setTimeout(function(){document.body.scrollTop=xPos,document.body.scrollLeft=yPos},500)},get_StateValue:function(){return $find(Module_SelectASchool.ddlStateID).get_value()},isStateValue:function(){var stateValue=Module_SelectASchool.get_StateValue();return""!=stateValue&&"State"!=stateValue},enableSelectSchoolInput:function(){$("#"+ddlSchoolID).removeAttr("disabled")},onChange_SelectSchool_Input:function(){Module_SelectASchool.isStateValue()&&$.ajax({type:"POST",url:window.location.href+"/SetStateSession",contentType:"application/json; charset=utf-8",data:JSON.stringify({state:Module_SelectASchool.get_StateValue()}),dataType:"json",beforeSend:function(){},success:function(){Module_SelectASchool.enableSelectSchoolInput()},error:function(XMLHttpRequest,textStatus,errorThrown){}}).fail(function(){}).done(function(){return!1})}};$(document).ready(function(){$("#"+Module_SelectASchool.ddlStateID).change(function(){Module_SelectASchool.onChange_SelectSchool_Input()})});