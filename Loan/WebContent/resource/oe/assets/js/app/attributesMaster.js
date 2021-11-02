var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	$(".layout-main button").each(function() {
		var value = '#'+this.id;
		var value2 = '#'+this.id+'C';
		var value3 = '#'+this.id+'S';
		var val = $(value).text();
		val = val.trim();
		if( val.startsWith( "search") || val.startsWith("Search")){
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

//loadPermission();

$("#setDetS").hide();
$("#screwDetS").hide();
$("#hookDetS").hide();
$("#loopDetS").hide();
$("#polishDetS").hide();
$("#metalColorDetS").hide();
$("#metalPurityDetS").hide();
$("#shapeTypeDetS").hide();
$("#stoneColTypeDetS").hide();
$("#stoneCombinationDetS").hide();
$("#stoneActualColDetS").hide();
$("#clarityDetS").hide();
$("#stoneRateDetS").hide();
$("#stoneWeightRangeDetS").hide();
$("#cutGradeDetS").hide();
$("#attrList").on('change',function(){
	var id =$("#attrList").val();
	if(id=="Setting"){
		$("#setDetS").show();
		$("#attMasters").hide();
		$("#head").hide();
		
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
	if(id=="Screw"){	
		$("#screwDetS").show();
		$("#attMasters").hide();
		$("#head").hide();
		
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
	if(id=="Hook"){
		$("#hookDetS").show();	
		$("#attMasters").hide();
		$("#head").hide();	
		
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
	if(id=="Loop"){
		$("#attMasters").hide();
		$("#head").hide();
		$("#loopDetS").show();
		
		
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
	if(id=="Polish"){
		$("#attMasters").hide();
		$("#head").hide();
		$("#polishDetS").show();
		
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
	if(id=="MetalColour"){
		$("#attMasters").hide();
		$("#head").hide();
		$("#metalColorDetS").show();
			
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
	if(id=="Purity"){
		$("#attMasters").hide();
		$("#head").hide();
		$("#metalPurityDetS").show();
			
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
	if(id=="Shape"){
			$("#shapeTypeDetS").show();
			$("#attMasters").hide();
			$("#head").hide();
				
			$("#jqxgrid").hide();
			$("#jqxgrid").jqxGrid('clear');
		}
	if(id=="StoneColour"){
		$("#stoneColTypeDetS").show();
		$("#attMasters").hide();
		$("#head").hide();
			
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
	if(id=="StoneCombination"){
		$("#stoneCombinationDetS").show();
		$("#attMasters").hide();
		$("#head").hide();
			
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
	if(id=="StoneActCol"){
		$("#stoneActualColDetS").show();
		$("#attMasters").hide();
		$("#head").hide();
			
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
	if(id=="Clarity"){
		$("#clarityDetS").show();
		$("#attMasters").hide();
		$("#head").hide();
			
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
	if(id=="StoneRate"){
		$("#stoneRateDetS").show();
		$("#attMasters").hide();
		$("#head").hide();
			
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
	if(id=="WeightRange"){
		$("#stoneWeightRangeDetS").show();
		$("#attMasters").hide();
		$("#head").hide();
			
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}	
	if(id=="CutGrade"){
		$("#cutGradeDetS").show();
		$("#attMasters").hide();
		$("#head").hide();
			
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
})




//###################################################### GO BACK Button ###################################

$("#goback").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"
});

$("#gobackS").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
});

$("#gobackH").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
});

$("#gobackL").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
});

$("#gobackP").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
});

$("#gobackMC").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
});


$("#gobackMP").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
});

$("#gobackSH").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
});

$("#gobackSC").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
});

$("#gobackCM").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
})

$("#gobackA").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
})

$("#gobackT").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
});

$("#gobackR").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
});

$("#gobackW").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
});

$("#gobackG").on('click', function(){
	window.location.href="javascript:showContentPage('attributesMaster', 'bodySwitcher')"	
});

//############## SETTING CREATE #############
var validateSetType = function() {
	var setLines = [];
	var rows = $('#jqxgridS').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		setLines.push({
			"name" : row.descriptionC	
			});
		}
	return setLines;
}

$('#creatSet').on("click",function(){
	SetModalGrid();	
	$("#jqxgridS").show();
})


//Create Setting
$('#saveSetting').on('click', function(){
	trimmer();
	
	var descriptionC = $("#descriptionC").val();
		if(descriptionC == null || descriptionC == ""){
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
	var setLines = [];	
	var setLines = validateSetType();
		if (setLines) {
		postJSON('/OrderExecution/api/v1/createSettingType',JSON.stringify(setLines),function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#createSetting').modal('hide');
				settingTypeGrid();
				$("#jqxgrid").show();
			}else {
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


//Generate Row for Setting
var rowId = 0;
var generaterowS = function(i) {
	var row = {};
	row["descriptionC"] = $("#descriptionC").val();		
	rowId = rowId + 1;
	return row;
}

$('#addRowD').on('click', function(){	
 var descriptionC = $("#descriptionC").val();
 	if(descriptionC == null || descriptionC == "" ){
 		$.growl.error({
			message : "please fill mandatory fields!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{		
	$("#jqxgridS").jqxGrid('addrow', null, generaterowS(rowId + 1));
    }
});

// ################# create grid for segment ##################
var SetModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
  }
	var datafields = [ {
		'name' :'descriptionC',
		'type' :'string'
	}];
	var columns = [ {
		'text'  :'Desription',
		'datafield':  'descriptionC',
		'width' : '90%',
		cellsalign : 'center',
		align:'center',
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
	$("#jqxgridS").jqxGrid({
		width : '100%',
		rowsheight : 35,		
	});	
}

//############# Setting Type Field Filters #####################
var settingFieldFilters = function() {
	var setId = parseInt($('#setId').val());
		fieldFilters = {};
	return fieldFilters;
}

//############### Search Grid ############################
function settingTypeGrid() {
	var updateRows = function(rowid, newdata, commit) {	
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map' : 'settingTypeId'
	}, {
		'name' : 'desc',
		'type' : 'string',
		'map' :  'name'
	}, {
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'settingTypeId'
	}];
	var columns = [ {
		'text' : ' Id',
		'datafield' : 'id',
		'width' : '48.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Description',
		'datafield' : 'desc',
		'width' : '49%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	},{
		text : '',
		datafield : 'actionId',
		cellsrenderer : settingEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '2.5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchSettingType", "list",columns, settingFieldFilters(), updateRows, "");
}

$("#settingSearch").on('click', function() {
	settingTypeGrid();
	$("#jqxgrid").show();  
});

$("#clearSetting").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});


//############### Setting Edit Started ########################3
var settingEdit = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button class="btn btn-sm btn-primary" disabled type="button" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
		return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditSetting"  type="button" id='
			+ row
			+ ' onclick="editSetting('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></a>';
	}
}

//############ Edit Setting Type #################

var editSetting = function(id) {
	$('#popupheaderlabel').text('Edit Setting Type');
	$.getJSON('/OrderExecution/api/v1/getSettingTypeById?settingtypeId=' + id, function(data) {
		var selectedRowData = data.payload.setting;
		
		$("#setIdE").val(selectedRowData.settingTypeId);
		$("#setDescE").val(selectedRowData.name);			
    	$("#setCreatedByE").val(selectedRowData.createdBy);
		$("#setCreatedOnE").val(selectedRowData.createdDate);
		$("#setUpdatedByE").val(selectedRowData.lastChangedBy);
		$("#setUpdatedOnE").val(selectedRowData.lastChangedDate);
	});
	
}


var updateSetting = function() {
	var updateSet = {
		"settingTypeId" : $("#setIdE").val(),
		"name" : $("#setDescE").val()
	  }
	return updateSet;
};

//Update and save Setting
$('#settingE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "setDescE": { required: true }    
    },
    submitHandler: function (form) { 
    	var updateSetS = updateSetting();
			if (updateSetS) {postJSON('/OrderExecution/api/v1/updateSettingType',JSON.stringify(updateSetS), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#btnEditSetting').modal('hide');
					$('#createSetting').on('hidden.bs.modal',function() {
						$(this).find('form').trigger('reset');
				});
				settingTypeGrid();
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
				}
				$('#btnEditSetting').modal('hide');
			});
		}
   }  
    
});  

//################# Screw Type Started ################################ 

var validateScrewType = function() {
	var screwTypeLines = [];
	var rows = $('#jqxgridD').jqxGrid('getrows');
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			screwTypeLines.push({
				"name" : row.screwDescC,
				"segment" : {
					"metalSegmentId" : parseInt(row.id)
				}	
			});
		}
		return screwTypeLines;
	}


$('#creatScrewType').on("click",function(){
	screwModalGrid();	
	$("#jqxgridD").show();
	$('#segmIdSTObj').multiselect("clearSelection");
})


//Create Screw
$('#saveScrew').on('click', function(){	
	trimmer();
	var screwDescC = $("#screwDescC").val();
	var segemtnST = $("#segmIdSTObj").val();
	
		if(screwDescC == null || screwDescC == "" || segemtnST == null || segemtnST == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	
		var rows = $('#jqxgridD').jqxGrid('getrows');

		if(rows.length == 0){
			$.growl.error({
				message : "Grid fields are mandatory!!",
				duration : 10000
			});
		return false;
	}
	var screwTypeLines = [];
	
	var screwTypeLines = validateScrewType();
     
		if (screwTypeLines) {
			postJSON('/OrderExecution/api/v1/createScrewType',JSON.stringify(screwTypeLines),function(data) {
				if (data.resCode == "1") {										
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#createScrewTypeM').modal('hide');
					screwSearchGrid();
					$("#jqxgrid").show(); 
				} 		
				else{
					$.growl.error({
						message : data.mesgStr,
						duration : 10000,
						title : 'Error'
					});
				}
      });
	     }else{
	    	 $.growl.error({
	    		 message : "Please fill the compolsary field!!",
	    		 duration : 10000
			});
	      }	
       });

var generaterowST = function(i,screwDescC, segmIdTextArr) {
	var row = {};
	row["screwDescC"] = screwDescC;
	row["id"] =  segmIdTextArr.id
	row["segemtnST"] =  segmIdTextArr.label;
	return row;
} 

$('#addRowS').on('click', function(){
	var screwDescC = $("#screwDescC").val();
	var screwSegC = $("#segmIdSTObj").val();
	 
		if(screwDescC == null || screwDescC == "" || screwSegC == null || screwSegC == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
		});
		return false;
	}
	
	var segmIdTextArr = [];
	$("#segmIdSTObj option:selected").each(function() {
		segmIdTextArr.push({"id" : this.value, "label" : this.text}); 
	});
	
	for(var i=0; i<segmIdTextArr.length; i++){
		var datarow = generaterowST(i + 1,screwDescC, segmIdTextArr[i]);
		$("#jqxgridD").jqxGrid('addrow', null, datarow); 
	}
});

// ################# create grid for screw Type ##################
var screwModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}	
	var datafields = [ {
		'name' :'screwDescC',
		'type' :'string'
	}, {
		'name' :'segemtnST',
		'type' :'string'
	},{
		'name' :'id',
		'type' :'long'
	}];
	var columns = [ {
		'text'  :'Screw Description',
		'datafield':  'screwDescC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Segment ID',
		'datafield' : 'segemtnST',
		'width'  :'45%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
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
			id = $("#jqxgridD").jqxGrid('getrowid', row);
			$("#jqxgridD").jqxGrid('deleterow', id);		
		}	
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridD');
	$("#jqxgridD").jqxGrid({
		width : '100%',
		rowsheight : 35,
		
	});
	
}

//########## edit screw type Started#############
var screwTypeEdit = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button class="btn btn-sm btn-primary" disabled type="button" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditScrew"  type="button" id='
			+ row
			+ ' onclick="editScrew('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></a>';
	}
}

//############ Edit Screw Type #################
var scrwSegIdE ={};
var editScrew = function(id) {
	$('#popupheaderlabelS').text('Edit Screw Type');
	$.getJSON('/OrderExecution/api/v1/getScrewTypeById?id=' + id, function(data) {
		var selectedRowData = data.payload.screwtype;
		scrwSegIdE.number = selectedRowData.segment.metalSegmentId; 
			$("#screwIdE").val(selectedRowData.screwTypeId);
			$("#screwDescE").val(selectedRowData.name);		
			$("#segIdE").val(selectedRowData.segment.description);
	    	$("#screwCreatedByE").val(selectedRowData.cretedBy);
			$("#screwCreatedOnE").val(selectedRowData.createdOn);
			$("#scrwUpdatedByE").val(selectedRowData.lastChangedBy);
			$("#scrwUpdatedOnE").val(selectedRowData.lastChangedOn);
		});
	}

var updateScrew = function() {
	var updateScrewE = {
		"screwTypeId" : $("#screwIdE").val(),
		"name" : $("#screwDescE").val(),
		"segment" : {
			"metalSegmentId" : scrwSegIdE.number		
		}
	}
	return updateScrewE;	
};

//Update and save screw
$('#screwE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "screwDescE": { required: true }     
    },
    submitHandler: function (form) { 
    	var updateScrewS = updateScrew();
			if (updateScrewS) {postJSON('/OrderExecution/api/v1/updateScrewType',JSON.stringify(updateScrewS), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#btnEditScrew').modal('hide');
					$('#createScrewTypeM').on('hidden.bs.modal',function() {
						$(this).find('form').trigger('reset');
					});
					screwSearchGrid();
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
				}
				$('#btnEditScrew').modal('hide');
			});
		}
    }  
});  


var screwTypeFieldFilters = function() {
	var screwSegS = $("#screwSegS").val();
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (screwSegS != "" && screwSegS != null) {
		fieldFilters.fieldFilters["segment"] = screwSegS;
	}	
	return fieldFilters;
 }

function screwSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map' : 'screwTypeId'
	}, {
		'name' : 'name',
		'type' : 'string'
	},{
		'name' : 'segment',
		'type' : 'string',
		'map' :  'segment>description'
	}, {
		'name' : 'actionIdE',
		'type' : 'int',
		'map' : 'screwTypeId'
	}];
	var columns = [ {
		'text' : 'Screw Type Id',
		'datafield' : 'id',
		'width' : '17.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Description',
		'datafield' : 'name',
		'width' : '40%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '40%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : '',
		datafield : 'actionIdE',
		cellsrenderer : screwTypeEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '2.5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchScrewType", "list",columns, screwTypeFieldFilters(), updateRows, "");
}

$("#screwSearch").on('click', function() {
	screwSearchGrid();
	$("#jqxgrid").show();
});

$("#clearScrew").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();	
});

//############# Hook Type Started ################

var hookTypeFieldFilters = function() {
	var hookSegS = $("#hookSegS").val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};	
	if (hookSegS != "" && hookSegS != null) {
		fieldFilters.fieldFilters["segment"] = hookSegS;
	}
	return fieldFilters;
}

$('#creatHookC').on("click",function(){
	hookTypeModalGrid();	
	$("#jqxgridH").show();
	$('#segmIdHTObj').multiselect("clearSelection");
})


//############# Create grid for Hook Type #######################
var hookTypeModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
}	
	var datafields = [ {
		'name' :'hookDescC',
		'type' :'string'
	}, {
		'name' :'segmIdHT',
		'type' :'string'
			
	},{ 'name' :'id',
	    'type' :'long'   	
}];
	var columns = [ {
		'text'  :'Description',
		'datafield':  'hookDescC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Segment ID',
		'datafield' : 'segmIdHT',
		'width'  :'45%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
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
			id = $("#jqxgridH").jqxGrid('getrowid', row);
			$("#jqxgridH").jqxGrid('deleterow', id);		
		}	
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridH');
	$("#jqxgridH").jqxGrid({
		width : '100%',
		rowsheight : 35,
	});
}

var generaterowH = function(i,hookDescC, segIdTextArr) {
	var row = {};
	row["hookDescC"] = hookDescC;
	row["id"] =  segIdTextArr.id
	row["segmIdHT"] =  segIdTextArr.label;
	return row;
} 


$('#addRowH').on('click', function(){
	var hookDescC = $("#hookDescC").val();
	var htSeg = $("#segmIdHTObj").val();	
		if(hookDescC == null || hookDescC == "" || htSeg == null || htSeg == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	var segIdTextArr = [];
	$("#segmIdHTObj option:selected").each(function() {
		segIdTextArr.push({"id" : this.value, "label" : this.text}); 
	});
	for(var i=0; i<segIdTextArr.length; i++){
		var datarow = generaterowH(i + 1,hookDescC, segIdTextArr[i]);
		$("#jqxgridH").jqxGrid('addrow', null, datarow); 
	}	
});


var validateHookType = function() {
	var hookTypeLines = [];
	var rows = $('#jqxgridH').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		hookTypeLines.push({
			"name" : row.hookDescC,
			"segment" : {
				"metalSegmentId" : row.id
			}		
		});
	}
	return hookTypeLines;
  }


//Create Hook Type
$('#saveHook').on('click', function(){	
	trimmer();
	var hookDescC = $("#hookDescC").val();
	var segHTC = $("#segmIdHTObj").val();
	
	if(hookDescC == null || hookDescC == "" || segHTC == null || segHTC == ""){
		$.growl.error({
			message : "please fill mandatory fields!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	
	var rows = $('#jqxgridH').jqxGrid('getrows');
		if(rows.length == 0){
			$.growl.error({
				message : "Grid fields are mandatory!!",
				duration : 10000
			});
		return false;
	}
	var hookTypeLines = [];
	
	var hookTypeLinesC = validateHookType();
		if (hookTypeLinesC) {
			postJSON('/OrderExecution/api/v1/createHookType',JSON.stringify(hookTypeLinesC),function(data) {
				if (data.resCode == "1") {										
					$.growl.notice({
						message : data.mesgStr + " " + "Successfully",
						duration : 10000,
						title : 'Success'
					});
					$('#createHookTypeM').modal('hide');
					hookTypeSearchGrid();
					$("#jqxgrid").show(); 
				} 		
				else {
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


function hookTypeSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map'  :'hookTypeId'
	}, {
		'name' : 'name',
		'type' : 'string',
		'map' : 'name',
		
	},{
		'name' : 'segment',
		'type' : 'string',
		'map' :  'segment>description'
	}, {
		'name' : 'actionIdH',
		'type' : 'int',
		'map' : 'hookTypeId'
	},{
		'name' : 'hookTypeId',
		'type' : 'int',
		//'map' : 'hookTypeId'
	}
	];
	var columns = [ {
		'text' : 'Hook Type Id',
		'datafield' : 'id',
		'width' : '17%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Description',
		'datafield' : 'name',
		'width' : '37%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '41%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : '',
		datafield : 'actionIdH',
		cellsrenderer : hookTypeEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '2.5%'
	},{
		text : '',
		datafield : 'hookTypeId',
		cellsrenderer : hookTypeDelete,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '2.5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchHookType", "list",columns, hookTypeFieldFilters(), updateRows, "");
}

$("#hookSearch").on('click', function() {
	hookTypeSearchGrid();
	$("#jqxgrid").show();
	
});

//############# Hook Type Edit Started ############################## 

var hookTypeEdit =  function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button class="btn btn-sm btn-primary" disabled type="button" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
		return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditHookType" type="button" id=' 
		+ row
		+ ' onclick="editHookType('
		+ value
		+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}
	
}

var hookTypeDelete =  function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canDelete == false){
		return '<button class="btn btn-sm btn-danger" disabled type="button")" ><i class="fa fa-trash fa-1"></i> </button>'
	}else{
		return '<button class="btn btn-sm btn-danger"  type="button" id='	+ row	+ ' onclick="deleteHookType('+ value+ ')" ><i class="fa fa-trash fa-1"></i> </button>';
	}
	
}



var editHookType = function(id) {
	$('#popupheaderlabelHT').text('Edit Hook Type');	
	$.getJSON('/OrderExecution/api/v1/getHookTypeById?id=' + id, function(data) {
		var selectedRowData = data.payload.hookType;
		   
			$("#hooktypeIdE").val(selectedRowData.hookTypeId);
			$("#hookDescE").val(selectedRowData.name);	
			$("#segmIdHTE").val(selectedRowData.segment.metalSegmentId);
	    	$("#htCreatedByE").val(selectedRowData.createdBy);
			$("#htCreatedOnE").val(selectedRowData.createdOn);
			$("#htChangedByE").val(selectedRowData.lastChangedBy);
			$("#htChangedOnE").val(selectedRowData.lastChangedDate);
	});
}

var updateHookType = function() {
	var updatehookTypeE = {
		"hookTypeId" : $("#hooktypeIdE").val(),
		"name" : $("#hookDescE").val(),
		"segment" : {
			"metalSegmentId" : $("#segmIdHTE").val()	
		}
	}
	return updatehookTypeE;	
};

$("#editHookTypE").on('click',function(){
	var hDescE = $("#hookDescE").val();
	var hSegIdE = $("#segmIdHTE").val(); 
	if(hDescE == "" || hDescE == null || hSegIdE == "" || hSegIdE ==null){
		$.growl.error({
			message :"Please Fill Mandatory Fields !!",
			duration : 10000,
			title :'Error'
		});
		return false;
	}
});

//Update and save hook
$('#hookTypeE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "hookDescE": { required : true },
        "segmIdHTE" : {required : true}
     },
    submitHandler: function (form) { 
    	var updateHTE = updateHookType();
			if (updateHTE) {postJSON('/OrderExecution/api/v1/updateHookType',JSON.stringify(updateHTE), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#btnEditHookType').modal('hide');
					$('#createHookTypeM').on('hidden.bs.modal',function() {
					$(this).find('form').trigger('reset');
					});
					hookTypeSearchGrid();
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
				}
				$('#btnEditHookType').modal('hide');
			});
		}
    }  
}); 

//############### Hook Type Delete Functionality #################


function deleteHookType(id) {
	$('#modalConfirmDel').modal('show'); 	
	$("#btnYes").on('click', function(){
		$.getJSON("/OrderExecution/api/v1/deleteHookType?id=" + id,function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				hookTypeSearchGrid();
			} else {
			  $.growl.error({
					message : data.mesgStr,
					duration : 10000
			});
		  }
			$('#btnEditHookType').modal('hide');
			$('#modalConfirmDel').modal('hide');
			
	  });
	});

}

$("#clearHook").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//############## Loop Type Started #######################
var loopTypeFieldFilters = function() {
	var loopSegS = $('#loopSegS').val();	
	fieldFilters = {
			"fieldFilters" : {}
		};
		if (loopSegS != "" && loopSegS != null) {
		fieldFilters.fieldFilters["segment"] = loopSegS;
		}
		return fieldFilters;
	}

$('#creatLoopC').on("click",function(){
	loopTypeModalGrid();	
	$("#jqxgridL").show();
	$('#segmIdLTObj').multiselect("clearSelection");
})

var generaterowL = function(i,loopDescC, ltSegIdTextArr) {
	var row = {};
	row["loopDescC"] = loopDescC;
	row["id"] =  ltSegIdTextArr.id
	row["segmIdL"] =  ltSegIdTextArr.label;
	return row;
} 


$('#addRowL').on('click', function(){
	var loopDescC = $("#loopDescC").val();
	var ltSeg = $("#segmIdLTObj").val();
	
		if(loopDescC == null || loopDescC == "" || ltSeg == null || ltSeg == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	
	var ltSegIdTextArr = [];
	$("#segmIdLTObj option:selected").each(function() {
		ltSegIdTextArr.push({"id" : this.value, "label" : this.text}); 
	});
	
	for(var i=0; i<ltSegIdTextArr.length; i++){
		var datarow = generaterowL(i + 1,loopDescC, ltSegIdTextArr[i]);
		$("#jqxgridL").jqxGrid('addrow', null, datarow); 
	}
	
});


var validateLoopType = function() {
	var loopTypeLines = [];
	var rows = $('#jqxgridL').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		loopTypeLines.push({
		"name" : row.loopDescC,
		"segment" : {
			"metalSegmentId" : row.id
		 }		
	 });
   }
  return loopTypeLines;
}

//Create Loop Type
$('#saveLoop').on('click', function(){	
	trimmer();
	var loopDescC = $("#loopDescC").val();
	var segLTC = $("#segmIdLTObj").val();
	
		if(loopDescC == null || loopDescC == "" || segLTC == null || segLTC == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	
	var rows = $('#jqxgridL').jqxGrid('getrows');
		if(rows.length == 0){
			$.growl.error({
				message : "Grid fields are mandatory!!",
				duration : 10000
			});
		return false;
	}
	var loopTypeLines = [];
	
	var loopTypeLinesC = validateLoopType();
	if (loopTypeLinesC) {
	postJSON('/OrderExecution/api/v1/createLooptype',JSON.stringify(loopTypeLinesC),function(data) {
		if (data.resCode == "1") {										
			 $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			 $('#createLoopTypeM').modal('hide'); 
			 loopTypeSearchGrid();
			 $("#jqxgrid").show();
		} 	
		else {
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

var loopTypeModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}	
	var datafields = [ {
		'name' :'loopDescC',
		'type' :'string'
	}, {
		'name' :'segmIdL',
		'type' :'string'
	},{  
		'name' :'id',
		'type' :'long'
	}];
	var columns = [ {
		'text'  :'Description',
		'datafield':  'loopDescC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Segment ID',
		'datafield' : 'segmIdL',
		'width'  :'45%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
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
			id = $("#jqxgridL").jqxGrid('getrowid', row);
			$("#jqxgridL").jqxGrid('deleterow', id);		
		}
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];

	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridL');
	$("#jqxgridL").jqxGrid({
		width : '100%',
		rowsheight : 35,	
	});	
}


function loopTypeSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map' : 'loopTypeId'
	}, {
		'name' : 'name',
		'type' : 'string'
	},{
		'name' : 'segment',
		'type' : 'string',
		'map' :  'segment>description'
	}, {
		'name' : 'actionIdL',
		'type' : 'int',
		'map' : 'loopTypeId'
	}];
	var columns = [ {
		'text' : 'Loop Type Id',
		'datafield' : 'id',
		'width' : '17.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Description',
		'datafield' : 'name',
		'width' : '40%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '37.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : '',
		datafield : 'actionIdL',
		cellsrenderer : loopTypeEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchloopType", "list",columns, loopTypeFieldFilters(), updateRows, "");
}

$("#loopSearch").on('click', function() {
	loopTypeSearchGrid();
	$("#jqxgrid").show();
	
});

//############# Loop Type Edit Started ############################## 

var loopTypeEdit =  function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	if(permission.canEdit == false){
		val += '<button class="btn btn-sm btn-primary" disabled type="button" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditLoopType" type="button" id='+ row + ' onclick="editLoopType('+ value+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';		
	}
	if(permission.canDelete == false){
		val += '<button class="btn btn-sm btn-danger"  type="button"  disabled><i class="fa fa-trash fa-1"></i> </button>';		
	}else{
		val += '<button class="btn btn-sm btn-danger"  type="button" id='+ row	+ ' onclick="deleteLoopType('+ value+ ')" ><i class="fa fa-trash fa-1"></i> </button>';		
	}
	return val;
}


var editLoopType = function(id) {
	$('#popupheaderlabelLT').text('Edit Loop Type');
	$.getJSON('/OrderExecution/api/v1/getLoopTypeById?id=' + id, function(data) {
		var selectedRowData = data.payload.LoopType;
	    
			$("#looptypeIdE").val(selectedRowData.loopTypeId);
			$("#loopDescE").val(selectedRowData.name);	
			$("#segmIdLTE").val(selectedRowData.segment.metalSegmentId);
	    	$("#ltCreatedByE").val(selectedRowData.createdBy);
			$("#ltCreatedOnE").val(selectedRowData.createdOn);
			$("#ltChangedByE").val(selectedRowData.lastChangedBy);
			$("#ltChangedOnE").val(selectedRowData.lastChangedDate);
	 });
}

var updateloopType = function() {
	var updateloopTypeE = {
		"loopTypeId" : $("#looptypeIdE").val(),
		"name" : $("#loopDescE").val(),
		"segment" : {
			"metalSegmentId" : $("#segmIdLTE").val()	
		}
	}
	return updateloopTypeE;
};

$("#editLoopTypE").on('click',function(){
	var lDescE = $("#loopDescE").val();
	var lSegIdE = $("#segmIdLTE").val(); 
	if(lDescE == "" || lDescE == null || lSegIdE == "" || lSegIdE ==null){
		$.growl.error({
			message :"Please Fill Mandatory Fields !!",
			duration : 10000,
			title :'Error'
		});
		return false;
	}
});

// Update and save loop
$('#loopTypeE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "loopDescE": { required: true },
        "segmIdLTE": { required: true }
    },
    submitHandler: function (form) { 
    	var updateLTE = updateloopType();
    		if (updateLTE) {postJSON('/OrderExecution/api/v1/updateLoopType',JSON.stringify(updateLTE), function(data) {
    			if (data.resCode == "1") {
    				$.growl.notice({
    					message : data.mesgStr,
    					duration : 10000,
    					title : 'Success'
    				});
    				$('#btnEditLoopType').modal('hide');
    				$('#createLoopTypeM').on('hidden.bs.modal',function() {
    				$(this).find('form').trigger('reset');
    				});
    				loopTypeSearchGrid();
    			}else{
    				$.growl.error({
    					message : data.mesgStr,
    					duration : 10000
    				});
    			}
    			$('#btnEditLoopType').modal('hide');
    		});
    	}
     }  
}); 

//############### loop Type Delete Functionality #################
function deleteLoopType(id) {
	$('#modalConfirmDel').modal('show'); 	
	$("#btnYes").on('click', function(){
	$.getJSON("/OrderExecution/api/v1/deleteLoopTypeBYid?id=" + id,function(data) {
		if (data.resCode == "1") {
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			loopTypeSearchGrid();
		} else {
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
	  }
		$('#btnEditLoopType').modal('hide');
		$('#modalConfirmDel').modal('hide');
  });
	});
}


$("#clearLoop").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//################ Polish Type Started #######################
var polishTypeFieldFilters = function() {
	var polishSegS = $("#polishSegS").val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};
		if (polishSegS != "" && polishSegS != null) {
		fieldFilters.fieldFilters["segment"] = polishSegS;
		}
		return fieldFilters;
	}


$('#creatPolishC').on("click",function(){
	polishTypeModalGrid();	
	$("#jqxgridP").show();
	$('#segmIdPTObj').multiselect("clearSelection");
})


var polishTypeModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}	
	var datafields = [ {
		'name' :'polishDescC',
		'type' :'string'
	}, {
		'name' :'segmIdP',
		'type' :'string'
			
	}, { 'name' : 'id',
		 'type' : 'long'	
	}];
	
	var columns = [ {
		'text'  :'Description',
		'datafield':  'polishDescC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Segment ID',
		'datafield' : 'segmIdP',
		'width'  :'45%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
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
			id = $("#jqxgridP").jqxGrid('getrowid', row);
			$("#jqxgridP").jqxGrid('deleterow', id);		
		}
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridP');
	$("#jqxgridP").jqxGrid({
		width : '100%',
		rowsheight : 35,
		
	});
	
}

var generaterowP = function(i,polishDescC, segPIdTextArr) {
	var row = {};
	row["polishDescC"] = polishDescC;
	row["id"] =  segPIdTextArr.id
	row["segmIdP"] =  segPIdTextArr.label;
	return row;
} 


$('#addRowP').on('click', function(){
	var polishDescC = $("#polishDescC").val();
	var polishTypSeg = $("#segmIdPTObj").val();
		if(polishDescC == null || polishDescC == "" || polishTypSeg == null || polishTypSeg == ""){
			$.growl.error({
				message : "Please Fill Mandatory Fields!!",
				duration :1000,
				title : 'error'
			});
			return false;
		}
	var segPIdTextArr = [];
	$("#segmIdPTObj option:selected").each(function() {
		segPIdTextArr.push({"id" : this.value, "label" : this.text}); 
	});
	
	for(var i=0; i<segPIdTextArr.length; i++){
		var datarow = generaterowP(i + 1,polishDescC, segPIdTextArr[i]);
		$("#jqxgridP").jqxGrid('addrow', null, datarow); 
	}
	
});

var validatePolishType = function() {
	var polishTypeLines = [];
	var rows = $('#jqxgridP').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		polishTypeLines.push({
		"name" : row.polishDescC,
		"segment" : {
			"metalSegmentId" : row.id
		}			
	});
  }
	return polishTypeLines;
}

//Create Polish
$('#savePolish').on('click', function(){
	trimmer();
	var polishDescC = $("#polishDescC").val();
	var segemtnPT = $("#segmIdPTObj").val();
	
		if(polishDescC == null || polishDescC == "" || segemtnPT == null || segemtnPT == ""){
			$.growl.error({
				message : "Please Fill Mandatory Fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	
		var rows = $('#jqxgridP').jqxGrid('getrows');
			if(rows.length == 0){
				$.growl.error({
					message : "Grid fields are mandatory!!",
					duration : 10000
				});
		return false;
	}
	var polishTypeLines = [];
	
	var polishTypeLines = validatePolishType();
		if (polishTypeLines) {
		postJSON('/OrderExecution/api/v1/createPolishType',JSON.stringify(polishTypeLines),function(data) {
			if (data.resCode == "1") {										
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#createPolishTypeM').modal('hide'); 
				 polishTypeSearchGrid();
				 $("#jqxgrid").show();
			} else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}		
			
     });
	     } else {
	    	 $.growl.error({
				message : "Please fill the compolsary field!!",
				duration : 10000
			});
	      }	
       });


function polishTypeSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map' : 'polishTypeId'
	}, {
		'name' : 'name',
		'type' : 'string'
	},{
		'name' : 'segment',
		'type' : 'string',
		'map' :  'segment>description'
	}, {
		'name' : 'actionIdP',
		'type' : 'int',
		'map' : 'polishTypeId'
	}];
	var columns = [ {
		'text' : 'Polish Type Id',
		'datafield' : 'id',
		'width' : '17.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Description',
		'datafield' : 'name',
		'width' : '40%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '40%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : '',
		datafield : 'actionIdP',
		cellsrenderer : polishTypeEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '2.5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchPolishType", "list",columns, polishTypeFieldFilters(), updateRows, ""); 
}

$("#polishSearch").on('click', function() {
	polishTypeSearchGrid();
	$("#jqxgrid").show();
	
});

//################ Polish Type Edit Started ##################

var polishTypeEdit = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	if(permission.canEdit == false){
		return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditPolish" disabled  type="button" ><i class="fa fa-pencil fa-sm"></i></a>';
		
	}else{
		return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditPolish"  type="button" id='
			+ row	+ ' onclick="editPolish('+ value + ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></a>'
	}
}

var editPolish =function(id){
	$('#popupheaderlabelP').text('Edit Polish Type');

	$.getJSON('/OrderExecution/api/v1/getPolishTypeById?id=' + id, function(data) {
		var selectedRowData = data.payload.polishtype;
		
			$("#polishIdE").val(selectedRowData.polishTypeId);
			$("#polishDescE").val(selectedRowData.name);		
			$("#segmIdPE").val(selectedRowData.segment.segmentId);
	    	$("#polishCreatedByE").val(selectedRowData.cretedBy);
			$("#polishCreatedOnE").val(selectedRowData.createdOn);
			$("#polishUpdatedByE").val(selectedRowData.lastChangedBy);
			$("#polishUpdatedOnE").val(selectedRowData.lastChangedOn);
	});
	
}


var updatePolishType = function() {
	var updatePolish = {
		"polishTypeId" : $("#polishIdE").val(),
		"name" : $("#polishDescE").val(),
		"segment":{
			"metalSegmentId" : $("#segmIdPE").val()
		}
	}
	return updatePolish;
};

$("#editPolihType").on('click',function(){
	var pDescE = $("#polishDescE").val();
	var pSegIdE = $("#segmIdPE").val(); 
	if(pDescE == "" || pDescE == null || pSegIdE == "" || pSegIdE ==null){
		$.growl.error({
			message :"Please Fill Mandatory Fields !!",
			duration : 10000,
			title :'Error'
		});
		return false;
	}
});

//Update and save Polish Type
$('#polishE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "polishDescE": { required: true },
        "segmIdPE" :{required: true }
    },
    submitHandler: function (form) { 
    	var updatePolishS = updatePolishType();
			if (updatePolishS) { postJSON('/OrderExecution/api/v1/updatePolishType',JSON.stringify(updatePolishS), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#btnEditPolish').modal('hide');
					$('#createPolishTypeM').on('hidden.bs.modal',function() {
						$(this).find('form').trigger('reset');
					});
					polishTypeSearchGrid();
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
				}
				$('#btnEditPolish').modal('hide');
			});
		}
    }  
});  


$("#clearPolish").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//#################### Metal Color Type Started ################################
var metalColorFieldFilters = function() {
	var metalColSegS = $('#metalColSegS').val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (metalColSegS != "" && metalColSegS != null) {
		fieldFilters.fieldFilters["segment"] = metalColSegS;
	}
	return fieldFilters;
}

$('#creatMetalClr').on("click",function(){
	metalColorModalGrid();	
	$("#jqxgridMC").show();
	$('#segmIdMCObj').multiselect("clearSelection");
})

var metalColorModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}	
	var datafields = [ {
		'name' :'mColorDescC',
		'type' :'string'
	}, {
		'name' :'mColorSegId',
		'type' :'string'
	}];
	
	var columns = [ {
		'text'  :'Description',
		'datafield':  'mColorDescC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Segment ID',
		'datafield' : 'mColorSegId',
		'width'  :'45%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
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
			id = $("#jqxgridMC").jqxGrid('getrowid', row);
			$("#jqxgridMC").jqxGrid('deleterow', id);		
		}
		
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];

	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridMC');
	$("#jqxgridMC").jqxGrid({
		width : '100%',
		rowsheight : 35,
		
	});	
}


var generaterowMC = function(i,mColorDescC, mcSegIdTextArr) {
	var row = {};
	row["mColorDescC"] = mColorDescC;
	row["id"] =  mcSegIdTextArr.id
	row["mColorSegId"] =  mcSegIdTextArr.label;
	return row;
} 


$('#addRowMC').on('click', function(){
	var mColorDescC = $("#mColorDescC").val();
	var metalColSeg = $("#segmIdMCObj").val();	
		if(mColorDescC == null || mColorDescC == "" || metalColSeg == null || metalColSeg == ""){
			$.growl.error({
				message : "Please Fill Mandatory Fields!!",
				duration :1000,
				title : 'error'
			});
		return false;
	}
	
		var mcSegIdTextArr = [];
		$("#segmIdMCObj option:selected").each(function() {
		mcSegIdTextArr.push({"id" : this.value, "label" : this.text}); 
	});
	
	for(var i=0; i<mcSegIdTextArr.length; i++){
		var datarow = generaterowMC(i + 1,mColorDescC, mcSegIdTextArr[i]);
		$("#jqxgridMC").jqxGrid('addrow', null, datarow); 
	}
	
});

var validateMetalColor = function() {
	var metalColorLines = [];
	var rows = $('#jqxgridMC').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		metalColorLines.push({
		"name" : row.mColorDescC,
		"segment" : {
			"metalSegmentId" : row.id
		}	
	});
  }
	return metalColorLines;
}

//Create Metal Color
$('#saveMetalColor').on('click', function(){	
	trimmer();
	var mColorDescC = $("#mColorDescC").val();
	var segmntMc = $("#segmIdMCObj").val();	
		if(mColorDescC == null || mColorDescC == "" || segmntMc == null || segmntMc == ""){
			$.growl.error({
				message : "Please Fill Mandatory Fields!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	var rows = $('#jqxgridMC').jqxGrid('getrows');
	if(rows.length == 0){
		$.growl.error({
			message : "Grid fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	var metalColorLines = [];
	var metalColorLines = validateMetalColor();
    
	if (metalColorLines) {
	postJSON('/OrderExecution/api/v1/createMetalColor',JSON.stringify(metalColorLines),function(data) {
			if (data.resCode == "1") {										
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#createMetalColrTypeM').modal('hide'); 
				metalColorSearchGrid();
				$("#jqxgrid").show();
			} 		
		 else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
     });
	   } else {
		  $.growl.error({
			message : "Please fill the compolsary field!!",
			duration : 10000
		});
	  }	
  });



function metalColorSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map' : 'metalColorTypeId'
	}, {
		'name' : 'name',
		'type' : 'string'
	},{
		'name' : 'segment',
		'type' : 'string',
		'map' :  'segment>description'
	}, {
		'name' : 'actionIdMC',
		'type' : 'int',
		'map' : 'metalColorTypeId'
	}];
	var columns = [ {
		'text' : 'Metal Color Type Id',
		'datafield' : 'id',
		'width' : '17.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Description',
		'datafield' : 'name',
		'width' : '40%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '37.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : '',
		datafield : 'actionIdMC',
		cellsrenderer : metalColorEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchMetalColorType", "list",columns, metalColorFieldFilters(), updateRows, "");

}

$("#metalColorSearch").on('click', function() {
	metalColorSearchGrid();
	$("#jqxgrid").show();
	
});

//#############  Metal Color Edit Started ############################## 

var metalColorEdit =  function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	if(permission.canEdit == false){
		val += '<button class="btn btn-sm btn-primary"  type="button"  disabled><i class="fa fa-pencil fa-sm"></i> </button>';
			
	}else{
	 val += '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditMetalColor" type="button" id=' 
	+ row + ' onclick="editMetalColor('	+ value	+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';
	
	}

	if(permission.canDelete == false){
		val += '<button class="btn btn-sm btn-danger"  type="button"  disabled><i class="fa fa-trash fa-sm"></i> </button>';
		
	}else{
		val += '<button class="btn btn-sm btn-danger"  type="button" id=' 
			+ row + ' onclick="deleteMetalColor('+ value + ')" ><i class="fa fa-trash fa-1"></i> </button>';
	}
	return val;
}


var editMetalColor = function(id) {
	$('#popupheaderlabelMC').text('Edit Metal Color');
	$.getJSON('/OrderExecution/api/v1/getMetalColorTypeById?id=' + id, function(data) {
		var selectedRowData = data.payload.metalColorType;
	
			$("#mColorIdE").val(selectedRowData.metalColorTypeId);
			$("#mColDescE").val(selectedRowData.name);	
			$("#segmIdMCE").val(selectedRowData.segment.metalSegmentId);
	    	$("#mcCreatedByE").val(selectedRowData.createdBy);
			$("#mcCreatedOnE").val(selectedRowData.createdDate);
			$("#mcChangedByE").val(selectedRowData.lastChangedBy);
			$("#mcChangedOnE").val(selectedRowData.lastChangedDate);
	});
}

var updateMetalColor = function() {
	var updateMetalColE = {
		"metalColorTypeId" : $("#mColorIdE").val(),
		"name" : $("#mColDescE").val(),
		"segment" : {
			"metalSegmentId" : $("#segmIdMCE").val()	
		}
	}
	return updateMetalColE;
};

$("#editMetalColrE").on('click',function(){
	var mColDescE = $("#mColDescE").val();
	var segmIdMCE = $("#segmIdMCE").val();
		if(mColDescE == "" || mColDescE == null || segmIdMCE == "" || segmIdMCE == null ){
			$.growl.error({
				message :"Please Fill Mandatory Fields !!",
				duration : 10000,
				title :'Error'
		 });
		return false;
	}
});

//Update and save Metal Color
$('#metalColorE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "mColDescE": { required: true } ,
        "segmIdMCE" : { required : true}
    },
    submitHandler: function (form) { 
    	var updateMC = updateMetalColor();
			if (updateMC) {postJSON('/OrderExecution/api/v1/updateMetalColorType',JSON.stringify(updateMC), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#btnEditMetalColor').modal('hide');
					$('#createMetalColrTypeM').on('hidden.bs.modal',function() {
					$(this).find('form').trigger('reset');
			});
			metalColorSearchGrid();
			}else{
		    $.growl.error({
				message : data.mesgStr,
				duration : 10000
		  });
       }
		$('#btnEditMetalColor').modal('hide');
	 });
	}
   }  
}); 

//############### Metal Color Delete Functionality #################
function deleteMetalColor(id) {
	$('#modalConfirmDel').modal('show'); 	
	$("#btnYes").on('click', function(){
		$.getJSON("/OrderExecution/api/v1/deleteMetalColorType?id=" + id,function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
			metalColorSearchGrid();
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
			});
		  }
		 $('#btnEditMetalColor').modal('hide');
		 $('#modalConfirmDel').modal('hide');
	  });
	});
}

$("#clearMetalColor").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//################## Metal Purity Type Started ################
var purityOnloadLov = function(){
	//$.getJSON('/OrderExecution/api/v1/metalSegmentsLOV', function(data) {
	$.getJSON('/OrderExecution/api/v1/articleSegmentsLOV', function(data) {
		$('#puritySegS').empty().append('<option value="" selected>--Select--</option>');
		$('#metalTypeIdC').empty().append('<option value="" selected>--Select--</option>');
		$('#metalTypeIdE').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.segments, function(key, val) {
				$('#puritySegS').append('<option value="' + val.id + '">' + val.description + '</option>');
				$('#metalTypeIdC').append('<option value="' + val.id + '">' + val.description + '</option>');
				$('#metalTypeIdE').append('<option value="' + val.id + '">' + val.description + '</option>');
		 });
	});
} 
purityOnloadLov();

var metalPurityFieldFilters = function() {
	var puritySegS = $('#puritySegS').val();

	fieldFilters = {
			"fieldFilters" : {}
		};
	if (puritySegS != "" && puritySegS != null) {
		fieldFilters.fieldFilters["segment"] = puritySegS;
	}	
	
	return fieldFilters;
}

function validateNumber(val) {
	var regex = /^\d{0,2}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}

function validateNumberRate(val) {
	var regex = /^\d{0,9}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}

function validateNumberS(val) {
	var regex = /^\d{0,9}(\.\d{0,3})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(3);
	}
	return '';
}

$('#creatMetalPurity').on("click",function(){
	metalPurityModalGrid();	
	$("#jqxgridMP").show();
})

var metalPurityModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [{
		'name' :'descC',
		'type' :'long'
	}, {
		'name' :'dispOrdC',
		'type' :'long'
	}, {
		'name' :'meltingPurityC',
		'type' :'double'
	}, {
		'name' :'skinPurityC',
		'type' :'double'
	}, {
		'name' :'metalTypeIdC',
		'type' :'long'
	}];	
	var columns = [ {
		'text'  :'Description',
		'datafield':  'descC',
		'width' : '20%',
		cellsalign : 'center',
		align:'center',
		editable : false,
		sortable : true
	}, {
		'text'  :'Display Order',
		'datafield' : 'dispOrdC',
		'width'  :'20%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
	}, {
		'text'  :'Skin Purity',
		'datafield' : 'skinPurityC',
		'width'  :'15%',
		sortable  :false,
		cellsalign : 'right',
		align:'center',
		editable:  false
	}, {
		'text'  :'Melting Purity',
		'datafield' : 'meltingPurityC',
		'width'  :'15%',
		sortable  :false,
		cellsalign : 'right',
		align:'center',
		editable:  false
	},{
		'text'  :'Metal Type ID',
		'datafield' : 'metalTypeIdC',
		'width'  :'20%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
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
			id = $("#jqxgridMP").jqxGrid('getrowid', row);
			$("#jqxgridMP").jqxGrid('deleterow', id);		
		}		
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];

	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridMP');
	$("#jqxgridMP").jqxGrid({
		width : '100%',
		rowsheight : 40,		
	});	
}

var rowId = 0;
var generaterowMP = function(i) {
	var row = {};
	row["descC"] =  $("#descC").val();
	row["dispOrdC"] = $("#dispOrdC").val();
	row["meltingPurityC"] = $("#meltingPurityC").val();
	row["skinPurityC"] =  $("#skinPurityC").val();
	row["metalTypeIdC"] = $("#metalTypeIdC option:selected").text();
	rowId = rowId + 1;
	return row;
}

$('#metalPurityTypC').validate(
		{
		 errorElement : 'label',
		 errorClass : 'help-inline',
		 focusInvalid : false,
		 ignore : "",
		rules : {
			"dispOrdC" : {
				required : true,
				regx : /^[0-9]*$/,		
			},
			"meltingPurityC" : {
				required : true,
				regx : /[0-9]+(\.[0-9][0-9]?)?/,		
			},
			"skinPurityC" : {
				required : true,
				regx : /[0-9]+(\.[0-9][0-9]?)?/
			}
		},
		messages : {
			'dispOrdC' : {
				regx : "Only Numbers Are Allowed!"		
			},
			'meltingPurityC' : {
				regx : "Only Numbers Are Allowed!"		
			},
			'skinPurityC' : {
				regx : "Only Numbers Are Allowed!"
			}
		},
		submitHandler : function(form) {
			$("#jqxgridMP").jqxGrid('addrow', null, generaterowMP(rowId + 1));
		}
	});

$('#addRowMP').on('click', function(){
	var rows = $("#jqxgridMP").jqxGrid('getrows');
	var descC = $("#descC").val();
	var dispOrdC = $("#dispOrdC").val();
	var meltingPurityC = $("#meltingPurityC").val();
	var skinPurityC = $("#skinPurityC").val();
	var metalTypeIdC = $("#metalTypeIdC").val();
	
		if(descC == null || descC == "" || meltingPurityC == null || meltingPurityC == "" ||dispOrdC == null || dispOrdC == "" 
			|| skinPurityC == null || skinPurityC == "" || metalTypeIdC == null || metalTypeIdC == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		} 
		else{
		$("#jqxgridMP").jqxGrid('addrow', null, generaterowMP(rowId + 1));
		}
});

var validateMetaPurity = function() {
	var metalPurityLines = [];
	var rows = $('#jqxgridMP').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		metalPurityLines.push({
		"skinPurity" :row.skinPurityC,
		"meltingPurity" : row.meltingPurityC,
		"description" : row.descC,
		"displayOrder" : row.dispOrdC,
		"metalSegment" : {
			"metalSegmentId" :$('#metalTypeIdC').val()
		 }		
	 });
   }
  return metalPurityLines;
}

//Create Metal Purity
$('#saveMetalPurity').on('click', function(){	
	trimmer();
	var rows = $('#jqxgridMP').jqxGrid('getrows');
	if(rows.length == 0){
		$.growl.error({
			message : "Grid fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	var metalPurityLinesC = [];	
	var metalPurityLinesC = validateMetaPurity();
	if (metalPurityLinesC) {
	postJSON('/OrderExecution/api/v1/createMetalPurity',JSON.stringify(metalPurityLinesC),function(data) {
		if (data.resCode == "1") {										
			$.growl.notice({
				message : data.mesgStr + " "+ "Successfully",
				duration : 10000,
				title : 'Success'
			});
			$('#createMetalPurityM').modal('hide'); 			
			metalPuritySearchGrid();
			$("#jqxgrid").show();
		} 		
		else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
     });
	     } else {
		  $.growl.error({
				message : "Please fill the compolsary field!!",
				duration : 10000
				});
	        }	
        });


function metalPuritySearchGrid() {
	var updateRows = function(rowid, newdata, commit) {	
}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map'  :'metalPurityId'
	},{
		'name' : 'description',
		'type' : 'string',
		'map'  : 'description'
	},{
		'name' : 'dispOrd',
		'type' : 'long',
		'map'  : 'displayOrder'
	},{
		'name' : 'meltingPurity',
		'type' : 'double',
		'map'  : 'meltingPurity'
	},{
		'name' : 'skinPurity',
		'type' : 'double',
		'map'  : 'skinPurity'
	},{
		'name' : 'MetalTypeId',
		'type' : 'string',
		'map' : 'metalSegment>description'
	}, {
		'name' : 'actionIdMP',
		'type' : 'int',
		'map' : 'metalPurityId'
	}];
	var columns = [ {
		'text' : 'Id',
		'datafield' : 'id',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Description',
		'datafield' : 'description',
		'width' : '25%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Display Order',
		'datafield' : 'dispOrd',
		'width' : '15%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Skin Purity',
		'datafield' : 'skinPurity',
		'width' : '15%',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false,
		cellsformat : 'd2'
	}, {
		'text' : 'Melting Purity',
		'datafield' : 'meltingPurity',
		'width' : '15%',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false,
		cellsformat : 'd2'
	}, {
		'text' : 'Metal Type Id',
		'datafield' : 'MetalTypeId',
		'width' : '15%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : '',
		datafield : 'actionIdMP',
		cellsrenderer : metalPurityEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchMetalPurity", "list",columns, metalPurityFieldFilters(), updateRows, "");
}

$("#metalPuritySearch").on('click', function() {
	metalPuritySearchGrid();
	$("#jqxgrid").show();	
});

//############### Metal Purity Edit Started ########################

var metalPurityEdit =  function(row, column, value) {
	
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	if(permission.canEdit == false){
		val += '<button class="btn btn-sm btn-primary" disabled type="button"><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditMetalPurity" type="button" id=' 
			+ row
			+ ' onclick="editMetalPurity('
			+ value
			+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}
	
	if(permission.canDelete == false){
		val += '<button class="btn btn-sm btn-danger" disabled type="button"><i class="fa fa-trash fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-danger"  type="button" id=' 
			+ row
			+ ' onclick="deleteMetalPurity('
			+ value
			+ ')" ><i class="fa fa-trash fa-1"></i> </button>';
	}
	
	return val;
}

var editMetalPurity = function(id) {
	$('#popupheaderlabelMPurity').text('Edit Metal Purity');	
	$.getJSON('/OrderExecution/api/v1/getMetalPurityById?id=' + id, function(data) {
		var selectedRowData = data.payload.metalPurity;
		
			$("#purityIdE").val(selectedRowData.metalPurityId);
			$("#descE").val(selectedRowData.description);	
			$("#displayOrdE").val(selectedRowData.displayOrder);
			$("#metalTypeIdE").val(selectedRowData.metalSegment.metalSegmentId);
			$("#meltingPurityE").val(selectedRowData.meltingPurity);
			$("#skinPurityE").val(selectedRowData.skinPurity);
	  	    $("#purirtCreatedByE").val(selectedRowData.cretaedBy);
			$("#purityCreatedOnE").val(selectedRowData.createdDate);
			$("#purityChangedByE").val(selectedRowData.lastChangedBy);
			$("#purityChangedOnE").val(selectedRowData.lastChangedDate);
	});
}

var updateMetalPurity = function() {
	var updateMetalPurityE = {
		"metalPurityId" : $("#purityIdE").val(),
		"skinPurity" : $("#skinPurityE").val(),
		"meltingPurity" : $("#meltingPurityE").val(),
		"description" : $("#descE").val(),
		"displayOrder" : $("#displayOrdE").val(),
		"metalSegment" : {
			"metalSegmentId" : $("#metalTypeIdE").val()	
		}
	}
	return updateMetalPurityE;	
};

//Update and save Stone Color
$('#metalPurityE').validate({
  errorElement: 'label', 
  errorClass: 'help-inline', 
  focusInvalid: false, 
  ignore: "",
  rules: {      
	  "displayOrdE" : {
			required : true,
			regx : /^[0-9]*$/,		
		},
		"meltingPurityE" : {
			required : true,
			regx : /[0-9]+(\.[0-9][0-9]?)?/,		
		},
		"skinPurityE" : {
			required : true,
			regx : /[0-9]+(\.[0-9][0-9]?)?/
		}
  },
  messages : {
		'displayOrdE' : {
			regx : "Only Numbers Are Allowed!"		
		},
		'meltingPurityE' : {
			regx : "Only Numbers Are Allowed!"		
		},
		'skinPurityE' : {
			regx : "Only Numbers Are Allowed!"
		}
	},
  submitHandler: function (form) { 
  var updateMetalPurityE = updateMetalPurity();
		if (updateMetalPurityE) {postJSON('/OrderExecution/api/v1/updateMetalPurity',JSON.stringify(updateMetalPurityE), function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#btnEditMetalPurity').modal('hide');
				$('#createMetalPurityM').on('hidden.bs.modal',function() {
				$(this).find('form').trigger('reset');
			});
			metalPuritySearchGrid();
			}else{
		    $.growl.error({
				message : data.mesgStr,
				duration : 10000
		    });
		}
			$('#btnEditMetalPurity').modal('hide');
		});
	}
  }  
}); 

//############### Metal Purity Delete Functionality #################
function deleteMetalPurity(id) {
	$('#modalConfirmDel').modal('show'); 	
	$("#btnYes").on('click', function(){
		$.getJSON("/OrderExecution/api/v1/deleteMetalPurityId?id=" + id,function(data) {
			if (data.resCode == "1") {
			$.growl.notice({
				message : "Metal Purity Deleted Sucessfuly",
				duration : 10000,
				title : 'Success'
			});
			metalPuritySearchGrid();
			} else {
			  $.growl.error({
					message : data.mesgStr,
					duration : 10000
			});
		  }
		$('#btnEditMetalPurity').modal('hide');
		$('#modalConfirmDel').modal('hide');
		});
	});
}



$("#clearPurity").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//#################### Stone Color Type Started ################################
var stoneColorFieldFilters = function() {
	var stColCatS = $('#stColCatS').val();	
	fieldFilters = {
			"fieldFilters" : {}
		};
		if (stColCatS != "" && stColCatS != null) {
		fieldFilters.fieldFilters["category"] = stColCatS;
		}
	return fieldFilters;
}

$('#createStoneCol').on("click",function(){
	stoneColorModalGrid();	
	$("#jqxgridSC").show();
	$('#scCatIdObj').multiselect("clearSelection");
})


var stoneColorModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [{
		'name' :'sColorDescC',
		'type' :'string'
	}, {
		'name' :'catSC',
		'type' :'string'
	}, {
		'name' :'id',
		'type' : 'long'
	}];	
	var columns = [ {
		'text'  :'Description',
		'datafield':  'sColorDescC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Category',
		'datafield' : 'catSC',
		'width'  :'45%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
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
			id = $("#jqxgridSC").jqxGrid('getrowid', row);
			$("#jqxgridSC").jqxGrid('deleterow', id);		
		}	
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];

	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridSC');
	$("#jqxgridSC").jqxGrid({
		width : '100%',
		rowsheight : 35,	
	});
}

var generaterowSC = function(i,sColorDescC,scCatIdTextArr) {
	var row = {};
	row["sColorDescC"] = sColorDescC;
	row["id"] =  scCatIdTextArr.id
	row["catSC"] =  scCatIdTextArr.label;
	return row;
} 


$('#addRowSC').on('click', function(){
	var sColorDescC = $("#sColorDescC").val();
    var scCatC = $("#scCatIdObj").val();	
		if(sColorDescC == null || sColorDescC == "" || scCatC == null || scCatC == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	
	var scCatIdTextArr = [];
	$("#scCatIdObj option:selected").each(function() {
		scCatIdTextArr.push({"id" : this.value, "label" : this.text}); 
	});
	
	for(var i=0; i<scCatIdTextArr.length; i++){
		var datarow = generaterowSC(i + 1,sColorDescC,scCatIdTextArr[i]);
		$("#jqxgridSC").jqxGrid('addrow', null, datarow); 
	}
	
});

var validateStoneColors = function() {
	var stoneColorLines = [];
	var rows = $('#jqxgridSC').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		stoneColorLines.push({
		"name" : row.sColorDescC,
		"category" : {
			"id" : row.id
		 }		
	 });
   }
  return stoneColorLines;
}

//Create Stone Color
$('#saveStoneColor').on('click', function(){	
	trimmer();
	var sColorDescC = $("#sColorDescC").val();
	var categorySC = $("#scCatIdObj").val();
		if(sColorDescC == null || sColorDescC == "" || categorySC == null || categorySC == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	
	var rows = $('#jqxgridSC').jqxGrid('getrows');

	if(rows.length == 0){
		$.growl.error({
			message : "Grid fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	var stoneColorLines = [];
	var stColrLines = validateStoneColors();
	if (stColrLines) {
	postJSON('/OrderExecution/api/v1/createStoneColor',JSON.stringify(stColrLines),function(data) {
		if (data.resCode == "1") {										
			$.growl.notice({
				message : "StoneColor Created Successfully",
				duration : 10000,
				title : 'Success'
			});
			$('#createStoneColorM').modal('hide'); 
			stoneColorSearchGrid();
			$("#jqxgrid").show();
		} 		
		else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
     });
	    } else {
		  $.growl.error({
				message : "Please fill the compolsary field!!",
				duration : 10000
				});
	        }	
        });


function stoneColorSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {	
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map' :'stoneColorId'
	}, {
		'name' : 'name',
		'type' : 'string'
	},{
		'name' : 'category',
		'type' : 'string',
		'map' :  'category>description'
	}, {
		'name' : 'actionIdSC',
		'type' : 'int',
		'map' : 'stoneColorId'
	}];
	var columns = [ {
		'text' : 'Stone Color Type Id',
		'datafield' : 'id',
		'width' : '15%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Description',
		'datafield' : 'name',
		'width' : '40%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Category',
		'datafield' : 'category',
		'width' : '40%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : '',
		datafield : 'actionIdSC',
		cellsrenderer : stoneColrEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchStoneColor", "list",columns, stoneColorFieldFilters(), updateRows, "");
}

$("#stoneColSearch").on('click', function() {
	stoneColorSearchGrid();
	$("#jqxgrid").show();	
});


//############## Stone Color Edit Started ########################
var stoneColrEdit =  function(row, column, value) {
		
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	if(permission.canEdit == false){
		val += '<button class="btn btn-sm btn-primary" disabled type="button"><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditStoneColor" type="button" id=' 
			+ row
			+ ' onclick="editStoneCol('
			+ value
			+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}
	
	if(permission.canDelete == false){
		val += '<button class="btn btn-sm btn-danger" disabled type="button"><i class="fa fa-trash fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-danger"  type="button" id=' 
			+ row
			+ ' onclick="deleteStoneColor('
			+ value
			+ ')" ><i class="fa fa-trash fa-1"></i> </button>';
	}
	
	return val;
}

var editStoneCol = function(id) {
	$('#popupheaderlabelStC').text('Edit Stone Color');	
	$.getJSON('/OrderExecution/api/v1/getStoneColorById?id=' + id, function(data) {
		var selectedRowData = data.payload.stoneColor;
		var cat=selectedRowData.category.id;
	
			$("#stColorIdE").val(selectedRowData.stoneColorId);
			$("#stColDescE").val(selectedRowData.name);	
			$("#catStColE").val(cat);
	  	    $("#stCreatedByE").val(selectedRowData.createdBy);
			$("#stCreatedOnE").val(selectedRowData.createdDate);
			$("#stChangedByE").val(selectedRowData.lastChangedBy);
			$("#stChangedOnE").val(selectedRowData.lastChangeDate);
	});
}


var updateStoneColr = function() {
	var updateStoneColE = {
		"stoneColorId" : $("#stColorIdE").val(),
		"name" : $("#stColDescE").val(),
		"category" : {
			"id" : $("#catStColE").val()	
		}
	}
	return updateStoneColE;	
};

$("#editStoneColrE").on('click',function(){
	var stColDescE = $("#stColDescE").val();
	var catStColE = $("#catStColE").val();
		if(stColDescE == "" || stColDescE == null || catStColE == "" || catStColE == null ){
			$.growl.error({
				message :"Please Fill Mandatory Fields !!",
				duration : 10000,
				title :'Error'
		 });
		return false;
	}
});

//Update and save Stone Color
$('#stoneColorE').validate({
  errorElement: 'label', 
  errorClass: 'help-inline', 
  focusInvalid: false, 
  ignore: "",
  rules: {      
      "stColDescE": { required : true } ,
      "catStColE" :{ required : true}
  },
  submitHandler: function (form) { 
  var updateStColor = updateStoneColr();
		if (updateStColor) {postJSON('/OrderExecution/api/v1/updateStoneColor',JSON.stringify(updateStColor), function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#btnEditStoneColor').modal('hide');
				$('#createStoneColorM').on('hidden.bs.modal',function() {
				$(this).find('form').trigger('reset');
			});
			stoneColorSearchGrid();
			}else{
		    $.growl.error({
				message : data.mesgStr,
				duration : 10000
		    });
		}
			$('#btnEditStoneColor').modal('hide');
		});
	}
  }  
}); 

//############### Stone Color Delete Functionality #################
function deleteStoneColor(id) {
	$('#modalConfirmDel').modal('show'); 	
	$("#btnYes").on('click', function(){
		$.getJSON("/OrderExecution/api/v1/deleteStoneColorById?id=" + id,function(data) {
			if (data.resCode == "1") {
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			stoneColorSearchGrid();
			} else {
			  $.growl.error({
					message : data.mesgStr,
					duration : 10000
			});
		  }
			$('#btnEditStoneColor').modal('hide');
			$('#modalConfirmDel').modal('hide');
		});
	});
}


$("#clearStoneCol").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//################## Stone Combination Type Started ################
var stoneCombinationFieldFilters = function() {
	var stCombSegS = $('#stCombSegS').val();	
	fieldFilters = {
			"fieldFilters" : {}
		};
		if (stCombSegS != "" && stCombSegS != null) {
		fieldFilters.fieldFilters["stoneSegment"] = stCombSegS;
		}
	return fieldFilters;
}

$('#createStoneComb').on("click",function(){
	stoneCombGrid();	
	$("#jqxgridCM").show();
})


var rowId = 0;
var generaterowCM = function(i) {
	var row = {};
	row["combCodeC"] = $("#combCodeC").val();
	row["combDescC"] =  $("#combDescC").val();
	row["segSC"] =  $("#segSC option:selected").text();
	row["segSCId"] =  $("#segSC").val();
	rowId = rowId + 1;
	return row;
}

$('#addRowCM').on('click', function(){
	var rows = $("#jqxgridCM").jqxGrid('getrows');
	console.log(rows);
	var combCodeC = $("#combCodeC").val();
	var combDescC = $("#combDescC").val();
	var segSC = $("#segSC").val();
	
		if(combCodeC == null || combCodeC == "" || combDescC == null || combDescC == "" ||segSC == null || segSC == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
		 else{
			 var rows = $("#jqxgridCM").jqxGrid('getrows');
				console.log(rows);
				var rowData = [];
				for(var i=0; i<rows.length; i++){
					 var row = rows[i];
					if(row != " " ){
						console.log(row.segSC);
						if(row.combCodeC == combCodeC && row.segSCId ==  segSC ){
							$.growl.error({
								message : combCodeC +  " - Stone Combination Code already Exist",
								duration : 10000,
								title : 'Error'
							});
							return false;
						}	
					}
									
				}
			 $("#jqxgridCM").jqxGrid('addrow', null, generaterowCM(rowId + 1));
		 }
		
		/* else{
			 $("#jqxgridCM").jqxGrid('addrow', null, generaterowCM(rowId + 1));
		}*/
});

var stoneCombGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}	
	var datafields = [ {
		'name' :'combCodeC',
		'type' :'date'
	}, {
		'name' :'combDescC',
		'type' :'double'
	}, {
		'name' :'segSC',
		'type' :'double'
	},{ 
		'name' : 'id',
		'type' :'long'		
	}];
	var columns = [ {
		'text'  :'Combination Code',
		'datafield' : 'combCodeC',
		'width'  :'30%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
	}, {
		'text'  :'Combination Description',
		'datafield' : 'combDescC',
		'width'  :'30%',
		sortable  :true,
		cellsalign : 'center',
		align:'center',
		editable:  false
	}, {
		'text'  :'Segment ID',
		'datafield' : 'segSC',
		'width'  :'30%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
	},{
		'text'  :'Segment',
		'datafield' : 'segSCId',
		'width'  :'30%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false,
		hidden : true
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
			id = $("#jqxgridCM").jqxGrid('getrowid', row);
			$("#jqxgridCM").jqxGrid('deleterow', id);		
		}
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridCM');
	$("#jqxgridCM").jqxGrid({
		width : '100%',
		rowsheight : 40,		
	});	
 }

$('#stoneCombTypC').validate(
	{
	 errorElement : 'label',
	 errorClass : 'help-inline',
	 focusInvalid : false,
	 ignore : "",
	rules : {
		"combCodeC" : {
			required : true,
			regx : /^[A-Z]+$/,
			maxlength : 4
		}		
	},
	messages : {
		'combCodeC' : {
			regx : "Only capital letter allowed!",
			maxlength : "Code should be maximum of 4 character!"
		}				
	},
	submitHandler : function(form) {
		$("#jqxgridCM").jqxGrid('addrow', null, generaterowCM(rowId + 1));
	}
});

var validateStCombination = function() {
	var stCombnationLines = [];
	var rows = $('#jqxgridCM').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		console.log(row);
		stCombnationLines.push({
		"combinationCode" : row.combCodeC,
		"combDescription" :row.combDescC,
		"metalSegment" : {
			"metalSegmentId" : row.segSCId
			}		
	});
 }
return stCombnationLines;
}

//Create Stone Combination Type
$('#saveStoneComb').on('click', function(){	
	trimmer();
	var combCodeC = $("#combCodeC").val();
	var combDescC = $("#combDescC").val();
	var segSC = $("#segSC").val();

		if(combCodeC == null || combCodeC == "" || combDescC == null || combDescC == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	var rows = $('#jqxgridCM').jqxGrid('getrows');
	if(rows.length == 0){
		$.growl.error({
			message : "Grid fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	var stCombnationLines = [];
	var stCombnationLines = validateStCombination();
		if (stCombnationLines) {
		postJSON('/OrderExecution/api/v1/createStoneCombination',JSON.stringify(stCombnationLines),function(data) {
			if (data.resCode == "1") {
				$('#createStoneCombination').modal('hide');
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				stoneCombSearchGrid();
				$("#jqxgrid").show();
				
			} 		 
			else if (data.resCode == "3") {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Warning'
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


function stoneCombSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map' : 'stoneCombinationId'
	},{
		'name' : 'comCode',
		'type' : 'long',
		'map'  : 'combinationCode'
	},{
		'name' : 'comDesc',
		'type' : 'long',
		'map'  : 'combDescription'
	},{
		'name' : 'segId',
		'type' : 'long',
		'map' :'metalSegment>description'
	},{
		'name' : 'actionIdCM',
		'type' : 'int',
		'map' : 'stoneCombinationId'
	}];
	var columns = [ {
		'text' : 'Id',
		'datafield' : 'id',
		'width' : '15%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	},{
		'text' : 'Combination Code',
		'datafield' : 'comCode',
		'width' : '25%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Combination Description',
		'datafield' : 'comDesc',
		'width' : '30%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Segment ID',
		'datafield' : 'segId',
		'width' : '25%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : '',
		datafield : 'actionIdCM',
		cellsrenderer : stCombEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchStoneCombination", "list",columns, stoneCombinationFieldFilters(), updateRows, "");
}

$("#stoneComSearch").on('click', function() {
	stoneCombSearchGrid();
	$("#jqxgrid").show();
	
});

//############## Stone Combination Edit Started ########################
var stCombEdit =  function(row, column, value) {
	
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	if(permission.canEdit == false){
		val += '<button class="btn btn-sm btn-primary" disabled type="button"><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditStComb" type="button" id=' 
			+ row
			+ ' onclick="editStCombination('
			+ value
			+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}
	
	if(permission.canDelete == false){
		val += '<button class="btn btn-sm btn-danger" disabled type="button"><i class="fa fa-trash fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-danger"  type="button" id=' 
			+ row
			+ ' onclick="deleteStCombDetails('
			+ value
			+ ')" ><i class="fa fa-trash fa-1"></i> </button>';
	}
	
	return val;
}

//################################### Onlaod Api "metalAccountLocationLOV"  #####################################


var onLoadDropDown = function(){
	
	$('#hookSegS').empty().append('<option value="" selected>--Select--</option>');
	$('#screwSegS').empty().append('<option value="" selected>--Select--</option>');
	$('#segmIdHTE').empty().append('<option value="" selected>--Select--</option>');
	$('#loopSegS').empty().append('<option value="" selected>--Select--</option>');
	$('#segmIdLTE').empty().append('<option value="" selected>--Select--</option>');
	$('#segmIdPE').empty().append('<option value="" selected>--Select--</option>');
	$('#metalColSegS').empty().append('<option value="" selected>--Select--</option>');
	$('#segmIdMCE').empty().append('<option value="" selected>--Select--</option>');
	$('#segSC').empty().append('<option value="" selected>--Select--</option>');
	$('#stCombSegS').empty().append('<option value="" selected>--Select--</option>');
	
	$('#stColCatS').empty().append('<option value="" selected>--Select--</option>');
	$('#catStColE').empty().append('<option value="" selected>--Select--</option>');
	$('#stActColCatS').empty().append('<option value="" selected>--Select--</option>');
	$('#actColCatE').empty().append('<option value="" selected>--Select--</option>');
	$('#claCatIdE').empty().append('<option value="" selected>--Select--</option>');
	$('#clarityCatS').empty().append('<option value="" selected>--Select--</option>');
	$('#catIdSw').empty().append('<option value="" selected>--Select--</option>');
	
	$('#cgCategoryS').empty().append('<option value="" selected>--Select--</option>');
	$('#categIdE').empty().append('<option value="" selected>--Select--</option>');

	$.getJSON('/OrderExecution/api/v1/articleSegmentsLOV', function(data) {
					
	var slist = data.payload.segments;
			
		    $.each(slist, function(key, val) {
		         $('#segmIdMCE').append('<option value="' + val.id + '">' + val.description + '</option>');
				 $('#metalColSegS').append('<option value="' + val.id + '">' + val.description + '</option>');
				 $('#segmIdLTE').append('<option value="' + val.id + '">' + val.description + '</option>');
				 $('#loopSegS').append('<option value="' + val.id + '">' + val.description + '</option>');
				 $('#segmIdHTE').append('<option value="' + val.id + '">' + val.description + '</option>');
				 $('#screwSegS').append('<option value="' + val.id + '">' + val.description + '</option>');
				
				 $('#hookSegS').append('<option value="' + val.id + '">' + val.description + '</option>');
				 $('#segSC').append('<option value="' + val.id + '">' + val.description + '</option>');
				 $('#stCombSegS').append('<option value="' + val.id + '">' + val.description + '</option>');
	         });
			 			
	        var c1 = '<select id="segmIdSTObj" name="segmIdSTObj" class="form-control" multiple="multiple">';
			$.each(slist, function(key, val) {
					c1 += '<option value="' + val.id + '">' + val.description +'</option>'; });
					c1 += '</select>';
					$("#segemtnST").html(c1);
					$('#segmIdSTObj').multiselect({
					includeSelectAllOption : true,
					maxHeight : 250,
					enableFiltering : true,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
			      });
			
				var c2 = '<select id="segmIdHTObj" name="segmIdHTObj" class="form-control" multiple="multiple">';
					$.each(slist, function(key, val) {
					c2 += '<option value="' + val.id + '">' + val.description +'</option>'; });
					c2 += '</select>';
					$("#segmIdHT").html(c2);
					$('#segmIdHTObj').multiselect({
					includeSelectAllOption : true,
					maxHeight : 250,
					enableFiltering : true,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
					});
			   
			   var c4 = '<select id="segmIdLTObj" name="segmIdLTObj" class="form-control" multiple="multiple">';
					$.each(slist, function(key, val) {
					c4 += '<option value="' + val.id + '">' + val.description +'</option>'; });
					c4 += '</select>';
					$("#segmIdL").html(c4);
					$('#segmIdLTObj').multiselect({
					includeSelectAllOption : true,
					maxHeight : 250,
					enableFiltering : true,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
					});
			   		
		    
			  var cr = '<select id="segmIdMCObj" name="segmIdMCObj" class="form-control" multiple="multiple">';
					$.each(slist, function(key, val) {
					cr += '<option value="' + val.id + '">' + val.description +'</option>'; });
					cr += '</select>';
					$("#mColorSegId").html(cr);
					$('#segmIdMCObj').multiselect({
					includeSelectAllOption : true,
					maxHeight : 250,
					enableFiltering : true,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
					});
	    });
	
	$.getJSON('/OrderExecution/api/v1/stoneCategoryLOV', function(data) {
		
		 var clist = data.payload.Stonecategory;		
				     $.each(data.payload.Stonecategory, function(key, val) {
			         $('#stColCatS').append('<option value="' + val.id + '">' + val.description + '</option>');
					 $('#catStColE').append('<option value="' + val.id + '">' + val.description + '</option>');
					 $('#stActColCatS').append('<option value="' + val.id + '">' + val.description + '</option>');
					
					 $('#clarityCatS').append('<option value="' + val.id + '">' + val.description + '</option>');
					 $('#claCatIdE').append('<option value="' + val.id + '">' + val.description + '</option>');
					 $('#catIdSw').append('<option value="' + val.id + '">' + val.description +'</option>');
					
					 $('#cgCategoryS').append('<option value="' + val.id + '">' + val.description + '</option>');
					 $('#categIdE').append('<option value="' + val.id + '">' + val.description + '</option>');
		        });
				     
				    
				var c1 = '<select id="scCatIdObj" name="scCatIdObj" class="form-control" multiple="multiple">';
						$.each(clist, function(key, val) {
						c1 += '<option value="' + val.id + '">'+ val.name + '-' + val.description +'</option>'; });
						c1 += '</select>';
						$("#catSC").html(c1);
						$('#scCatIdObj').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						});
						
				 var c4 = '<select id="shapeCatObj" name="shapeCatObj" class="form-control" multiple="multiple">';
						$.each(clist, function(key, val) {
						c4 += '<option value="' + val.id + '">'+ val.name + '-' + val.description +'</option>'; });
						c4 += '</select>';
						$("#shapeCatC").html(c4);
						$('#shapeCatObj').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						});
									
				var c5 = '<select id="catIdObj" name="catIdObj" class="form-control" multiple="multiple">';
						$.each(clist, function(key, val) {
						c5 += '<option value="' + val.id + '">'+ val.name + '-' + val.description +'</option>'; });
						c5 += '</select>';
						$("#catCg").html(c5);
						$('#catIdObj').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						});
						
				/*var c6 = '<select id="shapeCatEObj" name="shapeCatEObj" class="form-control" multiple="multiple">';
						$.each(clist, function(key, val) {
						c6 += '<option value="' + val.id + '">'+ val.name + '-' + val.description +'</option>'; });
						c6 += '</select>';
						$("#shapeCatE").html(c6);
						$('#shapeCatEObj').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						});	*/	
			});
			
	    $.getJSON('/OrderExecution/api/v1/stonecategoryLOV',function(data) {
		     var clist = data.payload.stoneCategoryLOV;		
		     	
				    $.each(clist, function(key, val) {
			           $('#actColCatE').append('<option value="' + val.id + '">' + val.description + '</option>');
		            });
					
					var c2 = '<select id="stAcCatObj" name="stAcCatObj" class="form-control" multiple="multiple">';
						$.each(clist, function(key, val) {
						c2 += '<option value="' + val.id + '">'+ val.name + '-' + val.description +'</option>'; });
						c2 += '</select>';
						$("#actColCatC").html(c2);
						$('#stAcCatObj').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						});
						
				   var c3 = '<select id="claCatObj" name="claCatObj" class="form-control" multiple="multiple">';
						$.each(clist, function(key, val) {
						c3 += '<option value="' + val.id + '">'+ val.name + '-' + val.description +'</option>'; });
						c3 += '</select>';
						$("#clarityCatC").html(c3);
						$('#claCatObj').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
					});
		    });
	    
	    $.getJSON('/OrderExecution/api/v1/articleSegmentsLOV', function(data) {
	    	$('#polishSegS').empty().append('<option value="" selected>--Select--</option>');
	    	$('#segmIdPE').empty().append('<option value="" selected>--Select--</option>');

		    	 $.each(data.payload.segments, function(key, val) {
			    	 $('#polishSegS').append('<option value="' + val.id + '">' + val.description + '</option>');
			    	 $('#segmIdPE').append('<option value="' + val.id + '">' + val.description + '</option>');
		        });
	    	 
	    	var c3 = '<select id="segmIdPTObj" name="segmIdPTObj" class="form-control" multiple="multiple">';
			$.each(data.payload.segments, function(key, val) {
			c3+= '<option value="' + val.id + '">' + val.description +'</option>'; });
			c3 += '</select>';
			$("#segmIdP").html(c3);
			$('#segmIdPTObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			
	    });
   }
onLoadDropDown();

$.getJSON('/OrderExecution/api/v1/stoneCateGoryLOV ',function(data) {
	$('#shapeCatS').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.stoneCat, function(key, val) {
	$('#shapeCatS').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
	
	$('#stWtCatS').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.stoneCat, function(key, val) {
	$('#stWtCatS').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
});
//############### Stone Combination Delete Functionality #################
function deleteStCombDetails(id) {
	$('#modalConfirmDel').modal('show'); 	
	$("#btnYes").on('click', function(){
	$.getJSON("/OrderExecution/api/v1/deleteStoneCombination?id=" + id,function(data) {
		if (data.resCode == "1") {
		$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
		});
		stoneCombSearchGrid();
		} else {
		  $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
	  }
		$('#btnEditStComb').modal('hide');
		$('#modalConfirmDel').modal('hide');
	});
	});
}

var stComSegIdE = {};
var editStCombination = function(id) {

	$('#popupheaderlabelSC').text('Edit Stone Combination');
	$.getJSON('/OrderExecution/api/v1/getStoneCombinationById?id=' + id, function(data) {
		var selectedRowData = data.payload.stoneCombination;
		var stSegment = selectedRowData.metalSegment.description;
		stComSegIdE.number = selectedRowData.metalSegment.metalSegmentId

			$("#stCombIdE").val(selectedRowData.stoneCombinationId);
			$("#combDescE").val(selectedRowData.combDescription);	
			$("#combCodeE").val(selectedRowData.combinationCode);
			$("#segmIdSCE").val(stSegment);
	    	$("#createdByE").val(selectedRowData.createdBy);
			$("#createdOnE").val(selectedRowData.createdDate);
			$("#changedByE").val(selectedRowData.lastChangedBy);
			$("#changedOnE").val(selectedRowData.lastchangeDate);
	});

}

var updateStoneCom = function() {
	var updateStCombiE = {
		"stoneCombinationId" : $("#stCombIdE").val(),
		"combDescription" : $("#combDescE").val(),
		"metalSegment" : {
			"metalSegmentId" : stComSegIdE.number	
		}
	}
	return updateStCombiE;	
};

$("#editStCombination").on('click',function(){
	var combDescE = $("#combDescE").val();
	var segmIdSCE = $("#segmIdSCE").val();
		if(combDescE == "" || combDescE == null || segmIdSCE == "" || segmIdSCE == null ){
			$.growl.error({
				message :"Please Fill Mandatory Fields !!",
				duration : 10000,
				title :'Error'
		 });
		return false;
	}
});

//Update and save Stone Combination
$('#stCombinationE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "combDescE": { required: true },
        "segmIdSCE" :{ required : true}
    },
    submitHandler: function (form) { 
    	var updateStCombS = updateStoneCom();
			if (updateStCombS) {postJSON('/OrderExecution/api/v1/updateStoneCombination',JSON.stringify(updateStCombS), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#btnEditStComb').modal('hide');
					$('#createStoneCombination').on('hidden.bs.modal',function() {
					$(this).find('form').trigger('reset');
			});
			stoneCombSearchGrid();
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
				}
				$('#btnEditStComb').modal('hide');
			});
		}
   }  
}); 

$("#clearStoneCom").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//########## Stone Actual Color Started ################3
var actualColorFieldFilters = function() {
	var stActColCatS = $('#stActColCatS').val();
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (stActColCatS != "" && stActColCatS != null) {
		fieldFilters.fieldFilters["category"] = stActColCatS;
	}
	return fieldFilters;
}


$('#createStoneActColr').on("click",function(){
	actualColorModalGrid();	
	$("#jqxgridA").show();
	$('#stAcCatObj').multiselect("clearSelection");
})


var validateStActColor = function() {
	var actColorLines = [];
	var rows = $('#jqxgridA').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		actColorLines.push({
		"name" : row.sActColorDescC,
		"category" : {
			"id" : row.id
		 }		
	 });
   }
  return actColorLines;
}

//Create Cut Grade
$('#saveStoneActCol').on('click', function(){
	trimmer();
	var sActColorDescC = $("#sActColorDescC").val();
	var stActColCatC = $("#stAcCatObj").val();	
	
		if(sActColorDescC == null || sActColorDescC == "" || stActColCatC == null || stActColCatC == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	
	var rows = $('#jqxgridA').jqxGrid('getrows');
		if(rows.length == 0){
			$.growl.error({
				message : "Grid fields are mandatory!!",
				duration : 10000
			});
		return false;
		}
	var actColorLines = [];
	var stActColorLines = validateStActColor();
     	if (stActColorLines) {
		postJSON('/OrderExecution/api/v1/createStoneActualColor',JSON.stringify(stActColorLines),function(data) {
			if (data.resCode == "1") {										
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#createStoneActCol').modal('hide'); 
				actualColorSearchGrid();
				$("#jqxgrid").show();
			} 
			else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
     });
	     } else {
		  $.growl.error({
				message : "Please fill the compolsary field!!",
				duration : 10000
				});
	        }	
        });

var actualColorModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' :'sActColorDescC',
		'type' :'string'
	}, {
		'name' :'actColCatC',
		'type' :'string'
	}];
	var columns = [ {
		'text'  :'Description',
		'datafield':  'sActColorDescC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Category',
		'datafield' : 'actColCatC',
		'width'  :'45%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
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
			id = $("#jqxgridA").jqxGrid('getrowid', row);
			$("#jqxgridA").jqxGrid('deleterow', id);		
		}		
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridA');
	$("#jqxgridA").jqxGrid({
		width : '100%',
		rowsheight : 35,		
	});
}

var generaterowA = function(i,sActColorDescC,stAcCatTextArr) {
	var row = {};
	row["sActColorDescC"] = sActColorDescC;
	row["id"] =  stAcCatTextArr.id
	row["actColCatC"] =  stAcCatTextArr.label;
	return row;
} 


$('#addRowA').on('click', function(){
	var sActColorDescC = $("#sActColorDescC").val();
    var stAColCat = $("#stAcCatObj").val();
		if(sActColorDescC == null || sActColorDescC == "" || stAColCat == null || stAColCat == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	
	var stAcCatTextArr = [];
	$("#stAcCatObj option:selected").each(function() {
		stAcCatTextArr.push({"id" : this.value, "label" : this.text}); 
	});
	
	for(var i=0; i<stAcCatTextArr.length; i++){
		var datarow = generaterowA(i + 1,sActColorDescC,stAcCatTextArr[i]);
		$("#jqxgridA").jqxGrid('addrow', null, datarow); 
	}
	
});

function actualColorSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map' :'stoneAcid'
	}, {
		'name' : 'name',
		'type' : 'string'
	},{
		'name' : 'category',
		'type' : 'string',
		'map' :  'category>description'
	}, {
		'name' : 'actionIdA',
		'type' : 'int',
		'map' : 'stoneAcid'
	}];
	var columns = [ {
		'text' : 'Stone Actual Color Id',
		'datafield' : 'id',
		'width' : '17.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Description',
		'datafield' : 'name',
		'width' : '40%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Category',
		'datafield' : 'category',
		'width' : '37.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : '',
		datafield : 'actionIdA',
		cellsrenderer : stoneAcolEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchStoneAcColor", "list",columns, actualColorFieldFilters(), updateRows, "");
}

$("#sActColSearch").on('click', function() {
	actualColorSearchGrid();
	$("#jqxgrid").show();
	
});

//############## Stone Actual Color Edit Started ########################
var stoneAcolEdit =  function(row, column, value) {
	
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	if(permission.canEdit == false){
		val += '<button class="btn btn-sm btn-primary" disabled type="button"><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditStActColor" type="button" id=' 
			+ row
			+ ' onclick="editStoneActualColor('
			+ value
			+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}
	
	if(permission.canDelete == false){
		val += '<button class="btn btn-sm btn-danger" disabled type="button"><i class="fa fa-trash fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-danger"  type="button" id=' 
			+ row
			+ ' onclick="deleteStActColor('
			+ value
			+ ')" ><i class="fa fa-trash fa-1"></i> </button>';
	}
	
	return val;
}

var editStoneActualColor = function(id) {
	$('#popupheaderlabelAC').text('Edit Stone Actual Color');
	$.getJSON('/OrderExecution/api/v1/getStoneAcById?id=' + id, function(data) {
		var selectedRowData = data.payload.stoneAc;
		var cat=selectedRowData.category.id;
		
			$("#actColIdE").val(selectedRowData.stoneAcid);
			$("#stActColDescE").val(selectedRowData.name);	
			$("#actColCatE").val(cat);
	    	$("#acCreatedByE").val(selectedRowData.createdBy);
			$("#acCreatedOnE").val(selectedRowData.createdOn);
			$("#acChangedByE").val(selectedRowData.lastUpdatedBy);
			$("#acChangedOnE").val(selectedRowData.lastChangedDate);
	});

}


var updateStActCol = function() {
	var updatestActColorE = {
		"stoneAcid" : $("#actColIdE").val(),
		"name" : $("#stActColDescE").val(),
		"category" : {
			"id" : $("#actColCatE").val()	
		}
	}
	return updatestActColorE;
};

$("#editStActColorE").on('click',function(){
	var stActColDescE = $("#stActColDescE").val();
	var actColCatE = $("#actColCatE").val();
		if(stActColDescE == "" || stActColDescE == null || actColCatE == "" || actColCatE == null ){
			$.growl.error({
				message :"Please Fill Mandatory Fields !!",
				duration : 10000,
				title :'Error'
		 });
		return false;
	}
});

//Update and save Cut Grade
$('#stActualColE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "stActColDescE": { required: true },
        "actColCatE" : { required : true }
    },
    submitHandler: function (form) { 
    	var updateAcE = updateStActCol();
		if (updateAcE) {postJSON('/OrderExecution/api/v1/updateStoneAcColor',JSON.stringify(updateAcE), function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#btnEditStActColor').modal('hide');
				$('#createStoneActCol').on('hidden.bs.modal',function() {
				$(this).find('form').trigger('reset');
			});
				actualColorSearchGrid();
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			}
			$('#btnEditStActColor').modal('hide');
		});
	  }
   }  
}); 

//############### Stone Actual Color Delete Functionality #################
function deleteStActColor(id) {
	$('#modalConfirmDel').modal('show'); 	
	$("#btnYes").on('click', function(){
	$.getJSON("/OrderExecution/api/v1/deleteStoneAcColor?id=" + id,function(data) {
		if (data.resCode == "1") {
		$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
		});
		actualColorSearchGrid();
		} else {
		  $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
	  }
	$('#btnEditStActColor').modal('hide');
	$('#modalConfirmDel').modal('hide');
  });
	});
}


$("#clearActCol").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//############# Clarity Master Started ########################
var clarityFieldFilters = function() {
	var clarityCatS =$('#clarityCatS').val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (clarityCatS != "" && clarityCatS != null) {
		fieldFilters.fieldFilters["category"] = clarityCatS;
	}
	return fieldFilters;
}

$('#createClarityM').on("click",function(){
	clarityModalGrid();	
	$("#jqxgridT").show();
	$('#claCatObj').multiselect("clearSelection");
})

var clarityModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}	
	var datafields = [ {
		'name' :'claNameC',
		'type' :'string'
	}, {
		'name' :'clarityCatC',
		'type' :'long'
	}, {
		'name' :'id',
		'type' :'long'
	}];	
	var columns = [ {
		'text'  :'Name',
		'datafield':  'claNameC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Category Id',
		'datafield' : 'clarityCatC',
		'width'  :'45%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
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
			id = $("#jqxgridT").jqxGrid('getrowid', row);
			$("#jqxgridT").jqxGrid('deleterow', id);		
		}	
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridT');
	$("#jqxgridT").jqxGrid({
		width : '100%',
		rowsheight : 35,		
	});	
}

var generaterowT = function(i,claNameC,claCatTextArr) {
	var row = {};
	row["claNameC"] = claNameC;
	row["id"] =  claCatTextArr.id
	row["clarityCatC"] =  claCatTextArr.label;
	return row;
} 

$('#addRowT').on('click', function(){
	var claNameC = $("#claNameC").val();
    var clarCat = $("#claCatObj").val();
  
		if(claNameC == null || claNameC == "" || clarCat == null || clarCat == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
		});
		return false;
	}	
		/*else{
			 var rows = $("#jqxgridT").jqxGrid('getrows');
				console.log(rows);
				console.log(clarCat);
				var claritycatZ ;
				var rowData = [];
				for(var i=0; i<rows.length; i++){
					$.each(clarCat, function(k, v){
						claritycatZ = v;
					});
					if(rows[i].claNameC == claNameC && rows[i].id == claritycatZ ){
						$.growl.error({
							message : claNameC +  " - already Exist",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}					
				}
				var claCatTextArr = [];
				$("#claCatObj option:selected").each(function() {
					claCatTextArr.push({"id" : this.value, "label" : this.text}); 
				});
				for(var i=0; i<claCatTextArr.length; i++){
					var datarow = generaterowT(i + 1,claNameC,claCatTextArr[i]);
					$("#jqxgridT").jqxGrid('addrow', null, datarow); 
				}	
		}*/
		
		else{
			 var rows = $("#jqxgridT").jqxGrid('getrows');
				var check = true;
					$.each(clarCat, function(k, v){
						claritycatZ = v;
						for(var i=0; i<rows.length; i++){
						if(rows[i].claNameC == claNameC && rows[i].id == claritycatZ ){
							$.growl.error({
								message : claNameC + " - Already Exist!!!",
								duration : 10000,
								title : 'Error'
							});
							check = false;
							return false;
						}
						}
					});
				
				if(check){
					var claCatTextArr = [];
					$("#claCatObj option:selected").each(function() {
						claCatTextArr.push({"id" : this.value, "label" : this.text}); 
					});
					for(var i=0; i<claCatTextArr.length; i++){
						var datarow = generaterowT(i + 1,claNameC,claCatTextArr[i]);
						$("#jqxgridT").jqxGrid('addrow', null, datarow); 
					}	
			}
		}
		
	
});

var validateClarity = function() {
	var clarityLines = [];
	var rows = $('#jqxgridT').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		clarityLines.push({
		"name" : row.claNameC,
		"stoneCategory" : {
			"id" : row.id
		 }		
	 });
   }
  return clarityLines;
}

//Create and Save Clarity
$('#saveClarity').on('click', function(){	
	trimmer();
	var claNameC = $("#claNameC").val();
	var claCatgC = $("#claCatObj").val();	
		if(claNameC == null || claNameC == "" || claCatgC == null || claCatgC == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	var rows = $('#jqxgridT').jqxGrid('getrows');

	if(rows.length == 0){
		$.growl.error({
			message : "Grid fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	var clarityLines = [];
	var clarityLinesC = validateClarity();
	if (clarityLinesC) {
	postJSON('/OrderExecution/api/v1/createClarity',JSON.stringify(clarityLinesC),function(data) {
			if (data.resCode == "1") {	
				$('#createClarity').modal('hide');
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				claritySearchGrid();
				$("#jqxgrid").show();
			}
			else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
     });
	     } else {
	    	 $.growl.error({
				message : "Please fill the compolsary field!!",
				duration : 10000
				});
	        }	
        });


function claritySearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map'  : 'clarityId'
	}, {
		'name' : 'name',
		'type' : 'string',
		'map'  : 'name'
	},{
		'name' : 'category',
		'type' : 'string',
		'map' :  'stoneCategory>description'
	},{
		'name' : 'actionIdT',
		'type' : 'int',
		'map' : 'clarityId'
	}];
	var columns = [ {
		'text' : 'Clarity Id',
		'datafield' : 'id',
		'width' : '15%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Name',
		'datafield' : 'name',
		'width' : '40%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	},{
		'text' : 'Category Id',
		'datafield' : 'category',
		'width' : '40%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		text : '',
		datafield : 'actionIdT',
		cellsrenderer : clarityEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchClarity", "list",columns, clarityFieldFilters(), updateRows, "");
}

$("#claritySearch").on('click', function() {
	claritySearchGrid();
	$("#jqxgrid").show();
	
});


//############## Clarity Edit Started ########################
var clarityEdit =  function(row, column, value) {
	
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	if(permission.canEdit == false){
		val += '<button class="btn btn-sm btn-primary" disabled type="button"><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditClarity" type="button" id=' 
			+ row
			+ ' onclick="editClarity('
			+ value
			+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}
	
	if(permission.canDelete == false){
		val += '<button class="btn btn-sm btn-danger" disabled type="button"><i class="fa fa-trash fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-danger"  type="button" id=' 
			+ row
			+ ' onclick="deleteClarity('
			+ value
			+ ')" ><i class="fa fa-trash fa-1"></i> </button>';
	}
	
	return val;
}

var editClarity = function(id) {
	$('#popupheaderlabelClarity').text('Edit Clarity');
	$.getJSON('/OrderExecution/api/v1/getClarityById?id=' + id, function(data) {
		var selectedRowData = data.payload.Clarity;
		var cat=selectedRowData.stoneCategory.id;
		
			$("#clarityIdE").val(selectedRowData.clarityId);
			$("#clarityNameE").val(selectedRowData.name);	
			$("#claCatIdE").val(cat);
	    	$("#claCreatedByE").val(selectedRowData.createdBy);
			$("#claCreatedOnE").val(selectedRowData.CreatedOn);
			$("#claChangedByE").val(selectedRowData.lastChangedBy);
			$("#claChangedOnE").val(selectedRowData.lastChangedDate);
	});
}

$("#editClarityE").on('click',function(){
	var clarityNameE = $("#clarityNameE").val();
	var claCatIdE = $("#claCatIdE").val();
		if(clarityNameE == "" || clarityNameE == null || claCatIdE == "" || claCatIdE == null ){
			$.growl.error({
				message :"Please Fill Mandatory Fields !!",
				duration : 10000,
				title :'Error'
		 });
		return false;
	}
});

var updateClarity = function() {
	var updateclarityE = {
		"clarityId" : $("#clarityIdE").val(),
		"name" : $("#clarityNameE").val(),
		"stoneCategory" : {
			"id" : $("#claCatIdE").val()	
		}
	}
	return updateclarityE;	
};


//Update and save Clarity
$('#clarityE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "clarityNameE": { required: true },
        "claCatIdE" : { required : true}
    },
    submitHandler: function (form) { 
    	var updateClarE = updateClarity();
		if (updateClarE) {postJSON('/OrderExecution/api/v1/updateClarity',JSON.stringify(updateClarE), function(data) {
			if (data.resCode == "1") {
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#btnEditClarity').modal('hide');
				$('#createClarity').on('hidden.bs.modal',function() {
				$(this).find('form').trigger('reset');
			});
		claritySearchGrid();
		}else{
		    $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
       }
	   $('#btnEditClarity').modal('hide');
	 });
	}
   }  
}); 

//############### Clarity Delete Functionality #################
function deleteClarity(id) {
	$('#modalConfirmDel').modal('show'); 	
	$("#btnYes").on('click', function(){
	$.getJSON("/OrderExecution/api/v1/deleteClarityById?id=" + id,function(data) {
		if (data.resCode == "1") {
		$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
		});
		claritySearchGrid();
		} else {
		  $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
	  }
	$('#btnEditClarity').modal('hide');
	$('#modalConfirmDel').modal('hide');
  });
	});
}


$("#clearClarity").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//########## Standard Rate Stone Master Started ###################
$.getJSON('/OrderExecution/api/v1/getStoneSegmentLOV', function(data) {
	$('#segIdR').empty().append('<option value="" selected>--Select--</option>');
	$('#stCostSegS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.stoneSegment, function(key, val) {
		$('#segIdR').append('<option value="' + val.id + '">' + val.description + '</option>');
		$('#stCostSegS').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
});

$("#stCostSegS").on('change',function(){
	var id = $("#stCostSegS").val();
	$.getJSON('/OrderExecution/api/v1/getCategoryBySegment?segmentId='+ id,function(data) {
		   var cType = data.payload.stoneCtaegotu;
		   $('#stCostCatS').empty().append('<option value="" selected>--Select--</option>');
		   $.each(cType, function(key, val) {
				$('#stCostCatS').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
		});	
});

$.getJSON('/OrderExecution/api/v1/savingPlanBusinessLOV', function(data) {
	$('#buIdC').empty().append('<option value="" selected>--Select--</option>');
	$('#buIdE').empty().append('<option value="" selected>--Select--</option>');
	
		$.each(data.payload.blist, function(key, val) {
		$('#buIdC').append('<option value="' + val.id + '">' + val.name + '</option>');
		$('#buIdE').append('<option value="' + val.id + '">' + val.name + '</option>');	
	});
});

$("#categoryRate").hide();
$("#segIdR").on("change",function(id) {
	var id = $("#segIdR").val();
	$.getJSON('/OrderExecution/api/v1/getCategoryBySegment?segmentId='+ id,function(data) {
		   $("#categoryRate").show();
		   var cType = data.payload.stoneCtaegotu;
		   var c = '<select id="stRateCatObj" name="stRateCatObj" class="form-control" multiple="multiple">';
		   $.each(cType, function(key, val) {
		   c += '<option value="' + val.id + '">'+ val.name + '-' + val.description +'</option>'; });
		   c += '</select>';
		   $("#catIdR").html(c);
		   $('#stRateCatObj').multiselect(
			{
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
			});
		});
});

$('#createRateStone').on("click",function(){
	stoneRateModalGrid();	
	$("#jqxgridR").show();
	$('#stRateCatObj').multiselect("clearSelection");
})

var generaterowR = function(i,fromC,toC,uomC,segIdR,stRateCatTextArr,buIdC) {
	var row = {};
	row["fromC"] = fromC;
	row["toC"] = toC;
	row["uomC"] = uomC;
	row["segIdR"] =  $("#segIdR option:selected").text();
	row["id"] = stRateCatTextArr.id
	row["catIdR"] =  stRateCatTextArr.label;
	row["buIdC"] =  $("#buIdC option:selected").text();	
	return row;
} 


$('#addRowR').on('click', function(){
	var fromC = parseFloat($("#fromC").val());
	var toC = parseFloat($("#toC").val());
	var uomC = $("#uomC").val();
	var segIdR = $("#segIdR").val();
    var stRateCatC = $("#stRateCatObj").val();
    var buIdC = $("#buIdC").val();

		if(fromC == null || fromC == "" || toC == null || toC == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	   }
		
       if(toC < fromC){
			$.growl.error({
				message : "To Range Should Be Greater Than From Range",
				duration : 10000,
				title : 'Error'
		});
		return false;
	  }
	
	var stRateCatTextArr = [];
	$("#stRateCatObj option:selected").each(function() {
		stRateCatTextArr.push({"id" : this.value, "label" : this.text}); 
	});
	
	for(var i=0; i<stRateCatTextArr.length; i++){
		var datarow = generaterowR(i + 1,fromC,toC,uomC,segIdR,stRateCatTextArr[i],buIdC);
		$("#jqxgridR").jqxGrid('addrow', null, datarow);
	}
	
});

var validateStoneRate = function() {
	var stoneRateLines = [];
	var rows = $('#jqxgridR').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		
		stoneRateLines.push({
		"fromRange" : parseFloat(row.fromC).toFixed(2),
		"toRange" :  parseFloat(row.toC).toFixed(2),
		"uom" : row.uomC,
		"stoneSegment" : {
			"stoneSegmentId" : parseInt($("#segIdR").val())
		 },
		"stoneCategory" : {
			"id" : row.id
		 },
	    "business" : {
			"id" : $("#buIdC").val()
		 }	
	 });
   }
  return stoneRateLines;
}

$('#createStoneRateC').validate(
		{
		 errorElement : 'label',
		 errorClass : 'help-inline',
		 focusInvalid : false,
		 ignore : "",
		rules : {
			"fromC" : {
				required : true,
				regx : /[0-9]+(\.[0-9][0-9]?)?/,		
			},
			"toC" : {
				required : true,
				regx : /[0-9]+(\.[0-9][0-9]?)?/,		
			},
			"uomC" : {
				required : true,
				regx : /^[a-zA-Z',-]+$/
			}
		},
		messages : {
			'fromC' : {
				regx : "Only Numbers Are Allowed!"		
			},
			'toC' : {
				regx : "Only Numbers Are Allowed!"		
			},
			'uomC' : {
				regx : "Only Letters Are Allowed!"
			}
		},
		submitHandler : function(form) {
			$("#jqxgridR").jqxGrid('addrow', null, generaterowR(rowId + 1));
		}
	});

//Create Cut Grade
$('#saveStoneRate').on('click', function(){	
	trimmer();
	var fromC = $("#fromC").val();
	var toC = $("#toC").val();
	var uomC = $("#uomC").val();
	var segIdR = $("#segIdR").val();
	var stRateCatgC = $("#stRateCatObj").val();
	var buIdC = $("#buIdC").val();
	
		if(fromC == null || fromC == "" || toC == null || toC == "" || stRateCatgC == null || stRateCatgC == ""||uomC == null || uomC == "" ||segIdR == null || segIdR == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	
	var rows = $('#jqxgridR').jqxGrid('getrows');

	if(rows.length == 0){
		$.growl.error({
			message : "Grid fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	var stoneRateLines = [];
	
	var stoneRateLines = validateStoneRate();
     
	if (stoneRateLines) {
		postJSON('/OrderExecution/api/v1/createStandardRateStoneMaster',JSON.stringify(stoneRateLines),function(data) {
			if (data.resCode == "1") {										
				if(data.payload.success != null && data.payload.success.length > 0) {
					$.growl.notice({
						message : proceseMessage(data.payload.success),
						duration : 10000,
						title : 'Success'
					});
				}
				
				if(data.payload.Failure != null && data.payload.Failure.length > 0) {
					$.growl.error({
						message : proceseMessage(data.payload.Failure),
						fixed : true,
						title : 'Error'
					});
				}
				$('#createStoneRate').modal('hide'); 
				rateStoneSearchGrid();
				$("#jqxgrid").show();
		} else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}	
     });
	     } else {
		  $.growl.error({
				message : "Please fill the compolsary field!!",
				duration : 10000
				});
	        }	
       });

var stoneRateModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' :'fromC',
		'type' :'long'
	}, {
		'name' :'toC',
		'type' :'long'
	}, {
		'name' :'uomC',
		'type' :'string'
	}, {
		'name' :'segIdR',
		'type' :'long'
	}, {
		'name' :'catIdR',
		'type' :'long'
	},{
		'name' :'buIdC',
		'type' :'long'
	}];
	var columns = [ {
		'text'  :'From Range',
		'datafield':  'fromC',
		'width' : '15%',
		cellsalign : 'center',
		align:'center',
		editable : false,
		cellsformat : 'd2'
	}, {
		'text'  :'To Range',
		'datafield' : 'toC',
		'width'  :'15%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false,
		cellsformat : 'd2'
	}, {
		'text'  :'UOM',
		'datafield' : 'uomC',
		'width'  :'10%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
	}, {
		'text'  :'Segment Id',
		'datafield' : 'segIdR',
		'width'  :'15%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
	}, {
		'text'  :'Category Id',
		'datafield' : 'catIdR',
		'width'  :'15%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
	}, {
		'text'  :'Business Id',
		'datafield' : 'buIdC',
		'width'  :'20%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
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
			id = $("#jqxgridR").jqxGrid('getrowid', row);
			$("#jqxgridR").jqxGrid('deleterow', id);		
		}
		
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];

	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridR');
	$("#jqxgridR").jqxGrid({
		width : '100%',
		rowsheight : 35,	
	});	
}



//############ Standard Stone Rate Search Started ##############3
var standardRateStoneFieldFilters = function() {
	var segment  = $("#stCostSegS").val();
	var cat = $("#stCostCatS").val();
		
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["stoneSegment"] = segment;
	}
	if (cat != "" && cat != null) {
		fieldFilters.fieldFilters["stoneCategory"] = cat;
	}
	return fieldFilters;
}

function rateStoneSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map' :'standardRateStoneMasterId'
	}, {
		'name' : 'fromRange',
		'type' : 'double'
	}, {
		'name' : 'toRange',
		'type' : 'double'
	}, {
		'name' : 'stoneSeg',
		'map' : 'stoneSegment>description',
		'type' : 'string'
	}, {
		'name' : 'stoneCat',
		'type' : 'string',
		'map' : 'stoneCategory>description'
	}, {
		'name' : 'uom',
		'type' : 'string'
	} ,{
		'name' : 'business',
		'type' : 'string',
		'map' :'business>name'
	},{
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'standardRateStoneMasterId'
	}];
	var columns = [ {
		'text' : 'Id',
		'datafield' : 'id',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'From Range',
		'datafield' : 'fromRange',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false,
		//cellsformat : 'd3'
	}, {
		'text' : 'To Range',
		'datafield' : 'toRange',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false,
		//cellsformat : 'd3',
	}, {
		'text' : 'Stone Segment',
		'datafield' : 'stoneSeg',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'UOM',
		'datafield' : 'uom',
		'width' : '9%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Stone Category',
		'datafield' : 'stoneCat',
		'width' : '23%',
		sortable : true,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Business Id',
		'datafield' : 'business',
		'width' : '13%',
		sortable : true,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	},{
		text : '',
		datafield : 'actionId',
		cellsrenderer : stoneRateEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchstandardRateStoneMaster", "list",columns, standardRateStoneFieldFilters(), updateRows, "");
}

$("#stoneRateSearch").on('click', function() {
	rateStoneSearchGrid();
	$("#jqxgrid").show();
});

//############## Stone Rate Edit Started ########################
var stoneRateEdit =  function(row, column, value) {	
	
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	if(permission.canEdit == false){
		val += '<button class="btn btn-sm btn-primary" disabled type="button"><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditStoneRate" type="button" id=' 
			+ row
			+ ' onclick="editStoneRate('
			+ value
			+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}
	
	if(permission.canDelete == false){
		val += '<button class="btn btn-sm btn-danger" disabled type="button"><i class="fa fa-trash fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-danger"  type="button" id=' 
			+ row
			+ ' onclick="deleteStoneRate('
			+ value
			+ ')" ><i class="fa fa-trash fa-1"></i> </button>';
	}
	
	return val;
}

var rateSegIdE = {};
var rateCatIdE = {};
var busIdE = {};
var editStoneRate = function(id) {
	$('#popupheaderlabelStRate').text('Stone Cost Range');
	
	$.getJSON('/OrderExecution/api/v1/getstMaster?id=' + id, function(data) {
		var selectedRowData = data.payload.standradRateStMaster;
		rateSegIdE.number=selectedRowData.stoneSegment.stoneSegmentId;
		rateCatIdE.number=selectedRowData.stoneCategory.id;
		busIdE.number=selectedRowData.business.id;
		
			$("#rateIdE").val(selectedRowData.standardRateStoneMasterId);
			$("#segRateIdE").val(selectedRowData.stoneSegment.description);	
			$("#catRateIdE").val(selectedRowData.stoneCategory.description);
			$("#fromRangeE").val(selectedRowData.fromRange);
			$("#toRangeE").val(selectedRowData.toRange);
			$("#uomE").val(selectedRowData.uom);
			$("#buIdE").val(selectedRowData.business.name);
	    	$("#rateCreatedByE").val(selectedRowData.createdBy);
			$("#rateCreatedOnE").val(selectedRowData.createdDate);
			$("#rateChangedByE").val(selectedRowData.lastChangedBy);
			$("#rateChangedOnE").val(selectedRowData.lastChangeDate);
	});

}

var updateStoneRate = function() {
	var updateStRateE = {
		"standardRateStoneMasterId" : $("#rateIdE").val(),
		"fromRange" :  $("#fromRangeE").val(),
		"toRange" : $("#toRangeE").val(),
		"uom" :  $("#uomE").val(),
		"stoneSegment" : {
			"stoneSegmentId" : rateSegIdE.number
		 },
		"stoneCategory" : {
			"id" :  rateCatIdE.number
		 },
		"business" : {
			"id" : busIdE.number
		 }	
	}
	return updateStRateE;
};

$("#editStdRateStoneE").on('click',function(){
	var fromRangeE = $("#fromRangeE").val();
	var toRangeE = $("#toRangeE").val();
	var segRateIdE = $("#segRateIdE").val();
	var catRateIdE = $("#catRateIdE").val();
	var buIdE = $("#buIdE").val();
		if(fromRangeE == "" || fromRangeE == null || toRangeE == "" || toRangeE == null  || segRateIdE == "" || segRateIdE == null  
				|| catRateIdE == "" || catRateIdE == null  || buIdE == "" || buIdE == null ){
			$.growl.error({
				message :"Please Fill Mandatory Fields !!",
				duration : 10000,
				title :'Error'
		 });
		return false;
	}
});

//Update and save Stone Rate

$('#stoneRateE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "fromRange": { required: true },
        "toRangeE" : { required  : true},
        "segRateIdE" : { required : true},
        "catRateIdE" : { required : true},
        "buIdE" : { required : true}
    },
    submitHandler: function (form) { 
    	var updateStoneRateE = updateStoneRate();
			if (updateStoneRateE) {postJSON('/OrderExecution/api/v1/updatestandardRateMasterStone',JSON.stringify(updateStoneRateE), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : "Standard Rate Stone Master Updated Successfully",
						duration : 10000,
						title : 'Success'
					});
				$('#btnEditStoneRate').modal('hide');
				$('#createStWeightRange').on('hidden.bs.modal',function() {
				$(this).find('form').trigger('reset');
			});
		rateStoneSearchGrid();
		}else{
		    $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
      }
	   $('#btnEditStoneRate').modal('hide');
	 });
	}
   }  
}); 


//############### Stone Rate Delete Functionality #################
function deleteStoneRate(id) {
	$('#modalConfirmDel').modal('show'); 	
	$("#btnYes").on('click', function(){
	$.getJSON("/OrderExecution/api/v1/deleteStandardMaster?id=" + id,function(data) {
		if (data.resCode == "1") {
		$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
		});
		rateStoneSearchGrid();
		} else {
		  $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
	  }
	$('#btnEditStoneRate').modal('hide');
	$('#modalConfirmDel').modal('hide');
  });
	});
}

$("#clearStoneRate").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//################## Stone Weight Range Started ###################
var stoneWeightRangeFieldFilters = function() {
	var stWtCatS = $("#stWtCatS").val();
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (stWtCatS != "" && stWtCatS != null) {
		fieldFilters.fieldFilters["category"] = stWtCatS;
	}	
	return fieldFilters;
}

$('#createWeightRange').on("click",function(){
	stoneWeightRangeModalGrid();	
	$("#jqxgridW").show();
	$("#catIdSw").attr("disabled",false);
	$("#fromToWtC").attr("disabled",true);
})

var rowId = 0;
var generaterowW = function(i) {
	var row = {};
	row["fromSwC"] = $("#fromSwC").val();
	row["toSwC"] =  $("#toSwC").val();
	row["fromToWtC"] = $("#fromToWtC").val();
	row["catIdSw"] =  $("#catIdSw option:selected").text();
	rowId = rowId + 1;
	return row;
}

var overlap = false;
var array = [];
var msg = null;

var overlapFunctionTwoVariables = function(x1, x2, n, a) {
	var i;
	overlap = false;
	for (i = 0; i < n; i++) {
		if (null != parseFloat(a[i].fromSwC) && null != parseFloat(a[i].toSwC)) {
			if (!(x2 < parseFloat(a[i].fromSwC) || x1 > parseFloat(a[i].toSwC))) {
				overlap = true;							
				break;
			}
		} else {
			break;
		}
	}
	return overlap;
}

var overlapFunctionOneVariables = function(x, n, a) {
	var i;
	overlap = false;
	for (i = 0; i < n; i++) {
		if (null != parseFloat(a[i].fromSw) && null != parseFloat(a[i].toSwC)) {
			if (x >= parseFloat(a[i].fromSwC) && x <= parseFloat(a[i].toSwC)) {
				overlap = true;							
				break;
			}
		} else {
			break;
		}
	}
	return overlap;
}

var check = function(overlap, x1, x2, msg, array){
	if (null != x1 && null != x2) {
		overlap = overlapFunctionTwoVariables(x1, x2, array.length, array);
	} else {
		overlap = overlapFunctionOneVariables(null != x1 ? x1 : x2, array.length, array);
	}

	if (overlap) {
		$.growl.error({
			message : "Range is overlapping!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
}



$('#addRowW').on('click', function(){
	var rows = $("#jqxgridW").jqxGrid('getrows');
	var fromSwC = parseFloat($("#fromSwC").val());
	var toSwC = parseFloat($("#toSwC").val());
	var fromToWtC = $("#fromToWtC").val();
	var catIdSw = $("#catIdSw").val();
	
	
	if(typeof rows != "undefined" && rows.length > 0){	
		check(overlap, fromSwC, toSwC, msg, rows);		
	}
	
		if(fromSwC == null || fromSwC == "" || toSwC == null || toSwC == "" ||fromToWtC == null || fromToWtC == "" 
			|| catIdSw == null || catIdSw == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
		
		 if(toSwC < fromSwC){
				$.growl.error({
					message : "To Range Should Be Greater Than From Range",
					duration : 10000,
					title : 'Error'
			});
			return false;
		  }
		 else{
			 if(overlap == false){
				 $("#jqxgridW").jqxGrid('addrow', null, generaterowW(rowId + 1));
				 $("#catIdSw").attr("disabled",true);
				 $(this).closest('form').find("input[type=text], textarea").val("");
			 }
		}
});

$("#fromSwC").on('blur',function(){
	$("#toSwC").val("");
});

$('#createStoneWeightC').validate(
		{
		 errorElement : 'label',
		 errorClass : 'help-inline',
		 focusInvalid : false,
		 ignore : "",
		rules : {
			"fromSwC" : {
				required : true,
				regx : /[0-9]+(\.[0-9][0-9]?)?/,		
			},
			"toSwC" : {
				required : true,
				regx : /[0-9]+(\.[0-9][0-9]?)?/,		
			}
		},
		messages : {
			'fromSwC' : {
				regx : "Only Numbers Are allowed!"		
			},
			'toSwC' : {
				regx : "Only Numbers Are allowed!"		
			}	
		},
		submitHandler : function(form) {
			$("#jqxgridW").jqxGrid('addrow', null, generaterowW(rowId + 1));
		}
	});

var fromToWtRangeC = function(){
	var fromWtC = $('#fromSwC').val();
	var toWtC = $('#toSwC').val();
		if(fromWtC == "" || fromWtC == null || toWtC == "" || toWtC == null){
			$.growl.error({
				message : "Please Select From and To Range!!",
				duration : 10000,
				title  : 'Error'
			});	
		}
	else{
			var res = fromWtC + "-" + toWtC;
		}
		return res;
 }

$("#toSwC").on('blur',function(){
	var fromWtC = $('#fromSwC').val();
	var toWtC = $('#toSwC').val();
		if(fromWtC == "" || fromWtC == null || toWtC == "" || toWtC == null){
			$.growl.error({
				message : "Please Select From and To Range!!",
				duration : 10000,
				title  : 'Error'
			});	
		}
	var wtRangeC = fromToWtRangeC();
	$("#fromToWtC").val(wtRangeC);	
});

var validateStoneWt = function() {
	var stoneWtLines = [];
	var rows = $('#jqxgridW').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		stoneWtLines.push({
		"fromRange" :parseFloat(row.fromSwC).toFixed(3),
		"toRange" : parseFloat(row.toSwC).toFixed(3),
		"fromToRange" : (row.fromToWtC),
		"category" : {
			"id" : parseInt($('#catIdSw').val())
		 }		
	 });
   }
  return stoneWtLines;
}

//Create Stone Wt Range
$('#saveStoneWtRange').on('click', function(){	
	trimmer();
	var rows = $('#jqxgridW').jqxGrid('getrows');
	if(rows.length == 0){
		$.growl.error({
			message : "Grid fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	var stoneWtLinesC = [];	
	var stoneWtLinesC = validateStoneWt();
	if (stoneWtLinesC) {
	postJSON('/OrderExecution/api/v1/createStoneWeightRange',JSON.stringify(stoneWtLinesC),function(data) {
		if (data.resCode == "1") {										
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});	 		
		$('#createStWeightRange').modal('hide'); 
		stoneWtRangeSearchGrid();
		$("#jqxgrid").show();
		
		} else if (data.resCode == "2") {
		  $.growl.error({
				message : data.mesgStr,
				duration : 10000,
				 title   : 'Warning'
				});
	         }
		else{
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


var stoneWeightRangeModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' :'fromSwC',
		'type' :'long'
	}, {
		'name' :'toSwC',
		'type' :'long'
	} ,{
		'name' :'fromToWtC',
		'type' :'long'
	}, {
		'name' :'catIdSw',
		'type' :'string'
	}];
	var columns = [ {
		'text'  :'From Range',
		'datafield':  'fromSwC',
		'width' : '20%',
		cellsalign : 'right',
		align:'center',
		editable : false,
		cellsformat : 'd3'
	}, {
		'text'  :'To Range',
		'datafield' : 'toSwC',
		'width'  :'20%',
		sortable  :false,
		cellsalign : 'right',
		align:'center',
		editable:  false,
		cellsformat : 'd3'
	} ,{
		'text'  :'From To Weight Range',
		'datafield' : 'fromToWtC',
		'width'  :'20%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false,
		cellsformat : 'd3'
	},  {
		'text'  :'Category Id',
		'datafield' : 'catIdSw',
		'width'  :'30%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
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
			id = $("#jqxgridW").jqxGrid('getrowid', row);
			$("#jqxgridW").jqxGrid('deleterow', id);		
		}
		
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridW');
	$("#jqxgridW").jqxGrid({
		width : '100%',
		rowsheight : 35,
	});
}



function stoneWtRangeSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {	
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long'
	}, {
		'name' : 'fromRange',
		'type' : 'long'
	},{
		'name' : 'toRange',
		'type' : 'long'
	},{
		'name' : 'fromToRange',
		'type' : 'long'
	},{
		'name' : 'category',
		'type' : 'long',
		'map'  :'category>description'
	},{
		'name' : 'actionIdW',
		'type' : 'int',
		'map' : 'id'
	}];
	var columns = [ {
		'text' : 'Id',
		'datafield' : 'id',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false,
	}, {
		'text' : 'From Range',
		'datafield' : 'fromRange',
		'width' : '20%',
		cellsalign : 'right',
		align : 'center',
		sortable : true,
		editable : false,
		cellsformat : 'd3'
	}, {
		'text' : 'To Range',
		'datafield' : 'toRange',
		'width' : '20%',
		cellsalign : 'right',
		align : 'center',
		sortable : true,
		editable : false,
		cellsformat : 'd3'
	}, {
		'text' : 'From To Weight Range',
		'datafield' : 'fromToRange',
		'width' : '20%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false,
		cellsformat : 'd3'
	}, {
		'text' : 'Category',
		'datafield' : 'category',
		'width' : '25%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false,
	},{
		text : '',
		datafield : 'actionIdW',
		cellsrenderer : stoneWeightEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchStoneWeightRange", "list",columns, stoneWeightRangeFieldFilters(), updateRows, "");
}

$("#searchWeightRange").on('click', function() {
	stoneWtRangeSearchGrid();
	$("#jqxgrid").show();
	
});

var stoneWeightEdit =  function(row, column, value) {
	
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	if(permission.canEdit == false){
		val += '<button class="btn btn-sm btn-primary" disabled type="button"><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditStoneWeight" type="button" id=' 
			+ row
			+ ' onclick="editStoneWeight('
			+ value
			+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}
	
	if(permission.canDelete == false){
		val += '<button class="btn btn-sm btn-danger" disabled type="button"><i class="fa fa-trash fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-danger"  type="button" id=' 
			+ row
			+ ' onclick="deleteStoneWeight('
			+ value
			+ ')" ><i class="fa fa-trash fa-1"></i> </button>';
	}
	
	return val;
}

//############### Stone Weight Range Delete Functionality #################
function deleteStoneWeight(id) {
	$('#modalConfirmDel').modal('show'); 	
	$("#btnYes").on('click', function(){
	$.getJSON("/OrderExecution/api/v1/deleteStoneWeightRange?id=" + id,function(data) {
		if (data.resCode == "1") {
		$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
		});
		stoneWtRangeSearchGrid();
		} else {
		  $.growl.error({
				message : data.mesgStr,
				duration : 10000

		});
	  }
		$('#btnEditStoneWeight').modal('hide');
		$('#modalConfirmDel').modal('hide');
  });
	});
}

var wtCatIdE = {};
var editStoneWeight = function(id) {
	$('#popupheaderlabelStWeight').text('Edit Stone Weight Range');
	$.getJSON('/OrderExecution/api/v1/getStoneWeightRangeById?id=' + id, function(data) {
		var selectedRowData = data.payload.detail;
	    wtCatIdE.number=selectedRowData.category.id;
		
			$("#weightIdE").val(selectedRowData.id);
			$("#fromWtRangeE").val(selectedRowData.fromRange);	
			$("#toWtRangeE").val(selectedRowData.toRange);
			$("#fromToWtRangeE").val(selectedRowData.fromToRange);
			$("#toRangeE").val(selectedRowData.toRange);
			$("#wtCatE").val(selectedRowData.category.description);
	    	$("#weightCreatedByE").val(selectedRowData.createdBy);
			$("#weightCreatedOnE").val(selectedRowData.createdDate);
			$("#wtChangedByE").val(selectedRowData.lastChangedBy);
			$("#wtChangedOnE").val(selectedRowData.lastChangedDate);
	});
}

var fromToWtE = function(){
	var fromWtRangeE = $('#fromWtRangeE').val();
	var toWtRangeE = $('#toWtRangeE').val();
	if(toWtRangeE < fromWtRangeE){
		$.growl.error({
			message : "To Range Should Be Greater Than From Range!!",
			duration : 10000,
			title : 'Error'
		});	
		return false;
	}else{
	var resE = fromWtRangeE + "-" + toWtRangeE;
	}
	return resE;
}

var fromToWtUpdate = function(){
	var fromWtRangeE = $('#fromWtRangeE').val();
	var toWtRangeE = $('#toWtRangeE').val();
	if(toWtRangeE < fromWtRangeE){		
		return false;
	}else{
		return true;
	}
}


$("#toWtRangeE").on('blur',function(){
	var wtRangeE = fromToWtE();
	$("#fromToWtRangeE").val(wtRangeE);
});

$("#editStoneWtE").on('click',function(){
	var fromWtRangeE = $("#fromWtRangeE").val();
	var toWtRangeE = $("#toWtRangeE").val();
		if(fromWtRangeE == "" || fromWtRangeE == null || toWtRangeE == "" || toWtRangeE == null){
			$.growl.error({
				message :"Please Fill Mandatory Fields !!",
				duration : 10000,
				title :'Error'
		 });
		return false;
	}
});

var updateStoneWt = function() {
	
	var wtRangeE = fromToWtUpdate();
	if(wtRangeE == false){
		$.growl.error({
			message : "To Range Should Be Greater Than From Range!!",
			duration : 10000,
			title : 'Error'
		});	
		return false;
	}
	var updateStWtE = {
		"id" : $("#weightIdE").val(),
		"fromRange" : parseFloat($("#fromWtRangeE").val()),
		"toRange" : parseFloat($("#toWtRangeE").val()),
		"fromToRange" : $("#fromToWtRangeE").val(),
		"category" : {
			"id" : wtCatIdE.number	
		}
	}
	return updateStWtE;	
};

//Update and save Cut Grade
$('#stoneWeightE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "fromWtRangeE": { required: true }     
    },
    submitHandler: function (form) { 
    	var updateStWtE = updateStoneWt();
		if (updateStWtE) {postJSON('/OrderExecution/api/v1/editStoneWeightRange',JSON.stringify(updateStWtE), function(data) {
			if (data.resCode == "1") {
			 $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
		$('#btnEditStoneWeight').modal('hide');
		$('#createStWeightRange').on('hidden.bs.modal',function() {
		 $(this).find('form').trigger('reset');
			});
		stoneWtRangeSearchGrid();
		}else{
		    $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
       }
	  // $('#btnEditStoneWeight').modal('hide');
	 });
	}
   }  
}); 

$("#clearWtRange").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//################# Shape Type Master Started #######################
var shapeFieldFilters = function() {
	var shapeCatS = $("#shapeCatS").val();
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (shapeCatS != "" && shapeCatS != null) {
		fieldFilters.fieldFilters["category"] = shapeCatS;
	}	
	return fieldFilters;
}


$('#createShape').on("click",function(){
	shapeModalGrid();	
	$("#jqxgridE").show();
	$('#shapeCatObj').multiselect("clearSelection");
})

var shapeModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' :'shapeCodeC',
		'type' :'long'
	}, {
		'name' :'shapeDescC',
		'type' :'long'
	}];
	var columns = [ {
		'text'  :'Code',
		'datafield':  'shapeCodeC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Description',
		'datafield' : 'shapeDescC',
		'width'  :'45%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
	}, {
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
			id = $("#jqxgridE").jqxGrid('getrowid', row);
			$("#jqxgridE").jqxGrid('deleterow', id);		
		}
		
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridE');
	$("#jqxgridE").jqxGrid({
		width : '100%',
		rowsheight : 35,	
	});
}

var rowId = 0;
var generaterowE = function(i) {
	var row = {};
	row["shapeCodeC"] = $("#shapeCodeC").val();
	row["shapeDescC"] =  $("#shapeDescC").val();
	rowId = rowId + 1;
	return row;
}

$('#addRowE').on('click', function(){
	var shapeCodeC = $("#shapeCodeC").val();
	var shapeDescC = $("#shapeDescC").val();
    var shapeCat = $("#shapeCatObj").val();	
    var shapeCatDesc = $("#shapeCatC option:selected").text();
		if(shapeCodeC == null || shapeCodeC == "" || shapeDescC == null || shapeDescC == "" || shapeCat == null || shapeCat == ""){
		$.growl.error({
			message : "please fill mandatory fields!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
		else{
			 var rows = $("#jqxgridE").jqxGrid('getrows');
				var check = true;
					for(var i=0; i<rows.length; i++){
						if(rows[i].shapeCodeC == shapeCodeC){
							$.growl.error({
								message : shapeCodeC + " - Already Exist",
								duration : 10000,
								title : 'Error'
							});
							check = false;
							return false;
							}
						}
				
				if(check){
					 $("#jqxgridE").jqxGrid('addrow', null, generaterowE(rowId + 1));
				}
		}
		
	
});

var validateShape = function() {
	var shapeTypeLines = [];
	var shapeCatObj = $("#shapeCatObj").val();
	console.log(shapeCatObj);
	var shapeCatObjArr=[];
	
	$.each(shapeCatObj,function(key,val){
		var cat  = {
			"id": val
		}
		shapeCatObjArr.push(cat);
	})
	var rows = $('#jqxgridE').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		shapeTypeLines.push({
		"code" : row.shapeCodeC,
		"description" : row.shapeDescC,
		"stoneCategoryDTOs" : shapeCatObjArr
	 });
   }
  return shapeTypeLines;
}

$('#shapeMasterC').validate(
		{
		 errorElement : 'label',
		 errorClass : 'help-inline',
		 focusInvalid : false,
		 ignore : "",
		rules : {
			"shapeCodeC" : {
				required : true,
				regx : /^[A-Z]+$/,
				maxlength : 4
			}		
		},
		messages : {
			'shapeCodeC' : {
				regx : "Only capital letter allowed!",
				maxlength : "Code should be maximum of 4 character!"
			}				
		},
		submitHandler : function(form) {
			$("#jqxgridE").jqxGrid('addrow', null, generaterowE(rowId + 1));
		}
	});

//Create Shape
$('#saveShape').on('click', function(){	
	trimmer();
	var shapeCodeC = $("#shapeCodeC").val();	
	var shapeDescC = $("#shapeDescC").val();	
	var shapeCategoryC = $("#shapeCatObj").val();
		if(shapeCodeC == null || shapeCodeC == "" || shapeDescC == null || shapeDescC == "" || shapeCategoryC == null || shapeCategoryC == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	
	var rows = $('#jqxgridE').jqxGrid('getrows');
	if(rows.length == 0){
		$.growl.error({
			message : "Grid fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	var shapeTypeLinesC = [];
	
	var shapeTypeLinesC = validateShape();
	if (shapeTypeLinesC) {
		postJSON('/OrderExecution/api/v1/createshape',JSON.stringify(shapeTypeLinesC),function(data) {
			if (data.resCode == "1") {
			$('#createShapeTypeM').modal('hide'); 	
			  $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			  shapeSearchGrid();
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
	     } else {
		  $.growl.error({
				message : "Please fill the compolsary field!!",
				duration : 10000
				});
	        }	
        });

function shapeSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map':'shapeId'
	}, {
		'name' : 'code',
		'type' : 'long'
	},{
		'name' : 'description',
		'type' : 'string'
	},{
		'name' : 'cat',
		'type' : 'long',
		'map' : 'category>description'
	},{
		'name' : 'actionIdE',
		'type' : 'int',
		'map' : 'shapeId'
	}];
	
	var columns = [ {
		'text' : 'Id',
		'datafield' : 'id',
		'width' : '30%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Code',
		'datafield' : 'code',
		'width' : '30%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Description',
		'datafield' : 'description',
		'width' : '30%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	},/* {
		'text' : 'Category',
		'datafield' : 'cat',
		'width' : '30%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}*/,{
		text : '',
		datafield : 'actionIdE',
		cellsrenderer : shapeEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '10%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/srearchShape", "list",columns, shapeFieldFilters(), updateRows, "");
}

var shapeEdit =  function(row, column, value) {
	
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	if(permission.canEdit == false){
		val += '<button class="btn btn-sm btn-primary" disabled type="button"><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditShape" type="button" id=' 
			+ row
			+ ' onclick="editShape('
			+ value
			+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}
	
	if(permission.canDelete == false){
		val += '<button class="btn btn-sm btn-danger" disabled type="button"><i class="fa fa-trash fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-danger"  type="button" id=' 
			+ row
			+ ' onclick="deleteShape('
			+ value
			+ ')" ><i class="fa fa-trash fa-1"></i> </button>';
	}
	
	return val;
}
/*onLoadDropDownEdit = function(shapeCatEs){
	$('#shapeCatE').empty().append('<option value="" selected>--Select--</option>');
$.getJSON('/OrderExecution/api/v1/stoneCategoryLOV', function(data) {
	
	 var clist = data.payload.Stonecategory;		
	     $.each(data.payload.Stonecategory, function(key, val) {
	    	 
				if (shapeCatEs == val.description) {
					 $('#shapeCatE').append('<option selected value="' + val.id + '">' + val.description + '</option>');
				} else {
					 $('#shapeCatE').append('<option value="' + val.id + '">' + val.description + '</option>');
				}	
	     });
});
}*/
//onLoadDropDownEdit();			     
var shapeCatIdE={};
var editShape = function(id) {
	$('#popupheaderlabelShape').text('Shape Master - Edit');	
	$.getJSON('/OrderExecution/api/v1/getShapeById?id=' + id, function(data) {
		var selectedRowData = data.payload.shapes;	
			
			$("#shapeIdE").val(selectedRowData.shapeId);
			$("#shapeDescE").val(selectedRowData.description);	
			$("#shapeCodeE").val(selectedRowData.code);
	    	$("#shapeCreatedByE").val(selectedRowData.createdBy);
			$("#shapeCreatedOnE").val(selectedRowData.createdDate);
			$("#shapeChangedByE").val(selectedRowData.lastChangedBy);
			$("#shapeChangedOnE").val(selectedRowData.lastChangedDate);
			
			if(selectedRowData.stoneCategoryDTOs != null){
		    	loadCategory(selectedRowData.stoneCategoryDTOs);
			}else{
				loadCategory(null);
			}
	});
}


var shapeCatArrE = [];
var loadCategory = function(category){
	shapeCatArrE = category;
	$('#shapeCatE').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/stoneCategoryLOV', function(data) {
		var catTypeE = data.payload.Stonecategory;
		console.log(catTypeE);
		var s = '<select id="shapeCatEObj"  name="shapeCatEObj" class="form-control" multiple="multiple">';
		if(catTypeE == null){
			$.each(catTypeE, function(key, val) {					
				s += '<option value="' + val.id + '">' +  + val.id+'-'+ val.description +
						+ '</option>';	
			});
		}else{
			 var result = [];
			
			 $.each(catTypeE, function(key, val) {	
				 $.each(category, function(k,v){
					 if( v.id == val.id){		
						 result.push(val.id);
						 
						 s += '<option  selected  disabled="disabled" value="' + val.id + '">'  + val.id+'-'+ val.description + '</option>';
						 
					}
				 });
				 
				 if (result.indexOf(val.id) == -1){
					 result.push(val.id);
					 s += '<option value="' + val.id + '">' + val.id+'-'+ val.description + '</option>';
				 }
				
			})
		}
		s += '</select>';
		$("#shapeCatE").html(s);
		$('#shapeCatEObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	});
}

var updateShape = function() {
	var category;
	var shapeCat = $("#shapeCatEObj").val()
	
	$.each(shapeCat,function(key,val){
		category  = {
				"id": val
			}
		shapeCatArrE.push(category);
	})
	var updateShapeE = {
		"shapeId" : $("#shapeIdE").val(),
		"code" : $("#shapeCodeE").val(),
		"description" : $("#shapeDescE").val(),
		"stoneCategoryDTOs" : shapeCatArrE,
	}
	return updateShapeE;	
};

$("#editShapeE").on('click',function(){
	var shapeDescE = $("#shapeDescE").val();
	var shapeCatE = $("#shapeCatE").val();
		if(shapeDescE == "" || shapeDescE == null){
			$.growl.error({
				message :"Please Fill Mandatory Fields !!",
				duration : 10000,
				title :'Error'
		 });
		return false;
	}
});

//Update and Save Shape
$('#shapeE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "shapeDescE": { required: true },
        "shapeCatE" : { required : true}
    },
    submitHandler: function (form) { 
    	var updateShapeTypeE = updateShape();
		if (updateShapeTypeE) {postJSON('/OrderExecution/api/v1/updateShape',JSON.stringify(updateShapeTypeE), function(data) {
			if (data.resCode == "1") {
			 $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
		$('#btnEditShape').modal('hide');
		$('#createShapeTypeM').on('hidden.bs.modal',function() {
		 $(this).find('form').trigger('reset');
			});
		shapeSearchGrid();
		}else{
		    $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
       }
	   $('#btnEditShape').modal('hide');
	 });
	}
   }  
}); 

//############### Shape Delete Functionality #################
function deleteShape(id) {
	$('#modalConfirmDel').modal('show'); 	
	$("#btnYes").on('click', function(){
	$.getJSON("/OrderExecution/api/v1/deleteShapeById?id=" + id,function(data) {
		if (data.resCode == "1") {
		$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
		});
		shapeSearchGrid();
		} else {
		  $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
	  }
		$('#btnEditShape').modal('hide');
		$('#modalConfirmDel').modal('hide');
  });
	});
}


$("#shapeSearch").on('click', function() {
	shapeSearchGrid();
	$("#jqxgrid").show();	
});

$("#clearShape").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//#################### Cut Grade Master Started ###############
var cutGradeFieldFilters = function() {
	var cgCategoryS = $("#cgCategoryS").val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (cgCategoryS != "" && cgCategoryS != null) {
		fieldFilters.fieldFilters["stoneCategory"] = cgCategoryS;
	}
	return fieldFilters;
}

$('#createCutGrade').on("click",function(){
	cutGradeModalGrid();	
	$("#jqxgridG").show();
	$('#catIdObj').multiselect("clearSelection");
})

var cutGradeModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' :'gradeNameC',
		'type' :'string'
	}, {
		'name' :'catCg',
		'type' :'long'
	}];	
	var columns = [ {
		'text'  :'Name',
		'datafield':  'gradeNameC',
		'width' : '45%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'Category',
		'datafield' : 'catCg',
		'width'  :'45%',
		sortable  :false,
		cellsalign : 'center',
		align:'center',
		editable:  false
	}, {
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
			id = $("#jqxgridG").jqxGrid('getrowid', row);
			$("#jqxgridG").jqxGrid('deleterow', id);		
		}	
	},{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridG');
	$("#jqxgridG").jqxGrid({
		width : '100%',
		rowsheight : 35,	
	});	
}

var generaterowG = function(i,gradeNameC,catIdTextArr) {
	var row = {};
	row["gradeNameC"] = gradeNameC;
	row["id"] =  catIdTextArr.id
	row["catCg"] =  catIdTextArr.label;
	return row;
} 


$('#addRowG').on('click', function(){
	var gradeNameC = $("#gradeNameC").val();
    var cgCat = $("#catIdObj").val();	
		if(gradeNameC == null || gradeNameC == "" || cgCat == null || cgCat == ""){
		$.growl.error({
			message : "please fill mandatory fields!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	var catIdTextArr = [];
	$("#catIdObj option:selected").each(function() {
		catIdTextArr.push({"id" : this.value, "label" : this.text}); 
	});	
	for(var i=0; i<catIdTextArr.length; i++){
		var datarow = generaterowG(i + 1,gradeNameC,catIdTextArr[i]);
		$("#jqxgridG").jqxGrid('addrow', null, datarow); 
	}	
});

var validateCutGrade = function() {
	var cutGradeLines = [];
	var rows = $('#jqxgridG').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		cutGradeLines.push({
		"name" : row.gradeNameC,
		"stoneCategory" : {
			"id" : row.id
		 }		
	 });
   }
  return cutGradeLines;
}

//Create Cut Grade
$('#saveCutGrade').on('click', function(){	
	trimmer();
	var gradeNameC = $("#gradeNameC").val();	
	var categoryC = $("#catIdObj").val();
		if(gradeNameC == null || gradeNameC == "" || categoryC == null || categoryC == ""){
			$.growl.error({
				message : "please fill mandatory fields!!",
				duration : 10000,
				title : 'Error'
			});
		return false;
	}
	
	var rows = $('#jqxgridG').jqxGrid('getrows');
	if(rows.length == 0){
		$.growl.error({
			message : "Grid fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	var cutGradeLines = [];
	
	var cutGradeLines = validateCutGrade();
	if (cutGradeLines) {
		postJSON('/OrderExecution/api/v1/createCutgrade',JSON.stringify(cutGradeLines),function(data) {
			if (data.resCode == "1") {										
			  $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			  $('#createCutGradeM').modal('hide'); 
				cutGradeSearchGrid();
				$("#jqxgrid").show();
			}else{
				$.growl.error({
					message :data.mesgStr,
					duration :10000,
					title : 'Error'
				});
				return false;
			} 		
     });
	     } else {
		  $.growl.error({
				message : "Please fill the compolsary field!!",
				duration : 10000
				});
	        }	
        });


function cutGradeSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long',
		'map'  : 'cutgradeId'
	}, {
		'name' : 'name',
		'type' : 'string'
	},{
		'name' : 'cat',
		'type' : 'long',
		'map' :'stoneCategory>description'
	},{
		'name' : 'actionIdG',
		'type' : 'int',
		'map' : 'cutgradeId'
	}];
	var columns = [ {
		'text' : 'Id',
		'datafield' : 'id',
		'width' : '27.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Name',
		'datafield' : 'name',
		'width' : '37.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Category',
		'datafield' : 'cat',
		'width' : '30%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	},{
		text : '',
		datafield : 'actionIdG',
		cellsrenderer : cutGradeEdit,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchCutGrade", "list",columns, cutGradeFieldFilters(), updateRows, "");
}

$("#cutGradeSearch").on('click', function() {
	cutGradeSearchGrid();
	$("#jqxgrid").show();
	
});

//############## Cut Grade Edit Started ########################
var cutGradeEdit =  function(row, column, value) {
	
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	if(permission.canEdit == false){
		val += '<button class="btn btn-sm btn-primary" disabled type="button"><i class="fa fa-pencil fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditCutGrade" type="button" id=' 
			+ row
			+ ' onclick="editCutGrade('
			+ value
			+ ')" ><i class="fa fa-pencil fa-sm"></i> </button>';
	}
	
	if(permission.canDelete == false){
		val += '<button class="btn btn-sm btn-danger" disabled type="button"><i class="fa fa-trash fa-sm"></i> </button>';
	}else{
		val += '<button class="btn btn-sm btn-danger"  type="button" id=' 
			+ row
			+ ' onclick="deleteCutGrade('
			+ value
			+ ')" ><i class="fa fa-trash fa-1"></i> </button>';
	}
	
	return val;
}

var editCutGrade = function(id) {
	$('#popupheaderlabelCG').text('Edit Cut Grade');	
	$.getJSON('/OrderExecution/api/v1/getCutgradeById?id=' + id, function(data) {
		var selectedRowData = data.payload.cutgrade;	
		var cat=selectedRowData.stoneCategory.id;
		
			$("#cutGradeIdE").val(selectedRowData.cutgradeId);
			$("#cGradeNameE").val(selectedRowData.name);	
			$("#categIdE").val(cat);
	    	$("#cgCreatedByE").val(selectedRowData.createdBy);
			$("#cgCreatedOnE").val(selectedRowData.createdOn);
			$("#cgChangedByE").val(selectedRowData.lastChangedBy);
			$("#cgChangedOnE").val(selectedRowData.lastUpadteOn);
	});
}


var updateCutGrade = function() {
	var updatecutGradeE = {
		"cutgradeId" : $("#cutGradeIdE").val(),
		"name" : $("#cGradeNameE").val(),
		"stoneCategory" : {
			"id" : $("#categIdE").val()	
		}
	}
	return updatecutGradeE;	
};

$("#editcutGradeE").on('click',function(){
	var cGradeNameE = $("#cGradeNameE").val();
	var categIdE = $("#categIdE").val();
		if(cGradeNameE == "" || cGradeNameE == null || categIdE == "" || categIdE == null){
			$.growl.error({
				message :"Please Fill Mandatory Fields !!",
				duration : 10000,
				title :'Error'
		 });
		return false;
	}
});

//Update and save Cut Grade
$('#cutGradeE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {      
        "cGradeNameE": { required: true },
        "categIdE" : { required : true}
    },
    submitHandler: function (form) { 
    	var updateCgE = updateCutGrade();
		if (updateCgE) {postJSON('/OrderExecution/api/v1/updateCutgrade',JSON.stringify(updateCgE), function(data) {
			if (data.resCode == "1") {
			 $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
		$('#btnEditCutGrade').modal('hide');
		$('#createCutGradeM').on('hidden.bs.modal',function() {
		 $(this).find('form').trigger('reset');
			});
		cutGradeSearchGrid();
		}else{
		    $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
       }
	   $('#btnEditCutGrade').modal('hide');
	 });
	}
   }  
}); 

//############### Cut Grade Delete Functionality #################
function deleteCutGrade(id) {
	$('#modalConfirmDel').modal('show'); 	
	$("#btnYes").on('click', function(){
	$.getJSON("/OrderExecution/api/v1/deleteCutGrade?id=" + id,function(data) {
		if (data.resCode == "1") {
		$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
		});
		cutGradeSearchGrid();
		} else {
		  $.growl.error({
				message : data.mesgStr,
				duration : 10000
		});
	  }
		$('#btnEditCutGrade').modal('hide');
		$('#modalConfirmDel').modal('hide');
  });
	});
}

$("#clearCutGrade").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

$.validator.addMethod("regx", function(value, element, regexp) {
	if (regexp.constructor != RegExp)
		regexp = new RegExp(regexp);
	else if (regexp.global)
		regexp.lastIndex = 0;
	return this.optional(element) || regexp.test(value);
}, "");

