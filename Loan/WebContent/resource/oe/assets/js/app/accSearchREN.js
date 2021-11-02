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

var  populateAccPopUp = function(suppliedBy,segMent, mainCategory, subCategory, accCostRange,accArticleCode,uom) {

	$('#accSupBy').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(suppliedBy, function(k,v){
		$('#accSupBy').append('<option selected  value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	$("#accSegment").val(segMent);
	
	$('select[id="accMainCat"]').val(mainCategory);
	
	$('#accSubCat').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(subCategory, function(k,v){
		$('#accSubCat').append('<option selected value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	
	$('#accCostRange').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(accCostRange, function(k,v){
		$('#accCostRange').append('<option selected value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	
	
	$("#accArticleCode").val(accArticleCode);
	$("#uomAcc").val(uom);	
	addAccDet(mainCategory);
	$('select[id="accSubCat"]').prop('disabled', true);	
	$('select[id="accCostRange"]').prop('disabled', true);
}

var addAccDet = function(mainCategory) {

	var accSupBy = $('#accSupBy').val();	
	$("#accSegment").val('Accessory');

	$('#accMainCat').empty().append('<option value="" selected>--Select--</option>');
	var fieldFilters = {"fieldFilters":{"suppliedBy":accSupBy, "vId" : $("#vendorCodeC").val()}};
	postJSON('/OrderExecution/api/v1/getAccessoryCategories', JSON.stringify(fieldFilters), function(data) {
		var accCatsList = data.payload.accCats;
		$.each(accCatsList, function(k, v) {
			if(mainCategory != null && typeof mainCategory != "undefined" && (v.id == mainCategory)){
				$('#accMainCat').append('<option selected code="'+v.name+'" value="' + v.id + '">'+ v.description+ '</option>');
			}else{
				$('#accMainCat').append('<option code="' + v.name + '" value="' + v.id	+ '">' + v.description + '</option>');
			}
		});
	});
}

addAccDet();

// Accessory  main category on change load sub category
$("#accMainCat").on('change', function() {
	var accMainCat = $(this).val();
	var accSupBy = $("#accSupBy").val();
	$("#accSubCat").show();
	
	var fieldFilters = {"fieldFilters" : {"suppliedBy" : accSupBy,"accMCatId" : accMainCat, "vId" : $("#vendorCodeC").val()}};
	$('#accSubCat').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/getAccCatSubCategories', JSON.stringify(fieldFilters), function(data) {
		var accSubCatsList = data.payload.accSubCats;
		$.each(accSubCatsList, function(k, v) {
			$('#accSubCat').append(	'<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
		});
		$("#accSubCat").removeAttr('disabled');
	});
});

// Accessory sub category on change load code
$("#accSubCat").on('change', function() {
	var accSubCat = $("#accSubCat option:selected").attr('code');
	var accMainCat = $("#accMainCat option:selected").attr('code');
	var accSupBy = $("#accSupBy").val();
	var accSubCatId = $("#accSubCat option:selected").val();
	$("#accCostRange").show();
	var fieldFilters = {"fieldFilters" : {"mCode" : "AC", "accSubCatId" : parseInt(accSubCatId) , "catCode" : accMainCat,"subCatCode" : accSubCat,"suppliedBy" : accSupBy, "vId" : $("#vendorCodeC").val()}};

	$('#accCostRange').empty().append('<option value="" selected>--Select--</option>');
			
	postJSON('/OrderExecution/api/v1/getAccCode?type=renumberingGr', JSON.stringify(fieldFilters), function(data) {
		var accCodeList = data.payload.accCode;
		var costSlab = data.payload.costSlab;
		$.each(costSlab, function(k, v) {
			$('#accCostRange').append(	'<option  value="' + v.id + '">' + v.id + '</option>');
		});
		
		$('#accArticleCode').val(accCodeList.name);
		$('#accArticleId').val(accCodeList.id);
		$('#uomAcc').val(accCodeList.description);
		
		$("#accSubCat").removeAttr('disabled');
		$("#accCostRange").removeAttr('disabled');
	});
});


$("#selectAcc").on('click', function(){
	var accSupBy = $("#accSupBy").val();
	var accMainCat = $("#accMainCat").val();
	var accSubCat = $("#accSubCat").val();
	var accCostRange = $("#accCostRange").val();
	if(accSupBy == "" || accMainCat == "" || accSubCat == "" || accCostRange == ""){
		$.growl.error({ message: "Please select mandatory fields.", duration: 5000, title: 'Error' });
		return false;
	}

});
