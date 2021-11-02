// date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	maxDate : 0,
	dateFormat: "dd/mm/yy",
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

var onLoadLov = function(){
	$.getJSON('/OrderExecution/api/v1/purityTestingLOV', function(data) {
		var lotNo = data.payload.lotNos;
		var assayerCode = data.payload.assayerCodes;
		var segment = data.payload.segments
		
		var vCode = '<select id="vendorObj"  name="vendorObj" class="form-control" multiple="multiple">';
		$.each(data.payload.vendorCodes, function(key, val) {
			vCode += '<option value="' + val.vendorCode + '">' + val.vendorCode + '</option>'; 
		});
			
		vCode += '</select>';
		$("#vendorCodeS").html(vCode);
			
		$("#vendorObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
			
		$("#segmentS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.segments, function(key, val) {
			$("#segmentS").append('<option value="' + val + '">' + val + '</option>');
		});	
		
		// smart Search for Lot No
		var data = [];
		$.each(lotNo, function(key, value) {
		data.push({
			value : value.id,
			});
		});
		$(function() {
			$("#lotNoS").autocomplete({
				source : data,
				focus : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
				},
				 select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
					$("#lotNoS-value").val(ui.item.value);
					}
				});
			});
			
		// smart Search for Assayer Code
		var data = [];
		$.each(assayerCode, function(key, value) {
		data.push({
			value : value,
			});
		});
		$(function() {
			$("#assyrCodeS").autocomplete({
				source : data,
				focus : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
				},
				 select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
					$("#assyrCodeS-value").val(ui.item.value);
					}
				});
			});
	});
}
onLoadLov();
	
var purityTestingFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var vendorCodeS = $("#vendorCodeS").val();
	var segmentS = $("#segmentS").val();
	var lotNoS = $("#lotNoS").val();
	var assyrCodeS = $("#assyrCodeS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	
	var vendorObj = $('#vendorObj').val();
	if (vendorObj == null || vendorObj == ""){
		var vendor = "";
	}else{
		var vendor = vendorObj.join(",");
	}
	
	if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["segmentDesc"] = segmentS;
	}
	if (lotNoS != "" && lotNoS != null) {
		fieldFilters.fieldFilters["lotNo"] = lotNoS;
	}
	if (assyrCodeS != "" && assyrCodeS != null) {
		fieldFilters.fieldFilters["assayerCode"] = assyrCodeS;
	}
	if (vendor != "" && vendor != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendor;
	}
	fieldFilters.fieldFilters["mode"] = "search";

	return fieldFilters;
}


//Export function for Customer Order Due
$("#export").on("click",function() {
	var data;
	var newData = [];
	var fieldFilters = purityTestingFieldFilters();
     var sysdate = moment().format('DDMMYYYYHHmmSS');
	 var rows = $("#jqxgrid").jqxGrid('getrows');
	 if(typeof rows == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
		}else{	
			fieldFilters.fieldFilters.mode = "export";
			
			var rows = $("#jqxgrid").jqxGrid('getdatainformation');
			if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/purityTestingReportDetails',JSON.stringify(fieldFilters),function(response) {
		   if(response != null){
           data = response.payload.list;
           for (i = 0; i < data.length; i++) {
        	   var dateExp = "";
        	   var invDateF = "";
        	   var givDateF = "";
        	   if(data[i].date != null || data[i].date != ""){
        		var dateF = new Date(data[i].date);
           		var dd = dateF.getDate();
           		var mm = dateF.getMonth() + 1;
           		var yy = dateF.getFullYear();
           		var dateExp = dd + "/" + mm + "/" + yy;
           		console.log(dateExp);
        	   }
        	  
        	   if(data[i].invoiceDate != null || data[i].invoiceDate != ""){
           		var invDate = new Date(data[i].invoiceDate);
              		var dd1 = invDate.getDate();
              		var mm1 = invDate.getMonth() + 1;
              		var yy1 = invDate.getFullYear();
              		var invDateF = dd1 + "/" + mm1 + "/" + yy1;
              		console.log(invDateF);
           	   }
        	   
        	   if(data[i].givOrTvDate != null || data[i].givOrTvDate != ""){
              		var givTvDate = new Date(data[i].givOrTvDate);
                 		var dd1 = givTvDate.getDate();
                 		var mm1 = givTvDate.getMonth() + 1;
                 		var yy1 = givTvDate.getFullYear();
                 		var givDateF = dd1 + "/" + mm1 + "/" + yy1;
                 		console.log(invDateF);
              	   }
			newData.push({
				'Date' : dateExp,
				'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode : "",
				'Invoice No' : (data[i].invoiceNo!= null) ? data[i].invoiceNo  : "",
				'Invoice Date' : invDateF,
				'GRV No' : (data[i].grvNo != null) ? data[i].grvNo : "",
				'GRV Sl No' : (data[i].grvSrlNo != null) ? data[i].grvSrlNo : "",
				'IGR No' : (data[i].igrNo != null) ? data[i].igrNo : "",
				//'Stock No' : (data[i].stockNo != null) ? data[i].stockNo	: "",
				'Melting Lot No' : (data[i].meltingLotNo != null) ? data[i].meltingLotNo	: "",
				'Metal Segment' : (data[i].metalSegment != null) ? data[i].metalSegment : "",
				'From Location' : (data[i].fromLocation != null) ? data[i].fromLocation : "",
				'Jewel Code' : (data[i].jewelCode != null) ? data[i].jewelCode : "",
                'Gross Wt' : (data[i].grossWt != null) ? data[i].grossWt.toFixed(3) : "",
				'Net Wt' : (data[i].netWt != null) ? data[i].netWt.toFixed(3) : "",
                'Expected Purity %' : (data[i].expectedPurityPerc != null) ? data[i].expectedPurityPerc.toFixed(2) : "",
				'Expected Pure Wt' : (data[i].expectedPureWt != null) ? data[i].expectedPureWt.toFixed(3) : "",
				'Receiving Location Melting' : (data[i].receivingLocMelting != null) ? data[i].receivingLocMelting : "",
				'Melted Bar Wt' : (data[i].meltedBarWt != null) ? data[i].meltedBarWt.toFixed(3) : "",
				'Spillage Wt' : (data[i].spillageWt != null) ? data[i].spillageWt.toFixed(3) : "",
				'Melting Loss' : (data[i].meltingLoss != null) ? data[i].meltingLoss.toFixed(3) : "",
		        'Exp Purity %' : (data[i].expectedPurityPercMlb != null) ? data[i].expectedPurityPercMlb.toFixed(2) : "",
				'Expected Pure Wt(MLB + SPL + MLL)' : (data[i].expectedPureWtMlb != null) ? data[i].expectedPureWtMlb.toFixed(3) : "",
            	'Location' : (data[i].assayerVendorCode != null) ? data[i].assayerVendorCode : "",
				'Assayes Vendor' : (data[i].assayerVendorCode != null) ? data[i].assayerVendorCode : "",
				'Issue To Assayer Wt' : (data[i].issuedToAssayerWt != null) ? data[i].issuedToAssayerWt.toFixed(3) : "",
				'Assayer Unrefined Wt' : (data[i].assayerUnrefinedWt != null) ? data[i].assayerUnrefinedWt.toFixed(3) : "",
				'Assayer Purity %' : (data[i].assayerPurityPerc != null) ? data[i].assayerPurityPerc.toFixed(2) : "",
                'Assayer Pure Wt' : (data[i].assayerPureWt != null) ? data[i].assayerPureWt.toFixed(3)	: "",
                'Assayer Loss' : (data[i].assayerLoss != null) ? data[i].assayerLoss.toFixed(3) : "",
                'GIV/TV Date' : givDateF,
                'GIV/TV No' : (data[i].givOrTvNo != null) ? data[i].givOrTvNo : "",
                'GIV/TV Gross Wt' : (data[i].givOrTvGrWt != null) ? data[i].givOrTvGrWt.toFixed(3)	: "",
                'GIV/TV Net Wt' : (data[i].givOrTvNetWt != null) ? data[i].givOrTvNetWt.toFixed(3) : ""
               });
					
           }
           var opts = [{sheetid:'Purity_Testing',header:true}];
           var res = alasql('SELECT * INTO XLSX("Purity Testing_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

//###############  Search Grid ################## 
function purityTestingSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ 
		{'name' : 'date','type' : 'date','map'  : 'date'},
		{'name' : 'vendorCode','type' : 'string','map'  : 'vendorCode'},
		{'name' : 'invoiceNum','type' : 'long','map'  : 'invoiceNo'},
		{'name' : 'invoiceDate','type' : 'date','map'  : 'invoiceDate'},
		{'name' : 'grvNo','type' : 'long','map'  : 'grvNo'}, 
		{'name' : 'grvSrlNo','type' : 'int','map'  : 'grvSrlNo'},
		{'name' : 'igrNo','type' : 'long','map'  : 'igrNo'}, 
		{'name' : 'stockNo','type' : 'long','map'  : 'stockNo'},
		{'name' : 'meltingLotNo','type' : 'long','map'  : 'meltingLotNo'},
		{'name' : 'metalSeg','type' : 'string','map'  : 'metalSegment'}, 
		{'name' : 'fromLoc','type' : 'string','map'  : 'fromLocation'},
		{'name' : 'jewelCode','type' : 'string','map'  : 'jewelCode'},
		
		{'name' : 'grossWt','type' : 'float','map'  : 'grossWt'},
		{'name' : 'netWt','type' : 'float','map'  : 'netWt'},
		{'name' : 'expPurityPerc','type' : 'float','map'  : 'expectedPurityPerc'},
		{'name' : 'expPureWt','type' : 'float','map'  : 'expectedPureWt'},
		{'name' : 'recLocMelting','type' : 'float','map'  : 'receivingLocMelting'}, 
		{'name' : 'meltedBarWt','type' : 'float','map'  : 'meltedBarWt'},
		{'name' : 'spillageWt','type' : 'float','map'  : 'spillageWt'}, 
		{'name' : 'meltingLoss','type' : 'float','map'  : 'meltingLoss'},
		{'name' : 'expPureWtMlb','type' : 'float','map'  : 'expectedPureWtMlb'},
		{'name' : 'location','type' : 'string','map'  : 'assayerVendorCode'}, 
		{'name' : 'assyerVcode','type' : 'string','map'  : 'assayerVendorCode'},
		
		{'name' : 'issueAssyWt','type' : 'float','map'  : 'issuedToAssayerWt'}, 
		{'name' : 'assyUnrefinedWt','type' : 'float','map'  : 'assayerUnrefinedWt'},
		{'name' : 'assyrPurityPerc','type' : 'float','map'  : 'assayerPurityPerc'}, 
		{'name' : 'assyrPureWt','type' : 'float','map'  : 'assayerPureWt'},
		{'name' : 'assyrLoss','type' : 'float','map'  : 'assayerLoss'},
		{'name' : 'givDate','type' : 'date','map'  : 'givOrTvDate'}, 
		{'name' : 'givNo','type' : 'long','map'  : 'givOrTvNo'},
		{'name' : 'givGrsWt','type' : 'float','map'  : 'givOrTvGrWt'},
		{'name' : 'givNetWt','type' : 'float','map'  : 'givOrTvNetWt'},
		{'name':'expectedPurityPercMlb','type':'float'}
		];
	var columns = [
		{'text' : 'Date','datafield' : 'date','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,cellsformat : 'dd/MM/yyyy',
			aggregatesrenderer: function() {        		 
    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Total</b></span>';
			}
		},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '6%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
		{'text' : 'Invoice No','datafield' : 'invoiceNum','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Invoice Date','datafield' : 'invoiceDate','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'GRV No','datafield' : 'grvNo','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'GRV Sl No','datafield' : 'grvSrlNo','width' : '4%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'IGR No','datafield' : 'igrNo','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		//{'text' : 'Stock No','datafield' : 'stockNo',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '5%'},
		{'text' : 'Melting Lot No','datafield' : 'meltingLotNo',editable : false,cellsalign : 'center',align : 'center',sortable : true,'width' : '8%'},
		{'text' : 'Metal Segment','datafield' : 'metalSeg',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '8%'},
		{'text' : 'From Location','datafield' : 'fromLoc',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '8%'},
		{'text' : 'Jewel Code','datafield' : 'jewelCode',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '8%'},
		
		{'text' : 'Gross Wt','datafield' : 'grossWt','width' : '6%',cellsalign : 'right',align : 'center',sortable : true,editable : false,cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['grossWt'] == null) ? 0 : record['grossWt'];
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
		{'text' : 'Net Wt','datafield' : 'netWt','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['netWt'] == null) ? 0 : record['netWt'];
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
		{'text' : 'Expected Purity %','datafield' : 'expPurityPerc','width' : '7%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		{'text' : 'Expected Pure Wt','datafield' : 'expPureWt','width' : '7%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['expPureWt'] == null) ? 0 : record['expPureWt'];
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
		{'text' : 'Receiving Location Melting','datafield' : 'recLocMelting','width' : '9%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'Melted Bar Wt','datafield' : 'meltedBarWt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['meltedBarWt'] == null) ? 0 : record['meltedBarWt'];
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
		{'text' : 'Splillage Wt','datafield' : 'spillageWt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['spillageWt'] == null) ? 0 : record['spillageWt'];
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
		{'text' : 'Melting Loss','datafield' : 'meltingLoss',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '7%',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['meltingLoss'] == null) ? 0 : record['meltingLoss'];
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
		{'text' : 'Expected Purity %','datafield' : 'expectedPurityPercMlb','width' : '7%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		{'text' : 'Expected Pure Wt(MLB + SPL + MLL)','datafield' : 'expPureWtMlb',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '10%',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['expPureWtMlb'] == null) ? 0 : record['expPureWtMlb'];
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
		{'text' : 'Location','datafield' : 'location',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '6%'},
		{'text' : 'Assayer Vendor Code','datafield' : 'assyerVcode',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '6%'},
		
		{'text' : 'Issued to Assayer Wt','datafield' : 'issueAssyWt','width' : '6%',cellsalign : 'right',align : 'center',sortable : true,editable : false,cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['issueAssyWt'] == null) ? 0 : record['issueAssyWt'];
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
		{'text' : 'Assayer Unrefined Wt','datafield' : 'assyUnrefinedWt','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['assyUnrefinedWt'] == null) ? 0 : record['assyUnrefinedWt'];
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
		{'text' : 'Assayer Purity %','datafield' : 'assyrPurityPerc','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['assyrPurityPerc'] == null) ? 0 : record['assyrPurityPerc'];
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
		{'text' : 'Assayer Pure Wt','datafield' : 'assyrPureWt','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['assyrPureWt'] == null) ? 0 : record['assyrPureWt'];
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
		{'text' : 'Assayer Loss','datafield' : 'assyrLoss','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['assyrLoss'] == null) ? 0 : record['assyrLoss'];
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
		{'text' : 'GIV/TV Date','datafield' : 'givDate','width' : '8%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'},
		{'text' : 'GIV/TV No','datafield' : 'givNo','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'GIV/TV Gross Wt','datafield' : 'givGrsWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '6%',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['givGrsWt'] == null) ? 0 : record['givGrsWt'];
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
		{'text' : 'GIV/TV Net Wt','datafield' : 'givNetWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '5%',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['givNetWt'] == null) ? 0 : record['givNetWt'];
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
		}
		
		];
	showMyGrid(datafields,"/OrderExecution/api/v1/purityTestingReportDetails", "list",columns, purityTestingFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		showstatusbar: true,
 	    statusbarheight: 30,
 	    showaggregates: true,
	});
}

$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" || $("#vendorObj").val() == null){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 1000,
			title  : 'Error'
		});
		return false;
	}
	purityTestingSearchGrid();
	$("#jqxgrid").show();
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('purityTestingReport', 'bodySwitcher')"
});