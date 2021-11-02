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

//api call for the stone Segment in create window
var params = {
		"fieldFilters" : {
			"suppliedBy" : "CO",
			"mCode" : ""
		}
	};

/*$('#stoneSegmentC').empty().append('<option value="" selected>--Select--</option>');

	postJSON('api/v1/getStoneSegments', JSON
			.stringify(params), function(data) {
		if(1 == data.resCode){
			$.each (
					data.payload.stoneSeg,
					function(key, val) {
						$('#stoneSegmentC')
						.append('<option value="'
								+ val.id
								+ '">'
								+ val.description
								+ '</option>');	
					});
		}
	});*/

var onLoadLov = function(){
	getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search', function(data) {
		$('#dcName').empty().append('<option value="" selected>-- Select Option --</option>');
		$.each (data.payload.dcList ,function(key, val) {
			$('#dcName').append('<option value="'+ val.id + '">' + val.dcname + '</option>');
				});
		});
}
onLoadLov();

$.getJSON('/OrderExecution/api/v1/getVendorDcCodeSPQuery', function(data) {
	vendorList = data.payload.vendorCode;
	var data = [];
	$.each(vendorList, function(key, value) {
		data.push({
			value : value.id,
			label : value.vendorCode + "-" + value.vendorName
		});
	});

	$(function() {
		$("#vendorCode").autocomplete({

			source : data,
			focus : function(event, ui) {

				event.preventDefault();
				$(this).val(ui.item.label);
			},
			select : function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
				$("#vendorCode-value").val(ui.item.value);
			}
		});
	});

});


$("#showActualColor").hide();
$("#stoneSegmentC").on("change", function() {
	if($("#stoneSegmentC").val() == "") {
		clearStoneData(2);
		return;
	}
	
	 
	if($("#stoneSegmentC option:selected").attr('idm') == "DI"){
		$("#showCostRange").hide();
	}else{
		$("#showCostRange").show();
	}
	
	if ($("#stoneSegmentC").val() != "") {
		clearStoneData(2);
		var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : $('#stoneSegmentC').val(),
				"sSeg" : $('#stoneSegmentC option:selected').text()
			}
		};
		
		$('#stoneCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
		postJSON('api/v1/getStoneCategories', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$('#stoneCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
				$.each (data.payload.mainCatList,function(key, val) {
					$('#stoneCategoryC').append('<option value="' + val.id + '" idC = '+ val.name +'>' + val.description + '</option>');
				});
			}
		});
		var segmentNameC = $('#stoneSegmentC option:selected').text();
		if (segmentNameC == "Diamond") {
        	$("#Show_Shape").show();
        	$("#showSubCategory").hide();
        	$("#showWtRange").show();
        	$("#showClarity").show();
			$("#showColor").show();
			$("#showCutGride").show();
		}
		else {
        	$("#Show_Shape").hide();
        	$("#showSubCategory").show();
        	$("#showWtRange").hide();
        	$("#showClarity").hide();
			$("#showColor").hide();
			$("#showCutGride").hide();
		}
		/*if(isExtraStoneField()) {
			//$("#showClarity").show();
			$("#showColor").show();
			$("#showCutGride").show();
		}
		else {
			//$("#showClarity").hide();
			$("#showColor").hide();
			$("#showCutGride").hide();
			
		}	*/	
	}
});

$("#stoneCategoryC").on("change", function() {
	var stCatC = $("#stoneCategoryC option:selected").text();
	if(stCatC == "CD Melees" || stCatC == "CD Pointers" || stCatC == "CD Solitaire"){
		 $("#showActualColor").show();
	 }else{
		 $("#showActualColor").hide();
	 }
	
	if($("#stoneCategoryC").val() == "") {
		$("#stoneCode").val('');
		$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#SubCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
		return;
	}
    if ($("#stoneSegmentC").val() != "" && $("#stoneCategoryC").val() != "") {
    	$("#stoneCode").val('');
    	$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#SubCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
		
		getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search&criteria=color&id='+$("#stoneCategoryC").val(), function(data) {
			$('#colorC').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each (data.payload.color ,function(key, val) {
				$('#colorC').append('<option value="'+ val.name+ '">'+ val.name + '</option>');
			});
		});
		
		getJSON('/OrderExecution/api/v1/getWeightRangeByCategory?categoryId=' + $("#stoneCategoryC").val() , function(data) {
			$('#wtRangeC').empty().append('<option value="" selected>-- Select Option --</option>');
				$.each(data.payload.weightRange ,function(key, val) {
					$('#wtRangeC').append('<option value="'+ val.description + '">'+ val.description + '</option>');
			});
		});
        var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : $('#stoneSegmentC').val(),
				"sSeg" : $('#stoneSegmentC option:selected').text(),
				"catId" : $("#stoneCategoryC").val()
			}
        };
        var segmentNameC = $('#stoneSegmentC option:selected').text();
        if (segmentNameC == "Diamond") {
			$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    		postJSON('api/v1/getShapes', JSON
    				.stringify(params), function(data) {
    			if(1 == data.resCode){
    				$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    				$.each (
    						data.payload.subCatList,
    						function(key, val) {
    							$('#Shape').append('<option value="' + val.id + '" idS = '+ val.name +'>' + val.description + '</option>');
    						});
    			}
    		});
    		
			/*if(isActualColorField()) {
				$("#showActualColor").show();
			}
			else {
				$("#showActualColor").hide();
			}*/
        } else {
			$('#SubCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
    		postJSON('api/v1/getStoneSubCategories', JSON
    				.stringify(params), function(data) {

    			if(1 == data.resCode){
    				$('#SubCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
    				$.each (
    						data.payload.subCatList,
    						function(key, val) {
    							//$('#SubCategoryC')	.append('<option value="'+ val.id + '">' + val.description	+ '</option>');
    							$('#SubCategoryC').append('<option value="' + val.id + '" idE = '+ val.name +'>' + val.description	+ '</option>');
    						});
    			}
    		});
        }
    }
});

$("#Shape").on("change", function() {
	if($("#Shape").val() == "") {
		//clearStoneData(4);
		$("#stoneCode").val('');
		return;
	}
	if ($("#stoneSegmentC").val() != "" && $("#stoneCategoryC").val() != "" && $("#Shape") != "") {
		//clearStoneData(4);
        var params = {"fieldFilters": {
        		"segId" : $('#stoneSegmentC').val(),
                "catId" : $("#stoneCategoryC").val(),
                "suppliedBy": 'CO',
                "shapeId": $("#Shape").val()
            }
        };
        $('#cutGrideC').empty().append('<option value="" selected>-- Select Option --</option>');
        $('#colorC').empty().append('<option value="" selected>-- Select Option --</option>');
        $('#clarity').empty().append('<option value="" selected>-- Select Option --</option>');
        $('#actualColorC').empty().append('<option value="" selected>-- Select Option --</option>');
		
        
		postJSON('api/v1/getStoneCodeAndOthers', JSON
				.stringify(params), function(data) {

			if(1 == data.resCode){
				$("#stoneCode").val(data.payload.stoneDetails.name);
				$("#stoneCodeId").val(data.payload.stoneDetails.id);
				
				$.each (data.payload.cutGrade , function(key, val) {					
   					$('#cutGrideC').append('<option value="' + val.id + '">' + val.id + '</option>');
   				});
   				
   				$.each (data.payload.color , function(key, val) {
   					$('#colorC').append('<option value="' + val.id + '">' + val.id + '</option>');
   				});	
   				
   				$.each (data.payload.clarity, function(key, val) {					
   					$('#clarity').append('<option value="'	+ val.id + '">' + val.id + '</option>');
   				});	
   				
   				$("#uomC").val(data.payload.uom);
   				
   				if($("#stoneSegmentC option:selected").attr('idm') == "DI"){
   					if($("#stoneCategoryC option:selected").text() == "CD Melees" || $("#stoneCategoryC option:selected").text() == "CD Pointers" || $("#stoneCategoryC option:selected").text() == "CD Solitaire"){
       					$("#showActualColor").show();
	       				$.each (data.payload.actualColor, function(key, val) {
	       					$('#actualColorC').append('<option value="' + val.id + '">' + val.id + '</option>');
	       				});		
   					}
   				}else{
   					$("#showActualColor").hide();
   				}
				
			}
		});
    }
});


$("#SubCategoryC").on("change", function() {
	if($("#SubCategoryC").val() == "") {
		//clearStoneData(4);
		$("#stoneCode").val('');
		return;
	}
	if ($("#stoneSegmentC").val() != "" && $("#SubCategoryC") != "") {
		//clearStoneData(4);
        var params = {"fieldFilters": {
    		"segId" : $('#stoneSegmentC').val(),
            "catId" : $("#stoneCategoryC").val(),
            "suppliedBy": 'CO',
             "subCatCode": $("#SubCategoryC option:selected").attr('idE')
            }
        }; 
        var apiName;
        if($("#stoneSegmentC option:selected").attr('idm') == "DI"){
        	 apiName = 'api/v1/getStoneCodeAndOthers';
        	  postJSON(apiName, JSON
      				.stringify(params), function(data) {
      			if(1 == data.resCode){
      				$("#stoneCode").val(data.payload.stoneDetails.name);
      			}
              });
        }else{
        	 apiName = 'api/v1/getStoneCodeAndOthers';
        	  postJSON(apiName, JSON
      				.stringify(params), function(data) {

      			if(1 == data.resCode){
      				$("#stoneIdC").val(data.payload.stoneDetails.id);
      				$("#stoneCode").val(data.payload.stoneDetails.name);
      				$("#uomC").val(data.payload.stoneDetails.value);
      				
      			}
              });
        }
    }
	getJSON('/OrderExecution/api/v1/costRangeBySubCategory?subCatId=' + $("#SubCategoryC").val() , function(data) {
		$('#costRangeC').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each(data.payload.ranges ,function(key, val) {
				$('#costRangeC').append('<option value="' + val.id + '">'+ val.name + '-' + val.description + '</option>');
		});
	});
});


function isExtraStoneField () {
   if ($('#stoneSegmentC option:selected').text() == "Diamond") {
        return true;
    } else {
        return false;
    }
}

function isActualColorField () {
    var mainCategory = $('#stoneCategoryC option:selected').text();
    if (mainCategory != null) {
        var firstWord = mainCategory.split(' ')[0];
        if (firstWord == "CD") {
            return true;
        } else {
            //$scope.stone.values.actualColor = null;
            return false;
        }
    } else {
        //$scope.stone.values.actualColor = null;
        return false;
    }
}

function clearStoneData (level) {

    if (level <= 1) {
    	$('#stoneSegmentC').empty().append('<option value="" selected>-- Select Option --</option>');

    }

    if (level <= 2) {
    	$('#stoneCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 3) {
    	$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#SubCategoryC').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 4) {		
		//$('#actualColor').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#colorC').empty().append('<option value="" selected>-- Select Option --</option>');
		
		$("#stoneCode").val('');
	
    }
}

//$("#showSubCategory").hide();
$("#showClarity").hide();
$("#showWtRange").hide();
$("#showColor").hide();
$("#showCutGride").hide();
$("#Show_Shape").hide();
$("#showCostRange").hide();

	  
getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search', function(data) {		
	if(data.resCode == 1){			
		 var $stoneSegmentC = $('#stoneSegmentC');
		 	$.each(data.payload.mTypes, function(key, val) {
		 		$stoneSegmentC.append('<option value="' + val.id + '" idM = '+ val.code +'>' + val.description + '</option>');
	})
				/*$.each (
				data.payload.clarity,
				function(key, val) {
					
					$('#clarity')
							.append('<option value="'
									+ val.id
									+ '">'
									+ val.name
									+ '</option>');
				});*/

				/*$.each (
				data.payload.cutGrade ,
				function(key, val) {
					
					$('#cutGrideC')
							.append('<option value="'
									+ val.id
									+ '">'
									+ val.name
									+ '</option>');
				});*/
			  } 			
   });
    
//#############################################################3 SEARCH ####################################################################
//API call for Segment 
var params = {
		"fieldFilters" : {
			"suppliedBy" : "CO",
			"mCode" : ""
		}
	};
	postJSON('api/v1/getStoneSegments', JSON.stringify(params), function(data) {
		if(1 == data.resCode){
			$.each (data.payload.stoneSeg,function(key, val) {
						$('#stoneSegment').append('<option value="' + val.id + '" idZ = '+ val.code +'>' + val.description + '</option>');	
		});
	}
});
	
//on Change API call for Search Window	  
$("#stoneSegment").on("change", function() {
	if($("#stoneSegment").val() == "") {
		clearStoneData(2);
		return;
	}
	
	if ($("#stoneSegment").val() != "") {
		clearStoneData(2);
		var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : $('#stoneSegment').val(),
				"sSeg" : $('#stoneSegment option:selected').text()
			}
		};
		
		$('#stoneCategory').empty().append('<option value="" selected>-- Select Option --</option>');
		postJSON('api/v1/getStoneCategories', JSON
				.stringify(params), function(data) {

			if(1 == data.resCode){
				$('#stoneCategory').empty().append('<option value="" selected>-- Select Option --</option>');
				$.each (
						data.payload.mainCatList,
						function(key, val) {
							$('#stoneCategory')
									.append('<option value="' + val.id + '">' + val.description + '</option>');
						});
			}
		});
		var segmentNameN = $('#stoneSegment option:selected').text();
		if (segmentNameN == "Diamond") {
			
			//$("#showStoneCodeS").hide();
			//$("#showSubCategoryS").hide();
		}
		else {
			
			$("#showStoneCodeS").show();
			$("#showSubCategoryS").show();
		}

	}
});

$("#stoneCategory").on('change',function(){
	 
	 var params = {
				"fieldFilters" : {
					"suppliedBy" : 'CO',
					"sSegId" : $('#stoneSegment').val(),
					"sSeg" : $('#stoneSegment option:selected').text(),
					"catId" : $("#stoneCategory").val()
				}
	        };
	 
	 if($("#stoneSegment option:selected").attr('idz') == "DI"){
		 
		 postJSON('api/v1/getShapes', JSON.stringify(params), function(data) {
 			if(1 == data.resCode){
 				$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
 				$.each (data.payload.subCatList,function(key, val){
 					$('#subCategory').append('<option value="' + val.id + '" idm = '+ val.name +'>' + val.description	+ '</option>');
 				});
 			}
 		});
	 }
	 if( ($('#stoneSegment option:selected').attr('idz') == "OS") || ($('#stoneSegment option:selected').attr('idz') == "PS")){
		 
		 postJSON('api/v1/getStoneSubCategories', JSON.stringify(params), function(data) {
	 			if(1 == data.resCode){
	 				$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
	 				$.each (data.payload.subCatList,function(key, val){
	 					$('#subCategory').append('<option value="' + val.id + '" idm = '+ val.name +'>' + val.description	+ '</option>');
	 				});
	 			}
	 	   });
	   }
  });

$("#subCategory").on('change',function(){
	var params = {
			"fieldFilters": {
				"segId" : $('#stoneSegment').val(),
		        "catId" : $("#stoneCategory").val(),
		        "suppliedBy": 'CO',
		        "subCatCode": $("#subCategory option:selected").attr('idC')
			}
		}
	 postJSON('api/v1/getStoneCodeAndOthers', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$("#stoneCodeS").val(data.payload.stoneDetails.name);
			}
		});
});

/*$("#stoneCategory").on("change", function() {
	if($("#stoneCategory").val() == "") {
		$("#stoneCodeS").val('');
		//$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
		return;
	}
    if ($("#stoneSegment").val() != "" && $("#stoneCategory").val() != "") {
    	$("#stoneCodeS").val('');
    	//$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
		
		
		
        var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : $('#stoneSegment').val(),
				"sSeg" : $('#stoneSegmentC option:selected').text(),
				"catId" : $("#stoneCategory").val()
			}
        };
        var segmentNameN = $('#stoneSegment option:selected').text();
        //if (segmentNameN != "Diamond"){
			$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
    		postJSON('api/v1/getStoneSubCategories', JSON
    				.stringify(params), function(data) {

    			if(1 == data.resCode){
    				$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
    				$.each (
    						data.payload.subCatList,
    						function(key, val) {
    							$('#subCategory').append('<option value="' + val.id + '" idC = '+ val.name +'>' + val.description	+ '</option>');
    						});
    			}
    		});
        //}
    }
});*/




/*$("#subCategory").on("change", function() {
	if($("#subCategory").val() == "") {
		//clearStoneData(4);
		$("#stoneCodeS").val('');
		return;
	}
	if ($("#stoneSegment").val() != "" && $("#subCategory") != "") {
		//clearStoneData(4);
        var params = {"fieldFilters": {
    		"segId" : $('#stoneSegment').val(),
            "catId" : $("#stoneCategory").val(),
            "suppliedBy": 'CO',
             "subCatCode": $("#subCategory option:selected").attr('idC')
            }
        }; 
        var stoneSegmentC = $('#stoneSegmentC').val();
        var apiName;
        if(stoneSegmentC == 7){
        	 apiName = 'api/v1/getStoneCodeAndOthers';
        	  postJSON(apiName, JSON
      				.stringify(params), function(data) {
      			if(1 == data.resCode){
      				$("#stoneCodeS").val(data.payload.stoneDetails.name);
      			}
              });
        }else{
        	 apiName = 'api/v1/getStoneCodeAndOthers';
        	  postJSON(apiName, JSON
      				.stringify(params), function(data) {

      			if(1 == data.resCode){
      				$("#stoneIdC").val(data.payload.StoneCodeDetails.stoneid);
      				$("#stoneCodeS").val(data.payload.StoneCodeDetails.stoneCode);
      			}
              });
        }
       
      
    }
});*/


function isExtraStoneField () {
   if ($('#stoneSegment option:selected').text() == "Diamond") {
        return true;
    } else {
        return false;
    }
}

function isActualColorField () {
    var mainCategory = $('#stoneCategory option:selected').text();
    if (mainCategory != null) {
        var firstWord = mainCategory.split(' ')[0];
        if (firstWord == "CD") {
            return true;
        } else {
            //$scope.stone.values.actualColor = null;
            return false;
        }
    } else {
        //$scope.stone.values.actualColor = null;
        return false;
    }
}

function clearStoneData (level) {

    if (level <= 1) {
    	$('#stoneSegment').empty().append('<option value="" selected>-- Select Option --</option>');

    }

    if (level <= 2) {
    	$('#stoneCategory').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 3) {
    	//$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 4) {		
		//$('#actualColor').empty().append('<option value="" selected>-- Select Option --</option>');
		//$('#colorC').empty().append('<option value="" selected>-- Select Option --</option>');
		
		$("#stoneCodeS").val('');
	
    }
}
/*$.getJSON('/OrderExecution/api/v1/dcLOV', function(data) {
$('#dcName').empty().append(
'<option value="" selected>--Select--</option>');
$.each(data.payload.allStores, function(key, val) {
$('#dcName').append('<option value="' + val.id + '">' + val.name + '</option>');
   });
});*/
/*
$.validate({
	 
	    showErrorDialogs : false, 
	    onError : function() { },
	    onSuccess: function($form) {
	        if( !$.formUtils.haltValidation ) {
	        	vendorStoneBalanceGrid();
	        	$("#jqxgrid").show();

	            $form.find('input[type="submit"]').unbind('click');
	        }
	        return false;
	    }
	}); */

$("#search").on('click', function(){
	 $form = $('#vendorStoneBalanceSearch');
	    $form.validate({
	        errorElement: 'label', 
	        errorClass: 'help-inline', 
	        focusInvalid: false, 
	        ignore: "",
	        rules: {
	        	"stoneSegment": { required: true},	            
	            "fromDate": { required: true,  dateITA : true },
	            "toDate": { required: true,  dateITA : true}	            
	              },errorPlacement: function(error, element) {
	  	        	if(element.context.name == "toDate" || element.context.name == "fromDate" ){
		        		error.insertAfter(element.parent());
		        	}else{
		        		error.insertAfter(element);
		        	}
		        }
	        });

	    if ($form.valid()) {
	    	//$("#jqxgrid").jqxGrid('clear');
	    	vendorStoneBalanceGrid();
	    	$("#jqxgrid").show();
	    } else {
	    	 return false;
	    }
	    return false;	
});

//Validate Field for Creation of DC Details-------
var validateVendorDetails = function() {	
	 $form = $('#stoneDetCreate');
	    $form.validate({
	        errorElement: 'label', 
	        errorClass: 'help-inline', 
	        focusInvalid: false, 
	        ignore: "",
	        rules: {	        
	            "vendorCodec" : { required: true},
	            "stoneCategoryC" : { required: true},
	            "stoneSegmentC" : { required: true},
	            "stoneCode" : { required: true}	                 
              }
	        });

	    if ($form.valid()) {
	    	 return true;
	    } else {
	    	 return false;
	    }

	    return false;
}
$('.modal').on('hidden.bs.modal', function() {
	$(this).find('form')[0].reset();
});
