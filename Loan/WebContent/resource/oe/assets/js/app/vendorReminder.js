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
	
	$("#home").empty();
	$("#home").append("Loyalty Statement - Create");
});

$("#goBack").on('click',function(){
	$("#createSection").hide();
	$("#searchSection").show();
	$("#createEvent").show();
	$("#goBack").hide();
	$('#postalGrid').jqxGrid('clear');
	$("#postalGrid").hide();
	
	$("#home").empty();
	$("#home").append("Loyalty Statement - Search");
});

$("#lblIntOrder").hide();
$("#cardNoC").on('blur',function(){
	var custIdC = $('#cardNoC').val();
	var regpan = /^[0-9]*$/;

	if(custIdC != ""){
		if(regpan.test(custIdC)){
			$("#lblIntOrder").hide();
			$("#sendGreeting").prop('disabled',false);
			$("#cardNoC").removeClass("validateView");
		} else {
		   // invalid pan card number
			$("#lblIntOrder").show();
			$("#cardNoC").addClass("validateView");
			$("#sendGreeting").prop('disabled',true);
		}
	}
});

// Onload API
var onLoadFunction = function(){

	var today = new Date();
	console.log(today);
	var dd1 = today.getDate();
	var mm1 = today.getMonth() + 1;
	var yy1 = today.getFullYear();
	var todayC = dd1 + "/" + mm1 + "/" + yy1;
	
	$("#currDate").val(todayC);
	
	$.getJSON('/OrderExecution/api/v1/psrCancelLOVs', function(data) {
		var vendorCodeS = data.payload.vCodeList;
		var v = '<select id="vendorCodeObj" name="vendorCodeObj" class="form-control" multiple="multiple">';
		$.each(vendorCodeS, function(key, val) {
			v += '<option value="' + val.id + '">' + val.name + '</option>';							
		});
		v += '</select>';
		$("#vendorCode").html(v);
		$('#vendorCodeObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	})
	var params = {
			"fieldFilters":{
				"docType":"CreateOnLoadLov"
				}
				} 
	postJSON('/OrderExecution/api/v1/getVendorMSRReminderOnchangeValues',JSON.stringify(params), function(data) {
		//debugger;
		//alert();
		if(data.resCode == 1){
			var modeList = data.payload.mode;
			var modes = [];
			$.each(modeList,function(k,v){
				if(v.id == "SMS" || v.id == "Mail" || v.id == "Postal" || v.id == "Whatsapp"){
					modes.push(v);
				}
			});
			
		$('#modeS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.intMode, function(key, val) {
			$('#modeS').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
			
		}
	});	
}

onLoadFunction();


//Generate Reminder


$("#reminder").on('click',function(){
	var editfieldfilter = function(){
	var modeS = $('#modeS').val()
	var vendorCode = $('#vendorCodeObj').val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};
		if (modeS != "" && modeS != null) {
			fieldFilters.fieldFilters["intMode"] = modeS;
		}
		
		if (vendorCode != "" && vendorCode != null) {
			fieldFilters.fieldFilters["vCodeList"] = vendorCode.toString();
		}
		return fieldFilters;
	} 
	console.log(editfieldfilter());																										
	
	postJSON('/OrderExecution/api/v1/createVendorIntimationReminder',JSON.stringify(editfieldfilter()),function(data) {
		if(data.resCode == 1){
			 $.growl.notice ({
				message :  data.mesgStr,
				duration : 10000,
				title : 'Success'
			 });
			// $("#createIntimation").modal('hide');

		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title  :'Error'
			});
			return false;
		}
	});
});



// end Generate Reminder



// Create Section
$("#sendLS").on('click',function(){
	if($("#modeC").val() == ""  || $("#custTypeC").val() == "" || $("#Fmonth").val() == "" || $("#Tmonth").val() == ""){
		$.growl.error({
			message : "Please Select Mandatory Fields !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		
		var fromMonth = document.getElementById("Fmonth").value;
		var toMonth = document.getElementById("Tmonth").value;
		
		var fMon =  fromMonth.split('-') ; 
		var tMon =  toMonth.split('-') ; 

		var sendParams = {
				 "fieldFilters": {
				    "fromMonth": fMon[1],
				    "fromYear": fMon[0],
				   "toMonth": tMon[1],
				   "toYear": tMon[0],
				    "intMode": $("#modeC").val(),
				    "custType": $("#custTypeC").val(),
				    "loyaltyCardNo":$("#cardNoC").val()
				  }
				}
		
		console.log(sendParams);
		
		
		
		postJSON('/OrderExecution/api/v1/sendEmailForLoyStatement',JSON.stringify(sendParams),function(data) {
			if(data.resCode == "1"){
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
			
				if($("#modeC").val() == "Postal"){
					$("#postalGrid").show();
					postalCreateGrid(data.payload.list);
					
					$("#modeC").val("");
					$('#custTypeC').val("");
					$('#cardNoC').val("");

					/*$('#Fmonth').val("");
					$('#Tmonth').val("");*/
				}else{
					$("#modeC").val("");
					$('#custTypeC').val("");
					$('#cardNoC').val("");

					$('#Fmonth').val("");
					$('#Tmonth').val("");
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
			{name : 'custName', type : 'string'},
			{name : 'cardNo', type : 'int','map':'loyCardNo'}, 

			{name: 'custId', type: 'int','map':'custId'},
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
			{ text : 'Loyalty Card No', datafield : 'cardNo', width : '30%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Customer Name', datafield : 'custName', width : '60%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
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
    var rowdata = $("#postalGrid").jqxGrid('getrows');
    var cardNo;
    
    var fromMonth = document.getElementById("Fmonth").value;
	var toMonth = document.getElementById("Tmonth").value;
	
	var fMon =  fromMonth.split('-') ; 
	var tMon =  toMonth.split('-') ;
    
    $.each(rowdata,function(k,v){
    	if(v.custId == custId){
    		cardNo = v.cardNo
    	}
    });
	var fieldFilters = {
            "fieldFilters" : {
                "CustomerID" : custId,
                "loyaltyCardNo":cardNo,
                "fromMonth": fMon[1],
			    "fromYear": fMon[0],
			    "toMonth": tMon[1],
			    "toYear": tMon[0],
            }
        }
	
	$.ajax({
		url : 'api/v1/sendloyaltyStmntPostal',
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
				navigator.msSaveBlob(file, 'RPT_Loyalty_Statement.pdf');
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
	$("#Fmonth").val("");
	$("#Tmonth").val("");
	$("#cardNoC").val("");
	$("#custTypeC").val("");
	$("#postalGrid").hide();
});

$("#Fmonth").on('blur',function(){
	var fromMonth = document.getElementById("Fmonth").value;
	
	var fMon =  fromMonth.split('-') ; 
	var curDate = new Date();
	var curMonth = curDate.getMonth() +1;
	var curYear = curDate.getFullYear();
	
	var fromMonth = fMon[1];
	var fromYear = fMon[0];
	if(fromYear > curYear ){
		$("#Fmonth").val("");
		document.getElementById("Fmonth").innerHtml = "";

		$.growl.error({
			message : "Future Dates Not Allowed !!",
			duration:1000,
			title :'Error'
		});
		return false;
	}else if(fromYear == curYear){
		if(fromMonth > curMonth){
			$("#Fmonth").val("");

			$.growl.error({
				message : "Please Select Valid From Month/Year !!",
				duration:1000,
				title :'Error'
			});
			return false;
		}
	}
});

$("#Tmonth").on('blur',function(){
	var fromMonth = document.getElementById("Fmonth").value;
	var toMonth = document.getElementById("Tmonth").value;
	
	var fMon =  fromMonth.split('-') ; 
	var tMon =  toMonth.split('-') ; 
	
	var curDate = new Date();
	var curMonth = curDate.getMonth() +1;
	var curYear = curDate.getFullYear();
	
	var fromMonth = fMon[1];
	var fromYear = fMon[0];
	
	var toMonth = tMon[1];
	var toYear = tMon[0];
	//debugger;
	
	if(toYear > curYear ){
		$("#Tmonth").val("");
		document.getElementById("Tmonth").innerHtml = "";

		$.growl.error({
			message : "Future Dates Not Allowed !!",
			duration:1000,
			title :'Error'
		});
		return false;
	}
	else if(toYear < fromYear){
		$("#Tmonth").val("");

		$.growl.error({
			message : "Please Select Valid To Month/Year !!",
			duration:1000,
			title :'Error'
		});
		return false;
	}else if(/*toYear == curYear ||*/ toYear == fromYear){
		if(toMonth < fromMonth){
			$("#Tmonth").val("");

			$.growl.error({
				message : "Please Select Valid To Month/Year !!",
				duration:1000,
				title :'Error'
			});
			return false;
		}
	}
});

// Search Section
var loyaltyStatementFieldFilters = function() {

	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var cardNoS = $('#cardNoS').val();
	var modeS = $('#modeS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (cardNoS != "" && cardNoS != null) {
		fieldFilters.fieldFilters["loyCardNo"] = cardNoS;
	}
	if (modeS != "" && modeS != null) {
		fieldFilters.fieldFilters["imode"] = modeS;
	}
	
	fieldFilters.fieldFilters["referenceType"] = "search";

	return fieldFilters;
}

//Search Grid Started
function loyaltySearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'createdDate','type' : 'string','map' : 'createdDate'},
		{'name' : 'createdBy','type' : 'string','map' : 'createdBy'}, 

		{'name' : 'mode','type' : 'string','map' : 'mode'},

		{'name' : 'custName','type' : 'string','map' : 'custName'},
		{'name' : 'cardNo','type' : 'int','map' : 'loyCardNo'},
		{'name' : 'fMonth','type' : 'string','map' : 'frmMonthYear'},
		{'name' : 'tMonth','type' : 'string','map' : 'toMonthYear'},
		{'name' : 'actionV','type' : 'int','map' : 'id'},

      ];

	var columns = [
		{'text' : 'Created By','datafield' : 'createdBy','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Created Date ','datafield' : 'createdDate','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Loyalty Card Number','datafield' : 'cardNo','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 

		{'text' : 'Customer Name','datafield' : 'custName','width' : '20%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'From Month/Year','datafield' : 'fMonth','width' : '13%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'To Month/Year','datafield' : 'tMonth','width' : '12%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Mode','datafield' : 'mode','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'View','datafield' : 'actionV','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemEditRenderer},

	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchLoyCustStatement","list", columns,loyaltyStatementFieldFilters(), updateRows, "");
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
		loyaltySearchGrid();
		$("#jqxgrid").show();
	}
});

var intRemEditRenderer = function(row, column, value) {
    	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation"  type="button" id='
    	+ row
    	+ ' onclick="viewLoyaltyStatement('
    	+ value
    	+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-lg"></i></a>'
}

function viewLoyaltyStatement(id){
	var viewParams = {"fieldFilters": {"referenceType":"view","id":id}}
	
	postJSON('/OrderExecution/api/v1/searchLoyCustStatement',JSON.stringify(viewParams),function(data) {
		if(data.resCode == 1){
			$("#mailContent").val(data.payload.view);
		}
	});
}

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('vendorReminder', 'bodySwitcher')"
});