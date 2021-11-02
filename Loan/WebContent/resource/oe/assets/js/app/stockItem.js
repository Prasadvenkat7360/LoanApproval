/**
 * ## AUTHOR : POOJA 
 *  ## DATE : 01-06-2017 
 *  ## DESCRIPTION : SCRIPT TO SEACH STOCK ITEM 
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

$('#storeCode').empty().append('<option value="" selected>--Select--</option>');
$('#vendorCode').empty().append('<option value="" selected>--Select--</option>');
$('#articleSeg').empty().append('<option value="" selected>--Select--</option>');
var onLoadCustomerDet = function() {

	$.getJSON('/OrderExecution/api/v1/printTagCustomerOrderLOVs ',
					function(data) {

						var slist = data.payload.storeList;
						var segments = data.payload.segments;
						var vendorCodeS = data.payload.vType;
						var status = data.payload.status;
						
						
						$.each(slist, function(key, val) {
						$('#storeCode').append('<option  value="' + val.id + '">' + val.name + '</option>');
						});
						
						$.each(segments, function(key, val) {
						$('#articleSeg').append('<option  value="' + val.id + '">' + val.description + '</option>');
						});
						$.each(vendorCodeS, function(key, val) {
						$('#vendorCode').append('<option  value="' + val.id + '">' + val.name + '</option>');
						});

						var v = '<select id="statusObj" name="statusObj" class="form-control" multiple="multiple">';
						$.each(status, function(key, val) {
							v += '<option value="' + val.id + '">' + val.name
							+ '</option>';
						});
						v += '</select>';
						$("#status").html(v);
						$('#statusObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : false,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
						});

					});
	
}
onLoadCustomerDet();

$('#jwlCodebj').hide();
$('#ToJewelCd').hide();
$('#articleSeg').on('change',function() {
var id = $('#articleSeg').val();
$('#jwlCodebj').show();
$('#ToJewelCd').show();
$.getJSON('/OrderExecution/api/v1/printTagJewelTypeLOV?id=' + id, function(data) {
	var jList = data.payload.jewelType;
	var v = '<select id="jewelCodeObj" name="jewelCodeObj" class="form-control" multiple="multiple">';
	$.each(jList, function(key, val) {
		v += '<option value="' + val.id + '">' + val.description
		+ '</option>';
	});
	v += '</select>';
	$("#jewelCode").html(v);
	$('#jewelCodeObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
	});	
});
});
$('#tozoneObj').hide();
$('#zoneName').hide();
$('#storeCode').on('change',function() {
	$('#tozoneObj').show();
	$('#zoneName').show();
var storeObj = $('#storeCode').val();

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
		Z += '<option value="' + val.id + '">' + val.description
		+ '</option>';
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
$('#stockItemSearch').validate(
		{
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
				"orderNumber" : {
					number : true
				},
				"orderSlNumber" : {
					number : true
				},
				"fromStock" : {
					number : true
				},
				"toStock" : {
					number : true
				}
			},
			
			submitHandler : function(form) {
				
				var minval = minMaxValues();
					if (minval != false) {
						stockItemDetGrid();
						$("#jqxgrid").show();
						return false;
					}				
			   }
		});

var stockItemfeildFilters = function(){
	
	var vendorCode = $('#vendorCode').val();
	var articleSeg = $('#articleSeg').val();
	var grNumber = $('#grNumber').val();
	var grSlNumber = $('#grSlNumber').val();
	var fromStock = $('#fromStock').val();
	var toStock = $('#toStock').val();
	var orderNumber = $('#orderNumber').val();
	var orderSlNumber = $('#orderSlNumber').val();
	var jewelCodeObj = $('#jewelCodeObj').val();
	var storeCode = $('#storeCode').val();
	var statusObj = $('#statusObj').val();
	
	if (statusObj == null || statusObj == ""){
		var status = "";
	}else{
		var status = statusObj.join(",");
	}
	if (jewelCodeObj == null || jewelCodeObj == ""){
		var jewelCode = "";
	}else{
		var jewelCode = jewelCodeObj.join(",");
	}
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

	if (articleSeg != "" && articleSeg != null) {
		fieldFilters.fieldFilters["segmentId"] = parseInt(articleSeg);
	}

	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorId"] = parseInt(vendorCode);
	} 
	if (grNumber != "" && grNumber != null) {
		fieldFilters.fieldFilters["grNo"] = parseInt(grNumber);
	}
	if (grSlNumber != "" && grSlNumber != null) {
		fieldFilters.fieldFilters["grSrlNo"] = parseInt(grSlNumber);
	}
	if (orderNumber != "" && orderNumber != null) {
		fieldFilters.fieldFilters["orderNo"] = parseInt(orderNumber);
	}
	if (orderSlNumber != "" && orderSlNumber != null) {
		fieldFilters.fieldFilters["orderSrlNo"] = parseInt(orderSlNumber);
	}
	if (storeCode != "" && storeCode != null) {
		fieldFilters.fieldFilters["storeId"] = parseInt(storeCode);
	}
	if (zone != "" && zone != null) {
		fieldFilters.fieldFilters["zoneId"] = zone;
	}
	if (fromStock != "" && fromStock != null) {
		fieldFilters.fieldFilters["stockNoFrom"] = parseInt(fromStock);
	};
	if (toStock != "" && toStock != null) {
		fieldFilters.fieldFilters["stockNoTo"] = parseInt(toStock);
	};
	if (jewelCode != "" && jewelCode != null) {
		fieldFilters.fieldFilters["jewelId"] = jewelCode;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	};
	return fieldFilters;
	}

function stockItemDetGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	};

	        var  datafields=
	        [
	            { name: 'segment', type: 'string',map:'segId>description' },
	            { name: 'jewelCode', type: 'string',map:'jewelType>description' },
	            { name: 'totalCount', type: 'string',  }           
	        ];

	       var columns =
	       [
                { text: 'Segment', datafield: 'segment', width: "35%", cellsalign : 'center', align:'center' },
                { text: 'Jewel Code', datafield: 'jewelCode',  width: "35%", cellsalign : 'center', align:'center' },
                { text: 'Total Count', datafield: 'totalCount', width: "30%", cellsalign : 'center', align:'center' }     	  
           ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchPrintTagStockItem",
			"list", columns,stockItemfeildFilters() , updateRows, "");
	       
	$("#jqxgrid").jqxGrid(
		    {
		        width: '100%',
		        rowdetails : true,
				sortable : false,
				editable : false,
				theme: 'energyblue',
				columnsResize : true,
		        showstatusbar: true,
		        statusbarheight: 25,
		        height: 200,
		        altrows: true,
		        columnsResize: true,
		        showaggregates: true,
		    });
}
function minMaxValues() {
	var fromStock = $("#fromStock").val();
	var toStock = $("#toStock").val();
	if ((fromStock != '') && (toStock != '') && (toStock < fromStock)) {
		$.growl.error({
			message : "To Stock should be greater than or equal to From Stock",
			duration : 1000
		});
		return false;
	}
}
/*$('#search').on("click",function(){
	if (vendorCode != "" || articleSeg != ""
		|| grNumber != ""|| grSlNumber != ""|| fromStock != ""|| toStock != ""|| orderNumber != ""|| orderSlNumber != ""
			|| jewelCodeObj != ""|| storeCode != ""|| statusObj != "" ) {
	}
	else
	{
	$.growl.error({
		message :"Please fill atleast one Field ",
		duration : 10000,

	});
		return false;
	}
	});*/
$('#clearAll').on("click",function(){
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('stockItem', 'bodySwitcher')";
})





//Print Functionality to be done by Venkat
//#######################################
$("#printsi").on('click', function() {
	var vendorCode = $('#vendorCode').val();
	var articleSeg = $('#articleSeg').val();
	var grNumber = $('#grNumber').val();
	var grSlNumber = $('#grSlNumber').val();
	var fromStock = $('#fromStock').val();
	var toStock = $('#toStock').val();
	var jewelCodeObj = $('#jewelCodeObj').val();
	var storeCode = $('#storeCode').val();
	var statusObj = $('#statusObj').val();
	
	if (statusObj == null || statusObj == ""){
		var status = "";
	}else{
		var status = statusObj.join(",");
	}
	if (jewelCodeObj == null || jewelCodeObj == ""){
		var jewelCode = "";
	}else{
		var jewelCode = jewelCodeObj.join(",");
	}
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

	if (articleSeg != "" && articleSeg != null) {
		fieldFilters.fieldFilters["segmentId"] = parseInt(articleSeg);
	}

	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorId"] = parseInt(vendorCode);
	} 
	if (grNumber != "" && grNumber != null) {
		fieldFilters.fieldFilters["grNo"] = parseInt(grNumber);
	}
	if (grSlNumber != "" && grSlNumber != null) {
		fieldFilters.fieldFilters["grSrlNo"] = parseInt(grSlNumber);
	}
	if (storeCode != "" && storeCode != null) {
		fieldFilters.fieldFilters["storeId"] = parseInt(storeCode);
	}
	if (zone != "" && zone != null) {
		fieldFilters.fieldFilters["zoneId"] = zone;
	}
	if (fromStock != "" && fromStock != null) {
		fieldFilters.fieldFilters["stockNoFrom"] = parseInt(fromStock);
	};
	if (toStock != "" && toStock != null) {
		fieldFilters.fieldFilters["stockNoTo"] = parseInt(toStock);
	};
	if (jewelCode != "" && jewelCode != null) {
		fieldFilters.fieldFilters["jewelId"] = jewelCode;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	fieldFilters = {
		"fieldFilters" : {
			"vendorId" : vendorCode,
			"ArticleSegment" : articleSeg,
			 "grNo":grNumber,
			 "grSrlNo":grSlNumber,
			 "fromStock":fromStock,
			 "toStock":toStock,
			 "jewelCode":jewelCode,
			"Status" : status,
			"storeId" : storeCode,
			"zone":zone,
			"mode" : "pdf",
			"reportName" : "RPT_Print_Tag_Stock_Item"
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
				navigator.msSaveBlob(file, 'RPT_Print_Tag_Stock_Item.pdf');
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
