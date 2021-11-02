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

$("#unsettingGrCreate").hide();
$("#createUnsetGr").on('click', function(){
	$("#unsetGrSearch").hide();
	$("#unsetGrHeader").hide();
	$("#unsettingGrCreate").show();
});

$("#goback").on('click', function(){
	window.location.href="javascript:showContentPage('unsettingGrCreate', 'bodySwitcher')";
});


// date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

//Smart Search For Vendor Code
$.getJSON('/OrderExecution/api/v1/getVendorDcCodeSPQuery', function(data) {
	vendorList = data.payload.vendorCode;
	var data = [];
	$.each(vendorList, function(key, value) {
		data.push({
			value : value.id,
			label : value.vendorCode + "-" + value.vendorName
		});
	});

	$(function() {
		$("#vendorCode").autocomplete({

			source : data,
			focus : function(event, ui) {

				event.preventDefault();
				$(this).val(ui.item.label);
			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
				$("#vendorCode-value").val(ui.item.value);
			}
		});
	});

});

//Smart Search For GR NO
$.getJSON('/OrderExecution/api/v1/searchUnsOnloadLOVs', function(data) {
	grNoList = data.payload.unsGRNoList;
	var data = [];
	$.each(grNoList, function(key, value) {
		data.push({
			value : value.grNo,
			label : value.grNo
		});
	});

	$(function() {
		$("#grNoS").autocomplete({

			source : data,
			focus : function(event, ui) {

				event.preventDefault();
				$(this).val(ui.item.label);
			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
				$("#grNoS-value").val(ui.item.value);
			}
		});
	});
});

//Smart Search For Lot No
$.getJSON('/OrderExecution/api/v1/searchUnsOnloadLOVs', function(data) {
	lotNoList = data.payload.lotList;
	var data = [];
	$.each(lotNoList, function(key, value) {
		data.push({
			value : value.lotNo,
			label : value.lotNo
		});
	});

	$(function() {
		$("#lotNoS").autocomplete({

			source : data,
			focus : function(event, ui) {

				event.preventDefault();
				$(this).val(ui.item.label);
			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
				$("#lotNoS-value").val(ui.item.value);
			}
		});
	});
});

$.getJSON('/OrderExecution/api/v1/searchUnsOnloadLOVs', function(data) {
	$('#grDoneByS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.cList, function(key, val) {
		$('#grDoneByS').append('<option value="' + val.createdBy.empId + '">' + val.createdBy.name + '</option>');
	});
});


// Create on load LOV
var onloadLov = function(){
$.getJSON('/OrderExecution/api/v1/createUnsettingGROnloadLOV', function(data) {
	$('#lotNoC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.List, function(key, val) {
		$('#lotNoC').append('<option value="' + val.lotNo + '">' + val.lotNo + '</option>');		
	});
		$("#grDateC").val(data.payload.createdDate);
});
}

onloadLov();

var vendorDet = function() {
	var vendorDetS = {
		"fieldFilters" : {
			"type":"getGRDetails",
			"lotNo" : $("#lotNoC").val(),
			"isSplitStock" : false
		}
	}
	return vendorDetS;
 }

$("#lotNoC").on("change",function() {
	var vendorDetails = vendorDet();
	if (vendorDetails) {
		if($(this).val() != null || $(this).val() != ""){
		postJSON('/OrderExecution/api/v1/createUnsettingGRDetails', JSON.stringify(vendorDetails), function(data) {
			if(data.resCode == 1){
			$("#vendorCodeC").val(data.payload.GRDetails.vendor.vendorName);
			$("#vendorCodeCId").val(data.payload.GRDetails.vendor.vendorId);
			$("#lossCostLabour").val(data.payload.GRDetails.lossCostLabour);
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
		}
	}
});


//Stone Diamond Grid
var preUnsetWt;
var stoneDiamondItemGrid = function(data,type) {
	var source = {
			datafields : [ 
				{name : 'lotNo', type : 'int'}, 
				{name : 'refType', type : 'int'},
				{name : 'docType', type : 'string'},
				{name : 'location', type : 'string'},
				{name : 'refType', type : 'string'},
				{name : 'segment', type : 'string'},
				{name : 'category', type : 'string'}, 
				{name : 'subCategoryDesc', type : 'string'},
				{name : 'articleCode', type : 'string'},
				{name : 'clarity', type : 'string'},
				{name : 'color', type : 'string'},
				{name : 'cutGrade', type : 'string'},
				{name : 'actualColor', type : 'string'},
				{name : 'preUnsStonePcs', type : 'int','map':'stonePcs'},
				{name : 'preUnsStoneWt', type : 'float','map':'stoneWt'},
				{name: 'weightRange', type: 'string'},
				{name : 'UQC', type : 'string'},
				{name : 'shapeId', type : 'float'},
				{name : 'shape', type : 'float'},
				{name : 'segmentId', type : 'int'},
				{name : 'categoryId', type : 'int'},
				{name : 'suppliedBy',type:'string'},
				{name : 'toWtCost', type : 'string'},
				{name : 'frmWtCost', type : 'string'},
				{name : 'stoneMasterId', type : 'string',map:'stoneMaster>id'},
				{name : 'postUnsStoneWt', type : 'float'},
				{name : 'postUnsStonePcs', type : 'int'},
				{name : 'brkWtRec', type : 'float'},
				{name : 'diffStoneWt', type : 'float'},
				{name : 'suppBy', type : 'string','map':'suppliedBy'},
				{name : 'stoneCost', type : 'float'},
				{name : 'unsLossOrGainValue', type : 'float'},
				{name : 'brkCost', type : 'float'},
				{name : 'diffStoneVal', type : 'float'},
				{name : 'packetId', type : 'int'},
				
		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#stoneDiamondItemGrid").jqxGrid({
		    source : dataAdapter,
			width : '100%',
			editable : true,
			height : 100,
			columnsheight : 45,
			autorowheight : true,
			autoheight : true,
			theme: 'energyblue',
			altRows : true,
			columnsresize : true,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Stone Diamond Details');			
		},
		columns : [ 
			{text: '', datafield : 'stoneMasterId',hidden:true},
			{ text : '', datafield : 'frmWtCost', hidden:true},
			{ text : '', datafield : 'toWtCost', hidden:true},
			{ text : 'Lot No', datafield : 'lotNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Type', datafield : 'refType',hidden:true, width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Type', datafield : 'docType', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Location', datafield : 'location', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Seg', datafield : 'segment', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Cat.', datafield : 'category', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Shape', datafield : 'shape', width : '10%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
			{ text : 'Article Code', datafield : 'articleCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Cost', datafield : 'stoneCost',cellsformat : 'd2', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false},
			{ text : 'Supplied By', datafield : 'suppBy', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Wt. Range', datafield : 'weightRange', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pre-Unset Pcs', datafield : 'preUnsStonePcs', width : '5%', cellsalign : 'center', align : 'center', editable : true, sortable : false,
				cellbeginedit : function(row){
					var gWt = jQuery('#jqxgridS').jqxGrid ('getcellvalue', row, 'postUnsetGwt');
					var nWt = jQuery('#jqxgridS').jqxGrid ('getcellvalue', row, 'postUnsetNwt');
					preUnsetWt = parseFloat(gWt) - parseFloat(nWt);
					if((parseFloat(gWt) - parseFloat(nWt)) > 0){
						return false;
					}else{
						return false;
					}
				},
		
			},
			{ text : 'Pre-Unset Wt.', datafield : 'preUnsStoneWt', width : '7%', cellsalign : 'right', align : 'center', editable : true, sortable : false, cellsformat : 'd3', columntype: 'numberinput',
				cellbeginedit : function(row){
					var gWt = jQuery('#jqxgridS').jqxGrid ('getcellvalue', row, 'postUnsetGwt');
					var nWt = jQuery('#jqxgridS').jqxGrid ('getcellvalue', row, 'postUnsetNwt');
					
					if((parseFloat(gWt) - parseFloat(nWt)) > 0){
						return false;
					}else{
						return false;
					}
				},
			},
			{ text : 'Post-Unset Pcs', datafield : 'postUnsStonePcs', width : '5.5%', cellsalign : 'center', align : 'center', editable : true, columntype: 'numberinput',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue < 0){
						$.growl.error({
							message : "Please Enter Valid Post-Unset Pcs !!",
							duration : 10000,
							title : 'Error'
						});
						return "";
					}
				},
				cellbeginedit : function(row){
					console.log(type);
					if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{ text : 'Post-Unset Wt.', datafield : 'postUnsStoneWt', width : '6.5%', cellsalign : 'right', align : 'center', editable : true, sortable : false, cellsformat : 'd3',columntype: 'numberinput',
				 initeditor: function (row, cellvalue, editor, celltext, pressedChar) {
				        editor.jqxNumberInput({ decimalDigits: 3 });
				    },
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue < 0){
						$.growl.error({
							message : "Please Enter Valid Post-Unset Wt !!",
							duration : 10000,
							title : 'Error'
						});
						return "";
					}
					var breakageWt = jQuery('#stoneDiamondItemGrid').jqxGrid ('getcellvalue', row, 'brkWtRec');
					var preWt = jQuery('#stoneDiamondItemGrid').jqxGrid ('getcellvalue', row, 'preUnsStoneWt');
					var prePcs = jQuery('#stoneDiamondItemGrid').jqxGrid ('getcellvalue', row, 'preUnsStonePcs');
					var stoneCost = jQuery('#stoneDiamondItemGrid').jqxGrid ('getcellvalue', row, 'stoneCost');
					
					var brkWtRec = jQuery('#stoneDiamondItemGrid').jqxGrid ('getcellvalue', row, 'brkWtRec');

					var diffWt = parseFloat(preWt) - (parseFloat(newvalue) + parseFloat(brkWtRec));
					$("#stoneDiamondItemGrid").jqxGrid('setcellvalue', row, "diffStoneWt", diffWt);
					
					 $("#stoneDiamondItemGrid").jqxGrid('setcellvalue', row, "diffStoneWt", diffWt);
					 var uom = jQuery('#stoneDiamondItemGrid').jqxGrid ('getcellvalue', row, 'UQC');
					 var unsLossOrGainValue ;
					 
					 if(uom != "Pcs"){
						 unsLossOrGainValue =  (diffWt * (stoneCost/preWt)).toFixed(2); 
					 }else{
						 unsLossOrGainValue =  (diffWt * (stoneCost/prePcs)).toFixed(2);
					 }
						
					 $("#stoneDiamondItemGrid").jqxGrid('setcellvalue', row, "unsLossOrGainValue", unsLossOrGainValue);
					 $("#stoneDiamondItemGrid").jqxGrid('setcellvalue', row, "diffStoneVal", unsLossOrGainValue);
				},
				cellbeginedit : function(row){
					if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{ text : 'Breakage Wt.', datafield : 'brkWtRec', width : '6%', cellsalign : 'right', align : 'center', editable : true, sortable : false, cellsformat : 'd3',columntype: 'numberinput',
				initeditor: function (row, cellvalue, editor, celltext, pressedChar) {
			        editor.jqxNumberInput({ decimalDigits: 3 });
			    },
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue < 0){
						$.growl.error({
							message : "Please Enter Valid Breakage Wt !!",
							duration : 10000,
							title : 'Error'
						});
						return "";
					}
					
					var preWt = jQuery('#stoneDiamondItemGrid').jqxGrid ('getcellvalue', row, 'preUnsStoneWt');
					var stoneCost = jQuery('#stoneDiamondItemGrid').jqxGrid ('getcellvalue', row, 'stoneCost');
					var postUnsStoneWt = jQuery('#stoneDiamondItemGrid').jqxGrid ('getcellvalue', row, 'postUnsStoneWt');
					var prePcs = jQuery('#stoneDiamondItemGrid').jqxGrid ('getcellvalue', row, 'preUnsStonePcs');

					var diffWt = parseFloat(preWt) - (parseFloat(newvalue) + parseFloat(postUnsStoneWt));
					$("#stoneDiamondItemGrid").jqxGrid('setcellvalue', row, "diffStoneWt", diffWt);
				
					var brkCost = (newvalue * (stoneCost/preWt)).toFixed(2);
					$("#stoneDiamondItemGrid").jqxGrid('setcellvalue', row, "brkCost", brkCost);
					
					var unsLossOrGainValue;
					 var uom = jQuery('#stoneDiamondItemGrid').jqxGrid ('getcellvalue', row, 'UQC');

					 if(uom != "Pcs"){
						 unsLossOrGainValue =  (diffWt * (stoneCost/preWt)).toFixed(2); 
					 }else{
						 unsLossOrGainValue =  (diffWt * (stoneCost/prePcs)).toFixed(2);
					 }
						
					// $("#stoneDiamondItemGrid").jqxGrid('setcellvalue', row, "unsLossOrGainValue", unsLossOrGainValue);
					 $("#stoneDiamondItemGrid").jqxGrid('setcellvalue', row, "diffStoneVal", unsLossOrGainValue);
				},
				cellbeginedit : function(row){
					if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{ text : 'Diff Wt.', datafield : 'diffStoneWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3',},
			{ text : 'Diff Val', datafield : 'diffStoneVal', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'UQC', datafield : 'UQC', width : '3%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : '', datafield : 'unsLossOrGainValue', hidden:true, cellsformat : 'd2'},
			{ text : '', datafield : 'brkCost', hidden:true, cellsformat : 'd2'},
			{ text : '', datafield : 'packetId', hidden:true, cellsformat : 'd2'}
		]
	});
}

//Other Stones Grid
var otherStoneItemGrid = function(data,type) {
	var source = {
			datafields : [ 
				{name : 'lotNo', type : 'int'}, 
				{name : 'refType', type : 'int'},
				{name : 'docType', type : 'string'},
				{name : 'location', type : 'string'},
				{name : 'refType', type : 'string'},
				{name : 'segment', type : 'string'},
				{name : 'category', type : 'string'}, 
				{name : 'subCategoryDesc', type : 'string'},
				{name : 'articleCode', type : 'string'},
				{name : 'clarity', type : 'string'},
				{name : 'color', type : 'string'},
				{name : 'cutGrade', type : 'string'},
				{name : 'actualColor', type : 'string'},
				{name : 'preUnsStonePcs', type : 'int','map':'stonePcs'},
				{name : 'preUnsStoneWt', type : 'float','map':'stoneWt'},
				{name: 'costRange', type: 'string'},
				{name : 'UQC', type : 'string'},
				{name : 'shapeId', type : 'float'},
				{name : 'shape', type : 'float'},
				{name : 'segmentId', type : 'int'},
				{name : 'categoryId', type : 'int'},
				{name : 'suppliedBy',type:'string'},
				{name : 'toWtCost', type : 'string'},
				{name : 'frmWtCost', type : 'string','map':'frmWtCost'},
				{name : 'stoneMasterId', type : 'string',map:'stoneMaster>id'},
				{name : 'postUnsStoneWt', type : 'float'},
				{name : 'postUnsStonePcs', type : 'int'},
				{name : 'brkWtRec', type : 'float'},
				{name : 'diffStoneWt', type : 'float'},
				{name : 'suppBy', type : 'string','map':'suppliedBy'},
				{name : 'stoneCost', type : 'float'},
				{name : 'unsLossOrGainValue', type : 'float'},
				{name : 'brkCost', type : 'float'},
				{name : 'diffStoneVal', type : 'float'},

			],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#otherStoneItemGrid").jqxGrid({
	        source : dataAdapter,
			width : '100%',
			editable : true,
			height : 100,
			columnsheight : 45,
			autorowheight : true,
			autoheight : true,
			altRows : true,
			theme: 'energyblue',
			columnsresize : true,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Other Stones Details');			
		},
		columns : [ 
			{text: '', datafield : 'stoneMasterId', hidden:true},
			{ text : '', datafield : 'frmWtCost', hidden:true},
			{ text : '', datafield : 'toWtCost', hidden:true},
			{ text : 'Lot No', datafield : 'lotNo', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Type', datafield : 'refType',hidden:true, width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Type', datafield : 'docType', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Location', datafield : 'location', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Seg', datafield : 'segment', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Cat.', datafield : 'category', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat', datafield : 'subCategoryDesc', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Article Code', datafield : 'articleCode', width : '6.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Cost', datafield : 'stoneCost', cellsformat : 'd2',width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supplied By', datafield : 'suppBy', width : '6.5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cost Range', datafield : 'costRange', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
					var toWtCost = $('#otherStoneItemGrid').jqxGrid('getcellvalue', row, 'toWtCost');
					var fromWtCost = $('#otherStoneItemGrid').jqxGrid('getcellvalue', row, 'frmWtCost');
					console.log(fromWtCost);
					var costRange = fromWtCost + "-" + toWtCost ;
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + costRange  + '</div>';
				 }
			},
			{ text : 'Pre-Unset Pcs', datafield : 'preUnsStonePcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pre-Unset Wt.', datafield : 'preUnsStoneWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Post-Unset Pcs', datafield : 'postUnsStonePcs', width : '6%', cellsalign : 'center', align : 'center', editable : true, columntype: 'numberinput',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue < 0){
						$.growl.error({
							message : "Please Enter Valid Post-Unset Pcs !!",
							duration : 10000,
							title : 'Error'
						});
						return "";
					}
				},
				cellbeginedit : function(row){
					if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{ text : 'Post-Unset Wt.', datafield : 'postUnsStoneWt', width : '7%', cellsalign : 'right', align : 'center', editable : true, sortable : false, cellsformat : 'd3', columntype: 'numberinput',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue < 0){
						$.growl.error({
							message : "Please Enter Valid Post Unset Wt !!",
							duration : 1000,
							title : 'Error'
						});
						return "";
					}
					var prePcs = jQuery('#otherStoneItemGrid').jqxGrid ('getcellvalue', row, 'preUnsStonePcs');
					var preWt = jQuery('#otherStoneItemGrid').jqxGrid ('getcellvalue', row, 'preUnsStoneWt');
					var prePcs = jQuery('#otherStoneItemGrid').jqxGrid ('getcellvalue', row, 'preUnsStonePcs');
					var uom = jQuery('#otherStoneItemGrid').jqxGrid ('getcellvalue', row, 'UQC');
					
					var brkWtRec = jQuery('#otherStoneItemGrid').jqxGrid ('getcellvalue', row, 'brkWtRec');
					var diffWt = parseFloat(preWt) - (parseFloat(newvalue) + parseFloat(brkWtRec));
					$("#otherStoneItemGrid").jqxGrid('setcellvalue', row, "diffStoneWt", diffWt);
					
					var stoneCost = jQuery('#otherStoneItemGrid').jqxGrid ('getcellvalue', row, 'stoneCost');
					 
					 var unsLossOrGainValue;
					 if(uom !="Pcs"){
						 unsLossOrGainValue = (diffWt * (stoneCost/preWt)).toFixed(2);
					 }else{
						 unsLossOrGainValue = (diffWt * (stoneCost/prePcs)).toFixed(2);
					 }
					 $("#otherStoneItemGrid").jqxGrid('setcellvalue', row, "unsLossOrGainValue", unsLossOrGainValue);
					 $("#otherStoneItemGrid").jqxGrid('setcellvalue', row, "diffStoneVal", unsLossOrGainValue);
			 },
			 cellbeginedit : function(row){
					if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{ text : 'Breakage Wt.', datafield : 'brkWtRec', width : '7%', cellsalign : 'right', align : 'center', editable : true, sortable : false, cellsformat : 'd3',columntype: 'numberinput',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue < 0){
						$.growl.error({
							message : "Please Enter Valid Breakage Wt !!",
							duration : 1000,
							title : 'Error'
						});
						return "";
					}
					var preWt = jQuery('#otherStoneItemGrid').jqxGrid ('getcellvalue', row, 'preUnsStoneWt');
					var stoneCost = jQuery('#otherStoneItemGrid').jqxGrid ('getcellvalue', row, 'stoneCost');
					var postUnsStoneWt = jQuery('#otherStoneItemGrid').jqxGrid ('getcellvalue', row, 'postUnsStoneWt');
					var uom = jQuery('#otherStoneItemGrid').jqxGrid ('getcellvalue', row, 'UQC');

					var diffWt = parseFloat(preWt) - (parseFloat(newvalue) + parseFloat(postUnsStoneWt));
					 $("#otherStoneItemGrid").jqxGrid('setcellvalue', row, "diffStoneWt", diffWt);
					 
					var brkCost = (newvalue * (stoneCost/preWt)).toFixed(2);
					 $("#otherStoneItemGrid").jqxGrid('setcellvalue', row, "brkCost", brkCost);
					 
					 var unsLossOrGainValue;
					 if(uom !="Pcs"){
						 unsLossOrGainValue = (diffWt * (stoneCost/preWt)).toFixed(2);
					 }else{
						 unsLossOrGainValue = (diffWt * (stoneCost/prePcs)).toFixed(2);
					 }
					 $("#otherStoneItemGrid").jqxGrid('setcellvalue', row, "unsLossOrGainValue", unsLossOrGainValue);
					 $("#otherStoneItemGrid").jqxGrid('setcellvalue', row, "diffStoneVal", unsLossOrGainValue);
				},
				cellbeginedit : function(row){
					if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{ text : 'Diff Wt.', datafield : 'diffStoneWt', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Diff Val', datafield : 'diffStoneVal', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'UQC', datafield : 'UQC', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : '', datafield : 'unsLossOrGainValue', hidden:true, cellsformat : 'd2'},
			{ text : '', datafield : 'brkCost', hidden:true, cellsformat : 'd2'},
			
			]
	});
}

//Precious Stones Grid
var preciousStoneItemGrid = function(data,type) {
	var source = {
			datafields : [ 
				{name : 'lotNo', type : 'int'}, 
				{name : 'refType', type : 'int'},
				{name : 'docType', type : 'string'},
				{name : 'location', type : 'string'},
				{name : 'refType', type : 'string'},
				{name : 'segment', type : 'string'},
				{name : 'category', type : 'string'}, 
				{name : 'subCategoryDesc', type : 'string'},
				{name : 'articleCode', type : 'string'},
				{name : 'clarity', type : 'string'},
				{name : 'color', type : 'string'},
				{name : 'cutGrade', type : 'string'},
				{name : 'actualColor', type : 'string'},
				{name : 'preUnsStonePcs', type : 'int','map':'stonePcs'},
				{name : 'preUnsStoneWt', type : 'float','map':'stoneWt'},
				{name: 'costRange', type: 'string'},
				{name : 'UQC', type : 'string'},
				{name : 'shapeId', type : 'float'},
				{name : 'shape', type : 'float'},
				{name : 'segmentId', type : 'int'},
				{name : 'categoryId', type : 'int'},	
				{name : 'suppliedBy',type:'string'},
				{name : 'toWtCost', type : 'string'},
				{name : 'frmWtCost', type : 'string'},
				{name : 'stoneMasterId', type : 'string',map:'stoneMaster>id'},
				{name : 'postUnsStoneWt', type : 'float'},
				{name : 'postUnsStonePcs', type : 'int'},
				{name : 'brkWtRec', type : 'float'},
				{name : 'diffStoneWt', type : 'float'},
				{name : 'suppBy', type : 'string','map':'suppliedBy'},
				{name : 'stoneCost', type : 'float'},
				{name : 'unsLossOrGainValue', type : 'float'},
				{name : 'brkCost', type : 'float'},
				{name : 'diffStoneVal', type : 'float'},

		],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
    };

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#preciousStoneItemGrid").jqxGrid({
	        source : dataAdapter,
			width : '100%',
			editable : true,
			height : 100,
			theme: 'energyblue',
			columnsheight : 45,
			autorowheight : true,
			autoheight : true,
			altRows : true,
			columnsresize : true,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
			    container.append('<i class="fa fa-list fa-md"></i>&nbsp; Precious Stones Details');			
		},
		columns : [ 
			{text: '', datafield : 'stoneMasterId', hidden:true},
			{ text : '', datafield : 'frmWtCost', hidden:true},
			{ text : '', datafield : 'toWtCost', hidden:true},
			{ text : 'Lot No', datafield : 'lotNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Type', datafield : 'docType', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Ref Type', datafield : 'refType', hidden:true,width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Location', datafield : 'location', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Seg', datafield : 'segment', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Main Cat.', datafield : 'category', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat', datafield : 'subCategoryDesc', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Article Code', datafield : 'articleCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stone Cost', datafield : 'stoneCost', cellsformat : 'd2', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Supplied By', datafield : 'suppBy', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Cost Range', datafield : 'costRange', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false,
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
					var frmWtCost = $('#preciousStoneItemGrid').jqxGrid('getcellvalue', row, 'frmWtCost');
					var toWtCost = $('#preciousStoneItemGrid').jqxGrid('getcellvalue', row, 'toWtCost');
					
					var costRange = frmWtCost + "-" + toWtCost ;
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + costRange  + '</div>';
				 }
			},
			
			{ text : 'Pre-Unset Pcs', datafield : 'preUnsStonePcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pre-Unset Wt.', datafield : 'preUnsStoneWt', width : '6%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
			{ text : 'Post-Unset Pcs', datafield : 'postUnsStonePcs', width : '5%', cellsalign : 'center', align : 'center', editable : true, columntype: 'numberinput',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue < 0){
						$.growl.error({
							message : "Please Enter Valid Post-Unset Pcs !!",
							duration : 10000,
							title : 'Error'
						});
						return "";
					}
				},
				cellbeginedit : function(row){
					if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{ text : 'Post-Unset Wt.', datafield : 'postUnsStoneWt', width : '7%', cellsalign : 'right', align : 'center', editable : true, sortable : false, cellsformat : 'd3', columntype: 'numberinput',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue < 0){
						$.growl.error({
							message : "Please Enter Valid Post-Unset Wt !!",
							duration : 10000,
							title : 'Error'
						});
						return "";
					}
					var breakageWt = jQuery('#preciousStoneItemGrid').jqxGrid ('getcellvalue', row, 'brkWtRec');
					var preWt = jQuery('#preciousStoneItemGrid').jqxGrid ('getcellvalue', row, 'preUnsStoneWt');
					var prePcs = jQuery('#preciousStoneItemGrid').jqxGrid ('getcellvalue', row, 'preUnsStonePcs');
					var uom = jQuery('#preciousStoneItemGrid').jqxGrid ('getcellvalue', row, 'UQC');
					var brkWtRec = jQuery('#preciousStoneItemGrid').jqxGrid ('getcellvalue', row, 'brkWtRec');
					var diffWt = parseFloat(preWt) - (parseFloat(newvalue) + parseFloat(brkWtRec));

					 $("#preciousStoneItemGrid").jqxGrid('setcellvalue', row, "diffStoneWt", diffWt);
					 
					var stoneCost = jQuery('#preciousStoneItemGrid').jqxGrid ('getcellvalue', row, 'stoneCost');
					var unsLossOrGainValue ;
					if(uom !="Pcs"){
						unsLossOrGainValue = (diffWt * (stoneCost/preWt)).toFixed(2);
					}else{
						unsLossOrGainValue = (diffWt * (stoneCost/prePcs)).toFixed(2);
					}
					$("#preciousStoneItemGrid").jqxGrid('setcellvalue', row, "unsLossOrGainValue", unsLossOrGainValue);
					$("#preciousStoneItemGrid").jqxGrid('setcellvalue', row, "diffStoneVal", unsLossOrGainValue);
					
				},
				cellbeginedit : function(row){
					if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{ text : 'Breakage Wt.', datafield : 'brkWtRec', width : '7%', cellsalign : 'right', align : 'center', editable : true, sortable : false, cellsformat : 'd3',columntype: 'numberinput',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue < 0){
						$.growl.error({
							message : "Please Enter Valid Breakage Wt !!",
							duration : 10000,
							title : 'Error'
						});
						return "";
					}
					var preWt = jQuery('#preciousStoneItemGrid').jqxGrid ('getcellvalue', row, 'preUnsStoneWt');
					var stoneCost = jQuery('#preciousStoneItemGrid').jqxGrid ('getcellvalue', row, 'stoneCost');
					var postUnsStoneWt = jQuery('#preciousStoneItemGrid').jqxGrid ('getcellvalue', row, 'postUnsStoneWt');
					var uom = jQuery('#preciousStoneItemGrid').jqxGrid ('getcellvalue', row, 'UQC');

					var diffWt = parseFloat(preWt) - (parseFloat(newvalue) + parseFloat(postUnsStoneWt));
					 $("#preciousStoneItemGrid").jqxGrid('setcellvalue', row, "diffStoneWt", diffWt);

					
					 var brkCost = (newvalue * (stoneCost/preWt)).toFixed(2);
					 $("#preciousStoneItemGrid").jqxGrid('setcellvalue', row, "brkCost", brkCost);
					 
					 var unsLossOrGainValue;
					 if(uom !="Pcs"){
						 unsLossOrGainValue = (diffWt * (stoneCost/preWt)).toFixed(2);
					 }else{
						 unsLossOrGainValue = (diffWt * (stoneCost/prePcs)).toFixed(2);
					 }
					 $("#preciousStoneItemGrid").jqxGrid('setcellvalue', row, "unsLossOrGainValue", unsLossOrGainValue);
					 $("#preciousStoneItemGrid").jqxGrid('setcellvalue', row, "diffStoneVal", unsLossOrGainValue);
				},
				cellbeginedit : function(row){
					if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{ text : 'Diff Wt.', datafield : 'diffStoneWt', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
			{ text : 'Diff Val', datafield : 'diffStoneVal', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
			{ text : 'UQC', datafield : 'UQC', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : '', datafield : 'unsLossOrGainValue', hidden:true, cellsformat : 'd2'},
			{ text : '', datafield : 'brkCost', hidden:true, cellsformat : 'd2'},
	   ]
	});
}

//Accessory Item Grid
var accGridDet = function(data,type) {
	    var source = {
			datafields : [ 
				{name : 'createdDate', type : 'string'}, 
				{name : 'lotNo', type : 'string'},
				{name: 'refType', type: 'float'},
				{name: 'docType', type: 'string'},
				{name : 'segment', type : 'float'},
				{name : 'category', type : 'string'}, 
				{name : 'subCategory', type : 'string'},
				{name: 'articleCode', type: 'float'},
				{name : 'preUnsAccPcs', type : 'float'},
				{name : 'preUnsAccWt', type : 'float'}, 
				{name : 'subCategoryId', type : 'string'},
				{name: 'costRange', type: 'float'},
				{name : 'accCost', type : 'float'},
				{name : 'UQC', type : 'float'},
				{name : 'accWt', type : 'string'}, 
				{name : 'suppliedBy',type:'string'},
				{name : 'postUnsAccWt', type : 'float'},
				{name : 'postUnsAccPcs', type : 'int'},
				{name : 'brkWtRec', type : 'float'},
				{name : 'diffAccWt', type : 'float'},
				{name : 'unsLossOrGainValue', type : 'float'},
				{name : 'brkCost', type : 'float'},
				{name : 'diffAccVal', type : 'float'},

			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
			},
		};
		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#accGridDet").jqxGrid({
			source : dataAdapter,
			width : '100%',
			editable : true,
			height : 200,
			columnsheight : 45,
			autorowheight : true,
			autoheight : true,
			theme: 'energyblue',
			altRows : true,
			columnsresize : true,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
				container.append('<i class="fa fa-list fa-md"></i>&nbsp; Accessory Details');				
			},
			columns : [ 
				{ text : 'Lot No', datafield : 'lotNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Ref Type', datafield : 'refType',hidden:true, width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Ref Type', datafield : 'docType', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				//{ text : 'Location', datafield : 'location', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Acc Seg', datafield : 'segment', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Main Cat.', datafield : 'category', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Sub Cat', datafield : 'subCategory', width : '11%', cellsalign : 'left', align : 'center', editable : false, sortable : false},
				{ text : 'Article Code', datafield : 'articleCode', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Acc Cost', datafield : 'accCost', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat:'d2'},
				{ text : 'Supplied By', datafield : 'suppliedBy', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Pre-Unset Pcs', datafield : 'preUnsAccPcs', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : 'Pre-Unset Wt.', datafield : 'preUnsAccWt', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3', columntype: 'numberinput'},
				{ text : 'Post-Unset Pcs', datafield : 'postUnsAccPcs', width : '7%', cellsalign : 'center', align : 'center', editable : true, columntype: 'numberinput',
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						if(newvalue < 0){
							$.growl.error({
								message : "Please Enter Valid Post-Unset Pcs !!",
								duration : 10000,
								title : 'Error'
							});
							return "";
						}
					},
					cellbeginedit : function(row){
						if(type == "Split"){
							return false;
						}else{
							return true;
						}
					}
				},
				{ text : 'Post-Unset Wt.', datafield : 'postUnsAccWt', width : '8%', cellsalign : 'right', align : 'center', editable : true, sortable : false, cellsformat : 'd3', columntype: 'numberinput',
					initeditor: function (row, cellvalue, editor, celltext, pressedChar) {
				        editor.jqxNumberInput({ decimalDigits: 3 });
				    },
				    cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						if(newvalue < 0){
							$.growl.error({
								message : "Please Enter Valid Post-Unset Wt !!",
								duration : 10000,
								title : 'Error'
							});
							return "";
						}
						var breakageWt = jQuery('#accGridDet').jqxGrid ('getcellvalue', row, 'brkWtRec');
						var preWt = jQuery('#accGridDet').jqxGrid ('getcellvalue', row, 'preUnsAccWt');
						var prePcs = jQuery('#accGridDet').jqxGrid ('getcellvalue', row, 'preUnsAccPcs');
						var accCost = jQuery('#accGridDet').jqxGrid ('getcellvalue', row, 'accCost');
						var diffWt = parseFloat(preWt) - (parseFloat(newvalue) + parseFloat(breakageWt));
						 $("#accGridDet").jqxGrid('setcellvalue', row, "diffAccWt", diffWt);
						 
						 var unsLossOrGainValue = (diffWt * (accCost/prePcs)).toFixed(2);
						 $("#accGridDet").jqxGrid('setcellvalue', row, "unsLossOrGainValue", unsLossOrGainValue);
						 $("#accGridDet").jqxGrid('setcellvalue', row, "diffAccVal", unsLossOrGainValue);
					},
					cellbeginedit : function(row){
						if(type == "Split"){
							return false;
						}else{
							return true;
						}
					}
				},
				{ text : 'Breakage Wt.', datafield : 'brkWtRec', width : '8%', cellsalign : 'right', align : 'center', editable : true, sortable : false, cellsformat : 'd3', columntype: 'numberinput',
					initeditor: function (row, cellvalue, editor, celltext, pressedChar) {
				        editor.jqxNumberInput({ decimalDigits: 3 });
				    },
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						if(newvalue < 0){
							$.growl.error({
								message : "Please Enter Valid Breakage Wt !!",
								duration : 10000,
								title : 'Error'
							});
							return "";
						}
						var postUnsAccWt = jQuery('#accGridDet').jqxGrid ('getcellvalue', row, 'postUnsAccWt');
						var preWt = jQuery('#accGridDet').jqxGrid ('getcellvalue', row, 'preUnsAccWt');
						var diffWt = parseFloat(preWt) - (parseFloat(newvalue) + parseFloat(postUnsAccWt));
						var prePcs = jQuery('#accGridDet').jqxGrid ('getcellvalue', row, 'preUnsAccPcs');
						 $("#accGridDet").jqxGrid('setcellvalue', row, "diffAccWt", diffWt);
						 
						 var accCost = jQuery('#accGridDet').jqxGrid ('getcellvalue', row, 'accCost');
							 
						 var unsLossOrGainValue = (diffWt * (accCost/prePcs)).toFixed(2);
							$("#accGridDet").jqxGrid('setcellvalue', row, "unsLossOrGainValue", unsLossOrGainValue);
							$("#accGridDet").jqxGrid('setcellvalue', row, "diffAccVal", unsLossOrGainValue);
							 
							 
						var brkCost = (newvalue * (accCost/preWt)).toFixed(2);
							$("#accGridDet").jqxGrid('setcellvalue', row, "brkCost", brkCost);
					},
					cellbeginedit : function(row){
						if(type == "Split"){
							return false;
						}else{
							return true;
						}
					}
				},
				{ text : 'Diff Wt.', datafield : 'diffAccWt', width : '7%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd3'},
				{ text : 'Diff Val', datafield : 'diffAccVal', width : '5%', cellsalign : 'right', align : 'center', editable : false, sortable : false, cellsformat : 'd2'},
				{ text : 'UQC', datafield : 'UQC', width : '4%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
				{ text : '', datafield : 'unsLossOrGainValue', hidden:true, cellsformat : 'd2'},
				{ text : '', datafield : 'brkCost', hidden:true, cellsformat : 'd2'},
			] 
	});
}


$('.numeric').on('input', function (event) { 
    this.value = this.value.replace(/[^0-9]/g, '');
});

//Raise Transfer Voucher field Filters
var unsetGrFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var vendorCode = $('#vendorCode-value').val();
	var grNo = $('#grNoS-value').val();
	var lotNo = $('#lotNoS-value').val();
	var grDoneByS = $("#grDoneByS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendorId"] = vendorCode;
	}
	if (grNo != "" && grNo != null) {
		fieldFilters.fieldFilters["grNo"] = grNo;
	}
	if (lotNo != "" && lotNo != null) {
		fieldFilters.fieldFilters["lotNo"] = lotNo;
	}
	if (grDoneByS != "" && grDoneByS != null) {
		fieldFilters.fieldFilters["cBy"] = grDoneByS;
	}
	return fieldFilters;
}

//Search grid started
function itemDetSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [ {
		'name' : 'createdDate',
		'type' : 'date'
	}, {
		'name' : 'itemVendor',
		'type' : 'string'
	}, {
		'name' : 'unsVendor',
		'type' : 'String',
		 map : 'vendor>vendorName'
	}, {
		'name' : 'lotNo',
		'type' : 'long'
	}, {
		'name' : 'refType',
		'type' : 'string'
	}, {
		'name' : 'location',
		'type' : 'string'
	}, {
		'name' : 'segment',
		'type' : 'string',
		'map' : 'segment>description'
	}, {
		'name' : 'purity',
		'type' : 'float'
	}, {
		'name' : 'preUnsetPcs',
		'type' : 'long',		
	}, {
		'name' : 'preUnsetGwt',
		'type' : 'float',	
	}, {
		'name' : 'preUnsetNwt',
		'type' : 'float'
	}, {
		'name' : 'preUnsetPwt',
		'type' : 'float'
	}, {
		'name' : 'postUnsetGwt',
		'type' : 'float'
	}, {
		'name' : 'postUnsetNwt',
		'type' : 'float'
	}, {
		'name' : 'postUnsetPwt',
		'type' : 'float'
	}, {
		'name' : 'splWt',
		'type' : 'float',		
	},{
		'name' : 'lossCostWasWt',
		'type' : 'float',		
	},{
		'name' : 'lossCostWasValue',
		'type' : 'long',		
	},{
		'name' : 'lossCostLabour',
		'type' : 'long',		
	} ,{
		'name' : 'unsLossOrGainNwt',
		'type' : 'float',		
	},{
		'name' : 'unsLossOrGainValue',
		'type' : 'long',		
	},
	{'name' : 'printId','type' : 'int','map':"lotNo"}];

	var columns = [ {
		'text' : 'Date',
		'datafield' : 'createdDate',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		cellsformat : 'dd/MM/yyyy',
		sortable : false,
		editable : false
	}, /*{
		'text' : 'Item Vendor',
		'datafield' : 'itemVendor',
		'width' : '6%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	},*/ {
		'text' : 'Unset Vendor',
		'datafield' : 'unsVendor',
		'width' : '8%',
		cellsalign : 'center',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Lot No',
		'datafield' : 'lotNo',
		'width' : '4%',
		cellsalign : 'center',
		align : 'center',
		sortable : true,
		editable : false
	}, {
		'text' : 'Ref Type',
		'datafield' : 'refType',
		'width' : '6%',
		sortable : false,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Loc',
		'datafield' : 'location',
		'width' : '5%',
		sortable : true,
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		'text' : 'Seg',
		'datafield' : 'segment',
		'width' : '5%',
		sortable : false,
		cellsformat :'d2',
		editable : false,
		cellsalign : 'center',
		align : 'center'
	}, {
		text : 'Purity',
		datafield : 'purity',
		editable : false,
		cellsformat :'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		'width' : '5%'
	}, {
		text : 'Pre-Unset Pcs',
		datafield : 'preUnsetPcs',
		editable : false,
		cellsalign : 'center',
		align : 'center',
		cellsformat :'d3',
		sortable : false,
		'width' : '5%'
	}, {
		text : 'Pre-Unset Gross Wt',
		datafield : 'preUnsetGwt',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : false,
		'width' : '6%'
	}, {
		text : 'Pre-Unset Net Wt',
		datafield : 'preUnsetNwt',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : false,
		'width' : '5%'
	}, {
		'text' : 'Pre-Unset Pure Wt',
		'datafield' : 'preUnsetPwt',
		'width' : '5%',
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : true,
		editable : false
	}, {
		'text' : 'Post-Unset Gross Wt',
		'datafield' : 'postUnsetGwt',
		'width' : '6%',
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : true,
		editable : false,
	}, {
		text : 'Post-Unset Net Wt',
		datafield : 'postUnsetNwt',
		editable : false,
		cellsformat :'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		'width' : '8%'
	}, {
		text : 'Post-Unset Pure Wt',
		datafield : 'postUnsetPwt',
		editable : false,
		cellsformat :'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Spillage Wt',
		datafield : 'splWt',
		editable : false,
		cellsformat :'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Loss of Cost Wastage Weight',
		datafield : 'lossCostWasWt',
		editable : false,
		cellsformat :'d3',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Loss of Cost Wastage Value',
		datafield : 'lossCostWasValue',
		editable : false,
		cellsformat :'d2',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		'width' : '4%'
	}, {
		text : 'Loss of Cost Labour',
		datafield : 'lossCostLabour',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d2',
		sortable : false,
		'width' : '4%'
	},, {
		text : 'Unsetting Loss/Gain Net Wt',
		datafield : 'unsLossOrGainNwt',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d3',
		sortable : false,
		'width' : '4%'
	},, {
		text : 'Unsetting Loss/Gain Value',
		datafield : 'unsLossOrGainValue',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat :'d2',
		sortable : false,
		'width' : '4%'
	} ,
	{ text : '',datafield : 'printId',cellsrenderer : printUnsetMiv,editable : false,cellsalign : 'center',align : 'center','width' : '3%'}
	];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchUnsettingGRList", "list",columns, unsetGrFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		autorowheight :true,
        autoheight :true,
        columnsheight: 80,
		rowdetails : true,
		virtualmode : true,
		pageable: true
	});
}
var printUnsetMiv = function(row, column, value) {
	return  '<a class="btn btn-sm btn-primary" id='
	+ row
	+ ' onclick="printUnsetMivDet('
	+ value
	+ ')" href="javascript:void(0);"/><i class="fa fa-print fa-sm"></i></a>'
}
var printUnsetMivDet = function(unsHeaderId){

	fieldFilters = {
	        "fieldFilters" : {
	            "UnsHeaderId" :unsHeaderId,
	            "mode" : "pdf",
	            "reportName" : "RPT_GRV_UNS"
	        }
	    };
	jasperReport('RPT_Goods_Receipt_Unsetting.pdf', fieldFilters);


}

$('#search').on('click', function(){
	var vcode = $("#vendorCode").val();
	var lotNoS = $("#lotNoS").val();
	
	if(vcode == "" || vcode == null){
		$.growl.error({
			message : "Please Fill Mandatory Fields..",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	
	itemDetSearchGrid();
	$("#jqxgrid").show();
});


$("#addDetails").on('click',function(){
	var gridData = vendorDet();
	addDetFunction('GR',gridData);
});

var addDetFunction = function(type,filterData){
	
	if(type == "GR"){
		var lotNo = $("#lotNoC").val();
		if(lotNo == "" || lotNo == null){
			$.growl.error({
				message : "Please select Lot No ! !",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}else{
		var lotNo = $("#lotNoGrC").val();
		if(lotNo == "" || lotNo == null){
			$.growl.error({
				message : "Please select Lot No ! !",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}
	
var itemDetArray = [];
var arr = [];
var arr1 = [];
var arr2 = [];
var arr3 = [];


postJSON('/OrderExecution/api/v1/createUnsettingGRDetails', JSON.stringify(filterData), function(data) {
	console.log(type);
	var response = data.payload.GRDetails;
    itemDetArray.push(response);
	itemDetGrid(itemDetArray,type);
	$("#jqxgridS").show();
	$("#stoneDiamondItemGrid").show();
	$("#preciousStoneItemGrid").show();
	$("#otherStoneItemGrid").show();
	$("#accGridDet").show();
	
	$.each(response.diamondStones,function(k,v){
		arr.push(v)
		stoneDiamondItemGrid(arr,type);
	})
	$.each(response.preciousStones,function(k,v){
		arr1.push(v)
		preciousStoneItemGrid(arr1,type);
	})
	$.each(response.otherStones,function(k,v){
		arr2.push(v)
		otherStoneItemGrid(arr2,type);
	})
	$.each(response.accessories,function(k,v){
		arr3.push(v)
		accGridDet(arr3,type);
	})
	
});
}

//Item Details Grid
var itemDetGrid = function(itemDetArray,type) {
	var source = {
		datafields : [
			{name : 'date', type : 'date','map' : 'createdDate'},
			{name : 'itemVcode', type : 'string','map':'itemVendor'}, 
			{name : 'unsetVcode',	type : 'string','map' : 'vendor>vendorName'}, 
			{name : 'lotNo', type : 'int','map':'lotNo'}, 
			{name : 'refType',	type : 'string','map':'refType'},
			{name : 'docType',	type : 'string'},
			{name : 'location', type : 'string','map':'location'}, 
			{name : 'segment',	type : 'string','map':'segment>description'}, 
			{name : 'segmentId',	type : 'string','map':'segment>segmentId'}, 
			{name : 'purity',	type : 'float','map':'purity'}, 
			{name : 'preUnsetPcs',type : 'int','map':'preUnsetPcs'}, 
			{name : 'preUnsetGwt',type : 'float','map':'preUnsetGwt'}, 
			{name : 'preUnsetNwt',type : 'float','map':'preUnsetNwt'}, 
			{name : 'preUnsetPwt',type : 'float','map':'preUnsetPwt'}, 
			{name : 'postUnsetPcs',type : 'int'},
			{name : 'postUnsetGwt',type : 'float'},
			{name : 'postUnsetNwt',type : 'float'},
			{name : 'postUnsetPwt',type : 'float'},
			{name : 'spillageWt',type : 'float','map':'splWt'},
			{name : 'costWastageWt',type : 'float','map':'lossCostWasWt'},
			{name : 'costWastageVal',type : 'float','map':'lossCostWasValue'},
			{name : 'costLabour',type : 'float','map':'lossCostLabour'},
			{name : 'unsetLossGainNwt',type : 'float','map':'unsLossOrGainNwt'},
			{name : 'unsetLossGainVal',type : 'float','map':'unsLossOrGainValue'},
			{name : 'stdRate',type : 'float','map':'standardRate'},
			{name : 'unsettingCharges',type : 'float'},
			{name : 'isSplitStock',	type : 'string'},
			],
		localdata : itemDetArray,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridS").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		height : 200,
		theme: 'energyblue',
		columnsheight : 100,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Item Details');			
		},
		columns : [ 
			{text : 'Date',datafield : 'date',	width : '5%',cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy',editable : false},
			{text : 'Unset Vendor Code',datafield : 'unsetVcode',width : '5%',cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Lot No',datafield : 'lotNo',width : '3%',	cellsalign : 'center',align : 'center',	editable : false},
			{text : 'Ref Type',datafield : 'refType',hidden:true,width : '4%',cellsalign : 'center',align : 'center',editable : false} ,
			{text : 'Ref Type',datafield : 'docType',width : '4%',cellsalign : 'center',align : 'center',editable : false} ,
			{text : 'Loc',datafield : 'location',	width : '3%',cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Seg',	datafield : 'segment',width : '4%',cellsalign : 'center',align : 'center',	editable : false}, 
			{text : '',	datafield : 'segmentId', hidden: true, width : '4%',cellsalign : 'center',align : 'center',	editable : false}, 
			{text : 'Purity',datafield : 'purity',	width : '4%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2'}, 
			{text : 'Pre-Unset Pcs',datafield : 'preUnsetPcs',width : '4%',cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Pre-Unset Gross Wt',datafield : 'preUnsetGwt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',},
			{text : 'Pre-Unset Net Wt',datafield : 'preUnsetNwt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',},	
			{text : 'Pre-Unset Pure Wt',datafield : 'preUnsetPwt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3'},
			{text : 'Post-Unset Pcs',datafield : 'postUnsetPcs',width : '4%',cellsalign : 'center',align : 'center',editable : true,
				cellbeginedit : function(row){
					if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{text : 'Post-Unset Gross Wt',datafield : 'postUnsetGwt',width : '5%',cellsalign : 'right',align : 'center',editable : true,cellsformat : 'd3',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) { 
					var preUnsetGwt =  $('#jqxgridS').jqxGrid('getcellvalue', row, 'preUnsetGwt');
					if(newvalue > preUnsetGwt){
	   		    			$.growl.error({
	   		    				message : 'Post-Unset Gross Wt Should not be Greater than Pre-Unset Gross Wt !!!',
	   		    				duration : 10000,
	   		    				title : 'Error'
	   		    			});
	   		    			return false;
					}
				},
				cellbeginedit : function(row){
					if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{text : 'Post-Unset Net Wt',datafield : 'postUnsetNwt',width : '5%',cellsalign : 'right',align : 'center',editable : true,cellsformat : 'd3',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {  
					$("#jqxgridS").jqxGrid('setcellvalue', row, "spillageWt",null);
   		    		var sPurity =  $('#jqxgridS').jqxGrid('getcellvalue', row, 'purity');
   		    		var lotNo =  $('#jqxgridS').jqxGrid('getcellvalue', row, 'lotNo');
   		    		var preUnsetNwt =  $('#jqxgridS').jqxGrid('getcellvalue', row, 'preUnsetNwt');
   		    		
   		    		var pureWt = (newvalue * sPurity/99.9).toFixed(3) ;
   		    		
   		    		$("#jqxgridS").jqxGrid('setcellvalue', row, "postUnsetPwt",pureWt);
   		    		if(newvalue > preUnsetNwt){
   		    			$.growl.error({
   		    				message : 'Post-Unset Net Wt Should not be Greater than Pre-Unset Net Wt !!!',
   		    				duration : 10000,
   		    				title : 'Error'
   		    			});
   		    			return false;
   		    		}
   		    		
   		    		/*var fieldFilters = {"fieldFilters":{"type":"calGainValue","preNetWeight":preUnsetNwt,"postNetWeight":newvalue,"lotNo":lotNo}}      		   
        		   postJSON('/OrderExecution/api/v1/createUnsettingGRDetails', JSON.stringify(fieldFilters), function(data) {
        			   var result = data.payload.GainValue;
        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "unsetLossGainVal",result);
        		   });*/
        	   },
        	   cellbeginedit : function(row){
        		   if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{text : 'Post-Unset Pure Wt',datafield : 'postUnsetPwt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3'},
			{text : '',datafield : 'stdRate',width : '5%',cellsalign : 'center',align : 'center',editable : false,hidden:true,cellsformat : 'd2'}, 
			{text : 'Spillage Wt',datafield : 'spillageWt',width : '4%',cellsalign : 'right',align : 'center',editable : true,cellsformat : 'd3', createeditor: function (row, cellvalue, editor) { editor.jqxNumberInput({ decimalDigits: 3 }); },columntype : 'numberinput',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {  
   		    		var preUnsetNwt =  $('#jqxgridS').jqxGrid('getcellvalue', row, 'preUnsetNwt');
   		    		var postUnsetNwt =  $('#jqxgridS').jqxGrid('getcellvalue', row, 'postUnsetNwt');
   		    		var lgNetWt = (preUnsetNwt - (parseFloat(postUnsetNwt) + parseFloat(newvalue))).toFixed(3) ;
   		    		var purity = $('#jqxgridS').jqxGrid('getcellvalue', row, 'purity');
   		    		 
   		    		var unsetLgWt = (lgNetWt * purity )/99.9;
   		    		
   		    		var stdRate = $('#jqxgridS').jqxGrid('getcellvalue', row, 'stdRate');
   		    		var lgVal = parseFloat(unsetLgWt) * parseFloat(stdRate);
   		    		var lgUnsetVal = lgVal.toFixed(2);
   		    		
   		    		console.log(lgNetWt);
   		    		if(lgNetWt < 0){
   		    			$.growl.error({
   		    				message : "Please Enter Valid Spillage Wt !!!",
   		    				duration :  10000,
   		    				title : 'Error'
   		    			});
   		    			return "";
   		    		}else{
   		    			$("#jqxgridS").jqxGrid('setcellvalue', row, "unsetLossGainNwt",unsetLgWt);
   		    			$("#jqxgridS").jqxGrid('setcellvalue', row, "unsetLossGainVal",lgUnsetVal);
   		    		}
        	   },/*,
        	   validation :function(cell, value){
        		   if(value < 0) { return { result: false, message: "Invalid Number" }};
        		   return true;
        	   }*/
			cellbeginedit : function(row){
				if(type == "Split"){
					return false;
				}else{
					return true;
				}
			}
			},
			{text : 'Loss Of Cost Wastage Wt',datafield : 'costWastageWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3'},
			{text : 'Loss Of Cost Wastage Value',datafield : 'costWastageVal',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2'},
			{text : 'Loss Of Cost Labour',datafield : 'costLabour',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2'},
			{text : 'Unsetting Loss/Gain Net Wt',datafield : 'unsetLossGainNwt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3'},			
			{text : 'Unsetting Loss/Gain Val',datafield : 'unsetLossGainVal',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2'},
			{text : 'Unsetting Charges',datafield : 'unsettingCharges',width : '5%',cellsalign : 'right',align : 'center',editable : true,cellsformat : 'd2',
				cellbeginedit : function(row){
					if(type == "Split"){
						return false;
					}else{
						return true;
					}
				}
			},
			{text : '',datafield : 'isSplitStock',width : '5%',cellsalign : 'center',align : 'center',editable : false,hidden:true}, 

			]
	 });
 }

$("#saveUnsetGr").on('click', function(){
	saveFunction('GR');
});

var saveFunction = function(type){
	console.log(type);
	$("#saveSplitUnsetGr").prop('disabled',true);
	var rows = $("#jqxgridS").jqxGrid('getrows');
	var diStoneRowGridData = $("#stoneDiamondItemGrid").jqxGrid('getrows');
	var otStoneRowGridData = $("#otherStoneItemGrid").jqxGrid('getrows');
	var preStoneRowGridData = $("#preciousStoneItemGrid").jqxGrid('getrows');
	var AccGrid = $("#accGridDet").jqxGrid('getrows');
	
	var saveStones = [];
	var accessories = [];
	
	if(typeof otStoneRowGridData != "undefined"){
		$.each(otStoneRowGridData, function(k, v){
				saveStones.push(v);
		});
	}
	
	if(typeof preStoneRowGridData != "undefined"){
		$.each(preStoneRowGridData, function(k, v){
				saveStones.push(v);
		});
	}
	if(typeof diStoneRowGridData != "undefined"){
		$.each(diStoneRowGridData, function(k, v){
				saveStones.push(v);
		});
	}
	
	if(typeof AccGrid != "undefined"){
		$.each(AccGrid, function(k, v){
			accessories.push(v);
		});
	}
	
	if(typeof rows != "undefined"){
		if((rows[0].postUnsetGwt == "" || rows[0].postUnsetGwt == null || rows[0].postUnsetNwt == "" || rows[0].postUnsetNwt == null
		|| rows[0].spillageWt == null || rows[0].spillageWt == "" || rows[0].unsettingCharges == null || rows[0].unsettingCharges == "") && type == "GR"){
			$.growl.error({
				message : "Please Enter mandatory field!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
		
		if(parseFloat(rows[0].postUnsetGwt) < 0 || parseFloat(rows[0].postUnsetNwt) < 0	|| parseFloat(rows[0].spillageWt) < 0 || parseFloat(rows[0].unsettingCharges) < 0 && type == "GR"){
					$.growl.error({
						message : "Value can not be negetive!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				
		
		var saveUGRObj = {
				  "lotNo": (type == "GR")? $("#lotNoC").val() : $("#lotNoGrC").val(),
				  "segment": {
				    "segmentId": rows[0].segmentId
				  },
				  "refType": rows[0].refType,
				  "preUnsetGwt": rows[0].preUnsetGwt,
				  "preUnsetNwt": rows[0].preUnsetNwt,
				  "preUnsetPwt": rows[0].preUnsetPwt,
				  "preUnsetPcs": rows[0].preUnsetPcs,
				  "lossCostLabour": $("#lossCostLabour").val(),
				  "postUnsetGwt": rows[0].postUnsetGwt,
				  "postUnsetNwt": rows[0].postUnsetNwt,
				  "postUnsetPwt": rows[0].postUnsetPwt,
				  "splWt": rows[0].spillageWt,
				  "lossCostWasWt": rows[0].costWastageWt,
			      "lossCostWasValue": rows[0].costWastageVal,
			      "unsLossOrGainNwt": rows[0].unsetLossGainNwt,
			      "unsLossOrGainValue": rows[0].unsetLossGainVal,
				  "unsCharges" : rows[0].unsettingCharges,
				  "vendor": {
				    "id": $("#vendorCodeCId").val()
				  },
				  "isSplitStock" :(type == "Split") ? true : false,
				  "saveStones" : saveStones,
				  "accessories" :accessories
				};
	    }
	console.log(saveUGRObj.saveStones);
	
	var flag =  true;
	$.each(saveUGRObj.saveStones,function(k,v){
		if(typeof v.postUnsStoneWt === 'object' && type == "GR"){
			flag = false;
			$.growl.error({
				message : "Please Enter Post Unset Wt for " + v.segment + " !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}else{flag = true;}
		
		if(typeof v.postUnsStonePcs === 'object' && type == "GR"){
			flag = false;
			$.growl.error({
				message : "Please Enter Post Unset Pcs " + v.segment + " !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}else{flag = true;}
		
		if(typeof v.brkWtRec === 'object' && type == "GR"){
			flag = false;
			$.growl.error({
				message : "Please Enter Breakage Wt " + v.segment + " !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}else{flag = true;}
	});
	
	$.each(saveUGRObj.accessories,function(k,v){
		if(typeof v.postUnsAccWt === 'object' && type == "GR"){
			flag = false;
			$.growl.error({
				message : "Please Enter Post Unset Wt for Accessory !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}else{flag = true;}
		
		if(typeof v.postUnsAccPcs === 'object' && type == "GR"){
			flag = false;
			$.growl.error({
				message : "Please Enter Post Unset Pcs for Accessory !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}else{flag = true;}
		
		if(typeof v.brkWtRec === 'object' && type == "GR"){
			flag = false;
			$.growl.error({
				message : "Please Enter Breakage Wt for Accessory !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}else{flag = true;}
	});
	console.log(JSON.stringify(saveUGRObj));
	
	if(flag == true){
		postJSON('/OrderExecution/api/v1/saveUnsettingGR', JSON.stringify(saveUGRObj), function(data) {
			
			if(data.resCode == 1){
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				if(type == "GR"){
					window.location.href="javascript:showContentPage('unsettingGrCreate', 'bodySwitcher')";
				}else{
					window.location.href="javascript:showContentPage('captureUnsettingForSplit', 'bodySwitcher')"
				}
				
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
	}
}


$("#clear").on('click', function() {
	$("#jqxgridS").jqxGrid('clear');
	$("#jqxgridS").hide();
	$("#stoneDiamondItemGrid").jqxGrid('clear');
	$("#stoneDiamondItemGrid").hide();
	$("#otherStoneItemGrid").jqxGrid('clear');
	$("#otherStoneItemGrid").hide();
	$("#preciousStoneItemGrid").jqxGrid('clear');
	$("#preciousStoneItemGrid").hide();
	$("#accGridDet").jqxGrid('clear');
	$("#accGridDet").hide();
	
	$("#vendorCodeC").val("");
	onloadLov();
});

$("#clearAll").on('click', function() {
	window.location.href="javascript:showContentPage('unsettingGrCreate', 'bodySwitcher')";
});


$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});	
});