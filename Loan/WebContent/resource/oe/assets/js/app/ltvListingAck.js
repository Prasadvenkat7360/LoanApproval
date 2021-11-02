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

var checkBoxColoumn, widthColrefDocNo;

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
	//alert($(this).val());
	$("#orderToDate").val("");
});

$("#ltvType").on('change', function(){
	$("#ltvHeaderSection").show();
	$("#ltvMainSection").hide();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$('#ltvMainSection form').trigger('reset');
});

$("#action").on('change', function(){
	$("#ltvHeaderSection").show();
	$("#ltvMainSection").hide();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$('form#ltvMainSection').trigger('reset');
});

var onloadLTA = function(){
	
	$("#statusSection").hide();
	$("#exportTA").hide();
	$("#saveAckTA").hide();
	
	
	$("#ltvHeaderSection").show();
	$("#ltvMainSection").hide();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	
	var ltvType =[{
		"id" : "Sent",
		"name" : "Sent"
	},{
		"id" : "Received",
		"name" : "Received"
	}];
	
	$('#ltvType').empty().append('<option value="" selected>--Select--</option>');
	$.each(ltvType, function(key, val) {
		$('#ltvType').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
}


onloadLTA();

$("#ltvType").on('change', function(){
	var value = $(this).val();
	if(value == "Sent"){
		var action =[{
				"id" : "viewListing",
				"name" : "View Listing"
			}];
	}else{
		var action =[{
			"id" : "Acknowledge",
			"name" : "Acknowledge"
		},{
			"id" : "viewListing",
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
	 $('form#ltvHeaderSection').trigger('reset');
	 $('form#ltvMainSection').trigger('reset');
	 $("#jqxgrid").jqxGrid('clear');
	 $("#jqxgrid").hide();
	 $("#ltvMainSection").hide();
});

var toZoneArr = [];
$("#applyTA").on('click', function(){	
	var action = $("#action").val();
	var ltvType = $("#ltvType").val();
	if(ltvType == null || ltvType == ""){
		$.growl.error({
			message : "Please select LTV Type.",
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
	
	if(action == "Acknowledge"){
		$("#statusSection").hide();
		$("#exportTA").hide();
		$("#saveAckTA").show();
	}else{
		$("#statusSection").show();
		$("#exportTA").show();
		$("#saveAckTA").hide();
	}
	
	var params = { "action" : action, "ltvType" : ltvType };
	
	postJSON('/OrderExecution/api/v1/getonLoadValuesForAckLTV', JSON.stringify(params), function(data) {
		if(data.resCode == 1){
			var referenceTypes = data.payload.referenceTypes;
			var storeOrDcId = data.payload.storeOrDc.id;
			var storeOrDcName = data.payload.storeOrDc.name;
			var zones = data.payload.fromZones;
			var toZoneArry = data.payload.toZones;
			
			$("#dcName").val(storeOrDcName);
			$("#dcId").val(storeOrDcId);
			
			var toZoneArry1 = [];
			var fromZoneArr = [];
			if(params.ltvType == "Received"){
				toZoneArry1.push(toZoneArry);
				fromZoneArr = zones; 
			}else{
				toZoneArry1 = toZoneArry;
				fromZoneArr.push(zones);
			}
			
			$('#refType').empty().append('<option value="" selected>--Select--</option>');
			$.each(referenceTypes, function(key, val) {
				$('#refType').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
			
			$('#fromZone').empty().append('<option value="" selected>--Select--</option>');
			$.each(fromZoneArr, function(key, val) {
				$('#fromZone').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
			
			$('#toZone').empty().append('<option value="" selected>--Select--</option>');
			$.each(toZoneArry1, function(key, val) {
				$('#toZone').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
			
			$("#ltvHeaderSection").show();
			$("#ltvMainSection").show();
			$("#jqxgrid").show();
		}
	});
	
	var statusArr = [{
			"id" : 1,
			"name" : "Acknowledge"
	},{
		"id" : 0,
		"name" : "Un-Acknowledge"
	}];
	
	$('#status').empty().append('<option value="" selected>--Select--</option>');
	$.each(statusArr, function(key, val) {
		$('#status').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
});

/*$('#fromZone').on('change', function(){
	var value = $(this).val();
	
	$('#toZone').empty().append('<option value="" selected>--Select--</option>');
	$.each(toZoneArr, function(key, val) {
		if(value != val.id){
			$('#toZone').append('<option value="' + val.id + '">' + val.description + '</option>');
		}
	});
});*/
// On click view button
var  ltvSelection = function (row, datafield, columntype) {	
	var selectionStatus =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'selectionstatus');	
	if(datafield == "selectionstatus" &&  selectionStatus == false){ return true; }
	else{ return true;}	
}
var onLoadCheckBox = function(){
	if($("#action").val() == "Acknowledge"){
		widthColrefDocNo = '11%';
		checkBoxColoumn = {text : '',	menu : false,  sortable : false, datafield : 'selectionstatus', hidden: false, columntype : 'checkbox',editable : true,  width : '4%', cellbeginedit : ltvSelection,renderer : function() {	return '<div style="margin-left: 10px; margin-top: 5px;"></div>'; }};
	}else{
		widthColrefDocNo = '15%';
		checkBoxColoumn = {text : '',	menu : false,  sortable : false, datafield : 'selectionstatus', hidden: true, columntype : 'checkbox',editable : true,  width : '4%'};
	}
}

var validateMasterGrid = function(){
	var orderFromDate = $("#orderFromDate").val();
	var orderToDate = $("#orderToDate").val();
	var fromZone = $("#fromZone").val();
	var toZone = $("#toZone").val();
	var ltvNo = $("#ltvNo").val();
	var refType = $("#refType").val();
	var refDocNo = $("#refDocNo").val();
	var sentThrough = $("#sentThrough").val();
	var status = $("#status").val();
	var dcName = $("#dcName").val();
	var dcId = $("#dcId").val();
	var action = $("#action").val();
	
	var fieldFilters  ={
			"fieldFilters" : {}
	}
	
	
	fieldFilters.fieldFilters['fromDate'] = orderFromDate;	
	fieldFilters.fieldFilters['toDate'] = orderToDate;		
	fieldFilters.fieldFilters['storeOrDcTypeCode'] = "DC";
	
	if(dcId != null && dcId != ""){
		fieldFilters.fieldFilters['storeOrDcCode'] = dcId;
	}

	if(fromZone != null && fromZone != ""){
		fieldFilters.fieldFilters['fromZoneCode'] = fromZone;
	}
	
	if(toZone != null && toZone != ""){
		fieldFilters.fieldFilters['toZoneCode'] = toZone;
	}
	
	if(ltvNo != null && ltvNo != ""){
		fieldFilters.fieldFilters['ltvNo'] = ltvNo;
	}
	
	if(refType != null && refType != ""){
		fieldFilters.fieldFilters['refType'] = refType;
	}
	
	if(action != null && action != ""){
		fieldFilters.fieldFilters['action'] = action;
	}
	
	if(refDocNo != null && refDocNo != ""){
		fieldFilters.fieldFilters['refDocNo'] = refDocNo;
	}
	
	if(sentThrough != null && sentThrough != ""){
		fieldFilters.fieldFilters['sentThrough'] = sentThrough;
	}
	
	if(action != "Acknowledge"){
		if(status != null && status != ""){
			fieldFilters.fieldFilters['status'] = status;
		}
	}	
	
	return fieldFilters;
}

var editLtAGridRow = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editLtAGridRow" style="margin-top:10px;" type="button" id='	+ row + ' onclick="viewLtvGridData('+ row+ ')"/><i class="fa fa fa-eye fa-sm"></i></button>'
}

// Location Transfer Ack Master Grid
var ltaMasterGrid = function() {	
	var updateRows = function(rowid, newdata, commit) {}
	
	var datafields = [ 
		{name : 'fromDate', type : 'string', map: 'createdDatee'}, 
		{name : 'ltvNo',	type : 'string', map: 'id'}, 
		{name : 'dcName', type : 'string', map: 'storeOrDcName'}, 
		{name : 'fromZoneCode',	type : 'string', map: 'fromZone'}, 
		{name : 'toZoneCode', type : 'string', map: 'toZoneName'}, 
		{name : 'toZoneId', type : 'string'},
		{name : 'refType',	type : 'long', map: 'referenceType'}, 
		{name : 'refDocNo',type : 'int', map: 'documentNo'}, 
		{name : 'status',type : 'date', map: 'status'}, 
		{name : 'transferedBy',type : 'int', map: 'transferdBy'}, 
		{name : 'actionId',type : 'string', map: 'id'}, 
		{name : 'selectionstatus',type : 'string'}];

	
	var columns = [ 
		{text : 'Date', datafield : 'fromDate',	width : '10%', cellsalign : 'center',align : 'center', columntype : 'datetimeinput', cellsformat : 'dd/MM/yyyy',sortable :true}, 
		{text : 'LTV No.',datafield : 'ltvNo',width : '10%', cellsalign : 'center',align : 'center',editable : false,sortable :true}, 
		{text : 'DC Name',datafield : 'dcName',width : '10%', cellsalign : 'left',align : 'center',	editable : false,sortable :false}, 
		{text : 'From Zone',datafield : 'fromZoneCode',	width : '10%', cellsalign : 'center',align : 'center',editable : false,sortable :true}, 
		{text : 'To Zone',	datafield : 'toZoneCode',width : '10%', cellsalign : 'center',align : 'center',	editable : false,sortable :true}, 
		{text : '',	datafield : 'toZoneId', hidden: true,  width : '10%', cellsalign : 'center',align : 'center',	editable : false}, 
		{text : 'Ref. Type',datafield : 'refType',	width : '10%', cellsalign : 'center',align : 'center',editable : false,sortable :true}, 
		{text : 'Ref. Doc. No',datafield : 'refDocNo',width : widthColrefDocNo, cellsalign : 'center',align : 'center',editable : false,sortable :true}, 
		{text : 'Status',datafield : 'status',width : '10%', cellsalign : 'center',align : 'center',editable : false,sortable :true},
		{text : 'Transfered By',datafield : 'transferedBy',width : '12%', cellsalign : 'center',align : 'center',editable : false,sortable :true},
		checkBoxColoumn,
		{text : '',datafield : 'actionId',width : '3%', cellsalign : 'center',align : 'center',editable : false, cellsrenderer : editLtAGridRow,}
	]
	
	showMyGrid(datafields, "/OrderExecution/api/v1/LtvListingForViewAndAck", "list", columns, validateMasterGrid(), updateRows, "");
	
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
       	autorowheight :true,
        autoheight :true,
        columnsheight: 80,
        theme: 'energyblue',
        columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}

// View in Modal Window
var viewLtvGridData = function(val){
	var rowData = $('#jqxgrid').jqxGrid('getrowdata', val);
	console.log(rowData);
	
	var params = {
			"id" : rowData.ltvNo,
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
	
	postJSON('/OrderExecution/api/v1/viewDetailsOfLTV', JSON.stringify(params), function(data) {
		var data = data.payload.detailsList;
		viewLTAItemsGrid(data);
	});
	
}



var viewLTAItemsGrid = function(data) {
	
	var source = {
		datafields : [ 
		{name : 'refDocSlNo', type : 'string', map: 'refDocSrlNo'}, 
		{name : 'stoneAccSlNo',	type : 'string', map: 'stoneOrAccSrlNo'}, 
		{name : 'location', type : 'string', map: 'location'}, 
		{name : 'mType',	type : 'string', map: 'materialType'}, 
		{name : 'segment', type : 'string', map: 'segment>description'}, 
		{name : 'jType',	type : 'long', map: 'jeweltype'}, 
		{name : 'artDesc',type : 'int', map: 'articleDesOrStoneSubcat'}, 
		{name : 'jewStoneAcPcs',type : 'int', map: 'jewOrStoneOrAccPcs'}, 
		{name : 'grossWt',type : 'string', map: 'grossOrStoneWt'}, 
		{name : 'netWt',type : 'string', map: 'netWt'}, 
		{name : 'purity',type : 'string', map: 'purity'}, 
		{name : 'uqc',type : 'string', map: 'uqc'}, 
		{name : 'remarks',type : 'string', map: 'reasonForLTV'}, 
		{name : 'transferDoneBy',type : 'string', map: 'transferdBy'}],
		localdata : data
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#viewLTAItemsGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : false,
		columnsheight : 70,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{text : 'Ref. Doc. Sl. No.', datafield : 'refDocSlNo',	width : '9%', cellsalign : 'center',align : 'center', cellsformat : 'dd/MM/yyyy'}, 
			{text : 'Stone/Acc Sl. No.',datafield : 'stoneAccSlNo',width : '9%', cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Loc',datafield : 'location',width : '5%', cellsalign : 'center',align : 'center',	editable : false}, 
			{text : 'M.Type',datafield : 'mType',	width : '5%', cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Segment',	datafield : 'segment',width : '5%', cellsalign : 'center',align : 'center',	editable : false,'cellsformat' : 'dd/MM/yyyy'}, 
			{text : 'J.Type',datafield : 'jType',	width : '7%', cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Article Desc. / Stone Sub Cat',datafield : 'artDesc',width : '12%', cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Jew/Stone/Acc Pcs',datafield : 'jewStoneAcPcs',width : '10%', cellsalign : 'center',align : 'center',editable : false},
			{text : 'Gross Wt.',datafield : 'grossWt',width : '5%', cellsalign : 'right',align : 'center',editable : false,'cellsformat':'d3'},
			{text : 'Net Wt.',datafield : 'netWt',width : '5%', cellsalign : 'right',align : 'center',editable : false,'cellsformat':'d3'},
			{text : 'Purity',datafield : 'purity',width : '7%', cellsalign : 'right',align : 'center',editable : false,'cellsformat':'d2'},
			{text : 'UQC',datafield : 'uqc',width : '7%', cellsalign : 'center',align : 'center',editable : false},
			{text : 'Remarks',datafield : 'remarks',width : '6%', cellsalign : 'left',align : 'center',editable : false},
			{text : 'Transfered By',datafield : 'transferDoneBy',width : '8%', cellsalign : 'center',align : 'center',editable : false}
		]
	});
}

// Ack LTV
$("#saveAckTA").on('click', function(){
	var rows = $("#jqxgrid").jqxGrid('getrows');
	var selectionTrueValueArr = [];
	if(typeof rows != "undefined"){
		for(var i=0; i<rows.length; i++){
			if(rows[i].selectionstatus == true){
				
				selectionTrueValueArr.push(rows[i].ltvNo);
			}
		}
		
		var ltvObj = {
				"toZone" : $("#toZone").val(),
				"ltvLineItems" : selectionTrueValueArr
		}
	}
	
	if(selectionTrueValueArr.length == 0){
		$.growl.error({
			message : "Please select at least one checkbox.",
			duration : 10000
		});
		return false;
	}else{
		postJSON('/OrderExecution/api/v1/acknowledgeOfLTVs', JSON.stringify(ltvObj), function(data) {
			if(data.resCode == 1){
				window.location.href="javascript:showContentPage('ltvListingAck', 'bodySwitcher')"
				$.growl.notice({
					message : data.payload.msg,
					duration : 10000,
					title : 'Success'
				});
				ltaMasterGrid();
			}
		});
	}
});

$("#clearTV").on('click', function(){
	var action = $("#action").val();
	var ltvType = $("#ltvType").val();
	var params = { "action" : action, "ltvType" : ltvType };
	
	postJSON('/OrderExecution/api/v1/getonLoadValuesForAckLTV', JSON.stringify(params), function(data) {
		if(data.resCode == 1){
			var storeOrDcId = data.payload.storeOrDc.id;
			var storeOrDcName = data.payload.storeOrDc.name;
			
			$("#dcName").val(storeOrDcName);
			$("#dcId").val(storeOrDcId);
		}
	});
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
})

/* Export for LTV Ack Using AlaSql */
$("#exportTA").on('click', function(){

	var count = 0;
	var data;
	var fromdate = $("#orderFromDate").val();
	var todate = $("#orderToDate").val();
	var dcId = $("#dcId").val();
	var fromZone = $("#fromZone").val();
	var toZone=$("#toZone").val();
	var ltvNo=$("#ltvNo").val();
    var refDocType=$("#refType").val();
    var refDocNp=$("#refDocNo").val();
    var status=$("#status").val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromdate != "" && fromdate != null) {
	     fieldFilters.fieldFilters["fromDate"] = fromdate;
	}
	if (todate != "" && todate != null) {
		fieldFilters.fieldFilters["toDate"] = todate;
	}
	if (dcId != "" && dcId != null) {
		fieldFilters.fieldFilters["storeOrDcCode"] = dcId;
	}
	if (fromZone != "" && fromZone != null) {
		fieldFilters.fieldFilters["fromZoneCode"] = fromZone;
	}
	if (toZone != "" && toZone != null) {
		fieldFilters.fieldFilters["toZoneCode"] = toZone;
	}	
	if ( ltvNo!= "" && ltvNo != null) {
		fieldFilters.fieldFilters["ltvNo"] = ltvNo;
	}
	if ( refDocType!= "" && refDocType != null) {
		fieldFilters.fieldFilters["refType"] = refDocType;
	}
	if ( refDocNp!= "" && refDocNp != null) {
		fieldFilters.fieldFilters["refDocNo"] = refDocNp;
	}
	if ( status!= "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	fieldFilters.fieldFilters["storeOrDcTypeCode"] = "DC";
	
	
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
			postJSON('/OrderExecution/api/v1/exportLTV',JSON.stringify(fieldFilters),function(response) {
				if (response != null) {
					data = response.payload.list;
					console.log(data);
					exportLTVSideBySide(data);
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

function exportLTVSideBySide(data)
{

	var sql0 = 'SEARCH / AS @ltvh \
		RETURN ( \
		 @ltvh->createdDatee AS [Date], \
		 @ltvh->id AS [LTVNo], \
		 @ltvh->storeOrDcName AS [DC Name], \
		 @ltvh->fromZone AS [From Zone], \
		 @ltvh->toZoneName AS [To Zone], \
		 @ltvh->referenceType  AS [RefType], \
		 @ltvh->documentNo AS [RefDocNo], \
	     @ltvh->transferdBy	 AS [Transfer Done By] \
		) \
	FROM $0';
	  // Query to get first child records (zonetozoneDetail)
	var sql1 = 'SEARCH / AS @ltvh\
		zonetozonedetaillist / AS @ltvhd \
			RETURN ( \
		           @ltvhd->tvId->id AS [LTVNo], \
		           @ltvhd->serialNumber AS [RefDocSrlNo], \
		           @ltvhd->stoneAccSerialNumber AS [Stone/Acc Srl No], \
		           @ltvhd->location AS [Location], \
                   @ltvhd->materialType AS [MaterialType], \
				   @ltvhd->segment->description AS [Segment], \
				   @ltvhd->jewelTypeDescription AS [JewelType ], \
				   @ltvhd->description AS [Article Description/Stone Subcategory], \
		           @ltvhd->pieces AS [JewPcs/StonePcs/AccPcs], \
				   @ltvhd->grossWeight AS [G.wt/Stone Wt.], \
		           @ltvhd->netWeight AS [N.Wt], \
		           @ltvhd->uom AS [UQC], \
		           @ltvhd->reasonForTransit AS [Reason for LTV] \
				) \
			FROM $0';

    var sql2 = 'SELECT * FROM ? AS m  OUTER JOIN ? AS a ON m.[LTVNo] = a.[LTVNo]';
   

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
    	res = alasql(sql2,[res0, res1]);
    	adjustObjectKeys(res); 
    	removeNullData(res);
    	res = alasql("SELECT * INTO XLSX('LtvAckDC.xlsx',?) FROM ?",[mystyle, res]);
    }
    catch (err)
    {
    	alert(err.message);
    }




}