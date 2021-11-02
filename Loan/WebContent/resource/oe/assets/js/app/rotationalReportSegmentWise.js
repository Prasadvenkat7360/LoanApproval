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


$("#dJtype").hide();

var onload = function(){
$.getJSON('/OrderExecution/api/v1/rotationReportOnloadLovs?type=onloadLov', function(data) {

	var jewel1 = '<select id="jewelTypeObjS" class="form-control" multiple="multiple"></select>';
	$("#jewelTypeS").html(jewel1);
	$('#jewelTypeObjS').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var mainCat = '<select id="mainCatObjS" class="form-control" multiple="multiple"></select>';
	$("#mainCatS").html(mainCat);
	$('#mainCatObjS').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var size = '<select id="sizeObjS" class="form-control" multiple="multiple"></select>';
	$("#sizeS").html(size);
	$('#sizeObjS').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var length = '<select id="lengthObjS" class="form-control" multiple="multiple"></select>';
	$("#lengthS").html(length);
	$('#lengthObjS').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var diameter = '<select id="diameterObjS" class="form-control" multiple="multiple"></select>';
	$("#diameterS").html(diameter);
	$('#diameterObjS').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var wtRange = '<select id="wtRangeObjS" class="form-control" multiple="multiple"></select>';
	$("#wtRangeS").html(wtRange);
	$('#wtRangeObjS').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	var dwtRange = '<select id="diaWtRangeObjS" class="form-control" multiple="multiple"></select>';
	$("#diaWtRangeS").html(dwtRange);
	$('#diaWtRangeObjS').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	$('#storeNameS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.storeCodes, function(key, val) {
			$('#storeNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		
	$('#artSegmentS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.mTypes, function(key, val) {
			$('#artSegmentS').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	
		var a = '<select id="vendCodeObjS"  name="vendCodeObjS" class="form-control" multiple="multiple">';
		$.each(data.payload.vCodeList, function(key, val) {
		a += '<option value="' + val.id + '">' + val.name + '</option>'; });
		a += '</select>';
		$("#vendCodeS").html(a);
		$('#vendCodeObjS').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	
	});

}

onload();
var mainCatArr = [];
$("#pMaincat").hide();

$("#artSegmentS").on('change',function(){
	var dwtRange = '<select id="diaWtRangeObjS" class="form-control" multiple="multiple"></select>';
	$("#diaWtRangeS").html(dwtRange);
	$('#diaWtRangeObjS').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	$.getJSON('/OrderExecution/api/v1/rotationReportOnloadLovs?type=jewelType&segmentId='+$("#artSegmentS").val(), function(data) {
		mainCatArr = data.payload.mainCatList;
		if($("#artSegmentS option:selected").text() == "Gold" || $("#artSegmentS option:selected").text() == "Silver"){
			$("#wtRangeObjS").multiselect("enable");
			$("#diaWtRangeObjS").multiselect("disable");
			$("#pMaincat").hide();
		}else{
			if($("#artSegmentS option:selected").text() == "Diamond"){
				$("#pMaincat").show();
				$("#dJtype").show();
				
				$("#wtRangeObjS").multiselect("disable");
				$("#diaWtRangeObjS").multiselect("enable");
			}
			if($("#artSegmentS option:selected").text() == "Platinum"){
				$("#pMaincat").show();
				$("#dJtype").show();
				
				$("#wtRangeObjS").multiselect("disable");
				$("#diaWtRangeObjS").multiselect("enable");
			}
			
		}
		
		var j = '<select id="jewelTypeObjS"  name="jewelTypeObjS" class="form-control" multiple="multiple">';
		$.each(data.payload.mjTypes, function(key, val) {
		j += '<option value="' + val.id + '">' + val.description + '</option>'; });
		j += '</select>';
		$("#jewelTypeS").html(j);
		$('#jewelTypeObjS').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var m = '<select id="mainCatObjS"  name="mainCatObjS" class="form-control" multiple="multiple">';
		$.each(data.payload.mainCatList, function(key, val) {
		m += '<option value="' + val.id + '">' + val.description + '</option>'; });
		m += '</select>';
		$("#mainCatS").html(m);
		$('#mainCatObjS').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	});
	
		$.getJSON('/OrderExecution/api/v1/rotationReportOnloadLovs?type=weightRange&segmentId='+$("#artSegmentS").val(), function(data) {
			
		var w = '<select id="wtRangeObjS"  name="wtRangeObjS" class="form-control" multiple="multiple">';
		$.each(data.payload.weightRange, function(key, val) {
		w += '<option value="' + val.fromToRange + '">' + val.fromToRange + '</option>'; });
		w += '</select>';
		$("#wtRangeS").html(w);
		$('#wtRangeObjS').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
	});
});

$("#jewelTypeS").on('change',function(){
	var jewelTypeObjS = $("#jewelTypeObjS").val();
	jewelTypeObjS = jewelTypeObjS.join(',');
	
	$.getJSON('/OrderExecution/api/v1/rotationReportOnloadLovs?type=SLDList&&jewelType='+jewelTypeObjS.toString(), function(data) {
		
		var s = '<select id="sizeObjS"  name="sizeObjS" class="form-control" multiple="multiple">';
		$.each(data.payload.sizeList, function(key, val) {
		s += '<option value="' + val + '">' + val + '</option>'; });
		s += '</select>';
		$("#sizeS").html(s);
		$('#sizeObjS').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var l = '<select id="lengthObjS"  name="lengthObjS" class="form-control" multiple="multiple">';
		$.each(data.payload.lengthList, function(key, val) {
		l += '<option value="' + val + '">' + val + '</option>'; });
		l += '</select>';
		$("#lengthS").html(l);
		$('#lengthObjS').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var d = '<select id="diameterObjS"  name="diameterObjS" class="form-control" multiple="multiple">';
		$.each(data.payload.DiameterList, function(key, val) {
		d += '<option value="' + val + '">' + val + '</option>'; });
		d += '</select>';
		$("#diameterS").html(d);
		$('#diameterObjS').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	});
	loadDiaWtRange();
});

var mainCatFFArry = [];
$("#mainCatS").on('change',function(){
	var mainCatObjS = $("#mainCatObjS").val();
	mainCatObjS = mainCatObjS.join(',');
	
	var mainCatArry = mainCatObjS.split(',');
	
	console.log(mainCatArry);
	
	var mainCatDesc = [];
	$.each(mainCatArr,function(k,v){
		$.each(mainCatArry,function(key,val){
			if(v.id == val){
				mainCatDesc.push(v.code);
			}
		});
	});
	console.log(mainCatDesc);
	
	mainCatFFArry = mainCatDesc; 
	if($("#artSegmentS option:selected").text() == "Platinum"){
		console.log(mainCatDesc.length);
		if(mainCatDesc.includes("PP")){
			$.growl.error({
				message : " Plain Platinum Cannot be Combined with other main categories !!",
				duration : 1000,
				title : 'Error'
			});
			$("#wtRangeObjS").multiselect("enable");
			$("#diaWtRangeObjS").multiselect("disable");
			$("#mainCatObjS").multiselect("clearSelection");
			
		}else{
			$("#wtRangeObjS").multiselect("disable");
			$("#diaWtRangeObjS").multiselect("enable");
			
			loadDiaWtRange();
		}
	}else{
		if($("#artSegmentS option:selected").text() == "Gold" || $("#artSegmentS option:selected").text() == "Silver"){
			$("#wtRangeObjS").multiselect("enable");
			$("#diaWtRangeObjS").multiselect("disable");
		}else{
			$("#wtRangeObjS").multiselect("disable");
			$("#diaWtRangeObjS").multiselect("enable");
		}
		loadDiaWtRange();
	}
});


var loadDiaWtRange = function(){
	var jewelTypeObjS = $("#jewelTypeObjS").val();
	jewelTypeObjS = jewelTypeObjS.join(',');
	
	var params = {"fieldFilters":{"reportType":"JTMWR","segmentId":$("#artSegmentS").val(),"jtypeIds":jewelTypeObjS}}
	  postJSON('/OrderExecution/api/v1/searchRotationReportSegMetalJtypeOnLoadLovs',JSON.stringify(params),function(response) {
		  if(response.resCode == 1){
			  if($("#artSegmentS option:selected").text() == "Diamond"){
				  var d = '<select id="diaWtRangeObjS"  name="diaWtRangeObjS" class="form-control" multiple="multiple">';
					$.each(response.payload.list, function(key, val) {
					d += '<option value="' + val.fromToRange + '">' + val.jewelType + "-" + val.fromToRange + '</option>'; });
					d += '</select>';
					$("#diaWtRangeS").html(d);
					$('#diaWtRangeObjS').multiselect({
					includeSelectAllOption : true,
					maxHeight : 250,
					//enableFiltering : true,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
					});  
			  }else{
				  if($('#mainCatObjS').val() != null && $('#mainCatObjS').val() != ""){
					  var d = '<select id="diaWtRangeObjS"  name="diaWtRangeObjS" class="form-control" multiple="multiple">';
						$.each(response.payload.list, function(key, val) {
						d += '<option value="' + val.fromToRange + '">' + val.jewelType + "-" + val.fromToRange + '</option>'; });
						d += '</select>';
						$("#diaWtRangeS").html(d);
						$('#diaWtRangeObjS').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						//enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						}); 
				  }
			  }
		  }
	  });
}


var segWiseSearchFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var storeNameS = $('#storeNameS').val();
	var artSegmentS = $('#artSegmentS').val();
	var mainCatS = $('#mainCatS').val();
	var jewelTypeS =$("#jewelTypeS").val();
	var wtRangeS =$("#wtRangeS").val();
	var vendCodeS =$("#vendCodeS").val();

	
	var sizeS =$("#sizeS").val();
	var size = sizeData();
	var length = lengthData();
	var lengthS =$("#lengthS").val();
	var diameterS =$("#diameterS").val();
	var diameter = diameterData();
	console.log(diameter);
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["FromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["ToDate"] = toDateS;
	}
	if (storeNameS != "" && storeNameS != null) {
		fieldFilters.fieldFilters["storeId"] = parseInt(storeNameS);
	}
	if (artSegmentS != "" && artSegmentS != null) {
		fieldFilters.fieldFilters["Asegment"] = artSegmentS;
	}
	
	var jewelTypeObjS = $('#jewelTypeObjS').val();
	if (jewelTypeObjS == null || jewelTypeObjS == "") {
		var jType = "";
	} else {
		var jType = jewelTypeObjS.join(",");
	}
	if (jType != "" && jType != null) {
		fieldFilters.fieldFilters["jewelTypeIds"] = jType;
	}
	
	var vendCodeObjS = $('#vendCodeObjS').val();
	if (vendCodeObjS == null || vendCodeObjS == "") {
		var vcode = "";
	} else {
		var vcode = vendCodeObjS.join(",");
	}
	if (vcode != "" && vcode != null) {
		fieldFilters.fieldFilters["vendorIds"] = vcode;
	}
	
	var mainCatObj = $('#mainCatObjS').val();
	if (mainCatObj == null || mainCatObj == "") {
		var mainCatS = "";
	} else {
		var mainCatS = mainCatObj.join(",");
	}
	if (mainCatS != "" && mainCatS != null) {
		fieldFilters.fieldFilters["mainCategoryIds"] = mainCatS;
	}
	
	var  wtRangeObj = $("#wtRangeObjS").val();
	if( wtRangeObj == "" || wtRangeObj == null){
		var wtRangeS = "";
	}else{
		var wtRangeS = wtRangeObj.join(",");
	}
	
	var  wtRangeDiaObj = $("#diaWtRangeObjS").val();
	if( wtRangeDiaObj == "" || wtRangeDiaObj == null){
		var wtRangeDS = "";
	}else{
		var wtRangeDS = wtRangeDiaObj.join(",");
	}

	if($("#artSegmentS option:selected").text() == "Gold" || $("#artSegmentS option:selected").text() == "Silver" ){
		if(wtRangeS != "" && wtRangeS != null){
			fieldFilters.fieldFilters["weightCostRange"] = wtRangeS;
		}
	}else{
		if($("#artSegmentS option:selected").text() == "Diamond"){
			if(wtRangeDS != "" && wtRangeDS != null){
				fieldFilters.fieldFilters["weightCostRange"] = wtRangeDS;
			}
		}else{
			if($("#artSegmentS option:selected").text() == "Platinum"){
				if(mainCatFFArry.length > 1 && mainCatFFArry.includes("PP")){
					if(wtRangeS != "" && wtRangeS != null){
						fieldFilters.fieldFilters["weightCostRange"] = wtRangeS;
					}
				}else{
					if(wtRangeDS != "" && wtRangeDS != null){
						fieldFilters.fieldFilters["weightCostRange"] = wtRangeDS;
					}
				}
			}
		}
	}
	
	var sizeObj = $("#sizeObjS").val();
	if( sizeObj == "" ||  sizeObj == null){
	 var sizeS	=  "";
	}else{
		var sizeS = sizeObj.join(",");
	}
	if( sizeS != "" &&  sizeS != null){
		fieldFilters.fieldFilters["sizes"] = size;
	}
	
	var lengthObj = $("#lengthObjS").val();
	if( lengthObj == "" || lengthObj == null ){
		var lengthS = "";
	}else{
		var lengthS = lengthObj.join(",");
	}
	if(lengthS !="" && lengthS != null){
		fieldFilters.fieldFilters["Lengths"] = length;
	}
	
	var diameterObjS = $("#diameterObjS").val();
	if( diameterObjS == "" || diameterObjS == null ){
		var diameterS = "";
	}else{
		var diameterS = diameterObjS.join(",");
	}
	if(diameterS !="" && diameterS != null){
		fieldFilters.fieldFilters["Diameters"] = diameter;
	}
	return fieldFilters;
}

var sizeData = function(){
	var size = $("#sizeObjS").val();
	var sData = [];
	//if(size != "None"){
		$.each(size,function(k,v){
			v = v +  '"';
			sData.push(v);
		})
	/*}
	else{
		
	}*/
	return sData.toString();
}

var lengthData = function(){
	var length = $("#lengthObjS").val();
	var lData = [];
	//if(length != "None"){
		$.each(length,function(k,v){
			v = v +  '"';
			lData.push(v);
		})
	/*}
	else{
		
	}*/
	return lData.toString();
}

var diameterData = function(){
	var diameter = $("#diameterObjS").val();
	var diaData = [];
	//if(diaData != "None"){
		$.each(diameter,function(k,v){
			v = v +  '"';
			diaData.push(v);
		})
	/*}
	else{
		
	}*/
	return diaData.toString();
}


/*var segWiseSearchGridWithVendor = function(artSegmentDesc,fromDateS,toDateS){
	var updateRows = function(rowid, newdata, commit) {	
	}

   var  datafields =
        [
        	{'name' : 'storeId','type' : 'string','map' : 'storeName'}, 
    		{'name' : 'vendorId','type' : 'string','map' : 'vendor>name'},

    		{'name' : 'segmentId','type' : 'string','map' : 'articleSegment'},
    		{'name' : 'jtypeId','type' : 'string','map' : 'jewelType'},
    		{'name' : 'mcategory','type' : 'string','map' : 'mainCategory'},
    		{'name' : 'scategory','type' : 'string','map' : 'subCategory'}, 
    		{'name' : 'artCode','type' : 'string','map' : 'articleCode'},
    		{'name' : 'size','type' : 'long','map' : 'size'},
    		{'name' : 'length','type' : 'long','map' : 'length'},
    		{'name' : 'diameter','type' : 'long','map' : 'Diameter'},

    		{'name' : 'weightRange','type' : 'string','map' : 'fromAndToMweight'},
    		{'name' : 'fromMetalWtRange','type' : 'string','map' : 'fromAndToMweight'},
    		{'name' : 'toMetalWtRange','type' : 'string','map' : 'fromAndToMweight'},
    		
    		{'name' : 'pcsAvl','type' : 'int','map' : 'availPcs'},
    		{'name' : 'avlGwt','type' : 'float','map' : 'availGwt'},
    		{'name' : 'avlNwt','type' : 'float','map' : 'availNwt'},
    		{'name' : 'avlVal','type' : 'float','map' : 'availVal'},


    		{'name' : 'salePcs','type' : 'int','map' : 'salePcs'},
    		{'name' : 'saleGwt','type' : 'float','map':'salesGwt'}, 
    		{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'}, 
    		{'name' : 'saleValue','type' : 'float','map' : 'saleVal'},
    		
    		{'name' : 'recPcs','type' : 'int','map' : 'ReceiptPcs'}, 
    		{'name' : 'recGwt','type' : 'float','map' : 'ReceiptGwt'}, 
    		{'name' : 'recNwt','type' : 'float','map' : 'ReceiptNwt'},
    		{'name' : 'recVal','type' : 'float','map' : 'ReceiptValue'},
    	  
    		{'name' : 'wtRotation','type' : 'string','map' : 'weightRotation'},
    	    {'name' : 'totCostSum','type' : 'float','map' : 'totalCostSum'},
    	    {'name' : 'totlSP','type' : 'float','map' : 'totalSellPriceSum'},
    	    {'name' : 'grPerc','type' : 'string','map' : 'gpPerc'},
    	    
    	    
         
        ];
   
    var columns = [
		{'text' : 'Store Name','datafield' : 'storeId','width' : '5%',editable : false,cellsalign : 'center',align : 'center',sortable : true},
		{'text' : 'Vendor Code','datafield' : 'vendorId','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Article Seg','datafield' : 'segmentId','width' : '6%',editable : false,sortable : true,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Jewel Type','datafield' : 'jtypeId','width' : '6%',editable : false,sortable : true,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Main Cat','datafield' : 'mcategory','width' : '9%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat','datafield' : 'scategory','width' : '12%',editable : false,sortable : true,cellsalign : 'left',align : 'center'},
		{'text' : 'Article Code','datafield' : 'artCode','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Size','datafield' : 'size','width' : '3%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Length','datafield' : 'length','width' : '4%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Diameter','datafield' : 'diameter','width' : '4%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		
		{'text' : 'From Metal Wt Range',datafield : 'weightRange',sortable : true,editable : false, width : '5%',cellsalign : 'center',align:'center', filterable: true,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
				var fMetalWtRange = value.split('-');
					return '<div style="text-align:center; margin: 0; color: black; padding-top:10px; height:40px;">' + fMetalWtRange[0] + '</div>';
			 }
		},
		{'text' : 'To Metal Wt Range',datafield : 'toMetalWtRange',sortable : true,editable : false, width : '5%',cellsalign : 'center',align:'center', filterable: true,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
				 var tMetalWtRange = value.split('-');
					return '<div style="text-align:center; margin: 0; color: black; padding-top:10px; height:40px;">' + tMetalWtRange[1] + '</div>';
				
			 }
		},
		{'text' : 'Available Pcs','datafield' : 'pcsAvl','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Available Gr. Wt.','datafield' : 'avlGwt','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'} ,
		{'text' : 'Available N. Wt.','datafield' : 'avlNwt','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'} ,
		{'text' : 'Available Value','datafield' : 'avlVal','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},

		{'text' : 'Sale Pcs','datafield' : 'salePcs','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sale Gr. Wt.','datafield' : 'saleGwt','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'} ,
		{'text' : 'Sale N. Wt.','datafield' : 'saleNwt','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Sale Value','datafield' : 'saleValue','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},

		{'text' : 'Receipt Pcs','datafield' : 'recPcs','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Receipt Gr. Wt.','datafield' : 'recGwt','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'} ,
		{'text' : 'Receipt N. Wt.','datafield' : 'recNwt','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Receipt Value','datafield' : 'recVal','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},

		{'text' : 'Weight Rotation','datafield' : 'wtRotation','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Total Cost Sum','datafield' : 'totCostSum','width' : '3%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'Total Selling Price Sum','datafield' : 'totlSP','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'GP %','datafield' : 'grPerc','width' : '4%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center'},
		
      ];
   
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReport","list", columns,segWiseSearchFieldFilters(), updateRows, "");
    $("#jqxgrid").jqxGrid({    	
    	width : '100%',
        sortable: true,       
    	theme: 'energyblue',
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='background-color: #DAE3EE;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left" style="top: 0px; background-color: #DAE3EE; visibility: visible;font-weight: 600;height: 32px;padding: 5px; border-bottom: 1px solid #a4bed4;"><i class="fa fa-list fa-sm"></i><b>&nbsp;</b>'+artSegmentDesc+' Stock Weight Available v/s Sales & Rotation From '+fromDateS+ ' to ' + toDateS +'</div>');	
		}
    });
}*/

function segWiseSearchGridWithVendor(artSegmentDesc,fromDateS,toDateS) {

	var updateRows = function(rowid, newdata, commit) {

	}
	var datafields =  [
		{'name' : 'storeId','type' : 'string','map' : 'storeName'}, 
		{'name' : 'vendorId','type' : 'string','map' : 'vendor>name'},

		{'name' : 'segmentId','type' : 'string','map' : 'articleSegment'},
		{'name' : 'jtypeId','type' : 'string','map' : 'jewelType'},
		{'name' : 'mcategory','type' : 'string','map' : 'mainCategory'},
		{'name' : 'scategory','type' : 'string','map' : 'subCategory'}, 
		{'name' : 'artCode','type' : 'string','map' : 'articleCode'},

		{'name' : 'weightRange','type' : 'string','map' : 'fromAndToMweight'},
		{'name' : 'fromMetalWtRange','type' : 'string','map' : 'fromAndToMweight'},
		{'name' : 'toMetalWtRange','type' : 'string','map' : 'fromAndToMweight'},
		
		{'name' : 'rrsubDetailsDTO','type' : 'array'}
		];
	var columns = [ 
		{'text' : 'Store Name','datafield' : 'storeId','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : true},
		{'text' : 'Vendor Code','datafield' : 'vendorId','width' : '17%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Article Seg','datafield' : 'segmentId','width' : '8%',editable : false,sortable : true,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Jewel Type','datafield' : 'jtypeId','width' : '15%',editable : false,sortable : true,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Main Cat','datafield' : 'mcategory','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat','datafield' : 'scategory','width' : '20%',editable : false,sortable : true,cellsalign : 'left',align : 'center'},
		{'text' : 'Article Code','datafield' : 'artCode','width' : '8%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		
		{'text' : 'From Metal Wt Range',datafield : 'weightRange',sortable : true,editable : false, width : '5%',cellsalign : 'center',align:'center', filterable: true,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
				var fMetalWtRange = value.split('-');
				var frmMetalWtRange = fMetalWtRange[0];
				var frmMetalWtRange1 = parseFloat(frmMetalWtRange).toFixed(3);
					return '<div style="text-align:center; margin: 0; color: black; padding-top:10px; height:40px;">' + frmMetalWtRange1 + '</div>';
			 }
		},
		{'text' : 'To Metal Wt Range',datafield : 'toMetalWtRange',sortable : true,editable : false, width : '5%',cellsalign : 'center',align:'center', filterable: true,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
				 var tMetalWtRange = value.split('-');
				 var toMetalWtRange = tMetalWtRange[1];
				 var toMetalWtRange1 = parseFloat(toMetalWtRange).toFixed(3);
				 
					return '<div style="text-align:center; margin: 0; color: black; padding-top:10px; height:40px;">' + toMetalWtRange1 + '</div>';
				
			 }
		},
		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReport","list", columns,segWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,       
    	theme: 'energyblue',
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			console.log(artSegmentDesc);
			var me = this;
			var container = $("<div style='background-color: #DAE3EE;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left" style="top: 0px; background-color: #DAE3EE; visibility: visible;font-weight: 600;height: 32px;padding: 5px; border-bottom: 1px solid #a4bed4;"><i class="fa fa-list fa-sm"></i><b>&nbsp;</b>'+artSegmentDesc+' Stock Weight Available v/s Sales & Rotation From '+fromDateS+ ' to ' + toDateS +'</div>');	
		}
	});
	
	var initrowdetails = function(index, parentElement, gridElement, record) {
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.rrsubDetailsDTO;
		var inlineSource = {
			datafields : [
				
				{'name' : 'size','type' : 'long','map' : 'size'},
	    		{'name' : 'length','type' : 'long','map' : 'length'},
	    		{'name' : 'diameter','type' : 'long','map' : 'Diameter'},
				
				{'name' : 'pcsAvl','type' : 'int','map' : 'availPcs'},
	    		{'name' : 'avlGwt','type' : 'float','map' : 'availGwt'},
	    		{'name' : 'avlNwt','type' : 'float','map' : 'availNwt'},
	    		{'name' : 'avlVal','type' : 'float','map' : 'availVal'},


	    		{'name' : 'salePcs','type' : 'int','map' : 'salePcs'},
	    		{'name' : 'saleGwt','type' : 'float','map':'salesGwt'}, 
	    		{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'}, 
	    		{'name' : 'saleValue','type' : 'float','map' : 'saleVal'},
	    		
	    		{'name' : 'recPcs','type' : 'int','map' : 'ReceiptPcs'}, 
	    		{'name' : 'recGwt','type' : 'float','map' : 'ReceiptGwt'}, 
	    		{'name' : 'recNwt','type' : 'float','map' : 'ReceiptNwt'},
	    		{'name' : 'recVal','type' : 'float','map' : 'ReceiptValue'},
	    	  
	    		{'name' : 'wtRotation','type' : 'string','map' : 'weightRotation'},
	    	    {'name' : 'totCostSum','type' : 'float','map' : 'totalCostSum'},
	    	    {'name' : 'totlSP','type' : 'float','map' : 'totalSellPriceSum'},
	    	    {'name' : 'grPerc','type' : 'string','map' : 'gpPerc'},
				],
			id : 'id',
			localdata : data,
			datatype : 'json'
		};
		//if (data.length != 0) {
			grid.jqxGrid({
				source : inlineSource,
				width : "95%",
				autoheight: false, 
				theme: 'energyblue',
				height: '200px',
				enabletooltips : true,
				columnsresize : true,
				columnsheight : 50,
				columns : [  
					{'text' : 'Size','datafield' : 'size','width' : '9%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
					{'text' : 'Length','datafield' : 'length','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
					{'text' : 'Diameter','datafield' : 'diameter','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
					
					{'text' : 'Available Pcs','datafield' : 'pcsAvl','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
					},
					{'text' : 'Available Gr. Wt.','datafield' : 'avlGwt','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var aGwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(aGwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Available N. Wt.','datafield' : 'avlNwt','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var aNwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(aNwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+value+"</div>";
							 }
					      }
					},
					{'text' : 'Available Value','datafield' : 'avlVal','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var aVal = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(aVal).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+value+"</div>";
							 }
					      }
					},

					{'text' : 'Sale Pcs','datafield' : 'salePcs','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Sale Gr. Wt.','datafield' : 'saleGwt','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var sGwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(sGwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Sale N. Wt.','datafield' : 'saleNwt','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var sNwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(sNwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Sale Value','datafield' : 'saleValue','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var sVal = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(sVal).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},

					{'text' : 'Receipt Pcs','datafield' : 'recPcs','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Receipt Gr. Wt.','datafield' : 'recGwt','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var rGwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(rGwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Receipt N. Wt.','datafield' : 'recNwt','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var rNwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(rNwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Receipt Value','datafield' : 'recVal','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var reVal = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(reVal).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},

					{'text' : 'Weight Rotation','datafield' : 'wtRotation','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
						cellsrenderer: function(row, column, value){
							 var wtRot = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(wtRot).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Total Cost Sum','datafield' : 'totCostSum','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var tcSum = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(tcSum).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},
					{'text' : 'Total Selling Price Sum','datafield' : 'totlSP','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var tspSum = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(tspSum).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},
					{'text' : 'GP %','datafield' : 'grPerc','width' : '6%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center',
						cellsrenderer: function(row, column, value){
							 var gpPerc = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(gpPerc).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					}
					],
				showaggregates : false,
				showstatusbar : false,
			 });
		// }
	  }
		$("#jqxgrid").jqxGrid(
		 {		
			rowdetails : true,
			width : '100%',
	        sortable: true,         
	        virtualmode: true,
	     	altrows: true,
	    	theme: 'energyblue',
	    	columnsresize: true, 
			rowsheight : 35,
			initrowdetails : initrowdetails,
			rowdetailstemplate : {
			rowdetails : "<div id='grid' style='margin: 10px;' 'margin-bottom : 10px;' 'margin-top:10px;'></div>",
			rowdetailsheight : 220,
			rowdetailshidden : true
		 },
	});
}


function segWiseSearchGridWithOutVendor(artSegmentDesc,fromDateS,toDateS) {

	var updateRows = function(rowid, newdata, commit) {

	}
	var datafields =  [
		{'name' : 'storeId','type' : 'string','map' : 'storeName'}, 
		{'name' : 'vendorId','type' : 'string','map' : 'vendor>name'},

		{'name' : 'segmentId','type' : 'string','map' : 'articleSegment'},
		{'name' : 'jtypeId','type' : 'string','map' : 'jewelType'},
		{'name' : 'mcategory','type' : 'string','map' : 'mainCategory'},
		{'name' : 'scategory','type' : 'string','map' : 'subCategory'}, 
		{'name' : 'artCode','type' : 'string','map' : 'articleCode'},
		
		{'name' : 'weightRange','type' : 'string','map' : 'fromAndToMweight'},
		{'name' : 'fromMetalWtRange','type' : 'string','map' : 'fromAndToMweight'},
		{'name' : 'toMetalWtRange','type' : 'string','map' : 'fromAndToMweight'},
		
		{'name' : 'rrsubDetailsDTO','type' : 'array'}
		];
	var columns = [ 
		{'text' : 'Store Name','datafield' : 'storeId','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : true},
		{'text' : 'Article Seg','datafield' : 'segmentId','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Jewel Type','datafield' : 'jtypeId','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Main Cat','datafield' : 'mcategory','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat','datafield' : 'scategory','width' : '30%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
		{'text' : 'Article Code','datafield' : 'artCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		
		{'text' : 'From & To Metal/ Dia Wt Range','datafield' : 'weightRange','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReport","list", columns,segWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,       
    	theme: 'energyblue',
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			console.log(artSegmentDesc);
			var me = this;
			var container = $("<div style='background-color: #DAE3EE;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left" style="top: 0px; background-color: #DAE3EE; visibility: visible;font-weight: 600;height: 32px;padding: 5px; border-bottom: 1px solid #a4bed4;"><i class="fa fa-list fa-sm"></i><b>&nbsp;</b>'+artSegmentDesc+' Stock Weight Available v/s Sales & Rotation From '+fromDateS+ ' to ' + toDateS +'</div>');	
		}
	});
	
	var initrowdetails = function(index, parentElement, gridElement, record) {
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.rrsubDetailsDTO;
		var inlineSource = {
			datafields : [
				
				{'name' : 'size','type' : 'long','map' : 'size'},
				{'name' : 'length','type' : 'long','map' : 'length'},
				{'name' : 'diameter','type' : 'long','map' : 'Diameter'},

				
				{'name' : 'pcsAvl','type' : 'int','map' : 'availPcs'},
				{'name' : 'avlGwt','type' : 'float','map' : 'availGwt'},
				{'name' : 'avlNwt','type' : 'float','map' : 'availNwt'},
				{'name' : 'avlVal','type' : 'float','map' : 'availVal'},


				{'name' : 'salePcs','type' : 'int','map' : 'salePcs'},
				{'name' : 'saleGwt','type' : 'float','map':'salesGwt'}, 
				{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'}, 
				{'name' : 'saleValue','type' : 'float','map' : 'saleVal'},
				
				{'name' : 'recPcs','type' : 'int','map' : 'ReceiptPcs'}, 
				{'name' : 'recGwt','type' : 'float','map' : 'ReceiptGwt'}, 
				{'name' : 'recNwt','type' : 'float','map' : 'ReceiptNwt'},
				{'name' : 'recVal','type' : 'float','map' : 'ReceiptValue'},
			  
				{'name' : 'wtRotation','type' : 'string','map' : 'weightRotation'},
			    {'name' : 'totCostSum','type' : 'float','map' : 'totalCostSum'},
			    {'name' : 'totlSP','type' : 'float','map' : 'totalSellPriceSum'},
			    {'name' : 'grPerc','type' : 'float','map' : 'gpPerc'},
				],
			id : 'id',
			localdata : data,
			datatype : 'json'
		};
		//if (data.length != 0) {
			grid.jqxGrid({
				source : inlineSource,
				width : "95%",
				autoheight: false, 
				theme: 'energyblue',
				height: '200px',
				enabletooltips : true,
				columnsresize : true,
				columnsheight : 50,
				columns : [  
					{'text' : 'Size','datafield' : 'size','width' : '9%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
					{'text' : 'Length','datafield' : 'length','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
					{'text' : 'Diameter','datafield' : 'diameter','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
					
					{'text' : 'Available Pcs','datafield' : 'pcsAvl','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
					},
					{'text' : 'Available Gr. Wt.','datafield' : 'avlGwt','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var aGwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(aGwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Available N. Wt.','datafield' : 'avlNwt','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var aNwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(aNwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+value+"</div>";
							 }
					      }
					},
					{'text' : 'Available Value','datafield' : 'avlVal','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var aVal = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(aVal).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+value+"</div>";
							 }
					      }
					},

					{'text' : 'Sale Pcs','datafield' : 'salePcs','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Sale Gr. Wt.','datafield' : 'saleGwt','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var sGwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(sGwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Sale N. Wt.','datafield' : 'saleNwt','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var sNwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(sNwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Sale Value','datafield' : 'saleValue','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var sVal = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(sVal).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},

					{'text' : 'Receipt Pcs','datafield' : 'recPcs','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Receipt Gr. Wt.','datafield' : 'recGwt','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var rGwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(rGwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Receipt N. Wt.','datafield' : 'recNwt','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var rNwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(rNwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Receipt Value','datafield' : 'recVal','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var reVal = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(reVal).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},

					{'text' : 'Weight Rotation','datafield' : 'wtRotation','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
						cellsrenderer: function(row, column, value){
							 var wtRot = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(wtRot).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Total Cost Sum','datafield' : 'totCostSum','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var tcSum = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(tcSum).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},
					{'text' : 'Total Selling Price Sum','datafield' : 'totlSP','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var tspSum = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(tspSum).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},
					{'text' : 'GP %','datafield' : 'grPerc','width' : '6%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center',
						cellsrenderer: function(row, column, value){
							 var gpPerc = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(gpPerc).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					}
					],
				showaggregates : false,
				showstatusbar : false,
			 });
		// }
	  }
		$("#jqxgrid").jqxGrid(
		 {		
			rowdetails : true,
			width : '100%',
	        sortable: true,         
	        virtualmode: true,
	     	altrows: true,
	    	theme: 'energyblue',
	    	columnsresize: true, 
			rowsheight : 35,
			initrowdetails : initrowdetails,
			rowdetailstemplate : {
			rowdetails : "<div id='grid' style='margin: 10px;' 'margin-bottom : 10px;' 'margin-top:10px;'></div>",
			rowdetailsheight : 220,
			rowdetailshidden : true
		 },
	});
}

// Platinum or Diamond
function segWisePDSearchGridWithOutVendor(artSegmentDesc,fromDateS,toDateS) {

	var updateRows = function(rowid, newdata, commit) {

	}
	var datafields =  [
		{'name' : 'storeId','type' : 'string','map' : 'storeName'}, 
		{'name' : 'vendorId','type' : 'string','map' : 'vendor>name'},

		{'name' : 'segmentId','type' : 'string','map' : 'articleSegment'},
		{'name' : 'jtypeId','type' : 'string','map' : 'jewelType'},
		{'name' : 'mcategory','type' : 'string','map' : 'mainCategory'},
		{'name' : 'scategory','type' : 'string','map' : 'subCategory'}, 
		{'name' : 'artCode','type' : 'string','map' : 'articleCode'},
		
		{'name' : 'weightRange','type' : 'string','map' : 'fromAndToMweight'},
		{'name' : 'fromMetalWtRange','type' : 'string','map' : 'fromAndToMweight'},
		{'name' : 'toMetalWtRange','type' : 'string','map' : 'fromAndToMweight'},
		
		{'name' : 'rrsubDetailsDTO','type' : 'array'}
		];
	var columns = [ 
		{'text' : 'Store Name','datafield' : 'storeId','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : true},
		{'text' : 'Article Seg','datafield' : 'segmentId','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Jewel Type','datafield' : 'jtypeId','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Main Cat','datafield' : 'mcategory','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat','datafield' : 'scategory','width' : '30%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
		{'text' : 'Article Code','datafield' : 'artCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		
		{'text' : 'From & To Metal/ Dia Wt Range','datafield' : 'weightRange','width' : '10%',editable : true,sortable : true,cellsalign : 'center',align : 'center'},
		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReport","list", columns,segWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,       
    	theme: 'energyblue',
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			console.log(artSegmentDesc);
			var me = this;
			var container = $("<div style='background-color: #DAE3EE;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left" style="top: 0px; background-color: #DAE3EE; visibility: visible;font-weight: 600;height: 32px;padding: 5px; border-bottom: 1px solid #a4bed4;"><i class="fa fa-list fa-sm"></i><b>&nbsp;</b>'+artSegmentDesc+' Stock Weight Available v/s Sales & Rotation From '+fromDateS+ ' to ' + toDateS +'</div>');	
		}
	});
	
	var initrowdetails = function(index, parentElement, gridElement, record) {
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.rrsubDetailsDTO;
		var inlineSource = {
			datafields : [
				
				{'name' : 'size','type' : 'long','map' : 'size'},
				{'name' : 'length','type' : 'long','map' : 'length'},
				{'name' : 'diameter','type' : 'long','map' : 'Diameter'},

				
				{'name' : 'avJewelDiaPcs','type' : 'int','map' : 'avJewelDiaPcs'},
				{'name' : 'avJewelDiaWt','type' : 'float','map' : 'avJewelDiaWt'},
				{'name' : 'avlVal','type' : 'float','map' : 'availVal'},


				{'name' : 'saleJewelDiaPcs','type' : 'int','map' : 'saleJewelDiaPcs'},
				{'name' : 'saleJewelDiaWt','type' : 'float','map':'saleJewelDiaWt'}, 
				{'name' : 'saleValue','type' : 'float','map' : 'saleVal'},
				
				{'name' : 'recptJewelDiaPcs','type' : 'int','map' : 'recptJewelDiaPcs'}, 
				{'name' : 'recptJewelDiaWt','type' : 'float','map' : 'recptJewelDiaWt'}, 
				{'name' : 'recVal','type' : 'float','map' : 'ReceiptValue'},
			  
				{'name' : 'wtRotation','type' : 'string','map' : 'weightRotation'},
			    {'name' : 'totCostSum','type' : 'float','map' : 'totalCostSum'},
			    {'name' : 'totlSP','type' : 'float','map' : 'totalSellPriceSum'},
			    {'name' : 'grPerc','type' : 'float','map' : 'gpPerc'},
				],
			id : 'id',
			localdata : data,
			datatype : 'json'
		};
		//if (data.length != 0) {
			grid.jqxGrid({
				source : inlineSource,
				width : "95%",
				autoheight: false, 
				theme: 'energyblue',
				height: '200px',
				enabletooltips : true,
				columnsresize : true,
				columnsheight : 50,
				columns : [  
					{'text' : 'Size','datafield' : 'size','width' : '9%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
					{'text' : 'Length','datafield' : 'length','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
					{'text' : 'Diameter','datafield' : 'diameter','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
					
					{'text' : 'Available Jew Pcs','datafield' : 'avJewelDiaPcs','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
					},
					{'text' : 'Available Dia. Wt.','datafield' : 'avJewelDiaWt','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var aGwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(aGwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Available Value','datafield' : 'avlVal','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var aVal = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(aVal).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+value+"</div>";
							 }
					      }
					},

					{'text' : 'Sale Jew Pcs','datafield' : 'saleJewelDiaPcs','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Sale Dia. Wt.','datafield' : 'saleJewelDiaWt','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var sGwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(sGwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Sale Value','datafield' : 'saleValue','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var sVal = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(sVal).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},

					{'text' : 'Receipt Jew Pcs','datafield' : 'recptJewelDiaPcs','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Receipt Dia Wt.','datafield' : 'recptJewelDiaWt','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var rGwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(rGwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Receipt Value','datafield' : 'recVal','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var reVal = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(reVal).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},

					{'text' : 'Weight Rotation','datafield' : 'wtRotation','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
						cellsrenderer: function(row, column, value){
							 var wtRot = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(wtRot).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Total Cost Sum','datafield' : 'totCostSum','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var tcSum = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(tcSum).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},
					{'text' : 'Total Selling Price Sum','datafield' : 'totlSP','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var tspSum = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(tspSum).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},
					{'text' : 'GP %','datafield' : 'grPerc','width' : '6%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center',
						cellsrenderer: function(row, column, value){
							 var gpPerc = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(gpPerc).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					}
					],
				showaggregates : false,
				showstatusbar : false,
			 });
		// }
	  }
		$("#jqxgrid").jqxGrid(
		 {		
			rowdetails : true,
			width : '100%',
	        sortable: true,         
	        virtualmode: true,
	     	altrows: true,
	    	theme: 'energyblue',
	    	columnsresize: true, 
			rowsheight : 35,
			initrowdetails : initrowdetails,
			rowdetailstemplate : {
			rowdetails : "<div id='grid' style='margin: 10px;' 'margin-bottom : 10px;' 'margin-top:10px;'></div>",
			rowdetailsheight : 220,
			rowdetailshidden : true
		 },
	});
}


function segWisePDSearchGridWithVendor(artSegmentDesc,fromDateS,toDateS) {

	var updateRows = function(rowid, newdata, commit) {

	}
	var datafields =  [
		{'name' : 'storeId','type' : 'string','map' : 'storeName'}, 
		{'name' : 'vendorId','type' : 'string','map' : 'vendor>name'},

		{'name' : 'segmentId','type' : 'string','map' : 'articleSegment'},
		{'name' : 'jtypeId','type' : 'string','map' : 'jewelType'},
		{'name' : 'mcategory','type' : 'string','map' : 'mainCategory'},
		{'name' : 'scategory','type' : 'string','map' : 'subCategory'}, 
		{'name' : 'artCode','type' : 'string','map' : 'articleCode'},

		{'name' : 'weightRange','type' : 'string','map' : 'fromAndToMweight'},
		{'name' : 'fromMetalWtRange','type' : 'string','map' : 'fromAndToMweight'},
		{'name' : 'toMetalWtRange','type' : 'string','map' : 'fromAndToMweight'},
		
		{'name' : 'rrsubDetailsDTO','type' : 'array'}
		];
	var columns = [ 
		{'text' : 'Store Name','datafield' : 'storeId','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Vendor Code','datafield' : 'vendorId','width' : '17%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Article Seg','datafield' : 'segmentId','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Jewel Type','datafield' : 'jtypeId','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Main Cat','datafield' : 'mcategory','width' : '12%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat','datafield' : 'scategory','width' : '20%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
		{'text' : 'Article Code','datafield' : 'artCode','width' : '8%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		
		{'text' : 'From Metal Wt Range',datafield : 'weightRange',sortable : true,editable : false, width : '5%',cellsalign : 'center',align:'center', filterable: true,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
				var fMetalWtRange = value.split('-');
				var frmMetalWtRange = fMetalWtRange[0];
				var frmMetalWtRange1 = parseFloat(frmMetalWtRange).toFixed(3);
					return '<div style="text-align:center; margin: 0; color: black; padding-top:10px; height:40px;">' + frmMetalWtRange1 + '</div>';
			 }
		},
		{'text' : 'To Metal Wt Range',datafield : 'toMetalWtRange',sortable : true,editable : false, width : '5%',cellsalign : 'center',align:'center', filterable: true,
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
				 var tMetalWtRange = value.split('-');
				 var toMetalWtRange = tMetalWtRange[1];
				 var toMetalWtRange1 = parseFloat(toMetalWtRange).toFixed(3);
				 
					return '<div style="text-align:center; margin: 0; color: black; padding-top:10px; height:40px;">' + toMetalWtRange1 + '</div>';
				
			 }
		},
		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReport","list", columns,segWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,       
    	theme: 'energyblue',
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			console.log(artSegmentDesc);
			var me = this;
			var container = $("<div style='background-color: #DAE3EE;'></div>");
			toolbar.append(container);
			container.append('<div class="text-left" style="top: 0px; background-color: #DAE3EE; visibility: visible;font-weight: 600;height: 32px;padding: 5px; border-bottom: 1px solid #a4bed4;"><i class="fa fa-list fa-sm"></i><b>&nbsp;</b>'+artSegmentDesc+' Stock Weight Available v/s Sales & Rotation From '+fromDateS+ ' to ' + toDateS +'</div>');	
		}
	});
	
	var initrowdetails = function(index, parentElement, gridElement, record) {
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.rrsubDetailsDTO;
		var inlineSource = {
			datafields : [
				
				{'name' : 'size','type' : 'long','map' : 'size'},
				{'name' : 'length','type' : 'long','map' : 'length'},
				{'name' : 'diameter','type' : 'long','map' : 'Diameter'},

				
				{'name' : 'avJewelDiaPcs','type' : 'int','map' : 'avJewelDiaPcs'},
				{'name' : 'avJewelDiaWt','type' : 'float','map' : 'avJewelDiaWt'},
				{'name' : 'avlVal','type' : 'float','map' : 'availVal'},


				{'name' : 'saleJewelDiaPcs','type' : 'int','map' : 'saleJewelDiaPcs'},
				{'name' : 'saleJewelDiaWt','type' : 'float','map':'saleJewelDiaWt'}, 
				{'name' : 'saleValue','type' : 'float','map' : 'saleVal'},
				
				{'name' : 'recptJewelDiaPcs','type' : 'int','map' : 'recptJewelDiaPcs'}, 
				{'name' : 'recptJewelDiaWt','type' : 'float','map' : 'recptJewelDiaWt'}, 
				{'name' : 'recVal','type' : 'float','map' : 'ReceiptValue'},
			  
				{'name' : 'wtRotation','type' : 'string','map' : 'weightRotation'},
			    {'name' : 'totCostSum','type' : 'float','map' : 'totalCostSum'},
			    {'name' : 'totlSP','type' : 'float','map' : 'totalSellPriceSum'},
			    {'name' : 'grPerc','type' : 'float','map' : 'gpPerc'},
				],
			id : 'id',
			localdata : data,
			datatype : 'json'
		};
		//if (data.length != 0) {
			grid.jqxGrid({
				source : inlineSource,
				width : "95%",
				autoheight: false, 
				theme: 'energyblue',
				height: '200px',
				enabletooltips : true,
				columnsresize : true,
				columnsheight : 50,
				columns : [  
					{'text' : 'Size','datafield' : 'size','width' : '9%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
					{'text' : 'Length','datafield' : 'length','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
					{'text' : 'Diameter','datafield' : 'diameter','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
					
					{'text' : 'Available Jew Pcs','datafield' : 'avJewelDiaPcs','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
					},
					{'text' : 'Available Dia. Wt.','datafield' : 'avJewelDiaWt','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var aGwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(aGwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Available Value','datafield' : 'avlVal','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var aVal = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(aVal).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+value+"</div>";
							 }
					      }
					},

					{'text' : 'Sale Jew Pcs','datafield' : 'saleJewelDiaPcs','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Sale Dia. Wt.','datafield' : 'saleJewelDiaWt','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var sGwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(sGwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Sale Value','datafield' : 'saleValue','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var sVal = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(sVal).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},

					{'text' : 'Receipt Jew Pcs','datafield' : 'recptJewelDiaPcs','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Receipt Dia Wt.','datafield' : 'recptJewelDiaWt','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
						cellsrenderer: function(row, column, value){
							 var rGwt = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(rGwt).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Receipt Value','datafield' : 'recVal','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var reVal = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(reVal).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},

					{'text' : 'Weight Rotation','datafield' : 'wtRotation','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
						cellsrenderer: function(row, column, value){
							 var wtRot = 0.000;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(wtRot).toFixed(3) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
							 }
					      }
					},
					{'text' : 'Total Cost Sum','datafield' : 'totCostSum','width' : '7%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var tcSum = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(tcSum).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},
					{'text' : 'Total Selling Price Sum','datafield' : 'totlSP','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
						cellsrenderer: function(row, column, value){
							 var tspSum = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(tspSum).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					},
					{'text' : 'GP %','datafield' : 'grPerc','width' : '6%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center',
						cellsrenderer: function(row, column, value){
							 var gpPerc = 0.00;
							 if(value == ""){
								 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(gpPerc).toFixed(2) +"</div>"; 
							 }else{
								 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(2)+"</div>";
							 }
					      }
					}
					],
				showaggregates : false,
				showstatusbar : false,
			 });
		// }
	  }
		$("#jqxgrid").jqxGrid(
		 {		
			rowdetails : true,
			width : '100%',
	        sortable: true,         
	        virtualmode: true,
	     	altrows: true,
	    	theme: 'energyblue',
	    	columnsresize: true, 
			rowsheight : 35,
			initrowdetails : initrowdetails,
			rowdetailstemplate : {
			rowdetails : "<div id='grid' style='margin: 10px;' 'margin-bottom : 10px;' 'margin-top:10px;'></div>",
			rowdetailsheight : 220,
			rowdetailshidden : true
		 },
	});
}

$("#toolbarjqxgrid").hide();
$("#search").on("click",function(){
   var fromDateS = $("#fromDateS").val();
   var toDateS = $("#toDateS").val();
   var storeNameS =	$("#storeNameS").val();
   var artSegmentS = $("#artSegmentS").val();
   var artSegmentDesc =  $("#artSegmentS option:selected").text();
   
   if(fromDateS == null || fromDateS == "" || toDateS == null || toDateS == "" || 
		   storeNameS == null || storeNameS == "" || artSegmentS == null || artSegmentS == ""){
		$.growl.error({
			message : "Please fill mandatory field.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		if(artSegmentDesc == "Gold" || artSegmentDesc == "Silver"){
			var vendCodeObjS = $('#vendCodeObjS').val();
			if (vendCodeObjS == null || vendCodeObjS == "") {
				$("#jqxgrid").jqxGrid('clear');
				segWiseSearchGridWithOutVendor(artSegmentDesc,fromDateS,toDateS);
			
				//$("#toolbarjqxgrid").show();
				$("#contentjqxgrid").addClass("contentView");
			}else{
				$("#jqxgrid").jqxGrid('clear');
				
				segWiseSearchGridWithVendor(artSegmentDesc,fromDateS,toDateS);
				$("#jqxgrid").show();
				//$("#toolbarjqxgrid").show();
				$("#contentjqxgrid").addClass("contentView");
			}
		}else{
			if(artSegmentDesc == "Platinum"){
				if($("#mainCatObjS").val() == null || $("#mainCatObjS").val() == ""){
					$.growl.error({
						message : "Please Select Main Category !!",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}else if(artSegmentDesc == "Diamond"){
				if($("#jewelTypeObjS").val() == null || $("#jewelTypeObjS").val() == ""){
					$.growl.error({
						message : "Please Select Mandatory !!",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			}
			var vendCodeObjS = $('#vendCodeObjS').val();
			if (vendCodeObjS == null || vendCodeObjS == "") {
				$("#jqxgrid").jqxGrid('clear');
				segWisePDSearchGridWithOutVendor(artSegmentDesc,fromDateS,toDateS);
				$("#jqxgrid").show();
			
				$("#contentjqxgrid").addClass("contentView");
			}else{
				$("#jqxgrid").jqxGrid('clear');
				
				segWisePDSearchGridWithVendor(artSegmentDesc,fromDateS,toDateS);
				$("#jqxgrid").show();
				$("#contentjqxgrid").addClass("contentView");
			}
		}
	
	}
   
});

$("#clearAll").on('click',function(){
	window.location.href = "javascript:showContentPage('segWiseRotationalReport', 'bodySwitcher')";
});

$("#export").on('click',function(){
	var fieldFilters = segWiseSearchFieldFilters();
     var sysdate = moment().format('DDMMYYYYHHmmSS');
	 var rows = $("#jqxgrid").jqxGrid('getrows');
	 var newData = [];
	 if(typeof rows == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
		}else{	
			$.growl.notice({
				message : "Export In Progress,Please Check in Rotation Report Export ",
				duration : 10000,
				title : 'Error'
			});
			var rows = $("#jqxgrid").jqxGrid('getdatainformation');
			if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/exportStockVendorSegWiseRotation',JSON.stringify(fieldFilters),function(response) {
				if(response.resCode == 1){

				}else{
					
				}
			});
			}
		}
});