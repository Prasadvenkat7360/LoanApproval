var data = {};
var linkrenderer = function(row, column, value) {
	return '<a class="btn btn-sm btn-primary" type="button"><span class="fa fa-cogs fa-1"></span> Upload </a>'

}
var viewDesignVariationRenderer = function(row, column, value) {
	var data =  $("#grProcessGrid").jqxGrid("getCellvalue", row , 'srl');
	var grFgDetailsGrid = "grFgDetailsGrid";
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnViewGr" type="button" href="grHeaderImage?grId='
				+ data + '"/><i class="fa fa-eye"></i></a>'
		
}
function grFgDetailsGrid() {
	var updateRow = function(rowid, newdata, commit) {
		commit(true);
	}

	var deleteRow = function(rowid, commit) {
		commit(true);
	}
	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}

	var datafields = [ {
		'name' : 'grSrl',
		'type' : 'long'
	}, {
		'name' : 'srl',
		'type' : 'int',
	}, {
		'name' : 'createdOn',
		'type' : 'string'
	}, {
		'name' : 'grossWt',
		'type' : 'double'
	}, {
		'name' : 'netWt',
		'type' : 'double'
	}, {
		'name' : 'pureWt',
		'type' : 'double'
	}, {
		'name' : 'createdBy',
		'type' : 'string'
	}, {
		'name' : 'selectionStatus',
		'type' : 'bool'
	}, {
		'name' : 'isMetalAccountCompleted',
		'type' : 'bool'
	}, {
		'name' : 'isCompleted',
		'type' : 'bool'
	}, {
		'name' : 'view',
		'type' : 'long',
		'map':'srl'
	}
	]

	var columns = [
			{
				'text'  : 'Srl No.',
				'datafield' : 'grSrl',
				'columntype' : 'number',
				'width' : '10%',
				cellendedit : function(row, datafield, columntype, oldvalue,
						newvalue, event) {
				},
				cellsrenderer : function(row, column, value) {
					return '<div href="#?id=' + (value + 1)	+ '"/>' + (value + 1) + '</div>';
				}

			},{
				'text' : 'IGR Date',
				'datafield' : 'createdOn',
				'width' : '16%',
				editable : false
			},{
				'text' : 'IGR#',
				'datafield' : 'srl',
				'width' : '14%',
				editable : false
			},{
				'text' : 'IGR Gross Wt',
				'datafield' : 'grossWt',
				'width' : '15%',
				editable : false
			},{
				'text' : 'IGR Net Wt',
				'datafield' : 'netWt',
				'width' : '13%',
				editable : false

			},{
				'text' : 'IGR Pure Wt',
				'datafield' : 'pureWt',
				'width' : '13%',
				editable : false

			},{
				'text' : 'IGR Done By',
				'datafield' : 'createdBy',
				'width' : '13%',
				sortable : false,
				editable : false,

			},{
				'text' : 'View',
				datafield : 'view',
				'width' : '3%',
				sortable : false,
				editable : false,
				cellsrenderer : viewDesignVariationRenderer
			},{
				text : '',
				menu : false,
				sortable : false,
				datafield : 'selectionStatus',
				columntype : 'checkbox',
				'width' : '3%',
				cellbeginedit : metalAccount,
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue) {
					if (newvalue) {
						$("#grProcessGrid").jqxGrid('selectrow', row);
					} else {
						$("#grProcessGrid").jqxGrid('unselectrow', row);
					}
					
					var rows = $("#grProcessGrid").jqxGrid('getrows');
					if(typeof rows != "undefined"){
						var checkArray = [];
						for(var i=0; i<rows.length; i++){
							if(rows[i].isMetalAccountCompleted == false && (rows[i].selectionStatus == true || newvalue == true)){
								checkArray.push(rows[i].srl);
							}
						}
					}
					var length;
					if(newvalue == true){
						length = checkArray.length;
					}else{
						length = checkArray.length -1;
					}
					if(length == 0){
						$("#grMetalAccount").attr('disabled', true);
					}else{
						$("#grMetalAccount").attr('disabled', false);
					}
				},
				renderer : function() {
					return '<div style="margin-left: 10px; margin-top: 5px;"></div>';
				}

			}

	];

	addGrid(datafields, columns, updateRow, data, addrow, "#grProcessGrid");
	$("#grProcessGrid").jqxGrid({
	        height: 175,
	        autoheight: false,
	        columnsheight : 25,
	        columnsresize : true,
	        rowsheight: 20
	});
}

function metalAccount(row, datafield, columntype) {
	var isMetalAccountComp = $('#grProcessGrid').jqxGrid('getcellvalue', row,'isMetalAccountCompleted');
	if (isMetalAccountComp && datafield == "selectionStatus") {
		return false;
	} else {
		return true;
	}
}

var addGRDetails = function(grDetailsId) {
	var row = {};

	row["createdOn"] = grDetailsId.createdOn;
	row["srl"] = grDetailsId.id;
	row["grossWt"] = grDetailsId.grossWt;
	row["netWt"] = grDetailsId.netWt;
	row["pureWt"] = grDetailsId.pureWt;
	row["createdBy"] = grDetailsId.createdBy;
	row["isCompleted"] = grDetailsId.isCompleted;
	row["isMetalAccountCompleted"] = grDetailsId.isMetalAccountCompleted;
	if (true == grDetailsId.isMetalAccountCompleted) {
		row["selectionStatus"] = grDetailsId.isMetalAccountCompleted;
	}
	return row;
}

function metalAccounting() {
	var rows =  $("#grProcessGrid").jqxGrid('getrows');
	var grnoArray = [];
	if(typeof rows != "undefined" && rows.length > 0){
		for(var i=0; i<rows.length; i++){
			if(rows[i].selectionStatus == true){
				grnoArray.push(rows[i].srl);
			}
		}
	}
	var grSlNo = grnoArray.toString();
	
	return grSlNo;
}


$(document).on('change', '.btn-file :file', function() {
	var input = $(this),
		
		label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [label]);
		console.log(input);
	});

	$('.btn-file :file').on('fileselect', function(event, label) {
	    
	    var input = $(this).parents('.input-group').find(':text'),
	        log = label;
	    
	    if( input.length ) {
	        input.val(log);
	    } else {
	        if( log ) alert(log);
	    }
    
	});
	function readURL(input) {
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();
	        
	        reader.onload = function (e) {
	            $('#img-upload').attr('src', e.target.result);
	            $('#img-uploadanchor').attr('href', input.files[0].name);
	            $("#img-upload").removeClass('hide');
	        }
	        
	        reader.readAsDataURL(input.files[0]);
	    }
	}

	$("#uploadGrImg").change(function(){
	    readURL(this);
	}); 
