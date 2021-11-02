var onLoadLovFunc = function(){
$.getJSON('/OrderExecution/api/v1/IntimationReminderTemplateOnLoadLovs', function(data) {
		var customerList = data.payload.customer_list;
		console.log(customerList);
		
			var data = [];
		$.each(customerList, function(key, value) {
			data.push({
				value : value.id,
				label : value.name
			});
		});

		$(function() {
			$("#custName").autocomplete({

				source : data,
				focus : function(event, ui) {

					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#custName-value").val(ui.item.value);
				}
			});
		});
  });
}

onLoadLovFunc();

$("#Fmonth").on('blur',function(){
	var fromMonth = document.getElementById("Fmonth").value;
	
	var fMon =  fromMonth.split('-') ; 
	var curDate = new Date();
	var curMonth = curDate.getMonth() +1;
	var curYear = curDate.getFullYear();
	
	var fromMonth = fMon[1];
	var fromYear = fMon[0];
	if(fromYear > curYear ){
		$("#Fmonth").val("");
		document.getElementById("Fmonth").innerHtml = "";

		$.growl.error({
			message : "Future Dates Not Allowed !!",
			duration:1000,
			title :'Error'
		});
		return false;
	}else if(fromYear == curYear){
		if(fromMonth > curMonth){
			$("#Fmonth").val("");

			$.growl.error({
				message : "Please Select Valid From Month/Year !!",
				duration:1000,
				title :'Error'
			});
			return false;
		}
	}
});

$("#Tmonth").on('blur',function(){
	var fromMonth = document.getElementById("Fmonth").value;
	var toMonth = document.getElementById("Tmonth").value;
	
	var fMon =  fromMonth.split('-') ; 
	var tMon =  toMonth.split('-') ; 
	
	var curDate = new Date();
	var curMonth = curDate.getMonth() +1;
	var curYear = curDate.getFullYear();
	
	var fromMonth = fMon[1];
	var fromYear = fMon[0];
	
	var toMonth = tMon[1];
	var toYear = tMon[0];
	
	if(toYear > curYear ){
		$("#Tmonth").val("");
		document.getElementById("Tmonth").innerHtml = "";

		$.growl.error({
			message : "Future Dates Not Allowed !!",
			duration:1000,
			title :'Error'
		});
		return false;
	}
	else if(toYear < fromYear){
		$("#Tmonth").val("");

		$.growl.error({
			message : "Please Select Valid To Month/Year !!",
			duration:1000,
			title :'Error'
		});
		return false;
	}else if(/*toYear == curYear ||*/ toYear == fromYear){
		if(toMonth < fromMonth){
			$("#Tmonth").val("");

			$.growl.error({
				message : "Please Select Valid To Month/Year !!",
				duration:1000,
				title :'Error'
			});
			return false;
		}
	}
});


// Search Section
var loyaltyStatementFieldFilters = function() {

	var Fmonth = $('#Fmonth').val();
	var Tmonth = $('#Tmonth').val();
	var cardNoC = $('#cardNoC').val();
	var custId = $('#custName-value').val();
	
	var fromMonth = document.getElementById("Fmonth").value;
	var toMonth = document.getElementById("Tmonth").value;
	
	var fMon =  fromMonth.split('-') ; 
	var tMon =  toMonth.split('-') ;
	
	var FrmMonth = 1 + "/" + fMon[1] + "/" + fMon[0];
	var toDate;
	console.log(tMon[1]);
	if(tMon[1] == 1 || tMon[1] == 3 || tMon[1] == 5 || tMon[1] == 7 || tMon[1] == 8 ||tMon[1] ==  10 || tMon[1] == 12 ){
		toDate = 31;
	}else if(tMon[1] == 2){
		  if((tMon[0] % 4 == 0 && tMon[0] % 100 != 0) || (tMon[0] % 400 == 0))	{
				toDate = 29;
		  }else{
				toDate = 28;
		  }
	}else{
		toDate = 30;
	}
	
	var toMonth = toDate + "/" + tMon[1] + "/" + tMon[0];
	
	var Fmonth = toDate + "/" + tMon[1] + "/" + tMon[0];

	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (Fmonth != "" && Fmonth != null) {
		fieldFilters.fieldFilters["fromDate"] = FrmMonth;
	}
	if (Tmonth != "" && Tmonth != null) {
		fieldFilters.fieldFilters["toDate"] = toMonth;
	}
	if (cardNoC != "" && cardNoC != null) {
		fieldFilters.fieldFilters["loyalCardNo.loyaltyCardNumber"] = cardNoC;
	}
	if (custId != "" && custId != null) {
		fieldFilters.fieldFilters["customerId.id"] = custId;
	}
	
	return fieldFilters;
}


var loyaltySearchGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'srlNo','type' : 'int','map' : 'serialNo'},
				{'name' : 'custName','type' : 'string','map' : 'customerName'},
				{'name' : 'cardNo','type' : 'int','map' : 'customerCardNo'},
				{'name' : 'tierName','type' : 'string','map' : 'loyaltyTierName'},
				{'name' : 'createdDate','type' : 'string','map' : 'createdDate'}, 
				{'name' : 'metalType','type' : 'string','map' : 'metalType'},
				{'name' : 'docType','type' : 'string','map' : 'docType'},
				{'name' : 'docNo','type' : 'int','map' : 'docNo'},
				{'name' : 'docsrlNo','type' : 'int','map' : 'docSrlNo'},
				{'name' : 'pointType','type' : 'string','map' : 'loyaltyPointType'},
				{'name' : 'pointEarned','type' : 'int','map' : 'loyaltyPointsEarned'},
				{'name' : 'pointRedeem','type' : 'int','map' : 'loyaltyPointsRedeemed'},
				{'name' : 'pointExpired','type' : 'int','map' : 'loyaltyPointsExpired'},
				{'name' : 'pointRemaining','type' : 'int','map' : 'loyaltyPointsRemaining'},
				{'name' : 'lpExpDate','type' : 'string','map' : 'loyaltyPointsExpiryDate'},
				{'name' : 'openinBal','type' : 'float','map' : 'openinBal'},
				{'name' : 'closingBal','type' : 'float','map' : 'closingBal'},
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
		theme: 'energyblue',
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		columns : [
			{'text' : 'Srl No','datafield' : 'srlNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'Customer Name','datafield' : 'custName','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Loyalty Card Number','datafield' : 'cardNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Tier Name','datafield' : 'tierName','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Created Date ','datafield' : 'createdDate','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,cellsformat : 'dd/MM/yyyy'},
			{'text' : 'Metal Type','datafield' : 'metalType','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Doc Type','datafield' : 'docType','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Doc No','datafield' : 'docNo','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'Doc Srl No','datafield' : 'docsrlNo','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'Point Type','datafield' : 'pointType','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Point Earned','datafield' : 'pointEarned','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Point Redeem/Sales Return Point','datafield' : 'pointRedeem','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Point Expired','datafield' : 'pointExpired','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Point Remaining','datafield' : 'pointRemaining','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Loyalty Point Expiry Date','datafield' : 'lpExpDate','width' : '12%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'}, 
			{'text' : 'Opening Balance','datafield' : 'openinBal','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'}, 
			{'text' : 'Closing Balance','datafield' : 'closingBal','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'},
		]
	});
}

$("#search").on("click",function(){
	if($("#Fmonth").val() == "" || $("#Tmonth").val() == "" ){
		$.growl.error({
			message : "Please fill mandatory field.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		postJSON('/OrderExecution/api/v1/searchLoyaltyPointsPendingRedeemedExpired?page=export',JSON.stringify(loyaltyStatementFieldFilters()),function(data) {
			if(data.resCode == "1"){
				loyaltySearchGrid(data.payload.list);
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

/*//Search Grid Started
function loyaltySearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'srlNo','type' : 'int','map' : 'serialNo'},
		{'name' : 'custName','type' : 'string','map' : 'customerName'},
		{'name' : 'cardNo','type' : 'int','map' : 'customerCardNo'},
		{'name' : 'tierName','type' : 'string','map' : 'loyaltyTierName'},
		{'name' : 'createdDate','type' : 'string','map' : 'createdDate'}, 
		{'name' : 'metalType','type' : 'string','map' : 'metalType'},
		{'name' : 'docType','type' : 'string','map' : 'docType'},
		{'name' : 'docNo','type' : 'int','map' : 'docNo'},
		{'name' : 'docsrlNo','type' : 'int','map' : 'docSrlNo'},
		{'name' : 'pointType','type' : 'string','map' : 'loyaltyPointType'},
		{'name' : 'pointEarned','type' : 'int','map' : 'loyaltyPointsPending'},
		{'name' : 'pointRedeem','type' : 'int','map' : 'loyaltyPointsRedeemed'},
		{'name' : 'pointExpired','type' : 'int','map' : 'loyaltyPointsExpired'},
		{'name' : 'pointRemaining','type' : 'int','map' : 'loyaltyPointsRemaining'},
		{'name' : 'lpExpDate','type' : 'string','map' : 'loyaltyPointsExpiryDate'},
		{'name' : 'openinBal','type' : 'float','map' : 'openinBal'},
		{'name' : 'closingBal','type' : 'float','map' : 'closingBal'},
, 
      ];

	var columns = [
		{'text' : 'Srl No','datafield' : 'srlNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Customer Name','datafield' : 'custName','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Loyalty Card Number','datafield' : 'cardNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Tier Name','datafield' : 'tierName','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Created Date ','datafield' : 'createdDate','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Metal Type','datafield' : 'metalType','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Doc Type','datafield' : 'docType','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Doc No','datafield' : 'docNo','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Doc Srl No','datafield' : 'docsrlNo','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Point Type','datafield' : 'pointType','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Point Earned','datafield' : 'pointEarned','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Point Redeem/Sales Return Point','datafield' : 'pointRedeem','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Point Expired','datafield' : 'pointExpired','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Point Remaining','datafield' : 'pointRemaining','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Loyalty Point Expiry Date','datafield' : 'lpExpDate','width' : '12%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'}, 
		{'text' : 'Opening Balance','datafield' : 'openinBal','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'}, 
		{'text' : 'Closing Balance','datafield' : 'closingBal','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'}, 

		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchLoyaltyPointsPendingRedeemedExpired?page=export","list", columns,loyaltyStatementFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
		columnsheight: 80,
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
	});
}

$("#search").on('click',function(){
	if($("#Fmonth").val() == "" || $("#Tmonth").val() == "" ){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 1000,
			title :'Error'
		});
		return false;
	}else{
		loyaltySearchGrid();
		$("#jqxgrid").show();
	}
});*/

//Export function for Customer Order Due
$("#export").on("click",function() {
	var data;
	var newData = [];
	var fieldFilters = loyaltyStatementFieldFilters();
     var sysdate = moment().format('DDMMYYYYHHmmSS');
	 var rows = $("#jqxgrid").jqxGrid('getrows');
	 if(typeof rows == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
		}else{	
			//fieldFilters.fieldFilters.mode = "export";
			
			var rows = $("#jqxgrid").jqxGrid('getdatainformation');
			if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/searchLoyaltyPointsPendingRedeemedExpired?page=export',JSON.stringify(fieldFilters),function(response) {
		   if(response != null){
           data = response.payload.list;
           for (i = 0; i < data.length; i++) {

        	   newData.push({
				'Srl No' : (data[i].serialNo != null) ? data[i].serialNo : "",
				'Customer Name' : (data[i].customerName!= null) ? data[i].customerName  : "",
				'Loyalty Card No' : data[i].customerCardNo,
				'Tier Name' : (data[i].loyaltyTierName != null) ? data[i].loyaltyTierName : "",
				'Created Date' : (data[i].createdDate != null) ? data[i].createdDate : "",
				'Metal Type' : (data[i].metalType != null) ? data[i].metalType : "",
				'Doc Type' : (data[i].docType != null) ? data[i].docType	: "",
				'Doc No' : (data[i].docNo != null) ? data[i].docNo : "",
				'Doc Srl No' : (data[i].docSrlNo != null) ? data[i].docSrlNo : "",
				'Point Type' : (data[i].loyaltyPointType != null) ? data[i].loyaltyPointType : "",
                'Points Earned' : (data[i].loyaltyPointsEarned != null) ? data[i].loyaltyPointsEarned : "",
				'Points Redeem/Sales Return Point' : (data[i].loyaltyPointsRedeemed != null) ? data[i].loyaltyPointsRedeemed : "",
                'Points Expired' : (data[i].loyaltyPointsExpired != null) ? data[i].loyaltyPointsExpired : "",
				'Points Remaining' : (data[i].loyaltyPointsRemaining != null) ? data[i].loyaltyPointsRemaining : "",
				'Loyalty Points Expiry Date' : (data[i].loyaltyPointsExpiryDate != null) ? data[i].loyaltyPointsExpiryDate : "",
				'Opening Balance' : (data[i].openinBal != null) ? data[i].openinBal : "",
				'Closing Balance' : (data[i].closingBal != null) ? data[i].closingBal : "",
               });
					
           }
           var opts = [{sheetid:'Customer_Loyalty_Points',header:true}];
           var res = alasql('SELECT * INTO XLSX("Customer Loyalty Points_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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
	window.location.href="javascript:showContentPage('custLoyaltyPoint', 'bodySwitcher')"
});