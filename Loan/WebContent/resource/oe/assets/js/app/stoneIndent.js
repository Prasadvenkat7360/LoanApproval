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

var updates = new Object();
$("#invoiceDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
    maxDate : 0
});


//date picker functions
$("#orderFromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : false,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#orderToDate").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#orderToDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});


stonePOLOV();
var rowId = 0;
var stoneReceipts = null;
$('input:radio[name="POListing"]').filter('[value="1"]').attr('checked',true);
$("#stoneMRVPOListing").hide();
$("#stoneMIVPOListing").hide();
$('input[name=POListing]:radio').click(function() {
	var selectedVal = $(this).val();
	if (selectedVal == 1) {
		$('#stPOMRV')[0].reset();
		$('#stPOMIV')[0].reset();
		stonePOLOV();
		$("#stonePOListing").show();
		$("#stoneMRVPOListing").hide();
		$("#stoneMIVPOListing").hide();
		
		$("#stonePOMIVGrid").jqxGrid('clear');
		$("#stonePOMIVGrid").hide();
		$("#stonePOMRVGrid").jqxGrid('clear');
		$("#stonePOMRVGrid").hide();

	} else if (selectedVal == 2) {
		$('#stPO')[0].reset();
		$('#stPOMIV')[0].reset();
		stonePOMrvLOV();
		$("#stonePOListing").hide();
		$("#stoneMRVPOListing").show();
		$("#stoneMIVPOListing").hide();
		
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
		$("#stonePOMIVGrid").jqxGrid('clear');
		$("#stonePOMIVGrid").hide();
	} else if (selectedVal == 3) {
		$('#stPO')[0].reset();
		$('#stPOMRV')[0].reset();
		stonePOMivLOV();
		$("#stonePOListing").hide();
		$("#stoneMRVPOListing").hide();
		$("#stoneMIVPOListing").show();
		
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
		$("#stonePOMRVGrid").jqxGrid('clear');
		$("#stonePOMRVGrid").hide();
	}
});

	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; // January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = dd+'/'+mm+'/'+yyyy;
	/* From Date to datepicker with masking of date */
	$(document).on('click', '#orderFromDateMRV', function () {
        var me = $("#orderFromDateMRV");
        var selectedDate =  $("#orderFromDateMRV").val();
        me.datepicker({
          showOn: 'focus',
          changeMonth: true,
          changeYear: true,
          dateFormat:"dd/mm/yy",
            onSelect: function( selectedDate ) {
                $( "#orderToDateMRV" ).datepicker( "option", "minDate", selectedDate );
            }
        }).focus();
        me.mask('99/99/9999');

    }).on('select', '#orderFromDateMRV', function () {
        var me = $("#orderFromDateMRV");
    }).on("change", function (e) {

    });
	
    $(document).on('click', '#orderToDateMRV', function () { 
        var me = $("#orderToDateMRV");
        me.datepicker({
          showOn: 'focus',
          changeMonth: true,
	      changeYear: true,
	      dateFormat:"dd/mm/yy",
	      minDate:$("#orderFromDateMRV").val()
        }).focus();
        me.mask('99/99/9999');
    }).on('select', '#orderToDateMRV', function () {
        var me = $("#orderToDateMRV");
    });
    
    $(document).on('click', '#orderFromDateMIV', function () {
        var me = $("#orderFromDateMIV");
        var selectedDate =  $("#orderFromDateMIV").val();
        me.datepicker({
          showOn: 'focus',
          changeMonth: true,
          changeYear: true,
          dateFormat:"dd/mm/yy",
            onSelect: function( selectedDate ) {
                $( "#orderToDateMIV" ).datepicker( "option", "minDate", selectedDate );
            }
        }).focus();
        me.mask('99/99/9999');

    }).on('select', '#orderFromDateMIV', function () {
        var me = $("#orderFromDateMIV");
    }).on("change", function (e) {

    });
	
    $(document).on('click', '#orderToDateMIV', function () { 
        var me = $("#orderToDateMIV");
        me.datepicker({
          showOn: 'focus',
          changeMonth: true,
	      changeYear: true,
	      dateFormat:"dd/mm/yy",
	      minDate:$("#orderFromDateMIV").val()
        }).focus();
        me.mask('99/99/9999');
    }).on('select', '#orderToDateMIV', function () {
        var me = $("#orderToDateMIV");
    });
    
    $(document).on('click', '#stonePOdtMRV', function () {
        var me = $("#stonePOdtMRV");
        var selectedDate =  $("#stonePOdtMRV").val();
        me.datepicker({
          showOn: 'focus',
          changeMonth: true,
          changeYear: true,
          dateFormat:"dd/mm/yy",
        }).focus();
        me.mask('99/99/9999');

    }).on('select', '#stonePOdtMRV', function () {
        var me = $("#stonePOdtMRV");
    });

function stonePOLOV() {
	getJSON('/OrderExecution/api/v1/stoneIndentLOV?page=pending', function(data) {
		if(data.resCode == 1){
			var $stoneSegment = $('#stoneSegment');
			var $status = $('#status');
			//iterate over the data and append a select option
			if(null != data.payload.mTypes || '' != data.payload.mTypes || 'undefined' != data.payload.mTypes){
				$stoneSegment.empty();
				$stoneSegment.append('<option value=""> --Select-- </option>');
				$.each(data.payload.mTypes, function(key, val) {
					$stoneSegment.append('<option value="' + val.id + '">' + val.description
							+ '</option>');
				})
			}
			if(null != data.payload.status || '' != data.payload.status || 'undefined' != data.payload.status){
				$status.empty();
				$status.append('<option value=""> --Select-- </option>');
				$.each(data.payload.status, function(key, val) {
					$status.append('<option value="' + val.id + '">' + val.name
							+ '</option>');
				})
			}
			actionType = data.payload.action;
		
			
		}
		
	});

}

function stonePOMrvLOV() {
	getJSON('/OrderExecution/api/v1/stoneIndentLOV?page=stonePOMRV', function(data) {
	
		if(data.resCode == 1){
			var $stoneSegmentMRV = $('#stoneSegmentMRV');
			var $typesMRV = $('#typesMRV');
			var $vendorCodeMRV = $('#vendorCodeMRV');
			var $mrvNos = $('#mrvNos');
			var $mrvStatus = $('#mrvStatus');
			var $parcelIdsMRV = $('#parcelIdsMRV');
			var $stIndentNo = $('#stIndentNo');
			
			
			//iterate over the data and append a select option
			if(null != data.payload.mTypes || '' != data.payload.mTypes || 'undefined' != data.payload.mTypes){
				$stoneSegmentMRV.empty();
				$stoneSegmentMRV.append('<option value="">--Select--</option>');
				$.each(data.payload.mTypes, function(key, val) {
					$stoneSegmentMRV.append('<option value="' + val.id + '">' + val.description + '</option>');
				})
			}
			if(null != data.payload.mrvTypes || '' != data.payload.mrvTypes || 'undefined' != data.payload.mrvTypes){
				$typesMRV.empty();
				$typesMRV.append('<option value="">--Select--</option>');
				$.each(data.payload.mrvTypes, function(key, val) {
					$typesMRV.append('<option value="' + val.id + '">' + val.name + '</option>');
				})
			}
			
			var vendorList = data.payload.vendors;
			stoneReceipts = data.payload.stoneReceipts;
			
			if(null != data.payload.stoneReceipts || '' != data.payload.stoneReceipts || 'undefined' != data.payload.stoneReceipts){
				$mrvNos.empty();
				$mrvNos.append('<option value="">--Select--</option>');
				$.each(data.payload.stoneReceipts, function(key, val) {
					$mrvNos.append('<option value="' + val.id + '">' + val.id + '</option>');
				})
				
				$parcelIdsMRV.empty();
				$parcelIdsMRV.append('<option value="">--Select--</option>');
				$.each(data.payload.stoneReceipts, function(key, val) {
					$parcelIdsMRV.append('<option value="' + val.id + '">' + val.parcelDTO.parcelId + '</option>');
				})
				
				$stIndentNo.empty();
				$stIndentNo.append('<option value="">--Select--</option>');
				$.each(data.payload.stoneReceipts, function(key, val) {
					$stIndentNo.append('<option value="' + val.indentStoneDTO.stoneIndentId + '">' + val.indentStoneDTO.stoneIndentId + '</option>');
				})
				
				$mrvStatus.empty();
				$mrvStatus.append('<option value="">--Select--</option>');
				$.each(data.payload.mrvStatus, function(key, val) {
					$mrvStatus.append('<option value="' + val.id + '">' + val.name + '</option>');
				})
			}
			
			var data = [];
			$.each( vendorList, function( key, value ) {			      
				data.push({ value: value.id, label: value.vendorCode + "-" + value.vendorName });
			});
			$(function() {		
				$("#vendorCodeMRV").autocomplete({		
					source: data,
					focus: function(event, ui) {
						event.preventDefault();
						$(this).val(ui.item.label);
					},
					select: function(event, ui) {
						event.preventDefault();
						$(this).val(ui.item.label);					
						$("#vendorCodeMRV-value").val(ui.item.value);					
					}
				});
			});
			
			
			var data1 = [];
			$.each( stoneReceipts, function( key, value ) {			      
				data1.push({ value: value.id, label: value.billNo });
			});
			$(function() {		
				$("#vendorInvoiceNos").autocomplete({		
					source: data1,
					focus: function(event, ui) {
						event.preventDefault();
						$(this).val(ui.item.label);
					},
					select: function(event, ui) {
						event.preventDefault();
						$(this).val(ui.item.label);					
						$("#vendorInvoiceNos-value").val(ui.item.value);					
					}
				});
			});
		}
	});
}

function stonePOMivLOV() {
	getJSON('/OrderExecution/api/v1/stoneIndentLOV?page=stonePOMIV', function(data) {
	
		if(data.resCode == 1){
			var $stoneSegment = $('#stoneSegment');
			var $status = $('#status');
			//iterate over the data and append a select option
			if(null != data.payload.mTypes || '' != data.payload.mTypes || 'undefined' != data.payload.mTypes){
				$.each(data.payload.mTypes, function(key, val) {
					$stoneSegment.append('<option value="' + val.id + '">' + val.description
							+ '</option>');
				})
			}
			if(null != data.payload.status || '' != data.payload.status || 'undefined' != data.payload.status){
				$.each(data.payload.status, function(key, val) {
					$status.append('<option value="' + val.id + '">' + val.name
							+ '</option>');
				})
			}
		}
		
	});
}

$("#parcelIdsMRV").on("change",function() {
	var parcelIdsMRV = $("#parcelIdsMRV").val();
	var $mrvNos = $('#mrvNos');
	var $vendorInvoiceNos = $('#vendorInvoiceNos');
	var $vendorInvoiceNosVal = $('#vendorInvoiceNos-val');
	var $stIndentNo = $('#stIndentNo');
	var id = $("#stIndentNo").val(); 
	if(id != -1 || id != '-1'){
		$mrvNos.empty();
		$mrvNos.append('<option value="">--Select--</option>');
		$.each(stoneReceipts, function(key, val) {
			$mrvNos.append('<option value="' + val.id + '">' + val.id + '</option>');
		});
		
		$stIndentNo.empty();
		$stIndentNo.append('<option value="-1">--Select--</option>');
		$.each(stoneReceipts, function(key, val) {
			$stIndentNo.append('<option value="' + val.indentStoneDTO.stoneIndentId + '">' + val.indentStoneDTO.stoneIndentId + '</option>');
		})
	}
	if(null != stoneReceipts){
		for (var i = 0; i < stoneReceipts.length; i++) {
			if(stoneReceipts[i].id == parcelIdsMRV){
				$mrvNos.val(stoneReceipts[i].id);
				$vendorInvoiceNos.val(stoneReceipts[i].billNo);
				$vendorInvoiceNosVal.val(stoneReceipts[i].id);
				$stIndentNo.val(stoneReceipts[i].indentStoneDTO.stoneIndentId);
			}
		}
	}
});

$("#vendorInvoiceNos").on('change',function() {
	var vendorInvoiceNos = $('#vendorInvoiceNos-value').val();
	var $parcelIdsMRV = $("#parcelIdsMRV");
	var $mrvNos = $('#mrvNos');
	var $stIndentNo = $('#stIndentNo');
	var id = $("#stIndentNo").val();
	if(id != -1 || id != '-1'){
		$mrvNos.empty();
		$mrvNos.append('<option value="">--Select--</option>');
		$.each(stoneReceipts, function(key, val) {
			$mrvNos.append('<option value="' + val.id + '">' + val.id + '</option>');
		});
		
		$stIndentNo.empty();
		$stIndentNo.append('<option value="-1">--Select--</option>');
		$.each(stoneReceipts, function(key, val) {
			$stIndentNo.append('<option value="' + val.indentStoneDTO.stoneIndentId + '">' + val.indentStoneDTO.stoneIndentId + '</option>');
		})
	}
	
	if(null != stoneReceipts){
		for (var i = 0; i < stoneReceipts.length; i++) {
			if(stoneReceipts[i].id == vendorInvoiceNos){
				$mrvNos.val(stoneReceipts[i].id);
				$parcelIdsMRV.val(stoneReceipts[i].id);
				$stIndentNo.val(stoneReceipts[i].indentStoneDTO.stoneIndentId);
			}
		}
	}
});

$("#stIndentNo").on('change',function() {
	var id = $("#stIndentNo").val(); 
	var $mrvNos = $('#mrvNos');
	if(id == -1 || id == '-1'){
		$mrvNos.empty();
		$mrvNos.append('<option value="">--Select--</option>');
		$.each(stoneReceipts, function(key, val) {
			$mrvNos.append('<option value="' + val.id + '">' + val.id + '</option>');
		});
		
	}else{
		getJSON('/OrderExecution/api/v1/getMRVbyStoneIndent?id='+ id , function(data) {
			$mrvNos.empty();
			$mrvNos.append('<option value="">--Select--</option>');
			$.each(data.payload.stoneReceipts, function(key, val) {
				$mrvNos.append('<option value="' + val.id + '">' + val.id + '</option>');
			})
		});
	}
	
	$("#parcelIdsMRV").val('');
	$('#vendorInvoiceNos').val('');
	$('#vendorInvoiceNos-value').val('');
});
$("#mrvNos").on("change",function() {
	var mrvNos = $('#mrvNos').val();
	var $parcelIdsMRV = $("#parcelIdsMRV");
	var $vendorInvoiceNos = $('#vendorInvoiceNos');
	var $vendorInvoiceNosVal = $('#vendorInvoiceNos-value');
	var $stIndentNo = $('#stIndentNo');
	var id = $("#stIndentNo").val();
	
	
	if(null != stoneReceipts){
		for (var i = 0; i < stoneReceipts.length; i++) {
			if(stoneReceipts[i].id == mrvNos){
				$parcelIdsMRV.val(stoneReceipts[i].id);
				$vendorInvoiceNos.val(stoneReceipts[i].billNo);
				$vendorInvoiceNosVal.val(stoneReceipts[i].id);
				$stIndentNo.val(stoneReceipts[i].indentStoneDTO.stoneIndentId);
			}
		}
	}
});


$(document).ready(function() {
	$('#addIndent').attr('disabled', true);
});

$("#search").on('click', function() {
	var stoneSeg = $("#stoneSegment").val();
	if(stoneSeg == "" || stoneSeg == null){
		$.growl.error({
			message : "Please Select Mandatory Fields!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	stoneIndentGrid();
	$("#jqxgrid").show();
	return false;
});

$("#searchPOMRV").on('click', function() {
	mainMRVDetails();
	$("#stonePOMRVGrid").show();
});
$("#exportPOMRV").on('click', function() {
		var data;
		var newData = [];
		
		fieldFilters = {
				"fieldFilters" : {}
			};
		var fromDate = $("#orderFromDateMRV").val();
		var toDate = $("#orderToDateMRV").val();
		var stonePONo = $("#stIndentNo").val();
		var stonePODate = $("#stonePOdtMRV").val();
		var segment = $("#stoneSegmentMRV").val();
		var mrvStatus = $("#mrvStatus").val();
		var vendorCode = $("#vendorCodeMRV-value").val();
		var vendor = $("#vendorCodeMRV").val();
		var mrvNo = $("#mrvNos").val();
		var parcelId = $("#parcelIdsMRV").val();
		var vendorInvNo = $("#vendorInvoiceNos").val();
		var mrvType = $("#typesMRV").val();
		var invoiceDate = $("#invoiceDate").val();
		
		if(fromDate != null && fromDate != ""){
			fieldFilters.fieldFilters['fromDate'] = fromDate;
		}
		
		if(toDate != null && toDate != ""){
			fieldFilters.fieldFilters['toDate'] = toDate;
		}
		
		if(stonePONo != null && stonePONo != ""){
			fieldFilters.fieldFilters['stonePONo'] = stonePONo;
		}

		if(segment != null && segment != ""){
			fieldFilters.fieldFilters['segment'] = segment;
		}
		
		if(mrvStatus != null && mrvStatus != ""){
			fieldFilters.fieldFilters['mrvStatus'] = mrvStatus;
		}
		
		if(vendorCode != null && vendorCode != "" && vendor != null && vendor != ""){
			fieldFilters.fieldFilters['vendorCode'] = vendorCode;
		}
		
		if(mrvNo != null && mrvNo != ""){
			fieldFilters.fieldFilters['mrvNo'] = mrvNo;
		}
		
		if(mrvType != null && mrvType != ""){
			fieldFilters.fieldFilters['mrvType'] = mrvType;
		}
		
		if(invoiceDate != null && invoiceDate != ""){
			fieldFilters.fieldFilters[''] = invoiceDate;
		}
		
		fieldFilters['sortorder'] = "asc";
		fieldFilters['sortingFields'] = {
			    "stoneMRVId": true
		  };
		
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		
		var rows = $("#stonePOMRVGrid").jqxGrid('getrows');
		if(typeof rows == "undefined" || rows == 0){
			$.growl.error({
				message : "No Data to Export.",
				duration : 8000
			});
			return false;
		}else{
		postJSON('/OrderExecution/api/v1/stonePOMRVExport',JSON.stringify(fieldFilters), function(response) {
			if(null != response){
				data = response.payload.list;
				for(i=0; i<data.length; i++){
					var obj = data[i];
					var receipt = {
							'Vendor' :(null!=obj.stoneReceiptDTO.indentStoneDTO.vendorName)?obj.stoneReceiptDTO.indentStoneDTO.vendorName :" ",
							'GRV Type' : (null!=obj.stoneReceiptDTO.mrvType)?obj.stoneReceiptDTO.mrvType :" ",
							'GRV Date' : (null!=obj.stoneReceiptDTO.mrvDate)?obj.stoneReceiptDTO.mrvDate :" ",
							'GRV No' : (null!=obj.stoneReceiptDTO.mrvRefNo)?obj.stoneReceiptDTO.mrvRefNo :" ",						
							'GRV SL No' : (null!=obj.serialNumber)?obj.serialNumber :" ",						
							'PO No' :(null!=obj.stoneReceiptDTO.indentStoneDTO.stoneIndentId)?obj.stoneReceiptDTO.indentStoneDTO.stoneIndentId :" ",
							'PO SL No' : (null!=obj.indentStoneDetailDTO.serialNumber)?obj.indentStoneDetailDTO.serialNumber :" ",
							'Location' : (null!=obj.locationCode)?obj.locationCode :" ",
							'Vendor Inv Date' : (null!=obj.stoneReceiptDTO.billDt)?obj.stoneReceiptDTO.billDt :" ",						
							'Vendor Inv No' : (null!=obj.stoneReceiptDTO.billNo)?obj.stoneReceiptDTO.billNo :" ",							
							'Segment' : (null!=obj.stoneReceiptDTO.indentStoneDTO.segment)?obj.stoneReceiptDTO.indentStoneDTO.segment :" ",						
							'Category' : (null!=obj.indentStoneDetailDTO.category.description)?obj.indentStoneDetailDTO.category.description :" ",						
							'Sub Category' : (null!=obj.indentStoneDetailDTO.subCategorydesc)?obj.indentStoneDetailDTO.subCategorydesc :" ",						
							'Wt Range' : (null!=obj.indentStoneDetailDTO.weightRange)?obj.indentStoneDetailDTO.weightRange :" ",						
							'No.Of Pcs' : (null!=obj.indentStoneDetailDTO.pieces)?obj.indentStoneDetailDTO.pieces :" ",						
							'Weight' : (null!=obj.stoneWeight)?obj.stoneWeight :" ",						
							'UQC' : (null!=obj.indentStoneDetailDTO.uqc)?obj.indentStoneDetailDTO.uqc :" ",						
							'Rate Rs.' : (null!=obj.stoneRatePerCaratInINR)?obj.stoneRatePerCaratInINR :" ",						
							'Invoive Amt Before' : (null!=obj.stoneValue)?obj.stoneValue:"",						
							'IGST %' : (null!=obj.igstPrc)?obj.igstPrc :" ",							
							'IGST Amt' : (null!=obj.igstAmt)?obj.igstAmt :" ",						
							'CGST %' : (null!=obj.cgstPrc)?obj.cgstPrc :" ",						
							'CGST Amt' : (null!=obj.cgstAmt)?obj.cgstAmt :" ",						
							'SGST %' : (null!=obj.sgstPrc)?obj.sgstPrc :" ",					
							'SGST Amt' : (null!=obj.sgstAmt)?obj.sgstAmt :" ",							
							'Cess %' : (null!=obj.cessPrc)?obj.cessPrc :" ",							
							'Cess Amt' : (null!=obj.cessAmt)?obj.cessAmt :"",							
							'Total' : (null!=obj.totalValue)?obj.totalValue :" "						
						}
						newData.push(receipt);							
				   }	
			//	JSONToCSVConvertor(newData, "StonePOMRVReport" + "_" + sysdate, true);
				  var opts = [{sheetid:'StonePO_MRV_Report',header:true}];
                  var res = alasql('SELECT * INTO XLSX("StonePO MRV Report_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
				}
			});
		}
});

$("#searchPOMIV").on('click', function() {
	mainMIVDetails();
	$("#stonePOMIVGrid").show();
});

function stoneIndentFilterValues() {

	fieldFilters = {
		"fieldFilters" : {}
	};
	var fromDate = $('#orderFromDate').val();
	var toDate = $('#orderToDate').val();
	var status = $('#status').val();
	var indentNo = $('#indentNo').val();
	var stoneSegment = $("#stoneSegment").val();

	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["indentStatus"] = status;
	}
	if (indentNo != "" && indentNo != null) {
		fieldFilters.fieldFilters["indentNo"] = indentNo;
	}
	if (stoneSegment != "" && stoneSegment != null) {

		fieldFilters.fieldFilters["segement"] = stoneSegment;
	}

	return fieldFilters;

}

var viewStoneIndentData = function(id){	
	
	var url = "stoneIndentData?indentId=" + id;
	 $("#stoneIndentData").find('.modal-content').load(url,function(result){
			$("#stoneIndentData").modal({show:true,  target: "stoneIndentDetails"});
	 });
}

function stoneIndentGrid() {

	var updateRows = function(rowid, newdata, commit) {

	}
	var indentEditlinkrenderer = function(row, column, value) {
		return '<a class="btn btn-primary btn-sm"  onclick="viewStoneIndentData('+value+')" type="button" href="javascript:void(0);"><i class="fa fa-eye fa-sm"></i></a>'
		
	}
	var datafields = [ {
		'name' : 'stoneIndentId',
		'type' : 'string'
	}, {
		'name' : 'createdDate',
		'type' : 'string'
	}, {
		'name' : 'vendorCode',
		'type' : 'string'
	}, {
		'name' : 'subCategory',
		'type' : 'string'
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'status',
		'type' : 'string'
	}, {
		'name' : 'indentAmount',
		'type' : 'double'
	}, {
		'name' : 'vendorName',
		'type' : 'string'
	}

	, {
		'name' : 'mrvNo',
		'type' : 'string'
	}, {
		'name' : 'totalValue',
		'type' : 'double'
	}, {
		'name' : 'reasonForCancel',
		'type' : 'string'
	}

	, {
		'name' : 'indentActionId',
		'type' : 'long',
		'map' : 'stoneIndentId'
	} ];

	var columns = [
	{
		'text' : 'Stone PO No.',
		'datafield' : 'stoneIndentId',
		'width' : '9%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	},
	{
		'text' : 'PO Date',
		'datafield' : 'createdDate',
		'width' : '9%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	},
	{
		'text' : 'Stone Dealer Code',
		'datafield' : 'vendorCode',
		'width' : '10%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Stone Dealer Name',
		'datafield' : 'vendorName',
		'width' : '12%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Stone PO Amnt',
		'datafield' : 'indentAmount',
		'width' : '9%',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2'
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '9%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Grv No.',
		'datafield' : 'mrvNo',
		'width' : '9%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Status.',
		'datafield' : 'status',
		'width' : '9%',
		editable : false,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Total Value<br><i>(Incl of Tax).</i>',
		'datafield' : 'totalValue',
		'width' : '9%',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2'
	}, {
		'text' : 'Reason For Cancel',
		'datafield' : 'reasonForCancel',
		'width' : '10%',
		sortable : false,
		editable : false,
		cellsalign : 'left',
		align : 'center',
	}, {
		'text' : '',
		'datafield' : 'indentActionId',
		cellsrenderer : indentEditlinkrenderer,
		editable : false,
		sortable : false,
		'width' : '5%',
		cellsalign : 'center',
		align : 'center',
	}

	];

	showMyGrid(datafields, "/OrderExecution/api/v1/stoneIndentList", "list",columns, stoneIndentFilterValues(), updateRows, "stoneIndentId");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,        
		theme: 'energyblue',    
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});

}



$("#export").on('click', function() {
	var data;
	var newData = [];
	
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	
	var rows = $("#jqxgrid").jqxGrid('getrows');
	if(typeof rows == "undefined" || rows == 0){
		$.growl.error({
			message : "No Data to Export.",
			duration : 8000
		});
		return false;
	}else{
	postJSON('/OrderExecution/api/v1/stonePOExport',JSON.stringify(stoneIndentFilterValues()), function(response) {
		if(null != response){
			data = response.payload.list;
			for(i=0; i<data.length; i++){
				var obj = data[i];
				var receipt = {
						'StonePO No' :(null!=obj.stoneIndentId)?obj.stoneIndentId :" ",
						'PO Date' : (null!=obj.createdDate)?obj.createdDate :" ",
						'Dealer' : (null!=obj.vendorCode)?obj.vendorCode :" ",
						'Dealer Name' : (null!=obj.vendorName)?obj.vendorName :" ",						
						'PO Amt' : (null!=obj.indentAmount)?obj.indentAmount :" ",						
						'Segment' :(null!=obj.segment)?obj.segment :" ",
						'GRV No' : (null!=obj.mrvNo)?obj.mrvNo :" ",
						'Status' : (null!=obj.status)?obj.status :" ",
						'Total Value' : (null!=obj.totalValue)?obj.totalValue :" ",						
						'Reason For Cancel' : (null!=obj.reasonForCancel)?obj.reasonForCancel :" "						
					}
					newData.push(receipt);							
			   }	
			//JSONToCSVConvertor(newData, "StonePOReport" + "_" + sysdate, true);
			   var opts = [{sheetid:'StonePO_Report',header:true}];
               var res = alasql('SELECT * INTO XLSX("Stone PO Report_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
			}
		});
	}
});
/* Stone Indent script */

function stoneIndentDetails() {
	var indentDetail = {
		"stoneDealerId" : $('#bDealerCode').val(),
		"segmentId" : $('#metalSegment').val(),
		"remarks" : $('#remarks').val(),

	};

	return indentDetail;
}

$("#saveIndent")
		.on(
				"click",
				function() {

					var metalSegment = $('#metalSegment').val();
					var bDealerCode = $('#bDealerCode').val();
					if (metalSegment == null || metalSegment == ''
							|| bDealerCode == null || bDealerCode == '') {
						$.growl
								.error({
									message : "Please fill in all of the required fields",
									duration : 10000
								});
						return false;
					}
					var indentDtos = [];
					var rows = $("#createStoneIndentGrid").jqxGrid('getrows');
					var segement = $("#metalSegment option:selected").text();
					

					for (i = 0; i < rows.length; i++) {
						var mainCategory = rows[i].mainCategory;
						var mainCategoryId = rows[i].mainCategoryId;
						
						var hsn = {"id" : rows[i].hsnId};
						var indentDTO = {
							"segmentId" : metalSegment,
							"stoneDealerId" : bDealerCode,
							//"mainCategory" : rows[i].mainCategory,  // Removed as per the Client Request
							"category" : rows[i].mainCategoryId,
							"subCategory" : rows[i].subCategory,
							"articelCode" : rows[i].articelCode,
							"clarity" : rows[i].clarity,
							"actualColor" : rows[i].actualColor,
							"color" : rows[i].color,
							"cutGrade" : rows[i].cutGrade,
							"wgtRange" : rows[i].wgtRange,
							"subCategoryConcate" : rows[i].subCategoryConcate,
							"pices" : rows[i].pices,
							"stoneWgt" : rows[i].stoneWgt,
							"uom" : rows[i].uom,
							"rapPrice" : rows[i].rapPrice,
							"rapPremium" : rows[i].rapPremium,
							"discountOrPremiumType" : rows[i].discountOrPremiumType,
							"netRatePerCt" : rows[i].netRatePerCt,
							"rate" : rows[i].rate,
							"stoneRate" : rows[i].stoneRate,
							"rateConf" : rows[i].rateConf,
							"stoneValue" : rows[i].stoneValue,
							"remarks" : rows[i].remarks,
							"dueDate" : rows[i].dueDate,
							"hsnMasterDTO" : hsn

						}
						console.log(indentDTO);
						if (indentDTO.segmentId == null
								|| indentDTO.segmentId == ''
								|| indentDTO.category == null
								|| indentDTO.category == ''
								|| indentDTO.subCategory == null
								|| indentDTO.subCategory == ''
								|| indentDTO.articelCode == null
								|| indentDTO.articelCode == ''
								|| indentDTO.subCategoryConcate == null
								|| indentDTO.subCategoryConcate == ''
								|| indentDTO.pices == null
								|| indentDTO.pices == ''
								|| indentDTO.stoneWgt == null
								|| indentDTO.stoneWgt == ''
								|| indentDTO.uom == null || indentDTO.uom == ''
								|| indentDTO.rateConf == null
								|| indentDTO.rateConf == ''
								|| indentDTO.stoneValue == null
								|| indentDTO.stoneValue == ''
								|| indentDTO.dueDate == null
								|| indentDTO.dueDate == '') {
								$.growl
								.error({
									message : "Please fill in all of the required fields",
									duration : 10000
								});
							return false;
						}
						if (segement.valueOf() == new String("Diamond")
								.valueOf()
								&& (mainCategory.valueOf() == new String(
										"CD Solitaire").valueOf() || mainCategory
										.valueOf() == new String("Solitaire")
										.valueOf())) {
							if (indentDTO.clarity == null
									|| indentDTO.clarity == ''
									|| indentDTO.cutGrade == null
									|| indentDTO.cutGrade == ''
									|| indentDTO.wgtRange == null
									|| indentDTO.wgtRange == ''
									|| indentDTO.rapPrice == null
									|| indentDTO.rapPrice == ''
									|| indentDTO.rapPremium == null
									|| indentDTO.rapPremium == ''
									|| indentDTO.discountOrPremiumType == null
									|| indentDTO.discountOrPremiumType == ''
									|| indentDTO.netRatePerCt == null
									|| indentDTO.netRatePerCt == ''
									|| indentDTO.rate == null
									|| indentDTO.rate == '') {
								$.growl
										.error({
											message : "Please fill in all of the required fields",
											duration : 10000
										});
								return false;
							}
						}

						indentDtos.push(indentDTO);
					}
					postJSON(
							'/OrderExecution/api/v1/stoneIDDetails',
							JSON.stringify(indentDtos),
							function(data) {
								if (1 == data.resCode) {
									$("#metalSegment").prop("disabled", true);
									$("#bDealerCode").prop("disabled", true);
									$("#createStoneIndentGrid").hide();
									$("#saveIndent").hide();
									$('#print').show();
									$("#indentNo").val(data.payload.indentId);
									$("#addstoneIndent").hide();
									$('#indentListing').show();
									$.growl.notice({
												message : "Successfully created Stone Indent ID "
														+ data.payload.indentId,
												duration : 10000,
												title : 'Success'
											});

								}else{
									$.growl.error({
										message :  data.mesgStr,
										duration : 10000,
										title : 'Error'
									});
								}
							});

				});

$("#bDealerCode").on("change", function() {
	$("#metalSegment").prop("disabled", false);
});

$("#metalSegment").on("change", function() {

	if (typeof $("#createStoneIndentGrid").jqxGrid('getrows') == 'undefined') {
		indentGrid();

		$('#addstoneIndent').show();

	} else {

		$("#createStoneIndentGrid").jqxGrid('clear');

		creationrowId = 0;
	}

});

var creationrowId = 0;
$("#addstoneIndent").on("click", function() {
	$("#suppBy").val('CO');
	var metalSegement = $("#metalSegment").val();
	var metalSegementName = $("#metalSegment option:selected").text();
	var dealerCode = $("#bDealerCode").val();
	if (metalSegement == null || metalSegement == '') {
		$.growl.error({
			message : "Please select metal segement",
			duration : 10000
		});
		return false;
	} 
	
	if (dealerCode == null || dealerCode == '') {
		$.growl.error({
			message : "Please select dealer code",
			duration : 10000
		});
		return false;
	}
	if(metalSegment != null || metalSegment != ""){
		loadOnChangeSeg(metalSegement, metalSegementName);
	}
	var params = {"fieldFilters" : {"suppliedBy" : "V",	"mCode" : ""}};	
	$('#segment').empty().append('<option value="" selected>--Select--</option>');
	postJSON('api/v1/getStoneSegments', JSON.stringify(params),function(data) {
		if (1 == data.resCode) {
			$.each(data.payload.stoneSeg,function(key, val) {
				
				if(val.id == metalSegement){
					$('#segment').append('<option selected value="' + val.id+ '">'+ val.description+ '</option>');
				}else{
					$('#segment').append('<option  value="' + val.id+ '">'+ val.description+ '</option>');
				}
			});
		}
	});

	$('#saveIndent').show();
});


var generaterow = function(i) {

	var val = $("#metalSegment option:selected").text();
	var row = {};
	row["slNo"] = i;
	row["segment"] = val;
	row["mainCategoryId"] = null;
	row["hsnCode"] = null;
	row["hsnId"] = null;
	row["mainCategory"] = null;
	row["subCategory"] = null;
	row["articelCode"] = null;
	row["clarity"] = null;
	row["actualColor"] = null;
	row["color"] = null;
	row["cutGrade"] = null;
	row["wgtRange"] = null;
	row["subCategoryConcate"] = null;
	row["pices"] = null;
	row["stoneWgt"] = null;
	row["uom"] = null;
	row["rapPrice"] = null;
	row["rapPremium"] = null;
	row["discountOrPremiumType"] = null;
	row["netRatePerCt"] = null;
	row["rate"] = null;
	row["stoneRate"] = null;
	row["rateConf"] = null;
	row["stoneValue"] = null;
	row["remarks"] = null;
	row["dueDate"] = null;

	return row;
}

$("#createStoneIndentGrid")
		.on(
				'bindingcomplete',
				function(event) {
					var val = $("#metalSegment option:selected").text();

					if (val.valueOf() != new String("Diamond").valueOf()) {

						$("#createStoneIndentGrid").jqxGrid('hidecolumn',
								'clarity');
						$("#createStoneIndentGrid").jqxGrid('hidecolumn',
								'actualColor');
						$("#createStoneIndentGrid").jqxGrid('hidecolumn',
								'color');
						$("#createStoneIndentGrid").jqxGrid('hidecolumn',
								'cutGrade');
						$("#createStoneIndentGrid").jqxGrid('hidecolumn',
								'wgtRange');
						$("#createStoneIndentGrid").jqxGrid('hidecolumn',
								'rapPrice');
						$("#createStoneIndentGrid").jqxGrid('hidecolumn',
								'rapPremium');
						$("#createStoneIndentGrid").jqxGrid('hidecolumn',
								'discountOrPremiumType');
						$("#createStoneIndentGrid").jqxGrid('hidecolumn',
								'netRatePerCt');
						$("#createStoneIndentGrid").jqxGrid('hidecolumn',
								'rate');

						$("#createStoneIndentGrid").jqxGrid(
								'setcolumnproperty', 'segment', 'width', 120);
						$("#createStoneIndentGrid").jqxGrid(
								'setcolumnproperty', 'subCategory', 'width',
								140);
						$("#createStoneIndentGrid")
								.jqxGrid('setcolumnproperty', 'stoneValue',
										'width', 120);
						$("#createStoneIndentGrid").jqxGrid(
								'setcolumnproperty', 'dueDate', 'width', 110);
						$("#createStoneIndentGrid").jqxGrid(
								'setcolumnproperty', 'subCategoryConcate',
								'width', 140);

						$("#createStoneIndentGrid").jqxGrid(
								'setcolumnproperty', 'rateConf', 'width', 80);
						$("#createStoneIndentGrid").jqxGrid(
								'setcolumnproperty', 'discountOrPremiumType',
								'width', 80);
						$("#createStoneIndentGrid").jqxGrid(
								'setcolumnproperty', 'mainCategory', 'width',
								120);
						$("#createStoneIndentGrid").jqxGrid(
								'setcolumnproperty', 'mainCategoryId', 'width',
								120);
					} else {

						$("#createStoneIndentGrid").jqxGrid('showcolumn',
								'clarity');
						$("#createStoneIndentGrid").jqxGrid('showcolumn',
								'actualColor');
						$("#createStoneIndentGrid").jqxGrid('showcolumn',
								'color');
						$("#createStoneIndentGrid").jqxGrid('showcolumn',
								'cutGrade');
						$("#createStoneIndentGrid").jqxGrid('showcolumn',
								'wgtRange');
						$("#createStoneIndentGrid").jqxGrid('showcolumn',
								'rapPrice');
						$("#createStoneIndentGrid").jqxGrid('showcolumn',
								'rapPremium');
						$("#createStoneIndentGrid").jqxGrid('showcolumn',
								'discountOrPremiumType');
						$("#createStoneIndentGrid").jqxGrid('showcolumn',
								'netRatePerCt');
						$("#createStoneIndentGrid").jqxGrid('showcolumn',
								'rate');
					}
				});
function celledit(row, column, datafield, oldvalue, value)
{

    var rows = $('#createStoneIndentGrid').jqxGrid('getrows'); //getting row details
    var row_count = rows.length; //row count
    var column_count = $("#createStoneIndentGrid").jqxGrid('columns').records.length;
    var rowIDs = new Array();
    var total = 0;

	
}
function indentGrid() {
	$("#createStoneIndentGrid").jqxGrid({
						width : '100%',
						editable : true,
						columnsheight : 80,
						autorowheight : true,
						autoheight : true,
						altRows : true,
						columnsresize : true,
						theme: 'energyblue',
						showtoolbar : true,
						rendertoolbar : function(toolbar) {
							var me = this;
							var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
							toolbar.append(container);
							container.append('<div style="margin-bottom: 10px;" id="deleterowbuttonW" class="btn btn-danger btn-sm pull-right"><i  class="fa fa-trash fa-md"></i></div>');
							
							$("#deleterowbuttonW").jqxButton();
							
					
							$("#deleterowbuttonW").on('click', function() {
								var selectedrowindex = $("#createStoneIndentGrid").jqxGrid('getselectedrowindex');
								var rowscount = $("#createStoneIndentGrid").jqxGrid('getdatainformation').rowscount;				
								console.log(selectedrowindex);
								if(selectedrowindex == -1){
									$.growl.error({
										message : "Please Select Row to be Deleted !!",
										duration : 1000,
										title : 'Error'
									});
									return false;
								}
								
								if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
									var id = $("#createStoneIndentGrid").jqxGrid('getrowid', selectedrowindex);
									var commit = $("#createStoneIndentGrid").jqxGrid('deleterow', id);
								}
							});
						},

						columns : [
								{
									text : 'SL No.',
									datafield : 'slNo',
									width : 60,
									editable : false
								},
								{
									text : 'Seg',
									datafield : 'segment',
									width : 100,
									editable : false
								},
								{
									text : 'Main Cat',
									datafield : 'mainCategory',
									width : 80,
									editable : false
								},
								{
									text : 'Category',
									datafield : 'mainCategoryId',
									width : 80,
									hidden: true,
									editable : false
								},
								{
									text : 'Shape/Sub Cat',
									datafield : 'subCategory',
									width : 60,
									editable : false
								},
								{
									text : 'Article Code',
									datafield : 'articelCode',
									width : 60,
									editable : false
								},
								{
									text : 'Clarity',
									datafield : 'clarity',
									width : 60,
									editable : false
								},
								{
									text : 'Actual Color ',
									datafield : 'actualColor',
									width : 60,
									editable : false
								},
								{
									text : 'Color',
									datafield : 'color',
									width : 60,
									editable : false
								},
								{
									text : ' Cut Grade',
									datafield : 'cutGrade',
									width : 60,
									editable : false
									
								},
								{
									text : 'Wt.Range',
									datafield : 'wgtRange',
									width : 60,
									editable : false,
									cellsalign : 'right',align:'center'
								},
								{
									text : 'Sub Cat Desc',
									datafield : 'subCategoryConcate',
									width :  100,
									editable : false,
									cellsalign : 'left',align:'center'
								},
								{
									text : 'No. Of Pcs',
									datafield : 'pices',
									width : 60,
									cellsalign : 'center',align:'center',
									columntype : 'numberinput',
									validation : function(cell, value) {
										if (value < 0) {
											return {
												result : false,
												message : "Invalid Number"
											};
										}
										return true;
									},
									cellvaluechanging : function(row,
											datafield, columntype, oldvalue,
											newvalue, event) {
										var uom = jQuery(
												'#createStoneIndentGrid')
												.jqxGrid('getCell', row, 'uom');
										var stoneRate = jQuery(
												'#createStoneIndentGrid')
												.jqxGrid('getCell', row,
														'stoneRate');
										if (uom.value != null
												&& uom.value != '') {

											if ('Pcs' == uom.value.valueOf()) {
												$("#createStoneIndentGrid")
														.jqxGrid(
																'setcellvalue',
																row,
																"stoneValue",
																(stoneRate.value * newvalue)
																		.toFixed(2));
											} else {
												var stoneWgt = jQuery(
														'#createStoneIndentGrid')
														.jqxGrid('getCell',
																row, 'stoneWgt');
												if (stoneWgt != null
														&& stoneWgt != '') {
													$("#createStoneIndentGrid")
															.jqxGrid(
																	'setcellvalue',
																	row,
																	"stoneValue",
																	(stoneRate.value * stoneWgt.value)
																			.toFixed(2));
												}

											}
										}
									}
								},
								{
									text : 'Stone Wt.',
									datafield : 'stoneWgt',
									width : 60,
									cellsalign : 'right',align:'center',
									cellsformat : 'd3',
									columntype : 'numberinput',
									initeditor : function(row, cellvalue,
											editor) {
										editor.jqxNumberInput({
											decimalDigits : 3,
											min : 0.000
										});
									},
									validation : function(cell, value) {
										if (value < 0) {
											return {
												result : false,
												message : "Invalid Number"
											};
										}
										return true;
									},
									cellvaluechanging : function(row,
											datafield, columntype, oldvalue,
											newvalue, event) {
										var uom = jQuery(
												'#createStoneIndentGrid')
												.jqxGrid('getCell', row, 'uom');
										if (uom.value != null
												&& uom.value != '') {
											if ('Pcs' != uom.value.valueOf()) {
												var stoneRate = jQuery(
														'#createStoneIndentGrid')
														.jqxGrid('getCell',
																row,
																'stoneRate');
												if (!isNaN(newvalue)
														&& newvalue != ''
														&& parseFloat(newvalue) > 0) {
													if (stoneRate.value > 0) {
														$(
																"#createStoneIndentGrid")
																.jqxGrid(
																		'setcellvalue',
																		row,
																		"stoneValue",
																		(stoneRate.value * newvalue)
																				.toFixed(2));
														return newvalue;
													}
												} else {

													$.growl
															.error({
																message : "Invalid Number",
																duration : 10000,
																title : 'Error'
															});
													return "";
												}

											}
										}
									}
								},
								{
									text : 'UQC',
									datafield : 'uom',
									width : 60,
									editable : false
								},
								{
									text : ' Rap Price Per carat (in $)',
									datafield : 'rapPrice',
									cellsformat : 'd2',
									cellsalign : 'right',align:'center',
									columntype : 'numberinput',
									width : 200,
									validation : function(cell, value) {
										if (value < 0) {
											return {
												result : false,
												message : "Invalid Number"
											};
										}
										return true;
									},
									cellbeginedit: function (row) {
										 var rows = $('#createStoneIndentGrid').jqxGrid('getrows');										
											 if (rows[row].segment == "Diamond"){
												if (rows[row].mainCategory == "CD Solitaire" || rows[row].mainCategory == "Solitaire") {
												    return true;

												} else {
													return false;
												
												}
										 	}	
										 
				                    },
									
									cellvaluechanging : function(row,
											datafield, columntype, oldvalue,
											newvalue, event) {

										var discountOrPremiumType = jQuery(
												'#createStoneIndentGrid')
												.jqxGrid('getCell', row,
														'discountOrPremiumType');

										var rapRate = jQuery(
												'#createStoneIndentGrid')
												.jqxGrid('getCell', row,
														'rapPremium');
										if (!isNaN(newvalue) && newvalue != ''
												&& parseFloat(newvalue) > 0) {

											if (parseFloat(rapRate.value) > 0) {

												if (discountOrPremiumType == "Discount")
													var natRateVal = (newvalue - (newvalue
															* parseFloat(rapRate.value) / 100))
															.toFixed(2);
												else
													var natRateVal = (newvalue + (newvalue
															* parseFloat(rapRate.value) / 100))
															.toFixed(2);
												$("#createStoneIndentGrid")
														.jqxGrid(
																'setcellvalue',
																row,
																"netRatePerCt",
																natRateVal);

												var rate = jQuery(
														'#createStoneIndentGrid')
														.jqxGrid('getCell',
																row, 'rate');
												if (parseFloat(rate.value) > 0) {
													var stoneRate = (natRateVal * rate.value)
															.toFixed(2);
													$("#createStoneIndentGrid")
															.jqxGrid(
																	'setcellvalue',
																	row,
																	"stoneRate",
																	stoneRate);
													var stoneWgt = jQuery(
															'#createStoneIndentGrid')
															.jqxGrid('getCell',
																	row,
																	'stoneWgt');
													if (stoneWgt.value > 0) {
														$(
																"#createStoneIndentGrid")
																.jqxGrid(
																		'setcellvalue',
																		row,
																		"stoneValue",
																		(stoneRate * stoneWgt.value)
																				.toFixed(2));
													}
												}
												return newvalue;
											}
										} else {

											$.growl.error({
												message : "Invalid Number",
												duration : 10000,
												title : 'Error'
											});
											return "";
										}
									}
								},
								{
									text : 'RAP Discount / Premium',
									datafield : 'discountOrPremiumType',
									width : 106,
									cellsalign : 'right',align:'center',
									// cellsformat : 'd2',
									columntype : 'dropdownlist',
									createeditor : function(row, cellvalue,
											editor) {
										var dataSource = [ 'Discount',
												'Premium' ];
										editor.jqxDropDownList({
											placeHolder : '--Select--',
											source : dataSource,
											selectedIndex : 0,
											dropDownHeight : 50
										});
									},
									cellbeginedit: function (row) {
										 var rows = $('#createStoneIndentGrid').jqxGrid('getrows');										
											 if (rows[row].segment == "Diamond"){
												if (rows[row].mainCategory == "CD Solitaire" || rows[row].mainCategory == "Solitaire") {
												    return true;

												} else {
													return false;
												
												}
										 	}	
										 
				                    },
								
									 cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue)
									    {
											
									        return celledit(row, datafield, columntype, oldvalue, newvalue);
										}
								},
								{
									text : 'RAP Discount / Premium %',
									datafield : 'rapPremium',
									width : 97,
									cellsalign : 'right',align:'center',
									cellsformat : 'd2',
									columntype : 'numberinput',
									validation : function(cell, value) {
										if (value < 0 || value > 100) {

											return {
												result : false,
												message : "Invalid Number"
											};
										}
										return true;
									},
									cellbeginedit: function (row) {
										 var rows = $('#createStoneIndentGrid').jqxGrid('getrows');										
											 if (rows[row].segment == "Diamond"){
												if (rows[row].mainCategory == "CD Solitaire" || rows[row].mainCategory == "Solitaire") {
												    return true;

												} else {
													return false;
												
												}
										 	}	
										 
				                    },
									cellvaluechanging : function(row,
											datafield, columntype, oldvalue,
											newvalue, event) {

										var rapPrice = jQuery(
												'#createStoneIndentGrid')
												.jqxGrid('getCell', row,
														'rapPrice');

										var discountOrPremiumType = jQuery(
												'#createStoneIndentGrid')
												.jqxGrid('getCell', row,
														'discountOrPremiumType');
										var rapPriceVal = parseFloat(rapPrice.value);
										if (!isNaN(newvalue) && newvalue != ''
												&& parseFloat(newvalue) > 0) {
											if (discountOrPremiumType.value == "Discount")
												var natRateVal = (rapPriceVal - (rapPriceVal
														* parseFloat(newvalue) / 100))
														.toFixed(2);
											else
												var natRateVal = (rapPriceVal + (rapPriceVal
														* parseFloat(newvalue) / 100))
														.toFixed(2);
											$("#createStoneIndentGrid")
													.jqxGrid('setcellvalue',
															row,
															"netRatePerCt",
															natRateVal);
										} else {

											$.growl.error({
												message : "Invalid Number",
												duration : 10000,
												title : 'Error'
											});
											return "";
										}
									}

								},
								{
									text : 'Net Rate Per.ct. in $',
									datafield : 'netRatePerCt',
									width : 80,
									cellsalign : 'right',align:'center',
									editable : false,
									cellbeginedit: function (row) {
										 var rows = $('#createStoneIndentGrid').jqxGrid('getrows');										
											 if (rows[row].segment == "Diamond"){
												if (rows[row].mainCategory == "CD Solitaire" || rows[row].mainCategory == "Solitaire") {
												    return true;

												} else {
													return false;
												
												}
										 	}	
										 
				                    }
								},
								{
									text : '$Rate',
									datafield : 'rate',
									cellsformat : 'd2',
									cellsalign : 'right',align:'center',
									columntype : 'numberinput',
									width : 60,
									cellbeginedit: function (row) {
										 var rows = $('#createStoneIndentGrid').jqxGrid('getrows');										
											 if (rows[row].segment == "Diamond"){
												if (rows[row].mainCategory == "CD Solitaire" || rows[row].mainCategory == "Solitaire") {
												    return true;

												} else {
													return false;
												
												}
										 	}	
										 
				                    },
									validation : function(cell, value) {

										if (value < 0) {
											return {
												result : false,
												message : "Invalid Number"
											};
										}
										return true;
									},
									cellvaluechanging : function(row,
											datafield, columntype, oldvalue,
											newvalue, event) {

										var netRatePerCt = jQuery(
												'#createStoneIndentGrid')
												.jqxGrid('getCell', row,
														'netRatePerCt');
										if (!isNaN(newvalue) && newvalue != ''
												&& parseFloat(newvalue) > 0) {
											if (parseFloat(netRatePerCt.value) > 0) {
												var netRatePerCtVal = parseFloat(netRatePerCt.value);
												var stoneRate = (netRatePerCtVal * newvalue)
														.toFixed(2);
												$("#createStoneIndentGrid")
														.jqxGrid(
																'setcellvalue',
																row,
																"stoneRate",
																stoneRate);
												var stoneWgt = jQuery(
														'#createStoneIndentGrid')
														.jqxGrid('getCell',
																row, 'stoneWgt');
												var uom = jQuery(
														'#createStoneIndentGrid')
														.jqxGrid('getCell',
																row, 'uom');
												if (uom.value != null
														&& uom.value != ''
														&& stoneWgt.value > 0) {
													if (new String('Pcs').valueOf != uom.value
															.valueOf()) {
														$(
																"#createStoneIndentGrid")
																.jqxGrid(
																		'setcellvalue',
																		row,
																		"stoneValue",
																		(stoneRate * stoneWgt.value)
																				.toFixed(2));
													}
												}
												return newvalue;
											}
										} else {

											$.growl.error({
												message : "Invalid Number",
												duration : 10000,
												title : 'Error'
											});
											return "";
										}
									}
								},
								{
									text : 'Stone Rate INR (per. Ct)',
									datafield : 'stoneRate',
									cellsformat : 'd2',
									cellsalign : 'right',align:'center',
									columntype : 'numberinput',
									width : 60,
									validation : function(cell, value) {

										if (value < 0) {
											return {
												result : false,
												message : "Invalid Number"
											};
										}
										return true;
									},
									cellvaluechanging : function(row,
											datafield, columntype, oldvalue,
											newvalue, event) {
										var uom = jQuery(
												'#createStoneIndentGrid')
												.jqxGrid('getCell', row, 'uom');
										if (uom.value != null
												&& uom.value != '') {
											if ('Pcs' != uom.value.valueOf()) {
												var stoneWgt = jQuery(
														'#createStoneIndentGrid')
														.jqxGrid('getCell',
																row, 'stoneWgt');
												if (!isNaN(newvalue)
														&& newvalue != ''
														&& parseFloat(newvalue) > 0) {
													if (parseFloat(stoneWgt.value) > 0) {

														$(
																"#createStoneIndentGrid")
																.jqxGrid(
																		'setcellvalue',
																		row,
																		"stoneValue",
																		(stoneWgt.value * newvalue)
																				.toFixed(2));

														return newvalue;
													}
												} else {

													$.growl
															.error({
																message : "Invalid Number",
																duration : 10000,
																title : 'Error'
															});
													return "";
												}
											} else {
												var pices = jQuery(
														'#createStoneIndentGrid')
														.jqxGrid('getCell',
																row, 'pices');
												if (pices != null
														&& pices != '') {
													$("#createStoneIndentGrid")
															.jqxGrid(
																	'setcellvalue',
																	row,
																	"stoneValue",
																	(pices.value * newvalue)
																			.toFixed(2));
												}

											}
										}
									}
								},
								{
									text : 'Rate Confirmation',
									columntype : 'dropdownlist',
									datafield : 'rateConf',
									width : 60,
									createeditor : function(row, cellvalue,
											editor) {
										var dataSource = [ 'Yes', 'No' ];
										editor.jqxDropDownList({
											placeHolder : '--Select--',
											source : dataSource,
											selectedIndex : 0,
											dropDownHeight : 50
										});
									}
								},
								{
									text : 'Stone Value',
									datafield : 'stoneValue',
									width : 90,
									editable : false,
									cellsalign : 'right',align:'center',
									cellsformat : 'd2',  
									columntype : 'numberinput',
						 			 createeditor : function(row, cellvalue, editor) {
											editor.jqxNumberInput({
												spinButtons : false,
												decimalDigits : 2
											});
										}
								},
								{
									text : 'Remarks ',
									datafield : 'remarks',
									width : 80,
								},
								{
									text : 'Due Date',
									datafield : 'dueDate',
									columntype : 'datetimeinput',
									width : 150,
									cellsalign : 'center',
									cellsformat : 'dd/MM/yyyy',
									cellvaluechanging : function(row,
											datafield, columntype, oldvalue,
											newvalue, event) {
										var date = new Date();
										var dateOnly = new Date(date
												.getFullYear(),
												date.getMonth(), date.getDate());
										if (newvalue >= dateOnly) {

											return newvalue;
										} else {
											$.growl
													.error({
														message : "Previous Date not allowed",
														duration : 10000,
														title : 'Error'
													});
											return "";
										}
									}
								} ]
					});

}



$('#stoneSearchPO').on('loaded.bs.modal', function(e) {

	var suppliedBy = "CO";
	$("#suppBy").val(suppliedBy).change();
	$("#suppBy").attr("disabled", true);

	var segmentId = $("#metalSegment").val();
	$("#segment").val(segmentId).change();
	$("#segment").attr("disabled", true);

});

$("#stoneSearchPO").on('hide.bs.modal',	function(e) {

			var row = generaterow($('#createStoneIndentGrid').jqxGrid('getdatainformation').rowscount + 1);

			var segmentVal = row["segment"];
			row['articelCode'] = $("#stoneCode").val();
			row['uom'] = $("#uom").val();
			row['mainCategory'] = $("#mainCategory option:selected").text();
			row['mainCategoryId'] = $("#mainCategory option:selected").val();
			row['hsnCode'] = $("#hsnCode").val();
			row['hsnId'] = $("#hsnId").val();
			row['subCategoryConcate'] = $("#subCategoryDesc").val();

			if (new String("Diamond").valueOf() == segmentVal) {
				row['subCategory'] = $("#shape option:selected").text();
				row['wgtRange'] = $("#weightRange").val();
				row['clarity'] = $("#clarity").val();
				row['actualColor'] = $("#actualColor").val();
				row['color'] = $("#color").val();
				row['cutGrade'] = $("#cutGrade").val();

			} else {
				row['subCategory'] = $("#subCategory option:selected").text();
			}

			if ($("#subCategoryDesc").val() != "") {
				$("#createStoneIndentGrid").jqxGrid('addrow', null, row);
			}

			$("#createStoneIndentGrid").jqxGrid('focus');	 
			 
		});

/* Stone Indent Details script */

$("#stoneIndentReturn").on(	"click",function(e) {
					var reqData = stoneMRVDetails();
					var reasonforReturn = $("#reasonforReturn").val();
					if(reqData == null || reqData == ""){
						$.growl.error({
							message : "Please Select Stone To Return",
							duration : 8000,
							title : 'Error'
						});
						return false;
					} 
					if (reasonforReturn == null || reasonforReturn == '') {
						$.growl.error({
							message : "Reason for return is mandatory",
							duration : 8000,
							title : 'Error'
						});
						return false;
					} else {
						$('#confirm').modal({
							backdrop : 'static',
							keyboard : false
						})
						$("#okProceed").on('click',	function(e) {
							postJSON('/OrderExecution/api/v1/stoneIndentReturn',JSON.stringify(reqData),function(data) {
								if (data.resCode == 1) {
									$('#stoneIndentData').modal('hide');
									$("#jqxgrid").jqxGrid("updatebounddata");
									$.growl.notice({message : "Successfully created Stone PO MRV Return: " + data.payload.stoneReturn,duration : 10000,	title : 'Success'});
								}
								else{
									$.growl.error({	message : data.mesgStr,durtaion : 1000,	title : 'Error'});
									return false;
								}
							});
						});
					}

				});


//===============================MRV Listing===============================================
function stonePOMRVFieldFilters(mrvNo, mrvSlNo){
	
	var fromDate = $("#orderFromDateMRV").val();
	var toDate = $("#orderToDateMRV").val();
	var stonePODate  = $("#stonePOdtMRV").val();
	var stonePONo = $("#stIndentNo").val();
	var stonePODate = $("#stonePOdtMRV").val();
	var segment = $("#stoneSegmentMRV").val();
	var mrvStatus = $("#mrvStatus").val();
	var vendorCode = $("#vendorCodeMRV-value").val();
	var vendor = $("#vendorCodeMRV").val();
	var mrvNo = $("#mrvNos").val();
	var parcelId = $("#parcelIdsMRV").val();
	var vendorInvNo = $("#vendorInvoiceNos").val();
	var mrvType = $("#typesMRV").val();
	var invoiceDate = $("#invoiceDate").val();
	
	fieldFilters = {
			"fieldFilters" : {}
	};
	
	
	if(fromDate != null && fromDate != ""){
		fieldFilters.fieldFilters['fromDate'] = fromDate;
	}
	
	if(toDate != null && toDate != ""){
		fieldFilters.fieldFilters['toDate'] = toDate;
	}

	if(stonePODate != null && stonePODate != ""){
		fieldFilters.fieldFilters['stonePODate'] = stonePODate;
	}
	
	if(stonePONo != null && stonePONo != "" && stonePONo != "-1"){
		fieldFilters.fieldFilters['stonePONo'] = stonePONo;
	}

	if(segment != null && segment != ""){
		fieldFilters.fieldFilters['segment'] = segment;
	}
	
	if(mrvStatus != null && mrvStatus != ""){
		fieldFilters.fieldFilters['mrvStatus'] = mrvStatus;
	}
	
	if(vendorCode != null && vendorCode != "" && vendor != null && vendor != ""){
		fieldFilters.fieldFilters['vendorCode'] = vendorCode;
	}
	
	if(mrvNo != null && mrvNo != ""){
		fieldFilters.fieldFilters['mrvNo'] = mrvNo;
	}
	
	if(mrvType != null && mrvType != ""){
		fieldFilters.fieldFilters['mrvType'] = mrvType;
	}
	if(invoiceDate != null && invoiceDate != ""){
		fieldFilters.fieldFilters['invoiceDate'] = invoiceDate;
	}

	return fieldFilters;
}

var stonePOMIVFieldFilters = function(){
	
	var orderFromDateMIV = $("#orderFromDateMIV").val();
	var orderToDateMIV = $("#orderToDateMIV").val();
	var stoneSegmentMIV = $("#stoneSegmentMIV").val();
	var prNoMIV = $("#prNoMIV").val();	
	var prDoneByMIV = $("#prDoneByMIV").val();
	var vendorMIV = $("#vendorCode-value").val();
	var vendor = $("#vendorMIV").val();
	
	var fieldFilters = {
			"fieldFilters" : {}
	};
	
	if(orderFromDateMIV != null && orderFromDateMIV != ""){
		fieldFilters.fieldFilters['orderFromDateMIV'] = orderFromDateMIV;
	}
	
	if(orderToDateMIV != null && orderToDateMIV != ""){
		fieldFilters.fieldFilters['orderToDateMIV'] = orderToDateMIV;
	}
	
	if(stoneSegmentMIV != null && stoneSegmentMIV != ""){
		fieldFilters.fieldFilters['stoneSegmentMIV'] = stoneSegmentMIV;
	}
	
	if(prNoMIV != null && prNoMIV != ""){
		fieldFilters.fieldFilters['prNoMIV'] = prNoMIV;
	}
	
	if(prDoneByMIV != null && prDoneByMIV != ""){
		fieldFilters.fieldFilters['prDoneByMIV'] = prDoneByMIV;
	}
	
	if(vendorMIV != null && vendorMIV != "" && vendor != null && vendor != ""){
		fieldFilters.fieldFilters['vendorMIV'] = vendorMIV;
	}

	return fieldFilters;
}

//print functionality done by venkat
var printGRVPO =  function(row) {
	var poNo =  $("#stonePOMRVGrid").jqxGrid('getcellvalue', row, 'printFlag');
	fieldFilters = {"fieldFilters" : {"stoneIndentNo" : poNo,"mode" : "pdf","reportName" : "RPT_Stone_GRV_Indent"}};
	jasperReport('RPT_Stone_GRV_Indent.pdf', fieldFilters); 	
}

var printGIVPO =  function(row) {
	var poNo =  $("#stonePOMIVGrid").jqxGrid('getcellvalue', row, 'printFlagMIV');
	fieldFilters = {"fieldFilters" : {"stoneIndentNo" : poNo,"mode" : "pdf","reportName" : "RPT_Stone_GIV_Indent"}};
	jasperReport('RPT_Stone_GIV_Indent.pdf', fieldFilters); 	
}

var mainMRVDetails = function(){
	
	var updateRows = function(rowid, newdata, commit) {
		
	}
	
	var printCall = function(row, column, value) {
		return '<a class="btn btn-danger btn-sm"  onclick="printGRVPO('+row+')" type="button" href="javascript:void(0);"><i class="fa fa-print fa-sm"></i></a>'
		
	}
   var  datafields =
        [
            { name: 'vendorName', type: 'string', map : 'stoneReceiptDTO>indentStoneDTO>vendorName' },
            { name: 'mrvType', type: 'int', map : 'stoneReceiptDTO>mrvType' },
            { name: 'mrvDate', type: 'date', map : 'stoneReceiptDTO>mrvDate' },
            { name: 'mrvNo', type: 'string', map : 'stoneReceiptDTO>id' },
            { name: 'mrvSlNo', type: 'int', map : 'serialNumber' },
            { name: 'poNo', type: 'int', map : 'stoneReceiptDTO>indentStoneDTO>stoneIndentId' },
            { name: 'poSlNo', type: 'int', map : 'indentStoneDetailDTO>serialNumber' },
            { name: 'location', type: 'string', map: 'locationCode' },
            { name: 'vendorInvDate', type: 'string', map: 'stoneReceiptDTO>billDt' },
            { name: 'vendorInvNo', type: 'number', map: 'stoneReceiptDTO>billNo' },
            { name: 'segment', type: 'number', map: 'stoneReceiptDTO>indentStoneDTO>segment' },
            { name: 'mainCat', type: 'number', map: 'indentStoneDetailDTO>category>description' },
            { name: 'subCat', type: 'number', map: 'indentStoneDetailDTO>subCategorydesc' },
            { name: 'wtRange', type: 'string', map: 'indentStoneDetailDTO>weightRange' },
            { name: 'noOfPcs', type: 'int', map: 'indentStoneDetailDTO>pieces' },
            { name: 'weight', type: 'float', map: 'stoneWeight' },
            { name: 'uqc', type: 'string', map: 'indentStoneDetailDTO>uqc' },
            { name: 'rateRs', type: 'float', map: 'stoneRatePerCaratInINR' },
            { name: 'invAmntBforeTax', type: 'float', map: 'stoneValue' },
            { name: 'perIgst', type: 'float', map: 'igstPrc' },
            { name: 'amtIgst', type: 'float', map: 'igstAmt' },
            { name: 'perCgst', type: 'float', map: 'cgstPrc' },
            { name: 'amtCgst', type: 'float', map: 'cgstAmt' },
            { name: 'perSgst', type: 'float', map: 'sgstPrc' },
            { name: 'amtSgst', type: 'float', map: 'sgstAmt' },
            { name: 'perCess', type: 'float', map: 'cessPrc' },
            { name: 'amtCess', type: 'float', map: 'cessAmt' },
            { name: 'total', type: 'float', map: 'totalValue' },
            { name: 'printFlag', type: 'int', map: 'stoneReceiptDTO>indentStoneDTO>stoneIndentId' }
        ];
   
    var columns = [
        { text: 'Vendor Name', datafield: 'vendorName',editable : false, width: "5%", cellsalign : 'left',sortable : true, menu:true, align:'center' },
        { text: 'GRV Type', datafield: 'mrvType', columntype: 'textbox',editable : false, width: "5%", cellsalign : 'center',sortable : true, menu:true, align:'center' },
        { text: 'GRV Date', datafield: 'mrvDate',editable : false, width: "5%",sortable : false, menu:false, cellsalign : 'center', align:'center', columntype : 'datetimeinput',cellsformat : 'dd/MM/yyyy'  },
        { text: 'GRV No.', datafield: 'mrvNo',editable : false,  width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center' },
        { text: 'GRV SL NO', datafield: 'mrvSlNo',editable : false,  width: "3%",sortable : true, menu:true, cellsalign : 'center', align:'center'},
        { text: 'PO No.', datafield: 'poNo',editable : false,  width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center'},
        { text: 'PO Sl No.', datafield: 'poSlNo',editable : false, width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center' },
        { text: 'Loc', datafield: 'location',editable : false, width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center'},
        { text: 'Vendor Inv. Date', datafield: 'vendorInvDate',editable : false, width: "5%",sortable : false, menu:false, cellsalign : 'center', align:'center'},
        { text: 'Vendor Inv. No', datafield: 'vendorInvNo',editable : false, width: "4%",sortable : false, menu:false, cellsalign : 'center', align:'center'},          
        { text: 'Segment', datafield: 'segment',editable : false, width: "5%", cellsalign : 'center',sortable : false, menu:false, align:'center'},
        { text: 'Main Cat.', datafield: 'mainCat',editable : false, width: "5%",sortable : false, menu:false, cellsalign : 'left', align:'center'},
        { text: 'Sub Cat.', datafield: 'subCat',editable : false, width: "8%",sortable : false, menu:false, cellsalign : 'left', align:'center'},
        { text: 'Wt. Range', datafield: 'wtRange',editable : false, width: "5%",sortable : false, menu:false, cellsalign : 'right', align:'center'},
        { text: 'No. Of pcs', datafield: 'noOfPcs',editable : false, width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center',
      	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['noOfPcs'] == null) ? 0 : record['noOfPcs'];
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } },
        { text: 'Weight', datafield: 'weight',editable : false, width: "5%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd3', 
      	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['weight'] == null) ? 0 : record['weight'];
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } },
        { text: 'UQC', datafield: 'uqc',editable : false, width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center'},
        { text: 'Rate Rs.', datafield: 'rateRs', width: "4%",sortable : false, menu:false,editable : false, cellsalign : 'right', align:'center',cellsformat: 'd2'},
        { text: 'Inv. Amt. Before Tax.', datafield: 'invAmntBforeTax', width: "6.5%",sortable : false, menu:false,editable : false, cellsalign : 'right', align:'center', cellsformat: 'd2', 
      	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['invAmntBforeTax'] == null) ? 0 : record['invAmntBforeTax'];
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {    
        		  	if(typeof aggregates["Total"] == "undefined"){
        				return '0.00';
        		  	}else{
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        		  	}
        	  } 
        },
        { text: '%', datafield: 'perIgst', editable : false,width: "3%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd2',columngroup : 'igst'},
        { text: 'Amt. Rs.', datafield: 'amtIgst', editable : false,width: "4%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd2',columngroup : 'igst',
        	 aggregates: [{          
       		  'Total': function(aggregatedValue, currentValue, column, record) {
   				  var total = (record['amtIgst'] == null) ? 0 : record['amtIgst'];
       			  return aggregatedValue + total;
       		  }
       	  	}],
       	  	aggregatesrenderer: function(aggregates) {      
       		  	if(typeof aggregates["Total"] == "undefined"){
       		  	return '0.00';
       		  	}else{
       			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
       		  	}
       	  	}
        },
        { text: '%', datafield: 'perCgst',editable : false, width: "3%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd2',columngroup : 'cgst'},
        { text: 'Amt. Rs.', datafield: 'amtCgst', width: "4%",sortable : false, menu:false,editable : false,cellsalign : 'right', align:'center', cellsformat: 'd2',columngroup : 'cgst',
        	aggregates: [{          
     		  'Total': function(aggregatedValue, currentValue, column, record) {
 				  var total = (record['amtCgst'] == null) ? 0 : record['amtCgst'];
     			  return aggregatedValue + total;
     		  }
     	  	}],
     	  	aggregatesrenderer: function(aggregates) {      
     		  	if(typeof aggregates["Total"] == "undefined"){
     		  	return '0.00';
     		  	}else{
     			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
     		  	}
     	  	}
        },
        { text: '%', datafield: 'perSgst',editable : false, width: "3%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd2',columngroup : 'sgst'},
        { text: 'Amt. Rs.', datafield: 'amtSgst',editable : false, width: "4%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd2',columngroup : 'sgst',
        	aggregates: [{          
       		  'Total': function(aggregatedValue, currentValue, column, record) {
   				  var total = (record['amtSgst'] == null) ? 0 : record['amtSgst'];
       			  return aggregatedValue + total;
       		  }
       	  	}],
       	  	aggregatesrenderer: function(aggregates) {      
       		  	if(typeof aggregates["Total"] == "undefined"){
       		  	return '0.00';
       		  	}else{
       			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
       		  	}
       	  	}
        },  
        { text: '%', datafield: 'perCess',editable : false, width: "3%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd2',columngroup : 'cess'},
        { text: 'Amt. Rs.', datafield: 'amtCess',editable : false, width: "4%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd2',columngroup : 'cess',
        	aggregates: [{          
         		  'Total': function(aggregatedValue, currentValue, column, record) {
     				  var total = (record['amtCess'] == null) ? 0 : record['amtCess'];
         			  return aggregatedValue + total;
         		  }
         	  	}],
         	  	aggregatesrenderer: function(aggregates) {      
         		  	if(typeof aggregates["Total"] == "undefined"){
         		  	return '0.00';
         		  	}else{
         			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
         		  	}
         	  	}
        },  	  
        { text: 'Total', datafield: 'total',editable : false, width: "5%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd2', 
      	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['total'] == null) ? 0 : record['total'];
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {      
        		  	if(typeof aggregates["Total"] == "undefined"){
        		  	return '0.00';
        		  	}else{
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        		  	}
        	  } 
        },
        { text: '', datafield: 'printFlag',editable : false, width: "2%",sortable : false,align:'center',cellsrenderer : printCall},  	  
        
      ];
   
    showMyGridCustom(datafields, "/OrderExecution/api/v1/stonePOMRVList", "list", columns, stonePOMRVFieldFilters(), updateRows, "", "#stonePOMRVGrid");
   
    
    $("#stonePOMRVGrid").jqxGrid({    	
    	width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
         showstatusbar: true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		columngroups : [ {
			text : 'IGST',
			align : 'center',
			name : 'igst'
		}, {
			text : 'CGST',
			align : 'center',
			name : 'cgst'
		}, {
			text : 'SGST',
			align : 'center',
			name : 'sgst'
		}, {
			text : 'Cess',
			align : 'center',
			name : 'cess'
		}]
    });
}


var mainMIVDetails = function(){
	
	var updateRows = function(rowid, newdata, commit) {		
	}
	
	var printCallMIV = function(row, column, value) {
		return '<a class="btn btn-primary btn-sm"  onclick="printGIVPO('+row+')" type="button" href="javascript:void(0);"><i class="fa fa-print fa-sm"></i></a>'
		
	}
	
	var  datafields =
        [
            { name: 'vendorName', type: 'long', map : 'stoneReceiptDTO>indentStoneDTO>vendorName' },
            { name: 'prType', type: 'int', map : 'stoneReturnDTO>stoneReturnType' },
            { name: 'pDate', type: 'string', map : 'stoneReturnDTO>createdDate' },
            { name: 'prNo', type: 'int', map : 'stoneReturnDTO>id' },
            { name: 'prSlNo', type: 'int', map : 'serialNumber' },
            { name: 'refType', type: 'string' },
            { name: 'refInvNo', type: 'int', map : 'stoneReceiptDTO>billNo' },
            { name: 'refSlNo', type: 'string', map: 'indentStoneDetailDTO>serialNumber' },
            { name: 'vendorInvDate', type: 'string', map: 'stoneReceiptDTO>billDt' },
            { name: 'location', type: 'number', map: 'locationCode' },
            { name: 'segment', type: 'number', map: 'stoneReceiptDTO>indentStoneDTO>segment' },
            { name: 'mainCat', type: 'number', map: 'indentStoneDetailDTO>category>description' },
            { name: 'subCat', type: 'number', map: 'indentStoneDetailDTO>subCategorydesc' },
            { name: 'wtRange', type: 'string', map: 'indentStoneDetailDTO>weightRange' },
            { name: 'noOfPcs', type: 'int', map: 'indentStoneDetailDTO>pieces' },
            { name: 'weight', type: 'float', map: 'stoneWeight' },
            { name: 'uqc', type: 'string', map: 'indentStoneDetailDTO>uqc' },
            { name: 'rateRs', type: 'float', map: 'stoneRatePerCaratInINR' },
            { name: 'amntBforeTax', type: 'float', map: 'stoneValue' },
            { name: 'perIgst', type: 'string', map: 'igstPrc' },
            { name: 'amtIgst', type: 'float', map: 'igstAmt' },
            { name: 'perCgst', type: 'string', map: 'cgstPrc' },
            { name: 'amtCgst', type: 'float', map: 'cgstAmt' },
            { name: 'perSgst', type: 'string', map: 'sgstPrc' },
            { name: 'amtSgst', type: 'float', map: 'sgstAmt' },
            { name: 'perCess', type: 'float', map: 'cessPrc' },
            { name: 'amtCess', type: 'float', map: 'cessAmt' },
            { name: 'total', type: 'float', map: 'totalValue' },
            { name: 'printFlagMIV', type: 'float', map: 'stoneReturnDTO>id' }
        ]

	var columns = [
        { text: 'Vendor', datafield: 'vendorName', width: "5%", cellsalign : 'center',sortable : true, menu:true, align:'center' },
        { text: 'PR Type', datafield: 'prType', columntype: 'textbox', width: "5%", cellsalign : 'center',sortable : true, menu:true, align:'center' },
        { text: 'PR Date', datafield: 'pDate', width: "6%",sortable : false, menu:false, cellsalign : 'center', align:'center',cellsformat : 'dd/MM/yyyy' },
        { text: 'PR No.', datafield: 'prNo',  width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center' },
        { text: 'PR SL NO', datafield: 'prSlNo',  width: "3%",sortable : true, menu:true, cellsalign : 'center', align:'center', cellsformat : 'dd/MM/yyyy' },
        { text: 'Ref Type', datafield: 'refType',  width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center',
      	  cellsrenderer: function(row, column, value){
      		return "<div align='center'style='margin-top:8px;'>GIV</div>";
      	}  
        },
        { text: 'Ref/Vendor Inv. No.', datafield: 'refInvNo', width: "5%",sortable : false, menu:false, cellsalign : 'center', align:'center' },
        { text: 'Ref  Sl No.', datafield: 'refSlNo', width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center'},
        { text: 'Vendor Inv. Date', datafield: 'vendorInvDate', width: "5%",sortable : false, menu:false, cellsalign : 'center', align:'center', cellsformat : 'dd/MM/yyyy'},
        { text: 'Loc', datafield: 'location', width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center'},          
        { text: 'Segment', datafield: 'segment', width: "5%", cellsalign : 'center',sortable : false, menu:false, align:'center'},
        { text: 'Main Cat.', datafield: 'mainCat', width: "5%",sortable : false, menu:false, cellsalign : 'center', align:'center'},
        { text: 'Sub Cat.', datafield: 'subCat', width: "5%",sortable : false, menu:false, cellsalign : 'center', align:'center'},
        { text: 'Wt. Range', datafield: 'wtRange', width: "5%",sortable : false, menu:false, cellsalign : 'right', align:'center'},
        { text: 'No. Of pcs', datafield: 'noOfPcs', width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center',
      	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['noOfPcs'] == null) ? 0 : record['noOfPcs'];
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } },
        { text: 'Weight', datafield: 'weight', width: "5%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd3', 
      	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['weight'] == null) ? 0 : record['weight'];
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  } },
        { text: 'UQC', datafield: 'uqc', width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center'},
        { text: 'Rate Rs.', datafield: 'rateRs', width: "3%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd2'},
        { text: 'Amt. Before Tax.', datafield: 'amntBforeTax', width: "6%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd2',
      	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['amntBforeTax'] == null) ? 0 : record['amntBforeTax'];
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
        	  }
        },
        { text: '%', datafield: 'perIgst', width: "3%",sortable : false, menu:false, cellsalign : 'right', align:'center',columngroup : 'igst', cellsformat: 'd2'},
        { text: 'Amt. Rs.', datafield: 'amtIgst', width: "4%",sortable : false, menu:false, cellsalign : 'right', align:'center',columngroup : 'igst', cellsformat: 'd2',
        	aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['amtIgst'] == null) ? 0 : record['amtIgst'];
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {        		 
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
      	  }
        },
        { text: '%', datafield: 'perCgst', width: "3%",sortable : false, menu:false, cellsalign : 'right', align:'center',columngroup : 'cgst', cellsformat: 'd2'},
        { text: 'Amt. Rs.', datafield: 'amtCgst', width: "4%",sortable : false, menu:false, cellsalign : 'right', align:'center',columngroup : 'cgst', cellsformat: 'd2',
        	aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['amtCgst'] == null) ? 0 : record['amtCgst'];
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
  	          		if(typeof aggregates["Total"] == "undefined"){
  	      				return '0.00';
  	      		  	}else{
  	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
  	      		  	}
        	  }
        },
        { text: '%', datafield: 'perSgst', width: "3%",sortable : false, menu:false, cellsalign : 'right', align:'center',columngroup : 'sgst', cellsformat: 'd2'},
        { text: 'Amt. Rs.', datafield: 'amtSgst', width: "4%",sortable : false, menu:false, cellsalign : 'right', align:'center',columngroup : 'sgst', cellsformat: 'd2',
        	aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['amtSgst'] == null) ? 0 : record['amtSgst'];
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {        		 
	          		if(typeof aggregates["Total"] == "undefined"){
	      				return '0.00';
	      		  	}else{
	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	      		  	}
      	  }
        },
        { text: '%', datafield: 'perCess', width: "3%",sortable : false, menu:false, cellsalign : 'right', align:'center',columngroup : 'cess', cellsformat: 'd2'},
        { text: 'Amt. Rs.', datafield: 'amtCess', width: "4%",sortable : false, menu:false, cellsalign : 'right', align:'center',columngroup : 'cess', cellsformat: 'd2',
        	aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['amtCess'] == null) ? 0 : record['amtCess'];
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
  	          		if(typeof aggregates["Total"] == "undefined"){
  	      				return '0.00';
  	      		  	}else{
  	      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
  	      		  	}
        	  }
        },
        { text: 'Total', datafield: 'total', width: "6.5%",sortable : false, menu:false, cellsalign : 'right', align:'center', cellsformat: 'd2', 
      	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['total'] == null) ? 0 : record['total'];
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {      
        		  	if(typeof aggregates["Total"] == "undefined"){
        		  	return '0.00';
        		  	}else{
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        		  	}
        	  } 
        },
        { text: '', datafield: 'printFlagMIV',editable : false, width: "2%",sortable : false,align:'center',cellsrenderer : printCallMIV}
      ];
    
    showMyGridCustom(datafields, "/OrderExecution/api/v1/stonePOMIVList", "list", columns, stonePOMIVFieldFilters(), updateRows, "", "#stonePOMIVGrid");
    
    $("#stonePOMIVGrid").jqxGrid(
    {
    	width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		theme: 'energyblue',
		virtualmode : true,
        showstatusbar: true,
	    statusbarheight: 20,
	    showaggregates: true,       
		columngroups : [ {
			text : 'IGST',
			align : 'center',
			name : 'igst'
		}, {
			text : 'CGST',
			align : 'center',
			name : 'cgst'
		}, {
			text : 'SGST',
			align : 'center',
			name : 'sgst'
		}, {
			text : 'Cess',
			align : 'center',
			name : 'cess'
		} ]
    });
}

var stoneMIVLov = function(){
	$('#stoneSegmentMIV').empty().append('<option value="" selected>--Select--</option>');
	$('#prDoneByMIV').empty().append('<option value="" selected>--Select--</option>');
	getJSON('/OrderExecution/api/v1/stoneIndentLOV?page=stonePOMIV', function(data) {
		if(data.resCode == 1){
			$.each(data.payload.mTypes,function(key, val) {
				$('#stoneSegmentMIV').append('<option code="' + val.code + '" value="' + val.id + '">' + val.description + '</option>');
			});
			
			
			$.each(data.payload.prDoneBy,function(key, val) {
				$('#prDoneByMIV').append('<option code="' + val.empId + '" value="' + val.id + '">' + val.name + '</option>');
			});
			
			
			vendorList = data.payload.vendors;
			var data = [];
			$.each( vendorList, function( key, value ) {			      
					data.push({ value: value.id, label: value.vendorCode + "-" + value.vendorName});
			});
			
				
			$("#vendorMIV").autocomplete({						
				source: data,
				focus: function(event, ui) {						
					event.preventDefault();
					$(this).val(ui.item.label);						
				},
				select: function(event, ui) {					
					event.preventDefault();
					$(this).val(ui.item.label);					
					$("#vendorCode-value").val(ui.item.value);					
				}
			});
		}
	});
}
		
stoneMIVLov();


$("#exportPOMIV").on('click', function() {
	var data;
	var newData = [];
	
	var orderFromDateMIV = $("#orderFromDateMIV").val();
	var orderToDateMIV = $("#orderToDateMIV").val();
	var stoneSegmentMIV = $("#stoneSegmentMIV").val();
	var prNoMIV = $("#prTypeMIV").val();	
	var prDoneByMIV = $("#prDoneByMIV").val();
	var vendorMIV = $("#vendorMIV").val();
	
	var fieldFilters = {
			"fieldFilters" : {}
	};
	
	fieldFilters['filterscount'] = 0;
	fieldFilters['groupscount'] = 0;
	fieldFilters['sortdatafield'] = "stoneMIVId";
	fieldFilters['sortorder'] = "asc";
	fieldFilters['pagenum'] = 0;
	fieldFilters['pagesize'] = 20;
	fieldFilters['recordstartindex'] = 0;
	fieldFilters['recordendindex'] = 20;
	fieldFilters['offset'] = 0;
	fieldFilters['sortingFields'] = {
		    "stoneMIVId": true
	};
	
	if(orderFromDateMIV != null && orderFromDateMIV != ""){
		fieldFilters.fieldFilters['orderFromDateMIV'] = orderFromDateMIV;
	}
	
	if(orderToDateMIV != null && orderToDateMIV != ""){
		fieldFilters.fieldFilters['orderToDateMIV'] = orderToDateMIV;
	}
	
	if(stoneSegmentMIV != null && stoneSegmentMIV != ""){
		fieldFilters.fieldFilters['stoneSegmentMIV'] = stoneSegmentMIV;
	}
	
	if(prNoMIV != null && prNoMIV != ""){
		fieldFilters.fieldFilters['prNoMIV'] = prNoMIV;
	}
	
	if(prDoneByMIV != null && prDoneByMIV != ""){
		fieldFilters.fieldFilters['prDoneByMIV'] = prDoneByMIV;
	}
	
	if(vendorMIV != null && vendorMIV != ""){
		fieldFilters.fieldFilters['vendorMIV'] = orderFromDateMIV;
	}
	
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var rows = $("#stonePOMIVGrid").jqxGrid('getrows');
	if(typeof rows == "undefined" || rows == [] || rows.length == 0){
		$.growl.error({
			message : "No Data to Export.",
			duration : 8000
		});
		return false;
	}else{
	postJSON('/OrderExecution/api/v1/stonePOMIVExport',JSON.stringify(fieldFilters), function(response) {
		if(null != response){
			data = response.payload.list;
			for(i=0; i<data.length; i++){
				var obj = data[i];
				var receipt = {
						'Vendor' :(null!=obj.stoneReceiptDTO.indentStoneDTO.vendorName)?obj.stoneReceiptDTO.indentStoneDTO.vendorName :" ",
						'PR Type' : (null!=obj.stoneReturnDTO.stoneReturnType)?obj.stoneReturnDTO.stoneReturnType :" ",
						'PR Date' : (null!=obj.stoneReturnDTO.createdDate)?obj.stoneReturnDTO.createdDate :" ",
						'PR No' : (null!=obj.stoneReturnDTO.id)?obj.stoneReturnDTO.id :" ",						
						'PR SL No' : (null!=obj.serialNumber)?obj.serialNumber :" ",
						'Ref Type' : "MRV",
						'Ref/Vendor Inv No' : (null!=obj.stoneReceiptDTO.billNo)?obj.stoneReceiptDTO.billNo :" ",							
						'Ref SL No' : (null!=obj.indentStoneDetailDTO.serialNumber)?obj.indentStoneDetailDTO.serialNumber :" ",
						'Vendor Inv Date' : (null!=obj.stoneReceiptDTO.billDt)?obj.stoneReceiptDTO.billDt :" ",						
						'Location' : (null!=obj.locationCode)?obj.locationCode :" ",
						'Segment' : (null!=obj.stoneReceiptDTO.indentStoneDTO.segment)?obj.stoneReceiptDTO.indentStoneDTO.segment :" ",						
						'Category' : (null!=obj.indentStoneDetailDTO.category.description)?obj.indentStoneDetailDTO.category.description :" ",						
						'Sub Catagory' : (null!=obj.indentStoneDetailDTO.subCategorydesc)?obj.indentStoneDetailDTO.subCategorydesc :" ",						
						'Wt Range' : (null!=obj.indentStoneDetailDTO.weightRange)?obj.indentStoneDetailDTO.weightRange :" ",						
						'No.Of Pcs' : (null!=obj.indentStoneDetailDTO.pieces)?obj.indentStoneDetailDTO.pieces :" ",						
						'Weight' : (null!=obj.stoneWeight)?obj.stoneWeight :" ",						
						'UQC' : (null!=obj.indentStoneDetailDTO.uqc)?obj.indentStoneDetailDTO.uqc :" ",						
						'Rate Rs.' : (null!=obj.stoneRatePerCaratInINR)?obj.stoneRatePerCaratInINR :" ",						
						'Invoive Amt Before' : (null!=obj.stoneValue)?obj.stoneValue:"",						
						'IGST %' : (null!=obj.igstPrc)?obj.igstPrc :" ",							
						'IGST Amt' : (null!=obj.igstAmt)?obj.igstAmt :" ",						
						'CGST %' : (null!=obj.cgstPrc)?obj.cgstPrc :" ",						
						'CGST Amt' : (null!=obj.cgstAmt)?obj.cgstAmt :" ",						
						'SGST %' : (null!=obj.sgstPrc)?obj.sgstPrc :" ",					
						'SGST Amt' : (null!=obj.sgstAmt)?obj.sgstAmt :" ",							
						'Cess %' : (null!=obj.cessPrc)?obj.cessPrc :" ",							
						'Cess Amt' : (null!=obj.cessAmt)?obj.cessAmt :"",							
						'Total' : (null!=obj.totalValue)?obj.totalValue :" "						
					}
					newData.push(receipt);							
			   }	
			//JSONToCSVConvertor(newData, "StonePOMIVReport" + "_" + sysdate, true);
		      var opts = [{sheetid:'StonePO_MIV_Report',header:true}];
              var res = alasql('SELECT * INTO XLSX("StonePO MIV Report_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
			}
		});
	}
});

$("#clearPOMRV").on('click', function(){
	$("#stonePOMRVGrid").jqxGrid('clear');
	$("#stonePOMRVGrid").hide();
});

$("#clearPOMIV").on('click', function(){
	$("#stonePOMIVGrid").jqxGrid('clear');
	$("#stonePOMIVGrid").hide();
});

/* STONE SEARCH CODE FOR STONE PO */
var hsnFlag= $("#hsnFlag").val();
if(typeof hsnFlag == "undefined"){
	$("#hsnDiv").hide();
}else if(hsnFlag == 1){
	$("#hsnDiv").show();
}else{
	$("#hsnDiv").hide();
}
$("#hsnDiv").hide();

//ON CHANGE OF SUPPLIER
var loadOnChangeSeg = function(seg, SegName){
	if ( seg == "" || seg == null || typeof seg == "undefined") {
		clearStoneData(2);
		return;
	}
	if (seg != null || seg != "" || typeof seg != "undefined") {
		clearStoneData(2);
		var params = {
			"fieldFilters" : {
				"suppliedBy" : $("#suppBy").val(),
				"sSegId" : (seg == null) ? $('#segment').val() : seg,
				"sSeg" : (SegName == null) ? $('#segment option:selected').text() : SegName
			}
		};
		if ($("#suppBy").val() == "V"|| $("#suppBy").val() == "COV") {
			params.fieldFilters.vId = $("#vendorCode-value").val();
		}
		$('#mainCategory').empty().append('<option value="" selected>-- Select Option --</option>');
		postJSON('api/v1/getStoneCategories', JSON.stringify(params), function(data) {
			if (1 == data.resCode) {
				$.each(data.payload.mainCatList, function(key,val) {
					$('#mainCategory').append('<option value="' + val.id + '">'+ val.description+ '</option>');
				});
			}
		});
		var segmentName = $('#segment option:selected').text();
		if (segmentName == "Diamond") {
			$("#showShape").show();
			$("#showSubCategory").hide();
		} else {
			$("#showShape").hide();
			$("#showSubCategory").show();
		}
		if (isExtraStoneField()) {
			$("#showWeightRange").show();
			$("#showClarity").show();
			$("#showColor").show();
			$("#showCutGrade").show();
		} else {
			$("#showWeightRange").hide();
			$("#showClarity").hide();
			$("#showColor").hide();
			$("#showCutGrade").hide();
			$("#showActualColor").hide();
		}
	}
}
//ON CHANGE OF SEGMENT
$("#segment").on("change",function() {
	var metalSegement = $("#metalSegment").val();
	var metalSegementName = $("#metalSegment option:selected").text();
	loadOnChangeSeg(metalSegement, metalSegementName);
});


//ON CHANGE OF MAIN_CATEGORY
$("#mainCategory").on("change", function() {
	var segId = $('#segment').val();
	var catId = $("#mainCategory").val();

	
	if (isExtraStoneField()) {
		$("#showWeightRange").show();
		$("#showClarity").show();
		$("#showColor").show();
		$("#showCutGrade").show();
	} else {
		$("#showWeightRange").hide();
		$("#showClarity").hide();
		$("#showColor").hide();
		$("#showCutGrade").hide();
		$("#showActualColor").hide();
	}
	
	if ($("#mainCategory").val() == "") {
		clearStoneData(3);
		return;
	}
	if ($("#suppBy").val() != "" && $("#segment").val() != "" && $("#mainCategory").val() != "") {
		clearStoneData(3);
		var params = {
			"fieldFilters" : {
				"suppliedBy" : "CO",
				"sSegId" : $('#segment').val(),
				"sSeg" : $('#segment option:selected').text(),
				"catId" : $("#mainCategory").val()
			}
		};
		if ($("#suppBy").val() == "V"|| $("#suppBy").val() == "COV") {
			params.fieldFilters.vId = $("#vendorCode-value").val();
		}
		var segmentName = $('#segment option:selected').text();
		if (segmentName == "Diamond") {
			$("#showShape").show();
			$("#showSubCategory").hide();
			$('#shape').empty().append('<option value="" selected>-- Select Option --</option>');
			postJSON('api/v1/getShapes',JSON.stringify(params),function(data) {
				if (1 == data.resCode) {
					$.each(data.payload.subCatList,function(key, val) {
						$('#shape').append('<option value="'+ val.id+ '">'+ val.description+ '</option>');
					});
				
				}
			});
			if (isActualColorField()) {
				$("#showActualColor").show();
			} else {
				$("#showActualColor").hide();
			}
		} else {
			$("#showShape").hide();
			$("#showSubCategory").show();
			$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
			postJSON('api/v1/getStoneSubCategories', JSON.stringify(params), function(data) {
				if (1 == data.resCode) {
					$.each(data.payload.subCatList, function(key, val) {
						$('#subCategory').append('<option value="' + val.name+ '">'+ val.description+ '</option>');
					});
				}
			});
			
		}
	}
});


//ON CHANGE OF SHAPE
$("#shape").on("change",function() {
	if ($("#shape").val() == "") {
		clearStoneData(4);
		return;
	}
	if ($("#suppBy").val() != "" && $("#segment").val() != "" && $("#mainCategory").val() != "" && $("#shape") != "") {
		clearStoneData(4);
		var params = {
			"fieldFilters" : {
				"segId" : $('#segment').val(),
				"catId" : $("#mainCategory").val(),
				"suppliedBy" : $("#suppBy").val(),
				"shapeId" : $("#shape").val()
			}
		};
		var suppliedBy = $("#suppBy").val();
		if (suppliedBy == "V" || suppliedBy == "COV") {
			params.fieldFilters.vId = $("#vendorCode-value").val();
		}

		postJSON('api/v1/getStoneCodeAndOthers',JSON.stringify(params), function(data) {
			if (1 == data.resCode) {
				$("#stoneCode").val(data.payload.stoneDetails.name);
				$("#uom").val(data.payload.uom);
			}
			$.each(data.payload.weightSlab, function(key, val) {
				$('#weightRange').append('<option value="' + val.id + '">'+ val.id + '</option>');
			});
			$.each(data.payload.clarity, function(key, val) {
				$('#clarity').append('<option value="' + val.id + '">'+ val.id + '</option>');
			});
			$.each(data.payload.actualColor,function(key, val) {
				$('#actualColor').append('<option value="' + val.id+ '">' + val.id+ '</option>');
			});
			$.each(data.payload.color, function(key, val) {
				$('#color').append('<option value="' + val.id + '">'+ val.id + '</option>');
			});
			$.each(data.payload.cutGrade, function(key, val) {
				$('#cutGrade').append('<option value="' + val.id + '">'+ val.id + '</option>');
			});
			
			var hsnCode = (data.payload.stoneDetails.description).split("@");
			$('#hsnCode').val(hsnCode[0]);
			$("#hsnId").val(hsnCode[1]);
			
			$("#hsnDiv").show();
		});
	}

});


// ON CHANGE OF SUB_CATEGORY
$("#subCategory").on("change",function() {
	if ($("#subCategory").val() == "") {
		clearStoneData(4);
		return;
	}
	if ($("#suppBy").val() != "" && $("#segment").val() != "" && $("#subCategory") != "") {
		clearStoneData(4);
		var params = {
			"fieldFilters" : {
				"segId" : $('#segment').val(),
				"catId" : $("#mainCategory").val(),
				"suppliedBy" : $("#suppBy").val(),
				"subCatCode" : $("#subCategory").val()
			}
		};
		var suppliedBy = $("#suppBy").val();
		if (suppliedBy == "V" || suppliedBy == "COV") {
			params.fieldFilters.vId = $("#vendorCode-value").val();
		}
		postJSON('api/v1/getStoneCodeAndOthers',JSON.stringify(params), function(data) {
			if (1 == data.resCode) {
				$("#stoneCode").val(data.payload.stoneDetails.name);
				$("#uom").val(data.payload.stoneDetails.value);
				var hsnCode = (data.payload.stoneDetails.description).split("@");
				$('#hsnCode').val(hsnCode[0]);
				$("#hsnId").val(hsnCode[1]);
				
				$("#hsnDiv").show();
				
				$("#subCategoryDesc").val($('#subCategory option:selected').text());
				$.each(data.payload.stoneDetails.rateList,function(key, val) {
					$('#rate').append('<option value="' + val+ '">' + val+ '</option>');
				});
			}
		});
	}
});


// ON CHANGE OF CUT_GRADE
$("#cutGrade").on("change", function() {
	updateSubCatDes();
});

$("#selectStone").on("click", function() {
	var suppBy = $("#suppBy").val();
	var segmentCode = $("#segmentName option:selected").attr('code');
	var mainCategory = $("#mainCategory").val();
	var mainCategoryCode = $("#mainCategory option:selected").attr('code');
	var subCategoryName = $("#subCategoryName").val();
	var weightRange = $("#weightRange").val();
	var clarity = $("#clarity").val();
	var actualColor = $("#actualColor").val();
	var color = $("#color").val();
	var cutGrade = $("#cutGrade").val();
	var costRange = $("#costRange").val();
	var shape = $("#shape").val();
	if(suppBy == "" || segmentCode == ""){
		$.growl.error({	message : "Please select the mandatory fields.",duration : 5000,title : 'Error'	});
		return false;
	}
	if(segmentCode == "DI" && (mainCategory == "" || shape == "" || weightRange == "" || clarity == "" || color == "" || cutGrade == "")){
		$.growl.error({	message : "Please select the mandatory fields.",duration : 5000,title : 'Error'	});
		return false;
	}
	
	if(segmentCode == "DI" && (mainCategoryCode == "CM" || mainCategoryCode == "CS" || mainCategoryCode == "CP") && actualColor == ""){
		$.growl.error({	message : "Please select the mandatory fields.",duration : 5000,title : 'Error'	});
		return false;
	}
	
	if(segmentCode != "DI" && (mainCategory == "" || subCategoryName == "" || costRange == "")){
		$.growl.error({	message : "Please select the mandatory fields.",duration : 5000,title : 'Error'	});
		return false;
	}
	
	if(hsnFlag == 1 && $('#hsnCode').val() == ""){
		$.growl.error({
			message : "Please select the mandatory fields.",
			duration : 5000,
			title : 'Error'
		});
		return false;
	}
	if ($("#subCategoryDesc").val() == "") {
		$.growl.error({
			message : "Please select the mandatory fields.",
			duration : 5000,
			title : 'Error'
		});
		return false;
	} else {
		updateSubCatDes();
	}
});

$("#closeSearch").on("click", function() {
	$("#subCategoryDesc").val("");
});

function updateSubCatDes() {
	var hsnCode = $('#hsnCode').val();
	var segmentName = $('#segment option:selected').text();
	var mainCategory = $('#mainCategory option:selected').text();
	var shape = $('#shape option:selected').text();
	var weightRange = $('#weightRange option:selected').text();
	var clarity = $('#clarity option:selected').text();
	var color = $('#color option:selected').text();
	var cutGrade = $('#cutGrade option:selected').text();
	if (segmentName != null && mainCategory != null && shape != null && segmentName == "Diamond") {
		var subCategoryDesc = segmentName + " " + mainCategory + " " + shape + " ";
		if (clarity != null) {
			subCategoryDesc += clarity + " ";
		}
		if (color != null) {
			subCategoryDesc += color + " ";
		}
		if (cutGrade != null) {
			subCategoryDesc += cutGrade + " ";
		}
		if (weightRange != null) {
			subCategoryDesc += weightRange + " ";
		}
		$("#subCategoryDesc").val(subCategoryDesc);
	}
}

function isExtraStoneField() {
	if ($("#suppBy").val() == "CU") {
		return false;
	} else if ($('#segment option:selected').text() == "Diamond") {
		return true;
	} else {
		return false;
	}
}

function isActualColorField() {
	var mainCategory = $('#mainCategory option:selected').text();
	if (mainCategory != null) {
		var firstWord = mainCategory.split(' ')[0];
		if (firstWord == "CD") {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function clearStoneData(level) {
	if (level <= 1) {
		$("#segment").empty().append('<option value="" selected>-- Select Option --</option>');
	}
	if (level <= 2) {
		$("#mainCategory").empty().append('<option value="" selected>-- Select Option --</option>');
	}
	if (level <= 3) {
		$("#shape").empty().append('<option value="" selected>-- Select Option --</option>');
		$("#subCategory").empty().append('<option value="" selected>-- Select Option --</option>');
	}
	if (level <= 4) {
		$('#weightRange').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#clarity').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#actualColor').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#color').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#cutGrade').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#rate').empty().append('<option value="" selected>-- Select Option --</option>');
		$("#stoneCode").val('');
		$("#uom").val('');
		$("#subCategoryDesc").val('');
	}
}

$("#clear").on('click',function(){
	$("#mainCategory").val("");
	$("#shape").val("");
	$("#stoneCode").val("");
	$("#weightRange").val("");
	$("#clarity").val("");
	$("#actualColor").val("");
	$("#color").val("");
	$("#cutGrade").val("");
	$("#uom").val("");
	$("#subCategoryDesc").val("");
	$("#hsnCode").val("");
	$('#subCategory').val("");
});

$("#clearIndent").on('click',function(){
	$("#jqxgrid").hide();
});

$('#stoneIndentData').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();
});