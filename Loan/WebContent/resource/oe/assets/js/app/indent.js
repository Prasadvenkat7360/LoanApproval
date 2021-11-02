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

var deliveryType = {};
var statusType = {};
var vendorCodeList = {};
var actionType = {};
var data = {};
$('#print').attr('disabled', true);
$('#addIndent').attr('disabled', true);

function bullionDetails() {
	var indentDetail = {
		"indentMetalDList" : [],
		"bullionDealerId" : $('#bDealerCode').val(),
		"segment" :  $('#metalSegment').val(),
		"purity" : $('#metalPurity').val(),
		"weight" : $('#weight').val(),
		"metalRate" : $('#metalRate').val(),
		"rateConfirmation" : $('#rateConfirm').val(),
		"value" : $('#value').val(),
		"deliveryDate" : $('#deliveryDateIndent').val(),
		"remarks" : $('#remarks').val(),
		"deliveryType" : $('#deliveryType').val(),
		"hsnId" : $('#hsnCode').val(),
	};
	indentDetail.indentMetalDList = $("#jqxgrid").jqxGrid('getrows');
	return indentDetail;
}

var pendingrenderer = function(row, column, value) {
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnIndentDA" type="button" href="indentView?indentId='
			+ value + '"/><i class="fa fa-eye fa-sm"></i></a>'
}

var buttonclick = function (event) {
	var id = event.target.id;
	postJSON('/OrderExecution/api/v1/cancelIndent', JSON.stringify(id), function(data) {
		if(1 == data.resCode){
			$.growl.notice({ message: "Successfully Cancled.", duration: 10000, title: 'Success' });
			return true;
		}else{
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
			return false;
		}
	});
}

var renderer = function (row, column, value) {
	return '<input type="button" onClick="buttonclick(event)" class="btn btn-sm btn-primary" id="' + value + '" value="Delete Row"> <i class="fa fa-cogs fa-1"></i> </input>'
}


function indentFilterValues() {
	fieldFilters = {
		"fieldFilters" : {}
	};
	var orderFromDate = $('#orderFromDate').val();
	var orderToDate = $('#orderToDate').val();
	var indentNo = $('#indentNo').val();
	var metalSegment = $('#metalSegment').val();
	var status = $('#status').val();
	
	if (orderFromDate != "" && orderFromDate != null) {
		fieldFilters.fieldFilters["orderFromDate"] = orderFromDate;
	}
	if (orderToDate != "" && orderToDate != null) {
		fieldFilters.fieldFilters["orderToDate"] = orderToDate;
	}
	if (indentNo != "" && indentNo != null) {
		fieldFilters.fieldFilters["indentNo"] = indentNo;
	}
	if (metalSegment != "" && metalSegment != null) {
		fieldFilters.fieldFilters["metalSegment"] = metalSegment;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	return fieldFilters;
}


function bullionGrid()
{
	var updateRows = function(rowid, newdata, commit) {
	}
	var addrow =  function (rowid, rowdata, position, commit) {
        commit(true);
	}
	var deliveryTypeSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : deliveryType
		};

	var deliveryTypeDataAdapter = new $.jqx.dataAdapter(deliveryTypeSource, {
		autoBind : true
	});
	
	var venderCodeTypeSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : vendorCodeList
		};

	var vendorCodeTypeDataAdapter = new $.jqx.dataAdapter(venderCodeTypeSource, {
		autoBind : true
	});
	
	var datafields = [{
		name : 'metalPurity ',
		type : 'double'
	},{
		'name' : 'weightInGms',
		'type' : 'double'
	},{
		name : 'deliveryType',
		type : 'string'
	},{
		name : 'jwCode',
		type : 'string'
	},{
		name : 'jwCodes',
		value : 'jwCode',
		values : {
			source : vendorCodeTypeDataAdapter.records,
			value : 'id',
			name : 'name'
		}
	},{
		'name' : 'jwNameAndAddress',
		'type' : 'String'
	}, {
		'name' : 'status ',
		'type' : 'String'
	}];

	var columns = [
	   			{'text' : 'Sl. No.',
					datafield : '',
					'width' : '12%',
					sortable : false,
					editable : false,
					columntype: 'number',cellsalign : 'center',align:'center',
					cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
				},{
					'text' : 'Metal Purity',
					datafield : 'metalPurity',
					'width' : '12%',
					sortable : false,
					editable : false,
					cellsalign : 'right',
					align:'center',
					cellsformat: 'd2'
				},{
					'text' : 'Wt In Gms ',
					datafield : 'weightInGms',
					'width' : '12%',
					sortable : false,
					editable : true,cellsalign : 'right',align:'center',
					cellsformat: 'd3',
					columntype: 'numberinput',	      
					initeditor: function (row, cellvalue, editor) {
		                editor.jqxNumberInput({ decimalDigits: 3, min: 0.000 });
		            },
		            validation: function (cell, value) {
		                if (value < 0) {
		                    return { result: false, message: "Invalid Weight" };
		                }
		                return true;
		            }
				},{
					text : 'Delivery Type',
					datafield : 'deliveryType',
					editable : false,
					sortable : false,cellsalign : 'center',align:'center',
					'width' : '12%',
				},{
					text : 'JW Code',
					datafield : 'jwCode',
					columntype : 'combobox',
					displayfield : 'jwCodes',
					editable : true,cellsalign : 'center',align:'center',
					sortable : false,
					'width' : '12%',
					initeditor : function(row, value, editor) {
						editor.jqxComboBox({
							source : vendorCodeTypeDataAdapter,
							displayMember : 'name',
							valueMember : 'id'
						});
					},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						
						if(null == newvalue || "" == newvalue){
							
							 $.growl.error({ message: "JW Code is mandatory.", duration: 10000, title: 'Error' });
							 return "";
							 
						 }else{
							 $.getJSON('/OrderExecution/api/v1/vendorAddress?vendorCode='+newvalue.value, function(data) {
								 
								 if(1 == data.resCode){
									 $("#jqxgrid").jqxGrid('setcellvalue', row, "jwNameAndAddress", data.payload.address);
								 }else{
									 $.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
								 }
							 });
						 }
					}
				},{
					'text' : 'JW Name & Address',
					datafield : 'jwNameAndAddress',
					'width' : '16%',
					sortable : false,
					editable : false,cellsalign : 'center',align:'center'
				},{
					'text' : 'Status ',
					datafield : 'status',
					'width' : '12%',
					sortable : false,
					editable : false,cellsalign : 'center',align:'center'
				},{
					text : 'Action',
					datafield : 'Delete',
					'width' : '12%',
					cellsalign : 'center',
					align:'center',
					columntype : 'button',
					cellsrenderer : function() {
						return "Delete";
					},
					buttonclick : function(row) {
						id = $("#jqxgrid").jqxGrid('getrowid', row);
						$("#jqxgrid").jqxGrid('deleterow', id);		
					}	
				}];
	addGrid(datafields, columns, updateRows, data, addrow, "#jqxgrid");
}


function pendingIndentGrid()
{
	var updateRows = function(rowid, newdata, commit) {
	}
	var actionTypeSource = {
			datatype : 'json',
			datafields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			} ],
			localdata : actionType
		};

	var actionTypeDataAdapter = new $.jqx.dataAdapter(actionTypeSource, {
		autoBind : true
	});
	
	var datafields = [ {
		name : 'id',
		type : 'long'
	}, {
		name : 'indentDate',
		type : 'string'
	}, {
		name : 'confirmRate',
		type : 'string'
	}, {
		name : 'weight',
		type : 'double'
	}, {
		name : 'value',
		type : 'double'
	}, {
		name : 'metalRate',
		type : 'double'
	}, {
		name : 'purity',
		type : 'double'
	}, {
		name : 'location',
		type : 'string'
	}, {
		name : 'bullionDealerCode',
		type : 'string'
	}, {
		name : 'bullionDealerName',
		type : 'string'
	}, {
		name : 'segmentName',
		type : 'string'
	}, {
		name : 'status',
		type : 'string'
	},  {
		name : 'mrvRef',
		type : 'long'
	}, 
	{
		name : 'reason',
		type : 'string'
	}, {
		name : 'deliveryDate',
		type : 'string'
	},{
		name : 'hsnCode',
		type : 'string',
		'map' : 'hsnCode'
	},{
		name : 'actionId',
		type : 'long',
		map : 'id'
	},];

	var columns = [
	   			{
					text : 'PO No.',
					datafield : 'id',
					width : '5%',
					cellsalign : 'center',
					align : 'center',
					sortable : true,
					editable : false
				},
				{
					text : 'PO Date',
					datafield : 'indentDate',
					width : '6%',
					cellsalign : 'center',
					align : 'center',
					sortable : true,
					editable : false,
					cellsformat : 'dd/MM/yyyy'
				},
				{
					'text' : 'Bullion Dealer Code ',
					datafield : 'bullionDealerCode',
					'width' : '9%',
					sortable : true,
					cellsalign : 'center',
					align : 'center',
					editable : false,
				},
				{
					text : 'Bullion Dealer Name ',
					datafield : 'bullionDealerName',
					editable : false,
					cellsalign : 'center',
					align : 'center',
					sortable : false,
					'width' : '12%',
				
				},
				{
					'text' : 'Segment',
					datafield : 'segmentName',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					sortable : true,
					editable : false
				},
				{
					'text' : 'Metal Purity ',
					datafield : 'purity',
					'width' : '5%',
					cellsalign : 'right',
					align : 'center',
					sortable : false,
					editable : false,
					cellsformat: 'd2'
				},
				
				{
					'text' : 'Weight ',
					datafield : 'weight',
					'width' : '5.5%',
					cellsalign : 'right',
					align : 'center',
					sortable : true,
					editable : false,
					cellsformat: 'd3'
				},
				{
					'text' : 'Metal Rate',
					datafield : 'metalRate',
					'width' : '5%',
					cellsalign : 'right',
					align : 'center',
					sortable : true,
					editable : false,
					cellsformat: 'd2'
				},
				{
					'text' : 'Rate Confirmation',
					datafield : 'confirmRate',
					'width' : '9%',
					cellsalign : 'center',
					align : 'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Value',
					datafield : 'value',
					'width' : '5.5%',
					cellsalign : 'right',
					align : 'center',
					sortable : true,
					editable : false,
					cellsformat: 'd2'
				},
				{
					'text' : 'Delivery Date',
					datafield : 'deliveryDate',
					'width' : '6%',
					cellsalign : 'center',
					align : 'center',
					sortable : true,
					editable : false,
					cellsformat : 'dd/MM/yyyy'
				},
				{
					'text' : 'Status',
					datafield :'status',
					'width' : '6%',
					cellsalign : 'center',
					align : 'center',
					sortable : true,
					editable : false
				},
				{
					'text' : 'BGRV No',
					datafield :'mrvRef',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'Reason',
					datafield : 'reason',
					'width' : '7%',
					cellsalign : 'left',
					align : 'center',
					sortable : false,
					editable : false
				},
				{
					'text' : 'HSN Code',
					datafield : 'hsnCode',
					'width' : '6%',
					cellsalign : 'center',
					align : 'center',
					sortable : false,
					editable : false
				},
				{
					text : '',
					datafield : 'actionId',
					cellsrenderer : pendingrenderer,
					editable : false,
					cellsalign : 'center',
					align : 'center',
					sortable : false,
					'width' : '3%'
				}];
	   		
	showMyGrid(datafields, "/OrderExecution/api/v1/indentList?page=pending", "list", columns, indentFilterValues(), updateRows, "id");
	     $("#jqxgrid").jqxGrid({
	    	 width : '100%',
	         sortable: true,            
	      	altrows: true,
	     	columnsresize: true, 
	 		rowsheight : 35,
			theme: 'energyblue',
	 		rowdetails : true,
	 		virtualmode : true
	});
}

var BullionReturnListingFieldFilters = function() {
	var metalSegS = $("#metalSegS").val();
	var mivNo = $("#mivNo").val();
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var mrvNo = $("#mrvNo").val();
	var indPoNo = $("#indPoNo").val();
	var pbDateS = $("#pbDateS").val();
	var pbNo = $("#pbNo").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (metalSegS != "" && metalSegS != null) {
		fieldFilters.fieldFilters["segmentId"] = metalSegS;
	}
	if (mivNo != "" && mivNo != null) {
		fieldFilters.fieldFilters["mivNo"] = mivNo;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (mrvNo != "" && mrvNo != null) {
		fieldFilters.fieldFilters["mrvNo"] = mrvNo;
	}
	if (indPoNo != "" && indPoNo != null) {
		fieldFilters.fieldFilters["indentPONo"] = indPoNo;
	}
	if (pbDateS != "" && pbDateS != null) {
		fieldFilters.fieldFilters["partyBillDate"] = pbDateS;
	}
	if (pbNo != "" && pbNo != null) {
		fieldFilters.fieldFilters["partyBillNo"] = pbNo;
	}
	return fieldFilters;
}

var bullionMRVReturnSearchGrid = function(){
var updateRows = function(rowid, newdata, commit) {}
	
	var datafields = [ 
		{name : 'dealer', type : 'string','map':'bullionDealer'},
		{name : 'returnDt', type : 'string','map':'returnDate'},
		{name : 'returnNo', type : 'long','map':'returnNo'},
		{name : 'refType', type : 'long','map':'refType'},
		{name : 'refNo', type : 'long','map':'refNo'},
		{name : 'location', type : 'string','map':'location'},
		{name : 'partyBillNo', type : 'long','map':'partyBillNo'},
		{name : 'partyBillDate', type : 'string','map':'partyBillDate'},
		{name : 'segment', type : 'string','map':'segment'},
		{name : 'pcs', type : 'string','map':''},
		{name : 'weight', type : 'float','map':'weight'},
		{name : 'uom', type : 'string','map':'uom'},
		{name : 'metalRate', type : 'float','map':'metalRate'},
		{name : 'metalValue', type : 'float','map':'metalValue'},
		{name : 'commission', type : 'string','map':'commission'},
		{name : 'insurence', type : 'float','map':'insurance'},
		{name : 'courier', type : 'float','map':'courier'},
		{name : 'cgstPer', type : 'string','map':'cgstperc'},
		{name : 'cgstAmt', type : 'float','map':'cgstAmnt'},
		{name : 'sgstPer', type : 'string','map':'sgstperc'},
		{name : 'sgstAmt', type : 'float','map':'sgstAmnt'},
		{name : 'gstPer', type : 'string','map':'igstPerc'},
		{name : 'gstAmt', type : 'float','map':'igstAmnt'},
		{name : 'cessPer', type : 'string','map':'cessPerc'},
		{name : 'cessAmt', type : 'float','map':'cessAmnt'},
		{name : 'totAmt', type : 'float','map':'totalAmount'},
		{name : 'hsnCode', type : 'string','map':'hsnCode'},
		{name: 'printId',type:'int','map':'mivNo'}

	];

	var columns = [
		{text : 'Dealer',datafield : 'dealer',width : '4%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'Return Dt.',datafield : 'returnDt',width : '4%', cellsalign : 'center',align : 'center', sortable : true,editable : false,cellsformat : 'dd/MM/yyyy'},
		{text : 'Return No',datafield : 'returnNo',width : '3.5%', cellsalign : 'center',align : 'center', sortable : true,editable : false},
		{text : 'Ref Type',datafield : 'refType',width : '3%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'Ref No',datafield : 'refNo',width : '3%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'Party Bill No.',datafield : 'partyBillNo',width : '4%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'Party Bill Dt.',datafield : 'partyBillDate',width : '4%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false, columntype : 'datetimeinput', cellsformat : 'dd/MM/yyyy'},
		{text : 'Loc',datafield : 'location',width : '3%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'Seg',datafield : 'segment',width : '3.5%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'HSN Code',datafield : 'hsnCode',width : '4%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'Pcs',datafield : 'pcs',width : '3%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'UQC',datafield : 'uom',width : '3%',	cellsalign : 'center',align : 'center',	sortable : true,editable : false},
		{text : 'Weight',datafield : 'weight',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd3'},
		{text : 'Metal Rate',datafield : 'metalRate',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'Metal Value',datafield : 'metalValue',width : '4%',cellsalign : 'right',align : 'center',	sortable : true,editable : false,cellsformat: 'd2'},
		{text : 'Commission',datafield : 'commission',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'Insurance',datafield : 'insurence',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'Courier',datafield : 'courier',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'CGST %',datafield : 'cgstPer',width : '3.5%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false ,cellsformat: 'd2'},
		{text : 'CGST Amt',datafield : 'cgstAmt',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'SGST %',datafield : 'sgstPer',width : '3.5%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'SGST Amt',datafield : 'sgstAmt',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'IGST %',datafield : 'gstPer',width : '3.5%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'IGST Amt',datafield : 'gstAmt',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'Cess %',datafield : 'cessPer',width : '3.5%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'Cess Amt',datafield : 'cessAmt',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{text : 'Tot Amt',datafield : 'totAmt',width : '4%',	cellsalign : 'right',align : 'center',	sortable : true,editable : false, cellsformat: 'd2'},
		{'text' : '','datafield' : 'printId','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemEditRenderer},
	];
	   		
	showMyGrid(datafields, "/OrderExecution/api/v1/bullionReturnListing", "list", columns,BullionReturnListingFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
	    sortable: true,            
		theme: 'energyblue',
    	altrows: true,
      	columnsresize: true, 
	 	rowsheight : 35,
	    columnsheight: 85,
	 	rowdetails : true,
	 	virtualmode : true
	});
}

var intRemEditRenderer = function(row, column, value) {
    
	return '<a class="btn btn-sm btn-primary" type="button" id='
	+ row
	+ ' onclick="printBgrvRet('
	+ value
	+ ')" href="javascript:void(0);"/><i class="fa fa-print fa-lg"></i></a>'

}

/* PRINT SECTION STARTED*/
$("#export").on('click', function(){

});

var printBgrvRet = function(printId){
$('#loading').show();
var fieldFilters = {
	"fieldFilters" : {}
};

	fieldFilters = {
		"fieldFilters" : {
		    "bMivNo":printId,
			"mode" : "pdf",
			"reportName" : "RPT_BGIV_DeliveryChallan"
		}
	}
	jasperReport('RPT_BGIV_DeliveryChallan.pdf', fieldFilters);
}

$("#metalSegment").on('change',function(){
	var id = $("#metalSegment").val();
	 if(id != ""){
	$.getJSON('/OrderExecution/api/v1/indentLOV?page=hsnCodes&segId='+id ,function(data) {
		$('#hsnCode').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.hsnCodeList, function(key, val) {
				$('#hsnCode').append('<option value="' + val.id + '">' + val.code + ' ' + '-' +  ' '+ val.description + '</option>');
		 });
	});	
 }
});

$("#fromDateS").datepicker({
	 changeMonth: true,
     changeYear: true,
     dateFormat:"dd/mm/yy",
     maxDate:0
});

$("#toDateS").datepicker({
	 changeMonth: true,
    changeYear: true,
    dateFormat:"dd/mm/yy",
    maxDate:0
});

$("#pbDateS").datepicker({
	 changeMonth: true,
    changeYear: true,
    dateFormat:"dd/mm/yy",
    maxDate:0
});


var onloadLov = function(){/*
	$.getJSON('/OrderExecution/api/v1/brListOnLoadLov', function(data) {
		$('#metalSegS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.mSegments, function(key, val) {
				$('#metalSegS').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
	});
*/}
onloadLov();

$("#searchRet").on('click',function(){
	bullionMRVReturnSearchGrid();
	$("#jqxgrid").show();
});

$("#goBack").on('click',function(){
	window.location.href="javascript:showContentPage('pendingIndents', 'bodySwitcher')"	
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('bullionMRVRetListing', 'bodySwitcher')"	
});


//####################################################################
$("#bullionSelection").on('change', function(){
	var bullionSelection = $("#bullionSelection").val();
	if(bullionSelection == 'bullionPO'){
		window.location.href = "javascript:showContentPage('pendingIndents', 'bodySwitcher')";
	}else if(bullionSelection == 'bullionReceipt'){
		window.location.href = "javascript:showContentPage('bullionMRVReceipt', 'bodySwitcher')";
	}else if(bullionSelection == 'bullionReturn'){
		window.location.href = "javascript:showContentPage('bullionMRVRetListing', 'bodySwitcher')";
	}
});
	
var $metalSegment = $('#metalSegment');
var $status = $('#status');
var rowId = 0;

/*
$.getJSON('/OrderExecution/api/v1/indentLOV?page=pending', function(data) {
	if(data.resCode == 1){
		$metalSegment.empty().append('<option value="" selected>--Select--</option>');
		$status.empty().append('<option value="" selected>--Select--</option>');
		
		$.each(data.payload.mTypes, function(key, val) {
			$metalSegment.append('<option value="' + val.id + '">' + val.description+ '</option>');
		});
				
		$.each(data.payload.status, function(key, val) {
			$status.append('<option value="' + val.id + '">' + val.name	+ '</option>');
		});
		actionType = data.payload.action;			
	}
});*/

//Date From
$("#orderFromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#orderToDate").datepicker('option', 'minDate', min || '0');
    }
});

$("#orderToDate").datepicker({
	 changeMonth: true,
   changeYear: true,
   dateFormat:"dd/mm/yy",
   maxDate:0
});
	
$("#search").on("click", function() {
	var metalSegment = $("#metalSegment").val();
	if(metalSegment == "" || metalSegment == null){
		$.growl.error({
			message : "Please select segment.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	pendingIndentGrid();
	$("#jqxgrid").show();
	return false;
});
	

$("#export").on("click", function() {
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
	postJSON('/OrderExecution/api/v1/indentList?page=pending',JSON.stringify(indentFilterValues()), function(response) {
		if(null != response){
			data = response.payload.list;
			for(i=0; i<data.length; i++){
				var obj = data[i];
				var receipt = {
						'PO No.' :(null!=obj.id)?obj.id :" ",
						'PO Date' : (null!=obj.indentDate)?obj.indentDate :" ",
						'Bullion Dealer Code' : (null!=obj.bullionDealerCode)?obj.bullionDealerCode :" ",
						'Bullion Dealer Name' : (null!=obj.bullionDealerName)?obj.bullionDealerName :" ",						
						'Segment' : (null!=obj.segmentName)?obj.segmentName :" ",						
						'Metal Purity' :(null!=obj.purity)?(obj.purity).toFixed(2) :" ",
						'Weight' : (null!=obj.weight)?(obj.weight).toFixed(3) :" ",
						'Metal Rate' : (null!=obj.metalRate)?(obj.metalRate).toFixed(2) :" ",
						'Rate Confirmation' : (null!=obj.confirmRate)?obj.confirmRate :" ",						
						'Value' : (null!=obj.value)?(obj.value).toFixed(2) :" ",						
						'Delivery Date' : (null!=obj.deliveryDate)?obj.deliveryDate :" "		,						
						'Status' : (null!=obj.status)?obj.status :" "		,						
						'BMRV No' : (null!=obj.mrvRef)?obj.mrvRef :" ",						
						'Reason' : (null!=obj.reason)?obj.reason :" "	,						
						'HSN Code' : (null!=obj.hsnCode)?obj.hsnCode :" "										
					}
					newData.push(receipt);							
			   }	
			   var opts = [{sheetid:'Bullion_Indent'+sysdate,header:true}];
               var res = alasql('SELECT * INTO XLSX("Bullion_Indent_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
			}
		});
	}
});


$("#clearIndent").on('click',function(){
	window.location.href="javascript:showContentPage('pendingIndents', 'bodySwitcher')"	
});

$('#btnIndentDA').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});
	