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

$("#gridTabsST").hide();
$("#gridTabsCO").hide();
$("#retId").hide();
$("#coRetId").hide();
$("#gridTabsST").tabs({
});
$("#gridTabsCO").tabs({
});
activaTab('tabFgdefaultST');
activaTab('tabFgdefaultCO');

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};

$("#searchCu").on('click',function(){
	var orderNo = $("#orderNoCuC").val();
	var orderSl = $("#orderSlNoCuC").val();
	
	if(orderNo == "" || orderSl == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		$.getJSON('/OrderExecution/api/v1/findMaterialReturn?orderNo='+ orderNo+"&orderSrlNo="+orderSl+"&orderType=ST",function(data) {
			if(data.resCode == 1){
				var fgDet = data.payload.fgDetails;
				var stoneDet = data.payload.stoneDetails;
				var accDet = data.payload.accDetails;
				$("#gridTabsST").show();
				$("#retId").show();
				stockOrderCreateGrid(fgDet);
				$("#jqxgrid4").show();
				stockOrderStoneCreateGrid(stoneDet);
				$('#jqxgrid5').show();
				stockOrderAccCreateGrid(accDet);
				$('#jqxgrid6').show();
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
});

var material = "F";
$("#homeT").on('click',function(){
	material = "F";
});

$("#stoneDetailsT").on('click',function(){
	material = "S";
});

$("#accDetailsT").on('click',function(){
	material = "A";
});
//############### Stock Order Create Grids Started ##################################
// Stock Order FG Grid
var stockOrderCreateGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'orderNo','type' : 'int','map':'orderId'},
			{'name' : 'orderSl','type' : 'int','map' : 'orderSrlNo'},
			{'name' : 'refStockNo','type' : 'int','map':'stockNo'}, 
			{'name' : 'orderKind','type' : 'string','map' : 'orderKind'},
			{'name' : 'segment','type' : 'string','map' : 'segment>description'},
			{'name' : 'metalType','type' : 'string','map' : 'metalSegment>description'},
			{'name' : 'subCatDesc','type' : 'string','map' : 'subCategoryDesc'},
			{'name' : 'purity','type' : 'float','map' : 'skinPurity'},
			{'name' : 'pcs','type' : 'int','map' : 'pieces'},
			{'name' : 'preGwt','type' : 'float','map' : 'preRepairGrossWt'}, 
			{'name' : 'preNwt','type' : 'float','map' : 'preRepairNetWt'},
			{'name' : 'finGwt','type' : 'float','map' : 'finishedGrossWt'}, 
			{'name' : 'finNwt','type' : 'float','map' : 'finishedNetWt'},
			{'name' : 'selectionStatus','type' : 'bool'},
			
			
			{'name' : 'materialType','type' : 'string'},
			{'name' : 'orderType','type' : 'string'},
			{'name' : 'orderStoneAccSrlNo','type' : 'int'}, 
			{'name' : 'locationCode','type' : 'string'},
			{'name' : 'grossWt','type' : 'float'},
			{'name' : 'netWt','type' : 'float'},
			{'name' : 'pureWt','type' : 'float'},
			{'name' : 'stoneWt','type' : 'float'},
			{'name' : 'accessoryWt','type' : 'float'},
			{'name' : 'suppliedBy','type' : 'string'},
			{'name' : 'storeOrDC','type' : 'string'},
			{'name' : 'storeOrDcId','type' : 'int'}, 
			{'name' : 'currentZone','type' : 'int','map' : 'currentZone>id'},
			{'name' : 'cashier','type' : 'string'}, 
			{'name' : 'cashierSatus','type' : 'string'},
			{'name' : 'metalSegmentId','type' : 'int','map':'metalSegment>id'},
			{'name' : 'metalSegmentCode','type' : 'string','map':'metalSegment>code'},
			
			{'name' : 'segmentId','type' : 'int','map':'segment>id'},
			{'name' : 'segmentCode','type' : 'string','map':'segment>code'},
			{'name' : 'jewelType','type' : 'int','map':'jewelType>id'}, 
			{'name' : 'category','type' : 'string'},
			{'name' : 'subCategory','type' : 'string'},
			{'name' : 'shape','type' : 'string'},
			{'name' : 'custGivenWt','type' : 'float'},
			{'name' : 'custGivenPcs','type' : 'int'},
			{'name' : 'custReqWt','type' : 'float'},
			{'name' : 'custReqPcs','type' : 'int'}, 
			{'name' : 'orderItemStatus','type' : 'float'},
			{'name' : 'articleCode','type' : 'string'}, 
			{'name' : 'cutGrade','type' : 'string'},
			{'name' : 'clarity','type' : 'float'},
			{'name' : 'color','type' : 'string'},
			{'name' : 'createdBy','type' : 'string'},
			{'name' : 'createdDate','type' : 'string'},
			{'name' : 'fromWtCost','type' : 'float'},
			{'name' : 'toWtCost','type' : 'float'},
			{'name' : 'finishedPcs','type' : 'int'},
			{'name':'preRepairPcs',type:'int'},
			{'name':'toLocationCode',type:'string'}
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid4").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		selectionmode : 'checkbox',
		enablebrowserselection: false,
		columns : [
			{'text' : 'Order No','datafield' : 'orderNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Order Sl No','datafield' : 'orderSl','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Ref Stock No','datafield' : 'refStockNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Order Kind','datafield' : 'orderKind','width' : '11%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Segment','datafield' : 'segment','width' : '6.5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Metal Type','datafield' : 'metalType','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Article Desc','datafield' : 'subCatDesc','width' : '14%',cellsalign : 'left',align : 'center',sortable : false,editable : false},
			{'text' : 'Purity','datafield' : 'purity','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,cellsformat : 'd2',editable : false},
			{'text' : 'Pre-Repair GWt.','datafield' : 'preGwt','width' : '7%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Pre-Repair NWt.','datafield' : 'preNwt','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false,editable : false},
			{'text' : 'Pre-Repair Pcs','datafield' : 'preRepairPcs','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Fin. GWt.','datafield' : 'finGwt','width' : '7%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Fin. NWt.','datafield' : 'finNwt','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false,editable : false},
			{'text' : 'Fin. Pcs','datafield' : 'finishedPcs','width' : '7%',cellsalign : 'right',align : 'center',sortable : false,editable : false},
			{text : '',sortable : false,hidden: true,datafield : 'selectionStatus',columntype : 'checkbox',width : '5%',cellsalign : 'center',align:'center',filterable: false,
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue) {
					if (newvalue) {$("#jqxgrid4").jqxGrid('selectrow', row, 'selectionStatus', true);}
					else {$("#jqxgrid4").jqxGrid('unselectrow', row, 'selectionStatus', false);}
				}
			}, 
			
			{text : '',datafield : 'materialType',hidden: true}, 
			{text : '',datafield : 'orderType',hidden: true}, 
			{text : '',datafield : 'orderStoneAccSrlNo',hidden: true}, 
			{text : '',datafield : 'locationCode',hidden: true},
			{text : '',datafield : 'pureWt',hidden: true,cellsformat : 'd3'}, 
			{text : '',datafield : 'stoneWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'accessoryWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'suppliedBy',hidden: true},
			{text : '',datafield : 'storeOrDC',hidden : true},
			{text : '',datafield : 'storeOrDcId',hidden: true}, 
			{text : '',datafield : 'currentZone',hidden: true}, 
			{text : '',datafield : 'cashier',hidden: true}, 
			{text : '',datafield : 'cashierSatus',hidden: true},
			{text : '',datafield : 'metalSegmentId',hidden: true}, 
			{text : '',datafield : 'metalSegmentCode',hidden: true},
			{text : '',datafield : 'segmentId',hidden: true},
			{text : '',datafield : 'segmentCode',hidden : true},
			{text : '',datafield : 'jewelType',hidden: true}, 
			{text : '',datafield : 'subCategory',hidden: true}, 
			{text : '',datafield : 'shape',hidden: true}, 
			{text : '',datafield : 'custGivenWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'custGivenPcs',hidden: true}, 
			{text : '',datafield : 'custRetWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'custRetPcs',hidden: true},
			{text : '',datafield : 'orderItemStatus',hidden : true},
			{text : '',datafield : 'articleCode',hidden: true}, 
			{text : '',datafield : 'cutGrade',hidden: true},
			{text : '',datafield : 'clarity',hidden: true}, 
			{text : '',datafield : 'color',hidden: true},
			{text : '',datafield : 'createdBy',hidden: true},
			{text : '',datafield : 'createdDate',hidden : true},
			{text : '',datafield : 'fromWtCost',hidden: true,cellsformat : 'd2'},
			{text : '',datafield : 'toWtCost',hidden : true,cellsformat : 'd2'},
			{text : '',datafield : 'toLocationCode',hidden : true},
			
			]
	});
}

// Stock Order Stone Grid
var stockOrderStoneCreateGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stoneSlNo','type' : 'int','map':'orderStoneAccSrlNo'},
			{'name' : 'segId','type' : 'int','map' : 'segment>description'},
			{'name' : 'cutGrade','type' : 'string','map' : 'cutGrade'},
			{'name' : 'color','type' : 'string','map' : 'color'},
			{'name' : 'clarity','type' : 'string','map' : 'clarity'},
			{'name' : 'custGivenPcs','type' : 'int','map' : 'custGivenPcs'},
			{'name' : 'custGivenWt','type' : 'float','map' : 'custGivenWt'},
			{'name' : 'custRetPcs','type' : 'int'}, 
			{'name' : 'custRetWt','type' : 'float'},
			{'name' : 'selectionStatus','type' : 'bool'},
			
			{'name' : 'materialType','type' : 'string'},
			{'name' : 'orderType','type' : 'string'},
			{'name' : 'orderStoneAccSrlNo','type' : 'int'}, 
			{'name' : 'locationCode','type' : 'string'},
			{'name' : 'pureWt','type' : 'float'},
			{'name' : 'stoneWt','type' : 'float'},
			{'name' : 'accessoryWt','type' : 'float'},
			{'name' : 'suppliedBy','type' : 'string'},
			{'name' : 'storeOrDC','type' : 'string'},
			{'name' : 'storeOrDcId','type' : 'int'}, 
			{'name' : 'currentZone','type' : 'int','map' : 'currentZone>id'},
			{'name' : 'cashier','type' : 'string'}, 
			{'name' : 'cashierSatus','type' : 'string'},
			{'name' : 'metalSegmentId','type' : 'int','map':'metalSegment>id'},
			{'name' : 'metalSegmentCode','type' : 'string','map':'metalSegment>code'},
			
			{'name' : 'segmentId','type' : 'int','map':'segment>id'},
			{'name' : 'segmentCode','type' : 'string','map':'segment>code'},
			{'name' : 'jewelType','type' : 'int','map':'jewelType>id'}, 
			
			{'name' : 'category','type' : 'string','map':'category>description'},
			{'name' : 'subCategory','type' : 'string','map':'subCategory>description'},
			{'name' : 'shape','type' : 'string'},
			{'name' : 'orderItemStatus','type' : 'float'},
			{'name' : 'articleCode','type' : 'string'}, 
			{'name' : 'createdBy','type' : 'string'},
			{'name' : 'createdDate','type' : 'string'},
			
			{'name' : 'categoryId','type' : 'int','map':'category>id'},
			{'name' : 'subCategoryId','type' : 'int','map':'subCategory>id'},
			{'name' : 'categoryCode','type' : 'string','map':'category>code'},
			{'name' : 'subCategoryCode','type' : 'string','map':'subCategory>code'},
			{'name' : 'orderId','type' : 'int','map':'orderId'},
			{'name' : 'orderSl','type' : 'int','map':'orderSrlNo'},
			{'name' : 'stockNo','type' : 'int'},
			{'name' : 'subCatDesc','type' : 'string','map':'subCategoryDesc'},
			{'name' : 'grossWt','type' : 'float'},
			{'name' : 'netWt','type' : 'float'},
			{'name' : 'preRepairGrossWt','type' : 'float'},
			{'name' : 'preRepairNetWt','type' : 'float'},
			{'name' : 'skinPurity','type' : 'float'},
			{'name' : 'orderType','type' : 'string'},
			{'name' : 'pieces','type' : 'int'},
			{'name' : 'orderKind','type' : 'string'},
			{'name' : 'fromWtCost','type' : 'float'},
			{'name' : 'toWtCost','type' : 'float'},
			
			
			{'name' : 'custUsedWt','type' : 'float'},
			{'name' : 'custUsedPcs','type' : 'int'},
			{'name' : 'custRetWastageWt','type' : 'float'},
			{'name' : 'custRetWastagePcs','type' : 'int'},
			{'name' : 'brkRetWt','type' : 'float'},
			{'name' : 'brkRetPcs','type' : 'int'},
			{'name' : 'custUnRetWastageWt','type' : 'float'},
			{'name' : 'custUnRetWastagePcs','type' : 'int'},
			{'name':'toLocationCode',type:'string'}
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid5").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		theme: 'energyblue',
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		selectionmode : 'checkbox',
		enablebrowserselection: false,
		columns : [
			{'text' : 'Stone Sl No','datafield' : 'stoneSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Supplied By','datafield' : 'suppliedBy','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : 'Segment','datafield' : 'segId','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Category','datafield' : 'category','width' : '12%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'SubCat Desc','datafield' : 'subCatDesc','width' : '15%',cellsalign : 'left',align : 'center',sortable :false,editable : false},
			{text : 'Act Ret Wt',datafield : 'stoneWt',cellsformat : 'd3','width' : '5%',cellsalign : 'right',align : 'center',sortable :false,editable : false},
			{text : 'Act Ret Pcs',datafield : 'pieces','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},

			/*{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '6%',cellsalign : 'center',align : 'center','cellsformat' : 'd2',sortable :false,editable : false},
			{'text' : 'Color','datafield' : 'color','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Clarity','datafield' : 'clarity','width' : '5.5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},*/
			{'text' : 'Given Wt.','datafield' : 'custGivenWt','width' : '8%',cellsalign : 'right',align : 'center',sortable :false,editable : false,'cellsformat' : 'd3'},
			{'text' : 'Given Pcs','datafield' : 'custGivenPcs','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Used Wt','datafield' : 'custUsedWt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Used Pcs','datafield' : 'custUsedPcs','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false},
			{'text' : 'Ret Wt','datafield' : 'custRetWt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Ret Pcs','datafield' : 'custRetPcs','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Brk Ret Wt','datafield' : 'custRetWastageWt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Brk Ret Pcs','datafield' : 'custRetWastagePcs','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Brk UnRet Wt','datafield' : 'custUnRetWastageWt','width' : '8%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Brk UnRet Pcs','datafield' : 'custUnRetWastagePcs','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{text : '',sortable : false,hidden: true,datafield : 'selectionStatus',columntype : 'checkbox',width : '5%',cellsalign : 'center',align:'center',filterable: false,
				cellbeginedit : function(row) {
					var suppBy = $('#jqxgrid5').jqxGrid('getcellvalue',row,'suppliedBy');
					if(suppBy != "Vendor"){
						return true;
					}else{
						return false;
					}
				},
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue) {
					if (newvalue) {$("#jqxgrid5").jqxGrid('selectrow', row, 'selectionStatus', true);}
					else {$("#jqxgrid5").jqxGrid('unselectrow', row, 'selectionStatus', false);}
				}
			}, 
			
			
			{text : '',datafield : 'materialType',hidden: true}, 
			{text : '',datafield : 'orderStoneAccSrlNo',hidden: true}, 
			{text : '',datafield : 'locationCode',hidden: true},
			{text : '',datafield : 'pureWt',hidden: true,cellsformat : 'd3'}, 
			{text : '',datafield : 'accessoryWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'storeOrDC',hidden : true},
			{text : '',datafield : 'storeOrDcId',hidden: true}, 
			{text : '',datafield : 'currentZone',hidden: true}, 
			{text : '',datafield : 'cashier',hidden: true}, 
			{text : '',datafield : 'cashierSatus',hidden: true},
			{text : '',datafield : 'metalSegmentId',hidden: true}, 
			{text : '',datafield : 'metalSegmentCode',hidden: true},
			{text : '',datafield : 'segmentId',hidden: true},
			{text : '',datafield : 'segmentCode',hidden : true},
			{text : '',datafield : 'jewelType',hidden: true}, 
			{text : '',datafield : 'subCategory',hidden: true}, 
			{text : '',datafield : 'shape',hidden: true}, 
			
			
			{text : '',datafield : 'grossWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'netWt',hidden: true,cellsformat : 'd3'}, 
			{text : '',datafield : 'preRepairGrossWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'preRepairNetWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'orderItemStatus',hidden : true},
			{text : '',datafield : 'articleCode',hidden: true}, 
			{text : '',datafield : 'categoryId',hidden: true},
			{text : '',datafield : 'subCategoryId',hidden: true}, 
			{text : '',datafield : 'categoryCode',hidden: true},
			{text : '',datafield : 'subCategoryCode',hidden: true},
			{text : '',datafield : 'orderId',hidden: true}, 
			{text : '',datafield : 'orderSl',hidden: true},
			{text : '',datafield : 'stockNo',hidden: true}, 
			{text : '',datafield : 'createdBy',hidden: true},
			{text : '',datafield : 'createdDate',hidden : true},
			{text : '',datafield : 'skinPurity',hidden : true,cellsformat : 'd2'},
			{text : '',datafield : 'orderType',hidden : true},
			{text : '',datafield : 'orderKind',hidden : true},
			{text : '',datafield : 'fromWtCost',hidden: true,cellsformat : 'd2'},
			{text : '',datafield : 'toWtCost',hidden : true,cellsformat : 'd2'},
			{text : '',datafield : 'toLocationCode',hidden : true},
		]
	});
}

// Stock Order Accessory Grid
var stockOrderAccCreateGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'accSlNo','type' : 'int','map':'orderStoneAccSrlNo'},
			{'name' : 'suppBy','type' : 'string','map' : 'suppliedBy'},
			{'name' : 'custGivenWt','type' : 'float','map':'custGivenWt'}, 
			{'name' : 'custGivenPcs','type' : 'int','map' : 'custGivenPcs'},
			{'name' : 'custRetWt','type' : 'float'},
			{'name' : 'custRetPcs','type' : 'int'},
			{'name' : 'selectionStatus','type' : 'bool'},
			
			{'name' : 'materialType','type' : 'string'},
			{'name' : 'orderType','type' : 'string'},
			{'name' : 'orderStoneAccSrlNo','type' : 'int'}, 
			{'name' : 'locationCode','type' : 'string'},
			{'name' : 'pureWt','type' : 'float'},
			{'name' : 'stoneWt','type' : 'float'},
			{'name' : 'accessoryWt','type' : 'float'},
			{'name' : 'suppliedBy','type' : 'string'},
			{'name' : 'storeOrDC','type' : 'string'},
			{'name' : 'storeOrDcId','type' : 'int'}, 
			{'name' : 'currentZone','type' : 'int','map' : 'currentZone>id'},
			{'name' : 'cashier','type' : 'string'}, 
			{'name' : 'cashierSatus','type' : 'string'},
			{'name' : 'metalSegmentId','type' : 'int','map':'metalSegment>id'},
			{'name' : 'metalSegmentCode','type' : 'string','map':'metalSegment>code'},
			
			{'name' : 'segmentId','type' : 'int','map':'segment>id'},
			{'name' : 'segId','type' : 'int','map':'segment>description'},
			{'name' : 'segmentCode','type' : 'string','map':'segment>code'},
			{'name' : 'jewelType','type' : 'int','map':'jewelType>id'}, 
			{'name' : 'category','type' : 'string','map':'category>description'},
			{'name' : 'subCategory','type' : 'string','map':'subCategory>description'},
			{'name' : 'shape','type' : 'string'},
			{'name' : 'orderItemStatus','type' : 'float'},
			{'name' : 'articleCode','type' : 'string'}, 
			{'name' : 'createdBy','type' : 'string'},
			{'name' : 'createdDate','type' : 'string'},
			
			{'name' : 'categoryId','type' : 'int','map':'category>id'},
			{'name' : 'subCategoryId','type' : 'int','map':'subCategory>id'},
			{'name' : 'categoryCode','type' : 'string','map':'category>code'},
			{'name' : 'subCategoryCode','type' : 'string','map':'subCategory>code'},
			{'name' : 'orderId','type' : 'int','map':'orderId'},
			{'name' : 'orderSl','type' : 'int','map':'orderSrlNo'},
			{'name' : 'stockNo','type' : 'int'},
			{'name' : 'subCatDesc','type' : 'string','map':'subCategoryDesc'},
			{'name' : 'grossWt','type' : 'float'},
			{'name' : 'netWt','type' : 'float'},
			{'name' : 'preRepairGrossWt','type' : 'float'},
			{'name' : 'preRepairNetWt','type' : 'float'},
			{'name' : 'skinPurity','type' : 'float'},
			{'name' : 'orderType','type' : 'string'},
			{'name' : 'pieces','type' : 'int'},
			{'name' : 'orderKind','type' : 'string'},
			{'name' : 'fromWtCost','type' : 'float'},
			{'name' : 'toWtCost','type' : 'float'},
			
			{'name' : 'custUsedWt','type' : 'float'},
			{'name' : 'custUsedPcs','type' : 'int'},
			{'name' : 'custRetWastageWt','type' : 'float'},
			{'name' : 'custRetWastagePcs','type' : 'int'},
			{'name' : 'brkRetWt','type' : 'float'},
			{'name' : 'brkRetPcs','type' : 'int'},
			{'name' : 'custUnRetWastageWt','type' : 'float'},
			{'name' : 'custUnRetWastagePcs','type' : 'int'},
			{'name':'toLocationCode',type:'string'}
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid6").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		selectionmode : 'checkbox',
		enablebrowserselection: false,
		columns : [
			{'text' : 'Acc Sl No','datafield' : 'accSlNo','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Supplied By','datafield' : 'suppBy','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{text : 'Segment',datafield : 'segId','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false,},
			{text : 'Category',datafield : 'category','width' : '6.5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,}, 
			{text : 'Sub Cat Desc',datafield : 'subCategory','width' : '8%',cellsalign : 'left',align : 'center',sortable : false,editable : false,}, 

			{text : 'Act Ret Wt',datafield : 'accessoryWt',cellsformat : 'd3','width' : '5%',cellsalign : 'right',align : 'center',sortable :false,editable : false},
			{text : 'Act Ret Pcs',datafield : 'pieces','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Given Wt.','datafield' : 'custGivenWt','width' : '8%',cellsalign : 'right',align : 'center',sortable :false,editable : false},
			{'text' : 'Given Pcs','datafield' : 'custGivenPcs','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,cellsformat : 'd2',editable : false},
			{'text' : 'Used Wt','datafield' : 'custUsedWt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Used Pcs','datafield' : 'custUsedPcs','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false},
			{'text' : 'Ret Wt','datafield' : 'custRetWt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Ret Pcs','datafield' : 'custRetPcs','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Brk Ret Wt','datafield' : 'custRetWastageWt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Brk Ret Pcs','datafield' : 'custRetWastagePcs','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Brk UnRet Wt','datafield' : 'custUnRetWastageWt','width' : '8%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Brk UnRet Pcs','datafield' : 'custUnRetWastagePcs','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{text : '',sortable : false,hidden: true,datafield : 'selectionStatus',columntype : 'checkbox',width : '5.5%',cellsalign : 'center',align:'center',filterable: false,
				cellbeginedit : function(row) {
					var suppBy = $('#jqxgrid6').jqxGrid('getcellvalue',row,'suppBy');
					if(suppBy != "Vendor"){
						return true;
					}else{
						return false;
					}
				},
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if (newvalue) {$("#jqxgrid6").jqxGrid('selectrow', row, 'selectionStatus', true);}
					else {$("#jqxgrid6").jqxGrid('unselectrow', row, 'selectionStatus', false);}
				}
			},
			
			{text : '',datafield : 'materialType',hidden: true}, 
			{text : '',datafield : 'orderStoneAccSrlNo',hidden: true}, 
			{text : '',datafield : 'locationCode',hidden: true},
			{text : '',datafield : 'pureWt',hidden: true,cellsformat : 'd3'}, 
			{text : '',datafield : 'stoneWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'suppliedBy',hidden: true},
			{text : '',datafield : 'storeOrDC',hidden : true},
			{text : '',datafield : 'storeOrDcId',hidden: true}, 
			{text : '',datafield : 'currentZone',hidden: true}, 
			{text : '',datafield : 'cashier',hidden: true}, 
			{text : '',datafield : 'cashierSatus',hidden: true},
			{text : '',datafield : 'metalSegmentId',hidden: true}, 
			{text : '',datafield : 'metalSegmentCode',hidden: true},
			{text : '',datafield : 'segmentId',hidden: true},
			
			{text : '',datafield : 'segmentCode',hidden : true},
			{text : '',datafield : 'jewelType',hidden: true}, 
			{text : '',datafield : 'shape',hidden: true}, 
			
			
			{text : '',datafield : 'grossWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'netWt',hidden: true,cellsformat : 'd3'}, 
			{text : '',datafield : 'preRepairGrossWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'preRepairNetWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'orderItemStatus',hidden : true},
			{text : '',datafield : 'articleCode',hidden: true}, 
			{text : '',datafield : 'categoryId',hidden: true},
			{text : '',datafield : 'subCategoryId',hidden: true}, 
			{text : '',datafield : 'categoryCode',hidden: true},
			{text : '',datafield : 'subCategoryCode',hidden: true},
			{text : '',datafield : 'orderId',hidden: true}, 
			{text : '',datafield : 'orderSl',hidden: true},
			{text : '',datafield : 'stockNo',hidden: true}, 
			{text : '',datafield : 'createdBy',hidden: true},
			{text : '',datafield : 'createdDate',hidden : true},
			{text : '',datafield : 'skinPurity',hidden : true,cellsformat : 'd2'},
			{text : '',datafield : 'orderType',hidden : true},
			{text : '',datafield : 'orderKind',hidden : true},
			{text : '',datafield : 'fromWtCost',hidden: true,cellsformat : 'd2'},
			{text : '',datafield : 'toWtCost',hidden : true,cellsformat : 'd2'},
			{text : '',datafield : 'toLocationCode',hidden : true},
			]
	});
}

var getstockOrderFgDetails = function(){
	 var fgData = []; 
	 var rows = $("#jqxgrid4").jqxGrid('getrows');
	 for(var i = 0; i<rows.length; i++){
		 console.log(rows);
			if(rows[i].selectionStatus == true){
				var details = {
				    "id": null,
				    "materialType": rows[i].materialType,
				    "orderType": rows[i].orderType,
				    "orderKind":rows[i].orderKind,
				    "orderId": rows[i].orderNo,
				    "orderSrlNo": rows[i].orderSl,
				    "orderStoneAccSrlNo":rows[i].stoneSlNo,
				    "locationCode": rows[i].locationCode,
				    "toLocationCode" : rows[i].toLocationCode,
				    "grossWt": rows[i].grossWt,
				    "netWt":rows[i].netWt,
				    "pureWt": rows[i].pureWt,
				    "pieces": rows[i].pcs,
				    "stoneWt": rows[i].stoneWt,
				    "accessoryWt": rows[i].accessoryWt,
				    "subCategoryDesc": rows[i].subCatDesc,
				    "suppliedBy": rows[i].suppliedBy,
				    "storeOrDC": rows[i].storeOrDC,
				    "storeOrDcId": rows[i].storeOrDcId,
				    "currentZone": {
				      "id": rows[i].currentZone
				    },
				    "cashier": rows[i].cashier,
				    "cashierSatus": rows[i].cashierSatus,
				    "metalSegment": {
				      "id": rows[i].metalSegmentId,
				      "description": rows[i].metalType,
				      "code": rows[i].metalSegmentCode
				    },
				    "segment": {
				      "id": rows[i].segmentId,
				      "description": rows[i].segment,
				      "code": rows[i].segmentCode
				    },
				    "jewelType": {"id": rows[i].jewelType},
				    "category": rows[i].category,
				    "subCategory": rows[i].subCategory,
				    "shape": rows[i].shape,
				    "preRepairGrossWt": rows[i].preGwt,
				    "preRepairNetWt": rows[i].preNwt,
				    "custGivenWt": rows[i].custGivenWt,
				    "custGivenPcs": rows[i].custGivenPcs,
				    "custRetWt": rows[i].custRetWt,
				    "custRetPcs": rows[i].custRetPcs,
				    "orderItemStatus": rows[i].orderItemStatus,
				    "skinPurity": rows[i].purity,
				    "articleCode": rows[i].articleCode,
				    "stockNo": rows[i].refStockNo,
				    "cutGrade": rows[i].cutGrade,
				    "clarity": rows[i].clarity,
				    "color": rows[i].color,
				    "createdBy": rows[i].createdBy,
				    "createdDate": rows[i].createdDate,
				    "fromWtCost" : rows[i].fromWtCost,
				    "toWtCost" : rows[i].toWtCost
				}
				fgData.push(details);
			}
	 }
	 return fgData;
}

var getStockOrderStoneDetails = function(){
	var stoneDetArr = [];
	 var rows = $("#jqxgrid5").jqxGrid('getrows');
	 for(var i = 0; i<rows.length; i++){
			if(rows[i].selectionStatus == true){
				var stoneDetails = {
			    "id": null,
			    "materialType": rows[i].materialType,
			    "orderType": rows[i].orderType,
			    "orderKind": rows[i].orderKind,
			    "orderId": rows[i].orderId,
			    "orderSrlNo": rows[i].orderSl,
			    "orderStoneAccSrlNo": rows[i].stoneSlNo,
			    "locationCode": rows[i].locationCode,
			    "toLocationCode" : rows[i].toLocationCode,
			    "grossWt": rows[i].grossWt,
			    "netWt": rows[i].netWt,
			    "pureWt": rows[i].pureWt,
			    "pieces": rows[i].pieces,
			    "stoneWt": rows[i].stoneWt,
			    "accessoryWt": rows[i].accessoryWt,
			    "subCategoryDesc": rows[i].subCatDesc,
			    "suppliedBy":rows[i].suppliedBy,
			    "storeOrDC": rows[i].storeOrDC,
			    "storeOrDcId": rows[i].storeOrDcId,
			    "currentZone": {
			      "id":rows[i].currentZone
			    },
			    "cashier": rows[i].cashier,
			    "cashierSatus": rows[i].cashierSatus,
			    "metalSegment": rows[i].metalSegmentId,
			    "segment": {
			      "id": rows[i].segmentId,
			      "description": rows[i].segId,
			      "code": rows[i].segmentCode
			    },
			    "jewelType": rows[i].jewelType,
			    "category": {
			    	"id": rows[i].categoryId,
				    "description": rows[i].category,
				    "code": rows[i].categoryCode
			    },
			    "subCategory": (rows[i].segmentCode == 'DI') ? null : { "id": rows[i].subCategoryId,"code": rows[i].subCategoryCode,"description": rows[i].subCategory},
			    "shape": rows[i].shape,
			    "preRepairGrossWt": rows[i].preRepairGrossWt,
			    "preRepairNetWt": rows[i].preRepairNetWt,
			    "custGivenWt": rows[i].custGivenWt,
			    "custGivenPcs": rows[i].custGivenPcs,
			    "custRetWt": rows[i].custRetWt,
			    "custRetPcs": rows[i].custRetPcs,
			    "orderItemStatus": rows[i].orderItemStatus,
			    "skinPurity": rows[i].skinPurity,
			    "articleCode": rows[i].articleCode,
			    "stockNo": rows[i].stockNo,
			    "cutGrade": rows[i].cutGrade,
			    "clarity": rows[i].clarity,
			    "color": rows[i].color,
			    "createdBy": rows[i].createdBy,
			    "createdDate": rows[i].createdDate,
			    "fromWtCost" : rows[i].fromWtCost,
			    "toWtCost" : rows[i].toWtCost
				}
				stoneDetArr.push(stoneDetails);
			}
	 }
	 return  stoneDetArr;
}

var getStockOrderAccDetails = function(){
	var accDetArr = [];
	 var rows = $("#jqxgrid6").jqxGrid('getrows');
	 for(var i = 0; i<rows.length; i++){
			if(rows[i].selectionStatus == true){
				var accDetails = {
			    "id": null,
			    "materialType": rows[i].materialType,
			    "orderType": rows[i].orderType,
			    "orderKind": rows[i].orderKind,
			    "orderId": rows[i].orderId,
			    "orderSrlNo": rows[i].orderSl,
			    "orderStoneAccSrlNo": rows[i].accSlNo,
			    "locationCode": rows[i].locationCode,
			    "toLocationCode" : rows[i].toLocationCode,
			    "grossWt": rows[i].grossWt,
			    "netWt": rows[i].netWt,
			    "pureWt": rows[i].pureWt,
			    "pieces": rows[i].pieces,
			    "stoneWt": rows[i].stoneWt,
			    "accessoryWt": rows[i].accessoryWt,
			    "subCategoryDesc": rows[i].subCatDesc,
			    "suppliedBy":rows[i].suppliedBy,
			    "storeOrDC": rows[i].storeOrDC,
			    "storeOrDcId": rows[i].storeOrDcId,
			    "currentZone": {
			      "id":rows[i].currentZone
			    },
			    "cashier": rows[i].cashier,
			    "cashierSatus": rows[i].cashierSatus,
			    "metalSegment": rows[i].metalSegmentId,
			    "segment": {
			      "id": rows[i].segmentId,
			      "description": rows[i].segId,
			      "code": rows[i].segmentCode
			    },
			    "jewelType": rows[i].jewelType,
			    "category": {
			    	"id": rows[i].categoryId,
				    "description": rows[i].category,
				    "code": rows[i].categoryCode
			    },
			    "subCategory":  { "id": rows[i].subCategoryId,"code": rows[i].subCategoryCode,"description": rows[i].subCategory},
			    "shape": rows[i].shape,
			    "preRepairGrossWt": rows[i].preRepairGrossWt,
			    "preRepairNetWt": rows[i].preRepairNetWt,
			    "custGivenWt": rows[i].custGivenWt,
			    "custGivenPcs": rows[i].custGivenPcs,
			    "custRetWt": rows[i].custRetWt,
			    "custRetPcs": rows[i].custRetPcs,
			    "orderItemStatus": rows[i].orderItemStatus,
			    "skinPurity": rows[i].skinPurity,
			    "articleCode": rows[i].articleCode,
			    "stockNo": rows[i].stockNo,
			    "cutGrade": rows[i].cutGrade,
			    "clarity": rows[i].clarity,
			    "color": rows[i].color,
			    "createdBy": rows[i].createdBy,
			    "createdDate": rows[i].createdDate,
			    "fromWtCost" : rows[i].fromWtCost,
			    "toWtCost" : rows[i].toWtCost
				}
				accDetArr.push(accDetails);
			}
	 }
	 return  accDetArr;
}


$("#returnST").on('click',function(){
	var data = [];
	 if(material == "F"){
		 var selectedRows = $("#jqxgrid4").jqxGrid('selectedrowindexes');
			if(selectedRows.length == 0){
				$.growl.error({
					message : "Please Select Item to be Returned !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		 for(var i=0; i<selectedRows.length; i++){
			 $("#jqxgrid4").jqxGrid('setcellvalue', selectedRows[i], 'selectionStatus', true);
		 }
		 
		 data = getstockOrderFgDetails();
	 }else if(material == 'S'){
		 var selectedRows = $("#jqxgrid5").jqxGrid('selectedrowindexes');
			if(selectedRows.length == 0){
				$.growl.error({
					message : "Please Select Item to be Returned !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		 for(var i=0; i<selectedRows.length; i++){
			 $("#jqxgrid5").jqxGrid('setcellvalue', selectedRows[i], 'selectionStatus', true);
		 }
		 
		 var stoneResult = getStockOrderStoneDetails();
		 data = stoneResult;
	 }
	 else if(material == 'A'){
		 var selectedRows = $("#jqxgrid6").jqxGrid('selectedrowindexes');
			if(selectedRows.length == 0){
				$.growl.error({
					message : "Please Select Item to be Returned !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		 for(var i=0; i<selectedRows.length; i++){
			 $("#jqxgrid6").jqxGrid('setcellvalue', selectedRows[i], 'selectionStatus', true);
		 }
		 
		 var accResult = getStockOrderAccDetails();
		 data = accResult;
	 }
	 // 
	 postJSON('/OrderExecution/api/v1/createMaterialReturn?materialType='+material,JSON.stringify(data),function(response) {
		 if(response.resCode == 1){
			 data = [];
			 if(material == 'F'){
				 $("#jqxgrid4").jqxGrid('clear'); 
			 }if(material == 'S'){
				 $("#jqxgrid5").jqxGrid('clear'); 
			 }else if(material == 'A'){
				 $("#jqxgrid6").jqxGrid('clear'); 
			 }else{}
			 $.growl.notice({
				 message : response.mesgStr,
				 duration : 10000,
				 title : 'Success'
			 });
		 }else{
			 $.growl.error({
				 message : response.mesgStr,
				 duration : 10000,
				 title : 'Error'
			 })
			 return false;
		 }
	 });
	 
});

//################################################## Consignment Order Material Return Started ######################################
$("#searchCo").on('click',function(){
	var orderNo = $("#orderNoCoC").val();
	var orderSl = $("#orderSlNoCoC").val();
	
	if(orderNo == "" || orderSl == ""){
		$.growl.error({
			message : 'Please Fill Mandatory Fields !!!',
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		$.getJSON('/OrderExecution/api/v1/findMaterialReturn?orderNo='+ orderNo+"&orderSrlNo="+orderSl+"&orderType=CO",function(data) {
			if(data.resCode == 1){
				var fgDet = data.payload.fgDetails;
				var stoneDet = data.payload.stoneDetails;
				var accDet = data.payload.accDetails;
				$("#gridTabsCO").show();
				$("#coRetId").show();
				consignmentOrderCreateGrid(fgDet);
				$("#jqxgrid7").show();
				consignmentOrderStoneCreateGrid(stoneDet);
				$('#jqxgrid8').show();
				consignmentOrderAccCreateGrid(accDet);
				$('#jqxgrid9').show();
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
});


//############### Consignment Order Create Grids Started ##################################
//Consignment Order FG Grid
var consignmentOrderCreateGrid = function(data){
	var source = {
     localdata: data,
     datatype: "json",
		datafields : [ 
			{'name' : 'orderNo','type' : 'int','map':'orderId'},
			{'name' : 'orderSl','type' : 'int','map' : 'orderSrlNo'},
			{'name' : 'refStockNo','type' : 'int','map':'stockNo'}, 
			{'name' : 'orderKind','type' : 'string','map' : 'orderKind'},
			{'name' : 'segment','type' : 'string','map' : 'segment>description'},
			{'name' : 'metalType','type' : 'string','map' : 'metalSegment>description'},
			{'name' : 'subCatDesc','type' : 'string','map' : 'subCategoryDesc'},
			{'name' : 'purity','type' : 'float','map' : 'skinPurity'},
			{'name' : 'pcs','type' : 'int','map' : 'pieces'},
			{'name' : 'preGwt','type' : 'float','map' : 'preRepairGrossWt'}, 
			{'name' : 'preNwt','type' : 'float','map' : 'preRepairNetWt'},
			{'name' : 'finishedGrossWt','type' : 'float'}, 
			{'name' : 'finishedNetWt','type' : 'float'},
			{'name' : 'grossWt','type' : 'float'}, 
			{'name' : 'netWt','type' : 'float'},
			{'name' : 'selectionStatus','type' : 'bool'},
			
			
			{'name' : 'materialType','type' : 'string'},
			{'name' : 'orderType','type' : 'string'},
			{'name' : 'orderStoneAccSrlNo','type' : 'int'}, 
			{'name' : 'locationCode','type' : 'string'},
			{'name' : 'pureWt','type' : 'float'},
			{'name' : 'stoneWt','type' : 'float'},
			{'name' : 'accessoryWt','type' : 'float'},
			{'name' : 'suppliedBy','type' : 'string'},
			{'name' : 'storeOrDC','type' : 'string'},
			{'name' : 'storeOrDcId','type' : 'int'}, 
			{'name' : 'currentZone','type' : 'int','map' : 'currentZone>id'},
			{'name' : 'cashier','type' : 'string'}, 
			{'name' : 'cashierSatus','type' : 'string'},
			{'name' : 'metalSegmentId','type' : 'int','map':'metalSegment>id'},
			{'name' : 'metalSegmentCode','type' : 'string','map':'metalSegment>code'},
			
			{'name' : 'segmentId','type' : 'int','map':'segment>id'},
			{'name' : 'segmentCode','type' : 'string','map':'segment>code'},
			{'name' : 'jewelType','type' : 'int','map':'jewelType>id'}, 
			{'name' : 'category','type' : 'string'},
			{'name' : 'subCategory','type' : 'string'},
			{'name' : 'shape','type' : 'string'},
			{'name' : 'custGivenWt','type' : 'float'},
			{'name' : 'custGivenPcs','type' : 'int'},
			{'name' : 'custRetWt','type' : 'float'},
			{'name' : 'custRetPcs','type' : 'int'}, 
			{'name' : 'orderItemStatus','type' : 'float'},
			{'name' : 'articleCode','type' : 'string'}, 
			{'name' : 'cutGrade','type' : 'string'},
			{'name' : 'clarity','type' : 'float'},
			{'name' : 'color','type' : 'string'},
			{'name' : 'createdBy','type' : 'string'},
			{'name' : 'createdDate','type' : 'string'},
			{'name' : 'preRepairPcs',type:'int'},
			{'name' : 'finishedPcs',type:'int'},
			{'name':'toLocationCode',type:'string'}
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid7").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		selectionmode : 'checkbox',
		enablebrowserselection: false,
		columns : [
			{'text' : 'Order No','datafield' : 'orderNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Order Sl No','datafield' : 'orderSl','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Ref Stock No','datafield' : 'refStockNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Order Kind','datafield' : 'orderKind','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Segment','datafield' : 'segment','width' : '6.5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Metal Type','datafield' : 'metalType','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'SubCat Desc','datafield' : 'subCatDesc','width' : '12%',cellsalign : 'left',align : 'center',sortable : false,editable : false},
			{'text' : 'Purity','datafield' : 'purity','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,cellsformat : 'd2',editable : false},
			{'text' : 'Pre-Repair GWt.','datafield' : 'preGwt','width' : '8%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Pre-Repair NWt.','datafield' : 'preNwt','width' : '8%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false,editable : false},
			{'text' : 'Pre-Repair Pcs','datafield' : 'preRepairPcs','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},

			{'text' : 'Fin GWt.','datafield' : 'finishedGrossWt','width' : '9%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Fin NWt.','datafield' : 'finishedNetWt','width' : '9%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false,editable : false},
			{'text' : 'Fin Pcs','datafield' : 'finishedPcs','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false},

			{text : '',sortable : false,hidden: true,datafield : 'selectionStatus',columntype : 'checkbox',width : '5%',cellsalign : 'center',align:'center',filterable: false,
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue) {
					if (newvalue) {$("#jqxgrid7").jqxGrid('selectrow', row, 'selectionStatus', true);}
					else {$("#jqxgrid7").jqxGrid('unselectrow', row, 'selectionStatus', false);}
				}
			}, 
			
			{text : '',datafield : 'materialType',hidden: true}, 
			{text : '',datafield : 'orderType',hidden: true}, 
			{text : '',datafield : 'orderStoneAccSrlNo',hidden: true}, 
			{text : '',datafield : 'locationCode',hidden: true},
			{text : '',datafield : 'pureWt',hidden: true,cellsformat : 'd3'}, 
			{text : '',datafield : 'stoneWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'accessoryWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'suppliedBy',hidden: true},
			{text : '',datafield : 'storeOrDC',hidden : true},
			{text : '',datafield : 'storeOrDcId',hidden: true}, 
			{text : '',datafield : 'currentZone',hidden: true}, 
			{text : '',datafield : 'cashier',hidden: true}, 
			{text : '',datafield : 'cashierSatus',hidden: true},
			{text : '',datafield : 'metalSegmentId',hidden: true}, 
			{text : '',datafield : 'metalSegmentCode',hidden: true},
			{text : '',datafield : 'segmentId',hidden: true},
			{text : '',datafield : 'segmentCode',hidden : true},
			{text : '',datafield : 'jewelType',hidden: true}, 
			{text : '',datafield : 'subCategory',hidden: true}, 
			{text : '',datafield : 'shape',hidden: true}, 
			{text : '',datafield : 'custGivenWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'custGivenPcs',hidden: true}, 
			{text : '',datafield : 'custRetWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'custRetPcs',hidden: true},
			{text : '',datafield : 'orderItemStatus',hidden : true},
			{text : '',datafield : 'articleCode',hidden: true}, 
			{text : '',datafield : 'cutGrade',hidden: true},
			{text : '',datafield : 'clarity',hidden: true}, 
			{text : '',datafield : 'color',hidden: true},
			{text : '',datafield : 'createdBy',hidden: true},
			{text : '',datafield : 'createdDate',hidden : true},
			{text : '',datafield : 'grossWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'netWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'toLocationCode',hidden : true},
			]
	});
}

//  Consignment Order Stone Grid
var consignmentOrderStoneCreateGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stoneSlNo','type' : 'int','map':'orderStoneAccSrlNo'},
			{'name' : 'segId','type' : 'int','map' : 'segment>description'},
			{'name' : 'cutGrade','type' : 'string','map' : 'cutGrade'},
			{'name' : 'color','type' : 'string','map' : 'color'},
			{'name' : 'clarity','type' : 'string','map' : 'clarity'},
			{'name' : 'custGivenPcs','type' : 'int','map' : 'custGivenPcs'},
			{'name' : 'custGivenWt','type' : 'float','map' : 'custGivenWt'},
			{'name' : 'custRetPcs','type' : 'int'}, 
			{'name' : 'custRetWt','type' : 'float'},
			{'name' : 'selectionStatus','type' : 'bool'},
			
			{'name' : 'materialType','type' : 'string'},
			{'name' : 'orderType','type' : 'string'},
			{'name' : 'orderStoneAccSrlNo','type' : 'int'}, 
			{'name' : 'locationCode','type' : 'string'},
			{'name' : 'pureWt','type' : 'float'},
			{'name' : 'stoneWt','type' : 'float'},
			{'name' : 'accessoryWt','type' : 'float'},
			{'name' : 'suppliedBy','type' : 'string'},
			{'name' : 'storeOrDC','type' : 'string'},
			{'name' : 'storeOrDcId','type' : 'int'}, 
			{'name' : 'currentZone','type' : 'int','map' : 'currentZone>id'},
			{'name' : 'cashier','type' : 'string'}, 
			{'name' : 'cashierSatus','type' : 'string'},
			{'name' : 'metalSegmentId','type' : 'int','map':'metalSegment>id'},
			{'name' : 'metalSegmentCode','type' : 'string','map':'metalSegment>code'},
			
			{'name' : 'segmentId','type' : 'int','map':'segment>id'},
			{'name' : 'segmentCode','type' : 'string','map':'segment>code'},
			{'name' : 'jewelType','type' : 'int','map':'jewelType>id'}, 
			{'name' : 'category','type' : 'string','map':'category>description'},
			{'name' : 'subCategory','type' : 'string','map':'subCategory>description'},
			{'name' : 'shape','type' : 'string'},
			{'name' : 'orderItemStatus','type' : 'float'},
			{'name' : 'articleCode','type' : 'string'}, 
			{'name' : 'createdBy','type' : 'string'},
			{'name' : 'createdDate','type' : 'string'},
			
			{'name' : 'categoryId','type' : 'int','map':'category>id'},
			{'name' : 'subCategoryId','type' : 'int','map':'subCategory>id'},
			{'name' : 'categoryCode','type' : 'string','map':'category>code'},
			{'name' : 'subCategoryCode','type' : 'string','map':'subCategory>code'},
			{'name' : 'orderId','type' : 'int','map':'orderId'},
			{'name' : 'orderSl','type' : 'int','map':'orderSrlNo'},
			{'name' : 'stockNo','type' : 'int'},
			{'name' : 'subCatDesc','type' : 'string','map':'subCategoryDesc'},
			{'name' : 'grossWt','type' : 'float'},
			{'name' : 'netWt','type' : 'float'},
			{'name' : 'preRepairGrossWt','type' : 'float'},
			{'name' : 'preRepairNetWt','type' : 'float'},
			{'name' : 'skinPurity','type' : 'float'},
			{'name' : 'orderType','type' : 'string'},
			{'name' : 'pieces','type' : 'int'},
			{'name' : 'orderKind','type' : 'string'},
			
			{'name' : 'custUsedWt','type' : 'float'},
			{'name' : 'custUsedPcs','type' : 'int'},
			{'name' : 'custRetWastageWt','type' : 'float'},
			{'name' : 'custRetWastagePcs','type' : 'int'},
			{'name' : 'brkRetWt','type' : 'float'},
			{'name' : 'brkRetPcs','type' : 'int'},
			{'name' : 'custUnRetWastageWt','type' : 'float'},
			{'name' : 'custUnRetWastagePcs','type' : 'int'},
			{'name' : 'suppliedBy','type' : 'string'},
			{'name':'toLocationCode',type:'string'}
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid8").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		selectionmode : 'checkbox',
		enablebrowserselection: false,
		columns : [
			{'text' : 'Stone Sl No','datafield' : 'stoneSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Segment','datafield' : 'segId','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Category','datafield' : 'category','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'SubCat Desc','datafield' : 'subCatDesc','width' : '15%',cellsalign : 'left',align : 'center',sortable :false,editable : false},
			{text : 'Act Ret Wt',datafield : 'stoneWt',cellsformat : 'd3','width' : '5%',cellsalign : 'right',align : 'center',sortable :false,editable : false},
			{text : 'Act Ret Pcs',datafield : 'pieces','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			
			{'text' : 'Given Wt.','datafield' : 'custGivenWt','width' : '8%',cellsalign : 'right',align : 'center',sortable :false,editable : false},
			{'text' : 'Given Pcs','datafield' : 'custGivenPcs','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Used Wt','datafield' : 'custUsedWt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Used Pcs','datafield' : 'custUsedPcs','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false},
			{'text' : 'Ret Wt','datafield' : 'custRetWt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Ret Pcs','datafield' : 'custRetPcs','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Brk Ret Wt','datafield' : 'custRetWastageWt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Brk Ret Pcs','datafield' : 'custRetWastagePcs','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Brk UnRet Wt','datafield' : 'custUnRetWastageWt','width' : '8%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Brk UnRet Pcs','datafield' : 'custUnRetWastagePcs','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{text : '',sortable : false,hidden: true,datafield : 'selectionStatus',columntype : 'checkbox',width : '5%',cellsalign : 'center',align:'center',filterable: false,
				cellbeginedit : function(row) {
					var suppBy = $('#jqxgrid8').jqxGrid('getcellvalue',row,'suppliedBy');
					if(suppBy != "Vendor"){
						return true;
					}else{
						return false;
					}
				},
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue) {
					if (newvalue) {$("#jqxgrid8").jqxGrid('selectrow', row, 'selectionStatus', true);}
					else {$("#jqxgrid8").jqxGrid('unselectrow', row, 'selectionStatus', false);}
				}
			}, 
			
			
			{text : '',datafield : 'materialType',hidden: true}, 
			{text : '',datafield : 'suppliedBy',hidden: true}, 
			{text : '',datafield : 'orderStoneAccSrlNo',hidden: true}, 
			{text : '',datafield : 'locationCode',hidden: true},
			{text : '',datafield : 'pureWt',hidden: true,cellsformat : 'd3'}, 
			{text : '',datafield : 'accessoryWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'suppliedBy',hidden: true},
			{text : '',datafield : 'storeOrDC',hidden : true},
			{text : '',datafield : 'storeOrDcId',hidden: true}, 
			{text : '',datafield : 'currentZone',hidden: true}, 
			{text : '',datafield : 'cashier',hidden: true}, 
			{text : '',datafield : 'cashierSatus',hidden: true},
			{text : '',datafield : 'metalSegmentId',hidden: true}, 
			{text : '',datafield : 'metalSegmentCode',hidden: true},
			{text : '',datafield : 'segmentId',hidden: true},
			{text : '',datafield : 'segmentCode',hidden : true},
			{text : '',datafield : 'jewelType',hidden: true}, 
			{text : '',datafield : 'subCategory',hidden: true}, 
			{text : '',datafield : 'shape',hidden: true}, 
			
			
			{text : '',datafield : 'grossWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'netWt',hidden: true,cellsformat : 'd3'}, 
			{text : '',datafield : 'preRepairGrossWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'preRepairNetWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'orderItemStatus',hidden : true},
			{text : '',datafield : 'articleCode',hidden: true}, 
			{text : '',datafield : 'categoryId',hidden: true},
			{text : '',datafield : 'subCategoryId',hidden: true}, 
			{text : '',datafield : 'categoryCode',hidden: true},
			{text : '',datafield : 'subCategoryCode',hidden: true},
			{text : '',datafield : 'orderId',hidden: true}, 
			{text : '',datafield : 'orderSl',hidden: true},
			{text : '',datafield : 'stockNo',hidden: true}, 
			{text : '',datafield : 'createdBy',hidden: true},
			{text : '',datafield : 'createdDate',hidden : true},
			{text : '',datafield : 'skinPurity',hidden : true,cellsformat : 'd2'},
			{text : '',datafield : 'orderType',hidden : true},
			{text : '',datafield : 'orderKind',hidden : true},
			{text : '',datafield : 'toLocationCode',hidden : true},
		]
	});
}

// Consignment Order Accessory Grid
var consignmentOrderAccCreateGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'accSlNo','type' : 'int','map':'orderStoneAccSrlNo'},
			{'name' : 'suppBy','type' : 'string','map' : 'suppliedBy'},
			{'name' : 'custGivenWt','type' : 'float','map':'custGivenWt'}, 
			{'name' : 'custGivenPcs','type' : 'int','map' : 'custGivenPcs'},
			{'name' : 'custRetWt','type' : 'float'},
			{'name' : 'custRetPcs','type' : 'int'},
			{'name' : 'selectionStatus','type' : 'bool'},
			
			{'name' : 'materialType','type' : 'string'},
			{'name' : 'orderType','type' : 'string'},
			{'name' : 'orderStoneAccSrlNo','type' : 'int'}, 
			{'name' : 'locationCode','type' : 'string'},
			{'name' : 'pureWt','type' : 'float'},
			{'name' : 'stoneWt','type' : 'float'},
			{'name' : 'accessoryWt','type' : 'float'},
			{'name' : 'suppliedBy','type' : 'string'},
			{'name' : 'storeOrDC','type' : 'string'},
			{'name' : 'storeOrDcId','type' : 'int'}, 
			{'name' : 'currentZone','type' : 'int','map' : 'currentZone>id'},
			{'name' : 'cashier','type' : 'string'}, 
			{'name' : 'cashierSatus','type' : 'string'},
			{'name' : 'metalSegmentId','type' : 'int','map':'metalSegment>id'},
			{'name' : 'metalSegmentCode','type' : 'string','map':'metalSegment>code'},
			
			{'name' : 'segmentId','type' : 'int','map':'segment>id'},
			{'name' : 'segId','type' : 'int','map':'segment>description'},
			{'name' : 'segmentCode','type' : 'string','map':'segment>code'},
			{'name' : 'jewelType','type' : 'int','map':'jewelType>id'}, 
			{'name' : 'category','type' : 'string','map':'category>description'},
			{'name' : 'subCategory','type' : 'string','map':'subCategory>description'},
			{'name' : 'shape','type' : 'string'},
			{'name' : 'orderItemStatus','type' : 'float'},
			{'name' : 'articleCode','type' : 'string'}, 
			{'name' : 'createdBy','type' : 'string'},
			{'name' : 'createdDate','type' : 'string'},
			
			{'name' : 'categoryId','type' : 'int','map':'category>id'},
			{'name' : 'subCategoryId','type' : 'int','map':'subCategory>id'},
			{'name' : 'categoryCode','type' : 'string','map':'category>code'},
			{'name' : 'subCategoryCode','type' : 'string','map':'subCategory>code'},
			{'name' : 'orderId','type' : 'int','map':'orderId'},
			{'name' : 'orderSl','type' : 'int','map':'orderSrlNo'},
			{'name' : 'stockNo','type' : 'int'},
			{'name' : 'subCatDesc','type' : 'string','map':'subCategoryDesc'},
			{'name' : 'grossWt','type' : 'float'},
			{'name' : 'netWt','type' : 'float'},
			{'name' : 'preRepairGrossWt','type' : 'float'},
			{'name' : 'preRepairNetWt','type' : 'float'},
			{'name' : 'skinPurity','type' : 'float'},
			{'name' : 'orderType','type' : 'string'},
			{'name' : 'pieces','type' : 'int'},
			{'name' : 'orderKind','type' : 'string'},
			
			{'name' : 'custUsedWt','type' : 'float'},
			{'name' : 'custUsedPcs','type' : 'int'},
			{'name' : 'custRetWastageWt','type' : 'float'},
			{'name' : 'custRetWastagePcs','type' : 'int'},
			{'name' : 'brkRetWt','type' : 'float'},
			{'name' : 'brkRetPcs','type' : 'int'},
			{'name' : 'custUnRetWastageWt','type' : 'float'},
			{'name' : 'custUnRetWastagePcs','type' : 'int'},
			{'name':'toLocationCode',type:'string'},
			
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid9").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		selectionmode : 'checkbox',
		enablebrowserselection: false,
		columns : [
			{'text' : 'Acc Sl No','datafield' : 'accSlNo','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Supplied By','datafield' : 'suppBy','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{text : 'Segment',datafield : 'segId','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false,},
			{text : 'Category',datafield : 'category','width' : '6.5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,}, 
			{text : 'Sub Cat Desc',datafield : 'subCategory','width' : '8%',cellsalign : 'left',align : 'center',sortable : false,editable : false,}, 
			{text : 'Act Ret Wt',datafield : 'accessoryWt',cellsformat : 'd3','width' : '5%',cellsalign : 'right',align : 'center',sortable :false,editable : false},
			{text : 'Act Ret Pcs',datafield : 'pieces','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Given Wt.','datafield' : 'custGivenWt','width' : '8%',cellsalign : 'right',align : 'center',sortable :false,editable : false},
			{'text' : 'Given Pcs','datafield' : 'custGivenPcs','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,cellsformat : 'd2',editable : false},
			{'text' : 'Used Wt','datafield' : 'custUsedWt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Used Pcs','datafield' : 'custUsedPcs','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false},
			{'text' : 'Ret Wt','datafield' : 'custRetWt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Ret Pcs','datafield' : 'custRetPcs','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Brk Ret Wt','datafield' : 'custRetWastageWt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Brk Ret Pcs','datafield' : 'custRetWastagePcs','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Brk UnRet Wt','datafield' : 'custUnRetWastageWt','width' : '8%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Brk UnRet Pcs','datafield' : 'custUnRetWastagePcs','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{text : '',sortable : false,hidden: true,datafield : 'selectionStatus',columntype : 'checkbox',width : '5.5%',cellsalign : 'center',align:'center',filterable: false,
				cellbeginedit : function(row) {
					var suppBy = $('#jqxgrid9').jqxGrid('getcellvalue',row,'suppBy');
					if(suppBy != "Vendor"){
						return true;
					}else{
						return false;
					}
				},
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					if (newvalue) {$("#jqxgrid9").jqxGrid('selectrow', row, 'selectionStatus', true);}
					else {$("#jqxgrid9").jqxGrid('unselectrow', row, 'selectionStatus', false);}
				}
			},
			
			{text : '',datafield : 'materialType',hidden: true}, 
			{text : '',datafield : 'orderStoneAccSrlNo',hidden: true}, 
			{text : '',datafield : 'locationCode',hidden: true},
			{text : '',datafield : 'pureWt',hidden: true,cellsformat : 'd3'}, 
			{text : '',datafield : 'stoneWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'suppliedBy',hidden: true},
			{text : '',datafield : 'storeOrDC',hidden : true},
			{text : '',datafield : 'storeOrDcId',hidden: true}, 
			{text : '',datafield : 'currentZone',hidden: true}, 
			{text : '',datafield : 'cashier',hidden: true}, 
			{text : '',datafield : 'cashierSatus',hidden: true},
			{text : '',datafield : 'metalSegmentId',hidden: true}, 
			{text : '',datafield : 'metalSegmentCode',hidden: true},
			{text : '',datafield : 'segmentId',hidden: true},
			{text : '',datafield : 'segmentCode',hidden : true},
			{text : '',datafield : 'jewelType',hidden: true}, 
			{text : '',datafield : 'shape',hidden: true}, 
			
			{text : '',datafield : 'grossWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'netWt',hidden: true,cellsformat : 'd3'}, 
			{text : '',datafield : 'preRepairGrossWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'preRepairNetWt',hidden: true,cellsformat : 'd3'},
			{text : '',datafield : 'orderItemStatus',hidden : true},
			{text : '',datafield : 'articleCode',hidden: true}, 
			{text : '',datafield : 'categoryId',hidden: true},
			{text : '',datafield : 'subCategoryId',hidden: true}, 
			{text : '',datafield : 'categoryCode',hidden: true},
			{text : '',datafield : 'subCategoryCode',hidden: true},
			{text : '',datafield : 'orderId',hidden: true}, 
			{text : '',datafield : 'orderSl',hidden: true},
			{text : '',datafield : 'stockNo',hidden: true}, 
			{text : '',datafield : 'createdBy',hidden: true},
			{text : '',datafield : 'createdDate',hidden : true},
			{text : '',datafield : 'skinPurity',hidden : true,cellsformat : 'd2'},
			{text : '',datafield : 'orderType',hidden : true},
			{text : '',datafield : 'orderKind',hidden : true},
			{text : '',datafield : 'toLocationCode',hidden : true},
			]
	});
}


var coMaterial = "F";
$("#homeCO").on('click',function(){
	coMaterial = "F";
});

$("#stoneDetailsCO").on('click',function(){
	coMaterial = "S";
});

$("#accDetailsCO").on('click',function(){
	coMaterial = "A";
});

var getConsignmentFgDetails = function(){
	 var fgDetails = []; 
	 var rows = $("#jqxgrid7").jqxGrid('getrows');
	 for(var i = 0; i<rows.length; i++){
			if(rows[i].selectionStatus == true){
				var fgdet = {
				    "id": null,
				    "materialType": rows[i].materialType,
				    "orderType": rows[i].orderType,
				    "orderKind":rows[i].orderKind,
				    "orderId": rows[i].orderNo,
				    "orderSrlNo": rows[i].orderSl,
				    "orderStoneAccSrlNo":rows[i].stoneSlNo,
				    "locationCode": rows[i].locationCode,
				    "toLocationCode" : rows[i].toLocationCode,
				    "grossWt": rows[i].grossWt,
				    "netWt":rows[i].netWt,
				    "pureWt": rows[i].pureWt,
				    "pieces": rows[i].pcs,
				    "stoneWt": rows[i].stoneWt,
				    "accessoryWt": rows[i].accessoryWt,
				    "subCategoryDesc": rows[i].subCatDesc,
				    "suppliedBy": rows[i].suppliedBy,
				    "storeOrDC": rows[i].storeOrDC,
				    "storeOrDcId": rows[i].storeOrDcId,
				    "currentZone": {
				      "id": rows[i].currentZone
				    },
				    "cashier": rows[i].cashier,
				    "cashierSatus": rows[i].cashierSatus,
				    "metalSegment": {
				      "id": rows[i].metalSegmentId,
				      "description": rows[i].metalType,
				      "code": rows[i].metalSegmentCode
				    },
				    "segment": {
				      "id": rows[i].segmentId,
				      "description": rows[i].segment,
				      "code": rows[i].segmentCode
				    },
				    "jewelType": rows[i].jewelType,
				    "category": rows[i].category,
				    "subCategory": rows[i].subCategory,
				    "shape": rows[i].shape,
				    "preRepairGrossWt": rows[i].preGwt,
				    "preRepairNetWt": rows[i].preNwt,
				    "custGivenWt": rows[i].custGivenWt,
				    "custGivenPcs": rows[i].custGivenPcs,
				    "custRetWt": rows[i].custRetWt,
				    "custRetPcs": rows[i].custRetPcs,
				    "orderItemStatus": rows[i].orderItemStatus,
				    "skinPurity": rows[i].purity,
				    "articleCode": rows[i].articleCode,
				    "stockNo": rows[i].refStockNo,
				    "cutGrade": rows[i].cutGrade,
				    "clarity": rows[i].clarity,
				    "color": rows[i].color,
				    "createdBy": rows[i].createdBy,
				    "createdDate": rows[i].createdDate,
				}
				fgDetails.push(fgdet);
			}
	 }
	 return fgDetails;
}

var getConsignmentStoneDetails = function(){
	var stoneArry = [];
	 var rows = $("#jqxgrid8").jqxGrid('getrows');
	 for(var i = 0; i<rows.length; i++){
			if(rows[i].selectionStatus == true){
				var stoneData = {
			    "id": null,
			    "materialType": rows[i].materialType,
			    "orderType": rows[i].orderType,
			    "orderKind": rows[i].orderKind,
			    "orderId": rows[i].orderId,
			    "orderSrlNo": rows[i].orderSl,
			    "orderStoneAccSrlNo": rows[i].stoneSlNo,
			    "locationCode": rows[i].locationCode,
			    "toLocationCode" : rows[i].toLocationCode,
			    "grossWt": rows[i].grossWt,
			    "netWt": rows[i].netWt,
			    "pureWt": rows[i].pureWt,
			    "pieces": rows[i].pieces,
			    "stoneWt": rows[i].stoneWt,
			    "accessoryWt": rows[i].accessoryWt,
			    "subCategoryDesc": rows[i].subCatDesc,
			    "suppliedBy":rows[i].suppliedBy,
			    "storeOrDC": rows[i].storeOrDC,
			    "storeOrDcId": rows[i].storeOrDcId,
			    "currentZone": {
			      "id":rows[i].currentZone
			    },
			    "cashier": rows[i].cashier,
			    "cashierSatus": rows[i].cashierSatus,
			    "metalSegment": rows[i].metalSegmentId,
			    "segment": {
			      "id": rows[i].segmentId,
			      "description": rows[i].segId,
			      "code": rows[i].segmentCode
			    },
			    "jewelType": rows[i].jewelType,
			    "category": {
			    	"id": rows[i].categoryId,
				    "description": rows[i].category,
				    "code": rows[i].categoryCode
			    },
			    "subCategory": (rows[i].segmentCode == 'DI') ? null : { "id": rows[i].subCategoryId,"code": rows[i].subCategoryCode,"description": rows[i].subCategory},
			    "shape": rows[i].shape,
			    "preRepairGrossWt": rows[i].preRepairGrossWt,
			    "preRepairNetWt": rows[i].preRepairNetWt,
			    "custGivenWt": rows[i].custGivenWt,
			    "custGivenPcs": rows[i].custGivenPcs,
			    "custRetWt": rows[i].custRetWt,
			    "custRetPcs": rows[i].custRetPcs,
			    "orderItemStatus": rows[i].orderItemStatus,
			    "skinPurity": rows[i].skinPurity,
			    "articleCode": rows[i].articleCode,
			    "stockNo": rows[i].stockNo,
			    "cutGrade": rows[i].cutGrade,
			    "clarity": rows[i].clarity,
			    "color": rows[i].color,
			    "createdBy": rows[i].createdBy,
			    "createdDate": rows[i].createdDate,
				}
				stoneArry.push(stoneData);
			}
	 }
	 return  stoneArry;
}

var getConsignmentAccDetails = function(){
	var accArry = [];
	 var rows = $("#jqxgrid9").jqxGrid('getrows');
	 for(var i = 0; i<rows.length; i++){
			if(rows[i].selectionStatus == true){
				var accData = {
			    "id": null,
			    "materialType": rows[i].materialType,
			    "orderType": rows[i].orderType,
			    "orderKind": rows[i].orderKind,
			    "orderId": rows[i].orderId,
			    "orderSrlNo": rows[i].orderSl,
			    "orderStoneAccSrlNo": rows[i].accSlNo,
			    "locationCode": rows[i].locationCode,
			    "toLocationCode" : rows[i].toLocationCode,
			    "grossWt": rows[i].grossWt,
			    "netWt": rows[i].netWt,
			    "pureWt": rows[i].pureWt,
			    "pieces": rows[i].pieces,
			    "stoneWt": rows[i].stoneWt,
			    "accessoryWt": rows[i].accessoryWt,
			    "subCategoryDesc": rows[i].subCatDesc,
			    "suppliedBy":rows[i].suppliedBy,
			    "storeOrDC": rows[i].storeOrDC,
			    "storeOrDcId": rows[i].storeOrDcId,
			    "currentZone": {
			      "id":rows[i].currentZone
			    },
			    "cashier": rows[i].cashier,
			    "cashierSatus": rows[i].cashierSatus,
			    "metalSegment": rows[i].metalSegmentId,
			    "segment": {
			      "id": rows[i].segmentId,
			      "description": rows[i].segId,
			      "code": rows[i].segmentCode
			    },
			    "jewelType": rows[i].jewelType,
			    "category": {
			    	"id": rows[i].categoryId,
				    "description": rows[i].category,
				    "code": rows[i].categoryCode
			    },
			    "subCategory":  { "id": rows[i].subCategoryId,"code": rows[i].subCategoryCode,"description": rows[i].subCategory},
			    "shape": rows[i].shape,
			    "preRepairGrossWt": rows[i].preRepairGrossWt,
			    "preRepairNetWt": rows[i].preRepairNetWt,
			    "custGivenWt": rows[i].custGivenWt,
			    "custGivenPcs": rows[i].custGivenPcs,
			    "custRetWt": rows[i].custRetWt,
			    "custRetPcs": rows[i].custRetPcs,
			    "orderItemStatus": rows[i].orderItemStatus,
			    "skinPurity": rows[i].skinPurity,
			    "articleCode": rows[i].articleCode,
			    "stockNo": rows[i].stockNo,
			    "cutGrade": rows[i].cutGrade,
			    "clarity": rows[i].clarity,
			    "color": rows[i].color,
			    "createdBy": rows[i].createdBy,
			    "createdDate": rows[i].createdDate,
				}
				accArry.push(accData);
			}
	 }
	 return  accArry;
}


$("#returnCO").on('click',function(){
	var coData = [];
	 if(coMaterial == "F"){
		 var selectedRows = $("#jqxgrid7").jqxGrid('selectedrowindexes');
			if(selectedRows.length == 0){
				$.growl.error({
					message : "Please Select Item to be Returned !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		 for(var i=0; i<selectedRows.length; i++){
			 $("#jqxgrid7").jqxGrid('setcellvalue', selectedRows[i], 'selectionStatus', true);
		 }
		 
		 coData = getConsignmentFgDetails();
	 }else if(coMaterial == 'S'){
		 var selectedRows = $("#jqxgrid8").jqxGrid('selectedrowindexes');
			if(selectedRows.length == 0){
				$.growl.error({
					message : "Please Select Item to be Returned !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		 for(var i=0; i<selectedRows.length; i++){
			 $("#jqxgrid8").jqxGrid('setcellvalue', selectedRows[i], 'selectionStatus', true);
		 }
		 
		 var consignmentStone = getConsignmentStoneDetails();
		 coData = consignmentStone;
	 }
	 else if(coMaterial == 'A'){
		 var selectedRows = $("#jqxgrid9").jqxGrid('selectedrowindexes');
			if(selectedRows.length == 0){
				$.growl.error({
					message : "Please Select Item to be Returned !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		 for(var i=0; i<selectedRows.length; i++){
			 $("#jqxgrid9").jqxGrid('setcellvalue', selectedRows[i], 'selectionStatus', true);
		 }
		 
		 var consignmentAcc = getConsignmentAccDetails();
		 coData = consignmentAcc;
	 }
	 postJSON('/OrderExecution/api/v1/createMaterialReturn?materialType='+coMaterial,JSON.stringify(coData),function(response) {
		 if(response.resCode == 1){
			 data = [];
			 if(coMaterial == 'F'){
				 $("#jqxgrid7").jqxGrid('clear'); 
			 }if(coMaterial == 'S'){
				 $("#jqxgrid8").jqxGrid('clear'); 
			 }else if(coMaterial == 'A'){
				 $("#jqxgrid9").jqxGrid('clear'); 
			 }else{}
			 
			 $.growl.notice({
				 message : response.mesgStr,
				 duration : 10000,
				 title : 'Success'
			 });
		 }else{
			 $.growl.error({
				 message : response.mesgStr,
				 duration : 10000,
				 title : 'Error'
			 })
			 return false;
		 }
	 });
	 
});

