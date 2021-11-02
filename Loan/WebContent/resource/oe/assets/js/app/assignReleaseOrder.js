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

//API call for LOV.................................
		$.getJSON(
				'/OrderExecution/api/v1/wOrderLOV?page=AROrder',
				function(data) {

					// iterate over the data and append a select option

					/*var v = '<select id="vendorsObj" class="form-control" multiple="multiple">';
					$.each(data.payload.vType, function(key, val) {
						v += '<option value="' + val.id + '">' + val.name
								+ '</option>';
					});
					v += '</select>';
					$("#vendorsCon").html(v);
					$('#vendorsObj').multiselect({
						includeSelectAllOption : true,
						enableFiltering : false,
						maxHeight : 250,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
					});*/
					
					var seg = '<select id="segmentsObj" class="form-control" multiple="multiple">';
					$.each(data.payload.sTypes, function(key, val) {
						seg += '<option value="' + val.id + '">'
								+ val.description + '</option>';
					});
					seg += '</select>';
					$("#segmentsCon").html(seg);
					$('#segmentsObj').multiselect({
						includeSelectAllOption : true,
						enableFiltering : false,
						maxHeight : 250,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
					});

					var okind = '<select id="orderKindsObj" class="form-control" multiple="multiple">';
					$.each(data.payload.oKind, function(key, val) {
						okind += '<option value="' + val.id + '">' + val.name
								+ '</option>';
					});
					okind += '</select>';
					$("#orderKindsCon").html(okind);
					$('#orderKindsObj').multiselect({
						includeSelectAllOption : true,
						enableFiltering : false,
						maxHeight : 250,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
					});

					var ot = '<select id="orderTypesObj" class="form-control" multiple="multiple">';
					$.each(data.payload.orderTypes, function(key, val) {
						ot += '<option value="' + val.id + '">' + val.name
								+ '</option>';
					});
					ot += '</select>';
					$("#orderTypeCon").html(ot);
					$('#orderTypesObj').multiselect({
						includeSelectAllOption : false,
						enableFiltering : false,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
					});

					//vendors = data.payload.vType;
					var vendor = data.payload.vType;
					var data = [];
					$.each(vendor, function(key, value) {
						data.push({
							value : value.id,
							label : value.name
						});
					});
					$(function() {
						$("#vendorsCon").autocomplete({
							source : data,
							focus : function(event, ui) {
								event.preventDefault();
								$(this).val(ui.item.label);
							},
							select : function(event, ui) {
								event.preventDefault();
								$(this).val(ui.item.label);
								$("#vendorsCon-value").val(ui.item.value);
							}

						});
					});

				});

$("#removeAllRelease").on('click', function() {
	$('#vendorsObj').multiselect("clearSelection");
	$('#segmentsObj').multiselect("clearSelection");
	$('#orderKindsObj').multiselect("clearSelection");
	$('#orderTypesObj').multiselect("clearSelection");
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	updates = new Object();
	window.location.href="javascript:showContentPage('assignReleaseOrder', 'bodySwitcher')";
});

// ///////////////////////////////////////////////////////////////////
var assignReleaseFieldFilters = function() {
 	var storecode = $('#storeCodes-value').val();
	var orderNo = $('#orderNo').val();
	var orderTypeCon = $('#orderTypeCon').val();
	var segmentsCon = $('#segmentsCon').val();
	var orderKindsCon = $('#orderKindsCon').val();
	var vendors = $('#vendorsCon-value').val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (storecode != "" && storecode != null) {
		fieldFilters.fieldFilters["storeCodes"] = storecode;
	}
	if (orderNo != "" && orderNo != null) {
		fieldFilters.fieldFilters["orderNo"] = orderNo;
	}
	
	var segmentsObj = $('#segmentsObj').val();
	if (segmentsObj == null || segmentsObj == "") {
		var segmentsCon = "";
	} else {
		var segmentsCon = segmentsObj.join(",");
	}
	if (segmentsCon != "" && segmentsCon != null) {
		fieldFilters.fieldFilters["segment"] = segmentsCon;
	}
	
	var orderTypesObj = $('#orderTypesObj').val();
	if (orderTypesObj == null || orderTypesObj == "") {
		var orderTypeCon = "";
	} else {
		var orderTypeCon = orderTypesObj.join(",");
	}
	if (orderTypeCon != "" && orderTypeCon != null) {
		fieldFilters.fieldFilters["orderTypes"] = orderTypeCon;
	}
	
	var orderKindsObj = $('#orderKindsObj').val();
	if (orderKindsObj == null || orderKindsObj == "") {
		var orderKindsCon = "";
	} else {
		var orderKindsCon = orderKindsObj.join(",");
	}
	if (orderKindsCon != "" && orderKindsCon != null) {
		fieldFilters.fieldFilters["orderKinds"] = orderKindsCon;
	}
	
	if (vendors != "" && vendors != null) {
		fieldFilters.fieldFilters["vendors"] = vendors;
	}
	return fieldFilters;
}

$("#Search").on("click", function() {
	var orderTypesObj = $("#orderTypesObj").val();
	if (orderTypesObj == null) {
		$.growl.error({
			message : "Please select order type.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	
	var orderTypeValue = orderTypesObj.toString();
	if(orderTypeValue == "ST,CU" || orderTypeValue == "CU,CO" || orderTypeValue == "ST,CU,CO"){
		$.growl
		.error({
			message : "Order type can not be combination of stock and customer or customer and consignment order.",
			duration : 10000
		});
		$('#orderTypesObj').multiselect('deselect', orderTypesObj);
		$("#orderTypesObj").multiSelect("clearSelection");

		return false;
	}

	assignReleaseVendorSearch();
	$("#jqxgrid").show();

	
	return false;
});


// function to assign and save the vendor............
var messageStr;
$("#Save")
		.on(
				"click",
				function() {
					
					
					var rows = $("#jqxgrid").jqxGrid('getrows');
					var assignRO = [];
					for(var i = 0; i<rows.length; i++){
						
						var vendors = rows[i].vendors;
						
						if(vendors == null){
							var vendors = rows[i].vendorId;
						}else{
							var vendors = rows[i].vendors;
						}
						
						if(vendors != null && typeof vendors != "undefined"){
							if(rows[i].selectionStatus == true){
								var  vDate =  rows[i].vendorDueDate;
								var d = new Date();
								var today = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
								var vendorDate = new Date(vDate);
								var vendorDate = vendorDate.toString('dd/MM/yyyy');
								
								var today = new Date();
								var dd = today.getDate();
								var mm = today.getMonth() + 1; //January is 0!

								var yyyy = today.getFullYear();
								if (dd < 10) {
								  dd = '0' + dd;
								} 
								if (mm < 10) {
								  mm = '0' + mm;
								} 
								var today = dd + '/' + mm + '/' + yyyy;

								var vDate = vendorDate.split('/');

								
								if((new Date(vDate[2],vDate[1],vDate[0]) != new Date(yyyy,mm,dd)) && (new Date(vDate[2],vDate[1],vDate[0]) < new Date(yyyy,mm,dd))) {
									$.growl.error({
										message : "Vendor due date for order "+rows[i].orderNo+" has expired select future Date",
										duration : 5000,
										title : 'Error'
									});
									return false;
								}
								
								var orderItemDueDate = new Date(rows[i].orderItemDueDate);
								var orderItemDueDate = orderItemDueDate.toString('dd/MM/yyyy');
								
								assignRO.push({
												"orderNo": rows[i].orderNo,
											    "orderSl": rows[i].orderSl,
											    "vendorId": vendors,
											    "orderItemNo": rows[i].orderItemNo,
											    "articleCode": rows[i].articleCode,
											    "vendorDueDate": vendorDate,
											    "orderItemDueDate": orderItemDueDate,
											    "vendorInstructions": rows[i].vendorInstructions,
											    "rowId": rows[i].uid,
											    "selectionStatus": rows[i].selectionStatus
											})
									
							}
						}
					}
					console.log(assignRO);
					
				
						if(assignRO.length > 0){
						postJSON('/OrderExecution/api/v1/assignVROrders',JSON.stringify(assignRO),function(data) {

									if (data.resCode == 1) {

										$.growl.notice({
											message : data.mesgStr,
											duration : 10000,
											title : 'Success'
										});
										$("#jqxgrid").jqxGrid("clear");
										updates = new Object();
										window.location.href="javascript:showContentPage('assignReleaseOrder', 'bodySwitcher')";
										assignReleaseVendorSearch();
									} else if (data.resCode == 2) {
										if(data.payload.InvalidVendor != "" ){
											messageStr = data.payload.InvalidVendor;
										}else{
											messageStr = data.payload.invalidVendorDueDate;
										}
										$.growl.error({
											message : messageStr,
											duration : 15000,
											title : 'Error'
										});
										} else if (data.resCode == 3) { 
										$.growl.warning({
											message : data.mesgStr,
											duration : 10000,
											title :'Warning'
										});
									}
								});

						return false;
					} else {
						$.growl
								.error({
									message : "Please choose atleast one item to Assign Vendor",
									duration : 10000
								});
					}
				});

// Smart search for store name..................

$.getJSON('/OrderExecution/api/v1/wOrderLOV?page=ARCode', function(data) {
	storeList = data.payload.storeNames;

	var data = [];
	$.each(storeList, function(key, value) {
		data.push({
			value : value.id,
			label : value.name
		});
	});

	$(function() {
		$("#storeCodes").autocomplete({

			source : data,
			focus : function(event, ui) {

				event.preventDefault();
				$(this).val(ui.item.label);

			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
				$("#storeCodes-value").val(ui.item.value);
			}
		});
	});

});
$("#orderTypeCon").on("change",function(){
	var orderTypeObject = $("#orderTypesObj").val();
	
	if(orderTypeObject == "ST" && orderTypeObject == "CO" || orderTypeObject == "CU"){
		$("#storeCodes").prop('disabled', true);
	}else{
		$("#storeCodes").prop('disabled', false);
	}
	if(orderTypeObject == "ST" || orderTypeObject == "CO")
	{
		$("#storeCodes").prop('disabled', true);
	}else{
		$("#storeCodes").prop('disabled', false);
	}
	
}); 

$(".modal").on("hidden.bs.modal", function(){
	$('#page-content').removeData();
    $('.pagination').twbsPagination('destroy');
});

//Search Functionality...............................
var assignReleaseVendorSearch = function(){
	postJSON('/OrderExecution/api/v1/orderList?page=AROrder', JSON.stringify(assignReleaseFieldFilters()), function(data) {
		if(data.resCode == 1){
			assignReleaseOrderGrid(data.payload.list);
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
		}
	});
}