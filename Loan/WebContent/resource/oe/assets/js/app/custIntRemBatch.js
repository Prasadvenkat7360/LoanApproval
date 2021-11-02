// Manual Batch run for Customer Order
$("#intRemBatch").on('click',function(){
	$.getJSON('/OrderExecution/api/v1/sendMailForCustomerOrdersManually', function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
});

// Manual Batch run for Approval Bill
$("#intRemBatchAb").on('click',function(){
	$.getJSON('/OrderExecution/api/v1/sendMailReminderForApprovalBill', function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
});

// Failed Batch UI/Error logs
//date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

var onLoadLovFunc = function(){
	$.getJSON('/OrderExecution/api/v1/IntimationReminderTemplateOnLoadLovs', function(data) {
		 $('#intRemRefTypeS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.IRRefDocTypesAll, function(key, val) {
			$('#intRemRefTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
	});
}

onLoadLovFunc();

var failedBatchFieldFilters = function() {
	var intRemRefTypeS = $('#intRemRefTypeS').val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();

	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (intRemRefTypeS != "" && intRemRefTypeS != null) {
		fieldFilters.fieldFilters["intRemRefDocType"] = intRemRefTypeS;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	return fieldFilters;
}

//Search Grid Started
function failedBatchSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'id','type' : 'int','map' : 'id'}, 
		{'name' : 'orderNo','type' : 'string','map' : 'refNo'}, 
		{'name' : 'storeName','type' : 'int','map' : 'store>name'},
		{'name' : 'remark','type' : 'string','map' : 'errorRemarks'}, 
		{'name' : 'intRemType','type' : 'string','map' : 'irType'},
        ];

	var columns = [
		{'text' : 'Id','datafield' : 'id','width' : '20%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Ref No','datafield' : 'orderNo','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Store Name','datafield' : 'storeName','width' : '25%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Remark','datafield' : 'remark','width' : '35%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 

		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchIntimationReminderLogs","list", columns,failedBatchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
		columnsheight: 80,
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
	});
}

$("#search").on('click',function(){
	failedBatchSearchGrid();
	$("#jqxgrid").show();
});

$("#lpExpBatch").on('click',function(){
	$.getJSON('/OrderExecution/api/v1/intimateCustomeronExpiryLoyalPoints', function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
});