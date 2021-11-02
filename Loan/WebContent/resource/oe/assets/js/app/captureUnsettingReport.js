

$("#fromDate").datepicker({ changeYear:true, changeMonth:true, dateFormat:"dd/mm/yy", maxDate: 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});


$("#toDate").datepicker({ changeYear:true, changeMonth:true, dateFormat:"dd/mm/yy", maxDate:0 });

//onLoad Create LOVs

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
		
	});
}


onloadCuSearchLov();

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

var cuSearchFieldFilters = function(){
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var metalSegmentS = $('#metalSegmentS').val();
	var articleSegmentS = $('#articleSegmentS').val();
	var purityS = $('#purityS').val();

	var jeweltypeS = $('#jeweltypeS').val();
	var vendorCode = $('#vendorCode').val();
	var vendorCodeVal = $('#vendorCode-value').val();

	var unsettingVendorcode = $('#unsettingVendorcode-value').val();
	var unsettingLot = $('#unsettingLot').val();
	var openCloseS = $('#openCloseS').val();

	fieldFilters = {
		"fieldFilters" : {}
	};
	
	console.log(vendorCode);
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["ItemVcode"] = vendorCodeVal;
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

//Search Capture Grid
var searchCaptureUnsettingGrid = function() {	
	
	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [
		{'name' : 'lotNumber','type' : 'string','map':'lotNumber'},
		{'name' : 'unsettingDate','type' : 'date', map: 'date'},
		{'name' : 'lotItemId','type' : 'int', 'map': 'id'},
		{'name' : 'unsettingVendorCode','type' : 'string', map: 'unsetVendorId>vendorCode'},
		{'name' : 'itemVendor','type' : 'id', map: 'itemVendor>vendorCode'},
		{'name' : 'articleSegment','type' : 'string', map: 'segment>description'},
		{'name' : 'metalSegment','type' : 'string', map: 'metalSegment>description'},
		{'name' : 'status','type' : 'string','map':'status'},
		{'name' : 'jewelType','type' : 'string', map: 'jType>description'},
		{'name' : 'itemDesc','type' : 'string'},
		{'name' : 'refType','type' : 'string','map':'docType'},
		{'name' : 'refNo','type' : 'int','map':'refDocNo'},
		{'name' : 'refSlNo','type' : 'int','map':'refDocSrlNo'},
		{'name' : 'pieces','type' : 'string'},
		{'name' : 'grossWt','type' : 'string'},
		{'name' : 'netWt','type' : 'string'},
		{'name' : 'pureWt','type' : 'string'},
		{'name' : 'skingPurity','type' : 'string'},
		{'name' : 'makCharges' , 'type':'string'},
		{'name' : 'wastageWt','type':'string'},
		{'name' : 'itemCost','type':'float','map':'lineItemCost'},
		{'name' : 'noOfDays','type':'int','map':'daysCount'},

		{'name' : 'actionId', 'type':'int', map: 'lotNumber'}
	];
	
	var columns = [ 
		{ 'text' : 'Lot No.', 'datafield' : 'lotNumber', cellsalign : 'center', align:'center', 'width': '4%', sortable : true, editable : false }, 
		{ 'text' : 'Unsetting Date', 'datafield' : 'unsettingDate', 'width' : '7%', cellsalign : 'center', align:'center', sortable : true, editable : false,	columntype : 'datetimeinput', cellsformat : 'dd/MM/yyyy'},
		{ 'text' : 'Unsetting Lot Item Id', 'datafield' : 'lotItemId', 'width' : '9%', cellsalign : 'center', align:'center', sortable : true, editable : false,	columntype : 'datetimeinput', cellsformat : 'dd/MM/yyyy'},
		{ 'text' : 'Unsetting Vendor Code', 'datafield' : 'unsettingVendorCode', 'width' : '9%', cellsalign : 'center', align:'center', sortable : true, editable : false,	columntype : 'datetimeinput', cellsformat : 'dd/MM/yyyy'},
		{ 'text' : 'Item Vendor Code', 'datafield' : 'itemVendor', align:'center', 'width' : '8%', cellsalign : 'center',	sortable : false, editable : false },
		{ 'text' : 'Article Seg', 'datafield' : 'articleSegment', align:'center', 'width' : '7%', cellsalign : 'center', sortable : false, editable : false },

		{ 'text' : 'Metal Seg.', 'datafield' : 'metalSegment','width' : '7%', cellsalign : 'center', align:'center', cellsformat : 'd2', sortable : false, editable : false },
		{ 'text' : 'Jewel Name', 'datafield' : 'jewelType','width' : '10%', cellsalign : 'left', align:'center', cellsformat : 'd2', sortable : false, editable : false },
		{ 'text' : 'Article Desc', 'datafield' : 'itemDesc','width' : '11%', cellsalign : 'left', align:'center', cellsformat : 'd2', sortable : false, editable : false },
		{ 'text' : 'Ref Type', 'datafield' : 'refType','width' : '10%', cellsalign : 'center', align:'center', cellsformat : 'd2', sortable : false, editable : false },
		{ 'text' : 'Ref No', 'datafield' : 'refNo','width' : '6%', cellsalign : 'center', align:'center', sortable : false, editable : false },
		{ 'text' : 'Ref Sl No', 'datafield' : 'refSlNo','width' : '6%', cellsalign : 'center', align:'center',sortable : false, editable : false },

		{ 'text' : 'Pre Unset Pcs', 'datafield' : 'pieces', align:'center', 'width' : '5%', cellsalign : 'center', sortable : false, editable : false },
		{ 'text' : 'Pre Unset Gross Wt', 'datafield' : 'grossWt', align:'center',cellsformat : 'd3', 'width' : '7%', cellsalign : 'right', sortable : false, editable : false },
		{ 'text' : 'Pre Unset Net Wt', 'datafield' : 'netWt', align:'center',cellsformat : 'd3', 'width' : '7%', cellsalign : 'right', sortable : false,	editable : false },
		{ 'text' : 'Purity', 'datafield' : 'skingPurity', align:'center', 'width' : '5%',cellsformat : 'd2', cellsalign : 'right', sortable : false, editable : false },
		{ 'text' : 'Pure Wt', 'datafield' : 'pureWt', align:'center', 'width' : '6%',cellsformat : 'd3', cellsalign : 'right', sortable : false, editable : false },
		{ 'text' : 'Cost Making Charge', 'datafield' : 'makCharges', align:'center', 'width' : '9%', cellsalign : 'right', sortable : false, editable : false ,cellsformat : 'd2'},
		{ 'text' : 'Cost Wastage Wt', 'datafield' : 'wastageWt', align:'center', 'width': '8%', cellsalign : 'right', sortable : false, editable : false,cellsformat : 'd3' },
		{ 'text' : 'Status', 'datafield' : 'status', align:'center', 'width' : '8%', cellsalign : 'center', sortable : false, editable : false },
		{ 'text' : 'Item Cost', 'datafield' : 'itemCost', align:'center', 'width': '8%', cellsalign : 'right', sortable : false, editable : false,cellsformat : 'd2' },
		{ 'text' : 'No of Days Available', 'datafield' : 'noOfDays', align:'center', 'width': '8%', cellsalign : 'center', sortable : false, editable : false},

		{ 'text' : '', 'datafield' : 'actionId', align:'center', 'width' : '2.5%', cellsalign : 'center', sortable : false, editable : false, cellsrenderer : viewCaptureUnsetting }
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/unsettingDetailReport", "list", columns , cuSearchFieldFilters(), updateRows, "");
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

//Edit Capture Modal Calling
var viewCaptureUnsetting = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"   data-target="#viewCapturedetail" type="button" id=' + row + ' onclick="viewCreatedDetails('+ value + ')" ><i class="fa fa-eye fa-sm"></i></button>';
}

$('#search').on("click", function() {
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
	if(fromDate == "" || toDate == ""){
		$.growl.error({
			message : "Please select from and to Date",
			duration : 10000
		});
		return false;
	}
	searchCaptureUnsettingGrid();
	$('#jqxgrid').show();
});

//View Capture Unsetting details ###################################################

//Accessory Item Grid
var viewAccItemGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'accSrlNo', type : 'int'}, 
			{name : 'accSegment', type : 'string'},
			{name : 'accCat', type : 'string','map':'accCategory'},
			{name : 'accSubCategory', type : 'string'},
			{name : 'accCode', type : 'string','map':'accArticleCode'},
			{name : 'pcs', type : 'int','map':'preUnsetAccPcs'},
			{name : 'weight', type : 'float','map':'preUnsetAccWt'},
			{name : 'uom', type : 'string','map':'uqc'},
			{name : 'accRate', type : 'string','map':'accRate'},

			{name : 'accCost', type : 'string'},
			{name : 'pktOrStkNo', type : 'int'},
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
			{ text : 'Acc Srl No.', datafield : 'accSrlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Segment', datafield : 'accSegment', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Category', datafield : 'accCat', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Sub Cat', datafield : 'accSubCategory', width : '15%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Acc Code', datafield : 'accCode', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : 'Pre Unset Pcs', datafield : 'pcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pre Unset Weight', datafield : 'weight', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},

			{ text : 'UQC', datafield : 'uom', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : 'Acc Rate', datafield : 'accRate', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},

			{ text : 'Acc Cost', datafield : 'accCost', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Packet/Stock No', datafield : 'pktOrStkNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},

		]
	});
}

//Stone Others View Grid
var viewStoneOtherItemGrid = function(data) {
	var source = {
	datafields : [ 
			{name : 'stoneOwner', type : 'string','map':'suppliedBy'},
			{name : 'stoneSrlNo', type : 'int','map':'srlNo'}, 

			{name : 'stoneSegment', type : 'string',}, 
			{name : 'stoneMainCat', type : 'string'},
			{name: 'stoneSubCatDesc', type: 'string'},
			{name: 'stoneCode', type: 'string','map':'stoneArticleCod'},
			{name : 'clarity', type : 'string'},
			{name : 'color', type : 'string'},
			{name : 'actcolor', type : 'string'},
			{name : 'cutGrade', type : 'string'},
			{name : 'labCode', type : 'string'},
			{name : 'certNo', type : 'int'},

			{name : 'weightRange', type : 'string'},
			{name : 'weight', type : 'float','map':'preUnsetWt'},
			{name : 'pcs', type : 'int','map':'preUnsetPcs'},
			{name : 'uqc', type : 'string','map':'uqc'},
			{name : 'rate', type : 'float','map':'StoneRate'},

			{name : 'cost', type : 'float'},
			{name : 'pktOrStk', type : 'string'},
			{name : 'pktOrStkNo', type : 'int'},

			
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
			{ text : 'Stone Owner', datafield : 'stoneOwner', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Srl No', datafield : 'stoneSrlNo', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Segment', datafield : 'stoneSegment', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},

			{ text : 'Stone Main Cat.', datafield : 'stoneMainCat', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Sub Cat / Shape', datafield : 'stoneSubCatDesc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Code', datafield : 'stoneCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Clarity', datafield : 'clarity', width : '5%', cellsalign : 'center', hidden:true,align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Color', datafield : 'color', width : '5%', cellsalign : 'center',hidden:true, align : 'center', editable : false, sortable : false},
			{ text : 'Actual Color', datafield : 'actcolor', width : '5%', cellsalign : 'center',hidden:true, align : 'center', editable : false, sortable : false},
			{ text : 'Cut Grade', datafield : 'cutGrade', width : '5%', cellsalign : 'center', hidden:true,align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : 'Lab Code', datafield : 'labCode', width : '5%', cellsalign : 'center', hidden:true,align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},
			{ text : 'Cert No', datafield : 'certNo', width : '5%', cellsalign : 'center', hidden:true,align : 'center', editable : false, sortable : false, cellsformat : 'd2', columntype: 'numberinput'},

			{ text : 'Wt /Cost Range', datafield : 'weightRange', width : '6%', cellsalign : 'center',hidden:true, align : 'center', editable : false, sortable : false},
			{ text : 'Stone Pcs', datafield : 'pcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Wt.', datafield : 'weight', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'UQC', datafield : 'uqc', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
		
			{ text : 'Stone Rate', datafield : 'rate', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Stone Cost', datafield : 'cost', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Packet/Stock', datafield : 'pktOrStk', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Packet/Stock No', datafield : 'pktOrStkNo', width : '8%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},

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
			
			var stoneArray = [];
			
			$.each(vd.unsettingOtherStoneDetails,function(k,v){
				stoneArray.push(v)
			});
			
			$.each(vd.unsettingPreciousStoneDetails,function(k,v){
				stoneArray.push(v)
			});
			
			$.each(vd.unsettingDiamondStoneDetails,function(k,v){
				stoneArray.push(v)
			});
			viewStoneOtherItemGrid(stoneArray);
			
			//viewStonePreciousItemGrid(vd.unsettingPreciousStoneDetails);
			//viewStoneDiamondItemGrid(vd.unsettingDiamondStoneDetails);
		}else{
			viewAccItemGrid();
			viewStoneOtherItemGrid();
			//viewStonePreciousItemGrid();
			//viewStoneDiamondItemGrid();
		}

	});
}


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
			postJSON('/OrderExecution/api/v1/exportUnsettingDetailReport',JSON.stringify(fieldFilters),function(response) {
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

//*******************************Capture Unsetting Export*******************************************

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

$("#clearAll").on('click',function(){
	window.location.href = "javascript:showContentPage('captureUnsettingReport', 'bodySwitcher')";
	return window.location.href;
});
	

