!function($){"undefined"!=typeof dnn&&null!==dnn||(dnn={}),dnn.permissionGridManager||(dnn.permissionGridManager=function(sf,scopeId){var inputBox=$("#"+scopeId+"_txtUser"),userIdsField=$("#"+scopeId+"_hiddenUserIds"),init=function(){function updateHiddenField(){var Id=roleSelector.val();roleId.val(Id)}var serviceUrl=sf.getServiceRoot()+"ItemListService/SearchUser";inputBox.tokenInput(serviceUrl,{theme:"facebook",resultsFormatter:function(item){return"<li class='user'><img src='"+item.iconfile+"' title='"+item.name+"' style='width:25px;height:25px;' /><span>"+item.name+"</span></li>"},minChars:2,preventDuplicates:!0,hintText:"",onAdd:function(item){if(""===userIdsField.val())userIdsField.val(item.id);else{var array=userIdsField.val().split(","),index=$.inArray(item.id,array);index==-1&&userIdsField.val(userIdsField.val()+","+item.id)}},onDelete:function(item){var array=userIdsField.val().split(","),id=item.id,index=$.inArray(id,array);index!==-1&&(array.splice(index,1),userIdsField.val(array.join(",")))},onError:function(xhr,status){}});var roleId=$("#"+scopeId+"_roleField"),roleSelector=$("#"+scopeId+"_cboSelectRole");roleSelector.change(function(){updateHiddenField()}),updateHiddenField()};return $(document).ready(function(){init()}),this})}(jQuery);