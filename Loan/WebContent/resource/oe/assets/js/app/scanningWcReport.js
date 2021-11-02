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

$("#scanning").hide();
$("#weightCheck").hide();
$('input[name=scanningWc]:radio').on('click', function() {
	var selectedVal = $(this).val();

	if (selectedVal == "scanningWc") {
		$("#scanning").show();
		$("#weightCheck").hide();

		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');

	} else if (selectedVal == "Wc") {
		$("#weightCheck").show();
		$("#scanning").hide();

		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');

	}
});

//date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
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
});


$("#segHide").hide();
$("#catHide").hide();
$("#matTypeS").on('change',function(){
	var matType = $("#matTypeS").val();
		if(matType == "LS"){
			$("#segHide").show();
			$("#catHide").show();
			$("#jewlHide").hide();
		}
		else if(matType == "FG")
		{	
			$("#jewlHide").show();
			$("#segHide").hide();
			$("#catHide").hide();
			
		}
});

var scanningFgGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'date', type : 'string','map' : ''}, 
			{name : 'createdDate', type : 'string','map' : ''},
			{name: 'stockCheckId', type: 'int','map':''},
			{name: 'stockCheckSrlNo', type: 'int','map':''},
			{name : 'matType', type : 'string','map':''},
			{name : 'jewelType', type : 'string','map' : ''},
			{name : 'artSeg', type : 'string','map': ''},
			{name : 'stockNo', type : 'int','map' : ''},
			{name : 'grossWt', type : 'float','map': ''},
			{name : 'netWt', type : 'float','map' : ''},
			{name : 'pcs', type : 'int','map' :''},
			{name : 'zoneId', type : 'string','map' :''},
			{name : 'subCatDesc', type : 'string','map' : ''},
			{name : 'status', type : 'string','map':''},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		columnsheight : 65,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		
		columns : [ 
			{ text : 'Date', datafield : 'date', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Created Date', datafield : 'createdDate', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock Check Id', datafield : 'stockCheckId', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock Check Srl No', datafield : 'stockCheckSrlNo', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Material Type', datafield : 'matType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Jewel Type', datafield : 'jewelType', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Article Segment', datafield : 'artSeg', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock No', datafield : 'stockNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gross Wt', datafield : 'grossWt', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Net Wt', datafield : 'netWt', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pcs', datafield : 'pcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Zone Id', datafield : 'zoneId', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Status', datafield : 'status', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
		]
	});
}


var scanningLooseStoneGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'date', type : 'string','map' : ''}, 
			{name : 'createdDate', type : 'string','map' : ''},
			{name: 'stockCheckId', type: 'int','map':''},
			{name: 'stockCheckSrlNo', type: 'int','map':''},
			{name : 'matType', type : 'string','map':''},
			{name : 'metalSeg', type : 'string','map' : ''},
			{name : 'category', type : 'string','map': ''},
			{name : 'stockNo', type : 'int','map' : ''},
			{name : 'grossWt', type : 'float','map': ''},
			{name : 'netWt', type : 'float','map' : ''},
			{name : 'pcs', type : 'int','map' :''},
			{name : 'zoneId', type : 'string','map' :''},
			{name : 'subCatDesc', type : 'string','map' : ''},
			{name : 'status', type : 'string','map':''},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		columnsheight : 65,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		
		columns : [ 
			{ text : 'Date', datafield : 'date', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Created Date', datafield : 'createdDate', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock Check Id', datafield : 'stockCheckId', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock Check Srl No', datafield : 'stockCheckSrlNo', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Material Type', datafield : 'matType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Segment', datafield : 'metalSeg', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Category', datafield : 'category', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock No', datafield : 'stockNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gross Wt', datafield : 'grossWt', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Net Wt', datafield : 'netWt', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pcs', datafield : 'pcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Zone Id', datafield : 'zoneId', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Status', datafield : 'status', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
		]
	});
}

$("#searchSc").on('click',function(){
	if($("#matTypeS").val() == "FG"){
		scanningFgGrid();
		$("#jqxgrid").show();
	}
	if($("#matTypeS").val() == "LS"){
		scanningLooseStoneGrid();
		$("#jqxgrid").show();
	}
	
});

//################################ Weight Check Started ######################################
//date picker functions
$("#fromDateW").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateW").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateW").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});

$("#segHideW").hide();
$("#catHideW").hide();
$("#matTypeW").on('change',function(){
	var matType = $("#matTypeW").val();
	if(matType == "LS"){
		$("#segHideW").show();
		$("#catHideW").show();
		$("#jewlHideW").hide();
	}
	else if(matType == "FG")
	{	
		$("#jewlHideW").show();
		$("#segHideW").hide();
		$("#catHideW").hide();
		
	}
});

var weightCheckFgGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'date', type : 'string','map' : ''}, 
			{name : 'createdDate', type : 'string','map' : ''},
			{name: 'stockCheckId', type: 'int','map':''},
			{name: 'stockCheckSrlNo', type: 'int','map':''},
			{name : 'matType', type : 'string','map':''},
			{name : 'jewelType', type : 'string','map' : ''},
			{name : 'artSeg', type : 'string','map': ''},
			{name : 'stockNo', type : 'int','map' : ''},
			{name : 'grossWt', type : 'float','map': ''},
			{name : 'netWt', type : 'float','map' : ''},
			{name : 'pcs', type : 'int','map' :''},
			{name : 'zoneId', type : 'string','map' :''},
			{name : 'subCatDesc', type : 'string','map' : ''},
			{name : 'status', type : 'string','map':''},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		columnsheight : 65,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		
		columns : [ 
			{ text : 'Date', datafield : 'date', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Created Date', datafield : 'createdDate', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock Check Id', datafield : 'stockCheckId', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock Check Srl No', datafield : 'stockCheckSrlNo', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Material Type', datafield : 'matType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Jewel Type', datafield : 'jewelType', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Article Segment', datafield : 'artSeg', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock No', datafield : 'stockNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gross Wt', datafield : 'grossWt', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Net Wt', datafield : 'netWt', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pcs', datafield : 'pcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Zone Id', datafield : 'zoneId', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Status', datafield : 'status', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
		]
	});
}


var weightCheckLooseStoneGrid = function(data) {
	var source = {
		datafields : [ 
			{name : 'date', type : 'string','map' : ''}, 
			{name : 'createdDate', type : 'string','map' : ''},
			{name: 'stockCheckId', type: 'int','map':''},
			{name: 'stockCheckSrlNo', type: 'int','map':''},
			{name : 'matType', type : 'string','map':''},
			{name : 'metalSeg', type : 'string','map' : ''},
			{name : 'category', type : 'string','map': ''},
			{name : 'stockNo', type : 'int','map' : ''},
			{name : 'grossWt', type : 'float','map': ''},
			{name : 'netWt', type : 'float','map' : ''},
			{name : 'pcs', type : 'int','map' :''},
			{name : 'zoneId', type : 'string','map' :''},
			{name : 'subCatDesc', type : 'string','map' : ''},
			{name : 'status', type : 'string','map':''},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : false,
		columnsheight : 65,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		columns : [ 
			{ text : 'Date', datafield : 'date', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Created Date', datafield : 'createdDate', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock Check Id', datafield : 'stockCheckId', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock Check Srl No', datafield : 'stockCheckSrlNo', width : '9%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Material Type', datafield : 'matType', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Metal Segment', datafield : 'metalSeg', width : '8%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Category', datafield : 'category', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Stock No', datafield : 'stockNo', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Gross Wt', datafield : 'grossWt', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Net Wt', datafield : 'netWt', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Pcs', datafield : 'pcs', width : '5%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Zone Id', datafield : 'zoneId', width : '7%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Sub Cat Desc', datafield : 'subCatDesc', width : '10%', cellsalign : 'center', align : 'center', editable : false, sortable : false},
			{ text : 'Status', datafield : 'status', width : '6%', cellsalign : 'center', align : 'center', editable : false, sortable : false ,cellsformat : 'd2'},
		]
	});
}

$("#searchWc").on('click',function(){
	if($("#matTypeW").val() == "FG"){
		weightCheckFgGrid();
		$("#jqxgrid").show();
	}
	if($("#matTypeW").val() == "LS"){
		weightCheckLooseStoneGrid();
		$("#jqxgrid").show();
	}
});
