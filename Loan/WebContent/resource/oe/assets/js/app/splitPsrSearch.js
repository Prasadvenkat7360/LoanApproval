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

$("#status").val("Generated");

var psrSeachFieldFilters = function() {
	var fromDate = $("#fromDateS").val();
	var toDate = $("#toDateS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["orderFromDate"] = fromDate;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["orderToDate"] = toDate;
	}
	
	fieldFilters.fieldFilters["status"] = "G";
	fieldFilters.fieldFilters["flag"] = "splitBillPSRSearch";
	return fieldFilters;
}

/*function psrSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ 
		{'name' : 'slNo','type' : 'long','map'  : 'id'},
		{'name' : 'psrNo','type' : 'long','map'  : 'psrNumber'},
		{'name' : 'orderNo','type' : 'long','map'  : 'orderNo'},
		{'name' : 'orderSlNo','type' : 'long','map'  : 'orderSl'}, 
		{'name' : 'jewelType','type' : 'string','map'  : 'jewelType'},
		{'name' : 'vendDueDate','type' : 'string','map'  : 'vendorDueDate'}, 
		{'name' : 'vendorCode','type' : 'string','map'  : 'vendorCode'},
		{'name' : 'vendorName','type' : 'string','map'  : 'vendorCode'},
		
		];
	var columns = [
		{'text' : 'Sl No','datafield' : 'slNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
		{'text' : 'PSR No','datafield' : 'psrNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Order No','datafield' : 'orderNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Order Sl No','datafield' : 'orderSlNo','width' : '8%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '20%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Vendor Due Date','datafield' : 'vendDueDate','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode',editable : false,cellsalign : 'center',align : 'center',sortable : true,'width' : '6%',
			cellsrenderer: function(row, column, value){
				 var vCode = value.split('-');
				 return "<div align='center'style='margin-top:8px;'>"+vCode[0]+"</div>";
		      }
		},
		{'text' : 'Vendor Name','datafield' : 'vendorName',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '26%'},
	];
	showMyGrid(datafields,"/OrderExecution/api/v1/orderList?page=psr", "list",columns, psrSeachFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
	});
}
*/
var psrSearchGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'slNo','type' : 'long','map'  : 'id'},
				{'name' : 'psrNo','type' : 'long','map'  : 'psrNumber'},
				{'name' : 'orderNo','type' : 'long','map'  : 'orderNo'},
				{'name' : 'orderSlNo','type' : 'long','map'  : 'orderSl'}, 
				{'name' : 'jewelType','type' : 'string','map'  : 'jewelType'},
				{'name' : 'vendDueDate','type' : 'string','map'  : 'vendorDueDate'}, 
				{'name' : 'vendorCode','type' : 'string','map'  : 'vendorCode'},
				{'name' : 'vendorName','type' : 'string','map'  : 'vendorCode'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		//showaggregates: true,
		//showtoolbar : true,
		columns : [
			{'text' : 'Sl No','datafield' : 'slNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'PSR No','datafield' : 'psrNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Order No','datafield' : 'orderNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Order Sl No','datafield' : 'orderSlNo','width' : '8%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '20%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Vendor Due Date','datafield' : 'vendDueDate','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Vendor Code','datafield' : 'vendorCode',editable : false,cellsalign : 'center',align : 'center',sortable : true,'width' : '6%',
				cellsrenderer: function(row, column, value){
					 var vCode = value.split('-');
					 return "<div align='center'style='margin-top:8px;'>"+vCode[0]+"</div>";
			      }
			},
			{'text' : 'Vendor Name','datafield' : 'vendorName',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '26%'},
		]
	});
}

$("#search").on('click',function(){
	postJSON('/OrderExecution/api/v1/orderList?page=psr', JSON.stringify(psrSeachFieldFilters()), function(data) {
		var result = data.payload.list;
		result.sort(function(a, b){
			return a.psrNumber-b.psrNumber;
		});
		var count = 1;
		$.each(result,function(k,v){
			v.id = count;
			count = count +1;
		});
		console.log(result);
		
		psrSearchGrid(result);
		$("#jqxgrid").show();
	});
});


$("#removeAllPsrNos").on('click',function(){
	window.location.href="javascript:showContentPage('splitPsrSearch', 'bodySwitcher')"
});
