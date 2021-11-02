/* 	##	Author UI : POOJA
	## 	Author JAVA : Nagesh
	## 	Date Creation : 23/03/2017
*/

var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(typeof permission != "undefined"){
	$(".layout-main button").each(function() {
		var value = '#'+this.id;
		var value2 = '#'+this.id+'C';
		var value3 = '#'+this.id+'S';
		var val = $(value).text();
		val = val.trim();
		if( val.startsWith("search") || val.startsWith("Search")){
			if(permission.canSearch == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}  
		
		if(val.startsWith("Create") || val.startsWith("create")){
			if(permission.canAdd == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if( val.startsWith("export") || val.startsWith("Export")){
			if(permission.canExport == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val.startsWith("print") || val.startsWith("Print")){
			if(permission.canPrint == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val.startsWith("delete") || val.startsWith("Delete")){
			if(permission.canDelete == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
	});
	}
}

//loadPermission();

//Search Functionality  is Started
var onLoadEmpRoles = function(){
	var data = [];
	var dataCode =[];
	
	$.getJSON('/OrderExecution/api/v1/empDesignationOnloadLOVs', function(resp) {
		 var designationNames = resp.payload.designationNames;
		 $.each(designationNames, function(key, val) {
				data.push({ value: val.id , label:val.name});
				dataCode.push({ value: val.id , label:val.description});
		});
	});
	
	$("#dCodeS").autocomplete({		
		
		source: data,
		focus: function(event, ui) {
			
			event.preventDefault();
			$(this).val(ui.item.label);
			
		},
		select: function(event, ui) {
			event.preventDefault();
			$(this).val(ui.item.label);					
			$("#dCodeS-value").val(ui.item.value);					
		}
	});
				
	
		
	$("#dNameS").autocomplete({		
		
		source: dataCode,
		focus: function(event, ui) {
			
			event.preventDefault();
			$(this).val(ui.item.label);
			
		},
		select: function(event, ui) {
			event.preventDefault();
			$(this).val(ui.item.label);					
			$("#dNameS-value").val(ui.item.value);					
		}
	});
		
}

onLoadEmpRoles();

var designationDetailsFieldFilters=function(){
	var designationCode = $("#dCodeS").val();
	var designationName = $("#dNameS").val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};

	if(designationCode !="" && designationCode !=null){
		fieldFilters.fieldFilters["desgnCode"] = designationCode;
	}
	
	if(designationName != "" && designationName != null){
		fieldFilters.fieldFilters["desgnName"] = designationName;
	}
	
	return fieldFilters;
}

//Designation details Search grid
var designationDetailsGrid = function(){
	var updateRows = function(row, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'code',
		'type' : 'string'
	}, {
		'name' : 'description',
		'type' : 'string'
	}, {
		'name' : 'id',
		'type' : 'id'
	}];

	var columns = [ {
		'text' : 'Designation Code',
		'datafield' : 'code',
		'width' : '48%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : 'Designation Name',
		'datafield' : 'description',
		'width' : '49%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		text : '',
		datafield : 'id',
		editable : false,
		cellsrenderer : editDesignation,		
		sortable : true,
		filterable: false,
		'width' : '3%'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchEmpDesignaiton","list",columns, designationDetailsFieldFilters(), updateRows);
	
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}


//Create view grid data of Designation Details
function createDesignationModalGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
	
	}

	 var datafields = [  {
			'name' : 'dSLNo',
			'type' : 'int'
		},{
			'name' : 'designationCode',
			'type' : 'string'
		}, {
			'name' : 'designationName',
			'type' : 'string'
		}];
	
		var columns = [ {
			'text' : 'Designation Code',
			'datafield' : 'designationCode',
			'width' : '45%',
			cellsalign : 'center',
			align:'center',
			editable : true
		}, {
			'text' : 'Designation Name',
			'datafield' : 'designationName',
			'width' : '45%',
			cellsalign : 'center',
			align:'center',
			editable : true
		}, {
			text : 'Action',			
			datafield : 'Delete',
			'width' : '10%',
			columntype : 'button',
			cellsalign : 'center',
			align:'center',
			cellsrenderer : function() {
				return "Delete";
			},
			buttonclick : function(row) {
				id = $("#jqxgrideD").jqxGrid('getrowid', row);
				$("#jqxgrideD").jqxGrid('deleterow', id);		
			}		
		}];
		
		var addrow = function(rowIdDC, rowdata, position, commit) {
			commit(true);
		}
		addGrid(datafields, columns, updateRows,  data , addrow, "#jqxgrideD");
		
	}

var rowId = 0;
//Add new row in edit grid 
var generaterow = function(i) {
	var row = {};
	row["dSLNo"] = i;
	row["designationCode"] ="" ;
	row["designationName"] = "";

	rowId = rowId + 1;
	return row;
}


//Add row in edit grid lines
$("#addRowD").on("click", function() {	
		$("#jqxgrideD").jqxGrid('addrow', null, generaterow(rowId + 1));	
});
//On edit load grid
var editDesignationMasterGrid = function(data) {

	var updateRows = function(rowIdDC, newdata, commit) {
		
	}
	var datafields = [{
		'name' : 'id',
		'type' : 'long'
	},{
		'name' : 'code',
		'type' : 'string'
	}, {
		'name' : 'description',
		'type' : 'string'
	}];

	var columns = [ {
		'text' : 'Designation Code',
		'datafield' : 'code',
		'width' : '50%',
		cellsalign : 'left',
		align:'center',
		editable : false
	}, {
		'text' : 'Designation Name',
		'datafield' : 'description',
		'width' : '50%',
		cellsalign : 'left',
		align:'center',
		editable : true
	}];
	
	addGrid(datafields, columns, updateRows, data, "", "#jqxgridDE");

}


var DesigntnDetails = [];
getJSON('/OrderExecution/api/v1/businessOnloadLOVs', function(response) {
		$("#companyNameC").val(response.payload.company.name);
	$("#designtnC").val(response.payload.company.id);
console.log(response.payload.company.name);	
	DesigntnDetails.push({"companyId" : response.payload.company.id,
		"companyName" : response.payload.company.name,
		"companyCode" : response.payload.company.code
	});
});

//Create Designation details
$('#createDsigntion').on('click', function(){		
	$('#companyNameC').val(DesigntnDetails[0].companyName);
	$("#designtnC").val(DesigntnDetails[0].companyId);
	createDesignationModalGrid();
	$("#jqxgrideD").show();
});
$('#saveDesignationDet').on('click',function() {
	trimmer();
			var rows = $('#jqxgrideD').jqxGrid('getrows');
			if(rows.length == 0){
				$.growl.error({
					message : "Please add designation details!!",
					duration : 10000
				});
				return false;
			}
			var designationDetLines = [];
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];

				if (row.designationCode == "" || row.designationName == ""
					|| row.designationCode == null
					|| row.designationName == null) {
				$.growl.error({
					message : "Please fill mandatory fields!!",
					duration : 10000
				});
				return false;
			}else{
					var dCode = row.designationCode;
					console.log(dCode);
					
					if(dCode.length >= 5){
						$.growl
						.error({
							message : "Code should be capital and  maximum of 4 characters!!",
							duration : 10000
						});
				    	return false;
					}
					var characterReg = /^[A-Z]+$/;				
				    if(!characterReg.test(row.designationCode)) {
				    	$.growl
						.error({
							message : "Code should be capital and  maximum of 4 characters!!",
							duration : 10000
						});
				    	return false;				    	
				    }
				    
				    var desgnName = /^[a-zA-Z\s]+$/;				    
				    if(!desgnName.test(row.designationName)) {
				    	$.growl
						.error({
							message : "Name should be character with space!!",
							duration : 10000
						});
				    	return false;
				    }
				}
				
				designationDetLines.push({
					"code" : row.designationCode.trim(),
					"description" : row.designationName.trim()				
			     	});
			     }

			var designtnLinesDetails = {
					"compId" : $("#designtnC").val(),
					"designations" : designationDetLines
				}

			postJSON('/OrderExecution/api/v1/createEmployeeDesignation', JSON
					.stringify(designtnLinesDetails), function(data) {

				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});					
					$('#createDesign').modal('hide');
					designationDetailsGrid();
				} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000,
						title : 'Error'
					});
				}
				
			});

		});


var editDesigntnMaster = function(id){	  
	$.getJSON('/OrderExecution/api/v1/getEmployeeDesignationById?id='+id, function(data) {	  
		var gridData=data.payload.designationDetails;
		$('#companyNmeE').val(gridData.company.compName);
		$('#DesigntnE').val(gridData.company.compId);
		
		var gridDataList = [{
			"id" : gridData.id,
			"code" : gridData.code,
			"description" : gridData.description
		}]
		editDesignationMasterGrid(gridDataList);
		$("#jqxgridDE").show();				
	});  
}

// Edit designation  details
var editDesignation = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"  " data-target="#editDestionDetails"  type="button" id='
			+ row
			+ ' onclick="editDesigntnMaster('
			+ value
			+ ')" /><i class="fa fa-pencil fa-sm"></i></button>';
	}
}
// ################################## Update Designation Details #########################################

//Edit designation	 Details
$('#saveDesgntnDetE').on('click', function() {
	trimmer();
	
	var rows = $('#jqxgridDE').jqxGrid('getrows');
	   var desgnLineItems = [];
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		
		if(row.id == "" || row.description	== "" ||row.code	== "" || row.id == null ||row.code == null  || row.description	== null ){
			$.growl
				.error({
					message : "Please fill mandatory fields!!",
					duration : 10000
				});
			return false;
		}else{	
		    
		    var desgnName = /^[a-zA-Z\s]+$/;
		    if(!desgnName.test(row.description)) {
		    	$.growl
				.error({
					message : "Name should be character with space!!",
					duration : 10000
				});
		    	return false;
		    }
		}
	    desgnLineItems.push({
	    	"id" : id,
			"code" : row.code.trim(),
			"description" : row.description.trim()
			
	    });		
		var desgnLines = {
				"compId" :$("#DesigntnE").val(),
				"designations" : desgnLineItems
		};

	}
	 
	if(desgnLines != null){
		postJSON('/OrderExecution/api/v1/updateEmpDesignation', JSON.stringify(desgnLines), function(data) {
	
			if (data.resCode == "1") {							
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#editDestionDetails').modal('hide');
				designationDetailsGrid();
				$('#editDestionDetails').on('hidden.bs.modal', '.modal', function () {
				    $(this).removeData('bs.modal');
				  });
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
			}
		});
	}
	  return false;
//}
});


//######################################## validation code #############################
$.validator.addMethod(
        "regx",
        function(value, element, regexp) {
            if (regexp.constructor != RegExp)
                regexp = new RegExp(regexp);
            else if (regexp.global)
                regexp.lastIndex = 0;
            return this.optional(element) || regexp.test(value);
        },
        ""
);

$('.modal').on('hidden.bs.modal', function(){
    $(this).find('form')[0].reset();
   
});