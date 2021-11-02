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


$("#orderFromDate").datepicker({
	 changeMonth: true,
      changeYear: true,
      dateFormat:"dd/mm/yy",
      minDate: $("#sentParcelDate").val(),
      maxDate:0
});

$("#orderToDate").datepicker({
	 changeMonth: true,
     changeYear: true,
     dateFormat:"dd/mm/yy",
     minDate: $("#orderFromDate").val(),
     maxDate:0
});

$("#partyBillDate").datepicker({
	 changeMonth: true,
     changeYear: true,
     dateFormat:"dd/mm/yy",
     minDate: 0,
     maxDate:0
});

//ON LOAD LOV'S
var onloadLov = function(){/*
	$.getJSON('/OrderExecution/api/v1/brListOnLoadLov', function(data) {
		$('#metalSegment').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.mSegments, function(key, val) {
				$('#metalSegment').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
		$('#status').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.status, function(key, val) {
				$('#status').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
		$('#bullionDealer').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.bdealerList, function(key, val) {
				$('#bullionDealer').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
	});
*/} 
onloadLov();

// FieldFilter for Search Grid
var fieldFilterValue = function(){
	
	fieldFilters = {"fieldFilters" : {}};

	var orderFromDate = $('#orderFromDate').val();
	var orderToDate = $('#orderToDate').val();
	var partyBillDate = $('#partyBillDate').val();
	var partyBillNo = $('#partyBillNo').val();
	var indentPONo = $('#indentPONo').val();
	var metalSegment = $('#metalSegment').val();
	var status = $('#status').val();
	var bullionDealer = $('#bullionDealer').val();
	var poReceiptNo = $('#poReceiptNo').val();
	

	if (orderFromDate != "" && orderFromDate != null) {	fieldFilters.fieldFilters["fromDate"] = orderFromDate;}

	if (orderToDate != "" && orderToDate != null) {	fieldFilters.fieldFilters["toDate"] = orderToDate;}

	if (partyBillDate != "" && partyBillDate != null) {	fieldFilters.fieldFilters["partyBillDate"] = partyBillDate;}

	if (partyBillNo != "" && partyBillNo != null) {	fieldFilters.fieldFilters["partyBillNo"] = partyBillNo;}
	
	if (indentPONo != "" && indentPONo != null) { fieldFilters.fieldFilters["indentPONo"] = indentPONo;}
	
	if (metalSegment != "" && metalSegment != null) { fieldFilters.fieldFilters["segmentId"] = metalSegment;}
	
	if (bullionDealer != "" && bullionDealer != null) {	fieldFilters.fieldFilters["bDealerId"] = bullionDealer;}
	
	if (poReceiptNo != "" && poReceiptNo != null) {	fieldFilters.fieldFilters["bmrvNo"] = poReceiptNo;}

	if (status != "" && status != null) {fieldFilters.fieldFilters["status"] = status;}
	
	return fieldFilters;
}

// Bullion Receipt Grid
var bullionReceiptGrid = function(){
	var updateRows = function(rowid, newdata, commit) {}
	
	var datafields = [ 
		{name : 'bullionDealer', type : 'string','map':'indentDTO>bullionDealerName'},
		{name : 'bmrvDate', type : 'date','map':'createdDate'},
		{name : 'bmrvNo', type : 'long','map':'id'},
		{name : 'poNo', type : 'long','map':'indentDTO>id'},
		{name : 'location', type : 'string','map':'indentDTO>location'},
		{name : 'partyBillNo', type : 'long','map':'billNumber'},
		{name : 'partyBillDate', type : 'date','map':'billDate'},
		{name : 'segment', type : 'string','map':'indentDTO>segmentName'},
		{name : 'purity', type : 'string','map':'purity'},
		{name : 'weight', type : 'float','map':'receivedWeight'},
		{name : 'uom', type : 'string','map':'uom'},
		{name : 'metalRate', type : 'float','map':'metalRate'},
		{name : 'metalValue', type : 'float','map':'metalValue'},
		{name : 'commission', type : 'string','map':'commission'},
		{name : 'insCharges', type : 'float','map':'insurance'},
		{name : 'courierCharges', type : 'float','map':'courier'},
		{name : 'cgstPer', type : 'string','map':'cgstperc'},
		{name : 'cgstAmt', type : 'float','map':'cgstAmnt'},
		{name : 'sgstPer', type : 'string','map':'sgstperc'},
		{name : 'sgstAmt', type : 'float','map':'sgstAmnt'},
		{name : 'gstPer', type : 'string','map':'igstPerc'},
		{name : 'gstAmt', type : 'float','map':'igstAmnt'},
		{name : 'cessPer', type : 'string','map':'cessPerc'},
		{name : 'cessAmt', type : 'float','map':'cessAmnt'},
		{name : 'totAmt', type : 'float','map':'totalAmount'},
		{name : 'hsnCode', type : 'string','map':'indentDTO>hsnCode'},
		{name: 'printId',type:'int','map':'indentDTO>id'}
	];

	var columns = [
		{text : 'Bullion Dealer',datafield : 'bullionDealer',width : '4%',cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'BGRV Date',datafield : 'bmrvDate',width : '4%', cellsalign : 'center',align : 'center', sortable : true,editable : false, columntype : 'datetimeinput', cellsformat : 'dd/MM/yyyy'},
		{text : 'GRV Number',datafield : 'bmrvNo',width : '4%', cellsalign : 'center',align : 'center', sortable : true,editable : false},
		{text : 'PO No.',datafield : 'poNo',width : '3%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'Loc',datafield : 'location',width : '3%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'Party Bill No.',datafield : 'partyBillNo',width : '4%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'Party Bill Date',datafield : 'partyBillDate',width : '4%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false, columntype : 'datetimeinput', cellsformat : 'dd/MM/yyyy'},
		{text : 'Seg',datafield : 'segment',width : '4%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'HSN Code',datafield : 'hsnCode',width : '4%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'Purity',datafield : 'purity',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false,cellsformat: 'd2'},
		{text : 'Weight',datafield : 'weight',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd3'},
		{text : 'UOM',datafield : 'uom',width : '4%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'Metal Rate',datafield : 'metalRate',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'Metal Val',datafield : 'metalValue',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'Commission',datafield : 'commission',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false,cellsformat: 'd2'},
		{text : 'Ins Charges',datafield : 'insCharges',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'Courier Charges',datafield : 'courierCharges',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'CGST %',datafield : 'cgstPer',width : '3.5%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false,cellsformat: 'd3'},
		{text : 'CGST Amt',datafield : 'cgstAmt',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'SGST %',datafield : 'sgstPer',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false,cellsformat: 'd3'},
		{text : 'SGST Amt',datafield : 'sgstAmt',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'IGST %',datafield : 'gstPer',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false,cellsformat: 'd3'},
		{text : 'IGST Amt',datafield : 'gstAmt',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'Cess %',datafield : 'cessPer',width : '3.5%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false,cellsformat: 'd3'},
		{text : 'Cess Amt',datafield : 'cessAmt',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'Tot Amt',datafield : 'totAmt',width : '7%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{'text' : '','datafield' : 'printId','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemEditRenderer},

		];
	   		
	showMyGrid(datafields, "/OrderExecution/api/v1/bullionReceiptListing", "list", columns, fieldFilterValue(), updateRows, "");
	
	$("#jqxgrid").jqxGrid({
		width : '100%',
	    sortable: true,            
    	altrows: true,
      	columnsresize: true, 
	 	rowsheight : 35,
		theme: 'energyblue',
	 	columnsheight: 75,
	 	rowdetails : true,
	 	virtualmode : true
	});
}

var intRemEditRenderer = function(row, column, value) {
    
    	return '<a class="btn btn-sm btn-primary" type="button" id='
    	+ row
    	+ ' onclick="printBgrvIndent('
    	+ value
    	+ ')" href="javascript:void(0);"/><i class="fa fa-print fa-lg"></i></a>'
    
}

/* PRINT SECTION STARTED*/
$("#export").on('click', function(){
	
});

var printBgrvIndent = function(printId){
	$('#loading').show();
    var fieldFilters = {
		"fieldFilters" : {}
	};
	
		fieldFilters = {
			"fieldFilters" : {
			    "IndentNo":printId,
				"mode" : "pdf",
				"reportName" : "RPT_BGRV_Indent"
			}
		}
		jasperReport('RPT_BGRV_Indent.pdf', fieldFilters);

}
/* Clear all */
$("#clear").on('click', function(){
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$('#bulionReceiptForm').trigger("reset");
});

/* Search */
$("#searchRecpt").on('click', function(){
	var seg = $("#metalSegment").val();
	if(seg == "" || seg == null){
		$.growl.error({
			message : "Please Select Segment !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		bullionReceiptGrid();
		$("#jqxgrid").show();}
});