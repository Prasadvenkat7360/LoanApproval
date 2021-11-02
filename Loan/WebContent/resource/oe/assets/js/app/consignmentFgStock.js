/*<!-- 
	##	Author1 (UI)    :   Pooja sangve
	## 	Integration	    :   Raksha  
	##	Date Creation 	: 	11-10-2017
	## 	Description		:	Consignment FG Stock Available Sale Report
 -->
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

$("#fromDateF").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    },  
});

var updates = new Object();
$("#toDateF").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});


//Field Filters
var consignmentFgFieldFilters = function() {
	var statusF = $('#statusF').val();
	var fromDateF = $('#fromDateF').val();
	var toDateF = $('#toDateF').val();
	var vendorCodeF = $('#vendorCodeF').val();
	var mrvNoF = $('#mrvNoF').val();
	var storeDCF = $('#storeDCF').val();
	var storeDcNameF = $('#storeDcNameF').val();
	var SegmentF = $('#SegmentF').val();
	var jwlCodeF = $('#jwlCodeF').val();
	var mainCatF = $('#mainCatF').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (statusF != "" && statusF != null) {
		fieldFilters.fieldFilters["status"] = statusF;
	}
	if (fromDateF != "" && fromDateF != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateF;
	}
	if (toDateF != "" && toDateF != null) {
		fieldFilters.fieldFilters["toDate"] = toDateF;
	}	
	var vCodeObj = $('#vCodeObj').val();
	if (vCodeObj == null || vCodeObj == "") {
		var vendorCodeF = "";
	} else {
		var vendorCodeF = vCodeObj.join(",");
	}
	if (vendorCodeF != "" && vendorCodeF != null) {
		fieldFilters.fieldFilters["vendorIds"] = vendorCodeF;
	}
	if (mrvNoF != "" && mrvNoF != null) {
		fieldFilters.fieldFilters["mrvNo"] = mrvNoF;
	}
	if (storeDCF != "" && storeDCF != null) {
		fieldFilters.fieldFilters["storeOrDC"] = storeDCF;
	}
	var storeDcNameObj = $('#storeDcNameObj').val();
	if (storeDcNameObj == null || storeDcNameObj == "") {
		var storeDcNameF = "";
	} else {
		var storeDcNameF = storeDcNameObj.join(",");
	}
	if (storeDcNameF != "" && storeDcNameF != null) {
		fieldFilters.fieldFilters["storeOrDcIds"] = storeDcNameF;
	}
	var artSegObj = $('#artSegObj').val();
	if (artSegObj == null || artSegObj == "") {
		var SegmentF = "";
	} else {
		var SegmentF = artSegObj.join(",");
	}
	if (SegmentF != "" && SegmentF != null) {
		fieldFilters.fieldFilters["segIds"] = SegmentF;
	}
	var jewelCodeObj = $('#jewelCodeObj').val();
	if (jewelCodeObj == null || jewelCodeObj == "") {
		var jwlCodeF = "";
	} else {
		var jwlCodeF = jewelCodeObj.join(",");
	}
	if (jwlCodeF != "" && jwlCodeF != null) {
		fieldFilters.fieldFilters["jewelIds"] = jwlCodeF;
	}
	var mainCatObj = $('#mainCatObj').val();
	if (mainCatObj == null || mainCatObj == "") {
		var mainCatF = "";
	} else {
		var mainCatF = mainCatObj.join(",");
	}
	if (mainCatF != "" && mainCatF != null) {
		fieldFilters.fieldFilters["mainCatIds"] = mainCatF;
	}
	return fieldFilters;
}

// on change of status disable  & enable from and to date
$("#statusF").on('change',function(){
	var status = $("#statusF").val();
	console.log(status);
	 if(status == "Sold" || status == "Returned To vendor"){
		 $("#fromDateF").prop('disabled',false);	
		 $("#toDateF").prop('disabled',false);	
	 }
	 else{
		 $("#fromDateF").prop('disabled',true);	
		 $("#toDateF").prop('disabled',true);	
	 }	 
});

//on Load Lov's
var onLoadFunction = function() {
$.getJSON('/OrderExecution/api/v1/consignmentFGStkLovs',function(data) {
		var artSeg = data.payload.metalSegments;
		var vCode  = data.payload.vendorList;
		
		// status lov 
		$('#statusF').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.statusList, function(key, val) {
			$('#statusF').append('<option value="' + val.name + '">' + val.name + '</option>');
		});
				
		// Vendor Code Lov
		var v = '<select id="vCodeObj"  name="vCodeObj" class="form-control" multiple="multiple">';
			$.each(vCode, function(key, val) {
			v += '<option value="' + val.id + '">' + val.name + '</option>'; });
			v += '</select>';
			$("#vendorCodeF").html(v);
			$('#vCodeObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});	
				
		// article Segment Lov
		var a = '<select id="artSegObj"  name="artSegObj" class="form-control" multiple="multiple">';
			$.each(artSeg, function(key, val) {
			a += '<option value="' + val.id + '">' + val.description + '</option>'; });
			a += '</select>';
			$("#SegmentF").html(a);
			$('#artSegObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			// Store/Dc Type 
			$('#storeDCF').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.storeDcTypes, function(key, val) {
			$('#storeDCF').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
	
		});
}
onLoadFunction();

// on change of store/dc  load store/dc name
$("#storeDcHide").hide();
$("#storeDCF").on("change",function(){
	$("#storeDcHide").show();
	var id = $("#storeDCF").val();
	if(id != ""){
	$.getJSON('/OrderExecution/api/v1/getStorDcForLSC?type='+id, function(data) {
	var allStoreOrDc = data.payload.allStoreOrDc;
		var storeDC = '<select id="storeDcNameObj"  name="storeDcNameObj" class="form-control" multiple="multiple">';   
		$.each(allStoreOrDc, function(key, val) {
		storeDC +='<option value="' + val.id + '">' + val.name + '</option>';
		});
		
		storeDC +='</select>'; 
		
		$("#storeDcNameF").html(storeDC);
		
		$('#storeDcNameObj').multiselect({ 
	        includeSelectAllOption: true,
	        enableFiltering:false,         
	        maxHeight:250,
	        numberDisplayed:1,
	        buttonClass: 'col-md-12 form-control text-left'
  	    });
    });
  }
})


//on change of vendor code load MRV No
$("#vendorCodeF").on('change',function(){
	$('#mrvNoF').empty().append('<option value="" selected>--Select--</option>');
	var vCodeObj = $("#vCodeObj").val();
	vCodeObj = vCodeObj.join(',');
	var params ={"fieldFilters":
		{
		 "type": "mrvNoList",
		  "vendorIds": vCodeObj.toString()
		}
	}
	postJSON('/OrderExecution/api/v1/getConFGdependentLovsList', JSON.stringify(params), function(data) {
		$.each(data.payload.mrvHeadIds, function(key, val) {
			$('#mrvNoF').append('<option value="' + val + '">' + val + '</option>');
		});			
	 });	
});

//on change of segment load Jewel type
$("#jCode").hide();
$("#SegmentF").on('change',function(){
	$("#jCode").show();
	var artSegObj = $("#artSegObj").val();
	artSegObj = artSegObj.join(',');
	var params ={"fieldFilters":
		{
		 "type": "jewelTypeList",
		  "segIds": artSegObj.toString()
		}
	}
	postJSON('/OrderExecution/api/v1/getConFGdependentLovsList', JSON.stringify(params), function(data) {
		var j = '<select id="jewelCodeObj"  name="jewelCodeObj" class="form-control" multiple="multiple">';
			$.each(data.payload.JewelTypesList, function(key, val) {
			j += '<option value="' + val.id + '">' + val.description + '</option>'; 
			});
			
			j += '</select>';
			
			$("#jwlCodeF").html(j);
			
			$('#jewelCodeObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		});	
	});

//on change of Jewel type load main cat 
$("#mainCat").hide();
$("#jwlCodeF").on('change',function(){
	$("#mainCat").show();
	var artSegObj = $("#artSegObj").val();
	var jewelObj = $("#jewelCodeObj").val();
	artSegObj = artSegObj.join(',');
	jewelObj = jewelObj.join(',');
	var params ={"fieldFilters":
	 {
		 "type": "mainCatList",
		 "segIds": artSegObj.toString(),
		 "jewelIds" : jewelObj.toString(),
		  
	 }
}
	postJSON('/OrderExecution/api/v1/getConFGdependentLovsList', JSON.stringify(params), function(data) {
		var m = '<select id="mainCatObj"  name="mainCatObj" class="form-control" multiple="multiple">';
			$.each(data.payload.mainCatList, function(key, val) {
			m += '<option value="' + val.id + '">' + val.description + '</option>'; 
			});
			
			m += '</select>';
			
			$("#mainCatF").html(m);
			
			$('#mainCatObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		});	
	});

//###################################### Search Grid  ###################################################

var consignmentFGSearchGridF = function(data) {
	
	var source = {
		datafields : [ 
			{'name' : 'storeName','type' : 'string','map':'storeOrDCName'},
			{'name' : 'mrvDate','type' : 'date','map':'mrvdate'},
			{'name' : 'mrvNo','type' : 'int','map':'mrvNo'}, 
			{'name' : 'vendorCode','type' : 'string','map':'venCode'},
			{'name' : 'zone','type' : 'string','map':'zoneId'},
			{'name' : 'articleSegment','type' : 'string','map':'segDes'},
			{'name' : 'venBillNo','type' : 'int','map':'venPartyBillNo'}, 
	        {'name' : 'subCate','type' : 'string','map':'subCatDes'},
			{'name' : 'jwlCode','type' : 'string','map':'jewelDesc'},
			{'name' : 'stockNo','type' : 'string','map':'stock_id'}, 
			{'name' : 'pcs','type' : 'int','map':'pieces'}, 
			{'name' : 'grWt','type' : 'float','map':'grossWt'}, 
			{'name' : 'netWt','type' : 'float','map':'netWt'},
			{'name' : 'costWastage','type' : 'float','map':'costWastageWt'},
			{'name' : 'costLabour','type' : 'float','map':'costLabour'}, 
			{'name' : 'goldRate','type' : 'string','map':'goldRate'},
			{'name' : 'stoneAccCode','type' : 'string','map':'stoneOrAccCode'}, 
			{'name' : 'StoneAccPcs','type' : 'int','map':'stoneOrAccPcs'},
			{'name' : 'stnAccWt','type' : 'float','map':'stoneOrAccWt'},
			{'name' : 'uqc','type' : 'string','map':'stoneOrAccUOM'},
			{'name' : 'certificateNo','type' : 'int','map':''}, 
			{'name' : 'stnAccRate','type' : 'string','map':'stoneOrAccRate'}, 
			{'name' : 'stnAccCost','type' : 'float','map':'stoneOrAccCost'},
			{'name' : 'lineItemCost','type' : 'float','map':'lineItemCost'},
			{'name' : 'grNo','type' : 'int','map':'grNo'}, 
			{'name' : 'startDate','type' : 'date','map':'statusDate'},
			{'name' : 'itemStatus','type' : 'string','map':'status'},
			{'name' : 'noOfdaysatCompany','type' : 'int','map':'noOfPendingDays'}
			],
		localdata : data
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridFg").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : false,
		columnsheight : 50,
		rowsheight : 30,
		autorowheight : true,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		showstatusbar: true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		columns : [ 
			{'text' : 'Store Name','datafield' : 'storeName','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'GRV No','datafield' : 'mrvNo','width' : '4%',sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'GRV Date','datafield' : 'mrvDate','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'},
			{'text' : 'Ven Code','datafield' : 'vendorCode','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Vend Bill No.','datafield' : 'venBillNo','width' : '4.5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Zone','datafield' : 'zone','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Article Seg','datafield' : 'articleSegment','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Sub Cat','datafield' : 'subCate','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Jwl Code','datafield' : 'jwlCode','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stock No.','datafield' : 'stockNo','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center',
				  aggregates: [{          
		    		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['pcs'] == null) ? 0 : record['pcs'];
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
			{'text' : 'Gross Wt.','datafield' : 'grWt','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
				  aggregates: [{          
		    		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['grWt'] == null) ? 0 : record['grWt'];
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
			{'text' : 'Net Wt.','datafield' : 'netWt','width' : '4%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
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
			{'text' : 'Cost Wastage','datafield' : 'costWastage','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				aggregates: [{          
		    		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['costWastage'] == null) ? 0 : record['costWastage'];
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
			{'text' : 'Cost Labour','datafield' : 'costLabour','width' : '4%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				aggregates: [{          
		    		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['costLabour'] == null) ? 0 : record['costLabour'];
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
			{'text' : 'Gold  Rate','datafield' : 'goldRate','width' : '4%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Stn/Acc Code','datafield' : 'stoneAccCode','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Stn/Acc Pcs','datafield' : 'StoneAccPcs','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stn/Acc Wt','datafield' : 'stnAccWt','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '3.5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Cert No.','datafield' : 'certificateNo','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stn/Acc Rate','datafield' : 'stnAccRate','width' : '4.5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Stn/Acc Cost','datafield' : 'stnAccCost','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				aggregates: [{          
		    		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['stnAccCost'] == null) ? 0 : record['stnAccCost'];
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
			{'text' : 'Line Item Cost','datafield' : 'lineItemCost','width' : '5.5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				aggregates: [{          
		    		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['lineItemCost'] == null) ? 0 : record['lineItemCost'];
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
			{'text' : 'GR No.','datafield' : 'grNo','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Item Status','datafield' : 'itemStatus','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Status Date','datafield' : 'startDate','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
			{'text' : 'No of days @ Comp','datafield' : 'noOfdaysatCompany','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			]

	});	
}

$("#searchFg").on("click",function(){
	var fieldFilterVals = consignmentFgFieldFilters();
	postJSON('/OrderExecution/api/v1/getConsignmentFGAvailList',JSON.stringify(fieldFilterVals),function(data) {
		var response = data.payload.list;	
		consignmentFGSearchGridF(response);
		$("#jqxgridFg").show();
	});
});

//###################### Export functionality #######################
$("#exportFg").on("click",function() {
			var data;
		    var newData = [];
		    var statusF = $('#statusF').val();
			var fromDateF = $('#fromDateF').val();
			var toDateF = $('#toDateF').val();
			var vendorCodeF = $('#vendorCodeF').val();
			var mrvNoF = $('#mrvNoF').val();
			var storeDCF = $('#storeDCF').val();
			var storeDcNameF = $('#storeDcNameF').val();
			var SegmentF = $('#SegmentF').val();
			var jwlCodeF = $('#jwlCodeF').val();
			var mainCatF = $('#mainCatF').val();
			
			fieldFilters = {
				"fieldFilters" : {}
			};
			if (statusF != "" && statusF != null) {
				fieldFilters.fieldFilters["status"] = statusF;
			}
			if (fromDateF != "" && fromDateF != null) {
				fieldFilters.fieldFilters["fromDate"] = fromDateF;
			}
			if (toDateF != "" && toDateF != null) {
				fieldFilters.fieldFilters["toDate"] = toDateF;
			}	
			var vCodeObj = $('#vCodeObj').val();
			if (vCodeObj == null || vCodeObj == "") {
				var vendorCodeF = "";
			} else {
				var vendorCodeF = vCodeObj.join(",");
			}
			if (vendorCodeF != "" && vendorCodeF != null) {
				fieldFilters.fieldFilters["vendorIds"] = vendorCodeF;
			}
			if (mrvNoF != "" && mrvNoF != null) {
				fieldFilters.fieldFilters["mrvNo"] = mrvNoF;
			}
			if (storeDCF != "" && storeDCF != null) {
				fieldFilters.fieldFilters["storeOrDC"] = storeDCF;
			}
			var storeDcNameObj = $('#storeDcNameObj').val();
			if (storeDcNameObj == null || storeDcNameObj == "") {
				var storeDcNameF = "";
			} else {
				var storeDcNameF = storeDcNameObj.join(",");
			}
			if (storeDcNameF != "" && storeDcNameF != null) {
				fieldFilters.fieldFilters["storeOrDcIds"] = storeDcNameF;
			}
			var artSegObj = $('#artSegObj').val();
			if (artSegObj == null || artSegObj == "") {
				var SegmentF = "";
			} else {
				var SegmentF = artSegObj.join(",");
			}
			if (SegmentF != "" && SegmentF != null) {
				fieldFilters.fieldFilters["segIds"] = SegmentF;
			}
			var jewelCodeObj = $('#jewelCodeObj').val();
			if (jewelCodeObj == null || jewelCodeObj == "") {
				var jwlCodeF = "";
			} else {
				var jwlCodeF = jewelCodeObj.join(",");
			}
			if (jwlCodeF != "" && jwlCodeF != null) {
				fieldFilters.fieldFilters["jewelIds"] = jwlCodeF;
			}
			var mainCatObj = $('#mainCatObj').val();
			if (mainCatObj == null || mainCatObj == "") {
				var mainCatF = "";
			} else {
				var mainCatF = mainCatObj.join(",");
			}
			if (mainCatF != "" && mainCatF != null) {
				fieldFilters.fieldFilters["mainCatIds"] = mainCatF;
			}
			
			     var sysdate = moment().format('DDMMYYYYHHmmSS');
				 var rows = $("#jqxgridFg").jqxGrid('getrows');
				 if(typeof rows == "undefined"){
					$.growl.error({
						message : "No Data to Export.",
						duration : 10000
					});
					return false;
					}else{			
						var rows = $("#jqxgridFg").jqxGrid('getdatainformation');
						if(rows.rowscount != 0){
     					postJSON('/OrderExecution/api/v1/getConsignmentFGAvailListExport ',JSON.stringify(fieldFilters),function(response) {
					   if(response != null){
                       data = response.payload.list;
                       for (i = 0; i < data.length; i++) {
						newData.push({
							'Store Name' : (data[i].storeOrDCName != null) ? data[i].storeOrDCName : "",
							'GRV No' : (data[i].mrvNo != null) ? data[i].mrvNo : "",
							'GRV Date' : (data[i].mrvdate != null) ? data[i].mrvdate  : "",		
							'Vendor Code' : (data[i].venCode != null) ? data[i].venCode  : "",
							'Vendor Bill No' : (data[i].venPartyBillNo != null) ? data[i].venPartyBillNo : "",
							'Zone' : (data[i].zoneId != null) ? data[i].zoneId : "",
							'Article Segment' : (data[i].segDes != null) ? data[i].segDes : "",
							'Sub Cat' : (data[i].subCatDes != null) ? data[i].subCatDes : "",		
							'Jewel Code' : (data[i].jewelDesc != null) ? data[i].jewelDesc : "",	
							'Stock No' : (data[i].stock_id != null) ? data[i].stock_id : "",
							'Pcs' : (data[i].pieces != null) ? data[i].pieces : "",
							'Gross Wt' : (data[i].grossWt!= null) ? data[i].grossWt  : "",		
							'Net Wt' : (data[i].netWt != null) ? data[i].netWt  : "",
							'Cost Wastage' : (data[i].costWastageWt != null) ? data[i].costWastageWt : "",
							'Cost Labour' : (data[i].costLabour != null) ? data[i].costLabour : "",
							'Gold Rate' : (data[i].goldRate != null) ? data[i].goldRate : "",
							'Stone/Acc Code ' : (data[i].stoneOrAccCode != null) ? data[i].stoneOrAccCode : "",
							'Stone/Acc Pcs' : (data[i].stoneOrAccPcs!= null) ? data[i].stoneOrAccPcs  : "",
							'Stone/Acc Wt' : (data[i].stoneOrAccWt != null) ? data[i].stoneOrAccWt : "",
							'UQC' : (data[i].stoneOrAccUOM != null) ? data[i].stoneOrAccUOM : "",
							//'Cert No' : (data[i].refsalesBillNo != null) ? data[i].refsalesBillNo : "",
							'Stone/Acc Rate' : (data[i].stoneOrAccRate != null) ? data[i].stoneOrAccRate : "",	
							'Stone/Acc Cost' : (data[i].stoneOrAccCost != null) ? data[i].stoneOrAccCost : "",		
							'Line Item Cost' : (data[i].lineItemCost != null) ? data[i].lineItemCost : "",	
							'GR No' : (data[i].grNo != null) ? data[i].grNo : "",	
							'Item Status' : (data[i].status != null) ? data[i].status : "",	
							'Status Date' : (data[i].statusDate != null) ? data[i].statusDate : "",	
							'No of Days @ Comp' : (data[i].noOfPendingDays != null) ? data[i].noOfPendingDays : "",	
                           });
								
                       }
                     //  JSONToCSVConvertor(newData, "Consignment_FG_Stock_Available Sale" + "_" + sysdate, true);
                       var opts = [{sheetid:'Consignment_FG_Stock_Available Sale',header:true}];
                       var res = alasql('SELECT * INTO XLSX("Consignment FG Stock Available Sale_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

$("#clearAllFg").on('click', function() {
	$('#vCodeObj').multiselect("clearSelection");
	$('#artSegObj').multiselect("clearSelection");
	$('#storeDcNameObj').multiselect("clearSelection");
	$('#jewelCodeObj').multiselect("clearSelection");
	$('#mainCatObj').multiselect("clearSelection");
	
	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgridFg").jqxGrid('clear');
	$("#jqxgridFg").hide();
});