/*
	##	Author (UI)    :   Pooja sangve
	## 	Author (Java)	:   Divya M
	##	Date Creation 	: 	19-02-2018
	## 	Description		:	Assemble/Disassemble of Items.
*/
//############################# date picker functions ###############

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

var redirect = function() {
	window.location.href = "javascript:showContentPage('assembleDisassemble', 'bodySwitcher')";
	return window.location.href;
}

$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
});

var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

$("#backFromCreate").hide();
$("#validateHide").hide();
$("#SearchPageCreateId").show();
$("#hideCreateId").hide();
$("#hideSearchId").show();
$("#disassembleCreateId").hide();

$("#hideAssembleCreateId").hide();
$("#assembleCreateSection").hide();
$("#hideAssembleIdS").hide();
$("#hideAddButton").hide();
$("#hidePBNoC").hide();
$("#hideDisAssembleIdC").hide();
$("#backFromAssemCreate").hide();
$("#createGrids").hide();
$("#hideAssSearch").hide();
$("#assemblePanelId").hide();
$("#hideAssembleViewId").hide();
$("#assembleViewSection").hide();
$("#hideSalesRetNoC").hide();
$("#sbCreateGrids").hide();
$("#sbValidateGrids").hide();

$("#backFromCreate").on("click",function(){
	$("#backFromCreate").hide();
	$("#SearchPageCreateId").show();
	$("#hideCreateId").hide();
	$("#hideSearchId").show();
	$("#searchDisassemble").show();
	$("#validateHide").hide();
	$("#disassembleCreateId").hide();
	$("#assembleCreateSection").hide();
	$("#hideAssembleCreateId").hide();
	$("#createAss").show();
	$("#hideAssembleViewId").hide();
	$("#assembleViewSection").hide();
	$("#assemblePanelViewId").hide();
	$("#hideSalesRetNoC").hide();
	$("#sbCreateGrids").hide();
	$("#jqxgridAssembleHeader").jqxGrid('clear');
	$("#jqxgridPBAssembleHeader").jqxGrid('clear');
	$("#jqxgridSBAssembleHeader").jqxGrid('clear');
	$("form").trigger("reset");
});


$("#SearchPageCreateId").on("click",function(){
		$("#backFromCreate").show();
		$("#SearchPageCreateId").hide();
		$("#hideCreateId").show();
		$("#hideSearchId").hide();
		$("#validateHide").hide();
		$("#searchDisassemble").hide();
		$("#disassembleCreateId").show();
		$("#hideAssembleCreateId").hide();
		
		$("#panelIdC").hide();
		$("#jqxgridStoneC").hide();
		$("#jqxgridAccC").hide();
		$("#jqxgridItemDetC").hide();
		
		$("#jqxgridStoneCToSale").hide();
		$("#jqxgridAccCToSale").hide();
		$("#jqxgridItemDetCToSale").hide();
		$("#createAss").hide();
});

$("#createAss").on('click',function(){
	$("#assembleCreateSection").show();
	$("#hideAssembleCreateId").show();
	$("#backFromCreate").show();
	
	$("#disassembleCreateId").hide();
	$("#searchDisassemble").hide();
	$("#SearchPageCreateId").hide();
	$("#hideCreateId").hide();
	$("#hideSearchId").hide();
	$("#SearchPageCreateId").hide();
	$("#createAss").hide();
})
// ################## LOV's ###########################
var segmentArr;
$('#segmentS').empty().append('<option value="" selected>--Select--</option>');
var onLoadAPI = function(){
	fieldFilters = {
			"fieldFilters" : {
	           "type":"segment",
	      }
	 }
	postJSON('/OrderExecution/api/v1/onloadDisassembleSearch',JSON.stringify(fieldFilters), function(data) {
		var data = data.payload.allSegments;
		segmentArr = data;
			$.each(data, function(key, val) {
				$('#segmentS').append('<option value="' + val.id + '">' + val.description + '</option>');
			});				
	});	
}
onLoadAPI();
$("#segmentS").on("change",function(){
	fieldFilters = {
			"fieldFilters" : {
	           "type":"jewelType",
	           "segment":{
	        	   "id":$('#segmentS').val()
	        	   }
	           }
	      }
	postJSON('/OrderExecution/api/v1/onloadDisassembleSearch',JSON.stringify(fieldFilters), function(data) {
		var data = data.payload.jeweltypes;
			$('#jwltypeS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data, function(key, val) {
				$('#jwltypeS').append('<option value="' + val.id + '">' + val.description + '</option>');
			});				
	});	
})



// #################################### @ Grid Functions For Original Details In Case of Search ##################
var itemDetailsSearch = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'id','type' : 'int','map':'id'},
			{'name' : 'refNo','type' : 'int','map':'id'},
			{'name' : 'skinPurity','type' : 'float','map':'orderItemSkinPurity>skinPurity'},
			{'name' : 'meltingPurity','type' : 'float','map':'orderItemSkinPurity>meltingPurity'},
			{'name' : 'articleCode','type' : 'string','map':'articleMasterDTO>articleCode'}, 
			{'name' : 'vendorCode','type' : 'string','map':'vendor>description'}, 
			{'name' : 'jwlType','type' : 'string','map':'jewelTypeDTO>description'},
			{'name' : 'pcsOrPairs','type' : 'string','map':'finishedPieces'},
			{'name' : 'subCatDesc','type' : 'string','map':'subCategory>description'},
			{'name' : 'hsnId','type' : 'string','map':'hsnMasterDTO>id'},
			{'name' : 'grossWt','type' : 'float','map':'grossWeight'},
			{'name' : 'netWt','type' : 'float','map':'finishedNetWeight'},
			{'name' : 'wstageWt','type' : 'float','map':'wastageWt'},
			{'name' : 'labour','type' : 'float','map':'labour'}, 
			{'name' : 'costMCTotalCostS','type' : 'float','map':'costMCTotalCost'},
			{'name' : 'costWastageWtS','type' : 'float','map':'costWastageWt'},
			{'name' : 'costCode','type' : 'string'},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridItemDet").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 55,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		pageable:true,
		pagesize:5,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Item Details');
		},
		columns : [
			{'text' : 'Ref No.','datafield' : 'refNo','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Melting Purity','datafield' : 'meltingPurity','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Article code',	'datafield' : 'articleCode','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Vendor code','datafield' : 'vendorCode',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'Jewel Type','datafield' : 'jwlType',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '9%'},
			{'text' : 'Pcs/Pairs','datafield' : 'pcsOrPairs','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Sub.Cat.Desc','datafield' : 'subCatDesc','width' : '9%',sortable : false,editable : false,cellsalign : 'left',align : 'center',cellsformat : 'd3'},
			{'text' : 'HSN ID','datafield' : 'hsnId','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Gr.Wt.',	'datafield' : 'grossWt','width' : '6%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Nt.Wt.','datafield' : 'netWt','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd3'},
			{'text' : 'Cost Code','datafield' : 'costCode','width' : '8%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsrenderer : showCostCode},
			{'text' : 'Wastage wt.','datafield' : 'wstageWt',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '6%',cellsformat : 'd3'},
			{'text' : 'Labour','datafield' : 'labour','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'cost MC Total Cost','datafield' : 'costMCTotalCostS','width' : '6%',hidden :false,sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Wastage Wt.','datafield' : 'costWastageWtS','width' : '8%',hidden :false,sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		]
	});
}

var stoneDetailsSearch = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'id','type' : 'string'},
			{'name' : 'refNo','type' : 'int','map':'id'},
			{'name' : 'suppliedBy','type' : 'string','map':"suppliedBy>id"},
			{'name' : 'serialNumber','type' : 'int','map':"stockSerialNo"},
			{'name' : 'seg','type' : 'string','map':"segmentDTO>description"},
			{'name' : 'mainCat','type' : 'string','map':"category"}, 
			{'name' : 'mainCatId','type' : 'string','map':"category>id"}, 
			{'name' : 'subCatOrShape','type' : 'string','map':"subCategoryDesc"},
			{'name' : 'clarity','type' : 'string','map':"clarity>id"},
			{'name' : 'color','type' : 'string','map':"color>id"},
			{'name' : 'cutGrade','type' : 'string','map':"cutGrade>id"}, 
			{'name' : 'wtRange','type' : 'string','map':"weightRange>id"},
			{'name' : 'pcs','type' : 'int','map':"pieces"},
			{'name' : 'stWt','type' : 'float','map':"weight"}, 
			{'name' : 'uqc','type' : 'string','map':"uom"},
			{'name' : 'stRate','type' : 'float','map':"sellingPrice"},
			{'name' : 'stoneCost','type' : 'float','map':"totalSellingPrice"},
			{'name' : 'costRate','type' : 'float','map':"costPrice"},
			{'name' : 'costAmt','type' : 'float','map':"totalCostPrice"},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStone").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 50,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		pageable:true,
		pagesize:5,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Stones Details');
		},
		columns : [
			{'text' : 'Ref No.','datafield' : 'refNo','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'St Sl.No.','datafield' : 'serialNumber','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supp. By','datafield' : 'suppliedBy','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'St Cat',	'datafield' : 'mainCat','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Sub Cat. Desc','datafield' : 'subCatOrShape',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'St Seg','datafield' : 'seg',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Color','datafield' : 'color','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Wt. Range',	'datafield' : 'wtRange','width' : '6%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'St Pcs','datafield' : 'pcs',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'St Wt.','datafield' : 'stWt','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'Selling Rate','datafield' : 'stRate','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Selling Amt','datafield' : 'stoneCost','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Rate','datafield' : 'costRate','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Amt','datafield' : 'costAmt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		]
	});
}

var accessoryDetailsSearch = function(data){
	var source = {
        localdata: data,
        datatype: "json",
        datafields : [ 
        	{'name' : 'refNo','type' : 'int','map':'id'},
			{'name' : 'serialNumber','type' : 'int','map':"serialNumber"},
			{'name' : 'suppliedBy','type' : 'string','map':"suppliedBy>id"},
			{'name' : 'subCategoryDesc','type' : 'string','map':"subCategoryDesc"},
			{'name' : 'accSubCatOrShapeID','type' : 'string','map':"subCategory>id"},
			{'name' : 'accWt','type' : 'float','map':"weight"}, 
			{'name' : 'accRate','type' : 'float','map':"sellingPrice"},
			{'name' : 'accCost','type' : 'float','map':"totalSellingPrice"},
			{'name' : 'accPcs','type' : 'float','map':"pieces"},
			{'name' : 'accCategry','type' : 'float','map':"catDes"},
			{'name' : 'costAmt','type' : 'float','map':"totalCostPrice"},
			{'name' : 'costRate','type' : 'float','map':"costPrice"},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 40,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		pageable:true,
		pagesize:5,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 12px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Accessory Details');
		},
		
		columns : [
			{'text' : 'Ref No.','datafield' : 'refNo','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc.Sl.No.','datafield' : 'serialNumber','width' : '9%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supp. By','datafield' : 'suppliedBy','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Cat.','datafield' : 'accCategry','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub category Description','datafield' : 'accSubCatOrShapeID',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '13%'},
			{'text' : 'Acc Pcs','datafield' : 'accPcs','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Wt','datafield' : 'accWt','width' : '6%',	sortable : false,editable : false,	cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Acc Selling Rate','datafield' : 'accRate','width' : '11%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Selling Cost',	'datafield' : 'accCost','width' : '11%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Rate','datafield' : 'costRate','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Amt','datafield' : 'costAmt','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		]
	});
}

//#################################### @ Grid Functions For Disassembling TO Sale Details In Case of Search ##################
var itemDetailsSearchToSale = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'id','type' : 'int','map':'DisassembleSaleOrtoDCId'},
			{'name' : 'headerId','type' : 'int','map':'id'},
			{'name' : 'segment','type' : 'string','map':'segmentDTO>description'},
			{'name' : 'jwlType','type' : 'string','map':'jewelTypeDTO>description'},
			{'name' : 'category','type' : 'string','map':'categoryDTO>description'},
			{'name' : 'subCat','type' : 'string','map':'subCatDTO>description'},
			{'name' : 'hsnId','type' : 'int','map':'hsnMasterDTO>id'}, 
			{'name' : 'skinPurity','type' : 'float','map':'skinPurity'},
			{'name' : 'meltingPurity','type' : 'float','map':'meltingPurity'},
			{'name' : 'articleCode','type' : 'string','map':'articleMasterDTO>articleCode'}, 
			{'name' : 'costCode','type' : 'string','map':'costCode'},
			{'name' : 'metalId','type' : 'string','map':'metalSegmentDTO>description'},
			{'name' : 'vendorCode','type' : 'string','map':'vendorDTO>vendorCode'}, 
			{'name' : 'grossWt','type' : 'float','map':'grossWeight'},
			{'name' : 'netWt','type' : 'float','map':'netWeight'},
			{'name' : 'mekingCharges','type' : 'float','map':'sellingMakingCharges'},
			{'name' : 'wastageCharges','type' : 'float','map':'sellingWastageWt'}, 
			{'name' : 'costMCTotalCost','type' : 'float','map':'costMakingCharges'},
			{'name' : 'costWastageWt','type' : 'float','map':'costWastageWt'},
			{'name' : 'pieces','type' : 'int'},
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridItemDetToSale").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 50,
		autoheight : true,
		altRows : true,
		sortable : true,
		theme: 'energyblue',
		columnsresize : true,
		pageable:true,
		pagesize:5,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Item Details');
		},
		columns : [
			{'text' : 'DSM Header Id','datafield' : 'headerId','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'To Sale Detail Id','datafield' : 'id','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Segment','datafield' : 'segment','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Jewel Type','datafield' : 'jwlType',editable : false,cellsalign : 'center',	align : 'center',sortable : true,'width' : '5%'},
			{'text' : 'Category','datafield' : 'category','width' : '5%',cellsalign : 'center',	align : 'center',sortable : true,editable : false},
			{'text' : 'Sub Cat.','datafield' : 'subCat','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Article code',	'datafield' : 'articleCode','width' : '5%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'HSN ID','datafield' : 'hsnId','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Melting Purity','datafield' : 'meltingPurity','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Code','datafield' : 'costCode',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '4%'},
			{'text' : 'Metal Type Id','datafield' : 'metalId','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Gr.Wt.',	'datafield' : 'grossWt','width' : '5%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Nt.Wt.','datafield' : 'netWt','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd3'},
			{'text' : 'Pcs','datafield' : 'pieces','width' : '3%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Making Selling charges','datafield' : 'mekingCharges',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '8%',cellsformat : 'd2'},
			{'text' : 'Wtage.Selling Charges','datafield' : 'wastageCharges','width' : '8%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Cost MC Total Cost','datafield' : 'costMCTotalCost','width' : '7%',hidden :false,sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Wastage Wt.','datafield' : 'costWastageWt','width' : '7%',hidden :false,sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		]
	});
}

var stoneDetailsSearchToSale = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'id','type' : 'int',"map":'disassembleStoneId'},
			{'name' : 'suppliedBy','type' : 'int',"map":'suppliedBy'},
			{'name' : 'serialNumber','type' : 'int','map':"stoneSrlNo"},
			{'name' : 'seg','type' : 'string','map':"stoneSegmentDTO>description"},
			{'name' : 'mainCat','type' : 'string','map':"stoneCategoryDTO>description"}, 
			{'name' : 'mainCatId','type' : 'int','map':"stoneCategoryDTO>id"}, 
			{'name' : 'subCatOrShape','type' : 'string','map':"stoneSubCatDTO>description"},
			{'name' : 'subCatOrShapeId','type' : 'string','map':"stoneSubCatDTO>id"},
			{'name' : 'clarity','type' : 'string','map':"clarity"},
			{'name' : 'color','type' : 'string','map':"color"},
			{'name' : 'cutGrade','type' : 'string','map':"cutGrade"}, 
			{'name' : 'wtRange','type' : 'string','map':"weightCostRange"},
			{'name' : 'pcs','type' : 'int','map':"pieces"},
			{'name' : 'stWt','type' : 'float','map':"stoneWt"}, 
			{'name' : 'uqc','type' : 'string','map':"uom"},
			{'name' : 'stRate','type' : 'float','map':"stoneSellingRate"},
			{'name' : 'stoneCost','type' : 'float','map':"stoneSellingAmount"},
			{'name' : 'costRate','type' : 'float','map':"stoneCostRate"},
			{'name' : 'costAmt','type' : 'float','map':"stoneCostAmount"},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStoneToSale").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 50,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		pageable:true,
		pagesize:5,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Stones Details');
		},
		columns : [
			{'text' : 'Ref No.','datafield' : 'id','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'St Sl.No.','datafield' : 'serialNumber','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supp. By','datafield' : 'suppliedBy','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'St Cat',	'datafield' : 'mainCat','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Sub Cat. Desc','datafield' : 'subCatOrShape',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'St Seg','datafield' : 'seg',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Color','datafield' : 'color','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Wt. Range',	'datafield' : 'wtRange','width' : '6%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'St Pcs','datafield' : 'pcs',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'St Wt.','datafield' : 'stWt','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'Selling Rate','datafield' : 'stRate','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Selling Amt','datafield' : 'stoneCost','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Rate','datafield' : 'costRate','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Amt','datafield' : 'costAmt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		]
	});
}

var accessoryDetailsSearchToSale = function(data){
	var source = {
        localdata: data,
        datatype: "json",
        datafields : [ 
        	{'name' : 'id','type' : 'int',"map":'disassembleAccId'},
        	{'name' : 'accPieces','type' : 'int'},
			{'name' : 'serialNumber','type' : 'int','map':'accSrlNo'},
			{'name' : 'suppliedBy','type' : 'string','map':"suppliedBy"},
			{'name' : 'category','type' : 'string','map':"categoryDTO>description"},
			{'name' : 'subCategoryDesc','type' : 'string','map':"subCategoryDTO>id"},
			{'name' : 'accSubCatOrShapeID','type' : 'string','map':"subCategoryDTO>description"},
			{'name' : 'accWt','type' : 'float','map':"accWt"}, 
			{'name' : 'accRate','type' : 'float','map':"accSellingRate"},
			{'name' : 'accCost','type' : 'float','map':"accSellingAmount"},
			{'name' : 'costRate','type' : 'float','map':"accCostRate"},
			{'name' : 'costAmt','type' : 'float','map':"accCostAmount"},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAccToSale").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 40,
		theme: 'energyblue',
		autoheight : true,
		altRows : true,
		columnsresize : true,
		pageable:true,
		pagesize:5,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 12px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Accessory Details');
		},
		
		columns : [
			{'text' : 'Ref No.','datafield' : 'id','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc.Sl.No.','datafield' : 'serialNumber','width' : '9%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supplied By','datafield' : 'suppliedBy','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Category','datafield' : 'category','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub category Description','datafield' : 'accSubCatOrShapeID',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '14%'},
			{'text' : 'Acc Wt','datafield' : 'accWt','width' : '9%',	sortable : false,editable : false,	cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Acc Pcs','datafield' : 'accPieces','width' : '9%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'Acc Selling Rate','datafield' : 'accRate','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Selling Amt','datafield': 'accCost','width' : '9%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Rate','datafield' : 'costRate','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Amt','datafield' : 'costAmt','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		]
	});
}

//#################################### @ Grid Functions For Disassembling TO DC Details In Case of Search ##################
var itemDetailsSearchToDc = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'id','type' : 'int',"map":'DisassembleSaleOrtoDCId'},
			{'name' : 'headerId','type' : 'int',"map":'id'},
			{'name' : 'segment','type' : 'string','map':'segmentDTO>description'},
			{'name' : 'jwlType','type' : 'string','map':'jewelTypeDTO>description'},
			{'name' : 'category','type' : 'string','map':'categoryDTO>description'},
			{'name' : 'subCat','type' : 'string','map':'subCatDTO>description'},
			{'name' : 'hsnId','type' : 'string','map':'hsnMasterDTO>id'}, 
			{'name' : 'skinPurity','type' : 'float','map':'skinPurity'},
			{'name' : 'pcs','type' : 'int','map':'pieces'},
			{'name' : 'meltingPurity','type' : 'float','map':'meltingPurity'},
			{'name' : 'articleCode','type' : 'string','map':'articleMasterDTO>articleCode'}, 
			{'name' : 'costCode','type' : 'string','map':'costCode'},
			{'name' : 'metalId','type' : 'string','map':'metalSegmentDTO>description'},
			{'name' : 'vendorCode','type' : 'string','map':'vendorDTO>vendorCode'}, 
			{'name' : 'grossWt','type' : 'float','map':'grossWeight'},
			{'name' : 'netWt','type' : 'float','map':'netWeight'},
			{'name' : 'mekingCharges','type' : 'float','map':'sellingMakingCharges'},
			{'name' : 'wastageCharges','type' : 'float','map':'sellingWastageWt'}, 
			{'name' : 'costMCTotalCostD','type' : 'float','map':'costMakingCharges'},
			{'name' : 'costWastageWtD','type' : 'float','map':'costWastageWt'},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridItemDetToDc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 55,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		pagesize:5,
		columnsresize : true,
		sortable : true,
		pageable:true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Item Details');
		},
		columns : [
			{'text' : 'DSM Header Id','datafield' : 'headerId','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'To DC Detail Id','datafield' : 'id','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Segment','datafield' : 'segment','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Jewel Type','datafield' : 'jwlType',editable : false,cellsalign : 'center',	align : 'center',sortable : true,'width' : '7%'},
			{'text' : 'Category','datafield' : 'category','width' : '5%',cellsalign : 'center',	align : 'center',sortable : true,editable : false},
			{'text' : 'Sub Cat.','datafield' : 'subCat','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Article code',	'datafield' : 'articleCode','width' : '5%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'HSN ID','datafield' : 'hsnId','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '4%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Pieces','datafield' : 'pcs','width' : '3%',cellsalign : 'center',	align : 'center',sortable : false},
			{'text' : 'Melting Purity','datafield' : 'meltingPurity','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Code','datafield' : 'costCode',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '8%'},
			{'text' : 'Metal Type Id','datafield' : 'metalId','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Gr.Wt.',	'datafield' : 'grossWt','width' : '5%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Nt.Wt.','datafield' : 'netWt','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'Making Selling charges','datafield' : 'mekingCharges',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '10%',cellsformat : 'd2'},
			{'text' : 'Wtage.Selling Charges','datafield' : 'wastageCharges','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Cost MC Total Cost','datafield' : 'costMCTotalCostD','width' : '5%',hidden :false,sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Wastage Wt.','datafield' : 'costWastageWtD','width' : '5%',hidden :false,sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		]
	});
}

var stoneDetailsSearchToDc = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'id','type' : 'int','map':'disassembleStoneId'},
			{'name' : 'suppliedBy','type' : 'string',"map":'suppliedBy'},
			{'name' : 'serialNumber','type' : 'string','map':"stoneSrlNo"},
			{'name' : 'seg','type' : 'string','map':"stoneSegmentDTO>description"},
			{'name' : 'mainCat','type' : 'string','map':"stoneCategoryDTO>description"}, 
			{'name' : 'mainCatId','type' : 'string','map':"stoneCategoryDTO>id"}, 
			{'name' : 'subCatOrShape','type' : 'string','map':"stoneSubCatDTO>description"},
			{'name' : 'subCatOrShapeId','type' : 'string','map':"stoneSubCatDTO>id"},
			{'name' : 'clarity','type' : 'string','map':"clarity"},
			{'name' : 'color','type' : 'string','map':"color"},
			{'name' : 'cutGrade','type' : 'string','map':"cutGrade"}, 
			{'name' : 'wtRange','type' : 'string','map':"weightCostRange"},
			{'name' : 'pcs','type' : 'int','map':"pieces"},
			{'name' : 'stWt','type' : 'float','map':"stoneWt"}, 
			{'name' : 'uqc','type' : 'string','map':"uom"},
			{'name' : 'stRate','type' : 'float','map':"stoneSellingRate"},
			{'name' : 'stoneCost','type' : 'float','map':"stoneSellingAmount"},
			{'name' : 'costRate','type' : 'float','map':"stoneCostRate"},
			{'name' : 'costAmt','type' : 'float','map':"stoneCostAmount"},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStoneToDc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 40,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		theme: 'energyblue',
		pagesize:5,
		pageable:true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Stones Details');
		},
		columns : [
			{'text' : 'Ref No.','datafield' : 'id','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'St Sl.No.','datafield' : 'serialNumber','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supp. By','datafield' : 'suppliedBy','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'St Cat',	'datafield' : 'mainCat','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Sub Cat. Desc','datafield' : 'subCatOrShape',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'St Seg','datafield' : 'seg',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Color','datafield' : 'color','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Wt. Range',	'datafield' : 'wtRange','width' : '6%',sortable : false,	editable : false,cellsalign : 'rigth',	align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'St Pcs','datafield' : 'pcs',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'St Wt.','datafield' : 'stWt','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'Selling Rate','datafield' : 'stRate','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Selling Amt','datafield' : 'stoneCost','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Rate','datafield' : 'costRate','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Amt','datafield' : 'costAmt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		]
	});
}

var accessoryDetailsSearchToDc = function(data){
	var source = {
        localdata: data,
        datatype: "json",
        datafields : [ 
        	{'name' : 'id','type' : 'int','map':'disassembleAccId'},
        	{'name' : 'accPieces','type' : 'int'},
			{'name' : 'serialNumber','type' : 'int','map':'accSrlNo'},
			{'name' : 'suppliedBy','type' : 'string','map':"suppliedBy"},
			{'name' : 'category','type' : 'string','map':"categoryDTO>description"},
			{'name' : 'subCategoryDesc','type' : 'string','map':"subCategoryDTO>id"},
			{'name' : 'accSubCatOrShapeID','type' : 'string','map':"subCategoryDTO>description"},
			{'name' : 'accWt','type' : 'float','map':"accWt"}, 
			{'name' : 'accRate','type' : 'float','map':"accSellingRate"},
			{'name' : 'accCost','type' : 'float','map':"accSellingAmount"},
			{'name' : 'costRate','type' : 'float','map':"accCostRate"},
			{'name' : 'costAmt','type' : 'float','map':"accCostAmount"},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAccToDc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 50,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		pagesize:5,
		pageable:true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 12px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Accessory Details');
		},
		
		columns : [
			{'text' : 'Ref No.','datafield' : 'id','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc.Sl.No.','datafield' : 'serialNumber','width' : '9%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supplied By','datafield' : 'suppliedBy','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Category','datafield' : 'category','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub category Description','datafield' : 'accSubCatOrShapeID',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '10%'},
			{'text' : 'Acc Wt','datafield' : 'accWt','width' : '9%',	sortable : false,editable : false,	cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Acc Pcs','datafield' : 'accPieces','width' : '9%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'Acc Selling Rate','datafield' : 'accRate','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Selling Amt','datafield': 'accCost','width' : '9%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Rate','datafield' : 'costRate','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Amt','datafield' : 'costAmt','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		]
	});
}

$("#panelId").hide();
$("#toggle1").on('click', function(){
	$("#panel1").slideToggle();
});

$("#toggle2").on('click', function(){
	$("#panel2").slideToggle();
});

$("#toggle3").on('click', function(){
	$("#panel3").slideToggle();
});

$("#toggleA").on('click', function(){
	$("#assemblePanel1").slideToggle();
});

$("#toggleV").on('click', function(){
	$("#assembleViewPanel").slideToggle();
});

// ############################ @ Search Functionality ###############
// Assemble Search Field Filters
var assembleSearchFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var assmbleDisamble = $("#assmbleDisamble").val();
	var segmentS = $("#segmentS").val();
	var jwltypeS = $("#jwltypeS").val();
	var assembleIdS = $("#assembleIdS").val();
	var stockNoS = $("#stockNoS").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (assmbleDisamble != "" && assmbleDisamble != null) {
		fieldFilters.fieldFilters["ASM"] = (assmbleDisamble == "assemble") ? true : false;
	}
	if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["segmentCode"] = segmentS;
	}
	if (jwltypeS != "" && jwltypeS != null) {
		fieldFilters.fieldFilters["jewelTypeCode"] = jwltypeS;
	}
	if (stockNoS != "" && stockNoS != null) {
		fieldFilters.fieldFilters["stockCode"] = stockNoS;
	}
	if (assembleIdS != "" && assembleIdS != null) {
		fieldFilters.fieldFilters["stockCode"] = assembleIdS;
	}
	return fieldFilters;
}

var stoneViewArr = [];
var accViewArr = [];
var asmSearch = [];
$("#search").on("click",function(){
	
	var assmbleDisamble = $("#assmbleDisamble").val();
    var fromDate = $("#fromDateS").val();
    var toDate  = $("#toDateS").val();
     
    if((assmbleDisamble == "" || assmbleDisamble == null)||(fromDate == "" || fromDate == null)||(toDate == "" || toDate == null)){
    	$.growl.error({
			 message:"Please fill all the Mandatory Feilds!",
			duration : 10000
		});
    	return false;
    }
    if($("#assmbleDisamble").val() =="disassemble"){
    $("#panelId").show();
	$("#jqxgridStone").show();
	$("#jqxgridAcc").show();
	$("#jqxgridItemDet").show();
	
	$("#jqxgridStoneToSale").show();
	$("#jqxgridAccToSale").show();
	$("#jqxgridItemDetToSale").show();
	
	$("#jqxgridStoneToDc").show();
	$("#jqxgridAccToDc").show();
	$("#jqxgridItemDetToDc").show();
	
	$("#assemblePanelId").hide();
	
	$("#jqxgridAssembleItemDet").hide();
	$("#jqxgridAssembleStone").hide();
	$("#jqxgridAssembleAcc").hide();
	
	 fieldFilters = {
				"fieldFilters" : {
		           "fromDate":$("#fromDateS").val(),
		           "toDate":$("#toDateS").val(),
		      }
		 }
	 
	postJSON("/OrderExecution/api/v1/disassembleSearchList",JSON.stringify(assembleSearchFieldFilters()),function(response){
		
		var stoneArr;
		var accessories;
		var accessoriesArr = [];
		var stoneObjArr = [];
		
		if(response.resCode == 1){
			
		var data= response.payload;
		
		// for Original Details 
		$.each(data.OriginalStockItemDtoList,function(v,k){
			
			if(typeof (k.stones) != "undefined"){
				stoneArr=(k.stones)
			}
			
			if(typeof (k.accessories) != "undefined"){
				accessories=(k.accessories)
			}
			
			$.each(stoneArr,function(v,k){
				stoneObjArr.push(k);
			});
			
			$.each(accessories,function(v,k){
				accessoriesArr.push(k);
			});
		});
		
		stoneDetailsSearch(stoneObjArr);
		accessoryDetailsSearch(accessoriesArr);
		itemDetailsSearch(data.OriginalStockItemDtoList);
		
		// for Disassemble From Sale 
		
		var stoneToSale;
		var accessoriesToSale;
		var stoneObjArrToSale = [];
		var accessoriesArrToSale = [];
		
            $.each(data.toSaleAssembleDisassembleDetailDTOList,function(v,k){
			
			if(typeof (k.assembleDisassembleStoneDtoList) != "undefined"){
				stoneToSale=(k.assembleDisassembleStoneDtoList)
			}
			
			if(typeof (k.assembleDisassembleAccDtoList) != "undefined"){
				accessoriesToSale=(k.assembleDisassembleAccDtoList)
			}
			
			$.each(stoneToSale,function(v,k){
				stoneObjArrToSale.push(k);
			});
			
			$.each(accessoriesToSale,function(v,k){
				accessoriesArrToSale.push(k);
			});
		});
            
		stoneDetailsSearchToSale(stoneObjArrToSale);
		accessoryDetailsSearchToSale(accessoriesArrToSale);
		itemDetailsSearchToSale(data.toSaleAssembleDisassembleDetailDTOList);
		
		// for Disassemble To DC 
		
		var stoneToDC;
		var accessoriesToDC;
		var stoneObjArrToDC = [];
		var accessoriesArrToDC = [];
		
	        $.each(data.toDCAssembleDisassembleDetailDTOList,function(v,k){
			
			if(typeof (k.assembleDisassembleStoneDtoList) != "undefined"){
				stoneToDC=(k.assembleDisassembleStoneDtoList)
			}
			
			if(typeof (k.assembleDisassembleAccDtoList) != "undefined"){
				accessoriesToDC=(k.assembleDisassembleAccDtoList)
			}
			
			$.each(stoneToDC,function(v,k){
				stoneObjArrToDC.push(k);
			});
			
			$.each(accessoriesToDC,function(v,k){
				accessoriesArrToDC.push(k);
			});
		});
		
		stoneDetailsSearchToDc(stoneObjArrToDC);
		accessoryDetailsSearchToDc(accessoriesArrToDC);
		itemDetailsSearchToDc(data.toDCAssembleDisassembleDetailDTOList);
		
		}else if(response.resCode == 2){
			
			stoneDetailsSearch();
			accessoryDetailsSearch();
			itemDetailsSearch();
			
			stoneDetailsSearchToDc();
			accessoryDetailsSearchToDc();
			itemDetailsSearchToDc();
			
			stoneDetailsSearchToSale();
			accessoryDetailsSearchToSale();
			itemDetailsSearchToSale();
			
			$.growl.error({
				 message:response.mesgStr,
				duration : 10000
			});
			return false
		}else{
			$.growl.error({
				 message:response.mesgStr,
				duration : 10000
			});
			return false
		}
	});
	}else{
			 postJSON("/OrderExecution/api/v1/disassembleSearchList",JSON.stringify(assembleSearchFieldFilters()),function(response){
					var stoneArrS;
					var accessoriesS;
					var accessoriesArrS = [];
					var stoneObjArrS = [];
					
				 if(response.resCode == "1"){
					 $("#panelId").hide();
						$("#jqxgridStone").hide();
						$("#jqxgridAcc").hide();
						$("#jqxgridItemDet").hide();
						
						$("#jqxgridStoneToSale").hide();
						$("#jqxgridAccToSale").hide();
						$("#jqxgridItemDetToSale").hide();
						
						$("#jqxgridStoneToDc").hide();
						$("#jqxgridAccToDc").hide();
						$("#jqxgridItemDetToDc").hide();
						
						$("#assemblePanelId").show();
						
						$("#jqxgridAssembleItemDet").show();
						$("#jqxgridAssembleStone").show();
						$("#jqxgridAssembleAcc").show();
						
						var data= response.payload;
						asmSearch = response.payload;
						
						// for Original Details 
						$.each(data.AssembleDetails,function(v,k){
							
							if(typeof (k.assembleDisassembleStoneDtoList) != "undefined"){
								stoneArrS=(k.assembleDisassembleStoneDtoList)
							}
							
							if(typeof (k.assembleDisassembleAccDtoList) != "undefined"){
								accessoriesS=(k.assembleDisassembleAccDtoList)
							}
							
							$.each(stoneArrS,function(v,k){
								stoneObjArrS.push(k);
							});
							
							$.each(accessoriesS,function(v,k){
								accessoriesArrS.push(k);
							});
						});
						assembleStoneDetailsSearch(stoneObjArrS);
						assembleAccDetailsSearch(accessoriesArrS);
						assembleItemDetailsSearch(data.AssembleDetails);
				  }else{
					  assembleStoneDetailsSearch();
					  assembleAccDetailsSearch();
					  assembleItemDetailsSearch();
				  }
			 });
		}
});

// ######################## @ On-Click On Clear Reset Func #############
$("#clearAll").on("click",function(){
	 $('#disassembleSearchFunc').trigger("reset");
	    $("#panelId").hide();
		$("#jqxgridStone").hide();
		$("#jqxgridAcc").hide();
		$("#jqxgridItemDet").hide();
});

$("#clearCreate").on("click",function(){
	    redirect();
})


//######################################### Assemble Search Grids Started ########################################3
var assembleItemDetailsSearch = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'id','type' : 'int'},
			{'name' : 'segment','type' : 'string','map':'segmentDTO>description'},
			{'name' : 'jwlType','type' : 'string','map':'jewelTypeDTO>description'},
			{'name' : 'category','type' : 'string','map':'categoryDTO>description'},
			{'name' : 'subCat','type' : 'string','map':'subCatDTO>description'},
			{'name' : 'hsnId','type' : 'string','map':'hsnMasterDTO>hsnDescription'}, 
			{'name' : 'skinPurity','type' : 'float','map':'skinPurity'},
			{'name' : 'meltingPurity','type' : 'float','map':'meltingPurity'},
			{'name' : 'articleCode','type' : 'string','map':'articleMasterDTO>articleCode'}, 
			{'name' : 'costCode','type' : 'string','map':'costCode'},
			{'name' : 'metalId','type' : 'string','map':'metalSegmentDTO>description'},
			{'name' : 'vendorCode','type' : 'string','map':'vendorDTO>vendorCode'}, 
			{'name' : 'grossWt','type' : 'float','map':'grossWeight'},
			{'name' : 'netWt','type' : 'float','map':'netWeight'},
			{'name' : 'mekingCharges','type' : 'float','map':'sellingMakingCharges'},
			{'name' : 'wastageCharges','type' : 'float','map':'sellingWastageWt'}, 
			{'name' : 'costMCTotalCostD','type' : 'float','map':'costMakingCharges'},
			{'name' : 'costWastageWtD','type' : 'float','map':'costWastageWt'},
			{'name' : 'actionId','type' : 'int','map':'id'},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAssembleItemDet").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		theme: 'energyblue',
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [
			{'text' : 'Ref No.','datafield' : 'id','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Seg','datafield' : 'segment','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Jewel Type','datafield' : 'jwlType',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%'},
			{'text' : 'Category','datafield' : 'category','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Sub Cat.','datafield' : 'subCat','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Article code',	'datafield' : 'articleCode','width' : '5%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'HSN ID','datafield' : 'hsnId','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Melting Purity','datafield' : 'meltingPurity','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Code','datafield' : 'costCode',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '5%'},
			{'text' : 'Metal Type Id','datafield' : 'metalId','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Gr.Wt.',	'datafield' : 'grossWt','width' : '5%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Nt.Wt.','datafield' : 'netWt','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd3'},
			{'text' : 'Making Selling charges','datafield' : 'mekingCharges',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '8%',cellsformat : 'd2'},
			{'text' : 'Wastage.Selling Charges','datafield' : 'wastageCharges','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Cost MC Total Cost','datafield' : 'costMCTotalCostD','width' : '6%',hidden :false,sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Wastage Wt.','datafield' : 'costWastageWtD','width' : '6%',hidden :false,sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : '',datafield : 'actionId',editable : false,cellsrenderer : viewDisassembleDet,cellsalign : 'center',align : 'center','width' : '3%'} 
			]
	});
}


var viewDisassembleDet = function(row, column, value) {
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" type="button" id='
			+ row
			+ ' onclick="viewDisassembleDetails('
			+ value
			+ ')"/><i class="fa fa-eye fa-sm"></i></a>'
}

var viewId ;
var viewDetArr = {};
var viewDisassembleDetails = function(id){
	$("#hideSearchId").hide();
	$("#hideCreateId").hide();
	$("#hideAssembleCreateId").hide();
	$("#searchDisassemble").hide();
	$("#backFromAssemCreate").hide();
	$("#SearchPageCreateId").hide();
	$("#createAss").hide();
	$("#assemblePanelId").hide();
	$("#hideAssSearch").hide();
	
	$("#hideAssembleViewId").show();
	$("#assembleViewSection").show();
	$("#backFromCreate").show();
	$("#assemblePanelViewId").show();
	
	var assembleSVwDetails = $('#jqxgridAssembleItemDet').jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridAssembleItemDet").jqxGrid('getselectedrowindex');	

	viewDetArr = {};
	$.each(asmSearch.AssembleDetails,function(k,v){
		if(id == v.id){
			viewDetArr = asmSearch.AssembleDetails[selectedrowindex];
		}
	});
	postJSON('/OrderExecution/api/v1/getAssembleDetails', JSON.stringify(viewDetArr), function(data) {
		var viewHeaderDet = data.payload.AsmDetails;
		var viewStoneDet = [];
		var viewAccDet = [];
		var stoneArrV = [];
		var accessoriesV = [];
		console.log(viewHeaderDet);
		$.each(viewHeaderDet,function(v,k){
			console.log(k);
			if(k.type =="Assemble"){
				if(typeof (k.assembleDisassembleStoneDtoList) != "undefined"){
					stoneArrV=(k.assembleDisassembleStoneDtoList)
				}
				
				if(typeof (k.assembleDisassembleAccDtoList) != "undefined"){
					accessoriesV=(k.assembleDisassembleAccDtoList)
				}
			} if(k.type == "SalesReturn"){
				if(typeof (k.sbRetStones) != "undefined"){
					stoneArrV=(k.sbRetStones)
				}
				
				if(typeof (k.sbRetAccessories) != "undefined"){
					accessoriesV=(k.sbRetAccessories)
				}
			}if(k.type == "SplitPB"){
				if(typeof (k.pbStoneList) != "undefined"){
					stoneArrV=(k.pbStoneList)
				}
				
				if(typeof (k.pbAccList) != "undefined"){
					accessoriesV=(k.pbAccList)
				}
			}
			console.log(stoneArrV);
			$.each(stoneArrV,function(v,k){
				viewStoneDet.push(k);
			});
			
			$.each(accessoriesV,function(v,k){
				viewAccDet.push(k);
			});
		});
		
		assembleItemDetailsView(viewHeaderDet);
		assembleStoneDetailsView(viewStoneDet);
		assembleAccDetailsView(viewAccDet);
	});
}

var assembleStoneDetailsSearch = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'id','type' : 'int','map':'assembleDisassembleDetailId'},
			{'name' : 'suppliedBy','type' : 'string',"map":'suppliedBy'},
			{'name' : 'serialNumber','type' : 'string','map':"stoneSrlNo"},
			{'name' : 'seg','type' : 'string','map':"stoneSegmentDTO>description"},
			{'name' : 'mainCat','type' : 'string','map':"stoneCategoryDTO>description"}, 
			{'name' : 'mainCatId','type' : 'string','map':"stoneCategoryDTO>id"}, 
			{'name' : 'subCatOrShape','type' : 'string','map':"stoneSubCatDTO>description"},
			{'name' : 'subCatOrShapeId','type' : 'string','map':"stoneSubCatDTO>id"},
			{'name' : 'clarity','type' : 'string','map':"clarity"},
			{'name' : 'color','type' : 'string','map':"color"},
			{'name' : 'cutGrade','type' : 'string','map':"cutGrade"}, 
			{'name' : 'wtRange','type' : 'string','map':"weightCostRange"},
			{'name' : 'pcs','type' : 'int','map':"pieces"},
			{'name' : 'stWt','type' : 'float','map':"stoneWt"}, 
			{'name' : 'uqc','type' : 'string','map':"uom"},
			{'name' : 'stRate','type' : 'float','map':"stoneSellingRate"},
			{'name' : 'stoneCost','type' : 'float','map':"stoneSellingAmount"},
			{'name' : 'costRate','type' : 'float','map':"stoneCostRate"},
			{'name' : 'costAmt','type' : 'float','map':"stoneCostAmount"},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAssembleStone").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 50,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		theme: 'energyblue',
	
		columns : [
			{'text' : 'Ref No.','datafield' : 'id','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'St Sl.No.','datafield' : 'serialNumber','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supp. By','datafield' : 'suppliedBy','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'St Cat',	'datafield' : 'mainCat','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Sub Cat. Desc','datafield' : 'subCatOrShape',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'St Seg','datafield' : 'seg',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Color','datafield' : 'color','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Wt. Range',	'datafield' : 'wtRange','width' : '6%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'St Pcs','datafield' : 'pcs',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'St Wt.','datafield' : 'stWt','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'Selling Rate','datafield' : 'stRate','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Selling Amt','datafield' : 'stoneCost','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Rate','datafield' : 'costRate','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Amt','datafield' : 'costAmt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		]
	});
}

var assembleAccDetailsSearch = function(data){
	var source = {
        localdata: data,
        datatype: "json",
        datafields : [ 
        	{'name' : 'id','type' : 'int','map':'assembleDisassembleDetailId'},
        	{'name' : 'accPieces','type' : 'int'},
			{'name' : 'serialNumber','type' : 'int','map':'accSrlNo'},
			{'name' : 'suppliedBy','type' : 'string','map':"suppliedBy"},
			{'name' : 'category','type' : 'string','map':"categoryDTO>description"},
			{'name' : 'subCategoryDesc','type' : 'string','map':"subCategoryDTO>id"},
			{'name' : 'accSubCatOrShapeID','type' : 'string','map':"subCategoryDTO>description"},
			{'name' : 'accWt','type' : 'float','map':"accWt"}, 
			{'name' : 'accRate','type' : 'float','map':"accSellingRate"},
			{'name' : 'accCost','type' : 'float','map':"accSellingAmount"},
			{'name' : 'costRate','type' : 'float','map':"accCostRate"},
			{'name' : 'costAmt','type' : 'float','map':"accCostAmount"},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAssembleAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 50,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		theme: 'energyblue',
		
		columns : [
			{'text' : 'Ref No.','datafield' : 'id','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc.Sl.No.','datafield' : 'serialNumber','width' : '9%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supplied By','datafield' : 'suppliedBy','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Category','datafield' : 'category','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub category Description','datafield' : 'accSubCatOrShapeID',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '10%'},
			{'text' : 'Acc Wt','datafield' : 'accWt','width' : '9%',	sortable : false,editable : false,	cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Acc Pcs','datafield' : 'accPieces','width' : '9%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'Acc Selling Rate','datafield' : 'accRate','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Selling Amt','datafield': 'accCost','width' : '9%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Rate','datafield' : 'costRate','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Amt','datafield' : 'costAmt','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		]
	});
}



//######################################### Assemble View Grids Started ########################################
var assembleItemDetailsView = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'dId','type' : 'int','map':'DisassembleSaleOrtoDCId'},//DIS
			{'name' : 'pId','type' : 'int','map':'purchaseBillId'},//PB
			{'name' : 'sId','type' : 'int','map':'sbRetHeaderId'},//SR
			
			{'name' : 'segmentDTO','type' : 'string','map':'segmentDTO>description'}, //DIS
			{'name' : 'metalSegment','type' : 'string','map':'metalSegment>description'}, //SR
			{'name' : 'segment','type' : 'string','map':'segment>description'},// PB
			
			{'name' : 'jwlType','type' : 'string','map':'jewelTypeDTO>description'}, // DIS
			{'name' : 'jType','type' : 'string','map':'jewelType>name'},// SR
			{'name' : 'jewelType','type' : 'string','map':'jewelType>description'},//PB
			
			{'name' : 'dCat','type' : 'string','map':'categoryDTO>description'}, // DIS
			{'name' : 'pCat','type' : 'string','map':'categoryDTO>description'},// SR
			{'name' : 'sCat','type' : 'string','map':'categoryDTO>description'},//PB
			
			{'name' : 'dSubCat','type' : 'string','map':'subCatDTO>description'}, // DIS
			{'name' : 'pSubCat','type' : 'string','map':'subCatDTO>description'},// SR
			{'name' : 'sSubCat','type' : 'string','map':'subCatDTO>description'},//PB
			
			{'name' : 'category','type' : 'string','map':'categoryDTO>description'},//DIS
			{'name' : 'subCat','type' : 'string','map':'subCatDTO>description'},
			{'name' : 'hsnId','type' : 'string','map':'hsnMasterDTO>id'},
			
			{'name' : 'skinPurity','type' : 'float','map':'skinPurity'},
			{'name' : 'purity','type' : 'float','map':'purity'},
			
			{'name' : 'meltingPurity','type' : 'float','map':'meltingPurity'},
			{'name' : 'mPurity','type' : 'float','map':'purity'},
			
			{'name' : 'articleCode','type' : 'string','map':'articleMasterDTO>articleCode'}, 
			{'name' : 'costCode','type' : 'string','map':'costCode'},
			{'name' : 'metalId','type' : 'string','map':'metalSegmentDTO>description'},
			{'name' : 'vendorCode','type' : 'string','map':'vendorDTO>vendorCode'}, 
			{'name' : 'grossWt','type' : 'float'},
			{'name' : 'netWt','type' : 'float'},
			
			{'name' : 'grossWeight','type' : 'float'},
			{'name' : 'netWeight','type' : 'float'},
			
			{'name' : 'mekingCharges','type' : 'float','map':'sellingMakingCharges'},
			{'name' : 'mcCharges','type' : 'float','map':'makingCharges'},
			
			{'name' : 'wastageCharges','type' : 'float','map':'sellingWastageWt'}, 
			{'name' : 'wastageWeight','type' : 'float','map':'wastageWeight'}, 
			
			{'name' : 'costMCTotalCostD','type' : 'float','map':'costMakingCharges'},
			
			{'name' : 'costWastageWtD','type' : 'float','map':'costWastageWt'},
			
			
			{'name':'type','type':'string'},
			{'name':'segm','type':'string'},
			{'name':'refNum','type':'int'},
			{'name':'jewel','type':'string'},
			{'name':'subCategory','type':'string'},
			{'name':'gWt','type':'float'},
			{'name':'nWt','type':'float'},
			{'name':'cat','type':'string'},
			{'name':'sPurity','type':'float'},
			{'name':'meltPurity','type':'float'},
			{'name' : 'wCharges','type' : 'float'}, 
			{'name' : 'mCharges','type' : 'float'}, 
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewItemDetGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		theme: 'energyblue',
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [
			{'text' : 'type','datafield' : 'type','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : 'DIS Seg','datafield' : 'segmentDTO','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : 'SR Seg','datafield' : 'metalSegment','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden :true},
			{'text' : 'PB Seg','datafield' : 'segment','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden : true},

			{'text' : '','datafield' : 'dId','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'pId','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'sId','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			
			{'text' : '','datafield' : 'jwlType','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'jType','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'jewelType','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			
			{'text' : '','datafield' : 'dCat','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'pCat','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'sCat','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			
			{'text' : '','datafield' : 'dSubCat','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'pSubCat','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'sSubCat','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			
			{'text' : '','datafield' : 'grossWt','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'grossWeight','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},

			{'text' : '','datafield' : 'netWt','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'netWeight','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			
			{'text' : '','datafield' : 'purity','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'skinPurity','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			
			{'text' : '','datafield' : 'mPurity','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'meltingPurity','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			
			{'text' : '','datafield' : 'mekingCharges','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'mcCharges','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			
			{'text' : '','datafield' : 'wastageCharges','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			{'text' : '','datafield' : 'wastageWeight','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},
			
			{'text' : 'Ref No.','datafield' : 'refNum','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',
				cellsrenderer: function(row, column, value){
				    var refNumb ;
					var type = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var dId = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'dId');
					var pId = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'pId');
					var sId = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'sId');
					
					if(type == "Assemble"){refNumb = dId;}
					if(type == "SalesReturn"){refNumb = sId;}
					if(type == "SplitPB"){refNumb = pId;}
					
		      		return "<div align='center'style='margin-top:8px;'>" + refNumb + "</div>";
		      	}  
			},
			{'text' : 'Seg','datafield' : 'segm','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',
				 cellsrenderer: function(row, column, value){
					    var segment ;
						var type = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'type');
						var DisSeg = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'segmentDTO');
						var SRSeg = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'metalSegment');
						var PBSeg = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'segment');
						
						if(type == "Assemble"){segment = DisSeg;}
						if(type == "SalesReturn"){segment = SRSeg;}
						if(type == "SplitPB"){segment = PBSeg;}
						
						if(segment != null){
				      		return "<div align='center'style='margin-top:8px;'>" + segment + "</div>";
						}else{
				      		return "<div align='center'style='margin-top:8px;'></div>";
						}
			      	}  
			},
			{'text' : 'Jewel Type','datafield' : 'jewel',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%',
				cellsrenderer: function(row, column, value){
				    var jewel ;
					var type = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var djewel = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'jwlType');
					var pjewel= jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'jewelType');
					var sjewel= jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'jType');
					
					if(type == "Assemble"){jewel = djewel;}
					if(type == "SalesReturn"){jewel = sjewel;}
					if(type == "SplitPB"){jewel = pjewel;}
					
					if(jewel != null){
			      		return "<div align='center'style='margin-top:8px;'>" + jewel + "</div>";
					}else{
			      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	}  
			},
			{'text' : 'Category','datafield' : 'cat','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,
				cellsrenderer: function(row, column, value){
				    var cat ;
					var type = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var dCat = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'dCat');
					var pCat= jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'pCat');
					var sCat= jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'sCat');
					console.log(type);
					console.log(dCat);
					console.log(pCat);
					console.log(sCat);
					
					if(type == "Assemble"){cat = dCat;}
					if(type == "SalesReturn"){cat = sCat;}
					if(type == "SplitPB"){cat = pCat;}
					
					if(cat != null){
						return "<div align='center'style='margin-top:8px;'>" + cat + "</div>";
					}
					else{
						return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Sub Cat.','datafield' : 'subCategory','width' : '8%',sortable : false,editable : false,cellsalign : 'center',align : 'center',
				cellsrenderer: function(row, column, value){
				    var subCategory ;
					var type = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var dSubCat = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'dSubCat');
					var pSubCat= jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'pSubCat');
					var sSubCat= jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'sSubCat');
					
					if(type == "Assemble"){subCategory = dSubCat;}
					if(type == "SalesReturn"){subCategory = sSubCat;}
					if(type == "SplitPB"){subCategory = pSubCat;}
					
					if(subCategory != null){
						return "<div align='center'style='margin-top:8px;'>" + subCategory + "</div>";
					}
					else{
						return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	}  
			},
			{'text' : 'Article code',	'datafield' : 'articleCode','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'HSN ID','datafield' : 'hsnId','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Skin Purity','datafield' : 'sPurity','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
				    var sPurity ;
					var type = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var purity = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'purity');
					var skinPurity = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'skinPurity');
					
					if(type == "Assemble"){sPurity = skinPurity;}
					if(type == "SalesReturn"){sPurity = skinPurity;}
					if(type == "SplitPB"){sPurity = purity;}
					
					if(sPurity != null){
			      		return "<div align='center'style='margin-top:8px;'>" + sPurity.toFixed(2) + "</div>";
					}else{
			      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Melting Purity','datafield' : 'meltPurity','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
				    var mPurity ;
					var type = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var mPurity = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'mPurity');
					var meltingPurity = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'meltingPurity');
					
					if(type == "Assemble"){mPurity = meltingPurity;}
					if(type == "SalesReturn"){mPurity = meltingPurity;}
					if(type == "SplitPB"){mPurity = mPurity;}
					
					if(mPurity != null){
			      		return "<div align='center'style='margin-top:8px;'>" + mPurity.toFixed(2) + "</div>";
					}else{
			      		return "<div align='center'style='margin-top:8px;'></div>";

					}
		      	} 
			},
			{'text' : 'Cost Code','datafield' : 'costCode',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '5%'},
			{'text' : 'Metal Type Id','datafield' : 'metalId','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Gr.Wt.',	'datafield' : 'gWt','width' : '4.5%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3',
				cellsrenderer: function(row, column, value){
				    var grsWt ;
					var type = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var grossWt = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'grossWt');
					var grossWeight = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'grossWeight');
					
					if(type == "Assemble"){grsWt = grossWeight;}
					if(type == "SalesReturn"){grsWt = grossWeight;}
					if(type == "SplitPB"){grsWt = grossWt;}
					if(grsWt != null){
			      		return "<div align='center'style='margin-top:8px;'>" + grsWt.toFixed(3) + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
		      		}
		      	} 
			},
			{'text' : 'Nt.Wt.','datafield' : 'nWt','width' : '4.5%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd3',
				cellsrenderer: function(row, column, value){
				    var netWts ;
					var type = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var netWt = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'netWt');
					var netWeight = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'netWeight');
					
					if(type == "Assemble"){netWts = netWeight;}
					if(type == "SalesReturn"){netWts = netWeight;}
					if(type == "SplitPB"){netWts = netWt;}
					
					if(netWts != null){
		      		return "<div align='center'style='margin-top:8px;'>" + netWts.toFixed(3) + "</div>";}
					else{
			      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	}  
			},
			{'text' : 'Making Selling charges','datafield' : 'mCharges',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '7%',cellsformat : 'd2',
				 cellsrenderer: function(row, column, value){
					    var mSellCharge ;
						var type = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'type');
						var mekingCharges = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'mekingCharges');
						var mcCharges = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'mcCharges');
						
						if(type == "Assemble"){mSellCharge = mekingCharges;}
						if(type == "SalesReturn"){mSellCharge = mcCharges;}
						if(type == "SplitPB"){mSellCharge = " ";}
						
						if(mSellCharge != null && mSellCharge != " "){
				      		return "<div align='center'style='margin-top:8px;'>" + mSellCharge.toFixed(2) + "</div>";
						}else{
				      		return "<div align='center'style='margin-top:8px;'></div>";
						}
			      	}  
			},
			{'text' : 'Wastage.Selling Charges','datafield' : 'wCharges','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
				    var wSellCharge ;
					var type = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var wastageCharges = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'wastageCharges');
					var wastageWeight = jQuery('#viewItemDetGrid').jqxGrid ('getcellvalue', row, 'wastageWeight');
					
					if(type == "Assemble"){wSellCharge = wastageCharges;}
					if(type == "SalesReturn"){wSellCharge = wastageWeight;}
					if(type == "SplitPB"){wSellCharge = " ";}
					
					if(wSellCharge != null && wSellCharge != " "){
			      	return "<div align='center'style='margin-top:8px;'>" + wSellCharge.toFixed(2) + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Cost MC Total Cost','datafield' : 'costMCTotalCostD','width' : '6%',hidden :false,sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Wastage Wt.','datafield' : 'costWastageWtD','width' : '6%',hidden :false,sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			]
	});
}

var assembleStoneDetailsView = function(data){
	console.log(data);
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'did','type' : 'int','map':'assembleDisassembleDetailId'},//DIS
			{'name' : 'pid','type' : 'int','map':'id'},//PB
			{'name' : 'sid','type' : 'int','map':'billDetailId'},//SR
			
			{'name' : 'suppliedBy','type' : 'string',"map":'suppliedBy'},//DIS
			{'name' : 'suppBy','type' : 'string',"map":'suppliedBy>id'},// SR
			{'name' : 'pSuppBy','type' : 'string',"map":'suppliedBy'},

			
			{'name' : 'serialNumber','type' : 'string','map':"stoneSrlNo"},//DIS
			{'name':'slNo','type':'int','map':'stoneSrlNumber'},//SR
			{'name':'pSlNo','type':'int','map':'srlNo'},//PB
			
			{'name' : 'seg','type' : 'string','map':"stoneSegmentDTO>description"},//DIS
			{'name' : 'stseg','type' : 'string','map':"stoneSegment>name"},//SR
			{'name' : 'pSeg','type' : 'string','map':"segment>description"},//PB
			
			{'name' : 'mainCat','type' : 'string','map':"stoneCategoryDTO>description"},//DIS
			{'name' : 'mCat','type' : 'string','map':"stoneCategory>name"},//SR
			{'name' : 'pmCat','type' : 'string','map':"catDTO>description"},//PB
			
			{'name' : 'mainCatId','type' : 'string','map':"stoneCategoryDTO>id"}, 
			
			{'name' : 'subCatOrShape','type' : 'string','map':"stoneSubCatDTO>description"},//DIS
			{'name' : 'subCatShape','type' : 'string','map':"stoneSubCategory>id"},//SR
			{'name' : 'psubCatOrShape','type' : 'string','map':"subCatDTO>description"},//PB
			
			{'name' : 'subCatOrShapeId','type' : 'string','map':"stoneSubCatDTO>id"},
			
			{'name' : 'clarity','type' : 'string','map':"clarity"},
			{'name' : 'clarityVal','type' : 'string','map':"clarityVal"},
			
			{'name' : 'color','type' : 'string','map':"color"},
			{'name' : 'colorVal','type' : 'string','map':"colorVal"},
			
			{'name' : 'cutGrade','type' : 'string','map':"cutGrade"},
			{'name' : 'cutGradeVal','type' : 'string','map':"cutGradeVal"},
			
			{'name' : 'weightSlab','type' : 'string','map':"weightCostRange"},
			{'name' : 'weightSlabVal','type' : 'string','map':"weightSlabVal"},
			
			{'name' : 'pcs','type' : 'int','map':"pieces"},
			
			{'name' : 'stWt','type' : 'float','map':"stoneWt"},//DIS
			{'name' : 'weight','type' : 'float'},//SR
			{'name' : 'pbWt','type' : 'float','map':"weight"},//PB
			
			{'name' : 'uqc','type' : 'string','map':"uom"},//DIS
			{'name' : 'stUqc','type' : 'string','map':"uom>id"},//SR
			{'name' : 'pbUqc','type' : 'string','map':"uomtype"},//PB
			
			{'name' : 'stRate','type' : 'float','map':"stoneSellingRate"},//DIS
			{'name' : 'srstRate','type' : 'float','map':"stoneSellingRate"},//SR
			{'name' : 'pbstRate','type' : 'float','map':"rate"},//PB
			
			{'name' : 'stoneCost','type' : 'float','map':"stoneSellingAmount"},//DIS
			{'name':'stoneSellingPrice','type':'float'},//SR
			{'name':'pbSpAmt','type':'float','map':'price'},//PB
			
			{'name' : 'costRate','type' : 'float','map':"stoneCostRate"},
			{'name' : 'srCostRate','type' : 'float','map':"stoneSellingPrice"},
			{'name' : 'pbCostRate','type' : 'float','map':""},
			
			{'name' : 'costAmt','type' : 'float','map':"stoneCostAmount"},//DIS
			{'name':'stoneCostPrice','type':'float'},//SR
			{'name':'pbCpAmt','type':'float','map':''},
			
			{'name':'type','type':'string'},
			{'name':'refNo','type':'int'},
			{'name':'srlNo','type':'int'},
			{'name':'sBy','type':'string'},
			{'name':'segment','type':'string'},
			{'name':'category','type':'string'},
			{'name':'subCatDesc','type':'string'},
			{'name':'uom','type':'string'},
			{'name':'stoneWt','type':'float'},
			{'name':'sellAmt','type':'float'},
			{'name':'stcostAmt','type':'float'},
			{'name':'cpRate','type':'float'},
			{'name':'spRate','type':'float'},
			{'name':'stColor','type':'float'},
			{'name':'stClarity','type':'float'},
			{'name':'stCutGrade','type':'float'},
			{'name':'stWtSlab','type':'float'},
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewStoneDetGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 40,
		autoheight : true,
		altRows : true,
		columnsresize : true,
	
		columns : [
			{'text' : 'Type','datafield' : 'type','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden :true},
			{'text' : '','datafield' : 'did','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pid','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'sid','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'serialNumber','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'slNo','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pSlNo','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'suppliedBy','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'suppBy','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pSuppBy','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'seg','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'stseg','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pSeg','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'mainCat','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'mCat','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pmCat','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'subCatOrShape','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'subCatShape','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'psubCatOrShape','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'uqc','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'stUqc','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbUqc','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'stWt','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'weight','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbWt','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'stoneCost','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'stoneSellingPrice','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbSpAmt','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'costAmt','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'stoneCostPrice','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbCpAmt','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},

			{'text' : '','datafield' : 'costRate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'srCostRate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbCostRate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},

			{'text' : '','datafield' : 'stRate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'srstRate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbstRate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'clarity','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'clarityVal','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'weightSlabVal','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'weightSlab','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'cutGradeVal','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'cutGrade','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'colorVal','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'color','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : 'Ref No.','datafield' : 'refNo','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center',
				cellsrenderer: function(row, column, value){
				    var refNum ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var did = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'did');
					var pid = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'pid');
					var sid = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'sid');

					
					if(type == "Assemble"){refNum = did;}
					if(type == "SalesReturn"){refNum = sid;}
					if(type == "SplitPB"){refNum = pid;}
					
					if(refNum != null){
			      	return "<div align='center'style='margin-top:8px;'>" + refNum  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'St Sl.No.','datafield' : 'srlNo','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,
				cellsrenderer: function(row, column, value){
				    var stoneSln ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var serialNumber = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'serialNumber');
					var slNo = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'slNo');
					var pSlNo = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'pSlNo');

					
					if(type == "Assemble"){stoneSln = serialNumber;}
					if(type == "SalesReturn"){stoneSln = slNo;}
					if(type == "SplitPB"){stoneSln = pSlNo;}
					
					if(stoneSln != null){
			      	return "<div align='center'style='margin-top:8px;'>" + stoneSln  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Supp. By','datafield' : 'sBy','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',
				cellsrenderer: function(row, column, value){
				    var suppByV ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var suppliedBy = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'suppliedBy');
					var suppBy = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'suppBy');
					var pSuppBy = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'pSuppBy');

					
					if(type == "Assemble"){suppByV = suppliedBy;}
					if(type == "SalesReturn"){suppByV = suppBy;}
					if(type == "SplitPB"){suppByV = pSuppBy;}
					
					if(suppByV != null){
			      	return "<div align='center'style='margin-top:8px;'>" + suppByV  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'St Seg','datafield' : 'segment',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%',
				cellsrenderer: function(row, column, value){
				    var stoneSeg ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var seg = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'seg');
					var stseg = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'stseg');
					var pSeg = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'pSeg');

					
					if(type == "Assemble"){stoneSeg = seg;}
					if(type == "SalesReturn"){stoneSeg = stseg;}
					if(type == "SplitPB"){stoneSeg = pSeg;}
					
					if(stoneSeg != null){
			      	return "<div align='center'style='margin-top:8px;'>" + stoneSeg  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'St Cat',	'datafield' : 'category','width' : '7%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center',
				cellsrenderer: function(row, column, value){
				    var stoneCat ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var mainCat = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'mainCat');
					var mCat = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'mCat');
					var pmCat = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'pmCat');

					
					if(type == "Assemble"){stoneCat = mainCat;}
					if(type == "SalesReturn"){stoneCat = mCat;}
					if(type == "SplitPB"){stoneCat = pmCat;}
					
					if(stoneCat != null){
			      	return "<div align='center'style='margin-top:8px;'>" + stoneCat  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Sub Cat. Desc','datafield' : 'subCatDesc',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '12%',
				cellsrenderer: function(row, column, value){
				    var stoneSubCat ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var subCatOrShape = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'subCatOrShape');
					var subCatShape = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'subCatShape');
					var psubCatOrShape = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'psubCatOrShape');

					
					if(type == "Assemble"){stoneSubCat = subCatOrShape;}
					if(type == "SalesReturn"){stoneSubCat = subCatShape;}
					if(type == "SplitPB"){stoneSubCat = psubCatOrShape;}
					
					if(stoneSubCat != null){
			      	return "<div align='center'style='margin-top:8px;'>" + stoneSubCat  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Cut Grade','datafield' : 'stCutGrade','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',
				cellsrenderer: function(row, column, value){
				    var ctGrade ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var dcutGradeVal = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'cutGrade');
					var pcutGradeVal = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'cutGradeVal');
					var scutGradeVal = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'cutGrade');

					
					if(type == "Assemble"){ctGrade = dcutGradeVal;}
					if(type == "SalesReturn"){ctGrade = scutGradeVal;}
					if(type == "SplitPB"){ctGrade = pcutGradeVal;}
					
					if(ctGrade != null){
			      	return "<div align='center'style='margin-top:8px;'>" + ctGrade  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Color','datafield' : 'stColor','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',
				cellsrenderer: function(row, column, value){
				    var stoneCol ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var dcolorVal = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'color');
					var pcolorVal = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'colorVal');
					var scolorVal = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'color');

					if(type == "Assemble"){stoneCol = dcolorVal;}
					if(type == "SalesReturn"){stoneCol = scolorVal;}
					if(type == "SplitPB"){stoneCol = pcolorVal;}
					
					if(stoneCol != null){
			      	return "<div align='center'style='margin-top:8px;'>" + stoneCol  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Clarity','datafield' : 'stClarity','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false,
				cellsrenderer: function(row, column, value){
				    var stoneClarity ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var dclarityVal = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'clarity');
					var pclarityVal = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'clarityVal');
					var sclarityVal = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'clarity');

					if(type == "Assemble"){stoneClarity = dclarityVal;}
					if(type == "SalesReturn"){stoneClarity = sclarityVal;}
					if(type == "SplitPB"){stoneClarity = pclarityVal;}
					
					if(stoneClarity != null){
			      	return "<div align='center'style='margin-top:8px;'>" + stoneClarity  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Wt. Range',	'datafield' : 'stWtSlab','width' : '6%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3',
				cellsrenderer: function(row, column, value){
				    var stoneWtSlab ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var dweightSlabVal = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'weightSlab');
					var pweightSlabVal = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'weightSlabVal');
					var sweightSlabVal = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'weightSlab');

					if(type == "Assemble"){stoneWtSlab = dweightSlabVal;}
					if(type == "SalesReturn"){stoneWtSlab = sweightSlabVal;}
					if(type == "SplitPB"){stoneWtSlab = pweightSlabVal;}
					
					if(stoneWtSlab != null){
			      	return "<div align='center'style='margin-top:8px;'>" + stoneWtSlab  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'UQC','datafield' : 'uom','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,	editable : false,
				cellsrenderer: function(row, column, value){
				    var stoneUqc ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var uqc = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'uqc');
					var stUqc = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'stUqc');
					var pbUqc = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'pbUqc');

					
					if(type == "Assemble"){stoneUqc = uqc;}
					if(type == "SalesReturn"){stoneUqc = stUqc;}
					if(type == "SplitPB"){stoneUqc = pbUqc;}
					
					if(stoneUqc != null){
			      	return "<div align='center'style='margin-top:8px;'>" + stoneUqc  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'St Pcs','datafield' : 'pcs',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '4%'},
			{'text' : 'St Wt.','datafield' : 'stoneWt','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3',
				cellsrenderer: function(row, column, value){
				    var stoneWeight ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var stWt = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'stWt');
					var weight = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'weight');
					var pbWt = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'pbWt');

					
					if(type == "Assemble"){stoneWeight = stWt;}
					if(type == "SalesReturn"){stoneWeight = weight;}
					if(type == "SplitPB"){stoneWeight = pbWt;}
					
					if(stoneWeight != null){
			      	return "<div align='center'style='margin-top:8px;'>" + stoneWeight.toFixed(3)  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	}
			},
			{'text' : 'Selling Rate','datafield' : 'spRate','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
				    var spRates ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var stRate = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'stRate');
					var srstRate = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'srstRate');
					var pbstRate = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'pbstRate');

					
					if(type == "Assemble"){spRates = stRate;}
					if(type == "SalesReturn"){spRates = srstRate;}
					if(type == "SplitPB"){spRates = pbstRate;}
					
					if(spRates != null){
			      	return "<div align='center'style='margin-top:8px;'>" + spRates.toFixed(2)  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	}
			},
			{'text' : 'Selling Amt','datafield' : 'sellAmt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
				    var spAmt ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var stoneCost = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'stoneCost');
					var stoneSellingPrice = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'stoneSellingPrice');
					var pbSpAmt = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'pbSpAmt');

					
					if(type == "Assemble"){spAmt = stoneCost;}
					if(type == "SalesReturn"){spAmt = stoneSellingPrice;}
					if(type == "SplitPB"){spAmt = pbSpAmt;}
					
					if(spAmt != null){
			      	return "<div align='center'style='margin-top:8px;'>" + spAmt.toFixed(2)  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	}
			},
			{'text' : 'Cost Rate','datafield' : 'cpRate','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
				    var cpRates ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var costRate = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'costRate');
					var srCostRate = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'srCostRate');
					var pbCostRate = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'pbCostRate');

					
					if(type == "Assemble"){cpRates = costRate;}
					if(type == "SalesReturn"){cpRates = srCostRate;}
					if(type == "SplitPB"){cpRates = pbCostRate;}
					
					if(cpRates != null){
			      	return "<div align='center'style='margin-top:8px;'>" + cpRates.toFixed(2)  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	}
			},
			{'text' : 'Cost Amt','datafield' : 'stcostAmt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
				    var cpAmt ;
					var type = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var costAmt = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'costAmt');
					var stoneCostPrice = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'stoneCostPrice');
					var pbCpAmt = jQuery('#viewStoneDetGrid').jqxGrid ('getcellvalue', row, 'pbCpAmt');

					
					if(type == "Assemble"){cpAmt = costAmt;}
					if(type == "SalesReturn"){cpAmt = stoneCostPrice;}
					if(type == "SplitPB"){cpAmt = pbCpAmt;}
					
					if(cpAmt != null){
			      	return "<div align='center'style='margin-top:8px;'>" + cpAmt.toFixed(2)  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	}
			}
		]
	});
}

var assembleAccDetailsView= function(data){
	var source = {
        localdata: data,
        datatype: "json",
        datafields : [ 
        	{'name' : 'did','type' : 'int','map':'assembleDisassembleDetailId'},//DIS
        	{'name' : 'pid','type' : 'int','map':'id'},//PB
        	{'name' : 'sid','type' : 'int','map':'id'},//SR
        	
        	{'name' : 'accPieces','type' : 'int'},//DIS
        	{'name' : 'pieces','type' : 'int'},//SR
        	{'name' : 'pbAccPcs','type' : 'int','map':'pieces'},//PB
        	
			{'name' : 'serialNumber','type' : 'int','map':'accSrlNo'},//DIS
			{'name':'accessorySrlNumber','type':'int'},//SR
			{'name':'pbsrlNo','type':'int','map':'serialNumber'},//PB
			
			{'name' : 'suppliedBy','type' : 'string','map':"suppliedBy"},//DIS
			{'name' : 'suppBy','type' : 'string','map':"suppliedByType"},//SR
			{'name' : 'pSuppBy','type' : 'string','map':""},//PB
			
			{'name' : 'category','type' : 'string','map':"categoryDTO>description"},//DIS
			{'name' : 'cat','type' : 'string','map':"accessoryCategory>name"},//SR
			{'name' : 'pbCat','type' : 'string','map':"catDTO>description"},//PB
			
			
			{'name' : 'subCategoryDesc','type' : 'string','map':"subCategoryDTO>description"},//DIS
			{'name' : 'subCat','type' : 'string','map':"accSubCategory>name"},//SR
			{'name' : 'pbSubCat','type' : 'string','map':"subCatDTO>description"},//PB
			
			{'name' : 'accSubCatOrShapeID','type' : 'string','map':"subCategoryDTO>description"},
			
			{'name' : 'accWt','type' : 'float','map':"accWt"}, //DIS
			{'name' : 'weight','type' : 'float'},//SR
			{'name' : 'pbAccWt','type' : 'float','map':"weight"},//PB
			
			{'name' : 'accRate','type' : 'float','map':"accSellingRate"},//DIS
			{'name' : 'srSpRate','type' : 'float','map':"sellingRate"},//SR
			{'name' : 'pbSPRate','type' : 'float','map':"rate"},//PB
			
			{'name' : 'accCost','type' : 'float','map':"accSellingAmount"},
			{'name' : 'srAccCost','type' : 'float','map':"sellingPrice"},
			{'name' : 'pbAccCost','type' : 'float','map':"price"},
			
			{'name' : 'costRate','type' : 'float','map':"accCostRate"},//DIS
			{'name' : 'srCPRate','type' : 'float','map':"costRate"},//SR
			{'name' : 'pbCPRate','type' : 'float','map':""},//PB
			
			{'name' : 'costAmt','type' : 'float','map':"accCostAmount"},//DIS
			{'name' : 'srCostAmt','type' : 'float','map':"costPrice"},//SR
			{'name' : 'pbCostAmt','type' : 'float','map':""},//PB
			
			{'name':'type','type':'string'},
			{'name':'refNo','type':'int'},
			{'name':'accSrl','type':'int'},
			{'name':'sBy','type':'string'},
			{'name':'accCat','type':'string'},
			{'name':'accSubCat','type':'string'},
			{'name':'accWts','type':'float'},
			{'name':'accPcs','type':'int'},
			{'name':'sRate','type':'float'},
			{'name':'sAmt','type':'float'},
			{'name':'cRate','type':'float'},
			{'name':'cAmt','type':'float'},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewAccDetGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 50,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		
		columns : [
			{'text' : 'Type','datafield' : 'type','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden :true},
			{'text' : '','datafield' : 'did','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pid','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'sid','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'serialNumber','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'accessorySrlNumber','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbsrlNo','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'suppliedBy','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'suppBy','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pSuppBy','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'category','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'cat','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbCat','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'subCategoryDesc','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'subCat','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbSubCat','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'accWt','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'weight','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbAccWt','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'accPieces','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pieces','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbAccPcs','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'accRate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'srSpRate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbSPRate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'accCost','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'srAccCost','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbAccCost','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'costRate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'srCPRate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbCPRate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			{'text' : '','datafield' : 'costAmt','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'srCostAmt','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'pbCostAmt','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,hidden : true},
			
			
			
			{'text' : 'Ref No.','datafield' : 'refNo','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center',
				cellsrenderer: function(row, column, value){
				    var refNum ;
					var type = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var did = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'did');
					var pid = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'pid');
					var sid = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'sid');

					
					if(type == "Assemble"){refNum = did;}
					if(type == "SalesReturn"){refNum = sid;}
					if(type == "SplitPB"){refNum = pid;}
					
					if(refNum != null){
			      	return "<div align='center'style='margin-top:8px;'>" + refNum  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Acc.Sl.No.','datafield' : 'accSrl','width' : '9%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,
				cellsrenderer: function(row, column, value){
				    var accSln ;
					var type = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var serialNumber = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'serialNumber');
					var pbsrlNo = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'pbsrlNo');
					var accessorySrlNumber = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'accessorySrlNumber');

					
					if(type == "Assemble"){accSln = serialNumber;}
					if(type == "SalesReturn"){accSln = accessorySrlNumber;}
					if(type == "SplitPB"){accSln = pbsrlNo;}
					
					if(accSln != null){
			      	return "<div align='center'style='margin-top:8px;'>" + accSln  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Supplied By','datafield' : 'sBy','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center',
				cellsrenderer: function(row, column, value){
				    var sBy;
					var type = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var suppliedBy = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'suppliedBy');
					var suppBy = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'suppBy');
					var pSuppBy = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'pSuppBy');

					
					if(type == "Assemble"){sBy = suppliedBy;}
					if(type == "SalesReturn"){sBy = suppBy;}
					if(type == "SplitPB"){sBy = pSuppBy;}
					
					if(sBy != null){
			      	return "<div align='center'style='margin-top:8px;'>" + sBy  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Category','datafield' : 'accCat','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center',
				cellsrenderer: function(row, column, value){
				    var accCategory;
					var type = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var category = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'category');
					var cat = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'cat');
					var pbCat = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'pbCat');

					
					if(type == "Assemble"){accCategory = category;}
					if(type == "SalesReturn"){accCategory = cat;}
					if(type == "SplitPB"){accCategory = pbCat;}
					
					if(accCategory != null){
			      	return "<div align='center'style='margin-top:8px;'>" + accCategory  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Sub category Description','datafield' : 'accSubCatOrShapeID',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '10%',
				cellsrenderer: function(row, column, value){
				    var accSubCategory;
					var type = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var subCategoryDesc = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'subCategoryDesc');
					var subCat = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'subCat');
					var pbSubCat = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'pbSubCat');

					
					if(type == "Assemble"){accSubCategory = subCategoryDesc;}
					if(type == "SalesReturn"){accSubCategory = subCat;}
					if(type == "SplitPB"){accSubCategory = pbSubCat;}
					
					if(accSubCategory != null){
			      	return "<div align='center'style='margin-top:8px;'>" + accSubCategory  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Acc Wt','datafield' : 'accWts','width' : '9%',	sortable : false,editable : false,	cellsalign : 'right',	align : 'center',cellsformat : 'd3',
				cellsrenderer: function(row, column, value){
				    var accWeight;
					var type = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var accWt = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'accWt');
					var weight = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'weight');
					var pbAccWt = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'pbAccWt');

					
					if(type == "Assemble"){accWeight = accWt;}
					if(type == "SalesReturn"){accWeight = weight;}
					if(type == "SplitPB"){accWeight = pbAccWt;}
					
					if(accWeight != null){
			      	return "<div align='center'style='margin-top:8px;'>" + accWeight.toFixed(3)  + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Acc Pcs','datafield' : 'accPcs','width' : '9%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center',
				cellsrenderer: function(row, column, value){
				    var accessoryPcs;
					var type = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var accPieces = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'accPieces');
					var pieces = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'pieces');
					var pbAccPcs = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'pbAccPcs');

					
					if(type == "Assemble"){accessoryPcs = accPieces;}
					if(type == "SalesReturn"){accessoryPcs = pieces;}
					if(type == "SplitPB"){accessoryPcs = pbAccPcs;}
					
					if(accessoryPcs != null){
			      	return "<div align='center'style='margin-top:8px;'>" + accessoryPcs + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Acc Selling Rate','datafield' : 'sRate','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
				    var spRate;
					var type = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var accRate = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'accRate');
					var srSpRate = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'srSpRate');
					var pbSPRate = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'pbSPRate');

					
					if(type == "Assemble"){spRate = accRate;}
					if(type == "SalesReturn"){spRate = srSpRate;}
					if(type == "SplitPB"){spRate = pbSPRate;}
					
					if(spRate != null){
			      	return "<div align='center'style='margin-top:8px;'>" + spRate.toFixed(2) + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Acc Selling Amt','datafield': 'sAmt','width' : '9%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
				    var spAmt;
					var type = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var accCost = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'accCost');
					var srAccCost = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'srAccCost');
					var pbAccCost = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'pbAccCost');

					
					if(type == "Assemble"){spAmt = accCost;}
					if(type == "SalesReturn"){spAmt = srAccCost;}
					if(type == "SplitPB"){spAmt = pbAccCost;}
					
					if(spAmt != null){
			      	return "<div align='center'style='margin-top:8px;'>" + spAmt.toFixed(2) + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			
			},
			{'text' : 'Cost Rate','datafield' : 'cRate','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
				    var cpRate;
					var type = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var costRate = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'costRate');
					var srCPRate = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'srCPRate');
					var pbCPRate = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'pbCPRate');
					
					if(type == "Assemble"){cpRate = costRate;}
					if(type == "SalesReturn"){cpRate = srCPRate;}
					if(type == "SplitPB"){cpRate = pbCPRate;}
					
					if(cpRate != null){
			      	return "<div align='center'style='margin-top:8px;'>" + cpRate.toFixed(2) + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			},
			{'text' : 'Cost Amt','datafield' : 'cAmt','width' : '9%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
				    var cpAmt;
					var type = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'type');
					var costAmt = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'costAmt');
					var srCostAmt = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'srCostAmt');
					var pbCostAmt = jQuery('#viewAccDetGrid').jqxGrid ('getcellvalue', row, 'pbCostAmt');
					
					if(type == "Assemble"){cpAmt = costAmt;}
					if(type == "SalesReturn"){cpAmt = srCostAmt;}
					if(type == "SplitPB"){cpAmt = pbCostAmt;}
					
					if(cpAmt != null){
			      	return "<div align='center'style='margin-top:8px;'>" + cpAmt.toFixed(2) + "</div>";
					}else{
		      		return "<div align='center'style='margin-top:8px;'></div>";
					}
		      	} 
			}
		]
	});
}


