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


var  populateStonePopUp = function(suppliedBy,segMent, mainCategory, shape, stoneCode,weightRange, clarity, actualColor, color, cutGrade, uom,subCategoryDesc,costRange,subCategoryName) {

	$('#stoneSuppBy').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(suppliedBy, function(k,v){
		$('#stoneSuppBy').append('<option selected  value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	$('#segmentName').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(segMent, function(k,v){
		$('#segmentName').append('<option selected value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	$('#shape').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(shape, function(k,v){
		$('#shape').append('<option selected value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	
	$('#weightRange').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(weightRange, function(k,v){
		$('#weightRange').append('<option selected value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	$('#clarity').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(clarity, function(k,v){
		$('#clarity').append('<option selected value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	$('#actualColor').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(actualColor, function(k,v){
		$('#actualColor').append('<option selected value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	$('#color').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(color, function(k,v){
		$('#color').append('<option selected value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	$('#cutGrade').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(cutGrade, function(k,v){
		$('#cutGrade').append('<option selected value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	$('#costRange').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(costRange, function(k,v){
		$('#costRange').append('<option selected value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	$('#subCategoryName').empty().append('<option value="" selected>-- Select Option --</option>');
	$.each(subCategoryName, function(k,v){
		$('#subCategoryName').append('<option selected code="' + v.name + '" value="' + v.id + '">'+ v.name+ '</option>');
			
	});
	
	$("#stoneCode").val(stoneCode);
	$('select[id="mainCategory"]').val(mainCategory);
	$("#uom").val(uom);
	$("#subCategoryDesc").val(subCategoryDesc);
	
	addStoneDet(mainCategory);	
	
	$('select[id="shape"]').prop('disabled', true);	
	$('select[id="weightRange"]').prop('disabled', true);
	$('select[id="clarity"]').prop('disabled', true);
	$('select[id="actualColor"]').prop('disabled', true);	
	$('select[id="color"]').prop('disabled', true);
	$('select[id="subCategoryName"]').prop('disabled', true);
	$('select[id="cutGrade"]').prop('disabled', true);
	$('select[id="costRange"]').prop('disabled', true);
	
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

var showHideCol = function(){

	var segmentName = $('#segmentName option:selected').text();
	if (segmentName == "Diamond") {
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
var addStoneDet = function(mainCategory) {
	var params = {
			"fieldFilters" : {
				"suppliedBy" : $("#stoneSuppBy").val(),
				"sSegId" : $('#segmentName').val(),
				"sSeg" : $('#segmentName option:selected').text(),
				"vId" : $("#vendorCodeC").val()
			}
		};
		
		$('#mainCategory').empty().append('<option value="" selected>-- Select Option --</option>');
		postJSON('api/v1/getStoneCategories', JSON.stringify(params), function(data) {
			console.log(data);
			var mainCatList = data.payload.mainCatList;			
			$.each(mainCatList, function(k,v) {
				if(mainCategory != null && typeof mainCategory != "undefined" && (v.id == mainCategory)){
					$('#mainCategory').append('<option selected code="'+v.name+'" value="' + v.id + '">'+ v.description+ '</option>');
				}else{
					$('#mainCategory').append('<option code="'+v.name+'" value="' + v.id + '">'+ v.description+ '</option>');
				}
			});
		});
		showHideCol();
}

addStoneDet();


//ON CHANGE OF MAIN_CATEGORY
$("#mainCategory").on("change", function() {
	var segId = $('#segmentName').val();
	var catId = $("#mainCategory").val();
	
	if ($("#mainCategory").val() == "") {
		clearStoneData(3);
		return;
	}
	if ($("#stoneSuppBy").val() != "" && $("#segmentName").val() != "" && $("#mainCategory").val() != "") {
		clearStoneData(3);
		var params = {
			"fieldFilters" : {
				"suppliedBy" : $("#stoneSuppBy").val(),
				"sSegId" : $('#segmentName').val(),
				"sSeg" : $('#segmentName option:selected').text(),
				"catId" : $("#mainCategory").val()
			}
		};
		if ($("#stoneSuppBy").val() == "V"|| $("#stoneSuppBy").val() == "COV") {
			params.fieldFilters.vId = $("#vendorCodeC").val();
		}
		var segmentName = $('#segmentName option:selected').text();
		if (segmentName == "Diamond") {
			
			$('#shape').empty().append('<option value="" selected>-- Select Option --</option>');
			postJSON('api/v1/getShapes',JSON.stringify(params),function(data) {
				if (1 == data.resCode) {
					$.each(data.payload.subCatList,function(key, val) {
						$('#shape').append('<option code="'+val.name+'" value="'+ val.id+ '">'+ val.description+ '</option>');
						$('#shape').removeAttr('disabled');
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
						$('#subCategoryName').append('<option code="' + val.name+ '" value="' + val.id+ '">'+ val.description+ '</option>');
					});
					
					$("#subCategoryName").removeAttr('disabled');
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
	if ($("#stoneSuppBy").val() != "" && $("#segmentName").val() != "" && $("#mainCategory").val() != "" && $("#shape") != "") {
		clearStoneData(4);
		var params = {
			"fieldFilters" : {
				"segId" : $('#segmentName').val(),
				"catId" : $("#mainCategory").val(),
				"suppliedBy" : $("#stoneSuppBy").val(),
				"shapeId" : $("#shape").val()
			}
		};
		var suppliedBy = $("#stoneSuppBy").val();
		if (suppliedBy == "V" || suppliedBy == "COV") {
			params.fieldFilters.vId = $("#vendorCodeC").val();
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
			
			$('select[id="weightRange"]').removeAttr('disabled');
			$('select[id="clarity"]').removeAttr('disabled');
			$('select[id="actualColor"]').removeAttr('disabled');
			$('select[id="color"]').removeAttr('disabled');
			$('select[id="cutGrade"]').removeAttr('disabled');
			
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
	var stoneCode = $("#stoneCode").val();
	var vendorId = $("#vendorCode").val();
	var wgtRange =   $("#weightRange").val(); 
	var clarity =   $("#clarity").val(); 
	var cutGrade =   $("#cutGrade").val(); 
	var color =   $("#color").val(); 
	var actualColor =   $("#actualColor").val(); 
	var category =   $("#mainCategory option:selected").text(); 
	
	var params =  {"stoneCode" : stoneCode,"clarity":clarity,"cutGrade":cutGrade,"color":color,"actualColor":actualColor, "wgtRange":wgtRange, "category": category,"vendorId" : vendorId };
	postJSON('/OrderExecution/api/v1/listCostRangeForGRFG?type=renumberingGr', JSON.stringify(params), function(data) {
		$.each(data.payload.list,function(key, val) {
			$('#costRange').append('<option code="' + val.name+ '" value="' + val.id+ '">' + val.name+ '</option>');
			
		});
		$('select[id="costRange"]').removeAttr('disabled');
	});
	
	
}

// ON CHANGE OF SUB_CATEGORY
$("#subCategoryName").on("change",function() {
	$("#costRange").show();
	if ($("#subCategoryName").val() == "") {
		clearStoneData(4);
		return;
	}
	if ($("#stoneSuppBy").val() != "" && $("#segmentName").val() != "" && $("#subCategoryName") != "") {
		clearStoneData(4);
		var params = {
			"fieldFilters" : {
				"segId" : $('#segmentName').val(),
				"catId" : $("#mainCategory").val(),
				"suppliedBy" : $("#stoneSuppBy").val(),
				"subCatCode" : $.trim($("#subCategoryName option:selected").attr('code'))
			}
		};
		var suppliedBy = $("#stoneSuppBy").val();
		if (suppliedBy == "V" || suppliedBy == "COV") {
			params.fieldFilters.vId = $("#vendorCodeC").val();
		}
		postJSON('api/v1/getStoneCodeAndOthers',JSON.stringify(params), function(data) {
			if (1 == data.resCode) {
				$("#stoneCode").val(data.payload.stoneDetails.name);
				$("#uom").val(data.payload.stoneDetails.value);
				$("#subCategoryDesc").val($('#subCategoryName option:selected').text());
				
				getCostRange(data.payload.stoneDetails.name,$("#vendorCodeC").val());
				
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
	
	var suppBy = $("#stoneSuppBy").val();
	var segmentCode = $("#segmentName option:selected").text();
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
	
/*	if(suppBy == "" || segmentCode == ""){
		$.growl.error({	message : "Please select the mandatory fields.",duration : 5000,title : 'Error'	});
		return false;
	}*/
	if(segmentCode == "Diamond" && (mainCategory == "" || shape == "" || weightRange == "" || clarity == "" || color == "" || cutGrade == "")){
		$.growl.error({	message : "Please select the mandatory fields.",duration : 5000,title : 'Error'	});
		return false;
	}
	
	if(segmentCode == "Diamond" && (mainCategoryCode == "CM" || mainCategoryCode == "CS" || mainCategoryCode == "CP") && actualColor == ""){
		$.growl.error({	message : "Please select the mandatory fields.",duration : 5000,title : 'Error'	});
		return false;
	}
	
	if(segmentCode != "Diamond" && (mainCategory == "" || subCategoryName == "")){
		$.growl.error({	message : "Please select the mandatory fields.",duration : 5000,title : 'Error'	});
		return false;
	}
	
	if(segmentCode != "Diamond" && suppBy == "V" && costRange == ""){
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
	if ($("#stoneSuppBy").val() == "CU") {
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