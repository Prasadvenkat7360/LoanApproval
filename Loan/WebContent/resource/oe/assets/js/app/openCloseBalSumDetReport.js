// date picker functions
$("#fromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDate").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

$("#gridTabs").hide();

$("#stockCheckUpdate").hide();
$("#receiptSection").hide();
$("#issueSection").hide();
$("#failedSection").hide();


function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};


$(".tabDisabledS").addClass("tabDisabled2");
$("#gridTabs").tabs({
	disabled:[]
});

$("#summaryDetS").on('change',function(){
	if($("#summaryDetS").val() == "summary"){
		 $("#docTypeObj").multiselect("disable");
		 $("#export").prop('disabled',true);
	}else{
		 $("#docTypeObj").multiselect("enable");
		 $("#export").prop('disabled',false);
	}
});

/*$('#storeDcType').on('change',function(){

});*/

var storeOrDc = [
    { "id": "All","name": "All"},
    { "id": "Dc","name": "DC"},
    {"id": "Store","name": "Store"}
    ]

var onLoadLOV = function(){
	
	$('#storeDcType').empty().append('<option value="" selected>--Select--</option>');
	$.each(storeOrDc, function(key, val) {
		$('#storeDcType').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	
	var sdName = '<select id="storeDcNameObj" class="form-control" multiple="multiple"></select>';
	$("#storeDcName").html(sdName);
	$('#storeDcNameObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var loc = '<select id="locCodeObj" class="form-control" multiple="multiple"></select>';
	$("#locCode").html(loc);
	$('#locCodeObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var docType = '<select id="docTypeObj" class="form-control" multiple="multiple"></select>';
	$("#docType").html(docType);
	$('#docTypeObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var cat = '<select id="catObj" class="form-control" multiple="multiple"></select>';
	$("#catS").html(cat);
	$('#catObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	
	$.getJSON('/OrderExecution/api/v1/getStoneBalanceSummaryReportLOV?reportType=Details',function(response) {
		if(response.resCode == "1"){
			
			$('#segment').empty().append('<option value="" selected>--Select--</option>');
				$.each(response.payload.stoneSegments, function(key, val) {
			$('#segment').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
				
			var l = '<select id="locCodeObj"  name="locCodeObj" class="form-control" multiple="multiple">';
			$.each(response.payload.locationCodes, function(key, val) {
				l += '<option value="' + val + '">' + val + '</option>'; 
			});
				
			l += '</select>';
				
			$("#locCode").html(l);
				
			$("#locCodeObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			var d = '<select id="docTypeObj"  name="docTypeObj" class="form-control" multiple="multiple">';
			$.each(response.payload.docTypes, function(key, val) {
				d += '<option value="' + val.name + '">' + val.name + '</option>'; 
			});
				
			d += '</select>';
				
			$("#docType").html(d);
				
			$("#docTypeObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
}

onLoadLOV();

$('#storeDcType').on('change',function(){
	if($('#storeDcType').val() != "" && $('#storeDcType').val() != "All"){
		 $("#storeDcNameObj").multiselect("enable");

		$.getJSON('/OrderExecution/api/v1/getStoneBalanceSummaryReportLOV?reportType=Summary&storeOrDcType='+$('#storeDcType').val(),function(response) {
			if(response.resCode == 1){
				var s = '<select id="storeDcNameObj"  name="storeDcNameObj" class="form-control" multiple="multiple">';
				$.each(response.payload.storeOrDcNames, function(key, val) {
					s += '<option value="' + val.id + '">' + val.name + '</option>'; 
				});
					
				s += '</select>';
					
				$("#storeDcName").html(s);
					
				$("#storeDcNameObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
	}else{
		 $('#storeDcNameObj').multiselect("clearSelection");
		 $("#storeDcNameObj").multiselect("disable");
	}
});

$('#segment').on('change',function(){
	if($('#segment').val() != ""){
		$.getJSON('/OrderExecution/api/v1/consignmentSalesReceiptAvilableReportLooseStoneLOV?segmentId='+$('#segment').val(),function(response) {
			if(response.resCode == 1){
				var c = '<select id="catObj"  name="catObj" class="form-control" multiple="multiple">';
				$.each(response.payload.stoneCat, function(key, val) {
					c += '<option value="' + val.id + '">' + val.description + '</option>'; 
				});
					
				c += '</select>';
					
				$("#catS").html(c);
					
				$("#catObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
	}
});

$("#toggle5").on('click', function(){
	$("#panel4").slideToggle();
});

$("#toggle4").on('click',function(){
	$("#panel5").slideToggle();
});

$("#toggle6").on('click',function(){
	$("#panel6").slideToggle();
});

$("#toggle7").on('click',function(){
	$("#panel7").slideToggle();
});

$("#toggle8").on('click',function(){
	$("#panel8").slideToggle();
});

// Summary Grid
function summarySearch(fromDate,toDate) {
	console.log(fromDate);
	console.log(toDate);

	var updateRows = function(rowid, newdata, commit) {
		  commit(true);
	}
	var datafields = [
		{'name' : 'storeDcName','type' : 'string','map':'storeOrDcName'},
		{'name' : 'locCode','type' : 'string','map':'locationCode'},
		{'name' : 'locName','type' : 'string','map':''},
		{'name' : 'segment','type' : 'string','map' : 'segemntId'},
		{'name' : 'categoryId','type' : 'string','map' : 'categoryId'},

		{'name' : 'closingDate','type' : 'string','map':''}, 
		{'name' : 'weightO','type' : 'float','map' : 'openBalanceWt'},
		{'name' : 'weightR','type' : 'float','map' : 'receiptWt'},
		{'name' : 'weightI','type' : 'string','map' : 'issueWt'},
		{'name' : 'weightT','type' : 'float','map' : 'closingBalanceTrans'},	
		{'name' : 'weightL','type' : 'float','map' : 'closingBalanceLoc'},
		{'name' : 'weightD','type' : 'float','map' : 'diffrence'},

	 ];

	var columns = [ 
		{'text' : 'Store/DC Name','datafield' : 'storeDcName','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Location Code','datafield' : 'locCode','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Location Name','datafield' : 'locName','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Segment','datafield' : 'segment','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Category','datafield' : 'categoryId','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

		{'text' : 'Closing Date','datafield' : 'closingDate','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'dd/MM/yyyy',
			cellsrenderer: function(row, column, value){
	      		return "<div align='center'style='margin-top:8px;'>"+ $("#toDate").val() +"</div>";
	      	}
		},

		{'text' : 'Weight','datafield' : 'weightO','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3',columngroup : "ob"},
		{'text' : 'Weight','datafield' : 'weightR','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,columngroup : "recpt",cellsformat:'d3'},

		{'text' : 'Weight','datafield' : 'weightI','width' : '10%',cellsalign : 'right',align : 'center',sortable : true,editable : false,columngroup : "issue",cellsformat:'d3'}, 
		{'text' : 'Weight','datafield' : 'weightT','width' : '12%',cellsalign : 'right',align : 'center',sortable : false,editable : false,columngroup : "cbTrans",cellsformat:'d3'}, 

		{'text' : 'Weight','datafield' : 'weightL','width' : '12%',cellsalign : 'right',align : 'center',sortable : false,editable : false,columngroup : "cbLoc",cellsformat:'d3'},
		{'text' : 'Weight','datafield' : 'weightD','width' : '12%',cellsalign : 'right',align : 'center',sortable :false,editable : false,columngroup : "diff",cellsformat:'d3'},
		
		];
	showMyGrid(datafields,"/OrderExecution/api/v1/getStoneBalanceSummaryReport", "list",columns, searchFieldFilters(), updateRows);
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,       
    	theme: 'energyblue',
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='background-color: #DAE3EE;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left" style="top: 0px; background-color: #DAE3EE; visibility: visible;font-weight: 600;height: 32px;padding: 5px; border-bottom: 1px solid #a4bed4;"><i class="fa fa-list fa-sm"></i><b>&nbsp;</b>'+' Stone Accounting LocationWise Issue & Receipt Report From '+fromDate+ ' to ' + toDate +'</div>');	
		},
		columngroups : [ {
			text : 'Opening Balance',
			name : 'ob',
			align : 'center'
		},
		{
			text : 'Receipt',
			name : 'recpt',
			align : 'center'
		},
		{
			text : 'Issue',
			name : 'issue',
			align : 'center'
		},
		{
			text : 'Closing Balance as Per Transaction',
			name : 'cbTrans',
			align : 'center'
		},
		{
			text : 'Closing Balance as Per Location',
			name : 'cbLoc',
			align : 'center'
		},{
			text : 'Difference',
			name : 'diff',
			align : 'center'
		}],
	});
}

// Field Filters
//Field Filters
var searchFieldFilters = function() {
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var segment = $('#segment').val();
	var storeDcType = $('#storeDcType').val();
	var sumDet = $('#summaryDetS').val();

	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segmentId"] = segment;
	}
	
	if (storeDcType != "" && storeDcType != null) {
		fieldFilters.fieldFilters["storeOrDcType"] = storeDcType;
	}else{
		fieldFilters.fieldFilters["storeOrDcType"] = "All";
	}
	
	/*if (sumDet != "" && sumDet != null) {
		fieldFilters.fieldFilters[""] = sumDet;
	}
*/
	var storeDcNameObj = $('#storeDcNameObj').val();
	if (storeDcNameObj == null || storeDcNameObj == "") {
		var storeDcName = "";
	} else {
		var storeDcName = storeDcNameObj.join(",");
	}
	if (storeDcName != "" && storeDcName != null && storeDcType != "All") {
		fieldFilters.fieldFilters["storeOrDcName"] = storeDcName;
	}
	
	var catObj = $('#catObj').val();
	if (catObj == null || catObj == "") {
		var cat = "";
	} else {
		var cat = catObj.join(",");
	}
	if (cat != "" && cat != null) {
		fieldFilters.fieldFilters["category"] = cat;
	}
	
	var locCodeObj = $('#locCodeObj').val();
	if (locCodeObj == null || locCodeObj == "") {
		var locCode = "";
	} else {
		var locCode = locCodeObj.join(",");
	}
	if (locCode != "" && locCode != null) {
		fieldFilters.fieldFilters["locationCode"] = locCode;
	}
	
	var docTypeObj = $('#docTypeObj').val();
	if (docTypeObj == null || docTypeObj == "") {
		var docType = "";
	} else {
		var docType = docTypeObj.join(",");
	}
	if (docType != "" && docType != null) {
		fieldFilters.fieldFilters["docType"] = docType;
	}
	
	fieldFilters.fieldFilters["mode"] = "search";
	
	return fieldFilters;
}

$("#search").on('click',function(){
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	if($("#fromDate").val() == "" || $("#toDate").val() == ""  || $("#segment").val() == ""  || $("#summaryDetS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else if($('#storeDcType').val() != "" && $('#storeDcType').val() != "All" && $('#storeDcNameObj').val() == null || $('#storeDcNameObj').val() == ""){
		$.growl.error({
			message : "Please Select Store/DC Name !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	else{
		if($("#summaryDetS").val() == "summary"){
			$("#stockCheckUpdate").show();
			$("#receiptSection").hide();
			$("#issueSection").hide();
			$("#failedSection").hide();
			
			$("#panel4").slideDown();
			
			console.log(fromDate);
			console.log(toDate);
			
			summarySearch(fromDate,toDate);
			$("#jqxgrid").show();
		}else{
			getDetailData();
			getFailedTransactionData();
//			getFailedAccountingData();
		}
	}
});

var getDetailData = function(){
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	var fieldFilters = searchFieldFilters();

	fieldFilters.fieldFilters.mode = "Export";
	if(fieldFilters.fieldFilters.storeOrDcType == "Dc"){
		fieldFilters.fieldFilters.storeOrDcType = "DC";
	}else{
		fieldFilters.fieldFilters.storeOrDcType = fieldFilters.fieldFilters.storeOrDcType;
	}
	
	postJSON('/OrderExecution/api/v1/getStoneBalanceReceiptAndIssueReport',JSON.stringify(fieldFilters),function(response) {
		if(response.resCode == 1){
			var result = response.payload.list;
			
			var issueList = []
			var recList = [];
			
			$.each(result,function(k,v){
				if(v.IssueWt > 0){
					issueList.push(v);
				}
				if(v.receiptWt > 0){
					recList.push(v);
				}
			});
			
			
			$("#issueSection").show();
			$("#receiptSection").show();
			$("#failedSection").show();
			
			$("#stockCheckUpdate").hide();
			
			/*$("#panel6").slideDown();
			$("#panel5").slideDown();
			$("#panel7").slideDown();
			$("#panel8").slideDown();
*/
			issueDetailsGrid(issueList,fromDate,toDate);
			$('#jqxgridI').show();
			
			receiptDetailsGrid(recList,fromDate,toDate);
			$('#jqxgridR').show();

		}else{
			issueDetailsGrid(fromDate,toDate);
			$('#jqxgridI').show();
			
			receiptDetailsGrid(fromDate,toDate);
			$('#jqxgridR').show();
		}
	});
}

var getFailedTransactionData = function(){
	var fieldFilters = searchFieldFilters();
	
	console.log(fieldFilters);
	fieldFilters.fieldFilters.segmentList = fieldFilters.fieldFilters.segmentId
	fieldFilters.fieldFilters.docType = fieldFilters.fieldFilters.docType
	fieldFilters.fieldFilters.storeOrDctype = fieldFilters.fieldFilters.storeOrDcType
	
	
	fieldFilters.fieldFilters.storeOrDcIdList = fieldFilters.fieldFilters.storeOrDcName
	fieldFilters.fieldFilters.catIdList = fieldFilters.fieldFilters.category
	fieldFilters.fieldFilters.locationCodeList = fieldFilters.fieldFilters.locationCode

	delete fieldFilters.fieldFilters.mode;
	delete fieldFilters.fieldFilters.segmentId;
	delete fieldFilters.fieldFilters.docType;
	delete fieldFilters.fieldFilters.storeOrDcType;
	delete fieldFilters.fieldFilters.storeOrDcName;
	delete fieldFilters.fieldFilters.category;
	delete fieldFilters.fieldFilters.locationCode;
	
	if(fieldFilters.fieldFilters.storeOrDctype == "All" || fieldFilters.fieldFilters.storeOrDctype == ""){
		delete fieldFilters.fieldFilters.storeOrDctype;
	}

	postJSON('/OrderExecution/api/v1/getInvalidIssuedTransactions?mode=Export',JSON.stringify(fieldFilters),function(response) {
		if(response.resCode == 1){
			var result = response.payload.list;
			
			$("#failedSection").show();
			$("#stockCheckUpdate").hide();
			
			//$("#panel7").slideDown();
			
			failedIssueTransGrid(result);
			$('#jqxgrid1').show();

		}else{
			failedIssueTransGrid();
			$('#jqxgrid1').show();
		}
	});
	
	postJSON('/OrderExecution/api/v1/getInvalidReceiptTransactions?mode=Export',JSON.stringify(fieldFilters),function(response) {
		if(response.resCode == 1){
			var result = response.payload.list;
			
			$("#failedSection").show();
			$("#stockCheckUpdate").hide();
			
			//$("#panel8").slideDown();
			
			failedRecptTransGrid(result);
			$('#jqxgrid2').show();

		}else{
			failedRecptTransGrid();
			$('#jqxgrid2').show();
		}
	});
	
	postJSON('/OrderExecution/api/v1/getInvalidIssuedTempStoneTransactions?mode=Export',JSON.stringify(fieldFilters),function(response) {
		if(response.resCode == 1){
			var result = response.payload.list;
			
			$("#failedSection").show();
			$("#stockCheckUpdate").hide();
			
			//$("#panel8").slideDown();
			
			failedIssueAccountingGrid(result);
			$('#jqxgrid3').show();

		}else{
			failedIssueAccountingGrid();
			$('#jqxgrid3').show();
		}
	});
	
	postJSON('/OrderExecution/api/v1/getInvalidReceiptTempStoneTransactions?mode=Export',JSON.stringify(fieldFilters),function(response) {
		if(response.resCode == 1){
			var result = response.payload.list;
			
			$("#failedSection").show();
			$("#stockCheckUpdate").hide();
			
			//$("#panel8").slideDown();
			
			failedRecptAccountingGrid(result);
			$('#jqxgrid4').show();

		}else{
			failedRecptAccountingGrid();
			$('#jqxgrid4').show();
		}
	});
}

var receiptDetailsGrid = function(data,fromDate,toDate){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'storeDcName','type' : 'string','map':'storeOrDcName'},
			{'name' : 'location','type' : 'string','map' : 'locationCode'},
			{'name' : 'segment','type' : 'string','map':'segment'}, 
			{'name' : 'catgory','type' : 'string','map' : 'category'},
			{'name' : 'docDate','type' : 'date','map' : 'docDate'},
			{'name' : 'docType','type' : 'string','map' : 'refType'},
			{'name' : 'docNo','type' : 'int','map' : 'refId'},
			{'name' : 'docSlNo','type' : 'int','map' : 'docSrlNo'},
			{'name' : 'weight','type' : 'float','map':'receiptWt'},
			{'name' : 'uqc','type' : 'string','map':'uom'}, 
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridR").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		pageable : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='background-color: #DAE3EE;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left" style="top: 0px; background-color: #DAE3EE; visibility: visible;font-weight: 600;height: 32px;padding: 5px; border-bottom: 1px solid #a4bed4;"><i class="fa fa-list fa-sm"></i><b>&nbsp;</b>'+' Stone Accounting LocationWise Issue & Receipt Report From '+fromDate+ ' to ' + toDate +'</div>');	
		},
		columns : [
			{'text' : 'Store/DC Name','datafield' : 'storeDcName','width' : '12%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Location Code','datafield' : 'location','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Category','datafield' : 'catgory','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Doc Date','datafield' : 'docDate','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'dd/MM/yyyy'},
			{'text' : 'Doc Type','datafield' : 'docType','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc No','datafield' : 'docNo','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc Sl No','datafield' : 'docSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Weight','datafield' : 'weight','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'}, 
			{'text' : 'UQC','datafield' : 'uqc','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			
		]
	});
}

var issueDetailsGrid = function(data,fromDate,toDate){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'storeDcName','type' : 'string','map':'storeOrDcName'},
			{'name' : 'location','type' : 'string','map' : 'locationCode'},
			{'name' : 'segment','type' : 'string','map':'segment'}, 
			{'name' : 'catgory','type' : 'string','map' : 'category'},
			{'name' : 'docDate','type' : 'date','map' : 'docDate'},
			{'name' : 'docType','type' : 'string','map' : 'refType'},
			{'name' : 'docNo','type' : 'int','map' : 'refId'},
			{'name' : 'docSlNo','type' : 'int','map' : 'docSrlNo'},
			{'name' : 'weight','type' : 'float','map':'IssueWt'},
			{'name' : 'uqc','type' : 'string','map':'uom'}, 
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridI").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		pageable : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='background-color: #DAE3EE;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left" style="top: 0px; background-color: #DAE3EE; visibility: visible;font-weight: 600;height: 32px;padding: 5px; border-bottom: 1px solid #a4bed4;"><i class="fa fa-list fa-sm"></i><b>&nbsp;</b>'+' Stone Accounting LocationWise Issue & Receipt Report From '+fromDate+ ' to ' + toDate +'</div>');	
		},
		columns : [
			{'text' : 'Store/DC Name','datafield' : 'storeDcName','width' : '12%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Location Code','datafield' : 'location','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Category','datafield' : 'catgory','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Doc Date','datafield' : 'docDate','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'dd/MM/yyyy'},
			{'text' : 'Doc Type','datafield' : 'docType','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc No','datafield' : 'docNo','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc Sl No','datafield' : 'docSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Weight','datafield' : 'weight','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'}, 
			{'text' : 'UQC','datafield' : 'uqc','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			
		]
	});
}

var failedIssueTransGrid = function(data,fromDate,toDate){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'storeDcName','type' : 'string','map':'storeOrDcName'},
			{'name' : 'location','type' : 'string','map' : 'locationCode'},
			{'name' : 'segment','type' : 'string','map':'segemntDesc'}, 
			{'name' : 'catgory','type' : 'string','map' : 'catDesc'},
			{'name' : 'docDate','type' : 'date','map' : 'docDate'},
			{'name' : 'docType','type' : 'string','map' : 'docType'},
			{'name' : 'docNo','type' : 'int','map' : 'docNo'},
			{'name' : 'docSlNo','type' : 'int','map' : 'docSrlNo'},
			{'name' : 'weight','type' : 'float','map':'issueWt'},
			{'name' : 'uqc','type' : 'string','map':'uom'}, 
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid1").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		pageable : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='background-color: #DAE3EE;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left" style="top: 0px; background-color: #DAE3EE; visibility: visible;font-weight: 600;height: 32px;padding: 5px; border-bottom: 1px solid #a4bed4;"><i class="fa fa-list fa-sm"></i><b>&nbsp;</b>'+' Issues '+'</div>');	
		},
		columns : [
			{'text' : 'Store/DC Name','datafield' : 'storeDcName','width' : '12%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Location Code','datafield' : 'location','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Category','datafield' : 'catgory','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Doc Date','datafield' : 'docDate','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'dd/MM/yyyy'},
			{'text' : 'Doc Type','datafield' : 'docType','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc No','datafield' : 'docNo','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc Sl No','datafield' : 'docSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Weight','datafield' : 'weight','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'}, 
			{'text' : 'UQC','datafield' : 'uqc','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			
		]
	});
}

var failedRecptTransGrid = function(data,fromDate,toDate){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'storeDcName','type' : 'string','map':'storeOrDcName'},
			{'name' : 'location','type' : 'string','map' : 'locationCode'},
			{'name' : 'segment','type' : 'string','map':'segemntDesc'}, 
			{'name' : 'catgory','type' : 'string','map' : 'catDesc'},
			{'name' : 'docDate','type' : 'date','map' : 'docDate'},
			{'name' : 'docType','type' : 'string','map' : 'docType'},
			{'name' : 'docNo','type' : 'int','map' : 'docNo'},
			{'name' : 'docSlNo','type' : 'int','map' : 'docSrlNo'},
			{'name' : 'weight','type' : 'float','map':'receiptWt'},
			{'name' : 'uqc','type' : 'string','map':'uom'}, 
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid2").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		pageable : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='background-color: #DAE3EE;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left" style="top: 0px; background-color: #DAE3EE; visibility: visible;font-weight: 600;height: 32px;padding: 5px; border-bottom: 1px solid #a4bed4;"><i class="fa fa-list fa-sm"></i><b>&nbsp;</b>'+'  Receipts '+'</div>');	
		},
		columns : [
			{'text' : 'Store/DC Name','datafield' : 'storeDcName','width' : '12%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Location Code','datafield' : 'location','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Category','datafield' : 'catgory','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Doc Date','datafield' : 'docDate','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'dd/MM/yyyy'},
			{'text' : 'Doc Type','datafield' : 'docType','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc No','datafield' : 'docNo','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc Sl No','datafield' : 'docSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Weight','datafield' : 'weight','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'}, 
			{'text' : 'UQC','datafield' : 'uqc','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			
		]
	});
}

var failedIssueAccountingGrid = function(data,fromDate,toDate){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'storeDcName','type' : 'string','map':'storeOrDcName'},
			{'name' : 'location','type' : 'string','map' : 'locationCode'},
			{'name' : 'segment','type' : 'string','map':'segemntDesc'}, 
			{'name' : 'catgory','type' : 'string','map' : 'catDesc'},
			{'name' : 'docDate','type' : 'date','map' : 'docDate'},
			{'name' : 'docType','type' : 'string','map' : 'docType'},
			{'name' : 'docNo','type' : 'int','map' : 'docNo'},
			{'name' : 'docSlNo','type' : 'int','map' : 'docSrlNo'},
			{'name' : 'weight','type' : 'float','map':'issueWt'},
			{'name' : 'uqc','type' : 'string','map':'uom'}, 
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid3").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		pageable : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='background-color: #DAE3EE;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left" style="top: 0px; background-color: #DAE3EE; visibility: visible;font-weight: 600;height: 32px;padding: 5px; border-bottom: 1px solid #a4bed4;"><i class="fa fa-list fa-sm"></i><b>&nbsp;</b>'+' Issues '+'</div>');	
		},
		columns : [
			{'text' : 'Store/DC Name','datafield' : 'storeDcName','width' : '12%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Location Code','datafield' : 'location','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Category','datafield' : 'catgory','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Doc Date','datafield' : 'docDate','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'dd/MM/yyyy'},
			{'text' : 'Doc Type','datafield' : 'docType','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc No','datafield' : 'docNo','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc Sl No','datafield' : 'docSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Weight','datafield' : 'weight','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'}, 
			{'text' : 'UQC','datafield' : 'uqc','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			
		]
	});
}

var failedRecptAccountingGrid = function(data,fromDate,toDate){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'storeDcName','type' : 'string','map':'storeOrDcName'},
			{'name' : 'location','type' : 'string','map' : 'locationCode'},
			{'name' : 'segment','type' : 'string','map':'segemntDesc'}, 
			{'name' : 'catgory','type' : 'string','map' : 'catDesc'},
			{'name' : 'docDate','type' : 'date','map' : 'docDate'},
			{'name' : 'docType','type' : 'string','map' : 'docType'},
			{'name' : 'docNo','type' : 'int','map' : 'docNo'},
			{'name' : 'docSlNo','type' : 'int','map' : 'docSrlNo'},
			{'name' : 'weight','type' : 'float','map':'receiptWt'},
			{'name' : 'uqc','type' : 'string','map':'uom'}, 
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid4").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		pageable : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='background-color: #DAE3EE;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left" style="top: 0px; background-color: #DAE3EE; visibility: visible;font-weight: 600;height: 32px;padding: 5px; border-bottom: 1px solid #a4bed4;"><i class="fa fa-list fa-sm"></i><b>&nbsp;</b>'+'  Receipts '+'</div>');	
		},
		columns : [
			{'text' : 'Store/DC Name','datafield' : 'storeDcName','width' : '12%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Location Code','datafield' : 'location','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Category','datafield' : 'catgory','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Doc Date','datafield' : 'docDate','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'dd/MM/yyyy'},
			{'text' : 'Doc Type','datafield' : 'docType','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc No','datafield' : 'docNo','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc Sl No','datafield' : 'docSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Weight','datafield' : 'weight','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'}, 
			{'text' : 'UQC','datafield' : 'uqc','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			
		]
	});
}

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('openCloseBalSumDetReport', 'bodySwitcher')"
});


//Export function 	
$("#export").on("click",function() {
	var data;
	var newData = [];
 var sysdate = moment().format('DDMMYYYYHHmmSS');
	 var rows = $("#jqxgridI").jqxGrid('getrows');
	 var rowR = $("#jqxgridR").jqxGrid('getrows');

	 var fieldFilters = searchFieldFilters();

		fieldFilters.fieldFilters.mode = "Export";
	 if(typeof rows == "undefined" && typeof rowR == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
		}else{	
			
			var rows = $("#jqxgridI").jqxGrid('getdatainformation');
			var rowR = $("#jqxgridR").jqxGrid('getdatainformation');

			if(rows.rowscount != 0 && rowR.rowscount != 0){
			postJSON('/OrderExecution/api/v1/getStoneBalanceReceiptAndIssueReport',JSON.stringify(fieldFilters),function(response) {
		   if(response != null){
       data = response.payload.list;
       for (i = 0; i < data.length; i++) {
    	   var docDt = "";
    	   if(data[i].docDate != null || data[i].docDate != ""){
    		var dateF = new Date(data[i].docDate);
       		var dd = dateF.getDate();
       		var mm = dateF.getMonth() + 1;
       		var yy = dateF.getFullYear();
       		var docDt = dd + "/" + mm + "/" + yy;
    	   }
    	   
			newData.push({
				'Store/DC  Name' : (data[i].storeOrDcName != null) ? data[i].storeOrDcName : "",
				'Segment' : (data[i].segment!= null) ? data[i].segment  : "",
				'Category' : (data[i].category != null) ? data[i].category : "",
				'Doc Date' : docDt	,
				'Doc Type' : (data[i].refType != null) ? data[i].refType : "",
				'Doc No' : (data[i].refId != null) ? data[i].refId	: "",
				'Doc Srl No' : (data[i].refSlNo != null) ? data[i].refSlNo : "",
				'Loc Code' : (data[i].locationCode != null) ? data[i].locationCode : "",
				'Receipt' : (data[i].receiptWt != null) ? data[i].receiptWt.toFixed(3) : "",
				'Issue' : (data[i].IssueWt != null) ? data[i].IssueWt.toFixed(3) : "",
				'Processed Flag' : (data[i].processedFlag != null) ? data[i].processedFlag : "",
           });
					
       }
       var opts = [{sheetid:'Stone_Acct. Summary/Detail',header:true}];
       var res = alasql('SELECT * INTO XLSX("Stone_Acct. Summary/Detail_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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
