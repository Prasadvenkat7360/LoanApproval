//date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

$(".tabDisabledS").addClass("tabDisabled");
$("#gridTabs").tabs({
	disabled:[]
});

$("#gridTabs1").tabs({
	disabled:[]
});
	
$("#tab0default").hide();
$("#tab1default").hide();

$("#summaryDetails").hide();
$("#details").hide();

var onloadFunctionLFG = function(){
	var store = '<select id="storeDCNameSObj" class="form-control" multiple="multiple"></select>';
	$("#storeDCNameS").html(store);
	$('#storeDCNameSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var mSeg = '<select id="metalSegmentSObj" class="form-control" multiple="multiple"></select>';
	$("#metalSegmentS").html(mSeg);
	$('#metalSegmentSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var locCode = '<select id="locationCodeSObj" class="form-control" multiple="multiple"></select>';
	$("#locationCodeS").html(locCode);
	$('#locationCodeSObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});

	var params = {"fieldFilters": {}}
	
	postJSON('/OrderExecution/api/v1/getOnLoadForMetalBalanceSummaryReport',JSON.stringify(params),function(response) {
		var mSegment = response.payload.MetalSegments;
		var docType = response.payload.DocTypes;
		
		var dType = '<select id="documentTypeObj"  name="documentTypeObj" class="form-control" multiple="multiple">';
		$.each(docType, function(key, val) {
			dType += '<option value="' + val.id + '">' + val.name + '</option>'; 
		});
			
		dType += '</select>';
		$("#documentTypeS").html(dType);
			
		$("#documentTypeObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
			
		$("#metalSegmentS").empty().append('<option value="" selected>--Select--</option>');
			$.each(mSegment, function(key, val) {
			$("#metalSegmentS").append('<option value="' + val.id + '">' + val.description + '</option>');
		});	
			
	});
}

onloadFunctionLFG();

$("#storeOrDc").on('change',function(){
	var type = $("#storeOrDc").val();
	$.getJSON('/OrderExecution/api/v1/getStoreDcsFStk?type=' + type,function(data) {
		$("#storeDc").show();
		var storeDc = data.payload.allStoreOrDc;
		if (type != "") {
			var d = '<select id="storeDCNameSObj"  name="storeDCNameSObj" class="form-control" multiple="multiple">';
			$.each(storeDc, function(key, val) {
				d += '<option value="' + val.id + '">' + val.name + '</option>';
			});
			
			d += '</select>';
			
			$("#storeDCNameS").html(d);
			
			$("#storeDCNameSObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	  }else{
		  var store = '<select id="storeDCNameSObj" class="form-control" multiple="multiple"></select>';
			$("#storeDCNameS").html(store);
			$('#storeDCNameSObj').multiselect({
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
			    buttonClass : 'col-md-12 form-control text-left'
			});
	  }
	});
});


$("#metalSegmentS").on('change',function(){
	getLocationCodes();
})

var getLocationCodes = function(){
	var mSegment = $("#metalSegmentS").val();
	var storeOrDc = $("#storeOrDc").val();
	var storeDCName = $("#storeDCNameS").val();
	
	var storeDCNameSObj = $('#storeDCNameSObj').val();
	if (storeDCNameSObj == null || storeDCNameSObj == ""){
		var storedcName = "";
	}else{
		var storedcName = storeDCNameSObj.join(",");
	}
	
	if(/*storeOrDc != "" &&*/ mSegment != "" /*&& storedcName != "" && storedcName != null*/){
		var params = {
				"fieldFilters": {
				"metalSegList" :  mSegment,
				"storeOrDCIdList" : storedcName,
				"storeOrDC" :storeOrDc
				}
			}
			postJSON('/OrderExecution/api/v1/getOnLoadForMetalBalanceSummaryReport',JSON.stringify(params),function(response) {
				var location = response.payload.AllLocations;
				var loc = '<select id="locationObj"  name="locationObj" class="form-control" multiple="multiple">';
				$.each(location, function(key, val) {
					loc += '<option value="' + val.name + '">' + val.name + '</option>'; 
				});
					
				loc += '</select>';
				$("#locationCodeS").html(loc);
				$("#locationObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			});
	}else{
		var locCode = '<select id="locationCodeSObj" class="form-control" multiple="multiple"></select>';
		$("#locationCodeS").html(locCode);
		$('#locationCodeSObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
		    buttonClass : 'col-md-12 form-control text-left'
		});
	}
	
}

var openCloseBalFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var storeOrDc = $("#storeOrDc").val();
	var storeDCNameS = $("#storeDCNameS").val();
	var metalSegmentS = $("#metalSegmentS").val();
	var locationCodeS = $("#locationCodeS").val();
	var documentTypeS = $("#documentTypeS").val();
	var summaryDetS = $("#summaryDetS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	var storeDCNameSObj = $('#storeDCNameSObj').val();
	if (storeDCNameSObj == null || storeDCNameSObj == ""){
		var storedc = "";
	}else{
		var storedc = storeDCNameSObj.join(",");
	}
	
	if (metalSegmentS != "" && metalSegmentS != null) {
		fieldFilters.fieldFilters["mSegId"] = metalSegmentS;
	}
	
	var locationCodeSObj = $('#locationObj').val();
	if (locationCodeSObj == null || locationCodeSObj == ""){
		var location = "";
	}else{
		var location = locationCodeSObj.join(",");
	}
	
	var documentTypeObj = $('#documentTypeObj').val();
	if (documentTypeObj == null || documentTypeObj == ""){
		var docType = "";
	}else{
		var docType = documentTypeObj.join(",");
	}
	
	if (summaryDetS != "" && summaryDetS != null) {
		fieldFilters.fieldFilters["type"] = summaryDetS;
	}
	
	if (storedc != "" && storedc != null) {
		fieldFilters.fieldFilters["storeOrDCIdList"] = storedc;
	}
	
	if (storeOrDc != "" && storeOrDc != null) {
		fieldFilters.fieldFilters["storeOrDC"] = storeOrDc;
	}
	if (location != "" && location != null) {
		fieldFilters.fieldFilters["locList"] = location;
	}
	if (docType != "" && docType != null) {
		fieldFilters.fieldFilters["docTypeList"] = docType;
	}
	return fieldFilters;
}


function summaryDetails(data) {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeDcName','type' : 'string','map':'storeOrDC'},
		{'name' : 'segment','type' : 'string','map':'segDTO>description'},
		{'name' : 'locationCode','type' : 'string','map':'locationCode'},
		{'name' : 'closingDate','type' : 'string','map':'closingDate'},
		
		{'name' : 'grossWtO','type' : 'float','map':'openingGwt'},
		{'name' : 'netWtO','type' : 'float','map':'openingNwt'},
		{'name' : 'pureWtO','type' : 'float','map':'openingPwt'},
		
		{'name' : 'grossWtC','type' : 'float','map':'transactionGwt'},
		{'name' : 'netWtC','type' : 'float','map':'transactionNwt'},
		{'name' : 'pureWtC','type' : 'float','map':'transactionPwt'},
		
		{'name' : 'grossWtCL','type' : 'double','map':'cloGwt'},
		{'name' : 'netWtCL','type' : 'double','map':'cloNwt'},
		{'name' : 'pureWtCL','type' : 'double','map':'cloPwt'},
		
		{'name' : 'grossWtD','type' : 'float','map':'diffGwt'},
		{'name' : 'netWtD','type' : 'float','map':'diffNwt'},
		{'name' : 'pureWtD','type' : 'float','map':'diffPwt'},
		
		{'name' : 'grossWtI','type' : 'float','map':'issGwt'},
		{'name' : 'netWtI','type' : 'float','map':'issNwt'},
		{'name' : 'pureWtI','type' : 'float','map':'issPwt'},
		
		{'name' : 'grossWtR','type' : 'float','map':'recptGwt'},
		{'name' : 'netWtR','type' : 'float','map':'recptNwt'},
		{'name' : 'pureWtR','type' : 'float','map':'recptPwt'},
	];

	var columns = [
		{'text' : 'Store/DC Name','datafield' : 'storeDcName',cellsalign : 'center',align : 'center','width' : '8%',sortable : false,editable : false,sortable : true,},
		{'text' : 'Segment','datafield' : 'segment',cellsalign : 'center',align : 'center','width' : '6%',sortable : false,editable : false,sortable : true,},
		{'text' : 'Location Code','datafield' : 'locationCode',cellsalign : 'center',align : 'center','width' : '8%',sortable : false,editable : false,sortable : true,columngroup : "receipt"},
		{'text' : 'Closing Date','datafield' : 'closingDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : false,editable : false,columngroup : "receipt"},
		
		{'text' : 'Gross Wt.','datafield' : 'grossWtO',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "opening",cellsformat:'d3'},
		{'text' : 'Net Wt.','datafield' : 'netWtO',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "opening",cellsformat:'d3'},
		{'text' : 'Pure Wt.','datafield' : 'pureWtO',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "opening",cellsformat:'d3'},
		
		{'text' : 'Gross Wt.','datafield' : 'grossWtCL',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "location",cellsformat:'d3'},
		{'text' : 'Net Wt.','datafield' : 'netWtCL',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "location",cellsformat:'d3'},
		{'text' : 'Pure Wt.','datafield' : 'pureWtCL',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "location",cellsformat:'d3'},
		
		{'text' : 'Gross Wt.','datafield' : 'grossWtR',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "receipts",cellsformat:'d3'},
		{'text' : 'Net Wt.','datafield' : 'netWtR',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "receipts",cellsformat:'d3'},
		{'text' : 'Pure Wt.','datafield' : 'pureWtR',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "receipts",cellsformat:'d3'},
		
		{'text' : 'Gross Wt.','datafield' : 'grossWtI',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "issue",cellsformat:'d3'},
		{'text' : 'Net Wt.','datafield' : 'netWtI',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "issue",cellsformat:'d3'},
		{'text' : 'Pure Wt.','datafield' : 'pureWtI',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "issue",cellsformat:'d3'},
		
		{'text' : 'Gross Wt.sss','datafield' : 'grossWtC',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "closing",cellsformat:'d3',
			cellsrenderer: function(row, column, value){
				var gWtO = jQuery('#jqxgride1').jqxGrid ('getcellvalue', row, 'grossWtO');
				var gWtSum = 0.000;
				
				gWtSum = parseFloat(gWtO) + parseFloat(value);
				
				return "<div align='center'style='margin-top:8px;'>"+ gWtSum.toFixed(3) +"</div>";
	      	} 
		},
		{'text' : 'Net Wt.','datafield' : 'netWtC',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "closing",cellsformat:'d3',
			cellsrenderer: function(row, column, value){
				var netWtO = jQuery('#jqxgride1').jqxGrid ('getcellvalue', row, 'netWtO');
				var nWtSum = 0.000;
				
				nWtSum = parseFloat(netWtO) + parseFloat(value);
				
				return "<div align='center'style='margin-top:8px;'>"+ nWtSum.toFixed(3) +"</div>";
	      	}
		},
		{'text' : 'Pure Wt.','datafield' : 'pureWtC',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "closing",cellsformat:'d3',
			cellsrenderer: function(row, column, value){
				var pureWtO = jQuery('#jqxgride1').jqxGrid ('getcellvalue', row, 'pureWtO');
				var pWtSum = 0.000;
				
				pWtSum = parseFloat(pureWtO) + parseFloat(value);
				
				return "<div align='center'style='margin-top:8px;'>"+ pWtSum.toFixed(3) +"</div>";
	      	}
		},
		
		{'text' : 'Gross Wt.','datafield' : 'grossWtD',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "difference",cellsformat:'d3'},
		{'text' : 'Net Wt.','datafield' : 'netWtD',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "difference",cellsformat:'d3'},
		{'text' : 'Pure Wt.','datafield' : 'pureWtD',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "difference",cellsformat:'d3'},
	];

	addGrid(datafields, columns, updateRows, data, "", "#jqxgride1");
	$("#jqxgride1").jqxGrid({
		width : '100%',
		columnsheight: 80,
        sortable: true,  
    	theme: 'energyblue',
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		sortable : true,
		pageable:true,
		virtualmode : false,
			columngroups : [ {
				text : 'Opening Balance',
				name : 'opening',
				align : 'center'
			},{
				text : 'Closing Balance as Per Transaction ',
				name : 'closing',
				align : 'center'
			},{
				text : 'Closing Balance',
				name : 'location',
				align : 'center'
			} ,{
				text : 'Difference',
				name : 'difference',
				align : 'center'
			} ,{
				text : 'Receipts',
				name : 'receipts',
				align : 'center'
			}  ,{
				text : 'Issue',
				name : 'issue',
				align : 'center'
			}  
			]
		});
}

function summaryDetails1(data) {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'refType','type' : 'string','map':'refType'},
		{'name' : 'refNo','type' : 'int','map':'refNo'},
		{'name' : 'refSrlNo','type' : 'int','map':'refSrlNo'},
		/*{'name' : 'closingDate','type' : 'string','map':'closingDate'},
		
		{'name' : 'grossWtO','type' : 'float','map':'openingGwt'},
		{'name' : 'netWtO','type' : 'float','map':'openingNwt'},
		{'name' : 'pureWtO','type' : 'float','map':'openingPwt'},
		
		{'name' : 'grossWtC','type' : 'float','map':'transactionGwt'},
		{'name' : 'netWtC','type' : 'float','map':'transactionNwt'},
		{'name' : 'pureWtC','type' : 'float','map':'transactionPwt'},
		
		{'name' : 'grossWtCL','type' : 'float','map':''},
		{'name' : 'netWtCL','type' : 'float','map':''},
		{'name' : 'pureWtCL','type' : 'float','map':''},
		
		{'name' : 'grossWtD','type' : 'float','map':'diffGwt'},
		{'name' : 'netWtD','type' : 'float','map':'diffNwt'},
		{'name' : 'pureWtD','type' : 'float','map':'diffPwt'},*/
		
	];

	var columns = [
		{'text' : 'Ref Type','datafield' : 'refType',cellsalign : 'center',align : 'center','width' : '40%',sortable : false,editable : false,sortable : true,},
		{'text' : 'Ref No','datafield' : 'refNo',cellsalign : 'center',align : 'center','width' : '30%',sortable : false,editable : false,sortable : true,},
		{'text' : 'Ref Sl No','datafield' : 'refSrlNo',cellsalign : 'center',align : 'center','width' : '30%',sortable : false,editable : false,sortable : true},
	/*	{'text' : 'Doc Date','datafield' : 'closingDate',cellsalign : 'center',align : 'center','width' : '10%',sortable : false,editable : false,columngroup : "receipt"},
		
		{'text' : 'Gross Wt.','datafield' : 'grossWtO',cellsalign : 'right',align : 'center','width' : '6.5%',sortable : false,editable : false,columngroup : "opening",cellsformat:'d3'},
		{'text' : 'Net Wt.','datafield' : 'netWtO',cellsalign : 'right',align : 'center','width' : '6.5%',sortable : false,editable : false,columngroup : "opening",cellsformat:'d3'},
		{'text' : 'Pure Wt.','datafield' : 'pureWtO',cellsalign : 'right',align : 'center','width' : '6.5%',sortable : false,editable : false,columngroup : "opening",cellsformat:'d3'},
		
		{'text' : 'Gross Wt.','datafield' : 'grossWtC',cellsalign : 'right',align : 'center','width' : '6.5%',sortable : false,editable : false,columngroup : "closing",cellsformat:'d3'},
		{'text' : 'Net Wt.','datafield' : 'netWtC',cellsalign : 'right',align : 'center','width' : '6.5%',sortable : false,editable : false,columngroup : "closing",cellsformat:'d3'},
		{'text' : 'Pure Wt.','datafield' : 'pureWtC',cellsalign : 'right',align : 'center','width' : '6.5%',sortable : false,editable : false,columngroup : "closing",cellsformat:'d3'},
		
	//	{'text' : 'Gross Wt.','datafield' : 'grossWtCL',cellsalign : 'center',align : 'center','width' : '5.5%',sortable : false,editable : false,columngroup : "location"},
		//{'text' : 'Net Wt.','datafield' : 'netWtCL',cellsalign : 'center',align : 'center','width' : '5.5%',sortable : false,editable : false,columngroup : "location"},
		//{'text' : 'Pure Wt.','datafield' : 'pureWtCL',cellsalign : 'center',align : 'center','width' : '5.5%',sortable : false,editable : false,columngroup : "location"},
		
		{'text' : 'Gross Wt.','datafield' : 'grossWtD',cellsalign : 'right',align : 'center','width' : '6.5%',sortable : false,editable : false,columngroup : "difference",cellsformat:'d3'},
		{'text' : 'Net Wt.','datafield' : 'netWtD',cellsalign : 'right',align : 'center','width' : '6.5%',sortable : false,editable : false,columngroup : "difference",cellsformat:'d3'},
		{'text' : 'Pure Wt.','datafield' : 'pureWtD',cellsalign : 'right',align : 'center','width' : '6.5%',sortable : false,editable : false,columngroup : "difference",cellsformat:'d3'},*/
	];

	addGrid(datafields, columns, updateRows, data, "", "#jqxgride2");
	$("#jqxgride2").jqxGrid({
		width : '100%',
		columnsheight: 80,
        sortable: true,  
    	theme: 'energyblue',
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		sortable : true,
		pageable:true,
		virtualmode : false,
			columngroups : [ {
				text : 'Opening Balance',
				name : 'opening',
				align : 'center'
			},{
				text : 'Closing Balance as Per Transaction ',
				name : 'closing',
				align : 'center'
			} /*,{
				text : 'Closing Balance as Per Location ',
				name : 'location',
				align : 'center'
			} */,{
				text : 'Difference',
				name : 'difference',
				align : 'center'
			} ]
		});
}

function searchDetails(data) {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ 
		{'name' : 'storeOrDCNameCode','type' : 'string','map':'storeOrDC'},
		{'name' : 'segmentCode','type' : 'string','map':'segDTO>description'},
		{'name' : 'locCode','type' : 'string','map':'locationCode'},
		{'name' : 'docDate','type' : 'string','map':'createDate'},
		{'name' : 'docTypeCode','type' : 'string','map':'refDocType'},
		{'name' : 'docNoCode','type' : 'int','map':'refDocNo'},
		{'name' : 'docSrlNoCode','type' : 'int','map':'refDocSrlNo'},
		{'name' : 'grossWt','type' : 'float','map':'recptGwt'},
		{'name' : 'netWt','type' : 'float','map':'recptNwt'},
		{'name' : 'pureWt','type' : 'float','map':'recptPwt'},
		
		{'name' : 'locCodes','type' : 'string','map':'locationCode'},
		{'name' : 'docDt','type' : 'string','map':'createDate'},
		{'name' : 'docTyp','type' : 'string','map':'refDocType'},
		{'name' : 'docNum','type' : 'int','map':'refDocNo'},
		{'name' : 'docSlNum','type' : 'int','map':'refDocSrlNo'},
		{'name' : 'grossWeight','type' : 'float','map':'issGwt'},
		{'name' : 'netWeight','type' : 'float','map':'issNwt'},
		{'name' : 'pureWeight','type' : 'float','map':'issPwt'},
		];

	var columns = [
		{'text' : 'Store/DC Name','datafield' : 'storeOrDCNameCode',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false},
		{'text' : 'Segment','datafield' : 'segmentCode',cellsalign : 'center',align : 'center','width' : '7%',sortable : true,editable : false},
		{'text' : 'Location Code','datafield' : 'locCode',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "receipt"},
		{'text' : 'Doc Date','datafield' : 'docDate',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "receipt"},
		{'text' : 'Doc Type','datafield' : 'docTypeCode',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false,columngroup : "receipt"},
		{'text' : 'Doc No','datafield' : 'docNoCode',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false,columngroup : "receipt"},
		{'text' : 'Doc Sl. No.','datafield' : 'docSrlNoCode',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false,columngroup : "receipt"},
		{'text' : 'Gross Wt.','datafield' : 'grossWt',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "receipt",cellsformat:'d3'},
		{'text' : 'Net Wt.','datafield' : 'netWt',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "receipt",cellsformat:'d3'},
		{'text' : 'Pure Wt.','datafield' : 'pureWt',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "receipt",cellsformat:'d3'},
		
		{'text' : 'Location Code','datafield' : 'locCodes',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false,columngroup : "issue"},
		{'text' : 'Doc Date','datafield' : 'docDt',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "issue"},
		{'text' : 'Doc Type','datafield' : 'docTyp',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false,columngroup : "issue"},
		{'text' : 'Doc No.','datafield' : 'docNum',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false,columngroup : "issue"},
		{'text' : 'Doc Sl. No.','datafield' : 'docSlNum',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false,columngroup : "issue"},
		{'text' : 'Gross Wt.','datafield' : 'grossWeight',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "issue",cellsformat:'d3'},
		{'text' : 'Net Wt.','datafield' : 'netWeight',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "issue",cellsformat:'d3'},
		{'text' : 'Pure Wt.','datafield' : 'pureWeight',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "issue",cellsformat:'d3'},
		];

	addGrid(datafields, columns, updateRows, data, "", "#jqxgrid");
	$("#jqxgrid").jqxGrid({
		width : '100%',
		columnsheight: 80,
        sortable: true,  
    	theme: 'energyblue',
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		pageable:true,
		sortable : true,
		virtualmode : false,
			columngroups : [ {
				text : 'Receipt',
				name : 'receipt',
				align : 'center'
			},{
				text : 'Issue',
				name : 'issue',
				align : 'center'
			} ]
		});
}

function summaryDetails2(data) {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeDcName','type' : 'string','map':'StoreOrDcName'},
		{'name' : 'segment','type' : 'string','map':'metalSegment>description'},
		{'name' : 'locationCode','type' : 'string','map':'code'},
		{'name' : 'docType','type' : 'string','map':'referenceType'},
		{'name' : 'docNo','type' : 'string','map':'refId'},
		{'name' : 'docSlNo','type' : 'string','map':'refItemId'},
		
		{'name' : 'grossWtO','type' : 'float','map':'receiptGrossWeight'},
		{'name' : 'netWtO','type' : 'float','map':'receiptNetWeight'},
		{'name' : 'pureWtO','type' : 'float','map':'receiptPureWeight'},
		
		{'name' : 'grossWtC','type' : 'float','map':'issueGrossWeight'},
		{'name' : 'netWtC','type' : 'float','map':'issueNetWeight'},
		{'name' : 'pureWtC','type' : 'float','map':'issuePureWeight'},
	/*	
		{'name' : 'grossWtCL','type' : 'double','map':''},
		{'name' : 'netWtCL','type' : 'double','map':''},
		{'name' : 'pureWtCL','type' : 'double','map':''},
		
		{'name' : 'grossWtD','type' : 'double','map':'diffGwt'},
		{'name' : 'netWtD','type' : 'double','map':'diffNwt'},
		{'name' : 'pureWtD','type' : 'double','map':'diffPwt'},*/
		
	];

	var columns = [
		{'text' : 'Store/DC Name','datafield' : 'storeDcName',cellsalign : 'center',align : 'center','width' : '10%',sortable : false,editable : false,sortable : true,},
		{'text' : 'Segment','datafield' : 'segment',cellsalign : 'center',align : 'center','width' : '9%',sortable : false,editable : false,sortable : true,},
		{'text' : 'Location Code','datafield' : 'locationCode',cellsalign : 'center',align : 'center','width' : '6%',sortable : false,editable : false,sortable : true,columngroup : "receipt"},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'center',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "receipt"},
		{'text' : 'Doc No','datafield' : 'docNo',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "receipt"},
		{'text' : 'Doc Sl No','datafield' : 'docSlNo',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "receipt"},

		{'text' : 'Gross Wt.','datafield' : 'grossWtO',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,columngroup : "opening",cellsformat:'d3'},
		{'text' : 'Net Wt.','datafield' : 'netWtO',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,columngroup : "opening",cellsformat:'d3'},
		{'text' : 'Pure Wt.','datafield' : 'pureWtO',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,columngroup : "opening",cellsformat:'d3'},
		
		{'text' : 'Gross Wt.','datafield' : 'grossWtC',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,columngroup : "closing" ,cellsformat:'d3'},
		{'text' : 'Net Wt.','datafield' : 'netWtC',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,columngroup : "closing" ,cellsformat:'d3'},
		{'text' : 'Pure Wt.','datafield' : 'pureWtC',cellsalign : 'right',align : 'center','width' : '9%',sortable : false,editable : false,columngroup : "closing" ,cellsformat:'d3'},
		
	//	{'text' : 'Gross Wt.','datafield' : 'grossWtCL',cellsalign : 'center',align : 'center','width' : '5.5%',sortable : false,editable : false,columngroup : "location"},
		//{'text' : 'Net Wt.','datafield' : 'netWtCL',cellsalign : 'center',align : 'center','width' : '5.5%',sortable : false,editable : false,columngroup : "location"},
		//{'text' : 'Pure Wt.','datafield' : 'pureWtCL',cellsalign : 'center',align : 'center','width' : '5.5%',sortable : false,editable : false,columngroup : "location"},
		
	//	{'text' : 'Gross Wt.','datafield' : 'grossWtD',cellsalign : 'right',align : 'center','width' : '6.5%',sortable : false,editable : false,columngroup : "difference"},
		//{'text' : 'Net Wt.','datafield' : 'netWtD',cellsalign : 'right',align : 'center','width' : '6.5%',sortable : false,editable : false,columngroup : "difference"},
		//{'text' : 'Pure Wt.','datafield' : 'pureWtD',cellsalign : 'right',align : 'center','width' : '6.5%',sortable : false,editable : false,columngroup : "difference"},
	];

	addGrid(datafields, columns, updateRows, data, "", "#jqxgride3");
	$("#jqxgride3").jqxGrid({
		width : '100%',
		columnsheight: 80,
        sortable: true,  
    	theme: 'energyblue',
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		sortable : true,
		pageable:true,
		virtualmode : false,
			columngroups : [ {
				text : 'Receipt',
				name : 'opening',
				align : 'center'
			},{
				text : 'Issue',
				name : 'closing',
				align : 'center'
			} /*,{
				text : 'Closing Balance as Per Location ',
				name : 'location',
				align : 'center'
			} */,{
				text : 'Difference',
				name : 'difference',
				align : 'center'
			} ]
		});
}

$("#toggle1").on('click', function(){
	$("#panel1").slideToggle();
});
$("#toggle2").on('click', function(){
	$("#panel2").slideToggle();
});
$("#toggle3").on('click', function(){
	$("#panel3").slideToggle();
});

$("#gridTabs").hide();
$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" || $("#metalSegmentS").val() == "" || $("#summaryDetS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	$("#gridTabs").show();
	searchFunction();
});

$("#detailData").hide();
var searchFunction = function(){
	$("#detailData").hide();
	var param = openCloseBalFieldFilters()
	
	postJSON('/OrderExecution/api/v1/getMetalBalanceSummaryReport ',JSON.stringify(param),function(response) {
		if(response.resCode == 1){
		$("#storeOrDc").prop('disabled',true);
		$("#storeDCNameSObj").multiselect("disable");
		$("#metalSegmentS").prop('disabled',true);
		$("#locationObj").multiselect("disable");
		
		$("#documentTypeObj").multiselect("disable");
		$("#summaryDetS").prop('disabled',true);
		$('#fromDateS').attr("disabled",true);
	 	$('#toDateS').attr("disabled",true);
		$('#fromDateS').removeClass('dateBackground');
		$('#toDateS').removeClass('dateBackground');
		
		var metBalanceList = response.payload.metBalanceList;
		var TXNotFoundInTemp = response.payload.TXNotFoundInTemp;
		var TempNotFoundInTx = response.payload.TempNotFoundInTx;
		
		if($("#summaryDetS").val() == "summary"){
			summaryDetails(metBalanceList);
			$("#jqxgride1").show();
			
			summaryDetails1(TXNotFoundInTemp);
			$("#jqxgride2").show();
			
			summaryDetails2(TempNotFoundInTx);
			$("#jqxgride3").show();
			
			$("#tab0default").show();
			$("#tab1default").hide();
			
			$("#summaryDetails").show();
			$("#details").hide();
			
			$("#detailData").hide();
		}else if($("#summaryDetS").val() == "detail"){
			$("#gridTabs").hide();
			var DetailBalanceList = response.payload.list.payload.DetailBalanceList;
			
			$("#tab0default").hide();
			$("#tab1default").show();
			
			$("#summaryDetails").hide();
			$("#details").show();
			
			$("#detailData").show();
			searchDetails(DetailBalanceList);
			$("#jqxgrid").show();
		}
	}else{
		$("#gridTabs").hide();
		$("#gridTabs1").hide();
		
		$("#storeOrDc").prop('disabled',false);
		$("#storeDCNameSObj").multiselect("enable");
		$("#metalSegmentS").prop('disabled',false);
		$("#locationObj").multiselect("enable");
		
		$("#documentTypeObj").multiselect("enable");
		$("#summaryDetS").prop('disabled',false);
		$('#fromDateS').attr("disabled",false);
	 	$('#toDateS').attr("disabled",false);
		$('#fromDateS').addClass('dateBackground');
		$('#toDateS').addClass('dateBackground');
		
		$.growl.error({
			message : response.mesgStr,
			duration : 10000,
			title  : 'Error'
		});
		return false;
	  }
	});
	
}

$("#clearAll").on('click',function(){
	window.location.href = "javascript:showContentPage('openCloseBalanceSummaryDetailed', 'bodySwitcher')";

});