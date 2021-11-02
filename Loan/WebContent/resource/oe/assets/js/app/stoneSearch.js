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

var showHideCol = function(){
	$("#segmentName").show();
	$("#mainCategory").show();
	$("#shape").show();
	$("#subCategoryName").show();
	$("#weightRange").show();
	$("#clarity").show();
	$("#actualColor").show();
	$("#color").show();
	$("#cutGrade").show();


	$("#showCostRange").hide();
	$("#segmentNameEdit").hide();
	$("#mainCategoryEdit").hide();
	$("#costRangeEdit").hide();
	$("#shapeEdit").hide();
	$("#subCategoryNameEdit").hide();
	$("#weightRangeEdit").hide();
	$("#clarityEdit").hide();
	$("#actualColorEdit").hide();
	$("#colorEdit").hide();
	$("#cutGradeEdit").hide();
}

//showHideCol();

var hsnFlag= $("#hsnFlag").val();
if(typeof hsnFlag == "undefined"){
	$("#hsnDiv").hide();
}else if(hsnFlag == 1){
	$("#hsnDiv").show();
}else{
	$("#hsnDiv").hide();
}
//$("#hsnDiv").hide();

//ON CHANGE OF SUPPLIER
$("#suppBy").on("change",function() {	
	//showHideCol();
	if ($("#forSegment").val() != "") {
		return;
	}
	if ($("#suppBy").val() == "") {
		clearStoneData(1);
		return;
	}
	if ($("#suppBy") != null && $("#suppBy").val() != "") {
		clearStoneData(1);
		var params = {
			"fieldFilters" : {
				"suppliedBy" : $("#suppBy").val(),
				"mCode" : ""
			}
		};
		postJSON('api/v1/getStoneSegments', JSON.stringify(params),function(data) {
			if (1 == data.resCode) {
				$.each(data.payload.stoneSeg,function(key, val) {
					$('#segmentName').append('<option code="'+val.code+'" value="' + val.id+ '">'+ val.description+ '</option>');
				});
			}
		});
	}
});


//ON CHANGE OF SEGMENT
$("#segmentName").on("change",function() {
	if ($("#suppBy").val() == "" || $("#segmentName").val() == "") {
		clearStoneData(2);
		return;
	}
	
	if ($("#suppBy").val() != "" && $("#segmentName").val() != "") {
		clearStoneData(2);
		var params = {
			"fieldFilters" : {
				"suppliedBy" : $("#suppBy").val(),
				"sSegId" : $('#segmentName').val(),
				"sSeg" : $('#segmentName option:selected').text()
			}
		};
		if ($("#suppBy").val() == "V"|| $("#suppBy").val() == "COV") {
			params.fieldFilters.vId = $("#vendorCode-value").val();
		}
		$('#mainCategory').empty().append('<option value="" selected>-- Select Option --</option>');
		postJSON('api/v1/getStoneCategories', JSON.stringify(params), function(data) {
			if (1 == data.resCode) {
				$.each(data.payload.mainCatList, function(key,val) {
					$('#mainCategory').append('<option code="'+val.name+'" value="' + val.id + '">'+ val.description+ '</option>');
				});
			}
		});
		var segmentName = $('#segmentName option:selected').attr('code');
		if (segmentName == "DI") {
			$("#showShape").show();
			$("#showSubCategory").hide();
			$("#showCostRange").hide();
		} else {
			$("#showShape").hide();
			$("#showSubCategory").show();
			$("#showCostRange").show();
		}
		if (isExtraStoneField()) {
			$("#showWeightRange").show();
			$("#showClarity").show();
			$("#showColor").show();
			$("#showCutGrade").show();
		} else {
			$("#showWeightRange").hide();
			$("#showClarity").hide();
			$("#showColor").hide();
			$("#showCutGrade").hide();
			$("#showActualColor").hide();
		}
	}
});


//ON CHANGE OF MAIN_CATEGORY
$("#mainCategory").on("change", function() {
	var segId = $('#segmentName').val();
	var catId = $("#mainCategory").val();
	
	if ($("#mainCategory").val() == "") {
		clearStoneData(3);
		return;
	}
	if ($("#suppBy").val() != "" && $("#segmentName").val() != "" && $("#mainCategory").val() != "") {
		clearStoneData(3);
		var params = {
			"fieldFilters" : {
				"suppliedBy" : $("#suppBy").val(),
				"sSegId" : $('#segmentName').val(),
				"sSeg" : $('#segmentName option:selected').text(),
				"catId" : $("#mainCategory").val()
			}
		};
		if ($("#suppBy").val() == "V"|| $("#suppBy").val() == "COV") {
			params.fieldFilters.vId = $("#vendorCode-value").val();
		}
		var segmentName = $('#segmentName option:selected').attr('code');
		if (segmentName == "DI") {
			
			$('#shape').empty().append('<option value="" selected>-- Select Option --</option>');
			postJSON('api/v1/getShapes',JSON.stringify(params),function(data) {
				if (1 == data.resCode) {
					$.each(data.payload.subCatList,function(key, val) {
						$('#shape').append('<option code="'+val.name+'" value="'+ val.id+ '">'+ val.description+ '</option>');
					});
				}
			});
			if (isActualColorField()) {
				$("#showActualColor").show();
			} else {
				$("#showActualColor").hide();
			}
		} else {
			
			$('#subCategoryName').empty().append('<option value="" selected>-- Select Option --</option>');
			postJSON('api/v1/getStoneSubCategories', JSON.stringify(params), function(data) {
				if (1 == data.resCode) {
					$.each(data.payload.subCatList, function(key, val) {
						$('#subCategoryName').append('<option value="' + val.name+ '">'+ val.description+ '</option>');
					});
				}
			});
			
		}
	}
});


//ON CHANGE OF SHAPE
$("#shape").on("change",function() {
	if ($("#shape").val() == "") {
		clearStoneData(4);
		return;
	}
	if ($("#suppBy").val() != "" && $("#segmentName").val() != "" && $("#mainCategory").val() != "" && $("#shape") != "") {
		clearStoneData(4);
		var params = {
			"fieldFilters" : {
				"segId" : $('#segmentName').val(),
				"catId" : $("#mainCategory").val(),
				"suppliedBy" : $("#suppBy").val(),
				"shapeId" : $("#shape").val()
			}
		};
		var suppliedBy = $("#suppBy").val();
		if (suppliedBy == "V" || suppliedBy == "COV") {
			params.fieldFilters.vId = $("#vendorCode-value").val();
		}

		postJSON('api/v1/getStoneCodeAndOthers',JSON.stringify(params), function(data) {
			if (1 == data.resCode) {
				$("#stoneCode").val(data.payload.stoneDetails.name);
				$("#uom").val(data.payload.uom);
			}else if(2 == data.resCode){
				$.growl.error({
					message : data.mesgStr,
					duration : 5000,
					title : 'Error'
				});
			}
			$.each(data.payload.weightSlab, function(key, val) {
				$('#weightRange').append('<option value="' + val.id + '">'+ val.id + '</option>');
			});
			$.each(data.payload.clarity, function(key, val) {
				$('#clarity').append('<option value="' + val.id + '">'+ val.id + '</option>');
			});
			$.each(data.payload.actualColor,function(key, val) {
				$('#actualColor').append('<option value="' + val.id+ '">' + val.id+ '</option>');
			});
			$.each(data.payload.color, function(key, val) {
				$('#color').append('<option value="' + val.id + '">'+ val.id + '</option>');
			});
			$.each(data.payload.cutGrade, function(key, val) {
				$('#cutGrade').append('<option value="' + val.id + '">'+ val.id + '</option>');
			});
			if(hsnFlag == 1){
				if(data.payload.stoneDetails.description == "" || data.payload.stoneDetails.description == null){
					$("#hsnCode").val("");
					$("#hsnId").val("");
					$.growl.error({
						message : "HSN Code is Not Exist.",
						duration : 5000,
						title : 'Error'
					});
					return false;
				}
				var temp = (data.payload.stoneDetails.description).split("@");
				$("#hsnCode").val(temp[0]);
				$("#hsnId").val(temp[1]);
				$("#hsnDiv").show();
			}
		});
	}

});

var getCostRange = function(stoneCode, vendorId){
	$("#showCostRange").show();
	$('#costRange').empty().append('<option value="" selected>-- Select Option --</option>');
	
	var params =  {"stoneCode" : stoneCode,"clarity":null,"cutGrade":null,"color":null,"actualColor":null, "wgtRange":null, "category": null,"vendorId" : vendorId};
	postJSON('/OrderExecution/api/v1/listCostRangeForGRFG?type=grFg', JSON.stringify(params), function(data) {
		$.each(data.payload.list,function(key, val) {
			$('#costRange').append('<option value="' + val.id+ '">' + val.name+ '</option>');
		});
	});
	
	
}

// ON CHANGE OF SUB_CATEGORY
$("#subCategoryName").on("change",function() {
	$("#costRange").show();
	if ($("#subCategoryName").val() == "") {
		clearStoneData(4);
		return;
	}
	if ($("#suppBy").val() != "" && $("#segmentName").val() != "" && $("#subCategoryName") != "") {
		clearStoneData(4);
		var params = {
			"fieldFilters" : {
				"segId" : $('#segmentName').val(),
				"catId" : $("#mainCategory").val(),
				"suppliedBy" : $("#suppBy").val(),
				"subCatCode" : $("#subCategoryName").val()
			}
		};
		var suppliedBy = $("#suppBy").val();
		if (suppliedBy == "V" || suppliedBy == "COV") {
			params.fieldFilters.vId = $("#vendorCode-value").val();
		}
		postJSON('api/v1/getStoneCodeAndOthers',JSON.stringify(params), function(data) {
			if (1 == data.resCode) {
				$("#stoneCode").val(data.payload.stoneDetails.name);
				$("#uom").val(data.payload.stoneDetails.value);
				$("#subCategoryDesc").val($('#subCategoryName option:selected').text());
				
				if(suppliedBy == "V"){
					getCostRange(data.payload.stoneDetails.name,$("#vendorCode-value").val());
				}else{
					$("#showCostRange").hide();
				}
				/*$.each(data.payload.stoneDetails.rateList,function(key, val) {
					$('#rate').append('<option value="' + val+ '">' + val+ '</option>');
				});*/
				if(hsnFlag == 1){
					if(data.payload.stoneDetails.description == "" || data.payload.stoneDetails.description == null){
						$("#hsnCode").val("");
						$("#hsnId").val("");
						$.growl.error({
							message : "HSN Code is Not Exist.",
							duration : 5000,
							title : 'Error'
						});
						return false;
					}
					var temp = (data.payload.stoneDetails.description).split("@");
					$("#hsnCode").val(temp[0]);
					$("#hsnId").val(temp[1]);
					$("#hsnDiv").show();
				}
			}else if(2 == data.resCode){
				$.growl.error({
					message : data.mesgStr,
					duration : 5000,
					title : 'Error'
				});
			}
		});
	}
});


// ON CHANGE OF CUT_GRADE
$("#cutGrade").on("change", function() {
	updateSubCatDes();
});

$("#selectStone").on("click", function() {
	
	var suppBy = $("#suppBy").val();
	var segmentCode = $("#segmentName option:selected").attr('code');
	var mainCategory = $("#mainCategory").val();
	var mainCategoryCode = $("#mainCategory option:selected").attr('code');
	var subCategoryName = $("#subCategoryName").val();
	var weightRange = $("#weightRange").val();
	var clarity = $("#clarity").val();
	var actualColor = $("#actualColor").val();
	var color = $("#color").val();
	var cutGrade = $("#cutGrade").val();
	var costRange = $("#costRange").val();
	var shape = $("#shape").val();
	
	if(suppBy == "" || segmentCode == ""){
		$.growl.error({	message : "Please select the mandatory fields.",duration : 5000,title : 'Error'	});
		return false;
	}
	if(segmentCode == "DI" && (mainCategory == "" || shape == "" || weightRange == "" || clarity == "" || color == "" || cutGrade == "")){
		$.growl.error({	message : "Please select the mandatory fields.",duration : 5000,title : 'Error'	});
		return false;
	}
	
	if(segmentCode == "DI" && (mainCategoryCode == "CM" || mainCategoryCode == "CS" || mainCategoryCode == "CP") && actualColor == ""){
		$.growl.error({	message : "Please select the mandatory fields.",duration : 5000,title : 'Error'	});
		return false;
	}
	
	if(segmentCode != "DI" && (mainCategory == "" || subCategoryName == "" || costRange == "")){
		$.growl.error({	message : "Please select the mandatory fields.",duration : 5000,title : 'Error'	});
		return false;
	}
	
	if(hsnFlag == 1 && $('#hsnCode').val() == ""){
		$.growl.error({
			message : "Please select the mandatory fields.",
			duration : 5000,
			title : 'Error'
		});
		return false;
	}
	if ($("#subCategoryDesc").val() == "") {
		$.growl.error({
			message : "Please select the mandatory fields.",
			duration : 5000,
			title : 'Error'
		});
		return false;
	} else {
		updateSubCatDes();
	}
	/*var rowindex = $("#stoneDetailsGrid").jqxGrid('getselectedrowindex');
	
	$('#stoneDetailsGrid').jqxGrid('setcellvalue', rowindex, "usedPcs", 0);
	$('#stoneDetailsGrid').jqxGrid('setcellvalue', rowindex, "usedWt", 0);
	$('#stoneDetailsGrid').jqxGrid('setcellvalue', rowindex, "stoneRate", 0);
	$('#stoneDetailsGrid').jqxGrid('setcellvalue', rowindex, "stoneCostRate", 0);
	$('#stoneDetailsGrid').jqxGrid('setcellvalue', rowindex, "stoneCost", 0);
	$('#stoneDetailsGrid').jqxGrid('setcellvalue', rowindex, "stoneHC", 0);
	$('#stoneDetailsGrid').jqxGrid('setcellvalue', rowindex, "sellingRate", 0);
	$('#stoneDetailsGrid').jqxGrid('setcellvalue', rowindex, "sellingPrice", 0);*/
});

$("#closeSearch").on("click", function() {
	$("#subCategoryDesc").val("");
});

function updateSubCatDes() {
	var hsnCode = $('#hsnCode').val();
	var segmentName = $('#segmentName option:selected').text();
	var mainCategory = $('#mainCategory option:selected').text();
	var shape = $('#shape option:selected').text();
	var weightRange = $('#weightRange option:selected').text();
	var clarity = $('#clarity option:selected').text();
	var color = $('#color option:selected').text();
	var cutGrade = $('#cutGrade option:selected').text();
	if (segmentName != null && mainCategory != null && shape != null && segmentName == "Diamond") {
		var subCategoryDesc = segmentName + " " + mainCategory + " " + shape + " ";
		if (clarity != null) {
			subCategoryDesc += clarity + " ";
		}
		if (color != null) {
			subCategoryDesc += color + " ";
		}
		if (cutGrade != null) {
			subCategoryDesc += cutGrade + " ";
		}
		if (weightRange != null) {
			subCategoryDesc += weightRange + " ";
		}
		$("#subCategoryDesc").val(subCategoryDesc);
	}
}

function isExtraStoneField() {
	if ($("#suppBy").val() == "CU") {
		return false;
	} else if ($('#segmentName option:selected').text() == "Diamond") {
		return true;
	} else {
		return false;
	}
}

function isActualColorField() {
	var mainCategory = $('#mainCategory option:selected').text();
	if (mainCategory != null) {
		var firstWord = mainCategory.split(' ')[0];
		if (firstWord == "CD") {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function clearStoneData(level) {
	if (level <= 1) {
		$("#segmentName").empty().append('<option value="" selected>-- Select Option --</option>');
	}
	if (level <= 2) {
		$("#mainCategory").empty().append('<option value="" selected>-- Select Option --</option>');
	}
	if (level <= 3) {
		$("#shape").empty().append('<option value="" selected>-- Select Option --</option>');
		$("#subCategoryName").empty().append('<option value="" selected>-- Select Option --</option>');
	}
	if (level <= 4) {
		$('#weightRange').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#clarity').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#actualColor').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#color').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#cutGrade').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#rate').empty().append('<option value="" selected>-- Select Option --</option>');
		$("#stoneCode").val('');
		$("#uom").val('');
		$("#subCategoryDesc").val('');
	}
}

$("#clear").on('click',function(){
	alert("Press OK to Clear.");
	$("#mainCategory").val("");
	$("#shape").val("");
	$("#stoneCode").val("");
	$("#weightRange").val("");
	$("#clarity").val("");
	$("#actualColor").val("");
	$("#color").val("");
	$("#cutGrade").val("");
	$("#uom").val("");
	$("#subCategoryDesc").val("");
	$("#hsnCode").val("");
});