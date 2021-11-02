//date picker functions
$("#fromDateLS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateLS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateLS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

var onLoadFunctionLS = function(){
	var status = '<select id="statusLSObj" class="form-control" multiple="multiple"></select>';
	$("#statusLS").html(status);
	$('#statusLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var storeLS = '<select id="storeDcNameLSObj" class="form-control" multiple="multiple"></select>';
	$("#storeDcNameLS").html(storeLS);
	$('#storeDcNameLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var zoneS = '<select id="zoneLSObj" class="form-control" multiple="multiple"></select>';
	$("#zoneLS").html(zoneS);
	$('#zoneLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var vendorS = '<select id="vendorLSObj" class="form-control" multiple="multiple"></select>';
	$("#vendorLS").html(vendorS);
	$('#vendorLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var grvNoS = '<select id="grvNoLSObj" class="form-control" multiple="multiple"></select>';
	$("#grvNoLS").html(grvNoS);
	$('#grvNoLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var stoneSegmS = '<select id="stoneSegLSObj" class="form-control" multiple="multiple"></select>';
	$("#stoneSegLS").html(stoneSegmS);
	$('#stoneSegLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var mainCatS = '<select id="mainCatLSObj" class="form-control" multiple="multiple"></select>';
	$("#mainCatLS").html(mainCatS);
	$('#mainCatLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var wtRangeS = '<select id="fromToWtRangeLSObj" class="form-control" multiple="multiple"></select>';
	$("#fromToWtRangeLS").html(wtRangeS);
	$('#fromToWtRangeLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var clarityS = '<select id="clarityLSObj" class="form-control" multiple="multiple"></select>';
	$("#clarityLS").html(clarityS);
	$('#clarityLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var colorS = '<select id="colorLSObj" class="form-control" multiple="multiple"></select>';
	$("#colorLS").html(colorS);
	$('#colorLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var actualColorS = '<select id="actualColorLSObj" class="form-control" multiple="multiple"></select>';
	$("#actualColorLS").html(actualColorS);
	$('#actualColorLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var cutgradeS = '<select id="cutgradeLSObj" class="form-control" multiple="multiple"></select>';
	$("#cutgradeLS").html(cutgradeS);
	$('#cutgradeLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var stockOrPacketIdS = '<select id="stockOrPacketIdLSObj" class="form-control" multiple="multiple"></select>';
	$("#stockOrPacketIdLS").html(stockOrPacketIdS);
	$('#stockOrPacketIdLSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	// On Load API
	$.getJSON('/OrderExecution/api/v1/looseStoneConsignmentStatusReportLOV', function(data) {
		$("#storeOrDcLS").empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.storeOrDcTypes, function(key, val) {
		$("#storeOrDcLS").append('<option value="' + val + '">' + val + '</option>');
	});	
		
		var statusLs = '<select id="statusLSObj"  name="statusLSObj" class="form-control" multiple="multiple">';
		$.each(data.payload.status, function(key, val) {
			statusLs += '<option value="' + val + '">' + val + '</option>'; 
		});
			
		statusLs += '</select>';
			
		$("#statusLS").html(statusLs);
			
		$("#statusLSObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var stoneSeg = '<select id="stoneSegLSObj"  name="stoneSegLSObj" class="form-control" multiple="multiple">';
		$.each(data.payload.stoneSegments, function(key, val) {
			stoneSeg += '<option value="' + val.id + '">' + val.description + '</option>'; 
		});
			
		stoneSeg += '</select>';
			
		$("#stoneSegLS").html(stoneSeg);
			
		$("#stoneSegLSObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var catLs = '<select id="mainCatLSObj"  name="mainCatLSObj" class="form-control" multiple="multiple">';
		$.each(data.payload.stoneCategory, function(key, val) {
			catLs += '<option value="' + val.id + '">' + val.description + '</option>'; 
		});
			
		catLs += '</select>';
			
		$("#mainCatLS").html(catLs);
			
		$("#mainCatLSObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var clarityLs = '<select id="clarityLSObj"  name="clarityLSObj" class="form-control" multiple="multiple">';
		$.each(data.payload.clarityList, function(key, val) {
			clarityLs += '<option value="' + val + '">' + val + '</option>'; 
		});
			
		clarityLs += '</select>';
			
		$("#clarityLS").html(clarityLs);
			
		$("#clarityLSObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var colLs = '<select id="colorLSObj"  name="colorLSObj" class="form-control" multiple="multiple">';
		$.each(data.payload.colorList, function(key, val) {
			colLs += '<option value="' + val + '">' + val + '</option>'; 
		});
			
		colLs += '</select>';
			
		$("#colorLS").html(colLs);
			
		$("#colorLSObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var actColLs = '<select id="actualColorLSObj"  name="actualColorLSObj" class="form-control" multiple="multiple">';
		$.each(data.payload.actualColorList, function(key, val) {
			actColLs += '<option value="' + val + '">' + val + '</option>'; 
		});
			
		actColLs += '</select>';
			
		$("#actualColorLS").html(actColLs);
			
		$("#actualColorLSObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var cutGradeLs = '<select id="cutgradeLSObj"  name="cutgradeLSObj" class="form-control" multiple="multiple">';
		$.each(data.payload.cutGradeList, function(key, val) {
			cutGradeLs += '<option value="' + val + '">' + val + '</option>'; 
		});
			
		cutGradeLs += '</select>';
			
		$("#cutgradeLS").html(cutGradeLs);
			
		$("#cutgradeLSObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var stkPktLs = '<select id="stockOrPacketIdLSObj"  name="stockOrPacketIdLSObj" class="form-control" multiple="multiple">';
		$.each(data.payload.packetStockType, function(key, val) {
			stkPktLs += '<option value="' + val + '">' + val + '</option>'; 
		});
			
		stkPktLs += '</select>';
			
		$("#stockOrPacketIdLS").html(stkPktLs);
		$("#stockOrPacketIdLSObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	
	});
}

onLoadFunctionLS();


//Load Store/DC names
$("#storeOrDcLS").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/looseStoneConsignmentStatusReportLOV?storeOrDc='+$("#storeOrDcLS").val(), function(data) {
		if(data.resCode == "1"){
			var storeDcName = '<select id="storeDcNameLSObj"  name="storeDcNameLSObj" class="form-control" multiple="multiple">';
			$.each(data.payload.storeOrDcNames, function(key, val) {
				storeDcName += '<option value="' + val.id + '">' + val.name + '</option>'; 
			});
				
			storeDcName += '</select>';
				
			$("#storeDcNameLS").html(storeDcName);
				
			$("#storeDcNameLSObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
		
	});
});

//Load zones
//on change of stoe/dc Name load zone
$("#storeDcNameLS").on('change',function(){
	var storeDcObj = $("#storeDcNameLSObj").val();
	if(storeDcObj != null){
	storeDcObj = storeDcObj.join(',');
	$.getJSON('/OrderExecution/api/v1/looseStoneConsignmentStatusReportLOV?storeOrDc='+$("#storeOrDcLS").val()+'&storeOrDcId='+storeDcObj, function(data) {
		if(data.resCode == "1"){
			var zoneLs = '<select id="zoneLSObj"  name="zoneLSObj" class="form-control" multiple="multiple">';
			$.each(data.payload.zoneCodes, function(key, val) {
				zoneLs += '<option value="' + val.id + '">' + val.description + '</option>'; 
			});
				
			zoneLs += '</select>';
				
			$("#zoneLS").html(zoneLs);
				
			$("#zoneLSObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
	});	
	}
});

//LOAD VENDOR CODES & GRV NO'S
var statusExistFlag = 0;
$("#statusLS").on('change',function(){
	var statusLSObj = $("#statusLSObj").val();
	if(statusLSObj != null){
		if(statusLSObj.includes("Available")){
			$("#fromDateLS").attr('disabled',true);
			$("#toDateLS").attr('disabled',true);
			statusExistFlag = 1;
			$("#fromDateLS").val("");
			$("#toDateLS").val("")
		}else{
			$("#fromDateLS").attr('disabled',false);
			$("#toDateLS").attr('disabled',false);
			statusExistFlag = 0;
		}
		statusLSObj = statusLSObj.join(',');
		$.getJSON('/OrderExecution/api/v1/looseStoneConsignmentStatusReportLOV?status='+statusLSObj, function(data) {
			if(data.resCode == "1"){
				var vCodeLS = '<select id="vendorLSObj"  name="vendorLSObj" class="form-control" multiple="multiple">';
				$.each(data.payload.vendorCodes, function(key, val) {
					vCodeLS += '<option value="' + val.vendorCode + '">' + val.vendorCode + '</option>'; 
				});
					
				vCodeLS += '</select>';
				$("#vendorLS").html(vCodeLS);
					
				$("#vendorLSObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});

				
				var grvNumLs = '<select id="grvNoLSObj"  name="grvNoLSObj" class="form-control" multiple="multiple">';
				$.each(data.payload.grvNos, function(key, val) {
					grvNumLs += '<option value="' + val + '">' + val + '</option>'; 
				});
					
				grvNumLs += '</select>';
					
				$("#grvNoLS").html(grvNumLs);
					
				$("#grvNoLSObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
	}else{
		$("#fromDateLS").attr('disabled',false);
		$("#toDateLS").attr('disabled',false);
	}
	
});


var consignmentLSFieldFilters = function(){
	var fromDateLS = $("#fromDateLS").val();
	var toDateLS = $("#toDateLS").val();
	var storeOrDcLS = $("#storeOrDcLS").val();
	
	var statusLSObj = $('#statusLSObj').val();
	if (statusLSObj == null || statusLSObj == ""){
		var statusLSObjS= "";
	}else{
		var statusLSObjS = statusLSObj.join(",");
	}
	
	var storeDcNameLSObj = $('#storeDcNameLSObj').val();
	if (storeDcNameLSObj == null || storeDcNameLSObj == ""){
		var storeDcNameS= "";
	}else{
		var storeDcNameS = storeDcNameLSObj.join(",");
	}
	
	var zoneLSObj = $('#zoneLSObj').val();
	if (zoneLSObj == null || zoneLSObj == ""){
		var zoneS= "";
	}else{
		var zoneS = zoneLSObj.join(",");
	}
	
	var vendorLSObj = $('#vendorLSObj').val();
	if (vendorLSObj == null || vendorLSObj == ""){
		var vendorS= "";
	}else{
		var vendorS = vendorLSObj.join(",");
	}
	
	var grvNoLSObj = $('#grvNoLSObj').val();
	if (grvNoLSObj == null || grvNoLSObj == ""){
		var grvNoS = "";
	}else{
		var grvNoS = grvNoLSObj.join(",");
	}
	
	var stoneSegLSObj = $('#stoneSegLSObj').val();
	if (stoneSegLSObj == null || stoneSegLSObj == ""){
		var stoneSeg = "";
	}else{
		var stoneSeg = stoneSegLSObj.join(",");
	}
	
	var mainCatLSObj = $('#mainCatLSObj').val();
	if (mainCatLSObj == null || mainCatLSObj == ""){
		var mainCatS = "";
	}else{
		var mainCatS = mainCatLSObj.join(",");
	}
	
	var fromToWtRangeLSObj = $('#fromToWtRangeLSObj').val();
	if (fromToWtRangeLSObj == null || fromToWtRangeLSObj == ""){
		var wtRange = "";
	}else{
		var wtRange = fromToWtRangeLSObj.join(",");
	}
	
	var clarityLSObj = $('#clarityLSObj').val();
	if (clarityLSObj == null || clarityLSObj == ""){
		var clarityLS = "";
	}else{
		var clarityLS = clarityLSObj.join(",");
	}
	
	var colorLSObj = $('#colorLSObj').val();
	if (colorLSObj == null || colorLSObj == ""){
		var colorLS = "";
	}else{
		var colorLS = colorLSObj.join(",");
	}
	
	var actualColorLSObj = $('#actualColorLSObj').val();
	if (actualColorLSObj == null || actualColorLSObj == ""){
		var actualColorLS = "";
	}else{
		var actualColorLS = actualColorLSObj.join(",");
	}
	
	var cutgradeLSObj = $('#cutgradeLSObj').val();
	if (cutgradeLSObj == null || cutgradeLSObj == ""){
		var cutgradeLS = "";
	}else{
		var cutgradeLS = cutgradeLSObj.join(",");
	}
	
	var stockOrPacketIdLSObj = $('#stockOrPacketIdLSObj').val();
	if (stockOrPacketIdLSObj == null || stockOrPacketIdLSObj == ""){
		var stockOrPacketIdLS = "";
	}else{
		var stockOrPacketIdLS = stockOrPacketIdLSObj.join(",");
	}
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateLS != "" && fromDateLS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateLS;
	}
	if (toDateLS != "" && toDateLS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateLS;
	}
	if (statusLSObjS != "" && statusLSObjS != null) {
		fieldFilters.fieldFilters["status"] = statusLSObjS;
	}
	if (storeOrDcLS != "" && storeOrDcLS != null) {
		fieldFilters.fieldFilters["storeOrDcType"] = storeOrDcLS;
	}
	if (zoneS != "" && zoneS != null) {
		fieldFilters.fieldFilters["zone"] = zoneS;
	}
	if (storeDcNameS != "" && storeDcNameS != null) {
		fieldFilters.fieldFilters["storeOrDc"] = storeDcNameS;
	}
	if (vendorS != "" && vendorS != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorS;
	}
	if (grvNoS != "" && grvNoS != null) {
		fieldFilters.fieldFilters["grNo"] = grvNoS;
	}
	if (stoneSeg != "" && stoneSeg != null) {
		fieldFilters.fieldFilters["segment"] = stoneSeg;
	}
	if (wtRange != "" && wtRange != null) {
		fieldFilters.fieldFilters[""] = wtRange;
	}
	if (mainCatS != "" && mainCatS != null) {
		fieldFilters.fieldFilters["category"] = mainCatS;
	}
	if (clarityLS != "" && clarityLS != null) {
		fieldFilters.fieldFilters["clarity"] = clarityLS;
	}
	if (colorLS != "" && colorLS != null) {
		fieldFilters.fieldFilters["color"] = colorLS;
	}
	if (actualColorLS != "" && actualColorLS != null) {
		fieldFilters.fieldFilters["actualColor"] = actualColorLS;
	}
	if (cutgradeLS != "" && cutgradeLS != null) {
		fieldFilters.fieldFilters["cutGrade"] = cutgradeLS;
	}
	if (stockOrPacketIdLS != "" && stockOrPacketIdLS != null) {
		fieldFilters.fieldFilters["packetOrIndividual"] = stockOrPacketIdLS;
	}
	fieldFilters.fieldFilters["mode"] = "search";
	return fieldFilters;
}


function consignmentLSGrid() {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	var datafields = [ 
		{'name' : 'storeOrDcType','type' : 'string','map':'storeOrdcType'},
		{'name' : 'storeOrDCName','type' : 'string','map':'storeOrdcName'},
		{'name' : 'zone','type' : 'string','map' : 'zone'}, 
		{'name' : 'vendorCode','type' : 'string','map' : 'vendorCode'},
		{'name' : 'segment','type' : 'string','map' : 'articalSegment'},
		{'name' : 'mainCat','type' : 'string','map':'mainCat'}, 
		{'name' : 'subCat','type' : 'string','map':'subCat'},
		{'name' : 'articleCode','type' : 'string','map' : 'articalCode'},
		{'name' : 'wtRange','type' : 'string','map':'weightRange'},
		{'name' : 'packetOrStock','type' : 'string','map' : 'packetOrIndividual'},
		{'name' : 'stockNo','type' : 'int','map':'packetOrIndividualId'},
		{'name' : 'pcs','type' : 'long','map':'pcs'},
		{'name' : 'stoneWt','type' : 'double','map':'stoneWeight'},
		{'name' : 'uqc','type' : 'string','map':'uqc'},
		{'name' : 'clarity','type' : 'string','map':'clarity'},
		{'name' : 'actCol','type' : 'string','map':'actualcolor'},
		{'name' : 'color','type' : 'int','map':'color'},
		{'name' : 'cut','type' : 'string','map' :'cutGrade'},
		{'name' : 'labCode','type' : 'string','map':'labCode'},
		{'name' : 'certNo','type' : 'string','map':'crtNo'},
		{'name' : 'costRate','type' : 'double','map':'stoneCostRate'},
		{'name' : 'costPrice','type' : 'double','map':'stoneCostPrice'},
		{'name' : 'grNo','type' : 'int','map':'grvNo'},
		{'name' : 'grvSlNo','type' : 'int','map' :'grvSrlNo'},
		{'name' : 'vendorInvRef','type' : 'int','map':'vendorInvoiceRef'},
		{'name' : 'vendorInvDt','type' : 'date','map':'vendorInvoiceDate'},
		{'name' : 'status','type' : 'string','map':'status'},
		{'name' : 'toRefDocNo','type' : 'int','map':'toRefDocNo'},
		{'name' : 'toRefDocSlNo','type' : 'int','map':'toRefDocSrlNo'},
		{'name' : 'statusDate','type' : 'date','map':'statusDate'},
		{'name' : 'noOfDays','type' : 'long','map' :'noOfDays'},
		];
	var columns = [ 
		{'text' : 'Store/DC','datafield' : 'storeOrDcType','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Store/DC Name','datafield' : 'storeOrDCName','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Zone','datafield' : 'zone','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Stone Segment.','datafield' : 'segment','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Main Category','datafield' : 'mainCat','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Sub Cat','datafield' : 'subCat','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Article Code','datafield' : 'articleCode','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Wt/Cost Range','datafield' : 'wtRange','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Packet/Stock','datafield' : 'packetOrStock','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Packet/Stock No','datafield' : 'stockNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Stone Wt.','datafield' : 'stoneWt','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'd3',editable : false,sortable : false},
		{'text' : 'UQC','datafield' : 'uqc','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Actual Col','datafield' : 'actCol','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Color','datafield' : 'color','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Cut Grade','datafield' : 'cut','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Lab Code','datafield' : 'labCode','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Cert No','datafield' : 'certNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Cost Rate','datafield' : 'costRate','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'd2',editable : false,sortable : false,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	 			var costPrice =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'costPrice');
	 			var uqc =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'uqc');
	 			var stoneWt =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneWt');
	 			var pcs =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'pcs');
	 			var rate = 0.00;
	 			
	 			if(uqc == "Pcs"){
	 				rate = costPrice/pcs; 
	 			}else{
	 				rate = costPrice/stoneWt; 
	 			}
    			return '<div style="text-align:center; margin-top:15px; height:40px;">' + rate.toFixed(2) + '</div>';
	 		}
		},
		{'text' : 'Cost Price','datafield' : 'costPrice','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'd2',editable : false,sortable : false},
		{'text' : 'GRV No','datafield' : 'grNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'GRV Sl No.','datafield' : 'grvSlNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Vendor Invoice Ref','datafield' : 'vendorInvRef','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Vendor InvoiceDate','datafield' : 'vendorInvDt','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy',editable : false,sortable : false},
		{'text' : 'Status','datafield' : 'status','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'To Ref Doc No','datafield' : 'toRefDocNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'To Ref Doc Sl No','datafield' : 'toRefDocSlNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Status Dt.','datafield' : 'statusDate','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy',editable : false,sortable : false},
		{'text' : 'No of Days','datafield' : 'noOfDays','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		];
	showMyGrid(datafields, "/OrderExecution/api/v1/looseStoneConsignmentStatusBaseReportSearch", "list",columns, consignmentLSFieldFilters(), updateRows);
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

