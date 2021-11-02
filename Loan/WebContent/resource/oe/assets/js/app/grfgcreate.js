/** GR FG create page
 * DATE : 20-02-2018
 * AUTHOR : DIPANKAR
 */

var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
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

//loadPermission();

var populateTestingData = function(response) {
	if(response != null){
		$("#v_is_pair").val((response.v_is_pair == 0)?'False':'True');
		$("#v_metal_value").val(response.v_metal_value);
		$("#v_wastage_charge_type").val(response.v_wastage_charge_type);
		$("#vv_cost_wastage_wt").val(response.vv_cost_wastage_wt);
		$("#v_mc_charge_type").val(response.v_mc_charge_type);
		$("#vv_cost_mc").val(response.vv_cost_mc);
		$("#v_metal_rate_for_purity").val(response.v_metal_rate_for_purity);
		$("#v_incremental_val").val(response.v_incremental_val);
		$("#mup_previous_record").val(response.mup_previous_record);
		$("#mup_current_record").val(response.mup_current_record);
		$("#value_1").val(response.value_1);
		$("#value_2").val(response.value_2);
		$("#value_3").val(response.value_3);
		$("#app_value_1").val(response.app_value_1);
		$("#app_value_2").val(response.app_value_2);
		$("#app_value_markup_1").val(response.app_value_markup_1);
		$("#app_value_markup_2").val(response.app_value_markup_2);
		$("#total_markup_val").val(response.total_markup_val);
		$("#value_4").val(response.value_4);
		$("#v_sell_metal_rate_for_purity").val(response.v_sell_metal_rate_for_purity);
		$("#value_5").val(response.value_5);
		$("#value_6").val(response.value_6);
		$("#v_mc_apportion_percent").val(response.v_mc_apportion_percent);
		$("#v_wastage_apportion_percent").val(response.v_wastage_apportion_percent);
		$("#sellingWastage").val(response.sellingWastage);
		$("#v_selling_price").val(response.v_selling_price);
	}else{	
		$("#testValueForm").trigger('reset');
	}
}


var hallMarkCharges = new Object();
var toleranceLimits = new Object();

$("#contentBar").hide();
//On click on create calling API to load necessary data to GR grids. 
$("#grCreate").on("click",function(){
	$("#createGrFgForm1").hide();
	$("#createGrFgForm").show();
	$("#grHeDrId").hide();
	$("#grHeDrId1").show();
	
	// Load value from search page to create page.
	var vendorCode = $("#vendorCode").val();
	var vendorCodeValue = $("#vendorCode-value").val();
	
	if(typeof mrvNo != "undefined" && typeof mrvSrl != "undefined"){			
		$.getJSON('/OrderExecution/api/v1/createGRLOV?mrvId='+ mrvNo + '&mrvSlNo=' + mrvSrl,function(data) {
			if(1 == data.resCode){			
					psrList = data.payload.psrList;
					segment = data.payload.segment;
					jwType = data.payload.jwType;
					hallMarkCharges = data.payload.hallMarkCharges;
					toleranceLimits = data.payload.grossWtNetWtToleranceLimit;
					
					$("#pureRateFlag").val(data.payload.pureRateFlag);
					(jwType == "C") ? $("#grcPeriod").prop('disabled', false) :	$("#grcPeriod").prop('disabled', true);
					(data.payload.jwType == "C" || data.payload.jwType == "D") ? $("#pureRate").attr('disabled', false) : $("#pureRate").val(data.payload.pureRate);
					(data.payload.jwType == "C") ? $("#grcPeriod").attr('disabled', false) : $("#grcPeriod").attr('disabled', true);						
					(data.payload.pureRateFlag == true) ? $("#pureRate").attr('disabled', true) : $("#pureRate").attr('disabled', false);
											
					$('#jwTypee').val(data.payload.jwType);
					$("#pureRate").val(data.payload.pureRate);
					$("#skinPurityC").val($('#skinPurity').val());
					
					grDetailsList();
					stoneGRGrid();
					accGRGrid();
					
					$("#grDetailsId").show();
					
			 }
		 });
	}			
});

// Master Grid
var articleSearchPopUp = function()  {	
	var rowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#grDetailsGrid").jqxGrid('getrowid', rowindex);
	var row = $("#grDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	if(typeof row != "undefined" || row != null){
		$("#category").hide();
		$("#categoryEdit").show();
		$("#subCategory").hide();
		$("#subCategoryEdit").show();
		
		$("#jewelType").val(row.jwType);
		$("#segment").val(row.segmentId);
		$("#categoryEdit").val(row.mainCategoryName);
		$("#subCategoryEdit").val(row.subCategoryName);
		$("#articleCode").val(row.articleCode);
		$("#articleDesc").val(row.articleDesc);
		$("#hsnMasterId").val(row.hsnMasterId);
		$("#hsnMasterCode").val(row.hsnMasterCode);
		$("#taxStructureId").val(row.hsnMasterCode);
	}
	$("#articleSearch").modal({ remote: "articleSearch?vendorId=" + $('#vendorCode-valueC').val() + "&segId=" + $("#metalSegmentId").val(), target: "articleSearch" });
	return true;
}

$('#articleSearch').on('loaded.bs.modal',function(e) {			
	var segmentId = $("#metalSegmentId").val();						
	if(segmentId.length > 0) {	
		$("#segment").val(segmentId).change();
	}			
});

// On modal close store modal details in grid column.
$('#articleSearch').on('hide.bs.modal', function(e) {	
    var rowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#grDetailsGrid").jqxGrid('getrowid', rowindex);
	var row = $("#grDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	setGRColNull(rowindex, 8);
	if($("#articleCode").val() != "") {
		row['articleCode'] = $("#articleCode").val();		
		row['hsnMasterCode'] = $("#hsnMasterCode").val();		
		row['hsnMasterId'] = $("#hsnMasterId").val();		
		row['articleDesc'] = $("#articleDesc").val();
		row['segmentId'] = $("#segment").val();
		row['segmentCode'] = $("#segment :selected").text();
		row['jwlType'] = $("#jewelType option:selected").attr("CodeJwl");
		row['isPair'] = $("#isPair").val();
		row['taxStructureId'] = $("#taxStructureId").val();
		row['jwType'] = $("#jewelType").val();
		row['mainCategory'] = $("#category").val();
		row['mainCategoryName'] = $("#category option:selected").text();
		row['subCategory'] = $("#subCategory").val();
		row['subCategoryName'] = $("#subCategory option:selected").text();
		row['metalTypeId'] = $("#metalTypeId").val();
		row['storeId'] = $("#storeId").val();
		$('#grDetailsGrid').jqxGrid('updaterow', rowid, row);
	}
	$("#grDetailsGrid").jqxGrid('focus');
});

//Get Article code
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



// Pcs on change validation
var pcsValidate = function(cell, value){
	var isPair =  $('#grDetailsGrid').jqxGrid('getcellvalue', cell.row, 'isPair');
	var orderType =  $('#grDetailsGrid').jqxGrid('getcellvalue', cell.row, 'orderType');
	var orderKind =  $('#grDetailsGrid').jqxGrid('getcellvalue', cell.row, 'orderKind');
	if(value < 0) { return { result: false, message: "Invalid Number" }};
	if(orderType == "ST" && orderKind == "NO"){		
		var pendingPcs = $('#grDetailsGrid').jqxGrid('getcellvalue', cell.row, 'pendingPcs');		
		if(parseInt(value) > parseInt(pendingPcs)){return { result: false, message: "c)	Pcs cannot be more than the ordered pcs in case of Stock Order." }};	
	}
	if(isPair == "true" && value%2 != 0) {            	
    	return { result: false, message: "Enter even number of pieces" };           	
    }
	return true;
}

// Common Validation for grid column
var commonValidate = function(cell, value){
	if(value < 0) { return { result: false, message: "Invalid Number" }};	
	return true;
}

var commonValidateStone = function(cell, value){
	if(value < 0) { return { result: false, message: "Invalid Number" }
	};
	
	var issuedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'issuedWt');
	var isStock = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'isStock');
	var orderKind = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'orderKind');
	var pendingBulkWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'pendingBulkWt');
	var suppliedBy = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'suppliedBy');
	var category = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'category');
	var costRange = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'costRangeN');
	var earlierUsedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'stoneUsedWt');
	var usedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'usedWt');
	var returnedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'returnedWt');
	var stoneHC = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'stoneHC');
	var breakageReceived = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'breakageReceived');
	var breakageNotReceived = $('#stoneDetailsGrid').jqxGrid('getcellvalue', cell.row, 'breakageNotReceived');
	issuedWt = parseFloat(issuedWt).toFixed(3);
	
	if(typeof usedWt == "undefined" || usedWt == null || usedWt == ""){ usedWt = 0;}
	if(typeof returnedWt == "undefined" || returnedWt == null || returnedWt == ""){ returnedWt = 0;}
	if(typeof breakageReceived == "undefined" || breakageReceived == null || breakageReceived == ""){ breakageReceived = 0;}
	if(typeof breakageNotReceived == "undefined" || breakageNotReceived == null || breakageNotReceived == ""){ breakageNotReceived = 0;}
	if(typeof earlierUsedWt == "undefimed" || earlierUsedWt == null || earlierUsedWt == ""){ earlierUsedWt = 0;}
	
	var firstword = category.split(' ')[0];
	if((cell.datafield == "usedWt" || cell.datafield == "bulkWt" || cell.datafield == "returnedWt" || cell.datafield == "breakageReceived" || cell.datafield == "breakageNotReceived") && firstword == "CD" && (suppliedBy == "V" || suppliedBy == "CO")){
		if((costRange == null || costRange == "")){return { result: false, message: "Please select cost range" }}
	}

	if(cell.datafield == "bulkWt" && suppliedBy == "CO"){
		if(NVL(pendingBulkWt,0) < NVL(value,0)){return { result: false, message: "Insufficient Bulk Balance" }}
	}	
	
	if(cell.datafield == "returnedWt" && suppliedBy == "V"  && (orderKind == "SRP" || orderKind == "RE_RWK") && ((parseFloat(value) +  parseFloat(breakageReceived)  + parseFloat(breakageNotReceived)) > parseFloat(earlierUsedWt))){
		return { result: false, message: "Sum of Returned, Break. Rec., Break. No Rec. Wt can not be greater than Earlier Used Wt."}		
	}
	
	if(cell.datafield == "breakageReceived" && suppliedBy == "V"  && (orderKind == "SRP" || orderKind == "RE_RWK") && ((parseFloat(returnedWt) +  parseFloat(value)  + parseFloat(breakageNotReceived)) > parseFloat(earlierUsedWt))){
		return { result: false, message: "Sum of Returned, Break. Rec., Break. No Rec. Wt can not be greater than Earlier Used Wt."}
	}
	
	
	if(cell.datafield == "breakageNotReceived" && suppliedBy == "V"  && (orderKind == "SRP" || orderKind == "RE_RWK") && ((parseFloat(returnedWt) +  parseFloat(breakageReceived)  + parseFloat(value)) > parseFloat(earlierUsedWt))){
		return { result: false, message: "Sum of Returned, Break. Rec., Break. No Rec. Wt can not be greater than Earlier Used Wt."}
	}
	
	
	//data.orderKind == "CRP" || data.orderKind == "CSP" || data.orderKind == "SRP" || data.orderKind == "SSP" || data.orderKind == "RE_RWK"
	// Reworking Scenario we are added this for Used wt Validation
	  if( isStock == "CU" && (orderKind == "NO" || data.orderKind == "CRP" || data.orderKind == "RE_RWK")){
			if(cell.datafield == "usedWt" && suppliedBy != "V" ){
				var total = NVL(value,0) + NVL(returnedWt,0) +NVL(breakageReceived,0)  + NVL(breakageNotReceived,0);
				total = total.toFixed(3);
				if(parseFloat(NVL(issuedWt,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input wt can not be greater than issued wt" }}
			}
			return true
		} 
	  
	if(isStock =="ST" && orderKind == "NO"){
		
		if(cell.datafield == "usedWt" && suppliedBy != "V" ){
			var total = NVL(value,0) + NVL(returnedWt,0) +NVL(breakageReceived,0)  + NVL(breakageNotReceived,0);
			total = total.toFixed(3);
			if(parseFloat(NVL(issuedWt,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input wt can not be greater than issued wt" }}			
		}
		return true
	} 
	if(isStock == "ST" && orderKind == "NO"){
		if(cell.datafield == "returnedWt" && suppliedBy != "V" ){
			var total = parseFloat(NVL(value,0)) + parseFloat(NVL(usedWt,0)) + parseFloat(NVL(breakageReceived,0))  + parseFloat(NVL(breakageNotReceived,0));
			total = total.toFixed(3);
			if(parseFloat(NVL(issuedWt,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input wt can not be greater than issued wt" }}
		}
		if(cell.datafield == "breakageReceived" &&  suppliedBy != "V" ){
			var total = parseFloat(NVL(value,0)) + parseFloat(NVL(returnedWt,0)) + parseFloat(NVL(usedWt,0))  + parseFloat(NVL(breakageNotReceived,0));
			total = total.toFixed(3);
			if(parseFloat(NVL(issuedWt,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input wt can not be greater than issued wt" }}
		}
		if(cell.datafield == "breakageNotReceived"  && suppliedBy != "V"){
			var total = parseFloat(NVL(value,0)) + parseFloat(NVL(returnedWt,0)) + parseFloat(NVL(breakageReceived,0))  + parseFloat(NVL(usedWt,0));
			total = total.toFixed(3);
			if(parseFloat(NVL(issuedWt,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input wt can not be greater than issued wt" }}
		}
	}
	return true;
}

var commonValidateAcc = function(cell, value){
	
	if(value < 0) { return { result: false, message: "Invalid Number" }};
	var issuedWt = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'issuedWt');
	var issuedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'issuedPcs');
	var usedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'usedPcs');
	var suppliedBy = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'suppliedBy');
	
	var isStock = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'isStock');
	var orderKind = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'orderKind');
	
	
	 if( isStock == "CU" && (orderKind == "NO" || data.orderKind == "CRP" || data.orderKind == "RE_RWK")){
			if(cell.datafield == "usedWt" && suppliedBy != "V" ){
				var total = NVL(value,0) + NVL(returnedWt,0) +NVL(breakageReceived,0)  + NVL(breakageNotReceived,0);
				total = total.toFixed(3);
				if(parseFloat(NVL(issuedWt,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input wt can not be greater than issued wt" }}
			}
			
			if(cell.datafield == "usedPcs" && suppliedBy != "V" ){
				//alert(suppliedBy)
				//var total = NVL(value,0) + NVL(returnedWt,0) +NVL(breakageReceived,0)  + NVL(breakageNotReceived,0);
				var total = NVL(value,0);
				total = total.toFixed(3);
				if(parseFloat(NVL(issuedPcs,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input Pcs can not be greater than issued Pcs" }}
			}
			
			return true
		}
	
	
	if(isStock == "" || isStock == null && orderKind == "NO"){
		var usedWt = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'usedWt');
		var returnedWt = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'returnedWt');
		var breakageReceived = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'breakageReceived');
		var breakageNotReceived = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'breakageNotReceived');
		
		var usedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'usedPcs');
		var returnedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'returnedPcs');
		var breakageReceivedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'breakageReceivedPcs');
		var breakageNotReceivedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'breakageNotReceivedPcs');
		
		var suppliedBy = $('#accDetailsGrid').jqxGrid('getcellvalue', cell.row, 'suppliedBy');
		var earlierAccUsedWt = $("#accDetailsGrid").jqxGrid('getcellvalue', cell.row, 'accUsedWt');
		var earlierAccUsedPcs = $("#accDetailsGrid").jqxGrid('getcellvalue', cell.row, 'accUsedPcs');
		
		if(typeof usedWt == "undefined" || usedWt == null || usedWt == ""){ usedWt = 0;}
		if(typeof returnedWt == "undefined" || returnedWt == null || returnedWt == ""){ returnedWt = 0;}
		if(typeof breakageReceived == "undefined" || breakageReceived == null || breakageReceived == ""){ breakageReceived = 0;}
		if(typeof breakageNotReceived == "undefined" || breakageNotReceived == null || breakageNotReceived == ""){ breakageNotReceived = 0;}
		if(typeof earlierAccUsedWt == "undefined" || earlierAccUsedWt == null || earlierAccUsedWt == ""){ earlierAccUsedWt = 0;}
		
		if(cell.datafield == "accRateEdited" && suppliedBy == "V" && (value == null || value == "" || typeof value == "undefined")){
			return { result: false, message: "Please enter value greater than zero."}
		}
		 
		if(cell.datafield == "returnedWt" && suppliedBy == "V"  && (orderKind == "SRP" || orderKind == "RE_RWK") && ((parseFloat(value) +  parseFloat(breakageReceived)  + parseFloat(breakageNotReceived)) > parseFloat(earlierAccUsedWt))){
			return { result: false, message: "Sum of Returned, Break. Rec., Break. No Rec. Wt can not be greater than Earlier Used Wt."}
		}
		
		if(cell.datafield == "breakageReceived" && suppliedBy == "V"  && (orderKind == "SRP" || orderKind == "RE_RWK") && ((parseFloat(returnedWt) +  parseFloat(value)  + parseFloat(breakageNotReceived)) > parseFloat(earlierAccUsedWt))){
			return { result: false, message: "Sum of Returned, Break. Rec., Break. No Rec. Wt can not be greater than Earlier Used Wt."}
		}
		
		if(cell.datafield == "breakageNotReceived" && suppliedBy == "V"  && (orderKind == "SRP" || orderKind == "RE_RWK") && ((parseFloat(returnedWt) +  parseFloat(breakageReceived)  + parseFloat(value)) > parseFloat(earlierAccUsedWt))){
			return { result: false, message: "Sum of Returned, Break. Rec., Break. No Rec. Wt can not be greater than Earlier Used Wt."}
		}
		
		// Pcs 
		if(cell.datafield == "returnedPcs" && suppliedBy == "V"  && (orderKind == "SRP" || orderKind == "RE_RWK") && ((value +  breakageReceivedPcs  + breakageNotReceivedPcs) > earlierAccUsedPcs)){
			return { result: false, message: "Sum of Returned, Break. Rec., Break. No Rec. pcs can not be greater than Earlier Used Pcs."}
		}
		
		if(cell.datafield == "breakageReceivedPcs" && suppliedBy == "V"  && (orderKind == "SRP" || orderKind == "RE_RWK") && ((returnedPcs +  value  + breakageNotReceivedPcs) > earlierAccUsedPcs)){
			return { result: false, message: "Sum of Returned, Break. Rec., Break. No Rec. pcs can not be greater than Earlier Used pcs."}
		}
		
		if(cell.datafield == "breakageNotReceivedPcs" && suppliedBy == "V"  && (orderKind == "SRP" || orderKind == "RE_RWK") && ((returnedPcs +  breakageReceivedPcs  + value) > earlierAccUsedPcs)){
			return { result: false, message: "Sum of Returned, Break. Rec., Break. No Rec. pcs can not be greater than Earlier Used pcs."}
		}
		
		if(cell.datafield == "usedWt" && suppliedBy != "V"){
			var total = NVL(value,0) + NVL(returnedWt,0) +NVL(breakageReceived,0)  + NVL(breakageNotReceived,0);
			total = total.toFixed(3);
			if(parseFloat(NVL(issuedWt,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input wt can not be greater than issued wt" }}
		}
		if(cell.datafield == "returnedWt" && suppliedBy != "V" ){
			var total = NVL(value,0) + NVL(usedWt,0) +NVL(breakageReceived,0)  + NVL(breakageNotReceived,0);
			total = total.toFixed(3);
			if(parseFloat(NVL(issuedWt,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input wt can not be greater than issued wt" }}
		}
		if(cell.datafield == "breakageReceived"  && suppliedBy != "V" ){
			var total = NVL(value,0) + NVL(returnedWt,0) +NVL(usedWt,0)  + NVL(breakageNotReceived,0);
			total = total.toFixed(3);
			if(parseFloat(NVL(issuedWt,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input wt can not be greater than issued wt" }}
		}
		if(cell.datafield == "breakageNotReceived"  && suppliedBy != "V"){
			var total = NVL(value,0) + NVL(returnedWt,0) +NVL(breakageReceived,0)  + NVL(usedWt,0);
			total = total.toFixed(3);
			if(parseFloat(NVL(issuedWt,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input wt can not be greater than issued wt" }}
		}
		// Pcs validation check
		if(cell.datafield == "usedPcs" && suppliedBy != "V"){
			var total = NVL(value,0) + NVL(returnedPcs,0) +NVL(breakageReceivedPcs,0)  + NVL(breakageNotReceivedPcs,0);
			total = total.toFixed(3);
			if(parseFloat(NVL(issuedPcs,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input pcs can not be greater than issued pcs" }}
		}
		if(cell.datafield == "returnedPcs" && suppliedBy != "V" ){
			var total = NVL(value,0) + NVL(usedPcs,0) +NVL(breakageReceivedPcs,0)  + NVL(breakageNotReceivedPcs,0);
			total = total.toFixed(3);
			if(parseFloat(NVL(issuedPcs,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input pcs can not be greater than issued pcs" }}
		}
		if(cell.datafield == "breakageReceivedPcs"  && suppliedBy != "V" ){
			var total = NVL(value,0) + NVL(returnedPcs,0) +NVL(usedPcs,0)  + NVL(breakageNotReceivedPcs,0);
			total = total.toFixed(3);
			if(parseFloat(NVL(issuedPcs,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input pcs can not be greater than issued pcs" }}
		}
		if(cell.datafield == "breakageNotReceivedPcs"  && suppliedBy != "V"){
			var total = NVL(value,0) + NVL(returnedPcs,0) +NVL(breakageReceivedPcs,0)  + NVL(usedPcs,0);
			total = total.toFixed(3);
			if(parseFloat(NVL(issuedPcs,0)) < parseFloat(NVL(total,0))){	return { result: false, message: "Total input pcs can not be greater than issued pcs" }}
		}
	}
	return true;
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
var removeSC = function(value){
	if(value != null && value != ""){
		return value;
	}else{
		return value;
	}
	
	
}
// Update attribute modal to view already added value.
var updateModalAttr = function(row){
	var rowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#grDetailsGrid").jqxGrid('getrowid', rowindex);
	var row = $("#grDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	$("#vendorArticle").val(row.vendorArticle);
	$("#length option[value='"+removeSC(row.attrLength)+"']").attr("selected","selected");
	$("#size option[value='"+removeSC(row.size)+"']").attr("selected","selected");
	$("#height option[value='"+removeSC(row.height)+"']").attr("selected","selected");
	$("#diameter option[value='"+removeSC(row.diameter)+"']").attr("selected","selected");
	$("#width option[value='"+row.width+"']").attr("selected","selected");
	$("#combination option[value='"+row.stoneCombId+"']").attr("selected","selected");
	
	$("#metalColor option[value='"+row.metalColor+"']").attr("selected","selected");
	$("#settingType option[value='"+row.settingType+"']").attr("selected","selected");
	$("#hookType option[value='"+row.hookType+"']").attr("selected","selected");
	
	$("#screwType option[value='"+row.screwType+"']").attr("selected","selected");
	$("#loopType option[value='"+row.loopType+"']").attr("selected","selected");
	$("#polishType option[value='"+row.polishType+"']").attr("selected","selected");
	$("#settingType option[value='"+row.settingType+"']").attr("selected","selected");
	$("#collectionName option[value='"+row.collectionName+"']").attr("selected","selected");
	$("#isDueDtFlag option[value='"+row.isDueDtFlag+"']").attr("selected","selected");
	
	
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
		var url = "/OrderExecution/api/v1/attributeSearchGr?article=" + articleCode;
		  $("#attributeSearch").find('.modal-content').load(url,function(result){
				$("#attributeSearch").modal({show:true,  target: "attributeSearch"});
				populateAttributePopUp(
						row['attrLength'], row['size'], row['height'],row['diameter'], row['width'], row['metalColor'],row['hookType'], row['screwType'], row['loopType'],
						row['polishType'], row['settingType'],row['vendorArticle'], $.trim(row['combinationId']),	row['collectionName'],row['reason'],row['isDueDtFlag']
					);
			});
	
	}
	
	if(articleCode == null) {
		$.growl.error({ message: "Article Code is mandatory to set the attributes!", duration: 5000, title: 'Error' });
		return false;
	}
	
	if(globalAttrFlag == null){
		var url = "/OrderExecution/api/v1/attributeSearchGr?article=" + articleCode;
		  $('#attributeSearch').find('.modal-content').load(url,function(result){
				$("#attributeSearch").modal({show:true,  target: "attributeSearch"});
				populateAttributePopUp(
						row['attrLength'], row['size'], row['height'],row['diameter'], row['width'], row['metalColor'],row['hookType'], row['screwType'], row['loopType'],
						row['polishType'], row['settingType'],row['vendorArticle'], $.trim(row['combinationId']),	row['collectionName'],row['reason'],row['isDueDtFlag']
					);
			});
		  
		
		$('#grDetailsGrid').jqxGrid('setcellvalue', row, 'globalAttrFlag', 1);
	}
	if(globalAttrFlag == 1){
		$("#attributeSearch").modal({ remote: "/OrderExecution/api/v1/attributeSearchGr?article=" + articleCode, target: "attributeSearch" });
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
			row['attrLength'] = $("#length").val();
		}
		if($("#size").val() != "") {
			row['size'] = $("#size").val();
		}	
		if($("#height").val() != "") {
			row['height'] = $("#height").val();
		}
		if($("#diameter").val() != "") {
			row['diameter'] = $("#diameter").val();
		}
		if($("#width").val() != "") {
			row['width'] = $("#width").val();
		}
		if($("#vendorArticle").val() != "") {
			row['vendorArticle'] = $("#vendorArticle").val();
		}
		if($("#combination").val() != "") {
			row['combinationId'] = $("#combination").val();
		}
		if($("#metalColor").val() != "") {
			row['metalColor'] = $("#metalColor").val();
		}
		if($("#hookType").val() != "") {
			row['hookType'] = $("#hookType").val();
		}
		if($("#screwType").val() != "") {
			row['screwType'] = $("#screwType").val();
		}
		if($("#loopType").val() != "") {
			row['loopType'] = $("#loopType").val();
		}
		if($("#polishType").val() != "") {
			row['polishType'] = $("#polishType").val();
		}
		if($("#settingType").val() != "") {
			row['settingType'] = $("#settingType").val();
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

$("#clearAS").on('click', function(){
	$('#attributeSearch').modal('hide');
	return false;
});

// set GR next column
var setGRColNull = function(row, level){
	
	var costCode = $("#grDetailsGrid").jqxGrid('getcellvalue', row, "costCode");
	(level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "netWt", null) : "";
	if(costCode != "R") { (level == 6 || level == 7 || level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costCode", null): "";}
	if(costCode != "R") { (level == 6 || level == 7 || level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costCodes", null): "";}
	(level == 6 || level == 7 || level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costWastageWT", 0.00): "";
	(level == 6 || level == 7 || level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costMC", 0.00): "";
	(level == 6 || level == 7 || level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "sellWastageWt", 0.00): "";
	(level == 6 || level == 7 || level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "sellMC", 0.00): "";	
	(level == 8) ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "attributes", "False"): "";	
	$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid", false);	
}

// checking for each row validation.
var checkValidateRow = function(row){
	var grossWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'grossWt');
	var netWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'netWt');

	if(parseFloat(grossWt) == parseFloat(netWt)){
		$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid", true);
	}else{
		$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid", false);
	}
}

var pcsNotMorePending = function(row, newvalue){
	var masterRows = $("#grDetailsGrid").jqxGrid('getrows');	
	var orderType = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'orderType');
	var orderKind = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'orderKind');
	var psr = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'psr');
	var pcs = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'pcs');
	
	debugger;
	if(orderType == "ST" && orderKind == "NO"){
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
}

// On change of GR grWt.
var updateOnchangesGrossWt = function(row, datafield, columntype, oldvalue, newvalue, event){
	setGRColNull(row, 6);
	pcsNotMorePending(row);
}

//On change of GR netWt.
var updateOnchangesNetWt = function(row, datafield, columntype, oldvalue, newvalue, event){
	setGRColNull(row, 7);	
}

var costCodeMandatoryValidation = function(row, netwt) {
	
	var articleCode = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'articleCode');	
	var gWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'grossWt');
	var pcs = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'pcs');
	
	if(null == articleCode || (null !=articleCode && articleCode.length == 0)){	return { result: false, message: "Article code is mandatory" }};	
	if(null  == gWt || (null != gWt && gWt.length  == 0)){return { result: false, message: "Gross Weight is mandatory." }};	
	if(null  == netwt || (null != netwt && netwt.length  == 0)){return { result: false, message: "Net Weight code is mandatory." }};	
	if(null  == pcs || (null != pcs && pcs.length  == 0)){return { result: false, message: "Pcs is mandatory." }};	
	return true;
}


var updateProvFlag = function(row){
	var actcostMCValue = $("#grDetailsGrid").jqxGrid('getcellvalue', row, "actcostMC");
	var costMCValue = $("#grDetailsGrid").jqxGrid('getcellvalue', row, "costMC");
	
	var actcostWastageWtValue = $("#grDetailsGrid").jqxGrid('getcellvalue', row, "actcostWastageWt");
	var costWastageWTValue = $("#grDetailsGrid").jqxGrid('getcellvalue', row, "costWastageWT");
	
	
	if((actcostMCValue == costMCValue) && (actcostWastageWtValue == costWastageWTValue)){			    				
		$("#grDetailsGrid").jqxGrid('setcellvalue', row, "provisional", false);
	}else{
		$("#grDetailsGrid").jqxGrid('setcellvalue', row, "provisional", true);
	}
}
var costWstWt;
// update gr cost code
var updateGrCostCode = function(row, netWt, costCode, costWastageWT, costMC, datafield, isEditedSellWastageWT, sellingWastageWt ){
	postJSON('/OrderExecution/api/v1/grCostCode', JSON.stringify(grCostFilterValues(row, netWt, costCode, costWastageWT, costMC, isEditedSellWastageWT, sellingWastageWt)), function(data) {
		if(1 == data.resCode){
			populateTestingData(data.payload.dataList);
			var pureRateFlag = $("#pureRateFlag").val();
			if(pureRateFlag == false || pureRateFlag == "false"){
				$("#pureRate").prop('disabled', true);
			}
			(costWastageWT == 0) ? costWstWt  = data.payload.costWastageWt :  costWstWt = costWastageWT;
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "costMC", data.payload.costMc);
			(datafield == "costCode") ? $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costWastageWT", costWstWt) : $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costWastageWT", costWastageWT);
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "sellMC", data.payload.sellingMc);
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "sellWastageWt", data.payload.sellingWastageWt);
			
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "metalValue", data.payload.v_metal_value);
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "wastageValue", data.payload.costWastage); 
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "selling_price", data.payload.v_selling_price);				
			
			if(costCode == "M"  && costWastageWT == 0 &&  costMC == 0) { $("#grDetailsGrid").jqxGrid('setcellvalue', row, "apportionSellingMc", (data.payload.sellingMc < 0) ? 0 : data.payload.sellingMc);}
			if(costCode == "M"  && costWastageWT == 0 &&  costMC == 0) {$("#grDetailsGrid").jqxGrid('setcellvalue', row, "apportionsellingWastageWt",( data.payload.sellingWastageWt < 0 ) ? 0 : data.payload.sellingWastageWt);}
			if(costCode == "M"  && costWastageWT == 0 &&  costMC == 0) {$("#grDetailsGrid").jqxGrid('setcellvalue', row, "actcostMC", (data.payload.costMc < 0) ? 0 : data.payload.costMc); }							
			if(costCode == "M"  && costWastageWT == 0 &&  costMC == 0) {$("#grDetailsGrid").jqxGrid('setcellvalue', row, "actcostWastageWt", (data.payload.costWastageWt < 0) ? 0 : data.payload.costWastageWt);}
			if(costCode == "M"  && costWastageWT == 0 &&  costMC == 0) {$("#grDetailsGrid").jqxGrid('setcellvalue', row, "actsellMC", (data.payload.sellingMc < 0) ? 0 : data.payload.sellingMc);}
			if(costCode == "M"  && costWastageWT == 0 &&  costMC == 0) {$("#grDetailsGrid").jqxGrid('setcellvalue', row, "actsellWastageWt", (data.payload.sellingWastageWt < 0)? 0 : data.payload.sellingWastageWt);}
			if(costCode == "M"){updateProvFlag(row);}
		}else{
			populateTestingData(null);
			 $.growl.error({ message:data.mesgStr , duration: 10000, title: 'Error' });
		}
	});
}

// On change of cost code.
var updateOnchangesCostCode = function(row, datafield, columntype, oldvalue, newvalue, event){
	
	if(datafield == "costCode") { $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costMC", 0)}
	if(datafield == "costCode") { $("#grDetailsGrid").jqxGrid('setcellvalue', row, "sellWastageWt", 0)}
	if(datafield == "costCode") { $("#grDetailsGrid").jqxGrid('setcellvalue', row, "sellMC", 0)}
	if(datafield == "costCode") { $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costCode", newvalue.value)};
	if(datafield == "costCode" &&  newvalue.value != "M"){ $("#grDetailsGrid").jqxGrid('setcellvalue', row, "costWastageWT", 0)}
	
	var netWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'netWt');
	var costMC = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costMC');
	var costCode = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costCode');
	var costWastageWT = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costWastageWT');
	var costMC = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costMC');
	
	var grossWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'grossWt');
	var sellWastageWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'sellWastageWt');
	var awCount = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'awCount');
	
	//checkValidateRow(row);
	
	if(newvalue == 0 && datafield == "costWastageWT" && costCode == "M"){$("#grDetailsGrid").jqxGrid('setcellvalue', row, "provisional", false);}
	
	if((datafield == "costCode") && newvalue.value == "M" && costCodeMandatoryValidation(row, netWt)){	
		if(awCount > 0 && newvalue.value == "T"){
			$.growl.error({	message : "Please select either 'R' or 'M" , duration : 10000,title : 'Error'});
			return false;
		}
		updateGrCostCode(row, netWt, costCode, 0 , 0, datafield, 0, sellWastageWt);
	}
	var actcostWastageWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actcostWastageWt');
	var actcostMC = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actcostMC');
	
	if((datafield == "costWastageWT") && costCode == "M" && costCodeMandatoryValidation(row, netWt)) {
		if(newvalue > actcostWastageWt){$("#grDetailsGrid").jqxGrid('setcellvalue', row, "provisional", true);}
			
		var setSellingPrice  = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'setSellingPrice');
		var costWastageWT = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costWastageWT');
		if(costWastageWT == 0 && newvalue > costWastageWT && setSellingPrice == false){
			$("#grDetailsGrid").jqxGrid('setcellvalue', row, "provisional", false);
			$.growl.error({	message : "Please use set selling price to change cost Wastage/MC.",	duration : 10000,title : 'Error'});
			return false;
		}
		var valueMC = costMC; 
		
		updateGrCostCode(row, netWt, costCode,newvalue, valueMC, datafield, 0, sellWastageWt);
	}
	
	if((datafield == "costMC" ) && costCodeMandatoryValidation(row, netWt)) {
		var setSellingPrice  = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'setSellingPrice');
		var costMC = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costMC');
		if(costMC == 0 && newvalue > costMC && setSellingPrice == false && costCode == "M"){
			$.growl.error({	message : "Please use set selling price to change cost Wastage/MC.",	duration : 10000,title : 'Error'});
			return false;
		}
		var valueMC = newvalue;  
		var valueWastage = costWastageWT;
		updateGrCostCode(row, netWt, costCode,valueWastage, valueMC, datafield, 0, sellWastageWt);	
	}
	
	if((datafield == "sellWastageWt" ) && costCodeMandatoryValidation(row, netWt)) {
		if(parseFloat(newvalue) != parseFloat(oldvalue)){
			var valueMC = costMC; 
			var valueWastage = costWastageWT;
			updateGrCostCode(row, netWt, costCode,valueWastage, valueMC, datafield, 1, newvalue);	
		}
	}
	
	if((costCode == "R" || costCode == "T") &&  costCodeMandatoryValidation(row, netWt)){
		if(datafield == "costWastageWT") {
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

// Load drop down value for cost code column.
var loadDropDownCostCode = function(row, cellvalue, editor){
	var awCount = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'awCount');
	if(awCount > 0){
		editor.jqxDropDownList({
			source : vendorCostAwCountDataAdapter, displayMember : 'name', valueMember : 'id'
		});
	}else{
		editor.jqxDropDownList({
			source : vendorCostDataAdapter, displayMember : 'name', valueMember : 'id'
		});
	}
	
}

var grFilterValues = function(psrNo, grSrl) {

	fieldFilters = {"fieldFilters" : {}};
	var vendorCode = $('#vendorCode-value').val();	
	fieldFilters.fieldFilters["vendorCode"] = vendorCode;
	fieldFilters.fieldFilters["psrNo"] = psrNo;	
	fieldFilters.fieldFilters["grSrl"] = grSrl;
	fieldFilters.fieldFilters["skinPurity"] = $("#skinPurityC").val();
	fieldFilters.fieldFilters["mrvNo"] = $("#mrvIdC").val();
	fieldFilters.fieldFilters["mrvSlNo"] = $("#mrvSrlNo").val();
	return fieldFilters;
}
//  && orderKind != 'ST'
/*var materialTypePSR = function(value){
	
	var mrvRows = $("#grDetailsGrid").jqxGrid('getrows');
	var validation = false;
	var psrArray = [];
	if(value == "N"){
		validation = false;
	}else{
		if(mrvRows.length > 1){
			for(var i = 0; i< mrvRows.length; i++){		
				 var name = mrvRows[i];
				 if(name.orderType == "ST" && name.orderKind == "NO"){					 
					 psrArray.push(name.psr);
				 }  
			}
			
		}
	}
	
	console.log(psrArray);
	if(psrArray.length == 0){
		validation = true;
	}else{
		validation = false;
	}
	return validation;
	
}*/

var materialTypePSR = function(value, orderType, orderKind){
	
	var mrvRows = $("#grDetailsGrid").jqxGrid('getrows');
	var validation = false;
	var psrArray = [];

	if(typeof mrvRows  != "undefined"){
		for(var i = 0; i< mrvRows.length-1; i++){
			if(mrvRows[i].psr == value){
				
				if(orderType == "ST" &&  orderKind == "NO"){
					validation = false;
					
				 }else{
					 validation = true;
				 }
			}
		}
	
	}
	return validation;
	
}

var updateGrDetailsGridCol = function(row,col, level){
	var rowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#grDetailsGrid").jqxGrid('getrowid', rowindex);
	var row = $("#grDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	if(col.orderKind == "CSP" || col.orderKind == "SSP"){
		row['isValid'] = true;
	}else{
		if(col.orderKind == "CRP" || col.orderKind == "SRP" || col.isRwk == true){
			row['hallMarkCharges'] = 0.00;
		}else if(col.orderKind == "RE_RWK"){
			row['costMC'] = 0.00;
			row['hallMarkCharges'] = 0.00;
		}else{
			if(col.articlePairFlag == true){
				row['hallMarkCharges'] = ((col.pcs/2) * parseFloat(hallMarkCharges[col.segmentCode.toUpperCase()]));
			}else{
				row['hallMarkCharges'] = (col.pcs * parseFloat(hallMarkCharges[col.segmentCode.toUpperCase()]));
			}
		}
	}
	//if(level ==1){row['psr'] = col.psr;}
	//if(level ==1){row['psrNos'] = col.psr;}
	if(level ==1){row['isRwk'] = col.isRwk;}
	if(level ==1){row['isDueDtFlag'] = col.isDueDtFlag;}
	if(level ==1){row['articleCode'] = col.articleCode;}
	if(level ==1){row['articleDesc'] = col.articleDesc;}
	if(level ==1){row['isPair'] = col.isPair;}
	if(level ==1){row['segmentId'] = col.segmentId;}
	if(level ==1){row['segmentCode'] = col.segmentCode;}
	if(level ==1){row['pcs'] = col.pcs;}
	if(level ==1){row['globalAttrFlag'] = null;}
	if(level ==1){row['pendingPcs'] = col.pendingPcs;}
	if(level ==1){row['viewDesign'] = col.viewDesign;}
	if(level ==1){row['attrLength'] = col.attrLength;}
	if(level ==1){row['size'] = col.size;}
	if(level ==1){row['height'] = col.height;}
	if(level ==1){row['diameter'] = col.diameter;}
	if(level ==1){row['width'] = col.width;}
	
	if(level ==1){row['vendorArticle'] = col.vendorArticle;}
	if(level ==1){row['combinationId'] = col.combinationId;}
	if(level ==1){row['metalColor'] = col.metalColor;}
	if(level ==1){row['hookType'] = col.hookType;}
	if(level ==1){row['screwType'] = col.screwType;}
	if(level ==1){row['loopType'] = col.loopType;}
	if(level ==1){row['polishType'] = col.polishType;}
	if(level ==1){row['settingType'] = col.settingType;}
	if(level ==1){row['collectionName'] = col.collectionName;}
	if(level ==1){row['orderKind'] = col.orderKind;}
	if(level ==1){row['awCount'] = col.awCount;}
	if(level ==1){row['countStone'] = (col.stoneList == null) ? 0 : col.stoneList.length;}
	if(level ==1){row['countAcc'] = (col.accessoryList == null) ? 0 : col.accessoryList.length;}
	row['settingType'] = col.settingType;
	

	if(level ==1 && (col.orderKind == "SRP" || col.orderKind == "CRP" || col.orderKind == "RE_RWK" || col.isRwk == true)){row['costCode'] = "R"; }
	if(level ==1 && (col.orderKind == "SRP" || col.orderKind == "CRP" || col.orderKind == "RE_RWK" || col.isRwk == true)){row['costCodes'] = "Repair";}
	
	if(level ==1 && (col.orderKind == "CSP" || col.orderKind == "SSP")){row['costCode'] = null; }
	if(level ==1 && (col.orderKind == "CSP" || col.orderKind == "SSP")){row['costCodes'] = null; }
	
	
	if(level ==1 && (col.orderKind == "CSP" || col.orderKind == "SSP")){row['grossWt'] = col.grossWt; }
	if(level ==1 && (col.orderKind == "CSP" || col.orderKind == "SSP")){row['netWt'] = col.netWt;}
	
	if(level ==1){row['orderType'] = col.orderType;}
	if(level ==1){row['jwlType'] = col.jwTypeDesc;}
	if(level ==1){row['jwType'] = col.jwType;}
	if(level ==1){row['metalTypeId'] = col.metalTypeId;}
	if(level ==1){row['storeId'] = col.storeId;}
	if(level ==1){row['hsnMasterId'] = col.hsnMasterId;}
	if(level ==1){row['apportionSellingMc'] = null;}
	if(level ==1){row['apportionsellingWastageWt'] = null;}
	if(level ==1){row['hsnMasterCode'] = col.hsnMasterCode;}
	if(level ==1){(col.isDueDtFlag == true || col.isDueDtFlag == "true") ? row["attributes"] ="False" : row["attributes"] ="True";}
	if(level ==1){ row['viewDesign'] = col.viewDesign;};
	
	$('#grDetailsGrid').jqxGrid('updaterow', rowid, row);
	$("#grDetailsGrid").jqxGrid('focus');
	
}

var updateStonePcs = function(row,psr,psrDetails){
	var stoneRow = $("#stoneDetailsGrid").jqxGrid('getrows');
	var usedWtLast = [];

	if(typeof stoneRow != "undefined"){
		var stoneList =  psrDetails.stoneList;
			var count = stoneList.length;
			
			for(k = 0; k< count ; k++){
				var index = k +1;
				var issuedWt = 0;
				var issuedPcs = 0;
				var useWt = 0;
				var isswt = 0;
				var remWt = 0;
				var remPcs = 0;
				var usePcs = 0;
				
				for(var j=0; j<stoneRow.length; j++){
					if(stoneRow[j].suppliedBy != "V"){
						var stonesrlNo  = $('#stoneDetailsGrid').jqxGrid('getcellvalue', j, 'stoneSlNo');
						var isPsrN = $('#stoneDetailsGrid').jqxGrid('getcellvalue', j, 'isPsr');
						
						if((isPsrN == psr) && (stonesrlNo == index)){
							useWt = stoneRow[j].usedWt + stoneRow[j].returnedWt + stoneRow[j].breakageReceived + stoneRow[j].breakageNotReceived;
							issuedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', j, 'issuedWt');	
							remWt = parseFloat(issuedWt)-parseFloat(useWt);
							
							usePcs = stoneRow[j].usedPcs + stoneRow[j].returnedPcs + stoneRow[j].breakageReceivedPcs + stoneRow[j].breakageNotReceivedPcs;
							issuedPcs = $('#stoneDetailsGrid').jqxGrid('getcellvalue', j, 'issuedPcs');	
							remPcs  = parseInt(issuedPcs)-parseInt(usePcs)
							if(remWt < 0){
								$.growl.error({ message:"Issued Wt not available for stone." , duration: 10000, title: 'Error' });
								return false;
							}
						}
						
						usedWtLast[index-1] =  {"issuedWt" : remWt,"issuedPcs" : remPcs};
						
					}	
				}
				
			}
		}
	return usedWtLast;
}

var updateAccPcs = function(row,psr,psrDetails){
	var accRow = $("#accDetailsGrid").jqxGrid('getrows');
	var usedAccWtLast = [];
	if(typeof accRow != "undefined"){
		var accList =  psrDetails.accessoryList;
			var count = accList.length;
			
			for(k = 0; k< count ; k++){
				var index = k +1;
				var issuedWt = 0;
				var issuedPcs = 0;
				var useWt = 0;
				var isswt = 0;
				var remWt = 0;
				var remPcs = 0;
				var usePcs = 0;
				
				for(var j=0; j<accRow.length; j++){
					if(accRow[j].suppliedBy != "V"){
						var accSrlNo  = $('#accDetailsGrid').jqxGrid('getcellvalue', j, 'accSrNo');
						var isPsrN = $('#accDetailsGrid').jqxGrid('getcellvalue', j, 'isPsr');
						
						if((isPsrN == psr) && (accSrlNo == index)){
							useWt = accRow[j].usedWt + accRow[j].returnedWt + accRow[j].breakageReceived + accRow[j].breakageNotReceived;
							issuedWt = $('#accDetailsGrid').jqxGrid('getcellvalue', j, 'issuedWt');		
							remWt = parseFloat(issuedWt)-parseFloat(useWt);
							
							usePcs = accRow[j].usedPcs + accRow[j].returnedPcs + accRow[j].breakageReceivedPcs + accRow[j].breakageNotReceivedPcs;
							issuedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', j, 'issuedPcs');	
							remPcs  = parseInt(issuedPcs)-parseInt(usePcs);
							if(remWt < 0){
								$.growl.error({ message:"Issued Wt not available for accessory." , duration: 10000, title: 'Error' });
								return false;
							}
						}
						
						usedAccWtLast[index-1] =  {"issuedWt" : remWt,"issuedPcs" : remPcs};
					}	
					
				}
				
			}
		}
	return usedAccWtLast;
}




// PSR on change set value to grid
var psrOnChange = function(row, datafield, columntype, oldvalue, newvalue, event){
	//setGRColNull(row, 8);
	var selectedrowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var check =  $('#grDetailsGrid').jqxGrid('getcellvalue', selectedrowindex, 'articleCode');
	var grossWt =  $('#grDetailsGrid').jqxGrid('getcellvalue', selectedrowindex, 'grossWt');
	var orderKind = $('#grDetailsGrid').jqxGrid('getcellvalue', selectedrowindex, 'orderKind');
	var orderType =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'orderType');
	if(check != null){
		$.growl.error({ message: "Please delete the line item to add new PSR details.", duration: 10000, title: 'Error' });
    	return false;
	}
	
	if((orderKind == "CSP" || orderKind == "SSP") && (grossWt != null || grossWt != "")){
		$.growl.error({ message: "Please delete the line item to add new PSR details.", duration: 10000, title: 'Error' });
    	return false;
	}

	$("#grDetailsGrid").jqxGrid("setcellvalue", row, "psr", newvalue.value);
	$("#grDetailsGrid").jqxGrid("setcellvalue", row, "psrNos", newvalue.label);
	
	var isValid =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'isValid');
	var grSrlNo =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'srl');
	
	
	
	if(isValid == true){$.growl.notice({ message: "Row " + (row+1) + " already validate!", duration: 10000, title: 'Notice' });return false;}
	else{		
		
		
		var accArray = [];
		var stoneArray = [];
		if(newvalue.value != "N"){
			
			var stoneRow = $("#stoneDetailsGrid").jqxGrid('getrows');
			
			postJSON('/OrderExecution/api/v1/GRDetailsByPSR', JSON.stringify(grFilterValues(newvalue.value, (row+1))), function(data) {
				if(data.resCode == 1){
					var psrDetails = data.payload.psrDetails;
					if(newvalue.value != "N"){
						var materialType = materialTypePSR(newvalue.value, psrDetails.orderType, psrDetails.orderKind);
					}
					if(materialType == true){    	
				    	$.growl.error({ message: "Duplicate PSR No for the IGR Details", duration: 10000, title: 'Error' });
				    	$("#grDetailsGrid").jqxGrid("setcellvalue", row, "psr", null);
				    	$("#grDetailsGrid").jqxGrid("setcellvalue", row, "psrNos", null);
				    	return false;
					}
	    			// Update GR header rows.
					updateGrDetailsGridCol(row, psrDetails, 1)
					var stoneDetails = data.payload.psrDetails.stoneList;
					var accDetails = data.payload.psrDetails.accessoryList;
					
					var usedWtLast = updateStonePcs(row,newvalue.value,psrDetails);
					if(stoneDetails.length != 0){
						for(var i=0; i<stoneDetails.length; i++){		
							stoneArray["stoneListId"] = stoneDetails[i].id;
							stoneArray["srl"] = grSrlNo;
							stoneArray["stoneSlNo"] = stoneDetails[i].stoneSlNo;
							stoneArray["isPsr"] = psrDetails.psr;
							stoneArray["isStock"] =  psrDetails.orderType;
							stoneArray["orderKind"] =  psrDetails.orderKind;
							stoneArray["suppliedBy"] = stoneDetails[i].suppliedBy;
							stoneArray["suppliedByType"] = stoneDetails[i].suppliedByType;
							stoneArray["stoneCode"] = stoneDetails[i].stoneCode;
							stoneArray["subCategoryDesc"] = stoneDetails[i].subCategory;
							stoneArray["uom"] = stoneDetails[i].uom;
							stoneArray["issuedPcs"] = stoneDetails[i].issuedPcs;
							stoneArray["isRwk"] = psrDetails.isRwk;
							stoneArray["certificateDetails"] = stoneDetails[i].certificateDetails;
							stoneArray["grStoneCertificates"] = [];
							stoneArray["isCertficateRequired"] = null;
							
							stoneArray["orderNo"] = psrDetails.orderNo;
							stoneArray["orderSlNo"] = psrDetails.orderSlNo;
							stoneArray["stoneUsedPcs"] = stoneDetails[i].stoneUsedPcs;
							stoneArray["stoneUsedWt"] = stoneDetails[i].stoneUsedWt;
							stoneArray["stoneBulkPcs"] = stoneDetails[i].stoneBulkPcs;
							stoneArray["stoneBulkWt"] = stoneDetails[i].stoneBulkWt;
							
							stoneArray["stoneCostPrice"] = stoneDetails[i].stoneCostPrice;
							stoneArray["stoneSellingPrice"] = stoneDetails[i].stoneSellingPrice;							

							stoneArray["returnStoneCostPrice"] = stoneDetails[i].returnStoneCostPrice;
							stoneArray["returnStoneSellingPrice"] = stoneDetails[i].returnStoneSellingPrice;
							stoneArray["returnStoneCostPriceAct"] = stoneDetails[i].returnStoneCostPrice;
							stoneArray["returnStoneSellingPriceAct"] = stoneDetails[i].returnStoneSellingPrice;
							
							stoneArray["pendingPcs"] = stoneDetails[i].pendingPcs;						
							stoneArray["issuedWt"] = (usedWtLast.length == 0) ?  stoneDetails[i].issuedWt : (usedWtLast[i].issuedWt ==0) ? stoneDetails[i].issuedWt : usedWtLast[i].issuedWt;
							stoneArray["issuedPcs"] = (usedWtLast.length == 0) ?  stoneDetails[i].issuedPcs : (usedWtLast[i].issuedPcs ==0) ? stoneDetails[i].issuedPcs : usedWtLast[i].issuedPcs;
							stoneArray["usedPcs"] = (psrDetails.orderKind == "SSP") ? stoneDetails[i].stoneUsedPcs : stoneDetails[i].usedPcs;
							stoneArray["usedWt"] = (psrDetails.orderKind == "SSP") ?stoneDetails[i].stoneUsedWt : stoneDetails[i].usedWt;
							stoneArray["color"] = stoneDetails[i].color;
							stoneArray["cutGrade"] = stoneDetails[i].cutGrade;
							stoneArray["clarity"] = stoneDetails[i].clarity;
							stoneArray["actualColor"] = stoneDetails[i].actualColor;
							stoneArray["wgtRange"] =  stoneDetails[i].wgtRange;
							stoneArray["costRange"] =  stoneDetails[i].listCostRange;
							 
							stoneArray["pendingBulkWt"] = stoneDetails[i].pendingBulkWt;
							stoneArray["bulkPcs"] = stoneDetails[i].bulkPcs;
							stoneArray["bulkWt"] = stoneDetails[i].bulkWt;
							stoneArray["returnedPcs"] = stoneDetails[i].returnedPcs;
							stoneArray["returnedWt"] = stoneDetails[i].returnedWt;
							stoneArray["breakageReceived"] = stoneDetails[i].breakageReceived;
							stoneArray["breakageNotReceivedPcs"] = stoneDetails[i].breakageNotReceivedPcs;
							stoneArray["breakageNotReceived"] = stoneDetails[i].breakageNotReceived;
							stoneArray["category"] = stoneDetails[i].category;
							
							if(stoneDetails[i].stoneCostSPDTO == null){
								stoneArray["stoneHC"] = 0;
								stoneArray["actStoneHC"] = 0;
								stoneArray["stoneHCEdited"] = 0;
								stoneArray["stoneRate"] = 0;
								stoneArray["stoneCostRate"] = 0;
								stoneArray["actStoneCostRate"] = 0;
								stoneArray["sellingRate"] = 0;
								stoneArray["actSellingRate"] = 0;
								onloadCostRangeApi(i, $("#weightRange").val(), stoneDetails[i].listCostRange);
							}else{							
								stoneArray["stoneHC"] = (stoneDetails[i].stoneCostSPDTO.handlingChange == null) ? 0 : stoneDetails[i].stoneCostSPDTO.handlingChange;
								stoneArray["actStoneHC"] = (stoneDetails[i].stoneCostSPDTO == null) ? 0 : stoneDetails[i].stoneCostSPDTO.handlingChange;
								
								stoneArray["stoneHCEdited"] = (stoneDetails[i].stoneCostSPDTO == null) ? 0 : stoneDetails[i].stoneCostSPDTO.handlingChange;
								//stoneArray["grStoneCostSPDTO"] = stoneDetails[i].stoneCostSPDTO;	
								stoneArray["stoneRate"] = (stoneDetails[i].stoneCostSPDTO == null) ? 0 : stoneDetails[i].stoneCostSPDTO.systemCostRate;	
								stoneArray["stoneCostRate"] = (stoneDetails[i].stoneCostSPDTO == null) ? 0 : stoneDetails[i].stoneCostSPDTO.systemCostRate;	
								stoneArray["actStoneCostRate"] = (stoneDetails[i].stoneCostSPDTO == null) ? 0 : stoneDetails[i].stoneCostSPDTO.systemCostRate;	
								stoneArray["sellingRate"] = (stoneDetails[i].stoneCostSPDTO == null) ? 0 : stoneDetails[i].stoneCostSPDTO.sellingRate;		
								stoneArray["actSellingRate"] = (stoneDetails[i].stoneCostSPDTO == null) ? 0 : stoneDetails[i].stoneCostSPDTO.sellingRate;		
							}
							$("#stoneDetailsGrid").jqxGrid('addrow', null, generaterowstonePSR(stoneArray));
						}
					}	
					
					var usedWtLastWt = updateAccPcs(row,newvalue.value,psrDetails);
					if(accDetails.length != 0){
	
						for(var i=0; i<accDetails.length; i++){
							accArray["accListId"] = accDetails[i].id;
							accArray["srl"] = grSrlNo;
							accArray["accSrNo"] = accDetails[i].accSrNo;
							accArray["isPsr"] = psrDetails.psr;
							accArray["isStock"] =  psrDetails.orderType;
							accArray["orderKind"] =  psrDetails.orderKind;
							accArray["suppliedBy"] = accDetails[i].suppliedBy;
							accArray["suppliedByType"] = accDetails[i].suppliedByType;
							accArray["accCode"] = accDetails[i].accCode;
							accArray["subCategory"] = accDetails[i].subCategory;
							accArray["issuedPcs"] = accDetails[i].issuedPcs;
							accArray["issuedWt"] = (usedWtLastWt.length == 0) ?  accDetails[i].issuedWt : (usedWtLastWt[i].issuedWt ==0) ? accDetails[i].issuedWt : usedWtLastWt[i].issuedWt;
							accArray["issuedPcs"] = (usedWtLastWt.length == 0) ?  accDetails[i].issuedPcs : (usedWtLastWt[i].issuedPcs ==0) ? accDetails[i].issuedPcs : usedWtLastWt[i].issuedPcs;
							accArray["usedPcs"] = (psrDetails.orderKind == "SSP") ? accDetails[i].accUsedPcs : accDetails[i].usedPcs;
							accArray["usedWt"] = (psrDetails.orderKind == "SSP") ? accDetails[i].accUsedWt : accDetails[i].usedWt;
							
							accArray["orderNo"] = psrDetails.orderNo;
							accArray["orderSlNo"] = psrDetails.orderSlNo;	
							accArray["accUsedPcs"] = accDetails[i].accUsedPcs;	
							accArray["accUsedWt"] = accDetails[i].accUsedWt;	
							accArray["accCostPrice"] = accDetails[i].accCostPrice;	
							accArray["accSellingPrice"] = accDetails[i].accSellingPrice;

							accArray["returnAccCostPrice"] = accDetails[i].returnAccCostPrice;
							accArray["returnAccSellingPrice"] = accDetails[i].returnAccSellingPrice;
							accArray["returnAccCostPriceAct"] = accDetails[i].returnAccCostPrice;
							accArray["returnAccSellingPriceAct"] = accDetails[i].returnAccSellingPrice;
							
							
							accArray["returnedPcs"] = accDetails[i].returnedPcs;
							accArray["wgtRange"] =  accDetails[i].accCostRange;
							accArray["returnedWt"] = accDetails[i].returnedWt;
							accArray["breakageReceivedPcs"] = accDetails[i].breakageReceivedPcs;
							accArray["breakageReceived"] = accDetails[i].breakageReceived;
							accArray["breakageNotReceivedPcs"] = accDetails[i].breakageNotReceivedPcs;
							accArray["breakageNotReceived"] = accDetails[i].breakageNotReceived;
							accArray["accItemId"] = accDetails[i].accItemId;

							accArray["uom"] = accDetails[i].uom;
							accArray["isRwk"] = psrDetails.isRwk;
							if(accDetails[i].suppliedBy == "V"){
								accArray["accRate"] = 0.00;
								accArray["systemCostRateList"] = (accDetails[i].accCostSPDTO == null) ? null : accDetails[i].accCostSPDTO.systemCostRateList;
								accArray["accRateEdited"] = 0.00;
							}
							else{
								accArray["accRate"] = (accDetails[i].accCostSPDTO == null) ? 0.00 : accDetails[i].accCostSPDTO.systemCostRate;
								accArray["accRateEdited"] = (accDetails[i].accCostSPDTO == null) ? 0.00 : accDetails[i].accCostSPDTO.systemCostRate;
								accArray["systemCostRateList"] = null;
							}
							accArray["actAccRateEdited"] = (accDetails[i].accCostSPDTO == null) ? 0.00 : accDetails[i].accCostSPDTO.systemCostRate;
							accArray["accHC"] = (accDetails[i].accCostSPDTO == null) ? 0.00 : accDetails[i].accCostSPDTO.handlingChange;
							accArray["accHCEdited"] = (accDetails[i].accCostSPDTO == null) ? 0.00 : accDetails[i].accCostSPDTO.handlingChange;
							accArray["actAccHC"] = (accDetails[i].accCostSPDTO == null) ? 0.00 : accDetails[i].accCostSPDTO.handlingChange;
							accArray["sellingRate"] = (accDetails[i].accCostSPDTO == null) ? 0.00 : accDetails[i].accCostSPDTO.sellingRate;
							accArray["actSellingRate"] = (accDetails[i].accCostSPDTO == null) ? 0.00 : accDetails[i].accCostSPDTO.sellingRate;

							console.log(accArray);
							$("#accDetailsGrid").jqxGrid('addrow', null, generaterowaccPSR(accArray));
						}							 
					}
				}else{
					 $.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
					 return false;
				}
			});
			
		}
	}
}

// Generate GR details row
var generaterow = function(i) {
	var row = {};
	row["srl"] = i;
	row["psr"] = null;
	row["psrNos"] = null;
	row["articleCode"] = null;
    row["articleDesc"] = null;
    row["jwlType"] = null;
    row["pcs"] = null;
    row["grossWt"] = null;
    row["netWt"] = null;
    row["costCode"] = null;
    row["costCodes"] = null;
    row["costWastageWT"] = null;
    row["costMC"] = null;
    row["setSellingPrice"] = false;
    row["sellWastageWt"] = null;
    row["sellMC"] = null;
    row["attributes"] = null;
    row["photo"] = null;
    row["viewDesign"] = null;
    row["provisional"] = false;
    row["hallMarkCharges"] = null;
    row["isValid"] = false;		    
    row["selectionStatusCopy"] = null;

    row["hsnMasterId"] = null;
    row["hsnMasterCode"] = null;
    row["reason"] = null;
    row["pendingPcs"] = null;
    row["countStone"] = null;
    row["countAcc"] = null;
    row["jwType"] = null;
    row["isPair"] = null;
    row["segmentId"] = null;
    row["segmentCode"] = null;
    row["actcostWastageWt"] = null;
    row["actcostMC"] = null;
    row["actsellWastageWt"] = null;
    row["actsellMC"] = null;
    row["metalValue"] = null;
    row["wastageValue"] = null;
    row["selling_price"] = null;
    row["stoneList"] = null;
    row["accessoryList"] = null;
    row["attrLength"] = null;
    row["size"] = null;
    row["height"] = null;
    row["diameter"] = null;
    row["width"] = null;
    row["vendorArticle"] = null;
    row["combinationId"] = null;
    row["metalColor"] = null;
    row["hookType"] = null;
    row["screwType"] = null;
    row["loopType"] = null;
    row["polishType"] = null;
    row["settingType"] = null;
    row["collectionName"] = null;
    row["orderKind"] = null;
    row["orderType"] = null;
    row["metalTypeId"] = null;
    row["storeId"] = null; 
    row["isRwk"] = false;
    row["isDueDtFlag"] = false;
    row["reason"] = null;  
    row["globalAttrFlag"] = null;
    row["awCount"] = 0;
	return row;
}

// GR cost code field filters
var grCostFilterValues = function(row , netwt, costCode, costWastageWT, costMC, isEditedSellWastageWT, sellingWastageWt) {
	grDto = {};
	var vendorCode = $('#vendorCode-value').val();	
	var skinPurity = $('#skinPurity').val();	
	var rowObj =  $("#grDetailsGrid").jqxGrid('getrowdatabyid', row);	
	grDto.vendorCode = vendorCode;
	grDto.skinPurity = skinPurity;
	grDto.segmentId = rowObj.segmentId;
	grDto.articleCode = rowObj.articleCode;
	grDto.grossWt = rowObj.grossWt;
	grDto.netWt = netwt;
	grDto.pcs = rowObj.pcs;
	grDto.isEditedSellWastageWT = parseInt(isEditedSellWastageWT);
	grDto.sellingWastageWt = parseFloat(sellingWastageWt);
	grDto.costCode = costCode;
	grDto.costMC = costMC;
	grDto.accCostMC = rowObj.actcostMC;
	grDto.costWastage = costWastageWT;
	grDto.accCostWastage = rowObj.actcostWastageWt;
	grDto.apportionSellingMc = rowObj.apportionSellingMc;
	grDto.apportionsellingWastageWt = rowObj.apportionsellingWastageWt;
	grDto.mrvNo = mrvNo;
	grDto.srl = mrvSrl;
	grDto.psr = rowObj.psr;
	grDto.metalRate = $("#pureRate").val();
	return grDto;
}

//Add GR Details row
var chekcForInvalidGrDetails= function(){
	var grDetRows = $("#grDetailsGrid").jqxGrid('getrows');
	var srlNos = [];
	for(var i=0; i<grDetRows.length; i++){
		if(grDetRows[i].isValid == false){
			srlNos.push(grDetRows[i].srl);
		}
	}
	if(srlNos.length > 0){
		$.growl.error({ message: "Please Validate IGR details with Srl No's : " + srlNos.join([separator = ','])
			, duration: 10000, title: 'Error' });
		return false;
	}
	return true;
}
var rowId = 0;
var addGRDetailsRow = function(){
	var rowscount = $("#grDetailsGrid").jqxGrid('getdatainformation').rowscount;
	console.log(rowscount);
	if (rowscount == 0) {
		rowId = 1;
	} else {
		rowId = rowscount + 1;
	}					
	
	var datarow = generaterow(rowId);
	var commit = $("#grDetailsGrid").jqxGrid('addrow', null, datarow);					

    var boundindex = $('#grDetailsGrid').jqxGrid('getrowboundindex', rowId-1);
	$("#grDetailsGrid").jqxGrid('selectrow', boundindex);
	$("#grDetailsGrid").jqxGrid('ensurerowvisible', boundindex);
}

var deleteStoneAccAllRows = function(row){
	var grSlNo =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'srl');
	var masterRows = $("#grDetailsGrid").jqxGrid('getrows');
	var rowsStone = $("#stoneDetailsGrid").jqxGrid('getrows');
	var rowsAcc = $("#accDetailsGrid").jqxGrid('getrows');	
	
	var newArrayStone = [];
	var newArrayAcc = [];
	
	if(typeof masterRows != "undefined"){
		
		if(typeof rowsStone != "undefined"){
			for(var k=0; k<rowsStone.length; k++){
				if(grSlNo ==  rowsStone[k].srl){
					var idVal = $("#stoneDetailsGrid").jqxGrid('getrowid', k);
					newArrayStone.push(idVal);						
				}
			}	
		}
		
		if(typeof rowsAcc != "undefined"){
			for(var n=0; n<rowsAcc.length; n++){
				if(grSlNo ==  rowsAcc[n].srl){
					var idValAcc = $("#accDetailsGrid").jqxGrid('getrowid', n);
					newArrayAcc.push(idValAcc);						
				}
			}
		}
	}
	
	if(typeof rowsStone != "undefined"){
		$("#stoneDetailsGrid").jqxGrid('deleterow', newArrayStone);		
	}
	if(typeof rowsAcc != "undefined"){
		$("#accDetailsGrid").jqxGrid('deleterow', newArrayAcc);
	}
	
	
}

var updateStoneWtDelete = function(grSrlNo, psr){
	
	var masterRows = $("#grDetailsGrid").jqxGrid('getrows');
	var stoneRows = $("#stoneDetailsGrid").jqxGrid('getrows');
	var stoneCount = 0;
	
	var rows = [];
	
	for(var i=0; i<stoneRows.length ; i++){
		if(stoneRows[i].isPsr == psr && grSrlNo == stoneRows[i].srl){
			++stoneCount;
			rows.push(stoneRows[i]);
		}
	}
	
	for(var i=0; i<masterRows.length; i++){
		if(grSrlNo <= masterRows[i].srl && masterRows.psr == psr){
			$('#grDetailsGrid').jqxGrid('setcellvalue', i, 'isValid', false);
		}
	}

	for(k = 0; k < stoneCount ; k++){
		var index = k +1;
		var issuedWtForAdd = 0;
		for(var j=0; j<stoneRows.length; j++){
				if((stoneRows[j].isPsr == psr) && (stoneRows[j].stoneSlNo == index) && (stoneRows[j].srl > grSrlNo)){
					issuedWtForAdd = NVL(rows[k].usedWt,0) + NVL(rows[k].returnedWt,0) + NVL(rows[k].breakageReceived,0) 
						+ NVL(rows[k].breakageNotReceived,0) + NVL(stoneRows[j].issuedWt,0);
					$('#stoneDetailsGrid').jqxGrid('setcellvalue', j, 'issuedWt', issuedWtForAdd);
				}
		}
	}
	
}

// Delete GR Details row
var deleteGrDetailsRow = function(){

	debugger;
	var selectedrowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var rowscount = $("#grDetailsGrid").jqxGrid('getdatainformation').rowscount;	
	var grSlNo =  $('#grDetailsGrid').jqxGrid('getcellvalue', selectedrowindex, 'srl');
	var orderType =  $('#grDetailsGrid').jqxGrid('getcellvalue', selectedrowindex, 'orderType');
	var psr =  $('#grDetailsGrid').jqxGrid('getcellvalue', selectedrowindex, 'psr');
	
	if((psr != "N") && (orderType == "ST")){
		updateStoneWtDelete(grSlNo, psr);
	}
	deleteStoneAccAllRows(selectedrowindex);	
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

// Check cost wastage and sell wastage editable or not.
 var grCostCodeEditable = function(row, datafield, columntype) {
	
	var costCode =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costCode');
	var orderKind =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'orderKind');
	
	var actcostMC =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actcostMC');
	var actcostWastageWt =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actcostWastageWt');
	var isRwk =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'isRwk');
	var setSellinPrice = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'setSellingPrice');	
	
	if("CSP" == orderKind || "SSP" == orderKind){		
		return false;
	}else if(datafield == "costCode" && isRwk == true){
		return false;
	}else if(datafield == "costCode" && costCode == "R"){		
		return false;		
	}else if("RE_RWK" == orderKind && datafield == "costCode"){		
		return false;		
	}else if("SRP" == orderKind && datafield == "costCode" && costCode == "T"){		
		return false;		
	}else if (costCode == "T"  && (datafield == "costWastageWT" || datafield == "sellWastageWt")) {    	
    	return false;        
    }else if (costCode == "R" && setSellinPrice == false && datafield == "costWastageWT") {    	
    	return false;        
    }else if (costCode == "M" && datafield == "costWastageWT") {    	
    	return true;        
    }else if ((costCode == "T" || costCode == "R") && (datafield == "costMC" || datafield =="sellMC")) {    	
    	return true;        
    }else if (setSellinPrice == true && (datafield == "costWastageWT" || datafield == "sellWastageWt" || datafield == 'costMC' || datafield == 'costWastageWT')) {    	
    	return true;        
    }else{
    	return true;
    }	
}

 // Sell wastage and sell MC disable enable column.
var grSellCostCodeEdit = function(row, datafield, columntype) {	
	var costCode =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costCode');
	var setSellinPrice = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'setSellingPrice');	
	var orderKind =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'orderKind');	
		if(setSellinPrice == false){
			return false;
		}/*else{
			if(setSellinPrice == true && (costCode == "R" || costCode == "T") && datafield == "sellWastageWt"){
				return false;
			}else{
				return true;
			}
		}	*/
		
		if("CSP" == orderKind || "SSP" == orderKind){		
			return false;		
		}else if (costCode == "T" && datafield == "sellWastageWt") {    	
	    	return false;        
	    }else if(costCode == "T" && datafield == "sellMC" && setSellinPrice == true){    	
	    	return true;
	    }		
		
		if ((setSellinPrice == true) && (datafield == 'sellMC' || datafield == 'sellWastageWt')) {    	
	    	return true;        
	    }	
	
}


// Update set selling price.
var updateSetSellingice = function(row, datafield, columntype, oldvalue, newvalue, event){
	$("#grDetailsGrid").jqxGrid('setcellvalue', row, 'setSellingPrice', newvalue);
	if(newvalue == false){
		var actsellWastageWt =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actsellWastageWt');
		$('#grDetailsGrid').jqxGrid('setcellvalue', row, 'sellWastageWt',actsellWastageWt);
		
		var actsellMC =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actsellMC');
		$('#grDetailsGrid').jqxGrid('setcellvalue', row, 'sellMC',actsellMC);
		
		var actcostMC =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actcostMC');
		$('#grDetailsGrid').jqxGrid('setcellvalue', row, 'costMC',actcostMC);
		
		var actcostWastageWt =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'actcostWastageWt');
		$('#grDetailsGrid').jqxGrid('setcellvalue', row, 'costWastageWT',actcostWastageWt);
		
		$('#grDetailsGrid').jqxGrid('setcellvalue', row, 'provisional',false);
	}
}

$(".modal").on("hidden.bs.modal", function(){
	$('#page-content').removeData();
    $('.pagination').twbsPagination('destroy');
	$('.modal-backdrop').remove();
});

var viewDesignDetails = function(row){
	var viewDesign = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'viewDesign');
	var viewDesignList = [];
	 viewDesignList = viewDesign.list;
	$('#pagination-demo').twbsPagination({
	    totalPages: viewDesign.size,
	    visiblePages: "5",
	    onPageClick: function (event, page) {
	    		$.each(viewDesignList, function(k, v){
	    			if((page-1) == k){
	    				console.log(v);
	    				var img =  "<a href='/uf/"+v.id+"' target='_blank'><img src='/uf/"+v.id+"' height='60%' width ='60%' /></a>";
	    				$('#page-content').html(img);
	    			}
	    		});
	    }
	});
}




// Edit view design
var orderItemDesignRenderer = function(row, column, value) {
	var data =  $("#grDetailsGrid").jqxGrid("getCellvalue", row , 'psr');
	var rows = $('#grDetailsGrid').jqxGrid('getrows');	
	var vendorId = $("#vendorCode-valueC").val();
	
	var grFgDetailsGrid = "grFgDetailsGrid";
	if(null != value && "N" != data && null != data){
		if (rows[row].viewDesign != null) {
			return '<div class="text-center"><a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#designViewGR" type="button" onclick="viewDesignDetails('
			+ row
			+ ')"/><span class="fa fa-eye"></span> </a></div>';
		}else{
			return '<div class="text-center"><button style="margin-top: 3px;" class="btn btn-sm btn-primary" disabled data-toggle="modal" type="button" /><i class="fa fa-eye fa-lg"></i></button></div>';
		}
	}else{
		return '<div class="text-center"><button style="margin-top: 3px;" class="btn btn-sm btn-primary" disabled data-toggle="modal" type="button" /><i class="fa fa-eye fa-lg"></i></button></div>';
	}
		
}

// updated added stone data to main grid
var onClickSrlUpdateStoneDetails = function(grSrNo){
	debugger;
	var stoneRows = $("#stoneDetailsGrid").jqxGrid('getrows');
	var rowData = $("#grDetailsGrid").jqxGrid('getrowdata', (grSrNo-1));
	
	//venkat code
	var rowIDs = new Array();
	 rowIDs.push(rowData.uid);
	var stoneRowArray = [];
		if(undefined != stoneRows && null != stoneRows && stoneRows.length > 0){		
			for(var i=0; i<stoneRows.length; i++){
				 if(grSrNo == stoneRows[i].srl){
					stoneRowArray.push(stoneRows[i]);
				 }
			}
			rowData['stoneList'] = stoneRowArray;
			
		}else{
			rowData['stoneList'] = null;
		} 
	$('#grDetailsGrid').jqxGrid('updaterow',rowIDs, rowData); //previous line (grSrNo-1) intead of rowIDs
		
		
}

//updated added acc data to main grid
var onClickSrlUpdateAccDetails = function(grSrNo){
	debugger;
	var accRows = $("#accDetailsGrid").jqxGrid('getrows');
	var rowData = $("#grDetailsGrid").jqxGrid('getrowdata', (grSrNo-1));
	var accRowArray = [];
	
	//venkat Code
	var rowIDs = new Array();
    rowIDs.push(rowData.uid);
	
	
	if(undefined != accRows && null != accRows && accRows.length > 0){		
		for(var i=0; i<accRows.length; i++){
			 if(grSrNo == accRows[i].srl){
				 accRowArray.push(accRows[i]);
			 }
		}
		rowData['accessoryList'] = accRowArray;		 
	}else{
		rowData['accessoryList'] = null;
	}
	$('#grDetailsGrid').jqxGrid('updaterow', rowIDs, rowData);//previous line (grSrNo-1) intead of rowIDs
	
}

var grStoneAccDetails = function(srl)
{
	onClickSrlUpdateStoneDetails(srl);
	onClickSrlUpdateAccDetails(srl);	 
}

// GR Stone Validation
var  grStoneDetailsValidation = function(orderType, row){
	var isRwk = $("#grDetailsGrid").jqxGrid('getcellvalue', row, 'isRwk');
	var stoneDetails = $("#stoneDetailsGrid").jqxGrid('getrows');
	

	var validation = true;
	var srl = 0;
	for(var i = 0; i< stoneDetails.length; i++){
		srl = i;
		var data = stoneDetails[i];
		var issuedWtFinal =  data.issuedWt;
		issuedWtFinal = parseFloat(issuedWtFinal).toFixed(3);
		issuedWtFinal = parseFloat(NVL(issuedWtFinal,0));
		
		var firstword = data.category.split(' ')[0];
		var otherthreeWeight = parseFloat(NVL(data.returnedWt,0)) + parseFloat(NVL(data.breakageReceived,0)) + parseFloat(NVL(data.breakageNotReceived, 0));
		otherthreeWeight = otherthreeWeight.toFixed(3);
		
		otherWeight = parseFloat(NVL(otherthreeWeight,0)) + parseFloat(NVL(data.usedWt,0));
		otherWeight = otherWeight.toFixed(3);
		
		var totalWtVal = parseFloat(NVL(data.stoneUsedWt,0)) + parseFloat(NVL(data.stoneBulkWt,0));
		
		var earlierLeftStone = ((parseFloat(NVL(issuedWtFinal,0))-parseFloat(NVL(data.usedWt,0))) + parseFloat(NVL(totalWtVal,0))) - parseFloat(NVL(otherthreeWeight,0));
		var earlierLeftStoneVendor = parseFloat(NVL(data.stoneUsedWt,0)) - parseFloat(NVL(otherthreeWeight,0));
		if(((data.isStock == "CU" && data.orderKind == "NO") || (data.orderKind == "CRP" || data.orderKind == "CSP" || data.orderKind == "SRP" || data.orderKind == "SSP" || data.orderKind == "RE_RWK"))  && (data.suppliedBy == "CU" || data.suppliedBy == "CO")  && data.isPsr != null){
			var totUsedWt = parseFloat(NVL(data.stoneUsedWt,0)) + parseFloat(NVL(issuedWtFinal,0));
			
			if(parseFloat(NVL(data.returnedWt,0)) > 0  ){//Venkat Changes Previous Lines :if( parseFloat(NVL(otherWeight,0)) > parseFloat(NVL(totUsedWt,0)))
				if( parseFloat(NVL(otherWeight,0)) > parseFloat(NVL(totUsedWt,0))){
					validation = false;	
					$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both issued Wt should be equal to sum of Used. Wt., Retd. Wt., Break.Rec.Wt. & Break.Not Rec.Wt.", duration: 10000, title: 'Error' });
					return false;
				}
			}else if(parseFloat(NVL(data.usedWt,0)) > 0 ){//Venkat Changes Previous Lines :if( parseFloat(NVL(otherWeight,0)) > parseFloat(NVL(totUsedWt,0)))
				if( parseFloat(NVL(otherWeight,0)) > parseFloat(NVL(issuedWtFinal,0))){
					validation = false;	
					$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both issued Wt should be equal to sum of Used. Wt., Retd. Wt., Break.Rec.Wt. & Break.Not Rec.Wt.", duration: 10000, title: 'Error' });
					return false;
				}
			}
			
			/*if(parseFloat(NVL(issuedWtFinal,0)) != parseFloat(NVL(otherWeight,0))){// 20th may 2019, In case of supplied by comp/cust and if issued wt <= 0
				validation = false;	
				$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both issued Wt should be equal to sum of Used. Wt., Retd. Wt., Break.Rec.Wt. & Break.Not Rec.Wt.", duration: 10000, title: 'Error' });
				return false;
			}*/
		}
		
		if(firstword == "CD" && data.suppliedBy == "V"){
			if(data.costRange == null && (data.stoneCostRate == 0 || data.stoneCostRate == null) || (data.sellingRate == 0 || data.sellingRate == null)){
				validation = false;	
				$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" Stone Rate not found.", duration: 10000, title: 'Error' });
				return false;
			}
		}else if(data.suppliedBy != "V" && data.isStock == "CU" && (data.orderKind == "NO" || data.orderKind == "CRP" || data.orderKind == "RE_RWK") && (data.isRwk == true || data.isRwk == "true")){
			if((parseFloat(NVL(issuedWtFinal,0)) + parseFloat(NVL(data.stoneUsedWt,0))) != (parseFloat(NVL(data.usedWt,0)) + parseFloat(NVL(otherthreeWeight,0)) + parseFloat(NVL(earlierLeftStone,0)))){
				validation = false;	
				$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" Issue Wt + Earlier Used Wt = Used wt + Return Wt + (Earlier Left)", duration: 10000, title: 'Error' });
				return false;
			}
		}else if(data.suppliedBy == "V" && data.isStock == "CU" && (data.orderKind == "NO" || data.orderKind == "CRP" || data.orderKind == "RE_RWK") && (data.isRwk == true || data.isRwk == "true")){
			if(parseFloat(NVL(otherthreeWeight,0)) > parseFloat(NVL(data.stoneUsedWt,0))){
				validation = false;	
				$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" Return wt should be less than equal to earlier used wt.", duration: 10000, title: 'Error' });
				return false;
			}
		}
		/*else if(data.suppliedBy == "CO" && (data.stoneHC == null || data.stoneHC == "" || typeof data.stoneHC == "undefined")){
			$.growl.warning({ message: "For Stone Srl "+data.stoneSlNo+" ensure stone HC should be greater than equal to zero.", duration: 10000, title: 'Warning' });
			return false;
		}else if(data.isStock == "CU" && data.suppliedBy == "CU"  && data.isRwk == false && data.isPsr != null){
			if(parseFloat(data.issuedWt) != parseFloat(otherWeight)){
				validation = false;	
				$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both issued Wt should be equal to sum of Used. Wt., Retd. Wt., Break.Rec.Wt. & Break.Not Rec.Wt.", duration: 10000, title: 'Error' });
				return false;
			}
		}*/else if(((data.isStock == "CU" && data.orderKind == "NO") || (data.orderKind == "CRP" || data.orderKind == "CSP" || data.orderKind == "SRP" || data.orderKind == "SSP" || data.orderKind == "RE_RWK"))  && (data.suppliedBy == "CU" || data.suppliedBy == "CO")  && data.isPsr != null &&  (data.stoneUsedWt  == 0 || typeof data.stoneUsedWt == "undefined" || data.stoneUsedWt == null)){
			if(parseFloat(NVL(issuedWtFinal,0)) != parseFloat(NVL(otherWeight,0))){
				validation = false;	
				$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both issued Wt should be equal to sum of Used. Wt., Retd. Wt., Break.Rec.Wt. & Break.Not Rec.Wt.", duration: 10000, title: 'Error' });
				return false;
			}
		}else if( data.suppliedBy == "CO" && (data.orderKind == "SRP" || data.orderKind == "RE_RWK")){			
			if( parseFloat(NVL(totalWtVal,0)) > 0){
				if(parseFloat(NVL(otherthreeWeight,0)) > parseFloat(NVL(totalWtVal,0))){
					validation = false;	
					$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure sum of Retd. Wt., Break.Rec.Wt. & Break.Not Rec.Wt. should be less than sum of earlier used and bulk wt.", duration: 10000, title: 'Error' });
					return false;				
				}
			}else{				
				if(parseFloat(NVL(issuedWtFinal,0)) != parseFloat(NVL(otherWeight,0))){
					validation = false;	
					$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both issued Wt should be equal to sum of Used. Wt., Retd. Wt., Break.Rec.Wt. & Break.Not Rec.Wt.", duration: 10000, title: 'Error' });
					return false;	
				}
			}
			
		}else if((parseFloat(NVL(data.usedWt,0))  > parseFloat(NVL(issuedWtFinal,0))) && (data.isPsr != null) && (data.suppliedBy != "V")){
				validation = false;	
				$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure Used Wt should be less than or equal to Issued Wt", duration: 10000, title: 'Error' });
				return false;
		}
		else if((data.suppliedBy == "CU" || data.suppliedBy == "CO" || data.suppliedBy == "V") && (data.isRwk == true) && (data.isPsr != null)){
			if(data.returnedWt  > (issuedWtFinal + data.stoneUsedWt)){
				validation = false;	
				$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both Retd. Wt. should be less than or equal to sum of issued Wt & Order Item Stone Used Wt.", duration: 10000, title: 'Error' });
				return false;
			}
		}else if((data.suppliedBy == "CU" || data.suppliedBy == "CO" || data.suppliedBy == "V") && (data.isRwk == true) && (data.isPsr != null)){
			if((issuedWtFinal + data.stoneUsedWt)  < (data.usedWt + data.returnedWt + data.breakageReceived + data.breakageNotReceived) ){
				validation = false;	
				$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure sum of Issued Wt & Order Item Stone Used Wt should be greater than equal to sum of Used. Wt., Retd. Wt., Break.Rec.Wt. & Break.Not Rec.Wt. ", duration: 10000, title: 'Error' });
				return false;
			}
		}
		else if((data.uom == "Gms" || data.uom == "Cts") && (parseFloat(NVL(issuedWtFinal,0)) < parseFloat(NVL(data.usedWt,0))) && (data.isStock == "ST") && (data.suppliedBy != "V")){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both Used Wt can not be more than Issued Wt.", duration: 10000, title: 'Error' });
			return false;
		}else if(data.uom == "Pcs" && (data.issuedPcs < data.usedPcs)  && (data.isStock == "ST")  && (data.suppliedBy != "V")){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both Used PCS/Wt can not be more than Issued Pcs./Wt.", duration: 10000, title: 'Error' });
			return false;
		}else if((null != data.usedPcs && null == data.usedWt) || (null != data.usedWt && null == data.usedPcs)  || (null != data.usedPcs && 0 < data.usedPcs && 0 == data.usedWt) || (null != data.usedWt && 0 < data.usedWt && 0 == data.usedPcs)){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both Used PCS and Used Wt is entered.", duration: 10000, title: 'Error' });
			return false;
		}else if((null != data.bulkPcs && null == data.bulkWt ) || (null != data.bulkWt && null == data.bulkPcs) || (null != data.bulkPcs && 0 < data.bulkPcs && 0 == data.bulkWt ) || (null != data.bulkWt && 0 < data.bulkWt && 0 == data.bulkPcs)){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both Bulk PCS and Bulk Wt is entered.", duration: 10000, title: 'Error' });
			return false;
		}else if((null != data.returnedPcs && null == data.returnedWt ) || (null != data.returnedWt && null == data.returnedPcs) || (null != data.returnedPcs && 0 < data.returnedPcs && 0 == data.returnedWt ) || (null != data.returnedWt && 0 < data.returnedWt && 0 == data.returnedPcs)){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both Returned PCS and Returned Wt is entered.", duration: 10000, title: 'Error' });
			return false;
		}else if((null != data.breakageReceivedPcs && null == data.breakageReceived ) || (null != data.breakageReceived && null == data.breakageReceivedPcs ) || (null != data.breakageReceivedPcs && 0 < data.breakageReceivedPcs && 0 == data.breakageReceived ) || (null != data.breakageReceived && 0 < data.breakageReceived && 0 == data.breakageReceivedPcs )){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both Breakage PCS and Breakage  Wt is entered.", duration: 10000, title: 'Error' });
			return false;
		}else if((null != data.breakageNotReceivedPcs && null == data.breakageNotReceived ) || (null != data.breakageNotReceived && null == data.breakageNotReceivedPcs) || (null != data.breakageNotReceivedPcs && 0 < data.breakageNotReceivedPcs && 0 == data.breakageNotReceived ) || (null != data.breakageNotReceived && 0 < data.breakageNotReceived && 0 == data.breakageNotReceivedPcs)){
			validation = false;
			$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure both Breakage Not Received PCS and Wt is entered.", duration: 10000, title: 'Error' });
			return false;
		}else if(("V" == data.suppliedBy && null != data.stoneCode  && (0 < data.usedPcs || 0 < data.usedWt))  && null == data.stoneCostRate){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" ensure Rate is selected/exists", duration: 10000, title: 'Error' });
			return false;
		}else if( ("CO" == data.suppliedBy && null != data.stoneCode  && (0 < data.usedPcs || 0 < data.usedWt || 0 < data.bulkPcs || 0 < data.bulkWt))  && null == data.stoneCostRate){
			validation = false;	
			$.growl.error({ message: "For Stone Srl "+data.stoneSlNo+" Standard MAP Rate is not found. Please check.", duration: 10000, title: 'Error' });
			return false;
		}else if(data.isStock == "ST" && (data.orderKind == "NO" || data.orderKind == "SRP") && data.suppliedBy != "V"){
			var totWtStone = parseFloat(data.usedWt)+parseFloat(otherthreeWeight);
			totWtStone = totWtStone.toFixed(3);
			if(parseFloat(issuedWtFinal) < parseFloat(totWtStone)){
				validation = false;
				return false;
			}
		}else if((data.orderKind == "SRP" || data.orderKind == "RE_RWK") && data.suppliedBy != "V" && (parseFloat(NVL(data.usedWt,0)) > parseFloat(NVL(issuedWtFinal,0)))){
			validation = false;
			return false;
		}else if((data.orderKind == "SRP" || data.orderKind == "RE_RWK") && data.suppliedBy != "V" && (parseFloat(NVL(otherthreeWeight,0)) > ((parseFloat(NVL(data.stoneUsedWt, 0)) + parseFloat(NVL(data.stoneBulkWt,0)) + parseFloat(NVL(issuedWtFinal, 0))) - parseFloat(NVL(data.usedWt, 0))))){
			validation = false;
		}else if(firstword == "CD" && (data.suppliedBy == "V" || data.suppliedBy == "CO") && (data.costRange == null || data.costRange == "")){
			validation = false;
			$.growl.error({	message : "Stone " + data.stoneSlNo  + " Please select cost range.",	duration : 5000,title : 'Error'	});	
			return false;
		}else if(parseFloat(NVL(issuedWtFinal,0)) > 0 && (parseFloat(NVL(issuedWtFinal, 0)) != parseFloat(NVL(otherWeight, 0))) && data.suppliedBy != "V" && data.isStock != "ST"){
			validation = false;
			$.growl.error({	message : "Stone " + data.stoneSlNo  + " Isssued wt should be equal to (used + return wt + breakageReceived + breakageNotReceived).",	duration : 5000,title : 'Error'	});	
			return false;
		}else if((data.suppliedBy == "V" || data.suppliedBy == "CO") && (data.sellingRate == null || data.sellingRate == 0)){
			validation = false;
			return false;
		}else if(data.suppliedBy == "CO" && data.isStock == "CU" && (data.orderKind == "NO" || data.orderKind == "CRP" || data.orderKind == "RE_RWK") && (data.isRwk == true || data.isRwk == "true")){
			if((parseFloat(NVL(issuedWtFinal,0)) + parseFloat(NVL(totalWtVal,0))) != parseFloat((NVL(data.usedWt,0)) + parseFloat(NVL(otherthreeWeight,0)) + parseFloat(NVL(earlierLeftStone,0)))){
				validation = false;
				return false;
			}			
			
		}else if((data.suppliedBy == "CO" || data.suppliedBy == "CU") && data.isStock == "CU" && (data.orderKind == "NO" || data.orderKind == "CRP" || data.orderKind == "RE_RWK") && data.stoneUsedWt  > 0){
			if((parseFloat(NVL(issuedWtFinal,0)) + parseFloat(NVL(totalWtVal,0))) != (parseFloat(NVL(data.usedWt,0)) + parseFloat(NVL(otherthreeWeight,0)) + parseFloat(NVL(earlierLeftStone,0)))){
				validation = false;
				return false;
			}			
			
		}else if((data.suppliedBy == "CO" || data.suppliedBy == "CU") && data.isStock == "CU" && (data.orderKind == "NO" || data.orderKind == "CRP" || data.orderKind == "RE_RWK") && (data.isRwk == true || data.isRwk == "true")){
						
			if(parseFloat(NVL(data.usedWt,0)) > parseFloat(NVL(issuedWtFinal,0))){
				validation = false;
				$.growl.error({	message : "Stone " + data.stoneSlNo  + " issued wt can not be less than used wt.",	duration : 5000,title : 'Error'	});	
				return false;
			}
		}else if(data.suppliedBy == "CO" && data.orderKind == "NO" && data.isStock == "ST"){
			if(parseFloat(NVL(otherWeight,0)) > parseFloat(NVL(issuedWtFinal,0))){
				validation = false;
				return false;
			}
		}
		
	}
	
	return validation;
	
}

//GR Acc Validation
var grAccDetailsValidation = function(orderType, row) {
	var isRwk = $("#grDetailsGrid").jqxGrid('getcellvalue', row, 'isRwk');
	var accDetails = $("#accDetailsGrid").jqxGrid('getrows');
	var validation = true;
	var srl = 0;

	for(var i = 0; i< accDetails.length; i++){
		
		var data = accDetails[i];
		console.log(data);
		var issuedWtMain = parseFloat(NVL(data.issuedWt,0));
		issuedWtMain = parseFloat(issuedWtMain);
		issuedWtMain = issuedWtMain.toFixed(3);
		issuedWtMain = parseFloat(NVL(issuedWtMain,0));
		srl = i;
		var otherthreeWeight = parseFloat(NVL(data.returnedWt,0)) + parseFloat(NVL(data.breakageReceived,0)) + parseFloat(NVL(data.breakageNotReceived, 0));
		otherthreeWeight = otherthreeWeight.toFixed(3);
		
		otherWeight = parseFloat(NVL(otherthreeWeight,0)) + parseFloat(data.usedWt);
		otherWeight = otherWeight.toFixed(3);
		
		
		var earlierLeftAcc = ((parseFloat(NVL(issuedWtMain,0))-parseFloat(NVL(data.usedWt,0))) + (parseFloat(NVL(data.accUsedWt,0)))) - parseFloat(NVL(otherthreeWeight,0));
		var earlierLeftAccVendor = (parseFloat(NVL(data.accUsedWt,0))  - parseFloat(NVL(otherthreeWeight,0)));
		
	
		if(((data.isStock == "CU" && data.orderKind == "NO") || (data.orderKind == "CRP" || data.orderKind == "CSP" || data.orderKind == "SRP" || data.orderKind == "SSP" || data.orderKind == "RE_RWK"))  && (data.suppliedBy == "CU" || data.suppliedBy == "CO")  && data.isPsr != null &&  (data.accUsedWt  == 0 || typeof data.accUsedWt == "undefined" || data.accUsedWt == null)){
			if(parseFloat(issuedWtMain) != parseFloat(otherWeight)){
				validation = false;	
				$.growl.error({ message: "For Acc Srl " + data.accSrNo + " ensure both issued Wt should be equal to sum of Used. Wt., Retd. Wt., Break.Rec.Wt. & Break.Not Rec.Wt.", duration: 10000, title: 'Error' });
				return false;
			}
		}
		//Selling Rate is taking from drop down (01/07/2019) 
		/*if(data.suppliedBy == "V" && (data.sellingRate == 0 || data.sellingRate == null || typeof data.sellingRate == "undefined")){
			validation = false;
			$.growl.error({	message : "For Acc Srl " + data.accSrNo  + " selling rate not found, Please create acc. det.",	duration : 5000,title : 'Error'	});	
			return false;
		}else*/
		if((data.suppliedBy == "CO" || data.suppliedBy == "CU") && data.isStock == "CU" && (data.orderKind == "NO" || data.orderKind == "CRP" || data.orderKind == "RE_RWK") && (data.isRwk == true || data.isRwk == "true")){
			
			if(parseFloat(NVL(data.usedWt,0)) > parseFloat(NVL(issuedWtMain,0))){
				validation = false;
				$.growl.error({	message : "For Acc Srl " + data.accSrNo  + " issued wt can not be less than used wt.",	duration : 5000,title : 'Error'	});	
				return false;
			}
		}else if(data.suppliedBy != "V" && data.isStock == "CU" && (data.orderKind == "NO" || data.orderKind == "CRP" || data.orderKind == "RE_RWK") && (data.isRwk == true || data.isRwk == "true")){							
			if( (parseFloat(NVL(issuedWtMain,0)) + parseFloat(NVL(data.accUsedWt,0)))  != parseFloat(NVL(data.usedWt,0)) + parseFloat(NVL(otherthreeWeight,0)) + parseFloat(NVL(earlierLeftAcc,0))){
				validation = false;	
				$.growl.error({ message: "For Acc Srl "+data.accSrNo+" Issue Wt + Earlier Used Wt = Used wt + Return Wt + (Earlier Left).", duration: 10000, title: 'Error' });
				return false;
			}
		}else if(data.suppliedBy == "V" && data.isStock == "CU" && (data.orderKind == "NO" || data.orderKind == "CRP" || data.orderKind == "RE_RWK") && (data.isRwk == true || data.isRwk == "true")){							
			if( parseFloat(NVL(otherthreeWeight,0)) >  parseFloat(NVL(data.accUsedWt,0))){
				validation = false;	
				$.growl.error({ message: "For Acc Srl "+data.accSrNo+" Return wt should be less than equal to earlier used wt.", duration: 10000, title: 'Error' });
				return false;
			}
		}else if(data.suppliedBy == "V" && (data.accRateEdited == null || data.accRateEdited == "" || typeof data.accRateEdited == "undefined" || data.accRateEdited <= 0)){
			validation = false;	
			$.growl.error({ message: "For Acc Srl "+data.accSrNo+" Acc Rate Edited is Mandatory.", duration: 10000, title: 'Error' });
			return false;
		}else if((parseFloat(data.usedWt)  > parseFloat(NVL(issuedWtMain,0))) && (data.isPsr != "N") && (data.suppliedBy != "V")){
				validation = false;	
				$.growl.error({ message: "For Acc Srl "+data.accSrNo+" ensure Used Wt should be less than or equal to Issued Wt", duration: 10000, title: 'Error' });
				return false;
		}
		else if((data.suppliedBy == "CU" || data.suppliedBy == "CO" || data.suppliedBy == "V") && (data.isRwk == true) && (data.isPsr != "N")){
			if(data.returnedWt  > (issuedWtMaint + data.stoneUsedWt)){
				validation = false;	
				$.growl.error({ message: "For Acc Srl "+data.accSrNo+" ensure both Retd. Wt. should be less than or equal to sum of issued Wt & Order Item Acc Used Wt.", duration: 10000, title: 'Error' });
				return false;
			}
		}else if((data.suppliedBy == "CU" || data.suppliedBy == "CO" || data.suppliedBy == "V") && (data.isRwk == true) && (data.isPsr != "N")){
			if((issuedWtMain + data.stoneUsedWt)  < (data.usedWt + data.returnedWt + data.breakageReceived + data.breakageNotReceived) ){
				validation = false;	
				$.growl.error({ message: "For Acc Srl "+data.accSrNo+" ensure sum of Issued Wt & Order Item Acc Used Wt should be greater than equal to sum of Used. Wt., Retd. Wt., Break.Rec.Wt. & Break.Not Rec.Wt. ", duration: 10000, title: 'Error' });
				return false;
			}
		} else if((null != data.usedPcs && null == data.usedWt) || (null != data.usedWt && null == data.usedPcs) || (null != data.usedPcs && 0 < data.usedPcs && 0 == data.usedWt) || (null != data.usedWt && 0 < data.usedWt && 0 == data.usedPcs)){
			validation = false;	
			return false;
		}else if((null != data.bulkPcs && null == data.bulkWt ) || (null != data.bulkWt && null == data.bulkPcs) || (null != data.bulkPcs && 0 < data.bulkPcs && 0 == data.bulkWt ) || (null != data.bulkWt && 0 < data.bulkWt && 0 == data.bulkPcs)){
			validation = false;	
			return false;
		}else if((null != data.returnedPcs && null == data.returnedWt ) || (null != data.returnedWt && null == data.returnedPcs) || (null != data.returnedPcs && 0 < data.returnedPcs && 0 == data.returnedWt ) || (null != data.returnedWt && 0 < data.returnedWt && 0 == data.returnedPcs)){
			validation = false;	
			return false;
		}else if((null != data.breakageReceivedPcs && null == data.breakageReceived) || (null != data.breakageReceived && null == data.breakageReceivedPcs) || (null != data.breakageReceivedPcs && 0 < data.breakageReceivedPcs && 0 == data.breakageReceived) || (null != data.breakageReceived && 0 < data.breakageReceived && 0 == data.breakageReceivedPcs)){
			validation = false;	
			return false;
		}else if((null != data.breakageNotReceivedPcs && null == data.breakageNotReceived) || (null != data.breakageNotReceived && null == data.breakageNotReceivedPcs) || (null != data.breakageNotReceivedPcs && 0 < data.breakageNotReceivedPcs && 0 == data.breakageNotReceived) || (null != data.breakageNotReceived && 0 < data.breakageNotReceived && 0 == data.breakageNotReceivedPcs)){
			validation = false;	
			return false;
		}else if(data.isStock == "ST" && data.orderKind == "NO"  && data.suppliedBy != "V" && (parseFloat(NVL(issuedWtMain,0)) < NVL(otherWeight,0))){
			validation = false;
			return false;
		}else if((data.orderKind == "SRP" || data.orderKind == "RE_RWK") && data.suppliedBy != "V" && (parseFloat(NVL(data.usedWt,0)) > parseFloat(NVL(issuedWtMain,0)))){
			validation = false;
			return false;
		}else if((data.orderKind == "SRP" || data.orderKind == "RE_RWK") && data.suppliedBy != "V" && (parseFloat(NVL(otherthreeWeight, 0)) > ((parseFloat(NVL(data.accUsedWt,0)) + parseFloat(NVL(issuedWtMain,0))) - parseFloat(NVL(data.usedWt,0))))){
			validation = false;
			return false;
		}else if(parseFloat(NVL(issuedWtMain,0)) > 0 && (parseFloat(NVL(issuedWtMain,0)) != NVL(otherWeight,0)) && data.suppliedBy != "V" && data.isStock != "ST"){
			$.growl.error({	message : "Acc " + data.accSrNo  + " Isssued wt should be equal to (used + return wt + breakageReceived + breakageNotReceived)." ,	duration : 5000,title : 'Error'	});
			validation = false;
			return false;
		}else if((data.suppliedBy == "CO" || data.suppliedBy == "V") && data.accCostRange == null ||  data.accCostRange == "null" ){
			console.log(data.accCostRange);
			console.log(typeof data.accCostRange);
				validation = false;	
				$("#saveGRFGNew").prop('disabled',true);
				$.growl.error({ message: "For Acc Srl "+data.accSrNo+" Cost Range is Mandatory !!", duration: 10000, title: 'Error' });
				return false;
		}else{
			$("#saveGRFGNew").prop('disabled',false);
		}
	}
	
	if(!validation){
		$.growl.error({ message: "For Accessory ensure both PCS and Wt is entered where applicable", duration: 10000, title: 'Error' });
		return false;
	}
	
	return validation;
	
}

// Check mandatory validation.
var grFGDMandatoryFieldValidation = function(row) {
	var netWt =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'netWt');
	var costCode =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costCode');
	var costWt =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costWastageWT');
	var costMC =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'costMC');
	var sellMC =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'sellMC');
	var orderType =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'orderType');
	var orderKind =  $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'orderKind');
if (costCode == "T" && (costMC == null || costMC == 0)) { $.growl.error({ message: "Cost MC can not be zero.", duration: 10000, title: 'Error' });	return false;}
	if(orderKind != "CSP" || orderKind != "SSP"){
		if (null == netWt ||  null == costMC) { $.growl.error({ message: "Please ensure PSR, Article code, PCS, G/N Wt are entered.", duration: 10000, title: 'Error' });	return false;}
		else if(null == costCode){	$.growl.error({ message: "Please select costCode.", duration: 10000, title: 'Error' });	return false;}
		else if(null != costCode && "M" == costCode && (costWt == 0 && costMC == 0)){ 	$.growl.error({ message: "Data not found for selected Cost Code. Please select correct code or delete record", duration: 10000, title: 'Error' });	return false; }
		else if(null != costCode && ("T" == costCode) && sellMC == 0){$.growl.error({ message: "Data not found for selected Cost Code. Please select correct code or delete record", duration: 10000, title: 'Error' });	return false; }
		else if(!grStoneDetailsValidation(orderType, row)){return false;}
		else if(!grAccDetailsValidation(orderType, row)){return false;}
		
	}
	return true;
	
}

// Calculate company stone cost.
var calculateCompanyStoneCost = function(stoneDatails){
	
	if(null != stoneDatails){
		for(var i=0; i<stoneDatails.length; i++){
			
			if("CU" == stoneDatails[i].suppliedBy ){				
				var stoneCost = null;				
				var uom = stoneDatails[i].uom;
				var usedWt = stoneDatails[i].usedWt;
				var bulkWt = stoneDatails[i].bulkWt;
				var usedPcs = stoneDatails[i].usedPcs;
				var bulkPcs = stoneDatails[i].bulkPcs;
				var stpmeCostRateEdit = stoneDatails[i].stoneCostRate;
				
				("Pcs" == uom) ? stoneCost = (usedPcs+bulkPcs)*stpmeCostRateEdit : stoneCost = (usedWt+bulkWt)*stpmeCostRateEdit;
				stoneCost = stoneCost.toFixed(2);
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', i+1, "stoneCost", parseFloat(stoneCost));
			}
			
		}
	}
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

// Check validate as per used wt in stone/acc
var chekUsedWtValidate = function(row){
	var grSrlNo = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'srl');
	var grossWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'grossWt');
	var netWt = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'netWt');
	var awCount = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'awCount');
	grossWt = grossWt.toFixed(3);
	netWt = netWt.toFixed(3);
	var diffGrNetWt = parseFloat(grossWt) - parseFloat(netWt);
	var validateMain = false;
	var stoneRows = $("#stoneDetailsGrid").jqxGrid('getrows');
	var accRows = $("#accDetailsGrid").jqxGrid('getrows');
	
	var totalWt = 0;
	var totalWtAcc = 0;
	
	if(typeof stoneRows != "undefined" || stoneRows.length > 0){
			for(var i=0; i<stoneRows.length; i++){
				if(stoneRows[i].srl == grSrlNo){
					var uom = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'uom');
					var suppliedBy = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'suppliedBy');
					var usedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'usedWt');
					var bulkWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'bulkWt');
					var issuedWStone = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'issuedWt');
					var usedPcs = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'usedPcs');
					var isStockStone = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'isStock');
					var orderKindStone = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'orderKind');
					var costRange = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'costRange');
					var returnedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'returnedWt');
					var breakageReceived = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'breakageReceived');
					var breakageNotReceived = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'breakageNotReceived');
					var category = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'category');
					var earlierUsedWt = $("#stoneDetailsGrid").jqxGrid('getcellvalue', i, 'stoneUsedWt');
					var earlierBulkWt = $("#stoneDetailsGrid").jqxGrid('getcellvalue', i, 'stoneBulkWt');
					var earlierUsedPcs = $("#stoneDetailsGrid").jqxGrid('getcellvalue', i, 'stoneUsedPcs');
					
					var orderType = $("#stoneDetailsGrid").jqxGrid('getcellvalue', i, 'isStock');
					var isRwk = $("#stoneDetailsGrid").jqxGrid('getcellvalue', i, 'isRwk');
					var returnStoneCostPrice = $("#stoneDetailsGrid").jqxGrid('getcellvalue', i, 'returnStoneCostPriceAct');
					var returnStoneSellingPrice = $("#stoneDetailsGrid").jqxGrid('getcellvalue', i, 'returnStoneSellingPriceAct');
					
					if(typeof earlierUsedWt == "undefined" || earlierUsedWt == null || earlierUsedWt == ""){earlierUsedWt = 0;}
					if(typeof earlierBulkWt == "undefined" || earlierBulkWt == null || earlierBulkWt == ""){earlierBulkWt = 0;}					
					
					var sellingRate = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'sellingRate');
					
					var bulkWtVal, returnedWtVal, breakageReceivedVal, breakageNotReceivedVal, usedWtVal;
					if(usedWt == null || usedWt == ""){	usedWtVal = 0;}else{usedWtVal = usedWt;	}
					if((suppliedBy == "V" || suppliedBy == "CU")){ bulkWtVal = 0;}else{	(bulkWt != null) ? bulkWtVal = parseFloat(bulkWt) : bulkWtVal = 0;}
						
					(returnedWt != null) ?  returnedWtVal = parseFloat(NVL(returnedWt,0)) : returnedWtVal = 0;
					(breakageReceived != null) ? breakageReceivedVal = parseFloat(NVL(breakageReceived,0)) : breakageReceivedVal = 0;
					(breakageNotReceived != null) ? breakageNotReceivedVal = parseFloat(NVL(breakageNotReceived,0)) : breakageNotReceivedVal = 0;
					var otherCostStone = NVL(returnedWtVal,0)  + NVL(breakageReceivedVal,0) + NVL(breakageNotReceivedVal,0);		
					
					var earlierLeftStone = ((parseFloat(NVL(issuedWStone,0))-parseFloat(NVL(usedWtVal,0))) + (parseFloat(NVL(earlierUsedWt,0)) + parseFloat(NVL(earlierBulkWt,0)))) - parseFloat(NVL(otherCostStone,0));
					var earlierLeftStoneVendor = (parseFloat(NVL(earlierUsedWt,0))  - parseFloat(NVL(otherCostStone,0)));
					
					if(typeof otherCostStone == "undefined" || otherCostStone == null || otherCostStone == ""){otherCostStone = 0;}
					
					if(isRwk == true || orderKindStone == "SRP" || orderKindStone == "RE_RWK" || orderKindStone == "NO_RWK"  || awCount > 0){
						if(suppliedBy == "CU" || suppliedBy == "CO"){
							if(uom == "Cts" || "Gms"){
								var returnStoneCost = ((parseFloat(NVL(earlierUsedWt,0)) - parseFloat(NVL(earlierLeftStone,0))) * parseFloat(NVL(returnStoneCostPrice,0))) / parseFloat(NVL(earlierUsedWt,0));
								var returnStoneSellingPrice = (parseFloat(NVL(earlierUsedWt,0)) - parseFloat(NVL(earlierLeftStone,0))) * parseFloat(NVL(returnStoneSellingPrice,0)) / parseFloat(NVL(earlierUsedWt,0));
							}else{
								var returnStoneCost = ((parseFloat(NVL(earlierUsedWt,0)) - parseFloat(NVL(earlierLeftStone,0))) * parseFloat(NVL(returnStoneCostPrice,0))) / parseFloat(NVL(earlierUsedPcs,0));
								var returnStoneSellingPrice = (parseFloat(NVL(earlierUsedWt,0)) - parseFloat(NVL(earlierLeftStone,0))) * parseFloat(NVL(returnStoneSellingPrice,0)) / parseFloat(NVL(earlierUsedPcs,0));
							}
							
							$('#stoneDetailsGrid').jqxGrid('setcellvalue', i, 'returnStoneCostPrice', returnStoneCost);
							$('#stoneDetailsGrid').jqxGrid('setcellvalue', i, 'returnStoneSellingPrice', returnStoneSellingPrice);
						}						
						
						if(suppliedBy == "V"){
						
							if(uom == "Cts" || "Gms"){ 
								var returnStoneCost = ( parseFloat(NVL(otherCostStone,0)) * parseFloat(NVL(returnStoneCostPrice,0)))/ parseFloat(NVL(earlierUsedWt,0));
								var returnStoneSellingPrice = (parseFloat(NVL(otherCostStone,0)) * parseFloat(NVL(returnStoneSellingPrice,0))) / parseFloat(NVL(earlierUsedWt,0));
							}else{
								var returnStoneCost = ( parseFloat(NVL(otherCostStone,0)) * parseFloat(NVL(returnStoneCostPrice,0)))/ parseFloat(NVL(earlierUsedPcs,0));
								var returnStoneSellingPrice = (parseFloat(NVL(otherCostStone,0)) * parseFloat(NVL(returnStoneSellingPrice,0))) / parseFloat(NVL(earlierUsedPcs,0));
						
							}
							
							$('#stoneDetailsGrid').jqxGrid('setcellvalue', i, 'returnStoneCostPrice', returnStoneCost);
							$('#stoneDetailsGrid').jqxGrid('setcellvalue', i, 'returnStoneSellingPrice', returnStoneSellingPrice);
						}
					}
					
					
					if((orderKindStone == "SRP" || orderKindStone == "RE_RWK") && (parseFloat(earlierUsedWt) != 0 || parseFloat(earlierBulkWt) != 0)){				
						if(suppliedBy == "V" ){var earlierLeftStoneNew = parseFloat(NVL(earlierLeftStoneVendor,0));}else{var earlierLeftStoneNew = parseFloat(NVL(earlierLeftStone,0));}
						if(uom == "Cts"){
							totalWt += (parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(bulkWtVal,0)) + parseFloat(NVL(earlierLeftStoneNew,0))) *0.2;
						}else{
							totalWt += parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(bulkWtVal,0)) + parseFloat(NVL(earlierLeftStoneNew,0));
						}
					}else if(suppliedBy != "V" && isStockStone == "CU" && (orderKindStone == "NO" || orderKindStone == "CRP" || orderKindStone == "RE_RWK") && (isRwk == true || isRwk == "true" || awCount > 0)){							
						if(uom == "Cts"){
							totalWt += (parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(bulkWtVal,0)) + parseFloat(NVL(earlierLeftStone,0))) *0.2;
						}else{
							totalWt += parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(bulkWtVal,0)) + parseFloat(NVL(earlierLeftStone,0));
						}
					}else if(suppliedBy == "V" && isStockStone == "CU" && (orderKindStone == "NO" || orderKindStone == "CRP" || orderKindStone == "RE_RWK") && (isRwk == true || isRwk == "true" || awCount > 0)){							
						if(uom == "Cts"){
							totalWt += (parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(earlierLeftStoneVendor,0))) *0.2;
						}else{
							totalWt += parseFloat(NVL(usedWtVal,0)) +  parseFloat(NVL(earlierLeftStoneVendor,0));
						}
					}else{
						if(uom == "Cts"){
							totalWt += (parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(bulkWtVal,0))) *0.2;
						}else{
							totalWt += parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(bulkWtVal,0));
						}
						
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', i, 'returnStoneCostPrice', 0.00);
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', i, 'returnStoneSellingPrice', 0.00);
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', i, 'retStoneCost', 0.00);
					}
					
						
				}
			}
			
		}
		
	
		// For Accessorry Grid
		if(typeof accRows != "undefined" || accRows.length > 0){
			for(var i=0; i<accRows.length; i++){
				if(accRows[i].srl == grSrlNo){
					var uom = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'uom');
					var suppliedBy = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'suppliedBy');
					var usedWt = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'usedWt');
					var usedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'usedPcs');
					var returnedWt = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'returnedWt');
					var breakageReceived = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'breakageReceived');
					var breakageNotReceived = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'breakageNotReceived');
					
					var returnedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'returnedPcs');
					var breakageReceivedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'breakageReceivedPcs');
					var breakageNotReceivedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'breakageNotReceivedPcs');
					
					var issuedWtAcc = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'issuedWt');
					var issuedPcsAcc = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'issuedPcs');
					var isStock = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'isStock');
					var orderKind = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'orderKind')
					var orderType = $("#stoneDetailsGrid").jqxGrid('getcellvalue', i, 'isStock');					
					var earlierAccUsedWt = $("#accDetailsGrid").jqxGrid('getcellvalue', i, 'accUsedWt');		
					var earlierAccUsedPcs = $("#accDetailsGrid").jqxGrid('getcellvalue', i, 'accUsedPcs');
					var isRwk = $("#accDetailsGrid").jqxGrid('getcellvalue', i, 'isRwk');
					var returnAccCostPrice = $("#accDetailsGrid").jqxGrid('getcellvalue', i, 'returnAccCostPriceAct');
					var returnAccSellingPrice = $("#accDetailsGrid").jqxGrid('getcellvalue', i, 'returnAccSellingPriceAct');
					
					if(typeof earlierAccUsedWt == "undefined" || earlierAccUsedWt == null || earlierAccUsedWt == ""){earlierAccUsedWt = 0;}
					var  returnedWtVal, breakageReceivedVal, breakageNotReceivedVal,usedWtVal;

					if(usedWt == null || usedWt == ""){
						usedWtVal = 0.00;
					}else{
						usedWtVal = usedWt;
					}
					
					if(usedPcs == null || usedPcs == ""){
						usedPcsVal = 0.00;
					}else{
						usedPcsVal = usedPcs;
					}
					
					var otherCostAcc = parseFloat(NVL(returnedWt,0))  + parseFloat(NVL(breakageReceived,0)) + parseFloat(NVL(breakageNotReceived,0));		
					var earlierLeftAcc = ((parseFloat(NVL(issuedWtAcc,0))-parseFloat(NVL(usedWtVal,0))) + (parseFloat(NVL(earlierAccUsedWt,0)))) - parseFloat(NVL(otherCostAcc,0));
					
					// change wt to pcs
					var otherCostPcsAcc = parseFloat(NVL(returnedPcs,0))  + parseFloat(NVL(breakageReceivedPcs,0)) + parseFloat(NVL(breakageNotReceivedPcs,0));		
					var earlierLeftAccPcs = ((parseFloat(NVL(issuedPcsAcc,0))-parseFloat(NVL(usedPcsVal,0))) + (parseFloat(NVL(earlierAccUsedPcs,0)))) - parseFloat(NVL(otherCostPcsAcc,0));
					
					
					var earlierLeftAccVendor = (parseFloat(NVL(earlierAccUsedWt,0))  - parseFloat(NVL(otherCostAcc,0)));
					
					
					if(isRwk == true || orderKind == "SRP" || orderKind == "RE_RWK" || orderKind == "NO_RWK" || awCount > 0){
						if(suppliedBy == "CU" || suppliedBy == "CO"){
							var returnAccCostPrice = ((parseFloat(NVL(earlierAccUsedPcs,0)) - parseFloat(NVL(earlierLeftAccPcs,0))) * parseFloat(NVL(returnAccCostPrice,0))) / parseFloat(NVL(earlierAccUsedPcs,0));							
							var returnAccSellingPrice = ((parseFloat(NVL(earlierAccUsedPcs,0)) - parseFloat(NVL(earlierLeftAccPcs,0))) * parseFloat(NVL(returnAccSellingPrice,0))) / parseFloat(NVL(earlierAccUsedPcs,0));
							
							$('#accDetailsGrid').jqxGrid('setcellvalue', i, 'returnAccCostPrice', returnAccCostPrice);
							$('#accDetailsGrid').jqxGrid('setcellvalue', i, 'returnAccSellingPrice', returnAccSellingPrice);
						}
						
						if(suppliedBy == "V"){
							
							var returnAccCostPrice = (parseFloat(NVL(otherCostPcsAcc,0))  * parseFloat(NVL(returnAccCostPrice,0)))/ parseFloat(NVL(earlierAccUsedPcs,0));
							var returnAccSellingPrice = (parseFloat(NVL(otherCostPcsAcc,0)) * parseFloat(NVL(returnAccSellingPrice,0)))/ parseFloat(NVL(earlierAccUsedPcs,0));
							
							$('#accDetailsGrid').jqxGrid('setcellvalue', i, 'returnAccCostPrice', returnAccCostPrice);
							$('#accDetailsGrid').jqxGrid('setcellvalue', i, 'returnAccSellingPrice', returnAccSellingPrice);
						}
					}
					
					
					(returnedWt != null) ?  returnedWtVal = parseFloat(NVL(returnedWt,0)) : returnedWtVal = 0.00;
					(breakageReceived != null) ? breakageReceivedVal = parseFloat(NVL(breakageReceived,0)) : breakageReceivedVal = 0.00;
					(breakageNotReceived != null) ? breakageNotReceivedVal = parseFloat(NVL(breakageNotReceived,0)) : breakageNotReceivedVal = 0.00;
					var otherCostAcc = NVL(returnedWtVal,0)  + NVL(breakageReceivedVal,0) + NVL(breakageNotReceivedVal,0);
					
					if(typeof otherCostAcc == "undefined" || otherCostAcc == null || otherCostAcc == ""){otherCostAcc = 0;}
					
						if((orderKind == "SRP" || orderKind == "RE_RWK") && parseFloat(earlierAccUsedWt) != 0){
							if(suppliedBy == "V" ){var earlierLeftAccNew = parseFloat(NVL(earlierLeftAccVendor,0));}else{var earlierLeftAccNew = parseFloat(NVL(earlierLeftAcc,0));}
							
							if(uom == "Cts"){
								totalWtAcc += (parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(earlierLeftAccNew,0))) *0.2;
							}else{
								totalWtAcc += parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(earlierLeftAccNew,0));
							}
						}else if(suppliedBy != "V" && isStock == "CU" && (orderKind == "NO" || orderKind == "CRP" || orderKind == "RE_RWK") && (isRwk == true || isRwk == "true" || awCount > 0)){							
							if(uom == "Cts"){
								totalWtAcc += (parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(earlierLeftAcc,0))) *0.2;
							}else{
								totalWtAcc += parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(earlierLeftAcc,0));
							}
						}else if(suppliedBy == "V" && isStock == "CU" && (orderKind == "NO" || orderKind == "CRP" || orderKind == "RE_RWK") && (isRwk == true || isRwk == "true" || awCount > 0)){							
							if(uom == "Cts"){
								totalWtAcc += (parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(earlierLeftAccVendor,0))) *0.2;
							}else{
								totalWtAcc += parseFloat(NVL(usedWtVal,0)) + parseFloat(NVL(earlierLeftAccVendor,0));
							}
						}else{
							if(uom == "Cts"){
								totalWtAcc +=  parseFloat(NVL(usedWtVal,0)) *0.2;
							}else{
								totalWtAcc +=  parseFloat(NVL(usedWtVal,0));
							}
							
							$('#accDetailsGrid').jqxGrid('setcellvalue', i, 'returnAccCostPrice', 0.00);
							$('#accDetailsGrid').jqxGrid('setcellvalue', i, 'returnAccSellingPrice', 0.00);
							$('#accDetailsGrid').jqxGrid('setcellvalue', i, 'retAccCost', 0.00);
						}
					
				
				}
				
			}
			
		}
		
		var totalWtNoDecimal = parseFloat(NVL(totalWt,0)) + parseFloat(NVL(totalWtAcc,0));
		
		diffGrNetWt = parseFloat(diffGrNetWt).toFixed(3);
		toleranceLimits = parseFloat(toleranceLimits).toFixed(3);
		totalWt = totalWt.toFixed(3);
		totalWtAcc = totalWtAcc.toFixed(3);
		var total = parseFloat(NVL(totalWt,0)) + parseFloat(NVL(totalWtAcc,0));
		
		var expNetWt = parseFloat(NVL(grossWt,0)) -  parseFloat(NVL(total,0));
		expNetWt = expNetWt.toFixed(3);
		var diffGrNetWtPlus = parseFloat(expNetWt) + parseFloat(toleranceLimits);
		var diffGrNetWtMinus = parseFloat(expNetWt) - parseFloat(toleranceLimits);
		diffGrNetWtPlus = diffGrNetWtPlus.toFixed(3);
		diffGrNetWtMinus = diffGrNetWtMinus.toFixed(3);
		console.log(totalWtNoDecimal);
		
		console.log(diffGrNetWt);
		console.log(earlierUsedWt);
		
		var euWtinCts = parseFloat(earlierUsedWt/5).toFixed(3);

		if(stoneRows.length == 0 && accRows.length == 0 && parseFloat(diffGrNetWt) == 0){
			validateMain = true;
		}else if((usedWt == earlierUsedWt) && (usedPcs == earlierUsedPcs) && (isRwk == true)){
			validateMain = false;
			//$.growl.error({	message : "Enough Stones are not there for Rework please do Stone Movement", duration : 10000,title : 'Error'});
			return false;
		}
	
		else if((diffGrNetWt == euWtinCts) && (uom == "Cts") && (isRwk == true)){
			if(usedWt > 0){
				validateMain = false;
				return false;
			}else{
				validateMain = true;
			}
			//$.growl.error({	message : "Enough Stones are not there for Rework please do Stone Movement", duration : 10000,title : 'Error'});
		}
		else if(parseFloat(NVL(totalWtNoDecimal,0)) != 0 && (stoneRows.length != 0 || accRows.length != 0) && (parseFloat(NVL(netWt,0)) >= parseFloat(NVL(diffGrNetWtMinus,0)) &&  parseFloat(NVL(netWt,0)) <= parseFloat(NVL(diffGrNetWtPlus,0)))){
			if(parseFloat(NVL(grossWt,0)) == parseFloat(NVL(netWt,0))){
				validateMain = false;
				$.growl.error({	message : "Expected net wt is " + expNetWt , duration : 10000,title : 'Error'});
				return false;
			}else{
				validateMain = true;				
			}
			
		}else if(parseFloat(NVL(total,0)) == 0 && (parseFloat(total) == parseFloat(diffGrNetWt))  && (stoneRows.length != 0 || accRows.length != 0)){
			validateMain = true
		}else{
			validateMain = false;
		}
		
	return validateMain;
}

var updateStoneAccHC = function(grSrNo){
	var stoneRows = $("#stoneDetailsGrid").jqxGrid('getrows');
	var accRows = $("#accDetailsGrid").jqxGrid('getrows');
	var rowData = $("#grDetailsGrid").jqxGrid('getrowdata', (grSrNo-1));
	
	if(stoneRows != "undefined" && null != stoneRows && stoneRows.length > 0){		
		for(var i=0; i<stoneRows.length; i++){
			 if(grSrNo == stoneRows[i].srl){
				var uom = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'uom');
				var usedPcs =  $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'usedPcs');
				var usedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'usedWt');
				var stoneHC = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'stoneHC');
				var suppliedBy = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'suppliedBy');
				var stoneHCEdited = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'stoneHCEdited');
				var actStoneHC = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'actStoneHC');
				if(uom == "Pcs") {
					var stoneHCAct = (NVL(actStoneHC,0) * NVL(usedPcs,0));
				}else{
					var stoneHCAct = (NVL(actStoneHC,0) * NVL(usedWt,0));
				}
				  if(suppliedBy != "V" && (stoneHCEdited != stoneHCAct)){
					  (uom == "Pcs") ? $('#stoneDetailsGrid').jqxGrid('setcellvalue', i,'stoneHC', (NVL(usedPcs,0) * NVL(stoneHC,0))) : $('#stoneDetailsGrid').jqxGrid('setcellvalue', i,'stoneHC', (NVL(usedWt,0) * NVL(stoneHC,0)));
					  (uom == "Pcs") ? $('#stoneDetailsGrid').jqxGrid('setcellvalue', i,'stoneHCEdited', (NVL(usedPcs,0) * NVL(stoneHC,0))) : $('#stoneDetailsGrid').jqxGrid('setcellvalue', i,'stoneHCEdited', (NVL(usedWt,0) * NVL(stoneHC,0)));
				  }
			  }
		}
		
	}
	
	if(accRows != "undefined" && null != accRows && accRows.length > 0){		
		for(var i=0; i<accRows.length; i++){
			 if(grSrNo == accRows[i].srl){
				var uom = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'uom');
				var usedPcs =  $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'usedPcs');
				var usedWt = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'usedWt');
				var accHC = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'accHC');
				var suppliedBy = $('#accDetailsGrid').jqxGrid('getcellvalue', i, 'suppliedBy');
				if(suppliedBy != "V"){
					(uom == "Pcs") ? $('#accDetailsGrid').jqxGrid('setcellvalue', i,'accHC', (NVL(usedPcs,0) * NVL(accHC,0))) : $('#accDetailsGrid').jqxGrid('setcellvalue', i,'accHC', (NVL(usedWt,0) * NVL(accHC,0)));
				}
			 }
		}
		
	}
}

// Validate GR line item.
var validateGRFGDetails = function(row){
	debugger;
	var attributDet = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'attributes');
	var selectedrowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var isValid = $('#grDetailsGrid').jqxGrid('getcellvalue', row, 'isValid');
	var details = $("#grDetailsGrid").jqxGrid('getrowdata', row);
	var stoneRows = $("#stoneDetailsGrid").jqxGrid('getrows');
	var masterRows = $("#grDetailsGrid").jqxGrid('getrows');
	
	var gWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'grossWt');
	var nWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'netWt');
	var pcs = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'pcs');
	var orderType = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'orderType');
	var orderKind = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'orderKind');
	var pureRate = $("#pureRate").val();
	
	//var isspcs = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'usedPcs');
	
	//updateStoneAccHC((row+1));
	
	if(orderKind == "CSP" || orderKind == "SSP"){
		details['isValid'] = true;
	}else{
		if(attributDet == null) { $.growl.error({ message: "attributes Detail is mandatory!", duration: 5000, title: 'Error' }); return false;}
		
	}
	var psr = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'psr');
	
	var costWastageWT = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costWastageWT');
	var costMC = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costMC');
	var costCode = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'costCode');
	
	var sellWastageWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'sellWastageWt');
	var sellMC = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'sellMC');

	//pcsNotMorePending(row);//Venkat Changes on 06-10-2021 If Any Impact please uncomment and check
	
	var totalWtCost = (parseFloat(costWastageWT)*pureRate) + parseFloat(costMC);
	var totalWtSell = (parseFloat(sellWastageWt)*pureRate) + parseFloat(sellMC);
	if(totalWtCost > totalWtSell){details['isValid'] = false; $.growl.error({ 	 message: "(Cost Wastage+Cost MC) can not be more than (Sell Wastage+Sell MC).", duration: 10000, title: 'Error' }); return false;}
//	if(costMC > sellMC){$.growl.error({ message: "Cost MC can not be more than Sell MC.", duration: 10000, title: 'Error' });return false;}
	if(costWastageWT < 0 || costMC < 0 || sellWastageWt < 0 || sellMC < 0){
		details['isValid'] = false;
		$.growl.error({ message: "Cost Wastage WT, Cost MC, Sell Wastage Wt and Sell MC value can not be negetive.", title: 'Error' });
		return false;
	}
	
	if(pcs <= 0){
		details['isValid'] = false;
		$.growl.error({ message: "Pcs should be more than 0", title: 'Error' });
		return false;
	}
	
	var attributes = $('#grDetailsGrid').jqxGrid ('getcellvalue', row, 'attributes');
	var stoneRows = $('#stoneDetailsGrid').jqxGrid ('getrows');
	var accRows = $('#accDetailsGrid').jqxGrid ('getrows');
	if(attributes != "True" && (orderKind != "CSP" && orderKind != "SSP")){
		details['isValid'] = false;
		$.growl.error({ message: "Please select mandatory fields in attributes.", duration: 10000, title: 'Error' });
		return false;
	
	}

	var diffWT = parseFloat(gWt) - parseFloat(nWt);
	diffWT = diffWT.toFixed(3);
	toleranceLimits = parseFloat(toleranceLimits).toFixed(3);
	
	
	if((gWt == nWt) && gWt != null && nWt != null && (details.isValid == false || details.isValid == "false")){	
		console.log(costCode);
		if((costCode != null && costCode != "" && costCode != "R") && (totalWtCost < totalWtSell)  && attributes == "True"  && (stoneRows.length == 0 || typeof stoneRows == "undefined") && (accRows.length == 0 || typeof accRows == "undefined")){
			details['isValid'] = true;		
		}
		
		if((costCode != null && costCode != "" && costCode == "R")  && attributes == "True"  && (stoneRows.length == 0 || typeof stoneRows == "undefined") && (accRows.length == 0 || typeof accRows == "undefined")){
			details['isValid'] = true;		
		}
	}
	
	
	console.log(details.isValid);
	
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
				//calculateCompanyStoneCost(details.stoneList);
			}else{
				$.growl.error({ message: "Used/Bulk (Stone + Accessory) should be equal to (Difference of G/N Wt + Tolerance)", duration: 10000, title: 'Error' });
				return false;
			}
		}else{
			$.growl.error({ message: "Used/Bulk (Stone + Accessory) should be equal to (Difference of G/N Wt + Tolerance)", duration: 10000, title: 'Error' });
			return false;
		}
	}
}

// Pcs editable or not with condition
var pcsEditable = function(row){
	var orderType = $("#grDetailsGrid").jqxGrid('getcellvalue', row, 'orderType');
	var orderKind = $("#grDetailsGrid").jqxGrid('getcellvalue', row, 'orderKind');
	var psr = $("#grDetailsGrid").jqxGrid('getcellvalue', row, 'psr');
	if(psr != "N" && (orderKind != "NO" && ( orderType == "CU" || orderType == "ST")) || (orderKind == "CSP" || orderKind == "SSP")){
		return false;		
	}else{
		return true;
	}
	
	
}

var updateOchnageSetSellingPrice = function(row){
	var orderKind = $("#grDetailsGrid").jqxGrid('getcellvalue', row, 'orderKind');
	if(orderKind == "CSP" || orderKind == "SSP"){return false;}
}

// Gross wt & Net wt field editable or not as per condition.
var grWtNetWtEditable = function(row){
	var orderKind = $("#grDetailsGrid").jqxGrid('getcellvalue', row, 'orderKind');
	if(orderKind == "CSP" || orderKind == "SSP"){return false;}
}

var clonerow = function (grSrlNo) {	
	
    var child = new Object(); 
    var row = {};
	var selectedrowindex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var id = $("#grDetailsGrid").jqxGrid('getrowid', selectedrowindex);
	var data = $('#grDetailsGrid').jqxGrid('getrowdatabyid', id);
	
	
	//var row = data;
	child.srl = grSrlNo;
	child.psr = data.psr;
    child.psrNos = data.psrNos;
    child.articleCode = data.articleCode;
    child.jwlType = data.jwlType;
    child.jwType = data.jwType;
    child.articleDesc = data.articleDesc;
    child.pcs = data.pcs;
    child.grossWt = data.grossWt;
    child.netWt = data.netWt;
    
    child.costCode = data.costCode;
    child.costCodes = data.costCodes;
    child.costWastageWT = data.costWastageWT;
    child.costMC = data.costMC;
    child.setSellingPrice = data.setSellingPrice;
    child.sellWastageWt = data.sellWastageWt;
    child.sellMC = data.sellMC;
    child.attributes = data.attributes;
    child.photo = data.photo;
    child.viewDesign = data.viewDesign;
    child.provisional = data.provisional;
    child.hallMarkCharges = data.hallMarkCharges;
    child.isValid = data.isValid;
    child.hsnMasterId = data.hsnMasterId;
    child.hsnMasterCode = data.hsnMasterCode;
    child.reason = data.reason;
    child.reason = data.reason;
    child.reason = data.reason;   
    child.countStone = data.countStone;
    child.countAcc = data.countAcc;
    child.isRwk = data.isRwk;
    
    child.isDueDtFlag = data.isDueDtFlag;
    child.pendingPcs = data.pendingPcs;
    child.isPair = data.isPair;
    child.segmentId = data.segmentId;
    child.segmentCode = data.segmentCode;
    child.actcostWastageWt = data.actcostWastageWt;
    child.actcostMC = data.actcostMC;
    child.actsellWastageWt = data.actsellWastageWt;
    child.actsellMC = data.actsellMC;
    child.metalValue = data.metalValue;
    
    child.wastageValue = data.wastageValue;
    child.selling_price = data.selling_price;
    child.stoneList = data.stoneList;
    child.accessoryList = data.accessoryList;
    child.attrLength = data.attrLength;
    child.size = data.size;
    child.height = data.height;
    child.diameter = data.diameter;
    child.width = data.width;
    child.vendorArticle = data.vendorArticle;
    child.combinationId = data.combinationId;
    child.stoneCombId = data.stoneCombId;
    child.metalColor = data.metalColor;
    child.hookType = data.hookType;
    child.screwType = data.screwType;
    child.loopType = data.loopType;
    child.polishType = data.polishType;    
    child.settingType = data.settingType;    
    child.collectionName = data.collectionName;   
    child.orderKind = data.orderKind;
    child.orderType = data.orderType;
    child.metalTypeId = data.metalTypeId;
    child.storeId = data.storeId;
    child.globalAttrFlag = data.globalAttrFlag;
    
	return child;
    
}

var validateCopyGrLine = function(){
	var copyData = [];
	var copyGrDetInput = $("#noCloneRow").val();
	var selectedrowindexGRDetailsGrid = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var psr = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'psr');
	var grossWt = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'grossWt');
	var netWt = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'netWt');
	var isValid = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'isValid');
	var rows = $("#grDetailsGrid").jqxGrid('getrows');
	var attributes = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'attributes');

	if(NVL(copyGrDetInput,"") == ""){
		$.growl.error({ message: "Please select no. of line to copy.", duration: 10000, title: 'Error' });
		return false;
	}if(copyGrDetInput > 250){
		$.growl.error({ message: "Max limit is 250 to copy lines.", duration: 10000, title: 'Error' });
		return false;
	}if(psr != "N"){
		$.growl.error({ message: "Copy is allowed only for NONE PSR.", duration: 10000, title: 'Error' });	return false;
	}if(parseFloat(grossWt) != parseFloat(netWt)){
		$.growl.error({ message: "Gross wt. & net wt. should be same.", duration: 10000, title: 'Error' });	return false;
	}if(NVL(attributes,"False") == "False"){
		$.growl.error({ message: "Attributes are mandatory.", duration: 10000, title: 'Error' });	return false;
	}if(isValid == false || isValid == "false"){
		$.growl.error({ message: "Line iten should be validate.", duration: 10000, title: 'Error' });	return false;
	}
	
	return true;

}

var updatePcsHallMark = function(row, datafield, columntype, oldvalue, newvalue, event){
	var rowData = $("#grDetailsGrid").jqxGrid('getrowdatabyid', row);        	
	var segmentCode =  jQuery('#grDetailsGrid').jqxGrid ('getCell', row, 'segmentCode');	    	
	var halmark= (newvalue * parseFloat(hallMarkCharges[rowData['segmentCode'].toUpperCase()]));        	
	$("#grDetailsGrid").jqxGrid('setcellvalue', row, "hallMarkCharges", halmark);        	
	$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid", false);
	
}

// Hall Mark charges Editable or not
var hallmarkEditable = function(row){
	var orderType = $("#grDetailsGrid").jqxGrid('getcellvalue', row, 'orderType');
	var orderKind = $("#grDetailsGrid").jqxGrid('getcellvalue', row, 'orderKind');
	if(orderKind == "CSP" || orderKind == "SSP"){return false;} else{return true;}
}

// GR Main Grid.
var grDetailsList = function(data){		
		// Validate with stone and accessory grid.
		var checkValidate = function(row, column, value){
			return '<div class="text-center"><button style="margin-top: 3px;" class="btn btn-sm btn-primary" onclick="validateGRFGDetails('+ row +');" data-toggle="modal" type="button" /><i class="fa fa-check fa-lg"></i></button></div>';
		}
		
		// PSR Type Array
		var psrTypeSource = {datatype : 'json', datafields : [{name : 'id', type : 'String'}, {name : 'name', type : 'String'}],localdata : psrList};
		var psrTypeDataAdapter = new $.jqx.dataAdapter(psrTypeSource, {	autoBind : true });

		var source = {
			datafields : [ 
				{'name' : 'srl','type' : 'int'}, 
				{'name' : 'psrNos', value : 'psr','type' : 'string', values : {source : psrTypeDataAdapter.records, value : 'id',	name : 'name'}},  
				{'name' : 'articleCode','type' : 'string'}, 
				{'name' : 'jwlType','type' : 'string'}, 
				{'name' : 'articleDesc','type' : 'string'},
				{'name' : 'pcs','type' : 'int'}, 
				{'name' : 'grossWt','type' : 'float'}, 
				{'name' : 'netWt','type' : 'float'}, 
				{'name' : 'costCodes',value : 'costCode',values : {	source : vendorCostDataAdapter.records,	value : 'id',name : 'name'}},
				{'name' : 'costWastageWT','type' : 'double'}, 
				{'name' : 'costMC','type' : 'float'}, 
				{'name' : 'setSellingPrice','type' : 'boolean'}, 
				{'name' : 'sellWastageWt','type' : 'float'}, 
				{'name' : 'sellMC','type' : 'float'}, 
				{'name' : 'attributes','type' : 'string'}, 
				{'name' : 'photo','type' : 'string'}, 
				{'name' : 'viewDesign','type' : 'array'}, 
				{'name' : 'provisional','type' : 'boolean'}, 
				{'name' : 'hallMarkCharges','type' : 'float'}, 
				{'name' : 'isValid','type' : 'boolean'}, 
				
				{'name' : 'hsnMasterId','type' : 'int'},
				{'name' : 'hsnMasterCode','type' : 'string'}, 
				{'name' : 'reason','type' : 'string'},
				
				/* Hidden fields for GR  required for internal calculation */
				
				{'name' : 'countStone','type' : 'int'},
				{'name' : 'countAcc','type' : 'int'},
				{'name' : 'isRwk','type' : 'boolean'},
				{'name' : 'isDueDtFlag','type' : 'boolean'},
				{'name' : 'pendingPcs','type' : 'int'},
				{'name' : 'jwType','type' : 'string'},
				{'name' : 'isPair','type' : 'string'},
				{'name' : 'segmentId','type' : 'long'}, 
				{'name' : 'segmentCode','type' : 'string'}, 
				{'name' : 'actcostWastageWt','type' : 'double'},
				{'name' : 'actcostMC','type' : 'double'},
				{'name' : 'actsellWastageWt','type' : 'double'},
				{'name' : 'actsellMC','type' : 'double'},
				{'name' : 'metalValue','type' : 'double'},
				{'name' : 'wastageValue','type' : 'double'},
				{'name' : 'selling_price','type' : 'double'},
				{'name' : 'stoneList','type' : 'array'},
				{'name' : 'accessoryList','type' : 'array'},
				{'name' : 'attrLength','type' : 'string'},
				{'name' : 'size','type' : 'string'},
				{'name' : 'height','type' : 'string'},
				{'name' : 'diameter','type' : 'string'},
				{'name' : 'width','type' : 'string'},
				{'name' : 'vendorArticle','type' : 'string'},
				{'name' : 'combinationId','type' : 'string'},
				{'name' : 'stoneCombId','type' : 'int'},
				{'name' : 'metalColor','type' : 'string'},
				{'name' : 'hookType','type' : 'string'},
				{'name' : 'screwType','type' : 'string'},
				{'name' : 'loopType','type' : 'string'},
				{'name' : 'polishType',	'type' : 'string'},
				{'name' : 'settingType','type' : 'string'},
				{'name' : 'collectionName',	'type' : 'string'},
				{'name' : 'orderKind','type' : 'string'},
				{'name' : 'orderType','type' : 'string'},
				{'name' : 'metalTypeId','type' : 'long'},
				{'name' : 'storeId','type' : 'long'},
				{'name' : 'globalAttrFlag','type' : 'long'},
				{'name' : 'awCount','type' : 'long'}	,
				{'name' : 'apportionSellingMc','type' : 'long'}	,
				{'name' : 'apportionsellingWastageWt','type' : 'long'}			
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
			columnsheight : 50,
			theme: 'energyblue',
			columnsresize: true, 
			autoheight: false,
			altRows : false,
			height: '240px',
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
				
				container.append('<div class="col-md-4 row"><div style="margin-bottom:10px;"  id="addGRdetailsGrid" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i></div></div>');
				container.append('<div class="col-md-4"><div style="margin-bottom:10px; color:#00800; font-size:15px;"  id="orderTypeLabel" class="text-center">Create IGR Details</div></div>');	
				container.append('<div class="col-md-2"><input style="height:24px; float: left;" type="text" name="noCloneRow" class="form-control input-sm" id="noCloneRow" /><div style="margin-bottom:10px;" id="cloneGRdetailsGrid" class="btn btn-success btn-sm"><i class="fa fa-copy fa-md"></i></div></div>');
				container.append('<div class="col-md-2 pull-right"><div style="margin-bottom:10px;" id="deleteGRdetailsGrid" class="btn btn-danger btn-sm pull-right"><i class="fa fa-trash fa-md"></i></div></div>');
				
				$("#addGRdetailsGrid").jqxButton();
				$("#deleteGRdetailsGrid").jqxButton();
				$("#cloneGRdetailsGrid").jqxButton();
				
				// Clone GR rows
				$("#cloneGRdetailsGrid").on('click', function () {		
					
					
					var copyGrDetInput = $("#noCloneRow").val();
					
					if(validateCopyGrLine()){	
						$("#contentBar").show();
						var rowcount = $('#grDetailsGrid').jqxGrid('getdatainformation').rowscount;					    
						for(var i=0; i<copyGrDetInput; i++){
							var datarow = clonerow(rowcount +1);
							var commit = $("#grDetailsGrid").jqxGrid('addrow', null, datarow);
							rowcount = rowcount + 1;
							if(parseInt(rowcount)== parseInt(copyGrDetInput)){
								$("#contentBar").hide();
							}
						}
					}
				 });
				
				$("#addGRdetailsGrid").on('click', function() {
					if(chekcForInvalidGrDetails()){
					addGRDetailsRow();
					}
				});
				
				$("#deleteGRdetailsGrid").on('click', function() {
					deleteGrDetailsRow();
					var totalRows = $("#grDetailsGrid").jqxGrid('getrows');					
					var pureRateFlag = $("#pureRateFlag").val();					
					if((totalRows.length == 0 || typeof totalRows == "undefined") && (pureRateFlag == false || pureRateFlag == "false")){
						$("#pureRate").prop('disabled', false);
					}
				});
			},
			
			columns : [ 
				{text : 'Srl.', datafield : 'srl', width : '3%', cellsalign : 'center', align : 'center', editable : false}, 
				{ text  :'PSR No',datafield: 'psr','width' : '6%',cellsalign : 'center', align : 'center', editable : true, columntype : 'dropdownlist', displayfield : 'psrNos',
					createeditor : function(row, value, editor){
						editor.jqxDropDownList({
							source : psrTypeDataAdapter, displayMember : 'name', valueMember : 'id'
					});
					},
					cellvaluechanging: psrOnChange
				},
				{'text' : 'Art. Code',datafield : 'articleCode','width' : '6%',cellsalign : 'center',align:'center', cellbeginedit : addArticleCode},
				{'text' : 'J.Code',datafield : 'jwlType','width' : '5%',editable : false,cellsalign : 'center',align:'center'},  
				{'text' : 'Art. Desc.',datafield : 'articleDesc','width' : '7%',editable : false,cellsalign : 'center',align:'center'}, 
				{'text' : 'Pcs',datafield : 'pcs','width' : '3%', editable : true,cellsalign : 'center',align:'center',cellsformat: 'n', validation : pcsValidate, cellbeginedit: pcsEditable, cellvaluechanging: updatePcsHallMark},
				{'text' : 'Gr.Wt.',datafield : 'grossWt','width' : '5%',editable : true, createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput',cellsformat: 'd3',cellsalign : 'center',align:'center', validation : grWtValidate, cellvaluechanging: updateOnchangesGrossWt, cellbeginedit: grWtNetWtEditable},
				{'text' : 'Net Wt.',datafield : 'netWt','width' : '5%', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },editable : true,columntype : 'numberinput',cellsformat: 'd3',cellsalign : 'center',align:'center', validation : netWtValidate, cellvaluechanging: updateOnchangesNetWt, cellbeginedit: grWtNetWtEditable},
				{'text' : 'Cost Code',datafield : 'costCode','width' : '5%',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'costCodes',cellsalign : 'center',align:'center',createeditor : loadDropDownCostCode,cellvaluechanging: updateOnchangesCostCode, cellbeginedit: grCostCodeEditable},
				{'text' : 'Hall Mark',datafield : 'hallMarkCharges',editable : true,sortable : false,'width' : '5%',cellsformat: 'd2',columntype: 'numberinput',cellsalign : 'center',align:'center', validation : commonValidate, cellbeginedit : hallmarkEditable},
			    {'text' : 'Cost Wast Wt.','datafield' : 'costWastageWT','width' : '5%',sortable : false, createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype: 'numberinput',cellsformat: 'd3', validation : commonValidate,cellvaluechanging: updateOnchangesCostCode, cellbeginedit: grCostCodeEditable},
				{'text' : 'Cost MC/ Tot. cost',datafield : 'costMC','width' : '6%',sortable : false,editable : true,cellsformat: 'd2',columntype: 'numberinput',cellsalign : 'center',align:'center', validation : commonValidate,cellvaluechanging: updateOnchangesCostCode, cellbeginedit: grCostCodeEditable},
				{'text' : 'Set Sellling Price',datafield : 'setSellingPrice','width' : '4%',editable : true,columntype: 'checkbox',cellsalign : 'center',align:'center', cellvaluechanging : updateSetSellingice, cellbeginedit: updateOchnageSetSellingPrice},
			    {'text' : 'Sell Wast Wt.',datafield : 'sellWastageWt','width' : '6%',cellsformat: 'd3',sortable : false,editable : true, createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); }, columntype: 'numberinput',cellvaluechanging: updateOnchangesCostCode,cellsalign : 'center',align:'center', validation : commonValidate, cellbeginedit: grSellCostCodeEdit},
			    {'text' : 'Sell MC/ Total cost',datafield : 'sellMC','width' : '6%',sortable : false,editable : true,cellsformat: 'd2',columntype: 'numberinput',cellsalign : 'center',align:'center', validation : commonValidate, cellbeginedit: grSellCostCodeEdit},
			    
			    {'text' : 'Attr',datafield : 'attributes','width' : '4%',sortable : false,cellsalign : 'center',align:'center', cellbeginedit : attributeSearchPopUp},
			    {'text' : 'Prod.Photo No',datafield : 'photo','width' : '6%',sortable : false,editable : true,cellsalign : 'center',align:'center'}, 
			    {'text' : 'View Design',datafield : 'viewDesign','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align:'center', cellsrenderer: orderItemDesignRenderer},
			    {'text' : 'Provisional',datafield : 'provisional','width' : '5%',editable : false,cellsalign : 'center',align:'center'},
			    {'text' : '',datafield : 'isValid','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align:'center', cellsrenderer : checkValidate},
			    
				/* Hidden field to handle GR calculation */
				{'text' : '', datafield : 'countStone', editable : false, hidden: true},
				{'text' : '', datafield : 'countAcc', editable : false, hidden: true},
				{'text' : '', datafield : 'hsnMasterId', editable : false, hidden: true},
				{'text' : '', datafield : 'hsnMasterCode', editable : false, hidden: true},
				{'text' : '', datafield : 'pendingPcs', editable : false, hidden: true},
				{'text' : '', datafield : 'jwType', editable : false, hidden: true},
				{'text' : '', datafield : 'isPair', editable : false, hidden: true},
				{'text' : '', datafield : 'segmentId', editable : false, hidden: true},
				{'text' : '', datafield : 'segmentCode', editable : false, hidden: true},
				{'text' : '', datafield : 'actcostWastageWt', editable : false, hidden: true},
				{'text' : '', datafield : 'actcostMC', editable : false, hidden: true},
				{'text' : '', datafield : 'actsellWastageWt', editable : false, hidden: true},
				{'text' : '', datafield : 'actsellMC', editable : false, hidden: true},
				{'text' : '', datafield : 'metalValue', editable : false, hidden: true},
				{'text' : '', datafield : 'wastageValue', editable : false, hidden: true},
				{'text' : '', datafield : 'selling_price', editable : false, hidden: true},
				{'text' : '', datafield : 'stoneList', editable : false, hidden: true},
				{'text' : '', datafield : 'accessoryList', editable : false, hidden: true},
				{'text' : '', datafield : 'attrLength', editable : false, hidden: true},
				{'text' : '', datafield : 'size', editable : false, hidden: true},
				{'text' : '', datafield : 'height', editable : false, hidden: true},
				{'text' : '', datafield : 'diameter', editable : false, hidden: true},
				{'text' : '', datafield : 'width', editable : false, hidden: true},
				{'text' : '', datafield : 'vendorArticle', editable : false, hidden: true},
				{'text' : '', datafield : 'stoneCombId', editable : false, hidden: true},
				{'text' : '', datafield : 'combinationId', editable : false, hidden: true},
				{'text' : '', datafield : 'metalColor', editable : false, hidden: true},
				{'text' : '', datafield : 'hookType', editable : false, hidden: true},
				{'text' : '', datafield : 'screwType', editable : false, hidden: true},
				{'text' : '', datafield : 'loopType', editable : false, hidden: true},
				{'text' : '', datafield : 'polishType', editable : false, hidden: true},
				{'text' : '', datafield : 'settingType', editable : false, hidden: true},
				{'text' : '', datafield : 'collectionName', editable : false, hidden: true},
				{'text' : '', datafield : 'orderKind', editable : false, hidden: true},
				{'text' : '', datafield : 'orderType', editable : false, hidden: true},
				{'text' : '', datafield : 'metalTypeId', editable : false, hidden: true},
				{'text' : '', datafield : 'storeId', editable : false, hidden: true},
				{'text' : '', datafield : 'isRwk', editable : false, hidden: true},
				{'text' : '', datafield : 'isDueDtFlag', editable : false, hidden: true},
				{'text' : '', datafield : 'globalAttrFlag', editable : false, hidden: true},
				{'text' : '', datafield : 'reason', editable : false, hidden: true},
				{'text' : '', datafield : 'awCount', editable : false, hidden: true},
				{'text' : '', datafield : 'apportionSellingMc', editable : false, hidden: true},
				{'text' : '', datafield : 'apportionsellingWastageWt', editable : false, hidden: true}
			]
		});	
}


/*############################### STONE GRID SECTION STARTED ##################################*/
// Stone Add new row
var generaterowstone = function(i, grSrlNo) {
	var row = {};
	row["stoneListId"] = null;
	row["typeRow"] = true;
	row["srl"] = grSrlNo;
	row["stoneSlNo"] = i;
	row["isPsr"] = null;
	row["isStock"] = null;
	row["orderKind"] = null;
	row["category"] = null;
	row["suppliedBy"] = "V";
	row["suppliedBys"] = "Vendor";
	row["stoneCode"] = null;
	row["subCategory"] = null;
	row["subCategoryDesc"] = null;
	row["flag"] = "P";
	row["flags"] = "Positive";
	row["clarity"] = null;
	row["actualColor"] = null;
	row["wgtRange"] = null;
	row["color"] = null;
	row["cutGrade"] = null;
	row["issuedPcs"] = null;
	row["issuedWt"] = null;
	
	row["orderNo"] = null;
	row["orderSlNo"] = null;
	row["stoneUsedPcs"] = null;
	row["stoneUsedWt"] = null;
	row["stoneBulkPcs"] = null;
	row["stoneBulkWt"] = null;
	row["stoneCostPrice"] = null;
	row["stoneSellingPrice"] = null;
	
	row["usedPcs"] = null;
	row["usedWt"] = null;
	row["bulkPcs"] = null;
	row["pendingBulkWt"] = null;
	row["bulkWt"] = null;
	row["returnedPcs"] = null;
	row["returnedWt"] = null;
	row["breakageReceivedPcs"] = null;
	row["breakageReceived"] = null;
	row["breakageNotReceivedPcs"] = null;
	row["breakageNotReceived"] = null;
	row["uom"] = null;
	row["pendingPcs"] = null;
	row["stoneRate"] = null;
	row["stoneRates"] = null;
	row["stoneCost"] = null;
	row["stoneCostRate"] = null;

	row["returnStoneCostPrice"] = null;
	row["returnStoneSellingPrice"] = null;
	row["returnStoneCostPriceAct"] = null;
	row["returnStoneSellingPriceAct"] = null;
	row["stoneHCEdited"] = null;
	
	row["sellingRate"] = null;
	row["actSellingRate"] = null;
	row["sellingPrice"] = null;
	row["systemCostRate"] = null;
	row["actStoneCostRate"] = 0;
	row["GRStoneCostSPDTO"] = null;
	row["stoneHC"] = null;
	row["actStoneHC"] = 0;
	row["provisional"] = false;
	row["certificateDetails"] = null;
	row["grStoneCertificates"] = [];
	row["isCertficateRequired"] = null;
	row["isRwk"] = null;
	row["subCat"] = null;
	row["costRange"] = null;
	return row;
}

var generaterowstonePSR = function(sd) {
	
	var row = {};	
	row["stoneListId"] = sd.stoneListId;
	row["typeRow"] = false;
	row["srl"] = sd.srl;
	row["stoneSlNo"] = sd.stoneSlNo;
	row["isPsr"] = sd.isPsr;
	row["isStock"] = sd.isStock;
	row["orderKind"] = sd.orderKind;
	row["pendingPcs"] = sd.pendingPcs;
	row["suppliedBy"] = sd.suppliedBy;
	row["suppliedBys"] = sd.suppliedByType;
	row["stoneCode"] = sd.stoneCode;
	row["subCategoryDesc"] = sd.subCategoryDesc;
	row["category"] = sd.category;

	row["stoneBulkPcs"] = sd.stoneBulkPcs;
	row["stoneBulkWt"] = sd.stoneBulkWt;
	
	row["flag"] = "P";
	row["flags"] = "Positive";
	row["issuedPcs"] = sd.issuedPcs;
	row["issuedWt"] = sd.issuedWt;
	row["isRwk"] = sd.isRwk;
	row["grStoneCertificates"] = sd.grStoneCertificates;
	row["isCertficateRequired"] = sd.isCertficateRequired;
	row["orderNo"] = sd.orderNo;
	row["orderSlNo"] = sd.orderSlNo;
	row["stoneUsedPcs"] = sd.stoneUsedPcs;
	row["stoneUsedWt"] = sd.stoneUsedWt;
	row["stoneCostPrice"] = sd.stoneCostPrice;
	row["stoneSellingPrice"] = sd.stoneSellingPrice;

	row["returnStoneCostPrice"] = sd.returnStoneCostPrice;
	row["returnStoneSellingPrice"] = sd.returnStoneSellingPrice;
	row["returnStoneCostPriceAct"] = sd.returnStoneCostPrice;
	row["returnStoneSellingPriceAct"] = sd.returnStoneSellingPrice;
	
	row["usedPcs"] = sd.usedPcs;
	row["usedWt"] = sd.usedWt;
	row["bulkPcs"] = null;
	row["pendingBulkWt"] = sd.pendingBulkWt;
	row["bulkWt"] = null;
	row["returnedPcs"] = null;
	row["returnedWt"] = null;
	row["breakageReceivedPcs"] = null;
	row["breakageReceived"] = null;
	row["breakageNotReceivedPcs"] = null;
	row["breakageNotReceived"] = null;
	row["uom"] = sd.uom;
	
	if("CU" == sd.suppliedBy){
		row["stoneRate"] = sd.stoneRate;
		row["stoneCostRate"] = sd.stoneCostRate;
		row["actStoneCostRate"] = sd.actStoneCostRate;
		row["stoneCost"] = 0.00;
		row["stoneHC"] = sd.stoneHC;
		row["actStoneHC"] = sd.actStoneHC;
		row["sellingRate"] = sd.sellingRate;
		row["actSellingRate"] = sd.sellingRate;
		row["sellingPrice"] = 0.00;
		row["stoneHCEdited"] = sd.stoneHC;
		
	}else if("CO" == sd.suppliedBy){
		row["stoneRate"] = sd.stoneRate;
		row["stoneCostRate"] = sd.stoneCostRate;
		row["actStoneCostRate"] = sd.actStoneCostRate;
		row["stoneCost"] = 0.00;
		row["stoneHC"] = sd.stoneHC;
		row["actStoneHC"] = sd.actStoneHC;
		row["sellingRate"] = sd.sellingRate;
		row["actSellingRate"] = sd.sellingRate;
		row["sellingPrice"] = 0;
		row["stoneHCEdited"] = sd.stoneHC;
		
	}else if("V" == sd.suppliedBy){
		
		row["stoneRate"] = sd.stoneRate;
		row["stoneCostRate"] = sd.stoneCostRate;
		row["actStoneCostRate"] = sd.actStoneCostRate;
		row["stoneCost"] = 0.00;
		row["stoneHC"] = 0;
		row["actStoneHC"] = 0; 
		row["stoneHCEdited"] = 0;
		row["sellingRate"] = sd.sellingRate;
		row["actSellingRate"] = sd.sellingRate;
		row["sellingPrice"] = 0.00;
	}
	
	row["provisional"] = false;
	row["certificateDetails"] = sd.certificateDetails;
	row["costRange"] = (typeof sd.costRange !="undefined" && sd.costRange.length > 0 && sd.costRange != null) ? sd.costRange : null;
	row["clarity"] = sd.clarity;
	row["actualColor"] = sd.actualColor;
	row["wgtRange"] = sd.wgtRange;
	row["color"] = sd.color;
	row["cutGrade"] = sd.cutGrade;
	return row;
}
// Add stone row checking with GR details grid. For None PSR allowed to add row other not allowed.
var addStoneGridRow = function(){
	var selectedrowindexGRDetailsGrid = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var psr = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'psr');
	var gWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', selectedrowindexGRDetailsGrid, 'grossWt');
	var nWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', selectedrowindexGRDetailsGrid, 'netWt');
	
//	$("#grDetailsGrid").jqxGrid('setcellvalue', selectedrowindexGRDetailsGrid, 'isValid', false);
	
	var isValid = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'isValid');
	if(isValid == true){
		$.growl.notice({ message:"Line item is already validate." , duration: 10000, title: 'Notice' });
		return false;
	}
	
	if(psr == "N"){	
		if(parseFloat(NVL(gWt,0)) == parseFloat(NVL(nWt,0))){
			$.growl.error({ message:"Addition of stone is allowed for NONE PSR Gross Wt and Net Wt should not be same!" , duration: 10000, title: 'Error' });
			return false;
		}else{		
			var rowIdOrg,rowId = 0;		
			var stoneGridArray = [];
			var rowscountOriginal = $("#stoneDetailsGrid").jqxGrid('getdatainformation').rowscount;
			var grSrlNo = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'srl');
			var stoneGrSlrNo = $("#stoneDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'srl');
			
			var rowData = $("#stoneDetailsGrid").jqxGrid("getrows");
			$.each(rowData, function(k, v){
				if(v.srl == grSrlNo){
					stoneGridArray.push(v);
				}
			});	
			
			var rowscount = stoneGridArray.length;
			
			(rowscountOriginal == 0) ? rowIdOrg = 1 : rowIdOrg = rowIdOrg + 1 ;
			
			(rowscount == 0) ? rowId = 1 : rowId = rowscount + 1;
			
			var datarow = generaterowstone(rowId, grSrlNo);
			var commit = $("#stoneDetailsGrid").jqxGrid('addrow', null, datarow);					
		    
			var boundindex = $('#stoneDetailsGrid').jqxGrid('getrowboundindex', rowscountOriginal);
			$("#stoneDetailsGrid").jqxGrid('selectrow', boundindex);
			$("#stoneDetailsGrid").jqxGrid('ensurerowvisible', boundindex);
		}
	}else{		
		$.growl.error({ message:"Addition of stone is allowed for NONE PSR only!" , duration: 10000, title: 'Error' });
		return false;
	}
}



// Delete row not allowed for PSR but allowed for None PSR.
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
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', i, 'stoneSlNo', k);
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

// GR Stone search pop up
var stoneSearchPopUp = function(rowId)  {	
	grStoneForPSR();
	$("#manageStoneForm").trigger('reset');
	var grSrlno = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowId, 'srl');
    var psrType =  $('#grDetailsGrid').jqxGrid('getcellvalue', (grSrlno-1), 'psr');
    var rowindex = $("#stoneDetailsGrid").jqxGrid('getselectedrowindex');
    var rowid = $("#stoneDetailsGrid").jqxGrid('getrowid', rowindex);
    var row = $("#stoneDetailsGrid").jqxGrid('getrowdatabyid', rowid);
    if( typeof row != "undefined" || row != null){

    	if(row.boundindex == rowId && row.stoneCode != null){
    		//debugger;
    	var suppBy = "<b>Supplied By :</b> " + row.suppliedBys;
    	var segment = ", <b>Segment :</b> " + row.segmentName;
    	var mainCategory = ", <b> Main Category :</b> " + row.mainCategoryCode;
    	var mainCategoryName = ", <b> Main Category :</b> " + row.mainCategoryName;
    	var uom = ", <b> UOM :</b> " + row.uom;
    	var subCategoryDesc  = ", <b> Sub Cat Desc : </b>" + row.subCategoryDesc; 
    	var stoneCode = ", <b> Stone Code : </b>" + row.stoneCode; 
    	var costRange = ", <b> Cost Range : </b>" + row.costRange;
    	var segmentDetails = suppBy + segment +  mainCategoryName + uom + subCategoryDesc + stoneCode + costRange;
    	//console.log(mainCategory);
    	//console.log(row.mainCategory);
    	console.log(segmentDetails);
    	//console.log(row.mainCategoryCode);
    	if(row.segmentName == "Diamond"){    		
  
        	if(row.clarity == null || row.clarity == ""){
        		var clarity = "";
        	}else{
        		var clarity = ", <b>Clarity : </b>" + row.clarity;
        	}
        	 
        	if(row.color == null || row.color == ""){
        		var color = "";
        	}else{
        		 var color = ", <b>Color : </b>" + row.color;
        	}
        	
        	if(row.colcutGradeor == null || row.cutGrade == ""){
        		var cutGrade = "";
        	}else{
        		var cutGrade = ", <b>Cut Grade : </b>" + row.cutGrade;
        	}
        	 
        	if(row.wgtRange == null || row.wgtRange == ""){
        		var wgtRange = "";
        	}else{
        		var wgtRange = ", <b>Wt Range : </b>" + row.wgtRange;
        	}
        	
       	 
        	if(row.subCat == null || row.subCat == ""){
        		var shape = "";
        	}else{
        		 var shape = ", <b>Shape : </b>" + row.subCat;
        	}
			
			
			if(row.mainCategoryCode == "CM" || row.mainCategoryCode == "CP" || row.mainCategoryCode == "CS"){
				$("#actualColor").show();
				$("#actualColor").val(row.actualColor); 
				if(row.actualColor == null || row.actualColor == ""){
					var actualColor = "";
				}else{
					var actualColor = ", <b> Actual Color :</b>" + row.actualColor;
				}
			}
			
			var othersDiamond = clarity + color + cutGrade + wgtRange + shape + actualColor;
			
    	}else{   		
    		
    	
        	if(row.subCategory == null || row.subCategory == ""){
        		var subCategory = "";
        	}else{
        		var subCategory = ", <b> Sub Category : </b>" + row.subCategory;
        	}
        	
        	if(row.wgtRange == null || row.wgtRange == ""){
        		var wgtRange = "";
        	}else{
        		var wgtRange = ", <b> Wt Range : </b>" + row.wgtRange;
        	}
        	var othersDiamond = subCategory + wgtRange;
    	}
    	
    	if(segment !== null && mainCategory !== null && uom != null && stoneCode != null){
    		$("#stoneDet").html("<div class='well'>" + segmentDetails + othersDiamond + "</div>" );
    	}
    	}else{
    		$("#stoneDet").html('');
    	}
	}else{
    	$("#stoneDet").html('');
    }
    
    if(psrType == "N"){
    	$("#stoneSearch").modal({ remote: "stoneSearch?from=grfg", target: "stoneSearch" });
    }
	return false;
}

// On load of stone search modal pop up.
$('#stoneSearch').on('loaded.bs.modal',	function(e) {
	var rowindex = $("#stoneDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#stoneDetailsGrid").jqxGrid('getrowid', rowindex);
	var row = $("#stoneDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	var suppliedBy = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'suppliedBy');
	
	$("#suppBy").val(suppliedBy).change();
});

var costRangeArr = [];
var onloadCostRangeApi = function(rowindex, wgtRange, costRangeArray){
	var stoneCode = $("#stoneCode").val();
	var vendorId = $("#vendorCode-value").val();
	var wgtRange =   $("#weightRange").val(); 
	var clarity =   $("#clarity").val(); 
	var cutGrade =   $("#cutGrade").val(); 
	var color =   $("#color").val(); 
	var actualColor =   $("#actualColor").val(); 
	var category =   $("#mainCategory option:selected").text(); 
	costRangeArr = [];
	if(costRangeArray == null){
		var params =  {"stoneCode" : stoneCode,"clarity":clarity,"cutGrade":cutGrade,"color":color,"actualColor":actualColor, "wgtRange":wgtRange, "category": category,"vendorId" : vendorId};
		postJSON('/OrderExecution/api/v1/listCostRangeForGRFG?type=grFg', JSON.stringify(params), function(data) {
				costRange = data.payload.list;
				for(var i = 0; i<costRange.length; i++){
					var costR = {"id": costRange[i].id, "name" : costRange[i].name}
					costRangeArr.push(costR);
				}
		});
	}else{
		for(var i = 0; i<costRangeArray.length; i++){
			var costR = {"id": costRangeArray[i].id, "name" : costRangeArray[i].name}
			costRangeArr.push(costR);
		}
	}
}
//On close of stone search modal pop up.
$('#stoneSearch').on('hide.bs.modal', function(e) {

	var rowindex = $("#stoneDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#stoneDetailsGrid").jqxGrid('getrowid', rowindex);
	var row = $("#stoneDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	var segment = $("#segmentName option:selected").val();
	var mainCategory = $("#mainCategory option:selected").attr('code');
	var mainCategoryDesc = $("#mainCategory option:selected").attr('descri');
	var mainCategoryName = $('#mainCategory option:selected').text();
	var uom = $("#uom").val();
	var stoneCode = $("#stoneCode").val();
	//console.log(mainCategory +"<br>" + mainCategoryDesc +"<br>" + mainCategoryName)
	if(segment !== ""  && mainCategory !== ""   &&  uom != ""  &&  stoneCode != "" ){
	
	row["suppliedBys"] = $('#suppBy option:selected').text();
	row["segment"] = segment;
	row["segmentName"] = $("#segmentName option:selected").text();
	row["category"] = $("#mainCategory option:selected").text();
	row["mainCategoryCode"] = mainCategory;
	row["mainCategoryName"] = mainCategoryName;
	row["uom"] =  uom;
	row["subCategoryDesc"] = $("#subCategoryDesc").val();
	row["stoneCode"] = stoneCode;
	
	if($('#segmentName option:selected').attr('code') == "DI"){
		
		row["subCat"] = $("#shape option:selected").text();
		row['wgtRange'] = $("#weightRange").val();
		row['clarity'] =  $("#clarity option:selected").val();
		row['color'] = $("#color option:selected").val();
		row['cutGrade'] = $("#cutGrade option:selected").val();
		
		var firstWord = mainCategoryName.split(' ')[0];
		if(firstWord == "CD"){
			row['actualColor'] = $("#actualColor").val();
			row['costRange'] = $("#costRangeD").val();
		}else{
			row['costRange'] =null;
		}
		
	}else{
		row["subCategory"] = $("#subCategoryName option:selected").text();
		row['wgtRange'] = $("#costRange").val();
		row['clarity'] =  null;
		row['color'] = null;
		row['cutGrade'] = null;
		row['actualColor'] = null;
		row['costRange'] = null;
	}
	
	var params = {
			"stoneCode" : row["stoneCode"],"cutGrade" : row["cutGrade"],"clarity" : row['clarity'],	"color" : row['color'],	"actualColor" : row['actualColor'] ,"wgtRange" : row['wgtRange'],"vendorId" : $('#vendorCode-value').val()
	};

	$('#stoneDetailsGrid').jqxGrid('updaterow', rowid, row);
			

	$("#stoneDetailsGrid").jqxGrid('focus');
	}
	
	var firstword = mainCategoryName.split(' ')[0];
	if(firstword == "CD"){
		onloadCostRangeApi(rowindex, $("#weightRange").val(), null)
	}
	
});

var flagList = [
	{"id" : "P", "name" : "Posative"},
	{"id" : "N", "name" : "Negative"}
];

var flagTypeSource = {
		datatype : 'json',
		datafields : [ 
			{name : 'id',type : 'string'}, 
			{name : 'name',type : 'string'} 
		],
		localdata : flagList
	};

var flagTypeDataAdapter = new $.jqx.dataAdapter(flagTypeSource, { autoBind : true});
	

// Load Flag Drop Down
var flagDropDown = function(row, value, editor){
	editor.jqxDropDownList({
		source : flagTypeDataAdapter,
		displayMember : 'name',
		valueMember : 'id'
	});
}

var updateCellValueStoneDet = function(row){
	$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostRate",0);
	$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost",0);
	$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneRate",0);
	$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate",0);
}

var updateDetails = function(datafield, data, row, newvalue){
	var resp = data.payload.costSP;
	var stoneHCEdited =  $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneHCEdited");
	var stoneHC =  $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneHC");
	var suppliedBy =  $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "suppliedBy");
	var usedPcs =  $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "usedPcs");
	var uom =  $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "uom");
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
	if((resp.handlingChange == null || resp.handlingChange == "") && suppliedBy != "V"){ 
		$.growl.error({ message: "Handling charge not found.", duration: 5000, title: 'Error' });
	}

	if(suppliedBy == "V" || suppliedBy == "CO"){
		if(resp.systemCostRate == null || resp.systemCostRate == ""){
			$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", 0.00);
		}else{
			if(uom=="Cts"  || uom == "Gms"){
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", usedWt*resp.systemCostRate);
			}else{
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", usedPcs*resp.systemCostRate);
			}
		}
	}
	if(resp.systemCostRate == null || resp.systemCostRate == ""){
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostRate", null);
	}else{
		$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCostRate", resp.systemCostRate);
	}
	
	if(resp.systemCostRate == null || resp.systemCostRate == ""){
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneRate", null);
	}else{
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneRate", resp.systemCostRate);
	}
	
	if(resp.handlingChange == null || resp.handlingChange == ""){
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", null);
	}else{
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", resp.handlingChange);
	}
	
	if(resp.sellingRate == null || resp.sellingRate == ""){
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", null);
	}else{
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", resp.sellingRate);
	}
	
	/*if(resp.sellingRate == null || resp.sellingRate == ""){
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", null);
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice",  0.00);
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", 0.00);
	}else{ 
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", resp.sellingRate);
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "actSellingRate", resp.sellingRate);
		 if(uom=="Cts"  || uom == "Gms"){
			 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt*resp.sellingRate);
			(suppliedBy == "CU") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", 0.00) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", usedWt*resp.systemCostRate);
		 }else{
			 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedPcs*resp.sellingRate);
			 (suppliedBy == "CU") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", 0.00) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", usedPcs*resp.systemCostRate);
		 }
	}*/
	if(datafield == "usedWt"){
		(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", newvalue * parseFloat(resp.sellingRate)) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedPcs * parseFloat(resp.sellingRate));
	}else if(datafield == "usedPcs"){
		(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt * parseFloat(resp.sellingRate)) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", newvalue * parseFloat(resp.sellingRate));
	}else{
		(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt * parseFloat(resp.sellingRate)) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedPcs * parseFloat(resp.sellingRate));
	}
	
	if(suppliedBy == "CU" || suppliedBy == "CO"){
		if(datafield == "usedWt"){
			(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", newvalue*stoneHC) :  $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", usedPcs*stoneHC);
		}
		
		if(datafield == "usedPcs"){
			(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", usedWt*stoneHC) :  $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", newvalue*stoneHC);
		}
		if(datafield == "stoneHCEdited"){
			(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", usedWt*newvalue) :  $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", usedPcs*newvalue);
		}
	}
}

var updateStoneCost= function(datafield, row, newvalue){
	
	var stoneHCEdited = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'stoneHCEdited');
	var actStoneHC = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'actStoneHC');
	var stoneHC = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'stoneHC');
	var usedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'usedWt');
	var usedPcs = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'usedPcs');
	var suppliedBy = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'suppliedBy');
	var uom = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'uom');
	var sellingRate = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'sellingRate');
	var stoneCostRate = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'stoneCostRate');
	var category = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "category");	
	var firstword = category.split(' ')[0];
	var stoneRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneRate");
	var issuedPcs = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "issuedPcs");
	var issuedWt = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "issuedWt");
	
	
	if(suppliedBy == "V"){ 	
		if(datafield == "usedWt"){
			(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", newvalue*parseFloat(stoneCostRate)) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", usedPcs*parseFloat(stoneCostRate));
		}
		
		if(datafield == "usedPcs"){
			(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", usedWt*parseFloat(stoneCostRate)) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", newvalue*parseFloat(stoneCostRate));
		}
	}
	
	if(suppliedBy == "CO"){
		//alert(issuedPcs)
		//usedPcs.setAttribute('max', issuedPcs);
		if(datafield == "usedWt"){ 
			 (uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", newvalue*parseFloat(stoneHC)) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", usedPcs* parseFloat(stoneHC));
			 (uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", (newvalue*parseFloat(stoneCostRate) + newvalue*parseFloat(NVL(stoneHC,0)) )) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", (usedPcs*parseFloat(stoneCostRate) + usedPcs*parseFloat(NVL(stoneHC,0))));
		
			}
		 
		if(datafield == "usedPcs"){
			 (uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", usedWt*parseFloat(stoneHC)) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", newvalue* parseFloat(stoneHC));
			 (uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", (usedWt*parseFloat(stoneCostRate)  + usedWt*parseFloat(NVL(stoneHC,0)))) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", (newvalue*parseFloat(stoneCostRate)  + newvalue*parseFloat(NVL(stoneHC,0))));
		}
		
		if(datafield == "stoneHCEdited"){
			(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", usedWt*newvalue) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", usedPcs* newvalue);
			(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", (usedWt*parseFloat(stoneCostRate)  + usedWt*parseFloat(newvalue))) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", (usedPcs*parseFloat(stoneCostRate)  + usedPcs*parseFloat(newvalue)));
		}
		
		if(suppliedBy == "CO" && (stoneHC == null || stoneHC == "" || typeof stoneHC == "undefined")){
			
			$.growl.warning({ message: "For Stone Srl ensure stone HC should be greater than equal to zero.", duration: 10000, title: 'Warning' });
			
			return false;
		}
	}
	
	if(suppliedBy == "CU"){ 
		//usedPcs.setAttribute('max', issuedPcs);
		//alert(issuedPcs);
		 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", 0); 
		 
		 if(datafield == "usedWt"){ 
			 (uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", newvalue*parseFloat(stoneHC)) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", usedPcs* parseFloat(stoneHC));
		}
	 if(datafield == "usedPcs"){
			 (uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", usedWt*parseFloat(stoneHC)) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", newvalue* parseFloat(stoneHC));
			 //alert(usedPcs ,  issuedPcs);
		
			}	 
		
		if(datafield == "stoneHCEdited"){
			(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", usedWt*newvalue) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneHC", usedPcs* newvalue);
		}
	}
				
	
}
var updateCost = function(row, datafield, columntype, oldvalue, newvalue, event){
	var suppliedBy = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "suppliedBy");
	var usedWt = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "usedWt");
	var usedPcs = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "usedPcs");
	var uom = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "uom");
	var costRangeN = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "costRangeN");
	var stoneListId = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneListId");
	var stoneCode = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneCode");
	var isPsr = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "isPsr");
	var actualColor = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "actualColor");
	var color = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "color");
	var cutGrade = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "cutGrade");
	var clarity = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "clarity");
	var weightSlab = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "wgtRange");
	var stoneCostRateAct = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneRate");
	var stoneCostRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneCostRate");
	var costR = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "costRange");
	var vendorId = parseInt($("#vendorCode-valueC").val());
console.log(stoneCostRateAct);
	var category = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "category");	
	var firstword = category.split(' ')[0];
	
	if(datafield == "usedWt" || datafield == "usedPcs"){
		if(weightSlab == null || weightSlab == "" || typeof weightSlab == "undefined"){
			weightSlab = null;
		}else{
			weightSlab = weightSlab;
		}
		if(isPsr == null){			
			
			if(suppliedBy == "V"){		
				var fieldFilter = {"fieldFilters": { "stoneCode":stoneCode, "suppliedBy":suppliedBy,  "uom":uom,  "vendorId": vendorId, "stoneCostRate" : null,"costRange" : costR, "actualColor" : actualColor, "color" : color, "cutGrade" : cutGrade, "clarity" : clarity, "weightSlab" : weightSlab }}
			
				postJSON('/OrderExecution/api/v1/stoneCostSPDetails', JSON.stringify(fieldFilter), function(data) {
					var rowData = $("#stoneDetailsGrid").jqxGrid('getrowdata', row);
					
					if(data.resCode == 1 && typeof data != "undefined"){
						updateDetails(datafield,data, row, newvalue);
					}else{
						updateCellValueStoneDet(row);
						$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid",false);
						$.growl.error({ message: data.mesgStr, duration: 5000, title: 'Error' });
						return false;
					}
				});
			};
		}else{
			var rowData = $("#stoneDetailsGrid").jqxGrid('getrowdata', row);
			var stoneCostRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneCostRate");
			var stoneHC = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneHC");
			var sellingRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "sellingRate");
			var costR = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "costRange");		
		
			
			if((suppliedBy == "V" || suppliedBy == "CO") && firstword == "CD"){		
				var fieldFilter = {"fieldFilters": { "stoneCode":stoneCode, "suppliedBy":suppliedBy,  "uom":uom,  "vendorId": vendorId, "stoneCostRate" : null,"costRange" : costR, "actualColor" : actualColor, "color" : color, "cutGrade" : cutGrade, "clarity" : clarity, "weightSlab" : weightSlab }}
				postJSON('/OrderExecution/api/v1/stoneCostSPDetails', JSON.stringify(fieldFilter), function(data) {
					var rowData = $("#stoneDetailsGrid").jqxGrid('getrowdata', row);
					if(data.resCode == 1  && typeof data != "undefined"){
						updateDetails(datafield,data, row, newvalue);	
					}else{
						updateCellValueStoneDet(row);
						$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid",false);
						$.growl.error({ message: data.mesgStr, duration: 5000, title: 'Error' });
						return false;
					}
				});
			}else{			
				updateStoneCost(datafield,row, newvalue);
			}
			
			if(datafield == "usedWt"){
				(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", newvalue * parseFloat(sellingRate)) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedPcs * parseFloat(sellingRate));
			}else if(datafield == "usedPcs"){
				(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt * parseFloat(sellingRate)) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", newvalue * parseFloat(sellingRate));
			}else{
				(uom=="Cts"  || uom == "Gms") ? $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt * parseFloat(sellingRate)) : $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedPcs * parseFloat(sellingRate));
			}
		}
		
	}
	
	
	

	if(datafield == "stoneCostRate"){
		var rowData = $("#stoneDetailsGrid").jqxGrid('getrowdata', row);
		var returnedWt = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "returnedWt");
		var returnedPcs = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "returnedPcs");
		var stoneRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneRate");
		var sellingRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "sellingRate");
		var actSellingRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "actSellingRate");
		var category = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "category");
		
		var firstword = category.split(' ')[0];
		
		if(firstword == "CD" && suppliedBy == "V"){
				var fieldFilter = {"fieldFilters": { "stoneCode":stoneCode, "suppliedBy":suppliedBy,  "uom":uom,  "vendorId": vendorId, "stoneCostRate" : newvalue,"costRange" : costR, "actualColor" : actualColor, "color" : color, "cutGrade" : cutGrade, "clarity" : clarity, "weightSlab" : weightSlab }}
				
			postJSON('/OrderExecution/api/v1/stoneCostSPDetails', JSON.stringify(fieldFilter), function(data) {
				if(data.resCode == 1 && typeof data != "undefined"){
					var resp = data.payload.costSP; 		
					
					if(resp.sellingRate == null || resp.sellingRate == ""){
						 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", null);
						 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice",  0.00);
					}else{ 
						 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", resp.sellingRate);
						 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "actSellingRate", resp.sellingRate);
						 if(uom=="Cts"  || uom == "Gms"){
							 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt*resp.sellingRate);
						 }else{
							 $("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedPcs*resp.sellingRate);
						 }
					}
				}else{
					updateCellValueStoneDet(row);
					$("#grDetailsGrid").jqxGrid('setcellvalue', row, "isValid",false);
					$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
					return false;
					
				}
			});
		}
		
		
		
		if(suppliedBy == "V"){
			if(uom=="Cts"  || uom == "Gms"){
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", usedWt* newvalue); 
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "retStoneCost", returnedWt * stoneCostRateAct); 
			}else{
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", usedPcs*newvalue); 
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "retStoneCost", returnedPcs * stoneCostRateAct); 
			}
		}
			
		if(suppliedBy == "CO"){
			if(uom=="Cts"  || uom == "Gms"){
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", usedWt* newvalue); 
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "retStoneCost", returnedWt * newvalue ); 
			}else{
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", usedPcs*newvalue); 
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "retStoneCost", returnedPcs * newvalue); 
			}
		}

		if(suppliedBy == "CU"){			
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "stoneCost", 0); 
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "retStoneCost", returnedWt * newvalue); 
		}
		
		if((newvalue > stoneRate) && (firstword != "CD")){
			var x = newvalue - stoneRate;
			var y = (x/stoneRate) * 100;
			var newSellingRate = (sellingRate * y/100)  + sellingRate;
			$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", newSellingRate); 
		}else{
			var newSellingRate = actSellingRate;
			$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", newSellingRate); 
		}
		
		if(suppliedBy == "V" || suppliedBy == "CO"){ 
			if(uom=="Cts" || uom == "Gms"){
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt * newSellingRate); 
			}else{
				$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedPcs * newSellingRate); 
			}
		}
		
		if(suppliedBy == "CU"){
			$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt * newSellingRate ); 
		}
		
		var actStoneCostRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "actStoneCostRate");		
	}
	
	if(datafield == "returnedWt"){
		var rowData = $("#stoneDetailsGrid").jqxGrid('getrowdata', row);
		var stoneCostRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneCostRate");
		
		$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "retStoneCost", stoneCostRate * newvalue); 
	}
	
	if(datafield == "stoneHCEdited"){
		var rowData = $("#stoneDetailsGrid").jqxGrid('getrowdata', row);
		var stoneCostRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneCostRate");
		var actStoneHC = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "actStoneHC");
		var usedWt = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "usedWt");
		var usedPcs = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "usedPcs");
		var sellingRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "sellingRate");
		
		var stoneCostRateEdited = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "stoneCostRate");
		var actStoneCostRate = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "actStoneCostRate");
		if(firstword != "CD"){
			updateStoneCost(datafield,row, newvalue);
		}
	}
	
	
}

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

// Update on change Stone Cost Rate, Retured Wt, Stone Handling Charges
var updateOnchangeStoneRateSC = function(row, datafield, columntype, oldvalue, newvalue, event){
	updateCost(row, datafield, columntype, oldvalue, newvalue, event);
}

var updateStoneWtsForTypes =  function (newvalue , rowindex, stoneRows, psr, stoneSrlNo, total , wtForNextRow, pcsForNextRow, totalPcs ){
	var grSrl =  stoneRows[rowindex].srl;
	var grMasterRows = $("#grDetailsGrid").jqxGrid('getrows');
	var check = NVL(wtForNextRow,0) - NVL(total,0);
	var checkPcs = NVL(pcsForNextRow,0) - NVL(totalPcs,0);
	
	
	if(check < 0){
		return false;
	}
	
	if(checkPcs < 0){
		return false;
	}
	
	for(var k = 0; k<grMasterRows.length; k++){
		if((psr == grMasterRows[k].psr) && (grMasterRows[k].srl >= grSrl)){
			$('#grDetailsGrid').jqxGrid('setcellvalue', k , 'isValid', false);
		}
	}
	for(var i = rowindex +1; i < stoneRows.length; i++ ){
		if(psr == stoneRows[i].isPsr && stoneSrlNo == stoneRows[i].stoneSlNo && stoneRows[i].isStock == "ST" && stoneRows[i].suppliedBy != "V"){
			var IssuewtForRow = NVL(wtForNextRow,0) - NVL(total,0);
			var IssuePcsForRow = NVL(pcsForNextRow,0) - NVL(totalPcs,0);
			
			if(IssuewtForRow < 0){
				var j = i;
					if(psr == stoneRows[j].isPsr && stoneSrlNo == stoneRows[j].stoneSlNo ){
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', j, 'issuedWt', 0);
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', j, 'usedWt', 0);
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', j, 'returnedWt', 0);
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', j, 'breakageReceived', 0);
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', j, 'breakageNotReceived', 0);
				}
			}
			
			if(IssuePcsForRow < 0){
				var j = i;
					if(psr == stoneRows[j].isPsr && stoneSrlNo == stoneRows[j].stoneSlNo ){
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', j, 'issuedPcs',  0);
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', j, 'usedPcs', 0);
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', j, 'returnedPcs', 0);
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', j, 'breakageReceivedPcs', 0);
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', j, 'breakageNotReceivedPcs',0);
				}
			}
			
			if(IssuewtForRow >= 0){
					var j = i;
					if(psr == stoneRows[j].isPsr && stoneSrlNo == stoneRows[j].stoneSlNo){
						$('#stoneDetailsGrid').jqxGrid('setcellvalue', j, 'issuedWt', IssuewtForRow);
						
						var usedWtN = $('#stoneDetailsGrid').jqxGrid('getcellvalue', j, 'usedWt');
						var returnedWtN = $('#stoneDetailsGrid').jqxGrid('getcellvalue', j, 'returnedWt');
						var breakageReceivedN = $('#stoneDetailsGrid').jqxGrid('getcellvalue', j, 'breakageReceived');
						var breakageNotReceivedN = $('#stoneDetailsGrid').jqxGrid('getcellvalue', j, 'breakageNotReceived');
					
						total = NVL(returnedWtN,0) + NVL(breakageReceivedN,0) + NVL(breakageNotReceivedN,0) + NVL(usedWtN, 0);
						
						wtForNextRow = IssuewtForRow;
					}
				
			}
			
			if(IssuePcsForRow >= 0){
				var m = i;
				if(psr == stoneRows[m].isPsr && stoneSrlNo == stoneRows[m].stoneSlNo){
					$('#stoneDetailsGrid').jqxGrid('setcellvalue', m, 'issuedPcs', IssuePcsForRow);
					
					var usedPcsN = $('#stoneDetailsGrid').jqxGrid('getcellvalue', m, 'usedPcs');
					var returnedPcsN = $('#stoneDetailsGrid').jqxGrid('getcellvalue', m, 'returnedPcs');
					var breakagePcsReceivedN = $('#stoneDetailsGrid').jqxGrid('getcellvalue', m, 'breakageReceivedPcs');
					var breakagePcsNotReceivedN = $('#stoneDetailsGrid').jqxGrid('getcellvalue', m , 'breakageNotReceivedPcs');
					
					totalPcs = NVL(returnedPcsN,0) + NVL(breakagePcsReceivedN,0) + NVL(breakagePcsNotReceivedN,0) + NVL(usedPcsN, 0);
					
					pcsForNextRow = IssuePcsForRow;
				}
			
			}
		}
	}
}

// Update Issued Wt on change of Used Wt, Return Wt, Breakage Wt and Breakage Return Wt.
var updateStoneWts = function(row, datafield, columntype, oldvalue, newvalue){
    
	var rowindex = $("#stoneDetailsGrid").jqxGrid('getselectedrowindex');
    var stoneRows = $("#stoneDetailsGrid").jqxGrid('getrows');
	var psr = stoneRows[rowindex].isPsr;
	var stoneSrlNo = stoneRows[rowindex].stoneSlNo;
	
	if(datafield == "usedWt"){
		var total = NVL(stoneRows[rowindex].returnedWt,0) + NVL(stoneRows[rowindex].breakageReceived,0)	+ NVL(stoneRows[rowindex].breakageNotReceived,0) + NVL(newvalue, 0);
		var totalPcs = NVL(stoneRows[rowindex].returnedPcs,0) + NVL(stoneRows[rowindex].breakageReceivedPcs,0)	+ NVL(stoneRows[rowindex].breakageNotReceivedPcs,0) + NVL(stoneRows[rowindex].usedPcs, 0);
		
		var wtForNextRow = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedWt');
		var pcsForNextRow = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedPcs');
		console.log(pcsForNextRow);
		updateStoneWtsForTypes(newvalue , rowindex, stoneRows, psr, stoneSrlNo, total , wtForNextRow, pcsForNextRow, totalPcs );
	}
	
	if(datafield == "usedPcs"){
		var total = NVL(stoneRows[rowindex].returnedWt,0) + NVL(stoneRows[rowindex].breakageReceived,0)	+ NVL(stoneRows[rowindex].breakageNotReceived,0) + NVL(stoneRows[rowindex].usedWt, 0);
		var totalPcs = NVL(stoneRows[rowindex].returnedPcs,0) + NVL(stoneRows[rowindex].breakageReceivedPcs,0)	+ NVL(stoneRows[rowindex].breakageNotReceivedPcs,0) + NVL(newvalue, 0);
		
		var wtForNextRow = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedWt');
		var pcsForNextRow = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedPcs');
		
		updateStoneWtsForTypes(newvalue , rowindex, stoneRows, psr, stoneSrlNo, total , wtForNextRow, pcsForNextRow, totalPcs );
	}
	
	if(datafield == "returnedWt"){
		var total = NVL(stoneRows[rowindex].usedWt,0) + NVL(stoneRows[rowindex].breakageReceived,0) + NVL(stoneRows[rowindex].breakageNotReceived,0) + NVL(newvalue, 0);
		var totalPcs = NVL(stoneRows[rowindex].returnedPcs,0) + NVL(stoneRows[rowindex].breakageReceivedPcs,0)	+ NVL(stoneRows[rowindex].breakageNotReceivedPcs,0) + NVL(stoneRows[rowindex].usedPcs, 0);
		
		var wtForNextRow = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedWt');
		var pcsForNextRow = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedPcs');
		updateStoneWtsForTypes(newvalue , rowindex, stoneRows, psr, stoneSrlNo, total , wtForNextRow, pcsForNextRow, totalPcs );
	}
	if(datafield == "breakageReceived"){
		var total = NVL(stoneRows[rowindex].returnedWt,0) + NVL(stoneRows[rowindex].usedWt,0) + NVL(stoneRows[rowindex].breakageNotReceived,0) + NVL(newvalue, 0);
		var totalPcs = NVL(stoneRows[rowindex].returnedPcs,0) + NVL(stoneRows[rowindex].breakageReceivedPcs,0)	+ NVL(stoneRows[rowindex].breakageNotReceivedPcs,0) + NVL(stoneRows[rowindex].usedPcs, 0);
		
		var wtForNextRow = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedWt');
		var pcsForNextRow = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedPcs');
		updateStoneWtsForTypes(newvalue , rowindex, stoneRows, psr, stoneSrlNo, total , wtForNextRow, pcsForNextRow, totalPcs );
	}
	if(datafield == "breakageNotReceived"){
		var total = NVL(stoneRows[rowindex].returnedWt,0) + NVL(stoneRows[rowindex].breakageReceived,0) + NVL(stoneRows[rowindex].usedWt,0) + NVL(newvalue, 0);
		var totalPcs = NVL(stoneRows[rowindex].returnedPcs,0) + NVL(stoneRows[rowindex].breakageReceivedPcs,0)	+ NVL(stoneRows[rowindex].breakageNotReceivedPcs,0) + NVL(stoneRows[rowindex].usedPcs, 0);
		
		var wtForNextRow = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedWt');
		var pcsForNextRow = $('#stoneDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedPcs');
		updateStoneWtsForTypes(newvalue , rowindex, stoneRows, psr, stoneSrlNo, total , wtForNextRow, pcsForNextRow, totalPcs );
	}
}





// Update Cell Value on change of Stone Grid
var updateCellValueChange = function(row, datafield, columntype, oldvalue, newvalue, event){
		if(datafield == "usedWt" || datafield == "returnedWt" || datafield == "breakageReceived" || datafield == "stoneHCEdited" || datafield == "breakageNotReceived"){
			var grSlNo = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, "srl");
			$("#grDetailsGrid").jqxGrid('setcellvalue', (grSlNo-1), "isValid", false);
		}
		
		
		var grSrlno = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'srl');
		var isPsr = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'isPsr');
		var isStock = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'isStock');
		var orderKind = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'orderKind');
		var costRange = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'costRangeN');
		console.log(costRange);
		var category = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'category');	
		var firstWord = category.split(' ')[0];
		if(typeof category != "undefined" && category != null && firstWord == "CD"){
			if(costRange == null || typeof costRange == "undefined"){
				$.growl.error({ message: "Please select cost Range", duration: 10000, title: 'Error' });
				return false;
			}
		}
		if(datafield == "bulkPcs"){$("#grDetailsGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false)};
		if((datafield == "returnedWt" || datafield == "usedWt") && (typeof usedWt != "undefined" && typeof returnedWt != "undefined")){ 
			$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "flag", "Positive");
			$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "flags", "P");
		}else if((datafield == "returnedWt" || datafield == "usedWt") && ((typeof usedWt == "undefined"  || usedWt == 0) && typeof returnedWt != "undefined")){ 
			$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "flag", "Negative");
			$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, "flags", "N");
		}
		
		if(isStock == "ST" && orderKind == "NO"){
			updateStoneWts(row, datafield, columntype, oldvalue, newvalue);
		}
			
		updateCost(row, datafield, columntype, oldvalue, newvalue, event);
		
}

// Cell Begin edit stone grid validate
var grStoneForPSR = function(row, datafield, columntype) {	
	var grSrlno = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'srl');
    var psrType =  $('#grDetailsGrid').jqxGrid('getcellvalue', (grSrlno-1), 'psr');    
    var issuedPcs = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'issuedPcs');
    var issuedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'issuedWt');
    var suppliedBy = $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'suppliedBy');
    var orderKind =  $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'orderKind');
    var isRwk =  $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'isRwk');
    var stoneUsedWt =  $('#stoneDetailsGrid').jqxGrid('getcellvalue', row, 'stoneUsedWt');
	var stoneBulkWt = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'stoneBulkWt');
	var returnedWt = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'returnedWt');
	var breakageReceived = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'breakageReceived');
	var breakageNotReceived = $('#stoneDetailsGrid').jqxGrid('getcellvalue', i, 'breakageNotReceived');	
						
	
    var totWt = NVL(stoneUsedWt, 0) + NVL(stoneBulkWt, 0);
	var otherCostStone = NVL(returnedWt,0)  + NVL(breakageReceived,0) + NVL(breakageNotReceived,0);	
    
    if( suppliedBy == "CU" && (datafield == "stoneRate" || datafield == "stoneCostRate")){ return false;}
    else if( suppliedBy == "CO" && (datafield == "stoneRate" || datafield == "stoneCostRate")){  return false; }
    else if(orderKind == "SSP" && (datafield == "usedPcs" || datafield == "usedWt")){return false;}
   /* else if(suppliedBy == "CO" && (orderKind == "SRP" || orderKind == "RE_RWK") && parseFloat(totWt) > 0){
    	if(parseFloat(NVL(otherCostStone,0)) < totWt){return false;}
    }*/
    else if (psrType != 'N' &&  (stoneUsedWt == "" || stoneUsedWt == null || stoneUsedWt == 0)  && suppliedBy == "V" && (datafield == "returnedWt" || datafield == "returnedPcs" || datafield == "breakageReceivedPcs" || datafield == "breakageReceived" ||  datafield == "breakageNotReceivedPcs" || datafield == "breakageNotReceived" || datafield == "bulkPcs" || datafield == "bulkWt")) {return false;}
    else if (psrType != 'N' && suppliedBy == "CU" && (datafield == "bulkPcs" || datafield == "bulkWt")) { return false; }
    else if (psrType != 'N' && suppliedBy == "V" && (datafield == "bulkPcs" || datafield == "bulkWt")) { return false; }
    else if (psrType != 'N' && suppliedBy == "CO" && (datafield == "bulkPcs" || datafield == "bulkWt")) { return false; }
    else if (psrType == 'N' && (datafield != "usedPcs" && datafield != "usedWt"  && datafield != "stoneRate"  && datafield != "stoneCostRate")) {  return false; }
    else{ return true; }	
}

var chekcForInvalidDetails= function(){
	var rowIndex = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var articleCode = $("#grDetailsGrid").jqxGrid('getcellvalue', rowIndex, 'articleCode');
	var jwlType = $("#grDetailsGrid").jqxGrid('getcellvalue', rowIndex, 'jwlType');
	var grossWt = $("#grDetailsGrid").jqxGrid('getcellvalue', rowIndex, 'grossWt');
	var netWt = $("#grDetailsGrid").jqxGrid('getcellvalue', rowIndex, 'netWt');
	var pcs = $("#grDetailsGrid").jqxGrid('getcellvalue', rowIndex, 'pcs');
	var costCode = $("#grDetailsGrid").jqxGrid('getcellvalue', rowIndex, 'costCode');
	var attributes = $("#grDetailsGrid").jqxGrid('getcellvalue', rowIndex, 'attributes');
	var articleDesc = $("#grDetailsGrid").jqxGrid('getcellvalue', rowIndex, 'articleDesc');
	var psr = $("#grDetailsGrid").jqxGrid('getcellvalue', rowIndex, 'psr');
	var srl = $("#grDetailsGrid").jqxGrid('getcellvalue', rowIndex, 'srl');
	if(typeof srl == "undefined" || srl == null){
		srl = 1;
	}else{
		srl = srl;
	}
	if(psr == "N"){
		if((typeof articleCode == "undefined" || articleCode == null) || (typeof jwlType == "undefined" || jwlType == null) || (typeof articleDesc == "undefined" || articleDesc == null) || (typeof grossWt == "undefined" || (grossWt == null || grossWt == "")) || (typeof netWt == "undefined" || (netWt == null || netWt == "")) || (typeof pcs == "undefined" || (pcs == null || pcs == "")) ||  (typeof costCode == "undefined" || costCode == null) || (typeof attributes == "undefined" ||attributes == null)){
			$.growl.error({ message: "Please add all mandatory fields for IGR details with Srl No's : " +  srl, duration: 10000, title: 'Error' });
			return false;
		}
	}
	return true;
}

var viewEarlierUsedWeight = function(row){
	var orderNo = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'orderNo');
	var orderSlNo = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'orderSlNo');
	var stoneSlNo = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'stoneSlNo');
	var stoneUsedPcs = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'stoneUsedPcs');
	var stoneUsedWt = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'stoneUsedWt');
	var stoneBulkPcs = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'stoneBulkPcs');
	var stoneBulkWt = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'stoneBulkWt');
	
	var stoneCostPrice  = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'stoneCostPrice');
	var stoneSellingPrice  = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'stoneSellingPrice');	
	$("#orderNo").val(orderNo);
	$("#serialNo").val(orderSlNo);	
	$("#stoneSlNo").val(stoneSlNo);
	$("#earlierUsedPcs").val(stoneUsedPcs);
	$("#earlierUsedWt").val(stoneUsedWt);
	$("#costPrice").val(stoneCostPrice);
	$("#sellingPrice").val(stoneSellingPrice);
	$("#stoneBulkPcs").val(stoneBulkPcs);
	$("#stoneBulkWt").val(stoneBulkWt);
	
}
var checkChekedVal = function(slNo, isUsedReturn){
	var usedReturn =$("#usedReturn_"+slNo).is(":checked");
	var isReturn = $("#isReturn_"+slNo).is(":checked");
	  var name = $(isUsedReturn).attr('name');
	if(usedReturn == true && isReturn == true){
		$('#myCheckbox').attr('checked', true); // Checks it
		(name == "usedReturn")? $("#isReturn_"+slNo).prop('checked', false) : $("#usedReturn_"+slNo).prop('checked', false);
		$.growl.error({ message: "Please select one option for sl. No: " +  (slNo+1), duration: 10000, title: 'Error' });
		return false;
	}else{
		return true;
	}
}

$("#stoneDetailsGrid").bind('cellclick', function (event) {
	var column = event.args.column;
    var rowindex = event.args.rowindex;
    $('#myTableId tbody > tr').remove();

    if(column.datafield == "isCertficateRequired"){
    	
    	var suppliedBy  = $("#stoneDetailsGrid").jqxGrid('getcellvalue', rowindex, 'suppliedBy');
    	var certificateDetails  = $("#stoneDetailsGrid").jqxGrid('getcellvalue', rowindex, 'certificateDetails');
    	console.log(certificateDetails);
    	if(suppliedBy != "CU" && (typeof certificateDetails != "undefined" &&  certificateDetails != "" && certificateDetails != null)){
    		if(suppliedBy == "CO"){
    			$("#suppByCert").hide();
    		}
    		if(suppliedBy == "V"){
    			$("#suppByCert").show();
    		}
    		$("#certDetails").modal({show:true});
    		$("#certDetailsSec").empty();

    		for(var i = 0; i<certificateDetails.length; i++){
    			if(certificateDetails[i].diamondCertificateId != null){
    				var certNumList = certificateDetails[i].certificateNumbersSet;
    				$('#myTableId tbody').append('<tr><td>'+(i+1)+'</td><td>'+certificateDetails[i].certificateNumbersSet+'</td><td class="hide">'+certificateDetails[i].diamondCertificateId+'</td><td>'+certificateDetails[i].caratWeight+'</td><td class="text-center" width="5%"><input type="checkbox" name="isUsed" onclick="checkChekedVal('+i+',this)" id="usedReturn_'+i+'" /></td><td class="text-center" width="5%"><input type="checkbox" onclick="checkChekedVal('+i+',this)" name="usedReturn" id="isReturn_'+i+'" /></td></tr>')
    			}else{
    				$('#myTableId tbody').append('<tr><td colspan="5" style="color:#FF0000; text-align: center;">No record found...</td></tr>');
    			}
    		}
    		
    	}
    }
    
});

// View Earlier used wt
var viewUsedWtModal = function(row, column, value){
	return '<div class="text-center"><button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewEarlierUsedWt" type="button" onclick="viewEarlierUsedWeight('+ row +');"/><span class="fa fa-eye"></span> </button></div>';
}

// Cost Range On Load
var loadCostRangeDropDown = function(row, cellvalue, editor){
	editor.on('click', function(){
		
		var stoneCode = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'stoneCode');
		var clarity = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'clarity');
		var cutGrade = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'cutGrade');
		var color = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'color');
		var actualColor = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'actualColor');
		var wgtRange = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'wgtRange');
		var category = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'category');
		var vendorId = $("#vendorCode-valueC").val();
		
		
		var params =  {"stoneCode" : stoneCode,"clarity":clarity,"cutGrade":cutGrade,"color":color,"actualColor":actualColor, "wgtRange":wgtRange, "category": category,"vendorId" : vendorId};
		postJSON('/OrderExecution/api/v1/listCostRangeForGRFG?type=grFg', JSON.stringify(params), function(data) {			
			var array = [];
			$.each(data.payload.list, function(k,v){
				array.push({"id" : v.id, "name" : v.name});
			});
			editor.jqxDropDownList({source : array, displayMember : 'name', valueMember : 'id'});
		});		
		
	});
}

//Cost Range On Load
var loadCertYesNoDropDown = function(row, cellvalue, editor){
	var suppliedBy = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'suppliedBy');
	var certificateDetails = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'certificateDetails');
	certArray = [];
	console.log(certificateDetails);
	$("#suppByCert").hide();
	if(suppliedBy == "V" && (certificateDetails == null || certificateDetails == "" || certificateDetails.lentgh == 0)){
		var certArray = [{"id" : "Yes", "name" : "Yes"},{"id" : "No", "name" : "No"}];	
		editor.on('click', function(){
			editor.jqxDropDownList({source : certArray, displayMember : 'name', valueMember : 'id'});
		});
	}
	
}
var cerDetArr = [];


$("#certDetails").on("hidden.bs.modal", function(event){
    var rowindex = $("#stoneDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#stoneDetailsGrid").jqxGrid('getrowid', rowindex);
	
	
    var row = $("#stoneDetailsGrid").jqxGrid('getrowdatabyid', rowindex);
    
	var slNo = '', certNo = '', cerId = '', stoneWt = '', isCertUsed = '',isCertRet = '';
	var arr = [];
	cerDetArr = [];
	$('#certDetails tbody tr').each(function (k, v) {
        $(this).find('td').each(function (key, val) {
        	if(key==0){  slNo = $(this).text();}
        	if(key==1){  
        		var certNumbers = $(this).text();
        		var strVale = certNumbers.split(",");
        		for (var i=0; i<strVale.length; i++){
        		    arr.push($.trim(strVale[i]));
        		}
        		certNo = arr;
    		}
        	console.log(val);
        	if(key==2){  cerId = $(this).text();}
        	if(key==3){  stoneWt = $(this).text();}
        	if(key==4){  isCertUsed = $(this).find('input').is(":checked");}
        	if(key==5){  isCertRet = $(this).find('input').is(":checked");}
        });
        var certData = {"certSLNO" : slNo, "certNo" : cerId,  "stoneWt": stoneWt, "isCertUsed" : isCertUsed, "isCertRet": isCertRet};
        cerDetArr.push(certData);
    });
	console.log(JSON.stringify(cerDetArr));
	row['grStoneCertificates'] = cerDetArr;
	row['isCertficateRequired'] = null;
	$('#stoneDetailsGrid').jqxGrid('updaterow', rowindex, row);			
});


// Cost Range Edit
var costRangeEdit = function(row, datafield, columntype){
	var suppliedBy = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'suppliedBy');
	var category = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'category');	
	var isPsr = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'isPsr');	
	var firstWord = category.split(' ')[0];
	if((isPsr == "" || isPsr == null) && suppliedBy == "V" && firstWord == "CD"){
		return true;
	}else if((isPsr != "" || isPsr != null) && (suppliedBy == "V" || suppliedBy == "CO") && firstWord == "CD"){
		return true;
	}else{
		return false;
	}
}

// Cost Range Value Change
var costRangeOnChange = function(row, datafield, columntype, oldvalue, newvalue, event){
	console.log(newvalue);
	$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, 'costRange', newvalue.value);
	$("#stoneDetailsGrid").jqxGrid('setcellvalue', row, 'costRangeN', newvalue.label);
}

var editableCertDet = function(row, datafield, columntype){
	var suppliedBy = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'suppliedBy');
	var certificateDetails = $("#stoneDetailsGrid").jqxGrid('getcellvalue', row, 'certificateDetails');
	if(suppliedBy == "CU"){
		return false;
	}else if(suppliedBy == "CO" && (typeof certificateDetails == "undefined" || certificateDetails == null || certificateDetails == "")){
		return false;
	}else{
		return true;
	} 
}

// Stone Grid related to GR line item.
var stoneGRGrid = function(data){
	var stoneRateTypeSource = {datatype : 'json', 	datafields : [{name : 'id',type : 'string'},{name : 'name',	type : 'string'}],localdata : null};
	var stoneRateDataAdapter = new $.jqx.dataAdapter(stoneRateTypeSource, {	autoBind : true	});
	
	var costRangeSource = {datatype : 'json', 	datafields : [{name : 'id',type : 'string'},{name : 'name',	type : 'string'}],localdata : costRangeArr};
	var costRangeDataAdapter = new $.jqx.dataAdapter(costRangeSource, {	autoBind : true	});
	
	var source = {
			datafields : [ 
				
				{'name' : 'stoneListId','type' : 'long'}, 
				{'name' : 'typeRow','type' : 'boolean'}, 
				{'name' : 'srl','type' : 'long'}, 
				{'name' : 'isRwk','type' : 'boolean'}, 
				{'name' : 'stoneSlNo','type' : 'long'}, 
				{'name' : 'suppliedBy','type' : 'string'},
				{'name' : 'suppliedBys','type' : 'string'},
				{'name' : 'stoneCode','type' : 'string'}, 
				{'name' : 'category','type' : 'string'}, 
				{'name' : 'mainCategoryCode','type' : 'string'}, 
				{'name' : 'segment','type' : 'string'},
				{'name' : 'segmentName','type' : 'string'}, 
				{'name' : 'subCategory','type' : 'string'}, 
				{'name' : 'subCategoryDesc','type' : 'string'}, 
				{'name' : 'flag','type' : 'string'},
				{'name' : 'flags','value' : 'flag'},
				{'name' : 'clarity','type' : 'string'},  
				{'name' : 'actualColor','type' : 'string'}, 
				{'name' : 'wgtRange','type' : 'string'},
				
				{
					name : 'costRange',
					type : 'string'
				},{
					name : 'costRangeN',
					value : 'costRange',
					values : {
						source : costRangeDataAdapter.records,
						value : 'id',
						name : 'name'
					}
				},
			//	{'name' : 'costRangeN','value' : 'costRange',values : {source : costRangeDataAdapter.records,value : 'id',name : 'name'}},
				{'name' : 'color','type' : 'string'}, 
				{'name' : 'cutGrade','type' : 'string'}, 
				{'name' : 'issuedPcs','type' : 'long'}, 
				{'name' : 'issuedWt','type' : 'float'}, 
				
				{'name' : 'orderNo','type' : 'long'}, 
				{'name' : 'orderSlNo','type' : 'long'}, 
				{'name' : 'orderKind','type' : 'string'}, 
				{'name' : 'stoneUsedWt','type' : 'double'}, 
				{'name' : 'stoneUsedPcs','type' : 'long'}, 
				{'name' : 'stoneBulkPcs','type' : 'long'}, 
				{'name' : 'stoneBulkWt','type' : 'long'}, 
				
				{'name' : 'stoneCostPrice','type' : 'float'}, 
				{'name' : 'stoneSellingPrice','type' : 'float'}, 
				
				{'name' : 'usedPcs','type' : 'long'}, 
				{'name' : 'usedWt','type' : 'float'}, 
				{'name' : 'bulkPcs','type' : 'long'}, 
				{'name' : 'pendingBulkWt','type' : 'float'}, 
				{'name' : 'bulkWt','type' : 'float'}, 
				{'name' : 'returnedPcs','type' : 'long'},
				{'name' : 'returnedWt','type' : 'float'}, 
				{'name' : 'breakageReceivedPcs','type' : 'long'}, 
				{'name' : 'breakageReceived','type' : 'float'},
				{'name' : 'breakageNotReceivedPcs','type' : 'long'}, 
				{'name' : 'breakageNotReceived','type' : 'float'},
				{'name' : 'uom','type' : 'string'},	
				{'name' : 'stoneRate','type' : 'float'},
				{'name' : 'stoneRates','value' : 'stoneRate',values : {source : stoneRateDataAdapter.records,value : 'id',name : 'name'}},
				{'name' : 'stoneCost','type' : 'float'},
				{'name' : 'stoneCostRate','type' : 'float'},
				{'name' : 'actSellingRate','type' : 'float'},
				{'name' : 'sellingRate','type' : 'float'},
				{'name' : 'actStoneCostRate','type' : 'float'},
				{'name' : 'sellingPrice','type' : 'float'},
				{'name' : 'systemCostRate','type' : 'double'},
				{'name' : 'GRStoneCostSPDTO','type' : 'array'},
				{'name' : 'stoneHC','type' : 'float'}, 
				{'name' : 'stoneHCEdited','type' : 'float'}, 
				{'name' : 'actStoneHC','type' : 'float'}, 
				{'name' : 'provisional','type' : 'boolean'}, 
				{'name' : 'certificateDetails','type' : 'string'},
				{'name' : 'certificateDetailsN','type' : 'string'},
				{'name' : 'viewUsedWt','type' : 'string'}, 
				{'name' : 'selectionStatus','type' : 'bool'},
				{'name' : 'isPsr','type' : 'string'}, 
				{'name' : 'isStock','type' : 'string'},
				{'name' : 'subCat','type' : 'string'},
				{'name' : 'retStoneCost','type' : 'float'} ,
				{'name' : 'returnStoneCostPrice','type' : 'float'} ,
				{'name' : 'returnStoneSellingPrice','type' : 'float'},
				{'name' : 'returnStoneCostPriceAct','type' : 'float'} ,
				{'name' : 'returnStoneSellingPriceAct','type' : 'float'},
				{'name' : 'grStoneCertificates ','type' : 'array'}	
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
		columnsheight : 50,
		theme: 'energyblue',
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
			
			container.append('<div class="col-md-4 row"><div style="margin-bottom:10px;"  id="addStonedetailsGrid" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i></div></div>');
			container.append('<div class="col-md-4"><div style="margin-bottom:10px; color:#00800; font-size:15px;"  id="orderTypeLabel" class="text-center">Stone Details</div></div>');	
			container.append('<div class="col-md-4 pull-right"><div style="margin-bottom:10px;" id="deleteStonedetailsGrid" class="btn btn-danger btn-sm pull-right"><i class="fa fa-trash fa-md"></i></div></div>');
			
			$("#addStonedetailsGrid").jqxButton();
			$("#deleteStonedetailsGrid").jqxButton();

			$("#addStonedetailsGrid").on('click', function() {				
				//showHideCol();
				if(chekcForInvalidDetails()){
					addStoneGridRow();			
				}
			});
			
			$("#deleteStonedetailsGrid").on('click', function() {
				deleteStoneGridRow();			      
			});
		},
		
		columns : [ 
			{'text' : '',datafield : 'typeRow',sortable : false,editable : false, hidden: true},
			{'text' : 'IGR.Sl.No.',datafield : 'srl',sortable : false,editable : false, width : '2%',cellsalign : 'center',align:'center', filterable: true},
			{'text' : 'Srl.', datafield : 'stoneSlNo',sortable : false,editable : false, width : '4%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Supp.By',datafield : 'suppliedBys',sortable : false,editable : false, width : '4%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Stn.Code',datafield : 'stoneCode',sortable : false,editable : true, width : '4%',cellsalign : 'center',align:'center',cellbeginedit: stoneSearchPopUp, filterable: false}, 
			{'text' : 'Sub Cat./Shape',datafield : 'subCategoryDesc',sortable : false,editable : false, width : '4%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Flag',datafield : 'flag',sortable : false,editable : false, width : '3%',cellsalign : 'center',align:'center',columntype : 'dropdownlist',displayfield : 'flags', initeditor: flagDropDown, filterable: false},
			{'text' : 'Cost Range',datafield : 'costRange',sortable : false,editable : true,width : '4%',cellsalign : 'center',align:'center',columntype : 'dropdownlist',displayfield : 'costRangeN', initeditor : loadCostRangeDropDown,cellbeginedit: costRangeEdit },
			{'text' : 'Issued/Req.Pcs.',datafield : 'issuedPcs',sortable : false,editable : false, width : '4%',cellsalign : 'center',align:'center',cellbeginedit: grStoneForPSR, filterable: false},
			{'text' : 'Issued Wt.',datafield : 'issuedWt',sortable : false,editable : false, width : '4%',cellsalign : 'center',align:'center',cellsformat : 'd3',columntype : 'numberinput',cellbeginedit: grStoneForPSR, createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3}); }, filterable: false}, 
			{'text' : 'Used Pcs',datafield : 'usedPcs',columntype : 'numberinput',sortable : false,editable : true, width : '3%',cellsalign : 'center',align:'center', validation : commonValidateStone,cellbeginedit: grStoneForPSR, cellvaluechanging : updateCellValueChange, filterable: false}, 
			{'text' : 'Used Wt.',datafield : 'usedWt',sortable : false,cellsformat : 'd3',editable : true, width : '4%',cellsalign : 'center',align:'center', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput', validation : commonValidateStone,cellbeginedit: grStoneForPSR, cellvaluechanging : updateCellValueChange, filterable: false}, 
			{'text' : 'Bulk Pcs',datafield : 'bulkPcs',columntype : 'numberinput',sortable : false,editable : true, width : '4%',cellsalign : 'center',align:'center', validation : commonValidateStone, validation : commonValidateStone,cellbeginedit: grStoneForPSR, cellvaluechanging : updateCellValueChange, filterable: false}, 
			{'text' : 'Bulk Wt.',datafield : 'bulkWt',sortable : false,cellsformat : 'd3',editable : true, width : '4%',cellsalign : 'center',align:'center', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3}); },columntype : 'numberinput',cellbeginedit: grStoneForPSR, validation : commonValidateStone, filterable: false}, 
			{'text' : 'Retd.Pcs.',datafield : 'returnedPcs',columntype : 'numberinput',sortable : false,editable : true, width : '4%',cellsalign : 'center',align:'center', cellbeginedit: grStoneForPSR,validation : commonValidateStone, filterable: false},
			{'text' : 'Retd.Wt.',datafield : 'returnedWt',sortable : false,cellsformat : 'd3',editable : true, width : '4%',cellsalign : 'center',align:'center', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput', validation : commonValidateStone,cellbeginedit: grStoneForPSR,cellvaluechanging: updateCellValueChange, filterable: false}, 
			{'text' : 'Break.Rec.pcs.',datafield : 'breakageReceivedPcs',columntype : 'numberinput',sortable : false,editable : true, width : '4%',cellsalign : 'center',align:'center', validation : commonValidateStone,cellbeginedit: grStoneForPSR, filterable: false},
			{'text' : 'Break.Rec.Wt.',datafield : 'breakageReceived',sortable : false,editable : true,cellsformat : 'd3', width : '4%',cellsalign : 'center',align:'center', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3}); },columntype : 'numberinput', validation : commonValidateStone,cellbeginedit: grStoneForPSR, cellvaluechanging : updateCellValueChange, filterable: false}, 
			{'text' : 'Break.Loss Not Rec.Pcs.',datafield : 'breakageNotReceivedPcs',columntype : 'numberinput',sortable : false,editable : true, width : '4%',cellsalign : 'center',align:'center', validation : commonValidateStone,cellbeginedit: grStoneForPSR, filterable: false}, 
			{'text' : 'Break.Not Rec.Wt.',datafield : 'breakageNotReceived',sortable : false,cellsformat : 'd3',editable : true, width : '4%',cellsalign : 'center',align:'center', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput', validation : commonValidateStone,cellbeginedit: grStoneForPSR, cellvaluechanging : updateCellValueChange, filterable: false}, 
			{'text' : 'UQC',datafield : 'uom',sortable : false,editable : false, width : '3%',cellsalign : 'center',align:'center',cellbeginedit: grStoneForPSR, filterable: false}, 
			{'text' : 'Stn.Cost Rate',datafield : 'stoneRate',sortable : false,editable : false, width : '4%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Stn.Cost Rate (Edited)',datafield : 'stoneCostRate',sortable : false,editable : true, width : '4%',cellsalign : 'center',align:'center',cellsformat : 'd2',columntype : 'numberinput',cellbeginedit: grStoneForPSR, cellvaluechanging : updateOnchangeStoneRateSC, filterable: false},		
			{'text' : 'Stn.Cost',datafield : 'stoneCost',sortable : false,editable : false, width : '4%',cellsalign : 'center',align:'center',cellsformat : 'd2',columntype : 'numberinput', filterable: false}, 
			{'text' : 'Stn.HC Edited',datafield : 'stoneHCEdited',sortable : false,editable : true,width : '3%',cellsalign : 'center',align:'center', cellvaluechanging : updateCellValueChange},
			{'text' : 'Stn.HC',datafield : 'stoneHC',sortable : false,editable : false, width : '3%',cellsalign : 'center',align:'center', cellvaluechanging : updateCellValueChange, filterable: false}, 
			{'text' : 'Provisional',datafield : 'provisional',sortable : false,editable : false, width : '3%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Cert.Req.',datafield : 'isCertficateRequired',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'isCertficateRequireds', width : '3%',cellsalign : 'center',align:'center', initeditor: loadCertYesNoDropDown, cellbeginedit: editableCertDet, filterable: false},
			{'text' : '',datafield : 'viewUsedWt',sortable : false,editable : false, width : '3%',cellsalign : 'center',align:'center', filterable: false, cellsrenderer: viewUsedWtModal},

			{'text' : '',datafield : 'certificateDetails', hidden: true},
			{'text' : '', datafield : 'grStoneCertificates ', hidden: true},
			// Hidden field of stone 
			{'text' : 'Supp.By',datafield : 'suppliedBy', hidden: true}, 
			{'text' : '',datafield : 'stoneListId',  hidden: true},
			{'text' : '',datafield : 'isPsr', hidden: true}, 
			{'text' : '',datafield : 'isStock',hidden : true},
			{'text' : '',datafield : 'subCat',hidden : true},
			{'text' : '',datafield : 'mainCategoryCode',hidden : true},
			{'text' : '',datafield : 'category',hidden : true},
			{'text' : '',datafield : 'retStoneCost',hidden : true},
			{'text' : '',datafield : 'sellingRate',hidden : true},
			{'text' : '',datafield : 'actSellingRate',hidden : true},
			{'text' : '',datafield : 'sellingPrice',hidden : true},
			{'text' : '',datafield : 'wgtRange',hidden : true},
			{'text' : '',datafield : 'pendingBulkWt',hidden : true},
			
			
			{'text' : '',datafield : 'orderNo',hidden : true},
			{'text' : '',datafield : 'orderSlNo',hidden : true},
			{'text' : '',datafield : 'stoneUsedWt',hidden : true},
			{'text' : '',datafield : 'stoneUsedPcs',hidden : true},
			{'text' : '',datafield : 'stoneBulkPcs',hidden : true},
			{'text' : '',datafield : 'stoneBulkWt',hidden : true},
			{'text' : '',datafield : 'actStoneHC',hidden : true},			
			{'text' : '',datafield : 'stoneCostPrice',hidden : true},
			{'text' : '',datafield : 'stoneSellingPrice',hidden : true},
			{'text' : '',datafield : 'orderKind',hidden : true},
			{'text' : '',datafield : 'isRwk',hidden : true},
			{'text' : '',datafield : 'returnStoneCostPrice',hidden : true},
			{'text' : '',datafield : 'returnStoneSellingPrice',hidden : true},
			{'text' : '',datafield : 'returnStoneCostPriceAct',hidden : true},
			{'text' : '',datafield : 'returnStoneSellingPriceAct',hidden : true}
			
		]
	});	
}

// Generate new row for acc.
var generaterowacc = function(i, grSrlNo) {
	var row = {};	
	row["accListId"] = null;
	row["typeRow"] = true;
	row["srl"] = grSrlNo;
	row["accSrNo"] = i;
	row["id"] = null;
	row["suppliedBy"] = "V";
	row["suppliedBys"] = "Vendor";
	row["accCode"] = null;
	row["subCategory"] = null;
	row["flag"] = "P";
	row["flags"] = "Positive";
	row["issuedPcs"] = null;
	row["issuedWt"] = null;
	row["usedPcs"] = null;
	row["usedWt"] = null;

	row["orderNo"] = null;
	row["orderSlNo"] = null;
	row["accUsedPcs"] = null;
	row["accUsedWt"] = null;
	row["accCostPrice"] = null;
	row["accSellingPrice"] = null;

	row["returnAccCostPrice"] = null;
	row["returnAccSellingPrice"] = null;
	row["returnAccCostPriceAct"] = null;
	row["returnAccSellingPriceAct"] = null;
	
	row["returnedPcs"] = null;
	row["returnedWt"] = null;
	row["breakageReceivedPcs"] = null;
	row["breakageReceived"] = null;
	row["breakageNotReceivedPcs"] = null;
	row["breakageNotReceived"] = null;
	row["uom"] = null;
	row["accRate"] = null;
	row["systemCostRateList"] = null;
	row["accRateEdited"] = null;
	row["actAccRateEdited"] = 0;
	row["accCost"] = null;
	row["accHC"] = null;
	row["actAccHC"] = 0;
	row["accHCEdited"] =0;
	row["provisional"] = false;
	row["isPsr"] = null;
	row["accCostRange "] = null;
	row["isStock"] = null;
	row["orderKind"] = null;
	row["sellingRate"] = null;
	row["actSellingRate"] = null;
	return row;
}

var generaterowaccPSR = function(ad) {
	console.log(row);
	var row = {};	
	row["accListId"] = ad.accListId;
	row["typeRow"] = false;
	row["srl"] = ad.srl;
	row["accSrNo"] = ad.accSrNo;
	row["suppliedBy"] = ad.suppliedBy;
	row["suppliedBys"] = ad.suppliedByType;
	row["accCode"] = ad.accCode;
	row["subCategory"] = ad.subCategory;
	row["flag"] = "P";
	row["flags"] = "Positive";
	row["issuedPcs"] = ad.issuedPcs;
	row["issuedWt"] = ad.issuedWt;
	row["isRwk"] = ad.isRwk;
	row["orderNo"] = ad.orderNo;
	row["orderSlNo"] = ad.orderSlNo;
	row["accUsedPcs"] = ad.accUsedPcs;
	row["accUsedWt"] = ad.accUsedWt;
	row["accCostPrice"] = ad.accCostPrice;
	row["accSellingPrice"] = ad.accSellingPrice;

	row["returnAccCostPrice"] = ad.returnAccCostPrice;
	row["returnAccSellingPrice"] = ad.returnAccSellingPrice;
	row["returnAccCostPriceAct"] = ad.returnAccCostPrice;
	row["returnAccSellingPriceAct"] = ad.returnAccSellingPrice;
	
	
	row["usedPcs"] = ad.usedPcs;
	row["usedWt"] = ad.usedWt;
	row["bulkPcs"] = null;
	row["bulkWt"] = null;
	row["returnedPcs"] = null;
	row["returnedWt"] = null;
	row["breakageReceivedPcs"] = null;
	row["breakageReceived"] = null;
	row["breakageNotReceivedPcs"] = null;
	row["breakageNotReceived"] = null;
	row["uom"] = ad.uom;
	row["accRate"] = ad.accRate;
	row["accRateN"] = ad.accRate;
	row["systemCostRateList"] = ad.systemCostRateList;
	row["accRateEdited"] = ad.accRateEdited;
	row["actAccRateEdited"] = ad.actAccRateEdited;
	row["accCost"] = 0.00;
	row["accHC"] = ad.accHC;
	row["actAccHC"] = ad.actAccHC;
	row["accHCEdited"] = ad.accHCEdited;
	
	row["provisional"] = false;
	row["accCostRange "] = ad.wgtRange;
	row["isPsr"] = ad.isPsr;
	row["isStock"] = ad.isStock;
	row["orderKind"] = ad.orderKind;
	row["sellingRate"] = ad.sellingRate;
	row["actSellingRate"] = ad.actSellingRate;
	row["accItemId"] = ad.accItemId;
	

	console.log(row);
	return row;
}

//Add Acc row checking with GR details grid. For None PSR allowed to add row other not allowed.
var addAccGridRow = function(){
	//debugger;
	var selectedrowindexGRDetailsGrid = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	var psr = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'psr');
	//$("#grDetailsGrid").jqxGrid('setcellvalue', selectedrowindexGRDetailsGrid, 'isValid', false);
	var gWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', selectedrowindexGRDetailsGrid, 'grossWt');
	var nWt = $('#grDetailsGrid').jqxGrid ('getcellvalue', selectedrowindexGRDetailsGrid, 'netWt');
	
	var isValid = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'isValid');
	
	if(isValid == true){
		$.growl.warning({ message:"Line item is already validate." , duration: 10000, title: 'Notice' });
		return false;
	}
	
	if(psr == "N"){	
		if(parseFloat(NVL(gWt,0)) == parseFloat(NVL(nWt,0))){
			$.growl.error({ message:"Addition of acc is allowed for NONE PSR Gross Wt and Net Wt should not be same!" , duration: 10000, title: 'Error' });
			return false;
		}else{
			var rowIdOrg,rowId = 0;		
			var accGridArray = [];
			var rowscountOriginal = $("#accDetailsGrid").jqxGrid('getdatainformation').rowscount;
			var grSrlNo = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'srl');
			var stoneGrSlrNo = $("#accDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'srl');
			
			var rowData = $("#accDetailsGrid").jqxGrid("getrows");
			$.each(rowData, function(k, v){
				if(v.srl == grSrlNo){
					accGridArray.push(v);
				}
			});	
			
			var rowscount = accGridArray.length;
			
			(rowscountOriginal == 0) ? rowIdOrg = 1 : rowIdOrg = rowIdOrg + 1 ;
			
			(rowscount == 0) ? rowId = 1 : rowId = rowscount + 1;
			
			
			var datarow = generaterowacc(rowId, grSrlNo);
			var commit = $("#accDetailsGrid").jqxGrid('addrow', null, datarow);					
		    
			var boundindex = $('#accDetailsGrid').jqxGrid('getrowboundindex', rowscountOriginal);
			$("#accDetailsGrid").jqxGrid('selectrow', boundindex);
			$("#accDetailsGrid").jqxGrid('ensurerowvisible', boundindex);
		}
	}else{
		$.growl.error({ message:"Addition of accessory is allowed for NONE PSR only!" , duration: 10000, title: 'Error' });
		
	}
}



// Delete row not allowed for PSR but allowed for None PSR.
var deleteAccGridRow = function(){
	var selectedrowindexGRDetailsGrid = $("#grDetailsGrid").jqxGrid('getselectedrowindex');
	
	var psr = $("#grDetailsGrid").jqxGrid('getcellvalue', selectedrowindexGRDetailsGrid, 'psr');
	var selectedrowindex = $("#accDetailsGrid").jqxGrid('getselectedrowindex');
	var typeRow = $("#accDetailsGrid").jqxGrid('getcellvalue', selectedrowindex, 'typeRow');
	$("#grDetailsGrid").jqxGrid('setcellvalue', selectedrowindexGRDetailsGrid, 'isValid', false);
	if(psr == "N" && typeRow == true){
		
		var rowscount = $("#accDetailsGrid").jqxGrid('getdatainformation').rowscount;					
		var grSlNo =  $("#accDetailsGrid").jqxGrid('getcellvalue', selectedrowindex, 'srl');
		
		if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
			var id = $("#accDetailsGrid").jqxGrid('getrowid',selectedrowindex);
			var commit = $("#accDetailsGrid").jqxGrid('deleterow', id);
		}
		
		var k = 1;
		var rows = $("#accDetailsGrid").jqxGrid('getrows');
		for(var i=0; i<rows.length; i++){
			if(grSlNo == rows[i].srl){
				$("#accDetailsGrid").jqxGrid('setcellvalue', i, 'accSrNo', k);
				k = k + 1;
			}
		}
		
		setTimeout(function () {
			$('#accDetailsGrid').jqxGrid('selectrow', (rowscount - 2));
			$('#accDetailsGrid').jqxGrid('ensurerowvisible', (rowscount - 2));
	    }, 0);
	}else{
		$.growl.error({ message:"For PSR, delete is not allowed." , duration: 10000, title: 'Error' });
	}
}

// Cell begin edit of Acc col
var grAccForPSR = function(row, datafield, columntype) {	
	//debugger;
	var grSrlno = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'srl');
    var psrType =  $('#grDetailsGrid').jqxGrid('getcellvalue', (grSrlno-1), 'psr');    
    var issuedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'issuedPcs');
    var issuedWt = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'issuedWt');
    var suppliedBy = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'suppliedBy');
    var orderKind =  $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'orderKind');
    var accUsedWt = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'accUsedWt');
    var returnedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'returnedPcs');
    var returnedWt = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'returnedWt');
    var breakageReceivedPcs = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'breakageReceivedPcs');
    var breakageReceived = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'breakageReceived');
    var systemCostRateList = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'systemCostRateList');
    console.log(systemCostRateList);
    if(suppliedBy == "CU" && (datafield == "accRate" || datafield == "accRateEdited")){ return false;}
    else if( suppliedBy == "CO" && (datafield == "accRate" || datafield == "accRateEdited")){  return false; }
    else if(orderKind == "SSP" && (datafield == "usedPcs" || datafield == "usedWt")){return false;}
    else if (psrType != 'N' && systemCostRateList == null && suppliedBy == "V" && (accUsedWt == 0 || accUsedWt == "" || accUsedWt == null) && (datafield == "returnedWt" || datafield == "returnedPcs" || datafield == "breakageReceivedPcs" || datafield == "breakageReceived" ||  datafield == "breakageNotReceivedPcs" || datafield == "breakageNotReceived" || datafield == "bulkPcs" || datafield == "bulkWt")) {return false;}
    else if (psrType != 'N' && suppliedBy == "CU" && (datafield == "bulkPcs" || datafield == "bulkWt")) { return false; }
    else if (psrType == 'N' && (datafield != "usedPcs" && datafield != "usedWt"  && datafield != "accRate"  && datafield != "accRateEdited")) {  return false; }
    else if (psrType != 'N' && suppliedBy == "V" && (accUsedWt == 0 || accUsedWt == "" || accUsedWt == null) && (datafield == "returnedWt" || datafield == "returnedPcs" || datafield == "breakageReceivedPcs" || datafield == "breakageReceived" ||  datafield == "breakageNotReceivedPcs" || datafield == "breakageNotReceived" || datafield == "bulkPcs" || datafield == "bulkWt")) {return false;}
    else{ return true; }
	
}

$("#accSubCatEdit").hide();
$("#accSubCat").show();
$("#accCostRangeEdit").hide();
$("#accCostRange").show();

//GR Accessory search pop up
var accSearchPopUp = function(rowId)  {	
	grAccForPSR();
	//debugger;
	$("#accSubCatEdit").hide();
	$("#accSubCat").show();
	$("#accCostRangeEdit").hide();
	$("#accCostRange").show();
	$("#manageAccForm").trigger('reset');
	var grSrlno = $('#accDetailsGrid').jqxGrid('getcellvalue', rowId, 'srl');
    var psrType =  $('#grDetailsGrid').jqxGrid('getcellvalue', (grSrlno -1), 'psr');
    $("#accSegment").val('Accessory');
    var rowindex1 = $("#accDetailsGrid").jqxGrid('getselectedrowindex');
    var rowid1 = $("#accDetailsGrid").jqxGrid('getrowid', rowindex1);
    var row1 = $("#accDetailsGrid").jqxGrid('getrowdatabyid', rowid1);
    console.log(rowindex1 + ", "+ rowid1 + ", " + row1)
    if(typeof row1 != "undefined" || row1 != null){ 
    	console.log(rowindex1 + ", "+ rowid1 + ", " + row1 +", "+row1.accCode)
    	
    	if(row1.boundindex == rowid1 && (row1.accCode != null || row1.accCode != "")){
    	
    	if(row1.accSupBy == "" || row1.accSupBy == null){
    		var accSupBy = "";
    	}else{
    		var accSupBy = " <b>Supplied By : </b> Vendor";
    	}
    	
    	if(row1.accSegment == "" || row1.accSegment == null){
    		var accSegment = "";
    	}else{
    		var accSegment = ", <b>Segment : </b> " + row1.accSegment;
    	}
    	
    	if(row1.accMainCat == "" || row1.accMainCat == null){
    		var accMainCat = "";
    	}else{
    		var accMainCat = ", <b>Main Category : </b> " + row1.accMainCat;
    	}
    	
    	if(row1.subCategory == "" || row1.subCategory == null){
    		var subCategory = "";
    	}else{
    		var subCategory = ", <b>Sub Category : </b> " + row1.subCategory;
    	}
    	
    	if(row1.accCostRange == "" || row1.accCostRange == null){
    		var accCostRange = "";
    	}else{
    		var accCostRange = ", <b>Cost Range : </b> " + row1.accCostRange;
    	}
    	
    	if(row1.accCode == "" || row1.accCode == null){
    		var accCode = "";
    	}else{
    		var accCode = ", <b>Acc Code : </b> " + row1.accCode;
    	}
    	
    	if(row1.uom == "" || row1.uom == null){
    		var uom = "";
    	}else{
    		var uom = ", <b>UOM : </b> " + row1.uom;
    	}
    	
    	var accDetails = accSupBy + accSegment + accMainCat + subCategory + accCostRange + accCode + uom;

    	$("#accDet").html("<div class='well'>" + accDetails + "</div>");
    }else{
    	$("#accDet").html("");
    }
    	
    }else{
    	$("#accDet").html("");
    }
    if(psrType == "N"){
    	$("#accSearch").modal({ remote: "accSearch?from=grfg", target: "accSearch" });
    }
	return false;
}

// On load of Acc search modal pop up.
$('#accSearch').on('loaded.bs.modal',	function(e) {
	$("#accSegment").val('Accessory');
	$("#accSubCatEdit").hide();
	$("#accSubCat").show();
	$("#accCostRangeEdit").hide();
	$("#accCostRange").show();
	var rowindex = $("#accDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#accDetailsGrid").jqxGrid('getrowid', rowindex);
	var row = $("#accDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	var suppliedBy = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'suppliedBy');
	
	$("#accSupBy").val(suppliedBy).change();
});

//On close of acc search modal pop up.
$('#accSearch').on('hide.bs.modal', function(e) {
	//debugger;
	$("#accSegment").val('Accessory');
	var rowindex = $("#accDetailsGrid").jqxGrid('getselectedrowindex');
	var rowid = $("#accDetailsGrid").jqxGrid('getrowid', rowindex);
	var row = $("#accDetailsGrid").jqxGrid('getrowdatabyid', rowid);
	console.log(rowindex + ", "+  rowid + ", " + row)
	//if($("#suppBy").val() != "" && $('#accSegment').val() != "" &&  $("#accMainCat option:selected").val() != "" && $("#accArticleCode").val()!= ""){
	if($("#accSupBy").val() != ""  ||  $('#accSegment').val() != ""  ||  $("#accMainCat option:selected").val() != "" || $("#accArticleCode").val()!= ""){
		if ($("#subCatDesc").val() != "") {
		row["accSupBy"] = $("#suppBy").val();
		row["accSegment"] = $('#accSegment').val();
		row["accMainCat"] = $("#accMainCat option:selected").text();
		row["accMainCatId"] = $("#accMainCat option:selected").val();
		row["subCategory"] = $("#accSubCat option:selected").text();
		row["accCostRange"] = $("#accCostRange option:selected").val();
		row["accSubCatId"] = $("#accSubCat option:selected").val();
		row["accCode"] = $("#accArticleCode").val();
		row["uom"] = $("#uomAcc").val();
		
		$('#accDetailsGrid').jqxGrid('updaterow', rowid, row);				
	}
	else{
		//debugger;
	}
	$("#accDetailsGrid").jqxGrid('focus');
	}else{
		//debugger;
	}
	
});

var updateAccWtsForTypes =  function (newvalue , rowindex, accRows, psr, accSrlNo, total , wtForNextRow, pcsForNextRow,totalPcs ){

	var check = NVL(wtForNextRow,0) - NVL(total,0);
	
	if(check < 0){
		return false;
	}
	
	var grSrl =  accRows[rowindex].srl;
	var grMasterRows = $("#grDetailsGrid").jqxGrid('getrows');
	
	for(var k = 0; k<grMasterRows.length; k++){
		if((psr == grMasterRows[k].psr) && (grMasterRows[k].srl >= grSrl)){
			$('#grDetailsGrid').jqxGrid('setcellvalue', k , 'isValid', false);
		}
	}
	
	for(var i = rowindex+1; i < accRows.length; i++ ){
		if(psr == accRows[i].isPsr && accSrlNo == accRows[i].accSrNo && accRows[i].isStock == "ST" && accRows[i].suppliedBy != "V"){
			var IssuewtForRow = NVL(wtForNextRow,0) - NVL(total,0);
			var IssuePcsForRow = NVL(pcsForNextRow,0) - NVL(totalPcs,0);
			
			if(IssuewtForRow < 0){
				var j = i;
					if(psr == accRows[j].isPsr && accSrlNo == accRows[j].accSrNo){
						$('#accDetailsGrid').jqxGrid('setcellvalue', j, 'issuedWt', 0);
						$('#accDetailsGrid').jqxGrid('setcellvalue', j, 'usedWt', 0);
						$('#accDetailsGrid').jqxGrid('setcellvalue', j, 'returnedWt', 0);
						$('#accDetailsGrid').jqxGrid('setcellvalue', j, 'breakageReceived', 0);
						$('#accDetailsGrid').jqxGrid('setcellvalue', j, 'breakageNotReceived', 0);
						$('#accDetailsGrid').jqxGrid('setcellvalue', j, 'issuedPcs',  0);
						$('#accDetailsGrid').jqxGrid('setcellvalue', j, 'usedPcs', 0);
						$('#accDetailsGrid').jqxGrid('setcellvalue', j, 'returnedPcs', 0);
						$('#accDetailsGrid').jqxGrid('setcellvalue', j, 'breakageReceivedPcs', 0);
						$('#accDetailsGrid').jqxGrid('setcellvalue', j, 'breakageNotReceivedPcs',0);
					}
			}
			else if(IssuewtForRow >= 0){
				var j = i;
					if(psr == accRows[j].isPsr && accSrlNo == accRows[j].accSrNo){
						$('#accDetailsGrid').jqxGrid('setcellvalue', j, 'issuedWt', IssuewtForRow);
						$('#accDetailsGrid').jqxGrid('setcellvalue', j, 'issuedPcs', IssuePcsForRow);
						
						var usedWtN = $('#accDetailsGrid').jqxGrid('getcellvalue', j, 'usedWt');
						var returnedWtN = $('#accDetailsGrid').jqxGrid('getcellvalue', j, 'returnedWt');
						var breakageReceivedN = $('#accDetailsGrid').jqxGrid('getcellvalue', j, 'breakageReceived');
						var breakageNotReceivedN = $('#accDetailsGrid').jqxGrid('getcellvalue', j, 'breakageNotReceived');
						
						var usedPcsN = $('#accDetailsGrid').jqxGrid('getcellvalue', j, 'usedPcs');
						var returnedPcsN = $('#accDetailsGrid').jqxGrid('getcellvalue', j, 'returnedPcs');
						var breakageReceivedPcsN = $('#accDetailsGrid').jqxGrid('getcellvalue', j, 'breakageReceivedPcs');
						var breakageNotReceivedPcsN = $('#accDetailsGrid').jqxGrid('getcellvalue', j, 'breakageNotReceivedPcs');
						
						
						total = NVL(returnedWtN,0) + NVL(breakageReceivedN,0) + NVL(breakageNotReceivedN,0) + NVL(usedWtN, 0);
						totalPcs = NVL(returnedPcsN,0) + NVL(breakageReceivedPcsN,0) + NVL(breakageNotReceivedPcsN,0) + NVL(usedPcsN, 0);
						
						wtForNextRow = IssuewtForRow;
						pcsForNextRow = IssuePcsForRow;
					}
			}
		}
	}
}


var updateAccWts = function(row, datafield, columntype, oldvalue, newvalue){
    
	var rowindex = $("#accDetailsGrid").jqxGrid('getselectedrowindex');
    var accRows = $("#accDetailsGrid").jqxGrid('getrows');
	var psr = accRows[rowindex].isPsr;
	var accSrlNo = accRows[rowindex].accSrNo;
	
	if(datafield == "usedWt" ){
		var total = NVL(accRows[rowindex].returnedWt,0) + NVL(accRows[rowindex].breakageReceived,0) + NVL(accRows[rowindex].breakageNotReceived,0) + NVL(newvalue, 0);
		var totalPcs = NVL(accRows[rowindex].returnedPcs,0) + NVL(accRows[rowindex].breakageReceivedPcs,0) + NVL(accRows[rowindex].breakageNotReceivedPcs,0) + NVL(accRows[rowindex].usedPcs, 0);
		
		var wtForNextRow = $('#accDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedWt');
		var pcsForNextRow = $('#accDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedPcs');
		
		updateAccWtsForTypes(newvalue , rowindex, accRows, psr, accSrlNo, total , wtForNextRow, pcsForNextRow,totalPcs );
	}
	if(datafield == "returnedWt" ){
		var total = NVL(accRows[rowindex].usedWt,0) + NVL(accRows[rowindex].breakageReceived,0) + NVL(accRows[rowindex].breakageNotReceived,0) + NVL(newvalue, 0);
		var totalPcs = NVL(accRows[rowindex].returnedPcs,0) + NVL(accRows[rowindex].breakageReceivedPcs,0) + NVL(accRows[rowindex].breakageNotReceivedPcs,0) + NVL(accRows[rowindex].usedPcs, 0);
		
		var wtForNextRow = $('#accDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedWt');
		var pcsForNextRow = $('#accDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedPcs');
		
		updateAccWtsForTypes(newvalue , rowindex, accRows, psr, accSrlNo, total , wtForNextRow , pcsForNextRow,totalPcs);
	}
	if(datafield == "breakageReceived" ){
		var total = NVL(accRows[rowindex].returnedWt,0) + NVL(accRows[rowindex].usedWt,0) + NVL(accRows[rowindex].breakageNotReceived,0) + NVL(newvalue, 0);
		var totalPcs = NVL(accRows[rowindex].returnedPcs,0) + NVL(accRows[rowindex].breakageReceivedPcs,0) + NVL(accRows[rowindex].breakageNotReceivedPcs,0) + NVL(accRows[rowindex].usedPcs, 0);
		
		var wtForNextRow = $('#accDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedWt');
		var pcsForNextRow = $('#accDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedPcs');
		
		updateAccWtsForTypes(newvalue , rowindex, accRows, psr, accSrlNo, total , wtForNextRow, pcsForNextRow,totalPcs );
	}
	if(datafield == "breakageNotReceived" ){
		var total = NVL(accRows[rowindex].returnedWt,0) + NVL(accRows[rowindex].breakageReceived,0) + NVL(accRows[rowindex].usedWt,0) + NVL(newvalue, 0);
		var totalPcs = NVL(accRows[rowindex].returnedPcs,0) + NVL(accRows[rowindex].breakageReceivedPcs,0) + NVL(accRows[rowindex].breakageNotReceivedPcs,0) + NVL(accRows[rowindex].usedPcs, 0);
		
		var wtForNextRow = $('#accDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedWt');
		var pcsForNextRow = $('#accDetailsGrid').jqxGrid('getcellvalue', rowindex, 'issuedPcs');
		
		updateAccWtsForTypes(newvalue , rowindex, accRows, psr, accSrlNo, total , wtForNextRow, pcsForNextRow,totalPcs );
	}
}

var updateAccStoneCost = function(datafield,row, newvalue){
	var usedPcs = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "usedPcs");
	var accRateEdited = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accRateEdited");
	var accHCEdited = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'accHCEdited');
	var actAccHC = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'actAccHC');
	
	var accHC = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accHC");
	var  sellingRate = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "sellingRate");
	var suppliedBy = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "suppliedBy");
	var uom = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "uom");
	var accCost = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accCost");
	
	if(suppliedBy == "V"){
		if(datafield == "usedWt"){
			(uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", newvalue*parseFloat(accRateEdited)) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", usedPcs*parseFloat(accRateEdited));
		}
		if(datafield == "usedPcs"){
			(uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", usedWt*parseFloat(accRateEdited)) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", newvalue*parseFloat(accRateEdited));
		}
	}
	if(suppliedBy == "CO"){		
		
		if(datafield == "usedWt"){
			 (uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accHC", newvalue*parseFloat(accHCEdited)) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accHC", usedPcs* parseFloat(accHCEdited));						 
			 (uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", (newvalue * parseFloat(accRateEdited) + newvalue*parseFloat(NVL(accHCEdited,0)))) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", (usedPcs * parseFloat(accRateEdited) + usedPcs*parseFloat(NVL(accHCEdited,0))));
		}
		if(datafield == "usedPcs"){
			 (uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accHC", usedWt*parseFloat(accHCEdited)) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accHC", newvalue* parseFloat(accHCEdited));						 
			 (uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", (usedWt * parseFloat(accRateEdited) + usedWt*parseFloat(NVL(accHCEdited,0)))) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", (newvalue * parseFloat(accRateEdited) + newvalue*parseFloat(NVL(accHCEdited,0))));
		}
		if(datafield == "accHCEdited"){
			(uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accHC", usedWt*newvalue) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accHC", usedPcs* newvalue); 
			(uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", (usedWt * parseFloat(accRateEdited) + usedWt*newvalue)) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", (usedPcs * parseFloat(accRateEdited) + usedPcs*newvalue));
		}
	}
	
	if(suppliedBy == "CU"){
			$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", 0);
			if(datafield == "usedWt"){
				 (uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accHC", newvalue*parseFloat(accHCEdited)) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accHC", usedPcs* parseFloat(accHCEdited));							 
			}
			if(datafield == "usedPcs"){
				 (uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accHC", usedWt*parseFloat(accHCEdited)) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accHC", newvalue* parseFloat(accHCEdited));							 
			}
			if(datafield == "accHCEdited"){
				(uom=="Cts"  || uom == "Gms") ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accHC", usedWt*newvalue) : $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accHC", usedPcs* newvalue);
			}
	}
	
	if(sellingRate == null || sellingRate == ""){
		$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", 0.00);
	}else{
		if(uom=="Cts"  || uom == "Gms"){
			$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt*parseFloat(NVL(sellingRate,0)));
		}else{
			$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedPcs*parseFloat(NVL(sellingRate,0)));
		}
	}
}

var accCostRateCheck = function(accCode,suppliedBy,vendorId,accCostRateEdited,orderKind,usedWt,uom,usedPcs,isVendorFlag,row){
	var accListId = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accListId");
	var accRate = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accRate");
	var isPsr = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "isPsr");
	
//	var editAccRate = null;
//	if(accRate == accCostRateEdited){
//		editAccRate = null;
//	}else{
	var	editAccRate = (accCostRateEdited == 0) ? null : accCostRateEdited;
	//}
	if(isPsr == null || isPsr == "N"){		
		var isPsrVal = false;
	}else{
		var isPsrVal = true;
	}
	
	
	var accCostRange = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accCostRange");
	console.log(suppliedBy);
	var fieldFilter = {"fieldFilters": { "id": accListId,"isPsr" : isPsrVal, "accCode":accCode,"isVendorFlag" : isVendorFlag, "suppliedBy":suppliedBy, "vendorId": vendorId, "rangeSlab" : null, "editAccCostRate" : editAccRate,"costRange":accCostRange}}
	if(suppliedBy != "V"){
		delete fieldFilter.fieldFilters.costRange;
	}
	postJSON('/OrderExecution/api/v1/accCostSPDetails', JSON.stringify(fieldFilter), function(data) {
		if(data.resCode == "1" && typeof data != "undefined"){
			var newSellingRateAcc = data.payload.costSP.sellingRate;
			$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingRate", data.payload.costSP.sellingRate);
			if(data.payload.costSP.systemCostRateList != null){
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "systemCostRateList", data.payload.costSP.systemCostRateList);
			}
			if(data.payload.costSP == null || data.payload.costSP == ""){
				 $("#accDetailsGrid").jqxGrid('setcellvalue', row, "accRate", null);
			}else{
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accRate", data.payload.costSP.systemCostRate);
				
			}
			console.log(newSellingRateAcc);
			if(uom=="Cts" || uom == "Gms"){
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt * newSellingRateAcc);
			}else{
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedPcs * newSellingRateAcc);
			}	
		
		}else{
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
			return false;
		}
	});
	
	
}	


var updateAccCost = function(row, datafield, columntype, oldvalue, newvalue){
	var suppliedBy = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "suppliedBy");
	var usedPcs = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "usedPcs");
	var usedWt = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "usedWt");
	var uom = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "uom");
	var grSlNo = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "srl");
	var orderKind = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'orderKind');
	var vendorId = parseInt($("#vendorCode-valueC").val());
	var accCode = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accCode");
	var sellingRate = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "sellingRate");
	
	if(sellingRate == null || sellingRate == ""){
		$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", 0.00);
	}else{
		if(uom=="Cts"  || uom == "Gms"){
			$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedWt*parseFloat(NVL(sellingRate,0)));
		}else{
			$("#accDetailsGrid").jqxGrid('setcellvalue', row, "sellingPrice", usedPcs*parseFloat(NVL(sellingRate,0)));
		}
	}
	
	if(datafield == "usedWt" ||datafield == "usedPcs"){
		var accListId = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accListId");
		var accCode = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accCode");
		var isPsr = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "isPsr");
		var vendorId = parseInt($("#vendorCode-valueC").val());
		var weightSlab = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accCostRange");
			
		var rowData = $("#accDetailsGrid").jqxGrid('getrowdata', row);
		var accRateEdited = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accRateEdited");
		var accHC = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accHC");
		var sellingRate = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "sellingRate");
		if(datafield == "usedWt"){var updatedUsedWt = newvalue}else{var updatedUsedWt = usedWt;}
		if(datafield == "usedPcs"){var updatedUsedPcs = newvalue}else{var updatedUsedPcs = usedPcs;}
		if(accRateEdited == 0 || accRateEdited == "") { accRateEdited = null } else{ accRateEdited = accRateEdited}
		if(suppliedBy == "V"){
			accCostRateCheck(accCode,suppliedBy,vendorId,accRateEdited,orderKind,updatedUsedWt,uom,updatedUsedPcs,0,row);
		}	
		updateAccStoneCost(datafield, row, newvalue);
		
	}
	
	if(datafield == "accRateEdited"){
		var rowData = $("#accDetailsGrid").jqxGrid('getrowdata', row);
		var returnedWt = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "returnedWt");
		var returnedPcs = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "returnedPcs");
		var accRate = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accRate");
		var sellingRateAcc = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "sellingRate");
		var actSellingRate = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "actSellingRate");
		var accListId = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accListId");
		var isPsr = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "isPsr");
		var accRateEdited = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accRateEdited");
		console.log(newvalue);
		if(newvalue == "" || newvalue == null){
			var accRateEditedVal = accRateEdited;
		}else{
			var accRateEditedVal = newvalue;
		}
		if(suppliedBy == "V"){
				accCostRateCheck(accCode,suppliedBy,vendorId,accRateEditedVal,orderKind,usedWt,uom,usedPcs,1,row);
		}
		
		if(suppliedBy == "V"){
			if(uom=="Cts"  || uom == "Gms"){
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", usedWt* newvalue);
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "retAccCost", returnedWt * newvalue);
			}else{
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", usedPcs*newvalue);
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "retAccCost", returnedPcs * newvalue);
			}
		}
		
		if(suppliedBy == "CO"){
			if(uom=="Cts"  || uom == "Gms"){
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", usedWt* newvalue);
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "retAccCost", returnedWt * newvalue);
			}else{
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", usedPcs* newvalue);
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "retAccCost", returnedPcs * newvalue);
			}
		}
		
		if(suppliedBy == "CU"){
			$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", 0);
			$("#accDetailsGrid").jqxGrid('setcellvalue', row, "retAccCost", returnedWt * newvalue);
		}
		/*if(newvalue > accRate){
			var x = newvalue - accRate;
			var y = (x/accRate) * 100;
			var newSellingRateAcc = (sellingRateAcc * y/100)  + sellingRateAcc;
		}else{
			var newSellingRateAcc = actSellingRate;
		}*/
		
		//var actAccRateEdited = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "actAccRateEdited");
		
		
		//(newvalue == actAccRateEdited) ? $("#accDetailsGrid").jqxGrid('setcellvalue', row, "provisional", false) :  $("#accDetailsGrid").jqxGrid('setcellvalue', row, "provisional", true);
	}
	
	if(datafield == "returnedWt"){
		var rowData = $("#accDetailsGrid").jqxGrid('getrowdata', row);
		var accRateEdited = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accRateEdited");
		
		$("#accDetailsGrid").jqxGrid('setcellvalue', row, "retAccCost", accRateEdited * newvalue);
	}
	
	if(datafield == "accHCEdited"){
		var rowData = $("#accDetailsGrid").jqxGrid('getrowdata', row);
		var accRateEdited = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accRateEdited");
		var actAccHC = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "actAccHC");
		
		var actAccRateEdited = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "actAccRateEdited");
		var accRateEdited =  $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accRateEdited");
		
		updateAccStoneCost(datafield, row, newvalue);
	}
	
	
	
}
var checkUsedWtValidation = function (row, datafield, columntype, oldvalue, newvalue, event) {
	if(datafield == "usedWt" || datafield == "returnedWt" || datafield == "breakageReceived" || datafield == "breakageNotReceived"){
		var grSlNo = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "srl");
		$("#grDetailsGrid").jqxGrid('setcellvalue', (grSlNo-1), "isValid", false);
	}
	var grSrlno = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'srl');
	var isPsr = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'isPsr');
	var isStock = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'isStock');
	var orderKind = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'orderKind');
	
	if(datafield == "bulkPcs"){$("#grDetailsGrid").jqxGrid('setcellvalue', (grSrlno-1), "isValid", false)};
	if((datafield == "returnedWt" || datafield == "usedWt") && (typeof usedWt != "undefined" && typeof returnedWt != "undefined")){ 
		$("#accDetailsGrid").jqxGrid('setcellvalue', row, "flag", "Positive");
		$("#accDetailsGrid").jqxGrid('setcellvalue', row, "flags", "P");
	}else if((datafield == "returnedWt" || datafield == "usedWt") && ((typeof usedWt == "undefined"  || usedWt == 0) && typeof returnedWt != "undefined")){ 
		$("#accDetailsGrid").jqxGrid('setcellvalue', row, "flag", "Negative");
		$("#accDetailsGrid").jqxGrid('setcellvalue', row, "flags", "N");
	}
	if(isStock == "ST" && orderKind == "NO"){
		updateAccWts(row, datafield, columntype, oldvalue, newvalue);
	}
		
	
	updateAccCost(row, datafield, columntype, oldvalue, newvalue);
}

var updateOnchangeAccRateSC = function(row, datafield, columntype, oldvalue, newvalue, event){
	var grSlNo = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "srl");
	$("#grDetailsGrid").jqxGrid('setcellvalue', (grSlNo-1), "isValid", false);
	var suppliedBy = $("#accDetailsGrid").jqxGrid('getcellvalue', row, 'suppliedBy');	

	if(suppliedBy == "V"){
		var accItemId =  $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accItemId");
		var vendorId = parseInt($("#vendorCode-valueC").val());	
		
		if(accItemId != "undefined" && accItemId != undefined){
		$.getJSON('/OrderExecution/api/v1/accCostRangeForGRFG?accItemId='+accItemId+'&suppliedBy=V'+'&vendor='+vendorId+'&rate='+newvalue, function(data) {
			if(data.resCode == 1){
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCostRange",data.payload.costRange.id);
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCostRangeN",data.payload.costRange.id);

			}else{
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCostRange",null);
				$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCostRangeN",null);

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
	updateAccCost(row, datafield, columntype, oldvalue, newvalue, event);
}


var viewEarlierUsedWeightAcc = function(row){
	
	var orderNo = $("#accDetailsGrid").jqxGrid('getcellvalue', row, 'orderNo');
	var orderSlNo = $("#accDetailsGrid").jqxGrid('getcellvalue', row, 'orderSlNo');
	var accSrNo = $("#accDetailsGrid").jqxGrid('getcellvalue', row, 'accSrNo');
	var accUsedPcs = $("#accDetailsGrid").jqxGrid('getcellvalue', row, 'accUsedPcs');
	var accUsedWt = $("#accDetailsGrid").jqxGrid('getcellvalue', row, 'accUsedWt');
	var accCostPrice  = $("#accDetailsGrid").jqxGrid('getcellvalue', row, 'accCostPrice');
	var accSellingPrice  = $("#accDetailsGrid").jqxGrid('getcellvalue', row, 'accSellingPrice');	
	
	$("#orderNoAcc").val(orderNo);
	$("#serialNoAcc").val(orderSlNo);	
	$("#stoneSlNoAcc").val(accSrNo);
	$("#earlierUsedPcsAcc").val(accUsedPcs);
	$("#earlierUsedWtAcc").val(accUsedWt);
	$("#costPriceAcc").val(accCostPrice);
	$("#sellingPriceAcc").val(accSellingPrice);
}

// View Earlier used wt
var viewUsedWtAccModal = function(row, column, value){
	return '<div class="text-center"><button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewEarlierUsedWtAcc" type="button" onclick="viewEarlierUsedWeightAcc('+ row +');"/><span class="fa fa-eye"></span> </button></div>';
}

var systemCostRateListVal = function(row, cellvalue, editor){
	var sysCostArr = [];
	var suppliedBy = $("#accDetailsGrid").jqxGrid('getcellvalue', row, 'suppliedBy');	
	var systemCostRateList = $("#accDetailsGrid").jqxGrid('getcellvalue', row, 'systemCostRateList');
	var psrType = $("#grDetailsGrid").jqxGrid('getcellvalue', row, "psr");
	var accCostPrice = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accCostPrice");
	console.log(psrType);
	console.log(accCostPrice);

	if(psrType != "N"){
		if(accCostPrice != null ){
			sysCostArr.push({"id" :accCostPrice, "name" :accCostPrice});
		}
	}
	if(suppliedBy == "V"){
		if(typeof systemCostRateList != "undefined" && systemCostRateList.length > 0){
			$.each(systemCostRateList, function(k,v){
				sysCostArr.push({"id" : v.toFixed(2), "name" :  v.toFixed(2)});
			});
		}
		editor.on('click', function(){
			editor.jqxDropDownList({source : sysCostArr, displayMember : 'name', valueMember : 'id'});
		});
	}else{
		editor.on('click', function(){
			editor.jqxDropDownList({source : sysCostArr, displayMember : 'name', valueMember : 'id'});
		});
	}
}

/*var customAccRate = {'text' : 'Acc.Cost Rate',datafield : 'accRate', sortable : false, width: '4%',cellsalign : 'center',align:'center',cellbeginedit: grAccForPSR, filterable: false, editable : false, cellsformat : 'd2', columntype : 'numberinput'};
$("#accDetailsGrid").bind('cellclick', function (event) {
	var column = event.args.column;
    var rowindex = event.args.rowindex;
  
   // if(column.datafield == "accRate"){
    	var suppliedBy  = $("#accDetailsGrid").jqxGrid('getcellvalue', rowindex, 'suppliedBy');	
    	console.log(suppliedBy);
    	if(suppliedBy == "V" && column.datafield == "accRate"){    		
    		customAccRate = {'text' : 'Acc.Cost Rate',datafield : 'accRate', sortable : false, width: '4%',cellsalign : 'center',align:'center', filterable: false, editable : true, columntype : 'dropdownlist',displayfield : 'accRateN', initeditor : systemCostRateListVal};
    	}
    //}
});*/
var customAccRate,colTypeVal;
var editableFlag = false;
$("#accDetailsGrid").bind('cellclick', function (event) {
	var column = event.args.column;
    var rowindex = event.args.rowindex;
  
    if(column.datafield == "accRate"){
    	var suppliedBy  = $("#accDetailsGrid").jqxGrid('getcellvalue', rowindex, 'suppliedBy');	
    	console.log(suppliedBy);
    	if(suppliedBy == "V"){    		
    		colTypeVal =  'dropdownlist';
    		customAccRate = 'initeditor : systemCostRateListVal';
    		editableFlag = true;
    	}else{
    		colTypeVal = 'numberinput';
    		customAccRate = '';
    		editableFlag = false;
    	}
    }
});

var onchangeSysCostRate = function(row, datafield, columntype, oldvalue, newvalue, event){

	
	var usedPcs = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "usedPcs");
	var uom = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "uom");	
	var orderKind = $('#accDetailsGrid').jqxGrid('getcellvalue', row, 'orderKind');
	var usedWt = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "usedWt");
	var vendorId = parseInt($("#vendorCode-valueC").val());	
	var accCode = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accCode");
	var suppliedBy = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "suppliedBy");	
	var sellingRate = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "sellingRate");
	$("#accDetailsGrid").jqxGrid('setcellvalue', row, 'accRateEdited',newvalue.value);
	if(uom == "Cts" || uom == "Gms"){
		$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", usedWt * newvalue.value);
	}else{
		$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCost", usedPcs * newvalue.value);
	}
	
	var accItemId = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accItemId");
	var psrType = $("#grDetailsGrid").jqxGrid('getcellvalue', row, "psr");
	console.log(psrType)
	if(suppliedBy == "V"){
		if(accItemId != "undefined" && accItemId != undefined){
			$.getJSON('/OrderExecution/api/v1/accCostRangeForGRFG?accItemId='+accItemId+'&suppliedBy=V'+'&vendor='+vendorId+'&rate='+newvalue.value, function(data) {
				if(data.resCode == 1){
					$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCostRange",data.payload.costRange.id);			
					$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCostRangeN",data.payload.costRange.id);

				}else{
					$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCostRange","");

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
	accCostRateCheck(accCode,suppliedBy,vendorId,newvalue.value,orderKind,usedWt,uom,usedPcs,1,row);
}

//Acc Grid related to GR line item.
var accGRGrid = function(data){
	
	var source = {
			datafields : [ 
				{'name' : 'accListId','type' : 'long'},
				{'name' : 'typeRow','type' : 'boolean'},
				{'name' : 'srl','type' : 'number'},
				{'name' : 'accSrNo','type' : 'long'},
				{'name' : 'id','type' : 'long'}, 
				{'name' : 'suppliedBy','type' : 'string'},
				{'name' : 'suppliedBys','type' : 'string'},
				{'name' : 'accCode','type' : 'string'}, 
				{'name' : 'subCategory','type' : 'string'},
				{'name' : 'accCostRange','type' : 'string'},
				{'name' : 'flag','type' : 'string'},
				{'name' : 'flags','value' : 'flag'},
				{'name' : 'issuedPcs','type' : 'long'}, 
				{'name' : 'issuedWt','type' : 'double'}, 
				
				{'name' : 'orderNo','type' : 'long'}, 
				{'name' : 'orderSlNo','type' : 'long'},
				{'name' : 'accUsedPcs','type' : 'long'}, 
				{'name' : 'accUsedWt','type' : 'double'},
				{'name' : 'accCostPrice','type' : 'long'}, 
				{'name' : 'accSellingPrice','type' : 'double'},
				
				{'name' : 'usedPcs','type' : 'long'}, 
				{'name' : 'usedWt','type' : 'double'}, 
				{'name' : 'returnedPcs','type' : 'double'}, 
				{'name' : 'returnedWt','type' : 'double'}, 
				{'name' : 'breakageReceivedPcs','type' : 'double'}, 
				{'name' : 'breakageReceived','type' : 'double'},
				{'name' : 'breakageNotReceivedPcs','type' : 'double'},
				{'name' : 'breakageNotReceived','type' : 'double'},
				{'name' : 'uom','type' : 'string'}, 
				{'name' : 'accRate','type' : 'float'}, 
				{'name' : 'accRateN','type' : 'float'}, 
				{'name' : 'accRateEdited','type' : 'string'}, 
				{'name' : 'accCost','type' : 'float'}, 
				{'name' : 'accHC','type' : 'float'},
				{'name' : 'actAccHC','type' : 'float'},
				{'name' : 'accHCEdited','type' : 'float'},
				{'name' : 'provisional','type' : 'string'},
				{'name' : 'sellingRate','type' : 'float'},
				{'name' : 'actSellingRate','type' : 'float'},
				{'name' : 'sellingPrice','type' : 'float'},
				{'name' : 'isPsr','type' : 'string'}, 
				{'name' : 'isStock','type' : 'string'},
				{'name' : 'viewUsedWtAcc','type' : 'string'},
				{'name' : 'retAccCost','type' : 'float'},
				{'name' : 'orderKind','type' : 'float'},
				{'name': 'isRwk', 'type' : 'boolean'},
				{'name': 'returnAccCostPrice', 'type' : 'float'},
				{'name': 'returnAccSellingPrice', 'type' : 'float'},
				{'name': 'returnAccCostPriceAct', 'type' : 'float'},
				{'name': 'returnAccSellingPriceAct', 'type' : 'float'},
				{'name': 'systemCostRateList', 'type' : 'array'}
				
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
		columnsheight : 50,
		theme: 'energyblue',
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
			
			container.append('<div class="col-md-4 row"><div style="margin-bottom:10px;"  id="addAcctailsGrid" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i></div></div>');
			container.append('<div class="col-md-4"><div style="margin-bottom:10px; color:#00800; font-size:15px;"  id="orderTypeLabel" class="text-center">Accessory Details</div></div>');	
			container.append('<div class="col-md-4 pull-right"><div style="margin-bottom:10px;" id="deleteAccdetailsGrid" class="btn btn-danger btn-sm pull-right"><i class="fa fa-trash fa-md"></i></div></div>');
			
			$("#addAcctailsGrid").jqxButton();
			$("#deleteAccdetailsGrid").jqxButton();

			$("#addAcctailsGrid").on('click', function() {
				if(chekcForInvalidDetails()){
					addAccGridRow();
				}
			});
			
			$("#deleteAccdetailsGrid").on('click', function() {
				deleteAccGridRow();
			});
		},
		
		columns : [ 
			{'text' : '',datafield : 'typeRow',editable : false, sortable : false,hidden: true},
			{'text' : 'IGR.Sl.No.',datafield : 'srl',editable : false, sortable : false, width: '3%',cellsalign : 'center',align:'center', filterable: true},
			{'text' : 'Srl.',datafield : 'accSrNo',editable : false, sortable : false, width: '3%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Supp.By',datafield : 'suppliedBys',editable : false, sortable : false, width: '5%',cellsalign : 'center',align:'center',/*cellbeginedit: grAccForPSR,*/ filterable: false}, 
			{'text' : 'Acc.Code',datafield : 'accCode',editable : true, sortable : false, width: '5%',cellsalign : 'center',align:'center',cellbeginedit: accSearchPopUp, filterable: false}, 
			{'text' : 'Sub Cat/Shape.',datafield : 'subCategory',editable : false, sortable : false, width: '5%',cellsalign : 'center',align:'center',cellbeginedit: grAccForPSR, filterable: false},
			{'text' : 'Flag', datafield : 'flag',width : '65px',editable : false, sortable : false, width: '3%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Issued/Req.Pcs',datafield : 'issuedPcs',editable : false, sortable : false, width: '5%',cellsalign : 'center',align:'center',cellbeginedit: grAccForPSR, filterable: false}, 
			{'text' : 'Issued.Wt.',datafield : 'issuedWt',editable : false, sortable : false, width: '5%',cellsalign : 'center',align:'center',cellsformat : 'd3',columntype : 'numberinput',cellbeginedit: grAccForPSR, filterable: false}, 
			{'text' : 'Used Pcs',datafield : 'usedPcs',editable : true, sortable : false, width: '5%',cellsalign : 'center',align:'center',columntype : 'numberinput',cellbeginedit: grAccForPSR, filterable: false, cellvaluechanging : checkUsedWtValidation, validation : commonValidateAcc}, 
			{'text' : 'Used. Wt.',datafield : 'usedWt',editable : true, sortable : false,cellsformat : 'd3', width: '5%',cellsalign : 'center',align:'center', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput', validation : commonValidateAcc,cellbeginedit: grAccForPSR, cellvaluechanging : checkUsedWtValidation, filterable: false}, 
			{'text' : 'Retd. Pcs.',datafield : 'returnedPcs',editable : true, sortable : false, width: '5%',cellsalign : 'center',align:'center',columntype : 'numberinput',cellbeginedit: grAccForPSR, filterable: false, validation : commonValidateAcc}, 
			{'text' : 'Retd. Wt.',datafield : 'returnedWt',editable : true, sortable : false,cellsformat : 'd3', width: '5%',cellsalign : 'center',align:'center', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput', validation : commonValidateAcc,cellbeginedit: grAccForPSR, cellvaluechanging : checkUsedWtValidation, filterable: false}, 
			{'text' : 'Break.Rec.pcs.',datafield : 'breakageReceivedPcs',editable : true, sortable : false, width: '5%',cellsalign : 'center',columntype : 'numberinput',align:'center',cellbeginedit: grAccForPSR, filterable: false, validation : commonValidateAcc},  
			{'text' : 'Break.Rec.Wt.',datafield : 'breakageReceived',editable : true,cellsformat : 'd3', sortable : false, width: '5%',cellsalign : 'center',align:'center', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3}); },columntype : 'numberinput', validation : commonValidateAcc, cellvaluechanging : checkUsedWtValidation,cellbeginedit: grAccForPSR, filterable: false},
			{'text' : 'Break.Not Rec.Pcs.',datafield : 'breakageNotReceivedPcs',editable : true, sortable : false, width: '5%',cellsalign : 'center',columntype : 'numberinput',align:'center',cellbeginedit: grAccForPSR, filterable: false, validation : commonValidateAcc}, 
			{'text' : 'Break.Not Rec.Wt.',datafield : 'breakageNotReceived',editable : true,cellsformat : 'd3', sortable : false, width: '5%',cellsalign : 'center',align:'center', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput', validation : commonValidateAcc,cellbeginedit: grAccForPSR, cellvaluechanging : checkUsedWtValidation, filterable: false}, 
			{'text' : 'UQC',datafield : 'uom',editable : false, sortable : false, width: '3%',cellsalign : 'center',align:'center', filterable: false}, 

			{'text' : 'Acc.Cost Rate',datafield : 'accRate', sortable : false, width: '4%',cellsalign : 'center',align:'center', filterable: false, editable : true,cellbeginedit: grAccForPSR, columntype : 'dropdownlist',displayfield : 'accRateN', initeditor : systemCostRateListVal, cellvaluechanging : onchangeSysCostRate},
			{'text' : 'Acc.Cost Rate (Edited)',datafield : 'accRateEdited',editable : true, sortable : false, width: '4%',cellsalign : 'center',align:'center',cellsformat : 'd2',columntype : 'numberinput',cellbeginedit: grAccForPSR, cellvaluechanging : updateOnchangeAccRateSC, validation : commonValidateAcc, filterable: false}, 
			{'text' : 'Acc.Cost',datafield : 'accCost',editable : false, sortable : false, width: '3%',cellsalign : 'center',align:'center',cellsformat : 'd2',	columntype : 'numberinput', filterable: false}, 
			{'text' : 'Acc.HC Edited',datafield : 'accHCEdited',editable : true, sortable : false, width: '3%',cellsalign : 'center',align:'center', filterable: false,cellbeginedit: grAccForPSR, cellvaluechanging : checkUsedWtValidation}, 
			{'text' : 'Acc.HC',datafield : 'accHC',editable : false, sortable : false, width: '3%',cellsalign : 'center',align:'center', filterable: false}, 
			{'text' : 'Cost Range',datafield : 'accCostRange',width: '5%', hidden: false, editable : true, sortable : false,columntype : 'dropdownlist',displayfield : 'accCostRangeN',
				initeditor : onClickgetAcccostrangeDetails,
				//createeditor :  function(row, value, editor){ onClickgetAcccostrangeDetails(row, value, editor)},
				
				cellbeginedit : function(row){
					var suppliedBy = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "suppliedBy");	
					if(suppliedBy == "CO"){
						return true;
					}else{
						return false;
					}
				},
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					console.log(newvalue);
					var suppliedBy = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "suppliedBy");	

					if(suppliedBy == "CO"){
						$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCostRange",newvalue.label);
						$("#accDetailsGrid").jqxGrid('setcellvalue', row, "accCostRangeN",newvalue.label);
					}
					
				}

			},

			{'text' : 'Provisional',datafield : 'provisional',editable : false, sortable : false, width: '3%',cellsalign : 'center',align:'center', filterable: false},
			{'text' : '',datafield : 'viewUsedWtAcc',editable : false, sortable : false, width: '3%',cellsalign : 'center',align:'center', filterable: false,cellsrenderer : viewUsedWtAccModal},
			
			// Hidden field for calculation
			{'text' : '',datafield : 'systemCostRateList', hidden: true, editable : false, sortable : false},
			{'text' : '',datafield : 'suppliedBy', hidden: true, editable : false, sortable : false}, 			
			{'text' : '',datafield : 'sellingRate', hidden: true, editable : false, sortable : false}, 
			{'text' : '',datafield : 'actSellingRate', hidden: true, editable : false, sortable : false}, 
			{'text' : '',datafield : 'sellingPrice', hidden: true, editable : false, sortable : false}, 
			{'text' : '',datafield : 'accListId',hidden : true},
			{'text' : '',datafield : 'isPsr', hidden: true}, 
			{'text' : '',datafield : 'isStock',hidden : true}, 
			{'text' : '',datafield : 'retAccCost',hidden : true}, 

			{'text' : '',datafield : 'actAccHC',hidden : true}, 
			{'text' : '',datafield : 'orderNo',hidden : true}, 
			{'text' : '',datafield : 'orderSlNo',hidden : true}, 
			{'text' : '',datafield : 'accUsedPcs',hidden : true}, 
			{'text' : '',datafield : 'accUsedWt',hidden : true}, 
			{'text' : '',datafield : 'accCostPrice',hidden : true}, 
			{'text' : '',datafield : 'accSellingPrice',hidden : true}, 
			{'text' : '',datafield : 'orderKind',hidden : true},
			{'text' : '',datafield : 'isRwk',hidden : true},
			{'text' : '',datafield : 'returnAccCostPrice',hidden : true},
			{'text' : '',datafield : 'returnAccSellingPrice',hidden : true},
			{'text' : '',datafield : 'returnAccCostPriceAct',hidden : true},
			{'text' : '',datafield : 'returnAccSellingPriceAct',hidden : true}
		]
	});	
}
var onClickgetAcccostrangeDetails = function(row, value, editor) {
	editor.on('click', function(){
	var vendId = $("#vendorCode-value").val();
	var suppliedBy = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "suppliedBy");	
	var accRate = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accRate");	
	var accItemId = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accItemId");	
	var accCostRange = $("#accDetailsGrid").jqxGrid('getcellvalue', row, "accCostRange");	
	
	//debugger;
	console.log(vendId + ", "+suppliedBy+ ", "+accRate+ ", "+accItemId )
	if(suppliedBy == "CO"){
		if(accItemId != "undefined" && accItemId != undefined && accCostRange != ""){
		$.getJSON('/OrderExecution/api/v1/accCostRangeForGRFG?accItemId='+accItemId+'&suppliedBy=CO'+'&rate='+accRate, function(data) {
			if(data.resCode == 1){
				console.log(vendId + ", "+suppliedBy+ ", "+accRate+ ", "+accItemId + "," + row)
				var costRangeArr = [];
			
				 costRangeArr.push(data.payload.costRange);
				
				var costRangeArry = [];
				 $.each(costRangeArr,function(k,v){
					 costRangeArry.push({
						 "id" : v.id,
						 "name" : v.id
					 });
					 console.log(v.id);
				 });
				
				editor.jqxDropDownList({ source: costRangeArry , displayMember: 'name', valueMember: 'id'});
			}
			
		});
		}
	}
	})
	
}
// Save Valid check
function isValidAllgrFGDetails() {
	var grFGDetails = $("#grDetailsGrid").jqxGrid('getrows');
	
	var grConPeriod =  $('#grcPeriod').val();
	if("C" == jwType && grConPeriod.length == 0){
		$.growl.error({ message: "Consignment period is mandatory.", duration: 10000, title: 'Error' });
		return false;
	}
	
	var pureRate =  $('#pureRate').val();
	
	if(("D" == jwType ||  "C" == jwType) && pureRate.length == 0){
		$.growl.error({ message: "99.9 Pure Rate is mandatory.", duration: 10000, title: 'Error' });
		return false;
	}
	
	
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
		
		if(grFGDetails[i].psrNos == null || grFGDetails[i].psrNos == "" || typeof grFGDetails[i].psrNos == "undefined"){
			$.growl.error({ message: "Srl no "+ grFGDetails[i].srl+" PSR can not be null", duration: 10000, title: 'Error' });
			grDetais = false;
			return false;
		}
		
		if(grFGDetails[i].pcs == 0 || grFGDetails[i].pcs == null || grFGDetails[i].pcs == "" || typeof grFGDetails[i].pcs == "undefined"){
			$.growl.error({ message: "Srl no "+ grFGDetails[i].srl+" Pcs should be greater than zero.", duration: 10000, title: 'Error' });
			grDetais = false;
			return false;
		}
		
		if(grFGDetails[i].psr == "N" && (grFGDetails[i].costCode == null || grFGDetails[i].costCode == "")){
			$.growl.error({ message: "Please select Cost Code for IGR Srl no "+ (i+1), duration: 10000, title: 'Error' });
			grDetais = false;
			return false;
		}
		
		var grStones = grFGDetails[i].stoneList;
		if(null != grStones){
			for(var j=0; j<grStones.length; j++){
				if( grStones[j].selectionStatus == true  &&  ("V" == grStones[j].suppliedBy && null != grStones[j].stoneCode  && (0 < grStones[j].usedPcs || 0 < grStones[j].usedWt))  && null == grStones[j].stoneRate){
					$.growl.error({ message: "Please select stone cost for IGR Srl no "+ (i+1)+" and Stone srl no"+(j+1), duration: 10000, title: 'Error' });
					grDetais = false;
					return false;
				}
				if(grStones[j].costRange != null)
				var costRangeListFlag =Array.from(grStones[j].costRange).includes('-');
				 if(costRangeListFlag==false && "CO" == grStones[j].suppliedBy && grStones[j].category.split(' ')[0]=="CD" && null != grStones[j].costRange){
					console.log(grStones[j].category.split(' ')[0]);
					$.growl.error({ message: "Please select Cost Range for IGR Srl no "+ (i+1)+" and Stone srl no"+(j+1), duration: 10000, title: 'Error' });
					grDetais = false;
					return false;
				}	
				
				
			}
			
		}
			
		
	}
	
	return grDetais;
}

var createGRFG = function() {
	var grfgHeader = {
		"grdtos" : []
	};
	var grDetailsArr= [];
	var rows = $("#grDetailsGrid").jqxGrid('getrows');
	if(typeof rows != "undefined"){
		for(var i=0; i<rows.length; i++){
				grDetailsArr.push(rows[i]);
		}
	}
	grfgHeader.grdtos = grDetailsArr;
	grfgHeader.vendorId = $('#vendorCode-value').val();
	grfgHeader.mrvId = $('#mrvIdC').val();
	grfgHeader.mrvSrlNo = $('#mrvSrlNo').val();
	grfgHeader.vendorBillNO = $('#vendorBillNO').val();
	grfgHeader.metalSegmentId = $('#metalSegmentId').val();
	grfgHeader.pureRate = $('#pureRate').val();
	grfgHeader.skinPurity = $('#skinPurity').val();
	grfgHeader.skinPurityRate = $('#skinPurityRate').val();
	grfgHeader.meltingPurity = $('#meltingPurity').val();
	grfgHeader.tally = $('#tally').val(); //
	grfgHeader.consignmentPeriod = $('#grcPeriod').val();
	grfgHeader.jwType = $('#jwTypee').val();
	return grfgHeader;
}

//Save GR
$("#saveGRFGNew").on('click', function(e){	
	console.log(JSON.stringify(createGRFG()));
    $("#loading").show();
	$("#saveGRFGNew").prop('disabled', true);
    if(isValidAllgrFGDetails()){
    	var $link = $(e.target);
		  e.preventDefault();
		  if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 500) {
			  postJSON('/OrderExecution/api/v1/createGRFG', JSON.stringify(createGRFG()), function(data) {
				if(1 == data.resCode){
					
					$("#saveGRFGNew").prop('disabled', true);
	
					grHeaderId = data.payload.grHeaderId;
					$("#grNo").val(grHeaderId);
					$("#grHeaderId").val(grHeaderId);
					$("#mrvIdx").val(mrvNo);
					$("#mrvSrl").val(mrvSrl);
					$("#vendorId").val($("#vendorCode-valueC").val());
					$.growl.notice({ message: "Successfully created IGR#: " + data.payload.grHeaderId, duration: 10000, title: 'Success' });	
					
					processFileUpload();
					window.location.href = "javascript:showContentPage('grProcess', 'bodySwitcher')";
					return true;
				}else{
					$("#saveGRFGNew").prop('disabled', false);
					$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Saving IGR' });
					return false;
				}
			});
			
	    }
		  $link.data('lockedAt', +new Date());
		$("#saveGRFGNew").prop('disabled', false);
		$("#loading").hide();

	}else{
		$("#loading").show();
		$("#saveGRFGNew").prop('disabled', false);
	}
});



var NVL = function(source, replaceMentValue){
	if(typeof source != "undefined" && source != null && source != ""){
		return source;
	}
	else return replaceMentValue;
}

