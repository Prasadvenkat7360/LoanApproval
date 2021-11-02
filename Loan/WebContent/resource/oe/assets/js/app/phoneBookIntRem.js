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

$("#printList").prop('disabled',true);
$("#calculate").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" ){
		$.growl.error({
			message  : "Please Select From & To Date !!",
			duration :1000,
			title : 'Error'
		});
		return false;
	}else{
		$.getJSON('/OrderExecution/api/v1/ManualBatchForCustomerOrdersIntimationPhone?fromDate='+$("#fromDateS").val()+'&&toDate='+$("#toDateS").val(), function(data) {
			if(data.resCode == 1){
				$("#printList").prop('disabled',false);
				$.growl.notice ({
					message  : data.mesgStr,
					duration : 1000,
					title : 'Success'
				});
				return;
			}else{
				$("#printList").prop('disabled',true);
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

$("#printList").on('click',function(){
	var fieldFilters = {
			"fieldFilters" : {
				"FromDate" : $("#fromDateS").val(),
				"ToDate" : $("#toDateS").val(),
				"IntimationReminderType" : "I",
				"mode" : "pdf",
				"reportName" : "RPT_Intimation_Reminder_Phone"
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
					navigator.msSaveBlob(file, 'RPT_Intimation_Phone.pdf');
				} else {
					var file = new Blob([ data ], {
						type : 'application/pdf'
					});
					var fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				}
				updateFlag("I");
			}
		});
});

var updateFlag = function(irType){
	$.getJSON('/OrderExecution/api/v1/updatePhoneBookIntimationReminder?intRemType='+irType, function(data) {
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
}


// Phone List Print For Reminder

//date picker functions
$("#fromDateR").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateR").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateR").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

$("#printListR").prop('disabled',true);
$("#calculateR").on('click',function(){
	if($("#fromDateR").val() == "" || $("#toDateR").val() == "" ){
		$.growl.error({
			message  : "Please Select From & To Date !!",
			duration :1000,
			title : 'Error'
		});
		return false;
	}else{
		$.getJSON('/OrderExecution/api/v1/ManualBatchForCustomerOrdersIntimationPhone?fromDate='+$("#fromDateR").val()+'&&toDate='+$("#toDateR").val(), function(data) {
			if(data.resCode == 1){
				$("#printListR").prop('disabled',false);
				$.growl.notice ({
					message  : data.mesgStr,
					duration : 1000,
					title : 'Success'
				});
				return;
			}else{
				$("#printListR").prop('disabled',true);
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

$("#printListR").on('click',function(){
	var fieldFilters = {
			"fieldFilters" : {
				"FromDate" : $("#fromDateR").val(),
				"ToDate" : $("#toDateR").val(),
				"IntimationReminderType" : "R",
				"mode" : "pdf",
				"reportName" : "RPT_Intimation_Reminder_Phone"
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
					navigator.msSaveBlob(file, 'RPT_Reminder_Phone.pdf');
				} else {
					var file = new Blob([ data ], {
						type : 'application/pdf'
					});
					var fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				}
				updateFlag("R");
			}
		});
});