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

$("#assmbleDisamble").on('change',function(){
	if($("#assmbleDisamble").val() =="assemble"){
		$("#hideStockNo").hide();
		$("#hideAssembleIdS").show();
	}else{
		$("#hideAssembleIdS").hide();
		$("#hideStockNo").show();
	}
});
$("#hideSelectSrlNo").hide();
$("#assembleCreateBy").on('change',function(){
	$("#hideAddButton").show();
	$("#createBy").hide();
	$("#backFromAssemCreate").show();
	$("#hideAssSearch").show();
	$("#hideSelectSrlNo").show();
	$("#backFromCreate").hide();
	if($("#assembleCreateBy").val() == "disassembleId"){
		$("#hideDisAssembleIdC").show();
		$("#hidePBNoC").hide();
		$("#hideSalesRetNoC").hide();
		$("#disAssembleIdC").val("");
		$("#jqxgridAssembleHeader").jqxGrid('clear');
		$("#jqxgridStoneDetails").jqxGrid('clear');
		$("#jqxgridAccDetails").jqxGrid('clear');
		
	}else if($("#assembleCreateBy").val() == "purchaseBillSplit"){
		$("#hidePBNoC").show();
		$("#purchaseBillNoC").val("");
		$("#hideDisAssembleIdC").hide();
		$("#hideSalesRetNoC").hide();
		
		$("#jqxgridAssembleHeader").jqxGrid('clear');
		$("#jqxgridPBAssembleHeader").jqxGrid('clear');
		$("#jqxgridSBAssembleHeader").jqxGrid('clear');
	}else if($("#assembleCreateBy").val() == "salesReturn"){
		$("#hidePBNoC").hide();
		$("#salesReturnNoC").val("");
		$("#hideDisAssembleIdC").hide();
		$("#hideSalesRetNoC").show();
		
		$("#jqxgridAssembleHeader").jqxGrid('clear');
		$("#jqxgridPBAssembleHeader").jqxGrid('clear');
		$("#jqxgridSBAssembleHeader").jqxGrid('clear');
	}
});

$("#disAssembleIdC,#purchaseBillNoC,#salesReturnNoC").on('blur',function(){
	if($(this).val()==""){
		return false;
	}
	$("#srlNo").html("");
	$("#srlNo").append("<option value=''>--Select--</option>")
	$.getJSON('/OrderExecution/api/v1/getSerialNosForAssembling?headerId='+$(this).val()+'&doctype='+$("#assembleCreateBy").val(),function(data)  {
		if(data.resCode=="1"){
			$.each(data.payload.serialNos, function(key, val) {				
				$("#srlNo").append("<option value="+val.id+">"+val.serialNumber+"</option>")
			});
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 5000,
				title : 'Error'
			});
			return false;
		}
	});
});

$("#backFromAssemCreate").on('click',function(){
	$("#createBy").show();
	$("#hideSelectSrlNo").hide();
	$("#srlNo").html("");
	$("#srlNo").append("<option value=''>--Select--</option>")
	$("#hideAddButton").hide();
	$("#backFromAssemCreate").hide();
	$("#hideDisAssembleIdC").hide();
	$("#hidePBNoC").hide();
	$("#hideSalesRetNoC").hide();
	$("#backFromCreate").show();
	$("#assembleCreateBy").val("");
	$("#createGrids").hide();
	$("#pbValidateGrids").hide();
	$("#pbCreateGrids").hide();
	$("#sbCreateGrids").hide();
	$("#sbValidateGrids").hide();
	
	$("#jqxgridAssembleHeader").jqxGrid('clear');
	$("#jqxgridPBAssembleHeader").jqxGrid('clear');
	$("#jqxgridSBAssembleHeader").jqxGrid('clear');
	$("#validateGrids").hide();
	assembleDetArry = [];
	stoneArray = [];
	accArray = [];
	splitPBDetArr = [];
	pbStoneArray = [];
	pbAccArray = [];
	saleBillDetArr = [];
	sbStoneArray = [];
	sbAccArray = [];
});


$("#pbCreateGrids").hide();
$("#pbValidateGrids").hide();

//################################# Create Grids Started ###########################################3
var assembleDetGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{name : 'refNo', type : 'int','map' : 'id'}, 
			{name : 'serialNumber', type : 'int'},
			{name : 'segment', type : 'string','map' : 'segmentDTO>description'},
			{name: 'jewelType', type: 'string','map':'jewelTypeDTO>description'},
			{name: 'category', type: 'string','map':'categoryDTO>description'},
			{name : 'subCat', type : 'string','map':'subCatDTO>description'},
			{name : 'artCode', type : 'string','map' : 'articleMasterDTO>articleCode'},
			{name : 'hsnId', type : 'string','map': 'hsnMasterDTO>hsnDescription'},
			{name : 'skinPurity', type : 'float','map' : 'skinPurity'},
			{name : 'meltingPurity', type : 'float','map': 'meltingPurity'},
			{name : 'costCode', type : 'string','map' : 'costCode'},
			{name : 'metalTypeId', type : 'string','map' :'metalSegmentDTO>description'},
			{name : 'vendorCode', type : 'string','map' :'vendorDTO>vendorCode'},
			{name : 'grossWt', type : 'float','map' : 'grossWeight'},
			{name : 'netWt', type : 'float','map':'netWeight'},
			{name : 'makingSelling', type : 'float','map' : 'sellingMakingCharges'},
			{name : 'wastageSelling', type : 'float','map' :'sellingWastageWt'},
			{name : 'costMcTotalCost', type : 'float','map' :'costMakingCharges'},
			{name : 'costWastageWt', type : 'string','map' : 'costWastageWt'},
			
			{name : 'segId', type : 'int','map' : 'segmentDTO>segmentId'},
			{name : 'segCode', type : 'string','map' :'segmentDTO>code'},
			{name : 'jewId', type : 'int','map' :'jewelTypeDTO>id'},
			{name : 'jewCode', type : 'string','map' : 'jewelTypeDTO>code'},
			{name : 'catId', type : 'int','map' : 'categoryDTO>id'},
			{name : 'catCode', type : 'string','map' :'categoryDTO>code'},
			{name : 'subCatId', type : 'int','map' :'subCatDTO>id'},
			{name : 'subCatCode', type : 'string','map' : 'subCatDTO>code'},
			{name : 'artId', type : 'int','map' :'articleMasterDTO>id'},
			{name : 'artDesc', type : 'string','map' : 'articleMasterDTO>articleDesc'},
			{name : 'hsnDesc', type : 'int','map' :'hsnMasterDTO>id'},
			{name : 'hsnCode', type : 'string','map' : 'hsnMasterDTO>hsnCode'},
			{name : 'metalSegId', type : 'int','map' :'metalSegmentDTO>id'},
			{name : 'metalSegCode', type : 'string','map' : 'metalSegmentDTO>code'},
			{name : 'vendorId', type : 'int','map' :'vendorDTO>id'},
			{name : 'vCode', type : 'string','map' : 'vendorDTO>vendorName'},
			{name : 'pieces', type : 'int','map' :'pieces'},
			{name : 'DisassembleSaleOrtoDCId', type : 'int','map' :'DisassembleSaleOrtoDCId'},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAssembleHeader").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		theme: 'energyblue',
		autoheight : true,
		altRows : true,
		columnsresize : true,
		
		columns : [
			{ text : 'Ref No', datafield : 'refNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Seg', datafield : 'segment', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Jewel Type', datafield : 'jewelType', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Category', datafield : 'category', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat', datafield : 'subCat', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Artical Code', datafield : 'artCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'HSN Id', datafield : 'hsnId', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Skin Purity', datafield : 'skinPurity', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Melting Purity', datafield : 'meltingPurity', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cost Code', datafield : 'costCode', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Type Id', datafield : 'metalTypeId', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Code', datafield : 'vendorCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gross Wt.', datafield : 'grossWt', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Net Wt.', datafield : 'netWt', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false ,cellsformat : 'd3'},
			{ text : 'Making Selling', datafield : 'makingSelling', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Wastage Selling', datafield : 'wastageSelling', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cost MC Total Cost', datafield : 'costMcTotalCost', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cost Wastage Wt.', datafield : 'costWastageWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			
			{text : '',datafield : 'segId', hidden: true}, 
			{text : '',datafield : 'segCode',  hidden: true},
			{text : '',datafield : 'jewId', hidden: true}, 
			{text : '',datafield : 'jewCode',hidden : true},
			{text : '',datafield : 'catId',hidden : true},
			{text : '',datafield : 'catCode',hidden : true},
			{text : '',datafield : 'subCatId',hidden : true},
			{text : '',datafield : 'subCatCode',hidden : true},
			{text : '',datafield : 'artId',hidden : true},
			{text : '',datafield : 'artDesc',hidden : true},
			{text : '',datafield : 'hsnDesc',hidden : true},
			
			{text : '',datafield : 'hsnCode',hidden : true},
			{text : '',datafield : 'metalSegId',hidden : true},
			{text : '',datafield : 'metalSegCode',hidden : true},
			{text : '',datafield : 'vendorId',hidden : true},
			{text : '',datafield : 'vCode',hidden : true},
			{text : '',datafield : 'pieces',hidden : true},
			{text : '',datafield : 'DisassembleSaleOrtoDCId',hidden : true},
			{text : '',datafield : 'serialNumber',hidden : true},
		]
	});
}


//Assemble Stone Grid 
var assembleStoneDetGrid = function(data1){
	var source = {
        localdata: data1,
        datatype: "json",
		datafields : [ 
			{name : 'refNo', type : 'int','map' : 'id'}, 
			{name : 'stoneSlNo', type : 'int','map' : 'stoneSrlNo'},
			{name: 'suppBy', type: 'string','map':'suppliedBy'},
			{name: 'subCatDesc', type: 'string','map':'stoneSubCatDTO>description'},
			{name : 'stSseg', type : 'string','map':'stoneSegmentDTO>description'},
			{name : 'cutGrade', type : 'string','map' : 'cutGrade'},
			{name : 'color', type : 'string','map': 'color'},
			{name : 'clarity', type : 'string','map' : 'clarity'},
			{name : 'wtRange', type : 'string','map': 'weightCostRange'},
			{name : 'uom', type : 'string','map' : 'uom'},
			{name : 'stonePcs', type : 'int','map' :'pieces'},
			{name : 'stoneWt', type : 'float','map' :'stoneWt'},
			{name : 'sellingRate', type : 'float','map' : 'stoneSellingRate'},
			{name : 'sellingAmt', type : 'float','map':'stoneSellingAmount'},
			{name : 'costRate', type : 'float','map' : 'stoneCostRate'},
			{name : 'costAmt', type : 'float','map' :'stoneCostAmount'},
			
			
			{name : 'stoneCatId', type : 'int','map': 'stoneCategoryDTO>id'},
			{name : 'stoneCatDesc', type : 'float','map' : 'stoneCategoryDTO>description'},
			{name : 'stoneCatCode', type : 'float','map': 'stoneCategoryDTO>code'},
			{name : 'stoneSubCatId', type : 'float','map' : 'stoneSubCatDTO>id'},
			{name : 'stoneSubCatCode', type : 'float','map' :'stoneSubCatDTO>code'},
			
			{name : 'stoneSegmentId', type : 'float','map' : 'stoneSegmentDTO>segmentId'},
			{name : 'stoneSegId', type : 'float','map' :'stoneSegmentDTO>id'},
			{name : 'stoneSegCode', type : 'float','map' : 'stoneSegmentDTO>code'},
			{name : 'actualColor', type : 'float','map' : 'actualColor'},
			{name : 'stoneCode', type : 'float','map' : 'stoneCode'},
			{name : 'disassembleStoneId', type : 'float','map' : 'disassembleStoneId'},
			{name : 'detSrlNo', type : 'int'}, 

		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStoneDetails").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		
		columns : [
			{ text : 'Ref No', datafield : 'refNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Sl No', datafield : 'stoneSlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Seg', datafield : 'stSseg', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cut Grade', datafield : 'cutGrade', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Color', datafield : 'color', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Clarity', datafield : 'clarity', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Wt Range', datafield : 'wtRange', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'uom', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Pcs', datafield : 'stonePcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Wt.', datafield : 'stoneWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Selling Rate', datafield : 'sellingRate', width : '5.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Selling Amt', datafield : 'sellingAmt', width : '5.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
			{ text : 'Cost Rate', datafield : 'costRate', width : '5.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cost Amt', datafield : 'costAmt', width : '5.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			
			{text : '',datafield : 'detSrlNo', hidden: true}, 
			{text : '',datafield : 'stoneCatId', hidden: true}, 
			{text : '',datafield : 'stoneCatDesc',  hidden: true},
			{text : '',datafield : 'stoneCatCode', hidden: true}, 
			{text : '',datafield : 'stoneSubCatId',hidden : true},
			{text : '',datafield : 'stoneSubCatCode',hidden : true},
			{text : '',datafield : 'stoneSegmentId',hidden : true},
			{text : '',datafield : 'stoneSegId',hidden : true},
			{text : '',datafield : 'stoneSegCode',hidden : true},
			{text : '',datafield : 'actualColor',hidden : true},
			{text : '',datafield : 'stoneCode',hidden : true},
			{text : '',datafield : 'disassembleStoneId',hidden : true},
		]
	});
}

//Assemble Accessory Grid 
var assembleAccDetGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{name : 'refNo', type : 'int','map' : 'id'}, 
			{name : 'accSlNo', type : 'int','map' : 'accSrlNo'},
			{name: 'suppBy', type: 'string','map':'suppliedBy'},
			{name: 'cat', type: 'string','map':'categoryDTO>description'},
			{name : 'subCatDesc', type : 'string','map':'subCategoryDTO>description'},
			{name : 'accWt', type : 'float','map' : 'accWt'},
			{name : 'accPcs', type : 'int','map': 'accPieces'},
			{name : 'accRate', type : 'float','map' : 'accSellingRate'},
			{name : 'accSellingAmt', type : 'float','map': 'accSellingAmount'},
			{name : 'costRate', type : 'float','map' : 'accCostRate'},
			{name : 'costAmt', type : 'float','map' :'accCostAmount'},
			
			{name : 'disassembleAccId', type : 'int','map' : 'disassembleAccId'},
			{name : 'catId', type : 'int','map': 'categoryDTO>id'},
			{name : 'catCode', type : 'string','map' : 'categoryDTO>code'},
			{name : 'subCatId', type : 'int','map' :'subCategoryDTO>id'},
			{name : 'subCatCode', type : 'int','map' :'subCategoryDTO>code'},
			{name : 'accUom', type : 'int','map' :'accUom'},
			{name : 'detSrlNo', type : 'int'},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAccDetails").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		columns : [
			{ text : 'Ref No', datafield : 'refNo', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Sl No', datafield : 'accSlNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cat', datafield : 'cat', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '18%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Wt', datafield : 'accWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Acc Pcs', datafield : 'accPcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Rate', datafield : 'accRate', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2',},
			{ text : 'Acc Selling Amt', datafield : 'accSellingAmt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Cost Rate', datafield : 'costRate', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Cost Amt', datafield : 'costAmt', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2',},
			
			{text : '',datafield : 'detSrlNo', hidden: true}, 
			{text : '',datafield : 'disassembleAccId',hidden : true},
			{text : '',datafield : 'catId',hidden : true},
			{text : '',datafield : 'catCode',hidden : true},
			{text : '',datafield : 'subCatId',hidden : true},
			{text : '',datafield : 'subCatCode',hidden : true},
			{text : '',datafield : 'accUom',hidden : true},
		]
	});
}

//########### Request Format For Create ##################
// Accessory
var getValidateAccDetails = function(refNum,srlNum){
	console.log(refNum + " " + srlNum );
	var accDetC = $("#jqxgridAccDetails").jqxGrid('getrows');
	console.log(accDetC);
	var accValidateArry = [];
		for(var i=0;i<accDetC.length;i++){
			var accData = {
					"id": accDetC[i].refNo,
			        "disassembleAccId": accDetC[i].disassembleAccId,
			        "accSrlNo": accDetC[i].accSlNo,
			        "suppliedBy": accDetC[i].suppBy,
			        "accWt": accDetC[i].accWt,
			        "accPieces": accDetC[i].accPcs,
			        "accUom":accDetC[i].accUom,
			        "categoryDTO": {
			          "id": accDetC[i].catId,
			          "description": accDetC[i].cat,
			          "code": accDetC[i].catCode
			        },
			        "subCategoryDTO": {
			          "id": accDetC[i].subCatId,
			          "code": accDetC[i].subCatCode,
			          "description":accDetC[i].subCatDesc
			        },
			        "accSellingRate": accDetC[i].accRate,
			        "accSellingAmount": accDetC[i].accSellingAmt,
			        "accCostRate": accDetC[i].costRate,
			        "accCostAmount": accDetC[i].costAmt,
			        "assembleDisassembleDetailId": accDetC[i].refNo,
			        "detSrlNo": accDetC[i].detSrlNo
			}
			 if (refNum == accDetC[i].refNo && accDetC[i].detSrlNo == srlNum ){
				 accValidateArry.push(accData); 
			 }
		}
		return accValidateArry;
}

//Stones
var getValidateStoneDetails = function(refNum,srlNum){
	console.log(refNum + " " +srlNum);
	var stoneDetC = $("#jqxgridStoneDetails").jqxGrid('getrows');
	var stoneValidateArry = [];
	console.log(stoneDetC);
	 for(var i=0;i<stoneDetC.length;i++){
		 var stoneData = {
			"id": stoneDetC[i].refNo,
			"disassembleStoneId": stoneDetC[i].disassembleStoneId,
			 "stoneSrlNo":stoneDetC[i].stoneSlNo,
		      "suppliedBy":stoneDetC[i].suppBy,
		        "stoneCategoryDTO": {
		          "id": stoneDetC[i].stoneCatId,
		          "description": stoneDetC[i].stoneCatDesc,
		          "code": stoneDetC[i].stoneCatCode,
		        },
		        "stoneSubCatDTO": {
		          "id": stoneDetC[i].stoneSubCatId,
		          "code": stoneDetC[i].stoneSubCatCode,
		          "description": stoneDetC[i].subCatDesc
		        },
		        "stoneSegmentDTO": {
		          "id": stoneDetC[i].stoneSegId,
		          "segmentId": stoneDetC[i].stoneSegmentId,
		          "description":stoneDetC[i].stSseg,
		          "code":  stoneDetC[i].stoneSegCode
		        },
		        "cutGrade":stoneDetC[i].cutGrade, 
		        "clarity": stoneDetC[i].clarity,
		        "color": stoneDetC[i].color,
		        "actualColor": stoneDetC[i].actualColor,
		        "weightCostRange": stoneDetC[i].wtRange,
		        "uom": stoneDetC[i].uom,
		        "stoneWt": stoneDetC[i].stoneWt,
		        "pieces":stoneDetC[i].stonePcs,
		        "stoneSellingRate":stoneDetC[i].sellingRate,
		        "stoneSellingAmount": stoneDetC[i].sellingAmt,
		        "stoneCostRate": stoneDetC[i].costRate,
		        "stoneCostAmount": stoneDetC[i].costAmt,
		        "assembleDisassembleDetailId": stoneDetC[i].refNo,
		        "stoneCode" : stoneDetC[i].stoneCode,
		        "detSrlNo": stoneDetC[i].detSrlNo
		 }
		 if (refNum == stoneDetC[i].refNo && stoneDetC[i].detSrlNo == srlNum ){
			 stoneValidateArry.push(stoneData); 
		 }
	 }
	
	return stoneValidateArry;
}

// Header Details
var getValidateDetails = function(){
	var headerDet = $("#jqxgridAssembleHeader").jqxGrid('getrows');
	var headerValidateArry = []
	console.log(headerDet);
	for(var i=0 ; i < headerDet.length;i++){
		var headerDetailsC = {
				  "id" : headerDet[i].refNo,
			      "segmentDTO":{
			    	  "id" : headerDet[i].segId,
			    	  "segmentId" : headerDet[i].segId,
			    	  "description": headerDet[i].segment,
			          "code": headerDet[i].segCode
			      },
			      "jewelTypeDTO": {
			        "id": headerDet[i].jewId,
			        "code": headerDet[i].jewCode,
			        "description": headerDet[i].jewelType
			      },
			      "categoryDTO": {
			        "id": headerDet[i].catId,
			        "code": headerDet[i].catCode,
			        "description": headerDet[i].category
			      },
			      "subCatDTO": {
			        "id": headerDet[i].subCatId,
			        "code": headerDet[i].subCatCode,
			        "description": headerDet[i].subCat
			        
			      },
			      "articleMasterDTO": {
			          "id": headerDet[i].artId,
			          "articleCode":  headerDet[i].artCode,
			          "articleDesc": headerDet[i].artDesc
			        },
			      "hsnMasterDTO": { 
			    	  "id": headerDet[i].hsnDesc,
			          "hsnCode":  headerDet[i].hsnCode,
			          "hsnDescription": headerDet[i].hsnId 
			      },
			      "skinPurity" :headerDet[i].skinPurity,
			      "meltingPurity":headerDet[i].meltingPurity,
			      "costCode": headerDet[i].costCode,
			      "metalSegmentDTO": {
			          "id": headerDet[i].metalSegId,
			          "segmentId": headerDet[i].metalSegId,
			          "description": headerDet[i].metalTypeId,
			          "code": headerDet[i].metalSegCode
			        },
			        "vendorDTO": {
			            "id": headerDet[i].vendorId,
			            "vendorCode": headerDet[i].vendorCode,
			            "vendorName": headerDet[i].vCode
			          },
			          "grossWeight":headerDet[i].grossWt,
			          "netWeight": headerDet[i].netWt,
			          "sellingMakingCharges": headerDet[i].makingSelling,
			          "sellingWastageWt":headerDet[i].wastageSelling,
			          "costMakingCharges": headerDet[i].costMcTotalCost,
			          "costWastageWt": headerDet[i].costWastageWt,
			          "DisassembleSaleOrtoDCId": headerDet[i].refNo,
			          "pieces": headerDet[i].pieces,
			          "assembleDisassembleStoneDtoList" : getValidateStoneDetails(headerDet[i].refNo,headerDet[i].serialNumber),
			          "assembleDisassembleAccDtoList" : getValidateAccDetails(headerDet[i].refNo,headerDet[i].serialNumber)
			    }
		headerValidateArry.push(headerDetailsC);
	}
	return headerValidateArry;
}


$("#toggleCToSaleS").on('click', function(){
	$("#panelCToSaleS").slideToggle();
});

$("#toggleCToSaleV").on('click',function(){
	$("#panelCToSaleV").slideToggle();
});


$("#disAssembleIdC").on('change',function(){
	var dId = $("#disAssembleIdC").val();
	var assembleDetails = $('#jqxgridAssembleHeader').jqxGrid('getrows');
		if(typeof assembleDetails != "undefined"){
			for(var i=0;i<assembleDetails.length;i++){
				if(assembleDetails[i].refNo == dId){
					$("#disAssembleIdC").val("");
					$.growl.error({
						message : "Disassemble Id " + dId + "  is Already Added !!",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}
		}
	});

/*$("#purchaseBillNoC").on('change',function(){
	var pbId = $("#purchaseBillNoC").val();
	var assemblePbDetails = $('#jqxgridPBAssembleHeader').jqxGrid('getrows');
		if(typeof assemblePbDetails != "undefined"){
			for(var i=0;i<assemblePbDetails.length;i++){
				if(assemblePbDetails[i].pbNo == pbId){
					$("#purchaseBillNoC").val("");
					$.growl.error({
						message : "Purchase Bill No " + pbId + " is Already Added !!",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}
		}
	});*/

var disAssFlag = true;
var srFlag = true;
var pbFlag = true;
$("#validateGrids").hide();
var assembleDetArry = [],stoneArray = [],accArray = [];
var splitPBDetArr = [], pbStoneArray = [], pbAccArray = [];
var saleBillDetArr = [],sbStoneArray = [],sbAccArray = [];
$("#addAssembleItems").on('click',function(){
	if($("#assembleCreateBy").val() == "disassembleId"){
		var disId = $("#srlNo").val();
		var disAssembleIdC = $("#disAssembleIdC").val();
		if(disId == ""){
			$.growl.error({
				message : "Please Enter Disassemble Srl Id !!!",
				duration :  1000,
				title : 'Error'
			});
			return false;
		}
		else{
			
			var rows = $("#jqxgridAssembleHeader").jqxGrid('getrows');
			var newArray = [];
			$.getJSON('/OrderExecution/api/v1/getDisassembleToDCDetailsForAssembling?disassembleToDCId='+disId,function(data)  {
				if(data.resCode =="1"){
					var response = data.payload.disassembleToDCDetails;
						if(typeof rows != "undefined" && rows.length > 0){
						console.log(disAssembleIdC);
							$.each(rows, function(k,v){								
								newArray.push(v.refNo);								
							});
						}				
						
						if ($.inArray(response.DisassembleSaleOrtoDCId, newArray) > -1){
							$.growl.error({	message : disAssembleIdC + " already exists!",duration :  1000,title : 'Error'});
							disAssFlag = false;
						}else{
							disAssFlag = true;
						}
						
						if(disAssFlag){
							assembleDetArry.push(response);
							
							
							var stoneDetArry =  response.assembleDisassembleStoneDtoList;
							for(var i=0;i<stoneDetArry.length;i++){
								stoneArray.push(stoneDetArry[i]);
							}
							
							var accDetArray = response.assembleDisassembleAccDtoList;
							for(var i=0;i<accDetArray.length;i++){
								accArray.push(accDetArray[i]);
							}
							
							$("#panelCToSaleS").slideDown();
							$("#createGrids").show();
							assembleDetGrid(assembleDetArry);
							assembleStoneDetGrid(stoneArray);
							assembleAccDetGrid(accArray);
							
							$("#disAssembleIdC").val("");
							$("#srlNo").val("");
						}
					}
				else{
					$.growl.error({
						message : data.mesgStr,
						duration :  10000,
						title : 'Error'
					})
					return false;
				}
			});
		}
	}
	else if($("#assembleCreateBy").val() == "purchaseBillSplit"){
		var pbNo = $("#srlNo").val();
	
		if(pbNo == ""){
			$.growl.error({
				message : "Please Enter Purchase Bill Srl No !!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
		
		
		else{
			var pbDet = $("#jqxgridPBAssembleHeader").jqxGrid('getrows');
			
			
			$.getJSON('/OrderExecution/api/v1/getSplitPBDetailsForAssembling?splitPBId='+pbNo,function(data){
				if(data.resCode =="1"){
					if( $("#srlNo").val() != "" && $("#purchaseBillNoC").val() != ""){
						$.each(pbDet,function(k,v){
							if(v.pbNo == $("#purchaseBillNoC").val() && v.slNo == $("#srlNo option:selected").text() ){
								pbFlag = false;
								$.growl.error({
									message : "PB No " + v.pbNo + " with Sl No " + v.slNo + " already added !!!",
									duration : 10000,
									title : 'Error'
								});
								return false;
							}else{
								pbFlag = true;
							}
						});
					}
					
					if(pbFlag){
						var splitPBDet = data.payload.splitPBdetails;
						splitPBDetArr.push(splitPBDet);
						
						var pbStoneDetArry =  splitPBDet.pbStoneList;
						for(var i=0;i<pbStoneDetArry.length;i++){
							pbStoneArray.push(pbStoneDetArry[i]);
						}
						
						var pbAccDetArray = splitPBDet.pbAccList;
						for(var i=0;i<pbAccDetArray.length;i++){
							pbAccArray.push(pbAccDetArray[i]);
						}
						
						$("#pbOrgDetailsC").slideDown();
						$("#pbCreateGrids").show();
						$("#purchaseBillNoC").val("");
						$("#srlNo").val("");
						
						assemblePBHeaderDetGrid(splitPBDetArr);
						assemblePBStoneDetGrid(pbStoneArray);
						assemblePBAccDetGrid(pbAccArray);
					}
			    }else{
					$.growl.error({
						message : data.mesgStr,
						duration :  10000,
						title : 'Error'
					})
					return false;
				}
			});
		}
	}else if($("#assembleCreateBy").val() == "salesReturn"){
		var srlNo = $("#srlNo option:selected").text()
		if(srlNo == ""){
			$.growl.error({
				message : "Please Enter Sales Return Srl No !!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
		
		$.getJSON('/OrderExecution/api/v1/getSaleBillReturnDetailsForAssembling?saleBillReturnDetailId='+$("#srlNo").val(),function(data){
			var salesRetDet = $('#jqxgridSBAssembleHeader').jqxGrid('getrows');

			if(data.resCode =="1"){
				if($("#srlNo").val() != "" && $("#salesReturnNoC").val() != ""){
					$.each(salesRetDet,function(k,v){
						console.log(v);
						if(v.sbRetHeaderId == $("#salesReturnNoC").val() && v.slNo == srlNo){
							srFlag = false;
							$("#salesReturnNoC").val("");
							$("#srlNo").val("");
							$.growl.error({
							 	message : "Sales Return No " + v.sbNo + " with Sl No " + v.slNo + " Already Added !! ",
							 	duration :1000,
							 	title :'Error'
							});
							return false;
						}else{
							srFlag = true;
						}
					});
				}
				
				if(srFlag){
					var saleBillDet = data.payload.saleBillReturnDetails;
						saleBillDetArr.push(saleBillDet);
						
						var sbStoneDetArry =  saleBillDet.sbRetStones;
						for(var i=0;i<sbStoneDetArry.length;i++){
							sbStoneArray.push(sbStoneDetArry[i]);
						}
						
						var sbAccDetArray = saleBillDet.sbRetAccessories;
						for(var i=0;i<sbAccDetArray.length;i++){
							sbAccArray.push(sbAccDetArray[i]);
						}
						
						$("#sbOrgDetailsC").slideDown();
						$("#sbCreateGrids").show();
						$("#salesReturnNoC").val("");
						$("#srlNo").val("");
						
						assembleSbDetGrid(saleBillDetArr);
						assembleSbStoneDetGrid(sbStoneArray);
						assembleSbAccDetGrid(sbAccArray);
				}
		
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration :  10000,
					title : 'Error'
				})
				return false;
			}
		});
	}
});
emptyArr=[];
emptyArr1=[];
//###################################  Validate Grids Started ######################################
// Validate Header Details
var res,jwRes,catRes,subCatres,resultH,vendorList;
var validateAssembleDetGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{name : 'slNo', type : 'int'},
			{name : 'refNo', type : 'int','map' : 'DisassembleSaleOrtoDCId'}, 
			{name : 'segment', type : 'string','map' : 'segmentDTO>description'},
			{name: 'jewelType', type: 'string','map':'jewelTypeDTO>description'},
			{name: 'category', type: 'string','map':'categoryDTO>description'},
			{name : 'subCat', type : 'string','map':'subCatDTO>description'},
			{name : 'artCode', type : 'string','map' : 'articleMasterDTO>articleCode'},
			{name : 'hsnId', type : 'string','map': 'hsnMasterDTO>hsnDescription'},
			{name : 'skinPurity', type : 'float','map' : 'skinPurity'},
			{name : 'meltingPurity', type : 'float','map': 'meltingPurity'},
			{name : 'costCode', type : 'string','map' : 'costCode'},
			{name : 'metalTypeId', type : 'string','map' :'metalSegmentDTO>description'},
			{name : 'vendorCode', type : 'string','map' :'vendorDTO>vendorCode'},
			{name : 'grossWt', type : 'float','map' : 'grossWeight'},
			{name : 'netWt', type : 'float','map':'netWeight'},
			{name : 'makingSelling', type : 'float','map' : 'sellingMakingCharges'},
			{name : 'wastageSelling', type : 'float','map' :'sellingWastageWt'},
			{name : 'costMcTotalCost', type : 'float','map' :'costMakingCharges'},
			{name : 'costWastageWt', type : 'string','map' : 'costWastageWt'},
			
			{name : 'segmentCode', type : 'string'},
			{name : 'jewelCode', type : 'string'},
			{name : 'catCode', type : 'string'},
			{name : 'subCatCode', type : 'string'},
			{name : 'hsnCode', type : 'string'},
			{name : 'articleId', type : 'int'},
			{name : 'articleDescp', type : 'string'},
			{name : 'mSegCode', type : 'string','map' : 'metalSegmentDTO>code'},
			{name : 'mSegId', type : 'int','map' : 'metalSegmentDTO>segmentId'},
			{name : 'vendCode', type : 'string'},
			{name : 'pieces', type : 'int'}
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAssembleHeaderV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		theme: 'energyblue',
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		
		columns : [
			{ text : '', datafield : 'slNo', width : '2%', cellsalign : 'center', align : 'center', editable : false},
			{ text : 'Seg', datafield : 'segment', width : '6.5%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'segmentN',
				createeditor: function (row, cellvalue, editor) { 
					editor.on('click', function(event){
					var segmentId = $('#jqxgridAssembleHeader').jqxGrid('getcellvalue',row,'segId');
					var segmentCode = $('#jqxgridAssembleHeader').jqxGrid('getcellvalue',row,'segCode');
					var segment = $('#jqxgridAssembleHeader').jqxGrid('getcellvalue',row,'segment');
					fieldFilters = {
						  "fieldFilters": {
						    "type": "segment",
						    "orgSegment": {
						      "id": segmentId,
						      "segmentId": segmentId,
						      "description":segment,
						      "code": segmentCode
						    }
						  }
						}
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
							 res = data.payload.allSegments;
							editor.jqxDropDownList({source : res,displayMember : 'description',valueMember : 'id'});
						});
					});
			    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
		      		 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'jewTypeN', null);  
			    	 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'catN', null); 
			    	 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'subCatN', null); 
			    	 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'artCode', null);
			    	 
			    	 $.each(res, function(key, val) {
						 if( val.description  == newvalue.label){	
							 $('#jqxgridAssembleHeaderV').jqxGrid ('setcellvalue', row,'segmentCode',val.code);
						}
					})
				}
			},
			{ text : 'Jewel Type', datafield : 'jewelType', width : '7.5%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'jewTypeN',
				createeditor: function (row, cellvalue, editor) {
				 editor.on('click', function(event){
					var segmentId = $('#jqxgridAssembleHeaderV').jqxGrid('getcellvalue',row,'segment');
					fieldFilters = {
						  "fieldFilters": {
						    "type": "jewelType",
						    "segment": {
						      "id": segmentId,
						    }
						  }
						}
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
							 jwRes = data.payload.jeweltypes;
							editor.jqxDropDownList({source : jwRes,displayMember : 'description',valueMember : 'id'});
						});
				 	});
			    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
			    	 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'catN', null); 
			    	 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'subCatN', null); 
			    	 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'artCode', null); 
			    	 
			    	 $.each(jwRes, function(key, val) {
						 if( val.description  == newvalue.label){	
							 $('#jqxgridAssembleHeaderV').jqxGrid ('setcellvalue', row,'jewelCode',val.code);
						}
					})
				  }
			},
			{ text : 'Category', datafield : 'category', width : '9%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'catN',
				createeditor: function (row, cellvalue, editor) { 
					 editor.on('click', function(event){
					var segmentId = $('#jqxgridAssembleHeaderV').jqxGrid('getcellvalue',row,'segment');
					var jTypeId = $('#jqxgridAssembleHeaderV').jqxGrid('getcellvalue',row,'jewelType');
					
					fieldFilters = {
						  "fieldFilters": {
						    "type": "segCategory",
						    "segment": {
						      "id": segmentId,
						    },
						    "jewel": {
							      "id": jTypeId,
							    }
						  }
						}
					emptyArr = [];
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
							 catRes = data.payload.maincats;
								$.each(catRes, function(k, v){
									emptyArr.push({
										"id" : parseInt(v.id),
										"description" : v.description
									});
								});
							editor.jqxDropDownList({source : emptyArr,displayMember : 'description',valueMember : 'id'});
						});
					 });
			    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
			    	 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'subCatN', null); 
			    	 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'artCode', null); 
			    	 
			    	 $.each(emptyArr, function(key, val) {
						 if( val.description  == newvalue.label){	
							 $('#jqxgridAssembleHeaderV').jqxGrid ('setcellvalue', row,'catCode',val.name);
						}
					})
				 }
			},
			{ text : 'Sub Cat', datafield : 'subCat', width : '10%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'subCatN',
				createeditor: function (row, cellvalue, editor) { 
					editor.on('click', function(event){
					var segmentId = $('#jqxgridAssembleHeaderV').jqxGrid('getcellvalue',row,'segment');
					var categoryId = $('#jqxgridAssembleHeaderV').jqxGrid('getcellvalue',row,'category');
					var jwlType = $('#jqxgridAssembleHeaderV').jqxGrid('getcellvalue',row,'jewelType');
					fieldFilters = {
						  "fieldFilters": {
						    "type": "subCat",
						    "segment": {
						      "id": segmentId,
						    },
						    "category": {
							      "id": categoryId,
							    },
							    "jewel":{"id":jwlType}
						  }
						}
					emptyArr1 = [];
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
							 subCatres = data.payload.subCats;
								$.each(subCatres, function(k, v){
									emptyArr1.push({
										"id" : parseInt(v.id),
										"description" : v.description
									});
								});
							editor.jqxDropDownList({source : emptyArr1,displayMember : 'description',valueMember : 'id'});
						});
					});
			    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
			        $.each(emptyArr1, function(key, val) {
						 if( val.description  == newvalue.label){
							 $('#jqxgridAssembleHeaderV').jqxGrid ('setcellvalue', row,'subCatCode',val.name);
						}
					})
			    	
			    	 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'artCode', null);
			    	 
	      	    	 var segment = $('#jqxgridAssembleHeaderV').jqxGrid('getcellvalue',row,'segment');
	       			 var jwlType = $('#jqxgridAssembleHeaderV').jqxGrid('getcellvalue',row,'jewelType');
	       			 var categoryC = $('#jqxgridAssembleHeaderV').jqxGrid('getcellvalue',row,'category');
     		         fieldFilters = {
							"fieldFilters" : {
					               "type":"articleCode",
					               "subCategory":{ "id":newvalue.value},
					        	   "segment":{"id":segment},
					        	   "category":{"id":categoryC},
					        	   "jewelTypeDTO":{"id":jwlType}
					           }
					      }
     		   	  postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters), function(data) {
     		   	        $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'artCode',null); 
					    var res = data.payload.article;
					    $.each(res,function(k,v){
					    	 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'artCode', v.name);  
					    	 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'articleId', v.id);  
					    	 $("#jqxgridAssembleHeaderV").jqxGrid("setcellvalue", row, 'articleDescp', v.description);
					    })
      			    });
     		         
	      	     }
			},
			{ text : 'Artical Code', datafield : 'artCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},//auto populate
			{ text : 'HSN Id', datafield : 'hsnId', width : '6%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'hsnN',
				createeditor: function (row, cellvalue, editor) { 
					editor.on('click', function(event){
						var rows = $('#jqxgridAssembleHeader').jqxGrid('getrows');
						var hsn = [];
							for(var i=0;i<rows.length;i++){
								var hsnCodeC = {
									"id" : rows[i].hsnDesc,
									"name" : rows[i].hsnCode + "-" + rows[i].hsnId,
									"description" :  rows[i].hsnCode
								}
								if(rows[i].hsnDesc != null){
									hsn.push(hsnCodeC);
								}
							}
							 resultH = [];
							$.each(hsn, function (i, e) {
							    var matchingItems = $.grep(resultH, function (item) {
							       return item.id === e.id && item.name === e.name;
							    });
							    if (matchingItems.length === 0){
							    	resultH.push(e);
							    }
							});
							editor.jqxDropDownList({source : resultH,displayMember : 'name',valueMember : 'id'});
					});
				},
			  cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
				  $.each(resultH, function(key, val) {
						 if( val.name  == newvalue.label){
							 $('#jqxgridAssembleHeaderV').jqxGrid ('setcellvalue', row,'hsnCode',val.description);
						}
					})
			  }
			},
			{ text : 'Skin Purity', datafield : 'skinPurity', width : '5.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Melting Purity', datafield : 'meltingPurity', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cost Code', datafield : 'costCode', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Type Id', datafield : 'metalTypeId', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Code', datafield : 'vendorCode', width : '6.5%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'vendorCodeN',
				createeditor: function (row, cellvalue, editor) {
					 editor.on('click', function(event){
						 $.getJSON('/OrderExecution/api/v1/getSmallOrderGRLOV?portal=OE', function(data) {
							 vendorList = data.payload.vendorList;
								editor.jqxDropDownList({source : vendorList,displayMember : 'vendorName',valueMember : 'id'});
							});
					 	});
				    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
					  $.each(vendorList, function(key, val) {
							 if( val.vendorName  == newvalue.label){
								 $('#jqxgridAssembleHeaderV').jqxGrid ('setcellvalue', row,'vendCode',val.vendorCode);
							}
						})
				  }
			},
			{ text : 'Gross Wt.', datafield : 'grossWt', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Net Wt.', datafield : 'netWt', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false ,cellsformat : 'd3'},
			{ text : 'Making Selling', datafield : 'makingSelling', width : '4%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Wastage Selling', datafield : 'wastageSelling', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cost MC Total Cost', datafield : 'costMcTotalCost', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cost Wastage Wt.', datafield : 'costWastageWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			
			{text : '',datafield : 'segmentCode',hidden: true}, 
			{text : '',datafield : 'jewelCode',hidden: true}, 
			{text : '',datafield : 'catCode',hidden: true}, 
			{text : '',datafield : 'subCatCode',hidden: true},
			{text : '',datafield : 'articleId',hidden: true}, 
			{text : '',datafield : 'articleDescp',hidden: true},
			{text : '',datafield : 'hsnCode',hidden: true},
			{text : '',datafield : 'mSegCode',hidden: true},
			{text : '',datafield : 'mSegId',hidden: true},
			{text : '',datafield : 'vendCode',hidden: true},
			{text : '',datafield : 'pieces',hidden: true},
		]
	});
}


//Validate Stone Grid 
var validateAssembleStoneDetGrid = function(data1){
	var source = {
        localdata: data1,
        datatype: "json",
		datafields : [ 
			{name : 'refNo', type : 'int','map' : 'assembleDisassembleDetailId'}, 

			{name : 'stoneSlNo', type : 'int','map' : 'stoneSrlNo'},
			{name: 'suppBy', type: 'string','map':'suppliedBy'},
			{name: 'subCatDesc', type: 'string','map':'stoneSubCatDTO>description'},
			{name : 'stSseg', type : 'string','map':'stoneSegmentDTO>description'},
			{name : 'cutGrade', type : 'string','map' : 'cutGrade'},
			{name : 'color', type : 'string','map': 'color'},
			{name : 'clarity', type : 'string','map' : 'clarity'},
			{name : 'wtRange', type : 'string','map': 'weightCostRange'},
			{name : 'uom', type : 'string','map' : 'uom'},
			{name : 'stonePcs', type : 'int','map' :'pieces'},
			{name : 'stoneWt', type : 'float','map' :'stoneWt'},
			{name : 'sellingRate', type : 'float','map' : 'stoneSellingRate'},
			{name : 'sellingAmt', type : 'float','map':'stoneSellingAmount'},
			{name : 'costRate', type : 'float','map' : 'stoneCostRate'},
			{name : 'costAmt', type : 'float','map' :'stoneCostAmount'},
			
			{name : 'subCatId', type : 'int','map' :'stoneSubCatDTO>id'},
			{name : 'subCatCode', type : 'string','map' :'stoneSubCatDTO>code'},
			{name : 'catId', type : 'int','map' : 'stoneCategoryDTO>id'},
			{name : 'catCode', type : 'string','map':'stoneCategoryDTO>code'},
			{name : 'segmId', type : 'int','map' : 'stoneSegmentDTO>id'},
			{name : 'segmCode', type : 'string','map' :'stoneSegmentDTO>code'},
			{name : 'actCol', type : 'string','map' :'actualColor'},
			{name : 'disassembleStoneId',type : 'int'},
			{name:'stoneCode',type:'string'}
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStoneDetailsV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		
		columns : [
			{ text : 'Ref No', datafield : 'refNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Sl No', datafield : 'stoneSlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '12%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Seg', datafield : 'stSseg', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cut Grade', datafield : 'cutGrade', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Color', datafield : 'color', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Clarity', datafield : 'clarity', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Wt Range', datafield : 'wtRange', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'uom', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Pcs', datafield : 'stonePcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Wt.', datafield : 'stoneWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Selling Rate', datafield : 'sellingRate', width : '5.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Selling Amt', datafield : 'sellingAmt', width : '5.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
			{ text : 'Cost Rate', datafield : 'costRate', width : '5.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Cost Amt', datafield : 'costAmt', width : '5.5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			
			{text : '',datafield : 'subCatId',hidden: true}, 
			{text : '',datafield : 'subCatCode',hidden: true}, 
			{text : '',datafield : 'catId',hidden: true}, 
			{text : '',datafield : 'catCode',hidden: true},
			{text : '',datafield : 'segmId',hidden: true}, 
			{text : '',datafield : 'segmCode',hidden: true},
			{text : '',datafield : 'actCol',hidden: true},
			{text : '',datafield : 'disassembleStoneId',hidden : true}
		
		]
	});
}


//Validate Accessory Grid 
var validateAssembleAccDetGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{name : 'refNo', type : 'int','map' : 'assembleDisassembleDetailId'}, 
			{name : 'accSlNo', type : 'int','map' : 'accSrlNo'},
			{name: 'suppBy', type: 'string','map':'suppliedBy'},
			{name: 'cat', type: 'string','map':'categoryDTO>description'},
			{name : 'subCatDesc', type : 'string','map':'subCategoryDTO>description'},
			{name : 'accWt', type : 'float','map' : 'accWt'},
			{name : 'accPcs', type : 'int','map': 'accPieces'},
			{name : 'accRate', type : 'float','map' : 'accSellingRate'},
			{name : 'accSellingAmt', type : 'float','map': 'accSellingAmount'},
			{name : 'costRate', type : 'float','map' : 'accCostRate'},
			{name : 'costAmt', type : 'float','map' :'accCostAmount'},
			
			{name : 'disassembleAccId', type : 'int'},
			{name : 'catId', type : 'int'},
			{name : 'subCatId', type : 'int'},
			{name : 'accUom', type : 'string'},
			{name : 'catCode', type : 'string'},
			{name : 'subCatCode', type : 'string'},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAccDetailsV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		columns : [
			{ text : 'Ref No', datafield : 'refNo', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Sl No', datafield : 'accSlNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cat', datafield : 'cat', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '18%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Wt', datafield : 'accWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Acc Pcs', datafield : 'accPcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Rate', datafield : 'accRate', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2',},
			{ text : 'Acc Selling Amt', datafield : 'accSellingAmt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Cost Rate', datafield : 'costRate', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'Cost Amt', datafield : 'costAmt', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2',},
			
			{text : '',datafield : 'disassembleAccId',hidden: true},
			{text : '',datafield : 'catId',hidden: true},
			{text : '',datafield : 'catCode',hidden: true},
			{text : '',datafield : 'subCatId',hidden: true},
			{text : '',datafield : 'subCatCode',hidden: true},
			{text : '',datafield : 'accUom',hidden: true},
		]
	});
}


$("#validateAssembleItems").on('click',function(){
	var headerDetailsC = getValidateDetails();
	if(headerDetailsC.length == 1){
		$.growl.error({
			message : "Please Add Another Line Item to Create Assemble !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	else{
		$("#panelCToSaleV").slideDown();
		$("#validateGrids").show();
		if(typeof headerDetailsC != "undefined" || headerDetailsC != ""){
			postJSON('/OrderExecution/api/v1/validateAllDisassembleToDCDetailsForAssembling',JSON.stringify(headerDetailsC),function(data) {
				if(data.resCode == "1"){
					var result = data.payload.finalAssembledFG;
					var assembleValidateArry = [];
					assembleValidateArry.push(result);
					validateAssembleDetGrid(assembleValidateArry);
					
					
					var stoneValidateDetArry = [];
					var stoneDetArryV =  result.assembleDisassembleStoneDtoList;
					for(var i=0;i<stoneDetArryV.length;i++){
						stoneValidateDetArry.push(stoneDetArryV[i]);
					}
					validateAssembleStoneDetGrid(stoneValidateDetArry);
					
					
					var accValidateDetArry = [];
					var accDetArryV =  result.assembleDisassembleAccDtoList;
					for(var i=0;i<accDetArryV.length;i++){
						accValidateDetArry.push(accDetArryV[i]);
					}
					validateAssembleAccDetGrid(accValidateDetArry);
				}else{
					$("#panelCToSaleV").slideUp();
					$("#validateGrids").hide();
					$.growl.error({
						message : data.mesgStr,
						duration: 10000,
						title : 'Error'
					});
					return false;
				}
			});
		}
	}
});

//##################### Request Format for create ######################################
var getHeaderDetForCreate = function(){
	var headerDataC =  $('#jqxgridAssembleHeaderV').jqxGrid('getrows');
	var detailIds =  $('#jqxgridAssembleHeader').jqxGrid('getrows');
	console.log(detailIds);
		var resultC = [];
		
		var disAssemNumArr = [];
	
		$.each(detailIds,function(k,v){
			disAssemNumArr.push(v.DisassembleSaleOrtoDCId);
		});
		console.log(disAssemNumArr);
		var disAssemNumArry = disAssemNumArr.join(",");
		for(var i=0;i<headerDataC.length;i++){
			var validatedDataC = {
					  "id" : null,
				      "segmentDTO":{
				    	  "id" : headerDataC[i].segment,
				    	  "segmentId" : headerDataC[i].segment,
				    	  "description": headerDataC[i].segmentN,
				          "code": headerDataC[i].segmentCode
				      },
				      "assembleDocTypeIds" : disAssemNumArry,
				      "jewelTypeDTO": {
				        "id": headerDataC[i].jewelType,
				        "code": headerDataC[i].jewelCode,
				        "description": headerDataC[i].jewTypeN
				      },
				      "categoryDTO": {
				        "id": headerDataC[i].category,
				        "code": headerDataC[i].catCode,
				        "description": headerDataC[i].catN
				      },
				      "subCatDTO": {
				        "id": headerDataC[i].subCat,
				        "code": headerDataC[i].subCatCode,
				        "description": headerDataC[i].subCatN
				      },
				      "articleMasterDTO": {
				          "id": headerDataC[i].articleId,
				          "articleCode":  headerDataC[i].artCode,
				          "articleDesc": headerDataC[i].articleDescp
				        },
				      "hsnMasterDTO": { 
				    	  "id": headerDataC[i].hsnId,
				          "hsnCode":  headerDataC[i].hsnCode,
				          "hsnDescription": headerDataC[i].hsnN 
				      },
				      "skinPurity" :headerDataC[i].skinPurity,
				      "meltingPurity":headerDataC[i].meltingPurity,
				      "costCode": headerDataC[i].costCode,
				      "metalSegmentDTO": {
				          "id": headerDataC[i].mSegId,
				          "segmentId": headerDataC[i].mSegId,
				          "description": headerDataC[i].metalTypeId,
				          "code": headerDataC[i].mSegCode
				        },
				      "vendorDTO": {
				            "id": headerDataC[i].vendorCode,
				            "vendorCode": headerDataC[i].vendCode,
				            "vendorName": headerDataC[i].vendorCodeN
				          },
			          "grossWeight":headerDataC[i].grossWt,
		              "netWeight": headerDataC[i].netWt,
				      "sellingMakingCharges": headerDataC[i].makingSelling,
			          "sellingWastageWt":headerDataC[i].wastageSelling,
			          "costMakingCharges": headerDataC[i].costMcTotalCost,
			          "costWastageWt": headerDataC[i].costWastageWt,
			          "DisassembleSaleOrtoDCId": headerDataC[i].refNo,
			          "pieces": (headerDataC[i].pieces != null) ? headerDataC[i].pieces : 0 ,
			          "assembleDisassembleStoneDtoList" : getStoneDetForCreate(),
			          "assembleDisassembleAccDtoList" : getAccDetForCreate()	
			}
			//resultC.push(validatedDataC);
		}
		return validatedDataC;
}


var getStoneDetForCreate = function(){
	var stoneDataC = $("#jqxgridStoneDetailsV").jqxGrid('getrows');
	var sArry = [];
	 for(var i=0;i<stoneDataC.length;i++){
		 var stoneData = {
			"id": null,
			"disassembleStoneId": stoneDataC[i].disassembleStoneId,
			 "stoneSrlNo":stoneDataC[i].stoneSlNo,
		      "suppliedBy":stoneDataC[i].suppBy,
		        "stoneCategoryDTO": {
		          "id": stoneDataC[i].catId,
		          "description": stoneDataC[i].cat,
		          "code": stoneDataC[i].catCode,
		        },
		        "stoneSubCatDTO": {
		          "id": stoneDataC[i].subCatId,
		          "code": stoneDataC[i].subCatCode,
		          "description": stoneDataC[i].subCatDesc
		        },
		        "stoneSegmentDTO": {
		          "id": stoneDataC[i].segmId,
		          "segmentId": stoneDataC[i].segmId,
		          "description":stoneDataC[i].stSseg,
		          "code":  stoneDataC[i].segmCode
		        },
		        "cutGrade":stoneDataC[i].cutGrade, 
		        "clarity": stoneDataC[i].clarity,
		        "color": stoneDataC[i].color,
		        "actualColor": stoneDataC[i].actCol,
		        "weightCostRange": stoneDataC[i].wtRange,
		        "uom": stoneDataC[i].uom,
		        "stoneWt": stoneDataC[i].stoneWt,
		        "pieces":stoneDataC[i].stonePcs,
		        "stoneSellingRate":stoneDataC[i].sellingRate,
		        "stoneSellingAmount": stoneDataC[i].sellingAmt,
		        "stoneCostRate": stoneDataC[i].costRate,
		        "stoneCostAmount": stoneDataC[i].costAmt,
		        "assembleDisassembleDetailId": stoneDataC[i].refNo,
		        "stoneCode":stoneDataC[i].stoneCode,
		 }
			 sArry.push(stoneData); 
	 }
	return sArry;
}

var getAccDetForCreate = function(){
	var accDataC = $("#jqxgridAccDetailsV").jqxGrid('getrows');
	var accArry = [];
		for(var i=0;i<accDataC.length;i++){
			var accData = {
					"id": null,
			        "disassembleAccId": accDataC[i].disassembleAccId,
			        "accSrlNo": accDataC[i].accSlNo,
			        "suppliedBy": accDataC[i].suppBy,
			        "accWt": accDataC[i].accWt,
			        "accPieces": accDataC[i].accPcs,
			        "accUom":accDataC[i].accUom,
			        "categoryDTO": {
			          "id": accDataC[i].catId,
			          "description": accDataC[i].cat,
			          "code": accDataC[i].catCode
			        },
			        "subCategoryDTO": {
			          "id": accDataC[i].subCatId,
			          "code": accDataC[i].subCatCode,
			          "description":accDataC[i].subCatDesc
			        },
			        "accSellingRate": accDataC[i].accRate,
			        "accSellingAmount": accDataC[i].accSellingAmt,
			        "accCostRate": accDataC[i].costRate,
			        "accCostAmount": accDataC[i].costAmt,
			        "assembleDisassembleDetailId": accDataC[i].refNo
			}
			accArry.push(accData); 
		}
		return accArry;
}

$("#saveAssembleItems").on('click',function(){
	var rows = $('#jqxgridAssembleHeaderV').jqxGrid('getrows');
	 for (var i = 0; i < rows.length; i++){
		 var row = rows[i];
		 var segment = row.segmentN;
		 var jewelType = row.jewTypeN;
		 var category = row.catN;
		 var subCategory = row.subCatN;
		 var hsnCode = row.hsnN;
		 var vendor = row.vendorCodeN
		 if(segment == "" || segment == null || jewelType == "" || jewelType == null || category == "" || category == null
				 || subCategory == "" || subCategory == null || hsnCode == "" || hsnCode == null
				 || vendor == "" || vendor == null ){
			 $.growl.error({
				 message : "Please Fill All the Fields !!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
		 }
	 }
	
	var finalData = getHeaderDetForCreate();
	console.log(finalData)
	if(typeof finalData != "undefined" || finalData != ""){
		postJSON('/OrderExecution/api/v1/createAssembleOfItems',JSON.stringify(finalData),function(data) {
			if(data.resCode == "1"){
				assembleDetArry = [];
				stoneArray = [];
				accArray = [];
				assembleValidateArry = [];
				stoneValidateDetArry = [];
				accValidateDetArry = [];
				$("#validateGrids").hide();
				$("#createGrids").hide();
				$("#jqxgridAssembleHeader").jqxGrid('clear');
				$.growl.notice({
					message : data.mesgStr,
					duration : 20000,
					title : 'Success'
				});
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 20000,
					title : 'Error'
				});
				return false;
			}
		});
	}

});


$("#clearAllS").on('click',function(){
	assembleDetArry = [];
	stoneArray = [];
	accArray = [];
	assembleValidateArry = [];
	stoneValidateDetArry = [];
	accValidateDetArry = [];
	
	splitPBDetArr = [];
	pbStoneArray = [];
	pbAccArray = [];
	validatedPbData = [];
	pbStoneValidateDetArry = [];
	pbAccValidateDetArry = [];
	
	saleBillDetArr = [];
	sbStoneArray = [];
	sbAccArray = [];
	sbAccValidateDetArry = [];
	sbStoneValidateDetArry = [];
	validatedSbRetData = [];
	
	$("#srlNo").val("");
	$("#salesReturnNoC").val("");
	
	$("#validateGrids").hide();
	$("#createGrids").hide();
	
	$("#pbValidateGrids").hide();
	$("#pbCreateGrids").hide();
	
	$("#sbCreateGrids").hide();
	$("#sbValidateGrids").hide();
	
	$("#jqxgridAssembleHeader").jqxGrid('clear');
	$("#jqxgridStoneDetails").jqxGrid('clear');
	$("#jqxgridAccDetails").jqxGrid('clear');
	$("#jqxgridAssembleHeaderV").jqxGrid('clear');
	$("#jqxgridStoneDetailsV").jqxGrid('clear');
	$("#jqxgridAccDetailsV").jqxGrid('clear');
	$("#jqxgridPBAssembleHeader").jqxGrid('clear');
	$("#jqxgridPBStoneDetails").jqxGrid('clear');
	$("#jqxgridPBAccDetails").jqxGrid('clear');
	$("#jqxgridAssembleHeaderPbV").jqxGrid('clear');
	$("#jqxgridStoneDetailsPbV").jqxGrid('clear');
	$("#jqxgridAccDetailsPbV").jqxGrid('clear');
	$("#jqxgridSBAssembleHeader").jqxGrid('clear');
	$("#jqxgridSBStoneDetails").jqxGrid('clear');
	$("#jqxgridSBAccDetails").jqxGrid('clear');
	$("#jqxgridAccDetailsSbV").jqxGrid('clear');
	$("#jqxgridStoneDetailsSbV").jqxGrid('clear');
	$("#jqxgridAssembleHeaderSbV").jqxGrid('clear');
});


$("#cancelAssembleItems").on('click',function(){
	assembleDetArry = [];
	stoneArray = [];
	accArray = [];
	assembleValidateArry = [];
	stoneValidateDetArry = [];
	accValidateDetArry = [];
	$("#validateGrids").hide();
	$("#createGrids").hide();
	$("#jqxgridAssembleHeader").jqxGrid('clear');
	$("#jqxgridStoneDetails").jqxGrid('clear');
	$("#jqxgridAccDetails").jqxGrid('clear');
	
	$("#jqxgridAssembleHeaderV").jqxGrid('clear');
	$("#jqxgridStoneDetailsV").jqxGrid('clear');
	$("#jqxgridAccDetailsV").jqxGrid('clear');
});


$("#cancelAssemblePbItems").on('click',function(){
	splitPBDetArr = [];
	pbStoneArray = [];
	pbAccArray = [];
	
	validatedPbData = [];
	pbStoneValidateDetArry = [];
	pbAccValidateDetArry = [];
	
	$("#pbValidateGrids").hide();
	$("#pbCreateGrids").hide();
	$("#jqxgridPBAssembleHeader").jqxGrid('clear');
	$("#jqxgridPBStoneDetails").jqxGrid('clear');
	$("#jqxgridPBAccDetails").jqxGrid('clear');
	
	$("#jqxgridAssembleHeaderPbV").jqxGrid('clear');
	$("#jqxgridStoneDetailsPbV").jqxGrid('clear');
	$("#jqxgridAccDetailsPbV").jqxGrid('clear');
});

$("#cancelAssembleSbItems").on('click',function(){
	saleBillDetArr = [];
	sbStoneArray = [];
	sbAccArray = [];
	
	sbAccValidateDetArry = [];
	sbStoneValidateDetArry = [];
	validatedSbRetData = [];
	
	$("#sbCreateGrids").hide();
	$("#sbValidateGrids").hide();
	
	$("#jqxgridSBAssembleHeader").jqxGrid('clear');
	$("#jqxgridSBStoneDetails").jqxGrid('clear');
	$("#jqxgridSBAccDetails").jqxGrid('clear');
	
	$("#jqxgridAccDetailsSbV").jqxGrid('clear');
	$("#jqxgridStoneDetailsSbV").jqxGrid('clear');
	$("#jqxgridAssembleHeaderSbV").jqxGrid('clear');
});
//############################ Assemble By Purchase Bill No Started ##########################

//Header Grid 
var assemblePBHeaderDetGrid = function(data){
	var source = {
      localdata: data,
      datatype: "json",
		datafields : [ 
			{name : 'pbNo', type : 'int','map' : 'purchaseBillId'}, 
			{name : 'slNo', type : 'int','map' : 'serialNumber'}, 
			{name : 'material', type : 'string','map' : 'materialType'},
			{name: 'segment', type: 'string','map':'segment>description'},
			{name : 'postGwt', type : 'string','map':'grossWt'},
			{name : 'postNwt', type : 'string','map' : 'netWt'},
			{name : 'valInRs', type : 'string','map': 'totalValue'}
			,
			{name : 'segId', type : 'int','map' : 'segment>id'},
			{name : 'segCode', type : 'string','map': 'segment>code'},
			{name : 'jewId', type : 'int','map' : 'jewelType>id'},
			{name : 'jewCode', type : 'string','map' :'jewelType>code'},
			{name : 'jewType', type : 'string','map' :'jewelType>description'},
			{name : 'purity', type : 'string','map' :'purity'},
			{name : 'hsn', type : 'int','map' :'hsnMasterDTO>hsnCode'},
			{name : 'hsnid', type : 'int','map' :'hsnMasterDTO>id'},
			{name : 'hsnDesc', type : 'int','map' :'hsnMasterDTO>hsnDescription'},
			{name : 'pbid', type : 'int','map' :'purchaseBillId'},
			{name : 'location', type : 'int','map' :'location'},
			{name : 'id', type : 'int','map' :'id'},
			{name : 'subCatId', type : 'int','map':'subCatDTO>id'},
			{name : 'subCat', type : 'string','map':'subCatDTO>description'},
			{name : 'pieces', type : 'int'}
			
			/*{name : 'disassembleAccId', type : 'int'},
			{name : 'catId', type : 'int'},
			{name : 'subCatId', type : 'int'},
			{name : 'accUom', type : 'string'},
			{name : 'catCode', type : 'string'},
			{name : 'subCatCode', type : 'string'},*/
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridPBAssembleHeader").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		columns : [
			{ text : 'PB No', datafield : 'pbNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sl No', datafield : 'slNo', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Segment', datafield : 'segment', width : '11%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Jewel Type', datafield : 'jewType', width : '16%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Material Type', datafield : 'material', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'HSN Id', datafield : 'hsn', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gr. Wt.', datafield : 'postGwt', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Net Wt', datafield : 'postNwt', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{text : 'Purity',datafield : 'purity',width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{ text : 'PB Item Amount', datafield : 'valInRs', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			
			
			{text : '',datafield : 'segId',hidden: true},
			{text : '',datafield : 'segCode',hidden: true},
			{text : '',datafield : 'jewId',hidden: true},
			{text : '',datafield : 'jewCode',hidden: true},
			{text : '',datafield : 'pbid',hidden: true},
			{text : '',datafield : 'hsnid',hidden: true},
			{text : '',datafield : 'hsnDesc',hidden: true},
			{text : '',datafield : 'location',hidden: true},
			{text : '',datafield : 'subCatId',hidden: true},
			{text : '',datafield : 'id',hidden: true},
			{text : '',datafield : 'pieces',hidden: true},
		]
	});
}


// Stone Grid
var assemblePBStoneDetGrid = function(data){
	var source = {
      localdata: data,
      datatype: "json",
		datafields : [ 
			{name : 'pbNo', type : 'int','map' : 'id'},
			{name : 'stSlNo', type : 'int','map' : 'srlNo'}, 
			{name : 'stSeg', type : 'string','map' : 'segment>description'},
			{name: 'stCat', type: 'string','map':'catDTO>description'},
			{name: 'cut', type: 'string','map':'cutGradeVal'},
			{name : 'color', type : 'string','map':'colorVal'},
			{name : 'clarity', type : 'string','map' : 'clarityVal'},
			{name : 'wtRange', type : 'string','map': 'weightSlabVal'},
			{name : 'shape', type : 'string','map' : 'shapedto>description'},
			{name : 'shapeId', type : 'int','map' : 'shapedto>id'},
			{name : 'shapeCode', type : 'string','map' : 'shapedto>code'},
			{name : 'stoneWt', type : 'float','map': 'weight'},
			{name : 'pcs', type : 'int','map' : 'pieces'},
			{name : 'uom', type : 'string','map' :'uomtype'},
			
			{name : 'stoneRate', type : 'float','map':'rate'},
			{name : 'stoneAmt', type : 'float','map':'price'},
			
			{name : 'segId', type : 'int','map' : 'segment>id'},
			{name : 'segCode', type : 'string','map' : 'segment>code'},
			{name : 'catId', type : 'int','map':'catDTO>id'},
			{name : 'catCode', type : 'string','map':'catDTO>code'},
			{name : 'stoneCode', type : 'string','map':'stoneCode'},
			{name : 'actCol', type : 'string','map':'actualColorVal'},
			{name : 'detSrlNo', type : 'int'},
			{name : 'subCatId', type : 'int','map':'subCatDTO>id'},
			{name : 'subCatDesc', type : 'string','map':'subCatDTO>description'},

			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridPBStoneDetails").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		columns : [
			{ text : 'PB No', datafield : 'pbNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Sl No', datafield : 'stSlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Segment', datafield : 'stSeg', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cat', datafield : 'stCat', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cut', datafield : 'cut', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Color', datafield : 'color', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Clarity', datafield : 'clarity', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Wt Range', datafield : 'wtRange', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{text : 'Shape',datafield : 'shape',width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{text : 'Stone Wt',datafield : 'stoneWt', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{text : 'UQC',datafield : 'uom', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{text : 'Pcs',datafield : 'pcs', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{text : 'Stone Rate',datafield : 'stoneRate',width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{text : 'Stone Amt',datafield : 'stoneAmt',width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
	
			{text : '',datafield : 'segId',hidden: true},
			{text : '',datafield : 'segCode',hidden: true},
			{text : '',datafield : 'catId',hidden: true},
			{text : '',datafield : 'catCode',hidden: true},
			{text : '',datafield : 'stoneCode',hidden: true},
			{text : '',datafield : 'actCol',hidden: true},
			{text : '',datafield : 'shapeId',hidden: true},
			{text : '',datafield : 'shapeCode',hidden: true},
			{text : '',datafield : 'detSrlNo',hidden: true},
			{text : '',datafield : 'subCatId',hidden: true},
			{text : '',datafield : 'subCatDesc',hidden: true},

		]
	});
}


//Accessory Grid
var assemblePBAccDetGrid = function(data){
	var source = {
      localdata: data,
      datatype: "json",
		datafields : [
			{name : 'pbNo', type : 'int','map' : 'id'},
			{name : 'accSlNo', type : 'int','map' : 'serialNumber'}, 
			{name : 'accCat', type : 'string','map' : 'catDTO>description'},
			{name: 'accWt', type: 'float','map':'weight'},
			{name: 'accPcs', type: 'int','map':'pieces'},
			{name : 'accRate', type : 'float','map':'rate'},
			{name : 'accAmt', type : 'float','map' : 'price'},
			
			{name : 'catId', type : 'int','map' : 'catDTO>id'},
			{name : 'catCode', type : 'string','map' : 'catDTO>code'},
			{name : 'accCode', type : 'string','map': 'accCode'},
			{name : 'uom', type : 'string','map' : 'uomType'},
			
			{name : 'subCatCode', type : 'string','map' : 'subCatDTO>code'},
			{name : 'subCatId', type : 'string','map': 'subCatDTO>id'},
			{name : 'subCatDesc', type : 'string','map' : 'subCatDTO>description'},
			
			{name : 'detSrlNo', type : 'int'},
			/*{name : 'costAmt', type : 'float','map' :'accCostAmount'},
			
			{name : 'disassembleAccId', type : 'int'},
			{name : 'catId', type : 'int'},
			{name : 'subCatId', type : 'int'},
			{name : 'accUom', type : 'string'},
			{name : 'catCode', type : 'string'},
			{name : 'subCatCode', type : 'string'},*/
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridPBAccDetails").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		columns : [
			{ text : 'PB No', datafield : 'pbNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Sl No', datafield : 'accSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cat', datafield : 'accCat', width : '18%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Wt', datafield : 'accWt', width : '18%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Pcs', datafield : 'accPcs', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Rate', datafield : 'accRate', width : '20%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Amt', datafield : 'accAmt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			
			{text : '',datafield : 'catId',hidden: true},
			{text : '',datafield : 'catCode',hidden: true},
			{text : '',datafield : 'accCode',hidden: true},
			{text : '',datafield : 'uom',hidden: true},
			{text : '',datafield : 'subCatCode',hidden: true},
			{text : '',datafield : 'subCatId',hidden: true},
			{text : '',datafield : 'subCatDesc',hidden: true},
			{text : '',datafield : 'detSrlNo',hidden: true},
		]
	});
}

// Assemble By Split PB Validate Grids
// Header Grid
var jsonArray = [];
var jsonArray2 = [];
var segments,jwTypes,catResp,subCatresp;
var assembleSplitPBGrid = function(data){
	var source = {
      localdata: data,
      datatype: "json",
		datafields : [ 
			{name : 'slNo', type : 'int'},
			{name : 'segment', type : 'string'},
			{name: 'jwlType', type: 'string'},
			{name: 'cat', type: 'string'},
			{name: 'subCat', type: 'string'},
			{name : 'artCode', type : 'string'},
			{name : 'hsnId', type : 'string','map' : ''},
			{name : 'skinPurity', type : 'float','map': 'purity'},
			{name : 'metalTypeId', type : 'int','map': 'segment>description'},
			{name : 'gWt', type : 'string','map' : 'grossWt'},
			{name : 'nWt', type : 'string','map' :'netWt'},
			{name : 'pbItemAmt', type : 'float','map':'totalValue'},
			
			{name : 'segmentCode', type : 'string'},
			{name : 'jewelCode', type : 'string'},
			{name : 'catCode', type : 'string'},
			{name : 'subCatCode', type : 'string'},
			{name : 'articleId', type : 'int'},
			{name : 'articleDescp', type : 'string'},
			{name : 'hsnCode', type : 'string'},
			{name : 'metalTypeCode', type : 'string','map':'segment>code'},
			{name : 'metalType', type : 'string','map':'segment>id'},
			{name : 'purchaseBillId', type : 'int'},
			{name : 'serialNumber', type : 'int'},
			{name : 'totalValue', type : 'float'},
			{name : 'materialType', type : 'string'},
			{name : 'vendorCode', type : 'string'},
			{name : 'location', type : 'string'},
			{name : 'pieces',type:'int'}
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAssembleHeaderPbV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		editable : true,
		columnsresize : true,
		columns : [
			{ text : '', datafield : 'slNo', width : '2%', cellsalign : 'center', align : 'center', editable : false},
			{ text : 'Segment', datafield : 'segment', width : '5%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'segmentN',
				createeditor: function (row, cellvalue, editor) { 
					editor.on('click', function(event){
					var segmentId = $('#jqxgridPBAssembleHeader').jqxGrid('getcellvalue',row,'segId');
					var segmentCode = $('#jqxgridPBAssembleHeader').jqxGrid('getcellvalue',row,'segCode');
					var segment = $('#jqxgridPBAssembleHeader').jqxGrid('getcellvalue',row,'segment');
					fieldFilters = {
						  "fieldFilters": {
						    "type": "segment",
						    "orgSegment": {
						      "id": segmentId,
						      "segmentId": segmentId,
						      "description":segment,
						      "code": segmentCode
						    }
						  }
						}
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
						segments = data.payload.allSegments;
							editor.jqxDropDownList({source : segments,displayMember : 'description',valueMember : 'id'});
						});
					});
			    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
		      		 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'jewTypeN', null);  
			    	 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'catN', null); 
			    	 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'subCatN', null); 
			    	 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'artCode', null);
			    	 
			    	 $.each(segments, function(key, val) {
						 if( val.description  == newvalue.label){	
							 $('#jqxgridAssembleHeaderPbV').jqxGrid ('setcellvalue', row,'segmentCode',val.code);
						}
					})
				}
			},
			{ text : 'Jewel Type', datafield : 'jwlType', width : '8%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'jewTypeN',
				createeditor: function (row, cellvalue, editor) {
					 editor.on('click', function(event){
						var segmentId = $('#jqxgridAssembleHeaderPbV').jqxGrid('getcellvalue',row,'segment');
						fieldFilters = {
							  "fieldFilters": {
							    "type": "jewelType",
							    "segment": {
							      "id": segmentId,
							    }
							  }
							}
						postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
								 jwTypes = data.payload.jeweltypes;
								editor.jqxDropDownList({source : jwTypes,displayMember : 'description',valueMember : 'id'});
							});
					 	});
				    },
				    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
				    	 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'catN', null); 
				    	 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'subCatN', null); 
				    	 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'artCode', null); 
				    	 
				    	 $.each(jwTypes, function(key, val) {
							 if( val.description  == newvalue.label){	
								 $('#jqxgridAssembleHeaderPbV').jqxGrid ('setcellvalue', row,'jewelCode',val.code);
							}
						})
					  }
			},
			{ text : 'Cat', datafield : 'cat', width : '9%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'catN',
				createeditor: function (row, cellvalue, editor) { 
					 editor.on('click', function(event){
					var segmentId = $('#jqxgridAssembleHeaderPbV').jqxGrid('getcellvalue',row,'segment');
					var jTypeId = $('#jqxgridAssembleHeaderPbV').jqxGrid('getcellvalue',row,'jwlType');
					
					fieldFilters = {
						  "fieldFilters": {
						    "type": "segCategory",
						    "segment": {
						      "id": segmentId,
						    },
						    "jewel": {
							      "id": jTypeId,
							    }
						  }
						}
					jsonArray = [];
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
							// catResp = data.payload.maincats;
							 $.each(data.payload.maincats, function(k,v){
								 var jsonVal = {"id" : parseInt(v.id), "name" : v.name,"description" : v.description};
								 jsonArray.push(jsonVal)
							 });
							 
							editor.jqxDropDownList({source : jsonArray,displayMember : 'description',valueMember : 'id'});
						});
					 });
			    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
			    	 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'subCatN', null); 
			    	 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'artCode', null); 
			    	 
			    	 $.each(jsonArray, function(key, val) {
						 if( val.description  == newvalue.label){	
							 $('#jqxgridAssembleHeaderPbV').jqxGrid ('setcellvalue', row,'catCode',val.name);
						}
					})
				 }
			},
			{ text : 'Sub Cat', datafield : 'subCat', width : '12%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'subCatN',
				createeditor: function (row, cellvalue, editor) { 
					editor.on('click', function(event){
					var segmentId = $('#jqxgridAssembleHeaderPbV').jqxGrid('getcellvalue',row,'segment');
					var categoryId = $('#jqxgridAssembleHeaderPbV').jqxGrid('getcellvalue',row,'cat');
					var jwlType = $('#jqxgridAssembleHeaderPbV').jqxGrid('getcellvalue',row,'jwlType');
					fieldFilters = {
						  "fieldFilters": {
						    "type": "subCat",
						    "segment": {
						      "id": segmentId,
						    },
						    "category": {
							      "id": categoryId,
							    },"jewel":{"id":jwlType}
						  }
						}
					jsonArray2 = [];
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
							// subCatresp = data.payload.subCats;
							 $.each(data.payload.subCats, function(k,v){
								 var jsonVal = {"id" : parseInt(v.id), "name" : v.name,"description" : v.description};
								 jsonArray2.push(jsonVal)
							 });
							editor.jqxDropDownList({source : jsonArray2,displayMember : 'description',valueMember : 'id'});
						});
					});
			    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
			        $.each(jsonArray2, function(key, val) {
						 if( val.description  == newvalue.label){
							 $('#jqxgridAssembleHeaderPbV').jqxGrid ('setcellvalue', row,'subCatCode',val.name);
						}
					})
			    	
			    	 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'artCode', null);
			    	 
	      	    	 var segment = $('#jqxgridAssembleHeaderPbV').jqxGrid('getcellvalue',row,'segment');
	       			 var jwlType = $('#jqxgridAssembleHeaderPbV').jqxGrid('getcellvalue',row,'jwlType');
	       			 var categoryC = $('#jqxgridAssembleHeaderPbV').jqxGrid('getcellvalue',row,'cat');
     		         fieldFilters = {
							"fieldFilters" : {
					               "type":"articleCode",
					               "subCategory":{ "id":newvalue.value},
					        	   "segment":{"id":segment},
					        	   "category":{"id":categoryC},
					        	   "jewelTypeDTO":{"id":jwlType}
					           }
					      }
     		   	  postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters), function(data) {
     		   	        $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'artCode',null); 
					    var res = data.payload.article;
					    $.each(res,function(k,v){
					    	 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'artCode', v.name);  
					    	 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'articleId', v.id);  
					    	 $("#jqxgridAssembleHeaderPbV").jqxGrid("setcellvalue", row, 'articleDescp', v.description);
					    })
      			    });
     		         
	      	     }
			},
			{ text : 'Article Code', datafield : 'artCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'HSN Id', datafield : 'hsnId', width : '10%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'hsnN',
				createeditor: function (row, cellvalue, editor) { 
					editor.on('click', function(event){
						var rows = $('#jqxgridPBAssembleHeader').jqxGrid('getrows');
						var hsn = [];
							for(var i=0;i<rows.length;i++){
								var hsnCodeC = {
									"id" : rows[i].hsnid,
									"name" : rows[i].hsn + "-" + rows[i].hsnDesc,
									"description" :  rows[i].hsnDesc
								}
								if(rows[i].hsnid != null){
									hsn.push(hsnCodeC);
								}
							}
							 resultH = [];
							$.each(hsn, function (i, e) {
							    var matchingItems = $.grep(resultH, function (item) {
							       return item.id === e.id && item.name === e.name;
							    });
							    if (matchingItems.length === 0){
							    	resultH.push(e);
							    }
							});
							editor.jqxDropDownList({source : resultH,displayMember : 'name',valueMember : 'id'});
					});
				},
			  cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
				  $.each(resultH, function(key, val) {
						 if( val.name  == newvalue.label){
							 $('#jqxgridAssembleHeaderPbV').jqxGrid ('setcellvalue', row,'hsnCode',val.description);
						}
					})
			  }
			},
			{ text : 'Vendor Code', datafield : 'vendorCode', width : '10%', cellsalign : 'center', align : 'center', editable : true, sortable : false,columntype :'dropdownlist',displayfield : 'vendorCodeN',
				createeditor: function (row, cellvalue, editor) {
					 editor.on('click', function(event){
						 $.getJSON('/OrderExecution/api/v1/getSmallOrderGRLOV?portal=OE', function(data) {
							 vendorList = data.payload.vendorList;
								editor.jqxDropDownList({source : vendorList,displayMember : 'vendorName',valueMember : 'id'});
							});
					 	});
				    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
					  $.each(vendorList, function(key, val) {
							 if( val.vendorName  == newvalue.label){
								 $('#jqxgridAssembleHeaderPbV').jqxGrid ('setcellvalue', row,'vendCode',val.vendorCode);
							}
						})
				  }
			},
			{text : 'Purity',datafield : 'skinPurity',width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{text : 'Metal Type Id',datafield : 'metalTypeId',width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{text : 'Gr. wt',datafield : 'gWt',width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{text : 'Nt. Wt',datafield : 'nWt',width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{text : 'PB Item Amt',datafield : 'pbItemAmt',width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			
			{text : '',datafield : 'segmentCode',hidden: true}, 
			{text : '',datafield : 'jewelCode',hidden: true}, 
			{text : '',datafield : 'catCode',hidden: true}, 
			{text : '',datafield : 'subCatCode',hidden: true},
			{text : '',datafield : 'articleId',hidden: true}, 
			{text : '',datafield : 'articleDescp',hidden: true},
			{text : '',datafield : 'hsnCode',hidden: true},
			
			{text : '',datafield : 'metalTypeCode',hidden: true},
			{text : '',datafield : 'metalType',hidden: true},
			
			{text : '',datafield : 'purchaseBillId',hidden: true},
			{text : '',datafield : 'serialNumber',hidden: true},
			{text : '',datafield : 'totalValue',hidden: true,cellsformat : 'd2'},
			{text : '',datafield : 'materialType',hidden: true},
			{text : '',datafield : 'vendCode',hidden: true},
			{text : '',datafield : 'location',hidden: true},
			{text:'',datafield:'pieces',hidden:true}
		]
	});
}

// Stone Grid
var assembleSplitPBStoneGrid = function(data){
	var source = {
      localdata: data,
      datatype: "json",
		datafields : [ 
			{name : 'stSlNo', type : 'int','map' : 'srlNo'},
			{name: 'subCatDesc', type: 'string'},
			{name: 'stSeg', type: 'string','map':'segment>description'},
			{name: 'cutGrade', type: 'string','map':'cutGradeVal'},
			{name : 'color', type : 'string','map':'colorVal'},
			{name : 'clarity', type : 'string','map' : 'clarityVal'},
			{name : 'wtRange', type : 'string','map': 'weightSlabVal'},
			{name : 'uom', type : 'string','map' : 'uomtype'},
			
			{name : 'stSegId', type : 'int','map' : 'segment>id'},
			{name : 'stSegCode', type : 'string','map': 'segment>code'},
			{name : 'catId', type : 'string','map' : 'catDTO>id'},
			{name : 'catCode', type : 'int','map' :'catDTO>code'},
			{name : 'catDesc', type : 'string','map':'catDTO>description'},
			{name : 'actualCol', type : 'string','map' : 'actualColorVal'},
			
			{name : 'stPcs', type : 'int','map': 'pieces'},
			{name : 'stWt', type : 'float','map' : 'weight'},
			{name : 'stRate', type : 'float','map' :'rate'},
			{name : 'stAmt', type : 'float','map':'price'},
			{name : 'stoneCode', type : 'string','map' : 'stoneCode'}, 
			{name : 'shapeId', type : 'string','map' : 'shapedto>id'}, 
			{name : 'shapeCode', type : 'string','map' : 'shapedto>code'}, 
			{name : 'shapeDesc', type : 'string','map' : 'shapedto>description'}, 
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStoneDetailsPbV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		columns : [
			{ text : 'Stone Sl No.', datafield : 'stSlNo', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '10%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Seg', datafield : 'stSeg', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cut Grade', datafield : 'cutGrade', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Color', datafield : 'color', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Clarity', datafield : 'clarity', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{text : 'Wt Range',datafield : 'wtRange',width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{text : 'UQC',datafield : 'uom',width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{text : 'Stone Pcs',datafield : 'stPcs',width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{text : 'Stone wt',datafield : 'stWt',width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{text : 'Stone Rate',datafield : 'stRate',width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{text : 'Stone Amt',datafield : 'stAmt',width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			
			{text : '',datafield : 'stSegId',hidden: true}, 
			{text : '',datafield : 'stSegCode',hidden: true}, 
			{text : '',datafield : 'catId',hidden: true}, 
			{text : '',datafield : 'catCode',hidden: true},
			{text : '',datafield : 'catDesc',hidden: true}, 
			{text : '',datafield : 'actualCol',hidden: true},
			
			
			{text : '',datafield : 'stoneCode',hidden: true}, 
			{text : '',datafield : 'shapeId',hidden: true},
			{text : '',datafield : 'shapeCode',hidden: true}, 
			{text : '',datafield : 'shapeDesc',hidden: true},
		]
	});
}


// Accessory
var assembleSplitPBAccGrid = function(data){
	var source = {
      localdata: data,
      datatype: "json",
		datafields : [ 
			{name : 'refNo', type : 'int','map' : ''}, 
			{name : 'accSlNo', type : 'int','map':'serialNumber'},
			{name: 'catDesc', type: 'string','map':'catDTO>description'},
			{name: 'subCatDesc', type: 'string','map':'subCatDTO>description'},
			{name: 'accWt', type: 'float','map':'weight'},
			{name : 'accPcs', type : 'int','map':'pieces'},
			{name : 'accRate', type : 'float','map' : 'rate'},
			{name : 'accAmt', type : 'float','map': 'price'},
			{name : 'accUom', type : 'string','map': 'uomType'},
			
			{name : 'catId', type : 'int','map': 'catDTO>id'},
			{name : 'catCode', type : 'string','map': 'catDTO>code'},
			{name : 'subCatId', type : 'int','map': 'subCatDTO>id'},
			{name : 'subCatCode', type : 'string','map': 'subCatDTO>code'},
			{name : 'accCode', type : 'string','map': 'accCode'},
		
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAccDetailsPbV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		columns : [
			{ text : 'Acc Sl No.', datafield : 'accSlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cat', datafield : 'catDesc', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '20%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Wt', datafield : 'accWt', width : '12%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Acc Pcs', datafield : 'accPcs', width : '13%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Rate', datafield : 'accRate', width : '13%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
			{text : 'Acc Amt',datafield : 'accAmt',width : '12%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd2'},
		
			{text : '',datafield : 'accUom',hidden: true},
			{text : '',datafield : 'accCode',hidden: true},
		]
	});
}

//###################### Request Format For Validate Assemble Create By Split PB###########################
// Header Details
var getValidatePBDetails = function(){
	var pbHeaderDet = $("#jqxgridPBAssembleHeader").jqxGrid('getrows');
	var headerValidatePBArry = []
	for(var i=0 ; i < pbHeaderDet.length;i++){
		console.log(pbHeaderDet);
		var pbHeaderDetC = {
				  "id" : pbHeaderDet[i].pbNo,
				  "serialNumber" : pbHeaderDet[i].slNo,
				  "purchaseBillId": pbHeaderDet[i].pbid,
				  "segment": {
				      "id": pbHeaderDet[i].segId,
				      "code": pbHeaderDet[i].segCode,
				      "description": pbHeaderDet[i].segment
				    },
				    "jewelType": {
				        "id": pbHeaderDet[i].jewId,
				        "code": pbHeaderDet[i].jewCode,
				        "description":pbHeaderDet[i].jewType
				      },
				      "purity": pbHeaderDet[i].purity,
				      "grossWt": pbHeaderDet[i].postGwt,
				      "netWt": pbHeaderDet[i].postNwt,
				      "totalValue": pbHeaderDet[i].valInRs,
				      "materialType": pbHeaderDet[i].material,
				      "pbStoneList": getValidatePbStoneDetails(pbHeaderDet[i].pbNo,pbHeaderDet[i].slNo),
				      "pbAccList": getValidateAccPBDetails(pbHeaderDet[i].pbNo,pbHeaderDet[i].slNo),
				      "hsnMasterDTO": null,
				      "articlesegmentDTO": null,
				      "jewelTypeDTO": null,
				      "categoryDTO": null,
				      "subCatDTO": {
				    	  "id":pbHeaderDet[i].subCatId,
				    	  "description":pbHeaderDet[i].subCat
				      },
				      "articleMasterDTO": null,
				      "vendorDTO": null,
				      "location":pbHeaderDet[i].location,
				      "pieces":pbHeaderDet[i].pieces
			    }
		headerValidatePBArry.push(pbHeaderDetC);
	}
	return headerValidatePBArry;
}

//Stones Details
var getValidatePbStoneDetails = function(pbNum,srlNumb){
	console.log(pbNum  + " " + srlNumb);
	var pbStoneDetC = $("#jqxgridPBStoneDetails").jqxGrid('getrows');
	var pbStoneValidateArry = [];
	 for(var i=0;i<pbStoneDetC.length;i++){
		 var stoneDataC = {
				 "id": pbStoneDetC[i].pbNo,
		          "srlNo":pbStoneDetC[i].stSlNo,
		          "segment": {
		            "id": pbStoneDetC[i].segId,
		            "code": pbStoneDetC[i].segCode,
		            "description": pbStoneDetC[i].stSeg
		          },
		          "catDTO": {
		            "id": pbStoneDetC[i].catId,
		            "code": pbStoneDetC[i].catCode,
		            "description":pbStoneDetC[i].stCat
		          },
		          "subCatDTO": {
		        	  "id" : pbStoneDetC[i].subCatId,
		        	  "description" : pbStoneDetC[i].subCatDesc
		          },
		          "stoneCode": pbStoneDetC[i].stoneCode,
		          "weightSlabVal": pbStoneDetC[i].wtRange,
		          "clarityVal": pbStoneDetC[i].clarity,
		          "actualColorVal": pbStoneDetC[i].actCol,
		          "colorVal": pbStoneDetC[i].color,
		          "cutGradeVal": pbStoneDetC[i].cut,
		          "rate":pbStoneDetC[i].stoneRate,
		          "pieces": pbStoneDetC[i].pcs,
		          "weight": pbStoneDetC[i].stoneWt,
		          "price": pbStoneDetC[i].stoneAmt,
		          "uomtype": pbStoneDetC[i].uom,
		          "shapedto" : {
		        	  "id" : pbStoneDetC[i].shapeId,
		        	  "code" : pbStoneDetC[i].shapeCode,
		        	  "description" : pbStoneDetC[i].shape 
		          }
		 	}
		 if(pbStoneDetC[i].pbNo == pbNum && pbStoneDetC[i].detSrlNo == srlNumb){
			 pbStoneValidateArry.push(stoneDataC);  
		 }
	 }
	return pbStoneValidateArry;
}


//Accessory Details
var getValidateAccPBDetails = function(pbNum,srlNumb){
	var accPBDetC = $("#jqxgridPBAccDetails").jqxGrid('getrows');
	var accPBValidateArry = [];
	console.log(accPBDetC);
		for(var i=0;i<accPBDetC.length;i++){
			var accDataC = {
					
				          "id": accPBDetC[i].pbNo,
				          "serialNumber": accPBDetC[i].accSlNo,
				          "catDTO": {
				            "id":  accPBDetC[i].catId,
				            "code":  accPBDetC[i].catCode,
				            "description": accPBDetC[i].accCat
				          },
				          "subCatDTO": {
				        	"id":  accPBDetC[i].subCatId,
				            "code":  accPBDetC[i].subCatCode,
				            "description": accPBDetC[i].subCatDesc
				          },
				          "accCode":  accPBDetC[i].accCode,
				          "rate":  accPBDetC[i].accRate,
				          "pieces":  accPBDetC[i].accPcs,
				          "weight": accPBDetC[i].accWt,
				          "price":  accPBDetC[i].accAmt,
				          "uomType":  accPBDetC[i].uom
				        }
			 if(accPBDetC[i].pbNo == pbNum && accPBDetC[i].detSrlNo == srlNumb){
				 accPBValidateArry.push(accDataC); 
			 }
		}
	return accPBValidateArry;
}

// Validate Function
$("#validatePBAssembleItems").on('click',function(){
	var data = getValidatePBDetails();
	if(data.length ==  1){
		$.growl.error({
			message : "Please Add Another Line Item to Create Assemble !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		if(typeof data != "undefined" || data != ""){
			postJSON('/OrderExecution/api/v1/validateAllSplitPBDetailsForAssembling',JSON.stringify(data),function(data) {
				if(data.resCode == "1"){
					$("#pbValidateGrids").show();
					$("#pbValDetailsC").slideDown();
					var result = data.payload.finalAssembledFG;
					var validatedPbData = [];
					validatedPbData.push(result);
					assembleSplitPBGrid(validatedPbData);
					
					var pbStoneValidateDetArry = [];
					var pbStoneDetArryV =  result.pbStoneList;
					for(var i=0;i<pbStoneDetArryV.length;i++){
						pbStoneValidateDetArry.push(pbStoneDetArryV[i]);
					}
					
					assembleSplitPBStoneGrid(pbStoneValidateDetArry);
					
					
					var pbAccValidateDetArry = [];
					var pbAccDetArryV =  result.pbAccList;
					for(var i=0;i<pbAccDetArryV.length;i++){
						pbAccValidateDetArry.push(pbAccDetArryV[i]);
					}
					assembleSplitPBAccGrid(pbAccValidateDetArry);
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
			});
		}
	}
});

$("#pbOrgDetails").on('click',function(){
	$("#pbOrgDetailsC").slideToggle();
});
	
$("#pbValidDetails").on('click',function(){
	$("#pbValDetailsC").slideToggle();
});


 
// ###########################  Request Format to create Assemble by Split PB ##########################
// Header Details
var getValidSplitPBDetails = function(){
	var pbValidDet = $("#jqxgridAssembleHeaderPbV").jqxGrid('getrows');
	//var pbNums = getValidatePBDetails();
	var pbNums = $("#jqxgridPBAssembleHeader").jqxGrid('getrows');
	var pbNumbArr = [];
	$.each(pbNums,function(k,v){
		pbNumbArr.push(v.id);
	});
	
	var pbNumbArry = pbNumbArr.join(",");
	
	for(var i=0;i<pbValidDet.length;i++){
		var validatedSplitPbDataC = {
				 "id": null,
				 "serialNumber": pbValidDet[i].serialNumber,
				 "purchaseBillId": pbValidDet[i].purchaseBillId,
				  "segment": {
				    "id": pbValidDet[i].segment,
				    "code": pbValidDet[i].segmentCode,
				    "description": pbValidDet[i].segmentN,
				  },
				  "assembleDocTypeIds" : pbNumbArry,
				  "jewelType" : null,
				  "purity": pbValidDet[i].skinPurity,
				  "grossWt": pbValidDet[i].gWt,
				  "netWt": pbValidDet[i].nWt,
				  "totalValue" : pbValidDet[i].totalValue,
				  "materialType": pbValidDet[i].materialType,
				  "pbStoneList" : getValidStoneDetails(),
				  "pbAccList" : getValidAccDetails(),
				  "hsnMasterDTO": {
					    "id": pbValidDet[i].hsnId,
					    "hsnCode":pbValidDet[i].hsnCode,
					    "hsnDescription":pbValidDet[i].hsnN
					  },
				  "articlesegmentDTO": {
					    "id": pbValidDet[i].metalType,
					    "description": pbValidDet[i].metalTypeId,
					    "code": pbValidDet[i].metalTypeCode
					  },
				  "jewelTypeDTO": {
					    "id": pbValidDet[i].jwlType,
					    "code": pbValidDet[i].jewelCode,
					    "description":pbValidDet[i].jewTypeN
					  },
				  "categoryDTO": {
				    "id":pbValidDet[i].cat,
				    "description": pbValidDet[i].catN,
				    "code": pbValidDet[i].catCode
				  },
				  "subCatDTO": {
				    "id": pbValidDet[i].subCat,
				    "code": pbValidDet[i].subCatCode,
				    "description":pbValidDet[i].subCatN
				  },
				  "articleMasterDTO": {
				    "id": pbValidDet[i].articleId,
				    "articleCode": pbValidDet[i].artCode,
				    "articleDesc": pbValidDet[i].articleDescp
				  },
				  "skinPurity":pbValidDet[i].skinPurity,
				  "vendorDTO": {
					    "id": pbValidDet[i].vendorCode,
					    "vendorCode": pbValidDet[i].vendCode,
					    "vendorName": pbValidDet[i].vendorCodeN
					  },
				  "location" : pbValidDet[i].location,
				  "pieces": pbValidDet[i].pieces
			}
	}
	return validatedSplitPbDataC;
}

//Stones Details
var getValidStoneDetails = function(){
	var pbStoneValidDet = $("#jqxgridStoneDetailsPbV").jqxGrid('getrows');
	var stoneArry = [];
	for(var i=0;i<pbStoneValidDet.length;i++){
		var validatedSplitPbStoneDataC = {
				  "id": null,
			      "srlNo": pbStoneValidDet[i].stSlNo,
			      "segment": {
				        "id": pbStoneValidDet[i].stSegId,
				        "description": pbStoneValidDet[i].stSeg,
				        "code":pbStoneValidDet[i].stSegCode
				      },
				   "stoneCode":pbStoneValidDet[i].stoneCode,
				   "weightSlabVal": pbStoneValidDet[i].wtRange,
				   "clarityVal": pbStoneValidDet[i].clarity,
				   "actualColorVal": pbStoneValidDet[i].actualCol,
				   "colorVal": pbStoneValidDet[i].color,
				   "cutGradeVal": pbStoneValidDet[i].cutGrade,
				   "rate": pbStoneValidDet[i].stRate,
			       "pieces": pbStoneValidDet[i].stPcs,
			       "weight": pbStoneValidDet[i].stWt,
			       "price": pbStoneValidDet[i].stAmt,
			       "shapedto": {
			            "id": pbStoneValidDet[i].shapeId,
			            "code": pbStoneValidDet[i].shapeCode,
			            "description": pbStoneValidDet[i].shapeDesc
			          },
			        "uomtype": pbStoneValidDet[i].uom,
				   "catDTO": {
				        "id": pbStoneValidDet[i].catId,
				        "description": pbStoneValidDet[i].catDesc,
				        "code": pbStoneValidDet[i].catCode
				      },
				   "subCatDTO": {
					   "id":pbStoneValidDet[i].subCatId,
					   "description" : pbStoneValidDet[i].subCatDesc
				   }
		}
		stoneArry.push(validatedSplitPbStoneDataC);
	}
	return stoneArry;
} 


//Accessory Details
var getValidAccDetails = function(){
	var pbAccValidDet = $("#jqxgridAccDetailsPbV").jqxGrid('getrows');
	var accArry = [];
	for(var i=0;i<pbAccValidDet.length;i++){
		var validatedSplitPbAccDataC = {
				"id": null,
			    "serialNumber": pbAccValidDet[i].accSlNo,
			    "weight": pbAccValidDet[i].accWt,
			    "accCode" :pbAccValidDet[i].accCode,
			    "rate": pbAccValidDet[i].accRate,
		        "price": pbAccValidDet[i].accAmt,
			    "pieces": pbAccValidDet[i].accPcs,
			    "uomType": pbAccValidDet[i].accUom,
			    "catDTO": {
			       "id": pbAccValidDet[i].catId,
			       "description": pbAccValidDet[i].catDesc,
			       "code": pbAccValidDet[i].catCode
			     },
			    "subCatDTO": {
			      "id": pbAccValidDet[i].subCatId,
			      "code": pbAccValidDet[i].subCatCode,
			      "description": pbAccValidDet[i].subCatDesc
			     },
		}
		accArry.push(validatedSplitPbAccDataC);
	}
	return accArry;
}

// Save Function
$("#saveAssemblePbItems").on('click',function(){
	var rows = $('#jqxgridAssembleHeaderPbV').jqxGrid('getrows');
	 for (var i = 0; i < rows.length; i++){
		 var row = rows[i];
		 var segment = row.segmentN;
		 var jewelType = row.jewTypeN;
		 var category = row.catN;
		 var subCategory = row.subCatN;
		 var hsnCode = row.hsnN;
		 if(segment == "" || segment == null || jewelType == "" || jewelType == null || category == "" || category == null
				 || subCategory == "" || subCategory == null || hsnCode == "" || hsnCode == null){
			 $.growl.error({
				 message : "Please Fill All the Fields !!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
		 }
	 }
	 var splitPbData = getValidSplitPBDetails();
	 console.log(splitPbData);
		if(typeof splitPbData != "undefined" || splitPbData != ""){
			
		postJSON('/OrderExecution/api/v1/createAssembleOfItemsUsingSplitPB',JSON.stringify(splitPbData),function(data) {
			if(data.resCode == "1"){
				$.growl.notice({
					message : data.mesgStr,
					duration : 20000,
					title : 'Success'
				});
				splitPBDetArr = [];
				pbStoneArray = [];
				pbAccArray = [];
				
				validatedPbData = [];
				pbStoneValidateDetArry = [];
				pbAccValidateDetArry = [];
				
				$("#pbValidateGrids").hide();
				$("#pbCreateGrids").hide();
				$("#jqxgridPBAssembleHeader").jqxGrid('clear');
				$("#jqxgridPBStoneDetails").jqxGrid('clear');
				$("#jqxgridPBAccDetails").jqxGrid('clear');
				
				$("#jqxgridAssembleHeaderPbV").jqxGrid('clear');
				$("#jqxgridStoneDetailsPbV").jqxGrid('clear');
				$("#jqxgridAccDetailsPbV").jqxGrid('clear');
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 20000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});

$("#sbOrgDetails").on('click',function(){
	$("#sbOrgDetailsC").toggle();
});