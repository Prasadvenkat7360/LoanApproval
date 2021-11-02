		/* 
	##	Author UI 		: 	Mani prasad
	##  API Integration	:   Dipankar'
	##	Date Creation 	: 	06-06-2017
	## 	Description		:	CAPTURE UNSETTING DETAILS
*/

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
			
			if( val.startsWith("print") || val.startsWith("Print")){
				if(permission.canPrint == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
			
			/*if(val.startsWith("print") || val.startsWith("Print")){
				if(permission.canPrint == false){
					$(value).prop('disabled', true);
					//$(value).attr('disabled', true);
				}else{
					$(value).prop('disabled', false);
					//$(value).attr('disabled', false);
				}
			} */
			
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


var redirect = function() {
	window.location.href = "javascript:showContentPage('captureUnsetting', 'bodySwitcher')";
	return window.location.href;
}

$("#fromDate").datepicker({ changeYear:true, changeMonth:true, dateFormat:"dd/mm/yy", maxDate: 0 });

$("#toDate").datepicker({ changeYear:true, changeMonth:true, dateFormat:"dd/mm/yy", minDate:0 });

$("#unsettingDate").datepicker({ changeYear:true, changeMonth:true, dateFormat:"dd/mm/yy", minDate:0 });

// Hide Create Section On Load
$("#createCUSection").hide();
$("#cuSearchSection").show();
$("#footerSection").hide();

// onLoad Create LOVs
var unsettingOnloadLOV = function(){
	// API call to get on load create LOVS
	
	
	$('#uVendor').empty().append('<option value="" selected>--Select--</option>');
	$('#unsettingType').empty().append('<option value="" selected>--Select--</option>');
	$('#unsettingMetalType').empty().append('<option value="" selected>--Select--</option>');
	$('#refDoctype').empty().append('<option value="" selected>--Select--</option>');
	// Call API to get item details
	$.getJSON('/OrderExecution/api/v1/unsettingCreateLOV ', function(response) {		
		var mTypes = response.payload.mTypes;
		var refDoctype = response.payload.refDocTypes;
		var uType = response.payload.uType;
		var uVendors = response.payload.uVendors;
		
		$("#unsettCreatedId").val(response.payload.createdBy.id);
		$("#unsettCreatedby").val(response.payload.createdBy.name);
		$("#unsettCreatedDate").val(response.payload.CreationDate);
		$("#stausCU").val(response.payload.Status);
		
	
		
		$.each(uType,	function(k, v) {
			$('#unsettingType').append('<option value="' + v.id + '">' + v.name + '</option>');
		});
		
		
		$.each(uVendors,	function(k, v) {
			$('#uVendor').append('<option value="' + v.vendorId + '">' + v.vendorName + '</option>');
		});
		
		$.each(mTypes,	function(k, v) {
			$('#unsettingMetalType').append('<option value="' + v.id + '">' + v.description + '</option>');
		});
		
		$.each(refDoctype,	function(k, v) {
			if(v.name != "Purchase Bill"){
			  $('#refDoctype').append('<option value="' + v.id + '">' + v.name + '</option>');
			}
		});
	});
}


// Get Purity on change of metal type
$("#unsettingMetalType").on('change', function(){
	var metalTypeId = $("#unsettingMetalType option:selected").val();
	var metalTypeName =$("#unsettingMetalType option:selected").text();
	
	$('#purity').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/unsettingCreateLOV?mtype='+metalTypeName+'&segId='+metalTypeId, function(response) {
		var purity = response.payload.purity;
		$.each(purity,	function(k, v) {
			$('#purity').append('<option value="' + v.skinPurity + '">' + v.skinPurity + '</option>');
		});
	});
});



$("#reSlNoSection").hide();
$("#refDoctype").on('change', function(){
	$("#refDocNo").val("")
	$("#refSrlDocNo").val("")
	if($(this).val() == "S" || $(this).val() == "T"){
		$("#reSlNoSection").hide();
	}else{
		$("#reSlNoSection").show();
	}
});

// Add Rows
var addLineItemFlag = true;
$("#addCUDet").on('click', function(){
	var refDocNo = $("#refDocNo").val();
	var purity = $("#purity option:selected").val();
	var refDoctype = $("#refDoctype").val();
	var metalTypeId = $("#unsettingMetalType").val();
	var unsettingMetalType = $("#unsettingMetalType").val();
	var unsettingType = $("#unsettingType").val();
	var uVendor = $("#uVendor").val();	
	var grossWtC = $("#grossWtC").val();
	var netWtC = $("#netWtC").val();
	var refDocNoS = $("#refSrlDocNo").val();
	
     if($("#refDoctype").val() == "O"){
      var rowsItemGrid = $("#cuItemMasterGrid").jqxGrid('getrows');
		if(typeof rowsItemGrid != "undefined"){
			if(rowsItemGrid.length== 1){
				$.growl.error({
					message : "Please add only one row for Ref Doc type "+"Order"+"",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		}
	}
	if((refDoctype == "S" || refDoctype == "T")){
		if(refDocNo == "" || refDocNo == null){
			$.growl.error({
				message : "Please fill all the mandatory Feilds",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
		
	}else if(refDoctype != "S" || refDoctype != "T"){
		if(refDocNoS == "" || refDocNoS == null){
			$.growl.error({
				message : "Please fill all the mandatory Feilds",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
		
		if((grossWtC == null || grossWtC == "")|| (netWtC == null || netWtC == "")){
		$.growl.error({
				message : "Gross Wt and Net Wt Should not be Empty!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}
	if(unsettingType == "S"){
		if(grossWtC == netWtC){
			$.growl.error({
				message : "For Unsetting Type Set Item Gross Wt & Net Wt can not be same.",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}
	var vendorFlag = false;
	var itemVendorCodeC = $("#itemVendorCodeC").val();
	var delearConsign = $("#delearConsign").val();
	
	var ItemGridRows = $("#cuItemMasterGrid").jqxGrid('getrows');
	if(typeof ItemGridRows != "undefined"){
			$.each(ItemGridRows,function(k,v){
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
	var cuMasterGridData = [];
	var accItemGridData = [];
	var opStoneItemGridData = [];
	var stonItemGridData = [];
	
	var cuGrid = $("#cuItemMasterGrid").jqxGrid('getrows');
	 if(typeof cuGrid != "undefined"){
		 for(var i=0; i<cuGrid.length; i++){
			 if(refDoctype == "GR"){
				 if(cuGrid[i].docNo == refDocNo && cuGrid[i].refDocSrlNo == refDocNoS){
					 $.growl.error({
						 message : "Ref Doc No Already Exists !!! ",
						 duration : 1000,
						 title : 'Error'
					 })
					 return false;
				 } 
			 }
			 if(refDoctype != "GR" && cuGrid[i].docNo == refDocNo && cuGrid[i].refDocSrlNo == refDocNoS){
				 $.growl.error({
					 message : "Ref Doc No Already Exists !!! ",
					 duration : 1000,
					 title : 'Error'
				 })
				 return false;
			 }
		 }
	 }
	if(refDoctype == "S" || refDoctype == "T"){
		var fieldFilters = {
			"fieldFilters":{ 	
				"refDocNo" : refDocNo,
				"purity" : purity,
				"refDocType" : refDoctype,
				"vendorId": $("#uVendor").val(),
				"metalTypeId" : metalTypeId
			}
		}
	}else if(refDoctype != "S" || refDoctype != "T"){
		var fieldFilters = {
				"fieldFilters":{ 	
					"refDocNo" : refDocNo,
					"refDocSrlNo" : refDocNoS,
					"purity" : purity,
					"refDocType" : refDoctype,
					"metalTypeId" : metalTypeId,
					"vendorId": $("#uVendor").val(),
				}
			};	
    	  }
    	
	  if(typeof cuGrid != "undefined"){
			for(var i=0; i<cuGrid.length; i++){
				cuMasterGridData.push(cuGrid[i]);
			}
		}
		
		var stoneGrid = $("#stoneItemGrid").jqxGrid('getrows');
		if(typeof stoneGrid != "undefined"){
			for(var i=0; i<stoneGrid.length; i++){
				stonItemGridData.push(stoneGrid[i]);
			}
		}
		
		var opStoneGrid = $("#stoneOPItemGrid").jqxGrid('getrows');
		if(typeof opStoneGrid != "undefined"){
			for(var i=0; i<opStoneGrid.length; i++){
				opStoneItemGridData.push(opStoneGrid[i]);
			}
		}
		
		var accGrid = $("#accItemGrid").jqxGrid('getrows');
		if(typeof accGrid != "undefined"){
			for(var i=0; i<accGrid.length; i++){
				accItemGridData.push(accGrid[i]);
			}
		}
	postJSON('/OrderExecution/api/v1/getUnsettingOnChangeLOV', JSON.stringify(fieldFilters), function(response) {		
		var listItem = response.payload.dto;
		if(typeof listItem != "undefined"){
			var ItemGridRows = $("#cuItemMasterGrid").jqxGrid('getrows');
			if(typeof ItemGridRows != "undefined"){
					$.each(ItemGridRows,function(k,v){
						if($("#refDoctype").val() == "S"){
							addLineItemFlag = true;
						/*	$.growl.error({
								message : "Cannot add Item !!",
								duration : 10000,
								title : 'Error'
							});
							return false;*/
						}else{
							addLineItemFlag = true;
						}
					});
			}
			if(addLineItemFlag == true){
				$("#refSrlDocNo").val("");
			    $("#jTypeC").val("");
				$("#grossWtC").val("");
				$("#netWtC").val("");
				$("#piecesC").val("");
				$("#purityC").val("");
				$("#itemVendorCodeC").val("");
				//$("#refDocNo").val("")
				
					var cuObj = {
					        "id" : listItem.id,
							"costMC" : listItem.costMc,
							"costWastage" : listItem.costWastage, 
							"docNo" : listItem.refDocNo,
							"itemSrlNo" : listItem.itemSrlNo,
							"itemVendorCode" : (listItem.itemVendor != null) ? listItem.itemVendor.vendorCode :"",
							"itemVendorCodeId" : (listItem.itemVendor != null) ? listItem.itemVendor.id : "",
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
						if($("#refDoctype").val() == "T" && listItem.refDocNo == v.stockId){
							stonItemGridData.push(stoneObj);
						}else{
							if(listItem.id == v.stockId){
								 stonItemGridData.push(stoneObj);
							 }
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
							"costRange" : v.fromWtCost + "-" + v.toWtCost,
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
						if($("#refDoctype").val() == "T" && listItem.refDocNo == v.stockId){
							opStoneItemGridData.push(opStoneObj);
						}else{
						if(listItem.id == v.stockId){
							opStoneItemGridData.push(opStoneObj);
						 }}
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
						if($("#refDoctype").val() == "T" && listItem.refDocNo == v.stockId){
							accItemGridData.push(accObj);
						}else{
						if(listItem.id == v.stockId){
							accItemGridData.push(accObj);
						 }}
					});
				
				cuItemMasterGrid(cuMasterGridData);
				accItemGrid(accItemGridData);
				stoneItemGrid(stonItemGridData);
				opStoneItemGrid(opStoneItemGridData);
			}
	
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
		$("#footerSection").show();
	  });
	}
});


//Create Grid Started for line items
$("#refDocNo").on("change",function(){
	    $("#refSrlDocNo").val("");
	    $("#jTypeC").val("");
		$("#grossWtC").val("");
		$("#netWtC").val("");
		$("#piecesC").val("");
		$("#purityC").val("");
		$("#itemVendorCodeC").val("");
		
	  $("#refSrlDocNo").empty().append('<option value="" selected>--Select--</option>');
	   var docNo    = $("#refDocNo").val();
	   var docType = $("#refDoctype").val();
	   var matTypec = "F";
	   $("#refSrlDocNo").empty().append('<option value="" selected>--Select--</option>');
	   $.getJSON("/OrderExecution/api/v1/getRefDocSrlNosByDocNoAndDocType?materialType="+matTypec+"&docType="+docType+"&docNo="+docNo+"&type="+"UN",function(response){
			var response = response.payload.docSrlNos;
			$.each(response,function(key,val){
				$("#refSrlDocNo").append('<option value="'+val.id+'">'+val.id+'</option>');
		  });
	 });
	
	var refDoctype = $("#refDoctype").val();
	if(refDoctype == "S" || refDoctype == "T"){
		var refDocNo = $("#refDocNo").val();
		var purity = $("#purity option:selected").val();
		var refDoctype = $("#refDoctype").val();
		var metalTypeId = $("#unsettingMetalType").val();
		var unsettingMetalType = $("#unsettingMetalType").val();
		var unsettingType = $("#unsettingType").val();
		var uVendor = $("#uVendor").val();	
		
		
		var rows = $("#cuItemMasterGrid").jqxGrid('getrows');
		
		if(typeof rows != "undefined"){
			for(var i=0; i<rows.length; i++){
				if(rows[i].docNo == refDocNo){
					$.growl.error({
						message : "Reference document no already exists.",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}
		}
		if(unsettingMetalType == "" || unsettingType == "" || purity == "" || uVendor == "" || refDoctype == ""){
			$.growl.error({
				message : "Please select mandatory fields.",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}else{
			$("#unsettingMetalType").prop('disabled', true);
			$("#unsettingType").prop('disabled', true);
			$("#purity").prop('disabled', true);
			$("#uVendor").prop('disabled', true);
			$("#refDoctype").prop('disabled', true);
		}
			
		
		var fieldFilters = {
			"fieldFilters":{ 	
				"refDocNo" : refDocNo,
				"purity" : purity,
				"refDocType" : refDoctype,
				"metalTypeId" : metalTypeId
			}
		};	
		
		postJSON('/OrderExecution/api/v1/getUnsettingOnChangeLOV', JSON.stringify(fieldFilters), function(response) {		
			
			var listItem = response.payload.dto;
			if(response.resCode == 1){
				if(typeof listItem != "undefined"){
					$("#jTypeC").val((response.payload.dto.jType == null) ? "" : response.payload.dto.jType.description);
					$("#grossWtC").val((response.payload.dto.grossWt == null) ? "" :response.payload.dto.grossWt);
					$("#netWtC").val((response.payload.dto.netWt == null) ? ""  : response.payload.dto.netWt);
					$("#piecesC").val((response.payload.dto.pieces == null) ? "" : response.payload.dto.pieces);
					$("#purityC").val((response.payload.dto.skingPurity == null) ? "" : response.payload.dto.skingPurity);
					$("#itemVendorCodeC").val((response.payload.dto.itemVendor == null) ? "" : response.payload.dto.itemVendor.vendorCode);
					$("#delearConsign").val((response.payload.dto.dealerMfg == null) ? "" : response.payload.dto.dealerMfg);
				}
				if(response.mesgStr != ""){
					$.growl.notice({
						message : response.mesgStr,
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}else{
				$.growl.error({
					message : response.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
	}
})

//Create Grid Started for line items
$("#refSrlDocNo").on("change",function(){
	
	$("#jTypeC").val("");
	$("#grossWtC").val("");
	$("#netWtC").val("");
	$("#piecesC").val("");
	$("#purityC").val("");
	$("#itemVendorCodeC").val("");
	
	var refSrlNo = $("#refSrlDocNo option:selected").text()
	var refDoctype = $("#refDoctype").val();
	if(refSrlNo != "--Select--"){
	if(refDoctype != "S" || refDoctype != "T"){
		var refDocNoS = $("#refSrlDocNo").val();
		var refDocNo = $("#refDocNo").val();
		var purity = $("#purity option:selected").val();
		var refDoctype = $("#refDoctype").val();
		var metalTypeId = $("#unsettingMetalType").val();
		var unsettingMetalType = $("#unsettingMetalType").val();
		var unsettingType = $("#unsettingType").val();
		var uVendor = $("#uVendor").val();	
		
		
		var rows = $("#cuItemMasterGrid").jqxGrid('getrows');
		
		if(typeof rows != "undefined"){
			for(var i=0; i<rows.length; i++){
				if(refDoctype == "GR"){
					if(rows[i].docNo == refDocNo && rows[i].refDocSrlNo == $("#refSrlDocNo").val()){
						$.growl.error({
							message : "Reference document no already exists.",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
				}
				
				if(refDoctype != "GR" && rows[i].docNo == refDocNo){
					$.growl.error({
						message : "Reference document no already exists.",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}
		}
		if(unsettingMetalType == "" || unsettingType == "" || purity == "" || uVendor == "" || refDoctype == ""){
			$.growl.error({
				message : "Please select mandatory fields.",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}else{
			$("#unsettingMetalType").prop('disabled', true);
			$("#unsettingType").prop('disabled', true);
			$("#purity").prop('disabled', true);
			$("#uVendor").prop('disabled', true);
			$("#refDoctype").prop('disabled', true);
		}
		var fieldFilters = {
			"fieldFilters":{ 	
				"refDocNo" : refDocNo,
				"refDocSrlNo" : refDocNoS,
				"purity" : purity,
				"refDocType" : refDoctype,
				"metalTypeId" : metalTypeId,
				"vendorId": $("#uVendor").val()
			}
		};	
		
		postJSON('/OrderExecution/api/v1/getUnsettingOnChangeLOV', JSON.stringify(fieldFilters), function(response) {		
			
			var listItem = response.payload.dto;
			if(response.resCode == 1){
				if(typeof listItem != "undefined"){
					$("#jTypeC").val((response.payload.dto.jType == null) ? "" : response.payload.dto.jType.description);
					$("#grossWtC").val((response.payload.dto.grossWt == null) ? "" :response.payload.dto.grossWt);
					$("#netWtC").val((response.payload.dto.netWt == null) ? ""  : response.payload.dto.netWt);
					$("#piecesC").val((response.payload.dto.pieces == null) ? "" : response.payload.dto.pieces);
					$("#purityC").val((response.payload.dto.skingPurity == null) ? "" : response.payload.dto.skingPurity);
					$("#itemVendorCodeC").val((response.payload.dto.itemVendor == null) ? "" : response.payload.dto.itemVendor.vendorCode);
					$("#delearConsign").val((response.payload.dto.dealerMfg == null) ? "" : response.payload.dto.dealerMfg);
				}
				if(response.mesgStr != ""){
					$.growl.notice({
						message : response.mesgStr,
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}else{
				$.growl.error({
					message : response.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
	 }
   }
})

// Accessory Item Grid
var accItemGrid = function(data) {
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
			{name : 'custAccWt', type : 'float'},
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

// Others / Precious Stone Item Grid
var opStoneItemGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'lotNo', type : 'string'}, 
			{name : 'srlNo', type : 'int'},
			{name : 'stoneSrlNo', type : 'int'},
			{name : 'stoneMasterId', type : 'int'},
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
			{name : 'costRange', type : 'string'},
			{name : 'uom', type : 'string'},
			{name : 'weightRange', type : 'string'},
			{name : 'clarity', type : 'string'},
			{name : 'color', type : 'string'},
			{name : 'actualColor', type : 'string'},
			{name : 'cutGrade', type : 'string'},
			{name : 'fromWtCost', type : 'float'},
			{name : 'toWtCost', type : 'float'},
			{name : 'subCatId', type : 'int'},
			{name : 'suppliedBy', type : 'float'},
			],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#stoneOPItemGrid").jqxGrid({
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
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Capture Unsetting Others/Precious Stone Details');
		},
		columns : [ 
			{text: '', datafield : 'stoneMasterId',hidden:true},
			{ text : 'Ref Doc No', datafield : 'stockId', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : 'Ref Doc No', datafield : 'refDocNo', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Srl No.', datafield : 'srlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Srl No.', datafield : 'stoneSrlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},

			{ text : 'Location', datafield : 'location', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Seg', datafield : 'stoneSegment', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Cat', datafield : 'stoneMainCat', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat', datafield : 'stoneSubCatDesc', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Article Code', datafield : 'stoneArticleCod', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cost Range', datafield : 'costRange', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'uom', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pre-Unset Pcs', datafield : 'preUnsetPcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pre-Unset Wt.', datafield : 'preUnsetWt', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Stone Cost', datafield : 'cost', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},

			{ text : 'Cust Pcs', datafield : 'custStonePieces', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cust Wt.', datafield : 'custStoneWt', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'JW Pcs', datafield : 'jwPcs', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'JW Wt.', datafield : 'jwWt', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'JW Cost', datafield : 'jwStoneCost', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : '', datafield : 'suppliedBy', editable : false, sortable : false,hidden:true}
		]
	});
}

// Stone Item Grid

var stoneItemGrid = function(data) {
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

//Item Master Grid
var cuItemMasterGrid = function(data) {
	
	var generaterow = function(i) {
		var row = {};
		row["refType"] = "";
		row["purity"] = "";
		row["docNo"] = "";
		
		return row;
	}
	var source = {
		datafields : [ 
			{name : 'id',type : 'int'},
			{name : 'unsettingDate', type : 'date'}, 
			{name : 'itemVendorCode', type : 'string'},
			{name : 'refType', type : 'string'},
			{name: 'refTypeC',type:'String'},
			{name : 'segment', type : 'string'},
			{name : 'segmentId', type : 'int'},
			{name : 'itemVendorCodeId', type: 'string'},
			{name : 'purity', type : 'string'},
			{name : 'docNo', type : 'string'},
			{name : 'refDocSrlNo', type : 'int'},
			{name : 'preUnsetPcs', type : 'int'},
			{name : 'preUnsetGrWt', type : 'float'},
			{name : 'preUnsetNetWt', type : 'float'},
			{name : 'costMC', type : 'float'},
			{name : 'costWastage', type : 'float'},
			{name : 'lineItemCost', type : 'float'},
			{name : 'fromLoc', type : 'string'},
			{name : 'jTypeId', type : 'string'},
			{name : 'jTypeName', type : 'string'},
			{name : 'toLoc', type : 'string'},
			{name : 'refDocSrlNo', type : 'string'},
			{name : 'itemDesc', type : 'string'},
			{name : 'meltPurity', type : 'string'},
			{name : 'unsetVendorId', type : 'string'},
			{name : 'dealConsRate', type : 'string'},
			{name : 'stndRate', type : 'string'},
			{name : 'pureWt', type : 'string'},
			{name : 'metCost', type : 'string'},
			{name : 'wastageWt', type : 'string'},
			{name : 'igstFlag', type : 'float'},
			{name : 'cgstPerc', type : 'float'},
			{name : 'cgstAmnt', type : 'float'},
			{name : 'sgstPerc', type : 'float'},
			{name : 'sgstAmnt', type : 'float'},
			{name : 'igstPerc', type : 'float'},
			{name : 'igstAmnt', type : 'float'},
			{name : 'cessPerc', type : 'float'},
			{name : 'cessAmnt', type : 'float'},
			{name : 'dealerMfg', type : 'string'},
			{name : 'wastagePure',type:'float'},
			{name : 'isSplitStock',type : 'string'},
			{name : 'costCode',type : 'string'}
		],
			
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};
	for(var i=0; i<data.length; i++){
		var datarow = generaterow(i);		
	}
	var commit = $("#cuItemMasterGrid").jqxGrid('addrow',	null, datarow);
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#cuItemMasterGrid").jqxGrid({
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
			
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Capture Unsetting Item Details<div class="pull-right">(select row to delete)&nbsp;<div style="margin-bottom: 10px;" id="cuItemSelect" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
			$("#cuItemSelect").jqxButton();
			
			$("#cuItemSelect").on('click', function() {
				var selectedrowindex = $("#cuItemMasterGrid").jqxGrid('getselectedrowindex');
				var rowscount = $("#cuItemMasterGrid").jqxGrid('getdatainformation').rowscount;
			
				var masterow = $("#cuItemMasterGrid").jqxGrid('getrows');
				var rowsStone = $("#stoneItemGrid").jqxGrid('getrows');
				var rowsOPStone = $("#stoneOPItemGrid").jqxGrid('getrows');
				var rowsAcc = $("#accItemGrid").jqxGrid('getrows');				
				
			
				if (typeof rowsStone != "undefined") {
					for (var i = 0; i < rowsStone.length; i++) {
						var docNo = masterow[selectedrowindex].id;						
						if (rowsStone[i].stockId == docNo) {
							var idVal = $("#stoneItemGrid").jqxGrid('getrowid', i);
							var commit = $("#stoneItemGrid").jqxGrid('deleterow', idVal);
							var i = i - 1;
						}
					}
				}

				if (typeof rowsOPStone != "undefined") {
					for (var j = 0; j < rowsOPStone.length; j++) {
						var docNo = masterow[selectedrowindex].id;						
						if (rowsOPStone[j].stockId == docNo) {
							var idVal = $("#stoneOPItemGrid").jqxGrid('getrowid', j);
							var commit = $("#stoneOPItemGrid").jqxGrid('deleterow', idVal);
							var j = j - 1;
						}
					}
				}
				
				if (typeof rowsAcc != "undefined") {
					for (var k = 0; k < rowsAcc.length; k++) {
						var docNo = masterow[selectedrowindex].id;						
						if (rowsAcc[k].stockId == docNo) {
							var idVal = $("#accItemGrid").jqxGrid('getrowid', k);
							var commit = $("#accItemGrid").jqxGrid('deleterow', idVal);
							var k = k - 1;
						}
					}
				}
				
				
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#cuItemMasterGrid").jqxGrid('getrowid', selectedrowindex);
					var commit = $("#cuItemMasterGrid").jqxGrid('deleterow', id);
				}
				for (var m = 0; m < rowscount; m++) {
					$("#cuItemMasterGrid").jqxGrid("setcellvalue", m, "serialNo", m + 1);
				}
				if(masterow.length == 0 && rowsStone.length == 0 && rowsOPStone.length == 0 && rowsAcc.length == 0){
					//window.location.href = "javascript:showContentPage('captureUnsetting', 'bodySwitcher')";
				}
		
			});

		},
		columns : [ 
			{ text : 'Unsetting Date', datafield : 'unsettingDate', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false, columntype : 'datetimeinput', cellsformat : 'dd/MM/yyyy'},
			{ text : 'Item Vendor Code', datafield : 'itemVendorCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Doc Type', datafield : 'refType', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : 'Ref Doc Type', datafield : 'refTypeC', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:false},
			{ text : 'Segment', datafield : 'segment', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Purity', datafield : 'purity', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : 'Ref Doc No.', datafield : 'docNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Srl No.', datafield : 'refDocSrlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pre-Unset Pcs', datafield : 'preUnsetPcs', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pre-Unset Gross Wt.', datafield : 'preUnsetGrWt', width : '11%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Pre-Unset Net Wt.', datafield : 'preUnsetNetWt', width : '11%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Cost MC', datafield : 'costMC', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : 'Cost Wastage', datafield : 'costWastage', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Line Item Cost', datafield : 'lineItemCost', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : '', datafield : 'cgstPerc',hidden:true},
			{ text : '', datafield : 'igstFlag',hidden:true},
			{ text : '', datafield : 'cgstAmnt',hidden:true},
			{ text : '', datafield : 'sgstPerc',hidden:true},
			{ text : '', datafield : 'sgstAmnt',hidden:true},
			{ text : '', datafield : 'igstPerc',hidden:true},
			{ text : '', datafield : 'igstAmnt',hidden:true},
			{ text : '', datafield : 'cessPerc',hidden:true},
			{ text : '', datafield : 'cessAmnt',hidden:true},
			{ text : '', datafield : 'costCode',hidden:true},
			{ text : 'isSplitStock', datafield : 'isSplitStock',hidden:true},
			{ text : '', datafield : 'wastagePure',hidden:true, width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},


		]
	});
}

// Save/Create Capture UnSetting details to generate lot number
$("#saveCUDetails").on('click', function(){
	saveUnsettingDetails('Unsetting');
});

var saveUnsettingDetails = function(type){
	var cuRowGridData = $("#cuItemMasterGrid").jqxGrid('getrows');
	var stoneRowGridData = $("#stoneItemGrid").jqxGrid('getrows');
	var opStoneRowGridData = $("#stoneOPItemGrid").jqxGrid('getrows');
	var accRowGridData = $("#accItemGrid").jqxGrid('getrows');
	var unsetDetailDTOArr = [];	
	if(typeof cuRowGridData != "undefined"){
		$.each(cuRowGridData, function(key, val){
			var subItemObj = {
					"unsettingStoneDetails" : [],
					"unsettingAccDetails" :[]
			};
			
			console.log(val);
			subItemObj["id"] = val.id
			subItemObj["jType"]  =  {"id" : val.jTypeId == null ? null : val.jTypeId};
			subItemObj["refDocType"] = val.refType == null ? null : val.refType;
			subItemObj["refDocNo"]	= val.docNo == null ? null : val.docNo;
			subItemObj["refDocSrlNo"]	= val.refDocSrlNo == null ? null : val.refDocSrlNo;
			subItemObj["fromLoc"]	= val.fromLoc == null ? null : val.fromLoc;
			subItemObj["itemDesc"]	= val.itemDesc == null ? null : val.itemDesc ;
			
			subItemObj["skingPurity"]	= val.purity == null ? null : val.purity ;
			subItemObj["meltPurity"]	= val.meltPurity == null ? null : val.meltPurity;
			subItemObj["itemVendor"]	=  { "vendorId" : val.itemVendorCodeId == null ? null : val.itemVendorCodeId};
			subItemObj["unsetVendorId"]	= {"vendorId" : $("#uVendor").val() == null ? null : $("#uVendor").val()};
			subItemObj["segment"]	= {"id" : val.segmentId == null ? null : val.segmentId};
			subItemObj["dealConsRate"]	= val.dealConsRate == null ? null : val.dealConsRate;
			subItemObj["stndRate"]	= val.stndRate == null ? null : val.stndRate;
			subItemObj["grossWt"]	= val.preUnsetGrWt == null ? null : val.preUnsetGrWt;
			subItemObj["netWt"]	= val.preUnsetNetWt == null ? null : val.preUnsetNetWt; 
			subItemObj["pureWt"]	= val.pureWt == null ? null : val.pureWt;
			subItemObj["pieces"]	= val.preUnsetPcs == null ? null : val.preUnsetPcs;
			subItemObj["toLoc"]	= val.toLoc == null ? null : val.toLoc;
			subItemObj["metCost"]	= val.metCost == null ? null : val.metCost;
			subItemObj["lineItemCost"]	= val.lineItemCost == null ? null : val.lineItemCost;
			subItemObj["costMc"]	= val.costMC == null ? null : val.costMC;
			subItemObj["wastageWt"]	= val.wastageWt == null ? null : val.wastageWt;
			subItemObj["wastagePure"]	= val.wastagePure == null ? null : val.wastagePure;
			subItemObj["dealerMfg"]	= val.dealerMfg == null ? null : val.dealerMfg;
			subItemObj["igstFlag"]	= val.igstFlag == null ? null : val.igstFlag;
			subItemObj["cgstPerc"]	= val.cgstPerc == null ? null : val.cgstPerc;
			subItemObj["cgstAmnt"]	= val.cgstAmnt == null ? null : val.cgstAmnt;
			subItemObj["sgstPerc"]	= val.sgstPerc == null ? null : val.sgstPerc;
			subItemObj["sgstAmnt"]	= val.sgstAmnt == null ? null : val.sgstAmnt;
			subItemObj["igstPerc"]	= val.igstPerc == null ? null : val.igstPerc;
			subItemObj["igstAmnt"]	= val.igstAmnt == null ? null : val.igstAmnt;
			subItemObj["cessPerc"]	= val.cessPerc == null ? null : val.cessPerc;
			subItemObj["cessAmnt"]	= val.cessAmnt == null ? null : val.cessAmnt;
			subItemObj["packetId"]	= val.packetId == null ? null : val.packetId;
			subItemObj["costCode"]	= val.costCode == null ? null : val.costCode;
			
			if(typeof opStoneRowGridData != "undefined"){
				$.each(opStoneRowGridData, function(k, v){
					if(val.id == v.stockId){
						subItemObj['unsettingStoneDetails'].push(v);
					}else{
						if($("#refDoctype").val() == "T" && val.docNo == v.stockId){
							subItemObj['unsettingStoneDetails'].push(v);
						}
					} 
				});
			}
			
			if(typeof stoneRowGridData != "undefined"){
				$.each(stoneRowGridData, function(k, v){
					if(val.id == v.stockId){
						subItemObj['unsettingStoneDetails'].push(v);
					}else{
						if($("#refDoctype").val() == "T" && val.docNo == v.stockId){
							subItemObj['unsettingStoneDetails'].push(v);
						}
					}
				});
			}

			if(typeof accRowGridData != "undefined"){
				$.each(accRowGridData, function(k, v){
					if(val.id == v.stockId){
						subItemObj['unsettingAccDetails'].push(v);
					}else{
						if($("#refDoctype").val() == "T" && val.docNo == v.stockId){
							subItemObj['unsettingAccDetails'].push(v);
						}
					}
				});
			}
			unsetDetailDTOArr.push(subItemObj);
		});
	}
		
	var saveCuetailsObj = {
		 "metalTypeId": type == "Unsetting" ? $("#unsettingMetalType").val(): $("#unsettingMetalTypeIdC").val() ,
		 "unsetType":  type == "Unsetting" ? $("#unsettingType").val()  : $("#unsettingTypeCodeC").val(),
		 "thirdPartyvendorId": type == "Unsetting" ? $("#uVendor").val() : $("#uVendor").val(),
		 "refDoctype": type == "Unsetting" ? $("#refDoctype").val() : $("#refDoctypeIdC").val() ,
		 "unsetDetailDTO" : unsetDetailDTOArr,
		 
	}
	
	console.log(JSON.stringify(saveCuetailsObj));
	// Calling API to create LOT No for the vendor with same same purity and ref doc type.
	postJSON('/OrderExecution/api/v1/saveUnsettingDetails', JSON.stringify(saveCuetailsObj), function(response) {
		$("#saveSplitDetails").prop('disabled',true);
		if (response.resCode == 1) {
			$.growl.notice({
				message : response.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			
			$("#accItemGrid").jqxGrid('clear');
			$("#stoneItemGrid").jqxGrid('clear');
			$("#stoneOPItemGrid").jqxGrid('clear');
			$("#cuItemMasterGrid").jqxGrid('clear');
			if(type == "Unsetting"){
				redirect();
			}else{
				redirect1();
			}
			return false;
		}else {
			$.growl.error({
				message : response.mesgStr,
				duration : 10000
			});
			return false;
		}
	});
}
var redirect1 = function() {
	window.location.href = "javascript:showContentPage('captureUnsettingForSplit', 'bodySwitcher')";
	return window.location.href;
}
/*$("#saveCUDetails").on('click', function(){
	var cuRowGridData = $("#cuItemMasterGrid").jqxGrid('getrows');
	var stoneRowGridData = $("#stoneItemGrid").jqxGrid('getrows');
	var opStoneRowGridData = $("#stoneOPItemGrid").jqxGrid('getrows');
	var accRowGridData = $("#accItemGrid").jqxGrid('getrows');
	var unsetDetailDTOArr = [];	
	if(typeof cuRowGridData != "undefined"){
		$.each(cuRowGridData, function(key, val){
			var subItemObj = {
					"unsettingStoneDetails" : [],
					"unsettingAccDetails" :[]
			};
			
			subItemObj["id"] = val.id
			subItemObj["jType"]  =  {"id" : val.jTypeId == null ? null : val.jTypeId};
			subItemObj["refDocType"] = val.refType == null ? null : val.refType;
			subItemObj["refDocNo"]	= val.docNo == null ? null : val.docNo;
			subItemObj["refDocSrlNo"]	= val.refDocSrlNo == null ? null : val.refDocSrlNo;
			subItemObj["fromLoc"]	= val.fromLoc == null ? null : val.fromLoc;
			subItemObj["itemDesc"]	= val.itemDesc == null ? null : val.itemDesc ;
			
			subItemObj["skingPurity"]	= val.purity == null ? null : val.purity ;
			subItemObj["meltPurity"]	= val.meltPurity == null ? null : val.meltPurity;
			subItemObj["itemVendor"]	=  { "vendorId" : val.itemVendorCodeId == null ? null : val.itemVendorCodeId};
			subItemObj["unsetVendorId"]	= {"vendorId" : $("#uVendor").val() == null ? null : $("#uVendor").val()};
			subItemObj["segment"]	= {"id" : val.segmentId == null ? null : val.segmentId};
			subItemObj["dealConsRate"]	= val.dealConsRate == null ? null : val.dealConsRate;
			subItemObj["stndRate"]	= val.stndRate == null ? null : val.stndRate;
			subItemObj["grossWt"]	= val.preUnsetGrWt == null ? null : val.preUnsetGrWt;
			subItemObj["netWt"]	= val.preUnsetNetWt == null ? null : val.preUnsetNetWt; 
			subItemObj["pureWt"]	= val.pureWt == null ? null : val.pureWt;
			subItemObj["pieces"]	= val.preUnsetPcs == null ? null : val.preUnsetPcs;
			subItemObj["toLoc"]	= val.toLoc == null ? null : val.toLoc;
			subItemObj["metCost"]	= val.metCost == null ? null : val.metCost;
			subItemObj["lineItemCost"]	= val.lineItemCost == null ? null : val.lineItemCost;
			subItemObj["costMc"]	= val.costMC == null ? null : val.costMC;
			subItemObj["wastageWt"]	= val.wastageWt == null ? null : val.wastageWt;
			subItemObj["wastagePure"]	= val.wastagePure == null ? null : val.wastagePure;
			subItemObj["dealerMfg"]	= val.dealerMfg == null ? null : val.dealerMfg;
			subItemObj["igstFlag"]	= val.igstFlag == null ? null : val.igstFlag;
			subItemObj["cgstPerc"]	= val.cgstPerc == null ? null : val.cgstPerc;
			subItemObj["cgstAmnt"]	= val.cgstAmnt == null ? null : val.cgstAmnt;
			subItemObj["sgstPerc"]	= val.sgstPerc == null ? null : val.sgstPerc;
			subItemObj["sgstAmnt"]	= val.sgstAmnt == null ? null : val.sgstAmnt;
			subItemObj["igstPerc"]	= val.igstPerc == null ? null : val.igstPerc;
			subItemObj["igstAmnt"]	= val.igstAmnt == null ? null : val.igstAmnt;
			subItemObj["cessPerc"]	= val.cessPerc == null ? null : val.cessPerc;
			subItemObj["cessAmnt"]	= val.cessAmnt == null ? null : val.cessAmnt;
			subItemObj["packetId"]	= val.packetId == null ? null : val.packetId;
			
			if(typeof opStoneRowGridData != "undefined"){
				$.each(opStoneRowGridData, function(k, v){
					if(val.id == v.stockId){
						subItemObj['unsettingStoneDetails'].push(v);
					} 
				});
			}
			
			if(typeof stoneRowGridData != "undefined"){
				$.each(stoneRowGridData, function(k, v){
					if(val.id == v.stockId){
						subItemObj['unsettingStoneDetails'].push(v);
					}
				});
			}

			if(typeof accRowGridData != "undefined"){
				$.each(accRowGridData, function(k, v){
					if(val.id == v.stockId){
						subItemObj['unsettingAccDetails'].push(v);
					}
				});
			}
			unsetDetailDTOArr.push(subItemObj);
		});
	}
		
	var saveCuetailsObj = {
		 "metalTypeId": $("#unsettingMetalType").val(),
		 "unsetType": $("#unsettingType").val(),
		 "thirdPartyvendorId": $("#uVendor").val(),
		 "refDoctype": $("#refDoctype").val(),
		 "unsetDetailDTO" : unsetDetailDTOArr,
		 
	}
	
	console.log(saveCuetailsObj);
	// Calling API to create LOT No for the vendor with same same purity and ref doc type.
	postJSON('/OrderExecution/api/v1/saveUnsettingDetails', JSON.stringify(saveCuetailsObj), function(response) {
		if (response.resCode == 1) {
			$.growl.notice({
				message : response.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			
			$("#accItemGrid").jqxGrid('clear');
			$("#stoneItemGrid").jqxGrid('clear');
			$("#stoneOPItemGrid").jqxGrid('clear');
			$("#cuItemMasterGrid").jqxGrid('clear');
			redirect();
			return false;
		}else {
			$.growl.error({
				message : response.mesgStr,
				duration : 10000
			});
			return false;
		}
	});
});*/

var createFunc = function(){
	$("#cuSearchSection").hide();
	$("#createCUSection").show();
	$("#footerSection").hide();
	unsettingOnloadLOV();
}

// Search Grid #######################################################################

var onloadCuSearchLov = function(){
	
	$('#metalSegmentS').empty().append('<option value="" selected>--Select--</option>');
	$('#articleSegmentS').empty().append('<option value="" selected>--Select--</option>');
	$('#jeweltypeS').empty().append('<option value="" selected>--Select--</option>');
	$('#openCloseS').empty().append('<option value="" selected>--Select--</option>');

	$.getJSON('/OrderExecution/api/v1/unsettingSearchOnloadLOV ', function(response) {	
		var metalSegmentS = response.payload.mSegment;
		var articleSegmentS = response.payload.aSegment;
		var jeweltypeS = response.payload.jTypes;
		var openCloseS = response.payload.openClosed;
		
		$.each(metalSegmentS,	function(k, v) {
			$('#metalSegmentS').append('<option value="' + v.segmentId + '">' + v.description + '</option>');
		});
		
		$.each(articleSegmentS,	function(k, v) {
			$('#articleSegmentS').append('<option value="' + v.id + '">' + v.description + '</option>');
		});		
	
		$.each(jeweltypeS,	function(k, v) {
			$('#jeweltypeS').append('<option value="' + v.id + '">' + v.description + '</option>');
		});
		
		$.each(openCloseS,	function(k, v) {
			$('#openCloseS').append('<option value="' + v.id + '">' + v.id + '</option>');
		});
		
		vendorList = response.payload.itemVendors;
		
		var data = [];
		$.each( vendorList, function( key, value ) {			      
				data.push({ value: value.vendorId, label: value.vendorName});
		});
		
	
			
		$("#vendorCode").autocomplete({						
			source: data,
			focus: function(event, ui) {						
				event.preventDefault();
				$(this).val(ui.item.label);						
			},
			select: function(event, ui) {					
				event.preventDefault();
				$(this).val(ui.item.label);					
				$("#vendorCode-value").val(ui.item.value);					
			}
		});
		
		unsettingVendors = response.payload.unsettingVendors;
		
		var dataU = [];
		$.each( unsettingVendors, function( key, value ) {			      
			dataU.push({ value: value.vendorId, label: value.vendorName});
		});
		
	
			
		$("#unsettingVendorcode").autocomplete({						
			source: dataU,
			focus: function(event, ui) {						
				event.preventDefault();
				$(this).val(ui.item.label);						
			},
			select: function(event, ui) {					
				event.preventDefault();
				$(this).val(ui.item.label);					
				$("#unsettingVendorcode-value").val(ui.item.value);					
			}
		});
	});
}

//Get Purity on change of metal type in search
$("#metalSegmentS").on('change', function(){
	var metalTypeId = $(this).val();
	
	$('#purityS').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/unsettingSearchOnloadLOV?mSegId='+metalTypeId, function(response) {
		var purityS = response.payload.purity;
		
		$.each(purityS,	function(k, v) {
			$('#purityS').append('<option value="' + v.skinPurity + '">' + v.skinPurity + '</option>');
		});
	});
});

onloadCuSearchLov();

var cuSearchFieldFilters = function(){
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var metalSegmentS = $('#metalSegmentS').val();
	var articleSegmentS = $('#articleSegmentS').val();
	var purityS = $('#purityS').val();

	var jeweltypeS = $('#jeweltypeS').val();
	var vendorCode = $('#vendorCode-value').val();
	var unsettingVendorcode = $('#unsettingVendorcode-value').val();
	var unsettingLot = $('#unsettingLot').val();
	var openCloseS = $('#openCloseS').val();

	fieldFilters = {
		"fieldFilters" : {}
	};
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["ItemVcode"] = vendorCode;
	}
	
	if (unsettingVendorcode != "" && unsettingVendorcode != null) {
		fieldFilters.fieldFilters["uVcode"] = unsettingVendorcode;
	}
	
	if (unsettingLot != "" && unsettingLot != null) {
		fieldFilters.fieldFilters["lotNo"] = unsettingLot;
	}
	
	if (openCloseS != "" && openCloseS != null) {
		fieldFilters.fieldFilters["openClose"] = (openCloseS == "Open") ? "G,M": "R"
	}
	
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}

	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (metalSegmentS != "" && metalSegmentS != null) {
		fieldFilters.fieldFilters["mSegment"] = metalSegmentS;
	}
	if (jeweltypeS != "" && jeweltypeS != null) {
		fieldFilters.fieldFilters["jtype"] = jeweltypeS;
	}

	if (articleSegmentS != "" && articleSegmentS != null) {
		fieldFilters.fieldFilters["aSegment"] = articleSegmentS;
	}
	if (purityS != "" && purityS != null) {
		fieldFilters.fieldFilters["purity"] = purityS;
	}
	return fieldFilters;
}

// View Capture Unsetting details ###################################################

//Accessory Item Grid
var viewAccItemGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'unsetLotNo', type : 'string'}, 
			{name : 'accSegment', type : 'string'},
			{name: 'accArticleCode', type: 'int'},
			{name : 'accCost', type : 'string'},
			{name : 'accSubCategory', type : 'string'},
			{name : 'subCatId', type : 'int'},
			{name : 'uom', type : 'string','map':'uqc'},
			{name : 'pcs', type : 'int','map':'preUnsetAccPcs'},
			{name : 'weight', type : 'float','map':'preUnsetAccWt'},
			{name : 'accCat', type : 'string','map':'accCategory'},
			],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},

	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewAccItemGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 50,
		autorowheight : true,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'Lot No.', datafield : 'unsetLotNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Segment', datafield : 'accSegment', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Category', datafield : 'accCat', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat', datafield : 'accSubCategory', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UOM', datafield : 'uom', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : 'Pcs', datafield : 'pcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Weight', datafield : 'weight', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Cost', datafield : 'accCost', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},

		]
	});
}

//Stone Others View Grid
var viewStoneOtherItemGrid = function(data) {
	var source = {
	datafields : [ 
			{name : 'unsetLotNo', type : 'float'},
			{name : 'stoneSegment', type : 'string',}, 
			{name : 'stoneMainCat', type : 'int'},
			{name: 'stoneSubCatDesc', type: 'int'},
			{name : 'weightRange', type : 'string'},
			{name : 'costRange', type : 'string'},
			{name : 'cost', type : 'string'},
			{name : 'clarity', type : 'string'},
			{name : 'color', type : 'string'},
			{name : 'cutGrade', type : 'string'},
			{name : 'weight', type : 'float','map':'preUnsetWt'},
			{name : 'pcs', type : 'int','map':'preUnsetPcs'},
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},

	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewStoneOtherItemGrid").jqxGrid({
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
		columns : [ 
			{ text : 'Lot No.', datafield : 'unsetLotNo', width : '11%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Seg.', datafield : 'stoneSegment', width : '17%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Main Cat.', datafield : 'stoneMainCat', width : '17%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Sub Cat', datafield : 'stoneSubCatDesc', width : '18%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Wt. Range', datafield : 'weightRange', width : '10%', cellsalign : 'center',hidden:true, align : 'center', editable : false, sortable : false},
			{ text : 'Cost Range', datafield : 'costRange', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Clarity', datafield : 'clarity', width : '8%', cellsalign : 'center', hidden:true,align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Color', datafield : 'color', width : '8%', cellsalign : 'center',hidden:true, align : 'center', editable : false, sortable : false},
			{ text : 'Cut Grade', datafield : 'cutGrade', width : '8%', cellsalign : 'center', hidden:true,align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : 'Pcs', datafield : 'pcs', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Weight.', datafield : 'weight', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Cost', datafield : 'cost', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
		]
	});
}

//Stone Precious View Grid
var viewStonePreciousItemGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'unsetLotNo', type : 'float'},
			{name : 'stoneSegment', type : 'string'}, 
			{name : 'stoneMainCat', type : 'int'},
			{name: 'stoneSubCatDesc', type: 'int'},
			{name : 'weightRange', type : 'string'},
			{name : 'costRange', type : 'string'},
			{name : 'cost', type : 'string'},
			{name : 'clarity', type : 'string'},
			{name : 'color', type : 'string'},
			{name : 'cutGrade', type : 'int'},
			{name : 'pcs', type : 'int','map':'preUnsetPcs'},
			{name : 'weight', type : 'float','map':'preUnsetWt'},
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},

	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewStonePreciousItemGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 50,
		autorowheight : true,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'Lot No.', datafield : 'unsetLotNo', width : '11%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Seg.', datafield : 'stoneSegment', width : '17%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Main Cat.', datafield : 'stoneMainCat', width : '17%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Sub Cat', datafield : 'stoneSubCatDesc', width : '18%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Wt. Range', datafield : 'weightRange', width : '10%', cellsalign : 'center', align : 'center',hidden:true, editable : false, sortable : false},
			{ text : 'Cost Range', datafield : 'costRange', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Calarity', datafield : 'clarity', width : '8%', cellsalign : 'center',hidden:true, align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Color', datafield : 'color', width : '8%', cellsalign : 'center',hidden:true, align : 'center', editable : false, sortable : false},
			{ text : 'Cut Grade', datafield : 'cutGrade', width : '8%',hidden:true, cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : 'Pcs', datafield : 'pcs', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Weight', datafield : 'weight', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Cost', datafield : 'cost', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
		]
	});
}

//Stone Diamond View Grid
var viewStoneDiamondItemGrid = function(data) {
	var source = {
			datafields : [ 
				{name : 'unsetLotNo', type : 'float'},
				{name : 'stoneSegment', type : 'string'}, 
				{name : 'stoneMainCat', type : 'int'},
				{name: 'stoneSubCatDesc', type: 'int'},
				{name : 'weightRange', type : 'string'},
				{name : 'costRange', type : 'string'},
				{name : 'cost', type : 'string'},
				{name : 'clarity', type : 'string'},
				{name : 'color', type : 'string'},
				{name : 'cutGrade', type : 'int'},
				{name : 'pcs', type : 'int','map':'preUnsetPcs'},
				{name : 'weight', type : 'float','map':'preUnsetWt'},
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},

	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewStoneDiamondItemGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 50,
		autorowheight : true,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'Lot No.', datafield : 'unsetLotNo', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Seg.', datafield : 'stoneSegment', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Main Cat', datafield : 'stoneMainCat', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Sub Cat', datafield : 'stoneSubCatDesc', width : '19%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Wt. Range', datafield : 'weightRange', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cost Range', datafield : 'costRange', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Calarity', datafield : 'clarity', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Color', datafield : 'color', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cut Grade', datafield : 'cutGrade', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : 'Pcs', datafield : 'pcs', width : '5%',cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Weight', datafield : 'weight', width : '8%',cellsformat : 'd3', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'Cost', datafield : 'cost', width : '9%',cellsformat : 'd2', cellsalign : 'right', align : 'center', editable : false, sortable : false},
		]
	});
}

var viewCreatedDetails = function(lotNo)
{
	$.getJSON('/OrderExecution/api/v1/viewUnsettingDetails?lotNumber=' + lotNo, function(response) {
		if(response.resCode == "1"){
			var vd = response.payload.list;
			$("#totalGwt").val(vd.totalGwt);
			$("#totalNwt").val(vd.totalNwt);
			$("#totalPurewt").val(vd.totalPurewt);
			$("#totalMetalval").val(vd.totalMetalval);
			$("#totalItemCost").val(vd.totalItemCost);
			$("#totalPieces").val(vd.totalPieces);
			$("#stoneTotalGwt").val(vd.stoneTotalGwt);
			$("#stoneTotalNwt").val(vd.stoneTotalNwt);
			$("#stoneTotalPurewt").val(vd.stoneTotalPurewt);
			$("#stoneTotalMval").val(vd.stoneTotalMval);
			$("#stoneTotalPcs").val(vd.stoneTotalPcs);
			$("#stoneTotalCost").val(vd.stoneTotalCost);
			$("#accTotalGwt").val(vd.accTotalGwt);
			$("#accTotalNwt").val(vd.accTotalNwt);
			$("#accTotalPurewt").val(vd.accTotalPurewt);
			$("#accTotalMval").val(vd.accTotalMval);
			$("#accTotalPcs").val(vd.accTotalPcs);
			$("#accTotalCost").val(vd.accTotalCost);
			
			viewAccItemGrid(vd.unsettingAccDetails);
			viewStoneOtherItemGrid(vd.unsettingOtherStoneDetails);
			viewStonePreciousItemGrid(vd.unsettingPreciousStoneDetails);
			viewStoneDiamondItemGrid(vd.unsettingDiamondStoneDetails);
		}else{
			viewAccItemGrid();
			viewStoneOtherItemGrid();
			viewStonePreciousItemGrid();
			viewStoneDiamondItemGrid();
		}

	});
}

//Edit Capture Modal Calling
var viewCaptureUnsetting = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"   data-target="#viewCapturedetail" type="button" id=' + row + ' onclick="viewCreatedDetails('+ value + ')" ><i class="fa fa-eye fa-sm"></i></button>';
}

// Search Capture Grid
var searchCaptureUnsettingGrid = function() {	
	
	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [
		{'name' : 'lotNumber','type' : 'string'},
		{'name' : 'unsettingDate','type' : 'date', map: 'date'},
		{'name' : 'metalSegment','type' : 'string', map: 'metalSegment>description'},
		{'name' : 'articleSegment','type' : 'string', map: 'segment>description'},
		{'name' : 'status','type' : 'id'},
		{'name' : 'jewelType','type' : 'string', map: 'jType>description'},
		{'name' : 'itemDesc','type' : 'string'},
		{'name' : 'unsettingVendorCode','type' : 'string', map: 'unsetVendorId>vendorCode'},
		{'name' : 'itemVendor','type' : 'id', map: 'itemVendor>vendorCode'},
		{'name' : 'grossWt','type' : 'string'},
		{'name' : 'netWt','type' : 'string'},
		{'name' : 'pureWt','type' : 'string'},
		{'name' : 'pieces','type' : 'string'},
		{'name' : 'skingPurity','type' : 'string'},
		{'name' : 'makCharges' , 'type':'string'},
		{'name' : 'wastageWt','type':'string'},
		{'name' : 'actionId', 'type':'int', map: 'lotNumber'}
	];
	
	var columns = [ 
		{ 'text' : 'LOT No.', 'datafield' : 'lotNumber', cellsalign : 'center', align:'center', 'width': '8%', sortable : true, editable : false }, 
		{ 'text' : 'Date', 'datafield' : 'unsettingDate', 'width' : '9%', cellsalign : 'center', align:'center', sortable : true, editable : false,	columntype : 'datetimeinput', cellsformat : 'dd/MM/yyyy'},
		{ 'text' : 'Vendor Code', 'datafield' : 'unsettingVendorCode', align:'center', 'width' : '7%', cellsalign : 'center', sortable : false, editable : false },
		{ 'text' : 'Item Vendor Code', 'datafield' : 'itemVendor', align:'center', 'width' : '8%', cellsalign : 'center',	sortable : false, editable : false },
		{ 'text' : 'Metal Seg.', 'datafield' : 'metalSegment','width' : '10%', cellsalign : 'center', align:'center', cellsformat : 'd2', sortable : false, editable : false },
		{ 'text' : 'Pcs', 'datafield' : 'pieces', align:'center', 'width' : '4%', cellsalign : 'center', sortable : false, editable : false },
		{ 'text' : 'Gross Wt', 'datafield' : 'grossWt', align:'center',cellsformat : 'd3', 'width' : '7%', cellsalign : 'right', sortable : false, editable : false },
		{ 'text' : 'Net Wt', 'datafield' : 'netWt', align:'center',cellsformat : 'd3', 'width' : '7%', cellsalign : 'right', sortable : false,	editable : false },
		{ 'text' : 'Purity', 'datafield' : 'skingPurity', align:'center', 'width' : '6%',cellsformat : 'd2', cellsalign : 'right', sortable : false, editable : false },
		{ 'text' : 'Pure Wt', 'datafield' : 'pureWt', align:'center', 'width' : '6%',cellsformat : 'd3', cellsalign : 'right', sortable : false, editable : false },
		{ 'text' : 'Making Charge', 'datafield' : 'makCharges', align:'center', 'width' : '9%', cellsalign : 'right', sortable : false, editable : false ,cellsformat : 'd2'},
		{ 'text' : 'Wastage', 'datafield' : 'wastageWt', align:'center', 'width': '8%', cellsalign : 'right', sortable : false, editable : false,cellsformat : 'd3' },
		{ 'text' : 'Status', 'datafield' : 'status', align:'center', 'width' : '8%', cellsalign : 'center', sortable : false, editable : false },
		{ 'text' : '', 'datafield' : 'actionId', align:'center', 'width' : '2.5%', cellsalign : 'center', sortable : false, editable : false, cellsrenderer : viewCaptureUnsetting }
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchUnsettingDetails", "list", columns , cuSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
	    sortable: true,            
	 	altrows: true,
		columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
	    autoheight :true,
	    columnsheight: 60,
		rowdetails : true,
		virtualmode : true,
	});
}


$('#search').on("click", function() {
	var metalSegmentS = $("#metalSegmentS").val();
	var articleSegmentS = $("#articleSegmentS").val();
	
	if(metalSegmentS == "" || articleSegmentS == ""){
		$.growl.error({
			message : "Please select metal segment.",
			duration : 10000
		});
		return false;
	}
	searchCaptureUnsettingGrid();
	$('#jqxgrid').show();
});


$('#clearAll').on("click", function() {
	$("#vendorCode-value").val(null);
	$("#unsettingVendorcode-value").val(null);
	$('#captureUnsettingForm').trigger("reset");
	$('#jqxgrid').jqxGrid('clear');
	$('#jqxgrid').hide();
});

//*******************************Capture Unsetting Export*******************************************

$("#export").on("click",function(){
	var count = 0;
	var data;
	var fromdate = $("#fromDate").val();
	var todate = $("#toDate").val();
	var msegment = $("#metalSegmentS").val();
	var asegment = $("#articleSegmentS").val();
	var purity=$("#purityS").val();
	var jeweltype=$("#jeweltypeS").val();
    var itemvcode=$("#vendorCode-value").val();
    var unsetvcode=$("#unsettingVendorcode-value").val();
    var lotno=$("#unsettingLot").val();
    var status=$("#openCloseS").val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromdate != "" && fromdate != null) {
	     fieldFilters.fieldFilters["fromDate"] = fromdate;
	}
	if (todate != "" && todate != null) {
		fieldFilters.fieldFilters["toDate"] = todate;
	}
	if (msegment != "" && msegment != null) {
		fieldFilters.fieldFilters["mSegment"] = msegment;
	}
	if (asegment != "" && asegment != null) {
		fieldFilters.fieldFilters["aSegment"] = asegment;
	}
	if (purity != "" && purity != null) {
		fieldFilters.fieldFilters["purity"] = purity;
	}	
	if ( jeweltype!= "" && jeweltype != null) {
		fieldFilters.fieldFilters["jtype"] = jeweltype;
	}
	if ( unsetvcode!= "" && unsetvcode != null) {
		fieldFilters.fieldFilters["uVcode"] = unsetvcode;
	}
	if ( itemvcode!= "" && itemvcode != null) {
		fieldFilters.fieldFilters["ItemVcode"] = itemvcode;
	}
	if ( lotno!= "" && lotno != null) {
		fieldFilters.fieldFilters["lotNumber"] = lotno;
	}
	if ( status!= "" && status != null) {
		fieldFilters.fieldFilters["openClose"] = status;
	}
	
	
	var newData = [];
	var rows = $("#jqxgrid").jqxGrid('getrows');
	if(typeof rows == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
	 }else{				
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/exportUnsettingDetails',JSON.stringify(fieldFilters),function(response) {
				if (response != null) {
					data = response.payload.list;
					exportUnsettingSideBySide(data);
				}
			});
		}
		 else{
			$.growl.error({
				message : "No Data to Export.",
				duration : 10000
			});
			return false;	
		}
	 }
});

function exportUnsettingSideBySide(data)
{
	var sql0 = 'SEARCH / AS @ud \
		RETURN ( \
			   @ud->[itemId] AS [Unset_Lot_Item_Id], \
		       @ud->[lotNumber] AS [Lot No], \
			   @ud->date AS [Unsetting Date], \
		       @ud->[unsetVendorId]->vendorCode AS [Unsetting Vendor Code], \
		       @ud->[itemVendor]->vendorName AS [Item Vendor Code], \
		       @ud->[segment]->description AS [Article Segment], \
		       @ud->[metalSegment]->description AS [Metal Segment], \
		       @ud->[jType]->description AS [Jewel Type], \
		       @ud->itemDesc AS [Article Desc], \
			   @ud->unSettingType AS [Ref Type], \
		       @ud->refDocNo AS [Ref No], \
		       @ud->refDocSrlNo AS [Ref Sl No], \
		       @ud->pieces AS [Pieces], \
		       @ud->grossWt AS [Gross Wt], \
	           @ud->netWt AS [Net Wt], \
		       @ud->skingPurity AS [Purity],\
		       @ud->pureWt AS [Pure Wt], \
		       @ud->makCharges AS [Making Charges],\
		       @ud->wastageWt AS [Wastage Wt],\
		       @ud->status AS [Status] ,\
			   @ud->lineItemCost AS [Item Cost], \
		       @ud->daysCount AS [No of Days Available]\
			) \
		FROM $0';
	  // Query to get first child records (stones)
	var sql1 = 'SEARCH / AS @ud\
		unsettingStoneDetails / AS @us \
			RETURN ( \
				   @ud->[itemId] AS [Unset_Lot_Item_Id], \
				   @us->srlNo AS [Item_srl_no], \
		           @us->stoneSegment AS [stoneSegment], \
                   @us->stoneMainCat AS [stoneMainCategory], \
				   @us->stoneSubCatDesc AS [stoneSubCategory], \
				   @us->stoneArticleCod AS [Stone_Stone_Code ], \
				   @us->clarity AS [Clarity], \
				   @us->color AS [Color], \
				   @us->actualColor AS [Actual Color],\
				   @us->cutGrade AS [CutGrade],\
		           @us->weightRange AS[Weight/Cost_Range],\
		           @us->custStonePieces AS[StonePcs],\
	               @us->custStoneWt AS[StoneWeight],\
				   @us->uqc AS [UQC], \
				   @us->StoneRate AS [Stone Rate], \
				   @us->cost AS [Stone Cost] \
				) \
			FROM $0';
	var sql2 = 'SEARCH / AS @ud\
		unsettingAccDetails / AS @ua \
			RETURN ( \
				   @ud->[itemId] AS [Unset_Lot_Item_Id], \
		           @ua->srlNo AS [Item_srl_no], \
				   @ua->accSegment AS [AccessorySegment], \
				   @ua->accCategory AS [AccMainCategory], \
				   @ua->accSubCategory AS [AccSubCategory], \
				   @ua->accArticleCode AS [AccCode], \
				   @ua->uqc As [AccUQC],\
				   @ua->preUnsetAccPcs AS [Accpieces], \
				   @ua->preUnsetAccWt AS [AccWt], \
				   @ua->accRate AS [AccRate],\
				   @ua->accCost AS [AccCost] \
				) \
			FROM $0';

    var sql3 = 'SELECT * FROM ? AS m FULL OUTER JOIN ? AS a ON m.[Unset_Lot_Item_Id] = a.[Unset_Lot_Item_Id] AND  m.[Item_srl_no] = a.[Item_srl_no]';
    
    var sql4 = 'SELECT * FROM ? AS m  OUTER JOIN ? AS o ON m.[Unset_Lot_Item_Id] = o.[Unset_Lot_Item_Id] ';

 var res = null;
    
    var mystyle = {
      cellStyles: true,
      headers:true, 
      column: {style:{Font:{Bold:30}}},
      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
      cells: {1:{1:{
        style: {Font:{Color:"#00FFFF"}}
      }}}
    };
    
    try
    {
    	// Following code generates export data as Master-Child side-by-side
    	res0 = alasql(sql0,[data]);
    	res1 = alasql(sql1,[data]);
    	res2 = alasql(sql2,[data]);
    	res = alasql(sql3,[res2, res1]);
    	res = alasql(sql4,[res0, res]);
    	adjustObjectKeys(res); 
    	removeNullData(res);
    	res = alasql("SELECT * INTO XLSX('CaptureUnsettingDetail.xlsx',?) FROM ?",[mystyle, res]);
    }
    catch (err)
    {
    	alert(err.message);
    }
}

