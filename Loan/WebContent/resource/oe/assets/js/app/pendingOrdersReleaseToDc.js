/**
 * ## AUTHOR : POOJA 
 *  ## DATE : 20-06-2017 
 *  ## DESCRIPTION : SCRIPT TO SEARCH PENDING ORDERS 
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

// Lov for the Store Name
$('#storeName').empty().append('<option value="" selected>--Select--</option>');
$.getJSON('/OrderExecution/api/v1/StoreHeadPendingOrderDetailsStoreListLOV',function(data) {
	var val = data.payload.stores;
	$.each(val, function(key, val){
		$('#storeName').append('<option value="' + val.id + '">'+ val.name + '</option>');
		});
});

var PendingOrderfeildFilters = function(){	
	var storeName = $('#storeName').val();
	
	var fieldFilters = {
			"fieldFilters" : {							
			}
		};
	if (storeName != "" && storeName != null) {
		fieldFilters.fieldFilters["storeCode"] = storeName;
	}	
	fieldFilters.fieldFilters["storeHeadConfirmedCode"]= "0";
	
	return fieldFilters;
}

// Search Functionality
function pendingOrderGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	};
	        var  datafields=
	        [
	            { name: 'createdDate',    type: 'date', map:'createdDate'},
		        { name: 'orderNo',    type: 'int'},
		        { name: 'OrderSlNo',  type: 'int', map:'serialNumber'},
		        { name: 'orderKind', type: 'string', map:'oKind>description'},
	            { name: 'artDesp',    type: 'string', map:'articleMaster>description' },
	            { name: 'estVal',  type: 'string', map:'estimatedValue'},
	            { name: 'dateType', type: 'string', map:'dueDateType>description'},
	            { name: 'createdBy',    type: 'string', map:'orderCreatedBy'},
	            { name: 'SuperVisorName',  type: 'string', map:'supervisor>name'},
	            { name: 'dueDate', type: 'date', map:'orderItemDueDate'},
	            { name: 'jwlType',    type: 'string', map:'jewelType>description'},
	            { name: 'zoneName',  type: 'string', map:'createdZone>description'},
	            { name: 'pendingDays', type: 'string', map:'pendingDays'}	           
	        ];

	       var columns =
	       [
	    	    { text: 'Order Created Date', datafield: 'createdDate', width: "7%", cellsalign : 'center', align:'center',cellsformat : 'dd/MM/yyyy',sortable : true} ,
                { text: 'Order No',     datafield: 'orderNo',    width: "7%", cellsalign : 'center', align:'center', sortable : true},
                { text: 'Order Sl.No',   datafield: 'OrderSlNo',  width: "7%", cellsalign : 'center',sortable : false,  align:'center' },
                { text: 'Order Kind', datafield: 'orderKind', width: "7%", cellsalign : 'center',sortable : false, align:'center' },
                { text: 'Order Jewel Type',     datafield: 'jwlType',    width: "10%", cellsalign : 'center',sortable : false, align:'center' },
                { text: 'Article Desc',datafield: 'artDesp',    width: "9%", cellsalign : 'center',sortable : false, align:'center' },
                { text: 'Est Val',     datafield: 'estVal',     width: "7%", cellsalign : 'right',sortable : false, align:'center' },
                { text: 'Order Item Due Date Type', datafield: 'dateType', width: "7%", cellsalign : 'center',sortable : false, align:'center' },
                { text: 'Order Item Due Date',cellsformat : 'dd/MM/yyyy', datafield: 'dueDate',    width: "7%",sortable : false, cellsalign : 'center', align:'center' },
                { text: 'Order Created By',   datafield: 'createdBy',  width: "8%", cellsalign : 'center',sortable : false, align:'center' },
                { text: 'Order Supervisor Name', datafield: 'SuperVisorName', width: "10%", cellsalign : 'center',sortable : false, align:'center' } ,
                { text: 'Order Created Zone Name',     datafield: 'zoneName',    width: "7%", cellsalign : 'center',sortable : false, align:'center' },
                { text: 'No. Days Pending',   datafield: 'pendingDays',  width: "7%", cellsalign : 'center', sortable : false,align:'center' },
                
           ];

	showMyGrid(datafields, "/OrderExecution/api/v1/StoreHeadPendingOrderDetailsList",
			"list", columns,PendingOrderfeildFilters() , updateRows, "");
	       
	$("#jqxgrid").jqxGrid(
		    {
		        width: '100%',
		        rowdetails : true,
				sortable : true,
				editable : false,
				columnsResize : true,
		        showstatusbar: true,
		        statusbarheight: 25,
		        height: 200,
		    	theme: 'energyblue',
		        altrows: true,
		        columnsResize: true,
		        showaggregates: true,
		    });
}
$('#clearAll').on("click",function(){
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('pendingOrdersReleaseToDc', 'bodySwitcher')";
});

// Export Functionality
$("#exportSA").on("click",function() {
	var data;
	var newData = [];
    var storeName = $('#storeName').val();
	
		var fieldFilters = {
				"fieldFilters" : {							
				}
			};
		if (storeName != "" && storeName != null) {
			fieldFilters.fieldFilters["storeCode"] = storeName;
		}	
		fieldFilters.fieldFilters["storeHeadConfirmedCode"]= "0";
		
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
	     postJSON('/OrderExecution/api/v1/StoreHeadPendingOrderDetailsExportList ',JSON.stringify(fieldFilters),function(response) {
	     if(response != null){
	     data = response.payload.list;
	     for (i = 0; i < data.length; i++) {
	     newData.push({
	        'Order Created Date ' : (data[i].createdDate != null) ? data[i].createdDate : "",
		    'Order No' : (data[i].orderNo != null) ? data[i].orderNo : "",
			'Order Sl.No' : (data[i].serialNumber!= null) ? data[i].serialNumber : "",
			'Order Kind ' : (data[i].oKind != null) ? data[i].oKind.description : "",
			'Order Jewel Type' : (data[i].jewelType != null) ? data[i].jewelType.description : "",
			'Article Desc' : (data[i].articleMaster != null) ? data[i].articleMaster.description : "",
			'Est Val' : (data[i].estimatedValue != null) ? data[i].estimatedValue : "",
			'Order Item Due Date Type' : (data[i].dueDateType!= null) ? data[i].dueDateType.description : "",
			'Order Item Due Date ' : (data[i].orderItemDueDate != null) ? data[i].orderItemDueDate : "",
			'Order Created By ' : (data[i].orderCreatedBy != null) ? data[i].orderCreatedBy : "",
			'Order Supervisor Name ' : (data[i].supervisor != null) ? data[i].supervisor.name : "",
			'Order Created Zone Name' : (data[i].createdZone != null) ? data[i].createdZone.description : "",
			'No. Days Pending' : (data[i].pendingDays != null) ? data[i].pendingDays : ""					
	   });
	}
	var opts = [{sheetid:'Pending_Order_Release_To_DC',header:true}];
	var res = alasql('SELECT * INTO XLSX("Pending_Order_Release_To_DC'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
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
$('#OrderItemSearch').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"storeName" : {
			required : true
		},				
	},
	submitHandler : function(form) {			
		pendingOrderGrid();
	   $("#jqxgrid").show();
	}			 
});