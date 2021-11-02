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

$("#create_stoneSegment").on("change", function() {
	if($("#create_stoneSegment").val() == "") {
		clearStoneData(2);
		return;
	}
	
	if ($("#create_stoneSegment").val() != "") {
		clearStoneData(2);
		var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : $('#create_stoneSegment').val(),
				"sSeg" : $('#create_stoneSegment option:selected').text()
			}
		};
		
		$('#create_stoneCategory').empty().append('<option value="" selected>-- Select Option --</option>');
		postJSON('api/v1/getStoneCategories', JSON
				.stringify(params), function(data) {

			if(1 == data.resCode){
				$.each (
						data.payload.mainCatList,
						function(key, val) {
							$('#create_stoneCategory')
									.append('<option value="'
											+ val.id
											+ '">'
											+ val.description
											+ '</option>');
						});
			}
		});
		var segmentName = $('#create_stoneSegment option:selected').text();
		if (segmentName == "Diamond") {
        	$("#create_Show_Shape").show();
        	$("#create_Show_SubCategory").hide();
		}
		else {
        	$("#create_Show_Shape").hide();
        	$("#create_Show_SubCategory").show();
		}
		
		if(isExtraStoneField()) {
			$("#create_showClarity").show();
			$("#create_showColor").show();
			$("#create_showCutGrade").show();
		}
		else {
			$("#create_showClarity").hide();
			$("#create_showColor").hide();
			$("#create_showCutGrade").hide();
			$("#create_showActualColor").hide();
		}		
	}
});

$("#create_stoneCategory").on("change", function() {
	if($("#create_stoneCategory").val() == "") {
		clearStoneData(3);
		return;
	}
    if ($("#create_stoneSegment").val() != "" && $("#create_stoneCategory").val() != "") {
		clearStoneData(3);
        var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : $('#create_stoneSegment').val(),
				"sSeg" : $('#create_stoneSegment option:selected').text(),
				"catId" : $("#create_stoneCategory").val()
			}
        };
        var segmentName = $('#create_stoneSegment option:selected').text();
        if (segmentName == "Diamond") {
			$('#create_Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    		postJSON('api/v1/getShapes', JSON
    				.stringify(params), function(data) {
    			if(1 == data.resCode){
    				$.each (
    						data.payload.subCatList,
    						function(key, val) {
    							$('#create_Shape')
    									.append('<option value="'
    											+ val.id
    											+ '">'
    											+ val.description
    											+ '</option>');
    						});
    			}
    		});
    		
			if(isActualColorField()) {
				$("#create_showActualColor").show();
			}
			else {
				$("#create_showActualColor").hide();
			}
        } else {
			$('#create_subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
    		postJSON('api/v1/getStoneSubCategories', JSON
    				.stringify(params), function(data) {

    			if(1 == data.resCode){
    				$.each (
    						data.payload.subCatList,
    						function(key, val) {
    							$('#create_subCategory')
    									.append('<option value="'
    											+ val.name
    											+ '">'
    											+ val.description
    											+ '</option>');
    						});
    			}
    		});
        }
    }
});

$("#create_Shape").on("change", function() {
	if($("#create_Shape").val() == "") {
		clearStoneData(4);
		return;
	}
	if ($("#create_stoneSegment").val() != "" && $("#create_stoneCategory").val() != "" && $("#create_Shape") != "") {
		clearStoneData(4);
        var params = {"fieldFilters": {
        		"segId" : $('#create_stoneSegment').val(),
                "catId" : $("#create_stoneCategory").val(),
                "suppliedBy": 'CO',
                "shapeId": $("#create_Shape").val()
            }
        };
        
		postJSON('api/v1/getStoneCodeAndOthers', JSON
				.stringify(params), function(data) {

			if(1 == data.resCode){
				$("#create_stoneCode").val(data.payload.stoneDetails.name);
				$("#create_UOM").val(data.payload.uom);
			}

					
			$.each (
					data.payload.clarity,
					function(key, val) {
						$('#create_clarity')
								.append('<option value="'
										+ val.id
										+ '">'
										+ val.id
										+ '</option>');
					});
			

			$.each (
					data.payload.actualColor ,
					function(key, val) {
						$('#create_actualColor')
								.append('<option value="'
										+ val.id
										+ '">'
										+ val.id
										+ '</option>');
					});
		
			$.each (
					data.payload.color ,
					function(key, val) {
						$('#create_color')
								.append('<option value="'
										+ val.id
										+ '">'
										+ val.id
										+ '</option>');
					});
			
			$.each (
					data.payload.cutGrade ,
					function(key, val) {
						$('#create_cutGrade')
								.append('<option value="'
										+ val.id
										+ '">'
										+ val.id
										+ '</option>');
					});
			
		});
        
    }

});


$("#create_subCategory").on("change", function() {
	if($("#create_subCategory").val() == "") {
		clearStoneData(4);
		return;
	}
	if ($("#create_stoneSegment").val() != "" && $("#create_subCategory") != "") {
		clearStoneData(4);
        var params = {"fieldFilters": {
    		"segId" : $('#create_stoneSegment').val(),
            "catId" : $("#create_stoneCategory").val(),
            "suppliedBy": 'CO',
             "subCatCode": $("#create_subCategory").val()
            }
        }; 
        postJSON('api/v1/getStoneCodeAndOthers', JSON
				.stringify(params), function(data) {

			if(1 == data.resCode){
				$("#create_stoneCode").val(data.payload.stoneDetails.name);
				$("#create_UOM").val(data.payload.stoneDetails.value);
			}
        });
    }
});


function isExtraStoneField () {
   if ($('#create_stoneSegment option:selected').text() == "Diamond") {
        return true;
    } else {
        return false;
    }
}

function isActualColorField () {
    var mainCategory = $('#create_stoneCategory option:selected').text();
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
    	$('#create_stoneSegment').empty().append('<option value="" selected>-- Select Option --</option>');

    }

    if (level <= 2) {
    	$('#create_stoneCategory').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 3) {
    	$('#create_Shape').empty().append('<option value="" selected>-- Select Option --</option>');
    	$('#create_subCategory').empty().append('<option value="" selected>-- Select Option --</option>');
    }

    if (level <= 4) {		
		$('#create_clarity').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#create_actualColor').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#create_color').empty().append('<option value="" selected>-- Select Option --</option>');
		$('#create_cutGrade').empty().append('<option value="" selected>-- Select Option --</option>');
		
		$("#create_stoneCode").val('');
		$("#create_UOM").val('');
	
    }
}