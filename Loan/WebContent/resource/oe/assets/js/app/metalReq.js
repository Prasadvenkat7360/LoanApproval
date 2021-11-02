/*
	##	Author1         : 	Dipankar 
	##	Author2         : 	Pooja Sangve 	
	##	Date Creation 	: 	08-05-2017
	## 	Description		:	Search and export functionality for metal requirements.
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

$("#gridTabMetalReq").hide();
$("#gridTabMetalReq").tabs({
	disabled : []
});

// On load API Call
var OnLoadLOV = function() {
	$
			.getJSON(
					'/OrderExecution/api/v1/metalRequirementLOV',
					function(data) {
						var metalSegment = data.payload.METAL_SEGMENT_LOV;
						var m = '<select id="mSegObj"  name="mSegObj" class="form-control" multiple="multiple">';
						$.each(metalSegment, function(key, val) {
							m += '<option code="' + val.id + '" value="'
									+ val.code + '">' + val.description
									+ '</option>';
						});
						m += '</select>';
						$("#mSegment").html(m);
						$('#mSegObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : false,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
						});
					});
}

OnLoadLOV();

removeComma = function(row, column, value){
	console.log(row);
	console.log(value);
	console.log(column);
	var newValue = 0.000;
	if(value != null || value != ""){
		newValue = value.replace(/\,/g,'');
	}else{
		newValue = 0.000
	}
	
	return '<div style="text-align:center; margin: 0; padding-top:15px; height:40px;">' + newValue  + '</div>';
}

showAggregates = function(aggregates){
		if(typeof aggregates["Total"] == "undefined"){
			return '0.00';
	  	}else{
		  	var total = aggregates["Total"];
	  	    total = total.replace(/\,/g,'');
		    return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + '<b>' + total + '</b>' + '</span>';		      		  	
		} 
}
// ################################################################# Metal
// Segment Gold #############################################################
var metalRequirementGrid = function(data) {
	var source = {
		datafields : [ {
			name : 'vendorCode',
			type : 'long',
		}, {
			name : 'vendorName',
			type : 'string'
		}, {
			name : 'segment',
			type : 'string'
		}, {
			name : 'sOrderNetWt',
			type : 'double',
			map : 'stockOrderNetWt'
		},
		{
			name : 'stockPreRepairNetWt',
			type : 'double'
		}, {
			name : 'stockRPExpectedNetWt',
			type : 'double'
		}, {
			name : 'StockSPNetWt',
			type : 'double'
		}, {
			name : 'customerNOExpectedNetWt',
			type : 'double'
		}, {
			name : 'customerNOReOrRWKPreNetWt',
			type : 'double'
		}, {
			name : 'customerNoOrReOrRWKExpectedNetWt',
			type : 'double'
		}, {
			name : 'CustomerPreRPNetWt',
			type : 'double'
		}, {
			name : 'customerRpExpectedNetWt',
			type : 'double'
		}, {
			name : 'customerSpNetWt',
			type : 'double'
		}, {
			name : 'requiredPureGold',
			type : 'double'
		}, {
			name : 'totalPendingOrderWt',
			type : 'double'
		}, {
			name : 'pendingOrderPureWt',
			type : 'double'
		}, {
			name : 'balancewithVendorPureWt',
			type : 'double'
		}, {
			name : 'indentPendingPureWeight',
			type : 'double'
		}, {
			name : 'remarks',
			type : 'string'
		},

		],
		localdata : data
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#segmentGoldGride").jqxGrid({

		source : dataAdapter,
		width : '100%',
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 20,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : true,
		rowdetails : true,
		showaggregates: true, 
		showstatusbar: true,
 	    statusbarheight: 20,
		editable: false,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Gold Details');
			
		},
		columns : [ {
			text : 'Vendor Code',
			datafield : 'vendorCode',
			width : '5%',
			cellsalign : 'center',
			align : 'center'
		}, {
			text : 'Vendor Name',
			datafield : 'vendorName',
			width : '10%',
			cellsalign : 'left',
			sortable : false
		}, {
			text : 'Seg',
			datafield : 'segment',
			width : '5%',
			cellsalign : 'center',
			align : 'center',
			sortable : false
		}, {
			text : 'St.Order Net Wt.',
			datafield : 'sOrderNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'right',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var soNwt = record['sOrderNetWt'];
	      		      var soNwts = soNwt.replace(/\,/g,'');
	  				  var total = (soNwts == null ) ? 0 : soNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'St.Pre Repair Net Wt',
			datafield : 'stockPreRepairNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var stPreNwt = record['stockPreRepairNetWt'];
	      		      var stPreNwts = stPreNwt.replace(/\,/g,'');
	  				  var total = (stPreNwts == null ) ? 0 : stPreNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'St.Rp Exp Net Wt',
			datafield : 'stockRPExpectedNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
      			 var stRpExpNwt = record['stockRPExpectedNetWt'];
     		      var stRpExpNwts = stRpExpNwt.replace(/\,/g,'');
 				  var total = (stRpExpNwts == null ) ? 0 : stRpExpNwts;
     			  return parseFloat(aggregatedValue) + parseFloat(total);
      		  }
      	  }],
      	aggregatesrenderer: showAggregates   
		}, {
			text : 'St.SP Net Wt.',
			datafield : 'StockSPNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			 var stSpNwt = record['StockSPNetWt'];
	      		      var stSpNwts = stSpNwt.replace(/\,/g,'');
	  				  var total = (stSpNwts == null ) ? 0 : stSpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.No Exp Net Wt.',
			datafield : 'customerNOExpectedNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var coNoExpNwt = record['customerNOExpectedNetWt'];
	      		      var coNoExpNwts = coNoExpNwt.replace(/\,/g,'');
	  				  var total = (coNoExpNwts == null ) ? 0 : coNoExpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.No,RE/RWK Pre Net Wt.',
			datafield : 'customerNOReOrRWKPreNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var cNoRwkPreNwt = record['customerNOReOrRWKPreNetWt'];
	      		      var cNoRwkPreNwts = cNoRwkPreNwt.replace(/\,/g,'');
	  				  var total = (cNoRwkPreNwts == null ) ? 0 : cNoRwkPreNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.No,RE/RWK Exp Net Wt.',
			datafield : 'customerNoOrReOrRWKExpectedNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			 var cNorwkNwt = record['customerNoOrReOrRWKExpectedNetWt'];
	      		      var cNorwkNwts = cNorwkNwt.replace(/\,/g,'');
	  				  var total = (cNorwkNwts == null ) ? 0 : cNorwkNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.Pre Rp Net Wt.',
			datafield : 'CustomerPreRPNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			 var cpPreRpNwt = record['CustomerPreRPNetWt'];
	      		      var cpPreRpNwts = cpPreRpNwt.replace(/\,/g,'');
	  				  var total = (cpPreRpNwts == null ) ? 0 : cpPreRpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates    
		}, {
			text : 'Cust.Rp Exp Net Wt.',
			datafield : 'customerRpExpectedNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			 var cRpExpNwt = record['customerRpExpectedNetWt'];
	      		      var cRpExpNwts = cRpExpNwt.replace(/\,/g,'');
	  				  var total = (cRpExpNwts == null ) ? 0 : cRpExpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.Sp Net Wt.',
			datafield : 'customerSpNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			 var coSpNwt = record['customerSpNetWt'];
	      		      var coSpNwts = coSpNwt.replace(/\,/g,'');
	  				  var total = (coSpNwts == null ) ? 0 : coSpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Total Pending Order Wt.',
			datafield : 'totalPendingOrderWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			 var tPowt = record['totalPendingOrderWt'];
	      		      var tPowts = tPowt.replace(/\,/g,'');
	  				  var total = (tPowts == null ) ? 0 : tPowts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		},

		{
			text : 'Pending Order Pure Wt.',
			datafield : 'pendingOrderPureWt',
			width : '5%',
			cellsalign : 'right',
			align : 'center',
			cellsformat : 'd3',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			 var poPwt = record['pendingOrderPureWt'];
	      		      var poPwts = poPwt.replace(/\,/g,'');
	  				  var total = (poPwts == null ) ? 0 : poPwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates    
		}, {
			text : 'Balance With Vendor Pure Wt.',
			datafield : 'balancewithVendorPureWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var balPwt = record['balancewithVendorPureWt'];
	      		      var balVendPwt = balPwt.replace(/\,/g,'');
	  				  var total = (balVendPwt == null ) ? 0 : balVendPwt;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Indent Pending Pure Wt',
			datafield : 'indentPendingPureWeight',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var indPwt = record['indentPendingPureWeight'];
	      		      var indPwts = indPwt.replace(/\,/g,'');
	  				  var total = (indPwts == null ) ? 0 : indPwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Req Pure Gold',
			datafield : 'requiredPureGold',
			width : '5%',
			cellsalign : 'right',
			align : 'center',
			cellsformat : 'd3',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var reqPg = record['requiredPureGold'];
	      		      var reqPgs = reqPg.replace(/\,/g,'');
	  				  var total = (reqPgs == null ) ? 0 : reqPgs;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Remarks',
			datafield : 'remarks',
			width : '5%',
			cellsalign : 'left',
			align : 'center'
		},

		]
	});
}

// ################################################################### Metal
// Segment Silver
// ###################################################################
var metalRequirementSilverGrid = function(data) {
	var source = {
		datafields : [ {
			name : 'vendorCode',
			type : 'long',
		}, {
			name : 'vendorName',
			type : 'string'
		}, {
			name : 'segment',
			type : 'string'
		}, {
			name : 'sOrderNetWt',
			type : 'double',
			map : 'stockOrderNetWt'
		},
		{
			name : 'stockPreRepairNetWt',
			type : 'double'
		}, {
			name : 'stockRPExpectedNetWt',
			type : 'double'
		}, {
			name : 'StockSPNetWt',
			type : 'double'
		}, {
			name : 'customerNOExpectedNetWt',
			type : 'double'
		}, {
			name : 'customerNOReOrRWKPreNetWt',
			type : 'double'
		}, {
			name : 'customerNoOrReOrRWKExpectedNetWt',
			type : 'double'
		}, {
			name : 'CustomerPreRPNetWt',
			type : 'double'
		}, {
			name : 'customerRpExpectedNetWt',
			type : 'double'
		}, {
			name : 'customerSpNetWt',
			type : 'double'
		}, {
			name : 'requiredPureGold',
			type : 'double'
		},{
			name : 'totalPendingOrderWt',
			type : 'double'
		}, {
			name : 'pendingOrderPureWt',
			type : 'double'
		}, {
			name : 'balancewithVendorPureWt',
			type : 'double'
		}, {
			name : 'indentPendingPureWeight',
			type : 'double'
		}, {
			name : 'remarks',
			type : 'string'
		},

		],
		localdata : data
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#segmentSilverDetGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 20,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : true,
		rowdetails : true,
		showaggregates: true, 
		showstatusbar: true,
 	    statusbarheight: 20,
		editable: false,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Silver Details');
			
		},
		columns : [ {
			text : 'Vendor Code',
			datafield : 'vendorCode',
			width : '5%',
			cellsalign : 'center',
			align : 'center'
		}, {
			text : 'Vendor Name',
			datafield : 'vendorName',
			width : '10%',
			cellsalign : 'left',
			sortable : false
		}, {
			text : 'Seg',
			datafield : 'segment',
			width : '4%',
			cellsalign : 'center',
			align : 'center',
			sortable : false
		}, {
			text : 'St.Order Net Wt.',
			datafield : 'sOrderNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var soNwt = record['sOrderNetWt'];
	      		      var soNwts = soNwt.replace(/\,/g,'');
	  				  var total = (soNwts == null ) ? 0 : soNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'St.Pre Repair Net Wt',
			datafield : 'stockPreRepairNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var spreRpNwt = record['stockPreRepairNetWt'];
	      		      var spreRpNwts = spreRpNwt.replace(/\,/g,'');
	  				  var total = (spreRpNwts == null ) ? 0 : spreRpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates    
		}, {
			text : 'St.Rp Exp Net Wt',
			datafield : 'stockRPExpectedNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var sRpExpNwt = record['stockRPExpectedNetWt'];
	      		      var sRpExpNwts = sRpExpNwt.replace(/\,/g,'');
	  				  var total = (sRpExpNwts == null ) ? 0 : sRpExpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'St.SP Net Wt.',
			datafield : 'StockSPNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var sSpNwt = record['StockSPNetWt'];
	      		      var sSpNwts = sSpNwt.replace(/\,/g,'');
	  				  var total = (sSpNwts == null ) ? 0 : sSpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.No Exp Net Wt.',
			datafield : 'customerNOExpectedNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			 var cNoExpNwt = record['customerNOExpectedNetWt'];
	      		      var cNoExpNwts = cNoExpNwt.replace(/\,/g,'');
	  				  var total = (cNoExpNwts == null ) ? 0 : cNoExpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.No,RE/RWK Pre Net Wt.',
			datafield : 'customerNOReOrRWKPreNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var cNoRwkNwt = record['customerNOReOrRWKPreNetWt'];
	      		      var cNoRwkNwts = cNoRwkNwt.replace(/\,/g,'');
	  				  var total = (cNoRwkNwts == null ) ? 0 : cNoRwkNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.No,RE/RWK Exp Net Wt.',
			datafield : 'customerNoOrReOrRWKExpectedNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var cNoRpNwt = record['customerNoOrReOrRWKExpectedNetWt'];
	      		      var cNoRpNwts = cNoRpNwt.replace(/\,/g,'');
	  				  var total = (cNoRpNwts == null ) ? 0 : cNoRpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.Pre Rp Net Wt.',
			datafield : 'CustomerPreRPNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var cPreRpNwt = record['CustomerPreRPNetWt'];
	      		      var cPreRpNwts = cPreRpNwt.replace(/\,/g,'');
	  				  var total = (cPreRpNwts == null ) ? 0 : cPreRpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.Rp Exp Net Wt.',
			datafield : 'customerRpExpectedNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var cRpNwt = record['customerRpExpectedNetWt'];
	      		      var cRpNwts = cRpNwt.replace(/\,/g,'');
	  				  var total = (cRpNwts == null ) ? 0 : cRpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.Sp Net Wt.',
			datafield : 'customerSpNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var cSpNwt = record['customerSpNetWt'];
	      		      var cSpNwts = cSpNwt.replace(/\,/g,'');
	  				  var total = (cSpNwts == null ) ? 0 : cSpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Total Pending Order Wt.',
			datafield : 'totalPendingOrderWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var totPendOrdwt = record['totalPendingOrderWt'];
	      		      var totPendOrdwts = totPendOrdwt.replace(/\,/g,'');
	  				  var total = (totPendOrdwts == null ) ? 0 : totPendOrdwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		},

		{
			text : 'Pending Order Pure Wt.',
			datafield : 'pendingOrderPureWt',
			width : '5%',
			cellsalign : 'right',
			align : 'center',
			cellsformat : 'd3',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var pendOrdPwt = record['pendingOrderPureWt'];
	      		      var pendOrdPwts = pendOrdPwt.replace(/\,/g,'');
	  				  var total = (pendOrdPwts == null ) ? 0 : pendOrdPwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Balance With Vendor Pure Wt.',
			datafield : 'balancewithVendorPureWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var balPwt = record['balancewithVendorPureWt'];
	      		      var balPwts = balPwt.replace(/\,/g,'');
	  				  var total = (balPwts == null ) ? 0 : balPwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Indent Pending Pure Wt',
			datafield : 'indentPendingPureWeight',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var indPendPwt = record['indentPendingPureWeight'];
	      		      var indPendPwts = indPendPwt.replace(/\,/g,'');
	  				  var total = (indPendPwts == null ) ? 0 : indPendPwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Req Pure Gold',
			datafield : 'requiredPureGold',
			width : '5%',
			cellsalign : 'right',
			align : 'center',
			cellsformat : 'd3',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var regPg = record['requiredPureGold'];
	      		      var regPgs = regPg.replace(/\,/g,'');
	  				  var total = (regPgs == null ) ? 0 : regPgs;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Remarks',
			datafield : 'remarks',
			width : '6%',
			cellsalign : 'left',
			align : 'center',
			sortable : false
		},

		]
	});
}
// ######################################################### Metal Segment
// Platinum
// #########################################################################
var metalRequirementPlatinumGrid = function(data) {
	var source = {
		datafields : [ {
			name : 'vendorCode',
			type : 'long',
		}, {
			name : 'vendorName',
			type : 'string'
		}, {
			name : 'segment',
			type : 'string'
		}, {
			name : 'sOrderNetWt',
			type : 'double',
			map : 'stockOrderNetWt'
		}, {
			name : 'stockPreRepairNetWt',
			type : 'double'
		}, {
			name : 'stockRPExpectedNetWt',
			type : 'double'
		}, {
			name : 'StockSPNetWt',
			type : 'double'
		}, {
			name : 'customerNOExpectedNetWt',
			type : 'double'
		}, {
			name : 'customerNOReOrRWKPreNetWt',
			type : 'double'
		}, {
			name : 'customerNoOrReOrRWKExpectedNetWt',
			type : 'double'
		}, {
			name : 'CustomerPreRPNetWt',
			type : 'double'
		}, {
			name : 'customerRpExpectedNetWt',
			type : 'double'
		}, {
			name : 'customerSpNetWt',
			type : 'double'
		}, {
			name : 'requiredPureGold',
			type : 'double'
		},
		{
			name : 'totalPendingOrderWt',
			type : 'double'
		}, {
			name : 'pendingOrderPureWt',
			type : 'double'
		}, {
			name : 'balancewithVendorPureWt',
			type : 'double'
		}, {
			name : 'indentPendingPureWeight',
			type : 'double'
		}, {
			name : 'remarks',
			type : 'string'
		},

		],
		localdata : data
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#segmentPlatinumGride").jqxGrid({

		source : dataAdapter,
		width : '100%',
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 20,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : true,
		rowdetails : true,
		showaggregates: true, 
		showstatusbar: true,
 	    statusbarheight: 20,
		editable: false,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Platinum Details');
			
		},
		columns : [ {
			text : 'Vendor Code',
			datafield : 'vendorCode',
			width : '5%',
			cellsalign : 'center',
			align : 'center'
		}, {
			text : 'Vendor Name',
			datafield : 'vendorName',
			width : '10%',
			cellsalign : 'left',
			sortable : false
		}, {
			text : 'Seg',
			datafield : 'segment',
			width : '5%',
			cellsalign : 'center',
			align : 'center',
			sortable : false
		}, {
			text : 'St.Order Net Wt.',
			datafield : 'sOrderNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var soNwt = record['sOrderNetWt'];
	      		      var soNwts = soNwt.replace(/\,/g,'');
	  				  var total = (soNwts == null ) ? 0 : soNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	  aggregatesrenderer: showAggregates         		 
		}, {
			text : 'St.Pre Repair Net Wt',
			datafield : 'stockPreRepairNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var preNwt = record['stockPreRepairNetWt'];
	      		      var preNwts = preNwt.replace(/\,/g,'');
	  				  var total = (preNwts == null ) ? 0 : preNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'St.Rp Exp Net Wt',
			datafield : 'stockRPExpectedNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var rpExpNwt = record['stockRPExpectedNetWt'];
	      		      var rpExpNwts = rpExpNwt.replace(/\,/g,'');
	  				  var total = (rpExpNwts == null ) ? 0 : rpExpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'St.SP Net Wt.',
			datafield : 'StockSPNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var spNwt = record['StockSPNetWt'];
	      		      var spNwts = spNwt.replace(/\,/g,'');
	  				  var total = (spNwts == null ) ? 0 : spNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.No Exp Net Wt.',
			datafield : 'customerNOExpectedNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var cExpNwt = record['customerNOExpectedNetWt'];
	      		      var cExpNwts = cExpNwt.replace(/\,/g,'');
	  				  var total = (cExpNwts == null ) ? 0 : cExpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.No,RE/RWK Pre Net Wt.',
			datafield : 'customerNOReOrRWKPreNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var cNoRwkNwt = record['customerNOReOrRWKPreNetWt'];
	      		      var cNoRwkNwts = cNoRwkNwt.replace(/\,/g,'');
	  				  var total = (cNoRwkNwts == null ) ? 0 : cNoRwkNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.No,RE/RWK Exp Net Wt.',
			datafield : 'customerNoOrReOrRWKExpectedNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var cNoRwExpNwt = record['customerNoOrReOrRWKExpectedNetWt'];
	      		      var cNoRwExpNwts = cNoRwExpNwt.replace(/\,/g,'');
	  				  var total = (cNoRwExpNwts == null ) ? 0 : cNoRwExpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.Pre Rp Net Wt.',
			datafield : 'CustomerPreRPNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var cpreRpNwt = record['CustomerPreRPNetWt'];
	      		      var cpreRpNwts = cpreRpNwt.replace(/\,/g,'');
	  				  var total = (cpreRpNwts == null ) ? 0 : cpreRpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.Rp Exp Net Wt.',
			datafield : 'customerRpExpectedNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var cRpExpNwt = record['customerRpExpectedNetWt'];
	      		      var cRpExpNwts = cRpExpNwt.replace(/\,/g,'');
	  				  var total = (cRpExpNwts == null ) ? 0 : cRpExpNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Cust.Sp Net Wt.',
			datafield : 'customerSpNetWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var cspNwt = record['customerSpNetWt'];
	      		      var cspNwts = cspNwt.replace(/\,/g,'');
	  				  var total = (cspNwts == null ) ? 0 : cspNwts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Total Pending Order Wt.',
			datafield : 'totalPendingOrderWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var totPendWt = record['totalPendingOrderWt'];
	      		      var totPendWts = totPendWt.replace(/\,/g,'');
	  				  var total = (totPendWts == null ) ? 0 : totPendWts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		},

		{
			text : 'Pending Order Pure Wt.',
			datafield : 'pendingOrderPureWt',
			width : '5%',
			cellsalign : 'right',
			align : 'center',
			cellsformat : 'd3',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var pendOrdPWt = record['pendingOrderPureWt'];
	      		      var pendOrdPWts = pendOrdPWt.replace(/\,/g,'');
	  				  var total = (pendOrdPWts == null ) ? 0 : pendOrdPWts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Balance With Vendor Pure Wt.',
			datafield : 'balancewithVendorPureWt',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			  var balPwt = record['balancewithVendorPureWt'];
	      		      var balVendPwt = balPwt.replace(/\,/g,'');
	  				  var total = (balVendPwt == null ) ? 0 : balVendPwt;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Indent Pending Pure Wt',
			datafield : 'indentPendingPureWeight',
			width : '5%',
			cellsformat : 'd3',
			cellsalign : 'right',
			align : 'center',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			 var indPendPWt = record['indentPendingPureWeight'];
	      		      var indPendPWts = indPendPWt.replace(/\,/g,'');
	  				  var total = (indPendPWts == null ) ? 0 : indPendPWts;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Req Pure Gold',
			datafield : 'requiredPureGold',
			width : '5%',
			cellsalign : 'right',
			align : 'center',
			cellsformat : 'd3',
			sortable : false,
			cellsrenderer : removeComma,
			aggregates: [{          
	      		  'Total': function(aggregatedValue, currentValue, column, record) {
	      			 var reqPwt = record['requiredPureGold'];
	      		      var reqPwtGold = reqPwt.replace(/\,/g,'');
	  				  var total = (reqPwtGold == null) ? 0 : reqPwtGold;
	      			  return parseFloat(aggregatedValue) + parseFloat(total);
	      		  }
	      	  }],
	      	aggregatesrenderer: showAggregates   
		}, {
			text : 'Remarks',
			datafield : 'remarks',
			width : '5%',
			cellsalign : 'left',
			align : 'center'
		},

		]
	});
}
var metalRequirementReportFilter = function(id) {
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (id != "" && id != null && id == "goldTab") {
		fieldFilters.fieldFilters["segmentType"] = "G";
	}
	if (id != "" && id != null && id == "platinumTab") {
		fieldFilters.fieldFilters["segmentType"] = "P";
	}
	if (id != "" && id != null && id == "silverTab") {
		fieldFilters.fieldFilters["segmentType"] = "S";
	}
	return fieldFilters;
}

// ###################################################### Export
// Functionality##################################
$("#tabs").tabs();
$("#export").on(
		'click',
		function() {
			var $tabs = $('#tabs').tabs();
			var id = $("#exTab1 li.active").attr('id');
			if (id == "goldTab") {
				var data1 = "segmentGoldGride";
			} else if (id == "platinumTab") {
				var data1 = "segmentPlatinumGride";
			} else {
				var data1 = "segmentSilverDetGrid";
			}
			var newData = [];
			var sysdate = moment().format('DDMMYYYYHHmmSS');

			var rows = $('#' + data1).jqxGrid('getrows');
			if (rows == undefined || rows == 0) {
				$.growl.error({
					message : "No Data To Export",
					duration : 10000
				});
				return false;
			} else {
				var rows = $('#' + data1).jqxGrid('getdatainformation');
				if (rows.rowscount != 0) {
					postJSON('/OrderExecution/api/v1/metalrequirementExport',
							JSON.stringify(metalRequirementReportFilter(id)),
							function(data) {
								var metalReqExport = data.payload.list;

								exportMetalRequirement(metalReqExport);
							});
				} else {
					$.growl.error({
						message : "No Data to Export.",
						duration : 10000
					});
					return false;
				}
			}
		});
function exportMetalRequirement(data) {
	var sql0 = 'SEARCH / AS @pm \
		RETURN ( \
		@pm->vendorCode AS [Vendor Code], \
	       @pm->vendorName AS [Vendor Name], \
		   @pm->segment AS [Seg], \
	       @pm->stockOrderNetWt AS [St. Order Net Wt.], \
	       @pm->stockPreRepairNetWt AS [St. Pre Repair Net Wt], \
	       @pm->stockRPExpectedNetWt AS [St. RP Exp Net Wt], \
	       @pm->StockSPNetWt AS [St. SP Net Wt.], \
		   @pm->customerNOExpectedNetWt AS [Cust. NO Exp Net Wt.], \
	       @pm->customerNOReOrRWKPreNetWt AS [Cust. NO,RE/RWK Pre Net Wt.], \
	       @pm->customerNoOrReOrRWKExpectedNetWt AS [Cust. NO,RE/RWK Exp Net Wt], \
	       @pm->CustomerPreRPNetWt AS [Cust. Pre RP Net Wt.], \
           @pm->customerRpExpectedNetWt AS [Cust. RP Exp Net Wt.], \
	       @pm->customerSpNetWt AS [Cust. SP Net Wt.],\
		   @pm->totalPendingOrderWt AS [Total Pending Order Wt.], \
		   @pm->pendingOrderPureWt AS [Pending Order Pure Wt.], \
		   @pm->balancewithVendorPureWt AS [Balance With Vendor Pure Wt.], \
		   @pm->indentPendingPureWeight AS [Indent Pending Pure Wt.],\
		   @pm->requiredPureGold AS [Req Pure Gold] \
			) \
		FROM $0';

	var sql1 = 'SELECT * FROM ?';

	var res = null;

	var mystyle = {
		cellStyles : true,
		headers : true,
		column : {
			style : {
				Font : {
					Bold : 30
				}
			}
		},
		rows : {
			1 : {
				style : {
					Font : {
						Color : "#FF0077"
					}
				}
			}
		},
		cells : {
			1 : {
				1 : {
					style : {
						Font : {
							Color : "#00FFFF"
						}
					}
				}
			}
		}
	};

	try {

		res0 = alasql(sql0, [ data ]);
		res = alasql(sql1, [ res0 ]);
		adjustObjectKeys(res);
		removeNullData(res);
		res = alasql("SELECT * INTO XLSX('metalrequiremnt.xlsx',?) FROM ?", [
				mystyle, res ]);
	} catch (err) {
		alert(err.message);
	}
}

// ##################################################################### Search
// Functionality ####################################################
$('#metalReqs').validate(
		{
			errorElement : 'label',
			errorClass : 'help-inline',
			focusInvalid : false,
			ignore : "",
			rules : {
				"mSegObj" : {
					required : true
				}
			},
			errorPlacement : function(error, element) {
				if (element.context.name == "mSegObj") {
					error.insertAfter(element.parent());
				} else {
					error.insertAfter(element);
				}
			},
			submitHandler : function(form) {

				var mSegObj = $('#mSegObj').val();
				var mSeg = mSegObj[0];
				var fieldFilters = {
					"fieldFilters" : {
						"segmentType" : mSeg.toString()
					}
				};
				console.log($('#mSegment'));
				postJSON('/OrderExecution/api/v1/metalrequirementList', JSON
						.stringify(fieldFilters), function(data) {
					var metalSegment = data.payload.list;
					if (mSeg == "G") {

						$("#exTab1 ul li").removeClass('active');
						$("#goldTab").addClass('active');

						$("#tab2consignment").removeClass('active');
						$("#tab2consignment").removeClass('in');

						$("#tab4consignment").removeClass('active');
						$("#tab4consignment").removeClass('in');

						$("#tab1consignment").addClass('in active');

						metalRequirementGrid(metalSegment);
						$("#segmentGoldGride").show();
					}

					if (mSeg == "P") {
						$("#exTab1 ul li").removeClass('active');
						$("#platinumTab").addClass('active');

						$("#tab1consignment").removeClass('active');
						$("#tab1consignment").removeClass('in');

						$("#tab4consignment").removeClass('active');
						$("#tab4consignment").removeClass('in');

						$("#tab2consignment").addClass('in active');

						metalRequirementPlatinumGrid(metalSegment);
						$("#segmentPlatinumGride").show();
					}

					if (mSeg == "S") {
						$("#exTab1 ul li").removeClass('active');
						$("#silverTab").addClass('active');

						$("#tab1consignment").removeClass('active');
						$("#tab1consignment").removeClass('in');

						$("#tab2consignment").removeClass('active');
						$("#tab2consignment").removeClass('in');

						$("#tab4consignment").addClass('in active');

						metalRequirementSilverGrid(metalSegment);
						$("#segmentSilverDetGrid").show();
					}
					$("#metalSegSection").show();
				});

				return false;
			}
		});

$("#goldTab").on(
		'click',
		function() {
			var fieldFilters = {
				"fieldFilters" : {
					"segmentType" : "G"
				}
			};

			postJSON('/OrderExecution/api/v1/metalrequirementList', JSON
					.stringify(fieldFilters), function(data) {
				var metalSegment = data.payload.list;
				$("#exTab1 ul li").removeClass('active');
				$("#goldTab").addClass('active');

				$("#tab2consignment").removeClass('active');
				$("#tab2consignment").removeClass('in');

				$("#tab4consignment").removeClass('active');
				$("#tab4consignment").removeClass('in');

				$("#tab1consignment").addClass('in active');

				metalRequirementGrid(metalSegment);
				$("#segmentGoldGride").show();
			});
		});

$("#platinumTab").on(
		'click',
		function() {
			var fieldFilters = {
				"fieldFilters" : {
					"segmentType" : "P"
				}
			};

			postJSON('/OrderExecution/api/v1/metalrequirementList', JSON
					.stringify(fieldFilters), function(data) {
				var metalSegment = data.payload.list;
				$("#exTab1 ul li").removeClass('active');
				$("#platinumTab").addClass('active');

				$("#tab1consignment").removeClass('active');
				$("#tab1consignment").removeClass('in');

				$("#tab4consignment").removeClass('active');
				$("#tab4consignment").removeClass('in');

				$("#tab2consignment").addClass('in active');

				metalRequirementPlatinumGrid(metalSegment);
				$("#segmentPlatinumGride").show();
			});
		});

$("#silverTab").on(
		'click',
		function() {
			var fieldFilters = {
				"fieldFilters" : {
					"segmentType" : "S"
				}
			};

			postJSON('/OrderExecution/api/v1/metalrequirementList', JSON
					.stringify(fieldFilters), function(data) {
				var metalSegment = data.payload.list;

				$("#exTab1 ul li").removeClass('active');
				$("#silverTab").addClass('active');

				$("#tab1consignment").removeClass('active');
				$("#tab1consignment").removeClass('in');

				$("#tab2consignment").removeClass('active');
				$("#tab2consignment").removeClass('in');

				$("#tab4consignment").addClass('in active');

				metalRequirementSilverGrid(metalSegment);
				$("#segmentSilverDetGrid").show();
			});
		});

$("#metalSegSection").hide();
// Clear grid and reset input and Drop down value
$('#clearAll').on('click', function() {
	$('#mSegObj').multiselect("clearSelection");
	var validator = $("form").validate();
	validator.resetForm();
	$("#segmentGoldGride").jqxGrid('clear');
	$("#segmentGoldGride").hide();

	$("#segmentPlatinumGride").jqxGrid('clear');
	$("#segmentPlatinumGride").hide();

	$("#segmentSilverDetGrid").jqxGrid('clear');
	$("#segmentSilverDetGrid").hide();

	$("#metalSegSection").hide();

});

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

// Print Functionality to be done by Venkat
// #######################################
$("#printMR").on('click', function() {
	var value = $('#mSegment option:Selected').attr('code');

	var segIds = $.map($("#mSegment option:selected"), function(el, i) {
		return $(el).attr('code');
	});
	var sids = segIds.join(", ");
	fieldFilters = {
		"fieldFilters" : {
			"SegmentId" : sids,
			"mode" : "pdf",
			"reportName" : "RPT_Metal_Requirement_Report"
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
				navigator.msSaveBlob(file, 'RPT_Metal_Requirement_Report.pdf');
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