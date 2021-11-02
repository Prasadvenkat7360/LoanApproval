/*
    ##	Author (UI)     :   Dipankar Naha
	##	Author1 (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Divya M
	##	Date Creation 	: 	23-02-2018
	## 	Description		:	Assemble/Disassemble of Items.
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

// #################################### @ Grid Functions For Original Details In Case of Create ##################

var itemDetailsCreate = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stockNo','type' : 'string','map':'id'},
			{'name' : 'skinPurity','type' : 'float','map':'orderItemSkinPurity>skinPurity'},
			{'name' : 'segmentId','type' : 'float','map':'segment>id'},
			{'name' : 'segmentCode','type' : 'float','map':'segment>code'},
			{'name' : 'metalSegment','type' : 'float','map':'metalSegment>id'},
			{'name' : 'segment','type' : 'float','map':'segment>description'},
			{'name' : 'meltingPurity','type' : 'float','map':'orderItemSkinPurity>meltingPurity'},
			{'name' : 'articleCode','type' : 'string','map':'articleMasterDTO>articleCode'}, 
			{'name' : 'vendorCode','type' : 'string','map':'vendor>description'}, 
			{'name' : 'jwlType','type' : 'string','map':'jewelTypeDTO>description'},
			{'name' : 'pcsOrPairs','type' : 'string','map':'finishedPieces'},
			{'name' : 'subCatDesc','type' : 'string','map':'subCategory>description'},
			{'name' : 'hsnId','type' : 'string','map':'hsnMasterDTO>id'},
			{'name' : 'grossWt','type' : 'string','map':'grossWeight'},
			{'name' : 'netWt','type' : 'string','map':'finishedNetWeight'},
			{'name' : 'wstageWt','type' : 'string','map':'wastageWt'},
			{'name' : 'labour','type' : 'string','map':'labour'}, 
			{'name' : 'vendorId','type' : 'float','map':'vendor>id'},
			{'name' : 'vendorName','type' : 'float','map':'vendor>name'},
			{'name' : 'articleMasterDTO','type' : 'float','map':'articleMasterDTO>id'},
			{'name' : 'articleCode','type' : 'float','map':'articleMasterDTO>articleCode'},
			{'name' : 'articleDesc','type' : 'float','map':'articleMasterDTO>articleDesc'},
			
			{'name' : 'metalSegmentCode','type' : 'float','map':'metalSegment>code'},
			{'name' : 'metalSegmentId','type' : 'float','map':'metalSegment>segmentId'},
			{'name' : 'metalSegmentDesc','type' : 'float','map':'metalSegment>description'},
			{'name' : 'jewelTypeDTOId','type' : 'float','map':'jewelTypeDTO>id'},
			{'name' : 'jewelTypeDTOCode','type' : 'float','map':'jewelTypeDTO>Code'},
			{'name' : 'subCategoryId','type' : 'float','map':'subCategory>id'},
			{'name' : 'subCategorycode','type' : 'float','map':'subCategory>code'},
			{'name' : 'hsnCode','type' : 'float','map':'hsnMasterDTO>hsnCode'},
			{'name' : 'hsnDescription','type' : 'float','map':'hsnMasterDTO>hsnDescription'},
			{'name' : 'costCode','type' : 'float','map':'costCode'},
			{'name' : 'type','type' : 'float','map':'type'},
			{'name' : 'costMCTotalCost','type' : 'float','map':'costMCTotalCost'},
			{'name' : 'costWastageWt','type' : 'float','map':'costWastageWt'},
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridItemDetC").jqxGrid({
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
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Item Details');
		},
		columns : [
			{'text' : '','datafield' : 'type','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'hsnDescription','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'hsnCode','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'subCategorycode','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'subCategoryId','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'jewelTypeDTOCode','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'jewelTypeDTOId','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'metalSegmentDesc','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'metalSegmentId','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'metalSegmentCode','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'metalSegment','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'segmentId','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'segmentCode','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'articleDesc','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'articleCode','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'articleMasterDTO','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'vendorName','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'vendorId','width' : '7%',hidden :true},
			
			
			{'text' : 'Stock No.','datafield' : 'stockNo','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Segment','datafield' : 'segment','width' : '8%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Melting Purity',	'datafield' : 'meltingPurity','width' : '7%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Vendor code','datafield' : 'vendorCode',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '10%'},
			{'text' : 'Jewel Type','datafield' : 'jwlType',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '8%'},
			{'text' : 'Pcs/Pairs','datafield' : 'pcsOrPairs','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub.Cat.Desc','datafield' : 'subCatDesc','width' : '10%',sortable : false,editable : false,cellsalign : 'left',align : 'center',cellsformat : 'd3'},
			
			{'text' : 'HSN ID','datafield' : 'hsnId','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Gr.Wt.',	'datafield' : 'grossWt','width' : '7%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Nt.Wt.','datafield' : 'netWt','width' : '7%',cellsformat : 'd3',cellsalign : 'right',align : 'center',sortable : false,	editable : false},
			{'text' : 'Cost Code','datafield' : 'costCode','width' : '7%',cellsalign : 'center',align : 'center',cellsrenderer : showCostCode},
			{'text' : 'Making selling charges','datafield' : 'labour',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '13%',cellsformat : 'd2'},
			{'text' : 'Selling wastage Wt.','datafield' : 'wstageWt','width' : '12%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'Cost MC Total Cost','datafield' : 'costMCTotalCost','width' : '11%',hidden :false,sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Wastage Wt.','datafield' : 'costWastageWt','width' : '11%',hidden :false,sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		]
	});
}

showCostCode = function(row, column, value){
	var costCode = "";
	if( value == "Manufacture"){
		costCode = "MFG.";
	}else{
		costCode = "TOT. Cost";
	}
	return '<div style="text-align:center; margin: 0; padding-top:6px; height:40px;">' + costCode  + '</div>';
}
var arr = [];

var stoneDetailsCreate = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'id','type' : 'string'},
			{'name' : 'serialNumber','type' : 'int','map':"stockSerialNo"},
			
			{'name' : 'seg','type' : 'string','map':"segmentDTO>description"},
			{'name' : 'segId','type' : 'string','map':"segmentDTO>id"},
			{'name' : 'segName','type' : 'string','map':"segmentDTO>code"},
			
			{'name' : 'suppliedBy','type' : 'string','map':"suppliedBy>id"},
			{'name' : 'suppliedByName','type' : 'string','map':"suppliedBy>name"},
			{'name' : 'suppliedByDesc','type' : 'string','map':"suppliedBy>description"},
			
			{'name' : 'cutGrade','type' : 'string','map':"cutGrade>id"}, 
			{'name' : 'cutGradeDesc','type' : 'string','map':"cutGrade>description"},
			{'name' : 'cutGradeName','type' : 'string','map':"cutGrade>name"},
			
			{'name' : 'clarity','type' : 'string','map':"clarity>id"},
			{'name' : 'clarityName','type' : 'string','map':"suppliedBy>name"},
			{'name' : 'clarityDesc','type' : 'string','map':"suppliedBy>description"},
			
			{'name' : 'color','type' : 'string','map':"color>id"},
			{'name' : 'colorName','type' : 'string','map':"color>name"},
			{'name' : 'colorDesc','type' : 'string','map':"color>description"},
			
			{'name' : 'actualColorId','type' : 'string','map':"actualColor>id"},
			{'name' : 'actualColorName','type' : 'string','map':"actualColor>name"},
			{'name' : 'actualColorDesc','type' : 'string','map':"actualColor>description"},
			
			{'name' : 'wtRange','type' : 'string','map':"weightRange>id"},
			{'name' : 'wtRangeName','type' : 'string','map':"weightRange>name"},
			{'name' : 'wtRangeDesc','type' : 'string','map':"weightRange>description"},
			{'name' : 'stoneCode','type' : 'string','map':"stoneCode"},
			
			{'name' : 'totalSellingPriceS','type' : 'string','map':"totalSellingPrice"},
			{'name' : 'mainCat','type' : 'string','map':"category"}, 
			{'name' : 'mainCatId','type' : 'string','map':"catId"}, 
			{'name' : 'subCatOrShape','type' : 'string','map':"subCategoryDesc"},
			
			{'name' : 'pcs','type' : 'long','map':"pieces"},
			{'name' : 'stWt','type' : 'float','map':"weight"}, 
			{'name' : 'uqc','type' : 'string','map':"uom"},
			
			{'name' : 'stRate','type' : 'float','map':"sellingPrice"},
			{'name' : 'stoneCost','type' : 'float','map':"totalSellingPrice"},
			{'name' : 'costAmtS','type' : 'float','map':"totalCostPrice"},
			{'name' : 'costRateS','type' : 'float','map':"costPrice"},
			{'name' : 'checkBox','type':'checkbox'}
			
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStoneC").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 40,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		pageable:true,
		theme: 'energyblue',
		pagesize:5,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Stones Details');
		},
		columns : [
			{'text' : '','datafield' : 'checkBox','width' : '7%',columntype : 'checkbox',sortable : false,editable : true,cellsalign : 'center',align : 'center',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
                    if(newvalue == true){
						var selectedData = $('#jqxgridStoneC').jqxGrid('getRowData',row);
						arr.push(selectedData);
						$("#jqxgridStoneCToSale").show();
						console.log(arr);
						stoneDetailsCreateToSale(arr);
                      }	else{
			            	var index = arr.indexOf(selectedData);
			                arr.splice(index, 1);
			                stoneDetailsCreateToSale(arr);
					 }
				}
			},
			
			{'text' : 'St Sl.No.','datafield' : 'serialNumber','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supp. By','datafield' : 'suppliedBy','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'St Cat',	'datafield' : 'mainCat','width' : '9%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Sub Cat. Desc','datafield' : 'subCatOrShape',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '10%'},
			{'text' : 'St Seg','datafield' : 'seg',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%'},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Color','datafield' : 'color','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,	editable : false},
			{'text' : 'Wt. Range',	'datafield' : 'wtRange','width' : '7%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'St Pcs','datafield' : 'pcs',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '5%'},
			{'text' : 'St Wt.','datafield' : 'stWt','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'Selling Rate','datafield' : 'stRate','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Selling Amt','datafield' : 'stoneCost','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Rate','datafield' : 'costRateS','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Amt','datafield' : 'costAmtS','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			
			
			{'text' : '','datafield' : 'stoneCode','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'mainCatId','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'wtRangeDesc','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'wtRangeName','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'actualColorDesc','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'actualColorName','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'actualColorId','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'colorName','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'colorDesc','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'clarityDesc','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'clarityName','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'cutGradeName','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'cutGradeDesc','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'suppliedByDesc','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'suppliedByName','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'id','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'segId','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'segName','width' : '7%',hidden :true},
		]
	});
}

var arrAcc = [];

var accessoryDetailsCreate = function(data){
	var source = {
        localdata: data,
        datatype: "json",
        datafields : [ 
        	{'name' : 'refNo','type' : 'int','map':'id'},
			{'name' : 'serialNumber','type' : 'string','map':"serialNumber"},
			
			{'name' : 'accSubCatOrShapeID','type' : 'string','map':"subCategoryDesc"},
			{'name' : 'subCategoryDesc','type' : 'string','map':"subCategoryDesc"},
			{'name' : 'subCategoryId','type' : 'string','map':"subCategory>id"},
			{'name' : 'subCategoryName','type' : 'string','map':"subCategory>name"},
			{'name' : 'subCatDesc','type' : 'string','map':"subCategory>description"},
			{'name' : 'suppliedBy','type' : 'string','map':"suppliedBy>id"},
			{'name' : 'suppliedByName','type' : 'string','map':"suppliedBy>name"},
			{'name' : 'suppliedByDesc','type' : 'string','map':"suppliedBy>description"},
			{'name' : 'uom','type' : 'string','map':"uom>id"},
			{'name' : 'uomName','type' : 'string','map':"uom>name"},
			{'name' : 'uomDesc','type' : 'string','map':"uom>description"},
			{'name' : 'costPrice','type' : 'string','map':"costPrice"},
			{'name' : 'sellingPrice','type' : 'string','map':"sellingPrice"},
			{'name' : 'catDes','type' : 'string','map':"catDes"},
			{'name' : 'accessoryCode','type' : 'string','map':"accessoryCode"},
			{'name' : 'accWt','type' : 'float','map':"weight"}, 
			{'name' : 'accRate','type' : 'float','map':"sellingPrice"},
			{'name' : 'costAmtA','type' : 'float','map':"totalCostPrice"}, 
			{'name' : 'costRateA','type' : 'float','map':"costPrice"},
			{'name' : 'accCost','type' : 'float','map':"totalSellingPrice"},
			{'name' : 'accPcs','type' : 'float','map':"pieces"},
			{'name' : 'accCategry','type' : 'float','map':"catDes"},
			{'name' : 'checkBox','type' : 'checkBox'}
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAccC").jqxGrid({
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
			{'text' : '','datafield':'checkBox','width' : '7%',columntype : 'checkbox',sortable : false,editable : true,cellsalign : 'center',align : 'center',
				
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					
					if(newvalue == true){
						
						var selectedData = $('#jqxgridAccC').jqxGrid('getRowData',row);
						arrAcc.push(selectedData);
						$("#jqxgridAccCToSale").show();
						console.log(arrAcc);
						accessoryDetailsCreateToSale(arrAcc);
						
                      }	else{
                    	  
		            	var index = arrAcc.indexOf(selectedData);
		            	arrAcc.splice(index, 1);
		            	accessoryDetailsCreateToSale(arrAcc);
					 }
				}
			},
			
			{'text' : '','datafield' : 'refNo','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'subCatDesc','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'subCategoryId','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'subCategoryName','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'suppliedByDesc','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'suppliedByName','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'uomName','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'uom','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'uomDesc','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'costPrice','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'sellingPrice','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'accessoryCode','width' : '7%',hidden :true},
			
			
			{'text' : 'Acc.Sl.No.','datafield' : 'serialNumber','width' : '10%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supp. By','datafield' : 'suppliedBy','width' : '10%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Cat.','datafield' : 'accCategry','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub category Description','datafield' : 'accSubCatOrShapeID',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '15%'},
			{'text' : 'Acc Pcs','datafield' : 'accPcs','width' : '10%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Wt','datafield' : 'accWt','width' : '10%',	sortable : false,editable : false,	cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Acc Selling Rate','datafield' : 'accRate','width' : '15%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Selling Amt',	'datafield' : 'accCost','width' : '15%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Cost Rate','datafield' : 'costRateA','width' : '15%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Cost Amt',	'datafield' : 'costAmtA','width' : '15%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
		]
	});
}
//#################################### @ Grid Functions For To Sale In Case of Create ##################
var itemDetailsCreateToSale = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stockNo','type' : 'string','map':'id'},
			{'name' : 'skinPurity','type' : 'float','map':'orderItemSkinPurity>skinPurity'},
			{'name' : 'segment','type' : 'string','map':'segment'},
			{'name' : 'categoryC','type' : 'string'},
			{'name' : 'SubcategoryC','type' : 'string'},
			{'name' : 'meltingPurity','type' : 'float','map':'orderItemSkinPurity>meltingPurity'},
			{'name' : 'articleCode','type' : 'string'}, 
			{'name' : 'vendorCode','type' : 'string','map':'vendor>description'}, 
			{'name' : 'jwlType','type' : 'string'},
			{'name' : 'pcsOrPairs','type' : 'string','map':'finishedPieces'},
			{'name' : 'subCatDesc','type' : 'string','map':'subCategory>description'},
			{'name' : 'hsnId','type' : 'string','map':'hsnMasterDTO>id'},
			{'name' : 'grossWt','type' : 'float','map':'grossWeight'},
			{'name' : 'netWt','type' : 'float','map':'finishedNetWeight'},
			{'name' : 'wstageWt','type' : 'float','map':'wastageWt'},
			{'name' : 'labour','type' : 'float','map':'labour'}, 
			
			{'name' : 'vendorIdC','type' : 'float','map':'vendor>id'},
			{'name' : 'vendorNameC','type' : 'float','map':'vendor>name'},
			{'name' : 'hsnCodeC','type' : 'float','map':'hsnMasterDTO>hsnCode'},
			{'name' : 'hsnDescriptionC','type' : 'float','map':'hsnMasterDTO>hsnDescription'},
			{'name' : 'costCodeC','type' : 'float','map':'costCode'},
			{'name' : 'typeC','type' : 'float','map':'type'},
			{'name' : 'costMCTotalCostC','type' : 'float','map':'costMCTotalCost'},
			{'name' : 'costWastageWtC','type' : 'float','map':'costWastageWt'},
			{'name' : 'articleMasterDTOC','type' : 'float','map':'articleMasterDTO>id'},
			{'name' : 'articleCodeC','type' : 'float','map':'articleMasterDTO>articleCode'},
			{'name' : 'articleDescC','type' : 'float','map':'articleMasterDTO>articleDesc'},
			{'name' : 'metalSegmentDes','type' : 'string','map':'metalSegment>description'},
			{'name' : 'metalSegmentCodeD','type' : 'string','map':'metalSegment>code'},
			{'name' : 'metalSegmentIdD','type' : 'string','map':'metalSegment>id'},
			{'name' : 'pairFlag','type' : 'string'},
			
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridItemDetCToSale").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 40,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		pageable:true,
		theme: 'energyblue',
		pagesize:5,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Item Details');
		},
		columns : [
			{'text' : 'Stock No.','datafield' : 'stockNo','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'pairFlag.','datafield' : 'pairFlag','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center',hidden:true},

			{'text' : 'Segment','datafield' : 'segment','width' : '8%',cellsalign : 'center',	align : 'center',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'segmentN',
				createeditor: function (row, cellvalue, editor) { 
					var segmentId = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'segmentId');
					var segmentCode = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'segmentCode');
					var segment = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'segment');
					var segment = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'segment');
					
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
							var res = data.payload.allSegments;
							editor.jqxDropDownList({source : res,displayMember : 'description',valueMember : 'id'});
						});
			    },
			    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
			    	 $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'jwlTypeN',null);  
			    	 $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'catN', null);  
			    	 $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'subCatN', null);  
			    	 $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'articleCode', null);  
			    }
				/*createeditor: function (row, cellvalue, editor) { 
				editor.jqxDropDownList({ source: segmentArr, displayMember: 'description', valueMember: 'id'});
				},*/
			},
			{ text: 'Jewel Type', datafield: 'jwlType',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'jwlTypeN',
				createeditor: function (row, cellvalue, editor) { 
					editor.on('click',function(event) {
						var segment = $('#jqxgridItemDetCToSale').jqxGrid('getcellvalue',row,'segment');
						fieldFilters = {
								"fieldFilters" : {
						               "type":"jewelType",
						        	   "segment":{"id":segment},
						           }
		       			}
					var rows = $("#jqxgridItemDetCToSale")	.jqxGrid('getrows');
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
							var res = data.payload.jeweltypes;
							editor.jqxDropDownList({source : res,displayMember : 'description',valueMember : 'id'});
						});
					});
			   },
			   cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
				     $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'catN', null);  
			    	 $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'subCatN', null);  
			    	 $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'articleCode', null);  
			    }
			},
			{ text: 'Category', datafield: 'categoryC',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'catN',
	       		createeditor: function (row, cellvalue, editor) { 
	       			editor.on('click',function(event) {
	       			var segment = $('#jqxgridItemDetCToSale').jqxGrid('getcellvalue',row,'segment');
	       			var segmentN = $('#jqxgridItemDetCToSale').jqxGrid('getcellvalue',row,'segmentN');
	       			var jwlType = $('#jqxgridItemDetCToSale').jqxGrid('getcellvalue',row,'jwlType');
	       			fieldFilters = {
							"fieldFilters" : {
					           "type":"segCategory",
					           "jewel":{"id":jwlType},
					        	   "segment":{"id":segment},
					           }
	       			}
	       			postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters), function(data) {
					    var data = data.payload.maincats;
					    var mainCatArr = [];
						$.each(data, function(k, v){
							mainCatArr.push({
								"id" : v.id,
								"description" : v.description
							});
						});
						editor.jqxDropDownList({ source: mainCatArr, displayMember: 'description', valueMember: 'id'});		
	       			    });	
	       			});	
	      	     },
	      	   cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
	      		 $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'subCatN', null);  
		    	 $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'articleCode', null);  
			    }
			},
			{ text: 'Subcategory', datafield: 'SubcategoryC',width: '6%', cellsalign : 'left', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'subCatN',
	       		createeditor: function (row, cellvalue, editor) { 
	       			editor.on('click',function(event) {
	       			var segment = $('#jqxgridItemDetCToSale').jqxGrid('getcellvalue',row,'segment');
	       			var jwlType = $('#jqxgridItemDetCToSale').jqxGrid('getcellvalue',row,'jwlType');
	       			var categoryC = $('#jqxgridItemDetCToSale').jqxGrid('getcellvalue',row,'categoryC');
	       			
	       			fieldFilters = {
							"fieldFilters" : {
					           "type":"subCat",
					        	   "segment":{"id":segment},
					        	   "jewel":{"id":jwlType},
					        	   "category":{"id":categoryC}
					           }
					      }
	       			postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters), function(data) {
					    var data = data.payload.subCats;
					    var subCatArr = [];
						$.each(data, function(k, v){
							subCatArr.push({
								"id" : v.id,
								"description" : v.description
							});
						});
						editor.jqxDropDownList({ source: subCatArr, displayMember: 'description', valueMember: 'id'});		
	       			    });
	       			});
	      	     },
	      	     cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {		
			    	 $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'articleCode', null);
			    	 
	      	    	var segment = $('#jqxgridItemDetCToSale').jqxGrid('getcellvalue',row,'segment');
	       			var jwlType = $('#jqxgridItemDetCToSale').jqxGrid('getcellvalue',row,'jwlType');
	       			var categoryC = $('#jqxgridItemDetCToSale').jqxGrid('getcellvalue',row,'categoryC');
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
      		   	        $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'articleCode',null); 
					    var res = data.payload.article;
					    $.each(res,function(k,v){
					    	 $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'articleCode', v.name); 
					    	 $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'pairFlag', v.value);  

					    })
       			    });
	      	     }
			},
			{'text' : '','datafield' : 'articleDescC','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'articleCodeC','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'articleMasterDTOC','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'vendorNameC','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'vendorIdC','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'typeC','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'costCodeC','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'hsnDescriptionC','width' : '7%',hidden :true},
			{'text' : '','datafield' : 'hsnCodeC','width' : '7%',hidden :true},
			
			{'text' : 'Article Code','datafield' : 'articleCode','width' : '8%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '8%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat:'d2'},
			{'text' : 'Melting Purity',	'datafield' : 'meltingPurity','width' : '8%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat:'d2'},
			{'text' : 'Vendor code','datafield' : 'vendorCode',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '10%'},
			{'text' : 'Pcs/Pairs','datafield' : 'pcsOrPairs','width' : '7%',sortable : false,editable : true,cellsalign : 'center',align : 'center',
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
	      	    	var orgPcs = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'pcsOrPairs');
	      	    	var pairFlag = $('#jqxgridItemDetCToSale').jqxGrid('getcellvalue',row,'pairFlag');
	      	    	
	      	    	if(newvalue == 0 || newvalue == "" || newvalue < 0){
	      	    		 $.growl.error({
		 	       		    	message : "Please Enter Valid Pcs/Pairs !!!",
		 	       		    	duration : 10000,
		 	       		    	title  : "Error"
		 	       		    });
		 	       		    return orgPcs;
	      	    		}
	      	    	/*else if(pairFlag == "true" && newvalue % 2 !=0){
	      	    		 $.growl.error({
		 	       		    	message : "Please Enter Even Pcs!!!",
		 	       		    	duration : 10000,
		 	       		    	title  : "Error"
		 	       		    });
		 	       		    return "";
	      	    	}*/
	      	    	else if(newvalue > orgPcs){
	 	       		    $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'pcsOrPairs', null);
	 	       		    $.growl.error({
	 	       		    	message : "Pcs/Pairs Should be less than or Equal to " + orgPcs + " !!!",
	 	       		    	duration : 10000,
	 	       		    	title  : "Error"
	 	       		    });
	 	       		    return orgPcs;
	      	    	 }
	      	    	else{}
				}
			},
			{'text' : 'Sub.Cat.Desc','datafield' : 'subCatDesc','width' : '10%',sortable : false,editable : false,cellsalign : 'left',align : 'center',cellsformat : 'd3'},
			{'text' : 'HSN ID','datafield' : 'hsnId','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Gr.Wt.',	'datafield' : 'grossWt','width' : '7%',sortable : false,	editable : true,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Nt.Wt.','datafield' : 'netWt','width' : '7%',cellsalign : 'right',align : 'center',sortable : false,	editable : true,cellsformat : 'd3'},
			{'text' : 'Making selling charges','datafield' : 'labour',editable : true,cellsalign : 'right',	align : 'center',sortable : false,'width' : '13%',cellsformat : 'd2',
				
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {		
	       			var originalMCSellingChrg = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'labour');
	       			var originalMcCost = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'costMCTotalCost');
	       			if(newvalue>originalMCSellingChrg){
	       				$.growl.error({
		       				 message:"Please Enter Making Selling Charges Less the or Equal to Original Making Selling Charges.!!",
		       				duration : 10000
	       			    });
	       			     return false;
	       			}
	       			var sellingMC = (newvalue/originalMCSellingChrg)*100;
	       			var newSellingMC = parseFloat((sellingMC*originalMcCost)/100);
	       		    $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'costMCTotalCostC', newSellingMC);
	      	     }
			},
			{'text' : 'Selling wastage Wt.','datafield' : 'wstageWt','width' : '12%',cellsalign : 'right',	align : 'center',sortable : false,editable : true,cellsformat : 'd3',
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {		
	       			var originalMCSellingChrg = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'wstageWt');
	       			var costWastageWt = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'costWastageWt');
	       			if(newvalue>originalMCSellingChrg){
	       				$.growl.error({
		       				 message:"Please Enter Selling wastage Wt Less the or Equal to Original Selling Wastage Wt.!!",
		       				duration : 10000
	       			    });
	       			     return false;
	       			}
	       			var sellingMC = (newvalue/originalMCSellingChrg)*100;
	       			var newSellingMC = (sellingMC*costWastageWt)/100;
	       		    $("#jqxgridItemDetCToSale").jqxGrid("setcellvalue", row, 'costWastageWtC', newSellingMC);
	      	     }
			},
			{'text' : 'Cost MC Total Cost','datafield' : 'costMCTotalCostC','width' : '12%',hidden :false,sortable : false, editable : false, cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Wastage Wt','datafield' : 'costWastageWtC','width' : '10%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'}
		]
	});
}

var stoneDetailsCreateToSale = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'id','type' : 'string'},
			{'name' : 'refNo','type' : 'int'},
			{'name' : 'suppliedBy','type' : 'string'},
			{'name' : 'serialNumber','type' : 'int'},
			{'name' : 'seg','type' : 'string'},
			{'name' : 'mainCat','type' : 'string'}, 
			{'name' : 'subCatOrShape','type' : 'string'},
			{'name' : 'clarity','type' : 'string'},
			{'name' : 'color','type' : 'string'},
			{'name' : 'cutGrade','type' : 'string'}, 
			{'name' : 'wtRange','type' : 'string'},
			{'name' : 'pcs','type' : 'long'},
			{'name' : 'stWt','type' : 'float'}, 
			{'name' : 'uqc','type' : 'string'},
			
			{'name' : 'actualColorDesc','type' : 'string'},
			{'name' : 'stoneCode','type' : 'string','map':'stoneCode'},
			{'name' : 'actualColorId','type' : 'string'},
			{'name' : 'actualColorName','type' : 'string'},
			{'name' : 'clarityDesc','type' : 'string'},
			{'name' : 'clarityName','type' : 'string'},
			{'name' : 'colorName','type' : 'string'},
			{'name' : 'colorDesc','type' : 'string'},
			{'name' : 'cutGradeDesc','type' : 'string'},
			{'name' : 'cutGradeName','type' : 'string'},
			{'name' : 'mainCatId','type' : 'string'},
			{'name' : 'segId','type' : 'string'},
			{'name' : 'segName','type' : 'string'},
			{'name' : 'suppliedByDesc','type' : 'string'},
			{'name' : 'suppliedByName','type' : 'string'},
			{'name' : 'wtRangeDesc','type' : 'string'},
			{'name' : 'wtRangeName','type' : 'string'},
			
			{'name' : 'stRate','type' : 'float'},
			{'name' : 'stoneCost','type' : 'string'},
			{'name' : 'costAmtS','type' : 'float'}, 
			{'name' : 'costRateS','type' : 'float'},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStoneCToSale").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 40,
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
			{'text' : '','datafield' : 'refNo','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'St Sl.No.','datafield' : 'serialNumber','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supp. By','datafield' : 'suppliedBy','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'St Cat',	'datafield' : 'mainCat','width' : '9%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Sub Cat. Desc','datafield' : 'subCatOrShape',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '10%'},
			{'text' : 'St Seg','datafield' : 'seg',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%'},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Color','datafield' : 'color','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Wt. Range',	'datafield' : 'wtRange','width' : '7%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'St Pcs','datafield' : 'pcs',editable : true,cellsalign : 'center',	align : 'center',sortable : false,'width' : '5%',
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {		
	       			var uqc = $('#jqxgridStoneCToSale').jqxGrid('getcellvalue',row,'uqc');
	       			var stRate = $('#jqxgridStoneCToSale').jqxGrid('getcellvalue',row,'stRate');
	       			var costRateS = $('#jqxgridStoneCToSale').jqxGrid('getcellvalue',row,'costRateS');
	       			
	       			if(uqc == "Pcs"){
	       			var sellingRate = stRate*newvalue
	       			var costRate = costRateS*newvalue
	       		    $("#jqxgridStoneCToSale").jqxGrid("setcellvalue", row, 'stoneCost', sellingRate);
	       		    $("#jqxgridStoneCToSale").jqxGrid("setcellvalue", row, 'costAmtS', costRate);
	       			}else{
	       				
	       			}
	      	     }
			},
			{'text' : 'St Wt.','datafield' : 'stWt','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : true,cellsformat : 'd3',
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {		
	       			var uqc = $('#jqxgridStoneCToSale').jqxGrid('getcellvalue',row,'uqc');
	       			var stRate = $('#jqxgridStoneCToSale').jqxGrid('getcellvalue',row,'stRate');
	       			var costRateS = $('#jqxgridStoneCToSale').jqxGrid('getcellvalue',row,'costRateS');
	       			
	       			if(uqc != "Pcs"){
	       			var sellingRate = stRate*newvalue
	       			var costRate = costRateS*newvalue
	       		    $("#jqxgridStoneCToSale").jqxGrid("setcellvalue", row, 'stoneCost', sellingRate);
	       		    $("#jqxgridStoneCToSale").jqxGrid("setcellvalue", row, 'costAmtS', costRate);
	       			}else{
	       				
	       			}
	      	     }
			},
			{'text' : 'Selling Rate','datafield' : 'stRate','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Selling Amt','datafield' : 'stoneCost','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Rate','datafield' : 'costRateS','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Amt','datafield' : 'costAmtS','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		]
	});
}

var accessoryDetailsCreateToSale = function(data){
	var source = {
        localdata: data,
        datatype: "json",
        datafields : [ 
        	{'name' : 'refNo','type' : 'int'},
			{'name' : 'serialNumber','type' : 'string'},
			{'name' : 'suppliedBy','type' : 'string'},
			{'name' : 'subCategoryDesc','type' : 'string'},
			{'name' : 'accSubCatOrShapeID','type' : 'string'},
			{'name' : 'accWt','type' : 'float'}, 
			{'name' : 'accRate','type' : 'float'},
			{'name' : 'accCost','type' : 'float'},
			{'name' : 'accPcs','type' : 'float'},
			{'name' : 'accCategry','type' : 'float'},
			{'name' : 'subCategoryId','type' : 'string'},
			{'name' : 'subCategoryName','type' : 'string'},
			{'name' : 'subCatDesc','type' : 'string'},
			{'name' : 'suppliedByName','type' : 'string'},
			{'name' : 'suppliedByDesc','type' : 'string'},
			{'name' : 'uom','type' : 'string'},
			{'name' : 'uomName','type' : 'string'},
			{'name' : 'uomDesc','type' : 'string'},
			{'name' : 'catDes','type' : 'string'},
			{'name' : 'accessoryCode','type' : 'string'},
			{'name' : 'costAmtA','type' : 'float',"map":''}, 
			{'name' : 'costRateA','type' : 'float',"map":''},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAccCToSale").jqxGrid({
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
			{'text' : 'Ref No.','datafield' : 'refNo','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc.Sl.No.','datafield' : 'serialNumber','width' : '10%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supp. By','datafield' : 'suppliedBy','width' : '10%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Cat.','datafield' : 'accCategry','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub category Description','datafield' : 'accSubCatOrShapeID',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '15%'},
			{'text' : 'UQC','datafield' : 'uom','width' : '9%',sortable : false,editable : false,hidden : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Pcs','datafield' : 'accPcs','width' : '10%',sortable : false,editable : true,cellsalign : 'center',align : 'center',
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {		
	       			var uqc = $('#jqxgridAccCToSale').jqxGrid('getcellvalue',row,'uom');
	       			var stRate = $('#jqxgridAccCToSale').jqxGrid('getcellvalue',row,'accRate');
	       			var costRateS = $('#jqxgridAccCToSale').jqxGrid('getcellvalue',row,'costRateA');
	       			
	       			if(uqc == "Pcs"){
	       			var sellingRate = stRate*newvalue
	       			var costRate = costRateS*newvalue
	       			$("#jqxgridAccCToSale").jqxGrid("setcellvalue", row, 'accCost', sellingRate);
	       		    $("#jqxgridAccCToSale").jqxGrid("setcellvalue", row, 'costAmtA', costRate);
	       			}else{
	       				
	       			}
	      	     }
			},
			{'text' : 'Acc Wt','datafield' : 'accWt','width' : '10%',	sortable : false,editable : true,	cellsalign : 'right',	align : 'center',cellsformat : 'd3',
				/*cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {		
					var uqc = $('#jqxgridAccCToSale').jqxGrid('getcellvalue',row,'uom');
	       			var stRate = $('#jqxgridAccCToSale').jqxGrid('getcellvalue',row,'accRate');
	       			var costRateS = $('#jqxgridAccCToSale').jqxGrid('getcellvalue',row,'costRateA');
	       			
	       			if(uqc != "Pcs"){
	       			var sellingRate = stRate*newvalue
	       			var costRate = costRateS*newvalue
	       		    $("#jqxgridAccCToSale").jqxGrid("setcellvalue", row, 'stoneCost', sellingRate);
	       		    $("#jqxgridAccCToSale").jqxGrid("setcellvalue", row, 'costAmtS', costRate);
	       			}else{
	       				
	       			}
	      	     }*/
			},
			{'text' : 'Acc Selling Rate','datafield' : 'accRate','width' : '15%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Selling Amt',	'datafield' : 'accCost','width' : '15%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Cost Rate','datafield' : 'costRateA','width' : '15%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Cost Amt',	'datafield' : 'costAmtA','width' : '15%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
		]
	});
}


$("#panelIdC").hide();
$("#validateHide").hide();

$("#toggleC").on('click', function(){
	$("#panelC").slideToggle();
});

$("#toggleCToSale").on('click', function(){
	$("#panelCToSale").slideToggle();
});

$("#toggleToDc").on('click', function(){
	$("#panelCToDc").slideToggle();
});


// ####################### Search IN-Case Of Create ############################

$("#searchC").on("click",function(){
	
    var stockNoC = $("#stockNoC").val();
	
	if(stockNoC == null || stockNoC == ""){
		$.growl.error({
			 message:"Please Enter the Stock Number!!",
			duration : 10000
		});
		return false;
	}
	
	$("#validateHide").show();
	$("#panelIdC").show();
	
	$("#jqxgridStoneC").show();
	$("#jqxgridAccC").show();
	$("#jqxgridItemDetC").show();
	
	$("#jqxgridStoneCToSale").show();
	$("#jqxgridAccCToSale").show();
	$("#jqxgridItemDetCToSale").show();
	
	
	
	
	$.getJSON("/OrderExecution/api/v1/getDisassembleOriginalStockDetails?stockId="+stockNoC+"&type=DC",function(data){
		
		if(data.resCode == 1){
			$("#panelCToSale").slideToggle();
			$("#panelC").slideToggle();
			
		var data =  data.payload;
		var itemArr = [];
		itemArr.push(data.originalStockItemDTO);
		
		itemDetailsCreate(itemArr);
		accessoryDetailsCreate(data.originalStockItemDTO.accessories);
		stoneDetailsCreate(data.originalStockItemDTO.stones);
		
		itemDetailsCreateToSale(itemArr);
		//accessoryDetailsCreateToSale();
		//stoneDetailsCreateToSale();
		
		}else if(data.resCode == 2){
			$("#panelC").slideToggle();
			itemDetailsCreate();
			accessoryDetailsCreate();
			stoneDetailsCreate();
			
			$.growl.error({
				 message:data.mesgStr,
				duration : 10000
			});
			return false;
		}else{
			$.growl.error({
				 message:data.mesgStr,
				duration : 10000
			});
			return false;
		}
	});
});

//######################## @ On-Click On Clear Reset Func ###################

$("#clearAllc").on("click",function(){
	     $('#disassembleCreateFunc').trigger("reset");
	     $("#jqxgridStoneC").jqxGrid('clear');
		 $("#jqxgridAccC").jqxGrid('clear');
		 $("#jqxgridItemDetC").jqxGrid('clear');
		 $("#jqxgridStoneCToSale").jqxGrid('clear');
		 $("#jqxgridAccCToSale").jqxGrid('clear');
		 $("#jqxgridItemDetCToSale").jqxGrid('clear');
		 $("#jqxgridItemDetCToDc").jqxGrid('clear');
		 $("#jqxgridStoneCToDc").jqxGrid('clear');
		 $("#jqxgridAccCToDc").jqxGrid('clear');
			
	   
		 
		 arrAcc = [];
		 arr = []
		 
		$("#stockNoC").val("");
});

// ########################### To DC Create Functionality #######################

var itemDetailsCreateToDc = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stockNo','type' : 'string','map':'id'},
			{'name' : 'skinPurity','type' : 'float','map':'orderItemSkinPurity>skinPurity'},
			{'name' : 'segment','type' : 'string'},
			
			{'name' : 'categoryC','type' : 'string'},
			{'name' : 'SubcategoryC','type' : 'string'},
			
			{'name' : 'costCodeD','type' : 'string','map':'costCode'},
			{'name' : 'costMCTotalCostD','type' : 'string','map':'costMCTotalCost'},
			{'name' : 'costWastageWtD','type' : 'string','map':'costWastageWt'},
			{'name' : 'vendorIdD','type' : 'string','map':'vendor>id'},
			{'name' : 'vendorNameD','type' : 'string','map':'vendor>name'},
			{'name' : 'articleCode','type' : 'string'},
			{'name' : 'accId','type':'string','map':'articleMasterDTO>id'},
			{'name' : 'meltingPurity','type' : 'float','map':'orderItemSkinPurity>meltingPurity'},
			{'name' : 'jwlType','type' : 'string'},
			{'name' : 'vendorCode','type' : 'string','map':'vendor>description'}, 
			{'name' : 'metalSegmentDes','type' : 'string','map':'metalSegment>description'},
			{'name' : 'metalSegmentCodeD','type' : 'string','map':'metalSegment>code'},
			{'name' : 'metalSegmentIdD','type' : 'string','map':'metalSegment>id'},
			
			{'name' : 'pcsOrPairs','type' : 'string','map':'finishedPieces'},
			{'name' : 'subCatDesc','type' : 'string','map':'subCategory>description'},
			{'name' : 'hsnId','type' : 'string','map':'hsnMasterDTO>id'},
			{'name' : 'grossWt','type' : 'string','map':'grossWeight'},
			{'name' : 'netWt','type' : 'string','map':'finishedNetWeight'},
			{'name' : 'wstageWt','type' : 'string','map':'wastageWt'},
			{'name' : 'labour','type' : 'string','map':'labour'}, 
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridItemDetCToDc").jqxGrid({
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
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Item Details');
		},
		columns : [
			{'text' : 'Stock No.','datafield' : 'stockNo','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Segment','datafield' : 'segment','width' : '8%',cellsalign : 'center',	align : 'center',sortable : false,editable : true,columntype : 'dropdownlist',displayfield : 'segmentN',
				createeditor: function (row, cellvalue, editor) { 
					
					var segmentId = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'segmentId');
					var segmentCode = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'segmentCode');
					var segment = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'segment');
					var segment = $('#jqxgridItemDetC').jqxGrid('getcellvalue',row,'segment');
					
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
							var res = data.payload.allSegments;
							editor.jqxDropDownList({source : res,displayMember : 'description',valueMember : 'id'});
						});
				},
				 cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
			    	 $("#jqxgridItemDetCToDc").jqxGrid("setcellvalue", row, 'jwlTypeN',null);  
			    	 $("#jqxgridItemDetCToDc").jqxGrid("setcellvalue", row, 'catN', null);  
			    	 $("#jqxgridItemDetCToDc").jqxGrid("setcellvalue", row, 'subCatN', null);  
			    	 $("#jqxgridItemDetCToDc").jqxGrid("setcellvalue", row, 'articleCode', null);  
			    }
			},
			{ text: 'Jewel Type', datafield: 'jwlType',width: '8%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'jwlTypeN',
				createeditor: function (row, cellvalue, editor) { 
					editor.on('click',function(event) {
						var segment = $('#jqxgridItemDetCToDc').jqxGrid('getcellvalue',row,'segment');
						fieldFilters = {
								"fieldFilters" : {
						               "type":"jewelType",
						        	   "segment":{"id":segment},
						           }
		       			}
					var rows = $("#jqxgridItemDetCToSale")	.jqxGrid('getrows');
					postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters),function(data) {
							var res = data.payload.jeweltypes;
							editor.jqxDropDownList({source : res,displayMember : 'description',valueMember : 'id'});
						});
					});
			   },
			   cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
			    	 $("#jqxgridItemDetCToDc").jqxGrid("setcellvalue", row, 'catN', null);  
			    	 $("#jqxgridItemDetCToDc").jqxGrid("setcellvalue", row, 'subCatN', null);  
			    	 $("#jqxgridItemDetCToDc").jqxGrid("setcellvalue", row, 'articleCode', null);  
			    }
			},
			{ text: 'Category', datafield: 'categoryC',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'catN',
	       		createeditor: function (row, cellvalue, editor) { 
	       			editor.on('click',function(event) {
	       			var segment = $('#jqxgridItemDetCToDc').jqxGrid('getcellvalue',row,'segment');
	       			var segmentN = $('#jqxgridItemDetCToDc').jqxGrid('getcellvalue',row,'segmentN');
	       			var jwlType = $('#jqxgridItemDetCToDc').jqxGrid('getcellvalue',row,'jwlType');
	       			fieldFilters = {
							"fieldFilters" : {
					           "type":"segCategory",
					           "jewel":{"id":jwlType},
					        	   "segment":{"id":segment},
					           }
	       			}
	       			postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters), function(data) {
					    var data = data.payload.maincats;
					    var mainCatArr = [];
						$.each(data, function(k, v){
							mainCatArr.push({
								"id" : v.id,
								"description" : v.description
							});
						});
						editor.jqxDropDownList({ source: mainCatArr, displayMember: 'description', valueMember: 'id'});		
	       			    });	
	       			});	
	      	     },
	      	   cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
			    	 $("#jqxgridItemDetCToDc").jqxGrid("setcellvalue", row, 'subCatN', null);  
			    	 $("#jqxgridItemDetCToDc").jqxGrid("setcellvalue", row, 'articleCode', null);  
			    }
			},
			{ text: 'Subcategory', datafield: 'SubcategoryC',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'subCatN',
	       		createeditor: function (row, cellvalue, editor) { 
	       			editor.on('click',function(event) {
	       			var segment = $('#jqxgridItemDetCToDc').jqxGrid('getcellvalue',row,'segment');
	       			var jwlType = $('#jqxgridItemDetCToDc').jqxGrid('getcellvalue',row,'jwlType');
	       			var categoryC = $('#jqxgridItemDetCToDc').jqxGrid('getcellvalue',row,'categoryC');
	       			
	       			fieldFilters = {
							"fieldFilters" : {
					           "type":"subCat",
					        	   "segment":{"id":segment},
					        	   "jewel":{"id":jwlType},
					        	   "category":{"id":categoryC}
					           }
					      }
	       			postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(fieldFilters), function(data) {
					    var data = data.payload.subCats;
					    var subCatArr = [];
						$.each(data, function(k, v){
							subCatArr.push({
								"id" : v.id,
								"description" : v.description
							});
						});
						editor.jqxDropDownList({ source: subCatArr, displayMember: 'description', valueMember: 'id'});		
	       			    });
	       			});
	      	     },
	      	     cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
	      	    	 
	      	    	$("#jqxgridItemDetCToDc").jqxGrid("setcellvalue", row, 'articleCode', null); 
	      	    	
	      	    	var segment = $('#jqxgridItemDetCToDc').jqxGrid('getcellvalue',row,'segment');
	       			var jwlType = $('#jqxgridItemDetCToDc').jqxGrid('getcellvalue',row,'jwlType');
	       			var categoryC = $('#jqxgridItemDetCToDc').jqxGrid('getcellvalue',row,'categoryC');
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
      		   	        $("#jqxgridItemDetCToDc").jqxGrid("setcellvalue", row, 'articleCode',null); 
					    var res = data.payload.article;
					    $.each(res,function(k,v){
					    	 $("#jqxgridItemDetCToDc").jqxGrid("setcellvalue", row, 'articleCode', v.name);  
					    })
       			    });
	      	     }
			},
			{'text' : 'Article Code','datafield' : 'articleCode','width' : '8%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '8%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat:'d2'},
			{'text' : 'Melting Purity',	'datafield' : 'meltingPurity','width' : '8%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat:'d2'},
			{'text' : 'Vendor code','datafield' : 'vendorCode',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '10%'},
			{'text' : 'Pcs/Pairs','datafield' : 'pcsOrPairs','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Sub.Cat.Desc','datafield' : 'subCatDesc','width' : '10%',sortable : false,editable : false,cellsalign : 'left',align : 'center',cellsformat : 'd3'},
			{'text' : 'HSN ID','datafield' : 'hsnId','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Gr.Wt.',	'datafield' : 'grossWt','width' : '7%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Nt.Wt.','datafield' : 'netWt','width' : '7%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat:'d3'},
			{'text' : 'Making selling charges','datafield' : 'labour',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '13%',cellsformat : 'd2'},
			{'text' : 'Selling wastage Wt.','datafield' : 'wstageWt','width' : '12%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'Cost Wastage Wt','datafield' : 'costWastageWtD','width' : '11%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat:'d3'},
			{'text' : 'Cost MC Total Cost','datafield' : 'costMCTotalCostD','width' : '11%',hidden :false,sortable : false, editable : false, cellsalign : 'right',align : 'center',cellsformat:'d2'},
		]
	});
}
var stoneDetailsCreateToDc = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'id','type' : 'string','map':'id'},
			{'name' : 'suppliedBy','type' : 'int',"map":'suppliedBy>id'},
			{'name' : 'serialNumber','type' : 'int','map':"stockSerialNo"},
			{'name' : 'seg','type' : 'string','map':"segmentDTO>description"},
			{'name' : 'segId','type' : 'string','map':"segmentDTO>id"},
			{'name' : 'mainCat','type' : 'string','map':"category"}, 
			{'name' : 'mainCatId','type' : 'string','map':"catId"}, 
			{'name' : 'subCatOrShape','type' : 'string','map':"subCategoryDesc"},
			{'name' : 'stoneCodeD','type' : 'string','map':"stoneCode"},
			{'name' : 'clarity','type' : 'string','map':"clarity>id"},
			{'name' : 'color','type' : 'string','map':"color>id"},
			{'name' : 'cutGrade','type' : 'string','map':"cutGrade>id"}, 
			{'name' : 'wtRange','type' : 'string','map':"weightRange>id"},
			{'name' : 'pcs','type' : 'long','map':"pieces"},
			{'name' : 'stWt','type' : 'float','map':"weight"}, 
			{'name' : 'uqc','type' : 'string','map':"uom"},
			
			{'name' : 'stRate','type' : 'float','map':"sellingPrice"},
			{'name' : 'stoneCost','type' : 'float','map':"totalSellingPrice"},
			
			{'name' : 'costAmt','type' : 'string','map':"totalCostPrice"},
			{'name' : 'costRate','type' : 'string','map':"costPrice"},
			
			{'name' : 'actualColorIdD','type' : 'string','map':"actualColor>id"},
			{'name' : 'actualColorNameD','type' : 'string','map':"actualColor>name"},
			{'name' : 'actualColorDescD','type' : 'string','map':"actualColor>description"},
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStoneCToDc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 40,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
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
			{'text' : 'St Sl.No.','datafield' : 'serialNumber','width' : '7%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supp. By','datafield' : 'suppliedBy','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'St Cat',	'datafield' : 'mainCat','width' : '9%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Sub Cat. Desc','datafield' : 'subCatOrShape',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '10%'},
			{'text' : 'St Seg','datafield' : 'seg',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '8%'},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Color','datafield' : 'color','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Wt. Range',	'datafield' : 'wtRange','width' : '7%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'St Pcs','datafield' : 'pcs',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%'},
			{'text' : 'St Wt.','datafield' : 'stWt','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'Selling Rate','datafield' : 'stRate','width' : '8%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Selling Cost','datafield' : 'stoneCost','width' : '8%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : ' Cost Rate','datafield' : 'costRate','width' : '15%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : ' Cost Amt',	'datafield' : 'costAmt','width' : '15%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
		]
	});
}

var accessoryDetailsCreateToDc = function(data){
	var source = {
        localdata: data,
        datatype: "json",
        datafields : [ 
        	{'name' :'id','type':'int'},
        	{'name' : 'accPieces','type' : 'int','map':'pieces'},
			{'name' : 'serialNumber','type' : 'string','map':'serialNumber'},
			{'name' : 'suppliedBy','type' : 'string','map':"suppliedBy>id"},
			{'name' : 'category','type' : 'string','map':"catDes"},
			
			{'name' : 'subCategoryDesc','type' : 'string','map':"SubcategoryC"},
			{'name' : 'accSubCatOrShapeID','type' : 'string','map':"subCategoryDesc"},
			{'name' : 'accWt','type' : 'float','map':"weight"}, 
			
			{'name' : 'costPrice','type' : 'string'},
			{'name' : 'accessoryCode','type' : 'string'},
			{'name' : 'uom','type':'string','map':'uom>id'},
			
			{'name' : 'totalSellingPriceD','type' : 'string',"map":'totalSellingPrice'},
			{'name' : 'totalCostPriceD','type' : 'string','map':'totalCostPrice'},
			{'name' : 'sellingPriceD','type':'string','map':'sellingPrice'},
			
			{'name' : 'accRate','type' : 'float','map':"sellingPrice"},
			{'name' : 'accCost','type' : 'float','map':"totalSellingPrice"},
			
			{'name' : 'costAmt','type' : 'string','map':"totalCostPrice"},
			{'name' : 'costRate','type' : 'string','map':"costPrice"},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAccCToDc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 40,
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
			{'text' : 'Ref No.','datafield' : 'refNo','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc.Sl.No.','datafield' : 'serialNumber','width' : '10%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Supp. By','datafield' : 'suppliedBy','width' : '10%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Cat.','datafield' : 'category','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub category Description','datafield' : 'accSubCatOrShapeID',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '15%'},
			{'text' : 'Acc Pcs','datafield' : 'accPieces','width' : '10%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Wt','datafield' : 'accWt','width' : '10%',	sortable : false,editable : false,	cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Acc Selling Rate','datafield' : 'accRate','width' : '15%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Selling Cost',	'datafield' : 'accCost','width' : '15%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Rate','datafield' : 'costRate','width' : '15%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Cost Amt',	'datafield' : 'costAmt','width' : '15%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
		]
	});
}

//############################ @ Validate Functionality ######################
$("#panelIdValidate").hide();
$("#validateId").on("click",function(){
	   
	var dAssembleArr = [];
	var originalRow1 = $("#jqxgridItemDetC").jqxGrid("getrows");
	var originalRow2 = $("#jqxgridStoneC").jqxGrid("getrows");
	var originalRow3 = $("#jqxgridAccC").jqxGrid("getrows");
	
	for(var i=0;i<originalRow1.length; i++){
		var originalRow1 = originalRow1[i];
		
	var disassembleObjOriginal = {
		     "id": originalRow1.stockNo,
		     "grossWeight": originalRow1.grossWt,
		     "finishedNetWeight": originalRow1.netWt,
		     "finishedPieces": originalRow1.pcsOrPairs,
		     
		     "orderItemSkinPurity": {
			     "skinPurity": originalRow1.skinPurity,
			      "meltingPurity": originalRow1.meltingPurity
		    },
		    "vendor": {
			      "id": originalRow1.vendorId,
			      "name":originalRow1.vendorName,
			      "description": originalRow1.vendorCode
		     },
			"articleMasterDTO": {
			      "id": originalRow1.articleMasterDTO,
			      "articleCode": originalRow1.articleCode,
			      "articleDesc": originalRow1.articleDesc,
			    },
			 "segment": {
			      "id":originalRow1.segmentId,
			      "segmentId": originalRow1.segmentId,
			      "description": originalRow1.segment,
			      "code": originalRow1.segmentCode
			    },
		     "metalSegment": {
			      "id": originalRow1.metalSegment,
			      "segmentId":originalRow1.metalSegmentId,
			      "description": originalRow1.metalSegmentDesc,
			      "code": originalRow1.metalSegmentCode
			    },
			  "jewelTypeDTO": {
			      "id": originalRow1.jewelTypeDTOId,
			      "code": originalRow1.jewelTypeDTOCode,
			      "description": originalRow1.jwlType
			    },
			  "subCategory": {
			      "id": originalRow1.subCategoryId,
			      "code": originalRow1.subCategorycode,
			      "description": originalRow1.SubcategoryC
			    },
			  "hsnMasterDTO": {
			      "id": originalRow1.hsnId,
			      "hsnCode":originalRow1.hsnCode,
			      "hsnDescription": originalRow1.hsnDescription
			    },
			    "wastageWt": originalRow1.wstageWt,
			    "labour": originalRow1.labour,
			    "costCode": originalRow1.costCode,
			    "type": "Original",
			    "costMCTotalCost": originalRow1.costMCTotalCost,
			    "costWastageWt": originalRow1.costWastageWt,
			    
			     "stones" : [],
			    "accessories" : []
	}
	$.each(originalRow2, function(k,v) {

		var stoneObj = {
			        "id": v.id,
			        "suppliedBy": {
			          "id": v.suppliedBy,
			          "name": v.suppliedByName,
			          "description": v.suppliedByDesc
			        },
			        "uom": v.uqc,
			        "cutGrade": {
			          "id": v.cutGrade,
			          "name": v.cutGradeName,
			          "description": v.cutGradeDesc
			        },
			        "clarity": {
			          "id": v.clarity,
			          "name": v.clarityName,
			          "description": v.clarityDesc
			        },
			        "color": {
			          "id": v.color,
			          "name": v.colorName,
			          "description": v.colorDesc
			        },
			        "actualColor": {
			          "id": v.actualColorId,
			          "name": v.actualColorName,
			          "description": v.actualColorDesc
			        },
			        "weightRange": {
			          "id": v.wtRange,
			          "name": v.wtRangeName,
			          "description": v.wtRangeDesc
			        },
			        "subCategoryDesc": v.subCatOrShape,
			        "pieces":v.pcs,
			        "weight": v.stWt,
			        "costPrice": v.costRateS,
			        "sellingPrice": v.stRate,
			        "stockSerialNo": v.serialNumber,
			        "segment": v.seg,
			        "category": v.mainCat,
			        "stoneCode": v.stoneCode,
			        "totalSellingPrice": v.stoneCost,
			        "catId": v.mainCatId,
			        "segmentDTO": {
			          "id": v.segId,
			          "segmentId": v.segId,
			          "description": v.seg,
			          "code": v.segName
			        },
			        "totalCostPrice": v.costAmtS,
			        "isSelected": v.checkBox
	       }
	     disassembleObjOriginal["stones"].push(stoneObj);
	});
	
	$.each(originalRow3, function(k,v) {
		
		var accObj = {
				"id": v.refNo,
		        "serialNumber": v.serialNumber,
		        "subCategory": v.subCategoryId,
		        "subCategoryDesc": v.accSubCatOrShapeID,
		        "suppliedBy": {
		          "id": v.suppliedBy,
		          "name": v.suppliedByName,
		          "description": v.suppliedByDesc,
		        },
		        "uom": {
		          "id": v.uom,
		          "name": v.uomName,
		          "description": v.uomDesc,
		        },
		        "accessoryCode": v.accessoryCode,
		        "costPrice": v.costRateA,
		        "pieces": v.accPcs,
		        "sellingPrice": v.accRate,
		        "weight": v.accWt,
		        "catDes": v.accCategry,
		        "totalSellingPrice": v.accCost,
		        "totalCostPrice": v.costAmtA,
		        "isSelected": v.checkBox,
	       }
	     disassembleObjOriginal["accessories"].push(accObj);
	});
		dAssembleArr.push(disassembleObjOriginal);
	}
	
	
	var toSaleRow1 = $("#jqxgridItemDetCToSale").jqxGrid("getrows");
	var toSaleRow2 = $("#jqxgridStoneCToSale").jqxGrid("getrows");
	var toSaleRow3 = $("#jqxgridAccCToSale").jqxGrid("getrows");
	
	for(var i=0;i<toSaleRow1.length; i++){
			var segment = $("#jqxgridItemDetCToSale").jqxGrid('getcellvalue',toSaleRow1[i],"segment");
			var jwlType = $("#jqxgridItemDetCToSale").jqxGrid('getcellvalue',toSaleRow1[i],"jwlType");
			var SubcategoryC = $("#jqxgridItemDetCToSale").jqxGrid('getcellvalue',toSaleRow1[i],"SubcategoryC");
			var articleCodeC = $("#jqxgridItemDetCToSale").jqxGrid('getcellvalue',toSaleRow1[i],"articleCodeC");
			var netWt = $("#jqxgridItemDetCToSale").jqxGrid('getcellvalue',toSaleRow1[i],"netWt");
			
			if((segment == "" || segment == null)||(jwlType == "" || jwlType == null)||
			(articleCodeC == "" || articleCodeC == null)||(netWt == "" || netWt == null)){
				$.growl.error({
					 message:"Please fill all the Grid Feilds!",
					duration : 10000
				});
		   	return false;
			}
	}
	
for(var i=0;i<toSaleRow1.length; i++){
	var toSaleRow1 = toSaleRow1[i];
	var disassembleObjToSale = {
			
		     "id": toSaleRow1.stockNo,
		     "grossWeight": toSaleRow1.grossWt,
		     "finishedNetWeight": toSaleRow1.netWt,
		     "finishedPieces": toSaleRow1.pcsOrPairs,
		     
		     "orderItemSkinPurity": {
			     "skinPurity": toSaleRow1.skinPurity,
			      "meltingPurity": toSaleRow1.meltingPurity
		    },
		    "vendor": {
			      "id": toSaleRow1.vendorIdC,
			      "name":toSaleRow1.vendorCode,
			      "description": toSaleRow1.vendorNameC
		     },
			"articleMasterDTO": {
			      "id": toSaleRow1.articleMasterDTOC,
			      "articleCode": toSaleRow1.articleCodeC,
			      "articleDesc": toSaleRow1.articleDescC,
			    },
			 "segment": {
			      "id":toSaleRow1.segment,
			      "segmentId": toSaleRow1.segment,
			      "description": toSaleRow1.segmentN,
			    },
		     "metalSegment": {
			      "id": toSaleRow1.metalSegment,
			      "segmentId":toSaleRow1.metalSegmentId,
			      "description": toSaleRow1.metalSegmentDesc,
			      "code": toSaleRow1.metalSegmentCode
			    },
			  "jewelTypeDTO": {
			      "id": toSaleRow1.jwlType,
			      "description": toSaleRow1.jwlTypeN
			    },
			  "subCategory": {
			      "id": toSaleRow1.SubcategoryC,
			      "code": toSaleRow1.subCatN,
			      "description": toSaleRow1.subCatDesc
			    },
			  "hsnMasterDTO": {
			      "id": toSaleRow1.hsnId,
			      "hsnCode":toSaleRow1.hsnCodeC,
			      "hsnDescription": toSaleRow1.hsnDescriptionC
			    },
			    "wastageWt": toSaleRow1.wstageWt,
			    "labour": toSaleRow1.labour,
			    "costCode": toSaleRow1.costCodeC,
			    "type": "toSale",
			    "costMCTotalCost": toSaleRow1.costMCTotalCostC,
			    "costWastageWt": toSaleRow1.costWastageWtC,
			    
			     "stones" : [],
			    "accessories" : []
	}
	
	$.each(toSaleRow2, function(k,v) {
		var stoneObjToSale = {
			        "id": v.id,
			        "suppliedBy": {
			          "id": v.suppliedBy,
			          "name": v.suppliedByName,
			          "description": v.suppliedByDesc
			        },
			        "uom": v.uqc,
			        "cutGrade": {
			          "id": v.cutGrade,
			          "name": v.cutGradeName,
			          "description": v.cutGradeDesc
			        },
			        "clarity": {
			          "id": v.clarity,
			          "name": v.clarityName,
			          "description": v.clarityDesc
			        },
			        "color": {
			          "id": v.color,
			          "name": v.colorName,
			          "description": v.colorDesc
			        },
			        "actualColor": {
			          "id": v.actualColorId,
			          "name": v.actualColorName,
			          "description": v.actualColorDesc
			        },
			        "weightRange": {
			          "id": v.wtRange,
			          "name": v.wtRangeName,
			          "description": v.wtRangeDesc
			        },
			        "subCategoryDesc": v.subCatOrShape,
			        "pieces":v.pcs,
			        "weight": v.stWt,
			        "costPrice": v.costRateS,
			        "sellingPrice": v.stRate,
			        "stockSerialNo": v.serialNumber,
			        "segment": v.segId,
			        "category": v.mainCat,
			        "stoneCode": v.stoneCode,
			        "totalSellingPrice": v.stoneCost,
			        "catId": v.mainCatId,
			        
			        "segmentDTO": {
			          "id": v.segId,
			          "segmentId": v.segId,
			          "description": v.seg,
			          "code": v.segName
			        },
			        "totalCostPrice": v.costAmtS,
	       }
		disassembleObjToSale["stones"].push(stoneObjToSale);
	});
	
	$.each(toSaleRow3, function(k,v) {
		var accObj = {
				"id": v.refNo,
		        "serialNumber": v.serialNumber,
		        "subCategory": v.subCategoryId,
		        "subCategoryDesc": v.accSubCatOrShapeID,
		        "suppliedBy": {
		          "id": v.suppliedBy,
		          "name": v.suppliedByName,
		          "description": v.subCategoryDesc,
		        },
		        "uom": {
		          "id": v.uom,
		          "name": v.uomName,
		          "description": v.uomDesc,
		        },
		       
		        "accessoryCode": v.accessoryCode,
		        "costPrice": v.costRateA,
		        "pieces": v.accPcs,
		        "sellingPrice": v.accRate,
		        "weight": v.accWt,
		        "catDes": v.accCategry,
		        "totalSellingPrice": v.accCost,
		        "totalCostPrice": v.costAmtA,
	       }
		disassembleObjToSale["accessories"].push(accObj);
	});
	dAssembleArr.push(disassembleObjToSale);
}
	
	postJSON("/OrderExecution/api/v1/validateSaleDetailsForDisassemble",JSON.stringify(dAssembleArr),function(response){
		if(response.resCode == 1){
		var toDCStockItemDTO = response.payload.toDCStockItemDTO;
		$("#panelIdValidate").show();
		$("#panelCToDc").slideToggle();
		var arr = [];
		arr.push(toDCStockItemDTO)
		itemDetailsCreateToDc(arr);
		$("#jqxgridItemDetCToDc").show();
		
		$("#jqxgridStoneCToDc").show();
		$("#jqxgridAccCToDc").show();
		stoneDetailsCreateToDc(toDCStockItemDTO.stones);
		accessoryDetailsCreateToDc(toDCStockItemDTO.accessories);
		}else if(response.resCode == 2){
			$.growl.error({
				 message:response.mesgStr,
				duration : 10000
			});
			return false;
		}else{
			$.growl.error({
				 message:response.mesgStr,
				duration : 10000
			});
			return false;
		}
	});
});

$("#save").on("click",function(){
	
		var dAssembleArrForSave = [];
		var toSaleRow1 = $("#jqxgridItemDetCToSale").jqxGrid("getrows");
		var toSaleRow2 = $("#jqxgridStoneCToSale").jqxGrid("getrows");
		var toSaleRow3 = $("#jqxgridAccCToSale").jqxGrid("getrows");
			
		for(var i=0;i<toSaleRow1.length; i++){
			var toSaleRow1 = toSaleRow1[i];
			var disassembleObjToSale = {
					
				 "id": toSaleRow1.stockNo,
			     "grossWeight": parseFloat(toSaleRow1.grossWt),
			     "finishedNetWeight":parseFloat(toSaleRow1.netWt),
			     "finishedPieces": toSaleRow1.pcsOrPairs,
			     
			     "orderItemSkinPurity": {
				     "skinPurity": toSaleRow1.skinPurity,
				      "meltingPurity": toSaleRow1.meltingPurity
			    },
			    "vendor": {
				      "id": toSaleRow1.vendorIdC,
				      "name":toSaleRow1.vendorCode,
				      "description": toSaleRow1.vendorNameC
			     },
				"articleMasterDTO": {
				      "id": toSaleRow1.articleMasterDTOC,
				      "articleCode": toSaleRow1.articleCodeC,
				      "articleDesc": toSaleRow1.articleDescC,
				    },
				 "segment": {
				      "id":toSaleRow1.segment,
				      "segmentId": toSaleRow1.segment,
				      "description": toSaleRow1.segmentN,
				    },
			     "metalSegment": {
				      "id": toSaleRow1.metalSegmentIdD,
				      "segmentId":toSaleRow1.metalSegmentIdD,
				      "description": toSaleRow1.metalSegmentDes,
				      "code": toSaleRow1.metalSegmentCodeD
				    },
				  "originalStockId": toSaleRow1.stockNo ,
				  "jewelTypeDTO": {
				      "id": toSaleRow1.jwlType,
				      "description": toSaleRow1.jwlTypeN
				    },
				   "category": {
					      "id": toSaleRow1.categoryC,
					      "description": toSaleRow1.catN
					},
				  "subCategory": {
				      "id": toSaleRow1.SubcategoryC,
				      "code": toSaleRow1.subCatN,
				      "description": toSaleRow1.subCatDesc
				    },
				  "hsnMasterDTO": {
				      "id": toSaleRow1.hsnId,
				      "hsnCode":toSaleRow1.hsnCodeC,
				      "hsnDescription": toSaleRow1.hsnDescriptionC
				    },
				    "wastageWt": toSaleRow1.wstageWt,
				    "labour": toSaleRow1.labour,
				    "costCode": toSaleRow1.costCodeC,
				    "type": "toSale",
				    "isSelected":true,
				    "costMCTotalCost": toSaleRow1.costMCTotalCostC,
				    "costWastageWt": toSaleRow1.costWastageWtC,
				    "storeOrDC" :"dc",
				     "stones" : [],
				    "accessories" : []
		}
		
		$.each(toSaleRow2, function(k,v) {
			var stoneObjToSale = {
				        "id": v.id,
				        "suppliedBy": {
				          "id": v.suppliedBy,
				          "name": v.suppliedByName,
				          "description": v.suppliedByDesc
				        },
				        "uom": v.uqc,
				        "cutGrade": {
				          "id": v.cutGrade,
				          "name": v.cutGradeName,
				          "description": v.cutGradeDesc
				        },
				        "clarity": {
				          "id": v.clarity,
				          "name": v.clarityName,
				          "description": v.clarityDesc
				        },
				        "color": {
				          "id": v.color,
				          "name": v.colorName,
				          "description": v.colorDesc
				        },
				        "actualColor": {
				          "id": v.actualColorId,
				          "name": v.actualColorName,
				          "description": v.actualColorDesc
				        },
				        "weightRange": {
				          "id": v.wtRange,
				          "name": v.wtRangeName,
				          "description": v.wtRangeDesc
				        },
				        
				        "isSelected":true,
				        "subCategoryDesc": v.subCatOrShape,
				        "pieces":v.pcs,
				        "weight": v.stWt,
				        "costPrice": v.costRateS,
				        "sellingPrice": v.stRate,
				        "stockSerialNo": v.serialNumber,
				        "segment": v.segId,
				        "category": v.mainCat,
				        "stoneCode": v.stoneCode,
				        "totalSellingPrice": v.stoneCost,
				        "catId": v.mainCatId,
				        
				        "segmentDTO": {
				          "id": v.segId,
				          "segmentId": v.segId,
				          "description": v.seg,
				          "code": v.segName
				        },
				        "totalCostPrice": v.costAmtS,
		       }
			disassembleObjToSale["stones"].push(stoneObjToSale);
		});
		
		$.each(toSaleRow3, function(k,v) {
			var accObj = {
					"id": v.refNo,
			        "serialNumber": v.serialNumber,
			        "subCategory": v.subCategoryId,
			        "subCategoryDesc": v.accSubCatOrShapeID,
			        "suppliedBy": {
			          "id": v.suppliedBy,
			          "name": v.suppliedByName,
			          "description": v.subCategoryDesc,
			        },
			        "uom": {
			          "id": v.uom,
			          "name": v.uomName,
			          "description": v.uomDesc,
			        },
			      
			        "accessoryCode": v.accessoryCode,
			        "costPrice": v.costRateA,
			        "pieces": v.accPcs,
			        "sellingPrice": v.accRate,
			        "weight": v.accWt,
			        "catDes": v.accCategry,
			        "totalSellingPrice": v.accCost,
			        "totalCostPrice": v.costAmtA,
		       }
			disassembleObjToSale["accessories"].push(accObj);
			});
			dAssembleArrForSave.push(disassembleObjToSale);
		}
		
		var toSaleRowToDC1 = $("#jqxgridItemDetCToDc").jqxGrid("getrows");
		var toSaleRowToDC2 = $("#jqxgridStoneCToDc").jqxGrid("getrows");
		var toSaleRowToDC3 = $("#jqxgridAccCToDc").jqxGrid("getrows");
		
		for(var i=0;i<toSaleRowToDC1.length; i++){
			var segment = $("#jqxgridItemDetCToSale").jqxGrid('getcellvalue',toSaleRowToDC1[i],"segment");
			var jwlType = $("#jqxgridItemDetCToSale").jqxGrid('getcellvalue',toSaleRowToDC1[i],"jwlType");
			var SubcategoryC = $("#jqxgridItemDetCToSale").jqxGrid('getcellvalue',toSaleRowToDC1[i],"SubcategoryC");
			var articleCodeC = $("#jqxgridItemDetCToSale").jqxGrid('getcellvalue',toSaleRowToDC1[i],"articleCode");
			
			if((segment == "" || segment == null)||(jwlType == "" || jwlType == null)||
			(articleCodeC == "" || articleCodeC == null)){
				$.growl.error({
					 message:"Please fill all the Grid Feilds!",
					duration : 10000
				});
		   	return false;
			}
	   }
		
		for(var i=0;i<toSaleRowToDC1.length; i++){
			var toDcRow1 = toSaleRowToDC1[i];
			var disassembleObjToSale1 = {
					
				 "id": toDcRow1.stockNo,
			     "grossWeight": toDcRow1.grossWt,
			     "finishedNetWeight": toDcRow1.netWt,
			     "finishedPieces": toDcRow1.pcsOrPairs,
			     
			     "orderItemSkinPurity": {
				     "skinPurity": toDcRow1.skinPurity,
				      "meltingPurity": toDcRow1.meltingPurity
			    },
			    "vendor": {
				      "id": toDcRow1.vendorIdD,
				      "name":toDcRow1.vendorNameD,
				      "description": toDcRow1.vendorCode
			     },
				"articleMasterDTO": {
				      "id": toDcRow1.accId,
				      "name":toDcRow1.articleCode
				    },
				 "segment": {
				      "id":toDcRow1.segment,
				      "segmentId": toDcRow1.segment,
				      "description": toDcRow1.segmentN,
				    },
			     "metalSegment": {
			    	  "id": toSaleRow1.metalSegmentIdD,
				      "segmentId":toSaleRow1.metalSegmentIdD,
				      "description": toSaleRow1.metalSegmentDes,
				      "code": toSaleRow1.metalSegmentCodeD
				    },
				  "jewelTypeDTO": {
				      "id": toDcRow1.jwlType,
				      "description": toDcRow1.jwlTypeN
				    },
				  "subCategory": {
				       "id": toDcRow1.SubcategoryC,
				       // "code": toDcRow1.subCatN,
				       "description": toDcRow1.subCatN
				    },
				    "category": {
					      "id": toSaleRow1.categoryC,
					      "description": toSaleRow1.catN
					},
				  "hsnMasterDTO": {
				      "id": toDcRow1.hsnId,
				      "hsnCode":toDcRow1.hsnCodeC,
				      "hsnDescription": toDcRow1.hsnDescriptionC
				    },
				    "wastageWt": toDcRow1.wstageWt,
				    "labour": toDcRow1.labour,
				    "costCode": toDcRow1.costCodeD,
				    "type": "toDC",
				    "costMCTotalCost": toDcRow1.costMCTotalCostD,
				    "costWastageWt": toDcRow1.costWastageWtD,
				    "storeOrDC" :"dc",
				     "stones" : [],
				    "accessories" : []
		}
		
		$.each(toSaleRowToDC2, function(k,v) {
			var stoneObjToSale1 = {
					    "id": v.id,
				        "suppliedBy": {
				          "id": v.suppliedBy,
				        },
				        "uom": v.uqc,
				        "cutGrade": {
				          "id": v.cutGrade,
				        },
				        "clarity": {
				          "id": v.clarity,
				        },
				        "color": {
				          "id": v.color,
				        },
				        "actualColor": {
				          "id": v.actualColorIdD,
				          "name": v.actualColorNameD,
				          "description": v.actualColorDescD
				        },
				        "weightRange": {
				          "id": v.wtRange,
				        },
				        "subCategoryDesc": v.subCatOrShape,
				        "pieces":v.pcs,
				        "weight": v.stWt,
				        "costPrice": v.costRate,
				        "sellingPrice": v.stRate,
				        "stockSerialNo": v.serialNumber,
				        "segment": v.segId,
				        "category": v.mainCat,
				        "stoneCode": v.stoneCodeD,
				        "totalSellingPrice": v.stoneCost,
				        "catId": v.mainCatId,
				        "segmentDTO": {
				          "id": v.segId,
				          "segmentId": v.segId,
				          "description": v.seg,
				        },
				        "toSaleStoneSellingRate":v.toSaleStoneSellingRateD,
				        "totalCostPrice": v.costAmt,
			}
			disassembleObjToSale1["stones"].push(stoneObjToSale1);
		});
		
		$.each(toSaleRowToDC3, function(k,v) {
			var accObj1 = {
					"id": v.id,
			        "serialNumber": v.serialNumber,
			        "subCategoryDesc": v.accSubCatOrShapeID,
			        "suppliedBy": {
			          "id": v.suppliedBy,
			        },
			        "subCategory": {
				          "id": v.subCategoryDesc,
				    },
			        "uom": {
			          "id": v.uom,
			        },
			        "accessoryCode": v.accessoryCode,
			        "costPrice": v.costRate,
			        "pieces": v.accPieces,
			        "weight": v.accWt,
			        "catDes": v.category,
			        "totalSellingPrice": v.accCost,
			        "totalCostPrice": v.costAmt,
			        "sellingPrice": v.accRate
		       }
			disassembleObjToSale1["accessories"].push(accObj1);
			});
			dAssembleArrForSave.push(disassembleObjToSale1);
		}
	postJSON("/OrderExecution/api/v1/createDisassembleOfItems",JSON.stringify(dAssembleArrForSave),function(data){
		if (data.resCode == "1") {
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
             redirect();				
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
		   });
		}			
	});
});
// ################### No. Validation ##############
$('#stockNoS').on("change",function() {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});
$('#stockNoC').on("change",function() {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});