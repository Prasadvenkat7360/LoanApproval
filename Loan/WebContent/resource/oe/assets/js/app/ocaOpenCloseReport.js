//num.toFixed(2);
/*  ##	Author UI 		: 	Nageswara Rao
	## 	API Integration	:  	Nageswara Rao
	##  JAVA            :   Nageswara Rao
	##	Date Creation 	: 	22-09-2017
	## 	Description		:	Order Credit to Account - open close wise report UI and Integration.
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

var redirect = function() {
	window.location.href = "javascript:showContentPage('ocaOpenCloseReport', 'bodySwitcher')";
	return window.location.href;
}

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

var onLoadOCAopenClose = function() {
	$.getJSON('/OrderExecution/api/v1/ocaOpenCloseWiseLOVs',function(data) {
		var storeList = data.payload.stores;
		var orderNos = data.payload.orderNos;
		var segments = data.payload.metalSegments;
		var statusList = data.payload.status;
		
		// Store Name LOV
		var s = '<select id="storeNameObj" name="storeNameObj" class="form-control" multiple="multiple">';
			$.each(storeList, function(key, val) {
				s += '<option value="' + val.id + '">' + val.name + '</option>'; 
		 });
		 s += '</select>';
		 
		 $("#storeName").html(s);
		 $('#storeNameObj').multiselect({
		    	includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
		});
		 
		 var o = '<select id="orderNoObj" name="orderNoObj" class="form-control" multiple="multiple">';
			$.each(orderNos, function(key, val) {
				o += '<option value="' + val.id + '">' + val.id + '</option>'; 
			});
			 o += '</select>';
			 
			 $("#orderNo").html(o);
			 $('#orderNoObj').multiselect({
			    	includeSelectAllOption : true,
					enableFiltering : false,
					maxHeight : 250,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
			});
			 
			 
			 var m = '<select id="segmentObj" name="segmentObj" class="form-control" multiple="multiple">';
				$.each(segments, function(key, val) {
					if(val.description != "Diamond"){
					     m += '<option value="' + val.id + '">' + val.description + '</option>';
					   }
					});
				 m += '</select>';
				 
				 $("#segment").html(m);
				 $('#segmentObj').multiselect({
				    	includeSelectAllOption : true,
						enableFiltering : false,
						maxHeight : 250,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
				});
		
		
	 
		var v = '<select id="statusObj" name="statusObj" class="form-control" multiple="multiple">';
			$.each(statusList, function(key, val) {
				v += '<option value="' + val.id + '">' + val.name + '</option>'; 
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
onLoadOCAopenClose();

var ocaOpenCloseFieldFilters = function() {
	var fromDateC = $("#fromDateC").val();
	var toDateC = $("#toDateC").val();
	var segmentC = $("#segment").val();
	var storeC = $("#storeName").val();
	var orderNoC = $("#orderNo").val();
	var statusC = $('#statusObj').val();
	if (statusC == null || statusC == ""){
		var status = "";
	}else{
		var status = statusC.join(",");
	}
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	var storeNameObj = $('#storeNameObj').val();
	if (storeNameObj == null || storeNameObj == "") {
		var storeC = "";
	} else {
		var storeC = storeNameObj.join(",");
	}
	if (storeC != "" && storeC != null) {
		fieldFilters.fieldFilters["storeId"] = storeC;
	}
	if (fromDateC != "" && fromDateC != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateC;
	}
	if (toDateC != "" && toDateC != null) {
		fieldFilters.fieldFilters["toDate"] = toDateC;
	}
	var segmentObj = $('#segmentObj').val();
	if (segmentObj == null || segmentObj == "") {
		var segmentC = "";
	} else {
		var segmentC = segmentObj.join(",");
	}
	if (segmentC != "" && segmentC != null) {
		fieldFilters.fieldFilters["segmentId"] = segmentC;
	}
	var orderNoObj = $('#orderNoObj').val();
	if (orderNoObj == null || orderNoObj == "") {
		var orderNoC = "";
	} else {
		var orderNoC = orderNoObj.join(",");
	}
	if (orderNoC != "" && orderNoC != null) {
		fieldFilters.fieldFilters["orderNo"] = orderNoC;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}	
	return fieldFilters;
};

function searchOcaGrid() {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	var datafields = [ 
		{'name' : 'store', 'type' : 'string', 'map': 'store>name'}, 
		{'name' : 'orderDate', 'type' : 'date'},
		{'name' : 'orderNo', 'type' : 'long'},
		{'name' : 'orderSrlNo', 'type' : 'long', 'map' : 'id'},
		{'name' : 'vsNo', 'type' : 'long', 'map' : 'refDocNo'},
		{'name' : 'vsSrlNo', 'type' : 'long', 'map' : 'refDocSl'},
		{'name' : 'location', 'type' : 'string', 'map' : 'locationCode'},
		{'name' : 'segment', 'type' : 'string', 'map' : 'segment>description'},
		{'name' : 'jewelType', 'type' : 'string',	'map' : 'jewelTypeDescription'},
		{'name' : 'pieces', 'type' : 'long','map' : 'pieces'}, 
		{'name' : 'grossWt', 'type' : 'float', 'map' : 'postProcessGrossWeight'},
		{'name' : 'netWt', 'type' : 'float', 'map' : 'postProcessNetWeight'},
		{'name' : 'expPurityPerc', 'type' : 'float', 'map' : 'xrfPurity'}, 
		{'name' : 'expPureWt', 'type' : 'float', 'map' : 'estimatedPureWeight'},
		{'name' : 'rc', 'type' : 'float', 'map' : 'rcRate'},
		{'name' : 'hc', 'type' : 'float', 'map' : 'ecRate'},
		{'name' : 'orderGoldRate', 'type' : 'float', 'map' : 'orderDateMetalRate'},
		{'name' : 'orderStatus', 'type' : 'string', 'map' : 'orderStatus'},
		{'name' : 'orderStatusDate', 'type' : 'date', 'map' : 'orderStatusDate'},
		{'name' : 'createdBy', 'type' : 'string', 'map' : 'createdBy'}];
	var columns = [ {
		'text' : 'Store Name',
		'datafield' : 'store',
		'width' : '7%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Order Date',
		'datafield' : 'orderDate',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'dd/MM/yyyy',
		editable : false,
		sortable : false
	}, {
		'text' : 'Order No.',
		'datafield' : 'orderNo',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'Order Sl.No.',
		'datafield' : 'orderSrlNo',
		'width' : '4%',
		cellsalign : 'left',
		align : 'center',
		editable : false,
		sortable : false,
		hidden:true 
	}, {
		'text' : 'Val.Slip.No.',
		'datafield' : 'vsNo',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Val.Slip.Sl.No.',
		'datafield' : 'vsSrlNo',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'Location',
		'datafield' : 'location',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Met.Seg.',
		'datafield' : 'segment',
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'J.Type',
		'datafield' : 'jewelType',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Pcs',
		'datafield' : 'pieces',
		'width' : '3%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : true
	}, {
		'text' : 'G.Wt',
		'datafield' : 'grossWt',
		'width' : '5%',
		cellsalign : 'right',
		columntype : 'numberinput',
		cellsformat : 'd3',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'N.Wt',
		'datafield' : 'netWt',
		'width' : '5%',
		cellsalign : 'right',
		columntype : 'numberinput',
		cellsformat : 'd3',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Exp.Purity %',
		'datafield' : 'expPurityPerc',
		'width' : '4%',
		cellsalign : 'right',
		columntype : 'numberinput',
		cellsformat : 'd2',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Exp.Pure Wt',
		'datafield' : 'expPureWt',
		'width' : '5%',
		cellsalign : 'right',
		align : 'center',
		columntype : 'numberinput',
		cellsformat : 'd3',
		editable : false,
		sortable : false
	}, {
		'text' : 'RC in Rs.',
		'datafield' : 'rc',
		'width' : '4%',
		cellsalign : 'right',
		align : 'center',
		columntype : 'numberinput',
		cellsformat : 'd2',
		editable : false,
		sortable : false
	}, {
		'text' : 'HC in Rs.',
		'datafield' : 'hc',
		'width' : '4%',
		cellsalign : 'right',
		align : 'center',
		columntype : 'numberinput',
		cellsformat : 'd2',
		editable : false,
		sortable : false
	}, {
		'text' : 'Order Date Gold Rate',
		'datafield' : 'orderGoldRate',
		'width' : '6%',
		cellsalign : 'right',
		columntype : 'numberinput',
		cellsformat : 'd2',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Order Status',
		'datafield' : 'orderStatus',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'Order Status Date',
		'datafield' : 'orderStatusDate',
		'width' : '7%',
		cellsalign : 'center',
		cellsformat : 'dd/MM/yyyy',
		align : 'center',
		editable : false,
		sortable : false
	}, {
		'text' : 'SE Name',
		'datafield' : 'createdBy',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		sortable : false
	}];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchOCAOpenCloseWise?page=search", "list",columns, ocaOpenCloseFieldFilters(), updateRows);
	$("#jqxgrid").jqxGrid({		
		width : '100%',
        sortable: true,            
     	altrows: true,
     	autorowheight :true,
        autoheight :true,
    	theme: 'energyblue',
        columnsheight: 55,
        columnsresize: true,  
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
	});
}


$("#searchSA").on("click",function(){
	var fromDateC = $("#fromDateC").val();
	var toDateC = $("#toDateC").val();
	
	if((fromDateC == "" || fromDateC == null) || (toDateC == "" || toDateC == null)){
		$.growl.error({
			message : "Please select mandatory fields.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	searchOcaGrid();
	$("#jqxgrid").show();
})

$("#ClearAll").on("click", function() {
	redirect();
});

//Export Record as per search criteria
$("#exportSA").on("click",function() {
	var data;
	var newData = [];
	var fromDateC = $("#fromDateC").val();
	var toDateC = $("#toDateC").val();
	var segmentC = $("#segment").val();
	var storeC = $("#storeName").val();
	var orderNoC = $("#orderNo").val();
	var statusC = $('#statusObj').val();
	if (statusC == null || statusC == ""){
		var status = "";
	}else{
		var status = statusC.join(",");
	}
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (storeC != "" && storeC != null) {
		fieldFilters.fieldFilters["storeId"] = storeC;
	}
	if (fromDateC != "" && fromDateC != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateC;
	}
	if (toDateC != "" && toDateC != null) {
		fieldFilters.fieldFilters["toDate"] = toDateC;
	}
	if (segmentC != "" && segmentC != null) {
		fieldFilters.fieldFilters["segmentId"] = segmentC;
	}
	if (orderNoC != "" && orderNoC != null) {
		fieldFilters.fieldFilters["orderNo"] = orderNoC;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
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
             postJSON('/OrderExecution/api/v1/searchOCAOpenCloseWise?page=export',JSON.stringify(fieldFilters),function(response) {
    	     if(response != null){
	         data = response.payload.list;
		     for (i = 0; i < data.length; i++) {
			     newData.push({
	    	            'Store Name' : (data[i].store != null) ? data[i].store.name : "",
					    'Order Date' : (data[i].orderDate != null) ? data[i].orderDate : "",
						'Order No.' : (data[i].orderNo!= null) ? data[i].orderNo : "",
						//'Order Sl.No.' : (data[i].id != null) ? data[i].id : "",
						'Val.Slip.No.' : (data[i].refDocNo != null) ? data[i].refDocNo : "",
						'Val.Slip.Sl.No.' : (data[i].refDocSl != null) ? data[i].refDocSl : "",
						'Location' : (data[i].locationCode != null) ? data[i].locationCode : "",
						'Metal Segment' : (data[i].segment != null) ? data[i].segment.description : "",
						'Jewel Type' : (data[i].jewelTypeDescription != null) ? data[i].jewelTypeDescription : "",
						'Pieces' : (data[i].pieces != null) ? data[i].pieces : "",
						'Gross Wt ' : (data[i].postProcessGrossWeight != null) ? data[i].postProcessGrossWeight : "",
						'Net Wt' : (data[i].postProcessNetWeight != null) ? data[i].postProcessNetWeight : "",
						'Exp.Purity %' : (data[i].xrfPurity != null) ? data[i].xrfPurity : "",		
						'Exp.Pure Wt' : (data[i].estimatedPureWeight != null) ? data[i].estimatedPureWeight : "",
						'RC in Rs.' : (data[i].rcRate != null) ? data[i].rcRate : "",
						'HC in Rs.' : (data[i].ecRate != null) ? data[i].ecRate : "",
						'Order Date Gold Rate' : (data[i].orderDateMetalRate != null) ? data[i].orderDateMetalRate : "",
						'Order Status' : (data[i].orderStatus != null) ? data[i].orderStatus : "",
						'Order Status Date' : (data[i].orderStatusDate != null) ? data[i].orderStatusDate : "",
						'SE Name' : (data[i].createdBy != null) ? data[i].createdBy : ""
			     		});
				
		     			}
		     		//JSONToCSVConvertor(newData,	"Credit_Account_Order_Open_close_wise" + "_" + sysdate, true);
				     var opts = [{sheetid:'Credit_Account_Order_Open_close_wise',header:true}];
		             var res = alasql('SELECT * INTO XLSX("Credit Account Order Open close wise_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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


//Print Functionality to be done by Venkat
//#######################################
$("#printCA").on('click', function() {
	var fromDateC = $("#fromDateC").val();
	var toDateC = $("#toDateC").val();
	var segmentC = $("#segment").val();
	var storeC = $("#storeName").val();
	var orderNoC = $("#orderNo").val();
	var statusC = $('#statusObj').val();
	if (statusC == null || statusC == ""){
		var status = "C,F,PC";
	}else{
		var status = statusC.join(",");
	}
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	var storeNameObj = $('#storeNameObj').val();
	if (storeNameObj == null || storeNameObj == "") {
		var storeC = "";
	} else {
		var storeC = storeNameObj.join(",");
	}
	if (storeC != "" && storeC != null) {
		fieldFilters.fieldFilters["storeId"] = storeC;
	}
	if (fromDateC != "" && fromDateC != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateC;
	}
	if (toDateC != "" && toDateC != null) {
		fieldFilters.fieldFilters["toDate"] = toDateC;
	}
	var segmentObj = $('#segmentObj').val();
	if (segmentObj == null || segmentObj == "") {
		var segmentC = "";
	} else {
		var segmentC = segmentObj.join(",");
	}
	if (segmentC != "" && segmentC != null) {
		fieldFilters.fieldFilters["segmentId"] = segmentC;
	}
	var orderNoObj = $('#orderNoObj').val();
	if (orderNoObj == null || orderNoObj == "") {
		var orderNoC = "";
	} else {
		var orderNoC = orderNoObj.join(",");
	}
	if (orderNoC != "" && orderNoC != null) {
		fieldFilters.fieldFilters["orderNo"] = orderNoC;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}	
	
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : fromDateC,
			"ToDate" : toDateC,
			"storeId":storeC,
			"orderId":orderNoC,
			"SegmentId":segmentC,
			"orderStatus":status,
			"mode" : "pdf",
			"reportName" : "RPT_Credit_To_Acc_Order_wise_Open_Close"
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
				navigator.msSaveBlob(file, 'RPT_Credit_To_Acc_Order_wise_Open_Close.pdf');
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
