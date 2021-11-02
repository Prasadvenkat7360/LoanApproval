/*
	##	Author1 (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Manoranjan Mishra
	##	Date Creation 	: 	09-10-2017(UI)
	## 	Description		:	Loose Stone Stock Check Report 
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

 $("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate:0,
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
		maxDate:0,
});
/*
 $("#status").on("change",function(){
	 var status = $("#status").val();
	 if(status == "A"){
		 $("#fromDateS").prop("disabled",true);
		 $("#toDateS").prop("disabled",true);
	 }else{
		 $("#fromDateS").prop("disabled",false);
		 $("#toDateS").prop("disabled",false);
	 }
 })
*/
 
 $("#gridTabs").hide();

 function activaTab(tab){
     $('.nav-tabs a[href="#' + tab + '"]').tab('show');
     $('.nav-tabs a[href="#' + tab + '"]').click();
 };


 $(".tabDisabledS").addClass("tabDisabled2");
 $("#gridTabs").tabs({
 	disabled:[]
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
 		console.log(v);
 		if(v.flag == true){
 			dataArr1.push(
 					{
 						"stockOrPacketId": v.packetStockNo,
 					    "stockOrPacket": v.packetStock,
 					    "storeOrDcType": v.storeDc,
 					    "storeOrDcId": v.currentStoreDcid
 					}
 				);
 		}
 	});
 	console.log(dataArr1);
 	return dataArr1;
 }

 var stockOrPckt =
	[
		{
		 "id": "stock",
	     "name": "Stock",
		},
		{
		 "id": "packet",
	     "name": "Packet",
		}
	]

 var segment ;
var onLoadAPI = function(flag) {
	
	var storeOrDcType = $("#storeDCS").val();
	$('#status').empty().append('<option value="" selected>--Select--</option>');
	
	var fieldFilters={ "fieldFilters": {}};
	postJSON('/OrderExecution/api/v1/looseStoneStoneLOV ', JSON.stringify(fieldFilters), function(data) {

		    dcStoreName =  data.payload.dcs;
		    storeName =  data.payload.stores;
		    segment = data.payload.segments; 
		    
		    var statusList = data.payload.status;
		    /*var srObj = {"id":"SR","name":"Sales Return"};
		    statusList[statusList.length] = srObj;
	
		    console.log(statusList);*/
		    
		    $.each(statusList,function(key,val){
		    	$("#status").append('<option value="'+val.id+'">'+val.name+'</option>');
		    })
			
		    $('#stockPacket').empty().append('<option value="" selected>--Select--</option>');
		     $.each(stockOrPckt,function(key,val){
		    	$("#stockPacket").append('<option value="'+val.id+'">'+val.name+'</option>');
		     })
		     
	     	var storeDcName = '<select id="storeDcNameObj"  name="storeDcNameObj" class="form-control" multiple="multiple">';   
			storeDcName +='</select>'; 
			$("#storeDcName").html(storeDcName);
			$('#storeDcNameObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
		    
			var clarity = '<select id="clarityObj"  name="clarityObj" class="form-control" multiple="multiple">';   
			clarity +='</select>'; 
			$("#clarity").html(clarity);
			$('#clarityObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
			
			var stoneWeightRange = '<select id="fromToWtRangeObj"  name="fromToWtRangeObj" class="form-control" multiple="multiple">';   
			stoneWeightRange +='</select>'; 
			$("#fromToWtRange").html(stoneWeightRange);
			$('#fromToWtRangeObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
			
			var color = '<select id="colorObj"  name="colorObj" class="form-control" multiple="multiple">';   
			color +='</select>'; 
			$("#color").html(color);
			$('#colorObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});

			
			var actualColor = '<select id="actualColorObj"  name="actualColorObj" class="form-control" multiple="multiple">';   
			actualColor +='</select>'; 
			$("#actualColor").html(actualColor);
			$('#actualColorObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});

			
			var cut = '<select id="cutObj"  name="cutObj" class="form-control" multiple="multiple">';   
			cut +='</select>'; 
			$("#cut").html(cut);
			$('#cutObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
			
			var V = '<select id="vendorObj"  name="vendorObj" class="form-control" multiple="multiple">';   
			$.each(data.payload.vendors, function(key, val) {
				V +='<option value="' + val.id + '">' + val.description + '</option>';
			});
			V +='</select>'; 
			$("#vendorCode").html(V);
			$('#vendorObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
			
			/*var zone = '<select id="zoneObj"  name="zoneObj" class="form-control" multiple="multiple">';   
			$.each(data.payload.storeZOnes, function(key, val) {
				zone +='<option value="' + val.id + '">' + val.description + '</option>';
			});
			zone +='</select>'; 
			$("#zone").html(zone);
			$('#zoneObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});*/
			
			var Segment = '<select id="segmentObj"  name="segmentObj" class="form-control" multiple="multiple">';   
			$.each(data.payload.segments, function(key, val) {
				Segment +='<option code="'+val.name+'" value="' + val.id + '">' + val.description + '</option>';
			});
			Segment +='</select>'; 
			$("#segment").html(Segment);
			$('#segmentObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});

			var mainCat = '<select id="mainCatObj"  name="mainCatObj" class="form-control" multiple="multiple">';   
			$.each(data.payload.category, function(key, val) {
				mainCat +='<option value="' + val.id + '">' + val.description + '</option>';
			});
			mainCat +='</select>'; 
			$("#mainCat").html(mainCat);
			$('#mainCatObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
			
		    var labName = '<select id="labNameObj"  name="labNameObj" class="form-control" multiple="multiple">';   
			$.each(data.payload.dlab, function(key, val) {
				labName +='<option value="' + val.id + '">' + val.name + '</option>';
			});
			labName +='</select>'; 
			$("#labName").html(labName);
			$('#labNameObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
			
			
		    if(flag == 2){		
		    var storeOrdc = $("#storeDCS").val();
		    if(storeOrdc == "Store"){
				var storeDcName = '<select id="storeDcNameObj"  name="storeDcNameObj" class="form-control" multiple="multiple">';   
				$.each(storeName, function(key, val) {
					storeDcName +='<option value="' + val.id + '">' + val.name + '</option>';
				});
				storeDcName +='</select>'; 
				$("#storeDcName").html(storeDcName);
				$('#storeDcNameObj').multiselect({ 
		            includeSelectAllOption: true,
		            enableFiltering:false,         
		            maxHeight:250,
		            numberDisplayed:1,
		            buttonClass: 'col-md-12 form-control text-left'
		      	});
			}else if (storeOrdc == "DC"){
				var storeDcName = '<select id="storeDcNameObj"  name="storeDcNameObj" class="form-control" multiple="multiple">';   
				$.each(dcStoreName, function(key, val) {
					storeDcName +='<option value="' + val.id + '">' + val.name + '</option>';
				});
				storeDcName +='</select>'; 
				$("#storeDcName").html(storeDcName);
				$('#storeDcNameObj').multiselect({ 
		            includeSelectAllOption: true,
		            enableFiltering:false,         
		            maxHeight:250,
		            numberDisplayed:1,
		            buttonClass: 'col-md-12 form-control text-left'
		      	});
			}
		 }
	});
}
 
onLoadAPI();

var onLoadLov = function(){
	$.getJSON('/OrderExecution/api/v1/stockReportLOVs?portal=oe ', function(data) {
				
		var zone = '<select id="zoneObj"  name="zoneObj" class="form-control" multiple="multiple">';   
		$.each(data.payload.zones, function(key, val) {
			zone +='<option value="' + val.id + '">' + val.description + '</option>';
		});
		zone +='</select>'; 
		$("#zone").html(zone);
		$('#zoneObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
				
	});
	
}
	onLoadLov();

$('#segment').bind('change',function() {
	var stoneSegmentObj = $("#segmentObj").val();
	var segDesc = $("#segmentObj option:selected").attr('code');
	var map = [];
	$('#segmentObj').find('option:selected').each(function(index, elem) {
	    map.push(elem.label);
	});
	
	console.log(map);
	if($.inArray('Diamond', map)){
		$("#fCostRange").show();
		$("#tCostRange").show();
		$("#hideClarity").hide();
		$("#hideColor").hide();
		$("#hideActual").hide();
		$("#hideCut").hide();
		$("#fromwtS").hide();
	}else{		
		$("#fCostRange").hide();
		$("#tCostRange").hide();
		$("#hideClarity").show();
		$("#hideColor").show();
		$("#hideActual").show();
		$("#hideCut").show();
		$("#fromwtS").show();
	}
	
	stoneSegmentObj = stoneSegmentObj.join(',');
			var params = {
				"fieldFilters" : {
				"sSegId" : stoneSegmentObj.toString()
			}
		};
	  postJSON('/OrderExecution/api/v1/getPMSAMcategory',JSON.stringify(params),function(data) {
			var mainCat = '<select id="mainCatObj"  name="mainCatObj" class="form-control" multiple="multiple">';   
			$.each(data.payload.mainCatList, function(key, val) {
				mainCat +='<option value="' + val.id + '">' + val.code + '</option>';
			});
			mainCat +='</select>'; 
			$("#mainCat").html(mainCat);
			$('#mainCatObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
		});
	  var paramsCostRange = {
				"fieldFilters" : {
				"segMentIds" : stoneSegmentObj.toString()
				}
	  };
	  postJSON('/OrderExecution/api/v1/getCostRangeBySegment',JSON.stringify(paramsCostRange), function(data) {
		  	if(data.resCode == "1"){
		  		var fromTo = '<select id="fromToCostRangeObj"  name="fromToCostRangeObj" class="form-control" multiple="multiple">';   
				$.each(data.payload.stoneCostRange, function(key, val) {
					fromTo +='<option value="' + val.name+ '">' + val.name + '</option>';
				});
				
				fromTo +='</select>'; 
				$("#fromToCostRange").html(fromTo);
				$('#fromToCostRangeObj').multiselect({ 
		            includeSelectAllOption: true,
		            enableFiltering:false,         
		            maxHeight:250,
		            numberDisplayed:1,
		            buttonClass: 'col-md-12 form-control text-left'
		      	});
				
			    var to = '<select id="toCostRangeObj"  name="toCostRangeObj" class="form-control" multiple="multiple">';   
				$.each(data.payload.stoneCostRange, function(key, val) {
					to +='<option value="' + val.description+ '">' + val.description +'</option>';
				});
				
				to +='</select>'; 
				$("#toCostRange").html(to);
				$('#toCostRangeObj').multiselect({ 
		            includeSelectAllOption: true,
		            enableFiltering:false,         
		            maxHeight:250,
		            numberDisplayed:1,
		            buttonClass: 'col-md-12 form-control text-left'
		      	});
		  	}else{
		  		$.growl.error({
					 message : data.mesgStr,
					 duration : 10000,
					 title : 'Error'
				 });
		  	}
		})
});
	
// ################################### On load API for color, cut grade, clarity, actual color and Stone WT Ranges ########################## 

$("#hideClarity").hide();
$("#hideColor").hide();
$("#hideActual").hide();
$("#hideCut").hide();
$("#fromwtS").hide();
$("#fCostRange").hide();
$("#tCostRange").hide();

$("#mainCat").on("change",function(){
	$("#fromwtS").show();
	$("#hideClarity").show();
	$("#hideColor").show();
	$("#hideActual").show();
	$("#hideCut").show();
	
	//$('#fromToWtRange').empty().append('<option value="" selected>--Select--</option>');
	
	var mainCatObj = $("#mainCatObj").val();
	if (mainCatObj == null || mainCatObj == ""){
		var mainCat = "";
	}else{
		var mainCat = mainCatObj.join(",");
	}
	if (mainCat != "" && mainCat != null) {
	
	$.getJSON('/OrderExecution/api/v1/stoneDetailLOV?catId='+mainCat, function(data) {

			/*$.each(data.payload.stoneWeightRange,function(key,val){
			    $("#fromToWtRange").append('<option value="'+val.id+'">'+val.name+'</option>');
			})*/
			
			var clarity = '<select id="clarityObj"  name="clarityObj" class="form-control" multiple="multiple">';   
			$.each(data.payload.clarity, function(key, val) {
				clarity +='<option value="' + val.name + '">' + val.name + '</option>';
			});
			clarity +='</select>'; 
			$("#clarity").html(clarity);
			$('#clarityObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
			
			var stoneWeightRange = '<select id="fromToWtRangeObj"  name="fromToWtRangeObj" class="form-control" multiple="multiple">';   
			$.each(data.payload.stoneWeightRange, function(key, val) {
				stoneWeightRange +='<option value="' + val.id + '">' + val.name + '</option>';
			});
			stoneWeightRange +='</select>'; 
			$("#fromToWtRange").html(stoneWeightRange);
			$('#fromToWtRangeObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
			
			var color = '<select id="colorObj"  name="colorObj" class="form-control" multiple="multiple">';   
			$.each(data.payload.color, function(key, val) {
				color +='<option value="' + val.name + '">' + val.name + '</option>';
			});
			color +='</select>'; 
			$("#color").html(color);
			$('#colorObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});

			
			var actualColor = '<select id="actualColorObj"  name="actualColorObj" class="form-control" multiple="multiple">';   
			$.each(data.payload.ActualColor, function(key, val) {
				actualColor +='<option value="' + val.name + '">' + val.name + '</option>';
			});
			actualColor +='</select>'; 
			$("#actualColor").html(actualColor);
			$('#actualColorObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});

			
			var cut = '<select id="cutObj"  name="cutObj" class="form-control" multiple="multiple">';   
			$.each(data.payload.cutgrade, function(key, val) {
				cut +='<option value="' + val.name + '">' + val.name + '</option>';
			});
			cut +='</select>'; 
			$("#cut").html(cut);
			$('#cutObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
     	});
	}
})

// ################################### On load API call for Loading store or dc ##########################

var storeOrdc = $("#storeDCS").val();
$("#storeDCS").on("change",function(){
	$("#zoneS").show();
	
	//onLoadAPI(2);
	var type = $("#storeDCS").val();
	$.getJSON('/OrderExecution/api/v1/getStoreDcsFStk?type=' + type,function(data) {
		if(data.resCode == 1){
			var storeDc = data.payload.allStoreOrDc;
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
	
	// Zone Lov
	var params ={"fieldFilters":{"storeOrDcType":$("#storeDCS").val()}};
	
	postJSON('/OrderExecution/api/v1/getZonesForStkIt', JSON.stringify(params), function(data) {
		var z = '<select id="zoneObj"  name="zoneObj" class="form-control" multiple="multiple">';
		$.each(data.payload.zones, function(key, val) {
			z += '<option value="' + val.id + '">' + val.description + '</option>'; 
		});
			
		z += '</select>';
			
		$("#zone").html(z);
			
		$("#zoneObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	});	
	var stkPcktArr = [
			{
			 "id": "stock",
		     "name": "Stock",
			},
		]
	
	$('#stockPacket').empty().append('<option value="" selected>--Select--</option>');
	if($("#storeDCS").val() == "Store"){
	     $.each(stkPcktArr,function(key,val){
	    	$("#stockPacket").append('<option value="'+val.id+'">'+val.name+'</option>');
	     })
	}else{
	     $.each(stockOrPckt,function(key,val){
	    	$("#stockPacket").append('<option value="'+val.id+'">'+val.name+'</option>');
	     })
	}
	
})
// ################################### ON Change function for loading the ZONES ##########################

var storeDcName = $("#storeDCS").val();
$("#storeDcName").on("change",function(){
	var storeDcNameObj= $("#storeDcNameObj").val();
	var storeNameS = storeDcNameObj.join(",");
	var params = {
			"fieldFilters" : {
				"dcorStore" : $("#storeDCS").val(),
				"ids" : storeNameS
			}
		}; 
	postJSON('/OrderExecution/api/v1/zoneLOV', JSON.stringify(params), function(data) {
		var zone = '<select id="zoneObj"  name="zoneObj" class="form-control" multiple="multiple">';   
		$.each(data.payload.storeOrdDc, function(key, val) {
			zone +='<option value="' + val.id + '">' + val.description + '</option>';
		});
		zone +='</select>'; 
		$("#zone").html(zone);
		$('#zoneObj').multiselect({ 
		    includeSelectAllOption: true,
		    enableFiltering:false,         
		    maxHeight:250,
		    numberDisplayed:1,
		    buttonClass: 'col-md-12 form-control text-left'
		});
    });
})

//############################################## Search grid function. #####################################

var looseStoneStockItemFieldFilters = function() {
	
	 var fromDateS = $("#fromDateS").val();
	 var toDateS = $("#toDateS").val();
	// var fromCostRange = $("#fromCostRange").val();
	// var toCostRange = $("#toCostRange").val();
	 
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["startDate"] = fromDateS;
	}
		
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["endDate"] = toDateS;
	}
		
	/*if (fromCostRange != "" && fromCostRange != null) {
		fieldFilters.fieldFilters["fromcost"] = fromCostRange;
	}
	
	if (toCostRange != "" && toCostRange != null) {
		fieldFilters.fieldFilters["tocost"] = toCostRange;
	}
	*/
    var fromToCostRangeObj = $("#fromToCostRangeObj").val();
	
	if(fromToCostRangeObj == null || fromToCostRangeObj == ""){
		var fromToCostRange = "";
	} else{
		var fromToCostRange = fromToCostRangeObj.join(",");
	}
	
	if (fromToCostRange != "" && fromToCostRange != null) {
		fieldFilters.fieldFilters["fromcost"] = fromToCostRange;
	}
	
	var statusS = $("#status").val();
	
	if(statusS != "" && statusS != null){
		fieldFilters.fieldFilters["status"] = statusS
	}
	
	var segmentObj = $("#segmentObj").val();
	
	if(segmentObj == null || segmentObj == ""){
		var segment = "";
	} else{
		var segment = segmentObj.join(",");
	}
	
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segment"] = segment;
	}
	
	var storeDCS = $("#storeDCS").val();
	
	if (storeDCS != "" && storeDCS != null) {
		fieldFilters.fieldFilters["storeOrDc"] = storeDCS;
	}
	
    var storeDcNameObj = $("#storeDcNameObj").val();
	
	if(storeDcNameObj == null || storeDcNameObj == ""){
		var storeDcName = "";
	} else{
		var storeDcName = storeDcNameObj.join(",");
	}
	
	if (storeDcName != "" && storeDcName != null) {
		fieldFilters.fieldFilters["storeOrDcname"] = storeDcName;
	}
	
    var zoneObj = $("#zoneObj").val();
	
	if(zoneObj == null || zoneObj == ""){
		var zone = "";
	} else{
		var zone = zoneObj.join(",");
	}
	
	if (zone != "" && zone != null) {
		fieldFilters.fieldFilters["zoneName"] = zone;
	}
	
	var mainCatObj = $("#mainCatObj").val();
		
	if(mainCatObj == null || mainCatObj == ""){
		var mainCat = "";
	} else{
		var mainCat = mainCatObj.join(",");
	}
	
	if (mainCat != "" && mainCat != null) {
		fieldFilters.fieldFilters["category"] = mainCat;
	}
	
	var vendorObj = $("#vendorObj").val();
	
	if(vendorObj == null || vendorObj == ""){
		var vendorCode = "";
	} else{
		var vendorCode = vendorObj.join(",");
	}
	
	if (vendorCode != "" && vendorCode != null) {
		fieldFilters.fieldFilters["vendor"] = vendorCode;
	}
	
	var fromToWtRangeObj = $("#fromToWtRangeObj").val();	
	
	if(fromToWtRangeObj == null || fromToWtRangeObj == ""){
		var fromWtRange = "";
	} else{
		var arr = [];
		$("#fromToWtRangeObj option:selected").each(function() {			
			arr.push(this.text); 
		});
		var fromWtRange = arr.join(",");
	}
	
	if (fromWtRange != "" && fromWtRange != null) {
		fieldFilters.fieldFilters["weightrange"] = fromWtRange;
	}
	
    var clarityObj = $("#clarityObj").val();
 	
	if(clarityObj == null || clarityObj == ""){
		var clarity = "";
	} else{
		var clarity = clarityObj.join(",");
	}
	
	if (clarity != "" && clarity != null) {
		fieldFilters.fieldFilters["clarity"] = clarity;
	}
	
    var colorObj = $("#colorObj").val();
 	
	if(colorObj == null || colorObj == ""){
		var color = "";
	} else{
		var color = colorObj.join(",");
	}
	
	if (color != "" && color != null) {
		fieldFilters.fieldFilters["color"] = color;
	}
	
    var actualColorObj = $("#actualColorObj").val();
 	
	if(actualColorObj == null || actualColorObj == ""){
		var actualColor = "";
	} else{
		var actualColor = actualColorObj.join(",");
	}
	
	if (actualColor != "" && actualColor != null) {
		fieldFilters.fieldFilters["actualcolor"] = actualColor;
	}
	
	var cutObj = $("#cutObj").val();
	 	
	if(cutObj == null || cutObj == ""){
		var cut = "";
	} else{
		var cut = cutObj.join(",");
	}
	
	if (cut != "" && cut != null) {
		fieldFilters.fieldFilters["cut"] = cut;
	}
	
	var labNameObj = $("#labNameObj").val();
 	
	if(labNameObj == null || labNameObj == ""){
		var labName = "";
	} else{
		var labName = labNameObj.join(",");
	}
	
	if (labName != "" && labName != null) {
		fieldFilters.fieldFilters["labdetail"] = labName;
	}
	
	var stockPacket = $("#stockPacket").val();
	
	if (stockPacket != "" && stockPacket != null) {
		fieldFilters.fieldFilters["stockOrPacket"] = stockPacket;
	}
	
	var toCostRangeObj = $("#toCostRangeObj").val();
	
	if(toCostRangeObj == null || toCostRangeObj == ""){
		var toCostRange = "";
	} else{
		var toCostRange = toCostRangeObj.join(",");
	}
	
	if (toCostRange != "" && toCostRange != null) {
		fieldFilters.fieldFilters["tocost"] = toCostRange;
	}
	
	
	return fieldFilters;
}

//###################################### Search Grid  ###################################################
var looseStoneStockReportSearchReportGrid = function(response) {
	var source = {
			datafields : [
				{'name' : 'storeDc','type' : 'string','map':'currentStoreDc>id'},
				{'name' : 'storeDcName','type' : 'string','map':'currentStoreDcid>name'},
				{'name' : 'currentStoreDcid','type' : 'string','map':'currentStoreDcid>id'},

				{'name' : 'zone','type' : 'string','map':'currentZone>description'}, 
				{'name' : 'segment','type' : 'string','map':'stoneSegment>description'},
				{'name' : 'mainCat','type' : 'string','map':'stoneCategory>name'},
				{'name' : 'subCat','type' : 'string','map':'subCategoryDescription'}, 

		        {'name' : 'stCode','type' : 'string','map':'stoneCode'},
				{'name' : 'vendorCode','type' : 'string','map':'vendor>name'},
				{'name' : 'wtRange','type' : 'string','map':'weightRange'}, 
				{'name' : 'fromToCostWtRange','type' : 'string','map':'fromToCostWtRange'}, 
				{'name' : 'packetStock','type' : 'string','map':'pocketOrIndividual>id'}, 
				
				{'name' : 'pcs','type' : 'int','map':'pieces'}, 
				{'name' : 'stoneWt','type' : 'float','map':'weight'},
				{'name' : 'uqc','type' : 'string','map':'uom>name'},
				{'name' : 'packetStockNo','type' : 'string','map':'id'},
				{'name' : 'clarity','type' : 'string','map':'clarity'}, 
				{'name' : 'color','type' : 'string','map':'color'}, 
				{'name' : 'ActualColor','type' : 'string','map':'actualColor'}, 
				
				{'name' : 'cut','type' : 'string','map':'cutGrade'}, 
				{'name' : 'LabCode','type' : 'string','map':'labCodes'},
				{'name' : 'certificateNo','type' : 'string','map':'labCertificateNumbers'},
				{'name' : 'sellingRate','type' : 'float','map':'sellingRate'}, 
				{'name' : 'stoneCost','type' : 'float'},
				{'name' : 'sellingPrice','type' : 'float','map':'sellingPrice'}, 
				{'name' : 'status','type' : 'string','map':'status'}, 
				{'name' : 'startDate','type' : 'date','map':'statusDate'}, 
				{'name' : 'toRefDocNo','type' : 'int','map':'grNo'},
			    {'name' : 'srlNo','type' : 'int','map':'grDetailSrlNo'}
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	var columnCheckBox = null;

	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 65,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		editable:true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		columns : [
			{'text' : '','datafield' : '',cellsalign : 'center',columntype : 'checkbox',align : 'center','width' : '4%',sortable : false,
				cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
					console.log(newvalue);
					$('#jqxgrid').jqxGrid ('setcellvalue', row, 'flag',  newvalue);
					}
			},
			{'text' : 'flag','datafield' : 'flag','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : 'flag','datafield' : 'currentStoreDcid','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			
			{'text' : 'Store/DC','datafield' : 'storeDc','width' : '6%',cellsalign : 'center',	align : 'center',sortable : true,editable : false},
			{'text' : 'Store/ DC Name ','datafield' : 'storeDcName','width' : '6%',sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'Zone','datafield' : 'zone','width' : '6%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Seg','datafield' : 'segment','width' : '6%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},

			{'text' : 'Main Cat','datafield' : 'mainCat','width' : '6%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub Cat/Shape','datafield' : 'subCat','width' : '6%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Article Code ','datafield' : 'stCode','width' : '6%',cellsalign : 'center',	align : 'center',sortable : true,editable : false},
			{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			
			{'text' : 'Weight/Cost Range','datafield' : 'wtRange','width' : '4%',sortable : true,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			//{'text' : 'Cost Range','datafield' : 'fromToCostWtRange','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Packet/ Stock','datafield' : 'packetStock','width' : '6%',cellsalign : 'center',	align : 'center',sortable : true,editable : false},
			{'text' : 'Packet/ Stock No','datafield' : 'packetStockNo','width' : '6%',cellsalign : 'center',align : 'center',sortable : true,editable : false},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			
			{'text' : 'Stone Wt','datafield' : 'stoneWt','width' : '4%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '3%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '4%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Color','datafield' : 'color','width' : '4%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Actual Color','datafield' : 'ActualColor','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			
			{'text' : 'Cut','datafield' : 'cut','width' : '3%',cellsalign : 'center',	align : 'center',sortable : true,editable : false},
			{'text' : 'Lab Code ','datafield' : 'LabCode','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},		
			{'text' : 'Cert No ','datafield' : 'certificateNo','width' : '3%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Selling Rate ','datafield' : 'sellingRate','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			
			{'text' : 'Cost Price  ','datafield' : 'stoneCost','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Selling Price  ','datafield' : 'sellingPrice','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Status','datafield' : 'status','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Date','datafield' : 'startDate','width' : '6%',cellsalign : 'center',	align : 'center',sortable : true,editable : false,cellsformat : 'dd/MM/yyyy'},
			{'text' : 'To Ref Doc No','datafield' : 'toRefDocNo','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			{'text' : 'Serial No','datafield' : 'srlNo','width' : '3%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		]
	});
}

$("#search").on("click",function(){
   var status =	$("#status").val();
   if(status == null || status == ""){
		$.growl.error({
			message : "Please fill mandatory field.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		postJSON('/OrderExecution/api/v1/looseStoneSearch',JSON.stringify(looseStoneStockItemFieldFilters()),function(data) {
			if(data.resCode == "1"){
				activaTab('tab0default');
				$("#gridTabs").show();
				looseStoneStockReportSearchReportGrid(data.payload.list);
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
   
});

$("#historyDetails").click(function () {
	//var stockIds = selectedCheckBox();
		var params = selectedCheckBox();
		console.log(params)
			/*{
			"fieldFilters":{
				"stockNo":stockIds.toString()
			}
		}*/
		postJSON('/OrderExecution/api/v1/looseStoneStockHistory',JSON.stringify(params),function(response) {
			if(response.resCode == 1){
				var data = response.payload.history;
				itemHistoryGrid(data);
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
});

var itemHistoryGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stockNo','type' : 'int','map':'stockOrPacketId'},
			{'name' : 'docType','type' : 'string','map':'docType'},
			{'name' : 'docDate','type' : 'date','map':'docDate'},
			{'name' : 'docNo','type' : 'int','map':'docNo'},

			{'name' : 'docSrlNo','type' : 'int','map':'docSrlNo'},
			{'name' : 'docStoreDcType','type' : 'string','map':'docStoreOrDc'}, 
			{'name' : 'docStoreDcName','type' : 'string','map':'docStoreOrDcId'},
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
			{'text' : 'Packet/Stock No','datafield' : 'stockNo','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Doc Type','datafield' : 'docType','width' : '15%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc Date','datafield' : 'docDate','width' : '15%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
			{'text' : 'Doc Number','datafield' : 'docNo','width' : '15%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Doc Srl No','datafield' : 'docSrlNo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Doc Store/DC','datafield' : 'docStoreDcType','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Doc Store/DC Name','datafield' : 'docStoreDcName','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		]
	});
}


$("#clearAll").on('click', function() {
	window.location.href="javascript:showContentPage('looseStoneStockReport', 'bodySwitcher')"
});

//###################### Export functionality #######################

$("#export").on("click",function() {
		var data;
	    var newData = [];
	    var fieldFilters = looseStoneStockItemFieldFilters();
	    
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
				postJSON('/OrderExecution/api/v1/exportLooseStoneStock',JSON.stringify(fieldFilters),function(response) {
			   if(response != null){
               data = response.payload.list;
               for (i = 0; i < data.length; i++) {
				newData.push({
					'Store/DC' : (data[i].currentStoreDc != null) ? data[i].currentStoreDc.id : "",
					'Store/ DC Name ' : (data[i].currentStoreDcid != null) ? data[i].currentStoreDcid.name : "",
					'Zone' : (data[i].currentZone!= null) ? data[i].currentZone.description  : "",		
					'Seg' : (data[i].stoneSegment!= null) ? data[i].stoneSegment.description  : "",
					'Main Cat ' : (data[i].stoneCategory != null) ? data[i].stoneCategory.name : "",
					'Sub Cat/Shape' : (data[i].subCategoryDescription != null) ? data[i].subCategoryDescription : "",
					'Article Code ' : (data[i].stoneCode != null) ? data[i].stoneCode : "",
					
					'Vendor Code' : (data[i].vendor != null) ? data[i].vendor.name : "",	
					'Weight/Cost Range' : (data[i].weightRange != null) ? data[i].weightRange : "",
					'Packet/Stock' : (data[i].pocketOrIndividual!= null) ? data[i].pocketOrIndividual.id  : "",		
					'Packet/Stock NO' : (data[i].id != null) ? data[i].id : "",
					'Pcs' : (data[i].pieces != null) ? data[i].pieces : "",
					'Stone Wt' : (data[i].weight != null) ? data[i].weight : "",
					
					'UQC' : (data[i].uom != null) ? data[i].uom.id : "",
					'Clarity' : (data[i].clarity != null) ? data[i].clarity : "",
					'Colour' : (data[i].color!= null) ? data[i].color: "",
					'Actual Colour' : (data[i].actualColor != null) ? data[i].actualColor: "",
					'Cut' : (data[i].cutGrade != null) ? data[i].cutGrade : "",
					'Lab Code' : (data[i].labCodes != null) ? data[i].labCodes : "",
					'Cert No' : (data[i].certificateNo != null) ? data[i].certificateNo : "",	
							
					'Selling Rate ' : (data[i].sellingRate!= null) ? data[i].sellingRate : "",
					'Cost Price': (data[i].stoneCost!= null) ? data[i].stoneCost : "",
					'Selling Price ' : (data[i].sellingPrice != null) ? data[i].sellingPrice : "",
					'Status ' : (data[i].status != null) ? data[i].status : "",
					'Date ' : (data[i].statusDate != null) ? data[i].statusDate : "",
					'To Ref Doc No' : (data[i].grNo != null) ? data[i].grNo : "",
					'Serial No' : (data[i].grDetailSrlNo != null) ? data[i].grDetailSrlNo : "",
                });
            }
               var opts = [{sheetid:'Loose Stones_Stock_Report',header:true}];
               var res = alasql('SELECT * INTO XLSX("Loose Stones_Stock_Report_'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
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