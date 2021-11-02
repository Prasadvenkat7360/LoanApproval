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

$("#clearAll").on("click", function() {
	$("#pendingOrdersResults").hide();
});
$('input:text:visible:first').focus();

var $orderType = $('#orderType');
var $orderStatus = $('#orderStatus');
var $storeCode = $('#storeCode');
$.getJSON('/OrderExecution/api/v1/orderLOV?page=pendingOrders', function(data) {

	$.each(data.payload.orderTypes, function(key, val) {
		if(val.id=='CU'||val.id=='DO'){
		$orderType.append('<option value="' + val.id + '">' + val.name
				+ '</option>');
		}
	});

	$.each(data.payload.oStatus, function(key, val) {
		$orderStatus.append('<option value="' + val.id + '">' + val.name
				+ '</option>');
	});

	$.each(data.payload.storeCodes, function(key, val) {
		$storeCode.append('<option value="' + val.id + '">' + val.name
				+ '</option>');
	});

	vendorList = data.payload.vCodeList;
	data = [];
	$.each(vendorList, function(key, value) {
		data.push({
			value : value.id,
			label : value.name
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

var $salesExecutive = $('#salesExecutive');
$("#storeCode").change(
		function() {
			var $storeCodeVal = $(this).val();
			$salesExecutive.find('option:gt(0)').remove();
			$.getJSON('/OrderExecution/api/v1/salesExecutiveLov?storeId='
					+ $storeCodeVal, function(data) {
				console.log(data);
				$.each(data.payload.employee, function(key, val) {
					$salesExecutive.append('<option value="' + val.hrmsId + '">'
							+ val.name + '</option>');
				});
			});
		});

function pendingOrderGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	var cellsrenderer = function (index, datafield, value, defaultvalue, column, rowdata) {
		var name = value;
		if(rowdata['custMidName'] != null) {
			name = name + ' ' + rowdata['custMidName'];
		}
		if(rowdata['custLastName'] != null) {
			name = name + ' ' + rowdata['custLastName'];
		}
			
        return  
        '<div style="margin-top:15%; margin-left:30%;">'
		+ name + '</div>';
    }
	var datafields = [ {
		'name' : 'id',
		'type' : 'long'

	}, {
		'name' : 'store.name',
		'map' : 'store>name',
		'type' : 'String'
	},  {
		'name' : 'custLastName',
		'map' : 'customer>lastName',
		'type' : 'string'
	}, {
		'name' : 'custMidName',
		'map' : 'customer>middleName',
		'type' : 'string'
	}, {
		'name' : 'customer.firstName',
		'map' : 'customer>firstName',
		'type' : 'string'
	}, {
		'name' : 'customer.id',
		'map' : 'customer>id',
		'type' : 'long'
	}, {
		'name' : 'address',
		'map' : 'customer>address>address1',
		'type' : 'string'
	}, {
		'name' : 'customer.mobileOne',
		'map' : 'customer>mobileOne',
		'type' : 'long'
	}, {
		'name' : 'customer.email',
		'map' : 'customer>email',
		'type' : 'string'
	}, {
		'name' : 'intimationMode',
		'type' : 'string'
	}, {
		'name' : 'deliveryAddress',
		'type' : 'string'
	}, {
		'name' : 'advance',
		'type' : 'double'
	}, {
		'name' : 'creditAccountGoldWeight',
		'type' : 'double'
	}, {
		'name' : 'unrealizedChequeDDAmount',
		'type' : 'double'
	}, {
		'name' : 'orderStatus',
		'map'	:'currentStatus',
		'type' : 'string'
	}, {
		'name' : 'intimationReqd',
		'type' : 'string'
	}, {
		'name' : 'oCreatedBy',
		'type' : 'string'
	} ];

	var columns = [

	{
		'text' : 'Order No.',
		'datafield' : 'id',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Store',
		'datafield' : 'store.name',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Cust. ID',
		'datafield' : 'customer.id',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	},  {
		'text' : 'Cust. Name',
		'datafield' : 'customer.firstName',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		cellsrenderer : cellsrenderer
	}, {
		'text' : 'Cust. Addr.',
		'datafield' : 'address',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Cust. Ph. No',
		'datafield' : 'customer.mobileOne',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Cust. Email',
		'datafield' : 'customer.email',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Order Intimation Mode',
		'datafield' : 'intimationMode',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Delivery Addr.',
		'datafield' : 'deliveryAddress',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Total Adv',
		'datafield' : 'advance',
		'width' : '7%',
		sortable : false,
		editable : false,
		cellsformat : 'd2',
		cellsalign : 'right',

	}, {
		'text' : 'Credit to Acc. Wt.',
		'datafield' : 'creditAccountGoldWeight',
		'width' : '8%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Unrealised Amnt.',
		'datafield' : 'unrealizedChequeDDAmount',
		'width' : '5%',
		sortable : false,
		editable : false,
		cellsformat : 'd2',
		align : 'center',
		cellsalign : 'right',
	}, {
		'text' : 'Order Status',
		'datafield' : 'orderStatus',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Intimation Required',
		'datafield' : 'intimationReqd',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'SE Name',
		'datafield' : 'oCreatedBy',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	} ];
	showMyGrid(datafields, "/OrderExecution/api/v1/orders?from=oe&&export=",
			"list", columns, orderFilterValues(), updateRows, "id");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	 columnsheight: 70,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		rowdetails : true,
		virtualmode : true
	});
}

function orderFilterValues() {
	fieldFilters = {
		"fieldFilters" : {}
	};
	var orderFromDate = $('#orderFromDate').val();
	var orderToDate = $('#orderToDate').val();
	var orderType = $('#orderType').val();
	var orderId = $('#orderNo').val();
	var orderStatus = $("#orderStatus").val();
	var storeCode = $('#storeCode').val();
	var salesExecutive = $('#salesExecutive').val();
	var customerId = $("#customerId").val();
	var customerContactNumber = $('#customerContactNumber').val();
	var customerEmail = $("#customerEmail").val();
	var customerName = $('#customerName').val();

	if (orderFromDate != "" && orderFromDate != null) {
		fieldFilters.fieldFilters["orderFromDate"] = orderFromDate;
	}
	if (orderToDate != "" && orderToDate != null) {
		fieldFilters.fieldFilters["orderToDate"] = orderToDate;
	}
	if (orderType != "" && orderType != null) {
		fieldFilters.fieldFilters["orderType"] = orderType;
	}
	if (orderId != "" && orderId != null) {
		fieldFilters.fieldFilters["orderId"] = orderId;
	}
	if (orderStatus != "" && orderStatus != null) {
		fieldFilters.fieldFilters["orderStatus"] = orderStatus;
	}
	if (salesExecutive != "" && salesExecutive != null) {
		fieldFilters.fieldFilters["salesExecutive"] = salesExecutive;
	}
	if (customerId != "" && customerId != null) {
		fieldFilters.fieldFilters["customerId"] = customerId;
	}
	if (customerContactNumber != "" && customerContactNumber != null) {
		fieldFilters.fieldFilters["customerContactNumber"] = customerContactNumber;
	}
	if (customerEmail != "" && customerEmail != null) {
		fieldFilters.fieldFilters["customerEmail"] = customerEmail;
	}
	if (customerName != "" && customerName != null) {
		fieldFilters.fieldFilters["customerName"] = customerName;
	}
	if (storeCode != "" && storeCode != null) {
		fieldFilters.fieldFilters["storeCode"] = storeCode;
	}
	return fieldFilters;

}

$("#export").on('click', function(){
	var data;
	var newData = [];
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	
	postJSON('/OrderExecution/api/v1/orders?from=oe&export=export',JSON.stringify(orderFilterValues()),function(response) {
             data = response.payload.list;
             for (i = 0; i < data.length; i++) {
            	 
            	if(data[i].customer.firstName != null){
            		var firstName = data[i].customer.firstName;
            	 }else{
            		var firstName = "";
            	 }
            	 
            	if(data[i].customer.middleName != null){
            		var middleName = data[i].customer.middleName;
            	 }else{
            		var middleName = "";
            	 }
            	 
            	 
            	if(data[i].customer.lastName != null){
            		var lastName = data[i].customer.lastName;
            	 }else{
            		var lastName = "";
            	 }
            	 
            	if(data[i].customer.address.address1 != null){
            		var address1 = data[i].customer.address.address1;
            	 }else{
            		var address1 = "";
            	 }
            	 
            	 if(data[i].customer.address.address2 != null){
             		var address2 = data[i].customer.address.address2;
             	 }else{
             		var address2 = "";
             	 }
            	 
            	 if(data[i].customer.address.address3 != null){
             		var address3 = data[i].customer.address.address3;
             	 }else{
             		var address3 = "";
             	 }
            	newData.push({
					'Order No' : (data[i].id != null) ? data[i].id : "",
					'Store' : (data[i].store != null) ? data[i].store.name : "",
					'Cust Id' : (data[i].customer != null) ? data[i].customer.id : "",		
					'Cust Name' : (data[i].customer!= null) ? firstName + " " +  middleName + " " + lastName : "",
					'Cust Addr.' : (data[i].customer != null) ? address1 + ", " + address2 +", "+ address3 : "",
					'Cust. Ph. No.' : (data[i].customer != null) ? data[i].mobileOne : "",
					'Cust Email' : (data[i].customer != null) ? data[i].customer.email : "",
					'Order Intimation Mode' : (data[i].intimationMode != null) ? data[i].intimationMode : "",		
					'Delivery Addr.' : (data[i].deliveryAddress != null) ? data[i].deliveryAddress : "",	
					'Total Adv' : (data[i].advance != null) ? data[i].advance : "",
					'Credit to Acc. Wt.' : (data[i].creditAccountGoldWeight != null) ? data[i].creditAccountGoldWeight : "",
					'Unrealised Amnt.' : (data[i].unrealizedChequeDDAmount!= null) ? data[i].unrealizedChequeDDAmount  : "",		
					'Order Status' : (data[i].currentStatus!= null) ? data[i].currentStatus  : "",
					'Intimation Required' : (data[i].intimationReqd != null) ? data[i].intimationReqd : "",
					'SE Name' : (data[i].oCreatedBy != null) ? data[i].oCreatedBy : ""								
                 });
						
             }
             var opts = [{sheetid:'Order_Followup_Query',header:true}];
             var res = alasql('SELECT * INTO XLSX("Order_Followup_Query_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
	});
});
