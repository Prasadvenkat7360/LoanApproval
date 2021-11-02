/*
	##	Author1 (UI)    :   Dipankar
	## 	Author2 (UI)	:   Pooja Sangve
	## 	Author3 (JAVA)	:   Divya
	##	Date Creation 	: 	28-12-2017
	## 	Description		:	Movement of Stones Report-->(Integration)
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

var redirect = function() {
	window.location.href = "javascript:showContentPage('movementStnAccFromToOrder', 'bodySwitcher')";
	return window.location.href;
}

$("#stoneID").show();
$("#accID").hide();
$("#movementType").on('change', function(){
	var value = $(this).val();
	if(value == "stone"){
		$("#stoneID").show();
		$("#accID").hide();
	    $("#jqxgrid").hide();
	}
	if(value == "accessory"){
		$("#stoneID").hide();
		$("#accID").show();
		$("#jqxgrid").hide();
	}
});

//##################################### datePicker ####################################

$("#fromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDate").datepicker('option', 'minDate', min || '0');
    }
});

$("#toDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

//########################################## On-load LOVs ##########################################

///##	Author1 (UI)    :   Raksha H.O

var onloadMovIdLov = function(){
	
	var movIdDetS = {
			"fieldFilters" : {
				"type" : "allMovIds",
				"movType" :"Stone"
			}
		}
	postJSON('/OrderExecution/api/v1/stoneAccMovementReportLovs',JSON.stringify(movIdDetS),function(data) {
		movIds = data.payload.movIds;
		var data = [];
		$.each(movIds, function(key, value) {
			data.push({
				value : value
			});
		});
		$(function() {
			$("#movementId").autocomplete({
				source : data,
				focus : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
				},
				select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
					$("#movementId-value").val(ui.item.value);
				}
			});
		});
	});
} 
onloadMovIdLov();

var onloadFromOrdLov = function(){
	var fOrderDetS = {
			"fieldFilters" : {
				"type" : "allOrderNos",
			}
		}
	postJSON('/OrderExecution/api/v1/stoneAccMovementReportLovs',JSON.stringify(fOrderDetS),function(data) {
		allOrders = data.payload.allOrders;
		var data = [];
		$.each(allOrders, function(key, value) {
			data.push({
				value : value
			});
		});
		$(function() {
			$("#fromOrder").autocomplete({
				source : data,
				focus : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
				},
				select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
					$("#fromOrder-value").val(ui.item.value);
				}
			});
		});
	});
} 
onloadFromOrdLov();

var locationLov = function() {
	var locDetS = {
			"fieldFilters" : {
				"type" : "allLocations",
			}
		}
	postJSON('/OrderExecution/api/v1/stoneAccMovementReportLovs',JSON.stringify(locDetS),function(data) {
		var loaction = data.payload.allLocs;
		
		var f = '<select id="fromLocObj"  name="fromLocObj" class="form-control" multiple="multiple">';   
		$.each(loaction, function(key, val) {
			f +='<option value="' + val.code + '">' + val.locationName + '</option>';
		});
		f +='</select>'; 
		$("#fromLocation").html(f);
		$('#fromLocObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
	
		var t = '<select id="toLocObj"  name="toLocObj" class="form-control" multiple="multiple">';   
		$.each(loaction, function(key, val) {
			t +='<option value="' + val.code + '">' + val.locationName + '</option>';
		});
		t +='</select>'; 
		$("#toLocation").html(t);
		$('#toLocObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
		
	});
}
locationLov();

var onloadLov = function(){
	var dcDetS = {
			"fieldFilters" : {
				"type" : "allDcNames",
			}
		}
	postJSON('/OrderExecution/api/v1/stoneAccMovementReportLovs',JSON.stringify(dcDetS),function(data) {
		$('#dcName').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.allDcs, function(key, val) {
				$('#dcName').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
	});
} 
onloadLov();

var packetLov = function() {
	var packetDetS = {
			"fieldFilters" : {
				"type" : "allPktNos",
			}
		}
	postJSON('/OrderExecution/api/v1/stoneAccMovementReportLovs',JSON.stringify(packetDetS),function(data) {
		var allPkts = data.payload.allPkts;
		
		var f = '<select id="frompktObj"  name="frompktObj" class="form-control" multiple="multiple">';   
		$.each(allPkts, function(key, val) {
			f +='<option value="' + val.packetId + '">' + val.packetId + '</option>';
		});
		f +='</select>'; 
		$("#fromPacket").html(f);
		$('#frompktObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
	
		var t = '<select id="toPktObj"  name="toPktObj" class="form-control" multiple="multiple">';   
		$.each(allPkts, function(key, val) {
			t +='<option value="' + val.packetId + '">' + val.packetId + '</option>';
		});
		t +='</select>'; 
		$("#toPacket").html(t);
		$('#toPktObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
		
	});
}
packetLov();

var stockLov = function() {
	var stockDetS = {
			"fieldFilters" : {
				"type" : "allStockNos",
			}
		}
	postJSON('/OrderExecution/api/v1/stoneAccMovementReportLovs',JSON.stringify(stockDetS),function(data) {
		var allStocks = data.payload.allStocks;
		
		var f = '<select id="fromStkObj"  name="fromStkObj" class="form-control" multiple="multiple">';   
		$.each(allStocks, function(key, val) {
			f +='<option value="' + val.id + '">' + val.id + '</option>';
		});
		f +='</select>'; 
		$("#fromStock").html(f);
		$('#fromStkObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
	
		var t = '<select id="toStkObj"  name="toStkObj" class="form-control" multiple="multiple">';   
		$.each(allStocks, function(key, val) {
			t +='<option value="' + val.id + '">' + val.id + '</option>';
		});
		t +='</select>'; 
		$("#toStock").html(t);
		$('#toStkObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
		
	});
}
stockLov();

var onloadSegLov = function(){
	var segDetS = {
			"fieldFilters" : {
				"type" : "stonesegments",
			}
		}
	postJSON('/OrderExecution/api/v1/stoneAccMovementReportLovs',JSON.stringify(segDetS),function(data) {
		$('#segment').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.mTypes, function(key, val) {
				$('#segment').append('<option value="' + val.id + '">' + val.description + '</option>');
		 });
	});
} 
onloadSegLov();

//########################################### On-Change API'S ######################################

var getResponseLovTo = function(fieldFilters,flag){
 postJSON('/OrderExecution/api/v1/stoneAccMovementReportLovs',JSON.stringify(fieldFilters),function(data) {
     if(flag == 1){
        var result = data.payload.allOrders;  
		var data = [];
		var res = $('#fromOrder').val();
		
		$.each(result, function(key, val) {
				if(res != val){
				data.push({
					value : val
				});
			 }
		});
			$(function() {
					$("#toOrder").autocomplete({
						source : data,
						focus : function(event, ui) {
							event.preventDefault();
							$(this).val(ui.item.value);
						},
						select : function(event, ui) {
							event.preventDefault();
							$(this).val(ui.item.value);
							$("#toOrder-value").val(ui.item.value);
					 }
				 });
		    });
	     }
		if(flag == 2){
			$('#mainCategory').empty().append('<option value="" selected>--Select--</option>');
			$('#subCategory').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.maincats, function(key, val) {
				$('#mainCategory').append('<option value="' + val.id + '">' + val.description + '</option>');
		    });
		 }
		if(flag == 3){
			$('#subCategory').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.subcat, function(key, val) {
				$('#subCategory').append('<option value="' + val.id + '">' + val.description + '</option>');
				 });
			}
    });
}


$("#fromOrder").on('change',function(){
var fromOrder = $("#fromOrder").val();
var fieldFilters = {
		"fieldFilters" : {
			"type" : "allOrderNos",
		}
	}
getResponseLovTo(fieldFilters, 1);
});

$("#segment").on('change',function(){
	var seg  = $("#segment").val()
	var segm = $("#segment option:selected").text();
	if(segm == "Diamond"){
		$("#subCathide").hide();
	}else{
		$("#subCathide").show();
	}
	$('#mainCategory').empty().append('<option value="" selected>--Select--</option>');
	$('#subCategory').empty().append('<option value="" selected>--Select--</option>');
	var fieldFilters = {
		fieldFilters :{
			"type" : "stonesegCategories",
			"segId" : $("#segment").val()
		}
	}
	getResponseLovTo(fieldFilters, 2);
});

$("#mainCategory").on('change',function(){
	var fieldFilters = {
		fieldFilters :{
			"type" : "subCat",
			"segId" : $("#segment").val(),
			"catId": $("#mainCategory").val()
		}
	}
	getResponseLovTo(fieldFilters, 3);
});

//########################################### FieldFilters ############################### 
function fieldFilterValue() {

	fieldFilters = {
		"fieldFilters" : {}
	};

	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var movementId = $('#movementId').val();
	var dcName = $('#dcName').val();
	var fromLocation = $('#fromLocObj').val();
	var toLocation = $('#toLocObj').val();
	var fromPacket = $('#frompktObj').val();
	var toPacket = $('#toPktObj').val();
	var fromOrder = $('#fromOrder').val();
	var toOrder = $('#toOrder').val();
	var fromStock = $('#fromStkObj').val();
	var toStock = $('#toStkObj').val();
	var segment = $('#segment').val();
	var mainCategory = $('#mainCategory').val();
	var subCategory = $('#subCategory').val();
	
	if(fromLocation == null || fromLocation == ""){
		var fromLocationS = "";
	} else{
		var fromLocationS = fromLocation.join(",");
	}
	
	if (fromLocationS != "" && fromLocationS != null) {
		fieldFilters.fieldFilters["fromLoc"] = fromLocationS.toString();
	}
	
	if(toLocation == null || toLocation == ""){
		var toLocationS = "";
	} else{
		var toLocationS = toLocation.join(",");
	}
	
	if (toLocationS != "" && toLocationS != null) {
		fieldFilters.fieldFilters["toLoc"] = toLocationS;
	}
	
	if(fromPacket == null || fromPacket == ""){
		var fromPacketS = "";
	} else{
		var fromPacketS = fromPacket.join(",");
	}
	
	if (fromPacketS != "" && fromPacketS != null) {
		fieldFilters.fieldFilters["fromPkt"] = fromPacketS;
	}
	
	if(toPacket == null || toPacket == ""){
		var toPacketS = "";
	} else{
		var toPacketS = toPacket.join(",");
	}
	
	if (toPacketS != "" && toPacketS != null) {
		fieldFilters.fieldFilters["toPkt"] = toPacketS;
	}
	
	if(toStock == null || toStock == ""){
		var toStockS = "";
	} else{
		var toStockS = toStock.join(",");
	}
	
	if (toStockS != "" && toStockS != null) {
		fieldFilters.fieldFilters["toStock"] = toStockS;
	}
	
	if(fromStock == null || fromStock == ""){
		var fromStockS = "";
	} else{
		var fromStockS = fromStock.join(",");
	}
	
	if (fromStockS != "" && fromStockS != null) {
		fieldFilters.fieldFilters["fromStock"] = fromStockS;
	}

	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}

	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}

	if (movementId != "" && movementId != null) {
		fieldFilters.fieldFilters["movId"] = movementId;
	}

	if (dcName != "" && dcName != null) {
		fieldFilters.fieldFilters["dcId"] = dcName;
	}
	
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segId"] = segment;
	}
	
	if (mainCategory != "" && mainCategory != null) {
		fieldFilters.fieldFilters["mainCatId"] = mainCategory;
	}
	
	if (subCategory != "" && subCategory != null) {
		fieldFilters.fieldFilters["subCatId"] = subCategory;
	}
	
	if (fromOrder != "" && fromOrder != null) {
		fieldFilters.fieldFilters["fromOrder"] = fromOrder;
	}

	if (toOrder != "" && toOrder != null) {
		fieldFilters.fieldFilters["toOrder"] = toOrder;
	}
	return fieldFilters;
}


//############################################# Search code started #######################################

$("#search").on('click', function(){
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
	if((fromDate == ""||fromDate == null)|| (toDate == "" || toDate == null)){
		$.growl.error({
			message : "Please Fill all the manadatory Feilds!!",
			duration : 10000
		});
		return false;
	}else{
		postJSON('/OrderExecution/api/v1/stoneAccMovementReportList',JSON.stringify(fieldFilterValue()),function(data) {
			if(data.resCode == "1"){
				movementStnAccFromToOrderSearchGrid(data.payload.list);
				$("#jqxgrid").show();
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration :10000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});

var movementStnAccFromToOrderSearchGrid = function(response) {
	var source = {
		datafields : [
			{name : 'date', type : 'date'},
			{name : 'fromDc', type : 'string','map':'dcName'},
			{name : 'movId', type : 'long'},
			{name : 'fromType', type : 'long'},
			{name : 'fromPktOrStkOrLocOrOrdNo', type : 'string'},
			{name : 'toType', type : 'long'},
			{name : 'toPktOrStkOrLocOrOrdNo', type : 'string'},
			{name : 'segment', type : 'string',    'map':'segmentDTO>description'},
			{name : 'mainCat', type : 'string',    'map':'mainCat>description'},
			{name : 'SubCat', type : 'string',     'map':'subcat>description'},
			{name : 'articleCode', type : 'string','map':'stoneCode'},
			{name : 'stoneFromWt', type : 'float', 'map':'fromWt'},
			{name : 'stoneToWt', type : 'float',   'map':'toWt'},
			{name : 'clarity', type : 'string',    'map':'clarity'},
			{name : 'actualColor', type : 'string','map':'actualColor'},
			{name : 'color', type : 'string',      'map':'color'},
			{name : 'cutGrade', type : 'string',   'map':'cutgrade'},
			{name : 'pcs', type : 'int'},
			{name : 'stoneWt', type : 'float',     'map':'wt'},
			{name : 'uqc', type : 'string',        'map':'uom'},
			{name : 'sellingRate', type : 'float', 'map':''},
			{name : 'fromOrderSrlNo', type : 'string'},
			{name : 'fromOrderStoneSrlNo', type : 'string'},
			{name : 'toOrderSrlNo', type : 'string'},
			{name : 'toOrderStoneSrlNo', type : 'string'},
			{name : 'Remarks', type : 'string',    'map':'remarks'},
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
        columnsheight: 60,
        columnsresize: true,
    	theme: 'energyblue',
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		altRows : true,
		pageable: true,
		columnsresize : true,
		columns : [ 
			{text : 'Date',datafield : 'date',width : '7%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false, columntype : 'datetimeinput', cellsformat : 'dd/MM/yyyy'},
			{text : 'From DC',datafield : 'fromDc',width : '5%', cellsalign : 'center',align : 'center', sortable : true,editable : false},
			{text : 'Movement Id',datafield : 'movId',width : '6%', cellsalign : 'center',align : 'center', sortable : true,editable : false},
			{text : 'From Ref Doc Type',datafield : 'fromType',width : '6%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'From Ref Doc No',datafield : 'fromPktOrStkOrLocOrOrdNo',width : '6%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'From Ref Doc Sl No',datafield : 'fromOrderSrlNo',width : '6%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'From Stone/Acc No',datafield : 'fromOrderStoneSrlNo',width : '6%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			
			{text : 'To Ref Doc Type',datafield : 'toType',width : '6%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'To Ref Doc No',datafield : 'toPktOrStkOrLocOrOrdNo',width : '6%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'To Ref Doc Srl No',datafield : 'toOrderSrlNo',width : '6%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'To Stone/Acc No',datafield : 'toOrderStoneSrlNo',width : '6%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			
			{text : 'Segment',datafield : 'segment',width : '6%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'Main Category',datafield : 'mainCat',width : '8%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'Sub Category',datafield : 'SubCat',width : '7%',	cellsalign : 'left',align : 'center',	sortable : true,editable : false},
			{text : 'Article Code',datafield : 'articleCode',width : '6%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false,},
			{text : 'Stone From Wt./Cost',datafield : 'stoneFromWt',width : '6%',cellsformat:'d3',cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd3'},
			{text : 'Stone To Wt./Cost',datafield : 'stoneToWt',width : '6%',cellsformat:'d3',cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd3'},
			{text : 'Clarity',datafield : 'clarity',width : '6%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false, cellsformat: 'd3'},
			{text : 'Actual Color',datafield : 'actualColor',width : '7%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'Color',datafield : 'color',width : '7%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'CutGrade',datafield : 'cutGrade',width : '7%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'Pcs',datafield : 'pcs',width : '4%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'Stone Wt.',datafield : 'stoneWt',width : '5%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false ,cellsformat: 'd3'},
			{text : 'UQC',datafield : 'uqc',width : '5%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
			{text : 'Selling Rate',datafield : 'sellingRate',width : '6%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false,cellsformat: 'd2'},
			{text : 'Remarks',datafield : 'Remarks',width : '6%',	cellsalign : 'left',align : 'center',	sortable : true,editable : false},]
	});
}


//############################################ Export Code Started #########################################

$("#export").on('click', function(){
	var data;
    var newData = [];
    var fieldFilters = fieldFilterValue();
     var sysdate = moment().format('DDMMYYYYHHmmSS');
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
			 postJSON('/OrderExecution/api/v1/stoneAccMovementReportExportList',JSON.stringify(fieldFilters),function(response) {
			    if(response != null){
			 	data = response.payload.list;
				for (i = 0; i < data.length; i++) {
				newData.push({
					          'Date' : (data[i].date != null) ? data[i].date : "",
							  'From DC' : (data[i].dcName != null) ? data[i].dcName : "",
							  'Movement Id' : (data[i].movId != null) ? data[i].movId : "",
							  'From Type' : (data[i].fromType != null) ? data[i].fromType : "",
									  
							  'From pkt/Stk/Loc/Order' : (data[i].fromPktOrStkOrLocOrOrdNo != null) ? data[i].fromPktOrStkOrLocOrOrdNo : "",
						      'From Ref Doc Srl No' : (data[i].fromOrderSrlNo != null) ? data[i].fromOrderSrlNo : "",
						      'From Stone/Acc No' : (data[i].fromOrderStoneSrlNo != null) ? data[i].fromOrderStoneSrlNo : "",
							  'To Type' : (data[i].toType != null) ? data[i].toType : "",
							  'To pkt/Stk/Loc/Order' : (data[i].toPktOrStkOrLocOrOrdNo != null) ? data[i].toPktOrStkOrLocOrOrdNo : "",
							  'To Ref Doc Srl No' : (data[i].toOrderSrlNo != null) ? data[i].toOrderSrlNo : "",
							  'To Stone/Acc No' : (data[i].toOrderStoneSrlNo != null) ? data[i].toOrderStoneSrlNo : "",
							  'Segment' : (data[i].segmentDTO != null) ? data[i].segmentDTO.description : "",
									  
							  'Main Category' : (data[i].mainCat != null) ? data[i].mainCat.description : "",
							  'Sub Category' : (data[i].subcat != null) ? data[i].subcat.description : "",
							  'Article Code' : (data[i].stoneCode != null) ? data[i].stoneCode : "",
									  
							  'Stone From Wt./Cost' : (data[i].fromWt != null) ? data[i].fromWt : "",
							  'Stone To Wt./Cost' : (data[i].toWt != null) ? data[i].toWt : "",
							  'Clarity' : (data[i].clarity != null) ? data[i].clarity : "",
							  'Actual Color' : (data[i].actualColor != null) ? data[i].actualColor : "",
									  
							  'Color' : (data[i].color != null) ? data[i].color : "",
							  'CutGrade' : (data[i].cutgrade != null) ? data[i].cutgrade : "",
							  'Pcs' : (data[i].pcs != null) ? data[i].pcs : "",
							  'Stone Wt.' : (data[i].wt != null) ? data[i].wt : "",
									  
							  'UQC' : (data[i].uom != null) ? data[i].uom : "",
							  'Selling Rate' : (data[i].sellingRate != null) ? data[i].sellingRate : "",
						      'Remarks' : (data[i].remarks != null) ? data[i].remarks : ""
                   });		
				}
            var opts = [{sheetid:'Movement_Of_Stones',header:true}];
            var res = alasql('SELECT * INTO XLSX("Movement_Of_Stones_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

//####################### Clear Code Started ####################
$("#clear").on('click', function(){
	
	$('#fromStkObj').multiselect("clearSelection");
	$('#toStkObj').multiselect("clearSelection");
	
	$('#fromLocObj').multiselect("clearSelection");
	$('#toLocObj').multiselect("clearSelection");
	
	$('#frompktObj').multiselect("clearSelection");
	$('#toPktObj').multiselect("clearSelection");
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	
});

$("#clearAcc").on("click",function(){
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
})
//############################################################# Print Code Started #####################################
$("#print").on('click', function(){
	
});