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

// date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});

$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});

$("#state").hide();
$("#hsncode").hide();

// On load Lov's
$('#typeS').empty().append('<option value="" selected>--Select--</option>');
$('#typeC').empty().append('<option value="" selected>--Select--</option>');
$('#typeE').empty().append('<option value="" selected>--Select--</option>');
$.getJSON('/OrderExecution/api/v1/getHsnTypeLOV', function(data) {
		$.each(data.payload.HSNType, function(key, val) {
		$('#typeS').append('<option value="' + val.id + '">' + val.description + '</option>');
		$('#typeC').append('<option code="' + val.name + '" value="' + val.id + '">' + val.description + '</option>');
		$('#typeE').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
});

$.getJSON('/OrderExecution/api/v1/metalAccountLocationLOV', function(data) {
	$('#segIdS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.sTypes, function(key, val) {
		$('#segIdS').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
});

$.getJSON('/OrderExecution/api/v1/stateLOV ', function(data) {
	$('#stateIdS').empty().append('<option value="" selected>--Select--</option>');
	$('#stateIdC').empty().append('<option value="" selected>--Select--</option>');
	var stateLov = data.payload.taxStructureMaasterLOV;
	stateLov.sort(function(a, b){
			return a.name-b.name;
		});
		$.each(stateLov, function(key, val) {
		$('#stateIdS').append('<option value="' + val.id + '">' + val.description + '</option>');
		$('#stateIdC').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
});

$("#typeS").on("change",function() {
	$('#hsnCodeS').empty().append('<option value="" selected>--Select--</option>');
	var id = $("#typeS").val();
	 $.getJSON('/OrderExecution/api/v1/getHsnMasterByHsnType?hsntypeId=' + id,function(data) {
		if (id != "") {
		$.each(data.payload.hsnmaster,function(key, val) {
			var response = val.name+"-"+val.description;
			$('#hsnCodeS').append('<option value="' + val.id + '">' + response + '</option>');
			});
		}
	});
});

$("#typeC").on("change",function() {
	$('#hsnCodeC').empty().append('<option value="" selected>--Select--</option>');
	var id = $("#typeC").val();
	 $.getJSON('/OrderExecution/api/v1/getHsnMasterByHsnType?hsntypeId=' + id,function(data) {
		if (id != "") {
			
		$.each(data.payload.hsnmaster,function(key, val) {
			var response = val.name+"-"+val.description;
			$('#hsnCodeC').append('<option value="' + val.id + '">' + response + '</option>');
			});
		}
	});
});

$("#typeE").on("change",function() {
	$('#hsnCodeE').empty().append('<option value="" selected>--Select--</option>');
	var id = $("#typeE").val();
	 $.getJSON('/OrderExecution/api/v1/getHsnMasterByHsnType?hsntypeId=' + id,function(data) {
		if (id != "") {
		$.each(data.payload.hsnmaster,function(key, val) {
			var response = val.name+"-"+val.description;
			$('#hsnCodeE').append('<option value="' + val.id + '">' + response + '</option>');
			});
		}
	});
});

//date picker functions for create
$("#fromDateC").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	 minDate : 0,
	 onSelect : function(dateStr) {
			var min = $(this).datepicker('getDate'); // Get selected date
			$("#toDateC").datepicker('option', 'minDate', min || '0'); // Set other min, default to today		
		}
});

$("#toDateC").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	//maxDate : 0,
});

$('#taxStructureCreate').on("click",function(){
	taxStructureModalGrid();	
	$("#jqxgridT").show();
})

//Generate Row 
var rowId = 0;
var generaterow = function(i) {
	var row = {};	
	row["hsnCodeC"] = $("#hsnCodeC option:selected").text();
	row["hsnCode"] = $("#hsnCodeC").val();
	row["fromDateC"] = $("#fromDateC").val();	
	row["toDateC"] = $("#toDateC").val();	
	row["descC"] = $("#descC").val();	
	row["stateIdC"] = $("#stateIdC option:selected").text();
	row["stateId"] = $("#stateIdC").val();
	row["sgstC"] = ($("#sgstC").val() == "") ? 0.00 : $("#sgstC").val(),	
	row["cgstC"] = ($("#cgstC").val() == "") ? 0.00 : $("#cgstC").val(),	
	row["igstC"] = ($("#igstC").val() == "") ? 0.00 : $("#igstC").val(),	
	row["serviceC"] = ($("#serviceC").val() == "") ? 0.00 : $("#serviceC").val(),	
	row["cessC"] =($("#cessC").val() == "") ? 0.00 : $("#cessC").val(),
	row["isReg"] = $("#isRegC").val(),
	row["isRegC"] = $("#isRegC option:selected").text(),
	rowId = rowId + 1;
	return row;
}

$('#addRow').on('click', function(){	
 var typeC = $("#typeC").val();
 var hsnCode = $("#hsnCodeC").val();
 var hsnCodeText = $("#hsnCodeC option:selected").text();
 var fromDateC = $("#fromDateC").val();
 var toDateC = $("#toDateC").val();
 var stateIdC = $("#stateIdC").val();
 var stateId = $("#stateIdC").val();
 var descC = $("#descC").val();
 var sgstC = $("#sgstC").val();
 var cgstC = $("#cgstC").val();
 var igstC = $("#igstC").val();
 var serviceC = $("#serviceC").val();
 var cessC = $("#cessC").val();
 var isRegister = $("#isRegC").val();
 var type = $("#typeC option:selected").attr('code');
 var igstVal = parseFloat(sgstC) + parseFloat(cgstC);
 
 if(typeC == null || typeC == "" || hsnCodeC == null || hsnCodeC == "" || fromDateC == null || fromDateC == ""
 		|| toDateC == null || toDateC == "" || stateIdC == null || stateIdC == "" ||descC == null || descC == "" || isRegister == ""){
 		$.growl.error({
			message : "please fill mandatory fields!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
 
 if(type == "false"){
	 if(serviceC == null || serviceC == ""){
		$.growl.error({
			message : "Please Enter Service % !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	 /*else if(sgstC != "" || cgstC != "" || igstC !=""){
		 if(igstC != igstVal){
		  $.growl.error({
				message : "IGST % Must be Equal To Sum of SGST % and CGST %",
				duration : 10000,
				title : 'Error'
			});
			return false;
	  } else{}	  
	}*/
	 else{
		 var rows = $("#jqxgridT").jqxGrid('getrows');
			console.log(rows);
			var rowData = [];
			for(var i=0; i<rows.length; i++){
				if(rows[i].hsnCodeC == hsnCodeText  && rows[i].stateId == $("#stateIdC").val() && rows[i].isReg == $("#isRegC").val()){
					$.growl.error({
						message : hsnCodeText +  " - SAC Code "+"for the State " + $("#stateIdC option:selected").text() +" already added in grid.",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}					
			}
		 $("#jqxgridT").jqxGrid('addrow', null, generaterow(rowId + 1));
	 }
 }
 
 if(type == "true"){
	 if(sgstC == null || sgstC == "" || cgstC == null || cgstC == "" || igstC == null || igstC == ""){
		$.growl.error({
			message : "Please Enter SGST % and CGST % and IGST % !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	 /*else if(igstC != igstVal){
		  $.growl.error({
				message : "IGST % Must be Equal To Sum of SGST % and CGST %",
				duration : 10000,
				title : 'Error'
			});
			return false;
	  }*/
	 else{
		 var rows = $("#jqxgridT").jqxGrid('getrows');
			var rowData = [];
			for(var i=0; i<rows.length; i++){
				if(rows[i].hsnCodeC == hsnCodeText && rows[i].stateId == $("#stateIdC").val() && rows[i].isReg == $("#isRegC").val()){
					$.growl.error({
						message : hsnCodeText +  " - HSN Code "+"for the State " + $("#stateIdC option:selected").text() +" already added in grid.",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}					
			}
			 $("#jqxgridT").jqxGrid('addrow', null, generaterow(rowId + 1));
	 }
 }
});


$('#taxStructureDetC').validate(
		{
		 errorElement : 'label',
		 errorClass : 'help-inline',
		 focusInvalid : false,
		 ignore : "",
		rules : {
			"sgstC" : {
				required : true,
				regx : /[0-9]+(\.[0-9][0-9]?)?/
			},
			"cgstC" : {
				required : true,
				regx : /[0-9]+(\.[0-9][0-9]?)?/
			},
			"igstC" : {
				required : true,
				regx : /[0-9]+(\.[0-9][0-9]?)?/
			},
			"serviceC" : {
				required : true,
				regx :/[0-9]+(\.[0-9][0-9]?)?/
			},
			"cessC" : {
				required : true,
				regx : /[0-9]+(\.[0-9][0-9]?)?/
			}
		},
		messages : {
			'sgstC' : {
				regx : "Only Numbers Are allowed!"
			},
			'cgstC' : {
				regx : "Only Numbers Are allowed!"
			},
			'igstC' : {
				regx : "Only Numbers Are allowed!"
			},
			'serviceC' : {
				regx : "Only Numbers Are allowed!"
			},
			'cessC' : {
				regx : "Only Numbers Are allowed!"
			}
		},
		submitHandler : function(form) {
			$("#jqxgridT").jqxGrid('addrow', null, generaterowCM(rowId + 1));
		}
	});

var validateTaxStructure = function() {
	var taxStructureLines = [];
	var rows = $('#jqxgridT').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		console.log(row);
		taxStructureLines.push({
		"hsnMasterDTO" : {
			"id" : row.hsnCode },
		"hsnDescription" : row.descC,
		"state" : {
			"id" : row.stateId },
		"cgst" : row.cgstC,
		"sgst" : row.sgstC,
		"igst" : row.igstC,
		"serviceTax" :row.serviceC,
		"cess" : row.cessC,
		"startDate" :row.fromDateC,
		"endDate" :row.toDateC,
		"isRegister":(row.isReg == "true") ? true:false
	 });
   }
  return taxStructureLines;
}

//Create and Save tax structure
$('#saveTaxStructure').on('click', function(){	
	trimmer();
	var rows = $('#jqxgridT').jqxGrid('getrows');
	if(rows.length == 0){
		$.growl.error({
			message : "Grid fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	var taxStructureLinesC = [];
	var taxStructureLinesC = validateTaxStructure();
	if (taxStructureLinesC) {
	postJSON('/OrderExecution/api/v1/createTaxStructure',JSON.stringify(taxStructureLinesC),function(data) {
			if (data.resCode == "1") {	
				$('#createTaxStructure').modal('hide');
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
			taxStructureSearchGrid();
			$("#jqxgrid").show();
       });
	     } else {
	    	 $.growl.error({
				message : "Please fill the Mandatory field!!",
				duration : 10000
				});
	        }	
        });

// ################# create grid  ##################
var taxStructureModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
  }
	var datafields = [ {
		'name' :'typeC',
		'type' :'string'
	}, {
		'name' :'hsnCodeC',
		'type' :'string'
	}, {
		'name' :'fromDateC',
		'type' :'date'
	}, {
		'name' :'toDateC',
		'type' :'date'
	}, {
		'name' :'stateIdC',
		'type' :'string'
	}, {
		'name' :'sgstC',
		'type' :'double'
	}, {
		'name' :'cgstC',
		'type' :'double'
	}, {
		'name' :'igstC',
		'type' :'double'
	}, {
		'name' :'serviceC',
		'type' :'double'
	}, {
		'name' :'cessC',
		'type' :'double'
	},{
		'name' :'descC',
		'type' :'string'
	}, {
		'name' :'stateId',
		'type' :'int'
	}, {
		'name' :'hsnCode',
		'type' :'string'
	},{
		'name' :'isReg',
		'type' :'string'
	},{
		'name' :'isRegC',
		'type' :'string'
	}
	];
	var columns = [ {
		'text'  :'HSN Code',
		'datafield':  'hsnCodeC',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'From Date',
		'datafield':  'fromDateC',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'To Date',
		'datafield':  'toDateC',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'State',
		'datafield':  'stateIdC',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text'  :'SGST %',
		'datafield':  'sgstC',
		'width' : '8%',
		cellsalign : 'right',
		align:'center',
		cellsformat :'d2',
		editable : false
	}, {
		'text'  :'CGST %',
		'datafield':  'cgstC',
		'width' : '8%',
		cellsalign : 'right',
		align:'center',
		cellsformat :'d2',
		editable : false
	}, {
		'text'  :'IGST %',
		'datafield':  'igstC',
		'width' : '8%',
		cellsalign : 'right',
		align:'center',
		cellsformat :'d2',
		editable : false
	}, {
		'text'  :'Service %',
		'datafield':  'serviceC',
		'width' : '8%',
		cellsalign : 'right',
		align:'center',
		cellsformat :'d2',
		editable : false
	}, {
		'text'  :'CESS %',
		'datafield':  'cessC',
		'width' : '8%',
		cellsformat :'d2',
		cellsalign : 'right',
		align:'center',
		editable : false
	},{
		'text'  :'Description',
		'datafield':  'descC',
		'width' : '10%',
		cellsformat :'d2',
		cellsalign : 'left',
		align:'center',
		editable : false,
		hidden : true
	},{
		'text'  :'State Id',
		'datafield':  'stateId',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		editable : false,
		hidden : true
	},{
		'text'  :'HSN Code',
		'datafield':  'hsnCode',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		editable : false,
		hidden : true
	},{
		'text'  :'Is Reg',
		'datafield':  'isReg',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		editable : false,
		hidden : true
	},{
		'text'  :'Is Reg',
		'datafield':  'isRegC',
		'width' : '10%',
		cellsalign : 'center',
		align:'center',
		editable : false,
		hidden : false
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
	},
	{
		'text' : 'id',
		'datafield' : 'id',
		hidden : true
	}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		console.log(rowdata);
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridT');
	$("#jqxgridT").jqxGrid({
		width : '100%',
		rowsheight : 35,	
		theme: 'energyblue',
	});	
}

var taxStructureFieldFilters = function() {
	var typeS = $('#typeS').val();
	var hsnCodeS = $("#hsnCodeS").val();
	var segIdS = $("#segIdS").val();
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var stateIdS = $("#stateIdS").val();
	var statusS = $("#statusS").val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};
	if (typeS != "" && typeS != null) {
		fieldFilters.fieldFilters["hsntype"] = typeS;
	}
	if (segIdS != "" && segIdS != null) {
		fieldFilters.fieldFilters["segment"] = segIdS;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromdate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["endDate"] = toDateS;
	}
	if (stateIdS != "" && stateIdS != null) {
		fieldFilters.fieldFilters["state"] = stateIdS;
	}
	if (hsnCodeS != "" && hsnCodeS != null) {
		fieldFilters.fieldFilters["hsncode"] = hsnCodeS;
	}
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["status"] = statusS;
	}
	return fieldFilters;
 }


// search grid started
function taxStructureSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ {
		'name' : 'type',
		'type' : 'string',
		'map'  : 'hsnMasterDTO>hsnTypeDTO>type'
	}, {
		'name' : 'hsnCode',
		'type' : 'string',
		'map'  : 'hsnMasterDTO>hsnCode'
	},{
		'name' : 'hsnDescription',
		'type' : 'string'
	},{
		'name' : 'fromDate',
		'type' : 'string',
		'map' :  'startDate'
	},{
		'name' : 'toDate',
		'type' : 'string',
		'map' :  'endDate'
	},{
		'name' : 'stateId',
		'type' : 'string',
		'map' :  'state>name'
	},{
		'name' : 'sgst',
		'type' : 'double',
	},{
		'name' : 'cgst',
		'type' : 'double'
	},{
		'name' : 'igst',
		'type' : 'double'
	},{
		'name' : 'serviceTax',
		'type' : 'double'
	},{
		'name' : 'isActive',
		'type' : 'string'
	},{
		'name' : 'cess',
		'type' : 'double'
	}, {
		'name' : 'id',
		'type' : 'int'
	}];
	var columns = [ {
		'text' : 'Type',
		'datafield' : 'type',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'HSN Code',
		'datafield' : 'hsnCode',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'HSN Description',
		'datafield' : 'hsnDescription',
		'width' : '11.5%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'From Date',
		'datafield' : 'fromDate',
		'width' : '10%',
		cellsformat : 'dd/MM/yyyy',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'To Date',
		'datafield' : 'toDate',
		'width' : '10%',
		cellsformat : 'dd/MM/yyyy',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'State',
		'datafield' : 'stateId',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'SGST %',
		'datafield' : 'sgst',
		'width' : '8%',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		cellsformat :'d2',
		editable : false
	},{
		'text' : 'CGST %',
		'datafield' : 'cgst',
		'width' : '8%',
		cellsformat :'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'IGST %',
		'datafield' : 'igst',
		'width' : '8%',
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d2',
		sortable : false,
		editable : false
	},{
		'text' : 'CESS %',
		'datafield' : 'cess',
		'width' : '8%',
		cellsformat :'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Services %',
		'datafield' : 'serviceTax',
		'width' : '8%',
		cellsformat :'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},{
		'text' : 'Status',
		'datafield' : 'isActive',
		'width' : '8%',
		cellsformat :'d2',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false,
		hidden : true
	},{
		text : '',
		datafield : 'id',
		editable : false,
		cellsrenderer : taxStructureEdit,
		cellsalign : 'center',
		align : 'center',
		filterable: false,
		sortable : false,
		'width' : '2.5%'
	}];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchTaxStructure", "list",columns, taxStructureFieldFilters(), updateRows, "");
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

$("#searchTaxStruc").on('click', function() {
	var type = $("#typeS").val();
	if(type == "" || type == null){
		$.growl.error({
			message : "Please Select Mandatory Fields",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	else{
	taxStructureSearchGrid();
	$("#jqxgrid").show();
	}
});

//############### Tax Structure Edit Started ########################
//date picker functions for edit
$("#fromDateE").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	minDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateE").datepicker('option', 'minDate', min || '0');
    }
});

$("#toDateE").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});

$("#types").hide();
$("#editId").hide();
var taxStructureEdit = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
		var status = $('#jqxgrid').jqxGrid('getcellvalue', row, 'isActive');
		if(status =="Active"){
		var editVal= '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditTaxStr" type="button" id='
				+ row
				+ ' onclick="editTaxStr('
				+ value
				+ ')"/><i class="fa fa-pencil fa-sm"></i></button>'
		}else{
			var editVal = '<button disabled class="btn btn-sm btn-primary" type="button"><i class="fa fa-pencil fa-sm"></i></button>';
		
		}
		return editVal;
	}
}


var editTaxStr = function(id) {
	$('#popupheaderlabel').text('Edit Tax Structure');
	$.getJSON('/OrderExecution/api/v1/getTaxStructById?taxId=' + id, function(data) {
		var selectedRowData = data.payload.TaxStructure;
		$("#idE").val(selectedRowData.id);
		var res = selectedRowData.hsnMasterDTO.hsnCode +"-"+selectedRowData.hsnMasterDTO.hsnDescription;
		$("#hsnCodeE").val(res);
		$("#hsnCode").val(selectedRowData.hsnMasterDTO.id);
		$("#typeE").val(selectedRowData.hsnMasterDTO.hsnTypeDTO.description);
		$("#type").val(selectedRowData.hsnMasterDTO.hsnTypeDTO.isHsn);
		$("#stateId").val(selectedRowData.state.id);
		$("#stateIdE").val(selectedRowData.state.name);
		$("#descE").val(selectedRowData.hsnDescription);	
		$("#sgstE").val(selectedRowData.sgst);
		$("#cgstE").val(selectedRowData.cgst);
		$("#igstE").val(selectedRowData.igst);
		$("#serviceE").val(selectedRowData.serviceTax);
		$("#cessE").val(selectedRowData.cess);
    	$("#fromDateE").val(selectedRowData.startDate);
		$("#toDateE").val(selectedRowData.endDate);
		
		if(selectedRowData.isRegister == true){
			$("#isRegE").val("Yes");
		}else{
			$("#isRegE").val("No");
		}
	});	
}

var updateTaxStructure = function() {
	var updateTaxStr = {
			"id": $("#idE").val(),
			  "hsnMasterDTO": {
			    "id": $("#hsnCode").val()
			  },
			  "hsnDescription":$("#descE").val(),
			  "state": {
			    "id": $("#stateId").val()
			  },
			  "cgst": ($("#cgstE").val() == "") ? 0.00 : $("#cgstE").val(),
			  "sgst": ($("#sgstE").val() == "") ? 0.00 : $("#sgstE").val(),
			  "igst": ($("#igstE").val() == "") ? 0.00 : $("#igstE").val(),
			  "serviceTax": ($("#serviceE").val() == "") ? 0.00 : $("#serviceE").val(),
			  "cess": ($("#cessE").val() == "") ? 0.00 : $("#cessE").val(),
			  "startDate": $("#fromDateE").val(),
			  "endDate": $("#toDateE").val(),
			  "isRegister": ($("#isRegE").val() == "Yes") ? true : false
	  }
	return updateTaxStr;
};

//Update and save Tax Structure
$('#taxStructureE').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules : {
		"sgstE" : {
			//required : true,
			regx : /[0-9]+(\.[0-9][0-9]?)?/
		},
		"cgstE" : {
			//required : true,
			regx : /[0-9]+(\.[0-9][0-9]?)?/
		},
		"igstE" : {
			//required : true,
			regx : /[0-9]+(\.[0-9][0-9]?)?/
		},
		"serviceE" : {
			//required : true,
			regx : /[0-9]+(\.[0-9][0-9]?)?/
		},
		"cessE" : {
			//required : true,
			regx : /[0-9]+(\.[0-9][0-9]?)?/
		}
	},
	messages : {
		'sgstE' : {
			regx : "Only Numbers Are allowed!"
		},
		'cgstE' : {
			regx : "Only Numbers Are allowed!"
		},
		'igstE' : {
			regx : "Only Numbers Are allowed!"
		},
		'serviceE' : {
			regx : "Only Numbers Are allowed!"
		},
		'cessE' : {
			regx : "Only Numbers Are allowed!"
		},
	},
    submitHandler: function (form) { 
    	trimmer();
    	var updateTaxStrE = updateTaxStructure();
			if (updateTaxStrE) {postJSON('/OrderExecution/api/v1/updateTaxStructure',JSON.stringify(updateTaxStrE), function(data) {
				if (data.resCode == "1") {
					taxStructureSearchGrid();
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#btnEditTaxStr').modal('hide');
					$('#createTaxStructure').on('hidden.bs.modal',function() {
						$(this).find('form').trigger('reset');
				});					
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
				}
				$('#btnEditTaxStr').modal('hide');
			});
		}
   }  
});  

$("#toDateE").on('change',function(){
	var fDate = $("#fromDateE").val();
	var tDate = $("#toDateE").val();
	 if (Date.parse(tDate) < Date.parse(fDate)) {
		 $.growl.error({
				message : "To Date Cannot be Less than From Date!!",
				duration : 10000,
				title : 'Error'
			});
		 return false;
	  }
});


$("#editTaxStructureE").on('click',function(){
	var fromDate = $("#fromDateE").val();
	var toDate = $("#toDateE").val();
	var  descE = $("#descE").val();
	var  sgstE = $("#sgstE").val();
	var  cgstE = $("#cgstE").val();
	var  igstE = $("#igstE").val();
	var  serviceE = $("#serviceE").val();
	var  cessE = $("#cessE").val();
	var  type = $("#type").val();
    var igstEVal = parseFloat(sgstE) + parseFloat(cgstE);
    if(toDate == null || toDate == "" || descE == null || descE == ""){
 		$.growl.error({
			message : "please fill mandatory fields!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	if(type == "false"){
		//alert(type);
		 if(serviceE == null || serviceE == ""){
			$.growl.error({
				message : "Please Enter Service % !!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
		/* else if(sgstE != "" || cgstE != "" || igstE !=""){
			 if(igstE != igstEVal){
			  $.growl.error({
					message : "IGST % Must be Equal To Sum of SGST % and CGST %",
					duration : 10000,
					title : 'Error'
				});
				return false;
		  } else{}	  
		}*/
		 else{
		 }
	 }
	 if(type == "true"){
		// alert(type);
		 if(sgstE == null || sgstE == "" || cgstE == null || cgstE == "" || igstE == null || igstE == ""){
			$.growl.error({
				message : "Please Enter SGST % and CGST % and IGST % !!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
		/* else if(igstE != igstEVal){
			  $.growl.error({
					message : "IGST % Must be Equal To Sum of SGST % and CGST %",
					duration : 10000,
					title : 'Error'
				});
				return false;
		  }*/
		 else{
		 }
	 }	
});

//Export functionality
$("#exportTaxStruc").on("click",function() {
		var data;
		var typeS = $('#typeS').val();
		var hsnCodeS = $("#hsnCodeS").val();
		var segIdS = $("#segIdS").val();
		var fromDateS = $("#fromDateS").val();
		var toDateS = $("#toDateS").val();
		var stateIdS = $("#stateIdS").val();
		var statusS = $("#statusS").val();
		var fieldFilters = taxStructureFieldFilters();
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
							var newData = [];					
					postJSON('/OrderExecution/api/v1/exportTaxStructure',JSON.stringify(fieldFilters),function(response) {
						data = response.payload.list;
							for (i = 0; i < data.length; i++) {
								newData.push({	
									'Type' : (data[i].hsnMasterDTO != null) ? data[i].hsnMasterDTO.hsnTypeDTO.type : "",
									'HSN Code' : (data[i].hsnMasterDTO != null) ? data[i].hsnMasterDTO.hsnCode : "",
									'HSN Description' : (data[i].hsnDescription != null) ? data[i].hsnDescription : "",
								    'From Date' : (data[i].startDate != null) ? data[i].startDate: "",
								    'To Date' : (data[i].endDate != null) ? data[i].endDate : "",
								    'State Id' : (data[i].state != null) ? data[i].state.name : "",
								    'SGST %' : (data[i].sgst != null) ? data[i].sgst : "",		 
								    'CGST %' : (data[i].cgst != null) ? data[i].cgst : "",
								    'IGST %' : (data[i].igst != null) ? data[i].igst : "",
								    'Service %' : (data[i].serviceTax != null) ? data[i].serviceTax : "",
								    'CESS %' : (data[i].cess != null) ? data[i].cess : "",
								    'Status' : (data[i].isActive != null) ? data[i].isActive : "",
								    'Registered/Unregistered' : (data[i].isActive != null) ? ((data[i].isRegister == false) ? "No" : "Yes") : "" ,
								});
							}
							//JSONToCSVConvertor(newData, "Tax Structure" + "_" + sysdate, true);
							 var opts = [{sheetid:'Tax_Structure',header:true}];
		                     var res = alasql('SELECT * INTO XLSX("Tax Structure_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

$("#clearAll").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();	
	window.location.href="javascript:showContentPage('taxStructure', 'bodySwitcher')"
});

$.validator.addMethod("regx", function(value, element, regexp) {
	if (regexp.constructor != RegExp)
		regexp = new RegExp(regexp);
	else if (regexp.global)
		regexp.lastIndex = 0;
	return this.optional(element) || regexp.test(value);
}, "");


$('#btnEditTaxStr').on('hidden.bs.modal', function() {
	$("form").trigger("reset");
});

$('#createTaxStructure').on('hidden.bs.modal', function() {
	$("form").trigger("reset");
});