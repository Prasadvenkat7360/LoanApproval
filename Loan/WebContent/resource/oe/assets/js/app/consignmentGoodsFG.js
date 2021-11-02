

$("#consignmentFG").hide();
$("#consignmentLS").hide();
$("#consignmentAcc").hide();

$("#consignmentGoods").on('change',function(){
	$("#jqxgrid").hide();
	if($("#consignmentGoods").val() == "fg"){
		$("#consignmentFG").show();
		$("#consignmentLS").hide();
		$("#consignmentAcc").hide();
	}
	if($("#consignmentGoods").val() == "stone"){
		$("#consignmentFG").hide();
		$("#consignmentLS").show();
		$("#consignmentAcc").hide();
	}
	if($("#consignmentGoods").val() == "acc"){
		$("#consignmentFG").hide();
		$("#consignmentLS").hide();
		$("#consignmentAcc").show();
	}
});

//date picker functions
$("#fromDateFG").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateFG").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateFG").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});



var onloadFunctionLFG = function(){
	var storeFG = '<select id="storeDcNameFGObj" class="form-control" multiple="multiple"></select>';
	$("#storeDcNameFG").html(storeFG);
	$('#storeDcNameFGObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var vendorFG = '<select id="vendorFGObj" class="form-control" multiple="multiple"></select>';
	$("#vendorFG").html(vendorFG);
	$('#vendorFGObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var grvNumFG = '<select id="grvNoFGObj" class="form-control" multiple="multiple"></select>';
	$("#grvNoFG").html(grvNumFG);
	$('#grvNoFGObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var artSegmtFG = '<select id="artSegFGObj" class="form-control" multiple="multiple"></select>';
	$("#artSegFG").html(artSegmtFG);
	$('#artSegFGObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var zoneFG = '<select id="zoneFGObj" class="form-control" multiple="multiple"></select>';
	$("#zoneFg").html(zoneFG);
	$('#zoneFGObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var jCodeFG = '<select id="jCodeFGObj" class="form-control" multiple="multiple"></select>';
	$("#jewelCodeFG").html(jCodeFG);
	$('#jCodeFGObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var mainCatFG = '<select id="mainCatFGObj" class="form-control" multiple="multiple"></select>';
	$("#mainCatFG").html(mainCatFG);
	$('#mainCatFGObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var sCatFG = '<select id="sCatFGObj" class="form-control" multiple="multiple"></select>';
	$("#subCatFG").html(sCatFG);
	$('#sCatFGObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var aCodeFG = '<select id="artCodeFGObj" class="form-control" multiple="multiple"></select>';
	$("#artCodeFG").html(aCodeFG);
	$('#artCodeFGObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var fWtRangeFG = '<select id="fWtRangeFGObj" class="form-control" multiple="multiple"></select>';
	$("#fWtRangeFG").html(fWtRangeFG);
	$('#fWtRangeFGObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var tWtRangeFG = '<select id="tWtRangeFGObj" class="form-control" multiple="multiple"></select>';
	$("#tWtRangeFG").html(tWtRangeFG);
	$('#tWtRangeFGObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var statusF = '<select id="statusFGObj" class="form-control" multiple="multiple"></select>';
	$("#statusFG").html(statusF);
	$('#statusFGObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	
// On Load API
$.getJSON('/OrderExecution/api/v1/consignmentStatusBaseReportLOV', function(data) {
		if(data.resCode == "1"){
			var statusFg = '<select id="statusFGObj"  name="statusFGObj" class="form-control" multiple="multiple">';
			$.each(data.payload.status, function(key, val) {
				statusFg += '<option value="' + val + '">' + val + '</option>'; 
			});
				
			statusFg += '</select>';
				
			$("#statusFG").html(statusFg);
				
			$("#statusFGObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
		$("#storeOrDcFG").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.storeOrDcTypes, function(key, val) {
			$("#storeOrDcFG").append('<option value="' + val + '">' + val + '</option>');
		});	
		
		// Art Segment Lov
		var artSegmFG = '<select id="artSegFGObj"  name="artSegFGObj" class="form-control" multiple="multiple">';
		$.each(data.payload.articalSegments, function(key, val) {
			artSegmFG += '<option value="' + val.id + '">' + val.description + '</option>'; 
		});
			
		artSegmFG += '</select>';
			
		$("#artSegFG").html(artSegmFG);
			
		$("#artSegFGObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});

		var jwlCodeFg = '<select id="jCodeFGObj"  name="jCodeFGObj" class="form-control" multiple="multiple">';
		$.each(data.payload.jewelCodes, function(key, val) {
			jwlCodeFg += '<option value="' + val.code + '">' + val.code + '</option>'; 
		});
			
		jwlCodeFg += '</select>';
			
		$("#jewelCodeFG").html(jwlCodeFg);
			
		$("#jCodeFGObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	
		var mCatFg = '<select id="mainCatFGObj"  name="mainCatFGObj" class="form-control" multiple="multiple">';
		$.each(data.payload.mainCats, function(key, val) {
			mCatFg += '<option value="' + val.id + '">' + val.description + '</option>'; 
		});
			
		mCatFg += '</select>';
			
		$("#mainCatFG").html(mCatFg);
			
		$("#mainCatFGObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
	
		var subCatFg = '<select id="sCatFGObj"  name="sCatFGObj" class="form-control" multiple="multiple">';
		$.each(data.payload.subCats, function(key, val) {
			subCatFg += '<option value="' + val.id + '">' + val.description + '</option>'; 
		});
			
		subCatFg += '</select>';
			
		$("#subCatFG").html(subCatFg);
			
		$("#sCatFGObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	
		var artCodeFg = '<select id="artCodeFGObj"  name="artCodeFGObj" class="form-control" multiple="multiple">';
		$.each(data.payload.articalCodes, function(key, val) {
			artCodeFg += '<option value="' + val + '">' + val + '</option>'; 
		});
			
		artCodeFg += '</select>';
			
		$("#artCodeFG").html(artCodeFg);
			
		$("#artCodeFGObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var fromWtFg = '<select id="fWtRangeFGObj"  name="fWtRangeFGObj" class="form-control" multiple="multiple">';
		$.each(data.payload.weightRanges, function(key, val) {
			fromWtFg += '<option value="' + val.from_WeightRange + '">' + val.from_WeightRange + '</option>'; 
		});
			
		fromWtFg += '</select>';
			
		$("#fWtRangeFG").html(fromWtFg);
			
		$("#fWtRangeFGObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var toWtFg = '<select id="tWtRangeFGObj"  name="tWtRangeFGObj" class="form-control" multiple="multiple">';
		$.each(data.payload.weightRanges, function(key, val) {
			toWtFg += '<option value="' + val.to_WeightRange + '">' + val.to_WeightRange + '</option>'; 
		});
			
		toWtFg += '</select>';
			
		$("#tWtRangeFG").html(toWtFg);
			
		$("#tWtRangeFGObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		}		
	});
}

onloadFunctionLFG();


// Load Store/DC names
$("#storeOrDcFG").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/consignmentStatusBaseReportLOV?storeOrDc='+$("#storeOrDcFG").val(), function(data) {
		if(data.resCode == "1"){
			var storeDcName = '<select id="storeDcNameFGObj"  name="storeDcNameFGObj" class="form-control" multiple="multiple">';
			$.each(data.payload.storeOrDcNames, function(key, val) {
				storeDcName += '<option value="' + val.id + '">' + val.name + '</option>'; 
			});
				
			storeDcName += '</select>';
				
			$("#storeDcNameFG").html(storeDcName);
				
			$("#storeDcNameFGObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
		
	});
});

// Load zones
//on change of stoe/dc Name load zone
$("#storeDcNameFG").on('change',function(){
	var storeDcObj = $("#storeDcNameFGObj").val();
	if(storeDcObj != null){
	storeDcObj = storeDcObj.join(',');
	$.getJSON('/OrderExecution/api/v1/consignmentStatusBaseReportLOV?storeOrDc='+$("#storeOrDcFG").val()+'&storeOrDcId='+storeDcObj, function(data) {
		if(data.resCode == "1"){
			var zoneFG = '<select id="zoneFGObj"  name="zoneFGObj" class="form-control" multiple="multiple">';
			$.each(data.payload.zoneCodes, function(key, val) {
				zoneFG += '<option value="' + val.id + '">' + val.description + '</option>'; 
			});
				
			zoneFG += '</select>';
				
			$("#zoneFg").html(zoneFG);
				
			$("#zoneFGObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
	});	
	}
});

// LOAD VENDOR CODES & GRV NO'S
var statusExist = 0;
$("#statusFG").on('change',function(){
	var statusFGObj = $("#statusFGObj").val();
	console.log(statusFGObj);
	if(statusFGObj != null){
		if(statusFGObj.includes("Available")){
			$("#fromDateFG").attr('disabled',true);
			$("#toDateFG").attr('disabled',true);
			statusExist = 1;
			$("#fromDateFG").val("");
			$("#toDateFG").val("")
		}else{
			$("#fromDateFG").attr('disabled',false);
			$("#toDateFG").attr('disabled',false);
			statusExist = 0;
		}
		statusFGObj = statusFGObj.join(',');
		console.log(statusFGObj);
		$.getJSON('/OrderExecution/api/v1/consignmentStatusBaseReportLOV?status='+statusFGObj, function(data) {
			if(data.resCode == "1"){
				var vCodeFG = '<select id="vendorFGObj"  name="vendorFGObj" class="form-control" multiple="multiple">';
				$.each(data.payload.vendorCodes, function(key, val) {
					vCodeFG += '<option value="' + val.vendorCode + '">' + val.vendorCode + '</option>'; 
				});
					
				vCodeFG += '</select>';
				$("#vendorFG").html(vCodeFG);
					
				$("#vendorFGObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});

				
				var grvNumFG = '<select id="grvNoFGObj"  name="grvNoFGObj" class="form-control" multiple="multiple">';
				$.each(data.payload.grvNos, function(key, val) {
					grvNumFG += '<option value="' + val + '">' + val + '</option>'; 
				});
					
				grvNumFG += '</select>';
					
				$("#grvNoFG").html(grvNumFG);
					
				$("#grvNoFGObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
	}else{
		$("#fromDateFG").attr('disabled',false);
		$("#toDateFG").attr('disabled',false);
	}
	
});

var consignmentFGFieldFilters = function(){
	var fromDateFG = $("#fromDateFG").val();
	var toDateFG = $("#toDateFG").val();
	var statusFG = $("#statusFG").val();
	var storeOrDcFG = $("#storeOrDcFG").val();
	
	var statusFGObj = $('#statusFGObj').val();
	if (statusFGObj == null || statusFGObj == ""){
		var statusFG= "";
	}else{
		var statusFG = statusFGObj.join(",");
	}
	
	var storeDcNameFGObj = $('#storeDcNameFGObj').val();
	if (storeDcNameFGObj == null || storeDcNameFGObj == ""){
		var storeDcNameF= "";
	}else{
		var storeDcNameF = storeDcNameFGObj.join(",");
	}
	
	var zoneFGObj = $('#zoneFGObj').val();
	if (zoneFGObj == null || zoneFGObj == ""){
		var zoneFg= "";
	}else{
		var zoneFg = zoneFGObj.join(",");
	}
	
	var jCodeFGObj = $('#jCodeFGObj').val();
	if (jCodeFGObj == null || jCodeFGObj == ""){
		var jewelCodeFG= "";
	}else{
		var jewelCodeFG = jCodeFGObj.join(",");
	}
	
	var mainCatFGObj = $('#mainCatFGObj').val();
	if (mainCatFGObj == null || mainCatFGObj == ""){
		var mainCatFG= "";
	}else{
		var mainCatFG = mainCatFGObj.join(",");
	}
	
	var sCatFGObj = $('#sCatFGObj').val();
	if (sCatFGObj == null || sCatFGObj == ""){
		var subCatFG= "";
	}else{
		var subCatFG = sCatFGObj.join(",");
	}
	
	var artCodeFGObj = $('#artCodeFGObj').val();
	if (artCodeFGObj == null || artCodeFGObj == ""){
		var artCodeFG= "";
	}else{
		var artCodeFG = artCodeFGObj.join(",");
	}
	
	var fWtRangeFGObj = $('#fWtRangeFGObj').val();
	if (fWtRangeFGObj == null || fWtRangeFGObj == ""){
		var fromWtFG= "";
	}else{
		var fromWtFG = fWtRangeFGObj.join(",");
	}
	
	var tWtRangeFGObj = $('#tWtRangeFGObj').val();
	if (tWtRangeFGObj == null || tWtRangeFGObj == ""){
		var toWtFG= "";
	}else{
		var toWtFG = tWtRangeFGObj.join(",");
	}
	
	var vendorFGObj = $('#vendorFGObj').val();
	if (vendorFGObj == null || vendorFGObj == ""){
		var vendorF= "";
	}else{
		var vendorF = vendorFGObj.join(",");
	}
	
	var grvNoFGObj = $('#grvNoFGObj').val();
	if (grvNoFGObj == null || grvNoFGObj == ""){
		var grvNoF = "";
	}else{
		var grvNoF = grvNoFGObj.join(",");
	}
	var artSegFGObj = $('#artSegFGObj').val();
	if (artSegFGObj == null || artSegFGObj == ""){
		var artSegF = "";
	}else{
		var artSegF = artSegFGObj.join(",");
	}
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateFG != "" && fromDateFG != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateFG;
	}
	if (toDateFG != "" && toDateFG != null) {
		fieldFilters.fieldFilters["toDate"] = toDateFG;
	}
	if (statusFG != "" && statusFG != null) {
		fieldFilters.fieldFilters["status"] = statusFG;
	}
	if (storeOrDcFG != "" && storeOrDcFG != null) {
		fieldFilters.fieldFilters["storeOrDcType"] = storeOrDcFG;
	}
	if (zoneFg != "" && zoneFg != null) {
		fieldFilters.fieldFilters["zone"] = zoneFg;
	}
	if (storeDcNameF != "" && storeDcNameF != null) {
		fieldFilters.fieldFilters["storeOrDc"] = storeDcNameF;
	}
	if (vendorF != "" && vendorF != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorF;
	}
	if (grvNoF != "" && grvNoF != null) {
		fieldFilters.fieldFilters["grNo"] = grvNoF;
	}
	if (artSegF != "" && artSegF != null) {
		fieldFilters.fieldFilters["segment"] = artSegF;
	}
	if (jewelCodeFG != "" && jewelCodeFG != null) {
		fieldFilters.fieldFilters["jewelCode"] = jewelCodeFG;
	}
	if (mainCatFG != "" && mainCatFG != null) {
		fieldFilters.fieldFilters["category"] = mainCatFG;
	}
	if (subCatFG != "" && subCatFG != null) {
		fieldFilters.fieldFilters["subCategory"] = subCatFG;
	}
	if (artCodeFG != "" && artCodeFG != null) {
		fieldFilters.fieldFilters["articleCode"] = artCodeFG;
	}
	if (fromWtFG != "" && fromWtFG != null) {
		fieldFilters.fieldFilters["fromWeightRange"] = fromWtFG;
	}
	if(toWtFG != "" && toWtFG != null){
		fieldFilters.fieldFilters["toWeightRange"] = toWtFG ;
	}
	fieldFilters.fieldFilters["mode"] = "search";
	return fieldFilters;
}

function consignmentFgGrid() {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	var datafields = [ 
		{'name' : 'storeOrDcType','type' : 'string','map':'storeOrdcType'},
		{'name' : 'storeOrdcName','type' : 'string','map':'storeOrdcName'},
		{'name' : 'zone','type' : 'string','map' : 'zone'}, 
		{'name' : 'vendorCode','type' : 'string','map' : 'vendorCode'},
		{'name' : 'articalSegment','type' : 'string','map' : 'articalSegment'},
		{'name' : 'jewelCode','type' : 'string','map' : 'jewelCode'},
		{'name' : 'mainCat','type' : 'string','map':'mainCat'}, 
		{'name' : 'subCat','type' : 'string','map':'subCat'},
		{'name' : 'articleCode','type' : 'string','map' : 'articalCode'},
		{'name' : 'stoneComb','type' : 'string','map' : 'stoneCombination'},
		{'name' : 'length','type' : 'string','map':'length'},
		{'name' : 'size','type' : 'string','map':'size'},
		{'name' : 'wtRange','type' : 'string','map':'weightRange'},
		{'name' : 'stockNo','type' : 'long','map':'stockNo'},
		{'name' : 'pcs','type' : 'long','map':'pcs'},
		{'name' : 'grwt','type' : 'float','map':'grwt'},
		{'name' : 'netWt','type' : 'float','map':'netWt'},
		{'name' : 'mPurity','type' : 'float','map':'meltingPurity'},
		{'name' : 'photoNo','type' : 'int','map':'phoneNo'},
		{'name' : 'photoView','type' : 'int','map':''},
		{'name' : 'lineItemCost','type' : 'double','map' :'lineItemCost'},
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
		{'text' : 'Store/DC Name','datafield' : 'storeOrdcName','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Zone','datafield' : 'zone','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Article Segment.','datafield' : 'articalSegment','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Jewel Code','datafield' : 'jewelCode','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Main Category','datafield' : 'mainCat','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Sub Cat','datafield' : 'subCat','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Article Code','datafield' : 'articleCode','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Stone Comb','datafield' : 'stoneComb','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Length','datafield' : 'length','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Size','datafield' : 'size','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Weight Range','datafield' : 'wtRange','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Stock No','datafield' : 'stockNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'PCS','datafield' : 'pcs','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Gross Wt.','datafield' : 'grwt','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'd3',editable : false,sortable : true},
		{'text' : 'Net Wt.','datafield' : 'netWt','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'd3',editable : false,sortable : false},
		{'text' : 'Melting Purity','datafield' : 'mPurity','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'd2',editable : false,sortable : false},
		{'text' : 'Photo No','datafield' : 'photoNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'View','datafield' : 'photoView','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Line Item Cost','datafield' : 'lineItemCost','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'd2',editable : false,sortable : false},
		{'text' : 'GRV No','datafield' : 'grvNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'GRV Sl No.','datafield' : 'grvSlNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Vendor Invoice Ref.','datafield' : 'vendInvoiceRef','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Vendor Invoice Dt.','datafield' : 'vendInvoiceDate','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy',editable : false,sortable : false},
		{'text' : 'Status','datafield' : 'status','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'To Ref Doc No','datafield' : 'toRefDocNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'To Ref Doc Sl No','datafield' : 'toRefDocSlNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Status Dt.','datafield' : 'statusDate','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy',editable : false,sortable : false},
		{'text' : 'No of Days.','datafield' : 'noOfDays','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		];
	showMyGrid(datafields, "/OrderExecution/api/v1/consignmentStatusBaseReportSearch", "list",columns, consignmentFGFieldFilters(), updateRows);
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

$("#search").on('click',function(){
	var type = $("#consignmentGoods").val();
	$("#jqxgrid").show();
	var status = $("#statusFGObj").val();
	var statusS = $("#statusLSObj").val();
	var statusA = $("#statusAObj").val();
	
	if(type == "fg"){
		if($("#statusFGObj").val() == null || $("#storeOrDcFG").val() == ""
			|| $("#storeDcNameFGObj").val() == null){
			$.growl.error({
				message : "Please Enter Mandatory Fields !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		if(statusExist == 0 && status != null){
			if($("#fromDateFG").val() == "" || $("#toDateFG").val() == ""){
				$.growl.error({
					message : "Please Enter From & To Date !!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		}
		consignmentFgGrid();
	}
		
	else if(type == "stone"){
		if($("#statusLSObj").val() == null || $("#storeOrDcLS").val() == ""
			|| $("#storeDcNameLSObj").val() == null){
			$.growl.error({
				message : "Please Enter Mandatory Fields !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		if(statusExistFlag == 0 && statusS != null){
			if($("#fromDateLS").val() == "" || $("#toDateLS").val() == ""){
				$.growl.error({
					message : "Please Enter From & To Date !!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		}
		consignmentLSGrid();
	}else if(type == "acc"){
		if($("#statusAObj").val() == null || $("#storeOrDcA").val() == ""
			|| $("#storeDcNameAObj").val() == null){
			$.growl.error({
				message : "Please Enter Mandatory Fields !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		if(accStatusFlag == 0 && statusA != null){
			if($("#fromDateA").val() == "" || $("#toDateA").val() == ""){
				$.growl.error({
					message : "Please Enter From & To Date !!",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		}
		consignmentAccGrid();
	}
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('consignmentGoodsReport', 'bodySwitcher')"
});

//###################### Export functionality #######################

$("#export").on("click",function() {
		var data;
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
					if($("#consignmentGoods").val() == "fg"){
						 var fieldFilters = consignmentFGFieldFilters();
						   fieldFilters.fieldFilters.mode = "export";
						postJSON('/OrderExecution/api/v1/consignmentStatusBaseReportSearch',JSON.stringify(fieldFilters),function(response) {
							   if(response != null){
				               data = response.payload.list;
				               for (i = 0; i < data.length; i++) {
				            	   var vendorInvoiceDateE = "";
				            	   var statusDateE = "";
				            	   if(data[i].vendorInvoiceDate != null || data[i].vendorInvoiceDate != ""){
				            		var viDateE = new Date(data[i].vendorInvoiceDate);
				               		var dd = viDateE.getDate();
				               		var mm = viDateE.getMonth() + 1;
				               		var yy = viDateE.getFullYear();
				               		vendorInvoiceDateE = dd + "/" + mm + "/" + yy;
				            	   }else{
				            		   vendorInvoiceDateE = "";
				            	   }
				            	   
				            	   if(data[i].statusDate != null || data[i].statusDate != ""){
					            		var stDateE = new Date(data[i].statusDate);
					               		var dd = stDateE.getDate();
					               		var mm = stDateE.getMonth() + 1;
					               		var yy = stDateE.getFullYear();
					               		var statusDateE = dd + "/" + mm + "/" + yy;
					            	   }else{
					            		   statusDateE = "";
					            	   }
				            	   
								newData.push({
									'Store/DC' : (data[i].storeOrdcType != null) ? data[i].storeOrdcType : "",
									'Store/ DC Name ' : (data[i].storeOrdcName != null) ? data[i].storeOrdcName : "",
									'Zone' : (data[i].zone!= null) ? data[i].zone  : "",		
									'Vendor Code' : (data[i].vendorCode!= null) ? data[i].vendorCode  : "",
									'Article Segment' : (data[i].articalSegment != null) ? data[i].articalSegment : "",
									'Jewel Code' : (data[i].jewelCode != null) ? data[i].jewelCode : "",
									'Main Cat' : (data[i].mainCat != null) ? data[i].mainCat : "",
									
									'Sub Cat' : (data[i].subCat != null) ? data[i].subCat : "",	
									'Article Code' : (data[i].articalCode != null) ? data[i].articalCode : "",
									'Stone Comb' : (data[i].stoneCombination!= null) ? data[i].stoneCombination  : "",		
									'Length' : (data[i].length != null) ? data[i].length : "",
									'Size' : (data[i].size != null) ? data[i].size : "",
									'Weight Range' : (data[i].weightRange != null) ? data[i].weightRange : "",
									
									'Stock No' : (data[i].stockNo != null) ? data[i].stockNo : "",
									'PCS' : (data[i].pcs != null) ? data[i].pcs : "",
									'Gross Wt' : (data[i].grwt!= null) ? parseFloat(data[i].grwt).toFixed(3): "",
									'Net Wt' : (data[i].netWt != null) ? parseFloat(data[i].netWt).toFixed(3) : "",
									'Melting Purity' : (data[i].meltingPurity != null) ? parseFloat(data[i].meltingPurity).toFixed(2) : "",
									'Photo No' : (data[i].phoneNo != null) ? data[i].phoneNo : "",
									'Photo View' : (data[i].phoneNo != null) ? data[i].phoneNo : "",	
											
									'Line Item Cost' : (data[i].lineItemCost!= null) ? parseFloat(data[i].lineItemCost).toFixed(2) : "",
									'GRV No': (data[i].grvNo!= null) ? data[i].grvNo : "",
									'GRV Sl No' : (data[i].grvSrlNo != null) ? data[i].grvSrlNo : "",
									'Vendor Invoice Ref' : (data[i].vendorInvoiceRef != null) ? data[i].vendorInvoiceRef : "",
									'Vendor Invoice Date ' : (data[i].vendorInvoiceDate != null ) ? vendorInvoiceDateE : "",
									'Status' : (data[i].status != null) ? data[i].status : "",
									'To Ref Doc No' : (data[i].toRefDocNo != null) ? data[i].toRefDocNo : "",
									'To Ref Doc Sl No' : (data[i].toRefDocSrlNo != null) ? data[i].toRefDocSrlNo : "",
									'Status Date' : (data[i].statusDate != null) ? statusDateE : "",
									'No of Days' : (data[i].noOfDays != null) ? data[i].noOfDays : "",
				                });
				            }
				               var opts = [{sheetid:'Consignment_Goods_FG',header:true}];
				               var res = alasql('SELECT * INTO XLSX("Consignment_Goods_FG_'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
				      }
				 });
			}
					
					
		  if($("#consignmentGoods").val() == "stone"){
			  var fieldFilters = consignmentLSFieldFilters();
			   fieldFilters.fieldFilters.mode = "export";
				postJSON('/OrderExecution/api/v1/looseStoneConsignmentStatusBaseReportSearch',JSON.stringify(fieldFilters),function(response) {
					   if(response != null){
		               data = response.payload.list;
		               for (i = 0; i < data.length; i++) {
		            	   var rate = 0.00;
		            	   var statusDateE = "";
		            	   var vendorInvoiceDateE = "";
		            	   
		            	   if(data[i].uqc == "Pcs"){
		            		   if(data[i].pcs != null && data[i].stoneCostPrice != null){
			            		    rate = data[i].stoneCostPrice / data[i].pcs;
			            	   }
		            	   }else{
		            		   if(data[i].stoneWeight != null && data[i].stoneCostPrice != null){
			            		    rate = data[i].stoneCostPrice / data[i].stoneWeight;
			            	   }
		            	   }
		            	   
		            	   if(data[i].statusDate != null || data[i].statusDate != ""){
			            		var stDateE = new Date(data[i].statusDate);
			               		var dd = stDateE.getDate();
			               		var mm = stDateE.getMonth() + 1;
			               		var yy = stDateE.getFullYear();
			               		var statusDateE = dd + "/" + mm + "/" + yy;
			            	   }else{
			            		   statusDateE = "";
			            	   }
		            	   
		            	   if(data[i].vendorInvoiceDate != null || data[i].vendorInvoiceDate != ""){
			            		var viDate = new Date(data[i].vendorInvoiceDate);
			               		var dd = viDate.getDate();
			               		var mm = viDate.getMonth() + 1;
			               		var yy = viDate.getFullYear();
			               	 vendorInvoiceDateE = dd + "/" + mm + "/" + yy;
			            	   }else{
			            		   vendorInvoiceDateE = "";
			            	   }
		            	   
						newData.push({
							'Store/DC' : (data[i].storeOrdcType != null) ? data[i].storeOrdcType : "",
							'Store/ DC Name ' : (data[i].storeOrdcName != null) ? data[i].storeOrdcName : "",
							'Zone' : (data[i].zone!= null) ? data[i].zone  : "",		
							'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode  : "",
							'Stone Segment' : (data[i].articalSegment != null) ? data[i].articalSegment : "",
							'Main Cat' : (data[i].mainCat != null) ? data[i].mainCat : "",
							
							'Sub Cat' : (data[i].subCat != null) ? data[i].subCat : "",	
							'Article Code' : (data[i].articalCode != null) ? data[i].articalCode : "",
							'Weight Range' : (data[i].weightRange!= null) ? data[i].weightRange  : "",		
							'Packet/Stock' : (data[i].packetOrIndividual != null) ? data[i].packetOrIndividual : "",
							'Packet/Stock No' : (data[i].packetOrIndividualId != null) ? data[i].packetOrIndividualId : "",
							'Pcs' : (data[i].pcs != null) ? data[i].pcs : "",
							
							'Stone Wt' : (data[i].stoneWeight != null) ? parseFloat(data[i].stoneWeight).toFixed(3) : "",
							'UQC' : (data[i].uqc != null) ? data[i].uqc : "",
							'Clarity' : (data[i].clarity!= null) ? data[i].clarity: "",
							'Actual Color' : (data[i].actualcolor != null) ? data[i].actualcolor: "",
							'Color' : (data[i].color != null) ? data[i].color : "",
							'Cut Grade' : (data[i].cutGrade != null) ? data[i].cutGrade : "",
							'Lab Code' : (data[i].labCode != null) ? data[i].labCode : "",	
									
							'Cert No' : (data[i].crtNo!= null) ? data[i].crtNo : "",
							'Cost Rate': rate.toFixed(2),
							'Cost Price' : (data[i].stoneCostPrice != null) ? parseFloat(data[i].stoneCostPrice).toFixed(2) : "",
							'GRV No' : (data[i].grvNo != null) ? data[i].grvNo : "",
							'GRV Sl No' : (data[i].grvSrlNo != null) ? data[i].grvSrlNo : "",
							'Vendor Invoice Ref' : (data[i].vendorInvoiceRef != null) ? data[i].vendorInvoiceRef : "",
							'Vendor Invoice Date' : (data[i].vendorInvoiceDate != null) ? vendorInvoiceDateE : "",
							'Status' : (data[i].status != null) ? data[i].status : "",
							'To Ref Doc No' : (data[i].toRefDocNo != null) ? data[i].toRefDocNo : "",
							'To Ref Doc Sl No' : (data[i].toRefDocSrlNo != null) ? data[i].toRefDocSrlNo : "",
							'Status Date' : (data[i].statusDate != null) ? statusDateE : "",
							'No of Days' : (data[i].noOfDays != null) ? data[i].noOfDays : "",
		                });
		            }
		               var opts = [{sheetid:'Consignment_Goods_LS',header:true}];
		               var res = alasql('SELECT * INTO XLSX("Consignment_Goods_LS_'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
		      }
		 });  
	}
		  if($("#consignmentGoods").val() == "acc"){
			  var fieldFilters = consignmentAccFieldFilters();
			   fieldFilters.fieldFilters.mode = "export";
				postJSON('/OrderExecution/api/v1/looseAccConsignmentStatusBaseReportSearch',JSON.stringify(fieldFilters),function(response) {
					   if(response != null){
		               data = response.payload.list;
		               for (i = 0; i < data.length; i++) {
		            	   var rate = 0.00;
		            	   var statusDateE = "";
		            	   var vendorInvoiceDateE = "";
		            	   
		            	   if(data[i].pcs != null && data[i].lineItemCost != null){
		            		    rate = data[i].lineItemCost / data[i].pcs;
		            		    rate = parseFloat(rate).toFixed(2);
		            	   }
		            	   
		            	   if(data[i].statusDate != null || data[i].statusDate != ""){
			            		var stDateE = new Date(data[i].statusDate);
			               		var dd = stDateE.getDate();
			               		var mm = stDateE.getMonth() + 1;
			               		var yy = stDateE.getFullYear();
			               		 statusDateE = dd + "/" + mm + "/" + yy;
			            	   }else{
			            		   statusDateE = "";
			            	   }
		            	   
		            	   if(data[i].vendorInvoiceDate != null || data[i].vendorInvoiceDate != ""){
			            		var viDate = new Date(data[i].vendorInvoiceDate);
			               		var dd = viDate.getDate();
			               		var mm = viDate.getMonth() + 1;
			               		var yy = viDate.getFullYear();
			               	    vendorInvoiceDateE = dd + "/" + mm + "/" + yy;
			            	   }else{
			            		   vendorInvoiceDateE = "";
			            	   }
		            	   
						newData.push({
							'Store/DC' : (data[i].storeOrdcType != null) ? data[i].storeOrdcType : "",
							'Store/ DC Name ' : (data[i].storeOrdcName != null) ? data[i].storeOrdcName : "",
							'Zone' : (data[i].zone!= null) ? data[i].zone  : "",		
							'J/W Code' : (data[i].vendorCode != null) ? data[i].vendorCode  : "",
							'Acc Segment' : (data[i].articalSegment != null) ? data[i].articalSegment : "",
							'Main Cat' : (data[i].mainCat != null) ? data[i].mainCat : "",
							
							'Sub Cat' : (data[i].subCat != null) ? data[i].subCat : "",	
							'Article Code' : (data[i].articalCode != null) ? data[i].articalCode : "",
							'Stock No' : (data[i].stockNo != null) ? data[i].stockNo : "",
							'Pcs' : (data[i].pcs != null) ? data[i].pcs : "",
							
							'Acc Wt' : (data[i].accWeight != null) ? data[i].accWeight.toFixed(3) : "",
							'UQC' :  "Pcs",
							'Cost Rate' : rate,
							'Cost Price' : (data[i].lineItemCost != null) ? parseFloat(data[i].lineItemCost).toFixed(2): "",
							'GR No' : (data[i].grvNo != null) ? data[i].grvNo : "",
							'GR Sl No' : (data[i].grvSrlNo != null) ? data[i].grvSrlNo : "",
							'Vendor Invoice Ref' : (data[i].vendorInvoiceRef != null) ? data[i].vendorInvoiceRef : "",
							'Vendor Invoice Date' : (data[i].vendorInvoiceDate != null) ? vendorInvoiceDateE : "",
							'Status' : (data[i].status != null) ? data[i].status : "",
							'To Ref Doc No' : (data[i].toRefDocNo != null) ? data[i].toRefDocNo : "",
							'To Ref Doc Sl No' : (data[i].toRefDocSrlNo != null) ? data[i].toRefDocSrlNo : "",
							'Status Date' : (data[i].statusDate != null ) ? statusDateE : "",
							'No of Days' : (data[i].noOfDays != null) ? data[i].noOfDays : "",
		                });
		            }
		               var opts = [{sheetid:'Consignment_Goods_ACC',header:true}];
		               var res = alasql('SELECT * INTO XLSX("Consignment_Goods_ACC_'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
		      }
		 });  
		  }		
 }else{
	  $.growl.error({
		message : "No Data to Export.",
			duration : 10000
		});
			return false;	
		}
	}
});