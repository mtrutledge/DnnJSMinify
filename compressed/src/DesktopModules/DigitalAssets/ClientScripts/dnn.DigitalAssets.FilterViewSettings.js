"undefined"!=typeof window.dnn&&null!==window.dnn||(window.dnn={}),dnn.DigitalAssetsFilterViewSettingsController=function(serviceSettings,serviceControls){var controls=serviceControls,initFilterOptionsRadioInput=function(){$("input[id^="+controls.FilterOptionGroupID+"]:radio").change(function(){checkFilterOption($(this).val())}),checkFilterOption($("input[id^="+controls.FilterOptionGroupID+"][checked=checked]:radio").val())},checkFilterOption=function(checkValue){"FilterByFolder"==checkValue?$("#FilterByFolderOptions").show():$("#FilterByFolderOptions").hide()},ValidateFolderIsSelected=function(sender,args){return"FilterByFolder"==$("input[id^="+controls.FilterOptionGroupID+"][checked=checked]:radio").val()&&null==dnn[controls.FolderDropDownList[0].id].selectedItem()?void(args.IsValid=!1):void(args.IsValid=!0)};return{initFilterOptionsRadioInput:initFilterOptionsRadioInput,ValidateFolderIsSelected:ValidateFolderIsSelected}};