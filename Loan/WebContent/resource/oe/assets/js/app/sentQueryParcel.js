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

//Date functionality
$("#fromDate").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	//minDate : 0,
	onSelect : function(dateStr) {
		var min = $(this).datepicker('getDate'); // Get selected date
		$("#toDate").datepicker('option', 'minDate', min || '0');

	}
});

$("#toDate").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	//minDate : 0,
	maxDate : 0

});

// API call for sent parcel System No and Courier Name No drop down
$.getJSON('/OrderExecution/api/v1/getSParcelQuery', function(data) {
	$('#parcelSysNo').empty().append('<option value="" selected>--Select--</option>');
	console.log(data.payload.parcelId);
	$.each(data.payload.parcelId, function(key, val) {
		$('#parcelSysNo').append('<option value="' + val.id + '">' + val.id + '</option>');
	});
	$('#courierName').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.couriers, function(key, val) {
		$('#courierName').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	$('#status').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.parcelStatus, function(key, val) {
		$('#status').append('<option value="' + val.id + '">' + val.name + '</option>');
	});

});

// Field Filters
var sentQueryParcelFieldFilters = function() {
	var vendorCode = $('#vendorCode-value').val();
	var dcCode = $("#dcCode-value").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	var parcelSystemNo = $("#parcelSysNo").val();
	var mivNo = $('#mivNo').val();
	var courierName = $('#courierName').val();
	var courierDocNo = $('#courierDNo').val();
	var status = $('#status').val();
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorCode;
	}
	if (dcCode != "" && dcCode != null) {
		fieldFilters.fieldFilters["dcCode"] = dcCode;
	}
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (parcelSystemNo != "" && parcelSystemNo != null) {
		fieldFilters.fieldFilters["parcelNo"] = parcelSystemNo;
	}
	if (mivNo != "" && mivNo != null) {
		fieldFilters.fieldFilters["mivNo"] = mivNo;
	}
	if (courierName != "" && courierName != null) {
		fieldFilters.fieldFilters["courierName"] = courierName;
	}
	if (courierDocNo != "" && courierDocNo != null) {
		fieldFilters.fieldFilters["courierDocNo"] = courierDocNo;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["parcelStatus"] = status;
	}

	return fieldFilters;
}

// Smart Search For Vendor Code

$.getJSON('/OrderExecution/api/v1/getVendorDcCodeSPQuery', function(data) {
	vendorList = data.payload.vendorCode;
	console.log(vendorList);
	var data = [];
	$.each(vendorList, function(key, value) {
		data.push({
			value : value.id,
			label : value.vendorCode + "-" + value.vendorName
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
//Search grid 
function sentQueryParcelGrid() {

	var updateRows = function(rowid, newdata, commit) {

	}
	var datafields = [ {
		'name' : 'createdDate',
		'type' : 'date'
	}, {
		'name' : 'parcelId',
		'type' : 'long'
	}, {
		'name' : 'vendorCode',
		'type' : 'long'
	}, {
		'name' : 'coureirAgencyName',
		'type' : 'string'
	}, {
		'name' : 'courierDocNumber',
		'type' : 'long'
	}, {
		'name' : 'fromPlace',
		'type' : 'String'
	}, {
		'name' : 'toPlace',
		'type' : 'String'
	}, {
		'name' : 'noOfParcels',
		'type' : 'long'
	}, {
		'name' : 'grossWeight',
		'type' : 'long'
	}, {
		'name' : 'insuranceValue',
		'type' : 'long'
	}, {
		'name' : 'insuranceCharges',
		'type' : 'long'
	}, {
		'name' : 'courierCharges',
		'type' : 'long'
	}, {
		'name' : 'vatNumber',
		'type' : 'long'
	}, {
		'name' : 'mivList',
		'type' : 'array'
	}, {
		'name' : 't20WayBill',
		'type' : 'long'
	}, {
		'name' : 'lastChangedDate',
		'type' : 'date'
	}, {
		'name' : 'parcelStatus',
		'type' : 'string'
	}, {
		'name' : 'remarks',
		'type' : 'String'
	}, {
		'name' : 'sentBy',
		'type' : 'string'
	}, {
		'name' : 'lastChangedBy',
		'type' : 'String'
	} ];

	var columns = [ {
		'text' : 'Send Parcel Dt',
		'datafield' : 'createdDate',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'dd/MM/yyyy',
		editable : false
	}, {
		'text' : 'Sent Parcel System No.',
		'datafield' : 'parcelId',
		cellsalign : 'center',
		align : 'center',
		'width' : '7%',
		editable : false
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Courier Name',
		'datafield' : 'coureirAgencyName',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Courier Document No.',
		'datafield' : 'courierDocNumber',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'From Place',
		'datafield' : 'fromPlace',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'To Place',
		'datafield' : 'toPlace',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'No.of Parcels',
		'datafield' : 'noOfParcels',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Parcel Gross Wt.',
		'datafield' : 'grossWeight',
		'width' : '4%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		sortable : false,
		editable : false
	}, {
		'text' : 'Insurance Val in Rs.',
		'datafield' : 'insuranceValue',
		'width' : '5%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		sortable : false,
		editable : false
	}, {
		'text' : 'Insurance Charges in Rs.',
		'datafield' : 'insuranceCharges',
		'width' : '5%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		sortable : false,
		editable : false
	}, {
		'text' : 'Parcel Charges',
		'datafield' : 'courierCharges',
		'width' : '4%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		sortable : false,
		editable : false
	}, {
		'text' : 'GST No.',
		'datafield' : 'vatNumber',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'T20/Way Bill Form No/E-Sugam',
		'datafield' : 't20WayBill',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Parcel Updation Dt',
		'datafield' : 'lastChangedDate',
		'width' : '6%',
		cellsalign : 'center',
		cellsformat : 'dd/MM/yyyy',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Parcel Updated Status',
		'datafield' : 'parcelStatus',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Remarks',
		'datafield' : 'remarks',
		'width' : '6%',
		cellsalign : 'left',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Parcel Sent By ',
		'datafield' : 'sentBy',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Parcel Updated By',
		'datafield' : 'lastChangedBy',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		'width' : '7%'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchSParcelQuery", "list",columns, sentQueryParcelFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true 
	});
	
	var initrowdetails = function(index, parentElement, gridElement, record) {
		$(parentElement).css("z-index", 1000);
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.mivList;
		var inlineSource = {
			datafields : [ {
				'name' : 'mivSrialNo',
				'type' : 'long'
			}, {
				'name' : 'mivDate',
				'type' : 'date',
				'map' : 'createdDate'
			} ],
			id : 'id',
			localdata : data,
			datatype : 'json'
		};
		if (data.length != 0) {
			grid.jqxGrid({
				source : inlineSource,
				width : "95%",
				autoheight: false, 
				height: '100px',
				enabletooltips : true,
				columnsresize : true,
				columns : [ {
					'text' : 'MIV No',
					'datafield' : 'mivSrialNo',
					'width' : '50%',
					cellsalign : 'center',
					align : 'center',
					editable : false
				}, {
					'text' : 'MIV Date',
					'datafield' : 'mivDate',
					'width' : '50%',
					cellsalign : 'center',
					align : 'center',
					cellsformat : 'dd/MM/yyyy',
					editable : false
				} ],

				showaggregates : false,
				showstatusbar : false,
			});
		}
	}

	$("#jqxgrid").jqxGrid({
		                rowdetails : true,
		                sortable : true,
		                altRows : true,
		            	theme: 'energyblue',
		                columnsResize : true,
		                autorowheight :true,
		                autoheight :true,
		                columnsheight: 80,
						rowsheight : 35,
						initrowdetails : initrowdetails,
						ready: function () {
							 $("#jqxgrid").jqxGrid('showrowdetails', 0);
		                },
						rowdetailstemplate : {
							rowdetails : "<div id='grid' style='margin: 5px;overflow: auto;'></div>",
							rowdetailsheight : 110,
							rowdetailshidden : true
						},
					});
}

// Smart Search For Dc Code
$.getJSON('/OrderExecution/api/v1/getVendorDcCodeSPQuery', function(data) {
	dcList = data.payload.dcname;
	console.log(dcList);
	var data = [];
	$.each(dcList, function(key, value) {
		data.push({
			value : value.id,
			label : value.name
		});
	});

	$(function() {
		$("#dcCode").autocomplete({

			source : data,
			focus : function(event, ui) {

				event.preventDefault();
				$(this).val(ui.item.label);
			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
				$("#dcCode-value").val(ui.item.value);
			}
		});
	});

});


$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

//Search Validation
$('#sentQryParcel').validate({
			errorElement : 'label',
			errorClass : 'help-inline',
			focusInvalid : false,
			ignore : "",
			rules : {
    	 "fromDate":{ required: true, dateITA : true},
    	 "toDate":{ required: true, dateITA : true},
    	 "courierDNo":{ digits: true },
    	 "mivNo":{ digits: true },
	   },
		errorPlacement : function(error, element) {
    	if(element.context.name == "fromDate" || element.context.name == "toDate"){
					error.insertAfter(element.parent());
				} else {
					error.insertAfter(element);
				}
			},
			submitHandler : function(form) {
				sentQueryParcelGrid();
				$("#jqxgrid").show();
				return false;
			}
		});

// Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	
});

//Export function for Sent query parcel
$('#export').on('click', function(){
	
	var fieldFilters = sentQueryParcelFieldFilters();
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var rows = $('#jqxgrid').jqxGrid('getrows');
	if (  rows == undefined || rows == 0 ) {
		$.growl
		.error({
			message : "No Data To Export",
			duration : 10000
		});
		return false;
	}else{
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if(rows.rowscount != 0){
	    var newData = [];
	    postJSON('/OrderExecution/api/v1/exportSParcelQuery', JSON.stringify(fieldFilters), function(response) {	
		if(response!=null){
		var data = response.payload.list;	
		for(i=0; i<data.length; i++){
			newData.push({
				            'Sent Parcel Date' : (data[i].sendParcelDate != null) ? data[i].sendParcelDate : "",
							'Sent Parcel System No' : (data[i].parcelId != null) ? data[i].parcelId : "",
							'vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode : "",
							'GIV No' : (data[i].mivNo != null) ? data[i].mivNo : "",
							'GIV Date' : (data[i].mivDate != null) ? data[i].mivDate : "",
							'Courier Name' : (data[i].courierAgencyName != null) ? data[i].courierAgencyName : "",
							'Courier Document No' : (data[i].courierDocNo != null) ? data[i].courierDocNo : "",
							'From Place' : (data[i].fromPlace != null) ? data[i].fromPlace : "",
							'To Place' : (data[i].toPlace != null) ? data[i].toPlace : "",
							'No Of Parcels' : (data[i].NoOfParcels != null) ? data[i].NoOfParcels : "",
							'Parcel Gross Weight' : (data[i].GrossWt != null) ? data[i].GrossWt	: "",
							'Insurance Value in Rs' : (data[i].InsValue != null) ? data[i].InsValue : "",
							'Insurance Charges in Rs' : (data[i].InsCharges != null) ? data[i].InsCharges : "",
							'Parcel Charges' : (data[i].ParcelCharges != null) ? data[i].ParcelCharges: "",
							'GST No' : (data[i].VatNUmber != null) ? data[i].VatNUmber : "",
							'T20/Way Bill Form No/E-Sugam' : (data[i].T20WayBill != null) ? data[i].T20WayBill : "",
							'Parcel Updation Date' : (data[i].parcelUpdationDate != null) ? data[i].parcelUpdationDate : "",
							'Parcel Updated Status' : (data[i].parcelUpdatedStatus != null) ? data[i].parcelUpdatedStatus : "",
							'Remarks' : (data[i].Remarks != null) ? data[i].Remarks : "",
							'Parcel Sent By' : (data[i].sentBy != null) ? data[i].sentBy : "",
							'Parcel Updated By' : (data[i].lastChangedBy != null) ? data[i].lastChangedBy : ""
			   });	
	        }
		  var opts = [{sheetid:'sent_Query_parcel',header:true}];
	      var res = alasql('SELECT * INTO XLSX("sent_Query_parcel'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
		}
	 });
   }else{
	   $.growl
		.error({
			message : "No Data To Export",
			duration : 10000
		});
	   return false;	
	   }
   }
 });