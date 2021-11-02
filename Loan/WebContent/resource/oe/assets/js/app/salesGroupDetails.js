var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	$(".layout-main button").each(function() {
		var value = '#'+this.id;
		var value2 = '#'+this.id+'C';
		var value3 = '#'+this.id+'S';
		var val = $(value).text();
		val = val.trim();
		if( val == "search" || val == "Search"){
			if(permission.canSearch == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}  
		
		if(val=="Create" || val=="create"){
			if(permission.canAdd == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if( val == "export" || val == "Export"){
			if(permission.canExport == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val == "print" || val == "Print"){
			if(permission.canPrint == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val == "delete" || val == "Delete"){
			if(permission.canDelete == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
	});
}

//loadPermission();

var onloadSGLov = function() {
	var statusObj = [{
		"id" : true,
		"name" : "Active"
	},{
		"id" : false,
		"name" : "In-Active"
	}];
	
	$('#storeNameS').empty().append('<option value="" selected>--Select--</option>');
	$('#storeNameC').empty().append('<option value="" selected>--Select--</option>');
	$('#storeTypeS').empty().append('<option value="" selected>--Select--</option>');
	$('#statusS').empty().append('<option value="" selected>--Select--</option>');
	$('#monthS').empty().append('<option value="" selected>--Select--</option>');
	$('#yearS').empty().append('<option value="" selected>--Select--</option>');
	//$('#zoneNameS').empty().append('<option value="" selected>--Select--</option>');
	
	$.each(statusObj,function(key, val) {
		$('#statusS').append('<option value="' + val.id + '">' + val.name + '</option>');
	
	});
	
	var min = new Date().getFullYear();
    var max = min - 9;

	for (var i = min; i>=max; i--){
			$('#yearS').append('<option value="' + i + '">' + i + '</option>');
		
	}
	$.getJSON('/OrderExecution/api/v1/spGroupOnloadLOV', function(data) {		
		$.each(data.payload.allStores,function(key, val) {
					$('#storeNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
					$('#storeNameC').append('<option value="' + val.id + '">' + val.name + '</option>');
				
				});
		$.each(data.payload.storeType, function(key, val) {
			$('#storeTypeS').append('<option value="' + val.id + '">' + val.id + '</option>');
		});	
	
		$.each(data.payload.storeType, function(key, val) {
			$('#storeTypeS').append('<option value="' + val.id + '">' + val.id + '</option>');
			
			$('#storetypeC').append('<option value="' + val.id + '">' + val.id + '</option>');
		});
		
		$.each(data.payload.allMonths, function(key, val) {
			$('#monthS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});	
	
		/*$.each(data.payload.allZones,function(key, val) {
			$('#zoneNameS').append('<option value="' + val.id + '">' + val.description + '</option>');
	  });*/
   });
}

onloadSGLov();

$("#storeNameS").on('change',function(){
	var storeId = $("#storeNameS").val(); 
	$.getJSON('/OrderExecution/api/v1/zonesForAStore?storeId='+storeId , function(data) {	
		var resp = data.payload.zonelist;
		$('#zoneNameS').empty().append('<option value="" selected>--Select--</option>');
		$.each(resp,function(key, val) {
			$('#zoneNameS').append('<option value="' + val.id + '">' + val.description + '</option>');
	  });
	});
});

var allZones = [];
var seNameVal = [];
// On chage of store loading other LOV
$('#storeNameC').on('change',function() {
		var storeId = $('#storeNameC').val();
		if(storeId == "" || storeId == null){
			$("#storetypeC").val('');
			}
			$('#zoneNameC').empty().append('<option value="" selected>--Select--</option>');
			$('#supervisorName').empty().append('<option value="" selected>--Select--</option>');			
			$.getJSON('/OrderExecution/api/v1/spGroupDetailsByStore?storeId='+ storeId, function(data) {
			$.each(data.payload.details.sZones, function(key, val) {
					$('#zoneNameC').append('<option value="' + val.id + '">' + val.description + '</option>');					
				allZones.push({
					"id" : val.id,
					"code" :val.code,
					"description" : val.description			
				});
			});
				
				$.each(data.payload.details.supList, function(key, val) {
					$('#supervisorName').append('<option value="' + val.hrmsId + '">' + val.name +'</option>');
				});
				
				$.each(data.payload.details.seList, function(key, val) {
					seNameVal.push({
					  "id" : val.id,
					  "name" : val.name 
					});
				});
				
			});
		});
$("#monthSectionA").hide();
$("#monthSectionB").hide();
$('#zoneNameC').on('change', function(){
	var zoneNameC = $('#zoneNameC').val();
	if(zoneNameC == "" || zoneNameC == null){
		$('#monthCA').val('');
		$('#monthCAValue').val('');
		$('#yearC').val('');
		$('#startDateC').val('');
		$('#endDateC').val('');
		return false;
	}else{
		var fetchDateObj = {"fieldFilters" : {"zoneId" : $("#zoneNameC").val()}};
		
		$('#monthC').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/fetchLatestDateByZoneId', JSON.stringify(fetchDateObj), function(data) {
			if (data.resCode == "1") {		
				/*$("#startDateC").val(data.payload.dateValues.startDate);
				$("#endDateC").val(data.payload.dateValues.endDate);
				*/$('#zonetypeNamec').val(data.payload.dateValues.zoneTypeName);
				
				$("#dropDownflagC").val(data.payload.dateValues.dropDownFlag);
				if(data.payload.dateValues.dropDownFlag == false){
					$("#monthSectionB").show();
					$("#monthSectionA").hide();
					$("#monthCA").val(data.payload.dateValues.month);
					$("#monthCAValue").val(data.payload.dateValues.monthNo);
					
					var month = $('#monthCAValue').val();
					var year = $("#yearC").val();
					
					var endDate= new Date(); endDate.setFullYear(year, month, 0);
					var startDate = new Date(); startDate.setFullYear(year, month - 1, 1);
			
					startDate = startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + data.payload.dateValues.year;				
					endDate = endDate.getDate() + "/" + (endDate.getMonth() + 1) + "/" + data.payload.dateValues.year;				
					
					$("#startDateC").val(startDate);
					$("#endDateC").val(endDate);
					
				}else{
					$("#monthSectionB").hide();
					$("#monthSectionA").show();
					$.each(data.payload.dateValues.monthlist, function(key, val) {
						$('#monthC').append('<option value="' + val.id + '">' + val.name +'</option>');
					});
				}
				
				$("#yearC").val(data.payload.dateValues.year);
			}else if(data.resCode == "-1"){
				$.growl.error({
					message : data.mesgStr,
					duration :1000,
					title: 'Error'
				});
				return false;
			}
		});
	}
});

$("#monthC").on('change', function(){
	var month = $('#monthC').val();
	var year = $("#yearC").val();
	
	var  endDate= new Date(); endDate.setFullYear(year, month, 0);
	var startDate = new Date(); startDate.setFullYear(year, month - 1, 1);
	
	startDate = startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear();				
	endDate = endDate.getDate() + "/" + (endDate.getMonth() + 1) + "/" + endDate.getFullYear();	
	
	$("#startDateC").val(startDate);
	$("#endDateC").val(endDate);
	
});

$("#monthYear").datepicker({
	dateFormat : "dd/mm/yy"
});

$(function() {
	$("#startDateC").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		minDate : 0,
	//	maxDate : 0,
		onSelect : function(dateStr) {
			var min = $(this).datepicker('getDate'); // Get selected date
			$("#endDateC").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
		}
	});
	$("#endDateC").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		minDate : 0,
	    //maxDate: '+1Y+1M+1D'
	});
});
// for searching
var salesGroupFieldFilters = function() {
	var storeName = $("#compCodeS").val();
	var zoneName = $("#compNameS").val();
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (storeName != "" && storeName != null) {
		fieldFilters.fieldFilters["companyCode"] = storeName;
	}
	if (zoneName != "" && zoneName != null) {
		fieldFilters.fieldFilters["companyName"] = zoneName;
	}

	return fieldFilters;
}


//In grid view last column belong to action


var deleteSG = function(row, column, value) {
	
	var newValue;
	var isActiveE = $("#isActiveE").val();
	var flag = $("#jqxgridE").jqxGrid('getcellvalue', row, 'flag');
	
	if(flag == false){
		newValue = row;
	}else{
		newValue = value;
	}
	
	if(isActiveE == "true"){
		return '<button class="btn btn-sm btn-danger" data-toggle="modal" type="button" id='
		+ row
		+ ' onclick="deleteSGLines('+ newValue	+ ', '+flag+')"/><i class="fa fa-trash fa-1"></i> </button>';
	}else{
		return '<button class="btn btn-sm btn-danger" disabled data-toggle="modal" type="button" id=' + row + '/><i class="fa fa-trash fa-1"></i> </button>';
	}
	
	
}

var deleteSGLines = function(sgId, flag){
	var saleGrID = $('#saleGrID').val();
		if(flag == false){
			 var id = $("#jqxgridE").jqxGrid('getrowid', sgId);
             var commit = $("#jqxgridE").jqxGrid('deleterow', id);
             rowId = rowId -1;
		}else{
			
		
		var deleteLinesObj = {
				"spDetailId" : sgId
		}
		
		
		postJSON('/OrderExecution/api/v1/deleteSPGroupBySE', JSON.stringify(deleteLinesObj), function(data) {
			if (data.resCode == "1") {							
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});			
				editSalesGroupEdit(saleGrID);
				//$('#myModalDelLines').modal('hide');
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
			}
		});
	/*});
	*/
		rowId = rowId -1;
		}
}

var validateSalesGrpfields = function() {
	var storeName = $("#storeNameC").val();
	var storeType = $("#storetypeC").val();
	var zoneName = $("#zoneNameC").val();
	var zonetypeName = $("#zonetypeNamec").val();
	var startName = $("#startDateC").val();
	var endName = $("#endDateC").val();
	if(dropDownflagC == "false"){ var monthCAValue = $('#monthCAValue').val() } else{ var monthCAValue = $('#monthC').val() }
	var validation = true;

	if (storeName == "" || storeType == "" || zoneName == ""
			|| zonetypeName == "" || startName == "" || endName == "" || monthCAValue) {
		validation = false;
	}
	return validation;
}
var saveSalesGroupDetails = function() {
	
//	salesGroupDetailsValidate();
	
	var salesLines = [];
	var selectArr = [];
	
	var rows = $('#jqxgridp').jqxGrid('getrows');
	if(rows.length == 0){
		$.growl.error({
			//message : "Grid field are mandatory!!",
			duration : 10000
		});
		return false;
	}
	
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		if(typeof row.seName === "undefined"){
			$.growl.error({
				message : "SE Name is mandatory!!",
				duration : 10000
			});
			return false;			
		}
		if(typeof row.targetYNN === "undefined"){
			$.growl.error({
				message : "Target Y/N Name is mandatory!!",
				duration : 10000
			});
			return false;			
			
		}
		if(typeof row.roleId === "undefined" || row.roleId === "" || row.roleId === null){
			$.growl.error({
				message : "Role Name is mandatory!!",
				duration : 10000
			});
			return false;			
			
		}
		
		salesLines.push({
			"empId" : row.seName,
			"targetYorN" : row.targetYN,
			"roleId":row.roleId.toString()
		});
		
	}
	var dropDownflagC = $("#dropDownflagC").val();
	var salesDetails = {
		  "storeId": $("#storeNameC").val(),
		  "supId": $('#supervisorName').val(),
		  "zoneId": $('#zoneNameC').val(),
		  "startDate": $('#startDateC').val(),
		  "endDate": $('#endDateC').val(),
		  "month": (dropDownflagC == "false") ? $('#monthCAValue').val() : $('#monthC').val() ,
		  "year" : $('#yearC').val(),
		  "SpgroupDetGrid":salesLines
		}

	return salesDetails;
}
// Create and save Sales details
$("#salesGrpSave").on('click',function() {
	trimmer();
	var salesGroupDetails = saveSalesGroupDetails();
		if (salesGroupDetails) {
		postJSON('/OrderExecution/api/v1/createSPGroup', JSON.stringify(salesGroupDetails), function(data) {
		  if (data.resCode == "1") {							
			$.growl.notice({
			  message : data.mesgStr,
			  duration : 10000,
			  title : 'Success'
		  });
		$('#createSalesDetails').modal('hide');
		   salesGroupDetailsGrid();						
		}
		  else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
		  }
	   });		
	 }	
});


var rowId = 0;
// Add new row in grid to create Sales Group Details
var generaterow = function(i) {
	var row = {};

	row["SLNo"] = i;
	// row["storeNameC"] = $('#storeNameC').val();
	row["zoneName"] = $("#zoneNameC option:selected").text();
	row["startDate"] = $("#startDateC").val();
	row["endDate"] = $('#endDateC').val();
	row["targetYN"] = "";
	rowId = rowId + 1;
	return row;
}
// Create sales group
$('#create').on('click', function() {
	$('#createSalesDetails').on('hidden.bs.modal', function(){
		$("form").trigger("reset");
	  });
	SalesDetailsModalGrid();
	$('#jqxgridp').show();
});

$('#salesGrpSaveE').on('click', function(){
	trimmer();
	if(salesGroupDetailsEdit()){		
	var saleGrID = $('#saleGrID').val();
	var startDateE = $('#startDateE').val();
	var endDateE = $('#endDateE').val();
	var yearE = $('#yearE').val();
	var monthCAE = $('#monthCAValueE').val();
	var storeId = $('#storeId').val();
	var supId = $('#supIdE').val();
	var zoneId = $('#zoneIdE').val();
	if(saleGrID == "" || startDateE == "" || endDateE == ""){
		$.growl.error({
			//message : "Start Date and End Date are mandatory!!",
			duration : 3000,
			title : 'Error'
		});
		return false;
	}
	}
	var spDetailDTO = [];
	var rows = $("#jqxgridE").jqxGrid('getrows');
	for(var i=0; i<rows.length; i++){
		console.log(rows);
		console.log(rows[i].editTargetYorNo);
		if(typeof rows[i].saleExecutiveId === "undefined"){
			$.growl.error({
				message : "Please Select SE Name !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		if(rows[i].statusFlag == true){
			var obj = {
				      "empId": parseInt(rows[i].saleExecutiveId),
				      "targetYorN": (rows[i].editTargetYorNo == "Yes") ? 1 : 0,
				      "roleId":rows[i].roleId.toString()
				    }
			spDetailDTO.push(obj);

		}
	}

	var saleGrObj = {			
			 "storeId": storeId,
			  "spHeaderId":parseInt(saleGrID),
			  "supId": supId,
			  "zoneId": zoneId,
			  "startDate": startDateE,
			  "endDate": endDateE,
			  "month": parseInt(monthCAE),
			  "year": parseInt(yearE),
			  "spDetailDTO": spDetailDTO
			}
   console.log(saleGrObj);
	postJSON('/OrderExecution/api/v1/updateSPGroup',JSON.stringify(saleGrObj), function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			$('#createCompDet').on('hidden.bs.modal',function() {
				$(this).find('form').trigger('reset');
			});
				$('#editSalesDetails').modal('hide');
				salesGroupDetailsGrid();
			} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
				}
			});
	
});

// Add row in grid lines
var seList;
$("#addSalesDetailsRow").on("click", function() {
	if(salesGroupDetailsValidate()){
	var storeNameC = $('#storeNameC').val();
	var zoneNameC = $('#zoneNameC').val();
	var startDateC = $('#startDateC').val();
	var endDateC = $('#endDateC').val();
	var supervisorName = $('#supervisorName').val();
	var ddFlag = $("#dropDownflagC").val();
	console.log(ddFlag);
	console.log(typeof(ddFlag));
	if(ddFlag == "true"){
		if($("#monthC").val() == "" || $("#monthC").val() == null){
			$.growl.error({
				message : "Please Select Month !!",
				duration : 1000,
				title : 'Error'
			})
			return false;
		}
	}
	$("#jqxgridp").jqxGrid('addrow', null, generaterow(rowId + 1));
/*		
		var rows = $("#jqxgridp").jqxGrid('getrows');
		alert(seNameVal.length);
		console.log(rows);
		console.log(seNameVal);
		if(typeof rows != "undefined"){
			for(var i=0; i<rows.length; i++){
				for(var j=0; j<seNameVal.length; j++){
					if(seNameVal[j].id == rows[i].seName){
						seNameVal.splice(i, 1);

					}
				}
			}
		}*/
	}
});

//In grid view last column belong to action
var SalesDetailsModalGrid = function() {

	var updateRows = function(rowid, newdata, commit) {
	}
	
	var targetYNVal = [{
			"id" : "0",
			"name" : "No"
	},{
		"id" : "1",
		"name" : "Yes"
	}];
	var targetYNSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : targetYNVal
		};
	var targetYNAdapter = new $.jqx.dataAdapter(targetYNSource, {
		autoBind : true
	});
	
	var seNameSorce = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : seNameVal
		};
		
	var seNameAdapter = new $.jqx.dataAdapter(seNameSorce, {
		autoBind : true
	});
	
	var datafields = [ {
		'name' : 'seName',
		'type' : 'string'
	}, {
		'name' : 'zoneName',
		'type' : 'string'
	}, {
		'name' : 'startDate',
		'type' : 'date'
	}, {
		'name' : 'endDate',
		'type' : 'date'
	}, {
		'name' : 'targetYN',
		'type' : 'date'
	}, {
		'name' : 'endName',
		'type' : 'date'
	}, {
		'name' : 'superviorName',
		'type' : 'string'
	}, {
		'name' : 'roleName',
		'type' : 'string'
	},{
		'name' : 'roleId',
		'type' : 'string'
	},{
		name : 'targetYNN',
		value : 'targetYN',
		values : {
			source : targetYNAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		name : 'seNameN',
		value : 'seName',
		values : {
			source : seNameAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		'name' : 'id',
		'type' : 'long'
	}];

	var columns = [ {
		'text' : 'SE Name',
		'datafield' : 'seName',
		columntype : 'dropdownlist',
		displayfield : 'seNameN',
		'width' : '15%',
		cellsalign : 'center',
		align:'center',
		editable : true,
		createeditor : function(row, value, editor) {
			editor.on('click', function(event){	
			var spGroupDet = {
					"month" : ($("#dropDownflagC").val()=="true")? $("#monthC").val() : $("#monthCAValue").val(),
					"year" : $("#yearC").val(),
					"storeId" :  parseInt($("#storeNameC").val())
			}
			postJSON('/OrderExecution/api/v1/fetchSEListByMonthAndYear',JSON.stringify(spGroupDet),function(data) {
			 	var seList = data.payload.SalesExecutives.seList;
			 	console.log(seList.length);
			 	editor.jqxDropDownList({ source: seList , displayMember: 'name', valueMember: 'hrmsId'});
			});
			
		});
	},
		cellvaluechanging : function(row, datafields, columntype,oldvalue, newvalue) {
			if (newvalue.value != oldvalue) {
				$("#jqxgridp").jqxGrid('setcellvalue', row, "seNameN","--Select--");
				$("#jqxgridp").jqxGrid('setcellvalue', row, "seName",null);
			};
			
			var rows = $("#jqxgridp").jqxGrid('getrows');
			if(typeof rows != "undefined"){
				for(var i=0; i<rows.length; i++){
					if(rows[i].seName == newvalue.value){
						$.growl.error({
							message : "Duplicate Record Not Allowed.",
							duration : 10000,
							title : 'Success'
						});		
						return false;
					}
				}
			}
			
			$.getJSON('/OrderExecution/api/v1/fetchRoleByHrmsId?hrmsId='+ newvalue.value, function(data) {
				console.log(data);
				$("#jqxgridp").jqxGrid('setcellvalue', row, "roleId",data.payload.Role.id);
				$("#jqxgridp").jqxGrid('setcellvalue', row, "roleName",data.payload.Role.name);
			});	

			
		}
	}, {
		'text' : 'Zone Name',
		'datafield' : 'zoneName',
		'width' : '15%',
		sortable : false,
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : 'Start Date ',
		'datafield' : 'startDate',
		'width' : '15%',
		cellsformat: 'dd/MM/yyyy',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'End Date',
		'datafield' : 'endDate',
		cellsformat: 'dd/MM/yyyy',
		'width' : '15%',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Role Name',
		'datafield' : 'roleName',		
		'width' : '15%',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Role ID',
		'datafield' : 'roleId',		
		hidden: true
	},{
		'text' : 'Target',
		'datafield' : 'targetYN',
		columntype : 'combobox',
		displayfield : 'targetYNN',
		cellsalign : 'center',
		align:'center',
		'width' : '15%',
		editable : true,
		createeditor : function(row, value, editor) {
			editor.jqxComboBox({
				source : targetYNAdapter,
				displayMember : 'name',
				valueMember : 'id'
			});
		},
		cellvaluechanging : function(row, datafields, columntype,oldvalue, newvalue) {
			if (newvalue.value != oldvalue) {
				$("#jqxgridp").jqxGrid('setcellvalue', row, "targetYNN","--Select--");
				$("#jqxgridp").jqxGrid('setcellvalue', row, "targetYN",null);
			};
		}
	},
	{
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
			id = $("#jqxgridp").jqxGrid('getrowid', row);
			$("#jqxgridp").jqxGrid('deleterow', id);		
		}
	},
	{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	} ];

	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, data, addrow, "#jqxgridp");

}


var editSalesGroup =  function(row, column, value) {
	var isActive = $("#jqxgrid").jqxGrid('getcellvalue', row, 'isActive');
	
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	
	if(isActive == false){
		val += '<button class="btn btn-sm btn-primary"  disabled type="button"><i class="fa fa-pencil fa-sm"></i> </button><button class="btn btn-sm btn-danger"  type="button"  disabled ><i class="fa fa-trash fa-1"></i> </button>';		
	}else{
		if(permission.canEdit == false){
			val += '<button class="btn btn-sm btn-primary" disabled type="button" ><i class="fa fa-pencil fa-sm"></i> </button>';
		}else{
			val += '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editSalesDetails" type="button" id='+ row + ' onclick="editSalesGroupEdit('+ value+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';		
		}
		if(permission.canDelete == false){
			val += '<button class="btn btn-sm btn-danger"  type="button"  disabled><i class="fa fa-trash fa-1"></i> </button>';		
		}else{
			val += '<button class="btn btn-sm btn-danger"  type="button" id='+ row	+ ' onclick="deleteSgDetails('+ value+ ')" ><i class="fa fa-trash fa-1"></i> </button>';		
		}
	}
	return val;
}

var deleteSgDetails = function(sgId){
	$('#myModalDel').data('spHeaderId', sgId).modal('show');
	$('#btnDelteYes').click(function () {
		var deleteObj = {
				"spHeaderId" : sgId
		}
		
		
		postJSON('/OrderExecution/api/v1/deleteSPGroup',JSON.stringify(deleteObj), function(data) {
			if (data.resCode == "1") {							
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				salesGroupDetailsGrid();
				$('#myModalDel').modal('hide');	
				
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
			}
		});
	});
	   
}

var rowId = 0;
var generaterowT = function() {
	var row = {};
	row["flag"] = false,
	row["seNameEdit"] = "",
	row["zoneName"] =$("#zoneNameE").val(),
	row["startDate"] = $("#startDateE").val(),
	row["endDate"] = $('#endDateE').val(),
	row["editTargetYorNo"] = "",
	row["statusFlag"] = true
	rowId = rowId+1;
	return row;
}

$("#addRowE").on('click',function(){
	var datarow = generaterowT();
	$("#jqxgridE").jqxGrid('addrow', null, datarow); 
});

var editSalesDetailsModalGrid = function(data) {
	var updateRows = function(rowid, newdata, commit) {
	}
	
	var targetYNValE = [{"id" : "0","name" : "No"},{"id" : "1","name" : "Yes"}];
	var targetYNSourceE = {datatype : 'json',datafields : [{name : 'id',type : 'int'}, {name : 'name',type : 'string'}],localdata : targetYNValE};
	var targetYNAdapterE = new $.jqx.dataAdapter(targetYNSourceE, {autoBind : true});
	
	var seNameSorceE = {datatype : 'json',datafields : [{name : 'id',type : 'int'}, {name : 'name',type : 'string'}],localdata : seNameValE};
	var seNameAdapterE = new $.jqx.dataAdapter(seNameSorceE, {autoBind : true});
	
	var datafields = [ 
		{'name' : 'zoneName','type' : 'string'}, 
		{'name' : 'flag','type' : 'boolean'}, 
		{'name' : 'startDate','type' : 'string'}, 
		{'name' : 'endDate','type' : 'string'},
		{'name' : 'superviorName','type' : 'string'}, 
		{'name' : 'targetYNN','type' : 'int'},  
		{'name' : 'saleExecutiveId','type' : 'int'}, 
		{'name' : 'editTargetYorNo','value' : 'targetYNN',values : {source : targetYNAdapterE.records,value : 'id',name : 'name'}}, 
		{'name' : 'seNameEdit','value' : 'saleExecutiveId',values : {source : seNameAdapterE.records,value : 'id',name : 'name'}, 'map': 'seName'}, 
		{'name' : 'id','type' : 'long'}, 
		{'name' : 'roleName','type' : 'string','map':'role>name'}, 
		{'name' : 'roleId','type' : 'string','map':'role>id'}, 
		{'name' : 'statusFlag','type' : 'bool'}, 
		{'name' : 'actionId','type' : 'long','map' : 'spDetailId'}
	];
	
	var columns = [ 
		
		{'text' : 'Zone Name','datafield' : 'zoneName','width' : '19%',cellsalign : 'center',align:'center',sortable : false,editable : false}, 
		{'text' : 'Start Date ','datafield' : 'startDate','width' : '19%',cellsformat: 'dd/MM/yyyy',cellsalign : 'center',align:'center',sortable : false,editable : false}, 
		{'text' : 'End Date','datafield' : 'endDate','width' : '19%',cellsformat: 'dd/MM/yyyy',cellsalign : 'center',align:'center',sortable : false,editable : false}, 
		{'text' : 'SE Name','datafield' : 'saleExecutiveId','width' : '19%',displayfield : 'seNameEdit',cellsalign : 'center',columntype : 'dropdownlist',align:'center',sortable : false,editable : true,
			cellbeginedit : function(row){
				var statusFlag = $("#jqxgridE").jqxGrid('getcellvalue', row, "statusFlag");
				if(statusFlag == true){
					return true;
				}else{
					return false;
				}
			},
			createeditor : function(row, value, editor) {
				editor.on('click', function(event){	
				/*getSeList($("#storeId").val());*/
					$.getJSON('/OrderExecution/api/v1/spGroupDetailsByStore?storeId='+ $("#storeId").val(), function(data) {
						var seNameArrE = [];
						$.each(data.payload.details.seList, function(key, val) {
							seNameArrE.push({
							  "id" : val.id,
							  "name" : val.name 
							});
						});
						editor.jqxDropDownList({ source: seNameArrE , displayMember: 'name', valueMember: 'id'});
					});
				});
			},
			validation : function(cell, value) {
				var rows = $("#jqxgridE").jqxGrid('getrows');
				if(typeof rows != "undefined"){
					for(var i = 0; i<rows.length-1; i++){
						console.log(rows[i].saleExecutiveId);
						console.log(value);
						if(rows[i].saleExecutiveId == value.value){
							return {
								result : false,
								message : "Duplicate SE Name not allowed"
							};
						}
					}
				}
				return true;
			},
			cellvaluechanging : function(row, datafields, columntype,oldvalue, newvalue) {
				if (newvalue.value != oldvalue) {
					$("#jqxgridE").jqxGrid('setcellvalue', row, "seNameEdit","--Select--");
					$("#jqxgridE").jqxGrid('setcellvalue', row, "saleExecutiveId",null);
				};
				
				var rows = $("#jqxgridE").jqxGrid('getrows');
				if(typeof rows != "undefined"){
					for(var i=0; i<rows.length; i++){
						if(rows[i].saleExecutiveId == newvalue.value){
							$.growl.error({
								message : "Duplicate Record Not Allowed.",
								duration : 10000,
								title : 'Success'
							});		
							return false;
						}
					}
				}
				
				$.getJSON('/OrderExecution/api/v1/fetchRoleByHrmsId?hrmsId='+ newvalue.value, function(data) {
					console.log(data);
					$("#jqxgridE").jqxGrid('setcellvalue', row, "roleId",data.payload.Role.id);
					$("#jqxgridE").jqxGrid('setcellvalue', row, "roleName",data.payload.Role.name);
				});	

				
			}
		},
		{'text' : 'Role ID','datafield' : 'roleId',hidden:true}, 
		{'text' : 'Role Name','datafield' : 'roleName','width' : '19%',cellsalign : 'center',align:'center',sortable : false,editable : false}, 
		{'text' : 'Target',	'datafield' : 'targetYNN','width' : '19%',displayfield : 'editTargetYorNo',cellsalign : 'center',columntype : 'dropdownlist',align:'center',sortable : false,editable : true,
			cellbeginedit : function(row){
				var statusFlag = $("#jqxgridE").jqxGrid('getcellvalue', row, "statusFlag");
				if(statusFlag == true){
					return true;
				}else{
					return false;
				}
			},
			initeditor : function(row, value, editor) {
					editor.jqxDropDownList({ source: targetYNAdapterE , displayMember: 'name', valueMember: 'id'});				
			}
		},
		{'text' : 'Action','datafield' : 'actionId',cellsrenderer : deleteSG,'width' : '5%',cellsalign : 'center',align:'center',sortable : false,editable : false},

		{'text' : 'Status','datafield' : 'statusFlag',cellsalign : 'center',align:'center',sortable : false,editable : false,hidden: true}, 
		{'text' : '','datafield' : 'flag',cellsalign : 'center',align:'center',sortable : false,editable : false,hidden: true}, 
	];
	
	var addrow = function(rowIdS, rowdata, position, commit) {commit(true);}
	addGrid(datafields, columns, updateRows, data, addrow, "#jqxgridE");
}

var seNameValE = [];
var getSeList = function(storeId){
$.getJSON('/OrderExecution/api/v1/spGroupDetailsByStore?storeId='+ storeId, function(data) {

	$.each(data.payload.details.seList, function(key, val) {
			seNameValE.push({
			  "id" : val.id,
			  "name" : val.name 
			});
		});
	});
}

var editSalesGroupEdit = function(sgId, isActive){

	
	$.getJSON('/OrderExecution/api/v1/editSPGroup?spId='+sgId, function(data) {
		var dataVal = data.payload.spHeaderList;
		var dataDetails = data.payload.spDetailList;
		$('#storeId').val(dataVal.storeId);
		$('#saleGrID').val(dataVal.spHeaderId);
		$('#storeNameE').val(dataVal.storeName);
		$('#storetypeE').val(dataVal.storeType);
		$('#zoneNameE').val(dataVal.zoneName);
		$('#zonetypeNameE').val(dataVal.zoneTypeName);
		$('#supervisorNameE').val(dataVal.sName);
		$('#startDateE').val(dataVal.startDate);
		$('#endDateE').val(dataVal.endDate);
		$('#monthCAValueE').val(dataVal.monthNo);
		$('#monthCAE').val(dataVal.month);
		$('#yearE').val(dataVal.year);
		$('#supIdE').val(dataVal.supId);
		$('#zoneIdE').val(dataVal.zoneId);
		$("#isActiveE").val(isActive);
		//getSeList(dataVal.storeId);
		if(isActive == true){
			$("#salesGrpSaveE").prop('disabled', false);
			$("#addRowE").prop('disabled', false);
		}else if(isActive == false){
			$("#salesGrpSaveE").prop('disabled', true);
			$("#addRowE").prop('disabled', true);
		}else{
			$("#salesGrpSaveE").prop('disabled', false);
			$("#addRowE").prop('disabled', false);
		}
		
		
		$("#startDateE").datepicker({
			changeMonth : true,
			changeYear : true,
			dateFormat : "dd/mm/yy",
			minDate: 0,
	    	 onSelect: function (dateStr) {
		        var min = $(this).datepicker('getDate'); // Get selected date
		        $("#endDateE").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
		    }
		});

		$("#endDateE").datepicker({
			changeMonth : true,
			changeYear : true,
			dateFormat : "dd/mm/yy",
			minDate: 0
		});
		editSalesDetailsModalGrid(dataDetails);
		
	});
}
// search grid filed filter
var saleGroupFieldFilter = function(){
	var storeNameS = $('#storeNameS').val();
	var zoneNameS = $('#zoneNameS').val();
	var storeTypeS = $('#storeTypeS').val();
	var monthYear = $('#monthYear').val();
	var status = $('#statusS').val();
	var monthS = $('#monthS').val();
	var yearS = $('#yearS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (storeNameS != "" && storeNameS != null) {
		fieldFilters.fieldFilters["storeName"] = storeNameS;
	}
	if (storeTypeS != "" && storeTypeS != null) {
		fieldFilters.fieldFilters["storeType"] = storeTypeS;
	}
	if (zoneNameS != "" && zoneNameS != null) {
		fieldFilters.fieldFilters["zoneName"] = zoneNameS;
	}
	if (monthYear != "" && monthYear != null) {
		fieldFilters.fieldFilters["date"] = monthYear;
	}
	
	if (monthS != "" && monthS != null) {
		fieldFilters.fieldFilters["month"] = monthS;
	}
	
	if (yearS != "" && yearS != null) {
		fieldFilters.fieldFilters["year"] = yearS;
	}
	
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = (status == "true") ? true : false;
	}
	return fieldFilters;
}

// Main Search Grid
var salesGroupDetailsGrid = function() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'storeName',
		'type' : 'string'
	}, {
		'name' : 'storeType',
		'type' : 'string'
	}, {
		'name' : 'zoneName',
		'type' : 'string'
	}, {
		'name' : 'zoneTypeName',
		'type' : 'string'
	}, {
		'name' : 'startDate',
		'type' : 'string'
	}, {
		'name' : 'endDate',
		'type' : 'string'
	}, {
		'name' : 'sName',
		'type' : 'string'
	}, {
		'name' : 'isActive',
		'type' : 'bool'
	},{
		'name' : 'id',
		'type' : 'int',
		'map' : 'spHeaderId'
	} ];

	var columns = [ {
		'text' : 'Store Name',
		'datafield' : 'storeName',
		'width' : '15%',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Is Active',
		'datafield' : 'isActive',
		'width' : '14%',
		cellsalign : 'center',
		align:'center',
		editable : false,
		hidden: true
	}, {
		'text' : 'Zone Name',
		'datafield' : 'zoneName',
		'width' : '16%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Zone Type Name',
		'datafield' : 'zoneTypeName',
		'width' : '16%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Start Date',
		'datafield' : 'startDate',
		'width' : '14%',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false,
		columntype : 'datetimeinput',
		cellsformat : 'dd/MM/yyyy',
	}, {
		'text' : 'End Date',
		'datafield' : 'endDate',
		'width' : '14%',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false,
		columntype : 'datetimeinput',
		cellsformat : 'dd/MM/yyyy',
	}, {
		'text' : 'Supervisor Name ',
		'datafield' : 'sName',
		'width' : '20%',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	}, {
		text : '',
		datafield : 'id',
		cellsrenderer : editSalesGroup,
		editable : false,
		filterable: false,
		cellsalign : 'center',
		align:'center',
		sortable : false,
		'width' : '5%'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchSpgroup", "list",	columns, saleGroupFieldFilter(), updateRows, "id");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		theme: 'energyblue',
		rowdetails : true,
		virtualmode : true
	});
}


//search grid filed filter

// Export Sales Group
$('#export').on('click', function(){
	var storeNameS = $('#storeNameS').val();
	var zoneNameS = $('#zoneNameS').val();
	var storeTypeS = $('#storeTypeS').val();
	var monthYear = $('#monthYear').val();
	
	var newData = [];
	var sysdate = moment().format('DDMMYYYYHHmmSS');	
	var rows = $('#jqxgrid').jqxGrid('getrows');
	if (  rows == undefined || rows == 0 ) {
		$.growl.error({
			message : "No Data To Export",
			duration : 10000
		});
		return false;
	}else{
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if(rows.rowscount != 0){
	if(fieldFilters){
	postJSON('/OrderExecution/api/v1/spGroupExportList', JSON.stringify(saleGroupFieldFilter()), function(response) {
	if(response!=null){ 
			data = response.payload.list;			
			for(i=0; i<data.length; i++){
					var storeName = data[i].storeName;
					var storeType = data[i].storeType;
					var zoneName = data[i].zoneName;
					var zoneType = data[i].zoneTypeName;
					var startDate = data[i].startDate;
					var endDate = data[i].endDate;
					var supName = data[i].sName;
									
					newData.push({
						'Store Name' : storeName,
						'Store Type' : storeType,
						'Zone Name' : zoneName,
						'Zone Type' : zoneType,
						'Start Date' : startDate,
						'End Date' : endDate,
						'Supervisor Name':  supName
					});				
			      }
			    //JSONToCSVConvertor(newData, "saleGroup" + "_" + sysdate, true);
			   var opts = [{sheetid:'Sales_Group_Details',header:true}];
               var res = alasql('SELECT * INTO XLSX("Sales Group Details_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
        	 }
		 });	
	   }
    }else{
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;	
	  }
	}
});

// Company details search and load grid with data from the server
$('#search').on('click', function() {
	 $form = $('#Search');
	    $form.validate({
	        errorElement: 'label', 
	        errorClass: 'help-inline', 
	        focusInvalid: false, 
	        ignore: "",
	        rules: {
	        	"storeNameS": {
	                required: true
	            },
	            "monthYear":{required:false, dateITA : true},
	            errorPlacement: function(error, element) {
		        	if(element.context.name == "storeNameS" || element.context.name == "monthYear"){
		        		error.insertAfter(element.parent());
		        	}else{
		        		error.insertAfter(element);
		        	}
		        },
	    messages: {
            'storeNameS': {
                required: "Please enter StoreName!"
                
            },
            'monthYear':{
            	required:"Please enter proper Date!"
            }
        }
	        }
	    });

	    if ($form.valid()) {
	    	salesGroupDetailsGrid();
	    	$("#jqxgrid").show();
	    } else {
	    	 return false;
	    }

	    return false;
	});

var salesGroupDetailsValidate = function(){
	 $form = $('#salesGroupSearchC');
	    $form.validate({
	        errorElement: 'label', 
	        errorClass: 'help-inline', 
	        focusInvalid: false, 
	        ignore: "",
	        rules: {
	        	"storeNameC": { required: true},
	        	//"storetypeC": { required: true},
	            "zoneNameC": {  required: true},
	            "startDateC": { required: true, dateITA : true},
	            "endDateC": { required: true, dateITA : true},
	            "supervisorName": { required: true},
	            },
	            errorPlacement: function(error, element) {
		        	if(element.context.name == "startDateC" || element.context.name == "endDateC"){
		        		error.insertAfter(element.parent());
		        	}else{
		        		error.insertAfter(element);
		        	}
		        },
	    messages: {	    	
	     'storetypeC': {required: "Please select StoreType!"},
         'storeNameC': {required: "Please select StoreName!"},
         'zoneNameC': { required: "Please select ZoneName!"},
         'startDateC': { required: "Please select StartDate!"},        
         'endDateC': { required: "Please select EndDate!"},
         'supervisorName': { required: "Please select supervisorName!"}
	    }   
	    });       
             
	    if ($form.valid()) {
	    	 return true;
	    } else {
	    	 return false;
	    }

	    return false;
	}            
	          	        
	
	var salesGroupDetailsEdit = function(){
		
		$form = $('#salesGroupSearchE');
	    $form.validate({
	        errorElement: 'label', 
	        errorClass: 'help-inline', 
	        focusInvalid: false, 
	        ignore: "",
	        rules: {
	        	"startDateE": { required: true, dateITA : true},
	            "endDateE": { required: true, dateITA : true },
	        },
	        errorPlacement: function(error, element) {
	        	if(element.context.name == "startDateE" || element.context.name == "endDateE"){
	        		error.insertAfter(element.parent());
	        	}else{
	        		error.insertAfter(element);
	        	}
	        },
	        messages: {
	            'startDateE': {
	                required: "Please enter select Start Date!",
	                
	            },
	            'endDateE': {
	                required: "Please enter select valid end date!"
	                
	            }
	        }
	    });

	    if ($form.valid()) {
	    	 return true;
	    } else {
	    	 return false;
	    }

	    return false;
	}

var rowId = 0;
var generaterow = function(i) {
	var row = {};

	row["SLNo"] = i;
	// row["storeNameC"] = $('#storeNameC').val();
	row["zoneName"] = $("#zoneNameC option:selected").text();
	row["startDate"] = $("#startDateC").val();
	row["endDate"] = $('#endDateC').val();
	row["targetYN"] = "";
	rowId = rowId + 1;
	return row;
}	
  
// Clear search form and grid
$('#clearAll').on('click', function() {
	 var validator = $( "form" ).validate();
		validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});
