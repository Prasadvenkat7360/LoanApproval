// date picker functions
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

$("#createSection").hide();
$("#goBack").hide();
$("#createEvent").on('click',function(){
	$("#createSection").show();
	$("#searchSection").hide();
    $("#createEvent").hide();
    $("#goBack").show();
    
    $("#modeC").val("");
    $("#greetingTypeC").val("");
    $("#custIdC").val("");
    $("#custNameC").val("");
	$('#custTypeObj').multiselect("clearSelection");
});

$("#goBack").on('click',function(){
	$("#createSection").hide();
	$("#searchSection").show();
	$("#createEvent").show();
	$("#goBack").hide();
	$('#postalGrid').jqxGrid('clear');
	$("#postalGrid").hide();
});

$("#lblAlphaOrder").hide();
$("#custNameC").on('blur',function(){
	var custNameC = $('#custNameC').val();
	var regpan = /^[a-zA-Z ]*$/;

	if(custNameC != ""){
		if(regpan.test(custNameC)){
			$("#lblAlphaOrder").hide();
			$("#sendGreeting").prop('disabled',false);
			$("#custNameC").removeClass("validateView");
		} else {
		   // invalid pan card number
			$("#lblAlphaOrder").show();
			$("#custNameC").addClass("validateView");
			$("#sendGreeting").prop('disabled',true);
		}
	}
});

$("#lblIntOrder").hide();
$("#custIdC").on('blur',function(){
	var custIdC = $('#custIdC').val();
	var regpan = /^[0-9]*$/;

	if(custIdC != ""){
		if(regpan.test(custIdC)){
			$("#lblIntOrder").hide();
			$("#sendGreeting").prop('disabled',false);
			$("#custIdC").removeClass("validateView");
		} else {
		   // invalid pan card number
			$("#lblIntOrder").show();
			$("#custIdC").addClass("validateView");
			$("#sendGreeting").prop('disabled',true);
		}
	}
});

// Onload API
var onLoadFunction = function(){
	$.getJSON('/OrderExecution/api/v1/CustomerBirthAnniversaryOnloadLovs', function(data) {
		if(data.resCode == 1){
			var modeList = data.payload.mode;
		$('#modeS').empty().append('<option value="" selected>--Select--</option>');
		$('#modeC').empty().append('<option value="" selected>--Select--</option>');
		
		var modeListArr = [];
		$.each(modeList,function(k,v){
			if(v.id == "Mail" || v.id == "Postal"){
				modeListArr.push(v);
			}
		});
		
		$.each(modeListArr, function(key, val) {
			$('#modeS').append('<option value="' + val.id + '">' + val.name + '</option>');
			$('#modeC').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
			
		$('#greetingTypeS').empty().append('<option value="" selected>--Select--</option>');
		$('#greetingTypeC').empty().append('<option value="" selected>--Select--</option>');

		$.each(data.payload.occassion,	function(k, v) {
			$('#greetingTypeS').append('<option value="' + v.id + '">' + v.name + '</option>');
			$('#greetingTypeC').append('<option value="' + v.id + '">' + v.name + '</option>');

		});
		
		// Customer Type List
		var t = '<select id="custTypeObj"  name="custTypeObj" class="form-control" multiple="multiple">';
		$.each(data.payload.customer, function(key, val) {
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
		
		var c = '<select id="custTypeSObj"  name="custTypeSObj" class="form-control" multiple="multiple">';
		$.each(data.payload.customer, function(key, val) {
			c += '<option value="' + val.id + '">' + val.name + '</option>';
		});
		
		c += '</select>';
		
		$("#custTypeS").html(c);
		
		$("#custTypeSObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		}
	});	
}

onLoadFunction();


// Create Section
$("#sendGreeting").on('click',function(){
	if($("#modeC").val() == "" || $("#greetingTypeC").val() == "" || $("#custTypeObj").val() == "" || $("#custTypeObj").val() == null){
		$.growl.error({
			message : "Please Select Mandatory Fields !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		
		var custTypeObj = $("#custTypeObj").val();
		console.log(custTypeObj);
		if(custTypeObj == null || custTypeObj == ""){
			var custTypeC = "";
		} else{
			var custTypeC = custTypeObj.join(",");
		}
		
		var sendParams = {
				"fieldFilters": {
				    "docType": "CustBirthAnnEmailGreeting",
				    "customer": {
				      "id": $("#custIdC").val(),
				      "name": $("#custNameC").val()
				    },
				    "GreetingType": $("#greetingTypeC").val(),
				    "mode": $("#modeC").val(),
				    "GreetingCustType": custTypeC
				  }
		}
		console.log(sendParams);
		
		/*if($("#modeC").val() == "Postal"){
			delete sendParams.fieldFilters.customer;
			//delete sendParams.fieldFilters.GreetingCustType;
		}*/
		
		postJSON('/OrderExecution/api/v1/CustomerBirthAnniversaryOnChange',JSON.stringify(sendParams),function(data) {
			if(data.resCode == "1"){
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				
				$("#custIdC").val("");
				$("#custNameC").val("");
				if($("#modeC").val() == "Postal"){
					$("#postalGrid").show();
					var count = 1;
					$.each(data.payload.list,function(k,v){
						v.srlNo = count;
						count++;
					});
					postalCreateGrid(data.payload.list);
				}else{
					$("#modeC").val("");
					$("#greetingTypeC").val("");
					$('#custTypeObj').multiselect("clearSelection");
				}
				
				
				

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

var postalCreateGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'srlNo', type : 'int'}, 
			{name : 'custName', type : 'string'},
			{name: 'custId', type: 'int'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},

	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#postalGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		columnsheight: 70,
		editable : true,
		theme: 'energyblue',
		columnsresize: true,  
		rowsheight : 35,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		
		columns : [ 
			{ text : 'Srl No', datafield : 'srlNo', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Customer Name', datafield : 'custName', width : '80%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : '', datafield : 'custId', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsrenderer : printRenderer},
		
		]
	});
}

var printRenderer = function(row, column, value) {
    	return '<a class="btn btn-sm btn-primary"  type="button" id='
    	+ row
    	+ ' onclick="printPostalGreeting('
    	+ value
    	+ ')" href="javascript:void(0);" style="padding:2px;" /><i class="fa fa-print fa-lg"></i></a>'
    }

var printPostalGreeting = function(custId){
	var fieldFilters = {
            "fieldFilters" : {
                "Id" : custId,
                "mode":$("#modeC").val(),
                "GreetingType":$("#greetingTypeC").val()
            }
        }
	
	$.ajax({
		url : 'api/v1/GreetingCustPostalView',
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
				navigator.msSaveBlob(file, 'RPT_Postal_Greeting.pdf');
			} else {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			}
		}
	});
}

$("#back").on('click',function(){
	$("#modeC").val("");
	$("#greetingTypeC").val("");
	$("#custIdC").val("");
	$("#custNameC").val("");
	$('#custTypeObj').multiselect("clearSelection");
	$("#postalGrid").hide();
});

// Search Section
var sendGreetingFieldFilters = function() {

	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var greetingTypeS = $('#greetingTypeS').val();
	var modeS = $('#modeS').val();
	var stateS = $('#stateS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (greetingTypeS != "" && greetingTypeS != null) {
		fieldFilters.fieldFilters["greetingType"] = greetingTypeS;
	}
	if (modeS != "" && modeS != null) {
		fieldFilters.fieldFilters["intMode"] = modeS;
	}
	
	var custTypeSObj = $("#custTypeSObj").val();

	if(custTypeSObj == null || custTypeSObj == ""){
		var custTypeS = "";
	} else{
		var custTypeS = custTypeSObj.join(",");
	}
	if (custTypeS != "" && custTypeS != null) {
		fieldFilters.fieldFilters["isLoyal"] = custTypeS;
	}
	fieldFilters.fieldFilters["docType"] = "SearchGreetingCustomer";

	return fieldFilters;
}

//Search Grid Started
function generateEventsGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'createdDate','type' : 'string','map' : ''},
		{'name' : 'createdBy','type' : 'string','map' : ''}, 

		{'name' : 'mode','type' : 'string','map' : 'mode'},

		{'name' : 'custType','type' : 'string','map' : ''},
		{'name' : 'gType','type' : 'string','map' : 'greetingType'},
		{'name' : 'count','type' : 'string','map' : ''},
      ];

	var columns = [
		{'text' : 'Created By','datafield' : 'createdBy','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Created Date ','datafield' : 'createdDate','width' : '20%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Mode','datafield' : 'mode','width' : '20%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Customer Type','datafield' : 'custType','width' : '20%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Greeting Type','datafield' : 'gType','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Count','datafield' : 'count','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/CustomerBirthAnniversaryOnChange","list", columns,sendGreetingFieldFilters(), updateRows, "");
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
	window.location.href="javascript:showContentPage('sendGreetingsToCustBdyOrAnv', 'bodySwitcher')"
});