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



$("#fromDateS1").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS1").datepicker('option', 'minDate', min || '0');
    }
});

//var updates = new Object();
$("#toDateS1").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});




$("#modeS").on('change',function(){
	 if($("#modeS").val() == "Courier" || $("#modeS").val() == "Phone"){
			$("#createMail").prop('disabled',true);
			$.growl.error({
				message : "Please Select Mode other than " + $("#modeS").val()  + " !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
	}else{
		$("#createMail").prop('disabled',false);
	}
});

var createFilePath;

$("#createMail").on('click',function(){
	$('#sendTrnmail').show();
	$('#raiseTvForm').hide();
	$("#createMail").prop('disabled',true);

		
		$("#abSig").val("");
		$("#imgName").text("");
		
		// var gType = $("#greetingTypeS").val();
		//var custTypeText =  $("#greetingTypeS").text();
		
		
		
		var mode = $("#modeS").val();
		$("#custType").val($custType);
		$("#mode").val(mode);
		$("#Id").val("0");
		
		$('#subject').empty();
		/*if(gType == "Birthday"){
			$("#subjc").append("Sub : Wishing you a Happy Birthday");
		}else{
			$("#subjc").append("Sub : Wishing you a Happy Anniversary");

		}*/
		
		if($("#modeS").val() == "Mail" || $("#modeS").val() == "Postal"){
			$("#row1").show();
			$("#row2").show();			
			$("#addRowSectionEdit").show();
			//$('#tierrow').addClass('show')
		}else{
			//$("#row1").hide();
			$("#row2").hide();
			$("#addRowSectionEdit").hide();
			$("#imgName").hide();
			$("#abSig").val("");
			//$('#tierrow').removeClass('show');
		}
		//var val = document.getElementById('#greetingTypeS').value;
		if ($("#greetingTypeS").val() == 1){
			$custType = "Loyal"; 
			$('#popupheaderlabel1').text('Loyal customer');
		}
		else{
			$custType = "NonLoyal" 
			$('#popupheaderlabel1').text('Non Loyal customer');
		}
		//$('#popupheaderlabel1').innerhtml($("#modeS").val());
		document.getElementById("popupheaderlabel").innerHTML = $("#modeS").val();
		var params = {
				"fieldFilters":{
					"fieldFilters" : {
					"docType":"transactionAlertToCustomer",
					"fromDate":$("#fromDateS").val(),
					  "toDate":$("#toDateS").val(),
					"mode":$("#modeS").val(),
					"custType":$("#greetingTypeS").val(),
					"custType": $custType
					
					
					}}
					} 	
		
		//var params = {"fieldFilters":{"docType":"CreateOnLoad","mode":"SMS","custType":"loyal"}}
		
		postJSON('/OrderExecution/api/v1/transactionAlertTemplateFunctions',JSON.stringify(params),function(data) {
			if(data.resCode == 1){
				$("#body").val(data.payload.GC_Template_Details.text);
				$("#Text").val(data.payload.GC_Template_Details.text);
				//$("#subject").val(data.payload.GC_Template_Details.subject);
				//$("#contactNo").val(data.payload.GC_Template_Details.contactNo);
				
				createFilePath = data.payload.GC_Template_Details.filePath; 
				if(data.payload.GC_Template_Details.filePath != null && $("#modeS").val() == "Mail" || $("#modeS").val() == "Postal"){
					
					createFilePath = data.payload.GC_Template_Details.filePath;
					if(createFilePath != null){
						$("#Id").val("1");
						var img =  "<a href='/uf/"+data.payload.GC_Template_Details.filePath+"' target='_blank'><img src='/uf/"+data.payload.GC_Template_Details.filePath+"' height='40%' width ='60%' /></a>";
						$('#create-content').html(img);
					}else{
						$("#Id").val("0");
						$('#create-content').empty();
					}
					
				}
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
			});
	
});

$("#mailContent").on('blur',function(){
	var content = $("#mailContent").val();
	$("#body").val(content);
});

$("#mailContentE").on('blur',function(){
	var content = $("#mailContentE").val();
	$("#body").val(content);
});

var onLoadFunction = function(){
	var today = new Date();
	console.log(today);
	var dd1 = today.getDate();
	var mm1 = today.getMonth() + 1;
	var yy1 = today.getFullYear();
	var todayC = dd1 + "/" + mm1 + "/" + yy1;
	
	$("#currDate").val(todayC);
	
	
	//$('#popupheaderlabel').text('Email Format for loyal customer');
	
	
	
	$.getJSON('/OrderExecution/api/v1/transactionAlertTemplateOnloadLovs', function(data) {
		if(data.resCode == 1){
			var modeList = data.payload.mode;
			var modes = [];
			$.each(modeList,function(k,v){
				if(v.id == "SMS" || v.id == "Mail" || v.id == "Postal" || v.id == "Whatsapp"){
					modes.push(v);
				}
			});
			
		$('#modeS').empty().append('<option value="" selected>--Select--</option>');
			$.each(modes, function(key, val) {
			$('#modeS').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
			
		$('#greetingTypeS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.customer,	function(k, v) {
				$('#greetingTypeS').append('<option value="' + v.id + '">' + v.name + '</option>');
		});
			
			$('#modeS1').empty().append('<option value="" selected>--Select--</option>');
			$.each(modes, function(key, val) {
			$('#modeS1').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
			
		$('#greetingTypeS1').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.customer,	function(k, v) {
				$('#greetingTypeS1').append('<option value="' + v.id + '">' + v.name + '</option>');
		});
			
	}
	});	
}

onLoadFunction();
$("#abSig").on('change',function(){
	if($("#abSig").val() != ""){
		 var fake_path = $("#abSig").val();
		 var imgName  = fake_path.split("\\").pop();
			$("#imgName").text(imgName);
			$("#Id").val("1");
	}else{
		$("#Id").val("0");
		$("#imgName").text("");
	}
});





var saveFieldFilters = function() {
	if($("#greetingTypeS1").val() != "" && $("#greetingTypeS1").val() !=  null ){
		if ($("#greetingTypeS1").val() == 1){
			var greetingTypeS = "Loyal";
		}
		else{
			var greetingTypeS = "NonLoyal"; 
		}	
	}
	else{
		
		var greetingTypeS = "";
	} 
	
	//var greetingTypeS = $("#greetingTypeS").val();
	var modeS = $('#modeS1').val(); 
	var fromDateS = $('#fromDateS1').val();
	var toDateS = $('#toDateS1').val();

	
	fieldFilters = {
			"fieldFilters" : {}
		};
		
		if(greetingTypeS != "" && greetingTypeS != null){
			fieldFilters.fieldFilters["custType"] = greetingTypeS
		}
		if (modeS != "" && modeS != null) {
			fieldFilters.fieldFilters["Mode"] = modeS;
		}
		if (fromDateS != "" && fromDateS != null) {
			fieldFilters.fieldFilters["fromDate"] = fromDateS;
		}
		if (toDateS != "" && toDateS != null) {
			fieldFilters.fieldFilters["toDate"] = toDateS;
		}
		fieldFilters.fieldFilters["docType"] = "transactionAlertToCustomer";

		return fieldFilters;
	
}


$("#saveIntimation").on('click',function(){
	
	 /*var params = {
				"fieldFilters":{}
					"docType":"transactionAlertToCustomer",	
					
					"fromDate": $("#fromDateS1").val(),
				    "toDate":$("#toDateS1").val(),
					"mode": $("#modeS1").val(),
					"CustType": $('#greetingTypeS1').val()
					}
				}*/
	var editfieldfilter = function(){
	
		
		if($("#greetingTypeS1").val() != "" && $("#greetingTypeS1").val() !=  null ){
			if ($("#greetingTypeS1").val() == 1){
				var greetingTypeS1 = "Loyal";
			}
			else{
				var greetingTypeS1 = "NonLoyal"; 
			}	
		}
		else{
			
			var greetingTypeS1 = "";
		} 
		
	//var greetingTypeS1 = $('#greetingTypeS1').val()
	var modeS1 = $('#modeS1').val()
	var fromDateS1 = $('#fromDateS1').val()
	var toDateS1 = $('#toDateS1').val();
	fieldFilters = {
			"fieldFilters" : {}
		};
		
		if(greetingTypeS1 != "" && greetingTypeS1 != null){
			fieldFilters.fieldFilters["custtype"] = greetingTypeS1;
		}
		if (modeS1 != "" && modeS1 != null) {
			fieldFilters.fieldFilters["Mode"] = modeS1;
		}
		if (fromDateS1 != "" && fromDateS1 != null) {
			fieldFilters.fieldFilters["fromDate"] = fromDateS1;
		}
		if (toDateS1 != "" && toDateS1 != null) {
			fieldFilters.fieldFilters["toDate"] = toDateS1;
		}
		fieldFilters.fieldFilters["docType"] = "transactionAlertToCustomer";

		return fieldFilters;
	
	}//editfieldfilter()
	console.log(editfieldfilter());																										
	
	postJSON('/OrderExecution/api/v1/transactionAlertTemplateFunctions',JSON.stringify(editfieldfilter()),function(data) {
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

function processFileUpload(formId)
{
	  $.ajax({
          url : "/OrderExecution/api/v1/transactionMsgTemplateImgUploadSave",
      data : new FormData(document.getElementById(formId)),
      type : "post",
      enctype: 'multipart/form-data',
      processData: false, 
      contentType:false,
      success : function(result) {
			$.growl.notice({ message: result.mesgStr, duration: 8000, title: 'Success'});
			 $("#createIntimation").modal('hide');
			 $("#diamondCertUpload").trigger("reset");
      },
      error : function(result){
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Uploading Image !' });
      }
    });
}

var searchFieldFilters = function() {
	if($("#greetingTypeS").val() != "" && $("#greetingTypeS").val() !=  null ){
		if ($("#greetingTypeS").val() == 1){
			var greetingTypeS = "Loyal";
		}
		else{
			var greetingTypeS = "NonLoyal"; 
		}	
	}
	else{
		
		var greetingTypeS = "";
	} 
	
	//var greetingTypeS = $("#greetingTypeS").val();
	var modeS = $('#modeS').val();
	var statusS = $('#statusS').val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();

	
	fieldFilters = {
			"fieldFilters" : {}
		};
		
		if(greetingTypeS != "" && greetingTypeS != null){
			fieldFilters.fieldFilters["custType"] = greetingTypeS
		}
		if (modeS != "" && modeS != null) {
			fieldFilters.fieldFilters["intMode"] = modeS;
		}
		if (fromDateS != "" && fromDateS != null) {
			fieldFilters.fieldFilters["fromDate"] = fromDateS;
		}
		if (toDateS != "" && toDateS != null) {
			fieldFilters.fieldFilters["toDate"] = toDateS;
		}
		if (statusS != "" && statusS != null) {
			fieldFilters.fieldFilters["status"] = statusS;
		}
		fieldFilters.fieldFilters["docType"] = "search";

		return fieldFilters;
	
}

//Search Grid Started
function greetingSearchGrid() {
	
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'id','type' : 'string','map' : 'id'},
		{'name' : 'createdDate','type' : 'string','map' : 'createdDate'}, 
		{'name' : 'createdBy','type' : 'string','map' : 'createdBy'}, 

		{'name' : 'promoType','type' : 'string','map' : 'custType'},
		{'name' : 'mode','type' : 'string','map' : 'mode'},
		{'name' : 'actionE','type' : 'int','map' : 'id'},
		{'name' : 'ActiveInActive','type' : 'string','map' : 'activeInactive'}, 
		{'name' : 'text','type' : 'string','map' : 'text'}, 

        ];

	var columns = [
		{'text' : 'Template Id','datafield' : 'id','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Created Date','datafield' : 'createdDate','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Created By','datafield' : 'createdBy','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},


		{'text' : 'Mode','datafield' : 'mode','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Customer Type','datafield' : 'promoType','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},

		{'text' : 'text','datafield' : 'text','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true,hidden:true},

		{'text' : 'Active/In-Active','datafield' : 'ActiveInActive','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			cellsrenderer: function(row, column, value){
				if(value == true){
					return "<div align='center'style='margin-top:8px;'>Active</div>";
				}else{
					return "<div align='center'style='margin-top:8px;'>In-Active</div>";
				}
	      		
	      	} 
		},
		{'text' : 'Edit','datafield' : 'actionE','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemEditRenderer},

		];
	showMyGrid(datafields, "/OrderExecution/api/v1/transactionAlertTemplateFunctions","list", columns,searchFieldFilters(), updateRows, "");
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

var intRemEditRenderer = function(row, column, value) {
    var flag = $("#jqxgrid").jqxGrid('getrowdata', row);
    console.log(flag);
    
    if(flag.ActiveInActive == true){
    	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation"  type="button" id='
    	+ row
    	+ ' onclick="editIntRemDet('
    	+ value
    	+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-lg"></i></a>'
    }else{
    	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation" disabled type="button" id='
    	+ row
    	+ ' onclick="editIntRemDet('
    	+ value
    	+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-lg"></i></a>'
    }
	
 
}

$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		greetingSearchGrid();
		$("#jqxgrid").show();
	}
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('sendTransactionAlert', 'bodySwitcher')"
});
$("#clearAll1").on('click',function(){
	window.location.href="javascript:showContentPage('sendTransactionAlert', 'bodySwitcher')"
});



var editIntRemDet = function(id){
	$("#mailContent").show();
	$("#saveIntimation").hide();
	$("#editContent").hide();
	$("#mailContentE").hide();
	$("#updateIntimation").show();
	$("#create-content").show();
	$("#createContent").show();
	var params = {
		"fieldFilters":{
			"docType":"edit",
			"templateId":id,
			}
		}
	
	console.log(params);
	postJSON('/OrderExecution/api/v1/transactionAlertTemplateFunctions',JSON.stringify(params),function(data) {
		if(data.resCode == 1){
			//$('#popupheaderlabel').text('Edit Greetings !!!');
			
			//	debugger;
			$('#popupheaderlabel').text();
			$("#mailContent").show();
			$("#mailContentE").hide();
			$("#updateIntimation").show();
			//$("#mailContentE").val(data.payload.details.text);
			$("#mailContent").val(data.payload.details.text);
			$("#subject").val(data.payload.details.subject);
			$("#contactNo").val(data.payload.details.contactNo);
			$("#email").val(data.payload.details.mailId);
			$("#custType").val(data.payload.details.custType);
			$("#mode").val(data.payload.details.mode);
			$("#popupheaderlabel").text(data.payload.details.mode);
			$("#popupheaderlabel1").text(data.payload.details.custType + ' Customer');
			
			//$('#imgtext').text(data.payload.details.filePath);
			if(data.payload.details.filePath != null){
				$("#Id").val("1");
				var img =  "<a href='/uf/"+data.payload.details.filePath+"' target='_blank'><img src='/uf/"+data.payload.details.filePath+"' height='40%' width ='60%' /></a>";
				$('#page-content').html(img);
			}else{
				$("#Id").val("0");
				$('#page-content').empty();
			}
		}
		});
	
}

$("#updateIntimation").on('click',function(){
	console.log($("#abSig").val());
	if($("#mailContent").val() == ""){
		$.growl.error({
			message  : "Please Enter Content !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		processFileUpload("diamondCertUpload");
	}
});

$("#clear").on('click',function(){	
	$('#subject').val("");
	$('#subject').val(null);
	
	$("#mailContent").val("");
	$("#mailContentE").val("");

	$("#abSig").val("");
	$("#abSig").val(null);

	$("#imgName").text("");
	console.log($("#abSig").val(""));
	$("#page-content").empty();
	$("#create-content").empty();
	$("#Id").val("0");
	
	$('#contactNo').val("");
	$('#contactNo').val(null);
	
	$('#email').val("");
	$('#email').val(null);
});
$("#cancel").on('click',function(){	

	$('#sendTrnmail').hide();
	$('#raiseTvForm').show();
	$('#createMail').prop('disabled', false);
	$('#diamondCertUpload').reset();
});

