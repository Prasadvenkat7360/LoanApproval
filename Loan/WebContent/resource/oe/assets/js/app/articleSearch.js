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

$("#category").show();
$("#categoryEdit").hide();
$("#subCategory").show();
$("#subCategoryEdit").hide();
	
$("#segment").on("change", function() {
	var segmentId = $('#segment').val();
	var $jewelType = $('#jewelType');
	if (segmentId != "") {
		$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?criteria=jewelType&id='+ segmentId, function(data) {
			if(1 == data.resCode) {
				$jewelType.empty().append('<option value="" selected>Select</option>');
				// iterate over the data and append
				// a select option
				$.each(data.payload.jewelType, function(key, val) {
						$jewelType.append('<option value="'+ val.id + '" CodeJwl="'+ val.code + '">'+ val.description + '</option>');
					});
			}
			else {
				$.growl.error({
					message : "Jewel Types not found for the Segment choosen.",
					duration : 5000,
					title : 'Error'
				});	
				$jewelType.empty().append('<option value="" selected>Select</option>');
			}
		});
	} else {
		$jewelType.empty().append('<option value="" selected>Select</option>');
	}
	
	$('#category').empty().append('<option value="" selected>Select</option>');
	$('#subCategory').empty().append('<option value="" selected>Select</option>');
	$('#articleCode').val('');
	$('#articleDesc').val('');
});

$("#jewelType").on ("change", function() {
	var segmentId = $('#segment').val();
	var jewelType = $('#jewelType').val();

	$("#category").show();
	$("#categoryEdit").hide();
	$("#subCategory").show();
	$("#subCategoryEdit").hide();
	
	
	var fieldFilters = {
			"fieldFilters" : {}
		};
	fieldFilters.fieldFilters["mJewelId"] = jewelType;
	fieldFilters.fieldFilters["segId"] = segmentId;
	fieldFilters.fieldFilters["vId"] =  $('#vId').val();;
	if (segmentId != "") {
		postJSON('/OrderExecution/api/v1/getMetalJewelTypeCategoryAndSubCategory', JSON
				.stringify(fieldFilters), function(data) {
			if(1 == data.resCode) {
				$('#category').empty().append('<option value="" selected>Select</option>');
				// iterate over the data and append
				// a select option
				$.each (
						data.payload.mainCatList,
						function(key, val) {
							$('#category')
									.append('<option value="'
											+ val.id
											+ '">'
											+ val.description
											+ '</option>');
						});	
			}
			else {
				$.growl.error({
					message : "Main Categories not found for the Jewel Type choosen.",
					duration : 5000,
					title : 'Error'
				});		
				$('#category').empty().append(
				'<option value="" selected>Select</option>');
			}
		});
	} else {
		$('#category').empty().append(
				'<option value="" selected>Select</option>');
	}
	
	$('#subCategory').empty().append(
			'<option value="" selected>Select</option>');
	$('#articleCode').val('');
	$('#articleDesc').val('');

});

$("#category").on("change", function() {
	var mainCatList = $('#category').val();
	var $sCategory = $('#subCategory');
	var jewelType = $('#jewelType').val();	
	var segmentId = $('#segment').val();

	var fieldFilters = {
			"fieldFilters" : {}
		};
	fieldFilters.fieldFilters["segId"] = segmentId;
	fieldFilters.fieldFilters["mJewelId"] = jewelType;
	fieldFilters.fieldFilters["catId"] =  mainCatList;
	fieldFilters.fieldFilters["vId"] =  $('#vId').val();;
	
	if (mainCatList != "") {
		postJSON('/OrderExecution/api/v1/getCategorySubCategory', JSON
				.stringify(fieldFilters), function(data) {
			if(1 == data.resCode) {
					$sCategory.empty().append('<option value="" selected>Select</option>');
					// iterate over the data and append
					// a select option
					$.each(
							data.payload.subCatList,
							function(key, val) {
								$sCategory
										.append('<option value="'
												+ val.id
												+ '">'
												+ val.description
												+ '</option>');
					});
			}
			else {
				$.growl.error({
					message : "Sub Categories not found for the Main Category choosen.",
					duration : 5000,
					title : 'Error'
				});		
				$sCategory.empty().append(
				'<option value="" selected>Select</option>');
			}
		});
	} else {		
		$sCategory.empty().append(
				'<option value="" selected>Select</option>');
	}

	$('#articleCode').val('');
	$('#articleDesc').val('');
});

$("#subCategory").on("change", function() {
	var segmentId1 = $('#segment').val();
	var jewelType1 = $('#jewelType').val();
	var mainCatList1 = $('#category').val();
	var sCategory1 = $('#subCategory').val();

	if (sCategory1 != "" && jewelType1 != "" && segmentId1 != "") {
		$.getJSON('/OrderExecution/api/v1/article/byCode?id='
								+ segmentId1 + '&jw='
								+ jewelType1 + '&cat='
								+ mainCatList1 + '&sub='
								+ sCategory1,
			function(data) {
				if (1 == data.resCode) {
					$("#articleCode").val(data.payload.articleCode.articleCode);
					$("#articleDesc").val(data.payload.articleCode.articleDesc);
					$("#hsnMasterCode").val(data.payload.articleCode.hsnMasterCode);
					
					$("#hsnMasterId").val(data.payload.articleCode.hsnMasterId);
					$("#isPair").val(data.payload.articleCode.isPair);
					$("#taxStructureId").val(data.payload.articleCode.taxStructureId);
				} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});

					$('#articleCode').val('');
					$('#articleDesc').val('');
					$('#isPair').val('');
				}
			});
	}
	else {
		
		$('#articleCode').val('');
		$('#articleDesc').val('');
		$('#isPair').val('');
	}
});

$("#articleSelect").on("click", function() {
if($("#articleCode").val() == "") {
	$.growl.error({
		message : "Please select the mandatory fields.",
		duration : 5000,
		title : 'Error'
	});
	return false;
}
/*else {
	updateSubCatDes();
}*/
});

$("#closeSearch").on("click", function() {
	$("#articleCode").val("");
});