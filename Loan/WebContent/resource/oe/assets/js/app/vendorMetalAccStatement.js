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
	maxDate : 0
});

$.getJSON('/OrderExecution/api/v1/vendorMetalAccStatementsLOVs', function(data) {
	var vendorList = data.payload.vendors;
	var mSegments = data.payload.metalSegments;
	var data = [];
	$.each(vendorList, function(key, value) {
		data.push({
			value : value.id,
			label : value.description 
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
	
	$('#metalSegment').empty().append('<option value="" selected>--Select--</option>');
	$.each(mSegments, function(key, val) {
		$('#metalSegment').append('<option value="' + val.id + '">' + val.name + "-" + val.description + '</option>');
	});

});

var vendorMetalAccFieldFilters = function(){
	var vendor = $("#vendorCode-value").val();
	var fDate = $("#fromDate").val();
	var tDate = $("#toDate").val();
	var mSegment = $("#metalSegment").val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (vendor != "" && vendor != null) {
		fieldFilters.fieldFilters[""] = vendor;
	}
	if (fDate != "" && fDate != null) {
		fieldFilters.fieldFilters[""] = fDate;
	}
	if (tDate != "" && tDate != null) {
		fieldFilters.fieldFilters[""] = tDate;
	}
	if (mSegment != "" && mSegment != null) {
		fieldFilters.fieldFilters[""] = mSegment;
	}
	
	return fieldFilters;
}

$("#search").on('click',function(){
	var vendor = $("#vendorCode-value").val();
	if($("#fromDate").val() == "" || $("#toDate").val() == "" || $("#metalSegment").val() == "" ||( vendor == "" || vendor == null)){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		
	}
});

$("#export").on('click',function(){
	var vendor = $("#vendorCode-value").val();
	if($("#fromDate").val() == "" || $("#toDate").val() == "" || $("#metalSegment").val() == "" ||( vendor == "" || vendor == null)){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		
	}
});

$("#print").on('click',function(){
	var vendor = $("#vendorCode-value").val();
	if($("#fromDate").val() == "" || $("#toDate").val() == "" || $("#metalSegment").val() == "" ||( vendor == "" || vendor == null)){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		
	}
});