/**
##	AUTHOR		:	DIPANKAR NAHA & MAYADHAR SANKHUA & MANI PRASAD
##	DATE		:	15-03-2017
##	DESCRIPTION	:	SCRIPT TO CREATE STONE ACCOUNTING LOCATION
 **/

/**
 * ## AUTHOR : DIPANKAR NAHA & Mayadhar Sankhua ## DATE : 18-01-2017 ##
 * DESCRIPTION : SCRIPT TO CREATE METAL ACCOUNTING LOCATION
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

$("#storeRegionCTAE").prop("disabled", true);
$("#storeRegionNameCTAE").prop("disabled", true);
$("#metalSegmentCTAE").prop("disabled", true);
$("#purposeCTAE").prop("disabled", true);
$("#compNonCompCTAE").prop("disabled", true);
$("#fromPurityCTAE").prop("disabled", false);
$("#toPurityCTAE").prop("disabled", false);
$("#startDateCTAE").prop("disabled", true);
$("#endDateCTAE").prop("disabled", false);

$("#createCTA").on('click', function() {
	$("#addPer").prop("disabled", false);
	$("#dedPer").prop("disabled", false);
});

$('#addPer').on('keyup', function() {
	if ($(this).val() != "") {
		$("#dedPer").prop('disabled', true);
		$("#dedPer").val(0)
	}
});

$('#dedPer').on('keyup', function() {
	if ($(this).val() != "") {
		$("#addPer").prop('disabled', true);
		$("#addPer").val(0)
	}
});
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

$('#storeRegionCTAE').empty().append(
		'<option value="" selected>--Select--</option>');

$("#creditToAcc").hide();
$('input:radio[name="parameterDet"]').filter('[value="1"]').attr('checked',true);
$('#metalSegmentCTA').empty().append('<option value="" selected>--Select--</option>');
$('#metalSegmentCTAE').empty().append('<option value="" selected>--Select--</option>');
$('#metalSegmentCTAS').empty().append('<option value="" selected>--Select--</option>');

$.getJSON('/OrderExecution/api/v1/creditAccLOV', function(data) {

	$.each(data.payload.mList, function(key, val) {
		$('#metalSegmentCTA').append('<option value="' + val.id + '">' + val.description + '</option>');
		$('#metalSegmentCTAE').append('<option value="' + val.id + '">' + val.description + '</option>');
        $('#metalSegmentCTAS').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
});

$.getJSON('/OrderExecution/api/v1/parameterLOV', function(data) {
	$.each(data.payload.rList, function(key, val) {
		$('#region').append(
				'<option value="' + val.id + '">' + val.name + '</option>');
	});
	$.each(data.payload.rList, function(key, val) {
		$('#regionPC').append(
				'<option value="' + val.id + '">' + val.name + '</option>');
	});
	paramList = data.payload.pList;
	var data = [];
	$.each(paramList, function(key, value) {
		data.push({
			value : value.id,
			label : value.name
		});
	});
	$(function() {
		$("#paramNameSearch").autocomplete({
			source : data,
			focus : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
				$("#paramName-value").val(ui.item.value);
			}
		});
	});

});

$("#metalSegmentCTA").on("change",function() {
		$('#fromPurity').empty().append('<option value="" selected>--Select--</option>');
        $('#toPurity').empty().append('<option value="" selected>--Select--</option>');
				var id = $('#metalSegmentCTA').val();
					if (id != "") {
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
			}

		$("#toPurity").on("change",function() {
			var fromPurity = $("#fromPurity").val();
			var toPurity = $("#toPurity").val();
				if (toPurity < fromPurity) {
						$.growl	.error({
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
		});

$("#metalSegmentCTAE").on("change",function() {
		$('#fromPurityCTAE').empty().append('<option value="" selected>--Select--</option>');
        $('#toPurityCTAE').empty().append('<option value="" selected>--Select--</option>');
			var id = $('#metalSegmentCTAE').val();
			if (id != "") {
				var params = {
					"metalTypeId" : id
				}
		postJSON('/OrderExecution/api/v1/getMetalpurity', JSON.stringify(params), function(data) {
			if (1 == data.resCode) {
			  $.each(data.payload.purity, function(key, val) {
				$('#fromPurityCTAE').append('<option value="' + val.skinPurity + '">' + val.skinPurity + '</option>');
                $('#toPurityCTAE').append('<option value="' + val.skinPurity + '">' + val.skinPurity + '</option>');
			});
		 }
	  });
	}
});

$('input[name=parameterDet]:radio').click(function() {
	var selectedVal = $(this).val();
	if (selectedVal == 1) {
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();

		$("#paramDet").show();
		$("#creditToAcc").hide();

	} else if (selectedVal == 2) {
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();

		$("#paramDet").hide();
		$("#creditToAcc").show();
	}
});

$("#startDateCTA").datepicker(
		{
			changeMonth : true,
			changeYear : true,
			dateFormat : "dd/mm/yy",
			minDate : 0,
			onSelect : function(dateStr) {
				var d = new Date(); // for now
				datetext = dateStr + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
				$('#startDateCTA').val(datetext);
				$("#endDateCTA").datepicker('option', 'minDate',
						datetext || '0');
			}
		});

$("#endDateCTA").datepicker(
		{
			changeMonth : true,
			changeYear : true,
			dateFormat : "dd/mm/yy",
			minDate : 0,
			onSelect : function(dateStr) {
				var d = new Date(); // for now
				datetext = dateStr + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
				$('#endDateCTA').val(datetext);
			}
		});


$("#startDate").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	minDate : 0,
	onSelect : function(dateStr) {
		var min = $(this).datepicker('getDate'); // Get selected date
		$("#endDate").datepicker('option', 'minDate', min || '0'); 
	}
});

$("#endDate").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	minDate : 0

});
// loading data in parameter details grid through API call to the server
function paramDetGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long'
	}, {
		'name' : 'region',
		'type' : 'string',
		'map' : 'region>name'
	}, {
		'name' : 'name',
		'type' : 'string'
	}, {
		'name' : 'paramVal',
		'type' : 'string',
		'map' : 'parameterDetailDTO>value'
	}, {
		'name' : 'startDate',
		'type' : 'date',
		'map' : 'parameterDetailDTO>startDate'
	}, {
		'name' : 'endDate',
		'type' : 'date',
		'map' : 'parameterDetailDTO>endDate'
	}, {
		'name' : 'status',
		'type' : 'string',
		'map' : 'parameterDetailDTO>isActive'
	}, {
		'name' : 'updatedOn',
		'type' : 'date'
	}, {
		'name' : 'updatedBy',
		'type' : 'string'
	}, {
		'name' : 'dcflag',
		'type' : 'string',
		'map' : 'dc'
	}, {
		'name' : 'storeflag',
		'type' : 'string',
		'map' : 'store'
	}, {
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'id'
	} ];
	var columns = [{
		'text' : 'Region',
		'datafield' : 'region',
		align : 'center',
		cellsalign : 'center',
		'width' : '6%',
		editable : false,
		sortable : false
	}, {
		'text' : 'Parameter Name',
		'datafield' : 'name',
		align : 'center',
		cellsalign : 'left',
		'width' : '21%',
		sortable : false,
		editable : false
	}, {
		'text' : 'Parameter Val',
		'datafield' : 'paramVal',
		'width' : '9%',
		align : 'center',
		cellsformat : 'd2',
		cellsalign : 'right',
		sortable : false,
		editable : false
	}, {
		'text' : 'DC Flag',
		'datafield' : 'dcflag',
		editable : false,
		align : 'center',
		cellsalign : 'center',
		sortable : false,
		'width' : '6%'
	}, {
		'text' : 'Store Flag',
		'datafield' : 'storeflag',
		'width' : '6.5%',
		align : 'center',
		cellsalign : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Start Date',
		'datafield' : 'startDate',
		cellsformat : 'dd/MM/yyyy',
		align : 'center',
		cellsalign : 'center',
		'width' : '10%',
		sortable : false,
		editable : false
	}, {
		text : 'End Date',
		'datafield' : 'endDate',
		cellsformat : 'dd/MM/yyyy',
		align : 'center',
		cellsalign : 'center',
		editable : false,
		sortable : false,
		'width' : '10%'
	}, {
		'text' : 'Status',
		'datafield' : 'status',
		align : 'center',
		cellsalign : 'center',
		'width' : '8%',
		sortable : false,
		editable : false
	}, {
		text : 'Updated On',
		'datafield' : 'updatedOn',
		cellsformat : 'dd/MM/yyyy',
		align : 'center',
		cellsalign : 'center',
		editable : false,
		sortable : false,
		'width' : '10%'
	}, {
		'text' : 'Updated By',
		'datafield' : 'updatedBy',
		'width' : '11%',
		align : 'center',
		cellsalign : 'center',
		sortable : false,
		editable : false
	}, {
		text : '',
		'datafield' : 'actionId',
		cellsrenderer : viewParamDetRender,
		editable : false,
		align : 'center',
		cellsalign : 'center',
		filterable : false,
		sortable : false,
		'width' : '2.5%'

	} ];
	showMyGrid(datafields, "/OrderExecution/api/v1/parameterList", "list",columns, paramFilterValues(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,  
        theme: 'energyblue',
     	altrows: true,
    	columnsresize: true 
	});

}

var dcValue = {};
var storeValE = {};
$('input[name=dcValE]').change(function() {
	dcValue = {
		"value" : $('input[name=dcValE]:checked').val()
	};

});
$('input[name=storeValE]').change(function() {
	storeValE = {
		"value" : $('input[name=storeValE]:checked').val()
	};

});

// Edit Parameter Details using AJAX call to the server
$('#createParamDetE').on('click',function() {
	trimmer();
	
		var dcValE = $('input[name=dcValE]:checked').val();
		var storeValE = $('input[name=storeValE]:checked').val();
		var regionPCE = $("#regionPCE").val();
		var paramNameE = $("#paramNameE").val();
		var startDateE = $("#startDateE").val();
		var endDateE = $("#endDateE").val();
	    var paramValueE = $("#paramValueE").val();
			if (dcValE == "" || storeValE == "" || regionPCE == ""
					|| paramNameE == "" || startDateE == "" || endDateE == ""
					|| paramValueE == "") {
				$.growl.error({
					message : "Please select mandatory fields!!",
					duration : 10000
				});
				return false;
			} else if (storeValE == "No" && dcValE == "No") {
				$.growl.error({
					message : "Store and DC value can not be No!!",
					duration : 10000
				});
				return false;
			}

			var params = {
				"id" : $('#parameterDetId').val(),
				"name" : $('#paramNameE').val(),
				"store" : storeValE,
				"dc" : dcValE,
				"region" : {
					"id" : $('#regionPCE').val()
				},
				"parameterDetailDTO" : {
					"id" : $('#parameterDetId').val(),
					"value" : $('#paramValueE').val(),
					"startDate" : $('#startDateE').val(),
					"endDate" : $('#endDateE').val(),
					"isActive" : ($('#statusE').val() == "Active") ? true : false
				}
			}

			postJSON('/OrderExecution/api/v1/updateParameter', JSON.stringify(params), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#EditParamDet').modal('hide');
					paramDetGrid();

				} else {
					$.growl.error({
						message : "Please Fill the Mandatory Fields",
						duration : 10000
					});
				}

			});
		});

// Create Parameter Details using AJAX call to the server
$("#createParamDetc").on('click',function() {
			var region = $("#regionPC").val();
			region = {
				"id" : region
			};
			var paramName = $("#paramName").val();
			var paramValue = $("#paramValue").val();
			var startDate = $("#startDate").val();
			var endDate = $("#endDate").val();
			var status = true;
			var dcVal = $('input[name=dcVal]:checked').val();
			var storeVal = $('input[name=storeVal]:checked').val();
			if (region == "" || paramName == "" || paramValue == ""
					|| startDate == "" || endDate == "" || status == ""
					|| dcVal == "" || storeVal == "") {
				$.growl.error({
					message : "Please fill all the mandatory fields",
					duration : 10000
				});
				return false;
			} else if (storeVal == "No" && dcVal == "No") {
				$.growl.error({
					message : "Store and DC value can not be No!!",
					duration : 10000
				});
				return false;
			}
			var params = {
				"name" : paramName,
				"store" : storeVal,
				"dc" : dcVal,
				"region" : region,
				"parameterDetailDTO" : {
					"value" : paramValue,
					"startDate" : startDate,
					"endDate" : endDate,
					"isActive" : status
				}

			};

		postJSON('/OrderExecution/api/v1/createParameter', JSON.stringify(params), function(data) {
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
				$('#createParamDet').modal('hide');
				paramDetGrid();

			});

		});

$("#search").on('click', function() {
	paramDetGrid();
	$("#jqxgrid").show();
	return false;
});

// Clear grid and reset input and dropdown value
$("#clearAll").on('click', function() {
	window.location.href="javascript:showContentPage('parameterDetails', 'bodySwitcher')"
});

$("#clearParamDetc").on('click', function() {
	$('#paramDetailCreate').trigger("reset");
});

var viewParamDetRender = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
		
	var status = $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
	if (status == "Active") {
		var editVal = '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#EditParamDet" type="button"  id='
				+ row
				+ ' onclick="editParameter('
				+ value
				+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></button>';
	} else {
		var editVal = '<button disabled class="btn btn-sm btn-primary" type="button"><i class="fa fa-pencil fa-sm"></i></button>';
	}
	return editVal;
	}
}

var loadParamLov = function() {
	$.getJSON('/OrderExecution/api/v1/parameterLOV', function(data) {
		$('#regionPCE').empty().append(
				'<option value="" selected>--Select--</option>');
		$.each(data.payload.rList,
				function(key, val) {
					$('#regionPCE').append(
							'<option value="' + val.id + '">' + val.name + '</option>');
				});
	});
}

loadParamLov();

var editParameter = function(id) {

	$.getJSON('/OrderExecution/api/v1/getParameter?id=' + id, function(data) {
		var param = data.payload.param;

		$("#regionPCE").val(param.region.id);
		// $("#regionPCE").checked(param.region.name);

		$("#paramNameE").val(param.name);

		$("#startDateE").datepicker({
			changeMonth : true,
			changeYear : true,
			dateFormat : "dd/mm/yy",
			minDate : 0,
			onSelect : function(dateStr) {
				var minDate = $(this).datepicker('getDate'); // Get selected date
				minDate.setDate(minDate.getDate());
				$("#endDateE").datepicker('option', 'minDate', minDate || '0'); 
			}
		});
		$("#endDateE").datepicker({
			dateFormat : "dd/mm/yy",
			changeMonth : true,
			changeYear : true,
			minDate : 0
		});
		var startDateVal = $.date(param.parameterDetail.startDate);
		var endDateVal = $.date(param.parameterDetail.endDate);

		$("#startDateE").val(startDateVal);
		$("#endDateE").val(endDateVal);
		$("#parameterDetId").val(param.id);
		$("#paramValueE").val(param.parameterDetail.value);
		$("#paramValueIdE").val(param.parameterDetail.id);
		$("#statusActiveE").val(param.parameterDetail.isActive);
		if (param.parameterDetail.isActive == true) {
			$("#statusE").val('Active');
		} else {
			$("#statusE").val('In-Active');
		}

		if (param.dcFlag == "No") {
			$('input:radio[name="dcValE"]').filter('[value="No"]').attr('checked', true);
		} else if (param.dcFlag == "Yes") {
			$('input:radio[name="dcValE"]').filter('[value="Yes"]').attr('checked', true);
		}

		if (param.storeFlag == "No") {
			$('input:radio[name="storeValE"]').filter('[value="No"]').attr('checked', true);
		} else if (param.storeFlag == "Yes") {
			$('input:radio[name="storeValE"]').filter('[value="Yes"]').attr('checked', true);
		}
	});
	$('#popupheaderlabel').text('Edit Parameter Details');
}


var paramFilterValues = function() {
	var param = $("#paramNameSearch").val();
	var region = $("#region").val();
	var store = $("#storeS").val();
	var dcS = $('input[name=dcS]:checked').val();
	var storeS = $('input[name=storeS]:checked').val();
	var statusS = $('#statusS').val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (param != "" && param != null){
		fieldFilters.fieldFilters["paramName"] = param;
	}
	if (region != "" && region != null){
		fieldFilters.fieldFilters["region"] = region;
	}
	if (dcS != "" && dcS != null){
		fieldFilters.fieldFilters["dcFlag"] = dcS;
	}
	if (storeS != "" && storeS != null){

		fieldFilters.fieldFilters["storeFlag"] = storeS;
	}
	if (statusS != "" && statusS != null){

		fieldFilters.fieldFilters["status"] = (statusS == "true") ? 1 : 0;
	}
	return fieldFilters;
}

$("#exportP").on("click",function() {
	var count = 0;
	var data;
	var param = $("#paramNameSearch").val();
	var region = $("#region").val();
	var store = $("#storeS").val();
	var dc = $("#dcS").val();
    var status = $("#statusS").val();
		fieldFilters = {
			"fieldFilters" : {}
		};
		if (param != "" && param != null) {
		     fieldFilters.fieldFilters["paramName"] = param;
			}
		if (region != "" && region != null) {
			fieldFilters.fieldFilters["region"] = region;
			}
		if (status != "" && status != null) {
				if (status == "true") {
					fieldFilters.fieldFilters["status"] = true;
				} else {
					fieldFilters.fieldFilters["status"] = false;
				}
			}
			var newData = [];
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
				postJSON('/OrderExecution/api/v1/parameterExport',JSON.stringify(fieldFilters),function(response) {
				if (response != null) {
				data = response.payload.list;
				for (i = 0; i < data.length; i++) {
				newData.push({
								'Region Name' : (data[i].region != null) ? data[i].region.name: "",
								'Start Date' : (data[i].parameterDetailDTO != null) ? data[i].parameterDetailDTO.startDate  : "",
								'End Date' : (data[i].parameterDetailDTO != null) ? data[i].parameterDetailDTO.endDate : "",
								'Status' : (data[i].parameterDetailDTO != null) ? data[i].parameterDetailDTO.isActive : "",
								'Updated On' : $.date(data[i].updatedOn),
								'Parameter Name' : data[i].name,
								'Parameter Value' : (data[i].parameterDetailDTO != null) ? data[i].parameterDetailDTO.value : "",
								'Store Flag' : (data[i].store == null) ? "": data[i].store,
								'DC Flag' : (data[i].dc == null) ? "": data[i].dc,
								'Updated By' : data[i].updatedBy
					});
					
					}
					//JSONToCSVConvertor(newData,	"Parameter Details" + "_" + sysdate, true);	
				 var opts = [{sheetid:'Parameter_Details',header:true}];
                 var res = alasql('SELECT * INTO XLSX("Parameter Details_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

/*******************************************************************************
 * ########################## CREDIT TO ACCOUNT SECTION STARTED
 * ##################################
 */

var viewCTAACcDet = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"  data-target="#editCreditToAcc"  type="button" id='
			+ row
			+ ' onclick="editCreditAcc('
			+ value
			+ ')" ><i class="fa fa-pencil fa-sm"></i></button>'
	}
}

var editCreditAcc = function(id) {
	$('#storeRegionCTAE').empty().append('<option value="" selected >--Select--</option>');
	$('#storeRegionNameCTAE').empty().append('<option value="" selected>--Select--</option>');
	$('#storeRegionCTAE').empty().append('<option value="" selected>--Select--</option>');
	$('#toPurityCTAE').empty().append('<option value="" selected >--Select--</option>');
	$('#popupheaderlabelCTAE').text('Edit Credit to Account Details');
	
	$("#storeRegionCTAE").on('change',function() {
			var storeRegionCTAE = $('#storeRegionCTAE').val();
			$.getJSON('/OrderExecution/api/v1/regionStoreList?listType='+ storeRegionCTAE, function(data) {
				$('#storeRegionNameCTAE').empty().append('<option value="" selected >--Select--</option>');
				if (storeRegionCTAE == "region") {
					$.each(data.payload.rList, function(key, val) {
						$('#storeRegionNameCTAE').append('<option value="' + val.id + '" >' + val.name + '</option>');
						});
					}else if (storeRegionCTAE == "store") {
						$.each(data.payload.sList, function(key, val) {
							$('#storeRegionNameCTAE').append('<option value="' + val.id + '">' + val.name + '</option>');
						});
					}
				});
			});
	
	$.getJSON('/OrderExecution/api/v1/getCreditToAcc?id=' + id,function(data) {
		var paramCTA = data.payload.CreditParam;
        if ($.isEmptyObject(paramCTA.region) == false) {
			$('#storeRegionNameCTAE').append('<option selected value="' + paramCTA.region.id + '">' + paramCTA.region.name + '</option>');
			$('#storeRegionCTAE').append('<option selected value="region" disabled>Region</option><option value="store">Store</option>');
		}
		if ($.isEmptyObject(paramCTA.store) == false) {
			$('#storeRegionNameCTAE').append('<option selected value="' + paramCTA.store.id + '">' + paramCTA.store.name + '</option>');
			$('#storeRegionCTAE').append('<option selected value="store">Store</option><option value="region">Region</option>');
		}
		 $('#fromPurityCTAE').empty();
		 $('#toPurityCTAE').empty();
		$('#fromPurityCTAE').append('<option selected value="' + paramCTA.fromPurity + '">' + paramCTA.fromPurity + '</option>');
		$('#toPurityCTAE').append('<option selected value="' + paramCTA.toPurity + '">' + paramCTA.toPurity + '</option>');
		$.each(paramCTA.purity, function(key, val) {
			$('#fromPurityCTAE').append('<option value="' + val.skinPurity + '">' + val.skinPurity + '</option>');
			$('#toPurityCTAE').append('<option value="' + val.skinPurity + '">' + val.skinPurity + '</option>');
		});
			$("#metalSegmentCTAE").val(paramCTA.metalSegment.id);
			$('#purposeCTAE').append('<option selected value="'+ paramCTA.purpose + '">'+ paramCTA.purpose + '</option>');
			$('#compNonCompCTAE').append('<option selected value="'+ paramCTA.company + '">'+ paramCTA.company + '</option>');
			   if (paramCTA.deductPercentage == 0) {
				$("#dedPerCTAE").prop('disabled', false);
			} else {
				$("#dedPerCTAE").prop('disabled', false);
			}
			   if (paramCTA.addPercentage == 0) {
				$("#addPerCTAE").prop('disabled', false);
			} else {
				$("#addPerCTAE").prop('disabled', false);
			}
			  $("#dedPerCTAE").val(paramCTA.deductPercentage);
		      $("#addPerCTAE").val(paramCTA.addPercentage);
			  $("#exchangingRateCTAE").val(paramCTA.ecRate);
			  $("#refRateCTAE").val(paramCTA.rcRate);
              $("#startDateCTAE").datepicker(
			     {
			    	 changeMonth : true,
			    	 changeYear : true,
			    	 dateFormat : "dd/mm/yy",
					 minDate : 0,
					 onSelect : function(dateStr) {
					 var d = new Date(); // for now
					 datetext = dateStr + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
						$('#startDateCTAE').val(datetext);
					    $("#endDateCTAE").datepicker('option',
						'minDate', datetext || '0');
					}
			});

			$("#endDateCTAE").datepicker(
				{
					changeMonth : true,
					changeYear : true,
					dateFormat : "dd/mm/yy",
					minDate : 0,
					onSelect : function(dateStr) {
					var d = new Date(); // for now
						datetext = dateStr + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
							$('#endDateCTAE').val(datetext);
					      }
					  });
						

						$("#startDateCTAE").val(paramCTA.startDate);
						$("#endDateCTAE").val(paramCTA.endDate);
						//console.log(paramCTA);
						$("#ctaDetId").val(paramCTA.id);
						if (paramCTA.status == true) {

							$("#statusCTAE").val('Active');
						} else {

							$("#statusCTAE").val('In-Active');
						}

					});

}

var ctaFilterValues = function() {
	var metalSegment = $("#metalSegmentCTAS").val();
	var purpose = $("#purposeS").val();
	var company = $("#companyNonCompany").val();
	var storeRegionNameS = $("#storeRegionNameS").val();
	var storeRegionS = $("#storeRegionS").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (storeRegionS != "" && storeRegionS != null) {
		if (storeRegionS == "store") {
			fieldFilters.fieldFilters["store"] = storeRegionNameS;
		} else {
			fieldFilters.fieldFilters["region"] = storeRegionNameS;
		}
	}

	if (metalSegment != "" && metalSegment != null) {
		fieldFilters.fieldFilters["metalSegment"] = metalSegment;
	}
	if (purpose != "" && purpose != null) {
		fieldFilters.fieldFilters["purpose"] = purpose;
	}
	if (company != "" && company != null) {
		fieldFilters.fieldFilters["company"] = company;
	}
	/*
	 * if (storeRegionS != "" && storeRegionS != null) {
	 * fieldFilters.fieldFilters["store"] = storeRegionS; }
	 */

	return fieldFilters;
}

function paramDetGrid2() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'name',
		'type' : 'string'
	}, {
		'name' : 'storename',
		'type' : 'string',
		'map' : 'store>name'
	}, {
		'name' : 'regionname',
		'type' : 'string',
		'map' : 'store>region>name'
	}, {
		'name' : 'metalsegment',
		'type' : 'string',
		'map' : 'metalSegment>description'
	}, {
		'name' : 'regionName',
		'type' : 'string'
	}, {
		'name' : 'storeName',
		'type' : 'string'
	}, {
		'name' : 'metalSeg',
		'type' : 'string'
	}, {
		'name' : 'purpose',
		'type' : 'string'
	}, {
		'name' : 'company',
		'type' : 'string'
	}, {
		'name' : 'fromPurity',
		'type' : 'float'
	}, {
		'name' : 'toPurity',
		'type' : 'float'
	}, {
		'name' : 'deductPercentage',
		'type' : 'string'
	}, {
		'name' : 'addPercentage',
		'type' : 'string'
	}, {
		'name' : 'ecRate',
		'type' : 'float'
	}, {
		'name' : 'rcRate',
		'type' : 'float'
	}, {
		'name' : 'startDate',
		'type' : 'date'
	}, {
		'name' : 'endDate',
		'type' : 'date'
	}, {
		'name' : 'status',
		'type' : 'float'
	}, {
		'name' : 'actionId',
		'type' : 'int',
		'map' : 'id'
	} ];

	var columns = [ {
		'text' : 'Region',
		'datafield' : 'regionname',
		'width' : '8%',
		align : 'center',
		cellsalign : 'center',
		editable : false
	}, {
		'text' : 'Store',
		'datafield' : 'storename',
		'width' : '11%',
		align : 'center',
		cellsalign : 'center',
		editable : false
	}, {
		'text' : 'Metal Seg.',
		'datafield' : 'metalsegment',
		'width' : '8%',
		align : 'center',
		cellsalign : 'center',
		editable : false
	}, {
		'text' : 'Purpose',
		'datafield' : 'purpose',
		'width' : '9%',
		sortable : false,
		align : 'center',
		cellsalign : 'center',
		editable : false
	}, {
		'text' : 'Comp./Non Comp.',
		'datafield' : 'company',
		'width' : '13.5%',
		sortable : false,
		align : 'center',
		cellsalign : 'center',
		editable : false
	}, {
		'text' : 'From Purity',
		'datafield' : 'fromPurity',
		'width' : '8%',
		sortable : false,
		align : 'center',
		cellsformat : 'd2',
		cellsalign : 'right',
		editable : false

	}, {
		'text' : 'To Purity',
		'datafield' : 'toPurity',
		'width' : '8%',
		sortable : false,
		align : 'center',
		cellsformat : 'd2',
		cellsalign : 'right',
		editable : false

	}, {
		'text' : 'Deduct %',
		'datafield' : 'deductPercentage',
		'width' : '9%',
		sortable : false,
		align : 'center',
		cellsformat : 'd2',
		cellsalign : 'right',
		editable : false

	}, {
		'text' : 'Add %',
		'datafield' : 'addPercentage',
		'width' : '8%',
		sortable : false,
		align : 'center',
		cellsformat : 'd2',
		cellsalign : 'right',
		editable : false

	}, {
		'text' : 'Exch. Rate',
		'datafield' : 'ecRate',
		'width' : '8%',
		sortable : false,
		align : 'center',
		cellsformat : 'd2',
		cellsalign : 'right',
		editable : false

	}, {
		'text' : 'Ref. Rate',
		'datafield' : 'rcRate',
		'width' : '7%',
		sortable : false,
		align : 'center',
		cellsformat : 'd2',
		cellsalign : 'right',
		editable : false

	}, {
		'text' : '',
		'datafield' : 'actionId',
		'width' : '2.5%',
		align : 'center',
		cellsalign : 'center',
		cellsrenderer : viewCTAACcDet,
		filterable : false,
		sortable : false,
		editable : false

	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/creditToAccList", "list",columns, ctaFilterValues(), updateRows, "");
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

/* Add CTA parameter & PB Started */

$("#addAccArticles").on('click', function() {
	var rowscounts = getGrdRowCount("#jqxgrideCTA");
	var datarow = generateVRTrow();
	$("#jqxgrideCTA").jqxGrid('addrow', null, datarow);
});

var getGrdRowCount = function(gridName) {
	var count = 0;
	var rows = $(gridName).jqxGrid('getrows');
	if (rows) {
		count = rows.length
	}
	return count;
}

var generateVRTrow = function() {
	var rowscounts = getGrdRowCount("#jqxgrideCTA");
	var row = {};

	row["fromPurity"] = $('#fromPurity').val();
	row["toPurity"] = $('#toPurity').val();
	row["company"] = $("#compNonComp").val();
	row["addPercentage"] = $('#addPer').val();
	row["deductPercentage"] = $('#dedPer').val();
	row["ecRate"] = $('#exchangingRate').val();
	row["rcRate"] = $('#refRate').val();
	row["purpose"] = $('#purposeCTA').val();
	row["store"] = $('#storeRegionNameCTA').val();
	row["metalSegment"] = $('#metalSegmentCTA').innerHTML;
	row["startDate"] = $('#startDateCTA').val();
	row["endDate"] = $('#endDateCTA').val();
	row["status"] = true;
	return row;
}

function addCTAPbGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'fromCost',
		'type' : 'double'
	}, {
		'name' : 'toCost',
		'type' : 'double'
	}, {
		'name' : 'sellingPriceReference',
		'type' : 'string'
	}, {
		'name' : 'sellingPriceReferences',
		'value' : 'sellingPriceReference'
	}, {
		'name' : 'mup',
		'type' : 'double'
	}, {
		'name' : 'sellingRate',
		'type' : 'double'
	},{
		'name' : 'exchangePercentage',
		'type' : 'double'
	},{
		'name' : 'directPurchasePercentage',
		'type' : 'double'
	},{
		'name' : 'isActive',
		'type' : 'double'
	},{
		'name' : 'isActives',
		'value' : 'isActive'
	},{
		'name' : 'id',
		'type' : 'long'
	} ];

	var popcolumns = [
			{
				'text' : 'Region Name',
				'datafield' : 'regionName',
				'width' : '100px',
				align : 'center',
				cellsalign : 'center',
				sortable : false
			},{
				'text' : 'Store Name',
				'datafield' : 'storeName',
				align : 'center',
				cellsalign : 'center',
				'width' : '100px',
				sortable : false,
				editable : false
			},{
				'text' : 'Metal Segment',
				'datafield' : 'metalSegment',
				'width' : '105px',
				align : 'center',
				cellsalign : 'center',
				sortable : false,
				editable : true
			},{
				'text' : 'Purpose',
				'datafield' : 'purpose',
				'width' : '105px',
				align : 'center',
				cellsalign : 'center',
				sortable : false,
				editable : false
			},{
				'text' : 'Company/Non-Company',
				'datafield' : 'compNonCompany',
				'width' : '205px',
				sortable : false,
				align : 'center',
				cellsalign : 'center',
				editable : false
			},{
				'text' : 'From Purity',
				'datafield' : 'fromPurity',
				'width' : '115px',
				columntype : 'numberinput',
				cellsformat : 'd2',
				align : 'center',
				cellsalign : 'right',
				sortable : false,
				editable : true
			},{
				'text' : 'To Purity',
				'datafield' : 'toPurity',
				'width' : '115px',
				columntype : 'numberinput',
				cellsformat : 'd2',
				align : 'center',
				cellsalign : 'right',
				sortable : false,
				editable : true
			},{
				'text' : 'Deduct %',
				'datafield' : 'dedPer',
				'width' : '115px',
				columntype : 'numberinput',
				cellsformat : 'd2',
				align : 'center',
				cellsalign : 'right',
				sortable : false,
				editable : true
			},{
				'text' : 'Add %',
				'datafield' : 'addPer',
				'width' : '115px',
				columntype : 'numberinput',
				cellsformat : 'd2',
				sortable : false,
				cellsalign : 'right',
				editable : true
			},{
				'text' : 'Exchanging Rate',
				'datafield' : 'exchangeRate',
				'width' : '115px',
				columntype : 'numberinput',
				cellsformat : 'd2',
				align : 'center',
				cellsalign : 'right',
				sortable : false,
				editable : true
			},{
				'text' : 'Refining Rate',
				'datafield' : 'refiningRate',
				'width' : '115px',
				columntype : 'numberinput',
				cellsformat : 'd2',
				sortable : false,
				align : 'center',
				cellsalign : 'right',
				editable : true
			},{
				'text' : 'Start Date',
				'datafield' : 'startDateCTA',
				'width' : '150px',
				align : 'center',
				cellsalign : 'center',
				columntype : 'datetimeinput',
				cellsformat : 'dd/MM/yyyy',
				sortable : false,
				editable : false,
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue, event) {
					var date = new Date();
					var dateOnly = new Date(date.getFullYear(),
							date.getMonth(), date.getDate());
					if (newvalue <= dateOnly) {

						return newvalue;
					} else {
						$.growl.error({
							message : "Future Date not allowed",
							duration : 3000,
							title : 'Error'
						});
						return "";
					}
				}
			},{
				'text' : 'End Date',
				'datafield' : 'endDateCTA',
				'width' : '150px',
				columntype : 'datetimeinput',
				align : 'center',
				cellsalign : 'center',
				cellsformat : 'dd/MM/yyyy',
				sortable : false,
				editable : false,
				cellvaluechanging : function(row, datafield, columntype,
						oldvalue, newvalue, event) {
					var date = new Date();
					var dateOnly = new Date(date.getFullYear(),
							date.getMonth(), date.getDate());
					if (newvalue <= dateOnly) {

						return newvalue;
					} else {
						$.growl.error({
							message : "Future Date not allowed",
							duration : 3000,
							title : 'Error'
						});
						return "";
					}
				}
			}, {
				'text' : 'Status',
				'datafield' : 'status',
				'width' : '115px',
				align : 'center',
				cellsalign : 'center',
				columntype : 'numberinput',
				cellsformat : 'd2',
				sortable : false,
				editable : true
			}, {
				text : 'Action',
				datafield : 'Delete',
				'width' : '115px',
				align : 'center',
				cellsalign : 'center',
				columntype : 'button',
				cellsrenderer : function() {
					return "Delete";
				},
				buttonclick : function(row) {

				}
			}, {
				'text' : 'id',
				'datafield' : 'id',
				hidden : true
			}

	];

	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
		populatesellrate(rowid);
	}
	addGrid(datafields, popcolumns, updateRows, "", addrow, "#jqxgrideCTA");
}
// create credit to acc
$("#createCTA").on("click",function() {
	$(this).find('form').trigger('reset');
	$('#popupheaderlabelCTA').text('Create Credit to A/C & PB Parameter Details');
          $("#storeRegionCTA").on('change',function() {
		   var storeRegionS = $('#storeRegionS').val();
			$.getJSON('/OrderExecution/api/v1/regionStoreList?listType=' + storeRegionS,function(data) {
			$('#storeRegionNameS').empty().append('<option value="" selected>--Select--</option>');
			if (storeRegionS == "region") {
				$.each(data.payload.rList,function(	key,val) {
				$('#storeRegionNameCTA').append('<option value="'+ val.id + '">' + val.name + '</option>');
			});
		} else if (storeRegionS == "store") {
				$.each(data.payload.sList,function(key,val) {
					$('#storeRegionNameCTA').append('<option value="'+ val.id + '">' + val.name + '</option>');
			 });
		   }
	    });
	 });
   });

var handleCTAModalPopUp = function() {
	addCTAPbGrid();
	$("#jqxgrideCTA").show();
}

$("#storeRegionS").on('change',function() {
			var storeRegionS = $('#storeRegionS').val();
			$.getJSON('/OrderExecution/api/v1/regionStoreList?listType=' + storeRegionS, function(data) {
				$('#storeRegionNameS').empty().append('<option value="" selected>--Select--</option>');
				if (storeRegionS == "region") {
					$.each(data.payload.rList, function(key, val) {
						$('#storeRegionNameS').append('<option value="' + val.id + '">' + val.name+ '</option>');
					});
				} else if (storeRegionS == "store") {
					$.each(data.payload.sList, function(key, val) {
						$('#storeRegionNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
					});
				}
			});
		});

$("#storeRegionCTA").on('change',function() {
	var storeRegionCTA = $('#storeRegionCTA').val();
	$.getJSON('/OrderExecution/api/v1/regionStoreList?listType='+ storeRegionCTA, function(data) {
		$('#storeRegionNameCTA').empty().append('<option value="" selected>--Select--</option>');
				if (storeRegionCTA == "region") {
					$.each(data.payload.rList, function(key, val) {
						$('#storeRegionNameCTA').append('<option value="' + val.id + '">' + val.name + '</option>');
					});
				} else if (storeRegionCTA == "store") {
					$.each(data.payload.sList, function(key, val) {
						$('#storeRegionNameCTA').append('<option value="' + val.id + '">' + val.name + '</option>');
					});
				}

			});
		});

var saveCTAAccountDet = function() {
	var ctaAccDet = [ {
		"fromPurity" : $('#fromPurity').val(),
		"toPurity" : $('#toPurity').val(),
		"company" : $("#compNonComp").val(),
		"addPercentage" : $('#addPer').val(),
		"deductPercentage" : $('#dedPer').val(),
		"ecRate" : $('#exchangingRate').val(),
		"rcRate" : $('#refRate').val(),
		"purpose" : $('#purposeCTA').val(),
		"regionStoreId" : $('#storeRegionNameCTA').val(),
		"regionStoreType" : ($('#storeRegionCTA').val() == "region") ? "Region"
				: "Store",
		"metalSegment" : {
			"id" : $('#metalSegmentCTA').val()
		},
		"startDate" : $('#startDateCTA').val(),
		"endDate" : $('#endDateCTA').val(),
		"status" : true
	} ];
	return ctaAccDet;
}
$('#saveCTAAccount').on('click',function() {
	trimmer();
	
			var fromPurity = $('#fromPurity').val();
			var toPurity = $('#toPurity').val();
			var compNonComp = $("#compNonComp").val();
			var addPer = $('#addPer').val();
			var dedPer = $('#dedPer').val();
			var exchangingRate = $('#exchangingRate').val();
			var refRate = $('#refRate').val();
			var purposeCTA = $('#purposeCTA').val();
			var storeRegionNameCTA = $('#storeRegionNameCTA').val();
			var metalSegmentCTA = $('#metalSegmentCTA').val();
			var startDateCTA = $('#startDateCTA').val();
			var storeRegionCTA = $("#storeRegionCTA").val();
			var regionStoreType;

			var endDateCTA = $('#endDateCTA').val();
			
				if (fromPurity == "" || toPurity == "" || compNonComp == ""
						|| addPer == "" || exchangingRate == ""
						|| refRate == "" || purposeCTA == ""
						|| storeRegionNameCTA == "" || metalSegmentCTA == ""
						|| startDateCTA == "" || endDateCTA == "") {
					$.growl.error({
						message : "Please fill all the mandatory fields",
						duration : 10000
					});
					return false;
				}

			
			
			if(dedPer < 0 || dedPer >100){
				$.growl.error({
					message : "Deduct % Must Be greater than 0 and less than 100",
					duration : 10000
				});
				return false;
				}
			
			if(addPer < 0 || addPer >100){
			$.growl.error({
				message : "Add % Must Be greater than 0 and less than 100",
				duration : 10000
			});
			return false;
			}
			
		 if(exchangingRate < 0 ||exchangingRate > 99.99 ){
			$.growl.error({
				message : "Exchange Rate Should be between 0 and 99.99 ",
				duration : 10000
			});
			return false;
			}
		 
		if(refRate < 0 || refRate > 99.99){
			$.growl.error({
				message : "Refining Rate Should be between 0 and 99.99",
				duration : 10000
			});
			return false;
			}
		
		if(fromPurity > toPurity ){
			$.growl.error({
				message : "From Purity Should not be Greater than To Purity !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
			var ctaAccountDet = saveCTAAccountDet();

			postJSON('/OrderExecution/api/v1/createCreditToAcc', JSON.stringify(ctaAccountDet), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#createCreditToAcc').modal('hide');
					paramDetGrid2();
				} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});

				}
				
			});
		});

$("#searchCTA").on('click', function() {
	var metalSegmentCTAS = $("#metalSegmentCTAS").val();
	if (metalSegmentCTAS == "") {
		$.growl.error({
			message : "Please select Metal Segment!!",
			duration : 10000
		});
		return false;
	}
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	paramDetGrid2();
	$("#jqxgrid").show();
	$("#exportCTA").prop('disabled',false);

});

// Clear grid and reset input and dropdown value
$("#clearAllCTA").on('click', function() {
	/*$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();*/
	window.location.href="javascript:showContentPage('parameterDetails', 'bodySwitcher')"
});
$("#exportCTA").on("click",function() {
	var metalSegment = $("#metalSegmentCTAS").val();
	var purpose = $("#purposeS").val();
	var company = $("#companyNonCompany").val();
	var store = $("#storeRegionNameS").val();
		fieldFilters = {
				"fieldFilters" : {}
			};
	if (metalSegment != "" && metalSegment != null) {
		  fieldFilters.fieldFilters["metalSegment"] = metalSegment;
		}
	if (purpose != "" && purpose != null) {
		  fieldFilters.fieldFilters["purpose"] = purpose;
		}
	if (company != "" && company != null) {
		  fieldFilters.fieldFilters["company"] = company;
		}
	if (store != "" && store != null) {
		 fieldFilters.fieldFilters["store"] = store;
		}
	  var newData = [];
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
			postJSON('/OrderExecution/api/v1/creditToAccExport',JSON.stringify(ctaFilterValues()),function(data) {
				if(data != null){			
			 data = data.payload.list;
			for (i = 0; i < data.length; i++) {
			 newData.push({
				            'Region' : data[i].store.region.name,
							'Store Name' : data[i].store.name,
							'From Purity ' : data[i].fromPurity,
							'To Purity ' : data[i].toPurity,
							'Company ' : data[i].company,
							'Add Percentage ' : data[i].addPercentageE,
							'Deduct Percentage' : data[i].deductPercentageE,
							'EcRate ' : data[i].ecRate,
							'RcRate' : data[i].rcRate,
							'Purpose' : data[i].purpose,
							'Metal Segment ' : data[i].metalSegment.description,
							'Start Date ' : data[i].startDate,
							'End Date ' : data[i].endDate,
							'Status  ' : data[i].status
					});
			}
			//JSONToCSVConvertor(newData,	"Credit TO Account" + "_" + sysdate, true);
			 var opts = [{sheetid:'Credit_To_Account',header:true}];
             var res = alasql('SELECT * INTO XLSX("Credit To Account_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

$('#saveCTAAccE').on('click',function() {
	trimmer();
			var storeRegionCTAE = $('#storeRegionCTAE').val();
			var storeRegionNameCTAE = $('#storeRegionNameCTAE').val();
			var metalSegmentCTAE = $('#metalSegmentCTAE').val();
			var purposeCTAE = $('#purposeCTAE').val();
			var compNonCompCTAE = $('#compNonCompCTAE').val();
			var fromPurityCTAE = $('#fromPurityCTAE').val();
			var toPurityCTAE = $('#toPurityCTAE').val();
			var dedPerCTAE = $('#dedPerCTAE').val();
			var addPerCTAE = $('#addPerCTAE').val();
			var exchangingRateCTAE = $('#exchangingRateCTAE').val();
			var refRateCTAE = $('#refRateCTAE').val();
			var startDateCTAE = $('#startDateCTAE').val();
			var endDateCTAE = $('#endDateCTAE').val();
			var statusCTAE = $('#statusCTAE').val();
			var ctaDetId = $('#ctaDetId').val();
			var statCTAE;
			if (statusCTAE == 'Active') {
				statCTAE = true;
			} else {
				statCTAE = false;
			}
			var saveEditCTA = {
				"id" : ctaDetId,
				"fromPurity" : fromPurityCTAE,
				"toPurity" : toPurityCTAE,
				"company" : compNonCompCTAE,
				"addPercentage" : addPerCTAE,
				"deductPercentage" : dedPerCTAE,
				"ecRate" : exchangingRateCTAE,
				"rcRate" : refRateCTAE,
				"purpose" : purposeCTAE,
				"startDate" : startDateCTAE,
				"endDate" : endDateCTAE,
				"status" : statCTAE,
				"value" : null,
				"metalSegment" : {
					"id" : metalSegmentCTAE
				},
				"store" : {
					"id" : storeRegionNameCTAE
				}
			}
			
            if(dedPerCTAE < 0 || dedPerCTAE > 100){
            	$.growl.error({
					message : "Deduct % must be greater than 0 and less than 100",
					duration : 10000,
				});
            	return false;
            }
			 if(addPerCTAE < 0 || addPerCTAE > 100){
	            	$.growl.error({
						message : "Add % must be greater than 0 and less than 100",
						duration : 10000,
					});
	            	return false;
	            }
			if(exchangingRateCTAE < 0){
            	$.growl.error({
					message : "Exchange Rate must be greater than 0",
					duration : 10000,
					
				});
            	return false;
            }
			
			if(refRateCTAE < 0){
            	$.growl.error({
					message : "Refining Rate must be greater than 0",
					duration : 10000
				});
            	return false;
            }
			if(exchangingRateCTAE >= 100){
            	$.growl.error({
					message : "Exchange Rate Should be Less than 100",
					duration : 10000
				});
            	return false;
            }
			if(refRateCTAE >= 100){
            	$.growl.error({
					message : "Refining Rate Should be Less than 100",
					duration : 10000
				});
            	return false;
            }
			
			if(dedPerCTAE == "" || dedPerCTAE == null || exchangingRateCTAE == "" || exchangingRateCTAE == null
					|| refRateCTAE == "" || refRateCTAE == null || endDateCTAE == "" || endDateCTAE == null){
				$.growl.error({
					message : "Please Fill Mandatory Fields !!!",
					duration : 10000,
					title : "Error"
				})
				return false;
			}
			if($("#toPurityCTAE").val() < $("#fromPurityCTAE").val()){
				$.growl.error({
					message : "To Purity Should Not Be Less Than From Purity !!!",
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
				
			postJSON('/OrderExecution/api/v1/updateCreditToAcc', JSON.stringify(saveEditCTA), function(data) {
				console.log(data);
				if (data.resCode == "1") {
					$('#editCreditToAcc').modal('hide');
					$('#maintainZoneTypeE').modal('hide');
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					$('#createZoneTypeDet').on('hidden.bs.modal', function() {
						$(this).find('form').trigger('reset');
					});
					$('#createZoneTypeDet').modal('hide');
				}else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000,
						title : 'Error'
					});
				}
				paramDetGrid2();
			});
		});

// Upload File ###########################
$("#uploadFile").change(function() {
    var formData = new FormData();
    console.log( this.files[0]);
    formData.append('file', this.files[0]);
    
    $("#files").append($("#fileUploadProgressTemplate").tmpl());
    $("#fileUploadError").addClass("hide");
    
    $.ajax({
        url: '/echo/json/',
        type: 'POST',
        xhr: function() {
            var xhr = $.ajaxSettings.xhr();
            if (xhr.upload) {
                xhr.upload.addEventListener('progress', function(evt) {
                    var percent = (evt.loaded / evt.total) * 100;
                    $("#files").find(".progress-bar").width(percent + "%");
                }, false);
            }
            return xhr;
        },
        success: function(data) {
            $("#files").children().last().remove();
            $("#files").append($("#fileUploadItemTemplate").tmpl(data));
            $("#uploadFile").closest("form").trigger("reset");
        },
        error: function() {
            $("#fileUploadError").removeClass("hide").text("An error occured!");
            $("#files").children().last().remove();
            $("#uploadFile").closest("form").trigger("reset");
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }, 'json');
});



//Upload File ###########################
$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).find('form').trigger('reset');
	});
});

$('#createParamDet').on('hidden.bs.modal', function() {
	$(this).find('form').trigger('reset');
});

$('#createCreditToAcc').on('hidden.bs.modal', function() {
	$(this).find('form').trigger('reset');
});
	//upload Functionality Implementation
	function HandleUploadExcelFile()
	{
		// Check if file select event is captured
		if (fileEvent == null || (fileEvent != null && $.type(fileEvent) != "object"))
		{
			alert("Please select the data Excel file to load!");
			return;
		}
	
		var event = fileEvent;
	    try {
		    alasql('SELECT * FROM FILE(?,{headers:true})', [event], function(data){
		        // Process data here if any conversion or validation is required!
				if (data != null)
				{
					var cols = getColumnHeaders(data);
					if (cols != null && cols.length > 0) {
						
	                     console.log(cols);						
					}
					else {
						alert("No data found in the uploaded file...");
					}
					
					var pbjson=JSON.parse(JSON.stringify(data).replace(/\s/g,''));
					var pdetails = JSON.stringify(pbjson);	
					
					// Calling API to upload Parameter Details.
					postJSON('/OrderExecution/api/v1/uploadParameter', pdetails, function(response) {
						if (response.resCode == 1) {
							$.growl.notice({
								message : response.mesgStr,
								duration : 10000,
								title : 'Success'
							});
							paramDetGrid();
							return false;
						}else {
							$.growl.error({
								message : response.mesgStr,
								duration : 10000
							});
							return false;
						}
						
					});
					
				}
				else {
					alert("Invalid data in the uploaded file...");
				}
	
		    });	    	
	    }
		catch(err) {
			//console.log('Upload Error: ', err);
			alert('Upload Error: ', err);
		};
	
		//change the 'testUpload' to the input id in your page
		document.getElementById("parameterUpload").value = "";
		fileEvent = null;
	 }
	
	 function captureFileSelectEvent(event)
	 {
	 	fileEvent = event;
	 }
	 
$("#storeRegionS").on('change',function(){
	$("#exportCTA").prop('disabled',true);
});

$("#storeRegionNameS").on('change',function(){
	$("#exportCTA").prop('disabled',true);
});

$("#metalSegmentCTAS").on('change',function(){
	$("#exportCTA").prop('disabled',true);
});

$("#purposeS").on('change',function(){
	$("#exportCTA").prop('disabled',true);
});

$("#companyNonCompany").on('change',function(){
	$("#exportCTA").prop('disabled',true);
});
