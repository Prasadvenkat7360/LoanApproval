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
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	maxDate : 0,
	dateFormat: "dd/mm/yy",
});

//on load LOV for Metal Segment
var onLoadFunction = function() {
	$.getJSON('/OrderExecution/api/v1/salesBillDiscountReportLOVs',function(data) {
		
		var stores = data.payload.stores;
		var metalSegments = data.payload.metalSegments;
		var materialTypes = data.payload.materialTypes;
		var billNo = data.payload.billNos;
		
		$('#storeCodeS').empty().append('<option value="" selected>--Select--</option>');	
		$.each(stores, function(key, val) {
			$('#storeCodeS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
			
		// Article Segment Lov
		var a = '<select id="artSegObj"  name="artSegObj" class="form-control" multiple="multiple">';
		$.each(metalSegments, function(key, val) {
			a += '<option value="' + val.id + '">' + val.description + '</option>'; 
		});	
		a += '</select>';
		
		$("#artSegS").html(a);
		$("#artSegObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
			
	  // Material Type Lov
		var m = '<select id="matTypeObj"  name="matTypeObj" class="form-control" multiple="multiple">';
		$.each(materialTypes, function(key, val) {
			m += '<option value="' + val.id + '">' + val.name + '</option>'; 
		});
		m += '</select>';
		
		$("#matTypeS").html(m);
		$("#matTypeObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
		
		var data = [];
		
		$.each(billNo, function(key, value) {
			data.push({ value : value.id });
		});
		
		$("#billNo").autocomplete({
			source : data,
			focus : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.value);
			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.value);
				$("#billNo-value").val(ui.item.value);
			}
		});
	});
}

onLoadFunction();

//Bill Discount Field Filters
var billDiscountFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var storeCodeS = $('#storeCodeS').val();
	var artSegS = $('#artSegS').val();
	var matTypeS = $('#matTypeS').val();
	var billNo = $('#billNo').val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (storeCodeS != "" && storeCodeS != null) {
		fieldFilters.fieldFilters["storeId"] = storeCodeS;
	}
	var artSegObj = $('#artSegObj').val();
	if (artSegObj == null || artSegObj == "") {
		var artSegS = "";
	} else {
		var artSegS = artSegObj.join(",");
	}
	if (artSegS != "" && artSegS != null) {
		fieldFilters.fieldFilters["segmentId"] = artSegS;
	}
	
	var matTypeObj = $('#matTypeObj').val();
	if (matTypeObj == null || matTypeObj == "") {
		var matTypeS = "";
	} else {
		var matTypeS = matTypeObj.join(",");
	}
	if (matTypeS != "" && matTypeS != null) {
		fieldFilters.fieldFilters["materialType"] = matTypeS;
	}
	if (billNo != "" && billNo != null) {
		fieldFilters.fieldFilters["billNo"] = billNo;
	}
	return fieldFilters;
}

//Search Grid Started
function solitaireSetJewelleryGrid() {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	var datafields = [ 
		{'name' : 'storeName','type' : 'string','map' : 'saleBill>store>name'}, 
		{'name' : 'createdDate','type' : 'date','map' : 'createdDate'}, 
		{'name' : 'billNo','type' : 'int','map' : 'saleBill>saleBillId'}, 
		{'name' : 'billSl','type' : 'int','map' : 'serialNo'}, 
		{'name' : 'custName','type' : 'string','map' : 'saleBill>custName'},
		{'name' : 'matType','type' : 'string','map' : 'materialType'}, 
		{'name' : 'refNo','type' : 'int','map' : 'refDocNo'}, 
		{'name' : 'refSl','type' : 'int','map' : 'refDocSrlNo'}, 
		{'name' : 'vCode','type' : 'string','map' : 'vendorDTO>vendorCode'}, 
		{'name' : 'articalSegment','type' : 'string','map' : 'segmentDTO>description'}, 
		{'name' : 'jewelType','type' : 'string','map' : 'jewelTypeDTO>description'}, 
		{'name' : 'mPurity','type' : 'long','map' : 'meltingPurity'}, 
		{'name' : 'pcs','type' : 'int','map' : 'pieces'}, 
		{'name' : 'gWt','type' : 'float','map' : 'grossWeight'}, 
		{'name' : 'netWt','type' : 'float','map' : 'netWeight'}, 
		{'name' : 'lineItemCost','type' : 'float','map' : 'lineItemCost'}, 
		{'name' : 'billAmount','type' : 'float','map' : 'billItemValue'},
		{'name' : 'ldisAmt','type' : 'float','map' : 'loyaltyDiscountAmount'},
		{'name' : 'pdisAmt','type' : 'float','map' : 'promotionalDiscountAmount'},
		{'name' : 'mdisAmt','type' : 'float','map' : 'manualDiscountAmount'},
		{'name' : 'disPerctage','type' : 'float','map' : 'promotionalDiscountPerc'},
		{'name' : 'finalBillAmt','type' : 'float','map' : 'billItemValueWithTax'},
		{'name' : 'gpPercAftDisc','type' : 'float','map':'gpPercAfterDisc'},
		{'name' : 'seName','type' : 'string','map' : 'createdBy'},
		{'name' : 'authorisedBy','type' : 'string','map':'authoriseBy'}
	];

	var columns = [ 
		{'text' : 'Store Name','datafield' : 'storeName','width' : '6%',editable : false,cellsalign : 'center',align : 'center',sortable : false, groupable: true}, 
		{'text' : 'Bill Date','datafield' : 'createdDate','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true,groupable: false,cellsformat : 'dd/MM/yyyy'}, 
		{'text' : 'Bill No','datafield' : 'billNo','width' : '3%',editable : false,sortable : true,cellsalign : 'center',align : 'center',groupable: true}, 
		{'text' : 'Bill Sl','datafield' : 'billSl','width' : '3%',editable : false,	sortable : false,cellsalign : 'center',	align : 'center',groupable: true}, 
		{'text' : 'Customer Name','datafield' : 'custName','width' : '5%',editable : false,	sortable : false,cellsalign : 'center',align : 'center',groupable: false},
		{'text' : 'Material Type','datafield' : 'matType','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',groupable: true}, 
		{'text' : 'Ref No','datafield' : 'refNo','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center',groupable: false}, 
		{'text' : 'Ref Sl','datafield' : 'refSl','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center',groupable: false}, 
		{'text' : 'Vendor Code','datafield' : 'vCode','width' : '5%',editable : false,sortable : false,	cellsformat : 'd3',cellsalign : 'center',align : 'center',groupable: false}, 
		{'text' : 'Article Segment','datafield' : 'articalSegment','width' : '4%',editable : false,sortable : true,cellsformat : 'd3',cellsalign : 'center',align : 'center',groupable: false}, 
		{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center',groupable: false}, 
		{'text' : 'Melting Purity','datafield' : 'mPurity','width' : '4%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center',groupable: false}, 
		{'text' : 'Pcs','datafield' : 'pcs','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center',groupable: false}, 
		{'text' : 'Gross Wt','datafield' : 'gWt','width' : '3.5%',editable : false,sortable : false,cellsformat : 'd3',cellsalign : 'right',align : 'center',groupable: false}, 
		{'text' : 'Net Wt','datafield' : 'netWt','width' : '3%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Line Item Cost','datafield' : 'lineItemCost','width' : '5%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',groupable: false}, 
		{'text' : 'Gross Amt','datafield' : 'billAmount','width' : '4%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center',groupable: false}, 
		{'text' : 'Loyalty Discount Amt','datafield' : 'ldisAmt','width' : '4%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center',groupable: false}, 
		{'text' : 'Promotion Discount Amt','datafield' : 'pdisAmt','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',groupable: false,cellsformat : 'd2'}, 
		{'text' : 'Manual Discount Amt','datafield' : 'mdisAmt','width' : '4%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center',groupable: false}, 
		{'text' : 'Promotion Disc %','datafield' : 'disPerctage','width' : '4%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center',groupable: false}, 
		{'text' : 'Final Gross Amt','datafield' : 'finalBillAmt','width' : '4%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center',groupable: false}, 
		{'text' : 'GP % After Disc',	'datafield' : 'gpPercAftDisc','width' : '4%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center',groupable: false}, 
		{'text' : 'SE Name','datafield' : 'seName','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',groupable: false}, 
		{'text' : 'Authorised By','datafield' : 'authorisedBy','width' : '4.5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',groupable: false}
	];
	
	showMyGrid(datafields, "/OrderExecution/api/v1/searchBillDiscountReport?page=search","list", columns,billDiscountFieldFilters(), updateRows, "");
	
	var objArray = [];
	var getSumRows = function(data){
		var gWt = 0.00;
		var netWt  = 0.00;
		var pcs = 0;
		var lineItemCost = 0;
		var disAmt = 0;
		var billAmount = 0;
		var disPerctage = 0;
		var finalBillAmt = 0;
		var gpPercAftDisc = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].gWt != null){
				gWt = gWt + parseFloat(data[i].gWt);
			}
			
			if(data[i].netWt != null){
				netWt = netWt + parseFloat(data[i].netWt);
			}
			
			if(data[i].pcs != null){
				pcs = pcs + data[i].pcs;
			}
			if(data[i].lineItemCost != null){
				lineItemCost = lineItemCost + data[i].lineItemCost;
			}
			if(data[i].disAmt != null){
				disAmt = disAmt + data[i].disAmt;
			}
			if(data[i].billAmount != null){
				billAmount = billAmount + data[i].billAmount;
			}
			if(data[i].disPerctage != null){
				disPerctage = disPerctage + data[i].disPerctage;
			}
			if(data[i].finalBillAmt != null){
				finalBillAmt = finalBillAmt + data[i].finalBillAmt;
			}
			if(data[i].gpPercAftDisc != null){
				gpPercAftDisc = gpPercAftDisc + data[i].gpPercAftDisc;
			}
		}
		objArray['grossWeight'] = gWt.toFixed(3);
		objArray['netWeight'] = netWt.toFixed(3);
		objArray['pcs'] = pcs;
		objArray['lineItemCost'] = lineItemCost.toFixed(2);
		objArray['disAmt'] = disAmt.toFixed(2);
		objArray['billAmount'] = billAmount.toFixed(2);
		objArray['disPerctage'] = disPerctage.toFixed(2);
		//objArray['finalBillAmt'] = finalBillAmt.toFixed(2);
		objArray['gpPercAftDisc'] = gpPercAftDisc.toFixed(2);
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Gross Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['grossWeight'] + '</span> <b>Net Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['netWeight']  + '</span><b> Pcs </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['pcs']  + '</span>' + '<span>' + "<b> Item Cost</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['lineItemCost'] + '</span><b> Bill Amt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['billAmount'] + '</span><b> Disc Amt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['disAmt'] + '</span><b> Disc % </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['disPerctage'] + '</span><b> Final Bill Amt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['finalBillAmt']  + '</span><b> GP % </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['gpPercAftDisc'] +'</span></span></div>';
	};
	
	$("#jqxgrid").jqxGrid({
		width : '105%',
		height: '355px',
		autoheight : false,
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 50,
		theme: 'energyblue',
		columnsheight: 80,
		rowdetails : true,
		groupable: true,
 	    statusbarheight: 20,
 	    groupsrenderer: groupsrenderer
	});
}

$("#search").on('click',function(){
	var fDate = $("#fromDateS").val();
	var tDate = $("#toDateS").val();
	if(fDate == "" || fDate == null || tDate == "" || tDate == null){
		$.growl.error({
			message : "Please Fill Mandatory Fields!!!",
			duration : 10000,
			title :'error'
		});
		return false;
	}else{
		solitaireSetJewelleryGrid();
		$("#jqxgrid").show();
	}
});

//Clear grid and reset input and Drop down value
$('#clearAll').on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$('#artSegObj').multiselect("clearSelection");

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('billDiscount', 'bodySwitcher')"
});


//###################### Export functionality #######################

$("#export").on("click",function() {
		var data;
	    var newData = [];
	    var fromDateS = $('#fromDateS').val();
		var toDateS = $('#toDateS').val();
		var storeCodeS = $('#storeCodeS').val();
		var artSegS = $('#artSegS').val();
		var matTypeS = $('#matTypeS').val();
		var billNo = $('#billNo').val();
		fieldFilters = {
			"fieldFilters" : {}
		};
		if (fromDateS != "" && fromDateS != null) {
			fieldFilters.fieldFilters["fromDate"] = fromDateS;
		}
		if (toDateS != "" && toDateS != null) {
			fieldFilters.fieldFilters["toDate"] = toDateS;
		}
		var storeObj = $('#storeObj').val();
		if (storeObj == null || storeObj == "") {
			var storeCodeS = "";
		} else {
			var storeCodeS = storeObj.join(",");
		}
		if (storeCodeS != "" && storeCodeS != null) {
			fieldFilters.fieldFilters["storeId"] = storeCodeS;
		}
		
		var artSegObj = $('#artSegObj').val();
		if (artSegObj == null || artSegObj == "") {
			var artSegS = "";
		} else {
			var artSegS = artSegObj.join(",");
		}
		if (artSegS != "" && artSegS != null) {
			fieldFilters.fieldFilters["segmentId"] = artSegS;
		}
		
		var matTypeObj = $('#matTypeObj').val();
		if (matTypeObj == null || matTypeObj == "") {
			var matTypeS = "";
		} else {
			var matTypeS = matTypeObj.join(",");
		}
		if (matTypeS != "" && matTypeS != null) {
			fieldFilters.fieldFilters["materialType"] = matTypeS;
		}
		if (billNo != "" && billNo != null) {
			fieldFilters.fieldFilters["billNo"] = billNo;
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
				var rows = $("#jqxgrid").jqxGrid('getdatainformation');
				if(rows.rowscount != 0){
				postJSON('/OrderExecution/api/v1/searchBillDiscountReport?page=export',JSON.stringify(fieldFilters),function(response) {
			   if(response != null){
             data = response.payload.list;
             for (i = 0; i < data.length; i++) {
				newData.push({
	                'Store Name' : (data[i].saleBill != null) ? data[i].saleBill.store.name : "",
					'Bill Date' : (data[i].createdDate != null) ? data[i].createdDate: "",
					'Bill No' : (data[i].saleBill!= null) ? data[i].saleBill.saleBillId : "",		
					'Bill Sl' : (data[i].serialNo!= null) ? data[i].serialNo: "",
					'Customer Name' : (data[i].saleBill != null) ? data[i].saleBill.custName : "",
					'Material Type' : (data[i].materialType != null) ? data[i].materialType : "",
					'Ref No' : (data[i].refDocNo != null) ? data[i].refDocNo : "",
					
					'Ref Sl' : (data[i].refDocSrlNo != null) ? data[i].refDocSrlNo : "",		
					'Vendor Code' : (data[i].vendorDTO != null) ? data[i].vendorDTO.vendorCode : "",	
					'Article Segment' : (data[i].segmentDTO != null) ? data[i].segmentDTO.description : "",
					'Jewel Type' : (data[i].jewelTypeDTO != null) ? data[i].jewelTypeDTO.description : "",
					'Melting Purity' : (data[i].meltingPurity!= null) ? data[i].meltingPurity  : "",		
					
					'Pcs' : (data[i].pieces != null) ? data[i].pieces : "",
					'Gross Wt' : (data[i].grossWeight != null) ? data[i].grossWeight : "",
					
					'Net Wt' : (data[i].netWeight != null) ? data[i].netWeight : "",
					'Line Item Cost' : (data[i].lineItemCost != null) ? data[i].lineItemCost : "",
					'Gross Amt' : (data[i].billItemValue != null) ? data[i].billItemValue : "",
				    "Loyalty Discount Amount" : (data[i].loyaltyDiscountAmount != null) ? data[i].loyaltyDiscountAmount : "", 	
				    "Promotion Discount Amt" :(data[i].promotionalDiscountAmount != null) ? data[i].promotionalDiscountAmount : "",
					"Manual Discount Amount " :(data[i].manualDiscountAmount != null) ?data[i].manualDiscountAmount : "",
			   		"Promotion Discount %" : (data[i].promotionalDiscountPerc != null) ? data[i].promotionalDiscountPerc : "",
			   		"Final Gross Amt" :(data[i].billItemValueWithTax != null) ? data[i].billItemValueWithTax : "",
					'GP % After Disc' : (data[i].gpPercAfterDisc != null ? data[i].gpPercAfterDisc : ""),
					'SE Name' : (data[i].saleBill != null) ? data[i].saleBill.store.name : "",
					'Authorised By ' :(data[i].authoriseBy != null) ? data[i].authoriseBy : "",
              });
          }
       //JSONToCSVConvertor(newData, "Bill Discount Report" + "_" + sysdate, true);
             var opts = [{sheetid:'Bill_Discount_Report',header:true}];
             var res = alasql('SELECT * INTO XLSX("Bill Discount Report_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

//Print Functionality to be done by Venkat
//#######################################
$("#printbdr").on('click', function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var storeCodeS = $('#storeCodeS').val();
	var artSegS = $('#artSegS').val();
	var matTypeS = $('#matTypeS').val();
	var billNo = $('#billNo').val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	var storeObj = $('#storeObj').val();
	if (storeObj == null || storeObj == "") {
		var storeCodeS = "";
	} else {
		var storeCodeS = storeObj.join(",");
	}
	if (storeCodeS != "" && storeCodeS != null) {
		fieldFilters.fieldFilters["storeId"] = storeCodeS;
	}
	
	var artSegObj = $('#artSegObj').val();
	if (artSegObj == null || artSegObj == "") {
		var artSegS = "";
	} else {
		var artSegS = artSegObj.join(",");
	}
	if (artSegS != "" && artSegS != null) {
		fieldFilters.fieldFilters["segmentId"] = artSegS;
	}
	
	var matTypeObj = $('#matTypeObj').val();
	if (matTypeObj == null || matTypeObj == "") {
		var matTypeS = "";
	} else {
		var matTypeS = matTypeObj.join(",");
	}
	if (matTypeS != "" && matTypeS != null) {
		fieldFilters.fieldFilters["materialType"] = matTypeS;
	}
	if (billNo != "" && billNo != null) {
		fieldFilters.fieldFilters["billNo"] = billNo;
	}
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : fromDateS,
			"ToDate" : toDateS,
			"storeId":storeCodeS,
			"ArticleSegment":artSegS,
			"MaterialType":matTypeS,
			"saleBillId":billNo,
			"mode" : "pdf",
			"reportName" : "RPT_Bill_Discount"
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
				navigator.msSaveBlob(file, 'RPT_Bill_Discount.pdf');
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