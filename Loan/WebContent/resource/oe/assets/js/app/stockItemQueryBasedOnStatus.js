$("#gridTabs").hide();

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};


$(".tabDisabledS").addClass("tabDisabled2");
$("#gridTabs").tabs({
	disabled:[]
});

var storeOrDc = [
      { "id": "DC","name": "DC"},
      {"id": "Store","name": "Store"}
      ]


var onLoadLOV = function(){
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
	
	var size = '<select id="sizeObj" class="form-control" multiple="multiple"></select>';
	$("#size").html(size);
	$('#sizeObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var length = '<select id="lengthObj" class="form-control" multiple="multiple"></select>';
	$("#length").html(length);
	$('#lengthObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var pRange = '<select id="priceRangeObj" class="form-control" multiple="multiple"></select>';
	$("#priceRange").html(pRange);
	$('#priceRangeObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var mRange = '<select id="metalWtRangeObj" class="form-control" multiple="multiple"></select>';
	$("#metalWtRange").html(mRange);
	$('#metalWtRangeObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var dRange = '<select id="diaWtRangeObj" class="form-control" multiple="multiple"></select>';
	$("#diaWtRange").html(dRange);
	$('#diaWtRangeObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var stoneComb = '<select id="stoneCombeObj" class="form-control" multiple="multiple"></select>';
	$("#stoneComb").html(stoneComb);
	$('#stoneCombeObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var params = {"fieldFilters":{"type":"onloadLov","portal":"OE"}}
	
	postJSON('/OrderExecution/api/v1/StockItemsQueryBasedOnStatus',JSON.stringify(params),function(response) {
		if(response.resCode == "1"){
			$('#status').empty().append('<option value="" selected>--Select--</option>');
				$.each(response.payload.status, function(key, val) {
			$('#status').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
				
			$('#storeDcType').empty().append('<option value="" selected>--Select--</option>');
				$.each(storeOrDc, function(key, val) {
			$('#storeDcType').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
			
			$('#segment').empty().append('<option value="" selected>--Select--</option>');
				$.each(response.payload.segements, function(key, val) {
			$('#segment').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
				
			var v = '<select id="vendorCodeObj"  name="vendorCodeObj" class="form-control" multiple="multiple">';
			$.each(response.payload.vendorList, function(key, val) {
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

$("#segment").on('change',function(){
	if($("#segment").val() != ""){
		
		if($("#segment option:selected").text() == "Diamond"){
			$("#notDiamd").hide();
			$("#diamnd").show();
		}else{
			$("#diamnd").hide();
			$("#notDiamd").show();
		}
		
		var params = {"fieldFilters":{"type":"jewelType","portal":"OE","segmentId":$("#segment").val()}}
		postJSON('/OrderExecution/api/v1/StockItemsQueryBasedOnStatus',JSON.stringify(params),function(response) {
			if(response.resCode == "1"){
				
				// Jewel Type
				var j = '<select id="jewelTypeObj"  name="jewelTypeObj" class="form-control" multiple="multiple">';
				$.each(response.payload.mjTypes, function(key, val) {
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
				
				// Main Category
				
				var m = '<select id="mainCatObj"  name="mainCatObj" class="form-control" multiple="multiple">';
				$.each(response.payload.mainCatList, function(key, val) {
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
				
				// Stone Combination
				
				var c = '<select id="stoneCombObj"  name="stoneCombObj" class="form-control" multiple="multiple">';
				$.each(response.payload.StoneCombinationList, function(key, val) {
					c += '<option value="' + val.id + '">' + val.name + '</option>'; 
				});
					
				c += '</select>';
					
				$("#stoneComb").html(c);
					
				$("#stoneCombObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
		
		var params = {"fieldFilters":{"type":"PriceRange","portal":"OE","segmentId":$("#segment").val()}}
		postJSON('/OrderExecution/api/v1/StockItemsQueryBasedOnStatus',JSON.stringify(params),function(response) {
			if(response.resCode == "1"){ 
				var p = '<select id="priceRangeObj"  name="priceRangeObj" class="form-control" multiple="multiple">';
				$.each(response.payload.PriceRange, function(key, val) {
					p += '<option value="' + val.from_PriceRange + "-" + val.to_PriceRange + '">' + val.from_PriceRange + "-" + val.to_PriceRange + '</option>'; 
				});
					
				p += '</select>';
					
				$("#priceRange").html(p);
					
				$("#priceRangeObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
		
		loadSubCat();
	}
});

$("#jewelType").on('change',function(){
	loadSubCat();
	
	var jewelTypeObj = $("#jewelTypeObj").val();
	jewelTypeObj = jewelTypeObj.join(',');

	if(jewelTypeObj != ""  && jewelTypeObj != null){
		var params = { "fieldFilters":{ "type":"SLDList","portal":"OE","jtype":jewelTypeObj.toString()}}

		postJSON('/OrderExecution/api/v1/StockItemsQueryBasedOnStatus',JSON.stringify(params),function(response) {
			if(response.resCode == "1"){
				
				var s = '<select id="sizeObj"  name="sizeObj" class="form-control" multiple="multiple">';
				$.each(response.payload.SLDList.payload.sizeList, function(key, val) {
					s += '<option value="' + val + '">' + val + '</option>'; 
				});
					
				s += '</select>';
					
				$("#size").html(s);
					
				$("#sizeObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
				
				var l = '<select id="lengthObj"  name="lengthObj" class="form-control" multiple="multiple">';
				$.each(response.payload.SLDList.payload.lengthList, function(key, val) {
					l += '<option value="' + val + '">' + val + '</option>'; 
				});
					
				l += '</select>';
					
				$("#length").html(l);
					
				$("#lengthObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
		
		var params = { "fieldFilters":{ "type":"weightRange","portal":"OE","segmentId":$("#segment").val(),"jtype":jewelTypeObj.toString()}}
		postJSON('/OrderExecution/api/v1/StockItemsQueryBasedOnStatus',JSON.stringify(params),function(response) {
			if(response.resCode == "1"){
				
				if($("#segment option:selected").text() != "Diamond"){
					var w = '<select id="metalWtRangeObj"  name="metalWtRangeObj" class="form-control" multiple="multiple">';
					$.each(response.payload.weightRange, function(key, val) {
						w += '<option value="' + val.fromToRange + '">' + val.fromToRange + '</option>'; 
					});
						
					w += '</select>';
						
					$("#metalWtRange").html(w);
						
					$("#metalWtRangeObj").multiselect({
					includeSelectAllOption : true,
					maxHeight : 250,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
					});
				}else{
					var d = '<select id="diaWtRangeObj"  name="diaWtRangeObj" class="form-control" multiple="multiple">';
					$.each(response.payload.weightRange, function(key, val) {
						d += '<option value="' + val.fromToRange + '">' + val.fromToRange + '</option>'; 
					});
						
					d += '</select>';
						
					$("#diaWtRange").html(d);
						
					$("#diaWtRangeObj").multiselect({
					includeSelectAllOption : true,
					maxHeight : 250,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
					});
				}
				
				
				
			}
		});
	}
});

$("#mainCat").on('change',function(){
	loadSubCat();
});

var loadSubCat = function(){
	if($("#segment").val() != "" && ($("#jewelTypeObj").val() != "" && $("#jewelTypeObj").val() != null) && ($("#mainCatObj").val() != "" && $("#mainCatObj").val() != null)){
		var jewelTypeObj = $("#jewelTypeObj").val();
		jewelTypeObj = jewelTypeObj.join(',');
		
		var mainCatObj = $("#mainCatObj").val();
		mainCatObj = mainCatObj.join(',');
		
		var params = { "fieldFilters":{ "type":"subCatList","portal":"OE","segmentId":$("#segment").val(),"jtype":jewelTypeObj.toString(),"mcategory":mainCatObj.toString()}}
		postJSON('/OrderExecution/api/v1/StockItemsQueryBasedOnStatus',JSON.stringify(params),function(response) {
			if(response.resCode == "1"){
				var s = '<select id="subCatObj"  name="subCatObj" class="form-control" multiple="multiple">';
				$.each(response.payload.subCatList, function(key, val) {
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
}

$("#search").on('click',function(){
	if($("#storeDcType").val() == "" || $("#segment").val() == "" || $("#storeDcNameObj").val() == null || $("#jewelTypeObj").val() == null
			|| $("#storeDcNameObj").val() == "" || $("#jewelTypeObj").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		activaTab('tab0default');
		$("#gridTabs").show();
		itemDetailsSearch();
		$("#jqxgrid").show(); 
	 }
});

function itemDetailsSearch() {
	var updateRows = function(rowid, newdata, commit) {
		  commit(true);
	}
	var datafields = [
		{'name' : 'id','type' : 'string','map':'id'},
		{'name' : 'store','type' : 'string','map':'storeOrDC'},
		{'name' : 'vCode','type' : 'string','map':'vendor>name'},
		{'name' : 'aSegment','type' : 'string','map' : 'metalSegment>description'},
		{'name' : 'jType','type' : 'string','map':'jewelTypeDTO>description'}, 
		{'name' : 'mainCat','type' : 'string','map' : 'category>description'},
		{'name' : 'subCat','type' : 'string','map' : 'subCategory>description'},
		{'name' : 'artCode','type' : 'string','map' : 'articleType'},
		{'name' : 'purity','type' : 'float','map' : 'skinPurity'},	
		{'name' : 'orderItemMeltingPurity','type' : 'float','map' : 'orderItemMeltingPurity'},

		{'name' : 'pcs','type' : 'int','map' : 'finishedPieces'},
		{'name' : 'gwt','type' : 'float','map' : 'grossWeight'},
		{'name' : 'nwt','type' : 'float','map' : 'finishedNetWeight'},
		{'name' : 'wastage','type' : 'float','map' : 'wastageWt'}, 
		{'name' : 'mcCharges','type' : 'float','map' : 'costMCTotalCost'},
		{'name' : 'sellingPrice','type' : 'float','map' : 'totalSellingPrice'},
		{'name' : 'photoId','type' : 'int','map' : ''},
		{'name' : 'viewPhoto','type' : 'int','map' : ''},
		{'name' : 'status','type' : 'string','map' : 'status'},
		{'name' : 'statusDate','type' : 'string','map':'statusDate'},
		{'name' : 'flag','type' : 'string'},

	 ];

	var columns = [ 
		{'text' : '','datafield' : '',cellsalign : 'center',columntype : 'checkbox',align : 'center','width' : '4%',sortable : false,
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				console.log(newvalue);
				$('#jqxgrid').jqxGrid ('setcellvalue', row, 'flag',  newvalue);
				}
		},
		{'text' : 'flag','datafield' : 'flag','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
		{'text' : 'flag','datafield' : 'orderItemMeltingPurity','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},

		{'text' : 'Stock No','datafield' : 'id','width' : '6%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
		{'text' : 'Store/DC Name','datafield' : 'store','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Vendor Code','datafield' : 'vCode','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 

		{'text' : 'Article Segment','datafield' : 'aSegment','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Jewel Type','datafield' : 'jType','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Main Category','datafield' : 'mainCat','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Sub Category','datafield' : 'subCat','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Article Code','datafield' : 'artCode','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Purity','datafield' : 'purity','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
			cellsrenderer: function(row, column, value){
				 var mPurity = $('#jqxgrid').jqxGrid ('getcellvalue', row, 'orderItemMeltingPurity');
				 var sPurity = $('#jqxgrid').jqxGrid ('getcellvalue', row, 'purity');
				 
				 var purity = "";
				 if(mPurity != null){
					 purity = sPurity.toFixed(2) + "/" + mPurity.toFixed(2);
				 }else{
					 purity  = sPurity.toFixed(2);
				 }
	      		return "<div align='center'style='margin-top:8px;'>" + purity + "</div>";
	      	}
		},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Gross Wt','datafield' : 'gwt','width' : '5%',cellsalign : 'right',cellsformat : 'd3',align : 'center',sortable : false,editable : false}, 

		{'text' : 'Net Wt','datafield' : 'nwt','width' : '5%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable :false,editable : false,},
		{'text' : 'Wastage','datafield' : 'wastage','width' : '5%',cellsalign : 'right',align : 'center',sortable :false,cellsformat : 'd3',editable : false,},
		{'text' : 'Making Charges','datafield' : 'mcCharges','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable :false,editable : false,},
		{'text' : 'Selling Price','datafield' : 'sellingPrice','width' : '7%',cellsalign : 'right',align : 'center','cellsformat' : 'd2',sortable :false,editable : false,},
		{'text' : 'Photo Id','datafield' : 'mRate','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'View Photo','datafield' : 'diaWt','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Status','datafield' : 'status','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Status Date','datafield' : 'statusDate','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		];
	showMyGrid(datafields,"/OrderExecution/api/v1/StockItemsQueryBasedOnStatus", "StkQueryDetails",columns, searchFieldFilters(), updateRows);
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

// Field Filters
var searchFieldFilters = function() {
	var store = $('#storeDcType').val();
	var status = $('#status').val();
	var segment = $('#segment').val();
	var jewelType = $('#jewelType').val();
	var mainCat = $('#mainCat').val();
	var subCat = $('#subCat').val();
	var stockNo = $('#stockNo').val();
	var stoneCombination = $('#stoneCombination').val();
	var vendorCode = $('#vendorCode').val();

	var size = sizeData();
	var length = lengthData();
	
	var priceRange = $('#priceRange').val();
	var metalWtRange = $('#metalWtRange').val();
	var diaWtRange = $('#diaWtRange').val();
	var stoneSeg = $('#stoneSeg').val();

	fieldFilters = {
		"fieldFilters" : {}
	};
	if (store != "" && store != null) {
		fieldFilters.fieldFilters["storeOrDCType"] = store;
	}
	
	var storeDcNameObj = $('#storeDcNameObj').val();
	if (storeDcNameObj == null || storeDcNameObj == "") {
		var storeDcName = "";
	} else {
		var storeDcName = storeDcNameObj.join(",");
	}
	if (storeDcName != "" && storeDcName != null) {
		fieldFilters.fieldFilters["storeOrDCId"] = storeDcName;
	}
	
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segmentId"] = segment;
	}
	
	var jewelTypeObj = $('#jewelTypeObj').val();
	if (jewelTypeObj == null || jewelTypeObj == "") {
		var jewelType = "";
	} else {
		var jewelType = jewelTypeObj.join(",");
	}
	if (jewelType != "" && jewelType != null) {
		fieldFilters.fieldFilters["jTypeIds"] = jewelType;
	}
	
	var mainCatObj = $('#mainCatObj').val();
	if (mainCatObj == null || mainCatObj == "") {
		var mainCatS = "";
	} else {
		var mainCatS = mainCatObj.join(",");
	}
	if (mainCatS != "" && mainCatS != null) {
		fieldFilters.fieldFilters["mainCategoryIds"] = mainCatS;
	}
	
	var subCatObj = $('#subCatObj').val();
	if (subCatObj == null || subCatObj == "") {
		var subCat = "";
	} else {
		var subCat = subCatObj.join(",");
	}
	if (subCat != "" && subCat != null) {
		fieldFilters.fieldFilters["subCategoryIds"] = subCat;
	}
	
	var stoneCombeObj = $('#stoneCombeObj').val();
	if (stoneCombeObj == null || stoneCombeObj == "") {
		var stoneComb = "";
	} else {
		var stoneComb = stoneCombeObj.join(",");
	}
	if (stoneComb != "" && stoneComb != null) {
		fieldFilters.fieldFilters["stoneCombIds"] = stoneComb;
	}
	
	var vendorCodeObj = $('#vendorCodeObj').val();
	if (vendorCodeObj == null || vendorCodeObj == "") {
		var vCode = "";
	} else {
		var vCode = vendorCodeObj.join(",");
	}
	if (vCode != "" && vCode != null) {
		fieldFilters.fieldFilters["vendorIds"] = vCode;
	}
	
	if (stockNo != "" && stockNo != null) {
		fieldFilters.fieldFilters["stock"] = stockNo;
	}
	
	var sizeObj = $('#sizeObj').val();
	if (sizeObj == null || sizeObj == "") {
		var sizeS = "";
	} else {
		var sizeS = sizeObj.join(",");
	}
	if (sizeS != "" && sizeS != null) {
		fieldFilters.fieldFilters["attributeSize"] = size;
	}
	
	var lengthObj = $('#lengthObj').val();
	if (lengthObj == null || lengthObj == "") {
		var lengthS = "";
	} else {
		var lengthS = lengthObj.join(",");
	}
	if (lengthS != "" && lengthS != null) {
		fieldFilters.fieldFilters["attributeLength"] = length;
	}
	
	var priceRangeObj = $('#priceRangeObj').val();
	if (priceRangeObj == null || priceRangeObj == "") {
		var priceRange = "";
	} else {
		var priceRange = priceRangeObj.join(",");
	}
	if (priceRange != "" && priceRange != null) {
		fieldFilters.fieldFilters["priceRange"] = priceRange;
	}
	
	var metalWtRangeObj = $('#metalWtRangeObj').val();
	if (metalWtRangeObj == null || metalWtRangeObj == "") {
		var mWtRange = "";
	} else {
		var mWtRange = metalWtRangeObj.join(",");
	}
	if (mWtRange != "" && mWtRange != null) {
		fieldFilters.fieldFilters["weightRange"] = mWtRange;
	}
	
	var diaWtRangeObj = $('#diaWtRangeObj').val();
	if (diaWtRangeObj == null || diaWtRangeObj == "") {
		var diaWtRange = "";
	} else {
		var diaWtRange = diaWtRangeObj.join(",");
	}
	if (diaWtRange != "" && diaWtRange != null) {
		fieldFilters.fieldFilters["weightRange"] = diaWtRange;
	}

	fieldFilters.fieldFilters["type"] = "search";
	fieldFilters.fieldFilters["portal"] = "OE";
	
	return fieldFilters;
}

var sizeData = function(){
	var size = $("#sizeObj").val();
	var sData = [];
	if(size != "None"){
		$.each(size,function(k,v){
			v = v +  '"';
			sData.push(v);
		})
	}
	else{
		
	}
	return sData.toString();
}

var lengthData = function(){
	var length = $("#lengthObj").val();
	var lData = [];
	if(length != "None"){
		$.each(length,function(k,v){
			v = v +  '"';
			lData.push(v);
		})
	}
	else{
		
	}
	return lData.toString();
}

$("#attributeDetails").click(function () {
	var stockIds = selectedCheckBox();
	if(stockIds.length == 0){
		$.growl.error({
			message : "Please Select at least one Stock No !!!",
			duration : 10000,
			title  : 'Error'
		});
		return false;
	}else{
		$("#tab1default").show();

		var params = {
			"fieldFilters":{
				"type":"mAttributes",
				"portal":"OE",
				"stkItemIds":stockIds.toString()
			}
		}
		
		postJSON('/OrderExecution/api/v1/StockItemsQueryBasedOnStatus',JSON.stringify(params),function(response) {
			if(response.resCode == 1){
				var data = response.payload.mAttributes;
				attributeDetailsGrid(data);
				$('#jqxgridAttr').show();
			}else{
				$.growl.error({
					message : response.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});

var attributeDetailsGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'metalColor','type' : 'string','map':'attMetalColorType'},
			{'name' : 'stoneComb','type' : 'string','map' : 'attributes>combination>name'},
			{'name' : 'skinPurity','type' : 'string','map':'skinPurity'}, 
			{'name' : 'meltingPurity','type' : 'string','map' : 'orderItemMeltingPurity'},
			{'name' : 'length','type' : 'string','map' : 'length'},
			{'name' : 'size','type' : 'string','map' : 'size'},
			{'name' : 'height','type' : 'string','map' : 'attributes>height>id'},
			{'name' : 'diameter','type' : 'string','map' : 'attributes>diameter>id'},
			{'name' : 'width','type' : 'string','map':'attributes>width>id'},
			{'name' : 'loopType','type' : 'string','map':'attributes>loopType>id'}, 
			{'name' : 'hookType','type' : 'string','map':'attributes>hookType>id'},
			{'name' : 'screwType','type' : 'string','map' : 'attributes>screwType>id'},

			{'name' : 'polishType','type' : 'string','map':'attributes>polishType>id'}, 
			{'name' : 'settingType','type' : 'string','map' : 'attributes>settingType>id'},
			{'name' : 'vendArticle','type' : 'string','map' : 'vendor>name'},
			
			
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAttr").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		columns : [
			{'text' : 'Metal Color','datafield' : 'metalColor','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Stone Combination','datafield' : 'stoneComb','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd2'},
			{'text' : 'Melting Purity','datafield' : 'meltingPurity','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd2'},
			{'text' : 'Length','datafield' : 'length','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Size','datafield' : 'size','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Height','datafield' : 'height','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Diameter','datafield' : 'diameter','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Width','datafield' : 'width','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Loop Type','datafield' : 'loopType','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Hook Type','datafield' : 'hookType','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Screw Type','datafield' : 'screwType','width' : '8%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			
			{'text' : 'Polish Type','datafield' : 'polishType','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Setting Type','datafield' : 'settingType','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Vendor Article Code','datafield' : 'vendArticle','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd3'},
		]
	});
}

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
				"type":"stoneDetails",
				"portal":"OE",
				"stkItemIds":stockIds.toString()
			}
		}
		postJSON('/OrderExecution/api/v1/StockItemsQueryBasedOnStatus',JSON.stringify(params),function(response) {
			if(response.resCode == 1){
				var data = response.payload.stoneDetails;
				stoneGrid(data);
				$('#jqxgridStone').show();
			}else{
				$.growl.error({
					message : response.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});

var stoneGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stoneStockNo','type' : 'int','map':'stockItemHeaderId'},
			{'name' : 'stoneSlNo','type' : 'int','map' : 'stockSerialNo'},
			{'name' : 'suppBy','type' : 'string','map' : 'suppliedBy>name'},
			{'name' : 'mainCat','type' : 'string','map' : 'category'},

			{'name' : 'subCat','type' : 'string','map' : 'subCategoryDesc'},
			{'name' : 'stoneCode','type' : 'string','map' : 'stoneCode'},

			{'name' : 'wtRange','type' : 'string','map':'weightRange>id'},
			{'name' : 'clarity','type' : 'float','map' : 'clarity>id'},
			{'name' : 'actualColor','type' : 'int','map':'actualColor>id'}, 
			{'name' : 'colorScale','type' : 'float','map' : 'color>id'},
			{'name' : 'cutGrade','type' : 'string','map' : 'cutGrade>id'},
			
			{'name' : 'stoneWt','type' : 'float','map':'weight'},
			{'name' : 'uqc','type' : 'string','map':'uom'}, 
			{'name' : 'stoneRate','type' : 'float','map' : 'stoneCostRate'},
			{'name' : 'stoneCost','type' : 'float','map':'stoneCost'},
			{'name' : 'stoneCondition','type' : 'string','map' : ''},
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
		showstatusbar: true,
 	    statusbarheight: 30,
 	    showaggregates: true,
		columns : [
			{'text' : 'Stone Stock No','datafield' : 'stoneStockNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Stone Sl No','datafield' : 'stoneSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Supplied By','datafield' : 'suppBy','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Main Cat','datafield' : 'mainCat','width' : '8%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'SubCat/Shape','datafield' : 'subCat','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			
			{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Weight Range','datafield' : 'wtRange','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Actual Color','datafield' : 'actualColor','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false},
			{'text' : 'Color Scale','datafield' : 'colorScale','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,},
			{'text' : 'Stone Wt','datafield' : 'stoneWt','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Stone Rate','datafield' : 'stoneRate','width' : '6%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat : 'd2',
				aggregatesrenderer: function() {        		 
		  			  return '<span style="margin-top: 8px; color: #008800; text-align:right;"><b>Total : </b></span>';
					}
			},
			{'text' : 'Stone Cost','datafield' : 'stoneCost','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['stoneCost'] == null) ? 0 : record['stoneCost'];
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
		//	{'text' : 'Stone Condition','datafield' : 'stoneCondition','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false},
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
				"type":"AccessoryDetails",
				"portal":"OE",
				"stkItemIds":stockIds.toString()
			}
		}
		postJSON('/OrderExecution/api/v1/StockItemsQueryBasedOnStatus',JSON.stringify(params),function(response) {
			if(response.resCode == 1){
				var data = response.payload.AccessoryDetails;
				accGrid(data);
				$('#jqxgridAcc').show();
			}else{
				$.growl.error({
					message : response.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});


var accGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'accSlNo','type' : 'int','map' : 'accessorySrlNumber'},
			{'name' : 'suppBy','type' : 'string','map' : 'suppliedBy>name'},
			{'name' : 'subCat','type' : 'string','map' : 'subCategoryDesc'},
			{'name' : 'accCode','type' : 'string','map' : 'accessoryCode'},

			{'name' : 'pcs','type' : 'int','map' : 'pieces'},
			{'name' : 'accWt','type' : 'float','map':'weight'}, 
			{'name' : 'uqc','type' : 'string','map':'uom>id'}, 
			{'name' : 'accRate','type' : 'float','map' : 'standardRate'},
			{'name' : 'accPrice','type' : 'float','map' : 'costPrice'},
			
			{'name' : 'accCondition','type' : 'string','map':''},
			
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
		showstatusbar: true,
 	    statusbarheight: 30,
 	    showaggregates: true,
		columns : [
			{'text' : 'Acc Sl No','datafield' : 'accSlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Supplied By','datafield' : 'suppBy','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Sub Category','datafield' : 'subCat','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Acc Code','datafield' : 'accCode','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false,
				aggregatesrenderer: function() {        		 
		  			  return '<span style="margin-top: 8px; color: #008800; text-align:right;"><b>Total : </b></span>';
					}
			},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['pcs'] == null) ? 0 : record['pcs'];
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
			{'text' : 'Acc Wt','datafield' : 'accWt','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['accWt'] == null) ? 0 : record['accWt'];
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
			{'text' : 'UQC','datafield' : 'uqc','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Acc Rate','datafield' : 'accRate','width' : '10%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
			},
			{'text' : 'Acc Price','datafield' : 'accPrice','width' : '10%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['accPrice'] == null) ? 0 : record['accPrice'];
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
		]
	});
}

$("#certDetails").click(function () {
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
				"type":"CertificateDetails",
				"portal":"OE",
				"stkItemIds":stockIds.toString()
			}
		}
		
		postJSON('/OrderExecution/api/v1/StockItemsQueryBasedOnStatus',JSON.stringify(params),function(response) {
			if(response.resCode == 1){
				var data = response.payload.CertificateDetails;
				certDetailsGrid(data);
				$('#jqxgridCert').show();
			}else{
				$.growl.error({
					message : response.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});


var certDetailsGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stoneSlNo','type' : 'int','map' : 'stoneSrlNo'},
			{'name' : 'stoneStockNo','type' : 'string','map' : 'stockNo'},
			{'name' : 'labCode','type' : 'string','map' : 'labCode'},
			{'name' : 'labCertNo','type' : 'string','map' : 'labCertificateNo'},

			{'name' : 'viewExtCert','type' : 'int','map' : ''},
			{'name' : 'lsVendCode','type' : 'float','map':'vendorCode'}, 
			{'name' : 'stoneArtCode','type' : 'string','map':'stoneCode'}, 
			{'name' : 'fromToWtRange','type' : 'string','map' : 'wtRange'},
			{'name' : 'Weight','type' : 'float','map' : 'carratWeight'},
			
			{'name' : 'uqc','type' : 'string','map':'uqc'},
			{'name' : 'actColor','type' : 'string','map':'actulaColor'},
			{'name' : 'color','type' : 'string','map':'color'},
			{'name' : 'clarity','type' : 'string','map':'clarity'},
			{'name' : 'cut','type' : 'string','map':'cut'},
			{'name' : 'polish','type' : 'string','map':'polish'},
			{'name' : 'symmetry','type' : 'string','map':'symmentry'},
			{'name' : 'flouroscence','type' : 'string','map':'floresense'},
			
			{'name' : 'depth','type' : 'string','map':'depth'},
			{'name' : 'table','type' : 'string','map':'tablePercentage'},

			{'name' : 'measurement','type' : 'string','map':'mesurments'},
			{'name' : 'treatment','type' : 'string','map':''},
			{'name' : 'status','type' : 'string','map':'status'},

			{'name' : 'statusDate','type' : 'string','map':'refDocDate'},

		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridCert").jqxGrid({
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
			{'text' : 'Stone Sl No','datafield' : 'stoneSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Stone Stock No','datafield' : 'stoneStockNo','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Lab Code','datafield' : 'labCode','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Lab Cert No','datafield' : 'labCertNo','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			//{'text' : 'View External Scanned Certificate','datafield' : 'viewExtCert','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Loose Stone Vendor Code','datafield' : 'lsVendCode','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Stone Article Code','datafield' : 'stoneArtCode','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'From & To Weight Range','datafield' : 'fromToWtRange','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Weight','datafield' : 'Weight','width' : '6%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false},
		
			{'text' : 'Actual Color','datafield' : 'actColor','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Color','datafield' : 'color','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Cut','datafield' : 'cut','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Polish','datafield' : 'polish','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Symmetry','datafield' : 'symmetry','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Fluorescence','datafield' : 'flouroscence','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Depth %','datafield' : 'depth','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			
			{'text' : 'Table %','datafield' : 'table','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Measurements(mm)','datafield' : 'measurement','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Treatment','datafield' : 'treatment','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Status','datafield' : 'status','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Status Date','datafield' : 'statusDate','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
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
				"type":"ItemHistory",
				"portal":"OE",
				"stkItemIds":stockIds.toString()
			}
		}
		postJSON('/OrderExecution/api/v1/StockItemsQueryBasedOnStatus',JSON.stringify(params),function(response) {
			if(response.resCode == 1){
				var data = response.payload.ItemHistory;
				var itemHistArr = [];
				$.each(data,function(k,v){
					if(v.stockNo >0 ){
						itemHistArr.push(v);
					}
				});
				itemHistoryGrid(itemHistArr);
				$('#jqxgridHist').show();
			}else{
				$.growl.error({
					message : response.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});


var itemHistoryGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stockNo','type' : 'int'},
			{'name' : 'refType','type' : 'string'},
			{'name' : 'refNo','type' : 'int'},
			{'name' : 'refSlNo','type' : 'int','map':'refSrlNo'},

			{'name' : 'status','type' : 'string'},
			{'name' : 'date','type' : 'string'}, 
			{'name' : 'amount','type' : 'float'}, 
			{'name' : 'discount','type' : 'float'},
			{'name' : 'grvIgrDoneBy','type' : 'string','map':'grvIgrDocDoneBy'},
			
			{'name' : 'ackBy','type' : 'string','map':'ackBy'},
			{'name' : 'docBy','type' : 'string','map':'docDoneBy'},
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
			{'text' : 'Stock No','datafield' : 'stockNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Ref Type','datafield' : 'refType','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Ref No','datafield' : 'refNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Ref Sl No','datafield' : 'refSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Status','datafield' : 'status','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Date','datafield' : 'date','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'Amount','datafield' : 'amount','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false},
			{'text' : 'Discount','datafield' : 'discount','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'GRV/IGR/DOC Done By','datafield' : 'grvIgrDoneBy','width' : '12%',cellsalign : 'center',align : 'center',sortable :false,editable : false,cellsformat : 'd2'},
			{'text' : 'Acknowledge By','datafield' : 'ackBy','width' : '12%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Document By','datafield' : 'docBy','width' : '14%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		]
	});
}

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('stockItemQueryBasedOnStatus', 'bodySwitcher')"
});