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

var min ;
 var yy ;
$(function () {
    $("#startDate").datepicker({
    	changeMonth: true,
    	changeYear: true,
    	dateFormat: "dd/mm/yy",
    	minDate: 0,
    	 onSelect: function (dateStr) {
	        min = $(this).datepicker('getDate'); // Get selected date
	        yy = min.getFullYear();
	       $("#endDate").datepicker('option', 'minDate', min || '0');
	       $("#endDate").datepicker('option','maxDate',new Date(yy,11,31)); // Set other min, default to today
	    }
    });
    $("#endDate").datepicker({
    	changeMonth: true,
    	changeYear: true,
    	dateFormat: "dd/mm/yy",
    	minDate : 0,
    });
});


// Company Holiday Search listing filed Filter
var CompanyHolidaysFieldFiltersVal = function() {
	var regionS = $("#regionS").val();
	var dcStoreS = $("#dcStoreS").val();
	var storeDcS = $("#storeDcS").val();
	var status = $("#statusS").val();
	fieldFilters = {
		"fieldFilters" : {
		}
	};

	if (regionS != "" && regionS != null) {
		fieldFilters.fieldFilters["regionId"] = regionS;
	}
	if (dcStoreS != "" && dcStoreS != null) {
		fieldFilters.fieldFilters["dcId"] = dcStoreS;
	}
	if (storeDcS != "" && storeDcS != null) {
		fieldFilters.fieldFilters["storeId"] = storeDcS;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status == "True" ? true : false;
	}

	return fieldFilters;
}

// In grid view last column belong to action
function companyHolidayGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [{
		'name' : 'regionId',
		'type' : 'string',
		'map'  : 'region>name'
	},{
		'name' : 'store',
		'type' : 'string',
		'map'  : 'store>name'
	}
	,{
		'name' : 'storeIdCH',
		'type' : 'string',
		'map'  : 'store>id'
	}
	,{
		'name' : 'regionIdCH',
		'type' : 'string',
		'map'  : 'region>id'
	}
	,{
		'name' : 'dcIdCH',
		'type' : 'string',
		'map'  : 'dc>id'
	}
	,{
		'name' : 'dc',
		'type' : 'string',
		'map'  : 'dc>name'
	},{
		'name' : 'holidayName',
		'type' : 'string'
	},{
		'name' : 'startDate',
		'type' : 'string'
	},{
		'name' : 'endDate',
		'type' : 'string'
	},{
		'name' : 'createdDate',
		'type' : 'string'
	},{
		'name' : 'createdBy',
		'type' : 'string'
	},{
		'name' : 'status',
		'type' : 'string',
	},{
		'name' : 'id',
		'type' : 'int'
	} ];

	var columns = [ {
		'text' : 'Region',
		'datafield' : 'regionId',
		cellsalign : 'center',
		align:'center',
		'width' : '8%',
		sortable : true,
		editable : false
	}, {
		'text' : ' DC',
		'datafield' : 'dc', 
		'width' : '15%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : false
	},{
		'text' : '  Store',
		'datafield' : 'store',
		'width' : '12%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : false
	},{
		'text' : ' Holiday Name',
		'datafield' : 'holidayName',
		'width' : '12%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : false
	},{
		'text' : 'Start Date',
		'datafield' : 'startDate',
		'width' : '11%',
		cellsalign : 'center',
		align:'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		editable : false,
	},{
		'text' : 'End Date',
		'datafield' : 'endDate',
		'width' : '11%',
		cellsalign : 'center',
		align:'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		editable : false,
	},{
		'text' : 'Created On',
		'datafield' : 'createdDate',
		'width' : '9.5%',
		columntype : 'datetimeinput',
		cellsalign : 'center',
		align:'center',
		cellsformat : 'dd/MM/yy ',
		sortable : false,
		editable : false,
	},{
		'text' : 'Created By',
		'datafield' : 'createdBy',
		'width' : '10.5%',
		columntype : 'datetimeinput',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false,
	},{
		'text' : 'Status',
		'datafield' : 'status',
		'width' : '8%',
		cellsalign : 'center',
		align:'center',
		sortable : false,
		editable : false,
	},{
		text : '',
		datafield : 'id',
		cellsalign : 'center',
		align:'center',
		cellsrenderer : editHolidays,
		editable : false,
		filterable: false,
		sortable : false,
		'width' : '3%'
	}];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchCompanyHolidays", "list",columns,CompanyHolidaysFieldFiltersVal(), updateRows, "");
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

// Validate Field for Creation of Company Details
var validateCompanyHolidays = function() {	
	
	var region = $('#region').val();
	
	var status = $('#active').val();
	var startDate = $('#startDate').val();
	var endDate = $('#endDate').val();
	var holidayName = $('#holidayName').val();
	
	var validation = true;

	if ( region == "" 
			|| holidayName == ""|| status == ""|| startDate == ""|| endDate == "") {
		validation = false;
	}
	return validation;
}

var saveCompanyHolidays = function() {
	var status;
/*if($('#active').val() == 1){
	status = true
}else if($('#active').val() == 0){
	status = false;
}	*/

// Create object
var CompanyHolidays = 
{ 
		  "storeId":  $('#store').val(),
		  "dcId": $('#dcStore').val(),
		  "regionId": $('#region').val(), 
		  "status": ($('#active').val() == "Active") ? true : false, 
		  "holidayName": $('#holidayName').val(), 
		  "startDate": $('#startDate').val(), 
		  "endDate": $('#endDate').val()
		}
	return CompanyHolidays;
}

var loadRegionStore = function(storeId=null, dcId = null, regionId = null, status = null ){
	// API call GET Method use select option append formula
	$('#storeDcS').empty().append('<option value="" selected>--Select--</option>');	
	$('#storeE').empty().append('<option value="" selected>--Select--</option>');	
	$('#store').empty().append('<option value="" selected>--Select--</option>');	
	
	$('#storeDcS').empty().append('<option value="" selected>--Select--</option>');	
	$('#storeE').empty().append('<option value="" selected>--Select--</option>');	
	$('#store').empty().append('<option value="" selected>--Select--</option>');	
	
	$('#regionS').empty().append('<option value="" selected>--Select--</option>');	
	$('#region').empty().append('<option value="" selected>--Select--</option>');	
	$('#regionE').empty().append('<option value="" selected>--Select--</option>');	
	
	$('#dcStoreS').empty().append('<option value="" selected>--Select--</option>');	
	$('#dcStoreE').empty().append('<option value="" selected>--Select--</option>');	
	$('#dcStore').empty().append('<option value="" selected>--Select--</option>');	
	
	$('#activeE').empty().append('<option value="" selected>--Select--</option>');	
	
	var id = 'company';

	if (id != "") {
		$.getJSON('/OrderExecution/api/v1/companyHolidayLOV', function(data) {
			$.each(data.payload.store, function(key, val) {
				if(storeId == null){
					$('#storeDcS').append('<option  value="' + val.id + '">' + val.name	+ '</option>');
					$('#store').append('<option value="' + val.id + '">' + val.name	+ '</option>');
				}else{
					if(storeId == val.id){					
						$('#storeE').append('<option selected value="' + val.id + '">' + val.name	+ '</option>');
					}else{
						$('#storeE').append('<option value="' + val.id + '">' + val.name + '</option>');
					}
				}
			});
			
			$.each(data.payload.region, function(key, val) {
				if(regionId == null){
					$('#regionS').append('<option value="' + val.id + '">' + val.name	+ '</option>');
					$('#region').append('<option value="' + val.id + '">' + val.name	+ '</option>');
				}else{
					if(regionId == val.id){					
						$('#regionE').append('<option selected value="' + val.id + '">' + val.name	+ '</option>');
					}else{
						$('#regionE').append('<option value="' + val.id + '">' + val.name + '</option>');
					}
				}
			});
			
			
			$.each(data.payload.dc, function(key, val) {
				if(dcId == null){
					$('#dcStoreS').append('<option value="' + val.id + '">' + val.name	+ '</option>');
					$('#dcStore').append('<option value="' + val.id + '">' + val.name	+ '</option>');
				}else{
					if(dcId == val.id){					
						$('#dcStoreE').append('<option selected value="' + val.id + '">' + val.name	+ '</option>');
					}else{
						$('#dcStoreE').append('<option value="' + val.id + '">' + val.name + '</option>');
					}
				}
			});
			
			var statusCH = [{
					"id" : "1",
					"name" : "Active"
			},{
				"id" : "0",
				"name" : "InActive"
			}];
			
			
			$.each(statusCH, function(key, val) {
				if(status == val.name){					
					$('#activeE').append('<option selected  value="' + val.id + '">' + val.name	+ '</option>');
				}else{
					$('#activeE').append('<option value="' + val.id + '">' + val.name + '</option>');
				}
		});
			
		});
	}
	
}
loadRegionStore(storeId=null, dcId = null, regionId = null, status = null);
$("#maintainCompanyDet").on('click', function(){
	loadRegionStore(storeId=null, dcId = null, regionId = null, status = null);
});

// on change of region load dc and Store
$("#regionS").on('change',function(){
	var region = $("#regionS").val();
	$.getJSON('/OrderExecution/api/v1/companyHolidayLOV?type=StoreOrDC'+'&&RegionId='+region,function(data){
		$('#dcStoreS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.dcList, function(key, val) {
			$('#dcStoreS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		$('#storeDcS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.storeList, function(key, val) {
			$('#storeDcS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	});
});

$("#region").on('change',function(){
	var region = $("#region").val();
	$.getJSON('/OrderExecution/api/v1/companyHolidayLOV?type=StoreOrDC'+'&&RegionId='+region,function(data){
		$('#dcStore').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.dcList, function(key, val) {
			$('#dcStore').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		$('#store').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.storeList, function(key, val) {
			$('#store').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	});
});

$("#regionE").on('change',function(){
	var region = $("#regionE").val();
	$.getJSON('/OrderExecution/api/v1/companyHolidayLOV?type=StoreOrDC'+'&&RegionId='+region,function(data){
		$('#dcStoreE').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.dcList, function(key, val) {
			$('#dcStoreE').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		$('#storeE').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.storeList, function(key, val) {
			$('#storeE').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	});
});

// Create and save Company Holidays
$("#maintainCompanyHoliday").on('click',function() {
	trimmer();
		if (validateCompanyHolidays()) {
			var companyHolidays = saveCompanyHolidays();
			if (companyHolidays) {
			  postJSON('/OrderExecution/api/v1/createCompanyHolidays',JSON.stringify(companyHolidays),function(data) {
				if (data.resCode == "1") {
					$('#maitainCompanyDetails').modal('hide');
						$.growl.notice({
							message : data.mesgStr,
							duration : 10000,
							title : 'Success'
						});		
						companyHolidayGrid();
				}else if (data.resCode == "2") {
						$.growl.error({
							message : data.mesgStr,
							duration : 10000,
							title : 'Warning'
						});
										
				} 
			});
		}
			
		      }else {
			       $.growl.error({
						message : "Please fill all the mandatory fields",
						duration : 10000
					});
					}
				});

var editHolidays = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
		var status = $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
		if(status =="Active"){
		var editVal= '<button class="btn btn-sm btn-primary" data-toggle="modal" margin-left:5px;  margin-bottom:5px;  margin-right:5px;" data-target="#maintainCompanyHolidaysE" type="button" id='
				+ row
				+ ' onclick="editCompanyHolidays('
				+ row
				+ ')"/><i class="fa fa-pencil fa-sm"></i></button>'
		}else{
			var editVal = '<button disabled class="btn btn-sm btn-primary" type="button"><i class="fa fa-pencil fa-sm"></i></button>';
		
		}
		return editVal;
	}
}
var saveDet = function() {
		var status;
		
		if($('#activeE').val() == 1){
			status = "Active";
		}else if($('#activeE').val() == 0){
			status = "Inactive";
		}
		var editCompanyDet = {		
		"id": $('#companyHolidayId').val(),
		"holidayName": $('#holidayNameE').val(),
		"storeId":$('#storeE').val(),
		"dcId":$('#dcStoreE').val(),
		"regionId":$('#regionE').val(),
		"status": status,
		"startDate":$('#startDateE').val(),
		"endDate":$('#endDateE').val()
	}
	
	return editCompanyDet;
}
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
// Edit Company Holiday details
var editCompanyHolidays = function(row) {
	
	$('#popupheaderlabel').text('Edit Company Holidays');
	
		var rows = $('#jqxgrid').jqxGrid('getrows');
		
		var selectedRowData = rows[row];
		
		loadRegionStore(selectedRowData.storeIdCH, selectedRowData.dcIdCH, selectedRowData.regionIdCH, selectedRowData.status);
		
		$("#companyHolidayId").val(selectedRowData.id);
		$("#holidayNameE").val(selectedRowData.holidayName);
	     var sDate = selectedRowData.startDate;
		 var endDate = selectedRowData.endDate;

		$("#startDateE").val(sDate);
		$("#endDateE").val(endDate);
		 
		$("#startDateE").datepicker({
			changeMonth : true,
			changeYear : true,
			dateFormat : "dd/mm/yy",
			maxDate : 0,
			onSelect : function(dateStr) {
				var min = $(this).datepicker('getDate'); // Get selected date
				$("#endDateE").datepicker('option', 'minDate', min || '0');
			}
		});
		var today = new Date();
		$("#endDateE").datepicker({
			changeMonth : true,
			changeYear : true,
			dateFormat : "dd/mm/yy",
			maxDate : 0
		});
	
		var dateVal = selectedRowData.createdDate;
		
		 
		$("#createdByE").val(selectedRowData.createdBy);
		$("#createdOnE").val(dateVal);
}
$('#saveCompanyE').on('click',function() {
	trimmer();
	var companyHolidayDetailsEdit = saveDet();
	if (companyHolidayDetailsEdit) {
		postJSON('/OrderExecution/api/v1/updateCompanyHolidays',JSON.stringify(companyHolidayDetailsEdit), function(data) {
					if (data.resCode == "1") {
						companyHolidayGrid();
						$('#maintainCompanyHolidaysE').modal('hide');

						$.growl.notice({
							message : data.mesgStr,
							duration : 10000,
							title : 'Success'
						});
						$('#maitainCompanyDetails').on('hidden.bs.modal',function() {
									$(this).find('form').trigger('reset');
								});
						$('#maitainCompanyDetails').modal('hide');
					} else{
						$.growl
						.error({
							message : data.mesgStr,
							duration : 10000
		      });
			}
		});
	}
 }
);

// Export function for company Details
$("#export").on("click",function() {
			var data;
			var regionS = $("#regionS").val();
			var dcStoreS = $("#dcStoreS").val();
			var storeDcS = $("#storeDcS").val();
			var sysdate = moment().format('DDMMYYYYHHmmSS');
			var rows = $('#jqxgrid').jqxGrid('getrows');
			console.log(rows);
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
			postJSON('/OrderExecution/api/v1/exportCompanyHolidays', JSON
					.stringify(CompanyHolidaysFieldFiltersVal()), function(response) {
				if(response!=null){
				data = response.payload.list;
				
				for(i=0; i<data.length; i++){
					
					
						newData.push({
							'Id' : data[i].id,
							'Store' : (null != data[i].store)?data[i].store.name:"",
							'DC' : (null != data[i].dc)?data[i].dc.name:"",
							'Region' : data[i].region.name,
							'Status' : data[i].status,
							'Holiday Name' : data[i].holidayName,
							'Start Date' :data[i].startDate,
							'End Date' :data[i].endDate,
							'Created Date' : data[i].createdDate,
							'Created By' :data[i].createdBy
								
						})
					}
				 var opts = [{sheetid:'Company_Holidays',header:true}];
                 var res = alasql('SELECT * INTO XLSX("Company Holidays_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
				}			
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

$('.modal').on('hidden.bs.modal', function () {
    $("form").each(function(){
      $(this).validate().resetForm();
    });
    $("form").trigger("reset");
});

// On click on search button it will load grid
$("#search").on('click', function() {
	companyHolidayGrid();
	$("#jqxgrid").show();
	return false;
});
// Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	window.location.href="javascript:showContentPage('maintainCompanyholidays','bodySwitcher')";
});

/*$.validate();*/