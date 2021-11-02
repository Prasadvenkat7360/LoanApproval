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

// ######################## Capture Unsetting MIV Started ########################
$("#mSeg").hide();
$("#vCode").hide();

//######## LOT NUMBER lov ################
var onLoadLotNo = function() {
var lotNoC = {
		"fieldFilters" : {}
	   }
	$('#unsetLotNoC').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/createUnsettingMIV?type=MivLov', JSON.stringify(lotNoC), function(data) {
		$.each(data.payload.list, function(key, val) {
			$('#unsetLotNoC').append('<option value="' + val.id + '">' + val.id + '</option>');
		});
	});
}
onLoadLotNo();

//date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});


//Smart Search For Vendor Code
$.getJSON('/OrderExecution/api/v1/getVendorDcCodeSPQuery', function(data) {
	vendorList = data.payload.vendorCode;
	console.log(vendorList);
	var data = [];
	$.each(vendorList, function(key, value) {
		data.push({
			value : value.id,
			label : value.vendorCode + "-" + value.vendorName
		});
	});

	$(function() {
		$("#vendorCode").autocomplete({

			source : data,
			focus : function(event, ui) {

				event.preventDefault();
				$(this).val(ui.item.label);
			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
				$("#vendorCode-value").val(ui.item.value);
			}
		});
	});

});

$.getJSON('/OrderExecution/api/v1/unsettingSearchOnloadLOV', function(data) {
	$('#segmentS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.mSegment, function(key, val) {
		$('#segmentS').append('<option value="' + val.segmentId + '">' + val.description + '</option>');
});
});


$('#unsetLotNoC').on('change',function() {
$("#capUnsetMiv").show();
 	var unsetLotNoC = parseInt($("#unsetLotNoC").val());  
	postJSON('/OrderExecution/api/v1/createUnsettingMIV?type=MivLovDetails&lotNo='+unsetLotNoC, {}, function(data) {
		var dataDet = data.payload.list;
			$.each(dataDet,function(key, val) {
				$("#createdByS").val(val.createdBy);
				$("#createdDateS").val(val.createdDate);
				$("#unsetMetalSegS").val(val.metalSegment.description);
				$("#unsetVendCodeS").val(val.unsetVendorId.vendorName);
				$("#unsetGrossWtC").val(val.totalGwt);
				$("#unsetNetWtC").val( val.totalNwt);
				$("#unsetPureWtC").val( val.totalPurewt);
				$("#unsetPurityC").val( val.skingPurity);
			    $("#unsetMivPcsC").val( val.pieces);
				$("#unsetMetalSegC").val(val.metalSegment.segmentId);
				$("#unsetVendCodeC").val( val.unsetVendorId.vendorId);
				
			    stoneDiamondItemGrid(val.unsettingDiamondStoneDetails);
			    accGridDet(val.unsettingAccDetails);
			    otherStoneItemGrid(val.unsettingOtherStoneDetails);
			    preciousStoneItemGrid(val.unsettingPreciousStoneDetails);
		   });
	   });
   });



//Stone Diamond Grid
var stoneDiamondItemGrid = function(data) {
	var source = {
			datafields : [ 
				{name : 'stoneSegment', type : 'string'},
				{name : 'stoneMainCat', type : 'string'}, 
				{name : 'stoneSubCatDesc', type : 'string'},
				{name: 'weightRange', type: 'string'},
				{name : 'clarity', type : 'string'},
				{name : 'color', type : 'string'},
				{name : 'cutGrade', type : 'int'},
				{name: 'actualColor', type: 'string'},
				{name : 'stoneCode', type : 'string','map':'stoneArticleCod'},
				{name : 'uqc', type : 'string'},
				{name : 'totalPcs', type : 'int','map':'preUnsetPcs'},
				{name : 'preUnsetWt', type : 'float'},
				{name : 'totalCost', type : 'float','map':'cost'},	
				{name : 'suppBy', type : 'string','map':'suppliedBy'},
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#stoneDiamondItemGrid").jqxGrid({
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
			{ text : 'Stone Seg', datafield : 'stoneSegment', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Cat.', datafield : 'stoneMainCat', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat.', datafield : 'stoneSubCatDesc', width : '20%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Actual Color', datafield : 'actualColor', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Code', datafield : 'stoneCode', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'UQC', datafield : 'uqc', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d2'},
			{ text : 'Wt. Range', datafield : 'weightRange', width : '11%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : 'Clarity', datafield : 'clarity', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Color', datafield : 'color', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : 'Cut', datafield : 'cutGrade', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput',hidden:true},
			{ text : 'Total Pcs', datafield : 'totalPcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false, columntype: 'numberinput'},
			{ text : 'Total Weight', datafield : 'preUnsetWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Total Cost', datafield : 'totalCost', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			]
	});
}

//Other Stones Grid
var otherStoneItemGrid = function(data) {
	var source = {
			datafields : [ 
				{name : 'stoneSegment', type : 'string'},
				{name : 'stoneMainCat', type : 'string'}, 
				{name : 'stoneSubCatDesc', type : 'string'},
				{name: 'costRange', type: 'string'},
				{name : 'preUnsetWt', type : 'float'},
				{name : 'totalCost', type : 'float','map':'cost'},
				{name : 'stoneCode', type : 'string','map':'stoneArticleCod'},
				{name : 'uqc', type : 'string'},
				{name : 'totalPcs', type : 'int','map':'preUnsetPcs'},
				{name : 'suppBy', type : 'string','map':'suppliedBy'},
			],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#otherStoneItemGrid").jqxGrid({
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
			{ text : 'Stone Seg', datafield : 'stoneSegment', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Cat.', datafield : 'stoneMainCat', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat.', datafield : 'stoneSubCatDesc', width : '19%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Code', datafield : 'stoneCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'UQC', datafield : 'uqc', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d2'},
			{ text : 'Cost Range', datafield : 'costRange', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Total Pcs', datafield : 'totalPcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false, columntype: 'numberinput'},
			{ text : 'Total Weight', datafield : 'preUnsetWt', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Total Cost', datafield : 'totalCost', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			]
	});
}

//Precious Stones Grid
var preciousStoneItemGrid = function(data) {
	var source = {
			datafields : [ 
				{name : 'stoneSegment', type : 'string',map :'stoneSegment'},
				{name : 'stoneMainCat', type : 'string',map :'stoneMainCat'}, 
				{name : 'stoneSubCatDesc', type : 'string',map :'stoneSubCatDesc'},
				{name: 'costRange', type: 'string',map :'costRange'},
				{name : 'totalWt', type : 'float',map : 'preUnsetWt'},
				{name : 'totalCost', type : 'float',map :'cost',},	
				{name : 'stoneCode', type : 'string','map':'stoneArticleCod'},
				{name : 'uqc', type : 'string'},
				{name : 'totalPcs', type : 'int','map':'preUnsetPcs'},
				{name : 'suppBy', type : 'string','map':'suppliedBy'},
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#preciousStoneItemGrid").jqxGrid({
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
			{ text : 'Stone Seg', datafield : 'stoneSegment', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Cat.', datafield : 'stoneMainCat', width : '13%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat.', datafield : 'stoneSubCatDesc', width : '20%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Code', datafield : 'stoneCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'UQC', datafield : 'uqc', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d2'},
			{ text : 'Cost Range', datafield : 'costRange', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Total Pcs', datafield : 'totalPcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false, columntype: 'numberinput'},
			{ text : 'Total Weight', datafield : 'totalWt', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Total Cost', datafield : 'totalCost', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			]
	});
}

//Accessory Item Grid
var accGridDet = function(data) {
	var source = {
		datafields : [ 
			{name : 'accSegment', type : 'string'},
			{name : 'accCategory', type : 'string'}, 
			{name : 'accSubCategory', type : 'string'},
			{name: 'preUnsetAccWt', type: 'float'},
			{name : 'accCost', type : 'float'},
			{name : 'accCode', type : 'string','map':'accArticleCode'},
			{name : 'uqc', type : 'string'},
			{name : 'totalPcs', type : 'int','map':'preUnsetAccPcs'},
			{name : 'suppBy', type : 'string','map':'suppliedBy'},
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#accGridDet").jqxGrid({
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
			{ text : 'Acc Seg', datafield : 'accSegment', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Main Cat.', datafield : 'accCategory', width : '18%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Sub Cat.', datafield : 'accSubCategory', width : '23%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Code', datafield : 'accCode', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'UQC', datafield : 'uqc', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d2'},
			{ text : 'Total Pcs', datafield : 'totalPcs', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false,columntype: 'numberinput'},
			{ text : 'Total Weight', datafield : 'preUnsetAccWt', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat:'d3'},
			{ text : 'Total Cost', datafield : 'accCost', width : '9%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat:'d2'},
		]
	});
}


$("#creatunsetMivC").on('click',function(){
	 $("#capUnsetMiv").hide();
});


//Save Capture Unsetting Details MIV
$("#saveUnsetMiv").on('click',function() {
	var unsetLotNoC = $("#unsetLotNoC").val();
		if(unsetLotNoC == "" || unsetLotNoC == null){
			$.growl.error({
				message :"Please Enter Lot Number !!",
				duration : 10000,
				title :'Error'
		 });
		return false;
	}else{
		var unsetMivParams = {	
				"metalSegment": {"segmentId": parseInt($("#unsetMetalSegC").val())},
				"unsetVendorId": {"vendorId": parseInt($("#unsetVendCodeC").val())},
				"grossWt" : $("#unsetGrossWtC").val(),
				"netWt" : $("#unsetNetWtC").val(),
				"skingPurity" : $("#unsetPurityC").val(),
				"pureWt" : $("#unsetPureWtC").val(),
				"lotNumber" : parseInt($("#unsetLotNoC").val()),
			    "pieces" : parseInt($("#unsetMivPcsC").val()),	
		      };
		saveUnsettingMivDet(unsetMivParams,'MIV');
	}
});

var saveUnsettingMivDet = function(createData,type){
	$("#saveSplitUnsetMiv").prop('disabled',true);
	postJSON('/OrderExecution/api/v1/createUnsettingMIV?type=saveMIV', JSON.stringify(createData), function(data) {
		if (data.resCode == "1") {
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			if(type == "MIV"){
				$('#createUnsetMiv').modal('hide');
			}else{
				window.location.href = "javascript:showContentPage('captureUnsettingForSplit', 'bodySwitcher')";
			}
		} else {
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
					});
			   }
		
		
	});
}
var unsettingMivFieldFilters = function() {
	var segmentS = $("#segmentS").val();
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var lotNoS = $("#lotNoS").val();
	var vendor = $("#vendorCode-value").val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["metalTypeId"] = segmentS;
	}	
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}	
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}	
	if (lotNoS != "" && lotNoS != null) {
		fieldFilters.fieldFilters["lotNo"] = lotNoS;
	}	
	if (vendor != "" && vendor != null) {
		fieldFilters.fieldFilters["vendor"] = vendor;
	}	
	fieldFilters.fieldFilters["page"] = "search";
	return fieldFilters;
}


function unsettingMivSearch() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [
		{name : 'id', type : 'int'},
		{name : 'vendorName', type : 'string'}, 
		{name : 'segment', type : 'string'}, 
		{name : 'Purity', type : 'float'}, 
		{name : 'Purity', type : 'float'}, 
		{name : 'grossWt', type : 'float'},
		{name: 'netWt', type: 'float'},
		{name : 'pureWt', type : 'float'},
		{name : 'pieces', type : 'int'},
		{name : 'createdDate', type : 'string'},
		{'name' : 'actionId','type' : 'int','map' : 'id'},
		{'name' : 'printId','type' : 'int','map' : 'id'}

	];
	
	var columns = [
		{ text : 'Lot No', datafield : 'id', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		{ text : 'Vendor Name', datafield : 'vendorName', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
		{ text : 'Segment', datafield : 'segment', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
		{ text : 'Purity', datafield : 'Purity', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
		{ text : 'Gross Wt.', datafield : 'grossWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
		{ text : 'Net Wt.', datafield : 'netWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
		{ text : 'Pure Wt.', datafield : 'pureWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
		{ text : 'Pcs', datafield : 'pieces', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		{ text : 'Created Date', datafield : 'createdDate', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat : 'dd/mm/yyyy'},
		{ text : '',datafield : 'actionId',cellsrenderer : viewUnsetMiv,editable : false,cellsalign : 'center',align : 'center','width' : '3%'},
		{ text : '',datafield : 'printId',cellsrenderer : printUnsetMiv,editable : false,cellsalign : 'center',align : 'center','width' : '3%'}
		];
	showMyGrid(datafields,"/OrderExecution/api/v1/UnsettingMIVList", "list",columns, unsettingMivFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	autorowheight :true,
        autoheight :true,
        columnsheight: 55,
        columnsresize: true,  
		rowsheight : 35,
		theme: 'energyblue',
		rowdetails : true,
		virtualmode : true,
	});
}

var printUnsetMiv = function(row, column, value) {
	return  '<a class="btn btn-sm btn-primary" id='
	+ row
	+ ' onclick="printUnsetMivDet('
	+ value
	+ ')" href="javascript:void(0);"/><i class="fa fa-print fa-sm"></i></a>'
}


//Print Functionality Implemented By Venkat
var printUnsetMivDet = function(unsHeaderId){

	fieldFilters = {
        "fieldFilters" : {
            "UnsHeaderId" :unsHeaderId,
            "mode" : "pdf",
            "reportName" : "RPT_GIV_UNS_DeliveryChallan"
        }
    };
jasperReport('RPT_GIV_UNS_DeliveryChallan.pdf', fieldFilters);
}


var viewUnsetMiv = function(row, column, value) {
	return  '<a class="btn btn-sm btn-primary" type="button" data-toggle="modal" data-target="#viewUnsetMiv"  type="button" id='
	+ row
	+ ' onclick="viewUnsetMivDet('
	+ value
	+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-sm"></i></a>'
}

var viewUnsetMivDet = function(id){
		postJSON('/OrderExecution/api/v1/createUnsettingMIV?type=MivLovDetails&lotNo='+id, {}, function(data) {
			if(data.resCode == "1"){
				var dataDet = data.payload.list;
				$.each(dataDet,function(key, val) {
					
					$("#unsetLotNoV").val(id);
					$("#createdByV").val(val.createdBy);
					$("#createdDateV").val(val.createdDate);
					$("#unsetMetalSegV").val(val.metalSegment.description);
					$("#unsetVendCodeV").val(val.unsetVendorId.vendorName);
					$("#unsetGrossWtV").val(val.totalGwt);
					$("#unsetNetWtV").val( val.totalNwt);
					$("#unsetPureWtV").val( val.totalPurewt);
					$("#unsetPurityV").val( val.skingPurity);
				    $("#unsetMivPcsV").val( val.pieces);
					
				    stoneDiamondViewGrid(val.unsettingDiamondStoneDetails);
				    accViewGridDet(val.unsettingAccDetails);
				    otherStoneViewGrid(val.unsettingOtherStoneDetails);
				    preciousStoneViewGrid(val.unsettingPreciousStoneDetails);
			   });
			}
	 });
}

//Stone Diamond Grid
var stoneDiamondViewGrid = function(data) {
	var source = {
			datafields : [ 
				{name : 'stoneSegment', type : 'string'},
				{name : 'stoneMainCat', type : 'string'}, 
				{name : 'stoneSubCatDesc', type : 'string'},
				{name: 'weightRange', type: 'string'},
				{name : 'clarity', type : 'string'},
				{name : 'color', type : 'string'},
				{name : 'cutGrade', type : 'int'},
				{name: 'actualColor', type: 'string'},
				{name : 'stoneCode', type : 'string','map':'stoneArticleCod'},
				{name : 'uqc', type : 'string'},
				{name : 'totalPcs', type : 'int','map':'preUnsetPcs'},
				{name : 'preUnsetWt', type : 'float'},
				{name : 'totalCost', type : 'float','map':'cost'},	
				{name : 'suppBy', type : 'string','map':'suppliedBy'},		
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#stoneDiamondItemGridV").jqxGrid({
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
			{ text : 'Stone Seg', datafield : 'stoneSegment', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Cat.', datafield : 'stoneMainCat', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat.', datafield : 'stoneSubCatDesc', width : '20%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Actual Color', datafield : 'actualColor', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Code', datafield : 'stoneCode', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'UQC', datafield : 'uqc', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d2'},
			{ text : 'Wt. Range', datafield : 'weightRange', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Clarity', datafield : 'clarity', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Color', datafield : 'color', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : 'Cut', datafield : 'cutGrade', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput',hidden:true},
			{ text : 'Total Pcs', datafield : 'totalPcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, columntype: 'numberinput'},
			{ text : 'Total Weight', datafield : 'preUnsetWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Total Cost', datafield : 'totalCost', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
		]
	});
}

//Other Stones Grid
var otherStoneViewGrid = function(data) {
	var source = {
			datafields : [ 
				{name : 'stoneSegment', type : 'string'},
				{name : 'stoneMainCat', type : 'string'}, 
				{name : 'stoneSubCatDesc', type : 'string'},
				{name: 'costRange', type: 'string'},
				{name : 'preUnsetWt', type : 'float'},
				{name : 'totalCost', type : 'float','map':'cost'},
				{name : 'stoneCode', type : 'string','map':'stoneArticleCod'},
				{name : 'uqc', type : 'string'},
				{name : 'totalPcs', type : 'int','map':'preUnsetPcs'},
				{name : 'suppBy', type : 'string','map':'suppliedBy'},
			],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#otherStoneItemGridV").jqxGrid({
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
			{ text : 'Stone Seg', datafield : 'stoneSegment', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Cat.', datafield : 'stoneMainCat', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat.', datafield : 'stoneSubCatDesc', width : '15%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Code', datafield : 'stoneCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'UQC', datafield : 'uqc', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat:'d2'},
			{ text : 'Cost Range', datafield : 'costRange', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Total Pcs', datafield : 'totalPcs', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false,columntype: 'numberinput'},
			{ text : 'Total Weight', datafield : 'preUnsetWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Total Cost', datafield : 'totalCost', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},

		]
	});
}

//Precious Stones Grid
var preciousStoneViewGrid = function(data) {
	var source = {
			datafields : [ 
				{name : 'stoneSegment', type : 'string'},
				{name : 'stoneMainCat', type : 'string'}, 
				{name : 'stoneSubCatDesc', type : 'string'},
				{name: 'costRange', type: 'string',map :'costRange'},
				{name : 'totalWt', type : 'float',map : 'preUnsetWt'},
				{name : 'totalCost', type : 'float',map :'cost'},	
				{name : 'stoneCode', type : 'string','map':'stoneArticleCod'},
				{name : 'uqc', type : 'string'},
				{name : 'totalPcs', type : 'int','map':'preUnsetPcs'},
				{name : 'suppBy', type : 'string','map':'suppliedBy'},		
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#preciousStoneItemGridV").jqxGrid({
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
			{ text : 'Stone Seg', datafield : 'stoneSegment', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Cat.', datafield : 'stoneMainCat', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat.', datafield : 'stoneSubCatDesc', width : '15%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Code', datafield : 'stoneCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'UQC', datafield : 'uqc', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat:'d2'},
			{ text : 'Cost Range', datafield : 'costRange', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Total Pcs', datafield : 'totalPcs', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false, columntype: 'numberinput'},
			{ text : 'Total Weight', datafield : 'totalWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Total Cost', datafield : 'totalCost', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
		]
	});
}

//Accessory Item Grid
var accViewGridDet = function(data) {
	var source = {
		datafields : [ 
			{name : 'accSegment', type : 'string','map':''},
			{name : 'accCategory', type : 'string'}, 
			{name : 'accSubCategory', type : 'string'},
			{name: 'preUnsetAccWt', type: 'float'},
			{name : 'accCost', type : 'float'},
			{name : 'accCode', type : 'string','map':'accArticleCode'},
			{name : 'uqc', type : 'string'},
			{name : 'totalPcs', type : 'int','map':'preUnsetAccPcs'},
			{name : 'suppBy', type : 'string','map':'suppliedBy'},
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#accGridDetV").jqxGrid({
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
			{ text : 'Acc Seg', datafield : 'accSegment', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Main Cat.', datafield : 'accCategory', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Sub Cat.', datafield : 'accSubCategory', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Code', datafield : 'accCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'UQC', datafield : 'uqc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supp By', datafield : 'suppBy', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d2'},
			{ text : 'Total Pcs', datafield : 'totalPcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false, columntype: 'numberinput'},
			{ text : 'Total Weight', datafield : 'preUnsetAccWt', width : '12%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat:'d3'},
			{ text : 'Total Cost', datafield : 'accCost', width : '11%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat:'d2'},
		]
	});
}


$("#search").on('click',function(){
	unsettingMivSearch();
	$("#jqxgrid").show();
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('captureUnsettingMiv', 'bodySwitcher')"
});

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

$("#export").on('click',function(){
	
	postJSON('/OrderExecution/api/v1/exportUnsettingMIVList',JSON.stringify(unsettingMivFieldFilters()),function(data) {
		
	});
});
