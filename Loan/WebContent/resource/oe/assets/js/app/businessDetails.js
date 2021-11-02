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

// On edit load grid
var editBusinessModalGrid = function(data){
	
	var updateRows = function(rowIdDC, newdata, commit) {
		updates[newdata.id] = {
				"id" : newdata.id,
				"zoneType" : newdata.zoneType,
				"locked" : newdata.locked
			};
	}
	var datafields = [{
		'name' : 'busId',
		'type' : 'long'
	}, {
		'name' : 'businessCode',
		'type' : 'string'
	}, {
		'name' : 'businessName',
		'type' : 'string'
	}];
	
	var columns = [ {
		'text' : 'Business Code',
		'datafield' : 'businessCode',
		'width' : '418px',
		editable : true,
		cellsalign : 'center',
		align:'center'
	}, {
		'text' : 'Business Name',
		'datafield' : 'businessName',
		'width' : '450px',
		cellsalign : 'center',
		align:'center',
		editable : true
	}];
	
	addGrid(datafields, columns, updateRows, data, "", "#jqxgridBE");
	
}

//Edit Business Details
$('#saveBusinessDetE').on('click', function(){
	trimmer();
	
	var rows = $('#jqxgridBE').jqxGrid('getrows');
	
	
	var busLines = editBusDetObj();
	
	if(busLines != null){
		postJSON('/OrderExecution/api/v1/updateBusinnessDetails', JSON.stringify(busLines), function(data) {
	
			if (data.resCode == "1") {							
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#editBusinessDet').modal('hide');
				businessMasterGrid();
				$('body').on('hidden.bs.modal', '.modal', function () {
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

var editBusDetObj = function() {
	
	var rows = $('#jqxgridBE').jqxGrid('getrows');

	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		
		if(row.businessName == "" || row.businessCode	== "" || row.businessName == null || row.businessCode	== null){
			$.growl.error({
					message : "Please fill mandatory fields!!",
					duration : 10000
				});
			return null;
		}else{
			var dCode = row.businessCode;
			console.log(dCode);
			
			if(row.businessCode.length >4){
				$.growl.error({
					message : "Code should be maximum of 4 characters!",
					duration : 10000
				});
		    	return false;
			}
			var characterReg = /^[A-Z]+$/;
		    if(!characterReg.test(row.businessCode)) {
		    	$.growl.error({
					message : "Error: Invalid Code!",
					duration : 10000
				});
		    	return false;
		    }
		    
		    /*var deptName = /^[ A-Za-z_@.,%*'^{}<>$()/#&+-]*$/;
		    if(!deptName.test(row.businessName)) {
		    	$.growl.error({
					message : "Name format is not correct!",
					duration : 10000
				});
		    	return false;
		    }*/
		}
		
		var busId = rows[0].busId
		var businessName = rows[0].businessName;
		var businessCode = rows[0].businessCode;
		
		var busLines = {
			"busId" : busId,
			"businessName" : businessName,
			"businessCode" : businessCode		
		};

	}
	
	return busLines;
}
// On create load grid
var createBusinessModalGrid = function(){
	
	var updateRows = function(rowIdDC, newdata, commit) {
		updates[newdata.id] = {
				"id" : newdata.id,
				"zoneType" : newdata.zoneType,
				"locked" : newdata.locked
			};
	}
	var datafields = [ {
		'name' : 'businessCodeC',
		'type' : 'string'
	}, {
		'name' : 'businessNameC',
		'type' : 'string'
	}];
	
	var columns = [ {
		'text' : 'Business Code',
		'datafield' : 'businessCodeC',
		'width' : '400px',
		cellsalign : 'center',
		align:'center',
		editable : true,
		/*validation : function(cell, value) {
			if(value.length = 4)
				{
				console.log("false");
				alert("dsfs");
				}
			return false;
		}*/
		
	}, {
		'text' : 'Business Name',
		'datafield' : 'businessNameC',
		'width' : '390px',
		cellsalign : 'center',
		align:'center',
		editable : true
		/*validation : function(cell, value) {
			alert(value);
			return false;
		}*/
	},
	{
		text : 'Action',
		datafield : 'Delete',
		'width' : '80px',
		columntype : 'button',
		cellsrenderer : function() {
			return "Delete";
		},
		buttonclick : function(row) {
			id = $("#jqxgridB").jqxGrid('getrowid', row);
			$("#jqxgridB").jqxGrid('deleterow', id);		
		}
		
	},
	{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];
	
	var addrow = function(rowIdDC, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows,  "", addrow, "#jqxgridB");
	
}

var saveBusDetObj = function() {
	var busLines = [];
	var rows = $('#jqxgridB').jqxGrid('getrows');

	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		
		if(row.businessNameC == "" || row.businessCodeC	== "" || row.businessNameC == null || row.businessCodeC	== null){
			$.growl.error({
					message : "Please Enter Business Name And Business Code fields!!",
					duration : 10000
				});
			return false;
		}else{
			var dCode = row.businessCodeC;
			console.log(dCode);
			console.log(row.businessCodeC.length );
			if(row.businessCodeC.length > 4){
				$.growl.error({
					message : "Code should be maximum of 4 characters!",
					duration : 10000
				});
		    	return false;
			}
			var characterReg = /^[A-Z]+$/;
		    if(!characterReg.test(row.businessCodeC)) {
		    	$.growl.error({
					message : "Error: Invalid Code!",
					duration : 10000
				});
		    	return false;
		    }
		    
		    /*var deptName = /^[ A-Za-z_@.,%*$()/#&+-]*$/;
		    if(!deptName.test(row.businessNameC)) {
		    	$.growl.error({
					message : "Name format is not correct!!",
					duration : 10000
				});
		    	return false;
		    }*/
		}
		busLines.push({
			"name" : row.businessNameC,
			"code" : row.businessCodeC			
		});

	}
	
	var busLinesDetails = {
	  "compId": $("#companyIDC").val(),
	  "blist":busLines
	}

	return busLinesDetails;
}

// Create Business Details

$('#saveBusinessDet').on('click', function(){	
	trimmer();
	var businessDetailsObj = saveBusDetObj();
	
	if(businessDetailsObj.blist.length > 0){
		postJSON('/OrderExecution/api/v1/createBusiness', JSON.stringify(businessDetailsObj), function(data) {
	
			if (data.resCode == "1") {							
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#createBusinessDet').modal('hide');
				businessMasterGrid();
				$('body').on('hidden.bs.modal', '.modal', function () {
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
	}else{
		$.growl.error({
			message : "Add Business details!!",
			duration : 3000,
			title : 'Error'
		});
		return false;
	}
});

// Generate Row for business creation
var rowId = 0;
var generaterow = function(i) {
	var row = {};
	row["SLNo"] = i;
	row["businessCodeC"] = "";
	row["businessNameC"] = "";	
	rowId = rowId + 1;
	return row;
}

// Add row for create
$('#addRowB').on('click', function(){
	$("#jqxgridB").jqxGrid('addrow', null, generaterow(rowId + 1));
});

var bDetails = [];
// On load business LOV

$('#businessListS').empty().append('<option value="" selected>--Select--</option>');

getJSON('/OrderExecution/api/v1/businessOnloadLOVs', function(response){	
	var blist = response.payload.blist;	
	$.each(blist, function(key, val) {	
			$('#businessListS').append('<option  value="' + val.id + '">'+ val.name + '</option>');
	});
		
	bDetails.push({"companyId" : response.payload.company.id,
		"companyName" : response.payload.company.name,
		"companyCode" : response.payload.company.code
	});
	
});

// Create business details
$('#createBusiDet').on('click', function(){
	$('#companyNameC').val(bDetails[0].companyName);
	$('#companyIDC').val(bDetails[0].companyId);	
	createBusinessModalGrid();
	$("#jqxgridB").show();
});

// Business details edit
var editBusinessDetails = function(busId){
	$('#deptDetValueE').empty().append();
	getJSON('/OrderExecution/api/v1/editBusinessDetails?bId='+busId, function(response){
		$('#companyNameE').val(response.payload.bList[0].compName);
		$('#companyIDCE').val(response.payload.bList[0].compId);
		editBusinessModalGrid(response.payload.bList);
		
		var deptList = response.payload.deptList;
		for(var i=0; i<deptList.length; i++){
			$('#deptDetValueE').append('<i class="fa fa-arrow-right fa-md">&nbsp; &nbsp;' + deptList[i] + '&nbsp; &nbsp;')
		}
	});
}

// Edit Business details
var editBusinessDet = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editBusinessDet"  type="button" id='
	+ row
	+ ' onclick="editBusinessDetails('
	+ value
	+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></button>';
	}
}

// Business details master field filter
var businessFieldFilersVal = function(){
	var businessCodeS = $("#businessCodeS").val();
	var businessNameS = $("#businessNameS").val();
	var businessListS = $("#businessListS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (businessCodeS != "" && businessCodeS != null) {
		fieldFilters.fieldFilters["businessCode"] = businessCodeS;
	}
	if (businessNameS != "" && businessNameS != null) {
		fieldFilters.fieldFilters["businessName"] = businessNameS;
	}
	if (businessListS != "" && businessListS != null) {
		fieldFilters.fieldFilters["id"] = businessListS;
	}
	
	return fieldFilters;
}

// Business details master grid
var businessMasterGrid = function(){
	var updateRows = function(row, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'businessCode',
		'type' : 'string'
	}, {
		'name' : 'businessName',
		'type' : 'string'
	}, {
		'name' : 'busId',
		'type' : 'long'
	}/*, {
		'name' : 'compId',
		'type' : 'long'
	} */];

	var columns = [ {
		'text' : 'Business Code',
		'datafield' : 'businessCode',
		'width' : '48%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : 'Business Name',
		'datafield' : 'businessName',
		'width' : '49%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		text : '',
		datafield : 'busId',
		cellsrenderer : editBusinessDet,
		editable : false,
		filterable: false,
		sortable : false,
		'width' : '3%'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchBusinessMaster", "list",
			columns, businessFieldFilersVal(), updateRows, "id");
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

// Search business details
$("#searchBusiness").on('click', function(){	
	businessMasterGrid();
	$('#jqxgrid').show();	
});

// Clear All
$("#clearBusiness").on('click', function(){
	var validator = $("#businessDetSearch").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$('#jqxgrid').hide();
});

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