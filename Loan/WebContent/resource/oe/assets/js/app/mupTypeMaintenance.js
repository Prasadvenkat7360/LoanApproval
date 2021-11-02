/**
 * ## AUTHOR  : DIPANKAR NAHA 
 * ## AUTHOR 2:  POOJA
 * ## DATE : 06-02-2017
 * ## DESCRIPTION : SCRIPT TO MAINTAIN SELLING RATE 
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

//grid to  perform search
function mupTypeGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'business',
		'type' : 'string'
	}, {
		'name' : 'region',
		'type' : 'string'
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'mupCategory',
		'type' : 'string'
	},{
		'name' : 'muptable',
		'type' : 'string'
	}, {
		'name' : 'actionId',
		'type' : 'int',
	} ];

	var columns = [ {
		'text' : ' Business',
		'datafield' : 'business',
		'width' : '210px',
		editable : false
	}, {
		'text' : 'Region',
		'datafield' : 'region',
		'width' : '214px',
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '210px',
		sortable : false,
		editable : false
	}, {
		'text' : 'MUP Category',
		'datafield' : 'mupCategory',
		'width' : '220px',
		sortable : false,
		editable : false
	}, {
		'text' : 'MUP Table',
		'datafield' : 'muptable',
		'width' : '210px',
	}, {
		text : 'Action',
		datafield : 'actionId',
		cellsrenderer : '',
		editable : false,
		sortable : false,
		'width' : '205px'
	} ];

	showMyGrid(datafields, "", "list",columns, '', updateRows, "id");
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

function addMupDetailsItemGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
	}
	
var datafield = [  {
	'name' : 'MupDetSlNo',
	'type' : 'int'
}, {
	'name' : 'business',
	'type' : 'string'
}, {
	'name' : 'region',
	'type' : 'string'
}, {
	'name' : 'segment',
	'type' : 'string'
}, {
	'name' : 'mainCategory',
	'type' : 'string'
}, {
	'name' : 'weightRangeTo',
	'type' : 'string'
},{
	'name' : 'weightRangeFrom',
	'type' : 'string'
}, {
	'name' : 'table1',
	'type' : 'string'
}, {
	'name' : 'table2',
	'type' : 'string'
}, {
	'name' : 'table3',
	'type' : 'string'
},{
	'name' : 'actionId',
	'type' : 'int',
} ];

var popcolumns = [{
	'text' : 'SL. No.',
	'datafield' : 'MupDetSlNo',
	'width' : '100px',
	editable : false
}, {
	'text' : ' Business',
	'datafield' : 'business',
	'width' : '210px',
	editable : false
}, {
	'text' : 'Region',
	'datafield' : 'region',
	'width' : '214px',
	editable : false
}, {
	'text' : 'Segment',
	'datafield' : 'segment',
	'width' : '210px',
	sortable : false,
	editable : false
}, {
	'text' : 'Wt Range To',
	'datafield' : 'weightRangeTo',
	'width' : '220px',
	sortable : false,
	editable : false
}, {
	'text' : 'Wt Range From',
	'datafield' : 'weightRangeFrom',
	'width' : '210px',
}, {
	'text' : 'Table1',
	'datafield' : 'table1',
	'width' : '210px',
}, {
	'text' : 'Table2',
	'datafield' : 'table2',
	'width' : '210px',
}, {
	'text' : 'Table3',
	'datafield' : 'table3',
	'width' : '210px',
}, {
	text : 'Action',
	datafield : 'actionId',
	cellsrenderer : '',
	editable : false,
	sortable : false,
	'width' : '205px'
} ];

var addrow = function(rowid, rowdata, position, commit) {
	commit(true);
}
addGrid(datafield,  popcolumns, updateRows, data, addrow, "#jqxgridp")
}
//Add line item after creating header
$("#createMupDet").on("click", function() {
	 addMupDetailsItemGrid(data);
	$("#addRowSection").show();
	$('#jqxgridp').show();
});
var rowId = 0;
//Add new row in grid to create Mup Type Maintenance
var generaterow = function(i) {
	var row = {};

	row["storeDetSlNo"] = i;
	row["business"] = "";
	row["Region"] ="";
	row["segment"] ="";
	row["mainCategory"] = "";
	row["weightRangeTo"] = "";
	row["weightRangeFrom"] = "";
	row["table1"] = "";
	row["table2"] = "";
	row["table3"] = "";
	rowId = rowId + 1;
	return row;
}
//Add row in grid lines
$("#addMupTypeRow").on("click", function() {
	$("#jqxgridp").jqxGrid('addrow', null, generaterow(rowId + 1));

});


// On click on search button it will load grid
$("#search").on('click', function() {
	mupTypeGrid();
	$("#jqxgrid").show();
	return false;

});
//Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});
