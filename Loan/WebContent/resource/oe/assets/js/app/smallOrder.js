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

var vendorList = {};

function soFilterValues() {
	fieldFilters = {
		"fieldFilters" : {}
	};

	var fromDate = $('#orderFromDate').val();
    var toDate = $('#orderToDate').val();
	
	var segment = $('#segment').val();
	var vendor = $('#vendorCode-value').val();
	var soNo=$('#soNo').val();

	/* Assign Release Order Multi Select - Start */

	

	/* Assign Release Order Multi Select - End */

	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["orderFromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["orderToDate"] = toDate;
	}
	

	if (soNo != "" && soNo != null) {
		fieldFilters.fieldFilters["soNo"] = soNo;
	}


	if (vendor != "" && vendor != null) {
		fieldFilters.fieldFilters["vendor"] = vendor;
	}
	
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segment"] = segment;
	}
	
	return fieldFilters;
}




function smallOrderRelease() {

	var addrow =  function (rowid, rowdata, position, commit) {
        commit(true);
	}
	
	
	var updateRows = function(rowid, newdata, commit) {
		commit(true);
	}

	var vendorTypeSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : vendorList
	};

	var vendorTypeDataAdapter = new $.jqx.dataAdapter(vendorTypeSource, {
		autoBind : true
	});

	var datafields = [ {
		'name' : 'storeId',
		'type' : 'long'
	}, {
		'name' : 'smallOrderId',
		'type' : 'long'
	},{
		'name' : 'soiId',
		'type' : 'long'
	},
	
	{
		'name' : 'serialNumber',
		'type' : 'long'
	}, {
		'name' : 'raisedBy',
		'type' : 'string'
	},  {
		'name' : 'segmentDesc',
		'type' : 'string'
		
	}, {
		'name' : 'jewelTypeDesc',
		'type' : 'string'
		
	},
	{
		'name' : 'description',
		'type' : 'string'
	}, {
		'name' : 'pieces',
		'type' : 'long'
	}, {
		'name' : 'grossWeight',
		'type' : 'double'
	}, {
		'name' : 'netWeight',
		'type' : 'double'
	}, {
		'name' : 'sopCreatedDate',
		'type' : 'string'
	}, {
		'name' : 'sopDueDate',
		'type' : 'string'
	}, 
	{
		'name' : 'vendorDueDate',
		'type' : 'string'
	}, 
	
	{
		name : 'vendorID',
		type : 'string'
	}, {
		name : 'vendorIDs',
		value : 'vendorID',
		values : {
			source : vendorTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},

	{
		'name' : 'isReleased',
		'type' : 'bool'
	} ];

	var columns = [

			{
				'text' : 'Store Code',
				'datafield' : 'storeId',
				'width' : '80px',
				editable : false
			},
			{
				'text' : 'SOP No',
				'datafield' : 'smallOrderId',
				'width' : '80px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'SOP Sl. No.',
				'datafield' : 'serialNumber',
				'width' : '80px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Raised By',
				'datafield' : 'raisedBy',
				'width' : '90px',
				sortable : false,
				editable : false
			},

			{
				'text' : 'Segment',
				'datafield' : 'segmentDesc',
				'width' : '80px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Jewel Type',
				'datafield' : 'jewelTypeDesc',
				'width' : '80px',
				editable : false
			},
			{
				'text' : 'Repair Description',
				'datafield' : 'description',
				'width' : '120px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Pcs',
				'datafield' : 'pieces',
				'width' : '60px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Gross Wt.',
				'datafield' : 'grossWeight',
				'width' : '80px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Net Wt.',
				'datafield' : 'netWeight',
				'width' : '80px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'SOP Date',
				'datafield' : 'sopCreatedDate',
				'width' : '100px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Due Date',
				'datafield' : 'sopDueDate',
				'width' : '100px',
				sortable : false,
				editable : false
			},
			{
				'text' : 'Vendor Due Date',
				'datafield' : 'vendorDueDate',
				'width' : '100px',
				sortable : false,
				editable : true/*,
				columntype: 'datetimeinput',
				cellsalign: 'center', 
				cellsformat: 'dd/MM/yyyy'*/
			},
			{
				'text' : 'Assign Vendor',
				'datafield' : 'vendorID',
				'width' : '90px',
				sortable : false,
				editable : true,
				columntype : 'combobox',
				displayfield : 'vendorIDs',
				filtertype : 'checkedlist',
				createeditor : function(row, value, editor) {
					editor.jqxComboBox({
						source : vendorTypeDataAdapter,
						displayMember : 'name',
						valueMember : 'id'
					});
				},
			},
			
			{
				text : 'Release Y/N',
				sortable : false,
				datafield : 'isReleased',
				columntype : 'checkbox',
				width : '50px',
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue) {
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
	showMyGrid(datafields, "/OrderExecution/api/v1/smallOrderReleaseOE", "list", columns, soFilterValues(), updateRows, "soiId");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true 
	});

}



function grFgGrid() {

	var updateRows = function(rowid, newdata, commit) {

		commit(true);
	}

	var deleteRow = function(rowid, commit) {
		commit(true);
	}
	var addrow = function(rowid, rowdata, position, commit) {

		commit(true);
	}

	var soTypeSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'String'
			}, {
				name : 'name',
				type : 'String'
			} ],
			localdata : sopIds
		};

		var soTypeDataAdapter = new $.jqx.dataAdapter(soTypeSource, {
			autoBind : true
		});
		
	var soSrlTypeSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'String'
			}, {
				name : 'name',
				type : 'String'
			} ],
			localdata : null
		};

		var soSrlTypeDataAdapter = new $.jqx.dataAdapter(soSrlTypeSource, {
			autoBind : true
		});
		
		var uomTypeSource = {
				datatype : 'json',
				datafields : [ {
					name : 'id',
					type : 'String'
				}, {
					name : 'name',
					type : 'String'
				} ],
				localdata : uom
			};

			var uomTypeDataAdapter = new $.jqx.dataAdapter(uomTypeSource, {
				autoBind : true
			});
		
		
		uom

	var datafields = [{
		'name' : 'srl',
		'type' : 'long'
	},{
		'name' : 'soOrderId',
		'type' : 'long'

	},
	{
		'name' : 'sogrdetailId',
		'type' : 'string'

	}, {
		name : 'sogrdetailIds',
		value : 'sogrdetailId',
		values : {
			source : soTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},
	{
		'name' : 'serialNumber',
		'type' : 'string'

	}, {
		name : 'serialNumbers',
		value : 'serialNumber',
		values : {
			source : soSrlTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},
	
	
	{
		'name' : 'storeId',
		'type' : 'long'
	}, 
	{
		'name' : 'segmentName',
		'type' : 'string'
	}, 
	 {
		'name' : 'segmentId',
		'type' : 'long'
		
	},
	{
		'name' : 'jewelTypeName',
		'type' : 'string'

	},
	{
		'name' : 'jewelTypeId',
		'type' : 'long'

	},
	
	{
		'name' : 'description',
		'type' : 'string'
	}, {
		'name' : 'pieces',
		'type' : 'long'
	}, {
		'name' : 'grossWeight',
		'type' : 'double'
	}, {
		'name' : 'netWeight',
		'type' : 'double'
	},{
		'name' : 'stoneName',
		'type' : 'string'
	}, {
		'name' : 'stoneWeight',
		'type' : 'double'
	},
	{
		name : 'uomType',
		type : 'string'
	},
	 {
		name : 'uomTypes',
		value : 'uomType',
		values : {
			source : uomTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},
	
	{
		name : 'stoneCost',
		value : 'double',
		
	},
	{
		'name' : 'totalCost',
		'type' : 'double'
	}, {
		'name' : 'totalSellingCharges',
		'type' : 'double'
	},
	 {
		'name' : 'selectionStatus',
		'type' : 'bool'
	}
	
	]

	var columns = [ {
		text : 'Srl No.',
		sortable : false,
		filterable : false,
		editable : true,
		groupable : false,
		draggable : false,
		resizable : false,
		datafield : 'srl',
		columntype : 'number',
		width : '45px',
		cellsrenderer : function(row, column, value) {
			
			return (value+1)+'';
		}
		
	}, {
		text : 'SOP NO.',
		datafield : 'sogrdetailId',
		width : '70px',
		editable : true,
		columntype : 'combobox',
		displayfield : 'sogrdetailIds',
		filtertype : 'checkedlist',
		createeditor : function(row, value, editor) {
			editor.jqxComboBox({
				source : soTypeDataAdapter,
				displayMember : 'name',
				valueMember : 'id'
			});
		},
		
		cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
			
			
			if(null == sopOrderItemDetails[newvalue.value]){
				$("#loading").show();
				$.getJSON('/OrderExecution/api/v1/getSOISRLNOBySOPOnOE?sopID='+parseInt(newvalue.value), function(data) {
					
					if(1 == data.resCode){
						
						if(null != data.payload.SOSrl && 0 < data.payload.SOSrl.length){
							soDSrl[newvalue.value] = data.payload.SOSrl;
							
							var rowObj = $("#jqxgrid").jqxGrid('getrowdatabyid', row);
							rowObj["storeId"] = null;
							rowObj["serialNumber"] = null;
							rowObj["serialNumbers"] = null;
							rowObj["segmentName"] = null;
							
							rowObj["jewelTypeName"] = null;
							rowObj["jewelTypeId"] = null;
							
							rowObj["description"] = null;
							rowObj["pieces"] = null;
							
							rowObj["grossWeight"] = null;
							rowObj["netWeight"] = null;
							rowObj["soOrderId"] = null;
							
							rowObj["stoneName"] = null;
							rowObj["stoneWeight"] = null;
							rowObj["uomType"] = null;
							rowObj["uomTypes"] = null;
							rowObj["stoneCost"] =null;
							rowObj["totalCost"] = null;
							rowObj["totalSellingCharges"] = null;
							
							$('#jqxgrid').jqxGrid('updaterow', row, rowObj);
							
						}else{
							$.growl.error({ message: "No Data found.", duration: 10000, title: 'Error' });
						}
						
					}else {
						 $.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
					 }
					$("#loading").hide();
					return true;
					
				});
				return newvalue;
			}else{
				return newvalue;
			}
		}
			
	},
	
	{
		text : 'SL No.',
		datafield : 'serialNumber',
		width : '70px',
		editable : true,
		columntype : 'combobox',
		displayfield : 'serialNumbers',
		filtertype : 'checkedlist',
		initeditor : function(row, value, editor) {
			var sopSrl = [];
			
			var SOPID = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'sogrdetailId');
			sopSrl = soDSrl[SOPID];
			editor.jqxComboBox({
				source : sopSrl,
				displayMember : 'name',
				valueMember : 'id'
			});
		},
		
	/*	initeditor : function(row, value, editor) {
			
			var sopSrl = [];
			var SOPID = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'smallOrderId');
			sopSrl = soDSrl[SOPID];
			editor.jqxComboBox({
				source : sopSrl,
				displayMember : 'name',
				valueMember : 'id'
			});
			
		},*/
		cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
			
			 var SOPID = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'sogrdetailId')
			 
			 if(null == newvalue || "" == newvalue){
				
				 $.growl.error({ message: "SO Srl is mandatory.", duration: 10000, title: 'Error' });
				 return "";
				 
			 }
			 
			 if(validateSOPIdAndSrl(row, SOPID, newvalue.value)){
			    	
		    	$.growl.error({ message: "This Serial No already selected for SOP No. Please select other one.", duration: 10000, title: 'Error' });
		    	return "";
			 }
			 $("#loading").show();
			 $.getJSON('/OrderExecution/api/v1/getSODetailsBySOIdAndSOSrl?soId='+parseInt(SOPID)+'&soSrl='+parseInt(newvalue.value), function(data) {
					
					if(1 == data.resCode){
						
						var soDBySrl = data.payload.smallOrderDetails;
						
						
						var rowObj = $("#jqxgrid").jqxGrid('getrowdatabyid', row);
						
						rowObj["storeId"] = soDBySrl.smallOrder.store.id;
						rowObj["segmentName"] = soDBySrl.segment.description;
						rowObj["segmentId"] = soDBySrl.segment.id;
						
						rowObj["jewelTypeName"] = soDBySrl.jewelType.description;
						rowObj["jewelTypeId"] = soDBySrl.jewelType.id;
						
						rowObj["description"] = soDBySrl.description;
						rowObj["pieces"] = soDBySrl.pieces;
						
						rowObj["grossWeight"] = soDBySrl.grossWeight;
						rowObj["netWeight"] = soDBySrl.netWeight;
						rowObj["soOrderId"] = soDBySrl.id;
						
						rowObj["stoneName"] = null;
						rowObj["stoneWeight"] = null;
						rowObj["uomType"] = null;
						rowObj["uomTypes"] = null;
						rowObj["stoneCost"] =null;
						rowObj["totalCost"] = null;
						rowObj["totalSellingCharges"] = null;
						
						$('#jqxgrid').jqxGrid('updaterow', row, rowObj);
						
						
					}else {
						 $.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
					 }
					$("#loading").hide();
					
				});
			
		}
	},
	
	{
		'text' : 'Store Id',
		'datafield' : 'storeId',
		'width' : '80px',
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segmentName',
		'width' : '80px',
		editable : false
	}, {
		'text' : 'jewel Type',
		'datafield' : 'jewelTypeName',
		width : '80px',
		editable : false
		
	}, {
		'text' : 'Repair Description',
		'datafield' : 'description',
		'width' : '140px',
		editable : false
		

	}, {
		'text' : 'Pcs',
		'datafield' : 'pieces',
		'width' : '65px',
		editable : true,
		cellsformat: 'n',
		columntype: 'numberinput',	      
		initeditor: function (row, cellvalue, editor) {
            editor.jqxNumberInput({ decimalDigits:0, min: 0, spinButtons: false  });
        },
        validation: function (cell, value) {
            if (value < 0) {
                return { result: false, message: "Invalid Number" };
            }
            return true;
        }
	}, {
		'text' : 'G.Wt.',
		'datafield' : 'grossWeight',
		'width' : '80px',
		sortable : false,
		editable : true,
		cellsformat: 'd',
		columntype: 'numberinput',	      
		initeditor: function (row, cellvalue, editor) {
            editor.jqxNumberInput({ decimalDigits:3, min: 0.000, spinButtons: false  });
        },
        validation: function (cell, value) {
            if (value < 0) {
                return { result: false, message: "Invalid Number" };
            }
            return true;
        },
		
	}, {
		'text' : 'N. Wt.',
		'datafield' : 'netWeight',
		'width' : '80px',
		sortable : false,
		editable : true,
		cellsformat: 'd',
		columntype: 'numberinput',	      
		initeditor: function (row, cellvalue, editor) {
            editor.jqxNumberInput({ decimalDigits:3, min: 0.000, spinButtons: false  });
        },
        validation: function (cell, value) {
            if (value < 0) {
                return { result: false, message: "Invalid Number" };
            }
            return true;
        },
	}, {
		'text' : 'Stone Name',
		'datafield' : 'stoneName',
		'width' : '70px',
		sortable : false,
		editable : true,
		
		
	}, {
		'text' : 'Stone Wt',
		'datafield' : 'stoneWeight',
		'width' : '70px',
		sortable : false,
		editable : true,
		
		
	}, 
	
	
	
	{
		'text' : 'UOM',
		'datafield' : 'uomType',
		'width' : '70px',
		sortable : false,
		editable : true,
		columntype : 'combobox',
		displayfield : 'uomTypes',
		filtertype : 'checkedlist',
		createeditor : function(row, value, editor) {
			editor.jqxComboBox({
				source : uomTypeDataAdapter,
				displayMember : 'name',
				valueMember : 'id'
			});
		},
	}, {
		'text' : 'Stone Cost',
		'datafield' : 'stoneCost',
		'width' : '80px',
		sortable : false,
		editable : true,
		cellsformat: 'd',
		columntype: 'numberinput',	      
		initeditor: function (row, cellvalue, editor) {
            editor.jqxNumberInput({ decimalDigits:2, min: 0.00, spinButtons: false  });
        },
        validation: function (cell, value) {
            if (value < 0) {
                return { result: false, message: "Invalid Number" };
            }
            return true;
        }
		
	}, 
	
	 {
		'text' : 'Total Cost Charges',
		'datafield' : 'totalCost',
		'width' : '80px',
		sortable : false,
		editable : true,
		cellsformat: 'd',
		columntype: 'numberinput',	      
		initeditor: function (row, cellvalue, editor) {
            editor.jqxNumberInput({ decimalDigits:2, min: 0.00, spinButtons: false  });
        },
        validation: function (cell, value) {
            if (value < 0) {
                return { result: false, message: "Invalid Number" };
            }
            return true;
        }
	
	},
	
	 {
		'text' : 'Total Selling Charges',
		'datafield' : 'totalSellingCharges',
		'width' : '80px',
		sortable : false,
		editable : true,
		cellsformat: 'd',
		columntype: 'numberinput',	      
		initeditor: function (row, cellvalue, editor) {
            editor.jqxNumberInput({ decimalDigits:2, min: 0.00, spinButtons: false  });
        },
        validation: function (cell, value) {
            if (value < 0) {
                return { result: false, message: "Invalid Number" };
            }
            return true;
        }
		
	}, 
	{
		text : '',
		menu : false,
		sortable : false,
		editable : true,
		datafield : 'selectionStatus',
		columntype : 'checkbox',
		width : '30px',
		cellvaluechanging : function(row, datafield, columntype,
				oldvalue, newvalue) {
			/*if (newvalue) {
				$("#jqxgrid").jqxGrid('selectrow', row);
			} else {
				$("#jqxgrid").jqxGrid('unselectrow', row);
			}*/
		},
		renderer : function() {
			return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
		}

	}

	];
	
	addGrid(datafields, columns, updateRows, data, addrow, "#jqxgrid");
}


var generateSOGRM = function () {
    
	var row = {};
	
    row["soOrderId"] = null;
    row["sogrdetailId"] = null;
    row["serialNumber"] = null;
    row["storeId"] = null;
    row["segmentName"] = null
    row["segmentId"] = null
    row["jewelTypeName"] = null;
    row["jewelTypeId"] = null;
    row["description"] = null;
    
    row["pieces"] = null;
    row["grossWeight"] = null;
    row["netWeight"] = null;
    row["stoneName"] = null;
    row["uomType"] = null;
    row["stoneCost"] = null;
    row["totalCost"] = null;
    row["totalSellingCharges"] = null;
    row["selectionStatus"] = true;
    return row;
}



function soRelease() {
	var smallOrder = $("#jqxgrid").jqxGrid('getrows');
	
	return smallOrder;
}


var validateSOPIdAndSrl = function(rowId, sopId, srl){
	var mivRows = $("#jqxgrid").jqxGrid('getrows');
	var validation = false;
	
	for(var i = 0; i< mivRows.length; i++){
		
		 var data = mivRows[i];
		 if(data.selectionStatus == true){
			 if(data.srl != rowId && data.sogrdetailId == sopId && data.serialNumber == srl){
				validation = true;	
				break;
			 }
		 }
		 
	}
	
	return validation;
}


var validateSODetails = function(){
	var soDetails = $("#jqxgrid").jqxGrid('getrows');
	var validation = false;
	
	for(var i = 0; i< soDetails.length; i++){
		
		 var data = soDetails[i];
		 if(data.selectionStatus == true){
			 
			 if(null == data.sogrdetailId){
				 $.growl.error({ message: "Please select SOP No", duration: 10000, title: 'Error' });
				validation = true;	
				break;
			 }else if(null == data.serialNumber){
				 $.growl.error({ message: "Please select SOP Srl", duration: 10000, title: 'Error' });
				validation = true;	
				break;
			 }else if(null == data.pieces){
				 $.growl.error({ message: "Please select PCS", duration: 10000, title: 'Error' });
				validation = true;	
				break;
			 }else if(null == data.grossWeight){
				 $.growl.error({ message: "Please select G.Wt.", duration: 10000, title: 'Error' });
				validation = true;	
				break;
			 }else if(null == data.netWeight){
				 $.growl.error({ message: "Please select N.Wt.", duration: 10000, title: 'Error' });
				validation = true;	
				break;
			 }
		 }
	     
		 
	}
	
	return validation;
}

function createSOGR() {
	var grHeader = {
		"smallOrderGRDetailList" : []
	};
	
	grHeader.smallOrderGRDetailList = $("#jqxgrid").jqxGrid('getrows');
	grHeader.vendorId = $('#vendorCode-value').val();
	grHeader.mrvId = $('#mrvId').val();
	grHeader.mrvSrlNo = $('#mrvSrlNo').val();
	
	
	return grHeader;
}