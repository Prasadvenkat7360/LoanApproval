/**
 * ## AUTHOR : POOJA
 * ## AUTHOR 2:  DIPANKAR NAHA 
 * ## DATE : 02-02-2017
 * ## DESCRIPTION : SCRIPT TO CREATE DC MASTER
 */

// In grid view last column belong to action
function dcMasterGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'region',
		'type' : 'string'
	}, {
		'name' : 'dcName',
		'type' : 'string'
	}, {
		'name' : 'dcCity',
		'type' : 'int'
	}, {
		'name' : 'dcState',
		'type' : 'string'
	}, {
		'name' : 'dcCountry',
		'type' : 'string'
	}, {
		'name' : 'dcAddress',
		'type' : 'string'
	}, {
		'name' : 'createdOn',
		'type' : 'date'
	}, {
		'name' : 'createdBy',
		'type' : 'date'
	}, {
		'name' : 'actionId',
		'type' : 'int',
	} ];

	var columns = [ {
		'text' : 'Region',
		'datafield' : 'region',
		'width' : '130px',
		editable : false
	}, {
		'text' : 'DC Name',
		'datafield' : 'dcName',
		'width' : '150px',
		editable : false
	}, {
		'text' : 'DC City',
		'datafield' : 'dcCity',
		'width' : '150px',
		sortable : false,
		editable : false
	}, {
		'text' : 'DC State',
		'datafield' : 'dcState',
		'width' : '150px',
		sortable : false,
		editable : false
	}, {
		'text' : 'DC Country',
		'datafield' : 'dcCountry',
		'width' : '150px',
		sortable : false,
		editable : true
	}, {
		'text' : 'DC Address',
		'datafield' : 'dcAddress',
		'width' : '150px',
		sortable : false,
		editable : true
	}, {
		'text' : 'Created On',
		'datafield' : 'createdOn',
		'width' : '167px',
		columntype : 'datetimeinput',
		cellsalign : 'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		editable : true,
	}, {
		'text' : 'Created By',
		'datafield' : 'createdBy',
		'width' : '158px',
		cellsformat : 'd2',
		sortable : false,
		editable : true,
		cellsformat : 'd',
		columntype : 'numberinput'
	}, {
		text : 'Action',
		datafield : 'actionId',
		cellsrenderer : '',
		editable : false,
		sortable : false,
		'width' : '65px'
	} ];

	showMyGrid(datafields, "", "list",columns, '', updateRows, "id");

}
// API call for the Region 
/*var params = { };

	var $region =	$('#region');
	postJSON('', JSON.stringify(params), function(data) {
        if (1 == data.resCode) {
			$.each(data.payload.xxxxx, function(key, val) {
			     $region.append(
						'<option value="' + val.id + '">' + val.description
								+ '</option>');
			});
		}
	});
	
// API call for the DC Name
	var params = { };

		var $dcName =	$('#dcName');
		postJSON('', JSON.stringify(params), function(data) {
	        if (1 == data.resCode) {
				$.each(data.payload.xxxxx, function(key, val) {
				     $dcName.append(
							'<option value="' + val.id + '">' + val.description
									+ '</option>');
				});
			}
		});*/

// Create and save DC master details
$("#saveMetalAccLoc").on('click', function() {

});

// On click on search button it will load grid
$("#search").on('click', function() {
	dcMasterGrid();
	$("#jqxgrid").show();
	return false;

});

// Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});