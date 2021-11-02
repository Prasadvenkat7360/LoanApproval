/*  ##	Author UI 		: 	Pooja sangve
	## API Integration	:  	pooja sangve
	##  JAVA            :   Nageswara Rao
	##	Date Creation 	: 	17-04-2017
	## 	Description		:	Hand Over Slip UI and Integration.
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

//date-picker
$("#fromDateC").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0,
	onSelect : function(dateStr) {
		var min = $(this).datepicker('getDate'); // Get selected date
		$("#toDateC").datepicker('option', 'minDate', min || '0');
	}
});
var today = new Date();
$("#toDateC").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0
});


var apiName;
$("#emailSA").prop('disabled', true);
$("#storeDcC").on("change", function(){
	var storeDcC = $("#storeDcC").val();
	if(storeDcC != "" && storeDcC != null){
		$("#emailSA").prop('disabled', false);
	}
	
	if(storeDcC == "" || storeDcC == null){
		$("#emailSA").prop('disabled', true);
	}
});

$("#emailSA").on('click', function() {
	
	var fromDateC = $("#fromDateC").val();
	var toDateC = $("#toDateC").val();
	var storeDcC = $("#storeDcC").val();
	if(storeDcC == "Store"){
		apiName = '/OrderExecution/api/v1/sendEmailByToStoreOrDc?criteria=Stores';
	}
	if(storeDcC == "DC"){
		apiName = '/OrderExecution/api/v1/sendEmailByToStoreOrDc?criteria=DC';
	}
	if(fromDateC == "" || fromDateC == null){
		$.growl.error({
			message : "Please select from date.",
			duration : 10000
		});
		return false;
	}
	
	if(toDateC == "" || toDateC == null){
		$.growl.error({
			message : "Please select to date.",
			duration : 10000
		});
		return false;
	}
	
	if(storeDcC == "" || storeDcC == null){
		$.growl.error({
			message : "Please select from Store/DC.",
			duration : 10000
		});
		return false;
	}
	
	
	if(handOverSlipFieldFilters()){
			postJSON(apiName, JSON.stringify(handOverSlipFieldFilters()), function(data) {
				if (data.resCode == "1") {
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
				} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000,
						title : 'Error'
					});
				}
	
			});
		
	}
});

$('#tozoneNm').hide();
$('#tozoneObj').hide();
$('#storeDcNmeC').on('change',function() {
	$('#tozoneNm').show();
	$("#tozoneObj").show();
	$('#tozoneObj').show();
	var storeOrDc = $('#storeDcC').val();
	var toStoreDcC = $('#storeDcNmeC').val();
	var storeDcC = $("#storeDcC").val();
	var storeObj = $('#storeObj').val();
	
	if (storeObj == null || storeObj == "") {
		var storeDCS = "";
	} else {
		var storeDCS = storeObj.join(",");
	}
	
	var fieldFilters =	{"fieldFilters":{"storeOrDcType":storeDcC,"storeOrDcs":storeDCS}}

	$('#toZone').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/getZonesForStkIt',JSON.stringify(fieldFilters),function(data) {
		var tozones = data.payload.zones;
		var v = '<select id="zoneTypeObj" name="zoneTypeObj" class="form-control" multiple="multiple">';
			$.each(tozones, function(key, val) {
			 v += '<option value="' + val.id + '">' + val.description + '</option>'; });
			 v += '</select>';
			 $("#zoneNameC").html(v);
			 $('#zoneTypeObj').multiselect({
			    	includeSelectAllOption : true,
					enableFiltering : false,
					maxHeight : 250,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
			});
       });
});


$('#storeLov').hide();
$('#storeDcNmeC').hide();
$('#storeDcNmeC').empty().append('<option value="" selected>--Select--</option>');
$('#storeDcC').on("change",function() {
			$('#storeLov').show();
			$('#storeDcNmeC').show();
			var storeOrDc = $('#storeDcC').val();
			if(storeOrDc != "" || storeOrDc != null){
				var store1 = '<select id="storeObj" class="form-control" multiple="multiple"></select>';
				$("#storeDcNmeC").html(store1);
				$('#storeObj').multiselect({
					includeSelectAllOption : true,
					enableFiltering : false,
					maxHeight : 250,
					numberDisplayed : 1,
				    buttonClass : 'col-md-12 form-control text-left'
				});
			}
			 if (storeOrDc == "DC") {
				var fromDC = $("#fromDCId").val();
			}else{
				var fromDC = 0;
			}
			$.getJSON('/OrderExecution/api/v1/handoverSlipLOVs?portal=oe',function(data) {
				var storeList = data.payload.storeList;
					if (storeOrDc == 'DC'){
					var toDCs = data.payload.dcList;
					}else {
						var toDCs = storeList;
					}
			var v = '<select id="storeObj" name="storeObj" class="form-control" multiple="multiple">';
				$.each(toDCs, function(key, val) {
					v += '<option value="' + val.id + '">' + val.name + '</option>'; });
						v += '</select>';
						$("#storeDcNmeC").html(v);
						$('#storeObj').multiselect({
								includeSelectAllOption : true,
								enableFiltering : false,
								maxHeight : 250,
								numberDisplayed : 1,
								buttonClass : 'col-md-12 form-control text-left'
							});

					})
			})

var segmentArr = [];
var onLoadHandOverSlip = function() {
	var idFromDc = [];
	$('#fromDcStoreNmeC').empty().append('<option value="" selected>--Select--</option>');
	$('#storeDcC').empty().append('<option value="" selected>--Select--</option>');
	$('#storeDcNmeC').empty().append('<option value="" selected>--Select--</option>');
	$('#refTypeC').empty().append('<option value="" selected>--Select--</option>');
	$('#statusS').empty().append('<option value="" selected>--Select--</option>');

	$.getJSON('/OrderExecution/api/v1/handoverSlipLOVs?portal=oe',function(data) {
		var status = data.payload.status;
		var fromDCs = data.payload.dc;					
		var refType = data.payload.refDocType;
		var storeDcs = data.payload.toStoreOrDC;
		segmentArr = data.payload.segments;
		var locType = data.payload.locationTypes;
	    var metalType = data.payload.mateialTypes;
		$('#fromDcStoreNmeC').val(fromDCs.name);
		$('#fromDCId').val(fromDCs.id);
		var ss = idFromDc.push(fromDCs.id);
			$.each(storeDcs, function(key, val){
				$('#storeDcC').append('<option value="' + val.name + '">'+ val.name + '</option>');
			});
			
			var segm = '<select id="segmentObj" class="form-control" multiple="multiple"></select>';
			$("#segmentC").html(segm);
			$('#segmentObj').multiselect({
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
			    buttonClass : 'col-md-12 form-control text-left'
			});
				
		var t = '<select id="metalObj" name="metalObj" class="form-control" multiple="multiple">';
		$.each(metalType, function(key, val) {
          t += '<option value="' + val.id + '">' + val.name + '</option>';
			});
			t += '</select>';
			$("#matTypeC").html(t);
			$('#metalObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});

	     $.each(status, function(key, val) {
			$('#statusS').append('<option value="' + val.id + '">'+ val.name + '</option>');
			});
		$.each(refType, function(key, val) {
			$('#refTypeC').append('<option value="' + val.id + '">'+ val.name + '</option>');
			});
	});
}
onLoadHandOverSlip();

$('#tolocObj').hide();
$('#tolocName').hide();


$("#matTypeC").on("change",function(){
	var segment = [];
	$('#tolocName').show();
	var metalObjS = $("#metalObj option:selected").text();
	var metaVal = $("#metalObj").val();
	
	
	if(metaVal != null){
		segment = getSegByMatType(metaVal);
		console.log(segment);
		
		var v = '<select id="segmentObj" name="segmentObj" class="form-control" multiple="multiple">';
		$.each(segment, function(key, val) {
          v += '<option value="' + val.id + '">' + val.description + '</option>';
			});
			v += '</select>';
			$("#segmentC").html(v);
			$('#segmentObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
	});
	}
	var fieldFilters ={
			"fieldFilters": {
		   "materialType": metalObjS
		}
	}
	
	if (metaVal == null) {
		$("#tolocObj").hide();
		$('#metalObj').multiselect("clearSelection");
		var segm = '<select id="segmentObj" class="form-control" multiple="multiple"></select>';
		$("#segmentC").html(segm);
		$('#segmentObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
		    buttonClass : 'col-md-12 form-control text-left'
		});
	} else {
	if (metaVal.length == 1) {
	$('#tolocObj').show();
	postJSON('/OrderExecution/api/v1/handoverSlipLocationCodeLOVs?portal=oe',JSON.stringify(fieldFilters),function(response) {
		var locType = response.payload.locations;
	var v = '<select id="locObj" name="locObj"  class="form-control" multiple="multiple">';
		$.each(locType, function(key, val) {
			v += '<option value="' + val.id + '">' + val.id + '</option>';
				});
			v += '</select>';
			$("#locTypeC").html(v);
			$('#locObj').multiselect({
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
			});
       })
       $("#tolocObj").show();
	}else {
	$("#tolocObj").hide();
  }
}
});

var getSegByMatType = function(matType){
	var segArr = [];
	console.log(matType);
	console.log(segmentArr);
	if(matType != null){
		if(matType.includes("F") || matType.includes("R")){
			$.each(segmentArr,function(k,v){
				if(v.name == "M"){
					segArr.push(v)
				}
			})
		}if(matType.includes("L")){
			$.each(segmentArr,function(k,v){
				if(v.name == "S"){
					segArr.push(v)
				}
			})
		}
		if(matType.includes("A")){
			$.each(segmentArr,function(k,v){
				if(v.name == "A"){
					segArr.push(v)
				}
			})
		}
	}

	return segArr;
}

var handOverSlipFieldFilters = function() {
	var fromDateC = $("#fromDateC").val();
	var toDateC = $("#toDateC").val();
	var fromDC = $("#fromDCId").val();
	var storeDcC = $("#storeDcC").val();
	var refTypeNoC = $("#refTypeNoC").val();
	var storeDcNmeCObj = $('#storeObj').val();
	if (storeDcNmeCObj == null || storeDcNmeCObj == ""){
		var storeDcNmeC = "";
	}else{
		var storeDcNmeC = storeDcNmeCObj.join(",");
	}
	var zoneNameCObj = $('#zoneTypeObj').val();
	if (zoneNameCObj == null || zoneNameCObj == ""){
		var zoneNameC = "";
	}else{
		var zoneNameC = zoneNameCObj.join(",");
	}
	var segmentCObj = $('#segmentObj').val();
	if (segmentCObj == null || segmentCObj == ""){
		var segmentC = "";
	}else{
		var segmentC = segmentCObj.join(",");
	}
	var matTypeCObj = $('#metalObj').val();
	if (matTypeCObj == null || matTypeCObj == ""){
		var matTypeC = "";
	}else{
		var matTypeC = matTypeCObj.join(",");
	}
	var refDocSlNoObj = $('#refTypeNoObj').val();
	if (refDocSlNoObj == null || refDocSlNoObj == ""){
		var refDocSlNo = "";
	}else{
		var refDocSlNo = refDocSlNoObj.join(",");
	}
	
	var locObj = $('#locObj').val();
	if (locObj == null || locObj == ""){
		var locTypeC = "";
	}else{
		var locTypeC = locObj.join(",");
	}
	
	var refDocType = $("#refTypeC").val();
	var statusS = $("#statusS").val();
	var fromDcStoreNmeC = $("#fromDcStoreNmeC").val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (locTypeC != "" && locTypeC != null) {
		fieldFilters.fieldFilters["location"] = locTypeC;
	}
	if (storeDcNmeC != "" && storeDcNmeC != null) {
		fieldFilters.fieldFilters["toStoreDCId"] = storeDcNmeC;
	}
	if (fromDateC != "" && fromDateC != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateC;
	}
	if (fromDC != "" && fromDC != null) {
		fieldFilters.fieldFilters["fromStoreDCId"] = fromDC;
	}
	if (toDateC != "" && toDateC != null) {
		fieldFilters.fieldFilters["toDate"] = toDateC;
	}
	if (fromDcStoreNmeC != "" && fromDcStoreNmeC != null) {
		fieldFilters.fieldFilters["fromStoreDCType"] = "DC";
	}
	if (zoneNameC != "" && zoneNameC != null) {
		fieldFilters.fieldFilters["toZoneId"] = zoneNameC;
	}
	if (storeDcC != "" && storeDcC != null) {
		fieldFilters.fieldFilters["toStoreDCType"] = storeDcC;
	}
	if (storeDcC == "store") {
		fieldFilters.fieldFilters["toStoreDCId"] = storeDcNmeC;
	}
	if (storeDcC == "DC") {
		fieldFilters.fieldFilters["toStoreDCId"] = storeDcNmeC;
	}
	if (segmentC != "" && segmentC != null) {
		fieldFilters.fieldFilters["segment"] = segmentC;
	}
	if (refDocType != "" && refDocType != null) {
		fieldFilters.fieldFilters["refDocType"] = refDocType;
	}
	if (matTypeC != "" && matTypeC != null) {
		fieldFilters.fieldFilters["materialType"] = matTypeC;
	}
	if (refDocSlNo != "" && refDocSlNo != null) {
		fieldFilters.fieldFilters["refDocSlNo"] = refDocSlNo;
	}
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["status"] = statusS;
	}
	if (refTypeNoC != "" && refTypeNoC != null) {
		fieldFilters.fieldFilters["refDocNo"] = parseInt(refTypeNoC);
	}
	return fieldFilters;
};

function searchHoSlipGrid() {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	var datafields = [ {
		'name' : 'transitDate',
		'type' : 'date'
	}, {
		'name' : 'fromStoreOrDCName',
		'type' : 'string'
	}, {
		'name' : 'fromZone',
		'type' : 'string',
		'map' : 'fromZone>description'
	}, {
		'name' : 'metalStoneLoc',
		'type' : 'string',
		'map' : 'metalLocation'
	}, {
		'name' : 'docType',
		'type' : 'string',
		'map' : 'refDocType>name'
	}, {
		'name' : 'tozone',
		'type' : 'string',
		'map' : 'toZone>description'
	}, {
		'name' : 'refDocNo',
		'type' : 'int'
	}, {
		'name' : 'refDocSlNo',
		'type' : 'int'
	}, {
		'name' : 'materialType',
		'type' : 'string',
		'map' : 'materialType>name'
	}, {
		'name' : 'segment',
		'type' : 'string',
		'map' : 'segmentDTO>name'
	}, {
		'name' : 'jewelTypeDescription',
		'type' : 'string'
	}, {
		'name' : 'skinPurity',
		'type' : 'long'
	}, {
		'name' : 'pieces',
		'type' : 'int'
	}, {
		'name' : 'grossWeight',
		'type' : 'long'
	}, {
		'name' : 'netWeight',
		'type' : 'long'
	}, {
		'name' : 'fgDiamondWeight',
		'type' : 'long'
	}, {
		'name' : 'stoneMainCategory',
		'type' : 'string'
	}, {
		'name' : 'reasonForTransit',
		'type' : 'string'
	}, {
		'name' : 'stoneAccPieces',
		'type' : 'int'
	}, {
		'name' : 'stoneAccWt',
		'type' : 'long'
	},{
		'name' : 'uqc',
		'type' : 'string',
		'map' :'uom'
	}, {
		'name' : 'itemValueInRs',
		'type' : 'long'
	}, {
		'name' : 'toStoreOrDCName',
		'type' : 'long'
	}, {
		'name' : 'moveToLocation',
		'type' : 'string'
	}, {
		'name' : 'createdBy',
		'type' : 'string'
	}, {
		'name' : 'receivedBy',
		'type' : 'string',
		'map' : 'receivedBy'
	} ];
	var columns = [ {
		'text' : 'Transfer Slip Dt.',
		'datafield' : 'transitDate',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'dd/MM/yyyy',
		editable : false,
		sortable : false
	}, {
		'text' : 'From Store / Dc',
		'datafield' : 'fromStoreOrDCName',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'From Zone ',
		'datafield' : 'fromZone',
		'width' : '4%',
		cellsalign : 'left',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Metal / Stone Loc',
		'datafield' : 'metalStoneLoc',
		'width' : '4.5%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Ref. Type',
		'datafield' : 'docType',
		'width' : '3.5%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'Ref. No.',
		'datafield' : 'refDocNo',
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Ref  Sl. No.',
		'datafield' : 'refDocSlNo',
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Material Type',
		'datafield' : 'materialType',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Seg',
		'datafield' : 'segment',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'Jewel Type',
		'datafield' : 'jewelTypeDescription',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Purity',
		'datafield' : 'skinPurity',
		'width' : '3%',
		cellsalign : 'right',
		cellsformat : 'd2',
		align : 'center',
		editable : false,
		sortable : false,
		cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
		  var skinPurity = " ";
		  var materialType = $('#jqxgrid').jqxGrid('getcellvalue', row, 'materialType');
	     if(materialType != "Loose Stones" &&  materialType != "Accessory"){
	    	 skinPurity = $('#jqxgrid').jqxGrid('getcellvalue', row, 'skinPurity');
	    	 return '<div style="text-align:center; margin: 0; padding-top:20px; height:40px;">' + skinPurity  + '</div>';
	     }else{
	    	 return '<div style="text-align:center; margin: 0; padding-top:20px; height:40px;">' + skinPurity + '</div>';
	     }
		}
	}, {
		'text' : 'Pcs/Pairs',
		'datafield' : 'pieces',
		'width' : '2%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Gross Wt.',
		'datafield' : 'grossWeight',
		'width' : '4%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		editable : false,
		sortable : false
	}, {
		'text' : 'Net Wt.',
		'datafield' : 'netWeight',
		'width' : '3%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		editable : false,
		sortable : false
	}, {
		'text' : 'FG Diamond Wt.',
		'datafield' : 'fgDiamondWeight',
		'width' : '5%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		editable : false,
		sortable : false
	}, {
		'text' : 'Stone Main Cat',
		'datafield' : 'stoneMainCategory',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Stone/Acc Pcs.',
		'datafield' : 'stoneAccPieces',
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Stone/Acc Wt.',
		'datafield' : 'stoneAccWt',
		'width' : '4%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd3',
		editable : false,
		sortable : false
	},{
		'text' : 'UQC',
		'datafield' : 'uqc',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Item Value in Rs.',
		'datafield' : 'itemValueInRs',
		'width' : '5%',
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2',
		editable : false,
		sortable : false
	}, {
		'text' : 'Remarks',
		'datafield' : 'reasonForTransit',
		'width' : '5%',
		cellsalign : 'left',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'To Store/Dc',
		'datafield' : 'toStoreOrDCName',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'To Zone',
		'datafield' : 'tozone',
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Move to Metal /Stone Loc',
		'datafield' : 'moveToLocation',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false,
		cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
			var metalLoc = $('#jqxgrid').jqxGrid('getcellvalue', row, 'metalStoneLoc');
			var movedToLoc = $('#jqxgrid').jqxGrid('getcellvalue', row, 'moveToLocation');
			
			if(metalLoc != null){
				return '<div style="text-align:center; margin: 0; padding-top:20px; height:40px;">' + metalLoc  + '</div>';
			}
			else{
				if(movedToLoc != null){
					return '<div style="text-align:center; margin: 0; padding-top:20px; height:40px;">' + movedToLoc  + '</div>';
				}
				
			}
		 }
	}, {
		'text' : 'Transfer Done By',
		'datafield' : 'createdBy',
		'width' : '4%',
		cellsalign : 'left',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Received By',
		'datafield' : 'receivedBy',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	} ];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchHandoverSlip", "list",columns, handOverSlipFieldFilters(), updateRows);
	$("#jqxgrid").jqxGrid({		
		width : '100%',
        sortable: true,            
     	altrows: true,
     	autorowheight :true,
        autoheight :true,
    	theme: 'energyblue',
        columnsheight: 120,
        columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}

// Export Record as per search criteria
$("#exportSA").on("click",function() {
					var data;
					var newData = [];
					var fromDateC = $("#fromDateC").val();
					var toDateC = $("#toDateC").val();
					var fromDC = $("#fromDCId").val();
					var storeDcC = $("#storeDcC").val();
					var refDocType = $("#refTypeC").val();
					var statusS = $("#statusS").val();
					var refTypeNoC = $("#refTypeNoC").val();
					var fromDcStoreNmeC = $("#fromDcStoreNmeC").val();

					var storeDcNmeCObj = $('#storeObj').val();
					if (storeDcNmeCObj == null || storeDcNmeCObj == "") {
						var storeDcNmeC = "";
					} else {
						var storeDcNmeC = storeDcNmeCObj.join(",");
					}

					var zoneNameCObj = $('#zoneTypeObj').val();
					if (zoneNameCObj == null || zoneNameCObj == "") {
						var zoneNameC = "";
					} else {
						var zoneNameC = zoneNameCObj.join(",");
					}

					var segmentCObj = $('#segmentObj').val();
					if (segmentCObj == null || segmentCObj == "") {
						var segmentC = "";
					} else {
						var segmentC = segmentCObj.join(",");
					}

					var matTypeCObj = $('#metalObj').val();
					if (matTypeCObj == null || matTypeCObj == "") {
						var matTypeC = "";
					} else {
						var matTypeC = matTypeCObj.join(",");
					}

					var refDocSlNoObj = $('#refTypeNoObj').val();
					if (refDocSlNoObj == null || refDocSlNoObj == "") {
						var refDocSlNo = "";
					} else {
						var refDocSlNo = refDocSlNoObj.join(",");
					}
					fieldFilters = {
						"fieldFilters" : {}
					};
					if (fromDateC != "" && fromDateC != null) {
						fieldFilters.fieldFilters["fromDate"] = fromDateC;
					}
					if (fromDC != "" && fromDC != null) {
						fieldFilters.fieldFilters["fromStoreDCId"] = fromDC;
					}
					if (toDateC != "" && toDateC != null) {
						fieldFilters.fieldFilters["toDate"] = toDateC;
					}
					if (fromDcStoreNmeC != "" && fromDcStoreNmeC != null) {
						fieldFilters.fieldFilters["fromStoreDCType"] = "DC";
					}
					if (zoneNameC != "" && zoneNameC != null) {
						fieldFilters.fieldFilters["toZoneId"] = zoneNameC;
					}
					if (storeDcC != "" && storeDcC != null) {
						fieldFilters.fieldFilters["toStoreDCType"] = storeDcC;
						// console.log(toStoreDCType);
					}
					if (storeDcC == "store") {
						fieldFilters.fieldFilters["toStoreDCId"] = storeDcNmeC;
					}
					if (storeDcC == "DC") {
						fieldFilters.fieldFilters["toStoreDCId"] = storeDcNmeC;
					}
					if (segmentC != "" && segmentC != null) {
						fieldFilters.fieldFilters["segment"] = segmentC;
					}
					if (refDocType != "" && refDocType != null) {
						fieldFilters.fieldFilters["refDocType"] = refDocType;
					}
					if (matTypeC != "" && matTypeC != null) {
						fieldFilters.fieldFilters["materialType"] = matTypeC;
					}
					if (refDocSlNo != "" && refDocSlNo != null) {
						fieldFilters.fieldFilters["refDocSlNo"] = refDocSlNo;
					}
					if (statusS != "" && statusS != null) {
						fieldFilters.fieldFilters["status"] = statusS;
					}
					if (refTypeNoC != "" && refTypeNoC != null) {
						fieldFilters.fieldFilters["refDocNo"] = refTypeNoC;
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
                     postJSON('/OrderExecution/api/v1/exportHandoverSlip',JSON.stringify(fieldFilters),function(response) {
            	     if(response != null){
			         data = response.payload.list;
				     for (i = 0; i < data.length; i++) {
				     newData.push({
				    	            'Transfer Slip Date ' : (data[i].transitDate != null) ? data[i].transitDate : "",
								    'From Store / DC' : (data[i].fromStoreOrDCName != null) ? data[i].fromStoreOrDCName : "",
									'From Zone' : (data[i].fromZone!= null) ? data[i].fromZone.description : "",
									'Metal / Stone Loc' : (data[i].metalLocation != null) ? data[i].metalLocation : "",
									'Ref Type' : (data[i].refDocType != null) ? data[i].refDocType.name : "",
									'Ref No.' : (data[i].refDocNo != null) ? data[i].refDocNo : "",
									'Ref Sl. No.' : (data[i].refDocSlNo != null) ? data[i].refDocSlNo : "",
									'Material Type' : (data[i].materialType != null) ? data[i].materialType.name : "",
									'Seg' : (data[i].segmentDTO != null) ? data[i].segmentDTO.name : "",
									'Jewel Type ' : (data[i].jewelTypeDescription != null) ? data[i].jewelTypeDescription : "",
									'Purity ' : (data[i].skinPurity != null && data[i].materialType.id != 'L' &&  data[i].materialType.id != 'A') ? data[i].skinPurity : "",
									'Pcs / Pairs' : (data[i].pieces != null) ? data[i].pieces : "",
											
									'Gross Wt ' : (data[i].grossWeight != null) ? data[i].grossWeight : "",
									'Net Wt' : (data[i].netWeight != null) ? data[i].netWeight : "",
									'FG Diamond Wt.' : (data[i].fgDiamondWeight != null) ? data[i].fgDiamondWeight : "",
									'Stone Main Cat' : (data[i].stoneMainCategory != null) ? data[i].stoneMainCategory : "",
									'Stone/Acc Sub Category Description ' : (data[i].stoneAccDescription != null) ? data[i].stoneAccDescription : "",
									'Stone / Acc Pcs' : (data[i].stoneAccPieces != null) ? data[i].stoneAccPieces : "",
									'Stone / Acc Wt.' : (data[i].stoneAccWt != null) ? data[i].stoneAccWt : "",
									'UQC' :(data[i].uom != null) ? data[i].uom : "",
									'Item Value in Rs.' : (data[i].itemValueInRs != null) ? data[i].itemValueInRs : "",
									'Remarks ' : (data[i].reasonForTransit != null) ? data[i].reasonForTransit : "",
		                            'To Store /Dc ' : (data[i].toStoreOrDCName != null) ? data[i].toStoreOrDCName : "",
		                            'To Zone ' : (data[i].toZone != null) ? data[i].toZone.description : "",
		                            'Move to Metal /Stone Loc' : (data[i].metalLocation == null ) ? ((data[i].moveToLocation != null) ? data[i].moveToLocation : "") : data[i].metalLocation,
									'Transfer Done By ' : (data[i].createdBy != null) ? data[i].createdBy : "",
									'Received By' : (data[i].receivedBy != null) ? data[i].receivedBy : ""
				   });
				}
				  var opts = [{sheetid:'Delivery_Challan',header:true}];
                  var res = alasql('SELECT * INTO XLSX("Delivery_Challan_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

$('#handOverSlip').validate(
		{
			errorElement : 'label',
			errorClass : 'help-inline',
			focusInvalid : false,
			ignore : "",
			rules : {
				"fromDateC" : {
					required : true
				},
				"toDateC" : {
					required : true
				},
				"refTypeNoC" : {
					number : true
				}
			},
			messages : {
				"refTypeNoC" : {
					number : "Only Interger Numbers are Allowed!"
				},
			},
			errorPlacement : function(error, element) {
				if (element.context.name == "fromDateC"
						|| element.context.name == "toDateC") {
					error.insertAfter(element.parent());
				} else {
					error.insertAfter(element);
				}
			},

			submitHandler : function(form) {
				searchHoSlipGrid();
				$('#jqxgrid').show();
				return false;
			}
		});
$('#refTypeSlNoC').hide();
$('#refIdNo').hide();
$('#refTypeNoC')
		.on(
				"change",
				function() {
					$('#refTypeSlNoC').show();
					$('#refIdNo').show();
					var id = $('#refTypeNoC').val();
					if (id != "") {
						$
								.getJSON(
										'/OrderExecution/api/v1/handoverSlipRefDocSlNos?refNo='
												+ id,
										function(data) {
											var reftypeNos = data.payload.refDocSlNos;
											console.log(reftypeNos);
											var v = '<select id="refTypeNoObj" name="refTypeNoObj" class="form-control" multiple="multiple">';
											$.each(reftypeNos, function(key,
													val) {
												v += '<option value="' + val.id
														+ '">' + val.id
														+ '</option>';
											});
											v += '</select>';
											$("#refTypeSlNoC").html(v);
											$('#refTypeNoObj')
													.multiselect(
															{
																includeSelectAllOption : true,
																enableFiltering : false,
																maxHeight : 250,
																numberDisplayed : 1,
																buttonClass : 'col-md-12 form-control text-left'
															});
										});
					}
				})
$("#ClearAll").on("click", function() {
	$('#refTypeSlNoC').hide();
	$('#refIdNo').hide();
	$('#tozoneNm').hide();
	$('#tozoneObj').hide();
	$('#tolocObj').hide();
	$('#tolocName').hide();
	$('#storeLov').hide();
	$('#storeDcNmeC').hide();
	$('#refTypeNoObj').multiselect("clearSelection");
	$('#segmentObj').multiselect("clearSelection");
	$('#locObj').multiselect("clearSelection");
	$('#metalObj').multiselect("clearSelection");
	var validator = $("form").validate();
	validator.resetForm();
	$('#jqxgrid').jqxGrid('clear');
	onLoadHandOverSlip();
	$('#jqxgrid').hide();
});
//Print Functionality to be done by Venkat
//#######################################
$("#printHS").on('click', function() {
	var fromDateC = $("#fromDateC").val();
	var toDateC = $("#toDateC").val();
	var fromDC = $("#fromDCId").val();
	var storeDcC = $("#storeDcC").val();		
	var refDocType = $("#refTypeC").val();		
	var statusS = $("#statusS").val();
	var fromDcStoreNmeC = $("#fromDcStoreNmeC").val();	
	var refTypeNoC = $("#refTypeNoC").val(); 
	var fromDC = $("#fromDCId").val();
	
	var storeDcNmeCObj = $('#storeObj').val();
	if (storeDcNmeCObj == null || storeDcNmeCObj == "") {
		var storeDcNmeC = "";
	} else {
		var storeDcNmeC = storeDcNmeCObj.join(",");
	}
	
	var zoneNameCObj = $('#zoneTypeObj').val();
	if (zoneNameCObj == null || zoneNameCObj == "") {
		var zoneNameC = "";
	} else {
		var zoneNameC = zoneNameCObj.join(",");
	}
	
	var segmentCObj = $('#segmentObj').val();
	if (segmentCObj == null || segmentCObj == "") {
		var segmentC = "";
	} else {
		var segmentC = segmentCObj.join(",");
	}
	
	var matTypeCObj = $('#metalObj').val();
	if (matTypeCObj == null || matTypeCObj == "") {
		var matTypeC = "";
	} else {
		var matTypeC = matTypeCObj.join(",");
	}
	
	var refDocSlNoObj = $('#refTypeNoObj').val();
	if (refDocSlNoObj == null || refDocSlNoObj == "") {
		var refDocSlNo = "";
	} else {
		var refDocSlNo = refDocSlNoObj.join(",");
	}	
	
	var locObj = $('#locObj').val();
	if (locObj == null || locObj == ""){
		var locTypeC = "";
	}else{
		var locTypeC = locObj.join(",");
	}
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : fromDateC,
			"ToDate" : toDateC,
			"ToStoreOrDc" :storeDcNmeC ,
			"ToStoreOrDcName" :storeDcC,
			"locationCode" : locTypeC,
			"ToZoneId" :zoneNameC ,
			"SegmentId" :segmentC,
			"MaterialType" : matTypeC,
			"RefDocType" :refDocType ,
			"RefDocNo" :refTypeNoC,
			"RefDocSrlNo" :refDocSlNo ,
			"Status" : statusS,
			"FromStoreOrDCType":'DC',
			"FromStoreOrDC":fromDC,
			"mode" : "pdf",
			"reportName" : "RPT_Handover_Slip"
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
				navigator.msSaveBlob(file, 'RPT_Handover_Slip.pdf');
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