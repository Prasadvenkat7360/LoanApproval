/*<!-- 
	##	Author1 (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Shreevardhan T L 
	##	Date Creation 	: 	05-09-2017
	## 	Description		:	Create, Search and Export Functionality
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

$("#orderFromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate :0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#orderToDateS").datepicker('option', 'minDate', min || '0');
    }
});

$("#orderToDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate :0,
});

$("#orderFromDateC").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate :0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#orderToDateC").datepicker('option', 'minDate', min || '0');
    }
});

$("#orderToDateC").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});
// ################################################ On-Load LOV'S ###############################

var onLoadFunction = function(){
$('#metalSegmentS').empty().append('<option value="" selected>--Select--</option>');
$('#vendorCodeS').empty().append('<option value="" selected>--Select--</option>');
	 $.getJSON("/OrderExecution/api/v1/provisionalToActulLOVs",function(data){
	 $.each(data.payload.segments,function(key,val){
	    	$("#metalSegmentS").append('<option value="'+val.id+'">'+val.description+'</option>');
	    })
	    var vendorList = (data.payload.vendors);
	    var data = [];
		$.each(vendorList, function(key, value) {
			data.push({
				value : value.id,
				label : value.description
			});
		});

		$(function() {
			$("#vendorCodeS").autocomplete({
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
   })
}
onLoadFunction();


//####################################### Search GRid Loading ########################################	
$("#tabGrDet").hide();

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	var target = $(e.target).attr("href") // activated tab
	$(".tabjqgrid").prop("id", "");
	$(target).find(".tabjqgrid").prop("id", "jqxgrid");
	$("#jqxgrid").jqxGrid('clear');
	if(target == "#tabStone")
		grFgStoneGrid();
	else if(target == "#grDetails")
		grFgGrDetailsGrid();
	else if(target == "#tabAccessories")
		grFgGrAccGrid();
	$("#jqxgrid").show();
});

$("#Search").on('click', function() {
	
	var orderFromDateS = $("#orderFromDateS").val();
	var orderToDateS = $("#orderToDateS").val();
	var statusS = $("#statusS").val();// || statusS == null || statusS == "" 
	
		if(orderFromDateS == null || orderFromDateS == "" ||orderToDateS == null || orderToDateS == "" ){
			$.growl.error({
				message : "Please Fill all the mandatory fields!!.",
				duration : 10000
			});
			return false;
	}else{
			$("#tabGrDet").show();
			var target=$(".tab-content .active").prop("id");
			if(target == "tabStone")
				grFgStoneGrid();
			else if(target == "grDetails")
				grFgGrDetailsGrid();
			else if(target == "tabAccessories")
				grFgGrAccGrid();
			$("#jqxgrid").show();
			return false;
	}
});


$(function() {
	$("#removeAll").on('click', function() {
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	});

	$("#clearAll").on('click', function() {
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
		$('#provToActual').trigger("reset");
		$("#tabGrDet").hide();
	});
});

//####################################### Search/create GRid Loading ########################################	
$("#tabProAct").hide();

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	var target = $(e.target).attr("href") // activated tab
	$(".tabjqgrid").prop("id", "");
	$(target).find(".tabjqgrid").prop("id", "jqxgrid");
	$("#jqxgrid").jqxGrid('clear');
	if(target == "#tabStoneC")
		grFgGrDetailsGridStoneCreate();
	else if(target == "#grDetailsC")
		grFgStoneGridGRCreate();
	else if(target == "#tabAccessoriesC")
		grFgGrAccGridAccCreate();
	$("#jqxgrid").show();
});

$("#SearchC").on('click', function() {
	$("#tabProAct").show();
	var target=$(".tab-content .active").prop("id");
	if(target == "tabStoneC")
		grFgGrDetailsGridStoneCreate();
	else if(target == "grDetailsC")
		grFgStoneGridGRCreate();
	else if(target == "tabAccessoriesC")
		grFgGrAccGridAccCreate();
	$("#jqxgrid").show();
	return false;
});
// ############################# FeildFilters ########################################
function grFgFilterValues() {

	var fromDate = $('#orderFromDateS').val();
	var toDate = $('#orderToDateS').val();
	var segment = $('#metalSegmentS').val();
	var vendorCode = $('#vendorCodeS').val();
	var grNo = $("#grNoS").val();
	var psrNo = $('#psrNoS').val();
	var statusS = $('#statusS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segment"] = segment;
	}
	if (grNo != "" && grNo != null) {
		fieldFilters.fieldFilters["grId"] = grNo;
	}
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendor"] = $('#vendorCode-value').val();
	}
	if (psrNo != "" && psrNo != null) {
		fieldFilters.fieldFilters["psrNo"] = psrNo;
	}
	/*if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["psrNo"] = statusS;
	}*/
	return fieldFilters;
}

// ################################################ GR Detail Search Grid ######################################

function grFgGrDetailsGrid() {
	
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'createdDate','type' : 'string'},
		{'name' : 'vendorCode','type' : 'string','map': 'vendorCode>name'},
		{'name' : 'grNumber','type' : 'int'}, 
		{'name' : 'grSerialNumber','type' : 'int'},
		{'name' : 'psrNumber','type' : 'int'},
		{'name' : 'articleCode','type' : 'string'}, 
		{'name' : 'jewelType','type' : 'string'},
		{'name' : 'mainCategory','type' : 'string'},
		{'name' : 'subCategory','type' : 'string'}, 
		{'name' : 'pieces','type' : 'string'},
		{'name' : 'grossWt','type' : 'float'},
		{'name' : 'netWt','type' : 'float'}, 
		{'name' : 'wastageAsPerMaster','type' : 'string'},
		{'name' : 'wastageAsPerGr','type' : 'string'},
		{'name' : 'labourAsPerMaster','type' : 'string'}, 
		{'name' : 'labourAsPerGr','type' : 'string'},
		{'name' : 'photo','type' : 'string'},
		{'name' : 'provisionalOrActual','type' : 'string'},
		{'name' : 'grDoneBy','type' : 'string'}, 
		{'name' : 'remarks','type' : 'string'},
		{'name' : 'status','type' : 'string', 'map':'status>name'},
		{'name' : 'viewDesign','type' : 'array'}
		
		];

	var columns = [
		{'text' : 'Date ','datafield' : 'createdDate','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'GR No','datafield' : 'grNumber','width' : '3%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Sl No','datafield' : 'grSerialNumber','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'PSR No','datafield' : 'psrNumber','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Article Code',	'datafield' : 'articleCode','width' : '5%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
		{'text' : 'Jewel Type','datafield' : 'jewelType',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '4%'},
		
		{'text' : 'Main Cat ','datafield' : 'mainCategory','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Sub Cat','datafield' : 'subCategory','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Pcs','datafield' : 'pieces','width' : '3%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Gross Wt','datafield' : 'grossWt','width' : '3.5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'Net Wt','datafield' : 'netWt','width' : '3.5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'Wastage as per Master',	'datafield' : 'wastageAsPerMaster','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center',cellsformat : 'd3'},
		{'text' : 'Wastage as Per GR','datafield' : 'wastageAsPerGr',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%',cellsformat : 'd3'},
		
		
		{'text' : 'Labour as Per Master ','datafield' : 'labourAsPerMaster','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		{'text' : 'Labour as per GR','datafield' : 'labourAsPerGr','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false,cellsformat : 'd2'},
		{'text' : 'Prov/Actual','datafield' : 'provisionalOrActual','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'View Design','datafield' : 'photo','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsrenderer : orderItemDesignRenderer},
		{'text' : 'Gr Done by','datafield' : 'grDoneBy','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Remarks',	'datafield' : 'remarks','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
		{'text' : 'Status','datafield' : 'status',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '4%'}
		];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchProToActForGrDetails", "proToActualGrDetails",columns, grFgFilterValues(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
		columnsheight: 80,
        sortable: false,            
	   	altrows: true,
	  	columnsresize: true, 
		rowsheight : 35,
		pagesize : 18,
		columnsheight: 80,
		rowdetails : true,
		virtualmode : true	
	});
}

// ################################################## Stone Search Grid ###########################################

function grFgStoneGrid() {
	
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'createdDate','type' : 'string'},
		{'name' : 'vendorCode','type' : 'string','map': 'vendorCode>name'},
		{'name' : 'grNumber','type' : 'int'}, 
		{'name' : 'grSerialNumber','type' : 'int'},
		{'name' : 'stoneAccSrlNo','type' : 'int'},
		{'name' : 'psrNumber','type' : 'int'},
		{'name' : 'stoneAccCode','type' : 'string'}, 
		{'name' : 'suppliedBy','type' : 'string','map': 'suppliedBy>name'},
		{'name' : 'subCategory','type' : 'string'}, 
		{'name' : 'usedPcs','type' : 'string'},
		{'name' : 'usedWt','type' : 'float'},
		{'name' : 'rateAsPerMaster','type' : 'float'}, 
		{'name' : 'rateAsPerGr','type' : 'string'},
		{'name' : 'costAsPerMaster','type' : 'string'},
		{'name' : 'costAsPerGr','type' : 'string'}, 
		{'name' : 'provisionalOrActual','type' : 'string'},
		{'name' : 'grDoneBy','type' : 'string'},
		{'name' : 'remarks','type' : 'string'},
		{'name' : 'uom','type' : 'string','map': 'uom>name'}, 
		];

	var columns = [
		{'text' : 'Date ','datafield' : 'createdDate','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'GR No','datafield' : 'grNumber','width' : '3%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'GR Sl.No','datafield' : 'grSerialNumber','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stone Sl.No','datafield' : 'stoneAccSrlNo','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'PSR No','datafield' : 'psrNumber','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stone Supp By','datafield' : 'suppliedBy','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Stone Code',	'datafield' : 'stoneAccCode','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
		
		{'text' : 'Sub Cat','datafield' : 'subCategory','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Stone Pcs Used','datafield' : 'usedPcs','width' : '5%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Stone Wt Used','datafield' : 'usedWt','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'UQC','datafield' : 'uom','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'Stone Rate as per Master',	'datafield' : 'rateAsPerMaster','width' : '7%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center',cellsformat : 'd2'},
		{'text' : 'Stone Rate as Per GR','datafield' : 'rateAsPerGr',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%',cellsformat : 'd2'},
		
		
		{'text' : 'Stone cost as Per Master ','datafield' : 'costAsPerMaster','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		{'text' : 'Stone cost as per GR','datafield' : 'costAsPerGr','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false,cellsformat : 'd2'},
		{'text' : 'Prov/Actual','datafield' : 'provisionalOrActual','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Gr Done by','datafield' : 'grDoneBy','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Remarks',	'datafield' : 'remarks','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchProToActForGrStones", "proToActualStones",columns, grFgFilterValues(), updateRows, "");
	
	$("#jqxgrid").jqxGrid({	
		width : '100%',
		columnsheight: 80,
        sortable: false,            
	   	altrows: true,
	  	columnsresize: true, 
		rowsheight : 35,
		pagesize : 18,
		rowdetails : true,
		virtualmode : true	
	});
}
// ###################################################### Accessory Grid #########################################

function grFgGrAccGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'createdDate','type' : 'string'},
		{'name' : 'vendorCode','type' : 'string','map': 'vendorCode>name'},
		{'name' : 'grNumber','type' : 'int'}, 
		{'name' : 'grSerialNumber','type' : 'int'},
		{'name' : 'stoneAccSrlNo','type' : 'int'},
		{'name' : 'psrNumber','type' : 'int'},
		{'name' : 'stoneAccCode','type' : 'string'}, 
		{'name' : 'suppliedBy','type' : 'string','map': 'suppliedBy>name'},
		{'name' : 'subCategory','type' : 'string'}, 
		{'name' : 'usedPcs','type' : 'string'},
		{'name' : 'usedWt','type' : 'float'},
		{'name' : 'rateAsPerMaster','type' : 'float'}, 
		{'name' : 'rateAsPerGr','type' : 'string'},
		{'name' : 'costAsPerMaster','type' : 'string'},
		{'name' : 'costAsPerGr','type' : 'string'}, 
		{'name' : 'provisionalOrActual','type' : 'string'},
		{'name' : 'grDoneBy','type' : 'string'},
		{'name' : 'remarks','type' : 'string'},
		{'name' : 'uom','type' : 'string','map': 'uom>name'}, 
		];

	var columns = [
		{'text' : 'Date ','datafield' : 'createdDate','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'GR No','datafield' : 'grNumber','width' : '3%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'GR Sl.No','datafield' : 'grSerialNumber','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Acc Sl.No','datafield' : 'stoneAccSrlNo','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'PSR No','datafield' : 'psrNumber','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Acc Supp By','datafield' : 'suppliedBy','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Acc Code',	'datafield' : 'stoneAccCode','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
		
		{'text' : 'Sub Cat','datafield' : 'subCategory','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Acc Pcs Used','datafield' : 'usedPcs','width' : '5%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Acc Wt Used','datafield' : 'usedWt','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'UQC','datafield' : 'uom','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'Acc Rate as per Master',	'datafield' : 'rateAsPerMaster','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center',cellsformat : 'd2'},
		{'text' : 'Acc Rate as Per GR','datafield' : 'rateAsPerGr',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%',cellsformat : 'd2'},
		
		
		{'text' : 'Acc cost as Per Master ','datafield' : 'costAsPerMaster','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		{'text' : 'Acc cost as per GR','datafield' : 'costAsPerGr','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false,cellsformat : 'd2'},
		{'text' : 'Prov/Actual','datafield' : 'provisionalOrActual','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Gr Done by','datafield' : 'grDoneBy','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Remarks',	'datafield' : 'remarks','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
		];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchProToActForGrAccessory", "proToActualAccessory",columns, grFgFilterValues(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
		columnsheight: 80,
        sortable: false,            
	   	altrows: true,
	  	columnsresize: true, 
		rowsheight : 35,
		pagesize : 18,
		rowdetails : true,
		virtualmode : true	
	});
}

//############################################### fieldFilters For Search/ Create Pro-Actual  #######################################
function grFgFilterValuesCreateSearch() {

	var fromDate = $('#orderFromDateC').val();
	var toDate = $('#orderToDateC').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	return fieldFilters;
}

var viewDesignDetails = function(row){
	var viewDesign = $('#jqxgrid').jqxGrid('getcellvalue', row, 'viewDesign');
	var viewDesignList = [];
	 viewDesignList = viewDesign.list;
	$('#pagination-demo').twbsPagination({
	    totalPages: viewDesign.size,
	    visiblePages: "5",
	    onPageClick: function (event, page) {
	    		$.each(viewDesignList, function(k, v){
	    			if((page-1) == k){
	    				console.log(v);
	    				var img =  "<a href='/uf/"+v.id+"' target='_blank'><img src='/uf/"+v.id+"' height='60%' width ='60%' /></a>";
	    				$('#page-content').html(img);
	    			}
	    		});
	    }
	});
}

var orderItemDesignRenderer = function(row, column, value) {
	var viewDesign = $('#jqxgrid').jqxGrid('getcellvalue', row, 'viewDesign');
	console.log(viewDesign);
	if(viewDesign == null){
		return '<div class="text-center"><button style="margin-top: 3px;" class="btn btn-sm btn-primary" disabled data-toggle="modal" type="button" /><i class="fa fa-eye fa-lg"></i></button></div>';
	}else{
		return '<div class="text-center"><a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#designViewGR" type="button" onclick="viewDesignDetails('
			+ row	+ ')"/><span class="fa fa-eye"></span> </a></div>';		
	}
		
}
// ############################################### Create GR #######################################
function grFgStoneGridGRCreate() {
	
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'createdDate','type' : 'string'},
		{'name' : 'vendorCode','type' : 'string','map': 'vendorCode>name'},
		{'name' : 'grNumber','type' : 'int'}, 
		{'name' : 'grSerialNumber','type' : 'int'},
		{'name' : 'psrNumber','type' : 'int'},
		{'name' : 'articleCode','type' : 'string'}, 
		{'name' : 'jewelType','type' : 'string'},
		{'name' : 'mainCategory','type' : 'string'},
		{'name' : 'subCategory','type' : 'string'}, 
		{'name' : 'pieces','type' : 'string'},
		{'name' : 'grossWt','type' : 'float'},
		{'name' : 'netWt','type' : 'float'}, 
		{'name' : 'wastageAsPerMaster','type' : 'float'},
		{'name' : 'wastageAsPerGr','type' : 'float'},
		{'name' : 'labourAsPerMaster','type' : 'float'}, 
		{'name' : 'labourAsPerGr','type' : 'float'},
		{'name' : 'photo','type' : 'string'},
		{'name' : 'checkBox','type' : 'bool'},
		{'name' : 'grDoneBy','type' : 'string'}, 
		{'name' : 'remarks','type' : 'string'},
		{'name' : 'wastageAsPerGrE','type' : 'float','map':'wastageAsPerGr'},
		{'name' : 'labourAsPerGrE','type' : 'float','map':'labourAsPerGr'},
		{'name' : 'status','type' : 'string', 'map':'status>name'},
		{'name' : 'viewDesign','type' : 'array'}
		];

	var columns = [
		{'text' : 'Date ','datafield' : 'createdDate','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'GR No','datafield' : 'grNumber','width' : '3%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Sl. No','datafield' : 'grSerialNumber','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'PSR No','datafield' : 'psrNumber','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Article Code',	'datafield' : 'articleCode','width' : '5%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
		{'text' : 'Jewel Type','datafield' : 'jewelType',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '5%'},
		
		{'text' : 'Main Cat','datafield' : 'mainCategory','width' : '4.5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Sub Cat','datafield' : 'subCategory','width' : '4.5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Pcs','datafield' : 'pieces','width' : '3%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Gross Wt','datafield' : 'grossWt','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'Net Wt','datafield' : 'netWt','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'Wastage as per Master',	'datafield' : 'wastageAsPerMaster','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center',cellsformat : 'd3'},
		
		{'text' : '','datafield' : 'wastageAsPerGrE','width' : '6%',sortable : false,editable : true,cellsalign : 'center',align : 'center', hidden:true},
		{'text' : 'Wastage as Per GR','datafield' : 'wastageAsPerGr',editable : true,cellsalign : 'center',	align : 'center',
			sortable : false,'width' : '6%',cellsformat : 'd3',
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				
				var rateAsMaster = $("#jqxgrid").jqxGrid('getcellvalue',row,'wastageAsPerMaster');
			    var rateAsPerGr = $("#jqxgrid").jqxGrid('getcellvalue',row,'wastageAsPerGrE');
				   
				if(newvalue > rateAsPerGr){
					$.growl.error({
						message : "do not input value more than that of GR value!!.",
						duration : 10000
					});
					return false;
				}
				
				
				if(newvalue < 0){
					$.growl.error({
						message : "Input Value Should Not be Less then  Zero!!.",
						duration : 10000
					});
					return false;
				}
				var rateAsMaster = $("#jqxgrid").jqxGrid('getcellvalue',row,'wastageAsPerMaster');
				   if(newvalue < rateAsMaster){
						$.growl.error({
							message : "Wastage as per GR Should be not be less then Wastage as per Master!!.",
							duration : 10000
						});
						return false;
				   }
			}
		},
		{'text' : '','datafield' : 'labourAsPerGrE','width' : '6%',sortable : false,editable : true,cellsalign : 'center',align : 'center', hidden:true},
		{'text' : 'Labour as Per Master ','datafield' : 'labourAsPerMaster','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		{'text' : 'Labour as per GR','datafield' : 'labourAsPerGr','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,
			editable : true,cellsformat : 'd2',
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				
				var rateAsMaster = $("#jqxgrid").jqxGrid('getcellvalue',row,'labourAsPerMaster');
			    var rateAsPerGr = $("#jqxgrid").jqxGrid('getcellvalue',row,'labourAsPerGrE');
				if(newvalue > rateAsPerGr){
					$.growl.error({
						message : "do not input value more than that of GR value!!.",
						duration : 10000
					});
					return false;
				}
				
				if(newvalue < 0){
					$.growl.error({
						message : "Input Value Should Not be Less then  Zero!!.",
						duration : 10000
					});
					return false;
				}
			   if(newvalue < rateAsMaster){
					$.growl.error({
						message : "Labour as per GR Should be not be less then Labour as per Master!!.",
						duration : 10000
					});
					return false;
			   }
			}
		},
		
		{'text' : 'View Design','datafield' : 'photo','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsrenderer : orderItemDesignRenderer},
		{'text' : 'CheckBox',	'datafield' : 'checkBox','width' : '4%',sortable : false,	editable : true,cellsalign : 'center',	align : 'center',
			columntype: 'checkbox',
			cellbeginedit : function (row, datafield, columntype) {
				var rows = $("#jqxgrid").jqxGrid('getrows');
				for(var i=0; i<rows.length; i++){
					if(row == rows[i].boundindex){
				var selectionStatus =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'checkBox');
				
				if(datafield == "checkBox" &&  selectionStatus == false){		
					return true;
				}else{
			    	return true;
			    }
					}}
			},
		},
		{'text' : 'Gr Done by','datafield' : 'grDoneBy','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Remarks',	'datafield' : 'remarks','width' : '6%',sortable : false,editable : true,cellsalign : 'center',	align : 'center'},
		{'text' : 'Status','datafield' : 'status',editable : true,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%',
			columntype : 'dropdownlist',displayfield : 'statusN',
			createeditor: function (row, cellvalue, editor) { 
				editor.on('click', function(event){
				var	vendorCode = [{
					   "id": "A",
				          "name": "Accepted",
				        },{
				        	 "id": "R",
					          "name": "Rejected",
				        }]
      		  		editor.jqxDropDownList({ source: vendorCode, displayMember: 'name', valueMember: 'id'});
				    });
				}
		}
		];

	showMyGrid(datafields, "/OrderExecution/api/v1/provisionalToActGrDetCreateSearch", "list",columns, grFgFilterValuesCreateSearch(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
		columnsheight: 80,
        sortable: false,            
	   	altrows: true,
	   //	pagesize : 18,
	  	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true	
	});
}
//############################################ Saving of GR Details #########################################
var saveRecordGRDet = function(data) {
	
	var rows = $('#jqxgrid').jqxGrid('getrows');

	if(data.length == 0){
		$.growl.error({
			message : "Please select atleast one row.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		for (var i = 0; i < data.length; i++) {		
			if(data[i].status.id == "" || data[i].status.id == null){
				$.growl.error({
					message : "Please Select the Status Feild",
					duration : 10000
				});
				return false;			
		    }  
			if(data[i].remarks == "" || data[i].remarks == null){
				$.growl.error({
					message : "Please Select the Remarks Feild",
					duration : 10000
				});
				return false;
		    }
		}
		return true;
	  }
}
$("#saveGRDetailsC").on("click",function(){

	var qcParamArray = [];
	var rows = $('#jqxgrid').jqxGrid('getrows');
	if(typeof rows != "undefined"){	
		 for (var i = 0; i < rows.length; i++) { 
		 var selectionStatus =  $('#jqxgrid').jqxGrid('getcellvalue', i, 'checkBox');
		if(selectionStatus == true){
			var updateGRDetails =
				  {
					 "grNumber": rows[i].grNumber,
					    "grSerialNumber": rows[i].grSerialNumber,
					    "remarks": rows[i].remarks,
					    "status": {
					      "id": rows[i].status
					    },
					    "wastageAsPerGr": rows[i].wastageAsPerGr,
					    "labourAsPerGr": rows[i].labourAsPerGr
				  }
			qcParamArray.push(updateGRDetails);
			checkVal = true;
		       }
		     }
	        }	 

if (saveRecordGRDet(qcParamArray)) {
	postJSON('/OrderExecution/api/v1/createProToActForGrDet',JSON.stringify(qcParamArray),function(data) {
		
		if (data.resCode == "1") {										
		$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
		});
		$('#tabProAct').modal('hide');
		$('#tabProAct').hide();
		$("#jqxgrid").jqxGrid('clear');
		} else {
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
		  }
	   });
	}
})

//################################################## Stone Search/create Grid ###########################################

function grFgGrDetailsGridStoneCreate() {
	
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'createdDate','type' : 'string'},
		{'name' : 'vendorCode','type' : 'string','map': 'vendorCode>name'},
		{'name' : 'grNumber','type' : 'int'}, 
		{'name' : 'grSerialNumber','type' : 'int'},
		{'name' : 'stoneAccSrlNo','type' : 'int'},
		{'name' : 'psrNumber','type' : 'int'},
		{'name' : 'stoneAccCode','type' : 'string'}, 
		{'name' : 'suppliedBy','type' : 'string','map': 'suppliedBy>name'},
		{'name' : 'subCategory','type' : 'string'}, 
		{'name' : 'usedPcs','type' : 'string'},
		{'name' : 'usedWt','type' : 'float'},
		{'name' : 'rateAsPerMaster','type' : 'float'}, 
		{'name' : 'rateAsPerGr','type' : 'float'},
		{'name' : 'costAsPerMaster','type' : 'float'},
		{'name' : 'costAsPerGr','type' : 'float'}, 
		{'name' : 'grDoneBy','type' : 'string'},
		{'name' : 'remarks','type' : 'string'},
		{'name' : 'checkBox','type' : 'bool'},
		{'name' : 'uom','type' : 'string','map': 'uom>name'}, 
		{'name' : 'status','type' : 'string', 'map':'status>name'},
		{'name' : 'rateAsPerGrE','type' : 'string', 'map':'rateAsPerGr'},
		{'name' : 'costAsPerGrE','type' : 'string', 'map':'costAsPerGr'}
		];

	var columns = [
		{'text' : 'Date ','datafield' : 'createdDate','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'GR No','datafield' : 'grNumber','width' : '3%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'GR Sl.No','datafield' : 'grSerialNumber','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stone Sl.No','datafield' : 'stoneAccSrlNo','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'PSR No','datafield' : 'psrNumber','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stone Supp By','datafield' : 'suppliedBy','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Stone Code',	'datafield' : 'stoneAccCode','width' : '5%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
		
		{'text' : 'Sub Cat','datafield' : 'subCategory','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Stone Pcs Used','datafield' : 'usedPcs','width' : '4%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Stone Wt Used','datafield' : 'usedWt','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'UQC','datafield' : 'uom','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'Stone Rate as per Master',	'datafield' : 'rateAsPerMaster','width' : '6.5%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center',cellsformat : 'd2'},
		
		{'text' : '','datafield' : 'rateAsPerGrE','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd2',hidden:true},
		{'text' : '','datafield' : 'costAsPerGrE','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd2',hidden:true},
		
		{'text' : 'Stone Rate as Per GR','datafield' : 'rateAsPerGr',editable : true,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6.5%',cellsformat : 'd2',
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				
				var rateAsMaster = $("#jqxgrid").jqxGrid('getcellvalue',row,'rateAsPerMaster');
			    var rateAsPerGr = $("#jqxgrid").jqxGrid('getcellvalue',row,'rateAsPerGrE');
			    var costAsPerGr = $("#jqxgrid").jqxGrid('getcellvalue',row,'costAsPerGr');
			    debugger;
				if(newvalue > rateAsPerGr){
					   $("#jqxgrid").jqxGrid('setcellvalue',row,'rateAsPerGr',oldvalue);
					   $("#jqxgrid").jqxGrid('setcellvalue',row,'costAsPerGr',costAsPerGr);
					$.growl.error({
						message : "Do not input value more than that of GR value!!.",
						duration : 10000
					});
					return false;
				}
				if(newvalue < 0){
					   $("#jqxgrid").jqxGrid('setcellvalue',row,'rateAsPerGr',oldvalue);
					   $("#jqxgrid").jqxGrid('setcellvalue',row,'costAsPerGr',costAsPerGr);
					$.growl.error({
						message : "Input Value Should Not be Less then  Zero!!.",
						duration : 10000
					});
					return false;
				}			
				var rateAsMaster = $("#jqxgrid").jqxGrid('getcellvalue',row,'rateAsPerMaster');
				   if(newvalue < rateAsMaster){
					   $("#jqxgrid").jqxGrid('setcellvalue',row,'rateAsPerGr',oldvalue);
					   $("#jqxgrid").jqxGrid('setcellvalue',row,'costAsPerGr',costAsPerGr);
						$.growl.error({
							message : "Rate as per GR Should be not be less then Rate as per Master!!.",
							duration : 10000
						});
						return false;
				   }
			     var uom = $("#jqxgrid").jqxGrid('getcellvalue',row,'uom');
			     var usedPcs = $("#jqxgrid").jqxGrid('getcellvalue',row,'usedPcs');
			     var usedWt = $("#jqxgrid").jqxGrid('getcellvalue',row,'usedWt');
			     var costAsPerGr = "";
			     if(uom == "Pcs"){
			    	 costAsPerGr = (usedPcs*newvalue).toFixed(2);
			    	 $("#jqxgrid").jqxGrid('setcellvalue',row,'costAsPerGr',costAsPerGr);
			     }else{
			    	 costAsPerGr = (usedWt*newvalue).toFixed(2);
			    	 $("#jqxgrid").jqxGrid('setcellvalue',row,'costAsPerGr',costAsPerGr);
			     }
			}
		},		
		{'text' : 'Stone cost as Per Master ','datafield' : 'costAsPerMaster','width' : '6.5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		{'text' : 'Stone cost as per GR','datafield' : 'costAsPerGr','width' : '6.5%',cellsalign : 'center',align : 'center',sortable : false,
			editable : false,cellsformat : 'd2',
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				   var rateAsMaster = $("#jqxgrid").jqxGrid('getcellvalue',row,'costAsPerMaster');
				   var rateAsPerGr = $("#jqxgrid").jqxGrid('getcellvalue',row,'costAsPerGrE');
				   
				if(newvalue > rateAsPerGr){
					$.growl.error({
						message : "do not input value more than that of GR value!!.",
						duration : 10000
					});
					return false;
				}
				if(newvalue < 0){
					$.growl.error({
						message : "Input Value Should Not be Less then  Zero!!.",
						duration : 10000
					});
					return false;
				}				var rateAsMaster = $("#jqxgrid").jqxGrid('getcellvalue',row,'costAsPerMaster');
				   if(newvalue < rateAsMaster){
						$.growl.error({
							message : "Cost as per GR Should be not be less then Cost as per Master!!.",
							duration : 10000
						});
						return false;
				   }
			}
		},		
		{'text' : 'CheckBox',	'datafield' : 'checkBox','width' : '4%',sortable : false,	editable : true,cellsalign : 'center',	align : 'center',
			columntype: 'checkbox',	
			cellbeginedit : function (row, datafield, columntype) {
				var rows = $("#jqxgrid").jqxGrid('getrows');
				for(var i=0; i<rows.length; i++){
					if(row == rows[i].boundindex){
				var selectionStatus =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'checkBox');
				
				if(datafield == "checkBox" &&  selectionStatus == false){		
					return true;
				}else{
			    	return true;
			    }
			}}
	    },
	    },
		{'text' : 'Gr Done by','datafield' : 'grDoneBy','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Remarks',	'datafield' : 'remarks','width' : '6%',sortable : false,	editable : true,cellsalign : 'center',	align : 'center'},
		{'text' : 'Status','datafield' : 'status',editable : true,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%',
			columntype : 'dropdownlist',displayfield : 'statusN',
			createeditor: function (row, cellvalue, editor) { 
				editor.on('click', function(event){
				var	vendorCode = [{
					   "id": "A",
				          "name": "Accepted",
				        },{
				        	 "id": "R",
					          "name": "Rejected",
				        }]
      		  		editor.jqxDropDownList({ source: vendorCode, displayMember: 'name', valueMember: 'id'});
				    });
				}
		}
		];
	showMyGrid(datafields, "/OrderExecution/api/v1/provisionalToActGrStoneCreateSearch", "list",columns, grFgFilterValuesCreateSearch(), updateRows, "");
	
	$("#jqxgrid").jqxGrid({	
		width : '100%',
		columnsheight: 80,
        sortable: false,            
	   	altrows: true,
	  	columnsresize: true, 
		rowsheight : 35,
		//pagesize : 18,
		rowdetails : true,
		virtualmode : true	
	});
}
//############################################ Saving of Stone Details #########################################

var saveRecordsStoneArtDet = function(data) {

var rows = $('#jqxgrid').jqxGrid('getrows');
if(data.length == 0){
	$.growl.error({
		message : "Please select atleast one row.",
		duration : 10000,
		title : 'Error'
	});
	return false;
}else{
	for (var i = 0; i < data.length; i++) {		
		if(data[i].status.id == "" || data[i].status.id == null){
			$.growl.error({
				message : "Please Select the Status Feild",
				duration : 10000
			});
			return false;			
	    }  
		if(data[i].remarks == "" || data[i].remarks == null){
			$.growl.error({
				message : "Please Select the Remarks Feild",
				duration : 10000
			});
			return false;
	    }
	}
	return true;
  }
}

$("#saveGRStC").on("click",function(){
	
	var qcParamArray = [];
	
	var rows = $('#jqxgrid').jqxGrid('getrows');
	if(typeof rows != "undefined"){	
		 for (var i = 0; i < rows.length; i++) { 
			 var selectionStatus =  $('#jqxgrid').jqxGrid('getcellvalue', i, 'checkBox');
		if(selectionStatus == true){
			var updateGRDetails =
			    {
					    "stoneAccSrlNo": rows[i].stoneAccSrlNo,
					    "grNumber": rows[i].grNumber,
					    "grSerialNumber": rows[i].grSerialNumber,
					    "remarks": rows[i].remarks,
					    "status": {
					      "id": rows[i].status
					    },
					    "rateAsPerGr": rows[i].rateAsPerGr,
					    "costAsPerGr": rows[i].costAsPerGr
				  }
			qcParamArray.push(updateGRDetails);
			checkVal = true;
		       }
		     }
	        }	 
if(saveRecordsStoneArtDet(qcParamArray)) {
	postJSON('/OrderExecution/api/v1/createProToActForGrStone',JSON.stringify(qcParamArray),function(data) {
  if (data.resCode == "1") {										
		$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
		});
		$('#tabProAct').modal('hide');
		$('#tabProAct').hide();
		$("#jqxgrid").jqxGrid('clear');
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			  }
		});
	}
})

// ###################################################### Accessory Grid #########################################
function grFgGrAccGridAccCreate() {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'createdDate','type' : 'string'},
		{'name' : 'vendorCode','type' : 'string','map': 'vendorCode>name'},
		{'name' : 'grNumber','type' : 'int'}, 
		{'name' : 'grSerialNumber','type' : 'int'},
		{'name' : 'stoneAccSrlNo','type' : 'int'},
		{'name' : 'psrNumber','type' : 'int'},
		{'name' : 'stoneAccCode','type' : 'string'}, 
		{'name' : 'suppliedBy','type' : 'string','map': 'suppliedBy>name'},
		{'name' : 'subCategory','type' : 'string'}, 
		{'name' : 'usedPcs','type' : 'string'},
		{'name' : 'usedWt','type' : 'float'},
		{'name' : 'rateAsPerMaster','type' : 'float'}, 
		{'name' : 'rateAsPerGr','type' : 'float'},
		{'name' : 'costAsPerMaster','type' : 'float'},
		{'name' : 'costAsPerGr','type' : 'float'}, 
		{'name' : 'grDoneBy','type' : 'string'},
		{'name' : 'remarks','type' : 'string'},
		{'name' : 'checkBox','type' : 'bool'},
		{'name' : 'uom','type' : 'string','map': 'uom>name'}, 
		{'name' : 'status','type' : 'string', 'map':'status>name'},
		
		{'name' : 'rateAsPerGrE','type' : 'string', 'map':'rateAsPerGr'},
		{'name' : 'costAsPerGrE','type' : 'string', 'map':'costAsPerGr'}
		];

	var columns = [
		{'text' : 'Date ','datafield' : 'createdDate','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'GR No','datafield' : 'grNumber','width' : '3%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'GR Sl.No','datafield' : 'grSerialNumber','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Acc Sl.No','datafield' : 'stoneAccSrlNo','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'PSR No','datafield' : 'psrNumber','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Acc Supp By','datafield' : 'suppliedBy','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Acc Code',	'datafield' : 'stoneAccCode','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
		
		{'text' : 'Sub Cat','datafield' : 'subCategory','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Acc Pcs Used','datafield' : 'usedPcs','width' : '4%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Acc Wt Used','datafield' : 'usedWt','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'UQC','datafield' : 'uom','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		
		{'text' : '','datafield' : 'costAsPerGrE','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd2',hidden:true},
		{'text' : '','datafield' : 'rateAsPerGrE','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd2',hidden:true},
		
		{'text' : 'Acc Rate as per Master',	'datafield' : 'rateAsPerMaster','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center',cellsformat : 'd2'},
		{'text' : 'Acc Rate as Per GR','datafield' : 'rateAsPerGr',editable : true,cellsalign : 'center',
			align : 'center',sortable : false,'width' : '6%',cellsformat : 'd2',
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					
					   var rateAsMaster = $("#jqxgrid").jqxGrid('getcellvalue',row,'rateAsPerMaster');
					   var rateAsPerGr = $("#jqxgrid").jqxGrid('getcellvalue',row,'rateAsPerGrE');
					   
					if(newvalue > rateAsPerGr){
						$.growl.error({
							message : "do not input value more than that of GR value!!.",
							duration : 10000
						});
						return false;
					}
					if(newvalue < 0){
						$.growl.error({
							message : "Input Value Should Not be Less then  Zero!!.",
							duration : 10000
						});
						return false;
					}
				   if(newvalue < rateAsMaster){
						$.growl.error({
							message : "Rate as per GR Should be not be less then Rate as per Master!!.",
							duration : 10000
						});
						return false;
				   }
				}
		},
		{'text' : 'Acc cost as Per Master ','datafield' : 'costAsPerMaster','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		{'text' : 'Acc cost as per GR','datafield' : 'costAsPerGr','width' : '6%',cellsalign : 'center',align : 'center',
			
			sortable : false,	editable : true,cellsformat : 'd2',
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					
				    var rateAsPerGr = $("#jqxgrid").jqxGrid('getcellvalue',row,'costAsPerGrE');
					   
					if(newvalue > rateAsPerGr){
						$.growl.error({
							message : "do not input value more than that of GR value!!.",
							duration : 10000
						});
						return false;
					}
					if(newvalue < 0){
						$.growl.error({
							message : "Input Value Should Not be Less then  Zero!!.",
							duration : 10000
						});
						return false;
					}
				  var rateAsMaster = $("#jqxgrid").jqxGrid('getcellvalue',row,'costAsPerMaster');
				   if(newvalue < rateAsMaster){
						$.growl.error({
							message : "Cost as per GR Should be not be less then Cost as per Master!!.",
							duration : 10000
						});
						return false;
				   }
				}
		},
		{'text' : 'CheckBox',	'datafield' : 'checkBox','width' : '4%',sortable : false,	editable : true,cellsalign : 'center',	align : 'center',
			columntype: 'checkbox',
			cellbeginedit : function (row, datafield, columntype) {
				var rows = $("#jqxgrid").jqxGrid('getrows');
				for(var i=0; i<rows.length; i++){
					if(row == rows[i].boundindex){
				var selectionStatus =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'checkBox');
				
				if(datafield == "checkBox" &&  selectionStatus == false){		
					return true;
				}else{
			    	return true;
			    }
					}}
			},
	    },
		{'text' : 'Gr Done by','datafield' : 'grDoneBy','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Remarks',	'datafield' : 'remarks','width' : '6%',sortable : false,	editable : true,cellsalign : 'center',	align : 'center'},
		{'text' : 'Status','datafield' : 'status',editable : true,cellsalign : 'center',	align : 'center',sortable : false,'width' : '6%',
			columntype : 'dropdownlist',displayfield : 'statusN',
			createeditor: function (row, cellvalue, editor) { 
				editor.on('click', function(event){
				var	vendorCode = [{
			          "id": "A",
			          "name": "Accepted",
			        },{
			        	 "id": "R",
				          "name": "Rejected",
			        }]
      		  		editor.jqxDropDownList({ source: vendorCode, displayMember: 'name', valueMember: 'id'});
				    });
				}
		}
		];

	showMyGrid(datafields, "/OrderExecution/api/v1/provsionalToActGrAccCreateSearch", "list",columns, grFgFilterValuesCreateSearch(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
		columnsheight: 80,
        sortable: false,            
	   	altrows: true,
	   	//pagesize : 18,
	  	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true	
	});
}
		
$("#clearAllC").on("click",function(){
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
		$('#provToActualCreate').trigger("reset");
		$("#tabProAct").hide();
})

// ############################################ Saving of Acc Details #########################################
	
var saveRecordsAccArtDetAcc = function(data) {
	
	
var rows = $('#jqxgrid').jqxGrid('getrows');

if(data.length == 0){
	$.growl.error({
		message : "Please select atleast one row.",
		duration : 10000,
		title : 'Error'
	});
	return false;
}else{
	for (var i = 0; i < data.length; i++) {		
		if(data[i].status.id == "" || data[i].status.id == null){
			$.growl.error({
				message : "Please Select the Status Feild",
				duration : 10000
			});
			return false;			
	    }  
		if(data[i].remarks == "" || data[i].remarks == null){
			$.growl.error({
				message : "Please Select the Remarks Feild",
				duration : 10000
			});
			return false;
	    }
	}
	return true;
  }
}

$("#saveGRAccC").on("click",function(){
	
	var qcParamArray = [];
	var rows = $('#jqxgrid').jqxGrid('getrows');
	if(typeof rows != "undefined"){	
		 for (var i = 0; i < rows.length; i++) { 
			 var selectionStatus =  $('#jqxgrid').jqxGrid('getcellvalue', i, 'checkBox');
		if(selectionStatus == true){
			var updateGRDetails =
				  {
				    "stoneAccSrlNo": rows[i].stoneAccSrlNo,
				    "grNumber": rows[i].grNumber,
				    "grSerialNumber": rows[i].grSerialNumber,
				    "remarks": rows[i].remarks,
				    "status": {
				      "id": rows[i].status
				    },
				    "rateAsPerGr": rows[i].rateAsPerGr,
				    "costAsPerGr": rows[i].costAsPerGr
				  }
				
			qcParamArray.push(updateGRDetails);
			checkVal = true;
		       }
		     }
	        }	 

if (saveRecordsAccArtDetAcc(qcParamArray)) {
 postJSON('/OrderExecution/api/v1/createProToActForGrAccessory',JSON.stringify(qcParamArray),function(data) {
	  if (data.resCode == "1") {										
	$.growl.notice({
		message : data.mesgStr,
		duration : 10000,
		title : 'Success'
	});
		$('#tabProAct').modal('hide');
		$('#tabProAct').hide();
		$("#jqxgrid").jqxGrid('clear');
		
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			  }
		 });
	 }
 })



// ################################################## Export Functionality For GR Detail , Stones And Accessory ###########################

$("#exportS").on("click", function() {		
	var data;
	var newData = [];
	var fromDate = $('#orderFromDateS').val();
	var toDate = $('#orderToDateS').val();
	var segment = $('#metalSegmentS').val();
	var vendorCode = $('#vendorCodeS').val();
	var grNo = $("#grNoS").val();
	var psrNo = $('#psrNoS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segment"] = segment;
	}
	if (grNo != "" && grNo != null) {
		fieldFilters.fieldFilters["grId"] = grNo;
	}
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendor"] = $('#vendorCode-value').val();
	}
	if (psrNo != "" && psrNo != null) {
		fieldFilters.fieldFilters["psrNo"] = psrNo;
	}
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		var rows = $("#jqxgrid").jqxGrid('getrows');
		if(typeof rows == "undefined"){
			$.growl.error({
				message : "No Data to Export.",
				duration : 10000
			});
			return false;
		}else{
			
var target=$(".tab-content .active").prop("id");

// ########################################### Export For GR Details ##################################	    
if(target == "grDetails"){	
			
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/exportProToActForGrDetails ',JSON.stringify(fieldFilters), function(response) {
				if(response != null){
				data = response.payload.proToActualGrDetails;	
				for(i=0; i<data.length; i++){	
				
				newData.push({	
					        'Created Date' :(data[i].createdDate!= null) ? data[i].createdDate: "", 
							'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode.name: "",
							'GR Number' : (data[i].grNumber != null) ? data[i].grNumber: "",
							'GR Serial Number' : (data[i].grSerialNumber != null) ? data[i].grSerialNumber	: "",						
							'PSR Number' : (data[i].psrNumber != null) ? data[i].psrNumber	: "",
							'Article Code' : (data[i].articleCode != null) ? data[i].articleCode: "",
							'Jewel Type' : (data[i].jewelType != null) ? data[i].jewelType : "",
							'Main Category' : (data[i].mainCategory != null) ? data[i].mainCategory : "",
							
							'Sub Category' : (data[i].subCategory != null) ? data[i].subCategory: "",
							'Pieces' : (data[i].pieces != null) ? data[i].pieces : "",						
							'Gross Wt' : (data[i].grossWt != null) ? data[i].grossWt	: "",
							'Net Wt' : (data[i].netWt != null) ? data[i].netWt: "",	
							'Wastage As Per Master' : (data[i].wastageAsPerMaster != null) ? data[i].wastageAsPerMaster : "",
									
							'Wastage As Per Gr' : (data[i].wastageAsPerGr != null) ? data[i].wastageAsPerGr: "",
							'Labour As Per Master' : (data[i].labourAsPerMaster != null) ? data[i].labourAsPerMaster	: "",						
							'Labour As Per Gr' : (data[i].labourAsPerGr != null) ? data[i].labourAsPerGr	: "",
							'Provisional Or Actual' : (data[i].provisionalOrActual != null) ? data[i].provisionalOrActual: "",	
							'GR Done By' : (data[i].grDoneBy != null) ? data[i].grDoneBy : "",
							'Remarks' : (data[i].remarks != null) ? data[i].remarks : "",
							'Status' : (data[i].status != null) ? data[i].status.name : "",
													
				       });
				}
				 //JSONToCSVConvertor(newData,	"GR Details" + "_" + sysdate, true);
				 var opts = [{sheetid:'Provisional_TO_Actual_FG',header:true}];
				 var res = alasql('SELECT * INTO XLSX("Provisinali to Actual_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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
// ############################### Export For Stones ###############################
		if(target == "tabStone"){	
			
			var rows = $("#jqxgrid").jqxGrid('getdatainformation');
			if(rows.rowscount != 0){
				postJSON('/OrderExecution/api/v1/exportProToActForGrStones ',JSON.stringify(fieldFilters), function(response) {
					if(response != null){
					data = response.payload.proToActualStones;	
					for(i=0; i<data.length; i++){	
					
						newData.push({	
						    'Date' :(data[i].createdDate!= null) ? data[i].createdDate: "", 
							'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode.name: "",
							'GR No' : (data[i].grNumber != null) ? data[i].grNumber: "",
							'GR Sl No' : (data[i].grSerialNumber != null) ? data[i].grSerialNumber	: "",	
							'StoneSrl No' : (data[i].stoneAccSrlNo != null) ? data[i].stoneAccSrlNo	: "",	
							'PSR No' : (data[i].systemWeight != null) ? data[i].systemWeight	: "",
							'Stone Supp By' : (data[i].suppliedBy != null) ? data[i].suppliedBy.name: "",
							'Stone Code' : (data[i].stoneAccCode != null) ? data[i].stoneAccCode: "",	
							//'Main Category' : (data[i].mainCategory != null) ? data[i].mainCategory : "",
							
							'Sub Category' : (data[i].subCategory != null) ? data[i].subCategory: "",
							'Stone Pieces Used' : (data[i].usedPcs != null) ? data[i].usedPcs : "",						
							'Stonw Wt Used ' : (data[i].usedWt != null) ? data[i].usedWt	: "",
							'UQC' : (data[i].uom != null) ? data[i].uom: "",	
							'Stone Rate As Per Master' : (data[i].rateAsPerMaster != null) ? data[i].rateAsPerMaster : "",
									
							'Stone Rate As Per Gr' : (data[i].rateAsPerGr != null) ? data[i].rateAsPerGr: "",
							'Stone Cost As Per Master' : (data[i].costAsPerMaster != null) ? data[i].costAsPerMaster	: "",						
							'Stone Cost As Per Gr' : (data[i].costAsPerGr != null) ? data[i].costAsPerGr	: "",
							'Provisional/Actual' : (data[i].provisionalOrActual != null) ? data[i].provisionalOrActual: "",	
							'GR Done By' : (data[i].grDoneBy != null) ? data[i].grDoneBy : "",
							'Remarks' : (data[i].remarks != null) ? data[i].remarks : "",
							'Status' : (data[i].status != null) ? data[i].status.name : "",
													
				       });
					}
					//JSONToCSVConvertor(newData,	"Stones" + "_" + sysdate, true);	
					 var opts = [{sheetid:'Provisional_TO_Actual_Stones',header:true}];
					 var res = alasql('SELECT * INTO XLSX("Provisinali to Actual_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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


// ##################################### Export For Accessory #################################
		
if(target == "tabAccessories"){	
			
			var rows = $("#jqxgrid").jqxGrid('getdatainformation');
			if(rows.rowscount != 0){
				postJSON('/OrderExecution/api/v1/searchProToActForGrAccessory ',JSON.stringify(fieldFilters), function(response) {
					if(response != null){
						data = response.payload.proToActualAccessory;	
						for(i=0; i<data.length; i++){	
							
							newData.push({	
						        'Date' :(data[i].createdDate!= null) ? data[i].createdDate: "", 
								'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode.name: "",
								'GR No' : (data[i].grNumber != null) ? data[i].grNumber: "",
								'GR Sl. No' : (data[i].grSerialNumber != null) ? data[i].grSerialNumber	: "",	
								'Acc Srl No' : (data[i].stoneAccSrlNo != null) ? data[i].stoneAccSrlNo	: "",	
								'PSR No' : (data[i].systemWeight != null) ? data[i].systemWeight	: "",
								'Acc Supp By' : (data[i].suppliedBy != null) ? data[i].suppliedBy.name: "",
								'Acc Code' : (data[i].stoneAccCode != null) ? data[i].stoneAccCode: "",	
								//'Main Category' : (data[i].mainCategory != null) ? data[i].mainCategory : "",
								
								'Sub Cat' : (data[i].subCategory != null) ? data[i].subCategory: "",
								'Acc Pcs Used' : (data[i].usedPcs != null) ? data[i].usedPcs : "",						
								'Acc Wt Used' : (data[i].usedWt != null) ? data[i].usedWt	: "",
								'UQC' : (data[i].uom != null) ? data[i].uom: "",	
								'Acc Rate As Per Master' : (data[i].rateAsPerMaster != null) ? data[i].rateAsPerMaster : "",
										
								'Acc Rate As Per Gr' : (data[i].rateAsPerGr != null) ? data[i].rateAsPerGr: "",
								'Acc Cost As Per Master' : (data[i].costAsPerMaster != null) ? data[i].costAsPerMaster	: "",						
								'Acc Cost As Per Gr' : (data[i].costAsPerGr != null) ? data[i].costAsPerGr	: "",
								'Provisional/Actual' : (data[i].provisionalOrActual != null) ? data[i].provisionalOrActual: "",	
								'GR Done By' : (data[i].grDoneBy != null) ? data[i].grDoneBy : "",
								'Remarks' : (data[i].remarks != null) ? data[i].remarks : "",
								'Status' : (data[i].status != null) ? data[i].status.name : "",
														
					       });
						}
						//JSONToCSVConvertor(newData,	"Accessories" + "_" + sysdate, true);
						 var opts = [{sheetid:'Provisional_TO_Actual_Acc',header:true}];
						 var res = alasql('SELECT * INTO XLSX("Provisinali to Actual_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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
     }
 });
$("#saveGRDetails").on('click', function() {
	postJSON('/OrderExecution/api/v1/provisionalToActGRDetails', JSON.stringify(updateProvisionalToAct()), function(data) {
		if(1 == data.resCode){
			
			$("#jqxgrid").jqxGrid("updatebounddata");
			
			$.growl.notice({ message: "Successfully updated", duration: 10000, title: 'Success' });	
			
			return true
		}else{
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
			return false;
		}
	});
});

$("#saveGRSt").on('click', function() {
	
	postJSON('/OrderExecution/api/v1/provisionalToActGRStones', JSON
			.stringify(updateProvisionalToAct()), function(data) {
		if(1 == data.resCode){
			$("#jqxgrid").jqxGrid("updatebounddata");
			$.growl.notice({ message: "Successfully updated", duration: 10000, title: 'Success' });	
			return true
		}else{
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
			return false;
		}
	});
	
});
