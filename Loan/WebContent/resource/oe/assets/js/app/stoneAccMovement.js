/** Author : Dipankar Naha
 * Date : 09/10/2017
 * Desc : Stone or Acc Movement
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
	window.location.href = "javascript:showContentPage('stoneAccMovement', 'bodySwitcher')";
	return window.location.href;
}

var showSubCatDesc = function(){
	var segmentC = $("#segmentC option:selected").text();
	var mainCategoryC = $("#mainCategoryC option:selected").text();
	var shapeC = $("#shapeC option:selected").text();
	var clarityC = $("#clarityC option:selected").text();
	var colorC = $("#colorC option:selected").text();
	var cutGradeC = $("#cutGradeC option:selected").text();
	$("#fromWtCostC").val("");
	$("#toWtCostC").val("");
	
	var subCatDesc = segmentC +' '+ mainCategoryC +' '+ shapeC +' '+ clarityC +' '+ colorC + ' ' + cutGradeC;
	$("#stoneSubCategoryC").val(subCatDesc);
}

// date picker functions
$("#fromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDate").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

$("#mainCategoryC").on("change",function(){
	 var mainCategory = $("#mainCategoryC option:selected").text();
		if(mainCategory == "CD Melees"|| mainCategory == "CD Pointers" || mainCategory == "CD Solitaire"){
			$("#actualColorSectionC").show();
		}else{
			$("#actualColorSectionC").hide();
		}
});

var movementTypeArr = [{
	"id" : "Stone",
	"name" : "Stone"
}];


$('#movementType').empty().append('<option value="" selected>--Select--</option>');
$('#movementTypeC').empty().append('<option value="" selected>--Select--</option>');
$.each(movementTypeArr,function(key,val){
	$("#movementType").append('<option value="'+val.id+'">'+val.name+'</option>');
	$("#movementTypeC").append('<option value="'+val.id+'">'+val.name+'</option>');
});

var getResponseLovTo = function(fieldFilters,flag){
	postJSON('/OrderExecution/api/v1/onloadMovementOfStones',JSON.stringify(fieldFilters),function(data) {
		if(data.resCode == 1){
			if(flag == 7){			
				$('#toStockOrderC').empty().append('<option value="" selected>--Select--</option>');
				$('#toStockOrder').empty().append('<option value="" selected>--Select--</option>');
				$.each(data.payload.toTypes,function(key,val){
			    	$("#toStockOrder").append('<option value="'+val.id+'">'+val.name+'</option>');
			    	$("#toStockOrderC").append('<option value="'+val.name+'">'+val.name+'</option>');
			    });			
			}
		}else if(data.resCode == 2){
			$.growl.error({
				message : data.mesgStr, 
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
}

$("#pcsC").on('change',function(){
	if (this.value.match(/[^0-9]/g)) {
		this.value = parseInt($("#pcsC").val());
	}
	
	if($("#pcsC").val() != ""){
		if($("#pcsC").val() < 0){
			$("#pcsC").val("");
			$.growl.error({
				message : "Please Enter Valid Pcs !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}
});

var weightV,pcsV;
$("#weightC").on('change', function(){
	if (this.value.match(/[^\d.]/g)) {
		this.value = this.value.replace(/[^\d.]/g, '');
	}
	if($("#weightC").val() != ""){
		if($("#weightC").val() == 0 || $("#weightC").val() < 0){
			$("#weightC").val("");
			$.growl.error({
				message : "Please Enter Valid Wt !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}
	var fieldFilterTo = {"fieldFilters":{"type":"pcsWtValidation","segId":$("#segmentC").val(),"catId":$("#mainCategoryC").val(),
		"shapeId": $("#shapeC").val(), "clarity": $("#clarityC").val(),"color":$("#colorC").val(),"cutgrade":$("#cutGradeC").val(),"fromWtCost":$("#fromWtCostC").val(),"toWtCost":$("#toWtCostC").val(),
		"fromType":$("#fromStockOrderC").val(),"fromPktOrStkOrOrdOrLocNo":$("#psolNoC").val(),"toType":$("#toStockOrderC").val(),
		"orderSrlNo":$("#orderSlNoC").val(),"orderStoneSrlNo":$("#stoneSlNoC").val(),
		"pcs": $("#pcsC").val(),"wt":$("#weightC").val()}};	
	postJSON('/OrderExecution/api/v1/onloadMovementOfStones',JSON.stringify(fieldFilterTo),function(data) {
		if (data.resCode == "1") {		
			var wtValue = data.payload.Wt;
			var pcsValue = data.payload.Pcs;
			weightV = data.payload.Wt;
			pcsV = data.payload.Pcs;
			var wtArry = [];
			var pcsArry = [];
			var gridData = $("#jqxgridCreate").jqxGrid('getrows');
					if(pcsValue == 0 && $("#fromStockOrderC").val() != "Location"){
						$("#pcsC").val(""); 
						$("#weightC").val("");
						$.growl.error({
							message : "From Type : "+ $("#fromStockOrderC").val() + " Pcs is " + pcsValue + " So Cannot do Movement !!",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
					if($("#pcsC").val() > pcsValue && $("#fromStockOrderC").val() != "Location"){
						$("#pcsC").val(""); 
						$("#weightC").val(""); 
						$.growl.error({
							message : "Pcs Should not be greater than " + pcsValue + " !!",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
					
					if(wtValue == 0){
						$("#weightC").val(""); 
						$.growl.error({
							message : "From Type : "+ $("#fromStockOrderC").val() + " Wt is " + wtValue + " So Cannot do Movement !!",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
					
					if($("#weightC").val() > wtValue){
						$("#weightC").val(""); 
						$.growl.error({
							message : "Weight Should not be greater than " + wtValue + " !!",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
					
					if(gridData.length != 0){
						var totalWt = 0.000;
						var totalPcs = 0.000;
						
						$.each(gridData,function(k,v){
							if(v.psolFrom == $("#fromStockOrderC").val() && v.packetStockNo == $("#psolNoC").val()){
								var wts = v.weight;
								wtArry.push(wts);
							}
						});
							
						$.each(gridData,function(k,v){
							if(v.psolFrom == $("#fromStockOrderC").val() && v.packetStockNo == $("#psolNoC").val()){
								var pcs = v.pcs;
								pcsArry.push(pcs);
							}
						});
							
							
					    for(i=0; i<wtArry.length; i++){
					    	totalWt = parseFloat(totalWt) + parseFloat(wtArry[i]);
					    }
					    
					    for(i=0; i<pcsArry.length; i++){
					    	totalPcs = parseFloat(totalPcs) + parseFloat(pcsArry[i]);
					    }
						    
					    var totalPieces = parseFloat(totalPcs) + parseFloat($("#pcsC").val());
					    if(totalPieces > pcsValue){
					    	$("#pcsC").val("");
					    	$.growl.error({
					    		message : "Already For From Type :  " +  $("#fromStockOrderC").val() + "  with id :  " + $("#psolNoC").val() + "  ,You have Added  " + totalPcs + "  . Pcs ,Total Pcs should not exceed  " + pcsValue + "  !!!",
					    		duration : 10000,
					    		title : 'Error'
					    	});
					    	return false;
					    }
						    
			    		var totalWeight = parseFloat(totalWt) + parseFloat($("#weightC").val());
					    if(totalWeight > wtValue){
					    	$("#weightC").val("");
					    	$.growl.error({
					    		message : "Already For From Type :  " +  $("#fromStockOrderC").val() + "  with id :  " + $("#psolNoC").val() + "  ,You have Added  " + totalWt + "  .Total Wt. should not exceed  " + wtValue + "  !!!",
					    		duration : 10000,
					    		title : 'Error'
					    	});
					    	return false;
					    }
					}
			}		
	});
});


var globalPktNoArr = [];
var globalStnSlNo = [];
var getResponseLov = function(fieldFilters, flag){
	postJSON('/OrderExecution/api/v1/onloadMovementOfStones',JSON.stringify(fieldFilters),function(data) {
		if(data.resCode == 1){
		
		//On change of movement type loading segments
		if(flag == 1){			
			$('#segment').empty().append('<option value="" selected>--Select--</option>');	
			$('#segmentC').empty().append('<option value="" selected>--Select--</option>');	
			$.each(data.payload.mTypes,function(key,val){
		    	$("#segmentC").append('<option value="'+val.id+'" ids="'+val.code+'">'+val.description+'</option>');
		    	$("#segment").append('<option value="'+val.id+'">'+val.description+'</option>');
		    });
		}
		
		//On change of segment  loading main category
		if(flag == 2){			
			$('#mainCategory').empty().append('<option value="" selected>--Select--</option>');
			$('#mainCategoryC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.maincats,function(key,val){
		    	$("#mainCategory").append('<option value="'+val.id+'">'+val.description+'</option>');
		    	$("#mainCategoryC").append('<option value="'+val.id+'" idm="'+val.name+'">'+val.description+'</option>');
		    });
		}
		
		//On change of main category  loading shape
		if(flag == 3){			
			$('#shape').empty().append('<option value="" selected>--Select--</option>');
			$('#shapeC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.stoneSegShapes,function(key,val){
		    	$("#shape").append('<option value="'+val.id+'">'+val.description+'</option>');
		    	$("#shapeC").append('<option value="'+val.id+'" idsp ="'+val.name+'">'+val.description+'</option>');
		    });
			
			$('#subCategory').empty().append('<option value="" selected>--Select--</option>');
			$('#subCategoryC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.subcat,function(key,val){
		    	$("#subCategory").append('<option value="'+val.id+'">'+val.description+'</option>');
		    	$("#subCategoryC").append('<option value="'+val.id+'">'+val.description+'</option>');
		    });
		}
		
		//On change of shape  loading clarity, color and cut grade
		if(flag == 4){			
			$('#clarity').empty().append('<option value="" selected>--Select--</option>');
			$('#color').empty().append('<option value="" selected>--Select--</option>');
			$('#cutGrade').empty().append('<option value="" selected>--Select--</option>');
			
			$('#clarityC').empty().append('<option value="" selected>--Select--</option>');
			$('#colorC').empty().append('<option value="" selected>--Select--</option>');
			$('#cutGradeC').empty().append('<option value="" selected>--Select--</option>');
			$('#actualColorC').empty().append('<option value="" selected>--Select--</option>');
			
			$.each(data.payload.stnClarityList,function(key,val){
		    	$("#clarity").append('<option value="'+val+'">'+val+'</option>');
		    	$("#clarityC").append('<option value="'+val+'">'+val+'</option>');
		    });
			
			$.each(data.payload.stnColorList,function(key,val){
		    	$("#color").append('<option value="'+val+'">'+val+'</option>');
		    	$("#colorC").append('<option value="'+val+'">'+val+'</option>');
		    });
			
			$.each(data.payload.stnCutgradeList,function(key,val){
		    	$("#cutGrade").append('<option value="'+val+'">'+val+'</option>');
		    	$("#cutGradeC").append('<option value="'+val+'">'+val+'</option>');
		    });
			
			$.each(data.payload.stnActualColorList,function(key,val){
		    	$("#actualColorC").append('<option value="'+val+'">'+val+'</option>');
		    });
		}
		
		
		if(flag == 5){
			$('#fromWtCost').empty().append('<option value="" selected>--Select--</option>');
			$('#fromWtCostC').empty().append('<option value="" selected>--Select--</option>');
			
			var fWtCost = data.payload.fromWtCost;
			
			// Removing Duplicate From Array
			var fWtCostVal = [];
			$.each(fWtCost, function(i, el){
			    if($.inArray(el, fWtCostVal) === -1) fWtCostVal.push(el);
			});
			
			// Sorting Array in Ascending Order
			fWtCostVal.sort(function(a, b){
				{return a-b};
			});
			
			$.each(fWtCostVal,function(key,val){
		    	$("#fromWtCost").append('<option value="'+val.toFixed(3)+'">'+val.toFixed(3)+'</option>');
		    	$("#fromWtCostC").append('<option value="'+val.toFixed(3)+'">'+val.toFixed(3)+'</option>');
		    });
			
			$("#uomC").val(data.payload.uom);
			$("#stoneCodeC").val(data.payload.stonecode);
		}
		
		if(flag == 6){			
			$('#fromStockOrderC').empty().append('<option value="" selected>--Select--</option>');
			$('#fromStockOrder').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.fromTypes,function(key,val){
		    	$("#fromStockOrderC").append('<option value="'+val.name+'">'+val.name+'</option>');
		    	$("#fromStockOrder").append('<option value="'+val.id+'">'+val.name+'</option>');
		    });
		}
		
		if(flag == 7){	
			var psolNoArr = data.payload.pktOrStkOrOrdOrLocNo;
			globalPktNoArr = data.payload.pktOrStkOrOrdOrLocNo;
			// Sorting Array in Ascending Order
			psolNoArr.sort(function(a, b){
				{return a-b};
			});
			
			$('#psolNoC').empty().append('<option value="" selected>--Select--</option>');
			$.each(psolNoArr,function(key,val){
				if($("#fromStockOrderC").val() == "Packet" || $("#fromStockOrderC").val() == "Stock"){
			    	$("#psolNoC").append('<option value="'+val.id+'">'+val.id+'</option>');
				}else{
			    	$("#psolNoC").append('<option value="'+val+'">'+val+'</option>');
				}
		    });			
		}
		
		if(flag == 8){			
			$('#orderSlNoC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.orderItemSrlList,function(key,val){
		    	$("#orderSlNoC").append('<option value="'+val+'">'+val+'</option>');
		    });
		}
		
		
		if(flag == 9){			
			$('#stoneSlNoC').empty().append('<option value="" selected>--Select--</option>');
			globalStnSlNo = data.payload.orderStoneSrlList;
			$.each(data.payload.orderStoneSrlList,function(key,val){
				if($("#fromStockOrderC").val() == "Orders"){
			    	$("#stoneSlNoC").append('<option value="'+val.id+'">'+val.id+'</option>');
				}else{
			    	$("#stoneSlNoC").append('<option value="'+val+'">'+val+'</option>');
				}
		    });
		}
		
		
		if(flag == 10){		
			var psolNoToArr = data.payload.pktOrStkOrOrdOrLocNo;
			
			// Sorting Array in Ascending Order
			psolNoToArr.sort(function(a, b){
				{return a-b};
			});
			
			$('#psolNoToC').empty().append('<option value="" selected>--Select--</option>');
			
			$.each(psolNoToArr,function(key,val){
				if($("#toStockOrderC").val() == "Packet"){
			    	$("#psolNoToC").append('<option value="'+val.id+'">'+val.id+'</option>');
				}else{
			    	$("#psolNoToC").append('<option value="'+val+'">'+val+'</option>');
				}
		    });
		}
		
		if(flag == 11){		
			var toOrdNo = data.payload.orderItemSrlList;
			
			// Removing Duplicate From Array
			var toOrdNoVal = [];
			$.each(toOrdNo, function(i, el){
			    if($.inArray(el, fWtCostVal) === -1) toOrdNoVal.push(el);
			});
			
			// Sorting Array in Ascending Order
			toOrdNoVal.sort(function(a, b){
				{return a-b};
			});
			
			$('#orderSlNoToC').empty().append('<option value="" selected>--Select--</option>');
			$.each(toOrdNoVal,function(key,val){
				if($("#toStockOrderC").val() == "Packet"){
					$("#orderSlNoToC").append('<option value="'+val.id+'">'+val.id+'</option>');
				}else{
					$("#orderSlNoToC").append('<option value="'+val+'">'+val+'</option>');

				}
		    });
		}
		
		if(flag == 12){			
			$('#stoneSlNoToC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.orderStoneSrlList,function(key,val){
				if($("#toStockOrderC").val() == "Orders"){
					$("#stoneSlNoToC").append('<option value="'+val.id+'">'+val.id+'</option>');
				}else{
					$("#stoneSlNoToC").append('<option value="'+val+'">'+val+'</option>');

				}
		    });
		}
		if(flag == 15){			
			$("#weightC").val(data.payload.wt);
			$("#pcsC").val(data.payload.Pieces);
		}
		if(flag == 16){
			$('#toWtCostC').empty().append('<option value="" selected>--Select--</option>');
			$('#toWtCost').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.fromWtCost,function(key,val){
				$('#toWtCostC').empty().append('<option value="" selected>--Select--</option>');
		    	$("#toWtCostC").append('<option value="'+val+'">'+val+'</option>');
		    	$("#toWtCost").append('<option value="'+val+'">'+val+'</option>');
		    });
		}
		
		}else if(data.resCode == 2){
			$.growl.error({
				message : data.mesgStr, 
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});	
}

$("#stoneSlNoC").on('change',function(){
	loadWtCostValue();
});
$("#fromWtCostC").on("click",function(){
	var usedNames = {};
	$("select[name='fromWtCostC'] > option").each(function () {
	    if(usedNames[this.text]) {
	        $(this).remove();
	    } else {
	        usedNames[this.text] = this.value;
	    }
	});
});

$("#toWtCostC").on("click",function(){
	var usedNames1 = {};
	$("select[name='toWtCostC'] > option").each(function () {
	    if(usedNames1[this.text]) {
	        $(this).remove();
	    } else {
	        usedNames1[this.text] = this.value;
	    }
	});
});

$("#fromWtCostC").on('change',function(){
	var fieldFilter = {"fieldFilters":{"type":"ToWtOrCost","fromWtSelected" :$("#fromWtCostC").val(),"segId": $("#segmentC").val(),"catId" : $("#mainCategoryC").val(),"shapeId" : $("#shapeC").val(), "criteria": "create"}};		
	getResponseLov(fieldFilter, 16);
});


// On change of movement type loading segments

$("#movementTypeC").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"stonesegments"}};
	var mType = getResponseLov(fieldFilter, 1);
});
$("#subCategorySectionC").hide();
$("#uomSectionC").hide();
$("#stoneCodeSectionC").hide();

//On change of segment  loading main category
$("#segmentC").on('change', function(){
	var value = $("#segmentC option:selected").text();
	if(value == "Diamond"){
		$("#shapeSectionC").show();
		$("#claritySectionC").show();
		$("#colorSectionC").show();
		$("#cutGradeSectionC").show();
		$("#subCategoryDescSectionC").show();
		$("#subCategorySectionC").hide();
		$("#actualColorSectionC").show();
		
	}else{		
		$("#shapeSectionC").hide();
		$("#claritySectionC").hide();
		$("#colorSectionC").hide();
		$("#cutGradeSectionC").hide();
		$("#subCategoryDescSectionC").hide();
		$("#subCategorySectionC").show();
		$("#actualColorSectionC").hide();
	}
	var fieldFilter = {"fieldFilters":{"type":"stonesegCategories","segId": $(this).val()}};
	getResponseLov(fieldFilter, 2);
});

//On change of main category  loading shape 
$("#mainCategoryC").on('change', function(){
	var value = $("#segmentC option:selected").text();
	if(value == "Diamond"){		
		var fieldFilter = {"fieldFilters":{"type":"stoneSegShapes","segId": $("#segmentC").val(),"catId" : $(this).val()}};
	}else{
	
		var fieldFilter = {"fieldFilters":{"type":"subCat","segId": $("#segmentC").val(),"catId" : $("#mainCategoryC").val()}};		
	}
	
	getResponseLov(fieldFilter, 3);
});

//On change of shape  loading clarity, color and cut grade 
$("#shapeC").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"stoneSegColorClarityCutgrade","segId": $("#segmentC").val(),"catId" : $("#mainCategoryC").val(), "shapeId" : $(this).val()}};
	getResponseLov(fieldFilter, 4);
});

//On change of cut grade  loading from cost and to cost
$("#cutGradeC").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"FromWtOrCost","segId": $("#segmentC").val(),"catId" : $("#mainCategoryC").val(),"shapeId" : $("#shapeC").val(), "criteria": "create"}};		
	getResponseLov(fieldFilter, 5);
});


$("#subCategoryC").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"FromWtOrCost","segId": $("#segmentC").val(),"catId" : $("#mainCategoryC").val(),"subcatId" : $("#subCategoryC").val(), "criteria": "create"}};		
	getResponseLov(fieldFilter, 5);
});

//On change of to cost  loading from type
$("#toWtCostC").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"fromTypes"}};
	getResponseLov(fieldFilter, 6);
});


//On change of from type  loading 
$("#fromStockOrderC").on('change', function(){
	var value = $(this).val();
	var segment = $("#segmentC").val();
	var segmentName = $("#segmentC option:selected").text();
	if(segmentName == "Diamond"){		
		var fieldFilter = {"fieldFilters":{"type":"pktOrStkOrOrdOrLocNo","segId":$("#segmentC").val(),"catId":$("#mainCategoryC").val(),"shapeId": $("#shapeC").val(), "clarity": $("#clarityC").val(),"color":$("#colorC").val(),"cutgrade":$("#cutGradeC").val(),"fromWtCost":$("#fromWtCostC").val(),"toWtCost":$("#toWtCostC").val(),"fromType":$("#fromStockOrderC").val(),"actualcolor":$("#actualColorC").val()}};
		var fieldFilterTo = {"fieldFilters":{"type":"toTypes","fromType":value}};
	}else{
		var fieldFilter = {"fieldFilters":{"type":"pktOrStkOrOrdOrLocNo","segId":$("#segmentC").val(),"catId":$("#mainCategoryC").val(),"subcatId" : $("#subCategoryC").val(),"fromWtCost":$("#fromWtCostC").val(),"toWtCost":$("#toWtCostC").val(),"fromType":$("#fromStockOrderC").val()}};
		var fieldFilterTo = {"fieldFilters":{"type":"toTypes","fromType":value}};
	}
	
	if(value == "Orders"){
		$("#orderSlNoC").prop('disabled', false);
		$("#stoneSlNoC").prop('disabled', false);
	}else{
		$("#psolNoC").empty().append('<option value="" selected>--Select--</option>');
		$("#orderSlNoC").empty().append('<option value="" selected>--Select--</option>');
		$("#stoneSlNoC").empty().append('<option value="" selected>--Select--</option>');
		$("#orderSlNoC").prop('disabled', true);
		$("#stoneSlNoC").prop('disabled', true);
		
	}
	
	var fromStockOrderC = $("#fromStockOrderC").val();
	if ( fromStockOrderC == "Stock"){
		$("#weightC").prop('disabled', true);
		$("#pcsC").prop('disabled', true);
		
	}else{
		$("#weightC").prop('disabled', false);
		$("#pcsC").prop('disabled', false);
	}
	
	getResponseLov(fieldFilter, 7);
	getResponseLovTo(fieldFilterTo, 7);
	
	
});

//On change of from type  loading 
$("#psolNoC").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"orderSrlNo","segId":$("#segmentC").val(),"catId":$("#mainCategoryC").val(),"shapeId": $("#shapeC").val(), "clarity": $("#clarityC").val(),"color":$("#colorC").val(),"cutgrade":$("#cutGradeC").val(),"fromWtCost":$("#fromWtCostC").val(),"toWtCost":$("#toWtCostC").val(),"fromType":$("#fromStockOrderC").val(), "pktOrStkOrOrdOrLocNo":$("#psolNoC").val()}};
	var fromStockOrderC = $("#fromStockOrderC").val();
	if ( fromStockOrderC == "Orders"){
		$("#weightC").prop('disabled', false);
		$("#pcsC").prop('disabled', false);
		getResponseLov(fieldFilter, 8);
	}else if ( fromStockOrderC == "Stock"){
		$("#weightC").prop('disabled', true);
		$("#pcsC").prop('disabled', true);
		var fieldFilter = {"fieldFilters":{"type":"pcsWt","segId":$("#segmentC").val(),"catId":$("#mainCategoryC").val(),"shapeId": $("#shapeC").val(), "clarity": $("#clarityC").val(),"color":$("#colorC").val(),"cutgrade":$("#cutGradeC").val(),"fromWtCost":$("#fromWtCostC").val(),"toWtCost":$("#toWtCostC").val(),"fromType":$("#fromStockOrderC").val(),"pktOrStkOrOrdOrLocNo":$("#psolNoC").val()}};
		loadWtCostValue();
		getResponseLov(fieldFilter, 15);
		
	}else{
		$("#weightC").prop('disabled', false);
		$("#pcsC").prop('disabled', false);
		var fieldFilterTo = {"fieldFilters":null};
		if(fromStockOrderC == "Packet"){
			loadWtCostValue();
		}
	}
		
});

var loadWtCostValue = function(){
	if($("#fromStockOrderC").val() == "Packet" || $("#fromStockOrderC").val() == "Stock" ){
		$.each(globalPktNoArr,function(k,v){
			if( v.id == $("#psolNoC").val()){
				$("#fromWtCostValC").val(v.name);
				$("#toWtCostValC").val(v.description);
			}
		});
	}
	if($("#fromStockOrderC").val() == "Orders"){
		$.each(globalStnSlNo,function(k,v){
			if( v.id == $("#stoneSlNoC").val()){
				$("#fromWtCostValC").val(v.name);
				$("#toWtCostValC").val(v.description);
			}
		});
	}
	
}
//On change of order sl no  loading stone sl no
$("#orderSlNoC").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"orderStoneSrlNo","segId":$("#segmentC").val(),"catId":$("#mainCategoryC").val(),"shapeId": $("#shapeC").val(), "clarity": $("#clarityC").val(),"color":$("#colorC").val(),"cutgrade":$("#cutGradeC").val(),"fromWtCost":$("#fromWtCostC").val(),"toWtCost":$("#toWtCostC").val(),"fromType":$("#fromStockOrderC").val(), "pktOrStkOrOrdOrLocNo":$("#psolNoC").val(), "orderSrlNo":$(this).val()}};
	getResponseLov(fieldFilter, 9);
	
});

//On change of from type  loading 
$("#toStockOrderC").on('change', function(){
	var value = $(this).val();
	if(value == "Orders"){
		$("#orderSlNoToC").prop('disabled', false);
		$("#stoneSlNoToC").prop('disabled', false);
		$("#psolNoToC").empty().append('<option value="" selected>--Select--</option>');
	}else{
		$("#psolNoToC").empty().append('<option value="" selected>--Select--</option>');
		$("#psolNoToC").empty().append('<option value="" selected>--Select--</option>');
		$("#orderSlNoToC").empty().append('<option value="" selected>--Select--</option>');
		$("#stoneSlNoToC").empty().append('<option value="" selected>--Select--</option>');
		$("#orderSlNoToC").prop('disabled', true);
		$("#stoneSlNoToC").prop('disabled', true);
	}
	
	var value = $("#segmentC option:selected").text();
	if(value == "Diamond"){		
		var fieldFilter = {"fieldFilters":{"type":"pktOrStkOrOrdOrLocNo", "toType": $("#toStockOrderC").val(), "segId":$("#segmentC").val(),"catId":$("#mainCategoryC").val(),"shapeId": $("#shapeC").val(), "clarity": $("#clarityC").val(),"color":$("#colorC").val(),"cutgrade":$("#cutGradeC").val(),"fromWtCost":$("#fromWtCostC").val(),"toWtCost":$("#toWtCostC").val(),"actualcolor":$("#actualColorC").val()}};
	}else{
		var fieldFilter = {"fieldFilters":{"type":"pktOrStkOrOrdOrLocNo", "toType": $("#toStockOrderC").val(),"segId":$("#segmentC").val(),"catId":$("#mainCategoryC").val(),"subcatId" : $("#subCategoryC").val(),"fromWtCost":$("#fromWtCostC").val(),"toWtCost":$("#toWtCostC").val()}};
	}
	getResponseLov(fieldFilter, 10);
});

//On change of from type  loading 
var lossLocFlagG = false;
$("#psolNoToC").on('change', function(){
	
	var toStockOrderC = $("#toStockOrderC").val();
	if(toStockOrderC == "Location"){
		$.getJSON('/OrderExecution/api/v1/checkLoseLocation?segmentId='+$("#segmentC").val()+'&locCode='+$("#psolNoToC").val(), function(data) {
			lossLocFlagG = data.payload.checkLoseLocation; 
			
			console.log(lossLocFlagG);
			if(lossLocFlagG == true){
				$("#addrowbutton").prop('disabled',true);
				$("#saveC").prop('disabled',true);
				var authorization = {
						"code" : "ILA",
						"description" : "Item Loss Account",
						"docType" : "LSM",
						"docNo" : null,
						"transactionAmt" : null,
				}
				
				localStorage.setItem("authorization",JSON.stringify(authorization));
				openNav('ILA');
			}else{
				$("#addrowbutton").prop('disabled',false);
				$("#saveC").prop('disabled',false);
			}
		});

	}
	var fieldFilter = {"fieldFilters":{"type":"orderSrlNo","segId":$("#segmentC").val(),"catId":$("#mainCategoryC").val(),"shapeId": $("#shapeC").val(), "clarity": $("#clarityC").val(),"color":$("#colorC").val(),"cutgrade":$("#cutGradeC").val(),"fromWtCost":$("#fromWtCostC").val(),"toWtCost":$("#toWtCostC").val(),"toType":$("#toStockOrderC").val(), "pktOrStkOrOrdOrLocNo":$(this).val()}};
	var toStockOrderC = $("#toStockOrderC").val();
	if(toStockOrderC == "Orders"){
		getResponseLov(fieldFilter, 11);
	}
});

//On change of order sl no  loading stone sl no
$("#orderSlNoToC").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"orderStoneSrlNo","segId":$("#segmentC").val(),"catId":$("#mainCategoryC").val(),"shapeId": $("#shapeC").val(), "clarity": $("#clarityC").val(),"color":$("#colorC").val(),"cutgrade":$("#cutGradeC").val(),"fromWtCost":$("#fromWtCostC").val(),"toWtCost":$("#toWtCostC").val(),"toType":$("#toStockOrderC").val(), "pktOrStkOrOrdOrLocNo":$("#psolNoToC").val(), "orderSrlNo":$(this).val()}};
	getResponseLov(fieldFilter, 12);
});
/* ####################### SEARCH PAGE ##################################*/
//On change of movement type loading segments
$("#movementType").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"stonesegments"}};
	var mType = getResponseLov(fieldFilter, 1);
});
$("#subCategoryDescSection").hide();
//On change of segment  loading main category
$("#segment").on('change', function(){
	var value = $(this).val();
	var segmentName = $("#segment option:selected").text();
	$("#fromWtCost").val("");
	$("#toWtCost").val("");
	if(segmentName == "Diamond"){
		$("#shapeSection").show();
		$("#claritySection").show();
		$("#colorSection").show();
		$("#cutGradeSection").show();
		$("#subCategoryDescSection").show();
		$("#subCategorySection").hide();
	}else{
		$("#subCategoryDescSection").hide();
		$("#subCategorySection").show();
		
		$("#shapeSection").hide();
		$("#claritySection").hide();
		$("#colorSection").hide();
		$("#cutGradeSection").hide();
	}
	var fieldFilter = {"fieldFilters":{"type":"stonesegCategories","segId": $(this).val()}};
	getResponseLov(fieldFilter, 2);
});

//On change of main category  loading shape 

$("#mainCategory").on('change', function(){
	var value = $("#segment").val();
	var segmentName = $("#segment option:selected").text();
	
	if(segmentName == "Diamond"){		
		var fieldFilter = {"fieldFilters":{"type":"stoneSegShapes","segId": $("#segment").val(),"catId" : $(this).val()}};
	}else{
	
		var fieldFilter = {"fieldFilters":{"type":"subCat","segId": $("#segment").val(),"catId" : $("#mainCategory").val()}};		
	}
	
	getResponseLov(fieldFilter, 3);
});

//On change of shape  loading clarity, color and cut grade 
$("#shape").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"stoneSegColorClarityCutgrade","segId": $("#segment").val(),"catId" : $("#mainCategory").val(), "shapeId" : $(this).val()}};
	getResponseLov(fieldFilter, 4);
});

//On change of cut grade  loading from cost and to cost
$("#cutGrade").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"FromWtOrCost","segId": $("#segment").val(),"catId" : $("#mainCategory").val(),"criteria": "search"}};
	getResponseLov(fieldFilter, 5);
});

$("#fromWtCost").on('change',function(){
	var fieldFilter = {"fieldFilters":{"type":"ToWtOrCost","fromWtSelected" : $("#fromWtCost").val(),"segId": $("#segment").val(),"catId" : $("#mainCategory").val(),"criteria": "search"}};
	getResponseLov(fieldFilter, 16);
});

//On change of to cost  loading from type
$("#toWtCost").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"fromTypes"}};
	getResponseLov(fieldFilter, 6);
});

$("#subCategory").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"FromWtOrCost","segId": $("#segment").val(),"catId" : $("#mainCategory").val(),"subcatId" : $("#subCategory").val(),"criteria": "search"}};		
	getResponseLov(fieldFilter, 5);
});

//On change of to cost  loading from type
$("#toWtCost").on('change', function(){
	var fieldFilter = {"fieldFilters":{"type":"fromTypes"}};
	getResponseLov(fieldFilter, 6);
});

//On change of from type  loading 
$("#fromStockOrder").on('change', function(){
	var value = $(this).val();
	var segment = $("#segment").val();
	var segmentName = $("#segment option:selected").text();
	
	if(segmentName == "Diamond"){		
		var fieldFilterTo = {"fieldFilters":{"type":"toTypes","fromType":value}};
	}else{
		var fieldFilterTo = {"fieldFilters":{"type":"toTypes","fromType":value}};
	}
	
	if(value == "Orders"){
		$("#orderSlNo").prop('disabled', false);
		$("#stoneSlNo").prop('disabled', false);
	}else{
		
		$("#orderSlNo").prop('disabled', true);
		$("#stoneSlNo").prop('disabled', true);
	}
	
	var fromStockOrderC = $("#fromStockOrder").val();
	if ( fromStockOrderC == "Stock"){
		$("#weight").prop('disabled', true);
		$("#pcs").prop('disabled', true);
		
	}else{
		$("#weight").prop('disabled', false);
		$("#pcs").prop('disabled', false);
	}
	
	getResponseLovTo(fieldFilterTo, 7);
	
});

function validateNumber(val) {
	var regex = /^\d{0,9}(\.\d{0,9})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(3);
	}
	return '';
}

var stoneAccMovementCreateGrid = function() {
	
	var segmentArr = [];
	
	var generaterow = function(i) {
		var row = {};
		row["slNo"] = i;
		row["segment"] = $("#segmentC option:selected").text();
		row["mainCategory"] = $("#mainCategoryC option:selected").text();
		row["shape"] = ($("#segmentC option:selected").text() == "Diamond") ? $("#shapeC option:selected").text():"";
		row["clarity"] = ($("#segmentC option:selected").text() == "Diamond") ? $("#clarityC option:selected").text():"";
		row["color"] = ($("#segmentC option:selected").text() == "Diamond") ? $("#colorC option:selected").text():"";
		row["cutGrade"] = ($("#segmentC option:selected").text() == "Diamond") ? $("#cutGradeC option:selected").text() :"";
		row["fromWtCost"] = $("#fromWtCostC option:selected").text();
		row["toWtCost"] = $("#toWtCostC option:selected").text();
		row["movementTypeC"] = $("#movementTypeC").val();
		row["psolFrom"] = $("#fromStockOrderC option:selected").text();
		row["packetStockNo"] = $("#psolNoC option:selected").text();
		row["fromOrderSlNo"] = $("#orderSlNoC").val();
		row["fromStoneSlNo"] = $("#stoneSlNoC").val();
		
		row["actualColor"] = $("#actualColorC").val();
		
		row["authId"] = null;
		row["authFlag"] = false;
		row["psolTo"] = $("#toStockOrderC option:selected").text();
		row["packetStockNoTo"] = $("#psolNoToC option:selected").text();		
		row["toOrderSlNo"] =  $("#orderSlNoToC").val();
		row["toStoneSlNo"] = $("#stoneSlNoToC").val();
		
		row["stoneSubCatId"] = ($("#segmentC option:selected").text() == "Diamond") ? null : $("#subCategoryC").val();
		row["stoneSubCat"] = ($("#segmentC option:selected").text() == "Diamond") ? $("#stoneSubCategoryC").val() : $("#subCategoryC option:selected").text();	
		row["pcs"] = $("#pcsC").val();
		row["weight"] = $("#weightC").val();
		row["segCode"] = $("#segmentC option:selected").attr('ids');
		row["segId"] = $("#segmentC").val();
		row["mainCatId"] = $("#mainCategoryC").val();
		row["shapeCode"] = ($("#segmentC option:selected").text() == "Diamond") ? $("#shapeC option:selected").attr('idsp'):"";
		row["shapeId"] = ($("#segmentC option:selected").text() == "Diamond") ? $("#shapeC").val() :"";
		row["mainCatCode"] = $("#mainCategoryC option:selected").attr('idm');
		row["remarks"] = $("textarea#remaksC").val();
		row["stoneCode"] = $("#stoneCodeC").val();
		row["fromWtCostVal"] = $("#fromWtCostValC").val();
		row["toWtCostVal"] = $("#toWtCostValC").val();
		
		return row;
	}
	 
	var source = {
		datafields : [ 
			
		    {name : 'segCode',	type : 'int'},
			{name : 'segId',	type : 'int'},
			{name : 'shapeId',	type : 'int'},
			{name : 'mainCatId',	type : 'string'},
			{name : 'shapeCode',	type : 'string'},
			{name : 'mainCatCode',	type : 'string'},
			{name: 'movementTypeC', type: 'string'},
			{name : 'segment',	type : 'string'},
			{name : 'mainCategory',	type : 'string'},
			{name : 'shape',	type : 'string'},
			{name : 'clarity',	type : 'string'},
			{name : 'color',	type : 'string'},
			{name : 'actualColor',	type : 'string'},
			{name : 'cutGrade',	type : 'string'},
			{name : 'fromWtCost',	type : 'float'},
			
			{name : 'toWtCost',	type : 'int'},
			
			{name : 'psolFrom',	type : 'string'},
			{name : 'packetStockNo',	type : 'int'},
			{name : 'fromOrderSlNo',	type : 'int'},
			{name : 'fromStoneSlNo',	type : 'int'},
			
			{name : 'psolTo',	type : 'string'},
			{name : 'packetStockNoTo',	type : 'string'},
			{name : 'toOrderSlNo',	type : 'int'},
			{name : 'toStoneSlNo',	type : 'string'},
			
			
			{name : 'stoneSubCatId',	type : 'int'},
			{name : 'stoneSubCat',	type : 'string'},
			{name : 'pcs',	type : 'int'},
			{name : 'weight',	type : 'float'},
			{name : 'remarks',	type : 'string'},
			{name : 'stoneCode',type : 'string'},
			{name : 'authId',type : 'int'},
			{name : 'authFlag',type : 'bool'},
			
			{name : 'fromWtCostVal',type : 'float'},
			{name : 'toWtCostVal',	type : 'float'},
		]
	};

	$("#jqxgridCreate").jqxGrid({
		width : '100%',
		editable : true,
		columnsheight : 80,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div class='colo-md-12'></div>");
			toolbar.append(container);
			container.append('<div class="col-md-6"><div id="addrowbutton" style="margin-top:5px;" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i> </div>&nbsp;Stone/Acc Movements Line Items</div>');
			container.append('<div class="col-md-6"><div id="deleterowbutton" style="margin-top:5px;" class="btn btn-danger btn-sm pull-right"><i  class="fa fa-trash fa-md"></i></div></div>');
			
			$("#addrowbutton").jqxButton();
			$("#deleterowbutton").jqxButton();
			
			$("#addrowbutton").on('click',	function() {
				var movementTypeC = $("#movementTypeC").val();
				var segmentC = $("#segmentC").val();
				var mainCategoryC = $("#mainCategoryC").val();mainCategoryC
				var shapeC = $("#shapeC").val();
				var clarityC = $("#clarityC").val();
				var colorC = $("#colorC").val();
				var cutGradeC = $("#cutGradeC").val();
				var fromWtCostC = $("#fromWtCostC").val();
				var toWtCostC = $("#toWtCostC").val();
				
				var psolNoC = $("#psolNoC").val();
				var orderSlNoC = $("#orderSlNoC").val();
				var pcsC = $("#pcsC").val();
				var weightC = $("#weightC").val();
				var actualColorC = $("#actualColorC").val();
				if (movementTypeC == "" || segmentC == "" || mainCategoryC == "" || fromWtCostC == "" ||
					toWtCostC == "" || psolNoC == "" ||pcsC == "" || weightC == "") {
					$.growl.error({
						message : "Please fill mandatory fields.",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
				if(pcsC == "" || pcsC == null || pcsC == 0){
					$.growl.error({
						message : "Please Enter Valid Pcs !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				if(pcsC > pcsV && $("#fromStockOrderC").val() != "Stock" && $("#fromStockOrderC").val() != "Location"){
					$.growl.error({
						message : "Pcs Cannot Be Greater Than " + pcsV + " !!",
						duration : 1000,
						title : "Error"
					});
					return false;
				}
				if(weightC > weightV && $("#fromStockOrderC").val() != "Stock"){
					$.growl.error({
						message : "Weight Cannot Be Greater Than " + weightV + " !!",
						duration : 1000,
						title : "Error"
					});
					return false;
				}
				if(weightC == "" || weightC == null || weightC == 0){
					$.growl.error({
						message : "Please Enter Valid Wt. !!!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}
				var segmentC = $("#segmentC option:selected").text();
				if(segmentC == "Diamond"){
					if(shapeC == "" || clarityC == "" || colorC == "" || cutGradeC == ""){
						$.growl.error({
							message : "Please fill mandatory fields.",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
				}
				
				var mainCategory = $("#mainCategoryC option:selected").text();
				if(mainCategory == "CD Melees"|| mainCategory == "CD Pointers" || mainCategory == "CD Solitaire"){
					if( actualColorC == ""){
						$.growl.error({
							message : "Please fill mandatory fields.",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
				}
				
				var orderSlNoToC = $("#orderSlNoToC option:selected").val();
				

				if(parseFloat(toWtCostC) < parseFloat(fromWtCostC)){
					$.growl.error({
						message : "To Wt/Cost Cannot be less than From Wt/Cost",
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
				
				var fromStockOrderC = $("#fromStockOrderC").val();
				if(fromStockOrderC == "Orders"){
					if(orderSlNoC == ""){
						$.growl.error({
							message : "Please fill mandatory fields.",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
				}
				
				var psolNoToC = $("#psolNoToC option:selected").text();
				
				if(psolNoToC ==  "Orders"){
					if(orderSlNoToC == ""){
						$.growl.error({
							message : "Please fill mandatory fields.",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
				}
				
				var rowscount = $("#jqxgridCreate").jqxGrid('getdatainformation').rowscount;
				if (rowscount == 0) {
					var rowId = 1;
				} else {
					var rowId = rowscount + 1;
					
				}
				
				var res = true;
				var gridDet = $("#jqxgridCreate").jqxGrid('getrows');
				if(gridDet.length != 0){
					if($("#fromStockOrderC").val() == "Stock"){
						$.each(gridDet,function(k,v){
							if(v.psolFrom == $("#fromStockOrderC").val() && v.packetStockNo == $("#psolNoC").val()){
								$.growl.error({
									message : "Stock No "+ v.packetStockNo + " Already Exist !!!",
									duration : 1000,
									title : 'Error'
								});
								res =  false;
							}
						});
				     }
				 		$.each(gridDet,function(k,v){
							if(v.psolFrom ==$("#fromStockOrderC").val() && v.packetStockNo == $("#psolNoC").val() 
								&& v.psolTo == $("#toStockOrderC").val() &&  v.packetStockNoTo == $("#psolNoToC").val()
								&& v.toOrderSlNo == $("#orderSlNoToC").val() && v.toStoneSlNo == $("#stoneSlNoToC").val()
								&& v.fromOrderSlNo == $("#orderSlNoC").val() && v.fromStoneSlNo == $("#stoneSlNoC").val()){
								$("#dcDetailsEdit").trigger('reset');
								$.growl.error({
									message : "Movement already added for " + v.psolFrom  + " :" + v.packetStockNo + " to " + v.psolTo + ": " + v.packetStockNoTo + " !!!",
									duration : 10000,
									title : 'Error'
								});
								res =  false;
							}
						});
					//}
				}
				if(res == true){
					var datarow = generaterow(rowId);
					var commit = $("#jqxgridCreate").jqxGrid('addrow',	null, datarow);
					
					$("#dcDetailsEdit").trigger('reset');
				}
			});
			$("#deleterowbutton").on('click', function() {
				var designMasterGrid = $("#jqxgridCreate").jqxGrid('getrows');
				var selectedrowindex = $("#jqxgridCreate").jqxGrid('getselectedrowindex');
				
				var rowscount = $("#jqxgridCreate").jqxGrid('getdatainformation').rowscount;				
				
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#jqxgridCreate").jqxGrid('getrowid', selectedrowindex);
					var commit = $("#jqxgridCreate").jqxGrid('deleterow', id);
				}

				for (var j = 0; j < rowscount; j++) {
					$("#jqxgridCreate").jqxGrid("setcellvalue", j, "slNo", j + 1);
				}
			});
		},
		
		columns : [
			{text : '', datafield : 'authId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'authFlag', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'segCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'segId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'mainCatCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'mainCatId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'shapeId', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'shapeCode', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			{text : '', datafield : 'movementTypeC', width : '5%', cellsalign : 'center', align : 'center',editable : false,hidden:true},
			
			{text : 'Seg', datafield : 'segment', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Main Cat', datafield : 'mainCategory', width : '5%', cellsalign : 'center', align : 'center',editable : false},			
			{text : 'Shape', datafield : 'shape', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Clarity', datafield : 'clarity', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Color', datafield : 'color', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Actual Color', datafield : 'actualColor', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Cut Grade', datafield : 'cutGrade', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'From Wt/Cost', datafield : 'fromWtCost', width : '5%', cellsalign : 'right', align : 'center', editable : false},			
			{text : 'To Wt/Cost', datafield : 'toWtCost', width : '5%', cellsalign : 'right', align : 'center', editable : false},
			
			{text : 'From', datafield : 'psolFrom', width : '5%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'From Pack/Stock/Order/Loc No.', datafield : 'packetStockNo', width : '12%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'From Order Sl No', datafield : 'fromOrderSlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'From Stone Sl No', datafield : 'fromStoneSlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false},
			
			
			{text : 'To', datafield : 'psolTo', width : '5%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'To Pack/Stock/Order/Loc No.', datafield : 'packetStockNoTo', width : '12%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'To Order Sl No', datafield : 'toOrderSlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'To Stn Sl No', datafield : 'toStoneSlNo', width : '5%', cellsalign : 'center', align : 'center', editable : false},
			{text : '', hidden: true, datafield : 'stoneSubCatId', width : '5%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'Sub Cat', datafield : 'stoneSubCat', width : '5%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'Stone Code', datafield : 'stoneCode', width : '4%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'Pcs', datafield : 'pcs', width : '4%', cellsalign : 'center', align : 'center', editable : false},
			{text : 'Wt', datafield : 'weight', width : '3%', cellsalign : 'right', align : 'center', editable : false},
			{text : 'Remarks', datafield : 'remarks', width : '4%', cellsalign : 'center', align : 'center', editable : false},
			
			{text : 'f Wt', datafield : 'fromWtCostVal', width : '3%', cellsalign : 'right', align : 'center', editable : false,hidden:true},
			{text : 't Wt', datafield : 'toWtCostVal', width : '3%', cellsalign : 'right', align : 'center', editable : false,hidden:true},
		]
	});
}

var stoneAccMovFieldFilters = function(){
	
	var movementType = $("#movementType option:selected").val();
	var movementId = $("#movementId").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	var segment = $("#segment").val();
	var mainCategory = $("#mainCategory option:selected").val();
	var shape = $("#shape option:selected").val();
	var clarity = $("#clarity option:selected").val();
	var color = $("#color option:selected").val();
	var actualColor = $("#actualColor option:selected").val();
	
	var cutGrade = $("#cutGrade option:selected").val();
	var fromWtCost = $("#fromWtCost option:selected").val();
	var toWtCost = $("#toWtCost option:selected").val();
	
	var fromStockOrder = $("#fromStockOrder option:selected").val();
	var toStockOrder = $("#toStockOrder option:selected").val();
	var remarks = $("#remaksC").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
		
	if (movementType != "" && movementType != null) {
		fieldFilters.fieldFilters["movType"] = movementType;
	}
	
	if (movementId != "" && movementId != null) {
		fieldFilters.fieldFilters["movId"] = movementId;
	}
	
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}	

	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segId"] = segment;
	}
	
	if (mainCategory != "" && mainCategory != null) {
		fieldFilters.fieldFilters["catId"] = mainCategory;
	}
	
	if (shape != "" && shape != null) {
		fieldFilters.fieldFilters["shapeId"] = shape;
	}
	
	if (clarity != "" && clarity != null) {
		fieldFilters.fieldFilters["clarity"] = clarity;
	}
	
	if (color != "" && color != null) {
		fieldFilters.fieldFilters["color"] = color;
	}
	

	if (cutGrade != "" && cutGrade != null) {
		fieldFilters.fieldFilters["cutgrade"] = cutGrade;
	}
	
	if (fromWtCost != "" && fromWtCost != null) {
		fieldFilters.fieldFilters["fromWtCost"] = parseFloat(fromWtCost);
	}
	
	if (toWtCost != "" && toWtCost != null) {
		fieldFilters.fieldFilters["toWtCost"] = parseFloat(toWtCost);
	}
	
	if (fromStockOrder != "" && fromStockOrder != null) {
		fieldFilters.fieldFilters["from"] = fromStockOrder;
	}
	
	if (toStockOrder != "" && toStockOrder != null) {
		fieldFilters.fieldFilters["to"] = toStockOrder;
	}
	
	
	return fieldFilters;

}
// Stone/Acc Movement Search Grid
var  stoneAccMovementSearchGrid = function() {
	
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'movementType','type' : 'string'},
		{'name' : 'movId','type' : 'int','map':'movId'},
		{'name' : 'dateMovement','type' : 'date','map':'date'}, 
		{'name' : 'pslFrom','type' : 'string','map':'fromLoc'},
		{'name' : 'fromRefDocType','type' : 'string','map':'fromType'},
		{'name' : 'fromRefDocNo','type' : 'string','map':'fromPktOrStkOrLocOrOrdNo'}, 
		{'name' : 'fromRefDocSlNo','type' : 'int','map':'fromOrderSrlNo'},
		{'name' : 'fromOrderStoneSrlNo','type' : 'int','map':'fromOrderStoneSrlNo'},
		{'name' : 'segment','type' : 'string','map':'segmentDTO>description'},
		{'name' : 'mainCategory','type' : 'string','map':'mainCat>description'}, 
		{'name' : 'shape','type' : 'string','map':'shape>description'}, 
		{'name' : 'clarity','type' : 'string','map':'clarity'}, 
		{'name' : 'color','type' : 'string'}, 
		{'name' : 'cutGrade','type' : 'string','map':'cutgrade'}, 
		{'name' : 'fromWtCost','type' : 'float','map':'fromWt'}, 
		{'name' : 'toWtCost','type' : 'float','map':'toWt'}, 
		{'name' : 'weight','type' : 'float','map':'wt'}, 
		{'name' : 'pices','type' : 'int','map':'pcs'}, 
		{'name' : 'pslTo','type' : 'string','map':'toLoc'}, 
		{'name' : 'toRefDocType','type' : 'string','map':'toType'}, 
		{'name' : 'toRefDocNo','type' : 'string','map':'toPktOrStkOrLocOrOrdNo'},
		{'name' : 'toRefDocSlNo','type' : 'string','map':'toOrderSrlNo'},
		{'name' : 'toOrderStoneSrlNo','type' : 'int'}, 
		];

	var columns = [
		{'text' : 'Movement Type', 'datafield' : 'movementType','width' : '5%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Movement Id', 'datafield' : 'movId','width' : '4%',cellsalign : 'center',align : 'center',sortable : true, groupable: false},
		{'text' : 'Date', 'datafield' : 'dateMovement','width' : '4%',cellsalign : 'center',align : 'center',sortable : false, groupable: true, cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'},
		{'text' : 'From Loc', 'datafield' : 'pslFrom','width' : '4%',cellsalign : 'center',align : 'center',sortable : false, groupable: false},
		{'text' : 'From Ref Doc Type', 'datafield' : 'fromRefDocType','width' : '6%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'From Ref Doc No', 'datafield' : 'fromRefDocNo','width' : '6%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'From Ref Doc Sl No', 'datafield' : 'fromRefDocSlNo','width' : '6%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'From Stn/Acc Sl No', 'datafield' : 'fromOrderStoneSrlNo','width' : '6%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Seg','datafield' : 'segment','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false},
		{'text' : 'Main Cat', 'datafield' : 'mainCategory','width' : '4%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Shape', 'datafield' : 'shape','width' : '4%',cellsalign : 'center',align : 'center', sortable : false},
		{'text' : 'Clarity', 'datafield' : 'clarity','width' : '4%',cellsalign : 'center',align : 'center', sortable : false},
		{'text' : 'Color', 'datafield' : 'color','width' : '4%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Cut Grade', 'datafield' : 'cutGrade','width' : '4%',cellsalign : 'center',align : 'center',sortable : false},	
		{'text' : 'From Wt/Cost', 'datafield' : 'fromWtCost','width' : '4%',cellsalign : 'right',align : 'center', cellsformat : 'd3', sortable : false},
		{'text' : 'To Wt/Cost', 'datafield' : 'toWtCost','width' : '4%',cellsalign : 'right',align : 'center',cellsformat : 'd3', sortable : false},
		{'text' : 'Wt', 'datafield' : 'weight','width' : '4%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false},
		{'text' : 'Pcs', 'datafield' : 'pices','width' : '4%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'To Loc', 'datafield' : 'pslTo','width' : '4%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'To Ref Doc Type', 'datafield' : 'toRefDocType','width' : '5%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'To Ref Doc No', 'datafield' : 'toRefDocNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'To Ref Doc Sl No', 'datafield' : 'toRefDocSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'To Stn/Acc Sl No', 'datafield' : 'toOrderStoneSrlNo','width' : '6%',cellsalign : 'center',align : 'center',sortable : false}		
	];

	showMyGrid(datafields,"/OrderExecution/api/v1/searchStnAccMovementList", "list", columns, stoneAccMovFieldFilters(), updateRows, "");
	
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        columnsheight: 85,
        columnsresize: true,  
		rowsheight : 20,
		theme: 'energyblue',
		autorowheight : true,
		groupable: true,
		rowdetails : true,
		editable: false,
		sortable:true
	});
}

$("#createStoneAccMovementCreate").on('click', function(){
	$("#popupheaderlabel").html('Create Stone/Acc Movement');
	stoneAccMovementCreateGrid();
	$("#jqxgridCreate").show();
	$("#jqxgridCreate").jqxGrid('clear');
});

$("#search").on('click', function(){
	var movementType = $("#movementType option:selected").val();
	
	if(movementType == "" || movementType == null){
		$.growl.error({
			message : "Please select movement type.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	stoneAccMovementSearchGrid();
	$("#jqxgrid").show();
});

$("#clear").on('click', function(){
	redirect();
});

var saveMovementOfStone = function(){
	
	var saveMovementOfStoneDet = [];
	
	var rows = $("#jqxgridCreate").jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
	var row = rows[i];
	console.log(rows);
	var movementOfStoneSaveDetails = 
				  {
					
				  	"movementType" : row.movementTypeC,
				  	"authId" : row.authId,
				    "segmentDTO": {
				      "id":row.segId,
				      "description": row.segment,
				      "code": row.segCode
				    },
				    "mainCat": {
				      "id":  row.mainCatId,
				      "name":  row.mainCatCode,
				      "description": row.mainCategory
				    },
				    "subcat": ($("#segmentC option:selected").text() != "Diamond") ?  { "id": row.stoneSubCatId, "description": row.stoneSubCat} : null,
				    "shape": {
				      "id": row.shapeId,
				      "name":row.shapeCode,
				      "description": row.shape,
				    },
				    "color": (row.color == null || row.color == "") ? null : row.color,
		    		"actualColor": (row.actualColor == null || row.actualColor == "") ? null : row.actualColor,
				    "clarity": (row.clarity == null || row.clarity == "") ? null : row.clarity,
				    "cutgrade": (row.cutGrade == null || row.cutGrade == "") ? null : row.cutGrade,
				    "fromWt": row.fromWtCost,
				    "toWt": row.toWtCost,
				    "subCatDes":($("#segmentC option:selected").text() == "Diamond") ? row.stoneSubCat : null,
				    "fromType": row.psolFrom,
				    "fromPktOrStkOrLocOrOrdNo":row.packetStockNo,
				    "fromOrderSrlNo": (row.fromOrderSlNo == null || row.fromOrderSlNo == "") ? null : row.fromOrderSlNo, 
				    "fromOrderStoneSrlNo": (row.fromStoneSlNo == null || row.fromStoneSlNo == "") ? null : row.fromStoneSlNo,
				    "toType": row.psolTo,
				    "toPktOrStkOrLocOrOrdNo":row.packetStockNoTo,
				    "toOrderSrlNo": (row.toOrderSlNo == null || row.toOrderSlNo == "") ? null : row.toOrderSlNo, 
				    "toOrderStoneSrlNo": (row.toStoneSlNo == null || row.toStoneSlNo == "") ? null : row.toStoneSlNo,
				    "pcs": row.pcs,
				    "wt": row.weight,
				    "remarks": row.remarks,
				    "uom" : $("#uomC").val(),
				    "stoneCode" : row.stoneCode,
				    "fromWtCost":row.fromWtCostVal,
				    "toWtCost":row.toWtCostVal
				  }
	     		saveMovementOfStoneDet.push(movementOfStoneSaveDetails);
		   }	
	return saveMovementOfStoneDet;
 }

var authArray = [];

var checkAuth = function(isAuthorized, authId){
	console.log(authId);
	if(isAuthorized == "A"){
		var rows = $("#jqxgridCreate").jqxGrid('getrows');
		for(var j=0; j<rows.length; j++ ){
			var rowid = $("#jqxgridCreate").jqxGrid('getrowid', j);
			var row = $("#jqxgridCreate").jqxGrid('getrowdatabyid', rowid);
			
			if(rows[j].authFlag == true){
				if(rows[j].authId == null){
					row['authId'] = authId;
					$("#jqxgridCreate").jqxGrid('updaterow', rowid, row);
				}
				
			}
		}
	}
	var fieldFilters = saveMovementOfStone();
	console.log(fieldFilters);
	if (fieldFilters) {
		postJSON('/OrderExecution/api/v1/createStoneAccMovement ',JSON.stringify(fieldFilters),function(data) {
			if (data.resCode == 1) {			
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});				
				
				$('#createStoneAccMovement').modal('hide');
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			 }
	    });
	}
}

var saveAdj = function(isAuthorized){	
	$.each(authArray, function(k, v){
		getAuthIds(isAuthorized);	
	});
}

$("#saveC").on('click', function(){
	var psolNoToC = $("#psolNoToC").val();
	
	var rows = $('#jqxgridCreate').jqxGrid('getrows');
	
	var rowscount = $("#jqxgridCreate").jqxGrid('getdatainformation').rowscount;
	if(rowscount == 0){
		$.growl.error({
			message : "Please add line items.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	/*authArray = [];
	for (var i = 0; i < rows.length; i++) {
		var rowid = $("#jqxgridCreate").jqxGrid('getrowid', i);
		var row = $("#jqxgridCreate").jqxGrid('getrowdatabyid', rowid);
		
		var row = rows[i];
		if(row.packetStockNoTo == "SLA" || row.packetStockNoTo == "DBK" || row.packetStockNoTo == "PBK" || row.packetStockNoTo == "OBK"){
			authArray.push(row);
			row['authId'] = null;
			row['authFlag'] = true;
			$("#jqxgridCreate").jqxGrid('updaterow', rowid, row);
		}else{
			row['authId'] = null;
			row['authFlag'] = false;
			$("#jqxgridCreate").jqxGrid('updaterow', rowid, row);
		}
	}
	*/
	/*if(authArray.length > 0){
		var authorization = {
				"code" : "ILA",
				"description" : "Item Loss Account",
				"docType" : "LSM",
				"docNo" : null,
				"transactionAmt" : null,
		}
		
		localStorage.setItem("authorization",JSON.stringify(authorization));
		openNav('ILA');
	}else{
		
	}*/
	checkAuth();
	
});



//Export Record as per search criteria
$("#export").on("click",function() {
					var data;
					var newData = [];
					var movementType = $("#movementType option:selected").val();
					var movementId = $("#movementId").val();
					var fromDate = $("#fromDate").val();
					var toDate = $("#toDate").val();
					var segment = $("#segment").val();
					var mainCategory = $("#mainCategory option:selected").val();
					var shape = $("#shape option:selected").val();
					var clarity = $("#clarity option:selected").val();
					var color = $("#color option:selected").val();
					
					var cutGrade = $("#cutGrade option:selected").val();
					var fromWtCost = $("#fromWtCost option:selected").val();
					var toWtCost = $("#toWtCost option:selected").val();
					
					fieldFilters = {
						"fieldFilters" : {}
					};
						
					if (movementType != "" && movementType != null) {
						fieldFilters.fieldFilters["movType"] = movementType;
					}
					
					if (movementId != "" && movementId != null) {
						fieldFilters.fieldFilters["movId"] = movementId;
					}
					
					if (fromDate != "" && fromDate != null) {
						fieldFilters.fieldFilters["fromDate"] = fromDate;
					}	

					if (toDate != "" && toDate != null) {
						fieldFilters.fieldFilters["toDate"] = toDate;
					}
					
					if (segment != "" && segment != null) {
						fieldFilters.fieldFilters["segId"] = segment;
					}
					
					if (mainCategory != "" && mainCategory != null) {
						fieldFilters.fieldFilters["catId"] = mainCategory;
					}
					
					if (shape != "" && shape != null) {
						fieldFilters.fieldFilters["shapeId"] = shape;
					}
					
					if (clarity != "" && clarity != null) {
						fieldFilters.fieldFilters["clarity"] = clarity;
					}
					
					if (color != "" && color != null) {
						fieldFilters.fieldFilters["color"] = color;
					}
					
					if (cutGrade != "" && cutGrade != null) {
						fieldFilters.fieldFilters["cutgrade"] = cutGrade;
					}
					
					if (fromWtCost != "" && fromWtCost != null) {
						fieldFilters.fieldFilters["fromWtCost"] = fromWtCost;
					}
					
					if (toWtCost != "" && toWtCost != null) {
						fieldFilters.fieldFilters["toWtCost"] = toWtCost;
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
                  postJSON('/OrderExecution/api/v1/exportStnAccMovementList',JSON.stringify(fieldFilters),function(response) {
         	     if(response != null){
			         data = response.payload.list;
				     for (i = 0; i < data.length; i++) {
				     newData.push({
				    	            'Movement Type' : (data[i].movementType != null) ? data[i].movementType : "",
				    	            'Movement id' : (data[i].movId != null) ? data[i].movId : "",
				    	            'Date' : (data[i].date != null) ? data[i].date : "",
								    'Segment' : (data[i].segmentDTO != null) ? data[i].segmentDTO.description : "",
									'Main Category' : (data[i].mainCat!= null) ? data[i].mainCat.description : "",
									'Shape' : (data[i].shape != null) ? data[i].shape.description : "",
									'Color' : (data[i].color != null) ? data[i].color : "",
									'Clarity' : (data[i].clarity != null) ? data[i].clarity : "",
									'Cut Grade' : (data[i].cutgrade != null) ? data[i].cutgrade : "",
									'From Wt' : (data[i].fromWt != null) ? data[i].fromWt: "",
									'To Wt' : (data[i].toWt != null) ? data[i].toWt : "",
									'From Type ' : (data[i].fromType != null) ? data[i].fromType : "",
									'FromPkt Or Stk Or Loc Or OrdNo' : (data[i].fromPktOrStkOrLocOrOrdNo != null) ? data[i].fromPktOrStkOrLocOrOrdNo : "",
									'From Order Srl No' : (data[i].fromOrderSrlNo != null) ? data[i].fromOrderSrlNo : "",
									'From Order Stone Srl No' : (data[i].fromOrderStoneSrlNo != null) ? data[i].fromOrderStoneSrlNo : "",		
									'To Type' : (data[i].toType != null) ? data[i].toType : "",
									'To Pkt Or Stk Or Loc Or OrdNo' : (data[i].toPktOrStkOrLocOrOrdNo != null) ? data[i].toPktOrStkOrLocOrOrdNo : "",
									'To Order Srl No' : (data[i].toOrderSrlNo != null) ? data[i].toOrderSrlNo : "",
									'To Order Stone Srl No' : (data[i].toOrderStoneSrlNo != null) ? data[i].toOrderStoneSrlNo : "",
									'Pcs' : (data[i].pcs != null) ? data[i].pcs : "",
									'Wt' : (data[i].wt != null) ? data[i].wt : "",
				      });
				}
				//JSONToCSVConvertor(newData,	" Movement of Stones " + "_" + sysdate, true);	
				var opts = [{sheetid:'Movement_of_Stones',header:true}];
                var res = alasql('SELECT * INTO XLSX(" Movement of Stones_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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


$("#toWtCostC").on('change',function(){
	var fCost = $("#fromWtCostC").val();
	var tCost = $("#toWtCostC").val();
		if(fCost != null || fCost != ""){
			if(parseFloat(fCost) > parseFloat(tCost)){
				$("#toWtCostC").val("");
				$.growl.error({
					message : "To Cost Should be Greater than From Cost",
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		}
});

$("#fromWtCostC").on('change',function(){
	var toCost = $("#toWtCostC").val();
	var fromCost = $("#fromWtCostC").val();
		if(toCost != null || toCost != ""){
			if(toCost > fromCost){
				
			}else{
				$("#toWtCostC").val("");
			}
		}
});

$('#createStoneAccMovement').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});