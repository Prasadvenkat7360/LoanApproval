var rankingList = [{"id":"LoyaltyPoint","name":"Loyalty Point"},{"id":"TransactionValue","name":"Transaction Value"}];

var durationList = [{"id":3,"name":"Quarterly"},
	{"id":6,"name":"Half Yearly"},
	{"id":12,"name":"Yearly"}]

$('#rankingType').empty().append('<option value="" selected>--Select--</option>');
	$.each(rankingList, function(key, val) {
		$('#rankingType').append('<option value="' + val.id + '">' + val.name + '</option>');
	});

$('#durationTypeS').empty().append('<option value="" selected>--Select--</option>');
	$.each(durationList, function(key, val) {
		$('#durationTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	});

$("#durationTypeS").on('change',function(){
	$("#fromMonthYear").val("");
	$("#toMonthYear").val("");
});


//date picker functions
$("#fromMonthYear").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : new Date(),
});

var searchFieldFilters = function() {
	var rankingType = $('#rankingType').val();
	var durationTypeS = $('#durationTypeS').val();
	var fromMonthYear = $('#fromMonthYear').val();
	var toMonthYear = $('#toMonthYear').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (rankingType != "" && rankingType != null) {
		fieldFilters.fieldFilters["rankingType"] = rankingType;
	}
	/*if (durationTypeS != "" && durationTypeS != null) {
		fieldFilters.fieldFilters[""] = durationTypeS;
	}*/
	if (fromMonthYear != "" && fromMonthYear != null) {
		fieldFilters.fieldFilters["fromDate"] = fromMonthYear;
	}
	if (toMonthYear != "" && toMonthYear != null) {
		fieldFilters.fieldFilters["toDate"] = toMonthYear;
	}
	return fieldFilters;
}

//Search grid started
function rankingSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'ranking','type' : 'long','map' : 'priority'}, 
		{'name' : 'custName','type' : 'string','map' : 'customerName'},
		{'name' : 'cardNumb','type' : 'long','map' : 'customerCardNo'},
		{'name' : 'totalLp','type' : 'long','map' : 'loyaltyPointsEarned'},
		
		{'name' : 'totalGoldPurchase','type' : 'float','map' : 'totalGoldWtPurchased'},
		{'name' : 'totalSilverPurchase','type' : 'float','map' : 'totalSilverWtPurchased'},
		{'name' : 'totalPlatinumPurchase','type' : 'float','map' : 'totalPlatinumWtPurchased'},
		{'name' : 'totalDiamondPurchase','type' : 'float','map' : 'totalDiamondWtPurchased'},

		{'name' : 'totalSellingVal','type' : 'float','map' : 'totalSellingValue'},
		{'name' : 'totalDiscount','type' : 'float','map' : 'totalDiscount'},
		{'name' : 'loyaltyTier','type' : 'string','map' : 'loyaltyTierName'},
	];

	var columns = [
		{'text' : 'Customer Ranking','datafield' : 'ranking','width' : '6%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Customer Name','datafield' : 'custName','width' : '10%',cellsalign : 'left',align : 'center',editable : false,sortable : false},
		{'text' : 'Customer Card Number','datafield' : 'cardNumb','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Total Loyalty Point Earned','datafield' : 'totalLp','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Total Gold Segment Purchase','datafield' : 'totalGoldPurchase','width' : '12%',editable : false,cellsalign : 'right',align : 'center',sortable : false,cellsformat:'d3'},
		{'text' : 'Total Silver Segment Purchase','datafield' : 'totalSilverPurchase','width' : '12%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat:'d3'},
		{'text' : 'Total Platinum Segment Purchase','datafield' : 'totalPlatinumPurchase','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3'},
		{'text' : 'Total Diamond Segment Purchase','datafield' : 'totalDiamondPurchase','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3'},
		
		{'text' : 'Total Selling Value','datafield' : 'totalSellingVal','width' : '10%',editable : false,cellsalign : 'right',align : 'center',sortable : false,cellsformat:'d2'},
		{'text' : 'Total Discount','datafield' : 'totalDiscount','width' : '10%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat:'d2'},
		{'text' : 'Loyalty Tier','datafield' : 'loyaltyTier','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
	];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchLoyaltyCustomerRanking", "list",columns, searchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 80,
		rowdetails : true,
		virtualmode : true,
		//showaggregates: true,
		//showstatusbar: true,
	});
}

$("#search").on('click',function(){
	if($("#rankingType").val() == "" || $("#durationTypeS").val() == "" || $("#fromMonthYear").val() == "" || $("#toMonthYear").val() == ""){
		$.growl.error({
			message : "Please Select Mandatory Fields !!",
			duration : 10000,
			title : 'error'
		});
		return false;
	}else{
		rankingSearchGrid();
		$("#jqxgrid").show();
	}
});

$("#fromMonthYear").on('change',function(){
	var duration = $("#durationTypeS").val();
	var currDate = new Date();
	var sysDate = new Date();
	
	var fromDate = $("#fromMonthYear").val();
	if($("#durationTypeS").val() == ""){
   	 $("#fromMonthYear").val("");
		$.growl.error({
			message : "Please Select Durataion Type !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		currDate.setMonth(currDate.getMonth() - duration);
		var newDate = currDate.toLocaleDateString();
		var dateVal =  newDate.split("/");
		var newDateValue = dateVal[1] + "/" + dateVal[0] + "/" + dateVal[2];

		var sysDateVal = fromDate.split("/");
		
		var dateOne = new Date(dateVal[2], dateVal[0], dateVal[1] ); //Year, Month, Date (date btwn)   
        var dateTwo = new Date(sysDateVal[2], sysDateVal[1], sysDateVal[0]); //Year, Month, Date  (selected date)  
        if (dateOne >= dateTwo) {    
                getToMonthYear(new Date(sysDateVal[2], sysDateVal[1], sysDateVal[0]),duration);
         }else {  
        	 $("#fromMonthYear").val("");
             $.growl.error({
            	message : "Please Select Date less than " + newDateValue ,
            	duration : 10000,
            	title :'Error'
             });  
             return false;
         }
	}
	
});

function getToMonthYear(date, months) {
    var d = date.getDate();
    var oldDate = date.getMonth();
    var newMonth = oldDate + parseInt(months);
    if($("#durationTypeS option:selected").text() == "Quarterly" || $("#durationTypeS option:selected").text() == "Half Yearly" ||$("#durationTypeS option:selected").text() == "Yearly" ){
        date.setMonth(newMonth - 1);
    }
    console.log(date.getMonth());
    
    var monthN = date.getMonth() + 1;
   /* if(date.getMonth() == 0){
    	monthN = 
    }else{
    	monthN = date.getMonth() + 1;
    }*/
   var toDate =  date.getDate() + "/" + monthN + "/" + date.getFullYear();
   console.log(toDate);
   $("#toMonthYear").val(toDate);
   
}


//Export function for Customer Order Due
$("#export").on("click",function() {
	var data;
	var newData = [];
	var fieldFilters = searchFieldFilters();
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
			postJSON('/OrderExecution/api/v1/searchLoyaltyCustomerRanking',JSON.stringify(fieldFilters),function(response) {
		   if(response != null){
           data = response.payload.list;
           for (i = 0; i < data.length; i++) {
        	   
			newData.push({
				'Customer Ranking' : (data[i].priority != null) ? data[i].priority : "",
				'Customer Name' : (data[i].customerName!= null) ? data[i].customerName  : "",
				'Customer Card Number' : (data[i].customerCardNo != null)  ? data[i].customerCardNo : "",
				'Total Loyalty Point Earned' : (data[i].loyaltyPointsEarned != null) ? data[i].loyaltyPointsEarned : "",
				'Total Gold Segment Purchase' : (data[i].totalGoldWtPurchased != null) ? data[i].totalGoldWtPurchased.toFixed(3) : "",
				'Total Silver Segment Purcahse' : (data[i].totalSilverWtPurchased != null) ? data[i].totalSilverWtPurchased.toFixed(3) : "",
				'Total Platinum Segment Purchase' : (data[i].totalPlatinumWtPurchased != null) ? data[i].totalPlatinumWtPurchased.toFixed(3)	: "",
				'Total Diamond Segment Purchase' : (data[i].totalDiamondWtPurchased != null) ? data[i].totalDiamondWtPurchased.toFixed(3) : "",
				'Total Selling Value' : (data[i].totalSellingValue != null) ? data[i].totalSellingValue.toFixed(2) : "",
				'Total Discount' : (data[i].totalDiscount != null) ? data[i].totalDiscount.toFixed(2) : "",
                'Loyalty Tier' : (data[i].loyaltyTierName != null) ? data[i].loyaltyTierName : "",
               });
           }
           var opts = [{sheetid:'Loyalty_Customer_Ranking',header:true}];
           var res = alasql('SELECT * INTO XLSX("Loyalty Customer Ranking_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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
	window.location.href="javascript:showContentPage('loyaltyCustomerRanking', 'bodySwitcher')"
});