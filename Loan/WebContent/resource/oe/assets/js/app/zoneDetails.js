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

// Common Code Started
var redirect = function() {
	return showContentPage('zoneDetails', 'bodySwitcher');
}
// For date format 
$.date = function(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
}; 

$('#DcDet').show();
$('#StoreDet').hide();
$('#ZoneTypeDet').hide();
$('input:radio[name=zoneDet]').filter('[value="1"]').attr('checked', true);
$('input[name=zoneDet]:radio').on('click', function() {
	var selectedVal = $(this).val();
	if (selectedVal == 1) {
		$('#DcDet').show();
		$('#StoreDet').hide();
		$('#ZoneTypeDet').hide();
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	} else if (selectedVal == 2) {
		$('#DcDet').hide();
		$('#StoreDet').show();
		$('#ZoneTypeDet').hide();
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	} else if (selectedVal == 3) {
		$('#DcDet').hide();
		$('#StoreDet').hide();
		$('#ZoneTypeDet').show();
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	}
});

// Common Code Ended

// DC J-Query Code ###############################################**STARTED**######################################

var validateDCZone = function() {
	var dcLines = [];
	var rows = $('#jqxgrideD').jqxGrid('getrows');

	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		if(row.code == "" || row.zoneDescription	== "" || row.zoneType	== "" || row.code == null || row.zoneDescription == null || row.zoneType == null){
			$.growl
				.error({
					message : "Please fill mandatory fields!!",
					duration : 10000
				});
			return null;
		}
		
		dcLines.push({
			"dcOrStoreId" : $('#dcName').val(),
			"code" : row.code,
			"description" : row.zoneDescription,
			"zoneTypes" : row.zoneType,
			"locked" : row.locked				
		});

	}
	
	
	return dcLines;
}



//Create DC zone type
$('#createDCDetails').on('click', function(e){	
	trimmer();
	var dcName = $('#dcName option:selected').text();
	
	if(dcName == null || dcName == "" || dcName == "--Select--"){
		$.growl.error({
			message : "DC is mandatory!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	
	var rows = $('#jqxgrideD').jqxGrid('getrows');

	if(rows.length == 0){
		$.growl
		.error({
			message : "Grid field are mandatory!!",
			duration : 10000
		});
		return false;
	}
	var dcLines = [];
	
	var dcLines = validateDCZone();

	if (dcLines) {
			var $link = $(e.target);
		  e.preventDefault();
		  if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 500) {
		  console.log('clicked');
		postJSON('/OrderExecution/api/v1/createDcZone',JSON.stringify(dcLines),function(data) {
			if (data.resCode == "1") {										
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
		$('#createDcDet').modal('hide');
		dcDetailsModalGrid();
     });
		  }
		  $link.data('lockedAt', +new Date());
	     } else {
		  $.growl.error({
				message : "Please fill the compolsary field!!",
				duration : 10000
				});
	        }	
        });

//Generate Row for DC
var rowIdDC = 0;
var generaterowDC = function(i) {
	var row = {};
	
	row["dcSLNo"] = i;
	row["dcName"] = $('#dcName option:selected').text();
	row["zoneId"] = '';
	row["zoneCode"] = '';
	row["zoneDescription"] = '';
	row["zoneType"] = '';
	row["statusN"] = 'Active';
	row["locked"] = true;
	
	rowIdDC = rowIdDC + 1;
	return row;
}

// Add DC details row
$('#addDCDetailsRow').on('click', function(){
	var dcName = $('#dcName option:selected').text();	
	if(dcName == null || dcName == "" || dcName == "--Select--"){
		$.growl.error({
			message : "DC is mandatory!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$("#jqxgrideD").jqxGrid('addrow', null, generaterowDC(rowIdDC + 1));
	}
	
});

var zoneType = [];

var onloadZoneType = function(){
	$('#dcNameS').empty().append('<option value="" selected>--Select--</option>');
	$('#dcName').empty().append('<option value="" selected>--Select--</option>');

	$.getJSON('/OrderExecution/api/v1/getZoneEnumType ', function(data) {
		var zoneTypeVal = data.payload.zoneType;
	//	zoneType.push(zoneTypeVal);
		$.each(data.payload.zoneType, function(key, val) {		
			zoneType.push({	"id" : key,"name" : val});
		});
	});
	
	$.getJSON('/OrderExecution/api/v1/storeLOV?page=create', function(data) {
		var dcList = data.payload.allDc;
		$.each(dcList, function(key, val) {
			$('#dcNameS').append('<option  value="' + val.id + '">' + val.name + '</option>');
			$('#dcName').append('<option  value="' + val.id + '">' + val.name + '</option>');
		});
	});
}


onloadZoneType();

//Create DC Details
var dcDetailsModalGrid = function(){
	
	var updateRows = function(rowIdDC, newdata, commit) {
		updates[newdata.id] = {
				"id" : newdata.id,
				"zoneType" : newdata.zoneType,
				"locked" : newdata.locked
			};
	}
	
	/*var status = [{
		"id" : true,
		"name" : "Active"
	},{
		"id" : false,
		"name" : "In-Active"
	}]
	
	var statusSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : status
		};			
	var statusSourceAdapter = new $.jqx.dataAdapter( statusSource, {
		autoBind : true
	});*/
	
	var zoneTypeSource = {
		datatype : 'json',
		datafields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		} ],
		localdata : zoneType
	};
	
	var zoneTypeSourceAdapter = new $.jqx.dataAdapter( zoneTypeSource, {
		autoBind : true
	});
	
	var datafields = [ {
		'name' : 'dcSLNo',
		'type' : 'int'
	}, {
		'name' : 'dcName',
		'type' : 'string'
	}, {
		'name' : 'zoneType',
		'type' : 'string'
	}, {
		'name' : 'zoneId',
		'type' : 'string'
	},{
		'name' : 'zoneDescription',
		'type' : 'string'
	}, {
		'name' : 'locked',
		'type' : 'string'
	}, {
		'name' : 'statusN',
		'type' : 'string'
	}, {
		name : 'zoneTypeN',
		value : 'zoneType',
		values : {
			source : zoneTypeSourceAdapter.records,
			value : 'id',
			name : 'name'
		}
	}/*, {
		name : 'statusN',
		value : 'locked',
		values : {
			source : statusSourceAdapter.records,
			value : 'id',
			name : 'name'
		}
	}*/];
	
	var columns = [   {
		'text' : 'Sl. No.',
		'datafield' : 'dcSLNo',
		'width' : '10%',
		editable : false,
		cellsalign: 'center',
		align: 'center'
	},{
		'text' : 'DC Name',
		'datafield' : 'dcName',		
		'width' : '20%',
		editable : false,
		cellsalign: 'center',
		align: 'center'
	}, {
		'text' : 'Zone Type',
		'datafield' : 'zoneType',
		columntype : 'combobox',
		displayfield : 'zoneTypeN',
		'width' : '20%',
		editable : true,
		cellsalign: 'center',
		align: 'center',
		createeditor : function(row, value, editor) {
			editor.jqxComboBox({
				source : zoneTypeSourceAdapter,
				displayMember : 'name',
				valueMember : 'id'
			});
		},
		cellvaluechanging : function(row, datafields, columntype,oldvalue, newvalue) {
			if (newvalue.value != oldvalue) {
				$("#jqxgrideD").jqxGrid('setcellvalue', row, "zoneTypeN","--Select--");
				$("#jqxgrideD").jqxGrid('setcellvalue', row, "zoneType",null);
			};
		}
	},{
		'text' : 'Zone Code',
		'datafield' : 'code',
		'width' : '13%',
		editable : true,
		cellsalign: 'center',
		align: 'center'
	}, {
		'text' : 'Zone Desc',
		'datafield' : 'zoneDescription',
		'width' : '25%',
		editable : true,
		cellsalign: 'left',
		align: 'center'
	},
	 {
		'text' : 'Status',
		'datafield' : 'locked',
	//	columntype : 'combobox',
		displayfield : 'statusN',
		'width' : '12%',
		editable : false,
		cellsalign: 'center',
		align: 'center',/*
		createeditor : function(row, value, editor) {
			editor.jqxComboBox({
				source : statusSourceAdapter,
				displayMember : 'name',
				valueMember : 'id'
			});
		},*//*
		cellvaluechanging : function(row, datafields, columntype,oldvalue, newvalue) {
			if (newvalue.value != oldvalue) {
				$("#jqxgrideD").jqxGrid('setcellvalue', row, "statusN","--Select--");
				$("#jqxgrideD").jqxGrid('setcellvalue', row, "locked",null);
			};
		}*/		
		}];
	
	var addrow = function(rowIdDC, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows,  "", addrow, "#jqxgrideD");
	
}


//Create DC in Zone Details
$('#createDC').on('click', function(){
	dcDetailsModalGrid();
	$('#jqxgrideD').jqxGrid('clear');
	$('#jqxgrideD').show();
});

//Edit view grid data Store
function editStoreGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
	
	}

	 var datafields = [ {
		'name' : 'dcSLNo',
		'type' : 'int'
	}, {
		'name' : 'storeName',
		'type' : 'string'
	}, {
		'name' : 'id',
		'type' : 'int'
	}, {
		'name' : 'code',
		'type' : 'string'
	}, {
		'name' : 'description',
		'type' : 'string',
		'map' : 'description'
	}, {
		'name' : 'zoneType',
		'type' : 'string'
	},{
		'name' : 'segment',
		'type' : 'string',
		'map' : 'segment>name'
	},{
		'name' : 'segmentId',
		'type' : 'string',
		'map' : 'segment>id'
	},{
		'name' : 'zone',
		'type' : 'string'
	},{
		'name' : 'locked',
		'type' : 'string'
	}];
	
		var columns = [   {
			'text' : 'Sl. No.',
			'datafield' : 'dcSLNo',
			'width' : '120px',
			cellsalign: 'center',
			align: 'center'
		},{
			'text' : 'Store Name',
			'datafield' : 'storeName',		
			'width' : '220px',
			editable : true,
			cellsalign: 'center',
			align: 'center'
		}, {
			'text' : 'Zone Id',
			'datafield' : 'id',
			'width' : '170px',
			editable : true,
			cellsalign: 'center',
			align: 'center'
		},{
			'text' : 'Zone Code',
			'datafield' : 'code',
			'width' : '170px',
			editable : true,
			cellsalign: 'center',
			align: 'center'
		}, {
			'text' : 'Zone Desc',
			'datafield' : 'description',
			'width' : '280px',
			sortable : false,
			editable : true,
			cellsalign: 'left',
			align: 'center'
		},  {
			'text' : 'Zone Type',
			'datafield' : 'zoneType',
			'width' : '160px',
			sortable : false,
			editable : true,
			cellsalign: 'center',
			align: 'center'

		},  {
			'text' : 'Order Metal type',
			'datafield' : 'segment',
			'width' : '160px',
			sortable : false,
			editable : true,
			cellsalign: 'center',
			align: 'center'

		},  {
			'text' : 'Zone',
			'datafield' : 'zone',
			'width' : '160px',
			sortable : false,
			editable : true,
			cellsalign: 'center',
			align: 'center'

		},  {
			'text' : 'Status',
			'datafield' : 'locked',
			'width' : '160px',
			sortable : false,
			editable : true,
			cellsalign: 'center',
			align: 'center'

		}];
		
		var addrow = function(rowIdDC, rowdata, position, commit) {
			commit(true);
		}
		addGrid(datafields, columns, updateRows,  data , addrow, "#jqxgrideStoreE");
		
	}


// Edit view grid data
function editDcGrid(data) {
	var updateRows = function(rowid, newdata, commit) {	
	}
	 var datafields = [ {
		'name' : 'dcSLNo',
		'type' : 'int'
	}, {
		'name' : 'dcOrzoneName',
		'type' : 'string'
	}, {
		'name' : 'zoneTypes',
		'type' : 'string'
	}, {
		'name' : 'zoneId',
		'type' : 'string'
	},{
		'name' : 'description',
		'type' : 'string'
	}, {
		'name' : 'locked',
		'type' : 'string'
	}];
	
		var columns = [   {
			'text' : 'Sl. No.',
			'datafield' : 'dcSLNo',
			'width' : '120px',
			cellsalign: 'center',
			align: 'center'
		},{
			'text' : 'DC Name',
			'datafield' : 'dcOrzoneName',		
			'width' : '220px',
			editable : true,
			cellsalign: 'center',
			align: 'center'
		}, {
			'text' : 'Zone Type',
			'datafield' : 'zoneTypes',
			'width' : '170px',
			editable : true,
			cellsalign: 'center',
			align: 'center'
		},{
			'text' : 'Zone Id',
			'datafield' : 'zoneId',
			'width' : '170px',
			editable : true,
			cellsalign: 'center',
			align: 'center'
		}, {
			'text' : 'Zone Desc',
			'datafield' : 'description',
			'width' : '280px',
			sortable : false,
			editable : true,
			cellsalign: 'left',
			align: 'center'
		},  {
			'text' : 'Status',
			'datafield' : 'locked',
			'width' : '160px',
			sortable : false,
			editable : true,
			cellsalign: 'center',
			align: 'center'

		}];
		
		var addrow = function(rowIdDC, rowdata, position, commit) {
			commit(true);
		}
		addGrid(datafields, columns, updateRows,  data , addrow, "#jqxgrideDC");
		
	}

var rowId = 0;
//Add new row in edit grid 
var generaterowE = function(i) {
	var row = {};

	row["dcSLNo"] = i;
	row["dcName"] = $('#dcName').val();;
	row["zoneType"] = "";
	row["zoneId"] = "";
	row["zoneDescription"] = "";
	row["status"] = "";
	rowId = rowId + 1;
	return row;
}


//Add row in edit grid lines
$("#addDcRow").on("click", function() {	
		$("#jqxgrideDC").jqxGrid('addrow', null, generaterowE(rowId + 1));	
});

var zones =[{
	"id" : true,
	"name" : "Active"
},{
	"id" : false,
	"name" : "In-Active"
}];

var loadAllDropDownEdit = function(zoneType, metalTypeEV, locked){
	$('#zoneTypeE').empty().append('<option value="" selected>--Select--</option>');
	$('#statusE').empty().append('<option value="" selected>--Select--</option>');
	$('#zoneTypeEDc').empty().append('<option value="" selected>--Select--</option>');
	$('#statusEDc').empty().append('<option value="" selected>--Select--</option>');
	$('#metalTypeE').empty().append('<option value="" selected>--Select--</option>');
	
	$.getJSON('/OrderExecution/api/v1/getZoneEnumType ', function(data) {
		var zoneTypeVal = data.payload.zoneType;
		$.each(zoneTypeVal, function(key, val) {			
			if(zoneType === key ){
				$('#zoneTypeE').append('<option selected="selected" value="' + key + '">'+ val + '</option>');
				$('#zoneTypeEDc').append('<option selected="selected" value="' + key + '">'+ val + '</option>');
			}else{
				$('#zoneTypeE').append('<option value="' + key + '">'+ val + '</option>');
				$('#zoneTypeEDc').append('<option value="' + key + '">'+ val + '</option>');
			}
		});
	});
	
	//$.getJSON('/OrderExecution/api/v1/metalAccountLocationLOV', function(data) {
		$.getJSON('/OrderExecution/api/v1/getAllMetalSegments', function(data) {
			var metalTypeE = data.payload.sTypes;
			
			$.each(metalTypeE, function(key, val) {			
				if(metalTypeEV === val.id ){
					$('#metalTypeE').append('<option selected="selected" value="' + val.id + '">'+ val.description + '</option>');
				}else{
					$('#metalTypeE').append('<option value="' + val.id + '">'+ val.description + '</option>');
				}
			});
		});

	
	$.each(zones, function(key, val) {		
	
		if(locked === val.id ){
			$('#statusE').append('<option selected="selected" value="' + val.id + '">'+ val.name + '</option>');
			$('#statusEDc').append('<option selected="selected" value="' + val.id + '">'+ val.name + '</option>');
		}else{
			$('#statusE').append('<option value="' + val.id + '">'+ val.name + '</option>');
			$('#statusEDc').append('<option value="' + val.id + '">'+ val.name + '</option>');
		}
	});
}

$('#updateStoreE').on('click', function(){
	trimmer();
	var zoneCode = $('#zoneCodeE').val();
	var zoneId = $('#zoneIdE').val();
	var dcOrStoreId = $('#dcOrStoreIdE').val();
	var description = $('#zoneDescE').val();
	var zoneTypes = $('#zoneTypeE').val();
	var metalSegment = $('#metalTypeE').val();
	var locked = $('#statusE').val();
	if(locked == "true"){
		var ActiveOrInActiveStatus = "Active";
	}else{
		var ActiveOrInActiveStatus = "InActive";
	}
	console.log($('#metalTypeEObj').val());
	var lockedStatus = $('#zoneLockedStatus').val();
	var targetZoneType = $('#zoneTargetTypeE').val();
	
	if($('#metalTypeEObj').val() != null){
		var zoneMetalTypeId = $('#metalTypeEObj').val().join();		
		var array = zoneMetalTypeId.split(',');
		var omTypeArr = [];
		for(var i=0; i<array.length; i++){
			var omTypeObj = {
					"displayOrder": "1",
					"segment": {
						"id": array[i]
					}
				};
			omTypeArr.push(omTypeObj);
		}
	}else{
		var omTypeArr = [];
	}
	var storeZoneDet = 	{"id": zoneId,"code":zoneCode,"description":description,"zoneTypes":zoneTypes,"ActiveOrInActiveStatus":ActiveOrInActiveStatus,"metalsegmentId":metalSegment,"dcOrStoreId":dcOrStoreId, "orderMetalTypeList" : omTypeArr,  "lockedStatus" : lockedStatus, "targetZoneType" : { "id" :  targetZoneType }};
	postJSON('/OrderExecution/api/v1/updateStoreZone',JSON.stringify(storeZoneDet),function(data) {
				if (data.resCode == "1") {					
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});					
				} else{
					$.growl.error({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});					
				}
				$('#maintainStoreE').modal('hide');
				storeGrid();
				
			});
	
});

$('#updateDCE').on('click', function(){
	trimmer();
	var zoneCode = $('#zoneCodeEDc').val();
	var zoneId = $('#zoneIdEDc').val();
	var dcOrStoreId = $('#dcOrStoreIdEDc').val();
	var description = $('#zoneDescEDc').val();
	var zoneTypes = $('#zoneTypeEDc').val();
	var locked = $('#statusEDc').val();
	var storeZoneDet = 	{"id": zoneId,"code":zoneCode,"description":description,"zoneTypes":zoneTypes,"locked":locked,"dcOrStoreId":dcOrStoreId}
	
	postJSON('/OrderExecution/api/v1/upDateDcZone ',JSON.stringify(storeZoneDet),function(data) {
		if (data.resCode == "1") {					
			$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});			
		} else{
			$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});					
			}
				$('#maintainDcE').modal('hide');
				dcGrid();
			});
});

//On click on Edit view grid data
var editDcE = function(row) {	
	$('#popupheaderlabelDC').text('Edit DC Zone Details');
	var lockedStatus;
	$.getJSON('/OrderExecution/api/v1/getDcZoneById?zoneId=' + row, function(data) {
		var dataVal = data.payload.dcZone;
		loadAllDropDownEdit(dataVal.zoneType, dataVal.segment, dataVal.locked);
		$('#dcOrStoreIdDc').val(dataVal.dc.id);
		$('#zoneIdEDc').val(dataVal.id);
		$('#zoneCodeEDc').val(dataVal.code);
		$('#zoneDescEDc').val(dataVal.description);
		$('#zoneTypeEDc').val(dataVal.zoneType);
		$('#metalTypeEDc').val(dataVal.segment);		
	});
}

var lockedArr = [{
	"id" : "Locked",
	"name" : "Locked"
},{
	"id" : "Unlocked",
	"name" : "Unlocked"
}];

var loadLockedStatus = function(lockedStatus){
	
	$('#zoneLockedStatus').empty().append('<option value="" selected>--Select--</option>');
	$.each(lockedArr, function(k, v){
		if(lockedStatus == null){
			$('#zoneLockedStatus').append('<option  value="' + v.id + '">' + v.name + '</option>');
		}else{
			if(v.id == lockedStatus){
				$('#zoneLockedStatus').append('<option selected value="' + v.id + '">' + v.name + '</option>');
			}else{
				$('#zoneLockedStatus').append('<option  value="' + v.id + '">' + v.name + '</option>');
			}
		}
		
	});

}

var loadZoneTarget = function(zoneTargetType){
	
	$('#zoneTargetTypeE').empty().append('<option value="" selected>--Select--</option>');
	
	// $.getJSON('/OrderExecution/api/v1/metalAccountLocationLOV', function(data) {
	$.getJSON('/OrderExecution/api/v1/getAllMetalSegments', function(data) {
		
		$.each(data.payload.sTypes, function(k, v){
			if(zoneTargetType == null){
				$('#zoneTargetTypeE').append('<option  value="' + v.id + '">' + v.description + '</option>');
			}else{
				if(v.id == zoneTargetType){
					$('#zoneTargetTypeE').append('<option selected value="' + v.id + '">' + v.description + '</option>');
				}else{
					$('#zoneTargetTypeE').append('<option  value="' + v.id + '">' + v.description + '</option>');
				}
			}
			
		});
		
		
		});	
}

var loadMetalType = function(metalType){
	$('#metalTypeE').empty().append('<option value="" selected>--Select--</option>');
	//$.getJSON('/OrderExecution/api/v1/metalAccountLocationLOV', function(data) {
		$.getJSON('/OrderExecution/api/v1/getAllMetalSegments', function(data) {
		var metalTypeE = data.payload.sTypes;
		
	/*	$.each(metalTypeE, function(k, v) {			
			if(metalType == null){
				$('#metalTypeE').append('<option  value="' + v.id + '">' + v.description + '</option>');
			}else{
				if(v.id == metalType){
					$('#metalTypeE').append('<option selected value="' + v.id + '">' + v.description + '</option>');
				}else{
					$('#metalTypeE').append('<option  value="' + v.id + '">' + v.description + '</option>');
				}
			}
		});*/
		
		
		var s = '<select id="metalTypeEObj"  name="metalTypeEObj" class="form-control" multiple="multiple">';
		if(metalType == null){
			$.each(metalTypeE, function(key, val) {					
				s += '<option value="' + val.id + '">' + val.description
						+ '</option>';	
			});
		}else{
			 var result = [];
			
			 $.each(metalTypeE, function(key, val) {	
				 $.each(metalType, function(k,v){
					 if( v.segment.id == val.id){		
						 result.push(val.id);
						 s += '<option selected  value="' + val.id + '">' + val.description 	+ '</option>';						 
					}
				 });
				 
				 if (result.indexOf(val.id) == -1){
					 result.push(val.id);
					 s += '<option value="' + val.id + '">' + val.description + '</option>';
				 }
				
			})
		}
		s += '</select>';
		$("#metalTypeE").html(s);
		$('#metalTypeEObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	});
}

var editStoreE = function(row) {	
	$('#popupheaderlabelStoreE').text('Edit Store Zone Details');
	var lockedStatus;
	$.getJSON('/OrderExecution/api/v1/editZoneStoreSDetailsById?zoneId='+ row, function(data) {
		var dataVal = data.payload.details;
		loadAllDropDownEdit(dataVal[0].zoneTypes, dataVal[0].zoneMetaltypeId.id, dataVal[0].zoneActiveOrInActive);
		$('#dcOrStoreId').val(dataVal[0].dcOrStoreId);
		$('#zoneIdE').val(dataVal[0].Id);
		$('#zoneCodeE').val(dataVal[0].code);
		$('#zoneDescE').val(dataVal[0].description);
		$('#zoneTypeE').val(dataVal[0].zoneTypes);
		
		$('#storeNameE').val(dataVal[0].storeName);
		
//		$("#zoneMetalTypeId").val(dataVal[0].zoneMetaltypeId[0].id);
		
		if(dataVal[0].lockedStatus != null){
			loadLockedStatus(dataVal[0].lockedStatus);
		}else{
			loadLockedStatus(null);
		}
		
		if(dataVal[0].targetZoneType != null){
			loadZoneTarget(dataVal[0].targetZoneType.id);
		}else{
			loadZoneTarget(null);
		}
		
		
		if(dataVal[0].orderMetalTypeList != null){
			loadMetalType(dataVal[0].orderMetalTypeList);
		}else{
			loadMetalType(null);
		}
		
		
	});

	
}
// Edit DC details in jqxGrid
var editDc = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
		return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#maintainDcE"  type="button" id='
				+ row
				+ ' onclick="editDcE('
				+ value
				+ ')"/><i class="fa fa-pencil fa-sm"></i></button>'
	}
}

var editStore = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
		return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#maintainStoreE"  type="button" id='
		+ row
		+ ' onclick="editStoreE('
		+ value
		+ ')"/><i class="fa fa-pencil fa-sm"></i></button>'
	}
}
// DC filter values in Zone Details
var dcFilterValues = function(){
	var dcNameS = $("#dcNameS").val();
	fieldFilters = {
			"fieldFilters" : {}
		};		
	if(dcNameS != "" && dcNameS != null){			
		fieldFilters.fieldFilters["Id"] = dcNameS;
	}
	return fieldFilters;

};

// DC Grid
var dcGrid = function(){
	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [ {
		'name' : 'dcOrzoneName',
		'type' : 'int'
	}, {
		'name' : 'id',
		'type' : 'int',
		'map': 'id',
	}, {
		'name' : 'code',
		'type' : 'string'
	}, {
		'name' : 'description',
		'type' : 'string'
	}, {
		'name' : 'zoneTypes',
		'type' : 'string'
	}, {
		'name' : 'status',
		'type' : 'string'
	},{
		'name' : 'id',
		'type' : 'int'
	}];

	var columns = [  {
		'text' : 'DC Name',
		'datafield' : 'dcOrzoneName',
		'width' : '20%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align: 'center'
	},{
		'text' : 'Zone Type',
		'datafield' : 'zoneTypes',
		'width' : '16%',
		sortable : true,
		editable : false,
		cellsalign: 'center',
		align: 'center'
	}, {
		'text' : 'Zone Id',
		'datafield' : 'Id',
		'width' : '13%',
		editable : false,
		cellsalign: 'center',
		align: 'center'
	}, {
		'text' : 'Zone Code',
		'datafield' : 'code',
		'width' : '16%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align: 'center'
	}, {
		'text' : 'Zone Desc',
		'datafield' : 'description',
		'width' : '20.5%',
		sortable : false,
		editable : false,
		cellsalign: 'left',
		align: 'center'
	},  {
		'text' : 'Status',
		'datafield' : 'status',
		'width' : '12%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align: 'center'

	}, {
		'text' : '',
		'datafield' : 'id',
		cellsrenderer : editDc,
		'width' : '2.5%',
		sortable : false,
		filterable: false,
		editable : false,
		cellsalign: 'center',
		align: 'center'

	}];

	showMyGrid(datafields,	"/OrderExecution/api/v1/searchDcZone", "list",columns, dcFilterValues(), updateRows);
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		rowdetails : true,
		virtualmode : true
	});
};

//Loading Grid of DC
$("#searchDC").on('click', function() {
	var dcNameS = $('#dcNameS').val();
	if(dcNameS == ""){
		$.growl.error({
			message : "Please fill all the mandatory fields",
			duration : 10000
		});
		return false;
	}

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();	
	dcGrid();
	$("#jqxgrid").show();
});

// DC J-Query Code ####################################################**ENDED**#################################

var dcName = [];
var countrySource = [];
var metalTypeVal = [];
var zoneTYpeTarget = [];
$.getJSON('/OrderExecution/api/v1/vendorMasterLOV?page=search', function(data) {
	
	$.each(data.payload.vCity, function(key, val) {		
		 dcName.push({"id" : val.id,	"name" : val.name});
	});
	
	$.each(data.payload.vCountry, function(key, val) {		
		countrySource.push({"id" : val.id,	"name" : val.name});
	});	
	});

//$.getJSON('/OrderExecution/api/v1/metalAccountLocationLOV', function(data) { 
	$.getJSON('/OrderExecution/api/v1/getAllMetalSegments', function(data) { 
	
	$.each(data.payload.sTypes, function(key, val) {		
		metalTypeVal.push({"id" : val.id,	"name" : val.description});
	});
	
	$.each(data.payload.sTypes, function(key, val) {	
		zoneTYpeTarget.push({"id" : val.id,	"name" : val.description});
	});
	
	});


//Create Store Details
var storeDetailsModalGrid = function(){
	
	var updateRows = function(rowIdS, newdata, commit) {
	}
	
	var zoneTYpeTargetSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : zoneTYpeTarget
		};
		
	
	var zoneTYpeTargetSourceAdapter = new $.jqx.dataAdapter( zoneTYpeTargetSource, {
		autoBind : true
	});
	
	var status = [{
		"id" : true,
		"name" : "Locked"
	},{
		"id" : false,
		"name" : "Unlocked"
	}];
	
	var statusSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : status
		};
		
	
	var statusSourceAdapter = new $.jqx.dataAdapter( statusSource, {
		autoBind : true
	});
	
	var orderMetalTypeSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : metalTypeVal
		};
	
	var orderMetalTypeSourceAdapter = new $.jqx.dataAdapter(orderMetalTypeSource, {
		autoBind : true
	});
	
	var zoneTYpeSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : zoneType
		};
	
		

		var zoneTYpeSourceAdapter = new $.jqx.dataAdapter(zoneTYpeSource, {
			autoBind : true
		});
	
	var storeNameSource =  {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : storeName
		};
		
		
		var storeNameSourceAdapter = new $.jqx.dataAdapter(storeNameSource, {
			autoBind : true
		});
		
		
	var datafields = [ {
		'name' : 'storeSlNo',
		'type' : 'int'
	}, {
		'name' : 'storeName',
		'type' : 'string'
	}, {
		'name' : 'zoneCode',
		'type' : 'string'
	}, {
		'name' : 'zoneDescription',
		'type' : 'string'
	}, {
		'name' : 'zoneType',
		'type' : 'string'
	}, {
		'name' : 'zoneTargetType',
		'type' : 'string'
	},{
		'name' : 'orderMetalType',
		'type' : 'string',
		value: 'orderMetalType',
		values : {
			source : orderMetalTypeSourceAdapter.records,
			value : 'id',
			name : 'name'
		}
	},{
		'name' : 'zone',
		'type' : 'string'
	},{
		'name' : 'status',
		'type' : 'string'
	}, {
		'name' : 'actionId',
		'type' : 'id'
	}, {
		name : 'zoneTargetTypeN',
		value : 'zoneTargetType',
		values : {
			source : zoneTYpeTargetSourceAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		name : 'zoneTypeN',
		value : 'zoneType',
		values : {
			source : zoneTYpeSourceAdapter.records,
			value : 'id',
			name : 'name'
		}
	}, {
		name : 'statusN',
		value : 'status',
		values : {
			source : statusSourceAdapter.records,
			value : 'id',
			name : 'name'
		}
	}];
	
	var columns = [ {
		'text' : 'SL. No.',
		'datafield' : 'storeSlNo',
		'width' : '8%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align: 'center'
	},  {
		'text' : 'Store Name',
		'datafield' : 'storeName',
		columntype : 'combobox',
		'width' : '15%',
		editable : false,
		cellsalign: 'center',
		align: 'center',
		createeditor : function(row, value, editor) {
			editor.jqxComboBox({
				source : storeNameSourceAdapter,
				displayMember : 'name',
				valueMember : 'id'
			});
		},
		cellvaluechanging : function(row, datafields, columntype,oldvalue, newvalue) {
			if (newvalue.value != oldvalue) {
				$("#jqxgrideS").jqxGrid('setcellvalue', row, "storeName","--Select--");
				$("#jqxgrideS").jqxGrid('setcellvalue', row, "storeName",null);
			};
		}
	}, {
		'text' : 'Zone Code',
		'datafield' : 'zoneCode',
		'width' : '15%',
		sortable : false,
		editable : true,
		cellsalign: 'center',
		align: 'center'
	}, {
		'text' : 'Zone Desc',
		'datafield' : 'zoneDescription',
		'width' : '15%',
		sortable : false,
		editable : true,
		cellsalign: 'left',
		align: 'center'
	}, {
		'text' : 'Zone Type',
		'datafield' : 'zoneType',
		columntype : 'combobox',
		displayfield : 'zoneTypeN',
		'width' : '14%',
		sortable : false,
		editable : true,
		cellsalign: 'center',
		align: 'center',
		createeditor : function(row, value, editor) {
			editor.jqxComboBox({
				source : zoneTYpeSourceAdapter,
				displayMember : 'name',
				valueMember : 'id'
			});
		},
		cellvaluechanging : function(row, datafields, columntype,oldvalue, newvalue) {
			if (newvalue.value != oldvalue) {
				$("#jqxgrideS").jqxGrid('setcellvalue', row, "zoneTypeN","--Select--");
				$("#jqxgrideS").jqxGrid('setcellvalue', row, "zoneType",null);
			};
		}
	}, {
		'text' : 'Zone Target Type',
		'datafield' : 'zoneTargetType',
		columntype : 'combobox',
		'width' : '14%',
		displayfield : 'zoneTargetTypeN',
		sortable : false,
		cellsalign: 'center',
		align: 'center',
		editable : true,
		createeditor : function(row, value, editor) {
			editor.jqxComboBox({
				source : zoneTYpeTargetSourceAdapter,
				displayMember : 'name',
				valueMember : 'id'
			});
		},
		cellvaluechanging : function(row, datafields, columntype,oldvalue, newvalue) {
			if (newvalue.value != oldvalue) {
				$("#jqxgrideS").jqxGrid('setcellvalue', row, "zoneTargetTypeN","--Select--");
				$("#jqxgrideS").jqxGrid('setcellvalue', row, "zoneTargetType",null);
			};
		}
	}, {
		'text' : 'Order Metal Type',
		'datafield' : 'orderMetalType',
		'width' : '14%',
		cellsalign: 'center',
		align: 'center',
		columntype : 'dropdownlist',
		displayfield : 'orderMetalTypeN',
		resizable: false,
		createeditor : function(row, value, editor) {		
			
			editor.jqxDropDownList({
				source : orderMetalTypeSourceAdapter,
				displayMember : 'name',
				valueMember : 'id',
				checkboxes:true
			});
		},
        initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
            // set the editor's current value. The callback is called each time the editor is displayed.
            var items = editor.jqxDropDownList('getItems');
            editor.jqxDropDownList('uncheckAll');
            if (cellvalue != undefined) {
                var values = cellvalue.split(/,\s*/);
                for (var j = 0; j < values.length; j++) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].value == values[j]) {
                            editor.jqxDropDownList('checkIndex', i);
                        }
                    }
                }
            }
        },
        geteditorvalue: function (row, cellvalue, editor) {
            // return the editor's value.
            var checkedItems = editor.jqxDropDownList('getCheckedItems');
            var label = "";
            for (var i = 0; i < checkedItems.length; i++) {
                label += checkedItems[i].label;
                if (i < checkedItems.length - 1) label += ", ";
            }

            return { label: label, value: editor.val() }
        }
	}, {
		'text' : 'Status',
		'datafield' : 'status',
		sortable : false,
		editable : false,
		'width' : '5%',
		cellsalign: 'center',
		align: 'center'

	}
	];
	
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, data, addrow, "#jqxgrideS");
	
}
var rowIdS = 1;
var generaterowS = function(i) {
	var row = {};
	row["storeSlNo"] = i;
	row["storeName"] = $('#storeName option:selected').text();
	row["zoneId"] = '';
	row["zoneCode"] = '';
	row["zoneDescription"] = '';
	row["zoneType"] = '';
	row["zoneTargetType"] = '';
	row["orderMetalType"] = '';
	row["zone"] = '';
	row["status"] = 'Active';
	
	rowIdS = rowIdS + 1;
	return row;
}

$('#addStoreDetailsRow').on('click', function(){	
	var storeName = $('#storeName option:selected').text();
	
	if(storeName == null || storeName == "" || storeName == "--Select--"){
		$.growl.error({
			message : "Store is mandatory!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$("#jqxgrideS").jqxGrid('addrow', null, generaterowS(rowIdS+1));
	}
});
	
$('#createSDT').on('click', function(){
	rowIdS = 1;
    $('#jqxgrideS').jqxGrid('clear');
	storeDetailsModalGrid();
	$('#jqxgrideS').show();
});

var storeFieldFilter = function() {
	var storeNameS = $("#storeNameS").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (storeNameS != "" && storeNameS != null) {
		fieldFilters.fieldFilters["Id"] = storeNameS;
	}
	return fieldFilters;
}

// Store Grid
var storeGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [ {
		'name' : 'storeName',
		'type' : 'id'
	}, {
		'name' : 'Id',
		'type' : 'int'
	}, {
		'name' : 'code',
		'type' : 'string'
	}, {
		'name' : 'description',
		'type' : 'string'
	}, {
		'name' : 'zoneTypes',
		'type' : 'string'
	},{
		'name' : 'zoneHdrTargetType',
		'type' : 'string',
		map : 'targetSegmentName'
	},{
		'name' : 'zoneMetalType',
		'type' : 'string',
		map: 'orderMetalType'
	},{
		'name' : 'zone',
		'type' : 'string'
	},{
		'name' : 'ActiveOrInActiveStatus',
		'type' : 'string'
	},{
		'name' : 'lockedStatus',
		'type' : 'string'
	},{
		'name' : 'actionId',
		'type' : 'int',
		'map': 'Id'
	}];

	var columns = [  {
		'text' : 'Store Name',
		'datafield' : 'storeName',
		'width' : '12%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align: 'center'
	}, {
		'text' : 'Zone Id',
		'datafield' : 'zoneId',
		'width' : '9%',
		editable : false,
		cellsalign: 'center',
		align: 'center'
	}, {
		'text' : 'Zone Code',
		'datafield' : 'code',
		'width' : '12%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align: 'center'
	}, {
		'text' : 'Zone Desc',
		'datafield' : 'description',
		'width' : '15%',
		sortable : false,
		editable : false,
		cellsalign: 'left',
		align: 'center'
	}, {
		'text' : 'Zone Type',
		'datafield' : 'zoneTypes',
		'width' : '12%',
		sortable : true,
		editable : false,
		cellsalign: 'left',
		align: 'center'
	}, {
		'text' : 'Zone Target Type',
		'datafield' : 'zoneHdrTargetType',
		'width' : '12%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align: 'center'
	}, {
		'text' : 'Order Metal Type',
		'datafield' : 'zoneMetalType',
		'width' : '8%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align: 'center'
	}, {
		'text' : 'Status',
		'datafield' : 'ActiveOrInActiveStatus',
		'width' : '4%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align: 'center'

	},{
		'text' : 'Zone Locked Status',
		'datafield' : 'lockedStatus',
		'width' : '12%',
		sortable : false,
		editable : false,
		cellsalign: 'center',
		align: 'center'

	},{
		'text' : '',
		'datafield' : 'actionId',
		'width' : '4%',
		cellsrenderer : editStore,
		sortable : false,
		filterable: false,
		editable : false,
		cellsalign: 'center',
		align: 'center'

	}];

	showMyGrid(datafields,	"/OrderExecution/api/v1/searchStoreZone", "list",	columns, storeFieldFilter(), updateRows);
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
};

//API call for Zone Type append to the drop down
$.getJSON('/OrderExecution/api/v1/getZoneType', function(data) {
	$('#zoneTypeS').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.zoneName, function(key, val) {
		$('#zoneTypeS').append('<option value="' + val.zoneTypeId + '">' + val.zoneName + '</option>');
	});

});
//

$.getJSON('/OrderExecution/api/v1/getStoreOrDcs?type=store', function(data) {
	$('#storeNameS').empty().append('<option value="" selected>--Select--</option>');
	$('#storeName').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.allStoreOrDc, function(key, val) {
		$('#storeNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
		$('#storeName').append('<option value="' + val.id + '">' + val.name + '</option>');
	});

});
var editZone = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
		return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#maintainZoneTypeE"  type="button" id='
		+ row
		+ ' onclick="editZoneType('
		+ row
		+ ')"/><i class="fa fa-pencil fa-sm"></i></button>'
	}
}
//zone Type Search listing filed Filter
var zoneTypefieldFilters = function() {
	var zoneTypeS = $("#zoneTypeS").val();
	
	
	fieldFilters = {
		"fieldFilters" : {
		}
	};

	if (zoneTypeS != "" && zoneTypeS != null) {
		fieldFilters.fieldFilters["zoneTypeId"] = zoneTypeS;
	}
	return fieldFilters;
}

// Zone Type Grid
var zoneTypeGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [  {
		    'name' : 'zoneTypeId',
		    'type' : 'string'
	    }, {
			'name' : 'zoneNme',
			'type' : 'string'
		}, {
			'name' : 'description',
			'type' : 'string'
		}, {
			'name' : 'createdDate',
			'type' : 'date'
		}, {
			'name' : 'createdBy',
			'type' : 'string'
		}, {
			'name' : 'actionId',
			'type' : 'id'
		}];

		var columns = [ {
			'text' : 'Zone Type Id',
			'datafield' : 'zoneTypeId',
			'width' : '16%',
			editable : false,
			cellsalign: 'center',
			align: 'center'
		}, {
			'text' : 'Zone Type Name',
			'datafield' : 'zoneNme',
			'width' : '25%',
			sortable : false,
			editable : false,
			cellsalign: 'center',
			align: 'center'
		}, {
			'text' : 'Zone Type Desc',
			'datafield' : 'description',
			'width' : '25.5%',
			sortable : false,
			editable : false,
			cellsalign: 'left',
			align: 'center'
		}, {
			'text' : 'Created On',
			'datafield' : 'createdDate',
			'width' : '16%',
			cellsformat: 'dd/MM/yyyy',
			sortable : false,
			editable : false,
			cellsalign: 'center',
			align: 'center'
		}, {
			'text' : 'Created By',
			'datafield' : 'createdBy',
			'width' : '15%',
			sortable : false,
			editable : false,
			cellsalign: 'center',
			align: 'center'
		}, {
			'text' : '',
			'datafield' : 'actionId',
			cellsrenderer : editZone,
			'width' : '2.5%',
			sortable : false,
			filterable: false,
			editable : false,
			cellsalign: 'center',
			align: 'center'
	    }];

	showMyGrid(datafields,	"/OrderExecution/api/v1/searchZoneType", "list",columns, zoneTypefieldFilters(), updateRows, "zoneName");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		rowdetails : true,
		virtualmode : true
	});
 };
 
 
 //Validate Field for Creation of Zone Type Details
 var validateZonetype = function() {	
 	
 	var zoneTypeNameZ = $('#zoneTypeNameZ').val();
 	var zoneTypeDescriptionZ = $('#zoneTypeDescriptionZ').val();
  	var validation = true;

 	if ( zoneTypeNameZ == "" || zoneTypeDescriptionZ == "" ) {
 		validation = false;
 	}
 	return validation;
 }

 var saveZoneTypes = function() {

	// Create object
	var ZoneTypes = {
		"zoneNme" : $('#zoneTypeNameZ').val(),
		"description" : $('#zoneTypeDescriptionZ').val(),
		}
		return ZoneTypes;
	}


 // Create and save ZoneType
 $("#createZoneTypeDetails").on('click',function() {
	 trimmer();
 					if (validateZonetype()) {
 					var ZoneTypes = saveZoneTypes();
 					if (ZoneTypes) {
 					postJSON('/OrderExecution/api/v1/createZoneType',JSON.stringify(ZoneTypes),function(data) {
 						if (data.resCode == "1") {	
 							$.growl.notice({
 							   message : data.mesgStr,
 							   duration : 10000,
 							   title : 'Success'
 							}); 																				
 						}else{
 				 		   $.growl.error({
 				 			  message : "Zone name is already exists",
 				 			  duration : 10000
 				 			});
 					      } 									
 					  });
 					}
 					$('#createZoneTypeDet').modal('hide'); 
 					}else {
 						$.growl.error({
 							message : "Please fill all the mandatory fields",
 							duration : 10000
 						});
 					}
 				});
 

 var saveDet = function() {

		var editZoneDet = {
			"zoneTypeId" : $('#zoneTypeId').val(),
			"zoneNme" : $('#zoneTypeNameZE').val(),
			"description" : $('#zoneTypeDescriptionZE').val(),
		}
		
		return editZoneDet;
	}

	// Edit Zone type details
	var editZoneType = function(row) {
		
		
		$('#popupheaderlabel').text('Edit Zone Type Details');
		
			var rows = $('#jqxgrid').jqxGrid('getrows');
			
			var selectedRowData = rows[row];
			$("#zoneTypeDescriptionZE").val(selectedRowData.description);
			$("#zoneTypeNameZE").val(selectedRowData.zoneNme);
			$("#zoneTypeId").val(selectedRowData.zoneTypeId);
		
			var dateVal ="/Date("+selectedRowData.createdDate+")/";
			var dateVal = $.date(selectedRowData.createdDate); 
			$("#createdOnE").val(dateVal);
		
			$("#createdByE").val(selectedRowData.createdBy);
		
	}
	$('#saveZoneTypeE').on('click',function() {
		trimmer();
		var zoneTypeDetailsEdit = saveDet();
		if (zoneTypeDetailsEdit) {
			postJSON('/OrderExecution/api/v1/updateZoneType',JSON.stringify(zoneTypeDetailsEdit), function(data) {
						if (data.resCode == "1") {
							$('#maintainZoneTypeE').modal('hide'); 
							$.growl.notice({
								message : data.mesgStr,
								duration : 10000,
								title : 'Success'
							});
							$('#createZoneTypeDet').on('hidden.bs.modal',function() {
								$(this).find('form').trigger('reset');
							});
							    $('#createZoneTypeDet').modal('hide');
						     }
						  else{
							 $.growl.error({
								message : "Please Fill the mandatory fields!!",
								duration : 10000
			      });
				}
			});
		}
	 }
	);
	
	var validateZoneStore = function() {
		var storeLines = [];
		
		var rows = $('#jqxgrideS').jqxGrid('getrows');
		
			if(typeof rows!="undefined"){
				 for (var i = 0; i < rows.length; i++) {
					 var row = rows[i];
					 var arr =  rows[i].orderMetalType.split(',');
					 var omTypeObj  = {};
					 var omTypeArr = [];
					 $.each(arr,function(k,v){
						 omTypeObj = {
									"displayOrder": "1",
									"segment": {
										"id": v
									}
								};
						 omTypeArr.push(omTypeObj); 
					 });
					 storeLines.push({	
							"code" : row.zoneCode,
							"description" : row.zoneDescription,
							"zoneTypes" : row.zoneType,
							"locked" : true,
							"zoneActiveOrInActive" : true,
							"zoneHdrTargetType" : row.zoneTargetType,
							"dcOrStoreId" : $('#storeName').val(),
							"orderMetalTypeList" : omTypeArr
				      });
				 }
				 return storeLines
			}
	 }


//Create store zone type
$("#createStoreDetails").on('click', function(){
	trimmer();
	var storeName = $('#storeName option:selected').text();
	if(storeName == null || storeName == "" || storeName == "--Select--"){
		$.growl.error({
			message : "Store is mandatory!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	
	var rows = $('#jqxgrideS').jqxGrid('getrows');
	if(rows.length == 0){
		$.growl.error({
			message : "Grid field are mandatory!!",
			duration : 10000
		});
		return false;
	}
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		if(row.zoneCode == "" || row.zoneDescription == "" || row.zoneType == "" || row.status == "" || row.orderMetalType == ""){
			$.growl.error({
				message : "Please fill all Mandatory Fields!!",
				duration : 10000
			});
			return false;
		}
	}
	
	var saveStoreDetails = validateZoneStore();
	if (saveStoreDetails) {
		postJSON('/OrderExecution/api/v1/createStoreZone',JSON.stringify(saveStoreDetails),function(data) {	
			if (data.resCode == "1") {		
				
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				
				 $('#createStoreDet').modal('hide');	            
				 storeDetailsModalGrid();	
				 $('#jqxgrideS').jqxGrid('clear');
				 
            } else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
			   });
             }	
		 });
	  } 
  });


$('.modal').on('hidden.bs.modal', function(){
    $(this).find('form')[0].reset();
    $('#jqxgrideS').jqxGrid('clear');
});
//Loading Grid of Store
$("#searchStore").on('click', function() {
	var storeNameS = $('#storeNameS').val();
	if(storeNameS == ""){
		$.growl.error({
			message : "Please fill all the mandatory fields",
			duration : 10000
		});
		return false;
	}
	
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	
	storeGrid();
	$("#jqxgrid").show();
});

// Loading Grid of Zone Type
$("#searchZoneType").on('click', function() {
	var zoneTypeS = $('#zoneTypeS').val();
	if(zoneTypeS == ""){
		$.growl.error({
			message : "Please fill all the mandatory fields",
			duration : 10000
		});
		return false;
	}
	
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	
	zoneTypeGrid();
	$("#jqxgrid").show();
});

//Clear DC form Field
$("#clearAllDC").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//Clear DC form Field
$("#clearAllStore").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//Clear DC form Field
$("#clearAllZoneType").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

$('#createDcDet').on('hidden.bs.modal', function(){
	$("form").trigger("reset");
	$('#jqxgrideD').jqxGrid('clear');
});

$('#createStoreDet').on('hidden.bs.modal', function(){
	$("form").trigger("reset");
	$('#jqxgrideS').jqxGrid('clear');
});

$('#createZoneTypeDet').on('hidden.bs.modal', function(){
	$("form").trigger("reset");
});
// ZONE TYPE Code ########################