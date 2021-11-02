// date picker functions
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

$("#fromDateL").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateL").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateL").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

$("#accFromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#accToDateS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#accToDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

$("#FgStockReport").hide();
$("#lsStockReport").hide();
$("#accStockReport").hide();

$("#looseStoneStock").on('change',function(){
	$("#fromDateS").val("");
	$("#toDateS").val("");
	
	$("#fromDateL").val("");
	$("#toDateL").val("");
	
	$("#accFromDateS").val("");
	$("#accToDateS").val("");
 var type = $("#looseStoneStock").val();
	if(type == "fg"){
		$("#FgStockReport").show();
		$("#lsStockReport").hide();
		$("#accStockReport").hide();
		$("#jqxgrid").hide();
		
		fgOnloadFunction();
	}else if(type == "stone"){
		$("#FgStockReport").hide();
		$("#lsStockReport").show();
		$("#accStockReport").hide();
		$("#jqxgrid").hide();
		
		stoneOnloadFunction();
	}else{
		$("#FgStockReport").hide();
		$("#lsStockReport").hide();
		$("#accStockReport").show();
		$("#jqxgrid").hide();
		
		accOnloadFunction()
	}
});

var fgOnloadFunction = function(){
	$.getJSON('/OrderExecution/api/v1/consignmentSalesReceiptAvilableReportLOV', function(data) {
		if(data.resCode == "1"){
			var v = '<select id="vendCodeObjS"  name="vendCodeObjS" class="form-control" multiple="multiple">';
			$.each(data.payload.vendorCodes, function(key, val) {
			v += '<option value="' + val.vendorCode + '">' + val.vendorCode + '</option>'; });
			v += '</select>';
			$("#vendorCodeS").html(v);
			$('#vendCodeObjS').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			var a = '<select id="artSegObjS"  name="artSegObjS" class="form-control" multiple="multiple">';
			$.each(data.payload.segments, function(key, val) {
			a += '<option value="' + val.description + '">' + val.description + '</option>'; });
			a += '</select>';
			$("#artSegS").html(a);
			$('#artSegObjS').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			var g = '<select id="grvNoObjS"  name="grvNoObjS" class="form-control" multiple="multiple">';
			$.each(data.payload.grvNumbers, function(key, val) {
			g += '<option value="' + val.id + '">' + val.id + '</option>'; });
			g += '</select>';
			$("#grvNoS").html(g);
			$('#grvNoObjS').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
		
	});
}



function consignmentFgGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ 
		{'name' : 'vCode','type' : 'string','map':'vendorCode'},
		{'name' : 'date','type' : 'string','map':'createdDate'},
		{'name' : 'grvNo','type' : 'string','map':'mrvHeader'},
		{'name' : 'grvSlNo','type' : 'string','map':'mrvSrlNo'},
		{'name' : 'vendInvRef','type' : 'string','map':'partBillNumber'},
		{'name' : 'vendInvDate','type' : 'string','map':'partBillDate'},
		{'name' : 'artSeg','type' : 'int','map':'segmentDescription'},
		{'name' : 'skinPurity','type' : 'float','map':'skinPurity'},
		
		{'name' : 'recPcs','type' : 'int','map':'receiptPcs'},
		{'name' : 'recGrsWt','type' : 'float','map':'receiptGrossWt'},
		{'name' : 'recNetWt','type' : 'float','map':'receiptNetWt'},
		{'name' : 'receiptCostValueInRs','type' : 'float','map':'receiptCostValueInRs'},

		{'name' : 'retPcs','type' : 'int','map':'returnedPcs'},
		{'name' : 'retGrsWt','type' : 'float','map':'returnedGrossWt'},
		{'name' : 'retNetWt','type' : 'float','map':'returnedNetWt'},
		{'name' : 'returnedCostValueInRs','type' : 'float','map':'returnedCostValueInRs'},

		{'name' : 'salePcs','type' : 'int','map':'salePcs'},
		{'name' : 'saleGrsWt','type' : 'float','map':'saleGrossWt'},
		{'name' : 'saleNetWt','type' : 'float','map':'saleNetWt'},
		{'name' : 'saleCostValueInRs','type' : 'float','map':'saleCostValueInRs'},

		{'name' : 'avlPcs','type' : 'float','map':'avilablePcs'},
		{'name' : 'grossWeight','type' : 'float','map':'avilableGrossWt'},
		{'name' : 'netWeight','type' : 'float','map':'avilableNetWt'},
		{'name' : 'avilableCostValueInRs','type' : 'float','map':'avilableCostValueInRs'},

		];

	var columns = [
		{'text' : 'Vendor Code','datafield' : 'vCode',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Date','datafield' : 'date',cellsalign : 'center',align : 'center','width' : '7%',sortable : true,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'GRV No','datafield' : 'grvNo',cellsalign : 'center',align : 'center','width' : '6%',sortable : true,editable : false},
		{'text' : 'GRV Sl No','datafield' : 'grvSlNo',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false},
		{'text' : 'Vendor Invoice Ref','datafield' : 'vendInvRef',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false,},
		{'text' : 'Vendor Invoice Date','datafield' : 'vendInvDate',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false},
		{'text' : 'Article Segment','datafield' : 'artSeg',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false},
		{'text' : 'Skin Purity','datafield' : 'skinPurity',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,cellsformat:'d2',
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Total : </b></span>';
				}
		},
		
		{'text' : 'Pcs','datafield' : 'recPcs',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "receipt",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['recPcs'] == null) ? 0 : record['recPcs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Gross Wt.','datafield' : 'recGrsWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "receipt",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['recGrsWt'] == null) ? 0 : record['recGrsWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Net Wt.','datafield' : 'recNetWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "receipt",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['recNetWt'] == null) ? 0 : record['recNetWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Cost Val in Rs.','datafield' : 'receiptCostValueInRs',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "receipt",cellsformat:'d2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['receiptCostValueInRs'] == null) ? 0 : record['receiptCostValueInRs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Pcs','datafield' : 'salePcs',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "sale",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcs'] == null) ? 0 : record['salePcs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Gross Wt.','datafield' : 'saleGrsWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "sale",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGrsWt'] == null) ? 0 : record['saleGrsWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Net Wt.','datafield' : 'saleNetWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "sale",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleNetWt'] == null) ? 0 : record['saleNetWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Cost Val in Rs.','datafield' : 'saleCostValueInRs',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "sale",cellsformat:'d2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleCostValueInRs'] == null) ? 0 : record['saleCostValueInRs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Pcs','datafield' : 'retPcs',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "return",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['retPcs'] == null) ? 0 : record['retPcs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Gross Wt.','datafield' : 'retGrsWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "return",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['retGrsWt'] == null) ? 0 : record['retGrsWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Net Wt.','datafield' : 'retNetWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "return",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['retNetWt'] == null) ? 0 : record['retNetWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Cost Val in Rs.','datafield' : 'returnedCostValueInRs',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "return",cellsformat:'d2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['returnedCostValueInRs'] == null) ? 0 : record['returnedCostValueInRs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Pcs','datafield' : 'avlPcs',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "available",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avlPcs'] == null) ? 0 : record['avlPcs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Gross Wt.','datafield' : 'grossWeight',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "available",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['grossWeight'] == null) ? 0 : record['grossWeight'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.000';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Net Wt.','datafield' : 'netWeight',cellsalign : 'right',align : 'center','width' : '6	%',sortable : false,editable : false,columngroup : "available",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['netWeight'] == null) ? 0 : record['netWeight'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.000';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Cost Val in Rs.','datafield' : 'avilableCostValueInRs',cellsalign : 'right',align : 'center','width' : '6	%',sortable : false,editable : false,columngroup : "available",cellsformat:'d2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avilableCostValueInRs'] == null) ? 0 : record['avilableCostValueInRs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.000';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
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
		showaggregates: true,
		showstatusbar: true,
			columngroups : [ {
				text : 'Receipt',
				name : 'receipt',
				align : 'center'
			},{
				text : 'Return',
				name : 'return',
				align : 'center'
			},{
				text : 'Sales',
				name : 'sale',
				align : 'center'
			} ,{
				text : 'Available',
				name : 'available',
				align : 'center'
			}]
		});
}

var consignmentFgFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	var vendCodeObjS = $('#vendCodeObjS').val();
	if (vendCodeObjS == null || vendCodeObjS == ""){
		var vCode = "";
	}else{
		var vCode = vendCodeObjS.join(",");
	}

	var grvNoObjS = $('#grvNoObjS').val();
	if (grvNoObjS == null || grvNoObjS == ""){
		var grvNo = "";
	}else{
		var grvNo = grvNoObjS.join(",");
	}
	
	var artSegObjS = $('#artSegObjS').val();
	if (artSegObjS == null || artSegObjS == ""){
		var artSeg = "";
	}else{
		var artSeg = artSegObjS.join(",");
	}
	
	if (artSeg != "" && artSeg != null) {
		fieldFilters.fieldFilters["segmentList"] = artSeg;
	}
	if (grvNo != "" && grvNo != null) {
		fieldFilters.fieldFilters["mrvNoList"] = grvNo;
	}
	if (vCode != "" && vCode != null) {
		fieldFilters.fieldFilters["vendorCodeList"] = vCode;
	}
	
	return fieldFilters;
}


$("#searchF").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" ){
		$.growl.error({
			message : "Please Select From and To Date !!",
			duration : 10000,
			title :'Error'
		});
		return false;
	}
	postJSON('/OrderExecution/api/v1/consignmentSalesReceiptAvilableSearch?mode=Export',JSON.stringify(consignmentFgFieldFilters()),function(response) {
		if(response.resCode == "1"){
			consignmentFgGrid(response.payload.list);
			$("#jqxgrid").show();
		}else{
			consignmentFgGrid();
			$("#jqxgrid").show();
		}
	});
});

//Export function for Customer Order Due
$("#exportF").on("click",function() {
	var data;
	var newData = [];
	var fieldFilters = consignmentFgFieldFilters();
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
			postJSON('/OrderExecution/api/v1/consignmentSalesReceiptAvilableSearch?mode=Export',JSON.stringify(fieldFilters),function(response) {
		   if(response != null){
           data = response.payload.list;
           for (i = 0; i < data.length; i++) {
        	   
			newData.push({
				'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode : "",
				'Date' :  (data[i].createdDate != null) ? data[i].createdDate : "",
				'GRV No' : (data[i].mrvHeader!= null) ? data[i].mrvHeader  : "",
				'GRV Sl No' : (data[i].mrvSrlNo != null) ? data[i].mrvSrlNo : "",
				'Vendor Invoice Ref' : (data[i].partBillNumber != null) ? data[i].partBillNumber : "",
				'Vendor Invoice Date' : (data[i].partBillDate != null) ? data[i].partBillDate	: "",
				'Article Segment' : (data[i].segmentDescription != null) ? data[i].segmentDescription : "",
				'Skin Purity' : (data[i].skinPurity != null) ? data[i].skinPurity : "",
				'Receipt Pcs' : (data[i].receiptPcs != null) ? data[i].receiptPcs : "",
                'Receipt Gross Wt' : (data[i].receiptGrossWt != null) ? data[i].receiptGrossWt.toFixed(3) : "",
				'Receipt Net Wt' : (data[i].receiptNetWt != null) ? data[i].receiptNetWt.toFixed(3) : "",
				'Receipt Cost Val in Rs.' : (data[i].receiptCostValueInRs != null) ? data[i].receiptCostValueInRs.toFixed(2) : "",

				'Sale Pcs' : (data[i].salePcs != null) ? data[i].salePcs : "",
				'Sale Gross Wt' : (data[i].saleGrossWt != null) ? data[i].saleGrossWt.toFixed(3) : "",
				'Sale Net Wt' : (data[i].saleNetWt != null) ? data[i].saleNetWt.toFixed(3) : "",
				'Sale Cost Val in Rs.' : (data[i].saleCostValueInRs != null) ? data[i].saleCostValueInRs.toFixed(2) : "",

				'Return Pcs' : (data[i].returnedPcs != null) ? data[i].returnedPcs : "",
				'Return Gross Wt' : (data[i].returnedGrossWt != null) ? data[i].returnedGrossWt.toFixed(3) : "",
				'Return Net Wt' : (data[i].returnedNetWt != null) ? data[i].returnedNetWt.toFixed(3) : "",
				'Return Cost Val in Rs.' : (data[i].returnedCostValueInRs != null) ? data[i].returnedCostValueInRs.toFixed(2) : "",

				'Available Pcs' : (data[i].avilablePcs != null) ? data[i].avilablePcs : "",
				'Available Gross Wt' : (data[i].avilableGrossWt != null) ? data[i].avilableGrossWt.toFixed(3) : "",
				'Available Net Wt' : (data[i].avilableNetWt != null) ? data[i].avilableNetWt.toFixed(3) : "",
				'Available Cost Val in Rs.' : (data[i].avilableCostValueInRs != null) ? data[i].avilableCostValueInRs.toFixed(2) : "",

               });
					
           }
           var opts = [{sheetid:'Consignment Available Receipt Return FG',header:true}];
           var res = alasql('SELECT * INTO XLSX("Consignment Available Receipt Return Report FG_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('consignmentAvlReceiptReturnReport', 'bodySwitcher')"
});

$("#clearAllLs").on('click',function(){
	window.location.href="javascript:showContentPage('consignmentAvlReceiptReturnReport', 'bodySwitcher')"
});

$("#clearAllAcc").on('click',function(){
	window.location.href="javascript:showContentPage('consignmentAvlReceiptReturnReport', 'bodySwitcher')"
});



// Loose Stone Section

var stoneOnloadFunction = function(){
	var mainCat = '<select id="mainCatObjLS" class="form-control" multiple="multiple"></select>';
	$("#mainCatLs").html(mainCat);
	$('#mainCatObjLS').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	$.getJSON('/OrderExecution/api/v1/consignmentSalesReceiptAvilableReportLooseStoneLOV', function(data) {
		if(data.resCode == "1"){
			var v = '<select id="vendorCodeObjLS"  name="vendorCodeObjLS" class="form-control" multiple="multiple">';
			$.each(data.payload.vendorCodes, function(key, val) {
			v += '<option value="' + val.vendorCode + '">' + val.vendorCode + '</option>'; });
			v += '</select>';
			$("#vendorCodeL").html(v);
			$('#vendorCodeObjLS').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			var a = '<select id="stoneSegmentObjS"  name="stoneSegmentObjS" class="form-control" multiple="multiple">';
			$.each(data.payload.segments, function(key, val) {
			a += '<option value="' + val.id + '">' + val.description + '</option>'; });
			a += '</select>';
			$("#stoneSegment").html(a);
			$('#stoneSegmentObjS').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			var g = '<select id="grvNoObjLS"  name="grvNoObjLS" class="form-control" multiple="multiple">';
			$.each(data.payload.grvNumbers, function(key, val) {
			g += '<option value="' + val.id + '">' + val.id + '</option>'; });
			g += '</select>';
			$("#grvNoL").html(g);
			$('#grvNoObjLS').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
		
	});
}

$("#stoneSegment").on('change',function(){
	var stoneSegmentObjS = $("#stoneSegmentObjS").val();
	stoneSegmentObjS = stoneSegmentObjS.join(',');
	
	$.getJSON('/OrderExecution/api/v1/consignmentSalesReceiptAvilableReportLooseStoneLOV?segmentId='+stoneSegmentObjS.toString(), function(data) {
		if(data.resCode == "1"){
			var m = '<select id="mainCatObjLS"  name="mainCatObjLS" class="form-control" multiple="multiple">';
			$.each(data.payload.stoneCat, function(key, val) {
			m += '<option value="' + val.description + '">' + val.description + '</option>'; });
			m += '</select>';
			$("#mainCatLs").html(m);
			$('#mainCatObjLS').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
	});
});

var consignmentLsFieldFilters = function() {
	var fromDateL = $("#fromDateL").val();
	var toDateL = $("#toDateL").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateL != "" && fromDateL != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateL;
	}
	if (toDateL != "" && toDateL != null) {
		fieldFilters.fieldFilters["toDate"] = toDateL;
	}
	
	var vendorCodeObjLS = $('#vendorCodeObjLS').val();
	if (vendorCodeObjLS == null || vendorCodeObjLS == ""){
		var vCode = "";
	}else{
		var vCode = vendorCodeObjLS.join(",");
	}

	var grvNoObjLS = $('#grvNoObjLS').val();
	if (grvNoObjLS == null || grvNoObjLS == ""){
		var grvNo = "";
	}else{
		var grvNo = grvNoObjLS.join(",");
	}
	
	var stoneSegmentObjS = $('#stoneSegmentObjS').val();
	if (stoneSegmentObjS == null || stoneSegmentObjS == ""){
		var stoneSeg = "";
	}else{
		var stoneSeg = stoneSegmentObjS.join(",");
	}
	
	var mainCatObjLS = $('#mainCatObjLS').val();
	if (mainCatObjLS == null || mainCatObjLS == ""){
		var mainCat = "";
	}else{
		var mainCat = mainCatObjLS.join(",");
	}
	
	if (stoneSeg != "" && stoneSeg != null) {
		fieldFilters.fieldFilters["segmentList"] = stoneSeg;
	}
	if (grvNo != "" && grvNo != null) {
		fieldFilters.fieldFilters["mrvNoList"] = grvNo;
	}
	if (vCode != "" && vCode != null) {
		fieldFilters.fieldFilters["vendorCodeList"] = vCode;
	}
	if (mainCat != "" && mainCat != null) {
		fieldFilters.fieldFilters["catList"] = mainCat;
	}
	return fieldFilters;
}

function consignmentLsGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ 
		{'name' : 'vCode','type' : 'string','map':'vendorCode'},
		{'name' : 'date','type' : 'string','map':'createdDate'},
		{'name' : 'grvNo','type' : 'string','map':'mrvHeader'},
		{'name' : 'grvSlNo','type' : 'string','map':'mrvSrlNo'},
		{'name' : 'vendInvRef','type' : 'string','map':'partBillNumber'},
		{'name' : 'vendInvDate','type' : 'string','map':'partBillDate'},
		{'name' : 'segmentDescription','type' : 'int','map':'segmentDescription'},
		{'name' : 'catDescription','type' : 'float','map':'catDescription'},
		{'name' : 'uqc','type' : 'float','map':'uqc'},

		{'name' : 'recPcs','type' : 'int','map':'receiptPcs'},
		{'name' : 'recGrsWt','type' : 'float','map':'receiptStoneWt'},
		{'name' : 'receiptCostValueInRs','type' : 'float','map':'receiptCostValueInRs'},

		{'name' : 'retPcs','type' : 'int','map':'returnedPcs'},
		{'name' : 'retGrsWt','type' : 'float','map':'returnedStoneWt'},
		{'name' : 'returnedCostValueInRs','type' : 'float','map':'returnedCostValueInRs'},

		{'name' : 'salePcs','type' : 'int','map':'salePcs'},
		{'name' : 'saleGrsWt','type' : 'float','map':'saleStoneWt'},
		{'name' : 'saleCostValueInRs','type' : 'float','map':'saleCostValueInRs'},

		{'name' : 'avlPcs','type' : 'float','map':'avilablePcs'},
		{'name' : 'grossWeight','type' : 'float','map':'availbleStoneWt'},
		{'name' : 'avilableCostValueInRs','type' : 'float','map':'avilableCostValueInRs'},

		];

	var columns = [
		{'text' : 'Vendor Code','datafield' : 'vCode',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Date','datafield' : 'date',cellsalign : 'center',align : 'center','width' : '7%',sortable : true,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'GRV No','datafield' : 'grvNo',cellsalign : 'center',align : 'center','width' : '6%',sortable : true,editable : false},
		{'text' : 'GRV Sl No','datafield' : 'grvSlNo',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false},
		{'text' : 'Vendor Invoice Ref','datafield' : 'vendInvRef',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false,},
		{'text' : 'Vendor Invoice Date','datafield' : 'vendInvDate',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false},
		{'text' : 'Stone Segment','datafield' : 'segmentDescription',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false},
		{'text' : 'Main Category','datafield' : 'catDescription',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false},

		{'text' : 'UQC','datafield' : 'uqc',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,cellsformat:'d2',
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Total : </b></span>';
				}
		},
		
		{'text' : 'Pcs','datafield' : 'recPcs',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "receipt",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['recPcs'] == null) ? 0 : record['recPcs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Stone Wt.','datafield' : 'recGrsWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "receipt",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['recGrsWt'] == null) ? 0 : record['recGrsWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		/*{'text' : 'Net Wt.','datafield' : 'recNetWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "receipt",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['recNetWt'] == null) ? 0 : record['recNetWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},*/
		{'text' : 'Cost Val in Rs.','datafield' : 'receiptCostValueInRs',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "receipt",cellsformat:'d2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['receiptCostValueInRs'] == null) ? 0 : record['receiptCostValueInRs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Pcs','datafield' : 'salePcs',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "sale",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcs'] == null) ? 0 : record['salePcs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Stone Wt.','datafield' : 'saleGrsWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "sale",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGrsWt'] == null) ? 0 : record['saleGrsWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		/*{'text' : 'Net Wt.','datafield' : 'saleNetWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "sale",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleNetWt'] == null) ? 0 : record['saleNetWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},*/
		{'text' : 'Cost Val in Rs.','datafield' : 'saleCostValueInRs',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "sale",cellsformat:'d2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleCostValueInRs'] == null) ? 0 : record['saleCostValueInRs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Pcs','datafield' : 'retPcs',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "return",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['retPcs'] == null) ? 0 : record['retPcs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Stone Wt.','datafield' : 'retGrsWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "return",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['retGrsWt'] == null) ? 0 : record['retGrsWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		/*{'text' : 'Net Wt.','datafield' : 'retNetWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "return",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['retNetWt'] == null) ? 0 : record['retNetWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},*/
		{'text' : 'Cost Val in Rs.','datafield' : 'returnedCostValueInRs',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "return",cellsformat:'d2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['returnedCostValueInRs'] == null) ? 0 : record['returnedCostValueInRs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Pcs','datafield' : 'avlPcs',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "available",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avlPcs'] == null) ? 0 : record['avlPcs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Stone Wt.','datafield' : 'grossWeight',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "available",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['grossWeight'] == null) ? 0 : record['grossWeight'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.000';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		/*{'text' : 'Net Wt.','datafield' : 'netWeight',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "available",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['netWeight'] == null) ? 0 : record['netWeight'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.000';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},*/
		{'text' : 'Cost Val in Rs.','datafield' : 'avilableCostValueInRs',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "available",cellsformat:'d2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avilableCostValueInRs'] == null) ? 0 : record['avilableCostValueInRs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
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
		showaggregates: true,
		showstatusbar: true,
			columngroups : [ {
				text : 'Receipt',
				name : 'receipt',
				align : 'center'
			},{
				text : 'Return',
				name : 'return',
				align : 'center'
			},{
				text : 'Sales',
				name : 'sale',
				align : 'center'
			} ,{
				text : 'Available',
				name : 'available',
				align : 'center'
			}]
		});
}

$("#searchLs").on('click',function(){
	if($("#fromDateL").val() == "" || $("#toDateL").val() == "" ){
		$.growl.error({
			message : "Please Select From and To Date !!",
			duration : 10000,
			title :'Error'
		});
		return false;
	}
	postJSON('/OrderExecution/api/v1/consignmentSalesReceiptAvilableLooseStoneSearch?mode=Export',JSON.stringify(consignmentLsFieldFilters()),function(response) {
		if(response.resCode == "1"){
			consignmentLsGrid(response.payload.list);
			$("#jqxgrid").show();
		}else{
			consignmentLsGrid();
			$("#jqxgrid").show();
		}
	});
});

//Export function for LS
$("#exportLs").on("click",function() {
	var data;
	var newData = [];
	var fieldFilters = consignmentLsFieldFilters();
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
			postJSON('/OrderExecution/api/v1/consignmentSalesReceiptAvilableLooseStoneSearch?mode=Export',JSON.stringify(fieldFilters),function(response) {
		   if(response != null){
           data = response.payload.list;
           for (i = 0; i < data.length; i++) {
        	   
			newData.push({
				'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode : "",
				'Date' :  (data[i].createdDate != null) ? data[i].createdDate : "",
				'GRV No' : (data[i].mrvHeader!= null) ? data[i].mrvHeader  : "",
				'GRV Sl No' : (data[i].mrvSrlNo != null) ? data[i].mrvSrlNo : "",
				'Vendor Invoice Ref' : (data[i].partBillNumber != null) ? data[i].partBillNumber : "",
				'Vendor Invoice Date' : (data[i].partBillDate != null) ? data[i].partBillDate	: "",
				'Stone Segment' : (data[i].segmentDescription != null) ? data[i].segmentDescription : "",
				'Main Category' : (data[i].catDescription != null) ? data[i].catDescription : "",
				'UQC' : (data[i].uqc != null) ? data[i].uqc : "",

				'Receipt Pcs' : (data[i].receiptPcs != null) ? data[i].receiptPcs : "",
                'Receipt Stone Wt' : (data[i].receiptStoneWt != null) ? data[i].receiptStoneWt.toFixed(3) : "",
				'Receipt Cost Val in Rs.' : (data[i].receiptCostValueInRs != null) ? data[i].receiptCostValueInRs.toFixed(2) : "",

				'Sale Pcs' : (data[i].salePcs != null) ? data[i].salePcs : "",
				'Sale Stone Wt' : (data[i].saleStoneWt != null) ? data[i].saleStoneWt.toFixed(3) : "",
				'Sale Cost Val in Rs.' : (data[i].saleCostValueInRs != null) ? data[i].saleCostValueInRs.toFixed(2) : "",

				'Return Pcs' : (data[i].returnedPcs != null) ? data[i].returnedPcs : "",
				'Return Stone Wt' : (data[i].returnedStoneWt != null) ? data[i].returnedStoneWt.toFixed(3) : "",
				'Return Cost Val in Rs.' : (data[i].returnedCostValueInRs != null) ? data[i].returnedCostValueInRs.toFixed(2) : "",

				'Available Pcs' : (data[i].avilablePcs != null) ? data[i].avilablePcs : "",
				'Available Stone Wt' : (data[i].availbleStoneWt != null) ? data[i].availbleStoneWt.toFixed(3) : "",
				'Available Cost Val in Rs.' : (data[i].avilableCostValueInRs != null) ? data[i].avilableCostValueInRs.toFixed(2) : "",

               });
					
           }
           var opts = [{sheetid:'Consignment Available Receipt Return Loose Stone',header:true}];
           var res = alasql('SELECT * INTO XLSX("Consignment Available Receipt Return Report LS_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

// Accessory Section
var accOnloadFunction = function(){
	var mainCat = '<select id="mainCatObjA" class="form-control" multiple="multiple"></select>';
	$("#mainCatA").html(mainCat);
	$('#mainCatObjA').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	$.getJSON('/OrderExecution/api/v1/consignmentSalesReceiptAvilableReportLooseAccLOV', function(data) {
		if(data.resCode == "1"){
			var v = '<select id="vendCodeObjA"  name="vendCodeObjA" class="form-control" multiple="multiple">';
			$.each(data.payload.vendorCodes, function(key, val) {
			v += '<option value="' + val.vendorCode + '">' + val.vendorCode + '</option>'; });
			v += '</select>';
			$("#vendCodeA").html(v);
			$('#vendCodeObjA').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			var a = '<select id="artSegObjA"  name="artSegObjA" class="form-control" multiple="multiple">';
			$.each(data.payload.segments, function(key, val) {
			a += '<option value="' + val.id + '">' + val.description + '</option>'; });
			a += '</select>';
			$("#artSegmentA").html(a);
			$('#artSegObjA').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			var g = '<select id="grvNoObjA"  name="grvNoObjA" class="form-control" multiple="multiple">';
			$.each(data.payload.igrNumbers, function(key, val) {
			g += '<option value="' + val.id + '">' + val.id + '</option>'; });
			g += '</select>';
			$("#grvNumberA").html(g);
			$('#grvNoObjA').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
		
	});
}


$("#artSegmentA").on('change',function(){
	var artSegObjA = $("#artSegObjA").val();
	artSegObjA = artSegObjA.join(',');
	
	$.getJSON('/OrderExecution/api/v1/consignmentSalesReceiptAvilableReportLooseAccLOV?segmentId='+artSegObjA.toString(), function(data) {
		if(data.resCode == "1"){
			var m = '<select id="mainCatObjA"  name="mainCatObjA" class="form-control" multiple="multiple">';
			$.each(data.payload.accCat, function(key, val) {
			m += '<option value="' + val.description + '">' + val.description + '</option>'; });
			m += '</select>';
			$("#mainCatA").html(m);
			$('#mainCatObjA').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
	});
});

var consignmentAccFieldFilters = function() {
	var fromDateS = $("#accFromDateS").val();
	var toDateS = $("#accToDateS").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	var vendCodeObjS = $('#vendCodeObjA').val();
	if (vendCodeObjS == null || vendCodeObjS == ""){
		var vCode = "";
	}else{
		var vCode = vendCodeObjS.join(",");
	}

	var grvNoObjS = $('#grvNoObjA').val();
	if (grvNoObjS == null || grvNoObjS == ""){
		var grvNo = "";
	}else{
		var grvNo = grvNoObjS.join(",");
	}
	
	var artSegObjS = $('#artSegObjA').val();
	if (artSegObjS == null || artSegObjS == ""){
		var artSeg = "";
	}else{
		var artSeg = artSegObjS.join(",");
	}
	
	var mainCatObjA = $('#mainCatObjA').val();
	if (mainCatObjA == null || mainCatObjA == ""){
		var mainCat = "";
	}else{
		var mainCat = mainCatObjA.join(",");
	}
	
	if (artSeg != "" && artSeg != null) {
		fieldFilters.fieldFilters["segmentList"] = artSeg;
	}
	if (grvNo != "" && grvNo != null) {
		fieldFilters.fieldFilters["igrNoList"] = grvNo;
	}
	if (vCode != "" && vCode != null) {
		fieldFilters.fieldFilters["vendorCodeList"] = vCode;
	}
	if (mainCat != "" && mainCat != null) {
		fieldFilters.fieldFilters["catList"] = mainCat;
	}
	return fieldFilters;
}

function consignmentAccGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ 
		{'name' : 'vCode','type' : 'string','map':'vendorCode'},
		{'name' : 'date','type' : 'string','map':'createdDate'},
		{'name' : 'grvNo','type' : 'int','map':'mrvHeader'},
		{'name' : 'grvSlNo','type' : 'int','map':'mrvSrlNo'},
		{'name' : 'vendInvRef','type' : 'int','map':'partBillNumber'},
		{'name' : 'vendInvDate','type' : 'string','map':'partBillDate'},
		{'name' : 'segmentDescription','type' : 'string','map':'segmentDescription'},
		{'name' : 'catDescription','type' : 'string','map':'catDescription'},
		{'name' : 'subCatDescription','type' : 'string'},

		{'name' : 'uqc','type' : 'string','map':'uqc'},

		{'name' : 'recPcs','type' : 'int','map':'receiptPcs'},
		{'name' : 'recGrsWt','type' : 'float','map':'receiptAccWt'},
		//{'name' : 'recNetWt','type' : 'float','map':'receiptNetWt'},
		{'name' : 'receiptCostValueInRs','type' : 'float','map':'receiptCostValueInRs'},

		{'name' : 'retPcs','type' : 'int','map':'returnedPcs'},
		{'name' : 'retGrsWt','type' : 'float','map':'returnedAccWt'},
	//	{'name' : 'retNetWt','type' : 'float','map':'returnedNetWt'},
		{'name' : 'returnedCostValueInRs','type' : 'float','map':'returnedCostValueInRs'},

		{'name' : 'salePcs','type' : 'int','map':'salePcs'},
		{'name' : 'saleGrsWt','type' : 'float','map':'saleAccWt'},
	//	{'name' : 'saleNetWt','type' : 'float','map':'saleNetWt'},
		{'name' : 'saleCostValueInRs','type' : 'float','map':'saleCostValueInRs'},

		{'name' : 'avlPcs','type' : 'int','map':'avilablePcs'},
		{'name' : 'grossWeight','type' : 'float','map':'availbleAccWt'},
		//{'name' : 'netWeight','type' : 'float','map':'avilableNetWt'},
		{'name' : 'avilableCostValueInRs','type' : 'float','map':'avilableCostValueInRs'},

		];

	var columns = [
		{'text' : 'Vendor Code','datafield' : 'vCode',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Date','datafield' : 'date',cellsalign : 'center',align : 'center','width' : '7%',sortable : true,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'IGR No','datafield' : 'grvNo',cellsalign : 'center',align : 'center','width' : '6%',sortable : true,editable : false},
		//{'text' : 'IGR Sl No','datafield' : 'grvSlNo',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false},
		{'text' : 'Vendor Invoice Ref','datafield' : 'vendInvRef',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false,},
		{'text' : 'Vendor Invoice Date','datafield' : 'vendInvDate',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false},
		{'text' : 'Acc Segment','datafield' : 'segmentDescription',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false},
		{'text' : 'Main Category','datafield' : 'catDescription',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false},
		{'text' : 'Sub Category','datafield' : 'subCatDescription',cellsalign : 'center',align : 'center','width' : '5%',sortable : true,editable : false},

		{'text' : 'UQC','datafield' : 'uqc',cellsalign : 'right',align : 'center','width' : '5%',sortable : false,editable : false,cellsformat:'d2',
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Total : </b></span>';
				},
				cellsrenderer: function(row, column, value){
					return "<div align='center'style='margin-top:8px;'>Pcs</div>";
				}  
		},
		
		{'text' : 'Pcs','datafield' : 'recPcs',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "receipt",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['recPcs'] == null) ? 0 : record['recPcs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Acc Wt.','datafield' : 'recGrsWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "receipt",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['recGrsWt'] == null) ? 0 : record['recGrsWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
	/*	{'text' : 'Net Wt.','datafield' : 'recNetWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "receipt",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['recNetWt'] == null) ? 0 : record['recNetWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},*/
		{'text' : 'Cost Val in Rs.','datafield' : 'receiptCostValueInRs',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "receipt",cellsformat:'d2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['receiptCostValueInRs'] == null) ? 0 : record['receiptCostValueInRs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Pcs','datafield' : 'salePcs',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "sale",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcs'] == null) ? 0 : record['salePcs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Acc Wt.','datafield' : 'saleGrsWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "sale",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGrsWt'] == null) ? 0 : record['saleGrsWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
	/*	{'text' : 'Net Wt.','datafield' : 'saleNetWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "sale",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleNetWt'] == null) ? 0 : record['saleNetWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},*/
		{'text' : 'Cost Val in Rs.','datafield' : 'saleCostValueInRs',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "sale",cellsformat:'d2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleCostValueInRs'] == null) ? 0 : record['saleCostValueInRs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Pcs','datafield' : 'retPcs',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "return",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['retPcs'] == null) ? 0 : record['retPcs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Acc Wt.','datafield' : 'retGrsWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "return",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['retGrsWt'] == null) ? 0 : record['retGrsWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
	/*	{'text' : 'Net Wt.','datafield' : 'retNetWt',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "return",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['retNetWt'] == null) ? 0 : record['retNetWt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},*/
		{'text' : 'Cost Val in Rs.','datafield' : 'returnedCostValueInRs',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "return",cellsformat:'d2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['returnedCostValueInRs'] == null) ? 0 : record['returnedCostValueInRs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Pcs','datafield' : 'avlPcs',cellsalign : 'center',align : 'center','width' : '5%',sortable : false,editable : false,columngroup : "available",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avlPcs'] == null) ? 0 : record['avlPcs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Acc Wt.','datafield' : 'grossWeight',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "available",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['grossWeight'] == null) ? 0 : record['grossWeight'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.000';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		/*{'text' : 'Net Wt.','datafield' : 'netWeight',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "available",cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['netWeight'] == null) ? 0 : record['netWeight'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.000';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},*/
		{'text' : 'Cost Val in Rs.','datafield' : 'avilableCostValueInRs',cellsalign : 'right',align : 'center','width' : '6%',sortable : false,editable : false,columngroup : "available",cellsformat:'d2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avilableCostValueInRs'] == null) ? 0 : record['avilableCostValueInRs'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
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
		showaggregates: true,
		showstatusbar: true,
			columngroups : [ {
				text : 'Receipt',
				name : 'receipt',
				align : 'center'
			},{
				text : 'Return',
				name : 'return',
				align : 'center'
			},{
				text : 'Sales',
				name : 'sale',
				align : 'center'
			} ,{
				text : 'Available',
				name : 'available',
				align : 'center'
			}]
		});
}

$("#searchAcc").on('click',function(){
	if($("#accFromDateS").val() == "" || $("#accToDateS").val() == "" ){
		$.growl.error({
			message : "Please Select From and To Date !!",
			duration : 10000,
			title :'Error'
		});
		return false;
	}
	postJSON('/OrderExecution/api/v1/consignmentSalesReceiptAvilableLooseAccSearch?mode=Export',JSON.stringify(consignmentAccFieldFilters()),function(response) {
		if(response.resCode == "1"){
			consignmentAccGrid(response.payload.list);
			$("#jqxgrid").show();
		}else{
			consignmentAccGrid();
			$("#jqxgrid").show();
		}
	});
});

$("#exportAcc").on("click",function() {
	var data;
	var newData = [];
	var fieldFilters = consignmentAccFieldFilters();
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
			postJSON('/OrderExecution/api/v1/consignmentSalesReceiptAvilableLooseAccSearch?mode=Export',JSON.stringify(fieldFilters),function(response) {
		   if(response != null){
           data = response.payload.list;
           for (i = 0; i < data.length; i++) {
        	   
			newData.push({
				'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode : "",
				'Date' :  (data[i].createdDate != null) ? data[i].createdDate : "",
				'IGR No' : (data[i].mrvHeader!= null) ? data[i].mrvHeader  : "",
			//	'IGR Sl No' : (data[i].mrvSrlNo != null) ? data[i].mrvSrlNo : "",
				'Vendor Invoice Ref' : (data[i].partBillNumber != null) ? data[i].partBillNumber : "",
				'Vendor Invoice Date' : (data[i].partBillDate != null) ? data[i].partBillDate	: "",
				'Accessory Segment' : (data[i].segmentDescription != null) ? data[i].segmentDescription : "",
				'Main Category' : (data[i].catDescription != null) ? data[i].catDescription : "",
				'Sub Category' : (data[i].subCatDescription != null) ? data[i].subCatDescription : "",
				'UQC' : "Pcs",

				'Receipt Pcs' : (data[i].receiptPcs != null) ? data[i].receiptPcs : "",
				'Receipt Acc Wt' : (data[i].receiptAccWt != null) ? data[i].receiptAccWt.toFixed(3) : "",
				//'Receipt Net Wt' : (data[i].receiptNetWt != null) ? data[i].receiptNetWt.toFixed(3) : "",
				'Receipt Cost Val in Rs.' : (data[i].receiptCostValueInRs != null) ? data[i].receiptCostValueInRs.toFixed(2) : "",

				'Sale Pcs' : (data[i].salePcs != null) ? data[i].salePcs : "",
				'Sale Acc Wt' : (data[i].saleAccWt != null) ? data[i].saleAccWt.toFixed(3) : "",
				//'Sale Net Wt' : (data[i].saleNetWt != null) ? data[i].saleNetWt.toFixed(3) : "",
				'Sale Cost Val in Rs.' : (data[i].saleCostValueInRs != null) ? data[i].saleCostValueInRs.toFixed(2) : "",

				'Return Pcs' : (data[i].returnedPcs != null) ? data[i].returnedPcs : "",
				'Return Acc Wt' : (data[i].returnedAccWt != null) ? data[i].returnedAccWt.toFixed(3) : "",
				//'Return Net Wt' : (data[i].returnedNetWt != null) ? data[i].returnedNetWt.toFixed(3) : "",
				'Return Cost Val in Rs.' : (data[i].returnedCostValueInRs != null) ? data[i].returnedCostValueInRs.toFixed(2) : "",

				'Available Pcs' : (data[i].avilablePcs != null) ? data[i].avilablePcs : "",
				'Available Acc Wt' : (data[i].availbleAccWt != null) ? data[i].availbleAccWt.toFixed(3) : "",
				//'Available Net Wt' : (data[i].avilableNetWt != null) ? data[i].avilableNetWt.toFixed(3) : "",
				'Available Cost Val in Rs.' : (data[i].avilableCostValueInRs != null) ? data[i].avilableCostValueInRs.toFixed(2) : "",

               });
					
           }
           var opts = [{sheetid:'Consignment Available Receipt Return Accessory',header:true}];
           var res = alasql('SELECT * INTO XLSX("Consignment Available Receipt Return Report Acc_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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
