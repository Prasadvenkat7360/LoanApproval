var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(typeof permission != "undefined"){
		$(".layout-main button").each(function() {
			var value = '#'+this.id;
			var value2 = '#'+this.id+'C';
			var value3 = '#'+this.id+'S';
			var val = $(value).text();
			val = val.trim();
			if( val.startsWith("search") || val.startsWith("Search")){
				if(permission.canSearch == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}  
			
			if(val.startsWith("Create") || val.startsWith("create")){
				if(permission.canAdd == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
			
			if( val.startsWith("export") || val.startsWith("Export")){
				if(permission.canExport == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
			
			if(val.startsWith("print") || val.startsWith("Print")){
				if(permission.canPrint == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
			
			if(val.startsWith("delete") || val.startsWith("Delete")){
				if(permission.canDelete == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
		});
	}
}

//loadPermission();

var  populateAttributePopUp = function(length, size, height, diameter, width,
		metalColor, hookType, screwType, loopType, polishType, settingType,
		vendorArticle, combination, collectionName, reason, isDueDtFlag) {
	console.log(combination);
	if(typeof isDueDtFlag == "undefined" ||  isDueDtFlag == "" ||  isDueDtFlag == null){
		$("#reason").hide();
		$("#reasonSection").hide();
	}else{
		if(isDueDtFlag == "true" || isDueDtFlag == true){
			$("#reason").show();
			$("#reasonSection").show();
			
		}else{
			$("#reason").hide();
			$("#reasonSection").hide();
		}
	}
	$('select[id="length"]').val(length);
	$('select[id="size"]').val(size);
	$('select[id="height"]').val(height);
	$('select[id="diameter"]').val(diameter);
	$('select[id="width"]').val(width);
	$('select[id="metalColor"]').val(metalColor);
	$('select[id="hookType"]').val(hookType);
	$('select[id="screwType"]').val(screwType);
	$('select[id="loopType"]').val(loopType);
	$('select[id="polishType"]').val(polishType);
	$('select[id="settingType"]').val(settingType);
	$('select[id="collectionName"]').val(collectionName);
	$("#vendorArticle").val(vendorArticle);
	$('select[id="combination"]').val(combination);
	$('textarea[id="reason"]').val(reason);
	$('select[id="isDueDtFlag"]').val(isDueDtFlag);
}

var globalAttrFlag = 0;

$("#updateAttr").on('click', function(){
	var valid = checkAttrValidate();
	if(valid == true){
		updateAttribute();
		$("#attributeSearch").modal('hide');
	}
});