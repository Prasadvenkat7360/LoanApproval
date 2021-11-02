/*var fDate = new Date;
var fYear = fDate.getYear();
var fMon = fDate.getMonth();

var maxFmy = fYear + "-" + fMon;
*/
var onloadFunction = function(){
	//$("#Fmonth").attr("max",maxFmy);
	
	var today = new Date();
	console.log(today);
	var dd1 = today.getDate();
	var mm1 = today.getMonth() + 1;
	var yy1 = today.getFullYear();
	var todayC = dd1 + "/" + mm1 + "/" + yy1;
	
	$("#currDate").val(todayC);

}

onloadFunction();

// date picker functions
$("#fromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDate").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

var createFilePath;
$("#create-content").hide();
$("#create").on('click',function(){
	$("#lstmntSig").val("");
	$("#lstmntSig").val(null);
	if($("#modeS").val() == ""){
		$.growl.error({
			message : "Please Select Mode !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		var today = new Date();
		console.log(today);
		var dd1 = today.getDate();
		var mm1 = today.getMonth() + 1;
		var yy1 = today.getFullYear();
		var todayC = dd1 + "/" + mm1 + "/" + yy1;

		$("#save").show();
		$("#update").hide();
		$("#updateContent").hide();
		$("#createContent").show();
		$("#mailContent").prop('disabled',false);
		$("#mailContent").val("");
		$("#currDate").val(todayC);
		
		$("#createContent").show(); 
		
		$("#editContent").hide();
		
		$("#lstmntSig").val("");
		$("#lstmntSig").val(null);

		$("#imgName").text("");
		$("#Id").val("0");
		$("#Mode").val($("#modeS").val());

		if($("#modeS").val() == "SMS" || $("#modeS").val() == "Whatsapp"){
			$(".mailPost").hide();
			$(".smsWap").show();
			$("#note").addClass("noteClass");
		}else{
			$(".mailPost").show();
			$(".smsWap").hide();
			$("#note").removeClass("noteClass");

		}
		$('#page-content').hide();
		
		$.getJSON('/OrderExecution/api/v1/CreateLoyCustStatementOnloadTemplate?intiMode='+$("#modeS").val(),function(data) {
			if(data.resCode == 1){

				$("#mailContent").val(data.payload.view.text);
				$("#Text").val(data.payload.view.text);
				
				createFilePath = data.payload.view.filePath; 
				if(data.payload.view.filePath != null && $("#modeS").val() == "Mail" || $("#modeS").val() == "Postal"){
					$("#create-content").hide();
					createFilePath = data.payload.view.filePath;
					if(createFilePath != null){
						$("#create-content").show();
						$("#Id").val("1");
						var img =  "<a href='/uf/"+data.payload.view.filePath+"' target='_blank'><img src='/uf/"+data.payload.view.filePath+"' height='40%' width ='60%' /></a>";
						$('#create-content').html(img);
						
					}else{
						$("#Id").val("0");
						$('#create-content').empty();
						$("#create-content").hide();
					}
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
});

$("#lstmntSig").on('change',function(){
	if($("#lstmntSig").val() != ""){
		 var fake_path = $("#lstmntSig").val();
		 var imgName  = fake_path.split("\\").pop();
			$("#imgName").text(imgName);
			$("#Id").val("1");
	}else{
		$("#Id").val("0");
		$("#imgName").text("");
	}
});

$("#mailContent").on('blur',function(){
	var content = $("#mailContent").val();
	$("#Text").val(content);
});

$("#mailContentE").on('blur',function(){
	var content = $("#mailContentE").val();
	$("#Text").val(content);
});


$("#save").on('click',function(){
	if($("#mailContent").val() == ""){
		$.growl.error({
			message : "Please Enter Content !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		/*var createDetails = {"temText": $("#mailContent").val(),"irModeType":$("#modeS").val()}
		
		postJSON('/OrderExecution/api/v1/createLoyStmntTemp',JSON.stringify(createDetails),function(data) {
			if(data.resCode == 1){
				$.growl.notice ({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
			  $("#createIntimation").modal('hide');
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});*/
		processFileUpload("diamondCertUpload");
	}
});

function processFileUpload(formId)
{
	  $.ajax({
          url : "/OrderExecution/api/v1/LoyStmntPostalSigSubmit",
      data : new FormData(document.getElementById(formId)),
      type : "post",
      enctype: 'multipart/form-data',
      processData: false, 
      contentType:false,
      success : function(result) {
			$.growl.notice({ message: result.mesgStr, duration: 8000, title: 'Success'});
			 $("#lstmntSig").val("");
			 $("#lstmntSig").val(null);
			 $("#create-content").hide();
			 $("#createIntimation").modal('hide');
			 $("#diamondCertUpload").trigger("reset");
      },
      error : function(result){
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Uploading Image !' });
      }
    });
}

// Search Functionality

$("#search").on('click',function(){
	  if($("#fromDate").val() == "" || $("#toDate").val() == ""  ){
		  $.growl.error({
			 message : "Please Fill Mandatory Fields !!",
			 duration : 10000,
			 title : 'Error'
		  });
		  return false;
	  }else{
		  loyaltyStatementAccGrid();
		  $("#jqxgrid").show();
	  }	
	});

var searchFieldFilters = function() {
	var statusS = $('#statusS').val();
	var fromDateS = $('#fromDate').val();
	var toDateS = $('#toDate').val();
	var mode = $('#modeS').val();

	var status;
	if(statusS == "true"){
		status = true;
	}else{
		status = false;
	} 
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (mode != "" && mode != null) {
		fieldFilters.fieldFilters["imode"] = mode;
	}
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	return fieldFilters;
}

//Search Grid Started
function loyaltyStatementAccGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'id','type' : 'string','map' : 'id'},
		{'name' : 'createdDate','type' : 'string','map' : 'createdDate'}, 
		{'name' : 'createdBy','type' : 'string','map' : 'createdBy'}, 
		{'name' : 'mode','type' : 'string','map' : 'intModeType'}, 
		{'name' : 'actionE','type' : 'int','map' : 'id'},
		{'name' : 'ActiveInActive','type' : 'string','map' : 'activeInActive'}, 
        ];

	var columns = [
		{'text' : 'Template Id','datafield' : 'id','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : true},
		{'text' : 'Created Date','datafield' : 'createdDate','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Created By','datafield' : 'createdBy','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Mode','datafield' : 'mode','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Active/In-Active','datafield' : 'ActiveInActive','width' : '20%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
		},
		{'text' : 'Edit','datafield' : 'actionE','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemEditRenderer},

		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchLoyCustStatementTemplate","list", columns,searchFieldFilters(), updateRows, "id");
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
    
    if(flag.ActiveInActive == "Active"){
    	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation"  type="button" id='
    	+ row
    	+ ' onclick="editLoyaltyStatement('
    	+ value
    	+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-lg"></i></a>'
    }else{
    	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation" disabled type="button" id='
    	+ row
    	+ ' onclick="editLoyaltyStatement('
    	+ value
    	+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-lg"></i></a>'
    }
}

var editLoyaltyStatement = function(id){
	
	$.getJSON('/OrderExecution/api/v1/editLoyCustStatementTemplate?LoyStmntTempId='+id,function(data) {
		if(data.resCode == 1){
			$("#mailContentE").prop('disabled',false);
			$("#mailContentE").val(data.payload.edit.text);
			
			$("#save").hide();
			$("#update").show();
			$("#createContent").hide();
			$("#updateContent").show();
			$("#clear").show();
			$("#editContent").show();
			$("#create-content").hide();
			$("#page-content").show();
			if($("#modeS").val() == "SMS" || $("#modeS").val() == "Whatsapp"){
				$(".mailPost").hide();
				$(".smsWap").show();
			}else{
				$(".mailPost").show();
				$(".smsWap").hide();
			}
			
			$("#Mode").val(data.payload.edit.intModeType);
			//$("#Id").val("0");
			$("#Text").val($("#mailContentE").val());
			
			if(data.payload.edit.filePath != null){
				$("#Id").val("1");
				var img =  "<a href='/uf/"+data.payload.edit.filePath+"' target='_blank'><img src='/uf/"+data.payload.edit.filePath+"' height='40%' width ='60%' /></a>";
				$('#page-content').html(img);
			}else{
				$("#Id").val("0");
				$('#page-content').empty();
			}
			
		}else{
			$("#mailContentE").prop('disabled',false);
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
}

$("#update").on('click',function(){
	if($("#mailContentE").val() == ""){
		$.growl.error({
			message : "Please Enter Content !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		/*var editDet = {"temText":$("#mailContentE").val(),"irModeType":$("#modeS").val()}
		
		postJSON('/OrderExecution/api/v1/createLoyStmntTemp',JSON.stringify(editDet),function(data) {
			if(data.resCode == 1){
				$.growl.notice ({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				loyaltyStatementAccGrid();
				$("#jqxgrid").show();
				$("#createIntimation").modal('hide');
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});*/
		
		processFileUpload("diamondCertUpload");
		
	}
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('loyaltyCustStatementofAcc', 'bodySwitcher')"
});

$("#clear").on('click',function(){
	$("#mailContent").val("");
	$("#mailContentE").val("");
	
		$("#mailContent").val("");
		$("#mailContentE").val("");

		$("#lstmntSig").val("");
		$("#lstmntSig").val(null);

		$("#imgName").text("");
		console.log($("#abSig").val(""));
		$("#page-content").empty();
		$("#create-content").empty();
		$("#Id").val("0");

});