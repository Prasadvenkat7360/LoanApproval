$("#createSection").hide();
$("#home1").hide();
$("#goBack").hide();

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

$("#createEvent").on('click',function(){
	$("#createSection").show();
	$("#searchSection").hide();
	
	$("#createEvent").hide();
	$("#home").hide();

	$("#home1").show();
	$("#goBack").show();
	
	// Store Names
	$.getJSON('/OrderExecution/api/v1/sendPromotionEventsLOV', function(data) {
		$('#storeNameC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.stores, function(key, val) {
			$('#storeNameC').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
	});
	
	$('#promoTypeC').val("");
	$('#modeC').val("");
	$('#cityObj').multiselect("clearSelection");
	$('#custTypeObj').multiselect("clearSelection");
	
	$('#countryC').val("");
	$('#countryIdC').val("");
	
	$('#stateC').val("");
	$('#stateIdC').val("");
});

$("#goBack").on('click',function(){
	$("#createSection").hide();
	$("#searchSection").show();
	
	$("#createEvent").show();
	$("#home").show();

	$("#home1").hide();
	$("#goBack").hide();
});

var onload = function(){
	$.getJSON('/OrderExecution/api/v1/createPromotionEventsLOV', function(data) {
	 $('#promoTypeC').empty().append('<option value="" selected>--Select--</option>');

		$.each(data.payload.promoTypes, function(key, val) {
		$('#promoTypeC').append('<option value="' + val.id + '">' + val.name + '</option>');
		
		// Promo Type
		var p = '<select id="promoTypeObj"  name="promoTypeObj" class="form-control" multiple="multiple">';
		$.each(data.payload.promoTypes, function(key, val) {
			p += '<option value="' + val.name + '">' + val.name + '</option>';
		});
		
		p += '</select>';
		
		$("#promoTypeS").html(p);
		
		$("#promoTypeObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	 });
		
	 $('#countryS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.countryList, function(key, val) {
		$('#countryS').append('<option value="' + val.id + '">' + val.name + '</option>');
	 });
  });
	
	
	
	// City
	var w = '<select id="cityObj" class="form-control" multiple="multiple"></select>';
	$("#cityC").html(w);
	$('#cityObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var t = '<select id="citySObj" class="form-control" multiple="multiple"></select>';
	$("#cityS").html(t);
	$('#citySObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var custTypeList = [  {"id": "Loyalty","name": "Loyalty"},
	      {"id": "NonLoyalty","name": "Non-Loyalty"}];
	
	// Customer Type List
	var t = '<select id="custTypeObj"  name="custTypeObj" class="form-control" multiple="multiple">';
	$.each(custTypeList, function(key, val) {
		t += '<option value="' + val.id + '">' + val.name + '</option>';
	});
	
	t += '</select>';
	
	$("#custTypeC").html(t);
	
	$("#custTypeObj").multiselect({
	includeSelectAllOption : true,
	maxHeight : 250,
	numberDisplayed : 1,
	buttonClass : 'col-md-12 form-control text-left'
	});
}
onload();

// load states 
$("#countryS").on('change',function(){
	if($("#countryS").val() != ""){
		$.getJSON('/OrderExecution/api/v1/createPromotionEventsLOV?contryId='+$("#countryS").val(), function(data) {
			 $('#stateS').empty().append('<option value="" selected>--Select--</option>');
				$.each(data.payload.stateList, function(key, val) {
				$('#stateS').append('<option value="' + val.id + '">' + val.name + '</option>');
			 });
		});
	}
});

// load cities
$("#stateS").on('change',function(){
	if($("#stateS").val() != ""){
		$.getJSON('/OrderExecution/api/v1/createPromotionEventsLOV?stateId='+$("#stateS").val(), function(data) {
				// City List
				var c = '<select id="citySObj"  name="citySObj" class="form-control" multiple="multiple">';
				$.each(data.payload.cityList, function(key, val) {
					c += '<option value="' + val.id + '">' + val.name + '</option>';
				});
				
				c += '</select>';
				
				$("#cityS").html(c);
				
				$("#citySObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
		});
	}
});

$('#storeNameC').on('change',function(){
	if($('#storeNameC').val() != ""){
		
		$.getJSON('/OrderExecution/api/v1/sendPromotionEventsLOV?storeAddressId='+$('#storeNameC').val(), function(data) {
			if(data.resCode == 1){
				$("#countryIdC").val(data.payload.country.id);
				$("#countryC").val(data.payload.country.name);
				
				$("#stateIdC").val(data.payload.state.id);
				$("#stateC").val(data.payload.state.name);
				
				var cityList = [];
				 cityList = data.payload.city;
				 
				// City List
				var c = '<select id="cityObj"  name="cityObj" class="form-control" multiple="multiple">';
				$.each(cityList, function(key, val) {
					c += '<option value="' + val.id + '">' + val.name + '</option>';
				});
				
				c += '</select>';
				
				$("#cityC").html(c);
				
				$("#cityObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
				
				
			}
		});
	}
});

var generateEventsFieldFilters = function() {

	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var promoTypeS = $('#promoTypeS').val();
	var countryS = $('#countryS').val();
	var stateS = $('#stateS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	var promoTypeObj = $("#promoTypeObj").val();
	if(promoTypeObj == null || promoTypeObj == ""){
		var promoTypeS = "";
	} else{
		var promoTypeS = promoTypeObj.join(",");
	}
	if(promoTypeS != null && promoTypeS !=""){
		fieldFilters.fieldFilters["promoTypes"] = promoTypeS;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (countryS != "" && countryS != null) {
		fieldFilters.fieldFilters["countryId"] = countryS;
	}
	if (stateS != "" && stateS != null) {
		fieldFilters.fieldFilters["stateId"] = stateS;
	}
	
	var citySObj = $("#citySObj").val();

	if(citySObj == null || citySObj == ""){
		var cityS = "";
	} else{
		var cityS = citySObj.join(",");
	}
	if (cityS != "" && cityS != null) {
		fieldFilters.fieldFilters["cityIdList"] = cityS;
	}
	
	return fieldFilters;
}

//Search Grid Started
function generateEventsGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'createdDate','type' : 'string','map' : 'createdDate'},
		{'name' : 'createdBy','type' : 'string','map' : 'createdBy'}, 
		{'name' : 'store','type' : 'string','map' : 'storeName'},

		{'name' : 'mode','type' : 'string','map' : 'mode'},
		{'name' : 'loyaltyCust','type' : 'string','map' : 'totalLoyalCustomer'},
		{'name' : 'nonloyaltyCust','type' : 'string','map' : 'totalNonLoyalCustomer'},

		{'name' : 'country','type' : 'string','map' : 'country'},
		{'name' : 'state','type' : 'string','map' : 'state'},
		{'name' : 'city','type' : 'string','map' : 'city'},
		{'name' : 'promoType','type' : 'string','map' : 'promoType'},

        ];

	var columns = [
		{'text' : 'Created By','datafield' : 'createdBy','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},

		{'text' : 'Created Date ','datafield' : 'createdDate','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Store','datafield' : 'store','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},

		{'text' : 'Promotion Type','datafield' : 'promoType','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Total Loyalty Customer','datafield' : 'loyaltyCust','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Total Non Loyalty Customer','datafield' : 'nonloyaltyCust','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 

		{'text' : 'Country','datafield' : 'country','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'State','datafield' : 'state','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'City','datafield' : 'city','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Mode','datafield' : 'mode','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchPromotionEvents","list", columns,generateEventsFieldFilters(), updateRows, "");
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
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" ){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 1000,
			title :'Error'
		});
		return false;
	}else{
		generateEventsGrid();
		$("#jqxgrid").show();
	}
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('generatePromoEvents', 'bodySwitcher')"
});

$("#sendEvent").on('click',function(){
	if($("#storeNameC").val() == "" || $("#custTypeObj").val() == "" || $("#custTypeObj").val() == null || $("#promoTypeC").val() == "" || $("#modeC").val() == "" || $("#cityObj").val() == null ||
			$("#cityObj").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		var cityObj = $("#cityObj").val();
		/*if(cityObj == null || cityObj == ""){
			var cityC = "";
		} else{
			var cityC = cityObj.join(",");
		}*/
		
		var custTypeObj = $("#custTypeObj").val();
		console.log(custTypeObj);
		if(custTypeObj == null || custTypeObj == ""){
			var custTypeC = "";
		} else{
			var custTypeC = custTypeObj.join(",");
		}
		
		var sendParams = {
				"storeId": $("#storeNameC").val(),
				"countryId":$("#countryIdC").val(),
				"stateId": $("#stateIdC").val(),
				"cityIdList":cityObj,
				"promoType": $("#modeC").val(),
				"mode":$("#promoTypeC").val(),
				"customerType":custTypeObj
		}
		
		postJSON('/OrderExecution/api/v1/sendPromotionEvents',JSON.stringify(sendParams),function(data) {
			if(data.resCode == 1){
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				
				$("#storeNameC").val("");
				$("#countryIdC").val("");
				$("#stateIdC").val("");
				$("#countryC").val("");
				$("#stateC").val("");
				$("#promoTypeC").val("");
				$("#modeC").val("");
				$('#cityObj').multiselect("clearSelection");
				$('#custTypeObj').multiselect("clearSelection");
				
				 //$("#createIntimation").modal('hide');
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});

$("#back").on('click',function(){
	$("#storeNameC").val("");
	$("#countryIdC").val("");
	$("#stateIdC").val("");
	$("#countryC").val("");
	$("#stateC").val("");
	$("#promoTypeC").val("");
	$("#modeC").val("");
	$('#cityObj').multiselect("clearSelection");
	$('#custTypeObj').multiselect("clearSelection");
});