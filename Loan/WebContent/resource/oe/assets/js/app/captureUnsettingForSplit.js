//$("#captureUnsettingMIV").hide();
$("#capUnsetMivSplit").hide();
$("#refDoctypeC").val("Stock");
$("#refDoctypeIdC").val("S");
//$("#captureUnsettingGr").hide();
$("#stoneMovementSplitSection").hide();
$("#releaseSection").hide();
$("#splitMivSection").hide();
$("#splitSentParcel").hide();
$("#splitReceiveParcel").hide();
$("#splitGrvSection").hide();
$("#splitGRSection").hide();
$("#splitQCSection").hide();
$("#addDet").show();




var onloadLov = function(){
	
	$.getJSON('/OrderExecution/api/v1/unsettingCreateLOV ', function(response) {
		if(response.resCode == 1){
			
			$('#uVendor').empty().append('<option value="" selected>--Select--</option>');
			$.each(response.payload.uVendors, function(key, val) {
				$('#uVendor').append('<option value="' + val.vendorId + '">' + val.vendorName + '</option>');
			});
			
			$("#unsettCreatedIdC").val(response.payload.createdBy.id);
			$("#unsettCreatedbyC").val(response.payload.createdBy.name);
			$("#unsettCreatedDateC").val(response.payload.CreationDate);
			$("#statusC").val(response.payload.Status);
			
			$("#addDet").prop('disabled',true);
			$("#createGiv").prop('disabled',true);
			$("#createGrC").prop('disabled',true);

			$("#stoneMovementC").prop('disabled',true);
			$("#accMovementC").prop('disabled',true);
			$("#splitReleaseC").prop('disabled',true);

			$("#splitGivC").prop('disabled',true);
			$("#sentParcelC").prop('disabled',true);
			$("#recvParcelC").prop('disabled',true);

			$("#splitGrvC").prop('disabled',true);
			$("#splitIgrC").prop('disabled',true);
			$("#splitQc").prop('disabled',true);
			$("#grMetalAccounting").prop('disabled',true);

		}else{
			$("#addDet").prop('disabled',true);
			$("#createGiv").prop('disabled',true);
			$("#createGrC").prop('disabled',true);

			$("#stoneMovementC").prop('disabled',true);
			$("#accMovementC").prop('disabled',true);
			$("#splitReleaseC").prop('disabled',true);

			$("#splitGivC").prop('disabled',true);
			$("#sentParcelC").prop('disabled',true);
			$("#recvParcelC").prop('disabled',true);

			$("#splitGrvC").prop('disabled',true);
			$("#splitIgrC").prop('disabled',true);
			$("#splitQc").prop('disabled',true);
			$("#grMetalAccounting").prop('disabled',true);
			
			$.growl.error({
				message : response.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
	

	$.getJSON('/OrderExecution/api/v1/unsettingCreateLOV?unSetType=splitUnSet', function(data) {
		if(data.resCode == 1){
			var resp = data.payload.createUnSetGIV.payload;
			var resp1 = data.payload.createUnSetIGR.payload;
			
		}else{
			$.growl.error({
				message  : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	 });

}
onloadLov();

var listItem;
var docNo ;
$("#refDocNoC").on('blur',function(){
	var refDocNo = $("#refDocNoC").val();
	var refDocType = $("#refDoctypeIdC").val();
	docNo = refDocNo;
	if(refDocNo !=  ""){
		var params = {"fieldFilters":{"refDocNo":refDocNo,"refDocType":refDocType,"unSetType" : "SplitUnset"}}
		var splitStatusForBtn;
		 postJSON('/OrderExecution/api/v1/getUnsettingOnChangeLOV',JSON.stringify(params),function(response) {
				if(response.resCode == "1"){
					var result = response.payload.dto;
					splitStatusForBtn = response.payload.splitStatus;
					enableDisableBtn(splitStatusForBtn);
					listItem = result;
					 $("#unsettingMetalTypeC").val(result.metalSegment.description);
					 $("#purityC").val(result.skingPurity);
					 $("#refSrlDocNoC").val(result.itemSrlNo);
					 $("#jTypeC").val(result.jType.description);
					 $("#grossWtC").val(result.grossWt);
					 $("#netWtC").val(result.netWt);
					 $("#piecesC").val(result.pieces);
					 $("#itemVendorCodeC").val(result.itemVendor.vendorCode);
					 $("#delearConsign").val(result.dealerMfg);
					 $("#unsettingTypeC").val(result.unSettingType);
					 if(result.unSettingType == "SetItem"){
						 $("#unsettingTypeCodeC").val("S");
					 }else{
						 $("#unsettingTypeCodeC").val("P");
					 }
					 $("#unsettingMetalTypeIdC").val(result.metalSegment.id);
					 
				}else if(response.resCode == "2"){
					$("#saveSplitDetails").hide();
					splitStatusForBtn = response.payload.splitStatus;
					enableDisableBtn(splitStatusForBtn);
					if(splitStatusForBtn == null){
						$.growl.error({
							message : response.mesgStr,
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
				}else{
					$("#saveSplitDetails").hide();
					$.growl.error({
						message : response.mesgStr,
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
		 });
	}else{
		$.growl.error({
			message : "Please Enter Ref Doc No. !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	
});


var enableDisableBtn = function(status){
	console.log(status);
	 if(status == null){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

	}else if(status == "split"){
		$("#addDet").prop('disabled',false);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

	}else if(status == "Unset"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',false);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

	}else if(status == "UnsetMIV"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',false);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

	}else if(status == "UnsetGR"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',false);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

	}else if(status == "SplitStoneMovement"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',false);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

	}else if(status == "SplitAccMovement"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',false);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

	}else if(status == "Release"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',false);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

	}else if(status == "MIV"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',false);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

	}else if(status == "SentParcel"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',false);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

	}else if(status == "ReceiveParcel"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',false);
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

	}else if(status == "SplitMRV"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',false);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

	}else if(status == "CreateIGR"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		
		$("#grMetalAccounting").prop('disabled',true);
		grOnloadFunction($("#refDocNoC").val(),"CreateIGR");
	}else if(status == "IGRMetalAccounting"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',true);
		$("#grMetalAccounting").prop('disabled',true);

		$("#grCompleteMRVProcess").prop('disabled',false);
	}else if(status == "CompleteMRVProcess"){
		$("#addDet").prop('disabled',true);
		$("#createGiv").prop('disabled',true);
		$("#createGrC").prop('disabled',true);

		$("#stoneMovementC").prop('disabled',true);
		$("#accMovementC").prop('disabled',true);
		$("#splitReleaseC").prop('disabled',true);

		$("#splitGivC").prop('disabled',true);
		$("#sentParcelC").prop('disabled',true);
		$("#recvParcelC").prop('disabled',true);

		$("#splitGrvC").prop('disabled',true);
		$("#splitIgrC").prop('disabled',true);
		
		$("#splitIgrC").prop('disabled',true);
		$("#splitQc").prop('disabled',false);
		$("#grMetalAccounting").prop('disabled',true);

		$("#grCompleteMRVProcess").prop('disabled',true);
	}
}

enableDisableBtn("onload");

$("#addDet").on('click',function(){
	$("#footerSection").show();
	var cuGrid = $("#cuItemMasterGrid").jqxGrid('getrows');
	 var itemVendorCodeC = $("#itemVendorCodeC").val();
	 var delearConsign = $("#delearConsign").val();
	 
	 var vendorFlag = false;
		if(typeof cuGrid != "undefined"){
			$.each(cuGrid,function(k,v){
			if(v.itemVendorCode != itemVendorCodeC || v.dealerMfg != delearConsign){
				$.growl.error({
					 message : "Vendor and Consignment type Should be same as Previous Details !!!",
					 duration : 1000,
					 title : 'Error'
				 })
				 vendorFlag = true;
				 return false;
			  }
			//if(v.)
	     });
	}
	if(vendorFlag == false){
		if(typeof cuGrid != "undefined"){
			 for(var i=0; i<cuGrid.length; i++){
				 if(cuGrid[i].docNo == $("#refDocNoC").val()){
					 $.growl.error({
						 message : "Ref Doc No Already Exists !!! ",
						 duration : 1000,
						 title : 'Error'
					 })
					 return false;
				 }
			 }
		 }
		
	$("#refSrlDocNoC").val("");
    $("#jTypeC").val("");
	$("#grossWtC").val("");
	$("#netWtC").val("");
	$("#piecesC").val("");
	$("#purityC").val("");
	$("#itemVendorCodeC").val("");
	$("#refDocNoC").val("");
	
	
	var cuMasterGridData = [];
	var accItemGridData = [];
	var opStoneItemGridData = [];
	var stonItemGridData = [];
	
		var cuObj = {
		        "id" : listItem.id,
				"costMC" : listItem.costMc,
				"costWastage" : listItem.costWastage, 
				"docNo" : listItem.refDocNo,
				"itemSrlNo" : listItem.itemSrlNo,
				"itemVendorCode" : listItem.itemVendor.vendorCode,
				"itemVendorCodeId" : listItem.itemVendor.id,
				"lineItemCost" : listItem.lineItemCost,
				"preUnsetGrWt" : listItem.grossWt,
				"preUnsetNetWt" : listItem.netWt,
				"preUnsetPcs" : listItem.pieces,
				"purity" : listItem.skingPurity,
				"refType" : listItem.refDocType,
				"refTypeC" : listItem.docType,
				"segment" : listItem.segment.description,
				"segmentId" : listItem.segment.segmentId,
				"unsettingDate" :listItem.date,
				
				"fromLoc" : listItem.fromLoc,
				"jTypeId" : listItem.jType.id,
				"jTypeName" : listItem.jType.description,
				"toLoc" : listItem.toLoc,
				"refDocSrlNo" : listItem.refDocSrlNo,
				"itemDesc" : listItem.itemDesc,
				"meltPurity" : listItem.meltPurity,
				"unsetVendorId" : listItem.unsetVendorId,
				"dealConsRate" : listItem.dealConsRate,
				"stndRate" : listItem.stndRate,
				"pureWt" : listItem.pureWt,
				"metCost" : listItem.metCost,
				"wastageWt" : listItem.wastageWt,
				"wastagePure" : listItem.wastagePure,
				"dealerMfg" : listItem.dealerMfg,
				"costCode":listItem.costCode,
				"isSplitStock":listItem.isSplitStock
		}
		cuMasterGridData.push(cuObj);				
		
	  
		// Stone Object Creation
		$.each(listItem.unsettingStoneDetails, function(k, v){	
			var stoneObj = {
				"srlNo" : v.srlNo,
				"location" : v.location,
				"stockId" : v.stockId,
				"refDocNo":v.refDocNo,
				"stoneSegment" : v.stoneSegment,
				"stoneMainCat" : v.stoneMainCat,
				"stoneSubCatDesc" : v.stoneSubCatDesc,
				"stoneArticleCod" : v.stoneArticleCod,
				"preUnsetPcs" : v.preUnsetPcs,
				"preUnsetWt" : v.preUnsetWt,
				"jwWt" : v.jwWt,
				"jwPcs" : v.jwPcs,
				"jwStoneCost" : v.jwStoneCost,
				"custStoneWt" : v.custStoneWt,
				"custStonePieces" : v.custStonePieces,
				"costRange" : v.costRange,
				"cost" : v.cost,
				"uom" : v.uom,
				"weightRange" : v.weightRange,
				"clarity" : v.clarity,
				"color" : v.color,
				"actualColor" : v.actualColor,
				"cutGrade" : v.cutGrade,
				"fromWtCost" : v.fromWtCost,
				"toWtCost" : v.toWtCost,
				"subCatId" : v.subCatId,
				"suppliedBy" : v.suppliedBy,
				"stoneMasterId": v.stoneMaster.id,
				"stoneSrlNo": v.stoneSrlNo,
				"packetId": v.packetId
			};
			 if(listItem.id == v.stockId){
				 stonItemGridData.push(stoneObj);
			 }
		});
		
		// Other Stone Object Creation
		$.each(listItem.unsettingOPStoneDetails, function(k, v){	
			var opStoneObj = {
				"srlNo" : v.srlNo,
				"location" : v.location,
				"stockId" : v.stockId,
				"refDocNo":v.refDocNo,
				"stoneSegment" : v.stoneSegment,
				"stoneMainCat" : v.stoneMainCat,
				"stoneSubCatDesc" : v.stoneSubCatDesc,
				"stoneArticleCod" : v.stoneArticleCod,
				"preUnsetPcs" : v.preUnsetPcs,
				"preUnsetWt" : v.preUnsetWt,
				"jwWt" : v.jwWt,
				"jwPcs" : v.jwPcs,
				"custStoneWt" : v.custStoneWt,
				"custStonePieces" : v.custStonePieces,
				"costRange" : v.costRange,
				"cost" : v.cost,
				"jwStoneCost":v.jwStoneCost,
				"uom" : v.uom == null ? null :v.uom,
				"weightRange" : v.weightRange,
				"clarity" : v.clarity,
				"color" : v.color,
				"actualColor" : v.actualColor,
				"cutGrade" : v.cutGrade,
				"fromWtCost" : v.fromWtCost,
				"toWtCost" : v.toWtCost,
				"subCatId" : v.subCatId,
				"suppliedBy" : v.suppliedBy,
				"stoneMasterId":v.stoneMaster.id,
				"stoneSrlNo":v.stoneSrlNo
			};
			if(listItem.id == v.stockId){
				opStoneItemGridData.push(opStoneObj);
			 }
		});
		
		// Accessory Object Creation
		$.each(listItem.unsettingAccDetails, function(k, v){	
			var accObj = {
				"lotNo" : v.lotNo,
				"srlNo" : v.srlNo,
				"stockId" : v.stockId,
				"refDocNo":v.refDocNo,
				"segment" : v.accSegment,
				"accCat" : v.accCategory,
				"accSubCategory" : v.accSubCategory,
				"subCatId" : v.subCatId,
				"accArticleCode" : v.accArticleCode,
				"preUnsetAccPcs" : v.preUnsetAccPcs,
				"preUnsetAccWt" : v.preUnsetAccWt,
				"costRange" : v.costRange,
				"accCost" : v.accCost,
				"custAccPieces" : v.custAccPieces,
				"custAccWt" : v.custAccWt,
				"jwAccPieces" : v.jwAccPieces,
				"jwAccWt" : v.jwAccWt,
				"jwAccCost":v.jwAccCost,
				"uom" : v.uom,
				"suppliedBy" : v.suppliedBy,
				"accSrlNo" :v.accSrlNo
			};
			if(listItem.id == v.stockId){
				accItemGridData.push(accObj);
			 }
		});
	
	console.log(stonItemGridData);
	
	cuItemMasterGrid(cuMasterGridData);
	accItemGrid1(accItemGridData);
	stoneItemGrid1(stonItemGridData);
	opStoneItemGrid(opStoneItemGridData);
	}
});


var stoneItemGrid1 = function(data) {
	var source = {
		datafields : [ 
			{name : 'lotNo', type : 'string'}, 
			{name : 'srlNo', type : 'int'},
			{name : 'stoneSrlNo', type : 'int'},
			{name: 'stockId', type: 'int'},
			{name: 'refDocNo', type: 'int'},
			{name : 'location', type : 'string'},
			{name : 'stoneSegment', type : 'string'},
			{name : 'stoneMainCat', type : 'string'},
			{name : 'stoneSubCatDesc', type : 'string'},
			{name : 'stoneArticleCod', type : 'string'},
			{name : 'preUnsetPcs', type : 'int'},
			{name : 'preUnsetWt', type : 'float'},
			{name : 'cost', type : 'float'},
			{name : 'custStonePieces', type : 'int'},
			{name : 'custStoneWt', type : 'float'},
			{name : 'jwPcs', type : 'int'},
			{name : 'jwWt', type : 'float'},
			{name : 'jwStoneCost', type : 'float'},
			{name : 'weightRange', type : 'string'},
			{name : 'uom', type : 'string'},
			{name : 'suppliedBy', type : 'float'},
			{name : 'costRange', type : 'string'},
			{name : 'subCatId', type : 'int'},
			{name : 'clarity', type : 'string'},
			{name : 'color', type : 'string'},
			{name : 'actualColor', type : 'string'},
			{name : 'cutGrade', type : 'string'},
			{name : 'fromWtCost', type : 'float'},
			{name : 'toWtCost', type : 'float'},
			{name : 'stoneMasterId', type : 'int'},
			{name : 'packetId', type : 'int'}
			],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#stoneItemGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 40,
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
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Capture Unsetting Diamond Stone Details');			
		},
		columns : [ 
			{text: '', datafield : 'stoneMasterId',hidden:true},
			{ text : '', datafield : 'stockId', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : 'Ref Doc No', datafield : 'refDocNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Srl No.', datafield : 'srlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Srl No.', datafield : 'stoneSrlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},

			{ text : 'Location', datafield : 'location', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Seg', datafield : 'stoneSegment', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Cat', datafield : 'stoneMainCat', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'stoneSubCatDesc', width : '13%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Article Code', datafield : 'stoneArticleCod', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Wt Range', datafield : 'weightRange', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'uom', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pre-Unset Pcs', datafield : 'preUnsetPcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pre-Unset Wt.', datafield : 'preUnsetWt', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Stone Cost', datafield : 'cost', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : 'Cust Pcs', datafield : 'custStonePieces', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cust Wt.', datafield : 'custStoneWt', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'JW Pcs', datafield : 'jwPcs', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'JW Wt.', datafield : 'jwWt', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'JW Cost', datafield : 'jwStoneCost', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : '', datafield : 'suppliedBy', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'packetId', editable : false, sortable : false,hidden:true}
		]
	});
}


//Accessory Item Grid
var accItemGrid1 = function(data) {
	var source = {
		datafields : [ 
			{name : 'lotNo', type : 'string'}, 
			{name : 'srlNo', type : 'int'},
			{name : 'accSrlNo', type : 'int'},
			{name: 'stockId', type: 'int'},
			{name: 'refDocNo', type: 'int'},
			{name : 'segment', type : 'string'},
			{name : 'accCat', type : 'string'},
			{name : 'accSubCategory', type : 'string'},
			{name : 'accArticleCode', type : 'string'},
			{name : 'preUnsetAccPcs', type : 'int'},
			{name : 'preUnsetAccWt', type : 'float'},
			{name : 'accCost', type : 'float'},
			{name : 'custAccWt', type : 'int'},
			{name : 'custAccPieces', type : 'float'},
			{name : 'jwAccPieces', type : 'int'},
			{name : 'jwAccWt', type : 'float'},
			{name : 'jwAccCost', type : 'float'},
			{name : 'costRange', type : 'string'},
			{name : 'uom', type : 'string'},
			{name : 'suppliedBy', type : 'float'},
			{name : 'subCatId', type : 'long'},
			],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#accItemGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 40,
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
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Capture Unsetting Accessory Details');
		},
		columns : [ 
			{ text : 'Ref Doc No', datafield : 'stockId', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			{ text : 'Ref Doc No', datafield : 'refDocNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Srl No.', datafield : 'srlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Srl No.', datafield : 'accSrlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},

			{ text : 'Seg', datafield : 'segment', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cat', datafield : 'accCat', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat', datafield : 'accSubCategory', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Article Code', datafield : 'accArticleCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cost Range', datafield : 'costRange', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'uom', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pre-Unset Pcs', datafield : 'preUnsetAccPcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pre-Unset Wt.', datafield : 'preUnsetAccWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Acc Cost', datafield : 'accCost', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},

			{ text : 'Cust Pcs', datafield : 'custAccPieces', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cust Wt.', datafield : 'custAccWt', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'JW Pcs', datafield : 'jwAccPieces', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'JW Wt.', datafield : 'jwAccWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'JW Cost', datafield : 'jwAccCost', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : '', datafield : 'suppliedBy', editable : false, sortable : false,hidden:true},
			{ text : '', datafield : 'subCatId', editable : false, sortable : false,hidden:true}

		]
	});
}
$("#createGiv").on('click',function(){
	mivOnloadFunction();
});

var mivOnloadFunction = function(){
	$("#createCUSection").hide();
	$("#captureUnsettingMIV").show();
	$("#captureUnsettingGr").hide();
	var params = {"fieldFilters":{}}
	postJSON('/OrderExecution/api/v1/createUnsettingMIV?type=splitMivLov',JSON.stringify(params),function(data) {
		if(data.resCode == 1){
			$('#unsetMivLotNoC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.list, function(key, val) {
				$('#unsetMivLotNoC').append('<option value="' + val + '">' + val + '</option>');
			});
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	 });
}

$("#createGrC").on('click',function(){
	$("#createCUSection").hide();
	$("#captureUnsettingMIV").hide();
	$("#captureUnsettingGr").show();
	var params = {"fieldFilters":{}}
	$.getJSON('/OrderExecution/api/v1/createUnsettingGROnloadLOV?type=splitGRLov',function(data) {
		if(data.resCode == 1){
			$('#grDateC').val(data.payload.createdDate);
			$('#lotNoGrC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.List, function(key, val) {
				$('#lotNoGrC').append('<option value="' + val + '">' + val + '</option>');
			});
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

$("#unsetMivLotNoC").on('change',function(){
	var lotNoC = {
			"fieldFilters" : {}
		   }
	 postJSON('/OrderExecution/api/v1/createUnsettingMIV?type=MivLovDetails&lotNo='+$("#unsetMivLotNoC").val(),JSON.stringify(lotNoC), function(data) {
		 if(data.resCode == 1){
			 $("#capUnsetMivSplit").show();
		
			var dataDet = data.payload.list;
			$.each(dataDet,function(key, val) {
				$("#createdByMivS").val(val.createdBy);
				$("#mivCreatedDateS").val(val.createdDate);
				$("#unsetMivMetalSegS").val(val.metalSegment.description);
				$("#unsetMivVendCodeS").val(val.unsetVendorId.vendorName);
				$("#unsetMivGrossWtC").val(val.totalGwt);
				$("#unsetMivNetWtC").val( val.totalNwt);
				$("#unsetMivPureWtC").val( val.totalPurewt);
				$("#unsetMivPurityC").val( val.skingPurity);
				$("#unsetMivMetalSegIdC").val(val.metalSegment.segmentId);
				$("#unsetMivVendCodeIdS").val( val.unsetVendorId.vendorId);
				
			    stoneDiamondItemGrid(val.unsettingDiamondStoneDetails);
			    accGridDet(val.unsettingAccDetails);
			    otherStoneItemGrid(val.unsettingOtherStoneDetails);
			    preciousStoneItemGrid(val.unsettingPreciousStoneDetails);
		   });
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

$("#lotNoGrC").on('change',function(){
	var vendorDetS = {
			"fieldFilters" : {
				"type":"getGRDetails",
				"lotNo" : $("#lotNoGrC").val(),
				"isSplitStock" : true
			}
		}
	postJSON('/OrderExecution/api/v1/createUnsettingGRDetails',JSON.stringify(vendorDetS), function(data) {
		if(data.resCode == 1){
			$("#vendorCodeC").val(data.payload.GRDetails.vendor.vendorName);
			$("#vendorCodeCId").val(data.payload.GRDetails.vendor.vendorId);
			$("#lossCostLabour").val(data.payload.GRDetails.lossCostLabour);
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

$("#addDetailsGr").on('click',function(){
	var vendorDetS = {
			"fieldFilters" : {
				"type":"getGRDetails",
				"lotNo" : $("#lotNoGrC").val(),
				"isSplitStock" : true
			}
		}
	addDetFunction('Split',vendorDetS);
});

$("#saveSplitDetails").on('click',function(){
	if($("#uVendor").val() == "" || $("#uVendor").val() == null){
		$.growl.error({
			message : "Please Select Mandatory Fields !!! ",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		saveUnsettingDetails('Split');
	}
	
});

$("#saveSplitUnsetMiv").on('click',function(){
	if($("#unsetMivLotNoC").val() == ""){
		$.growl.error({
			message  : "Please Select Unsetting Lot No !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		var unsetMivParams = {	
				"metalSegment": {"segmentId": parseInt($("#unsetMivMetalSegIdC").val())},
				"unsetVendorId": {"vendorId": parseInt($("#unsetMivVendCodeIdS").val())},
				"grossWt" : $("#unsetMivGrossWtC").val(),
				"netWt" : $("#unsetMivNetWtC").val(),
				"skingPurity" : $("#unsetMivPurityC").val(),
				"pureWt" : $("#unsetMivPureWtC").val(),
				"lotNumber" : parseInt($("#unsetMivLotNoC").val()),
		      };
		saveUnsettingMivDet(unsetMivParams,'splitMIV');
	}
});
$("#saveSplitUnsetGr").on('click',function(){
	if($("#lotNoGrC").val() == "" || $("#lotNoGrC").val() == null){
		$.growl.error({
			message : "Please Select Lot No !!! ",
			duration : 10000,
			title :'Error'
		});
		return false;
	}else{
		saveFunction('Split');
	}
});

$("#clearMiv").on('click',function(){
	mivRedirect();
});

var mivRedirect = function(){
	window.location.href = "javascript:showContentPage('unsettingMivForSplit', 'bodySwitcher')";
	mivOnloadFunction();
}

$("#stoneMovementC").on('click',function(){
	if($("#refDocNoC").val() == ""){
		$.growl.error({
			message : "Please Enter Ref Doc No !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		smSplitFunc($("#refDocNoC").val());
	}
	
});

var smSplitFunc = function(docNo){
	$("#unsettingSplitSection").hide();
	$("#stoneMovementSplitSection").show();
	$("#stockNoC").val(docNo);
	//$("#addDet").hide();
	smOnloadFunction(docNo);
}

$("#accMovementC").on('click',function(){
	if($("#refDocNoC").val() == ""){
		$.growl.error({
			message : "Please Enter Ref Doc No !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		accMovSplitFunc($("#refDocNoC").val());
	}
});

$("#splitReleaseC").on('click',function(){
	$("#accMovementSplitSection").hide();
	$("#stoneMovementSplitSection").hide();
	$("#unsettingSplitSection").hide();
	$("#releaseSection").show();
	$("#saveSplitRel").hide();
	//$("#addDet").hide();
	splitReleaseFunc($("#refDocNoC").val());
});

$("#splitGivC").on('click',function(){
	if($("#refDocNoC").val() == ""){
		$.growl.error({
			message : "Please Enter Ref Doc No !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$("#unsettingSplitSection").hide();
		$("#accMovementSplitSection").hide();
		$("#stoneMovementSplitSection").hide();
		$("#splitMivSection").show();
			
		$("#givDateC").val(givDate);
		$("#givTypeC").val("Sub-Contract");
		
		givOnloadFunction($("#refDocNoC").val());
	}
});

$("#sentParcelC").on('click',function(){
	if($("#refDocNoC").val() == ""){
		$.growl.error({
			message : "Please Enter Ref Doc No !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$("#unsettingSplitSection").hide();
		$("#stoneMovementSplitSection").hide();
		$("#accMovementSplitSection").hide();
		$("#releaseSection").hide();
		$("#splitMivSection").hide();
		$("#splitSentParcel").show();
		spOnloadFunction($("#refDocNoC").val());
	}
});

$("#recvParcelC").on('click',function(){
	if($("#refDocNoC").val() == ""){
		$.growl.error({
			message : "Please Enter Ref Doc No !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$("#unsettingSplitSection").hide();
		$("#stoneMovementSplitSection").hide();
		$("#accMovementSplitSection").hide();
		$("#releaseSection").hide();
		$("#splitMivSection").hide();
		$("#splitSentParcel").hide();
		$("#splitReceiveParcel").show();
		rpOnloadFunction($("#refDocNoC").val());
	}
});

$("#splitGrvC").on('click',function(){
	if($("#refDocNoC").val() == ""){
		$.growl.error({
			message : "Please Enter Ref Doc No !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$("#unsettingSplitSection").hide();
		$("#stoneMovementSplitSection").hide();
		$("#accMovementSplitSection").hide();
		$("#releaseSection").hide();
		$("#splitMivSection").hide();
		$("#splitSentParcel").hide();
		$("#splitReceiveParcel").hide();
		$("#splitGrvSection").show();
		grvOnloadFunction($("#refDocNoC").val());
	}
});
	
$("#addDet").prop('disabled',true);
$("#createGiv").prop('disabled',true);
$("#createGrC").prop('disabled',true);

$("#stoneMovementC").prop('disabled',true);
$("#accMovementC").prop('disabled',true);
$("#splitReleaseC").prop('disabled',true);

$("#splitGivC").prop('disabled',true);
$("#sentParcelC").prop('disabled',true);
$("#recvParcelC").prop('disabled',true);

$("#splitGrvC").prop('disabled',true);
$("#splitIgrC").prop('disabled',true);
$("#splitQc").prop('disabled',true);

$("#splitIgrC").on('click',function(){
	$("#unsettingSplitSection").hide();
	$("#splitGRSection").show();
	$("#stockNumb").val($("#refDocNoC").val());
	$('#loading').show();

	grOnloadFunction($("#refDocNoC").val());
});

$("#splitQc").on('click',function(){
	$("#unsettingSplitSection").hide();
	
	$("#splitQCSection").show();
	$('#loading').show();
	
	qcOnloadFunction($("#refDocNoC").val());
});

