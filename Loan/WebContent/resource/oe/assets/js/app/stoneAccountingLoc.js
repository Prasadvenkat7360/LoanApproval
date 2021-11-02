/**
##	AUTHOR		:	DIPANKAR NAHA
##	DATE		:	18-01-2017
##	DESCRIPTION	:	SCRIPT TO CREATE STONE ACCOUNTING LOCATION
 **/

/**
 * ## AUTHOR : DIPANKAR NAHA ## DATE : 18-01-2017 ## DESCRIPTION : SCRIPT TO
 * CREATE METAL ACCOUNTING LOCATION
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

$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
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
	maxDate:'0'
});


var viewDesignVariationRenderer = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnViewMetalAccLoc"  type="button" id='+row+' onclick="editStoneAccLoc('+row+')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></a>'
	}
}
var setLov = function(opt,lovhandler,datatxt) {
	 lovhandler.val(opt.filter(function () { return $(this).html() == datatxt; }).val());
}

// on load Lov For Location Name
$.getJSON('/OrderExecution/api/v1/stoneAccountLocLOV', function(data) {
	$('#locationNameSearch').empty().append('<option value="" selected>--Select--</option>');
	console.log(data.payload.locList);
	$.each(data.payload.locList, function(key, val) {
		$('#locationNameSearch').append('<option value="' + val + '">' + val + '</option>');
	});
});


function editStoneAccLocItemsGrid(data) {

	var updateRows = function(rowid, newdata, commit) {
		console.log(newdata['openWeight']);
		if (newdata['openWeight'] && !isNaN(newdata['openWeight'])) {
			openWeight = parseFloat(newdata['openWeight']);
			$("#jqxgride").jqxGrid('setcellvalue', rowid, 'openWeight',
					openWeight);

		} else {
			$("#jqxgride").jqxGrid('setcellvalue', rowid, 'openWeight', 0.00);
		}
		commit(true);
	}
	
	var datafield = [{
		'name' : 'createdOn',
		'type' : 'string'
	}, {
		'name' : 'accDate',
		'type' : 'string'
	}, {
		'name' : 'segmentDesc',
		'type' : 'string'
	}, {
		'name' : 'categoryId',
		'type' : 'string'
	}, {
		'name' : 'categoryDesc',
		'type' : 'string'
	}, {
		'name' : 'openWeight',
		'type' : 'float'
	}, {
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'id'
	} ];

	var popcolumns = [   {
		'text' : 'Created On',
		'datafield' : 'createdOn',
		'width' : '20%',
		cellsformat : 'd2',
		cellsalign: 'center',
		align:'center', 
		editable : false
	}, {
		'text' : 'Acc. Date',
		'datafield' : 'accDate',
		'width' : '20%',
		columntype: 'datetimeinput',
		cellsalign: 'center',
		align:'center', 
		cellsformat: 'dd/MM/yyyy',
		sortable : false,
		editable : false,
		cellvaluechanging : function(row,
				datafield, columntype, oldvalue,
				newvalue, event) {
			var date = new Date();
			var dateOnly = new Date(date
					.getFullYear(),
					date.getMonth(), date.getDate());
			if (newvalue <= dateOnly) {

				return newvalue;
			} else {
				$.growl.error({
							message : "Future Date not allowed",
							duration : 3000,
							title : 'Error'
						});
				return "";
			}
		}
	}, {
		'text' : 'Segment',
		'datafield' : 'segmentDesc',
		'width' : '20%',
		cellsformat : 'd2',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Category',
		'datafield' : 'categoryDesc',
		'width' : '20%',
		cellsformat : 'd2',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Opening wt.',
		'datafield' : 'openWeight',
		'width' : '20%',
		cellsformat : 'd3',
		sortable : false,
		editable : false,
		columntype: 'float',
		cellsalign: 'right',
		align:'center'

	} ];

	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafield, popcolumns, updateRows, data, addrow, "#jqxgride")
}

var editStoneAccLoc = function(row) {
	$('#popupheaderlabel').text('Edit Stone Account Details	Master');
	
	var id = $('#jqxgrid').jqxGrid('getcellvalue', row, 'id');
	var catId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'categoryId');
	$.getJSON('/OrderExecution/api/v1/editStoneMaster?headerId='+ id + '&categoryId=' + catId, function(data) {
		var selectedRowData = data.payload.slheader;
		var selectedListData = data.payload.list;
		 $("#stoneId").val(id);
		 $("#stDcId").val(selectedRowData.storeDCId);
		 $("#eSegment").val(selectedRowData.segmentId);
		 $("#eCategory").val(selectedListData[0].categoryId);
         $("#eSegmentName").val(selectedListData[0].segmentDesc);
		 $("#eCategoryName").val(selectedListData[0].categoryDesc);
		 $("#dcOrStoreType").val(selectedRowData.storeDcName);
		 $("#dcOrStoreId").val(selectedRowData.storeOrDC);
		 $("#locationNameE").val(selectedRowData.locName);
		 $("#locationCodeE").val(selectedRowData.locationCode);
		 $("#createdByE").val(data.payload.slheader.createdBy);
		 $("#createdOnE").val(data.payload.slheader.createdOn);
		 $("#locationCodeE").attr('disabled', 'disabled');
		 if(selectedRowData.lossLocationFlag == "Yes"){
				$("#lossLocFlagE").val('Yes');
			}else{
				$("#lossLocFlagE").val('No');
			}
		 editStoneAccLocItemsGrid(selectedListData);
		});
}
// Create Search field filter object


// loading data in stone account grid through API call to the server
function stoneAccLocGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'storeDcType',
		'type' : 'string',
		'map' : 'location>storeOrDC'
	},{
		'name' : 'storeDcId',
		'type' : 'long',
		'map' : 'location>storeOrDcName'
	}, {
		'name' : 'createdDate',
		'type' : 'date'
	}, {
		'name' : 'accountDate',
		'type' : 'date'
	}, {
		'name' : 'locationCode',
		'map': 'location>code',
		'type' : 'string'
	}, {
		'name' : 'segment',
		'map': 'location>stoneSegment>description',
		'type' : 'string'
	},{
		'name' : 'category',
		'map': 'category>description',
		'type' : 'string'
	},{
		'name' : 'categoryId',
		'map': 'category>id',
		'type' : 'string'
	}, {
		'name' : 'locationName',
		'map' : 'location>locationName',
		'type' : 'string'
	},{
		'name' : 'openingWeight',
		'type' : 'float'
	},{
		'name' : 'createdBy',
		'type' : 'string',
		'map' : 'createdByName'
	}, {
		'name' : 'id',
		'type' : 'long',
		'map' : 'location>id'
	} ];

	var columns = [ {
		'text' : 'Store/Dc',
		'datafield' : 'storeDcType',
		'width' : '9%',
		editable : false,
		cellsalign: 'center',
		align:'center'
	},{
		'text' : 'Store/Dc Name',
		'datafield' : 'storeDcId',
		'width' : '9%',
		editable : false,
		sortable : true,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Location Code',
		'datafield' : 'locationCode',
		'width' : '8%',
		sortable : true,
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Location Name',
		'datafield' : 'locationName',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align:'center'
	},{
		'text' : 'Created On',
		'datafield' : 'createdDate',
		'width' : '10%',
		cellsformat: 'dd/MM/yyyy',
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Acc. Date',
		'datafield' : 'accountDate',
		'width' : '10%',
		cellsformat: 'dd/MM/yyyy',
		editable : false,
		sortable : true,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '10%',
		sortable : true,
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Category',
		'datafield' : 'category',
		'width' : '13%',
		sortable : true,
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'CategoryId',
		'datafield' : 'categoryId',
		'width' : '13%',
		sortable : true,
		editable : false,
		hidden : true,
		cellsalign: 'center',
		align:'center'
	},  {
		'text' : 'Opening wt.',
		'datafield' : 'openingWeight',
		'width' : '8%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign: 'right',
		align:'center'
	}, {
		'text' : 'Created By',
		'datafield' : 'createdBy',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign: 'center',
		align:'center'
	}, {
		text : '',
		'datafield' : 'id',
		cellsrenderer : viewDesignVariationRenderer,
		editable : false,
		sortable : false,
		 filterable: false,
		'width' : '3%',
		cellsalign: 'center',
		align:'center'
	} ];

	showMyGrid(datafields,"/OrderExecution/api/v1/stoneAccLocList", "list",columns, stoneAccountFilterValues(), updateRows, "id");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}


var stoneAccountFilterValues = function(){
	var stoneAccLoc = $("#stoneAccLoc").val();
	var dcStoreIdSearch = $("#dcStoreIdSearch").val();
	var locationName = $("#locationNameSearch").val();
	var segment = $("#segment").val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	fieldFilters = {
		"fieldFilters" : {}
	};	
	if(stoneAccLoc != "" && stoneAccLoc != null){			
		fieldFilters.fieldFilters["storeOrDctype"] = stoneAccLoc;
	}
	if(dcStoreIdSearch != "" && dcStoreIdSearch != null){
		fieldFilters.fieldFilters["storeOrDcId"] = dcStoreIdSearch;
	}
	if(locationName != "" && locationName != null){
		fieldFilters.fieldFilters["locationName"] = locationName;
	}	
	if(segment != "" && segment != null){
		fieldFilters.fieldFilters["segment"] = segment;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	return fieldFilters;
};
$('#create').on('click', function(){
	$('#createStoneAccLoc').on('hidden.bs.modal',function() {
			$(this).find('form').trigger('reset');
		});
	$('#jqxgridp').jqxGrid('clear');
	
	$("#segment").prop('disabled', false);
	$("#category").prop('disabled', false);
	$("#storeOrDc").prop('disabled', false);
	$("#dcStoreId").prop('disabled', false);
	
	$.getJSON('/OrderExecution/api/v1/metalAccountLOV?page=storeOrDc&sdc=Store', function(data) {
		$('#createdBy').val(data.payload.createdBy);
		$('#createdOn').val(data.payload.createdon);
	});
});

// On change of DC/Store type loading DC/Store ID and append to the drop down
$("#storeOrDc").on("change",function() {
	$('#dcStoreId').empty().append('<option value="" selected>--Select--</option>');
		var id = $('#storeOrDc').val();
		if (id != "") {
			$.getJSON('/OrderExecution/api/v1/metalAccountLOV?page=storeOrDc&sdc='+ id, function(data) {
							// iterate over the data and append a select option
			$.each(data.payload.allStores, function(key, val) {
				$('#dcStoreId').append('<option value="' + val.id + '">'+ val.name + '</option>');
			});
			
				locationName = data.payload.Stone_Account_Location;
					var data = [];
					$.each( locationName, function( key, value ) {			      
						data.push({ value: value.code, label: value.code});
					});
					$(function() {		
						$("#locationNameCreate").autocomplete({		
							source: data,
							focus: function(event, ui) {
								event.preventDefault();
								$(this).val(ui.item.label);	
							},
								select: function(event, ui) {
								event.preventDefault();
								$(this).val(ui.item.label);					
								$("#locationNameCreate-value").val(ui.item.value);					
							 }
						});
					});	
							
							
							var data = [];
							$.each( locationName, function( key, value ) {			      
									data.push({ value: value.locationName, label: value.locationName});
							});
							$(function() {		
								$("#locationCode").autocomplete({		
									
									source: data,
									focus: function(event, ui) {
										
										event.preventDefault();
										$(this).val(ui.item.label);
										
									},
									select: function(event, ui) {
										event.preventDefault();
										$(this).val(ui.item.label);					
										$("#locationCode-value").val(ui.item.value);					
									}
								});
							});	
							
						});
			}
		});

// On change of segment loading category and append to the drop down
$("#segment").on("change",function() {
			$('#category').empty().append('<option value="" selected>--Select--</option>');
			var id = $('#segment').val();
			if (id != "") {
				var params = {
					"fieldFilters" : {
						"suppliedBy" : "CO",
						"sSegId" : id,
						"sSeg" : $('#segment option:selected').text()
					}
				};
				postJSON('api/v1/getStoneCategories', JSON.stringify(params),function(data) {
			if (1 == data.resCode) {
			   $.each(data.payload.mainCatList, function(key,val) {
				  $('#category').append('<option value="' + val.id + '">' + val.description + '</option>');
				});
			}
		});
	 }
});

// Page on load loading segment drop down
var params = {
	"fieldFilters" : {
		"suppliedBy" : "CO",
		"mCode" : ""
	}
};


var $segment =	$('#segment');
$segment.empty().append('<option value="" selected>--Select--</option>');
postJSON('api/v1/getStoneSegments', JSON.stringify(params), function(data) {
	if (1 == data.resCode) {
		$.each(data.payload.stoneSeg, function(key, val) {
		 $segment.append('<option value="' + val.id + '">' + val.description + '</option>');		 
		});
		var id =  $("#stoneAccLoc").val();
		$.getJSON('/OrderExecution/api/v1/metalAccountLOV?page=storeOrDc&sdc=Store',function(data) {
			var locationName = data.payload.Stone_Account_Location;
			var data = [];
			$.each( locationName, function( key, value ) {			      
				data.push({ value: value.locationName, label: value.locationName});
		});
			$(function() {		
				$("#locationNameSearch").autocomplete({		
					
					source: data,
					focus: function(event, ui) {
						
						event.preventDefault();
						$(this).val(ui.item.label);
						
					},
					select: function(event, ui) {
						event.preventDefault();
						$(this).val(ui.item.label);					
						$("#locationNameSearch-value").val(ui.item.value);					
					}
				});
			});	
			
		})
		
		
	}

});
$('#create').on('click', function(){
	$("#addLineItems").show();
	$("#jqxgridp").hide();
	$("#addStoneAccLocRow").hide();
	$("#saveStoneAccLoc").hide();
	$("#addStoneAccLocRow").prop("disabled", false);
});
$("#addStoneAccLocRow").on('click', function() {	
	$("#addLineItems").hide();
	$("#saveStoneAccLoc").show();
	$("#addStoneAccLocRow").prop("disabled", true);
	return false;
});

var validateStoneAccLocFields = function() {
	var segment = $("#segment").val();
	var category = $("#category").val();
	var storeOrDc = $("#storeOrDc").val();
	var dcStoreId = $("#dcStoreId").val();
	var locationCode = $("#locationCode").val();
	var locationName = $("#locationNameCreate").val();

	var validation = true;

	if (segment == "" || storeOrDc == "" || dcStoreId == ""  || locationCode == "" || locationName == "") {	
		validation = false;
	}
	return validation;
}

function addStoneAccLocItemsGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
		if (newdata['openingWt'] && !isNaN(newdata['openingWt'])) {
			openingWt = parseFloat(newdata['openingWt']);
			$("#jqxgridp").jqxGrid('setcellvalue', rowid, 'openingWt',
					openingWt);

		} else {
			$("#jqxgridp").jqxGrid('setcellvalue', rowid, 'openingWt', 0.00);
		}
		commit(true);
	}

	var datafield = [{
		'name' : 'stoneAccLocSerialNo',
		'type' : 'string'
	}, {
		'name' : 'createdOn',
		'type' : 'string'
	}, {
		'name' : 'accDate',
		'type' : 'string'
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'category',
		'type' : 'long'
	}, {
		'name' : 'openingWt',
		'type' : 'float'
	}, {
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'id'
	} ];

	var popcolumns = [  {
		'text' : 'Sl. No.',
		'datafield' : 'stoneAccLocSerialNo',
		'width' : '5%'
	}, {
		'text' : 'Created On',
		'datafield' : 'createdOn',
		'width' : '20%',
		cellsformat : 'd2',
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Acc. Date',
		'datafield' : 'accDate',
		'width' : '20%',
		columntype: 'datetimeinput',
		cellsalign: 'center',
		align:'center',
		cellsformat: 'dd/MM/yyyy',
		sortable : false,
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '20%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Category',
		'datafield' : 'category',
		'width' : '20%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Opening wt.',
		'datafield' : 'openingWt',
		'width' : '15%',
		cellsalign: 'right',
		align:'center',
		cellsformat : 'd3',
		sortable : false,
		editable : true,
		columntype: 'float'

	} ];

	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafield, popcolumns, updateRows, data, addrow, "#jqxgridp")
}

// Add line item after creating header
$("#addLineItems").on("click", function() {
	
	if (validateStoneDetails()) {
		$("#addStoneAccLocRow").show();

		$("#segment").attr('disabled', 'disabled');
		$("#category").attr('disabled', 'disabled');
		$("#storeOrDc").attr('disabled', 'disabled');
		$("#dcStoreId").attr('disabled', 'disabled');

		$('#jqxgridp').jqxGrid('clear');
		addStoneAccLocItemsGrid(data);
		$('#jqxgridp').show();
		$("#jqxgridp").jqxGrid("updatebounddata");
		$("#editgridmetalrate").show();
		$("#saveMetalRate").show();
	} 
});
var rowId = 0;
// Add new row in grid to create stone accounting location
var generaterow = function(i) {
	var row = {};

	row["stoneAccLocSerialNo"] = i;
	row["createdOn"] = $('#createdOn').val();
	row["accDate"] = $('#createdOn').val();
	row["segment"] = $("#segment option:selected").text();
	row["category"] = $("#category option:selected").text();
	row["openingWt"] = "";
	rowId = rowId + 1;
	return row;
}


// Add row in grid lines
$("#addStoneAccLocRow").on("click", function() {	
		$("#jqxgridp").jqxGrid('addrow', null, generaterow(rowId + 1));	
});

var saveRecordsStoneAccLocDet = function() {
	var stoneAccLoclines = [];
	var rows = $('#jqxgridp').jqxGrid('getrows');
	if (!validateStoneAccLocFields() || rows.length == 0) {
		$.growl.error({
			message : "Fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		if(row.category == "" || row.openingWt < "0"){
			$.growl
			.error({
				message : "Fields are mandatory!!",
				duration : 10000
			});
			return false;
		}
		console.log(row);
		stoneAccLoclines.push({
			"categoryId" : $('#category').val(),
			"openingWeight" : row.openingWt,
			"receiptWeight" : "",
			"closingWeight" : "",
			"issueWeight" : ""
			
		});

	}

	var stoneAccLocDetails = {
		"segmentId" : $("#segment").val(),
		"storeDcName" : $("#storeOrDc").val(),
		"categoryId" : $("#category").val(),
		"storeDCId" : $("#dcStoreId").val(),
		"locationCode" : $("#locationCode").val().trim(),
		"locName" : $("#locationNameCreate").val().trim(),
		"segmentDesc" : $("#segment option:selected").text(),
		"categoryDesc" : $("#category option:selected").text(),
		"lossLocationFlag" :$("#lossLocFlagC").val(),
		"stoneAccLocDetails" : stoneAccLoclines
	}
	return stoneAccLocDetails;
}

$("#showHideId").hide();
var editRecordsStoneAccLocDet = function() {
	var codeL = $("#locationNameE").val()
	console.log(codeL.length);
	if (editValidate()) {
		var stoneAccLoclines = [];
		
		var rows = $('#jqxgride').jqxGrid('getrows');
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			stoneAccLoclines.push({
				"categoryId" : row.categoryId,
				"openWeight" : row.openWeight,
				"receiptWeight" : "",
				"closingWeight" : "",
				"issueWeight" : ""
			});
		}
		var stoneAccLocDetails = {
			"stoneHeaderId" :  $("#stoneId").val(),		
			"segmentId" : $("#eSegment").val(),
			"storeDcName" : $("#dcOrStoreType").val(),
			"storeOrDC" : $("#dcOrStoreId").val(),
			"locationCode" : $("#locationCodeE").val().trim(),
			"locName" : $("#locationNameE").val().trim(),
			"storeDCId" : $("#stDcId").val(),
			"segmentDesc" : $("#eSegment option:selected").text(),
			"lossLocationFlag" :$("#lossLocFlagE").val(),
			"stoneAccLocDetails" : stoneAccLoclines
		}
		return stoneAccLocDetails;
	}
}
//Update and save metal accounting location details
$("#editStoneAccLoc").on('click',function() {
	trimmer();
	var locationCodeE = $("#locationCodeE").val();
	if(locationCodeE == "" || locationCodeE == null){
		$.growl.error({
			message : "Location code can not be empty!!",
			duration : 10000
		});
		return false;
	}
	var stoneAccLocDetails = editRecordsStoneAccLocDet();
	if (stoneAccLocDetails) {
		postJSON('/OrderExecution/api/v1/updateStoneAccountLoc',JSON.stringify(stoneAccLocDetails),function(data) {
		  if (data.resCode == "1") {										
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			$('#btnViewMetalAccLoc').modal('hide');
			stoneAccLocGrid();
			$('#btnViewMetalAccLoc').on('hidden.bs.modal',function() {
			$(this).find('form').trigger('reset');
		});			
		} else {
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
		 }
					
		$('#jqxgridp').jqxGrid('clear');	
		// Re-set search and grid form after saving data / Already exist data
		$("#segment").removeAttr('disabled');
		$("#category").removeAttr('disabled');
		$("#storeOrDc").removeAttr('disabled');
		$("#dcStoreId").removeAttr('disabled');
		$("#locationCode").removeAttr('disabled');
		$('form#MetalAccLocSearch').trigger('reset');		
	});

	}
});

// Create and save metal accounting location details
$("#saveStoneAccLoc").on('click',function() {
	trimmer();
	var stoneAccLocDetails = saveRecordsStoneAccLocDet();
	if (stoneAccLocDetails) {
		postJSON('/OrderExecution/api/v1/createStoneAccLocationDetails',JSON.stringify(stoneAccLocDetails),function(data) {
			if (data.resCode == "1") {										
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});		
				$('#createStoneAccLoc').on('hidden.bs.modal',function() {
		    		$(this).find('form').trigger('reset');
		    	});
				$('#createStoneAccLoc').modal('hide');
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});										
			}
		$("#segment").removeAttr('disabled');
		$("#category").removeAttr('disabled');
		$("#storeOrDc").removeAttr('disabled');
		$("#dcStoreId").removeAttr('disabled');
		$('#MetalAccLocSearch').trigger('reset');
		});
	}	
});
// Stone accounting location search API
$("#stoneAccLoc").on("change",function() {
			$('#dcStoreIdSearch').empty().append('<option value="" selected>--Select--</option>');
			var id = $('#stoneAccLoc').val();
			if (id != "") {
				$.getJSON('/OrderExecution/api/v1/stoneAccLocLOV?page=stoneAccLoc&sdc=' + id, function(data) {
							// iterate over the data and append a select option
		         $.each(data.payload.allStores, function(key, val) {
			       $('#dcStoreIdSearch').append('<option value="' + val.id + '">' + val.name + '</option>');
						});
				});
			}
		});

$.date = function(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
}; 


// Export Recort as per search criteria
$("#export").on("click", function() {		
	var data;
	var newData = [];
	var fDate = $("#fromDateS").val();
	var tDate = $("#toDateS").val();
	var stoneAccLoc = $("#stoneAccLoc").val();
	var dcStoreIdSearch = $("#dcStoreIdSearch").val();
	var locationNameSearch = $("#locationNameSearch").val();
	 if(fDate == "" || fDate == null || tDate == "" || tDate == null || stoneAccLoc == "" || stoneAccLoc == null || dcStoreIdSearch == "" || dcStoreIdSearch == null || locationNameSearch == "" || locationNameSearch == null){
		 $.growl.error({
			 message : "Please Select Mandatory Fields !!",
			 duration : 10000,
			 title : 'Error'
		 });
		 return false;
	 }
	 
	
	var sysdate = moment().format('DDMMYYYYHHmmSS');
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
	   	postJSON('/OrderExecution/api/v1/exportStoneMasterList',JSON.stringify(stoneAccountFilterValues()), function(response) {
		if(response != null){
		data = response.payload.list;	
		for(i=0; i<data.length; i++){	
		if(data[i].openingWeight == null && data[i].openingWeight == ""){
			var openingWeight = "";
		}else{
			var openingWeight = data[i].openingWeight
		}
		newData.push({	
			        'Dc/Store Type': (data[i].storeDcName != null) ? data[i].storeDcName : "" ,
			        'Dc/Store Id': (data[i].storeDCId != null) ? data[i].storeDCId : "" ,	 		
			        'Dc/Store Name': (data[i].storeOrDC != null) ? data[i].storeOrDC : "" ,
			        'Segment Name' : (data[i].segmentDesc != null)? data[i].segmentDesc :"",
			        'Category Name' : (data[i].categoryDesc != null) ? data[i].categoryDesc :"",
			        'Account Date' : (data[i].accDate != null) ? data[i].accDate :"" ,
			        'Opening Balance': (data[i].openWeight != null) ? data[i].openWeight :"",
			        'Receipt Wt' :	(data[i].recptWeight != null) ? data[i].recptWeight :"",	
			        'Issue Wt': (data[i].issueWght != null) ? data[i].issueWght :"",	
			        'Closing Balance': (data[i].closingWght != null) ? data[i].closingWght  : "",	
					'Location Code' : (data[i].locationCode != null) ? data[i].locationCode :"",
					'Location Name' : (data[i].locName != null) ? data[i].locName :"",	
					'Created On' : (data[i].createdOn != null) ? data[i].createdOn :"",
					'Created By' : 	(data[i].createdBy != null) ? data[i].createdBy :"",
		       });
		}
		//JSONToCSVConvertor(newData,	"Stone Accounting Location" + "_" + sysdate, true);	
		 var opts = [{sheetid:'Stone_Accounting_Location',header:true}];
         var res = alasql('SELECT * INTO XLSX("Stone Accounting Location_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
	  }
   });
      }else{
	         $.growl.error({
		         message : "No Data to Export.",
		         duration : 10000
	      });
	    return false;	
      }
   }
});

//Validation is for search page
//On click on search button it will load grid
$("#search").on('click', function() {	
	var fDate = $("#fromDateS").val();
	var tDate = $("#toDateS").val();
	var stoneAccLoc = $("#stoneAccLoc").val();
	var dcStoreIdSearch = $("#dcStoreIdSearch").val();
	var locationNameSearch = $("#locationNameSearch").val();
	 if(fDate == "" || fDate == null || tDate == "" || tDate == null || stoneAccLoc == "" || stoneAccLoc == null || dcStoreIdSearch == "" || dcStoreIdSearch == null){
		 $.growl.error({
			 message : "Please Select Mandatory Fields !!",
			 duration : 10000,
			 title : 'Error'
		 });
		 return false;
	 }
	 else{
		 stoneAccLocGrid(); 
		 $("#jqxgrid").show();
	 } 	
});


//Validate Field for Creation of Stone Accounting Location Details-------
var validateStoneDetails = function() {	
	 $form = $('#MetalAccLocSearchC');
	    $form.validate({
	        errorElement: 'label', 
	        errorClass: 'help-inline', 
	        focusInvalid: false, 
	        ignore: "",
	      
	        rules: {
	        	"locationCode": { 
	        		required: true ,	        	
	        		 regx : /^[A-Z]+$/,	                
	                 maxlength: 4
	        	},	        		
	            "locationNameCreate": { 
	            	required: true,
	            	regx :/^[a-zA-Z ]*$/
	            },      
	            "segment" : { required: true},
	            "category" : { required: true},
	            "storeOrDc" : { required: true},
	            "dcStoreId" : { required: true},
	        },
	        messages: {
                "locationCode": {
            		regx: "Only capital letter allowed!",            		
            		maxlength : "Code should be 4 character!"
            	},
	        	"locationNameCreate":{
		        	regx : "Only charcters with space are allowed!"
		        }
            }
	    });
	  

	    if ($form.valid()) {
	    	 return true;
	    } else {
	    	 return false;
	    }

	    return false;
}
//Validation for the Edit page
var editValidate = function(){
	$form = $('#MetalAccLocSearchE');
    $form.validate({
        errorElement: 'label', 
        errorClass: 'help-inline', 
        focusInvalid: false, 
        ignore: "",
        rules: {
        	"locationCode": { 
        		required: true ,	        	
        		 regx :/^[A-Z]+$/,               
                 maxlength: 4
        	},	        		
            "locationNameE": { 
            	required: true,
            	regx :/^[a-zA-Z ]*$/
            }       
        },
	        messages: {
	        	"locationNameE":{
	        		regx : "Only charcters with space are allowed!"
	        	 },
	        	
               "locationCode": {
         		regx: "Only capital letter allowed!",         		
         		maxlength : "Code should be 4 character!"
         	}
        }
    });

    if ($form.valid()) {
    	 return true;
    } else {
    	 return false;
    }

    return false;
}


// Clear grid and reset input and dropdown value
$("#clearAll").on('click', function() {
	var validator = $( "form" ).validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});
$('.modal').on('hidden.bs.modal', function(){
    $(this).find('form')[0].reset();
});

//################## validation is added #############################################
$.validator.addMethod(
        "regx",
        function(value, element, regexp) {
            if (regexp.constructor != RegExp)
                regexp = new RegExp(regexp);
            else if (regexp.global)
                regexp.lastIndex = 0;
            return this.optional(element) || regexp.test(value);
        },
        ""
);