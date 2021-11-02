//date picker functions
$("#fromDateA").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateA").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateA").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

var onloadFunctionAcc = function(){
	var statusAcc = '<select id="statusAObj" class="form-control" multiple="multiple"></select>';
	$("#statusA").html(statusAcc);
	$('#statusAObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var storeA = '<select id="storeDcNameAObj" class="form-control" multiple="multiple"></select>';
	$("#storeDcNameA").html(storeA);
	$('#storeDcNameAObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var zoneAcc = '<select id="zoneAObj" class="form-control" multiple="multiple"></select>';
	$("#zoneA").html(zoneAcc);
	$('#zoneAObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var vendorAcc = '<select id="vendorAObj" class="form-control" multiple="multiple"></select>';
	$("#vendorA").html(vendorAcc);
	$('#vendorAObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var grvNoAcc = '<select id="grvNoAObj" class="form-control" multiple="multiple"></select>';
	$("#grvNoA").html(grvNoAcc);
	$('#grvNoAObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var accSegmA = '<select id="accSegAObj" class="form-control" multiple="multiple"></select>';
	$("#accSegA").html(accSegmA);
	$('#accSegAObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var mainCatAcc = '<select id="mainCatAObj" class="form-control" multiple="multiple"></select>';
	$("#mainCatA").html(mainCatAcc);
	$('#mainCatAObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var subCatAcc = '<select id="subCatAObj" class="form-control" multiple="multiple"></select>';
	$("#subCatA").html(subCatAcc);
	$('#subCatAObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	$.getJSON('/OrderExecution/api/v1/looseAccConsignmentStatusReportLOV', function(data) {
		$("#storeOrDcA").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.storeOrDcTypes, function(key, val) {
			$("#storeOrDcA").append('<option value="' + val + '">' + val + '</option>');
		});	
		
		var statusA = '<select id="statusAObj"  name="statusAObj" class="form-control" multiple="multiple">';
		$.each(data.payload.status, function(key, val) {
			statusA += '<option value="' + val + '">' + val + '</option>'; 
		});
			
		statusA += '</select>';
			
		$("#statusA").html(statusA);
			
		$("#statusAObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var accSeg = '<select id="accSegAObj"  name="accSegAObj" class="form-control" multiple="multiple">';
		$.each(data.payload.accSegments, function(key, val) {
			accSeg += '<option value="' + val.id + '">' + val.name + '</option>'; 
		});
			
		accSeg += '</select>';
			
		$("#accSegA").html(accSeg);
			
		$("#accSegAObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var catA = '<select id="mainCatAObj"  name="mainCatAObj" class="form-control" multiple="multiple">';
		$.each(data.payload.accCat, function(key, val) {
			catA += '<option value="' + val.id + '">' + val.name + '</option>'; 
		});
			
		catA += '</select>';
			
		$("#mainCatA").html(catA);
			
		$("#mainCatAObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var subcatA = '<select id="subCatAObj"  name="subCatAObj" class="form-control" multiple="multiple">';
		$.each(data.payload.accSubCat, function(key, val) {
			subcatA += '<option value="' + val.id + '">' + val.name + '</option>'; 
		});
			
		subcatA += '</select>';
			
		$("#subCatA").html(subcatA);
			
		$("#subCatAObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
	});
}

onloadFunctionAcc();

//Load Store/DC names
$("#storeOrDcA").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/looseAccConsignmentStatusReportLOV?storeOrDc='+$("#storeOrDcA").val(), function(data) {
		if(data.resCode == "1"){
			var storeDcName = '<select id="storeDcNameAObj"  name="storeDcNameAObj" class="form-control" multiple="multiple">';
			$.each(data.payload.storeOrDcNames, function(key, val) {
				storeDcName += '<option value="' + val.id + '">' + val.name + '</option>'; 
			});
				
			storeDcName += '</select>';
				
			$("#storeDcNameA").html(storeDcName);
				
			$("#storeDcNameAObj").multiselect({
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
$("#storeDcNameA").on('change',function(){
	var storeDcObj = $("#storeDcNameAObj").val();
	if(storeDcObj != null){
	storeDcObj = storeDcObj.join(',');
	$.getJSON('/OrderExecution/api/v1/looseAccConsignmentStatusReportLOV?storeOrDc='+$("#storeOrDcA").val()+'&storeOrDcId='+storeDcObj, function(data) {
		if(data.resCode == "1"){
			var zoneA = '<select id="zoneAObj"  name="zoneAObj" class="form-control" multiple="multiple">';
			$.each(data.payload.zoneCodes, function(key, val) {
				zoneA += '<option value="' + val.id + '">' + val.description + '</option>'; 
			});
				
			zoneA += '</select>';
				
			$("#zoneA").html(zoneA);
				
			$("#zoneAObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
	});	
	}
});

var accStatusFlag = 0;
$("#statusA").on('change',function(){
	var statusAObj = $("#statusAObj").val();
	if(statusAObj != null){
		if(statusAObj.includes("Available")){
			$("#fromDateA").attr('disabled',true);
			$("#toDateA").attr('disabled',true);
			accStatusFlag = 1;
			$("#fromDateA").val("");
			$("#toDateA").val("")
		}else{
			$("#fromDateA").attr('disabled',false);
			$("#toDateA").attr('disabled',false);
			accStatusFlag = 0;
		}
		statusAObj = statusAObj.join(',');
		$.getJSON('/OrderExecution/api/v1/looseAccConsignmentStatusReportLOV?status='+statusAObj, function(data) {
			if(data.resCode == "1"){
				var vCodeA = '<select id="vendorAObj"  name="vendorAObj" class="form-control" multiple="multiple">';
				$.each(data.payload.vendorCodes, function(key, val) {
					vCodeA += '<option value="' + val.id + '">' + val.name + '</option>'; 
				});
					
				vCodeA += '</select>';
				$("#vendorA").html(vCodeA);
					
				$("#vendorAObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});

				
				var grvNumA = '<select id="grvNoAObj"  name="grvNoAObj" class="form-control" multiple="multiple">';
				$.each(data.payload.grvNos, function(key, val) {
					grvNumA += '<option value="' + val + '">' + val + '</option>'; 
				});
					
				grvNumA += '</select>';
					
				$("#grvNoA").html(grvNumA);
					
				$("#grvNoAObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
	}else{
		$("#fromDateA").attr('disabled',false);
		$("#toDateA").attr('disabled',false);
	}
	
});




var consignmentAccFieldFilters = function(){
	var fromDateA = $("#fromDateA").val();
	var toDateA = $("#toDateA").val();
	var storeOrDcA = $("#storeOrDcA").val();
	var subCatA = $("#subCatA").val();
	
	var statusAObj = $('#statusAObj').val();
	if (statusAObj == null || statusAObj == ""){
		var statusA= "";
	}else{
		var statusA = statusAObj.join(",");
	}
	
	var storeDcNameAObj = $('#storeDcNameAObj').val();
	if (storeDcNameAObj == null || storeDcNameAObj == ""){
		var storeDcNameA= "";
	}else{
		var storeDcNameA = storeDcNameAObj.join(",");
	}
	
	var zoneAObj = $('#zoneAObj').val();
	if (zoneAObj == null || zoneAObj == ""){
		var zoneA= "";
	}else{
		var zoneA = zoneAObj.join(",");
	}
	
	var vendorAObj = $('#vendorAObj').val();
	if (vendorAObj == null || vendorAObj == ""){
		var vendorA= "";
	}else{
		var vendorA = vendorAObj.join(",");
	}
	
	var grvNoAObj = $('#grvNoAObj').val();
	if (grvNoAObj == null || grvNoAObj == ""){
		var grvNoA = "";
	}else{
		var grvNoA = grvNoAObj.join(",");
	}
	
	var accSegAObj = $('#accSegAObj').val();
	if (accSegAObj == null || accSegAObj == ""){
		var accSegm = "";
	}else{
		var accSegm = accSegAObj.join(",");
	}
	
	var mainCatAObj = $('#mainCatAObj').val();
	if (mainCatAObj == null || mainCatAObj == ""){
		var mainCatA = "";
	}else{
		var mainCatA = mainCatAObj.join(",");
	}
	
	var subCatAObj = $('#subCatAObj').val();
	if (subCatAObj == null || subCatAObj == ""){
		var subCatA = "";
	}else{
		var subCatA = subCatAObj.join(",");
	}
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateA != "" && fromDateA != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateA;
	}
	if (toDateA != "" && toDateA != null) {
		fieldFilters.fieldFilters["toDate"] = toDateA;
	}
	if (statusA != "" && statusA != null) {
		fieldFilters.fieldFilters["status"] = statusA;
	}
	if (storeOrDcA != "" && storeOrDcA != null) {
		fieldFilters.fieldFilters["storeOrDcType"] = storeOrDcA;
	}
	if (zoneA != "" && zoneA != null) {
		fieldFilters.fieldFilters["zone"] = zoneA;
	}
	if (storeDcNameA != "" && storeDcNameA != null) {
		fieldFilters.fieldFilters["storeOrDc"] = storeDcNameA;
	}
	if (vendorA != "" && vendorA != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorA;
	}
	if (grvNoA != "" && grvNoA != null) {
		fieldFilters.fieldFilters["grNo"] = grvNoA;
	}
	if (accSegm != "" && accSegm != null) {
		fieldFilters.fieldFilters["segment"] = accSegm;
	}
	if (mainCatA != "" && mainCatA != null) {
		fieldFilters.fieldFilters["category"] = mainCatA;
	}
	if (subCatA != "" && subCatA != null) {
		fieldFilters.fieldFilters["subCategory"] = subCatA;
	}
	fieldFilters.fieldFilters["mode"] = "search";
	
	return fieldFilters;
}

function consignmentAccGrid() {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	var datafields = [ 
		{'name' : 'storeOrDcType','type' : 'string','map':'storeOrdcType'},
		{'name' : 'storeOrDCName','type' : 'string','map':'storeOrdcName'},
		{'name' : 'zone','type' : 'string','map' : 'zone'}, 
		{'name' : 'jwCode','type' : 'string','map' : 'vendorCode'},
		{'name' : 'accSegm','type' : 'string','map' : 'articalSegment'},
		{'name' : 'mainCat','type' : 'string','map':'mainCat'}, 
		{'name' : 'subCat','type' : 'string','map':'subCat'},
		{'name' : 'articleCode','type' : 'string','map' : 'articalCode'},
		{'name' : 'stockNo','type' : 'long','map':'stockNo'},
		{'name' : 'pcs','type' : 'long','map':'pcs'},
		{'name' : 'accWt','type' : 'float','map':'accWeight'},
		{'name' : 'uqc','type' : 'string','map':'uqc'},
		{'name' : 'costPrice','type' : 'float','map':'lineItemCost'},
		{'name' : 'costRate','type' : 'float','map':''},
		{'name' : 'grvNo','type' : 'int','map':'grvNo'},
		{'name' : 'grvSlNo','type' : 'int','map':'grvSrlNo'},
		{'name' : 'vendInvoiceRef','type' : 'int','map':'vendorInvoiceRef'},
		{'name' : 'vendInvoiceDate','type' : 'date','map':'vendorInvoiceDate'},
		{'name' : 'status','type' : 'string','map' :'status'},
		{'name' : 'toRefDocNo','type' : 'int','map':'toRefDocNo'},
		{'name' : 'toRefDocSlNo','type' : 'int','map':'toRefDocSrlNo'},
		{'name' : 'statusDate','type' : 'date','map':'statusDate'},
		{'name' : 'noOfDays','type' : 'long','map' :'noOfDays'},
		];
	var columns = [ 
		{'text' : 'Store/DC','datafield' : 'storeOrDcType','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Store/DC Name','datafield' : 'storeOrDCName','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Zone','datafield' : 'zone','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'J/W Code','datafield' : 'jwCode','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Acc Segment.','datafield' : 'accSegm','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Main Category','datafield' : 'mainCat','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Sub Cat','datafield' : 'subCat','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Article Code','datafield' : 'articleCode','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Stock No','datafield' : 'stockNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'PCS','datafield' : 'pcs','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Acc Wt.','datafield' : 'accWt','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'd3',editable : false,sortable : false},
		{'text' : 'UQC','datafield' : 'uqc','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,
			cellsrenderer: function(row, column, value){
	      		return '<div style="text-align:center; margin: 0; padding-top:20px; height:40px;">Pcs</div>';
	      	}  
		},
		{'text' : 'Cost Rate','datafield' : 'costRate','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'd2',editable : false,sortable : false,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	 			var costPrice =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'costPrice');
	 			var accPcs =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'pcs');
	 			var rate = 0.00;
	 			rate = costPrice/accPcs;
    			return '<div style="text-align:center; margin: 0; padding-top:20px; height:40px;">' + rate.toFixed(2) + '</div>';
	 		}
		},
		{'text' : 'Cost Price','datafield' : 'costPrice','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'd2',editable : false,sortable : false},
		{'text' : 'GR No','datafield' : 'grvNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'GR Sl No.','datafield' : 'grvSlNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Vendor Invoice Ref.','datafield' : 'vendInvoiceRef','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Vendor Invoice Dt.','datafield' : 'vendInvoiceDate','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy',editable : false,sortable : false},
		{'text' : 'Status','datafield' : 'status','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy',editable : false,sortable : false},
		{'text' : 'To Ref Doc No','datafield' : 'toRefDocNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'To Ref Doc Sl No','datafield' : 'toRefDocSlNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Status Dt.','datafield' : 'statusDate','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy',editable : false,sortable : false},
		{'text' : 'No of Days.','datafield' : 'noOfDays','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		];
	showMyGrid(datafields, "/OrderExecution/api/v1/looseAccConsignmentStatusBaseReportSearch", "list",columns, consignmentAccFieldFilters(), updateRows);
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
