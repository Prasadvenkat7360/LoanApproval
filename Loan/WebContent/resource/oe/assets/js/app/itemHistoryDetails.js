$("#gridTabs").hide();

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};


$(".tabDisabledS").addClass("tabDisabled2");
$("#gridTabs").tabs({
	disabled:[]
});

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

var storeOrDc = [
    { "id": "DC","name": "DC"},
    {"id": "Store","name": "Store"}
    ]

var onloadFunction = function(){
	var sdName = '<select id="storeDcNameObj" class="form-control" multiple="multiple"></select>';
	$("#storeDcName").html(sdName);
	$('#storeDcNameObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var jType = '<select id="jewelTypeObj" class="form-control" multiple="multiple"></select>';
	$("#jewelType").html(jType);
	$('#jewelTypeObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var mainCat = '<select id="mainCatObj" class="form-control" multiple="multiple"></select>';
	$("#mainCat").html(mainCat);
	$('#mainCatObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var sCat = '<select id="subCatObj" class="form-control" multiple="multiple"></select>';
	$("#subCat").html(sCat);
	$('#subCatObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	$('#storeDcType').empty().append('<option value="" selected>--Select--</option>');
		$.each(storeOrDc, function(key, val) {
		$('#storeDcType').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	
	$.getJSON('/OrderExecution/api/v1/getFGStockItemHistoryLOVs',function(data) {
		if(data.resCode == 1){
			$('#liStatusS').empty().append('<option value="" selected>--Select--</option>');
				$.each(data.payload.status, function(key, val) {
					$('#liStatusS').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
				
			$('#artSegmentS').empty().append('<option value="" selected>--Select--</option>');
				$.each(data.payload.articalSegments, function(key, val) {
					$('#artSegmentS').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
				
			var v = '<select id="vendorCodeObj"  name="vendorCodeObj" class="form-control" multiple="multiple">';
			$.each(data.payload.vendors, function(key, val) {
				v += '<option value="' + val.id + '">' + val.name + '</option>'; 
			});
				
			v += '</select>';
				
			$("#vendorCode").html(v);
				
			$("#vendorCodeObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
		
	});
	
}

onloadFunction();

$("#storeDcType").on('change',function(){
	var type = $("#storeDcType").val();
	$.getJSON('/OrderExecution/api/v1/getStoreDcsFStk?type=' + type,function(data) {
		var storeDc = data.payload.allStoreOrDc;
		if (type != "") {
			// Size Lov
			var d = '<select id="storeDcNameObj"  name="storeDcNameObj" class="form-control" multiple="multiple">';
			$.each(storeDc, function(key, val) {
				d += '<option value="' + val.id + '">' + val.name + '</option>';
			});
			
			d += '</select>';
			
			$("#storeDcName").html(d);
			
			$("#storeDcNameObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	  }
	});
});

$("#artSegmentS").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/getFGStockItemHistoryLOVs?segId='+$("#artSegmentS").val(),function(response) {
		if(response.resCode == "1"){
			
			// Jewel Type
			var j = '<select id="jewelTypeObj"  name="jewelTypeObj" class="form-control" multiple="multiple">';
			$.each(response.payload.jewelTypes, function(key, val) {
				j += '<option value="' + val.id + '">' + val.description + '</option>'; 
			});
				
			j += '</select>';
				
			$("#jewelType").html(j);
				
			$("#jewelTypeObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			var m = '<select id="mainCatObj"  name="mainCatObj" class="form-control" multiple="multiple">';
			$.each(response.payload.cats, function(key, val) {
				m += '<option value="' + val.id + '">' + val.description + '</option>'; 
			});
				
			m += '</select>';
				
			$("#mainCat").html(m);
				
			$("#mainCatObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			var s = '<select id="subCatObj"  name="subCatObj" class="form-control" multiple="multiple">';
			$.each(response.payload.subCats, function(key, val) {
				s += '<option value="' + val.id + '">' + val.description + '</option>'; 
			});
				
			s += '</select>';
				
			$("#subCat").html(s);
				
			$("#subCatObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
	});
});

$("#jewelType").on('change',function(){
	
	var jewelTypeObj = $("#jewelTypeObj").val();
	jewelTypeObj = jewelTypeObj.join(',');

	if(jewelTypeObj != ""  && jewelTypeObj != null){
		var params = { "fieldFilters":{ "metalType":$("#artSegmentS").val(),"jewelType":jewelTypeObj.toString()}}

		postJSON('/OrderExecution/api/v1/getCatAndSubCatBySegmentAndJewels',JSON.stringify(params),function(response) {
			if(response.resCode == "1"){
	// Main Category
				
				var m = '<select id="mainCatObj"  name="mainCatObj" class="form-control" multiple="multiple">';
				$.each(response.payload.cat, function(key, val) {
					m += '<option value="' + val.id + '">' + val.description + '</option>'; 
				});
					
				m += '</select>';
					
				$("#mainCat").html(m);
					
				$("#mainCatObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
				
				var s = '<select id="subCatObj"  name="subCatObj" class="form-control" multiple="multiple">';
				$.each(response.payload.subCat, function(key, val) {
					s += '<option value="' + val.id + '">' + val.description + '</option>'; 
				});
					
				s += '</select>';
					
				$("#subCat").html(s);
					
				$("#subCatObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
		
	}
});

$("#mainCat").on('change',function(){
	var jewelTypeObj = $("#jewelTypeObj").val();
	jewelTypeObj = jewelTypeObj.join(',');
	
	var mainCatObj = $("#mainCatObj").val();
	mainCatObj = mainCatObj.join(',');
	
	var params = { "fieldFilters":{ "metalType":$("#artSegmentS").val(),"jewelType":jewelTypeObj.toString(),"metalCategory": mainCatObj.toString()}}

	postJSON('/OrderExecution/api/v1/getSubCatBySegmentAndJewelsAndCats',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var s = '<select id="subCatObj"  name="subCatObj" class="form-control" multiple="multiple">';
			$.each(response.payload.subCat, function(key, val) {
				s += '<option value="' + val.id + '">' + val.description + '</option>'; 
			});
				
			s += '</select>';
				
			$("#subCat").html(s);
				
			$("#subCatObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		}
	});
});

var dataArr = [];
$("#jqxgrid").bind('cellendedit', function (event,index) {
	var i =event.args.rowindex;
	    if (event.args.value) {
	      $("#jqxgrid").jqxGrid('selectrow', event.args.row);
	        dataArr.push(i);
	       $(".tabDisabledS").removeClass("tabDisabled2");
	   	    }
	    else {
	        $("#jqxgrid").jqxGrid('unselectrow', event.args.row);
	        var delArr = dataArr.splice(i,1);
	    }
	    if($("#jqxgrid").jqxGrid("getselectedrowindexes") <= 0)
		{
	    	$(".tabDisabledS").addClass("tabDisabled2");
		}
	    $.each(dataArr, function(key, val) {
	    		var data =$("#jqxgrid").jqxGrid('getrowdata',val);
	    });
	});

function selectedCheckBox(){
	var dataArr1 = [];
	var gridData = $("#jqxgrid").jqxGrid('getrows');
	$.each(gridData,function(k,v){
		if(v.flag == true){
			dataArr1.push(v.id);
		}
	});
	console.log(dataArr1);
	return dataArr1;
}


//Field Filters
var searchFieldFilters = function() {
	var status = $('#liStatusS').val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var stockNo = $('#stockNoS').val();
	var vendorCode = $('#vendorCode').val();
	var segment = $('#artSegmentS').val();
	var storeDcType = $('#storeDcType').val();

	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["statusList"] = status;
	}
	
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	if (storeDcType != "" && storeDcType != null) {
		fieldFilters.fieldFilters["storeOrDcType"] = storeDcType;
	}
	
	var storeDcNameObj = $('#storeDcNameObj').val();
	if (storeDcNameObj == null || storeDcNameObj == "") {
		var storeDcName = "";
	} else {
		var storeDcName = storeDcNameObj.join(",");
	}
	if (storeDcName != "" && storeDcName != null) {
		fieldFilters.fieldFilters["storeOrDcIdList"] = storeDcName;
	}
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segmentList"] = segment;
	}
	
	var jewelTypeObj = $('#jewelTypeObj').val();
	if (jewelTypeObj == null || jewelTypeObj == "") {
		var jewelType = "";
	} else {
		var jewelType = jewelTypeObj.join(",");
	}
	if (jewelType != "" && jewelType != null) {
		fieldFilters.fieldFilters["jewelTypeList"] = jewelType;
	}
	
	var mainCatObj = $('#mainCatObj').val();
	if (mainCatObj == null || mainCatObj == "") {
		var mainCatS = "";
	} else {
		var mainCatS = mainCatObj.join(",");
	}
	if (mainCatS != "" && mainCatS != null) {
		fieldFilters.fieldFilters["catList"] = mainCatS;
	}
	
	var subCatObj = $('#subCatObj').val();
	if (subCatObj == null || subCatObj == "") {
		var subCat = "";
	} else {
		var subCat = subCatObj.join(",");
	}
	if (subCat != "" && subCat != null) {
		fieldFilters.fieldFilters["subCatList"] = subCat;
	}
	
	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vCode = "";
	} else {
		var vCode = vendorCodeObj.join(",");
	}
	if (vCode != "" && vCode != null) {
		fieldFilters.fieldFilters["vendorCodeList"] = vCode;
	}
	
	if (stockNo != "" && stockNo != null) {
		fieldFilters.fieldFilters["stockNo"] = stockNo;
	}
	
	return fieldFilters;
}


function stockMasterQuerySearch() {
	var updateRows = function(rowid, newdata, commit) {
		  commit(true);
	}
	var datafields = [
		{'name' : 'id','type' : 'string','map':'stockNo'},
		{'name' : 'segment','type' : 'string','map':'segmentDesc'},
		{'name' : 'jType','type' : 'string','map':'jewelTypeDesc'}, 
		{'name' : 'mainCat','type' : 'string','map' : 'catDesc'},
		{'name' : 'subCat','type' : 'string','map' : 'subCatDesc'},
		{'name' : 'artCode','type' : 'string','map' : 'articalCode'},
		{'name' : 'vCode','type' : 'string','map':'vendorCode'},
		{'name' : 'gwt','type' : 'float','map' : 'grossWt'},
		{'name' : 'nwt','type' : 'float','map' : 'netWt'},
		{'name' : 'pcs','type' : 'int','map' : 'pcs'},
		{'name' : 'status','type' : 'string','map' : 'stockItemStatus'},

		{'name' : 'length','type' : 'string','map' : 'length'},
		{'name' : 'size','type' : 'string','map' : 'size'}, 
		{'name' : 'diameter','type' : 'string','map' : 'dia'},
		{'name' : 'height','type' : 'string','map' : 'height'},
		{'name' : 'width','type' : 'string','map' : 'width'},
		{'name' : 'skinPurity','type' : 'float','map' : 'skinPurity'},
		{'name' : 'meltingPurity','type' : 'float','map':'meltingPurity'},
		{'name' : 'storeDcType','type' : 'string','map':'storeOrDcType'},
		{'name' : 'storeDcName','type' : 'string','map':'storeOrDcId'},
	 ];

	var columns = [ 
		{'text' : '','datafield' : '',cellsalign : 'center',columntype : 'checkbox',align : 'center','width' : '4%',sortable : false,
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				console.log(newvalue);
				$('#jqxgrid').jqxGrid ('setcellvalue', row, 'flag',  newvalue);
				}
		},
		{'text' : 'flag','datafield' : 'flag','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
		{'text' : 'Stock No','datafield' : 'id','width' : '6%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
		{'text' : 'Segment','datafield' : 'segment','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 

		{'text' : 'Jewel Type','datafield' : 'jType','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Category','datafield' : 'mainCat','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Sub Category','datafield' : 'subCat','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Article Code','datafield' : 'artCode','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Vendor Code','datafield' : 'vCode','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Gross Wt','datafield' : 'gwt','width' : '5%',cellsalign : 'right',cellsformat : 'd3',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Net Wt','datafield' : 'nwt','width' : '5%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable :false,editable : false,},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Item Status','datafield' : 'status','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

		{'text' : 'Length','datafield' : 'length','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},

		{'text' : 'Size','datafield' : 'size','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false,},
		{'text' : 'Diameter','datafield' : 'diameter','width' : '7%',cellsalign : 'center',align : 'center',sortable :false,editable : false,},
		{'text' : 'Height','datafield' : 'height','width' : '7%',cellsalign : 'center',align : 'center',sortable :false,editable : false,},
		{'text' : 'Width','datafield' : 'width','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '4%',cellsalign : 'center','cellsformat' : 'd2',align : 'center',sortable :false,editable : false},
		{'text' : 'Melting Purity','datafield' : 'meltingPurity','width' : '4%',cellsalign : 'center','cellsformat' : 'd2',align : 'center',sortable :false,editable : false},

		{'text' : 'Current Store/DC Type','datafield' : 'storeDcType','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Current Store/DC Name','datafield' : 'storeDcName','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		];
	showMyGrid(datafields,"/OrderExecution/api/v1/getFGStockItemHistoryDetails?mode=Export", "list",columns, searchFieldFilters(), updateRows);
	var columnCheckBox = null;
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		showstatusbar: false,
 	    statusbarheight: 30,
 	    showaggregates: true,
	});
}


$("#search").on('click',function(){
	if($('#liStatusS').val() == "" || $("#fromDateS").val() == ""  || $("#toDateS").val() == ""  || $("#artSegmentS").val() == "" ){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		activaTab('tab0default');
		$("#gridTabs").show();
		stockMasterQuerySearch();
		$("#jqxgrid").show();
	}
});

$("#stoneDetails").click(function () {
	var stockIds = selectedCheckBox();
	if(stockIds.length == 0){
		$.growl.error({
			message : "Please Select at least one Stock No !!!",
			duration : 10000,
			title  : 'Error'
		});
		return false;
	}else{
		var params = {
			"fieldFilters":{
				"stockNo":stockIds.toString()
			}
		}
		postJSON('/OrderExecution/api/v1/getFGStockItemHistoryStoneDetails?mode=Export',JSON.stringify(params),function(response) {
			if(response.resCode == 1){
				var data = response.payload.list;
				stoneGrid(data);
				$('#jqxgridStone').show();
			}else{
				stoneGrid();
				$('#jqxgridStone').show();
			}
		});
	}
});

var stoneGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stoneStockNo','type' : 'int','map':'stockNo'},
			{'name' : 'stoneSlNo','type' : 'int','map' : 'stoneSrlNo'},
			{'name' : 'suppBy','type' : 'string','map' : 'suppliedBy'},

			{'name' : 'subCat','type' : 'string','map' : 'subCatDesc'},
			{'name' : 'stoneCode','type' : 'string','map' : 'statusCode'},

			{'name' : 'wtRange','type' : 'string','map':'wtOrCostRange'},
			{'name' : 'clarity','type' : 'float','map' : 'clarity'},
			{'name' : 'actualColor','type' : 'int','map':'clarity'}, 
			{'name' : 'cutGrade','type' : 'int','map' : 'cutGrade'},
			{'name' : 'uqc','type' : 'string','map':'uom'}, 
			{'name' : 'pcs','type' : 'int','map':'pcs'}, 

			{'name' : 'stoneWt','type' : 'float','map':'weight'},
			{'name' : 'costRate','type' : 'float'},
			{'name' : 'costPrice','type' : 'float','map':'costPrice'},
			{'name' : 'sellingRate','type' : 'float','map' : ''},
			{'name' : 'sellingPrice','type' : 'float'},

		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStone").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		showstatusbar: false,
 	    statusbarheight: 30,
 	    showaggregates: false,
		columns : [
			{'text' : 'Stock No','datafield' : 'stoneStockNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Srl No','datafield' : 'stoneSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Supplied By','datafield' : 'suppBy','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'SubCat/Shape','datafield' : 'subCat','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Code','datafield' : 'stoneCode','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Weight/Cost Range','datafield' : 'wtRange','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Actual Color','datafield' : 'actualColor','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,},
			{'text' : 'UQC','datafield' : 'uqc','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false},

			{'text' : 'Weight','datafield' : 'stoneWt','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'Cost Rate','datafield' : 'costRate','width' : '6%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
					 var costPrice = $('#jqxgridStone').jqxGrid ('getcellvalue', row, 'costPrice');
					 var stoneWt = $('#jqxgridStone').jqxGrid ('getcellvalue', row, 'stoneWt');
					 
					 var costRate = costPrice/stoneWt ;
		      		return "<div align='center'style='margin-top:8px;'>" + costRate.toFixed(2); + "</div>";
		      	} 
			},
			{'text' : 'Cost Price','datafield' : 'costPrice','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Selling Rate','datafield' : 'sellingRate','width' : '6%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
					 var sellingPrice = $('#jqxgridStone').jqxGrid ('getcellvalue', row, 'sellingPrice');
					 var stoneWt = $('#jqxgridStone').jqxGrid ('getcellvalue', row, 'stoneWt');
					 
					 var sellingRate = sellingPrice/stoneWt ;
		      		return "<div align='center'style='margin-top:8px;'>" + sellingRate.toFixed(2); + "</div>";
		      	}
			},
			{'text' : 'Selling Price','datafield' : 'sellingPrice','width' : '6%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat : 'd2'}
		]
	});
}

$("#accDetails").click(function () {
	var stockIds = selectedCheckBox();
	
	if(stockIds.length == 0){
		$.growl.error({
			message : "Please Select at least one Stock No !!!",
			duration : 10000,
			title  : 'Error'
		});
		return false;
	}else{
		var params = {
			"fieldFilters":{
				"stockNo":stockIds.toString()
			}
		}
		postJSON('/OrderExecution/api/v1/getFGStockItemHistoryAccDetails?mode=Export',JSON.stringify(params),function(response) {
			if(response.resCode == 1){
				var data = response.payload.list;
				accGrid(data);
				$('#jqxgridAcc').show();
			}else{
				accGrid();
				$('#jqxgridAcc').show();
			}
		});
	}
});


var accGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stockNo','type' : 'int','map' : 'stockNo'},
			{'name' : 'accSlNo','type' : 'int','map' : 'AccSrlNo'},
			{'name' : 'suppBy','type' : 'string','map' : 'suppliedBy'},
			{'name' : 'subCat','type' : 'string','map' : 'subCatDesc'},
			{'name' : 'accCode','type' : 'string','map' : 'accCode'},

			{'name' : 'pcs','type' : 'int','map' : 'pcs'},
			{'name' : 'accWt','type' : 'float','map':'weight'}, 
			{'name' : 'uqc','type' : 'string','map':'uom'}, 
			{'name' : 'costRate','type' : 'float'},
			{'name' : 'costPrice','type' : 'float','map' : 'costPrice'},
			{'name' : 'sellingRate','type' : 'float'},
			{'name' : 'sellingPrice','type' : 'float','map' : 'sellingPrice'},
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		showstatusbar: false,
 	    statusbarheight: 30,
 	    showaggregates: false,
		columns : [
			{'text' : 'Stock No','datafield' : 'stockNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Srl No','datafield' : 'accSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Supplied By','datafield' : 'suppBy','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Sub Category','datafield' : 'subCat','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Code','datafield' : 'accCode','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'UQC','datafield' : 'uqc','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Pcs','datafield' : 'pcs','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Weight','datafield' : 'accWt','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'Cost Rate','datafield' : 'costRate','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
					 var costPrice = $('#jqxgridAcc').jqxGrid ('getcellvalue', row, 'costPrice');
					 var accWt = $('#jqxgridAcc').jqxGrid ('getcellvalue', row, 'accWt');
					 
					 var costRate = costPrice/accWt ;
		      		return "<div align='center'style='margin-top:8px;'>" + costRate.toFixed(2); + "</div>";
		      	}  
			},
			{'text' : 'Cost Price','datafield' : 'costPrice','width' : '10%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat : 'd2'},
			{'text' : 'Selling Rate','datafield' : 'sellingRate','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				cellsrenderer: function(row, column, value){
					 var sellingPrice = $('#jqxgridAcc').jqxGrid ('getcellvalue', row, 'sellingPrice');
					 var accWt = $('#jqxgridAcc').jqxGrid ('getcellvalue', row, 'accWt');
					 
					 var sellingRate = sellingPrice/accWt ;
		      		return "<div align='center'style='margin-top:8px;'>" + sellingRate.toFixed(2); + "</div>";
		      	}
			},
			{'text' : 'Selling Price','datafield' : 'sellingPrice','width' : '10%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat : 'd2'},

		]
	});
}

$("#historyDetails").click(function () {
	var stockIds = selectedCheckBox();
	console.log(stockIds.length);
	if(stockIds.length == 0){
		$.growl.error({
			message : "Please Select at least one Stock No !!!",
			duration : 10000,
			title  : 'Error'
		});
		return false;
	}else{
		var params = {
			"fieldFilters":{
				"stockNo":stockIds.toString()
			}
		}
		postJSON('/OrderExecution/api/v1/getFGStockItemHistory?mode=Export',JSON.stringify(params),function(response) {
			if(response.resCode == 1){
				var data = response.payload.list;
				itemHistoryGrid(data);
				$('#jqxgridHist').show();
			}else{
				itemHistoryGrid();
				$('#jqxgridHist').show();
			}
		});
	}
});

var itemHistoryGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stockNo','type' : 'int','map':'stockNo'},
			{'name' : 'docType','type' : 'string','map':'docType'},
			{'name' : 'docDate','type' : 'date','map':'docDate'},
			{'name' : 'docNo','type' : 'int','map':'docno'},

			{'name' : 'docSrlNo','type' : 'int','map':'docSrlNo'},
			{'name' : 'psrNo','type' : 'int','map':'psrNumber'}, 
			{'name' : 'docStoreDcType','type' : 'string','map':'storeOrDctype'}, 
			{'name' : 'docStoreDcName','type' : 'string','map':'storeOrDcName'},
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridHist").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		showstatusbar: false,
 	    statusbarheight: 30,
 	    showaggregates: true,
		columns : [
			{'text' : 'Stock No','datafield' : 'stockNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Doc Type','datafield' : 'docType','width' : '15%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc Date','datafield' : 'docDate','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
			{'text' : 'Doc No','datafield' : 'docNo','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc Srl No','datafield' : 'docSrlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'PSR No','datafield' : 'psrNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Doc Store/DC','datafield' : 'docStoreDcType','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Doc Store/DC Name','datafield' : 'docStoreDcName','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		]
	});
}

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('stockMasterQueryReport', 'bodySwitcher')"
});