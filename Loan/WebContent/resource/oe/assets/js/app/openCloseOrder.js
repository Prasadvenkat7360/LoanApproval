//<!-- 
//	##	Author1         : 	Dipankar
//	## 	Author2 	    :   B.maniprasad
//	##	Date Creation 	: 	10-04-2017
//	## 	Description		:	Search and export functionality for Open?close Orders.
// -->

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

$.getJSON('/OrderExecution/api/v1/openClosedOrdersLOV', function(data) {
	$('#customerStoreNameS').empty().append(
			'<option value="" selected>--Select--</option>');

	$('#customerDcNameS').empty().append(
			'<option value="" selected>--Select--</option>');


	$('#orderHeaderStatus').empty().append(
			'<option value="" selected>--Select--</option>');

	$('#customerLineItemStatusS').empty().append(
			'<option value="" selected>--Select--</option>');

	$('#customerOrderRaisedS').empty().append(
			'<option value="" selected>--Select--</option>');

	$.each(data.payload.stores, function(key, val) {
		$('#customerStoreNameS').append(
				'<option value="' + val.id + '">' + val.name + '</option>');
	});
	$.each(data.payload.dcList, function(key, val) {
		$('#customerDcNameS').append(
				'<option value="' + val.id + '">' + val.name + '</option>');
	});
	
	var vendorName = data.payload.vCodeList;
	var dataC =[];
	$.each(vendorName,function(key, val) {
	dataC.push({label:val.venSearchAndName, value:val.id});
	});
	$(function() {		
		$("#vendorCodeS").autocomplete({		
			
			source: dataC,
			focus: function(event, ui) {
				
				event.preventDefault();
				$(this).val(ui.item.label);
				
			},
			select: function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);					
				$("#vendorCodeS-value").val(ui.item.value);					
			}
		});
	});

	$.each(data.payload.empList, function(key, val) {
		$('#customerOrderRaisedS').append(
				'<option value="' + val.id + '">' + val.name + '</option>');
	});
		
	
	 $.each(data.payload.orderStatusList, function(key, val) {
	  $('#orderHeaderStatus').append( '<option value="' + val.id + '">' +
	  val.name + '</option>'); 
	  });
	 
	 	$.each(data.payload.itemStatusList, function(key, val) {
		  $('#customerLineItemStatusS').append( '<option value="' + val.id + '">' +
		  val.name + '</option>');
		  });

});

$("#customerOrderSearch").hide();
$("#stockOrderSearch").hide();
$("#consignmentOrderSearch").hide();

$('input[name=openClose]:radio').on('click', function() {
	var selectedVal = $(this).val();
	if (selectedVal == "customerOrder") {
		$("#customerOrderSearch").show();
		$("#stockOrderSearch").hide();
		$("#consignmentOrderSearch").hide();
		$("#gridTabStock").hide();
		$("#gridTabconsignment").hide();
		 $("form").each(function(){
			 $(this).validate();
		      $(this).validate().resetForm();
	    });
		 $("#gridTabs").tabs({
		 	disabled:[]
		 });
$("#messageBoxStock").hide();
	} else if (selectedVal == "stockOrder") {
		$("#customerOrderSearch").hide();
		$("#consignmentOrderSearch").hide();
		$("#stockOrderSearch").show();
		$("#gridTabconsignment").hide();
		$("#gridTabs").hide();
		 $("form").each(function(){
			 $(this).validate();
		      $(this).validate().resetForm();
	    });
		
		 	$("#messageBox").hide();
	} else if (selectedVal == "consignmentOrder") {
		$("#customerOrderSearch").hide();
		$("#consignmentOrderSearch").show();
		$("#stockOrderSearch").hide();
		$("#gridTabStock").hide();
		$("#stockOrderSearch").hide();
		$("#gridTabs").hide();
		$("#gridTabconsignment").hide();
		 $("form").each(function(){
			 $(this).validate();
		      $(this).validate().resetForm();
	    });
		 $("#messageBox").hide();
		 $("#messageBoxStock").hide();
	}
});

$("#gridTabs").hide();




var customerOrderFilters = function() {
	
	
	var orderNumber = $("#orderNumber").val();
	var customerStoreNameS = $("#customerStoreNameS").val();
	var customerDcNameS = $("#customerDcNameS").val();
	var vendorCodeS = $("#vendorCodeS-value").val();
	var customerPsrNumber = $("#customerPsrNumber").val();
	var orderHeaderStatus = $("#orderHeaderStatus").val();
	var customerLineItemStatusS = $("#customerLineItemStatusS").val();
	var customerOrderRaisedS = $("#customerOrderRaisedS").val();
	var  customeremailId = $("#emailId").val();
	var telephoneNumber = $("#telephoneNumber").val();
	var customerID = $("#customerID").val();
	var customerName = $("#customerName").val();

	fieldFilters = {
		"fieldFilters" : {}
	};
	fieldFilters.fieldFilters["orderType"] ="CU" ;
	
	if (orderNumber != "" && orderNumber != null) {
		fieldFilters.fieldFilters["orderId"] = orderNumber;
	}
	if (customerStoreNameS != "" && customerStoreNameS != null) {
		fieldFilters.fieldFilters["store"] = customerStoreNameS;
	}
	if (customerDcNameS != "" && customerDcNameS != null) {
		fieldFilters.fieldFilters["dc"] = customerDcNameS;
	}
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorCodeS;
	}
	if (customerPsrNumber != "" && customerPsrNumber != null) {
		fieldFilters.fieldFilters["psrNo"] = customerPsrNumber;
	}
	if (orderHeaderStatus != "" && orderHeaderStatus != null) {
		fieldFilters.fieldFilters["orderHeaderStatus"] = orderHeaderStatus;
	}
	if (customerLineItemStatusS != "" && customerLineItemStatusS != null) {
		fieldFilters.fieldFilters["lineItemStatus"] = customerLineItemStatusS;
	}
	if (customerOrderRaisedS != "" && customerOrderRaisedS != null) {
		fieldFilters.fieldFilters["orderRaisedBy"] = customerOrderRaisedS;
	}
	if (customeremailId != "" && customeremailId != null) {
		fieldFilters.fieldFilters["customerEmail"] = customeremailId;
	}
	if (telephoneNumber != "" && telephoneNumber != null) {
		fieldFilters.fieldFilters["customerContactNumber"] = telephoneNumber;
	}
	if (customerID != "" && customerID != null) {
		fieldFilters.fieldFilters["customerId"] = customerID;
	}
	if (customerName != "" && customerName != null) {
		fieldFilters.fieldFilters["customerName"] = customerName;
	}
	return fieldFilters;

}

var editFg = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"  data-target="#customerOrder" style="display: block; margin: auto;  margin-top:5px;" type="button" id='
			+ row
			+ ' onclick="customerOrderView('
			+ value
			+ ')" /><i class="fa fa-eye fa-sm"></i></button>';
}
//view design img
var designViewDetails = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"  data-target="#designView" style="display: block; margin: auto;  margin-top:5px;" type="button" id='
			+ row
			+ ' onclick="desginviewdetail('
			+ value
			+ ')" /><i class="fa fa-eye fa-sm"></i></button>';
	var img = '';
	$("#viewDetails").append(img);
}

var desginviewdetail = function(id){
	
	var img = "";
	$("#viewDetails").empty();
	postJSON('/OrderExecution/api/v1/getDesignVariations',JSON.stringify({'id':id}),function(response){		
		var data = response.payload.designVariations;		
		if(response.payload.designVariations != null ){
			for(i=0 ;i<=data.length;i++){
				if(typeof data[i] != "undefined"){
					img += "<div class='col-lg-6' id='image"+i+"' style='align=center;'><a href=/uf/"+data[i].fullFilePath+" class='thumbnail' target='_blank'><img  src=/uf/"+data[i].fullFilePath+" style=' margin-bottom:10px; width:200px;height:200px' 'alt'="+data[i].empName+"></a></div>"
				
				}
			}
			$("#viewDetails").html(img);
		}
	});

}

var customerOrderView = function(id) {

	$.getJSON('/OrderExecution/api/v1/getOpenCloseOrder?id='+id,function(data){
		var dataS = data.payload.order;
		var occasion = (dataS.occasion == null)? null :dataS.occasion.name ;
 		
		$("#customerOrderNo").val(dataS.id);
		$("#customerOrderOccasion").val(occasion);
		$("#customerOrderPrintName").val(dataS.printNameInBill.name);
		$("#customerItemNo").val(dataS.orderItemSize);
		$("#customerOccastiondate").val(dataS.occasionDate);
		$("#custmerDeliveryAddr").val(dataS.deliveryAddress.name);
		$("#customerOccasionRemark").val(dataS.occasionRemarks);
		$("#customerDate").val(dataS.createdDate);
		$("#customerOrderStaus").val(dataS.orderStatus);
		$("#customerOrderUnrealised").val(dataS.isAdvancedPayment);
		
		if(dataS.customer != null){
			$("#customerOrderCustId").val(dataS.customer.id);
			$("#customerNameView").val(dataS.customer.name);
			$("#customerAddress").val(dataS.customer.address.addres);
			$("#customerMobileNumber").val(dataS.customer.mobileNumbers);
			$("#customerOrderPanNo").val(dataS.customer.pancard);
		}
		
		$("#customerIntimation").val(dataS.intimationReqd.name);
		$("#customerIntimationMode").val(dataS.intimationMode.name);
		$("#customerAdvance").val(dataS.advance);
		$("#customerOrderCancellationR").val(dataS.orderClosedReason);
	});

}

$(".tabDisabled").addClass("tabDisabled1");
$("#gridTabs").tabs({
	disabled:[]
});

var dataArr = [];
$("#jqxgrid").bind('cellendedit', function (event,index) {
	var i =event.args.rowindex;
	    if (event.args.value) {
	      $("#jqxgrid").jqxGrid('selectrow', event.args.row);
	        dataArr.push(i);
	        $(".tabDisabled").removeClass("tabDisabled1");
	       
	   	    }
	    else {
	        $("#jqxgrid").jqxGrid('unselectrow', event.args.row);
	        
	        var delArr = dataArr.splice(i,1);
	    }
	    
	    if($("#jqxgrid").jqxGrid("getselectedrowindexes") <= 0)
		{
	    	$(".tabDisabled").addClass("tabDisabled1");
		}
	    $.each(dataArr, function(key, val) {
	    		var data =$("#jqxgrid").jqxGrid('getrowdata',val);
	    });
	    
	});
//common function for checked box 
function selectedCheckBox()
{
	var dataArr1 = [];
	var data1 = $("#jqxgrid").jqxGrid("getselectedrowindexes");
	$.each(data1, function(key, val) {
	dataArr1.push(val.orderID);

});
return dataArr1;
}

$("#orderDetails").click(function () {
	var OrderIdArray;
	var OrderIdArray= selectedCheckBox();
	var orderID;
	var orderID = OrderIdArray.join(",");
postJSON('/OrderExecution/api/v1/openClosedOrderItems',
		JSON.stringify(orderDetailFieldFilters(orderID)),
		function(response) {
	var data = response.payload.list;
	orderDetails(data);
	$('#jqxgride1').show();
});

});

//attribute Api
$("#attribureDetails").click(function(){
	var OrderIdArray;
	var OrderIdArray= selectedCheckBox();
	var orderID = OrderIdArray.join(",");
	postJSON('/OrderExecution/api/v1/openClosedOrderAttributeSearch',
			JSON.stringify(orderDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		attributeDetails(data);
		$('#jqxgride2').show();
	
	});
	
});

//Stone Details  
$("#StoneDetails").click(function(){
	
	var OrderIdArray= selectedCheckBox();
	var orderID = OrderIdArray.join(",");
	postJSON('/OrderExecution/api/v1/openCloseOrderStonesSearch',
			JSON.stringify(orderDetailFieldFilters(orderID)),
			function(response) {
		console.log(response);
		var data = response.payload.list;
		stoneDetails(data);
		$('#jqxgride3').show();
	
	});
	
});
//accessoryDetails

$("#accessoryDetails").click(function(){
	
	var OrderIdArray= selectedCheckBox();
	var orderID = OrderIdArray.join(",");
	postJSON('/OrderExecution/api/v1/openClosedAccessorySearch',
			JSON.stringify(orderDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		accessoryDetails(data);
		$('#jqxgride4').show();
	
	});
	
});


//design Details 
$("#designDetails").click(function(){
	
	var OrderIdArray= selectedCheckBox();
	var orderID = OrderIdArray.join(",");
	postJSON('/OrderExecution/api/v1/openCloseOrderDesignSearch',
			JSON.stringify(orderDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		designDetails(data);
		$("#jqxgride5").show();
	
	});
	
});
// credit to account search CreditToAccountRecieptDetsGrid

$("#CreditDetails").click(function(){
	
	var OrderIdArray= selectedCheckBox();
	var orderId = OrderIdArray.join(",");
	postJSON('/OrderExecution/api/v1/openCloseOrderCreditToAccSearch',
			JSON.stringify({"fieldFilters":{"orderId":orderId}}),
			function(response) {
		var data = response.payload.list;
		CreditToAccountRecieptDetsGrid(data);
		$("#jqxgride7").show();
	
	});
	
});


$("#creditToAccount").click(function(){	
	var OrderIdArray= selectedCheckBox();
	var orderId = OrderIdArray.join(",");
	postJSON('/OrderExecution/api/v1/openCloseOrderCreditToAccIssueSearch', JSON.stringify({"fieldFilters":{"orderId":orderId}}),function(response) {
		var data = response.payload.list;
		CreditToAccountIssueDetsGrid(data);
		$("#jqxgride6").show();
	
	});
	
});


$("#ReceiptDetails").click(function(){
	
	var OrderIdArray= selectedCheckBox();
	var orderId = OrderIdArray.join(",");
	postJSON('/OrderExecution/api/v1/openCloseOrderReciptSearch',
			JSON.stringify({"fieldFilters":{"orderId":orderId}}),
			function(response) {
		var data = response.payload.list;
		$("#jqxgridReceipt").show();
		receiptDetailsGird(data);
	});
	
});

$("#CertificationDetails").click(function(){
	
	var OrderIdArray= selectedCheckBox();
	var orderId = OrderIdArray.join(",");
	postJSON('/OrderExecution/api/v1/openClosedOrderCrtDetails',	JSON.stringify({"fieldFilters":{"orderId":orderId}}),function(response) {
		var data = response.payload.list;
		$("#jqxgridCert").show();
		certDetailsGird(data);
	});
	
});



$("#itemHistory").click(function(){
	
	var OrderIdArray= selectedCheckBox();
	var orderId = OrderIdArray.join(",");
	postJSON('/OrderExecution/api/v1/openClosedOrderItemHistory',
			JSON.stringify({"fieldFilters":{"orderId":orderId}}),
			function(response) {
		var data = response.payload.list;
		
		itemHistoryGird(data);
		$("#jqxgridItemHistory").show();
	});
	
});
function orderDetailFieldFilters(orderID)
{
	 
	var vendorCodeS = $("#vendorCodeS-value").val();
	var customerPsrNumber = $("#customerPsrNumber").val();
	var customerLineItemStatusS = $("#customerLineItemStatusS").val();
		
	fieldFilters = {
	"fieldFilters" : {}
	};
	if(orderID !="" && orderID != null)
	{
		fieldFilters.fieldFilters["orderId"] =orderID ;
	}

	
	
if (customerLineItemStatusS != "" && customerLineItemStatusS != null) {
fieldFilters.fieldFilters["lineItemStatus"] = customerLineItemStatusS;
}
if (customerPsrNumber != "" && customerPsrNumber != null) {
fieldFilters.fieldFilters["psrNo"] = customerPsrNumber;
}
if (vendorCodeS != "" && vendorCodeS != null) {
fieldFilters.fieldFilters["vendorCode"] = vendorCodeS;
}

return fieldFilters;

}


function customerOrder() {

	var updateRows = function(rowid, newdata, commit) {
		  commit(true);
	}

	var datafields = [ {
		'name' : 'orderStatus',
		'type' : 'string'

	}, {
		'name' : 'pancard',
		'type' : 'string',
		'map' : 'customer>pancard'

	}, {
		'name' : 'unrealized',
		'type' : 'string',
			'map':'unrealizedChequeDDAmounts'

	}, {
		'name' : 'primeNameInBill',
		'type' : 'string',
		'map' : 'printNameInBill>name'
	}, {
		'name' : 'intimationMode',
		'type' : 'string',
		'map' : 'intimationMode>name'

	}, {
		'name' : 'intimationReqd',
		'type' : 'string',
		'map' : 'intimationReqd>name'

	}, {
		'name' : 'firstName',
		'type' : 'string',
		'map' : 'customer>name'
	}, {
		'name' : 'middleName',
		'type' : 'string',
		'map' : 'customer>middleName'
	}, {
		'name' : 'lastName',
		'type' : 'string',
		'map' : 'customer>lastName'
	}, {
		'name' : 'custID',
		'type' : 'int',
		'map' : 'customer>id'
	}, {
		'name' : 'occasion',
		'type' : 'string',
		'map' : 'occasion>name'
	}, {
		'name' : 'occasionDate',
		'type' : 'date',
		'map' : 'occasionDate'
	}, {
		'name' : 'occasionRemarks',
		'type' : 'string',
		'map' : 'occasionRemarks'
	}, {
		'name' : 'address1',
		'type' : 'string',
		'map' : 'customer>address>addres'

	},{
		'name' : 'orderBlockReason',
		'type' : 'string'

	}, {
		'name' : 'deliveryAddress',
		'type' : 'string',
		'map' : 'deliveryAddress>id'

	}, {
		'name' : 'orderDate',
		'type' : 'date'

	}, {
		'name' : 'orderID',
		'type' : 'int',
		'map' : 'id'

	},{
		'name' : 'orderID2',
		'type' : 'id',
		'map' : 'id'

	},{
		'name' : 'id',
		'type' : 'int'

	} ];

	var columns = [ {
		'text' : '',
		'datafield' : '',
		cellsalign : 'center',
		columntype : 'checkbox',
		align : 'center',
		'width' : '5%',
		sortable : false
        
	}, {
		'text' : 'Order ID',
		'datafield' : 'id',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'PAN',
		'datafield' : 'pancard',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'd2',
		sortable : false,
		editable : false
	}, {
		'text' : 'Name ',
		'datafield' : 'firstName',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Address',
		'datafield' : 'address1',
		'width' : '30%',
		cellsalign : 'center',
		align : 'center',
		sortable :false,
		editable : false
	}, {
		'text' : 'Advance Unrealised',
		'datafield' : 'unrealized',
		'width' : '20%',
		cellsalign : 'right',
		align : 'center',
		'cellsformat' : 'd2',
		sortable :false,
		editable : false
	}, {
		'text' : '',
		'datafield' : 'orderID2',
		cellsrenderer : editFg,
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		sortable :false,
		editable : false
	} ];

	showMyGrid(datafields,"/OrderExecution/api/v1/openClosedOrders", "list",
			columns, customerOrderFilters(), updateRows);
	  var columnCheckBox = null;
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

function orderDetails(data) {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'storeDc',
		'type' : 'string',
		'map':'storeOrDc>name'

	}, {
		'name' : 'orderNo',
		'type' : 'int',
		'map':'orderNo'
	}, {
		'name' : 'slNo',
		'type' : 'int',
		'map':'serialNumber'

	}, {
		'name' : 'orderKind',
		'type' : 'string',
		'map': 'oKind>name'

	}, {
		'name' : 'stockNo',
		'type' : 'int',
		'map':'stockNumber'

	}, {
		'name' : 'precious',
		'type' : 'string',
		'map':'isPreciousMetal'

	}, {
		'name' : 'segmentType',
		'type' : 'string',
		'map': 'segId>description'

	}, {
		'name' : 'metalType',
		'type' : 'string',
		'map':'metalId>description'

	}, {
		'name' : 'jewelType',
		'type' : 'string',
		'map':'jewelType>description'

	}, {
		'name' : 'subCatgory',
		'type' : 'string',
		'map':'subCategory>name'

	}, {
		'name' : 'articleCode',
		'type' : 'string',
		'map':'articleMaster>name'

	}, {
		'name' : 'vendorCode',
		'type' : 'string',
		'map':'vendor>name'

	}, {
		'name' : 'psrNumber',
		'type' : 'string',
		'map':'psrNumber'

	},{
		'name' : 'linkedToSi',
		'type' : 'int',
		'map':'linkedTosln>id'

	},{
		'name' : 'pcs',
		'type' : 'string',
		'map':'expectedPieces'

	},{
		'name' : 'dueDateType',
		'type' : 'string',
		'map': 'dueDateType>name'

	},{
		'name' : 'dueDate',
		'type' : 'string',
		'map':'orderItemDueDate'

	},{
		'name' : 'seUser',
		'type' : 'string',
		'map':'salesExecutive>name'

	},{
		'name' : 'workOrderInst',
		'type' : 'string',
		'map':'jobWorkerInstruction'

	},{
		'name' : 'metalSellRate',
		'type' : 'double',
		'map':'metalSellingRate'
	},{
		'name' : 'estmationPrice',
		'type' : 'string',
		'map':'estimatedValue'
	},{
		'name' : 'fellowUpWithRemark',
		'type' : 'string',
		'map' : 'orderNo'

	} ];

	var columns = [ {
		'text' : 'Store /DC',
		'datafield' : 'storeDc',
		cellsalign : 'center',
		align : 'center',
		'width' : '10%',
		sortable : false,
		editable : false
	}, {
		'text' : 'Order No',
		'datafield' : 'orderNo',
		cellsalign : 'center',
		align : 'center',
		'width' : '4%',
		sortable : false,
		editable : false
	}, {
		'text' : 'Sl. No.',
		'datafield' : 'slNo',
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Order Kind',
		'datafield' : 'orderKind',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Stock No.',
		'datafield' : 'stockNo',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Is Precious Metal',
		'datafield' : 'precious',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Seg. Type',
		'datafield' : 'segmentType',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Metal Type',
		'datafield' : 'metalType',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Jewel Type',
		'datafield' : 'jewelType',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Sub Cat',
		'datafield' : 'subCatgory',
		'width' : '8%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Article Code ',
		'datafield' : 'articleCode',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'PSR No',
		'datafield' : 'psrNumber',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Linked To Sl.No',
		'datafield' : 'linkedToSi',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pcs.',
		'datafield' : 'pcs',
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	} , {
		'text' : 'Due Date Type',
		'datafield' : 'dueDateType',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Due Date',
		'datafield' : 'dueDate',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'SE User',
		'datafield' : 'seUser',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Work Order Instruction',
		'datafield' : 'workOrderInst',
		'width' : '8%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Metal Selling Rate',
		'datafield' : 'metalSellRate',
		'width' : '5%',
		cellsalign : 'right',
		align : 'center',
		'cellsformat' : 'd2',
		sortable : false,
		editable : false
	},{
		'text' : 'Est Price',
		'datafield' : 'estmationPrice',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		'cellsformat' : 'd2',
		sortable : false,
		editable : false
	},/*{
		'text' : 'Follow up with J/W Remarks ',
		'datafield' : 'fellowUpWithRemark',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}*/,{
		text : 'Follow up with Customer / J/W Remarks',
		datafield : 'fellowUpWithRemark',
		cellsrenderer : addRemarks,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '18%'
	}
	];

	addGrid(datafields, columns, updateRows, data,"", "#jqxgride1");

	$("#jqxgride1").jqxGrid({
		width : '100%',
		columnsheight: 80,
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : false,
		pageable:true
		
	});
}

//################### Add  Remarks ###################################
var addRemarks =  function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#customerRemarks" type="button" id=' 
	+ row
	+ ' onclick="addCustomerRemarks('
	+ value
	+ ')" ><i class="fa fa-plus fa-sm"></i> Cust Rem </button>&nbsp; <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#jwRemarks" type="button" id=' 
	+ row
	+ ' onclick="addJwRemarks('
	+ value
	+ ')" ><i class="fa fa-plus fa-sm"></i> JW Rem </button>'
}

//################### Add Customer Remarks ###################################
var oNo;
var addCustomerRemarks = function(id){
	var rows = $('#jqxgride1').jqxGrid('getrows');
	var ordSlNo;
	oNo = id;
	$.each(rows, function(key, val) {	
		 if(val.orderNo  == id){	
			 ordSlNo = val.slNo; 
		}
	});
	$.getJSON('/OrderExecution/api/v1/getOrderItemRemarks?type=CU'+"&orderNo="+id+"&orderSrlNo="+ordSlNo, function(data) {
		var response = data.payload.remarks;
		var variationRow = "";
		$.each(response, function(k, v) {
			variationRow += "<tr>";
			variationRow += "<td  height='45;' class='text-left' style='border-right:none;border-left:none;border-bottom:none;border-top:none;'>"+ v + "</td>";
			variationRow += "</tr>";
			
		});
		$("#designVariationDet").html(variationRow);
	});
}

$("#saveCustRem").on('click',function(){
	var rows = $('#jqxgride1').jqxGrid('getrows');
	var orderNoC = oNo.toString();
	var orderSlNo;
	$.each(rows, function(key, val) {	
		 if(val.orderNo  == oNo){	
			 orderSlNo = val.slNo; 
		}
	});
	var fieldFilters = {
			 "type":"CU",
			 "orderNo" : orderNoC,
			 "orderSrlNo" : orderSlNo,
			 "remarks" : $("#custRem").val()	 
			}
	if($("#custRem").val() != ""){
		postJSON('/OrderExecution/api/v1/saveOrderItemRemarks', JSON.stringify(fieldFilters), function(data) {
				if(data.resCode == "1"){
				//	$('#customerRemarks').modal('hide');
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					addCustomerRemarks(orderNoC);
					$("#custRem").val("");
				}
		});
	}
});


//################### Add Jw Remarks ###################################
var oNoJw;
var addJwRemarks = function(id){
	var rows = $('#jqxgride1').jqxGrid('getrows');
	var ordSlNoJw;
	oNoJw = id;
	$.each(rows, function(key, val) {	
		 if(val.orderNo  == id){	
			 ordSlNoJw = val.slNo; 
		}
	});
	$.getJSON('/OrderExecution/api/v1/getOrderItemRemarks?type=JW'+"&orderNo="+id+"&orderSrlNo="+ordSlNoJw, function(data) {
		var response = data.payload.remarks;
		var variationRow = "";
		$.each(response, function(k, v) {
			if(v != ""){
				variationRow += "<tr>";
				variationRow += "<td  height='45;' class='text-left' style='border-right:none;border-left:none;border-bottom:none;border-top:none;'>"+ v + "</td>";
				variationRow += "</tr>";
			}
			
		});
		$("#designVariationDetJw").html(variationRow);
	});
}


$("#saveJwtRem").on('click',function(){
	
	var rows = $('#jqxgride1').jqxGrid('getrows');
	var orderNoJw = oNoJw.toString();
	var orderSlNoJw;
	$.each(rows, function(key, val) {	
		 if(val.orderNo  == oNoJw){	
			 orderSlNoJw = val.slNo; 
		}
	});
	var fieldFilters = {
			 "type":"JW",
			 "orderNo" : orderNoJw,
			 "orderSrlNo" : orderSlNoJw,
			 "remarks" : $("#jwRem").val()	 
			}
	if($("#jwRem").val() != ""){
		postJSON('/OrderExecution/api/v1/saveOrderItemRemarks', JSON.stringify(fieldFilters), function(data) {
				if(data.resCode == "1"){
				//	$('#customerRemarks').modal('hide');
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					addJwRemarks(orderNoJw);
					$("#jwRem").val("");
				}
		});
	}
});

function attributeDetails(data) {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'slNo',
		'type' : 'string',
		'map':'serialNumber'

	}, {
		'name' : 'metalColor',
		'type' : 'string',
		'map':'metalColor>name'
	}, {
		'name' : 'skin',
		'type' : 'double',
		'map':'orderItemSkinPurity>skinPurity'

	}, {
		'name' : 'melting',
		'type' : 'double',
		'map':'orderItemMeltingPurity'

	}, {
		'name' : 'preRepairSkinPurity',
		'type' : 'double',
		'map':'preRepairSkinPurity>skinPurity'

	}, {
		'name' : 'preRepairMeltingPurity',
		'type' : 'double',
		'map':'preRepairMeltingPurity'

	}, {
		'name' : 'weightType',
		'type' : 'string',
		'map':'metalWeightType>name'

	}, {
		'name' : 'expectedFrom',
		'type' : 'double',
		'map':'expectedFromWeight'

	}, {
		'name' : 'expectedTo',
		'type' : 'double',
		'map':'expectedToWeight'

	}, {
		'name' : 'preRepairGross',
		'type' : 'double',
		'map':'preRepairGrossWeight'

	}, {
		'name' : 'preRepairNet',
		'type' : 'double',
		'map':'preRepairNetWeight'

	}, {
		'name' : 'finishedGross',
		'type' : 'double',
		'map':'finishedGrossWeight'

	}, {
		'name' : 'finishedNet',
		'type' : 'double',
		'map':'finishedNetWeight'

	}, {
		'name' : 'length',
		'type' : 'floot',
		'map': 'attributes>length>name'

	}, {
		'name' : 'size',
		'type' : 'double',
		'map':'attributes>size>id'

	}, {
		'name' : 'height',
		'type' : 'double',
		'map':'attributes>height>id'

	}, {
		'name' : 'diameter',
		'type' : 'double',
		'map':'attributes>diameter>id'
	}, {
		'name' : 'width',
		'type' : 'double',
		'map':'attributes>width>id'
	},{
		'name' : 'loopType',
		'type' : 'int',
		'map':'attributes>loopType>id'
	},{
		'name' : 'hookType',
		'type' : 'int',
		'map':'attributes>hookType>id'
	},{
		'name' : 'screwType',
		'type' : 'int',
		'map':'attributes>screwType>id'
	},{
		'name' : 'polishType',
		'type' : 'int',
		'map':'attributes>polishType>id'

	},{
		'name' : 'settingType',
		'type' : 'int',
		'map':'attributes>settingType>id'
	},{
		'name' : 'designReq',
		'type' : 'string',
		'map':'isDesignRequiredFlag'

	},{
		'name' : 'orderItemDescription',
		'type' : 'string',
		'map':'orderItemDescription'

	},{
		'name' : 'orderItemStatus',
		'type' : 'string',
		'map':'orderItemStatusType'

	} ];

	var columns = [ {
		'text' : 'Sl. No.',
		'datafield' : 'slNo',
		cellsalign : 'center',
		align : 'center',
		'width' : '3%',
		sortable : false,
		editable : false
	}, {
		'text' : 'Metal Color',
		'datafield' : 'metalColor',
		cellsalign : 'center',
		align : 'center',
		'width' : '6%',
		sortable : false,
		editable : false
	}, {
		'text' : 'Skin',
		'datafield' : 'skin',
		'width' : '5%',
		cellsformat:'d2',
		columngroup : "purity",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Melting',
		'datafield' : 'melting',
		'width' : '5%',
		cellsformat:'d2',
		columngroup : "purity",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pre Repair Skin Purity',
		'datafield' : 'preRepairSkinPurity',
		'width' : '6%',
		cellsformat:'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pre Repair Melting purity',
		'datafield' : 'preRepairMeltingPurity',
		'width' : '6%',
		cellsformat:'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Weight Type',
		'datafield' : 'weightType',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Exp From',
		'datafield' : 'expectedFrom',
		'width' : '6%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		columngroup : "weight",
		sortable : true,
		editable : false
	}, {
		'text' : 'Exp To',
		'datafield' : 'expectedTo',
		'width' : '6%',
		cellsformat:'d3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pre-Repair Gross',
		'datafield' : 'preRepairGross',
		'width' : '6%',
		cellsformat:'d3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pre-Repair Net',
		'datafield' : 'preRepairNet',
		'width' : '6%',
		cellsformat:'d3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Finished Gross',
		'datafield' : 'finishedGross',
		'width' : '6%',
		cellsformat:'d3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Finished Net',
		'datafield' : 'finishedNet',
		'width' : '8%',
		cellsformat:'d3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Length',
		'datafield' : 'length',
		'width' : '4%',
		cellsformat:'d2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Size',
		'datafield' : 'size',
		'width' : '4%',
		cellsformat:'d2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Height',
		'datafield' : 'height',
		'width' : '4%',
		cellsformat:'d2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Diameter',
		'datafield' : 'diameter',
		'width' : '4%',
		cellsformat:'d2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Width',
		'datafield' : 'width',
		'width' : '4%',
		cellsformat:'d2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Loop Type',
		'datafield' : 'loopType',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Hook Type',
		'datafield' : 'hookType',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Screw Type',
		'datafield' : 'screwType',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Polish Type',
		'datafield' : 'polishType',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Setting Type',
		'datafield' : 'settingType',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Design Req Y/N',
		'datafield' : 'designReq',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Order Item Desc',
		'datafield' : 'orderItemDescription',
		'width' : '8%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Order Item Status',
		'datafield' : 'orderItemStatus',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	} ];

	addGrid(datafields, columns, updateRows, data, "", "#jqxgride2");
	$("#jqxgride2").jqxGrid({
		width : '100%',
		columnsheight: 80,
        sortable: true,  
    	theme: 'energyblue',
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		pageable:true,
		virtualmode : false,
			columngroups : [ {
				text : 'Purity',
				name : 'purity',
				align : 'center'
			},{
				text : 'Weight',
				name : 'weight',
				align : 'center'
			} ]
		});
}

//Stone Details

function stoneDetails(data) {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'slNo',
		'type' : 'string',
		'map':'serialNumber'

	}, {
		'name' : 'linkedToSlNo',
		'type' : 'string',
		'map':'orderItemSlNo'
	}, {
		'name' : 'suppBy',
		'type' : 'string',
		'map':'suppliedBy>name'

	}, {
		'name' : 'subCateory',
		'type' : 'string',
		'map':'subCategoryDesc'

	}, {
		'name' : 'code',
		'type' : 'int',
		'map':'code>name'

	}, {
		'name' : 'weightRange',
		'type' : 'double',
		'map':'weightRange>name'
	}, {
		'name' : 'clarity',
		'type' : 'string',
		'map':'clarity>name'
	}, {
		'name' : 'actualColor',
		'type' : 'int',
		'map':'actualColor>name'

	}, {
		'name' : 'color',
		'type' : 'int',
		'map':'color>name'
	}, {
		'name' : 'cutGrade',
		'type' : 'int',
		'map':'cutGrade>name'
	}, {
		'name' : 'uom',
		'type' : 'int',
		'map':'uom'

	}, {
		'name' : 'pcs',
		'type' : 'int',
		'map':'pieces'
	}, {
		'name' : 'expectedWt',
		'type' : 'double',
		'map':'expectedWeight'
	}, {
		'name' : 'issuedPcs',
		'type' : 'int',
		'map':'issuedPcs'

	},, {
		'name' : 'issuedWt',
		'type' : 'double',
		'map':'issuedWeight'

	}, {
		'name' : 'issuedPcsUsed',
		'type' : 'int',
		'map':'stonePiecesUsed'

	}, {
		'name' : 'issuedWtUsed',
		'type' : 'double',
		'map':'stoneWeightsUsed'

	}, {
		'name' : 'bulkPcs',
		'type' : 'int',
		'map':'bulkUsedPcs'
	},{
		'name' : 'bulkWt',
		'type' : 'double',
		'map':'bulkUsedWt'

	},{
		'name' : 'stonePcsRetd',
		'type' : 'int',
		'map':'stoneRetPcs'

	},{
		'name' : 'stoneWtRetd',
		'type' : 'double',
		'map':'stoneRetWt'
	},{
		'name' : 'breakageReceivedPcs',
		'type' : 'int',
		'map':'stoneRetWastagePcs'

	},{
		'name' : 'breakageReceivedWt',
		'type' : 'double',
		'map':'stoneRetWastageWt'

	},{
		'name' : 'breakageLossNotReceivedPcs',
		'type' : 'int',
		'map':'stoneUnRetWastagePcs'
	},{
		'name' : 'breakageNotReceived',
		'type' : 'int',
		'map':'stoneUnRetWastageWt'

	},{
		'name' : 'RateHc',
		'type' : 'double',
		'map':'rate'

	},{
		'name' : 'price',
		'type' : 'double',
		'map':'rateOrHc'
	},{
		'name' : 'condition',
		'type' : 'int',
		'map' : 'condition>name'

	} ];

	var columns = [ {
		'text' : 'Sl. No.',
		'datafield' : 'slNo',
		cellsalign : 'center',
		align : 'center',
		'width' : '7%',
		sortable : false,
		editable : false
	}, {
		'text' : 'Linked To Sl. No',
		'datafield' : 'linkedToSlNo',
		cellsalign : 'center',
		align : 'center',
		'width' : '6%',
		sortable : false,
		editable : false
	}, {
		'text' : 'Supp by',
		'datafield' : 'suppBy',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Sub Cat/Shape',
		'datafield' : 'subCateory',
		'width' : '10%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Code',
		'datafield' : 'code',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Weight/Cost Range',
		'datafield' : 'weightRange',
		'width' : '7%',
		cellsformat:'d3',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Clarity',
		'datafield' : 'clarity',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Actual Color',
		'datafield' : 'actualColor',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Color',
		'datafield' : 'color',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Cut Grade',
		'datafield' : 'cutGrade',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'UQC',
		'datafield' : 'uom',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pcs',
		'datafield' : 'pcs',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Expected Wt.',
		'datafield' : 'expectedWt',
		'width' : '10%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Issued Pcs. ',
		'datafield' : 'issuedPcs',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Issued Wt.',
		'datafield' : 'issuedWt',
		'width' : '10%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Stone Pcs. Used',
		'datafield' : 'issuedPcsUsed',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Stone Wt. Used',
		'datafield' : 'issuedWtUsed',
		'width' : '10%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Bulk Pcs',
		'datafield' : 'bulkPcs',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false,
		hidden:true,
	},{
		'text' : 'Bulk Wt.',
		'datafield' : 'bulkWt',
		'width' : '10%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false,
		hidden:true,
	},{
		'text' : 'Stone Pcs. Retd',
		'datafield' : 'stonePcsRetd',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Stone wt. Retd',
		'datafield' : 'stoneWtRetd',
		'width' : '10%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Received Pcs.',
		'datafield' : 'breakageReceivedPcs',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Received Wt.',
		'datafield' : 'breakageReceivedWt',
		'width' : '10%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Loss Not Received Pcs ',
		'datafield' : 'breakageLossNotReceivedPcs',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Loss Not Received Wt. ',
		'datafield' : 'breakageNotReceived',
		'width' : '10%',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Rate/HC',
		'datafield' : 'RateHc',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat:'d2',
		sortable : false,
		editable : false
	},{
		'text' : 'Price',
		'datafield' : 'price',
		'width' : '10%',
		cellsformat:'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Condition',
		'datafield' : 'condition',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	} ];

	addGrid(datafields, columns, updateRows, data, "", "#jqxgride3");
	$("#jqxgride3").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		pageable:true,
		virtualmode : false
	});
}


//Accessory 

function accessoryDetails(data) {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'slNo',
		'type' : 'string',
		'map':'serialNumber'
	}, {
		'name' : 'linkedToSlNo',
		'type' : 'string',
		'map': 'orderItemSlNo'

	}, {
		'name' : 'suppBy',
		'type' : 'string',
		'map':'suppliedBy>name'

	}, {
		'name' : 'subCat',
		'type' : 'string',
		'map':'subCategory>name'
	}, {
		'name' : 'code',
		'type' : 'int',
		'map':'code>name'
	}, {
		'name' : 'uom',
		'type' : 'string',
		'map':'uom>name'
	}, {
		'name' : 'pcs',
		'type' : 'string',
		'map':'pieces'
	}, {
		'name' : 'expectedFrom',
		'type' : 'double',
		'map':'expectedWeight'

	}, {
		'name' : 'issuedPcs',
		'type' : 'int',
		'map':'issuedPcs'

	}, {
		'name' : 'issuedWt',
		'type' : 'double',
		'map':'issuedWeight'

	}, {
		'name' : 'stonePcsUsed',
		'type' : 'int',
		'map':'piecesUsed'

	}, {
		'name' : 'stoneWtUsed',
		'type' : 'double',
		'map':'weightsUsed'

	}, {
		'name' : 'stonePcsRetd',
		'type' : 'int',
		'map':'retPcs'
	

	}, {
		'name' : 'stoneWtRetd',
		'type' : 'double',
		'map':'retWt'
		
	}, {
		'name' : 'breakageReceivedPcs',
		'type' : 'int',
		'map':'retWastagePcs'

	}, {
		'name' : 'breakageReceivedWt',
		'type' : 'double',
		'map':'retWastageWt'

	}, {
		'name' : 'breakageLossNotReceivedPcs',
		'type' : 'int',
		'map':'unRetWastagePcs'
	}, {
		'name' : 'breakageNotReceived',
		'type' : 'double',
		'map':'unRetWastageWt'

	}, {
		'name' : 'rateHc',
		'type' : 'int',
		'map':'rateOrHc'
		
	},{
		'name' : 'price',
		'type' : 'double',
		'map':'price'

	},{
		'name' : 'condition',
		'type' : 'string',
		'map':'custStoneCondition>name'

	}];

	var columns = [ {
		'text' : 'Sl. No.',
		'datafield' : 'slNo',
		cellsalign : 'center',
		align : 'center',
		'width' : '7%',
		sortable : false,
		editable : false
	},{
		'text' : 'Linked To Sl.No',
		'datafield' : 'linkedToSlNo',
		cellsalign : 'center',
		align : 'center',
		'width' : '6%',
		sortable : false,
		editable : false
	},{
		'text' : 'Supp. By',
		'datafield' : 'suppBy',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Sub Cat',
		'datafield' : 'subCat',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Code',
		'datafield' : 'code',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'UQC',
		'datafield' : 'uom',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Pcs',
		'datafield' : 'pcs',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Expected Wt.',
		'datafield' : 'expectedFrom',
		'width' : '6%',
		cellsalign : 'right',
		cellsformat:'d3',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Issued Pcs.',
		'datafield' : 'issuedPcs',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Issued Wt.',
		'datafield' : 'issuedWt',
		'width' : '8%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Acc Pcs. Used',
		'datafield' : 'stonePcsUsed',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Acc Wt. Used',
		'datafield' : 'stoneWtUsed',
		'width' : '7%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Acc Pcs. Retd',
		'datafield' : 'stonePcsRetd',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Acc wt. Retd',
		'datafield' : 'stoneWtRetd',
		'width' : '7%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Received Pcs.',
		'datafield' : 'breakageReceivedPcs',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Received Wt.',
		'datafield' : 'breakageReceivedWt',
		'width' : '10%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Loss Not Received Pcs',
		'datafield' : 'breakageLossNotReceivedPcs',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Not received ',
		'datafield' : 'breakageNotReceived',
		'width' : '10%',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Rate/HC',
		'datafield' : 'rateHc',
		'width' : '10%',
		cellsalign : 'right',
		align : 'center',
		'cellsformat' : 'd2',
		sortable : false,
		editable : false
	},{
		'text' : 'Price',
		'datafield' : 'price',
		'width' : '10%',
		cellsformat:'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Condition',
		'datafield' : 'condition',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}];

	addGrid(datafields, columns, updateRows, data, "", "#jqxgride4");
	$("#jqxgride4").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		pageable:true,
		rowdetails : true,
		virtualmode : false		
	});
}

//CreditReceipt Details

function CreditToAccountRecieptDetsGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
	commit(true);
	}

	var datafield = [{
	'name':'slNo',
	'type':'string',
	'map':'serialNumber'
		
	},{
	'name':'refDocNo',
	'type':'string',
	'map':'refDocNo'
	},{
	'name':'refDocSlNo',
	'type':'id',
	'map':'refDocSl'
	},{
	'name':'metalType',
	'type':'string',
	'map':'segment>description'
	},{
	'name':'purity',
	'type':'double',
	'map':'xrfPurity'
	},{
	'name':'netWt',
	'type':'double',
	'map':'postProcessNetWeight'
	},{
	'name':'addDed',
	'type':'string',
	'map':'addDedu'
	},{
	'name':'addedDedPerc',
	'type':'int',
	'map':'addDeductPercentage'
	},{
	'name':'addDedWt',
	'type':'double',
	'map':'addDeductWeight'
	},{
	'name':'accWt',
	'type':'double',
	'map':'custCreditWeight'
	},{
	'name':'value',
	'type':'double',
	'map':'systemEstimatedValue'
	},{
	'name':'ecAmt',
	'type':'double',
	'map':'ecRate'
	},{
	'name':'rcAmt',
	'type':'double',
	'map':'rcRate'
	}];

	var columns = [ {
	'text':'Sl. No.',
	'dataField':'slNo',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Ref. Doc. No. ',
	'dataField':'refDocNo',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	 
	},{
	'text':'Ref. Doc. Sl.',
	'dataField':'refDocSlNo',
	'width':'9%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Metal Type',
	'dataField':'metalType',
	'width':'8%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	 
	},{
	'text':'Purity% ',
	'dataField':'purity',
	'width':'7%',
	cellsformat:'d2',
	cellsalign : 'right',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Post Process Net Wt.',
	'dataField':'netWt',
	'width':'7%',
	cellsformat:'d3',
	cellsalign : 'right',
	align : 'center',
	editable : false,
	sortable : false
	 
	},{
	'text':'Add/Ded',
	'dataField':'addDed',
	'width':'7%',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Add/Ded %',
	'dataField':'addedDedPerc',
	'width':'7%',
	cellsalign : 'right',
	align : 'center',
	editable : false,
	cellsformat:'d2',
	sortable : false
	},{
	'text':'Add/Ded Wt',
	'dataField':'addDedWt',
	'width':'7%',
	cellsformat:'d3',
	cellsalign : 'right',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Credit to A/c Wt',
	'dataField':'accWt',
	'width':'7%',
	cellsformat:'d3',
	cellsalign : 'right',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Value',
	'dataField':'value',
	'width':'7%',
	cellsalign : 'right',
	align : 'center',
	cellsformat:'d2',
	editable : false,
	sortable : false
	 
	},{
	'text':'EC Amt',
	'dataField':'ecAmt',
	'width':'7%',
	cellsformat:'d2',
	cellsalign : 'right',
	align : 'center',
	editable : false,
	sortable : false
	 
	},{
	'text':'RC Amt ',
	'dataField':'rcAmt',
	'width':'7%',
	cellsformat:'d2',
	cellsalign : 'right',
	align : 'center',
	editable : false,
	sortable : false
	}];
	addGrid(datafield, columns, updateRows, data, "", "#jqxgride7");
	$("#jqxgride7").jqxGrid({
			width : '100%',
	        sortable: true,            
	     	altrows: true,
	    	pageable:true,
	    	theme: 'energyblue',
	    	columnsresize: true, 
			rowsheight : 35,
			rowdetails : true,
			virtualmode : false
		});
	}


//Credit to account Issue details
function CreditToAccountIssueDetsGrid(data) {
	
	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafield = [{
	'name':'slNo',
	'type':'string',
	'map' : 'serialNumber'
	},{
	'name':'refDocNo',
	'type':'string',
	'map' : 'refDocNo'
	},{
	'name':'refDocSlNo',
	'type':'id',
	'map' : 'refDocSl'
	},{
	'name':'metalType',
	'type':'string',
	'map' : 'materialType>id'
	},{
	'name':'purity',
	'type':'double',
	'map' : 'xrfPurity'
	},{
	'name':'netWt',
	'type':'string',
	'map': 'postProcessNetWeight'
	 
	}];

	var columns = [ {
	'text':'Sl. No.',
	'dataField':'slNo',
	'width':'15%',
	cellsalign : 'center',
	align : 'center',
	sortable : false
	},{
	'text':'Ref. Doc. No. ',
	'dataField':'refDocNo',
	'width':'15%',
	cellsalign : 'center',
	align : 'center',
	sortable : false
	 
	},{
	'text':'Ref. Doc. Sl.',
	'dataField':'refDocSlNo',
	'width':'15%',
	cellsalign : 'center',
	align : 'center',
	sortable : false
	},{
	'text':'Metal Type',
	'dataField':'metalType',
	'width':'15%',
	cellsalign : 'center',
	align : 'center',
	sortable : false
	 
	},{
	'text':'Purity% ',
	'dataField':'purity',
	'width':'20%',
	cellsformat:'d2',
	cellsalign : 'right',
	align : 'center',
	sortable : false
	},{
	'text':'Post Process Net Wt.',
	'dataField':'netWt',
	'width':'20%',
	cellsalign : 'right',
	align : 'center',
	cellsformat:'d3',
	sortable : false
	}];
	addGrid(datafield, columns, updateRows, data, "", "#jqxgride6");
	$("#jqxgride6").jqxGrid({
			width : '100%',
	        sortable: true,            
	     	altrows: true,
	     	theme: 'energyblue',
	    	columnsresize: true, 
			rowsheight : 35,
			rowdetails : true,
			virtualmode : false		
		});
	}



//Design Details
function designDetails(data) {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [{
	'name':'slNo',
	'type':'string',
		'map':'SlNo'
	},{
	'name':'linkedToSlNo',
	'type':'string',
	'map':'linkedSlNo'
	},{
	'name':'designDueDate',
	'type':'date',
	'map':'dueDate'
	},{
	'name':'designStatus',
	'type':'date',
	'map':'designStatus>name'
	},{
	'name':'designStatusDate',
	'type':'string',
	'map':'statusDate'
	},{
	'name':'designBy',
	'type':'string',
	'map':'approvedDesignVariation>designer>empName'
		
	},{
	'name':'designerName',
	'type':'string',
	'map':'designerName>name'
	},{
	'name':'designsReq',
	'type':'int',
	'map':'numberOfVariations'
	},{
	'name':'catalogueRefNo',
	'type':'string',
	'map':'catalogueRefNumber'
	},{
	'name':'designDes',
	'type':'string',
	'map':'designInstruction'
	},{
	'name':'empDesgnAppvl',
	'type':'string',
	'map':'isEmpApprovalReqd'
	},{
	'name':'custApproval',
	'type':'string',
	'map':'isCustApprovalReqd'
		
	},{
	'name':'custAppDate',
	'type':'date',
	'map':'custApprovalDueDate'
		
	},{
	'name':'designIntimationMode',
	'type':'string',
	'map':'intimationMode>id'
	},{
	'name':'designId',
	'type':'int',
	'map':'id'
		
	},{
	'name':'viewDesign',
	'type':'string',
	'map':'id'
	 
	}];

	var columns = [ {
	'text':'Sl. No.',
	'dataField':'slNo',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false,
	hidden:true
	},{
	'text':'Sl. No. ',
	'dataField':'linkedToSlNo',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	 
	},{
	'text':'Design Due Date',
	'dataField':'designDueDate',
	'width':'10%',
	'cellsformat' : 'dd/MM/yyyy',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Design Status',
	'dataField':'designStatus',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	 
	},{
	'text':'Design Status Date ',
	'dataField':'designStatusDate',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Design By',
	'dataField':'designBy',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	 
	},{
	'text':'Designer Name',
	'dataField':'designerName',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'No of Designs Required',
	'dataField':'designsReq',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Catalogue Page Reference No',
	'dataField':'catalogueRefNo',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Design Instructions',
	'dataField':'designDes',
	'width':'10%',
	cellsalign : 'left',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Emp. to Approve Design',
	'dataField':'empDesgnAppvl',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	 
	},{
	'text':'Cust. Approval-Due Date',
	'dataField':'custApproval',
	'width':'15%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	 
	},{
	'text':'Cust Approved Date ',
	'dataField':'custAppDate',
	'width':'10%',
	'cellsformat' : 'dd/MM/yyyy',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Design Intimation Mode',
	'dataField':'designIntimationMode',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Design ID',
	'dataField':'designId',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false

	},{
	'text':'View Design ',
	'dataField':'viewDesign',
	'width':'10%',
	cellsrenderer : designViewDetails,
		cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false

	} ];
	
	addGrid(datafields, columns, updateRows, data,"", "#jqxgride5");
	$("#jqxgride5").jqxGrid({
			width : '100%',
	        sortable: true,            
	     	altrows: true,
	     	theme: 'energyblue',
	    	columnsresize: true, 
			rowsheight : 35,
			rowdetails : true,
			pageable:true,
			virtualmode : false
		});
	}

//receipt Details 

var receiptDetailsGird = function(data){
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	
var datafields = [ {
	'name':'receiptVoucherNo',
	'type':'string',
	'map':'id'
	},{
	'name':'date',
	'type':'string',
	'map':'createdDate'
	},{
	'name':'slNo',
	'type':'id',
	'map':'serialNoForUi'
	},{
	'name':'transactionDate',
	'type':'string',
	'map':'createdDate'
	},{
	'name':'documentType',
	'type':'string',
	'map':'docType'
	},{
	'name':'documentDetails',
	'type':'string',
		'map':'referenceDocNo'
	},{
	'name':'totalValue',
	'type':'double',
	'map':'amount'
	},{
		'name':'OrderRateConfirmations',
		'type':'array'
	},{
		'name':'payments',
		'type':'array'
	}];
var  columns = [{ 
		text: 'Sl.No.',
		datafield: 'slNo',
		width: '15%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		},{ 
		 text: 'Receipt Voucher No', 
		 datafield: 'receiptVoucherNo', 
		 width: '20%',
		 editable : false,
		 cellsalign : 'center',
		align : 'center'
	 	},{ 
		text: 'Date',
		datafield: 'date', 
		width: '15%',
		editable : false,
		'cellsformat' : 'dd/MM/yyyy',
		cellsalign : 'center',
		align : 'center'
		 },{
		 text: 'Transaction Date',
		 datafield: 'transactionDate', 
		 width: '15%',
		 'cellsformat' : 'dd/MM/yyyy',
		 editable : false,
		 cellsalign : 'center',
		align : 'center'
		 },{ 
		 text: 'Document type',
		 datafield: 'documentType',
		 width: '10%',
		 editable : false,
		 cellsalign : 'center',
		 align : 'center'
		 },{ 
		 text: 'Doc Details',
		 datafield: 'documentDetails',
		 width: '10%',
		 editable : false,
		 cellsalign : 'center',
		 align : 'center'
		 },{
		 text: 'Total Value in Rs',
		 datafield: 'totalValue', 
		 width: '15%',
		 editable : false,
		 cellsformat:'d2',
		 cellsalign : 'right',
		 align : 'center'
		 }];
addGrid(datafields, columns, updateRows, data, "", "#jqxgridReceipt");
$("#jqxgridReceipt").jqxGrid({
	width : '100%',
    sortable: true,            
 	altrows: true,
	columnsresize: true, 
	rowsheight : 35,
	rowdetails : true,
	theme: 'energyblue',
	pageable:true,
	virtualmode : false
});
}

var viewCertImage = function(row){
	var viewDesign = $('#jqxgridCert').jqxGrid('getcellvalue', row, 'view');
	var viewDesignList = [];
	 viewDesignList = viewDesign.list;
	$('#pagination-demo').twbsPagination({
	    totalPages: viewDesign.size,
	    visiblePages: "5",
	    onPageClick: function (event, page) {
	    		$.each(viewDesignList, function(k, v){
	    			if((page-1) == k){
	    				console.log(v);
	    				var img =  "<a href='/uf/"+v.id+"' target='_blank'><img src='/uf/"+v.id+"' height='60%' width ='60%' /></a>";
	    				$('#page-content').html(img);
	    			}
	    		});
	    }
	});
}

//Edit view design
var orderItemDesignRenderer = function(row, column, value) {
	var image =  $("#jqxgridCert").jqxGrid("getcellvalue", row , 'view');
	if( image.size > 0 && typeof image != "undefined"){
		return '<div class="text-center"><a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#certViewDet" type="button" onclick="viewCertImage('+ row + ')"/><span class="fa fa-eye"></span> </a></div>';		
	}else{
		return '<div class="text-center"><button style="margin-top: 3px;" disabled class="btn btn-sm btn-primary" disabled data-toggle="modal" type="button" /><i class="fa fa-eye fa-lg"></i></button></div>';
	}
		
}

// Certificate grid
var certDetailsGird = function(data){
	var updateRows = function(rowid, newdata, commit) { commit; }
	
var datafields = [ 
	//{'name':'slNo','type':'int','map':'serialNumber'},
	{'name':'orderNo','type':'int','map':'orderNo'},
	{'name':'stoneSlNo','type':'int','map':'serialNumber'},
	{'name':'stoneSubCatDesc','type':'string','map':'subCatDesc'},
	{'name':'certNo','type':'int','map':'certificateNo'},
	//{'name':'actionId','type':'string','map':'id'},
	{'name':'view','type':'array'}
];
var  columns = [
	//{text: 'Sl.No.',datafield: 'slNo',width: '25%',editable : false,cellsalign : 'center',align : 'center'},
	{text: 'Order No.',datafield: 'orderNo',width: '23%',editable : false,cellsalign : 'center',align : 'center'},
	{text: 'Stone Sl.No.',datafield: 'stoneSlNo',width: '23%',editable : false,cellsalign : 'center',align : 'center'},
	{text: 'Stone Sub Cat. Desc.',datafield: 'stoneSubCatDesc',width: '26%',editable : false,cellsalign : 'center',align : 'center'},
	{text: 'Cert. No.',datafield: 'certNo',width: '23%',editable : false,cellsalign : 'center',align : 'center'},
	{text: '',datafield: 'view',width: '5%',editable : false,cellsalign : 'center',align : 'center', cellsrenderer: orderItemDesignRenderer},
	//{text: '',datafield: 'image',width: '15%',editable : false,cellsalign : 'center',align : 'center', hidden: true}
];

addGrid(datafields, columns, updateRows, data, "", "#jqxgridCert");

$("#jqxgridCert").jqxGrid({
	width : '100%',
    sortable: true,            
 	altrows: true,
	columnsresize: true, 
	rowsheight : 35,
	rowdetails : true,
	theme: 'energyblue',
	pageable:true,
	virtualmode : false
});
}


var initrowdetails = function (index, parentElement, gridElement, record) {
	var id = record.uid.toString();
	var grid = $($(parentElement).children()[0]);
	var grid2 = $($(parentElement).children()[1]);
	var paymentList= record.payments;
	var paymentData = paymentList.pop();
	
	console.log(paymentList);
	console.log(paymentData);

	if(paymentData == null){
		paymentData = [];
		
	}
	else{
		grid.before('<br/><h4><u>Payment Details</u></h4>');
	}
	var orderRateData = record.OrderRateConfirmations;
console.log(orderRateData);
	if(orderRateData == null){
		orderRateData = [];
	}
	else{
		grid2.before('<br/><h4><u>Metal Type</u></h4>');
	}
	
	var inlineSource3 = {
			datafields : [ {
					 name : 'paymentMode',
					 type : 'string',
					 'map':'id'
					},{ 
						name: 'amountTotal',
						type:'int',
						'map':'name'
						
					} ],
				id : 'id',
				localdata : paymentList,
				datatype : 'json'
	
	};
	
	
	var inlineSourceMetal = {
			datafields : [
				{
					 name : 'metalPurity',
					 type : 'string',
					 'map':'skinPurity'
					 
					},{ 
						name: 'metalRate',
						type:'double',
						'map':'sellingRate'
					},{
						name: 'confirmedYN',
						type:'string',
						'map':'isConfirmed'
					},{
						name: 'confirmedWt',
						type:'double',
						'map':'confirmedWeight'
					}],
					id:'id',
					localdata : orderRateData,
					datatype : 'json'
				
	}
	
	if (paymentData.length != 0) {
		grid.jqxGrid({
			source : inlineSource3,
			width : "99%",
			height : 150,
			columnsheight:30,
			
			enabletooltips : true,
			columnsresize : true,
			columns: [{ 
	    		 text: 'Payment Modes', 
	    		 datafield: 'paymentMode', 
	    		 width: '50%',
	    		 cellsalign: 'center', 
	    		 sortable : false,
	    		 align: 'center',
	    		 aggregatesrenderer: function() {        		 
		  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Total : </b></span>';
					}
	    	 },{ 
	    		text: 'Amount',
	    		datafield: 'amountTotal', 
	    		width: '50%',
	    		cellsformat:'d2',
	    		sortable : false,
    		    cellsalign: 'right', 
    		    align: 'center',
    		    aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['amountTotal'] == null) ? 0 : record['amountTotal'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
			    		  	}
			  	  }
	    	 }],
	    	 showaggregates : true,
			 showstatusbar : true,
		});
		
		}
	
	
	
	
	if (orderRateData.length != 0) {
		grid2.jqxGrid({
			source : inlineSourceMetal,
			width : "99%",
			height : 150,
			theme: 'energyblue',
			columnsheight:30,
			enabletooltips : true,
			columnsresize : true,
			  columns: [
				  { 
				 		 text: 'Metal Purity', 
				 		 datafield: 'metalPurity', 
				 		 width: '25%',
				 		'cellsformat' : 'd2',
				 		 cellsalign: 'right',
			    		 align: 'center'
				 	 },{ 
				 		text: 'Metal Rate',
				 		datafield: 'metalRate', 
				 		width: '25%',
				 		 cellsalign: 'right',
				 		cellsformat:'d2',
			    		 align: 'center'
				 	 },{ 
				 		text: 'Confirmed Yes/No',
				 		datafield: 'confirmedYN',
				 		width: '25%',
				 		 cellsalign: 'center',
			    		 align: 'center'
				 	 },{ 
				 		text: 'Confirmed Wt(gms)',
				 		datafield: 'confirmedWt',
				 		width: '25%',
				 		cellsformat:'d3',
				 		 cellsalign: 'right',
			    		 align: 'center'
				 	}],
					 showaggregates : true,
					 showstatusbar : true,
		});
		}

}

$("#jqxgridReceipt").jqxGrid({
	
	virtualmode : false,
	rowdetails : true,
	theme: 'energyblue',
	initrowdetails : initrowdetails,
	rowdetailstemplate : {
		rowdetails : "<div id='grid1' style='margin-bottom: 40px; margin-top: 10px;'></div><div id='grid2' style='margin-bottom: 40px; margin-top: 10px;'></div>",
		rowdetailsheight : 500,
		rowdetailshidden : true
		
	}

});


//Item History Details

function itemHistoryGird(data) {
	var updateRows = function(rowid, newdata, commit) {
	commit(true);
	}

	var datafield = [{
	'name':'orderNo',
	'type':'int',
	'map':'orderNo'
		
	},{
	'name':'slNo',
	'type':'int',
	'map':'orderSrlNo'
		
	},{
	'name':'psrNo',
	'type':'int',
	'map':'psrNumber'
	},{
	'name':'vendorCode',
	'type':'string',
	'map':'articleCode'
	},{
	'name':'grNo',
	'type':'int',
	'map':'grNo'
	},{
	'name':'grSlNo',
	'type':'int',
	'map':'serialNumber'
	},{
	'name':'grGrWt',
	'type':'float',
	'map':'grossWeight'
	},{
	'name':'grNetWt',
	'type':'float',
	'map':'netWeight'
	},{
	'name':'pcs',
	'type':'int',
	'map':'recieptPieces'
	},{
	'name':'sellingMc',
	'type':'float',
	'map':'sellingMCTotalCost'
	},{
	'name':'sellingWastage',
	'type':'float',
	'map':'sellingWastageWT'
	}];

	var columns = [ {
	'text':'Order No',
	'dataField':'orderNo',
	'width':'9%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Sl No',
	'dataField':'slNo',
	'width':'9%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'PSR No',
	'dataField':'psrNo',
	'width':'9%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	 
	},{
	'text':'Vendor code',
	'dataField':'vendorCode',
	'width':'9%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'GR No.',
	'dataField':'grNo',
	'width':'9%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	 
	},{
	'text':'GR Srl. No',
	'dataField':'grSlNo',
	'width':'9%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'GR Gross wt',
	'dataField':'grGrWt',
	'width':'9%',
	cellsformat:'d3',
	cellsalign : 'right',
	align : 'center',
	editable : false,
	sortable : false
	 
	},{
	'text':'GR Net wt',
	'dataField':'grNetWt',
	'width':'9%',
	align : 'center',
	cellsalign : 'right',
	editable : false,
	cellsformat:'d3',
	sortable : false
	},{
	'text':'Pcs',
	'dataField':'pcs',
	'width':'9%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Selling MC',
	'dataField':'sellingMc',
	'width':'9%',
	cellsformat:'d2',
	cellsalign : 'right',
	align : 'center',
	editable : false,
	sortable : false
	},{
	'text':'Selling Wastage',
	'dataField':'sellingWastage',
	'width':'10%',
	cellsformat:'d3',
	cellsalign : 'right',
	align : 'center',
	editable : false,
	sortable : false
	}];
	addGrid(datafield, columns, updateRows, data, "", "#jqxgridItemHistory");
	$("#jqxgridItemHistory").jqxGrid({
			width : '100%',
	        sortable: true,            
	     	altrows: true,
	    	pageable:true,
	    	theme: 'energyblue',
	    	columnsresize: true, 
			rowsheight : 35,
			rowdetails : true,
			virtualmode : false
		});
	}

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};
//Customer Oder
$("#customerSearch").on('click',function() {

	
    $('#jqxgrid').jqxGrid('clearselection');
   // $('#jqxgrid').jqxGrid('selectrow', row);
	$("#jqxgrid").hide();
	$("#gridTabs").hide();
	activaTab('tab0default');
			var orderNumber  = $("#orderNumber").val();
			var customerStoreNameS  = $("#customerStoreNameS").val();
			var customerDcNameS = $("#customerDcNameS").val();
			var vendorCodeS = $("#vendorCodeS").val();
			var customerPsrNumber = $("#customerPsrNumber").val();
			var orderHeaderStatus = $("#orderHeaderStatus").val();
			var customerLineItemStatusS = $("#customerLineItemStatusS").val();
			var customerOrderRaisedS = $("#customerOrderRaisedS").val();
			var customerID = $("#customerID").val();
			var customerName = $("#customerName").val();
			var telephoneNumber = $("#telephoneNumber").val();
			var emailId = $("#emailId").val();
			if (orderNumber != "" || customerStoreNameS != ""
					|| customerDcNameS != "" 
					|| vendorCodeS != "" || customerPsrNumber !="" || orderHeaderStatus !="" || customerLineItemStatusS !="" || customerOrderRaisedS !="" || customerID !="" || customerName !="" || telephoneNumber !="" || emailId !="") {
			}
			else
				{
				$.growl.error({
					message :"Please fill atleast one Field",
					duration : 10000,

				});
					return false;
				}

		});


// Customer Order
$('#customerOrderSearch').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
	"orderNumber":{number:true },
	
	 "customerPsrNumber":{number:true},
	 "telephoneNumber":{number:true},
	 "customerID":{number:true},
	 "telephoneNumber":{number:true},
	 "emailId":{email:true},
	},
	messages:
	{
		"orderNumber":
		{
		number:"Please enter valid Order Number"
		},
		"consignmentPsrNumberS":
		{
		number:"Please enter valid PSR Number"
		},
		"customerID":
		{number: "Please enter valid Customer Number" },
		"telephoneNumber":{number:"Please enter valid Telephone number"},
	},
	submitHandler : function(form) {
		$('#navTabsCust .tabDisabled').removeClass("ui-tabs-active ui-state-active active");
		$(".tabDisabled").addClass("tabDisabled1");
		/*$("#home").addClass("ui-tabs-active ui-state-active active")*/
		customerOrder();
		$("#jqxgrid").show();
		$("#gridTabs").show();


		return false;
	}
});


$("#clearCustomer").on('click',function(){
	$("#gridTabs").hide();
	//$("form").trigger("reset");
	$("#jqxgrid").jqxGrid("clearSelection");
	
	 activaTab('tab0default');
	
	//window.location.href= "javascript:showContentPage('openCloseOrder', 'bodySwitcher')";
	 
});

