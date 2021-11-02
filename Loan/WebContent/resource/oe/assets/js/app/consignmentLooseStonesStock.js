/*<!-- 
	##	Author1 (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Shreevardhan
	##	Date Creation 	: 	05-10-2017
	## 	Description		:	Consignment Loose Stones Stock Available Sale Report
 -->
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

$("#looseStoneStockReport").show();
$("#FgStockReport").hide();
$("#accStockReport").hide();

// ####################################### Onload Drop Down ###########################

$("#looseStoneStock").on('change', function(){
	var looseStone = $("#looseStoneStock").val();
	if(looseStone == "fg"){
		$("#FgStockReport").show();
		$("#accStockReport").hide();
		$("#looseStoneStockReport").hide();
	}else if(looseStone == "acc"){
		$("#FgStockReport").hide();
		$("#accStockReport").show();
		$("#looseStoneStockReport").hide();
	}else{
		$("#looseStoneStockReport").show();
		$("#FgStockReport").hide();
		$("#accStockReport").hide();
	}
	$("#jqxgridFg").hide();
	$("#jqxgrid").hide();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgridFg").jqxGrid('clear');
	$("#jqxgridAcc").hide();
	$("#jqxgridAcc").jqxGrid('clear');
	
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

$("#fgStock").on('change', function(){
	
	var fgStock = $("#fgStock").val();
	if(fgStock == "fg"){
		$("#FgStockReport").show();
		$("#accStockReport").hide();
		$("#looseStoneStockReport").hide();
	}else if(fgStock == "acc"){
		$("#FgStockReport").hide();
		$("#accStockReport").show();
		$("#looseStoneStockReport").hide();
	}else{
		$("#looseStoneStockReport").show();
		$("#FgStockReport").hide();
		$("#accStockReport").hide();
	}
	
	$("#jqxgridFg").hide();
	$("#jqxgrid").hide();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgridFg").jqxGrid('clear');
	$("#jqxgridAcc").hide();
	$("#jqxgridAcc").jqxGrid('clear');
	
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

$("#accStock").on('change', function(){
	
	var accStock = $("#accStock").val();
	if(accStock == "fg"){
		$("#FgStockReport").show();
		$("#accStockReport").hide();
		$("#looseStoneStockReport").hide();
	}else if(accStock == "acc"){
		$("#FgStockReport").hide();
		$("#accStockReport").show();
		$("#looseStoneStockReport").hide();
	}else{
		$("#looseStoneStockReport").show();
		$("#FgStockReport").hide();
		$("#accStockReport").hide();
	}
	
	$("#jqxgridFg").hide();
	$("#jqxgrid").hide();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgridFg").jqxGrid('clear');
	$("#jqxgridAcc").hide();
	$("#jqxgridAcc").jqxGrid('clear');
	
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});
// ######################### Date Picker ###################
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate: 0,
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
	maxDate: 0
});

var onLoadAPI = function() {
	$('#status').empty().append('<option value="" selected>--Select--</option>');
	$('#storeDCS').empty().append('<option value="" selected>--Select--</option>');

	$.getJSON('/OrderExecution/api/v1/LooseStSkConsigLOVs ', function(data) {
		var vCodeList = data.payload.vCodeList;
		var statusList = data.payload.statusList;
		var stoneSegments = data.payload.stoneSegments;
		var stoneSubCategories = data.payload.stoneSubCategories;
		var storeDcTypes = data.payload.storeDcTypes;
		
		  $.each(data.payload.statusList,function(key,val){
		    	$("#status").append('<option value="'+val.id+'">'+val.name+'</option>');
		    })
		    
		  $.each(data.payload.storeDcTypes,function(key,val){
		    	$("#storeDCS").append('<option value="'+val.id+'">'+val.name+'</option>');
		    })
	     
		
			var V = '<select id="vendorObj"  name="vendorObj" class="form-control" multiple="multiple">';   
			$.each(vCodeList, function(key, val) {
				V +='<option value="' + val.id + '">' + val.name + '</option>';
			});
			V +='</select>'; 
			$("#vendorCodeS").html(V);
			$('#vendorObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
			
			var Seg = '<select id="stoneSegmentObj"  name="stoneSegmentObj" class="form-control" multiple="multiple">';   
			$.each(stoneSegments, function(key, val) {
				Seg +='<option value="' + val.id + '">' + val.description + '</option>';
			});
			Seg +='</select>'; 
			$("#stoneSegment").html(Seg);
			$('#stoneSegmentObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
			
			var Sub = '<select id="stoneSubCatObj"  name="stoneSubCatObj" class="form-control" multiple="multiple">';   
			$.each(stoneSubCategories, function(key, val) {
				Sub +='<option value="' + val.id + '">' + val.description + '</option>';
			});
			Sub +='</select>'; 
			$("#stoneSubCat").html(Sub);
			$('#stoneSubCatObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
		
	});
}
onLoadAPI();
$("#storeDc").hide();
$("#storeDCS").on("change",function(){
	$("#storeDc").show();
	var id = $("#storeDCS").val();
	if(id != ""){
	$.getJSON('/OrderExecution/api/v1/getStorDcForLSC?type='+id, function(data) {
		var allStoreOrDc = data.payload.allStoreOrDc;
	var storeDC = '<select id="storeDcNameObj"  name="storeDcNameObj" class="form-control" multiple="multiple">';   
	$.each(allStoreOrDc, function(key, val) {
		storeDC +='<option value="' + val.id + '">' + val.name + '</option>';
	});
	storeDC +='</select>'; 
	$("#storeDcName").html(storeDC);
	$('#storeDcNameObj').multiselect({ 
        includeSelectAllOption: true,
        enableFiltering:false,         
        maxHeight:250,
        numberDisplayed:1,
        buttonClass: 'col-md-12 form-control text-left'
  	   });
    });
  }
})

$('#mrvNo').on("change",function() {
	if (this.value.match(/[^0-9]/g)) {
	   this.value = this.value.replace(/[^0-9]/g, '');
	}
});

$("#stoneSegment").on("change",function(){
	
	var stoneObj = $('#stoneSegmentObj').val();
	
	if (stoneObj == null || stoneObj == "") {
		var stoneSegment = "";
	} else {
		var stoneSegment = stoneObj.join(",");
	}
	
	var  segment = {
			"stoneSegments":stoneSegment
	}
	postJSON('/OrderExecution/api/v1/getStoneSubCats',JSON.stringify(segment),function(response) {
	var stoneSubCategories = response.payload.stoneSubCategories;
	var storeDC = '<select id="stoneSubCatObj"  name="stoneSubCatObj" class="form-control" multiple="multiple">';   
	$.each(stoneSubCategories, function(key, val) {
		storeDC +='<option value="' + val.id + '">' + val.description + '</option>';
	});
	storeDC +='</select>'; 
	$("#stoneSubCat").html(storeDC);
	$('#stoneSubCatObj').multiselect({ 
        includeSelectAllOption: true,
        enableFiltering:false,         
        maxHeight:250,
        numberDisplayed:1,
        buttonClass: 'col-md-12 form-control text-left'
  	   });
    });
})

// ############################### Field filters ##################################

var consignmentLooseStoneReportFilters = function(){
	
	var mrvNo = $('#mrvNo').val();
	var status = $('#status').val();
	var storeDCS = $('#storeDCS').val();
	var storeDcName = $("#storeDcName").val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	
	var stoneObj = $('#stoneSegmentObj').val();
	
	if (stoneObj == null || stoneObj == "") {
		var stoneSegment = "";
	} else {
		var stoneSegment = stoneObj.join(",");
	}
    
	var vendorObj = $('#vendorObj').val();
	
	if (vendorObj == null || vendorObj == "") {
		var vendorCodeS = "";
	} else {
		var vendorCodeS = vendorObj.join(",");
	}
	
    var storeDcNameObj = $('#storeDcNameObj').val();
	
	if (storeDcNameObj == null || storeDcNameObj == "") {
		var storeDcName = "";
	} else {
		var storeDcName = storeDcNameObj.join(",");
	}

    var stoneSubCatObj = $('#stoneSubCatObj').val();
	
	if (stoneSubCatObj == null || stoneSubCatObj == "") {
		var stoneSubCat = "";
	} else {
		var stoneSubCat = stoneSubCatObj.join(",");
	}
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendors"] = vendorCodeS;
	}
	
	if (stoneSegment != "" && stoneSegment != null) {
		fieldFilters.fieldFilters["segments"] = stoneSegment;
	}
	
	if (storeDcName != "" && storeDcName != null) {
		fieldFilters.fieldFilters["storeDcIds"] = storeDcName;
	}
	
	if (stoneSubCat != "" && stoneSubCat != null) {
		fieldFilters.fieldFilters["subCategories"] = stoneSubCat;
	}
	
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	
	if (mrvNo != "" && mrvNo != null) {
		fieldFilters.fieldFilters["mrvNo"] = mrvNo;
	}
	
	if (storeDCS != "" && storeDCS != null) {
		fieldFilters.fieldFilters["storeDcType"] = storeDCS;
	}

	return fieldFilters;
}
//###################################### Search Grid  ###################################################

var  consignmentLooseStoneSearchGrid = function() {
	
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map':'currentStoreDcid>name'},
		{'name' : 'mrvDate','type' : 'string','map':'grHeader>mrvCreatedDate'},
		{'name' : 'mrvNo','type' : 'int','map':'grHeader>refTypeNo'}, 
		{'name' : 'vendorCode','type' : 'string','map':'vendor>description'},
		{'name' : 'zone','type' : 'string','map':'currentZone>description'},
		{'name' : 'stoneSegment','type' : 'string','map':'stoneSegment>name'},
		{'name' : 'venBillNo','type' : 'int','map':'grHeader>partyBillNumber'}, 

        {'name' : 'stoneCode','type' : 'string','map':'stoneCode'},
		{'name' : 'stoneSubcat','type' : 'string','map':'subCategoryDescription'},
		//{'name' : 'articleCode','type' : 'string','map':''}, 
		{'name' : 'caratRange','type' : 'string','map':'fromToCostWtRange'}, 
		{'name' : 'stockNo','type' : 'string','map':'id'}, 
		
		{'name' : 'pcs','type' : 'int','map':'pieces'}, 
		{'name' : 'stoneWt','type' : 'float','map':'weight'},
		{'name' : 'uqc','type' : 'string','map':'uom>name'},
		{'name' : 'labCode','type' : 'string','map':'labCodes'},
		{'name' : 'certificateNo','type' : 'int','map':'certificateNo'}, 
		{'name' : 'stoneCostRate','type' : 'string','map':'stoneCostRate'}, 
		{'name' : 'stoneCost','type' : 'string','map':'stoneCost'}, 
		
		{'name' : 'grNo','type' : 'string','map':'grHeader>id'}, 
		{'name' : 'startDate','type' : 'string','map':'grHeader>lastChangedDate'},
		{'name' : 'itemStatus','type' : 'string','map':'status'},
		{'name' : 'refDocNo','type' : 'int','map':'refsalesBillNo'}, 
		{'name' : 'noOfdaysatCompany','type' : 'int','map':'noOfDays'}, 
		];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'MRV No','datafield' : 'mrvNo','width' : '4%',sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'MRV Date','datafield' : 'mrvDate','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '5.5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},

		{'text' : 'Vendor Bill No.','datafield' : 'venBillNo','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Zone','datafield' : 'zone','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stone Seg','datafield' : 'stoneSegment','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		
		{'text' : 'Stone Sub Category','datafield' : 'stoneSubcat','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		//{'text' : 'Article Code.','datafield' : 'articleCode','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Carat Range','datafield' : 'caratRange','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Stock No','datafield' : 'stockNo','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stone Wt','datafield' : 'stoneWt','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'UQC','datafield' : 'uqc','width' : '3%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Lab Code','datafield' : 'labCode','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Cert No.','datafield' : 'certificateNo','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stone Cost Rate','datafield' : 'stoneCostRate','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false},
		
		{'text' : 'Stone Cost','datafield' : 'stoneCost','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'GR No.','datafield' : 'grNo','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Status Date','datafield' : 'startDate','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Item Status','datafield' : 'itemStatus','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Ref Doc No.','datafield' : 'refDocNo','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'No of days @ Company','datafield' : 'noOfdaysatCompany','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		];

	showMyGrid(datafields, "/OrderExecution/api/v1/getLSTKConsignSearch","list",columns,consignmentLooseStoneReportFilters(),updateRows, "");
	$("#jqxgrid").jqxGrid({	
        sortable: false,            
	   	altrows: true,
	   	theme: 'energyblue',
	  	columnsresize: true, 
		rowsheight : 35,
		columnsheight: 80,
		rowdetails : true,
		virtualmode : true	
	});
}


$("#mandatory").hide();
$("#mandatory2").hide();
$("#search").on("click",function(){
	
	var fromDateS=$("#fromDateS").val();
	var toDateS=$("#toDateS").val();
	var status = $("#status").val();
	if(status == "B"){
		$("#mandatory").show();
		$("#mandatory2").show();
		if((fromDateS == ""  || fromDateS == null) || (toDateS == "" || toDateS == null)){
			
			$.growl.error({
					message : "Please fill date range.",
				duration : 10000
			});
			return false;
	   }
	}else{
		$("#mandatory").hide();
		$("#mandatory2").hide();
	}
	consignmentLooseStoneSearchGrid();
	$("#jqxgrid").show();
})

//###################### Export functionality #######################
$("#export").on("click",function() {
			var data;
		    var newData = [];
		    var mrvNo = $('#mrvNo').val();
			var status = $('#status').val();
			var storeDCS = $('#storeDCS').val();
			var fromDateS = $('#fromDateS').val();
			var toDateS = $('#toDateS').val();
			
			var stoneObj = $('#stoneSegmentObj').val();
			
			if (stoneObj == null || stoneObj == "") {
				var stoneSegment = "";
			} else {
				var stoneSegment = stoneObj.join(",");
			}
		    
			var vendorObj = $('#vendorObj').val();
			
			if (vendorObj == null || vendorObj == "") {
				var vendorCodeS = "";
			} else {
				var vendorCodeS = vendorObj.join(",");
			}
			
		    var storeDcNameObj = $('#storeDcNameObj').val();
			
			if (storeDcNameObj == null || storeDcNameObj == "") {
				var storeDcName = "";
			} else {
				var storeDcName = storeDcNameObj.join(",");
			}

		    var stoneSubCatObj = $('#stoneSubCatObj').val();
			
			if (stoneSubCatObj == null || stoneSubCatObj == "") {
				var stoneSubCat = "";
			} else {
				var stoneSubCat = stoneSubCatObj.join(",");
			}
			fieldFilters = {
				"fieldFilters" : {}
			};

			if (fromDateS != "" && fromDateS != null) {
				fieldFilters.fieldFilters["fromDate"] = fromDateS;
			}
			
			if (toDateS != "" && toDateS != null) {
				fieldFilters.fieldFilters["toDate"] = toDateS;
			}
			
			if (vendorCodeS != "" && vendorCodeS != null) {
				fieldFilters.fieldFilters["vendors"] = vendorCodeS;
			}
			
			if (stoneSegment != "" && stoneSegment != null) {
				fieldFilters.fieldFilters["segments"] = stoneSegment;
			}
			
			if (storeDcNameObj != "" && storeDcNameObj != null) {
				fieldFilters.fieldFilters["storeDcIds"] = storeDcNameObj;
			}
			
			if (stoneSubCat != "" && stoneSubCat != null) {
				fieldFilters.fieldFilters["subCategories"] = stoneSubCat;
			}
			
			if (status != "" && status != null) {
				fieldFilters.fieldFilters["status"] = status;
			}
			
			if (mrvNo != "" && mrvNo != null) {
				fieldFilters.fieldFilters["mrvNo"] = mrvNo;
			}
			
			if (storeDCS != "" && storeDCS != null) {
				fieldFilters.fieldFilters["storeDcType"] = storeDCS;
			}
			
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
     					postJSON('/OrderExecution/api/v1/getLSTKConsignExport ',JSON.stringify(fieldFilters),function(response) {
					   if(response != null){
                       data = response.payload.list;
                       for (i = 0; i < data.length; i++) {
						newData.push({
							'Store Name' : (data[i].currentStoreDcid != null) ? data[i].currentStoreDcid.name : "",
							'MRV No' : (data[i].grHeader != null) ? data[i].grHeader.refTypeNo : "",
							'MRV Date' : (data[i].grHeader!= null) ? data[i].grHeader.mrvCreatedDate  : "",		
							'Vendor Code' : (data[i].vendor!= null) ? data[i].vendor.description  : "",
							'Vendor Bill No' : (data[i].grHeader != null) ? data[i].grHeader.partyBillNumber : "",
							'Zone' : (data[i].currentZone != null) ? data[i].currentZone.description : "",
							'Stone Segment' : (data[i].stoneSegment != null) ? data[i].stoneSegment.name : "",
							'Stone Code' : (data[i].stoneCode != null) ? data[i].stoneCode : "",		
							'Stone Sub Cat' : (data[i].subCategoryDescription != null) ? data[i].subCategoryDescription : "",	
							'Stock No' : (data[i].id != null) ? data[i].id : "",
							'Pcs' : (data[i].pieces != null) ? data[i].pieces : "",
							'Stone Wt' : (data[i].weight!= null) ? data[i].weight  : "",		
							'UQC' : (data[i].uom != null) ? data[i].uom.name  : "",
							'Lab Code' : (data[i].labCodes != null) ? data[i].labCodes : "",
							'Certificate No' : (data[i].certificateNo != null) ? data[i].certificateNo : "",
							'Stone Cost Rate' : (data[i].stoneCostRate != null) ? data[i].stoneCostRate : "",
							'Stone Cost' : (data[i].stoneCost != null) ? data[i].stoneCost : "",
							'GR No' : (data[i].grHeader!= null) ? data[i].grHeader.id  : "",
							'Status Date' : (data[i].grHeader != null) ? data[i].grHeader.lastChangedDate : "",
							'Item Status' : (data[i].status != null) ? data[i].status : "",
							'Ref Doc No' : (data[i].refsalesBillNo != null) ? data[i].refsalesBillNo : "",
							'No of Days at DCPL' : (data[i].noOfDays != null) ? data[i].noOfDays : "",	
                           });
								
                       }
                       //JSONToCSVConvertor(newData, "Consignment_Loose Stones_Stock_Available Sale" + "_" + sysdate, true);
                       var opts = [{sheetid:'Consignment_Loose Stones_Stock_Available Sale',header:true}];
                       var res = alasql('SELECT * INTO XLSX("Consignment Loose Stones Stock Available Sale_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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



$("#clearAll").on('click', function() {
	$('#stoneSegmentObj').multiselect("clearSelection");
	$('#stoneSubCatObj').multiselect("clearSelection");
	$('#vendorObj').multiselect("clearSelection");
	$('#storeDcNameObj').multiselect("clearSelection");
	
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});
//Print Functionality to be done by Venkat
//#######################################
$("#printCS").on('click', function() {
	var mrvNo = $('#mrvNo').val();
	var status = $('#status').val();
	var storeDCS = $('#storeDCS').val();
	var storeDcName = $("#storeDcName").val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var type = $('#looseStoneStock').val();
	var materialType;
	if(type=="stone" )
		{
		materialType = "S";
		}
	var stoneObj = $('#stoneSegmentObj').val();
	
	if (stoneObj == null || stoneObj == "") {
		var stoneSegment = "";
	} else {
		var stoneSegment = stoneObj.join(",");
	}
    
	var vendorObj = $('#vendorObj').val();
	
	if (vendorObj == null || vendorObj == "") {
		var vendorCodeS = "";
	} else {
		var vendorCodeS = vendorObj.join(",");
	}
	
    var storeDcNameObj = $('#storeDcNameObj').val();
	
	if (storeDcNameObj == null || storeDcNameObj == "") {
		var storeDcName = "";
	} else {
		var storeDcName = storeDcNameObj.join(",");
	}

    var stoneSubCatObj = $('#stoneSubCatObj').val();
	
	if (stoneSubCatObj == null || stoneSubCatObj == "") {
		var stoneSubCat = "";
	} else {
		var stoneSubCat = stoneSubCatObj.join(",");
	}
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendors"] = vendorCodeS;
	}
	
	if (stoneSegment != "" && stoneSegment != null) {
		fieldFilters.fieldFilters["segments"] = stoneSegment;
	}
	
	if (storeDcName != "" && storeDcName != null) {
		fieldFilters.fieldFilters["storeDcIds"] = storeDcName;
	}
	
	if (stoneSubCat != "" && stoneSubCat != null) {
		fieldFilters.fieldFilters["subCategories"] = stoneSubCat;
	}
	
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	else 
	{
		status="A,VR,B";
	fieldFilters.fieldFilters["status"] =status ;
	}
	
	if (mrvNo != "" && mrvNo != null) {
		fieldFilters.fieldFilters["mrvNo"] = mrvNo;
	}
	
	if (storeDCS != "" && storeDCS != null) {
		fieldFilters.fieldFilters["storeDcType"] = storeDCS;
	}
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : fromDateS,
			"ToDate" : toDateS,
			"SubCategoryId":stoneSubCat,
			"type":materialType,
			"Status":status,
			"mrvNumber":mrvNo,
			"vendorId":vendorCodeS,
			"ToStoreOrDcName":storeDcName,
			"SegmentId":stoneSegment,
			 "SubCategoryId":stoneSubCat,
			"mode" : "pdf",
			"reportName" : "RPT_Consignment_Stock"
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
				navigator.msSaveBlob(file, 'RPT_Consignment_Stock.pdf');
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