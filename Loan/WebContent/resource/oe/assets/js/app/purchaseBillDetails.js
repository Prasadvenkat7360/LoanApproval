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

// date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
});

var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});


//on load lov's
var onLoadLov = function(){
$.getJSON('/OrderExecution/api/v1/pbStoreLocationwiseLOVs', function(data) {
	 storeDet = data.payload.stores;
	$('#materialTypeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.materialTypes, function(key, val) {
		$('#materialTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	$('#storeIdS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.stores, function(key, val) {
		$('#storeIdS').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	$('#metalTypeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.metalTypes, function(key, val) {
		$('#metalTypeS').append('<option value="' + val.id + '">' + val.description + '</option>');
	});		
});
}
onLoadLov();

var locDet = function() {
	var locDetS = {
		"fieldFilters" : {
			"materialType" : $("#materialTypeS option:selected").text()
		}
	}
	return locDetS;
 }

$("#materialTypeS").on('change',function(){
	 var locDetails = locDet();
	var materialType = $("#materialTypeS").val();
	 if(materialType =="A"){
		$("#metalTypeS").prop('disabled',true);	
		$("#locS").prop('disabled',true);	
		$("#metalTypeS").val("");
		$("#locS").val("");
	 }
	 else if(materialType == "S"){
			$("#metalTypeS").prop('disabled',true);	
			$("#locS").prop('disabled',false);
			$("#metalTypeS").val("");
		 }
	 else{
		 $("#metalTypeS").prop('disabled',false);
		 $("#locS").prop('disabled',false);
	 }
	 $('#locS').empty().append('<option value="" selected>--Select--</option>');
		if (locDetails) {
			postJSON('/OrderExecution/api/v1/moveToMetalStoneLocLOVs', JSON.stringify(locDetails), function(data) {
				$.each(data.payload.locations, function(key, val) {
					$('#locS').append('<option value="' + val.id + '">' + val.id + '</option>');
				});
			});
		}
});

var PbDetailsFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var materialTypeS = $("#materialTypeS").val();
	var metalTypeS = $("#metalTypeS").val();
	var locS = $("#locS").val();
	var storeIdS = $("#storeIdS").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (materialTypeS != "" && materialTypeS != null) {
		fieldFilters.fieldFilters["materialType"] = materialTypeS;
	}
	if (metalTypeS != "" && metalTypeS != null) {
		fieldFilters.fieldFilters["metalType"] = metalTypeS;
	}
	if (locS != "" && locS != null) {
		fieldFilters.fieldFilters["location"] = locS;
	}
	if (storeIdS != "" && storeIdS != null) {
		fieldFilters.fieldFilters["storeId"] = storeIdS;
	}	
	return fieldFilters;
}

function storeGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ 
		{'name' : 'name','type' : 'string'}, 
		{'name' : 'id', 'type' : 'int'}
	];
	
	var columns = [ 
		{'text' : 'Id', 'datafield' : 'id', 'width' : '20%', cellsalign : 'center', align : 'center', sortable : false, hidden : true}, 
		{'text' : 'Store Name', 'datafield' : 'name', 'width' : '100%', cellsalign : 'center', align : 'center', sortable : false, editable: false}
	];
	
	showMyGrid(datafields,"/OrderExecution/api/v1/pbStoreLocationwiseStores", "stores",columns, PbDetailsFieldFilters(), updateRows, "");
	
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	autorowheight :true,
        autoheight :false,
    	theme: 'energyblue',
        height: '330px',
        columnsheight: 30,
        columnsresize: true,  
		rowsheight : 30,
		rowdetails : true,
		virtualmode : true,
	});
}

$('#jqxgrid').on('cellclick', function (event) {

	var rows = $('#jqxgrid').jqxGrid('getrows');										
	var sId = jQuery('#jqxgrid').jqxGrid('getCellvalue', event.args.rowindex,'id');
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var materialTypeS = $("#materialTypeS").val();
	var metalTypeS = $("#metalTypeS").val();
	var locS = $("#locS").val();
	var filters = {
			"fieldFilters" : {}
	};
	
 	if (fromDateS != "" && fromDateS != null) {
 		filters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		filters.fieldFilters["toDate"] = toDateS;
	}
	if (materialTypeS != "" && materialTypeS != null) {
		filters.fieldFilters["materialType"] = materialTypeS;
	}
	if (metalTypeS != "" && metalTypeS != null) {
		filters.fieldFilters["metalType"] = metalTypeS;
	}
	if (locS != "" && locS != null) {
		filters.fieldFilters["location"] = locS;
	}
	filters.fieldFilters["storeId"] = sId;
	var matType = $("#materialTypeS").val();
	postJSON('/OrderExecution/api/v1/searchPBLocationStoreWise',JSON.stringify(filters),function(data) {
		var response = data.payload.list;					
		if(matType == "F"){
			fgSearchGrid(response);
			$("#jqxgridF").show();
			$("#jqxgridR").hide();
			$("#jqxgridA").hide();
			$("#jqxgridS").hide();
		}
		
		if(matType == "R"){
			rmSearchGrid(response);
			$("#jqxgridR").show();
			$("#jqxgridF").hide();
			$("#pbFgStoneGrid").hide();
			$("#pbFgAccGrid").hide();
			$("#jqxgridA").hide();
			$("#jqxgridS").hide();
		}
		
		if(matType == "A"){
			accesorySearchGrid(response);
			$("#jqxgridA").show();
			$("#jqxgridR").hide();
			$("#jqxgridF").hide();
			$("#jqxgridS").hide();
			$("#pbFgStoneGrid").hide();
			$("#pbFgAccGrid").hide();
		}
		
		if(matType == "S"){
			looseStoneSearchGrid(response);
			$("#jqxgridS").show();
			$("#jqxgridA").hide();
			$("#jqxgridR").hide();
			$("#jqxgridF").hide();
			$("#pbFgStoneGrid").hide();
			$("#pbFgAccGrid").hide();
		}
 });
});

var viewStoneAccDetModal = function(row, column, value) {
	return '<button style="margin-top:8px;" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewStoneAccDetModal"  type="button" id=' + row	+ ' onclick="viewStoneAccDetGridLoad('+ value	+ ')"/><i class="fa fa-eye fa-sm"></i></button>';
}

//FG Search Grid
var fgSearchGrid = function(response) {
	var source = {
		datafields : [
			{name : 'createdDate', type : 'string'},
			{name : 'storeId', type : 'int','map' : 'header>store>name'},
			{name : 'metalType', type : 'string','map' : 'header>segment>description'},
			{name : 'pbNo', type : 'int','map' : 'pbNo'}, 
			{name : 'pbSlNo',	type : 'int','map':'serialNumber'}, 
			{name : 'pbRefType',	type : 'string','map' : 'header>referenceType'}, 
			{name : 'PbRefNo',type : 'int','map' : 'header>referenceDocNo'}, 
			{name : 'pbRefSlNo',type : 'int','map':'valuationSlipId'}, 
			{name : 'locCode', type : 'string','map' : 'location'},
			{name : 'matType', type : 'string','map' : 'materialType'}, 
			{name : 'jewelType',type : 'string','map' : 'jewelType>description'}, 
			{name : 'pbGrossWt',type : 'float','map' : 'grossWt'}, 
			{name : 'pbNetWt',type : 'float','map' : 'netWt'},
			{name : 'pbPureWt',type : 'float','map' : 'pureWt'},
			{name : 'purity',type : 'float','map' : 'purity'},
			{name : 'pbItemAmt',type : 'float','map' : 'grossAmount'},
			{name : 'pbItemMetalRate',type : 'float','map' : 'ratePerGm'},
			{name : 'valuatorInputAmt',type : 'float','map':'valuatorInputAmt'},
			{name : 'selectionStatus',type : 'bool'},
			{name : 'createdBy',type : 'string','map': 'createdBy'},
			{name : 'purchaseBillId',type : 'int','map': 'purchaseBillId'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var objArray = [];
	var getSumRows = function(data){
		var pbGrossWt = 0;
		var pbNetWt  = 0;
		var pbPureWt = 0;
		var pbItemAmt = 0;
		var valuatorInputAmt = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].pbGrossWt != null){
				pbGrossWt = pbGrossWt + parseFloat(data[i].pbGrossWt);
			}
			
			if(data[i].pbNetWt != null){
				pbNetWt = pbNetWt + parseFloat(data[i].pbNetWt);
			}
			
			if(data[i].pbPureWt != null){
				pbPureWt = pbPureWt + data[i].pbPureWt;
			}
			
			if(data[i].pbItemAmt != null){
				pbItemAmt = pbItemAmt + data[i].pbItemAmt;
			}
			
			if(data[i].valuatorInputAmt != null){
				valuatorInputAmt = valuatorInputAmt + data[i].valuatorInputAmt;
			}
			
			
		}
		objArray['grossWeight'] = pbGrossWt.toFixed(3);
		objArray['netWeight'] = pbNetWt.toFixed(3);
		objArray['pbPureWt'] = pbPureWt.toFixed(3);
		objArray['pbItemAmt'] = pbItemAmt.toFixed(2);
		objArray['valuatorInputAmt'] = valuatorInputAmt.toFixed(2);		
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Gross Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['grossWeight'] + '</span> <b>Net Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['netWeight']  + '</span><b> Pure Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['pbPureWt']  + '</span><b> Item Amount </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['pbItemAmt']   + '</span><b> Value Input Amt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['valuatorInputAmt']  + '</span></span></div>';
	};
	
	
	$("#jqxgridF").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 65,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
		showtoolbar : true,
		groupable: true,
 	    statusbarheight: 20,
		groupsrenderer: groupsrenderer,
		showaggregates: true,  
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Material Type : FG');			
		},
		columns : [ 
			{text : 'Created Date',datafield : 'createdDate',width : '6%',cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy',editable : false},	
			{text : 'Store',datafield : 'storeId',	width : '6%',cellsalign : 'center',align : 'center',editable : false, groupable: true}, 
			{text : 'M Type',datafield : 'metalType',width : '5%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
			{text : 'PB No',datafield : 'pbNo',width : '4%',cellsalign : 'center',align : 'center',editable : false, groupable: true,sortable:true}, 
			{text : 'PB Srl No',datafield : 'pbSlNo',width : '5%',	cellsalign : 'center',align : 'center',	editable : false, groupable: true},
			{text : 'Loc Code',datafield : 'locCode',width : '5%',cellsalign : 'center',align : 'center',editable : false,sortable:true} ,
			{text : 'Ref Type',datafield : 'pbRefType',	width : '6%',cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Ref No',	datafield : 'PbRefNo',width : '5%',cellsalign : 'center',align : 'center',	editable : false}, 
			{text : 'Ref Sl No',datafield : 'pbRefSlNo',	width : '5%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Jew Type',datafield : 'jewelType',width : '6%',cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Gr Wt',datafield : 'pbGrossWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3'},
			{text : 'Net Wt',datafield : 'pbNetWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3'},
			{text : 'Pure Wt',datafield : 'pbPureWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3'},
			{text : 'Purity',datafield : 'purity',width : '4%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2'},
			{text : 'Item Amt',datafield : 'pbItemAmt',width : '7%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2'},
			{text : 'V Input Amt',datafield : 'valuatorInputAmt',width : '6%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2'},
			{text : 'Metal Rate',datafield : 'pbItemMetalRate',width : '6%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2'},	
			{text : 'Created By',datafield : 'createdBy',width : '6%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Action',datafield : 'purchaseBillId', width : '3%', cellsalign : 'center', align : 'center', editable : false, cellsrenderer : viewStoneAccDetModal}
		]
	});
}

var viewStoneAccDetGridLoad = function(value){
	 $.getJSON('/OrderExecution/api/v1/getPBStoneAccDetailsForFG?id=' + value,function(data) {
		 if(data.resCode == 1){
			 var result = data.payload.list.pbStoneList;
			 var resultS = data.payload.list.pbAccList;
			    fgStoneSearchGrid(result);
				$("#pbFgStoneGrid").show();
				fgAccSearchGrid(resultS);
				$("#pbFgAccGrid").show(); 
		 }else{}
		
	 });
}

var rmSearchGrid = function(response) {
	var source = {
		datafields : [
			{name : 'createdDate', type : 'string'},
			{name : 'storeId', type : 'int','map' : 'header>store>name'},
			{name : 'metalType', type : 'string','map' : 'header>segment>description'},
			{name : 'pbNo', type : 'int','map' : 'pbNo'}, 
			//{name : 'matType',type : 'string','map': 'materialType'},
			{name : 'pbSlNo',	type : 'int','map':'serialNumber'}, 
			{name : 'pbRefType',	type : 'string','map' : 'header>referenceType'}, 
			{name : 'PbRefNo',type : 'int','map' : 'header>referenceDocNo'}, 
			{name : 'pbRefSlNo',type : 'int','map':'valuationSlipId'}, 
			{name : 'locCode', type : 'string','map' : 'location'},
			{name : 'matType', type : 'string','map' : 'materialType'}, 
			{name : 'jewelType',type : 'string','map' : 'jewelType>description'}, 
			{name : 'pbGrossWt',type : 'float','map' : 'grossWt'}, 
			{name : 'pbNetWt',type : 'float','map' : 'netWt'},
			{name : 'pbPureWt',type : 'float','map' : 'pureWt'},
			{name : 'purity',type : 'float','map' : 'purity'},
			{name : 'pbItemAmt',type : 'float','map' : 'grossAmount'},
			{name : 'pbItemMetalRate',type : 'float','map' : 'ratePerGm'},
			{name : 'valInputAmt',type : 'float','map':'valuatorInputAmt'},
			{name : 'createdBy',type : 'string','map': 'createdBy'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var objArray = [];
	var getSumRows = function(data){
		var pbGrossWt = 0;
		var pbNetWt  = 0;
		var valInputAmt = 0;
		var pbPureWt = 0;
		var pbItemAmt = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].pbGrossWt != null){
				pbGrossWt = pbGrossWt + parseFloat(data[i].pbGrossWt);
			}
			
			if(data[i].pbNetWt != null){
				pbNetWt = pbNetWt + parseFloat(data[i].pbNetWt);
			}
			
			if(data[i].valInputAmt != null){
				valInputAmt = valInputAmt + data[i].valInputAmt;
			}
			
			if(data[i].pbPureWt != null){
				pbPureWt = pbPureWt + data[i].pbPureWt;
			}
			
			if(data[i].pbItemAmt != null){
				pbItemAmt = pbItemAmt + data[i].pbItemAmt;
			}
		}
		objArray['grossWeight'] = pbGrossWt.toFixed(3);
		objArray['netWeight'] = pbNetWt.toFixed(3);
		objArray['pbPureWt'] = pbPureWt.toFixed(3);
		objArray['pbItemAmt'] = pbItemAmt.toFixed(2);
		objArray['valInputAmt'] = valInputAmt.toFixed(2);
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Gross Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['grossWeight'] + '</span> <b>Net Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['netWeight']  + '</span><b> Pure Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['pbPureWt']  + '</span><b> Item Amount </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['pbItemAmt']   + '</span><b> Value Input Amt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['valInputAmt']  + '</span></span></div>';
	};
		
	$("#jqxgridR").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
        columnsheight: 60,
        columnsresize: true,
    	theme: 'energyblue',
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		altRows : true,
		pageable: true,
		groupable: true,
		groupsrenderer: groupsrenderer,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Material Type : RM');			
		},
		columns : [ 
			{text : 'Created Date',datafield : 'createdDate',width : '6%',cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy',editable : false},
			{text : 'Store',datafield : 'storeId',	width : '6%',cellsalign : 'center',align : 'center',editable : false, groupable: true}, 
			{text : 'M Type',datafield : 'metalType',width : '5%',cellsalign : 'center',align : 'center',editable : false,sortable:true,groupable: true},
			{text : 'PB No',datafield : 'pbNo',width : '4%',cellsalign : 'center',align : 'center',editable : false,groupable: true}, 
			{text : 'PB Srl No',datafield : 'pbSlNo',width : '5.5%',	cellsalign : 'center',align : 'center',	editable : false,groupable: true},
			{text : 'Loc Code',datafield : 'locCode',width : '5%',cellsalign : 'center',align : 'center',editable : false,sortable:true,groupable: false} ,
			{text : 'Ref Type',datafield : 'pbRefType',	width : '7%',cellsalign : 'center',align : 'center',editable : false,groupable: false}, 
			{text : 'Ref No',	datafield : 'PbRefNo',width : '5%',cellsalign : 'center',align : 'center',	editable : false,groupable: false}, 
			{text : 'Ref Sl No',datafield : 'pbRefSlNo',	width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'Jewel Type',datafield : 'jewelType',width : '7%',cellsalign : 'center',align : 'center',editable : false,groupable: false}, 
			{text : 'Gross Wt',datafield : 'pbGrossWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',groupable: false},
			{text : 'Net Wt',datafield : 'pbNetWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',groupable: false},
			{text : 'Pure Wt',datafield : 'pbPureWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',groupable: false},
			{text : 'Purity',datafield : 'purity',width : '4%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false},
			{text : 'Item Amt',datafield : 'pbItemAmt',width : '7.5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false},
			{text : 'V Input Amt',datafield : 'valInputAmt',width : '6.5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false},
			{text : 'Metal Rate',datafield : 'pbItemMetalRate',width : '6%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2'},	
			{text : 'Created By',datafield : 'createdBy',width : '5.5%',cellsalign : 'center',align : 'center',editable : false,groupable: false}]
	});
}


var fgStoneSearchGrid = function(result) {
	var source = {
		datafields : [
			{name : 'pbNo',type : 'int','map':'pbDetail>header>purchaseBillId'},
			{name : 'linkedSlNo',type : 'int'},
			{name : 'stoneSlNo',type : 'int','map':'srlNo'},
			{name : 'stoneCode',type : 'string'},
			{name : 'stoneWt',type : 'float','map':'weight'},
			{name : 'segId',type : 'int','map':'segment>description'},
			{name : 'catId',type : 'int','map':'category>description'},                                
			{name : 'subCatDesc',type : 'string','map':'subCatDes'},
			{name : 'stColor',type : 'string','map':'colorVal'},
			{name : 'clarity',type : 'string','map':'clarityVal'}, 
			{name : 'actColor',type : 'string','map':'actualColorVal'},
			{name : 'wtCostSlab',type : 'string','map':'weightSlabVal'},
			{name : 'stValue',type : 'long','map':''},
			{name : 'stRate',type : 'float','map':'rate'},
			{name : 'stPcs',type : 'int','map':'pieces'},
			{name : 'stUqc',type : 'string','map':'uom'},
			{name : 'cut',type : 'string','map':'cutGradeVal'}
			],
			localdata : result,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#pbFgStoneGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
        columnsheight: 30,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : true,
		pageable: true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		showaggregates: true, 
		showstatusbar: true,
 	    statusbarheight: 20,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Material Type : FG Stones');			
		},
		columns : [ 
			{text : 'PB No',datafield : 'pbNo',width : '4%',cellsalign : 'center',align : 'center'},
			{text : 'Linked Srl No',datafield : 'linkedSlNo',width : '8%',cellsalign : 'center',align : 'center'},
			{text : 'Stn Sl No',datafield : 'stoneSlNo',	width : '7%',cellsalign : 'center',align : 'center'}, 
			{text : 'Stn Code',datafield : 'stoneCode',width : '7%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Stn Wt',datafield : 'stoneWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3'}, 
			{text : 'Seg',datafield : 'segId',width : '7%',	cellsalign : 'center',align : 'center',	editable : false},
			{text : 'Category',datafield : 'catId',width : '9%',cellsalign : 'center',align : 'center',editable : false} ,
			{text : 'Sub Cat Desc',datafield : 'subCatDesc',	width : '12%',cellsalign : 'left',align : 'center',editable : false}, 
			{text : 'Stn Color',	datafield : 'stColor',width : '8%',cellsalign : 'center',align : 'center',	editable : false}, 
			{text : 'Clarity',datafield : 'clarity',	width : '6%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Act Color',datafield : 'actColor',width : '6%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Wt/Cost Slab',datafield : 'wtCostSlab',width : '8%',cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Stn Rate',datafield : 'stRate',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',
				aggregates: [{          
	        		  'Total': function(aggregatedValue, currentValue, column, record) {
	    				  var total = (record['stRate'] == null) ? 0 : record['stRate'];
	        			  return aggregatedValue + total;
	        		  }
	        	  }],
	        	  aggregatesrenderer: function(aggregates) {        		 
		          		if(typeof aggregates["Total"] == "undefined"){
		      				return '0';
		      		  	}else{
		      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		      		  	}
	        	  }  
			},
			{text : 'Stn Pcs',datafield : 'stPcs',width : '5%',cellsalign : 'center',align : 'center',editable : false,
				aggregates: [{          
	        		  'Total': function(aggregatedValue, currentValue, column, record) {
	    				  var total = (record['stPcs'] == null) ? 0 : record['stPcs'];
	        			  return aggregatedValue + total;
	        		  }
	        	  }],
	        	  aggregatesrenderer: function(aggregates) {        		 
		          		if(typeof aggregates["Total"] == "undefined"){
		      				return '0';
		      		  	}else{
		      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		      		  	}
	        	  }  
			},
			{text : 'UQC',datafield : 'stUqc',width : '4%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Cut',datafield : 'cut',width : '4%',cellsalign : 'center',align : 'center',editable : false},
			]
	});
}

var fgAccSearchGrid = function(response) {
	var source = {
			datafields : [
			{name : 'pbNo',type : 'int','map':'pbDetail>header>purchaseBillId'},
			{name : 'linkedSlNo',type : 'int'},
			{name : 'accSlNo',type : 'int','map':'serialNumber'},
			{name : 'accCode',type : 'string','map':'accCode'},
			{name : 'Desc',type : 'string','map':'categoryDes'},
			{name : 'accWt',type : 'float','map':'weight'},
			{name : 'accRate',type : 'float','map':'rate'},                                
			{name : 'accAmt',type : 'float','map':'price'},
			{name : 'accUom',type : 'string','map':'uom'},
			{name : 'accPcs',type : 'int','map':'pieces'}],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#pbFgAccGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
        columnsheight: 30,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : true,
		pageable: true,
		showaggregates: true, 
		showstatusbar: true,
 	    statusbarheight: 20,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Material Type : FG Accessory');			
		},	
		columns : [
			{text : 'PB No',datafield : 'pbNo',width : '5%',cellsalign : 'center',align : 'center'},
			{text : 'Linked Srl No',datafield : 'linkedSlNo',width : '8%',cellsalign : 'center',align : 'center'},
			{text : 'Acc Sl No',datafield : 'accSlNo',	width : '8%',cellsalign : 'center',align : 'center'}, 
			{text : 'Acc Code',datafield : 'accCode',width : '15%',cellsalign : 'center',align : 'center',editable : false},
			{text : 'Desc',datafield : 'Desc',width : '16%',cellsalign : 'center',align : 'center',editable : false}, 
			{text : 'Acc Wt',datafield : 'accWt',width : '12%',	cellsalign : 'right',align : 'center',	editable : false,cellsformat : 'd3',
				aggregates: [{          
	        		  'Total': function(aggregatedValue, currentValue, column, record) {
	    				  var total = (record['accWt'] == null) ? 0 : record['accWt'];
	        			  return aggregatedValue + total;
	        		  }
	        	  }],
	        	  aggregatesrenderer: function(aggregates) {        		 
		          		if(typeof aggregates["Total"] == "undefined"){
		      				return '0';
		      		  	}else{
		      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		      		  	}
	        	  }  
			},
			{text : 'Acc Rate',datafield : 'accRate',width : '12%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',
				aggregates: [{          
	        		  'Total': function(aggregatedValue, currentValue, column, record) {
	    				  var total = (record['accRate'] == null) ? 0 : record['accRate'];
	        			  return aggregatedValue + total;
	        		  }
	        	  }],
	        	  aggregatesrenderer: function(aggregates) {        		 
		          		if(typeof aggregates["Total"] == "undefined"){
		      				return '0';
		      		  	}else{
		      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		      		  	}
	        	  }  
			},
			{text : 'Acc Amt',datafield : 'accAmt',	width : '12%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',
				aggregates: [{          
	        		  'Total': function(aggregatedValue, currentValue, column, record) {
	    				  var total = (record['accAmt'] == null) ? 0 : record['accAmt'];
	        			  return aggregatedValue + total;
	        		  }
	        	  }],
	        	  aggregatesrenderer: function(aggregates) {        		 
		          		if(typeof aggregates["Total"] == "undefined"){
		      				return '0';
		      		  	}else{
		      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		      		  	}
	        	  }   
			},
			{text : 'Acc UQC',	datafield : 'accUom',width : '7%',cellsalign : 'center',align : 'center',	editable : false},
			{text : 'Acc Pcs',	datafield : 'accPcs',width : '5%',cellsalign : 'center',align : 'center',	editable : false,
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['accPcs'] == null) ? 0 : record['accPcs'];
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {        		 
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
      	  }
		}
		]
	});
}

//Loose Stones  Search Grid
var looseStoneSearchGrid = function(data) {
	var source = {
		datafields : [
			{name : 'createdDate', type : 'string','map':'pbDetail>createdDate'},
			{name : 'storeId', type : 'int','map':'pbDetail>header>store>name'}, 
			{name : 'pbNo', type : 'int','map':'pbDetail>pbNo'}, 
			{name : 'pbSlNo',	type : 'int','map':'pbDetail>serialNumber'}, 
			{name : 'pbRefType',	type : 'string','map':'pbDetail>header>referenceType'}, 
			{name : 'PbRefNo',type : 'int','map':'pbDetail>header>referenceDocNo'}, 
			{name : 'pbRefSlNo',type : 'int','map':'pbDetail>valuationSlipId'}, 
			{name : 'locCode', type : 'string','map':'pbDetail>location'},
			{name : 'matType', type : 'string','map':'pbDetail>materialType'}, 
			{name : 'jewelType',type : 'string','map':'pbDetail>jewelType>description'}, 
			{name : 'pbGrossWt',type : 'float','map':'pbDetail>grossWt'}, 
			{name : 'pbNetWt',type : 'float','map':'pbDetail>netWt'},
			{name : 'pbPureWt',type : 'float','map':'pbDetail>pureWt'},
			{name : 'purity',type : 'float','map':'pbDetail>purity'},
			{name : 'pbItemAmt',type : 'float','map':'pbDetail>grossAmount'},
			{name : 'pbItemMetalRate',type : 'long','map':'pbDetail>ratePerGm'},
			{name : 'createdBy',type : 'string'},
			{name : 'stoneSlNo',type : 'int','map':'srlNo'},
			{name : 'stoneCode',type : 'string','map':'stoneCode'},
			{name : 'subCatDesc',type : 'string','map':'subCatDes'},
			{name : 'stoneWt',type : 'float','map':'weight'},
			{name : 'stoneSegId',type : 'int','map':'segment>description'},
			{name : 'catId',type : 'int','map':'category>description'},
			{name : 'stColor',type : 'string','map':'colorVal'},
			{name : 'clarity',type : 'string','map':'clarityVal'},
			{name : 'actColor',type : 'string','map':'actualColorVal'},
			{name : 'stWtSlab',type : 'string','map':'weightSlabVal'},
			{name : 'stValue',type : 'float','map':'rate'},
			{name : 'stPcs',type : 'float','map':'pieces'},
			{name : 'uqc',type : 'string','map':'uom'},
			{name : 'valInputAmt',type : 'float','map':'valuatorInputAmt'},
			{name : 'linkedSln',type : 'int','map':'linkedSlNo'},
			{name : 'cut',type : 'string','map':'cutGradeVal'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var objArray = [];
	var getSumRows = function(data){
		var stoneWt = 0;
		var valInputAmt  = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].stoneWt != null){
				stoneWt = stoneWt + parseFloat(data[i].stoneWt);
			}
			
			if(data[i].valInputAmt != null){
				valInputAmt = valInputAmt + parseFloat(data[i].valInputAmt);
			}
		}
		objArray['stoneWt'] = stoneWt.toFixed(3);
		objArray['valInputAmt'] = valInputAmt.toFixed(2);
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Stone Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['stoneWt'] + '</span> <b>Valuator Input </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['valInputAmt']  + '</span></div>';
	};
	
	$("#jqxgridS").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 80,
		autorowheight : true,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		sortable:true,
		columnsresize : true,
		showtoolbar : true,
		groupable: true,
		groupsrenderer: groupsrenderer,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Material Type : Loose Stones');			
		},
		columns : [ 
			{text : 'Created Date',datafield : 'createdDate',width : '5%',cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'},
			{text : 'Store',datafield : 'storeId',	width : '6%',cellsalign : 'center',align : 'center',groupable: true}, 
			{text : 'Seg',datafield : 'stoneSegId',width : '4%',cellsalign : 'center',align : 'center',editable : false,groupable: true},
			{text : 'Cat',datafield : 'catId',width : '4%',cellsalign : 'center',align : 'center',editable : false,groupable: true},
			{text : 'PB No',datafield : 'pbNo',width : '3.5%',cellsalign : 'center',align : 'center',editable : false,groupable: false,sortable:true}, 
			{text : 'PB Srl No',datafield : 'pbSlNo',width : '3.5%',	cellsalign : 'center',align : 'center',	editable : false,groupable: false},
			{text : 'PB Ref Type',datafield : 'pbRefType',width : '6%',cellsalign : 'center',align : 'center',editable : false,groupable: false} ,
			{text : 'PB Ref No',datafield : 'PbRefNo',	width : '4%',cellsalign : 'center',align : 'center',editable : false,groupable: false}, 
			{text : 'PB Ref Srl No',	datafield : 'pbRefSlNo',width : '5%',cellsalign : 'center',align : 'center',	editable : false,groupable: false}, 
			{text : 'Linked Srl No',	datafield : 'linkedSln',width : '5%',cellsalign : 'center',align : 'center',	editable : false,groupable: false}, 
			{text : 'Loc Code',datafield : 'locCode',	width : '4%',cellsalign : 'center',align : 'center',editable : false,sortable:true,groupable: false}, 
			{text : 'Jewel Type',datafield : 'jewelType',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false,hidden:true},
			{text : 'PB Gross Wt',datafield : 'pbGrossWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',groupable: false,hidden:true},
			{text : 'PB Net Wt',datafield : 'pbNetWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',groupable: false,hidden:true},
			{text : 'PB Pure Wt',datafield : 'pbPureWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',groupable: false,hidden:true},
			{text : 'Purity',datafield : 'purity',width : '4%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false,hidden:true},
			{text : 'PB Item Amt',datafield : 'pbItemAmt',width : '6%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false,hidden:true},
			{text : 'PB Item Stone Rate',datafield : 'pbItemMetalRate',width : '6%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false},
			{text : 'Created By',datafield : 'createdBy',width : '6%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'Stone Srl No',datafield : 'stoneSlNo',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'Stone Code',datafield : 'stoneCode',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'Sub Cat Desc',datafield : 'subCatDesc',width : '10%',cellsalign : 'left',align : 'center',editable : false,groupable: false},
			{text : 'Stone Wt',datafield : 'stoneWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',groupable: false},
			{text : 'Stone Color',datafield : 'stColor',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'Cut',datafield : 'cut',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'Clarity',datafield : 'clarity',width : '4%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'Actual Color',datafield : 'actColor',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'Stone Wt Slab',datafield : 'stWtSlab',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'Stone Value',datafield : 'stValue',width : '4%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',hidden:true,groupable: false},
			{text : 'Stone Pcs',datafield : 'stPcs',width : '4%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'UQC',datafield : 'uqc',width : '4%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'V Input Amt',datafield : 'valInputAmt',width : '6%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false},
			]
	});
}


//Accessory Search Grid
var accesorySearchGrid = function(response) {
	var source = {
		datafields : [
			{name : 'createdDate', type : 'string','map':'pbDetail>createdDate'},
			{name : 'storeId', type : 'int','map':'pbDetail>header>store>name'}, 
			{name : 'pbNo', type : 'int','map':'pbDetail>pbNo'}, 
			{name : 'pbSlNo',	type : 'int','map':'pbDetail>serialNumber'}, 
			{name : 'pbRefType',	type : 'string','map':'pbDetail>header>referenceType'}, 
			{name : 'PbRefNo',type : 'int','map':'pbDetail>header>referenceDocNo'}, 
			{name : 'pbRefSlNo',type : 'int','map':'pbDetail>valuationSlipId'}, 
			{name : 'locCode', type : 'string','map':'pbDetail>location'},
			{name : 'matType', type : 'string','map':'pbDetail>materialType'}, 
			{name : 'jewelType',type : 'string','map':'pbDetail>jewelType'}, 
			{name : 'pbGrossWt',type : 'float','map':'pbDetail>grossWt'}, 
			{name : 'pbNetWt',type : 'float','map':'pbDetail>netWt'},
			{name : 'pbPureWt',type : 'float','map':'pbDetail>pureWt'},
			{name : 'purity',type : 'float','map':'pbDetail>purity'},
			{name : 'pbItemAmt',type : 'float','map':'pbDetail>grossAmount'},
			{name : 'pbItemMetalRate',type : 'float','map':'pbDetail>ratePerGm'},
			{name : 'createdBy',type : 'string'},
			{name : 'pbDetailId',type : 'int','map':'pbDetailId'},
			{name : 'linkedSlNo',type : 'int','map':'linkedSlNo'},
			{name : 'accSlNo',type : 'int','map':'serialNumber'},
			{name : 'accCode',type : 'string','map':'accCode'},
			{name : 'desc',type : 'string','map':'categoryDes'},
			{name : 'accWt',type : 'int','map':'weight'},
			{name : 'accRate',type : 'string','map':'rate'},
			{name : 'accAmt',type : 'string','map':'price'},
			{name : 'accUom',type : 'string','map':'uom'},
			{name : 'accPcs',type : 'int','map':'pieces'},
			{name : 'valInputAmt',type : 'float','map':'valuatorInputAmt'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var objArray = [];
	var getSumRows = function(data){
		var accWt = 0;
		var valInputAmt  = 0;
		var accPcs = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].accWt != null){
				accWt = accWt + parseFloat(data[i].accWt);
			}
			
			if(data[i].valInputAmt != null){
				valInputAmt = valInputAmt + parseFloat(data[i].valInputAmt);
			}
			
			if(data[i].accPcs != null){
				accPcs = accPcs + data[i].accPcs;
			}
		}
		objArray['accWt'] = accWt.toFixed(3);
		objArray['valInputAmt'] = valInputAmt.toFixed(2);
		objArray['accPcs'] = accPcs;
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Acc Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['accWt'] + '</span> <b>Valuator Input </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['valInputAmt']  + '</span><b> Pcs </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['accPcs']  + '</span></div>';
	};
	
	$("#jqxgridA").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : false,
		height : 200,
		theme: 'energyblue',
		columnsheight : 80,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		sortable:true,
		columnsresize : true,
		groupable: true,
		groupsrenderer: groupsrenderer,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Material Type : Accessories');			
		},
		columns : [ 
			{text : 'Created Date',datafield : 'createdDate',width : '5%',cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'},
			{text : 'Store',datafield : 'storeId',	width : '6%',cellsalign : 'center',align : 'center',groupable: true}, 
			{text : 'PB No',datafield : 'pbNo',width : '4%',cellsalign : 'center',align : 'center',editable : false,groupable: false,sortable:true}, 
			{text : 'PB Srl No',datafield : 'pbSlNo',width : '4%',	cellsalign : 'center',align : 'center',	editable : false,groupable: false},
			{text : 'PB Ref Type',datafield : 'pbRefType',width : '6%',cellsalign : 'center',align : 'center',editable : false,groupable: false} ,
			{text : 'PB Ref No',datafield : 'PbRefNo',	width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false}, 
			{text : 'PB Ref Srl No',	datafield : 'pbRefSlNo',width : '5%',cellsalign : 'center',align : 'center',	editable : false,groupable: false}, 
			{text : 'Loc Code',datafield : 'locCode',	width : '5%',cellsalign : 'center',align : 'center',editable : false,sortable:true,groupable: false}, 
			{text : 'Jewel Type',datafield : 'jewelType',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false,hidden:true},
			{text : 'PB Gross Wt',datafield : 'pbGrossWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',hidden:true,groupable: false},
			{text : 'PB Net Wt',datafield : 'pbNetWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',groupable: false,hidden:true},
			{text : 'PB Pure Wt',datafield : 'pbPureWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',groupable: false,hidden:true},
			{text : 'Purity',datafield : 'purity',width : '4%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false,hidden:true},
			{text : 'PB Item Amt',datafield : 'pbItemAmt',width : '6%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false},
			{text : 'PB Item Metal Rate',datafield : 'pbItemMetalRate',width : '6%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false,hidden:true},
			{text : 'Created By',datafield : 'createdBy',width : '6%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'PB Detail Id',datafield : 'pbDetailId',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false,hidden:true},
			{text : 'Linked Srl No',datafield : 'linkedSlNo',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'Acc Srl No',datafield : 'accSlNo',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'Acc Code',datafield : 'accCode',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: false},
			{text : 'Desc',datafield : 'desc',width : '5%',cellsalign : 'center',align : 'center',editable : false,groupable: true},
			{text : 'Acc Wt',datafield : 'accWt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd3',groupable: false},
			{text : 'Acc Rate',datafield : 'accRate',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false},
			{text : 'Acc Amt',datafield : 'accAmt',width : '5%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false},
			{text : 'Acc UQC',datafield : 'accUom',width : '4%',cellsalign : 'center',align : 'center',editable : false,groupable: false},	
			{text : 'Acc Pcs',datafield : 'accPcs',width : '4%',cellsalign : 'center',align : 'center',editable : false,groupable: false},	
			{text : 'V Input Amt',datafield : 'valInputAmt',width : '6%',cellsalign : 'right',align : 'center',editable : false,cellsformat : 'd2',groupable: false},
			]
	});
}

$("#search").on('click',function(){
	var matType = $("#materialTypeS").val();
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	 if((matType == "" || matType == null) || (fromDateS == "" || fromDateS == null) || (toDateS =="" || toDateS == null)){
		 $.growl.error({
				message : "Please Fill Mandatory Fields",
				duration : 10000,
				title :'Error'
			})
			return false;
	 }
	 else{
		 storeGrid();
		 $("#jqxgrid").show();
		 $("#jqxgridF").hide();
		 $("#jqxgridR").hide();
		 $("#jqxgridS").hide();
		 $("#jqxgridA").hide();
		 $("#pbFgStoneGrid").hide();
		 $("#pbFgAccGrid").hide();
	 }
});

//Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	window.location.href="javascript:showContentPage('purchaseBillDetails', 'bodySwitcher')"
});

//Print Functionality to be done by Venkat
//#######################################
$("#printpbd").on('click', function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var materialTypeS = $("#materialTypeS").val();
	var metalTypeS = $("#metalTypeS").val();
	var locS = $("#locS").val();
	var storeIdS = $("#storeIdS").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (materialTypeS != "" && materialTypeS != null) {
		fieldFilters.fieldFilters["materialType"] = materialTypeS;
	}
	if (metalTypeS != "" && metalTypeS != null) {
		fieldFilters.fieldFilters["metalType"] = metalTypeS;
	}
	if (locS != "" && locS != null) {
		fieldFilters.fieldFilters["location"] = locS;
	}
	if (storeIdS != "" && storeIdS != null) {
		fieldFilters.fieldFilters["storeId"] = storeIdS;
	}		
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : fromDateS,
			"ToDate" : toDateS,
			"locationCode":locS,
			"MaterialType":materialTypeS,
			"SegmentId":metalTypeS,
			"storeId":storeIdS,
			"mode" : "pdf",
			"reportName" : "RPT_PurchaseBill_Location_Wise_Store_Wise"
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
				navigator.msSaveBlob(file, 'RPT_PurchaseBill_Location_Wise_Store_Wise.pdf');
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


$("#export").on("click",function(){
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var materialTypeS = $("#materialTypeS").val();
	var metalTypeS = $("#metalTypeS").val();
	var locS = $("#locS").val();
	var storeIdS = $("#storeIdS").val();
    
	 if ((fromDateS == null || fromDateS == "") || (toDateS == null || toDateS == "")){
			$.growl.error({
				message : "From and To dates are mandatory for Export",
				duration : 10000
			});
			return false;	
		}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (materialTypeS != "" && materialTypeS != null) {
		fieldFilters.fieldFilters["materialType"] = materialTypeS;
	}
	if (metalTypeS != "" && metalTypeS != null) {
		fieldFilters.fieldFilters["metalType"] = metalTypeS;
	}
	if (locS != "" && locS != null) {
		fieldFilters.fieldFilters["location"] = locS;
	}
	if (storeIdS != "" && storeIdS != null) {
		fieldFilters.fieldFilters["storeId"] = storeIdS;
	}	

	var newData = [];
	var rows = $("#jqxgrid").jqxGrid('getrows');
	if(typeof rows == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
	 }else{				
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/exportPBLocationStoreWise',JSON.stringify(fieldFilters),function(response) {
				if (response != null) {
					data = response.payload.list;
					exportPurchaseDetialSideBySide(data);
				}
			});
		}
		 else{
			$.growl.error({
				message : "No Data to Export.",
				duration : 10000
			});
			return false;	
		}
	 }
});


function exportPurchaseDetialSideBySide(data)
{
	var sql0 = 'SEARCH / AS @ud \
		RETURN ( \
		@ud->createdDate AS [Created Date], \
		@ud->[header]->[store]->[name] AS [Store], \
		@ud->header->segment->description AS [M Type], \
		@ud->header->purchaseBillId AS [PB No], \
		@ud->purchaseBillId AS [PB Detail Id], \
		@ud->serialNumber AS [PB Serial No], \
		@ud->location AS [Loc Code], \
		@ud->[header]->[referenceType] AS [Ref Type], \
		@ud->[header]->[referenceDocNo] AS [Ref No], \
		@ud->valuationSlipId AS [Ref SlNo], \
		@ud->[jewelType]->[description] AS [Jew Type], \
		@ud->grossWt AS [Gr Wt], \
		@ud->netWt AS [Net Wt], \
		@ud->pureWt AS [Pure Wt], \
		@ud->purity AS [Purity], \
		@ud->grossAmount AS [Item Amt], \
		@ud->valuatorInputAmt AS [V Input Amt], \
		@ud->ratePerGm AS [Rate Per Gram], \
		@ud->[createdBy] AS [Created By] \
			) \
		FROM $0';
	

	  // Query to get first child records (stones)	
	var sql1 = 'SEARCH / AS @ud\
		pbStoneList / AS @us \
			RETURN ( \
		@ud->purchaseBillId AS [PB Detail Id], \
		@us->srlNo AS [Stone Srl No], \
		@us->stoneCode AS [Stone Code], \
		@us->weight AS [Stone Wt], \
		@us->[segment]->[description] AS [Stone Segment], \
		@us->[category]->[description] AS [Stone Category], \
		@us->subCatDes AS [Stone Subcategory], \
		@us->colorVal AS [Stone Color], \
		@us->clarityVal AS [Stone Clarity], \
		@us->actualColorVal AS [Stone Actual Color], \
		@us->weightSlabVal AS [Stone Wt/Cost Slab], \
		@us->rate AS [Stone Rate], \
		@us->pieces AS [Stone Pcs], \
		@us->uom AS [Stone UQC], \
		@us->cutGradeVal AS [Stone Cut Grade] \
				) \
			FROM $0';

	var sql2 = 'SEARCH / AS @ud\
		pbAccList / AS @ua \
			RETURN ( \
		@ud->purchaseBillId AS [PB Detail Id], \
		@ua->serialNumber AS [Accessory Srl No], \
		@ua->accCode AS [Acc Code], \
		@ua->categoryDes AS [Acc Desc], \
		@ua->weight AS [Acc Wt], \
		@ua->rate AS [Acc Rate], \
		@ua->price AS [Acc Amt], \
		@ua->uom AS [Acc UQC], \
		@ua->pieces AS [Acc Pcs] \
		) \
			FROM $0';

    var sql3 = 'SELECT * FROM ? AS s FULL OUTER JOIN ? AS a ON s.[PB Detail Id] = a.[PB Detail Id] AND s.[Stone Srl No] = a.[Accessory Srl No]';
    
    var sql4 = 'SELECT * FROM ? AS m  OUTER JOIN ? AS o ON m.[PB Detail Id] = o.[PB Detail Id] ';

 var res = null;
    
    var mystyle = {
      cellStyles: true,
      headers:true, 
      column: {style:{Font:{Bold:30}}},
      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
      cells: {1:{1:{
        style: {Font:{Color:"#00FFFF"}}
      }}}
    };
    
    try
    {
    	var i = 0;
    	for(i=0; i<data.length; i++){
    		if(null == data[i].pbStoneList){
    			data[i].pbStoneList = []
    		}
    		if(null == data[i].pbAccList){
    			data[i].pbAccList = []
    		}
    	}
    	
    	// Following code generates export data as Master-Child side-by-side
    	res0 = alasql(sql0,[data]);
    	res1 = alasql(sql1,[data]);
    	res2 = alasql(sql2,[data]);
    	res = alasql(sql3,[res1, res2]);
    	res = alasql(sql4,[res0, res]);
    	adjustObjectKeys(res); 
    	removeNullData(res);
    	res = alasql("SELECT * INTO XLSX('PurchaseBillDetials.xlsx',?) FROM ?",[mystyle, res]);
    }
    catch (err)
    {
    	alert(err.message);
    }
}


$('#viewStoneAccDetModal').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();
});