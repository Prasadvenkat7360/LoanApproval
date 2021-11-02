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

var onchangeAPIFromToCostWt  =  function(id){
	if(id == null){
		var apiName = 'api/v1/vendorStoneMasterCostWtLOV';
	}else{
		var apiName = 'api/v1/vendorStoneMasterCostWtLOV?id=' + id;
	}
	$('#fromWtCost').empty().append('<option value="" selected>-- Select Option --</option>');
	$('#toWtCost').empty().append('<option value="" selected>-- Select Option --</option>');
	
	$.getJSON(apiName, function(data) {
		if(data.resCode == 1){
		
			$.each (data.payload.wtCost, function(key, val) {
				$('#fromWtCost').append('<option value="' + val.name + '">' + val.name + '</option>');
			});
			
			$.each (data.payload.wtCost, function(key, val) {
				$('#toWtCost').append('<option value="' + val.description + '">' + val.description + '</option>');
			});
		}
		
	});
}

$("#stoneSegment").on("change", function() {
	if($("#stoneSegment").val() == "") {
		clearStoneData(2);
		clearStoneData(5);
		return;
	}
	clearStoneData(5);
	if($("#stoneSegment").val() != "") {
		clearStoneData(2);
		var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : $('#stoneSegment').val(),
				"sSeg" : $('#stoneSegment option:selected').text()
			}
		};
		
		$("#stoneCode").val('');
		$('#stoneCategory').empty().append('<option value="" selected>-- Select Option --</option>');
		postJSON('api/v1/getStoneCategories', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$('#stoneCategory').empty().append('<option value="" selected>-- Select Option --</option>');
				$.each (data.payload.mainCatList, function(key, val) {
					$('#stoneCategory').append('<option value="' + val.id + '">' + val.description + '</option>');
				});
			}
		});
		
		if($(this).val() != "Diamond"){
			onchangeAPIFromToCostWt(null);
		}
		var segmentName = $('#stoneSegment option:selected').text();
		if (segmentName == "Diamond") {
        	$("#Show_Shape").show();
        	$("#showClarity").show();
			$("#showColor").show();
			$("#showCutGrade").show();
        	$("#Show_SubCategory").hide();
		}else {
			$("#showClarity").hide();
			$("#showColor").hide();
			$("#showCutGrade").hide();
			$("#Show_Shape").hide();
			$("#showActualColor").hide();
        	$("#Show_SubCategory").show();
		}
	}
});

$("#stoneCategory").on("change", function() {
	if($("#stoneCategory").val() == "") {
		$("#stoneCode").val('');
		$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
		return;
	}
	
    if ($("#stoneSegment").val() != "" && $("#stoneCategory").val() != "") {
    	$("#stoneCode").val('');
    	if($("#stoneSegment option:selected").text() != "Diamond"){
    		onchangeAPIFromToCostWt(null);
    	}else{
    		onchangeAPIFromToCostWt($(this).val());
    	}
    	$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
		
    	$.getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search&criteria=color&id='+$("#stoneCategory").val(), function(data) {
			$('#color').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each (data.payload.color , function(key, val) {
						$('#color').append('<option value="' + val.id + '">' + val.name + '</option>');
			});			
		});
		
    	$.getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search&criteria=actualColor&id='+$("#stoneCategory").val(), function(data) {
			$('#actualColor').empty().append('<option value="" selected>-- Select Option --</option>');
			$.each (data.payload.actualColor, function(key, val) {
						$('#actualColor').append('<option value="' + val.id + '">' + val.name + '</option>');
			});		
		});
    	
        var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : $('#stoneSegment').val(),
				"sSeg" : $('#stoneSegment option:selected').text(),
				"catId" : $("#stoneCategory").val()
			}
        };
        
        var segmentName = $('#stoneSegment option:selected').text();
        if (segmentName == "Diamond") {
			$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    		postJSON('api/v1/getShapes', JSON.stringify(params), function(data) {
    			if(1 == data.resCode){
    				$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    				$.each (data.payload.subCatList,  function(key, val) {
    					$('#Shape').append('<option value="' + val.id + '">' + val.description + '</option>');
					});
    			}
    		});
    		
    		var mainCat = $('#stoneCategory option:selected').text();
    		if(mainCat == "CD Melees" || mainCat == "CD Solitaire" || mainCat == "CD Pointers"){
    			$(showActualColor).show();
    		}else{
    			$(showActualColor).hide();
    		}
			
        } else {
			$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
    		postJSON('api/v1/getStoneSubCategories', JSON.stringify(params), function(data) {
    			if(1 == data.resCode){
    				$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
    				$.each (data.payload.subCatList, function(key, val) {
    					$('#subCategory').append('<option value="' + val.name + '">' + val.description + '</option>');
					});
    			}
    		});
        }
    }
});

$("#Shape").on("change", function() {
	if($("#Shape").val() == "") {
		$("#stoneCode").val('');
		return;
	}
	
	if ($("#stoneSegment").val() != "" && $("#stoneCategory").val() != "" && $("#Shape") != "") {
        var params = {
    		"fieldFilters": 
    		{
    			"segId" : $('#stoneSegment').val(),
    			"catId" : $("#stoneCategory").val(),
    			"suppliedBy": 'CO',
    			"shapeId": $("#Shape").val()
    		}
    	};

               $('#cutGrade').empty().append('<option value="" selected>-- Select Option --</option>');
               $('#color').empty().append('<option value="" selected>-- Select Option --</option>');
               $('#clarity').empty().append('<option value="" selected>-- Select Option --</option>');
               $('#actualColor').empty().append('<option value="" selected>-- Select Option --</option>');
       		
               
       		postJSON('api/v1/getStoneCodeAndOthers', JSON.stringify(params), function(data) {
       			if(1 == data.resCode){
       				$("#stoneCode").val(data.payload.stoneDetails.name);
       				$("#stoneCodeId").val(data.payload.stoneDetails.id);
       				$.each (data.payload.cutGrade , function(key, val) {					
       					$('#cutGrade').append('<option value="' + val.id + '">' + val.id + '</option>');
       				});
       				
       				$.each (data.payload.color , function(key, val) {
       					$('#color').append('<option value="' + val.id + '">' + val.id + '</option>');
       				});	
       				
       				$.each (data.payload.clarity, function(key, val) {					
       					$('#clarity').append('<option value="'	+ val.id + '">' + val.id + '</option>');
       				});	
       				
       				$.each (data.payload.actualColor, function(key, val) {
       					$('#actualColor').append('<option value="' + val.id + '">' + val.id + '</option>');
       				});		
       				
       				$("#uom").val(data.payload.uom);
       			}
       		});

    }

});


$("#subCategory").on("change", function() {
	if($("#subCategory").val() == "") {
		$("#stoneCode").val('');
		return;
	}
	if ($("#stoneSegment").val() != "" && $("#subCategory") != "") {
        var params = {
    		"fieldFilters": {
    			"segId" : $('#stoneSegment').val(),
    			"catId" : $("#stoneCategory").val(),
    			"suppliedBy": 'CO',
    			"subCatCode": $("#subCategory").val()
    		}
        }; 
        $('#cutGrade').empty().append('<option value="" selected>-- Select Option --</option>');
        postJSON('api/v1/getStoneCodeAndOthers', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$("#stoneCode").val(data.payload.stoneDetails.name);
				$.each (data.payload.cutGrade , function(key, val) {					
					$('#cutGrade').append('<option value="' + val.id + '">' + val.id + '</option>');
				});
			}
        });
    }
});


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
            return false;
        }
    } else {
        return false;
    }
}

function clearStoneData (level) {

    if (level <= 1) {
    	$('#stoneSegment').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#businessS').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#regionS').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 2) {
    	$('#stoneCategory').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 3) {
    	$('#Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 4) {		
		$('#actualColor').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#color').empty().append('<option value="" selected>-- Select Option --</option>');		
		$("#stoneCode").val('');
	
    }
    
    if (level == 5) {
    	$('#fromWtCost').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#toWtCost').empty().append('<option value="" selected>-- Select Option --</option>');
    }
}


$("#Search").on('click', function() {
	if($("#vendorCode").val() == "" || $("#regionS").val() == "" || $("#stoneSegment").val() == "" || $("#businessS").val() == ""){
		$.growl.error({
			message : "Please select mandatory fields.",
			duration : 10000
		});
		return false;
	}
	
	stoneVendorMasterGrid();
	$("#jqxgrid").show();
	return false;
});

$("#Show_Shape").hide();
$("#showClarity").hide();
$("#showActualColor").hide();
$("#showColor").hide();
$("#showCutGrade").hide();

$.getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=search', function(data) {					
	if(data.resCode == 1){								
		var $stoneSegment = $('#stoneSegment');
		$.each(data.payload.mTypes, function(key, val) {
			$stoneSegment.append('<option value="' + val.id + '">' + val.description + '</option>');
		})
		
		$.each(data.payload.business, function(key, val) {
			$("#businessS").append('<option value="' + val.id + '">' + val.name + '</option>');
		})
		$.each(data.payload.region, function(key, val) {
			$("#regionS").append('<option value="' + val.id + '">' + val.name + '</option>');
		})
		
		$.each (data.payload.clarity, function(key, val) {					
			$('#clarity').append('<option value="'	+ val.id + '">' + val.name + '</option>');
		});

		/*$.each (data.payload.cutGrade , function(key, val) {					
			$('#cutGrade').append('<option value="' + val.id + '">' + val.name + '</option>');
		});*/
		
		vendorList = data.payload.vCodeList;
		var data = [];
		$.each( vendorList, function( key, value ) {			      
				data.push({ value: value.id, label: value.name});
		});
		
			
		$("#vendorCode").autocomplete({						
			source: data,
			focus: function(event, ui) {						
				event.preventDefault();
				$(this).val(ui.item.label);						
			},
			select: function(event, ui) {					
				event.preventDefault();
				$(this).val(ui.item.label);					
				$("#vendorCode-value").val(ui.item.value);					
			}
		});
	}			
});
