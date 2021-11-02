//num.toFixed(2);
/*  ##	Author UI 		: 	Nageswara Rao
	## 	API Integration	:  	Nageswara Rao
	##  JAVA            :   ShreeVardhan TL
	##	Date Creation 	: 	25-09-2017
	## 	Description		:	PSR Cancellation Intimation UI and Integration.
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

var redirect = function() {
	window.location.href = "javascript:showContentPage('psrCancellationIntimation', 'bodySwitcher')";
	return window.location.href;
}

//date-picker
$("#fromDateC").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0,
	onSelect : function(dateStr) {
		var min = $(this).datepicker('getDate'); // Get selected date
		$("#toDateC").datepicker('option', 'minDate', min || '0');
	}
});
var today = new Date();
$("#toDateC").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0
});
var loggedId = [];
var onLoadOCAopenClose = function() {
	$('#vendorCode').empty().append('<option value="" selected>--Select--</option>');
	$('#orderType').empty().append('<option value="" selected>--Select--</option>');
	$('#psrNo').empty().append('<option value="" selected>--Select--</option>');

	$.getJSON('/OrderExecution/api/v1/psrCancelIntimLOVs',function(data) {
		
		var vendorList = data.payload.vCodeList;
		var orderTypes = data.payload.orderTypes;
		  loggedId = data.payload.loggedInId;
		var v = '<select id="vendorObj" name="vendorObj" class="form-control" multiple="multiple">';
			$.each(vendorList, function(key, val) {
			 v += '<option value="' + val.id + '">' + val.name + '</option>'; });
			 v += '</select>';
			 $("#vendorCode").html(v);
			 $('#vendorObj').multiselect({
			    	includeSelectAllOption : true,
			    	enableCaseInsensitiveFiltering:true,
					enableFiltering : false,
					maxHeight : 250,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
			});
		 var v = '<select id="orderTypeObj" name="orderTypeObj" class="form-control" multiple="multiple">';
			$.each(orderTypes, function(key, val) {
			 v += '<option value="' + val.id + '">' + val.name + '</option>'; });
			 v += '</select>';
			 $("#orderType").html(v);
			 $('#orderTypeObj').multiselect({
			    	includeSelectAllOption : true,
					enableFiltering : false,
					maxHeight : 250,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
			});
	
	});
}
onLoadOCAopenClose();

// PSR No - Smart Search
var listOfPSRNos = function(){
	var fromDateC = $("#fromDateC").val();
	var toDateC = $("#toDateC").val();
	var vendorObj = $("#vendorObj").val();
	var orderTypeObj = $("#orderTypeObj").val();
	if (vendorObj == null || vendorObj == ""){
		var vendorCode = "";
	}else{
		var vendorCode = vendorObj.join(",");
	}
	if (orderTypeObj == null || orderTypeObj == ""){
		var orderType = "";
	}else{
		var orderType = orderTypeObj.join(",");
	}
	if((fromDateC == "" || fromDateC ==null)||(toDateC == "" || toDateC ==null)){
		return false;
	}
	$('#psrNo').empty().append('<option value="" selected>--Select--</option>');
	var fieldFilters = {
			"fieldFilters" : {}
		};
		if (fromDateC != "" && fromDateC != null) {
			fieldFilters.fieldFilters["fromDate"] = fromDateC;
		}
		if (toDateC != "" && toDateC != null) {
			fieldFilters.fieldFilters["toDate"] = toDateC;
		}
		if (vendorCode != "" && vendorCode != null) {
			fieldFilters.fieldFilters["vendorCode"] = vendorCode;
		}
		if (orderType != "" && orderType != null) {
			fieldFilters.fieldFilters["orderType"] = orderType;
		}
		
	 postJSON('/OrderExecution/api/v1/psrCancelIntimPsrNos ',JSON.stringify(fieldFilters),function(data) {
		 var response = data.payload.list;
			var data = [];
			$.each(response, function(key, value) {
				data.push({
					value : value
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
	}


// For SEARCH 
var psrCancelIntimationSearch = function() {
	var fromDateC = $("#fromDateC").val();
	var toDateC = $("#toDateC").val();
	var vendorObj = $("#vendorObj").val();
	var orderTypeObj = $("#orderTypeObj").val();
	var psrNoC = $("#psrNo").val();
	if (vendorObj == null || vendorObj == ""){
		var vendorCode = "";
	}else{
		var vendorCode = vendorObj.join(",");
	}
	if (orderTypeObj == null || orderTypeObj == ""){
		var orderType = "";
	}else{
		var orderType = orderTypeObj.join(",");
	}
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateC != "" && fromDateC != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateC;
	}
	if (toDateC != "" && toDateC != null) {
		fieldFilters.fieldFilters["toDate"] = toDateC;
	}
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorCode;
	}
	if (orderType != "" && orderType != null) {
		fieldFilters.fieldFilters["orderType"] = orderType;
	}
	if (psrNoC != "" && psrNoC != null) {
		fieldFilters.fieldFilters["psrNo"] = psrNoC;
	}	
	return fieldFilters;
};

function searchPsrCancelGrid() {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	var datafields = [ 
		{'name' : 'psrCode', 'type' : 'long', 'map': 'psrNumber'}, 
		{'name' : 'orderType', 'type' : 'string', 'map': 'orderTyp'},
		{'name' : 'orderKind', 'type' : 'string', 'map': 'oKind'},
		{'name' : 'vendorCode', 'type' : 'string', 'map' : 'vendorCode'},
		{'name' : 'jewelCode', 'type' : 'string', 'map' : 'jewelType'},
		{'name' : 'subCategory', 'type' : 'string', 'map' : 'subCategory'},
		{'name' : 'pieces', 'type' : 'long', 'map' : 'expectedPcs'},
		{'name' : 'grossWt', 'type' : 'float', 'map' : 'expGrossWtOrRange'},
		{'name' : 'netWt', 'type' : 'float',	'map' : 'expectedNetWt'},
		{'name' : 'recPcs', 'type' : 'long','map' : 'recievedPcs'}, 
		{'name' : 'recNwt', 'type' : 'float', 'map' : 'recievedNetWt'},
		{'name' : 'cancelDate', 'type' : 'date', 'map' : 'lastChangedDate'},
		{'name' : 'remarks', 'type' : 'string', 'map' : 'remarks'}
		];
	var columns = [ {
		'text' : 'PSR No.',
		'datafield' : 'psrCode',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'Order Type',
		'datafield' : 'orderType',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Order Kind',
		'datafield' : 'orderKind',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'Jewel Code',
		'datafield' : 'jewelCode',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Sub Category',
		'datafield' : 'subCategory',
		'width' : '11%',
		cellsalign : 'left',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Pcs',
		'datafield' : 'pieces',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Exp.Gwt',
		'datafield' : 'grossWt',
		'width' : '8%',
		cellsalign : 'right',
		cellsformat : 'd3',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Exp.Nwt',
		'datafield' : 'netWt',
		'width' : '7%',
		cellsalign : 'right',
		cellsformat : 'd3',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Received Pcs',
		'datafield' : 'recPcs',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Received Nwt',
		'datafield' : 'recNwt',
		'width' : '7%',
		cellsalign : 'right',
		columntype : 'numberinput',
		cellsformat : 'd3',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Cancel Date',
		'datafield' : 'cancelDate',
		'width' : '8%',
		cellsalign : 'center',
		columntype : 'numberinput',
		cellsformat : 'dd/MM/yyyy',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Remarks',
		'datafield' : 'remarks',
		'width' : '10%',
		cellsalign : 'left',
		columntype : 'numberinput',
		align : 'center',
		editable : false,
		sortable : false
	}];
	showMyGrid(datafields, "/OrderExecution/api/v1/psrCancelIntimList", "list",columns, psrCancelIntimationSearch(), updateRows);
	$("#jqxgrid").jqxGrid({		
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
	});
}

// Search Functionality
$("#searchPSR").on('click', function() {
	$form = $('#psrCancelIntimation');
    $form.validate({
        errorElement: 'label', 
        errorClass: 'help-inline', 
        focusInvalid: false, 
        ignore: "",
        rules: {
        	 "fromDateC":{ required: true, dateITA : true},
	    	 "toDateC":{ required: true, dateITA : true},
	    	 "psrNo":{ digits: true },
        },errorPlacement: function(error, element) {
        	if(element.context.name == "fromDateC" || element.context.name == "toDateC"){
        		error.insertAfter(element.parent());
        	}else{
        		error.insertAfter(element);
        	}
        }
    });
    if ($form.valid()) {
    	searchPsrCancelGrid();
    	$("#jqxgrid").show();
    } else {
    	 return false;
    }
    return false;
 });


$("#ClearAll").on("click", function() {
	redirect();
});

//Print Functionality to be done by Venkat
//#######################################
$("#printPSR").on('click', function() {
	var fromDateC = $("#fromDateC").val();
	var toDateC = $("#toDateC").val();
	var vendorObj = $("#vendorObj").val();
	var orderTypeObj = $("#orderTypeObj").val();
	var psrNoC = $("#psrNo").val();
	if (vendorObj == null || vendorObj == ""){
		var vendorCode = "";
	}else{
		var vendorCode = vendorObj.join(",");
	}
	if (orderTypeObj == null || orderTypeObj == ""){
		var orderType = "";
	}else{
		var orderType = orderTypeObj.join(",");
	}
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateC != "" && fromDateC != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateC;
	}
	if (toDateC != "" && toDateC != null) {
		fieldFilters.fieldFilters["toDate"] = toDateC;
	}
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorCode;
	}
	if (orderType != "" && orderType != null) {
		fieldFilters.fieldFilters["orderType"] = orderType;
	}
	if (psrNoC != "" && psrNoC != null) {
		fieldFilters.fieldFilters["psrNo"] = psrNoC;
	}	
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : fromDateC,
			"ToDate" : toDateC,
			"orderTypes":orderType,
			"grPsrNo":psrNoC,
			"vendorId":vendorCode,
			"salesExecutive":loggedId,
			"mode" : "pdf",
			"reportName" : "RPT_PSR_Cancellation_Intimation"
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
				navigator.msSaveBlob(file, 'RPT_PSR_Cancellation_Intimation.pdf');
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


$("#emailPSR").prop('disabled',true);
//Email Functionality Implementation Done By Venkat

$("#emailPSR").on('click', function(){

	var fromDateC = $("#fromDateC").val();
	var toDateC = $("#toDateC").val();
	var vendorObj = $("#vendorObj").val();
	var orderTypeObj = $("#orderTypeObj").val();
	var psrNoC = $("#psrNo").val();
	if (vendorObj == null || vendorObj == ""){
		var vendorCode = "";
	}else{
		var vendorCode = vendorObj.join(",");
	}
	if (orderTypeObj == null || orderTypeObj == ""){
		var orderType = "";
	}else{
		var orderType = orderTypeObj.join(",");
	}
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateC != "" && fromDateC != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateC;
	}
	if (toDateC != "" && toDateC != null) {
		fieldFilters.fieldFilters["toDate"] = toDateC;
	}
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorCode;
	}
	if (orderType != "" && orderType != null) {
		fieldFilters.fieldFilters["orderType"] = orderType;
	}
	if (psrNoC != "" && psrNoC != null) {
		fieldFilters.fieldFilters["psrNo"] = psrNoC;
	}	
	
	if(vendorCode.length!=null)
		{
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : fromDateC,
			"ToDate" : toDateC,
			"orderTypes":orderType,
			"grPsrNo":psrNoC,
			"vendor":vendorCode,
			"salesExecutive":loggedId,
			"mode" : "pdf",
			"reportName" :"RPT_PSR_Cancellation_Intimation_Email_Vendor_Wise"
		}
	}
	 
		postJSON('/OrderExecution/api/v1/sendEmailPsrCancellationByVendor', JSON.stringify(fieldFilters), function(response) {			
			if(response.resCode == 1){
				$.growl.notice({
					message : response.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				return false;
			}else{
				$.growl.error({
					message : response.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
		}	
});

$("#vendorCode").bind('change',function(){
	var vendorObj = $("#vendorObj").val(); 
	if(vendorObj == null)
	{
		$("#emailPSR").prop('disabled',true);
	}
	else
	{
	if(vendorObj.length > 0)
	{
		$("#emailPSR").prop('disabled',false);
	}
	else 
	{

		$("#emailPSR").prop('disabled',true);
	}
		}
})

