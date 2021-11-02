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

$("#gridTabs").hide();

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};


$(".tabDisabledS").addClass("tabDisabled2");
$("#gridTabs").tabs({
	disabled:[]
});

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
	var gridData = $("#jqxgrid").jqxGrid('getrows');
	$.each(gridData,function(k,v){
		console.log(v);
		if(v.flag == true){
			dataArr1.push(
					{
						"stockOrPacketId": v.stockNo,
					    "stockOrPacket": "Stock",
					    "storeOrDcType": (v.storeCode.startsWith("DC")) ? "DC" : "Store",
					    "storeOrDcId": v.storeDcId
					}
				);
		}
	});
	console.log(dataArr1);
	return dataArr1;
}

$("#storeDc").hide();
//on change of store/dc
$("#storeDCS").change(function(){
	var type = $("#storeDCS").val();
	$("#storeDc").show();
	$.getJSON('/OrderExecution/api/v1/getStoreOrDcs?type='+type,function(data) {
		var storeDc = data.payload.allStoreOrDc;
				// Size Lov
				var d = '<select id="storeDcObj"  name="storeDcObj" class="form-control" multiple="multiple">';
				$.each(storeDc, function(key, val) {
					d += '<option value="' + val.id + '">' + val.name + '</option>';
				});
				
				d += '</select>';
				
				$("#storeDcNameS").html(d);
				
				$("#storeDcObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
			});
		});
});

//on load lov's
var onLoadLov = function(){
$.getJSON('/OrderExecution/api/v1/stockReportLOVs?portal=oe ', function(data) {
	var zones = data.payload.zones;
		$("#statusS").empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.status, function(key, val) {
			$("#statusS").append('<option value="' + val.id + '">' + val.name + '</option>');
		});	
		$("#accCode").empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.accCodes, function(key, val) {
			$("#accCode").append('<option value="' + val.name + '">' + val.description + '</option>');
		})	
});

	$.getJSON('/OrderExecution/api/v1/getVendorLOV?type=A', function(data) {
		
		var vendorCode = data.payload.vCodeList;
		// Vendor Lov
		var v = '<select id="vendorObj"  name="vendorObj" class="form-control" multiple="multiple">';
		$.each(vendorCode, function(key, val) {
			v += '<option value="' + val.id + '">' + val.name + '</option>'; 
		});
			
		v += '</select>';
		$("#vendorCodeS").html(v);
		$("#vendorObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	});
	
	$.getJSON('/OrderExecution/api/v1/getGrvType',function(data){
		var grtype = data.payload.GRV;
		$("#grtype").empty().append('<option value="" selected>--Select--</option>');
		$.each(grtype, function(key, val) {
			$("#grtype").append('<option value="' + val.id + '">' + val.name + '</option>');
		});	
	})
	
	var zone1 = '<select id="zoneObj" class="form-control" multiple="multiple"></select>';
	$("#zoneS").html(zone1);
	$('#zoneObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
}
onLoadLov();


//on change of stoe/dc Name load zone
$("#storeDcNameS").on('change',function(){
	var storeDcObj = $("#storeDcObj").val();
	storeDcObj = storeDcObj.join(',');
		var params ={"fieldFilters":
			 {
				"storeOrDcType":$("#storeDCS").val(),
				"storeOrDcs" : storeDcObj.toString()
			 }
		}
		postJSON('/OrderExecution/api/v1/getZonesForStkIt', JSON.stringify(params), function(data) {
			var z = '<select id="zoneObj"  name="zoneObj" class="form-control" multiple="multiple">';
			$.each(data.payload.zones, function(key, val) {
				z += '<option value="' + val.id + '">' + val.description + '</option>'; 
			});
			
			z += '</select>';
			
			$("#zoneS").html(z);
			
			$("#zoneObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	});	
});

$("#statusS").on('change',function(){
	if($("#statusS").val() == "A"){
		$("#fromDateS").prop('disabled', true);
		$("#toDateS").prop('disabled', true);
	}else{
		$("#fromDateS").prop('disabled', false);
		$("#toDateS").prop('disabled', false);
	}
});


//Field Filters
var accStockItemFieldFilters = function() {
	var statusS = $("#statusS").val();
	var grtype = $("#grtype").val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var zoneS = $('#zoneS').val();
	var accCode = $('#accCode').val();
	var vendorS = $("#vendorCodeS").val();
	var storeOrDc = $("#storeDCS").val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if(grtype != "" && grtype != null){
		fieldFilters.fieldFilters["jwtype"] = grtype
	}
	
	if(storeOrDc != "" && storeOrDc != null){
		fieldFilters.fieldFilters["storeOrDc"] = storeOrDc
	}
	
	if(statusS != "" && statusS != null){
		fieldFilters.fieldFilters["status"] = statusS
	}
		
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	var storeDcObj = $("#storeDcObj").val();
	if(storeDcObj == null || storeDcObj == ""){
		var storeDcNameS = "";
	} else{
		var storeDcNameS = storeDcObj.join(",");
	}
	if(storeDcNameS != null && storeDcNameS !=""){
		fieldFilters.fieldFilters["stores"] = storeDcNameS;
	}
	var zoneObj = $('#zoneObj').val();
	if (zoneObj == null || zoneObj == "") {
		var zoneS = "";
	} else {
		var zoneS = zoneObj.join(",");
	}
	if (zoneS != "" && zoneS != null) {
		fieldFilters.fieldFilters["zones"] = zoneS;
	}
	var vendorObj = $('#vendorObj').val();
	if (vendorObj == null || vendorObj == "") {
		var vendorS = "";
	} else {
		var vendorS = vendorObj.join(",");
	}
	if (vendorS != "" && vendorS != null) {
		fieldFilters.fieldFilters["vendorIds"] = vendorS;
	}
	if(accCode != "" && accCode !=null){
		fieldFilters.fieldFilters["accessoryCode"] = accCode;
	}
	return fieldFilters;
}



var accStockItemSearchGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'storeCode','type' : 'string','map' : 'storeDc>name'},
				{'name':'storeDcId','type':'int','map':'storeDc>id'},
				{'name' : 'zone','type' : 'string','map' : 'zone>description'}, 
				{'name' : 'accCode','type' : 'string','map' : 'accCode'},
				{'name' : 'accDesc','type' : 'string','map' : 'description'},
				{'name' : 'stockNo','type' : 'int','map' : 'id'},
				{'name' : 'pcs','type' : 'int','map' : 'pieces'}, 
				{'name' : 'accWt','type' : 'float','map' : 'weight'},
				{'name' : 'uom','type' : 'string','map' : 'uom'}, 
				{'name' : 'vendorCode','type' : 'string','map' : 'vendor>name'}, 
				{'name' : 'grDate','type' : 'date','map' : 'grDate'},
				{'name' : 'itemStatus','type' : 'string','map' : 'status'},
				{'name' : 'itemStatusDate','type' : 'date','map' : 'statusDatee'},
				{'name' : 'accGrNo','type' : 'int','map' : 'accGrNo'},
				{'name' : 'accGrSrlNo','type' : 'int','map' : 'accGrSrlNo'},
				{'name' : 'itemCost','type' : 'float','map' : 'costAmt'},
				{'name' : 'itemSp','type' : 'float','map' : 'sellingPrice'}, 
				{'name' : 'remarks','type' : 'string','map' : 'remarks'},
				{'name' : 'noOfDays','type' : 'int','map' : 'noOfDays'},
				{'name' : 'mrvType','type' : 'string','map' : 'jType'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	var columnCheckBox = null;

	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 85,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		editable :true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		columns : [
			{'text' : '','datafield' : '',cellsalign : 'center',columntype : 'checkbox',align : 'center','width' : '4%',sortable : false,
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					console.log(newvalue);
					$('#jqxgrid').jqxGrid ('setcellvalue', row, 'flag',  newvalue);
					}
			},
			{'text' : 'flag','datafield' : 'flag','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : 'flag','datafield' : 'storeDcId','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},

			{'text' : 'Store/DC Name','datafield' : 'storeCode','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
			{'text' : 'Zone','datafield' : 'zone','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'GRV Type','datafield' : 'mrvType','width' : '7%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'Accessory Code','datafield' : 'accCode','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Accessory Desc','datafield' : 'accDesc','width' : '10%',editable : false,sortable : false,cellsalign : 'left',align : 'center'}, 
			{'text' : 'Stock No','datafield' : 'stockNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Wt.','datafield' : 'accWt','width' : '5%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uom','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'GR Date','datafield' : 'grDate','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'},
			{'text' : 'Item Status','datafield' : 'itemStatus','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Date','datafield' : 'itemStatusDate','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'} ,
			{'text' : 'Ref Doc No','datafield' : 'accGrNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Ref Doc Srl No','datafield' : 'accGrSrlNo','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Item Cost','datafield' : 'itemCost','width' : '5%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Item Selling Price','datafield' : 'itemSp','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'No. Of Days','datafield' : 'noOfDays','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			//{'text' : 'Remarks','datafield' : 'remarks','width' : '8%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
		]
	});
}

$("#search").on("click",function(){
   var status =	$("#statusS").val();
   if(status == null || status == ""){
		$.growl.error({
			message : "Please fill mandatory field.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		postJSON('/OrderExecution/api/v1/searchLooseAccessory',JSON.stringify(accStockItemFieldFilters()),function(data) {
			if(data.resCode == "1"){
				activaTab('tab0default');
				$("#gridTabs").show();
				accStockItemSearchGrid(data.payload.list);
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
   
})

$("#historyDetails").click(function () {
		var params = selectedCheckBox();
		console.log(params)
		postJSON('/OrderExecution/api/v1/looseAccStockHistory',JSON.stringify(params),function(response) {
			if(response.resCode == 1){
				var data = response.payload.history;
				itemHistoryGrid(data);
				$('#jqxgridHist').show();
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

var itemHistoryGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stockNo','type' : 'int','map':'stockOrPacketId'},
			{'name' : 'docType','type' : 'string','map':'docType'},
			{'name' : 'docDate','type' : 'date','map':'docDate'},
			{'name' : 'docNo','type' : 'int','map':'docNo'},

			{'name' : 'docSrlNo','type' : 'int','map':'docSrlNo'},
			{'name' : 'docStoreDcType','type' : 'string','map':'docStoreOrDc'}, 
			{'name' : 'docStoreDcName','type' : 'string','map':'docStoreOrDcId'},
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridHist").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		showstatusbar: false,
 	    statusbarheight: 30,
 	    showaggregates: true,
		columns : [
			{'text' : 'Stock No','datafield' : 'stockNo','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Doc Type','datafield' : 'docType','width' : '15%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc Date','datafield' : 'docDate','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
			{'text' : 'Doc Number','datafield' : 'docNo','width' : '15%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc Srl No','datafield' : 'docSrlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Doc Store/DC','datafield' : 'docStoreDcType','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Doc Store/DC Name','datafield' : 'docStoreDcName','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		]
	});
}

// Export Functionality
$("#export").on("click",function() {
	 var sysdate = moment().format('DDMMYYYYHHmmSS');
	 var data;
	 var newData = [];
   
	 var sysdate = moment().format('DDMMYYYYHHmmSS');
	 var rows = $("#jqxgrid").jqxGrid('getrows');
	 if(typeof rows == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
		}
	 else{			
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/exportLooseAccessory',JSON.stringify(accStockItemFieldFilters()),function(response) {
				if(response != null){
					data = response.payload.list;
					for (i = 0; i < data.length; i++) {
						newData.push({
							'Store/DC Name' : (data[i].storeDc != null) ? data[i].storeDc.name : "",
							'Zone' : (data[i].zone!= null) ? data[i].zone.description  : "",	
							'GRV Type' : (data[i].jType!= null) ? data[i].jType  : "",	
							'Accessory Code' : (data[i].accCode != null) ? data[i].accCode : "",
							'Accessory Desc' : (data[i].description != null) ? data[i].description : "",	
							'Stock No' :  (data[i].id !=null) ? data[i].id : "",
							'Pcs' : (data[i].pieces != null) ? data[i].pieces : "",
							'Acc Wt' : (data[i].weight != null) ? data[i].weight : "",
							'UQC' : (data[i].uom != null) ? data[i].uom : "",
							'Vendor Code' : (data[i].vendor != null) ? data[i].vendor.name : "",
							'GR Date' : (data[i].grDate != null) ? data[i].grDate : "",
							'Item Status' : (data[i].status != null) ? data[i].status : "",
							'Item Status Date' : (data[i].statusDatee != null) ? data[i].statusDatee : "",
							'Item Status' : (data[i].status != null) ? data[i].status : "",
							'Ref Doc No.' : (data[i].accGrNo != null) ? data[i].accGrNo : "",
							'Ref Doc Sl No.' : (data[i].accGrSrlNo != null) ? data[i].accGrSrlNo : "",
							'Item Cost' : (data[i].costAmt != null) ? data[i].costAmt : "",
							'Item Selling Price' : (data[i].sellingPrice != null) ? data[i].sellingPrice : "",
						    'No of Days' : (data[i].noOfDays != null) ? data[i].noOfDays : "",
							'Remarks' : (data[i].remarks != null) ? data[i].remarks : "",
				           });
					}
               var opts = [{sheetid:'Acc_Stock_Item_Report',header:true}];
               var res = alasql('SELECT * INTO XLSX("Acc Stock Item Report_'+sysdate+'.xlsx",?) FROM ?', [opts,[newData]]);
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


$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('accStockItem', 'bodySwitcher')"
});

