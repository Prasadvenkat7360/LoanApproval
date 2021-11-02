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


$("#create").on('click',function(){
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
	$.getJSON('/OrderExecution/api/v1/crudLoyCustWelLetterTemplate?templateId=0&&type=create',function(data) {
		if(data.resCode == 1){
			$("#currDate").val(todayC);

			$("#mailContent").val(data.payload.create.text);
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

$("#save").on('click',function(){
	if($("#mailContent").val() == ""){
		$.growl.error({
			message : "Please Enter Content !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		var createDetails = {"temText": $("#mailContent").val()}
		
		postJSON('/OrderExecution/api/v1/createLoyCustWelLetterTemplate',JSON.stringify(createDetails),function(data) {
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
		});
	}
});

$("#search").on('click',function(){
  if($("#fromDate").val() == "" || $("#toDate").val() == ""  ){
	  $.growl.error({
		 message : "Please Fill Mandatory Fields !!",
		 duration : 10000,
		 title : 'Error'
	  });
	  return false;
  }else{
	  welcomeLetterSearchGrid();
	  $("#jqxgrid").show();
  }	
});

var searchFieldFilters = function() {
	var statusS = $('#statusS').val();
	var fromDateS = $('#fromDate').val();
	var toDateS = $('#toDate').val();
	
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
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	return fieldFilters;
}

//Search Grid Started
function welcomeLetterSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'id','type' : 'string','map' : 'id'},
		{'name' : 'createdDate','type' : 'string','map' : 'createdDate'}, 

		{'name' : 'actionV','type' : 'int','map' : 'id'},
		{'name' : 'actionE','type' : 'int','map' : 'id'},
		{'name' : 'actionD','type' : 'int','map' : 'id'},

		{'name' : 'ActiveInActive','type' : 'string','map' : 'activeInActive'}, 
		{'name' : 'version','type' : 'int','map' : 'version'}, 
		{'name' : 'text','type' : 'string','map' : 'id'},

        ];

	var columns = [
		{'text' : 'Template Id','datafield' : 'id','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : true},
		{'text' : 'Created Date','datafield' : 'createdDate','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Active/In-Active','datafield' : 'ActiveInActive','width' : '20%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			/*cellsrenderer: function(row, column, value){
				if(value == true){
					return "<div align='center'style='margin-top:8px;'>Active</div>";
				}else{
					return "<div align='center'style='margin-top:8px;'>In-Active</div>";
				}
	      		
	      	} */
		},
		{'text' : 'Version','datafield' : 'version','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},

		{'text' : 'View','datafield' : 'actionV','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemViewRenderer},
		{'text' : 'Edit','datafield' : 'actionE','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemEditRenderer},
		{'text' : 'Delete','datafield' : 'actionD','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemDeleteRenderer},
		{'text' : '','datafield' : 'text','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true,hidden : true},

		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchLoyCustWelLetterTemplate","list", columns,searchFieldFilters(), updateRows, "id");
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

var intRemViewRenderer = function(row, column, value) {
    var flag = $("#jqxgrid").jqxGrid('getrowdata', row);
    console.log(flag);
    	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation"  type="button" id='
    	+ row
    	+ ' onclick="viewWelcomeLetter('
    	+ value
    	+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-lg"></i></a>'
}

var intRemEditRenderer = function(row, column, value) {
    var flag = $("#jqxgrid").jqxGrid('getrowdata', row);
    console.log(flag);
    
    if(flag.ActiveInActive == "Active"){
    	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation"  type="button" id='
    	+ row
    	+ ' onclick="editwelComeLetter('
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

var intRemDeleteRenderer = function(row, column, value) {
    var flag = $("#jqxgrid").jqxGrid('getrowdata', row);
    console.log(flag);
    
    if(flag.ActiveInActive == "Active"){
    	return '<a class="btn btn-sm btn-primary" type="button" id='
    	+ row
    	+ ' onclick="deleteWelcomeLetter('
    	+ value
    	+ ')" href="javascript:void(0);"/><i class="fa fa-trash fa-lg"></i></a>'
    }else{
    	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation" disabled type="button" id='
    	+ row
    	+ ' onclick="deleteWelcomeLetter('
    	+ value
    	+ ')" href="javascript:void(0);"/><i class="fa fa-trash fa-lg"></i></a>'
    }
}

var viewWelcomeLetter = function(id){
	$.getJSON('/OrderExecution/api/v1/crudLoyCustWelLetterTemplate?templateId='+id+'&&type=view',function(data) {
		if(data.resCode == 1){
			$("#mailContent").val(data.payload.view.text);
			$("#mailContent").prop('disabled',true);
			
			$("#save").hide();
			$("#update").hide();
			$("#clear").hide();
			$("#updateContent").hide();
			$("#createContent").show();
		}else{
			$("#mailContent").prop('disabled',true);
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
}

var editwelComeLetter = function(id){
	
	$.getJSON('/OrderExecution/api/v1/crudLoyCustWelLetterTemplate?templateId='+id+'&&type=edit',function(data) {
		if(data.resCode == 1){
			$("#mailContentE").prop('disabled',false);
			$("#mailContentE").val(data.payload.edit.text);
			
			$("#save").hide();
			$("#update").show();
			$("#createContent").hide();
			$("#updateContent").show();
			$("#clear").show();
			
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

var deleteWelcomeLetter = function(id){
	$.getJSON('/OrderExecution/api/v1/crudLoyCustWelLetterTemplate?templateId='+id+'&&type=delete',function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			 welcomeLetterSearchGrid();
			 $("#jqxgrid").show();
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

$("#update").on('click',function(){
	if($("#mailContentE").val() == ""){
		$.growl.error({
			message : "Please Enter Content !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		var editDet = {"temText":$("#mailContentE").val()}
		
		postJSON('/OrderExecution/api/v1/createLoyCustWelLetterTemplate',JSON.stringify(editDet),function(data) {
			if(data.resCode == 1){
				$.growl.notice ({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
			 welcomeLetterSearchGrid();
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
		});
	}
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('welcomeLetterTemplate', 'bodySwitcher')"
});

$("#clear").on('click',function(){
	$("#mailContent").val("");
	$("#mailContentE").val("");
});