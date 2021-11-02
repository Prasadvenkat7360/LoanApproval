/** FAS Listing
 * Created Date : 16th June 2018
 * FAS On load and Search and View as a XML
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

//date picker functions
 $("#fromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDate").datepicker('option', 'minDate', min || '0');
    }
});

$("#toDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});
 // On Load LOvs for FAS Listing and Search
 var onLoadLov = function(){
	 $('#refDocTypeS').empty().append('<option value="" selected>--Select--</option>');
	 $('#status').empty().append('<option value="" selected>--Select--</option>');
	 
	 $.getJSON('/OrderExecution/api/v1/fasFailedTxnOnloadLov', function(data) {
		 if(data.resCode == "1" && typeof data != "undefined"){
			 $.each(data.payload.docTypes, function(key, val) {
					$('#refDocTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
			 });
			 $.each(data.payload.docTypes, function(key, val) {
					$('#refDocType').append('<option value="' + val.id + '">' + val.name + '</option>');
			 });
			 $.each(data.payload.sf, function(key, val) {
					$('#status').append('<option value="' + val.id + '">' + val.name + '</option>');
			 });
			 
		 }
	 });
 }
 
 onLoadLov();
 
 var viewXMLFile = function(transId){
	 $.getJSON('/OrderExecution/api/v1/viewFASFailedTxnById?txnId='+transId, function(data) {
		 var HeaderXml = data.payload.HeaderXml;
		 var DetailXml = data.payload.DetailXml;
		 var SettlementXml = data.payload.SettlementXml;
	
		$("#viewXML1").val(HeaderXml);
		$("#viewXML2").val(DetailXml);
		$("#viewXML3").val(SettlementXml);
	 });
 }
 
 var viewXML = function(row, column, value) {
	 return '<button  id='+ row + ' onclick="viewXMLFile('+ value +')" style="margin-left:2px; margin-top:3px;" data-toggle="modal" data-target="#fasViewXML" class="btn btn-sm btn-primary" type="button" /><i class="fa fa-file-code-o fa-sm"></i></button>';	
}
 
 var fasDataFields = [
	 {'name' : 'voucherId','type' : 'int'},
	 {'name' : 'amount','type' : 'double'},
	 
	 {'name' : 'mrvNum','type' : 'int','map':'mrvvNo'},
	 {'name' : 'mrvAmt','type' : 'double','map':'fasNetPayableAmt'},
	 
	 {'name' : 'pbId','type' : 'int','map':'id'},
	 {'name' : 'pbAmt','type' : 'double','map':'fasTotalAmt'},
	 
	 {'name' : 'prId','type' : 'int','map':'id'},
	 {'name' : 'prAmt','type' : 'double','map':'lineItemAmount'},
	 
	 {'name' : 'pvId','type' : 'int','map':'id'},
	 {'name' : 'pvAmt','type' : 'double','map':'amount'},
	 
	 {'name' : 'bmrvNum','type' : 'int','map':'id'},
	 {'name' : 'bmrvAmt','type' : 'double','map':'amount'},
	 
	 {'name' : 'smivNo','type' : 'int','map':'id'},
	 {'name' : 'smivAmt','type' : 'double','map':'fasTotalAmt'},
	 
	 {'name' : 'bmivId','type' : 'int','map':'returnNo'},
	 {'name' : 'bmivAmt','type' : 'double','map':'totalAmount'},
	 
	 {'name' : 'vrNo','type' : 'int','map':'id'},
	 {'name' : 'vrAmt','type' : 'double','map':'fasTotalAmount'},
	 
	 {'name' : 'sbNo','type' : 'int','map':'id'},
	 {'name' : 'sbAmt','type' : 'double','map':'billAmount'},
	 
	 {'name' : 'sbNo','type' : 'int','map':'id'},
	 {'name' : 'sbAmt','type' : 'double','map':'billAmount'},
	 
	 {'name' : 'srNo','type' : 'int','map':'id'},
	 {'name' : 'srAmt','type' : 'double','map':'salesRetTotalAmount'},
	 
	 {'name' : 'smrvNo','type' : 'int','map':'id'},
	 {'name' : 'smrvAmt','type' : 'double','map':'totalValue'},
	 
	 {
		'name' : 'selectionStatus',
		'type' : 'bool'
	 }
	];
 
 var selectId = {
			text : '',
			columntype : 'checkbox',
			width : '5%',
			menu: false,
			sortable: false,
			datafield: 'selectionStatus',
			cellsalign : 'center',
			align:'center',
			filterable: false,
			renderer: function () {
				return '<div><div style="margin-left: 30px; margin-top: 35px;"></div><div></div></div>';
			},
			rendered: function (element) {
	              var checkbox = $(element).last();
	              $(element).css('margin-left', '24px');
	              $(element).css('margin-top', '-20px');
	              $(checkbox).jqxCheckBox({
	                  width: 16,
	                  height: 16,
	                  animationShowDelay: 0,
	                  animationHideDelay: 0
	              });
	              columnCheckBox = $(checkbox);
	              $(checkbox).on('change', function (event) {
	                  var checked = event.args.checked;
	                  var pageinfo = $("#jqxgrid").jqxGrid('getpaginginformation');
	                  var pagenum = pageinfo.pagenum;
	                  var pagesize = pageinfo.pagesize;
	                 /* if (checked == null || updatingCheckState) return;
	                  $("#jqxgrid").jqxGrid('beginupdate');*/

	                  if (checked) {
	                      $("#jqxgrid").jqxGrid('selectallrows');
	                  }
	                  else if (checked == false) {
	                      $("#jqxgrid").jqxGrid('clearselection');
	                  }

	                  var startrow = pagenum * pagesize;
	                  for (var i = startrow; i < startrow + pagesize; i++) {
	                      var boundindex = $("#jqxgrid").jqxGrid('getrowboundindex', i);
	                     // $("#jqxgrid").jqxGrid('setcellvalue', boundindex, 'selectionStatus', event.args.checked);
	                      checkUncheckBox(boundindex, 1, checked);
	                  }

	                  $("#jqxgrid").jqxGrid('endupdate');
	                  for (var i = 0; i < disabled.length; i++) {
	                      var row = disabled[i];
	                      $("#jqxgrid").jqxGrid('setcellvalue', row, "selectionStatus", false);
	                      $('#jqxgrid').jqxGrid('unselectrow', row);
	                  }
	              });
	              return true;
	          },
			cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue) {						
				checkUncheckBox(row, 0, newvalue);						
			}

		}
var receiptId = {'text' : 'Receipt Id','datafield' : 'voucherId','width' : '45%',editable : false,cellsalign : 'center',align: 'center'};
var receiptAmt = {'text' : 'Receipt Amount','datafield' : 'amount','width' : '50%',editable : false,cellsalign : 'center',align: 'center',cellsformat:'d2'};
var mrvNo = {'text' : 'MRV No','datafield' : 'mrvNum','width' : '45%',editable : false,cellsalign : 'center',align: 'center'};
var mrvAmt = {'text' : 'MRV Amount','datafield' : 'mrvAmt','width' : '50%',editable : false,cellsalign : 'center',align: 'center',cellsformat:'d2'};
var pbId = {'text' : 'Purchase Bill Id','datafield' : 'pbId','width' : '45%',editable : false,cellsalign : 'center',align: 'center'};
var pbAmt = {'text' : 'Purchase Bill Amount','datafield' : 'pbAmt','width' : '50%',editable : false,cellsalign : 'center',align: 'center',cellsformat:'d2'};
var prId = {'text' : 'Purchase Return Id','datafield' : 'prId','width' : '45%',editable : false,cellsalign : 'center',align: 'center'};
var prAmt = {'text' : 'Purchase Return Amount','datafield' : 'prAmt','width' : '50%',editable : false,cellsalign : 'center',align: 'center',cellsformat:'d2'};
var pvId = {'text' : 'Payment Voucher Id','datafield' : 'pvId','width' : '45%',editable : false,cellsalign : 'center',align: 'center'};
var pvAmt = {'text' : 'Payment Voucher Amount','datafield' : 'pvAmt','width' : '50%',editable : false,cellsalign : 'center',align: 'center',cellsformat:'d2'};
var bmrvNo = {'text' : 'BMRV No','datafield' : 'bmrvNum','width' : '45%',editable : false,cellsalign : 'center',align: 'center'};
var bmrvAmt = {'text' : 'BMRV Amount','datafield' : 'bmrvAmt','width' : '50%',editable : false,cellsalign : 'center',align: 'center',cellsformat:'d2'};
var smivNo = {'text' : 'SMIV No','datafield' : 'smivNo','width' : '45%',editable : false,cellsalign : 'center',align: 'center'};
var smivAmt = {'text' : 'SMIV Amount','datafield' : 'smivAmt','width' : '50%',editable : false,cellsalign : 'center',align: 'center',cellsformat:'d2'};
var bmivNo = {'text' : 'BMIV No','datafield' : 'bmivId','width' : '45%',editable : false,cellsalign : 'center',align: 'center'};
var bmivAmt = {'text' : 'BMIV Amount','datafield' : 'bmivAmt','width' : '50%',editable : false,cellsalign : 'center',align: 'center',cellsformat:'d2'};
var smrvNo = {'text' : 'SMRV No','datafield' : 'smrvNo','width' : '45%',editable : false,cellsalign : 'center',align: 'center'};
var smrvAmt = {'text' : 'SMRV Amount','datafield' : 'smrvAmt','width' : '50%',editable : false,cellsalign : 'center',align: 'center',cellsformat:'d2'};
var vrNo = {'text' : 'VR No','datafield' : 'vrNo','width' : '45%',editable : false,cellsalign : 'center',align: 'center'};
var vrAmt = {'text' : 'VR Amount','datafield' : 'vrAmt','width' : '50%',editable : false,cellsalign : 'center',align: 'center',cellsformat:'d2'};
var sbNo = {'text' : 'SB No','datafield' : 'sbNo','width' : '45%',editable : false,cellsalign : 'center',align: 'center'};
var sbAmt = {'text' : 'SB Amount','datafield' : 'sbAmt','width' : '50%',editable : false,cellsalign : 'center',align: 'center',cellsformat:'d2'};
var srNo = {'text' : 'SR No','datafield' : 'srNo','width' : '45%',editable : false,cellsalign : 'center',align: 'center'};
var srAmt = {'text' : 'SR Amount','datafield' : 'srAmt','width' : '50%',editable : false,cellsalign : 'center',align: 'center',cellsformat:'d2'};


$("#refDocType").on('change',function(){
	console.log($("#refDocType").val());	
	 var gridName = "#jqxgrid";
	 var coloumnsRV = [];
	 var coloumnsMRV = [];
	 var coloumnsPB = [];
	 var coloumnsPR = [];
	 var coloumnsPV = [];
	 var coloumnsBMRV = [];
	 var coloumnsSMIV = [];
	 var coloumnsBMIV = [];
	 var coloumnsSMRV = [];
	 var coloumnsVR = [];
	 var coloumnsSB = [];
	 var coloumnsSR = [];
	 var headerTitle; 
	 
		coloumnsRV.push(selectId,receiptId,receiptAmt);
		coloumnsMRV.push(selectId,mrvNo,mrvAmt);
		coloumnsPB.push(selectId,pbId,pbAmt);
		coloumnsPR.push(selectId,prId,prAmt);
		coloumnsPV.push(selectId,pvId,pvAmt);
		coloumnsBMRV.push(selectId,bmrvNo,bmrvAmt);
		coloumnsSMIV.push(selectId,smivNo,smivAmt);
		coloumnsBMIV.push(selectId,bmivNo,bmivAmt);
		coloumnsSMRV.push(selectId,smrvNo,smrvAmt);
		coloumnsVR.push(selectId,vrNo,vrAmt);
		coloumnsSB.push(selectId,sbNo,sbAmt);
		coloumnsSR.push(selectId,srNo,srAmt);
		
		if($("#refDocType").val() != ""){
			postJSON('/OrderExecution/api/v1/pushFasDetails',JSON.stringify(rvFieldFilters()),function(data) {
				if(data.resCode == "1"){
					if($("#refDocType").val() == "RV"){
						headerTitle = "Receipt Voucher Details :";
						fasDetSearchGrid(fasDataFields,coloumnsRV,data.payload.vlist,gridName,headerTitle);
						$("#jqxgrid").show();
					}
					if($("#refDocType").val() == "MRV"){
						headerTitle = "MRV Details :";
						fasDetSearchGrid(fasDataFields,coloumnsMRV,data.payload.mrvDetails,gridName,headerTitle);
						$("#jqxgrid").show();
					}
					if($("#refDocType").val() == "BMRV"){
						headerTitle = "BMRV Details :";
						fasDetSearchGrid(fasDataFields,coloumnsBMRV,data.payload.bmrvDetails,gridName,headerTitle);
						$("#jqxgrid").show();
					}
					if($("#refDocType").val() == "SMIV"){
						headerTitle = "SMIV Details :";
						fasDetSearchGrid(fasDataFields,coloumnsSMIV,data.payload.srtnDetails,gridName,headerTitle);
						$("#jqxgrid").show();
					}
					if($("#refDocType").val() == "PB"){
						headerTitle = "Purchase Bill Details :";
						fasDetSearchGrid(fasDataFields,coloumnsPB,data.payload.pbDetails,gridName,headerTitle);
						$("#jqxgrid").show();
					}
					if($("#refDocType").val() == "PR"){
						headerTitle = "Purchase Return Details :";
						fasDetSearchGrid(fasDataFields,coloumnsPR,data.payload.prDetails,gridName,headerTitle);
						$("#jqxgrid").show();
					}
					if($("#refDocType").val() == "PV"){
						headerTitle = "Payment Voucher Details :";
						fasDetSearchGrid(fasDataFields,coloumnsPV,data.payload.pvDetails,gridName,headerTitle);
						$("#jqxgrid").show();
					}
					if($("#refDocType").val() == "BMIV"){
						headerTitle = "BMIV Details :";
						fasDetSearchGrid(fasDataFields,coloumnsBMIV,data.payload.bullionReturnDetails,gridName,headerTitle);
						$("#jqxgrid").show();
					}
					if($("#refDocType").val() == "SMRV"){
						headerTitle = "SMRV Details :";
						fasDetSearchGrid(fasDataFields,coloumnsSMRV,data.payload.SrecptDetails,gridName,headerTitle);
						$("#jqxgrid").show();
					}
					if($("#refDocType").val() == "VR"){
						headerTitle = "Vendor Return Details :";
						fasDetSearchGrid(fasDataFields,coloumnsVR,data.payload.vrDetails,gridName,headerTitle);
						$("#jqxgrid").show();
					}
					if($("#refDocType").val() == "SB"){
						alert("Hai");
						headerTitle = "Sale Bill Details :";
						fasDetSearchGrid(fasDataFields,coloumnsSB,data.payload.saleBillDetails,gridName,headerTitle);
						$("#jqxgrid").show();
					}
					if($("#refDocType").val() == "SR"){
						headerTitle = "Sales Return Details :";
						fasDetSearchGrid(fasDataFields,coloumnsSR,data.payload.srDetails,gridName,headerTitle);
						$("#jqxgrid").show();
					}
				}else{
					$("#jqxgrid").hide();
					$.growl.error({
						message : data.mesgStr,
						duration :10000,
						title : 'Error'
					});
					return false;
				}
			});
		}else{
			$("#jqxgrid").hide();
		}
			
});

 var fasDetSearchGrid = function(dataFields,columns, data, gridName,headerTitle){
		var updateRows = function(rowid, newdata, commit) {
			updates[rowid] = {
				"rowId" : rowid,
				"selectionStatus" : undefined != newdata.selectionStatus ? newdata.selectionStatus
						: false
			};
			 commit(true);
		}
		
		var source = { datafields : dataFields,	localdata : data };
		
		var dataAdapter = new $.jqx.dataAdapter(source);
		var columnCheckBox = null;
		var updatingCheckState = false;
		$(gridName).jqxGrid({
			source : dataAdapter,
			width: '100%',
			editable : true,
			columnsheight : 40,
			autoheight : true,
			pageable : 'true',
			theme: 'energyblue',
			pagesize : 20,
			altRows : true,
			sortable: false,
			columnsresize : true,
			selectionmode : 'none',
	 		selectionmode : 'singlecell',
	 		showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 5px;'></div>");
				toolbar.append(container);
				container.append('<h5 class="text-left"><i class="fa fa-list"></i>&nbsp;'+ headerTitle +'</h5>');	
			},
			columns : columns
		});	
	}
		
 var checkUncheckBox = function(row, flag, checked){
		if(checked == false){
			$("#jqxgrid").jqxGrid('setcellvalue', row, 'selectionStatus', false);
		}else{
			$("#jqxgrid").jqxGrid('setcellvalue', row, 'selectionStatus', true);
		}
	}

	 
 $("#jqxgrid").on('pagechanged', function (event) {
	 $("#jqxgrid").find('.jqx-checkbox-check-checked').removeClass('jqx-checkbox-check-checked-energyblue').removeClass('jqx-checkbox-check-checked');
	 $("#jqxgrid").jqxGrid('clearselection');
	 var rows = $("#jqxgrid").jqxGrid('getrows');
	 $.each(rows,function(k,v){
		v.selectionStatus = false;
	 });
});
 
 var updatePageState = function (pagenum) {
	    var datainfo = $("#jqxgrid").jqxGrid('getdatainformation');
	    var pagenum = datainfo.paginginformation.pagenum;
	    var pagesize = datainfo.paginginformation.pagesize;
	    var startrow = pagenum * pagesize;
	    // select the rows on the page.
	    $("#jqxgrid").jqxGrid('beginupdate');
	    var checkedItemsCount = 0;
	    for (var i = startrow; i < startrow + pagesize; i++) {
	        var boundindex = $("#jqxgrid").jqxGrid('getrowboundindex', i);
	        var value = $("#jqxgrid").jqxGrid('getcellvalue', boundindex, 'selectionStatus');
	        if (value) checkedItemsCount++;
	        if (value) {
	            $("#jqxgrid").jqxGrid('selectrow', boundindex);
	        } else {
	            $("#jqxgrid").jqxGrid('unselectrow', boundindex);
	        }
	    }

	    $("#jqxgrid").jqxGrid('endupdate');
	    if (checkedItemsCount == pagesize) {
	        columnCheckBox.jqxCheckBox({
	            checked: true
	        });
	    } else if (checkedItemsCount == 0) {
	        columnCheckBox.jqxCheckBox({
	            checked: false
	        });
	    } else {
	        columnCheckBox.jqxCheckBox({
	            checked: null
	        });
	    }
	}
 var rvFieldFilters = function(){
	 var refDocType = $("#refDocType").val();
	 var fieldFilter = {"fieldFilters" : {}};
	 
	 if(refDocType != null && refDocType != "")
	 { 
		 fieldFilter.fieldFilters['docType'] = refDocType; 
	    fieldFilter.fieldFilters['Type'] = 'search';
	 }
	 
	 return fieldFilter;
 }
 
 var fasFieldFilters = function(){
	 var fromDate = $("#fromDate").val();
	 var toDate = $("#toDate").val();
	 var refDocNo = $("#refDocNo").val();
	 var refDocType = $("#refDocTypeS").val();
	 var status = $("#status").val();
		
	 var fieldFilter = {"fieldFilters" : {}};

	 if(fromDate != null && fromDate != ""){ fieldFilter.fieldFilters['fromDate'] = fromDate; }
	 if(toDate != null && toDate != ""){ fieldFilter.fieldFilters['toDate'] = toDate; }		
	 if(refDocNo != null && refDocNo != ""){ fieldFilter.fieldFilters['docNo'] = refDocNo;}
	 if(refDocType != null && refDocType != ""){ fieldFilter.fieldFilters['docType'] = refDocType; }
	 if(status != null && status != ""){ fieldFilter.fieldFilters['sf'] = status; }
	 
	 return fieldFilter;
 }
 
$("#postFasDetails").on('click',function(){
	if($("#refDocType").val() == "" ||  $("#refDocType").val() == null){
		$.growl.error({
			message  : "Please Select Ref. Doc. Type !",
			duration : 1000,
			title :'Error'
		});
		return false;
	}
	 var rows = $("#jqxgrid").jqxGrid('getrows');
	 var postIds = [];
	 var docName = "";
		$.each(rows,function(k,v){
			if(v.selectionStatus == true){
				if($("#refDocType").val() == "RV"){
					postIds.push(v.voucherId);
				}
				if($("#refDocType").val() == "MRV"){
					postIds.push(v.mrvNum);
				}
				if($("#refDocType").val() == "BMRV"){
					postIds.push(v.bmrvNum);
				}
				if($("#refDocType").val() == "SMIV"){
					postIds.push(v.smivNo);
				}
				if($("#refDocType").val() == "PB"){
					postIds.push(v.pbId);
				}
				if($("#refDocType").val() == "PR"){
					postIds.push(v.prId);
				}
				if($("#refDocType").val() == "PV"){
					postIds.push(v.pvId);
				}
				if($("#refDocType").val() == "BMIV"){
					postIds.push(v.bmivId);
				}
				if($("#refDocType").val() == "SMRV"){
					postIds.push(v.smrvNo);
				}
				if($("#refDocType").val() == "VR"){
					postIds.push(v.vrNo);
				}
				if($("#refDocType").val() == "SB"){
					postIds.push(v.sbNo);
				}
				if($("#refDocType").val() == "SR"){
					postIds.push(v.sbNo);
				}
			}
		});
	if(postIds.length == 0){
		$.growl.error({
			message : "Please Select Id's to be Posted !",
			duration :1000,
			title : 'Error'
		});
		return false;
	}
	var voucherIds = postIds.join(',');
	var postFilters = rvFieldFilters();
	postFilters.fieldFilters.Type = "post";
	postFilters.fieldFilters.refNos = voucherIds.toString();
	console.log(postFilters);
	postJSON('/OrderExecution/api/v1/pushFasDetails',JSON.stringify(postFilters),function(data) {
		if(data.resCode == "1"){
			$.growl.notice({
				message : data.mesgStr,
				duration :1000,
				title : 'Success'
			});
		
			window.location.href="javascript:showContentPage('fasDetails', 'bodySwitcher')";
		}else{
			
			$.growl.error({
				message : data.mesgStr,
				duration :10000,
				title : 'Error'
			});
				window.location.href="javascript:showContentPage('fasDetails', 'bodySwitcher')";
			return false;
		}
	});
 });
 
//Search Design Order Grid
 var fasMasterGrid = function(){
	 var updateRows = function(rowid, newdata, commit) {}
	 
	 var datafields = [ 
		{name : 'transactionId',	type : 'int', map: 'id'},
		{name : 'createdDate',	type : 'String', map: 'createdDate'},
		{name : 'refDocNo', type : 'int'},
		{name : 'refDocType', type : 'string'},
		{name : 'response', type : 'string'},
		{name : 'sf', type : 'string'},
		{name : 'viewXML', type : 'int', map: 'id'}
	];
 	
	 var columns = [
			{text : 'Transaction ID', datafield : 'transactionId', width : '10%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Created Date', datafield : 'createdDate', width : '10%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Ref. Doc. NO.', datafield : 'refDocNo', width : '10%', cellsalign : 'center', align : 'center',editable : false},			
			{text : 'Ref. Doc. Type', datafield : 'refDocType', width : '10%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'FAS Response', datafield : 'response', width : '60%', cellsalign : 'left', align : 'center',editable : false},
			{text : 'Status', datafield : 'sf', width : '7%', cellsalign : 'center', align : 'center',editable : false}, 			
			{text : '', datafield : 'viewXML', width : '3%', cellsalign : 'center', align : 'center', editable : false, cellsrenderer : viewXML},
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/fasFailedTxnList", "list", columns, fasFieldFilters(), updateRows, "");
 	$("#jqxgrid").jqxGrid({
 		width : '100%',
 		columnsheight : 35,
 		columnsresize : true,
        sortable: true,
        theme: 'energyblue',
 	});
 	
 }
 
 $("#searchFas").on('click', function(){
	 fasMasterGrid();
	 $("#jqxgrid").show();
 });
 
 // FAS Details
 $("#fasDetails").on('click', function(){
	 $("#loading").show();
	 var refDocType = $("#refDocType").val();
	 $.getJSON('/OrderExecution/api/v1/pushFasDetails?docType='+refDocType, function(data) {
		 if(data.resCode == "1" && typeof data != "undefined"){
			 $.growl.notice({message : data.mesgStr,duration : 10000,title : 'Success'});
		 }else{
			 $.growl.error({message : data.mesgStr,	duration : 10000 });
		 }
		 $("#loading").hide();
	 })
 });
 
 $("#clear").on('click', function(){
	 var validator = $("form").validate();
	 validator.resetForm();
	window.location.href="javascript:showContentPage('fasListing', 'bodySwitcher')"

 });