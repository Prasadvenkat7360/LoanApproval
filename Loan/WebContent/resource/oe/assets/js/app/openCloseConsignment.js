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

$("#gridTabconsignment").hide();


$.getJSON('/OrderExecution/api/v1/openClosedOrdersLOV', function(data) {
	$('#consignmentStoreNameS').empty().append(
			'<option value="" selected>--Select--</option>');

	$('#consignmentDcNameS').empty().append(
			'<option value="" selected>--Select--</option>');

	$('#consignmentOrderHeaderStatus').empty().append(
			'<option value="" selected>--Select--</option>');

	$('#consignmentLineItemStatusS').empty().append(
			'<option value="" selected>--Select--</option>');

	$('#consignmentOrderRaisedS').empty().append(
			'<option value="" selected>--Select--</option>');

	$.each(data.payload.stores, function(key, val) {
		$('#consignmentStoreNameS').append(
				'<option value="' + val.id + '">' + val.name + '</option>');
	});
	$.each(data.payload.dcList, function(key, val) {
		$('#consignmentDcNameS').append(
				'<option value="' + val.id + '">' + val.name + '</option>');
	});
	
		
	var vendorName = data.payload.vCodeList;
	var dataCon =[];
	$.each(vendorName,function(key, val) {
	dataCon.push({label:val.venSearchAndName, value:val.id});
	});
	$(function() {		
		$("#consignmentVendorCodeS").autocomplete({		
			
			source: dataCon,
			focus: function(event, ui) {
				
				event.preventDefault();
				$(this).val(ui.item.label);
				
			},
			select: function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);					
				$("#consignmentVendorCodeS-value").val(ui.item.value);					
			}
		});
	});	
	$.each(data.payload.empList, function(key, val) {
		$('#consignmentOrderRaisedS').append(
				'<option value="' + val.id + '">' + val.name + '</option>');
	});
		
	
	 $.each(data.payload.orderStatusList, function(key, val) {
	  $('#consignmentOrderHeaderStatus').append( '<option value="' + val.id + '">' +
	  val.name + '</option>'); 
	  });
	 
	 	$.each(data.payload.itemStatusList, function(key, val) {
		  $('#consignmentLineItemStatusS').append( '<option value="' + val.id + '">' +
		  val.name + '</option>');
		  });

});

//view design img
var designViewDetailsConsignment = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"  data-target="#designView" style="display: block; margin: auto;  margin-top:5px;" type="button" id='
			+ row
			+ ' onclick="desginviewdetailCon('
			+ value
			+ ')" /><span class="fa fa-binoculars"></span> View </button>';
}
	var desginviewdetailCon = function(id)
{
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


$("#consignmentSearch").on(
		'click',
		function() {
			 $('#gridTabconsignment').jqxGrid('clearselection');
			$("#gridTabconsignment").hide();
			activaTab('tab0consignment');
			var consignmentOrderNumberS = $("#consignmentOrderNumberS").val();
			var consignmentStoreNameS = $("#consignmentStoreNameS").val();
			var consignmentDcNameS = $("#consignmentDcNameS").val();
			var consignmentVendorCodeS = $("#consignmentVendorCodeS").val();
			var consignmentPsrNumberS = $("#consignmentPsrNumberS").val();
			var consignmentOrderHeaderStatus = $("#consignmentOrderHeaderStatus").val();
			var consignmentLineItemStatusS = $("#consignmentLineItemStatusS").val();
			var consignmentOrderRaisedS = $("#consignmentOrderRaisedS").val();
			console.log(consignmentOrderNumberS);
			if (consignmentOrderNumberS != "" || consignmentStoreNameS != ""
					|| consignmentDcNameS != "" 
					|| consignmentVendorCodeS != ""
					|| consignmentPsrNumberS != ""
					|| consignmentOrderHeaderStatus != ""
					|| consignmentLineItemStatusS != "" ||  consignmentOrderRaisedS != "" ) {
					
				
				
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

var consignmentOrderFilters = function() {
	var consignmentOrderNumberS = $("#consignmentOrderNumberS").val();
	var consignmentStoreNameS = $("#consignmentStoreNameS").val();
	var consignmentDcNameS = $("#consignmentDcNameS").val();
	var consignmentVendorCodeS = $("#consignmentVendorCodeS-value").val();
	var consignmentPsrNumberS = $("#consignmentPsrNumberS").val();
	var consignmentOrderHeaderStatus = $("#consignmentOrderHeaderStatus").val();
	var consignmentLineItemStatusS = $("#consignmentLineItemStatusS").val();
	var consignmentOrderRaisedS = $("#consignmentOrderRaisedS").val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	fieldFilters.fieldFilters["orderType"] ="CO" ;
	if (consignmentOrderNumberS != "" && consignmentOrderNumberS != null) {
		fieldFilters.fieldFilters["orderId"] = consignmentOrderNumberS;
	}
	if (consignmentStoreNameS != "" && consignmentStoreNameS != null) {
		fieldFilters.fieldFilters["store"] = consignmentStoreNameS;
	}
	if (consignmentDcNameS != "" && consignmentDcNameS != null) {
		fieldFilters.fieldFilters["dc"] = consignmentDcNameS;
	}
	if (consignmentVendorCodeS != "" && consignmentVendorCodeS != null) {
		fieldFilters.fieldFilters["vendorCode"] = consignmentVendorCodeS;
	}
	if (consignmentPsrNumberS != "" && consignmentPsrNumberS != null) {
		fieldFilters.fieldFilters["psrNo"] = consignmentPsrNumberS;
	}
	if (consignmentOrderHeaderStatus != "" && consignmentOrderHeaderStatus != null) {
		fieldFilters.fieldFilters["orderHeaderStatus"] = consignmentOrderHeaderStatus;
	}
	if (consignmentLineItemStatusS != "" && consignmentLineItemStatusS != null) {
		fieldFilters.fieldFilters["lineItemStatus"] = consignmentLineItemStatusS;
	}
	if (consignmentOrderRaisedS != "" && consignmentOrderRaisedS != null) {
		fieldFilters.fieldFilters["orderRaisedBy"] = consignmentOrderRaisedS;
	}
	
	return fieldFilters;

}

var editconsignment = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"  " data-target="#customerOrder" style="display: block; margin: auto;  margin-top:5px;" type="button" id='
			+ row
			+ ' onclick="customerOrderView('
			+ value
			+ ')" href="javascript:void(0);"/><span class="fa fa-eye fa-sm"></span></button>';
}

$(".consignmentTabDisabled").addClass("tabDisabled1");
$("#gridTabconsignment").tabs({
	disabled:[]
});

var consignmentArry =[];
$("#consignmentJqxgride").bind('cellendedit', function (event,index) {
	var i =event.args.rowindex;
	    if (event.args.value) {
	      $("#consignmentJqxgride").jqxGrid('selectrow', event.args.row);
	      consignmentArry.push(i);
	      $(".consignmentTabDisabled").removeClass("tabDisabled1");
	   	    }
	    else {
	        $("#consignmentJqxgride").jqxGrid('unselectrow', event.args.row);
	        
	        var delArr = consignmentArry.splice(i,1);
	    }
	    if($("#consignmentJqxgride").jqxGrid("getselectedrowindexes") <= 0)
		{
	    	$(".consignmentTabDisabled").addClass("tabDisabled1");
		}
	    
	    $.each(consignmentArry, function(key, val) {
	    		var dataStock =$("#consignmentJqxgride").jqxGrid('getrowdata',val);
	    });
	    
	});

function selectedConsignmentCheckBox()
{
	
	var dataArrConsignment = [];
	var data1 = $("#consignmentJqxgride").jqxGrid("getselectedrowindexes");

$.each(data1, function(key, val) {
	dataArrConsignment.push(val.orderID);

});
return dataArrConsignment;
}


function consignmentDetailFieldFilters(orderID)
{

	var consignmentVendorCodeS = $("#consignmentVendorCodeS-value").val();
	var consignmentPsrNumberS = $("#consignmentPsrNumberS").val();
	var consignmentLineItemStatusS = $("#consignmentLineItemStatusS").val();
		
	fieldFilters = {
	"fieldFilters" : {}
	};
	if(orderID !="" && orderID != null)
	{
		fieldFilters.fieldFilters["orderId"] =orderID ;
	}
	//fieldFilters.fieldFilters["orderType"] ="CO" ;
if (consignmentLineItemStatusS != "" && consignmentLineItemStatusS != null) {
fieldFilters.fieldFilters["lineItemStatus"] = consignmentLineItemStatusS;
}
if (consignmentPsrNumberS != "" && consignmentPsrNumberS != null) {
fieldFilters.fieldFilters["psrNo"] = consignmentPsrNumberS;
}
if (consignmentVendorCodeS != "" && consignmentVendorCodeS != null) {
fieldFilters.fieldFilters["vendorCode"] = consignmentVendorCodeS;
}

return fieldFilters;

}
//Order Details 
$("#consignmentOrderDetails").on("click",function(){
	
	var data = selectedConsignmentCheckBox();
	var orderID = data.join(",");
	postJSON('/OrderExecution/api/v1/openClosedOrderItems',
			JSON.stringify(consignmentDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		consignmentOrderDetails(data);
		$('#consignmentOrderGride').show();
	});
});

//Attribute Details 
$("#consignmentAttribureDetails").on("click",function(){
	
	var data = selectedConsignmentCheckBox();
	var orderID = data.join(",");
	console.log(orderID);
	postJSON('/OrderExecution/api/v1/openClosedOrderAttributeSearch',
			JSON.stringify(consignmentDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		consignmentAttrDetailsGrid(data);
		$('#consignmentAttrDetails').show();
	});
});


// Stone Details
$("#consignmentStoneDetails").on("click",function(){
	
	var data = selectedConsignmentCheckBox();
	var orderID = data.join(",");
	postJSON('/OrderExecution/api/v1/openCloseOrderStonesSearch',
			JSON.stringify(consignmentDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		consignmentStoneDetails(data);
		$('#consignmentStoneDetGrid').show();
	});
});
//Accessory 

$("#consignmentAccessoryDetails").on("click",function(){
	
	var data = selectedConsignmentCheckBox();
	var orderID = data.join(",");
	postJSON('/OrderExecution/api/v1/openClosedAccessorySearch',
			JSON.stringify(consignmentDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		consignmentAccessoryDetails(data);
		$('#consignmentAccDetGrid').show();
	});
});

//Design
$("#consignmentDesignDetails").on("click",function(){
	
	var data = selectedConsignmentCheckBox();
	var orderID = data.join(",");
	postJSON('/OrderExecution/api/v1/openCloseOrderDesignSearch',
			JSON.stringify(consignmentDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		consignmentDesignDetailsGrid(data);
		$('#consignmentDesignGrid').show();
	});
});

$("#consignmentCertificationDetails").on("click",function(){
	
	var data = selectedConsignmentCheckBox();
	var orderID = data.join(",");
	postJSON('/OrderExecution/api/v1/openClosedOrderCrtDetails',JSON.stringify(consignmentDetailFieldFilters(orderID)),	function(response) {
		var data = response.payload.list;
		certDetailsGirdConsignment(data);
		$('#jqxgridCertConsignment').show();
	});
});

//Item history 
$("#consignmentItemHistory").click(function(){
	
	var OrderIdArray= selectedConsignmentCheckBox();
	var orderId = OrderIdArray.join(",");
	postJSON('/OrderExecution/api/v1/openClosedOrderItemHistory',
			JSON.stringify({"fieldFilters":{"orderId":orderId}}),
			function(response) {
		var data = response.payload.list;
		
		itemHistoryConsignmentGird(data);
		$("#jqxgridConsignmentItemHistory").show();
	});
	
});

//consignment Order Home Grid
function consignmentOrderGride(data) {


	var source = {
			datafields : [ {
		'name' : 'orderStatus',
		'type' : 'string'

	}, {
		'name' : 'pancard',
		'type' : 'string',
		'map' : 'customer>pancard'

	}, {
		'name' : 'isAdvancedPayment',
		'type' : 'string'

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
		'name' : 'phoneNo',
		'type' : 'long',
		
	},/* {
		'name' : 'address2',
		'type' : 'string',
		'map' : 'customer>address>address2'

	}, */{
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

	} ],
	localdata : data,
	
	updaterow: function (rowid, newdata, commit) {
         commit(true);
     }
	}
	
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#consignmentJqxgride").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 50,
		theme: 'energyblue',
		columnsresize: true, 
		autoheight: false,
		altRows : false,
		pageable : true,
		sortable : true,
		height: '240px',
	   columns : [{
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
		sortable : false,
		editable : false
	}, {
		'text' : 'Phone No.',
		'datafield' : 'phoneNo',
		'width' : '12%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Advance Unrealised',
		'datafield' : 'isAdvancedPayment',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : '',
		'datafield' : 'orderID2',
		cellsrenderer : editconsignment,
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	} ]
	});


	/*addGrid(datafields, columns, updateRows, data,"", "#consignmentJqxgride");
	  var columnCheckBox = null;
	$("#consignmentJqxgride").jqxGrid({
		autorowheight : true,
		autoheight : true,
		width : '100%',
		altRows : true,
		theme: 'energyblue',
		editable: true,
		pageable: true,
		selectionmode: 'none',
		columnsResize : true,
		
	});*/
}

function consignmentOrderDetails(data) {

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
		'type' : 'double',
		'map':'estimatedValue'
	},{
		'name' : 'fellowUpWithRemark',
		'type' : 'int',
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
		'text' : 'Order Number',
		'datafield' : 'orderNo',
		cellsalign : 'center',
		align : 'center',
		'width' : '6%',
		sortable : false,
		editable : false
	}, {
		'text' : 'Sl. No.',
		'datafield' : 'slNo',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Order Kind',
		'datafield' : 'orderKind',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Stock No.',
		'datafield' : 'stockNo',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Is Precious Metal',
		'datafield' : 'precious',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Seg. Type',
		'datafield' : 'segmentType',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Metal Type',
		'datafield' : 'metalType',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Jewel Type',
		'datafield' : 'jewelType',
		'width' : '7%',
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
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'PSR Number',
		'datafield' : 'psrNumber',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Linked To Sl.No',
		'datafield' : 'linkedToSi',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pcs.',
		'datafield' : 'pcs',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	} , {
		'text' : 'Due Date Type',
		'datafield' : 'dueDateType',
		'width' : '8%',
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
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Work Order Instruction',
		'datafield' : 'workOrderInst',
		'width' : '10%',
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
		cellsformat : 'd2',
		sortable : true,
		editable : false
	},{
		'text' : 'Estimated Price',
		'datafield' : 'estmationPrice',
		'width' : '8%',
		cellsformat : 'd2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : 'Follow up with J/W Remarks',
		datafield : 'fellowUpWithRemark',
		cellsrenderer : addConsRemarks,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '10%'
	} ];

	addGrid(datafields, columns, updateRows, data,"list", "#consignmentOrderGride");
	$("#consignmentOrderGride").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		pageable:true,
		rowdetails : true,
		
	});
}

var addConsRemarks =  function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#consJwRemarks" type="button" id=' 
	+ row
	+ ' onclick="addConsJwRemarks('
	+ value
	+ ')" ><i class="fa fa-plus fa-sm"></i> Jw Rem </button>'; 
}

var oNoJw;
var addConsJwRemarks = function(id){
	var rows = $('#consignmentOrderGride').jqxGrid('getrows');
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
		$("#designVariationDetConsJw").html(variationRow);
	});
}

$("#saveConsJwRem").on('click',function(){
	var rows = $('#consignmentOrderGride').jqxGrid('getrows');
	var orderNoC = oNoJw.toString();
	var orderSlNo;
	$.each(rows, function(key, val) {	
		 if(val.orderNo  == oNoJw){	
			 orderSlNo = val.slNo; 
		}
	});
	
	var fieldFilters = {
			 "type":"JW",
			 "orderNo" : orderNoC,
			 "orderSrlNo" : orderSlNo,
			 "remarks" : $("#consJwRem").val()	 
			}
	if($("#consJwRem").val() != ""){
		postJSON('/OrderExecution/api/v1/saveOrderItemRemarks', JSON.stringify(fieldFilters), function(data) {
				if(data.resCode == "1"){
				//	$('#customerRemarks').modal('hide');
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					addConsJwRemarks(orderNoC);
					$("#consJwRem").val("");
				}
		});
	}
});


function consignmentAttrDetailsGrid(data) {

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
	'map':'orderItemMeltingPurity>skinPurity'

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
		'map': 'attributes>length>id'

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
		'type' : 'string',
		'map':'attributes>loopType>id'
	},{
		'name' : 'hookType',
		'type' : 'string',
		'map':'attributes>hookType>id'
	},{
		'name' : 'screwType',
		'type' : 'string',
		'map':'attributes>screwType>id'
	},{
		'name' : 'polishType',
		'type' : 'string',
		'map':'attributes>polishType>id'

	},{
		'name' : 'settingType',
		'type' : 'string',
		'map':'attributes>settingType>name'
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
		'type' : 'int',
		'map':'orderItemStatusType'

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
		'width' : '6%',
		cellsformat : 'd2',
		columngroup : "purity",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Melting',
		'datafield' : 'melting',
		'width' : '6%',
		cellsformat : 'd2',
		columngroup : "purity",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pre Repair Skin Purity',
		'datafield' : 'preRepairSkinPurity',
		'width' : '7%',
		cellsformat : 'd2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pre Repair Melting purity',
		'datafield' : 'preRepairMeltingPurity',
		'width' : '7%',
		cellsformat : 'd2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Weight Type',
		'datafield' : 'weightType',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Expected From',
		'datafield' : 'expectedFrom',
		'width' : '6%',
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		columngroup : "weight",
		sortable : false,
		editable : false
	}, {
		'text' : 'Exp To',
		'datafield' : 'expectedTo',
		'width' : '7%',
		cellsformat : 'd3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pre-Repair Gross',
		'datafield' : 'preRepairGross',
		'width' : '8%',
		cellsformat : 'd3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pre-Repair Net',
		'datafield' : 'preRepairNet',
		'width' : '7%',
		cellsformat : 'd3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Finished Gross',
		'datafield' : 'finishedGross',
		'width' : '7%',
		cellsformat : 'd3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Finished Net',
		'datafield' : 'finishedNet',
		'width' : '10%',
		cellsformat : 'd3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Length',
		'datafield' : 'length',
		'width' : '6%',
		cellsformat : 'd2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Size',
		'datafield' : 'size',
		'width' : '6%',
		cellsformat : 'd2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Height',
		'datafield' : 'height',
		'width' : '6%',
		cellsformat : 'd2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Diameter',
		'datafield' : 'diameter',
		'width' : '6%',
		cellsformat : 'd2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Width',
		'datafield' : 'width',
		'width' : '6%',
		cellsformat : 'd2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Loop Type',
		'datafield' : 'loopType',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Hook Type',
		'datafield' : 'hookType',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Screw Type',
		'datafield' : 'screwType',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Polish Type',
		'datafield' : 'polishType',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Setting Type',
		'datafield' : 'settingType',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Design Req Y/N',
		'datafield' : 'designReq',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Order Item Desc',
		'datafield' : 'orderItemDescription',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Order Item Status',
		'datafield' : 'orderItemStatus',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	} ];

	addGrid(datafields, columns, updateRows, data, "", "#consignmentAttrDetails");
	$("#consignmentAttrDetails").jqxGrid({
		 theme: 'energyblue',
		 pageable: true,
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


function consignmentStoneDetails(data) {

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
		'type' : 'string',
		'map':'actualColor>name'

	}, {
		'name' : 'color',
		'type' : 'string',
		'map':'color>name'
	}, {
		'name' : 'cutGrade',
		'type' : 'int',
		'map':'cutGrade>name'
	}, {
		'name' : 'uom',
		'type' : 'string',
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
		'type' : 'double',
		'map':'stoneUnRetWastagePcs'
	},{
		'name' : 'breakageNotReceived',
		'type' : 'double',
		'map':'stoneUnRetWastageWt'

	},{
		'name' : 'RateHc',
		'type' : 'double',
		'map':'rateOrHc'

	},{
		'name' : 'price',
		'type' : 'double',

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
		'text' : 'Wt Range',
		'datafield' : 'weightRange',
		'width' : '7%',
		cellsformat : 'd2',
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
		sortable : false,
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
		'text' : 'Exp Wt.',
		'datafield' : 'expectedWt',
		'width' : '10%',
		cellsformat : 'd3',
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
		cellsformat : 'd3',
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
		cellsformat : 'd3',
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
		hidden :true
	},{
		'text' : 'Bulk Wt.',
		'datafield' : 'bulkWt',
		'width' : '10%',
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false,
		hidden :true
	},{
		'text' : 'Stone Pcs. Retd',
		'datafield' : 'stonePcsRetd',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	},{
		'text' : 'Stone wt. Retd',
		'datafield' : 'stoneWtRetd',
		'width' : '10%',
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Received Pcs.',
		'datafield' : 'breakageReceivedPcs',
		'width' : '10%',
		cellsformat : 'd3',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Received Wt.',
		'datafield' : 'breakageReceivedWt',
		'width' : '10%',
		cellsformat : 'd3',
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
		'text' : 'Breakage Not received ',
		'datafield' : 'breakageNotReceived',
		'width' : '10%',
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Rate/HC',
		'datafield' : 'RateHc',
		'width' : '10%',
		cellsformat : 'd2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Price',
		'datafield' : 'price',
		'width' : '10%',
		cellsformat : 'd2',
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

	addGrid(datafields, columns, updateRows, data, "", "#consignmentStoneDetGrid");
	$("#consignmentStoneDetGrid").jqxGrid({
		 pageable: true,
		 theme: 'energyblue',
		});
}
//Accessory
function consignmentAccessoryDetails(data) {

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
		'type' : 'double',
		'map':'unRetWastagePcs'
	}, {
		'name' : 'breakageNotReceived',
		'type' : 'double',
		'map':'unRetWastageWt'

	}, {
		'name' : 'rateHc',
		'type' : 'double',
		'map':'rateOrHc'
		
	},{
		'name' : 'price',
		'type' : 'double',
		'map':'price'

	},{
		'name' : 'hookType',
		'type' : 'string',

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
		cellsalign : 'left',
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
		'text' : 'Exp Wt.',
		'datafield' : 'expectedFrom',
		'width' : '6%',
		cellsformat : 'd3',
		cellsalign : 'right',
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
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Stone Pcs. Used',
		'datafield' : 'stonePcsUsed',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Stone Wt. Used',
		'datafield' : 'stoneWtUsed',
		'width' : '7%',
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Stone Pcs. Retd',
		'datafield' : 'stonePcsRetd',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Stone wt. Retd',
		'datafield' : 'stoneWtRetd',
		'width' : '7%',
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Received Pcs.',
		'datafield' : 'breakageReceivedPcs',
		'width' : '10%',
		cellsformat : 'd3',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Received Wt.',
		'datafield' : 'breakageReceivedWt',
		'width' : '10%',
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Loss Not Received Pcs',
		'datafield' : 'breakageLossNotReceivedPcs',
		'width' : '10%',
		cellsformat : 'd3',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Breakage Not received ',
		'datafield' : 'breakageNotReceived',
		'width' : '10%',
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Rate/HC',
		'datafield' : 'rateHc',
		'width' : '6%',
		cellsformat : 'd2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Price',
		'datafield' : 'price',
		'width' : '10%',
		cellsformat : 'd2',
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

	addGrid(datafields, columns, updateRows, data, "", "#consignmentAccDetGrid");
	$("#consignmentAccDetGrid").jqxGrid({
		 pageable: true,
			theme: 'energyblue',
		});
}

var viewCertImageConsignment = function(row){
	var viewDesign = $('#jqxgridCertConsignment').jqxGrid('getcellvalue', row, 'view');
	var viewDesignList = [];
	 viewDesignList = viewDesign.list;
	$('#pagination-demoConsignment').twbsPagination({
	    totalPages: viewDesign.size,
	    visiblePages: "5",
	    onPageClick: function (event, page) {
	    		$.each(viewDesignList, function(k, v){
	    			if((page-1) == k){
	    				console.log(v);
	    				var img =  "<a href='/uf/"+v.id+"' target='_blank'><img src='/uf/"+v.id+"' height='60%' width ='60%' /></a>";
	    				$('#page-contentConsignment').html(img);
	    			}
	    		});
	    }
	});
}

//Edit view design
var orderItemDesignRendererConsignment = function(row, column, value) {
	var image =  $("#jqxgridCertConsignment").jqxGrid("getcellvalue", row , 'view');
	if((image == null || image.length != 0) && typeof image != "undefined"){
		return '<div class="text-center"><a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#certViewDet" type="button" onclick="viewCertImageConsignment('+ row + ')"/><span class="fa fa-eye"></span> </a></div>';		
	}else{
		return '<div class="text-center"><button style="margin-top: 3px;" disabled class="btn btn-sm btn-primary" disabled data-toggle="modal" type="button" /><i class="fa fa-eye fa-lg"></i></button></div>';
	}
		
}

var certDetailsGirdConsignment =  function(data){
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
	{text: '',datafield: 'view',width: '5%',editable : false,cellsalign : 'center',align : 'center', cellsrenderer: orderItemDesignRendererConsignment},
	//{text: '',datafield: 'image',width: '15%',editable : false,cellsalign : 'center',align : 'center', hidden: true}
];

addGrid(datafields, columns, updateRows, data, "", "#jqxgridCertConsignment");

$("#jqxgridCertConsignment").jqxGrid({
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

function consignmentDesignDetailsGrid(data) {
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
		'type':'string',
		'map':'designStatus>name'
		},{
		'name':'designStatusDate',
		'type':'date',
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
		'map':'custApprovedDate'
			
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
	editable : true,
	sortable : true
	},{
	'text':'Linked To Sl.No ',
	'dataField':'linkedToSlNo',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true
	 
	},{
	'text':'Design Due Date',
	'dataField':'designDueDate',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true
	},{
	'text':'Design Status',
	'dataField':'designStatus',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true
	 
	},{
	'text':'Design Status Date ',
	'dataField':'designStatusDate',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true
	},{
	'text':'Design By',
	'dataField':'designBy',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true
	 
	},{
	'text':'Designer Name',
	'dataField':'designerName',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : false
	},{
	'text':'No of Designs Required',
	'dataFields':'designsReq',
	'width':'10%',

	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : true
	},{
	'text':'Catalogue Page Reference No',
	'dataField':'catalogueRefNo',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : true
	},{
	'text':'Design Instructions',
	'dataField':'designDes',
	'width':'10%',
	cellsalign : 'left',
	align : 'center',
	editable : true,
	sortable : true
	},{
	'text':'Emp. to approve design',
	'dataField':'empDesgnAppvl',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true
	 
	},{
	'text':'Cust. approval - Due Date',
	'dataField':'custApproval',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true
	 
	},{
	'text':'Cust. Approved Date ',
	'dataField':'custAppDate',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true
	},{
	'text':'Design Intimation Mode',
	'dataField':'designIntimationMode',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true
	},{
	'text':'Design ID',
	'dataField':'designId',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true

	},{
	'text':'View Design ',
	'dataField':'viewDesign',
	'width':'10%',
	cellsrenderer : designViewDetailsConsignment,
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : true

	} ];
	
	addGrid(datafields, columns, updateRows, data,"", "#consignmentDesignGrid");
	$("#consignmentDesignGrid").jqxGrid({
		 pageable: true,
		 theme: 'energyblue',
		});

}


//Item History Details

function itemHistoryConsignmentGird(data) {
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
	addGrid(datafield, columns, updateRows, data, "", "#jqxgridConsignmentItemHistory");
	$("#jqxgridConsignmentItemHistory").jqxGrid({
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
//Consignment Order
$('#consignmentOrderSearch').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
		rules : {
			"consignmentOrderNumberS" : {number: true},
			"consignmentPsrNumberS" : 	{number: true},
		
	},
	messages:
	{
		"consignmentOrderNumberS":
		{
		number:"Please enter valid Order Number"
		},
		"consignmentPsrNumberS":
		{
		number:"Please enter valid PSR Number"
		},
	},
	submitHandler : function(form) {
		postJSON('/OrderExecution/api/v1/openClosedOrders',
				JSON.stringify(consignmentOrderFilters()),
				function(response) {
		var data = response.payload.list;
		$("#consignmentJqxgride").show();
		consignmentOrderGride(data);
			$("#gridTabconsignment").show();
		});
		return false;
	}
});


$("#clear").on('click',function(){
	$("#gridTabconsignment").hide();
	activaTab('tab0consignment');
	$("#consignmentJqxgride").jqxGrid("clearSelection");
	//window.location.href= "javascript:showContentPage('openCloseOrder', 'bodySwitcher')";
});
