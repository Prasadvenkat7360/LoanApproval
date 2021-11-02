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

$("#segDetS").show();
$("#jewelDetS").hide();
$("#catDetS").hide();
$("#subCatDetS").hide();
$('input:radio[name="listOfChild"]').filter('[value="seg"]').attr('checked', true);
$('input[name=listOfChild]:radio').on('click', function() {
	var selectedVal = $(this).val();

	if (selectedVal == "seg") {
		$("#segDetS").show();
		$("#jewelDetS").hide();
        $("#catDetS").hide();
        $("#subCatDetS").hide();
        
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
		
	}  else if (selectedVal == "jewelType") {
		$("#segDetS").hide();
		$("#jewelDetS").show();
		$("#catDetS").hide();
		$("#subCatDetS").hide();	
		
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
		
	}  else if (selectedVal == "category") {
		$("#segDetS").hide();
		$("#jewelDetS").hide();
		$("#catDetS").show();
		$("#subCatDetS").hide();

		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	
	} else if (selectedVal == "subCat") {
		$("#segDetS").hide();
		$("#jewelDetS").hide();
		$("#catDetS").hide();
		$("#subCatDetS").show();
		
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');

	} 
});

//############## LOV for Segment Id ###################
var onLoadSegId = function() {
	
$.getJSON('/OrderExecution/api/v1/segmentLOV',function(data) {
	var slist = data.payload.segments;
	
	var v = '<select id="segIdObj"   name="segIdObj" class="form-control" multiple="multiple">';
		$.each(slist, function(key, val) {
		v += '<option value="' + val.id + '">'+ val.name + '-' + val.description + '</option>'; });
		v += '</select>';
		$("#segId").html(v);
		$('#segIdObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true,
		maxHeight : 250,
		searchable: true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
});

}

onLoadSegId();

//############## SEGMENT CREATE #############
var validateSegment = function() {
	var segLines = [];
	var rows = $('#jqxgridS').jqxGrid('getrows');

	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		console.log(row);
		segLines.push({
		"segmentType" : row.sType,
		"code" : row.segCode,
		"shapeFlag" : row.shapeFlag,
		"isBaseMetalRaste" : row.basemetal,
		"qcFlag" : row.qualityCheck,
		"description" : row.segName,			
		});
	}
	return segLines;
}

$('#listOfChildMasters').on("click",function(){
	SegmentModalGrid();	
	$("#jqxgridS").show();
})


//Create Segment
$('#saveSegment').on('click', function(){	
	trimmer();
	var sType = $("#sType").val();
	var sCode = $("#sCode").val();
	var sName = $("#sName").val();
	var baseMetal = $("#baseMetal").val();
	
	if(sType == null || sType == "" || sCode == null || sCode == "" ||sName == null || sName == "" || baseMetal == null || baseMetal == ""){
		$.growl.error({
			message : "please fill mandatory fields!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	
	var rows = $('#jqxgridS').jqxGrid('getrows');

	if(rows.length == 0){
		$.growl.error({
			message : "Grid fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	var segLines = [];
	
	var segLines = validateSegment();

	if (segLines) {
		postJSON('/OrderExecution/api/v1/createSegment',JSON.stringify(segLines),function(data) {
			if (data.resCode == "1") {	
				$('#createSegment').modal('hide');
				SegmentModalGrid();
			  $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			} else {
			 $.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
		}					
     });
	     } else {
		  $.growl.error({
				message : "Please fill the compolsary field!!",
				duration : 10000
				});
	        }	
        });


//Generate Row for Segment

var rowId = 0;
var generaterow = function(i) {
	var row = {};
	row["sType"] = $("#sType").val();
	row["segCode"] =  $("#sCode").val();
	row["segName"] = $("#sName").val();
	row["basemetal"] = $("#baseMetal").val();
	row["shapeFlag"] =  $("#shapeFlag").val();
	row["qualityCheck"] =  $("#qc").val();	
	rowId = rowId + 1;
	return row;
}

$('#addRowD').on('click', function(){
	var rows = $("#jqxgridS").jqxGrid('getrows');
	var sType = $("#sType").val();
	
	var sCode = $("#sCode").val();
	var sName = $("#sName").val();
	var baseMetal = $("#baseMetal").val();
	/*
	for(var i=0; i<rows.length; i++){
		if(rows[i].segCode == sCode){
			$.growl.error({
				message : "Segment code already exists.",
				duration : 10000
			});
			return false;
		}
	}*/
	
	if(sType == null || sType == "" || sCode == null || sCode == "" ||sName == null || sName == "" || baseMetal == null || baseMetal == ""){
		$.growl.error({
			message : "please fill mandatory fields!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	else{
	$("#jqxgridS").jqxGrid('addrow', null, generaterow(rowId + 1));
    }
});

// ################# create grid for segment ##################
var SegmentModalGrid = function() {

	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [ {
		'name' :'sType',
		'type' :'string'
	}, {
		'name' :'segCode',
		'type' :'string'
	}, {
		'name'  :'segName',
		'type' : 'string'
	}, {
		'name' : 'basemetal',
		'type'  :'string'
		
	}, {
		'name'  :'shapeFlag',
		'type'  :'string'
	}, {
		'name' : 'qualityCheck',
		'type' : 'string'
	
}];
	
	var columns = [ {
		'text'  :'Type',
		'datafield':  'sType',
		'width' : '15%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Seg Code',
		'datafield' : 'segCode',
		'width'  :'15%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
	}, {
		'text' : 'Seg Name',
		'datafield' : 'segName',
		'width' : '15%',
		cellsalign  :'center',
		align:'center',
		sortable : false,
		editable : false
	}, {
		'text'  :'Base Metal',
		'datafield' : 'basemetal',
		'width' : '15%',
		cellsalign  :'center',
		align:'center',
		sortable : false,
		editable  :false
	}, {
		'text' : 'Shape Flag',
		'datafield' : 'shapeFlag',
		'width'  :'15%',
		cellsalign  :'center',
		align:'center',
		sortable : false,
		editable  :false
	}, {
		'text' : 'Quality Check',
		'datafield' : 'qualityCheck',
		'width':  '15%',
		cellsalign : 'center',
		align:'center',
		sortable: false,
		editable : false
	},{
		text : 'Action',
		datafield : 'Delete',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		columntype : 'button',
		cellsrenderer : function() {
			return "Delete";
		},
		buttonclick : function(row) {
			id = $("#jqxgridS").jqxGrid('getrowid', row);
			$("#jqxgridS").jqxGrid('deleterow', id);		
		}
		
	},
	{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];

	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridS');
}

var segmentEdit = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditSegment"  type="button" id='
			+ row
			+ ' onclick="editSegment('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></a>'
	}
}

//############# Segment Field Filters #####################
var segmentFieldFilters = function() {
	var segId = $('#segId').val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};
	
	var segIdObj = $('#segIdObj').val();
	if (segIdObj == null || segIdObj == "") {
		var segId = "";
	} else {
		var segId = segIdObj.join(",");
	}

	if (segId != "" && segId != null) {
		fieldFilters.fieldFilters["id"] = segId;
	}
	return fieldFilters;
}


//############# Segment Grid Started ######################################
function segmentGrid() {
	var updateRows = function(rowid, newdata, commit) {
		
	}
	var datafields = [ {
		'name' : 'segId',
		'type' : 'long',
		'map' : 'segmentId'
	}, {
		'name' : 'type',
		'type' : 'string',
		'map' :  'segmentType'
	}, {
		'name' : 'segCode',
		'map' : 'code',
		'type' : 'String'
	}, {
		'name' : 'segDesc',
		'map' : 'description',
		'type' : 'string'
	}, {
		'name' : 'shape',
		'type' : 'string',
		'map' : 'shapeFlag'
	}, {
		'name' : 'baseMetal',
		'type' : 'string',
		'map' : 'isBaseMetalRaste'
	}, {
		'name' : 'qualityCheck',
		'type' : 'string',
		'map': 'qcFlag'
	}, {
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'segmentId'
	}];
	var columns = [ {
		'text' : 'Segment Id',
		'datafield' : 'segId',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Type',
		'datafield' : 'type',
		'width' : '19.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Segment Code',
		'datafield' : 'segCode',
		'width' : '15%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Segment Name',
		'datafield' : 'segDesc',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Shape Flag',
		'datafield' : 'shape',
		'width' : '11%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Base Metal Flag',
		'datafield' : 'baseMetal',
		'width' : '11%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Quality Check Flag',
		'datafield' : 'qualityCheck',
		'width' : '10.5%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	},{
		text : '',
		datafield : 'actionId',
		cellsrenderer : segmentEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '3%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchSegments", "list",columns, segmentFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
	});
}
var updateSegment = function() {

	var updateSeg = {
		"segmentId" : $("#segIdE").val(),
		"segmentType" : $("#typeE").val(),
		"code" : $("#segCodeE").val(),
		"shapeFlag" : $("#shapeFlagE").val(),
		"description" : $("#segNameE").val(),
		"qcFlag" : $("#qcE").val(),
		"isBaseMetalRaste" : $("#baseMetalE").val()
	}
	return updateSeg;
};

//Update and save SEGMENT

$('#segmentE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
          
        "shapeFlagE": { required: true },
        "qcE": { required: true },
        "baseMetalE" : {required: true}
    },
    submitHandler: function (form) { 
    	trimmer();
    	
    	var updateSegS = updateSegment();

		if (updateSegS) {postJSON('/OrderExecution/api/v1/updateSegment ',JSON.stringify(updateSegS), function(data) {
			if (data.resCode == "1") {
			 $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
		$('#btnEditSegment').modal('hide');
		$('#createSegment').on('hidden.bs.modal',function() {
		 $(this).find('form').trigger('reset');
			});
			segmentGrid();
		}else{
		    $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
       }
	   $('#btnEditSegment').modal('hide');
	 });
	}
   }  
});  

$("#editSegmentE").on('click',function(){
	var shapeFlagE = $("#shapeFlagE").val();
	var qcE = $("#qcE").val();
	var baseMetalE = $("#baseMetalE").val();
		if(shapeFlagE == "" || shapeFlagE == null || qcE == "" || qcE == null ||  baseMetalE == "" || baseMetalE == null){
			$.growl.error({
				message :"Please Fill Mandatory Fields !!",
				duration : 10000,
				title :'Error'
		 });
		return false;
	}
});

$("#segmentSearch").on('click', function() {
	/*var segId = $("#segId").val();
	if(segId == "" || segId == null){
		$.growl.error({ message: "Segment Id is Required!", duration: 5000, title: 'Error' });
		return false;
	}*/
	segmentGrid();
	$("#jqxgrid").show();
	
});

/*$("#clearSegment").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});*/

$('#clearSegment').on('click', function() {
	$('#segIdObj').multiselect("clearSelection");
	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('listOfChildMasters', 'bodySwitcher')";
});

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

//############ Edit Segment #################
var editSegment = function(id){
	$('#popupheaderlabelSeg').text('Edit Segment');

	
	fieldFilters = {};

	 {
		fieldFilters["id"] = id;
	}

	postJSON('/OrderExecution/api/v1/searchMetalSegment',JSON.stringify(fieldFilters),function(data){
		console.log(fieldFilters);
		var segment = data.payload.segment;
		
		console.log(segment);
		
		$.each(segment,function(key, val) {
			console.log(val.segmentId);
		$("#segIdE").val(val.segmentId);
		$("#segNameE").val(val.description);
		$("#segCodeE").val(val.code);
		$("#shapeFlagE").val(val.shapeFlag);
		$("#baseMetalE").val(val.isBaseMetalRaste);
		$("#qcE").val(val.qcFlag);
		$("#typeE").val(val.segmentType);
		$("#segCreatedOnE").val(val.createdOn);
		$("#segCreatedByE").val(val.createdby);
		$("#segUpdatedOnE").val(val.lastchangedon);
		$("#segUpdatedByE").val(val.lastChangedBy);
		});
	});
}

