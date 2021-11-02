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

$("#gridTabStock").hide();


$.getJSON('/OrderExecution/api/v1/openClosedOrdersLOV', function(data) {
	$('#stockStoreNameS').empty().append(
			'<option value="" selected>--Select--</option>');

	$('#stockDcNameS').empty().append(
			'<option value="" selected>--Select--</option>');


	$('#stockOrderHeaderStatus').empty().append(
			'<option value="" selected>--Select--</option>');

	$('#stockLineItemStatusS').empty().append(
			'<option value="" selected>--Select--</option>');

	$('#stockOrderRaisedS').empty().append(
			'<option value="" selected>--Select--</option>');

	$.each(data.payload.stores, function(key, val) {
		$('#stockStoreNameS').append(
				'<option value="' + val.id + '">' + val.name + '</option>');
	});
	$.each(data.payload.dcList, function(key, val) {
		$('#stockDcNameS').append(
				'<option value="' + val.id + '">' + val.name + '</option>');
	});
	
	var vendorName = data.payload.vCodeList;
	var dataS =[];
	$.each(vendorName,function(key, val) {
	dataS.push({ label:val.venSearchAndName, value:val.id});
	});
	$(function() {		
		$("#stockVendorCodeS").autocomplete({		
			
			source: dataS,
			focus: function(event, ui) {
				
				event.preventDefault();
				$(this).val(ui.item.label);
				
			},
			select: function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);					
				$("#stockVendorCodeS-value").val(ui.item.value);					
			}
		});
	});	


	$.each(data.payload.empList, function(key, val) {
		$('#stockOrderRaisedS').append(
				'<option value="' + val.id + '">' + val.name + '</option>');
	});
		
	
	 $.each(data.payload.orderStatusList, function(key, val) {
	  $('#stockOrderHeaderStatus').append( '<option value="' + val.id + '">' +
	  val.name + '</option>'); 
	  });
	 
	 	$.each(data.payload.itemStatusList, function(key, val) {
		  $('#stockLineItemStatusS').append( '<option value="' + val.id + '">' +
		  val.name + '</option>');
		  });

});


$("#stockSearch").on(
		'click',
		function() {
			
			 $('#jqxgridStock').jqxGrid('clearselection');
			activaTab('tab0Stock');
			$("#jqxgridStock").hide();
			$("#gridTabStock").hide();

			var stockOrderNumberS = $("#stockOrderNumberS").val();
			var stockStoreNameS = $("#stockStoreNameS").val();
			var stockDcNameS = $("#stockDcNameS").val();
			var stockVendorCodeS = $("#stockVendorCodeS").val();
			var stockPsrNumberS = $("#stockPsrNumberS").val();
			var stockOrderHeaderStatus = $("#stockOrderHeaderStatus").val();
			var stockLineItemStatusS = $("#stockLineItemStatusS").val();
			var stockOrderRaisedS = $("#stockOrderRaisedS").val();
			if (stockOrderNumberS != "" || stockStoreNameS != ""
					|| stockDcNameS != "" 
					|| stockVendorCodeS != ""
					|| stockPsrNumberS != ""
					|| stockOrderHeaderStatus != ""
					|| stockLineItemStatusS != "" ||  stockOrderRaisedS != "" ) {
					
				
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

var stockOrderFilters = function() {
	var stockOrderNumberS = $("#stockOrderNumberS").val();
	var stockStoreNameS = $("#stockStoreNameS").val();
	var stockDcNameS = $("#stockDcNameS").val();
	var stockVendorCodeS = $("#stockVendorCodeS-value").val();
	var stockPsrNumberS = $("#stockPsrNumberS").val();
	var stockOrderHeaderStatus = $("#stockOrderHeaderStatus").val();
	var stockLineItemStatusS = $("#stockLineItemStatusS").val();
	var stockOrderRaisedS = $("#stockOrderRaisedS").val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	fieldFilters.fieldFilters["orderType"] ="ST" ;

	if (stockOrderNumberS != "" && stockOrderNumberS != null) {
		fieldFilters.fieldFilters["orderId"] = stockOrderNumberS;
	}
	if (stockStoreNameS != "" && stockStoreNameS != null) {
		fieldFilters.fieldFilters["store"] = stockStoreNameS;
	}
	if (stockDcNameS != "" && stockDcNameS != null) {
		fieldFilters.fieldFilters["dc"] = stockDcNameS;
	}
	if (stockVendorCodeS != "" && stockVendorCodeS != null) {
		fieldFilters.fieldFilters["vendorCode"] = stockVendorCodeS;
	}
	if (stockPsrNumberS != "" && stockPsrNumberS != null) {
		fieldFilters.fieldFilters["psrNo"] = stockPsrNumberS;
	}
	if (stockOrderHeaderStatus != "" && stockOrderHeaderStatus != null) {
		fieldFilters.fieldFilters["orderHeaderStatus"] = stockOrderHeaderStatus;
	}
	if (stockLineItemStatusS != "" && stockLineItemStatusS != null) {
		fieldFilters.fieldFilters["lineItemStatus"] = stockLineItemStatusS;
	}
	if (stockOrderRaisedS != "" && stockOrderRaisedS != null) {
		fieldFilters.fieldFilters["orderRaisedBy"] = stockOrderRaisedS;
	}
	
	return fieldFilters;

}

var editStock = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"  " data-target="#customerOrder" style="display: block; margin: auto;  margin-top:5px;" type="button" id='
			+ row
			+ ' onclick="customerOrderView('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-sm"></i></button>';
}


$(".stockTabDisabled").addClass("tabDisabled1");
$("#gridTabStock").tabs({
	disabled:[]
});

var stockArry =[];
$("#jqxgridStock").bind('cellendedit', function (event,index) {
	var i =event.args.rowindex;
	    if (event.args.value) {
	      $("#jqxgridStock").jqxGrid('selectrow', event.args.row);
	      stockArry.push(i);
	      $(".stockTabDisabled").removeClass("tabDisabled1");
	   	    }
	    else {
	        $("#jqxgridStock").jqxGrid('unselectrow', event.args.row);
	        
	        var delArr = stockArry.splice(i,1);
	    }
	    if($("#jqxgridStock").jqxGrid("getselectedrowindexes") <= 0)
		{
	    	$(".stockTabDisabled").addClass("tabDisabled1");
		}
	    
	    $.each(stockArry, function(key, val) {
	    		var dataStock =$("#jqxgridStock").jqxGrid('getrowdata',val);
	    });
	    
	});

$(".modal").on("hidden.bs.modal", function(){
	$('#page-content').removeData();
    $('.pagination').twbsPagination('destroy');
	$('.modal-backdrop').remove();
});

//view design img
var designViewDetailsStock = function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"  data-target="#designView" style="display: block; margin: auto;  margin-top:5px;" type="button" id='
			+ row
			+ ' onclick="desginviewdetailStock('
			+ value
			+ ')" /><i class="fa fa-binoculars"></i> View </button>';
}
	var desginviewdetailStock = function(id)
{
	/*	var img = "";
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
		*/
		
		var viewDesignList = [];
		postJSON('/OrderExecution/api/v1/getDesignVariations',JSON.stringify({'id':id}),function(response){	
		 viewDesignList = response.payload.designVariations;
		$('#pagination-demo').twbsPagination({
		    totalPages: viewDesignList.length,
		    visiblePages: "5",
		    onPageClick: function (event, page) {
		    	
		    				
		    	$.each(viewDesignList, function(k, v){
		    			if((page-1) == k){
		    				console.log(v);
		    				var img =  "<a href='/uf/"+v.fullFilePathd+"' target='_blank'><img src='/uf/"+v.fullFilePath+"' height='60%' width ='60%' /></a>";
		    				$('#page-content').html(img);
		    			}
					});
		    		
		    }
		});
		});
}

function selectedStockCheckBox()
{
	
	var dataArrStock = [];
	var data1 = $("#jqxgridStock").jqxGrid("getselectedrowindexes");

$.each(data1, function(key, val) {
	dataArrStock.push(val.orderID);

});
return dataArrStock;
}


function stockDetailFieldFilters(orderID)
{

	var vendorCodeS = $("#stockVendorCodeS-value").val();
	var customerPsrNumber = $("#stockPsrNumberS").val();
	var customerLineItemStatusS = $("#stockLineItemStatusS").val();
		
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
//Order Details 
$("#stockOrderDetails").on("click",function(){
	
	var data = selectedStockCheckBox();
	var orderID = data.join(",");
	postJSON('/OrderExecution/api/v1/openClosedOrderItems',
			JSON.stringify(stockDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		stockOrderDetails(data);
		$('#stockOrderGride').show();
	});
});

//Attribute Details 
$("#stockAttribureDetails").on("click",function(){
	
	var data = selectedStockCheckBox();
	var orderID = data.join(",");
	postJSON('/OrderExecution/api/v1/openClosedOrderAttributeSearch',
			JSON.stringify(stockDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		stockAttributeDetails(data);
		$('#stockAttrDetails').show();
	});
});


//Stock Stone Details
$("#stockStoneDetails").on("click",function(){
	
	var data = selectedStockCheckBox();
	var orderID = data.join(",");
	postJSON('/OrderExecution/api/v1/openCloseOrderStonesSearch',
			JSON.stringify(stockDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		stockStoneDetails(data);
		$('#stockStoneDetGrid').show();
	});
});
//stock Accessory 

$("#stockAccessoryDetails").on("click",function(){
	
	var data = selectedStockCheckBox();
	var orderID = data.join(",");
	postJSON('/OrderExecution/api/v1/openClosedAccessorySearch',
			JSON.stringify(stockDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		stockAccessoryDetails(data);
		$('#stockAccDetGrid').show();
	});
});

//Stock Design
$("#stockDesignDetails").on("click",function(){
	
	var data = selectedStockCheckBox();
	var orderID = data.join(",");
	postJSON('/OrderExecution/api/v1/openCloseOrderDesignSearch',
			JSON.stringify(stockDetailFieldFilters(orderID)),
			function(response) {
		var data = response.payload.list;
		stockDesignDetailsGrid(data);
		$('#stockDesignGrid').show();
	});
});

//Stock Design
$("#stockCertificationDetails").on("click",function(){
	
	var data = selectedStockCheckBox();
	var orderID = data.join(",");
	postJSON('/OrderExecution/api/v1/openClosedOrderCrtDetails',JSON.stringify(stockDetailFieldFilters(orderID)),function(response) {
		var data = response.payload.list;
		certDetailsGirdStock(data);
		$('#jqxgridCertStock').show();
	});
});

//Item History
$("#stockitemHistory").click(function(){
	
	var OrderIdArray= selectedStockCheckBox();
	var orderId = OrderIdArray.join(",");
	postJSON('/OrderExecution/api/v1/openClosedOrderItemHistory',
			JSON.stringify({"fieldFilters":{"orderId":orderId}}),
			function(response) {
		var data = response.payload.list;
		
		itemHistoryStockGird(data);
		$("#jqxgridStockItemHistory").show();
	});
	
});

//Stock Order Home Grid
function stockOrderGride(data) {

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

	} ],
	localdata : data,
	
	updaterow: function (rowid, newdata, commit) {
         commit(true);
     }
	}
	
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStock").jqxGrid({
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
		columns : [ {
		'text' : '',
		'datafield' : '',
		cellsalign : 'center',
		columntype : 'checkbox',
		align : 'center',
		'width' : '5%',
		sortable : false,
		
      
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
		cellsrenderer : editStock,
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}]
	});


	/*addGrid(datafields, columns, updateRows, data,"list", "#jqxgridStock");
	  var columnCheckBox = null;
	$("#jqxgridStock").jqxGrid({
     	altrows: true,
     	filterable: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		pageable:true,
		virtualmode : true
		
	});*/
}

function stockOrderDetails(data) {

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
		'type' : 'string',
		'map':'metalSellingRate'
	},{
		'name' : 'estmationPrice',
		'type' : 'string',
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
		'width' : '7%',
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
		'text' : 'SubCategory',
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
		'text' : 'PSR No',
		'datafield' : 'psrNumber',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Linked To Sl.No',
		'datafield' : 'linkedToSi',
		'width' : '8%',
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
		sortable : false,
		editable : false
	},{
		'text' : 'Estimated Price',
		'datafield' : 'estmationPrice',
		'width' : '8%',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : 'Follow up with J/W Remarks',
		datafield : 'fellowUpWithRemark',
		cellsrenderer : addStockOrderRemarks,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '10%'
	}  ];

	addGrid(datafields, columns, updateRows, data,"", "#stockOrderGride");
	$("#stockOrderGride").jqxGrid({
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

var addStockOrderRemarks =  function(row, column, value) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#stockOrderJwRemarks" type="button" id=' 
	+ row
	+ ' onclick="addStOrdJwRemarks('
	+ value
	+ ')" ><i class="fa fa-plus fa-sm"></i> Jw Rem </button>'; 
}



var oNoJw;
var addStOrdJwRemarks = function(id){
	var rows = $('#stockOrderGride').jqxGrid('getrows');
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
		$("#designVariationDetStockJw").html(variationRow);
	});
}

$("#saveStockJwRem").on('click',function(){
	var rows = $('#stockOrderGride').jqxGrid('getrows');
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
			 "remarks" : $("#stOrdJwRem").val()	 
			}
	if($("#stOrdJwRem").val() != ""){
		postJSON('/OrderExecution/api/v1/saveOrderItemRemarks', JSON.stringify(fieldFilters), function(data) {
				if(data.resCode == "1"){
				//	$('#customerRemarks').modal('hide');
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					addStOrdJwRemarks(orderNoC);
					$("#stOrdJwRem").val("");
				}
		});
	}
});


function stockAttributeDetails(data) {

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
		'type' : 'int',
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
		'type' : 'double',
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
		'type' : 'int',
		'map':'attributes>settingType>name'
	},{
		'name' : 'designReq',
		'type' : 'string',
		'map':'isDesignRequiredFlag'

	},{
		'name' : 'orderItemDescription',
		'type' : 'int',
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
		cellsformat:'d2',
		columngroup : "purity",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Melting',
		'datafield' : 'melting',
		'width' : '6%',
		cellsformat:'d2',
		columngroup : "purity",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pre Repair Skin Purity',
		'datafield' : 'preRepairSkinPurity',
		'width' : '7%',
		cellsformat:'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pre Repair Melting Purity',
		'datafield' : 'preRepairMeltingPurity',
		'width' : '7%',
		cellsformat:'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Wt Type',
		'datafield' : 'weightType',
		'width' : '6%',
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
		sortable : false,
		editable : false
	}, {
		'text' : 'Exp To',
		'datafield' : 'expectedTo',
		'width' : '7%',
		cellsformat:'d3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pre-Repair Gross',
		'datafield' : 'preRepairGross',
		'width' : '8%',
		cellsformat:'d3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Pre-Repair Net',
		'datafield' : 'preRepairNet',
		'width' : '7%',
		cellsformat:'d3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Finished Gross',
		'datafield' : 'finishedGross',
		'width' : '7%',
		cellsformat:'d3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Finished Net',
		'datafield' : 'finishedNet',
		'width' : '7%',
		cellsformat:'d3',
		columngroup : "weight",
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Length',
		'datafield' : 'length',
		'width' : '6%',
		cellsformat:'d2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Size',
		'datafield' : 'size',
		'width' : '6%',
		cellsformat:'d2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Height',
		'datafield' : 'height',
		'width' : '6%',
		cellsformat:'d2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Diameter',
		'datafield' : 'diameter',
		'width' : '6%',
		cellsformat:'d2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Width',
		'datafield' : 'width',
		'width' : '6%',
		cellsformat:'d2',
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
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Polish Type',
		'datafield' : 'polishType',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Setting Type',
		'datafield' : 'settingType',
		'width' : '6%',
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
		'text' : 'Order Item Description',
		'datafield' : 'orderItemDescription',
		'width' : '10%',
		cellsalign : 'left',
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

	addGrid(datafields, columns, updateRows, data, "", "#stockAttrDetails");
	$("#stockAttrDetails").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
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


function stockStoneDetails(data) {

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
		'type' : 'string',
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
		'map':'price'

	},{
		'name' : 'price',
		'type' : 'double',
		'map' : 'rateOrHc'
	},{
		'name' : 'condition',
		'type' : 'int',
		'map':'condition>name'

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
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Stone Wt. Used',
		'datafield' : 'issuedWtUsed',
		'width' : '7%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Bulk Pcs',
		'datafield' : 'bulkPcs',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false,
		hidden :true
	},{
		'text' : 'Bulk Wt.',
		'datafield' : 'bulkWt',
		'width' : '7%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false,	
		hidden :true
		
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
		'text' : 'Breakage Not received',
		'datafield' : 'breakageNotReceived',
		'width' : '10%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Rate/HC',
		'datafield' : 'RateHc',
		'width' : '6%',
		cellsformat:'d3',
		cellsalign : 'right',
		align : 'center',
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

	addGrid(datafields, columns, updateRows, data, "", "#stockStoneDetGrid");
	$("#stockStoneDetGrid").jqxGrid({
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
//Accessory
function stockAccessoryDetails(data) {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'slNo',
		'type' : 'string',
		'map':'serialNumber'
	}, {
		'name' : 'linkedToSlNo',
		'type' : 'string',
		'map' : 'orderItemSlNo'

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
		'type' : 'double',
		'map':'rateOrHc'
		
	},{
		'name' : 'price',
		'type' : 'int',
		'map':'price'

	},{
		'name' : 'hookType',
		'type' : 'int',

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
		'text' : 'UOM',
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
		cellsformat:'d2',
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
		cellsformat:'d2',
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
		cellsformat:'d2',
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
		'width' : '10%',
		cellsformat:'d2',
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
		cellsformat:'d2',
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
		cellsformat:'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Rate/HC',
		'datafield' : 'rateHc',
		'width' : '10%',
		cellsformat:'d2',
		cellsalign : 'right',
		align : 'center',
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

	addGrid(datafields, columns, updateRows, data, "", "#stockAccDetGrid");
	$("#stockAccDetGrid").jqxGrid({
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
var viewDesignListStock = [];
var viewCertImageStock = function(row){
	var viewDesign = $('#jqxgridCertStock').jqxGrid('getcellvalue', row, 'view');
	var viewDesignList = [];
	 viewDesignListStock = viewDesign.list;
	$('#pagination-demoStock').twbsPagination({
	    totalPages: viewDesign.size,
	    visiblePages: "5",
	    onPageClick: function (event, page) {
	    		$.each(viewDesignListStock, function(k, v){
	    			if((page-1) == k){
	    				console.log(v);
	    				var img =  "<a href='/uf/"+v.id+"' target='_blank'><img src='/uf/"+v.id+"' height='60%' width ='60%' /></a>";
	    				$('#page-contentStock').html(img);
	    			}
	    		});
	    }
	});
}

//Edit view design
var orderItemDesignRendererStock = function(row, column, value) {
	var image =  $("#jqxgridCertStock").jqxGrid("getcellvalue", row , 'view');
	if((image == null || image.length != 0) && typeof image != "undefined"){
		return '<div class="text-center"><a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#certViewDetStock" type="button" onclick="viewCertImageStock('+ row + ')"/><span class="fa fa-eye"></span> </a></div>';		
	}else{
		return '<div class="text-center"><button style="margin-top: 3px;" disabled class="btn btn-sm btn-primary" disabled data-toggle="modal" type="button" /><i class="fa fa-eye fa-lg"></i></button></div>';
	}
		
}

//Certificate grid
var certDetailsGirdStock = function(data){
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
	{text: '',datafield: 'view',width: '5%',editable : false,cellsalign : 'center',align : 'center', cellsrenderer: orderItemDesignRendererStock},
	//{text: '',datafield: 'image',width: '15%',editable : false,cellsalign : 'center',align : 'center', hidden: true}
];

addGrid(datafields, columns, updateRows, data, "", "#jqxgridCertStock");

$("#jqxgridCertStock").jqxGrid({
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


function stockDesignDetailsGrid(data) {
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
	'cellsformat' : 'dd/MM/yyyy',
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
	'cellsformat' : 'dd/MM/yyyy',
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
	'dataField':'designsReq',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : true
	},{
	'text':'Catalogue Page Ref No',
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
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true
	},{
	'text':'Emp. to Approve Design',
	'dataField':'empDesgnAppvl',
	'width':'10%',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true
	 
	},{
	'text':'Cust. Approval - Due Date',
	'dataField':'custApproval',
	'width':'10%',
	'cellsformat' : 'dd/MM/yyyy',
	cellsalign : 'center',
	align : 'center',
	editable : true,
	sortable : true
	 
	},{
	'text':'Cust. Approved Date ',
	'dataField':'custAppDate',
	'width':'10%',
	'cellsformat' : 'dd/MM/yyyy',
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
	cellsrenderer : designViewDetailsStock,
		cellsalign : 'center',
	align : 'center',
	editable : false,
	sortable : true

	} ];
	
	addGrid(datafields, columns, updateRows, data,"", "#stockDesignGrid");
	$("#stockDesignGrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		pageable:true,
		rowdetails : true,
		virtualmode : false		
	});

}

//Item History Details

function itemHistoryStockGird(data) {
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
	addGrid(datafield, columns, updateRows, data, "", "#jqxgridStockItemHistory");
	$("#jqxgridStockItemHistory").jqxGrid({
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

$('#stockOrderSearch').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
	"stockOrderNumberS":{number:true },
	 "stockPsrNumberS":{number:true},
	},
	messages:
	{
		"stockOrderNumberS":
		{
		number:"Please enter valid Order Number"
		},
		"stockPsrNumberS":
		{
		number:"Please enter valid PSR Number"
		},
		
	},
	submitHandler : function(form) {
		postJSON('/OrderExecution/api/v1/openClosedOrders',
				JSON.stringify(stockOrderFilters()),
				function(response) {
		var data = response.payload.list;
		$("#gridTabStock").show();
		$("#jqxgridStock").show();
		stockOrderGride(data);
		
		});


		return false;
	}
});

$("#clearStock").on('click',function(){
	//$("#gridTabStock").hide();
	//activaTab('tab0Stock');
	// $("#jqxgridStock").jqxGrid("clearSelection");
		window.location.href= "javascript:showContentPage('openCloseOrder', 'bodySwitcher')";
	
});
