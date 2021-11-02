// date picker functions
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

var updates = new Object();
$("#toDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});


var onloadFunction = function(){
	$.getJSON('/OrderExecution/api/v1/RoughCashBookSummarySalesLov?portal=OE', function(data) {
		if(data.resCode == "1"){
		  $("#companyIdS").val(data.payload.company.id);
		  $("#companyS").val(data.payload.company.name);
			
		  $('#storeNameS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.sList, function(key, val) {
			$('#storeNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
		}
	});
}

onloadFunction();

$("#typeS").on('change',function(){
	if($("#typeS").val() == "SS"){
		$("#hideCashier").hide();
	}else{
		$("#hideCashier").show();
	}
});

$("#storeNameS").on('change',function(){
	var fDate = $("#fromDate").val();
	var tDate = $("#fromDate").val();
	var storeId = $("#storeNameS").val();
	$.getJSON('/OrderExecution/api/v1/getCashierList?storeId='+storeId+'&&fromDate='+fDate+'&&todate='+tDate, function(data) {
		 $('#cashierS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.Cashier, function(key, val) {
			$('#cashierS').append('<option value="' + val.hrms_id + '">' + val.name + '</option>');
		 });
	});
});


$("#toggle5").on('click', function(){
	$("#panel5").slideToggle();
});

$("#toggle6").on('click', function(){
	$("#panel6").slideToggle();
});

$("#toggle7").on('click', function(){
	$("#panel7").slideToggle();
});

$("#toggle1").on('click', function(){
	$("#panel1").slideToggle();
});

$("#toggle2").on('click', function(){
	$("#panel2").slideToggle();
});

$("#toggleCsb").on('click', function(){
	$("#panelCsb").slideToggle();
	cashSaleBillDetGrid();
	$("#jqxgrid2").show();
});

$("#toggleRvAdv").on('click',function(){
	$("#panelRvAdv").slideToggle();
	recVouchOrdAdvDetGrid();
	$("#jqxgrid3").show();
});

$("#toggleRvAB").on('click',function(){
	$("#panelRvAB").slideToggle();
	recVouchABDepDetGrid();
	$("#jqxgrid4").show();
});

$("#toggleRvSP").on('click',function(){
	$("#panelRvSP").slideToggle();
	recVouchSpDetGrid();
	$("#jqxgrid5").show();
});

$("#toggleRvGV").on('click',function(){
	$("#panelRvGV").slideToggle();
	recVouchGiftVouchDetGrid();
	$("#jqxgrid6").show();
});

$("#toggleRvPR").on('click',function(){
	$("#panelRvPR").slideToggle();
	recVouchPRDetGrid();
	$("#jqxgrid7").show();
});

$("#toggleRvCT").on('click',function(){
	$("#panelRvCT").slideToggle();
	recVouchCtoCDetGrid();
	$("#jqxgrid13").show();
});

$("#togglePvPb").on('click',function(){
	$("#panelPvPb").slideToggle();
	pvPbDetGrid();
	$("#jqxgrid8").show();
});

$("#togglePvAdv").on('click',function(){
	$("#panelPvAdv").slideToggle();
	pvOrdAdvDetGrid();
	$("#jqxgrid9").show();
});

$("#togglePvAb").on('click',function(){
	$("#panelPvAb").slideToggle();
	pvAbDepDetGrid();
	$("#jqxgrid10").show();
});

$("#togglePvSr").on('click',function(){
	$("#panelPvSr").slideToggle();
	pvSalesRetCbDetGrid();
	$("#jqxgrid11").show();
});

$("#togglePvCt").on('click',function(){
	$("#panelPvCt").slideToggle();
	pvCashierTransferGrid();
	$("#jqxgrid12").show();
});


$("#stockCheckUpdate").hide();
$("#summarySection").hide();
$("#detailSection").hide();

$("#totals").hide();
$("#search").on('click',function(){
	if($("#typeS").val() == "" || $("#companyIdS").val() == "" || $("#storeNameS").val() == "" || $("#fromDate").val() == "" || $("#toDate").val() == ""
			){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration:  10000,
			title : 'Error'
		});
		return false;
	}else{
		if($("#typeS").val() == "SS"){
			$("#stockCheckUpdate").show();
			$("#summarySection").hide();
			$("#detailSection").hide();
			$("#panel5").slideDown();
			searchSummarySales();
		}else if($("#typeS").val() == "RS"){
			if($("#cashierS").val() == ""){
				$.growl.error({
					message : "Please Select Cashier !!!",
					duration:  10000,
					title : 'Error'
				});
				return false;
			}else{
				$("#stockCheckUpdate").hide();
				$("#summarySection").show();
				$("#detailSection").hide();
				$("#panel6").slideDown();
				searchSummary();
			}
			
		}else if($("#typeS").val() == "RD"){
			if($("#cashierS").val() == ""){
				$.growl.error({
					message : "Please Select Cashier !!!",
					duration:  10000,
					title : 'Error'
				});
				return false;
			}else{
				$("#stockCheckUpdate").hide();
				$("#summarySection").hide();
				$("#detailSection").show();
				$("#panel7").slideDown();
				searchDetails();
			}
		}
	}
	
});

var roughCashBookFieldFilters = function() {
	var companyIdS = $("#companyIdS").val();
	var storeNameS = $("#storeNameS").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
    var cashier = $("#cashierS").val();
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (storeNameS != "" && storeNameS != null) {
		fieldFilters.fieldFilters["storeId"] = storeNameS;
	}
	if (cashier != "" && cashier != null) {
		fieldFilters.fieldFilters["cashierIds"] = cashier;
	}
	
	return fieldFilters;
}



var searchSummarySales = function(){
	var params = roughCashBookFieldFilters();
	delete params.fieldFilters.cashierIds;
	postJSON('/OrderExecution/api/v1/searchRCBSummarySales',JSON.stringify(params),function(response) {
		if(response.resCode == "1"){
			$("#jqxgridG").show();
			$("#jqxgridS").show();
			$("#jqxgridP").show();
			$("#jqxgridD").show();
			
			$("#panel5").slideDown();
			$("#Dcm").show();
			$("#Dcs").show();
			$("#DcfgAcc").show();
			$("#DcMetAcc").show();
			$("#DcMetLoc").show();
			$("#totals").show();
			
			var result = response.payload.list;
			var goldList = [];
			var silverList = [];
			var platinumList = [];
			var diamondList = [];
			var grossTotal = 0.000;
			var netTotal = 0.000 ;
			var diamondTotal = 0.000;
			var amountTotal = 0.00;
			//var sumSalesTotal = [];
			
			$.each(result,function(k,v){
				if(v.metalSegment == "Gold"){
					goldList = 	 v.rcbSummarySalesDTO
				}
				if(v.metalSegment == "Silver"){
					silverList = 	 v.rcbSummarySalesDTO
				}
				if(v.metalSegment == "Platinum"){
					platinumList = 	 v.rcbSummarySalesDTO
				}
				if(v.metalSegment == "Diamond"){
					diamondList = 	 v.rcbSummarySalesDTO
				}
				summarySalesGoldGrid(goldList);
				summarySalesSilverGrid(silverList);
				summarySalesPlatinumGrid(platinumList);
				summarySalesDiamondGrid(diamondList);
				
				
				$.each(v.rcbSummarySalesDTO,function(key,val){
					grossTotal = grossTotal + val.grossWt;
					netTotal = netTotal + val.netWt;
					diamondTotal = diamondTotal + val.diamondWt;
					amountTotal = amountTotal + val.Amount;
				});
				
				$("#grsWtTotal").val(parseFloat(grossTotal).toFixed(3));
				$("#netWtTotal").val(parseFloat(netTotal).toFixed(3));
				$("#diaWtTotal").val(parseFloat(diamondTotal).toFixed(3));
				$("#amtTotal").val(parseFloat(amountTotal).toFixed(2));
				
				/*var sumSalesTotal = [{ "gWt" : grossTotal , "nWt" : netTotal , "dWt" : diamondTotal , "amt" : amountTotal }];
				summarySalesTotalGrid(sumSalesTotal);
*/
			});
		}
	});
}

var searchSummary =  function(){
	var receiptList = [];
	var fieldFilters = roughCashBookFieldFilters();
	postJSON('/OrderExecution/api/v1/searchRoughCashBookSummary',JSON.stringify(fieldFilters),function(response) {
		if(response.resCode == 1){
			
			// Opening Balance
			var opBalList = [];
			var opBal = response.payload.OpeningBalance;
			opBal.docType = "Opening Balance";
			opBalList.push(opBal);
			openingBalanceGrid(opBalList);
			$("#jqxgridO").show();
			
			// RECEIPTS 
			var cashSb = response.payload.CashSaleBill;
			
			cashSb.docType = "Cash Sales Bill";
			
			receiptList.push(cashSb);
			
			/*var creditSb = {};
			creditSb.docType = "Credit Sales Bill";
			
			receiptList.push(creditSb);
			*/
			var purchaseReturn = response.payload.PurchaseReturn;
			purchaseReturn.docType = "Purchase Return";
			
			receiptList.push(purchaseReturn);
			
			var cTocTransfer = response.payload.CashierToCashierTransfer;
			cTocTransfer.docType = "Cashier To Cashier Transfer";
			
			receiptList.push(cTocTransfer);
			
			var recOrdAdvance = response.payload.ReceiptVouchersOrderAdvance;
			recOrdAdvance.docType = "Receipts Vouchers- Order Advance";
			receiptList.push(recOrdAdvance);
			
			var recABDeposit = response.payload.ReceiptVouchersApprovalBillDeposit;
			recABDeposit.docType = "Receipts Vouchers- Approval Bill Deposit";
			receiptList.push(recABDeposit);
			
			var recSp = response.payload.ReceiptVouchersSavingsPlan;
			recSp.docType = "Receipts Vouchers- Savings Plan";
			receiptList.push(recSp);
			
			var recPpGv = response.payload.ReceiptVouchersPrePaidGiftVouchers;
			recPpGv.docType = "Receipts Vouchers- Pre-paid Gift Vouchers";
			receiptList.push(recPpGv);
			
			receiptsGrid(receiptList);
			$("#jqxgridR").show();
			
			// Payment Grid
			var paymentList = [];
			
			var pbObj =  response.payload.PurchaseBill;
			pbObj.docType = "Purchase Bill";
			paymentList.push(pbObj);
			
			var pvOrdAdvance = response.payload.PaymentVoucherOrderAdvanceRefund;
			pvOrdAdvance.docType = "Payment Voucher - Order Advance Refund";
			paymentList.push(pvOrdAdvance);
			
			var pvABDeposit = response.payload.PaymentVoucherApprovalBillDeposit;
			pvABDeposit.docType = "Payment Voucher - Approval Bill Deposit Refund";
			paymentList.push(pvABDeposit);
			
			var srCashBill = response.payload.SalesReturnCashBill;
			srCashBill.docType = "Sales Return - Cash Bill";
			paymentList.push(srCashBill);
			
			var cashierTransfer = response.payload.CashierTransfersCashDeposit;
			cashierTransfer.docType = "Cashier Transfers/Cash Deposit";
			paymentList.push(cashierTransfer);
			
			paymentGrid(paymentList);
			$("#jqxgridY").show();
			
			
			// Closing Balance
			var closingCash = 0.00;
			var closingChqDD = 0.00;
			var closingCard = 0.00;
			
			var recptCash = 0.00;
			var recptChqDD = 0.00;
			var recptCard = 0.00;
			
			var paymCash = 0.00;
			var paymChqDD = 0.00;
			var paymCard = 0.00;
			
			$.each(receiptList,function(k,v){
				console.log(v.cash);
				recptCash = parseFloat(recptCash) + parseFloat(v.cash);
				recptChqDD = parseFloat(recptChqDD) + parseFloat(v.cheque);
				recptCard = parseFloat(recptCard) + parseFloat(v.cards);
				
				console.log(recptCash);
				console.log(recptChqDD);
				console.log(recptCard);
			});
			
			$.each(paymentList,function(k,v){
				console.log(v.cash);
				paymCash = parseFloat(paymCash) + parseFloat(v.cash);
				paymChqDD = parseFloat(paymChqDD) + parseFloat(v.cheque);
				paymCard = parseFloat(paymCard) + parseFloat(v.cards);
				
				console.log(paymCash);
				console.log(paymChqDD);
				console.log(paymCard);
			});
			console.log(recptCash);
			console.log(recptChqDD);
			console.log(recptCard);
			
			console.log(paymCash);
			console.log(paymChqDD);
			console.log(paymCard);
			
			var closingList = [];
			var closingObj = {"cash":0.00 , "cards" : 0.00,"cheque": 0.00,"docType":"Closing Balance"}
			closingObj.cash = (opBal.openingBalance + recptCash) - paymCash ;
			closingObj.cards = (opBal.cards + recptCard) - paymCard ;
			closingObj.cheque = (opBal.cheque + recptChqDD) - paymChqDD ;
			
			
			
			closingList.push(closingObj);
			closingBalanceGrid(closingList);
			$("#jqxgridC").show();
			
			//closing and diffrence
			var closingDiffList = [];
			var closeAsPerTransc = closingObj;
			closeAsPerTransc.docType = "Closing Balance as Per Transaction";
			closingDiffList.push(closeAsPerTransc);
			
			var closeAsPerSys = {"cash":0.00 , "cards" : 0.00,"cheque": 0.00,"docType":"Closing Balance as Per System"}
			closeAsPerSys.cash = response.payload.ClosingBalanceAsPertheSystem;
			closingDiffList.push(closeAsPerSys);
			
			var closeAsPerDeclrn = {"cash":0.00 , "cards" : 0.00,"cheque": 0.00,"docType":"Closing Balance as Per Cashier's Declaration"}
			closeAsPerDeclrn.cash = response.payload.ClosingBalanceAsPertheCashierDeclaration;
			closingDiffList.push(closeAsPerDeclrn);
			
			var diffBtwnSysAndTransc = {"cash":0.00 , "cards" : 0.00,"cheque": 0.00,"docType":"Difference between Transactions and System"}
			var diffBtwnSysAndCashier = {"cash":0.00 , "cards" : 0.00,"cheque": 0.00,"docType":"Difference between System and Cashier's Declaration"}
			var diffBtwnTranscAndCashier = {"cash":0.00 , "cards" : 0.00,"cheque": 0.00,"docType":"Difference between Cashier's Declaration and Transaction"}
			
			diffBtwnSysAndTransc.cash = parseFloat(closeAsPerTransc.cash) - parseFloat(closeAsPerSys.cash);
			//diffBtwnSysAndTransc.cards = parseFloat(closeAsPerSys.cards) - parseFloat(closeAsPerTransc.cards);
			//diffBtwnSysAndTransc.cheque = parseFloat(closeAsPerSys.cheque) - parseFloat(closeAsPerTransc.cheque);
			closingDiffList.push(diffBtwnSysAndTransc);
			
			diffBtwnSysAndCashier.cash = parseFloat(closeAsPerSys.cash) - parseFloat(closeAsPerDeclrn.cash);
			//diffBtwnSysAndCashier.cards = parseFloat(closeAsPerSys.cards) - parseFloat(closeAsPerDeclrn.cards);
			//diffBtwnSysAndCashier.cheque = parseFloat(closeAsPerSys.cheque) - parseFloat(closeAsPerDeclrn.cheque);
			closingDiffList.push(diffBtwnSysAndCashier);
			
			diffBtwnTranscAndCashier.cash = parseFloat(closeAsPerDeclrn.cash) - parseFloat(closeAsPerTransc.cash);
			//diffBtwnTranscAndCashier.cards = parseFloat(closeAsPerTransc.cards) - parseFloat(closeAsPerDeclrn.cards);
			//diffBtwnTranscAndCashier.cheque = parseFloat(closeAsPerTransc.cheque) - parseFloat(closeAsPerDeclrn.cheque);
			
			closingDiffList.push(diffBtwnTranscAndCashier);
			
			closeDifferenceGrid(closingDiffList);
			$("#jqxgridW").show();
			
			// Sales Particulars
			salesParticularsGrid(response.payload.SalesParticulars);
			$("#jqxgridL").show();
			
			// Particulars
			var particularList = [];
			
			var SavingsPlanenrolledforthedayNew = response.payload.SavingsPlanenrolledforthedayNew;
			SavingsPlanenrolledforthedayNew.docType = "Savings Plan enrolled for the day (New)";
			particularList.push(SavingsPlanenrolledforthedayNew);
			
			var SavingsPlanreceiptforthedayExisting = response.payload.SavingsPlanreceiptforthedayExisting;
			SavingsPlanreceiptforthedayExisting.docType = "Savings Plan receipt for the day (Existing)";
			particularList.push(SavingsPlanreceiptforthedayExisting);
			
			var OrderstakenforthedayNew = response.payload.OrderstakenforthedayNew;
			OrderstakenforthedayNew.docType = "Orders taken for the day (New)";
			particularList.push(OrderstakenforthedayNew);
			
			particularsGrid(particularList);
			$("#jqxgridV").show();
		}
	});
}

var recptTotal = 0.00
var paymentTotal = 0.00;
var searchDetails = function(){
	var fieldFilters = roughCashBookFieldFilters();
	postJSON('/OrderExecution/api/v1/searchRoughCashBookDetail',JSON.stringify(fieldFilters),function(response) {
		if(response.resCode == 1){
			// Opening Balance	
			var openingbalDet = [];
			openingbalDet.push(response.payload.OpeningBalance);
			$.each(openingbalDet,function(k,v){
				v.refDocType = "Opening Balance"
			});
			recptTotal = response.payload.OpeningBalance.openingBalance;
			
			openingBalanceDetGrid(openingbalDet);
			$("#jqxgrid1").show();
			
			
			$("#panel1").slideUp();
			$("#panel2").slideUp();
			
			$("#panelCsb").slideUp();
			$("#panelRvAdv").slideUp();
			$("#panelRvAB").slideUp();
			$("#panelRvSP").slideUp();
			$("#panelRvGV").slideUp();
			$("#panelRvPR").slideUp();
			$("#panelRvCT").slideUp();
			
			$("#panelPvPb").slideUp();
			$("#panelPvAdv").slideUp();
			$("#panelPvAb").slideUp();
			$("#panelPvSr").slideUp();
			$("#panelPvCt").slideUp();
			
			$("#jqxgrid3").hide();
			$("#jqxgrid4").hide();
			$("#jqxgrid5").hide();
			$("#jqxgrid6").hide();
			$("#jqxgrid7").hide();
			$("#jqxgrid13").hide();
			
			$("#jqxgrid8").hide();
			$("#jqxgrid9").hide();
			$("#jqxgrid10").hide();
			$("#jqxgrid11").hide();
			$("#jqxgrid12").hide();
		}
	});	
	
	var fieldFilters = roughCashBookFieldFilters();
	postJSON('/OrderExecution/api/v1/searchRoughCashBookSummary',JSON.stringify(fieldFilters),function(response) {
		if(response.resCode == "1"){
			var result  = response.payload;
			
			var opBal = response.payload.OpeningBalance;
			
			// RECEIPTS 
			var receiptList = [];
			var cashSb = response.payload.CashSaleBill;
			receiptList.push(cashSb);
			
		
			var purchaseReturn = response.payload.PurchaseReturn;
			receiptList.push(purchaseReturn);
			
			var cTocTransfer = response.payload.CashierToCashierTransfer;
			receiptList.push(cTocTransfer);
			
			var recOrdAdvance = response.payload.ReceiptVouchersOrderAdvance;
			receiptList.push(recOrdAdvance);
			
			var recABDeposit = response.payload.ReceiptVouchersApprovalBillDeposit;
			receiptList.push(recABDeposit);
			
			var recSp = response.payload.ReceiptVouchersSavingsPlan;
			receiptList.push(recSp);
			
			var recPpGv = response.payload.ReceiptVouchersPrePaidGiftVouchers;
			receiptList.push(recPpGv);
			
			
			// Payment Grid
			var paymentList = [];
			
			var pbObj =  response.payload.PurchaseBill;
			paymentList.push(pbObj);
			
			var pvOrdAdvance = response.payload.PaymentVoucherOrderAdvanceRefund;
			paymentList.push(pvOrdAdvance);
			
			var pvABDeposit = response.payload.PaymentVoucherApprovalBillDeposit;
			paymentList.push(pvABDeposit);
			
			var srCashBill = response.payload.SalesReturnCashBill;
			paymentList.push(srCashBill);
			
			var cashierTransfer = response.payload.CashierTransfersCashDeposit;
			paymentList.push(cashierTransfer);
			
			var recptCash = 0.00;
			$.each(receiptList,function(k,v){
				console.log(v.cash);
				recptCash = parseFloat(recptCash) + parseFloat(v.cash);
			});
			
			var paymCash = 0.00;
			$.each(paymentList,function(k,v){
				console.log(v.cash);
				paymCash = parseFloat(paymCash) + parseFloat(v.cash);
			});
			
			var closingCash = (opBal.openingBalance + recptCash) - paymCash ;
			
			var closeBalAsPerTransaction = {"cash": closingCash,"docType":"Summed-Up Closing Balance as per Transaction","mPayment":"-","cheque":"-","cards":"-"};
			var closeBalAsPerSys = {"cash": result.ClosingBalanceAsPertheSystem,"docType":"Computed Closing Balance as per System","mPayment":"-","cheque":"-","cards":"-"};
			
			var closeBalAsPerDecl = {"cash": result.ClosingBalanceAsPertheCashierDeclaration,"docType":"Declared Closing Balance as per Cashier","mPayment":"-","cheque":"-","cards":"-"};
			
			var diffTS = (result.ClosingBalanceAsPertheSystem != null) ? (closingCash - result.ClosingBalanceAsPertheSystem) : "";
			var diffSC = (result.ClosingBalanceAsPertheSystem != null && result.ClosingBalanceAsPertheCashierDeclaration != null )? (result.ClosingBalanceAsPertheSystem - result.ClosingBalanceAsPertheCashierDeclaration) :"";
			var diffCT = (result.ClosingBalanceAsPertheCashierDeclaration != null) ? (result.ClosingBalanceAsPertheCashierDeclaration - closingCash) : "";
			
			var diffBtnTAndS = {"cash":diffTS,"mPayment":"-","cheque":"-","cards":"-","docType":"Difference Between Transaction and System"};
			var diffBtnSAndC = {"cash":diffSC,"mPayment":"-","cheque":"-","cards":"-","docType":"Difference Between System and Cashier's Declaration"};
			var diffBtnCAndT = {"cash":diffCT,"mPayment":"-","cheque":"-","cards":"-","docType":"Difference Between Cashier's Declaration and Transaction"};

			var closeingBalDetails = []; 
			
			closeingBalDetails.push(closeBalAsPerSys);
			closeingBalDetails.push(closeBalAsPerTransaction);
			closeingBalDetails.push(closeBalAsPerDecl);

			closeingBalDetails.push(diffBtnTAndS);
			closeingBalDetails.push(diffBtnSAndC);
			closeingBalDetails.push(diffBtnCAndT);
			
			console.log(closeingBalDetails);
			closingBalDetGrid(closeingBalDetails);
			$("#jqxgridA").show();
		}
	});

	
	// Receipts Grids
	/*
	
	recVouchOrdAdvDetGrid();
	$("#jqxgrid3").show();
	
	recVouchABDepDetGrid();
	$("#jqxgrid4").show();
	
	recVouchSpDetGrid();
	$("#jqxgrid5").show();
	
	recVouchGiftVouchDetGrid();
	$("#jqxgrid6").show();
	
	recVouchPRDetGrid();
	$("#jqxgrid7").show();
	
	recVouchCtoCDetGrid();
	$("#jqxgrid13").show();
	
	// Payments Grids
	pvPbDetGrid();
	$("#jqxgrid8").show();
	
	pvOrdAdvDetGrid();
	$("#jqxgrid9").show();

	pvAbDepDetGrid();
	$("#jqxgrid10").show();
	
	pvSalesRetCbDetGrid();
	$("#jqxgrid11").show();
	
	pvCashierTransferGrid();
	$("#jqxgrid12").show();*/
}
// Summary Sales Gold Grid
var summarySalesGoldGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'grossWt',	type: 'float'},
			    { name: 'netWt',	type: 'float'},
			    { name: 'diamondWt',	type: 'float'},
			    { name: 'Amount',	type: 'float'},
			    { name: 'transactionType', type: 'string'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridG").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '180px',
		theme: 'energyblue',
        columnsheight: 35,
        columnsresize: true,  
		rowsheight : 30,
		//autorowheight : true,
		autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		showtoolbar : true,
		showstatusbar: true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Metal Segment : Gold </b>');			
		},
		columns : [
			 	{ text: 'Transaction Type', datafield: 'transactionType', width: "20%", cellsalign : 'center',sortable : false, align:'center',
			 		aggregatesrenderer: function() {        		 
			  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Total</b></span>';
					}
	            },
			 	{ text: 'Gross Wt', datafield: 'grossWt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd3',sortable : false,
	            	aggregates: [{          
	  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
	  						  var total = (record['grossWt'] == null) ? 0 : record['grossWt'];
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
			 	{ text: 'Net Wt', datafield: 'netWt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd3',sortable : false,
			 		aggregates: [{          
				  		  'Total': function(aggregatedValue, currentValue, column, record) {
								  var total = (record['netWt'] == null) ? 0 : record['netWt'];
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
			 	{ text: 'Diamond Wt', datafield: 'diamondWt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd3',sortable : false,
			 		aggregates: [{          
				  		  'Total': function(aggregatedValue, currentValue, column, record) {
								  var total = (record['diamondWt'] == null) ? 0 : record['diamondWt'];
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
			 	{ text: 'Amount', datafield: 'Amount', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd2',sortable : false,
			 		aggregates: [{          
				  		  'Total': function(aggregatedValue, currentValue, column, record) {
								  var total = (record['Amount'] == null) ? 0 : record['Amount'];
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
			 	}
	           
		]
	});
}

// Summary Sales 
var summarySalesSilverGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'grossWt',	type: 'float'},
			    { name: 'netWt',	type: 'float'},
			    { name: 'diamondWt',	type: 'float'},
			    { name: 'Amount',	type: 'float'},
			    { name: 'transactionType', type: 'string'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridS").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '180px',
		theme: 'energyblue',
        columnsheight: 35,
        columnsresize: true,  
		rowsheight : 30,
		//autorowheight : true,
		autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		showtoolbar : true,
		showstatusbar: true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Metal Segment : Silver </b>');			
		},
		columns : [
		 	{ text: 'Transaction Type', datafield: 'transactionType', width: "20%", cellsalign : 'center',sortable : false, align:'center',
		 		aggregatesrenderer: function() {        		 
		  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Total</b></span>';
				}
            },
		 	{ text: 'Gross Wt', datafield: 'grossWt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd3',sortable : false,
            	aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['grossWt'] == null) ? 0 : record['grossWt'];
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
		 	{ text: 'Net Wt', datafield: 'netWt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd3',sortable : false,
		 		aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['netWt'] == null) ? 0 : record['netWt'];
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
		 	{ text: 'Diamond Wt', datafield: 'diamondWt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd3',sortable : false,
		 		aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['diamondWt'] == null) ? 0 : record['diamondWt'];
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
		 	{ text: 'Amount', datafield: 'Amount', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd2',sortable : false,
		 		aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['Amount'] == null) ? 0 : record['Amount'];
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
		 	}
           
	]
	});
}

//Summary Sales 
var summarySalesPlatinumGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'grossWt',	type: 'float'},
			    { name: 'netWt',	type: 'float'},
			    { name: 'diamondWt',	type: 'float'},
			    { name: 'Amount',	type: 'float'},
			    { name: 'transactionType', type: 'string'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridP").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '180px',
		theme: 'energyblue',
        columnsheight: 35,
        columnsresize: true,  
		rowsheight : 30,
		//autorowheight : true,
		autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		showtoolbar : true,
		showstatusbar: true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Metal Segment : Platinum </b>');			
		},
		columns : [
		 	{ text: 'Transaction Type', datafield: 'transactionType', width: "20%", cellsalign : 'center',sortable : false, align:'center',
		 		aggregatesrenderer: function() {        		 
		  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Total</b></span>';
				}
            },
		 	{ text: 'Gross Wt', datafield: 'grossWt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd3',sortable : false,
            	aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['grossWt'] == null) ? 0 : record['grossWt'];
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
		 	{ text: 'Net Wt', datafield: 'netWt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd3',sortable : false,
		 		aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['netWt'] == null) ? 0 : record['netWt'];
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
		 	{ text: 'Diamond Wt', datafield: 'diamondWt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd3',sortable : false,
		 		aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['diamondWt'] == null) ? 0 : record['diamondWt'];
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
		 	{ text: 'Amount', datafield: 'Amount', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd2',sortable : false,
		 		aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['Amount'] == null) ? 0 : record['Amount'];
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
		 	}
           
	]
	});
}

// Summary Sales Diamond Grid
var summarySalesDiamondGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'grossWt',	type: 'float'},
			    { name: 'netWt',	type: 'float'},
			    { name: 'diamondWt',	type: 'float'},
			    { name: 'Amount',	type: 'float'},
			    { name: 'transactionType', type: 'string'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridD").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '180px',
		theme: 'energyblue',
        columnsheight: 35,
        columnsresize: true,  
		rowsheight : 30,
		//autorowheight : true,
		autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
 	    showstatusbar: true,
		showaggregates: true, 
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Metal Segment : Diamond </b>');			
		},
		columns : [
		 	{ text: 'Transaction Type', datafield: 'transactionType', width: "20%", cellsalign : 'center',sortable : false, align:'center',
		 		aggregatesrenderer: function() {        		 
		  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b> Total</b></span>';
				}
            },
		 	{ text: 'Gross Wt', datafield: 'grossWt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd3',sortable : false,
            	aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['grossWt'] == null) ? 0 : record['grossWt'];
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
		 	{ text: 'Net Wt', datafield: 'netWt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd3',sortable : false,
		 		aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['netWt'] == null) ? 0 : record['netWt'];
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
		 	{ text: 'Diamond Wt', datafield: 'diamondWt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd3',sortable : false,
		 		aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['diamondWt'] == null) ? 0 : record['diamondWt'];
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
		 	{ text: 'Amount', datafield: 'Amount', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd2',sortable : false,
		 		aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['Amount'] == null) ? 0 : record['Amount'];
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
		 	}
           
	]
	});
}

//Summary Opening Balance
var openingBalanceGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'docType','type' : 'string'},
				{'name' : 'docGrossAmt','type' : 'float'},
				{'name' : 'discAmt','type' : 'float'},
				{'name' : 'docNetAmt','type' : 'float'},
				{'name' : 'orderAdvance','type' : 'float'},
				{'name' : 'giftVoucher','type' : 'float'},
				{'name' : 'adjAmt','type' : 'float'},
				{'name' : 'cash','type' : 'float','map':'openingBalance'},
				{'name' : 'cheque','type' : 'float'},
				{'name' : 'cards','type' : 'float'},
				{'name' : 'mPayment','type' : 'float'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridO").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '200px',
		theme: 'energyblue',
        columnsheight: 50,
        columnsresize: true,  
		rowsheight : 35,
		//autorowheight : true,
		autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		//showaggregates: true, 
		showtoolbar : true,
		showstatusbar: true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Opening Balance : </b>');			
		},
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],
		columns : [
			{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'center',align : 'center','width' : '10%',sortable : true,editable : false},
			{'text' : 'Doc Gross Amount','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'Discount Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'Doc Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '15%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '15%',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '13%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '12%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '15%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode"},
		/*	{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode"},
			{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2'},
			{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2'},*/
		]
	});
}

// Summary Receipts Grids
var receiptsGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'docType','type' : 'string'},
				{'name' : 'docGrossAmt','type' : 'float'},
				{'name' : 'discAmt','type' : 'float'},
				{'name' : 'docNetAmt','type' : 'float'},
				{'name' : 'orderAdvance','type' : 'float'},
				{'name' : 'giftVoucher','type' : 'float'},
				{'name' : 'adjAmt','type' : 'float'},
				{'name' : 'cash','type' : 'float'},
				{'name' : 'cheque','type' : 'float'},
				{'name' : 'cards','type' : 'float'},
				{'name' : 'mPayment','type' : 'float'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridR").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '420px',
		theme: 'energyblue',
        columnsheight: 50,
        columnsresize: true,  
		rowsheight : 35,
		//autorowheight : true,
		autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		showtoolbar : true,
		showstatusbar: true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Receipts : </b>');			
		},
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],
		columns : [
			{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '15%',sortable : true,editable : false,
				aggregatesrenderer: function() {        		 
		  			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;"><b>Grand Total of Receipts : </b></span>';
					}
			},
			{'text' : 'Doc Gross Amount','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Discount Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Doc Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['cash'] == null) ? 0 : record['cash'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['cheque'] == null) ? 0 : record['cheque'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['cards'] == null) ? 0 : record['cards'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			}
		]
	});
}

//Payment Grid
var paymentGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'docType','type' : 'string'},
				{'name' : 'docGrossAmt','type' : 'float'},
				{'name' : 'discAmt','type' : 'float'},
				{'name' : 'docNetAmt','type' : 'float'},
				{'name' : 'orderAdvance','type' : 'float'},
				{'name' : 'giftVoucher','type' : 'float'},
				{'name' : 'adjAmt','type' : 'float'},
				{'name' : 'cash','type' : 'float'},
				{'name' : 'cheque','type' : 'float'},
				{'name' : 'cards','type' : 'float'},
				{'name' : 'mPayment','type' : 'float'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridY").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '360px',
		theme: 'energyblue',
        columnsheight: 50,
        columnsresize: true,  
		rowsheight : 35,
		//autorowheight : true,
		autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		showtoolbar : true,
		showstatusbar: true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Payments : </b>');			
		},
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],
		columns : [
			{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '15%',sortable : true,editable : false,
				aggregatesrenderer: function() {        		 
		  			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;"><b>Grand Total of Payments : </b></span>';
					}
			},
			{'text' : 'Doc Gross Amount','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Discount Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Doc Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['cash'] == null) ? 0 : record['cash'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['cheque'] == null) ? 0 : record['cheque'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['cards'] == null) ? 0 : record['cards'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center; padding :3px;">' + aggregates["Total"] + '</span>';
			    		  	}
			  	  }
			}
		]
	});
}

//Summary Closing Balance
var closingBalanceGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'docType','type' : 'string'},
				{'name' : 'docGrossAmt','type' : 'float'},
				{'name' : 'discAmt','type' : 'float'},
				{'name' : 'docNetAmt','type' : 'float'},
				{'name' : 'orderAdvance','type' : 'float'},
				{'name' : 'giftVoucher','type' : 'float'},
				{'name' : 'adjAmt','type' : 'float'},
				{'name' : 'cash','type' : 'float'},
				{'name' : 'cheque','type' : 'float'},
				{'name' : 'cards','type' : 'float'},
				{'name' : 'mPayment','type' : 'float'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridC").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '180px',
		theme: 'energyblue',
        columnsheight: 50,
        columnsresize: true,  
		rowsheight : 35,
		//autorowheight : true,
		autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		//showaggregates: true, 
		showtoolbar : true,
		showstatusbar: true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Closing Balance : </b>');			
		},
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],
		columns : [
			{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false},
			{'text' : 'Doc Gross Amount','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'Discount Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'Doc Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '15%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '15%',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '13%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '12%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '15%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode"},
		/*	{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '11%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode"},
			{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2'},
			{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2'},*/
		]
	});
}


// Difference Grid
var closeDifferenceGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'docType',	type: 'string'},
			    { name: 'cash',	type: 'float'},
			    { name: 'cheque',	type: 'float'},
			    { name: 'cards',	type: 'float'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridW").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '210px',
		theme: 'energyblue',
        columnsheight: 35,
        columnsresize: true,  
		rowsheight : 30,
		//autorowheight : true,
		autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
	//	showaggregates: true, 
		//showtoolbar : true,
		//showstatusbar: true,
		columns : [
			 	{ text: '', datafield: 'docType', width: "50%", cellsalign : 'center',sortable : false, align:'center'},
			 	{ text: 'Cash', datafield: 'cash', width: "50%", cellsalign : 'right', align:'center',cellsformat : 'd2',sortable : false},
			/* 	{ text: 'Cheque,TC,DD,PO', datafield: 'cheque', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd2',sortable : false},
			 	{ text: 'Cards', datafield: 'cards', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd2',sortable : false},*/
		]
	});
}

// Sales Particulars
var salesParticularsGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'metalSegment',	type: 'string'},
			    { name: 'Gwt',	type: 'float'},
			    { name: 'Nwt',	type: 'float'},
			    { name: 'grossVal',	type: 'float'},
			    { name: 'discount',	type: 'float','map':'discAmt'},
			    { name: 'netVal',	type: 'float','map':'docNetAmt'},

			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridL").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '150px',
		theme: 'energyblue',
        columnsheight: 35,
        columnsresize: true,  
		rowsheight : 30,
		//autorowheight : true,
		autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
	//	showtoolbar : true,
		showstatusbar: true,
		columns : [
			 	{ text: 'Sales Particulars', datafield: 'metalSegment', width: "20%", cellsalign : 'center',sortable : false, align:'center',
			 		aggregatesrenderer: function() {        		 
			  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Total :</b></span>';
					}
	            },
			 	{ text: 'Gross Wt', datafield: 'Gwt', width: "15%", cellsalign : 'right', align:'center',cellsformat : 'd3',sortable : false,
	            	aggregates: [{          
	  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
	  						  var total = (record['Gwt'] == null) ? 0 : record['Gwt'];
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
			 	{ text: 'Net Wt', datafield: 'Nwt', width: "15%", cellsalign : 'right', align:'center',cellsformat : 'd3',sortable : false,
			 		aggregates: [{          
				  		  'Total': function(aggregatedValue, currentValue, column, record) {
								  var total = (record['Nwt'] == null) ? 0 : record['Nwt'];
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
			 	{ text: 'Gross Val', datafield: 'grossVal', width: "17%", cellsalign : 'right', align:'center',cellsformat : 'd3',sortable : false,
			 		aggregates: [{          
				  		  'Total': function(aggregatedValue, currentValue, column, record) {
								  var total = (record['grossVal'] == null) ? 0 : record['grossVal'];
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
			 	{ text: 'Discount', datafield: 'discount', width: "17%", cellsalign : 'right', align:'center',cellsformat : 'd2',sortable : false,
			 		aggregates: [{          
				  		  'Total': function(aggregatedValue, currentValue, column, record) {
								  var total = (record['discount'] == null) ? 0 : record['discount'];
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
			 	{ text: 'Net Value', datafield: 'netVal', width: "16%", cellsalign : 'right', align:'center',cellsformat : 'd2',sortable : false,
			 		aggregates: [{          
				  		  'Total': function(aggregatedValue, currentValue, column, record) {
								  var total = (record['netVal'] == null) ? 0 : record['netVal'];
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
			 	}
	           
		]
	});
}

// Savings Plan Particulars
var particularsGrid = function(response) {
	var source = {
			datafields : [
				{ name: 'docType',	type: 'string'},
			    { name: 'estvalue',	type: 'float'},
			    { name: 'count',	type: 'float'},
			    { name: 'advanceAmt',	type: 'float'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridV").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '120px',
		theme: 'energyblue',
        columnsheight: 35,
        columnsresize: true,  
		rowsheight : 30,
		autoheight : false,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		columns : [
			 	{ text: 'Particulars', datafield: 'docType', width: "40%", cellsalign : 'left',sortable : false, align:'center'},
			 	{ text: 'Est. Value', datafield: 'estvalue', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd2',sortable : false},
			 	{ text: 'Count', datafield: 'count', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd2',sortable : false},
			 	{ text: 'Adv. Amount', datafield: 'advanceAmt', width: "20%", cellsalign : 'center', align:'center',cellsformat : 'd2',sortable : false},
		]
	});
}

// Details Section Started
// Receipts/Payment Field Filters
var roughCashBookCB = function(){
	varfieldFilters =  roughCashBookFieldFilters();
	
	fieldFilters.fieldFilters.RCBType = "CashSaleBill";
	
	return fieldFilters;
}

var roughCashBookRvOrdAdv = function(){
	varfieldFilters =  roughCashBookFieldFilters();
	
	fieldFilters.fieldFilters.RCBType = "ReceiptVouchersOrderAdvance";
	
	return fieldFilters;
}

var roughCashBookRvABDepo = function(){
	varfieldFilters =  roughCashBookFieldFilters();
	
	fieldFilters.fieldFilters.RCBType = "ReceiptVouchersApprovalBillDeposit";
	
	return fieldFilters;
}

var roughCashBookRvSp = function(){
	varfieldFilters =  roughCashBookFieldFilters();
	
	fieldFilters.fieldFilters.RCBType = "ReceiptVouchersSavingsPlan";
	
	return fieldFilters;
}

var roughCashBookRvGv = function(){
	varfieldFilters =  roughCashBookFieldFilters();
	
	fieldFilters.fieldFilters.RCBType = "ReceiptVouchersPrePaidGiftVouchers";
	
	return fieldFilters;
}

var roughCashBookPR = function(){
	var fieldFilters =  roughCashBookFieldFilters();
	
	fieldFilters.fieldFilters.RCBType = "PurchaseReturn";
	
	return fieldFilters;
}

var roughCashBookCtoC =  function(){
	var fieldFilters =  roughCashBookFieldFilters();
	
	fieldFilters.fieldFilters.RCBType = "CashierToCashierTransfer";
	
	return fieldFilters; 
}

var roughCashBookPB= function(){
	var fieldFilters =  roughCashBookFieldFilters();
	
	fieldFilters.fieldFilters.RCBType = "PurchaseBill";
	
	return fieldFilters;
}

var roughCashBookPvOrdAdv= function(){
	var fieldFilters =  roughCashBookFieldFilters();
	
	fieldFilters.fieldFilters.RCBType = "PaymentVoucherOrderAdvanceRefund";
	
	return fieldFilters;
}

var roughCashBookPvAbDep = function(){
	var fieldFilters =  roughCashBookFieldFilters();
	
	fieldFilters.fieldFilters.RCBType = "PaymentVoucherApprovalBillDeposit";
	
	return fieldFilters;
}

var roughCashBookPvSrCb = function(){
	var fieldFilters =  roughCashBookFieldFilters();
	
	fieldFilters.fieldFilters.RCBType = "SalesReturnCashBill";
	
	return fieldFilters;
}

var roughCashBookPvCashierTransferDep = function(){
	var fieldFilters =  roughCashBookFieldFilters();
	
	fieldFilters.fieldFilters.RCBType = "CashierTransfersCashDeposit";
	
	return fieldFilters;
}

var openingBalanceDetGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'createdDate','type' : 'string'},
				{'name' : 'refDocNo','type' : 'string'},
				{'name' : 'CashierId','type' : 'string'},

				{'name' : 'docType','type' : 'string','map':'refDocType'},
				{'name' : 'docGrossAmt','type' : 'float'},
				{'name' : 'discAmt','type' : 'float'},
				{'name' : 'docNetAmt','type' : 'float'},
				{'name' : 'orderAdvance','type' : 'float'},
				{'name' : 'giftVoucher','type' : 'float'},
				{'name' : 'adjAmt','type' : 'float'},
				{'name' : 'cash','type' : 'float','map':'openingBalance'},
				{'name' : 'cheque','type' : 'float'},
				{'name' : 'cards','type' : 'float'},
				{'name' : 'mPayment','type' : 'float'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid1").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '200px',
		theme: 'energyblue',
        columnsheight: 50,
        columnsresize: true,  
		rowsheight : 35,
		//autorowheight : true,
		autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		//showaggregates: true, 
		showtoolbar : true,
		showstatusbar: true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Opening Balance : </b>');			
		},
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],
		columns : [
			{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '10%',sortable : true,editable : false},
			{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '10%',sortable : true,editable : false},
			{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'center',align : 'center','width' : '10%',sortable : true,editable : false},
			{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '10%',sortable : true,editable : false},

			{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2'},
			{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '15%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode"},
		/*	{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode"},
			{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2'},
			{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2'},*/
		]
	});
}

var closingBalDetGrid = function(response) {
	var source = {
			datafields : [

				{'name' : 'docType','type' : 'string'},
				{'name' : 'cash','type' : 'float'},
				{'name' : 'cheque','type' : 'float'},
				{'name' : 'cards','type' : 'float'},
				{'name' : 'mPayment','type' : 'float'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridA").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '375px',
		theme: 'energyblue',
        columnsheight: 50,
        columnsresize: true,  
		rowsheight : 35,
		//autorowheight : true,
		autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		//showaggregates: true, 
		showtoolbar : true,
		//showstatusbar: true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;<b> Closing Balance : </b>');			
		},
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],
		columns : [
			
			{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '50%',sortable : true,editable : false},
			{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '50%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
				aggregates: [{          
	  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
	  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
			{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'center',align : 'center','width' : '15%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",hidden:true,
				aggregates: [{          
	  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
	  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
			{'text' : 'Cards','datafield' : 'cards',cellsalign : 'center',align : 'center','width' : '10%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',hidden:true,
				aggregates: [{          
	  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
	  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
			{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'center',align : 'center','width' : '15%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',hidden:true,
				aggregates: [{          
	  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
	  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
			}
		]
	});
}


var cashSaleBillDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'createdDate','type' : 'string'},
			{'name' : 'refDocNo','type' : 'string'},
			{'name' : 'CashierId','type' : 'string'},

			{'name' : 'docType','type' : 'string','map':'refDocType'},
			{'name' : 'docGrossAmt','type' : 'float'},
			{'name' : 'discAmt','type' : 'float'},
			{'name' : 'docNetAmt','type' : 'float'},
			{'name' : 'orderAdvance','type' : 'float'},
			{'name' : 'giftVoucher','type' : 'float'},
			{'name' : 'adjAmt','type' : 'float'},
			{'name' : 'cash','type' : 'float'},
			{'name' : 'cheque','type' : 'float'},
			{'name' : 'cards','type' : 'float'},
			{'name' : 'mPayment','type' : 'float'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'center',align : 'center','width' : '10%',sortable : true,editable : false,
			 cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Cash Sales Bill</div>";
		      	} 
		},
		{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '4%',sortable : true,editable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Cash Sales Bill Total :</b></span>';
			}
		},

		{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
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
		{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
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
		{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
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
		{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
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
		{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
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
		{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
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
		{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
		{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
		{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
		{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchRoughCashBookDetail", "CashSaleBill", columns, roughCashBookCB(), updateRows, "", "#jqxgrid2");
    $("#jqxgrid2").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],

    });
}

var recVouchOrdAdvDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'createdDate','type' : 'string'},
			{'name' : 'refDocNo','type' : 'string'},
			{'name' : 'CashierId','type' : 'string'},

			{'name' : 'docType','type' : 'string','map':'refDocType'},
			{'name' : 'docGrossAmt','type' : 'float'},
			{'name' : 'discAmt','type' : 'float'},
			{'name' : 'docNetAmt','type' : 'float'},
			{'name' : 'orderAdvance','type' : 'float'},
			{'name' : 'giftVoucher','type' : 'float'},
			{'name' : 'adjAmt','type' : 'float'},
			{'name' : 'cash','type' : 'float',},
			{'name' : 'cheque','type' : 'float'},
			{'name' : 'cards','type' : 'float'},
			{'name' : 'mPayment','type' : 'float'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false,
			 cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Receipt Vouchers - Order Advance</div>";
		      	} 
		},
		{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '4%',sortable : true,editable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Receipt Voucher - Order Advance Total :</b></span>';
			}
		},

		{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
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
		{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
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
		{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
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
		{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
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
		{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
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
		{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
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
		{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
		{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
		{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
		{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchRoughCashBookDetail", "ReceiptVouchersOrderAdvance", columns, roughCashBookRvOrdAdv(), updateRows, "", "#jqxgrid3");
    $("#jqxgrid3").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],

    });
}

var recVouchABDepDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'createdDate','type' : 'string'},
			{'name' : 'refDocNo','type' : 'string'},
			{'name' : 'CashierId','type' : 'string'},

			{'name' : 'docType','type' : 'string','map':'refDocType'},
			{'name' : 'docGrossAmt','type' : 'float'},
			{'name' : 'discAmt','type' : 'float'},
			{'name' : 'docNetAmt','type' : 'float'},
			{'name' : 'orderAdvance','type' : 'float'},
			{'name' : 'giftVoucher','type' : 'float'},
			{'name' : 'adjAmt','type' : 'float'},
			{'name' : 'cash','type' : 'float',},
			{'name' : 'cheque','type' : 'float'},
			{'name' : 'cards','type' : 'float'},
			{'name' : 'mPayment','type' : 'float'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false,
			 cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Receipt Vouchers - Approval Bill Deposit</div>";
		      	}
		},
		{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '4%',sortable : true,editable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Receipt Voucher - Approval Bill Deposit Total :</b></span>';
			}
		},

		{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
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
		{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
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
		{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
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
		{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
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
		{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
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
		{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
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
		{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
		{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
		{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
		{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchRoughCashBookDetail", "ReceiptVouchersApprovalBillDeposit", columns, roughCashBookRvABDepo(), updateRows, "", "#jqxgrid4");
    $("#jqxgrid4").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],

    });
}

var recVouchSpDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'createdDate','type' : 'string'},
			{'name' : 'refDocNo','type' : 'string'},
			{'name' : 'CashierId','type' : 'string'},

			{'name' : 'docType','type' : 'string','map':'refDocType'},
			{'name' : 'docGrossAmt','type' : 'float'},
			{'name' : 'discAmt','type' : 'float'},
			{'name' : 'docNetAmt','type' : 'float'},
			{'name' : 'orderAdvance','type' : 'float'},
			{'name' : 'giftVoucher','type' : 'float'},
			{'name' : 'adjAmt','type' : 'float'},
			{'name' : 'cash','type' : 'float'},
			{'name' : 'cheque','type' : 'float'},
			{'name' : 'cards','type' : 'float'},
			{'name' : 'mPayment','type' : 'float'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false,
			 cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Receipt Vouchers - Savings Plan</div>";
		      	}
		},
		{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '4%',sortable : true,editable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Receipt Voucher - Savings Plan Total :</b></span>';
			}
		},

		{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
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
		{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
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
		{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
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
		{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
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
		{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
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
		{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
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
		{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
		{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
		{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
		{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchRoughCashBookDetail", "ReceiptVouchersSavingsPlan", columns, roughCashBookRvSp(), updateRows, "", "#jqxgrid5");
    $("#jqxgrid5").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],

    });
}

var recVouchGiftVouchDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'createdDate','type' : 'string'},
			{'name' : 'refDocNo','type' : 'string'},
			{'name' : 'CashierId','type' : 'string'},

			{'name' : 'docType','type' : 'string','map':'refDocType'},
			{'name' : 'docGrossAmt','type' : 'float'},
			{'name' : 'discAmt','type' : 'float'},
			{'name' : 'docNetAmt','type' : 'float'},
			{'name' : 'orderAdvance','type' : 'float'},
			{'name' : 'giftVoucher','type' : 'float'},
			{'name' : 'adjAmt','type' : 'float'},
			{'name' : 'cash','type' : 'float'},
			{'name' : 'cheque','type' : 'float'},
			{'name' : 'cards','type' : 'float'},
			{'name' : 'mPayment','type' : 'float'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false,
			 cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Receipt Vouchers - Pre-paid Gift Vouchers</div>";
		      	}
		},
		{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '4%',sortable : true,editable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Receipt Voucher - Pre-paid Gift Vouchers Total :</b></span>';
			}
		},

		{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
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
		{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
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
		{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
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
		{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
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
		{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
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
		{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
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
		{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
		{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
		{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
		{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchRoughCashBookDetail", "ReceiptVouchersPrePaidGiftVouchers", columns, roughCashBookRvGv(), updateRows, "", "#jqxgrid6");
    $("#jqxgrid6").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],

    });
}

var recVouchPRDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'createdDate','type' : 'string'},
			{'name' : 'refDocNo','type' : 'string'},
			{'name' : 'CashierId','type' : 'string'},

			{'name' : 'docType','type' : 'string','map':'refDocType'},
			{'name' : 'docGrossAmt','type' : 'float'},
			{'name' : 'discAmt','type' : 'float'},
			{'name' : 'docNetAmt','type' : 'float'},
			{'name' : 'orderAdvance','type' : 'float'},
			{'name' : 'giftVoucher','type' : 'float'},
			{'name' : 'adjAmt','type' : 'float'},
			{'name' : 'cash','type' : 'float'},
			{'name' : 'cheque','type' : 'float'},
			{'name' : 'cards','type' : 'float'},
			{'name' : 'mPayment','type' : 'float'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false,
			 cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Purchase Return</div>";
		      	}
		},
		{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '4%',sortable : true,editable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Purchase Return Total :</b></span>';
			}
		},

		{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
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
		{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
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
		{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
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
		{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
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
		{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
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
		{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
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
		{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
		{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
		{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
		{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchRoughCashBookDetail", "PurchaseReturn", columns, roughCashBookPR(), updateRows, "", "#jqxgrid7");
    $("#jqxgrid7").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],

    });
}

var recVouchCtoCDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'createdDate','type' : 'string'},
			{'name' : 'refDocNo','type' : 'string'},
			{'name' : 'CashierId','type' : 'string'},

			{'name' : 'docType','type' : 'string','map':'refDocType'},
			{'name' : 'docGrossAmt','type' : 'float'},
			{'name' : 'discAmt','type' : 'float'},
			{'name' : 'docNetAmt','type' : 'float'},
			{'name' : 'orderAdvance','type' : 'float'},
			{'name' : 'giftVoucher','type' : 'float'},
			{'name' : 'adjAmt','type' : 'float'},
			{'name' : 'cash','type' : 'float'},
			{'name' : 'cheque','type' : 'float'},
			{'name' : 'cards','type' : 'float'},
			{'name' : 'mPayment','type' : 'float'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false,
			 cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Purchase Return</div>";
		      	}
		},
		{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '4%',sortable : true,editable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Cashier to Cashier Total :</b></span>';
			}
		},

		{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
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
		{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
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
		{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
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
		{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
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
		{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
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
		{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
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
		{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
		{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
		{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
		{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchRoughCashBookDetail", "CashierToCashierTransfer", columns, roughCashBookCtoC(), updateRows, "", "#jqxgrid13");
    $("#jqxgrid13").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],

    });
}


// PAYMENTS GRID
var pvPbDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'createdDate','type' : 'string'},
			{'name' : 'refDocNo','type' : 'string'},
			{'name' : 'CashierId','type' : 'string'},

			{'name' : 'docType','type' : 'string','map':'refDocType'},
			{'name' : 'docGrossAmt','type' : 'float'},
			{'name' : 'discAmt','type' : 'float'},
			{'name' : 'docNetAmt','type' : 'float'},
			{'name' : 'orderAdvance','type' : 'float'},
			{'name' : 'giftVoucher','type' : 'float'},
			{'name' : 'adjAmt','type' : 'float'},
			{'name' : 'cash','type' : 'float'},
			{'name' : 'cheque','type' : 'float'},
			{'name' : 'cards','type' : 'float'},
			{'name' : 'mPayment','type' : 'float'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false,
			 cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Purchase Bill</div>";
		      	}
		},
		{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '4%',sortable : true,editable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Purchase Bill Total :</b></span>';
			}
		},

		{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
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
		{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
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
		{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
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
		{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
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
		{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
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
		{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
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
		{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
		{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
		{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
		{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchRoughCashBookDetail", "PurchaseBill", columns, roughCashBookPB(), updateRows, "", "#jqxgrid8");
    $("#jqxgrid8").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],

    });
}

var pvOrdAdvDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'createdDate','type' : 'string'},
			{'name' : 'refDocNo','type' : 'string'},
			{'name' : 'CashierId','type' : 'string'},

			{'name' : 'docType','type' : 'string','map':'refDocType'},
			{'name' : 'docGrossAmt','type' : 'float'},
			{'name' : 'discAmt','type' : 'float'},
			{'name' : 'docNetAmt','type' : 'float'},
			{'name' : 'orderAdvance','type' : 'float'},
			{'name' : 'giftVoucher','type' : 'float'},
			{'name' : 'adjAmt','type' : 'float'},
			{'name' : 'cash','type' : 'float'},
			{'name' : 'cheque','type' : 'float'},
			{'name' : 'cards','type' : 'float'},
			{'name' : 'mPayment','type' : 'float'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false,
			 cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Payment Vouchers - Order Advance Refund Total</div>";
		      	}
		},
		{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '4%',sortable : true,editable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Purchase Return Total :</b></span>';
			}
		},

		{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
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
		{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
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
		{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
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
		{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
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
		{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
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
		{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
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
		{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
		{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
		{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
		{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchRoughCashBookDetail", "PaymentVoucherOrderAdvanceRefund", columns, roughCashBookPvOrdAdv(), updateRows, "", "#jqxgrid9");
    $("#jqxgrid9").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],

    });
}


var pvAbDepDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'createdDate','type' : 'string'},
			{'name' : 'refDocNo','type' : 'string'},
			{'name' : 'CashierId','type' : 'string'},

			{'name' : 'docType','type' : 'string','map':'refDocType'},
			{'name' : 'docGrossAmt','type' : 'float'},
			{'name' : 'discAmt','type' : 'float'},
			{'name' : 'docNetAmt','type' : 'float'},
			{'name' : 'orderAdvance','type' : 'float'},
			{'name' : 'giftVoucher','type' : 'float'},
			{'name' : 'adjAmt','type' : 'float'},
			{'name' : 'cash','type' : 'float'},
			{'name' : 'cheque','type' : 'float'},
			{'name' : 'cards','type' : 'float'},
			{'name' : 'mPayment','type' : 'float'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false,
			 cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Payment Vouchers - Approval Bill Deposit Refund Total</div>";
		      	}
		},
		{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '4%',sortable : true,editable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Purchase Return Total :</b></span>';
			}
		},

		{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
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
		{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
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
		{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
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
		{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
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
		{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
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
		{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
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
		{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
		{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
		{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
		{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchRoughCashBookDetail", "PaymentVoucherApprovalBillDeposit", columns, roughCashBookPvAbDep(), updateRows, "", "#jqxgrid10");
    $("#jqxgrid10").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],

    });
}


var pvSalesRetCbDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'createdDate','type' : 'string'},
			{'name' : 'refDocNo','type' : 'string'},
			{'name' : 'CashierId','type' : 'string'},

			{'name' : 'docType','type' : 'string','map':'refDocType'},
			{'name' : 'docGrossAmt','type' : 'float'},
			{'name' : 'discAmt','type' : 'float'},
			{'name' : 'docNetAmt','type' : 'float'},
			{'name' : 'orderAdvance','type' : 'float'},
			{'name' : 'giftVoucher','type' : 'float'},
			{'name' : 'adjAmt','type' : 'float'},
			{'name' : 'cash','type' : 'float'},
			{'name' : 'cheque','type' : 'float'},
			{'name' : 'cards','type' : 'float'},
			{'name' : 'mPayment','type' : 'float'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false,
			 cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Sales Return - Cash Bill Total</div>";
		      	}
		},
		{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '4%',sortable : true,editable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Purchase Return Total :</b></span>';
			}
		},

		{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
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
		{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
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
		{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
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
		{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
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
		{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
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
		{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
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
		{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
		{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
		{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
		{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchRoughCashBookDetail", "SalesReturnCashBill", columns, roughCashBookPvSrCb(), updateRows, "", "#jqxgrid11");
    $("#jqxgrid11").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],

    });
}

var pvCashierTransferGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'createdDate','type' : 'string'},
			{'name' : 'refDocNo','type' : 'string'},
			{'name' : 'CashierId','type' : 'string'},

			{'name' : 'docType','type' : 'string','map':'refDocType'},
			{'name' : 'docGrossAmt','type' : 'float'},
			{'name' : 'discAmt','type' : 'float'},
			{'name' : 'docNetAmt','type' : 'float'},
			{'name' : 'orderAdvance','type' : 'float'},
			{'name' : 'giftVoucher','type' : 'float'},
			{'name' : 'adjAmt','type' : 'float'},
			{'name' : 'cash','type' : 'float'},
			{'name' : 'cheque','type' : 'float'},
			{'name' : 'cards','type' : 'float'},
			{'name' : 'mPayment','type' : 'float'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'createdDate',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Cashier Name','datafield' : 'CashierId',cellsalign : 'center',align : 'center','width' : '8%',sortable : true,editable : false},
		{'text' : 'Doc Type','datafield' : 'docType',cellsalign : 'left',align : 'center','width' : '10%',sortable : true,editable : false,
			/* cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Cashier Transfer Cash Deposit Total</div>";
		      	}*/
		},
		{'text' : 'Doc No','datafield' : 'refDocNo',cellsalign : 'center',align : 'center','width' : '4%',sortable : true,editable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Purchase Return Total :</b></span>';
			}
		},

		{'text' : 'Gross Amount(Incl. all Taxes)','datafield' : 'docGrossAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docGrossAmt'] == null) ? 0 : record['docGrossAmt'];
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
		{'text' : 'Discount/Loyalty Amount','datafield' : 'discAmt',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['discAmt'] == null) ? 0 : record['discAmt'];
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
		{'text' : 'Net Amount(Incl. all Taxes)','datafield' : 'docNetAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['docNetAmt'] == null) ? 0 : record['docNetAmt'];
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
		{'text' : 'Order Advance/ABD/PV/SP Adj.','datafield' : 'orderAdvance',cellsalign : 'right',align : 'center','width' : '10%',sortable : false,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['orderAdvance'] == null) ? 0 : record['orderAdvance'];
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
		{'text' : 'GV (Incl. Benefit Amount)','datafield' : 'giftVoucher',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['giftVoucher'] == null) ? 0 : record['giftVoucher'];
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
		{'text' : 'PB/CSR/PV Adj. Amount','datafield' : 'adjAmt',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['adjAmt'] == null) ? 0 : record['adjAmt'];
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
		{'text' : 'Cash','datafield' : 'cash',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cash'] == null) ? 0 : record['cash'];
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
		{'text' : 'Cheque,TC,DD,PO','datafield' : 'cheque',cellsalign : 'right',align : 'center','width' : '10%',sortable : true,editable : false,cellsformat : 'd2',columngroup : "payMode",
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cheque'] == null) ? 0 : record['cheque'];
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
		{'text' : 'Cards','datafield' : 'cards',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['cards'] == null) ? 0 : record['cards'];
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
		{'text' : 'Mobile Payments','datafield' : 'mPayment',cellsalign : 'right',align : 'center','width' : '8%',sortable : true,editable : false,columngroup : "payMode",cellsformat : 'd2',
			aggregates: [{          
  		  		  'Total': function(aggregatedValue, currentValue, column, record) {
  						  var total = (record['mPayment'] == null) ? 0 : record['mPayment'];
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
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchRoughCashBookDetail", "CashierTransfersCashDeposit", columns, roughCashBookPvCashierTransferDep(), updateRows, "", "#jqxgrid12");
    $("#jqxgrid12").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Payment Modes',
			name : 'payMode',
			align : 'center'
		}],

    });
}

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('roughCashBookDetail', 'bodySwitcher')"
});

var cbCash = 0.00;
var closingBalanceDetails = function(closeData){
	console.log(closeData);
	
	// Cash Sale Bill
	var cbList = closeData.CashSaleBill;
	var cbCash = 0.00;
	var cbChq = 0.00;
	var cbCard = 0.00;
	var cbMPay = 0.00;

	$.each(cbList,function(k,v){
		if(v.cash != null){
			cbCash =  cbCash + v.cash;
		}
		if(v.cheque != null){
			cbChq =  cbChq + v.cheque;
		}
		if(v.cards != null){
			cbCard =  cbCard + v.cards;
		}
		if(v.mPayment != null){
			cbMPay =  cbMPay + v.mPayment;
		}
	});
	
	//Receipt Vpucher - Order Advance
	var rvOrdAdvncList = closeData.ReceiptVouchersOrderAdvance;
	var rvOrdAdvncCash = 0.00;
	var rvOrdAdvncChq = 0.00;
	var rvOrdAdvncCard = 0.00;
	var rvOrdAdvncMpay = 0.00;
	
	$.each(rvOrdAdvncList,function(k,v){
		if(v.cash != null){
			rvOrdAdvncCash =  rvOrdAdvncCash + v.cash;
		}
		if(v.cheque != null){
			rvOrdAdvncChq =  rvOrdAdvncChq + v.cheque;
		}
		if(v.cards != null){
			rvOrdAdvncCard =  rvOrdAdvncCard + v.cards;
		}
		if(v.mPayment != null){
			rvOrdAdvncMpay =  rvOrdAdvncMpay + v.mPayment;
		}
	});
	
	//Receipt Vpucher - Approval Bill Deposit
	var rvAbDeposList = closeData.ReceiptVouchersApprovalBillDeposit;
	var rvAbDeposCash = 0.00;
	var rvAbDeposChq = 0.00;
	var rvAbDeposCard = 0.00;
	var rvAbDeposMPay = 0.00;

	$.each(rvAbDeposList,function(k,v){
		if(v.cash != null){
			rvAbDeposCash =  rvAbDeposCash + v.cash;
		}
		if(v.cheque != null){
			rvAbDeposChq =  rvAbDeposChq + v.cheque;
		}
		if(v.cards != null){
			rvAbDeposCard =  rvAbDeposCard + v.cards;
		}
		if(v.mPayment != null){
			rvAbDeposMPay =  rvAbDeposMPay + v.mPayment;
		}
	});
	
	//Receipt Voucher - Savings Plan
	var rvSpList = closeData.ReceiptVouchersSavingsPlan;
	var rvSpCash = 0.00;
	var rvSpChq = 0.00;
	var rvSpCard = 0.00;
	var rvSpMPay = 0.00;

	$.each(rvSpList,function(k,v){
		if(v.cash != null){
			rvSpCash =  rvSpCash + v.cash;
		}
		if(v.cheque != null){
			rvSpChq =  rvSpChq + v.cheque;
		}
		if(v.cards != null){
			rvSpCard =  rvSpCard + v.cards;
		}
		if(v.mPayment != null){
			rvSpMPay =  rvSpMPay + v.mPayment;
		}
	});
	
	// Purchase Return
	var prList = closeData.PurchaseReturn;
	var prCash = 0.00;
	var prChq = 0.00;
	var prCard = 0.00;
	var prMPay = 0.00;

	$.each(prList,function(k,v){
		if(v.cash != null){
			prCash =  prCash + v.cash;
		}
		if(v.cheque != null){
			prChq =  prChq + v.cheque;
		}
		if(v.cards != null){
			prCard =  prCard + v.cards;
		}
		if(v.mPayment != null){
			prMPay =  prMPay + v.mPayment;
		}
	});
	
	//Pre Paid GV
	var gvList = closeData.ReceiptVouchersPrePaidGiftVouchers;
	var gvCash = 0.00;
	var gvChq = 0.00;
	var gvCard = 0.00;
	var gvMPay = 0.00;

	$.each(gvList,function(k,v){
		if(v.cash != null){
			gvCash =  gvCash + v.cash;
		}
		if(v.cheque != null){
			gvChq =  gvChq + v.cheque;
		}
		if(v.cards != null){
			gvCard =  gvCard + v.cards;
		}
		if(v.mPayment != null){
			gvMPay =  gvMPay + v.mPayment;
		}
	});
	
	//Cashier to Cashier Transfer 
	var CTList = closeData.CashierToCashierTransfer;
	var ctCash = 0.00;
	var ctChq = 0.00;
	var ctCard = 0.00;
	var ctMPay = 0.00;

	$.each(CTList,function(k,v){
		if(v.cash != null){
			ctCash =  ctCash + v.cash;
		}
		if(v.cheque != null){
			ctChq =  ctChq + v.cheque;
		}
		if(v.cards != null){
			ctCard =  ctCard + v.cards;
		}
		if(v.mPayment != null){
			ctMPay =  ctMPay + v.mPayment;
		}
	});
	
	console.log(recptTotal);
	console.log(cbCash);
	console.log(rvOrdAdvncCash);
	console.log(rvAbDeposCash);
	console.log(rvSpCash);
	console.log(prCash);
	
	var receiptTotal = recptTotal + cbCash + rvOrdAdvncCash + rvAbDeposCash + rvSpCash + prCash + gvCash + ctCash ;
	console.log(receiptTotal);
	
	
	// Payments Total
	var srCash = 0.00;
	var srChq = 0.00;
	var srCard = 0.00;
	var srMPay = 0.00;
	
	var paymentsTotal = 0.00;
	var  srList = closeData.SalesReturnCashBill;
	
	$.each(srList,function(k,v){
		if(v.cash != null){
			srCash =  srCash + v.cash;
		}
		if(v.cheque != null){
			srChq =  srChq + v.cheque;
		}
		if(v.cards != null){
			srCard =  srCard + v.cards;
		}
		if(v.mPayment != null){
			srMPay =  srMPay + v.mPayment;
		}
	});
	
	console.log(srCash);

	
	var  pbList = closeData.PurchaseBill;
	
	var pbCash = 0.00;
	var pbChq = 0.00;
	var pbCard = 0.00;
	var pbMPay = 0.00;
	
	$.each(pbList,function(k,v){
		console.log(v);
		if(v.cash != null){
			pbCash =  pbCash + v.cash;
		}
		if(v.cheque != null){
			pbChq =  pbChq + v.cheque;
		}
		if(v.cards != null){
			pbCard =  pbCard + v.cards;
		}
		if(v.mPayment != null){
			pbMPay =  pbMPay + v.mPayment;
		}
	});
	
	console.log(pbCash);

	var  pvOrdAdvRef = closeData.PaymentVoucherOrderAdvanceRefund;
		var pvOrdAdvCash = 0.00;
		var pvOrdAdvChq = 0.00;
		var pvOrdAdvCard = 0.00;
		var pvOrdAdvMPay = 0.00;
	
		$.each(pvOrdAdvRef,function(k,v){
			if(v.cash != null){
				pvOrdAdvCash =  pvOrdAdvCash + v.cash;
			}
			if(v.cheque != null){
				pvOrdAdvChq =  pvOrdAdvChq + v.cheque;
			}
			if(v.cards != null){
				pvOrdAdvCard =  pvOrdAdvCard + v.cards;
			}
			if(v.mPayment != null){
				pvOrdAdvMPay =  pvOrdAdvMPay + v.mPayment;
			}
		});
		
		//console.log(pvOrdAdvCash);
		
	var  pvAbAdvRef = closeData.PaymentVoucherApprovalBillDeposit;
		var pvAbAdvCash = 0.00;
		var pvAbAdvChq = 0.00;
		var pvAbAdvCard = 0.00;
		var pvAbAdvMPay = 0.00;
	
		$.each(pvAbAdvRef,function(k,v){
			if(v.cash != null){
				pvAbAdvCash =  pvAbAdvCash + v.cash;
			}
			if(v.cheque != null){
				pvAbAdvChq =  pvAbAdvChq + v.cheque;
			}
			if(v.cards != null){
				pvAbAdvCard =  pvAbAdvCard + v.cards;
			}
			if(v.mPayment != null){
				pvAbAdvMPay =  pvAbAdvMPay + v.mPayment;
			}
		});
		
		var pvCashDep = closeData.CashierTransfersCashDeposit;
		var cdCash = 0.00;
		var cdChq = 0.00;
		var cdvCard = 0.00;
		var cdMPay = 0.00;
	
		$.each(pvCashDep,function(k,v){
			if(v.cash != null){
				cdCash =  cdCash + v.cash;
			}
			if(v.cheque != null){
				cdChq =  cdChq + v.cheque;
			}
			if(v.cards != null){
				cdvCard =  cdvCard + v.cards;
			}
			if(v.mPayment != null){
				cdMPay =  cdMPay + v.mPayment;
			}
		});
	//	console.log(pvAbAdvCash);
		
	paymentsTotal = pbCash + srCash + pvOrdAdvCash + pvAbAdvCash + cdCash;
	console.log(pbCash);
	console.log(srCash);
	console.log(pvOrdAdvCash);
	console.log(pvAbAdvCash);
	
	/*console.log(closeData.OpeningBalance.openingBalance);
	console.log(cbCash);
	console.log(rvOrdAdvncCash);
	console.log(rvAbDeposCash);
	console.log(rvSpCash);
	console.log(prCash);*/
	
	console.log(cbCash + rvOrdAdvncCash + prCash +rvAbDeposCash + rvSpCash + closeData.OpeningBalance.openingBalance)
	console.log(paymentsTotal);

	var closingCash = (cbCash + rvOrdAdvncCash + prCash +rvAbDeposCash + rvSpCash + closeData.OpeningBalance.openingBalance + gvCash) - paymentsTotal;
	closeBalAsPerTransaction = {"cash": closingCash,"docType":"Summed-Up Closing Balance as per Transaction","mPayment":"-","cheque":"-","cards":"-"};
	var closeBalAsPerSys = {"cash": closeData.ClosingBalanceAsPertheSystem,"docType":"Computed Closing Balance as per System","mPayment":"-","cheque":"-","cards":"-"};
	
	var closeBalAsPerDecl = {"cash": closeData.ClosingBalanceAsPertheCashierDeclaration,"docType":"Declared Closing Balance as per Cashier","mPayment":"-","cheque":"-","cards":"-"};

	var diffBtnTAndS = {"cash":"-","mPayment":"-","cheque":"-","cards":"-","docType":"Difference Between Transaction and System"};
	var diffBtnSAndC = {"cash":"-","mPayment":"-","cheque":"-","cards":"-","docType":"Difference Between System and Cashier's Declaration"};
	var diffBtnCAndT = {"cash":"-","mPayment":"-","cheque":"-","cards":"-","docType":"Difference Between Cashier's Declaration and Transaction"};

	var closeingBalDetails = []; 
	
	closeingBalDetails.push(closeBalAsPerSys);
	closeingBalDetails.push(closeBalAsPerTransaction);
	closeingBalDetails.push(closeBalAsPerDecl);

	closeingBalDetails.push(diffBtnTAndS);
	closeingBalDetails.push(diffBtnSAndC);
	closeingBalDetails.push(diffBtnCAndT);
	
	console.log(closeingBalDetails);
	closingBalDetGrid(closeingBalDetails);
	$("#jqxgridA").show();
}

// Print Functionality
$("#print").on('click',function(){
	var fieldFilters = {
			"fieldFilters" : {
				"FromDate" : $("#fromDate").val(),
				"ToDate" : $("#toDate").val(),
				"storeId" :$("#storeNameS").val() ,
				"mode" : "pdf",
				"reportName" : "RPT_Rough_Cash_Book_Summary_Sales_Segemt_Wise"
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
					navigator.msSaveBlob(file, 'RPT_Rough_Cash_Book_Summary_Sales_Segemt_Wise.pdf');
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