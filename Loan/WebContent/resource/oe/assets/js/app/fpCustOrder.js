/*
	##	Author UI 		    : 	Pooja Sangve
	## 	Author JAVA 	    :   Manoranjan
	##	Date of Creation 	: 	06-10-2017
	## 	Description		    :	Fully/Partially Customer -Search ,Export and Print Functionality
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

var redirect = function() {
	window.location.href = "javascript:showContentPage('fpCustOrder', 'bodySwitcher')";
	return window.location.href;
}

var onLoadFpCustOrd = function() {
	$('#region').empty().append('<option value="" selected>--Select--</option>');

	$.getJSON('/OrderExecution/api/v1/fullyPartialLOV ', function(data) {
		var segment = data.payload.metalSegment;
		var orderKind = data.payload.orderKind;
		var store = data.payload.store;
		
		var s = '<select id="segmentObj"  name="segmentObj" class="form-control" multiple="multiple">';   
		$.each(segment, function(key, val) {
			s +='<option value="' + val.id + '">' + val.description + '</option>';
		});
		s +='</select>'; 
		$("#articleSegment").html(s);
		$('#segmentObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
		
		var order = '<select id="orderKindObj"  name="orderKindObj" class="form-control" multiple="multiple">';   
		$.each(orderKind, function(key, val) {
			order +='<option value="' + val.id + '">' + val.name + '</option>';
		});
		order +='</select>'; 
		$("#orderKind").html(order);
		$('#orderKindObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
		
		var storeS = '<select id="storeNameObj"  name="storeNameObj" class="form-control" multiple="multiple">';   
		$.each(store, function(key, val) {
			storeS +='<option value="' + val.id + '">' + val.name + '</option>';
		});
		storeS +='</select>'; 
		$("#storeName").html(storeS);
		$('#storeNameObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
		
	});
}
onLoadFpCustOrd();
$(".modal").on("hidden.bs.modal", function(){
	$('#page-content').removeData();
    $('.pagination').twbsPagination('destroy');
	$('.modal-backdrop').remove();
});

var viewDesignDetails = function(viewDesignList, viewDesignSize){
	
	$('#pagination-demo').twbsPagination({
	    totalPages: viewDesignSize,
	    visiblePages: "5",
	    onPageClick: function (event, page) {
	    		$.each(viewDesignList, function(k, v){
	    			if((page-1) == k){
	    				console.log(v);
	    				var img =  "<a href='/uf/"+v.name+"' target='_blank'><img src='/uf/"+v.name+"' height='60%' width ='60%' /></a>";
	    				$('#page-content').html(img);
	    			}
	    		});
	    }
	});
		
}

//############################################## Search grid function. #####################################
var fpFieldFilters = function() {
	var storeNameObj = $("#storeNameObj").val();
	var orderKindObj = $("#orderKindObj").val();
	var segmentObj = $('#segmentObj').val();
	
	if (storeNameObj == null || storeNameObj == ""){
		var storeName = "";
	}else{
		var storeName = storeNameObj.join(",");
	}
	if (orderKindObj == null || orderKindObj == ""){
		var orderKind = "";
	}else{
		var orderKind = orderKindObj.join(",");
	}
	if (segmentObj == null || segmentObj == ""){
		var articleSegment = "";
	}else{
		var articleSegment = segmentObj.join(",");
	}
	fieldFilters = {
			"fieldFilters" : {}
		};
	
	if (storeName != "" && storeName != null) {
		fieldFilters.fieldFilters["storeId"] = storeName;
	}
	
	if (articleSegment != "" && articleSegment != null) {
		fieldFilters.fieldFilters["segments"] = articleSegment;
	}
	
	if (orderKind != "" && orderKind != null) {
		fieldFilters.fieldFilters["orderkinds"] = orderKind;
	}
	
	return fieldFilters;
}

var viewDesignDetailsFunc = function(row){
	var orderItemId = $('#jqxgrid').jqxGrid('getcellvalue', row, 'orderItemId');
	
	var params = {"fieldFilters":{"orderItemId":orderItemId}};
	var viewDesignList = [];	
	postJSON('/OrderExecution/api/v1/fpReportImage', JSON.stringify(params), function(data) {
			if(data.resCode == 1 && typeof data != "undefined"){
				
				 viewDesignList = data.payload.images;
				 viewDesignSize = data.payload.size;
				 viewDesignDetails(viewDesignList,viewDesignSize);
				 $("#designViewFPOrder").modal('show');
			}else{
				$("#designViewFPOrder").modal('hide');
				$.growl.error({ message: "No Image Available", duration: 5000, title: 'Error' });
				return false;
			}
	});
}

var viewDesignEditable = function(row, column, value){
	var designId = $("#jqxgrid").jqxGrid('getcellvalue', row, 'designId');
	if(designId == null || designId == "")
	{
		return false;
	}
	else{
		return true;
	}
}

var fpSearchGride = function(){

	var updateRows = function(rowid, newdata, commit) {
	}
	
	// Edit view design
	var orderItemDesignRenderer = function(row, column, value) {
		var designId = $("#jqxgrid").jqxGrid('getcellvalue', row, 'designId');
		if(designId == null || designId == "")
		{
			return '<div class="text-center"><a class="btn btn-sm btn-primary" disabled type="button" /><span class="fa fa-eye"></span> </a></div>';	
		}else{
			return '<div class="text-center"><a class="btn btn-sm btn-primary" type="button" onclick="viewDesignDetailsFunc(' +row + ')"/><span class="fa fa-eye"></span> </a></div>';	
		}
				
	}

	
	var datafields = [
		{'name' : 'storeNo','type' : 'string','map':'storeName'},
		{'name' : 'segment','type' : 'string','map':'segmentDescription'},
		{'name' : 'orderNo','type' : 'int','map':'orderid'}, 
		{'name' : 'orderSlNo','type' : 'int','map':'orderItemSrlNo'},
		{'name' : 'date','type' : 'date','map':'orderDate'},
		{'name' : 'orderKind','type' : 'string','map':'orderKind'}, 

        {'name' : 'stockNo','type' : 'string','map':'stockItemId'},
		{'name' : 'vendorCode','type' : 'string','map':'vendorCode'},
		{'name' : 'jewelCode','type' : 'string','map':'jewelCode'}, 
		{'name' : 'pcs','type' : 'string','map':'pices'}, 
		{'name' : 'grWt','type' : 'float','map':'finishedgrossWt'}, 

		{'name' : 'netWt','type' : 'float','map':'finishedNtWt'}, 
		{'name' : 'sellingWastage','type' : 'float','map':'selling_wastage_wts'},
		{'name' : 'sellingMcTtlSelling','type' : 'float','map':'sellingtotalCost'},
		{'name' : 'orderDueDate','type' : 'date','map':'orderDuedate'}, 
		{'name' : 'orderStatusDate','type' : 'date','map':'orderStatusDate'},

		{'name' : 'itemStatus','type' : 'string','map':'orderItemStatus'},
        {'name' : 'creditToAcc','type' : 'string','map':'creditToAccount'}, 
		{'name' : 'advanceInRs','type' : 'int','map':'orderAdvance'},
		{'name' : 'orderDateGoldRate','type' : 'float','map':'sellingRate'},
		{'name' : 'orderRaisedBy','type' : 'string','map':'empName'}, 
		{'name' : 'orderItemId', 'type' : 'string'},
		{'name' : 'designId', 'type' : 'long'}
		];

	var columns = [
		{'text' : 'Store/DC Name','datafield' : 'storeNo','width' : '6%',cellsalign : 'center',	align : 'center',sortable : true,editable : false},
		{'text' : 'Seg','datafield' : 'segment','width' : '5%',sortable : true,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Order No','datafield' : 'orderNo','width' : '4%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Order Sl No','datafield' : 'orderSlNo','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},

		{'text' : 'Order Date','datafield' : 'date','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Order Kind','datafield' : 'orderKind','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stock No','datafield' : 'stockNo','width' : '3%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		
		{'text' : 'Jewel Code','datafield' : 'jewelCode','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Gr. Wt.','datafield' : 'grWt','width' : '4.5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
		{'text' : 'Nt. Wt.','datafield' : 'netWt','width' : '4.5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Selling Wastage','datafield' : 'sellingWastage','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd3'},
		
		{'text' : 'Selling MC/Total Selling','datafield' : 'sellingMcTtlSelling','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat:'d2'},
		{'text' : 'Order Due Date','datafield' : 'orderDueDate','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Order Status Date','datafield' : 'orderStatusDate','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Item Status','datafield' : 'itemStatus','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		
		{'text' : 'Credit To Account','datafield' : 'creditToAcc','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Advance in Rs.','datafield' : 'advanceInRs','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'Order Date Gold Rate','datafield' : 'orderDateGoldRate','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat:'d2'},
		{'text' : 'View Design','datafield' : 'orderItemId','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellbeginedit : viewDesignEditable, cellsrenderer: orderItemDesignRenderer},
		{'text' : 'Order Raised By','datafield' : 'orderRaisedBy','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Order Raised By','datafield' : 'designId','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false, hidden: true},
		];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchFullyPartial","fullypartilReport",columns,fpFieldFilters(),updateRows, "");
	$("#jqxgrid").jqxGrid({	
	  sortable: true,            
	  altrows: true,
	  columnsresize: true, 
	  rowsheight : 35,
	  columnsheight: 80,
	  theme: 'energyblue',
	  rowdetails : true,
	  virtualmode : true	
	});
}

$("#search").on("click",function(){
	fpSearchGride();
	$("#jqxgrid").show();
})



// Export Record as per search criteria
$("#export").on("click",function() {
					var data;
					var newData = [];
					
					var fieldFilters = fpFieldFilters();
					fieldFilters.fieldFilters["type"] = 'export';
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
                     postJSON('/OrderExecution/api/v1/exportFullyPartial',JSON.stringify(fieldFilters),function(response) {
            	     if(response != null){
			         data = response.payload.fullypartilReport;
				     for (i = 0; i < data.length; i++) {
				    	 var myDate = new Date(data[i].orderDate);
				    	 var date=myDate.getDate();
				    	 var month =  myDate.getMonth()+1;
				    	 var year = myDate.getFullYear();
				    	 var formattedDate= (date + "/" +month+ "/" + year);
				     newData.push({
				    	            'Store/DC Name' : (data[i].storeName != null) ? data[i].storeName : "",
								    'Segment' : (data[i].segmentDescription != null) ? data[i].segmentDescription : "",
									'Order No' : (data[i].orderid!= null) ? data[i].orderid : "",
									'Order Sl No' : (data[i].orderItemSrlNo != null) ? data[i].orderItemSrlNo : "",
									'Order Date' : (data[i].orderDate != null) ? formattedDate : "",
									'Order Kind' : (data[i].orderKind != null) ? data[i].orderKind : "",
									'Stock No' : (data[i].stockItemId != null) ? data[i].stockItemId : "",
									'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode: "",
									'Jewel Code ' : (data[i].jewelCode != null) ? data[i].jewelCode : "",
									'Pcs ' : (data[i].pices != null) ? data[i].pices : "",
									'Gr. Wt.' : (data[i].finishedgrossWt != null) ? data[i].finishedgrossWt : "",
									'Nt. Wt.' : (data[i].finishedNtWt != null) ? data[i].finishedNtWt : "",
									'Selling Wastage' : (data[i].selling_wastage_wts != null) ? data[i].selling_wastage_wts : "",		
									'Selling MC/Total Selling' : (data[i].sellingtotalCost != null) ? data[i].sellingtotalCost : "",
									'Order Due Date' : (data[i].orderDuedate != null) ? data[i].orderDuedate : "",
									'Order Status Date' : (data[i].orderStatusDate != null) ? data[i].orderStatusDate : "",
									'Item Status' : (data[i].orderItemStatus != null) ? data[i].orderItemStatus : "",
									'Credit To Account' : (data[i].creditToAccount != null) ? data[i].creditToAccount : "",
									'Advance in Rs.' : (data[i].orderAdvance != null) ? data[i].orderAdvance : "",
									'Order Date Gold Rate' : (data[i].sellingRate != null) ? data[i].sellingRate : "",
									'Order Raised By' : (data[i].empName != null) ? data[i].empName : ""
				   });
				}
				var opts = [{sheetid:'Fully_Partially',header:true}];
		        var res = alasql('SELECT * INTO XLSX("Fully_Partially'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
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

$("#clear").on("click",function(){
	var validator = $("form").validate();
	validator.resetForm();
	
	$('#storeNameObj').multiselect("clearSelection");
	$('#orderKindObj').multiselect("clearSelection");
	$('#segmentObj').multiselect("clearSelection");
	
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	redirect();
})

//Print Functionality to be done by Venkat
//#######################################
$("#printfpc").on('click', function() {
	var storeNameObj = $("#storeNameObj").val();
	var orderKindObj = $("#orderKindObj").val();
	var segmentObj = $('#segmentObj').val();
	
	if (storeNameObj == null || storeNameObj == ""){
		var storeName = "";
	}else{
		var storeName = storeNameObj.join(",");
	}
	if (orderKindObj == null || orderKindObj == ""){
		var orderKind = "";
	}else{
		var orderKind = orderKindObj.join(",");
	}
	if (segmentObj == null || segmentObj == ""){
		var articleSegment = "";
	}else{
		var articleSegment = segmentObj.join(",");
	}
	fieldFilters = {
			"fieldFilters" : {}
		};
	
	if (storeName != "" && storeName != null) {
		fieldFilters.fieldFilters["storeId"] = storeName;
	}
	
	if (articleSegment != "" && articleSegment != null) {
		fieldFilters.fieldFilters["segments"] = articleSegment;
	}
	
	if (orderKind != "" && orderKind != null) {
		fieldFilters.fieldFilters["orderkinds"] = orderKind;
	}
	
	fieldFilters = {
		"fieldFilters" : {
			"storeId" : storeName,
			"OrderKind" : orderKind,
			"SegmentId":articleSegment,
			"mode" : "pdf",
			"reportName" : "RPT_Fully_Partially_Customer_Orders"
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
				navigator.msSaveBlob(file, 'RPT_Fully_Partially_Customer_Orders.pdf');
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
