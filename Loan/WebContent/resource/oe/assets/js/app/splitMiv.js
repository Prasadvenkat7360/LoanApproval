var currDate = new Date();
var dd = currDate.getDate();
var mm = currDate.getMonth() + 1;
var yy = currDate.getFullYear();
var givDate = dd + "/" + mm + "/" + yy;
	


$("#saveSplitGiv").hide();
$("#addSplitGiv").prop('disabled',true);

var gridData = [];
var givOnloadFunction = function(stockNo){
	$("#givStockNoC").val(stockNo);
	$.getJSON('/OrderExecution/api/v1/getMivDetailsOfSplitStockId?stockId='+$("#givStockNoC").val(), function(data) {
		if(data.resCode == "1"){
			var vCode = data.payload.vendor;
			gridData = data.payload.mivList;
			console.log(gridData.mivdtos.length);
			$.each(gridData.mivdtos,function(k,v){
				v.selectionStatus = true;
			});
			$.each(gridData.stoneDTOs,function(k,v){
				v.selectionStatus = true;
			});
			$.each(gridData.accessoryDTOs,function(k,v){
				v.selectionStatus = true;
			});
			
			$("#givVendorIdC").val(vCode.vendorId);
			$("#givVendorC").val(vCode.vendorCode + "-" + vCode.vendorName);
			
			$("#addSplitGiv").prop('disabled',false);
		}else{
			$("#addSplitGiv").prop('disabled',true);
		}
	});
}

$("#addSplitGiv").on('click',function(){
	/*var stockNo = $("#givStockNoC").val();
	if(stockNo == ""){
		$.growl.error({
			message : "Please Enter Stock No !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$.getJSON('/OrderExecution/api/v1/getMivDetailsOfSplitStockId?stockId='+stockNo, function(data) {
			if(data.resCode == "1"){*/
				givDetailsGrid(gridData.mivdtos);
				givStoneGrid(gridData.stoneDTOs);
				givAccGrid(gridData.accessoryDTOs);
				$("#saveSplitGiv").show();
				$("#addSplitGiv").prop('disabled',true);
			/*}else{
				$("#saveSplitGiv").hide();
				givDetailsGrid();
				givStoneGrid();
				givAccGrid();
			}*/
		/*});
	}*/
	
});

var givDetailsGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'mivSrialNo','type' : 'long'},
				{'name' : 'materialType','type' : 'string'},
				{'name' : 'materialTypes','type' : 'string'},
				{'name' : 'stoneType','type' : 'string'},
				
				{'name' : 'segment','type' : 'string','map':'metalSegment>name'},
				
				{'name' : 'metalType','type' : 'string'},
				{'name' : 'metalTypes','type' : 'string','map':'metalSegment>name'},

				{'name' : 'psrNos','type' : 'long'},
				
				{'name' : 'metalAccLocations','type' : 'string'},
				{'name' : 'refType','type' : 'string','map' : ''},
				
				{'name' : 'refNo','type' : 'long'},
				{'name' : 'refSerialNo','type' : 'long'},
				{'name' : 'partyBillNo','type' : 'long'}, 
				{'name' : 'partyBillDate','type' : 'string'}, 

				{'name' : 'skinPuritys','type' : 'float'},
				{'name' : 'pcs','type' : 'long'},
				{'name' : 'grossWeight','type' : 'float'}, 

				{'name' : 'netWeight','type' : 'float'}, 
				{'name' : 'remarks','type' : 'string'},
		       
				
				{'name' : 'vendorCode','type' : 'string'}, 
				{'name' : 'mivType','type' : 'string'},
				{'name' : 'stoneTypes','type' : 'string'},
				{'name':'selectionStatus','type':'string'}
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridItemDet").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
		var me = this;
		var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
		toolbar.append(container);
		container.append('<i class="fa fa-list fa-md"></i>&nbsp; Item Details');			
	},
		columns : [
			{'text' : 'Sl No.','datafield' : 'mivSrialNo','width' : '5%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
			{'text' : 'Material Type','datafield' : 'materialType','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'Type','datafield' : 'stoneTypes','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Segment','datafield' : 'segment','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Metal Type','datafield' : 'metalTypes','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'PSR No','datafield' : 'psrNos','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Metal Acc Loc','datafield' : 'metalAccLocations','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Ref Type','datafield' : 'refType','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Ref No','datafield' : 'refNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Ref Sl No','datafield' : 'refSerialNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Party Bill No','datafield' : 'partyBillNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Party Bill Date','datafield' : 'partyBillDate','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'} ,
			{'text' : 'Skin Purity','datafield' : 'skinPuritys','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d2'},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Gross Wt','datafield' : 'grossWeight','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'},
			{'text' : 'Net Wt','datafield' : 'netWeight','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'},
			{'text' : 'Remarks','datafield' : 'remarks','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			{'text' : '', datafield : 'vendorCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			
			{text : '', datafield : 'mivType', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'stoneType', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'selectionStatus', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'materialTypes', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'metalType', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
				/*{text : '', datafield : 'subCatCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},*/
		]
	});
}

var givStoneGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'mivSlNo','type' : 'long'},
				{'name' : 'slNo','type' : 'long'},
				{'name' : 'segment','type' : 'string'},
				
				{'name' : 'categoryDesc','type' : 'long'},
				{'name' : 'subCategory','type' : 'string','map':'shape'},
				{'name' : 'shape','type' : 'string'},
				{'name' : 'color','type' : 'string','map' : 'color>id'},
				
				{'name' : 'actualColor','type' : 'string','map' : 'actualColor>id'},
				{'name' : 'clarity','type' : 'string','map' : 'clarity>id'},
				
				{'name' : 'cutGrade','type' : 'string','map' : 'cutGrade>id'},
				{'name' : 'stoneCode','type' : 'string'},
				{'name' : 'uom','type' : 'string'}, 
				{'name' : 'wtRange','type' : 'string'},
				{'name' : 'costRange','type' : 'string'},
				{'name' : 'costRanges','type' : 'string'},

				{'name' : 'parcelId','type' : 'long','map':''}, 

				{'name' : 'subCatDesc','type' : 'string','map' : ''}, 
				{'name' : 'stoneLoc','type' : 'long'},
		        {'name' : 'vendIssStnPcs','type' : 'long'},
		        {'name': 'vendIssStnWt','type':'float'},
		        {'name' : 'vendLooseStn','type' : 'float'},
		        
		        {'name' : 'companyIssuedStonePcs','type' : 'long'},
		        {'name' : 'companyIssuedStoneWt','type' : 'float'},
		        {'name' : 'compLooseStn','type' : 'float'},
		        
		        {'name' : 'custIssStnPcs','type' : 'long'},
		        {'name' : 'custIssStnWt','type' : 'float'},
		        {'name' : 'custLooseStn','type' : 'float'},
		        
				{'name' : 'stoneCondition','type' : 'string'},
				{'name':'suppliedBy','type':'string'},
				{'name':'packetId','type' : 'long'},
				{'name':'segmentId','type':'long'},
				{'name':'categoryId','type':'long'},
				{'name':'selectionStatus','type':'string'}
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStone").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
		var me = this;
		var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
		toolbar.append(container);
		container.append('<i class="fa fa-list fa-md"></i>&nbsp; Stone  Details');			
		},
		'columngroups' : [
			{ text: 'Vendor', name: 'vendor',align:'center' },
	        { text: 'Company', name: 'IssueStone',align:'center' },
	        { text: 'Customer', name: 'customer' ,align:'center'}
        ],
		columns : [
			{'text' : 'GIV Sl No','datafield' : 'mivSlNo','width' : '5%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
			{'text' : 'Stn Sl No','datafield' : 'slNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'Segment','datafield' : 'segment','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Category','datafield' : 'categoryDesc','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Sub Cat/Shape','datafield' : 'subCategory','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Color','datafield' : 'color','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Actual Color','datafield' : 'actualColor','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'UQC','datafield' : 'uom','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Weight Range','datafield' : 'wtRange','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'} ,
			{'text' : 'Cost Range','datafield' : 'costRange','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Parcel Id','datafield' : 'parcelId','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub Cat Desc','datafield' : 'subCatDesc','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stn Loc Code','datafield' : 'stoneLoc','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Issued Stn Pcs','datafield' : 'vendIssStnPcs','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup: 'vendor'},
			{'text' : 'Issued Stn Wt', datafield : 'vendIssStnWt', width : '5%', cellsalign : 'center', align : 'center',editable : false,columngroup: 'vendor',cellsformat:'d3'},
			
			{text : 'Set/Loose Stn', datafield : 'vendLooseStn', width : '5%', cellsalign : 'center', align : 'center',editable : false,columngroup: 'vendor'},
			{text : 'Issued Stn Pcs', datafield : 'companyIssuedStonePcs', width : '5%', cellsalign : 'center', align : 'center',editable : false,columngroup: 'IssueStone'},
			{text : 'Issued Stn Wt', datafield : 'companyIssuedStoneWt', width : '5%', cellsalign : 'center', align : 'center',editable : false,columngroup: 'IssueStone',cellsformat:'d3'},
			{text : 'Set/Loose Stn', datafield : 'compLooseStn', width : '5%', cellsalign : 'center', align : 'center',editable : false,columngroup: 'IssueStone'},
			{text : 'Issued Stn Pcs', datafield : 'custIssStnPcs', width : '5%', cellsalign : 'center', align : 'center',editable : false,columngroup: 'customer'},
			{text : 'Issued Stn Wt', datafield : 'custIssStnWt', width : '5%', cellsalign : 'center', align : 'center',editable : false,columngroup: 'customer',cellsformat:'d3'},
			{text : 'Set/Loose Stn', datafield : 'custLooseStn', width : '5%', cellsalign : 'center', align : 'center',editable : false,columngroup: 'customer'},
			{text : 'Stone Condition', datafield : 'stoneCondition', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			
			{text : '', datafield : 'suppliedBy', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'packetId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'segmentId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'categoryId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'selectionStatus', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'shape', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'costRanges', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true}

			]
	});
}

var givAccGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'mivSlNo','type' : 'string'},
				{'name' : 'slNo','type' : 'long'},
				{'name' : 'articleCode','type' : 'string'},
				{'name' : 'location','type' : 'string'},

				{'name' : 'subCategory','type' : 'long'},
				{'name' : 'subCatDesc','type' : 'string'},

				{'name' : 'uom','type' : 'string'},
				
				{'name' : 'vendorIssuedAccPcs','type' : 'long'},
				{'name' : 'vendorIssuedAccWt','type' : 'float'},
				{'name' : 'vendorLooseAcc','type' : 'float','map' : ''},
				
				{'name' : 'companyIssuedAccPcs','type' : 'long'},
				{'name' : 'companyIssuedAccWt','type' : 'float'}, 
				{'name' : 'companyLooseAcc','type' : 'float'},
				
				{'name' : 'customerIssuedAccPcs','type' : 'long'},
				{'name' : 'customerIssuedAccWt','type' : 'long'}, 
				{'name' : 'customerLooseAcc','type' : 'float'}, 
				
		        {'name': 'accCondition','type':'string'},
		        {'name': 'selectionStatus','type':'string'},
		        
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
		var me = this;
		var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
		toolbar.append(container);
		container.append('<i class="fa fa-list fa-md"></i>&nbsp; Accessory Details');			
		},
		'columngroups' : [
			{ text: 'Vendor', name: 'vendor',align:'center' },
	        { text: 'Company', name: 'IssueStone',align:'center' },
	        { text: 'Customer', name: 'customer' ,align:'center'}
        ],
		columns : [
			{'text' : 'GIV Sl. No.',datafield : 'mivSlNo','width' : '6%',cellsalign : 'center',align:'center',editable : false},
			{'text' : 'Acc Sl. No.',datafield : 'slNo','width' : '6%',cellsalign : 'center',align:'center',editable : false},
			{'text' : 'Article Code',datafield : 'articleCode','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			{'text' : 'Sub Category',datafield : 'subCatDesc','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			{'text' : 'UQC',datafield : 'uom','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			{'text' : 'Issued Acc Pcs',	datafield : 'vendorIssuedAccPcs',columngroup: 'vendor','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			{'text' : 'Issued Acc Wt',datafield : 'vendorIssuedAccWt',columngroup: 'vendor','width' : '6%',cellsalign : 'right',align:'center',sortable : false,editable : false,cellsformat :'d3'},
			{'text' : 'Set Acc / Loose Acc',datafield : 'vendorLooseAcc',columngroup: 'vendor','width' : '10%',cellsalign : 'center',align:'center',editable : false,cellsformat :'d3'},
			{'text' : 'Issued Acc Pcs',datafield : 'companyIssuedAccPcs',columngroup: 'IssueStone','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			{'text' : 'Issued Acc Wt',datafield : 'companyIssuedAccWt',columngroup: 'IssueStone','width' : '6%',cellsalign : 'right',align:'center',sortable : false,editable : false,cellsformat :'d3'},
			{'text' : 'Set Acc / Loose Acc',datafield : 'companyLooseAcc',columngroup: 'IssueStone','width' : '10%',cellsalign : 'center',align:'center',editable : false,cellsformat :'d3'},
			{'text' : 'Issued Acc Pcs',datafield : 'customerIssuedAccPcs',columngroup: 'customer','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			{'text' : 'Issued Acc Wt',datafield : 'customerIssuedAccWt',columngroup: 'customer','width' : '6%',cellsalign : 'right',align:'center',sortable : false,editable : false,cellsformat :'d3'},
			{'text' : 'Set Acc / Loose Acc',datafield : 'customerLooseAcc',columngroup: 'customer','width' : '8%',cellsalign : 'center',align:'center',sortable : false,editable : false,cellsformat :'d3'},
			{'text' : 'Acc Condition',datafield : 'accCondition',columngroup: 'customer','width' : '6%',cellsalign : 'center',align:'center',sortable : false,editable : false},
			
			{text : '', datafield : 'subCategory', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'selectionStatus', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
				/*{text : '', datafield : 'mainCatId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'mainCatCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'subCatId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'subCatCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},*/
		]
	});
}


$("#saveSplitGiv").on('click',function(){
	var mivData = $('#jqxgridItemDet').jqxGrid('getrows');
	var stoneData = $('#jqxgridStone').jqxGrid('getrows');
	var accData = $('#jqxgridAcc').jqxGrid('getrows');
	
	var createData = {
		"mivdtos" : mivData,
		"stoneDTOs" : stoneData,
		"accessoryDTOs": accData,
		"mivType" : "S",
		"vendorCode" :$("#givVendorIdC").val(),
	}
	
	console.log(createData);
	postJSON('/OrderExecution/api/v1/mivDetails?page=MIV',JSON.stringify(createData),function(data) {
		if (data.resCode == 1) {			
			$.growl.notice({ message: "Successfully created GIV No "+data.payload.mivId, duration: 10000, title: 'Success' });			
				
				$("#jqxgridItemDet").jqxGrid('clear');
				$("#jqxgridStone").jqxGrid('clear');
				$("#jqxgridAcc").jqxGrid('clear');
				$("#saveSplitGiv").prop('disabled',true);
				$("#accStockIdC").val("");
				window.location.href="javascript:showContentPage('captureUnsettingForSplit', 'bodySwitcher')"

		} else {
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
			$("#saveSplitGiv").prop('disabled',false);
		 }
    });
});

//########################### Split MRV Section ##########################
$("#regState").hide();
$("#vendStateIdC").hide();
$("#unRegState").hide();

var grvGridData = []; 
var grvOnloadFunction = function(docNumber){
	$("#grvDateC").val(givDate);
	$("#grvTypeC").val("Sub-Contract");
	$('#grvParcelIdC').empty().append('<option value="" selected>--Select--</option>');
	$("#cgstAmtC").val(parseFloat(0.00).toFixed(2));
	$("#sgstAmtC").val(parseFloat(0.00).toFixed(2));
	$("#igstAmtC").val(parseFloat(0.00).toFixed(2));
	$("#cessAmtC").val(parseFloat(0.00).toFixed(2));
	$("#invAmtBefTaxC").val(parseFloat(0.00).toFixed(2));
	
	$.getJSON('/OrderExecution/api/v1/getMRVOnLoadForSplitStockId?stockId='+docNumber, function(data) {
		if(data.resCode == "1"){
			var grvData = data.payload;
			grvGridData = grvData.gridDetails;
			$("#grvVendorIdC").val(grvData.vendorDetails.id);

			$("#grvVendorC").val(grvData.vendorDetails.vendorCode + "-" + grvData.vendorDetails.vendorName);
			$("#regUnregVendC").val(grvData.vendorTax);
			
			$.each(data.payload.parcelIdsList, function(key, val) {
				$('#grvParcelIdC').append('<option value="' + val.id + '">' + val.id + '</option>');
			});
			
			if(grvData.vendorTax == "Registered"){
				$("#unRegState").hide();
				$("#regState").show();
				$("#vendStateIdC").show();
				
				$.getJSON('/OrderExecution/api/v1/mrvLOV?page=MrvGst&taxType=R&&vId='+grvData.vendorDetails.id, function(data) {
					if(data.resCode == "1"){
						$('#vendGstinNumC').val(data.payload.gstnList[0].name);
					}
					
					$.getJSON('/OrderExecution/api/v1/mrvLOV?page=gstState&taxType=R&&vId='+grvData.vendorDetails.id+'&&gstinNumber='+data.payload.gstnList[0].name, function(data) {
						if(data.resCode == "1"){
							$("#vendStateIdC").val(data.payload.State.id)
							$("#vendStateC").val(data.payload.State.code + "-" + data.payload.State.name);
						}
					});
				});
			}else{
				$.getJSON('/OrderExecution/api/v1/mrvLOV?page=state&taxType=UR', function(data) {
					$("#unRegState").show();
					$("#regState").hide();
					$("#vendStateIdC").hide();
					
					if(data.resCode == "1"){
						$('#unRegVendStateIdC').empty().append('<option value="" selected>--Select--</option>');
						$.each(data.payload.stateList, function(key, val) {
							$('#unRegVendStateIdC').append('<option value="' + val.id + '">' +  val.code +"-" + val.name + '</option>');
						});
					}
				});
			}
			/*givDetailsGrid(gridData.mivdtos);
			givStoneGrid(gridData.stoneDTOs);
			givAccGrid(gridData.accessoryDTOs);
			$("#saveSplitGiv").show();*/
		}else{
			/*$("#saveSplitGiv").hide();
			givDetailsGrid();
			givStoneGrid();
			givAccGrid();*/
		}
	});
}

$("#saveSplitGrv").hide();
$("#addSplitGrv").on('click',function(){
	if($("#grvParcelIdC").val() == ""){
		$.growl.error({
			message : "Please Select Parcel Id !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$("#grvParcelIdC").prop('disabled',true);

		$.each(grvGridData.mrvdtos,function(k,v){
			v.selectionStatus = true;
		});
		grvDetailsGrid(grvGridData.mrvdtos);
		$("#saveSplitGrv").show();
	}
	
});

var grvDetailsGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'mrvSrialNo','type' : 'long'},
				{'name' : 'materialType','type' : 'string'},
				{'name' : 'materialTypes','type' : 'string','map':'materialType'},
				{'name' : 'metalAccLocation','type' : 'string'},
				{'name' : 'stoneType','type' : 'string'},
				{'name' : 'psrNo','type' : 'long'},
				
				{'name' : 'refType','type' : 'string'},
				{'name' : 'refNo','type' : 'long'},
				{'name' : 'refSerialNo','type' : 'long'},

				
				{'name' : 'partyBillNo','type' : 'long'},
				{'name' : 'partyBillDate','type' : 'string'},
				{'name' : 'hsnSacCode','type' : 'long'},
				
				{'name' : 'sgstperc','type' : 'float'},
				{'name' : 'igstperc','type' : 'float'},
				{'name' : 'cessperc','type' : 'float'},
				{'name':'cgstperc','type':'float'},
				{'name' : 'skinPurity','type' : 'float'}, 
				{'name' : 'skinPuritys','type' : 'float','map':'skinPurity'}, 
				{'name' : 'pcs','type' : 'long'}, 
				{'name' : 'grossWeight','type' : 'float'}, 

				{'name' : 'netWeight','type' : 'float'},
				{'name' : 'wastageWeight','type' : 'float'},
				{'name' : 'metalRate','type' : 'float','map':'stanRate'}, 

				{'name' : 'diamondWeight','type' : 'float'}, 
				{'name' : 'labourCharges','type' : 'float'},
				
				{'name' : 'valueInRs','type' : 'float'}, 
				{'name' : 'remarks','type' : 'string'},
				{'name' : 'selectionStatus','type' : 'string'},
				{'name':'segment','type':'long','map':'segmentDTO>segmentId'},
				{'name' : 'stoneTypes','type' : 'string'},
				{'name' : 'metalTypes','type' : 'string','map':'mSegment'},
				{'name':'metalType','type':'long'},
				{'name' : 'segments','type' : 'string','map':'segmentDTO>description'},
				{'name' : 'stanRate','type' : 'float'}, 
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridGrvDet").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		editable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		columns : [
			{'text' : 'Sl No.','datafield' : 'mrvSrialNo','width' : '4%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
			{'text' : 'Material Type','datafield' : 'materialTypes','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'Type','datafield' : 'stoneType','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Segment','datafield' : 'segments','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Metal Type','datafield' : 'metalTypes','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'PSR No','datafield' : 'psrNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Ref Type','datafield' : 'refType','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Ref No','datafield' : 'refNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Ref Sl No','datafield' : 'refSerialNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Metal Acc Loc','datafield' : 'metalAccLocation','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'HSN/SAC Code', datafield : 'hsnSacCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:false},
			{text : 'CGST %', datafield : 'cgstperc', width : '4%', cellsalign : 'center', align : 'center',editable : false,hidden:false,cellsformat:'d2'},
			{text : 'SGST %', datafield : 'sgstperc', width : '4%', cellsalign : 'center', align : 'center',editable : false,hidden:false,cellsformat:'d2'},
			{text : 'IGST %', datafield : 'igstperc', width : '4%', cellsalign : 'center', align : 'center',editable : false,hidden:false,cellsformat:'d2'},
			{text : 'CESS %', datafield : 'cessperc', width : '4%', cellsalign : 'center', align : 'center',editable : false,hidden:false,cellsformat:'d2'},
			
			{'text' : 'Party Bill No','datafield' : 'partyBillNo','width' : '5%',editable : true,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Party Bill Date','datafield' : 'partyBillDate','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'} ,
			{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d2'},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Gross Wt','datafield' : 'grossWeight','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'},
			{'text' : 'Net Wt','datafield' : 'netWeight','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'},
			{text : 'W. Wt.', datafield : 'wastageWeight', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:false,cellsformat:'d3'},
			
			{text : 'Metal Rate', datafield : 'metalRate', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:false,cellsformat:'d2'},
			{text : 'Diamond Wt.', datafield : 'diamondWeight', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:false,cellsformat:'d3'},
			{text : 'Labour Charges', datafield : 'labourCharges', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:false,cellsformat:'d2'},
			{text : 'Value in RS', datafield : 'valueInRs', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:false,cellsformat:'d2'},

			{'text' : 'Remarks','datafield' : 'remarks','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			
			{text : '', datafield : 'skinPuritys', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true,cellsformat:'d2'},
			
			
			{text : '', datafield : 'selectionStatus', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true,cellsformat:'d2'},

			{text : '', datafield : 'segment', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			
			{text : '', datafield : 'materialType', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'metalType', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'stoneTypes', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'stanRate', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},

		]
	});
}

$("#saveSplitGrv").on('click',function(){
	//$("#saveSplitGrv").prop('disabled',true);
	var mrvData = $('#jqxgridGrvDet').jqxGrid('getrows');
	var mrvCreateData;
	
	$.each(mrvData,function(k,v){
		if(v.partyBillNo == "" || v.partyBillNo == null || v.partyBillNo == undefined){
			$.growl.error({
				message : "Please Enter Party Bill Number !!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}else{
		 mrvCreateData = {
			  "type":"SplitMRV",
			  "mrvdtos":mrvData,
			  "stoneDTOs": [],
			  "accessoryDTOs": [],
			  "mrvType": "S",
			  "vendorCode": $("#grvVendorIdC").val(),
			  "parcelId": $("#grvParcelIdC").val(),
			  "gstinNo": $("#vendGstinNumC").val(),
			  "state": {
			    "id": $("#vendStateIdC").val()
			  },
			  "invceAmntbeforeTax": 0.00,
			  "cgstAmnt": 0.00,
			  "sgstAmnt": 0.00,
			  "igstAmnt": 0.00,
			  "cessAmnt": 0.00
		  }
		}
	});
	console.log(mrvCreateData);

	if(mrvCreateData){
		postJSON('/OrderExecution/api/v1/mrvDetails',JSON.stringify(mrvCreateData),function(data) {
		if(data.resCode == 1) {			
			$.growl.notice({
				message : "Successfully created GRV No "+data.payload.mrvId,
				duration : 10000,
				title : 'Success'
			});				
			$("#saveSplitGrv").prop('disabled',true);
			window.location.href="javascript:showContentPage('captureUnsettingForSplit', 'bodySwitcher')"
		} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
				$("#saveSplitGrv").prop('disabled',false);
			 }
	    });
	}


});