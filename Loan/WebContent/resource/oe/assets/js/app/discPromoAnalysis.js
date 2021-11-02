$("#fromDateS").datepicker({ changeYear:true, changeMonth:true, dateFormat:"dd/mm/yy", maxDate: 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});


$("#toDateS").datepicker({ changeYear:true, changeMonth:true, dateFormat:"dd/mm/yy",maxDate : 0});

var onLoadLOV = function(){
	$.getJSON('/OrderExecution/api/v1/getAnalyseDicountVoucherRedemptionReportLOV',function(response) {
		if(response.resCode == "1"){
			var s = '<select id="storeNameObj"  name="storeNameObj" class="form-control" multiple="multiple">';
			$.each(response.payload.stores, function(key, val) {
				s += '<option value="' + val.id + '">' + val.name + '</option>'; 
			});
				
			s += '</select>';
				
			$("#storeName").html(s);
				
			$("#storeNameObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			$('#discTypeS').empty().append('<option value="" selected>--Select--</option>');
			$.each(response.payload.discountType,	function(k, v) {
				$('#discTypeS').append('<option value="' + v.id + '">' + v.name + '</option>');
			});
			
			var t = '<select id="transcTypeObj"  name="transcTypeObj" class="form-control" multiple="multiple">';
			$.each(response.payload.transTypes, function(key, val) {
				t += '<option value="' + val.id + '">' + val.name + '</option>'; 
			});
				
			t += '</select>';
				
			$("#transcType").html(t);
				
			$("#transcTypeObj").multiselect({
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
	
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var discTypeS = $("#discTypeS").val();

	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	var storeNameObj = $('#storeNameObj').val();
	if (storeNameObj == null || storeNameObj == "") {
		var store = "";
	} else {
		var store = storeNameObj.join(",");
	}
	if (store != "" && store != null) {
		fieldFilters.fieldFilters["store"] = store;
	}
	
	if (discTypeS != "" && discTypeS != null) {
		fieldFilters.fieldFilters[""] = discTypeS;
	}
	
	var transcTypeObj = $('#transcTypeObj').val();
	if (transcTypeObj == null || transcTypeObj == "") {
		var transType = "";
	} else {
		var transType = transcTypeObj.join(",");
	}
	if (transType != "" && transType != null) {
		fieldFilters.fieldFilters["transType"] = transType;
	}
	fieldFilters.fieldFilters["mode"] = "Export";

	return fieldFilters;
}

var searchGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'srlNo','type' : 'int'},
			{'name' : 'storeName','type' : 'string','map' : 'store'},
			{'name' : 'discType','type' : 'string','map':'promoName'}, 
			{'name' : 'transType','type' : 'string','map' : 'transactionType'},
			{'name' : 'segment','type' : 'string','map' : 'segmentDesc'},
			{'name' : 'sbGrossVal','type' : 'float','map' : 'totalSaleGrossWt'},
			{'name' : 'totDisc','type' : 'float','map' : 'totalDiscount'},
			{'name' : 'avgDisc','type' : 'float','map' : ''},
			{'name' : 'dvMultiplier','type' : 'float'},
			{'name' : 'dvWoMultiplier','type' : 'float'},
			
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
			{'text' : 'Srl No','datafield' : 'srlNo','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Store Name','datafield' : 'storeName','width' : '9%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Promotion/COMP GV/Manual Discount','datafield' : 'discType','width' : '17%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Transaction Type','datafield' : 'transType','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Segment','datafield' : 'segment','width' : '12%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Total Sale Bill Gross Value','datafield' : 'sbGrossVal','width' : '15%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'},
			{'text' : 'Total Discount','datafield' : 'totDisc','width' : '9%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'},

			{'text' : 'Average Discount %','datafield' : 'avgDisc','width' : '15%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat:'d2'},
		//	{'text' : 'Total Discount Voucher Multiplier','datafield' : 'dvMultiplier','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2'}, 

			//{'text' : 'Total Discount Voucher Without Multiplier','datafield' : 'dvWoMultiplier','width' : '10%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat:'d2'},
		]
	});
}

$("#search").on('click',function(){
	if($('#fromDateS').val() == "" || $('#toDateS').val() == null || $("#discTypeS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 1000,
			title  : 'Error'
		});
		return false;
	}else{
		postJSON('/OrderExecution/api/v1/getAnalyseDicountVoucherRedemptionReport?discountType='+$("#discTypeS").val(),JSON.stringify(searchFieldFilters()),function(response) {
			if(response.resCode == 1){
				var result = response.payload.list;
				if(response.payload.totalDiscountVoucherWithMultiplier != null){
					$("#dvMultiplier").val(response.payload.totalDiscountVoucherWithMultiplier.toFixed(2));
				}else{
					$("#dvMultiplier").val(0.00);
				}
				
				if(response.payload.totalDiscountVoucherWithOutMultiplier != null){
					$("#dvWoMultiplier").val(response.payload.totalDiscountVoucherWithOutMultiplier.toFixed(2));
				}else{
					$("#dvWoMultiplier").val(0.00);
				}
				var count = 1;
				$.each(result,function(k,v){
					v.srlNo = count;
				
					v.avgDisc = (v.totalDiscount/v.totalSaleGrossWt)*100;
					
					count++;
				});
				
				searchGrid(result);
				$("#jqxgrid").show();
				$("#totSection").show();
			}else{
				searchGrid();
				$("#jqxgrid").show();
				$("#totSection").hide();
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
				postJSON('/OrderExecution/api/v1/getAnalyseDicountVoucherRedemptionReport?discountType='+$("#discTypeS").val(),JSON.stringify(searchFieldFilters()),function(response) {
				if(response.resCode == 1){
			   
					var result = response.payload.list;
					var count = 1;
					$.each(result,function(k,v){
						v.srlNo = count;
						v.dvMultiplier = response.payload.totalDiscountVoucherWithMultiplier;
						v.dvWoMultiplier = response.payload.totalDiscountVoucherWithOutMultiplier;
						v.avgDisc = (v.totalDiscount/v.totalSaleGrossWt)*100;
						count++;
					});
					data = result;
				for (i = 0; i < data.length; i++) {
      	 
				newData.push({
					'Srl No' : (data[i].srlNo != null) ? data[i].srlNo : "",
					'From Date' : $("#fromDateS").val(),
					'To Date' : $("#toDateS").val(),
					'Store Name' : (data[i].store != null) ? data[i].store : "",
					'Promotion/COMP GV/Manual Discount' : (data[i].promoName != null) ? data[i].promoName : "",
					'Transaction Type' : (data[i].transactionType != null) ? data[i].transactionType	: "",
					'Segment' : (data[i].segmentDesc != null) ? data[i].segmentDesc : "",
					'Total Sale Bill Gross Value' : (data[i].totalSaleGrossWt != null) ? data[i].totalSaleGrossWt.toFixed(2) : "",
					'Total Discount' : (data[i].totalDiscount != null) ? data[i].totalDiscount.toFixed(2) : "",
					'Average Discount %' : (data[i].avgDisc != null) ? data[i].avgDisc.toFixed(2) : "",
	            	//'Total Discount Voucher Multiplier' : (data[i].dvMultiplier != null) ? data[i].dvMultiplier.toFixed(2) : "",
	            	//'Total Discount Voucher Without Multiplier' : (data[i].dvWoMultiplier != null) ? data[i].dvWoMultiplier.toFixed(2) : "",
	             });
					
         }
         var opts = [{sheetid:'Discount_or_Promotion_Analysis_Report',header:true}];
         var res = alasql('SELECT * INTO XLSX("Discount_or_Promotion_Analysis_Report_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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
	window.location.href="javascript:showContentPage('discPromoAnalysis', 'bodySwitcher')"
});