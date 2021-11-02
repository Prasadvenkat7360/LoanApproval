$("#fromDateS").datepicker({ changeYear:true, changeMonth:true, dateFormat:"dd/mm/yy", maxDate: 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});


$("#toDateS").datepicker({ changeYear:true, changeMonth:true, dateFormat:"dd/mm/yy",maxDate : 0});

var onloadFunc = function(){
	$("#loading").show();
	var params = {"fieldFilters":{"docType":"customer_list"}};
	
	postJSON('/OrderExecution/api/v1/searchOrderStatementAndLov',JSON.stringify(params),function(data) {
		if(data.resCode == "1"){
			$("#loading").hide();
			custId = data.payload.customer_list;
			var data = [];
			$.each(custId, function(key, value) {
				data.push({
					value : value.id,
					label : value.name
				});
			});
			
			$(function() {
				$("#customerName").autocomplete({
					source : data,
					focus : function(event, ui) {
						event.preventDefault();
						$(this).val(ui.item.label);
					},
					select : function(event, ui) {
						event.preventDefault();
						$(this).val(ui.item.label);
						$("#customerName-value").val(ui.item.value);
					}
				});
			});
		}
	});
}

onloadFunc();

$("#gridTabs").hide();

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};

$(".tabDisabledS").addClass("tabDisabled2");
$("#gridTabs").tabs({
	disabled:[]
});

//Field Filters
var statementOfAccFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var ordNo = $('#orderNo').val();
	var custName = $("#customerName").val();
	var custNameVal = $('#customerName-value').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (ordNo != "" && ordNo != null) {
		fieldFilters.fieldFilters["orderNo"] = ordNo;
	}	
	if (custName != "" && custName != null) {
		fieldFilters.fieldFilters["customerId"] = custNameVal;
	}
	fieldFilters.fieldFilters["docType"] = "search";

	return fieldFilters;
}

$("#search").on('click',function(){
	/*if($("#fromDateS").val() == "" || $("#toDateS").val() == "" || $("#vendorCodeS").val() == "" || $("#grvTypeS").val() == "" ){
		$.growl.error({
			message : "Please Fill Mandatrory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}*/
	activaTab('tab0default');
	$("#gridTabs").show();
	headerGrid();
	$("#jqxgrid").show();
});

//Search grid 
function headerGrid() {
	var updateRows = function(rowid, newdata, commit) {
		  commit(true);
	}
	var datafields = [
		{'name' : 'orderNo','type' : 'int','map':'orderNo'},
		{'name' : 'stmId','type' : 'int','map':'id'},

		{'name' : 'store','type' : 'string','map':'store>name'},
		{'name' : 'customer','type' : 'string','map':'customer>name'},
		{'name' : 'totalCreditGoldWt','type' : 'float','map' : 'totalCreditGoldWt'},
		{'name' : 'totalCreditSilverWt','type' : 'float','map':'totalCreditSilverWt'}, 
		{'name' : 'totalCreditPlatinumWt','type' : 'float','map' : 'totalCreditPlatinumWt'},
		{'name' : 'payableAmt','type' : 'float','map' : 'payableAmount'},
		{'name' : 'flag','type' : 'string'},
		{'name' : 'status','type' : 'string','map':'Active'},

	 ];

	var columns = [ 
		{'text' : '','datafield' : '',cellsalign : 'center',columntype : 'checkbox',align : 'center','width' : '4%',sortable : false,
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				console.log(newvalue);
				$('#jqxgrid').jqxGrid ('setcellvalue', row, 'flag',  newvalue);
				},
		},
		{'text' : 'flag','datafield' : 'flag','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},

		{'text' : 'Statement Id','datafield' : 'stmId','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	 			var status =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
				if(status == "InActive"){
					return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
				}else{
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
				}
	 		 }
		},
		{'text' : 'Order Number','datafield' : 'orderNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : true,editable : false,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	 			var status =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
				if(status == "InActive"){
					return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
				}else{
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
				}
	 		 }
		},

		{'text' : 'Store Name','datafield' : 'store','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	 			var status =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
				if(status == "InActive"){
					return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
				}else{
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
				}
	 		 }
		},
		{'text' : 'Customer Name','datafield' : 'customer','width' : '20%',cellsalign : 'center',align : 'center',sortable : true,editable : false,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	 			var status =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
				if(status == "InActive"){
					return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
				}else{
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
				}
	 		 }
		},
		{'text' : 'Total Credit Gold Wt','datafield' : 'totalCreditGoldWt','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3',
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	 			var status =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
				if(status == "InActive"){
					return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
				}else{
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
				}
	 		 }
		},

		{'text' : 'Total Credit Platinum Wt','datafield' : 'totalCreditPlatinumWt','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3',
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	 			var status =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
				if(status == "InActive"){
					return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
				}else{
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
				}
	 		 }
		},
		{'text' : 'Total Credit Silver Wt','datafield' : 'totalCreditSilverWt','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3',
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	 			var status =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
				if(status == "InActive"){
					return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
				}else{
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
				}
	 		 }
		},
		{'text' : 'Payable Amount','datafield' : 'payableAmt','width' : '10%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat:'d2',
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	 			var status =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
				if(status == "InActive"){
					return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
				}else{
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
				}
	 		 }
		},
		{'text' : 'Active/In Active','datafield' : 'status','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false,cellsformat:'d2',
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	 			var status =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'status');
				if(status == "InActive"){
					return '<div style="text-align:center; margin: 0; background: #FF0000; color: #FFF; padding-top:10px; height:30px;">' + value + '</div>';
				}else{
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">' + value + '</div>';
				}
	 		 }
		}

		];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchOrderStatementAndLov", "list",columns, statementOfAccFieldFilters(), updateRows);
	var columnCheckBox = null;
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

/*function statementOfAccGrid() {
	var updateRows = function(rowid, newdata, commit) {
		  commit(true);
	}
	var datafields = [
		{'name' : 'orderNo','type' : 'int','map':'id'},
		{'name' : 'slNo','type' : 'int','map':''},
		{'name' : 'orderType','type' : 'string','map':''},
		{'name' : 'metalSegment','type' : 'string','map' : ''},
		{'name' : 'jewelType','type' : 'string','map':''}, 
		{'name' : 'skinPurity','type' : 'float','map' : ''},
		{'name' : 'meltingPurity','type' : 'float','map' : ''},
		{'name' : 'pcs','type' : 'int','map' : ''},
		{'name' : 'preNetWt','type' : 'float','map' : ''},
		{'name' : 'grossWt','type' : 'float','map' : ''},
		{'name' : 'netWt','type' : 'float','map' : ''},
		{'name' : 'costCode','type' : 'string','map' : ''},
		{'name' : 'wastage','type' : 'float','map' : ''},
		{'name' : 'labour','type' : 'float','map' : ''},
		{'name' : 'ordDatemRate','type' : 'float','map' : ''}, 
		{'name' : 'daysBoardRate','type' : 'float','map' : ''},
		{'name' : 'convNetWastage','type' : 'float','map' : ''},
		{'name' : 'adjMetalWt','type' : 'float','map' : ''},
		{'name' : 'lineItemWiseBal','type' : 'float','map' : ''},
		{'name' : 'metalValue','type' : 'float','map' : ''},
		{'name' : 'adjToAdv','type' : 'float'},
		{'name' : 'excessAdv','type' : 'float'},
		{'name' : 'taxAmt','type' : 'float'},
		{'name' : 'totaltaxAmt','type' : 'float'},
		{'name' : 'amtInclTax','type' : 'float'},
		{'name' : 'view','type' : 'int'},
		{'name' : 'flag','type' : 'string'},

	 ];

	var columns = [ 
		{'text' : '','datafield' : '',cellsalign : 'center',columntype : 'checkbox',align : 'center','width' : '4%',sortable : false,
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				console.log(newvalue);
				$('#jqxgrid').jqxGrid ('setcellvalue', row, 'flag',  newvalue);
				}
		},
		{'text' : 'flag','datafield' : 'flag','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},

		{'text' : 'Order No','datafield' : 'orderNo','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Srl No','datafield' : 'slNo','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Order Type','datafield' : 'orderType','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
		{'text' : 'Metal Segment','datafield' : 'metalSegment','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 

		{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Melting Purity','datafield' : 'meltingPurity','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '6%',cellsalign : 'center',align : 'center','cellsformat' : 'd2',sortable :false,editable : false},
		{'text' : 'Pre-Repair Net Wt','datafield' : 'preNetWt','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Gross Wt.','datafield' : 'grossWt','width' : '5%',cellsalign : 'left',align : 'center',sortable : false,editable : false},
		{'text' : 'Net Wt','datafield' : 'netWt','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Cost Code','datafield' : 'costCode','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 

		{'text' : 'Wastage','datafield' : 'wastage','width' : '6%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable :false,editable : false,
		},
		{'text' : 'Labour','datafield' : 'labour','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false,
		},
		{'text' : 'Orde Date Metal Rate','datafield' : 'ordDatemRate','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable :false,editable : false,
		},
		{'text' : 'Days Board Rate','datafield' : 'daysBoardRate','width' : '7%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false,
		},
		{'text' : 'Net Wt + Wastage Wt. Converted to 99.90','datafield' : 'convNetWastage','width' : '7%',cellsalign : 'right',align : 'center',sortable : false,cellsformat : 'd2',editable : false},

		{'text' : 'Adjusted Given Metal Wt in 99.90','datafield' : 'adjMetalWt','width' : '7%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false,
		},
		{'text' : 'Line Item Wise Balance Metal(+/-)','datafield' : 'lineItemWiseBal','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable : false,editable : false,
		},
		{'text' : 'Metal Value','datafield' : 'metalValue','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable : false,editable : false,
		},
		{'text' : 'Adjusted to Advance','datafield' : 'adjToAdv','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden : true}, 
		{'text' : 'Excess Advance for Calculation','datafield' : 'excessAdv','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden : true}, 
		{'text' : 'Taxable Amount','datafield' : 'taxAmt','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden : true}, 
		{'text' : 'Total Tax Amount','datafield' : 'totaltaxAmt','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden : true}, 
		{'text' : 'Amount Including Tax','datafield' : 'amtInclTax','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden : true}, 
		{'text' : 'View Tax','datafield' : 'view','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden : true}, 
		];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchOrderStatementAndLov", "list",columns, statementOfAccFieldFilters(), updateRows);
	var columnCheckBox = null;
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
}*/

var dataArr = [];
$("#jqxgrid").bind('cellendedit', function (event,index) {
	var i =event.args.rowindex;
	    if (event.args.value) {
	      $("#jqxgrid").jqxGrid('selectrow', event.args.row);
	        dataArr.push(i);
	       $(".tabDisabledS").removeClass("tabDisabled2");
	   	    }
	    else {
	        $("#jqxgrid").jqxGrid('unselectrow', event.args.row);
	        var delArr = dataArr.splice(i,1);
	    }
	    if($("#jqxgrid").jqxGrid("getselectedrowindexes") <= 0)
		{
	    	$(".tabDisabledS").addClass("tabDisabled2");
		}
	    $.each(dataArr, function(key, val) {
	    		var data =$("#jqxgrid").jqxGrid('getrowdata',val);
	    });
	});

function selectedCheckBox(){
	var dataArr1 = [];
	var grvData = $("#jqxgrid").jqxGrid('getrows');
	console.log(grvData);
	$.each(grvData,function(k,v){
		if(v.flag == true){
			dataArr1.push(v.stmId);
		}
	}); 	
	console.log(dataArr1);
	return dataArr1;
}

$("#stoneDetails").click(function () {
	var grvNoArray;
	var grvNoArray= selectedCheckBox();
	var params = 
	{"fieldFilters":
		{
		    "docType":"stoneDetails",
			"docNo":grvNoArray.toString()
		}
	}
	postJSON('/OrderExecution/api/v1/searchOrderStatementAndLov',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.stoneDetails;
			stoneDetailsGrid(data);
			$('#jqxgridStone').show();
		}else{
			stoneDetailsGrid();
			$('#jqxgridStone').show();
			
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});

var stoneDetailsGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'refNo','type' : 'int','map':'refNo'},

			{'name' : 'refSlNo','type' : 'int','map':'refSrlNo'},
			{'name' : 'stoneSrlNo','type' : 'int','map' : 'stoneSrlNo'},
			{'name' : 'stoneSeg','type' : 'string','map':'segemnt>description'}, 
			{'name' : 'subCatDesc','type' : 'int','map' : 'subCategoryDesc'},
			{'name' : 'stonePcs','type' : 'string','map' : 'pieces'},
			{'name' : 'weight','type' : 'string','map' : 'weight'},
			{'name' : 'uqc','type' : 'string','map' : 'uom'},
			
			{'name' : 'stoneRate','type' : 'string','map':'sellingRate'},
			{'name' : 'stoneValue','type' : 'string','map' : 'sellingPrice'},
		
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
		columns : [
			{'text' : 'Order No','datafield' : 'refNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 

			{'text' : 'Order Sl No','datafield' : 'refSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Stone Sl No','datafield' : 'stoneSrlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Stone Segment','datafield' : 'stoneSeg','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Sub Cat Desc','datafield' : 'subCatDesc','width' : '35%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Stone Pcs','datafield' : 'stonePcs','width' : '8%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Stone Wt','datafield' : 'weight','width' : '10%',cellsalign : 'right',align : 'center',sortable :false,editable : false,'cellsformat' : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Stone Rate','datafield' : 'stoneRate','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,'cellsformat' : 'd2'}, 
			{'text' : 'Stone Value','datafield' : 'stoneValue','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,'cellsformat' : 'd2'}, 
		]
	});
}

$("#accDetails").click(function () {
	var grvNoArray;
	var grvNoArray= selectedCheckBox();
	var params = 
	{"fieldFilters":
		{
		    "docType":"AccessoryDetails",
			"docNo":grvNoArray.toString()
		}
	}
	postJSON('/OrderExecution/api/v1/searchOrderStatementAndLov',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.AccessoryDetails;
			accDetailsGrid(data);
			$('#jqxgridStone').show();
		}else{
			accDetailsGrid();
			$('#jqxgridStone').show();
			
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});

var accDetailsGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'refNo','type' : 'int','map':'refNo'},

			{'name' : 'refSlNo','type' : 'int','map':'refSrlNo'},
			{'name' : 'accSrlNo','type' : 'int','map' : 'accSrlNo'},
			{'name' : 'accSeg','type' : 'string','map':'segemnt>description'}, 
			{'name' : 'subCatDesc','type' : 'int','map' : 'subCategoryDesc'},
			{'name' : 'accPcs','type' : 'string','map' : 'pieces'},
			{'name' : 'weight','type' : 'string','map' : 'weight'},
			{'name' : 'uqc','type' : 'string','map' : 'uom'},
			
			{'name' : 'accRate','type' : 'string','map':'sellingRate'},
			{'name' : 'accValue','type' : 'string','map' : 'sellingPrice'},
		
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
		columns : [
			{'text' : 'Order No','datafield' : 'refNo','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 

			{'text' : 'Order Sl No','datafield' : 'refSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Accessory Sl No','datafield' : 'accSrlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Acc Segment','datafield' : 'accSeg','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Acc Sub Cat Desc','datafield' : 'subCatDesc','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Acc Pcs','datafield' : 'accPcs','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Acc Wt','datafield' : 'weight','width' : '10%',cellsalign : 'right',align : 'center',sortable :false,editable : false,'cellsformat' : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Acc Rate','datafield' : 'accRate','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,'cellsformat' : 'd2'}, 
			{'text' : 'Acc Value','datafield' : 'accValue','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,'cellsformat' : 'd2'}, 
		]
	});
}

$("#itemDetails").click(function () {
	var grvNoArray;
	var grvNoArray= selectedCheckBox();
	var params = 
	{"fieldFilters":
		{
		    "docType":"Order_Statement_Details",
			"docNo":grvNoArray.toString()
		}
	}
	postJSON('/OrderExecution/api/v1/searchOrderStatementAndLov',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.Order_Statement_Details;
			itemDetailsGrid(data);
			$('#jqxgridItem').show();
		}else{
			itemDetailsGrid();
			$('#jqxgridItem').show();
			
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});

var itemDetailsGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'orderNo','type' : 'int','map':'refDocNo'},
			{'name' : 'slNo','type' : 'int','map':'refDocSrlNo'},
			{'name' : 'orderType','type' : 'string','map':'orderType'},
			{'name' : 'metalSegment','type' : 'string','map' : 'mseg>description'},
			{'name' : 'jewelType','type' : 'string','map':'jewelType>description'}, 
			{'name' : 'skinPurity','type' : 'float','map' : 'skinPurity'},
			{'name' : 'meltingPurity','type' : 'float','map' : 'meltingPurity'},
			{'name' : 'pcs','type' : 'int','map' : 'pieces'},
			{'name' : 'preNetWt','type' : 'float','map' : 'preRepairNetWt'},
			{'name' : 'grossWt','type' : 'float','map' : 'grossWt'},
			{'name' : 'netWt','type' : 'float','map' : 'netWt'},
			{'name' : 'costCode','type' : 'string','map' : 'costCode'},
			{'name' : 'wastage','type' : 'float','map' : 'costWastageWt'},
			{'name' : 'labour','type' : 'float','map' : 'costMCCharge'},
			{'name' : 'ordDatemRate','type' : 'float','map' : 'orderDatemetalRate'}, 
			{'name' : 'daysBoardRate','type' : 'float','map' : 'boardRate'},
			{'name' : 'convNetWastage','type' : 'float','map' : 'netWastageWt'},
			{'name' : 'adjMetalWt','type' : 'float','map' : 'creditAcctAdjWt'},
			{'name' : 'lineItemWiseBal','type' : 'float','map' : 'balanceMetal'},
			{'name' : 'metalValue','type' : 'float','map' : 'metalValue'},
			{'name' : 'adjToAdv','type' : 'float','map':'adjToAdv'},
			{'name' : 'excessAdv','type' : 'float','map':'exceAdvCal'},
			{'name' : 'taxAmt','type' : 'float','map':'ItemValue'},
			{'name' : 'totaltaxAmt','type' : 'float','map':'totalTaxAmnt'},
			{'name' : 'amtInclTax','type' : 'float','map':'ItemValWithTax'},
			{'name' : 'actionV','type' : 'int','map' : 'id'},

		
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridItem").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		columns : [

			{'text' : 'Order No','datafield' : 'orderNo','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Srl No','datafield' : 'slNo','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Order Type','datafield' : 'orderType','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Metal Segment','datafield' : 'metalSegment','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 

			{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'},
			{'text' : 'Melting Purity','datafield' : 'meltingPurity','width' : '5%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat:'d2'},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '6%',cellsalign : 'center',align : 'center','cellsformat' : 'd2',sortable :false,editable : false},
			{'text' : 'Pre-Repair Net Wt','datafield' : 'preNetWt','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'}, 
			{'text' : 'Gross Wt.','datafield' : 'grossWt','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'},
			{'text' : 'Net Wt','datafield' : 'netWt','width' : '6%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat:'d3'},
			{'text' : 'Cost Code','datafield' : 'costCode','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 

			{'text' : 'Wastage','datafield' : 'wastage','width' : '6%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable :false,editable : false,
			},
			{'text' : 'Labour','datafield' : 'labour','width' : '5%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat:'d2',
			},
			{'text' : 'Order Date Metal Rate','datafield' : 'ordDatemRate','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable :false,editable : false,
			},
			{'text' : 'Days Board Rate','datafield' : 'daysBoardRate','width' : '7%',cellsalign : 'right',align : 'center','cellsformat' : 'd2',sortable :false,editable : false,
			},
			{'text' : 'Net Wt + Wastage Wt. Converted to 99.90','datafield' : 'convNetWastage','width' : '7%',cellsalign : 'right',align : 'center',sortable : false,cellsformat : 'd3',editable : false},

			{'text' : 'Adjusted Given Metal Wt in 99.90','datafield' : 'adjMetalWt','width' : '7%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false,
			},
			{'text' : 'Line Item Wise Balance Metal(+/-)','datafield' : 'lineItemWiseBal','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false,editable : false,
			},
			{'text' : 'Metal Value','datafield' : 'metalValue','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable : false,editable : false,
			},
			{'text' : 'Adjusted to Advance','datafield' : 'adjToAdv','width' : '4%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'}, 
			{'text' : 'Excess Advance for Calculation','datafield' : 'excessAdv','width' : '4%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'}, 
			{'text' : 'Taxable Amount','datafield' : 'taxAmt','width' : '4%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'}, 
			{'text' : 'Total Tax Amount','datafield' : 'totaltaxAmt','width' : '4%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'}, 
			{'text' : 'Amount Including Tax','datafield' : 'amtInclTax','width' : '4%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'},
			{'text' : 'View','datafield' : 'actionV','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : itemViewRenderer},

		]
	});
}

$("#credToDetails").click(function () {
	var grvNoArray;
	var grvNoArray= selectedCheckBox();
	var params = 
	{"fieldFilters":
		{
		    "docType":"OrderCreditAccountDetails",
			"docNo":grvNoArray.toString()
		}
	}
	postJSON('/OrderExecution/api/v1/searchOrderStatementAndLov',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.OrderCreditAccountDetails;
			creditToAccDetailsGrid(data);
			$('#jqxgridCredit').show();
		}else{
			creditToAccDetailsGrid();
			$('#jqxgridCredit').show();
			
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});

var creditToAccDetailsGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'orderNo','type' : 'int','map':'refDocNo'},

			{'name' : 'metalSeg','type' : 'string','map':'segment>description'},
			{'name' : 'creditWt','type' : 'float','map' : 'custCreditWeight'},
			{'name' : 'excessMetalForAutoPb','type' : 'float','map':'excessMetalWt'}, 
			{'name' : 'excessMetalValue','type' : 'float','map' : 'excessMetalVal'},
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridCredit").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		columns : [
			{'text' : 'Order No','datafield' : 'orderNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 

			{'text' : 'Metal Segment','datafield' : 'metalSeg','width' : '20%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Credited Wt in 99.9','datafield' : 'creditWt','width' : '25%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd3'}, 
			{'text' : 'Excess Metal For Auto PB','datafield' : 'excessMetalForAutoPb','width' : '25%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd3'},
			{'text' : 'Excess Metal Value','datafield' : 'excessMetalValue','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd2'},
		]
	});
}

$("#advDetails").click(function () {
	var grvNoArray;
	var grvNoArray= selectedCheckBox();
	var params = 
	{"fieldFilters":
		{
		    "docType":"AdvanceDetails",
			"docNo":grvNoArray.toString()
		}
	}
	postJSON('/OrderExecution/api/v1/searchOrderStatementAndLov',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.AdvanceDetails;
			advanceDetailsGrid(data);
			$('#jqxgridAdv').show();
		}else{
			advanceDetailsGrid();
			$('#jqxgridAdv').show();
			
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});

var advanceDetailsGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'orderNo','type' : 'int','map':'refNo'},

			{'name' : 'advAmt','type' : 'float','map':'advanceAmt'},
			{'name' : 'unrealAdvAmt','type' : 'float','map' : ''},
			{'name' : 'confStatus','type' : 'string','map':'isConfirmed'}, 
			{'name' : 'metalSeg','type' : 'string','map' : 'metalSegment>description'},
			{'name' : 'skinPurity','type' : 'float','map' : 'skinPurity'},
			{'name' : 'confWt','type' : 'float','map' : 'confirmedWeight'},
			{'name' : 'confRate','type' : 'float','map' : 'sellingRate'},

			
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAdv").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		columns : [
			{'text' : 'Order No','datafield' : 'orderNo','width' : '15%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 

			{'text' : 'Advance Amount','datafield' : 'advAmt','width' : '15%',cellsalign : 'center',align : 'center',sortable : true,editable : false,cellsformat:'d2'}, 
			//{'text' : 'Unrealized Advance Amount','datafield' : 'unrealAdvAmt','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat:'d2'}, 
			{'text' : 'Confirmation Status','datafield' : 'confStatus','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Metal Segment','datafield' : 'metalSeg','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat:'d2'},
			{'text' : 'Confirm Wt','datafield' : 'confWt','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat:'d3'},
			{'text' : 'Confirmation Rate','datafield' : 'confRate','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat:'d2'},
		]
	});
}

$("#taxDetails").click(function () {
	var grvNoArray;
	var grvNoArray= selectedCheckBox();
	var params = 
	{"fieldFilters":
		{
		    "docType":"OrderStmntTaxDetails",
			"docNo":grvNoArray.toString()
		}
	}
	postJSON('/OrderExecution/api/v1/searchOrderStatementAndLov',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.OrderStmntTaxDetails;
			taxDetailsGrid(data);
			$('#jqxgridTax').show();
		}else{
			taxDetailsGrid();
			$('#jqxgridTax').show();
			
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});

var taxDetailsGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'orderNo','type' : 'int','map':'refNo'},

			{'name' : 'srlNo','type' : 'int','map':'refSrlNo'},
			{'name' : 'taxType','type' : 'string','map' : 'taxType'},
			{'name' : 'hsnCode','type' : 'string','map':'hsnMaster>hsnCode'}, 
			{'name' : 'cgstPer','type' : 'float','map' : 'cgstPerc'},
			{'name' : 'cgstAmt','type' : 'float','map' : 'cgstAmt'},
			{'name' : 'sgstPer','type' : 'float','map' : 'sgstPerc'},
			{'name' : 'sgstAmt','type' : 'float','map' : 'sgstAmt'},
			{'name' : 'igstPerc','type' : 'float','map' : 'igstPerc'},
			{'name' : 'igstAmt','type' : 'float','map' : 'igstAmt'},
			{'name' : 'cessPer','type' : 'float','map' : 'cesstPerc'},
			{'name' : 'cessAmt','type' : 'float','map' : 'cessAmt'},
			{'name' : 'taxAmt','type' : 'float','map' : 'taxAmount'},

			
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridTax").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		showstatusbar: true,
 	    statusbarheight: 30,
 	    showaggregates: true,
		columns : [
			{'text' : 'Order No','datafield' : 'orderNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 

			{'text' : 'Srl No','datafield' : 'srlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Tax Type','datafield' : 'taxType','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'HSN Code','datafield' : 'hsnCode','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'CGST %','datafield' : 'cgstPer','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'},
			{'text' : 'CGST Amount','datafield' : 'cgstAmt','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'},
			{'text' : 'SGST %','datafield' : 'sgstPer','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'},
			{'text' : 'SGST Amount','datafield' : 'sgstAmt','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'},
			{'text' : 'IGST %','datafield' : 'igstPerc','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'},
			{'text' : 'IGST Amount','datafield' : 'igstAmt','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'},
			{'text' : 'CESS %','datafield' : 'cessPer','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'},
			{'text' : 'CESS Amount','datafield' : 'cessAmt','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2',
				aggregatesrenderer: function() {        		 
		  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Total Tax Amount: </b></span>';
					}
			},
			{'text' : 'Tax Amount','datafield' : 'taxAmt','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['taxAmt'] == null) ? 0 : record['taxAmt'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;font-weight:600">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
		]
	});
}

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('statementOfAccountReport', 'bodySwitcher')"
});

var itemViewRenderer = function(row, column, value) {
	   
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation"  type="button" id='
	+ row
	+ ' onclick="viewItemDet('
	+ value
	+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-lg"></i></a>'
 
}

var viewItemDet = function(id){
	

	
	var params = statementOfAccFieldFilters();
	console.log(params);
	
	params.fieldFilters.docType = "order_statement_rate_details";
	params.fieldFilters.docNo = id;
	
	 var gridData = $("#jqxgridItem").jqxGrid('getrows');
	 $.each(gridData,function(k,v){
		 if(v.actionV == id){
			params.fieldFilters.srlNos = v.slNo;
		 }
	 });

	postJSON('/OrderExecution/api/v1/searchOrderStatementAndLov',JSON.stringify(params),function(data) {
		if(data.resCode == 1){
			var result = data.payload.Order_Statement_Rate_Details;
			var count = 1;
			$.each(result,function(key,val){
				
				val.srlNo = count;
				count++;
			});
			metalRateGrid(result);
			$("#jqxgridV").show();
		}
	});
}

var metalRateGrid = function(data){
	console.log(data);
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 

			{'name' : 'srlNo','type' : 'int'},
			{'name' : 'metalWt','type' : 'float','map' : 'advAdjustWt'},
			{'name' : 'metalRateType','type' : 'string','map':'metalRateType'}, 
			//{'name' : 'metalRate ','type' : 'float','map':'metalAmt'},
			{'name' : 'metalAmt','type' : 'float','map' : 'ratePerGram'},
			{'name' : 'metalAmtVal','type' : 'float','map' : 'metalAmt'},

			
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		showstatusbar: true,
 	    statusbarheight: 30,
 	  //  showaggregates: true,
		columns : [
			{'text' : 'Srl No','datafield' : 'srlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Metal Weight','datafield' : 'metalWt','width' : '25%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'}, 
			{'text' : 'Metal Rate Type','datafield' : 'metalRateType','width' : '20%',cellsalign : 'left',align : 'center',sortable : false,editable : false,
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
					if(value == "C"){
						return '<div style="text-align:center; margin: 0; padding-top:6px; height:40px;">Confirmed Rate</div>';
					}else{
						return '<div style="text-align:center; margin: 0; padding-top:6px; height:40px;">Highest Rate</div>';
					}
		 		 }
			},
			{'text' : 'Metal Rate','datafield' : 'metalAmt','width' : '20%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'},
			{'text' : 'Metal Value','datafield' : 'metalAmtVal','width' : '25%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'},
		]
	});
}

//Multi level Export Functionality Done By Venkat
$("#export").on("click",function() {	
	$('#loading').show();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var ordNo = $('#orderNo').val();
	var custName = $("#customerName").val();
	var custNameVal = $('#customerName-value').val();
	
		fieldFilters = {
			"fieldFilters" : {
				"FromDate" : fromDateS,
				"ToDate" : toDateS,
				"orderId":ordNo,
				"customerId":custNameVal,
				"mode" : "excel",
				"reportName" : "RPT_Statement_Of_Account_Export"
			}
		}
		$.ajax({
			url : 'jasperReport',
			type : 'post',
			data : fieldFilters,
			contentType : "application/x-www-form-urlencoded",
			xhrFields : {
				responseType : "blob"
			},
			success : function(data) {
				console.log(data);
				$('#loading').hide();
				if (navigator.msSaveBlob) {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					navigator.msSaveBlob(file,'RPT_Statement_Of_Account_Export.xlsx');
				}else {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					var fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				}
			}
		});
		
});

$("#print").on("click",function() {	
	$('#loading').show();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var ordNo = $('#orderNo').val();
	var custName = $("#customerName").val();
	var custNameVal = $('#customerName-value').val();
	
		fieldFilters = {
			"fieldFilters" : {
				"FromDate" : fromDateS,
				"ToDate" : toDateS,
				"orderId":ordNo,
				"customerId":custNameVal,
				"mode" : "pdf",
				"reportName" : "RPT_Statement_Of_Account"
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
				$('#loading').hide();

				if (navigator.msSaveBlob) {
					var file = new Blob([ data ], {
						type : 'application/pdf'
					});
					navigator.msSaveBlob(file, 'RPT_Statement_Of_Account.pdf');
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