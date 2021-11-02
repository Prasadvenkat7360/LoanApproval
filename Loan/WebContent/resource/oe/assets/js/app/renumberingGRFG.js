// Renumbering of GR
$("#searchGrFgForm").show();
$("#createGrFgForm").hide();
$("#create").show();
$("#back").hide();
var type = $("#optionType").val();
$("#igrNoSec").hide();
$("#refTypeSec").hide();
$("#refNoSec").hide();
$("#refSlNoSec").hide();
$("#vendorSec").hide();
$("#searchSec").hide();
$("#create").hide();
$("#fromDateSec").hide();
$("#toDateSec").hide();
$("#metalSegSec").hide();
$("#refNoS").hide();
$("#refTypeStar").hide();
$("#refNoStar").hide();
$("#refSlNoStar").hide();
$("#vendorStar").hide();

$("#optionType").on('change', function(){
	if($(this).val() == "S"){
		$("#igrNoSec").show();
		$("#refTypeSec").show();
		$("#refNoSec").show();
		$("#refSlNo").show();
		$("#vendorSec").hide();
		$("#searchSec").show();
		$("#create").hide();
		$("#fromDateSec").show();
		$("#toDateSec").show();
		$("#refSlNoSec").hide();
		$("#metalSegSec").show();
		$("#refNoS").show();
		$("#refNo").hide();
		$("#back").show();

		$("#refTypeStar").hide();
		$("#refNoStar").hide();
		$("#refSlNoStar").hide();
		$("#vendorStar").hide();
		
	}else if($(this).val() == "C"){
		$("#igrNoSec").hide();
		$("#refTypeSec").show();
		$("#refNoSec").show();
		$("#refSlNoSec").show();
		$("#vendorSec").show();
		$("#searchSec").hide();
		$("#create").show();
		$("#fromDateSec").hide();
		$("#back").hide();
		$("#toDateSec").hide();
		$("#metalSegSec").hide();
		$("#refNoS").hide();
		$("#refNo").show();
		$("#refTypeStar").show();
		$("#refNoStar").show();
		$("#refSlNoStar").show();
		$("#vendorStar").show();
	}else{
		$("#igrNoSec").hide();
		$("#igrNoSec").hide();
		$("#refTypeSec").hide();
		$("#refNoSec").hide();
		$("#refSlNoSec").hide();
		$("#vendorSec").hide();
		$("#searchSec").hide();
		$("#create").hide();
		$("#fromDateSec").hide();
		$("#toDateSec").hide();
		$("#metalSegSec").hide();
		$("#refNoS").hide();
		$("#refNo").show();
		$("#back").hide();
		$("#refTypeStar").hide();
		$("#refNoStar").hide();
		$("#refSlNoStar").hide();
		$("#vendorStar").hide();
	}
});

//Date From
$("#fromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDate").datepicker('option', 'minDate', min || '0');
    }
});

//Date To
$("#toDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

var redirect = function() {
	window.location.href = "javascript:showContentPage('renumberingGRFG', 'bodySwitcher')";
	return window.location.href;
}

var rowId = 0;
// Generate stone row
var generaterowstone = function(grSlNo,i,stoneArray){
	var row = {};	
	row['srl'] = grSlNo;
	row['stoneSrlNo'] = stoneArray.stoneSrlNo;	
	row["globalAttrFlagStone"] = stoneArray.globalAttrFlagStone;
	row["suppliedBy"] = stoneArray.suppliedBy;
	row["suppliedBys"] = stoneArray.suppliedBys;
	row["stoneCode"] = stoneArray.stoneCode;
	row["subCategoryDesc"] = stoneArray.subCategoryDesc;
	row["costRange"] = stoneArray.costRange;
	row["usedPcs"] = (stoneArray.usedPcs == null || stoneArray.usedPcs == "") ? 0 : parseInt(stoneArray.usedPcs);
	row["usedWt"] = (stoneArray.usedWt == null || stoneArray.usedWt == "") ? 0.000 : parseFloat(stoneArray.usedWt);
	row["UOM"] = stoneArray.UOM;
	row["stoneCostRate"] = stoneArray.stoneCostRate;
	row["stoneCostPrice"] = stoneArray.stoneCostPrice;
	row["actualColor"] = stoneArray.actualColor;
	row["color"] = stoneArray.color;
	row["cutGrade"] = stoneArray.cutGrade;
	row["clarity"] = stoneArray.clarity;
	row["weightSlab"] = stoneArray.weightSlab;
	row["handlingCharge"] = stoneArray.handlingCharge;
	row["fromWeightCostRange"] = stoneArray.fromWeightCostRange;
	row["toWeightCostRange"] = stoneArray.toWeightCostRange;
	row["certificateDetail"] = stoneArray.certificateDetail;
	row["toColorDiamondCost"] = stoneArray.toColorDiamondCost;
	row["fromColorDiamondCost"] =  stoneArray.fromColorDiamondCost;

	row["sellingRate"] = stoneArray.sellingRate;
	row["sellingPrice"] = stoneArray.sellingPrice;
	row["subCategoryId"] =  stoneArray.subCategoryId;
	row["stoneSegment"] =  stoneArray.stoneSegment;
	row["CategoryName"] =  stoneArray.CategoryName;
	row["subCategoryId"] =  stoneArray.subCategoryId;
	row["CategoryId"] =   stoneArray.CategoryId;
	row["stoneStandardRate"] =   stoneArray.stoneStandardRate;
	row['isPsr'] = "N";
	
	return row;
}

var generaterowacc = function(grSlNo,i,accArray){
	var headerGridData = $("#grDetailsGrid").jqxGrid('getrows');
	console.log(headerGridData);
	console.log(grSlNo);
	console.log(accArray);
	var actualRefType ;
	var actualRefSrlNo ;
	var actualRefDocNo ;
    
	
	$.each(headerGridData,function(k,v){
		if(v.srl == grSlNo){
			actualRefType = v.actualRefType;
			actualRefDocNo = v.actualRefDocNo;
			actualRefSrlNo = v.actualRefSrlNo
		}
	});
	var row = {};	
	row['srl'] = grSlNo;
	row['accessorySrlNo'] = accArray.accessorySrlNo;
	row['suppliedBy'] = accArray.suppliedBy;
	row['suppliedBys'] = accArray.suppliedBys;

	row["globalAttrFlagAcc"] = accArray.globalAttrFlagStone;
	row['accessoryCode'] = accArray.accessoryCode;
	row['accSubCategory'] = accArray.accSubCategory;
	row['usedPcs'] = (accArray.usedPcs == null || accArray.usedPcs == "") ? 0 : parseInt(accArray.usedPcs);
	row['usedwt'] = (accArray.usedwt == null || accArray.usedwt == "") ? 0.000 : parseFloat(accArray.usedwt);
	row['UOM'] = accArray.UOM;
	row['accessoryCostRate'] = accArray.accessoryCostRate;
	row['accessoryCost'] = accArray.accessoryCost;
	row['fromCostRange'] = accArray.fromCostRange;	
	row['vendorId'] = accArray.vendorId;	
	row['costRate'] = accArray.costRate;
	row['fromCostRange'] = accArray.fromCostRange;
	row['toCostRange'] = accArray.toCostRange;
	row['sellingPrice'] = accArray.sellingPrice;
	row['sellingRate'] = accArray.sellingRate;
	row['accStandardRate'] = accArray.accStandardRate;
	row['subCategoryDesc'] = accArray.aubCategoryDesc;
	row['costRange'] = accArray.costRange;	
	row['isPsr'] = "N";
	row['actualRefType'] = actualRefType;
	row['actualRefDocNo'] = actualRefDocNo;
	row['actualRefSrlNo'] = actualRefSrlNo;
	
	return row;
}

var generateRowHeader = function(i,data){
	var row = {};
	if(typeof data != "undefined"){
		if(data.costCode == "M"){
			var costCodeName = "Manufacturer";
		}
		if(data.costCode == "T"){
			var costCodeName = "Total Cost";
		}
	
		row['srl'] = i;
		row['psr'] = "N";
		row['psrNos'] = "None";
		row['pieces'] = (data.pieces == null || data.pieces == "")? 0 : parseInt(data.pieces);
		row['netWt'] = (data.netWt == null || data.netWt == "") ? 0.000 : parseFloat(data.netWt);
		row['actualNetWt'] = (data.netWt == null || data.netWt == "") ? 0.000 : parseFloat(data.netWt);
		row['skinPurity'] = data.skinPurity;
		row['skinPurityList'] = data.listSkinPurity;
		row['meltingPurity'] = data.meltingPurity;
		row['actualRefType'] = data.actualRefType;
		row['actualRefSrlNo'] = data.actualRefSrlNo;
		row['actualRefDocNo'] = data.actualRefDocNo;
		row['refType'] = $("#refType").val();
		row['refNo'] = $("#refNo").val();
		row['refSrlNo'] = $("#refSlNo").val();
		row['grossWt'] = (data.grossWt == null || data.grossWt == "") ? 0.000 : parseFloat(data.grossWt);
		row['actualGrossWt'] = (data.grossWt == null || data.grossWt == "") ? 0.000 : parseFloat(data.grossWt);
		row['psrNo'] = data.psrNo;
		row['attributes'] = "False";
		row['setSellingPrice'] = false;
		row['vendorCode'] = $("#vendorCode option:selected").text();		
		row['vendorId'] =  $("#vendorCode").val();
		row['articleSegmentid'] = data.articleSegmentid;
		row['articleCode'] = data.articleCode;
		row['articleDescription'] = data.articleDescription;
		row['articleFlag'] = data.articleFlag;
		row['jewelTypeId'] = data.jewelTypeId;
		row['subCategory'] = data.subCategory;
		row['category'] = data.category;
		row['costCode'] = data.costCode;
		row['costCodes'] = costCodeName;
		row['status'] = data.status;
		row['metalLoc'] = data.metalLoc;
		row['isMetalPosNeg'] = data.isMetalPosNeg;
		row['diffInWt'] = data.diffInWt;
		row['costMCTotalCost'] = data.costMCTotalCost;
		row['costWastage'] = data.costWastage;
		row['sellingMCTotalCost'] = data.sellingMCTotalCost;
		row['sellingWastage'] = data.sellingWastage;
		row['pureWt'] = data.pureWt;
		row['metalValue'] = data.metalValue;
		row['wastageCharges'] = data.wastageCharges;
		row['wastageWt'] = data.wastageWt;
		row['wastageValue'] = data.wastageValue;
		row['mapRate'] = data.mapRate;
		row['dealerMFGFlag'] = data.dealerMFGFlag;
		row['isSpManual'] = data.isSpManual;
		row['boardRate'] = data.boardRate;
		row['metalTypeId'] = data.metalTypeId;
		row['attributeDia'] = data.attributeDia;
		row['attributeHeight'] = data.attributeHeight;
		row['attributeHookType'] = data.attributeHookType;
		row['attributeLength'] = data.attributeLength;
		row['attributeLoopType'] = data.attributeLoopType;
		row['attributeMetalColorType'] = data.attributeMetalColorType;
		row['attributePolishType'] = data.attributePolishType;
		row['attributeScrewType'] = data.attributeScrewType;
		row['attributeSettingType'] = data.attributeSettingType;
		row['attributeSize'] = data.attributeSize;
		row['attributeWidth'] = data.attributeWidth;
		row['hsnId'] = data.hsnId;
		row['pureRate'] = data.pureRate;
		
		row['stoneList'] = data.stoneList;
		row['accessoryList'] = data.accessoryList;
		
		row['actsellMC'] = data.sellingMCTotalCost;
		row['actsellWastageWt'] = data.sellingWastage;
		row['actcostMC'] = data.costMCTotalCost;
		row['actcostWastageWt'] = data.wastageWt;
		return row;
	}
}

var updateToGRRENHeader = function(data){
	var stoneArray = [];
	var accArray = [];
	if(typeof data != "undefined"){
		$("#grDetailsGrid").jqxGrid('addrow', null, generateRowHeader(1,data));				
	
		var stoneArray = data.stoneList;
		var accArray = data.accessoryList;
		
		if(stoneArray != null && typeof stoneArray != "undefined"){
			if(stoneArray.length != 0){			
				for(var j=0; j<stoneArray.length;j++){				
					//onloadCostRangeApiFirst(1,j,stoneArray[j]);
					$("#stoneDetailsGrid").jqxGrid('addrow', null, generaterowstone(1,j,stoneArray[j]));	
					
					
				}
			}
		}
		if(accArray != null && typeof accArray != "undefined"){
			if(accArray.length != 0){			
				for(var k=0; k<accArray.length;k++){			
					$("#accDetailsGrid").jqxGrid('addrow', null, generaterowacc(1, k, accArray[k]));				
				}
			}
		}
	
	}
}

// On load Reference Type
var onloadRefType = function(flag){
	var api="";
	var refType = $("#refType").val();
	var refDocNo = $("#refNo").val();
	var refSlNo = $("#refSlNo").val();
	var vendorId  = $("#vendorCode").val();
	refType = refType.toString();

	if(flag == 1){	api = "/OrderExecution/api/v1/grFGReNumOnLoadLov?Type=onLoad";}
	if(flag == 2){	api = "/OrderExecution/api/v1/grFGReNumOnLoadLov?refType="+refType+"&refDocNo="+refDocNo+"&Type=getSrlNo";}
	if(flag == 3){	api = "/OrderExecution/api/v1/getListOfVendors?refType="+refType+"&refDocNo="+refDocNo+"&refSiNO="+refSlNo;}
	if(flag == 4){	api = "/OrderExecution/api/v1/grFgReNumOnCreateLov?refType="+refType+"&refDocNo="+refDocNo+"&refSiNO="+refSlNo+"&venderId="+vendorId;}
	$.getJSON(api, function(data) {
		if(typeof data != "undefined" && data.resCode == "1"){
			
			// Create on-load api started
			if(flag == 1){
				var refTypeArr = [];
				$.each(data.payload.refTypes,function(k,v){
					if(v.id != 'ASM'){
						refTypeArr.push(v);
					}
				});
				$.each(refTypeArr, function(key, val) {
					 $("#refType").append('<option value="' + val.id + '">' + val.name + '</option>');
				 });
			}
			if(flag == 2){
				$.each(data.payload.srlNos, function(key, val) {
					 $("#refSlNo").append('<option value="' + val + '">' + val + '</option>');
				 });
				dataArrCreateFlag = true;
			}
			
			if(flag == 3){
			
				$.each(data.payload.renumGrVendors.listOfVenders, function(key, val) {
					 $("#vendorCode").append('<option value="' + val.id + '">' + val.name + '</option>');
				 });
			}
			
			if(flag == 4){
				updateToGRRENHeader(data.payload.renumGrDetails);
			}
		}else{
			$("#searchGrFgForm").show();
			$("#createGrFgForm").hide();
			$("#create").show();
			$("#back").hide();
			$("#grDetailsId").hide();
			//dataArrCreateFlag = false;
			$.growl.error({ message: data.mesgStr, duration: 5000, title: 'Error' });
			return false;
		}
	});
}

onloadRefType(1);
var dataArrCreateFlag = true;
var onloadRefTypeCreate = function(flag, dataArrCreateFlag, searchFlag){
	var refType = $("#refType").val();
	if(searchFlag == "S"){
		var refNo = $("#refNoS").val();
		var refSiNO = $("#igrNo").val();
	}else{
		var refNo = $("#refNo").val();	
		var refSiNO = 0;
	}
	
	if(flag == 2 && dataArrCreateFlag == true){
		if(flag == 2){	api = "/OrderExecution/api/v1/getListOfVendors?refType="+refType+"&refDocNo="+refNo+"&refSiNO="+refSiNO;}
		
		api1 = "/OrderExecution/api/v1/grFGReNumOnLoadLov?refType="+refType+"&refDocNo="+$("#refNo").val()+"&Type=getSrlNo";
		
		$.getJSON(api, function(data) {
			$.each(data.payload.igrNosAndRefNos, function(key, val) {
				 $("#igrNo").append('<option value="' + val + '">' + val + '</option>');
			 });
			
	
			
			/*var dataArr = [];
			$.each( data.payload.renumGrVendors.listOfVenders, function( key, value ) {
				dataArr.push({ value: value.id, label: value.name});
			});
		
			$("#vendorCode").autocomplete({				
				source: dataArr,
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#vendorCode-value").val(ui.item.value);
				}
			});*/
			$.each(data.payload.renumGrVendors.listOfVenders, function(key, val) {
				 $("#vendorCode").append('<option value="' + val.id + '">' + val.name + '</option>');
			 });
		});
		
		$.getJSON(api1, function(data) {
			
			if(data.resCode == "1"){
				$("#create").prop('disabled',false);
				$.each(data.payload.srlNos, function(key, val) {
					 $("#refSlNo").append('<option value="' + val + '">' + val + '</option>');
				 });
			}else{
			$("#create").prop('disabled',true);
				$.growl.error({
					message: data.mesgStr,
					title :'Error',
					duration :1000,	
				});
				return false;
			}
		});
	}
}

var onloadRefTypeSearch = function(flag){
	var refType = $("#refType").val();
	var refNo = $("#refNoS").val();	
	
	if(flag == 1){	api = "/OrderExecution/api/v1/getRenumIgrNosAndRefNos?searchType=refNos&refType="+refType;}
	if(flag == 2){	api = "/OrderExecution/api/v1/getRenumIgrNosAndRefNos?searchType=igrNos&refType="+refType+"&refNo="+refNo;}
	
	$.getJSON(api, function(data) {
		if(typeof data != "undefined" && data.resCode == "1"){

			if(flag == 1){
				$.each(data.payload.igrNosAndRefNos, function(key, val) {
					 $("#refNoS").append('<option value="' + val + '">' + val + '</option>');
				 });
			
			}
			if(flag == 2){
				$.each(data.payload.igrNosAndRefNos, function(key, val) {
					 $("#igrNo").append('<option value="' + val + '">' + val + '</option>');
				 });
			}
			
			
		}
	});
			
}

//On change Reference Type load reference serial no.
$("#refType").on('change', function(){
	$("#refSlNo").val('');
	var optionType = $("#optionType").val();
	var refType = $("#refType").val();
	if(optionType == "S"){
		onloadRefTypeSearch(1);
	}
	
	if(refType == "TV" || refType == "MR" || refType == "ASM" || refType == "S"){
		$("#refSlNo").prop('disabled', true);
	}else{
		$("#refSlNo").prop('disabled', false);
	}
});

// On change Reference Type load reference serial no.
$("#refNo").on('change', function(){
	$("#refSlNo").val('');
	var refType = $("#refType").val();
	console.log(dataArrCreateFlag);
	
	if(refType == "TV" || refType == "MR" || refType == "S" || refType == "ASM"){
		onloadRefTypeCreate(2, dataArrCreateFlag, null);
	}else{
		onloadRefType(2);
	}
})

$("#refNoS").on('change', function(){
	onloadRefTypeSearch(2);
});

/*$("#igrNo").on('change', function(){
	onloadRefTypeCreate(2, true, "S");
});*/
//On click Reference Type load reference serial no.
$("#refSlNo").on('change', function(){
	onloadRefType(3);
});


// Common validation GR header
var commonGRHEaderValidation = function(cell, value){
	if(value < 0) { return { result: false, message: "Invalid Number" }};
}


//Master Grid
var articleSearchPopUp = function()  {	
	var rowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#grDetailsGrid").jqxGrid('getrowid', rowindex);
	var row = $("#grDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	if(typeof row != "undefined" || row != null){		
		//+ row.articleSegmentid
		$("#articleSearch").modal({ remote: "articleSearch?vendorId=" + row.vendorId + "&segId="+row.articleSegmentid, target: "articleSearch" });
	}	
	return true;
}

//On modal close store modal details in grid column.
$('#articleSearch').on('hide.bs.modal', function(e) {	
    var rowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#grDetailsGrid").jqxGrid('getrowid', rowindex);
	var netwt = $("#grDetailsGrid").jqxGrid('getcellvalue', rowindex,'netWt');
	var row = $("#grDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	if($("#articleCode").val() != "") {
		row['articleCode'] = $("#articleCode").val();		
		row['hsnId'] = $("#hsnMasterId").val();		
		row['articleDescription'] = $("#articleDesc").val();
		row['articleSegmentid'] = $("#segment").val();
		row['jewelTypeId'] = parseInt($("#jewelType option:selected").val());
		row['jwlType'] =  $("#jewelType option:selected").attr("CodeJwl");
		
		row['isPair'] = $("#isPair").val();
		row['taxStructureId'] = $("#taxStructureId").val();
		row['category'] = $("#category").val();
		row['subCategory'] = $("#subCategory").val();
		row['metalTypeId'] = $("#metalTypeId").val();
		$('#grDetailsGrid').jqxGrid('updaterow', rowid, row);
		//updateGrCostCode(rowid ,netwt, row.costCode, 0, 0, '', 0);
	}
	$("#grDetailsGrid").jqxGrid('focus');
});


// Common check editable / Non-Editable
var commonGEHeaderEditable = function(row, datafield, columntype){
	if(datafield == "articleCode"){articleSearchPopUp();}
}

var deleteGrDetailsRow = function(){
	
	var selectedrowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var rowscount = $("#grDetailsGrid").jqxGrid('getdatainformation').rowscount;	
	var grSlNo =  $('#grDetailsGrid').jqxGrid('getcellvalue', selectedrowindex, 'srl');
	var orderType =  $('#grDetailsGrid').jqxGrid('getcellvalue', selectedrowindex, 'orderType');
	var psr =  $('#grDetailsGrid').jqxGrid('getcellvalue', selectedrowindex, 'psr');
	
	
	if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
		var id = $("#grDetailsGrid").jqxGrid('getrowid',selectedrowindex);
		var commit = $("#grDetailsGrid").jqxGrid('deleterow', id);
	}
	
	var stoneRows = $("#stoneDetailsGrid").jqxGrid('getrows');

	for (var j = selectedrowindex; j < rowscount; j++) {
		$("#grDetailsGrid").jqxGrid("setcellvalue", j,"srl", j + 1);
	}			
	
	
	var stoneRows = $("#stoneDetailsGrid").jqxGrid('getrows');
		for(var i=0; i<stoneRows.length; i++){	
			if(grSlNo <= stoneRows[i].srl){
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', i, 'srl', stoneRows[i].srl -1);
			}
		}
	
	var accRows = $("#accDetailsGrid").jqxGrid('getrows');
	for(var i=0; i<accRows.length; i++){	
		if(grSlNo <= accRows[i].srl){
			$("#accDetailsGrid").jqxGrid('setcellvalue', i, 'srl', accRows[i].srl -1);
		}
	}

	
	
	setTimeout(function () {
		$('#grDetailsGrid').jqxGrid('selectrow', (rowscount - 2));
		$('#grDetailsGrid').jqxGrid('ensurerowvisible', (rowscount - 2));
	}, 0);
	
}

var grCostCodeEditable = function(row, datafield, columntype) {
	var costCode =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costCode');
	var orderKind =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'orderKind');
	
	var actcostMC =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actcostMCTotalCost');
	var actcostWastageWt =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actcostWastageWt');
	var isRwk =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'isRwk');
	var actualRefType =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actualRefType');
	var refType =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'refType');
	var setSellingPrice =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'setSellingPrice');
	var skinPurityList =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'skinPurityList');
	
	if("CSP" == orderKind || "SSP" == orderKind){	
		return false;
	}else if(datafield == "costCode" && actualRefType == "TV" && costCode == "RawMaterial"){
		return true;
	}else if(datafield == "costCode"  && actualRefType == "ASM" && costCode == "RawMaterial"){
		return true;
	}
	else if( datafield =="skinPurityN" && actualRefType == "PB"){
		return true;
	}else if(skinPurityList == null){
		return false;
	}else if (datafield == "costCode" && actualRefType != "PB" ){
		return false;
	}
	else if(setSellingPrice == false && (datafield == "costWastage" || datafield == "costMCTotalCost" || datafield == "sellingWastage" || datafield == "sellingMCTotalCost") && actualRefType != "PB"){		
		return false;		
	}else if(setSellingPrice == true && (datafield == "costWastage" || datafield == "costMCTotalCost") && actualRefType != "PB"){		
		return false;		
	}else if(costCode == "T" && datafield == "costWastage" && actualRefType != "PB"){		
		return false;		
	}else if("SRP" == orderKind && datafield == "costCode" && costCode == "T"){		
		return false;		
	}else if ((costCode == "T" || costCode == "R") && (datafield == "costWastage" || datafield == "sellingWastage")) {    	
    	return false;        
    }else if ((costCode == "M" && (datafield == "costWastage" || datafield == "sellingWastage")) && actualRefType == "PB") {    	
    	return true;        
    }else if ((costCode == "T" || costCode == "R") && (datafield == "costMCTotalCost" || datafield =="sellingMCTotalCost")) {    	
    	return true;        
    }else{
    	return true;
    }	
}

var attributeSearchPopUp = function (row)  {
	var articleCode = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'articleCode');
	var attributes = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'attributes');
	var globalAttrFlag = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'globalAttrFlag');
	var isDueDtFlag =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'isDueDtFlag');
	var orderKind = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'orderKind');
	if(orderKind == "SSP" || orderKind == "CSP"){ return false;}
	
	var rowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#grDetailsGrid").jqxGrid('getrowid', rowindex);
	var row = $("#grDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	
	
	var  reason = $("#reason").val();
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
	
	if(attributes != "True") { $("#manageAttributesForm").trigger('reset'); }else
	{
		var url = "api/v1/attributeSearchGr?article=" + articleCode;
		  $("#attributeSearch").find('.modal-content').load(url,function(result){
				$("#attributeSearch").modal({show:true,  target: "attributeSearch"});
				populateAttributePopUp(
						row['attributeLength'], row['attributeSize'], row['attributeHeight'],row['attributeDia'], row['attributeWidth'], row['attributeMetalColorType'],row['attributeHookType'], row['attributeScrewType'], row['attributeLoopType'],
						row['attributePolishType'], row['attributeSettingType'],row['vendorArticle'], row['combination'],	row['collectionName'],row['reason'],row['isDueDtFlag']
					);
			});
	
	}
	
	if(articleCode == null) {
		$.growl.error({ message: "Article Code is mandatory to set the attributes!", duration: 5000, title: 'Error' });
		return false;
	}
	
	if(globalAttrFlag == null){
		var url = "api/v1/attributeSearchGr?article=" + articleCode;
		  $('#attributeSearch').find('.modal-content').load(url,function(result){
				$("#attributeSearch").modal({show:true,  target: "attributeSearch"});
				populateAttributePopUp(
						row['attributeLength'], row['attributeSize'], row['attributeHeight'],row['attributeDia'], row['attributeWidth'], row['attributeMetalColorType'],row['attributeHookType'], row['attributeScrewType'], row['attributeLoopType'],
						row['attributePolishType'], row['attributeSettingType'],row['vendorArticle'], row['combination'],	row['collectionName'],row['reason'],row['isDueDtFlag']
					);
			});
		  
		
		$('#grDetailsGrid').jqxGrid('setcellvalue', row, 'globalAttrFlag', 1);
	}
	if(globalAttrFlag == 1){
		$("#attributeSearch").modal({ remote: "api/v1/attributeSearchGr?article=" + articleCode, target: "attributeSearch" });
	}
}

var checkAttrValidate = function(){
	var rowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var isDueDtFlag =  $('#grDetailsGrid').jqxGrid('getcellvalue', rowindex, 'isDueDtFlag');
	var validate = false;
	$('#manageAttributesForm input, #manageAttributesForm select, #manageAttributesForm textarea').each( function(index){
		var input = $(this);
		var label = input.attr('id');
		var alt = input.attr('alt');
		var idName = "#"+input.attr('id');
		var value = $(idName).val();
		globalAttrFlag = 0;
		if(value == null || value == "" && label != "isDueDtFlag" && label != "reason" && label != "vendorArticle" && label != "combination"){
			globalAttrFlag = 0
			$.growl.error({ message: alt + " are mandatory.", duration: 10000});
			return false;
		}else if(isDueDtFlag == "true" || isDueDtFlag == true){
			var reason = $("#reason").val();
			if(reason == "" || reason == null){
				globalAttrFlag = 0;
				$.growl.error({ message: "Please enter reason.", duration: 10000});
				return false;
			}else{
				globalAttrFlag = 1;
			}
		}else{
			globalAttrFlag = 1
		}
	});
	
	if(globalAttrFlag == 1){
		validate = true;
	}
	return validate;
}

var updateAttribute = function(){
	
	var rowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
		var rowid = $("#grDetailsGrid").jqxGrid('getrowid', rowindex);
		var row = $("#grDetailsGrid").jqxGrid('getrowdatabyid', rowid);
		
		if($("#length").val() != "") {
			row['attributeLength'] = $("#length").val();
		}
		if($("#size").val() != "") {
			row['attributeSize'] = $("#size").val();
		}	
		if($("#height").val() != "") {
			row['attributeHeight'] = $("#height").val();
		}
		if($("#diameter").val() != "") {
			row['attributeDia'] = $("#diameter").val();
		}
		if($("#width").val() != "") {
			row['attributeWidth'] = $("#width").val();
		}
		if($("#vendorArticle").val() != "") {
			row['vendorArticle'] = $("#vendorArticle").val();
		}
		if($("#combination").val() != "") {
			row['combination'] = $("#combination").val();
		}
		if($("#metalColor").val() != "") {
			row['attributeMetalColorType'] = $("#metalColor").val();
		}
		if($("#hookType").val() != "") {
			row['attributeHookType'] = $("#hookType").val();
		}
		if($("#screwType").val() != "") {
			row['attributeScrewType'] = $("#screwType").val();
		}
		if($("#loopType").val() != "") {
			row['attributeLoopType'] = $("#loopType").val();
		}
		if($("#polishType").val() != "") {
			row['attributePolishType'] = $("#polishType").val();
		}
		if($("#settingType").val() != "") {
			row['attributeSettingType'] = $("#settingType").val();
		}
		if($("#collectionName").val() != "") {
			row['collectionName'] = $("#collectionName").val();
		}
		
		row['reason'] = $("#reason").val();			
		row["attributes"] ="True";
		
		$("#grDetailsGrid").jqxGrid('updaterow', rowid, row);
}



$('#attributeSearch').on('hide.bs.modal', function(e) {
	var rowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var psr = $("#grDetailsGrid").jqxGrid('getcellvalue', rowindex, 'psr');
	if(psr != "N" && psr != null){
		updateAttribute();		
	}
});

//GR cost code field filters
var grCostFilterValues = function(row , netwt, costCode, costWastageWT, costMC, isEditedSellWastageWT, sellingWastageWt) {
	grDto = {};
	var vendorCode = $('#vendorCode').val();	
	var rowObj =  $("#grDetailsGrid").jqxGrid('getrowdatabyid', row);	
	grDto.vendorCode = vendorCode;
	grDto.skinPurity = rowObj.skinPurity;
	grDto.segmentId = rowObj.articleSegmentid;
	grDto.articleCode = rowObj.articleCode;
	grDto.grossWt = parseFloat(rowObj.grossWt);
	grDto.netWt = parseFloat(netwt);
	grDto.pcs = rowObj.pieces;
	grDto.isEditedSellWastageWT = parseInt(isEditedSellWastageWT);
	grDto.sellingWastageWt = parseFloat(sellingWastageWt);
	grDto.costCode = costCode;
	grDto.costMC = costMC;
	grDto.accCostMC = rowObj.actcostMC;
	grDto.costWastage = costWastageWT;
	grDto.accCostWastage = rowObj.actcostWastageWt;;
	grDto.psr = "N";
	grDto.metalRate = 200.00;
	
	return grDto;
}

var updateGrCostCode = function(row, netWt, costCode, costWastageWT, costMC, datafield, isEditedSellingWastage, sellingWastage ){
	var refType =  $('#refType').val();
	var refDocNo =  $('#refNo').val();
	var actualRefType = $("#grDetailsGrid").jqxGrid('getcellvalue', row,'actualRefType');
	var refSiNO =   (actualRefType == "TV") ? 0 : $('#refSlNo').val();
	var actualRefDocNo = $("#grDetailsGrid").jqxGrid('getcellvalue', row,'actualRefDocNo');
	var actRefType = (actualRefType == "TV" || (refType == "TV" && actualRefType == "ASM") ) ? "PB" : actualRefType;
	var actualRefSrlNo = $("#grDetailsGrid").jqxGrid('getcellvalue', row,'actualRefSrlNo');
	
	if(actualRefDocNo == null){
		var url = '/OrderExecution/api/v1/RenumGrCostCode?refType='+actRefType+'&refDocNo='+refDocNo+'&refSiNO='+refSiNO;
	}else{
		var url = '/OrderExecution/api/v1/RenumGrCostCode?refType='+actRefType+'&refDocNo='+actualRefDocNo+'&refSiNO='+actualRefSrlNo;
	}

	console.log(refSiNO);
	postJSON(url, JSON.stringify(grCostFilterValues(row, netWt, costCode, costWastageWT, costMC, isEditedSellingWastage, sellingWastage)), function(data) {
		if(1 == data.resCode){
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "costWastage", data.payload.costWastage);
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "sellingMCTotalCost", (data.payload.sellingMc <= 0) ? 0 : data.payload.sellingMc);
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "sellingWastage", (data.payload.sellingWastageWt <= 0) ? 0 : data.payload.sellingWastageWt);
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "metalValue", data.payload.v_metal_value);
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "wastageValue", data.payload.costWastage); 
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "costMCTotalCost", data.payload.costMCTotalCost);
			
			if(costCode == "M"  && costWastageWT == 0 &&  costMC == 0) {$("#grDetailsGrid").jqxGrid('setcellvalue', row, "actcostMC", data.payload.costMCTotalCost); }							
			if(costCode == "M"  && costWastageWT == 0 &&  costMC == 0) {$("#grDetailsGrid").jqxGrid('setcellvalue', row, "actcostWastageWt", data.payload.costWastage);}
			if(costCode == "M"  && costWastageWT == 0 &&  costMC == 0) {$("#grDetailsGrid").jqxGrid('setcellvalue', row, "actsellMC", data.payload.sellingMc);}
			if(costCode == "M"  && costWastageWT == 0 &&  costMC == 0) {$("#grDetailsGrid").jqxGrid('setcellvalue', row, "actsellWastageWt", data.payload.sellingWastageWt);}

		}else{
			$.growl.error({	message : data.mesgStr,	duration : 10000,title : 'Error'});
			return false;
		}
	});
}


var costCodeMandatoryValidation = function(row, netwt) {
	
	var articleCode = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'articleCode');	
	var gWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'grossWt');
	var pcs = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'pieces');
	
	if(null == articleCode || (null !=articleCode && articleCode.length == 0)){	return { result: false, message: "Article code is mandatory" }};	
	if(null  == gWt || (null != gWt && gWt.length  == 0)){return { result: false, message: "Gross Weight is mandatory." }};	
	if(null  == netwt || (null != netwt && netwt.length  == 0)){return { result: false, message: "Net Weight code is mandatory." }};	
	if(null  == pcs || (null != pcs && pcs.length  == 0)){return { result: false, message: "Pcs is mandatory." }};	
	return true;
}


//On change of cost code.
/*var updateOnchangesCostCode = function(row, datafield, columntype, oldvalue, newvalue, event){
	if(datafield == "costCode") { $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costMCTotalCost", 0)}
	if(datafield == "costCode") { $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costCode", newvalue.value)};
	if(datafield == "costCode" &&  newvalue.value != "M"){ $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costWastage", 0)}
	
	var netWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'netWt');
	var costMC = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costMCTotalCost');
	var costCode = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costCode');
	var costWastageWT = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costWastage');
	var costMC = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costMCTotalCost');
	var skinPurity = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'skinPurity');

	var refType =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'refType');
	var grossWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'grossWt');
	var sellingWastage = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'sellingWastage');
	
	
	
	if((datafield == "costCode") && newvalue.value == "M" && refType != "PB" && costCodeMandatoryValidation(row, netWt)){	
		if(newvalue.value == "T"){
			$.growl.error({	message : "Please select either Manufacturer" , duration : 10000,title : 'Error'});
			return false;
		}
		updateGrCostCode(row, netWt, costCode, 0 , 0, datafield, 0, sellingWastage);
	}
	
	if((datafield == "costMCTotalCost")  && costCodeMandatoryValidation(row, netWt)) {	
		var valueMC = newvalue; 		
		console.log(valueMC);
		updateGrCostCode(row, netWt, costCode,costWastageWT, valueMC, datafield, 0, sellingWastage);
	}
	
	if((datafield == "costWastage") && costCode == "M" && costCodeMandatoryValidation(row, netWt)) {	
		var valueMC = costMC; 	
		updateGrCostCode(row, netWt, costCode,newvalue, valueMC, datafield, 0, sellingWastage);
	}
	
}
*/

var updateMeltingPurity = function(refDocNo,refSiNo,SkinPurity,row){
	$.getJSON("/OrderExecution/api/v1/getPurchaseBillMeltingPurity?refDocNo="+refDocNo+"&refSiNo="+refSiNo+"&SkinPurity="+SkinPurity,function(data){
		if(data.resCode == "1" && typeof data != "undefined"){			
			$('#grDetailsGrid').jqxGrid ('setcellvalue', row, 'meltingPurity',data.payload.PuchaseBillMeltingPurity);
			$('#grDetailsGrid').jqxGrid ('setcellvalue', row, 'boardRate',data.payload.PuchaseBillBoardRate);
		}else{
			
			$('#grDetailsGrid').jqxGrid ('setcellvalue', row, 'meltingPurity',null);
			$.growl.error({	message : data.mesgStr,	duration : 10000,title : 'Error'});
			return false;
		}
	});
}

var updateOnchangesCostCode = function(row, datafield, columntype, oldvalue, newvalue, event){
	if(datafield == "costCode") { $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costMCTotalCost", 0)}
	if(datafield == "costCode") { $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costCode", newvalue.value)};
	if(datafield == "costCode" &&  newvalue.value != "M"){ $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costWastage", 0)}
	
	var netWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'netWt');
	var costCode = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costCode');
	var costWastageWT = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costWastage');
	var costMC = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costMCTotalCost');
	
	var grossWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'grossWt');
	var sellWastageWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'sellingWastage');
	var skinPurityList = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'skinPurityList');
	var actualRefType = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actualRefType');
	
	//checkValidateRow(row);
	var refDocNo = $('#refNo').val();
	var refSiNo = $('#refSlNo').val();
	var refType = $('#refType').val();
	console.log(refDocNo);
	var SkinPurity = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'skinPurity');
	var actualRefSrlNo = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actualRefSrlNo');
	var actualRefDocNo = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actualRefDocNo');
	
	if(refType == "PB" && datafield == "skinPurityN" && newvalue.value != null && newvalue.value != "" && typeof newvalue.value != "undefined"){
		updateMeltingPurity(refDocNo,refSiNo,newvalue.value,row);
	}
	
	if( refType =="TV" && actualRefType == "PB" && datafield == "skinPurityN" && newvalue.value != null && newvalue.value != "" && typeof newvalue.value != "undefined"){
		updateMeltingPurity(actualRefDocNo,actualRefSrlNo,newvalue.value,row);
	}
	
	if((datafield == "costCode")  && costCodeMandatoryValidation(row, netWt)){			
		updateGrCostCode(row, netWt, newvalue.value, 0 , 0, datafield, 0, sellWastageWt);
	}
	
	var actcostWastageWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actcostWastageWt');
	var actcostMC = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actcostMC');
	
	if((datafield == "costWastage") && costCode == "M" && costCodeMandatoryValidation(row, netWt)) {
		var setSellingPrice  = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'setSellingPrice');
		var costWastageWT = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costWastage');
		if(costWastageWT == 0 && newvalue > costWastageWT && setSellingPrice == false){
			$.growl.error({	message : "Please use set selling price to change cost Wastage/MC.",	duration : 10000,title : 'Error'});
			return false;
		}	
		var valueMC = costMC; 
		
		updateGrCostCode(row, netWt, costCode,newvalue, valueMC, datafield, 0, sellWastageWt);
	}
	
	if((datafield == "costMCTotalCost" ) && costCodeMandatoryValidation(row, netWt)) {
		var setSellingPrice  = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'setSellingPrice');
		var costMC = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costMCTotalCost');
		if(costMC == 0 && newvalue > costMC && setSellingPrice == false && costCode == "M"){
			$.growl.error({	message : "Please use set selling price to change cost Wastage/MC.", duration : 10000,title : 'Error'});
			return false;
		}
		var valueMC = newvalue;  
		var valueWastage = costWastageWT;
		updateGrCostCode(row, netWt, costCode,valueWastage, valueMC, datafield, 0, sellWastageWt);	
	}
	
	if((datafield == "sellingWastage" ) && costCodeMandatoryValidation(row, netWt)) {
		if(parseFloat(newvalue) != parseFloat(oldvalue)){
			var valueMC = costMC; 
			var valueWastage = costWastageWT;
			updateGrCostCode(row, netWt, costCode,valueWastage, valueMC, datafield, 1, newvalue);	
		}
	}
	
	if(costCode == "T" &&  costCodeMandatoryValidation(row, netWt)){
		if(datafield == "costWastage") {
			var valueMC = costMC; 
			var valueWastage = newvalue; 
			
		}else if(datafield == "costMC") {
			var valueMC = newvalue;  
			var valueWastage = costWastageWT;
		}
	}
	
}
var vendorCost = [
	{"id" : "T", "name" : "Total Cost"},
	{"id" : "M", "name" : "Manufacturer"}
];

var vendorCostAwCount = [
	{"id" : "T", "name" : "Total Cost"},
	{"id" : "R", "name" : "Rework"},
	{"id" : "M", "name" : "Manufacturer"}
];

// Vendor Cost Code Array
var vendorCostSource = {datatype : 'json',datafields : [{name : 'id',type : 'string'}, {name : 'name',type : 'string'}], localdata : vendorCost};
var vendorCostDataAdapter = new $.jqx.dataAdapter(vendorCostSource, {autoBind : true});


var vendorCostAwCountSource = {datatype : 'json',datafields : [{name : 'id',type : 'string'}, {name : 'name',type : 'string'}], localdata : vendorCostAwCount};
var vendorCostAwCountDataAdapter = new $.jqx.dataAdapter(vendorCostAwCountSource, {autoBind : true});

var loadDropDownCostCode = function(row, cellvalue, editor){
	var awCount = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'awCount');
	var costCode = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costCode');
	if(awCount > 0){
		editor.jqxDropDownList({
			source : vendorCostAwCountDataAdapter, displayMember : 'name', valueMember : 'id'
		});
	}else if(costCode == "RawMaterial"){
		editor.jqxDropDownList({
			source : vendorCostDataAdapter, displayMember : 'name', valueMember : 'id'
		});
	}else{
		editor.jqxDropDownList({
			source : vendorCostDataAdapter, displayMember : 'name', valueMember : 'id'
		});
	}
	
}

var addArticleCode = function(row, column, value){
	var psr =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'psr');
	var articleCode =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'articleCode');
	if (psr != "N") {
    	return false;		        
    }else if(psr == "N" && null == articleCode){
    	$("#articleSearchForm").trigger('reset');
    	articleSearchPopUp();
    	return false;
    }else if(psr == "N" && null != articleCode){
    	articleSearchPopUp();
    	return false;
    }else{
    	return true;
    }

}

//Common Validation for grid column
var commonValidate = function(cell, value){
	if(value < 0) { return { result: false, message: "Invalid Number" }};	
	return true;
}

//Update set selling price.
var updateSetSellingice = function(row, datafield, columntype, oldvalue, newvalue, event){
	$("#grDetailsGrid").jqxGrid('setcellvalue', row, 'setSellingPrice', newvalue);	
}

var updateOchnageSetSellingPrice = function(row){
	return true;
}

// Sell wastage and sell MC disable enable column.
var grSellCostCodeEdit = function(row, datafield, columntype) {	
	var costCode =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costCode');
	var setSellinPrice = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'setSellingPrice');	
	if(setSellinPrice == false){
		return false;
	}else{
		if(setSellinPrice == true && (costCode == "R" || costCode == "T") && datafield == "sellingWastage"){
			return false;
		}else{
			return true;
		}
	}	
	
	if (costCode == "T" && datafield == "sellingWastage") {    	
    	return false;        
    }else if(costCode == "T" && datafield == "sellingMCTotalCost" && setSellinPrice == true){    	
    	return true;
    }		
	
	if ((setSellinPrice == true) && (datafield == 'sellingMCTotalCost' || datafield == 'sellingWastage')) {    	
    	return true;        
    }	
	
}

var storeDcArr = [
	{"id" : "Store", "name" : "Store"},
	{"id" : "DC", "name" : "DC"}
];

var storeDCSource = {datatype : 'json',datafields : [{name : 'id',type : 'string'}, {name : 'name',type : 'string'}], localdata : storeDcArr};
var storeDCDataAdapter = new $.jqx.dataAdapter(storeDCSource, {autoBind : true});

var editStoreDC = function(row, datafield, columntype){
	var storeOrDC =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'storeOrDc');
	
	if(datafield == "store" && storeOrDC == "DC"){
		return false;
	}else if(datafield == "zone" && storeOrDC == "Store"){
		return false;
	}else{
		return true;
	}
}
var storeArr = [];
var zoneArr = [];
var onchnageStoreDC = function(row, datafield, columntype, oldvalue, newvalue, event){
	var storeOrDC =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'storeOrDc');
	console.log(datafield);
	$('#grDetailsGrid').jqxGrid('setcellvalue', row, 'zone', null);
	$('#grDetailsGrid').jqxGrid('setcellvalue', row, 'zoneS', null);
	$('#grDetailsGrid').jqxGrid('setcellvalue', row, 'zoneN', null);
	$('#grDetailsGrid').jqxGrid('setcellvalue', row, 'store', null);
	$('#grDetailsGrid').jqxGrid('setcellvalue', row, 'storeN', null);
	
	if(newvalue.value == "Store"){		
		$.getJSON("/OrderExecution/api/v1/storeOrDcLOV?acceptRejectType="+newvalue.value,function(data){
			if(data.resCode == "1" && typeof data != "undefined"){
				storeArr = data.payload.store;
			}
       });  
	}
	if(newvalue.value == "DC"){		
		$.getJSON("/OrderExecution/api/v1/storeOrDcLOV?acceptRejectType="+newvalue.value,function(data){
			if(data.resCode == "1" && typeof data != "undefined"){
				zoneArr = data.payload.zone;
			}
		}); 
	}
	if(datafield == "zone"){
		$.each(zoneArr,function(k,v){
			if(v.id == newvalue.value){
				$('#grDetailsGrid').jqxGrid ('setcellvalue', row, 'zoneN', v.name);
			}
		});
	}
}

var pcsNotMorePending = function(row, newvalue){
	var masterRows = $("#grDetailsGrid").jqxGrid('getrows');	
	var psr = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'psr');
	var pcs = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'pcs');
	
	
	if(typeof masterRows != "undefined" && masterRows.length > 0){
		var pendingPcs = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'pendingPcs');
		var totalPcs = 0;
		
		for(var i=0; i<masterRows.length-1; i++){
			if(psr == masterRows[i].psr){ 
				totalPcs +=  parseInt(NVL(masterRows[i].pcs,0));
			}
		}
		var availPcs = parseInt(NVL(pendingPcs,0)) - parseInt(NVL(totalPcs,0));
		if(availPcs<0){availPcs = 0;}
		if(pcs > NVL(availPcs,0)){
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid", false);
			$('#grDetailsGrid').jqxGrid ('setcellvalue', row, 'pcs', 0);
			$.growl.error({ message: "Pcs Available " + availPcs + " for PSR No. " + psr, duration: 10000, title: 'Error' });
			return false;
		}
	}
}


//set GR next column
var setGRColNull = function(row, level){
	
	var costCode = $("#grDetailsGrid").jqxGrid('getcellvalue', row, "costCode");
	var refType = $("#grDetailsGrid").jqxGrid('getcellvalue', row, "refType");
	(level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "netWt", null) : "";
	if(refType == "PB"){
		if(costCode != "R") { (level == 6 || level == 7 || level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costCode", null): "";}
		if(costCode != "R") { (level == 6 || level == 7 || level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costCodes", null): "";}
		
		(level == 6 || level == 7 || level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costWastage", 0.00): "";
		(level == 6 || level == 7 || level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costMCTotalCost", 0.00): "";
		(level == 6 || level == 7 || level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "sellingWastage", 0.00): "";
		(level == 6 || level == 7 || level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "sellingMCTotalCost", 0.00): "";
	}
	(level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "attributes", "False"): "";	
	$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid", false);	
}


//On change of GR grWt.
var updateOnchangesGrossWt = function(row, datafield, columntype, oldvalue, newvalue, event){
	setGRColNull(row, 6);
	pcsNotMorePending(row);
}

//On change of GR netWt.
var updateOnchangesNetWt = function(row, datafield, columntype, oldvalue, newvalue, event){
	setGRColNull(row, 7);
	var costCode = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costCode');	
	var sellWastageWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'sellingWastage');
	var actualRefType = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actualRefType');
	var costCode = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costCode');
	
	var refType = $("#refType").val();
	
	if(refType != "PB" && actualRefType != "PB" &&  costCode != "RawMaterial"){
		updateGrCostCode(row, newvalue, costCode, 0 , 0, datafield, 0, sellWastageWt);
	}
}

var loadDropDownZone = function(row, cellvalue, editor){
	editor.on('click', function(){
		editor.jqxDropDownList({
			source : zoneArr, displayMember : 'description', valueMember : 'id'
		});
	});
}

var loadDropDownStore = function(row, cellvalue, editor){
	editor.on('click', function(){
		editor.jqxDropDownList({
			source : storeArr, displayMember : 'name', valueMember : 'id'
		});
	});
}


var loadDropDownStoreDC = function(row, cellvalue, editor){
	editor.jqxDropDownList({
		source : storeDCDataAdapter, displayMember : 'name', valueMember : 'id'
	});
}

//updated added stone data to main grid
var onClickSrlUpdateStoneDetails = function(grSrNo){
	var stoneRows = $("#stoneDetailsGrid").jqxGrid('getrows');
	var rowData = $("#grDetailsGrid").jqxGrid('getrowdata', (grSrNo-1));
	var totalSC = 0.00;
	var totalStoneSP  = 0.00;
	var stoneRowArray = [];
		if(undefined != stoneRows && null != stoneRows && stoneRows.length > 0){		
			for(var i=0; i<stoneRows.length; i++){
				 if(grSrNo == stoneRows[i].srl){
					stoneRowArray.push(stoneRows[i]);
					totalSC = totalSC + stoneRows[i].stoneCostPrice;
					totalStoneSP = totalStoneSP + stoneRows[i].sellingPrice;
				 }
			}
			rowData['stoneList'] = stoneRowArray;
			rowData['totalStoneCostPrice'] = totalSC;
			rowData['totalStoneSellingPrice'] = totalStoneSP;
			
		}else{
			rowData['stoneList'] = null;
			rowData['totalStoneCostPrice'] = null;
			rowData['totalStoneSellingPrice'] = null;
		}
		$('#grDetailsGrid').jqxGrid('updaterow', (grSrNo-1), rowData); 
		
}

//updated added acc data to main grid
var onClickSrlUpdateAccDetails = function(grSrNo){
	var accRows = $("#accDetailsGrid").jqxGrid('getrows');
	var rowData = $("#grDetailsGrid").jqxGrid('getrowdata', (grSrNo-1));
	var accRowArray = [];
	var totalAC = 0.00;
	var totalStoneCP = 0.00;
	if(undefined != accRows && null != accRows && accRows.length > 0){		
		for(var i=0; i<accRows.length; i++){
			 if(grSrNo == accRows[i].srl){
				 accRowArray.push(accRows[i]);
				 totalAC = totalAC + accRows[i].accessoryCost;
				 console.log(totalStoneCP);
				 totalStoneCP = totalStoneCP + accRows[i].sellingPrice;
			 }
		}
		rowData['accessoryList'] = accRowArray;	 
		rowData['totalAccCostPrice'] = totalAC;	 
		rowData['totalAccSellingPrice'] = totalStoneCP;	
	}else{
		rowData['accessoryList'] = null;
		rowData['totalAccCostPrice'] = null;
		rowData['totalAccSellingPrice'] = null;	 
	}
	$('#grDetailsGrid').jqxGrid('updaterow', (grSrNo-1), rowData);
}

var grStoneAccDetails = function(srl)
{
	onClickSrlUpdateStoneDetails(srl);
	onClickSrlUpdateAccDetails(srl);	 
}

var  grStoneDetailsValidation = function(orderType, row){
	var stoneDetails = $("#stoneDetailsGrid").jqxGrid('getrows');
	var validation = true;
	var srl = 0;
	for(var i = 0; i< stoneDetails.length; i++){
		srl = i;
		var data = stoneDetails[i];
		//var firstword = data.CategoryName.split(' ')[0];
		if(data.usedWt == null || data.usedWt == 0 || data.usedWt == ""){
			validation = false;
			$.growl.error({	message : "Stone " + data.stoneSrlNo  + " used wt is mandatory",	duration : 5000,title : 'Error'	});	
			return false;
		}
		
		if(data.usedPcs == null || data.usedPcs == 0 || data.usedPcs == ""){
			validation = false;
			$.growl.error({	message : "Stone " + data.stoneSrlNo  + " used pcs is mandatory",	duration : 5000,title : 'Error'	});	
			return false;
		}
	}
	return validation;
}

var grAccDetailsValidation = function(row) {
	var accDetails = $("#accDetailsGrid").jqxGrid('getrows');
	var validation = true;
	var srl = 0;
	for(var i = 0; i< accDetails.length; i++){
		
		var data = accDetails[i];
		srl = i;
		if(data.usedwt == null || data.usedwt == 0 || data.usedwt == ""){
			validation = false;
			$.growl.error({	message : "Acc " + data.accessorySrlNo  + " used wt is mandatory",	duration : 5000,title : 'Error'	});	
			return false;
		}
		
		if(data.usedPcs == null || data.usedPcs == 0 || data.usedPcs == ""){
			validation = false;
			$.growl.error({	message : "Acc " + data.accessorySrlNo  + " used pcs is mandatory",	duration : 5000,title : 'Error'	});	
			return false;
		}
	}
	return validation;
}

//Check mandatory validation.
var grFGDMandatoryFieldValidation = function(row) {
	var grossWt =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'grossWt');
	var netWt =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'netWt');
	var costCode =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costCode');
	var psr =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'psr');
	var costWt =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costWastageWT');
	var costMC =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costMC');
	var sellMC =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'sellMC');
	var orderType =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'orderType');
	var orderKind =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'orderKind');
	var articleCode = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'articleCode');
	if (psr == null && netWt == null &&  costCode == null && grossWt == null && articleCode == null) { $.growl.error({ message: "Please ensure PSR, Cost Code, Article code, PCS, G/N Wt are entered.", duration: 10000, title: 'Error' });	return false;}
	else if(!grStoneDetailsValidation(row)){return false;}
	else if(!grAccDetailsValidation(row)){return false;}	
	return true;
}

//Check validate as per used wt in stone/acc
var chekUsedWtValidate = function(row){
	var grSrlNo = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'srl');
	var grossWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'grossWt');
	var netWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'netWt');
	grossWt = parseFloat(grossWt).toFixed(3);
	netWt = parseFloat(netWt).toFixed(3);
	var diffGrNetWt = parseFloat(grossWt) - parseFloat(netWt);
	
	var stoneRows = $("#stoneDetailsGrid").jqxGrid('getrows');
	var accRows = $("#accDetailsGrid").jqxGrid('getrows');
	
	var validateMain = false;
	var totalWt = 0;
	var totalWtAcc = 0;
	var usedWtVal = 0.00;
	var usedWtValAcc = 0.00;
	
	// For Stone Grid
	if(typeof stoneRows != "undefined" || stoneRows.length > 0){
		for(var i=0; i<stoneRows.length; i++){
			if(stoneRows[i].srl == grSrlNo){
				var uom = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'UOM');
				var usedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'usedWt');
				if(usedWt == null || usedWt == ""){	usedWtVal = 0.00;}else{usedWtVal = usedWt;	}
				if(uom == "Cts"){
					totalWt += parseFloat(NVL(usedWtVal,0))  * 0.2;
				}else{
					totalWt += parseFloat(NVL(usedWtVal,0));
				}
			}
		}		
	}
	
	// For Accessory Grid
	if(typeof accRows != "undefined" || accRows.length > 0){
		for(var i=0; i<accRows.length; i++){
			if(accRows[i].srl == grSrlNo){
				var uom = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'UOM');
				var usedWt = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'usedwt');
				if(usedWt == null || usedWt == ""){	usedWtValAcc = 0.00;}else{usedWtValAcc = usedWt;	}
				
				if(uom == "Cts"){
					totalWtAcc += parseFloat(NVL(usedWtValAcc,0))  * 0.2;
				}else{
					totalWtAcc += parseFloat(NVL(usedWtValAcc,0));
				}
			}
		}
	}
	
	
	// Checking diff and validating line item
	diffGrNetWt = parseFloat(diffGrNetWt).toFixed(3);
	var total = parseFloat(NVL(totalWt,0)) + parseFloat(NVL(totalWtAcc,0));
	total = total.toFixed(3);
	
	console.log("diffGrNetWt " + diffGrNetWt);
	console.log("total " + total);
	
	if(parseFloat(total)  == parseFloat(diffGrNetWt)){
		validateMain = true;
	}else{
		validateMain = false;
	}
	return validateMain;
}

var updateStoneDetails = function(row){	
	var stoneRows = $("#stoneDetailsGrid").jqxGrid('getrows');
	
	if(null != stoneRows && stoneRows.length >0 && (stoneRows[0].grSlNo == (row+1))){
		var rowData = $("#grDetailsGrid").jqxGrid('getrowdata', row);
	
		rowData['stoneList'] = stoneRows;
		$('#grDetailsGrid').jqxGrid('updaterow', row, rowData); 
	}
}

var updateAccDetails = function(row){
	var accRows = $("#accDetailsGrid").jqxGrid('getrows');	
	if(null != accRows && accRows.length > 0 && (accRows[0].grSlNo == (row+1))){
		var rowData = $("#grDetailsGrid").jqxGrid('getrowdata', row);
		rowData['accessoryList'] = accRows;
		$('#grDetailsGrid').jqxGrid('updaterow', row, rowData);
	}
}

// Renumbering GR line item validate
var validateGRFGDetails = function(row){
	var attributDet = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'attributes');
	var selectedrowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');	
	var details = $("#grDetailsGrid").jqxGrid('getrowdata', row);
	var stoneRows = $("#stoneDetailsGrid").jqxGrid('getrows');
	var accRows = $('#accDetailsGrid').jqxGrid ('getrows');
	
	var gWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'grossWt');
	var nWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'netWt');	
	var pcs = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'pcs');
	var psr = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'psr');
	var costWastageWT = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costWastage');
	var costMC = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costMCTotalCost');
	var costCode = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costCode');	
	var sellWastageWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'sellingWastage');
	var sellMC = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'sellingMCTotalCost');
	var pureRate = $("#pureRate").val();
	var skinPurity = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'skinPurity');
	skinPurity = parseFloat(skinPurity).toFixed(2);
	var skinPurityList = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'skinPurityList');
	var refType = $("#refType").val();
	
	var skinPurArr = [];
	$.each(skinPurityList, function(k,v){
		var skinP = v.id;
		skinP = parseFloat(skinP).toFixed(2);
		skinPurArr.push(skinP);
	});
	
	console.log(skinPurArr);
	if(refType == "PB"){
		if($.inArray(skinPurity, skinPurArr) == '-1'){
			$.growl.error({ message: "Please select the skin purity from dropdown!", duration: 5000, title: 'Error' }); return false;
		}
	}
	var refDocNo = $('#refNo').val();
	var refSiNo = $('#refSlNo').val();
	var refType = $('#refType').val();
	if(refType == "PB"){
		updateMeltingPurity(refDocNo,refSiNo,skinPurity,row);
	}
	pcsNotMorePending(row);
	
	var totalWtCost = (parseFloat(costWastageWT)*pureRate) + parseFloat(costMC);
	var totalWtSell = (parseFloat(sellWastageWt)*pureRate) + parseFloat(sellMC);
	var diffWT = parseFloat(gWt) - parseFloat(nWt);
	diffWT = diffWT.toFixed(3);
	
	if(attributDet == null || attributDet == "False") { $.growl.error({ message: "attributes Detail is mandatory!", duration: 5000, title: 'Error' }); return false;}
	if(totalWtCost > totalWtSell){details['isValid'] = false; $.growl.error({message: "(Cost Wastage+Cost MC) can not be more than (Sell Wastage+Sell MC).", duration: 10000, title: 'Error' }); return false;}
	if(pcs <= 0){
		details['isValid'] = false;
		$.growl.error({ message: "Pcs should be more than 0", title: 'Error' });
		return false;
	}
	if((gWt == nWt) && (gWt != null && nWt != null) && (details.isValid == false || details.isValid == "false")){	
		if((costCode != null && costCode != "") && attributDet == "True"  && (stoneRows.length == 0 || typeof stoneRows == "undefined") && (accRows.length == 0 || typeof accRows == "undefined")){
			details['isValid'] = true;		
		}else if((costCode != null && costCode != "") && attributDet == "True"  && ((stoneRows.length > 0  && (accRows.length == 0 || typeof accRows == "undefined")) || (accRows > 0 && (stoneRows.length == 0 || typeof stoneRows == "undefined")) )){
			details['isValid'] = false;
		}
	}
	
	if(details.isValid == true){
		$.growl.notice({ message: "Srl no "+(row+1)+"is already validated. There are No changes. ", duration: 10000, title: 'Notice' });
		return false;
	}else{
		grStoneAccDetails((row+1));
		var validateRow = grFGDMandatoryFieldValidation(row);
		if(validateRow == true){
			var chekUsedWtValidateFlag = chekUsedWtValidate(row);
			if(chekUsedWtValidateFlag == true){
				$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid", true);
				$.growl.notice({ message: "Validation is sucess", duration: 10000, title: 'Success' });	
				updateStoneDetails(row);
				updateAccDetails(row);	
			}else{
				$.growl.error({ message: "Used/Bulk (Stone + Accessory) should be equal to (Difference of G/N Wt + Tolerance)", duration: 10000, title: 'Error' });
				return false;
			}
		}
	}
	
}

//Pcs on change validation
var pcsValidate = function(cell, value){
	var isPair =  $('#grDetailsGrid').jqxGrid('getcellvalue', cell.row, 'isPair');
	if(value < 0) { return { result: false, message: "Invalid Number" }};
	
	if(isPair == "true" && value%2 != 0) {            	
    	return { result: false, message: "Enter even number of pieces" };           	
    }
	return true;
}

//Pcs editable or not with condition
var pcsEditable = function(row){
	var psr = $("#grDetailsGrid").jqxGrid('getcellvalue', row, 'psr');
	if(psr == "N"){	return true;}
}

//Common Validation for grid column
var grWtValidate = function(cell, value){	
	if(value < 0) { return { result: false, message: "Invalid Number" }};
	return true;
}

//Common Validation for grid column
var netWtValidate = function(cell, value){
	var grossWt = $('#grDetailsGrid').jqxGrid('getcellvalue', cell.row, 'grossWt');	
	if(grossWt < value){return { result: false, message: "Gross wt. should be greater than net wt." }};	
	if(value < 0) { return { result: false, message: "Invalid Number" }};
	return true;
}

var onLoadSkinPurity = function(row, cellvalue, editor){
	var skinPurityList = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'skinPurityList');
	editor.on('click', function(){
		editor.jqxDropDownList({
			source : skinPurityList, displayMember : 'name', valueMember : 'id'
		});
	});
	
}

var grDetailsList = function(data){		
		// Validate with stone and accessory grid.
		var checkValidate = function(row, column, value){
			return '<div class="text-center"><button class="btn btn-sm btn-primary" onclick="validateGRFGDetails('+ row +');" data-toggle="modal" type="button" /><i class="fa fa-check fa-lg"></i></button></div>';
		}
		
		// PSR Type Array

		var source = {
			datafields : [ 
				{'name' : 'srl','type' : 'int'}, 
				{'name' : 'psr', 'type' : 'string'}, 
				{'name' : 'psrNos', 'type' : 'string'},  
				{'name' : 'vendorCode','type' : 'string'}, 
				{'name' : 'articleCode','type' : 'string'}, 
				{'name' : 'articleDescription','type' : 'string'},
				{'name' : 'pieces','type' : 'int'}, 
				{'name' : 'grossWt','type' : 'float'}, 
				{'name' : 'netWt','type' : 'float'},
				{'name' : 'skinPurity','type' : 'string'}, 
				{'name' : 'skinPurityN','type' : 'string'}, 
				{'name' : 'meltingPurity','type' : 'string'}, 
				{'name' : 'costCode','type' : 'string'}, 
				{'name' : 'costWastage','type' : 'float'}, 
				{'name' : 'costMCTotalCost','type' : 'float'}, 
				{'name' : 'setSellingPrice','type' : 'float'}, 
				{'name' : 'sellingWastage','type' : 'float'}, 
				{'name' : 'sellingMCTotalCost','type' : 'float'}, 
				{'name' : 'attributes','type' : 'string'}, 
				{'name' : 'isValid','type' : 'boolean'},
				
				/* Hidden fields for GR  required for internal calculation */
				{'name' : 'actualGrossWt','type' : 'float'}, 
				{'name' : 'actualNetWt','type' : 'float'},
				{'name' : 'skinPurityList','type' : 'array'}, 
				{'name' : 'globalAttrFlag','type' : 'long'},
				{'name' : 'articleSegmentid','type' : 'boolean'},
				{'name' : 'jewelTypeId','type' : 'int'},
				{'name' : 'jwlType','type' : 'string'},
				{'name' : 'hsnId','type' : 'string'},
				{'name' : 'category','type' : 'string'},
				{'name' : 'subCategory','type' : 'string'},
				{'name' : 'segmentCode','type' : 'long'}, 
				{'name' : 'stoneList','type' : 'array'},
				{'name' : 'accessoryList','type' : 'array'},
				{'name' : 'attrLength','type' : 'string'},
				{'name' : 'attributeSize','type' : 'string'},
				{'name' : 'attributeHeight','type' : 'string'},
				{'name' : 'attributeDia','type' : 'string'},
				{'name' : 'attributeWidth','type' : 'string'},
				{'name' : 'vendorArticle','type' : 'string'},
				{'name' : 'stoneCombId','type' : 'long'},
				{'name' : 'attributeMetalColorType','type' : 'string'},
				{'name' : 'attributeHookType','type' : 'string'},
				{'name' : 'attributeScrewType','type' : 'string'},
				{'name' : 'attributeLoopType','type' : 'string'},
				{'name' : 'combination','type' : 'string'},
				{'name' : 'collectionName','type' : 'string'},
				{'name' : 'attributePolishType',	'type' : 'string'},
				{'name' : 'attributeSettingType','type' : 'string'},
				{'name' : 'isDueDtFlag','type' : 'bool'},
				{'name' : 'attributeMetalColorType','type' : 'string'},
				{'name' : 'hsnMasterId','type' : 'long'},
				{'name' : 'metalTypeId','type' : 'long'},
				{'name' : 'hsnMasterCode','type' : 'string'},
				{'name' : 'subCategoryName','type' : 'string'},
				{'name' : 'actualRefType','type' : 'string'},
				{'name' : 'actualRefSrlNo','type' : 'long'},
				{'name' : 'actualRefDocNo','type' : 'long'},
				{'name' : 'refType','type' : 'string'},
				{'name' : 'refNo','type' : 'long'},
				{'name' : 'refSrlNo','type' : 'long'},
				{'name' : 'vendorId','type' : 'long'},
				{'name' : 'articleFlag','type' : 'bool'},
				{'name' : 'status','type' : 'string'},
				{'name' : 'metalLoc','type' : 'string'},
				{'name' : 'isMetalPosNeg','type' : 'bool'},
				{'name' : 'boardRate','type' : 'float'},
				{'name' : 'isSpManual','type' : 'bool'},
				{'name' : 'dealerMFGFlag','type' : 'bool'},
				{'name' : 'mapRate','type' : 'float'},
				{'name' : 'wastageValue','type' : 'float'},
				{'name' : 'wastageWt','type' : 'float'},
				{'name' : 'wastageCharges','type' : 'float'},
				{'name' : 'metalValue','type' : 'float'},
				{'name' : 'pureWt','type' : 'float'},
				{'name' : 'isRwk','type' : 'float'},
				{'name' : 'diffInWt','type' : 'float'},
				{'name' : 'storeOrDc','type' : 'string'},
				{'name' : 'store','type' : 'string'},
				{'name' : 'zone','type' : 'string'},
				{'name' : 'segmentId','type' : 'long'},
				
				
				{'name' : 'totalStoneCostPrice','type' : 'float'},
				{'name' : 'totalAccCostPrice','type' : 'float'},
				{'name' : 'totalStoneSellingPrice','type' : 'float'},
				{'name' : 'totalAccSellingPrice','type' : 'float'}
				
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
			},
			updaterow: function (rowid, newdata, commit) {
                 commit(true);
             }

		};		
		
		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#grDetailsGrid").jqxGrid({
			source : dataAdapter,
			width : '100%',
			editable : true,
			columnsheight : 55,
			theme: 'fresh',
			columnsresize: true, 
			autoheight: false,
			altRows : false,
			height: '240px',
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);				
				container.append('<div class="col-md-8><div style="margin-top: -3px; color:#00800; font-size:15px;"  id="orderTypeLabel" class="text-center">Create Re-numbering GR</div></div>');	
				container.append('<div class="col-md-4 pull-right"><div style="margin-top: -20px;" id="deleteStonedetailsGrid" class="btn btn-danger btn-sm pull-right"><i class="fa fa-trash fa-md"></i></div></div>');
				$("#deleteStonedetailsGrid").jqxButton();
				$("#deleteStonedetailsGrid").on('click', function() {
					deleteGrDetailsRow();					      
				});
			},
			
			columns : [ 
				{'text' : 'Srl.', datafield : 'srl', width : '3%', cellsalign : 'center', align : 'center', editable : false}, 
				{'text'  :'PSR No',datafield: 'psr','width' : '3%',cellsalign : 'center', align : 'center', editable : false, displayfield : 'psrNos'},
				{'text' : 'V.Code',datafield : 'vendorCode','width' : '5%', editable : false,cellsalign : 'center',align:'center'},
				{'text' : 'Article Code',datafield : 'articleCode','width' : '5%',cellsalign : 'center',align:'center', cellbeginedit : addArticleCode},  
				{'text' : 'Art. Desc.',datafield : 'articleDescription','width' : '5%',editable : false,cellsalign : 'center',align:'center'}, 
				{'text' : 'J.Code',datafield : 'jwlType','width' : '4%', editable : true,cellsalign : 'center',align:'center',cellsformat: 'n'},				
				{'text' : '',datafield : 'jewelTypeId','width' : '4%', editable : true,cellsalign : 'center',align:'center',cellsformat: 'n', hidden: true},				
				
				{'text' : 'Pcs',datafield : 'pieces','width' : '3%', editable : true,cellsalign : 'center',align:'center',cellsformat: 'n', validation : pcsValidate, cellbeginedit: pcsEditable},
				{'text' : 'Gr.Wt.',datafield : 'grossWt','width' : '4%',editable : true, createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput',cellsformat: 'd3',cellsalign : 'center',align:'center', validation : grWtValidate, cellvaluechanging: updateOnchangesGrossWt},
				{'text' : 'Net Wt.',datafield : 'netWt','width' : '4%', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },editable : true,columntype : 'numberinput',cellsformat: 'd3',cellsalign : 'center',align:'center', validation : netWtValidate, cellvaluechanging: updateOnchangesNetWt},

				{'text' : 'Skin Purity', datafield : 'skinPurityN','width' : '5%', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 2 }); },sortable : false,editable : true,columntype : 'dropdownlist',cellsalign : 'center',align:'center',displayfield : 'skinPurity',createeditor : onLoadSkinPurity, cellbeginedit: grCostCodeEditable,cellvaluechanging: updateOnchangesCostCode},
				{'text' : 'Melting Purity', datafield : 'meltingPurity','width' : '5%',sortable : false, createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 2 }); },editable : false,cellsalign : 'center',align:'center', },
				{'text' : 'Cost Code',datafield : 'costCode','width' : '5%',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'costCodes',cellsalign : 'center',align:'center',createeditor : loadDropDownCostCode,cellvaluechanging: updateOnchangesCostCode, cellbeginedit: grCostCodeEditable},
				{'text' : 'Cost Wast Wt.','datafield' : 'costWastage','width' : '5%',sortable : false, createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype: 'numberinput',cellsformat: 'd3', validation : commonValidate,cellvaluechanging: updateOnchangesCostCode, cellbeginedit: grCostCodeEditable},
				{'text' : 'Cost MC/ Tot. cost',datafield : 'costMCTotalCost','width' : '5%',sortable : false,editable : true,cellsformat: 'd2',columntype: 'numberinput',cellsalign : 'center',align:'center', validation : commonValidate,cellvaluechanging: updateOnchangesCostCode, cellbeginedit: grCostCodeEditable},
				{'text' : 'Set Sell.Price',datafield : 'setSellingPrice','width' : '5%',editable : true,columntype: 'checkbox',cellsalign : 'center',align:'center', cellvaluechanging : updateSetSellingice, cellbeginedit: updateOchnageSetSellingPrice},
				{'text' : 'Sell Wast Wt.',datafield : 'sellingWastage','width' : '5%',cellsformat: 'd3',sortable : false,editable : true, createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); }, columntype: 'numberinput',cellsalign : 'center',align:'center',cellvaluechanging: updateOnchangesCostCode,cellsalign : 'center',align:'center', validation : commonValidate, cellbeginedit: grSellCostCodeEdit},
				{'text' : 'Sell MC/Tot.cost',datafield : 'sellingMCTotalCost','width' : '5%',sortable : false,editable : true,cellsformat: 'd2',columntype: 'numberinput',cellsalign : 'center',align:'center', validation : commonValidate, cellbeginedit: grSellCostCodeEdit},

				{'text' : 'Attr',datafield : 'attributes','width' : '4%',sortable : false,cellsalign : 'center',align:'center', cellbeginedit : attributeSearchPopUp},

				{'text' : 'Store/DC',datafield : 'storeOrDc','width' : '5%',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'storeOrDcN',cellsalign : 'center',align:'center',createeditor : loadDropDownStoreDC,cellvaluechanging: onchnageStoreDC, cellbeginedit: editStoreDC},
				{'text' : 'Store',datafield : 'store','width' : '6%',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'storeN',cellsalign : 'center',align:'center',createeditor : loadDropDownStore,cellvaluechanging: onchnageStoreDC, cellbeginedit: editStoreDC},
				{'text' : 'Zone',datafield : 'zone','width' : '6%',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'zoneS',cellsalign : 'center',align:'center',createeditor : loadDropDownZone,cellvaluechanging: onchnageStoreDC, cellbeginedit: editStoreDC},

				{'text' : '',datafield : 'isValid','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center', cellsrenderer : checkValidate},
				
				/* Hidden field to handle GR calculation */
				{'text' : '', datafield : 'vendorArticle', editable : false, hidden: true},
				{'text' : '', datafield : 'globalAttrFlag', editable : false, hidden: true},
				{'text' : '', datafield : 'actualRefType', editable : false, hidden: true},
				{'text' : '', datafield : 'actualRefSrlNo', editable : false, hidden: true},
				{'text' : '', datafield : 'actualRefDocNo', editable : false, hidden: true},
				{'text' : '', datafield : 'articleSegmentid', editable : false, hidden: true},
				{'text' : '', datafield : 'hsnMasterCode', editable : false, hidden: true},
				{'text' : '', datafield : 'segmentCode', editable : false, hidden: true},
				{'text' : '', datafield : 'stoneList', editable : false, hidden: true},
				{'text' : '', datafield : 'accessoryList', editable : false, hidden: true},
				{'text' : '', datafield : 'attributeLength', editable : false, hidden: true},
				{'text' : '', datafield : 'attributeSize', editable : false, hidden: true},
				{'text' : '', datafield : 'attributeHeight', editable : false, hidden: true},
				{'text' : '', datafield : 'attributeDia', editable : false, hidden: true},
				{'text' : '', datafield : 'attributeWidth', editable : false, hidden: true},
				{'text' : '', datafield : 'attributeMetalColorType', editable : false, hidden: true},
				{'text' : '', datafield : 'attributeHookType', editable : false, hidden: true},
				{'text' : '', datafield : 'attributeScrewType', editable : false, hidden: true},
				{'text' : '', datafield : 'attributeLoopType', editable : false, hidden: true},
				{'text' : '', datafield : 'attributePolishType', editable : false, hidden: true},
				{'text' : '', datafield : 'attributeSettingType', editable : false, hidden: true},
				{'text' : '', datafield : 'metalTypeId', editable : false, hidden: true},
				{'text' : '', datafield : 'hsnId', editable : false, hidden: true},
				{'text' : '', datafield : 'refType', editable : false, hidden: true},
				{'text' : '', datafield : 'refNo', editable : false, hidden: true},
				{'text' : '', datafield : 'refSrlNo', editable : false, hidden: true},
				{'text' : '', datafield : 'vendorId', editable : false, hidden: true},
				{'text' : '', datafield : 'articleFlag', editable : false, hidden: true},
				{'text' : '', datafield : 'subCategory', editable : false, hidden: true},
				{'text' : '', datafield : 'category', editable : false, hidden: true},
				{'text' : '', datafield : 'status', editable : false, hidden: true},
				{'text' : '', datafield : 'metalLoc', editable : false, hidden: true},
				{'text' : '', datafield : 'isMetalPosNeg', editable : false, hidden: true},
				{'text' : '', datafield : 'boardRate', editable : false, hidden: true},
				{'text' : '', datafield : 'isSpManual', editable : false, hidden: true},
				{'text' : '', datafield : 'dealerMFGFlag', editable : false, hidden: true},
				{'text' : '', datafield : 'mapRate', editable : false, hidden: true},
				{'text' : '', datafield : 'wastageValue', editable : false, hidden: true},
				{'text' : '', datafield : 'wastageWt', editable : false, hidden: true},
				{'text' : '', datafield : 'wastageCharges', editable : false, hidden: true},
				{'text' : '', datafield : 'metalValue', editable : false, hidden: true},
				{'text' : '', datafield : 'pureWt', editable : false, hidden: true},
				{'text' : '', datafield : 'diffInWt', editable : false, hidden: true},
				{'text' : '', datafield : 'combination', editable : false, hidden: true},
				{'text' : '', datafield : 'collectionName', editable : false, hidden: true},


				{'text' : '', datafield : 'actsellMC', editable : false, hidden: true},
				{'text' : '', datafield : 'actsellWastageWt', editable : false, hidden: true},
				{'text' : '', datafield : 'actcostMC', editable : false, hidden: true},
				{'text' : '', datafield : 'actcostWastageWt', editable : false, hidden: true},
				{'text' : '', datafield : 'awCount', editable : false, hidden: true},
				
				{'text' : '', datafield : 'totalStoneCostPrice', editable : false, hidden: true},
				{'text' : '', datafield : 'totalAccCostPrice', editable : false, hidden: true},
				{'text' : '', datafield : 'totalStoneSellingPrice', editable : false, hidden: true},
				{'text' : '', datafield : 'totalAccSellingPrice', editable : false, hidden: true},
				{'text' : '', datafield : 'zoneN', editable : false,hidden : true}
			]
		});	
}

var addStoneGridRow = function(){
	var selectedrowindexGRDetailsGrid = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
}

//Cell Begin edit stone grid validate
var grStoneForPSR = function(row, datafield, columntype) {	
	 return true; 	
}

var showHideREN = function(row){
	if(row.segmentName == "Diamond"){
		$("#showShape").show();
		$("#showSubCategory").hide();
		$("#showWeightRange").show();
		$("#showClarity").show();
		$("#showActualColor").show();
		$("#showColor").show();
		$("#showCutGrade").show();
		$("#hsnDiv").hide();
		$("#showCostRange").hide();
		
		var firstWord = row.CategoryName.split(' ')[0];
		if(firstWord == "CD"){
			$("#showActualColor").show();
		}else{
			$("#showActualColor").hide();
		}
	}else{
		$("#showShape").hide();
		$("#showSubCategory").show();
		$("#showWeightRange").hide();
		$("#showClarity").hide();
		$("#showActualColor").hide();
		$("#showColor").hide();
		$("#showCutGrade").hide();
		$("#hsnDiv").hide();
		$("#showCostRange").show();
	}
}

//GR Stone search pop up
var stoneSearchPopUp = function(rowId)  {	
	grStoneForPSR();
	console.log('here2');
	$("#manageStoneForm").trigger('reset');
	var grSrlno = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowId, 'srl');
    var psrType =  $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowId, 'isPsr');
	var globalAttrFlagStone = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowId, 'globalAttrFlagStone');
	
    var rowindex = $("#stoneDetailsGrid").jqxGrid('getselectedrowindex');
    var rowid = $("#stoneDetailsGrid").jqxGrid('getrowid', rowindex);
    var row = $("#stoneDetailsGrid").jqxGrid('getrowdatabyid', rowid);
    console.log(row);
    if(globalAttrFlagStone == null){
	var url = "stoneSearchREN?from=grren&suppliedBy="+row.suppliedBys+"&segId="+row.stoneSegment;
	  $("#stoneSearch").find('.modal-content').load(url,function(result){
			$("#stoneSearch").modal({show:true,  target: "stoneSearchREN"});
			
	  });
	  $('#stoneDetailsGrid').jqxGrid('setcellvalue', rowId, 'globalAttrFlagStone', 1);
    }
    
    if(globalAttrFlagStone == 1){
    	showHideREN(row);
    	$("#stoneSearch").modal({ remote: "stoneSearchREN?from=grren&suppliedBy="+row.suppliedBys+"&segId="+row.stoneSegment, target: "stoneSearchREN" });
    	var suppliedBy =[{"id" : row['suppliedBys'],"name" : row['suppliedBy']}];    	
    	var segMent =[{"id" : row['stoneSegment'],"name" :row['segmentName']}];     	
    	var shape =[{"id" : row['shapeId'],"name" :row['shapeName']}];     	
    	var weightRange = [{"id" : row['weightSlab'],"name" :row['weightSlab']}];     	
    	var clarity = [{"id" : row['clarity'],"name" :row['clarity']}];    	
    	var actualColor = [{"id" : row['actualColor'],"name" :row['actualColor']}];     	
    	var color = [{"id" : row['color'],"name" :row['color']}]; 
    	var cutGrade = [{"id" : row['cutGrade'],"name" :row['cutGrade']}]; 
    	var costRange = [{"id" : row['costRange'],"name" :row['costRange']}]; 
    	var subCategoryName = [{"id" : row['subCategoryId'],"name" :row['subCategory']}]; 
    	
    	populateStonePopUp(suppliedBy,segMent, row['CategoryId'],shape, row['stoneCode'],weightRange,clarity,actualColor, color,cutGrade, row['UOM'],row['subCategoryDesc'],costRange,subCategoryName);
    }
    
  
    return false;
}


var costRangeArr = [];
var onloadCostRangeApi = function(rowindex, wgtRange, costRangeArray){
	var stoneCode = $("#stoneCode").val();
	var vendorId = $("#vendorCode").val();
	var wgtRange =   $("#weightRange").val(); 
	var clarity =   $("#clarity").val(); 
	var cutGrade =   $("#cutGrade").val(); 
	var color =   $("#color").val(); 
	var actualColor =   $("#actualColor").val(); 
	var category =   $("#mainCategory option:selected").text(); 
	costRangeArr = [];
	if(costRangeArray == null){
		var params =  {"stoneCode" : stoneCode,"clarity":clarity,"cutGrade":cutGrade,"color":color,"actualColor":actualColor, "wgtRange":wgtRange, "category": category,"vendorId" : vendorId };
		postJSON('/OrderExecution/api/v1/listCostRangeForGRFG?type=renumberingGr', JSON.stringify(params), function(data) {
			if(typeof data != "undefined" && data.resCode == "1"){ 
				costRange = data.payload.list;
				for(var i = 0; i<costRange.length; i++){
					var costR = {"id": costRange[i].id, "name" : costRange[i].name}
					costRangeArr.push(costR);
				}
			}
		});
	}else{
		for(var i = 0; i<costRangeArray.length; i++){
			var costR = {"id": costRangeArray[i].id, "name" : costRangeArray[i].name}
			costRangeArr.push(costR);
		}
	}
}

var onloadCostRangeApiFirst = function(grSlNo,i,stoneArray){
	var stoneCode = stoneArray.stoneCode;
	var vendorId = $("#vendorCode").val();
	var wgtRange = stoneArray.weightSlab; 
	var clarity =  stoneArray.clarity; 
	var cutGrade = stoneArray.cutGrade; 
	var color = stoneArray.color; 
	var actualColor = stoneArray.actualColor; 
	var category =  stoneArray.CategoryName; 
	costRangeArr = [];
	
	var params =  {"stoneCode" : stoneCode,"clarity":clarity,"cutGrade":cutGrade,"color":color,"actualColor":actualColor, "wgtRange":wgtRange, "category": category,"vendorId" : vendorId};
	postJSON('/OrderExecution/api/v1/listCostRangeForGRFG?type=renumberingGr', JSON.stringify(params), function(data) {
		if(typeof data != "undefined" && data.resCode == "1"){ 
			costRange = data.payload.list;
			for(var i = 0; i<costRange.length; i++){
				var costR = {"id": costRange[i].id, "name" : costRange[i].name}
				costRangeArr.push(costR);
			}
		}
	});
}

//On close of stone search modal pop up.
$('#stoneSearch').on('hide.bs.modal', function(e) {
	var rowindex = $("#stoneDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#stoneDetailsGrid").jqxGrid('getrowid', rowindex);
	var row = $("#stoneDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	var segment = $("#segmentName option:selected").val();
	var mainCategory = $("#mainCategory option:selected").text();
	var mainCategoryName = $('#mainCategory option:selected').text();
	var uom = $("#uom").val();
	var stoneCode = $("#stoneCode").val();
	console.log(segment);
	
	row["segmentName"] = $('#segmentName option:selected').text();
	row["stoneSegment"] = $('#segmentName option:selected').val();
	row["shapeId"] = $("#shape option:selected").val();	
	row["shapeName"] = $("#shape option:selected").text();	
	row['costRange'] = $("#costRange").val();
	row["subCategoryDesc"] = $("#subCategoryDesc").val();
	if(segment !== ""  && mainCategory !== ""   &&  uom != ""  &&  stoneCode != "" ){
		row["suppliedBy"] = $('#stoneSuppBy option:selected').text();
		row["suppliedBys"] = $('#stoneSuppBy option:selected').val();
	
		
		row["CategoryName"] = $("#mainCategory option:selected").text();
		row["CategoryId"] = $("#mainCategory option:selected").val();	
		row["mainCategoryCode"] = $("#mainCategory option:selected").attr('code');
		
	
		row["shapeId"] = $("#shape option:selected").val();	
		row["shapeName"] = $("#shape option:selected").text();	
		
		row["stoneCode"] = $("#stoneCode").val();	
		row["subCategoryDesc"] = $("#subCategoryDesc").val();
		row["stoneCode"] = stoneCode;
		row["UOM"] =  uom;
		
		if($('#segmentName option:selected').text() == "Diamond"){
			row['weightSlab'] = $("#weightRange").val();
			row['clarity'] =  $("#clarity option:selected").val();
			row['color'] = $("#color option:selected").val();
			row['cutGrade'] = $("#cutGrade option:selected").val();
			row['stoneSegment'] = $("#segmentName").val();
			row['segmentName'] = $("#segmentName option:selected").text();
			
			row['subCategory'] = $("#subCategoryName option:selected").text();
			row['subCategoryId'] = $("#subCategoryName").val();
			
			row['costRange'] = $("#costRange").val();
			
			var firstWord = mainCategoryName.split(' ')[0];
			if(firstWord == "CD"){
				row['actualColor'] = $("#actualColor").val();
				row['costRange'] = $("#costRange").val();
				row['CostRangeN'] = $("#costRange").val();
			}else{
				row['costRange'] = null;
				row['CostRangeN'] = null;
			}
		}else{		
			row['weightSlab'] = $("#costRange").val();
			row['clarity'] =  null;
			row['color'] = null;
			row['subCategory'] = $("#subCategoryName option:selected").text();
			row['subCategoryId'] = $("#subCategoryName option:selected").val();
			row['cutGrade'] = null;
			row['actualColor'] = null;
			row['costRange'] = $("#costRange option:selected").val();
			row['CostRangeN'] = $("#costRange option:selected").val();
		}
		console.log(rowid);
		$('#stoneDetailsGrid').jqxGrid('updaterow', rowid, row);
		$("#stoneDetailsGrid").jqxGrid('focus');
	}
	
	var firstword = mainCategoryName.split(' ')[0];
	if(firstword == "CD"){
		onloadCostRangeApi(rowindex, $("#weightRange").val(), null);
	}
	
});

//Cost Range On Load
/*var loadCostRangeDropDown = function(row, cellvalue, editor){
	editor.on('click', function(){
		editor.jqxDropDownList({source : costRangeArr, displayMember : 'name', valueMember : 'id'});
	});
}*/

var loadCostRangeDropDown = function(row, cellvalue, editor){
	editor.on('click', function(){
		/*var stoneData = $("#stoneDetailsGrid").jqxGrid('getrows');
		console.log(stoneData)*/
		var stoneCode = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'stoneCode');
		var clarity = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'clarity');
		var cutGrade = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'cutGrade');
		var color = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'color');
		var actualColor = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'actualColor');
		var wgtRange = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'weightSlab');
		var category = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'CategoryName');
		var vendorId = $("#vendorCode-valueC").val();
		var params =  {"stoneCode" : stoneCode,"clarity":clarity,"cutGrade":cutGrade,"color":color,"actualColor":actualColor, "wgtRange":wgtRange, "category": category,"vendorId" : vendorId};
		postJSON('/OrderExecution/api/v1/listCostRangeForGRFG?type=renumberingGr', JSON.stringify(params), function(data) {			
			var array = [];
			$.each(data.payload.list, function(k,v){
				array.push({"id" : v.id, "name" : v.name});
			});
			editor.jqxDropDownList({source : array, displayMember : 'name', valueMember : 'id'});
		});		
		
	});
}
  
//Cost Range Edit
var costRangeEdit = function(row, datafield, columntype){
	var suppliedBy = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'suppliedBy');
	var category = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'CategoryName');	
	var isPsr = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'isPsr');	
	if(category != null){
		var firstWord = category.split(' ')[0];
	}else{
		var firstWord = "";
	}
	if((suppliedBy == "Vendor" || suppliedBy == "Company") && (firstWord != "" && firstWord == "CD")){
		return true;
	}else{
		return false;
	}
}


//Delete row not allowed for PSR but allowed for None PSR.
var deleteStoneGridRow = function(){
	var selectedrowindexGRDetailsGrid = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var selectedrowindex = $("#stoneDetailsGrid").jqxGrid('getselectedrowindex');
	var psr = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'psr');
	var typeRow = $("#stoneDetailsGrid").jqxGrid('getcellvalue', selectedrowindex, 'typeRow');
	$("#grDetailsGrid").jqxGrid('setcellvalue', selectedrowindexGRDetailsGrid, 'isValid', false);
	if(psr == "N" && typeRow == true){
		
		var rowscount = $("#stoneDetailsGrid").jqxGrid('getdatainformation').rowscount;					
		var grSlNo =  $("#stoneDetailsGrid").jqxGrid('getcellvalue', selectedrowindex, 'srl');
		
		if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
			var id = $("#stoneDetailsGrid").jqxGrid('getrowid',selectedrowindex);
			var commit = $("#stoneDetailsGrid").jqxGrid('deleterow', id);
		}
		
		var k = 1;
		var rows = $("#stoneDetailsGrid").jqxGrid('getrows');
		for(var i=0; i<rows.length; i++){
			if(grSlNo == rows[i].srl){
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', i, 'stoneSrlNo', k);
				k = k + 1;
			}
		}
		
		setTimeout(function () {
			$('#stoneDetailsGrid').jqxGrid('selectrow', (rowscount - 2));
			$('#stoneDetailsGrid').jqxGrid('ensurerowvisible', (rowscount - 2));
	    }, 0);
	}else{
		$.growl.error({ message:"Deletion of stone is allowed for NONE PSR only!" , duration: 10000, title: 'Error' });
	}
}

var updateDetails = function(datafield, data, row, newvalue){
	var resp = data.payload.stoneCostSP;
console.log(resp);
	var suppliedBy =  $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "suppliedBys");
	var usedPcs =  $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "usedPcs");
	var uom =  $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "UOM");
	var usedWt =  $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "usedWt");
	
	if((resp.systemCostRate == null || resp.systemCostRate == "") && suppliedBy == "CO"){
		$.growl.error({ message: "System Cost Rate not found.", duration: 5000, title: 'Error' });
		$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid",false);
	}
	if((resp.systemCostRate == null || resp.systemCostRate == "") && suppliedBy != "CO"){
		$.growl.error({ message: "System Cost Rate not found.", duration: 5000, title: 'Error' });
		$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid",false);
	}
	
	if(resp.sellingRate == null || resp.sellingRate == ""){
		$.growl.error({ message: "Selling Rate not found.", duration: 5000, title: 'Error' });
		$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid",false);
	}
	/*if((resp.handlingChange == null || resp.handlingChange == "") && suppliedBy != "V"){ 
		$.growl.error({ message: "Handling charge not found.", duration: 5000, title: 'Error' });
	}
*/
	console.log('here');
	
	if(resp.systemCostRate == null || resp.systemCostRate == ""){
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostRate", 0);
	}else{
		if(datafield == "usedWt"){
		 (uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostRate", parseFloat(NVL(resp.systemCostRate,0))/newvalue) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostRate", parseFloat(NVL(resp.systemCostRate,0))/usedPcs);
		 (uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostPrice", resp.systemCostRate) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostPrice", resp.systemCostRate);
		}
		if(datafield == "usedPcs"){
		 (uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostRate", parseFloat(NVL(resp.systemCostRate,0))/usedWt) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostRate", parseFloat(NVL(resp.systemCostRate,0))/newvalue);
		 (uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostPrice", resp.systemCostRate) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostPrice", resp.systemCostRate);
		}
	}
	
	
	if(resp.sellingRate == null || resp.sellingRate == ""){
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", null);
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice",  0.00);
	}else{ 
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", resp.sellingRate);
		
		 if(datafield == "usedWt"){
			 (uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", newvalue*parseFloat(NVL(resp.sellingRate,0))) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedPcs*parseFloat(NVL(resp.sellingRate,0)));
		 }
		 
		 if(datafield == "usedPcs"){
			 (uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt*resp.sellingRate) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", newvalue*resp.sellingRate);
		 }
			
	}
	
}

var updateCost = function(row, datafield, columntype, oldvalue, newvalue, event){
	var grSlNo = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "srl");
	var suppliedBy = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "suppliedBy");
	var usedWt = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "usedWt");
	var usedPcs = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "usedPcs");
	var uom = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "UOM");
	var costRangeN = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "CostRangeN");
	var stoneListId = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneListId");
	var stoneCode = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneCode");
	var actualColor = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "actualColor");
	var color = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "color");
	var cutGrade = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "cutGrade");
	var clarity = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "clarity");
	var weightSlab = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "weightSlab");
	var stoneCostRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneCostRate");
	var stoneSrlNo = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneSrlNo");
	var costR = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "costRange");
	var actualRefType = $("#grDetailsGrid").jqxGrid('getcellvalue', (grSlNo - 1), "actualRefType");
	var actualRefSrlNo = $("#grDetailsGrid").jqxGrid('getcellvalue', (grSlNo - 1), "actualRefSrlNo");
	var actualRefDocNo = $("#grDetailsGrid").jqxGrid('getcellvalue', (grSlNo - 1), "actualRefDocNo");
	var vendorId = parseInt($("#vendorCodeC").val());
	var stoneSrlNum = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneSrlNo");

	
	var refType = $("#refType").val();
	var refDocNo = $("#refNo").val();
	var refSlNo = $("#refSlNo").val();
	if(actualRefDocNo == null || actualRefDocNo == ""){
		var refSlNumber = refSlNo;
		var refDocNumber =refDocNo;		
	}else{
		var refSlNumber = actualRefSrlNo;
		var refDocNumber = actualRefDocNo;
	}
	if(datafield == "usedWt" || datafield == "usedPcs"){
		if(weightSlab == null || weightSlab == 0 || weightSlab == "" || typeof weightSlab == "undefined"){
			weightSlab = null;
		}else{
			weightSlab = weightSlab;
		}
			
		var fieldFilter = {"fieldFilters": 
							{ "refType":actualRefType,
							  "refDocNo":refDocNumber,
							  "refSrlNo" : (actualRefType == "MR") ? stoneSrlNum : refSlNumber, 
							  "stoneCode":stoneCode,
							  "suppliedBy":suppliedBy, 
							  "uom":uom, 
							  "stoneSrlNo" : stoneSrlNo, 
							  "vendorId": vendorId,
							  "stoneCostRate" : null,
							  "costRange" : costR,
							  "actualColor" : actualColor,
							  "color" : color, 
							  "cutGrade" : cutGrade,
							  "clarity" : clarity,
							  "weightSlab" : weightSlab
							  }
							}
	
		postJSON('/OrderExecution/api/v1/renumGrStoneCostSPDetails', JSON.stringify(fieldFilter), function(data) {
			
			if(data.resCode == "1" && typeof data != "undefined"){
				updateDetails(datafield,data, row, newvalue);
			}else{
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostRate",0);
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostPrice",0);
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate",0);	
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice",0);	
				$("#grDetailsGrid").jqxGrid('setcellvalue', (grSlNo - 1), "isValid",false);
				$.growl.error({ message: data.mesgStr, duration: 5000, title: '' });
				return false;
			}
		});
		
	}
	
}


//Update Cell Value on change of Stone Grid
var updateCellValueChange = function(row, datafield, columntype, oldvalue, newvalue, event){
		if(datafield == "usedWt" || datafield == "usedPcs"){
			var grSlNo = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "srl");
			$("#grDetailsGrid").jqxGrid('setcellvalue', (grSlNo-1), "isValid", false);
		}			
		updateCost(row, datafield, columntype, oldvalue, newvalue, event);
		
}

var commonValidateStone = function(cell, value){
	console.log(value);
	if(value < 0) { return { result: false, message: "Invalid Number" }};
	
	var suppliedBy = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'suppliedBy');
	var category = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'CategoryName');
	var costRange = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'costRange');
	var usedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'usedWt');
	
	//if(typeof usedWt == "undefined" || usedWt == null || usedWt == ""){ usedWt = 0;}
	if(category != null){
		var firstword = category.split(' ')[0];
	}else{
		var firstword = null;
	}
	if(cell.datafield == "usedWt" && (firstword != null && firstword == "CD") && (suppliedBy == "V" || suppliedBy == "CO")){
		if((costRange == null || costRange == "")){return { result: false, message: "Please select cost range" }}
	}

	
	return true;
}

//Update on change Stone Cost Rate, Retured Wt, Stone Handling Charges
var updateOnchangeStoneRateSC = function(row, datafield, columntype, oldvalue, newvalue, event){
	updateCost(row, datafield, columntype, oldvalue, newvalue, event);
}


//Stone Grid related to GR line item.
var stoneGRGrid = function(data){
	var costRangeSource = {datatype : 'json', 	datafields : [{name : 'id',type : 'string'},{name : 'name',	type : 'string'}],localdata : costRangeArr};
	var costRangeDataAdapter = new $.jqx.dataAdapter(costRangeSource, {	autoBind : true	});
	
	
	var source = {
			datafields : [ 
				{'name' : 'srl','type' : 'int'}, 
				{'name' : 'stoneSrlNo','type' : 'int'}, 
				{'name' : 'suppliedBy','type' : 'string'},
				{'name' : 'suppliedBys','type' : 'string'},
				{'name' : 'stoneCode','type' : 'string'}, 
				{'name' : 'subCategoryDesc','type' : 'string'}, 
				{'name' : 'costRange', type : 'string', 
					values : {
						source : costRangeDataAdapter.records,
						value : 'id',
						name : 'name'
					}
				}, 
				{'name' : 'usedPcs','type' : 'int'},  
				{'name' : 'usedWt','type' : 'float'}, 
				{'name' : 'UOM','type' : 'string'}, 
				{'name' : 'stoneCostRate','type' : 'float'},  
				{'name' : 'stoneCostPrice','type' : 'float'},
				
				{'name' : 'stoneCategory', 'type' : 'string'},
				{'name' : 'actualColor','type' : 'string'}, 
				{'name' : 'color','type' : 'string'}, 				
				{'name' : 'cutGrade','type' : 'string'}, 
				{'name' : 'clarity','type' : 'string'},		 
				{'name' : 'weightSlab','type' : 'string'},				
				{'name' : 'handlingCharge','type' : 'float'}, 
				{'name' : 'fromWeightCostRange','type' : 'string'},
				{'name' : 'toWeightCostRange','type' : 'string'},
				{'name' : 'certificateDetail','type' : 'string'},	
				{'name' : 'toColorDiamondCost','type' : 'float'},
				{'name' : 'fromColorDiamondCost','type' : 'float'},
				{'name' : 'sellingRate','type' : 'float'},
				{'name' : 'sellingPrice','type' : 'float'},
				{'name' : 'subCategoryId','type' : 'int'},
				{'name' : 'stoneSegment','type' : 'int'},
				{'name' : 'CategoryName','type' : 'string'},
				{'name' : 'CategoryId','type' : 'int'},
				{'name' : 'stoneStandardRate','type' : 'float'},
				{'name' : 'isPsr','type' : 'string'},
				
				{'name' : 'mainCategoryCode','type' : 'string'},
				{'name' : 'subCategory','type' : 'string'},
				{'name' : 'globalAttrFlagStone','type' : 'int'},
				{'name' : 'shapeId','type' : 'int'},
				{'name' : 'shapeName','type' : 'string'}	
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
			}
		};
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#stoneDetailsGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 35,
		theme: 'fresh',
		columnsresize: true, 
        autoshowfiltericon: true,
		filterable: true,
		autoheight: false,
		altRows : false,
		height: '225px',
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);			
			container.append('<div class="col-md-12"><div style="margin-top: -3px; color:#00800; font-size:15px;"  id="orderTypeLabel" class="pull-left">Stone Details</div></div>');	
			
		},
		
		columns : [ 
			{'text' : 'GR.Sl.No.',datafield : 'srl',sortable : false,editable : false, width : '4%',cellsalign : 'center',align:'center', filterable: true},
			{'text' : 'Srl.', datafield : 'stoneSrlNo',sortable : false,editable : false, width : '4%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Supp.By',datafield : 'suppliedBy',sortable : false,editable : false, width : '10%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Stn.Code',datafield : 'stoneCode',sortable : false,editable : true, width : '10%',cellsalign : 'center',align:'center', filterable: false,cellbeginedit: stoneSearchPopUp}, 
			{'text' : 'Sub Cat./Shape',datafield : 'subCategoryDesc',sortable : false,editable : false, width : '12%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Cost Range',datafield : 'costRange',sortable : false,editable : true,width : '12%',cellsalign : 'center',align:'center',columntype : 'dropdownlist',displayfield : 'CostRangeN', filterable: false,createeditor : loadCostRangeDropDown,cellbeginedit: costRangeEdit},
			{'text' : 'Used Pcs',datafield : 'usedPcs',columntype : 'numberinput',sortable : false,editable : true, width : '10%',cellsalign : 'center',align:'center', filterable: false, validation : commonValidateStone,cellbeginedit: grStoneForPSR, cellvaluechanging : updateCellValueChange, filterable: false}, 
			{'text' : 'Used Wt.',datafield : 'usedWt',sortable : false,cellsformat : 'd3',editable : true, width : '10%',cellsalign : 'center',align:'center', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput',  filterable: false, validation : commonValidateStone,cellbeginedit: grStoneForPSR, cellvaluechanging : updateCellValueChange}, 
			{'text' : 'UQC',datafield : 'UOM',sortable : false,editable : false, width : '4%',cellsalign : 'center',align:'center', filterable: false,cellbeginedit: grStoneForPSR}, 
			{'text' : 'Stn.Cost Rate',datafield : 'stoneCostRate',sortable : false,editable : false,cellsformat : 'd2',columntype : 'numberinput', width : '12%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Stn.Cost',datafield : 'stoneCostPrice',sortable : false,editable : false, width : '12%',cellsalign : 'center',align:'center',cellsformat : 'd2',columntype : 'numberinput', filterable: false}, 
			// Hidden field of stone 
			
			{'text' : '',datafield : 'shapeId',hidden : true},
			{'text' : '',datafield : 'shapeName',hidden : true},
			{'text' : '',datafield : 'globalAttrFlagStone',hidden : true},
			{'text' : '',datafield : 'stoneCategory',hidden : true},
			{'text' : '',datafield : 'actualColor',hidden : true},
			{'text' : '',datafield : 'color',hidden : true},
			{'text' : '',datafield : 'cutGrade',hidden : true},
			{'text' : '',datafield : 'clarity',hidden : true},
			{'text' : '',datafield : 'weightSlab',hidden : true},
			{'text' : '',datafield : 'handlingCharge',hidden : true},
			{'text' : '',datafield : 'fromWeightCostRange',hidden : true},
			{'text' : '',datafield : 'toWeightCostRange',hidden : true},
			{'text' : '',datafield : 'certificateDetail',hidden : true},
			{'text' : '',datafield : 'toColorDiamondCost',hidden : true},
			{'text' : '',datafield : 'fromColorDiamondCost',hidden : true},
			{'text' : '',datafield : 'sellingRate',hidden : true},
			{'text' : '',datafield : 'sellingPrice',hidden : true},
			{'text' : '',datafield : 'subCategoryId',hidden : true},
			{'text' : '',datafield : 'stoneSegment',hidden : true},

			{'text' : '',datafield : 'CategoryName',hidden : true},
			{'text' : '',datafield : 'CategoryId',hidden : true},
			{'text' : '',datafield : 'stoneStandardRate',hidden : true},
			
			{'text' : '',datafield : 'isPsr',hidden : true},			
			{'text' : '',datafield : 'mainCategoryCode',hidden : true},
			

			{'text' : '',datafield : 'subCategory',hidden : true}
			
		]
	});	
}

// Accessory grid common validation
var commonAccValidation = function(cell, value){
	
}

// Accessory grid on change cell value
var onchangeUpdateAcc = function(row, datafield, columntype, oldvalue, newvalue, event){
	
}

var grAccForPSR = function(row, datafield, columntype) {	

	var grSrlno = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'srl');
    var psrType =  $('#grDetailsGrid').jqxGrid('getcellvalue', (grSrlno-1), 'psr');    
    var suppliedBy = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'suppliedBys');
    
    if(suppliedBy == "CU" && datafield == "accessoryCostRate"){ return false;}
    else if( suppliedBy == "CO" && datafield == "accessoryCostRate" ){  return false; }
    else if (psrType == 'N' && (datafield != "usedPcs" && datafield != "usedWt"  && datafield != "accessoryCostRate")) {  return false; }
    else{ return true; }
	
}

//GR Accessory search pop up
var accSearchPopUp = function(rowId)  {	
	grAccForPSR();
	$("#accSubCatEdit").hide();
	$("#accSubCat").show();
	$("#accCostRangeEdit").hide();
	$("#accCostRange").show();
	$("#manageAccForm").trigger('reset');
	var grSrlno = $('#accDetailsGrid').jqxGrid('getcellvalue', rowId, 'srl');
    var psrType =  $('#grDetailsGrid').jqxGrid('getcellvalue', (grSrlno -1), 'psr');
    $("#accSegment").val('Accessory');
    var rowindex = $("#accDetailsGrid").jqxGrid('getselectedrowindex');
    var rowid = $("#accDetailsGrid").jqxGrid('getrowid', rowindex);
    var row = $("#accDetailsGrid").jqxGrid('getrowdatabyid', rowid);
    var globalAttrFlagAcc = $('#accDetailsGrid').jqxGrid('getcellvalue', rowId, 'globalAttrFlagAcc');
	
    
    if(globalAttrFlagAcc == null){
    	
    	var url = "accSearchREN?from=grren&suppliedBy="+row.suppliedBys;
		  $("#accSearch").find('.modal-content').load(url,function(result){
				$("#accSearch").modal({show:true,  target: "accSearchREN"});
		  });
		  $('#accDetailsGrid').jqxGrid('setcellvalue', rowId, 'globalAttrFlagAcc', 1);
    }
    if(globalAttrFlagAcc == 1){
    	$("#accSearch").modal({ remote: "accSearchREN?from=grren&suppliedBy="+row.suppliedBys, target: "accSearchREN" });
    	var suppliedBy =[{"id" : row['suppliedBys'],"name" : row['suppliedBy']}];    	
    	var subCategory =[{"id" : row['accSubCatId'],"name" :row['accSubCategory']}];     	
    	var accCostRange = [{"id" : row['accCostRange'],"name" :row['accCostRange']}];     
    	
    	populateAccPopUp(suppliedBy,'Accessory', row['accMainCatId'], subCategory, accCostRange,row['accessoryCode'],row["UOM"]);
  
    }
	return false;
}

//On close of acc search modal pop up.
$('#accSearch').on('hide.bs.modal', function(e) {
	$("#accSegment").val('Accessory');
	var rowindex = $("#accDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#accDetailsGrid").jqxGrid('getrowid', rowindex);
	var row = $("#accDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	if($("#accSupBy").val() != "" && $('#accSegment').val() != "" &&  $("#accMainCat option:selected").val() != "" && $("#accArticleCode").val()!= ""){
	if ($("#accSubCat").val() != "") {
		row["suppliedBys"] = $("#accSupBy").val();
		row["suppliedBy"] = $("#accSupBy option:selected").text();
		row["accSegment"] = $('#accSegment').val();
		row["accMainCat"] = $("#accMainCat option:selected").text();
		row["accMainCatId"] = $("#accMainCat option:selected").val();
		row["subCategoryDesc"] = $("#accSubCat option:selected").text();
		row["accCostRange"] = $("#accCostRange option:selected").val();
		row["accSubCategory"] = $("#accSubCat option:selected").text();
		row["accSubCatId"] = $("#accSubCat option:selected").val();
		row["accessoryCode"] = $("#accArticleCode").val();
		row["UOM"] = $("#uomAcc").val();
		
		$('#accDetailsGrid').jqxGrid('updaterow', rowid, row);				
	}
	
	$("#accDetailsGrid").jqxGrid('focus');
	}
	
});


var updateAccCost = function(row, datafield, columntype, oldvalue, newvalue){
	var grSlNo = $("#grDetailsGrid").jqxGrid('getcellvalue', row, "srl");
	var accessoryCostRate = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accessoryCostRate");
	var usedPcs = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "usedPcs");
	var usedWt = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "usedwt");	
	var sellingRate = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "sellingRate");
	var suppliedBy = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "suppliedBys");
	var uom = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "UOM");
	var accessoryCode = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accessoryCode");
	var accessorySrlNo = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accessorySrlNo");
	var actualRefType = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "actualRefType");
	var actualRefSrlNo = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "actualRefSrlNo");
	var actualRefDocNo = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "actualRefDocNo");
	var accSrlNum =  $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accessorySrlNo");
	
	var refType = $("#refType").val();
	var refDocNo = $("#refNo").val();
	var refSlNo = $("#refSlNo").val();
	console.log(actualRefType);
	console.log(refType);

	if(actualRefDocNo == null || actualRefDocNo == ""){
		var refSlNumber = refSlNo;
		var refDocNumber = refDocNo;		
	}else{
		var refSlNumber = actualRefSrlNo;
		var refDocNumber = actualRefDocNo;
	}
	if(sellingRate == null || sellingRate == ""){
		$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", 0.00);
	}
	
	
	var fieldFilter = {"fieldFilters": 
						{ "refType":actualRefType, 
						  "refDocNo":refDocNumber,
						  "refSrlNo" : (actualRefType == "MR") ? accSrlNum :refSlNumber,
						  "accCode":accessoryCode,
						  "accessorySrlNo" : accessorySrlNo
						  }
						}
	

	postJSON('/OrderExecution/api/v1/renumGrAccCostSPDetails', JSON.stringify(fieldFilter), function(data) {
		
		if(data.resCode == 1 && typeof data != "undefined"){
			if(data.payload.accCostSP.systemCostRate == null || data.payload.accCostSP.systemCostRate == ""){
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "systemCostRate", 0.00);
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "systemCostPrice", 0.00);
			}else{
				if(datafield == "usedWt"){
				 (uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accessoryCostRate", parseFloat(NVL(data.payload.accCostSP.systemCostRate,0))/newvalue) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accessoryCostRate", parseFloat(NVL(data.payload.accCostSP.systemCostRate,0))/usedPcs);
				 (uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accessoryCost", data.payload.accCostSP.systemCostRate) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accessoryCost", data.payload.accCostSP.systemCostRate);
				}
				if(datafield == "usedPcs"){
				 (uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accessoryCostRate", parseFloat(NVL(data.payload.accCostSP.systemCostRate,0))/usedWt) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accessoryCostRate", parseFloat(NVL(data.payload.accCostSP.systemCostRate,0))/newvalue);
				 (uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accessoryCost", data.payload.accCostSP.systemCostRate) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accessoryCost", data.payload.accCostSP.systemCostRate);
				}
			}
			
			if(data.payload.accCostSP.sellingRate == null || data.payload.accCostSP.sellingRate == ""){
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", 0.00);
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", 0.00);
			}else{
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", data.payload.accCostSP.sellingRate);
			
				if(datafield == "usedWt"){
					(uom=="Cts"  || uom == "Gms") ?  $("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", newvalue * parseFloat(NVL(data.payload.accCostSP.sellingRate,0))) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedPcs * parseFloat(NVL(data.payload.accCostSP.sellingRate,0)));
				}
				
				if(datafield == "usedPcs"){
					(uom=="Cts"  || uom == "Gms") ?  $("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt * data.payload.accCostSP.sellingRate) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", newvalue * parseFloat(NVL(data.payload.accCostSP.sellingRate,0)));
				}	
			}
			
			
		}else{
			$("#grDetailsGrid").jqxGrid('setcellvalue', (grSlNo - 1), "isValid",false);
			$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", 0.00);
			$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", 0.00);
			$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accessoryCostRate", 0.00);
			$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accessoryCost", 0.00);
			$.growl.error({ message: data.mesgStr, duration: 5000, title: 'Error' });
			return false;
		}
	});
	
		
}

var checkUsedWtValidation = function (row, datafield, columntype, oldvalue, newvalue, event) {
	if(datafield == "usedWt" || datafield == "usedPcs"){
		var grSlNo = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "srl");
		$("#grDetailsGrid").jqxGrid('setcellvalue', (grSlNo-1), "isValid", false);
	}
	
	updateAccCost(row, datafield, columntype, oldvalue, newvalue);
}

var commonValidateAcc = function(cell, value){	
	if(value < 0) { return { result: false, message: "Invalid Number" }};	
	return true;
}

var updateOnchangeAccRateSC = function(row, datafield, columntype, oldvalue, newvalue, event){
	var grSlNo = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "srl");
	$("#grDetailsGrid").jqxGrid('setcellvalue', (grSlNo-1), "isValid", false);
	updateAccCost(row, datafield, columntype, oldvalue, newvalue, event);
}

//Accessory Grid related to GR line item.
var accGRGrid = function(data){
		
	var source = {
			datafields : [ 
				{'name' : 'srl','type' : 'int'},
				{'name' : 'accessorySrlNo','type' : 'int'},
				{'name' : 'suppliedBy','type' : 'string'},
				{'name' : 'suppliedBys','type' : 'string'}, 
				{'name' : 'accessoryCode','type' : 'string'},
				{'name' : 'accSubCategory','type' : 'string'}, 
				{'name' : 'usedPcs','type' : 'int'},
				{'name' : 'usedwt','type' : 'float'}, 
				{'name' : 'UOM','type' : 'string'}, 
				{'name' : 'accessoryCostRate','type' : 'float'}, 
				{'name' : 'accessoryCost','type' : 'float'}, 
				{'name' : 'costRange','type' : 'string'}, 
				{'name' : 'vendorId','type' : 'int'}, 
				{'name' : 'costRate','type' : 'float'}, 
				{'name' : 'fromCostRange','type' : 'string'}, 
				{'name' : 'toCostRange','type' : 'string'}, 
				{'name' : 'sellingPrice','type' : 'float'}, 
				{'name' : 'sellingRate','type' : 'float'}, 
				{'name' : 'isPsr','type' : 'string'}, 
				{'name' : 'accStandardRate','type' : 'float'}, 
				{'name' : 'subCategoryDesc','type' : 'string'},
				
				{'name' : 'accMainCat','type' : 'string'},
				{'name' : 'accMainCatId','type' : 'int'},
				{'name' : 'accSubCatId','type' : 'int'} ,
				{'name' : 'globalAttrFlagAcc','type' : 'int'} ,
				{'name' : 'actualRefType','type' : 'string'},
				{'name' : 'actualRefDocNo','type' : 'int'},
				{'name' : 'actualRefSrlNo','type' : 'int'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
			}
		};
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#accDetailsGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 35,
		theme: 'fresh',
		columnsresize: true, 
		filterable: true,
		autoheight: false,
        autoshowfiltericon: true,
		altRows : false,
		height: '225px',
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);			
			container.append('<div class="col-md-12"><div style="margin-top: -3px; color:#00800; font-size:15px;"  id="orderTypeLabel" class="pull-left">Accessory Details</div></div>');	

		},
		
		columns : [ 
			{'text' : 'Gr.Sl.No.',datafield : 'srl',editable : false, sortable : false, width: '4%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Srl.',datafield : 'accessorySrlNo',editable : false, sortable : false, width: '4%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Supp.By',datafield : 'suppliedBy',editable : false, sortable : false, width: '12%',cellsalign : 'center',align:'center',filterable: false}, 
			{'text' : 'Supp.By',datafield : 'suppliedBys',hidden : true, sortable : false, width: '12%',cellsalign : 'center',align:'center',filterable: false}, 
			{'text' : 'Acc.Code',datafield : 'accessoryCode',editable : true, sortable : false, width: '10%',cellsalign : 'center',align:'center', filterable: false,cellbeginedit: accSearchPopUp}, 
			{'text' : 'Sub Cat/Shape.',datafield : 'accSubCategory',editable : false, sortable : false, width: '20%',cellsalign : 'center',align:'center',filterable: false},
			{'text' : 'Used Pcs',datafield : 'usedPcs',editable : true, sortable : false, width: '8%',cellsalign : 'center',align:'center',columntype : 'numberinput',filterable: false, validation : commonValidateAcc, cellvaluechanging : checkUsedWtValidation}, 
			{'text' : 'Used. Wt.',datafield : 'usedwt',editable : true, sortable : false,cellsformat : 'd3', width: '8%',cellsalign : 'center',align:'center', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput', validation : commonValidateAcc, cellvaluechanging : checkUsedWtValidation, filterable: false}, 
			{'text' : 'UQC',datafield : 'UOM',editable : false, sortable : false, width: '5%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Acc.Cost Rate',datafield : 'accessoryCostRate',editable : false, sortable : false, width: '16%',cellsalign : 'center',align:'center',cellsformat : 'd2',columntype : 'numberinput', filterable: false}, 
			{'text' : 'Acc.Cost',datafield : 'accessoryCost',editable : false, sortable : false, width: '13%',cellsalign : 'center',align:'center',cellsformat : 'd2',	columntype : 'numberinput', filterable: false},
			
			// Hidden field of stone 

			{'text' : '',datafield : 'globalAttrFlagAcc',hidden:true},
			{'text' : '',datafield : 'costRange',hidden:true}, 
			{'text' : '',datafield : 'vendorId',hidden : true},
			{'text' : '',datafield : 'costRate',hidden : true},
			{'text' : '',datafield : 'fromCostRange',hidden : true},	
			{'text' : '',datafield : 'toCostRange',hidden : true},	
			{'text' : '',datafield : 'sellingPrice',hidden : true},	
			{'text' : '',datafield : 'sellingRate',hidden : true},
			{'text' : '',datafield : 'isPsr',hidden : true},
			{'text' : '',datafield : 'accStandardRate',hidden : true},
			{'text' : '',datafield : 'subCategoryDesc',hidden : true},
			
			{'text' : '',datafield : 'accMainCat',hidden : true},
			{'text' : '',datafield : 'accMainCatId',hidden : true},
			{'text' : '',datafield : 'accSubCatId',hidden : true},
			
			{'text' : '',datafield : 'actualRefType',hidden : true},
			{'text' : '',datafield : 'actualRefDocNo',hidden : true},
			{'text' : '',datafield : 'actualRefSrlNo',hidden : true}
		]
	});	
}

var validateMandatory = function(){
	console.log(dataArrCreateFlag);
	var refType = $("#refType").val();
	var refNo = $("#refNo").val();
	var refSlNo = $("#refSlNo").val();
	var validate = false;
	var vendorCodeVal = $("#vendorCode").val();
	if(refType == null || refType == ""){
		 validate = false;
	}else if(refNo == null || refNo == ""){
		validate = false;
	}else if((refSlNo == null || refSlNo == "") && (refType == "PB"  || refType == "SR" || refType == "DTDC")){
		validate = false;
	}else if(vendorCodeVal == null || vendorCodeVal == ""){
		validate = false;
	}else if(dataArrCreateFlag == false){
		validate = false;
	}else{
		validate = true;
	}
	
	return validate;
}

$("#create").on('click', function(){
	if(validateMandatory()){
		$("#searchGrFgForm").hide();
		$("#createGrFgForm").show();
		$("#create").hide();
		$("#back").show();
		$("#grDetailsId").show();
		var vendorId = $("#vendorCode").val();
		$("#vendorCodeC").val(vendorId);
		onloadRefType(4);
		grDetailsList();
		stoneGRGrid();
		accGRGrid();
	}else{
		$.growl.error({ message: "Please select mandatory field.", duration: 5000, title: 'Error' });
	}
});

$("#back").on('click', function(){
	redirect();
});

var generateFieldFilters = function(){
	fieldFilters = {"fieldFilters" : {}};
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();	
	var igrNo = $("#igrNo").val();
	var refNo = $("#refNoS").val();
	var refType = $("#refType").val();
	if(fromDate != null && fromDate != ""){
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if(toDate != null && toDate != ""){
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	
	if(igrNo != null && igrNo != ""){
		fieldFilters.fieldFilters["igrNo"] = igrNo;
	}
	
	if(refNo != null && refNo != ""){
		fieldFilters.fieldFilters["refNo"] = refNo;
	}
	if(refType != null && refType != ""){
		fieldFilters.fieldFilters["refType"] = refType;
	}
	return fieldFilters;
}

$("#search").on('click', function(){
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	if(fromDate == "" && toDate == ""){
		$.growl.error({ message: "Please select from date and to date.", duration: 5000, title: 'Error' });
		return false;
	}
	
	searchGrRenumberingGrid();
	$("#jqxgrid").show();
});

var stoneSearchGrid = function(data){
	var source = {
	        localdata: data,
	        datatype: "json",
			datafields : [ 
				{name : 'stoneSrlNo',	type : 'int'},
				{name : 'suppliedBy',	type : 'string'},
				{name : 'stoneCode', type : 'string'},
				{name : 'subCategoryDesc', type : 'string'},
				{name : 'weightSlab', type : 'string'},
				{name : 'usedPcs', type : 'int'},
				{name : 'usedWt', type : 'float'},
				{name : 'UOM', type : 'string'},
				{name : 'stoneCostRate', type : 'float'},
				{name : 'stoneCostPrice', type : 'float'}
			]
		};

		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#stoneSearchGrid").jqxGrid({
			source : dataAdapter,
			width : '100%',
			editable : false,
			theme: 'energyblue',
			columnsheight : 35,
			autorowheight : true,
			autoheight : true,
			altRows : true,
			columnsresize : true,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
				container.append('<i class="fa fa-list fa-md"></i>&nbsp; Stone search listing');
				
			},
			
			columns : [
				{'text' : 'Sl No',datafield : 'stoneSrlNo',sortable : false,editable : false, width : '8%',cellsalign : 'center',align:'center', filterable: false}, 
				{'text' : 'Supp.By',datafield : 'suppliedBy',sortable : false,editable : false, width : '8%',cellsalign : 'center',align:'center', filterable: false}, 
				{'text' : 'Stn.Code',datafield : 'stoneCode',sortable : false,editable : true, width : '8%',cellsalign : 'center',align:'center', filterable: false}, 
				{'text' : 'Sub Cat./Shape',datafield : 'subCategoryDesc',sortable : false,editable : false, width : '16%',cellsalign : 'left',align:'center', filterable: false}, 
				{'text' : 'Weight Slab',datafield : 'weightSlab',sortable : false,editable : true,width : '12%',cellsalign : 'center',align:'center'},
				{'text' : 'Used Pcs',datafield : 'usedPcs',columntype : 'numberinput',sortable : false,editable : true, width : '8%',cellsalign : 'center',align:'center', filterable: false}, 
				{'text' : 'Used Wt.',datafield : 'usedWt',sortable : false,cellsformat : 'd3',editable : true, width : '8%',cellsalign : 'right',align:'center'}, 
				{'text' : 'UQC',datafield : 'UOM',sortable : false,editable : false, width : '8%',cellsalign : 'center',align:'center', filterable: false}, 
				{'text' : 'Stn.Cost Rate',datafield : 'stoneCostRate',sortable : false,editable : false,cellsformat : 'd2',columntype : 'numberinput', width : '12%',cellsalign : 'center',align:'center', filterable: false}, 
				{'text' : 'Stn.Cost',datafield : 'stoneCostPrice',sortable : false,editable : false, width : '12%',cellsalign : 'center',align:'center',cellsformat : 'd2',columntype : 'numberinput', filterable: false}, 
				
			]
		});
}

var accSearchGrid = function(data){
	var source = {
	        localdata: data,
	        datatype: "json",
			datafields : [ 
				{name : 'accessorySrlNo',	type : 'int'},
				{name : 'suppliedBy',	type : 'string'},
				{name : 'accessoryCode', type : 'string'},
				{name : 'accSubCategory', type : 'string'},
				{name : 'usedPcs', type : 'int'},
				{name : 'usedwt', type : 'float'},
				{name : 'UOM', type : 'string'},
				{name : 'accessoryCost', type : 'float'},
				{name : 'accessoryCostRate', type : 'float'},
				{name : 'globalAttrFlagAcc', type : 'int'}
			]
		};

		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#accSearchGrid").jqxGrid({
			source : dataAdapter,
			width : '100%',
			editable : false,
			theme: 'energyblue',
			columnsheight : 35,
			autorowheight : true,
			autoheight : true,
			altRows : true,
			columnsresize : true,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
				container.append('<i class="fa fa-list fa-md"></i>&nbsp; Accessory Search Listing');
				
			},
			
			columns : [
				{'text' : 'Sl No',datafield : 'accessorySrlNo',editable : false, sortable : false, width: '8%',cellsalign : 'center',align:'center',filterable: false}, 
				{'text' : 'Supp.By',datafield : 'suppliedBy',editable : false, sortable : false, width: '8%',cellsalign : 'center',align:'center',filterable: false}, 
				{'text' : 'Acc.Code',datafield : 'accessoryCode',editable : true, sortable : false, width: '8%',cellsalign : 'center',align:'center', filterable: false}, 
				{'text' : 'Sub Cat/Shape.',datafield : 'accSubCategory',editable : false, sortable : false, width: '16%',cellsalign : 'left',align:'center',filterable: false},
				{'text' : 'Used Pcs',datafield : 'usedPcs',editable : true, sortable : false, width: '12%',cellsalign : 'center',align:'center',columntype : 'numberinput',filterable: false}, 
				{'text' : 'Used. Wt.',datafield : 'usedWt',editable : true, sortable : false,cellsformat : 'd3', width: '12%',cellsalign : 'right',align:'center', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput',filterable: false}, 
				{'text' : 'UQC',datafield : 'UOM',editable : false, sortable : false, width: '8%',cellsalign : 'center',align:'center', filterable: false}, 
				{'text' : 'Acc.Cost Rate',datafield : 'accessoryCostRate',editable : false, sortable : false, width: '16%',cellsalign : 'center',align:'center',cellsformat : 'd2',columntype : 'numberinput', filterable: false}, 
				{'text' : 'Acc.Cost',datafield : 'accessoryCost',editable : false, sortable : false, width: '12%',cellsalign : 'center',align:'center',cellsformat : 'd2',	columntype : 'numberinput', filterable: false},
				{'text' : 'Acc.Cost',datafield : 'globalAttrFlagAcc',editable : false, hidden : true}
			]
		});
}
var viewRenumberingGR = function(row){
	var stoneList = $("#jqxgrid").jqxGrid('getcellvalue', row, "stoneList");
	var accessoryList = $("#jqxgrid").jqxGrid('getcellvalue', row, "accessoryList");
	
	if(stoneList.length == 0 && accessoryList.length == 0){
		stoneSearchGrid();
		accSearchGrid();
	}else{
		stoneSearchGrid(stoneList);
		accSearchGrid(accessoryList);
	}
}
//Search Design Order Grid
function searchGrRenumberingGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	
	var viewRenumberingGR = function(row, column, value) {
		return '<button  id='+ row + ' onclick="viewRenumberingGR('+ row +')" style="margin-left:1px; margin-top:6px;" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewRenumberingGR"  type="button" /><i class="fa fa-eye fa-lg"></i></button>';
	}
	
	var datafields = [ 
		{name : 'refType',type : 'string'},
		{name : 'refNo', type : 'int'},
		{name : 'refSrlNo', type : 'int'},
		{name : 'vendorCode', type : 'string'},
		{name : 'articleCode', type : 'string'},
		{name : 'articleDescription', type : 'string'},
		{name : 'jewelTypeId', type : 'string','map':'jewelTypeDesc'},
		{name : 'pieces', type : 'int'},
		{name : 'grossWt', type : 'float'},
		{name : 'netWt', type : 'float'},
		{name : 'skinPurity', type : 'float'},
		{name : 'meltingPurity', type : 'float'},
		{name : 'stoneList', type : 'array'},
		{name : 'accessoryList', type : 'array'},
		{name : 'costCode', type : 'string'},
		{name : 'costWastage', type : 'float'},
		{name : 'costMCTotalCost', type : 'float'},
		{name : 'setSellingPrice', type : 'float'},
		{name: 'sellingWastage', type: 'float'},
		{name: 'sellingMCTotalCost', type: 'float'},
		{name: 'id', type: 'int'}
	];
	var columns = [
		{'text' : 'Ref Type', datafield : 'refType', width : '4%', cellsalign : 'center', align : 'center', editable : false,
			cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
			  var refType = $('#jqxgrid').jqxGrid('getcellvalue', row, 'refType');
			     if(refType == "S"){
			    	 return '<div style="text-align:center; margin: 0; padding-top:20px; height:40px;">' + "Stock"  + '</div>';
			     }else{
			    	 return '<div style="text-align:center; margin: 0; padding-top:20px; height:40px;">' + refType  + '</div>';
			     }
			}
		}, 
		{'text'  :'Ref No',datafield: 'refNo',width : '4%',cellsalign : 'center', align : 'center', editable : false},
		{'text'  :'Ref Sl No',datafield: 'refSrlNo',width : '4%',cellsalign : 'center', align : 'center', editable : false},
		{'text' : 'V.Code',datafield : 'vendorCode',width : '4%', editable : false,cellsalign : 'center',align:'center'},
		{'text' : 'Art. Code',datafield : 'articleCode',width : '6%',cellsalign : 'center',align:'center', editable : false},  
		{'text' : 'Art. Desc.',datafield : 'articleDescription',width : '10%',editable : false,cellsalign : 'left',align:'center'}, 
		{'text' : 'J.Code',datafield : 'jewelTypeId',width : '4%', editable : false,cellsalign : 'center',align:'center',cellsformat: 'n'},				
		{'text' : 'Pcs',datafield : 'pieces',width : '3%', editable : false,cellsalign : 'center',align:'center',cellsformat: 'n'},
		{'text' : 'Gr.Wt.',datafield : 'grossWt',width : '5%',editable : false,cellsalign : 'right',align:'center',cellsformat:'d3'},
		{'text' : 'Net Wt.',datafield : 'netWt',width : '5%',cellsalign : 'right',align:'center',cellsformat:'d3'},

		{'text' : 'Skin Purity', datafield : 'skinPurity',width : '8%',sortable : false,editable : false,cellsalign : 'center',align:'center',cellsformat:'d2'},
		{'text' : 'Melting Purity', datafield : 'meltingPurity',width : '8%',sortable : false,editable : false,cellsalign : 'center',align:'center',cellsformat:'d2' },
		{'text' : 'Cost Code',datafield : 'costCode',width : '4%',sortable : false,editable : false,cellsalign : 'center',align:'center'},
	    {'text' : 'Cost Wast Wt.','datafield' : 'costWastage',width : '6%',sortable : false,editable : false,cellsformat:'d3',cellsalign : 'right',align:'center'},
		{'text' : 'Cost MC/ Tot. cost',datafield : 'costMCTotalCost',width : '8%',sortable : false,editable : false,cellsformat: 'd2',columntype: 'numberinput',cellsalign : 'right',align:'center'},
		{'text' : 'Sell Wast Wt.',datafield : 'sellingWastage',width : '6%',cellsformat: 'd3',sortable : false,editable : false,cellsalign : 'right',align:'center'},
	    {'text' : 'Sell MC/Tot.cost',datafield : 'sellingMCTotalCost',width : '8%',sortable : false,editable : false,cellsformat: 'd2',columntype: 'numberinput',cellsalign : 'right',align:'center'},
	    {'text' : '',datafield : 'id',width : '3%',sortable : false,editable : false,cellsformat: 'd2',columntype: 'numberinput',cellsalign : 'center',align:'center', cellsrenderer : viewRenumberingGR},
	    {'text' : '',datafield : 'stoneList', hidden: true},
	    {'text' : '',datafield : 'accessoryList', hidden: true}
	];
	
	showMyGrid(datafields,"/OrderExecution/api/v1/renumGrSearch", "renumGrSearch",columns, generateFieldFilters(), updateRows,"");
	
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,                
     	altrows: true,
     	theme: 'darkblue',
     	autorowheight :true,
        autoheight :true,
        columnsheight: 55,
        columnsresize: true,  
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
	});

}

// Check validate before save
//Save Valid check
var isValidAllgrFGDetails = function() {
	var grFGDetails = $("#grDetailsGrid").jqxGrid('getrows');
	console.log(grFGDetails);
	var grDetais = true;
	for(var i=0; i<grFGDetails.length; i++){
		var gWt = grFGDetails[i].grossWt;
		var nWt = grFGDetails[i].netWt;
		if(gWt == nWt && null != gWt && null != nWt){
			grFGDetails[i].isValid = true;
		}
		
		if(grFGDetails[i].isValid == false){
			$.growl.error({ message: "Srl no "+ grFGDetails[i].srl+" is not validated please validate", duration: 10000, title: 'Error' });
			grDetais = false;
			return false;
		}		
		
		
		if(grFGDetails[i].pieces == 0 || grFGDetails[i].pieces == null || grFGDetails[i].pieces == "" || typeof grFGDetails[i].pieces == "undefined"){
			$.growl.error({ message: "Srl no "+ grFGDetails[i].srl+" Pcs should be greater than zero.", duration: 10000, title: 'Error' });
			grDetais = false;
			return false;
		}
		
		if(grFGDetails[i].psr == "N" && (grFGDetails[i].costCode == null || grFGDetails[i].costCode == "")){
			$.growl.error({ message: "Please select Cost Code for IGR Srl no "+ (i+1), duration: 10000, title: 'Error' });
			grDetais = false;
			return false;
		}
		if(grFGDetails[i].storeOrDcN == null || grFGDetails[i].storeOrDcN == " "){
				$.growl.error({
					message : "Please Select Store/DC !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
		}
		if(grFGDetails[i].storeOrDcN != null && grFGDetails[i].storeOrDcN == "DC"){
			if(grFGDetails[i].zoneS == " " || grFGDetails[i].zoneS == null){
				$.growl.error({
					message : "Please Select Zone !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		}
		if(grFGDetails[i].storeOrDcN != null && grFGDetails[i].storeOrDcN == "Store"){
			if(grFGDetails[i].storeN == " " || grFGDetails[i].storeN == null){
				$.growl.error({
					message : "Please Select Store !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		}
		
	}
	
	return grDetais;
}	

var createGRFG = function() {
/*	var grfgHeader = {
		"grdtos" : []
	};*/
	var grDetailsArr= [];
	var rows = $("#grDetailsGrid").jqxGrid('getrows');
	if(typeof rows != "undefined"){
		for(var i=0; i<rows.length; i++){
				grDetailsArr.push(rows[i]);
		}
	}
/*	grfgHeader.grdtos = grDetailsArr;
	grfgHeader.vendorId = $('#vendorCode-value').val();
	grfgHeader.pureRate = $('#pureRate').val();*/
	return grDetailsArr;
}


$("#saveRenumberGRFG").on('click', function(e){
	console.log(JSON.stringify(createGRFG()));
	 $("#loading").show();
	 $("#saveRenumberGRFG").prop('disabled', true);
	 if(isValidAllgrFGDetails()){
	    	var $link = $(e.target);
			  e.preventDefault();
			  if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 500) {
				  postJSON('/OrderExecution/api/v1/saveGRFGRenum', JSON.stringify(createGRFG()), function(data) {
					if(data.resCode == 1 & typeof data != "undefined"){
						$("#saveRenumberGRFG").prop('disabled', true);
						$.growl.notice({ message: data.mesgStr, duration: 10000, title: 'Success' });	
						window.location.href = "javascript:showContentPage('renumberingGRFG', 'bodySwitcher')";
						return true;						
					}else{
						$("#saveRenumberGRFG").prop('disabled', false);
						$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Saving IGR' });
						return false;
					}
				  });
			  }
			  $link.data('lockedAt', +new Date());
			  $("#saveRenumberGRFG").prop('disabled', false);
			  $("#loading").hide();
	 }else{
		$("#loading").hide();
		$("#saveRenumberGRFG").prop('disabled', false);
	}
						
});

var NVL = function(source, replaceMentValue){
	if(typeof source != "undefined" && source != null && source != ""){
		return source;
	}
	else return replaceMentValue;
}

$("#clearGR").on('click', function(){
	redirect();
})
;

//Export Functionality
$("#export").on("click",function() {	
	$('#loading').show();
	var refType = $("#refType").val();
	var refNoS = $('#refNoS').val();
	var igrNo = $('#igrNo').val();
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	
		fieldFilters = {
			"fieldFilters" : {
			    "RefDocType":refType,
				"RefDocNo" : refNoS,
				"IgrNo" : igrNo,
				"FromDate" :fromDate ,
				"ToDate" :toDate,
				"mode" : "excel",
				"reportName" : "RPT_Ren_GR_FG_Export"
			}
		}
		$.ajax({
			url : 'jasperReport',
			type : 'post',
			data : fieldFilters,
			contentType : "application/x-www-form-urlencoded",
			xhrFields : {
				responseType : "blob"
			},
			success : function(data) {
				console.log(data);
				$('#loading').hide();
				if (navigator.msSaveBlob) {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					navigator.msSaveBlob(file,'Renumbering_GR_FG.xlsx');
				}else {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					var fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				}
			}
		});
});

$("#print").on('click',function(){
	var refType = $("#refType").val();
	var refNoS = $('#refNoS').val();
	var igrNo = $('#igrNo').val();
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	
		fieldFilters = {
			"fieldFilters" : {
			    "RefDocType":refType,
				"RefDocNo" : refNoS,
				"IgrNo" : igrNo,
				"FromDate" :fromDate ,
				"ToDate" :toDate,
				"mode" : "pdf",
				"reportName" : "RPT_Ren_GR_FG"
			}
		}
		$.ajax({
			url : 'jasperReport',
			type : 'post',
			data : fieldFilters,
			contentType : "application/x-www-form-urlencoded",
			xhrFields : {
				responseType : "arraybuffer"
			},
			success : function(data) {
				console.log(data);
				if (navigator.msSaveBlob) {
					var file = new Blob([ data ], {
						type : 'application/pdf'
					});
					navigator.msSaveBlob(file, 'RPT_Renumbering_GR_FG.pdf');
				} else {
					var file = new Blob([ data ], {
						type : 'application/pdf'
					});
					var fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				}
			}
		});
})