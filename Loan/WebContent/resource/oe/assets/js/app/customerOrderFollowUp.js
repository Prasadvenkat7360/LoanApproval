/*
	##	Author1         : 	Raksha (UI)
	## 	Author2 	    :   Dipankar (UI)
	##  Author [SERVER] :   Shiva Kumar
	##  DOCUMENT		: 	Harshit
	##	Date Creation 	: 	05-04-2017
	## 	Description		:	Search and export functionality for customer order follow up.
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

var onLoadCustOrd = function() {
// GET JSON API CALL FOR LOV
	$.getJSON('/OrderExecution/api/v1/customerOrdersWithVendorsLOV',function(data) {
				var vlist = data.payload.vendorCode;
				var slist = data.payload.storeCode;
				var selist = data.payload.salesExecutive;
				var orderStatusS = data.payload.orderStatus;
				var orNo = data.payload.orderNo;
				
					// vendor names Lov
					var v = '<select id="vendorCodeObj"   name="vendorCodeObj" class="form-control" multiple="multiple">';
						$.each(vlist, function(key, val) {
						v += '<option value="' + val.id + '">'+ val.name + '-' + val.description + '</option>'; });
						v += '</select>';
						$("#vendorCode").html(v);
						$('#vendorCodeObj').multiselect({
						includeSelectAllOption : true,
						enableFiltering : true,
						maxHeight : 250,
						searchable: true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						});

					// Stores Names Lov
					var s = '<select id="storeNameObj"  name="storeNameObj" class="form-control" multiple="multiple">';
						$.each(slist, function(key, val) {
						s += '<option value="' + val.id + '">' + val.name + '</option>'; });
						s += '</select>';
						$("#storeCode").html(s);
						$('#storeNameObj').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						});

					// SE Names Lov
					var se = '<select id="salesExecObj" name="salesExecObj" class="form-control" multiple="multiple">';
						$.each(selist, function(key, val) {
						se += '<option value="' + val.description + '">' + val.name + '</option>'; });
						se += '</select>';
						$("#salesExecutive").html(se);
						$('#salesExecObj').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						});

						// Order status Lov
						var o = '<select id="orderStatusObj" name="orderStatusObj" class="form-control" multiple="multiple">';
							$.each(orderStatusS, function(key, val) {
							o += '<option value="' + val.id + '">' + val.name + '</option>'; });
							o += '</select>';
							$("#orderStatus").html(o);
							$('#orderStatusObj').multiselect({
							includeSelectAllOption : true,
							maxHeight : 250,
							enableFiltering : true,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
							});
							
							
							// smart Search for Order No
							var data = [];
							$.each(orNo, function(key, value) {
							data.push({
								value : value.id,
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

}

onLoadCustOrd();


// smart Search for PSR No
$.getJSON('/OrderExecution/api/v1/customerOrdersWithVendorsPSRLOV', function(
		data) {
	psrNo = data.payload.orderNo;
	var data = [];
	$.each(psrNo, function(key, value) {
		data.push({
			value : value.psrNumber
		});
	});
	$(function() {
		$("#psrNo").autocomplete({
		 source : data,
		 focus : function(event, ui) {
			event.preventDefault();
			$(this).val(ui.item.value);
		},
		 select : function(event, ui) {
			event.preventDefault();
			$(this).val(ui.item.value);
			$("#psrNo-value").val(ui.item.value);
			}
		});
	});
});

// Field Filters

var custOrderDueFieldFilters = function() {
	var vendorCode = $('#vendorCode').val();
	var storeCode = $('#storeCode').val();
	var orderStatus = $('#orderStatus').val();
	var orderNo = $('#orderNo').val();
	var psrNo = $('#psrNo').val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	var storeNameObj = $('#storeNameObj').val();
	if (storeNameObj == null || storeNameObj == "") {
		var storeCode = "";
	} else {
		var storeCode = storeNameObj.join(",");
	}
	var orderStatusObj = $('#orderStatusObj').val();
	if (orderStatusObj == null || orderStatusObj == "") {
		var orderStatus = "";
	} else {
		var orderStatus = orderStatusObj.join(",");
	}
	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendorCode = "";
	} else {
		var vendorCode = vendorCodeObj.join(",");
	}
	var salesExecObj = $('#salesExecObj').val();
	if (salesExecObj == null || salesExecObj == "") {
		var salesExecutive = "";
	} else {
		var salesExecutive = salesExecObj.join(",");
	}
	if (storeCode != "" && storeCode != null) {
		fieldFilters.fieldFilters["storeId"] = storeCode;
	}
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorId"] = vendorCode;
	}
	if (orderStatus != "" && orderStatus != null) {
		fieldFilters.fieldFilters["orderStatus"] = orderStatus;
	}
	if (salesExecutive != "" && salesExecutive != null) {
		fieldFilters.fieldFilters["salesExecutive"] = salesExecutive;
	}
	if (orderNo != "" && orderNo != null) {
		fieldFilters.fieldFilters["orderNo"] = orderNo;
	}
	if (psrNo != "" && psrNo != null) {
		fieldFilters.fieldFilters["psrNo"] = psrNo;
	}
	return fieldFilters;
}

function CustOrderDueGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' : 'storeName',
		'type' : 'string',
		'map' : 'stores>name'
	}, {
		'name' : 'customerName',
		'type' : 'string',
		'map' :'customer>firstName'
	}, {
		'name' : 'phoneNo',
		'map' : 'customer>mobileOne',
		'type' : 'String'
	}, {
		'name' : 'orderNo',
		'map' : 'orderNo',
		'type' : 'long'
	}, {
		'name' : 'orderSl',
		'type' : 'long',
		'map' : 'serialNumber'
	}, {
		'name' : 'vCode',
		'type' : 'string',
		'map' : 'vendors>vendorCode'
	}, {
		'name' : 'psrNo',
		'type' : 'long',
		'map': 'psrNumber'
	}, {
		'name' : 'orderKind',
		'type' : 'string',
		'map' :'oKind>id'
	}, {
		'name' : 'segment',
		'type' : 'string',
		'map': 'segId>description'
	}, {
		'name' : 'jewelType',
		'type' : 'String',
		'map':'jewelType>description'
	}, {
		'name' : 'mainCat',
		'type' : 'String',
		'map':'category>name'
	}, {
		'name' : 'subCat',
		'type' : 'String',
		'map':'subCategory>name'
	}, {
		'name' : 'skinPurity',
		'type' : 'double',
		'map':'itemSkinPurity'
	}, {
		'name' : 'mPurity',
		'type' : 'double',
		'map':'orderItemMeltingPurity'
	}, {
		'name' : 'grossWt',
		'type' : 'double',
		'map':'preRepairGrossWeight'
	}, {
		'name' : 'netWt',
		'type' : 'double',
		'map':'preRepairNetWeight'
	}, {
		'name' : 'weightType',
		'type' : 'string',
		'map':'metalWeightType>id'
	}, {
		'name' : 'fromWt',
		'type' : 'double',
		'map':'expectedFromWeight'
	}, {
		'name' : 'toWt',
		'type' : 'double',
		'map':'expectedToWeight'
	}, {
		'name' : 'linkedToSl',
		'type' : 'String',
		'map':'linkedTosln>id'
	}, {
		'name' : 'designReq',
		'type' : 'string',
		'map':'isDesignRequiredFlag'
	}, {
		'name' : 'capturedDate',
		'type' : 'date',
		'map':'createdDate'
	}, {
		'name' : 'relDate',
		'type' : 'date',
		'map' :'releasedDate'
	}, {
		'name' : 'vendorDueDate',
		'type' : 'date',
		'map':'vendorDueDate'
	}, {
		'name' : 'custDueDate',
		'type' : 'date',
		'map':'orderItemDueDate'
	}, {
		'name' : 'vendorInstructions',
		'type' : 'string',
		'map':'jobWorkerInstruction'
	},  {
		'name' : 'orderStatus',
		'type' : 'String',
		'map':'orderStatus'
	}, {
		'name' : 'remarks',
		'type' : 'int',
		'map':'orderNo'
	}, {
		'name' : 'salesExecutive',
		'type' : 'String',
		'map':'salesExecutive>name'
	} , {
		'name' : 'orderStatusS',
		'type' : 'String',
		'map':'itemStatus'
	} ];
	var columns = [ {
		'text' : 'Store Code',
		'datafield' : 'storeName',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Cust Name',
		'datafield' : 'customerName',
		'width' : '5%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Phone No',
		'datafield' : 'phoneNo',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Order No.',
		'datafield' : 'orderNo',
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Order Sl.',
		'datafield' : 'orderSl',
		'width' : '3%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vCode',
		'width' : '3%',
		sortable : true,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'PSR No.',
		'datafield' : 'psrNo',
		'width' : '3%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		text : 'Order Kind',
		datafield : 'orderKind',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '3.5%'
	}, {
		text : 'Seg',
		datafield : 'segment',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '4.5%'
	}, {
		text : 'Jewel Type',
		datafield : 'jewelType',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Main Cat.',
		datafield : 'mainCat',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Sub Cat.',
		datafield : 'subCat',
		editable : false,
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		'width' : '5%'
	}, {
		text : 'Skin Purity',
		datafield : 'skinPurity',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d2',
		sortable : false,
		'width' : '3%'
	}, {
		text : 'Melting Purity',
		datafield : 'mPurity',
		editable : false,
		cellsformat :'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Pre Repair/RE-RWK/Sample Gross Wt.',
		datafield : 'grossWt',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		sortable : false,
		'width' : '5%'
	}, {
		text : 'Pre Repair/RE-RWK/Sample Net Wt.',
		datafield : 'netWt',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		sortable : false,
		'width' : '5%'
	}, {
		text : 'Wt Type',
		datafield : 'weightType',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		text : 'From',
		datafield : 'fromWt',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		sortable : false,
		columngroup : "weight",
		'width' : '4%'
	}, {
		text : 'To',
		datafield : 'toWt',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		columngroup : "weight",
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Linked To Sl.',
		datafield : 'linkedToSl',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Design Req Y/N',
		datafield : 'designReq',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '3%'
	}, {
		'text' : 'Order Captured Dt. ',
		'datafield' : 'capturedDate',
		'width' : '5%',
		cellsalign : 'center',
		cellsformat : 'dd/MM/yyyy',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		text : 'Order Rel Dt.',
		datafield : 'relDate',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		'width' : '5%'
	}, {
		text : 'Vendor Due Dt.',
		datafield : 'vendorDueDate',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		'width' : '5%'
	}, {
		text : 'Customer Due Dt.',
		datafield : 'custDueDate',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : true,
		'width' : '5%'
	}, {
		text : 'Vendor Inst',
		datafield : 'vendorInstructions',
		editable : false,
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		'width' : '6%'
	}, {
		text : 'Order Status',
		datafield : 'orderStatus',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Order Item Status',
		datafield : 'orderStatusS',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '6%'
	},{
		text : 'Order Follow Up Remarks',
		datafield : 'remarks',
		cellsrenderer : addCustOrderRemarks,
		editable : false,
		cellsalign : 'left',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '6%'
	},{
		text : 'Sales Exe Name',
		datafield : 'salesExecutive',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '4%'
	} ];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchCustomerOrdersWithVendors", "list",columns, custOrderDueFieldFilters(), updateRows, "id");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	autorowheight :true,
        autoheight :true,
        columnsheight: 55,
    	theme: 'energyblue',
        columnsresize: true,  
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		columngroups : [ {
			text : 'Weight',
			name : 'weight',
			align : 'center'
		}]
	});
}

var addCustOrderRemarks =  function(row, column, value) {
	console.log(value);
	var designReq = $('#jqxgrid').jqxGrid("getcellvalue", row,'designReq');
	//if(designReq == "Yes"){
		return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#custOrderRemarks" type="button" id=' 
		+ row
		+ ' onclick="addCustomerRemarks('
		+ value
		+ ')" ><i class="fa fa-eye fa-sm"></i> View </button>';
	/*}else{
		return '<button class="btn btn-sm btn-primary" disabled type="button" id=' 
		+ row
		+ ' ><i class="fa fa-eye fa-sm"></i> View </button>';
	}*/
	 
}

var addCustomerRemarks = function(id){
	var rows = $('#jqxgrid').jqxGrid('getrows');
	var ordSlNoJw;
	
	$.each(rows, function(key, val) {
		 if(val.orderNo  == id){	
			 ordSlNo = val.orderSl; 
		}
	});
	$.getJSON('/OrderExecution/api/v1/getOrderItemRemarks?type=CU'+"&orderNo="+id+"&orderSrlNo="+ordSlNo, function(data) {
		var response = data.payload.remarks.payload.CURemarks;
		var responseJw = data.payload.remarks.payload.JwRemarks;
		var variationRow = "";
		var variationRowJw = "";
		$.each(response, function(k, v) {
			if(v != ""){
				variationRow += "<tr>";
				variationRow += "<td  height='45;' class='text-left' style='border-right:none;border-left:none;border-bottom:none;border-top:none;'>"+ v + "</td>";
				variationRow += "</tr>";
			}
			
		});
		$.each(responseJw, function(k, v) {
			if(v != ""){
				variationRowJw += "<tr>";
				variationRowJw += "<td  height='45;' class='text-left' style='border-right:none;border-left:none;border-bottom:none;border-top:none;'>"+ v + "</td>";
				variationRowJw += "</tr>";
			}
			
		});
		$("#designVariationDetStockJw").html(variationRow);
		$("#designVariationDetStockCu").html(variationRowJw);

	});
}


function nformat(a) {
	   var b = parseInt(parseFloat(a)*100)/100;
	   return b;
	}

// Export function for Customer Order Due
$("#export").on("click",function() {
			var data;
		    var newData = [];
			var fieldFilters = custOrderDueFieldFilters();
			
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
     					postJSON('/OrderExecution/api/v1/exportCustomerOrdersWithVendors',JSON.stringify(fieldFilters),function(response) {
					   if(response != null){
                       data = response.payload.list;
                       for (i = 0; i < data.length; i++) {
                    	   
						newData.push({
							'Store Code' : (data[i].stores != null) ? data[i].stores.name : "",
							'Customer Name' : (data[i].customer != null) ? data[i].customer.firstName : "",
							'Phone No' : (data[i].customer!= null) ? data[i].customer.mobileOne  : "",
							'Order No' : (data[i].orderNo != null) ? data[i].orderNo : "",
							'Order Sl' : (data[i].serialNumber != null) ? data[i].serialNumber : "",
							'Vendor Code' : (data[i].vendors != null) ? data[i].vendors.vendorCode : "",
							'PSR No' : (data[i].psrNumber != null) ? data[i].psrNumber : "",
							'Order Kind' : (data[i].oKind != null) ? data[i].oKind.id	: "",
							'Segment' : (data[i].segId != null) ? data[i].segId.description	: "",
							'Jewel Type' : (data[i].jewelType != null) ? data[i].jewelType.description : "",
							'Main Cat' : (data[i].category != null) ? data[i].category.name : "",
							'Sub Cat' : (data[i].subCategory != null) ? data[i].subCategory.name : "",
							'Skin Purity' : (data[i].itemSkinPurity != null) ? data[i].itemSkinPurity : "",
							'Melting Purity' : (data[i].orderItemMeltingPurity != null) ? data[i].orderItemMeltingPurity : "",
                            'Gross Wt' : (data[i].preRepairGrossWeight != null) ? data[i].preRepairGrossWeight : "",
							'Net Wt' : (data[i].preRepairNetWeight != null) ? data[i].preRepairNetWeight : "",
                            'Weight Type' : (data[i].metalWeightType != null) ? data[i].metalWeightType.id : "",
							'From Wt' : (data[i].expectedFromWeight != null) ? data[i].expectedFromWeight : "",
							'To Wt' : (data[i].expectedToWeight != null) ? data[i].expectedToWeight : "",
							'Linked To Sl' : (data[i].linkedTosln != null) ? data[i].linkedTosln.id : "",
							'Design Req Y/N' : (data[i].isDesignRequiredFlag != null) ? data[i].isDesignRequiredFlag : "",
							'Order Captured Date' : (data[i].createdDate != null) ? data[i].createdDate : "",
							'Order Release Dt' : (data[i].releasedDate != null) ? data[i].releasedDate : "",
                        	'Vendor Due Dt' : (data[i].vendorDueDate != null) ? data[i].vendorDueDate : "",
							'Customer Due Date' : (data[i].orderItemDueDate != null) ? data[i].orderItemDueDate : "",
							'Vendor Instructions' : (data[i].jobWorkerInstruction != null) ? data[i].jobWorkerInstruction : "",
							'Order Status' : (data[i].orderStatus != null) ? data[i].orderStatus : "",
							'Order Item Status' : (data[i].itemStatus != null) ? data[i].itemStatus : "",
                            'Order Follow Up Remarks' : (data[i].remarks != null) ? data[i].remarks	: "",
                            'Sales Executive Name' : (data[i].salesExecutive != null) ? data[i].salesExecutive.name : ""
                           });
								
                       }
                       var opts = [{sheetid:'Order_Follow_Up',header:true}];
                       var res = alasql('SELECT * INTO XLSX("Order Follow Up_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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



// On click on search button it will load grid
/*$('#CustOrderDue').validate({
	errorElement : 'label',
	errorClass : 'help-inline',
	focusInvalid : false,
	ignore : "",
	rules : {
		"storeNameObj" : {
			required : true
		}
	},
	errorPlacement : function(error, element) {
		if (element.context.name == "storeNameObj") {
			error.insertAfter(element.parent());
		} else {
			error.insertAfter(element);
		}
	},
	submitHandler : function(form) {
	
		return false;
	}
});*/

$("#search").on('click',function(){
	var storeName = $("#storeNameObj").val();
		if(storeName == "" || storeName == null){
			$.growl.error({
				message : "Please Fill Mandatory Fields!!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}else{
			CustOrderDueGrid();
			$("#jqxgrid").show();
		}
});

// Clear grid and reset input and Drop down value
$('#clear').on('click', function() {
	$('#vendorCodeObj').multiselect("clearSelection");
	$('#storeNameObj').multiselect("clearSelection");
	$('#salesExecObj').multiselect("clearSelection");
	$('#orderStatusObj').multiselect("clearSelection");

	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('customerOrderFollowUp', 'bodySwitcher')"
});

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

// Print Functionality to be done by Venkat
// #######################################
$("#printCF").on('click', function() {
	var vendorCode = $('#vendorCode').val();
	var storeCode = $('#storeCode').val();
	var orderStatus = $('#orderStatus').val();
	var orderNo = $('#orderNo').val();
	var psrNo = $('#psrNo').val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	var storeNameObj = $('#storeNameObj').val();
	if (storeNameObj == null || storeNameObj == "") {
		var storeCode = "";
	} else {
		var storeCode = storeNameObj.join(",");
	}
	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendorCode = "";
	} else {
		var vendorCode = vendorCodeObj.join(",");
	}

	var salesExecObj = $('#salesExecObj').val();
	if (salesExecObj == null || salesExecObj == "") {
		var salesExecutive = "";
	} else {
		var salesExecutive = salesExecObj.join(",");
	}

	var orderStatusObj = $('#orderStatusObj').val();
	if (orderStatusObj == null || orderStatusObj == "") {
		var orderStatus = "";
	} else {
		var orderStatus = orderStatusObj.join(",");
	}
	var salesExecObj = $('#salesExecObj').val();
	if (salesExecObj == null || salesExecObj == "") {
		var salesExecutive = "";
	} else {
		var salesExecutive = salesExecObj.join(",");
	}
	if (orderNo != "" && orderNo != null) {
		var orderId=orderNo;
	} else {
		orderId = "";
	}

	if (psrNo != "" && psrNo != null) {
		var psrNumber=psrNo;
	} else {
		psrNumber = "";
	}
	fieldFilters = {
		"fieldFilters" : {
			"vendorId" : vendorCode,
			"storeId" : storeCode,
			"orderStatus" : orderStatus,
			"orderId" : orderId,
			"psrNo" : psrNumber,
			"salesExecutive" : salesExecutive,
			"mode" : "pdf",
			"reportName" : "RPT_Customer_Order_Follow_Up"
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
				navigator.msSaveBlob(file, 'RPT_Customer_Order_Follow_Up.pdf');
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

$('#custOrderRemarks').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});
