/**
 *  ## AUTHOR 		: Rashmi
 *  ## DATE 		: 08-05-2018 
 *  ## DESCRIPTION 	: SCRIPT TO SEACH ACCESSORY
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

$('#vendorCode').empty().append('<option value="" selected>--Select--</option>');
$('#status').empty().append('<option value="" selected>--Select--</option>');
$('#storeOrDcId').empty().append('<option value="" selected>--Select--</option>');

var onLoad = function() {
	$.getJSON('/OrderExecution/api/v1/printTagAccessoryLOVs ',function(data) {			
			var status = data.payload.status;
			var vendorCode = data.payload.vendors;									
			$.each(status, function(key, val) {
				$('#status').append('<option  value="' + val.id + '">' + val.name + '</option>');
			});			
			$.each(vendorCode, function(key, val) {
				$('#vendorCode').append('<option  value="' + val.id + '">' + val.name + '</option>');
			});
	});	
}

onLoad();

$("#storeOrDc").on('change',function(){
	var storeDc = $("#storeOrDc").val(); 
	$('#storeOrDcId').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/metalAccountLOV?page=storeOrDc&sdc='+storeDc,function(data) {			
		var arr = data.payload.allStores;									
		$.each(arr, function(key, val) {
			$('#storeOrDcId').append('<option  value="' + val.id + '">' + val.name + '</option>');
		});			
	});	
});

$('#tozoneObj').hide();
$('#zoneName').hide();

$('#storeOrDcId').on('change',function() {
	$('#tozoneObj').show();
	$('#zoneName').show();
	var storeObj = $('#storeOrDcId').val();

	var fieldFilters = {
			 "fieldFilters": {
				 "storeIds" : storeObj   
				  }
	};
	
	postJSON('/OrderExecution/api/v1/handoverSlipZoneLOVs',JSON.stringify(fieldFilters),function(data){
		console.log(data.payload.zoneNames);
		var zoneList = data.payload.zoneNames;			
		var Z = '<select id="zoneObj" name="zoneObj" class="form-control" multiple="multiple">';
		$.each(zoneList, function(key, val) {
			Z += '<option value="' + val.id + '">' + val.description + '</option>';
		});
		Z += '</select>';
		$("#zone").html(Z);
		$('#zoneObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	});

});


$('#accessorySearch').validate({
		errorElement : 'label',
		errorClass : 'help-inline',
		focusInvalid : false,
		ignore : "",
		rules : {
			"grNumber" : {
				number : true
			},
			"grSlNumber" : {
				number : true
			},
			"stockNo" : {
				number : true
			}
		},
		
		submitHandler : function(form) {				
		
		}
});

var accessoryfeildFilters = function(){
	var stockNo = $('#stockNo').val();	
	var vendorCode = $('#vendorCode').val();
	var status = $('#status').val();
	var grNumber = $('#grNumber').val();
	var grSlNumber = $('#grSlNumber').val();
	var storeOrDc = $('#storeOrDc').val();
	var storeOrDcId = $('#storeOrDcId').val();	
	var zoneObj = $('#zoneObj').val();
	if (zoneObj == null || zoneObj == ""){
		var zone = "";
	}else{
		var zone = zoneObj.join(",");
	} 
	
	var fieldFilters = {
		"fieldFilters" : {							
		}
	};		 
	if (grNumber != "" && grNumber != null) {
		fieldFilters.fieldFilters["grNo"] = parseInt(grNumber);
	}
	if (grSlNumber != "" && grSlNumber != null) {
		fieldFilters.fieldFilters["grSrlNo"] = parseInt(grSlNumber);
	}
	if (storeOrDc != "" && storeOrDc != null) {
		fieldFilters.fieldFilters["storeOrDc"] = storeOrDc;
	}
	if (storeOrDcId != "" && storeOrDcId != null) {
		fieldFilters.fieldFilters["storeOrDcId"] = parseInt(storeOrDcId);
	}
	if (zone != "" && zone != null) {
		fieldFilters.fieldFilters["zoneId"] = zone;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorId"] = parseInt(vendorCode);
	}
	if (stockNo != "" && stockNo != null) {
		fieldFilters.fieldFilters["stockNo"] = stockNo;
	}
	
	return fieldFilters;
}

function accessoryGrid() {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	};

    var  datafields=
    [
        { name: 'Id', type: 'string',map:'id' },
        { name: 'Segment', type: 'string',map:'accSegmentDTO>description' },
        { name: 'Category', type: 'string', map:'accCategory>Description' }           
    ];

    var columns =
    [
        { text: 'ID', datafield: 'Id', width: "35%", cellsalign : 'center', align:'center' },
        { text: 'Acc Segment', datafield: 'Segment',  width: "35%", cellsalign : 'center', align:'center' },
        { text: 'Acc Category', datafield: 'Category', width: "30%", cellsalign : 'center', align:'center' }     	  
    ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchPrintTagAccessory","list", columns, accessoryfeildFilters(), updateRows, "");
	       
	$("#jqxgrid").jqxGrid({
        width: '100%',
        rowdetails : true,
		sortable : false,
		editable : false,
		columnsResize : true,
        showstatusbar: true,
        statusbarheight: 25,
        height: 200,
        theme: 'energyblue',
        altrows: true,
        columnsResize: true,
        showaggregates: true,
	});
}

$('#search').on("click",function(){
	accessoryGrid();
	$("#jqxgrid").show();
});

$('#clearAll').on("click",function(){
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('accessoryPrintTag', 'bodySwitcher')";
})




//Print Functionality to be done by Venkat
//#######################################
$("#accprintTag").on('click', function() {
	var stockNo = $('#stockNo').val();	
	var vendorCode = $('#vendorCode').val();
	var status = $('#status').val();
	var grNumber = $('#grNumber').val();
	var grSlNumber = $('#grSlNumber').val();
	var storeOrDc = $('#storeOrDc').val();
	var storeOrDcId = $('#storeOrDcId').val();	
	var zoneObj = $('#zoneObj').val();
	if (zoneObj == null || zoneObj == ""){
		var zone = "";
	}else{
		var zone = zoneObj.join(",");
	} 
	
	var fieldFilters = {
		"fieldFilters" : {							
		}
	};		 
	if (grNumber != "" && grNumber != null) {
		fieldFilters.fieldFilters["grNo"] = parseInt(grNumber);
	}
	if (grSlNumber != "" && grSlNumber != null) {
		fieldFilters.fieldFilters["grSrlNo"] = parseInt(grSlNumber);
	}
	if (storeOrDc != "" && storeOrDc != null) {
		fieldFilters.fieldFilters["storeOrDc"] = storeOrDc;
	}
	if (storeOrDcId != "" && storeOrDcId != null) {
		fieldFilters.fieldFilters["storeOrDcId"] = parseInt(storeOrDcId);
	}
	if (zone != "" && zone != null) {
		fieldFilters.fieldFilters["zoneId"] = zone;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorId"] = parseInt(vendorCode);
	}
	if (stockNo != "" && stockNo != null) {
		fieldFilters.fieldFilters["stockNo"] = stockNo;
	}
	fieldFilters = {
		"fieldFilters" : {
			"vendorId" : vendorCode,
			//"ArticleSegment" : stoneSeg,
			 "grNo":grNumber,
			 "grSrlNo":grSlNumber,
			 "storeOrDC":storeOrDc,
			 "StoreDCId":storeOrDcId,
		     "zone":zone,
		     "stockNo":stockNo,
		   //  "accCode":,
			"mode" : "pdf",
			"reportName" : "RPT_Print_Tag_Accessory_Stock"
		}
	}
	$.ajax({
		url : 'jasperReport',
		type : 'post',
		data : fieldFilters,
		contentType : "application/x-www-form-urlencoded",
		xhrFields : {
			responseType : "arraybuffer"
		},
		success : function(data) {
			console.log(data);
			if (navigator.msSaveBlob) {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				navigator.msSaveBlob(file, 'RPT_Print_Tag_Accessory_Stock.pdf');
			} else {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			}
		}
	});

});
