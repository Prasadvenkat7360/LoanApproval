/*
 * 
 *  ##	Author UI :POOJA SANGVE
	## 	Author JAVA : 
	## 	Date Creation : 28/03/2017
 * 
 *
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
var storeArray;
var dcArray;

$('#designationDet').show();
$('#roleDet').hide();
$('#employeeDet').hide();
$('input:radio[name=employeeDet]').filter('[value="1"]').attr('checked', true);
$('input[name=employeeDet]:radio').on('click', function() {
	var selectedVal = $(this).val();
	if (selectedVal == 1) {
		$('#designationDet').show();
		$('#roleDet').hide();
		$('#employeeDet').hide();
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	} else if (selectedVal == 2) {
		$('#designationDet').hide();
		$('#roleDet').show();
		$('#employeeDet').hide();
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	} else if (selectedVal == 3) {
		$('#designationDet').hide();
		$('#roleDet').hide();
		$('#employeeDet').show();
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	}
});
//## test 
$("#dscctPercentage").prop('disabled', false);
$("#flatAmtDiss").prop('disabled', false);

$("#dscctPercentageE").prop('disabled', false);
$("#flatAmtDissE").prop('disabled', false);


$("#dscctPercentage").on('keyup', function(){
	var neVal = $(this).val();
	if(neVal != "" || neVal != null){
		$("#flatAmtDiss").prop('disabled', true);
	}
	if(neVal == "" || neVal == null){
		$("#flatAmtDiss").prop('disabled', false);
	}
})	

$("#flatAmtDiss").on('keyup', function(){
	var neVal = $(this).val();
	if(neVal != "" || neVal != null){
		$("#dscctPercentage").prop('disabled', true);
	}
	if(neVal == "" || neVal == null){
		$("#dscctPercentage").prop('disabled', false);
	}
})	


$("#dscctPercentage").on('blur', function(){
	var neVal = $(this).val();
	if(neVal != "" || neVal != null){
		$("#flatAmtDiss").prop('disabled', true);
	}
	if(neVal == "" || neVal == null){
		$("#flatAmtDiss").prop('disabled', false);
	}
})	

$("#flatAmtDiss").on('blur', function(){
	var neVal = $(this).val();
	if(neVal != "" || neVal != null){
		$("#dscctPercentage").prop('disabled', true);
	}
	if(neVal == "" || neVal == null){
		$("#dscctPercentage").prop('disabled', false);
	}
})	


// Edit

$("#dscctPercentageE").on('keyup', function(){
	var neVal = $(this).val();
	if(neVal != "" || neVal != null){
		$("#flatAmtDissE").prop('disabled', true);
	}
	if(neVal == "" || neVal == null){
		$("#flatAmtDissE").prop('disabled', false);
	}
})	

$("#flatAmtDissE").on('keyup', function(){
	var neVal = $(this).val();
	if(neVal != "" || neVal != null){
		$("#dscctPercentageE").prop('disabled', true);
	}
	if(neVal == "" || neVal == null){
		$("#dscctPercentageE").prop('disabled', false);
	}
})	


$("#dscctPercentageE").on('blur', function(){
	var neVal = $(this).val();
	if(neVal != "" || neVal != null){
		$("#flatAmtDissE").prop('disabled', true);
	}
	if(neVal == "" || neVal == null){
		$("#flatAmtDissE").prop('disabled', false);
	}
})	

$("#flatAmtDissE").on('blur', function(){
	var neVal = $(this).val();
	if(neVal != "" || neVal != null){
		$("#dscctPercentageE").prop('disabled', true);
	}
	if(neVal == "" || neVal == null){
		$("#dscctPercentageE").prop('disabled', false);
	}
})	


// Role Search is Started ############################################################################
var roleDetailsVal = function() {
	var roleCode = $("#rCodeS").val();
	var roleName = $("#rNameS").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (roleCode != "" && roleCode != null) {
		fieldFilters.fieldFilters["roleCode"] = roleCode;
	}
	if (roleName != "" && roleName != null) {
		fieldFilters.fieldFilters["roleName"] = roleName;
	}

	return fieldFilters;
}
//search Role
$("#searchRole").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	roleSearchgrid();
	$("#jqxgrid").show();
});
// Role Create is Started ###############################################################################
var roleDetails = [];
getJSON('/OrderExecution/api/v1/businessOnloadLOVs', function(response) {
		$("#rcompanyNameC").val(response.payload.company.name);
	$("#roleC").val(response.payload.company.id);
console.log(response.payload.company.name);	
roleDetails.push({"companyId" : response.payload.company.id,
		"companyName" : response.payload.company.name,
		"companyCode" : response.payload.company.code
	});
});

//Create Designation details
$('#createRoleC').on('click', function(){		
	$('#rcompanyNameC').val(roleDetails[0].companyName);
	$("#roleC").val(roleDetails[0].companyId);
	 $('#jqxgridRole').jqxGrid('clear');
	roleMasterGrid();
	$("#jqxgridRole").show();
});
//Employee Search is Started ################################################################################
var empDetailsVal = function() {
	var deptS = $("#deptS").val();
	var roleS = $("#roleS").val();
	var DesignationS = $("#DesignationS").val();
	var nameS = $("#nameS").val();
	var StoreDcCS = $("#StoreDcCS").val();
	var empStoreDcS = $("#empStoreDcS").val();
	var activeinactiveS = $("#activeInactiveS").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (deptS != "" && deptS != null) {
		fieldFilters.fieldFilters["deptId"] = deptS;
	}
	if (roleS != "" && roleS != null) {
		fieldFilters.fieldFilters["roleId"] = roleS;
	}
	if (DesignationS != "" && DesignationS != null) {
		fieldFilters.fieldFilters["desigId"] = DesignationS;
	}
	if (nameS != "" && nameS != null) {
		fieldFilters.fieldFilters["empName"] = nameS;
	}
	/*if (StoreDcCS != "" && StoreDcCS != null) {
		fieldFilters.fieldFilters["storeId"] = StoreDcCS;
	}*/
	if(StoreDcCS=="store"){
		fieldFilters.fieldFilters["storeId"] = empStoreDcS;
	}
    if(StoreDcCS=="DC"){
		fieldFilters.fieldFilters["dcId"] = empStoreDcS;
	}
	if (activeinactiveS != "" && activeinactiveS != null) {
		fieldFilters.fieldFilters["isActive"] = activeinactiveS;
	}
	return fieldFilters;
}
//Employee Master details Search grid
var employeeSearchGrid = function() {
	var updateRows = function(row, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'empId',
		'type' : 'string'
	}, {
		'name' : 'empName',
		'type' : 'string'
	}, {
		'name' : 'startDate',
		'type' : 'string'
	}, {
		'name' : 'department',
		'map' : 'department>description',
		'type' : 'string'
	}, {
		'name' : 'designation',
		'map' : 'designation>description',
		'type' : 'string'
	}, {
		'name' : 'role',
		'map' : 'role>name',
		'type' : 'string'
	}, {
		'name' : 'isActiveFlag',
		'type' : 'string'
	}, {
		'name' : 'isBlocked',
		'type' : 'string'
	}, {
		'name' : 'hrmsId',
		'type' : 'string'
	},{
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'empId'
	} ];

	var columns = [ {
		'text' : 'Emp Id',
		'datafield' : 'empId',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Emp Name',
		'datafield' : 'empName',
		'width' : '13%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Date of Joining',
		'datafield' : 'startDate',
		'width' : '12.6%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Department',
		'datafield' : 'department',
		'width' : '13%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Designation',
		'datafield' : 'designation',
		'width' : '13%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Role',
		'datafield' : 'role',
		'width' : '11%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Status',
		'datafield' : 'isActiveFlag',
		'width' : '12%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Blocked Yes/No',
		'datafield' : 'isBlocked',
		'width' : '13%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		text : '',
		datafield : 'actionId',
		'width' : '2.4%',
		editable : false,
		cellsrenderer : editEmpDetailsE,
		sortable : true,
		filterable: false
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/SearchEmployee", "list",
			columns, empDetailsVal(), updateRows, "");

	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		rowdetails : true,
		virtualmode : true
	});
}

$("#StoreDcCS").on("change",function() {
			$('#empStoreDcS').empty().append('<option value="" selected>--Select--</option>');
			var id = $('#StoreDcCS').val();
			if (id != "") {
				$.getJSON('/OrderExecution/api/v1/metalAccountLOV?page=storeOrDc&sdc='+ id, function(data) {
					$.each(data.payload.allStores, function(key, val) {
				    $('#empStoreDcS').append('<option value="' + val.id + '">' + val.name + '</option>');
			  });
		 });
	 }
});

$('#empRegionE').on("change",function(){
	$('#empStoreDcE').empty().append('<option value="" selected>--Select--</option>');
	$('#StoreDcE').val("");
});

$('#empRegion').on("change",function(){
	$('#empStoreDc').empty().append('<option value="" selected>--Select--</option>');
	$('#StoreDcC').val("");
});

$("#StoreDcC").on("change",function() {
			$('#empStoreDc').empty().append('<option value="" selected>--Select--</option>');
			$('#empRole').empty().append('<option value="" selected>--Select--</option>');
			$('#stkChkRole').empty().append('<option value="" selected>--Select--</option>');
			var id = $('#StoreDcC').val();
			var empRegion = $('#empRegion').val();
			if (id != "" && empRegion !="") {
		    $.getJSON('/OrderExecution/api/v1/getStoreDCListByRegion?storeOrDC='+id+"&"+'regionId='+empRegion,function(data) {
					$.each(data.payload.list, function(key, val) {
						$('#empStoreDc').append('<option value="' + val.id + '">' + val.name + '</option>');
					});
				});
		    
		    $.getJSON('/OrderExecution/api/v1/FindRoleByPortal?storeorDc='+id,function(data) {
				$.each(data.payload.Role, function(key, val) {
					$('#empRole').append('<option value="' + val.id + '">' + val.description + '</option>');
				});
			});
		    
		    $.getJSON('/OrderExecution/api/v1/FindRoleByPortal?storeorDc='+id,function(data) {
				$.each(data.payload.Role, function(key, val) {
					$('#stkChkRole').append('<option value="' + val.id + '">' + val.description + '</option>');
				});
			});
			 }else if (empRegion =="" || empRegion == null){
			    $.growl.error({
				message : "Please select the Region!!",
				duration : 10000
		});
	 }
});


$("#StoreDcE").on("change",	function() {
	
	$('#empStoreDcE').empty().append('<option value="" selected>--Select--</option>');
	$('#empRoleE').empty().append('<option value="" selected>--Select--</option>');
	$('#stkChkRoleE').empty().append('<option value="" selected>--Select--</option>');
	var id = $('#StoreDcC').val();
	var empRegion = $('#empRegionE').val();
	var id = $('#StoreDcE').val();
	
	if (id != "" && empRegion !=""){
		$.getJSON('/OrderExecution/api/v1/getStoreDCListByRegion?storeOrDC='+id+"&"+'regionId='+empRegion,function(data) {
			$.each(data.payload.list, function(key, val) {
			$('#empStoreDcE').append('<option value="' + val.id + '">' + val.name + '</option>');
	   });
					
	 $.getJSON('/OrderExecution/api/v1/FindRoleByPortal?storeorDc='+id,function(data) {
			$.each(data.payload.Role, function(key, val) {
				$('#empRoleE').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
		});
	 
	 $.getJSON('/OrderExecution/api/v1/FindRoleByPortal?storeorDc='+id,function(data) {
			$.each(data.payload.Role, function(key, val) {
				$('#stkChkRoleE').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
		});
		    });
	}else if (empRegion =="" || empRegion == null){
		 $.growl.error({
				message : "Please select the Region!!",
				duration : 10000
			});
	   }
});


var saveEmpDetails = function() {

	var empDets = {
		"empName" : $('#empName').val(),
		"startDate" : $('#empDateJoin').val(),
		"endDate" : $('#empDateLeave').val(),
		"department" : {
			"id" : parseInt($('#empDept').val()),
		},
		"empGrade" : $('#empGrade').val(),
		"empPartTime" : $('#empPartTime').val(),
		"address" : {
			"address1" : $('#address1').val(),
			"address2" : $('#address2').val(),
			"address3" : $('#address3').val(),
		},
		"region" : {
			"id" : parseInt($('#empRegion').val()),
		},
		"isActiveFlag" : "1",
		"role" : {
			"id" : parseInt($('#empRole').val()),
		},
		"stkChkRole" : {
			"id" : parseInt($('#stkChkRole').val()),
		},
		"designation" : {
			"id" : parseInt($('#empDesignation').val()),
		},
		  "companyDTO": {
			    "compId": parseInt($('#empC').val()),
			  },
			  "zoneDTO": {
				    "zone_id":  parseInt($('#empZoneId').val()),
				  },
		"adhocAmt" : parseInt($('#empAdHocAmnt').val()),
		"noOfTimes" : $('#psqGivenNo').val(),
		"empSal" : parseInt($('#empSalary').val()),
		"empTrainingPer" : parseInt($('#empTrainingPeriod').val()),
		"password" : $('#empPass').val(),
		"isBlocked" : $('#empBlocked').val(),
		"mobile" : parseInt($('#empPhnNo').val()),
		"email" : $('#empCustMId').val(),
		"personalEmailId" : $('#empPersonalMailId').val(),
		"discountPerc" : parseFloat($('#dscctPercentage').val()),
		"flatAmtDisc" : parseFloat($('#flatAmtDiss').val()),
		"storeOrDCType" : $('#StoreDcC').val(),
		"hrmsId" : $('#empHRMSId').val(),
		"storeOrDCId" : parseInt($('#empStoreDc').val()),
		"empTrainingPerAmt" : parseInt($('#empTrainingPrdAmt').val()),
		"weighingScaleFlag" : ($("#wsFlagC").val() == "True") ? true : false,
		"metalLocChk" : ($("#scFlagC").val() == "true") ? 1 : 0 

	}
	return empDets;
}
function validateNumber1(val) {
	var regex = /^\d{0,9}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}

function discountPerctage(val)
{
var regex = /^\d{0,2}(\.\d{0,2})?$/;
if (val && !isNaN(val) && regex.test(val)) {
	return parseFloat(val).toFixed(2);
	
}
return '';

}
function validateNumber(val) {
	var regex = /^\d{0,2}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}


$('#empDetCreateC').validate(
		{
			errorElement : 'label',
			errorClass : 'help-inline',
			focusInvalid : false,
			ignore : "",
			rules : {
				"empName" : {
					required : true,
					regx : /^[a-zA-Z\s]+$/
				},
				"empDateJoin" : {
					required : true,
					dateITA : true
				},
				"empDept" : {
					required : true
				},
				"empPartTime" : {
					required : true
				},
				"address1" : {
					required : true
				},
				"address2" : {
					required : true
				},
				"empRegion" : {
					required : true
				},
				"empRole" : {
					required : true
				},
				"stkChkRole" : {
					required : true
				},
				"scFlagC" : {
					required : true
				},
				"empDesignation" : {
					required : true
				},
				"empHRMSId" : {
					required : true,
					regx : /^[0-9a-zA-Z',-]+$/
				},
				"empPass" : {
					required : true
				},
				"StoreDcC" : {
					required : true
				},
				"empStoreDc" : {
					required : true
				},
				"empComId" : {
					required : true
				},
				"empPersonalMailId" : {
					required : true,
					email : true
				},
				"empTrainingPeriod" : {
					number : true,
					//required : true,
					maxlength:2
				},
				"empPhnNo" : {
					  number : true,
					  required : true,
					  maxlength:10,
					  minlength:10
				},
				"empCustMId" : {
					  email : true					  
				},
				"wsFlagC" : {
					required : true
				},
			},
			messages : {
				"empName" : {
					regx : "Only character with space!"
				},
			"empTrainingPeriod":{
				maxlength: "Please enter no. less than or equal to 2 characters!"
			},
			"empHRMSId":{
				regx : "Please enter the alpha numeric value!"
			},
				"empPhnNo":{
					maxlength: "Enter 10 digit no.",
					minlength:"Enter 10 digit no."
					
				}
		
			},
			errorPlacement : function(error, element) {
				if (element.context.name == "empDateJoin") {
					error.insertAfter(element.parent());
				} else {
					error.insertAfter(element);
				}
			},
			submitHandler : function(form) {
				trimmer();
				
				var StoreDcC = 	$("#StoreDcC").val();
				var empZoneId = $("#empZoneId").val();
					if ( StoreDcC === "DC" && empZoneId == "") {
						$.growl.error({
							message :"Emp zone id is mandatory." ,
							duration : 10000,
							title : 'Error'
						});
					return false;
					}
				var empDetsS = saveEmpDetails();
				if (empDetsS) {
					postJSON('/OrderExecution/api/v1/createEmployee', JSON
							.stringify(empDetsS), function(data) {
						if (data.resCode == "1") {
							$.growl.notice({
								message : data.mesgStr,
								duration : 10000,
								title : 'Success'
							});
							$('#createEmployeeDet').modal('hide');
							$('#createEmployeeDet').on('hidden.bs.modal',
									function() {
										$(this).find('form').trigger('reset');									});
							
							employeeSearchGrid();
						} else {
							$.growl.error({
								message : data.mesgStr,
								duration : 10000
							});
						}
					});
				}
				return false;
			}
		});

$.date = function(dateObject) {
	var d = new Date(dateObject);
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}
	var date = day + "/" + month + "/" + year;

	return date;
};

$("#empDateJoin").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	onSelect : function(dateStr) {
		var min = $(this).datepicker('getDate');
		$("#empDateLeave").datepicker('option', 'minDate', min || '0');

	}
});

$("#empDateLeave").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	minDate : 0
});


var editEmpDetailsE = function(row, column, value) {
	$("#flatAmtDissE").prop('disabled',false);	
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editEmpDetE"  type="button" id='
			+ row
			+ ' onclick="editEmpDetails('
			+ value
			+ ')" /><i class="fa fa-pencil fa-sm"></i></button>'
	}
}

var statusLov = [{
	"id" : 1,
	"name" : "Active"
},{
"id" : 0,
"name" : "In-Active"
}];


// on load API for the edit
var onLoadDropDownZone = function(zoneId){
	$('#empZoneId').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/employeeOnloadLOVs', function(data) {
		$.each(data.payload.zoneList, function(key, val) {
			
			if (zoneId == val.id) {
				$('#empZoneIdE').append('<option selected value="' + val.id + '">' + val.description + '</option>');
			} else {
				$('#empZoneIdE').append('<option value="' + val.id + '">' + val.description + '</option>');
			}			
		});
	});
}
//auto populating values for create
var arryEmpCreation = [];
$("#createEmployee").on("click",function(){
	$('#empComId').val(arryEmpCreation[0].companyid);
	 $('#empC').val(arryEmpCreation[0].empC);
	 $('#empCreatedOn').val(arryEmpCreation[0].empCreatedOn);

})

var onLoadDropDown = function(gradEmp, deptId, desigId, empRegId , empRoleS, status ) {
	 
	$('#empZoneIdE').empty().append('<option value="" selected>--Select--</option>');
	
	$('#empDeptE').empty().append('<option value="" selected>--Select--</option>');
	
	$('#empDesignationE').empty().append('<option value="" selected>--Select--</option>');
	
	$('#empDesignation').empty().append('<option value="" selected>--Select--</option>');
	
	$('#empRegionE').empty().append('<option value="" selected>--Select--</option>');
	
	$('#empRegion').empty().append('<option value="" selected>--Select--</option>');
	
	$('#empRoleE').empty().append('<option value="" selected>--Select--</option>');
	
	$('#empRole').empty().append('<option value="" selected>--Select--</option>');
	
	$('#empGradeE').empty().append('<option value="" selected>--Select--</option>');
	
	$('#empGrade').empty().append('<option value="" selected>--Select--</option>');
	
	$('#empDept').empty().append('<option value="" selected>--Select--</option>');	
	
	$('#actInActE').empty().append('<option value="" selected>--Select--</option>');	
	
	//$('#empZoneId').empty().append('<option value="" selected>--Select--</option>');
	
	$.each(statusLov, function(key, val) {
		if (status == val.id) {
			$('#actInActE').append('<option selected value="' + val.id + '">' + val.name + '</option>');
		} else {
			$('#actInActE').append('<option value="' + val.id + '">' + val.name + '</option>');
		}
	});
	
	$.getJSON('/OrderExecution/api/v1/FindRoleByPortal?storeorDc=Store', function(data) {
		storeArray = data.payload.Role;		    
	});
	
	$.getJSON('/OrderExecution/api/v1/FindRoleByPortal?storeorDc=DC', function(data) {
		dcArray = data.payload.Role;		    
	});

	$.getJSON('/OrderExecution/api/v1/employeeOnloadLOVs', function(data) {
		arryEmpCreation.push({"companyid":data.payload.company.name,"empC":data.payload.company.id,"empCreatedOn":data.payload.createdOn});
		$('#empComId').val(data.payload.company.name);
		 $('#empC').val(data.payload.company.id);
		 $('#empCreatedOn').val(data.payload.createdOn);
		 
		 $.each(data.payload.zoneList, function(key, val) {
				
			//	$('#empZoneId').append('<option  value="' + val.id + '">' + val.description + '</option>');			
				$('#empZoneIdE').append('<option  value="' + val.id + '">' + val.description + '</option>');	
					
			});
		 
		$.each(data.payload.deptList, function(key, val) {
			$('#empDept').append('<option value="' + val.DeptId + '">' + val.DeptName + '</option>');			
			if (deptId == val.DeptId) {
				$('#empDeptE').append('<option selected value="' + val.DeptId + '">' + val.DeptName + '</option>');
			} else {
				$('#empDeptE').append('<option value="' + val.DeptId + '">' + val.DeptName + '</option>');
			}
		});
	
		$.each(data.payload.desigList, function(key, val) {			
			$('#empDesignation').append('<option  value="' + val.id + '">' + val.description + '</option>');			
			if (desigId == val.id) {
				$('#empDesignationE').append('<option selected value="' + val.id + '">' + val.description + '</option>');
			} else {
				$('#empDesignationE').append('<option value="' + val.id + '">' + val.description + '</option>');
			}			
	   });
		$.each(data.payload.regionList, function(key, val) {
			
			$('#empRegion').append(	'<option value="' + val.id + '">' + val.name + '</option>');		
			if (empRegId == val.id) {
				$('#empRegionE').append('<option selected value="' + val.id + '">' + val.name + '</option>');
			} else {
				$('#empRegionE').append('<option value="' + val.id + '">' + val.name + '</option>');
			}			
	   });
         
		$.each(data.payload.empGradeList, function(key, val) {			
				$('#empGrade').append('<option value="' + val.id + '">' + val.name + '</option>');			
				if (gradEmp == val.id) {
					$('#empGradeE').append(
					'<option selected value="' + val.id + '">'	+ val.name + '</option>');
				} else {
					$('#empGradeE').append('<option value="' + val.id + '">' + val.name + '</option>');
				}			
		});
	/*	$.each(data.payload.roleList, function(key, val) {			
			$('#empRole').append('<option value="' + val.id + '">' + val.name + '</option>');			
			if (empRoleS == val.id) {
				$('#empRoleE').append('<option selected value="' + val.id + '">'	+ val.name + '</option>');
			} else {
				$('#empRoleE').append('<option value="' + val.id + '">' + val.name + '</option>');
			}			
	});*/
	});

$('#deptS').empty().append('<option value="" selected>--Select--</option>');
$('#DesignationS').empty().append('<option value="" selected>--Select--</option>');
$('#roleS').empty().append('<option value="" selected>--Select--</option>');

$.getJSON('/OrderExecution/api/v1/employeeOnloadLOVs', function(data) {

$.each(data.payload.deptList, function(key, val) {
$('#deptS').append(	'<option value="' + val.DeptId + '">' + val.DeptName + '</option>');
});

$.each(data.payload.desigList, function(key, val) {
$('#DesignationS').append('<option value="' + val.code + '">' + val.description + '</option>');
});
$.each(data.payload.roleList,function(key, val) {
$('#roleS').append('<option value="' + val.id + '">' + val.name + '</option>');
});
var empName = data.payload.empNames;
var data =[];
$.each(empName,function(key, val) {
	data.push({ value: val.id , label:val.name});
	});

	$(function() {
		$("#nameS").autocomplete({

			source : data,
			focus : function(event, ui) {

				event.preventDefault();
				$(this).val(ui.item.label);

			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
				$("#nameS-value").val(ui.item.value);
			}
		});
	});

});
}
var onLoadAPIList = function(storeOrDCType,storeDCId) {
	$('#empStoreDcE').empty().append('<option value="" selected>--Select--</option>');	
		$.getJSON(
				'/OrderExecution/api/v1/metalAccountLOV?page=storeOrDc&sdc='
						+ storeOrDCType, function(data) {
							$.each(data.payload.allStores, function(key, val) {	
								if(storeDCId == val.id){
									$('#empStoreDcE').append('<option selected value="' + val.id + '">' + val.name + '</option>');
								}else{
									$('#empStoreDcE').append('<option value="' + val.id + '">' + val.name + '</option>');
								}
							});
						});
		      	    }
                 


onLoadDropDown();
//onLoadAPIList();
var editEmpDetails = function(id) {
	$("#flatAmtDissE").prop('disabled',false);
	$('#employeeEditableLabel').text('Edit Employee Details	Master');
	$('#empRoleE').empty().append('<option value="" selected>--Select--</option>');
	$('#stkChkRoleE').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/editEmployeeById?id=' + id,
			function(data) {

				var emplist = data.payload.emp[0];
				onLoadDropDown(emplist.empGrade, emplist.department.id,emplist.designation.id,emplist.region.id,emplist.role.id,emplist.isActiveFlag);
				if(emplist.zoneDTO != null){
					onLoadDropDownZone(emplist.zoneDTO.zone_id);
				}
				console.log(emplist);
				onLoadAPIList(emplist.storeOrDCType, emplist.storeOrDCId);
				
				var empAct = emplist.isActiveFlag;
				console.log(empAct);
					if(empAct == "0")
					{
						$("#actInActE").prop('disabled',true);
						$("#empIdE").prop('disabled',true);
						$("#empNameE").prop('disabled',true);
						$("#empDateJoinE").prop('disabled',true);
						$("#empDateLeaveE").prop('disabled',true);
						
						$("#empDeptE").prop('disabled',true);
						$("#empPartTimeE").prop('disabled',true);
						$("#address1E").prop('disabled',true);
						$("#address2E").prop('disabled',true);
						
						$("#address3E").prop('disabled',true);
						$("#empRegionE").prop('disabled',true);
						$("#empRoleE").prop('disabled',true);
						$("#empGradeE").prop('disabled',true);
						
						$("#empAdHocAmntE").prop('disabled',true);
						$("#psqGivenNoE").prop('disabled',true);
						$("#empSalaryE").prop('disabled',true);
						$("#empDesignationE").prop('disabled',true);
						
						$("#empTrainingPeriodE").prop('disabled',true);
						$("#empTrainingPrdAmtE").prop('disabled',true);
						$("#empPassE").prop('disabled',true);
						$("#empHRMSIdE").prop('disabled',true);
						
						$("#empBlockedE").prop('disabled',true);
						$("#empPhnNoE").prop('disabled',true);
						$("#empStoreDcE").prop('disabled',true);
						$("#empZoneIdE").prop('disabled',true);
						
						$("#empCustMIdE").prop('disabled',true);
						$("#empPersonalMailIdE").prop('disabled',true);
						$("#dscctPercentageE").prop('disabled',true);
						$("#flatAmtDissE").prop('disabled',true);
						$("#StoreDcE").prop('disabled',true);
						$("#wsFlagE").prop('disabled',true);
						$("#saveE").prop('disabled',true);
					}
					else
					{
						$("#actInActE").prop('disabled',false);
						$("#empIdE").prop('disabled',false);
						$("#empNameE").prop('disabled',false);
						$("#empDateJoinE").prop('disabled',false);
						$("#empDateLeaveE").prop('disabled',false);
						
						$("#empDeptE").prop('disabled',false);
						$("#empPartTimeE").prop('disabled',false);
						$("#address1E").prop('disabled',false);
						$("#address2E").prop('disabled',false);
						
						$("#address3E").prop('disabled',false);
						$("#empRegionE").prop('disabled',false);
						$("#empRoleE").prop('disabled',false);
						$("#empGradeE").prop('disabled',false);
						
						$("#empAdHocAmntE").prop('disabled',false);
						$("#psqGivenNoE").prop('disabled',false);
						$("#empSalaryE").prop('disabled',false);
						$("#empDesignationE").prop('disabled',false);
						
						$("#empTrainingPeriodE").prop('disabled',false);
						$("#empTrainingPrdAmtE").prop('disabled',false);
						$("#empPassE").prop('disabled',false);
						$("#empHRMSIdE").prop('disabled',false);
						
						$("#empBlockedE").prop('disabled',false);
						$("#empPhnNoE").prop('disabled',false);
						$("#empStoreDcE").prop('disabled',false);
						$("#empZoneIdE").prop('disabled',false);
						
						$("#empCustMIdE").prop('disabled',false);
						$("#empPersonalMailIdE").prop('disabled',false);
						$("#dscctPercentageE").prop('disabled',false);
						$("#flatAmtDissE").prop('disabled',false);
						$("#StoreDcE").prop('disabled',false);
						$("#wsFlagE").prop('disabled',false);
						$("#saveE").prop('disabled',false);
					}
				$("#empIdE").val(emplist.empId);
				$("#empNameE").val(emplist.empName);
				$("#empDateJoinE").val(emplist.startDate);
				$("#empDateLeaveE").val(emplist.endDate);
				$("#empPartTimeE").val(emplist.empPartTime);
				$("#address1E").val(emplist.address.address1);
				$("#address2E").val(emplist.address.address2);
				$("#address3E").val(emplist.address.address3);
				$("#actInActE").val(emplist.isActiveFlag);
				$("#empGradeE").val(emplist.empGrade);
				$("#empAdHocAmntE").val(emplist.adhocAmt);
				$("#psqGivenNoE").val(emplist.noOfTimes);
				$("#empSalaryE").val(emplist.empSal);
				$("#empUpdatedOnE").val(emplist.UpdatedOn);
				$("#empTrainingPeriodE").val(emplist.empTrainingPer);
				$("#empTrainingPrdAmtE").val(emplist.empTrainingPerAmt);
				$("#empHRMSIdE").val(emplist.hrmsId);
				$("#empCreatedOnE").val(emplist.createdOn);
				$("#empPassE").val(emplist.password);
				$("#empBlockedE").val(emplist.isBlocked);
				$("#empPhnNoE").val(emplist.mobile);
				if(emplist.storeOrDCType == "Store"){
					$.each(emplist.roleList,function(k,v){
						if(emplist.stkChkRole != null){
							if(emplist.stkChkRole.id == v.id){
								$('#stkChkRoleE').append('<option selected value="' + v.id + '">' + v.name + '</option>');
							}else{
								$('#stkChkRoleE').append('<option value="' + v.id + '">' + v.name + '</option>');
							}
						}
						else{
								$('#stkChkRoleE').append('<option value="' + v.id + '">' + v.name + '</option>');
							}
					});
					
					$.each(emplist.roleList, function(k,v){
						if(emplist.role != null){
							if(emplist.role.id == v.id){
								$('#empRoleE').append('<option selected value="' + v.id + '">' + v.name + '</option>');
							}
							else{
								$('#empRoleE').append('<option value="' + v.id + '">' + v.name + '</option>');
							}
						}
					});
				}else{
					$.each(emplist.roleList,function(k,v){
						if(emplist.stkChkRole != null){
							if(emplist.stkChkRole.id == v.id){
								$('#stkChkRoleE').append('<option selected value="' + v.id + '">' + v.name + '</option>');
							}else{
								$('#stkChkRoleE').append('<option value="' + v.id + '">' + v.name + '</option>');
							}
						}else{
								$('#stkChkRoleE').append('<option value="' + v.id + '">' + v.name + '</option>');
						}
					});
					
					$.each(emplist.roleList, function(k,v){
						if(emplist.role != null){
							if(emplist.role.id == v.id){
								$('#empRoleE').append('<option selected value="' + v.id + '">' + v.name + '</option>');
							}
							else{
								$('#empRoleE').append('<option value="' + v.id + '">' + v.name + '</option>');
							}
						}
					});
				}
				
				
				$('#empBlockedE select:has(option[value='+emplist.isBlocked+']:selected)');
				// $("#empBlockedE select[name='activeFlag']").val('True');
				$("#StoreDcE").val(emplist.storeOrDCType);
				$("#empComIdE").val(emplist.companyDTO.compName);
				$("#empCompIdValEdit").val(emplist.companyDTO.compId);				
				$("#empCustMIdE").val(emplist.email);
				$("#empPersonalMailIdE").val(emplist.personalEmailId);
				$("#dscctPercentageE").val(emplist.discountPerc);
				$("#flatAmtDissE").val(emplist.flatAmtDisc)
				console.log(emplist.weighingScaleFlag);
				if(emplist.weighingScaleFlag == null){
					$("#wsFlagE").val("");
				}
				if(emplist.weighingScaleFlag == false){
					$("#wsFlagE").val("No");
				}
				if(emplist.weighingScaleFlag == true){
					$("#wsFlagE").val("Yes");
				}
				if(emplist.metalLocChk == false){
					$("#scFlagE").val("No");
				}else{
					$("#scFlagE").val("Yes");
				}
			});
}

$(function() {
	$("#empDateJoinE").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		//minDate : 0,
		onSelect : function(dateStr) {
			var min = $(this).datepicker('getDate'); // Get selected date
			$("#empDateLeaveE").datepicker('option', 'minDate', min || '0'); // Set other min, default to today

		}
	});
	$("#empDateLeaveE").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		minDate : 0,
	// maxDate: '+1Y+6M+1D',

	});
});
var updateEditEmp = function() {

	var editCompanyDetail = {
		"empId" : parseInt($('#empIdE').val()),
		"empName" : $('#empNameE').val(),
		"startDate" : $('#empDateJoinE').val(),
		"endDate" : $('#empDateLeaveE').val(),
		"department" : {
			"id" : parseInt($('#empDeptE').val()),
		},
		"empGrade" : $('#empGradeE').val(),
		"empPartTime" : $('#empPartTimeE').val(),
		"address" : {
			"address1" : $('#address1E').val(),
			"address2" : $('#address2E').val(),
			"address3" : $('#address3E').val(),
		},
		"region" : {
			"id" : parseInt($('#empRegionE').val()),
		},
		 "role": {
			    "id": parseInt($('#empRoleE').val()),
	     },
	     "stkChkRole": {
			    "id": parseInt($('#stkChkRoleE').val()),
	     },
	    "designation": {
		    "id":parseInt($('#empDesignationE').val()),
		  },
		 "companyDTO": {
			    "compId": parseInt($('#empCompIdValEdit').val()),
			  },
		"zoneDTO": {
				"zone_id":  parseInt($('#empZoneIdE').val()),
		 },
		"isActiveFlag" : $('#actInActE').val(),
		"adhocAmt" :$('#empAdHocAmntE').val(),
		"noOfTimes" : parseInt($('#psqGivenNoE').val()),
		"empSal" : $('#empSalaryE').val(),
		"empTrainingPer" : parseInt($('#empTrainingPeriodE').val()),
		"hrmsId" : ($('#empHRMSIdE').val()),
		"password" : $('#empPassE').val(),
		"isBlocked" : $('#empBlockedE').val(),
		"mobile" : parseInt($('#empPhnNoE').val()),
		"email" : $('#empCustMIdE').val(),
		"personalEmailId" : $('#empPersonalMailIdE').val(),
		"discountPerc" : parseFloat($('#dscctPercentageE').val()),
		"flatAmtDisc" : parseFloat($('#flatAmtDissE').val()),
		"storeOrDCType" : $('#StoreDcE').val(),
		"storeOrDCId" : parseInt($('#empStoreDcE').val()),
		"empTrainingPerAmt" : $('#empTrainingPrdAmtE').val(),
		"weighingScaleFlag"  : ($("#wsFlagE").val() == "Yes") ? true : false,
		"metalLocChk" : ($("#scFlagE").val() == "Yes") ? 1 : 0 
	}
	return editCompanyDetail;
}

$('#empDetEditE').validate(
		{
			errorElement : 'label',
			errorClass : 'help-inline',
			focusInvalid : false,
			ignore : "",
			rules : {
				"empNameE" : {
					required : true,
					regx : /^[a-zA-Z\s]+$/
				},
				"empDateJoinE" : {
					required : true,
					dateITA : true
				},
				"empDeptE" : {
					required : true
				},
				"empBlockedE" : {
					required : true,
					regx:/^(?:Yes|No)$/
				},
				"empPartTimeE" : {
					required : true
				},
				"address1E" : {
					required : true
				},
				"address2E" : {
					required : true
				},
				"empRegionE" : {
					required : true
				},
				"empRoleE" : {
					required : true
				},
				"stkChkRoleE" : {
					required : true
				},
				"scFlagE" : {
					required : true
				},
				"empDesignationE" : {
					required : true
				},
				"empHRMSIdE" : {
					required : true
				},
				"empPassE" : {
					required : true
				},
				"StoreDcE" : {
					required : true
				},
				"empStoreDcE" : {
					required : true
				},
				"empComIdE" : {
					required : true
				},
				"empPersonalMailIdE" : {
					required : true
				},
				"empTrainingPeriodE" : {
					number : true,
					maxlength:2
				},
				"empPhnNoE" : {
					  number : true,
					   maxlength:10,
					   minlength:10
				},
				"empCustMIdE" : {
					  email : true					  
				},
				"empHRMSIdE" : {
					required : true,
					regx : /^[0-9a-zA-Z',-]+$/
				},
				"wsFlagE" : {
					required : true,
				},
				
			},
			messages : {
				"empNameE" : {
					regx : "Only character with space!"
				},
				"empHRMSIdE" : {
					regx : "Please enter the alpha numeric value!"
				},
				"empBlockedE":{regx:"Only Use Yes/No"},
				"empPhnNoE":
					{
					maxlength:"Enter 10 digit no.",
					minlength:"Enter 10 digit no."
					}
				
			},
			errorPlacement : function(error, element) {
				if (element.context.name == "empDateJoinE") {
					error.insertAfter(element.parent());
				} else {
					error.insertAfter(element);
				}
			},
			submitHandler : function(form) {
				trimmer();
			 var storeOrDc = 	$("#StoreDcE").val();
			 var empZoneIdE = $("#empZoneIdE").val();
				if ( storeOrDc === "DC" && empZoneIdE == "") {
					$.growl.error({
						message :"Emp zone id is mandatory." ,
						duration : 10000,
						title : 'Error'
					});
				return false;
				}
				
				var employeeDetailEdit = updateEditEmp();
				if (employeeDetailEdit) {

					postJSON('/OrderExecution/api/v1/updateEmployee', JSON
							.stringify(employeeDetailEdit), function(data) {
						if (data.resCode == "1") {
							$.growl.notice({
								message : data.mesgStr,
								duration : 10000,
								title : 'Success'
							});
							$('#editEmpDetE').modal('hide');
							$('#createEmployeeDet').on('hidden.bs.modal',
									function() {
										$(this).find('form').trigger('reset');
									});
							employeeSearchGrid();
						} else {
							$.growl.error({
								message : data.mesgStr,
								duration : 10000
							});
						}
						

					});
				}
			}
		});


$('#updateTPeriod').on('click',function() {
	postJSON('/OrderExecution/api/v1/updateEmpTrainingPeriod ', JSON
			.stringify({"trainingFlag":"true"}), function(data) {
		if (data.resCode == "1") {
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
		}
	
	});
});
//Export Record as per search criteria updateTPeriod
$("#export").on(
		"click",
		function() {

			var data;
			var newData = [];
			var deptS = $("#deptS").val();
			var roleS = $("#roleS").val();
			var DesignationS = $("#DesignationS").val();
			var nameS = $("#nameS").val();
			var StoreDcCS = $("#StoreDcCS").val();
			var empStoreDcS = $("#empStoreDcS").val();
			var activeinactiveS = $("#activeInactiveS").val();

			fieldFilters = {
				"fieldFilters" : {}
			};

			if (deptS != "" && deptS != null) {
				fieldFilters.fieldFilters["deptId"] = deptS;
			}
			if (roleS != "" && roleS != null) {
				fieldFilters.fieldFilters["roleId"] = roleS;
			}
			if (DesignationS != "" && DesignationS != null) {
				fieldFilters.fieldFilters["desigId"] = DesignationS;
			}
			if (nameS != "" && nameS != null) {
				fieldFilters.fieldFilters["empName"] = nameS;
			}
			if (StoreDcCS != "" && StoreDcCS != null) {
				fieldFilters.fieldFilters["storeId"] = StoreDcCS;
			}
			if (empStoreDcS != "" && empStoreDcS != null) {
				fieldFilters.fieldFilters["dcId"] = empStoreDcS;
			}
			if (activeinactiveS != "" && activeinactiveS != null) {
				fieldFilters.fieldFilters["isActive"] = activeinactiveS;
			}
			//console.log(fieldFilters);
			var sysdate = moment().format('DDMMYYYYHHmmSS');
			var rows = $('#jqxgrid').jqxGrid('getrows');
			console.log(rows);
			if (  rows == undefined || rows == 0 ) {
				$.growl
				.error({
					message : "No Data To Export",
					duration : 10000
				});
				return false;
			}else{
				var rows = $("#jqxgrid").jqxGrid('getdatainformation');
				if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/exportEmployee', JSON
					.stringify(fieldFilters), function(response) {
		if(response!=null){
				data = response.payload.list;				
				for (i = 0; i < data.length; i++) {
					newData.push({
						'Emp Id' : (data[i].empId != null) ? data[i].empId : "",
						'Date of Joining' : (data[i].startDate != null) ? data[i].startDate : "",
						'Date of Leaving' : (data[i].endDate != null) ? data[i].endDate : "",
						'Emp Designation ' : (data[i].designation.description !=null) ? data[i].designation.description : "" ,
						'Emp Role' : (data[i].role.name !=null) ? data[i].role.name : "",
						'Department' : (data[i].department.description !=null) ? data[i].department.description : "" ,
						'Active/InActive' : (data[i].isActiveFlag != null) ? data[i].isActiveFlag : " ",
						'Emp Blocked Y/N' : (data[i].isBlocked !=null) ? data[i].isBlocked : "",
     					'Emp Name' :(data[i].empName !=null) ? data[i].empName : " ",
						'Emp Grade' : (data[i].empGrade != null) ? data[i].empGrade : "",
						'Emp Adhoc Amount' : (data[i].adhocAmt != null) ? data[i].adhocAmt : "",
						'No. of Times PSQ Not Given' : (data[i].noOfTimes != null) ? data[i].noOfTimes : "",
						'Emp Salary' : (data[i].empSal != null) ? data[i].empSal : "",
						'Emp Training Period' : (data[i].empTrainingPer != null) ? data[i].empTrainingPer : "",
						'Emp Training Period Amt' : (data[i].empTrainingPerAmt != null) ? data[i].empTrainingPerAmt : "",
						'Emp HrmsId' : (data[i].hrmsId != null) ? data[i].hrmsId : "",
						'Emp CreatedOn' : (data[i].createdOn != null) ? data[i].createdOn : "",
						'Emp Password' : (data[i].password != null) ? data[i].password : "",
						'Emp Zoneid' : (data[i].zoneDTO != null) ? data[i].zoneDTO.code : "",
						'Emp Part Time' : (data[i].empPartTime != null) ? data[i].empPartTime : "",
						'Emp Address1' :  (data[i].address != null) ? data[i].address.address1 : "",
						'Emp Address2' : (data[i].address != null) ? data[i].address.address2 : "",
						'Emp Address3':  (data[i].address != null) ? data[i].address.address3 : "",
						'Emp Updated On': (data[i].UpdatedOn != null) ? data[i].UpdatedOn : "",
						'Emp Mobile No.':  (data[i].mobile != null) ? data[i].mobile : "",
						'Store/DC ID': (data[i].storeOrDc != null) ? data[i].storeOrDc.name : "",
						'Emp Company Mail ID' : (data[i].email != null) ? data[i].email: "",		
						'Emp PersonalEmailId' : (data[i].personalEmailId != null) ? data[i].personalEmailId : "",
						'Discount % ' : (data[i].discountPerc != null) ? data[i].discountPerc : "",
						'Flat Amt Discount ' : (data[i].flatAmtDisc != null) ? data[i].flatAmtDisc : "",
						'store Or DC Type' : (data[i].storeOrDCType != null) ? data[i].storeOrDCType : "" 
						
					})
				}
				//JSONToCSVConvertor(newData, "EmployeeMasterDetails" + "_"+ sysdate, true);
				var opts = [{sheetid:'Employee_Master_Details',header:true}];
		         var res = alasql('SELECT * INTO XLSX("Employee Master Details_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
		      }
			});
			}else{
				$.growl
				.error({
					message : "No Data To Export",
					duration : 10000
				});
				return false;
			 }
			}
		});

//Search Designation
$("#searchD").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	designationDetailsGrid();
	$("#jqxgrid").show();
});

// search Employee Master
$("#searchEmployeS").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	employeeSearchGrid();
	$("#jqxgrid").show();
});
//Clear Designation form Field
$("#clearAllD").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});
//Clear Role form Field
$("#clearAllRole").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});
//Clear Employee master form Field
$("#clearAllEmployee").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

$('.modal').on('hidden.bs.modal', function(){
	$('form').trigger('reset');
	var validator = $( "#empDetCreateC" ).validate();
	validator.resetForm();
    $("#editAssignRoles").empty().append('');
});
/*function discountPerctageDecThree(val)
{

var regex = /^([0-9]{0,2}(\.\d{0,8})|100)$/;
if (val && !isNaN(val) && regex.test(val)) {
	return parseFloat(val).toFixed(2);
	
	
}

return '';
}*/

function discountPerctageDec(val)
{
var regex = /^\d{0,8}(\.\d{0,8})?$/;
if (val && !isNaN(val) && regex.test(val)) {
	return parseFloat(val).toFixed(2);
	
}
return '';

}
/*function discountPerctageDecThree(val)
{
var regex = /^([0-9]{0,2}|100)$/;
if (val && !isNaN(val) && regex.test(val)) {
	return parseFloat(val).toFixed(2);
	
}
return '';

}
*/

$("#empStoreDc").on('change',function(){
	var storeDc = $("#StoreDcC").val();
	var storeDcName = $("#empStoreDc").val();
	getJSON('/OrderExecution/api/v1/getZonesByStoreDcTypeAndId?storeOrDcType='+ storeDc + '&storeOrDcId='+storeDcName, function(data) {
		$('#empZoneId').empty().append('<option value="" selected>-- Select Option --</option>');
		$.each (data.payload.zones ,function(key, val) {
			$('#empZoneId').append('<option value="'+ val.id + '">' + val.description + '</option>');
				});
		});
});

$("#empStoreDcE").on('change',function(){
	var storeDc = $("#StoreDcE").val();
	var storeDcName = $("#empStoreDcE").val();
	getJSON('/OrderExecution/api/v1/getZonesByStoreDcTypeAndId?storeOrDcType='+ storeDc + '&storeOrDcId='+storeDcName, function(data) {
		$('#empZoneIdE').empty().append('<option value="" selected>-- Select Option --</option>');
		$.each (data.payload.zones ,function(key, val) {
			$('#empZoneIdE').append('<option value="'+ val.id + '">' + val.description + '</option>');
				});
		});
});

$("#saveC").on("click", function() {
	var dscctPercentage = $("#dscctPercentage").val();
	
	if (dscctPercentage > 100 ) {
		$.growl.error({
			message :"Discount Percentage Should be less than or Equal to 100 ",
			duration : 10000,
		});
			return false;
	}
	});

$("#saveE").on("click", function() {
	var dscctPercentageE = $("#dscctPercentageE").val();
	
	if (dscctPercentageE > 100 ) {
		$.growl.error({
			message :"Discount Percentage Should be less than or Equal to 100 ",
			duration : 10000,
		});
			return false;
	}
	});
