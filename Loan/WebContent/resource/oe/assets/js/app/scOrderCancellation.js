var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	$(".layout-main button").each(function() {
		var value = '#'+this.id;
		var value2 = '#'+this.id+'C';
		var value3 = '#'+this.id+'S';
		var val = $(value).text();
		val = val.trim();
		if( val == "search" || val == "Search"){
			if(permission.canSearch == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}  
		
		if(val=="Create" || val=="create"){
			if(permission.canAdd == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if( val == "export" || val == "Export"){
			if(permission.canExport == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val == "print" || val == "Print"){
			if(permission.canPrint == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val == "delete" || val == "Delete"){
			if(permission.canDelete == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
	});
}

//loadPermission();

var d = new Date();
var cancelDate = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear() ;

$('input[name=orderItem]:radio').on('click', function() {
	var selectedVal = $(this).val();
	if (selectedVal == "orderItem") {
        $("#jqxgridD").jqxGrid('selectallrows');

		// $('#jqxgridD').jqxGrid('clearselection');
	} else if (selectedVal == "lineItem") {
		 $('#jqxgridD').jqxGrid('clearselection');
	}
});

$("#stockOrderCancellationSection").hide();
var stockId;
var cancelFlag = false;
var cancelSO = function(id){
	stockId = id;
	$("#searchScOrderSection").hide();
	$("#stockOrderCancellationSection").show();
	$("#jqxgrid").hide();
	$("#headerScOrder").show();
	$("#cretaeHeader").hide();
	$("#editHeader").hide();
	$("#cancelHeader").show();
	$.getJSON('/OrderExecution/api/v1/getDesignOrder?id='+id ,function(data) {
		var headerData = data.payload.customerOrder;
		var employeeDetails = data.payload.employeeDetails;
		var detailData = headerData.orderItems;
		$("#orderNo").val(headerData.orderNo);
		$("#date").val(headerData.orderDate);
		$("#cancelStatus").val(headerData.orderStatus);
		$("#cancelledOn").val(cancelDate);
		$("#advancePaid").val(headerData.advance);
		$("#advance").val((headerData.isAdvancedPayment == false)? 'NO': 'YES');
		$("#unrealizedAmt").val(headerData.unrealizedChequeDDAmount);
		$("#cancelledBy").val(employeeDetails.name);
		stockOrderCancelGrid(detailData);
		
		if(cancelFlag == true){
			window.location.href="javascript:showContentPage('scOrders', 'bodySwitcher')"
		}
		
	});
}

//Stock Order Cancellation Grid
var stockOrderCancelGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'id', type : 'int','map':'id'}, 
			{name : 'stSrlNo', type : 'int'}, 
			{name : 'slNo', type : 'int','map' : 'serialNumber'},
			{name: 'orderKind', type: 'string','map':'oKind>name'},
			{name: 'stockNo', type: 'string','map':'stockNumber'},
			{name : 'preciousMetal', type : 'string','map':'isPreciousMetal'},
			{name : 'status', type : 'string','map' : 'orderItemStatusType'},
			{name : 'segType', type : 'string','map': 'segId>description'},
			{name : 'metalType', type : 'string','map' : 'metalId>description'},
			{name : 'jewType', type : 'string','map': 'jewelType>description'},
			{name : 'subCat', type : 'string','map' : 'subCategory>description'},
			{name : 'articleCode', type : 'string','map' :'articleMaster>name'},
			{name : 'vendCode', type : 'string','map' :'vendor>name'},
			{name : 'linkedToSlNo', type : 'int','map' : 'linkedTosln>id'},
			{name : 'pcs', type : 'int','map':'finishedPieces'},
			{name : 'dueDateType', type : 'string','map' : 'dueDateType>name'},
			{name : 'dueDate', type : 'string','map' :'orderItemDueDate'},
			{name : 'seUser', type : 'string','map' :'salesExecutive>name'},
			{name : 'workOrderInst', type : 'string','map' : 'jobWorkerInstruction'},
			{name : 'metalSellingRate', type : 'float','map' :'metalSellingRate'},
			{name : 'estimatedPrice', type : 'float','map' : 'sellingPrice'},
			{'name' : 'selectionStatus','type' : 'bool'},
			{name : 'orderItemStatusType', type : 'string'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridD").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		columnsheight : 80,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		selectionmode : 'checkbox',
		columns : [ 
			{ text : '', datafield : 'id', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden:true},
			{ text : 'Sl No', datafield : 'slNo', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Order Kind', datafield : 'orderKind', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock No', datafield : 'stockNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Is Precious Metal', datafield : 'preciousMetal', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Status', datafield : 'status', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Seg Type', datafield : 'segType', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Type', datafield : 'metalType', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Jewel Type', datafield : 'jewType', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat', datafield : 'subCat', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Article Code', datafield : 'articleCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Vendor Code', datafield : 'vendCode', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Linked To Sl No', datafield : 'linkedToSlNo', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pcs', datafield : 'pcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
			{ text : 'Due-Date Type', datafield : 'dueDateType', width : '4.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Due Date', datafield : 'dueDate', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'SE User', datafield : 'seUser', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Work Order Instruction', datafield : 'workOrderInst', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Selling Rate', datafield : 'metalSellingRate', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'Estimated Price', datafield : 'estimatedPrice', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			
			{text : '',sortable : false,hidden: true,datafield : 'selectionStatus',columntype : 'checkbox',width : '5%',cellsalign : 'center',align:'center',filterable: false,
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue) {
					if (newvalue) {$("#jqxgridD").jqxGrid('selectrow', row, 'selectionStatus', true);}
					else {$("#jqxgridD").jqxGrid('unselectrow', row, 'selectionStatus', false);}
				}
			}, 
			{ text : '', datafield : 'orderItemStatusType', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false,hidden : true},
			]
	});
}

var orderId = [];
$("#stockOrderCancel").on('click',function(){
	var selectedOption = $("input:radio[name=orderItem]:checked").val();
	console.log(selectedOption);
	if(typeof selectedOption == "undefined"){
		$.growl.error({
			message  : "Please Select Order/Line Item !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	else if(selectedOption == "lineItem"){
		 var selectedRows = $("#jqxgridD").jqxGrid('selectedrowindexes');
			if(selectedRows.length == 0){
				$.growl.error({
					message : "Please Select Item to be Cancelled !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
			if(selectedRows.length > 1){
				$.growl.error({
					message : "Please Select one line Item to be Cancelled !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		 for(var i=0; i<selectedRows.length; i++){
			 $("#jqxgridD").jqxGrid('setcellvalue', selectedRows[i], 'selectionStatus', true);
		 }
		  orderId = [];
		 var rows = $("#jqxgridD").jqxGrid('getrows');
		 for(var i = 0; i<rows.length; i++){
			if(rows[i].selectionStatus == true){
				 if(rows[i].status == "C" || rows[i].status == "CC"){
					 $.growl.error({
						 message : "Order Item Already Cancelled !!",
						 duration : 1000,
						 title : 'Error'
					 });
					 return false;
				 }else if(rows[i].status == "Q"){
					 $.growl.error({
						 message : "Order Item Already "+ rows[i].orderItemStatusType + " Please Do Material Return !!" ,
						 duration : 1000,
						 title : 'Error'
					 });
					 return false;
				 }else{
					 orderId.push(rows[i].id);
				 }
			}
		} 
	 }else if(selectedOption == "orderItem"){
		if($("#cancelStatus").val() == "Req. Cancel"){
			$.growl.error({
				message : "Order Item Already " + $("#cancelStatus").val() + " Please do Material Return !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	 }else{
		 
	 }

});

$("#cancelSO").on('click',function(){
	 if($("#reason").val() == ""){
		 $.growl.error({
			message : 'Please Enter Cancellation Reason !!!',
			duration : 10000,
			title : 'Error'
		 });
		 return false;
	 }else{
		 var selectedOptionS = $("input:radio[name=orderItem]:checked").val();
		 if(selectedOptionS == "lineItem"){
			 $.getJSON('/OrderExecution/api/v1/cancelStockOrder?orderItemId='+orderId+"&reason="+$("#reason").val() ,function(data) {
				 if(data.resCode == 1){
					 $.growl.notice({
						 message : data.mesgStr,
						 duration : 2500,
						 title : 'Success'
					 });
					 $('#cancelStockOrder').modal('hide');
					 $('#jqxgridD').jqxGrid('clearselection');
					 cancelSO(stockId);
				 }else{
					 $.growl.error({
						 message : data.mesgStr,
						 duration : 3000,
						 title :'error'
					 });
					 return false;
				 }
			 }); 
		 }
		 else if(selectedOptionS == "orderItem"){
			 $.getJSON('/OrderExecution/api/v1/cancelStockOrderHeader?orderId='+$("#orderNo").val()+"&reason="+$("#reason").val() ,function(data) {
				 if(data.resCode == 1){
					 cancelFlag = true;
					 $.growl.notice({
						 message : data.mesgStr,
						 duration : 2500,
						 title : 'Success'
					 });
					 $('#cancelStockOrder').modal('hide');
					 cancelSO($("#orderNo").val());
					 $("#stockOrderCancel").attr('disabled',true);
					
				 }else{
					 $.growl.error({
						 message : data.mesgStr,
						 duration : 3000,
						 title :'error'
					 });
					 return false;
				 }
			 }); 
		 }else{}
	 }
});
