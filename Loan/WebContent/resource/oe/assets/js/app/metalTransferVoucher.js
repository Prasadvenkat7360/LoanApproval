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

$("#clarity").hide();
$("#color").hide();
$("#cutGrade").hide();
$("#actualColr").hide();
$("#showhide").hide();
$("#accHide").hide();
$("#footerHide").hide();
$("#vHide").hide();
$("#flag").val("YES");
$("#diRate").hide();
$("#opsRate").hide();

// date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});

$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});


function validateNumber(val) {
	var regex = /^\d{0,9}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(3);
	}
	return '';
}

// on load lov's
var onloadLov = function(){
	 
$.getJSON('/OrderExecution/api/v1/raiseTransferVoucherOnloadLovs?type=pageOnloadLOV', function(data) {
	toLocations = data.payload.tolocList;
	$('#metalSegS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.mSegments, function(key, val) {
		$('#metalSegS').append('<option value="' + val.segmentId + '">' + val.description + '</option>');
	});
	$('#tvTypeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.tvTypes, function(key, val) {
		$('#tvTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	$('#fromLoctn').empty().append('<option value="" selected>--Select--</option>');
	$('#fromLocS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.fromlocList, function(key, val) {
		$('#fromLocS').append('<option value="' + val.locationCode + '">' + val.locationCode + '</option>');
		$('#fromLoctn').append('<option value="' + val.locationCode + '">' + val.locationCode + '</option>');
	});
		
	$('#toLocS').empty().append('<option value="" selected>--Select--</option>');
		$.each(toLocations, function(key, val) {
		$('#toLocS').append('<option value="' + val.locationCode + '">' + val.locationCode + '</option>');
	});
	$('#storeOrDcS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.storeOrDcTypes, function(key, val) {
		$('#storeOrDcS').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	$('#cZoneIdS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.cZonelist, function(key, val) {
		$('#cZoneIdS').append('<option value="' + val.zone_id + '">' + val.code + '</option>');
	});			
});
}
onloadLov();

// on change of store/dc load store/dc Name
$("#storeOrDcS").on("change",function() {
	$('#storeDcNameS').empty().append('<option value="" selected>--Select--</option>');
	var id = $("#storeOrDcS").val();
	$.getJSON('/OrderExecution/api/v1/getStoreOrDcs?type=' + id,function(data) {
		if (id != "") {
		 $.each(data.payload.allStoreOrDc,function(key, val) {
		  $('#storeDcNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
	  });
	 }
  });
});


// create on load lov's
$.getJSON('/OrderExecution/api/v1/raiseTransferVoucherOnloadLovs?type=createOnload', function(data) {
	var refDocTypesC = data.payload.refDocTypes;
	var refDocTypes  = [];
	$.each(refDocTypesC,function(k,v){
		if(v.id != "GR" || v.id != "T" || v.id != "UNS"){
			refDocTypes.push(v);
		}
	});
	$('#metalTypeIdC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.mSegments, function(key, val) {
		$('#metalTypeIdC').append('<option value="' + val.segmentId + '">' + val.description + '</option>');
	});
	$('#rmFgC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.mtype, function(key, val) {
		$('#rmFgC').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	$('#mZoneIdC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.zList, function(key, val) {
		$('#mZoneIdC').append('<option value="' + val.zone_id + '">' + val.description + '</option>');
	});
	$('#refDocTypeC').empty().append('<option value="" selected>--Select--</option>');
		$.each(refDocTypes, function(key, val) {
		$('#refDocTypeC').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
		
	$("#tvDateC").val(data.payload.createdDate);	
});


// on load Lov For Stone Segment  
$.getJSON('/OrderExecution/api/v1/stoneStandardRateOnloadLOV', function(data) {
	$('#stoneSegC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.sSeglist, function(key, val) {
		$('#stoneSegC').append('<option value="' + val.segmentId + '">' + val.description + '</option>');
	});
});

//on load Lov For Stone Segment  
$.getJSON('/OrderExecution/api/v1/qcRejectedLOV', function(data) {
	$('#vendorNameC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.vendors, function(key, val) {
	$('#vendorNameC').append('<option value="' + val.id + '">' + val.name + "-" + val.description + '</option>');
});	
});
var categoryDet = function() {
	var categoryDetS = {
		"fieldFilters" : {
			"suppliedBy" : "CO",
			"sSegId" : $("#stoneSegC").val(),
			"sSeg" :  $("#stoneSegC option:selected").text()
		}
	}
	return categoryDetS;
 }

// on change of stone segment load main category
$("#subCatDescp").hide();
$("#subCatHideShow").hide();
$('#stoneSegC').on('change',function() {
	$("#stoneCodeC").val("")
	$("#costRangeC").val("")
	var stSeg = $("#stoneSegC option:selected").text();
	if(stSeg == "Diamond"){
		$("#clarity").show();
		$("#color").show();
		$("#cutGrade").show();
		$("#subCatHideShow").show();
		$("#shapeHideShow").show();
		$("#subCatDescp").hide();
		$("#diRate").show();
		$("#opsRate").hide();
		$('#costRangeC').empty().append('<option value="" selected></option>');
	}
	else if(stSeg == "Precious Stones" || "Other Stones"){
		$("#clarity").hide();
		$("#color").hide();
		$("#cutGrade").hide();
		$("#actualColr").hide();
		$("#subCatHideShow").hide();
		$("#subCatDescp").show();
		$("#shapeHideShow").hide();
		$("#opsRate").show();
		$("#diRate").hide();
		$('#costRangeC').empty().append('<option value="" selected></option>');
		$.getJSON('/OrderExecution/api/v1/vendorStoneMasterCostWtLOV', function(data) {
			$('#costRangeC').empty().append('<option value="" selected>--Select--</option>');
				$.each(data.payload.wtCost, function(key, val) {
				$('#costRangeC').append('<option value="' + val.id + '">' + val.name + '-' + val.description + '</option>');
			});
		});
	}
	$('#stMainCatC').empty().append('<option value="" selected>--Select--</option>');
	var catDetails = categoryDet();
	if (catDetails) {
		postJSON('/OrderExecution/api/v1/getStoneCategories', JSON.stringify(catDetails), function(data) {
			$.each(data.payload.mainCatList, function(key, val) {
				$('#stMainCatC').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
		});
	}
});


var shapeDet = function() {
	var shapeDetS = {
		"fieldFilters" : {
			"suppliedBy" : "CO",
			"sSegId" : $("#stoneSegC").val(),
			"sSeg" :  $("#stoneSegC option:selected").text(),
			"catId" : $("#stMainCatC").val(),
		}
	}
	return shapeDetS;
 }

// on change of main category load shape
$('#stMainCatC').on('change',function() {
	var mainCategory = $("#stMainCatC option:selected").text();
	if(mainCategory == "CD Melees" ||mainCategory == "CD Pointers" || mainCategory == "CD Solitaire"){
		$("#actualColr").show();
	}
	else{
		$("#actualColr").hide();
	}
	$('#stShapeC').empty().append('<option value="" selected></option>');
	var shapeDetails = shapeDet();
	if (shapeDetails) {
		postJSON('/OrderExecution/api/v1/getShapes', JSON.stringify(shapeDetails), function(data) {
			$.each(data.payload.subCatList, function(key, val) {
				$('#stShapeC').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
		});		
	}
});

//on change of main category load Sub Category when segment is Precious Stones and Other Stones
$('#stMainCatC').on('change',function() {
	$('#subCatDescC').empty().append('<option value="" selected>--Select--</option>');
	var shapeDetails = shapeDet();
	if (shapeDetails) {
		postJSON('/OrderExecution/api/v1/getStoneSubCategories', JSON.stringify(shapeDetails), function(data) {
			$.each(data.payload.subCatList, function(key, val) {
				$('#subCatDescC').append('<option value="' + val.id + '" idE = '+ val.name +'>' + val.description + '</option>');
			});
		});		
	}
});

var colorDet = function() {
	var colorDetS = {
		"fieldFilters" : {
			"suppliedBy" : "CO",
			"segId" : $("#stoneSegC").val(),
			"catId" : $("#stMainCatC").val(),
			"shapeId" : $("#stShapeC").val(),
		}
	}
	return colorDetS;
 }

// on change of shape load color,clarity,cut grade,cost range,actual color
$('#stShapeC').on('change',function() {
	$('#costRangeC').empty().append('<option value="" selected></option>');
	$('#stClarityC').empty().append('<option value="" selected></option>');
	$('#stColorC').empty().append('<option value="" selected></option>');
	$('#stActColorC').empty().append('<option value="" selected></option>');
	$('#stCutGradeC').empty().append('<option value="" selected></option>');
	var colorDetails = colorDet();
	if (colorDetails) {
		postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(colorDetails), function(data) {
			$.each(data.payload.weightSlab, function(key, val) {
				$('#costRangeC').append('<option value="' + val.id + '">' + val.id + '</option>');
			});
			$.each(data.payload.clarity, function(key, val) {
				$('#stClarityC').append('<option value="' + val.id + '">' + val.id + '</option>');
			});
			$.each(data.payload.color, function(key, val) {
				$('#stColorC').append('<option value="' + val.id + '">' + val.id + '</option>');
			});
			$.each(data.payload.actualColor, function(key, val) {
				$('#stActColorC').append('<option value="' + val.id + '">' + val.id + '</option>');
			});
			$.each(data.payload.cutGrade, function(key, val) {
				$('#stCutGradeC').append('<option value="' + val.id + '">' + val.id + '</option>');
			});
			$("#stUqcC").val(data.payload.uom);
			$("#stoneCodeC").val(data.payload.stoneDetails.name);
		});
	}
});

var wtCostDet = function() {
	var wtCostDetS = {
		"fieldFilters" : {
			"suppliedBy" : "CO",
			"segId" : $("#stoneSegC").val(),
			"catId" : $("#stMainCatC").val(),
			"subCatCode" : $("#subCatDescC option:selected").attr('idE'),
		}
	}
	return  wtCostDetS;
 }

// on change of Sub Category load stone code when segment is precious and other stones
$("#subCatDescC").on('change',function(){
	var wtCostDetails = wtCostDet();
	if (wtCostDetails) {
		postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(wtCostDetails), function(data) {
			$("#stoneCodeC").val(data.payload.stoneDetails.name);
			
			$('#stoneSellingRateC').empty().append('<option value="" selected>--Select--</option>');
				$.each(data.payload.stoneDetails.rateList, function(key, val) {
			$('#stoneSellingRateC').append('<option value="' + val + '">' + val + '</option>');
		});
		});
	}
});


$('#stShapeC').on('blur',function() {
	var shape = $("#stShapeC option:selected").text();
	var segment = $("#stoneSegC  option:selected").text();
	var mainCategory = $("#stMainCatC  option:selected").text();
	var subCategoryDesc = segment + " " + " " +  mainCategory + " " + " " + shape;
	$("#subCatDescpC").val(subCategoryDesc);
});

$('#stClarityC').on('change',function() {
	var subCat = $("#subCatDescpC").val();
	var clarity = $('#stClarityC').val();
	var costRange = $("#costRangeC").val();
	var subCatDescC = subCat + " " + " " + clarity + " " + " " + costRange;
	$("#subCatDescpC").val(subCatDescC);
});

// Accessory on load LOV
//on load Lov For Supplied By  
$.getJSON('/OrderExecution/api/v1/getStoneHeadersForSC', function(data) {
	$('#stSuppByC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.suppliedBy, function(key, val) {
		$('#stSuppByC').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
});

// calculating pure weight
$("#grossWtC").on('change',function(){
	var skinPurity = $("#skinPurityC").val();
	var grossWeight = $("#grossWtC").val();
	
	if($("#rmFgC").val() == "R"){
		if(skinPurity == "" || skinPurity == null){
			$("#grossWtC").val("");
			$.growl.error({
				message : "Please Select Skin Purity !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		
		var nWt = grossWeight;
		$("#netWt").val(nWt);
		
	    var pureWt = grossWeight * skinPurity/99.9;
	    
	    $("#pureWtC").val(pureWt.toFixed(3));
		
		$("#stoneDetails").prop('disabled', true);
		$("#accessoryDetails").prop('disabled', true);
	}
});

$("#vCodeHideShow").hide();
$("#rmFgC").on('change',function(){
	var type = $("#rmFgC").val();
	$("#toLocC").val("");
	if(type == "F"){
		$("#vCodeHideShow").hide();
		$("#fLocC").show();
		$("#fLoc").hide();
		$("#mPurty").show();
		$("#mpurityC").hide();
		
		$("#mZoneHide").show();
		$("#vCodeHide").show();
	}
	if(type == "R"){
		$("#vCodeHideShow").show();
		$("#fLoc").show();
		$("#fLocC").hide();
		$("#mPurty").hide();
		$("#mpurityC").show();
		
		$("#mZoneHide").hide();
		$("#vCodeHide").hide();
	}
});

$("#rmFgC").on('change',function(){
	$('#toLocC').empty().append('<option value="" selected>--Select--</option>');
	if($("#rmFgC").val() == "R"){
		loadLocForRM();
	}else{}
});

var loadLocForRM = function(){
	$.getJSON('/OrderExecution/api/v1/raiseTransferVoucherOnloadLovs?type=createOnload&&segmentId='+$("#metalTypeIdC").val()+'&&refDocType=RfromLoc', function(data) {
		$('#fromLoctn').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.rawMaterialLocList, function(key, val) {
		$('#fromLoctn').append('<option value="' + val.locationCode + '">' + val.locationCode + '</option>');
	});
  });
}

$('#refDocTypeC').on('change',function() {
	var id = $('#refDocTypeC').val();
	var type = $("#rmFgC").val();
	if(id == "ASM" || id == "S" || id == "MR"){
		$("#refDocSrlNoC").prop('disabled', true);
	}else{
		$("#refDocSrlNoC").prop('disabled', false);
	}
	
	if(type == "F"){
		$("#fLocC").show();
		$("#fLoc").hide();
		if(id == "S"){
			$("#fromLocC").val("STK"); 
			$("#fromLocC").prop('disabled', true);
			
		}else{
			$("#fromLocC").val(""); 
			$("#fromLocC").prop('disabled',false);
		}
	}
	if( type == "R"){
		$("#fLoc").show();
		$("#fLocC").hide();
		if(id == "S"){
			$("#fromLoctn").val("STK"); 
			$("#fromLoctn").prop('disabled',true);
			$.getJSON('/OrderExecution/api/v1/fetchToLocationByFromLoc?fromLocation=STK', function(data) {
				$('#toLocC').empty().append('<option value="" selected>--Select--</option>');
					$.each(data.payload.list, function(key, val) {
					$('#toLocC').append('<option value="' + val.locationCode + '">' + val.locationCode + '</option>');
				});
			});
			
		}else{
			$("#fromLoctn").val(""); 
			$("#fromLoctn").prop('disabled',false);
		}
	}
});

var lossLocFlagG ;
$('#toLocC').on('change',function() {
  var toLoc = $('#toLocC').val();
  var fromLoc = $('#fromLocC').val();
  if(toLoc == fromLoc)
	  {
	  $.growl.error({
		  message  : 'From and To Location Cannot Be Same',
		  duration : 10000,
		  title : 'Error'
	  });
	  	return false;
	  }
  else{
	  $.getJSON('/OrderExecution/api/v1/checkLoseLocationForTransferVoucher?segmentId='+$("#metalTypeIdC").val()+'&locCode='+toLoc, function(data) {
		  lossLocFlagG = data.payload.checkLoseLocation;
		});
  	}
});

$('#toLocC').on('change',function() {
	  var toLoc = $('#toLocC').val();
	  var fromLoctn = $('#fromLoctn').val();
	  if(toLoc == fromLoctn)
		  {
		  $.growl.error({
			  message  : 'From and To Location Cannot Be Same',
			  duration : 10000,
			  title : 'Error'
		  });
		  	return false;
		  }
	});

$('#fromLoctn').on('change',function() {
	if($('#fromLoctn').val() != ""){
		$.getJSON('/OrderExecution/api/v1/fetchToLocationByFromLoc?fromLocation='+$("#fromLoctn").val(), function(data) {
			$('#toLocC').empty().append('<option value="" selected>--Select--</option>');
				$.each(data.payload.list, function(key, val) {
				$('#toLocC').append('<option value="' + val.locationCode + '">' + val.locationCode + '</option>');
			});
		});
	}
});



//Generate Row for Adding Stones
var rowIdS = 0;
var generaterowS = function(j) {
	var row = {};
	console.log(j);
	row["flag"] = "YES";
	row["refDocNo"] = $("#stRefDocNoC").val();
	row["refDocSrlNo"] = j;
	row["stoneSegment"] =  $("#stoneSegC option:selected").text();
	row["stoneSegId"] = $("#stoneSegC").val();
	row["stoneCategory"] = $("#stMainCatC option:selected").text();
	row["stoneCatId"] = $("#stMainCatC").val();
	row["shape"] = $("#stShapeC option:selected").text();
	row["shapeId"] = $("#stShapeC").val();
	row["stoneCode"] = $("#stoneCodeC").val();
	 if(row["stoneSegment"] == "Diamond"){
		row["stoneSubCategory"] = $("#subCatDescpC").val();	
		row["sellingRate"] = $("#stSellingRateC").val();
	 	}
	 else if(row["stoneSegment"] == "Precious Stones" || "Other Stones")
		{
		row["stoneSubCategory"] = $("#subCatDescC option:selected").text();
		row["sellingRate"] = $("#stoneSellingRateC").val();
		} 
	row["weightRange"] = $("#costRangeC").val();
	row["costPrice"] = $("#stActCostPriceC").val();
	row["stoneWt"] = $("#stWeightC").val();
	row["stonePcs"] = $("#stonePcsC").val();
	
	row["uom"] = $("#stUqcC").val();
	row["suppliedBy"] = $("#stSuppByC").val();
	row["clarity"] = $("#stClarityC option:selected").text();
	row["color"] = $("#stColorC option:selected").text();
	row["cutGrade"] = $("#stCutGradeC option:selected").text();
	row["sellingPrice"] = $("#stSellingPriceC").val();
	row["actualColor"] = $("#stActColorC option:selected").text();
	rowIdS = rowIdS + 1 ;
	return row;
}

$('#addStoneDet').on('click', function(){
	var rowS = $('#jqxgridD').jqxGrid('getrows');
	if(typeof rowS != "undefined"){
		var leng = rowS.length ;
		var selectedrowindex = $("#jqxgridD").jqxGrid('getselectedrowindex');
		var id = $("#jqxgridD").jqxGrid('getrowid', selectedrowindex);
		if(selectedrowindex==-1){
			$("#jqxgridD").jqxGrid('addrow', null, generaterowS((leng) + 1));
		}else{
			$("#jqxgridD").jqxGrid('updaterow', id, generaterowS((selectedrowindex) + 1));
			$("#jqxgridD").jqxGrid('ensurerowvisible', selectedrowindex);
		}
		
		$('#addStoneDetails').modal('hide');
	}
});

//Generate Row for Adding Accessory
var rowId = 0;
var generaterowA = function(i) {
	var row = {};
	row["flag"] = "YES";
	row["accStockNoC"] = $("#accStockNoC").val();
	row["accSrlNoC"] = i;
	row["accMainCatC"] = $("#accMainCatC option:selected").text();
	row["accMainCatId"] = $("#accMainCatC").val();
	row["accSubCatDescC"] = $("#accSubCatDescC option:selected").text();
	row["accSubCatId"] = $("#accSubCatDescC").val();
	row["accWtC"] = $("#accWtC").val();
	row["accPcsC"] =$("#accCostPriceC").val();
	row["accSellingPriceC"] = $("#accSellingPriceC").val();
	row["accSellingRateC"] = $("#accSellingRateC").val();
	row["accCodeC"] = $("#accCodeC").val();
	row["accUomC"] = $("#accUomC").val();
	row["accSuppliedByC"] = $("#accSuppliedByC").val();
	row["accSuppliedByIdC"] = $("#accSuppliedByC").val();
	rowId = rowId + 1;
	return row;
}

$('#addAccDet').on('click', function(){	
	var rows = $('#jqxgridA').jqxGrid('getrows');
	if(typeof rows != "undefined"){
	var selectedrowindex = $("#jqxgridA").jqxGrid('getselectedrowindex');
	var id = $("#jqxgridA").jqxGrid('getrowid', selectedrowindex);
	if(selectedrowindex==-1){
		$("#jqxgridA").jqxGrid('addrow', null, generaterowA((rows.length)+ 1));
	}else{
		$("#jqxgridA").jqxGrid('updaterow', id, generaterowA((selectedrowindex)+ 1));
		$("#jqxgridA").jqxGrid('ensurerowvisible', selectedrowindex);
	}
	
	$('#addAccDetails').modal('hide');
	}
});

$("#stoneDetails").on('click',function(){
	var refDocNumb = $("#refDocNoC").val();
	$("#stRefDocNoC").val(refDocNumb);
	
});
$("#accessoryDetails").on('click',function(){
	var refDocNo = $("#refDocNoC").val();
	$("#accStockNoC").val(refDocNo);	
});

// ################# Create Started ##################
// on change of skin purity resetting gross Wt,Net Wt and Pure Wt
$("#sPurityC").on('change',function(){
	$("#grossWtC").val("");
	$("#netWt").val("");
	$("#pureWtC").val("");
});

/*// On Change of gross wt resetting net wt
$("#grossWtC").on('change',function(){
	if (this.value.match(/[^\d.]/g)) {
		this.value = this.value.replace(/[^\d.]/g, '');
	}
});*/

// on change of  Accessory selling rate resetting Accessory 
$("#accSellingRateC").on('change',function(){
	$("#accCostPriceC").val("");
});

// Conditions to enable and disable add Stone and Acc Buttons
$("#netWt").on('blur',function(){
	var gross =  parseInt($("#grossWtC").val());
	var net =  parseInt($("#netWt").val());
	if(net > gross){
		$("#stoneDetails").prop('disabled', true);
		$("#accessoryDetails").prop('disabled', false);
		$.growl.error({
			message : 'Net Wt Must be Less Than Gross Wt.',
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	else if(gross == net){
		$("#stoneDetails").prop('disabled', true);
	}
	else{
		$("#stoneDetails").prop('disabled', false);
		$("#accessoryDetails").prop('disabled', false);
	}	
});

// field filters 
var rtvFieldFilters = function() {
	var rtvDetC = {
		"fieldFilters" : {
			"refDocNo" :  $("#refDocNoC").val(),
			"refDocSrlNo" : $("#refDocSrlNoC").val(),
			"refDocType" : $("#refDocTypeC").val(),
			"materialType" :   $("#rmFgC").val(),
			"segmentId" :   $("#metalTypeIdC").val()
			}
	}
	return rtvDetC;
 }

//Add Stone and accessory details to grid
var grWt1,grWt2,toleranceLimit;
$('#addDetails').on('click', function(){	
	var matType = $("#rmFgC").val();
	var docType =$("#refDocTypeC").val();
	var RefDocType = $("#refDocTypeC option:selected").text();
	var docNo = $("#refDocNoC").val();
			var stAcc = rtvFieldFilters();
			 if (matType != "R" && docType != "") {
				 if(stAcc){
				 postJSON('/OrderExecution/api/v1/getRTVDetails',JSON.stringify(stAcc),function(data) {
					if (data.resCode == "1") {	
				
					var result = data.payload.list;
					var stoneData = data.payload.list.Stones;
					var accData = data.payload.list.Accessory;
					var grossWt = result.GWt;
					var netWt = result.NWt;
					toleranceLimit = result.toleranceLImit;
					$("#fromLocC").val(result.FromLoc);
					$('#toLocC').empty().append('<option value="" selected>--Select--</option>');
					$.each(result.toLocCodes, function(key, val) {
						$('#toLocC').append('<option value="' + val.locCode + '">' + val.locCode + '</option>');
					});
					
					wsService();
					var resp = localStorage.getItem("wsValue");
					
					var weight = resp;
					console.log(weight);
					grWt1 = parseFloat(grossWt) - parseFloat(toleranceLimit);
					grWt2 =  parseFloat(grossWt) + parseFloat(toleranceLimit);
					
					console.log(grWt1);
					console.log(grWt2);
					var pureWeight = result.skinPurity * result.NWt/99.9;
					$("#sPurityC").val(result.skinPurity);
					$("#mPurity").val(result.meltingPurity);
					$("#grossWtC").val(weight);
					$("#grsWtC").val(grossWt);
					$("#netWt").val(result.NWt);
					$("#pureWtC").val(parseFloat(pureWeight).toFixed(3));
					$("#pcsC").val(result.pcs);
					$("#vendorC").val(result.vendor);
					$("#stoneDetails").prop('disabled', false);
					$("#showhide").show();
					$("#accHide").show();
					stoneDetGrid(stoneData);
					$("#jqxgridD").show();
					$("#accessoryDetails").prop('disabled', false);
					accDetGrid(accData);
					$("#jqxgridA").show();
					$("#footerHide").show();
					if(result.wScaleFlag == false){
						$("#grossWtC").prop('disabled',false);
					}else{
						$("#grossWtC").prop('disabled',true);
					}
					if(grossWt == netWt ){
						$("#stoneDetails").prop('disabled', true);
						$("#accessoryDetails").prop('disabled', true);
					}
					else{
						$("#stoneDetails").prop('disabled', true);
						$("#accessoryDetails").prop('disabled', true);
					}						
				  }
					if(data.resCode == "2"){
						$("#showhide").hide();
						stoneDetGrid();
						$("#jqxgridD").hide();
						$("#accHide").hide();
						accDetGrid();
						$("#jqxgridA").hide();
						$.growl.error({
							message : data.mesgStr,
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
			   });
	       }
		}	 
        
    });




$("#mpurityC").hide();
$("#fLoc").hide();
// Validations 
$('#addDetails').on('click', function(){
	var metalTypeIdC = $("#metalTypeIdC").val();
	var materialType = $("#rmFgC").val();
	var docType = $("#refDocTypeC").val();
	var refDocNoC = $("#refDocNoC").val();
	var refDocSrlNoC = $("#refDocSrlNoC").val();
		if(materialType == "" || materialType == null)
		{
			$.growl.error({
				message : "Please Select RM/FG",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}		
		if(materialType == "F"){
			if(metalTypeIdC == "" || metalTypeIdC == null)
			{
				$.growl.error({
					message : "Please Select Metal Segment",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
			if(docType == "" || docType == null){
				$("#showhide").hide();
				$("#stoneDetails").prop('disabled', false);
				stoneDetGrid();
				$("#jqxgridD").hide();
				$("#accHide").hide();
				$("#accessoryDetails").prop('disabled', false);
				accDetGrid();
				$("#jqxgridA").hide();
				$("#footerHide").hide();
				$.growl.error({
					message : "Please Select Ref Doc Type!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
				}
			
			}
		if(materialType == "R"){		
			$("#showhide").show();
			$("#stoneDetails").prop('disabled', false);
			stoneDetGrid();
			$("#jqxgridD").show();
			$("#accHide").show();
			$("#accessoryDetails").prop('disabled', false);
			accDetGrid();
			$("#jqxgridA").show();
			$("#footerHide").show();			
		}
		else if(docType == "T"){
			
		}		
		else if(docType == "S"){
			if( refDocNoC == "" || refDocNoC == null){
				$.growl.error({
					message : "Please Enter Ref Doc No",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		}	    	
		else if(docType == "O" || docType == "P" || docType == "GR" || docType == "DSM" || docType == "UNS"){
			if( refDocNoC == "" || refDocNoC == null || refDocSrlNoC == "" || refDocSrlNoC == null){
				$("#showhide").hide();
				stoneDetGrid();
				$("#jqxgridD").hide();
				$("#accHide").hide();
				accDetGrid();
				$("#jqxgridA").hide();
				$.growl.error({
					message : "Please Enter Ref Doc Number And Ref Doc Srl No",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		}		
	});


$("#vCodeHideShow").hide();
$("#rmFgC").on('change',function(){
	onloadLov();
     var docType  = $("#refDocTypeC").val();
	$("#sPurityC").val("");
	$("#mPurity").val("");
	$("#grossWtC").val("");
	$("#netWt").val("");
	$("#pureWtC").val("");
	$("#pcsC").val("");
	$('#refDocNoC').val("");
	$('#refDocSrlNoC').val("");
	
	$('#toLocC').empty().append('<option value="" selected>--Select--</option>');
	$('#fromLoctn').empty().append('<option value="" selected>--Select--</option>');
	
	
	var type = $("#rmFgC").val();
		if(type == "R"){
			$("#vCodeHideShow").show();
			$("#mSeg").hide();
			$("#fRefDocT").hide();
			$("#fRefDocN").hide();
			$("#fRefDocSN").hide();
			$("#mPurity").prop('disabled',true);
		}if(type == "R" && docType == ""){
			$("#mpurityC").show();
			$("#fLoc").show();
			$("#fLocC").hide();
			$("#mPurty").hide();
			$("#mPurity").prop('disabled',true);
		}
		else{
			$("#vCodeHideShow").hide();
			$("#mSeg").show();
			$("#fRefDocT").show();
			$("#fRefDocN").show();
			$("#fRefDocSN").show();
			$("#mPurity").prop('disabled',false);
		}
});

// Accessory on load lov 
$.getJSON('/OrderExecution/api/v1/getAccessoryHeaders', function(data) {
	$('#accSuppliedByC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.suppliedBy, function(key, val) {
		$('#accSuppliedByC').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
}); 

$("#accSuppliedByC").on('change',function(){
	var accSupBy = $(this).val();
	var fieldFilters = {
			"fieldFilters" : {
				"suppliedBy" : accSupBy
			}
		};
	$('#accMainCatC').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getAccessoryCategories', JSON.stringify(fieldFilters), function(data) {
			var accCatsList = data.payload.accCats;
			$.each(accCatsList, function(k, v) {
				$('#accMainCatC').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
			});
		});
	});


$("#accMainCatC").on('change',function(){
	var fieldFilters = {
			"fieldFilters" : {
				"suppliedBy" : "CO",
				"accMCatId" : $("#accMainCatC").val()
			}
		};
	$('#accSubCatDescC').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getAccCatSubCategories', JSON.stringify(fieldFilters), function(data) {
			var accSubCats = data.payload.accSubCats;
			$.each(accSubCats, function(k, v) {
				$('#accSubCatDescC').append('<option code="' + v.name + '" value="' + v.id+ '">' + v.description + '</option>');
			});
		});
	});


$("#accSubCatDescC").on('change',function() {
			var accSubCat = $("#accSubCatDescC option:selected").attr('code');
			var accMainCat = $("#accMainCatC option:selected").attr('code');
			var accSupBy = $("#accSuppliedByC").val();

			var fieldFilters = {
				"fieldFilters" : {
					"mCode" : "AC",
					"catCode" : accMainCat,
					"subCatCode" : accSubCat,
					"suppliedBy" : accSupBy
				}
			};
			$('#accCodeC').empty().append('<option value="" selected>--Select--</option>');
			$('#accSellingRateC').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getAccCode', JSON.stringify(fieldFilters), function(data) {
				var accCodeList = data.payload.accCode;
				$('#accCodeC').val(accCodeList.name);

				$('#rateList').val(JSON.stringify(accCodeList.rateList));
				$.each(accCodeList.rateList, function(k, v) {
					$('#accSellingRateC').append('<option value="' + v + '">' + v + '</option>');
				});
			});
		});


$("#accCostPriceC").on('blur',function(){
	var rate = $('#accSellingRateC').val();
	var pcs  = $('#accCostPriceC').val();
	var sp = rate * pcs;
	$("#accSellingPriceC").val(sp);
})

//Stone Details Grid
var stoneDetGrid = function(stoneData) {
	var source = {
		datafields : [
			{name : 'flag', type : 'string'},
			{name : 'refDocNo', type : 'int'},
			{name : 'refDocSrlNo', type : 'int'}, 
			{name : 'stoneSegment',	type : 'string'},
			{name : 'stoneSegId',	type : 'long'},
			{name : 'stoneCategory', type : 'string'}, 
			{name : 'stoneCatId',type : 'long'},
			{name : 'stoneSubCategory',	type : 'string'}, 
			{name : 'weightRange', type : 'string'}, 
			{name : 'clarity',	type : 'string'}, 
			{name : 'color',type : 'string'}, 
			{name : 'actualColor',type : 'string'}, 
			{name : 'cutGrade',type : 'string'}, 
			{name : 'costPrice',type : 'long'}, 
			{name : 'stoneWt',type : 'float'},
			{name : 'stonePcs',type : 'int'},
			{name : 'shape',type : 'string'},
			{name : 'shapeId',type :'long'},
			{name : 'sellingRate',type : 'long'},
			{name : 'sellingPrice',type : 'long'},
			{name : 'stoneCode',type : 'string'},
			{name : 'uom',type : 'string'},
			{name : 'suppliedBy',type : 'string'},
			{name : 'suppliedBy',type : 'string'},
			{name : 'id', type : 'int'},],
			localdata : stoneData,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridD").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 80,
		autorowheight : true,
		theme: 'energyblue',
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Stone Details');			
		},
		columns : [ 
			{text : 'Flag',datafield : 'flag',width : '6%',cellsalign : 'center',align : 'center',hidden : true},
			{text : 'Ref Doc No',datafield : 'refDocNo',width : '5%',cellsalign : 'center',align : 'center'},
			{text : 'Sl No',datafield : 'refDocSrlNo',	width : '3%',cellsalign : 'center',align : 'center'}, 
			{text : 'Stone Seg',datafield : 'stoneSegment',width : '6%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Stone Seg ID',datafield : 'stoneSegId',width : '6%',cellsalign : 'center',align : 'center',editable : false,hidden:true},
			{text : 'Main Category',datafield : 'stoneCategory',width : '6%',	cellsalign : 'center',align : 'center',	editable : false},
			{text : 'Main Category Id',datafield : 'stoneCatId',width : '6%',	cellsalign : 'center',align : 'center',	editable : false,hidden:true},
			{text : 'Sub Cat Desc/Sub Category',datafield : 'stoneSubCategory',width : '9%',cellsalign : 'left',align : 'center',editable : false} ,
			{text : 'Wt/Cost Range',datafield : 'weightRange',	width : '5.5%',cellsalign : 'right',align : 'center',editable : false}, 
			{text : 'Clarity',	datafield : 'clarity',width : '5%',cellsalign : 'center',align : 'center',	editable : false}, 
			{text : 'Color',datafield : 'color',	width : '5%',cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Actual Color',datafield : 'actualColor',width : '5%',cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Cut Grade',datafield : 'cutGrade',width : '4.5%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Cost Price',datafield : 'costPrice',width : '4%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2'},
			{text : 'Stone Wt',datafield : 'stoneWt',width : '4%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3'},
			{text : 'Company/Vendor Pcs',datafield : 'stonePcs',width : '5%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Shape',datafield : 'shape',width : '5%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Shape Id',datafield : 'shapeId',width : '6%',cellsalign : 'center',align : 'center',editable : false,hidden:true},
			{text : 'Company/Vendor Rate',datafield : 'sellingRate',width : '6%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2'},
			{text : 'Company/Vendor Price',datafield : 'sellingPrice',width : '6%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2'},
			{text : 'Stone Code',datafield : 'stoneCode',width : '5%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'UQC',datafield : 'uom',width : '3.5%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Supplied By',datafield : 'suppliedBy',width : '5%',cellsalign : 'center',align : 'center',editable : false},
			{ text : '', datafield : 'id', width : '2.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsrenderer : stoneDetails},
			]
	});
}

var stoneDetails = function(row, column, value) {
	var status = $("#jqxgridD").jqxGrid('getrowdata', row).flag;
	if(typeof(status) == "undefined"){
		var editVal = '<button  class="btn btn-sm btn-primary" disabled type="button"><i class="fa fa-pencil fa-sm"></i></button>';
	}if(status == "YES"){
		var editVal= '<button class="btn btn-sm btn-primary" data-toggle="modal" margin-left:5px;  margin-bottom:5px;  margin-right:5px;" data-target="#addStoneDetails" type="button" id='
			+ row
			+ ' onclick="showStoneDets('
			+ row
			+ ')"/><i class="fa fa-pencil fa-sm"></i></button>'
	}
	return editVal;
}

var showStoneDets = function() {
	var rows = $("#jqxgridD").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridD").jqxGrid('getselectedrowindex');	
	for (var i = 0; i < rows.length; i++) {
		console.log(rows);
		$("#stRefDocNoC").val(rows[selectedrowindex].refDocNo);
		$("#stoneSegC").val(rows[selectedrowindex].stoneSegId);
		$("#stMainCatC").val(rows[selectedrowindex].stoneCatId);
		$("#stShapeC").val(rows[selectedrowindex].shapeId);
		$("#stoneCodeC").val(rows[selectedrowindex].stoneCode);
		$("#costRangeC").val(rows[selectedrowindex].weightRange);
		
		$("#stActCostPriceC").val(rows[selectedrowindex].costPrice);
		$("#stWeightC").val(rows[selectedrowindex].stoneWt);
		$("#stonePcsC").val(rows[selectedrowindex].stonePcs);
		$("#stSellingRateC").val(rows[selectedrowindex].sellingRate);
		$("#stoneSellingRateC").val(rows[selectedrowindex].sellingRate);
		
		$("#stSellingPriceC").val(rows[selectedrowindex].sellingPrice);
		
		$("#stUqcC").val(rows[selectedrowindex].uom);
		
		$("#stSuppByC").val(rows[selectedrowindex].suppliedBy);
		$("#stClarityC").val(rows[selectedrowindex].clarity);
		$("#stColorC").val(rows[selectedrowindex].color);
		$("#stCutGradeC").val(rows[selectedrowindex].cutGrade);
		$("#stActColorC").val(rows[selectedrowindex].actualColor);
		$("#subCatDescpC").val(rows[selectedrowindex].stoneSubCategory);
		}		
	 }

//Acc Details Grid
var accDetGrid = function(accData) {
	var source = {
		datafields : [ 
		{name : 'flag', type : 'string'},	
		{name : 'accStockNoC', type : 'int','map':'refDocNo'}, 
		{name : 'accSrlNoC',	type : 'int','map':'refDocSrlNo'},
		{name : 'accMainCatC',	type : 'int','map':'mainCategory'}, 
		{name : 'accMainCatId',	type : 'long'}, 
		{name : 'accSubCatDescC', type : 'string','map' :'subcategoryDesc'},
		{name : 'accSubCatId',	type : 'long'}, 
		{name : 'accWtC',	type : 'double','map':'weight'}, 
		{name : 'accPcsC', type : 'int','map':'pcs'}, 
		{name : 'accCostPriceC',	type : 'double','map' :'costPrice'}, 
		{name : 'accSellingPriceC',type : 'double','map' :'sellingPrice'}, 
		{name : 'accSellingRateC',type : 'double','map':'sellingRate'}, 
		{name : 'accCodeC',type : 'string','map':'code'}, 
		{name : 'accUomC',type : 'string','map':'uom'}, 
		{name : 'accSuppliedByC',type : 'string','map':'suppliedBy'},
		{name : 'accSuppliedByIdC',type : 'long'},
		{name : 'id', type : 'int'},],
		localdata : accData,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridA").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : false,
		height : 200,
		theme: 'energyblue',
		columnsheight : 50,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Accessory Details');			
		},
		columns : [ 
		{text : 'Flag',datafield : 'flag',width : '6%',cellsalign : 'center',align : 'center',hidden : true},	
		{text : 'Ref Doc No',datafield : 'accStockNoC',	width : '9%',cellsalign : 'center',align : 'center'}, 
		{text : 'Sl No',datafield : 'accSrlNoC',width : '5%',cellsalign : 'center',align : 'center',editable : false}, 
		{text : 'Main Cat',datafield : 'accMainCatC',width : '12%',	cellsalign : 'center',align : 'center',	editable : false},
		{text : 'Main Cat Id',datafield : 'accMainCatId',width : '12%',	cellsalign : 'center',align : 'center',	editable : false,hidden : true},
		{text : 'Sub Category',datafield : 'accSubCatDescC',width : '12%',	cellsalign : 'left',align : 'center',	editable : false},
		{text : 'Sub Category Id',datafield : 'accSubCatId',width : '12%',	cellsalign : 'center',align : 'center',	editable : false,hidden : true},
		{text : 'Acc Code',datafield : 'accCodeC',width : '10%',cellsalign : 'center',align : 'center',editable : false},
		{text : 'Weight',datafield : 'accWtC',	width : '8%',cellsalign : 'right',align : 'center',editable : false,'cellsformat' : 'd3'},
		{text : 'Company Rate',datafield : 'accSellingRateC',width : '10%',cellsalign : 'right',align : 'center',editable : false,'cellsformat' : 'd2'},
		{text : 'Company Pieces',	datafield : 'accPcsC',width : '7%',cellsalign : 'center',align : 'center',	editable : false}, 
		{text : 'Company Price',datafield : 'accSellingPriceC',width : '10%',cellsalign : 'right',align : 'center',editable : false,'cellsformat' : 'd2'}, 
		{text : 'UQC',datafield : 'accUomC',width : '6.5%',cellsalign : 'center',align : 'center',editable : false},
		{text : 'Supplied By',datafield : 'accSuppliedByC',width : '8%',cellsalign : 'center',align : 'center',editable : false},
		{text : 'Supplied By Id',datafield : 'accSuppliedByIdC',width : '10%',cellsalign : 'center',align : 'center',editable : false,hidden : true},
		{ text : '', datafield : 'id', width : '2.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsrenderer : accessoryDets},
		]
	});
}

var accessoryDets = function(row, column, value) {
	var status = $("#jqxgridA").jqxGrid('getrowdata', row).flag;
	if(typeof(status) == "undefined"){
		var editVal = '<button  class="btn btn-sm btn-primary" disabled type="button"><i class="fa fa-pencil fa-sm"></i></button>';
	}if(status == "YES"){
		var editVal= '<button class="btn btn-sm btn-primary" data-toggle="modal" margin-left:5px;  margin-bottom:5px;  margin-right:5px;" data-target="#addAccDetails" type="button" id='
			+ row
			+ ' onclick="showAccDets('
			+ row
			+ ')"/><i class="fa fa-pencil fa-sm"></i></button>'
	}
	return editVal;
}

var showAccDets = function() {
	var rows = $("#jqxgridA").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridA").jqxGrid('getselectedrowindex');	
	for (var i = 0; i < rows.length; i++) {
		$("#accStockNoC").val(rows[selectedrowindex].accStockNoC);
		$("#accSrlNoC").val(rows[selectedrowindex].accSrlNoC);
		$("#accSuppliedByC").val(rows[selectedrowindex].accSuppliedByC);
		$("#accMainCatC").val(rows[selectedrowindex].accMainCatId);
		$("#accSubCatDescC").val(rows[selectedrowindex].accSubCatId);
		$("#accCodeC").val(rows[selectedrowindex].accCodeC);
		
		$("#accWtC").val(rows[selectedrowindex].accWtC);
		$("#accSellingRateC").val(rows[selectedrowindex].accSellingRateC);
		$("#accCostPriceC").val(rows[selectedrowindex].accPcsC);
		$("#accSellingPriceC").val(rows[selectedrowindex].accSellingPriceC);
		$("#accUomC").val(rows[selectedrowindex].accUomC);
		}		
	 }

/*$("#grossWtC").on('change',function(){
	var matTypeC = $("#rmFgC").val();
	if(matTypeC != "R"){
	
		var grsWt1 = parseFloat(grWt1.toFixed(3));
		var grsWt2 = parseFloat(grWt2.toFixed(3));
		var newGwt = parseFloat($("#grossWtC").val());
		var newGwt1 = parseFloat(newGwt.toFixed(3));
		if(newGwt1 != "" || newGwt1 != null){
			if(newGwt1 < grsWt1 || newGwt1 > grsWt2){
				$('#saveRtv').prop('disabled',true);
				$("#grossWtC").val(" ");
				$.growl.error({
					message : "Gross Wt is Outside The Tolerance Limit !!!",
					duration  : 1000,
					title : "Error"
				});
				return false;
			}else{
				$('#saveRtv').prop('disabled',false);
			}
		}
	}
});
*/
var authArray = [];

var checkAuth = function(isAuthorized, authId){
	var stoneArray = [];
	var getStones = $('#jqxgridD').jqxGrid('getrows');
	for (var i = 0; i < getStones.length; i++) {
		var stoneItems = {
				  "refDocNo": getStones[i].refDocNo,
			      "refDocSrlNo":getStones[i].refDocSrlNo,
			      "stoneCategory":getStones[i].stoneCategory ,
			      "stoneSubCategory": getStones[i].stoneSubCategory,
			      "weightRange":  getStones[i].weightRange,
			      "clarity":  getStones[i].clarity,
			      "color":  getStones[i].color,
			      "actualColor":  getStones[i].actualColor,
			      "cutGrade":  getStones[i].cutGrade,
			      "costPrice": getStones[i].costPrice,
			      "stoneWt":  getStones[i].stoneWt,
			      "stonePcs":  getStones[i].stonePcs,
			      "sellingRate":  getStones[i].sellingRate,
			      "sellingPrice": getStones[i].sellingPrice,
			      "stoneCode":  getStones[i].stoneCode,
			      "uom":  getStones[i].uom,
			      "suppliedBy":  ($("#refDocTypeC").val() == "P") ? "CO" : getStones[i].suppliedBy,
			      "stoneSegment": getStones[i].stoneSegment,
			      "shape":  getStones[i].shape
		}
		stoneArray.push(stoneItems);
	}
	var accArray = [];
	var getAcc = $('#jqxgridA').jqxGrid('getrows');
	for (var j = 0; j < getAcc.length; j++) {
		var accItems = {
				  "refDocNo": getAcc[j].accStockNoC,
			      "refDocSrlNo":getAcc[j].accSrlNoC,
			      "mainCategory":getAcc[j].accMainCatC,
			      "subcategoryDesc":getAcc[j].accSubCatDescC ,
			      "weight": getAcc[j].accWtC,
			      "pcs":  getAcc[j].accPcsC,
			      "costPrice":  getAcc[j].accCostPriceC,
			      "sellingPrice":  getAcc[j].accSellingPriceC,
			      "sellingRate":  getAcc[j].accSellingRateC,
			      "code":  getAcc[j].accCodeC,
			      "uom": "Pcs",
			      "suppliedBy":  ($("#refDocTypeC").val() == "P") ? "CO" : getAcc[j].accSuppliedByC,
			     
		}
		accArray.push(accItems);
	}
	
	var rtvDetailsLines = { 	
			"metalTypeId" : $("#metalTypeIdC").val(),
			"materialType" :  $('#rmFgC').val(),	
			"vendor" : ($("#rmFgC").val() == "R") ? $("#vendorNameC").val() : $("#vendorC").val(),
			"refDocType" : $('#refDocTypeC').val(),
			"refDocNo" : $('#refDocNoC').val(),
			"refDocSrlNo" : $('#refDocSrlNoC').val(), 
			"zoneId" : $("#mZoneIdC").val(),
			"FromLoc" : ($("#rmFgC").val() == "R") ? $("#fromLoctn").val() : $("#fromLocC").val(),
			"toLoc" : $('#toLocC').val(),
			"skinPurity" : ($("#rmFgC").val() == "R") ? $("#skinPurityC").val() : $("#sPurityC").val(),
			"meltingPurity" : $("#mPurity").val(),
			"GWt" : $("#grossWtC").val(),
			"NWt" : $("#netWt").val(),
			"PWt" : $('#pureWtC').val(),
			"pcs" : $('#pcsC').val(),
			"authId" : authId,
			"Stones" : stoneArray,
			"Accessory" : accArray,
		}
		
		console.log(JSON.stringify(rtvDetailsLines));
		postJSON('/OrderExecution/api/v1/createRTV',JSON.stringify(rtvDetailsLines),function(data) {
				if (data.resCode == "1") {	
					window.location.href="javascript:showContentPage('metalTransferVoucherCreate', 'bodySwitcher')"
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
				}
				else{
					$.growl.error({
						message : data.mesgStr,
						duration : 10000,
						title : 'Error'
					});
				}	
          });
}

var saveAdj = function(isAuthorized){	
	getAuthIds(isAuthorized);	
}

//Create RTV
$('#saveRtv').on('click', function(){
	var totStnWt = 0;
	var totAccWt = 0;
	
	var metalType = $("#metalTypeIdC").val();
	var zoneId = $("#mZoneIdC").val();
	var fromLocC = $("#fromLocC").val();
	var toLocC = $("#toLocC").val();
	var grossWtC = $("#grossWtC").val();
	var netWt = $("#netWt").val();
	var pcsC = $("#pcsC").val();
	var stoneRows = $("#jqxgridD").jqxGrid('getrows');
	var accRows = $("#jqxgridA").jqxGrid('getrows');
	
	if(metalType == "" || metalType == null || toLocC == "" || toLocC == null ||grossWtC == "" ||grossWtC == null 
			||netWt == "" || netWt == null || pcsC == "" || pcsC == null){
		 $.growl.error({
			message : "Please Fill Mandatory Fields",
			duration : 10000,
			title :'Error'
		})
		return false;
	}
	if( $("#rmFgC").val() == "F" && zoneId == "" || zoneId == null){
		 $.growl.error({
			message : "Please Select Moved to Zone !!",
			duration : 10000,
			title :'Error'
		});
			return false;
	}
	
	grossWtC = parseFloat(grossWtC).toFixed(3);
	netWt = parseFloat(netWt).toFixed(3);
	var diffGrNetWt = parseFloat(NVL(grossWtC,0)) - parseFloat(NVL(netWt,0));
	if(typeof stoneRows != "undefined" && stoneRows.length > 0){
		$.each(stoneRows, function(k, v){
			if(v.uom == "Cts"){
				totStnWt += parseFloat(NVL(v.stoneWt,0)) *0.2;
			}else{
				totStnWt += parseFloat(NVL(v.stoneWt,0));
			}
		
		});
	}
	totStnWt = totStnWt.toFixed(3);
	if(typeof accRows != "undefined" && accRows.length > 0){
		$.each(accRows, function(k, v){
			if(v.accUomC == "Cts" || v.accUomC == "Gms"){
				totAccWt += parseFloat(NVL(v.accWtC,0)) *0.2;
			}else{
				totAccWt += parseFloat(NVL(v.accWtC,0));
			}
		});
	}
	totAccWt = totAccWt.toFixed(3);
	console.log(totStnWt);
	var totWt = parseFloat(NVL(totStnWt,0)) + parseFloat(NVL(totAccWt,0));
	
	
	diffGrNetWt = diffGrNetWt.toFixed(3);	
	
	var expGrossWt = parseFloat(NVL(netWt,0)) +  parseFloat(NVL(totWt,0));
	expGrossWt = expGrossWt.toFixed(3);
	var diffGrNetWtPlus = parseFloat(expGrossWt) + parseFloat(toleranceLimit);
	var diffGrNetWtMinus = parseFloat(expGrossWt) - parseFloat(toleranceLimit);
	diffGrNetWtPlus = diffGrNetWtPlus.toFixed(3);
	diffGrNetWtMinus = diffGrNetWtMinus.toFixed(3);
	
	/*
	if( (parseFloat(NVL(totWt,0)) <= diffGrNetWtPlus) && (parseFloat(NVL(totWt,0)) >= diffGrNetWtMinus) ){
		 $.growl.error({message : "Difference Between Gross Weight & Net Weight Should be equal to sum of Stone + Accessory Weight.",duration : 10000,title :'Error'});
		 return false;
	}
	*/
	if(parseFloat(NVL(totWt,0)) != 0 && (parseFloat(NVL(grossWtC,0)) < parseFloat(NVL(diffGrNetWtMinus,0)) || parseFloat(NVL(grossWtC,0)) > parseFloat(NVL(diffGrNetWtPlus,0)))){
			$.growl.error({	message : "Expected gross wt is " + expGrossWt , duration : 10000,title : 'Error'});
			return false;
		
	}
	
	/*if(parseFloat(NVL(totWt,0)) == 0 && (parseFloat(NVL(grossWtC,0))  != parseFloat(NVL(netWt,0)))){
		$.growl.error({	message : "Gross wt and Net wt are not same" , duration : 10000,title : 'Error'});
		return false;
	}*/
	if(parseFloat(grossWtC) < parseFloat(netWt)){
		 $.growl.error({message : "Gross wt should be more than or equal to net wt.",duration : 10000,title :'Error'});
		 return false;
	}
	
	if(grossWtC == 0 || typeof grossWtC == "undefined" || grossWtC == "" || grossWtC == null){
		 $.growl.error({message : "Gross wt can not be zero.",duration : 10000,title :'Error'});
		 return false;
	}
	
	
		
	else if(toLocC == fromLocC ){
		 $.growl.error({
				message : "From and To Locations Can't be Same!!",
				duration : 10000,
				title :'Error'
			})
			return false;
	}/*else if($("#grossWtC").val() <grWt1 || $("#grossWtC").val() > grWt2){
		$.growl.error({
			message : "Metal Transfer is not possible !!!",
			duration  : 1000,
			title : "Error"
		});
		return false;
	}*/
	else{
		console.log(lossLocFlagG);
		if(lossLocFlagG == true){
			var authorization = {
					"code" : "ILA",
					"description" : "Item Loss Account",
					"docType" : "RTV",
					"docNo" : null,
					"transactionAmt" : null,
			}
			
			localStorage.setItem("authorization",JSON.stringify(authorization));
			openNav('ILA');
		}else{
			checkAuth();
		}
		
	}
});

$("#stonePcsC").on('change',function(){
	$("#stSellingRateC").val("");
	$("#stSellingPriceC").val("");
});

$("#stWeightC").on('blur',function(){
	var stWeightC = $("#stWeightC").val();
	var stSellingRateC = $("#stSellingRateC").val();
	var stoneSellingRateC = $("#stoneSellingRateC").val();
	if($("#stoneSegC option:selected").text() == "Diamond"){
		calculateCompPrice(stSellingRateC,stWeightC);
	}
	else{
		calculateCompPrice(stoneSellingRateC,stWeightC);

	}
});

$("#stSellingRateC").on('blur',function(){
	var stWeightC = $("#stWeightC").val();
	var stSellingRateC = $("#stSellingRateC").val();
	calculateCompPrice(stSellingRateC,stWeightC);
});

$("#stoneSellingRateC").on('blur',function(){
	var stWeightC = $("#stWeightC").val();
	var stSellingRateC = $("#stoneSellingRateC").val();
	calculateCompPrice(stSellingRateC,stWeightC);
});

var calculateCompPrice = function(rate,wt){
	var compPrice = wt * rate ;
	$("#stSellingPriceC").val(compPrice);
}
//Raise Transfer Voucher field Filters
var raiseTvFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var metalSegS = $("#metalSegS").val();
	var tvTypeS = $("#tvTypeS").val();
	var tvNoS = $("#tvNoS").val();
	var storeOrDcS = $("#storeOrDcS").val();
	var storeDcNameS = $("#storeDcNameS").val();
	var fromLocS = $("#fromLocS").val();
	var toLocS = $("#toLocS").val();
	var cZoneIdS = $("#cZoneIdS").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (metalSegS != "" && metalSegS != null) {
		fieldFilters.fieldFilters["segmentId"] = metalSegS;
	}
	if (tvTypeS != "" && tvTypeS != null) {
		fieldFilters.fieldFilters["TvType"] = tvTypeS;
	}
	if (tvNoS != "" && tvNoS != null) {
		fieldFilters.fieldFilters["tvNo"] = tvNoS;
	}
	if (storeOrDcS != "" && storeOrDcS != null) {
		fieldFilters.fieldFilters["storeOrDc"] = storeOrDcS;
	}
	if (storeDcNameS != "" && storeDcNameS != null) {
		fieldFilters.fieldFilters["storeOrDcName"] = storeDcNameS;
	}
	if (fromLocS != "" && fromLocS != null) {
		fieldFilters.fieldFilters["fromLoc"] = fromLocS;
	}
	if (toLocS != "" && toLocS != null) {
		fieldFilters.fieldFilters["toLoc"] = toLocS;
	}
	if (cZoneIdS != "" && cZoneIdS != null) {
		fieldFilters.fieldFilters["cZoneId"] = cZoneIdS;
	}
	
	return fieldFilters;
}

//Search grid started
function raiseTransferVoucherGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'tvNo',
		'type' : 'long',
		'map' : 'tvNo'
	}, {
		'name' : 'tvDate',
		'type' : 'date',
		'map'  : 'tvDate'
	}, {
		'name' : 'tvRaisedBy',
		'type' : 'String',
		'map'  : 'tvRaisedBy'
	}, {
		'name' : 'fromLoc',
		'type' : 'String',
		'map'  : 'FromLoc'
	}, {
		'name' : 'toLoc',
		'type' : 'string',
		'map'  : 'toLoc'
	}, {
		'name' : 'fromRefDocType',
		'type' : 'string',
		'map' : 'refDocType'
	}, {
		'name' : 'fromRefDocNo',
		'type' : 'long',
		'map'  : 'refDocNo'
	}, {
		'name' : 'fromRefSlNo',
		'type' : 'long',
		'map'  : 'refDocSrlNo'
	}, {
		'name' : 'grossWt',
		'type' : 'float',
		'map'  : 'GWt'
	}, {
		'name' : 'netWt',
		'type' : 'float',
		'map'  : 'NWt'
	}, {
		'name' : 'pureWt',
		'type' : 'float',
		'map'  : 'PWt'
	}, {
		'name' : 'pcs',
		'type' : 'long',
		'map'  : 'pcs'
	}, {
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'tvNo'
	} ];

	var columns = [ {
		'text' : 'TV No',
		'datafield' : 'tvNo',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'TV Date',
		'datafield' : 'tvDate',
		'width' : '10%',
		cellsformat : 'dd/MM/yyyy',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'TV Raised By',
		'datafield' : 'tvRaisedBy',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'From Location',
		'datafield' : 'fromLoc',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'To Location',
		'datafield' : 'toLoc',
		'width' : '8%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'From Ref Doc Type',
		'datafield' : 'fromRefDocType',
		'width' : '11%',
		sortable : true,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'From Ref Doc No',
		'datafield' : 'fromRefDocNo',
		'width' : '11%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		text : 'From Ref Srl No',
		datafield : 'fromRefSlNo',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '11%'
	}, {
		text : 'Gross Wt',
		datafield : 'grossWt',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : false,
		'width' : '6%'
	}, {
		text : 'Net Wt',
		datafield : 'netWt',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : false,
		'width' : '6%'
	}, {
		text : 'Pure Wt',
		datafield : 'pureWt',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : false,
		'width' : '6%'
	}, {
		'text' : 'Pcs',
		'datafield' : 'pcs',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		text : '',
		datafield : 'actionId',
		editable : false,
		cellsrenderer : viewRtvDetails,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '3%'
	} ];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchTVDetails", "list",columns, raiseTvFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 35,
		rowdetails : true,
		virtualmode : true,
	});
}

//Search Functionality
$("#search").on('click', function() {
	$form = $('#raiseTvForm');
    $form.validate({
        errorElement: 'label', 
        errorClass: 'help-inline', 
        focusInvalid: false, 
        ignore: "",
        rules: {
        	 "fromDateS":{ required: true, dateITA : true},
	    	 "toDateS":{ required: true, dateITA : true},
	    	 "tvTypeS":{required: true},
	    	 "metalSegS":{required: true},
	    	 "tvNoS":{ digits: true },
        },errorPlacement: function(error, element) {
        	if(element.context.name == "fromDateS" || element.context.name == "toDateS"){
        		error.insertAfter(element.parent());
        	}else{
        		error.insertAfter(element);
        	}
        }
    });
    if ($form.valid()) {
    	raiseTransferVoucherGrid();
		$("#jqxgrid").show();
    } else {
    	 return false;
    }
    return false;
 });


//Export function for Raise Transfer Voucher
$("#export").on("click",function() {
		var data;
		var fromDateS = $("#fromDateS").val();
		var toDateS = $("#toDateS").val();
		var metalSegS = $("#metalSegS").val();
		var tvTypeS = $("#tvTypeS").val();
		var tvNoS = $("#tvNoS").val();
		var storeOrDcS = $("#storeOrDcS").val();
		var storeDcNameS = $("#storeDcNameS").val();
		var fromLocS = $("#fromLocS").val();
		var toLocS = $("#toLocS").val();
		var cZoneIdS = $("#cZoneIdS").val();
	    
	    
		fieldFilters = {
			"fieldFilters" : {}
		};

		if (fromDateS != "" && fromDateS != null) {
			fieldFilters.fieldFilters["fromDate"] = fromDateS;
		}
		if (toDateS != "" && toDateS != null) {
			fieldFilters.fieldFilters["toDate"] = toDateS;
		}
		if (metalSegS != "" && metalSegS != null) {
			fieldFilters.fieldFilters["segmentId"] = metalSegS;
		}
		if (tvTypeS != "" && tvTypeS != null) {
			fieldFilters.fieldFilters["TvType"] = tvTypeS;
		}
		if (tvNoS != "" && tvNoS != null) {
			fieldFilters.fieldFilters["tvNo"] = tvNoS;
		}
		if (storeOrDcS != "" && storeOrDcS != null) {
			fieldFilters.fieldFilters["storeOrDc"] = storeOrDcS;
		}
		if (storeDcNameS != "" && storeDcNameS != null) {
			fieldFilters.fieldFilters["storeOrDcName"] = storeDcNameS;
		}
		if (fromLocS != "" && fromLocS != null) {
			fieldFilters.fieldFilters["fromLoc"] = fromLocS;
		}
		if (toLocS != "" && toLocS != null) {
			fieldFilters.fieldFilters["toLoc"] = toLocS;
		}
		if (cZoneIdS != "" && cZoneIdS != null) {
			fieldFilters.fieldFilters["cZoneId"] = cZoneIdS;
		}
		
					var sysdate = moment().format('DDMMYYYYHHmmSS');
					var rows = $('#jqxgrid').jqxGrid('getrows');
					if (  rows == undefined || rows == 0 ) {
						$.growl
						.error({
							message : "No Data To Export",
							duration : 10000
						});
						return false;
					}else{
						var rows = $("#jqxgrid").jqxGrid('getdatainformation');
							if(rows.rowscount != 0){
								var newData = [];					
								postJSON('/OrderExecution/api/v1/exportTVDetails',JSON.stringify(fieldFilters),function(response) {
									data = response.payload.list;
									for (i = 0; i < data.length; i++) {
									newData.push({	
									'TV No' : (data[i].tvNo != null) ? data[i].tvNo : "",
									'TV Date' : (data[i].tvDate != null) ? data[i].tvDate : "",
									'TV Type' : (data[i].tvType != null) ? ((data[i].tvType == "R") ? "Regular" : "System") : "",
									'TV Raised By' : (data[i].tvRaisedBy != null) ? data[i].tvRaisedBy : "",
									'From Location' : (data[i].FromLoc != null) ? data[i].FromLoc : "",
									'To Location' : (data[i].toLoc != null) ? data[i].toLoc : "",
									'From Ref Doc Type' : (data[i].refDocType != null) ? data[i].refDocType : "",
									'From Ref Doc No' : (data[i].refDocNo != null) ? data[i].refDocNo: "",
									'From Ref Srl No' : (data[i].refDocSrlNo != null) ? data[i].refDocSrlNo : "",
									'Gross Wt' : (data[i].GWt != null) ? data[i].GWt : "",
									'Net Wt' : (data[i].NWt != null) ? data[i].NWt : "",
									'Pure Wt' : (data[i].PWt != null) ?data[i].PWt	: "",
									'Pcs' : (data[i].pcs != null) ?data[i].pcs : "",
								});
							}
							//JSONToCSVConvertor(newData, "Raise Transfer Voucher" + "_" + sysdate, true);
							var opts = [{sheetid:'Raise_Transfer_Voucher',header:true}];
						    var res = alasql('SELECT * INTO XLSX("Raise Transfer Voucher_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
						});	
						}else{
							   $.growl
								.error({
									message : "No Data To Export",
									duration : 10000
								});
							   return false;	
							   }
						   }
				});

// view functionality started 
var viewRtvDet = function(tvNo)
{
	fieldFilters = {};
	 {
		fieldFilters["tvNo"] = tvNo;
	}	
	postJSON('/OrderExecution/api/v1/viewRTVDetails', JSON.stringify(fieldFilters), function(data){
		var vd = data.payload.tvList;	
		$("#tvNo").val(vd.tvNo);
		viewStoneDetGrid(vd.Stones);
		viewAccDetGrid(vd.Accessory);
		
	});
}

var viewRtvDetails = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"   data-target="#viewRtvDetails" type="button" id=' + row + ' onclick="viewRtvDet('+ value + ')" ><i class="fa fa-eye fa-sm"></i></button>';
}

// View Grids Started
//Stone Details View Grid
var viewStoneDetGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'stSrlNo', type : 'long','map' : 'refDocSrlNo'}, 
			{name : 'stSeg', type : 'string','map' : 'stoneSegment'},
			{name: 'stMainCat', type: 'string','map':'stoneCategory'},
			{name : 'stSubCatDesc', type : 'string','map':'stoneSubCatDesc'},
			{name : 'wtCostRange', type : 'string','map' : 'weightRange'},
			{name : 'clarity', type : 'string','map': 'clarity'},
			{name : 'color', type : 'string','map' : 'color'},
			{name : 'actColor', type : 'string','map': 'actualColor'},
			{name : 'cutGrade', type : 'string','map' : 'cutGrade'},
			{name : 'costPrice', type : 'float','map' :'costPrice'},
			{name : 'stoneWt', type : 'double','map' :'stoneWt'},
			{name : 'stonePcs', type : 'int','map' : 'stonePcs'},
			{name : 'sellingRate', type : 'double','map':'sellingRate'},
			{name : 'sellingPrice', type : 'double','map' : 'sellingPrice'},
			{name : 'stoneCode', type : 'string','map' :'stoneCode'},
			{name : 'uqc', type : 'string','map' :'uom'},
			{name : 'SuppBy', type : 'string','map' : 'suppliedBy'}
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewStoneDetGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		columnsheight : 65,
		autorowheight : true,
		theme: 'energyblue',
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'Srl No', datafield : 'stSrlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Seg', datafield : 'stSeg', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Category', datafield : 'stMainCat', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc/Sub Category', datafield : 'stSubCatDesc', width : '7%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Wt Cost Range', datafield : 'wtCostRange', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'Clarity', datafield : 'clarity', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Color', datafield : 'color', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Actual Color', datafield : 'actColor', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cut Grade', datafield : 'cutGrade', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cost Price', datafield : 'costPrice', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Stone Wt', datafield : 'stoneWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Stone Pcs', datafield : 'stonePcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Selling Rate', datafield : 'sellingRate', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Selling Price', datafield : 'sellingPrice', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Stone Code', datafield : 'stoneCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'uqc', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supplied By', datafield : 'SuppBy', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false}
		]
	});
}

//Accessory Details View Grid
var viewAccDetGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'accSrlNo', type : 'int','map': 'refDocSrlNo'},
			{name : 'mainCategory', type : 'string','map': 'mainCategory'},
			{name : 'subCatDesc', type : 'string','map': 'subcategoryDesc'},
			{name: 'weight', type: 'double','map' : 'weight'},
			{name : 'accPcs', type : 'int','map' : 'pcs'},
			{name : 'accCostPrice', type :'double','map':'costPrice'},
			{name : 'accSellingPrice', type :'double','map':'sellingPrice'},
			{name : 'accSellingRate', type : 'double','map':'sellingRate'},
			{name : 'accCode', type : 'string','map':'code'},
			{name : 'accUqc', type : 'string','map':'uom'},
			{name : 'suppBy', type : 'string','map':'suppliedBy'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewAccDetGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		height : 200,
		theme: 'energyblue',
		columnsheight : 40,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'Acc Srl No', datafield : 'accSrlNo', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Category', datafield : 'mainCategory', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Category', datafield : 'subCatDesc', width : '12%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Weight', datafield : 'weight', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Pieces', datafield : 'accPcs', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cost Price', datafield : 'accCostPrice', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Selling Price', datafield : 'accSellingPrice', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Selling Rate', datafield : 'accSellingRate', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Acc Code', datafield : 'accCode', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'accUqc', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supplied By', datafield : 'suppBy', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false, columntype: 'numberinput'}]
	});
}

$("#metalTypeIdC").on('change',function(){
	var id = $("#metalTypeIdC").val();
	$.getJSON('/OrderExecution/api/v1/raiseTransferVoucherOnloadLovs?type=Purity&segmentId='+id,function(data){
		$('#skinPurityC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.purityList, function(key, val) {
			$('#skinPurityC').append('<option value="' + val.id + '">' + val.name + '</option>');
	    });
	});
	if(id != "" ||  id != null && $("#rmFgC").val() == "R"){
		loadLocForRM();
	}
});

$("#skinPurityC").on('change',function(){
	var id = $("#skinPurityC").val();
	var segmentId  = $("#metalTypeIdC").val();
	$.getJSON('/OrderExecution/api/v1/raiseTransferVoucherOnloadLovs?type=melPurity&&skinPurity='+id+'&&segmentId='+segmentId,function(data){
			$('#mPurity').val(data.payload.melPurity.meltingPurity);
		});
	if($("#rmFgC").val() == "R"){
		$("#grossWtC").val("");
	}
});

//Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('metalTransferVoucher', 'bodySwitcher')"
});

//Clear grid and reset input and Drop down value
$("#clear").on('click', function() {
	window.location.href="javascript:showContentPage('metalTransferVoucherCreate', 'bodySwitcher')"
});

$('#addStoneDetails').on('hidden.bs.modal', function() {
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();
});

$('#addAccDetails').on('hidden.bs.modal', function() {
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();
});

var NVL = function(source, replaceMentValue){
	if(typeof source != "undefined" && source != null && source != ""){
		return source;
	}
	else return replaceMentValue;
}
