/* AUTH : Dipankar
 * DATE : 19/08/2017
 * DESC : Location Transfer Acknowledgement DC (Zone to Zone) 
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

var checkBoxColoumn, widthColrefDocNo, moveLocationSection, moveToZoneSection;
var onLoadCheckBox = function(){
	if($("#action").val() == "A"){
		widthColrefDocNo = '11%';
		moveLocationSection = {text : 'Move to Metal/Stone Location',datafield : 'moveLocation',width : '8%', cellsalign : 'center',align : 'center', sortable : false ,editable : true, columntype : 'dropdownlist', 	displayfield : 'moveLocationN',
			createeditor : function(row, cellvalue,	editor) {
				editor.on('click',	function(event) {
					var matType = $('#jqxgrid').jqxGrid('getcellvalue', row,"matType");
					var location = $('#jqxgrid').jqxGrid('getcellvalue', row,"location");
					
					var params =	{"fieldFilters":{"materialType":matType,"location":location}};
					var serialNoArr = [];
					
					postJSON('/OrderExecution/api/v1/moveToMetalStoneLocLOVs', JSON.stringify(params), function(data) {		
						editor.jqxDropDownList({
							source : data.payload.locations,
							displayMember : 'id',
							valueMember : 'id'
						});
					});
					
				});
			},
			 cellbeginedit : function(row){
					var refdoc = $('#jqxgrid').jqxGrid ('getcellvalue', row, 'refDocType');
					var matType = $('#jqxgrid').jqxGrid('getcellvalue', row,"matType");
					//var loctn = $('#jqxgrid').jqxGrid('getcellvalue', row,"location");
					/*if(loctn == "CRP" ||loctn == "CSP" || loctn == "SSP" || loctn == "RE-RWK" || loctn == "COP" ){
						return false;
					}else{
						return true;
					}*/
					if(refdoc == "Order" || matType =="Loose Stones" || matType == "Accessory"){
						return false
					}else{
						return true
					}
				},
			cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
				$("#jqxgrid").jqxGrid('setcellvalue', row,'moveLocation', newvalue.value);
				$("#jqxgrid").jqxGrid('setcellvalue', row,'moveLocationN', newvalue.label);
			}
		},
		
		moveToZoneSection =	{text : 'Move To Zone',datafield : 'moveToZone',width : '8%', cellsalign : 'center', sortable : false ,align : 'center',editable : true, columntype : 'dropdownlist', 	displayfield : 'moveToZoneN',
			createeditor : function(row, cellvalue,	editor) {
				editor.on('click',	function(event) {
					$.getJSON('/OrderExecution/api/v1/moveToZoneLOVs', function(data) {
						editor.jqxDropDownList({
							source : data.payload.moveToZones,
							displayMember : 'description',
							valueMember : 'id'
						});
					});
				});
			},
			cellbeginedit : function(row){
					var loctn = $('#jqxgrid').jqxGrid ('getcellvalue', row, 'location');
					if(loctn == "CRP" ||loctn == "CSP" || loctn == "SSP" || loctn == "RE-RWK" ){
						return false;
					}else{
						return true;
					}
				},
			cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
				$("#jqxgrid").jqxGrid('setcellvalue', row,'moveToZone', newvalue.value);
				$("#jqxgrid").jqxGrid('setcellvalue', row,'moveToZoneN', newvalue.label);
			}
		},
		checkBoxColoumn = {text : '',	menu : false,  sortable : false, datafield : 'selectionstatus', hidden: false, columntype : 'checkbox',editable : true,  width : '4%', cellbeginedit : transitSelection,renderer : function() {	return '<div style="margin-left: 10px; margin-top: 5px;"></div>'; }};
	
	}else{
		widthColrefDocNo = '15%';
		moveLocationSection = {text : 'Move to Metal/Stone Location', hidden: true, datafield : 'moveLocation',width : '8%', cellsalign : 'center',align : 'center',editable : true, columntype : 'dropdownlist', 	displayfield : 'moveLocationN'}
		moveToZoneSection =	{text : 'Move To Zone',datafield : 'moveToZone', hidden: true,  width : '8%', cellsalign : 'center',align : 'center',editable : true, columntype : 'dropdownlist', 	displayfield : 'moveToZoneN'}
						
		checkBoxColoumn = {text : '',	menu : false,  sortable : false, datafield : 'selectionstatus', hidden: true, columntype : 'checkbox',editable : true,  width : '4%'};
	}
}
$("#orderFromDate").datepicker({
    	 changeMonth: true,
	      changeYear: true,
	      dateFormat:"dd/mm/yy",
	      maxDate : 0,
	      onSelect : function(dateStr) {
			var min = $(this).datepicker('getDate'); // Get selected date
			$("#orderToDate").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
			
		}
 });
 
$("#orderToDate").datepicker({
	 changeMonth: true,
      changeYear: true,
      dateFormat:"dd/mm/yy",
      minDate : 0,
      maxDate : 0
});


$("#orderFromDate").on('blur', function(){
	$("#orderToDate").val("");
});

$("#transitType").on('change', function(){
	$("#transitHeaderSection").show();
	$("#transitMainSection").hide();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$('#transitMainSection form').trigger('reset');
});

$("#action").on('change', function(){
	$("#transitHeaderSection").show();
	$("#transitMainSection").hide();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$('form#transitMainSection').trigger('reset');
});

var onloadLTA = function(){
	
	$("#statusSection").hide();
	$("#exportTA").hide();
	$("#saveAckTA").hide();
	
	
	$("#transitHeaderSection").show();
	$("#transitMainSection").hide();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	
	var transitType =[{
		"id" : "S",
		"name" : "Sent"
	},{
		"id" : "R",
		"name" : "Received"
	}];
	
	$('#transitType').empty().append('<option value="" selected>--Select--</option>');
	$.each(transitType, function(key, val) {
		$('#transitType').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
}


onloadLTA();

$("#transitType").on('change', function(){
	var value = $(this).val();
	if(value == "S"){
		var action =[{
				"id" : "V",
				"name" : "View Listing"
			}];
	}else{
		var action =[{
			"id" : "A",
			"name" : "Acknowledge"
		},{
			"id" : "V",
			"name" : "View Listing"
		}];
	}
	
	$('#action').empty().append('<option value="" selected>--Select--</option>');
	$.each(action, function(key, val) {
		$('#action').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
});


$("#searchTA").on('click', function(){	
	var orderFromDate = $("#orderFromDate").val();
	var orderToDate = $("#orderToDate").val();
	
	if(orderFromDate == null || orderFromDate == ""){
		$.growl.error({
			message : "Please select order from date.",
			duration : 10000
		});
		return false;
	}
	
	if(orderToDate == null || orderToDate == ""){
		$.growl.error({
			message : "Please select order to date.",
			duration : 10000
		});
		return false;
	}
	
	onLoadCheckBox();
	ltaMasterGrid();
	$("#jqxgrid").show();
	return false;
});

$("#cancelTA").on('click', function(){
	 $('form#transitHeaderSection').trigger('reset');
	 $('form#transitMainSection').trigger('reset');
	 $("#jqxgrid").jqxGrid('clear');
	 $("#jqxgrid").hide();
	 $("#transitMainSection").hide();
});

var toZoneArr = [];
$("#applyTA").on('click', function(){	
	var action = $("#action").val();
	var transitType = $("#transitType").val();
	if(transitType == null || transitType == ""){
		$.growl.error({
			message : "Please select Transit Type.",
			duration : 10000
		});
		return false;
	}
	
	if(action == null || action == ""){
		$.growl.error({
			message : "Please select Action.",
			duration : 10000
		});
		return false;
	}
	
	if(action == "A"){
		$("#statusSection").hide();
		$("#exportTA").hide();
		$("#saveAckTA").show();
	}else{
		$("#statusSection").show();
		$("#exportTA").show();
		$("#saveAckTA").hide();
	}
	
	var params = { "action" : action, "transitType" : transitType };
	
	$.getJSON('/OrderExecution/api/v1/storeToDCListingLOVs', function(data) {
		if(data.resCode == 1){		
			
			var isStoreOrDC = data.payload.isStoreOrDC;
			var referenceDocTypes = data.payload.referenceDocTypes;
			var materialTypes =  data.payload.materialTypes;
			var status = data.payload.status;
			var segmentList  = data.payload.segmentList;
			var location = data.payload.location;
			$('#toFromStoreDC').empty().append('<option value="" selected>--Select--</option>');
			$.each(isStoreOrDC, function(key, val) {
				$('#toFromStoreDC').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
			
			$('#refDocType').empty().append('<option value="" selected>--Select--</option>');
			$.each(referenceDocTypes, function(key, val) {
				$('#refDocType').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
			
			$('#status').empty().append('<option value="" selected>--Select--</option>');
			$.each(status, function(key, val) {
				$('#status').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
			
			$('#materialType').empty().append('<option value="" selected>--Select--</option>');
			$.each(materialTypes, function(key, val) {
				$('#materialType').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
			
			
			$('#segment').empty().append('<option value="" selected>--Select--</option>');
			$.each(segmentList, function(key, val) {
				$('#segment').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
			
			
			$('#location').empty().append('<option value="" selected>--Select--</option>');
			$.each(location, function(key, val) {
				$('#location').append('<option value="' + val.id + '">' + val.id + '</option>');
			});
			
			var transitType = $("#transitType").val();
			
			if(transitType == "S"){
				$("#storeOrDcType").html('To Store/DC Type');
				$("#storeOrDcName").html('To Store/DC Name');
				
				$("#zoneTypeLabel").html('To Zone Type');
				$("#zoneNameLabel").html('To Zone Name');
			}
				
			if(transitType == "R"){
				$("#storeOrDcType").html('From Store/DC Type');
				$("#storeOrDcName").html('From Store/DC Name');
				
				$("#zoneTypeLabel").html('From Zone Type');
				$("#zoneNameLabel").html('From Zone Name');
			}
			
			$("#transitHeaderSection").show();
			$("#transitMainSection").show();
			$("#jqxgrid").show();
		}
	});
	
});

$('#segment').on('change', function(){
	var segment = $(this).val();
	var metalId;
	
	if(segment == 2){
		metalId = 1;
	}else{
		metalId = segment;
	}	
	
	var params = {"fieldFilters":{"segId":segment,"metalId":metalId}}; 

	$('#jewelType').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/getMetalJewelTypesWithMetalProperties', JSON.stringify(params), function(data) {
		$.each(data.payload.mjTypes, function(key, val) {
			$('#jewelType').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});
	
});

$('#toFromStoreDC').on('change', function(){
	var toFromStoreDC = $(this).val();
	$('#toFromStoreDCName').empty().append('<option value="" selected>--Select--</option>');	
	$.getJSON('/OrderExecution/api/v1/storeToDCListingLOVs', function(data) {
		if(toFromStoreDC == "Store") {
			$.each(data.payload.storesList, function(key, val) {
				$('#toFromStoreDCName').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
		}
		
		if(toFromStoreDC == "DC") {
			$.each(data.payload.dcsExptCDs, function(key, val) {
				$('#toFromStoreDCName').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
		}
	});
	
});

$('#toFromStoreDCName').on('change', function(){
	var params = {"fieldFilters":{"toStoreOrDCType": $("#toFromStoreDC").val(),"toStoreOrDCId": $("#toFromStoreDCName").val()}};
	
	postJSON('/OrderExecution/api/v1/getTransitToZoneTypeList', JSON.stringify(params), function(data) {
		$('#toFromZoneType').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.toZoneTypes, function(key, val) {
				$('#toFromZoneType').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	});
	
});


$('#toFromZoneType').on('change', function(){
	var params = {"fieldFilters":{"toStoreOrDCType": $("#toFromStoreDC").val(),"toStoreOrDCId": $("#toFromStoreDCName").val(), "zoneType": $("#toFromZoneType").val() }};
	postJSON('/OrderExecution/api/v1/getTransitToZoneList', JSON.stringify(params), function(data) {
		$('#toFromZone').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.toZones, function(key, val) {
				$('#toFromZone').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});
	
});


$('#fromZone').on('change', function(){
	var value = $(this).val();
	
	$('#toZone').empty().append('<option value="" selected>--Select--</option>');
	$.each(toZoneArr, function(key, val) {
		if(value != val.id){
			$('#toZone').append('<option value="' + val.id + '">' + val.description + '</option>');
		}
	});
});
// On click view button
var  transitSelection = function (row, datafield, columntype) {	
	var selectionStatus =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'selectionstatus');	
	if(datafield == "selectionstatus" &&  selectionStatus == false){ return true; }
	else{ return true;}	
}


var validateMasterGrid = function(){
	var orderFromDate = $("#orderFromDate").val();
	var orderToDate = $("#orderToDate").val();
	
	var transitSlipNo = $("#transitNo").val();	
	var storeOrDc = $("#toFromStoreDC").val();
	var storeOrDdId = $("#toFromStoreDCName").val();
	var toZoneType = $("#toFromZoneType").val();
	var zoneId = $("#toFromZone").val();
	var referenceType = $("#refDocType").val();
	var refDocNo = $("#refDocNo").val();
	var itemType = $("#materialType").val();
	var segId = $("#segment").val();
	var jewelId = ($("#jewelType").val() == 0) ?  null : $("#jewelType option:selected").text();
	
	var location = $("#location").val();
	var status = $("#status").val();
	var transitType = $("#transitType").val();
	var actionType = $("#action").val();
	
	var fieldFilters  ={
			"fieldFilters" : {}
	}
	
	
	fieldFilters.fieldFilters['fromDate'] = orderFromDate;	
	fieldFilters.fieldFilters['toDate'] = orderToDate;		
	
	fieldFilters.fieldFilters['transitType'] = transitType;
	fieldFilters.fieldFilters['actionType'] = actionType;
	
	if(transitSlipNo != null && transitSlipNo != ""){
		fieldFilters.fieldFilters['transitSlipNo'] = transitSlipNo;
	}

	if(storeOrDc != null && storeOrDc != ""){
		fieldFilters.fieldFilters['storeOrDc'] = storeOrDc;
	}
	
	if(storeOrDdId != null && storeOrDdId != ""){
		fieldFilters.fieldFilters['storeOrDdId'] = storeOrDdId;
	}
	
	if(zoneId != null && zoneId != ""){
		fieldFilters.fieldFilters['zoneId'] = zoneId;
	}
	if(toZoneType != null && toZoneType != ""){
		fieldFilters.fieldFilters['toZoneType'] = toZoneType;
	}
	
	if(referenceType != null && referenceType != ""){
		fieldFilters.fieldFilters['referenceType'] = referenceType;
	}
	
	if(refDocNo != null && refDocNo != ""){
		fieldFilters.fieldFilters['refDocNo'] = refDocNo;
	}
	
	if(itemType != null && itemType != ""){
		fieldFilters.fieldFilters['itemType'] = itemType;
	}
	
	if(segId != null && segId != ""){
		fieldFilters.fieldFilters['segId'] = segId;
	}
	
	if(jewelId != null && jewelId != ""){
		fieldFilters.fieldFilters['jewelId'] = jewelId;
	}
	
	if(location != null && location != ""){
		fieldFilters.fieldFilters['location'] = location;
	}
	
	if(status != null && status != ""){
		fieldFilters.fieldFilters['status'] = status;
	}
	
	return fieldFilters;
}
// Location Transfer Ack Master Grid
var ltaMasterGrid = function() {	
	var updateRows = function(rowid, newdata, commit) {}
	
	var datafields = [ 
		{name : 'date', type : 'string', map: 'createdDate'}, 
		{name : 'transitSlipNo',	type : 'int', map: 'id'}, 
		{name : 'fromStoreDC', type : 'string', map: 'fromStore'}, 
		{name : 'fromStoreId', type : 'string', map: 'fromStoreId'}, 
		{name : 'fromZone',	type : 'string', map: 'fromZone'}, 
		{name : 'toStoreDC', type : 'string', map: 'toDc'}, 
		{name : 'toZone', type : 'string', map: 'toZone'},
		{name : 'refDocType',	type : 'string', map: 'refDocType'}, 

		{name : 'fromStoreOrDCType',	type : 'string', map: 'fromStoreOrDCType'}, 
		{name : 'toStoreOrDCType',	type : 'string', map: 'toStoreOrDCType'}, 
		{name : 'sentThrough',	type : 'string', map: 'sentThrough'}, 
		{name : 'toZoneType',	type : 'string', map: 'toZoneType'}, 
		
		{name : 'refDocNo',type : 'int', map: 'referenceNo'}, 
		{name : 'refSlNo',type : 'int', map: 'refSrlNO'}, 
		{name : 'stoneAccSlNo',type : 'int', map: 'stoneAccSerialNumber'}, 
		{name : 'matType',type : 'string', map: 'itemType'}, 
		{name : 'segment',type : 'string', map: 'segment'}, 
		{name : 'segmentId',type : 'string', map: 'segmentId'}, 
		{name : 'jewelType',type : 'string', map: 'jewelType'}, 
		{name : 'purity',type : 'float', map: 'purity'}, 
		{name : 'pcsPair',type : 'int', map: 'pcsOrPair'}, 
		{name : 'grosswt',type : 'float', map: 'gwtWeight'}, 
		{name : 'netwt',type : 'float', map: 'netWeight'}, 
		{name : 'looseStoneSubCat',type : 'string', map: 'stoneAccDescription'}, 
		{name : 'looseStoneAccPcs',type : 'int', map: 'stoneOrAccPcs'}, 
		{name : 'looseStoneAccWt',type : 'float', map: 'stoneOrAccWeight'}, 
		{name : 'uqc',type : 'int', map: 'uom'}, 
		{name : 'location',type : 'string', map: 'metalLocation'}, 
		{name : 'status',type : 'int', map: 'acknowledgedStatus'}, 
		{name : 'remarks',type : 'string', map: 'remarks'}, 
		{name : 'transferDoneBy',type : 'string', map: 'transferDoneBy'}, 
		{name : 'moveLocation',type : 'string'}, 
		{name : 'moveToZone',type : 'string'}, 
		{name : 'selectionstatus',type : 'bool'}];

	
	var columns = [ 
		checkBoxColoumn,
		{text : 'Date', datafield : 'date',	width : '5%', cellsalign : 'center',align : 'center', sortable : true, columntype : 'datetimeinput', cellsformat : 'dd/MM/yyyy',editable : false}, 
		{text : 'Transit No.',datafield : 'transitSlipNo',width : '5%', cellsalign : 'center',align : 'center', sortable : true,editable : false}, 
		{text : 'From Store/DC',datafield : 'fromStoreDC',width : '6%', cellsalign : 'left', sortable : false,align : 'center',	editable : false}, 
		{text : 'From Zone',datafield : 'fromZone',	width : '4%', cellsalign : 'center', sortable : false,align : 'center',editable : false}, 
		{text : 'To Store/DC',	datafield : 'toStoreDC',width : '5%', cellsalign : 'center', sortable : false,align : 'center',	editable : false}, 
		{text : 'To Zone',	datafield : 'toZone',width : '4%', cellsalign : 'center',align : 'center', sortable : true,	editable : false}, 
		{text : '',	datafield : 'fromStoreOrDCType', hidden: true,  width : '4%', cellsalign : 'center',align : 'center',	editable : false}, 
		{text : '',	datafield : 'toStoreOrDCType', hidden: true,  width : '4%', cellsalign : 'center',align : 'center',	editable : false}, 
		{text : '',	datafield : 'sentThrough', hidden: true,  width : '4%', cellsalign : 'center',align : 'center',	editable : false}, 
		{text : '',	datafield : 'toZoneType', hidden: true,  width : '4%', sortable : false, cellsalign : 'center',align : 'center',	editable : false}, 
		{text : 'Ref Doc Type',datafield : 'refDocType',	width : '6%', sortable : true, cellsalign : 'center',align : 'center',editable : false}, 
		{text : 'Ref No',datafield : 'refDocNo',width: '3%', cellsalign : 'center', sortable : true,align : 'center',editable : false}, 
		{text : 'Ref SlNo', datafield : 'refSlNo',width : '4%', cellsalign : 'center', sortable : false,align : 'center',editable : false},
		{text : 'Stn/Acc Sl.',datafield : 'stoneAccSlNo',width : '5%', cellsalign : 'center', sortable : false,align : 'center',editable : false},
		{text : 'M.Type',datafield : 'matType',width : '5%', cellsalign : 'center', sortable : true,align : 'center',editable : false},
		{text : 'Seg',datafield : 'segment',width : '5%', cellsalign : 'center', sortable : true,align : 'center',editable : false},
		{text : 'J.Type',datafield : 'jewelType',width : '4%', cellsalign : 'center', sortable : true,align : 'center',editable : false},
		{text : 'Purity',datafield : 'purity',width : '4%', cellsalign : 'right', sortable : false,align : 'center', cellsformat : 'd2', editable : false},
		{text : 'Pcs./Pairs',datafield : 'pcsPair',width : '5%', cellsalign : 'center', sortable : false,align : 'center',editable : false},
		{text : 'Gwt.',datafield : 'grosswt',width : '5%', cellsalign : 'right', sortable : false,align : 'center',	cellsformat : 'd3', editable : false},
		{text : 'Nwt.',datafield : 'netwt',width : '5%', cellsalign : 'right', sortable : false,align : 'center',cellsformat : 'd3', editable : false},
		{text : 'Loose Stn Subcat',datafield : 'looseStoneSubCat',width : '5%', sortable : false, cellsalign : 'center',align : 'center',editable : false},
		{text : 'Loose Stn/Acc Pcs',datafield : 'looseStoneAccPcs', sortable : false,width : '8%', cellsalign : 'center',align : 'center',editable : false},
		{text : 'Loose Stn/Acc Wt ',datafield : 'looseStoneAccWt', sortable : false,width : '8%', cellsalign : 'right',cellsformat : 'd3',align : 'center',editable : false},
		{text : 'UQC',datafield : 'uqc',width : '3%', cellsalign : 'center', sortable : false,align : 'center',editable : false},
		{text : 'Loc',datafield : 'location',width : '3%', sortable : true, cellsalign : 'center',align : 'center',editable : false},
		{text : 'Status',datafield : 'status',width : '6%', sortable : false, cellsalign : 'center',align : 'center',editable : false},
		{text : 'Remarks',datafield : 'remarks',width : '5%', sortable : false, cellsalign : 'left',align : 'center',editable : false},
		{text : 'Transfered By',datafield : 'transferDoneBy', sortable : false,width : '6%', cellsalign : 'center',align : 'center',editable : false},
		
		moveLocationSection,
		moveToZoneSection
		
	];
	
	showMyGrid(datafields, "/OrderExecution/api/v1/dcToStoreTransitList?param=search", "list", columns, validateMasterGrid(), updateRows, "transitSlipNo");
	
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}

// View in Modal Window
var viewTransitGridData = function(val){
	var rowData = $('#jqxgrid').jqxGrid('getrowdata', val);
	
	var params = {
			"id" : rowData.transitNo,
			"documentNo" : rowData.refDocNo,
			"storeOrDCId" : 1,
			"toZoneId" : rowData.toZoneId,
			"referenceType" : rowData.refType,
			"fromZone" : rowData.fromZone,
			"storeName" : "DC",
			"createdDatee" : rowData.createdDate,
			"createdBy" : rowData.transferDoneBy,
			"status" : rowData.status,
	}
	
	postJSON('/OrderExecution/api/v1/viewDetailsOfTransit', JSON.stringify(params), function(data) {
		var data = data.payload.detailsList;
		viewLTAItemsGrid(data);
	});
	
}



// Ack Transit
$("#saveAckTA").on('click', function(){
	var rowsData = $("#jqxgrid").jqxGrid('getdatainformation'); 
	
	var selectionTrueValueArr = [];
	if(typeof rowsData != "undefined"){
		for (var i = 0; i < rowsData.rowscount; i++){
			var row = $("#jqxgrid").jqxGrid('getrenderedrowdata', i);
			
			
			if(typeof row != "undefined"){
			if(typeof row.selectionstatus != "undefined"){
			if( row.selectionstatus == true){
				if(row.moveLocation != null && row.moveLocation != "" && typeof row.moveLocation != "undefined"){
					if(row.moveToZone == null || row.moveToZone == "" || typeof row.moveToZone == "undefined"){
						$.growl.error({	message : "Please select move to zone for Transit No " + row.transitSlipNo,duration : 10000});
						return false;
					}
				} 
				var rowObj = {
						"id": row.transitSlipNo,
					    "fromStore": row.fromStoreDC,
					    "fromStoreId": row.fromStoreId,
					    "fromZone": row.fromZone,
					    "metalLocation": row.location,
					    "refDocType": row.refDocType,
					    "referenceNo": row.refDocNo,
					    "itemType": row.matType,
					    "createdDate": null,//row.date,
					    "refSrlNO": row.refSlNo,
					    "segment": row.segment,
					    "segmentId": row.segmentId,
					    "jewelType": row.jewelType,
					    "purity": row.purity,
					    "pcsOrPair": row.pcsPair,
					    "gwtWeight": row.grosswt,
					    "netWeight": row.netwt,
					    "fgDaimondWeight": null,
					    "stoneOrAccPcs": row.looseStoneAccPcs,
					    "stoneOrAccWeight": row.looseStoneAccWt,
					    "itemValueRs": null,
					    "remarks": row.remarks,
					    "toDc": row.toStoreDC,
					    "toZone": row.toZone,
					    "toZoneType": row.toZoneType,
					    "fromStoreOrDCType": row.fromStoreOrDCType,
					    "toStoreOrDCType": row.toStoreOrDCType,
					    "transferDoneBy": row.transferDoneBy,
					    "receivedBy": null,
					    "isSelected": row.selectionstatus,
					    "stoneAccSerialNumber": row.stoneAccSlNo,
					    "acknowledgedStatus": row.status,
					    "uom": row.uqc,
					    "moveToMetStnLoc" : row.moveLocationN,
					    "moveToZone" : row.moveToZone,
					    "stoneAccDescription": row.looseStoneSubCat,
					    "sentThrough": row.sentThrough 
				}
				selectionTrueValueArr.push(rowObj);
			}
		}
			}
		}
	}
	
	if(selectionTrueValueArr.length == 0){
		$.growl.error({
			message : "Please select at least one checkbox.",
			duration : 10000
		});
		return false;
	}else{
		postJSON('/OrderExecution/api/v1/confirmTransitVoucher', JSON.stringify(selectionTrueValueArr), function(data) {
			if(data.resCode == 1){
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				ltaMasterGrid();
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});

$("#clearTV").on('click', function(){
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
})


//Export function for Transit Ack From DC
$("#exportTA").on("click",function() {
	var orderFromDate = $("#orderFromDate").val();
	var orderToDate = $("#orderToDate").val();
	
	var transitSlipNo = $("#transitNo").val();	
	var storeOrDc = $("#toFromStoreDC").val();
	var storeOrDdId = $("#toFromStoreDCName").val();
	var toZoneType = $("#toFromZoneType").val();
	var zoneId = $("#toFromZone").val();
	var referenceType = $("#refDocType").val();
	var refDocNo = $("#refDocNo").val();
	var itemType = $("#materialType").val();
	var segId = $("#segment").val();
	var jewelId = ($("#jewelType").val()== "") ? null : $("#jewelType option:selected").text();
	var location = $("#location").val();
	var status = $("#status").val();
	var transitType = $("#transitType").val();
	var actionType = $("#action").val();
	
	var fieldFilters  ={
			"fieldFilters" : {}
	}
	
	
	fieldFilters.fieldFilters['fromDate'] = orderFromDate;	
	fieldFilters.fieldFilters['toDate'] = orderToDate;		
	
	fieldFilters.fieldFilters['transitType'] = transitType;
	fieldFilters.fieldFilters['actionType'] = actionType;
	
	if(transitSlipNo != null && transitSlipNo != ""){
		fieldFilters.fieldFilters['transitSlipNo'] = transitSlipNo;
	}

	if(storeOrDc != null && storeOrDc != ""){
		fieldFilters.fieldFilters['storeOrDc'] = storeOrDc;
	}
	
	if(storeOrDdId != null && storeOrDdId != ""){
		fieldFilters.fieldFilters['storeOrDdId'] = storeOrDdId;
	}
	
	if(zoneId != null && zoneId != ""){
		fieldFilters.fieldFilters['zoneId'] = zoneId;
	}
	if(toZoneType != null && toZoneType != ""){
		fieldFilters.fieldFilters['toZoneType'] = toZoneType;
	}
	
	if(referenceType != null && referenceType != ""){
		fieldFilters.fieldFilters['referenceType'] = referenceType;
	}
	
	if(refDocNo != null && refDocNo != ""){
		fieldFilters.fieldFilters['refDocNo'] = refDocNo;
	}
	
	if(itemType != null && itemType != ""){
		fieldFilters.fieldFilters['itemType'] = itemType;
	}
	
	if(segId != null && segId != ""){
		fieldFilters.fieldFilters['segId'] = segId;
	}
	
	if(jewelId != null && jewelId != ""){
		fieldFilters.fieldFilters['jewelId'] = jewelId;
	}
	
	if(location != null && location != ""){
		fieldFilters.fieldFilters['location'] = location;
	}
	
	if(status != null && status != ""){
		fieldFilters.fieldFilters['status'] = status;
	}

						var rows = $("#jqxgrid").jqxGrid('getdatainformation');
							if(rows.rowscount != 0){
								var newData = [];					
								var sysdate = moment().format('DDMMYYYYHHmmSS')
								postJSON('/OrderExecution/api/v1/dcToStoreTransitList?param=export',JSON.stringify(fieldFilters),function(response) {
									data = response.payload.list;
									for (i = 0; i < data.length; i++) {
									newData.push({	
									'Date' : (data[i].createdDate != null) ? data[i].createdDate : "",
									'Transit No.' : (data[i].id != null) ? data[i].id : "",
									'From Store/DC' : (data[i].fromStore != null) ? data[i].fromStore : "",
									'Store/Dc' : (data[i].fromStoreOrDCType != null) ? data[i].fromStoreOrDCType : "",
									'To Store/DC' : (data[i].toStoreOrDCType != null) ? data[i].toStoreOrDCType : "",
									'From Zone' : (data[i].fromZone != null) ? data[i].fromZone : "",
								    'To Zone Type' : (data[i].toZoneType != null) &&(data[i].toZoneType != 'Null') ? data[i].toZoneType : "",
								    'To Zone' : (data[i].toZone != null) ? data[i].toZone : "",
									'Ref Doc Type' : (data[i].refDocType != null) ? data[i].refDocType : "",
									'Ref Doc No' : (data[i].referenceNo != null) ? data[i].referenceNo: "",
									'Ref Srl No' : (data[i].refSrlNO != null) ? data[i].refSrlNO : "",
									'Stone/Acc Srl No' : (data[i].stoneAccSerialNumber != null) ? data[i].stoneAccSerialNumber : "",
									'Material Type' : (data[i].itemType != null) ? data[i].itemType : "",
									'Segment' : (data[i].segment != null) ?data[i].segment	: "",
									'JewelType' : (data[i].jewelType != null) ?data[i].jewelType	: "",
									'Pcs' : (data[i].pcsOrPair != null) ?data[i].pcsOrPair : "",
								    'Gross Wt' : (data[i].gwtWeight != null) ?data[i].gwtWeight : "",
								    'Net Wt' : (data[i].netWeight != null) ?data[i].netWeight : "",
								    'Purity' : (data[i].purity != null) ?data[i].purity : "",
								    'Loose Stone SubCategory': (data[i].stoneAccDescription != null) ?data[i].stoneAccDescription : "",
								    'Loose Stone/Acc Pcs': (data[i].stoneOrAccPcs != null) ?data[i].stoneOrAccPcs : "", 		
								    'Loose Stone/Acc Wt': (data[i].stoneOrAccWeight != null) ?data[i].stoneOrAccWeight : "",
								    'UQC': (data[i].uom != null) ?data[i].uom : "",
								    'Location': (data[i].metalLocation != null) ?data[i].metalLocation : "",
								    'Remarks': (data[i].remarks != null) ?data[i].remarks : "",
								    'Sent Through': (data[i].sentThrough != null) ?data[i].sentThrough : ""
								});
							}
							//JSONToCSVConvertor(newData, "Transit Acknowledgement from DC" + "_" + sysdate, true);
							 var opts = [{sheetid:'Transit_Acknowledgement_from_DC',header:true}];
		                     var res = alasql('SELECT * INTO XLSX("Transit Acknowledgement from DC_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
						});	
						}else{
							   $.growl
								.error({
									message : "No Data To Export",
									duration : 10000
								});
							   return false;	
							   }
						   
				});
