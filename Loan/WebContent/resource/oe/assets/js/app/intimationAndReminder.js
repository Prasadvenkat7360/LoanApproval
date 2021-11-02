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


var onLoadLovFunc = function(){
$.getJSON('/OrderExecution/api/v1/IntimationReminderTemplateOnLoadLovs', function(data) {
	 $('#intRemModeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.IRModesAll, function(key, val) {
		$('#intRemModeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	 });
		
	 $('#intRemTypeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.IRTypesAll, function(key, val) {
		$('#intRemTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	 });
		
	 $('#intRemRefTypeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.IRRefDocTypesAll, function(key, val) {
		$('#intRemRefTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	 });
	
	$.getJSON('/OrderExecution/api/v1/ApprovalBillReminderOnloadLovs', function(data) {
		if(data.resCode == 1){
			intervalE = data.payload.AB_REMINDER_INTERVAL_DAYS;
			$("#intervalC").val(intervalE);
		}
	});
  });
}

onLoadLovFunc();

$("#intRemModeS").on('change',function(){
	var intMode = $("#intRemModeS").val();
	if(intMode == "Mail"){
		$("#createMail").show();
	}else{
		$("#createMail").hide();
	}
});

$("#intRemRefTypeS").on('change',function(){
	intimationRestrict();
});

$("#intRemTypeS").on('change',function(){
	intimationRestrict();
});

var intimationRestrict = function(){
	var intType = $("#intRemTypeS").val();
	var refDoc = $("#intRemRefTypeS").val();
	if(intType != "" && refDoc != ""){
		if(intType == "I" && refDoc == "AB" ){
			$("#createMail").prop('disabled',true);
			$.growl.error({
				message : "Cannot Send Intimation for Approval Bill",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}else if(intType == "R" && refDoc == "LOY"){
			$("#createMail").prop('disabled',true);
			$.growl.error({
				message : "Cannot Send Reminder for Loyalty Points Expiry",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		else{
			$("#createMail").prop('disabled',false);
		}
	}else{
		$("#createMail").prop('disabled',false);
	}
}

var intervalE;
$("#createMail").on('click',function(){
	$("#editContent").hide();
	$("#createContent").show();
	
	$("#updateIntimation").hide();
	$("#saveIntimation").show();
	$("#createContentER").hide();
	$("#storeFlagE").hide();
	
	$("#createContentR").show();
	$("#storeFlag").show();
	$("#forLpExpiry").hide();
	
	if($("#intRemModeS").val() == "" || $("#intRemTypeS").val() == "" || $("#intRemRefTypeS").val() == ""){
		$.growl.error({
			message : "Please Select Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	else{
		if($("#intRemTypeS").val() == "I" && $("#intRemRefTypeS").val() == "O"){
			$("#forApprovalBill").hide();
			$("#forCustomerOrder").show();
			$('#popupheaderlabel').text('Customer Order Intimation');
		}
		
		else if($("#intRemTypeS").val() == "R" && $("#intRemRefTypeS").val() == "O"){
			$("#forApprovalBill").hide();
			$("#forCustomerOrder").show();
			$('#popupheaderlabel').text('Customer Order Reminder');
		}
		else if($("#intRemTypeS").val() == "R" && $("#intRemRefTypeS").val() == "AB"){
			$("#forApprovalBill").show();
			$("#forCustomerOrder").hide();
			$('#popupheaderlabel').text('Approval Bill Reminder');
			
			$("#createContentER").hide();
			$("#storeFlagE").hide();
			
			$("#createContentR").show();
			$("#storeFlagC").show();
			
			$("#reminderContent").show();
			$("#reminderContentE").hide();
			
			$.getJSON('/OrderExecution/api/v1/ApprovalBillReminderOnloadLovs', function(data) {
				if(data.resCode == 1){
					intervalE = data.payload.AB_REMINDER_INTERVAL_DAYS;
					$("#intervalC").val(intervalE);
				}
			});
		}else if($("#intRemRefTypeS").val() == "LOY"){
			$("#forCustomerOrder").hide();
			$("#forApprovalBill").hide();
			$("#forLpExpiry").show();
			$("#reminderContentLpE").hide();
			$('#popupheaderlabel').text('Loyalty Points Expiry Intimation');
		}
		else{
			$('#popupheaderlabel').text('Customer Order Intimation');
		}
		
		var fieldFilters = {
			"irModeType" : $("#intRemModeS").val(),
			"irType" : $("#intRemTypeS").val(),
			"irRefDocType" : $("#intRemRefTypeS").val()
		}
		postJSON('/OrderExecution/api/v1/createTemplateOnloadLovs',JSON.stringify(fieldFilters),function(data) {
			if(data.resCode == 1){
				var d=new Date();
				var dd=d.getDate();
				var mm=d.getMonth()+1;
				var yy=d.getFullYear();
				var newdate1=yy+"/"+mm+"/"+dd;
				$("#currDate").val(newdate1);
				
				var holidays = data.payload.lastTemplate.holidays;
				 
				$("#mailContent").val(data.payload.lastTemplate.temText);
				$("#reminderContent").val(data.payload.lastTemplate.temText);
				$("#reminderContentLpC").val(data.payload.lastTemplate.temText);

				var contentText = data.payload.lastTemplate.temText;
				if(contentText != null){
					if(contentText.includes("@")){
						var contentText1 = contentText.replace(/@/g, '\n');
						$("#mailContent").val(contentText1);
					}
				}
				
				if(holidays != null){
					if(holidays.includes(",")){
						var holidaySet = holidays.replace(/,/g, '\n');
						console.log(typeof holidaySet);
						$("#holidayList").val(holidaySet);
					}
				}
				
				$("#company").val(data.payload.lastTemplate.company.compName);
			}
		});
	}
});

$("#saveIntimation").on('click',function(){
		var contentText;
		if($("#intRemRefTypeS").val() == "AB"){
			contentText = $("#reminderContent").val()
		}else if($("#intRemRefTypeS").val() == "O"){
			contentText = $("#mailContent").val()
		}else if($("#intRemRefTypeS").val() == "LOY"){
			contentText = $("#reminderContentLpC").val()
		}

		var fieldFilters = {
				"irModeType" : $("#intRemModeS").val(),
				"irType" : $("#intRemTypeS").val(),
				"irRefDocType" : $("#intRemRefTypeS").val(),
				"temText":contentText,
				"isStoreFlag" : ($('input[name=storeS]:checked').val() == "Yes") ? true :false
			}
		console.log(JSON.stringify(fieldFilters));
		
		if($("#intRemRefTypeS").val() != "AB"){
			delete fieldFilters.isStoreFlag;
		}
		
		postJSON('/OrderExecution/api/v1/createTemplate',JSON.stringify(fieldFilters),function(data) {
			if(data.resCode == 1){
				 $.growl.notice ({
					message :  data.mesgStr,
					duration : 10000,
					title : 'Success'
				 });
				 $("#createIntimation").modal('hide');

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

$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" ||
			$("#intRemModeS").val() == "" || $("#intRemTypeS").val() == "" || $("#intRemRefTypeS").val() == "" ){
		$.growl.error({
			message : "Please Select Mandatory Fields !!",
			duration : 1000,
			title :'Error'
		});
		return false;
	}else{
		intimationSearchGrid();
		$("#jqxgrid").show();
	}
});

var intimationFieldFilters = function() {
	var intRemModeS = $("#promoTypeS").val();
	var intRemTypeS = $('#intRemTypeS').val();
	var intRemRefTypeS = $('#intRemRefTypeS').val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var statusS = $('#statusS').val();
	var AIFlag ;
	if(statusS == "True"){
		AIFlag = true;
	}else{
		AIFlag = false;
	}
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	console.log(length);
	
	if(intRemModeS != "" && intRemModeS != null){
		fieldFilters.fieldFilters["irMode"] = intRemModeS
	}
		
	if (intRemTypeS != "" && intRemTypeS != null) {
		fieldFilters.fieldFilters["intreminderType"] = intRemTypeS;
	}
	if (intRemRefTypeS != "" && intRemRefTypeS != null) {
		fieldFilters.fieldFilters["intRemRefDocType"] = intRemRefTypeS;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["AIFlag"] = AIFlag;
	}
	
	
	return fieldFilters;
}


//Search Grid Started
function intimationSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'templateId','type' : 'string','map' : 'id'},
		{'name' : 'intMode','type' : 'string','map' : 'irModeType'}, 
		{'name' : 'intRemType','type' : 'string','map' : 'irType'},
		{'name' : 'intRemRefDocType','type' : 'string','map' : 'irRefDocType'},
		{'name' : 'actionV','type' : 'int','map' : 'id'},
		{'name' : 'actionE','type' : 'int','map' : 'id'},
		{'name' : 'ActiveInActive','type' : 'string','map' : 'ActiveInActive'}, 
		{'name' : 'fromDate','type' : 'string'},
		{'name' : 'toDate','type' : 'string'},
        ];

	var columns = [
		{'text' : 'Template Id','datafield' : 'templateId','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'From Date','datafield' : 'fromDate','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'To Date','datafield' : 'toDate','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},

		{'text' : 'Intimation Mode','datafield' : 'intMode','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Intimation Reminder Type','datafield' : 'intRemType','width' : '20%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Intimation Reminder Ref Doc Type','datafield' : 'intRemRefDocType','width' : '20%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Active/In-Active','datafield' : 'ActiveInActive','width' : '10%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
		{'text' : '','datafield' : 'actionV','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemRenderer},

		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchIntimationReminderTemplates","list", columns,intimationFieldFilters(), updateRows, "");
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

var intRemRenderer = function(row, column, value) {
    var flagE = $("#jqxgrid").jqxGrid('getrowdata', row);
    var AIFlag = flagE.ActiveInActive;
     if(AIFlag  == "Active"){
		return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation"  type="button" id='
		+ row
		+ ' onclick="editIntRemDet('
		+ value
		+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-lg"></i></a>'
     }else{
    	 return '<a class="btn btn-sm btn-primary" disabled data-toggle="modal" data-target="#createIntimation"  type="button" id='
 		+ row
 		+ ' onclick="editIntRemDet('
 		+ value
 		+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-lg"></i></a>'
     }
}

$("#forLpExpiry").hide();
var editIntRemDet = function(tempId){
	$.getJSON('/OrderExecution/api/v1/editIntimationReminderTemplate?templateId=' + tempId, function(data) {
		if(data.resCode == 1){
			if($("#intRemTypeS").val() == "R" && $("#intRemRefTypeS").val() == "AB"){
				$("#forCustomerOrder").hide();
				$("#forApprovalBill").show();
				$("#reminderContent").hide();
				$("#storeFlagC").hide();
				
				$("#createContentER").show();
				$("#reminderContentE").show();

				$("#reminderContentE").val(data.payload.editIRTemplate.temText);
				

				$("#storeFlagE").show();
				$("#templateIdE").val(tempId);
				console.log(data.payload.editIRTemplate.isStoreFlag);
				console.log(typeof data.payload.editIRTemplate.isStoreFlag);
				if (data.payload.editIRTemplate.isStoreFlag == true) {
					$('input:radio[name="storeE"]').filter('[value="Yes"]').attr('checked', true);
				}else{
					$('input:radio[name="storeE"]').filter('[value="No"]').attr('checked', true);
				}
				
				$.getJSON('/OrderExecution/api/v1/ApprovalBillReminderOnloadLovs', function(data) {
					if(data.resCode == 1){
						intervalE = data.payload.AB_REMINDER_INTERVAL_DAYS;
						$("#intervalC").val(intervalE);
					}
				});
				$('#popupheaderlabel').text('Approval Bill Reminder');
				$("#saveIntimation").hide();
				$("#updateIntimation").show();

			}else if($("#intRemTypeS").val() == "I" && $("#intRemRefTypeS").val() == "LOY"){
				$("#forCustomerOrder").hide();
				$("#forApprovalBill").hide();
				$("#forLpExpiry").show();
				
				$("#reminderContentLpE").show();
				$("#reminderContentLpC").hide();
				$("#saveIntimation").hide();
				$("#updateIntimation").show();
				
				$('#popupheaderlabel').text('Loyalty Points Expiry Intimation');

				$("#reminderContentLpE").val(data.payload.editIRTemplate.temText);
				$("#templateIdE").val(tempId);
			}
			
			else{
				$("#editContent").show();
				$("#createContent").hide();
				
				$("#updateIntimation").show();
				$("#saveIntimation").hide();
				$("#templateIdE").val(tempId);
				$("#mailContentE").val(data.payload.editIRTemplate.temText);
				$("#forApprovalBill").hide();
				
				$('#popupheaderlabel').text('Customer Order Intimation');

			}
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
}

$("#updateIntimation").on('click',function(){
	var editText ;
	if($("#intRemRefTypeS").val() == "AB"){
		editText = $("#reminderContentE").val();
	}else if($("#intRemRefTypeS").val() == "LOY"){
		editText = $("#reminderContentLpE").val();
	}else{
		editText = $("#mailContentE").val();
	}
		var updateDet = {
			"id": $("#templateIdE").val(),
			"temText": editText,
			"isStoreFlag" : ($('input[name=storeE]:checked').val() == "Yes") ? true :false
			}
			console.log(JSON.stringify(fieldFilters));
			
			if($("#intRemRefTypeS").val() != "AB"){
				delete fieldFilters.isStoreFlag;
			}
		
		console.log((updateDet));
		postJSON('/OrderExecution/api/v1/updateIntimationReminderTemplate',JSON.stringify(updateDet),function(data) {
			if(data.resCode == 1){
				$.growl.notice ({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
			  $("#createIntimation").modal('hide');
			  intimationSearchGrid();
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

$('#mailContent').keyup(function(event){
	var content = $('#mailContent').val();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var createContent;
    var dummyContect  = $('#mailContent').val();
    var text = '\n';
    if(keycode == '13'){
    	createContent =  content  ;
    	$("#mailContent").val(createContent);
	}
   
   event.stopPropagation();
});

var contentEdited;
$('#mailContentE').keyup(function(event){
	var content = $('#mailContentE').val();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var createContent;
    if(keycode == '13'){
    	createContent =  content ;
        $("#mailContentE").val(createContent);
    }

   event.stopPropagation();
});

$('#reminderContent').keyup(function(event){
	var content = $('#reminderContent').val();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var createContent;
    if(keycode == '13'){
    	createContent =  content ;
        $("#reminderContent").val(createContent);
    }

   event.stopPropagation();
});

$('#reminderContentE').keyup(function(event){
	var content = $('#reminderContentE').val();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var createContent;
    if(keycode == '13'){
    	createContent =  content ;
        $("#reminderContentE").val(createContent);
    }

   event.stopPropagation();
});

$("#clear").on('click',function(){
	$("#mailContent").val("");
	$("#mailContentE").val("");
	$("#reminderContent").val("");
	$("#reminderContentE").val("");
	$("#reminderContentLpC").val("");
	$("#reminderContentLpE").val("");

});	

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('mailTemplate', 'bodySwitcher')"
});