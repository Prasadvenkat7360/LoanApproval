/*
	##	Author1         : 	Raksha (UI)
	## 	Author2 	    :   Dipankar (UI)
	##	Date Creation 	: 	20-04-2017
	## 	Description		:	Job Worker Reminder Search and Export Functionality.
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

$.date = function(dateObject) {
	var d = new Date(dateObject);
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}
	var date = month + "/" + day + "/" + year;
	return date;
};

$.date2 = function(dateObject) {
	var d = new Date(dateObject);
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}
	var date = day + "/" + month + "/" + year;
	return date;
};

// API call for LOV
var onLoadJobWorkerRem = function() {
	$
			.getJSON(
					'/OrderExecution/api/v1/jwrPendingPSRLOVs ',
					function(data) {
						var dclist = data.payload.dcNames;
						var vendorCodeS = data.payload.vendors;
						var orderType = data.payload.orderTypes;

						// DC Name
						var d = '<select id="dcNameObj" name="dcNameObj" class="form-control" multiple="multiple">';
						$.each(dclist, function(key, val) {
							d += '<option value="' + val.id + '">' + val.name
									+ '</option>';
						});
						d += '</select>';
						$("#dcNameS").html(d);
						$('#dcNameObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : false,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left',
							enableCaseInsensitiveFiltering: true,
						});

						// Vendor Codes
						var v = '<select id="vendorCodeObj" name="vendorCodeObj" class="form-control" multiple="multiple">';
						$.each(vendorCodeS, function(key, val) {
							v += '<option value="' + val.id + '">' + val.name
									+ '-' + val.description + '</option>';
						});
						v += '</select>';
						$("#vendorCodes").html(v);
						$('#vendorCodeObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : true,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left',
							enableCaseInsensitiveFiltering: true,
						});

						// Order Type
						var o = '<select id="orderTypeObj" name="orderTypeObj" class="form-control" multiple="multiple">';
						$.each(orderType, function(key, val) {
							o += '<option value="' + val.id + '">' + val.name
									+ '</option>';
						});
						o += '</select>';
						$("#orderTypeS").html(o);
						$('#orderTypeObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : true,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left',
							enableCaseInsensitiveFiltering: true,
						});
					});
}
onLoadJobWorkerRem();

// Field Filters
var jobWorkerRemFieldFilters = function() {
	fieldFilters = {
		"fieldFilters" : {}
	};
	var dcNameObj = $('#dcNameObj').val();
	if (dcNameObj == null || dcNameObj == "") {
		var dcNameS = "";
	} else {
		var dcNameS = dcNameObj.join(",");
	}
	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendorCodes = "";
	} else {
		var vendorCodes = vendorCodeObj.join(",");
	}
	var orderTypeObj = $('#orderTypeObj').val();
	if (orderTypeObj == null || orderTypeObj == "") {
		var orderTypeS = "";
	} else {
		var orderTypeS = orderTypeObj.join(",");
	}
	if (dcNameS != "" && dcNameS != null) {
		fieldFilters.fieldFilters["dcIds"] = dcNameS;
	}
	if (vendorCodes != "" && vendorCodes != null) {
		fieldFilters.fieldFilters["vendorIds"] = vendorCodes;
	}

	if (orderTypeS != "" && orderTypeS != null) {
		fieldFilters.fieldFilters["orderTypes"] = orderTypeS;
	}
	return fieldFilters;
}

function jobWorkerRemGrid() {
	var textField;
	var updateRows = function(rowid, newdata, commit) {
	}
	var orderTypeObj = $('#orderTypeObj').val();
	var orderTypeS = orderTypeObj.join(",");
	if (orderTypeObj == "ST") {
		textField = "Product Type";
	}
	if (orderTypeObj == "CU") {
		textField = "Jewel Type";
	}
	if (orderTypeS == "ST,CU") {
		textField = "Jewel/Product Type";
	}
	var datafields = [ {
		'name' : 'vendorCode',
		'map' : 'vendor>name',
		'type' : 'String'
	}, {
		'name' : 'psrNumber',
		'type' : 'long'
	}, {
		'name' : 'storeName',
		'map' : 'storeOrDc>name',
		'type' : 'string'
	}, {
		'name' : 'orderIdCode ',
		'map' : 'order>orderNo',
		'type' : 'long'
	}, {
		'name' : 'serialNumber',
		'type' : 'long'
	}, {
		'name' : 'orderType',
		'map' : 'order>orderType',
		'type' : 'string'
	}, {
		'name' : 'orderKind',
		'map' : 'oKind>id',
		'type' : 'String'
	}, {
		'name' : 'jewelType',
		'map' : 'jewelType>description',
		'type' : 'String'
	}, {
		'name' : 'psrSubCat',
		'type' : 'string'
	}, {
		'name' : 'isDesignRequiredFlag',
		'type' : 'String'
	}, {
		'name' : 'designRefNo',
		'type' : 'long'
	}, {
		'name' : 'expectedPieces',
		'type' : 'long'
	}, {
		'name' : 'weightType',
		'map' : 'metalWeightType>name',
		'type' : 'String'
	}, {
		'name' : 'expectedFromWeight',
		'type' : 'double'
	}, {
		'name' : 'expectedToWeight',
		'type' : 'double'
	}, {
		'name' : 'finishedPieces',
		'type' : 'long'
	}, {
		'name' : 'finishedNetWeight',
		'type' : 'double'
	}, {
		'name' : 'vPrdctCode',
		'type' : 'string',
		'map' : 'vendorProductCode'
	}, {
		'name' : 'pendingPieces',
		'type' : 'long'
	},  {
		'name' : 'psrNumber',
		'type' : 'int'
	}, {
		'name' : 'orderRaisedBy',
		'map' : 'salesExecutive>name',
		'type' : 'String'
	}, {
		'name' : 'releaseDate',
		'type' : 'date'
	}, {
		'name' : 'vendorDueDate',
		'type' : 'date'
	} ];
	var columns = [
			{
				'text' : 'Vendor Code-PSR No',
				'datafield' : 'vendorCode',
				'width' : '5%',
				cellsalign : 'left',
				align : 'center',
				sortable : true,
				editable : false
			},
			{
				'text' : 'Store/DC Name',
				'datafield' : 'storeName',
				'width' : '6%',
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Order No.',
				'datafield' : 'orderIdCode ',
				'width' : '3.5%',
				cellsalign : 'center',
				align : 'center',
				sortable : true,
				editable : false
			},
			{
				'text' : 'Order Sl.',
				'datafield' : 'serialNumber',
				'width' : '3.5%',
				cellsalign : 'center',
				align : 'center',
				sortable : true,
				editable : false
			},
			{
				'text' : 'PSR No',
				'datafield' : 'psrNumber',
				'width' : '3.5%',
				cellsalign : 'center',
				align : 'center',
				sortable : true,
				editable : false
			},
			{
				'text' : 'Order Type',
				'datafield' : 'orderType',
				'width' : '3.5%',
				sortable : false,
				editable : false,
				cellsalign : 'center',
				align : 'center'
			},
			{
				'text' : 'Order Kind',
				'datafield' : 'orderKind',
				'width' : '3.5%',
				sortable : false,
				editable : false,
				cellsalign : 'center',
				align : 'center'
			},
			{
				'text' : textField,
				'datafield' : 'jewelType',
				'width' : '5%',
				sortable : false,
				editable : false,
				cellsalign : 'center',
				align : 'center'
			},
			{
				text : 'Sub Cat.',
				datafield : 'psrSubCat',
				editable : false,
				cellsalign : 'left',
				align : 'center',
				sortable : false,
				'width' : '10%'
			},
			{
				text : 'Design Enclosed Y/N',
				datafield : 'isDesignRequiredFlag',
				editable : false,
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				'width' : '4%'
			},
			{
				text : 'Design Ref No',
				datafield : 'designRefNo',
				editable : false,
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				'width' : '4%'
			},
			{
				text : 'Vendor Prod Code',
				datafield : 'vPrdctCode',
				editable : false,
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				'width' : '5%'
			},
			{
				text : 'Pcs',
				datafield : 'expectedPieces',
				editable : false,
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				'width' : '3%'
			},
			{
				text : 'Wt Type',
				datafield : 'weightType',
				editable : false,
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				'width' : '5%'
			},
			{
				text : 'From Wt.',
				datafield : 'expectedFromWeight',
				editable : false,
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd3',
				columngroup : "expectedWt",
				sortable : false,
				'width' : '5%'
			},
			{
				text : 'To Wt.',
				datafield : 'expectedToWeight',
				editable : false,
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd3',
				columngroup : "expectedWt",
				sortable : false,
				'width' : '5%'
			},
			{
				text : 'Received Pcs',
				datafield : 'finishedPieces',
				editable : false,
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				'width' : '4%'
			},
			{
				text : 'Received Wt.',
				datafield : 'finishedNetWeight',
				editable : false,
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd3',
				sortable : false,
				'width' : '5%'
			},
			{
				text : 'Pending Pcs',
				datafield : 'pendingPieces',
				editable : false,
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				'width' : '4%'
			},
			{
				text : 'Order Raised By',
				datafield : 'orderRaisedBy',
				editable : false,
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				'width' : '5%'
			},
			{
				text : 'Release Dt.',
				datafield : 'releaseDate',
				editable : false,
				cellsalign : 'center',
				align : 'center',
				cellsformat : 'dd/MM/yyyy',
				sortable : false,
				'width' : '6%'
			},
			{
				text : 'Vendor Due Dt.',
				datafield : 'vendorDueDate',
				editable : false,
				cellsalign : 'center',
				align : 'center',
				cellsformat : 'dd/MM/yyyy',
				sortable : false,
				'width' : '5%',
				cellsrenderer : function(row, columnfield, value, defaulthtml,
						columnproperties) {
					var gridDate = $.date(value);
					var gridDate2 = new Date(gridDate);
					var sysdate = new Date();
					var day = gridDate2.getDate();

					if (!isNaN(day)) {
						if (gridDate2.setHours(0, 0, 0, 0) < sysdate.setHours(
								0, 0, 0, 0)) {
							return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:40px;">'
									+ $.date2(gridDate) + '</div>';
						} else {
							return '<div style="text-align:center; margin: 0;  color: #000; padding-top:10px; height:40px;">'
									+ $.date2(gridDate) + '</div>';
						}
					}

				}
			} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/jwrPendingPSRSearch",
			"list", columns, jobWorkerRemFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	autorowheight :true,
        autoheight :true,
        columnsheight: 50,
    	theme: 'energyblue',
        columnsresize: true,  
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		columngroups : [ {
			text : 'Expected Wt.',
			name : 'expectedWt',
			align : 'center'
		} ]
	});
}

var dateFormatCheck = function() {
	var rows = $("#jqxgrid").jqxGrid('getrows');
	console.log(rows);
}

// Export function for jOB Worker Reminder
$("#export").on("click",function() {
	var data;
	var newData = [];

	var fieldFilters = jobWorkerRemFieldFilters();
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var rows = $("#jqxgrid").jqxGrid('getrows');
	if (typeof rows == "undefined") {
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
	} else {
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if (rows.rowscount != 0) {
			postJSON(
					'/OrderExecution/api/v1/jwrPendingPSRExport',
					JSON.stringify(fieldFilters),
					function(response) {
						if (response != null) {
							data = response.payload.list;
							for (i = 0; i < data.length; i++) {
								newData.push({
											'Vendor Code-PSR No' : (data[i].vendor != null) ? data[i].vendor.name : "",
											'Store/DC Name' : (data[i].storeOrDc.name != null) ? data[i].storeOrDc.name : "",
											'Order No' : (data[i].order.orderNo != null) ? data[i].order.orderNo : "",
											'Order Sl' : (data[i].serialNumber != null) ? data[i].serialNumber : "",
											'PSR No' : (data[i].psrNumber != null) ? data[i].psrNumber : "",
											'Order Type' : (data[i].order != null) ? data[i].order.orderType : "",
											'Order Kind' : (data[i].oKind != null) ? data[i].oKind.name : "",
											'Jewel Type' : (data[i].jewelType != null) ? data[i].jewelType.description : "",
											'Sub Cat' : (data[i].psrSubCat != null) ? data[i].psrSubCat : "",
											'Design Enclosed Y/N' : (data[i].isDesignRequiredFlag != null) ? data[i].isDesignRequiredFlag : "",
											'Design Ref No' : (data[i].designRefNo != null) ? data[i].designRefNo : "",
											'Vendor Prod Code' : (data[i].vendorProductCode != null) ? data[i].vendorProductCode : "",
											'Pieces' : (data[i].expectedPieces != null) ? data[i].expectedPieces : "",
											'Weight Type' : (data[i].metalWeightType != null) ? data[i].metalWeightType.name : "",
											'From Wt.' : (data[i].expectedFromWeight != null) ? data[i].expectedFromWeight : "",
											'To Wt.' : (data[i].expectedToWeight != null) ? data[i].expectedToWeight : "",
											'Recieved Pcs' : (data[i].finishedPieces != null) ? data[i].finishedPieces : "",
											'Recieved Wt' : (data[i].finishedNetWeight != null) ? data[i].finishedNetWeight : "",
											'Pending Pcs' : (data[i].pendingPieces != null) ? data[i].pendingPieces : "",
											'Order Raised By' : (data[i].salesExecutive != null) ? data[i].salesExecutive.name : "",
											'Release Dt.' : (data[i].releaseDate != null) ? data[i].releaseDate : "",
											'Vendor Due Dt.' : (data[i].vendorDueDate != null) ? data[i].vendorDueDate : "",
									});
							}
							var opts = [{sheetid:'Pending_PSR_Reminder',header:true}];
					        var res = alasql('SELECT * INTO XLSX("Pending_PSR_Reminder_'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
						}
					});
		} else {
			$.growl.error({
				message : "No Data to Export.",
				duration : 10000
			});
			return false;
		}
	}
});

// On click on search button it will load grid
$('#jobWorkerReminder').validate(
		{
			errorElement : 'label',
			errorClass : 'help-inline',
			focusInvalid : false,
			ignore : "",
			rules : {
				"vendorCodeObj" : {
					required : true
				},
				"orderTypeObj" : {
					required : true
				}
			},
			errorPlacement : function(error, element) {
				if (element.context.name == "vendorCodeObj"
						|| element.context.name == "orderTypeObj") {
					error.insertAfter(element.parent());
				} else {
					error.insertAfter(element);
				}
			},
			submitHandler : function(form) {
				jobWorkerRemGrid();

				$("#jqxgrid").show();
				return false;
			}
		});

// Clear grid and reset input and Drop down value
$('#clear').on('click', function() {
	$('#vendorCodeObj').multiselect("clearSelection");
	$('#dcNameObj').multiselect("clearSelection");
	$('#orderTypeObj').multiselect("clearSelection");

	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
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
$("#printJWR").on('click', function() {

	var dcNameObj = $('#dcNameObj').val();
	if (dcNameObj == null || dcNameObj == "") {
		var dcNameS = "";
	} else {
		var dcNameS = dcNameObj.join(",");
	}
	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vendorCodes = "";
	} else {
		var vendorCodes = vendorCodeObj.join(",");
	}
	var orderTypeObj = $('#orderTypeObj').val();
	if (orderTypeObj == null || orderTypeObj == "") {
		var orderTypeS = "";
	} else {
		var orderTypeS = orderTypeObj.join(",");
	}
	fieldFilters = {
		"fieldFilters" : {
			"vendorId" : vendorCodes,
			"orderTypes" : orderTypeS,
			"dcId" : dcNameS,
			"mode" : "pdf",
			"reportName" : "RPT_Job_Worker_Reminder"
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
				navigator.msSaveBlob(file, 'RPT_Job_Worker_Reminder.pdf');
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

$("#emailJWR").on(
		'click',
		function() {

			fieldFilters = {
				"fieldFilters" : {}
			};
			var dcNameObj = $('#dcNameObj').val();
			if (dcNameObj == null || dcNameObj == "") {
				var dcNameS = "";
			} else {
				var dcNameS = dcNameObj.join(",");
			}
			var vendorCodeObj = $('#vendorCodeObj').val();
			if (vendorCodeObj == null || vendorCodeObj == "") {
				var vendorCodes = "";
			} else {
				var vendorCodes = vendorCodeObj.join(",");
			}
			var orderTypeObj = $('#orderTypeObj').val();
			if (orderTypeObj == null || orderTypeObj == "") {
				var orderTypeS = "";
			} else {
				var orderTypeS = orderTypeObj.join(",");
			}

			if (dcNameS != "" && dcNameS != null) {
				fieldFilters.fieldFilters["dcIds"] = dcNameS;
			}
			if (vendorCodes != "" && vendorCodes != null) {
				fieldFilters.fieldFilters["vendorIds"] = vendorCodes;
			}

			if (orderTypeS != "" && orderTypeS != null) {
				fieldFilters.fieldFilters["orderTypes"] = orderTypeS;
			}
			params = {
				"fieldFilters" : {
					"vendorIds" : vendorCodes,
					"orderTypes" : orderTypeS,
					"dcIds" : dcNameS
				}
			}
			postJSON('/OrderExecution/api/v1/sendEmailForJWR', JSON
					.stringify(jobWorkerRemFieldFilters()), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
				} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000,
						title : 'Error'
					});
				}

			});
		});

$('#vendorCodes').bind('change', function() {
	var vendorCodeObj = $("#vendorCodeObj").val();
	if (vendorCodeObj == null) {
		$("#emailJWR").prop('disabled', true);
	} else {
		if (vendorCodeObj.length == 1) {
			$("#emailJWR").prop('disabled', false);

		} else {
			$("#emailJWR").prop('disabled', true);
		}
	}

});