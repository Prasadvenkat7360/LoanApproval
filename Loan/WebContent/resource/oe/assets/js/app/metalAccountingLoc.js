/**
 * ## AUTHOR : DIPANKAR NAHA ## DATE : 18-01-2017 ## DESCRIPTION : SCRIPT TO
 * CREATE METAL ACCOUNTING LOCATION
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

$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    },
});
var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate:'0'
});


// In grid view last coloumn belong to action
var viewMetalAccLocRenderer = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnViewMetalAccLoc"  type="button" id='
			+ row
			+ ' onclick="editMetalAccLoc('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></a>'
	}
}

// Edit metal accounting location grid listing
var editMetalAccLocItemsGrid = function(data) {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafield = [ {
		'name' : 'segmentDesc',
		'type' : 'int'
	}, {
		'name' : 'locationCode',
		'type' : 'string'
	}, {
		'name' : 'locationName',
		'type' : 'string'
	}, {
		'name' : 'rawOrFish',
		'type' : 'string'
	}, {
		'name' : 'createdDate',
		'map' : 'createDate',
		'type' : 'string'
	}, {
		'name' : 'accDate',
		'type' : 'string'
	}, {
		'name' : 'openingGwt',
		'type' : 'float'
	}, {
		'name' : 'openingNwt',
		'type' : 'float'
	}, {
		'name' : 'openingPwt',
		'type' : 'float'
	} ];

	var popcolumns = [ {
		'text' : 'Metal Type Id',
		'datafield' : 'segmentDesc',
		'width' : '11%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Loc Code',
		'datafield' : 'locationCode',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Loc Name',
		'datafield' : 'locationName',
		'width' : '11%',
		sortable : false,
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'RM/FG',
		'datafield' : 'rawOrFish',
		'width' : '14%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Created Date',
		'datafield' : 'createdDate',
		'width' : '12%',
		columntype : 'datetimeinput',
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		editable : false
	}, {
		'text' : 'Acc Date',
		'datafield' : 'accDate',
		'width' : '12%',
		align : 'center',
		columntype : 'datetimeinput',
		cellsalign : 'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		editable : false
	}, {
		'text' : 'Opening Bal Gr. Wt.',
		'datafield' : 'openingGwt',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center'

	}, {
		'text' : 'Opening Bal Net. Wt.',
		'datafield' : 'openingNwt',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center'
	}, {
		'text' : 'Opening Bal Pure Wt.',
		'datafield' : 'openingPwt',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center'
	} ];

	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafield, popcolumns, updateRows, data, addrow, "#jqxgride")
	$("#jqxgride").jqxGrid({
		width : '100%',
		rowsheight : 35,	
		theme: 'energyblue',
	});	
}
// Edit metal accounting location details
var editMetalAccLoc = function(id) {
	$('#popupheaderlabel').text('Edit Metal Account Details	Master');
	$.getJSON('/OrderExecution/api/v1/editMetalMaster?id=' + id,function(data) {
						var selectedRowData = data.payload.mlheader;
						var selectedListData = data.payload.list;
						$("#fromPurityE").show();
						$("#toPurityE").show();
						if (selectedRowData.segmentDesc == "Diamond") {
							$("#fromPuritySectionE").hide();
							$("#fromPuritySectionToE").hide();
						}
						$("#metalLocationIdE").val(selectedRowData.metalLocationId);
						$("#metalTypeIdE").val(selectedRowData.segmentDesc);
						$("#storeOrDcE").val(selectedRowData.storeDcName);
						$("#dcStoreIdE").val(selectedRowData.StoreOrDcId);
						$("#dcStoreNameE").val(selectedRowData.storeOrDC);
						$("#locationCodeE").val(selectedRowData.locationCode);
						$("#locationNameE").val(selectedRowData.locationName);
						$("#createdOnE").val(selectedRowData.createDate);
						$("#createdByE").val(selectedRowData.createdBy);
						$("#rmFgE").val(selectedRowData.rawOrFish);
						if (selectedRowData.meltingFlag == true) {
							$("#meltingFlagE").val('Yes');
						} else {
							$("#meltingFlagE").val('No');
						}
						if (selectedRowData.valuationFlag == true) {
							$("#valuationFlagE").val('Yes');
						} else {
							$("#valuationFlagE").val('No');
						}
						if (selectedRowData.stockCheckFlag == "Yes") {
							$("#scFlagE").val('Yes');
						} else {
							$("#scFlagE").val('No');
						}
						if(selectedRowData.lossLocationFlag == "Yes"){
							$("#lossLocFlagE").val('Yes');
						}else{
							$("#lossLocFlagE").val('No');
						}
						// $("#toPurityE").val(selectedRowData.toPurity);
						// $("#fromPurityE").val(selectedRowData.fromPurity);

						$('#fromPurityE').empty().append('<option value="" selected>--Select--</option>');
						$('#toPurityE').empty().append('<option value="" selected>--Select--</option>');
						var id = selectedRowData.metalTypeId;
						if (id != "") {
							var params = {
								"metalTypeId" : id
							}

				postJSON('/OrderExecution/api/v1/getMetalpurity',JSON.stringify(params),function(data) {
					if (1 == data.resCode) {
					$.each(data.payload.purity,function(key, val) {
					  if (val.skinPurity == selectedRowData.fromPurity) {
						 $('#fromPurityE').append('<option selected value="'+ val.skinPurity + '">'+ val.skinPurity + '</option>');
				    } else {
						$('#fromPurityE').append('<option value="'+ val.skinPurity + '">'+ val.skinPurity + '</option>');
					}
                     if (val.skinPurity == selectedRowData.toPurity) {
						$('#toPurityE').append('<option selected value="'+ val.skinPurity + '">'+ val.skinPurity+ '</option>');
					} else {
						$('#toPurityE').append('<option value="'+ val.skinPurity + '">'+ val.skinPurity + '</option>');
					}
                });
		      }
			});
		}
				$("#createdByE").val(data.payload.createdBy);
				$("#createdOnE").val(data.payload.mlheader.createDate);
				editMetalAccLocItemsGrid(selectedListData);
		});
    }

// loading metal accounting grid data with API call to server side and updating
// rows
function metalAccLocGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' : 'metalType',
		'type' : 'string',
		'map' : 'location>metalSegment>description'
	}, {
		'name' : 'locCode',
		'map' : 'location>code',
		'type' : 'string'
	}, {
		'name' : 'metalLocationId',
		'map' : 'location>id',
		'type' : 'int'
	}, {
		'name' : 'locName',
		'map' : 'location>name',
		'type' : 'string'
	}, {
		'name' : 'rmFg',
		'map' : 'location>locationType',
		'type' : 'string'
	}, {
		'name' : 'createdDate',
		'map' : 'cDate',
		'type' : 'date'
	}, {
		'name' : 'accountDateVal',
		'map' : 'accountDate',
		'type' : 'date'
	}, {
		'name' : 'openGrossWeight',
		'type' : 'float'
	}, {
		'name' : 'openNetWeight',
		'type' : 'float'
	}, {
		'name' : 'openPureWeight',
		'type' : 'float'
	},{
		'name' : 'storeOrDC',
		'type' : 'string',
		'map' : 'location>storeOrDC'
	}, {
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'location>id'
	} ];

	var columns = [ {
		'text' : 'Metal Type ',
		'datafield' : 'metalType',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	},{
		'text' : 'Store/DC Type',
		'datafield' : 'storeOrDC',
		'width' : '12%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'Loc Code',
		'datafield' : 'locCode',
		'width' : '9%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'Loc Name',
		'datafield' : 'locName',
		'width' : '14.5%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'RM/FG',
		'datafield' : 'rmFg',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'Created Date',
		'datafield' : 'createdDate',
		'width' : '9%',
		columntype : 'datetimeinput',
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		editable : false
	}, {
		'text' : 'Account Date',
		'datafield' : 'accountDateVal',
		'width' : '9%',
		columntype : 'datetimeinput',
		cellsformat : 'dd/MM/yyyy',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Opening Bal Gr. Wt.',
		'datafield' : 'openGrossWeight',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center'
	}, {
		'text' : 'Opening Bal Net. Wt.',
		'datafield' : 'openNetWeight',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center'
	}, {
		'text' : 'Opening Bal Pure Wt.',
		'datafield' : 'openPureWeight',
		sortable : false,
		editable : false,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center',
		'width' : '10%'
	}, {
		text : '',
		datafield : 'actionId',
		cellsrenderer : viewMetalAccLocRenderer,
		editable : false,
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		filterable: false,
		'width' : '2.5%'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/metalAccLocList", "list",columns, meltingAccountFilterValues(), updateRows, "id");
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

var meltingAccountFilterValues = function() {
	var metalAccLoc = $("#metalAccLoc").val();
	var dcStoreIdSearch = $("#dcStoreIdSearch").val();
	var locationName = $('#locationName').val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var dcStoreIdSearch = $('#dcStoreIdSearch').val();
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (metalAccLoc != "" && metalAccLoc != null) {
		fieldFilters.fieldFilters["storeOrDctype"] = metalAccLoc;
	}
	if (dcStoreIdSearch != "" && dcStoreIdSearch != null) {
		fieldFilters.fieldFilters["storeOrDcId"] = dcStoreIdSearch;
	}
	if (locationName != "" && locationName != null) {
		fieldFilters.fieldFilters["locationName"] = locationName;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	return fieldFilters;

};

$('#create').on('click', function() {
	$.getJSON('/OrderExecution/api/v1/metalAccountLocationLOV', function(data) {
		$('#createdBy').val(data.payload.createdBy);
		$('#createdOn').val(data.payload.createdon);
	});

});
// this function is done by POOJA
// On change of DC/store type loading DC/store ID and append to the drop down
$("#storeOrDc").on("change",function() {
	$('#dcStoreId').empty().append('<option value="" selected>--Select--</option>');
			var id = $('#storeOrDc').val();
			if (id != "") {
				$.getJSON('/OrderExecution/api/v1/metalAccountLOV?page=storeOrDc&sdc='+ id, function(data) {
							// iterate over the data and append a select option
				   $.each(data.payload.allStores, function(key, val) {
								$('#dcStoreId').append('<option value="' + val.id + '">' + val.name + '</option>');
					});
				});
			  }
		 });

// done by POOJA
// on change of DC/store type loading DC/store ID and append to the drop down
$("#metalAccLoc").on("change",function() {
		$('#dcStoreIdSearch').empty().append('<option value="" selected>--Select--</option>');
		 var id = $('#metalAccLoc').val();
			if (id != "") {
				$.getJSON('/OrderExecution/api/v1/metalAccountLOV?page=storeOrDc&sdc='+ id, function(data) {
							// iterate over the data and append a select option
							$.each(data.payload.allStores, function(key, val) {
								$('#dcStoreIdSearch').append('<option value="' + val.id + '">' + val.name + '</option>');
							});
						});
			}
		});

// API call for metalTypeId append to the drop down
var onloadLov = function(){
$.getJSON('/OrderExecution/api/v1/metalAccountLocationLOV', function(data) {
	$('#metalTypeId').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.sTypes, function(key, val) {
		$('#metalTypeId').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
	$('#locationName').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.locList, function(key, val) {
		$('#locationName').append('<option value="' + val.id + '">' + val.description + '</option>');
	});

});
}

onloadLov();
// API Call for from purity
$("#metalTypeId").on("change",function() {
		$('#fromPurity').empty().append('<option value="" selected>--Select--</option>');
		$('#toPurity').empty().append('<option value="" selected>--Select--</option>');
		  var id = $('#metalTypeId').val();
			if (id == 2) {
				$("#fromPurityField").hide();
				$("#toPurityField").hide();
			} else {
				$("#fromPurityField").show();
				$("#toPurityField").show();
				var params = {
					"metalTypeId" : id
			}
              postJSON('/OrderExecution/api/v1/getMetalpurity', JSON.stringify(params), function(data) {
				if (1 == data.resCode) {
					$.each(data.payload.purity, function(key, val) {
						$('#fromPurity').append('<option value="' + val.skinPurity + '">' + val.skinPurity + '</option>');
						$('#toPurity').append('<option value="' + val.skinPurity + '">' + val.skinPurity + '</option>');
								});
							}

						});

						$("#toPurity").on("change",function() {
					      var fromPurity = $("#fromPurity").val();
							var toPurity = $("#toPurity").val();
							  if (toPurity < fromPurity) {
								$.growl.error({
								  message : "To Purity should be greater than or equal to From purity",
								  duration : 10000
								});
							  }
						  });
						$("#fromPurity").on("change",function() {
							var fromPurity = $("#fromPurity").val();
							var toPurity = $("#toPurity").val();
								if (fromPurity > toPurity && toPurity !== "") {
								  $.growl.error({
										message : "To Purity should be greater than or equal to From purity",
										duration : 10000
									});
								  }
							  });
					        }
				        });


$("#toPurityE").on("change",function() {
		var fromPurity = $("#fromPurityE").val();
		var toPurity = $("#toPurityE").val();
		  if (toPurity < fromPurity) {
			 $.growl.error({
					message : "To Purity should be greater than or equal to From purity",
					duration : 10000
				});
			  }
			});

$("#fromPurityE").on("change",function() {
		var fromPurity = $("#fromPurityE").val();
		var toPurity = $("#toPurityE").val();
		 if (toPurity < fromPurity && toPurity !== "") {
			$.growl.error({
				message : "To Purity should be greater than or equal to From purity",
				duration : 10000
			 });
			}
		});

// Validating metal accounting fields
var validateMetalAccLocFields = function() {
	var metalTypeId = $("#metalTypeId").val();
	var storeDcName = $("#storeDcName").val();
	var StoreOrDcId = $("#storeOrDcId").val();
	var locationCode = $("#locationCode").val();
	var locationName = $("#locationName").val();
	var rawOrFish = $("#rawOrFish").val();
	var meltingFlag = $("#meltingFlag").val();
	var valuationFlag = $("#valuationFlag").val();
	var fromPurity = $("#fromPurity").val();
	var toPurity = $("#toPurity").val();

	var validation = true;

	if (metalTypeId == "" || storeDcName == "" || StoreOrDcId == ""
			|| locationCode == "" || locationName == "" || rawOrFish == ""
			|| meltingFlag == "" || valuationFlag == "" || fromPurity == ""
			|| toPurity == "") {
		validation = false;
	}
	return validation;
}

// Create and save metal accounting location details
function addMetalAccLocItemsGrid(data) {
	var updateRows = function(rowid, newdata, commit) {

		openingBalGrWt = parseFloat(newdata['openingBalGrWt']);
		openingBalNetWt = parseFloat(newdata['openingBalNetWt']);
		openingBalPureWt = parseFloat(newdata['openingBalPureWt']);

		$("#jqxgridp").jqxGrid('setcellvalue', rowid, 'openingBalGrWt',newdata['openingBalGrWt']);
		$("#jqxgridp").jqxGrid('setcellvalue', rowid, 'openingBalNetWt',newdata['openingBalNetWt']);
		$("#jqxgridp").jqxGrid('setcellvalue', rowid, 'openingBalPureWt',newdata['openingBalPureWt']);

		commit(true);
	}

	var datafield = [ {
		'name' : 'segmentDesc',
		'type' : 'int'
	}, {
		'name' : 'locCode',
		'type' : 'string'
	}, {
		'name' : 'locName',
		'type' : 'string'
	}, {
		'name' : 'rmFg',
		'type' : 'string'
	}, {
		'name' : 'createdDate',
		'type' : 'string'
	}, {
		'name' : 'accDate',
		'type' : 'string'
	}, {
		'name' : 'openingBalGrWt',
		'type' : 'float'
	}, {
		'name' : 'openingBalNetWt',
		'type' : 'float'
	}, {
		'name' : 'openingBalPureWt',
		'type' : 'float'
	}, {
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'id'
	} ];

	var popcolumns = [ {
		'text' : 'Metal Type ',
		'datafield' : 'segmentDesc',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Loc Code',
		'datafield' : 'locCode',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Loc Name',
		'datafield' : 'locName',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'RM/FG',
		'datafield' : 'rmFg',
		'width' : '10%',
		sortable : false,
		cellsalign : 'center',
		align : 'center',
		editable : false
	}, {
		'text' : 'Created Date',
		'datafield' : 'createdDate',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Acc Date',
		'datafield' : 'accDate',
		'width' : '10%',
		columntype : 'datetimeinput',
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		editable : false
	}, {
		'text' : 'Opening Bal Gr. Wt.',
		'datafield' : 'openingBalGrWt',
		'width' : '10%',
		sortable : false,
		editable : true,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center'
	}, {
		'text' : 'Opening Bal Net. Wt.',
		'datafield' : 'openingBalNetWt',
		'width' : '10%',
		sortable : false,
		editable : true,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center'
	}, {
		'text' : 'Opening Bal Pure Wt.',
		'datafield' : 'openingBalPureWt',
		'width' : '10%',
		editable : true,
		cellsformat : 'd3',
		cellsalign : 'right',
		align : 'center'
	}, {
		text : 'Action',
		datafield : 'Delete',
		'width' : '10%',
		columntype : 'button',
		cellsrenderer : function() {
			return "Delete";
		},
		buttonclick : function(row) {
			id = $("#jqxgridp").jqxGrid('getrowid', row);
			$("#jqxgridp").jqxGrid('deleterow', id);
			$("#addLineItems").attr("disabled",false);
		}
	} ];

	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafield, popcolumns, updateRows, data, addrow, "#jqxgridp")
	$("#jqxgridp").jqxGrid({
		width : '100%',
		rowsheight : 35,	
		theme: 'energyblue',
	});	
}

// Add line item after creating header


var rowId = 0;
// Add new row in grid to create stone accounting location
var generaterow = function(i) {
	var row = {};

	row["metalAccLocSerialNo"] = i;
	row["segmentDesc"] = $("#metalTypeId option:selected").text();
	row["locCode"] = $("#locationCode").val();
	row["locName"] = $("#locationNameC").val();
	row["rmFg"] = $("#rmFg").val();
	row["createdDate"] = $("#createdOn").val();
	row["accDate"] = $("#createdOn").val();
	row["openingBalGrWt"] = "";
	row["openingBalNetWt"] = "";
	row["openingBalPureWt"] = "";

	rowId = rowId + 1;
	return row;
}

// Add row in grid lines
$("#addLineItems").on("click", function() {
	var rowscount = $("#jqxgridp").jqxGrid('getdatainformation').rowscount;
	if(rowscount == 0){
	$("#jqxgridp").jqxGrid('addrow', null, generaterow(rowId + 1));
	}
	/*else{
		$("#addLineItems").attr("disabled",true);
	}*/
});

var saveRecordsmetalAccLocDetails = function() {
	var stoneAccLoclines = [];

	var rows = $('#jqxgridp').jqxGrid('getrows');
	if (rows.length == 0) {
		$.growl.error({
			message : "Fields are mandatory!!",
			duration : 10000
		});
		return false;
	}
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];

		if (isNaN(parseFloat(rows[i].openingBalGrWt)) == true) {
			$.growl.error({
				message : "Please select opening balance gross wt.",
				duration : 10000
			});
			return false;
		}
		
		if (isNaN(parseFloat(rows[i].openingBalPureWt)) == true) {
			$.growl.error({
				message : "Please select opening balance pure wt.",
				duration : 10000
			});
			return false;
		}
		
		if (isNaN(parseFloat(rows[i].openingBalNetWt)) == true) {
			$.growl.error({
				message : "Please select opening balance net wt.",
				duration : 10000
			});
			return false;
		}
		stoneAccLoclines.push({
			"openGrossWeight" : row.openingBalGrWt,
			"openPureWeight" : row.openingBalPureWt,
			"openNetWeight" : row.openingBalNetWt,
			"receiptGrossWeight" : "",
			"receiptNetWeight" : "",
			"issueGrossWeight" : "",
			"issueNetWeight" : "",
			"issuePureWeight" : ""

		});
	}

	var metalAccLocDetails = {
		"metalTypeId" : $("#metalTypeId").val(),
		"storeDcName" : $("#storeOrDc").val(),
		"storeOrDC" : $("#storeOrDc").val(),
		"locationName" : $("#locationNameC").val(),
		"rawOrFish" : $("#rmFg").val(),
		"StoreOrDcId" : $("#dcStoreId").val(),
		"storeOrDCFlag" : ($("#storeOrDc").val() == "Store") ? "true" : "false",
		"locationCode" : $("#locationCode").val(),
		"meltingFlag" : $('input[name=meltingFlag]:checked').val(),
		"valuationFlag" : $('input[name=valuationFlag]:checked').val(),
		"fromPurity" : $("#fromPurity").val(),
		"toPurity" : $("#toPurity").val(),
		"materialType" : $("#rmFg").val(),
		"stockCheckFlag" :$("#scFlagC").val(),
		"lossLocationFlag" :$("#lossLocFlagC").val(),
		"metalAccLocDetails" : stoneAccLoclines
	}
	return metalAccLocDetails;
}

 $("#saveMetalAccLoc").on('click',function() {
	 trimmer();
		var metalDet = saveRecordsmetalAccLocDetails();
			if (metalDet) {
			  postJSON('/OrderExecution/api/v1/createMetalAccLocationDetails',JSON.stringify(metalDet), function(data) {
				if (data.resCode == "1") {
				  $.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				 $("#createMetalAccLoc").modal('hide');
					//metalAccLocGrid();
					onloadLov();
				} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
				}
			 });
			}
		});

// Export Record as per search criteria
$("#export").on("click",function() {
			var data;
			var newData = [];
			var metalAccLoc = $("#metalAccLoc").val();
			var dcStoreIdSearch = $("#dcStoreIdSearch").val();
			var locationName = $('#locationName').val();
			var dcStoreIdSearch = $('#dcStoreIdSearch').val();
			fieldFilters = {
				"fieldFilters" : {}
			};

			if (metalAccLoc != "" && metalAccLoc != null) {
				fieldFilters.fieldFilters["storeOrDctype"] = metalAccLoc;
			}
			if (dcStoreIdSearch != "" && dcStoreIdSearch != null) {
				fieldFilters.fieldFilters["storeOrDcId"] = dcStoreIdSearch;
			}
			if (locationName != "" && locationName != null) {
				fieldFilters.fieldFilters["locationName"] = locationName;
			}
			var sysdate = moment().format('DDMMYYYYHHmmSS');
			var rows = $("#jqxgrid").jqxGrid('getrows');
			if(typeof rows == "undefined"){
				$.growl.error({
					message : "No Data to Export.",
					duration : 10000
				});
				return false;
			}else{		
				var rows = $("#jqxgrid").jqxGrid('getdatainformation');
				if(rows.rowscount != 0){
		        postJSON('/OrderExecution/api/v1/exportMetalAccLocMasterList', JSON.stringify(meltingAccountFilterValues()), function(response) {
				if(response != null){
				data = response.payload.list;
				for (i = 0; i < data.length; i++) {
				 newData.push({ 
					 	'Store/Dc Type' : (data[i].storeDcName != null) ? data[i].storeDcName :"",
					 	'Store/Dc Id' : (data[i].StoreOrDcId != null) ? data[i].StoreOrDcId : "",
					 	'Store/Dc Name' : (data[i].storeOrDC != null) ? data[i].storeOrDC : "",			
					 	'Melting Flag' : (data[i].meltingFlag != null) ? data[i].meltingFlag : "" ,
					    'Valuation Flag' : (data[i].valuationFlag != null) ? data[i].valuationFlag : "" ,
						'From Purity' : (data[i].fromPurity != null) ? data[i].fromPurity : "",
						'To Purity' : (data[i].toPurity != null) ? data[i].toPurity : "",
						'Metal Segment Name' : (data[i].segmentDesc != null) ? data[i].segmentDesc :"" ,
						'Location Code':(data[i].locationCode != null) ? data[i].locationCode : "",
						'Location Name' : (data[i].locationName != null) ? data[i].locationName :"",
						'Raw Material/Finished Good': (data[i].rawOrFish != null) ? data[i].rawOrFish :"",
						'Created Date' : (data[i].createDate != null) ? data[i].createDate :"",
						'Account Date' : (data[i].accDate != null) ? data[i].accDate : "" ,
						'Opening Balance Gross Wt' : (data[i].openingGwt != null) ? data[i].openingGwt :"" ,
						'Opening Balance Net Wt' : (data[i].openingNwt != null) ? data[i].openingNwt : "",
						'Opening Balance Pure Wt': (data[i].openingPwt != null) ? data[i].openingPwt :"" ,
						'Receipt Gross Wt': (data[i].recptGwt != null) ? data[i].recptGwt : "",
						'Receipt Net Wt' : (data[i].recptNwt != null ) ? data[i].recptNwt :"" ,
						'Receipt Pure Wt' : (data[i].recptPwt != null) ? data[i].recptPwt :"" ,
						'Issue Gross Wt' :(data[i].issGwt != null) ? data[i].issGwt :"" ,
						'Issue Net Wt' : (data[i].issNwt != null) ? data[i].issNwt :"",
						'Issue Pure Wt': (data[i].issPwt != null) ? data[i].issPwt : "",
						'Closing Balance Gross Wt' : (data[i].cloGwt != null) ?  data[i].cloGwt :"",
						'Closing Balance Net Wt' : (data[i].cloNwt != null ) ? data[i].cloNwt :"",
						'Closing Balance Pure Wt' : (data[i].cloPwt != null) ? data[i].cloPwt :"",
					});	
				}
				//JSONToCSVConvertor(newData,	"Metal Accounting Location" + "_" + sysdate, true);	
				 var opts = [{sheetid:'Metal_Accounting_Location',header:true}];
                 var res = alasql('SELECT * INTO XLSX("Metal Accounting Location_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
			}
		});
		}else{
			$.growl.error({
				message : "No Data to Export.",
				duration : 10000
			});
			return false;	
		}
	}
});


// Update Metal Accounting Location details
var editRecordsMetalAccLocDet = function() {

	var meltingFlag = $("#meltingFlagE").val();
	var valuationFlag = $("#valuationFlagE").val();
	if (meltingFlag == 'Yes' || meltingFlag == 'yes') {
		meltingFlag = true;
	} else {
		meltingFlag = false;
	}

	if (valuationFlag == 'Yes' || valuationFlag == 'yes') {
		valuationFlag = true;
	} else {
		valuationFlag = false;
	}
	var metalAccLocDetails = {
		"metalLocationId" : $("#metalLocationIdE").val(),
		"locationCode" : $("#locationCodeE").val(),
		"locationName" : $("#locationNameE").val(),
		"meltingFlag" : meltingFlag,
		"valuationFlag" : valuationFlag,
		"fromPurity" : $('#fromPurityE').val(),
		"toPurity" : $('#toPurityE').val(),
		"stockCheckFlag" :$("#scFlagE").val(),
		"lossLocationFlag":$("#lossLocFlagE").val()
	}

	return metalAccLocDetails;

}

$('#MetalAccLocSearchE').validate(
		{
			errorElement : 'label',
			errorClass : 'help-inline',
			focusInvalid : false,
			ignore : "",
			rules : {

				"locationCodeE" : {
					required : true,
					regx : /^[A-Z]+$/,
					maxlength : 4
				},
				"locationNameE" : {
					required : true,
					regx : /^[a-zA-Z\s]+$/
				}
			},
			messages : {
				'locationCodeE' : {
					regx : "Only capital letter allowed!",
					maxlength : "Code should be maximum of 4 character!"
				},
				'locationNameE' : {
					regx : "Only character with space!"
				},

			},
			submitHandler : function(form) {
				trimmer();
				var metalAccLocDetails = editRecordsMetalAccLocDet();
				if (metalAccLocDetails) {
					postJSON('/OrderExecution/api/v1/updateMetalAccountLoc ',JSON.stringify(metalAccLocDetails), function(data) {
								if (data.resCode == "1") {
									$.growl.notice({
										message : data.mesgStr,
										duration : 10000,
										title : 'Success'
									});
									$('#btnViewMetalAccLoc').modal('hide');
									$('#btnViewMetalAccLoc').on(
											'hidden.bs.modal',
											function() {
												$(this).find('form').trigger(
														'reset');
											});
									metalAccLocGrid();

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

// On click on search button it will load grid
$("#search").on('click', function() {	
	var fDate = $("#fromDateS").val();
	var tDate = $("#toDateS").val();
	 if(fDate == "" || fDate == null || tDate == "" || tDate == null){
		 $.growl.error({
			 message : "Please Select Mandatory Fields !!",
			 duration : 10000,
			 title : 'Error'
		 });
		 return false;
	 }
	 else{
		 metalAccLocGrid(); 
		 $("#jqxgrid").show();
	 } 	
});

// ///////////////////////////////////////////////////////////////////
$('#MetalAccLocSearchC').validate(
		{
			errorElement : 'label',
			errorClass : 'help-inline',
			focusInvalid : false,
			ignore : "",
			rules : {
				"metalTypeId" : {
					required : true
				},
				"storeOrDc" : {
					required : true
				},
				"dcStoreId" : {
					required : true
				},
				"locationCode" : {
					required : true,
					regx : /^[A-Z]+$/,
					maxlength : 4
				},
				"locationNameC" : {
					required : true,
					regx : /^[a-zA-Z\s]+$/
				},
				"rmFg" : {
					required : true
				},
				"createdBy" : {
					required : true
				},
				"createdOn" : {
					required : true
				}
			},
			messages : {
				'locationCode' : {
					regx : "Only capital letter allowed!",
					maxlength : "Code should be maximum of 4 character!"
				},
				'locationNameC' : {
					regx : "Only character with space!"
				}
			},
			submitHandler : function(form) {
				if ($("#metalTypeId").val() != 2
						&& ($("#fromPurity").val() == "" || $("#toPurity")
								.val() == "")) {
					$.growl.error({
						message : "From Purity and To Purity are mandatory!!",
						duration : 10000
					});
					return false;
				} else {

					$("#saveMetalAccLoc").show();
					$("#addLineItems").show();
					$("#showHideLineItems").hide();
					$("#jqxgridp").show();

					addMetalAccLocItemsGrid(data);
					return false;
				}
			}
		});

// Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

$('.modal').on('hidden.bs.modal', function() {
	$(this).find('form')[0].reset();
});

$("#create").on('click', function() {
	$("#saveMetalAccLoc").hide();
	$("#addLineItems").hide();
	$("#showHideLineItems").show();
	var rowscount = $("#jqxgridp").jqxGrid('getdatainformation').rowscount;
	if(rowscount == 1){
		$("#addLineItems").attr("disabled", false);
		}
	$('#createMetalAccLoc').on('hidden.bs.modal', function() {
		$(this).find('form').trigger('reset');
	});
	$("#jqxgridp").jqxGrid('clear');
	$("#jqxgridp").hide();

});

$.validator.addMethod("regx", function(value, element, regexp) {
	if (regexp.constructor != RegExp)
		regexp = new RegExp(regexp);
	else if (regexp.global)
		regexp.lastIndex = 0;
	return this.optional(element) || regexp.test(value);
}, "");
