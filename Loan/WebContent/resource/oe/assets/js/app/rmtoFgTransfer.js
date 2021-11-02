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

// date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	maxDate : 0,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

//on load lov's
var onLoadLov = function(){
$.getJSON('/OrderExecution/api/v1/rmFgTransferOnLoadLov', function(data) {
	$('#metalSegS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.mSegments, function(key, val) {
		$('#metalSegS').append('<option value="' + val.segmentId + '">' + val.description + '</option>');
	});
	$('#fromLocS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.FrmLocList, function(key, val) {
		$('#fromLocS').append('<option value="' + val + '">' + val + '</option>');
	});	
});
}
onLoadLov();

// on change of from location load to Location
$("#fromLocS").on('change',function(){
	$('#toLocS').empty().append('<option value="" selected>--Select--</option>');
	var params ={
				  "fieldFilters":{"frmLoc":$("#fromLocS").val()}
				}
	postJSON('/OrderExecution/api/v1/rmFgTransferTolocByFrmLoc', JSON.stringify(params), function(data) {
			var result = data.payload.toLocLoist;  
				$.each(result, function(key, val) {
	    		$('#toLocS').append('<option value="' + val.locCode + '">' + val.locCode + '</option>');
	    	});	   
	  });		 
  });

var rmFgTransferFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var metalSegS = $("#metalSegS").val();
	var fromLocS = $("#fromLocS").val();
	var toLocS = $("#toLocS").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (metalSegS != "" && metalSegS != null) {
		fieldFilters.fieldFilters["segmentId"] = metalSegS;
	}
	if (fromLocS != "" && fromLocS != null) {
		fieldFilters.fieldFilters["flocation"] = fromLocS;
	}
	if (toLocS != "" && toLocS != null) {
		fieldFilters.fieldFilters["tlocation"] = toLocS;
	}	
	return fieldFilters;
}

//###############  Search Grid ################## 
function rmFgSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ 
		{'name' : 'tvNo','type' : 'int','map'  : 'tvNo'},
		{'name' : 'tvDate','type' : 'date','map'  : 'tvDate'},
		{'name' : 'fromLoc','type' : 'string','map'  : 'FromLoc'},
		{'name' : 'toLoc','type' : 'string','map'  : 'toLoc'},
		{'name' : 'refDocType','type' : 'string','map'  : 'refDocType'}, 
		{'name' : 'refDocNo','type' : 'int','map'  : 'refDocNo'},
		{'name' : 'refSlNo','type' : 'int','map'  : 'refDocSrlNo'}, 
		{'name' : 'grossWt','type' : 'float','map'  : 'GWt'},
		{'name' : 'netWt','type' : 'float','map'  : 'NWt'},
		{'name' : 'pureWt','type' : 'float','map'  : 'PWt'}, 
		{'name' : 'pcs','type' : 'int','map'  : 'pcs'},
		{'name' : 'actionId','type' : 'int','map'  : 'tvNo'}
		];
	var columns = [
		{'text' : 'TV No','datafield' : 'tvNo','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false},
		{'text' : 'TV Date','datafield' : 'tvDate','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'}, 
		{'text' : 'From Location','datafield' : 'fromLoc','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'To Location','datafield' : 'toLoc','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Ref Doc Type','datafield' : 'refDocType','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Ref Doc No','datafield' : 'refDocNo','width' : '8%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Ref Sl No','datafield' : 'refSlNo','width' : '8%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Gross Wt','datafield' : 'grossWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '10%',cellsformat : 'd3'},
		{'text' : 'Net Wt','datafield' : 'netWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '10%',cellsformat : 'd3'},
		{'text' : 'Pure Wt','datafield' : 'pureWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '10%',cellsformat : 'd3'},
		{'text' : 'Pcs','datafield' : 'pcs',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '8%'},
		{'text' : '','datafield' : 'actionId',editable : false,cellsalign : 'center',align : 'center',cellsrenderer : viewRmFgTransferDet,sortable : false,'width' : '3%'}
		];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchRMFGTransfer", "list",columns, rmFgTransferFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
	});
}

var viewRmFgTransferDet = function(row, column, value) {
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewRmFgTransferDet"  type="button" id='
			+ row
			+ ' onclick="viewTransferDetails('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-sm"></i></a>'
}

var viewTransferDetails = function(id) {
	$.getJSON('/OrderExecution/api/v1/viewRMFGTransferSADetails?tvId=' + id, function(data) {
		var vd = data.payload.saDetails;	
		viewStoneDetGrid(vd.Stones);
		viewAccDetGrid(vd.Accessory);
	});
 }

//View Grids Started
//Stone Details View Grid
var viewStoneDetGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'stSrlNo', type : 'int','map' : 'refDocSrlNo'}, 
			{name : 'stSeg', type : 'string','map' : 'stoneSegment'},
			{name: 'stMainCat', type: 'string','map':'stoneCategory'},
			{name: 'stSubCat', type: 'string','map':'stoneSubCategory'},
			{name : 'stShape', type : 'string','map':'shape'},
			{name : 'stCode', type : 'string','map' : 'stoneCode'},
			{name : 'stWtRange', type : 'string','map': 'weightRange'},
			{name : 'stClarity', type : 'string','map' : 'clarity'},
			{name : 'stCutGrade', type : 'string','map': 'cutGrade'},
			{name : 'stActCol', type : 'string','map' : 'actualColor'},
			{name : 'stCol', type : 'string','map' :'color'},
			{name : 'stUqc', type : 'string','map' :'uom'},
			{name : 'stRate', type : 'double','map' : 'sellingRate'},
			{name : 'stCompPcs', type : 'int','map':'stonePcs'},
			{name : 'stCompWt', type : 'double','map' : 'stoneWt'},
			{name : 'stCompPrice', type : 'double','map' :'sellingPrice'},
			{name : 'subCatDesc', type : 'string','map' :'stoneSubCatDesc'},
			{name : 'suppBy', type : 'string','map' : 'suppliedBy'}
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewStoneDetGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		theme: 'energyblue',
		editable : false,
		columnsheight : 65,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'Srl No', datafield : 'stSrlNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Seg', datafield : 'stSeg', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Cat', datafield : 'stMainCat', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Sub Cat', datafield : 'stSubCat', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '10%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Shape', datafield : 'stShape', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Code', datafield : 'stCode', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Wt Range', datafield : 'stWtRange', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Clarity', datafield : 'stClarity', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Actual Color', datafield : 'stActCol', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Color', datafield : 'stCol', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cut Grade', datafield : 'stCutGrade', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'stUqc', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Rate/HC', datafield : 'stRate', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
			{ text : 'Comp Pcs', datafield : 'stCompPcs', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Comp Wt', datafield : 'stCompWt', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Comp Price', datafield : 'stCompPrice', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Supplied By', datafield : 'suppBy', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false}
		]
	});
}

//Accessory Details View Grid
var viewAccDetGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'mainCat', type : 'string','map': 'mainCategory'},
			{name : 'subCat', type : 'string','map': 'subcategoryDesc'},
			{name : 'code', type : 'string','map': 'code'},
			{name:  'uqc', type: 'double','map' : 'uom'},
			{name : 'rate', type : 'int','map' : 'sellingRate'},
			{name : 'accCompPcs', type :'double','map':'pcs'},
			{name : 'accCompWt', type :'double','map':'weight'},
			{name : 'accCompPrice', type : 'double','map':'sellingPrice'},
			{name : 'accSuppBy', type : 'string','map':'suppliedBy'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewAccDetGrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		theme: 'energyblue',
		editable : false,
		height : 200,
		columnsheight : 40,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'Main Category', datafield : 'mainCat', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Category', datafield : 'subCat', width : '15%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Code', datafield : 'code', width : '11%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'UQC', datafield : 'uqc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Rate/HC', datafield : 'rate', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Company Pcs', datafield : 'accCompPcs', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Company Wt', datafield : 'accCompWt', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Company Price', datafield : 'accCompPrice', width : '10%', cellsalign : 'right', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
			{ text : 'Supplied By', datafield : 'accSuppBy', width : '12%', cellsalign : 'center', align : 'center', editable : false, sortable : false}]
	});
}



$("#search").on('click',function(){
	var fDate = $("#fromDateS").val();
	var tDate = $("#toDateS").val();
	if(fDate == "" || fDate == null || tDate == "" || tDate == null){
		$.growl.error({
			message : "Please Select Mandatory Fields",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	else{
		rmFgSearchGrid();
		$("#jqxgrid").show();
	}
});

//Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	window.location.href="javascript:showContentPage('rmtoFgTransfer', 'bodySwitcher')"
});

$('#viewRmFgTransferDet').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();
});