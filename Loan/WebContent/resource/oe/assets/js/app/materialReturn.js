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

$("#searchSection").hide();
$("#createSection").hide();
$("#consignmentOrderCreateSection").hide();
$("#gridTabs").hide();
$("#gridTabsDo").hide();
$("#gridTabsCo").hide();

$("#createOrSearch").on('change',function(){
	if( $("#createOrSearch").val() == "search"){
		$("#searchSection").show();
		$("#createSection").hide();
		
		$("#customerOrderCreateSection").hide();
		$("#consignmentOrderCreateSection").hide();
		$("#customerSearchSection").show();
		$("#consignmentSearchSection").hide();
		
	}else{
		$("#searchSection").hide();
		$("#createSection").show();
		
		$("#customerSearchSection").hide();
		$("#consignmentSearchSection").hide();
		
		$("#customerOrderCreateSection").show();
		$("#consignmentOrderCreateSection").hide();
	}
});

$("#customerSearchSection").hide();
$("#consignmentSearchSection").hide();
$('input:radio[name="matRetS"]').filter('[value="customerS"]').attr('checked', true);
$('input[name=matRetS]:radio').on('click', function() {
	var selectedVal = $(this).val();

	if (selectedVal == "customerS") {
		$("#customerSearchSection").show();
		$("#consignmentSearchSection").hide();

	}else{
		$("#customerSearchSection").hide();
		$("#consignmentSearchSection").show();
	}
});

$("#customerOrderCreateSection").hide();
$('input:radio[name="matRetC"]').filter('[value="customerC"]').attr('checked', true);
$('input[name=matRetC]:radio').on('click', function() {
	var selectedVal = $(this).val();
	if (selectedVal == "customerC") {
		$("#customerOrderCreateSection").show();
		$("#consignmentOrderCreateSection").hide();
	} else{
		$("#customerOrderCreateSection").hide();
		$("#consignmentOrderCreateSection").show();
	}
});

//Stock Order date picker functions 
$("#fromDateCuS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	maxDate : 0, 
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateCuS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateCuS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

//Consignment Order date picker functions
$("#fromDateCoS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateCoS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateCoS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});


$("#orderNoCuS").on('change',function(){
	if($("#orderNoCuS").val() != ""){
		loadOrderSlNo($("#orderNoCuS").val(),'ST');
	}
});

$("#orderNoCoS").on('change',function(){
	if($("#orderNoCoS").val() != ""){
		loadOrderSlNo($("#orderNoCoS").val(),'CO');
	}
});

$("#orderNoCuC").on('change',function(){
	if($("#orderNoCuC").val() != ""){
		loadOrderSlNo($("#orderNoCuC").val(),'ST');
	}
});

$("#orderNoCoC").on('change',function(){
	if($("#orderNoCoC").val() != ""){
		loadOrderSlNo($("#orderNoCoC").val(),'CO');
	}
});

var loadOrderSlNo = function(orderNo,type){
	$.getJSON('/OrderExecution/api/v1/getOrderSrlNosByOrderId?orderNo='+ orderNo+"&orderType="+type,function(data) {
		if(data.resCode == 1){
			$('#orderSlNoCuS').empty().append('<option value="" selected>--Select--</option>');
			$('#orderNoCoS').empty().append('<option value="" selected>--Select--</option>');	
			$('#orderSlNoCuC').empty().append('<option value="" selected>--Select--</option>');	
			$('#orderSlNoCoC').empty().append('<option value="" selected>--Select--</option>');	
				$.each(data.payload.orderSlNos, function(key, val) {
				$('#orderSlNoCuS').append('<option value="' + val.id + '">' + val.id + '</option>');
				$('#orderNoCoS').append('<option value="' + val.id + '">' + val.id + '</option>');
				$('#orderSlNoCuC').append('<option value="' + val.id + '">' + val.id + '</option>');
				$('#orderSlNoCoC').append('<option value="' + val.id + '">' + val.id + '</option>');
		});
	}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title  : 'Error'
			});
			return false;
	  	}
	});
}


var stockOrderFilters = function() {
	var fromDateCuS = $("#fromDateCuS").val();
	var toDateCuS = $("#toDateCuS").val();
	var orderNoCuS = $("#orderNoCuS").val();
	var orderSlNoCuS = $("#orderSlNoCuS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	fieldFilters.fieldFilters["orderType"] = "ST" ;
	
	if (fromDateCuS != "" && fromDateCuS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateCuS;
	}
	if (toDateCuS != "" && toDateCuS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateCuS;
	}
	if (orderNoCuS != "" && orderNoCuS != null) {
		fieldFilters.fieldFilters["orderId"] = orderNoCuS;
	}
	if (orderSlNoCuS != "" && orderSlNoCuS != null) {
		fieldFilters.fieldFilters["orderSrlNo"] = orderSlNoCuS;
	}
	return fieldFilters;

}


$("#searchST").on('click',function(){
	if($("#fromDateCuS").val() == "" || $("#toDateCuS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatrory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	activaTab('tab0default');
	$("#gridTabs").show();
	stockOrderSearch();
	$("#jqxgrid").show();
});

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};

$(".tabDisabledS").addClass("tabDisabled2");
$("#gridTabs").tabs({
	disabled:[]
});

function stockOrderSearch() {
	var updateRows = function(rowid, newdata, commit) {
		  commit(true);
	}
	var datafields = [
		{'name' : 'orderNo','type' : 'int','map':'orderId'},
		{'name' : 'srlNo','type' : 'int','map' : 'orderSrlNo'},
		{'name' : 'refStockNo','type' : 'int','map':'stockNo'}, 
		{'name' : 'ordKind','type' : 'string','map' : 'orderKind'},
		{'name' : 'segment','type' : 'string','map' : 'segment>description'},
		{'name' : 'metalType','type' : 'string','map' : 'metalSegment>description'},
		{'name' : 'subCatDesc','type' : 'string','map' : 'subCategoryDesc'},
		{'name' : 'purity','type' : 'float','map' : 'skinPurity'},
		{'name' : 'pcs','type' : 'int','map' : 'pieces'},
		{'name' : 'preGwt','type' : 'float','map' : 'preRepairGrossWt'}, 
		{'name' : 'preNwt','type' : 'float','map' : 'preRepairNetWt'},
		{'name' : 'finGwt','type' : 'float','map' : 'grossWt'}, 
		{'name' : 'finNwt','type' : 'float','map' : 'netWt'},
		{'name' : 'id','type' : 'int','map' : 'id'},
	 ];

	var columns = [ 
		{'text' : '','datafield' : '',cellsalign : 'center',columntype : 'checkbox',align : 'center','width' : '4%',sortable : false},
		{'text' : 'MR No','datafield' : 'id','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
		{'text' : 'Order No','datafield' : 'orderNo','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
		{'text' : 'Order Sl No','datafield' : 'srlNo','width' : '6%',cellsalign : 'center',align : 'center',sortable : true,editable : false},
		{'text' : 'Ref Stock No ','datafield' : 'refStockNo','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Order Kind','datafield' : 'ordKind','width' : '13%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Segment','datafield' : 'segment','width' : '8%',cellsalign : 'center',align : 'center','cellsformat' : 'd2',sortable :false,editable : false},
		{'text' : 'Metal Type','datafield' : 'metalType','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'SubCat Desc','datafield' : 'subCatDesc','width' : '19%',cellsalign : 'left',align : 'center',sortable : false,editable : false},
		{'text' : 'Purity','datafield' : 'purity','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,cellsformat : 'd2',editable : false},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		/*{'text' : 'Pre-Repair G Wt.','datafield' : 'preGwt','width' : '10%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
		{'text' : 'Pre-Repair N Wt.','datafield' : 'preNwt','width' : '10%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false,editable : false},*/
		{'text' : 'Gross Wt.','datafield' : 'finGwt','width' : '10%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable :false,editable : false},
		{'text' : 'Net Wt.','datafield' : 'finNwt','width' : '10%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
		//{'text' : '','datafield' : 'id','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false,hidden : true},
		];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchMaterialReturn", "list",columns, stockOrderFilters(), updateRows);
	var columnCheckBox = null;
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}

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
	var fgData =  $("#jqxgrid").jqxGrid("getselectedrowindexes");
		$.each(fgData, function(key, val) {
			dataArr1.push(val.id);
		});
	return dataArr1;
}

$("#stoneDetails").click(function () {
	var orderIdArray;
	var orderIdArray= selectedCheckBox();
	var orderID;
	var orderID = orderIdArray.join(",");
	var params = {"fieldFilters":{"ids":orderID}}
	postJSON('/OrderExecution/api/v1/searchMaterialReturnStoneAccDetails?materialType=S',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.list;
			stockOrderStoneGrid(data);
			$('#jqxgridStone').show();
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});


var stockOrderStoneGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stoneSlNo','type' : 'int','map':'orderSrlNo'},
			{'name' : 'segId','type' : 'int','map' : 'segment>description'},
			{'name' : 'catId','type' : 'int','map':'category>description'}, 
			{'name' : 'subCatDesc','type' : 'string','map' : 'subCategoryDesc'},
			{'name' : 'stoneWt','type' : 'float','map' : 'stoneWt'},
			{'name' : 'pieces','type' : 'int','map' : 'pieces'},,
			{'name' : 'id','type' : 'int','map' : 'id'},
			
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
			{'text' : 'MR No','datafield' : 'id','width' : '10%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Stone Sl No','datafield' : 'stoneSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Segment','datafield' : 'segId','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Category','datafield' : 'catId','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'SubCat Desc','datafield' : 'subCatDesc','width' : '30%',cellsalign : 'left',align : 'center',sortable :false,editable : false},
			{'text' : 'Stone Pcs','datafield' : 'pieces','width' : '15%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Stone Wt.','datafield' : 'stoneWt','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd3'}, 
		]
	});
}

$("#accDetails").click(function () {
	var orderIdArray;
	var orderIdArray= selectedCheckBox();
	var orderID;
	var orderID = orderIdArray.join(",");
	var params = {"fieldFilters":{"ids":orderID}}
	postJSON('/OrderExecution/api/v1/searchMaterialReturnStoneAccDetails?materialType=A',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.list;
			stockOrderAccGrid(data);
			$('#jqxgridAcc').show();
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});

var stockOrderAccGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'accSlNo','type' : 'int','map':'orderSrlNo'},
			{'name' : 'segment','type' : 'string','map' : 'segment>description'},
			{'name' : 'category','type' : 'string','map':'category>description'}, 
			{'name' : 'subcategory','type' : 'string','map' : 'subCategory>description'},
			{'name' : 'accWt','type' : 'float','map' : 'accessoryWt'},
			{'name' : 'accPcs','type' : 'int','map' : 'pieces'},
			{'name' : 'id','type' : 'int','map' : 'id'},
		]};
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		sortable : true,
		columnsresize : true,
		
		columns : [
			{'text' : 'MR No','datafield' : 'id','width' : '10%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Acc Sl No','datafield' : 'accSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Segment','datafield' : 'segment','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Category','datafield' : 'category','width' : '20%',cellsalign : 'left',align : 'center',sortable : false,editable : false},
			{'text' : 'Sub Category','datafield' : 'subcategory','width' : '30%',cellsalign : 'left',align : 'center',sortable :false,editable : false},
			{'text' : 'Acc Pcs','datafield' : 'accPcs','width' : '10%',cellsalign : 'right',align : 'center',sortable :false,editable : false},
			{'text' : 'Acc Wt.','datafield' : 'accWt','width' : '10%',cellsalign : 'center',align : 'center','cellsformat' : 'd3',sortable : false,editable : false}, 
		]
	});
}



$("#clearST").on('click',function(){
	$("#gridTabs").hide();
});
$("#clearCO").on('click',function(){
	$("#gridTabsCo").hide();
});

//##################################################### Consignment Order Search Stared  ###############################################
$(".tabDisabledC").addClass("tabDisabled1");
$("#gridTabsCo").tabs({
	disabled:[]
});

$("#searchCO").on('click',function(){
	if($("#fromDateCoS").val() == "" || $("#toDateCoS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatrory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	activaTab('tabFgdefaultCO');
	$("#gridTabsCo").show();
	postJSON('/OrderExecution/api/v1/searchMaterialReturn',JSON.stringify(consignmentOrderFilters()),function(response) {
		if(response.resCode == 1){
			var list  = response.payload.list;
			consignmentOrderSearch(list);
			$("#jqxgridF").show();
		}
	});
	
});

var consignmentOrderFilters = function() {
	var fromDateCoS = $("#fromDateCoS").val();
	var toDateCoS = $("#toDateCoS").val();
	var orderNoCoS = $("#orderNoCoS").val();
	var orderSlNoCoS = $("#orderSlNoCoS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	fieldFilters.fieldFilters["orderType"] = "CO" ;
	
	if (fromDateCoS != "" && fromDateCoS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateCoS;
	}
	if (toDateCoS != "" && toDateCoS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateCoS;
	}
	if (orderNoCoS != "" && orderNoCoS != null) {
		fieldFilters.fieldFilters["orderId"] = orderNoCoS;
	}
	if (orderSlNoCoS != "" && orderSlNoCoS != null) {
		fieldFilters.fieldFilters["orderSrlNo"] = orderSlNoCoS;
	}
	return fieldFilters;

}



var consignmentOrderSearch = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'orderNo','type' : 'int','map':'orderId'},
			{'name' : 'orderSlNo','type' : 'int','map' : 'orderSrlNo'},
			{'name' : 'refStockNo','type' : 'int','map':'stockNo'}, 
			{'name' : 'ordKind','type' : 'string','map' : 'orderKind'},
			{'name' : 'segment','type' : 'string','map' : 'segment>description'},
			{'name' : 'metalType','type' : 'string','map' : 'metalSegment>description'},
			{'name' : 'subCatDesc','type' : 'string','map' : 'subCategory'},
			{'name' : 'purity','type' : 'float','map' : 'skinPurity'},
			{'name' : 'pcs','type' : 'int','map' : 'pieces'},
			{'name' : 'preGwt','type' : 'float','map' : 'preRepairGrossWt'}, 
			{'name' : 'preNwt','type' : 'float','map' : 'preRepairNetWt'},
			{'name' : 'finGwt','type' : 'float','map' : 'grossWt'}, 
			{'name' : 'finNwt','type' : 'float','map' : 'netWt'},
			{'name' : 'id','type' : 'int','map' : 'id'},
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridF").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		
		columns : [
			{'text' : '','datafield' : '',cellsalign : 'center',columntype : 'checkbox',align : 'center','width' : '4%',sortable : false},
			{'text' : 'Order No','datafield' : 'orderNo','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Order Sl No','datafield' : 'orderSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Ref Stock No ','datafield' : 'refStockNo','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Order Kind','datafield' : 'ordKind','width' : '15%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Segment','datafield' : 'segment','width' : '7%',cellsalign : 'center',align : 'center','cellsformat' : 'd2',sortable :false,editable : false},
			{'text' : 'Metal Type','datafield' : 'metalType','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'SubCat Desc','datafield' : 'subCatDesc','width' : '20%',cellsalign : 'left',align : 'center',sortable : false,editable : false},
			{'text' : 'Purity','datafield' : 'purity','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,cellsformat : 'd2',editable : false},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			/*{'text' : 'Pre-Repair G Wt.','datafield' : 'preGwt','width' : '10%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Pre-Repair N Wt.','datafield' : 'preNwt','width' : '10%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false,editable : false},*/
			{'text' : 'Gross Wt.','datafield' : 'finGwt','width' : '10%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable :false,editable : false},
			{'text' : 'Net Wt.','datafield' : 'finNwt','width' : '10%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : '','datafield' : 'id','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false,hidden : true},
		]
	});
}

var consignmentArry = [];
$("#jqxgridF").bind('cellendedit', function (event,index) {
	var i =event.args.rowindex;
	    if (event.args.value) {
	      $("#jqxgridF").jqxGrid('selectrow', event.args.row);
	      consignmentArry.push(i);
	       $(".tabDisabledC").removeClass("tabDisabled1");
	   	    }
	    else {
	        $("#jqxgridF").jqxGrid('unselectrow', event.args.row);
	        var delArr = consignmentArry.splice(i,1);
	    }
	    if($("#jqxgridF").jqxGrid("getselectedrowindexes") <= 0)
		{
	    	$(".tabDisabledC").addClass("tabDisabled1");
		}
	    $.each(consignmentArry, function(key, val) {
	    		var data =$("#jqxgridF").jqxGrid('getrowdata',val);
	    });
});




function selectedCheckBoxCO(){
	var consignmentArr = [];
	var fgData =  $("#jqxgridF").jqxGrid("getselectedrowindexes");
		$.each(fgData, function(key, val) {
			consignmentArr.push(val.id);
		});
	return consignmentArr;
}

$("#stoneDetailsC").click(function () {
	var orderIdArray;
	var orderIdArray= selectedCheckBoxCO();
	var orderID;
	var orderID = orderIdArray.join(",");
	var params = {"fieldFilters":{"ids":orderID}}
	postJSON('/OrderExecution/api/v1/searchMaterialReturnStoneAccDetails?materialType=S',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.list;
			consignmentOrderStoneGrid(data);
			$('#jqxgridS').show();
		}else{
			consignmentOrderStoneGrid();
			$('#jqxgridS').show();
		}
	});
});


var consignmentOrderStoneGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stoneSlNo','type' : 'int','map':'orderSrlNo'},
			{'name' : 'segId','type' : 'int','map' : 'segment>description'},
			{'name' : 'catId','type' : 'int','map':'category>description'}, 
			{'name' : 'subCatDesc','type' : 'string','map' : 'subCategoryDesc'},
			{'name' : 'stoneWt','type' : 'float'},
			{'name' : 'pieces','type' : 'int'},
			
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridS").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		
		columns : [
			{'text' : 'Stone Sl No','datafield' : 'stoneSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Segment','datafield' : 'segId','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Category','datafield' : 'catId','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'SubCat Desc','datafield' : 'subCatDesc','width' : '30%',cellsalign : 'left',align : 'center',sortable :false,editable : false},
			{'text' : 'Stone Pcs','datafield' : 'pieces','width' : '15%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Stone Wt.','datafield' : 'stoneWt','width' : '15%',cellsalign : 'center',align : 'center','cellsformat' : 'd3',sortable : false,editable : false}, 
			
		]
	});
}

$("#accDetailsC").click(function () {
	var orderIdArray;
	var orderIdArray= selectedCheckBoxCO();
	var orderID;
	var orderID = orderIdArray.join(",");
	var params = {"fieldFilters":{"ids":orderID}}
	postJSON('/OrderExecution/api/v1/searchMaterialReturnStoneAccDetails?materialType=A',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.list;
			consignmentOrderAccGrid(data);
			$('#jqxgridA').show();
		}else{
			consignmentOrderAccGrid();
			$('#jqxgridA').show();
		}
	});
});


var consignmentOrderAccGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'accSlNo','type' : 'int','map':'orderSrlNo'},
			{'name' : 'segment','type' : 'string','map' : 'segment>description'},
			{'name' : 'category','type' : 'float','map':'category>description'}, 
			{'name' : 'subcategory','type' : 'int','map' : 'subCategoryDesc'},
			{'name' : 'accWt','type' : 'float','map':'accessoryWt'},
			{'name' : 'accPcs','type' : 'int','map':'pieces'},
		]};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridA").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		theme: 'energyblue',
		columnsheight : 85,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		
		columns : [
			{'text' : 'Acc Sl No','datafield' : 'accSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Category','datafield' : 'category','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Sub Category','datafield' : 'subcategory','width' : '30%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Acc Pcs','datafield' : 'accPcs','width' : '15%',cellsalign : 'right',align : 'center',sortable :false,editable : false},
			{'text' : 'Acc Wt.','datafield' : 'accWt','width' : '15%',cellsalign : 'center',align : 'center','cellsformat' : 'd3',sortable : false,editable : false}, 
		]
	});
}



