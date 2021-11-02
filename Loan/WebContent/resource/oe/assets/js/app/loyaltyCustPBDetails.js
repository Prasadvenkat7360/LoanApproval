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
	dateFormat: "dd/mm/yy",
	maxDate : 0
});


var onLoadLOV = function(){
	$.getJSON('/OrderExecution/api/v1/loyalCustomerSegWisePurchaseWtReportLOVs',function(response) {
		if(response.resCode == "1"){
			
			$('#tier').empty().append('<option value="" selected>--Select--</option>');
				$.each(response.payload.allTiers, function(key, val) {
			$('#tier').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
				
			var l = '<select id="storeDcNameSObj"  name="storeDcNameSObj" class="form-control" multiple="multiple">';
			$.each(response.payload.allStores, function(key, val) {
				l += '<option value="' + val.id + '">' + val.name + '</option>'; 
			});
				
			l += '</select>';
				
			$("#storeDcNameS").html(l);
				
			$("#storeDcNameSObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
}

onLoadLOV();

//Field Filters
var searchFieldFilters = function() {
	var fromDate = $('#fromDateS').val();
	var toDate = $('#toDateS').val();
	var tier = $('#tier').val();
	var custName = $('#custName').val();
	var cardNumb = $('#cardNumb').val();

	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (custName != "" && custName != null) {
		fieldFilters.fieldFilters["customerId"] = custName;
	}
	
	if (tier != "" && tier != null) {
		fieldFilters.fieldFilters["tierId"] = tier;
	}
	
	if (cardNumb != "" && cardNumb != null) {
		fieldFilters.fieldFilters["loyalCardNo"] = cardNumb;
	}
	
	var storeDcNameObj = $('#storeDcNameSObj').val();
	if (storeDcNameObj == null || storeDcNameObj == "") {
		var storeDcName = "";
	} else {
		var storeDcName = storeDcNameObj.join(",");
	}
	if (storeDcName != "" && storeDcName != null) {
		fieldFilters.fieldFilters["storeId"] = storeDcName;
	}

	fieldFilters.fieldFilters["mode"] = "Export";
	
	return fieldFilters;
}


var searchGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'storeDcName','type' : 'string','map':'storeName'},
			{'name' : 'custName','type' : 'string','map' : 'customerFullName'},
			{'name' : 'cardNo','type' : 'string','map':'loyalCardNo'}, 
			{'name' : 'loyaltyTier','type' : 'string','map' : 'loyalTierId'},
			{'name' : 'segment','type' : 'string','map' : 'segmentDesc'},
			{'name' : 'metalWt','type' : 'float','map' : 'metalWt'},
			{'name' : 'diaWeight','type' : 'float','map' : 'diamondWt'},
			{'name' : 'discount','type' : 'float','map' : 'discount'},
			{'name' : 'value','type' : 'float','map':'value'},
			{'name' : 'referral','type' : 'string','map':'isReferral'}, 
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		pageable : true,
		//showtoolbar : true,
		columns : [
			{'text' : 'Store Name','datafield' : 'storeDcName','width' : '12%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Customer Name','datafield' : 'custName','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Loyalty Card Number','datafield' : 'cardNo','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Loyalty Tier','datafield' : 'loyaltyTier','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Metal Weight','datafield' : 'metalWt','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d3'},
			{'text' : 'Diamond Weight','datafield' : 'diaWeight','width' : '10%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat:'d3'},
			{'text' : 'Discount','datafield' : 'discount','width' : '10%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat:'d2'},
			{'text' : 'Value','datafield' : 'value','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'},
			{'text' : 'Refferal','datafield' : 'referral','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		]
	});
}

$("#cardNumb").on('blur',function(){
	var cardNumb = $('#cardNumb').val();
	var regcardNumb = /[0-9]+$/;

	if(!(regcardNumb.test(cardNumb)) && cardNumb != ""){
		$("#cardNumb").val("");
		$.growl.error({
			message :"Please Enter Valid Card No !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	} else {
	  
	}
});


$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 1000,
			title  : 'Error'
		});
		return false;
	}else{
		postJSON('/OrderExecution/api/v1/getLoyalCustomerSegWisePurchaseWtReport',JSON.stringify(searchFieldFilters()),function(response) {
			if(response.resCode == 1){
				searchGrid(response.payload.list);
				$("#jqxgrid").show();
			}else{
				$.growl.error({
					message : response.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});

//Export function 	
$("#export").on("click",function() {
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
		}else{	
			
			var rows = $("#jqxgrid").jqxGrid('getdatainformation');
			if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/getLoyalCustomerSegWisePurchaseWtReport',JSON.stringify(searchFieldFilters()),function(response) {
		   if(response != null){
           data = response.payload.list;
           for (i = 0; i < data.length; i++) {
        	 
			newData.push({
				'Store Name' : (data[i].storeName != null) ? data[i].storeName : "",
				'Customer Name' : (data[i].customerFullName!= null) ? data[i].customerFullName  : "",
				'Loyalty Card Number' : (data[i].loyalCardNo != null) ? data[i].loyalCardNo : "",
				'Loyalty Tier' : (data[i].loyalTierId != null) ? data[i].loyalTierId : "",
				'Segment' : (data[i].segmentDesc != null) ? data[i].segmentDesc : "",
				'Metal Weight' : (data[i].metalWt != null) ? data[i].metalWt.toFixed(3)	: "",
				'Diamond Weight' : (data[i].diamondWt != null) ? data[i].diamondWt.toFixed(3) : "",
				'Discount' : (data[i].discount != null) ? data[i].discount.toFixed(2) : "",
				'Value' : (data[i].value != null) ? data[i].value.toFixed(2) : "",
                'Refferal' : (data[i].isReferral != null) ? data[i].isReferral : "",
               });
					
           }
           var opts = [{sheetid:'Loyalty_Customer_Purchase_Details',header:true}];
           var res = alasql('SELECT * INTO XLSX("Loyalty Customer Purchase Details_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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
	window.location.href="javascript:showContentPage('loyaltyCustPBDetails', 'bodySwitcher')"
});