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

$("#create_clearAll").on('click', function() {
	$('#createStoneVendorMasterForm').trigger("reset");
	$("#jqxgridp").jqxGrid('clear');
	$("#jqxgridp").hide();
	$("#createVendorStoneGrid").hide();
	$("#create_VendorStoneSave").hide();
});

var getGridRowCount = function()
{ 
	var count = 0;
	var rows = $('#jqxgridp').jqxGrid('getrows');
	if(rows) {count  = rows.length }
	return count; 
}

/* Add Vendor Stone Started */
function addVendorStone(data) {
	var updateRows = function(rowid, newdata, commit) {
}	

	
var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}	
	
	var datafields = [ {
		'name' : 'fromWt',
		'type' : 'double'
	}, {
		'name' : 'toWt',
		'type' : 'double'
	}, {
		'name' : 'costRange',
		'type' : 'string'
	},{
		'name' : 'costPct',
		'type' : 'double'
	}
	];

	
	var popcolumns = [ 
	{
		'text' : 'From Cost',
		'datafield' : 'fromWt',
		'width' : '350px',
		'height' : '20px',
		cellsformat : 'd2',
		columntype: 'numberinput',
		sortable : false,
		editable : false,
		cellsalign : 'right',
		align : 'center'
	},
	{
		'text' : 'To Cost',
		'datafield' : 'toWt',
		'width' : '350px',
		'height' : '20px',
		cellsformat : 'd2',
		columntype: 'numberinput',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	},
	{
		'text' : 'Wt/Cost Range',
		'datafield' : 'costRange',
		'width' : '315px',
		sortable : false,
		cellsalign : 'center',
		align : 'center',
		editable : false
	},
	{
		'text' : 'Acc Selling Rate',
		'datafield' : 'costPct',
		'width' : '255px',
		'height' : '20px',
		cellsformat : 'd2',
		columntype: 'numberinput',
		sortable : false,
		cellsalign : 'right',
		align : 'center',
		editable : true,
		initeditor: function (row, cellvalue, editor) {
            editor.jqxNumberInput({ spinButtons: false, min:0, decimalDigits: 2 }); 
        },
        validation: function (cell, value) {
            if (value <= 0) {
                return { result: false, message: "Invalid Number" };
            }
            return true;
        }
	}];

	 
	
	addGrid(datafields, popcolumns, updateRows, data, addrow, "#jqxgridp");
}
var validateFormData = function() {
	console.log("I am comming from validation grid");
	var rowscounts = getGridRowCount();
	for (i = 0; i < rowscounts; i++) {
		var datarow = $("#jqxgridp").jqxGrid('getrowdata', i);
		if(datarow.costPct == "" || datarow.costPct <=0)
			{
			return false;
			}
	}
	return true;
}
var getFormData = function() {
	    var fieldFilters = vendorStonecreateFilterValues()
	    var formdata = [];
		var rowscounts = getGridRowCount();
		for (i = 0; i < rowscounts; i++) {
			var datarow = $("#jqxgridp").jqxGrid('getrowdata', i);
			var stoneobj = {
					"costPct": datarow.costPct,
				    "fromWt": datarow.fromWt,
				    "toWt": datarow.toWt,
				    "costRange":datarow.costRange
			}
			var fieldprop;
			for (fieldprop in fieldFilters.fieldFilters) {
				stoneobj[fieldprop] = fieldFilters.fieldFilters[fieldprop];
			}
			//Adding obj to array
			formdata.push(
					stoneobj
			)
		}
	
	return formdata;
}


$("#create_VendorStoneSave").on('click', function() {
	var rowscounts = getGridRowCount();
	if(rowscounts == 0)
		{
		$.growl
		.error({
			message : "Empty grid can not be saved",
			duration : 10000
		});
		return;
		}
	if(!validateFormData())
		{
		$.growl
		.error({
			message : "Acc Selling Rate can not be empty, 0 or below",
			duration : 10000
		});
		return;
		}
	postJSON('/OrderExecution/api/v1/saveVendorStone', JSON
			.stringify(getFormData()), function(data) {
		if(data)
			{
		$.growl
		.notice({
			message : "Saved Successfully",
			duration : 10000,
			title : 'Success'
		});
		
		$('#stoneVendorMasterCreate').modal('hide');
		$("#Search").click();
			}

	});

});


$("#create_VendorStone").on(
		"click",
		function() {
			if (validateData()) {
				var fieldFilters = vendorStonecreateFilterValues()
				delete fieldFilters.fieldFilters["vendor"];
				postJSON('/OrderExecution/api/v1/createVendorStone', JSON
						.stringify(fieldFilters), function(data) {
					$("#createVendorStoneGrid").show();
					$("#create_VendorStoneSave").show();
					$("#jqxgridp").show();
					$('#jqxgridp').jqxGrid('clear');
					addVendorStone(data);
					$("#jqxgridp").jqxGrid("updatebounddata");
					
				});
			} else {
				$.growl.error({
					message : "Please fill all the mandatory fields",
					duration : 10000
				});
			}

		});


function validateData() {
	console.log('I am in validation');
	var fieldFilters = vendorStonecreateFilterValues();
	
	if (!fieldFilters.fieldFilters.hasOwnProperty('vendor') || fieldFilters.fieldFilters["vendor"] == "" || fieldFilters.fieldFilters["vendor"] == null) {
        return false;
	}
	if (!fieldFilters.fieldFilters.hasOwnProperty('stoneSegment') || fieldFilters.fieldFilters["stoneSegment"] == "" || fieldFilters.fieldFilters["stoneSegment"] == null) {
		return false;
	}
	
	if (!fieldFilters.fieldFilters.hasOwnProperty('stoneCategory') || fieldFilters.fieldFilters["stoneCategory"] == "" || fieldFilters.fieldFilters["stoneCategory"] == null) {
		return false;
	}
	if ($('#create_Show_SubCategory').is(":visible") && (!fieldFilters.fieldFilters.hasOwnProperty('subCategory') ||  fieldFilters.fieldFilters["subCategory"] == "" || fieldFilters.fieldFilters["subCategory"] == null)) {
		return false;
	}
	if ($('#create_Show_Shape').is(":visible") && (!fieldFilters.fieldFilters.hasOwnProperty('shape') ||  fieldFilters.fieldFilters["shape"] == "" || fieldFilters.fieldFilters["shape"] == null)) {
		return false;
	}
	if (!fieldFilters.fieldFilters.hasOwnProperty('stoneCode') ||  fieldFilters.fieldFilters["stoneCode"] == "" || fieldFilters.fieldFilters["stoneCode"] == null) {
		return false;
	}
	if ($('#create_showClarity').is(":visible") && (!fieldFilters.fieldFilters.hasOwnProperty('clarityVal') ||  fieldFilters.fieldFilters["clarityVal"] == "" || fieldFilters.fieldFilters["clarityVal"]  == null)) {
		return false;
	}
	if ($('#create_showActualColor').is(":visible") && (!fieldFilters.fieldFilters.hasOwnProperty('actualColorVal') ||  fieldFilters.fieldFilters["actualColorVal"]  == "" || fieldFilters.fieldFilters["actualColorVal"]  == null)) {
		return false;
	}
	if ($('#create_showColor').is(":visible") && (!fieldFilters.fieldFilters.hasOwnProperty('colorVal') ||  fieldFilters.fieldFilters["colorVal"] == "" || fieldFilters.fieldFilters["colorVal"] == null)) {
		return false;
	}
	if ($('#create_showCutGrade').is(":visible") && (!fieldFilters.fieldFilters.hasOwnProperty('cutGradeVal') ||  fieldFilters.fieldFilters["cutGradeVal"]  == "" || fieldFilters.fieldFilters["cutGradeVal"]  == null)) {
		return false;
	}
	return true;
}

function vendorStonecreateFilterValues() {
	fieldFilters = {
		"fieldFilters" : {}
	};
	
    var vendor = $('#create_vendorCode-value').val();
	var stoneSegment = $('#create_stoneSegment').val();
	var stoneCategory = $('#create_stoneCategory').val();
	var subCategory = $('#create_subCategory').val();
	var shape = $('#create_Shape').val();
	var stoneCode = $('#create_stoneCode').val();  
	var clarity = $("#create_clarity option:selected").text();
	var actualColor = $("#create_actualColor option:selected").text();
	var color =  $("#create_color option:selected").text();
	var cutGrade = $("#create_cutGrade option:selected").text();
	var uomCode =  $('#create_UOM').val();  
	fieldFilters.fieldFilters["status"] = 1;
	if (uomCode != "" && uomCode != null) {
		fieldFilters.fieldFilters["uomCode"] = uomCode;
	}
	if ($('#create_vendorCode').val() != "" && $('#create_vendorCode').val() != null) {
		fieldFilters.fieldFilters["vendor"] =  parseInt(vendor);
	}
	if (stoneSegment != "" && stoneSegment != null) {
		fieldFilters.fieldFilters["stoneSegment"] =  parseInt(stoneSegment);
	}
	
	if (stoneCategory != "" && stoneCategory != null) {
		fieldFilters.fieldFilters["stoneCategory"] =  parseInt(stoneCategory);
	}
	if ($('#create_Show_SubCategory').is(":visible") && subCategory != "" && subCategory != null) {
		fieldFilters.fieldFilters["subCategory"] = subCategory;
	}
	if ($('#create_Show_Shape').is(":visible") && shape != "" && shape != null) {
		fieldFilters.fieldFilters["shape"] =  parseInt(shape);
	}
	if (stoneCode != "" && stoneCode != null) {
		fieldFilters.fieldFilters["stoneCode"] = stoneCode;
	}
	if ($('#create_showClarity').is(":visible") && $('#create_clarity').val() != "" && $('#create_clarity').val()  != null) {
		fieldFilters.fieldFilters["clarityVal"] = clarity;
	}
	if ($('#create_showActualColor').is(":visible") && $('#create_actualColor').val()  != "" && $('#create_actualColor').val()  != null) {
		fieldFilters.fieldFilters["actualColorVal"] = actualColor;
	}
	if ($('#create_showColor').is(":visible") && $('#create_color').val() != "" && $('#create_color').val() != null) {
		fieldFilters.fieldFilters["colorVal"] = color;
	}
	if ($('#create_showCutGrade').is(":visible") && $('#create_cutGrade').val()  != "" && $('#create_cutGrade').val()  != null) {
		fieldFilters.fieldFilters["cutGradeVal"] = cutGrade;
	}
	
	return fieldFilters;
}