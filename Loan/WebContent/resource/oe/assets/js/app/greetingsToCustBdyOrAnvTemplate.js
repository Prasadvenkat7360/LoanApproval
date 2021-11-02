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
	$("#mailContent").show();
	$("#saveIntimation").show();
	$("#create-content").show();
	$("#createContent").show(); 
	
	$("#editContent").hide();
	$("#updateIntimation").hide();
	$("#abSig").val("");
	$("#abSig").val(null);

	$("#imgName").text("");
	
	if($("#modeS").val() == "" || $("#greetingTypeS").val() == ""){
		$("#createMail").prop('disabled',false);

		$.growl.error({
			message : "Please Select Mode and Greeting Type !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	else{
		$("#createMail").prop('disabled',false);
		
		$("#abSig").val("");
		$("#imgName").text("");
		
		var gType = $("#greetingTypeS").val();
		var mode = $("#modeS").val();
		$("#GreetingType").val(gType);
		$("#Mode").val(mode);
		$("#Id").val("0");
		
		$('#subjc').empty();
		if(gType == "Birthday"){
			$("#subjc").append("Sub : Wishing you a Happy Birthday");
		}else{
			$("#subjc").append("Sub : Wishing you a Happy Anniversary");

		}
		
		if($("#modeS").val() == "Mail" || $("#modeS").val() == "Postal"){
			$("#row1").show();
			$("#row2").show();
			$("#addRowSectionEdit").show();
		}else{
			$("#row1").hide();
			$("#row2").hide();
			$("#addRowSectionEdit").hide();
			$("#imgName").hide();
			$("#abSig").val("");
		}
		
		var params = {
				"fieldFilters":{
					"docType":"CreateOnLoadLov",
					"mode":$("#modeS").val(),
					"occassion":$("#greetingTypeS").val()
					}
					}
		postJSON('/OrderExecution/api/v1/CustomerBirthAnniversaryOnChange',JSON.stringify(params),function(data) {
			if(data.resCode == 1){
				$("#mailContent").val(data.payload.GC_Template_Details.text);
				$("#Text").val(data.payload.GC_Template_Details.text);
				
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

var onLoadFunction = function(){
	var today = new Date();
	console.log(today);
	var dd1 = today.getDate();
	var mm1 = today.getMonth() + 1;
	var yy1 = today.getFullYear();
	var todayC = dd1 + "/" + mm1 + "/" + yy1;
	
	$("#currDate").val(todayC);
	
	$('#popupheaderlabel').text('Greetings !!!');
	
	$.getJSON('/OrderExecution/api/v1/CustomerBirthAnniversaryOnloadLovs', function(data) {
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
			$.each(data.payload.occassion,	function(k, v) {
				$('#greetingTypeS').append('<option value="' + v.id + '">' + v.name + '</option>');
		});
			
		$('#statusS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.status,	function(k, v) {
				$('#statusS').append('<option value="' + v.id + '">' + v.name + '</option>');
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

$("#saveIntimation").on('click',function(){
	console.log($("#abSig").val());
	if($("#mailContent").val() == ""){
		$.growl.error({
			message  : "Please Enter Content !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		
		/*	if($("#abSig").val() != ""){
				$("#Id").val("1");
			}else{
				$("#Id").val("0");
			}
		  */
			processFileUpload("diamondCertUpload");
		/*else{
			postJSON('/OrderExecution/api/v1/GreetingCustBirthAnniversarySignatureSubmit',JSON.stringify(params),function(data) {
			if(data.resCode == 1){
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				 $("#createIntimation").modal('hide');
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
			});
		}*/
	}
});

function processFileUpload(formId)
{
	  $.ajax({
          url : "/OrderExecution/api/v1/GreetingCustBirAnnSigSubmit",
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
	var greetingTypeS = $("#greetingTypeS").val();
	var modeS = $('#modeS').val();
	var statusS = $('#statusS').val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if(greetingTypeS != "" && greetingTypeS != null){
		fieldFilters.fieldFilters["grtType"] = greetingTypeS
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

		{'name' : 'promoType','type' : 'string','map' : 'greetingType'},
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
		{'text' : 'Greeting Type','datafield' : 'promoType','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},

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
	showMyGrid(datafields, "/OrderExecution/api/v1/CustomerBirthAnniversaryOnChange","list", columns,searchFieldFilters(), updateRows, "");
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
	window.location.href="javascript:showContentPage('greetingsToCustBdyOrAnvTemplate', 'bodySwitcher')"
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
	postJSON('/OrderExecution/api/v1/CustomerBirthAnniversaryOnChange',JSON.stringify(params),function(data) {
		if(data.resCode == 1){
			$('#popupheaderlabel').text('Edit Greetings !!!');
			$("#mailContentE").show();
			$("#updateIntimation").show();
			$("#mailContentE").val(data.payload.edit.text);
			$("#imgName").text("");
			$("#GreetingType").val(data.payload.edit.greetingType);
			
			$('#subjc').empty();

			if($("#GreetingType").val() == "Birthday"){
				$("#subjc").append("Sub : Wishing you a Happy Birthday");
			}else{
				$("#subjc").append("Sub : Wishing you a Happy Anniversary");
			}
			
			$("#Mode").val(data.payload.edit.mode);
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
		}
		});
	
}

$("#updateIntimation").on('click',function(){
	console.log($("#abSig").val());
	if($("#mailContentE").val() == ""){
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
	$("#mailContent").val("");
	$("#mailContentE").val("");

	$("#abSig").val("");
	$("#abSig").val(null);

	$("#imgName").text("");
	console.log($("#abSig").val(""));
	$("#page-content").empty();
	$("#create-content").empty();
	$("#Id").val("0");

});

