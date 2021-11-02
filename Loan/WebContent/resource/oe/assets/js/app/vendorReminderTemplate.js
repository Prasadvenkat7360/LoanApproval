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

$("#irModeType").on('change',function(){
	 if($("#irModeType").val() == "Courier" || $("#irModeType").val() == "Phone"){
			$("#createMail").prop('disabled',true);
			$.growl.error({
				message : "Please Select Mode other than " + $("#irModeType").val()  + " !!!",
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
	//alert();
	var params = {
			"fieldFilters":{ 
				"irModeType":$("#irModeType").val(),
				"temText":'Hi,\n\nthis what i am expecting'
				}
				} 
		
	
	postJSON('/OrderExecution/api/v1/getVendorMSRReminderOnchangeValues',JSON.stringify(params), function(data) {
		if(data.resCode == 1){
			var modeval = $("#irModeType").val();
			$("#irModeTypeE").val(modeval);
				
		}
		
	});
	
	$("#mailContent").show();
	$("#saveIntimation").show();
	$("#create-content").show();
	$("#createContent").show(); 
	
	$("#editContent").hide();
	$("#updateIntimation").hide();
	//$("#abSig").val("");
	//$("#abSig").val(null);

	//$("#imgName").text("");
	//$('popupheaderlabel').text('Vendor Reminder based on  MSR for Pending Materials');
	
	if($("#irModeType").val() == ""){
		$("#createMail").prop('disabled',false);

		$.growl.error({
			message : "Please Select Mode !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	else{
		$("#createMail").prop('disabled',false);
		
		$("#abSig").val("");
		$("#imgName").text("");
		
		// var gType = $("#greetingTypeS").val();
		//var custTypeText =  $("#greetingTypeS").text();
		
		if($("#irModeType").val() == "Mail" || $("#irModeType").val() == "Postal"){
			$('#createIntimation').show();
			//$('#raiseTvForm').hide(); 
			
			$('#popupheaderlabel').text('Vendor Reminder based on  MSR for Pending Materials');
			$('#mailContent').val();
			$('.row1-2').removeClass('hide');
			$('#row1-1').removeClass('show');
			$('#row4').removeClass('hide');
			$('.row5').removeClass('hide');
			
		}
		else{
			$('#tierrow').removeClass('show');
			$('#row4').addClass('hide');	
			$('#row1-1').addClass('show');
			$('.row1-2').addClass('hide');
			$('.row5').addClass('hide');
			
		}
		
		//var mode = $("#irModeType").val();
		//$("#custType").val($custType);
		//$("#mode").val(mode);
		$("#Id").val("0");
		
		$('#subject').empty(); 
		
		if($("#irModeType").val() == "Mail" || $("#irModeType").val() == "Postal"){
			$("#row1").show();
			$("#row2").show();			
			$("#addRowSectionEdit").show();
		}else{ 
			$("#row2").hide();
			$("#addRowSectionEdit").hide();
			$("#imgName").hide();
			$("#abSig").val(""); 
		}
		//document.getElementById("popupheaderlabel").innerHTML = $("#irModeType").val();
		var params = {
				"fieldFilters":{
					"docType":"create",
					"intMode":$('#irModeType').val()
					}
					} 
		
		//var params = {"fieldFilters":{"docType":"CreateOnLoad","mode":"SMS","custType":"loyal"}}
		
		postJSON('/OrderExecution/api/v1/getVendorMSRReminderOnchangeValues',JSON.stringify(params),function(data) {
			if(data.resCode == 1){
				//debugger;
				$("#mailContent").val(data.payload.create.temText);
				//$("#Text").val(data.payload.GC_Template_Details.text);
				
				createFilePath = data.payload.GC_Template_Details.filePath; 
				if(data.payload.GC_Template_Details.filePath != null && $("#irModeType").val() == "Mail" || $("#irModeType").val() == "Postal"){
					
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
	}
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
			
		$('#irModeType').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.intMode, function(key, val) {
			$('#irModeType').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
			
		/*$('#greetingTypeS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.customer,	function(k, v) {
				$('#greetingTypeS').append('<option value="' + v.id + '">' + v.name + '</option>');
		});*/
			
		$('#statusS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.activeYN,	function(k, v) {
				$('#statusS').append('<option value="' + v.id + '">' + v.name + '</option>');
		});
	}
	});	
}

onLoadFunction();
/*$("#abSig").on('change',function(){
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
*/
$("#saveIntimation").on('click',function(){
	console.log($("#abSig").val());
	var mode = $('#irModeType').val();
	if($("#mailContent").val() == ""){
		$.growl.error({
			message  : "Please Enter Content !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		var fieldFilters = {
			  "irModeType": mode,
			  "temText":$("#mailContent").val()   	
			}
		postJSON('/OrderExecution/api/v1/createVendorReminderTemplate',JSON.stringify(fieldFilters),function(data) { 
			
			if(data.resCode == 1){
				//debugger;
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				 $("#createIntimation").modal('hide');
				 $('#raiseTvForm').show();
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
	})}
});

function processFileUpload(formId)
{
	  $.ajax({
          url : "/OrderExecution/api/v1/getVendorMSRReminderOnchangeValues",
      data : new FormData(document.getElementById(formId)),
      type : "post",
      //enctype: 'multipart/form-data',
      processData: false, 
      contentType:false,
      success : function(result) {
			$.growl.notice({ message: result.mesgStr, duration: 8000, title: 'Success'});
			 $("#createIntimation").modal('hide');
			 $("#diamondCertUpload").trigger("reset");
      },
      error : function(result){
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Something went wrong' });
      }
    });
}


function processFileUpdate(formId)
{
	//debugger;  
	var params = {
			 "irModeType": $("#irModeTypeE").val(),
			  "temText": $("#mailContent").val()			
	}
	postJSON('/OrderExecution/api/v1/createVendorReminderTemplate',JSON.stringify(params),function(data) { 
		if(data.resCode == 1){
				$('#createIntimation').modal('hide');
			}
		 
		})
		/*
		var fieldFilters = {
			  "irModeType": mode,
			  "temText":$("#mailContent").val()   	
			}
		postJSON('/OrderExecution/api/v1/createVendorReminderTemplate',JSON.stringify(fieldFilters),function(data) { */
		
		
		
}

var searchFieldFilters = function() {
	if($("#statusS").val() != "" && $("#statusS").val() !=  null ){
		if ($("#statusS").val() == 1){
			var status = "true";
		}
		else{
			var status = "false"; 
		}	
	}
	else{
		
		var status = "";
	} 
	
	//var greetingTypeS = $("#greetingTypeS").val();
	var modeS = $('#irModeType').val();
	//var statusS = $('#statusS').val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();

	
	fieldFilters = {
			"fieldFilters" : {}
		};
		
		
		if (modeS != "" && modeS != null) {
			fieldFilters.fieldFilters["irMode"] = modeS;
		}
		if (status != "" && status != null) {
			fieldFilters.fieldFilters["status"] = status;
		}
		if (fromDateS != "" && fromDateS != null) {
			fieldFilters.fieldFilters["fromDate"] = fromDateS;
		}
		if (toDateS != "" && toDateS != null) {
			fieldFilters.fieldFilters["toDate"] = toDateS;
		}
		//fieldFilters.fieldFilters["docType"] = "search";

		return fieldFilters;
	
}

//Search Grid Started
function greetingSearchGrid() {
	//alert();
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'id','type' : 'string','map' : 'id'},
		{'name' : 'createdDate','type' : 'string','map' : 'createdDate'}, 
		{'name' : 'createdBy','type' : 'string','map' : 'createdBy'}, 
		{'name' : 'mode','type' : 'string','map' : 'mode'},
		{'name' : 'actionE','type' : 'int','map' : 'id'},
		{'name' : 'status','type' : 'string','map' : 'status'}, 
		{'name' : 'text','type' : 'string','map' : 'text'}, 

        ];
 
	
	
	var columns = [
		{'text' : 'Template Id','datafield' : 'id','width' : '20%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Created Date','datafield' : 'createdDate','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Created By','datafield' : 'createdBy','width' : '25%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},


		{'text' : 'Mode','datafield' : 'mode','width' : '25%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'text','datafield' : 'text','width' : '25%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true,hidden:true},

		{'text' : 'Active/In-Active','datafield' : 'status','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			cellsrenderer: function(row, column, value){
				if(value == 'Active' || value == 'active'){
					return "<div align='center'style='margin-top:8px;'>Active</div>";
				}else{
					return "<div align='center'style='margin-top:8px;'>In-Active</div>";
				}
	      		
	      	} 
		},
		{'text' : 'Edit','datafield' : 'actionE','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemEditRenderer},

		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchVendorReminderTemplate","list", columns,searchFieldFilters(), updateRows, "");
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
    console.log(flag.status);
    if(flag.status == 'Active' || flag.status == 'cctive' ){
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
	window.location.href="javascript:showContentPage('vendorReminderTemplate', 'bodySwitcher')"
});

var editIntRemDet = function(id){
	$("#mailContent").hide();
	$("#saveIntimation").hide();
	$("#editContent").show();
	$("#mailContentE").show();
	$("#updateIntimation").show();
	$("#create-content").hide();
	$("#createContent").hide();
	var params = {
		"fieldFilters":{
			"docType":"edit",
			"templateId":id
			}
		}
	console.log(params);
	$.getJSON('/OrderExecution/api/v1/editVendorReminderTemplate?templateId='+id,function(data) {
		if(data.resCode == 1){
			$('#popupheaderlabel').text('VendorReminderTemplate');
			$('#mailContent').text(data.payload.editVreminderTemplate.temText);
			$('#irModeTypeE').val(data.payload.editVreminderTemplate.mode);
			$('#templateId').val(id);
			$("#mailContent").show();
			$("#createContent").show();
			$("#editContent").hide();
			
		}
		});
	
}

$("#updateIntimation").on('click',function(){
	//console.log($("#abSig").val());
	if($("#mailContent").val() == ""){
		$.growl.error({
			message  : "Please Enter Content !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		processFileUpdate("diamondCertUpload");	
	
	}});

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
	//$('#VenRemBox').hide();
	//$('#raiseTvForm').show();
	$("#mailContent").val("");
	$("#mailContentE").val("");
});

