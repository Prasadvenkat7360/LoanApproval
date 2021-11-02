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

$.getJSON('/OrderExecution/api/v1/getvendorStoneAccountStmtDetail', function(data) {
	var vendorList = data.payload.vendors;
	var Segments = data.payload.Segments;
	var typeArray =[
		{
			'id':'P',
			'name' : 'PSR'
		},{
			'id':'B',
			'name':'Bulk'
		}
	]
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
	
	var o = '<select id="segmentObj" name="segmentObj" class="form-control" multiple="multiple">';
	$.each(Segments, function(key, val) {
		o += '<option value="' + val.id + '" code="'+ val.name+'">' + val.description + '</option>';
	});
	o += '</select>';
	$("#segmentId").html(o);
	$('#segmentObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
	})
	
	var o = '<select id="typeObj" name="typeObj" class="form-control" multiple="multiple">';
	$.each(typeArray, function(key, val) {
		o += '<option value="' + val.id + '">' + val.name + '</option>';
	});
	o += '</select>';
	$("#typeId").html(o);
	$('#typeObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
	})
});

$("#segmentId").on("change",function(){
	var segID = $("#segmentObj").val();
	postJSON('/OrderExecution/api/v1/getCategoryBySegment', JSON.stringify(segID),function(data) {
	var vendorList = data.payload.catList;
	$('#catId').empty().append('<option value="" selected>--Select--</option>');
		$.each(vendorList, function(key, val) {
			$('#catId').append('<option value="' + val.id + '">'+ val.description + '</option>');
		});
	});
})


var vendorMetalAccFieldFilters = function(){
	var vendor = $("#vendorCode-value").val();
	var fDate = $("#fromDate").val();
	var tDate = $("#toDate").val();
	var Segments = $("#segmentObj").val();
	
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
	if (Segments != "" && Segments != null) {
		fieldFilters.fieldFilters[""] = Segments;
	}
	return fieldFilters;
}

$("#export").on('click',function(){
	var vendor = $("#vendorCode-value").val();
	if($("#fromDate").val() == "" || $("#toDate").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		
	}
});