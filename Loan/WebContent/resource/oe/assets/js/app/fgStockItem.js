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


//on load lov's
var onLoadLov = function(){
$.getJSON('/OrderExecution/api/v1/stockReportLOVs?portal=oe ', function(data) {
	var zones = data.payload.zones;
	var segments = data.payload.segments;
	var mainCat = data.payload.categories;
	var subCat = data.payload.subCategories;
	var wtRange = data.payload.fromToWts;
	var status = data.payload.status;
	var priceRange = data.payload.priceRanges;
	var toPriceRange = data.payload.priceRanges;
	var uniq = {};
	var newArray = priceRange.filter(obj => !uniq[obj.from_PriceRange] && (uniq[obj.from_PriceRange] = true));
	var fromSpArr = [];
	var toSpArr = [];
	
	// Sorting Array in Ascending Order
	newArray.sort(function(a, b){
		{return a.from_PriceRange - b.from_PriceRange};
	});
	
	$.each(newArray,function(k,v){
		if(v.from_PriceRange != 0){
			fromSpArr.push(v);
		}
	})
	
	
	// for to selling price range
	var uniq1 = {};
	var newArray1 = toPriceRange.filter(obj => !uniq1[obj.to_PriceRange] && (uniq1[obj.to_PriceRange] = true));
	
	// Sorting Array in Ascending Order
	newArray1.sort(function(a, b){
		{return a.to_PriceRange - b.to_PriceRange};
	});
	
	$.each(newArray1,function(k,v){
		if(v.to_PriceRange != 0){
			toSpArr.push(v);
		}
	});
	

	for( var i = 0; i < status.length-1; i++){ 
	   if ( status[i].name == "Billed" ) {
		   status.splice(i, 1); 
	   }
	}
	
	$("#statusS").empty().append('<option value="" selected>--Select--</option>');
		$.each(status, function(key, val) {
		$("#statusS").append('<option value="' + val.id + '">' + val.name + '</option>');
	});	
		
	$("#storeOrDc").empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.storeOrDc, function(key, val) {
		$("#storeOrDc").append('<option value="' + val.id + '">' + val.name + '</option>');
	});
		
	$("#jewelTypeS").empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.jewelTypes, function(key, val) {
		$("#jewelTypeS").append('<option value="' + val.id + '">' + val.description + '</option>');
	});	
	
	// Zone Lov
	var z = '<select id="zoneObj"  name="zoneObj" class="form-control" multiple="multiple">';
	$.each(zones, function(key, val) {
		z += '<option value="' + val.id + '">' + val.description + '</option>'; 
	});
		
	z += '</select>';
		
	$("#zoneS").html(z);
		
	$("#zoneObj").multiselect({
	includeSelectAllOption : true,
	maxHeight : 250,
	numberDisplayed : 1,
	buttonClass : 'col-md-12 form-control text-left'
	});

	$("#artSegmentS").empty().append('<option value="" selected>--Select--</option>');
	$.each(segments, function(key, val) {
	$("#artSegmentS").append('<option value="' + val.id + '">' + val.description + '</option>');
});	
	
	
	// Main Category Lov
	var m = '<select id="mainCatObj"  name="mainCatObj" class="form-control" multiple="multiple">';
	$.each(mainCat, function(key, val) {
		m += '<option value="' + val.id + '">' + val.description + '</option>'; 
	});
	
	m += '</select>';
	
	$("#mainCatS").html(m);
	
	$("#mainCatObj").multiselect({
	includeSelectAllOption : true,
	maxHeight : 250,
	numberDisplayed : 1,
	buttonClass : 'col-md-12 form-control text-left'
	});
		
	// SubCat Lov
	var c = '<select id="subCatObj"  name="subCatObj" class="form-control" multiple="multiple">';
	$.each(subCat, function(key, val) {
		c += '<option value="' + val.id + '">' + val.description + '</option>';
	});
	
	c += '</select>';
	
	$("#subCatS").html(c);
	
	$("#subCatObj").multiselect({
	includeSelectAllOption : true,
	maxHeight : 250,
	numberDisplayed : 1,
	buttonClass : 'col-md-12 form-control text-left'
	});
	
	// FromTo Wt Range Lov
	/*var w = '<select id="wtRangeObj"  name="wtRangeObj" class="form-control" multiple="multiple">';
	$.each(wtRanges, function(key, val) {
		w += '<option value="' + val.slab + '">' + val.slab + '</option>';
	});
	
	w += '</select>';
	
	$("#wtRangeS").html(w);
	
	$("#wtRangeObj").multiselect({
	includeSelectAllOption : true,
	maxHeight : 250,
	numberDisplayed : 1,
	buttonClass : 'col-md-12 form-control text-left'
	});	*/
	
	var w = '<select id="wtRangeObj" class="form-control" multiple="multiple"></select>';
	$("#wtRangeS").html(w);
	$('#wtRangeObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	// From Wt Lov
	var f = '<select id="fromSpObj"  name="fromSpObj" class="form-control" multiple="multiple">';
	$.each(fromSpArr, function(key, val) {
		f += '<option value="' + val.from_PriceRange + '">' + val.from_PriceRange + '</option>';
	});
	
	f += '</select>';
	
	$("#fromSp").html(f);
	
	$("#fromSpObj").multiselect({
	includeSelectAllOption : true,
	maxHeight : 250,
	//enableFiltering : true,
	numberDisplayed : 1,
	buttonClass : 'col-md-12 form-control text-left'
	});
	
	// To Wt Lov
	var t = '<select id="toSpObj"  name="toSpObj" class="form-control" multiple="multiple">';
	$.each(toSpArr, function(key, val) {
		t += '<option value="' + val.to_PriceRange + '">' + val.to_PriceRange + '</option>';
	});
	
	t += '</select>';
	
	$("#toSp").html(t);
	
	$("#toSpObj").multiselect({
	includeSelectAllOption : true,
	maxHeight : 250,
	//enableFiltering : true,
	numberDisplayed : 1,
	buttonClass : 'col-md-12 form-control text-left'
	});
	});
}
onLoadLov();

/*//onchange of status 
$("#statusS").on('change',function(){
	if($(this).val()=="A"){
		$('#fromDateS').attr("disabled",true);
		$('#toDateS').attr("disabled",true);
		$('#fromDateS').removeClass('dateBackground');
		$('#toDateS').removeClass('dateBackground');
		$('#fromDateS').val("");
		$('#toDateS').val("");
	}else{
		$('#fromDateS').attr("disabled",false);
		$('#toDateS').attr("disabled",false);
		$('#fromDateS').addClass('dateBackground');
		$('#toDateS').addClass('dateBackground');
	}
})*/

//on change of store/dc load Store/Dc Name and zone
$("#storeDc").hide();
$("#storeOrDc").on('change',function(){
	var type = $("#storeOrDc").val();
	$.getJSON('/OrderExecution/api/v1/getStoreDcsFStk?type=' + type,function(data) {
		$("#storeDc").show();
		var storeDc = data.payload.allStoreOrDc;
		if (type != "") {
			// Size Lov
			var d = '<select id="storeDcObj"  name="storeDcObj" class="form-control" multiple="multiple">';
			$.each(storeDc, function(key, val) {
				d += '<option value="' + val.id + '">' + val.name + '</option>';
			});
			
			d += '</select>';
			
			$("#storeDcNameS").html(d);
			
			$("#storeDcObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	  }
	});
	
	// Zone Lov
	var params ={"fieldFilters":
	 	{
		"storeOrDcType":$("#storeOrDc").val(),
	 	}
	}
	postJSON('/OrderExecution/api/v1/getZonesForStkIt', JSON.stringify(params), function(data) {
		var z = '<select id="zoneObj"  name="zoneObj" class="form-control" multiple="multiple">';
		$.each(data.payload.zones, function(key, val) {
			z += '<option value="' + val.id + '">' + val.description + '</option>'; 
		});
			
		z += '</select>';
			
		$("#zoneS").html(z);
			
		$("#zoneObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	});	
});


//on change of stoe/dc Name load zone
$("#storeDcNameS").on('change',function(){
	var storeDcObj = $("#storeDcObj").val();
	console.log(storeDcObj);
	storeDcObj = storeDcObj.join(',');
	var params ={"fieldFilters":
		 {
			"storeOrDcType":$("#storeOrDc").val(),
			"storeOrDcs" : storeDcObj.toString()
		 }
	}
	postJSON('/OrderExecution/api/v1/getZonesForStkIt', JSON.stringify(params), function(data) {
		var z = '<select id="zoneObj"  name="zoneObj" class="form-control" multiple="multiple">';
		$.each(data.payload.zones, function(key, val) {
			z += '<option value="' + val.id + '">' + val.description + '</option>'; 
		});
			
		z += '</select>';
			
		$("#zoneS").html(z);
			
		$("#zoneObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	});	
});



// on change of segment load Jewel type
$("#artSegmentS").on('change',function(){
	var segmentObj = $("#artSegmentS").val();
	console.log(typeof segmentObj);
	var params = {
			"fieldFilters": {
			"type": "jewelType",
		    "segment": {
		      "id": segmentObj,
		    }
		 }
	  }
	postJSON('/OrderExecution/api/v1/onloadDisassembleCreate', JSON.stringify(params), function(data) {
		$("#jewelTypeS").empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.jeweltypes, function(key, val) {
			$('#jewelTypeS').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});	
	
	if(segmentObj != "" || segmentObj != null){
		$.getJSON('/OrderExecution/api/v1/stockReportPriceRanges?segment=' + segmentObj,function(data) {
			var fromToWtRanges = data.payload.priceRanges;
			 console.log(fromToWtRanges.length);
			if(fromToWtRanges.length == 0){
				$.growl.error({
					message : "Price Ranges Not Found " ,
					duration : 10000,
					title : 'Error'
				});
				
				var from = '<select id="fromSpObj" class="form-control" multiple="multiple"></select>';
				$("#fromSp").html(from);
				$('#fromSpObj').multiselect({
					includeSelectAllOption : true,
					enableFiltering : false,
					maxHeight : 250,
					numberDisplayed : 1,
				    buttonClass : 'col-md-12 form-control text-left'
				});
				
				var to = '<select id="toSpObj" class="form-control" multiple="multiple"></select>';
				
				$("#toSp").html(to);
				$('#toSpObj').multiselect({
					includeSelectAllOption : true,
					enableFiltering : false,
					maxHeight : 250,
					numberDisplayed : 1,
				    buttonClass : 'col-md-12 form-control text-left'
				});
				return false;
			}else{
				// From Wt Lov
				var f = '<select id="fromSpObj"  name="fromSpObj" class="form-control" multiple="multiple">';
				$.each(data.payload.priceRanges, function(key, val) {
					f += '<option value="' + val.from_PriceRange + '">' + val.from_PriceRange + '</option>';
				});
				
				f += '</select>';
				
				$("#fromSp").html(f);
				
				$("#fromSpObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				//enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
				
				// To Wt Lov
				var t = '<select id="toSpObj"  name="toSpObj" class="form-control" multiple="multiple">';
				$.each(data.payload.priceRanges, function(key, val) {
					t += '<option value="' + val.to_PriceRange + '">' + val.to_PriceRange + '</option>';
				});
				
				t += '</select>';
				
				$("#toSp").html(t);
				
				$("#toSpObj").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				//enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		});
		
		$.getJSON('/OrderExecution/api/v1/stockReportLOVs?segmentId='+segmentObj,function(data) {
			// FromTo Wt Range Lov
			var w = '<select id="wtRangeObj"  name="wtRangeObj" class="form-control" multiple="multiple">';
			$.each(data.payload.weightRange, function(key, val) {
				w += '<option value="' + val.fromToRange + '">' + val.fromToRange + '</option>';
			});
			
			w += '</select>';
			
			$("#wtRangeS").html(w);
			
			$("#wtRangeObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});			
			
		});
	}
});


$("#size").hide();
$("#length").hide();

// on change of jewel type load size and length
$("#jewelTypeS").on('change',function(){
	var jType = $("#jewelTypeS").val();
	$.getJSON('/OrderExecution/api/v1/getLengthSizeList?jewelTypeId=' + jType,function(data) {
		$("#size").show();
		$("#length").show();
		var size = data.payload.sizeList;
		var length = data.payload.lengthList;
		if (jType != "") {
			// Size Lov
			var s = '<select id="sizeObj"  name="sizeObj" class="form-control" multiple="multiple">';
			$.each(size, function(key, val) {
				s += '<option value="' + val.size + '">' + val.size + '</option>';
			});
			
			s += '</select>';
			
			$("#sizeS").html(s);
			
			$("#sizeObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
			
			 // Length Lov
			var l = '<select id="lengthObj"  name="lengthObj" class="form-control" multiple="multiple">';
			$.each(length, function(key, val) {
				l += '<option value="' + val.length + '" idE = '+ val.length +'>' + val.length + '</option>'
			});
			
			l += '</select>';
			
			$("#lengthS").html(l);
			
			$("#lengthObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
			
			// Main Category Lov
			var catfieldFilters = {
					  "fieldFilters": {
					    "type": "segCategory",
					    "segment": {
					      "id": $("#artSegmentS").val(),
					    },
					    "jewel": {
						      "id": jType,
						    }
					  }
					}
			
			postJSON('/OrderExecution/api/v1/onloadDisassembleCreate',JSON.stringify(catfieldFilters),function(data) {
			var m = '<select id="mainCatObj"  name="mainCatObj" class="form-control" multiple="multiple">';
			$.each(data.payload.maincats, function(key, val) {
				m += '<option value="' + val.id + '">' + val.description + '</option>'; 
			});
			
			m += '</select>';
			
			$("#mainCatS").html(m);
			
			$("#mainCatObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		});
	  }
  });
});

//on change of main Category load Sub Category
$("#mainCatS").on('change',function(){
	var mainCatObj = $("#mainCatObj").val();
	mainCatObj = mainCatObj.join(',');
	var params = {
			  "fieldFilters": {
				    "type": "subCat",
				    "segment": {
				      "id": $("#artSegmentS").val(),
				    },
				    "category": {
					      "id":  mainCatObj.toString(),
					    },
					    "jewel":{"id":$("#jewelTypeS").val()}
				  }
				}
	postJSON('/OrderExecution/api/v1/onloadDisassembleCreate', JSON.stringify(params), function(data) {
		 // Sub Cat Lov
		var s = '<select id="subCatObj"  name="subCatObj" class="form-control" multiple="multiple">';
		$.each(data.payload.subCats, function(key, val) {
			s += '<option value="' + val.id + '">' + val.description + '</option>';
		});
		
		s += '</select>';
		
		$("#subCatS").html(s);
		
		$("#subCatObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
	 });
	});	
});


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



//Field Filters
var fgStockItemFieldFilters = function() {
	var statusS = $("#statusS").val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var storeOrDc = $('#storeOrDc').val();
	var zoneS = $('#zoneS').val();
	var artSegmentS = $('#artSegmentS').val();
	var mainCatS = $('#mainCatS').val();
	var subCatS = $('#subCatS').val();
	var artCode = $('#artCode').val();
	var jewelTypeS =$("#jewelTypeS").val();
	var wtRangeS =$("#wtRangeS").val();
	var sizeS =$("#sizeS").val();
	var size = sizeData();
	var length = lengthData();
	var lengthS =$("#lengthS").val();
	var fromSp = $("#fromSpObj").val();
	var toSp = $("#toSpObj").val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	console.log(length);
	
	if(statusS != "" && statusS != null){
		fieldFilters.fieldFilters["status"] = statusS
	}
		
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (storeOrDc != "" && storeOrDc != null) {
		fieldFilters.fieldFilters["storeDcType"] = storeOrDc;
	}
	var storeDcObj = $("#storeDcObj").val();
	if(storeDcObj == null || storeDcObj == ""){
		var storeDcNameS = "";
	} else{
		var storeDcNameS = storeDcObj.join(",");
	}
	if(storeDcNameS != null && storeDcNameS !=""){
		fieldFilters.fieldFilters["storeDcIds"] = storeDcNameS;
	}
	var zoneObj = $('#zoneObj').val();
	if (zoneObj == null || zoneObj == "") {
		var zoneS = "";
	} else {
		var zoneS = zoneObj.join(",");
	}
	if (zoneS != "" && zoneS != null) {
		fieldFilters.fieldFilters["zoneIds"] = zoneS;
	}
	if (artSegmentS != "" && artSegmentS != null) {
		fieldFilters.fieldFilters["segments"] = artSegmentS;
	}
	var mainCatObj = $('#mainCatObj').val();
	if (mainCatObj == null || mainCatObj == "") {
		var mainCatS = "";
	} else {
		var mainCatS = mainCatObj.join(",");
	}
	if (mainCatS != "" && mainCatS != null) {
		fieldFilters.fieldFilters["categories"] = mainCatS;
	}
	var subCatObj = $("#subCatObj").val();
	if(subCatObj == "" || subCatObj == null){
		subCatS = "";
	}
	else{
		subCatS = subCatObj.join(",");
	}
	if(subCatS != "" && subCatS != null){
		fieldFilters.fieldFilters["subCategories"] = subCatS; 
	}
	if(artCode != "" && artCode !=null){
		fieldFilters.fieldFilters["articleCode"] = artCode;
	}
	if(jewelTypeS != "" && jewelTypeS != null){
		fieldFilters.fieldFilters["jewelTypes"] = jewelTypeS;
	}
	var  wtRangeObj = $("#wtRangeObj").val();
	if( wtRangeObj == "" || wtRangeObj == null){
		var wtRangeS = "";
	}else{
		var wtRangeS = wtRangeObj.join(",");
	}
	if(wtRangeS != "" && wtRangeS != null){
		fieldFilters.fieldFilters["wtRanges"] = wtRangeS;
	}
	var sizeObj = $("#sizeObj").val();
	if( sizeObj == "" ||  sizeObj == null){
	 var sizeS	=  "";
	}else{
		var sizeS = sizeObj.join(",");
	}
	if( sizeS != "" &&  sizeS != null){
		fieldFilters.fieldFilters["attributeSizes"] = size;
	}
	var lengthObj = $("#lengthObj").val();
	console.log($("#lengthObj").val());
	if( lengthObj == "" || lengthObj == null ){
		var lengthS = "";
	}else{
		var lengthS = lengthObj.join(",");
	}
	if(lengthS !="" && lengthS != null){
		fieldFilters.fieldFilters["attributeLengths"] = length;
	}
	
	if( fromSp == "" || fromSp == null ){
		var fromSpS = "";
	}else{
		var fromSpS = fromSp.join(",");
	}
	
	if(fromSpS != "" && fromSpS != null){
		fieldFilters.fieldFilters["fromSP"] = fromSpS
	}
	
	if( toSp == "" || toSp == null ){
		var toSpS = "";
	}else{
		var toSpS = toSp.join(",");
	}
	
	if(toSpS != "" && toSpS != null){
		fieldFilters.fieldFilters["toSP"] = toSpS
	}
	
	return fieldFilters;
}



// Search Grid Started
/*function fgStockItemSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'storeDc','type' : 'string','map' : 'currentStoreDcType'},
		{'name' : 'storeDcName','type' : 'string','map' : 'currentStoreDc>name'}, 
		{'name' : 'articleSegment','type' : 'string','map' : 'segment>description'},
		{'name' : 'jewelCode','type' : 'string','map' : 'jewelCode'},
		{'name' : 'mainCat','type' : 'string','map' : 'category>description'},
		{'name' : 'subCat','type' : 'string','map' : 'subCategory>description'}, 
		{'name' : 'artCode','type' : 'string','map' : 'articleCode'},
		{'name' : 'wtRange','type' : 'string','map' : 'wtRange'},
		{'name' : 'uqc','type' : 'string'}, 

		{'name' : 'spRange','type' : 'string','map' : 'sellingPriceRange'}, 
		{'name' : 'length','type' : 'long','map' : 'length'},
		{'name' : 'size','type' : 'long','map' : 'size'},
		{'name' : 'mPurity','type' : 'float','map' : 'meltingPurity'},
		{'name' : 'pcs','type' : 'int','map' : 'pcs'},
		{'name' : 'stockNo','type' : 'int','map' : 'id'}, 
		{'name' : 'jwCode','type' : 'string','map' : 'vendor>name'}, 
		{'name' : 'gWt','type' : 'float','map' : 'grossWt'},
		{'name' : 'nWt','type' : 'float','map' : 'netWt'},
        {'name' : 'stoneComb','type' : 'string','map' : 'stoneComb'},
        {'name' : 'lineItemCost','type' : 'long','map' : 'valueOnQC'},
        {'name' : 'lineItemSp','type' : 'long','map' : 'indecativePrice'},
        {'name' : 'photoNo','type' : 'string','map' : 'photoNumber'},
        {'name' : 'actionId','type' : 'int','map' : 'view'}, 
        {'name' : 'status','type' : 'string','map' : 'status>name'},
        {'name' : 'statusDate','type' : 'date','map' : 'statusDate'},
        {'name' : 'noOfDaysinDcpl','type' : 'int','map' : 'noOfDays'},
        {'name' : 'zone','type' : 'string','map' : ''},
        {'name' : 'toRefDocNo','type' : 'int','map':'grNumber'},
        {'name' : 'srlNo','type' : 'int','map':'grSrlNumber'},
        {'name' : 'designVariations','type' : 'array'}
        ];

	var columns = [
		{'text' : 'Store/DC','datafield' : 'storeDc','width' : '5%',editable : false,cellsalign : 'center',align : 'center',sortable : true},
		{'text' : 'Store/DC Name','datafield' : 'storeDcName','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true,groupable : true},
		{'text' : 'Article Seg','datafield' : 'articleSegment','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Jewel Code','datafield' : 'jewelCode','width' : '4%',editable : false,sortable : true,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Main Cat','datafield' : 'mainCat','width' : '6%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat','datafield' : 'subCat','width' : '12%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
		{'text' : 'Article Code','datafield' : 'artCode','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Wt Range','datafield' : 'wtRange','width' : '4%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Selling Price Range','datafield' : 'spRange','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer:spRange},
		{'text' : 'Length','datafield' : 'length','width' : '4%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Size','datafield' : 'size','width' : '3%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'JW Code','datafield' : 'jwCode','width' : '4%',editable : false,sortable : true,cellsalign : 'center',align : 'center'} ,
		{'text' : 'Stock No','datafield' : 'stockNo','width' : '4%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Melting Purity','datafield' : 'mPurity','width' : '5%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '3%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Gross Wt','datafield' : 'gWt','width' : '4%',editable : false,sortable : true,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '4%',editable : false,sortable : true,cellsformat : 'd3',cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		 { text: 'UQC', datafield: 'uqc',  width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center',
	      	  cellsrenderer: function(row, column, value){
	      		return "<div align='center'style='margin-top:8px;'>Gms</div>";
	      	}  
	        },
		{'text' : 'Stone Comb','datafield' : 'stoneComb','width' : '4.5%',editable : false,sortable : true,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'Line Item Cost','datafield' : 'lineItemCost','width' : '3%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',hidden: true},
		{'text' : 'Line Item Selling Price','datafield' : 'lineItemSp','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'Photo No','datafield' : 'photoNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : '','datafield' : 'actionId','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : viewFgStockItem},
		{'text' : 'Status','datafield' : 'status','width' : '4%',editable : false,sortable : false,cellsalign : 'left',align : 'center',cellsformat : 'd3'},
		{'text' : 'Date','datafield' : 'statusDate','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'To Ref Doc No','datafield' : 'toRefDocNo','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Serial No','datafield' : 'srlNo','width' : '3%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'No of Days in DCPL','datafield' : 'noOfDaysinDcpl','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Zone','datafield' : 'zone','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : '','datafield' : 'designVariations','width' : '8%',cellsalign : 'center',align : 'center', hidden: true}
		];
	showMyGrid(datafields, "/OrderExecution/api/v1/stockItemRepSearch","list", columns,fgStockItemFieldFilters(), updateRows, "");
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
}*/

var spRangeExp;
var spRange = function(row, column, value){
	var fromSp = $("#fromSpObj").val();
	var toSp = $("#toSpObj").val();
	console.log(value);
	
	if(fromSp == null || toSp == null ){
		return '<div class="text-center" style="margin-top: 10px;">' + value + '</div>';
	}else{
		var min = fromSp.reduce(function(a, b) {
		    return Math.min(a, b);
		});
		
		var max = toSp.reduce(function(a, b) {
		    return Math.max(a, b);
		});
		spRangeExp = parseFloat(min).toFixed(2) + "-" + parseFloat(max).toFixed(2);
		return '<div class="text-center" style="margin-top: 10px;">'+ spRangeExp  +'</div>';
	}
}

var viewFgStockItem = function(row, column, value) {
	var photoNo = $("#jqxgrid").jqxGrid('getcellvalue', row, 'photoNo');
	var designVariations = $("#jqxgrid").jqxGrid('getcellvalue', row, 'designVariations');
	
	if(designVariations == null || designVariations == "" || typeof designVariations == "undefined" || designVariations.length == 0){
		return '<a class="btn btn-sm btn-default" disabled data-toggle="modal" data-target="#btnView"  type="button"  href="javascript:void(0);"/><i class="fa fa-eye fa-sm"></i></a>';
	}else{
		return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnView"  type="button" id='
		+ row
		+ ' onclick="fgStockItemView('
		+ row
		+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-sm"></i></a>';
	}
}

$(".modal").on("hidden.bs.modal", function(){
	$('#page-content').removeData();
    $('.pagination').twbsPagination('destroy');
});

var fgStockItemView = function(row) {
	/*var photoNo = $("#jqxgrid").jqxGrid('getcellvalue', row, 'photoNo');
	
	var imagePath = "<a href='/uf/"+photoNo+"' class='thumbnail' target='blank'><img src='/uf/"+photoNo+"' width='40px' height='40px'></a>";
	console.log(photoNo);
	$("#remarksE").html(imagePath);*/
	var designVariations = $("#jqxgrid").jqxGrid('getcellvalue', row, 'designVariations');
	$('#pagination-demo').twbsPagination({
	    totalPages: designVariations.length,
	    visiblePages: "5",
	    onPageClick: function (event, page) {
	    	
	    				
	    	$.each(designVariations, function(k, v){
	    			if((page-1) == k){
	    				console.log(v);
	    				var img =  "<a href='/uf/"+v.name+"' target='_blank'><img src='/uf/"+v.name+"' height='60%' width ='60%' /></a>";
	    				$('#page-content').html(img);
	    			}
				});
	    		
	    }
	});
}

/*$("#search").on('click',function(){
	var status = $("#statusS").val();
	 if(status == "" || status == null){
		 $.growl.error({
			 message :"Please Select Status !!!",
			 duration : 1000,
			 title : 'Error'
		 });
		 return false;
	 }
	 else{
		 	fgStockItemSearchGrid();
		 	$("#jqxgrid").show();
		 }
});*/


var fgStockItemSearchGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'storeDc','type' : 'string','map' : 'currentStoreDcType'},
				{'name' : 'storeDcName','type' : 'string','map' : 'currentStoreDc>name'}, 
				{'name' : 'articleSegment','type' : 'string','map' : 'segment>description'},
				{'name' : 'jewelCode','type' : 'string','map' : 'jewelCode'},
				{'name' : 'mainCat','type' : 'string','map' : 'category>description'},
				{'name' : 'subCat','type' : 'string','map' : 'subCategory>description'}, 
				{'name' : 'artCode','type' : 'string','map' : 'articleCode'},
				{'name' : 'wtRange','type' : 'string','map' : 'wtRange'},
				{'name' : 'uqc','type' : 'string'}, 

				{'name' : 'spRange','type' : 'string','map' : 'sellingPriceRange'}, 
				{'name' : 'length','type' : 'long','map' : 'length'},
				{'name' : 'size','type' : 'long','map' : 'size'},
				{'name' : 'mPurity','type' : 'float','map' : 'meltingPurity'},
				{'name' : 'pcs','type' : 'int','map' : 'pcs'},
				{'name' : 'stockNo','type' : 'int','map' : 'id'}, 
				{'name' : 'jwCode','type' : 'string','map' : 'vendor>name'}, 
				{'name' : 'gWt','type' : 'float','map' : 'grossWt'},
				{'name' : 'nWt','type' : 'float','map' : 'netWt'},
		        {'name' : 'stoneComb','type' : 'string','map' : 'stoneComb'},
		        {'name' : 'lineItemCost','type' : 'long','map' : 'valueOnQC'},
		        {'name' : 'lineItemSp','type' : 'long','map' : 'indecativePrice'},
		        {'name' : 'photoNo','type' : 'string','map' : 'photoNumber'},
		        {'name' : 'actionId','type' : 'int','map' : 'view'}, 
		        {'name' : 'status','type' : 'string','map' : 'status>name'},
		        {'name' : 'statusDate','type' : 'date','map' : 'statusDate'},
		        {'name' : 'noOfDaysinDcpl','type' : 'int','map' : 'noOfDays'},
		        {'name' : 'zone','type' : 'string','map' : ''},
		        {'name' : 'toRefDocNo','type' : 'int','map':'docNo'},
		        {'name' : 'srlNo','type' : 'int','map':'docSrlNo'},
		        {'name' : 'designVariations','type' : 'array'}
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
			{'text' : 'Store/DC','datafield' : 'storeDc','width' : '5%',editable : false,cellsalign : 'center',align : 'center',sortable : true},
			{'text' : 'Store/DC Name','datafield' : 'storeDcName','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : false},
			{'text' : 'Article Seg','datafield' : 'articleSegment','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Jewel Code','datafield' : 'jewelCode','width' : '4%',editable : false,sortable : true,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Main Cat','datafield' : 'mainCat','width' : '6%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub Cat','datafield' : 'subCat','width' : '12%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Article Code','datafield' : 'artCode','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
			{'text' : 'Wt Range','datafield' : 'wtRange','width' : '4%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
			{'text' : 'Selling Price Range','datafield' : 'spRange','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer:spRange},
			{'text' : 'Length','datafield' : 'length','width' : '4%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
			{'text' : 'Size','datafield' : 'size','width' : '3%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
			{'text' : 'JW Code','datafield' : 'jwCode','width' : '4%',editable : false,sortable : true,cellsalign : 'center',align : 'center'} ,
			{'text' : 'Stock No','datafield' : 'stockNo','width' : '4%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
			{'text' : 'Melting Purity','datafield' : 'mPurity','width' : '5%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '3%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
			{'text' : 'Gross Wt','datafield' : 'gWt','width' : '4%',editable : false,sortable : true,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : 'Net Wt','datafield' : 'nWt','width' : '4%',editable : false,sortable : true,cellsformat : 'd3',cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			 { text: 'UQC', datafield: 'uqc',  width: "3%",sortable : false, menu:false, cellsalign : 'center', align:'center',
		      	  cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='margin-top:8px;'>Gms</div>";
		      	}  
		        },
			{'text' : 'Stone Comb','datafield' : 'stoneComb','width' : '4.5%',editable : false,sortable : true,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Line Item Cost','datafield' : 'lineItemCost','width' : '3%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',hidden: true},
			{'text' : 'Line Item Selling Price','datafield' : 'lineItemSp','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Photo No','datafield' : 'photoNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : '','datafield' : 'actionId','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : viewFgStockItem},
			{'text' : 'Status','datafield' : 'status','width' : '4%',editable : false,sortable : false,cellsalign : 'left',align : 'center',cellsformat : 'd3'},
			{'text' : 'Date','datafield' : 'statusDate','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat : 'dd/MM/yyyy'},
			{'text' : 'To Ref Doc No','datafield' : 'toRefDocNo','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			{'text' : 'Serial No','datafield' : 'srlNo','width' : '3%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			{'text' : 'No of Days in DCPL','datafield' : 'noOfDaysinDcpl','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			{'text' : 'Zone','datafield' : 'zone','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			{'text' : '','datafield' : 'designVariations','width' : '8%',cellsalign : 'center',align : 'center', hidden: true}
		]
	});
}

$("#search").on("click",function(){
   var status =	$("#statusS").val();
   if(status == null || status == ""){
		$.growl.error({
			message : "Please fill mandatory field.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		postJSON('/OrderExecution/api/v1/stockItemRepSearch',JSON.stringify(fgStockItemFieldFilters()),function(data) {
			if(data.resCode == "1"){
				fgStockItemSearchGrid(data.payload.list);
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
// Export Functionality
$("#export").on("click",function() {	
	$('#loading').show();
	var statusS = $("#statusS").val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var storeOrDc = $('#storeOrDc').val();
	var zoneS = $('#zoneS').val();
	var artSegmentS = $('#artSegmentS').val();
	var mainCatS = $('#mainCatS').val();
	var subCatS = $('#subCatS').val();
	var artCode = $('#artCode').val();
	var jewelTypeS =$("#jewelTypeS").val();
	var wtRangeS =$("#wtRangeS").val();
	var sizeS =$("#sizeS").val();
	var size = sizeData();
	var length = lengthData();
	var lengthS =$("#lengthS").val();
	var fromSp = $("#fromSpObj").val();
	var toSp = $("#toSpObj").val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	console.log(length);
	
	if(statusS != "" && statusS != null){
		fieldFilters.fieldFilters["status"] = statusS
	}
		
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (storeOrDc != "" && storeOrDc != null) {
		fieldFilters.fieldFilters["storeDcType"] = storeOrDc;
	}
	var storeDcObj = $("#storeDcObj").val();
	if(storeDcObj == null || storeDcObj == ""){
		var storeDcNameS = "";
	} else{
		var storeDcNameS = storeDcObj.join(",");
	}
	if(storeDcNameS != null && storeDcNameS !=""){
		fieldFilters.fieldFilters["storeDcIds"] = storeDcNameS;
	}
	var zoneObj = $('#zoneObj').val();
	if (zoneObj == null || zoneObj == "") {
		var zoneS = "";
	} else {
		var zoneS = zoneObj.join(",");
	}
	if (zoneS != "" && zoneS != null) {
		fieldFilters.fieldFilters["zoneIds"] = zoneS;
	}
	if (artSegmentS != "" && artSegmentS != null) {
		fieldFilters.fieldFilters["segments"] = artSegmentS;
	}
	var mainCatObj = $('#mainCatObj').val();
	if (mainCatObj == null || mainCatObj == "") {
		var mainCatS = "";
	} else {
		var mainCatS = mainCatObj.join(",");
	}
	if (mainCatS != "" && mainCatS != null) {
		fieldFilters.fieldFilters["categories"] = mainCatS;
	}
	var subCatObj = $("#subCatObj").val();
	if(subCatObj == "" || subCatObj == null){
		subCatS = "";
	}
	else{
		subCatS = subCatObj.join(",");
	}
	if(subCatS != "" && subCatS != null){
		fieldFilters.fieldFilters["subCategories"] = subCatS; 
	}
	if(artCode != "" && artCode !=null){
		fieldFilters.fieldFilters["articleCode"] = artCode;
	}
	if(jewelTypeS != "" && jewelTypeS != null){
		fieldFilters.fieldFilters["jewelTypes"] = jewelTypeS;
	}
	var  wtRangeObj = $("#wtRangeObj").val();
	if( wtRangeObj == "" || wtRangeObj == null){
		var wtRangeS = "";
	}else{
		var wtRangeS = wtRangeObj.join(",");
	}
	if(wtRangeS != "" && wtRangeS != null){
		fieldFilters.fieldFilters["wtRanges"] = wtRangeS;
	}
	var sizeObj = $("#sizeObj").val();
	if( sizeObj == "" ||  sizeObj == null){
	 var sizeS	=  "";
	}else{
		var sizeS = sizeObj.join(",");
	}
	if( sizeS != "" &&  sizeS != null){
		fieldFilters.fieldFilters["attributeSizes"] = size;
	}
	var lengthObj = $("#lengthObj").val();
	if( lengthObj == "" || lengthObj == null ){
		var lengthS = "";
	}else{
		var lengthS = lengthObj.join(",");
	}
	if(lengthS !="" && lengthS != null){
		fieldFilters.fieldFilters["attributeLengths"] = length;
	}
	
	if( fromSp == "" || fromSp == null ){
		var fromSpS = "";
	}else{
		var fromSpS = fromSp.join(",");
	}
	
	if(fromSpS != "" && fromSpS != null){
		fieldFilters.fieldFilters["fromSP"] = fromSpS
	}
	
	if( toSp == "" || toSp == null ){
		var toSpS = "";
	}else{
		var toSpS = toSp.join(",");
	}
	
	if(toSpS != "" && toSpS != null){
		fieldFilters.fieldFilters["toSP"] = toSpS
	}
	
		fieldFilters = {
			"fieldFilters" : {
			    "Status":statusS,
				"FromDate" : fromDateS,
				"ToDate" : toDateS,
				"storeOrDC" :storeOrDc ,
				"StoreDCId" :storeDcNameS,
				"zone" : zoneS,
				"SegmentId" :artSegmentS ,
				"SubCategoryId" :subCatS,
				"articleCode" : artCode,
				"JtypeId" :jewelTypeS ,
				"AttLength" :length,
				"FromSellingPrice" :fromSpS ,
				"ToSellingPrice":toSpS,
				"AttSize":size,
				"mode" : "excel",
				"reportName" : "RPT_FG_Stock_Available_Report_Export"
			}
		}
		$.ajax({
			url : 'jasperReport',
			type : 'post',
			data : fieldFilters,
			contentType : "application/x-www-form-urlencoded",
			xhrFields : {
				responseType : "blob"
			},
			success : function(data) {
				console.log(data);
				$('#loading').hide();
				if (navigator.msSaveBlob) {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					navigator.msSaveBlob(file,'FG_Stock_Available.xlsx');
				}else {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					var fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				}
			}
		});


		
		
		/*
		 var sysdate = moment().format('DDMMYYYYHHmmSS');
		
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
						postJSON('/OrderExecution/api/v1/stockItemRepExport',JSON.stringify(fgStockItemFieldFilters()),function(response) {
							
				   if(response != null){
	               data = response.payload.list;
	               $.each(data,function(k,v){
	            	   v.sellingPriceRange = spRangeExp;
	               });
	               console.log(spRangeExp);
	               for (i = 0; i < data.length; i++) {
					newData.push({
						'Store/DC' : (data[i].currentStoreDcType != null) ? data[i].currentStoreDcType : "",
						'Store/DC Name' : (data[i].currentStoreDc!= null) ? data[i].currentStoreDc.name  : "",	
						'Article Segment' : (data[i].segment != null) ? data[i].segment.description : "",
						'Jewel Code' : (data[i].jewelCode != null) ? data[i].jewelCode : "",	
						'Main Category' : (data[i].category!= null) ? data[i].category.description  : "",
						'Sub Category' : (data[i].subCategory != null) ? data[i].subCategory.description : "",
						'Article Code' : (data[i].articleCode != null) ? data[i].articleCode : "",
						'Weight Range' : (data[i].wtRange != null) ? data[i].wtRange : "",
						'Selling Price Range' : spRangeExp,
						'Length' : (data[i].length != null) ? data[i].length : "",
						'Size' : (data[i].size != null) ? data[i].size : "",
						'JW Code' : (data[i].vendor != null) ? data[i].vendor.name : "",
						'Stock No' : (data[i].id != null) ? data[i].id : "",			
						'Melting Purity' : (data[i].meltingPurity != null) ? data[i].meltingPurity : "",
						'Pcs' : (data[i].pcs != null) ? data[i].pcs : "",
						'Gross Wt' : (data[i].grossWt != null) ? data[i].grossWt : "",
						'Net Wt' : (data[i].netWt != null) ? data[i].netWt : "",
						'UQC' : "Gms",		
						'Stone Comb' : (data[i].stoneComb != null) ? data[i].stoneComb : "",
						'Line Item Cost' : (data[i].valueOnQC != null) ? data[i].valueOnQC : "",
						'Line Item Selling Price' : (data[i].indecativePrice != null) ? data[i].indecativePrice : "",
						'Photo No' : (data[i].photoNumber != null) ? data[i].photoNumber : "",
						'View' : (data[i].view != null) ? data[i].view : "",
						'Status' : (data[i].status != null) ? data[i].status.name : "",	
						'Status Date' : (data[i].statusDate != null) ? data[i].statusDate : "",
						 'To Ref Doc No' : (data[i].grNumber != null) ? data[i].grNumber : "",
						'To Ref Doc Sl No' : (data[i].grSrlNumber != null) ? data[i].grSrlNumber : "",
						'No of Days in DCPL' : (data[i].noOfDays != null) ? data[i].noOfDays : "",	
						'Zone' : (data[i].zone != null) ? data[i].zone : "",	
	                   });
							
	               }
	               var opts = [{sheetid:'FG_Stock_Item_Report',header:true}];
	               var res = alasql('SELECT * INTO XLSX("FG Stock Item Report_'+sysdate+'.xlsx",?) FROM ?', [opts,[newData]]);
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
			*/
		


});


$("#clearAll").on('click',function(){
/*	$('#storeDcObj').multiselect("clearSelection");
	$('#zoneObj').multiselect("clearSelection");
	$('#segmentObj').multiselect("clearSelection");
	$('#mainCatObj').multiselect("clearSelection");
	$('#subCatObj').multiselect("clearSelection");
	$('#wtRangeObj').multiselect("clearSelection");
	$('#sizeObj').multiselect("clearSelection");
	$('#lengthObj').multiselect("clearSelection");
	
	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide(); 	*/	
	$('#sizeObj').multiselect("clearSelection");
	$('#lengthObj').multiselect("clearSelection");
	window.location.href="javascript:showContentPage('fgStockItem', 'bodySwitcher')"

});

$('#btnView').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();
});