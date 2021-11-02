/**
 * ## AUTHOR 1 : POOJA ## AUTHOR 2: DIPANKAR NAHA ## DATE : 02-03-2017 ##
 * DESCRIPTION : SCRIPT TO CREATE DEPARTMENT MASTER
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

var departmentFieldFilterVal = function() {
	var deparmentS = $("#deparmentS").val();
	var departmentCodeS = $("#departmentCodeS").val();
	var departmentNameS = $("#departmentNameS").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (deparmentS != "" && deparmentS != null) {
		fieldFilters.fieldFilters["deptId"] = deparmentS;
	}
	if (departmentCodeS != "" && departmentCodeS != null) {
		fieldFilters.fieldFilters["deptCode"] = departmentCodeS;
	}
	if (departmentNameS != "" && departmentNameS != null) {
		fieldFilters.fieldFilters["deptName"] = departmentNameS;
	}

	return fieldFilters;
}

// Business details master grid
var departmentMasterGrid = function() {
	var updateRows = function(row, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'deptCode',
		'type' : 'string'
	}, {
		'name' : 'deptName',
		'type' : 'string'
	}, {
		'name' : 'business',
		'type' : 'string',
		'map' : 'business>name'
	}, {
		'name' : 'deptId',
		'type' : 'long'
	} ];

	var columns = [ {
		'text' : 'Dept Code',
		'datafield' : 'deptCode',
		'width' : '29.5%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : 'Dept Name',
		'datafield' : 'deptName',
		'width' : '34%',
		cellsalign : 'center',
		align:'center',
		editable : false
	},  {
		'text' : 'Business Name',
		'datafield' : 'business',
		'width' : '34%',
		cellsalign : 'center',
		align:'center',
		editable : false
	},{
		text : '',
		datafield : 'deptId',
		cellsrenderer : editDepartmentDet,
		editable : false,
		filterable: false,
		sortable : false,
		'width' : '2.5%'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchDepartmentMaster", 
			"list", columns,departmentFieldFilterVal(), updateRows, "");
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

// On create load grid
var createDeptmodelGrid = function() {

	var updateRows = function(rowIdDC, newdata, commit) {
		updates[newdata.id] = {
			"id" : newdata.id,
			"zoneType" : newdata.zoneType,
			"locked" : newdata.locked
		};
	}
	var datafields = [ {
		'name' : 'deptmentCodeC',
		'type' : 'string'
	}, {
		'name' : 'DcompanyNameC',
		'type' : 'string'
	} ];

	var columns = [ {
		'text' : 'Dept Code',
		'datafield' : 'deptmentCodeC',
		'width' : '400px',
		cellsalign : 'center',
		align:'center',
		editable : true
	/*
	 * validation : function(cell, value) { alert(value); return false; }
	 */

	}, {
		'text' : 'Dept Name',
		'datafield' : 'DcompanyNameC',
		'width' : '390px',
		cellsalign : 'center',
		align:'center',
		editable : true
	/*
	 * validation : function(cell, value) { alert(value); return false; }
	 */
	}, {
		text : 'Action',
		datafield : 'Delete',
		'width' : '75px',
		columntype : 'button',
		cellsrenderer : function() {
			return "Delete";
		},
		buttonclick : function(row) {
			id = $("#jqxgridDB").jqxGrid('getrowid', row);
			$("#jqxgridDB").jqxGrid('deleterow', id);
		}

	}, {
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	} ];

	var addrow = function(rowIdDC, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, "#jqxgridDB");

}
// Generate Row for business creation
var rowId = 0;
var generaterow = function(i) {
	var row = {};
	row["SLNo"] = i;
	row["deptmentCodeC"] = "";
	row["DcompanyNameC"] = "";
	rowId = rowId + 1;
	return row;
}
// Add row for create
$('#addRowD').on('click', function() {
	$("#jqxgridDB").jqxGrid('addrow', null, generaterow(rowId + 1));
});
// Create dept Details

$('#saveDeptDetC').on(
		'click',
		function() {
			trimmer();
			var rows = $('#jqxgridDB').jqxGrid('getrows');
			if(rows.length == 0){
				$.growl.error({
					message : "Please add Department Details!!",
					duration : 10000
				});
				return false;
			}
			var deptLines = [];
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];

				if (row.deptmentCodeC == "" || row.DcompanyNameC == ""
						|| row.deptmentCodeC == null
						|| row.DcompanyNameC == null) {
					$.growl.error({
						message : "Please fill Department Name And Department Code fields!!",
						duration : 10000
					});
					return false;
				}else{
					var dCode = row.deptmentCodeC;
					console.log(dCode);
					
					if(row.deptmentCodeC.length > 4){
						$.growl
						.error({
							message : "Code should be maximum of 4 characters!",
							duration : 10000
						});
				    	return false;
					}
					var characterReg = /^[A-Z]+$/;
				    if(!characterReg.test(row.deptmentCodeC)) {
				    	$.growl
						.error({
							message : "Error: Invalid Code!",
							duration : 10000
						});
				    	return false;
				    }
				    
				    var deptName = /^[a-zA-Z\s]+$/;
				    if(!deptName.test(row.DcompanyNameC)) {
				    	$.growl
						.error({
							message : "Name format is not correct!",
							duration : 10000
						});
				    	return false;
				    }
				}
				
				deptLines.push({
					"deptCode" : row.deptmentCodeC,
					"deptName" : row.DcompanyNameC
				});

			}

			var deptLinesDetails = {
				"bId" : $("#deptCompanyIdC").val(),
				"deptList" : deptLines
			}

			postJSON('/OrderExecution/api/v1/createDepartment', JSON
					.stringify(deptLinesDetails), function(data) {

				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					departmentMasterGrid();					
					$('#createDeptDet').modal('hide');				
				} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000,
						title : 'Error'
					});
				}
			});

		});

var dDetails = [];
$('#deparmentS').empty()
		.append('<option value="" selected>--Select--</option>');
var businessData = [];
getJSON('/OrderExecution/api/v1/departmentOnloadLOV', function(response) {
	var dlist = response.payload.dlist;
	$.each(dlist, function(key, val) {
		$('#deparmentS').append(
				'<option  value="' + val.deptId + '">' + val.deptName
						+ '</option>');
	});
	$("#deptCompanyNameC").val(response.payload.business.name);
	$("#deptCompanyIdC").val(response.payload.business.id);

	businessData.push({"id" : response.payload.business.id,"name" : response.payload.business.name});
});

var editDeptMaster = function(id){
	$.getJSON('/OrderExecution/api/v1/getDepartmentById?deptId='+id, function(data) {
		
		var gridData = data.payload.dept;
		$('#deptBusNameE').val(gridData[0].business.name);
		$('#deptBusIdE').val(gridData[0].business.id);
		editdepartmentMasterGrid(gridData);
		$("#jqxgridDE").show();
	});
}

// Edit Department details
var editDepartmentDet = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editDeptDetails"  type="button" id='
			+ row
			+ ' onclick="editDeptMaster('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></button>';
	}
}

// On edit load grid
var editdepartmentMasterGrid = function(data) {

	var updateRows = function(rowIdDC, newdata, commit) {
		updates[newdata.id] = {
			"id" : newdata.id,
			"zoneType" : newdata.zoneType,
			"locked" : newdata.locked
		};
	}
	var datafields = [ {
		'name' : 'deptId',
		'type' : 'long'
	}, {
		'name' : 'deptCode',
		'type' : 'string'
	}, {
		'name' : 'deptName',
		'type' : 'string'
	} ];

	var columns = [ {
		'text' : 'Dept Code',
		'datafield' : 'deptCode',
		'width' : '418px',
		cellsalign : 'center',
		align:'center',
		editable : true
	}, {
		'text' : 'Dept Name',
		'datafield' : 'deptName',
		'width' : '450px',
		cellsalign : 'center',
		align:'center',
		editable : true
	} ];
	
	addGrid(datafields, columns, updateRows, data, "", "#jqxgridDE");

}
// Edit Business Details
$('#saveDeptDetE').on('click', function() {
	trimmer();
	var rows = $('#jqxgridDE').jqxGrid('getrows');

	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		
		if(row.deptId == "" || row.deptCode	== "" || row.deptName == "" || row.deptId == null || row.deptCode	== null || row.deptName == null){
			$.growl
				.error({
					message : "Please fill mandatory fields!!",
					duration : 10000
				});
			return false;
		}else{
			
			if(row.deptCode.length > 4){
				$.growl
				.error({
					message : "Code should be maximum of 4 characters!",
					duration : 10000
				});
		    	return false;
			}
			var characterReg = /^[A-Z]+$/;
		    if(!characterReg.test(row.deptCode)) {
		    	$.growl
				.error({
					message : "Error: Invalid Code!",
					duration : 10000
				});
		    	return false;
		    }
		    
		    var deptName = /^[a-zA-Z\s]+$/;
		    if(!deptName.test(row.deptName)) {
		    	$.growl
				.error({
					message : "Name format is not correct!!",
					duration : 10000
				});
		    	return false;
		    }
		}
	    
		var deptId = row.deptId
		var deptCode = row.deptCode;
		var deptName = row.deptName;
		
		var deptLines = {
			"deptId" : deptId,
			"deptCode" : deptCode,
			"deptName" : deptName		
		};

	}
	if(deptLines != null){
		postJSON('/OrderExecution/api/v1/updateDepartmentDetails', JSON.stringify(deptLines), function(data) {
	
			if (data.resCode == "1") {							
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#editDeptDetails').modal('hide');
				departmentMasterGrid();
				$('#editDeptDetails').on('hidden.bs.modal', '.modal', function () {
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
});

// Create business details
$('#creatDeptMasterDet').on('click', function() {
	$("#deptCompanyNameC").val(businessData[0].name);
	$("#deptCompanyIdC").val(businessData[0].id);
	createDeptmodelGrid();
	$("#jqxgridDB").show();
});

// Search business details
$("#deptSearch").on('click', function() {
	departmentMasterGrid();
	$('#jqxgrid').show();  
});

// Clear All
$("#clearDept").on('click', function() {
	var validator = $("#deptDetSearch").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$('#jqxgrid').hide();
})

//####################################### Validation is Started #############################################
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