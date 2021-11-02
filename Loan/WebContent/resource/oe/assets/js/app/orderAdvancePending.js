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

// Field Filters
var advancePendingFieldFilters = function() {
 	var storeId = $('#storeId').val();
	var orderNo = $('#orderNo').val();
	var CustId = $('#customerId').val();
	var status = $('#statusS').val();
	var customerName = $('#customerName-value').val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (storeId != "" && storeId != null) {
		fieldFilters.fieldFilters["store"] = storeId;
	}
	if (orderNo != "" && orderNo != null) {
		fieldFilters.fieldFilters["orderNo"] = orderNo;
	}
	if (CustId != "" && CustId != null) {
		fieldFilters.fieldFilters["customerId"] = CustId;
	}
	if (customerName != "" && customerName != null) {
		fieldFilters.fieldFilters["customerName"] = customerName;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	return fieldFilters;
}


// smart Search for Store Id
$('#storeId').empty().append('<option value="" selected>--Select--</option>');
$.getJSON('/OrderExecution/api/v1/advancePendingLOV', function(data) {
	var storeId = data.payload.sList;
	$.each(storeId, function(key, val) {
	 	$('#storeId').append('<option value="' + val.id + '">' + val.name + '</option>');
	 });
/*	var data = [];
	$.each(storeId, function(key, value) {
		data.push({
			value : value.id,
			label : value.name
		});
	});
	$(function() {
		$("#storeId").autocomplete({
			source : data,
			focus : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
				$("#storeId-value").val(ui.item.value);
			}

		});
	});*/
});

// smart Search for Order No
$.getJSON('/OrderExecution/api/v1/advancePendingLOV', function(data) {
	orderNo = data.payload.order_list;
	var data = [];
	$.each(orderNo, function(key, value) {
		data.push({
			value : value.id
		});
	});
	$(function() {
		$("#orderNo").autocomplete({
			source : data,
			focus : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.value);
			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.value);
				$("#orderNo-value").val(ui.item.value);
			}
		});
	});
});

// smart search for Customer Id
$.getJSON('/OrderExecution/api/v1/advancePendingLOV', function(data) {
	custId = data.payload.customer_list;
	var data = [];
	$.each(custId, function(key, value) {
		data.push({
			value : value.id,
			label : value.name+value.description
		});
	});
	
	$(function() {
		$("#customerName").autocomplete({
			source : data,
			focus : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
				$("#customerName-value").val(ui.item.value);
			}
		});
	});
});
$.getJSON('/OrderExecution/api/v1/advancePendingLOV', function(data) {
	
    var statusList = data.payload.status;
 	$.each(statusList,function(key,val){
		$("#statusS").append('<option value="'+val.id+'">'+val.name+'</option>');
	});
	
	custId = data.payload.customer_list;
	var data = [];
	$.each(custId, function(key, value) {
		data.push({
			value : value.id			
		});
	});
	
 $(function() {
	$("#customerId").autocomplete({
		source : data,
		focus : function(event, ui) {
			event.preventDefault();
			$(this).val(ui.item.value);
		},
		select : function(event, ui) {
			event.preventDefault();
			$(this).val(ui.item.value);
			$("#customerId-value").val(ui.item.value);
		}
	});
  });
});

// Search grid
function advancePendingGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' : 'storeCode',
		'type' : 'String'
	}, {
		'name' : 'orderDate',
		'type' : 'date'
	}, {
		'name' : 'customerId',
		'type' : 'long'
	}, {
		'name' : 'customerName',
		'type' : 'string'
	}, {
		'name' : 'orderNumner',
		'type' : 'int'
	}, {
		'name' : 'orderStatusDate',
		'type' : 'string'
	}, {
		'name' : 'orderStatus',
		'type' : 'String'
	}, {
		'name' : 'orderCreatedBy',
		'type' : 'long'
	}, {
		'name' : 'vouchers',
		'type' : 'array'
	} ];
	var columns = [
			{
				'text' : 'Store Code',
				'datafield' : 'storeCode',
				'width' : '16%',
				cellsalign : 'center',
				align : 'center',
				sortable : true,
				editable : false
			},
			{
				'text' : 'Order Date',
				'datafield' : 'orderDate',
				cellsalign : 'center',
				align : 'center',
				cellsformat : 'dd/MM/yyyy',
				'width' : '10%',
				editable : false,	
				sortable : true,
			},
			{
				'text' : 'Customer Id',
				'datafield' : 'customerId',
				'width' : '10%',
				cellsalign : 'center',
				align : 'center',
				editable : false,
				sortable : true,
			},
			{
				'text' : 'Customer Name',
				'datafield' : 'customerName',
				'width' : '16%',
				cellsalign : 'center',
				align : 'center',
				editable : false,
				sortable : true,
			},
			{
				'text' : 'Order Number',
				'datafield' : 'orderNumner',
				'width' : '11%',
				cellsalign : 'center',
				align : 'center',
				editable : false,
				sortable : true,
			},
			{
				'text' : 'Order Status',
				'datafield' : 'orderStatus',
				'width' : '10%',
				cellsalign : 'center',
				align : 'center',
				editable : false,
				sortable : true,
				aggregates : [ {
					'Total' : function(aggregatedValue, currentValue, column,
							record) {
						var rows = $("#jqxgrid").jqxGrid('getrows');
						var total = 0;
						for (var i = 0; i < rows.length; i++) {
							var vouchersDet = rows[i].vouchers;
							var length = rows[i].vouchers.length;
							if (length != 0) {
								for (var j = 0; j < length; j++) {
									total += vouchersDet[j].amount;
								}
							}

						}
						return '<div id="totalAggregates" style="color:#008800; font-weight:bold; margin-top:5px;"> Total : '
								+ total + '</div>';
					}
				} ],
				aggregatesrenderer : function(aggregates, column, element) {
					return aggregates.Total;
				}
			}, {
				'text' : 'Order Status Date',
				'datafield' : 'orderStatusDate',
				//cellsformat : 'dd/MM/yyyy',
				'width' : '12%',
				cellsalign : 'center',
				align : 'center',
				editable : false,
				sortable : true,
			}, {
				'text' : 'Order Created By',
				'datafield' : 'orderCreatedBy',
				'width' : '15%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/advancePendingListing",
			"list", columns, advancePendingFieldFilters(), updateRows, "");
	var initrowdetails = function(index, parentElement, gridElement, record) {
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.vouchers;
		var inlineSource = {
			datafields : [ {
				'name' : 'receiptDate',
				'type' : 'date'
			}, {
				'name' : 'receiptNo',
				'type' : 'long'
			}, {
				'name' : 'amount',
				'type' : 'double'
			}, {
				'name' : 'isCinfirmed',
				'type' : 'String'
			} ],
			id : 'id',
			localdata : data,
			datatype : 'json'
		};
		if (data.length != 0) {
			grid.jqxGrid({
				source : inlineSource,
				width : "95%",
				autoheight: true,
				showstatusbar: false,
				theme: 'energyblue',
				enabletooltips : true,
				columnsresize : true,
				columns : [ {
					'text' : 'Receipt Date.',
					'datafield' : 'receiptDate',
					'width' : '25%',
					cellsalign : 'center',
					align : 'center',
					cellsformat : 'dd/MM/yyyy',
					editable : false
				}, {
					'text' : 'Receipt Number',
					'datafield' : 'receiptNo',
					'width' : '25%',
					cellsalign : 'center',
					align : 'center',
					editable : false
				}, {
					'text' : 'Advance Amount',
					'datafield' : 'amount',
					'width' : '25%',
					cellsformat : 'd2',
					cellsalign : 'right',
					align : 'center',
					editable : false
				}, {
					'text' : 'Rate Confirmation Y/N',
					'datafield' : 'isCinfirmed',
					'width' : '25%',
					cellsalign : 'center',
					align : 'center',
					editable : false
				} ],

				showaggregates : true,
				showstatusbar : true,
			});
		}
	}

	$("#jqxgrid").jqxGrid(
	 {		
		rowdetails : true,
		width : '100%',
        sortable: true,         
        virtualmode: false,
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
    	autoheight: true,
		showstatusbar: false,
		rowsheight : 35,
		initrowdetails : initrowdetails,
		rowdetailstemplate : {
		rowdetails : "<div id='grid' style='margin: 10px;' 'margin-bottom : 10px;' 'margin-top:10px;'></div>",
		rowdetailsheight : 220,
		rowdetailshidden : true
	},
});
}

$('#search').on('click', function() {
	advancePendingGrid();
	$("#jqxgrid").show();
});

$("#export").on("click",function() {
		   var data;
		   var newData = [];
	
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
			    postJSON('/OrderExecution/api/v1/exportOrderAdvancePendingList',JSON.stringify(advancePendingFieldFilters()),function(response) {
			    if(response.resCode == "1"){
			 	var data = response.payload.list;
			    for (i = 0; i < data.length; i++) {
				newData.push({
							  'Store Code' : (data[i].storeName != null) ? data[i].storeName : "",
							  'Order Date' : (data[i].orderDate != null) ? data[i].orderDate : "",
							  'Customer Id' : (data[i].customerId != null) ? data[i].customerId : "",
							  'Customer Name' : (data[i].customerName != null) ? data[i].customerName : "",
							  'Order No' : (data[i].orderNo != null) ? data[i].orderNo : "",
							  'Order Status' : (data[i].orderStatus != null) ? data[i].orderStatus : "",
							  'Order Status Date' : (data[i].orderStatusDate != null) ? data[i].orderStatusDate : "",
							  'Order Created By' : (data[i].orderCreatedBy != null) ? data[i].orderCreatedBy : "",
							  'Receipt Date' : (data[i].recptDate != null) ? data[i].recptDate : "",
							  'Receipt No' : (data[i].recptNo != null) ? data[i].recptNo : "",
							  'Advance Amount' : (data[i].advanceAmount != null) ? data[i].advanceAmount : "",
							  'Order Rate Confirm Flag' : (data[i].orderRateConfirmFlag != null) ? data[i].orderRateConfirmFlag : ""
				    });				
			    }
			  // JSONToCSVConvertor(newData,	"Order Advance Pending" + "_" + sysdate, true);	
			    var opts = [{sheetid:'Order_Advance_Pending',header:true}];
                var res = alasql('SELECT * INTO XLSX("Order Advance Pending_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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



$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

// Clear grid and reset input and Drop down value
$("#clear").on('click', function() {
	window.location.href="javascript:showContentPage('orderAdvancePending', 'bodySwitcher')"
	/*var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();*/
});

// Print Functionality to be done by Venkat
// #######################################
$("#printOA").on('click', function() {

	var storeId = $('#storeId-value').val();
	var orderNo = $('#orderNo').val();
	var CustId = $('#customerId').val();
	var customerName = $('#customerName').val();

	if (storeId == null || storeId == "") {
		var sId = 0;
	} else {
		var sId = storeId;
	}
	if (orderNo == null || orderNo == "") {
		var orderId = 0;
	} else {
		var orderId = orderNo;
	}
	if (CustId == null || CustId == "") {
		var cId = 0;
	} else {
		var cId = CustId;
	}
	if (customerName == null || customerName == "") {
		var custName = "";
	} else {
		var custName = customerName;
	}
	fieldFilters = {
		"fieldFilters" : {
			"storeCodes" : sId,
			"orderNo" : orderId,
			"customerId" : cId,
			"customerName" : custName,
			"mode" : "pdf",
			"reportName" : "RPT_Order_Advance_Pending"
		}
	}
	$.ajax({
		url : 'jasperReport',
		type : 'post',
		data : fieldFilters,
		contentType : "application/x-www-form-urlencoded",
		xhrFields : {
			responseType : "arraybuffer"
		},
		success : function(data) {
			console.log(data);
			if (navigator.msSaveBlob) {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				navigator.msSaveBlob(file, 'RPT_Order_Advance_Pending.pdf');
			} else {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			}
		}
	});

});