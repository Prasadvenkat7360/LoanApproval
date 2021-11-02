// date picker functions
$("#dateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	maxDate : 0,
	dateFormat: "dd/mm/yy",
});

$("#gridTabs").hide();
function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};


$(".tabDisabledS").addClass("tabDisabled2");
$("#gridTabs").tabs({
	disabled:[]
});

var onLoadLov = function(){
/*var params = {"fieldFilters": {"type": "dcZones"}}
	postJSON('/OrderExecution/api/v1/onloadPromotionsCreate',JSON.stringify(params),function(response) {
		$("#zoneS").empty().append('<option value="" selected>--Select--</option>');
		$.each(response.payload.DCZones, function(key, val) {
		$("#zoneS").append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});*/

	$.getJSON('/OrderExecution/api/v1/stockCheckDCReportLOV', function(data) {
	$('#dcS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.AllDcs, function(key, val) {
			$('#dcS').append('<option value="' + val.id + '">' + val.dcname + '</option>');
		});
		
	$('#typeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.DocTypes, function(key, val) {
			$('#typeS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	});
}
onLoadLov();
	
var dailyStockCheckFieldFilters = function() {
	var dateS = $("#dateS").val();
	var dcS = $("#dcS").val();
	var typeS = $("#typeS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (dateS != "" && dateS != null) {
		fieldFilters.fieldFilters["fromDate"] = dateS;
	}
	if (dateS != "" && dateS != null) {
		fieldFilters.fieldFilters["toDate"] = dateS;
	}
	if (dcS != "" && dcS != null) {
		fieldFilters.fieldFilters["dcId"] = dcS;
	}
	if (typeS != "" && typeS != null) {
		fieldFilters.fieldFilters["stockCheckTypeDC"] = typeS;
	}
	return fieldFilters;
}

//###############  Search Grid ################## 
function dailyStockSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ 
		{'name' : 'fromdate','type' : 'date','map'  : 'createdDate'},
		{'name' : 'storeName','type' : 'string','map'  : 'dcName'},
		{'name' : 'zone','type' : 'string','map'  : ''},
		{'name' : 'segment','type' : 'string','map'  : 'metalOrArticleOrStnOrAccSegmentName'}, 
		{'name' : 'seName','type' : 'string','map'  : 'createdBy'},
		{'name' : 'jType','type' : 'string','map'  : 'jewelTypeDescription'}, 
		{'name' : 'physicalCount','type' : 'long','map'  : 'inputFGOrStoneOrAccPcs'},
		{'name' : 'systemCount','type' : 'long','map'  : 'systemFGOrStoneOrAccPcs'},
		{'name' : 'physicalWt','type' : 'float','map'  : 'inputFGOrStoneOrAccWt'},
		{'name' : 'systemWt','type' : 'float','map'  : 'systemFGOrStoneOrAccWt'},
		{'name' : 'difference','type' : 'long','map'  : ''},
		{'name' : 'remarks','type' : 'string','map'  : 'notTallyReason'}

		];
	var columns = [
		{'text' : 'Date','datafield' : 'fromdate','width' : '10%',cellsalign : 'center',align : 'center',sortable : true,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Store Name','datafield' : 'storeName','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Zone','datafield' : 'zone','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Segment','datafield' : 'segment','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sales Person Name','datafield' : 'seName',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '10%'},
		{'text' : 'Jewel Type','datafield' : 'jType',editable : false,cellsalign : 'center',align : 'center',sortable : true,'width' : '12%'},
		{'text' : 'Physical Pcs Entered','datafield' : 'physicalCount',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '10%'},
		{'text' : 'System Number of Pcs','datafield' : 'systemCount',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '10%'},
		{'text' : 'Difference','datafield' : 'difference',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '10%'},
		];
	showMyGrid(datafields,"", "list",columns, dailyStockCheckFieldFilters(), updateRows, "");
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
	var type = $("#typeS").val();
//	$("#searchHeading").text(typeS);
	
	if($("#dateS").val() == "" || $("#dcS").val() == "" || $("#typeS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 1000,
			title  : 'Error'
		});
		return false;
	}
	
	postJSON('/OrderExecution/api/v1/searchStockCheckDCReport ',JSON.stringify(dailyStockCheckFieldFilters()),function(response) {
		if(response.resCode == 1){
			var fgList = [];
			var stoneList = [];
			var accList = [];
			$("#searchHeading").html( "<b><i class='fa fa-list fa-sm'>&nbsp;</i>"+ type +"</b>" );
		 var result = response.payload.list;
		 	$.each(result,function(k,v){
		 		if(v.materialType == "Finished Goods"){
		 			fgList.push(v);
		 		}
		 		if(v.materialType == "Stones"){
		 			stoneList.push(v);
		 		}if(v.materialType == "Accessory"){
		 			accList.push(v);
		 		}
		 	});
		 	console.log(fgList);
		 	console.log(stoneList);
		 	console.log(accList);
		 	
		 	activaTab('tab1default');
			$("#gridTabs").show();
			fgGrid(fgList);
			$("#jqxgridFg").show();
			
			stoneGrid(stoneList);
			$("#jqxgridStone").show();
			
			accGrid(accList);
			$("#jqxgridAcc").show();
			
		}else {
			$.growl.error({
				message : response.mesgStr,
				duration : 10000,
				title  :'Error'
			});
			return false;
		}
	});
	
});

/*$("#fgDetails").on('click',function(){
	fgGrid();
	$("#jqxgridFg").show();
});

$("#stoneDetails").on('click',function(){
	
});

$("#accDetails").on('click',function(){
	
});*/

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('dailyStockCheckReportDC', 'bodySwitcher')"
});


var fgGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'fromdate','type' : 'date','map'  : 'createdDate'},
			{'name' : 'storeName','type' : 'string','map'  : 'dcName'},
			{'name' : 'segment','type' : 'string','map'  : 'metalOrArticleOrStnOrAccSegmentName'}, 
			{'name' : 'seName','type' : 'string','map'  : 'createdBy'},
			{'name' : 'jType','type' : 'string','map'  : 'jewelTypeDescription'}, 
			{'name' : 'physicalCount','type' : 'long','map'  : 'inputFGOrStoneOrAccPcs'},
			{'name' : 'systemCount','type' : 'long','map'  : 'systemFGOrStoneOrAccPcs'},
			{'name' : 'physicalWt','type' : 'float','map'  : 'inputFGOrStoneOrAccWt'},
			{'name' : 'systemWt','type' : 'float','map'  : 'systemFGOrStoneOrAccWt'},
			{'name' : 'difference','type' : 'long','map'  : ''},
			{'name' : 'differenceWt','type' : 'float','map'  : ''},

			{'name' : 'remarks','type' : 'string','map'  : 'notTallyReason'},
			{'name' : 'stockCheckDCType','type' : 'string','map':'refDocType'},
			{'name' : 'zoneDesc','type' : 'string'},
			{'name' : 'stoneOrAccCatDesc','type' : 'string'},
			{'name' : 'stoneOrAccSubCatId','type' : 'string'},
			{'name' : 'locationCode','type' : 'string'}
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridFg").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
 	    statusbarheight: 30,
		columns : [
			{'text' : 'Date','datafield' : 'fromdate','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,cellsformat : 'dd/MM/yyyy'},
			{'text' : 'DC Name','datafield' : 'storeName','width' : '11%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Stock Check Type','datafield' : 'stockCheckDCType','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Zone','datafield' : 'zoneDesc','width' : '8%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Loc','datafield' : 'locationCode','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},

			{'text' : 'Segment','datafield' : 'segment','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},

			{'text' : 'Sales Person Name','datafield' : 'seName',editable : false,cellsalign : 'left',align : 'center',sortable : false,'width' : '10%'},
			{'text' : 'Jewel Type','datafield' : 'jType',editable : false,cellsalign : 'left',align : 'center',sortable : true,'width' : '12%'},
			{'text' : 'Physical Pcs Entered','datafield' : 'physicalCount',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '8%'},
			{'text' : 'System Number of Pcs','datafield' : 'systemCount',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '7%'},
			{'text' : 'Physical Wt Entered','datafield' : 'physicalWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '7%',cellsformat:'d3'},
			{'text' : 'System Wt','datafield' : 'systemWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '7%',cellsformat:'d3'},
			{'text' : 'Difference Pcs','datafield' : 'difference',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '5%',
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
		 			var physicalCount =  $('#jqxgridFg').jqxGrid('getcellvalue', row, 'physicalCount');
		 			var systemCount =  $('#jqxgridFg').jqxGrid('getcellvalue', row, 'systemCount');
		 			console.log(physicalCount);
		 			console.log(systemCount);
		 			var diff = 0;
		 			if(physicalCount != null && systemCount !=  null){
		 				diff = systemCount - physicalCount;
		    			return '<div style="text-align:center; margin: 0; padding-top:7px; height:40px;">' + diff + '</div>';
		 			}else{
		    			return '<div style="text-align:center; margin: 0; padding-top:7px; height:40px;">' + diff + '</div>';

		 			}
		 		}
			},
			{'text' : 'Difference Wt','datafield' : 'differenceWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '7%',
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
		 			var physicalWt =  $('#jqxgridFg').jqxGrid('getcellvalue', row, 'physicalWt');
		 			var systemWt =  $('#jqxgridFg').jqxGrid('getcellvalue', row, 'systemWt');
		 			var diff = 0.000;
		 			if(physicalWt != null && systemWt !=  null){
		 				diff = systemWt - physicalWt;
		    			return '<div style="text-align:center; margin: 0; padding-top:7px; height:40px;">' + diff.toFixed(3) + '</div>';
		 			}else{
		    			return '<div style="text-align:center; margin: 0; padding-top:7px; height:40px;">' + diff + '</div>';

		 			}
		 		}
			},
			{'text' : 'Remarks','datafield' : 'remarks','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},

			]
	});
}
var stoneGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'fromdate','type' : 'date','map'  : 'createdDate'},
			{'name' : 'toDate','type' : 'date','map'  : ''},
			{'name' : 'storeName','type' : 'string','map'  : 'dcName'},
			{'name' : 'zone','type' : 'string','map'  : 'zoneDesc'},
			{'name' : 'segment','type' : 'string','map'  : 'metalOrArticleOrStnOrAccSegmentName'}, 
			{'name' : 'seName','type' : 'string','map'  : 'createdBy'},
			{'name' : 'jType','type' : 'string','map'  : 'jewelTypeDescription'}, 
			{'name' : 'physicalCount','type' : 'long','map'  : 'inputFGOrStoneOrAccPcs'},
			{'name' : 'systemCount','type' : 'long','map'  : 'systemFGOrStoneOrAccPcs'},
			{'name' : 'physicalWt','type' : 'float','map'  : 'inputFGOrStoneOrAccWt'},
			{'name' : 'systemWt','type' : 'float','map'  : 'systemFGOrStoneOrAccWt'},
			{'name' : 'difference','type' : 'long','map'  : ''},
			{'name' : 'differenceWt','type' : 'float','map'  : ''},

			{'name' : 'remarks','type' : 'string','map'  : 'notTallyReason'},
			{'name' : 'stockCheckDCType','type' : 'string','map':'refDocType'},
			{'name' : 'zoneDesc','type' : 'string'},
			{'name' : 'stoneOrAccCatDesc','type' : 'string','map':'stoneOrAccCatDesc'},
			{'name' : 'stoneOrAccSubCatId','type' : 'string','map':'stoneOrAccSubCatDesc'},

			{'name' : 'stoneOrAccCatId','type' : 'string','map':'stoneOrAccCatId'},
			{'name' : 'locationCode','type' : 'string'}
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStone").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
 	    statusbarheight: 30,
		columns : [
			{'text' : 'Date','datafield' : 'fromdate','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,cellsformat : 'dd/MM/yyyy'},
			{'text' : 'DC Name','datafield' : 'storeName','width' : '11%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Stock Check Type','datafield' : 'stockCheckDCType','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Zone','datafield' : 'zoneDesc','width' : '8%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Loc','datafield' : 'locationCode','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			
			{'text' : 'Segment','datafield' : 'segment','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Category','datafield' : 'stoneOrAccCatId','width' : '5%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Category Name','datafield' : 'stoneOrAccCatDesc','width' : '8%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Sub Cat','datafield' : 'stoneOrAccSubCatId','width' : '8%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},

			{'text' : 'Sales Person Name','datafield' : 'seName',editable : false,cellsalign : 'left',align : 'center',sortable : false,'width' : '10%'},
			{'text' : 'Jewel Type','datafield' : 'jType',editable : false,cellsalign : 'left',align : 'center',sortable : true,'width' : '12%'},
			{'text' : 'Physical Pcs Entered','datafield' : 'physicalCount',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '8%'},
			{'text' : 'System Number of Pcs','datafield' : 'systemCount',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '7%'},
			{'text' : 'Physical Wt Entered','datafield' : 'physicalWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '7%',cellsformat:'d3'},
			{'text' : 'System Wt','datafield' : 'systemWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '7%',cellsformat:'d3'},
			{'text' : 'Difference Pcs','datafield' : 'difference',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '5%',
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
		 			var physicalCount =  $('#jqxgridStone').jqxGrid('getcellvalue', row, 'physicalCount');
		 			var systemCount =  $('#jqxgridStone').jqxGrid('getcellvalue', row, 'systemCount');
		 			var diff = 0;
		 			if(physicalCount != null && systemCount !=  null){
		 				diff = systemCount - physicalCount;
		    			return '<div style="text-align:center; margin: 0; padding-top:7px; height:40px;">' + diff + '</div>';
		 			}else{
		    			return '<div style="text-align:center; margin: 0; padding-top:7px; height:40px;">' + diff + '</div>';

		 			}
		 		}
			},
			{'text' : 'Difference Wt','datafield' : 'differenceWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '7%',
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
		 			var physicalWt =  $('#jqxgridStone').jqxGrid('getcellvalue', row, 'physicalWt');
		 			var systemWt =  $('#jqxgridStone').jqxGrid('getcellvalue', row, 'systemWt');
		 			var diff = 0.000;
		 			if(physicalWt != null && systemWt !=  null){
		 				diff = systemWt - physicalWt;
		    			return '<div style="text-align:center; margin: 0; padding-top:7px; height:40px;">' + diff.toFixed(3) + '</div>';
		 			}else{
		    			return '<div style="text-align:center; margin: 0; padding-top:7px; height:40px;">' + diff + '</div>';

		 			}
		 		}
			},
			{'text' : 'Remarks','datafield' : 'remarks','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},

			]
	});
}

var accGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'fromdate','type' : 'date','map'  : 'createdDate'},
			{'name' : 'toDate','type' : 'date','map'  : ''},
			{'name' : 'storeName','type' : 'string','map'  : 'dcName'},
			{'name' : 'zone','type' : 'string','map'  : 'zoneDesc'},
			{'name' : 'segment','type' : 'string','map'  : 'metalOrArticleOrStnOrAccSegmentName'}, 
			{'name' : 'seName','type' : 'string','map'  : 'createdBy'},
			{'name' : 'jType','type' : 'string','map'  : 'jewelTypeDescription'}, 
			{'name' : 'physicalCount','type' : 'long','map'  : 'inputFGOrStoneOrAccPcs'},
			{'name' : 'systemCount','type' : 'long','map'  : 'systemFGOrStoneOrAccPcs'},
			{'name' : 'physicalWt','type' : 'float','map'  : 'inputFGOrStoneOrAccWt'},
			{'name' : 'systemWt','type' : 'float','map'  : 'systemFGOrStoneOrAccWt'},
			{'name' : 'difference','type' : 'long','map'  : ''},
			{'name' : 'differenceWt','type' : 'float','map'  : ''},

			{'name' : 'remarks','type' : 'string','map'  : 'notTallyReason'},
			{'name' : 'stockCheckDCType','type' : 'string','map':'refDocType'},
			{'name' : 'zoneDesc','type' : 'string'},
			{'name' : 'catId','type' : 'long','map':'stoneOrAccCatId'},
			{'name' : 'stoneOrAccCatDesc','type' : 'string','map':'stoneOrAccCatDesc'},
			{'name' : 'stoneOrAccSubCatDesc','type' : 'string','map':'stoneOrAccSubCatDesc'},

			{'name' : 'locationCode','type' : 'string','map':''}
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
 	    statusbarheight: 30,
		columns : [
			{'text' : 'Date','datafield' : 'fromdate','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,cellsformat : 'dd/MM/yyyy'},
			{'text' : 'DC Name','datafield' : 'storeName','width' : '11%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Stock Check Type','datafield' : 'stockCheckDCType','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Zone','datafield' : 'zoneDesc','width' : '8%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Loc','datafield' : 'locationCode','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			
			{'text' : 'Segment','datafield' : 'segment','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Category','datafield' : 'catId','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Category Name','datafield' : 'stoneOrAccCatDesc','width' : '8%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'SubCat Desc','datafield' : 'stoneOrAccSubCatDesc','width' : '8%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},

			{'text' : 'Sales Person Name','datafield' : 'seName',editable : false,cellsalign : 'left',align : 'center',sortable : false,'width' : '10%'},
			{'text' : 'Jewel Type','datafield' : 'jType',editable : false,cellsalign : 'left',align : 'center',sortable : true,'width' : '12%'},
			{'text' : 'Physical Pcs Entered','datafield' : 'physicalCount',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '8%'},
			{'text' : 'System Number of Pcs','datafield' : 'systemCount',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '7%'},
			{'text' : 'Physical Wt Entered','datafield' : 'physicalWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '7%',cellsformat:'d3'},
			{'text' : 'System Wt','datafield' : 'systemWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '7%',cellsformat:'d3'},
			{'text' : 'Difference Pcs','datafield' : 'difference',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '5%',
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
		 			var physicalCount =  $('#jqxgridAcc').jqxGrid('getcellvalue', row, 'physicalCount');
		 			var systemCount =  $('#jqxgridAcc').jqxGrid('getcellvalue', row, 'systemCount');
		 			var diff = 0;
		 			if(physicalCount != null && systemCount !=  null){
		 				diff = systemCount - physicalCount;
		    			return '<div style="text-align:center; margin: 0; padding-top:7px; height:40px;">' + diff + '</div>';
		 			}else{
		    			return '<div style="text-align:center; margin: 0; padding-top:7px; height:40px;">' + diff + '</div>';

		 			}
		 		}
			},
			{'text' : 'Difference Wt','datafield' : 'differenceWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '7%',
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
		 			var physicalWt =  $('#jqxgridAcc').jqxGrid('getcellvalue', row, 'physicalWt');
		 			var systemWt =  $('#jqxgridAcc').jqxGrid('getcellvalue', row, 'systemWt');
		 			var diff = 0.000;
		 			if(physicalWt != null && systemWt !=  null){
		 				diff = systemWt - physicalWt;
		    			return '<div style="text-align:center; margin: 0; padding-top:7px; height:40px;">' + diff.toFixed(3) + '</div>';
		 			}else{
		    			return '<div style="text-align:center; margin: 0; padding-top:7px; height:40px;">' + diff + '</div>';

		 			}
		 		}
			},
			{'text' : 'Remarks','datafield' : 'remarks','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			]
	});
}