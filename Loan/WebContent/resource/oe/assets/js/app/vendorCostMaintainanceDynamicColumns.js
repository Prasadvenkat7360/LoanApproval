/**
 * All grid data field declarations
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

var header_datafields = [ {
	'name' : 'vendorId',
	'type' : 'long'
}, {
	'name' : 'metalBasicPurity',
	'type' : 'float'
}, {
	'name' : 'metalBasicPurchaseRate',
	'type' : 'float'
}, {
	'name' : 'meltingPurity',
	'type' : 'float'
}, {
	'name' : 'costMcPer',
	'type' : 'float'
}, {
	'name' : 'costWastagePer',
	'type' : 'float'
}, {
	'name' : 'metalRateForPurity',
	'type' : 'float'
}, {
	'name' : 'costWastagePGM',
	'type' : 'float'
}, {
	'name' : 'costMCIncremental',
	'type' : 'float'
}, {
	'name' : 'vaId',
	'type' : 'long'
}, {
	'name' : 'vadId',
	'type' : 'long'
} ];

var common_datafields = [ {
	'name' : 'useCase',
	'type' : 'int'
}, {
	'name' : 'articleMasterId',
	'type' : 'long'
}, {
	'name' : 'articleCode',
	'type' : 'string'
}, {
	'name' : 'vendorCode',
	'type' : 'long'
}, {
	'name' : 'segment',
	'type' : 'string'
}, {
	'name' : 'jewelType',
	'type' : 'string'
}, {
	'name' : 'category',
	'type' : 'string'
}, {
	'name' : 'subCategory',
	'type' : 'string'
}, {
	'name' : 'skinPurity',
	'type' : 'float'
} ];

var FromToWTcost_datafields = [ {
	'name' : 'fromWtCost',
	'type' : 'float'
}, {
	'name' : 'toWtCost',
	'type' : 'float'
} ];

var ExpectedWt_datafield = [ {
	'name' : 'expectedWt',
	'type' : 'float'
} ];

var MakingChargesType_datafield = [ {
	'name' : 'makingChargeType',
	'type' : 'string'
} ];

var MakingCharge_datafield = [ {
	'name' : 'makingCharge',
	'type' : 'float'
} ];

var WastageType_datafield = [ {
	'name' : 'wastageType',
	'type' : 'string'
} ];

var Wastage_datafield = [ {
	'name' : 'wastage',
	'type' : 'float'
} ];

var MCWPergm_datafield = [ {
	'name' : 'mcwPerGm',
	'type' : 'float'
} ];

var IncrementalValue_datafield = [ {
	'name' : 'incrementalVal',
	'type' : 'float'
} ];

var MUPType_datafield = [ {
	'name' : 'mupType',
	'type' : 'string'
}];

var TableRef_datafield = [ {
	'name' : 'tableRef',
	'type' : 'string'
} ];

var ActiveFlag_datafield = [ {
	'name' : 'activeFlag',
	'type' : 'bool'
} ];

var Checkbox_datafield = [ {
	'name' : 'selectionStatus',
	'type' : 'bool'
} ];

/**
 * All grid columns declarations
 */
function CommonColumns() {
	return CommonColumnsNew('60px', '80px', '60px', '75px', '60px', '100px',
			'60px');
}

function CommonColumnsNew(vc_w, ac_w, s_w, jt_w, c_w, sc_w, sp_w) {
	var common_columns = [ {
		'text' : 'Use Case',
		'datafield' : 'useCase',
		'width' : '0px',
		hidden : true
	}, {
		'text' : 'Article Master Id',
		'datafield' : 'articleMasterId',
		'width' : '0px',
		hidden : true
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		'width' : vc_w,
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Article Code',
		'datafield' : 'articleCode',
		'width' : ac_w,
		sortable : false,
		cellsalign : 'center',
		align:'center',
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : s_w,
		sortable : false,
		editable : false
	}, {
		'text' : 'Jewel Type',
		'datafield' : 'jewelType',
		'width' : jt_w,
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Category',
		'datafield' : 'category',
		'width' : c_w,
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Sub Category',
		'datafield' : 'subCategory',
		'width' : sc_w,
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Skin Purity',
		'datafield' : 'skinPurity',
		'width' : sp_w,
		cellsalign : 'right',
		align:'center',
		sortable : false,
		editable : false,
		cellsformat : 'd2'
	} ];
	return common_columns;
}

function FromToWTcostColumns(width) {
	var FromToWTcost_columns = [ {
		'text' : 'From Wt/cost',
		'datafield' : 'fromWtCost',
		'width' : width,
		cellsalign : 'right',
		align:'center',
		sortable : false,
		editable : true,
		cellsformat : 'd3',
		columntype : 'numberinput',
		initeditor : function(row, cellvalue, editor) {
			editor.jqxNumberInput({
				decimalDigits : 3,
				min : 0.000
			});
		},
		validation : function(cell, value) {
			if (value < 0) {
				return {
					result : false,
					message : "Invalid Weight"
				};
			}
			return true;
		},
		cellvaluechanging : function(row, datafield, columntype, oldvalue,
				newvalue) {
			$("#edit").prop('disabled', false);
		}
	}, {
		'text' : 'To Wt/ Cost',
		'datafield' : 'toWtCost',
		'width' : width,
		cellsalign : 'right',
		align:'center',
		sortable : false,
		editable : true,
		cellsformat : 'd3',
		columntype : 'numberinput',
		initeditor : function(row, cellvalue, editor) {
			editor.jqxNumberInput({
				decimalDigits : 3,
				min : 0.000
			});
		},
		validation : function(cell, value) {
			if (value < 0) {
				return {
					result : false,
					message : "Invalid Weight"
				};
			}
			return true;
		},
		cellvaluechanging : function(row, datafield, columntype, oldvalue,
				newvalue) {
			$("#edit").prop('disabled', false);
		}
	} ];
	return FromToWTcost_columns;
}

function ExpectedWtColumns(width) {
	var ExpectedWt_columns = [ {
		'text' : 'Expected Wt',
		'datafield' : 'expectedWt',
		'width' : width,
		cellsalign : 'right',
		align:'center',
		sortable : false,
		editable : true,
		cellsformat : 'd3',
		columntype : 'numberinput',
		initeditor : function(row, cellvalue, editor) {
			editor.jqxNumberInput({
				decimalDigits : 3,
				min : 0.000
			});
		},
		validation : function(cell, value) {
			console.log(cell.row);
			var fromWtCost = $('#jqxgrid').jqxGrid('getcellvalue', cell.row, "fromWtCost");
			var toWtCost = $('#jqxgrid').jqxGrid('getcellvalue', cell.row, "toWtCost");
			
			if(value < fromWtCost){
				$.growl.error({
					message : "Value should be in between From and To Wt.!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
			
			if(value > toWtCost){
				$.growl.error({
					message : "Value should be in between From and To Wt.!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
			return true;
			
		},
		
		cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue) {

			var useCase = $('#jqxgrid').jqxGrid('getcellvalue', row, "useCase");

			if (useCase == 3) {
				uc3_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						oldvalue, newvalue, null, null);
			} else if (useCase == 4) {
				uc4_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						oldvalue, newvalue, null, null);
			} else if (useCase == 5) {
				uc5_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						newvalue, null, null);
			} else if (useCase == 6) {
				uc6_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						newvalue, null, null);
			} else if (useCase == 7) {
				uc7_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						newvalue, null, null);
			}
		}
	} ];
	return ExpectedWt_columns;
}

function MakingChargesTypeColumn(width) {
	var MakingChargesType_column = [ {
		'text' : 'Making Charges Type',
		'datafield' : 'makingChargeType',
		'width' : width,
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	} ];
	return MakingChargesType_column;
}

function MakingChargeColumn(editable) {
	var MakingCharge_column = [ {
		'text' : 'Making Charge',
		'datafield' : 'makingCharge',
		'width' : '60px',
		cellsalign : 'right',
		align:'center',
		sortable : false,
		editable : editable,
		cellsformat : 'd2',
		columntype : 'numberinput',
		cellvaluechanging : function(row, datafield, columntype, oldvalue,newvalue) {

			var useCase = $('#jqxgrid').jqxGrid('getcellvalue', row, "useCase");

			if (useCase == 1 || useCase == 2) {
				var wastage = $('#jqxgrid').jqxGrid('getcellvalue', row,"wastage");

				var mcwPerGm = null;

				if (useCase == 1) {
					mcwPerGm = uc11_MCWPerGm(newvalue);
				} else if (useCase == 2) {
					var metalRateForPurity = $('#metalRateForPurity').val();

					mcwPerGm = uc2_MCWPerGm(newvalue, metalRateForPurity,wastage);
				}

				$("#jqxgrid").jqxGrid('setcellvalue', row, "mcwPerGm", mcwPerGm);
				uc7_computeMcwPerGmIncrementalVal(row, datafield, columntype,null, newvalue, null);
			} else if (useCase == 3) {
				uc3_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						null, null, oldvalue, newvalue);
			} else if (useCase == 5) {
				uc5_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						null, newvalue, null);
			} else if (useCase == 6) {
				uc6_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						null, newvalue, null);
			} else if (useCase == 7) {
				uc7_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						null, newvalue, null);
			}
			$("#edit").prop('disabled', false);
		}
	} ];
	return MakingCharge_column;
}

function WastageTypeColumn(width) {
	var WastageType_column = [ {
		'text' : 'Wastage Type',
		'datafield' : 'wastageType',
		'width' : width,
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false
	} ];
	return WastageType_column;
}

function WastageColumn(width) {
	return WastageColumn(width, false);
}

function WastageColumn2(width) {
	return WastageColumn(width, false);
}


function WastageColumn(width, editable) {
	var Wastage_column = [ {
		'text' : 'Wastage Per Pc/%',
		'datafield' : 'wastage',
		'width' : width,
		cellsalign : 'right',
		align:'center',
		sortable : false,
		editable : editable,
		cellsformat : 'd2',	
		cellvaluechanging : function(row, datafield, columntype, oldvalue,
				newvalue) {
				 var mcValue = $('#jqxgrid').jqxGrid('getcellvalue', row, 'makingCharge');
				 var mcWastage = mcValue + newvalue ;
			     $('#jqxgrid').jqxGrid('setcellvalue', row,"mcwPerGm", mcWastage);
			     
			var useCase = $('#jqxgrid').jqxGrid('getcellvalue', row, "useCase");
			if (useCase == 4) {
				uc4_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						null, null, oldvalue, newvalue);
			} else if (useCase == 5) {
				uc5_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						null, null, newvalue);
			} else if (useCase == 6) {
				uc6_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						null, null, newvalue);
			} else if (useCase == 7) {
				uc7_computeMcwPerGmIncrementalVal(row, datafield, columntype,
						null, null, newvalue);
			}
			$("#edit").prop('disabled', false);
		}
	} ];
	return Wastage_column;
}

function MCWPergmColumn(width) {
	var MCWPergm_column = [ {
		'text' : 'MC+W Per gm',
		'datafield' : 'mcwPerGm',
		'width' : width,
		cellsalign : 'right',
		align:'center',
		sortable : false,
		editable : false,
		cellsformat : 'd2'
	} ];
	return MCWPergm_column;
}

function IncrementalValueColumn(width) {
	var IncrementalValue_column = [ {
		'text' : 'Incremental Value (Cost MC+W)',
		'datafield' : 'incrementalVal',
		'width' : width,
		cellsalign : 'right',
		align:'center',
		sortable : false,
		editable : false,
		cellsformat : 'd2'
	} ];
	return IncrementalValue_column;
}

var getMupDropdownList = function(row, cellvalue, editor) {
	editor.on('click', function(){
		$.getJSON('/OrderExecution/api/v1/getMupTypes ', function(data) {
				editor.jqxDropDownList({source : data.payload.mupTypes,displayMember : 'description',valueMember : 'id'});
		});
	});
}
function MUPTypeColumn(width) {
	var MUPType_column = [ {
		'text' : 'MUP Type',
		'datafield' : 'mupTypeId',
		'width' : width,
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : true,
		displayfield : 'mupType',
		columntype : 'dropdownlist',
		createeditor :getMupDropdownList,
		cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
			$("#jqxgrid").jqxGrid('setcellvalue', row, "mupTypeId",	newvalue.value);
		//	$("#jqxgrid").jqxGrid('setcellvalue', row, "mupType",	newvalue.label);
		
				$("#edit").prop('disabled', false);
		}
	} ];
	return MUPType_column;
}

function TableRefColumn(tableRefs, width) {
	 var TableRef_column = [ {
	  text : 'Table Ref.',
	  datafield : 'tableRef',
	  'width' : width,
	  cellsalign : 'center',
		align:'center',
	  columntype : 'dropdownlist',
	  displayfield : 'tableRef',
	  'sortable' : false,
	  editable : true,
	  selectionmode: 'singlecell',
	  createeditor : function(row, value, editor) {
			editor.jqxDropDownList({
				source : tableRefs,
				displayMember : 'name',
				valueMember : 'name'
			});
	  },
		cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
			$("#jqxgrid").jqxGrid('setcellvalue', row, "tableRef",	newvalue.value);
			$("#jqxgrid").jqxGrid('setcellvalue', row, "tableRef",	newvalue.label);
		
				$("#edit").prop('disabled', false);
		}
	 } ];
	 return TableRef_column;
}

function ActiveFlagColumn(width) {
	var ActiveFlag_column = [ {
		'text' : 'Active Flag',
		'datafield' : 'activeFlag',
		'width' : width,
		sortable : false,
		editable : true,
		columntype : 'checkbox',
		renderer : function() {
			return '<div style="margin-left: 3px; margin-top: 15px;">Active Flag</div>';
		}
	} ];
	return ActiveFlag_column;
}

function CheckBoxColumn(width) {
	var CheckBox_column = [ {
		text : '',
		menu : false,
		sortable : false,
		datafield : 'selectionStatus',
		columntype : 'checkbox',
		width : width,
		editable : true,
		cellvaluechanging : function(row, datafield, columntype, oldvalue,
				newvalue) {
			if (newvalue) {
				$("#jqxgrid").jqxGrid('selectrow', row);
			} else {
				$("#jqxgrid").jqxGrid('unselectrow', row);
			}
		},
		renderer : function() {
			return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
		}
	} ];
	return CheckBox_column;
}

/**
 * 
 * @returns {Array}
 */

var tableRefs;
var vcmMode;

function passRequiredData(tableRefs, vcmMode) {
	this.tableRefs = tableRefs;
	this.vcmMode = vcmMode;
}

function add(destination, source) {
	$.each(source, function(key, jsonObj) {
		destination.push(jsonObj);
	});
}

// Vendor Cost Example 1. MC per gm.
function datafieldsForUC1() {
	var datafields = [];

	add(datafields, header_datafields);
	add(datafields, common_datafields);
	add(datafields, FromToWTcost_datafields);
	add(datafields, MakingChargesType_datafield);
	add(datafields, MakingCharge_datafield);
	add(datafields, WastageType_datafield);
//	add(datafields, Wastage_datafield);
	add(datafields, MCWPergm_datafield);
	add(datafields, IncrementalValue_datafield);
	add(datafields, MUPType_datafield);
	add(datafields, TableRef_datafield);
	add(datafields, Checkbox_datafield);

	return datafields;
}

function columnsForUC1() {
	var columns = [];

	add(columns, CommonColumns());
	add(columns, FromToWTcostColumns('80px'));
	add(columns, MakingChargesTypeColumn('100px'));
	add(columns, MakingChargeColumn(true));
	add(columns, WastageTypeColumn('75px'));
//	add(columns, WastageColumn('60px'));
	add(columns, MCWPergmColumn('120px'));
	add(columns, IncrementalValueColumn('80px'));
	add(columns, MUPTypeColumn('70px'));
	add(columns, TableRefColumn(tableRefs, '80px'));
	add(columns, CheckBoxColumn(30));

	return columns;
}

// Vendor Cost Example 2. MC per gm & Wastage % on skin purity
function datafieldsForUC2() {
	var datafields = [];
	add(datafields, header_datafields);
	add(datafields, common_datafields);
	add(datafields, FromToWTcost_datafields);
	add(datafields, MakingChargesType_datafield);
	add(datafields, MakingCharge_datafield);
	add(datafields, WastageType_datafield);
	add(datafields, Wastage_datafield);
	add(datafields, MCWPergm_datafield);
	add(datafields, IncrementalValue_datafield);
	add(datafields, MUPType_datafield);
	add(datafields, TableRef_datafield);
	add(datafields, Checkbox_datafield);

	return datafields;
}

function columnsForUC2(mcChargeType, wasteChargeType) {
	var columns = [];

	add(columns, CommonColumns());
	add(columns, FromToWTcostColumns('80px'));
	add(columns, MakingChargesTypeColumn('100px'));
	if (mcChargeType == "MCPerGrmOnSkinPurity" 	&& wasteChargeType == "WastageOnSkinPurity"){
		add(columns, MakingChargeColumn(false));
	}else{
		add(columns, MakingChargeColumn(true));
	}
	add(columns, WastageTypeColumn('100px'));
	if (mcChargeType == "MCPerGrmOnSkinPurity" 	&& wasteChargeType == "WastageOnSkinPurity"){
		add(columns, WastageColumn2('70px'));
	}else{
		add(columns, WastageColumn('70px'));
	}
	add(columns, MCWPergmColumn('70px'));
	add(columns, IncrementalValueColumn('100px'));
	add(columns, MUPTypeColumn('70px'));
	add(columns, TableRefColumn(tableRefs, '80px'));
	add(columns, CheckBoxColumn(35));

	return columns;
}

// Vendor Cost Example 3.MC Per Piece
function datafieldsForUC3() {
	var datafields = [];

	add(datafields, header_datafields);
	add(datafields, common_datafields);
	add(datafields, FromToWTcost_datafields);
	add(datafields, ExpectedWt_datafield);
	add(datafields, MakingChargesType_datafield);
	add(datafields, MakingCharge_datafield);
	add(datafields, WastageType_datafield);
	add(datafields, Wastage_datafield);
	add(datafields, MCWPergm_datafield);
	add(datafields, IncrementalValue_datafield);
	add(datafields, MUPType_datafield);
	add(datafields, TableRef_datafield);
	add(datafields, Checkbox_datafield);

	return datafields;
}

function columnsForUC3() {
	var columns = [];

	add(columns, CommonColumns());
	add(columns, FromToWTcostColumns('80px'));
	add(columns, ExpectedWtColumns('70px'));
	add(columns, MakingChargesTypeColumn('100px'));
	add(columns, MakingChargeColumn(true));
	add(columns, WastageTypeColumn('75px'));
	add(columns, WastageColumn2('60px'));
	add(columns, MCWPergmColumn('60px'));
	add(columns, IncrementalValueColumn('80px'));
	add(columns, MUPTypeColumn('70px'));
	add(columns, TableRefColumn(tableRefs, '80px'));
	add(columns, CheckBoxColumn(30));

	return columns;
}

// Vendor Cost Example 4. Wastage Per Pc on Skin Purity
function datafieldsForUC4() {
	var datafields = [];

	add(datafields, header_datafields);
	add(datafields, common_datafields);
	add(datafields, FromToWTcost_datafields);
	add(datafields, ExpectedWt_datafield);
	add(datafields, MakingChargesType_datafield);
	add(datafields, MakingCharge_datafield);
	add(datafields, WastageType_datafield);
	add(datafields, Wastage_datafield);
	add(datafields, MCWPergm_datafield);
	add(datafields, IncrementalValue_datafield);
	add(datafields, MUPType_datafield);
	add(datafields, TableRef_datafield);
	add(datafields, Checkbox_datafield);

	return datafields;
}

function columnsForUC4() {
	var columns = [];

	add(columns, CommonColumns());
	add(columns, FromToWTcostColumns('80px'));
	add(columns, ExpectedWtColumns('70px'));
	add(columns, MakingChargesTypeColumn('100px'));
	add(columns, MakingChargeColumn(false));
	add(columns, WastageTypeColumn('75px'));
	add(columns, WastageColumn('60px', true));
	add(columns, MCWPergmColumn('60px'));
	add(columns, IncrementalValueColumn('80px'));
	add(columns, MUPTypeColumn('70px'));
	add(columns, TableRefColumn(tableRefs, '80px'));
	add(columns, CheckBoxColumn(30));

	return columns;
}

// Vendor Cost Example 5. Wastage Per pair
function datafieldsForUC5() {
	var datafields = [];

	add(datafields, header_datafields);
	add(datafields, common_datafields);
	add(datafields, FromToWTcost_datafields);
	add(datafields, ExpectedWt_datafield);
	add(datafields, MakingChargesType_datafield);
	add(datafields, MakingCharge_datafield);
	add(datafields, WastageType_datafield);
	add(datafields, Wastage_datafield);
	add(datafields, MCWPergm_datafield);
	add(datafields, IncrementalValue_datafield);
	add(datafields, MUPType_datafield);
	add(datafields, TableRef_datafield);
	add(datafields, Checkbox_datafield);

	return datafields;
}

function columnsForUC5() {
	var columns = [];

	add(columns, CommonColumns());
	add(columns, FromToWTcostColumns('80px'));
	add(columns, ExpectedWtColumns('70px'));
	add(columns, MakingChargesTypeColumn('100px'));
	add(columns, MakingChargeColumn(false));
	add(columns, WastageTypeColumn('75px'));
	add(columns, WastageColumn('60px', true));
	add(columns, MCWPergmColumn('60px'));
	add(columns, IncrementalValueColumn('80px'));
	add(columns, MUPTypeColumn('70px'));
	add(columns, TableRefColumn(tableRefs, '80px'));
	add(columns, CheckBoxColumn(30));

	return columns;
}

// Vendor Cost Example 6. MC & Wastage Per Pc on Skin Purity
function datafieldsForUC6() {
	var datafields = [];

	add(datafields, header_datafields);
	add(datafields, common_datafields);
	add(datafields, FromToWTcost_datafields);
	add(datafields, ExpectedWt_datafield);
	add(datafields, MakingChargesType_datafield);
	add(datafields, MakingCharge_datafield);
	add(datafields, WastageType_datafield);
	add(datafields, Wastage_datafield);
	add(datafields, MCWPergm_datafield);
	add(datafields, IncrementalValue_datafield);
	add(datafields, MUPType_datafield);
	add(datafields, TableRef_datafield);
	add(datafields, Checkbox_datafield);

	return datafields;
}

function columnsForUC6() {
	var columns = [];

	add(columns, CommonColumns());
	add(columns, FromToWTcostColumns('80px'));
	add(columns, ExpectedWtColumns('70px'));
	add(columns, MakingChargesTypeColumn('100px'));
	add(columns, MakingChargeColumn(true));
	add(columns, WastageTypeColumn('75px'));
	add(columns, WastageColumn('60px', true));
	add(columns, MCWPergmColumn('60px'));
	add(columns, IncrementalValueColumn('80px'));
	add(columns, MUPTypeColumn('70px'));
	add(columns, TableRefColumn(tableRefs, '80px'));
	add(columns, CheckBoxColumn(30));

	return columns;
}

// Vendor Cost Example 7. MC & Wastage Per Pair on Skin Purity
function datafieldsForUC7() {
	var datafields = [];

	add(datafields, header_datafields);
	add(datafields, common_datafields);
	add(datafields, FromToWTcost_datafields);
	add(datafields, ExpectedWt_datafield);
	add(datafields, MakingChargesType_datafield);
	add(datafields, MakingCharge_datafield);
	add(datafields, WastageType_datafield);
	add(datafields, Wastage_datafield);
	add(datafields, MCWPergm_datafield);
	add(datafields, IncrementalValue_datafield);
	add(datafields, MUPType_datafield);
	add(datafields, TableRef_datafield);
	add(datafields, Checkbox_datafield);

	return datafields;
}

function columnsForUC7() {
	var columns = [];

	add(columns, CommonColumns());
	add(columns, FromToWTcostColumns('80px'));
	add(columns, ExpectedWtColumns('70px'));
	add(columns, MakingChargesTypeColumn('100px'));
	add(columns, MakingChargeColumn(true));
	add(columns, WastageTypeColumn('75px'));
	add(columns, WastageColumn('60px', true));
	add(columns, MCWPergmColumn('60px'));
	add(columns, IncrementalValueColumn('80px'));
	add(columns, MUPTypeColumn('70px'));
	add(columns, TableRefColumn(tableRefs, '80px'));
	add(columns, CheckBoxColumn(30));

	return columns;
}

// Vendor Cost Example 8. Total Cost
function datafieldsForUC8() {
	var datafields = [];

	add(datafields, header_datafields);
	add(datafields, common_datafields);
	add(datafields, FromToWTcost_datafields);
	add(datafields, TableRef_datafield);
	add(datafields, MUPType_datafield);
	add(datafields, MakingChargesType_datafield);
	add(datafields, WastageType_datafield);
	add(datafields, Checkbox_datafield);

	return datafields;
}

function columnsForUC8() {
	var columns = [];

	add(columns, CommonColumnsNew('60px', '100px', '80px', '90px', '90px',
			'115px', '90px'));
	add(columns, FromToWTcostColumns('100px'));
	add(columns, MakingChargesTypeColumn('120px'));
	add(columns, WastageTypeColumn('100px'));
	add(columns, MUPTypeColumn('100px'));
	add(columns, TableRefColumn(tableRefs, '95px'));
	add(columns, CheckBoxColumn(30));

	return columns;
}

// Vendor Cost Example 9. Repair & Rework Charges
function datafieldsForUC9() {
	var datafields = [];

	add(datafields, header_datafields);
	add(datafields, common_datafields);
	add(datafields, MakingChargesType_datafield);
	add(datafields, WastageType_datafield);
	add(datafields, FromToWTcost_datafields);
	add(datafields, TableRef_datafield);
	add(datafields, MUPType_datafield);
	add(datafields, Checkbox_datafield);

	return datafields;
}

function columnsForUC9() {
	var columns = [];

	add(columns, CommonColumnsNew('60px', '100px', '80px', '90px', '90px',
			'115px', '90px'));
	add(columns, FromToWTcostColumns('100px'));
	add(columns, MakingChargesTypeColumn('120px'));
	add(columns, WastageTypeColumn('100px'));
	add(columns, MUPTypeColumn('100px'));
	add(columns, TableRefColumn(tableRefs, '95px'));
	add(columns, CheckBoxColumn(30));

	return columns;
}

/**
 * Use Case 1 : Vendor Cost Example 1. MC per gm.
 */
function uc1_MakingCharge(metalBasicPurchaseRate, costMcPer) {
	return parseFloat((metalBasicPurchaseRate * costMcPer) / 100).toFixed(2);
}

function uc1_Wastage(metalBasicPurchaseRate, costWastagePer) {
	return parseFloat((metalBasicPurchaseRate * costWastagePer) / 100).toFixed(
			2);
}

function uc1_MCWPerGm(makingCharge, wastage) {
	return parseFloat(makingCharge + wastage);
}

function uc11_MCWPerGm(makingCharge) {
	return parseFloat(makingCharge);
}

function uc1_IncrementalValue(mcwPerGm, costWastagePGM, costMCIncremental) {
	if (mcwPerGm < costWastagePGM) {
		return costWastagePGM;
	} else {
		return (Math.ceil((mcwPerGm - costWastagePGM) / costMCIncremental) * costMCIncremental)
				+ parseFloat(costWastagePGM);
	}
}

/**
 * Use Case 2 : Vendor Cost Example 2. MC per gm & Wastage % on skin purity
 */
function uc2_MakingCharge(metalRateForPurity, costMcPer) {
	return parseFloat((metalRateForPurity * costMcPer) / 100).toFixed(2);
}

function uc2_Wastage(costWastagePer) {
	return costWastagePer;
}

function uc2_MCWPerGm(makingCharge, metalRateForPurity, wastage) {
	var sum = parseFloat((metalRateForPurity * wastage) / 100).toFixed(2);
	sum = parseFloat(sum) + parseFloat(makingCharge);

	return parseFloat(sum).toFixed(2)
}

function uc2_IncrementalValue(mcwPerGm, costWastagePGM, costMCIncremental) {
	if (parseFloat(mcwPerGm) < parseFloat(costWastagePGM)) {
		return costWastagePGM;
	} else {
		var incVal = parseFloat(costWastagePGM) + parseFloat(costMCIncremental);
		
		while (incVal < mcwPerGm) {
			incVal = incVal + parseFloat(costMCIncremental);
		}
	
		return incVal;
		/*(Math.ceil((mcwPerGm - costWastagePGM) / costMCIncremental) * costMCIncremental)
				+ parseFloat(costWastagePGM);*/
	}
}

/**
 * mcwPerGm and incrementalVal values computations for either expectedWt or
 * makingCharge value change in a row
 */
/**
 * Vendor Cost Example 3.MC Per Piece
 */
function uc3_computeMcwPerGmIncrementalVal(row, datafield, columntype,
		expectedWt_ov, expectedWt_nv, makingCharge_ov, makingCharge_nv) {
	var useCase = $('#jqxgrid').jqxGrid('getcellvalue', row, "useCase");
	// Vendor Cost Example 3.MC Per Piece
	if (useCase != null && useCase == 3) {
		if (datafield == 'expectedWt') {
			makingCharge_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"makingCharge");
		} else if (datafield == 'makingCharge') {
			expectedWt_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"expectedWt");
		}

		var mcwPerGm = $('#jqxgrid').jqxGrid('getcellvalue', row, "mcwPerGm");
		var costWastagePGM = $('#costWastagePGM').val();
		var costMCIncremental = $('#costMCIncremental').val();

		var mcwPerGm_NewValue = mcwPerGm;
		// Calculate 'mcwPerGm' value
		if (expectedWt_nv != null && expectedWt_nv != ""
				&& makingCharge_nv != null && makingCharge_nv != "") {

			mcwPerGm_NewValue = uc3_MCWPerGm(makingCharge_nv, expectedWt_nv);

			$("#jqxgrid").jqxGrid('setcellvalue', row, "mcwPerGm",
					mcwPerGm_NewValue);
		}

		// Calculate 'incrementalVal' value
		if (mcwPerGm_NewValue != null && mcwPerGm_NewValue != ""
				&& costWastagePGM != null && costWastagePGM != ""
				&& costMCIncremental != null && costMCIncremental != "") {

			$("#jqxgrid").jqxGrid(
					'setcellvalue',
					row,
					"incrementalVal",
					uc3_IncrementalVal(parseFloat(mcwPerGm_NewValue),
							parseFloat(costWastagePGM),
							parseFloat(costMCIncremental)));
		}
	}
}

function uc3_MCWPerGm(makingCharge, expectedWt) {
	if (expectedWt == 0) {
		return 0;
	}
	return parseFloat((makingCharge / expectedWt).toFixed(2));
}

function uc3_IncrementalVal(mcwPerGm, costWastagePGM, costMCIncremental) {
	if (mcwPerGm < costWastagePGM) {
		return costWastagePGM;
	} else {
		return (Math.ceil((mcwPerGm - costWastagePGM) / costMCIncremental) * costMCIncremental)
				+ parseFloat(costWastagePGM);
	}
}

/**
 * Vendor Cost Example 4. Wastage Per Pc on Skin Purity
 */
function uc4_computeMcwPerGmIncrementalVal(row, datafield, columntype,
		expectedWt_ov, expectedWt_nv, wastage_ov, wastage_nv) {
	var useCase = $('#jqxgrid').jqxGrid('getcellvalue', row, "useCase");

	// Vendor Cost Example 4. Wastage Per Pc on Skin Purity
	if (useCase != null && useCase == 4) {

		if (datafield == 'expectedWt') {
			wastage_nv = $('#jqxgrid').jqxGrid('getcellvalue', row, "wastage");
		} else if (datafield == 'wastage') {
			expectedWt_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"expectedWt");
		}

		var metalRateForPurity = $('#metalRateForPurity').val();
		var mcwPerGm = $('#jqxgrid').jqxGrid('getcellvalue', row, "mcwPerGm");
		var costWastagePGM = $('#costWastagePGM').val();
		var costMCIncremental = $('#costMCIncremental').val();

		var mcwPerGm_NewValue = mcwPerGm;
		// Calculate 'mcwPerGm' value
		if (metalRateForPurity != null && metalRateForPurity != ""
				&& expectedWt_nv != null && expectedWt_nv != ""
				&& wastage_nv != null && wastage_nv != "") {

			mcwPerGm_NewValue = uc4_MCWPerGm(wastage_nv, metalRateForPurity,
					expectedWt_nv);

			$("#jqxgrid").jqxGrid('setcellvalue', row, "mcwPerGm",
					mcwPerGm_NewValue);
		}

		// Calculate 'incrementalVal' value
		if (mcwPerGm_NewValue != null && mcwPerGm_NewValue != ""
				&& costWastagePGM != null && costWastagePGM != ""
				&& costMCIncremental != null && costMCIncremental != "") {
			$("#jqxgrid").jqxGrid(
					'setcellvalue',
					row,
					"incrementalVal",
					uc4_IncrementalVal(parseFloat(mcwPerGm_NewValue),
							parseFloat(costWastagePGM),
							parseFloat(costMCIncremental)));
		}
	}
}

function uc4_MCWPerGm(wastage, metalRateForPurity, expectedWt) {
	if (expectedWt == 0) {
		return 0;
	}
	return parseFloat((wastage * metalRateForPurity) / expectedWt).toFixed(2);
}

function uc4_IncrementalVal(mcwPerGm, costWastagePGM, costMCIncremental) {
	if (mcwPerGm < costWastagePGM) {
		return costWastagePGM;
	} else {
		return (Math.ceil((mcwPerGm - costMCIncremental) / costMCIncremental) * costMCIncremental)
				+ parseFloat(costWastagePGM);
	}
}

/**
 * Vendor Cost Example 5. Wastage Per pair
 */
function uc5_computeMcwPerGmIncrementalVal(row, datafield, columntype,
		expectedWt_nv, makingCharge_nv, wastage_nv) {
	var useCase = $('#jqxgrid').jqxGrid('getcellvalue', row, "useCase");

	if (useCase != null && useCase == 5) {

		if (datafield == 'expectedWt') {
			makingCharge_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"makingCharge");
			wastage_nv = $('#jqxgrid').jqxGrid('getcellvalue', row, "wastage");
		} else if (datafield == 'makingCharge') {
			expectedWt_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"expectedWt");
			wastage_nv = $('#jqxgrid').jqxGrid('getcellvalue', row, "wastage");
		} else if (datafield == 'wastage') {
			expectedWt_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"expectedWt");
			makingCharge_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"makingCharge");
		}

		var metalRateForPurity = $('#metalRateForPurity').val();
		var mcwPerGm = $('#jqxgrid').jqxGrid('getcellvalue', row, "mcwPerGm");
		var costWastagePGM = $('#costWastagePGM').val();
		var costMCIncremental = $('#costMCIncremental').val();

		var mcwPerGm_NewValue = mcwPerGm;
		// Calculate 'mcwPerGm' value
		if (metalRateForPurity != null && metalRateForPurity != ""
				&& expectedWt_nv != null && expectedWt_nv != ""
				&& wastage_nv != null && wastage_nv != "") {

			mcwPerGm_NewValue = uc5_MCWPerGm(makingCharge_nv, wastage_nv,
					metalRateForPurity, expectedWt_nv);

			$("#jqxgrid").jqxGrid('setcellvalue', row, "mcwPerGm",
					mcwPerGm_NewValue);
		}

		// Calculate 'incrementalVal' value
		if (mcwPerGm_NewValue != null && mcwPerGm_NewValue != ""
				&& costWastagePGM != null && costWastagePGM != ""
				&& costMCIncremental != null && costMCIncremental != "") {
			$("#jqxgrid").jqxGrid(
					'setcellvalue',
					row,
					"incrementalVal",
					uc5_IncrementalVal(parseFloat(mcwPerGm_NewValue),
							parseFloat(costWastagePGM),
							parseFloat(costMCIncremental)));
		}
	}
}

function uc5_MCWPerGm(makingCharge, wastage, metalRateForPurity, expectedWt) {
	if (expectedWt == 0) {
		return 0;
	}
	return parseFloat(
			makingCharge + ((wastage * metalRateForPurity) / expectedWt))
			.toFixed(2);
}

function uc5_IncrementalVal(mcwPerGm, costWastagePGM, costMCIncremental) {
	if (mcwPerGm < costWastagePGM) {
		return costWastagePGM;
	} else {
		return (Math.ceil((mcwPerGm - costMCIncremental) / costMCIncremental) * costMCIncremental)
				+ parseFloat(costWastagePGM);
	}
}

/**
 * Vendor Cost Example 6. MC & Wastage Per Pc on Skin Purity
 */
function uc6_computeMcwPerGmIncrementalVal(row, datafield, columntype,
		expectedWt_nv, makingCharge_nv, wastage_nv) {
	var useCase = $('#jqxgrid').jqxGrid('getcellvalue', row, "useCase");

	if (useCase != null && useCase == 6) {

		if (datafield == 'expectedWt') {
			makingCharge_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"makingCharge");
			wastage_nv = $('#jqxgrid').jqxGrid('getcellvalue', row, "wastage");
		} else if (datafield == 'makingCharge') {
			expectedWt_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"expectedWt");
			wastage_nv = $('#jqxgrid').jqxGrid('getcellvalue', row, "wastage");
		} else if (datafield == 'wastage') {
			expectedWt_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"expectedWt");
			makingCharge_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"makingCharge");
		}

		var metalRateForPurity = $('#metalRateForPurity').val();
		var mcwPerGm = $('#jqxgrid').jqxGrid('getcellvalue', row, "mcwPerGm");
		var costWastagePGM = $('#costWastagePGM').val();
		var costMCIncremental = $('#costMCIncremental').val();

		var mcwPerGm_NewValue = mcwPerGm;
		// Calculate 'mcwPerGm' value
		if (metalRateForPurity != null && metalRateForPurity != ""
				&& expectedWt_nv != null && expectedWt_nv != ""
				&& wastage_nv != null && wastage_nv != "") {

			mcwPerGm_NewValue = uc6_MCWPerGm(makingCharge_nv, wastage_nv,
					metalRateForPurity, expectedWt_nv);

			$("#jqxgrid").jqxGrid('setcellvalue', row, "mcwPerGm",
					mcwPerGm_NewValue);
		}

		// Calculate 'incrementalVal' value
		if (mcwPerGm_NewValue != null && mcwPerGm_NewValue != ""
				&& costWastagePGM != null && costWastagePGM != ""
				&& costMCIncremental != null && costMCIncremental != "") {
			$("#jqxgrid").jqxGrid(
					'setcellvalue',
					row,
					"incrementalVal",
					uc6_IncrementalVal(parseFloat(mcwPerGm_NewValue),
							parseFloat(costWastagePGM),
							parseFloat(costMCIncremental)));
		}
	}
}

function uc6_MCWPerGm(makingCharge, wastage, metalRateForPurity, expectedWt) {
	if (expectedWt == 0) {
		return 0;
	}
	return parseFloat(
			(makingCharge + (wastage * metalRateForPurity)) / expectedWt)
			.toFixed(2);
}

function uc6_IncrementalVal(mcwPerGm, costWastagePGM, costMCIncremental) {
	if (mcwPerGm < costWastagePGM) {
		return costWastagePGM;
	} else {
		return (Math.ceil((mcwPerGm - costMCIncremental) / costMCIncremental) * costMCIncremental)
				+ parseFloat(costWastagePGM);
	}
}

/**
 * Vendor Cost Example 7. MC & Wastage Per Pair on Skin Purity
 */
function uc7_computeMcwPerGmIncrementalVal(row, datafield, columntype,
		expectedWt_nv, makingCharge_nv, wastage_nv) {
	var useCase = $('#jqxgrid').jqxGrid('getcellvalue', row, "useCase");

	if (useCase != null && (useCase == 7 || useCase == 1 || useCase == 2)) {

		if (datafield == 'expectedWt') {
			makingCharge_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"makingCharge");
			wastage_nv = $('#jqxgrid').jqxGrid('getcellvalue', row, "wastage");
		} else if (datafield == 'makingCharge') {
			expectedWt_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"expectedWt");
			wastage_nv = $('#jqxgrid').jqxGrid('getcellvalue', row, "wastage");
		} else if (datafield == 'wastage') {
			expectedWt_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"expectedWt");
			makingCharge_nv = $('#jqxgrid').jqxGrid('getcellvalue', row,
					"makingCharge");
		}

		var metalRateForPurity = $('#metalRateForPurity').val();
		var mcwPerGm = $('#jqxgrid').jqxGrid('getcellvalue', row, "mcwPerGm");
		var costWastagePGM = $('#costWastagePGM').val();
		var costMCIncremental = $('#costMCIncremental').val();

		var mcwPerGm_NewValue = mcwPerGm;
		// Calculate 'mcwPerGm' value
		if (metalRateForPurity != null && metalRateForPurity != ""
				&& expectedWt_nv != null && expectedWt_nv != ""
				&& wastage_nv != null && wastage_nv != "") {

			mcwPerGm_NewValue = uc7_MCWPerGm(makingCharge_nv, wastage_nv,
					metalRateForPurity, expectedWt_nv);

			$("#jqxgrid").jqxGrid('setcellvalue', row, "mcwPerGm",
					mcwPerGm_NewValue);
		}

		// Calculate 'incrementalVal' value
		if (mcwPerGm_NewValue != null && mcwPerGm_NewValue != ""
				&& costWastagePGM != null && costWastagePGM != ""
				&& costMCIncremental != null && costMCIncremental != "") {
			$("#jqxgrid").jqxGrid(
					'setcellvalue',
					row,
					"incrementalVal",
					uc7_IncrementalVal(parseFloat(mcwPerGm_NewValue),
							parseFloat(costWastagePGM),
							parseFloat(costMCIncremental)));
		}
	}
}

function uc7_MCWPerGm(makingCharge, wastage, metalRateForPurity, expectedWt) {
	if (expectedWt == 0) {
		return 0;
	}
	return parseFloat(
			(makingCharge + (wastage * metalRateForPurity)) / expectedWt)
			.toFixed(2);
}

function uc7_IncrementalVal(mcwPerGm, costWastagePGM, costMCIncremental) {
	if (mcwPerGm < costWastagePGM) {
		return costWastagePGM;
	} else {
		return (Math.ceil((mcwPerGm - costMCIncremental) / costMCIncremental) * costMCIncremental)
				+ parseFloat(costWastagePGM);
	}
}

/**
 * Listing page related
 */

function listingDatafields() {

	var listing_datafields = [ {
		'name' : 'vaId',
		'type' : 'long'
	}, {
		'name' : 'vendorId',
		'type' : 'long'
	}, {
		'name' : 'vendorCode',
		'type' : 'long'
	}, {
		'name' : 'articleCode',
		'type' : 'string'
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'jewelType',
		'type' : 'string'
	}, {
		'name' : 'category',
		'type' : 'string'
	}, {
		'name' : 'subCategory',
		'type' : 'string'
	} ];

	return listing_datafields;
}

function listingColumns() {
	var listing_columns = [ {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		cellsalign: 'center',
		align: 'center',
		'width' : '15.5%',
		sortable : true,
		editable : false
	}, {
		'text' : 'Article Code',
		cellsalign: 'center',
		align: 'center',
		'datafield' : 'articleCode',
		'width' : '14%',
		sortable : true,
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		cellsalign: 'center',
		align: 'center',
		'width' :'13%',
		sortable : true,
		editable : false
	}, {
		'text' : 'Jewel Type',
		'datafield' : 'jewelType',
		'width' : '14%',
		cellsalign: 'center',
		align: 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Category',
		'datafield' : 'category',
		'width' : '15%',
		cellsalign: 'center',
		align: 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Sub Category',
		'datafield' : 'subCategory',
		'width' : '25.5%',
		cellsalign: 'left',
		align: 'center',
		sortable : true,
		editable : false
	}, {
		'text' : '',
		'datafield' : 'vaId',
		cellsrenderer : editVCMLinkRenderer,
		'width' : '3%',
		filterable : false,
		cellsalign: 'center',
		align: 'center',
		sortable : false,
		editable : false
	} ];
	return listing_columns;
}

var editVCMLinkRenderer = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return "<a class='btn btn-sm btn-primary' type='button' onclick='onVCMEditClick("+ value+ ", "+$("#skinPurity").val() +")'/><i class='fa fa-pencil fa-sm'></i></a>"
	}
}

function onVCMEditClick(value, skinPurity) {
	$('#loading').show();	
	//showContentPage('vendorCostMaintenanceEdit', 'bodySwitcher');
	localStorage.setItem("purity",JSON.stringify({"value" : value, "skinPurity" : skinPurity}));
	window.location.href="javascript:showContentPage('vendorCostMaintenanceEdit', 'bodySwitcher')"
	
}

/**
 * Grid related
 */
var sourceVCM = {};
var applyEditValues;
function showMyGridForVCM(datafields, url, root, columns, filter, updateRows,
		sortColumn) {
	sourceVCM = {
		datafields : datafields,
		data : filter,
		url : url,
		datatype : 'json',
		type : 'post',
		root : root,
		contentType : 'application/json',
		beforeprocessing : beforeprocessingVCM,
		// pagesize : 20,
		// sort : sort,
		sortColumn : sortColumn,
		sortdirection : 'asc',
		updaterow : updateRows
	};

	var dataAdapterVCM = new $.jqx.dataAdapter(sourceVCM, {
		formatData : requestDataVCM
	});

	$("#jqxgrid").jqxGrid({
		source : dataAdapterVCM,
		width : '100%',
		height : '400px',
		editable : true,
		columnsresize : true,
		selectionmode : 'singlecell',
		columns : columns,
		sortable : 'true',
		// pageable : 'false',
		// virtualmode : 'false',
		// pagermode : 'simple',
		// rendergridrows : rendergridrows,
		showsortmenuitems : false,
		enabletooltips : true,
		autoheight : true,
		altrows : true,
		columnsheight : 50
	});

}

function beforeprocessingVCM(data) {
	if (undefined == data.payload.list) {
		data.payload.list = [];
	}
	if(data.resCode == 2){
		$.growl.error({
			message : data.mesgStr,
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	sourceVCM.totalrecords = data.payload.size ? data.payload.size : 0;

	if (undefined == data.payload.applyEdit) {
		data.payload.applyEdit = [];
	}

	applyEditValues = data.payload.applyEdit;

	if (vcmMode != null && vcmMode == "edit") {
		if(applyEditValues.metalBasicPurchaseRate != null){
			$('#metalBasicPurchaseRate').val(applyEditValues.metalBasicPurchaseRate.toFixed(2));
		}else{
			$('#metalBasicPurchaseRate').val(applyEditValues["metalBasicPurchaseRate"]);
		}
		
		if(applyEditValues.costMcPer != null){
			$('#costMcPer').val(applyEditValues.costMcPer.toFixed(3));
		}else{
			$('#costMcPer').val(applyEditValues["costMcPer"]);
		}
		
		if(applyEditValues.costWastagePe != null){
			$('#costWastagePer').val(applyEditValues.costWastagePer.toFixed(2));
		}else{
			$('#costWastagePer').val(applyEditValues["costWastagePer"]);
		}
		
		if( applyEditValues.metalRateForPurity != null){
			$('#metalRateForPurity').val(applyEditValues.metalRateForPurity.toFixed(2));
		}else{
			$('#metalRateForPurity').val(applyEditValues["metalRateForPurity"]);
		}
		
	   if(applyEditValues.costWastagePGM != null){
		   $('#costWastagePGM').val(applyEditValues.costWastagePGM.toFixed(3));
	   }else{
		   $('#costWastagePGM').val(applyEditValues["costWastagePGM"]); 
	   }
	   
	  if(applyEditValues.costMCIncremental != null){
		$('#costMCIncremental').val(applyEditValues.costMCIncremental.toFixed(2));
	  }{
		$('#costMCIncremental').val(applyEditValues["costMCIncremental.toFixed"]);
	  }
		
	}
}

/*function sort() {
	$("#jqxgrid_vcm_addedit").jqxGrid('updatebounddata', 'sort');
}*/

function requestDataVCM(data) {
	/*
	 * var order = "asc".match(data.sortorder) ? true : false; var sort = {
	 * "sortingFields" : {} }; sort.sortingFields[data.sortdatafield] = order;
	 * 
	 * $.extend(data, { offset : data.pagenum ? data.pagenum : 0 },
	 * data.sortdatafield ? sort : {});
	 */

	return JSON.stringify(data);
}

/*
 * function rendergridrows(params) { return params.data; }
 */

