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

var globalIndex = 1;
var articleName = ""
// On Load API call for create transit
var onLoadAPI = function(){

	$.getJSON('/OrderExecution/api/v1/adjustmentVoucherLOVs', function(data) {
		$("#date").val(data.payload.SystemDate);
	});
	
	$.getJSON('/OrderExecution/api/v1/ManualTransitOnloadLOVs', function(data) {
		
		if(data.resCode == 1){
			$("#fromDc").val(data.payload.employeeDetails.dc.name);
			$("#fromDcId").val(data.payload.employeeDetails.dc.id);
			
			
			$("#fromZone").val(data.payload.employeeDetails.zone.description);
			$("#fromZoneId").val(data.payload.employeeDetails.zone.id);
			
			$('#storeOrDc').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.toStoreOrDC, function(key, val) {
				$('#storeOrDc').append('<option value="' + val.id + '">' + val.name + '</option>');
			});				
		
		}
		transitMasterGrid(data.payload.referenceTypes, data.payload.itemTypes);
	});	
}



var setValueCell_clear_1 = function(row){
	
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'refDocNo', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'materialType', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'materialTypeN', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'refDocSlNo', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'refDocSlNoN', null);	
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'stoneAccSlNo', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'stoneAccSlNoN', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segment', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'jewType', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'pcs', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'grossWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'netWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'purity', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneSubCat', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccPcs', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'uqc', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'location', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'remarks', null);
	
}

var setValueCell_clear_2 = function(row){
	
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'materialType', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'materialTypeN', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'refDocSlNo', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'refDocSlNoN', null);	
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'stoneAccSlNo', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'stoneAccSlNoN', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segment', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'jewType', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'pcs', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'grossWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'netWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'purity', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneSubCat', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccPcs', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'uqc', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'location', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'remarks', null);
}

var setValueCell_clear_3 = function(row){
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'refDocSlNo', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'refDocSlNoN', null);	
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'stoneAccSlNo', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'stoneAccSlNoN', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segment', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'jewType', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'pcs', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'grossWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'netWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'purity', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneSubCat', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccPcs', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'uqc', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'location', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'remarks', null);
}


var setValueCell_clear_4 = function(row){
	
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'stoneAccSlNo', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'stoneAccSlNoN', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segment', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'jewType', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'pcs', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'grossWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'netWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'purity', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneSubCat', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccPcs', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'uqc', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'location', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'remarks', null);
}


var setValueCell_clear_5 = function(row){
	
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segment', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'jewType', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'pcs', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'grossWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'netWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'purity', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneSubCat', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccPcs', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccWt', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'uqc', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'location', null);
	$("#transitMasterGrid").jqxGrid('setcellvalue', row,'remarks', null);
}

var chekDuplicateSlNo = function(slNo){
	var rows = $("#transitMasterGrid").jqxGrid('getrows');
	var arrayData = [];
	var arrayDataDocNo = [];
	if(typeof rows != "undefined"){
		for(var i=0; i<rows.length; i++){
			if(i > 0){
				if($.inArray(rows[i].refDocNo, arrayDataDocNo) > -1){	
					if($.inArray( rows[i].refDocSlNo, arrayData) > -1){				
						$.growl.error({
							message : "Please select different ref doc sl no.",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}else{						
						arrayData.push(rows[i].refDocSlNo);
						arrayDataDocNo.push(rows[i].refDocNo);
					}
				}
				
			}else{				
				arrayData.push(rows[i].refDocSlNo);
				arrayDataDocNo.push(rows[i].refDocNo);
			}
		}
		
		
	}
}

var setCellValueOthers = function(refDocSlNo, StoneAccSlNo, row, materialTypeVal){
	var flag = false;
	var data = $('#transitMasterGrid').jqxGrid('getrows');
	
	var currentRefType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocType");
	var currentRefNo = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocNo");
	var currentMatType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"materialType");
	console.log(row);
	if(currentRefType == "S"){
		$.each(data, function(key, val) {		
			if((row!=key )&& (val.materialType == currentMatType) && (val.refDocNo == currentRefNo) ){
				$.growl.error({
					message :"Duplicate record with same Ref Doc.No",
					duration : 10000,
					title : 'Error'
				});
				flag = true;
			}
		});
		if(flag == true){
			$("#transitMasterGrid").jqxGrid('setcellvalue', row,'materialType', null);
			$("#transitMasterGrid").jqxGrid('setcellvalue', row,'refDocNo', "");
			$("#transitMasterGrid").jqxGrid('setcellvalue', row,'materialTypeN', null);
			setValueCell_clear_2(row);
			return false;
		}
	}
	var refDocType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocType");
	if(refDocType == "S" || refDocType == "TF"){
		var materialType = materialTypeVal;
	}else{
		var materialType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"materialType");	
		
	}
	var refDocNo = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocNo");
	
	var params =	{"fieldFilters":{"referenceType":refDocType,"orderId":refDocNo,"transitItemType":materialType,"currentStoreOrDcType":"DC","currentStoreOrDcId": $("#fromDcId").val(), "toStoreOrDCType": $("#storeOrDc").val(), "toStoreOrDCId": $("#storeDcName").val() }};
	
	postJSON('/OrderExecution/api/v1/getTransitListForReferenceType', JSON.stringify(params), function(data) {
		if(data.resCode == 1){
		$.each(data.payload.transitDetailsList, function(key, val) {
			if(refDocType == "O" || refDocType == "PB" || refDocType == "PR" || refDocType == "CA" || refDocType == "SO" || refDocType == "CSR"  || refDocType == "Disassemble"){				
				if(materialType == "A" || materialType == "L"){
					if(refDocSlNo == val.serialNumber){
						$.each(val.stoneAccSerialNumberList, function(k, v) {
							articleName = v.articleName;
							console.log(v.articleName);
							var stoneAccSlNo = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"stoneAccSlNo");
							if(StoneAccSlNo == v.stoneAccSerialNo){
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segmentId', v.segmentDTO.id);
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segment', v.segmentDTO.description);
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'jewType', null);
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'pcs', v.pieces);
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'grossWt', v.grossWeight);
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'netWt', v.netWeight);
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'purity', null);
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneSubCat', v.stoneAccDescription);
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccPcs', v.stoneAccPieces);
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccWt', v.stoneAccWt); 
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'uqc', v.uom);
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'location', val.metalLocation);
								$("#transitMasterGrid").jqxGrid('setcellvalue', row,'catId', v.categoryId);
							}
						});
					}
					
				}else{		
					console.log(val.articleCode);
					articleName = val.articleCode;
					if(refDocSlNo == val.serialNumber){
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segmentId', val.segmentDTO.id);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segment', val.segmentDTO.description);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'jewType', val.jewelTypeDescription);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'pcs', val.pieces);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'grossWt', val.grossWeight);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'netWt', val.netWeight);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'purity', val.skinPurity);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneSubCat', null);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccPcs', null);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccWt', null);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'uqc', val.uom);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'location', val.metalLocation);
					}
				}
			}
			
			if(refDocType == "S" || refDocType == "MR"){			
				if(materialType == "R" || materialType == "F"){
					console.log(val.articleCode);
					articleName = val.articleCode;
					if(refDocSlNo == val.serialNumber){
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segmentId', val.segmentDTO.id);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segment', val.segmentDTO.description);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'jewType', val.jewelTypeDescription);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'pcs', val.pieces);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'grossWt', val.grossWeight);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'netWt', val.netWeight);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'purity', val.skinPurity);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneSubCat', null);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccPcs', null);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccWt', null);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'uqc', val.uom);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'location', val.metalLocation);
					}
				}
				else if(materialType == "L" || materialType == "A"){
					$.each(val.stoneAccSerialNumberList, function(k, v) {
						articleName = v.articleName;
						console.log(v.articleName);						
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segmentId', v.segmentDTO.id);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segment', v.segmentDTO.description);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'jewType', null);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'pcs', v.pieces);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'grossWt', v.grossWeight);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'netWt', v.netWeight);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'purity', null);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneSubCat', v.stoneAccDescription);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccPcs', v.stoneAccPieces);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccWt', v.stoneAccWt); 
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'uqc', v.uom);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'location', val.metalLocation);
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'catId', v.categoryId);						
					});
				}
			}
			
			
			if(refDocType == "TF" && materialType == "F"){
				console.log(val.articleCode);
				articleName = val.articleCode;
				if(refDocSlNo == val.serialNumber){	
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segmentId', val.segmentDTO.id);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segment', val.segmentDTO.description);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'jewType', val.jewelTypeDescription);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'pcs', val.pieces);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'grossWt', val.grossWeight);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'netWt', val.netWeight);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'purity', val.skinPurity);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneSubCat', null);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccPcs', null);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccWt', null);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'uqc', val.uom);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'location', val.metalLocation);
				}
			}
			if(refDocType == "TF" && materialType == "R"){
				$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segmentId', val.segmentDTO.id);
				$("#transitMasterGrid").jqxGrid('setcellvalue', row,'segment', val.segmentDTO.description);
				$("#transitMasterGrid").jqxGrid('setcellvalue', row,'jewType', val.jewelTypeDescription);
				$("#transitMasterGrid").jqxGrid('setcellvalue', row,'pcs', val.pieces);
				$("#transitMasterGrid").jqxGrid('setcellvalue', row,'grossWt', val.grossWeight);
				$("#transitMasterGrid").jqxGrid('setcellvalue', row,'netWt', val.netWeight);
				$("#transitMasterGrid").jqxGrid('setcellvalue', row,'purity', val.skinPurity);
				$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneSubCat', null);
				$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccPcs', null);
				$("#transitMasterGrid").jqxGrid('setcellvalue', row,'looseStoneAccWt', null);
				$("#transitMasterGrid").jqxGrid('setcellvalue', row,'uqc', val.uom);
				$("#transitMasterGrid").jqxGrid('setcellvalue', row,'location', val.metalLocation);
			}
		});
		}else if(refDocType == "S"){
			if(data.resCode == 2){
				$.growl.error({
					message :data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		}
		else if(data.resCode == 2){
			$.growl.error({
				message :data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});	
}
	

var checkDisabled = function(row){
	var refDocType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocType");
	var materialType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"materialType");
	
	if(refDocType == "O" || refDocType == "PB" || refDocType == "PR" || refDocType == "CSR" ){
		if(materialType == "A" || materialType == "L"){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

var deleteRowData = function(){
	var selectedrowindex = $("#transitMasterGrid").jqxGrid('getselectedrowindex');	
	var rowscount = $("#transitMasterGrid").jqxGrid('getdatainformation').rowscount;

	if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
		var id = $("#transitMasterGrid").jqxGrid('getrowid', selectedrowindex);
		var commit = $("#transitMasterGrid").jqxGrid('deleterow', id);
	}

	for (var j = 0; j < rowscount; j++) {
		$("#transitMasterGrid").jqxGrid("setcellvalue", j, "slNo", j + 1);
	}
}

var checkDuplicate = function(row,datafield, columntype, oldvalue,newvalue, event){
	var refDocType = $("#transitMasterGrid").jqxGrid('getcellvalue', row,'refDocType');
	var refDocNo = $("#transitMasterGrid").jqxGrid('getcellvalue', row,'refDocNo');
	var materialType = $("#transitMasterGrid").jqxGrid('getcellvalue', row,'materialType');
	var refDocSlNo = $("#transitMasterGrid").jqxGrid('getcellvalue', row,'refDocSlNo');
	var stoneAccSlNo = $("#transitMasterGrid").jqxGrid('getcellvalue', row,'stoneAccSlNo');
	
	var rows = $("#transitMasterGrid").jqxGrid('getrows');
	if(typeof rows != "undefined" && rows.length > 0){
		if(materialType == "F" || materialType == "R"){
			for(var i=0; i<rows.length-1; i++){
				if((rows[i].refDocType == refDocType) && (rows[i].refDocNo == refDocNo) && (rows[i].materialType == materialType) && (rows[i].refDocSlNo == newvalue.value)){					
					$.growl.error({message :"Duplicate not allowed.",duration : 10000,title : 'Error'});
					deleteRowData();
					return false;
					
				}
				
			}
			
		}
		
		if(materialType == "L" || materialType == "A"){
			for(var i=0; i<rows.length-1; i++){
				if((rows[i].refDocType == refDocType) && (rows[i].refDocNo == refDocNo) && (rows[i].materialType == materialType) && (rows[i].refDocSlNo == refDocSlNo) && (rows[i].stoneAccSlNo == newvalue.value)){					
					$.growl.error({message :"Duplicate not allowed.",duration : 10000,title : 'Error'});
					deleteRowData();
					return false;
					
				}
				
			}
			
		}
		
		
	}
	
	/*if((refDocType == refDocTypePrev) && (refDocNo == refDocNoPrev) && (materialType == materialTypePrev) && (refDocSlNo == refDocSlNoPrev) && (stoneAccSlNo == stoneAccSlNoPrev)){
		$.growl.error({message :"Duplicate not allowed.",duration : 10000,title : 'Error'});
		return false;
	}*/
}

// Create transit grid started
var transitMasterGrid = function(referenceTypes, itemTypes) {
	var addDesignDet = function(row, column, value) {	
			return '<button class="btn btn-sm btn-primary" onclick="addDesign();" data-toggle="modal" id="designDisabled" data-target="#DesignDetSC" style="display: block; margin-left:auto; margin-right:auto; margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>   </button>';
	}	

	var generaterow = function(i) {
		var row = {};
		row["refDocType"] = i;
		row["materialType"] = "";
		row["refDocNo"] = "";
		row["refDocSlNo"] = "";
		row["stoneAccSlNo"] = "";
		row["segment"] = "";
		row["segmentId"] = "";
		row["jewType"] = "";
		row["pcs"] = "";
		row["grossWt"] = "";
		row["netWt"] = "";
		row["purity"] = "";
		row["looseStoneSubCat"] = "";
		row["looseStoneAccPcs"] = "";
		row["looseStoneAccWt"] = "";
		row["uqc"] = "";
		row["location"] = "";
		row["remarks"] = "";
		
		return row;
	}

	
	var source = {
		datafields : [ 
			{name : 'refDocType',	type : 'string'},
			{name : 'materialType',	type : 'string'},
			{name : 'refDocNo',	type : 'int'},
			{name : 'refDocSlNo',	type : 'int'},
			{name : 'stoneAccSlNo',	type : 'int'},
			{name : 'segment',	type : 'string'},
			{name : 'segmentId',	type : 'int'},
			{name : 'catId',	type : 'int'},
			{name : 'jewType',	type : 'string'},
			{name : 'pcs',	type : 'int'},
			{name : 'grossWt',	type : 'float'},
			{name : 'netWt',	type : 'float'},
			{name : 'purity',	type : 'float'},
			{name : 'fgDiamondWeight',	type : 'float'},
			{name : 'looseStoneSubCat',	type : 'string'},
			{name : 'looseStoneAccPcs',	type : 'int'},
			{name : 'looseStoneAccWt',	type : 'float'},
			{name : 'uqc',	type : 'string'},
			{name : 'location',	type : 'string'},
			{name : 'remarks',	type : 'string'},
			{name : 'test',	type : 'string'}
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#transitMasterGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : '100%',
		autorowheight : true,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<div class="col-md-4 row"><div style="margin-bottom:10px;"  id="addrowbutton" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i> </div>&nbsp;Items</div>');
			container.append('<div class="pull-right">(select row to delete)&nbsp;<div style="margin-bottom: 10px;" id="deleterowbutton" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
			
			$("#addrowbutton").jqxButton();
			$("#deleterowbutton").jqxButton();
			
			$("#addrowbutton").on('click',	function() {
				
				if(globalIndex == 0){					
					$.growl.error({
						message : "Please select different ref doc sl no.",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
				var rowscount = $("#transitMasterGrid").jqxGrid('getdatainformation').rowscount;
				
				if($("#storeOrDc").val() == null || $("#storeOrDc").val() == ""){
					 $.growl.error({
							message :"Please select store/DC." ,
							duration : 10000,
							title : 'Error'
						});
					     return false;
				}
				
				
				if($("#storeDcName").val() == null || $("#storeDcName").val() == ""){
					 $.growl.error({
							message :"Please select store/DC name." ,
							duration : 10000,
							title : 'Error'
						});
					     return false;
				}
				
				$("#transitFromStore input").prop('disabled', true);
				$("#transitFromStore select").prop('disabled', true);
				
				if (rowscount == 0) {
					var rowId = 1;						
				} else {
					var rowId = rowscount + 1;						
				}
				
				if(rowscount > 0){
					var refDocType = $('#transitMasterGrid').jqxGrid('getcellvalue', rowscount-1,"refDocType");
					var materialType = $('#transitMasterGrid').jqxGrid('getcellvalue', rowscount-1,"materialType");	
					var refDocNo = $('#transitMasterGrid').jqxGrid('getcellvalue', rowscount-1,"refDocNo");
					var refDocSlNo = $('#transitMasterGrid').jqxGrid('getcellvalue', rowscount-1,"refDocSlNo");
					var stoneAccSlNo = $('#transitMasterGrid').jqxGrid('getcellvalue', rowscount-1,"stoneAccSlNo");
					
					if(refDocType == null || refDocType == ""){
						$.growl.error({
							message : "Please select Ref Doc Type for line " + rowscount,
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
					
					if(refDocType != "OT"){
						if(refDocNo == null || refDocNo == ""){
							$.growl.error({
								message : "Please select Ref Doc No for line " + rowscount,
								duration : 10000,
								title : 'Error'
							});
							return false;
						}
					}
					
					if(materialType == null || materialType == ""){
						$.growl.error({
							message : "Please select material type for line " + rowscount,
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
					
					
					if(refDocType == "O" || refDocType == "PB" || refDocType == "PR" || refDocType == "CA" || refDocType == "SO"){
						if(materialType == "A" || materialType == "L"){
							if(refDocSlNo == null || refDocSlNo == ""){
								$.growl.error({
									message : "Please select ref doc sl no for line " + rowscount,
									duration : 10000,
									title : 'Error'
								});
								return false;
							}
							
							if(stoneAccSlNo == null || stoneAccSlNo == ""){
								$.growl.error({
									message : "Please select stone acc sl no for line " + rowscount,
									duration : 10000,
									title : 'Error'
								});
								return false;
							}
							
						}else{	
							if(refDocSlNo == null || refDocSlNo == ""){
								$.growl.error({
									message : "Please select ref doc sl no for line " + rowscount,
									duration : 10000,
									title : 'Error'
								});
								return false;
							}
						}
					}
				}

							
				
				
				var datarow = generaterow(rowId);
				var commit = $("#transitMasterGrid").jqxGrid('addrow',	null, datarow);
			});
			$("#deleterowbutton").on('click', function() {
				deleteRowData();
			});
		},
		
		columns : [
			{text : '', datafield : 'test', width : '1px', cellsalign : 'center',editable : false},
			{text : 'Ref. Doc Type', datafield : 'refDocType', width : '8%', cellsalign : 'center', align : 'center',editable : true, columntype : 'dropdownlist', 	displayfield : 'refDocTypeN',
				createeditor : function(row, cellvalue,	editor) {
					editor.on('click',function(event) {
						editor.jqxDropDownList({
							source : referenceTypes,
							displayMember : 'name',
							valueMember : 'id'
						});
				   });
				},
				cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
					
					if($("#storeOrDc").val() == "DC" && newvalue.value == "O"){
						$.growl.error({
							message : "Please select Doc Type except Order.",
							duration : 10000,
							title : 'Error'
						});

						return false;
					}
					
					if(newvalue.value == "OT"){						
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'materialType', "OT");
						$("#transitMasterGrid").jqxGrid('setcellvalue', row,'materialTypeN', "Others");
					}else{
						/*console.log(newvalue.length);
						console.log(newvalue.value);
						console.log(oldvalue);
						if(typeof newvalue.length == "undefined"){*/
							setValueCell_clear_1(row);
					//	}
					}
				},
				
			},			
			{text : 'Ref. Doc No', datafield : 'refDocNo', width : '6%', cellsalign : 'center', align : 'center',editable : true,
				cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
					setValueCell_clear_2(row);
					
				},
				cellbeginedit : function(row, cellvalue,	editor) {
					var refDocType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocType");
					var segment = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"segment");
					if(refDocType == "OT"){
						return false;
					}else if(segment != null){
						return false;
					}else{
						return true;
					}
				
				}
			},
			{text : 'Material Type', datafield : 'materialType', width : '6%', cellsalign : 'center', align : 'center',editable : true, columntype : 'dropdownlist', 	displayfield : 'materialTypeN',
				createeditor : function(row, cellvalue,	editor) {
					editor.on('click',function(event) {
						editor.jqxDropDownList({
							source : itemTypes,
							displayMember : 'name',
							valueMember : 'id'
						});
					});
				},
				cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'materialType', newvalue.value);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'materialTypeN', newvalue.label);
					
					setValueCell_clear_3(row);
					
					var refDocType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocType");
					console.log(refDocType);
					if(refDocType == "S" || refDocType == "TF" || refDocType == "MR" || refDocType == "Disassemble"){
						setCellValueOthers(null, null, row, newvalue.value);
					}
				},
				cellbeginedit : function(row, cellvalue,editor) {
					var refDocType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocType");
					var segment = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"segment");
					if(refDocType == "OT"){
						return false;
					}else if(segment != null){
						return false;
					}else{
						return true;
					}
					
				}
			},
			{text : 'Ref Doc Sl No', datafield : 'refDocSlNo', width : '6%', cellsalign : 'center', align : 'center',editable : true, columntype : 'dropdownlist', 	displayfield : 'refDocSlNoN',
				createeditor : function(row, cellvalue,	editor) {
					
					editor.on('click',	function(event) {
						var refDocType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocType");
						var refDocNo = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocNo");
						var materialType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"materialType");
						
						var params =	{"fieldFilters":{"referenceType":refDocType,"orderId":refDocNo,"transitItemType":materialType,"currentStoreOrDcType":"DC","currentStoreOrDcId": $("#fromDcId").val(), "toStoreOrDCType": $("#storeOrDc").val(), "toStoreOrDCId": $("#storeDcName").val() }};
						var serialNoArr = [];
						
						postJSON('/OrderExecution/api/v1/getTransitListForReferenceType', JSON.stringify(params), function(data) {									
							if(data.resCode == 1){
								$.each(data.payload.transitDetailsList, function(key, val) {
									var serialNoObj = {
											"id" : val.serialNumber,
											"name" : val.serialNumber
									}	
									serialNoArr.push(serialNoObj);
								});
								
								editor.jqxDropDownList({
									source : serialNoArr,
									displayMember : 'name',
									valueMember : 'id'
								});
							}
							else {
								$.growl.error({
									message : data.mesgStr,
									duration : 10000,
									title : 'Error'
								});
								return false;
							}
							
						});
						
					});
					
					
				},
				cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
					setValueCell_clear_4(row);
					
					if(row > 0){
						checkDuplicate(row,datafield, columntype, oldvalue,newvalue, event);
					}
					
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'refDocSlNo', newvalue.value);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'refDocSlNoN', newvalue.label);
					
					var refDocType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocType");
					var materialType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"materialType");	
					var refDocNo = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocNo");
					if(refDocType != "OT"){
						if(refDocType == "O" || refDocType == "PB" || refDocType == "PR"|| refDocType == "CSR"  || refDocType == "Disassemble"){							
							if(materialType == "A" || materialType == "L"){
								
							}
							else{
								
								var chekDuplicate = chekDuplicateSlNo(newvalue.value);
								if(chekDuplicate == false){
									setValueCell_clear_4(row);
									globalIndex = 0;
								}else{
									globalIndex = 1;
								}
								setCellValueOthers(newvalue.value, null, row);
							}
						}else if(refDocType == "CA" || refDocType == "SO"){
							
							setCellValueOthers(newvalue.value, null, row, null);
						}
					}
					
				},
				cellbeginedit : function(row, cellvalue,	editor) {
					var refDocType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocType");
					var segment = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"segment");
					if(refDocType == "OT" || refDocType == "MR"){
						return false;
					}else if(segment != null){
						return false;
					}else if(refDocType == "S"){
						return false;
					}else{
						return true;
					}
					
				
				}
			},
			{text : 'Stone/Acc Sl No', datafield : 'stoneAccSlNo', width : '6%', cellsalign : 'center',editable : true, columntype : 'dropdownlist', 	displayfield : 'stoneAccSlNoN',
				createeditor : function(row, cellvalue,	editor) {
					
					editor.on('click',	function(event) {						
						var refDocType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocType");
						var refDocNo = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocNo");
						var materialType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"materialType");
						
						var refDocSlNo = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocSlNo");
						
						var params =	{"fieldFilters":{"referenceType":refDocType,"orderId":refDocNo,"transitItemType":materialType,"currentStoreOrDcType":"DC","currentStoreOrDcId": $("#fromDcId").val(), "toStoreOrDCType": $("#storeOrDc").val(), "toStoreOrDCId": $("#storeDcName").val() }};
						var stoneAccSerialNoArr = [];
						
						postJSON('/OrderExecution/api/v1/getTransitListForReferenceType', JSON.stringify(params), function(data) {		
							
							$.each(data.payload.transitDetailsList, function(key, val) {
								if(refDocSlNo == val.serialNumber){
									$.each(val.stoneAccSerialNumberList, function(k, v) {
										var stoneAccSerialNoObj = {
												"id" : v.stoneAccSerialNo,
												"name" : v.stoneAccSerialNo
										}	
										stoneAccSerialNoArr.push(stoneAccSerialNoObj);
									});
								}
								
							});
							
							editor.jqxDropDownList({
								source : stoneAccSerialNoArr,
								displayMember : 'name',
								valueMember : 'id'
							});
						});
						
					});
					
					
				},
				cellbeginedit : function(row, cellvalue,	editor) {
					var refDocType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocType");
					var segment = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"segment");
					if(refDocType == "OT"){
						return false;
					}else if(segment != null){
						return false;
					}else if(refDocType == "S"){
						return false;
					}
					
					var field = checkDisabled(row);
					if(field == true){
						return true;
					}else{						
						return false;
					}
					
					
				
				},
				cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
					
					setValueCell_clear_5(row);
					if(row > 0){
						checkDuplicate(row,datafield, columntype, oldvalue,newvalue, event);
					}
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'stoneAccSlNo', newvalue.value);
					$("#transitMasterGrid").jqxGrid('setcellvalue', row,'stoneAccSlNoN', newvalue.label);
					
					var refDocType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocType");
					var materialType = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"materialType");	
					var refDocNo = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocNo");
					var refDocSlNo = $('#transitMasterGrid').jqxGrid('getcellvalue', row,"refDocSlNo");
					
					if(refDocType != "OT"){
						if(refDocType == "O" || refDocType == "PB" || refDocType == "PR" ||refDocType == "CSR" ){
							if(materialType == "A" || materialType == "L"){
								setCellValueOthers(refDocSlNo, newvalue.value, row, null);
							}
						}
					}
				}
			},
			{text : 'Segment', datafield : 'segment', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : '', hidden: true, datafield : 'fgDiamondWeight', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : '', hidden: true, datafield : 'segmentId', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : '', hidden: true, datafield : 'catId', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Jewel Type', datafield : 'jewType', width : '6%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'Pcs', datafield : 'pcs', width : '4%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Gross Wt', datafield : 'grossWt', width : '5%', cellsalign : 'right', align : 'center',editable : false,
				cellsformat : 'd3',
				   columntype : 'numberinput',
            	   createeditor : function(row, cellvalue, editor) {
 					editor.jqxNumberInput({
 						spinButtons : false,
 						decimalDigits : 2
 					});
 				},
			},
			{text : 'Net Wt', datafield : 'netWt', width : '4%', cellsalign : 'right', align : 'center',editable : false,
				cellsformat : 'd3',
				   columntype : 'numberinput',
         	   createeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						decimalDigits : 2
					});
				},},
			{text : 'Purity', datafield : 'purity', width : '4%', cellsalign : 'right', align : 'center',editable : false,
					cellsformat : 'd2',
					   columntype : 'numberinput',
	            	   createeditor : function(row, cellvalue, editor) {
	 					editor.jqxNumberInput({
	 						spinButtons : false,
	 						decimalDigits : 2
	 					});
	 				},},
			{text : 'Loose Stone Sub Cat', datafield : 'looseStoneSubCat', width : '8%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Loose Stone Acc Pcs', datafield : 'looseStoneAccPcs', width : '8%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Loose Stone Acc Wt', datafield : 'looseStoneAccWt', width : '8%', cellsalign : 'right', align : 'center',editable : false,
				cellsformat : 'd3',
				   columntype : 'numberinput',
         	   createeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						decimalDigits : 2
					});
				},},
			{text : 'UQC', datafield : 'uqc', width : '4%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Loc', datafield : 'location', width : '4%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Remarks', datafield : 'remarks', width : '6%', cellsalign : 'left', align : 'center',editable : true}
		]
	});
	
	
}



onLoadAPI();

//On change of to store loading store name
$("#storeOrDc").on('change', function(){
	var storeOrDc = $(this).val();
	$('#storeDcName').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/ManualTransitOnloadLOVs', function(data) {
		if(storeOrDc == "Store"){
			$.each(data.payload.allStoreList, function(key, val) {
				$('#storeDcName').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
		}
		
		if(storeOrDc == "DC"){
			$.each(data.payload.dcListExceptCurrentDC, function(key, val) {
				$('#storeDcName').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
		}
	});
});

//On change of store name loading zone type
$("#storeDcName").on('change', function(){
	var storeDcName = $(this).val();
	
	var fieldFilters = {
			"fieldFilters": {}
	}
	
	fieldFilters.fieldFilters['toStoreOrDCType'] = $("#storeOrDc").val();
	fieldFilters.fieldFilters['toStoreOrDCId'] = parseInt(storeDcName);
	
	$('#toZoneType').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/getTransitToZoneTypeList', JSON.stringify(fieldFilters), function(data) {
		$.each(data.payload.toZoneTypes, function(key, val) {
			$('#toZoneType').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	});
});

// On change of zone type loading zone
$("#toZoneType").on('change', function(){
	var toZoneType = $(this).val();
	var fieldFilters = {
			"fieldFilters": {}
	}
	
	fieldFilters.fieldFilters['toStoreOrDCType'] = $("#storeOrDc").val();
	fieldFilters.fieldFilters['toStoreOrDCId'] = parseInt($("#storeDcName").val());
	fieldFilters.fieldFilters['zoneType'] = toZoneType;
	
	$('#toZone').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/getTransitToZoneList', JSON.stringify(fieldFilters), function(data) {
		$.each(data.payload.toZones, function(key, val) {
			$('#toZone').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});
});

$("#saveTransit").on('click', function(){
	var toZoneType = $("#toZoneType").val();
	var toZoneTypeName = $("#toZoneType option:selected").text();
	var sentThrough = $("#sentThrough").val();
	var storeOrDc = $("#storeOrDcName").val();
	var storeOrDcName = $("#storeOrDcName option:selected").text();
	var fromDcId = $("#fromDcId").val();
	var fromDc = $("#fromDc").val();
	var zone = $("#toZone").val();
	var zoneName = $("#toZone option:selected").text();
	var fromZone = $("#fromZoneId").val();
	var fromZoneName = $("#fromZone").val();
	var toStoreOrDCId = $("#storeDcName").val();
	var storeOrDcType = $("#storeOrDc").val();
	var storeOrDcTypeName = $("#storeOrDc option:selected").text();
	
	var fieldFielters = {
			"transitDetailsWrapperDTOs" : []
	}
	
	fieldFielters['toZoneType'] = (toZoneType == "") ? null : { "id": toZoneType, "name": toZoneTypeName};
	fieldFielters['zone'] = (zone == "") ?  null :  { "id": zone, "name": zoneName};
	fieldFielters['fromZone'] = { "id": fromZone, "name": fromZoneName};
	fieldFielters['toStoreOrDCId'] = { "id": toStoreOrDCId};
	fieldFielters['toStoreOrDCType'] = { "id": storeOrDcType, "name": storeOrDcTypeName};
	fieldFielters['fromStoreOrDC'] = { "id": fromDcId, "name": fromDc};
	fieldFielters['reasonForTransit'] = null;
	fieldFielters['sentThrough'] = sentThrough;
	
	var rowData = $("#transitMasterGrid").jqxGrid('getrows');
	var trasitArray = [];
	if(typeof rowData != "undefined" && rowData.length>0){
		for(var i=0; i<rowData.length; i++){
			if(rowData[i].refDocType == 1){
				$.growl.error({
					message : "Please fill all data.",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
			
			if(rowData[i].refDocType != "OT"){
				if(rowData[i].segment == null || rowData[i].segment == null){
					$.growl.error({
						message : "Please fill all data.",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}
			var stoneAccSerialNumberObj;
			if(rowData[i].materialType == "L" || rowData[i].materialType == "A"){
				
				stoneAccSerialNumberObj = {
		    	    "refDocNo": rowData[i].refDocNo,
		    	    "refDocSlNo": rowData[i].refDocSlNo,
		    	    "stoneAccSerialNo": rowData[i].stoneAccSlNo,
		    	   
		    	    "stoneAccDescription": rowData[i].looseStoneSubCat,
		    	    "stoneAccPieces": rowData[i].looseStoneAccPcs,
		    	    "stoneAccWt": rowData[i].looseStoneAccWt,
		    	    "categoryId": rowData[i].catId,
		    	    "uom": rowData[i].uqc,
		    	    "articleName": articleName
		    	  }
			}else{
				stoneAccSerialNumberObj = null;
			}
			var trasitObj = 
			  {
				      "refDocType": {
				        "id": rowData[i].refDocType,
				        "name":rowData[i].refDocTypeN,
				        "description": null
				      },
				      "materialType": {
				        "id": rowData[i].materialType,
				        "name": rowData[i].materialTypeN,
				        "description": null
				      },
				      "refDocNo": rowData[i].refDocNo,
				      "refDocSlNo": rowData[i].refDocSlNo,
				      "stoneAccSerialNo": rowData[i].stoneAccSlNo,
				      "stoneAccSerialNumber": null,
				      "segmentDTO": {
				        "id": rowData[i].segmentId,
				        "name": rowData[i].segment,
				        "description": null
				      },
				      "jewelTypeDescription": rowData[i].jewType,
				      "pieces": (rowData[i].materialType == "F" || rowData[i].materialType == "R") ? rowData[i].pcs : rowData[i].looseStoneAccPcs,
				      "grossWeight": (rowData[i].materialType == "F" || rowData[i].materialType == "R") ? rowData[i].grossWt : rowData[i].looseStoneAccWt,
				      "netWeight": rowData[i].netWt,
				      "skinPurity": rowData[i].purity,
				      "itemValueInRs": null,
				      "reasonForTransit": rowData[i].remarks,
				      "moveToLocation": rowData[i].location,
				      "uom":rowData[i].uqc,
				      "fgDiamondWeight": rowData[i].fgDiamondWeight,
				      "stoneAccSerialNumber": stoneAccSerialNumberObj,
				      "articleName": articleName,
				      "stoneAccPieces": rowData[i].looseStoneAccPcs,
			    	  "stoneAccWt": rowData[i].looseStoneAccWt,
			    	  "categoryId": rowData[i].catId
			    }
			
			trasitArray.push(trasitObj);
		}
	}else{
		$.growl.error({
			message : "Please add row to create transit.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	
	fieldFielters['transitDetailsWrapperDTOs'] = trasitArray;
	
	postJSON('/OrderExecution/api/v1/createTransitEntries', JSON.stringify(fieldFielters), function(data) {		
		if(data.resCode == 1){
			$.growl.notice({
				message : data.payload.message,
				duration : 10000,
				title : 'Success'
			});
			window.location.href = "javascript:showContentPage('transitFromDC', 'bodySwitcher')";
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
});

$("#clearAll").on('click', function(){
	window.location.href = "javascript:showContentPage('transitFromDC', 'bodySwitcher')";
});