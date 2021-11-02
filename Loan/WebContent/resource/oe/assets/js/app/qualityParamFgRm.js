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

$('input:radio[name="fgRMParam"]').filter('[value="fg"]').attr('checked', true);
$('#fgParamDet').show();
$('#rmParamDet').hide();
$('input[name=fgRMParam]:radio').on('click', function() {
	var selectedVal = $(this).val();
	if (selectedVal == "fg") {
		window.location.href = "javascript:showContentPage('qualityParamFgRm', 'bodySwitcher')";
		$('input:radio[name="fgRMParam"]').filter('[value="fg"]').attr('checked', true);
		$('#fgParamDet').show();
		$('#rmParamDet').hide();

		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');


	} else if (selectedVal == "rm") {
	/*	window.location.href = "javascript:showContentPage('qualityParamFgRm', 'bodySwitcher')";
		$('input:radio[name="fgRMParam"]').filter('[value="rm"]').attr('checked', true);*/

		$('#fgParamDet').hide();
		$('#rmParamDet').show();
		
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');

		
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

//Status Object
var statusObj = [{
	"id" : true,
	"name" : "Active"
},{
	"id" : false,
	"name" : "In-Active"
}];

var statusObject = function(statusId = null){
	$('#statusCreateRME').empty().append('<option value="" selected>--Select--</option>');	
	$('#fgStatusE').empty().append('<option value="" selected>--Select--</option>');	
	$('#statusCreateRM').empty().append('<option value="" selected>--Select--</option>');	
	$('#fgStatus').empty().append('<option value="" selected>--Select--</option>');	
	
	$.each(statusObj, function(key, val) {
			
		if(statusId == null){
			$('#statusCreateRM').append('<option  value="' + val.id + '">' + val.name	+ '</option>');		
			$('#fgStatus').append('<option  value="' + val.id + '">' + val.name	+ '</option>');
		}else{
			if(statusId == val.id){				
				$('#statusCreateRME').append('<option selected  value="' + val.id + '">' + val.name	+ '</option>');
				$('#fgStatusE').append('<option selected value="' + val.id + '">' + val.name	+ '</option>');
			}else{
				$('#statusCreateRME').append('<option  value="' + val.id + '">' + val.name	+ '</option>');
				$('#fgStatusE').append('<option  value="' + val.id + '">' + val.name	+ '</option>');
			}
		}
	});
}

statusObject(statusId = null);

//FG Search listing filed Filter
var qualityParamFGFieldFilterVal = function() {
	var fgSegmentS = $("#fgSegmentS").val();
	var fgCodeS = $("#fgCodeS").val();
	var fgCodeDescS = $("#fgCodeDescS").val();
	var fgStatusS = $("#fgStatusS").val();
	var fgCreatedVy = $("#fgCreatedVy").val();
	var fgCreatedOn = $("#fgCreatedOn").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fgSegmentS != "" && fgSegmentS != null) {
		fieldFilters.fieldFilters["segmentId"] = fgSegmentS;
	}
	if (fgCodeS != "" && fgCodeS != null) {
		fieldFilters.fieldFilters["code"] = fgCodeS;
	}
	if (fgCodeDescS != "" && fgCodeDescS != null) {
		fieldFilters.fieldFilters["codeDescription"] = fgCodeDescS;
	}
	if (fgStatusS != "" && fgStatusS != null) {
		fieldFilters.fieldFilters["status"] = fgStatusS;
	}
	if (fgCreatedVy != "" && fgCreatedVy != null) {
		fieldFilters.fieldFilters["createdBy"] = fgCreatedVy;
	}
	if (fgCreatedOn != "" && fgCreatedOn != null) {
		fieldFilters.fieldFilters["createdDate"] = fgCreatedOn;
	}
	
		fieldFilters.fieldFilters["FgOrRm"] = "1";
	return fieldFilters;
}

//RM Search listing filed Filter
var qualityParamFGFieldFilterValRM = function() {
	var segmentRM = $("#segmentRM").val();
	var codeRM = $("#codeRM").val();
	var codeDescRM = $("#codeDescRM").val();
	var statusRM = $("#statusRM").val();
	var rmCreatedOn = $("#rmCreatedOn").val();
	var rmCreatedVy = $("#rmCreatedVy").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (segmentRM != "" && segmentRM != null) {
		fieldFilters.fieldFilters["segmentId"] = segmentRM;
	}
	if (codeRM != "" && codeRM != null) {
		fieldFilters.fieldFilters["code"] = codeRM;
	}
	if (codeDescRM != "" && codeDescRM != null) {
		fieldFilters.fieldFilters["codeDescription"] = codeDescRM;
	}
	if (statusRM != "" && statusRM != null) {
		fieldFilters.fieldFilters["status"] = statusRM;
	}
	if (rmCreatedOn != "" && rmCreatedOn != null) {
		fieldFilters.fieldFilters["createdDate"] = rmCreatedOn;
	}
	if (rmCreatedVy != "" && rmCreatedVy != null) {
		fieldFilters.fieldFilters["createdBy"] = rmCreatedVy;
	}
	fieldFilters.fieldFilters["FgOrRm"] = "0";

	return fieldFilters;
}

// FG Grid
var fgDataGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}
	 var addfilter = function () {
         var filtergroup = new $.jqx.filter();

         var filter_or_operator = 1;
         var filtervalue = 'Beate';
         var filtercondition = 'contains';
         var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);

         filtervalue = 'Andrew';
         filtercondition = 'starts_with';
         var filter2 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);

         filtergroup.addfilter(filter_or_operator, filter1);
         filtergroup.addfilter(filter_or_operator, filter2);
         // add the filters.
         $("#jqxgrid").jqxGrid('addfilter', 'firstname', filtergroup);
         // apply the filters.
         $("#jqxgrid").jqxGrid('applyfilters');
     }

	var datafields = [ {
		'name' : 'id',
		'type' : 'int'
	}, {
		'name' : 'segmentDesc',
		'type' : 'string'
	}, {
		'name' : 'code',
		'type' : 'string'
	}, {
		'name' : 'codeDescription',
		'type' : 'string'
	}, {
		'name' : 'createdBy',
		'type' : 'string'
	}, {
		'name' : 'createdDate',
		'type' : 'date'
	}, {
		'name' : 'status',
		'type' : 'string',
		'map' : 'isActive'
	}, {
		'name' : 'Aid',
		'type' : 'int',
		'map' : 'id'
	} ];

	var columns = [ {
		'text' : 'Segment',
		'datafield' : 'segmentDesc',
		'width' : '11%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Code',
		'datafield' : 'code',
		'width' : '11%',
		cellsalign : 'left',
		align:'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Code Desc',
		'datafield' : 'codeDescription',
		'width' : '47%',
		cellsalign : 'left',
		align:'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Created By',
		'datafield' : 'createdBy',
		'width' : '11%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Created On',
		'datafield' : 'createdDate',
		cellsformat : 'dd/MM/yyyy',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Status',
		'datafield' : 'status',
		'width' : '7%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : false
	}, {
		text : '',
		datafield : 'Aid',
		cellsrenderer : editFg,
		cellsalign : 'center',
		align:'center',
		 filterable: false,
		'width' : '3%',
		editable : false
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchQualityParamList","list", columns, qualityParamFGFieldFilterVal(), updateRows, "");
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

$('#fgSegmentS').empty().append('<option value="" selected>--Select--</option>');
$('#fgSegment').empty().append('<option value="" selected>--Select--</option>');
$.getJSON('/OrderExecution/api/v1/qualityParamLOV?criteria=F', function(data) {
	$.each(data.payload.segments, function(key, val) {
		$('#fgSegment').append('<option value="' + val.id + '">' + val.description + '</option>');
});
	
	$.each(data.payload.segments, function(key, val) {
		$('#fgSegmentS').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
});

$('#segmentRM').empty().append('<option value="" selected>--Select--</option>');

$('#segmentCreateRM').empty().append('<option value="" selected>--Select--</option>');

//for Rm
$.getJSON('/OrderExecution/api/v1/qualityParamLOV?criteria=R', function(data) {	
	$.each(data.payload.segments, function(key, val) {
		$('#segmentRM').append('<option value="' + val.id + '">' + val.description + '</option>');
	});	
	$.each(data.payload.segments, function(key, val) {
		$('#segmentCreateRM').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
});


var saveQualityParamtr = function() {
	// Create object
	var QualityParamtr = {
		"segmentId" : $('#fgSegment').val(),
		"code" : $('#fgCode').val(),
		"codeDescription" : $('#fgCodeDesc').val(),
		"status" : ($('#fgStatus').val() == "Active") ? true : false, 
	}
	return QualityParamtr;
}

$("#createFGParameterDet").validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	"fgSegment": {
    		required: true
        },
        "fgCode":{
        	required: true,
        	regx : /^[A-Z]+$/,
        	maxlength : 4
        },
        "fgCodeDesc":{
        	required: true,
        	regx : /^[a-zA-Z\s]+$/
        },
        "fgStatus":{
        	required: true
        }
    },
    messages: {
    	 "fgCode":{
    		 regx : "Only capital letters allowed!",
    		 maxlength : "Character should be maximum of 4 digit!"
    	 },
    	 "fgCodeDesc":{
    		 regx : "Only character with space!"
    	 }
    },
    submitHandler: function (form) { 
    	trimmer();
    	var parameterQualityRmFG = saveQualityParamtr();

		if (parameterQualityRmFG) {
			postJSON('/OrderExecution/api/v1/createQualityParameter',
					JSON.stringify(parameterQualityRmFG),
					function(data) {

				if (data.resCode == "1") {										
					$.growl.notice({
								message : data.mesgStr,
								duration : 10000,
								title : 'Success'
							});
					$('#createFgParamDet').modal('hide');
					fgDataGrid();
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

//Validate Field for Creation of quality parameters for RM###############################################################################

var saveQualityParamtrRM = function() {	
	// Create object
	var QualityParamtrRM = {
		"segmentId" : $('#segmentCreateRM').val(),
		"code" : $('#codeCreateRM').val(),
		"codeDescription" : $('#codeDescCreateRM').val(),
		"status" :($('#statusCreateRM').val() == "Active") ? true : false, 
	}
	return QualityParamtrRM;
}

// Create RM
$('#createRmParameterDet').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	"segmentCreateRM": {
    		required: true
        },
        "codeCreateRM":{
        	required: true,
        	regx : /^[A-Z]+$/,
        	maxlength : 4
        },
        "codeDescCreateRM":{
        	required: true,
        	regx : /^[a-zA-Z\s]+$/
        },
        "statusCreateRM":{
        	required: true
        }
    },
    messages: {
    	 "codeCreateRM":{
    		 regx : "Only capital letters allowed!",
    		 maxlength : "Character should be maximum 4 digit!"
    	 },
    	 "codeDescCreateRM":{
    		 regx : "Only character with space!"
    	 }
    },
    submitHandler: function (form) {
    	trimmer();
    	var parameterQualityRm = saveQualityParamtrRM();

		if (parameterQualityRm) {
			postJSON('/OrderExecution/api/v1/createQualityParameter',JSON.stringify(parameterQualityRm), function(data) {
						if (data.resCode == "1") {
							$('#createRMDet').modal('hide');
							$.growl.notice({
								message : data.mesgStr,
								duration : 10000,
								title : 'Success'
							});
							$('#createRMDet').hide();
							rmDataGrid();
						}else{
							$.growl.error({
								message : data.mesgStr,
								duration : 10000,
								title : 'Success'
							});
						}
					});
		}
    	return false; 
    }
});

// RM Grid
var rmDataGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'id',
		'type' : 'int'
	}, {
		'name' : 'segmentDesc',
		'type' : 'string'
	}, {
		'name' : 'code',
		'type' : 'string'
	}, {
		'name' : 'codeDescription',
		'type' : 'string'
	}, {
		'name' : 'createdBy',
		'type' : 'string'
	}, {
		'name' : 'createdDate',
		'type' : 'date'
	}, {
		'name' : 'status',
		'type' : 'string',
		'map' : 'isActive'
	},{
		'name' : 'RMid',
		'type' : 'int',
		'map' : 'id'
	}  ];

	var columns = [{
		'text' : 'Segment',
		'datafield' : 'segmentDesc',
		cellsalign : 'center',
		align:'center',
		'width' : '11%',
		sortable : true,
		editable : false
	}, {
		'text' : 'Code',
		'datafield' : 'code',
		cellsalign : 'center',
		align:'center',
		'width' : '10%',
		sortable : true,
		editable : false
	}, {
		'text' : 'Code Desc',
		'datafield' : 'codeDescription',
		cellsalign : 'left',
		'width' : '47%',
		align:'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Created By',
		'datafield' : 'createdBy',
		'width' : '11%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Created On',
		'datafield' : 'createdDate',
		cellsformat : 'dd/MM/yyyy',
		'width' : '11%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Status',
		'datafield' : 'status',
		'width' : '7%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : true
	}, {
		text : '',
		datafield : 'RMid',
		cellsrenderer : editRM,
		editable : false,
		 filterable: false,
		sortable : false,
		'width' : '3%'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchQualityParamList","list", columns, qualityParamFGFieldFilterValRM(), updateRows, "");	
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
//####################################################### UPDATE FOR FG ################################################################################
var editFg = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
		var status = $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
		if(status == "Active"){
			var editVal = '<button class="btn btn-sm btn-primary" data-toggle="modal"  data-target="#btnViewFG" type="button" id='
				+ row
				+ ' onclick="editFgDetails('
				+ value
				+ ')"/><i class="fa fa-pencil fa-sm"></i></button>';
		}else{
			var editVal = '<button disabled class="btn btn-sm btn-primary" type="button"><i class="fa fa-pencil fa-sm"></i></button>';
		}
		return editVal;
	}
}

var saveDet = function() {

	var editFgDet = {
		"codeDescription" : $('#fgCodeDescE').val(),
		"id" : $('#fgSegmentIdE').val(),
		"status" : $('#fgStatusE').val()
	}
	return editFgDet;
}

//Edit FG Details
var editFgDetails = function(row) {
	$('#popupheaderlabelFG').text('Edit FG Details');
	$.getJSON('/OrderExecution/api/v1/editQCFGRM?qfId=' + row, function(data) {
		var dataVal = data.payload.editQCFGRM;
		statusObject(dataVal.status);
		$('#fgSegmentIdE').val(dataVal.id);
		$("#fgSegmentE").val(dataVal.segmentDesc);
		$("#fgCodeE").val(dataVal.code);
		$("#fgCodeDescE").val(dataVal.codeDescription);
		$("#fgCreatedVyE").val(dataVal.createdBy);
		var dateValue = $.date(dataVal.createdDate);
		$("#fgCreatedOnE").val(dateValue);
	});
}

// FG Edit
$('#qualityParamSearch').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	"fgCodeDescE": { 
    		required: true, 
    		regx: /^[a-zA-Z\s]+$/         			
    	},
    	"fgStatusE": { 
    		required: true 
		}
    },
    messages: {
    	"fgCodeDescE":{
        	regx: "Only character with space!"
        }
   },
   submitHandler: function (form) { 
	   trimmer();
		var paramFgDetailsEditFG = saveDetFG();
		if (paramFgDetailsEditFG) {
			postJSON('/OrderExecution/api/v1/updateQualityParameter', JSON.stringify(paramFgDetailsEditFG), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
							message : data.mesgStr,
							duration : 10000,
							title : 'Success'
					});					
					$('#btnViewFG').modal('hide');
					fgDataGrid();
				} else {
					$.growl.error({
						message : "Please Contact Administrator!!",
						duration : 10000
					});
				}
			});
		}
	   return false; 
   }
});

//####################################################### UPDATE FOR RM ################################################################################
var editRM = function(row, column, value) {	 
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{		
		var status = $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
		if(status == "Active"){
			var editVal ='<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnViewRM" type="button"  id='
				+ row
				+ ' onclick="editRmDetails('
				+ value
				+ ')"/><i class="fa fa-pencil fa-sm"></i></button>';
		}else{
			var editVal = '<button disabled class="btn btn-sm btn-primary" type="button"><i class="fa fa-pencil fa-sm"></i> </button>';
		}
		return editVal;
	}
}
var saveDet = function() {

	var editRmDet = {
		"codeDescription" : $('#codeDescCreateRME').val(),
		"id" : $('#paramDetailsRmID').val(),
		"status" : $('#statusCreateRME').val()
	}
	
	return editRmDet;
}

var saveDetFG = function() {
	var editRmDet = {
		"codeDescription" : $('#fgCodeDescE').val(),
		"id" : $('#fgSegmentIdE').val(),
		"status" : $('#fgStatusE').val()
	}
	return editRmDet;
}


//Edit rm Details
var editRmDetails = function(row) {

	$('#popupheaderlabelRM').text('Edit RM Details');
	$.getJSON('/OrderExecution/api/v1/editQCFGRM?qfId=' + row, function(data) {
		
		var dataVal = data.payload.editQCFGRM;
		statusObject(dataVal.status);
		$("#segmentCreateRME").val(dataVal.segmentDesc);
		$("#codeCreateRME").val(dataVal.code);
		$("#codeDescCreateRME").val(dataVal.codeDescription);
		$("#rmCreatedVyE").val(dataVal.createdBy);
		var dateVal = $.date(dataVal.createdDate);
		$("#rmCreatedOnE").val(dateVal);
		$("#paramDetailsRmID").val(dataVal.id);
	});
}

// Update RM Details
$('#qualityParamSearchRM').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	"codeDescCreateRME": { 
    		required: true, 
    		regx: /^[a-zA-Z\s]+$/         			
    	},
    	"statusCreateRME": { 
    		required: true 
		}
    },
    messages: {
    	"codeDescCreateRME":{
        	regx: "Only character with space!"
        }
   },
   submitHandler: function (form) { 
	   trimmer();
		var paramDetailsEdit = saveDet();
		if (paramDetailsEdit) {
			postJSON('/OrderExecution/api/v1/updateQualityParameter', JSON.stringify(paramDetailsEdit), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#btnViewRM').modal('hide');
					rmDataGrid();
				} else {
					$.growl.error({
						message : "Please Contact Administrator!!",
						duration : 10000
					});
				}					
			});
		}
	   return false;
   }
});

//##################################################### FG Edit Modal Grid #################################################################################################

// search for FG listing
	$('#zoneDetailCreate').validate({
        errorElement: 'label', 
        errorClass: 'help-inline', 
        focusInvalid: false, 
        ignore: "",
        rules: {
        	"fgCodeS": {
        		required: false
            },
            "fgCodeDescS":{
            	required: false
            }
        },
        submitHandler: function (form) { // for demo
        	fgDataGrid();
        	$("#jqxgrid").show();
            return false; // for demo
        }
    });
    
	

//search for RM listing
	$('#searchRmDetails').validate({
        errorElement: 'label', 
        errorClass: 'help-inline', 
        focusInvalid: false, 
        ignore: "",
        rules: {
        	"codeRM": {
        		required: false
            },
            "codeDescRM":{
            	required: false
            }
        },
        submitHandler: function (form) { // for demo
        	rmDataGrid();
        	$("#jqxgrid").show();
            return false; // for demo
        }
    });

   
//Clear grid and reset input and Drop down value
$("#clearAllRM").on('click', function() {
	//window.location.href = "javascript:showContentPage('qualityParamFgRm', 'bodySwitcher')";
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	
	 $("form").each(function(){
		 $(this).validate();
	      $(this).validate().resetForm();
    });
});

//Clear grid and reset input and Drop down value
$("#clearAllFG").on('click', function() {
	window.location.href = "javascript:showContentPage('qualityParamFgRm', 'bodySwitcher')";
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	
	 $("form").each(function(){
		 $(this).validate();
	      $(this).validate().resetForm();
    });
});

$("#createFgParamDetails").on('click', function(){
	statusObject();
});

$("#createRMDetails").on('click', function(){
	statusObject();
});
//######## Validation Started########################
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

$('.modal').on('hidden.bs.modal', function () {
	 $("form").each(function(){
		 $(this).validate();
	      $(this).validate().resetForm();
    });
	 $("form").trigger("reset");
});

