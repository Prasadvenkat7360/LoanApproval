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

$("#glCode-Lov").hide();
$("#listChildMaster").hide();

$("#category").on("change", function(){
	value = $(this).val();
	if(value == "stoneAccCat"){
		$("#glCode-Lov").show();
	}
});

$("#search").on("click", function(){
	$("#listChildMaster").show();
});

$("#clearAll").on("click", function(){
	$("#listChildMaster").hide();
});

$("#addChildMaster").on("click", function(){
	var category = $("#category").val();
	var code = $("#code").val();
	var name = $("#name").val();
	var glCode = $("#glCode").val();
	
	$("#catVal").text(category);
	$("#codeVal").text(code);
	$("#nameVal").text(name);
});

$("#editChildMaster").on("click", function(){
	var codeVal = $("#codeVal").text();
	var nameVal = $("#nameVal").text();
	var createdBy = $("#createdBy").text();
	var createdDate = $("#createdDate").text();
	$("#code").val(codeVal);
	$("#name").val(nameVal);
});