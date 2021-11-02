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
					$(value).prop('disabled', true);
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

$("#claritySection").hide();
$("#actualColorSection").hide();
$("#colorSection").hide();
$("#cutGradeSection").hide();
$("#wtRangeSection").hide();
$("#ctRangeSection").hide();
$("#subCatSection").hide();
$("#shapeSection").hide();
$("#vcode").hide();
 
$("#sdvTypeS").on("change",function(){
	$('#subCat').val("");
	$('#clarity').val("");
	$('#wtRange').val("");
	$('#stoneShape').val("");
	$('#color').val("");
	$('#cutGrade').val("");
	$('#actualColor').val("");
	$("#segmentS").val("");
	$("#catS").val("");
	$("#vendorCode-value").val("");
	$("#vendorCode").val("")
});

$("#segmentS").on("change",function(){
	    $('#subCat').empty().append('<option value="" selected>--Select--</option>');
		$('#clarity').empty().append('<option value="" selected>--Select--</option>');
		$('#wtRange').empty().append('<option value="" selected>--Select--</option>');
		$('#stoneShape').empty().append('<option value="" selected>--Select--</option>');
		$('#color').empty().append('<option value="" selected>--Select--</option>');
		$('#cutGrade').empty().append('<option value="" selected>--Select--</option>');
		$('#actualColor').empty().append('<option value="" selected>--Select--</option>');
		
	if($("#sdvTypeS").val() == "External" && $("#segmentS option:selected").text() == "Diamond"){
			$("#claritySection").show();
			$("#colorSection").show();
			$("#cutGradeSection").show();
			$("#wtRangeSection").show();
			$("#ctRangeSection").hide();
			$("#shapeSection").show();
			$("#actualColorSection").hide();
		}else{
			$("#shapeSection").hide();
			$("#claritySection").hide();
			$("#colorSection").hide();
			$("#cutGradeSection").hide();
			$("#wtRangeSection").hide();
			$("#ctRangeSection").hide();
			$("#actualColorSection").hide();
		}
		if($("#segmentS option:selected").text() == "Diamond"){
			$("#subCatSection").hide();
			$("#ctRangeSection").hide();
		}else{
			$("#subCatSection").show();
			$("#ctRangeSection").show();
		}
});

$("#catS").on("change",function(){
		var category = $("#catS option:selected").text();
		if($("#sdvTypeS").val() == "External" && (category== "CD Melees" || category == "CD Pointers" || category == "CD Solitaire")){
			$("#actualColorSection").show();
		}else{
			$("#actualColorSection").hide();
		}
	
	 if( $("#sdvTypeS").val() == "External" && $("#segmentS option:selected").text() == "Diamond"){
		var fieldFilters = {
				"fieldFilters" : {
					"suppliedBy" : "CO",
					"sSegId" : $("#segmentS").val(),
					"sSeg" : $("#segmentS option:selected").text(),
					"catId" : $("#catS").val()
				}
			};
	
			$('#wtRange').empty().append('<option value="" selected>--Select--</option>');
			$('#stoneShape').empty().append('<option value="" selected>--Select--</option>');
			$('#subCat').empty().append('<option value="" selected>--Select--</option>');
			
			postJSON('/OrderExecution/api/v1/getShapes', JSON.stringify(fieldFilters), function(data) {
				var subCatList = data.payload.subCatList;
				$.each(subCatList, function(k, v) {
					$('#stoneShape').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
				});
			});
	}else{
	var fieldFilters = {
			"fieldFilters" : {
				"suppliedBy" : "CO",
				"sSegId" : $("#segmentS").val(),
				"sSeg" : $("#segmentS option:selected").text(),
				"catId" : $("#catS").val()
			}
		};
		$('#subCat').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getStoneSubCategories', JSON.stringify(fieldFilters), function(data) {
			var subCatList = data.payload.subCatList;
			$.each(subCatList, function(k, v) {
				$('#subCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
				});
			});
		 }
});

$('#subCat').on("change",function(){
	getJSON('/OrderExecution/api/v1/costRangeBySubCategory?subCatId='+ $("#subCat").val() , function(data) {
		$('#ctRange').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each(data.payload.ranges ,function(key, val) {
				$('#ctRange').append('<option value="' + val.id + '">'+ val.name + '-' + val.description + '</option>');
		});
	});
})

$('#subCatC').on("change",function(){
	getJSON('/OrderExecution/api/v1/costRangeBySubCategory?subCatId='+ $("#subCatC").val() , function(data) {
		$('#ctRangeC').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each(data.payload.ranges ,function(key, val) {
				$('#ctRangeC').append('<option value="' + val.id + '">'+ val.name + '-' + val.description + '</option>');
		});
	});
})

$('#subCatE').on("change",function(){
	getJSON('/OrderExecution/api/v1/costRangeBySubCategory?subCatId='+ $("#subCatE").val() , function(data) {
		$('#ctRangeE').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each(data.payload.ranges ,function(key, val) {
				$('#ctRangeE').append('<option value="' + val.id + '">'+ val.name + '-' + val.description + '</option>');
		});
	});
})


$('#stoneShape').on("change",function(){
	var fieldFilters = {
			"fieldFilters" : {
				 "sSeg":  $("#segmentS option:selected").attr('attr'),
				  "catCode": $("#catS option:selected").attr('attr'),
				  "suppliedBy": "CO",
				  "shapeCode": $("#stoneShape option:selected").attr('code')
			}
		};
		$('#clarity').empty().append('<option value="" selected>--Select--</option>');
		$('#wtRange').empty().append('<option value="" selected>--Select--</option>');
		$('#color').empty().append('<option value="" selected>--Select--</option>');
		$('#cutGrade').empty().append('<option value="" selected>--Select--</option>');
		$('#actualColor').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(fieldFilters), function(data) {
			var weightSlabList = data.payload.weightSlab;
			var clarityList = data.payload.clarity;
			var colorList = data.payload.color;
			var cutGradeList = data.payload.cutGrade;
			var actualColor = data.payload.actualColor;

			$.each(weightSlabList, function(k, v) {
				$('#wtRange').append('<option code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
			});

			$.each(clarityList, function(key, val) {
				$('#clarity').append('<option code="' + val.id + '" value="' + val.id+ '">' + val.id + '</option>');
			});

			$.each(colorList, function(ke, va) {
				$('#color').append('<option code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
			});

			$.each(cutGradeList, function(ke, va) {
				$('#cutGrade').append('<option code="' + va.id + '" value="' + va.id+ '">' + va.id + '</option>');
			});

			$.each(actualColor, function(ke, va) {
				$('#actualColor').append('<option code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
			});
	 });
});

$("#claritySectionC").hide();
$("#actualColorSectionC").hide();
$("#colorSectionC").hide();
$("#cutGradeSectionC").hide();
$("#wtRangeSectionC").hide();
$("#ctRangeSectionC").hide();
$("#shapeSectionC").hide();
$("#subCatSectionC").hide();
$("#reqType").hide();

$("#sdvTypeC").on("change",function(){
	$('#subCatC').val("");
	$('#clarityC').val("");
	$('#wtRangeC').val("");
	$('#stoneShapeC').val("");
	$('#colorC').val("");
	$('#cutGradeC').val("");
	$('#actualColorC').val("");
	$("#segmentC").val("");
	$("#catC").val("");
	$("#vendorCodeC-value").val("");
	$("#vendorCodeC").val("")
	
	if($("#sdvTypeC").val() == "Internal"){
		$("#vcode").hide();
		$("#reqType").hide();
	}else{
		$("#vcode").show();
		$("#reqType").show();
	}
		
	
});

$("#segmentC").on("change",function(){
	$('#stoneShapeC').empty().append('<option value="" selected>--Select--</option>');
	$('#clarityC').empty().append('<option value="" selected>--Select--</option>');
	$('#wtRangeC').empty().append('<option value="" selected>--Select--</option>');
	$('#colorC').empty().append('<option value="" selected>--Select--</option>');
	$('#cutGradeC').empty().append('<option value="" selected>--Select--</option>');
	$('#actualColorC').empty().append('<option value="" selected>--Select--</option>');
	$('#subCatC').empty().append('<option value="" selected>--Select--</option>');
	if($("#sdvTypeC").val() == "External" && $("#segmentC option:selected").text() == "Diamond"){
		$("#claritySectionC").show();
		$("#colorSectionC").show();
		$("#cutGradeSectionC").show();
		$("#wtRangeSectionC").show();
		$("#ctRangeSectionC").hide();
		$("#subCatSectionC").hide();
		$("#shapeSectionC").show();
		$("#actualColorSectionC").hide();
	}else{
		$("#claritySectionC").hide();
		$("#colorSectionC").hide();
		$("#cutGradeSectionC").hide();
		$("#wtRangeSectionC").hide();
		$("#ctRangeSectionC").hide();
		$("#shapeSectionC").hide();
		$("#subCatSectionC").hide();
		$("#actualColorSectionC").hide();
	}
	if($("#segmentC option:selected").text() == "Diamond"){
		$("#subCatSectionC").hide();
		$("#ctRangeSectionC").hide();
	}else{
		$("#subCatSectionC").show();
		$("#ctRangeSectionC").show();
	}
});

$("#catC").on("change",function(){
	var category = $("#catC option:selected").text();
	if($("#sdvTypeC").val() == "External" && (category== "CD Melees" || category == "CD Pointers" || category == "CD Solitaire")){
		$("#actualColorSectionC").show();
	}else{
		$("#actualColorSectionC").hide();
	}
	
	 if( $("#sdvTypeC").val() == "External" && $("#segmentC option:selected").text() == "Diamond"){
		var fieldFilters = {
				"fieldFilters" : {
					"suppliedBy" : "CO",
					"sSegId" : $("#segmentC").val(),
					"sSeg" : $("#segmentC option:selected").text(),
					"catId" : $("#catC").val()
				}
			};

			$('#wtRangeC').empty().append('<option value="" selected>--Select--</option>');
			$('#stoneShapeC').empty().append('<option value="" selected>--Select--</option>');
			
			postJSON('/OrderExecution/api/v1/getShapes', JSON.stringify(fieldFilters), function(data) {
				var subCatList = data.payload.subCatList;
				$.each(subCatList, function(k, v) {
					$('#stoneShapeC').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
				});
			});
	}else{
	var fieldFilters = {
			"fieldFilters" : {
				"suppliedBy" : "CO",
				"sSegId" : $("#segmentC").val(),
				"sSeg" : $("#segmentC option:selected").text(),
				"catId" : $("#catC").val()
			}
		};
		$('#subCatC').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getStoneSubCategories', JSON.stringify(fieldFilters), function(data) {
			var subCatList = data.payload.subCatList;
			$.each(subCatList, function(k, v) {
				$('#subCatC').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
			});
		});
	 }
});

$('#stoneShapeC').on("change",function(){
	var fieldFilters = {
			"fieldFilters" : {
				 "sSeg":  $("#segmentC option:selected").attr('attr'),
				  "catCode": $("#catC option:selected").attr('attr'),
				  "suppliedBy": "CO",
				  "shapeCode": $("#stoneShapeC option:selected").attr('code')
			}
		};
		$('#clarityC').empty().append('<option value="" selected>--Select--</option>');
		$('#wtRangeC').empty().append('<option value="" selected>--Select--</option>');
		$('#colorC').empty().append('<option value="" selected>--Select--</option>');
		$('#cutGradeC').empty().append('<option value="" selected>--Select--</option>');
		$('#actualColorC').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(fieldFilters), function(data) {
			var weightSlabList = data.payload.weightSlab;
			var clarityList = data.payload.clarity;
			var colorList = data.payload.color;
			var cutGradeList = data.payload.cutGrade;
			var actualColor = data.payload.actualColor;

			$.each(weightSlabList, function(k, v) {
				$('#wtRangeC').append('<option code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
			});

			$.each(clarityList, function(key, val) {
				$('#clarityC').append('<option code="' + val.id + '" value="' + val.id+ '">' + val.id + '</option>');
			});

			$.each(colorList, function(ke, va) {
				$('#colorC').append('<option code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
			});

			$.each(cutGradeList, function(ke, va) {
				$('#cutGradeC').append('<option code="' + va.id + '" value="' + va.id+ '">' + va.id + '</option>');
			});

			$.each(actualColor, function(ke, va) {
				$('#actualColorC').append('<option code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
			});
	 });
})

$("#claritySectionE").hide();
$("#actualColorSectionE").hide();
$("#colorSectionE").hide();
$("#cutGradeSectionE").hide();
$("#wtRangeSectionE").hide();
$("#ctRangeSectionE").hide();
$("#subCatSectionE").hide();
$("#shapeSectionE").hide();

$("#sdvTypeE").on("change",function(){
	$('#subCatE').val("");
	$('#clarityE').val("");
	$('#wtRangeE').val("");
	$('#stoneShapeE').val("");
	$('#colorE').val("");
	$('#cutGradeE').val("");
	$('#actualColorE').val("");
	$("#segmentE").val("");
	$("#catE").val("");
	$("#vendorCodeE-value").val("");
	$("#vendorCodeE").val("")
});

$("#segmentE").on("change",function(){
	
	$('#stoneShapeE').empty().append('<option value="" selected>--Select--</option>');
	$('#clarityE').empty().append('<option value="" selected>--Select--</option>');
	$('#wtRangeE').empty().append('<option value="" selected>--Select--</option>');
	$('#colorE').empty().append('<option value="" selected>--Select--</option>');
	$('#cutGradeE').empty().append('<option value="" selected>--Select--</option>');
	$('#actualColorE').empty().append('<option value="" selected>--Select--</option>');
	$('#subCatE').empty().append('<option value="" selected>--Select--</option>');
	if($("#sdvTypeE").val() == "External" && $("#segmentE option:selected").text() == "Diamond"){
		$("#claritySectionE").show();
		$("#colorSectionE").show();
		$("#cutGradeSectionE").show();
		$("#wtRangeSectionE").show();
		$("#ctRangeSectionE").hide();
		$("#shapeSectionE").show();
	}else{
		$("#claritySectionE").hide();
		$("#shapeSectionE").hide();
		$("#colorSectionE").hide();
		$("#cutGradeSectionE").hide();
		$("#wtRangeSectionE").hide();
		$("#ctRangeSectionE").hide();
	}
	if($("#segmentE option:selected").text() == "Diamond"){
		$("#subCatSectionE").hide();
		$("#ctRangeSectionE").hide();
	}else{
		$("#subCatSectionE").show();
		$("#ctRangeSectionE").show();
	}
});
	
$("#catE").on("change",function(){
	var category = $("#catE option:selected").text();
	if($("#sdvTypeE").val() == "External" && (category== "CD Melees" || category == "CD Pointers" || category == "CD Solitaire")){
		$("#actualColorSection").show();
	}else{
		$("#actualColorSection").hide();
	}
	
	 if( $("#sdvTypeE").val() == "External" && $("#segmentE option:selected").text() == "Diamond"){
		var fieldFilters = {
				"fieldFilters" : {
					"suppliedBy" : "CO",
					"sSegId" : $("#segmentE").val(),
					"sSeg" : $("#segmentE option:selected").text(),
					"catId" : $("#catE").val()
				}
			};

			$('#wtRangeE').empty().append('<option value="" selected>--Select--</option>');
			$('#stoneShapeE').empty().append('<option value="" selected>--Select--</option>');
			
			postJSON('/OrderExecution/api/v1/getShapes', JSON.stringify(fieldFilters), function(data) {
				var subCatList = data.payload.subCatList;
				$.each(subCatList, function(k, v) {
					$('#stoneShapeE').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
				});
			});
	}else{
	var fieldFilters = {
			"fieldFilters" : {
				"suppliedBy" : "CO",
				"sSegId" : $("#segmentE").val(),
				"sSeg" : $("#segmentE option:selected").text(),
				"catId" : $("#catE").val()
			}
		};
		$('#subCatE').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getStoneSubCategories', JSON.stringify(fieldFilters), function(data) {
			var subCatList = data.payload.subCatList;
			$.each(subCatList, function(k, v) {
				$('#subCatE').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
			});
		});
	 }
});

$('#stoneShapeE').on("change",function(){
	var fieldFilters = {
			"fieldFilters" : {
				 "sSeg":  $("#segmentE option:selected").attr('attr'),
				  "catCode": $("#catE option:selected").attr('attr'),
				  "suppliedBy": "CO",
				  "shapeCode": $("#stoneShapeE option:selected").attr('code')
			}
		};
		$('#clarityE').empty().append('<option value="" selected>--Select--</option>');
		$('#wtRangeE').empty().append('<option value="" selected>--Select--</option>');
		$('#colorE').empty().append('<option value="" selected>--Select--</option>');
		$('#cutGradeE').empty().append('<option value="" selected>--Select--</option>');
		$('#actualColorE').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(fieldFilters), function(data) {
			var weightSlabList = data.payload.weightSlab;
			var clarityList = data.payload.clarity;
			var colorList = data.payload.color;
			var cutGradeList = data.payload.cutGrade;
			var actualColor = data.payload.actualColor;

			$.each(weightSlabList, function(k, v) {
				$('#wtRangeE').append('<option code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
			});

			$.each(clarityList, function(key, val) {
				$('#clarityE').append('<option code="' + val.id + '" value="' + val.id+ '">' + val.id + '</option>');
			});

			$.each(colorList, function(ke, va) {
				$('#colorE').append('<option code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
			});

			$.each(cutGradeList, function(ke, va) {
				$('#cutGradeE').append('<option code="' + va.id + '" value="' + va.id+ '">' + va.id + '</option>');
			});

			$.each(actualColor, function(ke, va) {
				$('#actualColorE').append('<option code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
			});
	 });
})

//loadPermission();

$("#sdvCreate").hide();
$("#sdvEdit").hide();
$("#backToSearch").hide();
$("#create").show();
$("#createHeaderId").hide();
$("#editHeaderId").hide();

$("#create").on('click',function(){
	$("#sdvSearch").hide();
	$("#sdvCreate").show();
	$("#createHeaderId").show();
	$("#searchHeaderId").hide();
	$("#backToSearch").show();
	$("#create").hide();
	$("#sdvEdit").hide();
	$("#editHeaderId").hide();
	$('#adjustmentVoucherStoneC').trigger("reset");
	$("#stoneAccLocC").prop('disabled',false);
	onloadLov();
});

$("#backToSearch").on('click',function(){
	redirect();
});

var redirect = function(){
	$("#sdvCreate").hide();
	$("#backToSearch").hide();
	$("#create").show();
	$("#sdvSearch").show();
	$("#sdvCreate").hide();
	$("#createHeaderId").hide();
	$("#searchHeaderId").show();
	$("#sdvEdit").hide();
	$("#editHeaderId").hide();
	$('#adjustmentVoucherStoneS').trigger("reset");
	$("#jqxgrid").hide();
}

$("#fromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDate").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});

$("#stonePcsC").on('change',function(){
	if (this.value.match(/[^0-9]/g)) {
		   this.value = this.value.replace(/[^0-9]/g, '');
	}
});

$("#stonePcsE").on('change',function(){
	if (this.value.match(/[^0-9]/g)) {
		 this.value = this.value.replace(/[^0-9]/g, '');
	}
});

$("docNoC").on('change',function(){
	if (this.value.match(/[^0-9]/g)) {
		 this.value = this.value.replace(/[^0-9]/g, '');
	}
});

$("#docNoE").on('change',function(){
	if (this.value.match(/[^0-9]/g)) {
		 this.value = this.value.replace(/[^0-9]/g, '');
	}
});

function validateNumber(val) {
	var regex = /^\d{0,9}(\.\d{0,3})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(3);
	}
	return '';
}

function validateNumbers(val) {
	var regex = /^\d{0,9}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}

var stores ,dc,vendorList;
var onloadLov = function(){
	$.getJSON('/OrderExecution/api/v1/adjustmentVoucherStoneLOVs', function(data) {
		stores = data.payload.storeList;
		dc= data.payload.DcList;
		$("#adjDateC").val(data.payload.SystemDate);
		
		$('#sdvTypeS').empty().append('<option value="" selected>--Select--</option>');
		$('#sdvTypeC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.AdjustmentTypes, function(key, val) {
			$('#sdvTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
			$('#sdvTypeC').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		
		$('#segmentS').empty().append('<option value="" selected>--Select--</option>');
		$('#segmentC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.segments, function(key, val) {
			$('#segmentS').append('<option value="' + val.id + '" attr="'+val.code+'">' + val.description +  '</option>');
			$('#segmentC').append('<option value="' + val.id + '" attr="'+val.code+'">' + val.description +  '</option>');
		});
		
		$('#cdFlagC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.DebitCreditTypes, function(key, val) {
			$('#cdFlagC').append('<option value="' + val.id + '">' + val.name +  '</option>');
		});
		
		$('#docTypeC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.DocTypes, function(key, val) {
			$('#docTypeC').append('<option value="' + val.id + '">' + val.name +  '</option>');
		});
		
		$('#uomC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.UOM, function(key, val) {
			$('#uomC').append('<option value="' + val.id + '">' + val.name +  '</option>');
		});
		
		vendorList = data.payload.vendors;
		var data = [];
		$.each(vendorList, function(key, value) {
			data.push({
				value : value.id,
				label : value.name
			});
		});

		$(function() {
			$("#vendorCode").autocomplete({

				source : data,
				focus : function(event, ui) {

					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#vendorCode-value").val(ui.item.value);
				}
			});
		});
		
		$(function() {
			$("#vendorCodeC").autocomplete({

				source : data,
				focus : function(event, ui) {

					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#vendorCodeC-value").val(ui.item.value);
				}
			});
		});
	});	
}

onloadLov();

$("#storeDcS").on('change',function(){
	$('#storeDcNameS').empty().append('<option value="" selected>--Select--</option>');
	var storeDc = $("#storeDcS").val();
	var storeDcName ;
	if(storeDc == "Store"){
		storeDcName = stores;
	}else if(storeDc == "DC"){
		storeDcName = dc;
	}else{
		storeDcName = " ";
	}
	
	if(storeDc !="" || storeDc != null){
		$('#storeDcNameS').empty().append('<option value="" selected>--Select--</option>');
		$.each(storeDcName, function(key, val) {
			$('#storeDcNameS').append('<option value="' + val.id + '">' + val.name +  '</option>');
		});
	 }
});

$("#storeDcC").on('change',function(){
	$('#storeDcNameC').empty().append('<option value="" selected>--Select--</option>');
	var storeDcC = $("#storeDcC").val();
	var storeDcNameC ;
	if(storeDcC == "Store"){
		storeDcNameC = stores;
	}else if(storeDcC == "DC"){
		storeDcNameC = dc;
	}else{
		storeDcName = " ";
	}
	
	if(storeDcC !="" || storeDcC != null){
		$('#storeDcNameC').empty().append('<option value="" selected>--Select--</option>');
		$.each(storeDcNameC, function(key, val) {
			$('#storeDcNameC').append('<option value="' + val.id + '" >' + val.name +  '</option>');
		});
	 }
});

$("#segmentS").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/adjmntVoucherGetCategory?segmentId='+$("#segmentS").val(), function(data) {
		$('#catS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.StoneCategories, function(key, val) {
			$('#catS').append('<option value="' + val.id + '" attr="'+val.code+'">' + val.description + '</option>');
		});
	});
});

$("#segmentC").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/adjmntVoucherGetCategory?segmentId='+$("#segmentC").val(), function(data) {
		$('#catC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.StoneCategories, function(key, val) {
			$('#catC').append('<option value="' + val.id + '" attr="'+val.code+'">'  + val.description + '</option>');
		});
	});
});

var docSlArr = [];
$("#docNoC").on('change',function(){
	if($("#docTypeC").val() == "" || $("#docTypeC").val() == null){
		$.growl.error({
			message : "Please Enter Doc Type !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	$('#docSlNoC').empty().append('<option value="" selected>--Select--</option>');
	if($("#docNoC").val() != ""){
		$.getJSON('/OrderExecution/api/v1/getDocSrlNoList?docType='+$("#docTypeC").val()+'&docNo='+$("#docNoC").val(), function(data) {
			if(data.resCode == 1){
				docSlArr = data.payload.docSrlNos;
				$('#docSlNoC').empty().append('<option value="" selected>--Select--</option>');
				$.each(data.payload.docSrlNos, function(key, val) {
					$('#docSlNoC').append('<option value="' + val.id + '">' + val.id + '</option>');
				});
			}else if (data.resCode == 2){
				$.growl.error({
					message :data.mesgStr,
					duration : 10000,
					title :'Error'
				});
				return false;
			}else{}
			
		});
	}
});

var docNoArrE = [];
$("#docNoE").on('change',function(){
	if($("#docTypeE").val() == "" || $("#docTypeE").val() == null){
		$.growl.error({
			message  : "Please Enter Doc Type !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	$('#docSlNoE').empty().append('<option value="" selected>--Select--</option>');
	if($("#docNoE").val() != ""){
		$.getJSON('/OrderExecution/api/v1/getDocSrlNoList?docType='+$("#docTypeE").val()+'&docNo='+$("#docNoE").val(), function(data) {
			if(data.resCode == 1){
				docNoArrE = data.payload.docSrlNos;
				$('#docSlNoE').empty().append('<option value="" selected>--Select--</option>');
				$.each(data.payload.docSrlNos, function(key, val) {
					$('#docSlNoE').append('<option value="' + val.id + '">' + val.id + '</option>');
				});
			}else if (data.resCode == 2){
				$.growl.error({
					message :data.mesgStr,
					duration : 10000,
					title :'Error'
				});
				return false;
			}else{}
			
		});
	}
});

$("#sdvTypeS").on('change',function(){
	if($("#sdvTypeS").val() == "Internal"){
		$("#stoneAccountLocS").prop('disabled',false);
	}else{
		$("#stoneAccountLocS").prop('disabled',true);
		$("#stoneAccountLocS").val("");
	}
});

$("vcode").hide();
$("#sdvTypeC").on('change',function(){
	if($("#sdvTypeC").val() == "Internal"){
		$("#stoneAccLocC").prop('disabled',false);
		$("vcode").hide();
	}else{
		$("#stoneAccLocC").prop('disabled',true);
		$("#stoneAccLocC").val("");
		$("vcode").show();
	}
});

$("#sdvTypeE").on('change',function(){
	if($("#sdvTypeE").val() == "Internal"){
		$("#stoneAccLocE").prop('disabled',false);
	}else{
		$("#stoneAccLocE").prop('disabled',true);
		$("#stoneAccLocE").val("");
	}
});

$("#catS").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/getLocationCodesForAdjStone?segmentId='+$("#segmentS").val()+'&categoryId='+$("#catS").val(), function(data){
	  $('#stoneAccountLocS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.LocCodeList, function(key, val) {
		  $('#stoneAccountLocS').append('<option value="' + val.locationCode + '">' + val.locationCode + '</option>');
		});
		
	  $('#stoneCodeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.stoneCodeList, function(key, val) {
		  $('#stoneCodeS').append('<option value="' + val.stoneCode + '">' + val.stoneCode + '</option>');
		});
	});
});

var subCategory;
$("#catC").on('change',function(){
	if($("#sdvTypeC").val() == "Internal"){
		$("#stoneAccLocC").prop('disabled',false);
	}else{
		$("#stoneAccLocC").prop('disabled',true);
	}
	
	$.getJSON('/OrderExecution/api/v1/getLocationCodesForAdjStone?segmentId='+$("#segmentC").val()+'&categoryId='+$("#catC").val(), function(data){
		subCategory = data.payload.subCatDesc;
		 var pktArr = [];
		 $.each(subCategory,function(k,v){
			 if(v.packetId != null){
				 pktArr.push(v.packetId);
			 }
		 });
		  $('#stoneAccLocC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.LocCodeList, function(key, val) {
			  $('#stoneAccLocC').append('<option value="' + val.locationCode + '">' + val.locationCode + '</option>');
			});
			
		 $('#pktIdC').empty().append('<option value="" selected>--Select--</option>');
		  $.each(pktArr, function(key, val) {
			 $('#pktIdC').append('<option value="' + val + '">' + val + '</option>');
		 });
		
		$('#stoneCodeC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.stoneCodeList, function(key, val) {
			 $('#stoneCodeC').append('<option value="' + val.stoneCode + '">' + val.stoneCode + '</option>');
		});
	});
});

$("#pktIdC").on('change',function(){
	var pId = $("#pktIdC option:selected").text();
	$.each(subCategory,function(k,v){
		if(pId == v.packetId){
			$("#subCatDescpC").val(v.subCategoryDescription);
		}
	});
});

var saveAdj = function(){
	
	
	var createParams = 
			{
			  "adjustmentDate": $("#adjDateC").val(),
			  "stoneSegment": {"id": $("#segmentC").val()},
			  "adjustmentType": {"id": $("#sdvTypeC").val()},
			  "locationCode": ($("#sdvTypeC").val() == "Internal") ? $("#stoneAccLocC").val() : null ,
			  "debitOrCreditType": {"id": $("#cdFlagC").val()},
			  "remarks": $("#remarksC").val(),
			  "materialType": {"id": "S"},
			  "stoneWeight": $("#stoneWtC").val(),
			  "storeOrDc": {
				    "id" : $("#storeDcNameC").val(),
				    "name":$("#storeDcC").val()
				  },
			  "vendor": ($("#vendorCodeC-value").val() != "" ? {"id": $("#vendorCodeC-value").val()} : {"id": null}),
			  "category":{"id": parseInt($("#catC").val())},
			  "docType" : $("#docTypeC").val(),
			  "docNo" : $("#docNoC").val(),
			  "voucherValue":$("#voucherValC").val(),
			  "docSrlNo":$("#docSlNoC").val(),
			  "uqc": {
				   "id": $("#uomC").val(),
				   "name":$("#uomC option:selected").text()
			   },
			  "bptype":{
				  "id":$("#typeC").val(),
				  "name":$("#typeC option:selected").text()
			  },
			  "color":$("#colorC").val(),
			  "clarity":$("#clarityC").val(),
			  "actualColor":$("#actualColorC").val(),
			  "cutGrade":$("#cutGradeC").val(),
			  "weightRange":$("#wtRangeC").val(),
			  "costRange":$("#ctRangeC").val(),
			  "shape":$("#stoneShapeC").val(),
			  "shapeDes": $("#stoneShapeC option:selected").attr('code'),
			  "subCategory":$("#subCatC").val(),
			  "pcs":$("#stonePcsC").val(),
			  "packetId":$("#pktIdC").val(),
			  "isManual":{ "id":"Yes"},
			  "stoneCode": $("#stoneCodeC option:selected").text()
		 }
	postJSON('/OrderExecution/api/v1/createAdjustmentVoucherForStones',JSON.stringify(createParams),function(response) {
		if(response.resCode == 1){
			$.growl.notice({
				message : response.mesgStr,
				duration : 1000,
				title : 'Success'
			});
			authorization('A', 2, response.id);
			//redirect();
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
}
// Create functionality
$("#saveAdjVoucher").on('click',function(){
	var docType = $("#docTypeC").val(); 
	if($("#storeDcC").val() == "" || $("#storeDcNameC").val() == "" || $("#sdvTypeC").val() == "" || $("#segmentC").val() == "" || $("#uomC").val() == ""
		|| $("#catC").val() == "" || $("#cdFlagC").val() == "" || $("#stoneWtC").val() == "" || $("#stonePcsC").val() == "" || $("#voucherValC").val() == ""
			|| $("#remarksC").val() == "" ||  $("#stoneCodeC").val() == "")
		{
			$.growl.error({
				message : "Please Fill Mandatory field !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	if($("#sdvTypeC").val() == "External"){
		console.log($("#vendorCodeC-value").val());
	     if(($("#segmentC").val() != null) && ($("#segmentC option:selected").text() == "Diamond")){
	    	 if($('#clarityC').val() == "" || $('#clarityC').val() == null ||  $('#wtRangeC').val() == "" || $('#wtRangeC').val() == null ||
	    	  $('#colorC').val() == "" || $('#colorC').val() == null ||$('#cutGradeC').val() == "" || $('#cutGradeC').val() == null || 
	    	  $('#stoneShapeC').val() == "" || $('#stoneShapeC').val() == null ){
	    		 $.growl.error({
	 				message : "Please Select the Mandatory field!",
	 				duration : 10000,
	 				title : 'Error'
	 			});
	 			return false;
	    	 }else if($("#catC option:selected").attr("attr")=="CP" || $("#catC option:selected").attr("attr")=="CM" || $("#catC option:selected").attr("attr")=="CS"){
	    		 if($('#actualColorC').val() == "" || $('#actualColorC').val() == null){
	    			 $.growl.error({
	 	 				message : "Please Select the Mandatory field!",
	 	 				duration : 10000,
	 	 				title : 'Error'
	 	 			});
	 	 			return false;
	    		 }
	    	 }
	     }else{
	    	 if(($("#subCatC").val() == null || $("#subCatC").val() == "") || ($("#ctRangeC").val() == "" || $("#ctRangeC").val() == null || $("#vendorCodeC-value").val() == "")){
	    		 $.growl.error({
		 				message : "Please Select the Mandatory field!",
		 				duration : 10000,
		 				title : 'Error'
		 			});
		 			return false;
	    	 }
	     }
	     if($("#typeC").val() == ""){
	    	 $.growl.error({
	    		message : "Please Select Type !!!",
	    		duration : 1000,
	    		title : 'Error'
	    	 });
	    	 return false;
	     }
	}
	
	
	if($("#sdvTypeC").val() == "Internal"){
		if($("#stoneAccLocC").val() == "" ){
			$.growl.error({
				message : "Please Select Stone Account Location !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}
	/*if(docType != ""){
		if($("#docNoC").val() == ""){
		$.growl.error({
			message : "Please Enter Doc No !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
		}
	}*/
	
	/*if($("#docNoC").val() != "" && docSlArr.length !=0){
		if($("#docSlNoC").val() == ""){
		$.growl.error({
			message : "Please Enter Doc Sl No !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
		}
	}*/
	var authorization = {
			"code" : "AV",
			"description" : "Adjustment Voucher",
			"docType" : "ADJS",
			"docNo" : null,
			"transactionAmt" : null,
	}
	
	localStorage.setItem("authorization",JSON.stringify(authorization));
	openNav('AV');
});

var sdvFieldFilters = function() {
	var vendorCode = $('#vendorCode-value').val();
	var sdvTypeS = $("#sdvTypeS").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	var segmentS = $("#segmentS").val();
	var catS = $('#catS').val();
	var typeS = $('#typeS').val();
	var stoneAccountLocS = $('#stoneAccountLocS').val();
	var storeDcS = $('#storeDcS').val();
	var storeDcNameS = $('#storeDcNameS').val();
	var stoneCodeS = $('#stoneCodeS').val();
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendor"] = vendorCode;
	}
	if (sdvTypeS != "" && sdvTypeS != null) {
		fieldFilters.fieldFilters["adjustType"] = sdvTypeS;
	}
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["stoneSegId"] = segmentS;
	}
	if (catS != "" && catS != null) {
		fieldFilters.fieldFilters["catId"] = catS;
	}
	if (stoneCodeS != "" && stoneCodeS != null) {
		fieldFilters.fieldFilters["stoneCode"] = stoneCodeS;
	}
	if (typeS != "" && typeS != null) {
		fieldFilters.fieldFilters["bptype"] = typeS;
	}
	if (stoneAccountLocS != "" && stoneAccountLocS != null) {
		fieldFilters.fieldFilters["locCode"] = stoneAccountLocS;
	}
	if (storeDcS == "DC") {
		fieldFilters.fieldFilters["DC"] = storeDcNameS;
	}
	if (storeDcS == "Store") {
		fieldFilters.fieldFilters["Store"] = storeDcNameS;
	}

	return fieldFilters;
}

$("#search").on('click',function(){
	adjVoucherStoneSearch();
	$("#jqxgrid").show();
});


//Search grid started
function adjVoucherStoneSearch() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [
		{name : 'adjVouchNo', type : 'int','map': 'id'},
		{name : 'adjCreatedDate', type : 'string','map': 'adjustmentDate'},
		{name : 'seg', type : 'string','map': 'stoneSegment>description'},
		{name:  'cat', type: 'string','map' : 'category>description'},
		{name : 'adjType', type : 'string','map' : 'adjustmentType>id'},
		{name : 'creditOrDebit', type :'string','map':'debitOrCreditType>id'},
		{name : 'locCode', type :'string','map':'locationCode'},
		{name : 'vendCode', type :'string','map':'vendor>vendorCode'},
		{name : 'stoneWt', type : 'double','map':'stoneWeight'},
		{name : 'stonePcs', type : 'int','map':'pcs'},
		{name:  'uom', type: 'string','map' : 'uqc>id'},
		{name : 'manualOrSystem', type : 'string','map' : 'isManual>id'},
		{name : 'postedDate', type :'date','map':'authorizedDate'},
		{name : 'postedBy', type :'string','map':'authorizedBy>name'},
		{name : 'authBy', type : 'string','map':'authorizedBy>name'},
		{name : 'authDate', type : 'string','map':'authorizedDate'},
		{name : 'remarks', type : 'string','map':'remarks'},
		{name : 'stoneCode', type : 'string'},
		{name : 'postFlag', type : 'string','map':'adjustmentPosted>id'},
		{'name' : 'actionId','type' : 'int','map' : 'id'} ];

	var columns = [ { text : 'Adj Voucher No', datafield : 'adjVouchNo', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : true},
		{ text : 'Adj Voucher Created Date', datafield : 'adjCreatedDate', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'dd/MM/yyyy'},
		{ text : 'Seg', datafield : 'seg', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		{ text : 'Cat', datafield : 'cat', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		{ text : 'Stone Code', datafield : 'stoneCode', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
		{ text : 'Adjustment Type', datafield : 'adjType', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
		{ text : 'Credit/Debit', datafield : 'creditOrDebit', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		{ text : 'Vendor Code', datafield : 'vendCode', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		{ text : 'Loc Code', datafield : 'locCode', width : '4.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
		{ text : 'Stone Wt.', datafield : 'stoneWt', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false ,cellsformat : 'd3'},
		{ text : 'Stone Pcs', datafield : 'stonePcs', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		{ text : 'UQC', datafield : 'uom', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		{ text : 'Manual/System Generated', datafield : 'manualOrSystem', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2',
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
    			var manualOrSys = $('#jqxgrid').jqxGrid('getcellvalue', row, 'manualOrSystem');
    		    var val ;
    		    if(manualOrSys == "No"){
    		    	val = "System"
    		    }else{
    		    	val = "Manual"
    		    }
    			return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + val  + '</div>';
    		 }
		},
		{ text : 'SDV Remarks', datafield : 'remarks', width : '7.5%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
		{ text : 'Posted Date', datafield : 'postedDate', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'dd/MM/yyyy'},
		{ text : 'Posted By', datafield : 'postedBy', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
		{ text : 'Authorized By', datafield : 'authBy', width : '6.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
		{ text : 'Authorized Date', datafield : 'authDate', width : '6.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'dd/MM/yyyy'},
		{ text : '',datafield : 'actionId',cellsrenderer : editAdjVoucherStone,editable : false,cellsalign : 'center',align : 'center','width' : '6%'},
		{text:'',datafield:'postFlag',hidden:true}];
	showMyGrid(datafields, "/OrderExecution/api/v1/adjustVouchForStoneSearch", "list",columns, sdvFieldFilters(), updateRows, "");
		$("#jqxgrid").jqxGrid({	
		width : '100%',
	    sortable: true,            
	 	altrows: true,
		columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
	    autoheight :true,
	    columnsheight: 75,
		rowdetails : true,
		virtualmode : true,
 });
}

var editAdjVoucherStone = function (row, columnfield, value, defaulthtml, columnproperties) {
	var adjustmentPosted = $("#jqxgrid").jqxGrid('getrowdata', row).postFlag;
	if(adjustmentPosted == "No"){
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"  data-target="#btnEditAdjVouchStone" type="button" id='
	+ row
	+ ' onclick="editAdjustmentVoucherStone('
	+ value
	+ ')" ><span class="fa fa-pencil fa-lg"></span> </button><button class="btn btn-sm btn-success"  type="button" id='
	+ row
	+ ' onclick="postAdjustmentVoucherStone('
	+ value
	+ ')" ><span class="fa fa-share-square-o fa-lg"></span></button>';}
	else{
		return '<button class="btn btn-sm btn-primary"  type="button" disabled><span class="fa fa-pencil fa-lg"></span> </button><button class="btn btn-sm btn-default"  type="button"  disabled><span class="fa fa-share-square-o fa-lg"></span> </button>';
	}
}

var packetId,stAccLoc,docSlflag = false,subCatDescp ;
var editAdjustmentVoucherStone = function(id){
	$("#sdvCreate").hide();
	$("#sdvSearch").hide();
	$("#sdvEdit").show();
	$("#backToSearch").show();
	$("#searchHeaderId").hide();
	$("#createHeaderId").hide();
	$("#editHeaderId").show();
	$("#create").hide();
	$.getJSON('/OrderExecution/api/v1/getAdjustmentVoucherForStones?id='+id, function(data){
		if(data.resCode == 1){
			var result = data.payload.adjustmentVoucher;
			$("#remarksE").val(result.remarks);
			$("#adjVouchIdE").val(result.id);
			
			if(result.vendor != null){
				$("#vendIdE").val(result.vendor.id);
			}
			
			if(result.isManual != null){
				$("#isManualE").val(result.isManual.id);
			}
			
			if(result.stoneWeight != " "){
				$("#stoneWtE").val((result.stoneWeight).toFixed(3));
			}
			
			if(result.storeOrDc != null){
				$("#storeDcIdE").val(result.storeOrDc.id);
			}
			
			if(result.stoneSegment != null){
				$("#segmIdE").val(result.stoneSegment.id);
			}
			
			if(result.category != null){
				$("#catIdE").val(result.category.id);
			}
			
			if(result.storeOrDcType != null){
				$("#storeDcE").val(result.storeOrDcType.id);
			}
			if(result.bptype != null){
				$("#typeE").val(result.bptype.id);
			}
			
			if(result.adjustmentType.name == "External" && result.stoneSegment.description == "Diamond"){
 				    $("#claritySectionE").show();
					$("#shapeSectionE").show();
					$("#colorSectionE").show();
					$("#cutGradeSectionE").show();
					$("#wtRangeSectionE").show();
					$("#ctRangeSectionE").hide();
 				var fieldFilters = {
 						"fieldFilters" : {
 							"suppliedBy" : "CO",
 							"sSegId" : result.stoneSegment.id,
 							"sSeg" : result.stoneSegment.description,
 							"catId" : result.category.id
 						}
 					};
 					$('#wtRangeE').empty().append('<option value="" selected>--Select--</option>');
 					$('#stoneShapeE').empty().append('<option value="" selected>--Select--</option>');
 					
 					postJSON('/OrderExecution/api/v1/getShapes', JSON.stringify(fieldFilters), function(data) {
 						var subCatList = data.payload.subCatList;
 						$.each(subCatList, function(k, v) {
 							if(result.shape == v.name){
 							  $('#stoneShapeE').append('<option selected code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
 							}else{
 							  $('#stoneShapeE').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
 							}
 						});
 					});
 					
 					
 					var fieldFilters1 = {
 							"fieldFilters" : {
 								 "sSeg":  result.stoneSegment.code,
 								  "catCode":  result.category.code,
 								  "suppliedBy": "CO",
 								  "shapeCode": result.shape
 							}
 						};
 						$('#clarityE').empty().append('<option value="" selected>--Select--</option>');
 						$('#wtRangeE').empty().append('<option value="" selected>--Select--</option>');
 						$('#colorE').empty().append('<option value="" selected>--Select--</option>');
 						$('#cutGradeE').empty().append('<option value="" selected>--Select--</option>');
 						$('#actualColorE').empty().append('<option value="" selected>--Select--</option>');
 						postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(fieldFilters1), function(data) {
 							var weightSlabList = data.payload.weightSlab;
 							var clarityList = data.payload.clarity;
 							var colorList = data.payload.color;
 							var cutGradeList = data.payload.cutGrade;
 							var actualColor = data.payload.actualColor;

 							$.each(weightSlabList, function(k, v) {
 								if(result.weightRange == v.id){
 								    $('#wtRangeE').append('<option selected code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
 								}else{
 									$('#wtRangeE').append('<option code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
 								}
 							});

 							$.each(clarityList, function(k, v) {
 								if(result.clarity == v.id){
 								    $('#clarityE').append('<option selected code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
 								}else{
 									$('#clarityE').append('<option code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
 								}
 							});

 							$.each(colorList, function(k, v) {
 								if(result.color == v.id){
 								    $('#colorE').append('<option selected code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
 								}else{
 									$('#colorE').append('<option code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
 								}
 							});

 							$.each(cutGradeList, function(k, v) {
 								if(result.cutGrade == v.id){
 								    $('#cutGradeE').append('<option selected code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
 								}else{
 									$('#cutGradeE').append('<option code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
 								}
 							});
                            if(result.category.code == "CP" || result.category.code == "CS" || result.category.code == "CM"){
	 							$.each(actualColor, function(k, v) {
	 								if(result.actualColor == v.id){
	 								    $('#actualColorE').append('<option selected code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
	 								}else{
	 									$('#actualColorE').append('<option code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
	 								}
	 							});
                            }
 					  });
                    if(result.category.code =="CP" || result.category.code == "CM" || result.category.code == "CS"){
                    	$("#actualColorSectionC").show();
                    }else{
                    	$("#actualColorSectionC").hide();
                    }
 			}else{
 				$("#subCatSectionE").show();
 				$("#ctRangeSectionE").show();
 				if(result.subCategory != null){
 					getJSON('/OrderExecution/api/v1/costRangeBySubCategory?subCatId='+ result.subCategory, function(data) {
 	 					$('#ctRangeE').empty().append('<option value="" selected>-- Select Option --</option>');
 	 						$.each(data.payload.ranges ,function(key, val) {
 	 							if(result.costRange == val.id){
 	 							   $('#ctRangeE').append('<option selected value="' + val.id + '">'+ val.name + '-' + val.description + '</option>');
 	 							}else{
 	 							   $('#ctRangeE').append('<option value="' + val.id + '">'+ val.name + '-' + val.description + '</option>');
 	 							}
 	 					  });
 	 				});
 				}
 				var fieldFilters = {
 						"fieldFilters" : {
 							"suppliedBy" : "CO",
 							"sSegId" : result.stoneSegment.id,
 							"sSeg" : result.stoneSegment.description,
 							"catId" : result.category.id
 						}
 					};
				$('#subCatE').empty().append('<option value="" selected>--Select--</option>');
				postJSON('/OrderExecution/api/v1/getStoneSubCategories', JSON.stringify(fieldFilters), function(data) {
					var subCatList = data.payload.subCatList;
					$.each(subCatList, function(k, v) {
						if(result.subCategory == v.id){
							  $('#subCatE').append('<option selected code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
						}else{
							  $('#subCatE').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
						}
					});
					    
				});
			 }
			
			$("#stonePcsE").val(result.pcs);
			$("#docNoE").val(result.docNo);
			
			if(result.voucherValue != null || result.voucherValue != ""){
				$("#voucherValE").val(result.voucherValue);
			}
			
			
			$.getJSON('/OrderExecution/api/v1/getLocationCodesForAdjStone?segmentId='+$("#segmIdE").val()+'&categoryId='+$("#catIdE").val(), function(data){
				 subCatDescp = data.payload.subCatDesc ;
				 var pktIdArrE = [];
				 $.each(subCatDescp,function(k,v){
					 if(v.packetId != null){
								pktIdArrE.push({
									"id" : v.packetId,
									"name" : v.subCategoryDescription
								});
					 	}
				 });
				$('#pktIdE').empty().append('<option value="" selected>--Select--</option>');
				$.each(pktIdArrE, function(key, val) {
				if(result.packetId == val.id){
					  $('#pktIdE').append('<option selected value="' + val.id + '">' + val.id + '</option>');  
					  $("#subCatDescpE").val(val.name);
				  }else{
					  $('#pktIdE').append('<option value="' + val.id + '">' + val.id + '</option>');
				  }
				});
				
				 
				  
				 $('#stoneAccLocE').empty().append('<option value="" selected>--Select--</option>');
				  $.each(data.payload.LocCodeList, function(key, val) {
					
					  if(result.locationCode == val.locationCode){
						  $('#stoneAccLocE').append('<option selected value="' + val.locationCode + '">' + val.locationCode + '</option>');  
					  }else{
						  $('#stoneAccLocE').append('<option value="' + val.locationCode + '">' + val.locationCode + '</option>');
					  }
				 });
				  
				 $('#stoneCodeE').empty().append('<option value="" selected>--Select--</option>');
				  $.each(data.payload.stoneCodeList, function(key, val) {
					  if(result.stoneCode == val.stoneCode){
						  $('#stoneCodeE').append('<option selected value="' + val.stoneCode + '">' + val.stoneCode + '</option>');  
					  }else{
						  $('#stoneCodeE').append('<option value="' + val.stoneCode + '">' + val.stoneCode + '</option>');
					  }
				 });
				if(result.adjustmentType.name == "External"){
					$("#stoneAccLocE").prop('disabled',true);
					$("#stoneAccLocE").val("");
				}else{
					$("#stoneAccLocE").prop('disabled',false);
					}
			});
		
			$.getJSON('/OrderExecution/api/v1/adjmntVoucherGetCategory?segmentId='+$("#segmIdE").val(), function(data){
				 $('#catE').empty().append('<option value="" selected>--Select--</option>');
				  $.each(data.payload.StoneCategories, function(key, val) {
					  if(result.category.id == val.id){
						  $('#catE').append('<option selected value="' + val.id + '" attr="'+val.code+'">' + val.description + '</option>');  
					  }else{
						  $('#catE').append('<option value="' + val.id + '" attr="'+val.code+'">' + val.description + '</option>');
					  }
				 });
			});
			
			if(result.docType != null && $("#docNoE").val() != ""){
				$.getJSON('/OrderExecution/api/v1/getDocSrlNoList?docType='+result.docType+'&docNo='+$("#docNoE").val(), function(data) {
					if(data.resCode == '1'){
						docSlflag = true;
						$('#docSlNoE').empty().append('<option value="" selected>--Select--</option>');
						  $.each(data.payload.docSrlNos, function(key, val) {
							  if(result.docSrlNo == val.id){
								  $('#docSlNoE').append('<option selected value="' + val.id + '">' + val.id + '</option>');  
							  }else{
								  $('#docSlNoE').append('<option value="' + val.id + '">' + val.id + '</option>');
							  }
						 });
					}else{
						docSlflag = false;
						$('#docSlNoE').empty().append('<option value="" selected>--Select--</option>');
					}
				});
			}
		
			var adjTypeE = result.adjustmentType.name;
			var cdTypeE = result.debitOrCreditType.name;
			var segE = result.stoneSegment.code;
			var vendE = result.vendor.id;
			var storeDcNameE = result.storeOrDc.id;
			var docType = result.docType;
			var uom = result.uqc.id;
			if(docType == "BMRV" || docType == "LSS"){
				$("#docSlNoE").prop('disabled',true);
			}else{
				$("#docSlNoE").prop('disabled',false);
			}
 			editOnloadLov(adjTypeE,cdTypeE,segE,vendE,storeDcNameE,docType,uom);
		}
	});
}

var editOnloadLov = function(adjType,cdType,seg,vendor,storeDc,docType,uom){
	$.getJSON('/OrderExecution/api/v1/adjustmentVoucherStoneLOVs', function(data) {
		
		var storeDcType = $("#storeDcE").val();
		var storeDcArr = [];
		if(storeDcType == "Store"){
			storeDcArr = data.payload.storeList;
		}else if(storeDcType == "DC"){
			storeDcArr = data.payload.DcList;
		}else{
			storeDcArr = "";
		}

		$("#storeDcNameE").empty().append('<option value="" selected>--Select--</option>');
	    $.each(storeDcArr,function(key,val){
	    	if(storeDc != null){
	    		if (storeDc == val.id) {
	    			$("#storeDcNameE").append('<option selected value="'+val.id+'">'+ val.name + '</option>');
				}else{
					$("#storeDcNameE").append('<option value="'+val.id+'">'+ val.name +'</option>');
			    } 
	    	}else{
				$("#storeDcNameE").append('<option value="'+val.id+'">'+ val.name +'</option>');
		    } 
		});
		
		$("#sdvTypeE").empty().append('<option value="" selected>--Select--</option>');
	    $.each(data.payload.AdjustmentTypes,function(key,val){
		    	if(adjType != null){
		    		if (adjType == val.name) {
		    			$("#sdvTypeE").append('<option selected value="'+val.id+'">'+ val.name + '</option>');
					}else{
						$("#sdvTypeE").append('<option value="'+val.id+'">'+ val.name +'</option>');
				    } 
		    	}else{
					$("#sdvTypeE").append('<option value="'+val.id+'">'+ val.name +'</option>');
			    } 
		  });
	    
	    $("#segmentE").empty().append('<option value="" selected>--Select--</option>');
	    $.each(data.payload.segments,function(key,val){
	    	if(seg != null){
	    		if (seg == val.code) {
	    			$("#segmentE").append('<option selected value="'+val.id+'"  attr="'+val.code+'">'+ val.description + '</option>');
				}else{
					$("#segmentE").append('<option value="'+val.id+'"  attr="'+val.code+'">'+ val.description +'</option>');
			    } 
	    	}else{
				$("#segmentE").append('<option value="'+val.id+'"  attr="'+val.code+'">'+ val.description +'</option>');
		    } 
	   });
	    
	    $("#cdFlagE").empty().append('<option value="" selected>--Select--</option>');
	    $.each(data.payload.DebitCreditTypes,function(key,val){
	    	if(cdType != null){
	    		if (cdType == val.name) {
	    			$("#cdFlagE").append('<option selected value="'+val.id+'">'+ val.name + '</option>');
				}
	    		 else{
					$("#cdFlagE").append('<option value="'+val.id+'">'+ val.name +'</option>');
			    } 
	    	}else{
				$("#cdFlagE").append('<option value="'+val.id+'">'+ val.name +'</option>');
		    } 
	   });
	    
	    $("#docTypeE").empty().append('<option value="" selected>--Select--</option>');
	    $.each(data.payload.DocTypes,function(key,val){
	    	if(docType != null){
	    		if (docType == val.id) {
	    			$("#docTypeE").append('<option selected value="'+val.id+'">'+ val.name + '</option>');
				}else{
					$("#docTypeE").append('<option value="'+val.id+'">'+ val.name +'</option>');
				 } 
	    	}else{
				$("#docTypeE").append('<option value="'+val.id+'">'+ val.name +'</option>');
			  } 
	    	
	   });
	    
	    $("#uomE").empty().append('<option value="" selected>--Select--</option>');
	    $.each(data.payload.UOM,function(key,val){
	    	if(uom != null){
	    		if (uom == val.id) {
	    			$("#uomE").append('<option selected value="'+val.id+'">'+ val.name + '</option>');
				}else{
					$("#uomE").append('<option value="'+val.id+'">'+ val.name +'</option>');
			    } 
	    	}else{
				$("#uomE").append('<option value="'+val.id+'">'+ val.name +'</option>');
		    } 
	   });
	    
	    $("#vendorCodeE").empty().append('<option value="" selected>--Select--</option>');
	    $.each(data.payload.vendors,function(key,val){
	    	if(vendor != null){
	    		if (vendor == val.id) {
	    			$("#vendorCodeE").append('<option selected value="'+val.id+'">'+ val.name + '</option>');
				}else{
					$("#vendorCodeE").append('<option value="'+val.id+'">'+ val.name +'</option>');
			    } 
	    	}else{
				$("#vendorCodeE").append('<option value="'+val.id+'">'+ val.name +'</option>');
		    }
	   });
	    
	 });
}

$("#segmentE").on('change',function(){
	$("#segmIdE").val($("#segmentE").val()); 
	$.getJSON('/OrderExecution/api/v1/adjmntVoucherGetCategory?segmentId='+$("#segmentE").val(), function(data) {
		$('#catE').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.StoneCategories, function(key, val) {
			$('#catE').append('<option value="' + val.id + '"  attr="'+val.code+'">'  + val.description + '</option>');
		});
	});
});

$("#catE").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/getLocationCodesForAdjStone?segmentId='+$("#segmIdE").val()+'&categoryId='+$("#catE").val(), function(data){
	 $('#pktIdE').empty().append('<option value="" selected>--Select--</option>');
	 var pktId = data.payload.subCatDesc;
	 subCatDescp = data.payload.subCatDesc;
	 var pktIdArry = [];
	 $.each(pktId,function(k,v){
		 if(v.packetId != null){
			 pktIdArry.push(v.packetId);
		 }
	 });
	  $.each(pktIdArry, function(key, val) {
		 $('#pktIdE').append('<option value="' + val + '">' + val + '</option>');
	 });
	 
	  $('#stoneAccLocE').empty().append('<option value="" selected>--Select--</option>');
		 $.each(data.payload.LocCodeList, function(key, val) {
			 $('#stoneAccLocE').append('<option value="' + val.locName + '">' + val.locName + '</option>');
		 });
		 
		 $('#stoneCodeE').empty().append('<option value="" selected>--Select--</option>');
		 $.each(data.payload.stoneCodeList, function(key, val) {
			 $('#stoneCodeE').append('<option value="' + val.stoneCode + '">' + val.stoneCode + '</option>');
		 });
	  
	  if($("#sdvTypeE").val() == "Internal"){
			$("#stoneAccLocE").prop('disabled',false);
		}else{
			$("#stoneAccLocE").prop('disabled',true);
			$("#stoneAccLocE").val('');
		 }
	});
});

$("#pktIdE").on('change',function(){
	var pktId = $("#pktIdE").val();
	$.each(subCatDescp,function(k,v){
		if(v.packetId == pktId){
			$("#subCatDescpE").val(v.subCategoryDescription);
		}
	});
});

$("#editAdjvouchStone").on('click',function(){
	if($("#sdvTypeE").val() == "" || $("#segmentE").val() == "" || $("#catE").val() == "" || $("#vendorCodeE").val() == "" || $("#uomE").val() == "" || $("#stoneCodeE").val() == ""
		|| $("#cdFlagE").val() == "" || $("#stoneWtE").val() == "" || $("#stonePcsE").val() == "" || $("#remarksE").val() == "" || $("#voucherValE").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	if($("#sdvTypeE").val() == "Internal" && $("#sdvTypeE").val() != ""){
		if($("#stoneAccLocE").val() == ""){
			$.growl.error({
				message : 'Please Enter Stone Account Location !!!',
				duration : 10000,
				title : 'Error'
	 		});
			return false;
		}
	}
	/*if($("#docTypeE").val() != ""){
		if($("#docNoE").val() == ""){
			$.growl.error({
				message : "Please Enter Doc No !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}
	
	if($("#docNoE").val() != "" && docNoArrE.length !=0 || docSlflag == true ){
		if($("#docSlNoE").val() == ""){
			$.growl.error({
				message : "Please Select Doc Sl No. !!!",
				duration : 10000,
				title  : 'Error'
			});
			return false;
		}
	}*/
	
	var editParam = {
		"id":$("#adjVouchIdE").val(),
	  	"stoneSegment": {"id": $("#segmentE").val()},
		"adjustmentType": {"id": $("#sdvTypeE").val()},
		"locationCode": ($("#sdvTypeE").val() == "Internal" ) ? $("#stoneAccLocE option:selected").text() : null ,
		"debitOrCreditType": {"id": $("#cdFlagE").val()},
		"remarks": $("#remarksE").val(),
		"materialType": {"id": "S"},
		"stoneWeight": $("#stoneWtE").val(),
		"storeOrDc": {
		    "id" : $("#storeDcIdE").val(),
		    "name":$("#storeDcE").val()
		},
		"vendor": {"id": $("#vendorCodeE").val()},
		"category":{"id": parseInt($("#catE").val())},
		"docType" : $("#docTypeE").val(),
		"docNo" : $("#docNoE").val(),
		  "voucherValue":$("#voucherValE").val(),
		  "docSrlNo":$("#docSlNoE").val(),
		  "uqc": {
		    "id": $("#uomE").val(),
		    "name":$("#uomE").val()
		  },
		  "bptype":{
		    "id":$("#typeE").val(),
		    "name":$("#typeE option:selected").text()
		  },
		  
		  "color":$("#colorE").val(),
		  "clarity":$("#clarityE").val(),
		  "actualColor":$("#actualColorE").val(),
		  "cutGrade":$("#cutGradeE").val(),
		  "weightRange":$("#wtRangeE").val(),
		  "costRange":$("#ctRangeE").val(),
		  "shape":$("#stoneShapeE").val(),
		  "subCategory":$("#subCatE").val(),
		  "pcs":$("#stonePcsE").val(),
		  "packetId":$("#pktIdE").val(),
		  "isManual":{"id":$("#isManualE").val()},
		  "stoneCode":$("#stoneCodeE option:selected").text()
		}
	
	  postJSON('/OrderExecution/api/v1/updateAdjustmentVoucherForStones',JSON.stringify(editParam),function(response) {
		  if(response.resCode == 1){
			  $.growl.notice({
				 message : response.mesgStr,
				 duration : 10000,
				 title : 'Success'
			  });
			//  editAdjustmentVoucherStone($("#adjVouchIdE").val());
			  redirect();
		  }else{
			  $.growl.error({
					 message : response.mesgStr,
					 duration : 10000,
					 title : 'Error'
				  });
			  return false;
		  }
	  });
});

$("#docTypeC").on('change',function(){
	$('#docSlNoC').empty().append('<option value="" selected>--Select--</option>');
	$("#docSlNoC").val("");
	$("#docNoC").val("");
	
	if($("#docTypeC").val() == "LSS" || $("#docTypeC").val() == "BMRV"){
		$("#docSlNoC").prop('disabled',true);
	}else{
		$("#docSlNoC").prop('disabled',false);
	}
});

$("#docTypeE").on('change',function(){
	$('#docSlNoE').empty().append('<option value="" selected>--Select--</option>');
	$("#docSlNoE").val("");
	$("#docNoE").val("");
	
	if($("#docTypeE").val() == "LSS" || $("#docTypeE").val() == "BMRV"){
		$("#docSlNoE").prop('disabled',true);
	}else{
		$("#docSlNoE").prop('disabled',false);
	}
});

//Export function for Adjustment Voucher
$("#export").on("click",function() {
	var data;
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var rows = $('#jqxgrid').jqxGrid('getrows');
		if (rows == undefined || rows == 0 ) {
			$.growl.error({
				message : "No Data To Export",
				duration : 10000
			});
			return false;
		}else{
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		  if(rows.rowscount != 0){
			var newData = [];					
			  postJSON('/OrderExecution/api/v1/adjustVouchExportForStones',JSON.stringify(sdvFieldFilters()),function(response) {
				data = response.payload.list;
					for (i = 0; i < data.length; i++) {
					 newData.push({	
						'Adjustment Voucher No' : (data[i].id != null) ? data[i].id : "",
						'Adjustment Voucher Created Date' : (data[i].adjustmentDate != null) ? data[i].adjustmentDate : "",
						'Segment' : (data[i].stoneSegment != null) ? data[i].stoneSegment.description : "",
						'Category' : (data[i].category != null) ? data[i].category.description : "",
						'Adjustment Type' : (data[i].adjustmentType != null) ? data[i].adjustmentType.id : "",
						'Credit/Debit' : (data[i].debitOrCreditType != null) ? data[i].debitOrCreditType.id : "",
						'Vendor Code' : (data[i].vendor != null) ? data[i].vendor.vendorCode : "",	
						'Loc Code' : (data[i].locationCode != null) ? data[i].locationCode : "",
						'Stone Wt.' : (data[i].stoneWeight != null) ? data[i].stoneWeight.toFixed(3) : "",
						'Stone Pcs' : (data[i].pcs != null) ? data[i].pcs : "",
						'UQC' : (data[i].uqc != null) ? data[i].uqc.name : "",
						'Manual/System Generated' : (data[i].isManual != null) ?(data[i].isManual.id == "No" ? "System"	: "Manual") : "",
						'SDV Remarks':(data[i].remarks != null)?data[i].remarks : "",
						'Posted Date' : (data[i].authorizedDate != null) ?data[i].authorizedDate : "",
						'Posted By' : (data[i].authorizedBy.name != null) ?data[i].authorizedBy.name : "",
						'Authorized By' : (data[i].authorizedBy.name != null) ? data[i].authorizedBy.name : "",
						'Authorized Date' : (data[i].authorizedDate != null) ? data[i].authorizedDate : "",
						});
					}
					 var opts = [{sheetid:'Adjustment_Voucher_Stone',header:true}];
                     var res = alasql('SELECT * INTO XLSX("Adjustment Voucher Stone_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
					});	
			}else{
			   $.growl.error({
					message : "No Data To Export",
					duration : 10000
				});
			   return false;	
			}
		}
});


$("#clearAll").on('click',function(){
	$("#stoneAccountLocS").prop('disabled',false);
	$("#jqxgrid").hide();
});

//################ POST	 Functionality ###########################
var postAdjustmentVoucherStone = function(id){
	var stoneCode;
	var rows = $("#jqxgrid").jqxGrid('getrows');
	$.each(rows,function(k,v){
		if(v.adjVouchNo == id){
			stoneCode = v.stoneCode;
		}
	});
	var params = {"id":id,"stoneCode":stoneCode}
			
	postJSON('/OrderExecution/api/v1/postAdjustmentVoucherForStones',JSON.stringify(params),function(data) {
		if(data.resCode == "1"){
			$.growl.notice({
				message : "Adjustment Voucher " + id + " Posted Successfully !!!",
				duration : 10000,
				title : 'Success'
			});
			adjVoucherStoneSearch();
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
};
