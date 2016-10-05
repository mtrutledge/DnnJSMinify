"undefined"!=typeof dnn&&null!==dnn||(dnn={}),"undefined"!=typeof dnn.controls&&null!==dnn.controls||(dnn.controls={}),function($){var permissionGrid=dnn.controls.PermissionGrid=function(parent,data,options){return this.options=options,this.data=data,this.parent=parent,this.init(),this};dnn.controls.PermissionGrid.prototype={constructor:permissionGrid,init:function(){this.options=$.extend({},this.options,dnn.controls.PermissionGrid.defaultOptions),this._buildGrid(),this._buildRoleSelector(),this._buildUserSelector(),window.require(["css!../../css/permissionGrid.css","css!../../../../Resources/Shared/Components/Tokeninput/Themes/token-input-facebook.css"])},getPermissions:function(){var permissions={rolePermissions:[],userPermissions:[]};return this._getRolePermissions(permissions.rolePermissions),this._getUserPermissions(permissions.userPermissions),permissions},getLayout:function(){return this._gridContainer},_buildGrid:function(){var gridContainer=this._gridContainer=$('<div class="dnnGrid dnnPermissionsGrid dnnForm"></div>'),rolesTable=$('<table class="dnnPermissionsGrid rolesGrid" cellspacing="0" cellpadding="2" style="border-collapse:collapse;"><tbody></tbody></table>');this._buildGridHeader(rolesTable.find("tbody"),this.data.permissionDefinitions,"roles");for(var i=0;i<this.data.rolePermissions.length;i++){var rolePermission=this.data.rolePermissions[i];this._buildGridRow(rolesTable.find("tbody"),rolePermission,"roles")}rolesTable.appendTo(gridContainer);var usersTable=$('<table class="dnnPermissionsGrid usersGrid" cellspacing="0" cellpadding="2" style="border-collapse:collapse;"><tbody></tbody></table>');this._buildGridHeader(usersTable.find("tbody"),this.data.permissionDefinitions,"users");for(var j=0;j<this.data.userPermissions.length;j++){var userPermission=this.data.userPermissions[j];this._buildGridRow(usersTable.find("tbody"),userPermission,"users")}return usersTable.appendTo(gridContainer),0===this.data.userPermissions.length&&usersTable.hide(),this._handlerEvents(),this._rolesTable=this._gridContainer.find("table.rolesGrid"),this._usersTable=this._gridContainer.find("table.usersGrid"),gridContainer},_buildGridHeader:function(table,definitions,type){var header=$('<tr class="dnnGridHeader"></tr>');header.append('<td class="permissionHeader">'+this._localizedString(type,"Type")+"</td>");for(var i=0;i<definitions.length;i++){var def=definitions[i],col=$("<td>"+this._localizedString(def.permissionName)+"</td>").appendTo(header);col.addClass("p-"+def.permissionName.replace(" ","").toLowerCase()),col.data("permissionId",def.permissionId),def.fullControl&&col.addClass("p-fullControl"),def.view&&col.addClass("p-view")}$('<td class="permissionGridActions">'+this._localizedString("Actions")+"</td>").appendTo(header).prev().addClass("last"),table.append(header)},_buildGridRow:function(table,data,type){var header=table.find("> tr:eq(0)"),cols=header.find(">td:not(:first-child)"),row=$('<tr class="dnnItem '+(table.find("> tr").length%2===0?"dnnGridAltItem":"dnnGridItem")+'"></tr>');row.data("key","users"==type?data.userId:data.roleId),row.append('<td class="permissionHeader">'+("users"==type?data.displayName:data.roleName)+"</td>");for(var i=0;i<cols.length;i++){var headerCol=cols.eq(i),permissionId=headerCol.data("permissionId");if(permissionId){var col=$("<td><span></span></td>").appendTo(row);col.data("permissionId",permissionId),col.data("header",headerCol),col.addClass(headerCol.attr("class"));var permission=this._findPermission(data,permissionId);permission||data.locked?this._setPermission(col,permission?permission.allowAccess?1:2:0,data.locked):this._setPermission(col,0)}else{var actionCol=$('<td class="permissionGridActions"></td>').appendTo(row);data.default||actionCol.append('<a href="#" class="btn-delete"></a>'),actionCol.prev().addClass("last")}}table.append(row),table.parent().is(":visible")||table.parent().show(),this._gridContainer.trigger("tableUpdated")},_buildRoleSelector:function(rolesData){if(!(this._gridContainer.find(".roles-container").length>0)){if(!rolesData){var handler=this;return void this._getService().get("GetRoles",{},function(data){handler._buildRoleSelector(data)})}var rolesContainer=$('<div class="roles-container dnnFormItem"></div>');rolesContainer.data("roles-data",rolesData),rolesContainer.html('<div class="leftGroup"><label for="roleGroupSelector">'+this._localizedString("Filter By Group")+'</label><select id="roleGroupSelector"></select></div><div class="rightGroup"><label for="roleSelector">'+this._localizedString("Select Role")+'</label><select id="roleSelector"></select><a class="simple-button btn-addrole" href="#">'+this._localizedString("Add")+"</a></div>"),rolesContainer.prependTo(this._gridContainer);for(var groupSelector=rolesContainer.find("#roleGroupSelector")[0],i=0;i<rolesData.Groups.length;i++){var group=rolesData.Groups[i],option=new Option(this._localizedString(group.Name),group.GroupId);option.selected=group.Selected,groupSelector.options.add(option)}this._roleGroupChanged()}},_buildUserSelector:function(){var handler=this,userContainer=$('<div class="users-container dnnFormItem"></div>');userContainer.html('<label for="permissionGrid_txtUser">'+this._localizedString("Add User")+'</label><input name="permissionGrid_txtUser" type="text" id="permissionGrid_txtUser"><input type="hidden" name="permissionGrid_hiddenUserIds" id="permissionGrid_hiddenUserIds"><a class="simple-button btn-adduser" href="#">'+this._localizedString("Add")+"</a>"),userContainer.appendTo(this._gridContainer),setTimeout(function(){var service=handler._getService();service.moduleRoot="InternalServices",new dnn.permissionGridManager(service,"permissionGrid")},0)},_handlerEvents:function(){this._gridContainer.on("permissionChanged","td",$.proxy(this._permissionChanged,this)),this._gridContainer.on("click","td span",$.proxy(this._changePermissionState,this)),this._gridContainer.on("click","td.permissionGridActions a.btn-delete",$.proxy(this._deletePermissionRow,this)),this._gridContainer.on("change","#roleGroupSelector",$.proxy(this._roleGroupChanged,this)),this._gridContainer.on("click",".roles-container a.btn-addrole",$.proxy(this._addRoleToGrid,this)),this._gridContainer.on("click",".users-container a.btn-adduser",$.proxy(this._addUserToGrid,this))},_changePermissionState:function(e){var element=$(e.target),currentState=element.data("permission-code");element.parent().hasClass("locked")||(currentState++,currentState>2&&(currentState=0),this._setPermission(element.parent(),currentState),element.parent().trigger("permissionChanged"))},_permissionChanged:function(e){var col=$(e.target),permissionId=col.data("permissionId"),header=col.data("header"),isFullControl=header.hasClass("p-fullControl"),isView=header.hasClass("p-view"),currentState=col.find("span").data("permission-code"),handler=this;if(isFullControl)col.parent().find("td").each(function(){var column=$(this);column.data("permissionId")&&column.data("permissionId")!=permissionId&&handler._setPermission(column,currentState)});else{if(isView){if(1!=currentState){var $notView=col.parent().find("td").not(".p-view").not(".p-navigate").not(".p-browse");$notView.each(function(){var column=$(this);column.data("permissionId")&&column.data("permissionId")!=permissionId&&handler._setPermission(column,currentState)})}}else if(1==currentState&&!col.hasClass("p-navigate")&&!col.hasClass("p-browse")){var $view=col.parent().find("td").filter(".p-view");$view.each(function(){var column=$(this);column.data("permissionId")&&column.data("permissionId")!=permissionId&&handler._setPermission(column,currentState)})}var $fullControl=col.parent().find("td.p-fullControl");if($fullControl.length>0){var $notFullControl=col.parent().find("td").not(".p-fullControl"),setFullControl=!0;$notFullControl.each(function(){var column=$(this);if(column.data("permissionId")&&column.find("span").data("permission-code")!=currentState)return void(setFullControl=!1)}),handler._setPermission($fullControl,setFullControl?currentState:0)}}"function"==typeof this.options.onPermissionChanged&&this.options.onPermissionChanged.call(this)},_deletePermissionRow:function(e){var row=$(e.target).parent().parent(),table=row.parent().parent();return row.remove(),1==table.find("tr").length&&table.hide(),this._gridContainer.trigger("tableUpdated"),"function"==typeof this.options.onPermissionChanged&&this.options.onPermissionChanged.call(this),this._roleGroupChanged(),!1},_roleGroupChanged:function(e){var rolesContainer=this._gridContainer.find(".roles-container"),roleGroupSelector=$("#roleGroupSelector"),roleSelector=$("#roleSelector"),rolesData=rolesContainer.data("roles-data"),groupId=roleGroupSelector.val();roleSelector.empty();for(var i=0;i<rolesData.Roles.length;i++){var role=rolesData.Roles[i];if((groupId==-2||role.GroupId==groupId)&&!this._roleExistsInGrid(role.RoleId)){var option=new Option(this._localizedString(role.Name),role.RoleId);roleSelector[0].options.add(option)}}},_roleExistsInGrid:function(roleId){var exist=!1;return this._rolesTable.find("tr").each(function(){$(this).data("key")==roleId&&(exist=!0)}),exist},_userExistsInGrid:function(userId){var exist=!1;return this._usersTable.find("tr").each(function(){$(this).data("key")==userId&&(exist=!0)}),exist},_addRoleToGrid:function(e){var roleSelector=$("#roleSelector"),roleId=roleSelector.val(),roleName=roleSelector.find("option:selected").text();return!!roleId&&(this._buildGridRow(this._rolesTable.find("tbody"),{roleId:roleId,roleName:roleName,permissions:[]},"roles"),"function"==typeof this.options.onPermissionChanged&&this.options.onPermissionChanged.call(this),this._roleGroupChanged(),!1)},_addUserToGrid:function(e){for(var tokenInput=$("#permissionGrid_txtUser").data("tokenInputObject"),selectedUsers=tokenInput.getTokens(),i=0;i<selectedUsers.length;i++){var user=selectedUsers[i];this._userExistsInGrid(user.id)||this._buildGridRow(this._usersTable.find("tbody"),{userId:user.id,displayName:user.name,permissions:[]},"users")}return tokenInput.clear(),"function"==typeof this.options.onPermissionChanged&&this.options.onPermissionChanged.call(this),!1},_findPermission:function(parent,permissionId){for(var i=0;i<parent.permissions.length;i++)if(parent.permissions[i].permissionId==permissionId)return parent.permissions[i];return null},_setPermission:function(permissionCol,state,locked){var permissionState=permissionGrid.permissionStats[state];locked&&(permissionState=permissionGrid.permissionStats[3],permissionCol.addClass("locked")),permissionCol.find("span").attr("class",permissionState.css).data("permission-code",state)},_getRolePermissions:function(data){this._rolesTable.find("tr:not(:first-child)").each(function(){var row=$(this),roleId=row.data("key");row.find("td:not(:first-child)").each(function(){var col=$(this),permissionId=col.data("permissionId");if(permissionId){var currentState=col.find("span").data("permission-code");if(1==currentState||2==currentState){for(var rolePermission=null,i=0;i<data.length;i++)if(data[i].roleId==roleId){rolePermission=data[i];break}rolePermission||(rolePermission={roleId:roleId,permissions:[]},data.push(rolePermission)),rolePermission.permissions.push({permissionId:permissionId,allowAccess:1==currentState})}}})})},_getUserPermissions:function(data){var table=this._gridContainer.find("table.usersGrid");table.find("tr:not(:first-child)").each(function(){var row=$(this),userId=row.data("key");row.find("td:not(:first-child)").each(function(){var col=$(this),permissionId=col.data("permissionId");if(permissionId){var currentState=col.find("span").data("permission-code");if(1==currentState||2==currentState){for(var userPermission=null,i=0;i<data.length;i++)if(data[i].userId==userId){userPermission=data[i];break}userPermission||(userPermission={userId:userId,permissions:[]},data.push(userPermission)),userPermission.permissions.push({permissionId:permissionId,allowAccess:1==currentState})}}})})},_localizedString:function(name,prefix,suffix){var key="permissiongrid."+(prefix&&prefix.length>0?prefix+"-"+name:name)+(suffix&&suffix.length>0?"."+suffix:""),content=dnn.controls.PermissionGrid.resx[key];return content&&0!==content.length||(content=name),content},_getService:function(){return this.parent._getService()}},dnn.controls.PermissionGrid.defaultOptions={},permissionGrid.permissionStats=[{code:0,css:"permission-unchecked",text:""},{code:1,css:"permission-granted",text:""},{code:2,css:"permission-denied",text:""},{code:3,css:"permission-locked",text:""}]}(jQuery);